// Shared datasets, meta and standard scenes for Level 7 episodes.
'use strict';
const {gen,O,cue}=require('../engine/dsl');

const meta=(n,title)=>({badge:'L7',l1:'LEVEL 7 · ADVANCED ICT CONCEPTS',l2:'CMI · SMART MONEY CONCEPT',r1:`EPISODE ${String(n).padStart(2,'0')} — ${title.toUpperCase()}`,ep:n,title});
const ILL='ILLUSTRATIVE SCENARIO — NOT HISTORICAL DATA';

// price-mirror an OHLC series around M (exact inverse scenario, OHLC stays valid)
const mirror=(cs,M)=>cs.map(([o,h,l,c])=>[2*M-o,2*M-l,2*M-h,2*M-c]);
// aggregate a slice of candles into one higher-timeframe candle
const agg=cs=>[cs[0][0],Math.max(...cs.map(k=>k[1])),Math.min(...cs.map(k=>k[2])),cs[cs.length-1][3]];

/**
 * Canonical PO3 / AMD intraday model (bullish; mirror() for bearish).
 * O = opening price. Returned idx describes every structural point so overlays + checks stay consistent.
 * variant: 'ok' | 'continue' (sweep but no reversal) | 'flat' (no distribution) | 'return' (expands then back into range)
 */
function po3(O,seed=3,variant='ok'){
  const lo=O-16, hi=O+16;
  const s=[{range:14,lo,hi,touchLo:[4,9],touchHi:[2,11],end:O+2}];
  const R=(o,h,l,c)=>({o:O+o,h:O+h,l:O+l,c:O+c});
  if(variant==='breakout'){ s.push(R(2,24,0,21),R(21,34,17,31),{n:12,to:O+96,vol:11},R(96,104,90,99)); const cs=gen({start:O,seed,vol:10,steps:s}); return {cs,O,lo,hi,end:cs.length-1}; }
  s.push(R(2,4,-12,-10),R(-10,-7,-21,-19),R(-19,-9,-22,-12),R(-12,-11,-34,-30),R(-30,-24,-38,-26));
  if(variant==='ok'||variant==='return'){
    s.push(R(-26,-4,-28,-6),R(-6,20,-8,17),R(17,30,11,26));
    if(variant==='ok'){ s.push({n:11,to:O+78,vol:11,noise:1.2},R(78,92,74,86),R(86,89,77,80)); }
    else { s.push({n:4,to:O+40,vol:10},{n:6,to:O+4,vol:10},{range:5,lo:O-10,hi:O+14,vol:8}); }
  } else if(variant==='continue'){
    s.push(R(-26,-22,-44,-41),R(-41,-36,-58,-55),{n:10,to:O-96,vol:11});
  } else if(variant==='both'){
    s.push(R(-26,-4,-28,-6),R(-6,23,-8,20),R(20,24,0,2),{n:4,to:O-30,vol:10},{range:7,lo:O-44,hi:O-8,vol:8});
  } else if(variant==='flat'){
    s.push(R(-26,-12,-28,-14),{range:16,lo:O-24,hi:O+6,vol:7});
  }
  const cs=gen({start:O,seed,vol:10,steps:s});
  return {cs,O,lo,hi,eqlA:4,eqlB:9,sweepFirst:15,lh:16,sweep:18,disp:19,bos:20,fvg:20,bsl:O+84,ssl:lo,end:cs.length-1};
}

const disclaimer=(next,label)=>({label:label||'DISCLAIMER',layout:'center',comps:[{type:'disclaimer',next}],
  cues:[cue('This material is for education only. It is not financial advice and not a guarantee of profit. Futures trading involves the risk of loss.',
            'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian.'),
        cue(`All charts in this episode are illustrative scenarios, not actual historical trading data. ${next?'See you in the next episode.':''}`,
            `Semua carta dalam episod ini ialah senario ilustrasi, bukan data dagangan sejarah sebenar. ${next?'Jumpa dalam episod seterusnya.':''}`)]});

