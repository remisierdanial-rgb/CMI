// EPISODE 08 — UNDERSTANDING JUDAS SWING (Subtopic 7.5)
'use strict';
const {meta,mirror,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {htfBull,htfBear}=require('./_htf');
const {day}=require('./ep04');
const T=i=>{const m=(18*60+30*i)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
const XL=n=>[0,4,12,16,22,26,32].filter(i=>i<n).map(i=>({i,text:T(i)}));
const TT='ILLUSTRATIVE MARKET · 30M · NY TIME';
const MO=day[12][0], AL=5196, AH=5224, PDH=5262, M=5215; const dayB=mirror(day,M);
const D=htfBull(), DB=htfBear();
const asia=[{n:4,to:5210,vol:6},{range:8,lo:5196,hi:5224,touchHi:[2,6],touchLo:[3,7],vol:6,end:5212},{range:4,lo:5205,hi:5218,vol:4,end:5212}];
const j1=gen({start:5214,seed:81,vol:7,steps:[...asia,{o:5212,h:5214,l:5192,c:5194},{o:5194,h:5196,l:5180,c:5182},{n:6,to:5150,vol:8},{n:6,to:5132,vol:7},{range:6,lo:5122,hi:5140,vol:5}]});
const j2=gen({start:5214,seed:82,vol:7,steps:[...asia,{o:5212,h:5214,l:5194,c:5198},{o:5198,h:5200,l:5188,c:5193},{range:18,lo:5186,hi:5210,vol:5}]});
const j3=gen({start:5214,seed:83,vol:7,steps:[...asia,{o:5212,h:5214,l:5194,c:5198},{o:5198,h:5200,l:5186,c:5190},{o:5190,h:5206,l:5188,c:5203},{o:5203,h:5208,l:5198,c:5200},{n:4,to:5184,vol:7},{n:6,to:5160,vol:7},{range:4,lo:5152,hi:5168,vol:5}]});

const quiz={
 questions:[
  {q:'Define a Judas Swing in ICT terms.',a:'An initial, counter-directional move early in a session (often from the New York midnight or session open) that runs liquidity before price moves in the direction of the Daily Bias.',why:'It is an interpretation that requires bias, timing and subsequent behaviour — not a pattern that can be confirmed at the moment of the sweep.'},
  {q:'Is every liquidity sweep a Judas Swing? Explain.',a:'No. A sweep is any trade through a relevant high/low; a Judas Swing additionally needs session timing, a Daily Bias opposite to the initial move, and subsequent displacement/structure in the bias direction.',why:'A Judas Swing may involve a sweep, but most sweeps do not meet the other conditions.'},
  {q:'On a bullish day, what does the bullish Judas Swing look like relative to the midnight open?',a:'Price first trades below the midnight open (the false move down), sweeps sell-side liquidity, then reverses with displacement above.',why:'The midnight/session open is the reference; trading below it on a bullish day creates the “discount” for the expected rally.'},
  {q:'Why is the initial sweep not an entry signal by itself?',a:'At the moment of the sweep there is no evidence of reversal; displacement and an MSS/BOS are still required.',why:'Failed Judas Swings — sweeps that continue — are common.'},
  {q:'Convert the London window (02:00–05:00 NY) where a Judas Swing is often studied, to MYT in February and in August 2026.',a:'February (EST): 15:00–18:00 MYT. August (EDT): 14:00–17:00 MYT.',why:'2026 EDT runs 8 March – 1 November; MYT = NY + 13 h in EST, + 12 h in EDT.'}],
 charts:[{prompt:'On a 30-minute chart in NY time, mark the midnight open, the Asian range and the first London move. Was the first move with or against your Daily Bias?',answer:'Correct marking uses 00:00 NY as the open; the first move is “against bias” only if bias was set before the session.'},
         {prompt:'Find a day where the initial session move swept liquidity and continued. Label why it was not a Judas Swing.',answer:'No reversal displacement / no MSS; the sweep continued in the same direction, so the interpretation failed.'}],
 practical:{task:'For five sessions, record: bias (pre-set), first move direction vs bias, liquidity swept, displacement yes/no, MSS yes/no, and outcome.',guide:'The log should show how many “first moves against bias” actually became Judas Swings; expect many did not.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 08 · LEVEL 7 · SUBTOPIC 7.5',title:'Understanding Judas Swing',subtitle:'Initial counter-directional move · Liquidity · Timing · Bias',objIn:2,
   objectives:['Define the Judas Swing as an ICT interpretation','Build bullish and bearish Judas Swing models','Use session timing in NY and Malaysia time','Distinguish it from a liquidity sweep and a false breakout'],
   side:{type:'chart',bare:true,axis:false,candles:day,padR:1,reveal:[[0,day.length]],overlays:[O.level(MO,'MIDNIGHT OPEN','gold',{size:12,i0:12})]}}],
  cues:[cue('Welcome to Episode Eight, subtopic seven point five: the Judas Swing.','Selamat datang ke Episod 8, subtopik 7.5: Judas Swing.'),
        cue('This concept brings together everything so far: liquidity, timing, and Daily Bias.','Konsep ini menghimpunkan semua yang telah dipelajari: liquidity, masa, dan Daily Bias.'),
        cue('Our main goal is precision: knowing when the label applies, and when an ordinary sweep is just a sweep.','Matlamat utama kita ialah ketepatan: mengetahui bila label ini sesuai digunakan, dan bila sapuan biasa hanyalah sapuan.')]},

 {label:'SCENE 2 · 7.5 · WHAT IS A JUDAS SWING',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · DEFINITION',title:'Judas Swing — an initial false move'},
   {type:'callout',slot:'left',h:330,head:'CMI definition',color:'gold',in:0,size:25,text:'A **Judas Swing** is an ICT interpretation of an **initial, counter-directional move** early in a session — commonly measured from the **New York midnight open or a session open** — that runs liquidity before price moves in the direction of the **Daily Bias**.'},
   {type:'list',slot:'right',icon:'dot',size:25,items:[
     {text:'Named after Judas: a move that “betrays” the early direction',in:1,color:'amber'},
     {text:'Session-based: London and New York opens are studied most',in:2,color:'purple'},{text:'Usually involves a liquidity sweep',in:3,color:'yellow'},
     {text:'Requires a Daily Bias set **before** the move',in:4,color:'green'},{text:'Confirmed only by **later** displacement + structure',in:5,color:'green'},{text:'Not proof of deliberate manipulation',in:6,color:'red'}]}],
  cues:[cue('A Judas Swing is an I C T interpretation of an initial, counter-directional move early in a session, that runs liquidity before price moves in the direction of the Daily Bias.','Judas Swing ialah tafsiran ICT bagi pergerakan awal yang bertentangan arah pada awal sesi, yang menyapu liquidity sebelum harga bergerak mengikut arah Daily Bias.'),
        cue('The name suggests betrayal: the early move misleads traders who follow it.','Namanya membayangkan pengkhianatan: pergerakan awal itu mengelirukan trader yang mengikutinya.'),
        cue('It is session-based. The London and New York opens are where it is studied most, often measured from the New York midnight open.','Ia berasaskan sesi. Pembukaan London dan New York ialah tempat ia paling banyak dikaji, sering diukur dari midnight open New York.'),
        cue('It usually involves a liquidity sweep.','Ia biasanya melibatkan sapuan liquidity.'),
        cue('It requires a Daily Bias set before the move. Otherwise, “counter-directional” has no meaning.','Ia memerlukan Daily Bias yang ditetapkan sebelum pergerakan berlaku. Jika tidak, “bertentangan arah” tidak bermakna.'),
        cue('And it is confirmed only later, by displacement and structure in the bias direction.','Dan ia hanya disahkan kemudian, melalui displacement dan struktur ke arah bias.'),
        cue('Like manipulation, the term describes price behaviour. It is not proof of deliberate manipulation by anyone.','Seperti manipulation, istilah ini menerangkan tingkah laku harga. Ia bukan bukti manipulasi yang disengajakan oleh sesiapa.')]},

 {label:'SCENE 3 · 7.5 · BULLISH JUDAS SWING',layout:'chart',comps:[
   {type:'chart',slot:'main',title:TT,note:'ILLUSTRATIVE',tag:'BULLISH JUDAS SWING',tagColor:'green',candles:day,xlabels:XL(day.length),reveal:[[1,12],[2,16],[3,18],[4,19],[5,22],[7,day.length]],
    overlays:[O.text(2,'h','DAILY BIAS: BULLISH','green',{in:0,dy:-30,anchor:'start',size:16,inter:true}),O.band(4,11,'ASIAN RANGE','cyan',{in:1,back:true,alpha:0.06}),O.band(16,21,'LONDON KZ','purple',{in:2,back:true,alpha:0.07}),
      O.level(MO,'MIDNIGHT OPEN','gold',{i0:12,in:1,lpos:'right',size:13}),O.level(AL,'ASIAN LOW · SSL','yellow',{i0:4,in:1,below:true,size:13}),
      O.sweep(17,'low',AL,'POTENTIAL JUDAS SWING','amber',{in:3,level:AL}),O.bos(15,21,'h','MSS','white','up',{in:6}),O.level(PDH,'BSL · PDH','yellow',{in:7}),O.sweep(29,'high',PDH,'','yellow',{in:7,level:PDH})],
    checks:[{sweepBelow:[17,AL]},{closeBelow:[16,MO]},{closeAbove:[19,MO]},{sweepAbove:[29,PDH]}]},
   {type:'notes',slot:'side',eyebrow:'7.5 · BULLISH MODEL',title:'Eight steps',items:[
     {text:'1 · Bullish Daily Bias (set beforehand)',in:0,size:21,color:'green'},{text:'2 · Reference: midnight open + Asian range',in:1,size:21},{text:'3 · Price initially moves down',in:2,size:21,color:'amber'},
     {text:'4 · Sell-side liquidity is swept',in:3,size:21,color:'amber'},{text:'5 · Downward move fails to sustain',in:4,size:21},{text:'6 · Bullish displacement',in:5,size:21,color:'green'},
     {text:'7 · Possible bullish MSS',in:6,size:21,color:'green'},{text:'8 · Move toward buy-side liquidity',in:7,size:21,color:'yellow'}]}],
  cues:[cue('The bullish Judas Swing model. Step one: the Daily Bias is bullish, established before the session.','Model Judas Swing bullish. Langkah satu: Daily Bias ialah bullish, ditetapkan sebelum sesi.'),
        cue('Step two: identify the references. The New York midnight open, and the Asian range.','Langkah dua: kenal pasti rujukan. Midnight open New York, dan range Asia.'),
        cue('Step three: at the London open, price initially moves down, below the midnight open.','Langkah tiga: pada pembukaan London, harga mula bergerak turun, di bawah midnight open.'),
        cue('Step four: it sweeps sell-side liquidity below the Asian low. This is only a potential Judas Swing at this point.','Langkah empat: ia menyapu sell-side liquidity di bawah Asian low. Pada tahap ini ia hanya potensi Judas Swing.'),
        cue('Step five: the downward move fails to sustain. Price stops making progress lower.','Langkah lima: pergerakan turun gagal bertahan. Harga berhenti membuat kemajuan ke bawah.'),
        cue('Step six: bullish displacement develops, back above the midnight open.','Langkah enam: bullish displacement terbentuk, kembali di atas midnight open.'),
        cue('Step seven: a possible bullish market structure shift above the last lower high.','Langkah tujuh: kemungkinan bullish market structure shift di atas lower high terakhir.'),
        cue('Step eight: price moves toward buy-side liquidity, here the previous day high. Only now, with context and confirmation, does the Judas Swing label fit.','Langkah lapan: harga bergerak ke arah buy-side liquidity, di sini previous day high. Hanya sekarang, dengan konteks dan pengesahan, label Judas Swing sesuai digunakan.')]},

 {label:'SCENE 4 · 7.5 · BEARISH JUDAS SWING',layout:'chart',comps:[
   {type:'chart',slot:'main',title:TT,note:'ILLUSTRATIVE',tag:'BEARISH JUDAS SWING',tagColor:'red',candles:dayB,xlabels:XL(dayB.length),reveal:[[1,12],[2,16],[3,18],[4,22],[6,dayB.length]],
    overlays:[O.text(2,'l','DAILY BIAS: BEARISH','red',{in:0,dy:40,anchor:'start',size:16,inter:true}),O.band(4,11,'ASIAN RANGE','cyan',{in:1,back:true,alpha:0.06}),O.band(16,21,'LONDON KZ','purple',{in:2,back:true,alpha:0.07}),
      O.level(2*M-MO,'MIDNIGHT OPEN','gold',{i0:12,in:1,size:13}),O.level(2*M-AL,'ASIAN HIGH · BSL','yellow',{i0:4,in:1,size:13}),
      O.sweep(17,'high',2*M-AL,'POTENTIAL JUDAS SWING','amber',{in:3,level:2*M-AL}),O.bos(15,21,'l','MSS','white','down',{in:5,below:true}),O.level(2*M-PDH,'SSL · PDL','yellow',{in:6,below:true}),O.sweep(29,'low',2*M-PDH,'','yellow',{in:6,level:2*M-PDH})],
    checks:[{sweepAbove:[17,2*M-AL]},{closeAbove:[16,2*M-MO]},{sweepBelow:[29,2*M-PDH]}]},
   {type:'notes',slot:'side',eyebrow:'7.5 · BEARISH MODEL',title:'Eight steps',items:[
     {text:'1 · Bearish Daily Bias (set beforehand)',in:0,size:21,color:'red'},{text:'2 · Reference: midnight open + Asian range',in:1,size:21},{text:'3 · Price initially moves up',in:2,size:21,color:'amber'},
     {text:'4 · Buy-side liquidity is swept',in:3,size:21,color:'amber'},{text:'5 · Upward move fails to sustain',in:4,size:21},{text:'6 · Bearish displacement',in:4,size:21,color:'red'},
     {text:'7 · Possible bearish MSS',in:5,size:21,color:'red'},{text:'8 · Move toward sell-side liquidity',in:6,size:21,color:'yellow'}]}],
  cues:[cue('The bearish Judas Swing is the mirror image. Step one: a bearish Daily Bias, set before the session.','Judas Swing bearish ialah imej cerminnya. Langkah satu: Daily Bias bearish, ditetapkan sebelum sesi.'),
        cue('Step two: the midnight open and the Asian range as references.','Langkah dua: midnight open dan range Asia sebagai rujukan.'),
        cue('Step three: price initially moves up, above the midnight open.','Langkah tiga: harga mula bergerak naik, di atas midnight open.'),
        cue('Step four: it sweeps buy-side liquidity above the Asian high.','Langkah empat: ia menyapu buy-side liquidity di atas Asian high.'),
        cue('Steps five and six: the rally fails to sustain, and bearish displacement follows.','Langkah lima dan enam: kenaikan gagal bertahan, dan bearish displacement menyusul.'),
        cue('Step seven: a possible bearish market structure shift.','Langkah tujuh: kemungkinan bearish market structure shift.'),
        cue('Step eight: price moves toward sell-side liquidity below.','Langkah lapan: harga bergerak ke arah sell-side liquidity di bawah.')]},

 {label:'SCENE 5 · 7.5 · SESSION TIMING',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · TIMING',title:'Where Judas Swings are usually studied'},
   {type:'table',slot:'main',cols:['Reference / window','New York time','MYT when NY on EDT','MYT when NY on EST'],widths:['34%','22%','22%','22%'],size:23,rows:[
     {cells:['New York midnight open','00:00','12:00 (noon)','13:00'],in:0,color:'gold'},
     {cells:['London Kill Zone','02:00 – 05:00','14:00 – 17:00','15:00 – 18:00'],in:1,color:'purple'},
     {cells:['New York AM Kill Zone','07:00 – 10:00','19:00 – 22:00','20:00 – 23:00'],in:2,color:'blue'}]},
   {type:'callout',r:[120,470,1680,190],head:'Timing is context',color:'cyan',in:3,size:24,text:'Session opens are where false moves are most often **studied** — not where they must occur. Many sessions open without any Judas Swing. 2026: EDT from 8 March to 1 November.'}],
  cues:[cue('Judas Swings are usually studied around specific times. The New York midnight open is midnight New York time: noon in Malaysia during daylight time, or one p m during standard time.','Judas Swing biasanya dikaji di sekitar waktu tertentu. Midnight open New York ialah tengah malam waktu New York: tengah hari di Malaysia semasa waktu daylight, atau 1 petang semasa waktu standard.'),
        cue('The London window, two to five a m New York, is two to five p m in Malaysia during E D T, and three to six p m during E S T.','Tetingkap London, 2 hingga 5 pagi New York, ialah 2 hingga 5 petang di Malaysia semasa EDT, dan 3 hingga 6 petang semasa EST.'),
        cue('The New York morning window is seven to ten p m Malaysia time during E D T, and eight to eleven p m during E S T.','Tetingkap pagi New York ialah 7 hingga 10 malam waktu Malaysia semasa EDT, dan 8 hingga 11 malam semasa EST.'),
        cue('But timing is context. These are where false moves are most often studied, not where they must occur. Many sessions open without any Judas Swing at all.','Tetapi masa ialah konteks. Di sinilah pergerakan palsu paling kerap dikaji, bukan di mana ia mesti berlaku. Banyak sesi dibuka tanpa sebarang Judas Swing.')]},

 {label:'SCENE 6 · 7.5 · JUDAS SWING AND DAILY BIAS',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:'DAILY',note:false,tag:'BULLISH BIAS',tagColor:'green',candles:D.cs,padR:3,reveal:[[0,D.cs.length]],overlays:[O.level(D.H,'BSL · DOL','yellow',{i0:D.sh3,size:13}),O.zone(D.L,D.EQ,D.sl2,D.cur+2,'DISCOUNT','green',{alpha:0.06,stroke:false,lpos:'below'})]},
   {type:'chart',slot:'right',compact:true,title:'30M · NY',note:false,tag:'INITIAL MOVE: DOWN',tagColor:'amber',candles:day,padR:2,reveal:[[1,18],[2,day.length]],
    overlays:[O.level(MO,'MIDNIGHT OPEN','gold',{i0:12,size:13,in:1}),O.sweep(17,'low',AL,'SSL TAKEN','amber',{in:1,level:AL}),O.bos(15,21,'h','MSS','white','up',{in:2})]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:3,text:'Bias says **up**. The first move goes **down** and creates liquidity. Displacement + MSS provide the extra evidence.'}],
  cues:[cue('Here is the relationship with Daily Bias. On the left, the daily chart sets a bullish bias, with buy-side liquidity as the draw.','Ini hubungan dengan Daily Bias. Di sebelah kiri, carta harian menetapkan bias bullish, dengan buy-side liquidity sebagai draw.'),
        cue('On the right, the session’s first move goes the other way. Price falls below the midnight open and takes sell-side liquidity.','Di sebelah kanan, pergerakan pertama sesi itu bergerak ke arah bertentangan. Harga jatuh di bawah midnight open dan mengambil sell-side liquidity.'),
        cue('The initial move creates the liquidity, and the better price, before the expected direction. Displacement and a structure shift then provide additional evidence.','Pergerakan awal mencipta liquidity, dan harga yang lebih baik, sebelum arah yang dijangka. Displacement dan anjakan struktur kemudian memberikan bukti tambahan.'),
        cue('In a bearish bias, everything inverts: the first move goes up, takes buy-side liquidity, then fails.','Dalam bias bearish, semuanya terbalik: pergerakan pertama naik, mengambil buy-side liquidity, kemudian gagal.')]},

 {label:'SCENE 7 · 7.5 · JUDAS SWING VS LIQUIDITY SWEEP',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · MANDATORY COMPARISON',title:'Liquidity Sweep vs Judas Swing'},
   {type:'cards',slot:'main',size:25,cards:[
     {title:'Liquidity Sweep',color:'yellow',in:0,h:430,items:[{text:'Price trades through a relevant high or low',in:[0,0.5]},{text:'Can occur in any market context',in:1},{text:'Does not imply reversal by itself',in:1},{text:'No specific session model required',in:2}]},
     {title:'Judas Swing',color:'gold',in:3,h:430,items:[{text:'ICT-specific interpretation of an initial deceptive move',in:[3,0.5]},{text:'Discussed within session-based price delivery',in:4},{text:'Often involves a liquidity sweep',in:4},{text:'Needs Daily Bias + timing + later confirmation',in:5}]}]},
   {type:'callout',r:[120,620,1680,90],head:'Rule',color:'red',in:6,size:25,text:'A Judas Swing may involve a sweep — but **not every liquidity sweep is a Judas Swing**.'}],
  cues:[cue('This comparison is mandatory. A liquidity sweep is simply price trading through a relevant high or low.','Perbandingan ini wajib. Sapuan liquidity hanyalah harga yang didagangkan melepasi high atau low yang relevan.'),
        cue('It can happen in any context, and by itself it does not imply a reversal.','Ia boleh berlaku dalam apa jua konteks, dan dengan sendirinya ia tidak membayangkan pembalikan.'),
        cue('It does not require any session model.','Ia tidak memerlukan sebarang model sesi.'),
        cue('A Judas Swing is an I C T-specific interpretation of an initial deceptive move.','Judas Swing ialah tafsiran khusus ICT bagi pergerakan awal yang mengelirukan.'),
        cue('It is discussed within session-based delivery, and it often involves a sweep.','Ia dibincangkan dalam konteks price delivery berasaskan sesi, dan ia sering melibatkan sapuan.'),
        cue('But it also needs a Daily Bias, relevant timing, and later confirmation.','Tetapi ia juga memerlukan Daily Bias, masa yang relevan, dan pengesahan kemudian.'),
        cue('So: a Judas Swing may involve a liquidity sweep, but not every liquidity sweep is a Judas Swing.','Jadi: Judas Swing mungkin melibatkan sapuan liquidity, tetapi bukan setiap sapuan liquidity ialah Judas Swing.')]},

 {label:'SCENE 8 · 7.5 · JUDAS SWING VS FALSE BREAKOUT',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · COMPARISON',title:'Judas Swing vs a classic false breakout'},
   {type:'table',slot:'main',cols:['','Classic false breakout','Judas Swing (ICT)'],widths:['20%','40%','40%'],size:23,rows:[
     {cells:['Similarity','Price breaks a level, then returns','Price breaks a level, then returns'],in:0,color:'gold'},
     {cells:['Methodology','General technical analysis (e.g. failed breakout / bull or bear trap)','ICT session-based price delivery'],in:1},
     {cells:['Liquidity','Optional in the explanation','Central: which liquidity was run?'],in:2,color:'yellow'},
     {cells:['Timing','Any time','Early in a session, from a defined open'],in:3,color:'purple'},
     {cells:['Daily Bias','Not required','Required — the move is counter to bias'],in:4,color:'green'},
     {cells:['After the move','Return into range is enough','Displacement + expansion in bias direction'],in:5,color:'cyan'}]}],
  cues:[cue('How does a Judas Swing differ from a classic false breakout? They look similar: a level breaks, then price returns.','Bagaimana Judas Swing berbeza daripada false breakout klasik? Kedua-duanya kelihatan serupa: satu paras pecah, kemudian harga kembali.'),
        cue('The methodology differs. False breakouts, or bull and bear traps, belong to general technical analysis. Judas Swing belongs to I C T’s session-based model.','Metodologinya berbeza. False breakout, atau bull trap dan bear trap, tergolong dalam analisis teknikal umum. Judas Swing tergolong dalam model ICT berasaskan sesi.'),
        cue('Liquidity is central to a Judas Swing. Which liquidity was run?','Liquidity adalah teras bagi Judas Swing. Liquidity manakah yang disapu?'),
        cue('Timing matters: it happens early in a session, measured from a defined open.','Masa penting: ia berlaku pada awal sesi, diukur dari pembukaan yang ditakrifkan.'),
        cue('A Daily Bias is required, because the move must be counter to it.','Daily Bias diperlukan, kerana pergerakan itu mesti bertentangan dengannya.'),
        cue('And what follows matters: displacement and expansion in the bias direction. So, not every false breakout is a Judas Swing.','Dan apa yang menyusul penting: displacement dan pengembangan ke arah bias. Jadi, bukan setiap false breakout ialah Judas Swing.')]},

 {label:'SCENE 9 · 7.5 · FAILED JUDAS SWINGS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · FAILURES',title:'When the “Judas Swing” never turns'},
   {type:'chart',r:[120,160,540,440],compact:true,title:'30M · NY',note:false,tag:'1 · SWEEP & CONTINUE',tagColor:'red',candles:j1,reveal:[[0,j1.length]],overlays:[O.level(AL,'ASIAN LOW','cyan',{i0:4,size:12,below:true})],checks:[{noCloseAbove:[17,j1.length-1,AL]}]},
   {type:'chart',r:[690,160,540,440],compact:true,title:'30M · NY',note:false,tag:'2 · NO DISPLACEMENT',tagColor:'amber',candles:j2,reveal:[[1,j2.length]],overlays:[O.level(AL,'ASIAN LOW','cyan',{i0:4,size:12,below:true,in:1})],checks:[{sweepBelow:[17,AL]}]},
   {type:'chart',r:[1260,160,540,440],compact:true,title:'30M · NY',note:false,tag:'3 · NO STRUCTURE SHIFT',tagColor:'amber',candles:j3,reveal:[[2,j3.length]],overlays:[O.level(AL,'ASIAN LOW','cyan',{i0:4,size:12,below:true,in:2}),O.level(j3[16][1],'LOWER HIGH HOLDS','red',{i0:16,size:12,in:2})],checks:[{noCloseAbove:[17,j3.length-1,j3[16][1]]}]},
   {type:'text',r:[120,630,1680],size:22,color:'grey',align:'center',in:4,text:'Also: price stays in consolidation · or the Daily Bias itself becomes invalid. **The sweep alone is never the entry signal.**'}],
  cues:[cue('Now the failures. Failure one: the initial move sweeps liquidity and simply continues in the same direction.','Kini kegagalan. Kegagalan satu: pergerakan awal menyapu liquidity dan terus bergerak ke arah yang sama.'),
        cue('Failure two: the sweep happens, but no displacement follows. Price drifts sideways.','Kegagalan dua: sapuan berlaku, tetapi tiada displacement yang menyusul. Harga bergerak mendatar.'),
        cue('Failure three: price bounces, but never breaks the last lower high. No meaningful structure shift develops, and the decline resumes.','Kegagalan tiga: harga melantun, tetapi tidak pernah memecah lower high terakhir. Tiada anjakan struktur yang bermakna, dan penurunan bersambung.'),
        cue('There are two more. Price can remain in consolidation all session, or the assumed Daily Bias itself can become invalid.','Ada dua lagi. Harga boleh kekal dalam konsolidasi sepanjang sesi, atau Daily Bias yang diandaikan itu sendiri boleh menjadi tidak sah.'),
        cue('This is why the initial sweep should never be treated as an entry signal by itself.','Inilah sebabnya sapuan awal tidak sepatutnya dianggap sebagai isyarat kemasukan dengan sendirinya.')]},

 {label:'SCENE 10 · 7.5 · COMMON MISTAKES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.5 · COMMON MISTAKES',title:'Seven Judas Swing mistakes'},
   {type:'list',slot:'main',icon:'x',cols:2,size:26,items:[
     {text:'Calling every liquidity sweep a Judas Swing',in:0},{text:'Ignoring session timing',in:1},{text:'Ignoring Daily Bias',in:2},{text:'Entering before evidence of a directional shift',in:3},
     {text:'Assuming every initial move is deceptive',in:4},{text:'Treating it as proof of institutional manipulation',in:5},{text:'Ignoring alternative market explanations',in:6}]}],
  cues:[cue('Common mistakes. Calling every liquidity sweep a Judas Swing.','Kesilapan biasa. Menggelar setiap sapuan liquidity sebagai Judas Swing.'),
        cue('Ignoring session timing.','Mengabaikan masa sesi.'),
        cue('Ignoring the Daily Bias.','Mengabaikan Daily Bias.'),
        cue('Entering before there is evidence of a directional shift.','Memasuki dagangan sebelum ada bukti anjakan arah.'),
        cue('Assuming every initial move is deceptive. Many first moves are genuine.','Menganggap setiap pergerakan awal mengelirukan. Banyak pergerakan pertama adalah tulen.'),
        cue('Treating the concept as proof of institutional manipulation.','Menganggap konsep ini sebagai bukti manipulasi institusi.'),
        cue('And ignoring alternative explanations, such as news, or a genuine change in sentiment.','Dan mengabaikan penjelasan alternatif, seperti berita, atau perubahan sentimen yang tulen.')]},

 {label:'SCENE 11 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Judas Swing — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'An initial counter-bias move early in a session',in:0},{text:'Measured from the NY midnight or session open',in:0},
     {text:'Usually sweeps liquidity — but a sweep is not enough',in:1},{text:'Needs bias + timing + displacement + structure',in:1},
     {text:'Not every sweep or false breakout is a Judas Swing',in:2},{text:'No confirmation → no Judas Swing',in:3}]}],
  cues:[cue('To summarise. A Judas Swing is an initial, counter-bias move early in a session, measured from a defined open.','Sebagai rumusan. Judas Swing ialah pergerakan awal yang bertentangan dengan bias pada awal sesi, diukur dari pembukaan yang ditakrifkan.'),
        cue('It usually sweeps liquidity, but it also needs bias, timing, displacement and structure.','Ia biasanya menyapu liquidity, tetapi ia juga memerlukan bias, masa, displacement dan struktur.'),
        cue('Not every sweep, and not every false breakout, is a Judas Swing.','Bukan setiap sapuan, dan bukan setiap false breakout, ialah Judas Swing.'),
        cue('No confirmation, no Judas Swing.','Tiada pengesahan, tiada Judas Swing.')]},
 ...quizScenes(8,quiz,12),
 disclaimer('Next: Episode 09 — Bullish and Bearish Judas Swing Models','SCENE 15 · DISCLAIMER'),
];
module.exports={meta:meta(8,'Understanding Judas Swing'),scenes,quiz,j1,j2,j3};
