/* VIDEO 03 — Long dan Short — Harga Naik atau Turun */
VIDEO({
  num:'03', badge:'M1', moduleLabel:'MODUL 1 · KENALI NIAGA HADAPAN', short:'LONG & SHORT',
  title:'Long dan Short — Harga Naik atau Turun',
  tagline:'Long position · Short position · Untung & rugi · Open & close',
  purpose:'Fahami mekanisme',
  objectives:['Apa itu long position & short position','Mengira untung dan rugi (FCPO)','Membuka dan menutup posisi','Arah betul ≠ semestinya untung'],
  intro:[
    ['In this video, we explain long and short positions using FCPO, and how profit and loss are calculated.','Dalam video ini, kita terangkan posisi long dan short menggunakan FCPO, serta cara untung dan rugi dikira.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    S.add(`<div class="chip up" style="position:static;font-size:30px;display:inline-block">▲ LONG</div>`,{parent:c,x:60,y:110,at:1.2,anim:'pop'});
    S.add(`<div class="chip down" style="position:static;font-size:30px;display:inline-block">▼ SHORT</div>`,{parent:c,x:320,y:110,at:1.6,anim:'pop'});
  },
  hook:{
    lines:[
      ['Did you know that in futures, you can take an opportunity when prices rise, and also when prices fall?','Adakah anda tahu dalam futures, anda boleh mengambil peluang apabila harga naik mahupun turun?',.4],
      ['Let us see how that works, and why both directions still carry risk.','Mari lihat bagaimana ia berfungsi, dan mengapa kedua-dua arah tetap mempunyai risiko.',.6],
    ],
    dir:'Centre: an FCPO price line draws up (teal), then reverses down (red). Two large labels light in turn: ▲ HARGA NAIK and ▼ HARGA TURUN. On line 2 a small amber "RISIKO" tag appears under both.',
    build(S){
      const ch=C.chart(S,{x:260,y:180,w:1400,h:600,n:60,pts:[[0,3960],[22,4060],[34,4040],[59,3940]],min:3900,max:4100,at:.3,d:4,vol:false,label:'FCPO · ilustrasi hipotetikal',seed:21});
      S.add(`<div class="chip up" style="font-size:34px">▲ Harga naik</div>`,{x:760,y:250,at:1.6,anim:'pop'});
      S.add(`<div class="chip down" style="font-size:34px">▼ Harga turun</div>`,{x:1180,y:250,at:3.6,anim:'pop'});
      S.add(`<div class="tag warn" style="font-size:24px">Kedua-dua arah · ada risiko</div>`,{x:820,y:690,at:S.c(1,.8),anim:'pop'});
    }
  },
  scenes:[
  {id:'long',label:'LONG POSITION',lines:[
    ['A long position means you buy first, expecting the price to rise, and sell later to close the position.','Long position bermaksud anda membeli dahulu, menjangkakan harga naik, dan menjual kemudian untuk menutup posisi.'],
    ['Example: FCPO is at RM4,000 per metric tonne. You buy one contract. The price rises to RM4,020, and you sell to close.','Contoh: FCPO pada RM4,000 setiap tan metrik. Anda membeli satu kontrak. Harga naik ke RM4,020, dan anda menjual untuk menutup posisi.'],
    ['One FCPO contract represents 25 metric tonnes. So the RM20 move is RM20 times 25, or RM500 gross profit.','Satu kontrak FCPO mewakili 25 tan metrik. Jadi pergerakan RM20 ialah RM20 darab 25, iaitu RM500 untung kasar.',.8],
  ],
  dir:'Left: candlestick chart rising from 4,000 to 4,020 (hypothetical). Teal BUY marker at 4,000, then SELL marker at 4,020, vertical measure "+RM20". Right panel: "LONG · Bullish" card; formula builds: RM20 × 25 MT = RM500 (gross).',
  build(S){
    const ch=C.chart(S,{x:40,y:100,w:1260,h:760,n:40,pts:[[0,3992],[6,4000],[18,3998],[32,4016],[39,4022]],min:3980,max:4030,ticks:[3985,3990,3995,4000,4005,4010,4015,4020,4025],at:S.c(0,.3),d:2.4,label:'FCPO · ilustrasi hipotetikal',title:'LONG = BELI DAHULU',seed:5,noise:.15});
    ch.marker(S,{i:6,price:4000,at:S.c(1,1.4),color:'#22C3A6',label:'BUY 4,000',dy:40});
    ch.hline(S,{price:4000,at:S.c(1,1.4),color:'#22C3A6'});
    ch.marker(S,{i:37,price:4020,at:S.c(1,4.4),color:'#60A5FA',label:'SELL 4,020',dy:-70});
    ch.hline(S,{price:4020,at:S.c(1,4.4),color:'#60A5FA'});
    S.add(`<div class="chip up" style="font-size:26px">+RM20 / MT</div>`,{parent:ch.wrap,x:880,y:360,at:S.c(2,0),anim:'pop'});
    const p=C.card(S,{x:1340,y:100,w:540,h:760,at:S.c(0,.2)});
    S.add(`<div class="kicker">Posisi 01</div><div class="h2" style="margin-top:10px">Long position</div><div class="rule" style="margin-top:18px;width:120px"></div>`,{parent:p,x:34,y:36,at:S.c(0,.4)});
    C.list(S,{parent:p,x:34,y:220,w:470,size:27,items:[['Bullish · jangka harga naik',S.c(0,1.6)],['BUY dahulu',S.c(0,2.6)],['SELL kemudian untuk tutup',S.c(0,3.6)]]});
    const f=S.add(`<div style="font:600 32px/1.7 var(--mono)"></div>`,{parent:p,x:34,y:470});
    S.add(`<div>4,020 − 4,000 = <span class="up">20</span></div>`,{parent:f,at:S.c(2,.3)});
    S.add(`<div>20 × 25 MT</div>`,{parent:f,at:S.c(2,2.2)});
    S.add(`<div>= <span class="up" style="font-weight:800">RM500</span></div>`,{parent:f,at:S.c(2,4.6),anim:'pop'});
    S.add(`<div class="small">Untung kasar · sebelum kos</div>`,{parent:p,x:34,y:690,at:S.c(2,5)});
  }},
  {id:'short',label:'SHORT POSITION',lines:[
    ['A short position is the reverse: you sell first, expecting the price to fall, and buy later to close.','Short position adalah sebaliknya: anda menjual dahulu, menjangkakan harga turun, dan membeli kemudian untuk menutup posisi.'],
    ['You do not need to own any palm oil to sell first. You are entering a contract obligation, which you close by buying it back.','Anda tidak perlu memiliki minyak sawit untuk menjual dahulu. Anda memasuki obligasi kontrak, yang ditutup dengan membelinya semula.'],
    ['Sell one contract at RM4,000. The price falls to RM3,980, and you buy back. Again, RM20 times 25 is RM500 gross profit.','Jual satu kontrak pada RM4,000. Harga turun ke RM3,980, dan anda membeli semula. Sekali lagi, RM20 darab 25 ialah RM500 untung kasar.',.8],
  ],
  dir:'Mirror of the Long scene. Chart falls from 4,000 to 3,980. Red SELL marker at 4,000, then BUY-back marker at 3,980, "+RM20" measure. Right panel: SHORT · Bearish card with formula 4,000 − 3,980 = 20 → × 25 = RM500 (gross). Line 2 shows a small note chip "Tak perlu memiliki CPO untuk jual dahulu".',
  build(S){
    const ch=C.chart(S,{x:40,y:100,w:1260,h:760,n:40,pts:[[0,4008],[6,4000],[18,4003],[32,3984],[39,3978]],min:3970,max:4020,ticks:[3975,3980,3985,3990,3995,4000,4005,4010,4015],at:S.c(0,.3),d:2.4,label:'FCPO · ilustrasi hipotetikal',title:'SHORT = JUAL DAHULU',seed:9,noise:.15});
    S.add(`<div class="tag blue" style="font-size:20px">Tidak perlu memiliki CPO untuk jual dahulu</div>`,{parent:ch.wrap,x:30,y:680,at:S.c(1,.6),anim:'pop'});
    ch.marker(S,{i:6,price:4000,at:S.c(2,.6),color:'#EF5B5B',label:'SELL 4,000',dy:-70});
    ch.hline(S,{price:4000,at:S.c(2,.6),color:'#EF5B5B'});
    ch.marker(S,{i:37,price:3980,at:S.c(2,3),color:'#60A5FA',label:'BUY 3,980',dy:40});
    ch.hline(S,{price:3980,at:S.c(2,3),color:'#60A5FA'});
    const p=C.card(S,{x:1340,y:100,w:540,h:760,at:S.c(0,.2)});
    S.add(`<div class="kicker">Posisi 02</div><div class="h2" style="margin-top:10px">Short position</div><div class="rule" style="margin-top:18px;width:120px;background:var(--down)"></div>`,{parent:p,x:34,y:36,at:S.c(0,.4)});
    C.list(S,{parent:p,x:34,y:220,w:470,size:27,items:[['Bearish · jangka harga turun',S.c(0,1.6)],['SELL dahulu',S.c(0,2.6)],['BUY kemudian untuk tutup',S.c(0,3.6)]]});
    const f=S.add(`<div style="font:600 32px/1.7 var(--mono)"></div>`,{parent:p,x:34,y:470});
    S.add(`<div>4,000 − 3,980 = <span class="up">20</span></div>`,{parent:f,at:S.c(2,4)});
    S.add(`<div>20 × 25 MT</div>`,{parent:f,at:S.c(2,5)});
    S.add(`<div>= <span class="up" style="font-weight:800">RM500</span></div>`,{parent:f,at:S.c(2,6),anim:'pop'});
    S.add(`<div class="small">Untung kasar · sebelum kos</div>`,{parent:p,x:34,y:690,at:S.c(2,6.4)});
  }},
  {id:'split',label:'DUA ARAH',lines:[
    ['Here they are side by side.','Ini perbandingannya secara bersebelahan.'],
    ['Long is bullish: buy first, sell later. Short is bearish: sell first, buy later.','Long bersifat bullish: beli dahulu, jual kemudian. Short bersifat bearish: jual dahulu, beli kemudian.'],
    ['This is possible because every futures trade is an agreement between a buyer and a seller. Going short is as standard as going long.','Ini boleh berlaku kerana setiap dagangan futures ialah perjanjian antara pembeli dan penjual. Mengambil posisi short adalah sama standard dengan posisi long.',.8],
  ],
  dir:'Split screen with a vertical divider. LEFT (teal): LONG — Bullish — BUY first, SELL later, rising mini-chart with arrow. RIGHT (red): SHORT — Bearish — SELL first, BUY later, falling mini-chart. Line 3: a centre badge "Buyer ⇄ Seller" links both halves.',
  build(S){
    const sv=C.svg(S);
    const div=svgEl('line',{x1:960,y1:120,x2:960,y2:860,stroke:'#2C3D60','stroke-width':2});sv.appendChild(div);S.draw(div,S.c(0,.1),.8);
    [['LONG','Bullish','BUY dahulu → SELL kemudian','up',[[0,3990],[30,4030]],140],['SHORT','Bearish','SELL dahulu → BUY kemudian','down',[[0,4030],[30,3990]],1000]].forEach((d,k)=>{
      S.add(`<div><div style="font:800 64px var(--sans)" class="${d[3]}">${k?'▼':'▲'} ${d[0]}</div><div class="h3" style="margin-top:8px">${d[1]}</div></div>`,{x:d[5],y:140,at:S.c(1,k?2.6:.2)});
      S.add(`<div class="tag ${d[3]}" style="font-size:24px">${d[2]}</div>`,{x:d[5],y:310,at:S.c(1,k?3.4:1.1),anim:'pop'});
      C.chart(S,{x:d[5],y:390,w:780,h:380,n:30,pts:d[4],min:3970,max:4050,at:S.c(1,k?2.8:.4),d:1.6,vol:false,showAxis:false,seed:31+k,noise:.4});
    });
    S.add(`<div class="node hl" style="width:300px;height:120px"><div class="nt">Buyer ⇄ Seller</div><div class="ns">setiap dagangan</div></div>`,{x:810,y:520,at:S.c(2,.6),anim:'pop'});
  }},
  {id:'loss',label:'APABILA SALAH ARAH',lines:[
    ['Now the other side of the coin.','Sekarang, lihat sisi sebaliknya.'],
    ['If you are long at RM4,000 and the price falls to RM3,980, you lose RM20 times 25, or RM500.','Jika anda long pada RM4,000 dan harga turun ke RM3,980, anda rugi RM20 darab 25, iaitu RM500.'],
    ['If you are short at RM4,000 and the price rises to RM4,020, you also lose RM500.','Jika anda short pada RM4,000 dan harga naik ke RM4,020, anda juga rugi RM500.'],
    ['The same RM20 move that creates a profit for one position creates a loss for the other.','Pergerakan RM20 yang sama yang memberi untung kepada satu posisi, memberi rugi kepada posisi yang lain.',.8],
  ],
  dir:'Two loss panels. LEFT: long entry 4,000, price drops to 3,980 — red result chip −RM500. RIGHT: short entry 4,000, price rises to 4,020 — red result chip −RM500. Line 4: a balance graphic: same RM20 move → + for one side, − for the other.',
  build(S){
    C.title(S,{kicker:'Risiko kerugian',title:'Apabila pasaran bergerak menentang anda',at:.1});
    const A=C.chart(S,{x:110,y:270,w:830,h:440,n:30,pts:[[0,4004],[5,4000],[29,3980]],min:3970,max:4015,ticks:[3975,3985,3995,4005],at:S.c(1,.1),d:1.6,vol:false,label:'LONG @ 4,000',seed:41,noise:.2});
    A.marker(S,{i:5,price:4000,at:S.c(1,1),color:'#22C3A6',label:'BUY 4,000',dy:-70});
    A.marker(S,{i:28,price:3980,at:S.c(1,2.6),color:'#EF5B5B',label:'3,980',dy:-70});
    S.add(`<div class="fbox" style="border-color:var(--down);font-size:34px">(3,980 − 4,000) × 25 = <span class="down">−RM500</span></div>`,{x:110,y:730,at:S.c(1,4),anim:'pop'});
    const B=C.chart(S,{x:990,y:270,w:830,h:440,n:30,pts:[[0,3996],[5,4000],[29,4020]],min:3985,max:4030,ticks:[3990,4000,4010,4020],at:S.c(2,.1),d:1.6,vol:false,label:'SHORT @ 4,000',seed:43,noise:.2});
    B.marker(S,{i:5,price:4000,at:S.c(2,1),color:'#EF5B5B',label:'SELL 4,000',dy:40});
    B.marker(S,{i:28,price:4020,at:S.c(2,2.4),color:'#EF5B5B',label:'4,020',dy:40});
    S.add(`<div class="fbox" style="border-color:var(--down);font-size:34px">(4,000 − 4,020) × 25 = <span class="down">−RM500</span></div>`,{x:990,y:730,at:S.c(2,3.4),anim:'pop'});
    S.add(`<div class="tag warn" style="font-size:22px">Pergerakan sama · kesan bertentangan</div>`,{x:720,y:840,at:S.c(3,.4),anim:'pop'});
  }},
  {id:'formula',label:'FORMULA P&L',lines:[
    ['So here is the simple formula.','Jadi, inilah formula mudahnya.'],
    ['For a long position: exit price minus entry price, times 25, times the number of contracts.','Bagi long position: harga keluar tolak harga masuk, darab 25, darab bilangan kontrak.'],
    ['For a short position: entry price minus exit price, times 25, times the number of contracts.','Bagi short position: harga masuk tolak harga keluar, darab 25, darab bilangan kontrak.'],
    ['These are gross figures, before brokerage, exchange and clearing fees.','Ini ialah angka kasar, sebelum yuran broker, bursa dan clearing.',.8],
  ],
  dir:'Two formula strips build term by term in mono type. LONG (teal accent): (Exit − Entry) × 25 × Kontrak. SHORT (red accent): (Entry − Exit) × 25 × Kontrak. "25 = MT per contract (FCPO)" note. Line 4: a "GROSS" stamp and a "− kos transaksi" chip.',
  build(S){
    C.title(S,{kicker:'Formula untung & rugi · FCPO',title:'Kira P&L dalam satu baris',at:.1});
    const rowL=S.add(`<div class="card up" style="padding:34px 40px"><div class="small up" style="color:var(--up)">Long position</div><div style="font:600 48px var(--mono);margin-top:16px"></div></div>`,{x:110,y:290,w:1700,at:S.c(1,.1)});
    const rowS=S.add(`<div class="card down" style="padding:34px 40px"><div class="small down" style="color:var(--down)">Short position</div><div style="font:600 48px var(--mono);margin-top:16px"></div></div>`,{x:110,y:510,w:1700,at:S.c(2,.1)});
    const tL=['(','Harga keluar',' − ','Harga masuk',')',' × 25',' × Kontrak'], tS=['(','Harga masuk',' − ','Harga keluar',')',' × 25',' × Kontrak'];
    tL.forEach((t,i)=>S.add(`<span style="${t.includes('25')?'color:var(--blue3)':''}">${t}</span>`,{parent:rowL.lastElementChild,at:S.c(1,.6)+i*.45,anim:'fade'}));
    tS.forEach((t,i)=>S.add(`<span style="${t.includes('25')?'color:var(--blue3)':''}">${t}</span>`,{parent:rowS.lastElementChild,at:S.c(2,.6)+i*.45,anim:'fade'}));
    S.add(`<div class="small">25 = tan metrik bagi setiap kontrak FCPO</div>`,{x:110,y:740,at:S.c(1,3.6)});
    S.add(`<div class="tag warn" style="font-size:24px">GROSS · sebelum yuran broker, bursa & clearing</div>`,{x:110,y:800,at:S.c(3,.3),anim:'pop'});
  }},
  {id:'openclose',label:'OPEN & CLOSE',lines:[
    ['Two more terms: opening and closing a position.','Dua lagi istilah: membuka dan menutup posisi.'],
    ['Opening means entering the trade: you buy to open a long, or sell to open a short.','Membuka posisi bermaksud memasuki dagangan: beli untuk membuka long, atau jual untuk membuka short.'],
    ['Closing means taking the opposite trade in the same contract month: sell to close a long, buy to close a short.','Menutup posisi bermaksud membuat dagangan bertentangan dalam bulan kontrak yang sama: jual untuk menutup long, beli untuk menutup short.'],
    ['Until it is closed, the position stays open, and its value changes with every price move.','Selagi belum ditutup, posisi kekal terbuka, dan nilainya berubah mengikut setiap pergerakan harga.',.8],
  ],
  dir:'Process strip with three stages: OPEN → POSISI TERBUKA (live P&L ticking) → CLOSE. Two rows: LONG (BUY to open / SELL to close) and SHORT (SELL to open / BUY to close). In the middle stage, a P&L number flickers +/− to show the open position changes with price. Note chip: "bulan kontrak yang sama".',
  build(S){
    C.title(S,{kicker:'Istilah penting',title:'Buka posisi → posisi terbuka → tutup posisi',at:.1,w:1700});
    const sv=C.svg(S);
    const cols=[['OPEN','Buka posisi',300],['POSISI TERBUKA','Open position',810],['CLOSE','Tutup posisi',1320]];
    cols.forEach((c,i)=>S.add(`<div style="text-align:center;width:360px"><div class="h3">${c[0]}</div><div class="small" style="margin-top:6px">${c[1]}</div></div>`,{x:c[2]-60,y:290,at:S.c(i===0?1:i===1?3:2,.1)}));
    const rows=[['LONG','up','BUY','SELL',420],['SHORT','down','SELL','BUY',620]];
    rows.forEach((r,k)=>{
      S.add(`<div style="font:800 34px var(--sans)" class="${r[1]}">${r[0]}</div>`,{x:110,y:r[4]+38,at:S.c(1,.4+k*1.8)});
      C.node(S,{x:300,y:r[4],w:240,h:120,title:r[2],sub:'to open',at:S.c(1,.8+k*1.8)});
      C.node(S,{x:1320,y:r[4],w:240,h:120,title:r[3],sub:'to close',at:S.c(2,1+k*2.2)});
      C.arrow(S,sv,{x1:550,y1:r[4]+60,x2:1310,y2:r[4]+60,at:S.c(2,.6+k*2.2),d:1.2,color:'#2C3D60'});
      const pnl=S.add(`<div class="chip" style="font-size:26px;min-width:190px;text-align:center">P&L 0</div>`,{x:830,y:r[4]+34,at:S.c(3,.2),anim:'pop'});
      const vals=[+250,-125,+375,-50,+100,-300,+175];
      S.tween(S.c(3,.2),Math.max(1,S.e(3)-S.c(3)),p=>{const v=vals[Math.min(vals.length-1,Math.floor(p*vals.length))]*(k?-1:1);pnl.textContent=`P&L ${v>0?'+':'−'}RM${Math.abs(v)}`;pnl.className='chip '+(v>0?'up':'down');},'lin');
    });
    S.add(`<div class="tag blue" style="font-size:20px">Tutup dalam bulan kontrak yang sama</div>`,{x:1250,y:790,at:S.c(2,2.4),anim:'pop'});
  }},
  {id:'direction',label:'ARAH BETUL ≠ UNTUNG',lines:[
    ['One last, very important point: getting the direction right does not guarantee a profitable trade.','Satu perkara terakhir yang sangat penting: arah pasaran yang betul tidak menjamin dagangan yang menguntungkan.'],
    ['Here, the price rises overall from RM4,000 to RM4,030. But a trader buys late, at RM4,035, near the high.','Di sini, harga naik secara keseluruhan dari RM4,000 ke RM4,030. Tetapi seorang trader membeli lewat, pada RM4,035, berhampiran paras tinggi.'],
    ['The price pulls back, and the trader exits at RM4,012. That is minus RM23 times 25, a loss of RM575, even though the market went up.','Harga kemudian berundur, dan trader keluar pada RM4,012. Itu tolak RM23 darab 25, iaitu rugi RM575, walaupun pasaran naik.'],
    ['Entry and exit prices, execution, and transaction costs all affect the final result.','Harga masuk dan keluar, pelaksanaan pesanan, dan kos transaksi semuanya mempengaruhi keputusan akhir.',.8],
  ],
  dir:'Chart: hypothetical FCPO rises 4,000 → 4,040, dips to 4,010, recovers to 4,030 (net up). Late BUY marker at 4,035 near top, exit marker at 4,012 in the dip; red result box −RM575 while a teal "Trend: naik" tag shows the overall direction. Line 4: three factor chips: Entry & exit · Execution · Transaction costs.',
  build(S){
    const ch=C.chart(S,{x:40,y:100,w:1260,h:760,n:48,pts:[[0,4000],[16,4040],[22,4036],[32,4010],[47,4030]],min:3990,max:4050,ticks:[3995,4005,4015,4025,4035,4045],at:S.c(1,.1),d:3,label:'FCPO · ilustrasi hipotetikal',seed:15,noise:.25});
    S.add(`<div class="tag up" style="font-size:20px">Keseluruhan: 4,000 → 4,030 ▲</div>`,{parent:ch.wrap,x:30,y:680,at:S.c(1,3),anim:'pop'});
    ch.marker(S,{i:19,price:4035,at:S.c(1,5),color:'#22C3A6',label:'BUY lewat 4,035',dy:-74});
    ch.marker(S,{i:31,price:4012,at:S.c(2,1.6),color:'#EF5B5B',label:'EXIT 4,012',dy:40});
    const p=C.card(S,{x:1340,y:100,w:540,h:760,at:S.c(0,.2)});
    S.add(`<div class="kicker">Ingat</div><div class="h2" style="margin-top:10px">Arah betul ≠ semestinya untung</div>`,{parent:p,x:34,y:36,w:470,at:S.c(0,.4)});
    S.add(`<div style="font:600 30px/1.7 var(--mono)">(4,012 − 4,035)<br>= <span class="down">−23</span> × 25<br>= <span class="down" style="font-weight:800">−RM575</span></div>`,{parent:p,x:34,y:250,at:S.c(2,3.4),anim:'up'});
    ['Harga masuk & keluar','Pelaksanaan (execution)','Kos transaksi'].forEach((t,i)=>S.add(`<div class="tag blue" style="font-size:19px">${t}</div>`,{parent:p,x:34,y:520+i*64,at:S.c(3,.3+i*1),anim:'pop'}));
  }},
  ],
  takeaways:[
    ['Long means buy first, expecting prices to rise.','Long bermaksud beli dahulu, menjangkakan harga naik.','Long = beli dahulu (bullish)'],
    ['Short means sell first, expecting prices to fall.','Short bermaksud jual dahulu, menjangkakan harga turun.','Short = jual dahulu (bearish)'],
    ['For FCPO, every RM1 per tonne move is worth RM25 per contract.','Bagi FCPO, setiap pergerakan RM1 setan bernilai RM25 bagi setiap kontrak.','RM1 × 25 MT = RM25 sekontrak'],
    ['The same move that profits one side causes a loss for the other.','Pergerakan yang sama memberi untung kepada satu pihak dan rugi kepada pihak lain.','Pergerakan sama · kesan bertentangan'],
    ['A position stays open until you close it with the opposite trade.','Posisi kekal terbuka sehingga ditutup dengan dagangan bertentangan.','Open → tutup dengan dagangan bertentangan'],
    ['The right direction alone does not guarantee a profit.','Arah yang betul sahaja tidak menjamin keuntungan.','Arah betul ≠ jaminan untung'],
  ],
  endQuote:['In futures, opportunities exist when prices rise or fall. But every position still carries the risk of loss.','Dalam futures, peluang wujud apabila harga naik atau turun. Tetapi setiap posisi tetap mempunyai risiko kerugian.'],
  sources:[
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — Contract Specifications (25 MT, RM1 tick)',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'Saiz kontrak · tick'},
    {org:'CME Group Education',title:'Introduction to Futures — Long and short positions; calculating P&L',url:'https://www.cmegroup.com/education/courses/introduction-to-futures.html',note:'Prinsip global'},
    {org:'Securities Commission Malaysia',title:'InvestSmart® — Understanding derivatives risks',url:'https://www.sc.com.my/investsmart',note:'Risiko'},
  ],
  factcheck:[
    ['Saiz kontrak FCPO 25 tan metrik','Bursa FCPO spec','SEMAK'],
    ['Pengiraan: RM20 × 25 = RM500; RM23 × 25 = RM575 (aritmetik disemak)','Dalaman','OK'],
    ['Semua harga ialah ilustrasi hipotetikal, dilabel di skrin','Polisi','OK'],
    ['Short tidak memerlukan pemilikan komoditi (obligasi kontrak)','Prinsip global','OK'],
    ['Posisi ditutup dengan dagangan bertentangan dalam bulan kontrak yang sama','Prinsip global','OK'],
    ['Angka kasar sebelum yuran broker/bursa/clearing — tiada kadar yuran dinyatakan','Polisi','OK'],
  ],
  assets:['Carta candlestick hipotetikal (dijana, berlabel)','Penanda BUY/SELL, garis paras, kotak formula mono','Split-screen hijau/merah'],
});
