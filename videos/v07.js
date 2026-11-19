/* VIDEO 07 — Bulan Kontrak dan Rollover */
VIDEO({
  num:'07', badge:'M2', moduleLabel:'MODUL 2 · KONTRAK FCPO', short:'BULAN KONTRAK',
  title:'Bulan Kontrak dan Rollover',
  tagline:'Contract month · Spot month · Last trading day · Rollover · Spread',
  purpose:'Fahami tempoh kontrak',
  objectives:['Contract month, spot month & tempoh matang','Last trading day','Rollover: tutup bulan dekat, buka bulan seterusnya','Contango, backwardation & calendar spread'],
  intro:[
    ['In this video, we look at contract months, expiry, and how traders roll positions forward.','Dalam video ini, kita lihat bulan kontrak, tempoh matang, dan cara trader melakukan rollover posisi.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    ['NOV','DEC','JAN','FEB'].forEach((m,i)=>S.add(`<div class="tag ${i===0?'blue':''}" style="font-size:22px">${m}</div>`,{parent:c,x:40+i*130,y:120,at:1+i*.2,anim:'pop'}));
  },
  hook:{
    lines:[
      ['Why would a trader need to switch from the November contract to the December contract?','Kenapa trader perlu menukar kontrak November kepada kontrak December?',.4],
      ['Because every futures contract has an expiry. Let us see what that means.','Kerana setiap kontrak futures mempunyai tempoh matang. Mari lihat maksudnya.',.6],
    ],
    dir:'Two contract cards, NOV 2026 and DEC 2026 (ilustrasi). A countdown ring on NOV shrinks; a curved arrow sweeps a position token from NOV to DEC. Line 2: an "EXPIRY" stamp lands on NOV.',
    build(S){
      const a=S.add(`<div class="card hl" style="text-align:center;padding-top:60px"><div class="small">Contract month</div><div style="font:800 80px var(--mono);margin-top:14px">NOV</div><div class="lead">2026 · ilustrasi</div></div>`,{x:360,y:270,w:460,h:400,at:.3,anim:'scale'});
      S.add(`<div class="card" style="text-align:center;padding-top:60px"><div class="small">Contract month</div><div style="font:800 80px var(--mono);margin-top:14px">DEC</div><div class="lead">2026 · ilustrasi</div></div>`,{x:1100,y:270,w:460,h:400,at:.8,anim:'scale'});
      const sv=C.svg(S);
      C.arrow(S,sv,{x1:600,y1:260,x2:1320,y2:260,at:2.2,d:1.2,curve:120,w:4});
      C.pulse(S,sv,{x1:600,y1:250,x2:1320,y2:250,at:2.4,d:1.2,r:12});
      S.add(`<div class="tag warn" style="font-size:30px;padding:12px 24px">EXPIRY</div>`,{x:470,y:700,at:S.c(1,.6),anim:'pop'});
    }
  },
  scenes:[
  {id:'month',label:'CONTRACT MONTH',lines:[
    ['Every futures contract is linked to a specific month, called the contract month. It tells you when that contract expires.','Setiap kontrak futures dikaitkan dengan bulan tertentu, dipanggil contract month. Ia memberitahu bila kontrak itu tamat tempoh.'],
    ['Several contract months are listed and traded at the same time, each as a separate contract with its own price.','Beberapa bulan kontrak disenaraikan dan didagangkan pada masa yang sama, setiap satunya kontrak berasingan dengan harganya sendiri.'],
    ['The exact listing cycle for FCPO is set out in Bursa Malaysia\'s official contract specifications.','Kitaran penyenaraian tepat bagi FCPO dinyatakan dalam spesifikasi kontrak rasmi Bursa Malaysia.',.8],
  ],
  dir:'Horizontal timeline of contract-month cards: NOV 2026 · DEC 2026 · JAN 2027 · FEB 2027 (all labelled ilustrasi), with "…" fading on the right. Each card shows its own price placeholder. Line 3: source chip "Kitaran penyenaraian → spesifikasi rasmi Bursa".',
  build(S){
    C.title(S,{kicker:'Contract month',title:'Setiap kontrak ada bulan matang',at:.1});
    const sv=C.svg(S);const ln=svgEl('line',{x1:110,y1:600,x2:1810,y2:600,stroke:'#2C3D60','stroke-width':4});sv.appendChild(ln);S.draw(ln,S.c(0,.4),1);
    const M=[['NOV','2026'],['DEC','2026'],['JAN','2027'],['FEB','2027']];
    M.forEach((m,i)=>{
      S.add(`<div class="card ${i===0?'hl':''}" style="text-align:center;padding-top:34px"><div style="font:800 54px var(--mono)">${m[0]}</div><div class="lead" style="font-size:26px">${m[1]}</div><div class="small" style="margin-top:14px">Kontrak berasingan</div></div>`,{x:150+i*400,y:300,w:340,h:230,at:S.c(i===0?0:1,i===0?1:.3+i*.6),anim:'up'});
      S.add(`<div style="width:16px;height:16px;border-radius:50%;background:var(--blue2)"></div>`,{x:312+i*400,y:592,at:S.c(0,1)+i*.2,anim:'pop'});
    });
    S.add(`<div style="font:800 54px var(--sans);color:var(--slate)">…</div>`,{x:1760,y:380,at:S.c(1,3)});
    S.add(`<div class="tag" style="font-size:20px">Ilustrasi · kitaran penyenaraian sebenar → spesifikasi rasmi Bursa</div>`,{x:110,y:680,at:S.c(2,.4),anim:'pop'});
  }},
  {id:'expiry',label:'MENGAPA ADA TARIKH MATANG',lines:[
    ['Why do futures expire? Because a futures contract is an agreement for a future date. At some point, that date arrives.','Mengapa futures tamat tempoh? Kerana kontrak futures ialah perjanjian bagi tarikh hadapan. Pada satu ketika, tarikh itu tiba.'],
    ['For FCPO, which is physically delivered, expiry is when trading in that month stops and the delivery process takes over.','Bagi FCPO, yang diselesaikan secara penghantaran fizikal, tamat tempoh ialah ketika dagangan bulan itu berhenti dan proses penghantaran mengambil alih.',.8],
  ],
  dir:'A contract card travels along a timeline toward a vertical "EXPIRY" gate. On reaching it, the card hands off into an amber "Proses penghantaran" box (tank/ship icons).',
  build(S){
    C.title(S,{kicker:'Expiry',title:'Perjanjian untuk tarikh hadapan',at:.1});
    const sv=C.svg(S);const ln=svgEl('line',{x1:110,y1:520,x2:1300,y2:520,stroke:'#2C3D60','stroke-width':4});sv.appendChild(ln);S.draw(ln,S.c(0,.3),1);
    const card=S.add(`<div class="card hl" style="text-align:center;padding-top:22px"><div style="font:800 40px var(--mono)">NOV</div><div class="small">FCPO</div></div>`,{x:110,y:440,w:200,h:150,at:S.c(0,.6),anim:'pop'});
    S.tween(S.c(0,2),S.e(0)-S.c(0,2),p=>card.style.left=(110+940*p)+'px');
    S.add(`<div style="width:6px;height:260px;background:var(--warn);border-radius:3px"></div>`,{x:1300,y:390,at:S.c(0,1),anim:'wipev'});
    S.add(`<div class="tag warn" style="font-size:22px">EXPIRY</div>`,{x:1250,y:340,at:S.c(0,1.2),anim:'pop'});
    S.add(`<div class="card warn" style="padding:30px;text-align:center"><div style="display:flex;justify-content:center;gap:18px">${C.icon.drum(56,'#F5A524')}${C.icon.ship(56,'#F5A524')}</div><div class="h3" style="margin-top:12px">Proses penghantaran</div><div class="small" style="margin-top:6px">Physical delivery</div></div>`,{x:1370,y:400,w:440,at:S.c(1,1.4),anim:'right'});
  }},
  {id:'spot',label:'SPOT MONTH & LTD',lines:[
    ['The nearest contract month that is currently expiring is called the spot month.','Bulan kontrak terdekat yang sedang menghampiri tamat tempoh dipanggil spot month.'],
    ['The last day it can be traded is the last trading day. For FCPO, this is generally the 15th day of the contract month, or the preceding business day if the 15th is not a business day.','Hari terakhir ia boleh didagangkan ialah last trading day. Bagi FCPO, ini lazimnya hari ke-15 bulan kontrak, atau hari bekerja sebelumnya jika hari ke-15 bukan hari bekerja.'],
    ['Always confirm the exact date in the official specification and your broker\'s notices, because brokers may also set earlier cut-off times for retail clients.','Sentiasa sahkan tarikh tepat dalam spesifikasi rasmi dan notis broker anda, kerana broker juga mungkin menetapkan had masa lebih awal untuk klien runcit.',.8],
  ],
  dir:'Month calendar grid (generic, no year) for the contract month. Day 15 highlighted blue with label "Last trading day*"; a small arrow notes "atau hari bekerja sebelumnya". The NOV card gets a "SPOT MONTH" tag. Line 3: amber chip "Broker mungkin tetapkan had lebih awal" + footnote "*Sahkan dengan spesifikasi rasmi".',
  build(S){
    C.title(S,{kicker:'Spot month · last trading day',title:'Bila bulan kontrak berhenti didagangkan',at:.1,w:1700});
    S.add(`<div class="card hl" style="text-align:center;padding-top:40px"><div style="font:800 64px var(--mono)">NOV</div><div class="lead" style="font-size:26px">2026 · ilustrasi</div></div>`,{x:110,y:300,w:420,h:260,at:S.c(0,.3),anim:'scale'});
    S.add(`<div class="tag blue" style="font-size:24px">SPOT MONTH</div>`,{x:110,y:590,at:S.c(0,1.6),anim:'pop'});
    const cal=C.card(S,{x:640,y:280,w:1170,h:560,at:S.c(1,.1)});
    S.add(`<div class="small">Bulan kontrak · grid generik</div>`,{parent:cal,x:30,y:24});
    for(let d=1;d<=30;d++){const i=d-1;const is15=d===15;
      const el=S.add(`<div style="display:flex;align-items:center;justify-content:center;border-radius:8px;font:600 26px var(--mono);border:1px solid ${is15?'var(--blue2)':'var(--line)'};background:${is15?'rgba(232,176,79,.35)':'transparent'};color:${is15?'#fff':'var(--slate2)'}">${d}</div>`,{parent:cal,x:30+(i%7)*160,y:80+Math.floor(i/7)*92,w:140,h:76,at:S.c(1,.3)+i*.03,anim:'fade'});
    }
    S.add(`<div class="chip blue" style="font-size:22px;position:static;display:inline-block">15 = Last trading day*</div>`,{parent:cal,x:900,y:20,at:S.c(1,3),anim:'pop'});
    S.add(`<div class="small" style="width:500px">*atau hari bekerja sebelumnya</div>`,{parent:cal,x:30,y:520,at:S.c(1,6)});
    S.add(`<div class="tag warn" style="font-size:16px">Broker mungkin tetapkan had lebih awal</div>`,{x:110,y:680,at:S.c(2,3.5),anim:'pop'});
    S.add(`<div class="small" style="width:500px">Sahkan dengan spesifikasi rasmi Bursa & notis broker</div>`,{x:110,y:750,at:S.c(2,1)});
  }},
  {id:'prices',label:'HARGA BERBEZA',lines:[
    ['Each contract month has its own price. In this illustration, November trades at RM4,000, and December at RM4,025.','Setiap bulan kontrak mempunyai harganya sendiri. Dalam ilustrasi ini, November didagangkan pada RM4,000, dan December pada RM4,025.'],
    ['These differences reflect expectations about supply and demand, storage and financing costs, and timing. They change every day.','Perbezaan ini mencerminkan jangkaan tentang penawaran dan permintaan, kos simpanan dan pembiayaan, serta masa. Ia berubah setiap hari.',.8],
  ],
  dir:'Four month columns with price tags: NOV RM4,000 · DEC RM4,025 · JAN RM4,045 · FEB RM4,060 (all hypothetical). A connecting line forms a forward curve. Line 2: three driver chips appear: Penawaran & permintaan · Kos simpanan & pembiayaan · Masa.',
  build(S){
    C.title(S,{kicker:'Struktur harga',title:'Bulan berbeza, harga berbeza',at:.1});
    const P=[['NOV 26',4000],['DEC 26',4025],['JAN 27',4045],['FEB 27',4060]];
    const card=C.card(S,{x:110,y:270,w:1700,h:440,at:S.c(0,.1)});
    const sv=C.svg(S,{parent:card,w:1700,h:440});
    const y=v=>360-(v-3980)*3.2, x=i=>220+i*420;
    const path=svgEl('path',{d:'M'+P.map((p,i)=>`${x(i)},${y(p[1])}`).join(' L'),stroke:'#F0C36B','stroke-width':4,fill:'none'});sv.appendChild(path);S.draw(path,S.c(0,4),1.6);
    P.forEach((p,i)=>{const at=i<2?S.c(0,1.2+i*2.2):S.c(0,4.6+i*.4);
      const c=svgEl('circle',{cx:x(i),cy:y(p[1]),r:10,fill:'#F0C36B'});sv.appendChild(c);S.tween(at,.3,q=>c.style.opacity=q,'out');
      S.add(`<div style="text-align:center;width:240px"><div style="font:800 34px var(--mono)">${C.rm(p[1])}</div><div class="small" style="margin-top:4px">${p[0]}</div></div>`,{parent:card,x:x(i)-120,y:y(p[1])-120,at,anim:'up'});});
    S.add(`<div class="tag warn" style="font-size:18px">Harga hipotetikal</div>`,{parent:card,x:1440,y:380,at:S.c(0,1)});
    ['Penawaran & permintaan','Kos simpanan & pembiayaan','Masa'].forEach((t,i)=>S.add(`<div class="tag blue" style="font-size:22px">${t}</div>`,{x:110+i*470,y:750,at:S.c(1,.6+i*1.4),anim:'pop'}));
  }},
  {id:'rollover',label:'ROLLOVER',lines:[
    ['Now, rollover. Say you hold a long position in November, and you want to keep your exposure beyond November\'s expiry.','Sekarang, rollover. Katakan anda memegang posisi long November, dan ingin mengekalkan pendedahan melepasi tamat tempoh November.'],
    ['You close the November position by selling it, and open a new long position in December by buying it. That switch is a rollover.','Anda menutup posisi November dengan menjualnya, dan membuka posisi long baharu di December dengan membelinya. Pertukaran ini dipanggil rollover.'],
    ['Notice: selling November at RM4,000 and buying December at RM4,025 is not a RM25 loss. You simply hold a different contract, at its own price.','Perhatikan: menjual November pada RM4,000 dan membeli December pada RM4,025 bukanlah kerugian RM25. Anda cuma memegang kontrak berbeza, pada harganya sendiri.'],
    ['Your profit or loss on November is realised when you close it. From then on, your result depends on how December moves. Each leg also has transaction costs.','Untung atau rugi November direalisasikan apabila ia ditutup. Selepas itu, keputusan anda bergantung pada pergerakan December. Setiap kaki dagangan juga ada kos transaksi.',.8],
  ],
  dir:'Two contract cards side by side. Position token sits on NOV (LONG). Line 2: NOV card shows "SELL to close @ 4,000" (position token lifts off), DEC card shows "BUY to open @ 4,025" (token lands). Line 3: a "RM25 beza ≠ rugi" tag with a crossed-out "−RM625". Line 4: two chips: "P&L NOV direalisasi" and "P&L baharu ikut DEC", plus "2 × kos transaksi".',
  build(S){
    C.title(S,{kicker:'Rollover',title:'Tutup NOV → buka DEC',at:.1});
    const A=S.add(`<div class="card" style="text-align:center;padding-top:40px"><div style="font:800 64px var(--mono)">NOV 26</div><div style="font:700 36px var(--mono);margin-top:10px">RM4,000</div></div>`,{x:200,y:300,w:560,h:300,at:S.c(0,.2),anim:'scale'});
    const B=S.add(`<div class="card" style="text-align:center;padding-top:40px"><div style="font:800 64px var(--mono)">DEC 26</div><div style="font:700 36px var(--mono);margin-top:10px">RM4,025</div></div>`,{x:1160,y:300,w:560,h:300,at:S.c(0,.6),anim:'scale'});
    S.step(S.c(0,.6),on=>A.classList.toggle('hl',on&&S._t<S.c(1,3)));
    S.step(S.c(1,3),on=>B.classList.toggle('hl',on));
    const tok=S.add(`<div class="chip up" style="font-size:28px">LONG × 1</div>`,{x:390,y:250,at:S.c(0,2),anim:'pop'});
    S.tween(S.c(1,2.6),1.4,p=>{tok.style.left=(390+960*p)+'px';tok.style.top=(250-80*Math.sin(Math.PI*p))+'px';});
    S.add(`<div class="tag down" style="font-size:22px">SELL to close @ 4,000</div>`,{x:300,y:620,at:S.c(1,.8),anim:'pop'});
    S.add(`<div class="tag up" style="font-size:22px">BUY to open @ 4,025</div>`,{x:1270,y:620,at:S.c(1,3.6),anim:'pop'});
    S.add(`<div class="card" style="padding:22px 30px;text-align:center"><div style="font:700 30px var(--mono)"><s class="dim">−RM625</s> &nbsp; Beza RM25 ≠ rugi</div></div>`,{x:610,y:690,w:700,at:S.c(2,.6),anim:'pop'});
    S.add(`<div class="tag blue" style="font-size:20px">P&L NOV direalisasi semasa ditutup</div>`,{x:200,y:810,at:S.c(3,.4),anim:'pop'});
    S.add(`<div class="tag blue" style="font-size:20px">P&L seterusnya ikut pergerakan DEC</div>`,{x:820,y:810,at:S.c(3,3),anim:'pop'});
    S.add(`<div class="tag warn" style="font-size:20px">2 × kos transaksi</div>`,{x:1460,y:810,at:S.c(3,6),anim:'pop'});
  }},
  {id:'liquidity',label:'PERPINDAHAN KECAIRAN',lines:[
    ['Traders roll over to keep their exposure, and to avoid holding a position into the delivery process.','Trader melakukan rollover untuk mengekalkan pendedahan, dan untuk mengelak memegang posisi hingga ke proses penghantaran.'],
    ['As a month approaches expiry, trading activity tends to move to later months. For FCPO, activity is often concentrated in the third-month contract, which market reports commonly quote as the benchmark.','Apabila sesuatu bulan menghampiri tamat tempoh, aktiviti dagangan cenderung berpindah ke bulan-bulan seterusnya. Bagi FCPO, aktiviti sering tertumpu pada kontrak bulan ketiga, yang lazimnya dipetik dalam laporan pasaran sebagai penanda aras.',.8],
  ],
  dir:'Volume bars for NOV · DEC · JAN · FEB. Over the scene the NOV bar shrinks while later months grow — liquidity visibly migrates right. Line 2: the third-month bar glows with a "Penanda aras lazim · bulan ketiga" tag (illustrative bar heights).',
  build(S){
    C.title(S,{kicker:'Kecairan',title:'Aktiviti berpindah ke bulan seterusnya',at:.1});
    const card=C.card(S,{x:110,y:270,w:1700,h:540,at:S.c(0,.1)});
    const M=['NOV 26','DEC 26','JAN 27','FEB 27'];
    const from=[.9,.55,.35,.15], to=[.12,.45,.95,.35];
    const bars=M.map((m,i)=>{S.add(`<div class="small" style="width:260px;text-align:center">${m}</div>`,{parent:card,x:180+i*380,y:480,at:S.c(0,.3)});
      return S.add(`<div style="position:absolute;bottom:80px;width:200px;border-radius:8px 8px 0 0;background:${i===2?'#E8B04F':'rgba(232,176,79,.35)'}"></div>`,{parent:card,x:210+i*380,at:S.c(0,.4),anim:'fade'});});
    bars.forEach((b,i)=>{b.style.top='';S.tween(S.c(0,.4),.01,()=>{},'lin');S.tween(S.c(0,1.5),S.e(1)-S.c(0,1.5)-2,p=>{b.style.height=(380*(from[i]+(to[i]-from[i])*p))+'px';},'inout');});
    S.add(`<div class="small">Volume dagangan · ilustrasi</div>`,{parent:card,x:30,y:24,at:S.c(0,.2)});
    S.add(`<div class="tag blue" style="font-size:20px">Penanda aras lazim · bulan ketiga</div>`,{x:860,y:830,at:S.c(1,6),anim:'pop'});
  }},
  {id:'curve',label:'CONTANGO & BACKWARDATION',lines:[
    ['When later months are priced higher than nearer months, the market is in contango.','Apabila bulan-bulan kemudian berharga lebih tinggi daripada bulan terdekat, pasaran berada dalam keadaan contango.'],
    ['When nearer months are priced higher than later months, often because near-term supply is tight, the market is in backwardation.','Apabila bulan terdekat berharga lebih tinggi daripada bulan kemudian, selalunya kerana bekalan jangka dekat ketat, pasaran berada dalam keadaan backwardation.',.8],
  ],
  dir:'Two side-by-side forward-curve panels. LEFT CONTANGO: upward-sloping line across NOV→FEB. RIGHT BACKWARDATION: downward-sloping line. Each draws with its narration line; labels "Bulan kemudian > bulan dekat" and "Bulan dekat > bulan kemudian".',
  build(S){
    C.title(S,{kicker:'Bentuk keluk harga',title:'Contango & backwardation',at:.1});
    [['CONTANGO','Bulan kemudian > bulan dekat',[4000,4025,4045,4060],0],['BACKWARDATION','Bulan dekat > bulan kemudian',[4060,4040,4020,4005],1]].forEach((c,k)=>{
      const card=C.card(S,{x:110+k*870,y:270,w:830,h:540,at:S.c(k,.1)});
      S.add(`<div class="h3">${c[0]}</div><div class="small" style="margin-top:6px">${c[1]}</div>`,{parent:card,x:30,y:26,at:S.c(k,.3)});
      const sv=C.svg(S,{parent:card,w:830,h:540});
      const y=v=>440-(v-3990)*3.6,x=i=>110+i*200;
      const p=svgEl('path',{d:'M'+c[2].map((v,i)=>`${x(i)},${y(v)}`).join(' L'),stroke:k?'#F5A524':'#F0C36B','stroke-width':5,fill:'none'});sv.appendChild(p);S.draw(p,S.c(k,1),1.6);
      ['NOV','DEC','JAN','FEB'].forEach((m,i)=>{const c2=svgEl('circle',{cx:x(i),cy:y(c[2][i]),r:9,fill:k?'#F5A524':'#F0C36B'});sv.appendChild(c2);S.tween(S.c(k,1)+i*.35,.3,q=>c2.style.opacity=q,'out');
        S.add(`<div class="small" style="width:80px;text-align:center">${m}</div>`,{parent:card,x:x(i)-40,y:480,at:S.c(k,.6)});});
    });
  }},
  {id:'spread',label:'CALENDAR SPREAD',lines:[
    ['Some traders trade the difference between two months directly. This is a calendar spread: long one month and short another at the same time.','Sesetengah trader berdagang perbezaan antara dua bulan secara langsung. Ini dipanggil calendar spread: long satu bulan dan short bulan lain pada masa yang sama.'],
    ['Here, the result depends on how the gap between the two months changes, not simply on whether prices go up or down. Spreads still carry risk.','Di sini, keputusan bergantung pada perubahan jurang antara dua bulan, bukan semata-mata sama ada harga naik atau turun. Spread tetap mempunyai risiko.',.8],
  ],
  dir:'Two legs stacked: LONG DEC (teal) and SHORT FEB (red), joined by a bracket labelled "Spread = jurang harga". The bracket width animates wider and narrower to show the spread changing while both prices drift together. Amber chip: "Spread tetap berisiko".',
  build(S){
    C.title(S,{kicker:'Calendar spread',title:'Berdagang jurang antara dua bulan',at:.1});
    const a=S.add(`<div class="card up" style="padding:28px 34px"><div class="small" style="color:var(--up)">Kaki 1 · Long</div><div style="font:800 44px var(--mono);margin-top:8px">DEC 26</div></div>`,{x:110,y:300,w:520,at:S.c(0,2.4),anim:'left'});
    const b=S.add(`<div class="card down" style="padding:28px 34px"><div class="small" style="color:var(--down)">Kaki 2 · Short</div><div style="font:800 44px var(--mono);margin-top:8px">FEB 27</div></div>`,{x:110,y:560,w:520,at:S.c(0,4.2),anim:'left'});
    const card=C.card(S,{x:720,y:280,w:1090,h:480,at:S.c(0,1)});
    const sv=C.svg(S,{parent:card,w:1090,h:480});
    const l1=svgEl('line',{x1:60,x2:1030,stroke:'#22C3A6','stroke-width':4});const l2=svgEl('line',{x1:60,x2:1030,stroke:'#EF5B5B','stroke-width':4});sv.appendChild(l1);sv.appendChild(l2);
    const br=svgEl('line',{x1:540,x2:540,stroke:'#F1F5F9','stroke-width':3});sv.appendChild(br);
    const lab=S.add(`<div class="chip blue" style="font-size:22px">Spread</div>`,{parent:card,x:570,y:200,at:S.c(0,5),anim:'pop'});
    S.tween(S.c(0,1.2),Math.max(2,S.e(1)-S.c(0,1.2)),p=>{const base=240-60*Math.sin(p*Math.PI);const gap=70+50*Math.sin(p*Math.PI*3);l1.setAttribute('y1',base+gap/2);l1.setAttribute('y2',base+gap/2);l2.setAttribute('y1',base-gap/2);l2.setAttribute('y2',base-gap/2);br.setAttribute('y1',base-gap/2);br.setAttribute('y2',base+gap/2);lab.style.top=(base-24)+'px';},'lin');
    S.add(`<div class="small">Harga bergerak bersama · jurang berubah</div>`,{parent:card,x:30,y:24,at:S.c(1,.4)});
    S.add(`<div class="tag warn" style="font-size:20px">Spread tetap berisiko</div>`,{x:720,y:790,at:S.c(1,5),anim:'pop'});
  }},
  ],
  takeaways:[
    ['Every futures contract has a contract month and an expiry.','Setiap kontrak futures mempunyai bulan kontrak dan tarikh matang.','Contract month = bila kontrak tamat'],
    ['The spot month is the nearest expiring month; trading stops on the last trading day.','Spot month ialah bulan terdekat yang akan tamat; dagangan berhenti pada last trading day.','Spot month · last trading day'],
    ['Different months have different prices.','Bulan berbeza mempunyai harga berbeza.','Bulan berbeza, harga berbeza'],
    ['Rollover means closing the near month and opening a later one; the price gap itself is not a loss.','Rollover bermaksud menutup bulan dekat dan membuka bulan kemudian; jurang harga itu sendiri bukan kerugian.','Rollover: jurang harga ≠ rugi'],
    ['Contango and backwardation describe the shape of the price curve.','Contango dan backwardation menggambarkan bentuk keluk harga.','Contango ↗ · backwardation ↘'],
    ['Always confirm expiry dates with the official specification and your broker.','Sentiasa sahkan tarikh matang dengan spesifikasi rasmi dan broker anda.','Sahkan tarikh dengan Bursa & broker'],
  ],
  endQuote:['Futures contracts have a maturity. Understanding contract months and rollover helps traders manage their positions in a more organised way.','Kontrak futures mempunyai tempoh matang. Memahami contract month dan rollover membantu trader menguruskan posisi dengan lebih teratur.'],
  sources:[
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — Contract Specifications (contract months, last trading day)',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'Bulan & LTD'},
    {org:'Bursa Malaysia',title:'Derivatives trading calendar / holidays',url:'https://www.bursamalaysia.com/about_bursa/about_us/calendar',note:'Hari bekerja'},
    {org:'CME Group Education',title:'Understanding futures expiration & contract roll; contango and backwardation',url:'https://www.cmegroup.com/education/courses/introduction-to-futures.html',note:'Prinsip global'},
  ],
  factcheck:[
    ['Kitaran penyenaraian bulan FCPO — TIDAK dinyatakan dalam video; dirujuk ke spesifikasi rasmi','Bursa FCPO spec','SEMAK'],
    ['Last trading day FCPO: hari ke-15 bulan kontrak (tengah hari) atau hari bekerja sebelumnya','Bursa FCPO spec','SEMAK — kritikal'],
    ['NOV 2026–FEB 2027 & harga 4,000/4,025/4,045/4,060 dilabel ilustrasi','Polisi','OK'],
    ['Nota: kontrak NOV 2026 sebenar telah tamat (LTD ~13 Nov 2026); digunakan sebagai ilustrasi sahaja','Kalendar','PERHATIAN'],
    ['Aktiviti FCPO tertumpu pada kontrak bulan ketiga (penanda aras laporan pasaran)','Laporan pasaran / Bursa','SEMAK'],
    ['Rollover: jurang harga bukan untung/rugi; P&L NOV direalisasi; 2 × kos','Prinsip global','OK'],
    ['Definisi contango / backwardation / calendar spread','CME','OK'],
  ],
  assets:['Kad bulan kontrak NOV–FEB','Grid kalendar generik dengan hari 15 diserlahkan','Token posisi untuk animasi rollover','Bar volume (perpindahan kecairan)','Panel keluk contango/backwardation'],
});
