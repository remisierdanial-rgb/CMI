// EPISODE 03 — ACCUMULATION, MANIPULATION, DISTRIBUTION (Subtopic 7.2)
'use strict';
const {meta,mirror,amd,disclaimer,quizScenes,O,cue}=require('./_lib');
const M='MODEL CHART · INTRADAY', N='ILLUSTRATIVE SCENARIO';
const P=4180; const A=amd(P,4); const cs=A.cs, E=A.end;
const A2=amd(P,14); const BR=mirror(A2.cs,P); const m=x=>2*P-x;
const bands=(inA,inM,inD,bear,a)=>[O.band(a.r0,a.r1,'ACCUMULATION','blue',{in:inA,back:true}),O.band(a.r1+1,a.sweep,'MANIPULATION','amber',{in:inM,back:true}),O.band(a.disp,a.end,'DISTRIBUTION',bear?'red':'green',{in:inD,back:true})];

const quiz={
 questions:[
  {q:'How does the focus of AMD differ from the focus of PO3?',a:'PO3 anchors the sequence to the opening price of a period; AMD studies the behaviour inside each phase and the transitions between them.',why:'They describe the same three-phase idea from different angles. Keeping the focus separate avoids treating them as two different signals for the same thing.'},
  {q:'Give three observable characteristics of an accumulation phase.',a:'Sideways price, repeated highs/lows inside clear boundaries, reduced directional progress (also: possible EQH/EQL).',why:'These are observable facts. Whether participants were “accumulating” is an interpretation.'},
  {q:'Is every consolidation range institutional accumulation?',a:'No. Ranges form for many reasons (low participation, waiting for news, balance of orders).',why:'CMI treats “accumulation” as a phase label in a model, not a claim about who was buying.'},
  {q:'What is the difference between a Wyckoff Spring and an AMD manipulation?',a:'A Spring is a specific event inside Wyckoff’s phased accumulation schematic; AMD manipulation is a general ICT label for a false move/liquidity sweep before expansion.',why:'They can look similar on a chart, but each sits in a different framework with different supporting evidence (e.g. Wyckoff volume/effort analysis).'},
  {q:'After a sweep and reclaim, what evidence would you want before calling the distribution phase?',a:'Displacement, a structure shift (MSS/BOS) and price moving away from the range toward external liquidity.',why:'Without expansion, a reclaim can simply return price to the middle of the range.'}],
 charts:[{prompt:'Mark a consolidation range and label EQH or EQL only where two or more highs/lows are genuinely equal (within one or two ticks).',answer:'EQH/EQL should be drawn only where the extremes match closely; approximate “double tops” far apart are not equal highs.'},
         {prompt:'Find a range that broke out and never returned. Explain why it is not an AMD manipulation.',answer:'No reclaim into the range and no reversal displacement: the breakout was continuation.'}],
 practical:{task:'Draw an AMD vs Wyckoff comparison for one range you have marked: list what each framework would label, and what evidence each would need.',guide:'AMD: range, sweep, reclaim, displacement, expansion. Wyckoff: phases A–E, Spring/Upthrust, volume and effort-vs-result. Note where the labels disagree.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 03 · LEVEL 7 · SUBTOPIC 7.2',title:'Accumulation, Manipulation, Distribution',subtitle:'AMD phases · Transitions · AMD vs Wyckoff',objIn:2,
   objectives:['Understand AMD as a price-behaviour framework','Recognise each phase and the transition between phases','Build bullish and bearish AMD models','Distinguish AMD from Wyckoff accumulation and distribution'],
   side:{type:'chart',bare:true,axis:false,candles:cs,padR:1,reveal:[[0,cs.length]],overlays:bands(1,1,1,false,A).map(b=>Object.assign(b,{label:null}))}}],
  cues:[cue('Welcome to Episode Three, subtopic seven point two: Accumulation, Manipulation and Distribution, or A M D.','Selamat datang ke Episod 3, subtopik 7.2: Accumulation, Manipulation dan Distribution, atau AMD.'),
        cue('In Episode One we used these three words inside the Power of Three. Now we study the phases themselves.','Dalam Episod 1, kita menggunakan tiga perkataan ini dalam Power of Three. Kini kita kaji fasa-fasa itu sendiri.'),
        cue('You will learn what each phase looks like, how traders read the transitions, and how A M D differs from Wyckoff.','Anda akan belajar rupa setiap fasa, cara trader membaca peralihan antara fasa, dan bagaimana AMD berbeza daripada Wyckoff.')]},

 {label:'SCENE 2 · 7.2 · WHAT IS AMD',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.2 · DEFINITION',title:'AMD — a price-behaviour framework'},
   {type:'callout',slot:'left',h:300,head:'CMI definition',color:'gold',in:0,size:26,text:'**AMD** describes three phases of price behaviour around a range: **accumulation** (contained range), **manipulation** (a false move or liquidity sweep beyond a boundary) and **distribution** (directional expansion).'},
   {type:'list',slot:'right',icon:'dot',size:25,items:[
     {text:'Used in ICT / SMC education to read how ranges resolve',in:1,color:'blue'},
     {text:'Traders study liquidity resting **around** the range',in:2,color:'yellow'},
     {text:'**Not** a simple breakout pattern: it expects a false move first',in:3,color:'amber'},
     {text:'A framework — phases may be messy, partial, or absent',in:4,color:'red'}]},
   {type:'table',r:[120,500,810,0],cols:['','PO3','AMD'],size:21,in:5,rows:[
     {cells:['Anchor','Opening price of a period','The range itself'],in:5},{cells:['Question','How is this period delivered?','What is each phase doing?'],in:6}]}],
  cues:[cue('A M D describes three phases of price behaviour around a range: a contained range, a false move beyond a boundary, and a directional expansion.','AMD menerangkan tiga fasa tingkah laku harga di sekitar range: range yang terkawal, pergerakan palsu melepasi sempadan, dan pengembangan berarah.'),
        cue('It is widely used in I C T and S M C education to read how ranges resolve.','Ia digunakan secara meluas dalam pendidikan ICT dan SMC untuk membaca cara sesuatu range diselesaikan.'),
        cue('Traders study ranges because liquidity tends to rest around their obvious highs and lows.','Trader mengkaji range kerana liquidity cenderung berada di sekitar high dan low yang jelas.'),
        cue('That is the key difference from a simple breakout pattern. A M D expects the first break to be a false move.','Itulah perbezaan utama berbanding corak breakout biasa. AMD menjangkakan pecahan pertama sebagai pergerakan palsu.'),
        cue('And because it is a conceptual framework, the market does not have to complete all three phases neatly, or at all.','Dan kerana ia rangka kerja konseptual, pasaran tidak perlu melengkapkan ketiga-tiga fasa dengan kemas, atau langsung.'),
        cue('How does A M D relate to P O 3? P O 3 anchors the sequence to the opening price of a period.','Bagaimana AMD berkait dengan PO3? PO3 menambat urutan kepada opening price bagi sesuatu tempoh.'),
        cue('A M D focuses on the behaviour within each phase, and on the transitions between them.','AMD pula fokus pada tingkah laku dalam setiap fasa, dan pada peralihan di antaranya.')]},

 {label:'SCENE 3 · 7.2 · ACCUMULATION PHASE',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'PHASE 1 · ACCUMULATION',tagColor:'blue',candles:cs.slice(0,A.r1+1),padR:8,reveal:[[0,A.r0],[0,A.r1+1]],
    overlays:[O.level(A.hi,'RANGE HIGH','neutral',{i0:A.r0,in:1,size:13}),O.level(A.lo,'RANGE LOW','neutral',{i0:A.r0,in:1,below:true,size:13}),
      O.mark(A.eqh[0],'h','','yellow',{in:2,price:false}),O.mark(A.eqh[1],'h','EQH','yellow',{in:2,price:false}),
      O.mark(A.eql[0],'l','','yellow',{in:2,price:false}),O.mark(A.eql[1],'l','EQL','yellow',{in:2,price:false}),
      O.zone(A.hi,A.hi+10,A.r0,A.r1+7,'BUY-SIDE LIQUIDITY?','yellow',{in:3,alpha:0.1,lpos:'right'}),O.zone(A.lo-10,A.lo,A.r0,A.r1+7,'SELL-SIDE LIQUIDITY?','yellow',{in:3,alpha:0.1,lpos:'right'})],
    checks:[{maxHigh:[A.r0,A.r1,A.hi]},{minLow:[A.r0,A.r1,A.lo]},{eqHigh:[A.eqh[0],A.eqh[1],1]},{eqLow:[A.eql[0],A.eql[1],1]}]},
   {type:'notes',slot:'side',eyebrow:'7.2 · ACCUMULATION',title:'What you can observe',items:[
     {text:'Price enters consolidation after a move',in:0,color:'blue'},{text:'Sideways action, reduced directional progress',in:0,color:'blue'},
     {text:'Range high and range low become clear',in:1,color:'neutral'},{text:'EQH / EQL — only where genuinely equal',in:2,color:'yellow'},
     {text:'Potential liquidity above and below the range',in:3,color:'yellow'},{text:'Not proof of institutional buying',in:5,color:'red'}]}],
  cues:[cue('Phase one, accumulation. After a decline, price enters consolidation. Directional progress slows, and price moves sideways.','Fasa satu, accumulation. Selepas penurunan, harga memasuki konsolidasi. Pergerakan berarah menjadi perlahan, dan harga bergerak mendatar.'),
        cue('Repeated highs and lows define the range boundaries: the range high and the range low.','High dan low yang berulang menentukan sempadan range: range high dan range low.'),
        cue('Where two highs or two lows are genuinely equal, we mark equal highs and equal lows. Here they match to the tick.','Di mana dua high atau dua low benar-benar sama, kita tandakan equal highs dan equal lows. Di sini ia sepadan hingga ke tick.'),
        cue('Potential liquidity sits above the range and below it: buy stops above, sell stops below.','Liquidity yang berpotensi berada di atas dan di bawah range: buy stop di atas, sell stop di bawah.'),
        cue('Inside the range, price fluctuates internally. Those internal swings are not yet the main event.','Di dalam range, harga berayun secara dalaman. Ayunan dalaman itu belum lagi peristiwa utama.'),
        cue('One caution. A range is an observation. Calling it institutional accumulation is an interpretation that a chart alone cannot prove.','Satu peringatan. Range ialah pemerhatian. Menggelarnya accumulation institusi ialah tafsiran yang tidak boleh dibuktikan oleh carta semata-mata.')]},

 {label:'SCENE 4 · 7.2 · MANIPULATION PHASE',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:M,note:false,tag:'BULLISH CONTEXT · SWEEP BELOW',tagColor:'green',candles:cs.slice(0,A.disp+2),padR:3,reveal:[[0,A.r1+1],[1,A.sweep+1],[2,A.disp+2]],
    overlays:[O.level(A.lo,'RANGE LOW','yellow',{i0:A.r0,below:true,size:13}),O.text(A.ind,'h','INDUCEMENT?','purple',{dy:-14,in:3,size:13}),O.sweep(A.sweep,'low',A.lo,'SWEEP','amber',{in:1,level:A.lo}),O.text(A.disp,'h','RECLAIM','green',{dy:-14,in:2,size:13})],
    checks:[{sweepBelow:[A.sweep,A.lo]},{closeAbove:[A.disp,A.lo]}]},
   {type:'chart',slot:'right',compact:true,title:M,note:false,tag:'BEARISH CONTEXT · SWEEP ABOVE',tagColor:'red',candles:BR.slice(0,A2.disp+2),padR:3,reveal:[[4,A2.r1+1],[4,A2.disp+2]],
    overlays:[O.level(m(A2.lo),'RANGE HIGH','yellow',{i0:A2.r0,size:13,in:4}),O.sweep(A2.sweep,'high',m(A2.lo),'SWEEP','amber',{in:4,level:m(A2.lo)}),O.text(A2.disp,'l','REJECTION','red',{dy:28,in:4,size:13})],
    checks:[{sweepAbove:[A2.sweep,m(A2.lo)]},{closeBelow:[A2.disp,m(A2.lo)]}]},
   {type:'text',slot:'bottom',size:23,color:'grey',align:'center',in:5,text:'Manipulation = an ICT label for a false move. It is **not** evidence of illegal or coordinated market manipulation.'}],
  cues:[cue('Phase two, manipulation. In a bullish context, price breaks below the range boundary.','Fasa dua, manipulation. Dalam konteks bullish, harga memecah ke bawah sempadan range.'),
        cue('It trades through the range low and the equal lows, sweeping the sell-side liquidity beneath them.','Ia didagangkan melepasi range low dan equal lows, menyapu sell-side liquidity di bawahnya.'),
        cue('Then it rejects and returns into the range. Traders call this a false breakout.','Kemudian ia ditolak dan kembali ke dalam range. Trader menggelarnya false breakout.'),
        cue('Notice the first, shallow break. Smart money traders often call this kind of early, obvious liquidity inducement: it tempts breakout sellers before the deeper sweep.','Perhatikan pecahan pertama yang cetek. Trader smart money sering menggelar liquidity awal yang jelas seperti ini sebagai inducement: ia memancing penjual breakout sebelum sapuan yang lebih dalam.'),
        cue('In a bearish context it is the mirror image. Price sweeps above the range high, then rejects back inside.','Dalam konteks bearish, ia gambaran cermin. Harga menyapu di atas range high, kemudian ditolak kembali ke dalam.'),
        cue('One more time, because it matters: manipulation here is an I C T label for a false move. It is not proof of illegal or coordinated market manipulation.','Sekali lagi, kerana ia penting: manipulation di sini ialah label ICT bagi pergerakan palsu. Ia bukan bukti manipulasi pasaran yang haram atau diselaraskan.')]},

 {label:'SCENE 5 · 7.2 · DISTRIBUTION PHASE',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'PHASE 3 · DISTRIBUTION',tagColor:'green',candles:cs,dimCandles:[[0,A.sweep]],reveal:[[0,A.disp],[0,A.disp+3,{per:0.35}],[3,cs.length]],
    overlays:[O.fvg(A.fvg,{in:1,i1:36}),O.bos(A.lh,30,'h','MSS','white','up',{in:2}),O.bos(A.r1,32,A.hi,'BOS','white','up',{in:2}),
      O.level(A.extH,'EXTERNAL LIQUIDITY · OLD HIGH','yellow',{in:3}),O.sweep(E-1,'high',A.extH,'','yellow',{in:4,level:A.extH}),O.text(E,'h','CONTINUE OR EXHAUST?','grey',{in:5,dy:-30,anchor:'end',size:14})],
    checks:[{bull:A.disp},{bull:A.bos},{sweepAbove:[E-1,A.extH]}]},
   {type:'notes',slot:'side',eyebrow:'7.2 · DISTRIBUTION',title:'Directional expansion',items:[
     {text:'Strong directional candles — displacement',in:0,color:'green'},{text:'Imbalance left behind (FVG)',in:1,color:'green'},
     {text:'Structure develops: MSS, then BOS',in:2,color:'green'},{text:'Movement toward external liquidity',in:3,color:'yellow'},
     {text:'Then: continuation, or exhaustion',in:5,color:'grey'},{text:'Not Wyckoff Distribution',in:6,color:'red'}]}],
  cues:[cue('Phase three, distribution. It begins with strong directional candles: displacement away from the sweep.','Fasa tiga, distribution. Ia bermula dengan candle berarah yang kuat: displacement menjauhi sapuan.'),
        cue('Displacement often leaves an imbalance behind, a fair value gap.','Displacement sering meninggalkan ketidakseimbangan, iaitu fair value gap.'),
        cue('Structure develops. First a market structure shift above the last lower high, then a break above the range.','Struktur terbentuk. Mula-mula market structure shift di atas lower high terakhir, kemudian break di atas range.'),
        cue('Price moves toward external liquidity, here the old high that began the decline.','Harga bergerak ke arah external liquidity, di sini high lama yang memulakan penurunan.'),
        cue('It trades through that high. What happens next is open.','Ia didagangkan melepasi high tersebut. Apa yang berlaku seterusnya masih terbuka.'),
        cue('The move may continue, or it may exhaust. Distribution does not guarantee continuation.','Pergerakan mungkin berterusan, atau mungkin kehabisan tenaga. Distribution tidak menjamin kesinambungan.'),
        cue('And remember: A M D distribution means directional expansion. It is not the Wyckoff distribution schematic.','Dan ingat: distribution dalam AMD bermaksud pengembangan berarah. Ia bukan skema distribution Wyckoff.')]},

 {label:'SCENE 6 · 7.2 · BULLISH AMD MODEL',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'BULLISH AMD',tagColor:'green',candles:cs,reveal:[[0,A.r1+1],[3,A.sweep+1],[4,A.disp+1],[5,A.disp+3],[7,cs.length]],
    overlays:[O.level(A.hi,'RANGE HIGH','neutral',{i0:A.r0,i1:A.r1+6,in:1,size:13}),O.level(A.lo,'RANGE LOW · SSL','yellow',{i0:A.r0,i1:A.sweep,in:2,below:true,size:13}),
      O.sweep(A.sweep,'low',A.lo,'SSL SWEEP','amber',{in:3,level:A.lo}),O.text(A.disp,'h','BACK INSIDE','green',{in:4,dy:-14,size:13}),
      O.fvg(A.fvg,{in:5,i1:36}),O.bos(A.lh,30,'h','MSS','white','up',{in:6}),O.level(A.extH,'BSL OBJECTIVE','yellow',{in:7}),...bands(8,8,8,false,A)],
    checks:[{sweepBelow:[A.sweep,A.lo]},{closeAbove:[A.disp,A.lo]},{sweepAbove:[E-1,A.extH]}]},
   {type:'notes',slot:'side',eyebrow:'7.2 · MODEL',title:'Bullish AMD · 8 steps',items:[
     {text:'1 · Price consolidates',in:0,size:22},{text:'2 · Range boundaries established',in:1,size:22},{text:'3 · Sell-side liquidity identified',in:2,size:22,color:'yellow'},
     {text:'4 · Sweep below the range',in:3,size:22,color:'amber'},{text:'5 · Return into the range',in:4,size:22,color:'green'},{text:'6 · Bullish displacement',in:5,size:22,color:'green'},
     {text:'7 · Possible bullish structural shift',in:6,size:22,color:'green'},{text:'8 · Expansion toward buy-side liquidity',in:7,size:22,color:'yellow'}]}],
  cues:[cue('The full bullish A M D model. Step one: price consolidates.','Model AMD bullish penuh. Langkah satu: harga berkonsolidasi.'),
        cue('Step two: the range boundaries are established.','Langkah dua: sempadan range terbentuk.'),
        cue('Step three: sell-side liquidity is identified beneath the range low.','Langkah tiga: sell-side liquidity dikenal pasti di bawah range low.'),
        cue('Step four: price sweeps below the range.','Langkah empat: harga menyapu ke bawah range.'),
        cue('Step five: price returns into the range.','Langkah lima: harga kembali ke dalam range.'),
        cue('Step six: bullish displacement develops.','Langkah enam: bullish displacement terbentuk.'),
        cue('Step seven: a bullish structural shift may occur, as price closes above the last lower high.','Langkah tujuh: anjakan struktur bullish mungkin berlaku, apabila harga ditutup di atas lower high terakhir.'),
        cue('Step eight: price expands toward buy-side liquidity.','Langkah lapan: harga berkembang ke arah buy-side liquidity.'),
        cue('Labelled together, these are the three phases of a bullish A M D.','Apabila dilabel bersama, inilah tiga fasa AMD bullish.')]},

 {label:'SCENE 7 · 7.2 · BEARISH AMD MODEL',layout:'chart',comps:[
   {type:'chart',slot:'main',title:M,note:N,tag:'BEARISH AMD',tagColor:'red',candles:BR,reveal:[[0,A2.r1+1],[3,A2.sweep+1],[4,A2.disp+1],[5,A2.disp+3],[7,BR.length]],
    overlays:[O.level(m(A2.lo),'RANGE HIGH · BSL','yellow',{i0:A2.r0,i1:A2.sweep,in:2,size:13}),O.level(m(A2.hi),'RANGE LOW','neutral',{i0:A2.r0,i1:A2.r1+6,in:1,below:true,size:13}),
      O.sweep(A2.sweep,'high',m(A2.lo),'BSL SWEEP','amber',{in:3,level:m(A2.lo)}),O.text(A2.disp,'l','BACK INSIDE','red',{in:4,dy:28,size:13}),
      O.fvg(A2.fvg,{in:5,i1:36,bear:true}),O.bos(A2.lh,30,'l','MSS','white','down',{in:6,below:true}),O.level(m(A2.extH),'SSL OBJECTIVE','yellow',{in:7,below:true}),...bands(8,8,8,true,A2)],
    checks:[{sweepAbove:[A2.sweep,m(A2.lo)]},{closeBelow:[A2.disp,m(A2.lo)]},{sweepBelow:[A2.end-1,m(A2.extH)]}]},
   {type:'notes',slot:'side',eyebrow:'7.2 · MODEL',title:'Bearish AMD · 8 steps',items:[
     {text:'1 · Price consolidates',in:0,size:22},{text:'2 · Range boundaries established',in:1,size:22},{text:'3 · Buy-side liquidity identified',in:2,size:22,color:'yellow'},
     {text:'4 · Sweep above the range',in:3,size:22,color:'amber'},{text:'5 · Return into the range',in:4,size:22,color:'red'},{text:'6 · Bearish displacement',in:5,size:22,color:'red'},
     {text:'7 · Possible bearish structural shift',in:6,size:22,color:'red'},{text:'8 · Expansion toward sell-side liquidity',in:7,size:22,color:'yellow'}]}],
  cues:[cue('And the bearish model. Step one: price consolidates after a rally.','Dan model bearish. Langkah satu: harga berkonsolidasi selepas kenaikan.'),
        cue('Step two: the range boundaries are established.','Langkah dua: sempadan range terbentuk.'),
        cue('Step three: buy-side liquidity is identified above the range high.','Langkah tiga: buy-side liquidity dikenal pasti di atas range high.'),
        cue('Step four: price sweeps above the range.','Langkah empat: harga menyapu ke atas range.'),
        cue('Step five: price returns into the range.','Langkah lima: harga kembali ke dalam range.'),
        cue('Step six: bearish displacement develops.','Langkah enam: bearish displacement terbentuk.'),
        cue('Step seven: a bearish structural shift may occur.','Langkah tujuh: anjakan struktur bearish mungkin berlaku.'),
        cue('Step eight: price expands toward sell-side liquidity below.','Langkah lapan: harga berkembang ke arah sell-side liquidity di bawah.'),
        cue('Accumulation, manipulation, distribution, in the bearish direction.','Accumulation, manipulation, distribution, ke arah bearish.')]},

 {label:'SCENE 8 · 7.2 · AMD VS WYCKOFF',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.2 · MANDATORY COMPARISON',title:'AMD (ICT/SMC) vs the Wyckoff Method'},
   {type:'table',slot:'main',cols:['','AMD in ICT / SMC','Wyckoff Method'],widths:['18%','41%','41%'],size:22,rows:[
     {cells:['Scope','A price-delivery framework: Accumulation, Manipulation, Distribution','Accumulation and Distribution are broader market-cycle structures (phases A–E)'],in:0,color:'gold'},
     {cells:['False moves','“Manipulation” = a false move / liquidity-sweep interpretation','Spring and Upthrust are specific, defined Wyckoff events'],in:1,color:'amber'},
     {cells:['Focus','Liquidity and directional price delivery','Supply & demand, cause & effect, effort vs result (volume)'],in:2,color:'cyan'},
     {cells:['Typical use','Intraday and session-based analysis','Can be applied to broader market phases'],in:3,color:'purple'},
     {cells:['“Distribution”','The expansion phase (up or down)','A topping structure before markdown'],in:4,color:'red'}]}],
  cues:[cue('Now a mandatory comparison. In I C T and S M C, A M D is a price-delivery framework. In Wyckoff, accumulation and distribution are broader market-cycle structures with defined phases.','Kini perbandingan wajib. Dalam ICT dan SMC, AMD ialah rangka kerja price delivery. Dalam Wyckoff, accumulation dan distribution ialah struktur kitaran pasaran yang lebih luas dengan fasa yang ditakrifkan.'),
        cue('In A M D, manipulation is a general interpretation of a false move. Wyckoff names specific events, such as the Spring and the Upthrust.','Dalam AMD, manipulation ialah tafsiran umum bagi pergerakan palsu. Wyckoff menamakan peristiwa tertentu, seperti Spring dan Upthrust.'),
        cue('A M D focuses on liquidity and price delivery. Wyckoff focuses on supply and demand, cause and effect, and effort versus result, usually with volume.','AMD fokus pada liquidity dan price delivery. Wyckoff fokus pada supply dan demand, cause and effect, serta effort versus result, biasanya dengan volume.'),
        cue('A M D is commonly applied intraday and by session. Wyckoff is often applied to broader market phases.','AMD lazimnya digunakan secara intraday dan mengikut sesi. Wyckoff sering digunakan pada fasa pasaran yang lebih luas.'),
        cue('And the word distribution means opposite things. In A M D it is the expansion phase. In Wyckoff, it is a top.','Dan perkataan distribution membawa maksud yang berbeza. Dalam AMD ia fasa pengembangan. Dalam Wyckoff, ia satu puncak.')]},

 {label:'SCENE 9 · 7.2 · SIMILAR SHAPE, DIFFERENT FRAMEWORK',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.2 · INTERPRETATION',title:'Similar-looking price, different meaning'},
   {type:'cards',slot:'main',size:24,cards:[
     {title:'AMD reading',color:'gold',in:0,h:420,items:['Range = accumulation phase','Break below = manipulation (sweep of SSL)','Reclaim + displacement = start of distribution','Evidence: liquidity, structure, displacement']},
     {title:'Wyckoff reading',color:'cyan',in:2,h:420,items:['Range = trading range in a phase schematic','Break below may be a Spring (Phase C)','Followed by a test and Sign of Strength','Evidence: volume, effort vs result, phase context']}]},
   {type:'text',r:[120,620,1680],size:24,color:'grey',in:4,text:'Use one framework’s vocabulary at a time — do not mix labels from both on one chart without saying so.'}],
  cues:[cue('The same price action can be read by both methods. An A M D reader sees a range, a sweep, and the start of distribution.','Pergerakan harga yang sama boleh dibaca dengan kedua-dua kaedah. Pembaca AMD melihat range, sapuan, dan permulaan distribution.'),
        cue('The evidence comes from liquidity, structure and displacement.','Buktinya datang daripada liquidity, struktur dan displacement.'),
        cue('A Wyckoff reader may see a trading range, a possible Spring in Phase C, then a test and a sign of strength.','Pembaca Wyckoff mungkin melihat trading range, kemungkinan Spring dalam Fasa C, kemudian test dan sign of strength.'),
        cue('Their evidence comes from volume and effort versus result.','Bukti mereka datang daripada volume dan effort versus result.'),
        cue('Both can be useful. But use one vocabulary at a time, and do not mix labels without saying so.','Kedua-duanya boleh berguna. Tetapi gunakan satu perbendaharaan kata pada satu masa, dan jangan campur label tanpa menyatakannya.')]},

 {label:'SCENE 10 · 7.2 · COMMON MISTAKES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.2 · COMMON MISTAKES',title:'Seven AMD mistakes'},
   {type:'list',slot:'main',icon:'x',cols:2,size:27,items:[
     {text:'Treating every range as accumulation',in:0},{text:'Treating every sweep as manipulation',in:1},{text:'Assuming distribution must follow immediately',in:2},
     {text:'Confusing AMD with Wyckoff',in:3},{text:'Treating manipulation as proven institutional intent',in:4},{text:'Ignoring higher-timeframe structure',in:5},{text:'Forcing bullish or bearish scenarios',in:6}]}],
  cues:[cue('Common mistakes. One: treating every range as accumulation.','Kesilapan biasa. Satu: menganggap setiap range sebagai accumulation.'),
        cue('Two: treating every sweep as manipulation.','Dua: menganggap setiap sapuan sebagai manipulation.'),
        cue('Three: assuming distribution must follow immediately. Sometimes price ranges again.','Tiga: menganggap distribution mesti berlaku serta-merta. Kadangkala harga kembali bergerak dalam range.'),
        cue('Four: confusing A M D with Wyckoff.','Empat: mengelirukan AMD dengan Wyckoff.'),
        cue('Five: treating manipulation as proven institutional intent.','Lima: menganggap manipulation sebagai niat institusi yang terbukti.'),
        cue('Six: ignoring the higher-timeframe structure that the range sits inside.','Enam: mengabaikan struktur timeframe lebih tinggi yang menempatkan range tersebut.'),
        cue('And seven: forcing a bullish or bearish scenario because you want one.','Dan tujuh: memaksa senario bullish atau bearish kerana anda mahukannya.')]},

 {label:'SCENE 11 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'AMD — what to remember'},
   {type:'list',slot:'main',cols:2,size:27,items:[
     {text:'AMD = a framework for how ranges resolve',in:0},{text:'Accumulation: observable range, EQH/EQL if genuine',in:0},
     {text:'Manipulation: sweep + return inside the range',in:1},{text:'Distribution: displacement, structure, expansion',in:1},
     {text:'AMD ≠ Wyckoff — different vocabulary and evidence',in:2},{text:'Labels describe price, not intent',in:3}]}],
  cues:[cue('To summarise. A M D is a framework for how ranges may resolve. Accumulation is an observable range, with equal highs or lows only if they are genuine.','Sebagai rumusan. AMD ialah rangka kerja tentang cara range mungkin diselesaikan. Accumulation ialah range yang boleh dilihat, dengan equal highs atau lows hanya jika ia benar-benar wujud.'),
        cue('Manipulation is a sweep followed by a return inside the range. Distribution is displacement, structure and expansion.','Manipulation ialah sapuan diikuti dengan kembalinya harga ke dalam range. Distribution ialah displacement, struktur dan pengembangan.'),
        cue('A M D is not Wyckoff. Each uses its own vocabulary and evidence.','AMD bukan Wyckoff. Setiap satu menggunakan perbendaharaan kata dan buktinya sendiri.'),
        cue('And always remember: these labels describe price behaviour, not anyone’s intent.','Dan sentiasa ingat: label-label ini menerangkan tingkah laku harga, bukan niat sesiapa.')]},
 ...quizScenes(3,quiz,12),
 disclaimer('Next: Episode 04 — Understanding ICT Kill Zones','SCENE 15 · DISCLAIMER'),
];
module.exports={meta:meta(3,'Accumulation, Manipulation, Distribution'),scenes,quiz};
