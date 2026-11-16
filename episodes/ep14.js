// EPISODE 14 — FCPO PRACTICAL CASE STUDIES
'use strict';
const {meta,mirror,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {htfBull,htfBear}=require('./_htf');
const ILL='ILLUSTRATIVE MARKET SCENARIO — NOT ACTUAL HISTORICAL TRADING DATA';
const OP=4180, PDH=4244, M=OP;
const t15=i=>{const base=i<8?10*60+30+15*i:14*60+30+15*(i-8);return String(Math.floor(base/60)).padStart(2,'0')+':'+String(base%60).padStart(2,'0');};
const XL=[0,4,8,12,16,20].map(i=>({i,text:t15(i)}));
const mk=(variant)=>gen({start:OP,seed:141,vol:6,steps:[{range:8,lo:4166,hi:4194,touchLo:[2,6],touchHi:[4],vol:7,end:4182},
  {o:4182,h:4185,l:4170,c:4172},{o:4172,h:4176,l:4158,c:4161},
  ...(variant==='fail'?[{o:4161,h:4164,l:4146,c:4149},{n:4,to:4130,vol:6},{n:6,to:4112,vol:6},{range:2,lo:4104,hi:4120,vol:4}]
   :[{o:4161,h:4186,l:4159,c:4184},{o:4184,h:4204,l:4182,c:4201},{n:8,to:4236,vol:7},{o:4236,h:4250,l:4232,c:4241},{o:4241,h:4245,l:4231,c:4234}])]});
const BU=mk('ok'), BF=mk('fail'), BE=mirror(BU,M), BEF=mirror(BF,M);
const D=htfBull(3990,141), DB=htfBear(3990,141);
const sess=(inn)=>[O.vline(7.5,'BREAK 12:30–14:30','neutral',{in:inn,size:12}),O.band(0,7,'MORNING 10:30–12:30','gold',{in:inn,back:true,alpha:0.04,bottom:true}),O.band(8,21,'AFTERNOON 14:30–18:00','gold',{in:inn,back:true,alpha:0.04,bottom:true})];
const m=x=>2*M-x;

const quiz={
 questions:[
  {q:'State the FCPO contract size, tick size and tick value.',a:'25 metric tonnes; RM1 per tonne; RM25 per contract per tick (verify current Bursa specifications).',why:'Specifications determine risk per tick and must be checked against official Bursa documentation before use.'},
  {q:'What is the daily opening price reference used in the FCPO case studies, and why must it be stated?',a:'The morning-session open at 10:30 MYT (day-session convention). T+1 trades are booked to the next trading day, so the convention must be explicit.',why:'Different chart vendors build daily candles differently.'},
  {q:'Can the afternoon-session sweep in the bullish case be called an ICT Judas Swing?',a:'Only as a “Judas-style” interpretation that is tested, not assumed — ICT defined the Judas Swing around NY midnight/London/NY opens, not Bursa sessions.',why:'Transferring the label mechanically to FCPO is a Forex-to-FCPO assumption the course explicitly avoids.'},
  {q:'Why does each case include an “alternative scenario”?',a:'To show what failure looks like and to define invalidation before the outcome is known.',why:'Analysis that cannot fail cannot be tested.'},
  {q:'Name three international influences on FCPO and when they are observable in MYT.',a:'DCE palm olein/soy oil (day ≈ 09:00–15:00, night ≈ 21:00–23:00 MYT), CBOT soybean oil (overnight and day sessions, Chicago time ± US DST), USD/MYR moves (around the clock).',why:'These overlap different FCPO sessions and can explain FCPO moves without any ICT model.'}],
 charts:[{prompt:'On a real FCPO 15-minute chart, mark the morning and afternoon session opens, highs and lows for one day, plus PDH/PDL.',answer:'Session extremes must be taken only from candles inside each session; the lunch break is not a session.'},
         {prompt:'Using the same day, write a case card with every heading used in this episode, labelling any absent element as “absent”.',answer:'A complete card covers context, timeframe, bias, liquidity, timing, PO3/AMD, Judas, SMT, structure, displacement, PD arrays, invalidation and alternative.'}],
 practical:{task:'Produce one bullish or bearish FCPO case study from real data you have downloaded yourself, using the CMI case-card format, without entry, stop or profit claims.',guide:'Assessors check data provenance, correct session times, honest absent/present labelling and a clear invalidation.'}
};
const card=(rows,inn)=>({type:'table',slot:'main',cols:['Item','This case'],widths:['26%','74%'],size:20,rows:rows.map((r,k)=>({cells:r,in:inn[k],color:k%2?'gold':'cyan'}))});

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 14 · LEVEL 7 · FCPO PRACTICE',title:'FCPO Practical Case Studies',subtitle:'Bursa Malaysia Derivatives · Crude Palm Oil Futures',objIn:2,
   objectives:['Apply Level 7 concepts to FCPO bullish and bearish cases','Use official Bursa sessions, not forex sessions','Approach FCPO SMT comparisons with care','Write a complete case card with invalidation']}],
  cues:[cue('Welcome to Episode Fourteen, the final episode of Level Seven: F C P O practical case studies.','Selamat datang ke Episod 14, episod terakhir Level 7: kajian kes praktikal FCPO.'),
        cue('We apply every Level Seven concept to crude palm oil futures on Bursa Malaysia Derivatives, without transferring forex assumptions mechanically.','Kita mengaplikasikan setiap konsep Level 7 pada niaga hadapan minyak sawit mentah di Bursa Malaysia Derivatives, tanpa memindahkan andaian forex secara mekanikal.'),
        cue('Every chart in this episode is an illustrative scenario, not actual historical trading data. No entries, stops or profit claims are given.','Setiap carta dalam episod ini ialah senario ilustrasi, bukan data dagangan sejarah sebenar. Tiada kemasukan, stop atau dakwaan keuntungan diberikan.')]},

 {label:'SCENE 2 · FCPO REFERENCE SPECIFICATIONS',layout:'stack',comps:[
   {type:'head',eyebrow:'FCPO · REFERENCE',title:'FCPO contract — key specifications',right:'VERIFY WITH BURSA BEFORE USE',rightColor:'amber'},
   {type:'table',slot:'main',cols:['Specification','Reference value'],widths:['36%','64%'],size:23,rows:[
     {cells:['Contract size','25 metric tonnes'],in:0,color:'gold'},{cells:['Minimum price fluctuation','RM1 per metric tonne'],in:0,color:'gold'},{cells:['Tick value','RM25 per contract per tick'],in:1,color:'gold'},
     {cells:['Trading hours (MYT)','Mon–Fri 10:30–12:30, 14:30–18:00 · T+1 Mon–Thu 21:00–23:30'],in:2,color:'cyan'},
     {cells:['Contract months','Spot month and following months out to multiple years (see current Bursa specification)'],in:3,color:'cyan'},
     {cells:['Delivery','Physical; MSPO-certified palm oil (per Bursa product notes)'],in:3,color:'cyan'}]},
   {type:'text',r:[120,640,1680],size:20,color:'grey',in:4,text:'Sources: Bursa Malaysia Derivatives FCPO product page and FCPO booklet. Exchanges revise specifications — always check the current circular.'}],
  cues:[cue('First, the reference specifications. One F C P O contract is twenty-five metric tonnes.','Pertama, spesifikasi rujukan. Satu kontrak FCPO ialah 25 tan metrik.'),
        cue('The minimum price fluctuation is one ringgit per tonne, so one tick is worth twenty-five ringgit per contract.','Turun naik harga minimum ialah RM1 setiap tan, jadi satu tick bernilai RM25 setiap kontrak.'),
        cue('Trading hours are ten thirty to twelve thirty and two thirty to six p m, Monday to Friday, plus the T plus one session from nine to eleven thirty p m, Monday to Thursday.','Waktu dagangan ialah 10:30 hingga 12:30 tengah hari dan 2:30 hingga 6 petang, Isnin hingga Jumaat, serta sesi T+1 dari 9 hingga 11:30 malam, Isnin hingga Khamis.'),
        cue('Contract months and delivery rules are set out in Bursa’s specification.','Bulan kontrak dan peraturan penghantaran dinyatakan dalam spesifikasi Bursa.'),
        cue('Always verify these against Bursa’s current documentation before using them.','Sentiasa sahkan maklumat ini dengan dokumentasi terkini Bursa sebelum menggunakannya.')]},

 {label:'SCENE 3 · FCPO BULLISH · CONTEXT',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'FCPO · DAILY',note:'ILLUSTRATIVE',tag:'HTF BULLISH · BIAS BULLISH',tagColor:'green',candles:D.cs,padR:5,reveal:[[0,D.cs.length]],
    overlays:[O.mark(D.sl2,'l','HL','green',{in:0,swing:true,price:false,lsize:15}),O.mark(D.sh3,'h','HH','green',{in:0,swing:true,price:false,lsize:15}),O.level(D.H,'BSL · OLD HIGH','yellow',{i0:D.sh3,in:1}),
      O.level(D.EQ,'EQ','neutral',{i0:D.sl2,in:2,size:13}),O.zone(D.L,D.EQ,D.sl2,D.cur+3,'DISCOUNT','green',{in:2,alpha:0.06,stroke:false,lpos:'below'}),O.fvg(D.fvg,{in:2,i1:40})]},
   {type:'notes',slot:'side',eyebrow:'FCPO · BULLISH CASE',title:'Higher-timeframe context',items:[
     {text:'HH / HL structure on the daily',in:0,color:'green'},{text:'Potential DOL: buy-side above the old high',in:1,color:'yellow'},{text:'Price retracing into discount, near a bullish FVG',in:2,color:'green'},
     {text:'Daily Bias: bullish (working hypothesis)',in:3,color:'green'},{text:'Today’s objective: PDH 4,244',in:3,color:'yellow'}]}],
  cues:[cue('The bullish case. On the daily F C P O chart, structure is bullish, with higher highs and higher lows.','Kes bullish. Pada carta harian FCPO, struktur adalah bullish, dengan higher high dan higher low.'),
        cue('The potential draw is buy-side liquidity above the old high.','Potensi draw ialah buy-side liquidity di atas high lama.'),
        cue('Price is retracing into discount, near a bullish fair value gap.','Harga sedang retrace ke dalam discount, berhampiran bullish fair value gap.'),
        cue('So the Daily Bias is bullish, as a working hypothesis, and today’s realistic objective is the previous day high at four thousand two hundred and forty-four.','Jadi Daily Bias ialah bullish, sebagai hipotesis kerja, dan objektif realistik hari ini ialah previous day high pada 4,244.')]},

 {label:'SCENE 4 · FCPO BULLISH · INTRADAY',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'FCPO · 15M · DAY SESSIONS (MYT)',note:false,tag:'BULLISH CASE',tagColor:'green',candles:BU,xlabels:XL,reveal:[[0,8],[2,10],[3,11],[4,13],[6,BU.length]],
    overlays:[...sess(0),O.level(OP,'DAILY OPEN 10:30','gold',{in:0,lpos:'left',size:13}),O.level(4166,'MORNING LOW · SSL','yellow',{i0:0,i1:10,in:1,below:true,size:13}),
      O.sweep(9,'low',4166,'SSL SWEEP · AFTERNOON OPEN','amber',{in:2,level:4166}),O.text(9,'l','JUDAS-STYLE? TEST, DON’T ASSUME','purple',{in:3,dy:52,size:13}),
      O.fvg(11,{in:4,i1:18}),O.bos(7,13,4194,'BOS · MORNING HIGH','white','up',{in:5}),O.level(PDH,'PDH · BSL','yellow',{in:6}),O.sweep(20,'high',PDH,'','yellow',{in:6,level:PDH})],
    checks:[{maxHigh:[0,7,4194]},{minLow:[0,7,4166]},{sweepBelow:[9,4166]},{closeAbove:[11,OP]},{sweepAbove:[20,PDH]}]},
   {type:'notes',slot:'side',eyebrow:'FCPO · BULLISH CASE',title:'Delivery',items:[
     {text:'Daily open 10:30; morning forms a range',in:0},{text:'Morning low = sell-side reference',in:1,color:'yellow'},{text:'Afternoon open sweeps the morning low',in:2,color:'amber'},
     {text:'Judas-style reading only if tested on FCPO',in:3,color:'purple'},{text:'Bullish displacement + FVG',in:4,color:'green'},{text:'BOS above the morning high',in:5,color:'green'},{text:'Distribution toward PDH',in:6,color:'yellow'}]}],
  cues:[cue('On the fifteen-minute chart, the day opens at ten thirty. The morning session forms a range around the open: accumulation.','Pada carta 15 minit, hari dibuka pada 10:30 pagi. Sesi pagi membentuk range di sekitar harga pembukaan: accumulation.'),
        cue('The morning low, touched twice, becomes the sell-side reference.','Morning low, yang disentuh dua kali, menjadi rujukan sell-side.'),
        cue('After the lunch break, the afternoon session opens with a drop that sweeps the morning low. That is the manipulation phase in P O 3 terms.','Selepas rehat tengah hari, sesi petang dibuka dengan penurunan yang menyapu morning low. Itulah fasa manipulation dalam istilah PO3.'),
        cue('Could it be called a Judas Swing? Only as a Judas-style interpretation that you have tested on F C P O. I C T defined the concept around New York and London opens, not Bursa sessions.','Bolehkah ia digelar Judas Swing? Hanya sebagai tafsiran gaya Judas yang telah anda uji pada FCPO. ICT mentakrifkan konsep ini di sekitar pembukaan New York dan London, bukan sesi Bursa.'),
        cue('Bullish displacement follows, leaving a fair value gap.','Bullish displacement menyusul, meninggalkan fair value gap.'),
        cue('Price breaks above the morning high.','Harga memecah ke atas morning high.'),
        cue('Distribution carries price to the previous day high, where buy-side liquidity is taken.','Distribution membawa harga ke previous day high, di mana buy-side liquidity diambil.')]},

 {label:'SCENE 5 · FCPO BULLISH · ALTERNATIVE & CASE CARD',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'FCPO · 15M (MYT)',note:false,tag:'ALTERNATIVE · MODEL FAILS',tagColor:'red',candles:BF,xlabels:XL,reveal:[[0,BF.length]],
    overlays:[...sess(0).slice(0,1),O.level(4166,'MORNING LOW','yellow',{below:true,size:12}),O.level(4140,'INVALIDATION','red',{in:1,size:12,below:true})],checks:[{noCloseAbove:[10,BF.length-1,4166]},{sweepBelow:[BF.length-3,4140]}]},
   {type:'table',slot:'right',cols:['Item','Bullish case'],widths:['34%','66%'],size:16,rows:[
     {cells:['Context / TF','Daily bullish · 15M day sessions'],in:2},{cells:['Bias · liquidity','Bullish · SSL morning low → BSL PDH'],in:2},{cells:['Timing','Afternoon open (Bursa session)'],in:3},
     {cells:['PO3 / AMD','Morning A · afternoon M · D to PDH'],in:3},{cells:['Judas · SMT','Judas-style (tested) · SMT not evaluated'],in:4},{cells:['Structure · PD','BOS morning high · FVG'],in:4},{cells:['Invalidation','Acceptance below the swept low / 4,140'],in:5,color:'red'}]},
   {type:'text',slot:'bottom',size:19,color:'amber',align:'center',in:0,text:ILL}],
  cues:[cue('And the alternative. The afternoon sweep simply continues lower. No reclaim, no displacement.','Dan alternatifnya. Sapuan petang terus bergerak ke bawah. Tiada reclaim, tiada displacement.'),
        cue('Price breaks the invalidation level, written before the session. The bullish interpretation is abandoned.','Harga memecah paras invalidation, yang ditulis sebelum sesi. Tafsiran bullish ditinggalkan.'),
        cue('Every C M I case is summarised in a case card: context, timeframe, bias and liquidity.','Setiap kes CMI diringkaskan dalam kad kes: konteks, timeframe, bias dan liquidity.'),
        cue('Session timing, and the P O 3 or A M D interpretation.','Masa sesi, dan tafsiran PO3 atau AMD.'),
        cue('Judas and S M T status, structure and P D arrays.','Status Judas dan SMT, struktur dan PD array.'),
        cue('And, always, invalidation and the alternative.','Dan, sentiasa, invalidation serta alternatifnya.')]},

 {label:'SCENE 6 · FCPO BEARISH CASE',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'FCPO · DAILY',note:false,tag:'HTF BEARISH · BIAS BEARISH',tagColor:'red',candles:DB.cs,padR:3,reveal:[[0,DB.cs.length]],
    overlays:[O.level(DB.L,'SSL · OLD LOW','yellow',{i0:D.sh3,size:13,below:true}),O.zone(DB.EQ,DB.H,D.sl2,D.cur+2,'PREMIUM','red',{alpha:0.06,stroke:false,lpos:'above'}),O.fvg(D.fvg,{i1:40,bear:true})]},
   {type:'chart',slot:'right',compact:true,title:'FCPO · 15M (MYT)',note:false,tag:'BEARISH CASE',tagColor:'red',candles:BE,xlabels:XL,reveal:[[1,8],[2,10],[3,13],[4,BE.length]],
    overlays:[...sess(1).slice(0,1),O.level(OP,'DAILY OPEN','gold',{in:1,lpos:'left',size:12}),O.level(m(4166),'MORNING HIGH · BSL','yellow',{i0:0,i1:10,in:1,size:12}),O.sweep(9,'high',m(4166),'BSL SWEEP','amber',{in:2,level:m(4166)}),
      O.fvg(11,{in:3,i1:18,bear:true}),O.bos(7,13,m(4194),'BOS','white','down',{in:3,below:true}),O.level(m(PDH),'PDL · SSL','yellow',{in:4,below:true,size:12}),O.sweep(20,'low',m(PDH),'','yellow',{in:4,level:m(PDH)})],
    checks:[{sweepAbove:[9,m(4166)]},{sweepBelow:[20,m(PDH)]}]},
   {type:'text',slot:'bottom',size:19,color:'amber',align:'center',in:0,text:ILL}],
  cues:[cue('The bearish case mirrors it. The daily structure is bearish, price has retraced into premium near a bearish fair value gap, and the draw is sell-side liquidity below.','Kes bearish mencerminkannya. Struktur harian bearish, harga telah retrace ke dalam premium berhampiran bearish fair value gap, dan draw ialah sell-side liquidity di bawah.'),
        cue('Intraday, the morning session ranges around the ten thirty open. The morning high is the buy-side reference.','Secara intraday, sesi pagi bergerak dalam range di sekitar pembukaan 10:30. Morning high ialah rujukan buy-side.'),
        cue('The afternoon open sweeps the morning high, a possible Judas-style move, only if your testing on F C P O supports that reading.','Pembukaan petang menyapu morning high, kemungkinan pergerakan gaya Judas, hanya jika ujian anda pada FCPO menyokong bacaan tersebut.'),
        cue('Bearish displacement leaves a fair value gap, and price breaks below the morning low.','Bearish displacement meninggalkan fair value gap, dan harga memecah ke bawah morning low.'),
        cue('Distribution runs toward the previous day low. The alternative, where price accepts above the swept high, invalidates the bearish case.','Distribution bergerak ke arah previous day low. Alternatifnya, di mana harga diterima di atas high yang disapu, membatalkan kes bearish.')]},

 {label:'SCENE 7 · FCPO SESSION ANALYSIS',layout:'stack',comps:[
   {type:'head',eyebrow:'FCPO · SESSIONS',title:'Bursa sessions vs ICT Kill Zones vs global influence'},
   {type:'cards',slot:'main',size:21,cards:[
     {title:'Bursa FCPO sessions',color:'gold',in:0,h:470,items:['Morning 10:30–12:30','Afternoon 14:30–18:00','T+1 21:00–23:30 (Mon–Thu), booked to next trading day','Mark each session’s open, high, low']},
     {title:'ICT Kill Zones',color:'purple',in:2,h:470,items:['Defined in New York time','London KZ ≈ 14:00–17:00 / 15:00–18:00 MYT','Overlap with FCPO afternoon is clock coincidence','Do not relabel an FCPO session as a Kill Zone']},
     {title:'International influence',color:'cyan',in:3,h:470,items:['DCE oils: day and night sessions (Beijing = MYT)','CBOT soybean oil: Chicago hours ± US DST','USD/MYR, crude oil, export data','Explains moves without any ICT model']}]},
   {type:'text',r:[120,670,1680],size:21,color:'grey',in:4,text:'Local FCPO price behaviour is the final judge — test any time-based idea on FCPO data itself.'}],
  cues:[cue('For F C P O session analysis, start from Bursa’s sessions: morning, afternoon and the T plus one session. Mark each session’s open, high and low as references.','Bagi analisis sesi FCPO, mulakan dengan sesi Bursa: pagi, petang dan sesi T+1. Tandakan open, high dan low setiap sesi sebagai rujukan.'),
        cue('Remember that T plus one trades are booked to the next trading day, which affects how daily candles are built.','Ingat bahawa dagangan T+1 direkodkan untuk hari dagangan berikutnya, yang mempengaruhi cara candle harian dibina.'),
        cue('I C T Kill Zones are defined in New York time. The London window overlaps the F C P O afternoon on the clock, but that is coincidence, not a definition.','ICT Kill Zones ditakrifkan dalam waktu New York. Tetingkap London bertindih dengan sesi petang FCPO dari segi jam, tetapi itu kebetulan, bukan takrif.'),
        cue('International influence is real: Dalian oils, C B O T soybean oil, the ringgit, crude oil and export data. These can explain F C P O moves without any I C T model.','Pengaruh antarabangsa adalah nyata: minyak Dalian, soybean oil CBOT, ringgit, minyak mentah dan data eksport. Ini boleh menjelaskan pergerakan FCPO tanpa sebarang model ICT.'),
        cue('Local F C P O price behaviour is the final judge. Test any time-based idea on F C P O data itself.','Tingkah laku harga FCPO tempatan ialah penilai terakhir. Uji sebarang idea berasaskan masa pada data FCPO itu sendiri.')]},

 {label:'SCENE 8 · FCPO SMT COMPARATIVE STUDY',layout:'stack',comps:[
   {type:'head',eyebrow:'FCPO · SMT',title:'Before comparing FCPO with Dalian or CBOT'},
   {type:'list',slot:'main',icon:'check',cols:2,size:25,items:[
     {text:'Verify the actual contracts used',in:0},{text:'Verify the relevant trading sessions',in:0},{text:'Synchronise timestamps to MYT',in:1},{text:'Explain the economic relationship',in:1},
     {text:'Explain currency and contract differences',in:2},{text:'Use actual data only if reliable',in:2},{text:'Clearly label any illustrative example',in:3},{text:'Never fabricate a historical SMT',in:3,icon:'x'}]}],
  cues:[cue('If you compare F C P O with Dalian or C B O T, verify the actual contracts and their trading sessions.','Jika anda membandingkan FCPO dengan Dalian atau CBOT, sahkan kontrak sebenar dan sesi dagangannya.'),
        cue('Synchronise the timestamps to Malaysia time, and explain the economic relationship.','Segerakkan cap masa kepada waktu Malaysia, dan terangkan hubungan ekonominya.'),
        cue('Explain the currency and contract differences, and use actual data only if it is reliable.','Terangkan perbezaan mata wang dan kontrak, dan gunakan data sebenar hanya jika ia boleh dipercayai.'),
        cue('Label any illustrative example clearly, as in Episode Twelve. And never fabricate a historical S M T divergence.','Labelkan sebarang contoh ilustrasi dengan jelas, seperti dalam Episod 12. Dan jangan sekali-kali mereka-reka SMT divergence sejarah.')]},

 {label:'SCENE 9 · LEVEL 7 CLOSE',layout:'stack',comps:[
   {type:'head',eyebrow:'LEVEL 7 · COMPLETE',title:'Six subtopics, one disciplined process'},
   {type:'flow',slot:'main',perRow:3,bh:150,arrows:false,steps:[
     {n:'7.1',text:'Power of Three',sub:'Open · range · false move · expansion',in:0},{n:'7.2',text:'AMD',sub:'Phases and transitions — not Wyckoff',in:0},{n:'7.3',text:'Kill Zones',sub:'NY time, DST, not exchange hours',in:1},
     {n:'7.4',text:'Daily Bias',sub:'Hypothesis with invalidation',in:1},{n:'7.5',text:'Judas Swing',sub:'Not every sweep',in:2},{n:'7.6',text:'SMT Divergence',sub:'Related, synchronised instruments',in:2}]},
   {type:'callout',r:[120,560,1680,130],head:'Next step',color:'gold',in:3,size:24,text:'Complete the **Level 7 comprehensive assessment** (docs/assessment) — twenty competencies with full answer explanations.'}],
  cues:[cue('That completes Level Seven. Power of Three and A M D describe how price may be delivered.','Itu melengkapkan Level 7. Power of Three dan AMD menerangkan bagaimana harga mungkin dihantar.'),
        cue('Kill Zones and Daily Bias tell us when to watch, and which direction we expect.','Kill Zones dan Daily Bias memberitahu kita bila untuk memerhati, dan arah mana yang kita jangkakan.'),
        cue('Judas Swing and S M T are refined interpretations that require context and confirmation.','Judas Swing dan SMT ialah tafsiran terperinci yang memerlukan konteks dan pengesahan.'),
        cue('Your next step is the Level Seven comprehensive assessment. Thank you, and trade with discipline.','Langkah seterusnya ialah penilaian komprehensif Level 7. Terima kasih, dan berdagang dengan disiplin.')]},
 ...quizScenes(14,quiz,10),
 disclaimer('End of Level 7 — Advanced ICT Concepts','SCENE 13 · DISCLAIMER'),
];
module.exports={meta:meta(14,'FCPO Practical Case Studies'),scenes,quiz};
