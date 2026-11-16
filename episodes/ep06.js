// EPISODE 06 — UNDERSTANDING DAILY BIAS (Subtopic 7.4)
'use strict';
const {meta,po3,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {htfBull,htfBear,twoDays}=require('./_htf');
const D=htfBull(); const cs=D.cs; const DB=htfBear(); const R=twoDays();
const HT='ILLUSTRATIVE MARKET · DAILY', LT='ILLUSTRATIVE MARKET · 15M';
const swingMarks=(d,inn,bear)=>{const lab=bear?['LH','LL']:['HL','HH'];return [
  O.mark(d.sl0,'l','LOW','white',{in:inn,swing:true,lsize:16,price:false}),O.mark(d.sh1,'h','HIGH','white',{in:inn,swing:true,lsize:16,price:false}),
  O.mark(d.sl1,'l','HL','green',{in:inn,swing:true,lsize:16,price:false}),O.mark(d.sh2,'h','HH','green',{in:inn,swing:true,lsize:16,price:false}),
  O.mark(d.sl2,'l','HL','green',{in:inn,swing:true,lsize:16,price:false}),O.mark(d.sh3,'h','HH','green',{in:inn,swing:true,lsize:16,price:false})];};
const L1=po3(4196,31,'ok'), L2=po3(4196,32,'continue');
const NR=gen({start:4210,seed:66,vol:14,steps:[{n:5,to:4290,vol:14},{n:5,to:4150,vol:14},{range:16,lo:4150,hi:4292,touchHi:[3,10],touchLo:[6,13],vol:22,end:4224},{range:6,lo:4196,hi:4246,vol:12,end:4220}]});

const quiz={
 questions:[
  {q:'Define Daily Bias in one sentence.',a:'A working hypothesis about the likely direction of the day, built from higher-timeframe structure, liquidity objectives and price location.',why:'It is updated as evidence changes; it is not a forecast and not an entry signal.'},
  {q:'What is a Draw on Liquidity (DOL)?',a:'The liquidity pool price is judged most likely to move toward next (e.g. PDH, PWH, EQH, an old high or low).',why:'It is an analytical target used to frame the day, never a guaranteed destination.'},
  {q:'Price is bullish on the daily chart but trading in premium at a bearish PD array. How does that affect a bullish bias?',a:'It weakens it: location is unfavourable for new buying, so the bias may be held with lower conviction or set to neutral until price reaches discount.',why:'Level 6 location (premium/discount) is one of the inputs; conflicting inputs reduce confidence.'},
  {q:'Give three situations that justify a neutral Daily Bias.',a:'Conflicting HTF structure; price at equilibrium between two liquidity pools; no displacement; major event risk; overlapping conflicting PD arrays.',why:'Neutral is a valid conclusion. Forcing a direction is a common and costly error.'},
  {q:'What is an invalidation condition, and why must it be written before the session?',a:'The price behaviour that would prove the bias wrong (e.g. a daily close below the HL that defines bullish structure). Writing it first prevents rationalising.',why:'A bias without invalidation cannot be tested and tends to be changed after every candle.'}],
 charts:[{prompt:'On a daily chart, label the last three swing highs and lows (HH/HL or LH/LL) and the latest BOS. State the structural bias.',answer:'Labels must sit on true swing extremes; the latest BOS defines whether structure is bullish or bearish.'},
         {prompt:'Draw the dealing range from the latest significant swing low to swing high. Mark EQ, premium, discount and OTE (62–79%). Where is price now?',answer:'EQ is the 50% level; OTE spans 62–79% retracement; state the current location in words.'}],
 practical:{task:'Complete the 10-question CMI Daily Bias checklist for tomorrow on one market, including an explicit invalidation level.',guide:'A good checklist ends with bullish/bearish/neutral and a clear price-based invalidation; it lists the event calendar.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 06 · LEVEL 7 · SUBTOPIC 7.4',title:'Understanding Daily Bias',subtitle:'HTF structure · Draw on Liquidity · Dealing range · Invalidation',objIn:2,
   objectives:['Define bullish, bearish and neutral Daily Bias','Build bias from structure, liquidity and location','Use the 10-question CMI Daily Bias checklist','Write invalidation before the session starts'],
   side:{type:'chart',bare:true,axis:false,candles:cs,padR:1,reveal:[[0,cs.length]],overlays:[O.level(D.EQ,'EQ','neutral',{size:12})]}}],
  cues:[cue('Welcome to Episode Six, subtopic seven point four: Daily Bias.','Selamat datang ke Episod 6, subtopik 7.4: Daily Bias.'),
        cue('So far we have studied how price may be delivered and when we watch it. Daily Bias asks which direction we expect, and why.','Setakat ini kita mengkaji bagaimana harga mungkin dihantar dan bila kita memerhatinya. Daily Bias bertanya arah mana yang kita jangkakan, dan mengapa.'),
        cue('You will learn to build bias from structure, liquidity and location, and to write down what would prove it wrong.','Anda akan belajar membina bias daripada struktur, liquidity dan lokasi, dan menulis apa yang akan membuktikannya salah.')]},

 {label:'SCENE 2 · 7.4 · WHAT IS DAILY BIAS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.4 · DEFINITION',title:'Daily Bias — a working hypothesis'},
   {type:'cards',r:[120,170,1680,250],size:23,cards:[
     {title:'Bullish bias',color:'green',in:1,items:['Expect the day to favour higher prices / buy-side objectives']},
     {title:'Bearish bias',color:'red',in:1,items:['Expect the day to favour lower prices / sell-side objectives']},
     {title:'Neutral bias',color:'neutral',in:2,items:['No clear directional edge — wait or stand aside']}]},
   {type:'cards',r:[120,450,1680,250],size:23,cards:[
     {title:'Why before intraday',color:'gold',in:3,items:['Frames which intraday setups to study, and which to ignore']},
     {title:'Bias ≠ prediction',color:'red',in:4,items:['A hypothesis — updated when evidence changes']},
     {title:'Bias ≠ confirmation',color:'cyan',in:5,items:['Entry still needs lower-timeframe evidence']}]}],
  cues:[cue('Daily Bias is a directional working hypothesis for the day.','Daily Bias ialah hipotesis kerja berarah bagi hari tersebut.'),
        cue('A bullish bias expects the day to favour higher prices and buy-side objectives. A bearish bias expects the opposite.','Bias bullish menjangkakan hari itu memihak kepada harga lebih tinggi dan objektif buy-side. Bias bearish menjangkakan sebaliknya.'),
        cue('A neutral bias means there is no clear directional edge. That is a legitimate answer.','Bias neutral bermaksud tiada kelebihan arah yang jelas. Itu jawapan yang sah.'),
        cue('We set bias before intraday analysis because it frames which setups we study, and which we ignore.','Kita tetapkan bias sebelum analisis intraday kerana ia menentukan setup mana yang kita kaji, dan mana yang kita abaikan.'),
        cue('But bias is not a guaranteed prediction. It is a hypothesis that should be updated when conditions change.','Tetapi bias bukan ramalan yang dijamin. Ia hipotesis yang perlu dikemas kini apabila keadaan berubah.'),
        cue('And bias is not confirmation. A directional expectation still needs lower-timeframe evidence before any trade decision.','Dan bias bukan pengesahan. Jangkaan arah masih memerlukan bukti timeframe lebih rendah sebelum sebarang keputusan dagangan.')]},

 {label:'SCENE 3 · 7.4 · HTF STRUCTURE',layout:'chart',comps:[
   {type:'chart',slot:'main',title:HT,note:'ILLUSTRATIVE SCENARIO',tag:'STEP 1–4 · STRUCTURE',candles:cs,reveal:[[0,cs.length]],
    overlays:[...swingMarks(D,1),O.bos(D.sh1,15,'h','BOS','white','up',{in:2}),O.bos(D.sh2,27,'h','BOS','white','up',{in:2}),
      O.path([[D.sl0,'l'],[D.sh1,'h'],[D.sl1,'l'],[D.sh2,'h'],[D.sl2,'l'],[D.sh3,'h'],[D.cur,'l']],'gold',{in:3,w:1.6}),O.text(D.cur,'l','RETRACING','amber',{in:4,dy:30})],
    checks:[{higherLow:[D.sl1,D.sl2]},{higherHigh:[D.sh2,D.sh3]},{higherLow:[D.sl0,D.sl1]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · LEVEL 2 REVIEW',title:'Read structure first',items:[
     {text:'1 · Identify the broader trend',in:0},{text:'2 · Label meaningful swing points: HH, HL',in:1,color:'green'},{text:'3 · Latest BOS — up, up',in:2},
     {text:'4 · Trending, retracing or consolidating? → retracing',in:4,color:'amber'},{text:'5 · Initial hypothesis: bullish, pending location',in:5,color:'green'}]}],
  cues:[cue('Step one is higher-timeframe market structure, from Level Two. This is a daily chart. First, identify the broader trend.','Langkah pertama ialah struktur pasaran timeframe tinggi, daripada Level 2. Ini carta harian. Pertama, kenal pasti trend yang lebih luas.'),
        cue('Next, label the meaningful swing points. Higher highs and higher lows.','Seterusnya, labelkan titik swing yang bermakna. Higher high dan higher low.'),
        cue('Evaluate the latest structural breaks. Two breaks of structure to the upside.','Nilai pecahan struktur terkini. Dua break of structure ke atas.'),
        cue('The external structure is a sequence of higher highs and higher lows.','Struktur luaran ialah urutan higher high dan higher low.'),
        cue('Then ask: is price trending, retracing or consolidating? Right now, it is retracing from the last high.','Kemudian tanya: adakah harga sedang trend, retrace atau berkonsolidasi? Sekarang, ia sedang retrace daripada high terakhir.'),
        cue('So the initial hypothesis is bullish, but we have not yet checked liquidity or location.','Jadi hipotesis awal ialah bullish, tetapi kita belum menyemak liquidity atau lokasi.')]},

 {label:'SCENE 4 · 7.4 · DRAW ON LIQUIDITY',layout:'chart',comps:[
   {type:'chart',slot:'main',title:HT,note:'ILLUSTRATIVE SCENARIO',tag:'DRAW ON LIQUIDITY',tagColor:'yellow',candles:cs,padR:5,reveal:[[0,cs.length]],
    overlays:[O.level(D.H,'BSL · OLD HIGH (EXTERNAL)','yellow',{i0:D.sh3,in:1}),O.level(D.L,'SSL · SWING LOW (EXTERNAL)','yellow',{i0:D.sl2,in:2,below:true}),
      O.fvg(D.fvg,{in:3,i1:37,label:'FVG · INTERNAL'}),O.arrow([D.cur,'h'],[D.cur+4,D.H-4],'green',{in:4,dash:'7 6',label:'DOL?',curve:10})],
    checks:[{isHigh:[D.sh3,0,D.cur]},{noCloseBelow:[D.sl2+1,D.cur,D.L]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · DRAW ON LIQUIDITY',title:'Where might price go?',items:[
     {text:'External BSL: above the old high',in:1,color:'yellow'},{text:'External SSL: below the swing low',in:2,color:'yellow'},
     {text:'Internal liquidity: the FVG inside the range',in:3,color:'green'},{text:'Bullish structure → DOL = buy-side, above',in:4,color:'green'},{text:'A target to frame the day — not a guarantee',in:5,color:'red'}]}],
  cues:[cue('Step two is the Draw on Liquidity: the liquidity pool price is judged most likely to move toward next.','Langkah kedua ialah Draw on Liquidity: kolam liquidity yang dinilai paling mungkin menjadi arah harga seterusnya.'),
        cue('Above, buy-side liquidity rests beyond the old high. This is external liquidity, at the edge of the range.','Di atas, buy-side liquidity berada di luar high lama. Ini external liquidity, di tepi range.'),
        cue('Below, sell-side liquidity rests beneath the last swing low. Also external.','Di bawah, sell-side liquidity berada di bawah swing low terakhir. Juga external.'),
        cue('Inside the range, the fair value gap is internal liquidity, a place price may revisit along the way.','Di dalam range, fair value gap ialah internal liquidity, tempat yang mungkin dikunjungi semula oleh harga dalam perjalanan.'),
        cue('With bullish structure and price retracing, a reasonable draw is the buy-side liquidity above the old high.','Dengan struktur bullish dan harga sedang retrace, draw yang munasabah ialah buy-side liquidity di atas high lama.'),
        cue('But a Draw on Liquidity is an analytical expectation, not a guaranteed destination.','Tetapi Draw on Liquidity ialah jangkaan analisis, bukan destinasi yang dijamin.')]},

 {label:'SCENE 5 · 7.4 · LIQUIDITY TYPES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.4 · LIQUIDITY REFERENCES',title:'Candidates for the Draw on Liquidity'},
   {type:'table',slot:'main',cols:['Reference','Side','Type','Notes'],widths:['30%','16%','18%','36%'],size:22,rows:[
     {cells:['Previous Day High / Low (PDH / PDL)','BSL / SSL','External (daily)','The most common intraday objectives'],in:0,color:'yellow'},
     {cells:['Previous Week High / Low (PWH / PWL)','BSL / SSL','External (weekly)','Larger objectives; may take several days'],in:1,color:'yellow'},
     {cells:['Equal Highs / Equal Lows (EQH / EQL)','BSL / SSL','Either','Only where genuinely equal'],in:2,color:'amber'},
     {cells:['Old swing highs / lows','BSL / SSL','External','Edges of the current dealing range'],in:3,color:'amber'},
     {cells:['FVG / imbalance inside the range','—','Internal','Price may rebalance before the external target'],in:4,color:'green'}]}],
  cues:[cue('Which levels are candidates for the draw? The previous day high and low are the most common intraday objectives.','Paras manakah calon bagi draw? Previous day high dan low ialah objektif intraday yang paling lazim.'),
        cue('The previous week high and low are larger objectives that may take several days.','Previous week high dan low ialah objektif yang lebih besar dan mungkin mengambil beberapa hari.'),
        cue('Equal highs and equal lows, but only where they are genuinely equal.','Equal highs dan equal lows, tetapi hanya di mana ia benar-benar sama.'),
        cue('Old swing highs and lows at the edges of the dealing range are external liquidity.','Swing high dan low lama di tepi dealing range ialah external liquidity.'),
        cue('And imbalances inside the range are internal liquidity, which price may rebalance before reaching the external target.','Dan ketidakseimbangan di dalam range ialah internal liquidity, yang mungkin diseimbangkan semula oleh harga sebelum mencapai sasaran luaran.')]},

 {label:'SCENE 6 · 7.4 · DEALING RANGE & LOCATION',layout:'chart',comps:[
   {type:'chart',slot:'main',title:HT,note:'ILLUSTRATIVE SCENARIO',tag:'LEVEL 6 · LOCATION',tagColor:'purple',candles:cs,padR:5,reveal:[[0,cs.length]],
    overlays:[O.bracket(D.sh3+5,D.H,D.L,'DEALING RANGE','white',{in:0}),O.level(D.EQ,'EQUILIBRIUM '+D.EQ,'neutral',{i0:D.sl2,in:1}),
      O.zone(D.EQ,D.H,D.sl2,D.cur+4,'PREMIUM','red',{in:1,alpha:0.06,stroke:false,lpos:'above'}),O.zone(D.L,D.EQ,D.sl2,D.cur+4,'DISCOUNT','green',{in:1,alpha:0.06,stroke:false,lpos:'below'}),
      O.zone(D.ote[0],D.ote[1],D.sl2+4,D.cur+4,'OTE 62–79%','purple',{in:2,alpha:0.14,lpos:'right'}),O.fvg(D.fvg,{in:3,i1:37,label:'BULLISH FVG · PD ARRAY'})],
    checks:[{sweepBelow:[D.cur,D.EQ]},{sweepBelow:[D.cur,D.ote[0]]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · LEVEL 6 REVIEW',title:'Where is price?',items:[
     {text:'Dealing range: swing low → swing high',in:0},{text:'Below EQ = discount; above = premium',in:1,color:'green'},{text:'OTE: 62–79% retracement',in:2,color:'purple'},
     {text:'Bullish PD array (FVG) just below price',in:3,color:'green'},{text:'Bullish structure + discount = supportive',in:4,color:'green'},{text:'Bullish structure + premium = weaker',in:5,color:'red'}]}],
  cues:[cue('Step three is location, from Level Six. Define the dealing range from the latest significant swing low to swing high.','Langkah ketiga ialah lokasi, daripada Level 6. Tentukan dealing range dari swing low terkini yang signifikan hingga swing high.'),
        cue('Equilibrium is the fifty percent level. Below it is discount; above it is premium.','Equilibrium ialah paras 50 peratus. Di bawahnya ialah discount; di atasnya ialah premium.'),
        cue('The optimal trade entry zone sits between the sixty-two and seventy-nine percent retracement. Price is trading inside it now.','Zon optimal trade entry berada antara retracement 62 dan 79 peratus. Harga kini didagangkan di dalamnya.'),
        cue('Just below price is a bullish fair value gap, a bullish P D array.','Tepat di bawah harga terdapat bullish fair value gap, iaitu bullish PD array.'),
        cue('Bullish structure with price in discount, approaching a bullish P D array, supports the bullish hypothesis.','Struktur bullish dengan harga dalam discount, menghampiri bullish PD array, menyokong hipotesis bullish.'),
        cue('If the same structure were trading in premium, into a bearish array, the bullish case would be weaker. And if the daily and intraday locations conflict, confidence drops further.','Jika struktur yang sama didagangkan dalam premium, ke arah bearish array, kes bullish akan menjadi lebih lemah. Dan jika lokasi harian dan intraday bercanggah, keyakinan menurun lagi.')]},

 {label:'SCENE 7 · 7.4 · PREVIOUS DAY LEVELS',layout:'chart',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE MARKET · 1H',note:'ILLUSTRATIVE SCENARIO',tag:'PDH · PDL · PDO · PDC',candles:R.cs,reveal:[[0,24],[4,R.cs.length]],
    overlays:[O.band(0,23,'PREVIOUS DAY','neutral',{in:0,back:true,alpha:0.05}),O.band(24,R.cs.length-1,'TODAY','gold',{in:4,back:true,alpha:0.05}),
      O.level(R.PDH,'PDH','yellow',{in:1}),O.level(R.PDL,'PDL','yellow',{in:1,below:true}),O.level(R.PDO,'PD OPEN','neutral',{in:2,i1:23,size:13,lpos:'left'}),O.level(R.PDC,'PD CLOSE','neutral',{in:2,i0:23,size:13}),
      O.sweep(29,'low',R.PDL,'PDL SWEPT','amber',{in:5,level:R.PDL}),O.sweep(R.cs.length-2,'high',R.PDH,'PDH TAKEN','yellow',{in:6,level:R.PDH})],
    checks:[{sweepBelow:[29,R.PDL]},{sweepAbove:[R.cs.length-2,R.PDH]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · PREVIOUS DAY',title:'Contextual levels',items:[
     {text:'PDH / PDL — liquidity references',in:1,color:'yellow'},{text:'PD open / PD close — context',in:2},{text:'PWH / PWL — weekly equivalents',in:3},
     {text:'Today: PDL swept first…',in:5,color:'amber'},{text:'…then the draw toward PDH',in:6,color:'yellow'},{text:'Not every previous level is targeted',in:7,color:'red'}]}],
  cues:[cue('On an hourly chart, mark yesterday’s levels.','Pada carta sejam, tandakan paras semalam.'),
        cue('The previous day high and low are liquidity references.','Previous day high dan low ialah rujukan liquidity.'),
        cue('The previous day open and close add context: did yesterday close strong or weak?','Previous day open dan close menambah konteks: adakah semalam ditutup kuat atau lemah?'),
        cue('The previous week high and low play the same role on the weekly scale.','Previous week high dan low memainkan peranan yang sama pada skala mingguan.'),
        cue('Today begins.','Hari ini bermula.'),
        cue('Early in the day, price trades below the previous day low.','Pada awal hari, harga didagangkan di bawah previous day low.'),
        cue('Then it reverses and runs toward the previous day high, consistent with the bullish draw.','Kemudian ia berbalik dan bergerak ke arah previous day high, selaras dengan draw bullish.'),
        cue('But do not assume every previous high or low will be targeted. Many days take neither.','Tetapi jangan anggap setiap high atau low sebelumnya akan disasarkan. Banyak hari tidak mengambil kedua-duanya.')]},

 {label:'SCENE 8 · 7.4 · BULLISH DAILY BIAS MODEL',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'1–5 · HTF CONTEXT',tagColor:'green',candles:cs,padR:4,reveal:[[0,cs.length]],
    overlays:[O.level(D.H,'BSL · DOL','yellow',{i0:D.sh3,in:1,size:13}),O.zone(D.L,D.EQ,D.sl2,D.cur+3,'DISCOUNT','green',{in:2,alpha:0.06,stroke:false,lpos:'below'}),O.fvg(D.fvg,{in:3,i1:37})]},
   {type:'chart',slot:'right',compact:true,title:'15M',note:false,tag:'6–8 · LTF EVIDENCE',tagColor:'green',candles:L1.cs,reveal:[[4,L1.sweep+1],[5,L1.cs.length]],
    overlays:[O.level(L1.lo,'SSL','yellow',{i0:0,i1:L1.sweep,below:true,size:13,in:4}),O.sweep(L1.sweep,'low',L1.lo,'SWEEP','amber',{in:4,level:L1.lo}),O.bos(L1.lh,21,'h','MSS','white','up',{in:5}),O.fvg(L1.fvg,{in:5,i1:28})],
    checks:[{sweepBelow:[L1.sweep,L1.lo]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:6,text:'HTF bullish · DOL above · discount · bullish PD array · SSL sweep · LTF displacement + MSS → **potential** bullish intraday scenario'}],
  cues:[cue('Let’s assemble a bullish Daily Bias model. One: higher-timeframe bullish structure.','Mari kita susun model Daily Bias bullish. Satu: struktur timeframe tinggi yang bullish.'),
        cue('Two and three: relevant external liquidity above, giving a potential draw toward buy-side liquidity.','Dua dan tiga: external liquidity yang relevan di atas, memberikan potensi draw ke arah buy-side liquidity.'),
        cue('Four: price trading into discount.','Empat: harga didagangkan ke dalam discount.'),
        cue('Five: a bullish P D array, the fair value gap.','Lima: bullish PD array, iaitu fair value gap.'),
        cue('Six: on the fifteen-minute chart, a possible liquidity interaction. Sell-side liquidity is swept.','Enam: pada carta 15 minit, kemungkinan interaksi liquidity. Sell-side liquidity disapu.'),
        cue('Seven: lower-timeframe bullish displacement and a market structure shift.','Tujuh: bullish displacement pada timeframe rendah dan market structure shift.'),
        cue('Eight: together, these give a potential bullish intraday scenario. Potential, not certain.','Lapan: bersama-sama, ini memberikan potensi senario intraday bullish. Potensi, bukan pasti.')]},

 {label:'SCENE 9 · 7.4 · WHEN THE BULLISH BIAS FAILS',layout:'chart',comps:[
   {type:'chart',slot:'main',title:LT,note:'ILLUSTRATIVE SCENARIO',tag:'ALTERNATIVE · BIAS INVALIDATED',tagColor:'red',candles:L2.cs,reveal:[[0,L2.sweep+1],[1,L2.cs.length]],
    overlays:[O.level(L2.lo,'SSL','yellow',{i1:L2.sweep,below:true,size:13}),O.sweep(L2.sweep,'low',L2.lo,'SWEEP','amber',{in:0,level:L2.lo}),O.level(L2.O-60,'INVALIDATION · e.g. HTF HL / DISCOUNT ARRAY FAILS','red',{in:2,size:13,below:true}),O.text(L2.end-1,'l','NO MSS · NO RECLAIM','red',{in:1,dy:30,anchor:'end'})],
    checks:[{noCloseAbove:[L2.sweep+1,L2.end,L2.lo]},{sweepBelow:[L2.end,L2.O-60]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · ALTERNATIVE',title:'What failure looks like',items:[
     {text:'Sweep happens — but no reclaim',in:0,color:'amber'},{text:'No displacement, no MSS',in:1,color:'red'},{text:'Price breaks the pre-written invalidation',in:2,color:'red'},{text:'Update: neutral, or re-assess bearish',in:3,color:'neutral'}]}],
  cues:[cue('Now the alternative. The sell-side sweep happens, just as before.','Kini alternatifnya. Sapuan sell-side berlaku, sama seperti sebelum ini.'),
        cue('But there is no reclaim, no displacement, and no structure shift. Price keeps falling.','Tetapi tiada reclaim, tiada displacement, dan tiada anjakan struktur. Harga terus jatuh.'),
        cue('It breaks the invalidation level you wrote down before the session, for example the failure of the discount array or the higher-timeframe low.','Ia memecah paras invalidation yang anda tulis sebelum sesi, contohnya kegagalan discount array atau low timeframe tinggi.'),
        cue('The bullish bias is invalid. Update it to neutral, or re-assess for bearish conditions. Do not defend it.','Bias bullish tidak lagi sah. Kemas kini kepada neutral, atau nilai semula untuk keadaan bearish. Jangan mempertahankannya.')]},

 {label:'SCENE 10 · 7.4 · BEARISH DAILY BIAS MODEL',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'1–5 · HTF CONTEXT',tagColor:'red',candles:DB.cs,padR:4,reveal:[[0,DB.cs.length]],
    overlays:[O.level(DB.L,'SSL · DOL','yellow',{i0:D.sh3,in:1,size:13,below:true}),O.zone(DB.EQ,DB.H,D.sl2,D.cur+3,'PREMIUM','red',{in:2,alpha:0.06,stroke:false,lpos:'above'}),O.fvg(D.fvg,{in:3,i1:37,bear:true})]},
   {type:'chart',slot:'right',compact:true,title:'15M',note:false,tag:'6–8 · LTF EVIDENCE',tagColor:'red',candles:L1.cs.map(([o,h,l,c])=>[8392-o,8392-l,8392-h,8392-c]),reveal:[[4,L1.sweep+1],[5,L1.cs.length]],
    overlays:[O.level(8392-L1.lo,'BSL','yellow',{i0:0,i1:L1.sweep,size:13,in:4}),O.sweep(L1.sweep,'high',8392-L1.lo,'SWEEP','amber',{in:4,level:8392-L1.lo}),O.bos(L1.lh,21,'l','MSS','white','down',{in:5,below:true}),O.fvg(L1.fvg,{in:5,i1:28,bear:true})]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:6,text:'HTF bearish · DOL below · premium · bearish PD array · BSL sweep · LTF displacement + MSS → **potential** bearish intraday scenario'}],
  cues:[cue('The bearish model is the inverse. One: higher-timeframe bearish structure, lower highs and lower lows.','Model bearish ialah songsangannya. Satu: struktur timeframe tinggi yang bearish, lower high dan lower low.'),
        cue('Two and three: external sell-side liquidity below, giving a potential draw lower.','Dua dan tiga: external sell-side liquidity di bawah, memberikan potensi draw ke bawah.'),
        cue('Four: price retracing into premium.','Empat: harga retrace ke dalam premium.'),
        cue('Five: a bearish P D array, a bearish fair value gap.','Lima: bearish PD array, iaitu bearish fair value gap.'),
        cue('Six: on the lower timeframe, buy-side liquidity is swept.','Enam: pada timeframe rendah, buy-side liquidity disapu.'),
        cue('Seven: bearish displacement and a market structure shift.','Tujuh: bearish displacement dan market structure shift.'),
        cue('Eight: a potential bearish intraday scenario. The alternative, where price reclaims and breaks the invalidation above, would end the bearish bias in the same way.','Lapan: potensi senario intraday bearish. Alternatifnya, di mana harga reclaim dan memecah invalidation di atas, akan menamatkan bias bearish dengan cara yang sama.')]},

 {label:'SCENE 11 · 7.4 · NEUTRAL BIAS',layout:'chart',comps:[
   {type:'chart',slot:'main',title:HT,note:'ILLUSTRATIVE SCENARIO',tag:'NEUTRAL BIAS',tagColor:'neutral',candles:NR,reveal:[[0,NR.length]],
    overlays:[O.level(4292,'EQH · BSL','yellow',{i0:12,in:1}),O.level(4150,'EQL · SSL','yellow',{i0:12,in:1,below:true}),O.level(4221,'EQUILIBRIUM','neutral',{i0:10,in:2}),O.text(NR.length-1,'h','PRICE AT EQ · NO DISPLACEMENT','neutral',{in:3,dy:-24,anchor:'end'})],
    checks:[{maxHigh:[10,NR.length-1,4292]},{minLow:[10,NR.length-1,4150]}]},
   {type:'notes',slot:'side',eyebrow:'7.4 · NEUTRAL',title:'When there is no edge',items:[
     {text:'Conflicting HTF structure',in:0,color:'neutral'},{text:'Price trapped between liquidity pools',in:1,color:'yellow'},{text:'Price near equilibrium',in:2,color:'neutral'},
     {text:'No clear displacement',in:3},{text:'Major event risk ahead',in:4,color:'amber'},{text:'Overlapping, conflicting PD arrays',in:4},{text:'Neutral is a valid conclusion',in:5,color:'green'}]}],
  cues:[cue('Sometimes the market offers no clear direction. Here, higher-timeframe structure is conflicting: a range after a sharp decline.','Kadangkala pasaran tidak menawarkan arah yang jelas. Di sini, struktur timeframe tinggi bercanggah: range selepas penurunan yang tajam.'),
        cue('Price is trapped between buy-side liquidity above the equal highs and sell-side liquidity below the equal lows.','Harga terperangkap antara buy-side liquidity di atas equal highs dan sell-side liquidity di bawah equal lows.'),
        cue('It sits near equilibrium.','Ia berada berhampiran equilibrium.'),
        cue('And there is no clear displacement in either direction.','Dan tiada displacement yang jelas ke mana-mana arah.'),
        cue('Add major event risk, or overlapping and conflicting P D arrays, and the picture is even less clear.','Tambah risiko peristiwa besar, atau PD array yang bertindih dan bercanggah, dan gambaran menjadi lebih kabur.'),
        cue('In these conditions, neutral is a valid analytical conclusion. Not having an opinion is sometimes the professional opinion.','Dalam keadaan ini, neutral ialah kesimpulan analisis yang sah. Tidak mempunyai pendapat kadangkala ialah pendapat yang profesional.')]},

 {label:'SCENE 12 · 7.4 · CMI DAILY BIAS CHECKLIST',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.4 · CMI CHECKLIST',title:'Ten questions before the session'},
   {type:'flow',slot:'main',perRow:5,bh:270,gx:22,gy:26,arrows:false,steps:[
     {n:'Q1',text:'HTF structure?',in:0},{n:'Q2',text:'Latest meaningful BOS / CHoCH?',in:0},{n:'Q3',text:'Where in the dealing range?',in:1},{n:'Q4',text:'Premium, discount or EQ?',in:1},{n:'Q5',text:'Relevant liquidity pools?',in:2},
     {n:'Q6',text:'Potential Draw on Liquidity?',in:2},{n:'Q7',text:'Relevant PD arrays?',in:3},{n:'Q8',text:'Is there displacement?',in:3},{n:'Q9',text:'What invalidates the bias?',in:4,color:'red'},{n:'Q10',text:'Bullish, bearish or neutral?',in:5,color:'gold'}]}],
  cues:[cue('Here is the C M I Daily Bias checklist. One: what is the higher-timeframe structure? Two: what is the latest meaningful break of structure or change of character?','Ini senarai semak Daily Bias CMI. Satu: apakah struktur timeframe tinggi? Dua: apakah break of structure atau change of character terkini yang bermakna?'),
        cue('Three and four: where is price in the dealing range, and is it in premium, discount, or near equilibrium?','Tiga dan empat: di manakah harga dalam dealing range, dan adakah ia dalam premium, discount, atau berhampiran equilibrium?'),
        cue('Five and six: which liquidity pools are relevant, and what is the potential draw on liquidity?','Lima dan enam: kolam liquidity mana yang relevan, dan apakah potensi draw on liquidity?'),
        cue('Seven and eight: are there relevant P D arrays, and is there displacement?','Tujuh dan lapan: adakah terdapat PD array yang relevan, dan adakah terdapat displacement?'),
        cue('Nine: what would invalidate the current bias? Write this down before the session.','Sembilan: apakah yang akan membatalkan bias semasa? Tulis ini sebelum sesi bermula.'),
        cue('And ten: is the bias bullish, bearish or neutral?','Dan sepuluh: adakah bias itu bullish, bearish atau neutral?')]},

 {label:'SCENE 13 · 7.4 · COMMON MISTAKES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.4 · COMMON MISTAKES',title:'Eight Daily Bias mistakes'},
   {type:'list',slot:'main',icon:'x',cols:2,size:26,items:[
     {text:'Assuming bullish structure guarantees a bullish day',in:0},{text:'Using only one timeframe',in:1},{text:'Ignoring external liquidity',in:2},{text:'Changing bias after every candle',in:3},
     {text:'Treating bias as a fixed prediction',in:4},{text:'Ignoring scheduled economic events',in:5},{text:'Forcing a bullish or bearish conclusion',in:6},{text:'Ignoring invalidation conditions',in:7}]}],
  cues:[cue('Common mistakes. Assuming bullish structure guarantees a bullish day.','Kesilapan biasa. Menganggap struktur bullish menjamin hari yang bullish.'),
        cue('Using only one timeframe.','Menggunakan satu timeframe sahaja.'),
        cue('Ignoring external liquidity.','Mengabaikan external liquidity.'),
        cue('Changing bias after every candle.','Menukar bias selepas setiap candle.'),
        cue('Treating Daily Bias as a fixed prediction.','Menganggap Daily Bias sebagai ramalan yang tetap.'),
        cue('Ignoring scheduled economic events.','Mengabaikan peristiwa ekonomi berjadual.'),
        cue('Forcing a bullish or bearish conclusion.','Memaksa kesimpulan bullish atau bearish.'),
        cue('And ignoring invalidation conditions.','Dan mengabaikan syarat invalidation.')]},

 {label:'SCENE 14 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Daily Bias — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Bias = a working hypothesis, not a forecast',in:0},{text:'Structure → liquidity → location → PD arrays',in:1},
     {text:'DOL frames the day; it is not guaranteed',in:1},{text:'Bias still needs LTF confirmation',in:2},
     {text:'Neutral is a valid conclusion',in:2},{text:'Write invalidation before the session',in:3}]}],
  cues:[cue('To summarise. Daily Bias is a working hypothesis, not a forecast.','Sebagai rumusan. Daily Bias ialah hipotesis kerja, bukan ramalan.'),
        cue('Build it from structure, liquidity, location and P D arrays. The draw on liquidity frames the day, but is never guaranteed.','Bina daripada struktur, liquidity, lokasi dan PD array. Draw on liquidity membentuk rangka hari itu, tetapi tidak pernah dijamin.'),
        cue('Bias still needs lower-timeframe confirmation, and neutral is a valid answer.','Bias masih memerlukan pengesahan timeframe rendah, dan neutral ialah jawapan yang sah.'),
        cue('Above all, write your invalidation before the session begins.','Paling penting, tulis invalidation anda sebelum sesi bermula.')]},
 ...quizScenes(6,quiz,15),
 disclaimer('Next: Episode 07 — Daily Bias and Draw on Liquidity','SCENE 18 · DISCLAIMER'),
];
module.exports={meta:meta(6,'Understanding Daily Bias'),scenes,quiz};
