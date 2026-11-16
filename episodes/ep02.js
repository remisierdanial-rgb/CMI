// EPISODE 02 — BULLISH AND BEARISH PO3 MODELS (extended lesson, Subtopic 7.1)
'use strict';
const {meta,mirror,po3,disclaimer,quizScenes,O,cue}=require('./_lib');
const M='MODEL CHART · INTRADAY', N='ILLUSTRATIVE SCENARIO';
const OP=4268; const B=po3(OP,11,'ok'); const cs=B.cs, E=B.end;
const B2=po3(OP,21,'ok'); const BR=mirror(B2.cs,OP);
const F1=po3(OP,5,'continue'), F2=po3(OP,6,'breakout'), F3=po3(OP,7,'flat'), F4=po3(OP,8,'return'), F5=po3(OP,9,'both');
const bands=(e,inA,bear)=>[O.band(0,13,'ACCUMULATION','blue',{in:inA,back:true}),O.band(14,18,'MANIPULATION','amber',{in:inA,back:true}),O.band(19,e,'DISTRIBUTION',bear?'red':'green',{in:inA,back:true})];
const EQ=Math.round(((OP-38)+(OP+84))/2);

const quiz={
 questions:[
  {q:'List the elements that make a bullish PO3 illustration "complete".',a:'Open → range → sweep of sell-side liquidity → reclaim → bullish displacement → BOS/MSS → expansion toward buy-side liquidity.',why:'Each element is evidence. Missing reclaim, displacement or structure shift means the sequence is incomplete.'},
  {q:'Price sweeps the range low and keeps falling. What should you conclude?',a:'The bullish PO3 interpretation failed; the sweep was a breakdown, not manipulation.',why:'Without a reclaim and displacement there is no evidence of a reversal. Re-assess structure and bias instead of averaging into the idea.'},
  {q:'Why is an order block or FVG not a mandatory condition for every PO3?',a:'They add context and confluence, but the PO3 sequence can occur without them.',why:'Making every factor mandatory turns a framework into a rigid checklist and causes missed or forced readings.'},
  {q:'In the illustrated bullish case, where did accumulation and manipulation sit inside the larger dealing range?',a:'In discount — below the equilibrium of the range from the sweep low to the old high.',why:'Level 6: buying interest is usually studied in discount. Here it is context that supports, but does not prove, the bullish reading.'},
  {q:'What is the difference between a failed PO3 and a different structure?',a:'A failed PO3 starts the sequence but does not complete it; a different structure never resembled PO3 (e.g. clean breakout trend).',why:'Naming the difference stops you from relabelling every chart after the fact.'}],
 charts:[{prompt:'Find a bullish day on any instrument. Mark open, range, sweep, reclaim, displacement and MSS in order — write the candle time for each.',answer:'All six events should appear in chronological order; if any is missing, label the sequence incomplete.'},
         {prompt:'Find a session where price swept BOTH sides of the opening range. Explain why PO3 is a poor description of that session.',answer:'Two-sided sweeps without a sustained expansion show rotation/expansion of range rather than a single manipulation leg.'}],
 practical:{task:'On a bearish day, mark the bearish PO3 and add Level 2–6 context: structure, liquidity, order block, FVG and premium/discount. State which factors were present and which were absent.',guide:'A strong answer distinguishes confluence present from confluence absent and avoids calling absent factors “hidden”.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 02 · LEVEL 7 · SUBTOPIC 7.1 (EXTENDED)',title:'Bullish & Bearish PO3 Models',subtitle:'Complete cases · Failed models · Links to Levels 2–6',objIn:1,
   objectives:['Walk through a complete bullish and bearish PO3 case','Separate a valid illustration from an incomplete formation','Recognise five ways PO3 fails','Use Levels 2–6 as context — not as mandatory rules'],
   side:{type:'chart',bare:true,axis:false,candles:BR,padR:1,reveal:[[0,BR.length]],overlays:[O.level(OP,'OPEN','gold',{in:0,size:13})]}}],
  cues:[cue('Welcome to Episode Two. This is an extended lesson under subtopic seven point one, the Power of Three.','Selamat datang ke Episod 2. Ini ialah pelajaran lanjutan di bawah subtopik 7.1, Power of Three.'),
        cue('We will work through a complete bullish case and a complete bearish case, then study five ways the model fails.','Kita akan teliti satu kes bullish lengkap dan satu kes bearish lengkap, kemudian kaji lima cara model ini gagal.'),
        cue('Finally, we connect P O 3 with what you learned in Levels Two to Six.','Akhir sekali, kita kaitkan PO3 dengan apa yang anda pelajari dalam Level 2 hingga 6.')]},

 {label:'SCENE 2 · 7.1 · BULLISH CASE',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'BULLISH PO3 · DETAILED CASE',tagColor:'green',candles:cs,reveal:[[1,14],[3,18],[3,19,{per:0.3}],[4,20],[5,22],[7,cs.length-2],[8,cs.length]],
    overlays:[O.level(OP,'DAILY OPEN 4,268','gold',{in:0,lpos:'left'}),
      O.level(B.hi,'RANGE HIGH','neutral',{i0:0,i1:13,in:1,size:13}),O.level(B.lo,'RANGE LOW · SSL','yellow',{i0:0,i1:18,in:2,below:true,size:13}),
      O.sweep(B.sweep,'low',B.lo,'SSL SWEEP','amber',{in:3,level:B.lo}),O.fvg(B.fvg,{in:5,i1:27}),
      O.bos(B.lh,21,'h','MSS','white','up',{in:6}),O.bos(13,23,B.hi,'BOS','white','up',{in:6,dy:0}),
      O.level(B.bsl,'BSL · OLD HIGH 4,352','yellow',{in:8,i0:12}),O.sweep(E-1,'high',B.bsl,'','yellow',{in:8,level:B.bsl}),...bands(E,9)],
    checks:[{maxHigh:[0,13,B.hi]},{minLow:[0,13,B.lo]},{sweepBelow:[B.sweep,B.lo]},{closeAbove:[B.disp,B.lo]},{closeAbove:[B.bos,B.hi]},{sweepAbove:[E-1,B.bsl]}]},
   {type:'notes',slot:'side',eyebrow:'7.1 · DETAILED CASE',title:'Read it in order',items:[
     {text:'Daily open — the anchor',in:0,size:22},{text:'Accumulation range; range low marked',in:1,size:22},{text:'Sell-side liquidity below the lows',in:2,size:22,color:'yellow'},
     {text:'Downward sweep — trades through',in:3,size:22,color:'amber'},{text:'Reclaim back into the range',in:4,size:22,color:'green'},{text:'Bullish displacement + FVG',in:5,size:22,color:'green'},
     {text:'MSS, then BOS of range high',in:6,size:22,color:'green'},{text:'Distribution toward buy-side liquidity',in:8,size:22,color:'yellow'}]}],
  cues:[cue('Here is the bullish case in full. We begin with the daily open at four thousand two hundred and sixty-eight.','Ini kes bullish secara penuh. Kita mulakan dengan daily open pada 4,268.'),
        cue('Price builds an accumulation range around the open. We mark the range high and the range low.','Harga membina range accumulation di sekitar harga pembukaan. Kita tandakan range high dan range low.'),
        cue('Two touches of the low leave equal lows. Sell-side liquidity is assumed to rest beneath them.','Dua sentuhan pada low meninggalkan equal lows. Sell-side liquidity diandaikan berada di bawahnya.'),
        cue('Then price drops, below the open and through the range low. The sweep is visible: the wick trades clearly beneath the level.','Kemudian harga jatuh, di bawah harga pembukaan dan melepasi range low. Sapuan itu jelas: sumbunya didagangkan di bawah paras tersebut.'),
        cue('Next comes the reclaim. A strong bullish candle closes back above the range low.','Seterusnya berlaku reclaim. Satu candle bullish yang kuat ditutup semula di atas range low.'),
        cue('Displacement follows, and the move leaves a bullish fair value gap.','Displacement menyusul, dan pergerakan itu meninggalkan bullish fair value gap.'),
        cue('Price closes above the last lower high, a market structure shift, and then above the range high, a break of structure.','Harga ditutup di atas lower high terakhir, iaitu market structure shift, dan kemudian di atas range high, iaitu break of structure.'),
        cue('Now the distribution phase. Price expands upward.','Kini fasa distribution. Harga berkembang ke atas.'),
        cue('It runs toward buy-side liquidity above the old high, and trades through it.','Ia bergerak ke arah buy-side liquidity di atas high lama, dan didagangkan melepasinya.'),
        cue('Every step is in order and each one is visible on the chart. That is what makes this a complete illustration.','Setiap langkah berlaku mengikut urutan dan setiap satu boleh dilihat pada carta. Itulah yang menjadikan ini ilustrasi yang lengkap.')]},

 {label:'SCENE 3 · 7.1 · VALID VS INCOMPLETE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.1 · QUALITY CONTROL',title:'Valid illustration vs incomplete formation'},
   {type:'cards',slot:'main',size:25,cards:[
     {title:'Complete model illustration',color:'green',in:0,h:520,items:[{text:'Clear reference: the open',icon:'check',in:[0,0.6]},{text:'Identifiable range boundaries',icon:'check',in:[0,1.2]},{text:'Sweep visibly trades through a level',icon:'check',in:1},{text:'Reclaim + displacement',icon:'check',in:[1,1]},{text:'Structure shift in the new direction',icon:'check',in:2},{text:'Expansion away from the range',icon:'check',in:[2,1]}]},
     {title:'Incomplete formation',color:'red',in:3,h:520,items:[{text:'No clear range — just trend',icon:'x',in:[3,0.6]},{text:'“Sweep” that never crosses the level',icon:'x',in:[3,1.2]},{text:'No reclaim — price stays outside',icon:'x',in:4},{text:'No displacement, no structure shift',icon:'x',in:[4,1]},{text:'Labels added only after the move',icon:'x',in:5}]}]}],
  cues:[cue('What separates a valid illustration from an incomplete formation? First, a clear reference, and identifiable range boundaries.','Apakah yang membezakan ilustrasi yang sah daripada formasi yang tidak lengkap? Pertama, rujukan yang jelas, dan sempadan range yang boleh dikenal pasti.'),
        cue('Second, a sweep that genuinely trades through the level, followed by a reclaim and displacement.','Kedua, sapuan yang benar-benar didagangkan melepasi paras, diikuti oleh reclaim dan displacement.'),
        cue('Third, a structure shift in the new direction, and expansion away from the range.','Ketiga, anjakan struktur ke arah baharu, dan pengembangan menjauhi range.'),
        cue('An incomplete formation is missing one or more of these. Perhaps there is no real range, or the so-called sweep never crossed the level.','Formasi yang tidak lengkap kekurangan satu atau lebih elemen ini. Mungkin tiada range sebenar, atau sapuan yang disebut itu tidak pernah melepasi paras.'),
        cue('Perhaps price never reclaims, or no displacement or structure shift appears.','Mungkin harga tidak pernah reclaim, atau tiada displacement atau anjakan struktur yang muncul.'),
        cue('And be honest about hindsight. Labels drawn only after the move are not analysis.','Dan jujurlah tentang hindsight. Label yang dilukis hanya selepas pergerakan berlaku bukanlah analisis.')]},

 {label:'SCENE 4 · 7.1 · BEARISH CASE',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'BEARISH PO3 · DETAILED CASE',tagColor:'red',candles:BR,reveal:[[1,14],[3,19],[4,20],[5,22],[7,BR.length]],
    overlays:[O.level(OP,'DAILY OPEN 4,268','gold',{in:0,lpos:'left'}),
      O.level(2*OP-B2.lo,'RANGE HIGH · BSL','yellow',{i0:0,i1:18,in:2,size:13}),O.level(2*OP-B2.hi,'RANGE LOW','neutral',{i0:0,i1:13,in:1,below:true,size:13}),
      O.sweep(B2.sweep,'high',2*OP-B2.lo,'BSL SWEEP','amber',{in:3,level:2*OP-B2.lo}),O.fvg(B2.fvg,{in:5,i1:27,bear:true}),
      O.bos(B2.lh,21,'l','MSS','white','down',{in:6,below:true}),O.bos(13,23,2*OP-B2.hi,'BOS','white','down',{in:6,below:true}),
      O.level(2*OP-B2.bsl,'SSL · OLD LOW 4,184','yellow',{in:7,i0:12,below:true}),O.sweep(B2.end-1,'low',2*OP-B2.bsl,'','yellow',{in:7,level:2*OP-B2.bsl}),...bands(B2.end,8,true)],
    checks:[{sweepAbove:[B2.sweep,2*OP-B2.lo]},{closeBelow:[B2.disp,2*OP-B2.lo]},{closeBelow:[B2.bos,2*OP-B2.hi]},{sweepBelow:[B2.end-1,2*OP-B2.bsl]}]},
   {type:'notes',slot:'side',eyebrow:'7.1 · DETAILED CASE',title:'The inverse sequence',items:[
     {text:'Daily open — the anchor',in:0,size:22},{text:'Accumulation range',in:1,size:22},{text:'Buy-side liquidity above the highs',in:2,size:22,color:'yellow'},
     {text:'Upward sweep — trades through',in:3,size:22,color:'amber'},{text:'Rejection back below the range high',in:4,size:22,color:'red'},{text:'Bearish displacement + FVG',in:5,size:22,color:'red'},
     {text:'MSS, then BOS of range low',in:6,size:22,color:'red'},{text:'Distribution toward sell-side liquidity',in:7,size:22,color:'yellow'}]}],
  cues:[cue('Now the bearish case. Same daily open, opposite sequence.','Kini kes bearish. Daily open yang sama, urutan bertentangan.'),
        cue('An accumulation range forms around the open.','Range accumulation terbentuk di sekitar harga pembukaan.'),
        cue('Equal highs at the top of the range suggest buy-side liquidity resting above.','Equal highs di bahagian atas range menunjukkan buy-side liquidity berada di atasnya.'),
        cue('Price rallies above the open and trades through the range high. That is the possible buy-side sweep.','Harga naik di atas harga pembukaan dan didagangkan melepasi range high. Itulah kemungkinan sapuan buy-side.'),
        cue('Price cannot hold. It is rejected and returns below the range high.','Harga tidak dapat bertahan. Ia ditolak dan kembali ke bawah range high.'),
        cue('Bearish displacement follows, leaving a bearish fair value gap.','Bearish displacement menyusul, meninggalkan bearish fair value gap.'),
        cue('A close below the last higher low gives a market structure shift, and a close below the range low confirms a break of structure.','Penutupan di bawah higher low terakhir memberi market structure shift, dan penutupan di bawah range low mengesahkan break of structure.'),
        cue('Distribution runs lower, toward sell-side liquidity beneath the old low.','Distribution bergerak lebih rendah, ke arah sell-side liquidity di bawah low lama.'),
        cue('Again, every element is visible, and in order.','Sekali lagi, setiap elemen boleh dilihat, dan mengikut urutan.')]},

 {label:'SCENE 5 · 7.1 · FAILED MODELS 1–2',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:M,note:false,tag:'1 · SWEEP, NO REVERSAL',tagColor:'red',candles:F1.cs,reveal:[[0,19],[1,F1.cs.length]],
    overlays:[O.level(OP,'OPEN','gold',{lpos:'left'}),O.level(F1.lo,'RANGE LOW','yellow',{below:true,size:13}),O.text(F1.end-2,'l','NO RECLAIM','red',{dy:30,in:1})],
    checks:[{noCloseAbove:[19,F1.end,F1.lo]}]},
   {type:'chart',slot:'right',compact:true,title:M,note:false,tag:'2 · BREAKOUT CONTINUES',tagColor:'red',candles:F2.cs,reveal:[[2,F2.cs.length]],
    overlays:[O.level(OP,'OPEN','gold',{lpos:'left',in:2}),O.level(F2.hi,'RANGE HIGH','yellow',{size:13,in:2}),O.text(F2.end-3,'h','NO FALSE MOVE','red',{dy:-16,in:3})],
    checks:[{noCloseBelow:[15,F2.end,F2.hi]}]},
   {type:'text',slot:'bottom',size:23,color:'grey',align:'center',in:4,text:'A sweep is only a **possible** manipulation until the reversal evidence appears.'}],
  cues:[cue('Failure one. Price sweeps the range low, but it never reclaims.','Kegagalan satu. Harga menyapu range low, tetapi tidak pernah reclaim.'),
        cue('It keeps closing below the level and falls further. The bullish reading was simply wrong. The sweep was a breakdown.','Ia terus ditutup di bawah paras itu dan jatuh lebih jauh. Tafsiran bullish itu salah. Sapuan tersebut sebenarnya breakdown.'),
        cue('Failure two. Price breaks out of the range and continues in the breakout direction.','Kegagalan dua. Harga keluar daripada range dan terus bergerak ke arah breakout tersebut.'),
        cue('There is no false move at all. Someone waiting for manipulation first would miss the move, or worse, trade against it.','Tiada pergerakan palsu langsung. Sesiapa yang menunggu manipulation dahulu akan terlepas pergerakan ini, atau lebih teruk, berdagang melawannya.'),
        cue('In both cases, the sweep or breakout was only a possible manipulation until reversal evidence appeared, and it never did.','Dalam kedua-dua kes, sapuan atau breakout itu hanyalah kemungkinan manipulation sehingga bukti pembalikan muncul, dan ia tidak pernah muncul.')]},

 {label:'SCENE 6 · 7.1 · FAILED MODELS 3–4',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:M,note:false,tag:'3 · NO DISTRIBUTION',tagColor:'amber',candles:F3.cs,reveal:[[0,F3.cs.length]],
    overlays:[O.level(OP,'OPEN','gold',{lpos:'left'}),O.level(F3.lo,'RANGE LOW','yellow',{below:true,size:13}),O.zone(OP-24,OP+6,20,F3.end,'STILL RANGING','amber',{in:1,alpha:0.08})]},
   {type:'chart',slot:'right',compact:true,title:M,note:false,tag:'4 · RETURNS TO THE RANGE',tagColor:'amber',candles:F4.cs,reveal:[[2,F4.cs.length]],
    overlays:[O.level(OP,'OPEN','gold',{lpos:'left',in:2}),O.zone(F4.lo,F4.hi,0,F4.end,'ORIGINAL RANGE','blue',{in:2,alpha:0.07}),O.text(F4.end-3,'h','BACK INSIDE','amber',{dy:-18,in:3})]},
   {type:'text',slot:'bottom',size:23,color:'grey',align:'center',in:4,text:'Range → sweep → nothing, or a pop that fades back: neither completes the model.'}],
  cues:[cue('Failure three. The sweep happens and price recovers a little, but it simply goes back to ranging.','Kegagalan tiga. Sapuan berlaku dan harga pulih sedikit, tetapi ia kembali bergerak dalam range.'),
        cue('There is no meaningful distribution phase. No expansion, no new structure.','Tiada fasa distribution yang bermakna. Tiada pengembangan, tiada struktur baharu.'),
        cue('Failure four. Price expands briefly, then falls back into the original range.','Kegagalan empat. Harga berkembang seketika, kemudian jatuh semula ke dalam range asal.'),
        cue('The early part looked like P O 3, but the expansion did not hold.','Bahagian awal kelihatan seperti PO3, tetapi pengembangan itu tidak bertahan.'),
        cue('In both cases, the sequence is incomplete. Manage the idea as failed, rather than stretching the labels to fit.','Dalam kedua-dua kes, urutannya tidak lengkap. Uruskan idea itu sebagai gagal, dan jangan regangkan label supaya kelihatan sesuai.')]},

 {label:'SCENE 7 · 7.1 · FAILED MODEL 5',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'5 · A DIFFERENT STRUCTURE',tagColor:'amber',candles:F5.cs,reveal:[[0,F5.cs.length]],
    overlays:[O.level(OP,'OPEN','gold',{lpos:'left'}),O.level(F5.hi,'RANGE HIGH','neutral',{size:13}),O.level(F5.lo,'RANGE LOW','neutral',{below:true,size:13}),
      O.sweep(F5.sweep,'low',F5.lo,'SWEPT LOW','amber',{in:1,level:F5.lo}),O.sweep(20,'high',F5.hi,'SWEPT HIGH','amber',{in:1,level:F5.hi})],
    checks:[{sweepBelow:[F5.sweep,F5.lo]},{sweepAbove:[20,F5.hi]}]},
   {type:'notes',slot:'side',eyebrow:'7.1 · DO NOT FORCE IT',title:'Why stop here?',items:[
     {text:'Both sides of the range were swept',in:1,color:'amber'},{text:'No sustained expansion in either direction',in:2,color:'amber'},
     {text:'This is range expansion / rotation — not PO3',in:3,color:'red'},{text:'Correct response: stand aside, re-read structure',in:4,color:'green'}]}],
  cues:[cue('Failure five: price forms a different structure altogether.','Kegagalan lima: harga membentuk struktur yang langsung berbeza.'),
        cue('Here it sweeps the range low, then sweeps the range high as well.','Di sini ia menyapu range low, kemudian menyapu range high juga.'),
        cue('Neither move is followed by a sustained expansion.','Kedua-dua pergerakan tidak diikuti oleh pengembangan yang berterusan.'),
        cue('This is a widening or rotating range, not a Power of Three sequence.','Ini ialah range yang melebar atau berputar, bukan urutan Power of Three.'),
        cue('The professional response is to stand aside and re-read the structure, instead of forcing a P O 3 label onto it.','Respons profesional ialah berdiri di tepi dan membaca semula struktur, bukannya memaksa label PO3 ke atasnya.')]},

 {label:'SCENE 8 · 7.1 · LINKS TO LEVELS 2–6',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.1 · INTEGRATION',title:'What earlier CMI levels add to a PO3 reading'},
   {type:'table',slot:'main',cols:['Level','Concept','What it adds to PO3'],widths:['14%','30%','56%'],size:23,rows:[
     {cells:['Level 2','Market Structure','Confirms the shift: MSS / BOS after the sweep'],in:0,color:'gold'},
     {cells:['Level 3','Liquidity','Locates the sweep (SSL/BSL, EQH/EQL) and the objective'],in:1,color:'yellow'},
     {cells:['Level 4','Institutional Price Zones','Order block near the manipulation extreme'],in:2,color:'blue'},
     {cells:['Level 5','Imbalance & Displacement','Displacement and FVG as evidence of the reversal'],in:3,color:'green'},
     {cells:['Level 6','Premium, Discount & PD Arrays','Was the manipulation in discount (bullish) or premium (bearish)?'],in:4,color:'purple'}]},
   {type:'callout',r:[120,600,1680,100],head:'Context, not conditions',color:'red',in:5,size:23,text:'These factors **support** an interpretation. They are **not** mandatory conditions for every PO3.'}],
  cues:[cue('Now let’s connect P O 3 with earlier levels. Level Two, market structure, confirms the shift after the sweep.','Sekarang mari kita kaitkan PO3 dengan level sebelumnya. Level 2, struktur pasaran, mengesahkan anjakan selepas sapuan.'),
        cue('Level Three, liquidity, tells us where the sweep happened and where the objective may be.','Level 3, liquidity, memberitahu di mana sapuan berlaku dan di mana objektifnya mungkin berada.'),
        cue('Level Four adds institutional price zones, such as an order block near the manipulation extreme.','Level 4 menambah zon harga institusi, seperti order block berhampiran ekstrem manipulation.'),
        cue('Level Five adds displacement and fair value gaps as evidence of a genuine reversal.','Level 5 menambah displacement dan fair value gap sebagai bukti pembalikan yang sebenar.'),
        cue('Level Six asks whether manipulation happened in discount for a bullish model, or premium for a bearish one.','Level 6 bertanya sama ada manipulation berlaku dalam discount bagi model bullish, atau premium bagi model bearish.'),
        cue('These factors support an interpretation. They are not mandatory conditions for every P O 3.','Faktor-faktor ini menyokong sesuatu tafsiran. Ia bukan syarat wajib bagi setiap PO3.')]},

 {label:'SCENE 9 · 7.1 · CONTEXT ON THE CHART',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'PO3 + LEVELS 2–6',tagColor:'gold',candles:cs,reveal:[[0,cs.length]],
    overlays:[O.level(OP,'OPEN','gold',{lpos:'left'}),
      O.zone(OP-38,EQ,0,E,'DISCOUNT','green',{in:4,alpha:0.06,stroke:false,lpos:'below'}),O.zone(EQ,OP+84,0,E,'PREMIUM','red',{in:4,alpha:0.06,stroke:false,lpos:'above'}),O.level(EQ,'EQUILIBRIUM 4,291','neutral',{in:4,size:13}),
      O.zone(cs[17][0],cs[17][3],17,27,'BULLISH OB','blue',{in:2,lpos:'below'}),O.fvg(B.fvg,{in:3,i1:27}),
      O.sweep(B.sweep,'low',B.lo,'SSL SWEEP','yellow',{in:1,level:B.lo}),O.bos(B.lh,21,'h','MSS','white','up',{in:0}),O.level(B.bsl,'BSL OBJECTIVE','yellow',{in:1,i0:12})],
    checks:[{bear:17},{bull:B.disp}]},
   {type:'notes',slot:'side',eyebrow:'INTEGRATION',title:'Same chart, five lenses',items:[
     {text:'L2 · MSS confirms the shift',in:0},{text:'L3 · SSL swept, BSL as objective',in:1,color:'yellow'},{text:'L4 · Last down-close candle = bullish OB',in:2,color:'blue'},
     {text:'L5 · Displacement leaves an FVG',in:3,color:'green'},{text:'L6 · Accumulation & sweep sat in discount',in:4,color:'purple'},{text:'Each adds context — none guarantees the move',in:5,color:'red'}]}],
  cues:[cue('Here is the bullish case with each lens added. Level Two: the market structure shift.','Ini kes bullish dengan setiap lensa ditambah. Level 2: market structure shift.'),
        cue('Level Three: the sell-side sweep, and the buy-side objective above.','Level 3: sapuan sell-side, dan objektif buy-side di atas.'),
        cue('Level Four: the last down-close candle before displacement, which Level Four defines as a bullish order block.','Level 4: candle down-close terakhir sebelum displacement, yang ditakrifkan dalam Level 4 sebagai bullish order block.'),
        cue('Level Five: the displacement and its fair value gap.','Level 5: displacement dan fair value gap yang terhasil.'),
        cue('Level Six: measured from the sweep low to the old high, the accumulation and the sweep both sat in discount, below equilibrium.','Level 6: diukur dari low sapuan ke high lama, accumulation dan sapuan kedua-duanya berada dalam discount, di bawah equilibrium.'),
        cue('Each lens adds context. None of them guarantees the move.','Setiap lensa menambah konteks. Tiada satu pun yang menjamin pergerakan itu.')]},

 {label:'SCENE 10 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Bullish & bearish PO3 — what to remember'},
   {type:'list',slot:'main',cols:2,size:27,items:[
     {text:'A complete model shows every step, in order',in:0},{text:'The sweep must visibly trade through the level',in:0},
     {text:'Reclaim + displacement + structure shift = evidence',in:1},{text:'Five failures: no reversal, breakout, no distribution, return, different structure',in:2},
     {text:'Levels 2–6 add context, not mandatory rules',in:3},{text:'If it is incomplete, do not force it',in:3}]}],
  cues:[cue('To summarise. A complete P O 3 shows every step in order, and the sweep must visibly trade through the level.','Sebagai rumusan. PO3 yang lengkap menunjukkan setiap langkah mengikut urutan, dan sapuan mesti jelas didagangkan melepasi paras.'),
        cue('Reclaim, displacement and a structure shift are your evidence.','Reclaim, displacement dan anjakan struktur ialah bukti anda.'),
        cue('We saw five failure types: no reversal, a clean breakout, no distribution, a return to the range, and a different structure.','Kita telah lihat lima jenis kegagalan: tiada pembalikan, breakout yang bersih, tiada distribution, kembali ke range, dan struktur yang berbeza.'),
        cue('Earlier levels add context, not mandatory rules. And if the sequence is incomplete, do not force it.','Level sebelumnya menambah konteks, bukan peraturan wajib. Dan jika urutan tidak lengkap, jangan memaksanya.')]},
 ...quizScenes(2,quiz,11),
 disclaimer('Next: Episode 03 — Accumulation, Manipulation and Distribution (AMD)','SCENE 14 · DISCLAIMER'),
];
module.exports={meta:meta(2,'Bullish and Bearish PO3 Models'),scenes,quiz};
