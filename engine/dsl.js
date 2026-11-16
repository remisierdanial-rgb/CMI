// Authoring helpers: deterministic OHLC generation + overlay shorthands.
'use strict';
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

/**
 * gen({start, seed, vol, steps})
 *  step forms:
 *   {n, to, vol?, wick?}        trend leg: n candles, last close === to
 *   {range:n, lo, hi, vol?}     consolidation: every high<=hi, every low>=lo
 *   {h, l, c, o?}               explicit candle (o defaults to previous close)
 *  Every candle satisfies: high >= max(open,close), low <= min(open,close). Prices are integers (FCPO tick = RM1).
 */
function gen(spec){
  const R=rng(spec.seed||7); const out=[]; let px=spec.start; const baseVol=spec.vol||12;
  const push=(o,h,l,c)=>{o=Math.round(o);c=Math.round(c);h=Math.round(Math.max(h,o,c));l=Math.round(Math.min(l,o,c));out.push([o,h,l,c]);px=c;};
  for(const s of spec.steps){
    if(s.range!=null){
      const vol=s.vol||baseVol*0.7; const lo=s.lo, hi=s.hi;
      for(let k=0;k<s.range;k++){
        const o=Math.min(hi-1,Math.max(lo+1,px));
        let c=o+(R()-0.5)*vol*1.6; const pull=((lo+hi)/2-o)*0.35; c+=pull; c=Math.min(hi-2,Math.max(lo+2,c));
        if(s.end!=null&&k===s.range-1)c=s.end;
        let h=Math.max(o,c)+R()*vol*0.6, l=Math.min(o,c)-R()*vol*0.6;
        if(s.touchHi&&s.touchHi.includes(k))h=hi; if(s.touchLo&&s.touchLo.includes(k))l=lo;
        h=Math.min(hi,h); l=Math.max(lo,l); push(o,h,l,c);
      }
    } else if(s.n!=null){
      const vol=s.vol||baseVol, wick=s.wick!=null?s.wick:0.45; const from=px, n=s.n;
      for(let k=1;k<=n;k++){
        const o=px; const target=from+(s.to-from)*(k/n); const noise=k===n?0:(R()-0.5)*vol*(s.noise!=null?s.noise:1.4);
        const c=target+noise; const body=Math.abs(c-o);
        const h=Math.max(o,c)+R()*Math.max(vol*wick,body*0.25), l=Math.min(o,c)-R()*Math.max(vol*wick,body*0.25);
        push(o,h,l,c);
      }
    } else { const o=s.o!=null?s.o:px; push(o,s.h,s.l,s.c); }
  }
  return out;
}

// overlay shorthands
const O={
  level:(p,label,color,x={})=>Object.assign({type:'level',p,label,color},x),
  zone:(p0,p1,i0,i1,label,color,x={})=>Object.assign({type:'zone',p0,p1,i0,i1,label,color},x),
  band:(i0,i1,label,color,x={})=>Object.assign({type:'band',i0,i1,label,color},x),
  mark:(i,at,label,color,x={})=>Object.assign({type:'mark',i,at,label,color},x),
  path:(pts,color,x={})=>Object.assign({type:'path',pts,color},x),
  arrow:(from,to,color,x={})=>Object.assign({type:'arrow',from,to,color},x),
  text:(i,p,text,color,x={})=>Object.assign({type:'text',i,p,text,color},x),
  bos:(i0,i1,p,label,color,dir,x={})=>Object.assign({type:'bos',i0,i1,p,label,color,dir},x),
  vline:(i,label,color,x={})=>Object.assign({type:'vline',i,label,color},x),
  sweep:(i,side,level,label,color,x={})=>Object.assign({type:'sweep',i,side,level,label,color},x),
  fvg:(i,x={})=>Object.assign({type:'fvg',i,color:x.bear?'red':'green'},x),
  bracket:(i,p0,p1,label,color,x={})=>Object.assign({type:'bracket',i,p0,p1,label,color},x),
};
// cue helper: c(en, ms, extra)
const cue=(en,ms,x={})=>Object.assign({en,ms},x);
const lowIdx=(cs,a,b)=>{let m=a;for(let i=a;i<=b;i++)if(cs[i][2]<cs[m][2])m=i;return m;};
const highIdx=(cs,a,b)=>{let m=a;for(let i=a;i<=b;i++)if(cs[i][1]>cs[m][1])m=i;return m;};
module.exports={gen,O,cue,lowIdx,highIdx,rng};
