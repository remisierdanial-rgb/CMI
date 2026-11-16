// EPISODE 10 — UNDERSTANDING SMT DIVERGENCE (Subtopic 7.6)
'use strict';
const {meta,disclaimer,quizScenes,O,cue}=require('./_lib');
const {pair,bearPair}=require('./_smt');
const P=pair('bull'), Q=bearPair('bull');
const TA='INSTRUMENT A · 15M', TB='INSTRUMENT B · 15M';
const ax=(p,inn)=>[O.vline(p.l1,'','neutral',{in:inn}),O.vline(p.l2,'','neutral',{in:inn})];

const quiz={
 questions:[
  {q:'What does SMT stand for in ICT methodology, and what does SMT Divergence compare?',a:'Smart Money Technique; it compares the swing highs/lows of two (or more) related instruments over the same period.',why:'It is a relative price comparison between instruments — not a price-vs-indicator comparison.'},
  {q:'State CMI’s bullish SMT convention.',a:'Instrument A trades below its prior swing low (lower low) while related Instrument B fails to make a corresponding lower low (holds a higher low). Confirmation is sought on A.',why:'Conventions vary on which instrument “leads”; stating the convention prevents confusion.'},
  {q:'Give four criteria for choosing a valid SMT pair.',a:'A real economic relationship, historical co-movement, overlapping trading hours, comparable data quality (also: contract specs, currency, drivers).',why:'Charts that merely look similar are not a valid basis for SMT.'},
  {q:'How is SMT different from RSI or MACD divergence?',a:'SMT compares two instruments’ prices; oscillator divergence compares one instrument’s price with an indicator derived from that price.',why:'They are separate techniques measuring different things (relative strength vs momentum).'},
  {q:'Why is SMT not an automatic reversal signal?',a:'Divergences can persist or resolve without reversal; structure confirmation (e.g. MSS) and context are still required.',why:'Correlations change, news can hit one instrument more, and both may continue in the same direction.'}],
 charts:[{prompt:'Place two related instruments side by side on the same timeframe and time range. Mark the last two swing lows on both and state whether bullish SMT exists.',answer:'Bullish SMT requires A: lower low and B: higher (or equal-holding) low at the corresponding time.'},
         {prompt:'Repeat for swing highs and identify bearish SMT. Note the exact candle times of each swing on both charts.',answer:'Swings must be time-aligned; a mismatch in time invalidates the comparison.'}],
 practical:{task:'Choose a pair you believe is related. Write a one-page justification covering the economic link, trading hours, contract/currency differences and a simple co-movement check.',guide:'A strong justification acknowledges when the relationship is weak or unstable.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 10 · LEVEL 7 · SUBTOPIC 7.6',title:'Understanding SMT Divergence',subtitle:'Comparing related instruments · Relative strength and weakness',objIn:2,
   objectives:['Define SMT Divergence and the CMI convention','Choose instruments with a real relationship','Identify bullish and bearish SMT on aligned charts','Separate SMT from RSI/MACD divergence']}],
  cues:[cue('Welcome to Episode Ten, subtopic seven point six: S M T Divergence.','Selamat datang ke Episod 10, subtopik 7.6: SMT Divergence.'),
        cue('Every concept so far looked at one chart. S M T compares two.','Setiap konsep setakat ini melihat satu carta. SMT membandingkan dua.'),
        cue('We will define it, set a clear convention, learn how to choose a valid pair, and see how it fits with liquidity, structure and P D arrays.','Kita akan mentakrifnya, menetapkan konvensyen yang jelas, belajar cara memilih pasangan yang sah, dan melihat bagaimana ia sesuai dengan liquidity, struktur dan PD array.')]},

 {label:'SCENE 2 · 7.6 · WHAT IS SMT',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · DEFINITION',title:'SMT — Smart Money Technique'},
   {type:'callout',slot:'left',h:310,head:'CMI definition',color:'gold',in:0,size:25,text:'**SMT Divergence** is a relative comparison of **swing highs and lows** between **related instruments** over the **same period**. A divergence exists when one makes a new extreme and the other does not.'},
   {type:'list',slot:'right',icon:'dot',size:25,items:[
     {text:'SMT = “Smart Money Technique” in ICT terminology',in:1,color:'blue'},
     {text:'Related markets usually move together',in:2,color:'blue'},{text:'When they disagree at a swing, that disagreement is information',in:3,color:'pink'},
     {text:'Not RSI/MACD divergence — no indicator involved',in:4,color:'red'},{text:'An analytical comparison — not proof of institutional activity',in:5,color:'red'}]}],
  cues:[cue('S M T Divergence is a relative comparison of swing highs and lows between related instruments, over the same period.','SMT Divergence ialah perbandingan relatif swing high dan low antara instrumen yang berkaitan, dalam tempoh yang sama.'),
        cue('In I C T terminology, S M T stands for Smart Money Technique.','Dalam terminologi ICT, SMT bermaksud Smart Money Technique.'),
        cue('Related markets usually move together. When they reach a swing point together, we expect similar behaviour.','Pasaran yang berkaitan biasanya bergerak bersama. Apabila ia mencapai titik swing bersama, kita menjangkakan tingkah laku yang serupa.'),
        cue('When one makes a new extreme and the other does not, that disagreement is information about relative strength and weakness.','Apabila satu membuat ekstrem baharu dan yang satu lagi tidak, percanggahan itu ialah maklumat tentang kekuatan dan kelemahan relatif.'),
        cue('This is not R S I or M A C D divergence. No indicator is involved.','Ini bukan divergence RSI atau MACD. Tiada indikator yang terlibat.'),
        cue('And it is an analytical comparison. It does not prove institutional activity, and it does not predict a reversal on its own.','Dan ia perbandingan analisis. Ia tidak membuktikan aktiviti institusi, dan tidak meramalkan pembalikan dengan sendirinya.')]},

 {label:'SCENE 3 · 7.6 · SELECTING INSTRUMENTS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · INSTRUMENT SELECTION',title:'Is this pair actually related?'},
   {type:'flow',slot:'main',perRow:3,bh:170,arrows:false,steps:[
     {n:'01',text:'Similar underlying exposure',sub:'Same or closely linked asset',in:0},{n:'02',text:'Economic relationship',sub:'Substitutes, inputs, same index family',in:0},{n:'03',text:'Historical co-movement',sub:'Checked, not assumed',in:1},
     {n:'04',text:'Overlapping trading periods',sub:'Both trading at the same time',in:2},{n:'05',text:'Comparable data & specs',sub:'Contract, currency, data quality',in:3},{n:'06',text:'Shared fundamental drivers',sub:'And known differences',in:4}]},
   {type:'callout',r:[120,580,1680,110],head:'Warning',color:'red',in:5,size:24,text:'Correlation is **not constant**. Never compare unrelated instruments just because their charts look alike.'}],
  cues:[cue('S M T is only as good as the pair. First, do they share a similar underlying exposure, and a real economic relationship?','SMT hanya sebaik pasangan yang dipilih. Pertama, adakah ia berkongsi pendedahan asas yang serupa, dan hubungan ekonomi yang sebenar?'),
        cue('Second, do they have a history of moving together? Check it; do not assume it.','Kedua, adakah ia mempunyai sejarah bergerak bersama? Semak; jangan andaikan.'),
        cue('Third, do they trade at the same time? Different session hours create false divergences.','Ketiga, adakah ia didagangkan pada masa yang sama? Waktu sesi yang berbeza mencipta divergence palsu.'),
        cue('Fourth, are the data, contract specifications and currencies comparable?','Keempat, adakah data, spesifikasi kontrak dan mata wang boleh dibandingkan?'),
        cue('Fifth, what drivers do they share, and where do they differ?','Kelima, apakah pemacu yang dikongsi, dan di mana ia berbeza?'),
        cue('And remember, correlation is not constant. Never compare unrelated instruments just because their charts look alike.','Dan ingat, korelasi tidak tetap. Jangan sekali-kali membandingkan instrumen yang tidak berkaitan hanya kerana cartanya kelihatan serupa.')]},

 {label:'SCENE 4 · 7.6 · BULLISH SMT',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'A · LOWER LOW',tagColor:'blue',candles:P.A,padR:2,reveal:[[0,P.l2-3],[1,P.l2+1],[4,P.n]],
    overlays:[...ax(P,1),O.mark(P.l1,'l','L1','blue',{in:0,swing:true,lsize:16}),O.mark(P.l2,'l','LL','blue',{in:1,swing:true,lsize:16}),O.path([[P.l1,'l'],[P.l2,'l']],'blue',{in:3}),
      O.level(P.A[P.l1][2],'','yellow',{i0:P.l1,i1:P.l2+1,in:1,size:12}),O.bos(P.hA,22,'h','MSS','white','up',{in:4})],
    checks:[{lowerLow:[P.l1,P.l2]},{sweepBelow:[P.l2,P.A[P.l1][2]]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'B · HIGHER LOW',tagColor:'pink',candles:P.B,padR:2,reveal:[[0,P.l2-3],[2,P.l2+1],[4,P.n]],
    overlays:[...ax(P,1),O.mark(P.l1,'l','L1','pink',{in:0,swing:true,lsize:16}),O.mark(P.l2,'l','HL','pink',{in:2,swing:true,lsize:16}),O.path([[P.l1,'l'],[P.l2,'l']],'pink',{in:3})],
    checks:[{higherLow:[P.l1,P.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:3,text:'**CMI convention:** A = the instrument that makes the new extreme · B = the instrument that fails to confirm · look for confirmation on A.'}],
  cues:[cue('Bullish S M T. Two related instruments, on the same timeframe and the same time axis. Both have made a first swing low.','SMT bullish. Dua instrumen berkaitan, pada timeframe yang sama dan paksi masa yang sama. Kedua-duanya telah membuat swing low pertama.'),
        cue('Instrument A falls again and trades below its first low. It makes a lower low, sweeping the sell-side liquidity beneath.','Instrumen A jatuh lagi dan didagangkan di bawah low pertamanya. Ia membuat lower low, menyapu sell-side liquidity di bawahnya.'),
        cue('At the same time, Instrument B fails to make a corresponding lower low. It holds a higher low.','Pada masa yang sama, Instrumen B gagal membuat lower low yang sepadan. Ia mengekalkan higher low.'),
        cue('That disagreement is the bullish S M T Divergence. B is showing relative strength, a warning that the bearish move may be weakening.','Percanggahan itulah SMT Divergence bullish. B menunjukkan kekuatan relatif, satu amaran bahawa pergerakan bearish mungkin semakin lemah.'),
        cue('Further confirmation is still needed. Here, Instrument A later shifts structure, closing above its last lower high.','Pengesahan lanjut masih diperlukan. Di sini, Instrumen A kemudian mengalihkan struktur, ditutup di atas lower high terakhirnya.'),
        cue('Definitions vary on which instrument leads. The C M I convention: A is the instrument that makes the new extreme, B fails to confirm, and we look for confirmation on A.','Takrif berbeza tentang instrumen mana yang mendahului. Konvensyen CMI: A ialah instrumen yang membuat ekstrem baharu, B gagal mengesahkan, dan kita mencari pengesahan pada A.')]},

 {label:'SCENE 5 · 7.6 · BEARISH SMT',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'A · HIGHER HIGH',tagColor:'blue',candles:Q.A,padR:2,reveal:[[0,Q.l2-3],[1,Q.l2+1],[3,Q.n]],
    overlays:[...ax(Q,1),O.mark(Q.l1,'h','H1','blue',{in:0,swing:true,lsize:16}),O.mark(Q.l2,'h','HH','blue',{in:1,swing:true,lsize:16}),O.path([[Q.l1,'h'],[Q.l2,'h']],'blue',{in:2}),O.bos(Q.hA,22,'l','MSS','white','down',{in:3,below:true})],
    checks:[{higherHigh:[Q.l1,Q.l2]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'B · LOWER HIGH',tagColor:'pink',candles:Q.B,padR:2,reveal:[[0,Q.l2-3],[1,Q.l2+1],[3,Q.n]],
    overlays:[...ax(Q,1),O.mark(Q.l1,'h','H1','pink',{in:0,swing:true,lsize:16}),O.mark(Q.l2,'h','LH','pink',{in:1,swing:true,lsize:16}),O.path([[Q.l1,'h'],[Q.l2,'h']],'pink',{in:2})],
    checks:[{lowerHigh:[Q.l1,Q.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:4,text:'Bearish SMT: A makes a higher high · B fails (lower high) → relative weakness · confirmation still required on A.'}],
  cues:[cue('Bearish S M T is the opposite. Both instruments make a first swing high.','SMT bearish ialah sebaliknya. Kedua-dua instrumen membuat swing high pertama.'),
        cue('Instrument A rallies above its first high, a higher high. Instrument B fails to follow, and prints a lower high.','Instrumen A naik melepasi high pertamanya, iaitu higher high. Instrumen B gagal mengikut, dan mencetak lower high.'),
        cue('That is bearish S M T Divergence: relative weakness, a warning that the bullish move may be losing strength.','Itulah SMT Divergence bearish: kelemahan relatif, satu amaran bahawa pergerakan bullish mungkin kehilangan kekuatan.'),
        cue('Again, confirmation is needed. Here Instrument A later shifts structure lower.','Sekali lagi, pengesahan diperlukan. Di sini Instrumen A kemudian mengalihkan struktur ke bawah.'),
        cue('Without that confirmation, the divergence is only an observation.','Tanpa pengesahan itu, divergence hanyalah pemerhatian.')]},

 {label:'SCENE 6 · 7.6 · SMT AND LIQUIDITY',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'A · SSL SWEPT',tagColor:'blue',candles:P.A,padR:2,reveal:[[0,P.n]],
    overlays:[O.level(P.A[P.l1][2],'PREVIOUS LOW · SSL','yellow',{i0:P.l1,i1:P.n,below:true,size:13,in:0}),O.sweep(P.l2,'low',P.A[P.l1][2],'SWEPT','amber',{in:1,level:P.A[P.l1][2]})]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'B · SSL INTACT',tagColor:'pink',candles:P.B,padR:2,reveal:[[0,P.n]],
    overlays:[O.level(P.B[P.l1][2],'PREVIOUS LOW · SSL','yellow',{i0:P.l1,i1:P.n,below:true,size:13,in:0}),O.text(P.l2,'l','NOT SWEPT','green',{in:2,dy:30})],
    checks:[{minLow:[P.l1+1,P.n-1,P.B[P.l1][2]]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:3,text:'Same liquidity concept on both charts — **one swept, one not**. Evaluate it within the broader market context.'}],
  cues:[cue('S M T connects naturally with Level Three liquidity. Both instruments have sell-side liquidity under a previous low.','SMT berkait secara semula jadi dengan liquidity Level 3. Kedua-dua instrumen mempunyai sell-side liquidity di bawah low sebelumnya.'),
        cue('Instrument A sweeps it.','Instrumen A menyapunya.'),
        cue('Instrument B does not. Its sell-side liquidity remains intact.','Instrumen B tidak. Sell-side liquidity-nya kekal utuh.'),
        cue('The same applies with buy-side liquidity in bearish S M T. But evaluate it within the broader market. Not every mismatch between two highs or lows is meaningful S M T.','Perkara yang sama terpakai bagi buy-side liquidity dalam SMT bearish. Tetapi nilaikan dalam konteks pasaran yang lebih luas. Bukan setiap ketidakpadanan antara dua high atau low ialah SMT yang bermakna.')]},

 {label:'SCENE 7 · 7.6 · SMT AND STRUCTURE',layout:'chart',comps:[
   {type:'chart',slot:'main',title:TA,note:'ILLUSTRATIVE',tag:'SMT + MARKET STRUCTURE',tagColor:'blue',candles:P.A,reveal:[[0,P.n]],
    overlays:[O.mark(P.l1,'l','L','white',{in:0,swing:true,price:false,lsize:15}),O.mark(P.hA,'h','LH','white',{in:0,swing:true,price:false,lsize:15}),O.mark(P.l2,'l','LL','white',{in:0,swing:true,price:false,lsize:15}),
      O.text(P.l2,'l','SMT WITH B','pink',{in:1,dy:58,size:14}),O.bos(P.hA,22,'h','MSS','white','up',{in:2}),O.mark(P.n-1,'h','HH?','green',{in:3,price:false,lsize:15})],
    checks:[{lowerLow:[P.l1,P.l2]}]},
   {type:'notes',slot:'side',eyebrow:'7.6 · LEVEL 2 LINK',title:'SMT adds context',items:[
     {text:'Bearish leg: LH and LL on A',in:0},{text:'SMT appears at the LL (B holds)',in:1,color:'pink'},{text:'Structure confirms: MSS above the LH',in:2,color:'green'},
     {text:'New HH would extend the shift',in:3,color:'green'},{text:'SMT does not replace structure analysis',in:4,color:'red'}]}],
  cues:[cue('Now link S M T with Level Two structure. On Instrument A, the bearish leg prints a lower high and a lower low.','Kini kaitkan SMT dengan struktur Level 2. Pada Instrumen A, kaki bearish mencetak lower high dan lower low.'),
        cue('The S M T divergence appears at that lower low, because Instrument B holds its low.','Divergence SMT muncul pada lower low tersebut, kerana Instrumen B mengekalkan low-nya.'),
        cue('Structure then confirms with a market structure shift above the lower high.','Struktur kemudian mengesahkan dengan market structure shift di atas lower high.'),
        cue('A new higher high would extend the shift.','Higher high baharu akan memanjangkan anjakan tersebut.'),
        cue('S M T adds context around a possible shift. It does not replace structure analysis.','SMT menambah konteks di sekitar kemungkinan anjakan. Ia tidak menggantikan analisis struktur.')]},

 {label:'SCENE 8 · 7.6 · SMT AND PD ARRAYS',layout:'chart',comps:[
   {type:'chart',slot:'main',title:TA,note:'ILLUSTRATIVE',tag:'SMT AT A PD ARRAY',tagColor:'purple',candles:P.A,reveal:[[0,P.n]],
    overlays:[O.zone(4920,4938,4,P.n,'HTF BULLISH ORDER BLOCK','blue',{in:0,alpha:0.12,lpos:'below'}),O.zone(4900,4952,4,P.n,'DISCOUNT','green',{in:1,alpha:0.04,stroke:false,lpos:'right'}),
      O.sweep(P.l2,'low',P.A[P.l1][2],'SMT HERE','pink',{in:2,level:P.A[P.l1][2]}),O.fvg(20,{in:3,i1:27})],
    checks:[{sweepBelow:[P.l2,4938]}]},
   {type:'notes',slot:'side',eyebrow:'7.6 · LEVELS 4–6 LINK',title:'Confluence, not certainty',items:[
     {text:'Price reaches a bullish OB in discount',in:0,color:'blue'},{text:'Location: discount (Level 6)',in:1,color:'green'},{text:'SMT forms at the same time',in:2,color:'pink'},
     {text:'Displacement leaves an FVG (Level 5)',in:3,color:'green'},{text:'Interesting confluence — no guarantee',in:4,color:'red'}]}],
  cues:[cue('S M T is often studied at P D arrays. Here, Instrument A trades into a higher-timeframe bullish order block.','SMT sering dikaji di PD array. Di sini, Instrumen A didagangkan ke dalam bullish order block timeframe tinggi.'),
        cue('The order block sits in discount.','Order block itu berada dalam discount.'),
        cue('At the same time, the S M T divergence forms: A makes a lower low, B does not.','Pada masa yang sama, divergence SMT terbentuk: A membuat lower low, B tidak.'),
        cue('Displacement follows and leaves a fair value gap.','Displacement menyusul dan meninggalkan fair value gap.'),
        cue('S M T at a P D array is an interesting analytical confluence. It does not guarantee a reaction.','SMT di PD array ialah confluence analisis yang menarik. Ia tidak menjamin reaksi.')]},

 {label:'SCENE 9 · 7.6 · SMT VS OSCILLATOR DIVERGENCE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · COMPARISON',title:'SMT vs traditional oscillator divergence'},
   {type:'table',slot:'main',cols:['','SMT Divergence','Oscillator divergence (RSI, MACD)'],widths:['18%','41%','41%'],size:23,rows:[
     {cells:['Compares','Price of one instrument vs price of a related instrument','Price vs an indicator calculated from the same price'],in:0,color:'gold'},
     {cells:['Uses','Relative highs and lows across instruments','Price highs/lows vs indicator highs/lows'],in:1},
     {cells:['Depends on','The relationship between instruments','The indicator formula and settings'],in:2},
     {cells:['Highlights','Relative strength or weakness','Momentum divergence'],in:3},
     {cells:['Common failure','Correlation breaks down','Momentum diverges for a long time'],in:4,color:'red'}]}],
  cues:[cue('How does S M T differ from R S I or M A C D divergence? S M T compares one instrument’s price with a related instrument’s price. Oscillator divergence compares price with an indicator calculated from that same price.','Bagaimana SMT berbeza daripada divergence RSI atau MACD? SMT membandingkan harga satu instrumen dengan harga instrumen berkaitan. Divergence oscillator membandingkan harga dengan indikator yang dikira daripada harga yang sama.'),
        cue('S M T uses relative highs and lows across instruments. Oscillator divergence uses price extremes versus indicator extremes.','SMT menggunakan high dan low relatif merentas instrumen. Divergence oscillator menggunakan ekstrem harga berbanding ekstrem indikator.'),
        cue('S M T depends on the relationship between instruments. Oscillator divergence depends on the indicator formula and settings.','SMT bergantung pada hubungan antara instrumen. Divergence oscillator bergantung pada formula dan tetapan indikator.'),
        cue('S M T highlights relative strength or weakness. Oscillator divergence highlights momentum.','SMT menonjolkan kekuatan atau kelemahan relatif. Divergence oscillator menonjolkan momentum.'),
        cue('They are separate techniques, with separate failure modes.','Kedua-duanya teknik yang berasingan, dengan cara kegagalan yang berasingan.')]},

 {label:'SCENE 10 · 7.6 · COMMON MISTAKES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · COMMON MISTAKES',title:'Nine SMT mistakes'},
   {type:'list',slot:'main',icon:'x',cols:2,size:25,items:[
     {text:'Comparing unrelated instruments',in:0},{text:'Using different or misaligned timeframes',in:1},{text:'Ignoring session differences',in:2},{text:'Comparing non-synchronised data',in:2},{text:'Assuming correlation is permanent',in:3},
     {text:'Treating every mismatch as SMT',in:4},{text:'Treating SMT as an automatic reversal signal',in:5},{text:'Confusing SMT with RSI or MACD divergence',in:6},{text:'Ignoring the broader market structure',in:7}]}],
  cues:[cue('Common mistakes. Comparing unrelated instruments.','Kesilapan biasa. Membandingkan instrumen yang tidak berkaitan.'),
        cue('Using different or misaligned timeframes.','Menggunakan timeframe yang berbeza atau tidak sejajar.'),
        cue('Ignoring session differences, and comparing data that is not synchronised.','Mengabaikan perbezaan sesi, dan membandingkan data yang tidak disegerakkan.'),
        cue('Assuming correlation is permanent.','Menganggap korelasi adalah kekal.'),
        cue('Treating every mismatch as S M T.','Menganggap setiap ketidakpadanan sebagai SMT.'),
        cue('Treating S M T as an automatic reversal signal.','Menganggap SMT sebagai isyarat pembalikan automatik.'),
        cue('Confusing S M T with R S I or M A C D divergence.','Mengelirukan SMT dengan divergence RSI atau MACD.'),
        cue('And ignoring the broader market structure.','Dan mengabaikan struktur pasaran yang lebih luas.')]},

 {label:'SCENE 11 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'SMT Divergence — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'SMT compares swings of related instruments',in:0},{text:'Same timeframe, same time axis, same swing',in:0},
     {text:'Bullish: A lower low, B higher low',in:1},{text:'Bearish: A higher high, B lower high',in:1},
     {text:'Confirm on A with structure',in:2},{text:'Not RSI/MACD; not a reversal guarantee',in:2}]}],
  cues:[cue('To summarise. S M T compares the swings of related instruments, on the same timeframe, the same time axis, and the same swing.','Sebagai rumusan. SMT membandingkan swing instrumen yang berkaitan, pada timeframe yang sama, paksi masa yang sama, dan swing yang sama.'),
        cue('Bullish: A makes a lower low while B holds a higher low. Bearish: A makes a higher high while B makes a lower high.','Bullish: A membuat lower low manakala B mengekalkan higher low. Bearish: A membuat higher high manakala B membuat lower high.'),
        cue('Look for confirmation on A with structure. And remember: it is not oscillator divergence, and it does not guarantee a reversal.','Cari pengesahan pada A melalui struktur. Dan ingat: ia bukan divergence oscillator, dan ia tidak menjamin pembalikan.')]},
 ...quizScenes(10,quiz,12),
 disclaimer('Next: Episode 11 — Bullish and Bearish SMT Divergence','SCENE 15 · DISCLAIMER'),
];
module.exports={meta:meta(10,'Understanding SMT Divergence'),scenes,quiz};
