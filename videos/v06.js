/* VIDEO 06 — Margin Awal dan Margin Penyelenggaraan */
VIDEO({
  num:'06', badge:'M2', moduleLabel:'MODUL 2 · KONTRAK FCPO', short:'MARGIN',
  title:'Margin Awal dan Margin Penyelenggaraan',
  tagline:'Initial margin · Maintenance margin · Mark-to-market · Margin call',
  purpose:'Fahami modal',
  objectives:['Apa itu margin, initial & maintenance margin','Mark-to-market & variation margin','Margin call & forced liquidation','Margin bursa berbanding margin broker'],
  intro:[
    ['In this video, we look inside a futures account: how margin works, and what happens when equity falls.','Dalam video ini, kita lihat ke dalam akaun futures: bagaimana margin berfungsi, dan apa yang berlaku apabila ekuiti menurun.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    const sv=C.svg(S,{parent:c,w:580,h:300});
    const l1=svgEl('line',{x1:30,x2:550,y1:90,y2:90,stroke:'#60A5FA','stroke-width':2,'stroke-dasharray':'8 8'});sv.appendChild(l1);
    const l2=svgEl('line',{x1:30,x2:550,y1:170,y2:170,stroke:'#F5A524','stroke-width':2,'stroke-dasharray':'8 8'});sv.appendChild(l2);
    const p=svgEl('path',{d:'M30,90 L150,120 L240,105 L360,150 L460,200 L550,215',stroke:'#F1F5F9','stroke-width':4,fill:'none'});sv.appendChild(p);S.draw(p,1.1,1.6);
    S.tween(1,.4,q=>{l1.style.opacity=q;l2.style.opacity=q;},'out');
  },
  hook:{
    lines:[
      ['What happens when trading losses keep shrinking your margin balance?','Apa yang berlaku apabila kerugian trading menyebabkan baki margin anda semakin berkurang?',.4],
      ['To answer that, we need to understand two levels: initial margin and maintenance margin.','Untuk menjawabnya, kita perlu memahami dua paras: initial margin dan maintenance margin.',.6],
    ],
    dir:'Large account-equity number counts down from RM8,000 with each tick turning red; a horizontal gauge empties. On line 2, two threshold lines appear on the gauge labelled INITIAL and MAINTENANCE.',
    build(S){
      const n=S.add(`<div style="font:800 140px var(--mono);text-align:center;width:1920px">RM8,000</div>`,{x:0,y:300,at:.3,anim:'scale'});
      S.add(`<div class="small" style="text-align:center;width:1920px">Ekuiti akaun · ilustrasi hipotetikal</div>`,{x:0,y:260,at:.3});
      S.tween(1.2,3.6,p=>{const v=8000-2500*p;n.textContent=C.rm(Math.round(v/50)*50);n.style.color=p>0?'#EF5B5B':'#F1F5F9';},'inout');
      const g=C.bar(S,{x:360,y:520,w:1200,h:40,color:'#2563EB'});
      S.reveal(g.el,.6,{anim:'fade'});
      S.tween(.6,.01,p=>{g.fill.style.width='100%';},'lin');
      S.tween(1.2,3.6,p=>{g.fill.style.width=(100-31.25*p)+'%';},'inout');
      S.add(`<div style="width:3px;height:90px;background:var(--blue3)"></div>`,{x:1560,y:495,at:S.c(1,.4),anim:'wipev'});
      S.add(`<div class="small blue">Initial</div>`,{x:1500,y:600,at:S.c(1,.4)});
      S.add(`<div style="width:3px;height:90px;background:var(--warn)"></div>`,{x:1260,y:495,at:S.c(1,1.8),anim:'wipev'});
      S.add(`<div class="small" style="color:var(--warn)">Maintenance</div>`,{x:1180,y:600,at:S.c(1,1.8)});
    }
  },
  scenes:[
  {id:'what',label:'APA ITU MARGIN',lines:[
    ['Margin is collateral. It is money you place in your account to support an open futures position, and to show you can meet your obligations.','Margin ialah cagaran. Ia wang yang anda letakkan dalam akaun untuk menyokong posisi futures yang terbuka, dan menunjukkan anda mampu memenuhi obligasi.'],
    ['It is not a fee, it is not a down payment, and it is not the maximum you can lose.','Ia bukan yuran, bukan bayaran pendahuluan, dan bukan had maksimum kerugian anda.',.8],
  ],
  dir:'Shield/lock icon labelled "Cagaran · collateral" sits under an open position card. Line 2: three red "≠" tags: ≠ yuran · ≠ bayaran pendahuluan · ≠ had maksimum rugi.',
  build(S){
    C.title(S,{kicker:'Asas',title:'Margin = cagaran untuk menyokong posisi',at:.1});
    S.add(`<div class="node hl" style="width:440px;height:260px">${C.icon.lock(90)}<div class="nt" style="margin-top:14px">Margin</div><div class="ns">Collateral · cagaran</div></div>`,{x:220,y:330,at:S.c(0,.4),anim:'pop'});
    const sv=C.svg(S);C.arrow(S,sv,{x1:680,y1:460,x2:900,y2:460,at:S.c(0,2.4),d:.5});
    S.add(`<div class="card" style="padding:30px 36px"><div class="small">Posisi terbuka</div><div class="h3" style="margin-top:8px">1 × FCPO</div><div class="body" style="font-size:24px;margin-top:6px">Disokong oleh margin dalam akaun</div></div>`,{x:920,y:360,w:520,at:S.c(0,2.6),anim:'right'});
    ['≠ Yuran','≠ Bayaran pendahuluan','≠ Had maksimum rugi'].forEach((t,i)=>S.add(`<div class="tag down" style="font-size:26px;padding:12px 22px">${t}</div>`,{x:220+i*480,y:700,at:S.c(1,.3+i*1),anim:'pop'}));
  }},
  {id:'levels',label:'INITIAL & MAINTENANCE',lines:[
    ['Initial margin is the amount required to open a position. In our example, it is RM8,000 per contract.','Initial margin ialah jumlah yang diperlukan untuk membuka posisi. Dalam contoh kita, ia RM8,000 sekontrak.'],
    ['Maintenance margin is the minimum equity you must keep while the position is open. In our example, RM6,000.','Maintenance margin ialah ekuiti minimum yang mesti dikekalkan selagi posisi terbuka. Dalam contoh kita, RM6,000.'],
    ['These numbers are hypothetical. Actual requirements depend on clearing house requirements, market conditions and your broker\'s policy.','Angka ini hipotetikal. Keperluan sebenar bergantung pada keperluan clearing house, keadaan pasaran dan polisi broker anda.',.8],
  ],
  dir:'Vertical equity gauge (0 → RM10,000). Blue dashed line at RM8,000 labelled INITIAL MARGIN, amber dashed line at RM6,000 labelled MAINTENANCE MARGIN. Zone between = "zon selamat (ilustrasi)"; below amber = "zon margin call". Line 3: amber "HIPOTETIKAL" stamp.',
  build(S){
    C.title(S,{kicker:'Dua paras penting',title:'Initial margin & maintenance margin',at:.1});
    const card=C.card(S,{x:110,y:270,w:1000,h:600,at:S.c(0,.1)});
    const y=v=>540-(v/10000)*480;
    const sv=C.svg(S,{parent:card,w:1000,h:600});
    const zoneB=svgEl('rect',{x:220,y:y(6000),width:740,height:y(0)-y(6000),fill:'rgba(239,91,91,.08)'});sv.appendChild(zoneB);S.tween(S.c(1,2),.6,p=>zoneB.style.opacity=p,'out');
    [[8000,'#60A5FA','INITIAL MARGIN · RM8,000',S.c(0,1.6)],[6000,'#F5A524','MAINTENANCE MARGIN · RM6,000',S.c(1,1)]].forEach(l=>{
      const ln=svgEl('line',{x1:220,x2:960,y1:y(l[0]),y2:y(l[0]),stroke:l[1],'stroke-width':3,'stroke-dasharray':'12 10'});sv.appendChild(ln);S.tween(l[3],.6,p=>ln.style.opacity=p,'out');
      S.add(`<div style="font:600 20px var(--mono);color:${l[1]};background:rgba(16,27,50,.95);padding:2px 8px">${l[2]}</div>`,{parent:card,x:240,y:y(l[0])-40,at:l[3]});
    });
    [0,2000,4000,6000,8000,10000].forEach(v=>S.add(`<div class="ax" style="font:500 18px var(--mono);color:var(--slate)">${C.fmt(v)}</div>`,{parent:card,x:60,y:y(v)-12,at:S.c(0,.3)}));
    S.add(`<div class="small" style="color:var(--down)">Zon margin call</div>`,{parent:card,x:700,y:y(3000),at:S.c(1,2.4)});
    S.add(`<div class="card" style="padding:28px"><div class="small">Initial margin</div><div class="body" style="font-size:24px;margin-top:6px">Untuk <b>membuka</b> posisi</div></div>`,{x:1160,y:300,w:650,at:S.c(0,.8),anim:'right'});
    S.add(`<div class="card warn" style="padding:28px"><div class="small" style="color:var(--warn)">Maintenance margin</div><div class="body" style="font-size:24px;margin-top:6px">Ekuiti minimum untuk <b>mengekalkan</b> posisi</div></div>`,{x:1160,y:470,w:650,at:S.c(1,.4),anim:'right'});
    S.add(`<div class="tag warn" style="font-size:22px">Hipotetikal · bukan kadar FCPO semasa</div>`,{x:1160,y:660,at:S.c(2,.4),anim:'pop'});
    S.add(`<div class="body" style="font-size:22px">Bergantung: clearing house · keadaan pasaran · polisi broker</div>`,{x:1160,y:730,w:650,at:S.c(2,2)});
  }},
  {id:'mtm',label:'MARK-TO-MARKET',lines:[
    ['Every trading day, open positions are marked to market. They are revalued at the day\'s settlement price.','Setiap hari dagangan, posisi terbuka dinilai semula mengikut harga pasaran, iaitu mark-to-market, pada harga penyelesaian hari itu.'],
    ['Gains are credited to your account and losses are debited. This daily cash flow is called variation margin.','Keuntungan dikreditkan ke akaun anda dan kerugian didebitkan. Aliran tunai harian ini dipanggil variation margin.'],
    ['Say you are long one contract. Day one, the price falls RM40: minus RM1,000. Day two, it rises RM20: plus RM500. Day three, it falls RM80: minus RM2,000.','Katakan anda long satu kontrak. Hari pertama, harga turun RM40: tolak RM1,000. Hari kedua, naik RM20: tambah RM500. Hari ketiga, turun RM80: tolak RM2,000.'],
    ['In total, a loss of RM2,500. Equity falls from RM8,000 to RM5,500.','Secara keseluruhan, rugi RM2,500. Ekuiti jatuh dari RM8,000 ke RM5,500.',.8],
  ],
  dir:'Daily ledger table builds row by row: Hari | Pergerakan | Variation margin | Ekuiti. Day 0: RM8,000. Day 1: −RM40 → −RM1,000 → RM7,000. Day 2: +RM20 → +RM500 → RM7,500. Day 3: −RM80 → −RM2,000 → RM5,500. Final row highlights total −RM2,500 and equity RM5,500 in red.',
  build(S){
    C.title(S,{kicker:'Penilaian harian',title:'Mark-to-market & variation margin',at:.1});
    S.add(`<div class="tag blue" style="font-size:20px">Harga penyelesaian harian</div>`,{x:1360,y:150,at:S.c(0,2),anim:'pop'});
    S.add(`<div style="display:grid;grid-template-columns:300px 420px 480px 480px;font:600 20px var(--mono);color:var(--slate2);letter-spacing:.1em"><div>HARI</div><div>PERGERAKAN</div><div>VARIATION MARGIN</div><div>EKUITI</div></div>`,{x:110,y:300,at:S.c(1,.2)});
    const R=[['Mula','—','—','RM8,000','',S.c(1,1)],['Hari 1','−RM40 / MT','−RM1,000','RM7,000','down',S.c(2,.4)],['Hari 2','+RM20 / MT','+RM500','RM7,500','up',S.c(2,4)],['Hari 3','−RM80 / MT','−RM2,000','RM5,500','down',S.c(2,7)]];
    R.forEach((r,i)=>S.add(`<div style="display:grid;grid-template-columns:300px 420px 480px 480px;align-items:center;height:96px;border-top:1px solid var(--line);font:600 36px var(--mono)"><div style="font:600 30px var(--sans)">${r[0]}</div><div>${r[1]}</div><div class="${r[4]}">${r[2]}</div><div>${r[3]}</div></div>`,{x:110,y:345+i*100,at:Math.min(r[5],S.e(2)-.5),anim:'left'}));
    S.add(`<div class="fbox" style="border-color:var(--down);font-size:40px">Jumlah: <span class="down">−RM2,500</span> → Ekuiti <span class="down">RM5,500</span></div>`,{x:110,y:770,at:S.c(3,.3),anim:'pop'});
  }},
  {id:'dashboard',label:'PAPAN EKUITI',lines:[
    ['Now look at the same account on an equity dashboard.','Sekarang lihat akaun yang sama pada papan pemuka ekuiti.'],
    ['RM5,500 is below the illustrative maintenance level of RM6,000. The warning line has been crossed.','RM5,500 berada di bawah paras maintenance ilustrasi RM6,000. Garisan amaran telah dilepasi.',.8],
  ],
  dir:'Transparent dashboard: equity line steps through RM8,000 → 7,000 → 7,500 → 5,500 across Day 0–3; blue initial line at 8,000, amber maintenance line at 6,000. As the line crosses below amber, the panel border flashes amber and an alert chip "BAWAH MAINTENANCE" appears; status tile switches from "OK" to "MARGIN CALL".',
  build(S){
    C.title(S,{kicker:'Papan pemuka · ilustrasi',title:'Ekuiti melepasi garisan amaran',at:.1});
    const W=1180,H=560;const card=C.card(S,{x:110,y:280,w:W,h:H,at:S.c(0,.1)});
    const sv=C.svg(S,{parent:card,w:W,h:H});
    const y=v=>480-((v-4000)/5000)*400, x=d=>120+d*330;
    [[8000,'#60A5FA','── INITIAL 8,000',0],[6000,'#F5A524','── MAINTENANCE 6,000',1]].forEach(l=>{const ln=svgEl('line',{x1:100,x2:W-30,y1:y(l[0]),y2:y(l[0]),stroke:l[1],'stroke-width':3,'stroke-dasharray':'12 10'});sv.appendChild(ln);
      S.add(`<div style="font:600 18px var(--mono);color:${l[1]}">${l[2]}</div>`,{parent:card,x:30+l[3]*300,y:22,at:S.c(0,.6)});S.tween(S.c(0,.5),.5,p=>ln.style.opacity=p,'out');});
    const pts=[[0,8000],[1,7000],[2,7500],[3,5500]];
    const path=svgEl('path',{d:'M'+pts.map(p=>`${x(p[0])},${y(p[1])}`).join(' L'),stroke:'#F1F5F9','stroke-width':5,fill:'none'});sv.appendChild(path);
    S.draw(path,S.c(0,1),S.c(1,1.5)-S.c(0,1),'lin');
    pts.forEach((p,i)=>{const at=S.c(0,1)+(S.c(1,1.5)-S.c(0,1))*i/3;const c=svgEl('circle',{cx:x(p[0]),cy:y(p[1]),r:9,fill:i===3?'#EF5B5B':'#60A5FA'});sv.appendChild(c);S.tween(at,.3,q=>c.style.opacity=q,'out');
      S.add(`<div style="font:600 20px var(--mono)">${C.rm(p[1])}</div>`,{parent:card,x:x(p[0])-50,y:y(p[1])+(i===3?20:-48),at});
      S.add(`<div class="small">${i?'Hari '+i:'Mula'}</div>`,{parent:card,x:x(p[0])-30,y:H-50,at:S.c(0,.4)});});
    S.step(S.c(1,1.6),on=>card.classList.toggle('warn',on));
    const st=S.add(`<div class="card" style="padding:30px"><div class="small">Status akaun</div><div class="h2" style="margin-top:10px">OK</div></div>`,{x:1340,y:280,w:470,at:S.c(0,.4),anim:'right'});
    S.step(S.c(1,1.6),on=>{st.classList.toggle('warn',on);st.querySelector('.h2').innerHTML=on?'<span style="color:var(--warn)">MARGIN CALL</span>':'OK';});
    S.add(`<div class="chip down" style="font-size:24px">RM5,500 &lt; RM6,000</div>`,{x:1340,y:470,at:S.c(1,1.8),anim:'pop'});
  }},
  {id:'call',label:'MARGIN CALL',lines:[
    ['This can trigger a margin call: a request to deposit more funds, often to bring equity back up to the initial margin level, depending on your broker\'s terms.','Ini boleh mencetuskan margin call: permintaan untuk mendepositkan dana tambahan, selalunya untuk menaikkan ekuiti semula ke paras initial margin, bergantung pada terma broker anda.'],
    ['In our example, that would be RM2,500 to return to RM8,000.','Dalam contoh kita, iaitu RM2,500 untuk kembali ke RM8,000.'],
    ['If the call is not met in time, or the market moves sharply, the broker may reduce or close your positions. This is forced liquidation.','Jika margin call tidak dipenuhi tepat pada masanya, atau pasaran bergerak mendadak, broker boleh mengurangkan atau menutup posisi anda. Ini dipanggil forced liquidation.'],
    ['And remember: losses are not limited to your margin. If the account goes negative, you still owe the shortfall.','Dan ingat: kerugian tidak terhad kepada margin anda. Jika akaun menjadi negatif, anda masih berhutang kekurangan itu.',.8],
  ],
  dir:'Three-step consequence flow: 1 MARGIN CALL (amber, "Tambah dana") → top-up bar RM5,500 + RM2,500 = RM8,000 (illustrative); 2 FORCED LIQUIDATION (red, "Posisi dikurangkan/ditutup") if not met; 3 NEGATIVE EQUITY note "Anda berhutang kekurangan". Footer: "Mengikut terma broker & peraturan terpakai".',
  build(S){
    C.title(S,{kicker:'Akibat ekuiti tidak mencukupi',title:'Margin call → forced liquidation',at:.1});
    const c1=S.add(`<div class="card warn" style="padding:30px"><div class="small" style="color:var(--warn)">Langkah 1</div><div class="h3" style="margin-top:6px">Margin call</div><div class="body" style="font-size:22px;margin-top:6px">Tambah dana ke akaun</div></div>`,{x:110,y:280,w:540,at:S.c(0,.4),anim:'up'});
    const b=S.add(`<div style="display:flex;height:60px;border-radius:30px;overflow:hidden;width:1000px;background:rgba(44,61,96,.6)"><i style="display:block;width:68.75%;background:#2563EB"></i><i class="tp" style="display:block;width:0;background:#22C3A6"></i></div>`,{x:720,y:320,at:S.c(1,.2),anim:'fade'});
    S.tween(S.c(1,1),1.2,p=>{b.querySelector('.tp').style.width=(31.25*p)+'%';});
    S.add(`<div style="font:600 30px var(--mono)">RM5,500 <span class="up">+ RM2,500</span> = <b class="blue">RM8,000</b></div>`,{x:720,y:400,at:S.c(1,1.6)});
    S.add(`<div class="card down" style="padding:30px"><div class="small" style="color:var(--down)">Langkah 2 · jika tidak dipenuhi</div><div class="h3" style="margin-top:6px">Forced liquidation</div><div class="body" style="font-size:22px;margin-top:6px">Posisi dikurangkan atau ditutup oleh broker</div></div>`,{x:110,y:500,w:840,at:S.c(2,.4),anim:'up'});
    S.add(`<div class="card down" style="padding:30px"><div class="small" style="color:var(--down)">Ingat</div><div class="h3" style="margin-top:6px">Rugi tidak terhad kepada margin</div><div class="body" style="font-size:22px;margin-top:6px">Ekuiti negatif = anda berhutang kekurangan</div></div>`,{x:990,y:500,w:820,at:S.c(3,.3),anim:'up'});
    S.add(`<div class="small">Mengikut terma broker & peraturan yang terpakai</div>`,{x:110,y:780,at:S.c(2,3)});
  }},
  {id:'exbroker',label:'MARGIN BURSA VS BROKER',lines:[
    ['There are two layers of margin. The clearing house sets minimum margin requirements for its clearing participants.','Terdapat dua lapisan margin. Clearing house menetapkan keperluan margin minimum bagi peserta clearing.'],
    ['Your broker may require more than that minimum from you, based on its own risk policy. What you pay is your broker\'s requirement.','Broker anda boleh meminta lebih daripada paras minimum itu, berdasarkan polisi risiko sendiri. Yang anda bayar ialah keperluan broker anda.',.8],
  ],
  dir:'Two stacked bars: "Minimum clearing house" (shorter, slate) and "Keperluan broker" (equal or longer, blue) with a "≥" between them. Labels: BMDC · broker risk policy. Note chip: "Klien → ikut keperluan broker".',
  build(S){
    C.title(S,{kicker:'Dua lapisan',title:'Margin clearing house vs margin broker',at:.1});
    S.add(`<div style="display:flex;gap:16px;align-items:center">${C.icon.clearing(48)}<div><div class="h3">Minimum clearing house</div><div class="small">Bursa Malaysia Derivatives Clearing → peserta clearing</div></div></div>`,{x:110,y:300,at:S.c(0,.4)});
    const b1=C.bar(S,{x:110,y:400,w:1700,h:60,color:'#64748B'});b1.set(S,S.c(0,1.6),1,0,.55);
    S.add(`<div style="font:800 60px var(--mono)" class="blue">≥</div>`,{x:110,y:480,at:S.c(1,.2),anim:'pop'});
    S.add(`<div style="display:flex;gap:16px;align-items:center">${C.icon.broker(48)}<div><div class="h3">Keperluan broker</div><div class="small">Polisi risiko broker → klien</div></div></div>`,{x:110,y:580,at:S.c(1,.4)});
    const b2=C.bar(S,{x:110,y:680,w:1700,h:60,color:'#2563EB'});b2.set(S,S.c(1,1),1,0,.7);
    S.add(`<div class="tag blue" style="font-size:22px">Klien membayar mengikut keperluan broker</div>`,{x:110,y:790,at:S.c(1,4),anim:'pop'});
  }},
  {id:'change',label:'MARGIN BOLEH BERUBAH',lines:[
    ['Margin requirements are not fixed. The clearing house reviews them, and they can be raised or lowered, especially when volatility changes.','Keperluan margin tidak tetap. Clearing house menyemaknya, dan ia boleh dinaikkan atau diturunkan, terutamanya apabila volatiliti berubah.'],
    ['If margin rises, you may need more funds to hold the same position, even without making a new trade.','Jika margin naik, anda mungkin perlukan dana tambahan untuk memegang posisi yang sama, walaupun tanpa membuat dagangan baharu.',.8],
  ],
  dir:'Volatility wave (sparkline) grows choppier; a margin bar steps up in response (illustrative, no real rates). Line 2: same position card with a "+ dana diperlukan" chip.',
  build(S){
    C.title(S,{kicker:'Penting',title:'Keperluan margin boleh berubah',at:.1});
    const card=C.card(S,{x:110,y:280,w:1100,h:520,at:S.c(0,.1)});
    const sv=C.svg(S,{parent:card,w:1100,h:520});
    let d='M40,200';for(let i=1;i<=100;i++){const a=8+(i>50?40:0)*Math.min(1,(i-50)/20);d+=` L${40+i*10.2},${200+Math.sin(i*1.3)*a+Math.sin(i*.37)*a*.6}`;}
    const p=svgEl('path',{d,stroke:'#60A5FA','stroke-width':3,fill:'none'});sv.appendChild(p);S.draw(p,S.c(0,.4),3,'lin');
    S.add(`<div class="small">Volatiliti pasaran · ilustrasi</div>`,{parent:card,x:40,y:30,at:S.c(0,.4)});
    S.add(`<div class="small">Keperluan margin</div>`,{parent:card,x:40,y:360,at:S.c(0,2)});
    const mb=S.add(`<div style="height:50px;background:#2563EB;border-radius:25px;width:300px"></div>`,{parent:card,x:40,y:400,at:S.c(0,2),anim:'fade'});
    S.tween(S.c(0,4),1,q=>mb.style.width=(300+300*q)+'px');
    S.add(`<div class="chip warn" style="font-size:22px">Margin ▲</div>`,{parent:card,x:680,y:404,at:S.c(0,5),anim:'pop'});
    S.add(`<div class="card" style="padding:28px"><div class="small">Posisi sama</div><div class="h3" style="margin-top:6px">1 × FCPO</div></div>`,{x:1260,y:300,w:550,at:S.c(1,.2),anim:'right'});
    S.add(`<div class="tag warn" style="font-size:22px">+ Dana tambahan mungkin diperlukan</div>`,{x:1260,y:470,at:S.c(1,2.6),anim:'pop'});
  }},
  ],
  takeaways:[
    ['Margin is collateral that supports your position.','Margin ialah cagaran yang menyokong posisi anda.','Margin = cagaran'],
    ['Initial margin opens a position; maintenance margin is the minimum to keep it.','Initial margin untuk membuka posisi; maintenance margin ialah paras minimum untuk mengekalkannya.','Initial → buka · maintenance → kekal'],
    ['Positions are marked to market daily, through variation margin.','Posisi dinilai semula setiap hari melalui variation margin.','Mark-to-market harian'],
    ['Falling below maintenance can lead to a margin call, or forced liquidation.','Jatuh di bawah maintenance boleh membawa kepada margin call atau forced liquidation.','Bawah maintenance → margin call'],
    ['Brokers may require more than the clearing house minimum.','Broker boleh meminta lebih daripada minimum clearing house.','Broker ≥ minimum clearing house'],
    ['Margin requirements can change, and losses can exceed margin.','Keperluan margin boleh berubah, dan kerugian boleh melebihi margin.','Margin berubah · rugi boleh > margin'],
  ],
  endQuote:['Margin is not the maximum you can lose. It is collateral to support a futures position. Managing capital is every trader\'s responsibility.','Margin bukan had maksimum kerugian anda. Ia merupakan cagaran untuk menyokong posisi futures. Pengurusan modal adalah tanggungjawab setiap trader.'],
  sources:[
    {org:'Bursa Malaysia Derivatives Clearing',title:'Margin requirements & risk management (initial / maintenance margin)',url:'https://www.bursamalaysia.com/trade/trading_resources/derivatives/margin_requirements',note:'Margin clearing house'},
    {org:'Bursa Malaysia',title:'Rules of Bursa Malaysia Derivatives Clearing Berhad',url:'https://www.bursamalaysia.com/regulation/derivatives/rules',note:'Mark-to-market'},
    {org:'Securities Commission Malaysia',title:'InvestSmart® — Futures margin and risks',url:'https://www.sc.com.my/investsmart',note:'Pendidikan pelabur'},
    {org:'CME Group Education',title:'Introduction to Futures — Margin: know what is needed; mark-to-market',url:'https://www.cmegroup.com/education/courses/introduction-to-futures.html',note:'Prinsip global'},
  ],
  factcheck:[
    ['RM8,000 / RM6,000 dilabel HIPOTETIKAL; bukan kadar FCPO semasa','Polisi','OK'],
    ['Aritmetik: −1,000 + 500 − 2,000 = −2,500; 8,000 → 5,500 (<6,000)','Dalaman','OK'],
    ['Mark-to-market harian pada harga penyelesaian; variation margin','Prinsip global / BMDC','SEMAK amalan BMDC'],
    ['Struktur initial vs maintenance margin bagi FCPO di peringkat BMDC (mungkin sama/berbeza)','BMDC','SEMAK'],
    ['Margin call selalunya ke paras initial — dinyatakan "bergantung pada terma broker"','Amalan broker','OK (berkelayakan)'],
    ['Broker boleh menetapkan margin lebih tinggi daripada minimum clearing house','Amalan industri','OK'],
    ['Kerugian boleh melebihi margin; klien berhutang defisit','Prinsip / perjanjian klien','OK'],
  ],
  assets:['Papan pemuka ekuiti telus (garis ekuiti, garis initial biru, maintenance amber)','Lejar harian mark-to-market','Bar dua lapisan margin','Sparkline volatiliti'],
});
