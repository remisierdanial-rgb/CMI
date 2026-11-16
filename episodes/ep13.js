// EPISODE 13 — INTEGRATION OF ALL LEVEL 7 CONCEPTS
'use strict';
const {meta,mirror,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {htfBull,htfBear}=require('./_htf');
const {day}=require('./ep04');
const T=i=>{const m=(18*60+30*i)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
const XL=n=>[0,4,12,16,22,26,32].filter(i=>i<n).map(i=>({i,text:T(i)}));
const D=htfBull(), DB=htfBear(); const MO=day[12][0], AL=5196, PDH=5262, M=5215; const dayB=mirror(day,M);
const quiet=gen({start:5214,seed:131,vol:5,steps:[{n:4,to:5210,vol:6},{range:8,lo:5196,hi:5224,vol:6,end:5212},{range:24,lo:5200,hi:5222,vol:5}]});
const stepsBull=[
 'HTF bullish structure','Daily Bias: bullish','Draw on Liquidity: BSL above old high','Dealing range mapped','Price in discount','Liquidity pools: Asian low, PDH',
 'Session interaction: London KZ','Possible Judas Swing below midnight open','SMT: only if a verified related instrument exists','Bullish displacement','MSS above last lower high','FVG as PD array','Expansion = PO3/AMD distribution'];

const quiz={
 questions:[
  {q:'Put these in CMI workflow order: Kill Zone context, Daily Bias, Displacement, HTF structure, PD arrays, Invalidation.',a:'HTF structure → Daily Bias → PD arrays → Kill Zone context → Displacement → Invalidation (with DOL, dealing range, premium/discount, PO3/AMD, Judas, SMT in between).',why:'Context is built from the top down; timing and confirmation come after the directional hypothesis.'},
  {q:'Does every analysis need all twelve workflow elements?',a:'No. The workflow is a structured process, not a checklist that must be fully ticked.',why:'Forcing every element produces imaginary confluence.'},
  {q:'In the integrated bullish example, why was SMT not used?',a:'No verified related instrument was available for that illustration; CMI does not invent one.',why:'SMT is optional and only valid with a genuine, synchronised comparator.'},
  {q:'Daily Bias is bullish but the 15M structure is bearish and no displacement appears in the Kill Zone. What is the CMI conclusion?',a:'Neutral / no trade until the conflict resolves.',why:'Conflicting evidence lowers confidence; neutrality is a valid outcome.'},
  {q:'Where does PO3/AMD fit in the integrated workflow?',a:'As an interpretation of how the session is being delivered (step 8), after context and before Judas/SMT/confirmation.',why:'It describes delivery; it does not set direction by itself.'}],
 charts:[{prompt:'Take one day and annotate all twelve workflow steps you can genuinely find. Mark any you cannot find as “absent”.',answer:'A good annotation shows absent elements honestly rather than forcing them.'},
         {prompt:'Find one conflicting day (HTF vs LTF disagree). Annotate the conflict and state your neutral conclusion.',answer:'The annotation should name both the HTF and LTF structures and the missing displacement.'}],
 practical:{task:'Write a full integrated analysis for one session using the CMI workflow, ending with invalidation and risk assessment.',guide:'Every step should cite chart evidence; optional steps may be marked “not applicable”.'}
};

const notes=(arr,from,inn,col)=>arr.map((t,k)=>({text:`${from+k} · ${t}`,in:inn[k],size:19,color:col}));
const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 13 · LEVEL 7 · INTEGRATION',title:'Integrating Level 7',subtitle:'PO3 · AMD · Kill Zones · Daily Bias · Judas Swing · SMT',objIn:1,
   objectives:['Combine all six subtopics into one reading','Follow an integrated bullish and bearish scenario','Stay neutral when the evidence conflicts','Use the twelve-step CMI Advanced Analysis Workflow']}],
  cues:[cue('Welcome to Episode Thirteen. Here we bring all six Level Seven subtopics together.','Selamat datang ke Episod 13. Di sini kita menghimpunkan keenam-enam subtopik Level 7.'),
        cue('We will follow one integrated bullish scenario, one bearish scenario, and a conflicting day where the right answer is to stay neutral.','Kita akan mengikuti satu senario bullish bersepadu, satu senario bearish, dan satu hari bercanggah di mana jawapan yang betul ialah kekal neutral.'),
        cue('Treat the sequence as one possible path, not a required recipe.','Anggap urutan ini sebagai satu laluan yang mungkin, bukan resipi yang wajib.')]},

 {label:'SCENE 2 · INTEGRATED BULLISH · CONTEXT',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · DAILY',note:'ILLUSTRATIVE SCENARIO',tag:'STEPS 1–6 · CONTEXT',tagColor:'green',candles:D.cs,padR:5,reveal:[[0,D.cs.length]],
    overlays:[O.mark(D.sl2,'l','HL','green',{in:0,swing:true,price:false,lsize:15}),O.mark(D.sh3,'h','HH','green',{in:0,swing:true,price:false,lsize:15}),O.level(D.H,'BSL · DOL','yellow',{i0:D.sh3,in:2}),
      O.bracket(D.sh3+4,D.H,D.L,'DEALING RANGE','white',{in:3}),O.level(D.EQ,'EQ','neutral',{i0:D.sl2,in:4,size:13}),O.zone(D.L,D.EQ,D.sl2,D.cur+3,'DISCOUNT','green',{in:4,alpha:0.06,stroke:false,lpos:'below'})]},
   {type:'notes',slot:'side',eyebrow:'INTEGRATED · BULLISH',title:'Context',items:notes(stepsBull.slice(0,6),1,[0,1,2,3,4,5],'green')}],
  cues:[cue('Step one: higher-timeframe market structure is bullish, with higher highs and higher lows.','Langkah satu: struktur pasaran timeframe tinggi adalah bullish, dengan higher high dan higher low.'),
        cue('Step two: the Daily Bias is bullish.','Langkah dua: Daily Bias ialah bullish.'),
        cue('Step three: the potential draw on liquidity is buy-side liquidity above the old high.','Langkah tiga: potensi draw on liquidity ialah buy-side liquidity di atas high lama.'),
        cue('Step four: map the dealing range from the swing low to the swing high.','Langkah empat: petakan dealing range dari swing low ke swing high.'),
        cue('Step five: price is retracing into discount, below equilibrium.','Langkah lima: harga sedang retrace ke dalam discount, di bawah equilibrium.'),
        cue('Step six: identify the liquidity pools for today: the Asian low below, and the previous day high above.','Langkah enam: kenal pasti kolam liquidity bagi hari ini: Asian low di bawah, dan previous day high di atas.')]},

 {label:'SCENE 3 · INTEGRATED BULLISH · EXECUTION',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · 30M · NY TIME',note:false,tag:'STEPS 7–13 · DELIVERY',tagColor:'green',candles:day,xlabels:XL(day.length),reveal:[[0,16],[1,18],[3,20],[4,21],[6,day.length]],
    overlays:[O.band(16,21,'LONDON KZ','purple',{in:0,back:true,alpha:0.07}),O.level(MO,'MIDNIGHT OPEN','gold',{i0:12,in:0,size:13}),O.level(AL,'ASIAN LOW · SSL','yellow',{i0:4,in:0,below:true,size:13}),
      O.sweep(17,'low',AL,'JUDAS SWING?','amber',{in:1,level:AL}),O.text(3,'l','SMT: NOT EVALUATED — NO VERIFIED PAIR','neutral',{in:2,dy:60,anchor:'start',size:13}),
      O.fvg(19,{in:3,i1:27}),O.bos(15,21,'h','MSS','white','up',{in:4}),O.fvg(19,{in:5,i1:27,label:'FVG · PD ARRAY'}),
      O.band(4,15,'A','blue',{in:6,back:true,alpha:0.04,bottom:true}),O.band(16,18,'M','amber',{in:6,back:true,alpha:0.06,bottom:true}),O.band(19,day.length-1,'D','green',{in:6,back:true,alpha:0.04,bottom:true}),
      O.level(PDH,'PDH · BSL','yellow',{in:6}),O.sweep(29,'high',PDH,'','yellow',{in:6,level:PDH})],
    checks:[{sweepBelow:[17,AL]},{sweepAbove:[29,PDH]}]},
   {type:'notes',slot:'side',eyebrow:'INTEGRATED · BULLISH',title:'Delivery',items:notes(stepsBull.slice(6),7,[0,1,2,3,4,5,6],'green')}],
  cues:[cue('Step seven: during the London Kill Zone, price interacts with session liquidity.','Langkah tujuh: semasa London Kill Zone, harga berinteraksi dengan liquidity sesi.'),
        cue('Step eight: it drops below the midnight open and sweeps the Asian low. A possible Judas Swing, still unconfirmed.','Langkah lapan: ia jatuh di bawah midnight open dan menyapu Asian low. Kemungkinan Judas Swing, masih belum disahkan.'),
        cue('Step nine: S M T. In this illustration we have no verified related instrument, so we do not evaluate it. We do not invent one.','Langkah sembilan: SMT. Dalam ilustrasi ini kita tiada instrumen berkaitan yang disahkan, jadi kita tidak menilainya. Kita tidak mereka-rekanya.'),
        cue('Step ten: bullish displacement.','Langkah sepuluh: bullish displacement.'),
        cue('Step eleven: a market structure shift above the last lower high.','Langkah sebelas: market structure shift di atas lower high terakhir.'),
        cue('Step twelve: the fair value gap left by displacement is a relevant P D array.','Langkah dua belas: fair value gap yang ditinggalkan oleh displacement ialah PD array yang relevan.'),
        cue('Step thirteen: the expansion toward the previous day high can be interpreted as the distribution phase of P O 3 and A M D. One possible integrated scenario, not a required sequence.','Langkah tiga belas: pengembangan ke arah previous day high boleh ditafsirkan sebagai fasa distribution dalam PO3 dan AMD. Satu senario bersepadu yang mungkin, bukan urutan yang wajib.')]},

 {label:'SCENE 4 · INTEGRATED BEARISH',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'STEPS 1–6 · BEARISH CONTEXT',tagColor:'red',candles:DB.cs,padR:3,reveal:[[0,DB.cs.length]],
    overlays:[O.level(DB.L,'SSL · DOL','yellow',{i0:D.sh3,size:13,below:true,in:0}),O.level(DB.EQ,'EQ','neutral',{i0:D.sl2,size:13,in:1}),O.zone(DB.EQ,DB.H,D.sl2,D.cur+2,'PREMIUM','red',{in:1,alpha:0.06,stroke:false,lpos:'above'})]},
   {type:'chart',slot:'right',compact:true,title:'30M · NY TIME',note:false,tag:'STEPS 7–13 · BEARISH DELIVERY',tagColor:'red',candles:dayB,padR:2,xlabels:XL(dayB.length),reveal:[[2,16],[3,19],[4,dayB.length]],
    overlays:[O.band(16,21,'LONDON KZ','purple',{in:2,back:true,alpha:0.07}),O.level(2*M-MO,'MIDNIGHT OPEN','gold',{i0:12,in:2,size:12}),O.sweep(17,'high',2*M-AL,'BSL SWEEP','amber',{in:3,level:2*M-AL}),
      O.bos(15,21,'l','MSS','white','down',{in:4,below:true}),O.fvg(19,{in:4,i1:27,bear:true}),O.level(2*M-PDH,'PDL · SSL','yellow',{in:5,below:true,size:12}),O.sweep(29,'low',2*M-PDH,'','yellow',{in:5,level:2*M-PDH})],
    checks:[{sweepAbove:[17,2*M-AL]},{sweepBelow:[29,2*M-PDH]}]},
   {type:'text',slot:'bottom',size:21,color:'grey',align:'center',in:6,text:'HTF bearish · bias bearish · DOL below · premium · London BSL sweep (possible Judas) · SMT if verified · displacement · MSS · FVG · expansion lower'}],
  cues:[cue('The integrated bearish scenario is the inverse. Higher-timeframe structure is bearish, the bias is bearish, and the draw is sell-side liquidity below.','Senario bearish bersepadu ialah songsangannya. Struktur timeframe tinggi bearish, bias bearish, dan draw ialah sell-side liquidity di bawah.'),
        cue('The dealing range is mapped, and price has retraced into premium.','Dealing range dipetakan, dan harga telah retrace ke dalam premium.'),
        cue('In the London Kill Zone, price interacts with session liquidity.','Dalam London Kill Zone, harga berinteraksi dengan liquidity sesi.'),
        cue('It rallies above the midnight open and sweeps buy-side liquidity: a possible bearish Judas Swing.','Ia naik di atas midnight open dan menyapu buy-side liquidity: kemungkinan Judas Swing bearish.'),
        cue('S M T is evaluated only if a verified related instrument exists. Then bearish displacement, a market structure shift and a bearish fair value gap.','SMT dinilai hanya jika instrumen berkaitan yang disahkan wujud. Kemudian bearish displacement, market structure shift dan bearish fair value gap.'),
        cue('The expansion toward sell-side liquidity is read as the distribution phase.','Pengembangan ke arah sell-side liquidity dibaca sebagai fasa distribution.'),
        cue('Same thirteen steps, inverted.','Tiga belas langkah yang sama, terbalik.')]},

 {label:'SCENE 5 · CONFLICTING SCENARIO',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'DAILY BIAS: BULLISH',tagColor:'green',candles:D.cs,padR:3,reveal:[[0,D.cs.length]],overlays:[O.level(D.H,'BSL','yellow',{i0:D.sh3,size:13})]},
   {type:'chart',slot:'right',compact:true,title:'30M · NY TIME',note:false,tag:'LTF: NO SWEEP · NO DISPLACEMENT',tagColor:'neutral',candles:quiet,padR:2,xlabels:XL(quiet.length),reveal:[[1,quiet.length]],
    overlays:[O.band(16,21,'LONDON KZ','purple',{in:1,back:true,alpha:0.07}),O.band(26,31,'NY AM KZ','blue',{in:1,back:true,alpha:0.07}),O.level(5196,'ASIAN LOW · NOT SWEPT','cyan',{i0:4,below:true,size:12,in:2})],
    checks:[{minLow:[12,quiet.length-1,5197]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:4,text:'Bullish bias · bearish/flat LTF · SMT unclear · no sweep · quiet Kill Zones · no displacement → **NEUTRAL · NO TRADE**'}],
  cues:[cue('Now a conflicting day. The Daily Bias is bullish.','Kini hari yang bercanggah. Daily Bias ialah bullish.'),
        cue('But on the lower timeframe, structure is drifting lower, and S M T is absent or unclear.','Tetapi pada timeframe rendah, struktur hanyut ke bawah, dan SMT tiada atau tidak jelas.'),
        cue('Price never sweeps the expected liquidity. The Asian low is untouched.','Harga tidak pernah menyapu liquidity yang dijangka. Asian low tidak disentuh.'),
        cue('Both Kill Zones pass without meaningful movement, and no displacement develops.','Kedua-dua Kill Zone berlalu tanpa pergerakan bermakna, dan tiada displacement terbentuk.'),
        cue('The conclusion is neutral, and no trade. Not every day offers a setup, and staying out is a decision, not a failure.','Kesimpulannya neutral, dan tiada dagangan. Bukan setiap hari menawarkan setup, dan tidak berdagang ialah satu keputusan, bukan kegagalan.')]},

 {label:'SCENE 6 · CMI ADVANCED ANALYSIS WORKFLOW',layout:'stack',comps:[
   {type:'head',eyebrow:'LEVEL 7 · WORKFLOW',title:'CMI Advanced Analysis Workflow'},
   {type:'flow',slot:'main',perRow:4,bh:150,gx:24,gy:22,steps:[
     {n:'01',text:'HTF market structure',in:0},{n:'02',text:'Daily Bias',in:0},{n:'03',text:'Draw on Liquidity',in:0},{n:'04',text:'Dealing range',in:1},
     {n:'05',text:'Premium / Discount',in:1},{n:'06',text:'Relevant PD arrays',in:1},{n:'07',text:'Session & Kill Zone context',in:2},{n:'08',text:'PO3 / AMD interpretation',in:2},
     {n:'09',text:'Potential Judas Swing',in:3},{n:'10',text:'SMT, where appropriate',in:3},{n:'11',text:'Displacement & LTF confirmation',in:4},{n:'12',text:'Invalidation & risk assessment',in:4,color:'red'}]},
   {type:'callout',r:[120,700,1680,0],head:'',color:'gold',in:5,size:22,text:'A structured process — **not** a checklist that generates automatic trade signals. Not every analysis needs every element.'}],
  cues:[cue('Here is the C M I Advanced Analysis Workflow. One to three: higher-timeframe structure, Daily Bias, and the draw on liquidity.','Ini Aliran Kerja Analisis Lanjutan CMI. Satu hingga tiga: struktur timeframe tinggi, Daily Bias, dan draw on liquidity.'),
        cue('Four to six: the dealing range, premium and discount, and relevant P D arrays.','Empat hingga enam: dealing range, premium dan discount, dan PD array yang relevan.'),
        cue('Seven and eight: session and Kill Zone context, and the P O 3 or A M D interpretation.','Tujuh dan lapan: konteks sesi dan Kill Zone, dan tafsiran PO3 atau AMD.'),
        cue('Nine and ten: a potential Judas Swing, and S M T where appropriate.','Sembilan dan sepuluh: potensi Judas Swing, dan SMT di mana sesuai.'),
        cue('Eleven and twelve: displacement and lower-timeframe confirmation, then invalidation and risk assessment.','Sebelas dan dua belas: displacement dan pengesahan timeframe rendah, kemudian invalidation dan penilaian risiko.'),
        cue('This is a structured process, not a checklist that generates automatic trade signals. Not every analysis needs every element.','Ini proses yang berstruktur, bukan senarai semak yang menjana isyarat dagangan automatik. Bukan setiap analisis memerlukan setiap elemen.')]},

 {label:'SCENE 7 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Integration — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Context first, delivery second, confirmation last',in:0},{text:'Each concept answers a different question',in:0},
     {text:'Optional elements stay optional (SMT, FVG)',in:1},{text:'Conflicting evidence → neutral',in:1},{text:'Always end with invalidation and risk',in:2}]}],
  cues:[cue('To summarise. Build context first, then read delivery, then look for confirmation. Each Level Seven concept answers a different question.','Sebagai rumusan. Bina konteks dahulu, kemudian baca delivery, kemudian cari pengesahan. Setiap konsep Level 7 menjawab soalan yang berbeza.'),
        cue('Optional elements stay optional, and conflicting evidence leads to neutral.','Elemen pilihan kekal pilihan, dan bukti yang bercanggah membawa kepada neutral.'),
        cue('And always finish with invalidation and risk.','Dan sentiasa akhiri dengan invalidation dan risiko.')]},
 ...quizScenes(13,quiz,8),
 disclaimer('Next: Episode 14 — FCPO Practical Case Studies','SCENE 11 · DISCLAIMER'),
];
module.exports={meta:meta(13,'Integration of All Level 7 Concepts'),scenes,quiz};
