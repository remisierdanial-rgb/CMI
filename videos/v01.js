/* VIDEO 01 — Apa Itu Kontrak Niaga Hadapan */
VIDEO({
  num:'01', badge:'M1', moduleLabel:'MODUL 1 · KENALI NIAGA HADAPAN', short:'NIAGA HADAPAN',
  title:'Apa Itu Kontrak Niaga Hadapan',
  tagline:'Underlying asset · Hedging · Speculation · Futures vs saham',
  purpose:'Tarik minat',
  objectives:['Definisi futures contract & underlying asset','Mengapa kontrak futures diwujudkan','Hedging berbanding speculation','Beza futures dengan pelaburan saham'],
  intro:[
    ['In this video, we look at what a futures contract is, why it exists, and who uses it.','Dalam video ini, kita lihat apa itu kontrak niaga hadapan, mengapa ia wujud, dan siapa yang menggunakannya.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    const sv=C.svg(S,{parent:c,w:580,h:300});
    S.add(`<div style="text-align:center">${C.icon.drum(70)}<div class="small" style="margin-top:8px">CPO fizikal</div></div>`,{parent:c,x:50,y:90,w:160,at:1.1,anim:'up'});
    S.add(`<div style="text-align:center">${C.icon.doc(70)}<div class="small" style="margin-top:8px">Futures</div></div>`,{parent:c,x:370,y:90,w:160,at:1.8,anim:'up'});
    C.arrow(S,sv,{x1:215,y1:130,x2:360,y2:130,at:1.4,d:.5});
  },
  hook:{
    lines:[
      ['How can someone trade the price of palm oil without ever owning the palm oil itself?','Bagaimana seseorang boleh berdagang harga minyak sawit tanpa perlu memiliki minyak sawit itu sendiri?',.4],
      ['The answer lies in one of the core tools of the commodity world: the futures contract.','Jawapannya terletak pada salah satu instrumen teras dunia komoditi: kontrak niaga hadapan, atau futures contract.',.6],
    ],
    dir:'Hook. Left: physical palm oil (drums). Right: a live price screen. A dashed link with a "?" connects them. On line 2 the "?" resolves into a FUTURES CONTRACT document card that sits between both.',
    build(S){
      const sv=C.svg(S);
      S.add(`<div class="node" style="width:360px;height:300px">${C.icon.drum(110)}<div class="nt" style="margin-top:16px">Minyak sawit fizikal</div><div class="ns">Crude palm oil</div></div>`,{x:180,y:270,at:.3,anim:'scale'});
      const ch=C.chart(S,{x:1380,y:250,w:400,h:340,n:22,pts:[[0,4020],[6,3990],[12,4060],[17,4030],[21,4085]],min:3940,max:4120,at:.8,d:1.6,vol:false,label:'FCPO · ilustrasi',showAxis:false,seed:3});
      C.arrow(S,sv,{x1:560,y1:420,x2:1360,y2:420,at:1.4,d:1,dash:'10 12',color:'#64748B',head:false});
      const q=S.add(`<div style="font:800 120px var(--sans);color:var(--blue3)">?</div>`,{x:930,y:330,at:2,anim:'pop',out:S.c(1,-.2)});
      const doc=S.add(`<div class="card hl" style="padding:28px 34px;text-align:center">${C.icon.doc(80)}<div style="font:800 34px var(--sans);margin-top:14px">FUTURES CONTRACT</div><div class="small" style="margin-top:8px">Kontrak niaga hadapan</div></div>`,{x:780,y:270,w:360,at:S.c(1,.2),anim:'pop',d:.8});
    }
  },
  scenes:[
  {id:'problem',label:'MASALAH SEBENAR',lines:[
    ["Let's start with a real-world problem. Imagine a palm oil producer with a harvest to sell in three months.",'Mari mulakan dengan satu masalah sebenar. Bayangkan pengeluar minyak sawit yang akan menjual hasilnya tiga bulan lagi.'],
    ['The producer is worried: what if crude palm oil prices fall before then?','Pengeluar ini risau: bagaimana jika harga minyak sawit mentah jatuh sebelum itu?'],
    ['At the same time, a refinery that needs to buy palm oil has the opposite worry: what if prices rise?','Pada masa yang sama, kilang penapisan yang perlu membeli minyak sawit risau sebaliknya: bagaimana jika harga naik?'],
    ['Both face the same thing: price risk. Neither knows what the price will be in three months.','Kedua-duanya berdepan perkara yang sama: risiko harga. Tiada siapa tahu harganya tiga bulan lagi.',.6],
  ],
  dir:'Two participants face each other. Left: PRODUCER (palm icon) with a red falling-price sparkline. Right: REFINERY (factory icon) with a green rising-price sparkline. Centre: a timeline "Hari ini → +3 bulan" ending in "RM ?". Final line: a blue PRICE RISK tag drops between them.',
  build(S){
    C.title(S,{kicker:'Senario · Masalah dunia sebenar',title:'Dua pihak, satu risiko',at:.1});
    const sv=C.svg(S);
    C.node(S,{x:120,y:330,w:380,h:220,title:'Pengeluar',sub:'Producer · menjual CPO',icon:C.icon.palm(72),at:S.c(0,.3)});
    C.node(S,{x:1420,y:330,w:380,h:220,title:'Kilang penapisan',sub:'Refinery · membeli CPO',icon:C.icon.factory(72),at:S.c(2,.1)});
    // timeline
    S.add(`<div class="small">Hari ini</div>`,{x:640,y:600,at:S.c(0,1.2)});
    S.add(`<div class="small">+3 bulan</div>`,{x:1150,y:600,at:S.c(0,1.6)});
    C.arrow(S,sv,{x1:650,y1:580,x2:1270,y2:580,at:S.c(0,1.2),d:1,color:'#64748B'});
    S.add(`<div class="fbox" style="font-size:44px">RM <span class="blue">?</span></div>`,{x:880,y:470,at:S.c(0,2),anim:'pop'});
    // worries
    S.add(`<div class="chip down" style="font-size:26px">▼ Harga jatuh?</div>`,{x:180,y:600,at:S.c(1,.3),anim:'pop'});
    const p1=svgEl('path',{d:'M560,360 L610,380 L650,372 L700,420 L740,410 L790,455',stroke:'#EF5B5B','stroke-width':4,fill:'none'});sv.appendChild(p1);S.draw(p1,S.c(1,.3),1);
    S.add(`<div class="chip up" style="font-size:26px">▲ Harga naik?</div>`,{x:1500,y:600,at:S.c(2,.6),anim:'pop'});
    const p2=svgEl('path',{d:'M1130,455 L1180,440 L1220,446 L1270,400 L1310,410 L1360,362',stroke:'#22C3A6','stroke-width':4,fill:'none'});sv.appendChild(p2);S.draw(p2,S.c(2,.6),1);
    S.add(`<div class="tag blue" style="font-size:28px;padding:12px 26px">PRICE RISK · RISIKO HARGA</div>`,{x:735,y:700,at:S.c(3,.5),anim:'pop'});
  }},
  {id:'definition',label:'APA ITU FUTURES',lines:[
    ['A futures contract is a standardised, legally binding agreement to buy or sell an asset at a price agreed today, for a specified date in the future.','Kontrak niaga hadapan ialah perjanjian seragam yang mengikat, untuk membeli atau menjual sesuatu aset pada harga yang dipersetujui hari ini, bagi tarikh tertentu pada masa hadapan.'],
    ['It is traded on a regulated exchange, so the quantity, quality and delivery terms are the same for every participant.','Ia didagangkan di bursa yang dikawal selia, jadi kuantiti, kualiti dan terma penghantaran adalah sama untuk setiap peserta.'],
    ['The asset the contract is based on is called the underlying asset. For FCPO, the underlying asset is crude palm oil.','Aset yang menjadi asas kontrak dipanggil underlying asset. Bagi FCPO, underlying asset ialah minyak sawit mentah.',.6],
  ],
  dir:'A contract "document" card builds field by field: Underlying / Quantity / Price / Date / Venue. Line 2 stamps "STANDARDISED · EXCHANGE-TRADED". Line 3 highlights the Underlying row and links it to a CPO drum icon.',
  build(S){
    C.title(S,{kicker:'Definisi · Futures contract',title:'Perjanjian seragam: harga hari ini, untuk tarikh hadapan',at:.1,w:1700});
    const card=C.card(S,{x:120,y:300,w:960,h:520,at:S.c(0,.2),cls:'hl'});
    S.add(`<div style="display:flex;align-items:center;gap:16px">${C.icon.doc(44)}<div style="font:800 30px var(--sans)">FUTURES CONTRACT</div></div>`,{parent:card,x:36,y:28});
    const rows=[['Underlying asset','Aset asas','Crude palm oil (CPO)'],['Quantity','Kuantiti','Ditetapkan oleh bursa'],['Price','Harga','Dipersetujui hari ini'],['Date','Tarikh','Bulan kontrak hadapan'],['Venue','Tempat','Bursa yang dikawal selia']];
    const rowEls=rows.map((r,i)=>S.add(`<div style="height:72px;border-top:1px solid var(--line);display:flex;align-items:center"><div style="width:330px;font:600 20px var(--mono);color:var(--slate2);letter-spacing:.06em;text-transform:uppercase">${r[0]}</div><div style="font:600 28px var(--sans)">${r[2]}</div></div>`,{parent:card,x:36,y:110+i*80,w:890,at:S.c(0,.8)+i*.55,anim:'left'}));
    S.add(`<div class="tag blue" style="font-size:22px">Standardised · Exchange-traded</div>`,{x:1160,y:330,at:S.c(1,.3),anim:'pop'});
    S.add(`<div class="body" style="font-size:26px">Kuantiti, kualiti & terma penghantaran sama untuk semua.</div>`,{x:1160,y:400,w:640,at:S.c(1,.8)});
    // underlying highlight
    const hl=S.add(`<div style="border:2px solid var(--blue2);border-radius:10px;box-shadow:0 0 30px rgba(37,99,235,.35)"></div>`,{parent:card,x:24,y:104,w:912,h:72,at:S.c(2,.2),anim:'fade'});
    S.add(`<div style="text-align:center">${C.icon.drum(110)}<div class="h3" style="margin-top:14px">Underlying asset</div><div class="small" style="margin-top:6px">FCPO → Crude Palm Oil</div></div>`,{x:1260,y:530,w:420,at:S.c(2,.6),anim:'up'});
  }},
  {id:'why',label:'MENGAPA WUJUD',lines:[
    ['Futures markets grew out of this need. Producers and buyers wanted a way to lock in prices ahead of time.','Pasaran futures berkembang daripada keperluan ini. Pengeluar dan pembeli mahukan cara untuk mengunci harga lebih awal.'],
    ['So the journey looks like this: physical palm oil, a futures contract based on it, exposure to its price, and finally, hedging that exposure.','Jadi perjalanannya begini: minyak sawit fizikal, kontrak futures berasaskannya, pendedahan kepada harganya, dan akhirnya, lindung nilai terhadap pendedahan itu.'],
    ['The contract lets participants manage price risk today, without exchanging the physical goods today.','Kontrak ini membolehkan peserta menguruskan risiko harga hari ini, tanpa perlu menukar barangan fizikal pada hari ini.',.6],
  ],
  dir:'Four-step animated chain (left→right): Physical Palm Oil → Futures Contract → Price Exposure → Hedging. Each node lights up as it is named; a blue pulse travels along each connector.',
  build(S){
    C.title(S,{kicker:'Mengapa futures diwujudkan',title:'Dari barangan fizikal kepada pengurusan risiko',at:.1,w:1700});
    const sv=C.svg(S);
    const steps=[['Physical Palm Oil','Minyak sawit fizikal',C.icon.drum(70)],['Futures Contract','Kontrak seragam',C.icon.doc(70)],['Price Exposure','Pendedahan harga',C.icon.screen(70)],['Hedging','Lindung nilai',C.icon.shield(70)]];
    const L1=S.c(1), seg=(S.e(1)-S.c(1))/4.2;
    steps.forEach((s,i)=>{
      const x=110+i*450;
      const n=C.node(S,{x,y:380,w:340,h:240,title:s[0],sub:s[1],icon:s[2],at:L1+i*seg});
      S.step(L1+i*seg,on=>n.classList.toggle('hl',on&&S._t<L1+(i+1)*seg+.01));
      if(i<3){C.arrow(S,sv,{x1:x+350,y1:500,x2:x+440,y2:500,at:L1+i*seg+.3,d:.5});C.pulse(S,sv,{x1:x+350,y1:500,x2:x+430,y2:500,at:L1+i*seg+.5,d:.6});}
    });
    S.add(`<div class="lead" style="text-align:center;width:1700px">Lock in a price today — manage risk without moving the goods today.</div>`,{x:110,y:700,at:S.c(2,.3)});
    S.add(`<div class="tag" style="font-size:20px">Pengeluar & pembeli → mengunci harga lebih awal</div>`,{x:110,y:290,at:S.c(0,.6)});
  }},
  {id:'physical',label:'FIZIKAL VS FUTURES',lines:[
    ['It is important to separate the physical commodity from the futures contract.','Penting untuk membezakan komoditi fizikal dengan kontrak futures.'],
    ['Buying physical palm oil means paying the full value, then storing, transporting and looking after the goods.','Membeli minyak sawit fizikal bermaksud membayar nilai penuh, kemudian menyimpan, mengangkut dan menjaga barangan itu.'],
    ['A futures position is a contractual obligation linked to the price of the asset. Holding one does not automatically mean you own the palm oil.','Posisi futures pula ialah obligasi kontrak yang dikaitkan dengan harga aset. Memegang posisi tidak bermaksud anda memiliki minyak sawit itu secara automatik.'],
    ['FCPO is a physically delivered contract, but many participants, especially retail traders, close their positions before delivery. We cover this in Video 05.','FCPO ialah kontrak penghantaran fizikal, namun ramai peserta, terutamanya trader runcit, menutup posisi sebelum penghantaran. Kita bincang dalam Video 05.',.6],
  ],
  dir:'Split comparison. LEFT card PHYSICAL (drum): Full value · Storage & transport · Own the goods. RIGHT card FUTURES (document): Price exposure · Contract obligation · Expiry & delivery rules. Line 3 shows a crossed "≠ ownership" tag. Line 4 adds a "Physical delivery · lihat Video 05" footnote chip.',
  build(S){
    C.title(S,{kicker:'Perbezaan penting',title:'Komoditi fizikal ≠ kontrak futures',at:.1});
    const L=C.card(S,{x:110,y:290,w:820,h:520,at:S.c(0,.4)});
    const R=C.card(S,{x:990,y:290,w:820,h:520,at:S.c(0,.7),cls:'hl'});
    S.add(`<div style="display:flex;gap:18px;align-items:center">${C.icon.drum(56)}<div><div class="h3">Fizikal</div><div class="small">Physical commodity</div></div></div>`,{parent:L,x:36,y:32});
    S.add(`<div style="display:flex;gap:18px;align-items:center">${C.icon.doc(56)}<div><div class="h3">Futures</div><div class="small">Futures position</div></div></div>`,{parent:R,x:36,y:32});
    C.list(S,{parent:L,x:40,y:150,w:740,items:[['Bayar nilai penuh',S.c(1,.3)],['Simpan, angkut & jaga barangan',S.c(1,1.3)],['Memiliki barangan',S.c(1,2.3)]]});
    const lr=S.add(`<ul class="list"></ul>`,{parent:R,x:40,y:150,w:740});
    [['Pendedahan kepada harga aset',S.c(2,.3)],['Obligasi kontrak · ada bulan matang',S.c(2,1.5)],['Peraturan penghantaran bursa',S.c(3,.4)]].forEach(([t,a])=>S.add(`<li>${t}</li>`,{parent:lr,at:a,anim:'left'}));
    S.add(`<div class="tag down" style="font-size:22px">Posisi futures ≠ pemilikan automatik</div>`,{parent:R,x:40,y:420,at:S.c(2,2.4),anim:'pop'});
    S.add(`<div class="chip blue" style="font-size:20px">FCPO · Physical delivery → Video 05</div>`,{x:990,y:830,at:S.c(3,.6),anim:'up'});
  }},
  {id:'hedge',label:'HEDGING & SPECULATION',lines:[
    ['Who uses futures? Broadly, two groups: hedgers and speculators.','Siapa yang menggunakan futures? Secara umumnya, dua kumpulan: hedger dan spekulator.'],
    ['Hedgers, like producers and refineries, use futures to reduce the impact of price changes on their business.','Hedger, seperti pengeluar dan kilang penapisan, menggunakan futures untuk mengurangkan kesan perubahan harga terhadap perniagaan mereka.'],
    ['For example, the producer can sell futures today. If prices fall, the gain on the futures position can help offset the lower price received for the physical oil.','Contohnya, pengeluar boleh menjual futures hari ini. Jika harga jatuh, keuntungan pada posisi futures boleh membantu mengimbangi harga fizikal yang lebih rendah.',.4],
    ['Speculators have no physical business to protect. They take positions to seek profit from price movements, and they accept the risk of loss.','Spekulator pula tiada perniagaan fizikal untuk dilindungi. Mereka mengambil posisi untuk mencari keuntungan daripada pergerakan harga, dan menerima risiko kerugian.'],
    ['Their activity adds liquidity, making it easier for hedgers to find a counterparty.','Aktiviti mereka menambah kecairan, memudahkan hedger mendapatkan pihak lawan.',.5],
  ],
  dir:'Two columns. HEDGER (shield) left, SPECULATOR (screen) right. Line 3: an offset diagram under Hedger — red bar "Fizikal: harga jual lebih rendah" vs green bar "Futures: untung" with "≈ diimbangi". Lines 4–5: Speculator column shows up/down arrows and a LIQUIDITY tag linking both sides.',
  build(S){
    C.title(S,{kicker:'Siapa menggunakan futures',title:'Hedger dan spekulator',at:.1});
    const A=C.card(S,{x:110,y:280,w:860,h:560,at:S.c(0,.3)});
    const B=C.card(S,{x:1010,y:280,w:800,h:560,at:S.c(0,.8)});
    S.add(`<div style="display:flex;gap:18px;align-items:center">${C.icon.shield(56)}<div><div class="h3">Hedger</div><div class="small">Urus risiko harga</div></div></div>`,{parent:A,x:36,y:30});
    S.add(`<div style="display:flex;gap:18px;align-items:center">${C.icon.screen(56)}<div><div class="h3">Spekulator</div><div class="small">Cari peluang · terima risiko</div></div></div>`,{parent:B,x:36,y:30});
    S.add(`<div class="body">Pengeluar, kilang penapisan, pengguna industri</div>`,{parent:A,x:40,y:130,w:780,at:S.c(1,.3)});
    // offset diagram
    const yb=230;
    S.add(`<div class="small">Contoh: pengeluar jual futures · harga kemudian jatuh</div>`,{parent:A,x:40,y:yb,at:S.c(2,.2)});
    S.add(`<div style="font:600 24px var(--sans)">Fizikal</div>`,{parent:A,x:40,y:yb+60,at:S.c(2,.6)});
    const b1=C.bar(S,{parent:A,x:230,y:yb+60,w:560,h:34,color:'#EF5B5B'});b1.set(S,S.c(2,.8),1,0,.62);
    S.add(`<div class="mono down" style="font-size:22px">− harga jual lebih rendah</div>`,{parent:A,x:230,y:yb+104,at:S.c(2,1.4)});
    S.add(`<div style="font:600 24px var(--sans)">Futures</div>`,{parent:A,x:40,y:yb+160,at:S.c(2,2)});
    const b2=C.bar(S,{parent:A,x:230,y:yb+160,w:560,h:34,color:'#22C3A6'});b2.set(S,S.c(2,2.2),1,0,.58);
    S.add(`<div class="mono up" style="font-size:22px">+ untung posisi short</div>`,{parent:A,x:230,y:yb+204,at:S.c(2,2.8)});
    S.add(`<div class="tag blue" style="font-size:20px">≈ Kesan diimbangi · hasil lebih stabil</div>`,{parent:A,x:40,y:yb+262,at:S.c(2,3.6),anim:'pop'});
    // speculator
    S.add(`<div class="body">Tiada perniagaan fizikal untuk dilindungi</div>`,{parent:B,x:40,y:130,w:720,at:S.c(3,.3)});
    S.add(`<div style="display:flex;gap:30px"><div class="chip up" style="position:static;font-size:26px">▲ Long</div><div class="chip down" style="position:static;font-size:26px">▼ Short</div></div>`,{parent:B,x:40,y:240,at:S.c(3,1.4),anim:'up'});
    S.add(`<div class="body" style="font-size:24px">Untung jika arah betul · rugi jika salah</div>`,{parent:B,x:40,y:330,w:720,at:S.c(3,2.4)});
    S.add(`<div class="tag blue" style="font-size:22px">+ Liquidity · kecairan pasaran</div>`,{parent:B,x:40,y:440,at:S.c(4,.2),anim:'pop'});
  }},
  {id:'products',label:'CONTOH PRODUK',lines:[
    ['Futures exist on many types of assets.','Futures wujud bagi pelbagai jenis aset.'],
    ['Agricultural commodities like crude palm oil, soybean and wheat. Energy, like crude oil. Metals, like gold. And financial futures, such as stock index futures.','Komoditi pertanian seperti minyak sawit mentah, soya dan gandum. Tenaga seperti minyak mentah. Logam seperti emas. Dan futures kewangan seperti stock index futures.'],
    ['Each contract has its own specifications: size, tick value, trading hours and settlement method. They are not all the same.','Setiap kontrak mempunyai spesifikasi tersendiri: saiz, tick value, waktu dagangan dan kaedah penyelesaian. Semuanya tidak sama.',.6],
  ],
  dir:'Grid of six product tiles appearing in narration order: FCPO (highlighted, Bursa Malaysia), Soybean, Wheat, Crude Oil, Gold, Stock Index (e.g. FKLI on BMD). Category labels: Agriculture / Energy / Metals / Financial. Line 3: each tile flips a small "spec berbeza" tag.',
  build(S){
    C.title(S,{kicker:'Contoh produk futures',title:'Pelbagai aset, spesifikasi berbeza',at:.1});
    const T=[['FCPO','Crude Palm Oil','Pertanian','hl'],['Soybean','Kacang soya','Pertanian',''],['Wheat','Gandum','Pertanian',''],['Crude Oil','Minyak mentah','Tenaga',''],['Gold','Emas','Logam',''],['Stock Index','cth. FKLI (FBM KLCI)','Kewangan','']];
    const L=S.c(1),seg=(S.e(1)-S.c(1))/6.5;
    T.forEach((t,i)=>{
      const x=110+(i%3)*580,y=290+Math.floor(i/3)*280;
      const c=S.add(`<div class="card ${t[3]}"><div class="small" style="position:absolute;left:30px;top:26px">${t[2]}</div><div style="position:absolute;left:30px;top:70px;font:800 44px var(--sans)">${t[0]}</div><div class="body" style="position:absolute;left:30px;top:134px;font-size:24px">${t[1]}</div></div>`,{x,y,w:540,h:240,at:i===0?S.c(0,.6):L+(i)*seg,anim:'scale'});
      S.add(`<div class="tag blue" style="font-size:16px">Spec berbeza</div>`,{parent:c,x:30,y:186,at:S.c(2,.6)+i*.15,anim:'pop'});
    });
  }},
  {id:'stocks',label:'FUTURES VS SAHAM',lines:[
    ['So how is this different from investing in stocks?','Jadi, apa bezanya dengan pelaburan saham?'],
    ['A share represents ownership in a company, and you can usually hold it with no expiry date.','Saham mewakili pemilikan dalam sebuah syarikat, dan biasanya boleh dipegang tanpa tarikh tamat.'],
    ['A futures contract is an agreement with an expiry month. It gives exposure to a price, not ownership of a company.','Kontrak futures ialah perjanjian yang mempunyai bulan tamat tempoh. Ia memberi pendedahan kepada harga, bukan pemilikan syarikat.'],
    ['Futures can be bought or sold first, and they are traded on margin. That creates leverage, which magnifies both gains and losses.','Futures boleh dibeli atau dijual dahulu, dan didagangkan menggunakan margin. Ini mewujudkan leverage, yang membesarkan keuntungan dan juga kerugian.',.8],
  ],
  dir:'Comparison table, 4 rows × 2 columns (SAHAM | FUTURES). Rows reveal with narration: Apa dipegang · Tempoh · Arah · Modal awal. The leverage row ends with a red/green double arrow "± diperbesar".',
  build(S){
    C.title(S,{kicker:'Perbandingan asas',title:'Futures berbanding saham',at:.1});
    const head=S.add(`<div style="display:grid;grid-template-columns:380px 640px 640px;font:700 30px var(--sans)"><div></div><div style="padding:0 30px">Saham</div><div style="padding:0 30px;color:var(--blue3)">Futures</div></div>`,{x:110,y:290,at:S.c(0,.5)});
    const rows=[['Apa dipegang','Pemilikan syarikat','Pendedahan kepada harga aset',1],['Tempoh','Biasanya tiada tarikh tamat','Ada bulan tamat tempoh (expiry)',2],['Arah','Lazimnya beli dahulu','Boleh beli atau jual dahulu',3],['Modal awal','Biasanya nilai penuh (akaun tunai)','Margin — sebahagian nilai kontrak',3]];
    rows.forEach((r,i)=>{
      const at=r[3]===3?S.c(3,.2+(i-2)*1.6):S.c(r[3],.3);
      S.add(`<div style="display:grid;grid-template-columns:380px 640px 640px;align-items:center;height:100px;border-top:1px solid var(--line)"><div class="small" style="font-size:20px">${r[0]}</div><div style="padding:0 30px;font:500 28px var(--sans);color:#CBD5E1">${r[1]}</div><div style="padding:0 30px;font:600 28px var(--sans)">${r[2]}</div></div>`,{x:110,y:350+i*105,at,anim:'left'});
    });
    S.add(`<div class="tag warn" style="font-size:22px">Leverage: untung & rugi sama-sama diperbesar → Video 04</div>`,{x:110,y:800,at:S.c(3,4),anim:'pop'});
  }},
  ],
  takeaways:[
    ['A futures contract is a standardised agreement to buy or sell an asset at a price agreed today, for a future date.','Kontrak futures ialah perjanjian seragam untuk membeli atau menjual aset pada harga hari ini, bagi tarikh hadapan.','Futures = perjanjian seragam, harga hari ini, tarikh hadapan'],
    ['The underlying asset is what the contract is based on.','Underlying asset ialah aset yang menjadi asas kontrak.','Underlying asset = asas kontrak (FCPO → CPO)'],
    ['Hedgers manage price risk, while speculators seek opportunity and accept risk.','Hedger menguruskan risiko harga, manakala spekulator mencari peluang dan menerima risiko.','Hedger urus risiko · spekulator cari peluang'],
    ['Holding a futures position does not mean you automatically own the commodity.','Memegang posisi futures tidak bermaksud anda memiliki komoditi secara automatik.','Posisi futures ≠ memiliki komoditi'],
    ['Futures have expiry months and are traded on margin, which creates leverage.','Futures mempunyai bulan tamat tempoh dan didagangkan dengan margin, yang mewujudkan leverage.','Bulan matang + margin = leverage'],
    ['And every futures product has its own specifications.','Dan setiap produk futures mempunyai spesifikasi tersendiri.','Setiap produk ada spesifikasi sendiri'],
  ],
  endQuote:['Futures are not simply about buying and selling contracts. They are a market instrument for managing risk and taking opportunities from price changes.','Futures bukan sekadar membeli dan menjual kontrak. Ia merupakan instrumen pasaran untuk menguruskan risiko dan mengambil peluang daripada perubahan harga.'],
  sources:[
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — Contract Specifications',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'FCPO · underlying'},
    {org:'Bursa Malaysia',title:'FTSE Bursa Malaysia KLCI Futures (FKLI) — Contract Specifications',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/equity_derivatives/ftse_bursa_malaysia_klci_futures',note:'Stock index futures'},
    {org:'Securities Commission Malaysia',title:'InvestSmart® — Derivatives / Futures basics',url:'https://www.sc.com.my/investsmart',note:'Konsep & risiko'},
    {org:'CME Group Education',title:'Introduction to Futures — What is a futures contract; hedgers & speculators',url:'https://www.cmegroup.com/education/courses/introduction-to-futures.html',note:'Prinsip global'},
  ],
  factcheck:[
    ['Definisi futures: perjanjian seragam, didagangkan di bursa, harga hari ini untuk tarikh hadapan','Prinsip global (CME/SC)','OK'],
    ['Underlying FCPO = crude palm oil','Bursa FCPO spec','SEMAK'],
    ['FCPO diselesaikan melalui penghantaran fizikal','Bursa FCPO spec','SEMAK'],
    ['Contoh hedging pengeluar jual futures — dinyatakan sebagai "boleh membantu mengimbangi", bukan jaminan','Prinsip global','OK'],
    ['Posisi futures tidak bermaksud pemilikan automatik komoditi','Prinsip global','OK'],
    ['FKLI sebagai contoh stock index futures di BMD','Bursa FKLI spec','SEMAK'],
    ['Tiada dakwaan keuntungan terjamin; leverage dinyatakan membesarkan untung DAN rugi','Polisi','OK'],
  ],
  assets:['Ikon vektor: drum CPO, dokumen kontrak, perisai (hedging), skrin dagangan, kilang, pokok sawit','Carta candlestick ilustrasi (dijana, berlabel "ilustrasi")','Tiada gambar stok diperlukan; semua grafik vektor 2D/2.5D'],
});