// Knowledge check scene builders. quiz = {questions:[{q,a,why}], charts:[{prompt,answer}], practical:{task,guide}}
function quizScenes(n,quiz,sceneNo){
  const qs=quiz.questions;
  return [
   {label:`SCENE ${sceneNo} · KNOWLEDGE CHECK`,layout:'stack',comps:[
     {type:'head',eyebrow:`EPISODE ${String(n).padStart(2,'0')} · KNOWLEDGE CHECK`,title:'Five questions — pause and answer',right:'PAUSE THE VIDEO',rightColor:'gold'},
     {type:'list',slot:'main',icon:'num',size:27,items:qs.map((q,k)=>({text:q.q,in:[0,0.6+k*0.5]}))}],
    cues:[cue('Time to check your understanding. Pause the video and answer these five questions in your own words.','Masa untuk semak kefahaman anda. Hentikan video seketika dan jawab lima soalan ini dengan ayat anda sendiri.',{pause:1.5}),
          cue('Write down your reasoning, not just a one-word answer. The reasoning is what we assess.','Tulis penaakulan anda, bukan sekadar jawapan satu perkataan. Penaakulan itulah yang dinilai.',{pause:2})]},
   {label:`SCENE ${sceneNo+1} · ANSWER GUIDE`,layout:'stack',comps:[
     {type:'head',eyebrow:'ANSWER GUIDE',title:'Short answers — full explanations in the workbook'},
     {type:'list',slot:'main',icon:'num',size:24,items:qs.map((q,k)=>({text:q.a,in:[0,0.4+k*0.6]}))}],
    cues:[cue('Here are the short answers. Compare them with your reasoning; the workbook explains each one in full.','Ini jawapan ringkas. Bandingkan dengan penaakulan anda; buku kerja menerangkan setiap satu dengan lengkap.',{pause:5})]},
   {label:`SCENE ${sceneNo+2} · PRACTICE`,layout:'stack',comps:[
     {type:'head',eyebrow:'CHART EXERCISES · PRACTICAL TASK',title:'Apply it on a chart'},
     {type:'cards',slot:'main',size:23,cards:[
       {title:'Chart exercise 1',color:'cyan',items:[quiz.charts[0].prompt],in:[0,0.5],h:300},
       {title:'Chart exercise 2',color:'purple',items:[quiz.charts[1].prompt],in:[0,1.2],h:300},
       {title:'Practical task',color:'gold',items:[quiz.practical.task],in:[1,0.3],h:300}]},
     {type:'text',r:[120,500,1680],size:22,color:'grey',text:'Answer guides for every exercise are provided in the Level 7 workbook (docs/assessment).',in:2}],
    cues:[cue('Next, two chart exercises. Use your own charting platform and mark the points described.','Seterusnya, dua latihan carta. Gunakan platform carta anda sendiri dan tandakan titik yang dinyatakan.'),
          cue('Then complete the practical task, and record what would make your interpretation invalid.','Kemudian lengkapkan tugasan praktikal, dan catat apa yang akan membatalkan tafsiran anda.'),
          cue('Answer guides for every exercise are in the Level Seven workbook.','Panduan jawapan bagi setiap latihan disediakan dalam buku kerja Level 7.')]}
  ];
}
module.exports={meta,ILL,mirror,agg,po3,disclaimer,quizScenes,gen,O,cue};

/** AMD model with a prior leg (external high), a range with genuine EQH/EQL, inducement, sweep, displacement, expansion. */
function amd(P,seed=4){
  const pre=gen({start:P+70,seed:seed+100,vol:12,steps:[{n:7,to:P+4,vol:12}]});
  const extH=Math.max(...pre.map(k=>k[1]));
  const R=(o,h,l,c)=>({o:P+o,h:P+h,l:P+l,c:P+c});
  const main=gen({start:P+4,seed,vol:10,steps:[{range:16,lo:P-14,hi:P+14,touchHi:[3,11],touchLo:[6,13],end:P+2},
    R(2,4,-10,-8),R(-8,-5,-19,-17),R(-17,-7,-20,-10),R(-10,-9,-30,-27),R(-27,-21,-34,-23),
    R(-23,-2,-25,-4),R(-4,20,-6,17),R(17,28,10,25),{n:9,to:extH-8,vol:11},{o:extH-8,h:extH+7,l:extH-12,c:extH+1},{o:extH+1,h:extH+4,l:extH-9,c:extH-5}]});
  // ensure range starts at main[0] open continuity
  const cs=pre.concat(main); const r0=7;
  return {cs,P,lo:P-14,hi:P+14,extH,r0,r1:22,eqh:[r0+3,r0+11],eql:[r0+6,r0+13],ind:25,lh:25,sweepFirst:24,sweep:27,disp:28,bos:29,fvg:29,end:cs.length-1};
}
module.exports.amd=amd;
