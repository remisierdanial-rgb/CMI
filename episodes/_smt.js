// Synchronised two-instrument datasets for SMT lessons. Same candle count = aligned time axis.
'use strict';
const {gen,lowIdx,highIdx}=require('../engine/dsl');
const mirror=(cs,M)=>cs.map(([o,h,l,c])=>[2*M-o,2*M-l,2*M-h,2*M-c]);
/**
 * Bullish SMT: A makes a lower low (sweeps its first low); B makes a higher low. Then A shifts structure up.
 * variant 'fail': both make lower lows and continue down (no SMT, or SMT that fails).
 */
function pair(variant='bull',seed=101){
  const A=gen({start:5000,seed,vol:8,steps:[{n:7,to:4944,vol:8},{o:4944,h:4948,l:4934,c:4940},{o:4940,h:4950,l:4936,c:4948},{n:5,to:4982,vol:7},{n:4,to:4950,vol:7},
    ...(variant==='fail'?[{o:4950,h:4952,l:4924,c:4927},{n:4,to:4904,vol:7},{n:6,to:4880,vol:7}]
      :variant==='nofollow'?[{o:4950,h:4952,l:4924,c:4928},{o:4928,h:4944,l:4926,c:4938},{o:4938,h:4946,l:4930,c:4934},{n:4,to:4906,vol:7},{n:4,to:4886,vol:7}]
      :[{o:4950,h:4952,l:4924,c:4928},{o:4928,h:4944,l:4926,c:4941},{o:4941,h:4972,l:4939,c:4969},{o:4969,h:4990,l:4965,c:4987},{n:6,to:5018,vol:7}])]});
  const B=gen({start:2100,seed:seed+7,vol:4,steps:[{n:7,to:2073,vol:4},{o:2073,h:2075,l:2066,c:2070},{o:2070,h:2076,l:2068,c:2074},{n:5,to:2092,vol:3.5},{n:4,to:2080,vol:3.5},
    ...(variant==='fail'?[{o:2080,h:2081,l:2062,c:2064},{n:4,to:2054,vol:3.5},{n:6,to:2042,vol:3.5}]
      :variant==='nofollow'?[{o:2080,h:2082,l:2072,c:2075},{o:2075,h:2082,l:2073,c:2078},{o:2078,h:2080,l:2070,c:2071},{n:4,to:2058,vol:3.5},{n:4,to:2048,vol:3.5}]
      :[{o:2080,h:2082,l:2072,c:2075},{o:2075,h:2083,l:2073,c:2081},{o:2081,h:2096,l:2080,c:2094},{o:2094,h:2104,l:2092,c:2102},{n:6,to:2116,vol:3.5}])]});
  const l1=7, l2=18, lh=lowIdx; // first low at 7, second low at 18
  const hA=highIdx(A,9,17), hB=highIdx(B,9,17);
  return {A,B,l1,l2,hA,hB,n:A.length};
}
const bearPair=(variant,seed)=>{const p=pair(variant,seed);return Object.assign({},p,{A:mirror(p.A,5000),B:mirror(p.B,2100)});};
module.exports={pair,bearPair,mirror};
