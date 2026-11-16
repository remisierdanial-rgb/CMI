/* CMI motion-graphics player: deterministic renderAt(t) for frame capture. */
(function(){
const NS='http://www.w3.org/2000/svg';
const C={gold:'#d9b24e',white:'#f2f4f8',grey:'#9aa3b5',dim:'#5d6782',green:'#22b5a0',red:'#ef5a5a',
 blue:'#5b8def',amber:'#f59e0b',ebl:'#3b82f6',yellow:'#facc15',purple:'#a78bfa',cyan:'#22d3ee',pink:'#f472b6',
 orange:'#fb923c',neutral:'#94a3b8',teal:'#2dd4bf'};
const col=c=>C[c]||c||C.white;
const ease=x=>x<=0?0:x>=1?1:(x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// light markup: **bold**, [[color|text]]
const md=s=>esc(s).replace(/\n/g,'<br>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\[\[(\w+)\|(.+?)\]\]/g,(m,c,t)=>`<span style="color:${col(c)};font-weight:700">${t}</span>`);
const fmt=p=>Math.round(p).toLocaleString('en-US');

let EP=null, cur=-1, anims=[], sceneEl, subEl, barEl, hdr={};
const LAYOUT={
 chart:{main:[36,20,1300,800],side:[1360,20,524,800]},
 chartfull:{main:[36,20,1848,800]},
 dual:{left:[36,20,918,700],right:[966,20,918,700],bottom:[36,732,1848,80]},
 stack:{head:[120,36,1680,110],main:[120,170,1680,640],left:[120,170,810,640],right:[990,170,810,640]},
 title:{main:[0,0,1920,860]},
 center:{main:[360,120,1200,600]},
};

function el(tag,attrs,parent,html){const e=document.createElement(tag);if(attrs)for(const k in attrs){if(k==='style')e.style.cssText=attrs[k];else e.setAttribute(k,attrs[k]);}if(html!=null)e.innerHTML=html;if(parent)parent.appendChild(e);return e;}
function sv(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}

let S=null; // current scene
function tOf(spec,def){ // resolve timing spec -> seconds (absolute)
  if(spec==null) spec=def; if(spec==null) return S.t0;
  const cues=S.cues;
  if(typeof spec==='number'){const c=cues[clamp(spec,0,cues.length-1)];return c.t0+0.12;}
  if(Array.isArray(spec)){const c=cues[clamp(spec[0],0,cues.length-1)];const o=spec[1];
    if(o==='mid')return (c.t0+c.t1)/2; if(o==='end')return c.t1-0.3;
    if(typeof o==='string'&&o.endsWith('%'))return c.t0+(c.t1-c.t0)*parseFloat(o)/100;
    return c.t0+o;}
  if(spec==='start')return S.t0+0.25;
  return S.t0;
}
function reg(node,o,kind){ // o: {in,out,dur}
  const a={node,kind:kind||'fade',tin:tOf(o.in,'start'),tout:o.out!=null?tOf(o.out):Infinity,dur:o.dur||(kind==='draw'?0.8:0.45)};
  if(kind==='draw'){try{a.len=node.getTotalLength();}catch(e){a.len=1000;} node.style.strokeDasharray=a.len+' '+a.len;}
  anims.push(a);return a;
}

// ---------------- components ----------------
function rectOf(comp,layout){ if(comp.r) return comp.r; const L=LAYOUT[layout]||LAYOUT.stack; return L[comp.slot||(comp.type==='head'?'head':'main')]; }

function buildHead(c,r,root){
  const d=el('div',{style:`position:absolute;left:${r[0]}px;top:${r[1]}px;width:${r[2]}px`},root);
  if(c.eyebrow) el('div',{class:'eyebrow'},d,esc(c.eyebrow));
  el('div',{class:'h2',style:'margin-top:12px'},d,md(c.title||''));
  if(c.right){const t=el('div',{class:'tag',style:`position:absolute;right:0;top:30px;color:${col(c.rightColor||'dim')};border-color:${col(c.rightColor||'dim')}55`},d,esc(c.right));}
  reg(d,{in:c.in});
}

function buildTitle(c,root){
  const d=el('div',{style:'position:absolute;left:120px;top:150px;width:1000px'},root);
  el('div',{class:'eyebrow'},d,esc(c.eyebrow||''));
  el('div',{class:'h1',style:'margin-top:22px'},d,md(c.title));
  el('div',{class:'subt',style:'margin-top:22px'},d,md(c.subtitle||''));
  const rule=el('div',{class:'rule',style:'margin-top:34px;width:320px'},d);
  reg(d,{in:'start'});
  if(c.objectives){
    const o=el('div',{style:'position:absolute;left:120px;top:520px;width:1040px'},root);
    const h=el('div',{class:'eyebrow',style:'color:#8b93a7;margin-bottom:22px'},o,'LEARNING OBJECTIVES');
    reg(h,{in:c.objIn!=null?c.objIn:1});
    c.objectives.forEach((it,k)=>{const li=el('div',{class:'li',style:'font-size:28px;margin-bottom:14px'},o,`<span class="ic" style="color:${C.green}">✓</span><span>${md(it.text||it)}</span>`);reg(li,{in:it.in!=null?it.in:[c.objIn!=null?c.objIn:1,0.4+k*0.35]});});
  }
  if(c.side){const sd=Object.assign({},c.side);sd.r=[1200,260,620,420];buildComp(sd,root,'title');}
}

function buildNotes(c,r,root){
  const p=el('div',{class:'panel',style:`left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;height:${r[3]}px;padding:30px 30px`},root);
  if(c.eyebrow) el('div',{class:'eyebrow',style:'font-size:15px'},p,esc(c.eyebrow));
  if(c.title){el('div',{class:'h3',style:'margin-top:10px'},p,md(c.title));el('div',{class:'rule',style:'margin:16px 0 24px;width:90px;height:2px'},p);}
  reg(p,{in:c.in!=null?c.in:'start'});
  (c.items||[]).forEach(it=>{const n=el('div',{class:'note-item',style:it.size?`font-size:${it.size}px`:''},p,`<span class="dot" style="background:${col(it.color||'gold')}"></span><span>${md(it.text)}</span>`);reg(n,{in:it.in,out:it.out});});
}

function buildList(c,r,root){
  const d=el('div',{style:`position:absolute;left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;height:${r[3]}px;column-count:${c.cols||1};column-gap:60px`},root);
  (c.items||[]).forEach((it,k)=>{
    const icon=it.icon||c.icon||'check';
    let ic;
    if(icon==='check')ic=`<span class="ic" style="color:${C.green}">✓</span>`;
    else if(icon==='x')ic=`<span class="ic" style="color:${C.red}">✕</span>`;
    else if(icon==='num')ic=`<span class="num">${String(it.n||k+1).padStart(2,'0')}</span>`;
    else if(icon==='warn')ic=`<span class="ic" style="color:${C.amber}">!</span>`;
    else ic=`<span class="dot" style="background:${col(it.color||'gold')};margin:15px 10px 0 6px"></span>`;
    const li=el('div',{class:'li',style:`break-inside:avoid;${c.size?'font-size:'+c.size+'px':''}`},d,`${ic}<span>${md(it.text)}${it.sub?`<span class="sub">${md(it.sub)}</span>`:''}</span>`);
    reg(li,{in:it.in,out:it.out});
  });
}

function buildTable(c,r,root){
  const p=el('div',{class:'panel',style:`left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;${c.h?'height:'+c.h+'px':''}`},root);
  reg(p,{in:c.in!=null?c.in:'start'});
  const t=el('table',{class:'tb'},p);
  const tr=el('tr',null,t);(c.cols||[]).forEach((h,k)=>el('th',{style:c.widths?`width:${c.widths[k]}`:''},tr,esc(h)));
  (c.rows||[]).forEach(row=>{const r2=el('tr',null,t);row.cells.forEach((v,k)=>el('td',{class:k===0?'k':'',style:(k===0&&row.color)?`color:${col(row.color)}`:(c.size?`font-size:${c.size}px`:'')},r2,md(v)));
    // fade each td (tr opacity unreliable in some engines)
    Array.from(r2.children).forEach(td=>reg(td,{in:row.in,out:row.out}));});
}

function buildCards(c,r,root){
  const n=c.cards.length, gap=c.gap||30, w=(r[2]-gap*(n-1))/n;
  c.cards.forEach((cd,k)=>{
    const d=el('div',{class:'card',style:`left:${r[0]+k*(w+gap)}px;top:${r[1]}px;width:${w}px;height:${cd.h||r[3]}px;border-color:${col(cd.color||'pborder')}${cd.color?'99':''}`},root);
    el('div',{class:'ct',style:`color:${col(cd.color||'gold')}`},d,esc(cd.title));
    if(cd.sub) el('div',{class:'cs'},d,md(cd.sub)); else el('div',{style:'height:14px'},d);
    reg(d,{in:cd.in,out:cd.out});
    (cd.items||[]).forEach(it=>{const t=typeof it==='string'?{text:it}:it;const ic=t.icon==='x'?`<span style="color:${C.red};font-weight:800">✕</span>`:t.icon==='check'?`<span style="color:${C.green};font-weight:800">✓</span>`:`<span class="dot" style="background:${col(cd.color||'gold')};margin-top:13px"></span>`;
      const ci=el('div',{class:'ci',style:c.size?`font-size:${c.size}px`:''},d,`${ic}<span>${md(t.text)}</span>`);reg(ci,{in:t.in!=null?t.in:cd.in,out:t.out});});
    if(cd.svg){ const s=Object.assign({},cd.svg); s.r=[r[0]+k*(w+gap)+20,r[1]+(cd.svgY||120),w-40,s.h||260]; buildComp(s,root,'stack'); }
  });
}

function buildFlow(c,r,root){
  const steps=c.steps, per=c.perRow||4, rows=Math.ceil(steps.length/per), gx=c.gx||34, gy=c.gy||30;
  const w=(r[2]-gx*(per-1))/per, h=c.bh||((r[3]-gy*(rows-1))/rows);
  const svgL=sv('svg',{width:1920,height:1001,style:'position:absolute;left:0;top:0;overflow:visible'},root);
  steps.forEach((s,k)=>{
    const row=Math.floor(k/per), cc=k%per, x=r[0]+cc*(w+gx), y=r[1]+row*(h+gy);
    const b=el('div',{class:'flowbox',style:`left:${x}px;top:${y}px;width:${w}px;height:${h}px;${s.color?`border-color:${col(s.color)}aa`:''}`},root,
      `<div class="fn">${esc(s.n||('STEP '+String(k+1).padStart(2,'0')))}</div><div class="ft">${md(s.text)}</div>${s.sub?`<div class="fs">${md(s.sub)}</div>`:''}`);
    reg(b,{in:s.in,out:s.out});
    if(c.arrows!==false && k<steps.length-1 && cc<per-1){
      const ln=sv('path',{d:`M${x+w+4},${y+h/2} L${x+w+gx-6},${y+h/2}`,stroke:C.gold,'stroke-width':2,fill:'none','marker-end':'url(#ah)'},svgL);
      reg(ln,{in:steps[k+1].in});
    }
  });
  const defs=sv('defs',{},svgL);const m=sv('marker',{id:'ah',viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:7,markerHeight:7,orient:'auto'},defs);sv('path',{d:'M0,0 L10,5 L0,10 z',fill:C.gold},m);
}

function buildCallout(c,r,root){
  const d=el('div',{class:'callout',style:`left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;${c.h?'height:'+c.h+'px':''};border-color:${col(c.color||'gold')}99`},root);
  if(c.head) el('div',{class:'ch',style:`color:${col(c.color||'gold')}`},d,(c.icon?c.icon+'  ':'')+esc(c.head));
  el('div',{class:'cb',style:c.size?`font-size:${c.size}px`:''},d,md(c.text));
  reg(d,{in:c.in,out:c.out});
}

function buildText(c,r,root){
  const d=el('div',{style:`position:absolute;left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;font-size:${c.size||28}px;color:${col(c.color||'white')};line-height:1.4;text-align:${c.align||'left'};${c.mono?"font-family:'JetBrains Mono';letter-spacing:2px;":''}${c.weight?'font-weight:'+c.weight:''}`},root,md(c.text));
  reg(d,{in:c.in,out:c.out});
}

function buildDisclaimer(c,root){
  const d=el('div',{class:'panel',style:'left:560px;top:250px;width:800px;height:370px;border:2px solid #d9b24e88;padding:40px 50px;text-align:center'},root);
  d.innerHTML=`<div style="font-size:54px;color:${C.gold};line-height:1">⚠</div>
  <div class="eyebrow" style="margin-top:18px;font-size:17px">PENAFIAN · DISCLAIMER</div>
  <div style="font-size:27px;line-height:1.5;margin-top:18px;color:#eef1f6">Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian.</div>
  <div style="font-size:19px;color:${C.grey};margin-top:20px">Semua carta dalam video ini ialah ilustrasi pembelajaran — bukan data dagangan sejarah sebenar.</div>`;
  reg(d,{in:'start'});
  if(c.next){const n=el('div',{style:`position:absolute;left:0;width:1920px;top:660px;text-align:center;font-size:26px;color:${C.grey}`},root,esc(c.next));reg(n,{in:[0,0.8]});}
}

// ------------- timeline (kill zones) -------------
function buildTimeline(c,r,root){
  const p=el('div',{class:'panel',style:`left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;height:${r[3]}px`},root);
  reg(p,{in:c.in!=null?c.in:'start'});
  const s=sv('svg',{width:r[2],height:r[3],class:'sv',style:'position:absolute;left:0;top:0'},p);
  const L=250, R=r[2]-40, W=R-L, start=c.startHour!=null?c.startHour:18; // axis in NY hours, starting at startHour
  const X=h=>L+(((h-start+48)%24)/24)*W;
  const rows=c.rows; const top=c.top||70, rh=c.rowH||((r[3]-top-30)/rows.length);
  if(c.title){const tt=sv('text',{x:26,y:40,fill:C.dim,'font-size':16,'letter-spacing':2},s);tt.textContent=c.title;}
  rows.forEach((row,ri)=>{
    const y=top+ri*rh, g=sv('g',{},s);
    const lab=sv('text',{x:26,y:y+rh/2-6,fill:col(row.color||'white'),'font-size':17,'font-weight':700},g);lab.textContent=row.label;
    if(row.sub){const sl=sv('text',{x:26,y:y+rh/2+18,fill:C.dim,'font-size':14},g);sl.textContent=row.sub;}
    sv('line',{x1:L,x2:R,y1:y+rh/2,y2:y+rh/2,stroke:'#24304f','stroke-width':2},g);
    for(let k=0;k<=24;k+=c.tick||3){const hNY=(start+k)%24; const x=L+k/24*W; const hl=((hNY+row.offset)%24+24)%24;
      sv('line',{x1:x,x2:x,y1:y+rh/2-6,y2:y+rh/2+6,stroke:'#3a4766','stroke-width':1.5},g);
      const tx=sv('text',{x:x,y:y+rh-10,fill:C.grey,'font-size':15,'text-anchor':'middle'},g);tx.textContent=String(hl).padStart(2,'0')+':00';}
    (c.zones||[]).forEach(z=>{ if(z.rows && !z.rows.includes(ri)) return;
      const [h0,m0]=z.start.split(':').map(Number),[h1,m1]=z.end.split(':').map(Number);
      const a=h0+m0/60, b=h1+m1/60; let x0=X(a), x1=X(b); if(x1<=x0) x1=x0+(((b-a+24)%24)/24)*W;
      const zg=sv('g',{},g);
      sv('rect',{x:x0,y:y+rh/2-22,width:x1-x0,height:44,rx:6,fill:col(z.color)+'40',stroke:col(z.color),'stroke-width':1.5},zg);
      const conv=t=>{const [hh,mm]=t.split(':').map(Number);return String(((hh+row.offset)%24+24)%24).padStart(2,'0')+':'+String(mm).padStart(2,'0');};
      if(ri===0||z.labelAll){const zl=sv('text',{x:(x0+x1)/2,y:y+rh/2-30,fill:col(z.color),'font-size':15,'font-weight':700,'text-anchor':'middle'},zg);zl.textContent=z.name;}
      const zt=sv('text',{x:(x0+x1)/2,y:y+rh/2+6,fill:'#fff','font-size':14,'text-anchor':'middle'},zg);zt.textContent=conv(z.start)+'–'+conv(z.end);
      reg(zg,{in:z.in!=null?z.in:c.in,out:z.out});
    });
    reg(g,{in:row.in!=null?row.in:c.in});
  });
  (c.markers||[]).forEach(m=>{const x=X(m.h);const g=sv('g',{},s);sv('line',{x1:x,x2:x,y1:top-20,y2:r[3]-20,stroke:col(m.color||'gold'),'stroke-dasharray':'5 5','stroke-width':1.5},g);const t=sv('text',{x:x+6,y:top-24,fill:col(m.color||'gold'),'font-size':14},g);t.textContent=m.label;reg(g,{in:m.in});});
}

// ---------------- chart ----------------
function buildChart(c,r,root){
  const [x,y,w,h]=r; const bare=c.bare;
  const p=el('div',{class:bare?'':'panel',style:`position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px`},root);
  reg(p,{in:c.in!=null?c.in:'start'});
  const s=sv('svg',{width:w,height:h,class:'sv',style:'position:absolute;left:0;top:0;overflow:visible'},p);
  const defs=sv('defs',{},s);
  const cid='cl'+Math.random().toString(36).slice(2);
  const top=bare?20:(c.compact?54:64), bot=c.xlabels?44:(bare?20:30), left=bare?10:24, right=c.axis===false?20:(c.compact?70:86);
  const pw=w-left-right, ph=h-top-bot;
  const cs=c.candles||[]; const N=cs.length+(c.padR!=null?c.padR:3)+(c.padL||0.5);
  let lo=Infinity,hi=-Infinity; cs.forEach(k=>{lo=Math.min(lo,k[2]);hi=Math.max(hi,k[1]);});
  (c.overlays||[]).forEach(o=>{['p','p0','p1'].forEach(f=>{if(typeof o[f]==='number'){lo=Math.min(lo,o[f]);hi=Math.max(hi,o[f]);}});});
  if(c.ymin!=null)lo=c.ymin; if(c.ymax!=null)hi=c.ymax;
  const padY=(hi-lo)*(c.padY!=null?c.padY:0.12); lo-=padY; hi+=padY;
  const X=i=>left+((i+(c.padL||0.5)+0.5)/N)*pw; const Y=v=>top+(hi-v)/(hi-lo)*ph; const slot=pw/N;
  const P=(i,v)=>{ if(v==='h')return cs[Math.round(i)][1]; if(v==='l')return cs[Math.round(i)][2]; if(v==='c')return cs[Math.round(i)][3]; if(v==='o')return cs[Math.round(i)][0]; return v;};
  if(!bare){
    const t=sv('text',{x:24,y:36,fill:C.dim,'font-size':c.compact?14:16,'letter-spacing':1.5},s); t.textContent=(c.title||'FCPO · 15M')+(c.note===false?'':' · '+(c.note||'ILLUSTRATIVE SCENARIO'));
    if(c.tag){const tg=sv('text',{x:w-22,y:36,fill:col(c.tagColor||'white'),'font-size':c.compact?15:17,'font-weight':700,'text-anchor':'end','font-family':'Inter'},s);tg.textContent=c.tag;}
  }
  // grid + axis
  if(c.axis!==false){
    const g=sv('g',{},s); const step=c.ystep||niceStep((hi-lo)/5);
    for(let v=Math.ceil(lo/step)*step; v<=hi; v+=step){
      sv('line',{x1:left,x2:left+pw,y1:Y(v),y2:Y(v),stroke:'#18233f','stroke-width':1},g);
      const tx=sv('text',{x:w-right+14,y:Y(v)+5,fill:'#55607a','font-size':c.compact?13:14},g);tx.textContent=fmt(v);}
    sv('line',{x1:w-right+4,x2:w-right+4,y1:top,y2:top+ph,stroke:'#1c2846'},g);
  }
  if(c.xlabels){c.xlabels.forEach(xl=>{const tx=sv('text',{x:X(xl.i),y:h-16,fill:col(xl.color||'#55607a'),'font-size':14,'text-anchor':'middle'},s);tx.textContent=xl.text;reg(tx,{in:xl.in!=null?xl.in:c.in});});}
  // layers
  const back=sv('g',{},s), mid=sv('g',{},s), front=sv('g',{},s);
  // candle reveal times
  const times=new Array(cs.length).fill(null);
  const rv=c.reveal==null?[[c.in!=null?c.in:0,cs.length]]:c.reveal; let shown=0;
  rv.forEach(([cue,n,opt])=>{ const cc=S.cues[clamp(Array.isArray(cue)?cue[0]:cue,0,S.cues.length-1)]; const t0=tOf(cue); const cnt=n-shown; if(cnt<=0)return;
    const span=Math.min((opt&&opt.span)||(cc.t1-t0)*0.85, cnt*((opt&&opt.per)||0.16)); for(let k=shown;k<n;k++)times[k]=t0+(k-shown)*(span/cnt); shown=n; });
  const bw=Math.max(3,Math.min(slot*0.62,26));
  cs.forEach((k,i)=>{ if(times[i]==null) return; const [o,hh,l,cl]=k; const up=cl>=o; const cc=up?C.green:C.red;
    const g=sv('g',{},mid); const cx=X(i);
    sv('line',{x1:cx,x2:cx,y1:Y(hh),y2:Y(l),stroke:cc,'stroke-width':Math.max(1.5,bw*0.12)},g);
    const yt=Y(Math.max(o,cl)), yb=Y(Math.min(o,cl)); sv('rect',{x:cx-bw/2,y:yt,width:bw,height:Math.max(1.5,yb-yt),fill:cc,rx:1},g);
    if(c.dimCandles && c.dimCandles.some(([a,b])=>i>=a&&i<=b)) g.setAttribute('opacity',0.35);
    anims.push({node:g,kind:'candle',tin:times[i],tout:Infinity,dur:0.22});
  });
  // overlays
  (c.overlays||[]).forEach(o=>{
    const layer=o.back?back:front; const g=sv('g',{},layer); const color=col(o.color||'gold');
    const i0=o.i0!=null?o.i0:-0.5, i1=o.i1!=null?o.i1:cs.length+(c.padR!=null?c.padR:3)-1;
    const label=(tx,xx,yy,anchor,opts={})=>{ const t=sv('text',{x:xx,y:yy,fill:opts.fill||color,'font-size':opts.size||(c.compact?14:16),'font-weight':opts.weight||600,'text-anchor':anchor||'start','font-family':opts.inter?'Inter':"'JetBrains Mono'"},g);t.textContent=tx;
      if(opts.bg){ requestAnimationFrame(()=>{}); const bb=estimate(tx,opts.size||(c.compact?14:16),anchor,xx,yy); const rr=sv('rect',{x:bb.x-8,y:bb.y-5,width:bb.w+16,height:bb.h+10,rx:5,fill:'#0b1224',stroke:opts.border||color,'stroke-width':1.3},g); g.insertBefore(rr,t);} return t;};
    switch(o.type){
      case 'level':{ const yy=Y(o.p); const ln=sv('line',{x1:X(i0),x2:X(i1),y1:yy,y2:yy,stroke:color,'stroke-width':o.w||1.8,'stroke-dasharray':o.solid?null:(o.dash||'7 6')},g); if(o.solid)ln.removeAttribute('stroke-dasharray');
        if(o.label){const lp=o.lpos||'right'; const lx=lp==='left'?X(i0)+4:lp==='mid'?(X(i0)+X(i1))/2:X(i1)-4; label(o.label+(o.price?' · '+fmt(o.p):''),lx,yy+(o.below?20:-8),lp==='left'?'start':lp==='mid'?'middle':'end',{size:o.size});}
        break;}
      case 'zone':{ const ya=Y(Math.max(o.p0,o.p1)), yb=Y(Math.min(o.p0,o.p1)); sv('rect',{x:X(i0),y:ya,width:X(i1)-X(i0),height:yb-ya,fill:color,'fill-opacity':o.alpha||0.16,stroke:o.stroke===false?'none':color,'stroke-opacity':0.6,'stroke-width':1.2,rx:3},g);
        if(o.label){const lp=o.lpos||'in'; label(o.label,lp==='right'?X(i1)-6:X(i0)+8,lp==='below'?yb+20:lp==='above'?ya-8:ya+20,lp==='right'?'end':'start',{size:o.size||14});} break;}
      case 'band':{ sv('rect',{x:X(i0)-slot/2,y:top,width:X(i1)-X(i0)+slot,height:ph,fill:color,'fill-opacity':o.alpha||0.09,stroke:'none'},g);
        sv('line',{x1:X(i0)-slot/2,x2:X(i1)+slot/2,y1:top+(o.bottom?ph:0),y2:top+(o.bottom?ph:0),stroke:color,'stroke-width':3},g);
        if(o.label){label(o.label,(X(i0)+X(i1))/2,o.bottom?top+ph-12:top+24,'middle',{size:o.size||15,weight:700});} break;}
      case 'vline':{ const xx=X(o.i); sv('line',{x1:xx,x2:xx,y1:top,y2:top+ph,stroke:color,'stroke-width':1.5,'stroke-dasharray':'5 5'},g); if(o.label)label(o.label,xx+6,o.ly!=null?Y(o.ly):top+18,'start',{size:o.size||14}); break;}
      case 'mark':{ const pr=P(o.i,o.at||'l'); const isH=(o.at==='h'); const cx=X(o.i), cy=Y(pr); sv('circle',{cx,cy,r:o.r||8,fill:'none',stroke:color,'stroke-width':2.5},g);
        const off=isH?-1:1; if(o.label)label(o.label,cx+(o.dx||0),cy+off*(o.price!==false?44:26)+(isH?0:12)+(o.dy||0),'middle',{size:o.lsize||22,weight:800,inter:true});
        if(o.price!==false)label(typeof o.price==='string'?o.price:fmt(pr),cx+(o.dx||0),cy+off*20+(isH?0:10)+(o.dy||0),'middle',{fill:C.grey,size:14,weight:400}); break;}
      case 'path':{ const pts=o.pts.map(([i,v])=>[X(i),Y(P(i,v))]); const d='M'+pts.map(q=>q.join(',')).join(' L');
        if(o.fill){const fd=d+` L${pts[pts.length-1][0]},${pts[0][1]} Z`; const f=sv('path',{d:fd,fill:color,'fill-opacity':0.1,stroke:'none'},g);}
        const pa=sv('path',{d,stroke:color,'stroke-width':o.w||2.4,fill:'none','stroke-linejoin':'round','stroke-dasharray':o.dash||null},g); if(!o.dash){pa.removeAttribute('stroke-dasharray');reg(pa,{in:o.in,out:o.out},'draw');}
        (o.labels||[]).forEach((lb,k)=>{ if(!lb)return; const [px,py]=pts[k]; const up=o.pts[k][1]==='h'|| (k>0&&pts[k][1]<pts[k-1][1]&&!(k<pts.length-1&&pts[k][1]>pts[k+1][1])); label(lb,px,py+(up?-14:26),'middle',{size:15,weight:700}); });
        break;}
      case 'arrow':{ const [a,b]=o.from,[cc2,d2]=o.to; const x1=X(a),y1=Y(P(a,b)),x2=X(cc2),y2=Y(P(cc2,d2)); const mid2=[(x1+x2)/2+(o.curve||0),(y1+y2)/2-(o.curve||0)*0.3];
        const mkid=cid+'a'+Math.random().toString(36).slice(2,6); const m=sv('marker',{id:mkid,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:6,markerHeight:6,orient:'auto'},defs); sv('path',{d:'M0,0 L10,5 L0,10 z',fill:color},m);
        const pa=sv('path',{d:`M${x1},${y1} Q${mid2[0]},${mid2[1]} ${x2},${y2}`,stroke:color,'stroke-width':o.w||2.4,fill:'none','marker-end':`url(#${mkid})`,'stroke-dasharray':o.dash||null},g); if(!o.dash)pa.removeAttribute('stroke-dasharray');
        if(o.label)label(o.label,x2+(o.lx||10),y2+(o.ly||0),o.anchor||'start',{size:o.size||15,weight:700}); if(!o.dash)reg(pa,{in:o.in,out:o.out},'draw'); break;}
      case 'text':{ label(o.text,X(o.i),Y(P(o.i,o.p))+(o.dy||0),o.anchor||'middle',{size:o.size||16,weight:o.weight||700,bg:o.box,fill:o.fill?col(o.fill):color,inter:o.inter}); break;}
      case 'bos':{ const yy=Y(P(o.i0,o.p)); sv('line',{x1:X(o.i0),x2:X(o.i1),y1:yy,y2:yy,stroke:color,'stroke-width':1.8},g); label(o.label||'BOS',(X(o.i0)+X(o.i1))/2,yy+(o.below?20:-8),'middle',{size:o.size||15,weight:800}); break;}
      case 'sweep':{ const k=cs[o.i]; const pr=o.side==='low'?k[2]:k[1]; const cx=X(o.i), cy=Y(pr); sv('circle',{cx,cy,r:13,fill:color,'fill-opacity':0.18,stroke:color,'stroke-width':2},g); if(o.label)label(o.label,cx+(o.dx||0),cy+(o.side==='low'?34:-22)+(o.dy||0),o.anchor||'middle',{size:o.size||15,weight:800}); break;}
      case 'fvg':{ const a=cs[o.i-1], b=cs[o.i+1]; const bull=o.bear?false:true; const p0=bull?a[1]:b[1], p1=bull?b[2]:a[2]; const ya=Y(Math.max(p0,p1)), yb=Y(Math.min(p0,p1));
        sv('rect',{x:X(o.i-1)-bw/2,y:ya,width:X(o.i1!=null?o.i1:o.i+6)-X(o.i-1),height:Math.max(2,yb-ya),fill:color,'fill-opacity':0.2,stroke:color,'stroke-opacity':0.7,rx:2},g); label(o.label||'FVG',X(o.i1!=null?o.i1:o.i+6)-6,ya-6,'end',{size:13}); break;}
      case 'bracket':{ const xx=X(o.i)+(o.dx||0), ya=Y(o.p0), yb=Y(o.p1); sv('path',{d:`M${xx-8},${ya} L${xx},${ya} L${xx},${yb} L${xx-8},${yb}`,stroke:color,'stroke-width':2,fill:'none'},g); if(o.label)label(o.label,xx+10,(ya+yb)/2+5,'start',{size:o.size||15,weight:700,bg:true}); break;}
    }
    if(!(o.type==='path'&&!o.dash) && !(o.type==='arrow'&&!o.dash)) reg(g,{in:o.in,out:o.out});
  });
  return p;
}
function niceStep(x){const p=Math.pow(10,Math.floor(Math.log10(x)));const n=x/p;return (n<1.5?1:n<3.5?2:n<7.5?5:10)*p;}
function estimate(tx,size,anchor,x,y){const w=tx.length*size*0.62;const x0=anchor==='middle'?x-w/2:anchor==='end'?x-w:x;return {x:x0,y:y-size*0.85,w,h:size*1.1};}

function buildComp(c,root,layout){
  const r=rectOf(c,layout);
  switch(c.type){
    case 'head':return buildHead(c,r,root);
    case 'title':return buildTitle(c,root);
    case 'notes':return buildNotes(c,r,root);
    case 'list':return buildList(c,r,root);
    case 'table':return buildTable(c,r,root);
    case 'cards':return buildCards(c,r,root);
    case 'flow':return buildFlow(c,r,root);
    case 'callout':return buildCallout(c,r,root);
    case 'text':return buildText(c,r,root);
    case 'chart':return buildChart(c,r,root);
    case 'timeline':return buildTimeline(c,r,root);
    case 'disclaimer':return buildDisclaimer(c,root);
  }
}

function buildScene(i){
  sceneEl.innerHTML=''; anims=[]; S=EP.scenes[i]; cur=i;
  hdr.r2.textContent=S.label||'';
  const root=el('div',{style:'position:absolute;inset:0'},sceneEl);
  S.comps.forEach(c=>buildComp(c,root,S.layout));
}

function apply(t){
  let done=0, parts=[];
  for(const a of anims){
    let p=clamp((t-a.tin)/a.dur,0,1); let q=a.tout<Infinity?clamp((t-a.tout)/0.35,0,1):0;
    const e=ease(p)*(1-ease(q));
    if(a.kind==='draw'){ a.node.style.strokeDashoffset=a.len*(1-ease(p)); a.node.style.opacity=t<a.tin?0:(1-ease(q)); }
    else if(a.kind==='candle'){ a.node.style.opacity=e; a.node.style.transformBox='fill-box'; a.node.style.transformOrigin='center'; a.node.style.transform=`scaleY(${0.3+0.7*ease(p)})`; }
    else { a.node.style.opacity=e; if(a.node instanceof HTMLElement) a.node.style.transform=`translateY(${(1-ease(p))*14}px)`; }
    if((p>0&&p<1)||(q>0&&q<1)) parts.push(Math.round(p*60)+'/'+Math.round(q*30)); else if(p>=1&&q<=0) done++; else if(q>=1) done+=1000;
  }
  return done+'|'+parts.join(',');
}

window.renderAt=function(t){
  let i=EP.scenes.findIndex(s=>t>=s.t0&&t<s.t1); if(i<0)i=EP.scenes.length-1;
  if(i!==cur) buildScene(i);
  const k=apply(t);
  const fi=clamp((t-S.t0)/0.4,0,1), fo=clamp((S.t1-t)/0.4,0,1); const sa=Math.min(fi,fo);
  sceneEl.style.opacity=sa;
  let sub=''; let si=-1; for(const c of S.cues){ for(let j=0;j<c.subs.length;j++){const sb=c.subs[j]; if(t>=sb.t0&&t<sb.t1){sub=sb.text;si=c.idx*100+j;}}}
  if(subEl.dataset.k!==String(si)){subEl.dataset.k=si; subEl.innerHTML=sub?`<span>${esc(sub)}</span>`:'';}
  const bw=Math.round(1920*t/EP.duration); barEl.style.width=bw+'px';
  return i+'|'+Math.round(sa*30)+'|'+k+'|'+si+'|'+bw;
};
window.initEP=function(ep){
  EP=ep; cur=-1;
  document.body.innerHTML=`<div id="stage"></div><div id="hdr"><div class="badge">${esc(ep.meta.badge||'L7')}</div><div class="l1">${esc(ep.meta.l1)}</div><div class="l2">${esc(ep.meta.l2)}</div><div class="r1">${esc(ep.meta.r1)}</div><div class="r2 mono"></div></div><div id="scene"></div><div id="sub"></div><div id="bartrack"></div><div id="bar"></div>`;
  sceneEl=document.getElementById('scene'); subEl=document.getElementById('sub'); barEl=document.getElementById('bar');
  hdr.r2=document.querySelector('#hdr .r2');
};
})();
