// EPISODE 11 — BULLISH AND BEARISH SMT DIVERGENCE (extended lesson, Subtopic 7.6)
'use strict';
const {meta,disclaimer,quizScenes,O,cue}=require('./_lib');
const {pair,bearPair}=require('./_smt');
const P=pair('bull'), PF=pair('fail'), Q=bearPair('bull'), QF=bearPair('fail'), NF=pair('nofollow');
const TA='INSTRUMENT A · 15M', TB='INSTRUMENT B · 15M';
const vl=(p,inn)=>[O.vline(p.l1,'SWING 1','neutral',{in:inn,size:12}),O.vline(p.l2,'SWING 2','neutral',{in:inn,size:12})];

const quiz={
 questions:[
  {q:'In the bullish case study, what exactly is the “discrepancy” that defines SMT?',a:'At the same swing (same time), Instrument A trades below its prior low while Instrument B stays above its prior low.',why:'The comparison is swing-to-swing at the same time on both charts.'},
  {q:'Both instruments make lower lows at swing 2. Is there SMT? What does it suggest?',a:'No SMT; both confirm the bearish move, suggesting continuation is at least as likely as reversal.',why:'Agreement between related instruments is the normal state; only disagreement is SMT.'},
  {q:'Why are SMT readings less reliable between weakly correlated instruments?',a:'Their swings often diverge for unrelated reasons, so a divergence carries little information.',why:'SMT assumes the instruments would normally confirm each other.'},
  {q:'Give an example of a news-driven divergence.',a:'A data release affecting one market more than the other (e.g. country-specific data or a commodity-specific report) makes one instrument move alone.',why:'Such divergences reflect different fundamental shocks rather than hidden strength or weakness.'},
  {q:'An SMT forms but both instruments then continue lower. What went wrong in the analysis, if anything?',a:'Possibly nothing: SMT is a warning, not a signal. Without structure confirmation, the correct stance was to wait.',why:'Divergence that does not lead to reversal is normal; the error would be acting without confirmation.'}],
 charts:[{prompt:'Recreate the eight-step bullish case on a real pair of your choice. Record the timestamps of swing 1 and swing 2 on both charts.',answer:'Timestamps must match; otherwise the comparison is not synchronised.'},
         {prompt:'Find a divergence on your pair that did not lead to a reversal. Describe the subsequent structure.',answer:'Typically no MSS forms on A, and both instruments resume the original direction.'}],
 practical:{task:'Over twenty sessions, log every SMT you see on one pair: type, timeframe, PD-array context, confirmation (yes/no), and outcome.',guide:'The log should include divergences without confirmation and without reversal — they are part of the evidence.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 11 · LEVEL 7 · SUBTOPIC 7.6 (EXTENDED)',title:'Bullish & Bearish SMT Divergence',subtitle:'Synchronised case studies · Alternatives · Market conditions',objIn:1,
   objectives:['Walk through an eight-step bullish SMT case','Walk through an eight-step bearish SMT case','Compare each with its failed alternative','Judge SMT reliability under different conditions']}],
  cues:[cue('Welcome to Episode Eleven, an extended lesson on S M T Divergence.','Selamat datang ke Episod 11, pelajaran lanjutan tentang SMT Divergence.'),
        cue('We will walk through bullish and bearish case studies step by step, compare each with an alternative where S M T fails, and then look at market conditions that change its reliability.','Kita akan meneliti kajian kes bullish dan bearish langkah demi langkah, membandingkan setiap satu dengan alternatif di mana SMT gagal, dan kemudian melihat keadaan pasaran yang mengubah kebolehpercayaannya.')]},

 {label:'SCENE 2 · 7.6 · BULLISH CASE STUDY',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'INSTRUMENT A',tagColor:'blue',candles:P.A,padR:2,reveal:[[0,P.l2-2],[2,P.l2+1],[6,P.n]],
    overlays:[...vl(P,4),O.mark(P.l1,'l','PREV LOW','blue',{in:0,swing:true,lsize:14}),O.level(P.A[P.l1][2],'','yellow',{i0:P.l1,in:0}),O.sweep(P.l2,'low',P.A[P.l1][2],'LOWER LOW','blue',{in:2,level:P.A[P.l1][2]}),
      O.text(P.l2,'l','BULLISH SMT?','pink',{in:5,dy:62,size:15}),O.bos(P.hA,22,'h','MSS · CONFIRMATION','green','up',{in:6})],
    checks:[{lowerLow:[P.l1,P.l2]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'INSTRUMENT B',tagColor:'pink',candles:P.B,padR:2,reveal:[[1,P.l2-2],[3,P.l2+1],[6,P.n]],
    overlays:[...vl(P,4),O.mark(P.l1,'l','PREV LOW','pink',{in:1,swing:true,lsize:14}),O.level(P.B[P.l1][2],'','yellow',{i0:P.l1,in:1}),O.mark(P.l2,'l','HIGHER LOW','pink',{in:3,swing:true,lsize:14})],
    checks:[{higherLow:[P.l1,P.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:7,text:'Steps 1–7 above · Step 8: the alternative where both instruments continue lower (next scene).'}],
  cues:[cue('Step one: Instrument A approaches its previous low.','Langkah satu: Instrumen A menghampiri low sebelumnya.'),
        cue('Step two: Instrument B approaches its corresponding previous low, at the same time.','Langkah dua: Instrumen B menghampiri low sebelumnya yang sepadan, pada masa yang sama.'),
        cue('Step three: Instrument A trades below its previous low, a lower low.','Langkah tiga: Instrumen A didagangkan di bawah low sebelumnya, iaitu lower low.'),
        cue('Step four: Instrument B does not make a corresponding lower low. It holds above.','Langkah empat: Instrumen B tidak membuat lower low yang sepadan. Ia bertahan di atas.'),
        cue('Step five: highlight the discrepancy. The vertical lines show the same two swings, at the same times, on both charts.','Langkah lima: tonjolkan percanggahan tersebut. Garisan menegak menunjukkan dua swing yang sama, pada masa yang sama, pada kedua-dua carta.'),
        cue('Step six: label it a potential bullish S M T divergence. Potential, because nothing is confirmed yet.','Langkah enam: labelkan sebagai potensi SMT divergence bullish. Potensi, kerana belum ada yang disahkan.'),
        cue('Step seven: confirmation appears in Instrument A, as price closes above the last lower high.','Langkah tujuh: pengesahan muncul pada Instrumen A, apabila harga ditutup di atas lower high terakhir.'),
        cue('Step eight is the alternative, and it deserves its own look.','Langkah lapan ialah alternatifnya, dan ia wajar diteliti secara berasingan.')]},

 {label:'SCENE 3 · 7.6 · BULLISH ALTERNATIVE',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'A · LOWER LOW',tagColor:'blue',candles:PF.A,padR:2,reveal:[[0,PF.n]],overlays:[O.level(PF.A[PF.l1][2],'PREV LOW','yellow',{i0:PF.l1,size:12,below:true}),O.vline(PF.l2,'','neutral')],checks:[{lowerLow:[PF.l1,PF.l2]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'B · ALSO LOWER LOW',tagColor:'pink',candles:PF.B,padR:2,reveal:[[0,PF.n]],overlays:[O.level(PF.B[PF.l1][2],'PREV LOW','yellow',{i0:PF.l1,size:12,below:true}),O.vline(PF.l2,'','neutral')],checks:[{lowerLow:[PF.l1,PF.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:2,text:'Both confirm the decline → **no SMT** · continuation is the simpler reading.'}],
  cues:[cue('Here is the alternative. Both instruments trade below their previous lows.','Ini alternatifnya. Kedua-dua instrumen didagangkan di bawah low sebelumnya.'),
        cue('There is no disagreement, so there is no S M T, and both continue lower.','Tiada percanggahan, jadi tiada SMT, dan kedua-duanya terus turun.'),
        cue('When related instruments confirm each other, continuation is the simpler reading.','Apabila instrumen berkaitan saling mengesahkan, kesinambungan ialah bacaan yang lebih mudah.')]},

 {label:'SCENE 4 · 7.6 · BEARISH CASE STUDY',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'INSTRUMENT A',tagColor:'blue',candles:Q.A,padR:2,reveal:[[0,Q.l2-2],[2,Q.l2+1],[6,Q.n]],
    overlays:[...vl(Q,4),O.mark(Q.l1,'h','PREV HIGH','blue',{in:0,swing:true,lsize:14}),O.level(Q.A[Q.l1][1],'','yellow',{i0:Q.l1,in:0}),O.sweep(Q.l2,'high',Q.A[Q.l1][1],'HIGHER HIGH','blue',{in:2,level:Q.A[Q.l1][1]}),
      O.text(Q.l2,'h','BEARISH SMT?','pink',{in:5,dy:-50,size:15}),O.bos(Q.hA,22,'l','MSS · CONFIRMATION','red','down',{in:6,below:true})],
    checks:[{higherHigh:[Q.l1,Q.l2]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'INSTRUMENT B',tagColor:'pink',candles:Q.B,padR:2,reveal:[[1,Q.l2-2],[3,Q.l2+1],[6,Q.n]],
    overlays:[...vl(Q,4),O.mark(Q.l1,'h','PREV HIGH','pink',{in:1,swing:true,lsize:14}),O.level(Q.B[Q.l1][1],'','yellow',{i0:Q.l1,in:1}),O.mark(Q.l2,'h','LOWER HIGH','pink',{in:3,swing:true,lsize:14})],
    checks:[{lowerHigh:[Q.l1,Q.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:7,text:'Alternative: both make higher highs and continue up — no SMT.'}],
  cues:[cue('The bearish case. Step one: Instrument A approaches its previous high.','Kes bearish. Langkah satu: Instrumen A menghampiri high sebelumnya.'),
        cue('Step two: Instrument B approaches its corresponding previous high.','Langkah dua: Instrumen B menghampiri high sebelumnya yang sepadan.'),
        cue('Step three: Instrument A trades above its previous high.','Langkah tiga: Instrumen A didagangkan di atas high sebelumnya.'),
        cue('Step four: Instrument B fails to make a corresponding higher high.','Langkah empat: Instrumen B gagal membuat higher high yang sepadan.'),
        cue('Step five: the discrepancy is marked at the same swings on both charts.','Langkah lima: percanggahan ditandakan pada swing yang sama di kedua-dua carta.'),
        cue('Step six: potential bearish S M T divergence.','Langkah enam: potensi SMT divergence bearish.'),
        cue('Step seven: confirmation in Instrument A, a close below the last higher low.','Langkah tujuh: pengesahan pada Instrumen A, penutupan di bawah higher low terakhir.'),
        cue('Step eight: the alternative, where both instruments make higher highs and continue higher. No S M T.','Langkah lapan: alternatifnya, di mana kedua-dua instrumen membuat higher high dan terus naik. Tiada SMT.')]},

 {label:'SCENE 5 · 7.6 · BEARISH ALTERNATIVE',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'A · HIGHER HIGH',tagColor:'blue',candles:QF.A,padR:2,reveal:[[0,QF.n]],overlays:[O.level(QF.A[QF.l1][1],'PREV HIGH','yellow',{i0:QF.l1,size:12}),O.vline(QF.l2,'','neutral')],checks:[{higherHigh:[QF.l1,QF.l2]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'B · ALSO HIGHER HIGH',tagColor:'pink',candles:QF.B,padR:2,reveal:[[0,QF.n]],overlays:[O.level(QF.B[QF.l1][1],'PREV HIGH','yellow',{i0:QF.l1,size:12}),O.vline(QF.l2,'','neutral')],checks:[{higherHigh:[QF.l1,QF.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:1,text:'Agreement = no SMT. Do not search for a divergence that is not there.'}],
  cues:[cue('In the bearish alternative, both instruments break their previous highs together.','Dalam alternatif bearish, kedua-dua instrumen memecah high sebelumnya bersama-sama.'),
        cue('Agreement means no S M T. Do not search for a divergence that is not there.','Persetujuan bermakna tiada SMT. Jangan cari divergence yang tidak wujud.')]},

 {label:'SCENE 6 · 7.6 · MARKET CONDITIONS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.6 · RELIABILITY',title:'SMT under different market conditions'},
   {type:'table',slot:'main',cols:['Condition','Effect on SMT reliability'],widths:['34%','66%'],size:23,rows:[
     {cells:['Strongly correlated instruments','Divergence is unusual → more informative'],in:0,color:'green'},
     {cells:['Weakly correlated instruments','Divergence is common → little information'],in:1,color:'red'},
     {cells:['Changing correlation','Yesterday’s relationship may not hold today — recheck'],in:2,color:'amber'},
     {cells:['Different session hours','One instrument may be closed or thin → false divergence'],in:3,color:'amber'},
     {cells:['News-driven divergence','A shock hits one instrument more → fundamental, not hidden strength'],in:4,color:'amber'},
     {cells:['Temporary divergence','Resolves quickly without consequence'],in:5,color:'neutral'}]}],
  cues:[cue('S M T reliability depends on conditions. Between strongly correlated instruments, divergence is unusual, so it carries more information.','Kebolehpercayaan SMT bergantung pada keadaan. Antara instrumen yang berkorelasi kuat, divergence jarang berlaku, jadi ia membawa lebih banyak maklumat.'),
        cue('Between weakly correlated instruments, divergence is common, so it tells you little.','Antara instrumen yang berkorelasi lemah, divergence kerap berlaku, jadi ia memberitahu sedikit.'),
        cue('Correlations change over time. Yesterday’s relationship may not hold today, so recheck it.','Korelasi berubah mengikut masa. Hubungan semalam mungkin tidak bertahan hari ini, jadi semak semula.'),
        cue('Different session hours can produce false divergences, when one instrument is closed or thinly traded.','Waktu sesi yang berbeza boleh menghasilkan divergence palsu, apabila satu instrumen ditutup atau didagangkan secara nipis.'),
        cue('News can hit one instrument harder than the other. That divergence is fundamental, not hidden strength.','Berita boleh menjejaskan satu instrumen lebih teruk daripada yang lain. Divergence itu bersifat fundamental, bukan kekuatan tersembunyi.'),
        cue('And some divergences are temporary, resolving quickly without consequence.','Dan sesetengah divergence bersifat sementara, selesai dengan cepat tanpa kesan.')]},

 {label:'SCENE 7 · 7.6 · DIVERGENCE WITHOUT REVERSAL',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TA,note:false,tag:'A · LOWER LOW · THEN LOWER',tagColor:'blue',candles:NF.A,padR:2,reveal:[[0,NF.l2+1],[1,NF.n]],overlays:[O.level(NF.A[NF.l1][2],'PREV LOW','yellow',{i0:NF.l1,size:12,below:true}),O.vline(NF.l2,'SMT','pink',{size:12}),O.level(NF.A[NF.hA][1],'NO MSS','red',{i0:NF.hA,size:12,in:1})],
    checks:[{lowerLow:[NF.l1,NF.l2]},{noCloseAbove:[NF.l2,NF.n-1,NF.A[NF.hA][1]]}]},
   {type:'chart',slot:'right',compact:true,title:TB,note:false,tag:'B · HIGHER LOW · THEN LOWER',tagColor:'pink',candles:NF.B,padR:2,reveal:[[0,NF.l2+1],[1,NF.n]],overlays:[O.level(NF.B[NF.l1][2],'PREV LOW','yellow',{i0:NF.l1,size:12,below:true}),O.vline(NF.l2,'SMT','pink',{size:12})],
    checks:[{higherLow:[NF.l1,NF.l2]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:2,text:'A real divergence — and no reversal. That is why confirmation on A matters.'}],
  cues:[cue('Finally, a divergence that does not lead to a reversal. A makes a lower low while B holds a higher low: a genuine bullish S M T.','Akhir sekali, divergence yang tidak membawa kepada pembalikan. A membuat lower low manakala B mengekalkan higher low: SMT bullish yang tulen.'),
        cue('But A never shifts structure. Both instruments resume falling, and B eventually breaks its low too.','Tetapi A tidak pernah mengalihkan struktur. Kedua-dua instrumen kembali jatuh, dan B akhirnya memecah low-nya juga.'),
        cue('A real divergence, and no reversal. That is exactly why confirmation on A matters, and why S M T interpretation weakens when the relationship is unstable.','Divergence yang sebenar, dan tiada pembalikan. Itulah sebabnya pengesahan pada A penting, dan mengapa tafsiran SMT menjadi lemah apabila hubungan tidak stabil.')]},

 {label:'SCENE 8 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'SMT case studies — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Eight steps: approach, approach, break, fail, highlight, label, confirm, alternative',in:0},{text:'Agreement = no SMT',in:0},
     {text:'Reliability depends on correlation strength and stability',in:1},{text:'Session hours and news can create false divergence',in:1},
     {text:'Divergence without confirmation is only a warning',in:2}]}],
  cues:[cue('To summarise. Use the eight steps, and always look at the alternative. Agreement means no S M T.','Sebagai rumusan. Gunakan lapan langkah tersebut, dan sentiasa lihat alternatifnya. Persetujuan bermakna tiada SMT.'),
        cue('Reliability depends on how strong and stable the relationship is. Session hours and news can create false divergences.','Kebolehpercayaan bergantung pada kekuatan dan kestabilan hubungan. Waktu sesi dan berita boleh mencipta divergence palsu.'),
        cue('And a divergence without confirmation is only a warning.','Dan divergence tanpa pengesahan hanyalah amaran.')]},
 ...quizScenes(11,quiz,9),
 disclaimer('Next: Episode 12 — Advanced SMT Application and Limitations','SCENE 12 · DISCLAIMER'),
];
module.exports={meta:meta(11,'Bullish and Bearish SMT Divergence'),scenes,quiz};
