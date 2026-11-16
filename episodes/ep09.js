// EPISODE 09 — BULLISH AND BEARISH JUDAS SWING MODELS (extended lesson, Subtopic 7.5)
'use strict';
const {meta,mirror,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {htfBull,htfBear}=require('./_htf');
const {day}=require('./ep04'); const {j1,j2,j3}=require('./ep08');
const T=i=>{const m=(18*60+30*i)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
const XL=n=>[0,4,12,16,22,26,32,36].filter(i=>i<n).map(i=>({i,text:T(i)}));
const MO=day[12][0], AL=5196, PDH=5262, M=5215; const dayB=mirror(day,M);
const D=htfBull(), DB=htfBear();
const NR=gen({start:4210,seed:66,vol:14,steps:[{n:5,to:4290,vol:14},{n:5,to:4150,vol:14},{range:16,lo:4150,hi:4292,touchHi:[3,10],touchLo:[6,13],vol:22,end:4224},{range:6,lo:4196,hi:4246,vol:12,end:4220}]});
const asia=[{n:4,to:5210,vol:6},{range:8,lo:5196,hi:5224,touchHi:[2,6],touchLo:[3,7],vol:6,end:5212}];
const j4=gen({start:5214,seed:91,vol:6,steps:[...asia,{range:24,lo:5200,hi:5222,vol:5,end:5204},{o:5204,h:5206,l:5190,c:5203},{o:5203,h:5214,l:5200,c:5212},{range:2,lo:5204,hi:5216,vol:4}]});

const quiz={
 questions:[
  {q:'List the ten annotations of a complete bullish Judas Swing chart.',a:'HTF bullish structure, Daily Bias, relevant liquidity, session timing, initial down move, SSL sweep, bullish displacement, MSS/BOS, FVG (if present), move toward BSL.',why:'Each annotation is a piece of evidence; missing pieces lower confidence or invalidate the reading.'},
  {q:'In the bearish model, which liquidity is swept first and which is the objective?',a:'Buy-side liquidity is swept first (above the Asian high/session high); sell-side liquidity below is the objective.',why:'The initial move runs against the bearish bias and takes buy stops before the expected decline.'},
  {q:'A sweep of the Asian low happens at 12:30 New York time. Why might you not treat it as a Judas Swing?',a:'It is outside the session-open windows where the model is defined (it is in NY lunch), so the timing context is missing.',why:'Judas Swing is a session-opening concept; a sweep at an arbitrary time is just a sweep.'},
  {q:'What is the correct decision when the Daily Bias is unclear and a sweep occurs?',a:'No Judas Swing interpretation: “counter-bias” cannot be defined without a bias. Stand aside or treat it as a plain sweep.',why:'The concept depends on a pre-existing directional hypothesis.'},
  {q:'Why is an FVG described as “where present” in the model?',a:'Displacement does not always leave a clean FVG; its absence does not by itself invalidate the reading.',why:'Treating optional confluence as mandatory leads to forcing or missing valid examples.'}],
 charts:[{prompt:'Annotate one bullish and one bearish Judas Swing example with all ten labels, using NY time on the x-axis.',answer:'Labels must be in chronological order and each must correspond to visible candles.'},
         {prompt:'Find a “no-trade” example: a session-open sweep without displacement. Explain your decision.',answer:'Without displacement and MSS there is no evidence of reversal; the correct decision is no trade.'}],
 practical:{task:'Write a decision table for your own trading plan: for each of the five no-trade scenarios, define what you will do and what evidence would change your mind.',guide:'Good tables state observable conditions (e.g. “no close above the last lower high within the Kill Zone”).'}
};
const full=(cs,bull,inn)=>{const s=bull?1:-1, m=x=>bull?x:2*M-x;
 return [O.band(4,11,'ASIAN RANGE','cyan',{in:inn[0],back:true,alpha:0.06}),O.band(16,21,'LONDON KZ','purple',{in:inn[1],back:true,alpha:0.07}),
  O.level(m(MO),'MIDNIGHT OPEN','gold',{i0:12,in:inn[0],size:13}),O.level(m(AL),bull?'ASIAN LOW · SSL':'ASIAN HIGH · BSL','yellow',{i0:4,in:inn[0],below:bull,size:13}),
  O.sweep(17,bull?'low':'high',m(AL),bull?'SSL SWEEP':'BSL SWEEP','amber',{in:inn[2],level:m(AL)}),O.fvg(19,{in:inn[3],i1:26,bear:!bull}),
  O.bos(15,21,bull?'h':'l',bull?'MSS':'MSS','white',bull?'up':'down',{in:inn[4],below:!bull}),
  O.level(m(PDH),bull?'BSL · PDH':'SSL · PDL','yellow',{in:inn[5],below:!bull}),O.sweep(29,bull?'high':'low',m(PDH),'','yellow',{in:inn[5],level:m(PDH)})];};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 09 · LEVEL 7 · SUBTOPIC 7.5 (EXTENDED)',title:'Judas Swing Models',subtitle:'Complete annotated cases · No-trade scenarios',objIn:1,
   objectives:['Annotate a complete bullish Judas Swing','Annotate a complete bearish Judas Swing','Identify five no-trade scenarios','Choose “no interpretation” when evidence is missing']}],
  cues:[cue('Welcome to Episode Nine, an extended lesson on the Judas Swing.','Selamat datang ke Episod 9, pelajaran lanjutan tentang Judas Swing.'),
        cue('We will build two fully annotated cases, one bullish and one bearish, and then study the situations where the right decision is not to force the label at all.','Kita akan membina dua kes beranotasi penuh, satu bullish dan satu bearish, dan kemudian mengkaji situasi di mana keputusan yang betul ialah tidak memaksa label tersebut langsung.')]},

 {label:'SCENE 2 · 7.5 · BULLISH CASE · CONTEXT',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'HTF BULLISH · BIAS BULLISH',tagColor:'green',candles:D.cs,padR:3,reveal:[[0,D.cs.length]],
    overlays:[O.mark(D.sl2,'l','HL','green',{in:0,swing:true,price:false,lsize:15}),O.mark(D.sh3,'h','HH','green',{in:0,swing:true,price:false,lsize:15}),O.level(D.H,'BSL · DOL','yellow',{i0:D.sh3,in:1,size:13}),O.zone(D.L,D.EQ,D.sl2,D.cur+2,'DISCOUNT','green',{in:1,alpha:0.06,stroke:false,lpos:'below'})]},
   {type:'chart',slot:'right',compact:true,title:'30M · NY TIME',note:false,tag:'LIQUIDITY & TIMING',tagColor:'purple',candles:day.slice(0,16),padR:10,xlabels:XL(16),reveal:[[2,16]],
    overlays:[O.band(4,11,'ASIAN','cyan',{in:2,back:true,alpha:0.06}),O.level(MO,'MIDNIGHT OPEN','gold',{i0:12,in:2,size:13}),O.level(AL,'ASIAN LOW · SSL','yellow',{i0:4,in:3,below:true,size:13}),O.level(PDH,'PDH · BSL','yellow',{in:3,size:13}),O.band(16,21,'LONDON KZ','purple',{in:4,back:true,alpha:0.07})]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:5,text:'Everything above is defined **before** London opens.'}],
  cues:[cue('The bullish case. First, the higher timeframe: higher highs and higher lows, so structure is bullish.','Kes bullish. Pertama, timeframe tinggi: higher high dan higher low, jadi struktur adalah bullish.'),
        cue('The draw is buy-side liquidity above the old high, and price is in discount. The Daily Bias is bullish.','Draw ialah buy-side liquidity di atas high lama, dan harga berada dalam discount. Daily Bias ialah bullish.'),
        cue('On the thirty-minute chart, mark the midnight open and the Asian range.','Pada carta 30 minit, tandakan midnight open dan range Asia.'),
        cue('Relevant liquidity: sell-side below the Asian low, and buy-side above the previous day high.','Liquidity yang relevan: sell-side di bawah Asian low, dan buy-side di atas previous day high.'),
        cue('Session timing: the London Kill Zone, two to five a m New York.','Masa sesi: London Kill Zone, 2 hingga 5 pagi New York.'),
        cue('Everything so far is defined before London opens. That is what makes the next move interpretable.','Semua setakat ini ditetapkan sebelum London dibuka. Itulah yang menjadikan pergerakan seterusnya boleh ditafsir.')]},

 {label:'SCENE 3 · 7.5 · BULLISH CASE · EXECUTION',layout:'chartfull',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · 30M · NY TIME',note:'BIAS: BULLISH',tag:'BULLISH JUDAS SWING · ANNOTATED',tagColor:'green',candles:day,xlabels:XL(day.length),reveal:[[0,16],[0,18],[1,19],[2,21],[4,day.length]],
    overlays:full(day,true,[0,0,0,2,3,4]),checks:[{sweepBelow:[17,AL]},{closeAbove:[19,MO]},{sweepAbove:[29,PDH]}]}],
  cues:[cue('London opens. Price initially moves down, below the midnight open, and sweeps sell-side liquidity under the Asian low.','London dibuka. Harga mula bergerak turun, di bawah midnight open, dan menyapu sell-side liquidity di bawah Asian low.'),
        cue('The down move fails to sustain. The next candle closes back up.','Pergerakan turun gagal bertahan. Candle seterusnya ditutup semula ke atas.'),
        cue('Bullish displacement follows, leaving a fair value gap, where present, as a P D array.','Bullish displacement menyusul, meninggalkan fair value gap, jika ada, sebagai PD array.'),
        cue('Price closes above the last lower high: a market structure shift.','Harga ditutup di atas lower high terakhir: market structure shift.'),
        cue('In New York, price reaches buy-side liquidity above the previous day high. Ten annotations, all visible, all in order.','Di New York, harga mencapai buy-side liquidity di atas previous day high. Sepuluh anotasi, semuanya boleh dilihat, semuanya mengikut urutan.')]},

 {label:'SCENE 4 · 7.5 · BEARISH CASE',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'HTF BEARISH · BIAS BEARISH',tagColor:'red',candles:DB.cs,padR:3,reveal:[[0,DB.cs.length]],
    overlays:[O.mark(D.sl2,'h','LH','red',{in:0,swing:true,price:false,lsize:15}),O.mark(D.sh3,'l','LL','red',{in:0,swing:true,price:false,lsize:15}),O.level(DB.L,'SSL · DOL','yellow',{i0:D.sh3,in:0,size:13,below:true}),O.zone(DB.EQ,DB.H,D.sl2,D.cur+2,'PREMIUM','red',{in:0,alpha:0.06,stroke:false,lpos:'above'})]},
   {type:'chart',slot:'right',compact:true,title:'30M · NY TIME',note:false,tag:'BEARISH JUDAS SWING',tagColor:'red',candles:dayB,padR:2,xlabels:XL(dayB.length),reveal:[[1,16],[2,19],[3,22],[4,dayB.length]],
    overlays:full(dayB,false,[1,1,2,3,3,4]).map(o=>Object.assign(o,{size:12})),checks:[{sweepAbove:[17,2*M-AL]},{sweepBelow:[29,2*M-PDH]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:5,text:'HTF bearish · bias bearish · BSL sweep at London · bearish displacement · MSS · FVG · move toward SSL'}],
  cues:[cue('The bearish case mirrors it. Higher-timeframe structure is bearish: lower highs, lower lows, price in premium, and the draw is sell-side liquidity below.','Kes bearish mencerminkannya. Struktur timeframe tinggi adalah bearish: lower high, lower low, harga dalam premium, dan draw ialah sell-side liquidity di bawah.'),
        cue('Before London, mark the midnight open, the Asian high with buy-side liquidity above it, and the previous day low.','Sebelum London, tandakan midnight open, Asian high dengan buy-side liquidity di atasnya, dan previous day low.'),
        cue('London opens with an initial move up, above the midnight open, sweeping buy-side liquidity.','London dibuka dengan pergerakan awal ke atas, di atas midnight open, menyapu buy-side liquidity.'),
        cue('Bearish displacement follows, leaving a bearish fair value gap, and a close below the last higher low shifts structure.','Bearish displacement menyusul, meninggalkan bearish fair value gap, dan penutupan di bawah higher low terakhir mengalihkan struktur.'),
        cue('Price then moves toward sell-side liquidity below the previous day low.','Harga kemudian bergerak ke arah sell-side liquidity di bawah previous day low.'),
        cue('Same ten annotations, inverted.','Sepuluh anotasi yang sama, terbalik.')]},

 {label:'SCENE 5 · 7.5 · NO-TRADE SCENARIOS 1–3',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · NO-TRADE',title:'When not to call it a Judas Swing'},
   {type:'chart',r:[120,160,540,430],compact:true,title:'30M · NY',note:false,tag:'1 · NO DISPLACEMENT',tagColor:'amber',candles:j2,reveal:[[0,j2.length]],overlays:[O.level(AL,'ASIAN LOW','cyan',{i0:4,size:12,below:true})]},
   {type:'chart',r:[690,160,540,430],compact:true,title:'30M · NY',note:false,tag:'2 · CONTINUES THROUGH',tagColor:'red',candles:j1,reveal:[[1,j1.length]],overlays:[O.level(AL,'ASIAN LOW','cyan',{i0:4,size:12,below:true,in:1})]},
   {type:'chart',r:[1260,160,540,430],compact:true,title:'30M · NY',note:false,tag:'3 · NO STRUCTURE',tagColor:'amber',candles:j3,reveal:[[2,j3.length]],overlays:[O.level(j3[16][1],'LH HOLDS','red',{i0:16,size:12,in:2})]},
   {type:'text',r:[120,620,1680],size:22,color:'grey',align:'center',in:3,text:'Decision in all three: **no Judas Swing interpretation, no trade.**'}],
  cues:[cue('No-trade scenario one: the sweep occurs, but no displacement follows. Price drifts.','Senario tanpa dagangan satu: sapuan berlaku, tetapi tiada displacement yang menyusul. Harga hanyut.'),
        cue('Scenario two: the market continues straight through the swept level.','Senario dua: pasaran terus bergerak melepasi paras yang disapu.'),
        cue('Scenario three: price bounces but fails to establish a meaningful structure. The lower high holds.','Senario tiga: harga melantun tetapi gagal membentuk struktur yang bermakna. Lower high itu bertahan.'),
        cue('In all three, the correct decision is not to force a Judas Swing interpretation.','Dalam ketiga-tiganya, keputusan yang betul ialah tidak memaksa tafsiran Judas Swing.')]},

 {label:'SCENE 6 · 7.5 · NO-TRADE SCENARIOS 4–5',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'4 · DAILY BIAS UNCLEAR',tagColor:'neutral',candles:NR,reveal:[[0,NR.length]],overlays:[O.level(4292,'EQH','yellow',{i0:12,size:13}),O.level(4150,'EQL','yellow',{i0:12,size:13,below:true}),O.level(4221,'EQ','neutral',{i0:10,size:13})]},
   {type:'chart',slot:'right',compact:true,title:'30M · NY TIME',note:false,tag:'5 · TIMING NOT RELEVANT',tagColor:'amber',candles:j4,xlabels:XL(j4.length),reveal:[[2,j4.length]],
    overlays:[O.band(4,11,'ASIAN','cyan',{in:2,back:true,alpha:0.06}),O.band(36,37,'NY LUNCH','neutral',{in:2,back:true,alpha:0.12}),O.level(AL,'ASIAN LOW','cyan',{i0:4,below:true,size:13,in:2}),O.sweep(36,'low',AL,'SWEEP AT 12:00','amber',{in:3,level:AL,anchor:'end'})],
    checks:[{sweepBelow:[36,AL]},{minLow:[12,35,AL]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:4,text:'No bias → “counter-bias” has no meaning. A sweep at lunch is outside the session-open context.'}],
  cues:[cue('Scenario four: the Daily Bias is unclear. Price sits in the middle of a range, between equal highs and equal lows.','Senario empat: Daily Bias tidak jelas. Harga berada di tengah range, antara equal highs dan equal lows.'),
        cue('Without a bias, an initial move cannot be counter to anything. There is no Judas Swing to identify.','Tanpa bias, pergerakan awal tidak boleh bertentangan dengan apa-apa. Tiada Judas Swing untuk dikenal pasti.'),
        cue('Scenario five: session timing is not relevant. Here the Asian low is swept at noon New York time, during lunch.','Senario lima: masa sesi tidak relevan. Di sini Asian low disapu pada tengah hari waktu New York, semasa waktu makan tengah hari.'),
        cue('That is a sweep, but it is outside the session-open context in which the Judas Swing is defined.','Itu satu sapuan, tetapi ia di luar konteks pembukaan sesi di mana Judas Swing ditakrifkan.'),
        cue('In both cases, the professional answer is to avoid forcing the interpretation.','Dalam kedua-dua kes, jawapan profesional ialah mengelak daripada memaksa tafsiran tersebut.')]},

 {label:'SCENE 7 · 7.5 · DECISION TABLE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · DECISIONS',title:'Evidence → decision'},
   {type:'table',slot:'main',cols:['Observation','Judas Swing interpretation?','Decision'],widths:['44%','28%','28%'],size:23,rows:[
     {cells:['Bias set · session open · sweep · displacement · MSS','Supported','Study the setup'],in:0,color:'green'},
     {cells:['Sweep without displacement','Not supported','No trade'],in:1,color:'amber'},
     {cells:['Price continues through the swept level','Rejected','No trade / reassess bias'],in:1,color:'red'},
     {cells:['Daily Bias unclear','Not applicable','No trade'],in:2,color:'neutral'},
     {cells:['Sweep outside the session-open context','Not applicable','Treat as a plain sweep'],in:2,color:'neutral'},
     {cells:['No meaningful structure shift','Not supported','No trade'],in:3,color:'amber'}]}],
  cues:[cue('Here is the decision table. Only when bias, timing, sweep, displacement and structure all line up is the interpretation supported.','Ini jadual keputusan. Hanya apabila bias, masa, sapuan, displacement dan struktur semuanya sejajar barulah tafsiran itu disokong.'),
        cue('A sweep without displacement, or a continuation through the level, is not supported or is rejected.','Sapuan tanpa displacement, atau kesinambungan melepasi paras, tidak disokong atau ditolak.'),
        cue('An unclear bias or irrelevant timing makes the concept not applicable.','Bias yang tidak jelas atau masa yang tidak relevan menjadikan konsep ini tidak terpakai.'),
        cue('And no structure shift means no support. When in doubt, the decision is no trade.','Dan tiada anjakan struktur bermakna tiada sokongan. Apabila ragu-ragu, keputusannya ialah tidak berdagang.')]},

 {label:'SCENE 8 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Judas Swing models — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Context first: HTF, bias, liquidity, timing',in:0},{text:'Then: initial move, sweep, displacement, MSS',in:0},
     {text:'FVG where present — optional confluence',in:1},{text:'Objective: opposite-side liquidity',in:1},
     {text:'Five no-trade scenarios',in:2},{text:'“No interpretation” is a valid result',in:2}]}],
  cues:[cue('To summarise. Context comes first: higher timeframe, bias, liquidity and timing. Then the initial move, the sweep, displacement and structure.','Sebagai rumusan. Konteks didahulukan: timeframe tinggi, bias, liquidity dan masa. Kemudian pergerakan awal, sapuan, displacement dan struktur.'),
        cue('A fair value gap is optional confluence, and the objective is liquidity on the opposite side.','Fair value gap ialah confluence pilihan, dan objektifnya ialah liquidity di sisi bertentangan.'),
        cue('Remember the five no-trade scenarios. No interpretation is a valid result.','Ingat lima senario tanpa dagangan. Tiada tafsiran ialah hasil yang sah.')]},
 ...quizScenes(9,quiz,9),
 disclaimer('Next: Episode 10 — Understanding SMT Divergence','SCENE 12 · DISCLAIMER'),
];
module.exports={meta:meta(9,'Bullish and Bearish Judas Swing Models'),scenes,quiz};
