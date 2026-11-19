/* VIDEO 05 — Spesifikasi Kontrak FCPO */
VIDEO({
  num:'05', badge:'M2', moduleLabel:'MODUL 2 · KONTRAK FCPO', short:'SPESIFIKASI FCPO',
  title:'Spesifikasi Kontrak FCPO',
  tagline:'Contract size · Tick size · Tick value · Physical delivery',
  purpose:'Kenali produk',
  objectives:['Apa itu FCPO & mengapa didagangkan di BMD','Saiz kontrak, unit harga & tick','Tick value & nilai kontrak','Physical delivery & tanggungjawab kontrak'],
  intro:[
    ['In this video, we read the FCPO contract specifications, and what each number means for a trader.','Dalam video ini, kita baca spesifikasi kontrak FCPO, dan maksud setiap angka kepada seorang trader.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    S.add(`<div style="font:800 64px var(--mono)" class="blue">RM1</div>`,{parent:c,x:50,y:100,at:1.1,anim:'pop'});
    S.add(`<div style="font:600 40px var(--mono)" class="dim">→</div>`,{parent:c,x:230,y:112,at:1.4});
    S.add(`<div style="font:800 64px var(--mono)">RM25</div>`,{parent:c,x:320,y:100,at:1.7,anim:'pop'});
    S.add(`<div class="small">setiap tick · setiap kontrak</div>`,{parent:c,x:50,y:210,at:2});
  },
  hook:{
    lines:[
      ['Why can a price move of just RM1 make a RM25 difference to one FCPO contract?','Kenapa pergerakan harga RM1 sahaja boleh memberikan kesan RM25 kepada satu kontrak FCPO?',.4],
      ['It all comes down to the contract specifications.','Semuanya bergantung pada spesifikasi kontrak.',.6],
    ],
    dir:'A price ticker steps 4,000 → 4,001 → 4,002 (blue flash). Beside it, a P&L counter jumps RM0 → +RM25 → +RM50. Line 2: a spec-sheet card slides up, titled "FCPO · Contract Specifications".',
    build(S){
      const px=S.add(`<div class="fbox" style="font-size:92px;padding:30px 50px">4,000</div>`,{x:300,y:330,at:.3,anim:'pop'});
      S.add(`<div class="small">Harga FCPO · RM/MT</div>`,{x:305,y:280,at:.4});
      const pl=S.add(`<div class="fbox" style="font-size:92px;padding:30px 50px;border-color:var(--up)">RM0</div>`,{x:1060,y:330,at:.8,anim:'pop'});
      S.add(`<div class="small">Kesan · 1 kontrak</div>`,{x:1065,y:280,at:.9});
      S.step(1.8,on=>{const two=S._t>=3.2;px.textContent=on?(two?'4,002':'4,001'):'4,000';pl.innerHTML=on?`<span class="up">+RM${two?50:25}</span>`:'RM0';});
      S.add(`<div class="chip blue" style="font-size:28px">+RM1 / MT</div>`,{x:390,y:560,at:1.8,anim:'pop'});
      S.add(`<div class="card hl" style="padding:24px 30px;font:700 30px var(--sans)">FCPO · Contract Specifications</div>`,{x:620,y:700,w:680,at:S.c(1,.2),anim:'up'});
    }
  },
  scenes:[
  {id:'what',label:'APA ITU FCPO',lines:[
    ['FCPO, or Crude Palm Oil Futures, is a futures contract on crude palm oil, traded on Bursa Malaysia Derivatives.','FCPO, atau Crude Palm Oil Futures, ialah kontrak niaga hadapan bagi minyak sawit mentah, yang didagangkan di Bursa Malaysia Derivatives.'],
    ['Malaysia is one of the world\'s largest palm oil producers, so the industry needs a transparent local market to price and hedge crude palm oil.','Malaysia ialah antara pengeluar minyak sawit terbesar dunia, jadi industri memerlukan pasaran tempatan yang telus untuk menentukan harga dan melindung nilai minyak sawit mentah.'],
    ['Follow the journey: from the plantation, to the mill, to crude palm oil, to a standardised futures contract, and finally to the trading screen.','Ikuti perjalanannya: dari ladang, ke kilang, ke minyak sawit mentah, ke kontrak futures yang seragam, dan akhirnya ke skrin dagangan.',.6],
  ],
  dir:'Animated journey, five stations left→right: Ladang sawit → Kilang → CPO → Kontrak FCPO → Skrin dagangan. Each station lights as named; arrows draw between them.',
  build(S){
    C.title(S,{kicker:'Crude Palm Oil Futures',title:'Dari ladang ke skrin dagangan',at:.1});
    const sv=C.svg(S);
    const st=[[C.icon.palm,'Ladang sawit','Plantation'],[C.icon.factory,'Kilang','Palm oil mill'],[C.icon.drum,'CPO','Crude palm oil'],[C.icon.doc,'Kontrak FCPO','Futures contract'],[C.icon.screen,'Skrin dagangan','Trading screen']];
    const L=S.c(2),seg=(S.e(2)-S.c(2))/5.4;
    st.forEach((s,i)=>{
      const x=110+i*360;
      const n=C.node(S,{x,y:400,w:300,h:220,title:s[1],sub:s[2],icon:s[0](64),at:i<1?S.c(0,.4):L+i*seg});
      S.step(L+i*seg,on=>n.classList.toggle('hl',on));
      if(i<4)C.arrow(S,sv,{x1:x+305,y1:510,x2:x+355,y2:510,at:L+i*seg+.3,d:.4,w:3});
    });
    S.add(`<div class="tag blue" style="font-size:22px">Bursa Malaysia Derivatives · FCPO</div>`,{x:110,y:300,at:S.c(0,1),anim:'pop'});
    S.add(`<div class="tag" style="font-size:20px">Harga telus · lindung nilai · penanda aras</div>`,{x:110,y:690,at:S.c(1,2),anim:'pop'});
  }},
  {id:'spec',label:'LEMBARAN SPESIFIKASI',lines:[
    ['Here is the core of the FCPO specification sheet.','Inilah teras lembaran spesifikasi FCPO.'],
    ['The contract code is FCPO, the underlying asset is crude palm oil, and one contract represents 25 metric tonnes.','Kod kontrak ialah FCPO, underlying asset ialah minyak sawit mentah, dan satu kontrak mewakili 25 tan metrik.'],
    ['Prices are quoted in Ringgit per metric tonne. The minimum price fluctuation is RM1 per tonne, so the tick value is RM25 per contract.','Harga disebut dalam Ringgit setiap tan metrik. Turun naik harga minimum ialah RM1 setan, jadi tick value ialah RM25 setiap kontrak.'],
    ['And the settlement method is physical delivery.','Dan kaedah penyelesaian ialah penghantaran fizikal, atau physical delivery.',.8],
  ],
  dir:'Spec sheet card builds row by row with the narration: Contract code · Underlying asset · Contract size · Pricing unit · Minimum price fluctuation · Tick value · Settlement method. Active row glows blue. Footer: source note.',
  build(S){
    C.title(S,{kicker:'FCPO · Contract specifications',title:'Spesifikasi teras',at:.1});
    const card=C.card(S,{x:110,y:270,w:1700,h:590,at:S.c(0,.3),cls:'hl'});
    const R=[['Contract code','Kod kontrak','FCPO',S.c(1,.4)],['Underlying asset','Aset asas','Crude Palm Oil (CPO)',S.c(1,1.8)],['Contract size','Saiz kontrak','25 metric tonnes',S.c(1,4.2)],['Pricing unit','Unit harga','Ringgit Malaysia (RM) per MT',S.c(2,.4)],['Minimum price fluctuation','Tick size','RM1 per MT',S.c(2,3)],['Tick value','Nilai tick','RM25 per contract',S.c(2,5.6)],['Settlement method','Penyelesaian','Physical delivery',S.c(3,.4)]];
    R.forEach((r,i)=>{
      const row=S.add(`<div style="display:grid;grid-template-columns:560px 360px 1fr;align-items:center;height:72px;border-top:${i?'1px solid var(--line)':'0'};padding:0 36px;border-radius:8px"><div style="font:600 24px var(--sans)">${r[0]}</div><div class="small">${r[1]}</div><div style="font:700 30px var(--mono)">${r[2]}</div></div>`,{parent:card,x:0,y:20+i*78,w:1700,at:r[3],anim:'left'});
      const nx=R[i+1]?R[i+1][3]:1e9;
      S.step(r[3],on=>{row.style.background=on&&S._t<nx?'rgba(232,176,79,.14)':'transparent';});
    });
    S.add(`<div class="small">Sumber: Bursa Malaysia · sentiasa rujuk spesifikasi rasmi terkini</div>`,{x:110,y:880,at:S.c(3,1)});
  }},
  {id:'size',label:'SAIZ KONTRAK',lines:[
    ['Twenty-five metric tonnes is twenty-five thousand kilograms of crude palm oil, in a single contract.','Dua puluh lima tan metrik bersamaan dua puluh lima ribu kilogram minyak sawit mentah, dalam satu kontrak.'],
    ['Every price on the screen is per tonne, but your exposure is always for the full 25 tonnes, multiplied by the number of contracts.','Setiap harga di skrin adalah setan, tetapi pendedahan anda sentiasa bagi 25 tan penuh, didarab dengan bilangan kontrak.',.8],
  ],
  dir:'25 storage-tank icons (5×5) fill in with a counter 0 → 25 MT · 25,000 kg. Line 2: formula box "Harga (RM/MT) × 25 MT × bil. kontrak".',
  build(S){
    C.title(S,{kicker:'Contract size',title:'1 kontrak = 25 tan metrik',at:.1});
    for(let i=0;i<25;i++)S.add(`<div style="display:flex;flex-direction:column;align-items:center">${C.icon.drum(58)}<div style="font:600 14px var(--mono);color:var(--slate2);margin-top:2px">1 MT</div></div>`,{x:150+(i%5)*120,y:280+Math.floor(i/5)*112,w:100,at:S.c(0,.4)+i*.1,anim:'pop',d:.4});
    const cnt=S.add(`<div style="font:800 96px var(--mono)" class="blue">0 MT</div>`,{x:900,y:330,at:S.c(0,.4)});
    S.count(cnt,0,25,S.c(0,.4),2.5,v=>Math.round(v)+' MT');
    S.add(`<div style="font:600 40px var(--mono)">= 25,000 kg</div>`,{x:905,y:470,at:S.c(0,3)});
    S.add(`<div class="fbox" style="font-size:36px">Harga (RM/MT) × <b>25 MT</b> × bil. kontrak</div>`,{x:900,y:620,at:S.c(1,2),anim:'pop'});
  }},
  {id:'tick',label:'TICK VALUE',lines:[
    ['The smallest price change allowed is RM1 per tonne. This is called a tick.','Perubahan harga terkecil yang dibenarkan ialah RM1 setan. Ini dipanggil tick.'],
    ['Because one contract is 25 tonnes, one tick is worth RM25 per contract.','Oleh kerana satu kontrak ialah 25 tan, satu tick bernilai RM25 bagi setiap kontrak.'],
    ['So a RM10 move is RM250. A RM20 move is RM500. And a RM50 move is RM1,250, for every contract, up or down.','Jadi pergerakan RM10 ialah RM250. Pergerakan RM20 ialah RM500. Dan pergerakan RM50 ialah RM1,250, bagi setiap kontrak, naik atau turun.',.8],
  ],
  dir:'Left: price ladder (4,000 … 4,050) with a glowing cursor stepping up tick by tick; a chip counts "+n tick · +RMx". Right: table builds — RM1 → RM25, RM10 → RM250, RM20 → RM500, RM50 → RM1,250. Amber tag: naik atau turun.',
  build(S){
    C.title(S,{kicker:'Tick size & tick value',title:'RM1 setan = RM25 sekontrak',at:.1});
    const lad=C.card(S,{x:110,y:270,w:560,h:590,at:S.c(0,.2)});
    for(let i=0;i<6;i++){S.add(`<div style="font:600 30px var(--mono);color:var(--slate2)">${C.fmt(4050-i*10)}</div>`,{parent:lad,x:60,y:40+i*96,at:S.c(0,.4)+i*.06});
      S.add(`<div style="height:1px;background:var(--line);width:300px"></div>`,{parent:lad,x:200,y:58+i*96,at:S.c(0,.4)});}
    const cur=S.add(`<div style="height:6px;width:320px;background:var(--blue2);border-radius:3px;box-shadow:0 0 18px rgba(232,176,79,.8)"></div>`,{parent:lad,x:190,y:535,at:S.c(0,1.2),anim:'fade'});
    const tag=S.add(`<div class="chip up" style="font-size:24px">+RM0</div>`,{parent:lad,x:200,y:470,at:S.c(1,.2),anim:'pop'});
    S.tween(S.c(1,.2),S.e(2)-S.c(1,.2)-.5,p=>{const mv=Math.round(50*p);cur.style.top=(535-mv*9.6)+'px';tag.style.top=(480-mv*9.6)+'px';tag.textContent=`+${mv} tick · +RM${C.fmt(mv*25)}`;},'inout');
    const T=[['RM1','RM25',S.c(1,.4)],['RM10','RM250',S.c(2,.2)],['RM20','RM500',S.c(2,2)],['RM50','RM1,250',S.c(2,3.8)]];
    S.add(`<div style="display:grid;grid-template-columns:420px 420px;font:600 22px var(--mono);color:var(--slate2);letter-spacing:.1em"><div>PERGERAKAN / MT</div><div>NILAI / KONTRAK</div></div>`,{x:780,y:290,at:S.c(1,.2)});
    T.forEach((t,i)=>S.add(`<div style="display:grid;grid-template-columns:420px 420px;align-items:center;height:110px;border-top:1px solid var(--line)"><div style="font:700 52px var(--mono)">${t[0]}</div><div style="font:800 52px var(--mono)" class="blue">${t[1]}</div></div>`,{x:780,y:340+i*112,at:t[2],anim:'left'}));
    S.add(`<div class="tag warn" style="font-size:22px">Naik atau turun · untung atau rugi</div>`,{x:780,y:800,at:S.c(2,6),anim:'pop'});
  }},
  {id:'value',label:'NILAI KONTRAK ≠ MARGIN',lines:[
    ['Now contract value. At RM4,000 per tonne, one contract is worth RM4,000 times 25, or RM100,000.','Sekarang nilai kontrak. Pada RM4,000 setan, satu kontrak bernilai RM4,000 darab 25, iaitu RM100,000.'],
    ['Contract value is not the same as the margin needed to open a position. Margin is only a portion of it, set by clearing house requirements and your broker, and it can change.','Nilai kontrak tidak sama dengan margin yang diperlukan untuk membuka posisi. Margin hanyalah sebahagian daripadanya, ditetapkan oleh keperluan clearing house dan broker anda, dan ia boleh berubah.',.8],
  ],
  dir:'Formula box: RM4,000 × 25 MT = RM100,000 (count-up). Below: full-width CONTRACT VALUE bar with a small solid MARGIN segment. Amber chip: margin set by clearing house & broker, can change (→ Video 06).',
  build(S){
    C.title(S,{kicker:'Contract value',title:'Nilai kontrak bukan margin',at:.1});
    const f=S.add(`<div class="fbox" style="font-size:56px">RM4,000 × 25 MT = <b>RM0</b></div>`,{x:110,y:300,at:S.c(0,.6),anim:'pop'});
    S.count(f.querySelector('b'),0,100000,S.c(0,3),1.4,v=>C.rm(v));
    S.add(`<div class="small">Contract value · nilai kontrak</div>`,{x:110,y:500,at:S.c(1,.2)});
    const b=C.bar(S,{x:110,y:540,w:1700,h:70,color:'rgba(232,176,79,.25)'});b.set(S,S.c(1,.3),1,0,1);
    S.add(`<div style="background:#4C7BD9;border-radius:35px 0 0 35px"></div>`,{x:110,y:540,w:150,h:70,at:S.c(1,3),anim:'wipe'});
    S.add(`<div class="small blue">Margin · sebahagian kecil</div>`,{x:110,y:630,at:S.c(1,3.4)});
    S.add(`<div class="tag warn" style="font-size:22px">Margin ditetapkan oleh clearing house & broker · boleh berubah → Video 06</div>`,{x:110,y:720,at:S.c(1,6),anim:'pop'});
  }},
  {id:'delivery',label:'PHYSICAL DELIVERY',lines:[
    ['FCPO is a physically delivered contract. It is not cash-settled.','FCPO ialah kontrak penghantaran fizikal. Ia tidak diselesaikan secara tunai.'],
    ['If a position is carried into the delivery process, the exchange\'s delivery obligations and procedures apply. Sellers must deliver crude palm oil that meets the contract standards, and buyers must take delivery and pay for it.','Jika posisi dibawa ke proses penghantaran, obligasi dan prosedur penghantaran bursa terpakai. Penjual mesti menghantar minyak sawit mentah yang memenuhi standard kontrak, dan pembeli mesti menerima serta membayarnya.'],
    ['That is why retail traders generally close their positions before delivery-related obligations become relevant, subject to their broker\'s policies.','Sebab itulah trader runcit lazimnya menutup posisi sebelum obligasi berkaitan penghantaran menjadi relevan, tertakluk kepada polisi broker masing-masing.',.8],
  ],
  dir:'Contract-life timeline: Dagangan aktif → Last trading day → Proses penghantaran (amber zone with tank/ship icons). Tags: Physical delivery · ≠ Cash settlement. Seller/buyer obligation cards. Blue marker before last trading day: "Trader runcit: lazimnya tutup lebih awal · tertakluk polisi broker".',
  build(S){
    C.title(S,{kicker:'Settlement method',title:'Physical delivery — fahami tanggungjawabnya',at:.1,w:1700});
    S.add(`<div class="tag blue" style="font-size:22px">Physical delivery</div>`,{x:110,y:280,at:S.c(0,.4),anim:'pop'});
    S.add(`<div class="tag down" style="font-size:22px">≠ Cash settlement</div>`,{x:420,y:280,at:S.c(0,1.8),anim:'pop'});
    const sv=C.svg(S);
    const base=svgEl('line',{x1:160,y1:540,x2:1760,y2:540,stroke:'#2C3D60','stroke-width':6,'stroke-linecap':'round'});sv.appendChild(base);S.draw(base,S.c(1,.1),1.2);
    const zone=svgEl('rect',{x:1220,y:470,width:540,height:140,rx:10,fill:'rgba(245,165,36,.08)',stroke:'rgba(245,165,36,.5)','stroke-dasharray':'8 8'});sv.appendChild(zone);S.tween(S.c(1,1),.6,p=>zone.style.opacity=p,'out');
    S.add(`<div style="text-align:center;width:420px"><div class="h3">Dagangan aktif</div><div class="small" style="margin-top:6px">Buka & tutup posisi</div></div>`,{x:300,y:570,at:S.c(1,.3)});
    S.add(`<div style="width:4px;height:120px;background:var(--white)"></div>`,{x:1210,y:480,at:S.c(1,.9),anim:'wipev'});
    S.add(`<div class="small" style="width:240px">Last trading day</div>`,{x:1020,y:440,at:S.c(1,.9)});
    S.add(`<div style="display:flex;gap:20px">${C.icon.drum(60,'#F5A524')}${C.icon.ship(60,'#F5A524')}</div>`,{x:1430,y:300,at:S.c(1,1.2),anim:'pop'});
    S.add(`<div class="h3" style="color:var(--warn)">Proses penghantaran</div>`,{x:1250,y:400,at:S.c(1,1.2)});
    S.add(`<div class="card" style="padding:18px 22px"><div class="small" style="color:var(--down)">Penjual</div><div class="body" style="font-size:22px;margin-top:4px">Hantar CPO ikut standard kontrak</div></div>`,{x:1240,y:650,w:500,at:S.c(1,4.6),anim:'up'});
    S.add(`<div class="card" style="padding:18px 22px"><div class="small" style="color:var(--up)">Pembeli</div><div class="body" style="font-size:22px;margin-top:4px">Terima penghantaran & bayar</div></div>`,{x:1240,y:770,w:500,at:S.c(1,7),anim:'up'});
    S.add(`<div style="width:4px;height:120px;background:var(--blue2);box-shadow:0 0 16px rgba(232,176,79,.8)"></div>`,{x:900,y:480,at:S.c(2,.6),anim:'wipev'});
    S.add(`<div class="chip blue" style="font-size:22px">Trader runcit: lazimnya tutup lebih awal</div>`,{x:520,y:660,at:S.c(2,1),anim:'pop'});
    S.add(`<div class="small">Tertakluk polisi broker · bulan kontrak → Video 07</div>`,{x:520,y:740,at:S.c(2,3)});
  }},
  {id:'why',label:'MENGAPA PENTING',lines:[
    ['Why does all of this matter? Because the specifications tell you exactly what you are trading.','Mengapa semua ini penting? Kerana spesifikasi memberitahu dengan tepat apa yang anda dagangkan.'],
    ['How much each tick is worth, how large your exposure is, and what obligations come with the contract.','Berapa nilai setiap tick, berapa besar pendedahan anda, dan apakah obligasi yang datang bersama kontrak.',.8],
  ],
  dir:'Three stat tiles pop in with narration: RM25 / tick · RM100,000 exposure (example) · Delivery obligation.',
  build(S){
    C.title(S,{kicker:'Mengapa spesifikasi penting',title:'Tahu apa yang anda dagangkan',at:.1});
    [['RM25','setiap tick, setiap kontrak'],['RM100,000','pendedahan · contoh @ RM4,000'],['Delivery','obligasi penghantaran fizikal']].forEach((t,i)=>S.add(`<div class="card ${i===0?'hl':''}"><div style="position:absolute;left:36px;top:60px;font:800 64px var(--mono);color:${i===2?'var(--warn)':'var(--blue3)'}">${t[0]}</div><div class="small" style="position:absolute;left:36px;top:170px;width:470px">${t[1]}</div></div>`,{x:110+i*580,y:330,w:540,h:280,at:S.c(1,.2+i*1.6),anim:'up'}));
  }},
  ],
  takeaways:[
    ['FCPO is the crude palm oil futures contract traded on BMD.','FCPO ialah kontrak niaga hadapan minyak sawit mentah yang didagangkan di BMD.','FCPO = futures CPO di BMD'],
    ['One contract is 25 metric tonnes, priced in Ringgit per tonne.','Satu kontrak ialah 25 tan metrik, berharga dalam Ringgit setan.','25 MT · RM per MT'],
    ['One tick is RM1 per tonne, worth RM25 per contract.','Satu tick ialah RM1 setan, bernilai RM25 sekontrak.','1 tick = RM1 = RM25'],
    ['Contract value is price times 25, and it is not the margin.','Nilai kontrak ialah harga darab 25, dan ia bukan margin.','Nilai kontrak ≠ margin'],
    ['FCPO is physically delivered, with real obligations for positions held into delivery.','FCPO diselesaikan secara penghantaran fizikal, dengan obligasi sebenar bagi posisi yang dibawa ke penghantaran.','Physical delivery = obligasi sebenar'],
    ['Always check the latest official specifications.','Sentiasa semak spesifikasi rasmi terkini.','Semak spesifikasi rasmi terkini'],
  ],
  endQuote:['Before trading FCPO, know what you are trading. Understand the contract size, the tick value and the responsibilities of every contract.','Sebelum berdagang FCPO, kenali dahulu apa yang anda dagangkan. Fahami saiz kontrak, tick value dan tanggungjawab setiap kontrak.'],
  sources:[
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — Contract Specifications',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'Semua spesifikasi'},
    {org:'Bursa Malaysia Derivatives',title:'Rules of Bursa Malaysia Derivatives — FCPO contract & delivery procedures',url:'https://www.bursamalaysia.com/regulation/derivatives/rules',note:'Penghantaran fizikal'},
    {org:'Malaysian Palm Oil Board (MPOB)',title:'Malaysian palm oil industry overview & statistics',url:'https://bepi.mpob.gov.my/',note:'Konteks industri'},
  ],
  factcheck:[
    ['Kod FCPO; underlying CPO; 25 MT; RM/MT; tick RM1/MT; tick value RM25','Bursa FCPO spec','SEMAK'],
    ['Kaedah penyelesaian: physical delivery (bukan cash settlement)','Bursa FCPO spec','SEMAK'],
    ['Obligasi penghantaran penjual/pembeli (huraian umum, tanpa lokasi khusus)','BMD Rules','SEMAK'],
    ['Malaysia antara pengeluar minyak sawit terbesar dunia','MPOB','OK'],
    ['Jadual tick: 10→250, 20→500, 50→1,250','Aritmetik','OK'],
    ['Trader runcit lazimnya tutup sebelum penghantaran, tertakluk polisi broker','Amalan industri','OK (berkelayakan)'],
  ],
  assets:['Ikon perjalanan: ladang, kilang, CPO, kontrak, skrin','Grid 25 tangki "1 MT"','Tangga harga + kaunter tick','Garis masa hayat kontrak & zon penghantaran'],
});
