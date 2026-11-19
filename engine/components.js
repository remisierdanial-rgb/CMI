/* Reusable motion-graphics components. All take the Scene context S. */
(function(G){
'use strict';
const C={};

/* deterministic PRNG */
C.rng=function(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296;};};
C.fmt=n=>Math.round(n).toLocaleString('en-US');
C.rm=n=>'RM'+C.fmt(n);

/* Section title block, top-left (reference: kicker + bold title + rule) */
C.title=function(S,{kicker,title,sub,at=0,x=60,y=118,size='h2',w=1200}){
  const el=S.add(`<div><div class="kicker">${kicker||''}</div><div class="${size}" style="margin-top:12px">${title}</div>${sub?`<div class="lead" style="margin-top:10px">${sub}</div>`:''}</div>`,{x,y,w,at,anim:'up'});
  return el;
};
C.card=(S,o)=>S.add(`<div class="card ${o.cls||''}">${o.html||''}</div>`,{x:o.x,y:o.y,w:o.w,h:o.h,at:o.at,anim:o.anim||'scale',d:o.d||.6,out:o.out});

/* bullet list with per-item timing */
C.list=function(S,{x,y,w,items,check=false,size,parent}){
  const ul=S.add(`<ul class="list ${check?'check':''}"></ul>`,{x,y,w,parent});
  items.forEach(([txt,at])=>{const li=S.add(`<li>${txt}</li>`,{parent:ul,at,anim:'left'});if(size)li.style.fontSize=size+'px';});
  return ul;
};

/* SVG overlay covering the whole stage (or a parent) */
C.svg=function(S,{parent,x=0,y=0,w=1920,h=1080}={}){
  const s=svgEl('svg',{width:w,height:h,viewBox:`0 0 ${w} ${h}`});
  s.style.position='absolute';s.style.left=x+'px';s.style.top=y+'px';
  (parent||S.root).appendChild(s);return s;
};
/* arrow line with head, drawn at `at` */
C.arrow=function(S,svg,{x1,y1,x2,y2,at,d=.6,color='#E8B04F',w=3,dash,head=true,curve=0}){
  const g=svgEl('g',{});svg.appendChild(g);
  let dstr;
  if(curve){const mx=(x1+x2)/2,my=(y1+y2)/2-curve;dstr=`M${x1},${y1} Q${mx},${my} ${x2},${y2}`;}
  else dstr=`M${x1},${y1} L${x2},${y2}`;
  const p=svgEl('path',{d:dstr,stroke:color,'stroke-width':w,fill:'none','stroke-linecap':'round'});
  g.appendChild(p);
  if(dash){p.setAttribute('stroke-dasharray',dash);}
  if(head){
    const ang=curve?Math.atan2(y2-((y1+y2)/2-curve),x2-(x1+x2)/2):Math.atan2(y2-y1,x2-x1);
    const L=16,a1=ang+Math.PI*0.82,a2=ang-Math.PI*0.82;
    const hp=svgEl('path',{d:`M${x2+L*Math.cos(a1)},${y2+L*Math.sin(a1)} L${x2},${y2} L${x2+L*Math.cos(a2)},${y2+L*Math.sin(a2)}`,stroke:color,'stroke-width':w,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'});
    g.appendChild(hp);
    S.tween(at+d*.85,.2,q=>{hp.style.opacity=q;},'lin');
  }
  if(dash){S.tween(at,d,q=>{p.style.opacity=q;},'out');}
  else S.draw(p,at,d);
  return g;
};
/* moving dot along a straight path (e.g. order flow) */
C.pulse=function(S,svg,{x1,y1,x2,y2,at,d=1,color='#F0C36B',r=8}){
  const c=svgEl('circle',{r,fill:color});c.style.filter='drop-shadow(0 0 8px '+color+')';svg.appendChild(c);
  S.tween(at,d,p=>{c.setAttribute('cx',x1+(x2-x1)*p);c.setAttribute('cy',y1+(y2-y1)*p);c.style.opacity=(p>0&&p<1)?1:0;},'inout');
  return c;
};

/* flow node box */
C.node=function(S,{x,y,w=280,h=150,title,sub,icon,at,cls=''}){
  return S.add(`<div class="node ${cls}">${icon?`<div class="ni">${icon}</div>`:''}<div class="nt">${title}</div>${sub?`<div class="ns">${sub}</div>`:''}</div>`,{x,y,w,h,at,anim:'scale'});
};

/* Candlestick chart.
   pts: [[index, price],...] waypoints for the close path; n candles.
   Returns helpers for overlays. Candles reveal progressively from `at` over `d`. */
C.chart=function(S,{x,y,w,h,n=48,pts,min,max,at=0,d=2.5,seed=7,vol=true,label,title,ticks,parent,noise=.35,showAxis=true}){
  const wrap=S.add(`<div class="card"></div>`,{x,y,w,h,at:at-.4,anim:'fade',parent});
  if(label)S.add(`<div class="small" style="position:absolute;left:24px;top:20px">${label}</div>`,{parent:wrap});
  if(title)S.add(`<div style="position:absolute;right:24px;top:18px;font:700 20px var(--sans)">${title}</div>`,{parent:wrap});
  const padL=26,padR=showAxis?96:26,padT=64,volH=vol?90:0,padB=vol?24:30;
  const cw=w-padL-padR, ch=h-padT-padB-volH-(vol?16:0);
  const svg=C.svg(S,{parent:wrap,x:0,y:0,w,h});
  const r=C.rng(seed);
  // close path
  const closes=[];
  for(let i=0;i<n;i++){
    let k=0;while(k<pts.length-2&&i>pts[k+1][0])k++;
    const [i0,p0]=pts[k],[i1,p1]=pts[k+1];
    const f=Math.max(0,Math.min(1,(i-i0)/((i1-i0)||1)));
    closes.push(p0+(p1-p0)*f);
  }
  const rangeP=(max-min);
  const sc=v=>padT+ch*(1-(v-min)/rangeP);
  const xs=i=>padL+cw*(i+.5)/n;
  const bw=Math.max(4,cw/n*.58);
  const candles=[];
  let prev=closes[0]-(closes[1]-closes[0]);
  for(let i=0;i<n;i++){
    const jitter=(r()-.5)*rangeP*.025*noise*4;
    const c=closes[i]+(i>0&&i<n-1?jitter:0);
    const o=prev;
    const hi=Math.max(o,c)+r()*rangeP*.018, lo=Math.min(o,c)-r()*rangeP*.018;
    prev=c;
    const up=c>=o, col=up?'#22C3A6':'#EF5B5B';
    const g=svgEl('g',{});
    g.appendChild(svgEl('line',{x1:xs(i),x2:xs(i),y1:sc(hi),y2:sc(lo),stroke:col,'stroke-width':2}));
    const top=sc(Math.max(o,c)),bh=Math.max(2,Math.abs(sc(o)-sc(c)));
    g.appendChild(svgEl('rect',{x:xs(i)-bw/2,y:top,width:bw,height:bh,fill:col,rx:1}));
    if(vol){const vh=(.25+r()*.75)*volH;g.appendChild(svgEl('rect',{x:xs(i)-bw/2,y:h-padB-vh,width:bw,height:vh,fill:col,opacity:.45}));}
    svg.appendChild(g);candles.push({g,o,c,hi,lo,i});
  }
  // axis
  if(showAxis){
    const tk=ticks||(()=>{const step=rangeP/5;const a=[];for(let v=min+step*.5;v<max;v+=step)a.push(Math.round(v/10)*10);return a;})();
    tk.forEach(v=>{
      svg.insertBefore(svgEl('line',{x1:padL,x2:w-padR+6,y1:sc(v),y2:sc(v),stroke:'rgba(148,163,184,.08)'}),svg.firstChild);
      const t=svgEl('text',{x:w-padR+18,y:sc(v)+6,class:'ax'});t.textContent=C.fmt(v);svg.appendChild(t);
    });
    svg.appendChild(svgEl('line',{x1:w-padR+6,x2:w-padR+6,y1:padT-10,y2:h-padB,stroke:'rgba(148,163,184,.15)'}));
  }
  candles.forEach((cd,i)=>{const t0=at+d*i/n;S.tween(t0,.25,p=>{cd.g.style.opacity=p;},'out');});
  return {wrap,svg,xs,sc,closes,candles,last:candles[n-1],w,h,padL,padR,padT,
    hline(S2,{price,at,color='#F0C36B',label,dash='8 8',side='right'}){
      const l=svgEl('line',{x1:padL,x2:w-padR,y1:sc(price),y2:sc(price),stroke:color,'stroke-width':2,'stroke-dasharray':dash});svg.appendChild(l);
      S.tween(at,.5,p=>{l.style.opacity=p;},'out');
      if(label){const t=S.add(`<div class="chip" style="color:${color};border-color:${color};font-size:18px;padding:5px 10px">${label}</div>`,{parent:wrap,x:side==='right'?w-padR-10:padL+10,y:sc(price)-44,at,anim:'fade'});t.style.translate=side==='right'?'-100% 0':'0 0';}
      return l;
    },
    marker(S2,{i,price,at,color='#F0C36B',label,dy=-60,dx=0}){
      const cx=xs(i),cy=sc(price!=null?price:closes[i]);
      const c=svgEl('circle',{cx,cy,r:9,fill:color,stroke:'#08101F','stroke-width':3});svg.appendChild(c);
      S.tween(at,.35,p=>{c.style.opacity=p;c.setAttribute('r',9*(.4+.6*p));},'out');
      if(label){const el=S.add(`<div class="chip" style="color:${color};border-color:${color}">${label}</div>`,{parent:wrap,x:cx+dx,y:cy+dy,at,anim:'pop'});el.style.translate='-50% 0';}
      return {cx,cy};
    }
  };
};

/* simple horizontal value bar */
C.bar=function(S,{x,y,w,h=26,color='#E8B04F',bg='rgba(44,61,96,.6)',parent,at}){
  const o=S.add(`<div style="background:${bg};border-radius:${h/2}px;overflow:hidden"><i style="display:block;height:100%;width:0;background:${color};border-radius:${h/2}px"></i></div>`,{x,y,w,h,parent,at,anim:'fade'});
  const fill=o.firstElementChild;
  return {el:o,fill,set(S2,at,d,from,to){if(!o.style.opacity&&at!=null&&!S.reveals.find(r=>r.el===o))S.reveal(o,at-.3,{anim:'fade'});S.tween(at,d,p=>{fill.style.width=((from+(to-from)*p)*100)+'%';});}};
};

/* simple icons (inline SVG strings) */
const I=(p,s=56,c='#F0C36B',sw=3)=>`<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
C.icon={
  user:(s,c)=>I('<circle cx="24" cy="16" r="8"/><path d="M8 42c2-9 9-13 16-13s14 4 16 13"/>',s,c),
  broker:(s,c)=>I('<rect x="7" y="14" width="34" height="26" rx="3"/><path d="M17 14v-5h14v5M7 25h34"/>',s,c),
  exchange:(s,c)=>I('<path d="M6 18L24 7l18 11M10 18v18M18 18v18M30 18v18M38 18v18M6 40h36"/>',s,c),
  clearing:(s,c)=>I('<path d="M24 6l16 6v11c0 10-7 16-16 19C15 39 8 33 8 23V12z"/><path d="M17 24l5 5 9-10"/>',s,c),
  screen:(s,c)=>I('<rect x="5" y="8" width="38" height="26" rx="3"/><path d="M16 42h16M24 34v8M11 27l8-8 6 5 9-10"/>',s,c),
  palm:(s,c)=>I('<path d="M24 44V22M24 22c-4-8-12-9-17-6 7 0 12 2 17 6zM24 22c4-8 12-9 17-6-7 0-12 2-17 6zM24 22c-2-9 1-15 6-17-3 5-5 10-6 17zM24 22c-6-6-13-4-16 0 6-2 11-1 16 0z"/>',s,c),
  factory:(s,c)=>I('<path d="M6 42V22l10 6v-6l10 6v-6l10 6V8h6v34z"/><path d="M12 36h4M22 36h4M32 36h4"/>',s,c),
  drum:(s,c)=>I('<ellipse cx="24" cy="11" rx="13" ry="4"/><path d="M11 11v26c0 2 6 4 13 4s13-2 13-4V11M11 24c0 2 6 4 13 4s13-2 13-4"/>',s,c),
  doc:(s,c)=>I('<path d="M12 5h17l9 9v29H12z"/><path d="M29 5v9h9M18 24h14M18 31h14M18 38h9"/>',s,c),
  clock:(s,c)=>I('<circle cx="24" cy="24" r="18"/><path d="M24 13v11l7 5"/>',s,c),
  globe:(s,c)=>I('<circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c6 6 6 30 0 36M24 6c-6 6-6 30 0 36"/>',s,c),
  shield:(s,c)=>I('<path d="M24 6l16 6v11c0 10-7 16-16 19C15 39 8 33 8 23V12z"/>',s,c),
  warn:(s,c)=>I('<path d="M24 6l20 36H4z"/><path d="M24 19v11M24 36v1"/>',s,c||'#F5A524'),
  coin:(s,c)=>I('<circle cx="24" cy="24" r="17"/><path d="M19 30c1 2 3 3 5 3 3 0 5-2 5-4s-2-3-5-4-5-2-5-4 2-4 5-4c2 0 4 1 5 3M24 12v4M24 33v3"/>',s,c),
  ship:(s,c)=>I('<path d="M5 32h38l-5 9H10zM12 32V20h24v12M20 20v-8h8v8"/>',s,c),
  lock:(s,c)=>I('<rect x="10" y="21" width="28" height="21" rx="3"/><path d="M16 21v-6a8 8 0 0116 0v6"/>',s,c),
  swap:(s,c)=>I('<path d="M8 16h30l-7-7M40 32H10l7 7"/>',s,c),
  cal:(s,c)=>I('<rect x="6" y="9" width="36" height="33" rx="3"/><path d="M6 18h36M15 5v8M33 5v8"/>',s,c),
};

/* CMI brand mark: ascending bars inside rounded square */
/* Official CMI logo (engine/assets/cmi-logo.png). Falls back to a plain
   text wordmark if the logo file has not been supplied. */
C.logo=function(h=220){
  if(G.LOGO_OK)return `<img src="assets/cmi-logo.png" style="height:${h}px;width:auto;display:block">`;
  return `<div style="font:800 ${Math.round(h*.3)}px var(--sans);letter-spacing:.14em;color:var(--white)">CAPITAL MARKET INSTITUTE</div>`;
};

G.C=C;
})(window);
