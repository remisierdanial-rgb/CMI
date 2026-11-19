/* Standard series templates (opening sting, title card, summary, closing,
   references, disclaimer) + timeline builder. Loaded both in the browser and
   in Node (tools/*.mjs) so narration lines and timing stay identical. */
(function(G){
'use strict';

const SERIES=[
  ['01','Apa Itu Kontrak Niaga Hadapan'],
  ['02','Bursa Malaysia Derivatives (BMD)'],
  ['03','Long dan Short — Harga Naik atau Turun'],
  ['04','Leverage — Peluang dan Risikonya'],
  ['05','Spesifikasi Kontrak FCPO'],
  ['06','Margin Awal dan Margin Penyelenggaraan'],
  ['07','Bulan Kontrak dan Rollover'],
  ['08','Sesi Dagangan FCPO'],
];
G.SERIES=SERIES;

const L=x=>Array.isArray(x)?{en:x[0],bm:x[1],hold:x[2]||0}:x;

G.assembleScenes=function(def){
  const C=G.C;
  const out=[];
  /* 0 — CMI logo opening (no narration) */
  out.push({id:'sting',label:'',noHeader:true,minDur:3.6,lines:[],
    dir:'Opening: official CMI logo fades/scales in centred on the dark navy background, gold rule wipes under it, tagline fades in. Dip to the hook.',
    build(S){
      const box=S.add(`<div style="position:absolute;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center"></div>`);
      S.add(`<div>${C.logo(G.LOGO_OK?300:220)}</div>`,{parent:box,at:.2,anim:'scale',d:1});
      S.add(`<div class="rule" style="margin-top:34px;width:260px"></div>`,{parent:box,at:1.2,anim:'wipe',d:.6});
      S.add(`<div class="lead" style="margin-top:22px;letter-spacing:.06em">Understanding Markets. Building Knowledge.</div>`,{parent:box,at:1.6,anim:'up'});
    }});
  /* 1 — hook (video-specific) */
  out.push(Object.assign({id:'hook',label:'HOOK'},def.hook));
  /* 2 — title card */
  out.push({id:'title',label:'PENGENALAN',lines:def.intro,
    dir:'Title card in the reference layout: kicker (module · video), large title = exact subtopic name, subtitle line, blue rule, learning objectives checklist appearing one by one; topic illustration panel on the right.',
    build(S){
      C.title(S,{kicker:`VIDEO ${def.num} · ${def.moduleLabel}`,title:def.title,size:'h1',x:100,y:200,w:1700,at:.1});
      S.add(`<div class="lead">${def.tagline}</div>`,{x:104,y:400,w:1100,at:.5});
      S.add(`<div class="rule"></div>`,{x:104,y:466,at:.8,anim:'wipe'});
      S.add(`<div class="small">Objektif pembelajaran</div>`,{x:104,y:516,at:S.c(0,.4)});
      C.list(S,{x:104,y:560,w:1000,check:true,items:def.objectives.map((o,i)=>[o,S.c(0,.8)+i*.7])});
      if(def.titleArt)def.titleArt(S);
    }});
  /* content */
  def.scenes.forEach(s=>out.push(s));
  /* summary */
  out.push({id:'summary',label:'RUMUSAN',lines:def.takeaways.map(t=>[t[0],t[1]]),
    dir:'Key-points checklist, two columns, each item ticks in with its narration line.',
    build(S){
      C.title(S,{kicker:'Perkara utama · Key points',title:`${def.title} — apa yang perlu diingat`,at:.1,w:1700});
      const half=Math.ceil(def.takeaways.length/2);
      C.list(S,{x:110,y:330,w:820,check:true,size:31,items:def.takeaways.slice(0,half).map((t,i)=>[t[2],S.c(i,.1)])});
      C.list(S,{x:980,y:330,w:840,check:true,size:31,items:def.takeaways.slice(half).map((t,i)=>[t[2],S.c(i+half,.1)])});
    }});
  /* end message (exact quote from brief, shown on screen; subtitles hidden) */
  out.push({id:'message',label:'MESEJ AKHIR',noSubs:true,lines:[[def.endQuote[0],def.endQuote[1],.8]],
    dir:'Key message: quote set large on screen, blue quote mark, words fade in phrase by phrase. Subtitle hidden (quote already on screen).',
    build(S){
      S.add(`<div style="font:800 140px/1 var(--sans);color:var(--blue2)">“</div>`,{x:150,y:230,at:.1,anim:'pop'});
      const q=S.add(`<div style="font:700 56px/1.32 var(--sans);letter-spacing:-.01em"></div>`,{x:240,y:290,w:1440});
      const words=def.endQuote[1].split(' ');
      const T0=.3,T1=Math.max(1.2,S.e(0)-.6);
      words.forEach((w,i)=>{S.add(`<span>${w} </span>`,{parent:q,at:T0+(T1-T0)*i/words.length,anim:'fade',d:.4});});
      S.add(`<div class="rule"></div>`,{x:244,y:760,at:S.e(0,-.3),anim:'wipe'});
    }});
  /* closing (series standard) */
  out.push({id:'closing',label:'PENUTUP',lines:[
      ['This is only the foundation for understanding the futures market.','Ini baru asas untuk memahami pasaran niaga hadapan.'],
      ['Know the product you trade before taking any risk.','Kenali produk yang anda dagangkan sebelum mengambil sebarang risiko.'],
      ['Continue your learning with Capital Market Institute.','Teruskan pembelajaran anda bersama Capital Market Institute.',.6]],
    dir:'Standard closing (reference "series roadmap" style): left, vertical list of the 8 videos with the current one outlined in gold and an "ANDA DI SINI" tag; right, CMI logo lock-up with tagline appearing on the last line.',
    build(S){
      C.title(S,{kicker:'Siri futures · Modul 1 & 2',title:'Lapan video · satu asas',at:.1});
      SERIES.forEach(([n,t],i)=>{
        const cur=n===def.num;
        S.add(`<div class="card ${cur?'hl':''}" style="height:58px"><div style="position:absolute;left:22px;top:15px;font:700 22px var(--mono);color:${cur?'var(--blue3)':'var(--slate)'}">${n}</div><div style="position:absolute;left:78px;top:15px;font:600 23px var(--sans);color:${cur?'#fff':'var(--slate2)'}">${t}</div></div>`,{x:110,y:270+i*68,w:820,at:.3+i*.12,anim:'left'});
      });
      S.add(`<div class="tag blue">Anda di sini</div>`,{x:950,y:280+(parseInt(def.num)-1)*68,at:1.4,anim:'pop'});
      const box=S.add(`<div style="position:absolute;left:1120px;width:720px;top:300px;height:480px;display:flex;flex-direction:column;align-items:center;justify-content:center"></div>`);
      S.add(`<div>${C.logo(G.LOGO_OK?230:120)}</div>`,{parent:box,at:S.c(2),anim:'scale',d:.8});
      if(!G.LOGO_OK)0;
      S.add(`<div class="rule" style="margin-top:26px;width:200px"></div>`,{parent:box,at:S.c(2,.5),anim:'wipe'});
      S.add(`<div class="lead" style="margin-top:16px;font-size:28px;letter-spacing:.05em;text-align:center">Understanding Markets. Building Knowledge.</div>`,{parent:box,at:S.c(2,.8)});
    }});
  /* references */
  out.push({id:'refs',label:'RUJUKAN',lines:[['The references for this video are shown on screen. Always check the latest official specifications.','Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak spesifikasi rasmi terkini.',1.6]],
    dir:'References list: numbered rows, organisation + document title, verification note on right.',
    build(S){
      C.title(S,{kicker:'Rujukan · References',title:'Sumber rujukan video ini',at:.1});
      def.sources.forEach((s,i)=>{
        S.add(`<div class="card" style="height:66px"><div style="position:absolute;left:24px;top:20px;font:700 20px var(--mono);color:var(--blue3)">${String(i+1).padStart(2,'0')}</div><div style="position:absolute;left:80px;top:19px;font:600 23px var(--sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:1250px">${s.org} — ${s.title}</div><div style="position:absolute;right:24px;top:23px;font:500 17px var(--mono);color:var(--slate2);letter-spacing:.06em">${s.note||''}</div></div>`,{x:110,y:290+i*80,w:1700,at:.4+i*.18,anim:'left'});
      });
    }});
  /* disclaimer */
  const next=SERIES[parseInt(def.num)];
  out.push({id:'disclaimer',label:'PENAFIAN',lines:[['For educational purposes only. This is not financial advice, and it is not a guarantee of profit. Futures trading involves a high risk of loss.','Untuk tujuan pendidikan sahaja. Ini bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian yang tinggi.',1.8]],
    dir:'Disclaimer card centred: warning icon, PENAFIAN · DISCLAIMER, risk statement, hypothetical-figures note, next-video pointer.',
    build(S){
      const c=S.add(`<div class="card warn" style="padding:44px 60px;text-align:center;color:var(--white)"></div>`,{x:460,y:200,w:1000,at:.1,anim:'scale'});
      c.innerHTML=`<div style="display:flex;justify-content:center">${C.icon.warn(64)}</div>
        <div class="small warn" style="margin-top:18px;color:var(--warn)">Penafian · Disclaimer</div>
        <div style="font:700 34px/1.35 var(--sans);margin-top:18px">Educational Content Only.<br>High Risk, High Reward. Trade Wisely.</div>
        <div class="body" style="margin-top:20px;font-size:24px">Bukan nasihat pelaburan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian yang boleh melebihi margin awal.</div>
        <div style="margin-top:20px;font:500 19px var(--mono);color:var(--slate2)">Semua harga, margin & contoh dalam video ini ialah ilustrasi hipotetikal.</div>`;
      S.add(`<div class="lead" style="text-align:center;font-size:26px">${next?`Seterusnya: Video ${next[0]} — ${next[1]}`:'Tamat Siri Modul 1 & 2 · Teruskan pembelajaran anda'}</div>`,{x:0,y:760,w:1920,at:1.2});
    }});
  let n=0;
  out.forEach(s=>{s.lines=(s.lines||[]).map(L);if(!s.noHeader)s.sceneNo=++n;});
  return out;
};

/* Split a BM subtitle into on-screen chunks (<= max chars, sentence/comma aware). */
function chunk(text,max=116){
  if(text.length<=max)return [text];
  const sent=text.match(/[^.?!]+[.?!]+(\s|$)|[^.?!]+$/g).map(s=>s.trim()).filter(Boolean);
  const out=[];let cur='';
  const push=s=>{if(s.length<=max){out.push(s);return;}
    const parts=s.split(/(?<=,)\s/);let c='';
    parts.forEach(p=>{if((c+' '+p).trim().length>max&&c){out.push(c.trim());c=p;}else c=(c+' '+p).trim();});
    if(c){ if(c.length>max){const w=c.split(' ');let a='';w.forEach(x=>{if((a+' '+x).trim().length>max){out.push(a.trim());a=x;}else a=(a+' '+x).trim();});if(a)out.push(a);} else out.push(c);} };
  sent.forEach(s=>{if((cur+' '+s).trim().length<=max)cur=(cur+' '+s).trim();else{if(cur)push(cur);cur=s;}});
  if(cur)push(cur);
  return out;
}
G.chunkSub=chunk;

/* durations: per scene, array of narration clip durations (seconds) */
G.buildTimeline=function(scenes,durations){
  const LEAD=.5,GAP=.34,TAIL=.8;
  let T=0;const out=[];
  scenes.forEach((s,si)=>{
    let t=s.lead!=null?s.lead:(si===1?.5:LEAD);
    const lines=s.lines.map((l,li)=>{
      const d=durations[si][li];
      const o={t0:t,t1:t+d,audio:d,en:l.en,bm:l.bm};
      const ch=chunk(l.bm);const tot=ch.reduce((a,c)=>a+c.length,0);
      let a=t;o.subs=s.noSubs?[]:ch.map(c=>{const dd=d*c.length/tot;const r={t0:a,t1:a+dd+(c===ch[ch.length-1]?.25:0),text:c};a+=dd;return r;});
      t+=d+GAP+(l.hold||0);
      return o;
    });
    let dur=Math.max(t-GAP+TAIL+(s.tail||0),s.minDur||0);
    out.push({id:s.id,label:s.label,t0:T,t1:T+dur,dur,lines,noSubs:!!s.noSubs});
    T+=dur;
  });
  return {total:T,scenes:out};
};
})(typeof window!=='undefined'?window:globalThis);
