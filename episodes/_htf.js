// Higher-timeframe (daily) datasets shared by Daily Bias, Judas Swing, Integration and FCPO episodes.
'use strict';
const {gen}=require('../engine/dsl');
const {lowIdx,highIdx}=require('../engine/dsl');
const mirror=(cs,M)=>cs.map(([o,h,l,c])=>[2*M-o,2*M-l,2*M-h,2*M-c]);

/** Bullish daily structure: HL/HH sequence, a displacement leg with an FVG in discount, and a current pullback into discount/OTE. */
function htfBull(base=4000,seed=61){
  const b=base; const cs=gen({start:b,seed,vol:16,steps:[
    {n:6,to:b+120,vol:16},{n:4,to:b+62,vol:14},{n:6,to:b+212,vol:16},{n:4,to:b+142,vol:14},
    {o:b+142,h:b+152,l:b+136,c:b+150},{o:b+150,h:b+158,l:b+144,c:b+155},{o:b+155,h:b+194,l:b+152,c:b+190},{o:b+190,h:b+206,l:b+182,c:b+201},
    {n:4,to:b+290,vol:14},{o:b+290,h:b+302,l:b+280,c:b+286},{n:5,to:b+198,vol:12},{o:b+198,h:b+204,l:b+188,c:b+196}]});
  const w=(f,a,c)=>f(cs,Math.max(0,a),Math.min(cs.length-1,c));
  const sl0=w(lowIdx,0,2), sh1=w(highIdx,3,7), sl1=w(lowIdx,8,11), sh2=w(highIdx,13,17), sl2=w(lowIdx,18,21), sh3=w(highIdx,26,29), cur=cs.length-1;
  const H=cs[sh3][1], L=cs[sl2][2], EQ=Math.round((H+L)/2);
  const ote=[Math.round(H-0.62*(H-L)),Math.round(H-0.79*(H-L))];
  return {cs,sl0,sh1,sl1,sh2,sl2,sh3,cur,H,L,EQ,ote,fvg:22,base:b};
}
const htfBear=(base=4000,seed=61)=>{const d=htfBull(base,seed);const M=base+150;const cs=mirror(d.cs,M);
  return Object.assign({},d,{cs,M,H:2*M-d.L,L:2*M-d.H,EQ:2*M-d.EQ,ote:d.ote.map(x=>2*M-x)});};

/** Hourly: previous day + today, for PDH/PDL/PDO/PDC lessons (24 + 14 candles). */
function twoDays(base=4200,seed=62){
  const cs=gen({start:base,seed,vol:7,steps:[{n:6,to:base-24,vol:8},{n:8,to:base+30,vol:8},{n:6,to:base+12,vol:7},{n:4,to:base+20,vol:6},
    {range:5,lo:base+8,hi:base+30,vol:6,end:base+16},{o:base+16,h:base+18,l:base-30,c:base-26},{o:base-26,h:base-6,l:base-29,c:base-8},{n:4,to:base+22,vol:8},{n:3,to:base+40,vol:7},{o:base+40,h:base+44,l:base+33,c:base+36}]});
  const d1=cs.slice(0,24); const PDH=Math.max(...d1.map(k=>k[1])), PDL=Math.min(...d1.map(k=>k[2])), PDO=d1[0][0], PDC=d1[23][3];
  return {cs,PDH,PDL,PDO,PDC};
}
module.exports={htfBull,htfBear,twoDays,mirror};
