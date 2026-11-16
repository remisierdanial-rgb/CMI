// EPISODE 01 — UNDERSTANDING POWER OF THREE (Subtopic 7.1)
'use strict';
const {meta,mirror,agg,po3,disclaimer,quizScenes,O,cue}=require('./_lib');
const M='MODEL CHART · INTRADAY', N='ILLUSTRATIVE SCENARIO';
const B=po3(4120,3,'ok'); const cs=B.cs; const E=B.end;
const BR=mirror(cs,4120); // bearish inverse: open stays 4120
const k=B; // indices
const phaseBands=(inA,inM,inD,bear)=>[
  O.band(0,13,'ACCUMULATION','blue',{in:inA,back:true}),
  O.band(14,18,'MANIPULATION','amber',{in:inM,back:true}),
  O.band(19,E,'DISTRIBUTION',bear?'red':'green',{in:inD,back:true})];

const quiz={
 questions:[
  {q:'In one sentence, what does the Power of Three (PO3) framework describe?',a:'A possible price-delivery sequence: a range near the open (accumulation), a move against the eventual direction (manipulation), then directional expansion (distribution).',why:'PO3 is a conceptual model of how a day or session may unfold. It is a lens for interpretation, not a law that every day must follow.'},
  {q:'Why is the opening price used as a reference in PO3?',a:'It anchors the model: in a bullish PO3 the manipulation tends to trade below the open; in a bearish PO3, above it.',why:'The open is a reference point for judging where price is trading relative to the start of the period. It is not automatically support or resistance and it is not Equilibrium.'},
  {q:'Does a liquidity sweep below a range low prove manipulation by institutions?',a:'No. A sweep is an observable price event; "manipulation" is an ICT interpretation, not proof of intent.',why:'Stops can be triggered by many participants and by news. CMI treats the label as a model phase name only.'},
  {q:'How is "distribution" in PO3 different from Wyckoff Distribution?',a:'In PO3 it is the directional expansion phase; in Wyckoff it is a topping structure where supply overcomes demand.',why:'Same word, different frameworks. Mixing them leads to wrong conclusions (e.g. expecting a top during a bullish PO3 "distribution").'},
  {q:'Name two signs that a PO3 interpretation should be abandoned.',a:'Price keeps going through the swept level with no displacement back; or no structure shift / expansion develops.',why:'If the reversal evidence never appears, the sequence is incomplete. Forcing the model is the most common PO3 error.'}],
 charts:[{prompt:'On any intraday chart, mark the session open, the first consolidation range, and the range high/low. Label whether price later swept one side.',answer:'Correct marking: open as a horizontal reference, range boundaries at the clear highs/lows of the consolidation, and a sweep only if price visibly traded through a boundary.'},
         {prompt:'Find one day where price swept a range boundary and did NOT reverse. Explain why it is not a PO3 example.',answer:'No displacement or structure shift followed; price continued in the breakout direction, so the manipulation-distribution sequence never completed.'}],
 practical:{task:'Aggregate 15-minute candles of one session into a single candle. Compare its open, high, low and close with the intraday PO3 phases you marked.',guide:'The higher-timeframe candle’s open/low/high/close should map onto the intraday open, manipulation extreme, and expansion; if they do not, explain why.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 01 · LEVEL 7 · SUBTOPIC 7.1',title:'Understanding Power of Three',subtitle:'Opening price · Accumulation · Manipulation · Distribution',objIn:2,
   objectives:['Define PO3 and where the framework comes from','Describe the three phases and how to recognise them','Build bullish and bearish PO3 models step by step','Recognise incomplete PO3 sequences and common mistakes'],
   side:{type:'chart',bare:true,axis:false,candles:cs,padR:1,reveal:[[0,15],[1,22],[2,cs.length]],overlays:[O.level(4120,'OPEN','gold',{in:0,size:13}),...phaseBands(1,1,2).map(b=>Object.assign(b,{label:null}))]}}],
  cues:[cue('Welcome to Level Seven of the CMI Smart Money Concept programme: Advanced ICT Concepts.','Selamat datang ke Level 7 program CMI Smart Money Concept: Advanced ICT Concepts.'),
        cue('In this first episode, we study the Power of Three, often shortened to P O 3.','Dalam episod pertama ini, kita kaji Power of Three, atau ringkasnya PO3.'),
        cue('By the end, you should be able to define the framework, describe its three phases, and build bullish and bearish models step by step.','Di akhir episod, anda sepatutnya boleh mentakrif rangka kerja ini, menerangkan tiga fasanya, dan membina model bullish dan bearish langkah demi langkah.'),
        cue('We will also study where the model fails, because a framework is only useful when you know its limits.','Kita juga akan kaji bila model ini gagal, kerana sesuatu rangka kerja hanya berguna apabila anda tahu hadnya.')]},

 {label:'SCENE 2 · LEVEL 7 ROADMAP',layout:'stack',comps:[
   {type:'head',eyebrow:'LEVEL 7 · ADVANCED ICT CONCEPTS',title:'Six original subtopics, in sequence'},
   {type:'flow',slot:'main',perRow:3,bh:190,steps:[
     {n:'7.1',text:'Power of Three (PO3)',sub:'Opening price, range, false move, expansion',in:[1,0],color:'gold'},
     {n:'7.2',text:'Accumulation, Manipulation, Distribution',sub:'AMD phases and their transitions',in:[1,0.6]},
     {n:'7.3',text:'Kill Zones',sub:'ICT time windows, NY time & DST',in:[1,1.2]},
     {n:'7.4',text:'Daily Bias',sub:'HTF structure, Draw on Liquidity',in:[1,1.8]},
     {n:'7.5',text:'Judas Swing',sub:'Initial counter-directional move',in:[1,2.4]},
     {n:'7.6',text:'SMT Divergence',sub:'Comparing related instruments',in:[1,3.0]}]},
   {type:'text',r:[120,640,1680],size:24,color:'grey',text:'Builds on Level 2 Market Structure · Level 3 Liquidity · Level 4 Institutional Zones · Level 5 Imbalance & Displacement · Level 6 Premium/Discount & PD Arrays',in:2}],
  cues:[cue('Level Seven has six original subtopics, and we keep them in this exact order.','Level 7 mempunyai enam subtopik asal, dan kita kekalkan susunannya tepat seperti ini.'),
        cue('Power of Three, A M D, Kill Zones, Daily Bias, Judas Swing, and S M T Divergence.','Power of Three, AMD, Kill Zones, Daily Bias, Judas Swing, dan SMT Divergence.'),
        cue('Each one builds on what you learned in Levels Two to Six: structure, liquidity, institutional zones, displacement, and premium and discount.','Setiap satu dibina atas apa yang anda pelajari dalam Level 2 hingga 6: struktur, liquidity, zon institusi, displacement, serta premium dan discount.'),
        cue('Treat every concept here as an analytical framework, not as proof of what institutions are doing.','Anggap setiap konsep di sini sebagai rangka kerja analisis, bukan bukti tentang apa yang sedang dilakukan institusi.')]},

 {label:'SCENE 3 · 7.1 · WHAT IS PO3',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.1 · DEFINITION',title:'Power of Three — a price-delivery framework'},
   {type:'callout',r:[120,170,800,330],head:'CMI definition',color:'gold',in:0,size:27,
    text:'**Power of Three (PO3)** is a conceptual model describing one possible sequence of price delivery within a period: a **range near the opening price**, a **move against the eventual direction**, then a **directional expansion**.'},
   {type:'list',slot:'right',icon:'dot',size:26,items:[
     {text:'Popularised in modern trading education by **ICT** (Michael J. Huddleston)',color:'blue',in:1},
     {text:'Older ideas — ranges, stop runs, accumulation — are **not** ICT inventions (e.g. Wyckoff, early 1900s)',color:'blue',in:2},
     {text:'Usually drawn as **A · M · D**: Accumulation, Manipulation, Distribution',color:'gold',in:3},
     {text:'A **model** to interpret price — not a pattern that must appear',color:'red',in:4}]},
   {type:'callout',r:[120,530,800,170],head:'Model vs observable pattern',color:'cyan',in:5,size:24,
    text:'You **observe** a range, a sweep and an expansion. You **interpret** them as PO3 phases.'}],
  cues:[cue('So what is the Power of Three? At CMI, we define it as a conceptual model of price delivery.','Jadi apakah Power of Three? Di CMI, kita takrifkannya sebagai model konseptual bagi price delivery.'),
        cue('The framework was popularised in modern trading education by the Inner Circle Trader, Michael J. Huddleston.','Rangka kerja ini dipopularkan dalam pendidikan trading moden oleh Inner Circle Trader, Michael J. Huddleston.'),
        cue('However, the underlying ideas, such as trading ranges and runs on stops, are much older. Wyckoff wrote about accumulation in the early twentieth century.','Namun, idea asasnya, seperti trading range dan larian ke atas stop, jauh lebih lama. Wyckoff telah menulis tentang accumulation pada awal abad ke-20.'),
        cue('PO3 is usually drawn as three phases: accumulation, manipulation and distribution.','PO3 biasanya dilukis sebagai tiga fasa: accumulation, manipulation dan distribution.'),
        cue('It describes one possible sequence. It is not a pattern that every day must produce.','Ia menerangkan satu urutan yang mungkin berlaku. Ia bukan corak yang mesti terhasil setiap hari.'),
        cue('Keep a clear line between what you observe on the chart, and the label you choose to interpret it with.','Asingkan dengan jelas apa yang anda lihat pada carta, dan label yang anda pilih untuk mentafsirkannya.')]},

 {label:'SCENE 4 · 7.1 · THE THREE PHASES',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'PO3 · THREE PHASES',candles:cs,reveal:[[0,14],[3,19],[6,cs.length]],
    overlays:[O.level(4120,'OPEN','gold',{in:0,lpos:'left'}),...phaseBands(1,3,6),
      O.level(B.hi,'RANGE HIGH','neutral',{i0:0,i1:13,in:1,size:13}),O.level(B.lo,'RANGE LOW','neutral',{i0:0,i1:13,in:1,below:true,size:13}),
      O.sweep(k.sweep,'low',B.lo,'SWEEP','amber',{in:4,level:B.lo}),O.arrow([22,'l'],[E-1,'h'],'green',{in:7,dash:'6 6',curve:-30})],
    checks:[{maxHigh:[0,13,B.hi]},{minLow:[0,13,B.lo]},{sweepBelow:[k.sweep,B.lo]},{isLow:[k.sweep,0,E]}]},
   {type:'notes',slot:'side',eyebrow:'SUBTOPIC 7.1',title:'Three phases',items:[
     {text:'**Accumulation** — price forms a contained range near the open',color:'blue',in:1},
     {text:'Liquidity may build above and below obvious highs and lows',color:'blue',in:2},
     {text:'**Manipulation** — price moves beyond one side of the range',color:'amber',in:3},
     {text:'Often a sweep of liquidity, against the eventual direction',color:'amber',in:4},
     {text:'**Distribution** — directional expansion away from the range',color:'green',in:6},
     {text:'Structure develops; price may travel toward a liquidity objective',color:'green',in:7}]}],
  cues:[cue('Let’s build the three phases on a model chart. The gold line is the opening price.','Mari kita bina tiga fasa ini pada carta model. Garisan emas ialah harga pembukaan, atau opening price.'),
        cue('Phase one is accumulation. Price forms a range and stays relatively contained around the open.','Fasa pertama ialah accumulation. Harga membentuk range dan kekal agak terkawal di sekitar harga pembukaan.'),
        cue('Directional progress is limited, and liquidity may build around the obvious range highs and lows.','Pergerakan berarah adalah terhad, dan liquidity mungkin terkumpul di sekitar high dan low range yang jelas.'),
        cue('Phase two is manipulation. Price moves beyond one side of the range, here below the range low.','Fasa kedua ialah manipulation. Harga bergerak melepasi satu sisi range, di sini di bawah range low.'),
        cue('This may sweep sell-side liquidity resting below the lows, and it moves against the direction that follows.','Ini mungkin menyapu sell-side liquidity di bawah low tersebut, dan ia bergerak bertentangan dengan arah yang menyusul.'),
        cue('Traders often call this a false breakout or a liquidity raid.','Trader sering menggelarnya false breakout atau liquidity raid.'),
        cue('Phase three is distribution. Price expands directionally away from the range.','Fasa ketiga ialah distribution. Harga berkembang secara berarah, menjauhi range.'),
        cue('Market structure develops, and price may travel toward a liquidity objective, such as an old high.','Struktur pasaran terbentuk, dan harga mungkin bergerak ke arah objektif liquidity, seperti high lama.')]},

 {label:'SCENE 5 · 7.1 · TWO CLARIFICATIONS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.1 · ACCURACY',title:'Two words that are easy to misread'},
   {type:'callout',slot:'left',h:430,head:'“Manipulation”',color:'amber',in:0,size:26,
    text:'A **liquidity sweep** is something you can see. Calling it “manipulation” is an **ICT interpretation**.\n\nIt does **not** prove deliberate institutional action, and it says nothing about illegal market manipulation.'},
   {type:'callout',slot:'right',h:430,head:'“Distribution”',color:'green',in:3,size:26,
    text:'In PO3, distribution means the **directional expansion** phase — up in a bullish model, down in a bearish one.\n\nIt is **not** Wyckoff Distribution, which describes a topping structure.'}],
  cues:[cue('Two words in this model need careful handling. The first is manipulation.','Dua perkataan dalam model ini perlu dikendalikan dengan teliti. Yang pertama ialah manipulation.'),
        cue('A sweep through a level is an observable event. Calling it manipulation is an interpretation from the ICT framework.','Sapuan melepasi satu paras ialah peristiwa yang boleh dilihat. Menggelarnya manipulation ialah tafsiran daripada rangka kerja ICT.'),
        cue('A sweep alone does not prove deliberate institutional action. Stops are triggered by many participants, and by news.','Sapuan semata-mata tidak membuktikan tindakan institusi yang disengajakan. Stop dicetuskan oleh ramai peserta pasaran, dan juga oleh berita.'),
        cue('The second word is distribution. In P O 3, it simply means the directional expansion phase.','Perkataan kedua ialah distribution. Dalam PO3, ia hanya bermaksud fasa pengembangan berarah.'),
        cue('So in a bullish P O 3, distribution moves up. Do not confuse it with Wyckoff Distribution, which is a topping process.','Jadi dalam PO3 bullish, distribution bergerak naik. Jangan kelirukan dengan Wyckoff Distribution, iaitu proses pembentukan puncak.')]},

 {label:'SCENE 6 · 7.1 · BULLISH PO3 MODEL',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'BULLISH PO3',tagColor:'green',candles:cs,reveal:[[1,14],[3,18],[4,19],[5,20],[6,22],[8,cs.length-2],[9,cs.length]],
    overlays:[O.level(4120,'OPEN 4,120','gold',{in:0,lpos:'left'}),
      O.level(B.hi,'RANGE HIGH','neutral',{i0:0,i1:13,in:2,size:13}),O.level(B.lo,'RANGE LOW · SSL','yellow',{i0:0,i1:18,in:2,below:true,size:13}),
      O.sweep(k.sweep,'low',B.lo,'SSL SWEEP','amber',{in:4,level:B.lo}),
      O.bos(k.lh,21,'h','MSS','white','up',{in:7}),O.fvg(k.fvg,{in:6,i1:27}),
      O.level(B.bsl,'BSL OBJECTIVE · 4,204','yellow',{in:9,i0:12}),O.sweep(E-1,'high',B.bsl,'','yellow',{in:9,level:B.bsl}),
      ...phaseBands(10,10,10)],
    checks:[{maxHigh:[0,13,B.hi]},{minLow:[0,13,B.lo]},{sweepBelow:[k.sweep,B.lo]},{closeAbove:[k.disp,B.lo]},{bull:k.disp},{bull:k.bos},{closeAbove:[k.bos,B.hi]},{sweepAbove:[E-1,B.bsl]}]},
   {type:'notes',slot:'side',eyebrow:'SUBTOPIC 7.1',title:'Bullish PO3 · 10 steps',items:[
     {text:'1 · Mark the opening price',in:0,size:21},{text:'2 · Price consolidates near the open',in:1,size:21},{text:'3 · Identify range high & range low',in:2,size:21},
     {text:'4 · Price moves below the range low',in:3,color:'amber',size:21},{text:'5 · Possible sell-side liquidity sweep',in:4,color:'amber',size:21},
     {text:'6 · Price reclaims the range',in:5,color:'green',size:21},{text:'7 · Bullish displacement (FVG)',in:6,color:'green',size:21},
     {text:'8 · Possible bullish MSS',in:7,color:'green',size:21},{text:'9 · Upward expansion',in:8,color:'green',size:21},{text:'10 · Buy-side liquidity objective',in:9,color:'yellow',size:21}]}],
  cues:[cue('Now the full bullish model, step by step. Step one: mark the opening price.','Kini model bullish penuh, langkah demi langkah. Langkah satu: tandakan opening price.'),
        cue('Step two: price consolidates around the open, rotating above and below it.','Langkah dua: harga berkonsolidasi di sekitar harga pembukaan, berputar di atas dan di bawahnya.'),
        cue('Step three: identify the range high and range low. Sell-side liquidity is assumed to rest below the lows.','Langkah tiga: kenal pasti range high dan range low. Sell-side liquidity diandaikan berada di bawah low tersebut.'),
        cue('Step four: price moves below the range low, trading under the opening price.','Langkah empat: harga bergerak di bawah range low, didagangkan di bawah harga pembukaan.'),
        cue('Step five: this candle visibly trades through the lows. That is a possible sell-side liquidity sweep.','Langkah lima: candle ini jelas didagangkan melepasi low tersebut. Itu ialah kemungkinan sapuan sell-side liquidity.'),
        cue('Step six: price fails to continue lower and reclaims the range.','Langkah enam: harga gagal meneruskan penurunan dan kembali ke dalam range.'),
        cue('Step seven: bullish displacement. Strong candles leave a fair value gap behind them.','Langkah tujuh: bullish displacement. Candle yang kuat meninggalkan fair value gap di belakangnya.'),
        cue('Step eight: a candle closes above the last lower high. That is a possible bullish market structure shift.','Langkah lapan: satu candle ditutup di atas lower high terakhir. Itu ialah kemungkinan bullish market structure shift.'),
        cue('Step nine: price expands upward, away from the range.','Langkah sembilan: harga berkembang ke atas, menjauhi range.'),
        cue('Step ten: a possible objective is buy-side liquidity above an old high, here at four thousand two hundred and four.','Langkah sepuluh: objektif yang mungkin ialah buy-side liquidity di atas high lama, di sini pada 4,204.'),
        cue('Labelled together: accumulation, manipulation, distribution. Remember, this is one possible bullish sequence, not a guarantee.','Dilabel bersama: accumulation, manipulation, distribution. Ingat, ini satu urutan bullish yang mungkin, bukan jaminan.')]},

 {label:'SCENE 7 · 7.1 · BEARISH PO3 MODEL',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'BEARISH PO3',tagColor:'red',candles:BR,reveal:[[1,14],[3,18],[4,19],[5,20],[6,22],[8,cs.length-2],[9,cs.length]],
    overlays:[O.level(4120,'OPEN 4,120','gold',{in:0,lpos:'left'}),
      O.level(8240-B.lo,'RANGE HIGH · BSL','yellow',{i0:0,i1:18,in:2,size:13}),O.level(8240-B.hi,'RANGE LOW','neutral',{i0:0,i1:13,in:2,below:true,size:13}),
      O.sweep(k.sweep,'high',8240-B.lo,'BSL SWEEP','amber',{in:4,level:8240-B.lo}),
      O.bos(k.lh,21,'l','MSS','white','down',{in:7,below:true}),O.fvg(k.fvg,{in:6,i1:27,bear:true}),
      O.level(8240-B.bsl,'SSL OBJECTIVE · 4,036','yellow',{in:9,i0:12,below:true}),O.sweep(E-1,'low',8240-B.bsl,'','yellow',{in:9,level:8240-B.bsl}),
      ...phaseBands(10,10,10,true)],
    checks:[{sweepAbove:[k.sweep,8240-B.lo]},{bear:k.disp},{bear:k.bos},{closeBelow:[k.bos,8240-B.hi]},{sweepBelow:[E-1,8240-B.bsl]}]},
   {type:'notes',slot:'side',eyebrow:'SUBTOPIC 7.1',title:'Bearish PO3 · 10 steps',items:[
     {text:'1 · Mark the opening price',in:0,size:21},{text:'2 · Accumulation around the open',in:1,size:21},{text:'3 · Identify range high & range low',in:2,size:21},
     {text:'4 · Price moves above the range high',in:3,color:'amber',size:21},{text:'5 · Possible buy-side liquidity sweep',in:4,color:'amber',size:21},
     {text:'6 · Price returns below the range high',in:5,color:'red',size:21},{text:'7 · Bearish displacement (FVG)',in:6,color:'red',size:21},
     {text:'8 · Possible bearish MSS',in:7,color:'red',size:21},{text:'9 · Downward expansion',in:8,color:'red',size:21},{text:'10 · Sell-side liquidity objective',in:9,color:'yellow',size:21}]}],
  cues:[cue('The bearish model is the inverse. Step one: mark the opening price.','Model bearish ialah songsangannya. Langkah satu: tandakan opening price.'),
        cue('Step two: accumulation. Price ranges around the open.','Langkah dua: accumulation. Harga bergerak dalam range di sekitar harga pembukaan.'),
        cue('Step three: identify the range high and range low. This time we focus on buy-side liquidity above the highs.','Langkah tiga: kenal pasti range high dan range low. Kali ini kita fokus pada buy-side liquidity di atas high.'),
        cue('Step four: price moves above the range high, trading over the opening price.','Langkah empat: harga bergerak di atas range high, didagangkan di atas harga pembukaan.'),
        cue('Step five: the wick trades through the highs. A possible buy-side liquidity sweep.','Langkah lima: sumbu candle didagangkan melepasi high tersebut. Kemungkinan sapuan buy-side liquidity.'),
        cue('Step six: price cannot hold above and returns below the range high.','Langkah enam: harga tidak dapat bertahan di atas dan kembali ke bawah range high.'),
        cue('Step seven: bearish displacement, leaving a bearish fair value gap.','Langkah tujuh: bearish displacement, meninggalkan bearish fair value gap.'),
        cue('Step eight: a close below the last higher low. A possible bearish market structure shift.','Langkah lapan: penutupan di bawah higher low terakhir. Kemungkinan bearish market structure shift.'),
        cue('Step nine: price expands downward.','Langkah sembilan: harga berkembang ke bawah.'),
        cue('Step ten: a possible objective is sell-side liquidity below an old low.','Langkah sepuluh: objektif yang mungkin ialah sell-side liquidity di bawah low lama.'),
        cue('Accumulation, manipulation, distribution again, with the direction reversed.','Accumulation, manipulation, distribution sekali lagi, dengan arah yang terbalik.')]},

 {label:'SCENE 8 · 7.1 · OPENING PRICE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.1 · OPENING PRICE',title:'Daily open vs session open'},
   {type:'table',slot:'main',cols:['Reference','What it is','How CMI uses it'],widths:['22%','39%','39%'],size:23,rows:[
     {cells:['Daily open','First price of the trading day, by a stated convention (e.g. ICT forex: New York midnight)','Anchor for the day’s PO3: where is price relative to the day’s start?'],in:1,color:'gold'},
     {cells:['Session open','First price of a session (e.g. London, New York, or FCPO morning / afternoon)','Anchor for a session-based PO3 inside the day'],in:2,color:'cyan'},
     {cells:['FCPO note','Day session opens 10:30 MYT; T+1 (after-hours) session 21:00 MYT is booked to the next trading day','State your convention on the chart and keep it consistent'],in:4,color:'purple'}]},
   {type:'callout',r:[120,620,1680,110],head:'Reference — not a wall',color:'red',in:6,size:24,text:'The opening price is **not** automatic support or resistance, and it is **not** Equilibrium of a dealing range.'}],
  cues:[cue('The opening price is the anchor of the P O 3 model, so we need to be precise about which open we mean.','Opening price ialah sauh model PO3, jadi kita perlu tepat tentang harga pembukaan yang mana dimaksudkan.'),
        cue('The daily open is the first price of the trading day under a stated convention. In ICT forex material, that is often New York midnight.','Daily open ialah harga pertama hari dagangan mengikut konvensyen yang dinyatakan. Dalam bahan forex ICT, ia selalunya tengah malam New York.'),
        cue('A session open is the first price of a session, such as London, New York, or an F C P O trading session.','Session open ialah harga pertama sesuatu sesi, seperti London, New York, atau sesi dagangan FCPO.'),
        cue('A daily P O 3 uses the daily open. A session-based P O 3 uses the session open.','PO3 harian menggunakan daily open. PO3 berasaskan sesi menggunakan session open.'),
        cue('For F C P O, the day session opens at ten thirty Malaysia time, and the after-hours T plus one session is booked to the next trading day.','Bagi FCPO, sesi siang dibuka pada 10:30 pagi waktu Malaysia, dan sesi after-hours T+1 direkodkan untuk hari dagangan berikutnya.'),
        cue('So choose one convention, write it on your chart, and keep it consistent.','Jadi pilih satu konvensyen, tulis pada carta anda, dan kekalkan secara konsisten.'),
        cue('And remember: the open is a reference. It is not automatic support or resistance, and it is not the same as equilibrium.','Dan ingat: harga pembukaan ialah rujukan. Ia bukan support atau resistance automatik, dan ia tidak sama dengan equilibrium.')]},

 {label:'SCENE 9 · 7.1 · PRICE VS THE OPEN',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:M,note:false,tag:'BULLISH · TRADES BELOW OPEN FIRST',tagColor:'green',candles:cs,reveal:[[0,cs.length]],
    overlays:[O.level(4120,'OPEN','gold',{lpos:'left',in:0}),O.zone(4120,4078,0,E,'BELOW OPEN','green',{in:1,alpha:0.07,stroke:false,lpos:'below'})]},
   {type:'chart',slot:'right',compact:true,title:M,note:false,tag:'BEARISH · TRADES ABOVE OPEN FIRST',tagColor:'red',candles:BR,reveal:[[2,cs.length]],
    overlays:[O.level(4120,'OPEN','gold',{lpos:'left',in:2}),O.zone(4120,4162,0,E,'ABOVE OPEN','red',{in:3,alpha:0.07,stroke:false,lpos:'above'})]},
   {type:'text',slot:'bottom',size:24,color:'grey',align:'center',in:4,text:'Price location vs the open is **one input** to a directional interpretation — never a signal on its own.'}],
  cues:[cue('In the bullish model, the manipulation phase usually trades below the opening price before the expansion higher.','Dalam model bullish, fasa manipulation biasanya didagangkan di bawah opening price sebelum pengembangan ke atas.'),
        cue('So some ICT traders prefer to look for bullish setups only while price is below the open, on a bullish day.','Jadi sesetengah trader ICT lebih suka mencari setup bullish hanya ketika harga di bawah harga pembukaan, pada hari yang bullish.'),
        cue('In the bearish model, the reverse applies. The false move trades above the open first.','Dalam model bearish, sebaliknya berlaku. Pergerakan palsu didagangkan di atas harga pembukaan dahulu.'),
        cue('This gives a simple location filter, but it only makes sense once you already have a directional context.','Ini memberi penapis lokasi yang ringkas, tetapi ia hanya bermakna apabila anda sudah mempunyai konteks arah.'),
        cue('Price location versus the open is one input to your interpretation. It is never a signal on its own.','Lokasi harga berbanding harga pembukaan ialah satu input kepada tafsiran anda. Ia tidak sekali-kali menjadi isyarat dengan sendirinya.')]},

 {label:'SCENE 10 · 7.1 · PO3 ACROSS TIMEFRAMES',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'HIGHER TIMEFRAME',note:'ONE CANDLE = WHOLE SEQUENCE',tag:'O · L · H · C',tagColor:'gold',candles:[agg(cs)],padR:1.2,padL:1.2,reveal:[[0,1]],
    overlays:[O.text(0,'o','OPEN','gold',{anchor:'end',dy:6,i:-0.35}),O.text(0,'l','LOW = MANIPULATION','amber',{dy:24}),O.text(0,'h','HIGH','green',{dy:-12}),O.text(0,'c','CLOSE · NEAR HIGH','green',{anchor:'start',i:0.35,dy:6})]},
   {type:'chart',slot:'right',compact:true,title:'LOWER TIMEFRAME',note:'SAME PERIOD, INTRADAY',tag:'INTRADAY PO3',tagColor:'green',candles:cs,reveal:[[1,cs.length]],
    overlays:[O.level(4120,'OPEN','gold',{lpos:'left',in:1}),...phaseBands(1,1,1)]},
   {type:'text',slot:'bottom',size:23,color:'grey',align:'center',in:4,text:'Smaller PO3 formations can appear inside a larger move — they are **not necessarily** the same market cycle.'}],
  cues:[cue('P O 3 can be read on different timeframes. On the left, the entire intraday sequence is aggregated into one candle.','PO3 boleh dibaca pada pelbagai timeframe. Di sebelah kiri, keseluruhan urutan intraday digabungkan menjadi satu candle.'),
        cue('Its open is the open, its low wick is the manipulation, and its close near the high reflects the expansion.','Open candle itu ialah harga pembukaan, sumbu bawahnya ialah manipulation, dan penutupan berhampiran high mencerminkan pengembangan.'),
        cue('This is the classic daily P O 3 picture: open, low, high, close for a bullish day.','Inilah gambaran klasik PO3 harian: open, low, high, close bagi hari bullish.'),
        cue('The same idea can be applied to a session, or to an intraday swing.','Idea yang sama boleh digunakan pada satu sesi, atau pada swing intraday.'),
        cue('But a small P O 3 inside a larger move is not necessarily part of the same market cycle. Always state which timeframe you are reading.','Tetapi PO3 kecil dalam pergerakan yang lebih besar tidak semestinya sebahagian daripada kitaran pasaran yang sama. Sentiasa nyatakan timeframe yang anda baca.')]},

 {label:'SCENE 11 · 7.1 · COMMON MISTAKES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.1 · COMMON MISTAKES',title:'Eight ways PO3 gets misused'},
   {type:'list',slot:'main',icon:'x',cols:2,size:27,items:[
     {text:'Assuming every day follows PO3',in:0},{text:'Forcing the three phases onto every chart',in:1},
     {text:'Treating every breakout as manipulation',in:2},{text:'Assuming distribution must reach a specific target',in:3},
     {text:'Confusing the opening price with Equilibrium',in:4},{text:'Ignoring market structure',in:5},
     {text:'Confusing PO3 with the Wyckoff market cycle',in:6},{text:'Claiming institutional manipulation without evidence',in:7}]}],
  cues:[cue('Let’s close the concept with common mistakes. One: assuming every day follows P O 3. Many days do not.','Mari kita tutup konsep ini dengan kesilapan biasa. Satu: menganggap setiap hari mengikut PO3. Banyak hari tidak begitu.'),
        cue('Two: forcing the three phases onto a chart after the fact.','Dua: memaksa tiga fasa ke atas carta selepas sesuatu berlaku.'),
        cue('Three: treating every breakout as manipulation. Many breakouts simply continue.','Tiga: menganggap setiap breakout sebagai manipulation. Banyak breakout terus bergerak.'),
        cue('Four: assuming distribution must reach a particular liquidity target.','Empat: menganggap distribution mesti mencapai sasaran liquidity tertentu.'),
        cue('Five: confusing the opening price with equilibrium. They are different references.','Lima: mengelirukan opening price dengan equilibrium. Kedua-duanya rujukan berbeza.'),
        cue('Six: ignoring market structure from Level Two.','Enam: mengabaikan struktur pasaran daripada Level 2.'),
        cue('Seven: confusing P O 3 with the Wyckoff market cycle.','Tujuh: mengelirukan PO3 dengan kitaran pasaran Wyckoff.'),
        cue('And eight: claiming institutional manipulation without evidence.','Dan lapan: mendakwa manipulasi institusi tanpa bukti.')]},

 {label:'SCENE 12 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Power of Three — what to remember'},
   {type:'list',slot:'main',cols:2,size:27,items:[
     {text:'PO3 = a conceptual price-delivery model',in:0},{text:'Accumulation · Manipulation · Distribution',in:0},
     {text:'The opening price is the anchor — a reference only',in:1},{text:'Bullish: false move below the open, expansion up',in:1},
     {text:'Bearish: false move above the open, expansion down',in:1},{text:'A sweep is observed; “manipulation” is interpreted',in:2},
     {text:'Works on several timeframes — state which one',in:2},{text:'Incomplete sequence → do not force it',in:3}]}],
  cues:[cue('To summarise. P O 3 is a conceptual model with three phases: accumulation, manipulation and distribution.','Sebagai rumusan. PO3 ialah model konseptual dengan tiga fasa: accumulation, manipulation dan distribution.'),
        cue('The opening price anchors the model. Bullish models trade below the open first; bearish models trade above it first.','Opening price menjadi sauh model. Model bullish didagangkan di bawah harga pembukaan dahulu; model bearish di atasnya dahulu.'),
        cue('A sweep is what you observe. Manipulation is how the framework interprets it.','Sapuan ialah apa yang anda lihat. Manipulation ialah cara rangka kerja ini mentafsirnya.'),
        cue('And when the sequence is incomplete, the professional answer is not to force it.','Dan apabila urutan tidak lengkap, jawapan profesional ialah tidak memaksanya.')]},
 ...quizScenes(1,quiz,13),
 disclaimer('Next: Episode 02 — Bullish and Bearish PO3 Models','SCENE 16 · DISCLAIMER'),
];
module.exports={meta:meta(1,'Understanding Power of Three'),scenes,quiz};
