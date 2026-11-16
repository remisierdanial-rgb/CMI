// EPISODE 04 — UNDERSTANDING ICT KILL ZONES (Subtopic 7.3)
'use strict';
const {meta,disclaimer,quizScenes,gen,O,cue}=require('./_lib');
// CMI reference schedule (New York local time). See docs/01_technical_validation.md for sources & variants.
const KZ=[{name:'ASIAN KZ',start:'20:00',end:'00:00',color:'cyan'},{name:'LONDON KZ',start:'02:00',end:'05:00',color:'purple'},
  {name:'NY AM KZ',start:'07:00',end:'10:00',color:'blue'},{name:'NY LUNCH',start:'12:00',end:'13:00',color:'neutral'},{name:'NY PM',start:'13:30',end:'16:00',color:'pink'}];
const zin=(arr)=>KZ.map((z,k)=>Object.assign({},z,{in:arr[k]}));

// 30-minute illustrative 24h chart in NY time, starting 18:00 (candle i => 18:00 + 30min*i)
const T=i=>{const m=(18*60+30*i)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
const PDH=5262, PDL=5168;
const day=gen({start:5214,seed:41,vol:7,steps:[{n:4,to:5210,vol:6},{range:8,lo:5196,hi:5224,touchHi:[2,6],touchLo:[3,7],vol:6,end:5212},{range:4,lo:5200,hi:5222,vol:5,end:5206},
  {o:5206,h:5208,l:5194,c:5197},{o:5197,h:5199,l:5186,c:5190},{o:5190,h:5203,l:5187,c:5201},{o:5201,h:5219,l:5199,c:5216},{n:3,to:5236,vol:9},
  {range:5,lo:5222,hi:5242,vol:6,end:5232},{o:5232,h:5249,l:5228,c:5245},{o:5245,h:5268,l:5240,c:5258},{o:5258,h:5262,l:5246,c:5249},{n:3,to:5238,vol:8},{range:3,lo:5230,hi:5250,vol:6,end:5240}]});
const asiaHi=5224, asiaLo=5196; // Asian KZ candles 4..11
const rng=(a,b)=>[Math.max(...day.slice(a,b+1).map(k=>k[1])),Math.min(...day.slice(a,b+1).map(k=>k[2]))];
const [LH,LL]=rng(16,21), [NYH,NYL]=rng(26,31);
const xl=[0,4,12,16,22,26,32,day.length-1].filter(i=>i<day.length).map(i=>({i,text:T(i)}));

const quiz={
 questions:[
  {q:'What is an ICT Kill Zone, and what is it not?',a:'A time window (New York local time) that ICT methodology highlights for monitoring price; it is not an exchange trading session and not a guarantee of movement or a setup.',why:'Kill Zones are an analytical convention. Exchanges define trading hours; ICT educators define Kill Zones, and their definitions vary.'},
  {q:'Convert the London Kill Zone (02:00–05:00 New York) to Malaysia time on 15 January 2026 and on 15 July 2026.',a:'15 Jan 2026 (EST, +13): 15:00–18:00 MYT. 15 Jul 2026 (EDT, +12): 14:00–17:00 MYT.',why:'Malaysia (UTC+8) has no DST; New York moves between UTC−5 (EST) and UTC−4 (EDT). In 2026 EDT runs 8 March to 1 November.'},
  {q:'Why can one fixed Malaysia-time schedule for New York Kill Zones be wrong for part of the year?',a:'Because New York changes its clock for daylight saving; the MYT equivalent shifts by one hour twice a year.',why:'A schedule built in July (EDT) will be one hour early in January (EST) if not updated.'},
  {q:'FCPO’s afternoon session (14:30–18:00 MYT) overlaps the London Kill Zone in Malaysia time. Does that make it a “London Kill Zone” for FCPO?',a:'No. Clock overlap is not the same as the session definition; FCPO has its own exchange sessions and drivers.',why:'ICT Kill Zones were defined around FX/US index markets. For FCPO, time-of-day behaviour must be studied and tested on FCPO data itself.'},
  {q:'Name two reasons a Kill Zone can be quiet.',a:'No scheduled news / holiday conditions; the instrument’s main participation happens at another time; price is waiting for a later event.',why:'Time windows describe when activity is often studied — not when it must occur.'}],
 charts:[{prompt:'On a 30-minute chart in New York time, shade the Asian, London and NY AM Kill Zones for one day, and mark the Asian high and low.',answer:'Shading should match the CMI schedule (20:00–00:00, 02:00–05:00, 07:00–10:00 NY); Asian high/low are the extremes inside the Asian window only.'},
         {prompt:'Mark FCPO’s morning, afternoon and T+1 sessions on an FCPO chart in Malaysia time, and write the New York equivalent for today’s date.',answer:'Use the official Bursa hours (10:30–12:30, 14:30–18:00, T+1 21:00–23:30 MYT) and subtract 12 h (EDT) or 13 h (EST) depending on the date.'}],
 practical:{task:'Build your own Kill Zone conversion card for the current month: NY window → MYT, including the date New York next changes its clock.',guide:'Check the date against an IANA-based source. In 2026 the change dates are 8 March and 1 November; in 2027, 14 March and 7 November.'}
};

const scenes=[
 {label:'SCENE 1 · INTRODUCTION',layout:'title',comps:[{type:'title',eyebrow:'EPISODE 04 · LEVEL 7 · SUBTOPIC 7.3',title:'Understanding ICT Kill Zones',subtitle:'Time windows · New York time · EST/EDT · FCPO sessions',objIn:2,
   objectives:['Define Kill Zones and why time is studied','Use one consistent CMI reference schedule','Convert New York time to Malaysia time through DST','Separate Kill Zones from official FCPO trading hours']}],
  cues:[cue('Welcome to Episode Four, subtopic seven point three: Kill Zones.','Selamat datang ke Episod 4, subtopik 7.3: Kill Zones.'),
        cue('Until now we have studied where price goes. Kill Zones add a second question: when do we pay closest attention?','Setakat ini kita mengkaji ke mana harga bergerak. Kill Zones menambah soalan kedua: bilakah kita memberi perhatian paling rapi?'),
        cue('We will define them, fix one reference schedule, convert it to Malaysia time correctly, and then look carefully at F C P O.','Kita akan mentakrifnya, menetapkan satu jadual rujukan, menukarnya ke waktu Malaysia dengan betul, dan kemudian meneliti FCPO dengan teliti.')]},

 {label:'SCENE 2 · 7.3 · WHAT IS A KILL ZONE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · DEFINITION',title:'Kill Zones — ICT-defined time windows'},
   {type:'callout',slot:'left',h:300,head:'CMI definition',color:'purple',in:0,size:26,text:'An **ICT Kill Zone** is a time window, stated in **New York local time**, that ICT methodology highlights for monitoring price delivery around major trading sessions.'},
   {type:'list',slot:'right',icon:'dot',size:25,items:[
     {text:'Time is studied because **participation** changes through the day',in:1,color:'cyan'},
     {text:'Session opens can bring orders, news and liquidity runs',in:2,color:'cyan'},
     {text:'**Not** official exchange trading hours',in:3,color:'red'},{text:'**Not** a guaranteed opportunity or a signal',in:4,color:'red'},{text:'Not a universal market law',in:5,color:'red'}]},
   {type:'callout',r:[120,500,810,170],head:'Observe vs interpret',color:'cyan',in:6,size:23,text:'The clock tells you **when to look**. Price tells you **what is happening**.'}],
  cues:[cue('An I C T Kill Zone is a time window, stated in New York local time, that the methodology highlights for monitoring price delivery.','ICT Kill Zone ialah tetingkap masa, dinyatakan dalam waktu tempatan New York, yang ditekankan oleh metodologi ini untuk memantau price delivery.'),
        cue('Time matters because participation changes through the day, as major financial centres open and close.','Masa penting kerana penyertaan pasaran berubah sepanjang hari, apabila pusat kewangan utama dibuka dan ditutup.'),
        cue('Session opens can bring new orders, scheduled news and runs on liquidity.','Pembukaan sesi boleh membawa pesanan baharu, berita berjadual dan larian ke atas liquidity.'),
        cue('But a Kill Zone is not an official exchange trading period. Exchanges define trading hours; I C T educators define Kill Zones.','Tetapi Kill Zone bukan tempoh dagangan rasmi bursa. Bursa menentukan waktu dagangan; pendidik ICT menentukan Kill Zones.'),
        cue('It is also not a guaranteed opportunity. Nothing has to happen because a window has opened.','Ia juga bukan peluang yang dijamin. Tiada apa yang perlu berlaku hanya kerana satu tetingkap telah dibuka.'),
        cue('And it is not a universal law of markets. It is a convention inside one methodology.','Dan ia bukan hukum pasaran sejagat. Ia satu konvensyen dalam satu metodologi.'),
        cue('Think of it this way: the clock tells you when to look. Price tells you what is actually happening.','Fikirkan begini: jam memberitahu bila untuk melihat. Harga memberitahu apa yang sebenarnya berlaku.')]},

 {label:'SCENE 3 · 7.3 · CMI REFERENCE SCHEDULE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · MAJOR KILL ZONES',title:'CMI reference schedule — New York local time',right:'ONE SCHEDULE · USED IN EVERY EPISODE',rightColor:'gold'},
   {type:'table',slot:'main',cols:['Window','New York time','What is typically studied'],widths:['24%','22%','54%'],size:23,rows:[
     {cells:['Asian Kill Zone','20:00 – 00:00','Range formation; Asian high and low as references'],in:1,color:'cyan'},
     {cells:['London Kill Zone','02:00 – 05:00','Interaction with the Asian range; early daily high or low'],in:2,color:'purple'},
     {cells:['New York AM Kill Zone','07:00 – 10:00','US data releases, interaction with London extremes'],in:3,color:'blue'},
     {cells:['New York Lunch','12:00 – 13:00','Often lower participation; consolidation is common'],in:4,color:'neutral'},
     {cells:['New York PM','13:30 – 16:00','Afternoon continuation or reversal'],in:5,color:'pink'}]},
   {type:'text',r:[120,630,1680],size:21,color:'grey',in:6,text:'Other ICT sources use variants (e.g. London 01:00–05:00, NY AM 08:30–11:00, London Close 10:00–12:00). CMI uses the schedule above throughout Level 7.'}],
  cues:[cue('I C T educators and resources do not all use the same windows, so C M I fixes one reference schedule, in New York time, and uses it in every episode.','Pendidik dan sumber ICT tidak semuanya menggunakan tetingkap yang sama, jadi CMI menetapkan satu jadual rujukan, dalam waktu New York, dan menggunakannya dalam setiap episod.'),
        cue('The Asian Kill Zone runs from eight p m to midnight New York time.','Asian Kill Zone bermula dari 8 malam hingga tengah malam waktu New York.'),
        cue('The London Kill Zone runs from two a m to five a m.','London Kill Zone bermula dari 2 pagi hingga 5 pagi.'),
        cue('The New York A M Kill Zone runs from seven to ten a m, around many U S data releases.','New York AM Kill Zone bermula dari 7 hingga 10 pagi, sekitar banyak siaran data AS.'),
        cue('New York Lunch, from noon to one p m, is often a lower-participation period.','New York Lunch, dari tengah hari hingga 1 petang, sering menjadi tempoh penyertaan yang lebih rendah.'),
        cue('And the New York P M window runs from one thirty to four p m.','Dan tetingkap New York PM bermula dari 1:30 hingga 4 petang.'),
        cue('Some sources use variants, such as a later New York morning window. That is fine, as long as you state which definition you use and do not mix them.','Sesetengah sumber menggunakan variasi, seperti tetingkap pagi New York yang lebih lewat. Itu tidak mengapa, asalkan anda nyatakan takrif yang digunakan dan tidak mencampurkannya.')]},

 {label:'SCENE 4 · 7.3 · 24-HOUR TIMELINE',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · TIMELINE',title:'One trading day in New York local time'},
   {type:'timeline',slot:'main',title:'NEW YORK LOCAL TIME · AXIS STARTS 18:00',rowH:200,top:110,rows:[{label:'New York',sub:'local time',offset:0,in:0}],zones:zin([1,2,3,4,4]),
    markers:[{h:0,label:'MIDNIGHT · NY',in:5}]}],
  cues:[cue('Here is the same schedule on a twenty-four hour axis, starting at six p m New York time.','Ini jadual yang sama pada paksi 24 jam, bermula pada 6 petang waktu New York.'),
        cue('The Asian window comes first, from eight p m to midnight.','Tetingkap Asia datang dahulu, dari 8 malam hingga tengah malam.'),
        cue('Then London, from two to five in the morning.','Kemudian London, dari 2 hingga 5 pagi.'),
        cue('Then the New York morning, from seven to ten.','Kemudian pagi New York, dari 7 hingga 10.'),
        cue('Followed by lunch, and the New York afternoon.','Diikuti waktu makan tengah hari, dan petang New York.'),
        cue('Note New York midnight. Many I C T traders use it as a daily reference, which we will return to in the Judas Swing episodes.','Perhatikan tengah malam New York. Ramai trader ICT menggunakannya sebagai rujukan harian, yang akan kita bincang semula dalam episod Judas Swing.')]},

 {label:'SCENE 5 · 7.3 · EST AND EDT',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · TIME ZONES',title:'New York changes its clock. Malaysia does not.'},
   {type:'table',r:[120,170,820,0],cols:['Zone','UTC offset','MYT difference'],size:23,rows:[
     {cells:['Malaysia Time (MYT)','UTC+8 all year','—'],in:0,color:'gold'},
     {cells:['New York Standard (EST)','UTC−5','MYT = NY + 13 h'],in:1,color:'cyan'},
     {cells:['New York Daylight (EDT)','UTC−4','MYT = NY + 12 h'],in:2,color:'purple'}]},
   {type:'table',r:[980,170,820,0],cols:['Year','EDT starts','EDT ends'],size:23,rows:[
     {cells:['2026','Sun 8 March','Sun 1 November'],in:3,color:'gold'},{cells:['2027','Sun 14 March','Sun 7 November'],in:3,color:'gold'}]},
   {type:'cards',r:[980,420,820,250],size:21,cards:[
     {title:'15 Jan 2026 · EST',color:'cyan',in:4,items:['NY 02:00 → **15:00 MYT**','NY 07:00 → **20:00 MYT**']},
     {title:'15 Jul 2026 · EDT',color:'purple',in:5,items:['NY 02:00 → **14:00 MYT**','NY 07:00 → **19:00 MYT**']}]},
   {type:'text',r:[120,470,820],size:21,color:'grey',in:6,text:'Source: IANA Time Zone Database (America/New_York, Asia/Kuala_Lumpur), verified with Python zoneinfo. US rule: DST from the 2nd Sunday of March to the 1st Sunday of November.'}],
  cues:[cue('Malaysia Time is U T C plus eight all year. Malaysia does not observe daylight saving.','Waktu Malaysia ialah UTC+8 sepanjang tahun. Malaysia tidak mengamalkan daylight saving.'),
        cue('New York Standard Time, E S T, is U T C minus five. During E S T, Malaysia is thirteen hours ahead of New York.','New York Standard Time, EST, ialah UTC−5. Semasa EST, Malaysia 13 jam di hadapan New York.'),
        cue('New York Daylight Time, E D T, is U T C minus four. During E D T, Malaysia is twelve hours ahead.','New York Daylight Time, EDT, ialah UTC−4. Semasa EDT, Malaysia 12 jam di hadapan.'),
        cue('In twenty twenty-six, daylight time runs from Sunday the eighth of March to Sunday the first of November. In twenty twenty-seven, from the fourteenth of March to the seventh of November.','Pada tahun 2026, waktu daylight bermula Ahad 8 Mac hingga Ahad 1 November. Pada tahun 2027, dari 14 Mac hingga 7 November.'),
        cue('So on the fifteenth of January twenty twenty-six, two a m in New York is three p m in Malaysia.','Jadi pada 15 Januari 2026, 2 pagi di New York ialah 3 petang di Malaysia.'),
        cue('But on the fifteenth of July, two a m in New York is two p m in Malaysia. Same Kill Zone, different Malaysia time.','Tetapi pada 15 Julai, 2 pagi di New York ialah 2 petang di Malaysia. Kill Zone yang sama, waktu Malaysia yang berbeza.'),
        cue('These dates come from the I A N A time zone database. Always check the date before you convert.','Tarikh-tarikh ini diambil daripada pangkalan data zon waktu IANA. Sentiasa semak tarikh sebelum anda menukar waktu.')]},

 {label:'SCENE 6 · 7.3 · KILL ZONES IN MALAYSIA TIME',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · CONVERSION',title:'Same windows, two Malaysia schedules'},
   {type:'timeline',slot:'main',title:'AXIS POSITIONED BY NEW YORK TIME · LABELS SHOW EACH ROW’S LOCAL CLOCK',rowH:185,top:90,
    rows:[{label:'New York',sub:'local time',offset:0,in:0},{label:'MYT · NY on EDT',sub:'≈ mid-Mar → early Nov',offset:12,in:1,color:'purple'},{label:'MYT · NY on EST',sub:'≈ early Nov → mid-Mar',offset:13,in:2,color:'cyan'}],
    zones:KZ.map(z=>Object.assign({},z,{in:0}))}],
  cues:[cue('Here are the five windows again. The top row is New York time.','Ini lima tetingkap itu sekali lagi. Baris atas ialah waktu New York.'),
        cue('The middle row shows Malaysia time while New York is on daylight time. London becomes two to five p m, and the New York morning becomes seven to ten p m.','Baris tengah menunjukkan waktu Malaysia ketika New York menggunakan waktu daylight. London menjadi 2 hingga 5 petang, dan pagi New York menjadi 7 hingga 10 malam.'),
        cue('The bottom row shows Malaysia time while New York is on standard time. Every window moves one hour later: London is three to six p m, and New York morning is eight to eleven p m.','Baris bawah menunjukkan waktu Malaysia ketika New York menggunakan waktu standard. Setiap tetingkap beralih satu jam lebih lewat: London ialah 3 hingga 6 petang, dan pagi New York ialah 8 hingga 11 malam.'),
        cue('Notice that the Asian window, eight p m to midnight in New York, is the next morning in Malaysia.','Perhatikan bahawa tetingkap Asia, 8 malam hingga tengah malam di New York, ialah pagi keesokan harinya di Malaysia.'),
        cue('So never use one fixed Malaysia-time schedule all year round.','Jadi jangan sekali-kali menggunakan satu jadual waktu Malaysia yang tetap sepanjang tahun.')]},

 {label:'SCENE 7 · 7.3 · A SUBTLE TRAP',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · DST DETAIL',title:'The US and UK change clocks on different dates'},
   {type:'table',slot:'main',cols:['Period (2026)','New York','London','NY 02:00 equals'],size:23,rows:[
     {cells:['Before 8 Mar','EST (UTC−5)','GMT (UTC+0)','07:00 London · 15:00 MYT'],in:1},
     {cells:['8 Mar – 28 Mar','EDT (UTC−4)','GMT (UTC+0)','**06:00** London · 14:00 MYT'],in:2,color:'amber'},
     {cells:['29 Mar – 24 Oct','EDT (UTC−4)','BST (UTC+1)','07:00 London · 14:00 MYT'],in:3},
     {cells:['25 Oct – 31 Oct','EDT (UTC−4)','GMT (UTC+0)','**06:00** London · 14:00 MYT'],in:4,color:'amber'},
     {cells:['From 1 Nov','EST (UTC−5)','GMT (UTC+0)','07:00 London · 15:00 MYT'],in:4}]}],
  cues:[cue('One more detail that catches many traders. The United States and the United Kingdom change their clocks on different dates.','Satu lagi perincian yang sering mengelirukan trader. Amerika Syarikat dan United Kingdom menukar jam pada tarikh yang berbeza.'),
        cue('Before the eighth of March, two a m in New York is seven a m in London.','Sebelum 8 Mac, 2 pagi di New York ialah 7 pagi di London.'),
        cue('From the eighth to the twenty-eighth of March, New York has moved but London has not, so two a m New York is only six a m London.','Dari 8 hingga 28 Mac, New York telah berubah tetapi London belum, jadi 2 pagi New York hanya 6 pagi London.'),
        cue('From late March, both are on summer time, and the usual relationship returns.','Dari akhir Mac, kedua-duanya menggunakan waktu musim panas, dan hubungan biasa kembali.'),
        cue('The same mismatch happens for one week in late October. Because Kill Zones are defined in New York time, check the London relationship in these weeks.','Ketidakpadanan yang sama berlaku selama seminggu pada akhir Oktober. Oleh kerana Kill Zones ditakrifkan dalam waktu New York, semak hubungan dengan London pada minggu-minggu ini.')]},

 {label:'SCENE 8 · 7.3 · KILL ZONES AND LIQUIDITY',layout:'chartfull',comps:[
   {type:'chart',slot:'main',title:'ILLUSTRATIVE 24-HOUR MARKET · 30M · NEW YORK TIME',note:N_(),tag:'SESSION LIQUIDITY',candles:day,xlabels:xl,reveal:[[0,12],[2,16],[3,23],[5,day.length]],
    overlays:[O.band(4,11,'ASIAN KZ','cyan',{in:0,back:true,alpha:0.07}),O.band(16,21,'LONDON KZ','purple',{in:2,back:true,alpha:0.07}),O.band(26,31,'NY AM KZ','blue',{in:5,back:true,alpha:0.07}),
      O.level(asiaHi,'ASIAN HIGH','cyan',{i0:4,in:1,size:13}),O.level(asiaLo,'ASIAN LOW','cyan',{i0:4,in:1,below:true,size:13}),
      O.level(PDH,'PDH','yellow',{in:1,lpos:'left'}),O.level(PDL,'PDL','yellow',{in:1,lpos:'left',below:true}),
      O.sweep(17,'low',asiaLo,'ASIAN LOW SWEPT','amber',{in:3,level:asiaLo}),O.level(LH,'LONDON HIGH','purple',{i0:16,in:4,size:13}),O.sweep(29,'high',PDH,'PDH SWEPT','yellow',{in:6,level:PDH})],
    checks:[{maxHigh:[4,11,asiaHi]},{minLow:[4,11,asiaLo]},{sweepBelow:[17,asiaLo]},{sweepAbove:[29,PDH]},{sweepAbove:[28,LH]},{isHigh:[29,0,day.length-1]}]}],
  cues:[cue('Now let’s connect Kill Zones with Level Three liquidity. This is a thirty-minute chart in New York time. Price ranges during the Asian window.','Kini mari kita kaitkan Kill Zones dengan liquidity Level 3. Ini carta 30 minit dalam waktu New York. Harga bergerak dalam range semasa tetingkap Asia.'),
        cue('The Asian high and Asian low become reference levels, alongside the previous day high and low.','Asian high dan Asian low menjadi paras rujukan, bersama previous day high dan low.'),
        cue('London opens.','London dibuka.'),
        cue('In this example, price sweeps the Asian low during the London window, then reverses higher.','Dalam contoh ini, harga menyapu Asian low semasa tetingkap London, kemudian berbalik naik.'),
        cue('London leaves its own high and low behind, which become references for New York.','London meninggalkan high dan low tersendiri, yang menjadi rujukan bagi New York.'),
        cue('In the New York morning, price trades through the London high and runs toward the previous day high.','Pada pagi New York, harga didagangkan melepasi London high dan bergerak ke arah previous day high.'),
        cue('It sweeps the previous day high, then pulls back. These are possible behaviours around session windows, not mandatory patterns.','Ia menyapu previous day high, kemudian berundur. Ini tingkah laku yang mungkin berlaku di sekitar tetingkap sesi, bukan corak wajib.')]},

 {label:'SCENE 9 · 7.3 · KILL ZONES AND VOLATILITY',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · VOLATILITY',title:'Why a window can be busy — or quiet'},
   {type:'cards',slot:'main',size:24,cards:[
     {title:'Can add activity',color:'green',in:0,h:440,items:['Session opens and overlaps','Higher participation','Scheduled economic releases','Liquidity resting at obvious session highs/lows']},
     {title:'Can reduce activity',color:'amber',in:2,h:440,items:['Holidays, thin participation','Waiting for a later news event','Instrument’s main activity is at another time','Price already reached its objective']}]},
   {type:'text',r:[120,640,1680],size:24,color:'grey',in:4,text:'Different instruments have different trading hours and activity profiles. **No Kill Zone guarantees volatility.**'}],
  cues:[cue('Several things can make a window busy: session opens and overlaps, higher participation, scheduled economic releases.','Beberapa perkara boleh menjadikan tetingkap sibuk: pembukaan dan pertindihan sesi, penyertaan yang lebih tinggi, siaran ekonomi berjadual.'),
        cue('And liquidity resting at obvious session highs and lows.','Dan liquidity yang berada di high dan low sesi yang jelas.'),
        cue('Other things make it quiet: holidays, thin participation, or a market waiting for a later announcement.','Perkara lain menjadikannya senyap: cuti umum, penyertaan yang nipis, atau pasaran yang menunggu pengumuman kemudian.'),
        cue('Sometimes an instrument’s main activity simply happens at another time of day.','Kadangkala aktiviti utama sesuatu instrumen memang berlaku pada waktu lain dalam sehari.'),
        cue('So do not assume every Kill Zone produces high volatility. Different instruments have different activity profiles.','Jadi jangan anggap setiap Kill Zone menghasilkan volatiliti tinggi. Instrumen berbeza mempunyai profil aktiviti yang berbeza.')]},

 {label:'SCENE 10 · 7.3 · FCPO TRADING HOURS',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · FCPO',title:'FCPO has its own exchange sessions',right:'SOURCE: BURSA MALAYSIA DERIVATIVES',rightColor:'dim'},
   {type:'table',slot:'main',cols:['FCPO session (MYT)','Days','New York (EDT)','New York (EST)'],widths:['34%','22%','22%','22%'],size:23,rows:[
     {cells:['Morning · 10:30 – 12:30','Mon – Fri','22:30 – 00:30 (prev. day)','21:30 – 23:30 (prev. day)'],in:1,color:'gold'},
     {cells:['Afternoon · 14:30 – 18:00','Mon – Fri','02:30 – 06:00','01:30 – 05:00'],in:2,color:'gold'},
     {cells:['T+1 after-hours · 21:00 – 23:30','Mon – Thu','09:00 – 11:30','08:00 – 10:30'],in:3,color:'purple'}]},
   {type:'text',r:[120,470,1680],size:21,color:'grey',in:4,text:'Hours per Bursa Malaysia Derivatives FCPO product information (verify the current circular before each intake). Contract: 25 tonnes · tick RM1/t = RM25.'},
   {type:'callout',r:[120,540,1680,150],head:'Do not transfer forex timing mechanically',color:'red',in:5,size:24,text:'The FCPO afternoon session overlaps the London window **on the clock** — that does not make it a London Kill Zone. FCPO responds to its own participants, Dalian and CBOT vegetable-oil trading, ringgit moves and palm-oil data.'}],
  cues:[cue('This is extremely important. F C P O trades on Bursa Malaysia Derivatives, with its own official sessions.','Ini sangat penting. FCPO didagangkan di Bursa Malaysia Derivatives, dengan sesi rasminya sendiri.'),
        cue('The morning session runs from ten thirty to twelve thirty, Malaysia time.','Sesi pagi bermula dari 10:30 hingga 12:30 tengah hari, waktu Malaysia.'),
        cue('The afternoon session runs from two thirty to six p m.','Sesi petang bermula dari 2:30 hingga 6 petang.'),
        cue('And the T plus one after-hours session runs from nine to eleven thirty p m, Monday to Thursday.','Dan sesi after-hours T+1 bermula dari 9 hingga 11:30 malam, Isnin hingga Khamis.'),
        cue('These hours come from Bursa’s published product information. Verify the current circular before each intake, because exchanges do revise hours.','Waktu ini diambil daripada maklumat produk yang diterbitkan Bursa. Sahkan pekeliling terkini sebelum setiap pengambilan pelajar, kerana bursa ada kalanya menyemak semula waktu dagangan.'),
        cue('Notice that the afternoon session overlaps the London window on the clock. That does not make it a London Kill Zone for F C P O.','Perhatikan bahawa sesi petang bertindih dengan tetingkap London dari segi jam. Itu tidak menjadikannya London Kill Zone bagi FCPO.'),
        cue('F C P O responds to its own participants, to Dalian and C B O T vegetable-oil markets, to the ringgit, and to palm-oil data.','FCPO bertindak balas kepada pesertanya sendiri, kepada pasaran minyak sayuran Dalian dan CBOT, kepada ringgit, dan kepada data minyak sawit.')]},

 {label:'SCENE 11 · 7.3 · ADAPTING TO FCPO',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · FCPO',title:'Study FCPO time behaviour on FCPO data'},
   {type:'flow',slot:'main',perRow:4,bh:230,steps:[
     {n:'01',text:'Use official Bursa sessions',sub:'Morning, afternoon, T+1',in:0},
     {n:'02',text:'Mark session open, high, low',sub:'As liquidity references',in:1},
     {n:'03',text:'Log international influence',sub:'Dalian / CBOT hours, USD/MYR, data releases',in:2},
     {n:'04',text:'Test before you rely on it',sub:'Record many sessions, then judge',in:3}]},
   {type:'callout',r:[120,450,1680,150],head:'CMI position',color:'gold',in:4,size:25,text:'Time-of-day behaviour **may** exist in FCPO, but ICT Kill Zones must be **adapted and independently tested** on FCPO — never applied mechanically.'}],
  cues:[cue('So how should we study time in F C P O? First, use the official Bursa sessions as the base.','Jadi bagaimana kita mengkaji masa dalam FCPO? Pertama, gunakan sesi rasmi Bursa sebagai asas.'),
        cue('Second, mark each session’s open, high and low as liquidity references.','Kedua, tandakan open, high dan low setiap sesi sebagai rujukan liquidity.'),
        cue('Third, log international influences: when Dalian and C B O T are trading, ringgit moves, and palm-oil data releases.','Ketiga, catatkan pengaruh antarabangsa: bila Dalian dan CBOT sedang berdagang, pergerakan ringgit, dan siaran data minyak sawit.'),
        cue('Fourth, test before you rely on any time pattern. Record many sessions and then judge.','Keempat, uji sebelum bergantung pada sebarang corak masa. Rekod banyak sesi dan kemudian buat penilaian.'),
        cue('Time-of-day behaviour may exist in F C P O, but Kill Zones must be adapted and independently tested, never applied mechanically.','Tingkah laku mengikut waktu mungkin wujud dalam FCPO, tetapi Kill Zones mesti disesuaikan dan diuji secara bebas, bukan digunakan secara mekanikal.')]},

 {label:'SCENE 12 · 7.3 · COMMON MISTAKES',layout:'stack',comps:[
   {type:'head',eyebrow:'SUBTOPIC 7.3 · COMMON MISTAKES',title:'Eight Kill Zone mistakes'},
   {type:'list',slot:'main',icon:'x',cols:2,size:26,items:[
     {text:'Using outdated session times',in:0},{text:'Ignoring daylight saving time',in:1},{text:'Confusing EST and EDT',in:1},{text:'Assuming every Kill Zone creates a setup',in:2},
     {text:'Treating Kill Zones as official exchange hours',in:3},{text:'Applying forex session assumptions to FCPO',in:4},{text:'Ignoring major economic announcements',in:5},{text:'Entering only because a Kill Zone started',in:6}]}],
  cues:[cue('Common mistakes. Using outdated session times.','Kesilapan biasa. Menggunakan waktu sesi yang sudah lapuk.'),
        cue('Ignoring daylight saving, or confusing E S T with E D T.','Mengabaikan daylight saving, atau mengelirukan EST dengan EDT.'),
        cue('Assuming every Kill Zone creates a setup.','Menganggap setiap Kill Zone menghasilkan setup.'),
        cue('Treating Kill Zones as official exchange periods.','Menganggap Kill Zones sebagai tempoh rasmi bursa.'),
        cue('Applying forex session assumptions directly to F C P O.','Menggunakan andaian sesi forex terus kepada FCPO.'),
        cue('Ignoring major economic announcements.','Mengabaikan pengumuman ekonomi utama.'),
        cue('And entering a trade only because a Kill Zone has started.','Dan memasuki dagangan hanya kerana Kill Zone telah bermula.')]},

 {label:'SCENE 13 · SUMMARY',layout:'stack',comps:[
   {type:'head',eyebrow:'KEY LEARNING POINTS',title:'Kill Zones — what to remember'},
   {type:'list',slot:'main',cols:2,size:26,items:[
     {text:'Kill Zones are ICT time windows in NY local time',in:0},{text:'CMI uses one consistent reference schedule',in:0},
     {text:'MYT = NY + 13 h (EST) or + 12 h (EDT)',in:1},{text:'Check the date: 2026 EDT = 8 Mar – 1 Nov',in:1},
     {text:'Not exchange hours, not a guarantee',in:2},{text:'FCPO: use Bursa sessions; test any time pattern',in:3}]}],
  cues:[cue('To summarise. Kill Zones are I C T time windows defined in New York local time, and C M I uses one consistent reference schedule.','Sebagai rumusan. Kill Zones ialah tetingkap masa ICT yang ditakrifkan dalam waktu tempatan New York, dan CMI menggunakan satu jadual rujukan yang konsisten.'),
        cue('Malaysia is thirteen hours ahead during E S T and twelve hours ahead during E D T, so always check the date.','Malaysia 13 jam di hadapan semasa EST dan 12 jam di hadapan semasa EDT, jadi sentiasa semak tarikh.'),
        cue('Kill Zones are not exchange hours and they do not guarantee movement.','Kill Zones bukan waktu bursa dan ia tidak menjamin pergerakan.'),
        cue('For F C P O, start from Bursa’s official sessions and test any time-based idea on F C P O itself.','Bagi FCPO, mulakan dengan sesi rasmi Bursa dan uji sebarang idea berasaskan masa pada FCPO itu sendiri.')]},
 ...quizScenes(4,quiz,14),
 disclaimer('Next: Episode 05 — Kill Zones and Market Session Application','SCENE 17 · DISCLAIMER'),
];
function N_(){return 'ILLUSTRATIVE';}
module.exports={meta:meta(4,'Understanding ICT Kill Zones'),scenes,quiz,KZ,day,LH,LL,NYH,NYL};
