// EPISODE 05 — KILL ZONES AND MARKET SESSION APPLICATION (extended lesson, Subtopic 7.3)
'use strict';
const {meta,mirror,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
const {day,LH,LL,NYH,NYL}=require('./ep04');
const T=i=>{const m=(18*60+30*i)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
const XL=n=>[0,4,12,16,22,26,32].filter(i=>i<n).map(i=>({i,text:T(i)}));
const TT='ILLUSTRATIVE 24-HOUR MARKET · 30M · NY TIME';
const sess=(inA,inL,inN,extra=[])=>[O.band(4,11,'ASIAN KZ','cyan',{in:inA,back:true,alpha:0.07}),O.band(16,21,'LONDON KZ','purple',{in:inL,back:true,alpha:0.07}),O.band(26,31,'NY AM KZ','blue',{in:inN,back:true,alpha:0.07}),...extra];
const asiaHi=5224, asiaLo=5196, PDH=5262, PDL=5168, M=5215;
const dayB=mirror(day,M); // bearish London example
const asia=[{n:4,to:5210,vol:6},{range:8,lo:5196,hi:5224,touchHi:[2,6],touchLo:[3,7],vol:6,end:5212},{range:4,lo:5200,hi:5222,vol:5,end:5214}];
const f1=gen({start:5214,seed:51,vol:7,steps:[...asia,{o:5214,h:5232,l:5210,c:5230},{n:5,to:5262,vol:8},{range:4,lo:5250,hi:5272,vol:6,end:5262},{n:6,to:5292,vol:8},{range:5,lo:5278,hi:5298,vol:6}]});
const f2=gen({start:5214,seed:52,vol:7,steps:[...asia,{o:5214,h:5216,l:5190,c:5192},{n:5,to:5162,vol:8},{n:4,to:5150,vol:7},{range:3,lo:5140,hi:5160,vol:5,end:5148},{n:6,to:5118,vol:8},{range:4,lo:5108,hi:5126,vol:5}]});
const f3=gen({start:5214,seed:53,vol:7,steps:[...asia,{o:5214,h:5226,l:5208,c:5224},{n:5,to:5252,vol:8},{range:4,lo:5240,hi:5258,vol:6,end:5250},{o:5250,h:5256,l:5232,c:5234},{n:6,to:5186,vol:9},{range:4,lo:5176,hi:5196,vol:6}]});
const f4=gen({start:5214,seed:54,vol:6,steps:[...asia,{range:6,lo:5206,hi:5230,vol:6,end:5220},{range:7,lo:5210,hi:5232,vol:5,end:5222},{o:5222,h:5268,l:5176,c:5238},{range:6,lo:5212,hi:5254,vol:9}]});
const f5=gen({start:5214,seed:55,vol:5,steps:[...asia,{range:20,lo:5198,hi:5228,vol:5}]});

const quiz={
 questions:[
  {q:'What are the Asian high and Asian low, and how are they used?',a:'The highest high and lowest low printed inside the Asian window (20:00–00:00 NY); later sessions may use them as liquidity references.',why:'They are reference levels for later sessions, not targets that must be hit.'},
  {q:'Describe a bullish London scenario using the Asian range.',a:'London trades below the Asian low (sweep), reverses with displacement and expands higher, often setting the day’s low early.',why:'This is one possible behaviour; London may also continue through the Asian low.'},
  {q:'Why does the NY AM window often show news-related volatility?',a:'Many scheduled US economic releases are at 08:30 New York time, inside the NY AM window.',why:'News can cause sweeps in both directions; a large candle at release time is not by itself a model signal.'},
  {q:'What is session range mapping?',a:'Marking Asian, London and NY highs/lows plus PDH/PDL so that each session’s extremes become reference levels.',why:'Mapping turns time into price references, which keeps the analysis anchored to liquidity rather than the clock.'},
  {q:'London trends down all session and NY continues lower. Which “model” failed, and what is the correct response?',a:'The expected London sweep-and-reverse model failed; follow what the chart shows (continuation) and do not force a reversal.',why:'Session models are possibilities. Observing actual structure is the priority.'}],
 charts:[{prompt:'For one week, record the Asian high/low and note whether London traded through either side. Tally the outcomes.',answer:'A fair tally includes “neither” and “both” outcomes; this shows how often the textbook sweep actually occurs.'},
         {prompt:'Map Asian, London and NY ranges plus PDH/PDL on one day. Identify which level was reached last.',answer:'All five reference levels should be drawn at exact session extremes in New York time.'}],
 practical:{task:'Pick a day with a high-impact US release at 08:30 NY. Describe the behaviour before, during and after the release, and whether any Kill Zone model was valid.',guide:'Note abnormal wicks, both-side sweeps and widened spreads; a strong answer explains why the model might be suspended around news.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 05 · LEVEL 7 · SUBTOPIC 7.3 (EXTENDED)',title:'Kill Zones in Session Application',subtitle:'Asian range · London · New York · Session range mapping',objIn:1,
   objectives:['Describe what is studied in each session','Read bullish and bearish London scenarios','Map session highs and lows as references','Recognise failed session patterns'],
   side:{type:'chart',bare:true,axis:false,candles:day,padR:1,reveal:[[0,day.length]],overlays:sess(0,0,0).map(b=>Object.assign(b,{label:null}))}}],
  cues:[cue('Welcome to Episode Five, an extended lesson on Kill Zones. Now we apply the schedule to price.','Selamat datang ke Episod 5, pelajaran lanjutan tentang Kill Zones. Kini kita aplikasikan jadual tersebut pada harga.'),
        cue('We will walk through the Asian, London and New York sessions, map their ranges, and study what happens when the textbook pattern does not appear.','Kita akan meneliti sesi Asia, London dan New York, memetakan range mereka, dan mengkaji apa yang berlaku apabila corak buku teks tidak muncul.'),
        cue('All charts use New York time and the C M I reference schedule from Episode Four.','Semua carta menggunakan waktu New York dan jadual rujukan CMI daripada Episod 4.')]},

 {label:'SCENE 2 · 7.3 · ASIAN SESSION',layout:'chart',comps:[
   {type:'chart',slot:'main',title:TT,note:false,tag:'ASIAN SESSION',tagColor:'cyan',candles:day.slice(0,16),padR:6,xlabels:XL(16),reveal:[[0,4],[1,12],[4,16]],
    overlays:[O.band(4,11,'ASIAN KZ','cyan',{in:1,back:true,alpha:0.08}),O.level(asiaHi,'ASIAN HIGH','cyan',{i0:4,in:2,size:14}),O.level(asiaLo,'ASIAN LOW','cyan',{i0:4,in:2,below:true,size:14}),
      O.zone(asiaHi,asiaHi+8,4,21,'BSL?','yellow',{in:3,alpha:0.12,lpos:'right'}),O.zone(asiaLo-8,asiaLo,4,21,'SSL?','yellow',{in:3,alpha:0.12,lpos:'right'})],
    checks:[{maxHigh:[4,11,asiaHi]},{minLow:[4,11,asiaLo]}]},
   {type:'notes',slot:'side',eyebrow:'7.3 · ASIAN SESSION',title:'What is studied',items:[
     {text:'Often a quieter, range-bound period for FX and US indices',in:1,color:'cyan'},{text:'Asian high and Asian low = the window’s extremes',in:2,color:'cyan'},
     {text:'Stops may rest just beyond them',in:3,color:'yellow'},{text:'Later sessions may interact with these levels',in:4,color:'grey'}]}],
  cues:[cue('The Asian session. In the C M I schedule, the Asian Kill Zone runs from eight p m to midnight, New York time.','Sesi Asia. Dalam jadual CMI, Asian Kill Zone bermula dari 8 malam hingga tengah malam, waktu New York.'),
        cue('For many forex pairs and U S index futures, this is often a quieter, range-bound period.','Bagi kebanyakan pasangan forex dan niaga hadapan indeks AS, ini sering menjadi tempoh yang lebih tenang dan bergerak dalam range.'),
        cue('We mark the Asian high and Asian low: the extremes printed inside the window only.','Kita tandakan Asian high dan Asian low: ekstrem yang tercetak di dalam tetingkap itu sahaja.'),
        cue('Stops may rest just beyond them, so they become potential buy-side and sell-side liquidity.','Stop mungkin berada tepat di luar paras ini, jadi ia menjadi potensi buy-side dan sell-side liquidity.'),
        cue('Later sessions may interact with these levels. May, not must.','Sesi kemudian mungkin berinteraksi dengan paras ini. Mungkin, bukan mesti.')]},

 {label:'SCENE 3 · 7.3 · LONDON SESSION',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TT,note:false,tag:'BULLISH LONDON',tagColor:'green',candles:day.slice(0,24),padR:2,xlabels:XL(24),reveal:[[0,12],[1,24]],
    overlays:[...sess(0,0,99).slice(0,2),O.level(asiaLo,'ASIAN LOW','cyan',{i0:4,below:true,size:13}),O.sweep(17,'low',asiaLo,'SWEEP','amber',{in:1,level:asiaLo}),O.level(LH,'LONDON HIGH','purple',{i0:16,in:2,size:13})],
    checks:[{sweepBelow:[17,asiaLo]},{closeAbove:[19,asiaLo]}]},
   {type:'chart',slot:'right',compact:true,title:TT,note:false,tag:'BEARISH LONDON',tagColor:'red',candles:dayB.slice(0,24),padR:2,xlabels:XL(24),reveal:[[3,12],[3,24]],
    overlays:[...sess(3,3,99).slice(0,2),O.level(2*M-asiaLo,'ASIAN HIGH','cyan',{i0:4,size:13,in:3}),O.sweep(17,'high',2*M-asiaLo,'SWEEP','amber',{in:3,level:2*M-asiaLo}),O.level(2*M-LH,'LONDON LOW','purple',{i0:16,in:4,size:13,below:true})],
    checks:[{sweepAbove:[17,2*M-asiaLo]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:5,text:'London may **reverse** after taking an Asian extreme — or **continue** through it. Read the reaction, not the clock.'}],
  cues:[cue('London. In a bullish scenario, price trades below the Asian low early in the London window.','London. Dalam senario bullish, harga didagangkan di bawah Asian low pada awal tetingkap London.'),
        cue('The sweep is followed by a reclaim and an expansion higher. London then leaves its own high.','Sapuan itu diikuti oleh reclaim dan pengembangan ke atas. London kemudian meninggalkan high tersendiri.'),
        cue('That London high and London low become new references for New York.','London high dan London low itu menjadi rujukan baharu bagi New York.'),
        cue('The bearish scenario is the mirror. London takes the Asian high, then expands lower.','Senario bearish ialah cerminannya. London mengambil Asian high, kemudian berkembang ke bawah.'),
        cue('In both cases, an early London extreme can turn out to be the high or low of the day. But not always.','Dalam kedua-dua kes, ekstrem awal London boleh menjadi high atau low hari tersebut. Tetapi tidak selalu.'),
        cue('London may reverse after taking an Asian extreme, or simply continue through it. Read the reaction, not the clock.','London mungkin berbalik selepas mengambil ekstrem Asia, atau terus bergerak melepasinya. Baca reaksi harga, bukan jam.')]},

 {label:'SCENE 4 · 7.3 · NEW YORK AM',layout:'chart',comps:[
   {type:'chart',slot:'main',title:TT,note:false,tag:'NEW YORK AM',tagColor:'blue',candles:day,xlabels:XL(day.length),reveal:[[0,26],[2,32],[5,day.length]],
    overlays:[...sess(0,0,1),O.level(LH,'LONDON HIGH','purple',{i0:16,in:0,size:13}),O.level(LL,'LONDON LOW','purple',{i0:16,in:0,size:13,below:true}),O.level(PDH,'PDH','yellow',{in:1,lpos:'left'}),O.level(PDL,'PDL','yellow',{in:1,lpos:'left',below:true}),
      O.vline(29,'08:30 · US DATA','amber',{in:3}),O.sweep(29,'high',PDH,'PDH SWEPT','yellow',{in:4,level:PDH})],
    checks:[{isLow:[17,12,day.length-1]},{sweepAbove:[29,PDH]},{sweepAbove:[28,LH]}]},
   {type:'notes',slot:'side',eyebrow:'7.3 · NEW YORK AM',title:'Common reference points',items:[
     {text:'London high and low',in:0,color:'purple'},{text:'Previous day high and low',in:1,color:'yellow'},{text:'Continuation of London — or reversal',in:2,color:'blue'},
     {text:'08:30 NY: many US data releases',in:3,color:'amber'},{text:'Here: London high taken, then PDH swept',in:4,color:'yellow'},{text:'Possible reversal from the PDH — or not',in:5,color:'grey'}]}],
  cues:[cue('The New York morning. We bring in the London high and low.','Pagi New York. Kita masukkan London high dan low.'),
        cue('And the previous day high and low, which are higher-timeframe references.','Dan previous day high dan low, iaitu rujukan timeframe yang lebih tinggi.'),
        cue('New York may continue London’s direction, or reverse it.','New York mungkin meneruskan arah London, atau membalikkannya.'),
        cue('Many scheduled U S economic releases come out at eight thirty New York time, inside this window. Volatility often rises around them.','Banyak siaran ekonomi AS berjadual dikeluarkan pada 8:30 pagi waktu New York, dalam tetingkap ini. Volatiliti sering meningkat di sekitarnya.'),
        cue('In this example, New York continues London’s bullish move, takes the London high, and sweeps the previous day high.','Dalam contoh ini, New York meneruskan pergerakan bullish London, mengambil London high, dan menyapu previous day high.'),
        cue('After that, price pulls back. Whether that becomes a reversal is something only later price can show.','Selepas itu, harga berundur. Sama ada ia menjadi pembalikan hanya boleh ditunjukkan oleh harga kemudian.')]},

 {label:'SCENE 5 · 7.3 · LUNCH AND AFTERNOON',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · NY LUNCH & PM',title:'Lunch and afternoon — participation changes'},
   {type:'cards',slot:'main',size:24,cards:[
     {title:'New York Lunch · 12:00–13:00',color:'neutral',in:0,h:400,items:['Participation often reduces','Consolidation is common','Breakouts in this hour are treated with caution']},
     {title:'New York PM · 13:30–16:00',color:'pink',in:2,h:400,items:['Continuation of the morning move','Or a reversal into the close','Position squaring can create late swings']}]},
   {type:'callout',r:[120,600,1680,100],head:'Key point',color:'gold',in:4,size:24,text:'Time alone does **not** determine direction — the afternoon can trend, reverse or do nothing.'}],
  cues:[cue('Around New York lunch, from noon to one, participation often reduces and price commonly consolidates.','Sekitar waktu makan tengah hari New York, dari 12 hingga 1 petang, penyertaan sering berkurangan dan harga lazimnya berkonsolidasi.'),
        cue('So breakouts during lunch are usually treated with caution.','Jadi breakout semasa waktu makan tengah hari biasanya dilayan dengan berhati-hati.'),
        cue('In the afternoon window, from one thirty to four, price may continue the morning move.','Dalam tetingkap petang, dari 1:30 hingga 4 petang, harga mungkin meneruskan pergerakan pagi.'),
        cue('Or it may reverse into the close, as positions are squared.','Atau ia mungkin berbalik menjelang penutupan, apabila posisi diselaraskan.'),
        cue('The lesson: time alone does not determine direction.','Pengajarannya: masa semata-mata tidak menentukan arah.')]},

 {label:'SCENE 6 · 7.3 · SESSION RANGE MAPPING',layout:'chartfull',comps:[
   {type:'chart',slot:'main',title:TT,note:false,tag:'SESSION RANGE MAP',tagColor:'gold',candles:day,xlabels:XL(day.length),reveal:[[0,day.length]],
    overlays:[...sess(0,0,0),O.level(asiaHi,'ASIAN HIGH','cyan',{i0:4,in:1,size:13}),O.level(asiaLo,'ASIAN LOW','cyan',{i0:4,in:1,below:true,size:13}),
      O.level(LH,'LONDON HIGH','purple',{i0:16,in:2,size:13}),O.level(5186,'LONDON LOW','purple',{i0:16,in:2,below:true,size:13}),
      O.zone(NYL,NYH,26,31,'NY AM RANGE','blue',{in:3,alpha:0.1,lpos:'below'}),O.level(PDH,'PDH','yellow',{in:4,lpos:'left'}),O.level(PDL,'PDL','yellow',{in:4,lpos:'left',below:true})],
    checks:[{maxHigh:[4,11,asiaHi]},{minLow:[4,11,asiaLo]},{maxHigh:[16,21,LH]},{minLow:[16,21,LL]},{maxHigh:[26,31,NYH]},{minLow:[26,31,NYL]}]}],
  cues:[cue('Now we map the whole day. Start with the three session windows.','Kini kita petakan keseluruhan hari. Mulakan dengan tiga tetingkap sesi.'),
        cue('Mark the Asian high and low.','Tandakan Asian high dan low.'),
        cue('Mark the London high and low.','Tandakan London high dan low.'),
        cue('Mark the New York morning range.','Tandakan range pagi New York.'),
        cue('And the previous day high and low.','Dan previous day high dan low.'),
        cue('Each session’s extremes become reference levels and potential liquidity for the next. This map turns time into price references you can actually use.','Ekstrem setiap sesi menjadi paras rujukan dan potensi liquidity bagi sesi seterusnya. Peta ini menukar masa kepada rujukan harga yang benar-benar boleh digunakan.')]},

 {label:'SCENE 7 · 7.3 · FAILED SESSION PATTERNS 1–2',layout:'dual',comps:[
   {type:'chart',slot:'left',compact:true,title:TT,note:false,tag:'1 · NO ASIAN SWEEP',tagColor:'amber',candles:f1,xlabels:XL(f1.length),reveal:[[0,f1.length]],
    overlays:[...sess(0,0,0),O.level(asiaLo,'ASIAN LOW · NEVER TAKEN','cyan',{i0:4,below:true,size:13})],checks:[{minLow:[12,f1.length-1,asiaLo+1]}]},
   {type:'chart',slot:'right',compact:true,title:TT,note:false,tag:'2 · LONDON JUST CONTINUES',tagColor:'amber',candles:f2,xlabels:XL(f2.length),reveal:[[2,f2.length]],
    overlays:[...sess(2,2,2),O.level(asiaLo,'ASIAN LOW','cyan',{i0:4,below:true,size:13,in:2})],checks:[{noCloseAbove:[17,f2.length-1,asiaLo]}]},
   {type:'text',slot:'bottom',size:22,color:'grey',align:'center',in:4,text:'Observe the actual chart — do not force a session model.'}],
  cues:[cue('Session models fail often, so let’s study the failures. Failure one: London never sweeps the Asian low.','Model sesi kerap gagal, jadi mari kita kaji kegagalan tersebut. Kegagalan satu: London tidak pernah menyapu Asian low.'),
        cue('It simply breaks the Asian high and trends higher all day. Anyone waiting for a sweep of the low misses the move.','Ia hanya memecah Asian high dan trend naik sepanjang hari. Sesiapa yang menunggu sapuan low akan terlepas pergerakan itu.'),
        cue('Failure two: London breaks the Asian low and just keeps going.','Kegagalan dua: London memecah Asian low dan terus bergerak.'),
        cue('There is no reclaim. The break was continuation, and New York continues it as well.','Tiada reclaim. Pecahan itu ialah kesinambungan, dan New York juga meneruskannya.'),
        cue('In both cases, the correct response is to observe the actual chart, not to force a session model.','Dalam kedua-dua kes, respons yang betul ialah memerhati carta sebenar, bukan memaksa model sesi.')]},

 {label:'SCENE 8 · 7.3 · FAILED SESSION PATTERNS 3–5',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · FAILED PATTERNS',title:'Reversal, news shock, and nothing at all'},
   {type:'chart',r:[120,160,540,440],compact:true,title:'30M · NY',note:false,tag:'3 · NY REVERSES LONDON',tagColor:'amber',candles:f3,reveal:[[0,f3.length]],overlays:sess(0,0,0).map(b=>Object.assign(b,{label:null})),checks:[{closeBelow:[f3.length-5,5208]}]},
   {type:'chart',r:[690,160,540,440],compact:true,title:'30M · NY',note:false,tag:'4 · NEWS SHOCK',tagColor:'amber',candles:f4,reveal:[[2,f4.length]],overlays:[...sess(2,2,2).map(b=>Object.assign(b,{label:null})),O.vline(29,'08:30','amber',{in:2})],checks:[{sweepAbove:[29,5232]},{sweepBelow:[29,5206]}]},
   {type:'chart',r:[1260,160,540,440],compact:true,title:'30M · NY',note:false,tag:'5 · NO DISPLACEMENT',tagColor:'amber',candles:f5,reveal:[[4,f5.length]],overlays:sess(4,4,4).map(b=>Object.assign(b,{label:null}))},
   {type:'text',r:[120,630,1680],size:22,color:'grey',align:'center',in:6,text:'When the session gives no clear evidence, **no trade** is a valid conclusion.'}],
  cues:[cue('Failure three: London rallies, and New York reverses the entire London move.','Kegagalan tiga: London naik, dan New York membalikkan keseluruhan pergerakan London.'),
        cue('A trader who assumed New York would continue London is now on the wrong side.','Trader yang menganggap New York akan meneruskan arah London kini berada di pihak yang salah.'),
        cue('Failure four: a news release at eight thirty creates one abnormal candle that sweeps both sides of the range.','Kegagalan empat: siaran berita pada 8:30 pagi menghasilkan satu candle luar biasa yang menyapu kedua-dua sisi range.'),
        cue('Sweeps caused by news spikes are not clean model evidence. Treat them with extra caution.','Sapuan yang disebabkan lonjakan berita bukan bukti model yang bersih. Layan dengan lebih berhati-hati.'),
        cue('Failure five: the Kill Zones open and close, and nothing happens. No sweep, no displacement.','Kegagalan lima: Kill Zones dibuka dan ditutup, dan tiada apa yang berlaku. Tiada sapuan, tiada displacement.'),
        cue('That happens more often than social media suggests.','Itu berlaku lebih kerap daripada yang digambarkan di media sosial.'),
        cue('When the session gives no clear evidence, no trade is a valid conclusion.','Apabila sesi tidak memberikan bukti yang jelas, tidak berdagang ialah kesimpulan yang sah.')]},

 {label:'SCENE 9 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Session application — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Asian range → Asian high/low as references',in:0},{text:'London may sweep an Asian extreme — or continue',in:0},
     {text:'NY AM: London extremes, PDH/PDL, 08:30 data',in:1},{text:'Lunch often consolidates; PM can go either way',in:1},
     {text:'Map every session’s high and low',in:2},{text:'Failed patterns are normal — do not force them',in:3}]}],
  cues:[cue('To summarise. The Asian session often forms a range whose extremes become references.','Sebagai rumusan. Sesi Asia sering membentuk range yang ekstremnya menjadi rujukan.'),
        cue('London may sweep an Asian extreme or continue through it. New York interacts with London’s range, the previous day’s levels, and scheduled news.','London mungkin menyapu ekstrem Asia atau terus melepasinya. New York berinteraksi dengan range London, paras hari sebelumnya, dan berita berjadual.'),
        cue('Map every session’s high and low.','Petakan high dan low setiap sesi.'),
        cue('And remember that failed session patterns are normal. Do not force them.','Dan ingat bahawa corak sesi yang gagal adalah perkara biasa. Jangan memaksanya.')]},
 ...quizScenes(5,quiz,10),
 disclaimer('Next: Episode 06 — Understanding Daily Bias','SCENE 13 · DISCLAIMER'),
];
module.exports={meta:meta(5,'Kill Zones and Market Session Application'),scenes,quiz};
