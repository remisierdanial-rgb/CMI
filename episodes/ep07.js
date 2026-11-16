// EPISODE 07 — DAILY BIAS AND DRAW ON LIQUIDITY (extended lesson, Subtopic 7.4)
'use strict';
const {meta,po3,amd,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {htfBull}=require('./_htf');
const {day,LH}=require('./ep04');
const D=htfBull(); const cs=D.cs;
const wk=cs.slice(25,30); const PWH=Math.max(...wk.map(k=>k[1])), PWL=Math.min(...wk.map(k=>k[2]));
const PDH=cs[33][1], PDL=cs[33][2];
// 4H mapping chart with genuine EQH/EQL
const MP=gen({start:4180,seed:71,vol:10,steps:[{n:6,to:4250,vol:10},{range:12,lo:4214,hi:4262,touchHi:[2,8],touchLo:[5,10],vol:10,end:4236},{n:4,to:4196,vol:10},{range:8,lo:4172,hi:4214,touchLo:[2,6],vol:9,end:4200},{n:4,to:4232,vol:9}]});
const A=amd(4180,24); const P=po3(4196,33,'ok');
const T=i=>{const m=(18*60+30*i)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};

const quiz={
 questions:[
  {q:'List six liquidity references you would map before a session.',a:'PDH, PDL, PWH, PWL, EQH/EQL, previous swing highs/lows (plus internal FVGs).',why:'Mapping first prevents choosing a target after the fact.'},
  {q:'How do you prioritise between several possible liquidity objectives?',a:'Alignment with HTF structure/bias, HTF significance (weekly > daily > intraday), proximity/realistic reach, and how clean/untouched the level is.',why:'A distant weekly level may be the larger draw, but the nearer daily level may be the realistic objective for today.'},
  {q:'Why might price visit internal liquidity before reaching an external objective?',a:'Price often rebalances imbalances (FVGs) or retraces into discount/premium before continuing.',why:'Objectives are rarely reached in a straight line; expecting that leads to premature exits or invalidation.'},
  {q:'How can PO3 be used inside a Daily Bias?',a:'As one possible interpretation of how the day is delivered: open → accumulation → manipulation against the bias → distribution toward the daily objective.',why:'PO3 is a lens on delivery; the bias still comes from HTF context.'},
  {q:'Can a Kill Zone set the Daily Bias by itself? Explain.',a:'No. A Kill Zone is a time to observe; bias comes from structure, liquidity and location.',why:'Time is context for when evidence may appear, not evidence of direction.'}],
 charts:[{prompt:'On a daily chart, map PDH, PDL, PWH, PWL and any genuine EQH/EQL. Rank the top two objectives for tomorrow and justify.',answer:'Ranking should cite bias alignment, significance, distance and cleanliness.'},
         {prompt:'Find an example where price reached a liquidity objective and then changed behaviour (consolidated or reversed). Mark where the change began.',answer:'The change should appear after the objective was traded through, e.g. a failure to continue followed by displacement the other way.'}],
 practical:{task:'Write a one-paragraph Daily Bias for tomorrow that includes: structure, DOL, location, a PO3 expectation for the session, which Kill Zone you will watch, and invalidation.',guide:'Each element should be explicit; the Kill Zone must be described as a time to observe, not a reason for direction.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 07 · LEVEL 7 · SUBTOPIC 7.4 (EXTENDED)',title:'Daily Bias & Draw on Liquidity',subtitle:'Liquidity mapping · Objectives · PO3 & Kill Zones inside a bias',objIn:1,
   objectives:['Map daily and weekly liquidity references','Prioritise which objective is most relevant','Expect non-linear paths to an objective','Combine Daily Bias with PO3 and Kill Zones']}],
  cues:[cue('Welcome to Episode Seven, an extended lesson on Daily Bias, focused on the draw on liquidity.','Selamat datang ke Episod 7, pelajaran lanjutan tentang Daily Bias, yang memfokuskan draw on liquidity.'),
        cue('We will map liquidity, decide which objective matters most, and then combine bias with P O 3 and Kill Zones.','Kita akan memetakan liquidity, menentukan objektif yang paling penting, dan kemudian menggabungkan bias dengan PO3 dan Kill Zones.')]},

 {label:'SCENE 2 · 7.4 · DAILY LIQUIDITY MAP',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · DAILY',note:'ILLUSTRATIVE SCENARIO',tag:'LIQUIDITY MAP',tagColor:'yellow',candles:cs,padR:6,reveal:[[0,cs.length]],
    overlays:[O.band(25,29,'PREVIOUS WEEK','neutral',{in:1,back:true,alpha:0.05,bottom:true}),O.level(PWH,'PWH','yellow',{i0:25,in:1}),O.level(PWL,'PWL','yellow',{i0:25,in:1,below:true}),
      O.level(PDH,'PDH','amber',{i0:33,in:0,size:13}),O.level(PDL,'PDL','amber',{i0:33,in:0,below:true,size:13}),
      O.mark(D.sh2,'h','SWING HIGH','white',{in:2,lsize:14,swing:true}),O.mark(D.sl2,'l','SWING LOW','white',{in:2,lsize:14,swing:true}),O.fvg(D.fvg,{in:3,i1:40,label:'INTERNAL · FVG'})],
    checks:[{isHigh:[28,25,29]},{eqHigh:[28,28]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · MAPPING',title:'Mark everything first',items:[
     {text:'PDH / PDL — yesterday’s extremes',in:0,color:'amber'},{text:'PWH / PWL — last week’s extremes',in:1,color:'yellow'},{text:'Previous swing highs / lows',in:2},
     {text:'Internal liquidity: imbalances inside the range',in:3,color:'green'},{text:'External liquidity: the range’s edges',in:3,color:'yellow'}]}],
  cues:[cue('Before you choose an objective, map everything. Start with the previous day high and low.','Sebelum memilih objektif, petakan semuanya. Mulakan dengan previous day high dan low.'),
        cue('Add the previous week high and low. Here, last week’s high is also the most recent swing high.','Tambah previous week high dan low. Di sini, high minggu lepas juga merupakan swing high terkini.'),
        cue('Mark earlier swing highs and lows that have not been taken.','Tandakan swing high dan low terdahulu yang belum diambil.'),
        cue('Then separate internal liquidity, such as imbalances inside the range, from external liquidity at the range edges.','Kemudian asingkan internal liquidity, seperti ketidakseimbangan di dalam range, daripada external liquidity di tepi range.')]},

 {label:'SCENE 3 · 7.4 · EQUAL HIGHS & LOWS',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · 4H',note:'ILLUSTRATIVE SCENARIO',tag:'EQH · EQL',tagColor:'amber',candles:MP,reveal:[[0,MP.length]],
    overlays:[O.mark(8,'h','','amber',{in:1,price:false}),O.mark(14,'h','EQH','amber',{in:1,price:false}),O.level(4262,'BSL','yellow',{i0:8,in:1,size:13}),
      O.mark(24,'l','','amber',{in:2,price:false}),O.mark(28,'l','EQL','amber',{in:2,price:false}),O.level(4172,'SSL','yellow',{i0:22,in:2,below:true,size:13})],
    checks:[{eqHigh:[8,14,1]},{eqLow:[24,28,1]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · EQH / EQL',title:'Genuinely equal only',items:[
     {text:'Two or more highs at the same price',in:1,color:'amber'},{text:'Two or more lows at the same price',in:2,color:'amber'},{text:'Obvious to many traders → stops cluster',in:3,color:'yellow'},{text:'“Roughly similar” highs are not EQH',in:4,color:'red'}]}],
  cues:[cue('Equal highs and equal lows deserve a closer look.','Equal highs dan equal lows wajar diteliti dengan lebih dekat.'),
        cue('Here two four-hour highs print at exactly the same price. That is a genuine equal high, with buy-side liquidity above.','Di sini dua high empat jam tercetak pada harga yang sama tepat. Itu equal high yang sebenar, dengan buy-side liquidity di atasnya.'),
        cue('Lower down, two lows match exactly: equal lows, with sell-side liquidity below.','Di bawah, dua low sepadan dengan tepat: equal lows, dengan sell-side liquidity di bawahnya.'),
        cue('Because they are obvious, many traders place stops just beyond them.','Kerana ia jelas, ramai trader meletakkan stop tepat di luarnya.'),
        cue('But roughly similar highs, far apart in price, are not equal highs. Be strict.','Tetapi high yang hampir serupa, yang berjauhan dari segi harga, bukan equal highs. Bersikap tegas.')]},

 {label:'SCENE 4 · 7.4 · PRIORITISING OBJECTIVES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.4 · PRIORITY',title:'Which objective matters most today?'},
   {type:'flow',slot:'main',perRow:4,bh:230,steps:[
     {n:'01',text:'Aligned with bias',sub:'Bullish bias → buy-side first',in:0,color:'green'},{n:'02',text:'Timeframe significance',sub:'Weekly > daily > intraday',in:1},
     {n:'03',text:'Realistic reach',sub:'Within a normal daily range?',in:2},{n:'04',text:'Clean & untouched',sub:'Not already raided',in:3}]},
   {type:'callout',r:[120,450,1680,140],head:'Example',color:'gold',in:4,size:24,text:'Bullish bias. PDH is near and untouched; PWH is further away. **Today’s** realistic objective: PDH. **This week’s** larger draw: PWH.'}],
  cues:[cue('How do we prioritise? First, alignment with the bias. A bullish bias puts buy-side objectives first.','Bagaimana kita menentukan keutamaan? Pertama, keselarasan dengan bias. Bias bullish meletakkan objektif buy-side di hadapan.'),
        cue('Second, significance. A weekly level usually outranks a daily one, and a daily level outranks an intraday one.','Kedua, kepentingan. Paras mingguan biasanya mengatasi paras harian, dan paras harian mengatasi paras intraday.'),
        cue('Third, realistic reach. Is the level within a normal day’s range?','Ketiga, jangkauan yang realistik. Adakah paras itu dalam julat normal sehari?'),
        cue('Fourth, cleanliness. Has the level already been raided?','Keempat, kebersihan. Adakah paras itu sudah diserbu sebelum ini?'),
        cue('For example: with a bullish bias, the untouched previous day high may be today’s realistic objective, while the previous week high is the larger draw for the week.','Contohnya: dengan bias bullish, previous day high yang belum disentuh mungkin objektif realistik hari ini, manakala previous week high ialah draw yang lebih besar bagi minggu tersebut.')]},

 {label:'SCENE 5 · 7.4 · OBJECTIVE AND PATH',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · 1H',note:'ILLUSTRATIVE SCENARIO',tag:'INTERNAL → EXTERNAL',tagColor:'green',candles:A.cs,reveal:[[0,A.disp],[1,A.disp+5],[3,A.cs.length]],
    overlays:[O.sweep(A.sweep,'low',A.lo,'EXTERNAL SSL TAKEN','amber',{in:0,level:A.lo}),O.fvg(A.fvg,{in:1,i1:38,label:'INTERNAL'}),O.level(A.extH,'EXTERNAL BSL · OBJECTIVE','yellow',{in:2}),
      O.sweep(A.end-1,'high',A.extH,'REACHED','yellow',{in:3,level:A.extH}),O.text(A.end,'h','BEHAVIOUR CHANGES?','grey',{in:4,dy:-34,anchor:'end',size:14})],
    checks:[{sweepBelow:[A.sweep,A.lo]},{sweepAbove:[A.end-1,A.extH]},{bear:A.end}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · PATH',title:'Not a straight line',items:[
     {text:'Bullish: from external SSL toward external BSL',in:0,color:'green'},{text:'Internal liquidity (FVG) along the way',in:1,color:'green'},{text:'Objective defined in advance',in:2,color:'yellow'},
     {text:'Objective reached → reassess',in:3,color:'yellow'},{text:'Bearish bias: the mirror image',in:5,color:'red'}]}],
  cues:[cue('A useful mental model: price often moves from one external liquidity pool toward the other, passing through internal liquidity on the way.','Model mental yang berguna: harga sering bergerak dari satu kolam external liquidity ke arah yang satu lagi, melalui internal liquidity dalam perjalanan.'),
        cue('Here, after sell-side liquidity is taken, displacement leaves internal liquidity behind, a fair value gap.','Di sini, selepas sell-side liquidity diambil, displacement meninggalkan internal liquidity, iaitu fair value gap.'),
        cue('The objective, defined in advance, is buy-side liquidity above the old high.','Objektifnya, yang ditetapkan lebih awal, ialah buy-side liquidity di atas high lama.'),
        cue('Price reaches it, but not in a straight line. There are pauses and pullbacks.','Harga mencapainya, tetapi bukan dalam garis lurus. Terdapat jeda dan pengunduran.'),
        cue('Once the objective is reached, behaviour may change: consolidation or reversal. That is the moment to reassess, not to extend the target automatically.','Sebaik objektif dicapai, tingkah laku mungkin berubah: konsolidasi atau pembalikan. Itulah masanya untuk menilai semula, bukan memanjangkan sasaran secara automatik.'),
        cue('A bearish bias follows the same logic with sell-side liquidity as the objective.','Bias bearish mengikut logik yang sama dengan sell-side liquidity sebagai objektif.')]},

 {label:'SCENE 6 · 7.4 · DAILY BIAS + PO3',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'BIAS: BULLISH · DOL: PDH',tagColor:'green',candles:cs,padR:4,reveal:[[0,cs.length]],
    overlays:[O.level(PDH,'PDH · OBJECTIVE','yellow',{i0:30,size:13}),O.zone(D.L,D.EQ,D.sl2,D.cur+3,'DISCOUNT','green',{alpha:0.06,stroke:false,lpos:'below'})]},
   {type:'chart',slot:'right',compact:true,title:'15M · TODAY',note:false,tag:'PO3 INSIDE THE BIAS',tagColor:'green',candles:P.cs,reveal:[[1,14],[2,19],[3,P.cs.length]],
    overlays:[O.level(P.O,'DAILY OPEN','gold',{lpos:'left',in:1}),O.band(0,13,'A','blue',{in:1,back:true}),O.band(14,18,'M','amber',{in:2,back:true}),O.band(19,P.end,'D','green',{in:3,back:true}),O.level(P.bsl,'DAILY OBJECTIVE','yellow',{in:3,i0:14,size:13})],
    checks:[{sweepBelow:[P.sweep,P.lo]},{sweepAbove:[P.end-1,P.bsl]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:4,text:'PO3 = **one possible** interpretation of how a bullish day is delivered — the bias still comes from HTF context.'}],
  cues:[cue('Now combine Daily Bias with P O 3. On the left, the daily context: bullish structure, discount, and the previous day high as the objective.','Kini gabungkan Daily Bias dengan PO3. Di sebelah kiri, konteks harian: struktur bullish, discount, dan previous day high sebagai objektif.'),
        cue('On the right, today. Mark the daily open; accumulation forms around it.','Di sebelah kanan, hari ini. Tandakan daily open; accumulation terbentuk di sekelilingnya.'),
        cue('Manipulation trades below the open, against the bullish bias.','Manipulation didagangkan di bawah harga pembukaan, bertentangan dengan bias bullish.'),
        cue('Distribution then expands toward the daily objective.','Distribution kemudian berkembang ke arah objektif harian.'),
        cue('P O 3 is one possible interpretation of how a bullish day is delivered. The bias itself still comes from the higher-timeframe context.','PO3 ialah satu tafsiran yang mungkin tentang bagaimana hari bullish dihantar. Bias itu sendiri masih datang daripada konteks timeframe tinggi.')]},

 {label:'SCENE 7 · 7.4 · DAILY BIAS + KILL ZONES',layout:'chartfull',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE 24-HOUR MARKET · 30M · NY TIME',note:'HTF BIAS: BULLISH',tag:'BIAS + TIMING',tagColor:'green',candles:day,xlabels:[0,4,12,16,22,26,32].map(i=>({i,text:T(i)})),reveal:[[0,16],[1,22],[3,day.length]],
    overlays:[O.band(16,21,'LONDON KZ','purple',{in:0,back:true,alpha:0.07}),O.band(26,31,'NY AM KZ','blue',{in:0,back:true,alpha:0.07}),O.level(5196,'ASIAN LOW','cyan',{i0:4,below:true,size:13}),
      O.sweep(17,'low',5196,'SSL SWEEP IN LONDON','amber',{in:1,level:5196}),O.bos(15,20,'h','MSS','white','up',{in:2}),O.level(5262,'PDH · OBJECTIVE','yellow',{in:3}),O.sweep(29,'high',5262,'','yellow',{in:3,level:5262})],
    checks:[{sweepBelow:[17,5196]},{sweepAbove:[29,5262]}]}],
  cues:[cue('Now combine bias with timing. The higher-timeframe bias is bullish, with the previous day high as the objective.','Kini gabungkan bias dengan masa. Bias timeframe tinggi ialah bullish, dengan previous day high sebagai objektif.'),
        cue('During the London window, price sweeps the Asian low, a liquidity interaction against the bias.','Semasa tetingkap London, harga menyapu Asian low, iaitu interaksi liquidity yang bertentangan dengan bias.'),
        cue('Displacement and a market structure shift follow: lower-timeframe confirmation.','Displacement dan market structure shift menyusul: pengesahan timeframe rendah.'),
        cue('In the New York window, price reaches the objective.','Dalam tetingkap New York, harga mencapai objektif.'),
        cue('Notice the order of reasoning. The bias came first, from structure and liquidity. The Kill Zone only told us when to watch for evidence. A Kill Zone does not determine the Daily Bias by itself.','Perhatikan susunan penaakulan. Bias datang dahulu, daripada struktur dan liquidity. Kill Zone hanya memberitahu bila untuk memerhati bukti. Kill Zone tidak menentukan Daily Bias dengan sendirinya.')]},

 {label:'SCENE 8 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Daily Bias & DOL — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Map PDH/PDL, PWH/PWL, EQH/EQL, swings',in:0},{text:'Separate internal from external liquidity',in:0},
     {text:'Prioritise: bias, significance, reach, cleanliness',in:1},{text:'Objectives are reached in steps, not lines',in:1},
     {text:'PO3 = a lens on delivery within the bias',in:2},{text:'Kill Zones time the evidence; they do not set bias',in:2}]}],
  cues:[cue('To summarise. Map all liquidity first, and separate internal from external.','Sebagai rumusan. Petakan semua liquidity dahulu, dan asingkan internal daripada external.'),
        cue('Prioritise objectives by bias, significance, reach and cleanliness, and expect a stepped path rather than a straight line.','Tentukan keutamaan objektif mengikut bias, kepentingan, jangkauan dan kebersihan, dan jangkakan laluan berperingkat, bukan garis lurus.'),
        cue('P O 3 is a lens on how the day may be delivered within the bias. Kill Zones time the evidence, but they do not set the bias.','PO3 ialah lensa tentang bagaimana hari itu mungkin dihantar dalam bias. Kill Zones menentukan masa bagi bukti, tetapi tidak menetapkan bias.')]},
 ...quizScenes(7,quiz,9),
 disclaimer('Next: Episode 08 — Understanding Judas Swing','SCENE 12 · DISCLAIMER'),
];
module.exports={meta:meta(7,'Daily Bias and Draw on Liquidity'),scenes,quiz};
