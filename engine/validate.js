// Technical-accuracy validator: OHLC integrity + declared structural checks for every chart.
'use strict';
function validateChart(cs, chart, where){
  const errs=[], ok=[];
  cs.forEach((k,i)=>{const [o,h,l,c]=k; if(!(h>=Math.max(o,c)&&l<=Math.min(o,c)&&h>=l)) errs.push(`${where}: candle ${i} OHLC inconsistent ${k}`); if(k.some(v=>!Number.isFinite(v)))errs.push(`${where}: candle ${i} NaN`);});
  cs.forEach((k,i)=>{ if(i>0){const prev=cs[i-1][3]; if(Math.abs(k[0]-prev)>Math.max(8,Math.abs(prev)*0.004)) errs.push(`${where}: gap at candle ${i} open ${k[0]} vs prev close ${prev}`);} if(k[2]<=0) errs.push(`${where}: non-positive price at ${i}`);});
  const H=i=>cs[i][1], L=i=>cs[i][2], Cl=i=>cs[i][3], Op=i=>cs[i][0];
  const P=(i,v)=>v==='h'?H(i):v==='l'?L(i):v==='c'?Cl(i):v;
  const T={
    sweepBelow:([i,p])=>L(i)<p, sweepAbove:([i,p])=>H(i)>p,
    closeAbove:([i,p])=>Cl(i)>p, closeBelow:([i,p])=>Cl(i)<p,
    lowerLow:([a,b])=>L(b)<L(a), higherLow:([a,b])=>L(b)>L(a), higherHigh:([a,b])=>H(b)>H(a), lowerHigh:([a,b])=>H(b)<H(a),
    maxHigh:([a,b,p])=>{for(let i=a;i<=b;i++)if(H(i)>p)return false;return true;},
    minLow:([a,b,p])=>{for(let i=a;i<=b;i++)if(L(i)<p)return false;return true;},
    isLow:([i,a,b])=>{for(let j=a;j<=b;j++)if(L(j)<L(i))return false;return true;},
    isHigh:([i,a,b])=>{for(let j=a;j<=b;j++)if(H(j)>H(i))return false;return true;},
    eqHigh:([i,j,t])=>Math.abs(H(i)-H(j))<=(t||2), eqLow:([i,j,t])=>Math.abs(L(i)-L(j))<=(t||2),
    bull:(i)=>Cl(i)>Op(i), bear:(i)=>Cl(i)<Op(i),
    noCloseBelow:([a,b,p])=>{for(let i=a;i<=b;i++)if(Cl(i)<p)return false;return true;},
    noCloseAbove:([a,b,p])=>{for(let i=a;i<=b;i++)if(Cl(i)>p)return false;return true;},
  };
  (chart.checks||[]).forEach(ch=>{for(const k in ch){ if(!T[k]){errs.push(`${where}: unknown check ${k}`);continue;} (T[k](ch[k])?ok:errs).push(`${where}: ${k} ${JSON.stringify(ch[k])}`);}});
  (chart.overlays||[]).forEach(o=>{
    if(o.type==='sweep'&&o.level!=null){const pass=o.side==='low'?L(o.i)<o.level:H(o.i)>o.level;(pass?ok:errs).push(`${where}: sweep candle ${o.i} ${o.side} through ${o.level} (${o.side==='low'?L(o.i):H(o.i)})`);}
    if(o.type==='bos'&&o.dir){const lvl=P(o.i0,o.p);let hit=-1;for(let j=o.i0+1;j<=Math.min(o.i1,cs.length-1);j++){if(o.dir==='up'?Cl(j)>lvl:Cl(j)<lvl){hit=j;break;}}
      (hit>=0?ok:errs).push(`${where}: ${o.label||'BOS'} ${o.dir} close beyond ${lvl}${hit>=0?' at candle '+hit:''}`);}
    if(o.type==='fvg'){const a=cs[o.i-1],b=cs[o.i+1];if(!a||!b){errs.push(`${where}: FVG index out of range`);return;} const pass=o.bear?a[2]>b[1]:b[2]>a[1];(pass?ok:errs).push(`${where}: ${o.bear?'bearish':'bullish'} FVG at ${o.i} (gap ${o.bear?a[2]+'>'+b[1]:b[2]+'>'+a[1]})`);}
    if(o.type==='mark'&&o.swing){const i=o.i,isH=o.at==='h';const a=Math.max(0,i-2),b=Math.min(cs.length-1,i+2);let pass=true;for(let j=a;j<=b;j++){if(isH?H(j)>H(i):L(j)<L(i))pass=false;}(pass?ok:errs).push(`${where}: swing ${isH?'high':'low'} at ${i} (${isH?H(i):L(i)})`);}
    ['p','p0','p1'].forEach(f=>{if(o[f]!=null&&typeof o[f]!=='number'&&!['h','l','c','o'].includes(o[f]))errs.push(`${where}: bad price ref ${o[f]}`);});
  });
  return {errs,ok};
}
module.exports={validateChart};
