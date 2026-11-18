/* VIDEO 02 — Bursa Malaysia Derivatives (BMD) */
VIDEO({
  num:'02', badge:'M1', moduleLabel:'MODUL 1 · KENALI NIAGA HADAPAN', short:'EKOSISTEM BMD',
  title:'Bursa Malaysia Derivatives (BMD)',
  tagline:'Exchange · Clearing house · Broker · Remisier · Platform',
  purpose:'Kenali ekosistem',
  objectives:['Peranan BMD dalam pasaran derivatif Malaysia','Mengapa bursa & clearing house wujud','Beza bursa, broker, remisier & platform','Aliran transaksi: klien → clearing house'],
  intro:[
    ['In this video, we map the futures ecosystem in Malaysia, and the role each participant plays.','Dalam video ini, kita petakan ekosistem futures di Malaysia, dan peranan setiap peserta.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    const sv=C.svg(S,{parent:c,w:580,h:300});
    const pts=[[90,150],[230,150],[370,150],[510,150]];
    const ic=[C.icon.user,C.icon.broker,C.icon.exchange,C.icon.clearing];
    pts.forEach((p,i)=>{S.add(`<div>${ic[i](54)}</div>`,{parent:c,x:p[0]-27,y:p[1]-27,at:1+i*.3,anim:'pop'});if(i<3)C.arrow(S,sv,{x1:p[0]+38,y1:150,x2:pts[i+1][0]-38,y2:150,at:1.2+i*.3,d:.3,w:2.5});});
  },
  hook:{
    lines:[
      ['Who actually provides the futures market in Malaysia, and who keeps every trade in order?','Siapa sebenarnya yang menyediakan pasaran futures di Malaysia, dan siapa yang memastikan setiap transaksi teratur?',.4],
      ['Behind every FCPO trade, there is an organised ecosystem. Let us take a look.','Di sebalik setiap dagangan FCPO, ada satu ekosistem yang tersusun. Mari kita lihat.',.6],
    ],
    dir:'Dozens of order dots (buy = teal, sell = red) stream in from screen edges toward an empty central hub marked "?". On line 2 the hub resolves into the BMD exchange node with orbiting participant icons.',
    build(S){
      const sv=C.svg(S); const r=C.rng(11);
      for(let i=0;i<26;i++){
        const a=r()*Math.PI*2, R=760+r()*200, x1=960+Math.cos(a)*R, y1=470+Math.sin(a)*R*.55;
        C.pulse(S,sv,{x1,y1,x2:960+Math.cos(a)*110,y2:470+Math.sin(a)*80,at:.3+r()*3,d:1.6,color:i%2?'#22C3A6':'#EF5B5B',r:7});
      }
      const q=S.add(`<div class="node" style="width:220px;height:220px;border-radius:50%"><div style="font:800 110px var(--sans);color:var(--blue3)">?</div></div>`,{x:850,y:360,at:.2,anim:'pop',out:S.c(1,-.1)});
      S.add(`<div class="node hl" style="width:300px;height:220px">${C.icon.exchange(80)}<div class="nt" style="margin-top:12px">BMD</div><div class="ns">Bursa Malaysia Derivatives</div></div>`,{x:810,y:360,at:S.c(1,.1),anim:'pop'});
      const orb=[[C.icon.user,'Klien',520,250],[C.icon.broker,'Broker',1300,250],[C.icon.clearing,'Clearing house',1300,640],[C.icon.screen,'Platform',520,640]];
      orb.forEach((o,i)=>S.add(`<div style="text-align:center">${o[0](60)}<div class="small" style="margin-top:6px">${o[1]}</div></div>`,{x:o[2],y:o[3],w:200,at:S.c(1,.8)+i*.25,anim:'pop'}));
    }
  },
  scenes:[
  {id:'what',label:'APA ITU BMD',lines:[
    ['Bursa Malaysia Derivatives, or BMD, is the derivatives exchange of the Bursa Malaysia group.','Bursa Malaysia Derivatives, atau BMD, ialah bursa derivatif dalam kumpulan Bursa Malaysia.'],
    ['It provides the marketplace for futures and options in Malaysia: it lists standardised contracts, sets the trading rules, and runs the electronic market where buy and sell orders meet.','Ia menyediakan pasaran bagi futures dan opsyen di Malaysia: menyenaraikan kontrak seragam, menetapkan peraturan dagangan, dan mengendalikan pasaran elektronik tempat pesanan beli dan jual bertemu.'],
    ['Clearing is handled by a separate entity, Bursa Malaysia Derivatives Clearing. And the market as a whole is regulated by the Securities Commission Malaysia.','Proses clearing dikendalikan oleh entiti berasingan, Bursa Malaysia Derivatives Clearing. Pasaran secara keseluruhan pula dikawal selia oleh Suruhanjaya Sekuriti Malaysia.',.6],
  ],
  dir:'Organisation chart. Top: Bursa Malaysia Berhad (group). Branches: Bursa Malaysia Derivatives (exchange — highlighted) and Bursa Malaysia Derivatives Clearing (clearing house). Side: Securities Commission Malaysia (regulator) linked by a dashed oversight line. Three role chips beside BMD: List contracts · Set rules · Run the market.',
  build(S){
    C.title(S,{kicker:'Apa itu BMD',title:'Bursa derivatif Malaysia',at:.1});
    const sv=C.svg(S);
    C.node(S,{x:560,y:280,w:520,h:120,title:'Bursa Malaysia Berhad',sub:'Kumpulan · group',at:S.c(0,.2)});
    const ex=C.node(S,{x:300,y:520,w:500,h:170,title:'Bursa Malaysia Derivatives',sub:'Exchange · bursa',icon:C.icon.exchange(52),at:S.c(0,1),cls:'hl'});
    C.node(S,{x:840,y:520,w:500,h:170,title:'BM Derivatives Clearing',sub:'Clearing house',icon:C.icon.clearing(52),at:S.c(2,.2)});
    C.arrow(S,sv,{x1:820,y1:400,x2:560,y2:515,at:S.c(0,.8),d:.5,head:false,color:'#2C3D60'});
    C.arrow(S,sv,{x1:820,y1:400,x2:1090,y2:515,at:S.c(2,.1),d:.5,head:false,color:'#2C3D60'});
    C.node(S,{x:1440,y:280,w:380,h:150,title:'Suruhanjaya Sekuriti',sub:'Regulator · SC Malaysia',icon:C.icon.shield(44),at:S.c(2,2.6)});
    C.arrow(S,sv,{x1:1630,y1:440,x2:1340,y2:600,at:S.c(2,3),d:.6,dash:'8 10',color:'#64748B',head:false});
    ['Senarai kontrak','Tetapkan peraturan','Pasaran elektronik'].forEach((t,i)=>S.add(`<div class="tag blue" style="font-size:20px">${t}</div>`,{x:300+[0,280,620][i],y:720,at:S.c(1,1+i*1.6),anim:'pop'}));
  }},
  {id:'why',label:'MENGAPA BURSA WUJUD',lines:[
    ['Why do we need an exchange at all? Imagine every buyer having to find, and trust, every seller individually.','Mengapa kita perlukan bursa? Bayangkan setiap pembeli perlu mencari, dan mempercayai, setiap penjual secara individu.'],
    ['Terms would differ, prices would be hidden, and if one side failed to pay, the other would bear the loss.','Terma berbeza-beza, harga tidak telus, dan jika satu pihak gagal membayar, pihak lain menanggung kerugian.'],
    ['An exchange brings everyone to one central market, with standard contracts, transparent prices and common rules.','Bursa menghimpunkan semua peserta dalam satu pasaran berpusat, dengan kontrak seragam, harga yang telus dan peraturan yang sama.',.6],
  ],
  dir:'Left panel "Tanpa bursa": 8 dots joined by a tangle of bilateral lines; red warning chips "terma berbeza", "harga tersembunyi", "risiko pihak lawan". Right panel "Dengan bursa": the same dots connect cleanly to one central hub; three teal chips "seragam", "telus", "peraturan sama".',
  build(S){
    C.title(S,{kicker:'Mengapa bursa wujud',title:'Dari rundingan berasingan kepada pasaran berpusat',at:.1,w:1700});
    const A=C.card(S,{x:110,y:290,w:820,h:540,at:S.c(0,.2)}), B=C.card(S,{x:990,y:290,w:820,h:540,at:S.c(2,0),cls:'hl'});
    S.add(`<div class="small">Tanpa bursa</div>`,{parent:A,x:30,y:24}); S.add(`<div class="small blue">Dengan bursa</div>`,{parent:B,x:30,y:24});
    const sa=C.svg(S,{parent:A,w:820,h:540}), sb=C.svg(S,{parent:B,w:820,h:540});
    const pts=[...Array(8).keys()].map(i=>{const a=i/8*Math.PI*2;return [410+Math.cos(a)*250,250+Math.sin(a)*160];});
    let k=0;
    for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){const l=svgEl('line',{x1:pts[i][0],y1:pts[i][1],x2:pts[j][0],y2:pts[j][1],stroke:'rgba(239,91,91,.35)','stroke-width':2});sa.appendChild(l);S.draw(l,S.c(0,1)+k*.06,.4);k++;}
    pts.forEach(p=>{[sa,sb].forEach(s=>{const c=svgEl('circle',{cx:p[0],cy:p[1],r:12,fill:'#60A5FA'});s.appendChild(c);});});
    ['Terma berbeza','Harga tersembunyi','Risiko pihak lawan'].forEach((t,i)=>S.add(`<div class="tag down" style="font-size:18px">${t}</div>`,{parent:A,x:30+i*255,y:470,at:S.c(1,.3+i*1.1),anim:'pop'}));
    const hub=svgEl('circle',{cx:410,cy:250,r:46,fill:'#2563EB'});sb.appendChild(hub);S.tween(S.c(2,.2),.5,p=>{hub.style.opacity=p;hub.setAttribute('r',46*p);},'out');
    pts.forEach((p,i)=>{const l=svgEl('line',{x1:p[0],y1:p[1],x2:410,y2:250,stroke:'#3B82F6','stroke-width':3});sb.insertBefore(l,sb.firstChild);S.draw(l,S.c(2,.4)+i*.08,.5);});
    ['Kontrak seragam','Harga telus','Peraturan sama'].forEach((t,i)=>S.add(`<div class="tag up" style="font-size:18px">${t}</div>`,{parent:B,x:30+i*255,y:470,at:S.c(2,1.4+i*.8),anim:'pop'}));
  }},
  {id:'clearing',label:'CLEARING HOUSE',lines:[
    ['The clearing house is the part most beginners never see, but it is critical.','Clearing house ialah bahagian yang jarang dilihat oleh pemula, tetapi ia sangat penting.'],
    ['Once a trade is matched, the clearing house steps in between the two sides. It becomes the buyer to every seller, and the seller to every buyer.','Sebaik sahaja dagangan dipadankan, clearing house mengambil tempat di antara kedua-dua pihak. Ia menjadi pembeli kepada setiap penjual, dan penjual kepada setiap pembeli.'],
    ['It collects margin, marks open positions to the market price every day, and manages the clearing and settlement of obligations.','Ia mengutip margin, menilai semula posisi terbuka mengikut harga pasaran setiap hari, dan menguruskan clearing serta penyelesaian obligasi.'],
    ['This greatly reduces counterparty risk: you are not relying on the unknown trader on the other side.','Ini mengurangkan risiko pihak lawan dengan ketara: anda tidak bergantung kepada trader yang tidak dikenali di sebelah sana.',.6],
  ],
  dir:'Buyer node (left) and Seller node (right) joined by a direct line. On line 2 the line splits and the CLEARING HOUSE node drops into the middle; two new links form (buyer↔CH, CH↔seller). Line 3: three function chips appear beneath: Margin · Mark-to-market (daily) · Settlement. Line 4: "Counterparty risk ↓" tag.',
  build(S){
    C.title(S,{kicker:'Clearing house',title:'Pihak tengah bagi setiap dagangan',at:.1});
    const sv=C.svg(S);
    C.node(S,{x:150,y:330,w:320,h:190,title:'Pembeli',sub:'Buyer',icon:C.icon.user(56,'#22C3A6'),at:S.c(0,.3)});
    C.node(S,{x:1450,y:330,w:320,h:190,title:'Penjual',sub:'Seller',icon:C.icon.user(56,'#EF5B5B'),at:S.c(0,.5)});
    const direct=svgEl('line',{x1:480,y1:425,x2:1440,y2:425,stroke:'#64748B','stroke-width':3,'stroke-dasharray':'10 10'});sv.appendChild(direct);
    S.tween(S.c(0,.8),.6,p=>{direct.style.opacity=p;},'out');S.tween(S.c(1,1.5),.5,p=>{direct.style.opacity=1-p;},'out');
    C.node(S,{x:780,y:300,w:360,h:250,title:'Clearing house',sub:'BM Derivatives Clearing',icon:C.icon.clearing(70),at:S.c(1,1.6),cls:'hl'});
    C.arrow(S,sv,{x1:480,y1:425,x2:770,y2:425,at:S.c(1,2.2),d:.5,head:false,w:4});
    C.arrow(S,sv,{x1:1150,y1:425,x2:1440,y2:425,at:S.c(1,2.6),d:.5,head:false,w:4});
    S.add(`<div class="small" style="text-align:center;width:300px">penjual kepada pembeli</div>`,{x:475,y:380,at:S.c(1,3.6)});
    S.add(`<div class="small" style="text-align:center;width:300px">pembeli kepada penjual</div>`,{x:1145,y:380,at:S.c(1,4.2)});
    [['Margin','Kutipan cagaran'],['Mark-to-market','Setiap hari'],['Settlement','Penyelesaian obligasi']].forEach((t,i)=>{
      S.add(`<div class="card" style="padding:22px 28px"><div class="h3" style="font-size:28px">${t[0]}</div><div class="small" style="margin-top:6px">${t[1]}</div></div>`,{x:360+i*420,y:620,w:380,at:S.c(2,.3+i*1.4),anim:'up'});
    });
    S.add(`<div class="tag up" style="font-size:24px">▼ Counterparty risk · risiko pihak lawan berkurang</div>`,{x:560,y:790,at:S.c(3,.8),anim:'pop'});
  }},
  {id:'roles',label:'SIAPA BUAT APA',lines:[
    ['Beginners often mix up four different things: the exchange, the broker, the remisier, and the trading platform.','Pemula sering mengelirukan empat perkara berbeza: bursa, broker, remisier, dan platform dagangan.'],
    ['The exchange provides the market and its rules. It does not open trading accounts for individual clients.','Bursa menyediakan pasaran dan peraturannya. Bursa tidak membuka akaun dagangan untuk klien individu.'],
    ['The broker is a licensed futures broker. It gives you access to the market, holds your trading account, and manages margin and risk.','Broker ialah broker niaga hadapan berlesen. Ia memberi anda akses ke pasaran, memegang akaun dagangan anda, serta menguruskan margin dan risiko.'],
    ['A remisier is a licensed representative attached to a broker, who services and guides clients. Your account is with the broker, not with the remisier personally.','Remisier ialah wakil berlesen yang bernaung di bawah broker, yang melayan dan membimbing klien. Akaun anda dibuka dengan broker, bukan dengan remisier secara peribadi.'],
    ['And the trading platform is simply the software you use to send orders. It is a tool, not the market itself.','Platform dagangan pula hanyalah perisian untuk menghantar pesanan. Ia alat, bukan pasaran itu sendiri.',.6],
  ],
  dir:'Four role cards in a row, each lit as narrated: EXCHANGE (provides market & rules), BROKER (access, account, margin/risk), REMISIER (licensed representative under broker — services clients), PLATFORM (software to send orders). Under Platform a small "≠ Bursa" chip; under Remisier "akaun = dengan broker".',
  build(S){
    C.title(S,{kicker:'Jangan keliru',title:'Bursa · Broker · Remisier · Platform',at:.1});
    const R=[[C.icon.exchange,'Bursa','Exchange','Sediakan pasaran & peraturan',1,'Tiada akaun klien individu'],[C.icon.broker,'Broker','Futures broker','Akses pasaran · akaun · margin & risiko',2,'Berlesen'],[C.icon.user,'Remisier','Wakil berlesen','Layan & bimbing klien',3,'Akaun = dengan broker'],[C.icon.screen,'Platform','Trading platform','Perisian hantar pesanan',4,'Alat ≠ pasaran']];
    R.forEach((r,i)=>{
      const c=S.add(`<div class="card"><div style="position:absolute;left:30px;top:30px">${r[0](60)}</div><div style="position:absolute;left:30px;top:116px;font:800 38px var(--sans)">${r[1]}</div><div class="small" style="position:absolute;left:30px;top:170px">${r[2]}</div><div class="body" style="position:absolute;left:30px;top:220px;width:330px;font-size:26px">${r[3]}</div></div>`,{x:110+i*435,y:290,w:400,h:440,at:S.c(r[4],.1),anim:'up'});
      S.step(S.c(r[4],.1),on=>c.classList.toggle('hl',on&&S._t<(r[4]<4?S.c(r[4]+1,0):1e9)));
      S.add(`<div class="tag ${i===3?'down':'blue'}" style="font-size:17px">${r[5]}</div>`,{parent:c,x:30,y:370,at:S.c(r[4],1.4),anim:'pop'});
    });
  }},
  {id:'flow',label:'ALIRAN TRANSAKSI',lines:[
    ['Now let us follow one order through the system.','Sekarang mari kita ikuti satu pesanan melalui sistem ini.'],
    ['You, the client, place a buy or sell order through your broker, usually via a trading platform.','Anda, sebagai klien, membuat pesanan beli atau jual melalui broker, biasanya menggunakan platform dagangan.'],
    ['The broker checks your margin and risk limits, then routes the order to the exchange.','Broker menyemak margin dan had risiko anda, kemudian menghantar pesanan ke bursa.'],
    ['On the exchange, your order is matched with an opposite order from another participant.','Di bursa, pesanan anda dipadankan dengan pesanan bertentangan daripada peserta lain.'],
    ['The matched trade then goes to the clearing house, which registers it, and your position and margin are updated in your account.','Dagangan yang dipadankan kemudian dihantar ke clearing house untuk didaftarkan, dan posisi serta margin anda dikemas kini dalam akaun.',.6],
  ],
  dir:'Horizontal pipeline CLIENT → BROKER → EXCHANGE → CLEARING HOUSE. A glowing order token travels node to node in sync with each line; each node shows a short action caption (Hantar pesanan / Semak margin & risiko / Padanan pesanan / Daftar & clear). Final: a return arrow back to Client labelled "Posisi & margin dikemas kini".',
  build(S){
    C.title(S,{kicker:'Aliran transaksi asas',title:'Klien → Broker → Bursa → Clearing house',at:.1,w:1700});
    const sv=C.svg(S);
    const N=[[C.icon.user,'Klien','Client','Hantar pesanan'],[C.icon.broker,'Broker','Futures broker','Semak margin & risiko'],[C.icon.exchange,'Bursa','BMD','Padanan pesanan'],[C.icon.clearing,'Clearing house','BMDC','Daftar & clear']];
    N.forEach((n,i)=>{
      const x=110+i*450;
      const el=C.node(S,{x,y:340,w:340,h:220,title:n[1],sub:n[2],icon:n[0](64),at:S.c(0,.3)+i*.3});
      S.step(S.c(i+1),on=>el.classList.toggle('hl',on&&(i===3||S._t<S.c(i+2))));
      S.add(`<div class="chip blue" style="font-size:20px">${n[3]}</div>`,{x:x+170,y:585,at:S.c(i+1,.4),anim:'pop'}).style.translate='-50% 0';
      if(i<3){C.arrow(S,sv,{x1:x+350,y1:450,x2:x+440,y2:450,at:S.c(0,.5)+i*.3,d:.4,color:'#2C3D60'});C.pulse(S,sv,{x1:x+170,y1:450,x2:x+620,y2:450,at:S.c(i+2,-.2),d:1,r:11});}
    });
    C.arrow(S,sv,{x1:1600,y1:670,x2:280,y2:670,at:S.e(4,-1.5),d:1.2,curve:-90,color:'#22C3A6'});
    S.add(`<div class="chip up" style="font-size:22px">Posisi & margin dikemas kini</div>`,{x:820,y:770,at:S.e(4,-.6),anim:'pop'});
  }},
  {id:'products',label:'PRODUK BMD',lines:[
    ['BMD lists contracts across several asset classes, including commodities, equity indices and interest rates, as well as options.','BMD menyenaraikan kontrak merentasi beberapa kelas aset, termasuk komoditi, indeks ekuiti dan kadar faedah, serta opsyen.'],
    ['Examples include the FBM KLCI futures, known as FKLI, and the US dollar crude palm oil futures, FUPO.','Contohnya termasuk FBM KLCI futures, dikenali sebagai FKLI, dan US dollar crude palm oil futures, iaitu FUPO.'],
    ['But one contract stands out: Crude Palm Oil Futures, or FCPO, widely regarded as a global price benchmark for crude palm oil.','Namun satu kontrak menonjol: Crude Palm Oil Futures, atau FCPO, yang diiktiraf secara meluas sebagai penanda aras harga global bagi minyak sawit mentah.',.6],
  ],
  dir:'Three category columns (Komoditi · Indeks ekuiti · Kadar faedah & opsyen) fill with product chips (FKLI, FUPO …). On line 3 the FCPO tile scales up to centre with a glow and the label "Global CPO price benchmark".',
  build(S){
    C.title(S,{kicker:'Produk di BMD',title:'Contoh kontrak yang didagangkan',at:.1});
    const cats=[['Komoditi','Commodity',['FCPO','FUPO']],['Indeks ekuiti','Equity index',['FKLI']],['Lain-lain','Interest rate · options',['Kadar faedah','Opsyen']]];
    cats.forEach((c,i)=>{
      const card=C.card(S,{x:110+i*580,y:290,w:540,h:300,at:S.c(0,.4+i*1.2)});
      S.add(`<div class="h3">${c[0]}</div><div class="small" style="margin-top:6px">${c[1]}</div>`,{parent:card,x:30,y:26});
      c[2].forEach((p,j)=>{const at=p==='FCPO'?S.c(2,.2):(p==='FKLI'?S.c(1,1.4):(p==='FUPO'?S.c(1,4.3):S.c(0,1.2+i*1.2)));S.add(`<div class="tag ${p==='FCPO'?'blue':''}" style="font-size:24px;padding:10px 18px">${p}</div>`,{parent:card,x:30+j*(p.length>6?250:160),y:150,at,anim:'pop'});});
    });
    const f=S.add(`<div class="card hl" style="display:flex;align-items:center;gap:30px;padding:0 40px">${C.icon.palm(90)}<div><div style="font:800 52px var(--sans)">FCPO</div><div class="lead" style="font-size:26px">Crude Palm Oil Futures · penanda aras harga CPO global</div></div></div>`,{x:300,y:630,w:1320,h:190,at:S.c(2,1.2),anim:'scale'});
  }},
  ],
  takeaways:[
    ['BMD is the exchange that provides Malaysia\'s futures and options market.','BMD ialah bursa yang menyediakan pasaran futures dan opsyen di Malaysia.','BMD = bursa derivatif Malaysia'],
    ['The clearing house stands between buyers and sellers and manages margin and settlement.','Clearing house berada di antara pembeli dan penjual serta menguruskan margin dan penyelesaian.','Clearing house = pihak tengah · margin · settlement'],
    ['The Securities Commission regulates the market.','Suruhanjaya Sekuriti mengawal selia pasaran.','SC Malaysia = regulator'],
    ['Your account is with a licensed broker; a remisier services you on the broker\'s behalf.','Akaun anda dibuka dengan broker berlesen; remisier melayan anda bagi pihak broker.','Akaun → broker · remisier → wakil'],
    ['A trading platform is a tool to send orders, not the exchange.','Platform dagangan ialah alat untuk menghantar pesanan, bukan bursa.','Platform ≠ bursa'],
    ['FCPO is one of BMD\'s flagship contracts.','FCPO ialah salah satu kontrak utama BMD.','FCPO = kontrak utama BMD'],
  ],
  endQuote:['Every futures transaction sits within an organised market ecosystem. The exchange provides the market, the broker provides access, and the clearing house manages clearing and settlement.','Setiap transaksi futures mempunyai ekosistem pasaran yang tersusun. Bursa menyediakan pasaran, broker menyediakan akses dan clearing house menguruskan proses clearing serta penyelesaian.'],
  sources:[
    {org:'Bursa Malaysia',title:'Derivatives market overview — Bursa Malaysia Derivatives Berhad',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives',note:'Peranan BMD · produk'},
    {org:'Bursa Malaysia',title:'Clearing & settlement — Bursa Malaysia Derivatives Clearing Berhad',url:'https://www.bursamalaysia.com/trade/trading_resources/derivatives/clearing_settlement',note:'Peranan clearing house'},
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — product page',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'FCPO · benchmark'},
    {org:'Securities Commission Malaysia',title:'Capital Markets and Services Act 2007 / licensing (futures broker & representatives)',url:'https://www.sc.com.my/regulation/acts/capital-markets-and-services-act-2007',note:'Regulator · lesen'},
    {org:'CME Group Education',title:'Introduction to Futures — The role of the clearing house',url:'https://www.cmegroup.com/education/courses/introduction-to-futures.html',note:'Prinsip global'},
  ],
  factcheck:[
    ['BMD ialah subsidiari bursa derivatif kumpulan Bursa Malaysia','Bursa','SEMAK'],
    ['Clearing dikendalikan oleh Bursa Malaysia Derivatives Clearing Berhad (BMDC)','Bursa','SEMAK'],
    ['SC Malaysia mengawal selia pasaran modal & derivatif (CMSA 2007)','SC','OK'],
    ['Clearing house menjadi pembeli kepada setiap penjual & sebaliknya (novation)','Prinsip global / BMDC','OK'],
    ['Remisier = wakil berlesen bernaung di bawah broker; akaun dibuka dengan broker','SC / broker','SEMAK istilah lesen tepat (CMSRL)'],
    ['Produk contoh: FKLI, FUPO, kadar faedah, opsyen — masih tersenarai','Bursa product list','SEMAK'],
    ['FCPO sebagai penanda aras harga CPO global (wording Bursa)','Bursa','SEMAK'],
  ],
  assets:['Ikon vektor: klien, broker (beg), bursa (bangunan tiang), clearing house (perisai+tanda), platform (skrin)','Gambarajah rangkaian bilateral vs hub','Token pesanan bercahaya untuk animasi aliran'],
});
