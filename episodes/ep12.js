// EPISODE 12 — ADVANCED SMT APPLICATION AND LIMITATIONS (extended lesson, Subtopic 7.6)
'use strict';
const {meta,disclaimer,quizScenes,O,cue}=require('./_lib');
const {pair}=require('./_smt');
const P=pair('bull',131);
const FA=P.A.map(k=>k.map(v=>v-930));          // FCPO-like scale (MYR/t) — illustrative only
const FB=P.B.map(k=>k.map(v=>v*4));            // DCE palm olein-like scale (CNY/t) — illustrative only
const ILL='ILLUSTRATIVE MARKET SCENARIO — NOT ACTUAL HISTORICAL TRADING DATA';

const quiz={
 questions:[
  {q:'Why must the timeframe and swing selection be identical on both instruments?',a:'SMT compares the same swing at the same time; mixing timeframes compares different swings and creates false divergences.',why:'A 15M swing low on one chart is not comparable with a 1H swing low on the other.'},
  {q:'FCPO’s T+1 session is 21:00–23:30 MYT. Which comparative markets overlap with it?',a:'DCE night session (21:00–23:00 Beijing = MYT) and part of CBOT soybean oil trading (CBOT day session opens 08:30 CT = 21:30 MYT during CDT, 22:30 MYT during CST).',why:'Only overlapping periods can be compared candle-for-candle.'},
  {q:'List five differences between FCPO and CBOT soybean oil that complicate SMT.',a:'Different underlying oil, currency (MYR vs USD cents/lb), contract size (25 t vs 60,000 lb), trading hours/time zones, and fundamental drivers (palm vs soy supply, biodiesel policy).',why:'Each difference can cause divergence that has nothing to do with “smart money”.'},
  {q:'If no reliable historical example is available, how should an FCPO SMT case be presented?',a:'As a clearly labelled illustrative scenario, with no claim of historical accuracy or of a stable correlation.',why:'Fabricated data or implied correlations would mislead students.'},
  {q:'Is there a universal numerical threshold for a valid SMT (e.g. correlation above 0.8)?',a:'No. CMI does not set one without credible testing; validity is judged by relationship, alignment, swing selection, context and confirmation.',why:'Any threshold would need to be tested on the specific pair and timeframe.'}],
 charts:[{prompt:'Put FCPO and DCE palm olein (or your chosen comparator) on the same timeframe in MYT. Shade only the periods when both are trading.',answer:'Correct shading shows overlaps only (e.g. 10:30–11:30, 14:30–15:00, 21:00–23:00 MYT for the DCE day/night sessions — verify current hours).'},
         {prompt:'Within an overlap period, mark corresponding swing highs/lows on both and state whether any divergence exists.',answer:'Swings must be marked at the same timestamps; if none diverge, record “no SMT”.'}],
 practical:{task:'Complete the eight-step FCPO SMT pre-use checklist for one comparator, including a simple co-movement check and alternative explanations.',guide:'A strong answer cites the contract specs from official sources and states clearly where the relationship is weak.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 12 · LEVEL 7 · SUBTOPIC 7.6 (EXTENDED)',title:'Advanced SMT & Limitations',subtitle:'Multiple timeframes · Session timing · FCPO · Validation',objIn:1,
   objectives:['Keep timeframe and swing selection consistent','Synchronise instruments across sessions and time zones','Apply SMT cautiously to FCPO','Validate an SMT observation step by step']}],
  cues:[cue('Welcome to Episode Twelve, the final lesson on S M T Divergence.','Selamat datang ke Episod 12, pelajaran terakhir tentang SMT Divergence.'),
        cue('We look at timeframes, session timing, the special difficulties of F C P O, and a validation process. Much of this episode is about limitations, and that is deliberate.','Kita melihat timeframe, masa sesi, kesukaran khusus FCPO, dan proses pengesahan. Sebahagian besar episod ini tentang batasan, dan itu disengajakan.')]},

 {label:'SCENE 2 · 7.6 · SMT ACROSS TIMEFRAMES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · MULTIPLE TIMEFRAMES',title:'Same timeframe, same swings — on both charts'},
   {type:'table',slot:'main',cols:['Timeframe','A swing represents','Typical use of SMT'],widths:['18%','40%','42%'],size:23,rows:[
     {cells:['Daily','Multi-day highs and lows','Context for weekly / daily bias'],in:0,color:'gold'},
     {cells:['4H','Session-to-session swings','Context for the next few sessions'],in:1},
     {cells:['1H','Intraday swings','Session-level turning points'],in:2},
     {cells:['15M','Kill Zone-level swings','Lower-timeframe confirmation'],in:3},
     {cells:['Lower (5M, 1M)','Very small swings','Noisy — divergences are frequent'],in:4,color:'red'}]},
   {type:'callout',r:[120,600,1680,110],head:'Consistency rule',color:'cyan',in:5,size:24,text:'Compare a 15M swing with a 15M swing, at the **same timestamps**. A lower-timeframe divergence inside a higher-timeframe trend is a smaller signal, not a reversal of that trend.'}],
  cues:[cue('S M T can be read on any timeframe. On the daily chart, swings are multi-day highs and lows, giving context for weekly and daily bias.','SMT boleh dibaca pada mana-mana timeframe. Pada carta harian, swing ialah high dan low berbilang hari, memberikan konteks bagi bias mingguan dan harian.'),
        cue('On four-hour charts, swings are session-to-session.','Pada carta empat jam, swing berlaku dari sesi ke sesi.'),
        cue('On one-hour charts, swings are intraday turning points.','Pada carta sejam, swing ialah titik pusingan intraday.'),
        cue('On fifteen-minute charts, swings are Kill Zone-sized, useful as lower-timeframe confirmation.','Pada carta 15 minit, swing bersaiz Kill Zone, berguna sebagai pengesahan timeframe rendah.'),
        cue('Below that, swings are small and noisy, and divergences are frequent.','Di bawah itu, swing kecil dan bising, dan divergence kerap berlaku.'),
        cue('The rule: compare a fifteen-minute swing with a fifteen-minute swing, at the same timestamps. And a lower-timeframe divergence inside a higher-timeframe trend is a smaller signal, not a reversal of that trend.','Peraturannya: bandingkan swing 15 minit dengan swing 15 minit, pada cap masa yang sama. Dan divergence timeframe rendah dalam trend timeframe tinggi ialah isyarat yang lebih kecil, bukan pembalikan trend tersebut.')]},

 {label:'SCENE 3 · 7.6 · SESSION TIMING',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · SYNCHRONISATION',title:'Compare only when both markets are trading',right:'ALL TIMES MALAYSIA (UTC+8)',rightColor:'gold'},
   {type:'table',slot:'main',cols:['Market','Session(s) in MYT','Notes'],widths:['30%','40%','30%'],size:22,rows:[
     {cells:['Bursa FCPO','10:30–12:30 · 14:30–18:00 · T+1 21:00–23:30 (Mon–Thu)','Bursa product information'],in:0,color:'gold'},
     {cells:['DCE palm olein / soybean oil','Day ≈ 09:00–11:30, 13:30–15:00 · Night ≈ 21:00–23:00','Beijing time = MYT; verify current DCE rules'],in:1,color:'cyan'},
     {cells:['CBOT soybean oil (ZL)','≈ 08:00/09:00 – 20:45/21:45 and 21:30/22:30 – 02:20/03:20','CT hours shift with US DST (CDT / CST)'],in:2,color:'purple'}]},
   {type:'callout',r:[120,480,1680,200],head:'Why it matters',color:'red',in:3,size:24,text:'If one market is closed, its chart is flat — any “divergence” is an artefact. News released while only one market is open hits that market first. Align timestamps to one time zone before you compare.'}],
  cues:[cue('Instruments must be compared during compatible trading periods. F C P O trades in the morning, afternoon, and in the T plus one evening session.','Instrumen mesti dibandingkan dalam tempoh dagangan yang serasi. FCPO didagangkan pada waktu pagi, petang, dan dalam sesi malam T+1.'),
        cue('Dalian’s day and night sessions use Beijing time, which is the same as Malaysia time. Check the current D C E rules before relying on these hours.','Sesi siang dan malam Dalian menggunakan waktu Beijing, yang sama dengan waktu Malaysia. Semak peraturan DCE terkini sebelum bergantung pada waktu ini.'),
        cue('C B O T soybean oil trades on Chicago time, so its Malaysia-time hours shift by one hour with U S daylight saving.','Soybean oil CBOT didagangkan mengikut waktu Chicago, jadi waktu Malaysia-nya beralih satu jam mengikut daylight saving AS.'),
        cue('If one market is closed, its chart is flat, and any divergence is an artefact. News released while only one market is open hits that market first. Align everything to one time zone before you compare.','Jika satu pasaran ditutup, cartanya rata, dan sebarang divergence hanyalah artifak. Berita yang dikeluarkan ketika hanya satu pasaran dibuka akan menjejaskan pasaran itu dahulu. Selaraskan semuanya kepada satu zon waktu sebelum membandingkan.')]},

 {label:'SCENE 4 · 7.6 · FCPO COMPARATORS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · FCPO · MANDATORY',title:'Possible comparators — not interchangeable'},
   {type:'table',slot:'main',cols:['Instrument','Exchange','Unit / quote','Main drivers'],widths:['26%','22%','24%','28%'],size:22,rows:[
     {cells:['Crude Palm Oil Futures (FCPO)','Bursa Malaysia Derivatives','25 t · MYR per tonne','Malaysian/Indonesian output, exports, MYR'],in:0,color:'gold'},
     {cells:['RBD Palm Olein futures','Dalian Commodity Exchange','10 t · CNY per tonne','Chinese demand, refined product, CNY'],in:1,color:'cyan'},
     {cells:['Soybean Oil futures (DCE)','Dalian Commodity Exchange','10 t · CNY per tonne','Soy crush, Chinese edible-oil demand'],in:2,color:'cyan'},
     {cells:['Soybean Oil futures (ZL)','CBOT (CME Group)','60,000 lb · US cents per lb','US soy crush, biofuel policy, USD'],in:3,color:'purple'}]},
   {type:'text',r:[120,560,1680],size:20,color:'grey',in:4,text:'Specifications summarised from exchange product information; verify the current contract specifications on Bursa, DCE and CME websites before using them in analysis.'}],
  cues:[cue('Applying conventional S M T examples to F C P O is difficult. Possible comparators include Bursa’s F C P O itself, priced in ringgit per tonne, twenty-five tonnes per contract.','Mengaplikasikan contoh SMT konvensional kepada FCPO adalah sukar. Pembanding yang mungkin termasuk FCPO Bursa itu sendiri, berharga dalam ringgit per tan, 25 tan setiap kontrak.'),
        cue('Dalian’s R B D palm olein futures, ten tonnes per lot, priced in yuan. That is a refined product, not crude palm oil.','Niaga hadapan RBD palm olein Dalian, 10 tan setiap lot, berharga dalam yuan. Itu produk bertapis, bukan minyak sawit mentah.'),
        cue('Dalian soybean oil futures, also in yuan.','Niaga hadapan soybean oil Dalian, juga dalam yuan.'),
        cue('And C B O T soybean oil, sixty thousand pounds per contract, quoted in U S cents per pound.','Dan soybean oil CBOT, 60,000 paun setiap kontrak, disebut harga dalam sen AS per paun.'),
        cue('These are related vegetable-oil markets, but they are not interchangeable, and they are not consistently correlated. Verify current specifications before use.','Ini pasaran minyak sayuran yang berkaitan, tetapi ia tidak boleh saling menggantikan, dan tidak berkorelasi secara konsisten. Sahkan spesifikasi terkini sebelum digunakan.')]},

 {label:'SCENE 5 · 7.6 · WHY FCPO SMT IS HARD',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · FCPO',title:'Nine reasons FCPO divergences may be meaningless'},
   {type:'list',slot:'main',icon:'warn',cols:2,size:25,items:[
     {text:'Different contract specifications',in:0},{text:'Different currencies (MYR, CNY, USD)',in:0},{text:'Different trading sessions and time zones',in:1},
     {text:'Different exchange rules and price limits',in:1},{text:'Different liquidity conditions',in:2},{text:'Different delivery and contract structures',in:2},
     {text:'Different supply and demand drivers',in:3},{text:'Different data feeds and timestamp conventions',in:3},{text:'Price basis differences between products',in:4}]}],
  cues:[cue('Why can an F C P O divergence be meaningless? Different contract specifications, and different currencies.','Mengapa divergence FCPO boleh menjadi tidak bermakna? Spesifikasi kontrak yang berbeza, dan mata wang yang berbeza.'),
        cue('Different trading sessions, and different exchange rules, including daily price limits.','Sesi dagangan yang berbeza, dan peraturan bursa yang berbeza, termasuk had harga harian.'),
        cue('Different liquidity conditions, and different delivery and contract structures.','Keadaan liquidity yang berbeza, dan struktur penghantaran serta kontrak yang berbeza.'),
        cue('Different supply and demand drivers, and different data feeds and timestamp conventions.','Pemacu supply dan demand yang berbeza, serta suapan data dan konvensyen cap masa yang berbeza.'),
        cue('And basis differences between products, such as crude palm oil versus refined olein. Any of these can create a divergence with no analytical meaning.','Dan perbezaan asas antara produk, seperti minyak sawit mentah berbanding olein bertapis. Mana-mana satu daripadanya boleh mencipta divergence tanpa makna analisis.')]},

 {label:'SCENE 6 · 7.6 · FCPO PRE-USE CHECKLIST',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · FCPO · BEFORE ANY CASE STUDY',title:'Eight steps before using an FCPO pair'},
   {type:'flow',slot:'main',perRow:4,bh:230,gx:26,steps:[
     {n:'01',text:'Explain the economic relationship',in:0},{n:'02',text:'Verify contract specifications',in:0},{n:'03',text:'Align observation periods',in:1},{n:'04',text:'Confirm data comparability',in:1},
     {n:'05',text:'Review historical co-movement',in:2},{n:'06',text:'Mark swings on both charts',in:2},{n:'07',text:'Explain why the divergence is meaningful',in:3},{n:'08',text:'List alternative explanations',in:3,color:'red'}]},
   {type:'callout',r:[120,560,1680,110],head:'CMI rule',color:'red',in:4,size:24,text:'Never fabricate a stable correlation or imply that Dalian and FCPO must always move together.'}],
  cues:[cue('Before using any pair for an F C P O S M T case study, follow eight steps. Explain the economic relationship, and verify the contract specifications.','Sebelum menggunakan mana-mana pasangan untuk kajian kes SMT FCPO, ikuti lapan langkah. Terangkan hubungan ekonomi, dan sahkan spesifikasi kontrak.'),
        cue('Align the observation periods, and confirm the data is comparable.','Selaraskan tempoh pemerhatian, dan pastikan data boleh dibandingkan.'),
        cue('Review historical co-movement, and identify the relevant swing highs and lows on both charts.','Semak pergerakan bersama dari segi sejarah, dan kenal pasti swing high dan low yang relevan pada kedua-dua carta.'),
        cue('Explain why the divergence is meaningful, and show the alternative explanations.','Terangkan mengapa divergence itu bermakna, dan tunjukkan penjelasan alternatif.'),
        cue('And never fabricate a stable correlation, or imply that Dalian and F C P O must always move together.','Dan jangan sekali-kali mereka-reka korelasi yang stabil, atau membayangkan bahawa Dalian dan FCPO mesti sentiasa bergerak bersama.')]},

 {label:'SCENE 7 · 7.6 · FCPO ILLUSTRATIVE SCENARIO',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'FCPO · 15M · T+1 SESSION (MYT)',note:false,tag:'ILLUSTRATIVE · MYR/t',tagColor:'gold',candles:FA,padR:2,reveal:[[0,P.l2+1],[2,P.n]],
    overlays:[O.mark(P.l1,'l','L1','gold',{in:0,swing:true,lsize:14}),O.sweep(P.l2,'low',FA[P.l1][2],'LOWER LOW','gold',{in:1,level:FA[P.l1][2]}),O.vline(P.l1,'','neutral',{in:1}),O.vline(P.l2,'','neutral',{in:1}),O.bos(P.hA,22,'h','MSS','white','up',{in:2})],
    checks:[{lowerLow:[P.l1,P.l2]}]},
   {type:'chart',slot:'right',compact:true,title:'DCE PALM OLEIN · 15M · NIGHT (MYT)',note:false,tag:'ILLUSTRATIVE · CNY/t',tagColor:'cyan',candles:FB,padR:2,reveal:[[0,P.l2+1],[2,P.n]],
    overlays:[O.mark(P.l1,'l','L1','cyan',{in:0,swing:true,lsize:14}),O.mark(P.l2,'l','HIGHER LOW','cyan',{in:1,swing:true,lsize:14}),O.vline(P.l1,'','neutral',{in:1}),O.vline(P.l2,'','neutral',{in:1})],
    checks:[{higherLow:[P.l1,P.l2]}]},
   {type:'text',slot:'bottom',size:20,color:'amber',align:'center',in:0,text:ILL+' · Alternative explanations: CNY move, Chinese demand news, olein–CPO basis change, thin night liquidity.'}],
  cues:[cue('Here is a clearly labelled illustrative scenario, not actual historical data. Both charts are fifteen minutes, in Malaysia time, during the overlapping night session.','Ini senario ilustrasi yang dilabel dengan jelas, bukan data sejarah sebenar. Kedua-dua carta 15 minit, dalam waktu Malaysia, semasa sesi malam yang bertindih.'),
        cue('F C P O makes a lower low, while Dalian palm olein holds a higher low.','FCPO membuat lower low, manakala palm olein Dalian mengekalkan higher low.'),
        cue('F C P O then shifts structure. In a C M I write-up, this is where we must list alternative explanations.','FCPO kemudian mengalihkan struktur. Dalam laporan CMI, di sinilah kita mesti menyenaraikan penjelasan alternatif.'),
        cue('Perhaps the yuan moved, Chinese demand news hit Dalian only, the olein-to-crude basis changed, or night liquidity was thin. Any of these could explain the divergence without any smart money story.','Mungkin yuan bergerak, berita permintaan China hanya menjejaskan Dalian, asas olein-ke-mentah berubah, atau liquidity malam nipis. Mana-mana satu boleh menjelaskan divergence tanpa sebarang cerita smart money.')]},

 {label:'SCENE 8 · 7.6 · SMT VALIDATION',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · VALIDATION',title:'Evaluating an SMT observation'},
   {type:'list',slot:'main',icon:'num',cols:2,size:25,items:[
     {text:'Instrument relationship is real and current',in:0},{text:'Data aligned to one time zone',in:0},{text:'Same timeframe on both charts',in:1},{text:'Corresponding swings selected',in:1},{text:'Relative high/low behaviour is clear',in:2},
     {text:'Broader market structure considered',in:2},{text:'Liquidity context identified',in:3},{text:'Subsequent price confirmation',in:3},{text:'Invalidation defined',in:4}]},
   {type:'callout',r:[120,600,1680,100],head:'No magic number',color:'amber',in:5,size:23,text:'CMI does **not** set a universal numerical threshold for SMT validity without credible evidence and testing.'}],
  cues:[cue('To validate an S M T observation, check: is the relationship real and current, and is the data aligned to one time zone?','Untuk mengesahkan pemerhatian SMT, semak: adakah hubungan itu sebenar dan semasa, dan adakah data diselaraskan kepada satu zon waktu?'),
        cue('Same timeframe on both charts, and corresponding swings selected.','Timeframe yang sama pada kedua-dua carta, dan swing yang sepadan dipilih.'),
        cue('Is the relative high and low behaviour clear, and what is the broader market structure?','Adakah tingkah laku high dan low relatif jelas, dan apakah struktur pasaran yang lebih luas?'),
        cue('What is the liquidity context, and did price later confirm?','Apakah konteks liquidity, dan adakah harga kemudiannya mengesahkan?'),
        cue('And what would invalidate the observation?','Dan apakah yang akan membatalkan pemerhatian tersebut?'),
        cue('Note what is missing: a magic number. C M I does not set a universal threshold for S M T validity without credible evidence and testing.','Perhatikan apa yang tiada: nombor ajaib. CMI tidak menetapkan ambang sejagat bagi kesahihan SMT tanpa bukti yang boleh dipercayai dan pengujian.')]},

 {label:'SCENE 9 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Advanced SMT — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Consistent timeframe and swing selection',in:0},{text:'Compare only overlapping trading periods',in:0},
     {text:'FCPO comparators are related, not interchangeable',in:1},{text:'Follow the eight-step pre-use checklist',in:1},
     {text:'Label illustrative scenarios clearly',in:2},{text:'No universal numerical threshold',in:2}]}],
  cues:[cue('To summarise. Keep timeframe and swing selection consistent, and compare only overlapping trading periods.','Sebagai rumusan. Kekalkan pemilihan timeframe dan swing yang konsisten, dan bandingkan hanya tempoh dagangan yang bertindih.'),
        cue('F C P O comparators are related, but not interchangeable. Follow the eight-step checklist before any case study.','Pembanding FCPO adalah berkaitan, tetapi tidak boleh saling menggantikan. Ikuti senarai semak lapan langkah sebelum sebarang kajian kes.'),
        cue('Label illustrative scenarios clearly, and do not invent thresholds or correlations.','Labelkan senario ilustrasi dengan jelas, dan jangan mereka-reka ambang atau korelasi.')]},
 ...quizScenes(12,quiz,10),
 disclaimer('Next: Episode 13 — Integration of All Level 7 Concepts','SCENE 13 · DISCLAIMER'),
];
module.exports={meta:meta(12,'Advanced SMT Application and Limitations'),scenes,quiz};
