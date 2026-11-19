/* VIDEO 04 — Leverage — Peluang dan Risikonya */
VIDEO({
  num:'04', badge:'M1', moduleLabel:'MODUL 1 · KENALI NIAGA HADAPAN', short:'LEVERAGE',
  title:'Leverage — Peluang dan Risikonya',
  tagline:'Contract value · Margin · Leverage · Margin call',
  purpose:'Fahami risiko',
  objectives:['Beza nilai kontrak dan margin','Cara leverage dikira','Kesan pergerakan kecil terhadap modal','Margin call, likuidasi & pengurusan risiko'],
  intro:[
    ['In this video, we unpack leverage: what it is, how it is calculated, and why it must be respected.','Dalam video ini, kita huraikan leverage: apa ia, bagaimana ia dikira, dan mengapa ia mesti dihormati.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    S.add(`<div style="font:700 26px var(--mono)" class="blue">RM8,000</div>`,{parent:c,x:50,y:200,at:1.1});
    S.add(`<div style="width:90px;height:40px;background:var(--blue2);border-radius:6px"></div>`,{parent:c,x:60,y:140,at:1.1,anim:'wipev'});
    S.add(`<div style="width:300px;height:180px;background:rgba(232,176,79,.18);border:2px solid var(--blue3);border-radius:8px"></div>`,{parent:c,x:240,y:40,at:1.6,anim:'scale'});
    S.add(`<div style="font:700 26px var(--mono)">RM100,000</div>`,{parent:c,x:300,y:230,at:1.8});
  },
  hook:{
    lines:[
      ['How can RM8,000 give you exposure to a contract worth RM100,000?','Bagaimana RM8,000 boleh memberikan pendedahan kepada kontrak bernilai RM100,000?',.4],
      ['The answer is leverage. And it works for you, and against you, at the same speed.','Jawapannya ialah leverage. Ia boleh menyebelahi anda, dan juga menentang anda, pada kelajuan yang sama.',.6],
    ],
    dir:'A small blue block "RM8,000" sits on the left; a large outlined block "RM100,000" grows on the right. A connecting beam forms between them. Line 2: the beam tilts both ways (up teal / down red), labelled "untung ↑ / rugi ↓".',
    build(S){
      const a=S.add(`<div class="card hl" style="display:flex;align-items:center;justify-content:center;font:800 40px var(--mono)">RM8,000</div>`,{x:260,y:470,w:300,h:160,at:.3,anim:'pop'});
      const b=S.add(`<div class="card" style="display:flex;align-items:center;justify-content:center;font:800 72px var(--mono);border:2px solid var(--blue3)">RM100,000</div>`,{x:900,y:220,w:760,h:410,at:1.4,anim:'scale',d:1});
      S.add(`<div class="small">Modal (margin)</div>`,{x:262,y:650,at:.8});
      S.add(`<div class="small">Pendedahan kontrak</div>`,{x:902,y:650,at:1.8});
      S.add(`<div style="font:800 80px var(--sans);color:var(--blue3)">?</div>`,{x:690,y:440,at:2.4,anim:'pop',out:S.c(1,0)});
      S.add(`<div class="chip up" style="font-size:30px">▲ Untung diperbesar</div>`,{x:600,y:740,at:S.c(1,2.2),anim:'pop'});
      S.add(`<div class="chip down" style="font-size:30px">▼ Rugi diperbesar</div>`,{x:1000,y:740,at:S.c(1,3.2),anim:'pop'});
    }
  },
  scenes:[
  {id:'value',label:'NILAI KONTRAK',lines:[
    ['Start with contract value. FCPO at RM4,000 per tonne, times 25 tonnes, gives a contract value of RM100,000.','Mulakan dengan nilai kontrak. FCPO pada RM4,000 setan, darab 25 tan, memberikan nilai kontrak RM100,000.'],
    ['That is the size of the price exposure you carry with just one contract.','Itulah saiz pendedahan harga yang anda tanggung dengan hanya satu kontrak.',.8],
  ],
  dir:'25 tonne-blocks (5×5 grid) fill in quickly; each block labelled 1 MT. A counter beside it multiplies RM4,000 × 25 and counts up to RM100,000. Line 2: the grid is framed and labelled "Pendedahan · 1 kontrak".',
  build(S){
    C.title(S,{kicker:'Langkah 1 · Contract value',title:'Nilai kontrak = harga × saiz kontrak',at:.1});
    for(let i=0;i<25;i++){
      S.add(`<div style="background:linear-gradient(180deg,#1E3A8A,#1D4ED8);border:1px solid #E8B04F;border-radius:6px;display:flex;align-items:center;justify-content:center;font:600 16px var(--mono);color:#DBEAFE">1 MT</div>`,{x:140+(i%5)*110,y:300+Math.floor(i/5)*100,w:96,h:86,at:S.c(0,.8)+i*.09,anim:'pop',d:.4});
    }
    S.add(`<div style="border:2px dashed var(--blue3);border-radius:12px"></div>`,{x:120,y:280,w:590,h:520,at:S.c(1,.2),anim:'fade'});
    S.add(`<div class="tag blue" style="font-size:20px">Pendedahan · 1 kontrak</div>`,{x:120,y:815,at:S.c(1,.5),anim:'pop'});
    const f=S.add(`<div style="font:600 54px/1.6 var(--mono)"></div>`,{x:860,y:340});
    S.add(`<div>RM4,000 <span class="dim">/ MT</span></div>`,{parent:f,at:S.c(0,2)});
    S.add(`<div>× 25 <span class="dim">MT</span></div>`,{parent:f,at:S.c(0,3.4)});
    const tot=S.add(`<div class="blue" style="font-weight:800;font-size:76px">= RM0</div>`,{parent:f,at:S.c(0,4.6)});
    S.count(tot,0,100000,S.c(0,4.6),1.4,v=>'= '+C.rm(v));
    S.add(`<div class="small">Contract value · ilustrasi hipotetikal</div>`,{x:860,y:690,at:S.c(0,5.2)});
  }},
  {id:'margin',label:'MARGIN',lines:[
    ['But futures traders do not pay the full RM100,000 upfront. Instead, they deposit margin: collateral to support the position.','Namun trader futures tidak membayar RM100,000 penuh di awal. Sebaliknya, mereka mendepositkan margin: cagaran untuk menyokong posisi.'],
    ['In this example, assume an initial margin of RM8,000. This is a hypothetical figure for education, not a current margin rate.','Dalam contoh ini, andaikan margin awal RM8,000. Ini angka hipotetikal untuk pendidikan, bukan kadar margin semasa.'],
    ['Margin is not a down payment and not the price of the contract. You do not own RM100,000 of palm oil.','Margin bukan bayaran pendahuluan dan bukan harga kontrak. Anda tidak memiliki minyak sawit bernilai RM100,000.',.8],
  ],
  dir:'Two horizontal bars to scale: CONTRACT VALUE RM100,000 (full width, outlined) and INITIAL MARGIN RM8,000 (8% width, solid blue). Amber "HIPOTETIKAL" stamp on margin. Line 3: three "≠" chips: ≠ bayaran pendahuluan · ≠ harga kontrak · ≠ pemilikan CPO.',
  build(S){
    C.title(S,{kicker:'Langkah 2 · Margin',title:'Margin ≠ nilai kontrak',at:.1});
    S.add(`<div class="small">Contract value · nilai kontrak</div>`,{x:110,y:300,at:S.c(0,.4)});
    const b1=C.bar(S,{x:110,y:340,w:1700,h:80,color:'rgba(232,176,79,.25)'});b1.set(S,S.c(0,.6),1.2,0,1);
    S.add(`<div style="font:800 40px var(--mono)">RM100,000</div>`,{x:1480,y:356,at:S.c(0,1.6)});
    S.add(`<div class="small">Initial margin · margin awal</div>`,{x:110,y:470,at:S.c(0,3)});
    const b2=C.bar(S,{x:110,y:510,w:1700,h:80,color:'#4C7BD9'});b2.set(S,S.c(1,.2),.8,0,.08);
    S.add(`<div style="font:800 40px var(--mono)" class="blue">RM8,000</div>`,{x:290,y:526,at:S.c(1,.9)});
    S.add(`<div class="tag warn" style="font-size:22px">Hipotetikal · bukan kadar semasa</div>`,{x:560,y:530,at:S.c(1,2.4),anim:'pop'});
    ['≠ Bayaran pendahuluan','≠ Harga kontrak','≠ Pemilikan CPO'].forEach((t,i)=>S.add(`<div class="tag down" style="font-size:24px;padding:12px 20px">${t}</div>`,{x:110+i*430,y:680,at:S.c(2,.4+i*1.1),anim:'pop'}));
  }},
  {id:'ratio',label:'NISBAH LEVERAGE',lines:[
    ['Leverage compares your exposure with your capital. RM100,000 divided by RM8,000 is 12.5 times.','Leverage membandingkan pendedahan dengan modal. RM100,000 bahagi RM8,000 ialah 12.5 kali.'],
    ['In other words, every RM1 of margin supports about RM12.50 of contract exposure. Leverage is not free money; it is borrowed exposure to price risk.','Dalam erti kata lain, setiap RM1 margin menyokong kira-kira RM12.50 pendedahan kontrak. Leverage bukan wang percuma; ia pendedahan kepada risiko harga.',.8],
  ],
  dir:'Lever diagram: a fulcrum; small blue weight "RM8,000" on the short arm lifts a large block "RM100,000" on the long arm. Formula box: RM100,000 ÷ RM8,000 = 12.5×. Line 2: "RM1 → RM12.50" chip and an amber note "Bukan wang percuma".',
  build(S){
    C.title(S,{kicker:'Langkah 3 · Leverage',title:'Berapa kali ganda pendedahan anda?',at:.1});
    const sv=C.svg(S);
    const tri=svgEl('path',{d:'M760,760 L820,660 L880,760 Z',fill:'#2C3D60'});sv.appendChild(tri);S.tween(S.c(0,.2),.5,p=>tri.style.opacity=p,'out');
    const beam=svgEl('line',{x1:300,y1:660,x2:1500,y2:660,stroke:'#F0C36B','stroke-width':10,'stroke-linecap':'round'});sv.appendChild(beam);
    const g=svgEl('g',{});sv.appendChild(g);g.appendChild(beam);
    const w1=svgEl('rect',{x:320,y:600,width:120,height:60,rx:6,fill:'#4C7BD9'});g.appendChild(w1);
    const w2=svgEl('rect',{x:1140,y:420,width:340,height:240,rx:10,fill:'rgba(232,176,79,.18)',stroke:'#F0C36B','stroke-width':3});g.appendChild(w2);
    const t1=svgEl('text',{x:380,y:585,'text-anchor':'middle',style:'font:700 26px var(--mono);fill:#F1F5F9'});t1.textContent='RM8,000';g.appendChild(t1);
    const t2=svgEl('text',{x:1310,y:550,'text-anchor':'middle',style:'font:800 40px var(--mono);fill:#F1F5F9'});t2.textContent='RM100,000';g.appendChild(t2);
    S.tween(S.c(0,.2),.6,p=>g.style.opacity=p,'out');
    S.tween(S.c(0,1),1.6,p=>g.setAttribute('transform',`rotate(${8-14*p} 820 660)`),'inout');
    S.add(`<div class="fbox">RM100,000 ÷ RM8,000 = <b>12.5×</b></div>`,{x:110,y:290,at:S.c(0,2.4),anim:'pop'});
    S.add(`<div class="chip blue" style="font-size:30px">RM1 margin → RM12.50 pendedahan</div>`,{x:1060,y:300,at:S.c(1,.6),anim:'pop'});
    S.add(`<div class="tag warn" style="font-size:22px">Bukan wang percuma</div>`,{x:1060,y:390,at:S.c(1,5),anim:'pop'});
  }},
  {id:'move',label:'PERGERAKAN KECIL, KESAN BESAR',lines:[
    ['Now see what a small price move does. A RM40 move against you is only 1% of the RM4,000 price.','Sekarang lihat kesan pergerakan harga yang kecil. Pergerakan RM40 yang menentang anda hanyalah 1% daripada harga RM4,000.'],
    ['But RM40 times 25 is a RM1,000 loss per contract.','Tetapi RM40 darab 25 ialah kerugian RM1,000 bagi setiap kontrak.'],
    ['And RM1,000 is 12.5% of the RM8,000 margin. A 1% price move becomes a 12.5% change in your margin.','Dan RM1,000 ialah 12.5% daripada margin RM8,000. Pergerakan harga 1% menjadi perubahan 12.5% pada margin anda.'],
    ['It works the same way in your favour, which is exactly why leverage feels attractive, and why it is dangerous.','Ia berfungsi dengan cara yang sama apabila memihak kepada anda, sebab itulah leverage nampak menarik, dan sebab itu juga ia berbahaya.',.8],
  ],
  dir:'Two gauges side by side. LEFT "Harga FCPO": a slim bar dips 1% (4,000 → 3,960). RIGHT "Margin RM8,000": a tall equity bar drops 12.5% to RM7,000, red slice labelled −RM1,000. Formula strip in between: RM40 × 25 = RM1,000 → 1,000 ÷ 8,000 = 12.5%. Line 4: a mirror teal slice +RM1,000 appears faintly.',
  build(S){
    C.title(S,{kicker:'Langkah 4 · Kesan leverage',title:'1% pada harga → 12.5% pada margin',at:.1});
    const A=C.card(S,{x:110,y:280,w:520,h:560,at:S.c(0,.2)});
    S.add(`<div class="small">Harga FCPO</div><div style="font:800 44px var(--mono);margin-top:10px">−1%</div>`,{parent:A,x:34,y:30,at:S.c(0,1)});
    const pa=S.add(`<div style="background:rgba(232,176,79,.25);border-radius:8px;overflow:hidden"><i style="display:block;position:absolute;left:0;right:0;bottom:0;background:#EF5B5B"></i></div>`,{parent:A,x:200,y:160,w:120,h:340,at:S.c(0,.6),anim:'fade'});
    S.tween(S.c(0,2.4),.8,p=>{pa.firstElementChild.style.height='0';pa.style.height=(340-3.4*p)+'px';pa.style.top=(160+3.4*p)+'px';});
    S.add(`<div class="mono" style="font-size:24px">4,000 → 3,960</div>`,{parent:A,x:150,y:510,at:S.c(0,3)});
    const B=C.card(S,{x:1290,y:280,w:520,h:560,at:S.c(0,.4)});
    S.add(`<div class="small">Margin RM8,000</div><div class="down" style="font:800 44px var(--mono);margin-top:10px">−12.5%</div>`,{parent:B,x:34,y:30,at:S.c(2,1.6)});
    const eq=S.add(`<div style="background:#4C7BD9;border-radius:8px"></div>`,{parent:B,x:200,y:160,w:120,h:340,at:S.c(0,.8),anim:'fade'});
    const loss=S.add(`<div style="background:#EF5B5B;border-radius:8px 8px 0 0"></div>`,{parent:B,x:200,y:160,w:120,h:42.5,at:S.c(1,.8),anim:'wipev'});
    S.add(`<div class="chip down" style="font-size:22px">−RM1,000</div>`,{parent:B,x:340,y:160,at:S.c(1,1.2),anim:'pop'});
    S.add(`<div class="chip up" style="font-size:22px;opacity:.8">+RM1,000</div>`,{parent:B,x:340,y:230,at:S.c(3,1),anim:'pop'});
    S.add(`<div class="mono" style="font-size:24px">RM8,000 → RM7,000</div>`,{parent:B,x:130,y:510,at:S.c(2,.6)});
    const f=S.add(`<div style="font:600 36px/1.9 var(--mono);text-align:center;width:600px"></div>`,{x:660,y:380});
    S.add(`<div>RM40 ÷ 4,000 = <b class="blue">1%</b></div>`,{parent:f,at:S.c(0,3.4)});
    S.add(`<div>RM40 × 25 = <span class="down">RM1,000</span></div>`,{parent:f,at:S.c(1,.4)});
    S.add(`<div>1,000 ÷ 8,000 = <span class="down">12.5%</span></div>`,{parent:f,at:S.c(2,.6)});
  }},
  {id:'call',label:'MARGIN CALL',lines:[
    ['If losses keep reducing your account equity below the required level, the broker may issue a margin call, asking you to top up funds.','Jika kerugian terus mengurangkan ekuiti akaun di bawah paras yang diperlukan, broker boleh mengeluarkan margin call, meminta anda menambah dana.'],
    ['If the funds are not provided in time, or the market moves very fast, positions may be force-liquidated, meaning closed, according to the broker\'s terms.','Jika dana tidak ditambah tepat pada masanya, atau pasaran bergerak sangat pantas, posisi boleh dilikuidasi secara paksa, iaitu ditutup, mengikut terma broker.'],
    ['And losses can exceed the margin you deposited. You remain responsible for any shortfall.','Dan kerugian boleh melebihi margin yang anda depositkan. Anda tetap bertanggungjawab ke atas sebarang kekurangan.',.8],
  ],
  dir:'Account equity line chart falling across a dashed "required level" threshold. On crossing: amber MARGIN CALL alert card. Line 2: red FORCED LIQUIDATION card with a "posisi ditutup" stamp. Line 3: equity line continues below zero into a red zone labelled "Kerugian > margin · defisit". Footnote: details in Video 06.',
  build(S){
    C.title(S,{kicker:'Apabila kerugian bertambah',title:'Margin call & forced liquidation',at:.1});
    const W=1100,H=520,X=110,Y=290;
    const card=C.card(S,{x:X,y:Y,w:W,h:H,at:S.c(0,.1)});
    const sv=C.svg(S,{parent:card,w:W,h:H});
    const y=v=>40+(8000-v)/(8000+1500)*(H-80);
    const zero=svgEl('line',{x1:30,x2:W-30,y1:y(0),y2:y(0),stroke:'#64748B','stroke-width':1});sv.appendChild(zero);
    const zl=svgEl('text',{x:W-120,y:y(0)-10,class:'ax'});zl.textContent='RM0';sv.appendChild(zl);
    const req=svgEl('line',{x1:30,x2:W-30,y1:y(6000),y2:y(6000),stroke:'#F5A524','stroke-width':3,'stroke-dasharray':'12 10'});sv.appendChild(req);
    S.tween(S.c(0,1),.5,p=>req.style.opacity=p,'out');
    S.add(`<div class="tag warn" style="font-size:16px">Paras diperlukan (ilustrasi)</div>`,{parent:card,x:40,y:y(6000)-46,at:S.c(0,1.2)});
    const pts=[[30,8000],[200,7600],[330,7800],[470,6900],[560,6300],[650,5700],[760,4600],[860,2500],[960,600],[1070,-900]];
    const d='M'+pts.map(p=>`${p[0]},${y(p[1])}`).join(' L');
    const path=svgEl('path',{d,stroke:'#F0C36B','stroke-width':5,fill:'none','stroke-linejoin':'round'});sv.appendChild(path);
    S.draw(path,S.c(0,.6),S.e(2)-S.c(0,.6)-1.5,'lin');
    const red=svgEl('rect',{x:30,y:y(0),width:W-60,height:H-40-y(0),fill:'rgba(239,91,91,.12)'});sv.insertBefore(red,sv.firstChild);
    S.tween(S.c(2,.6),.6,p=>red.style.opacity=p,'out');
    S.add(`<div class="tag down" style="font-size:16px">Kerugian &gt; margin · defisit</div>`,{parent:card,x:40,y:H-60,at:S.c(2,1)});
    S.add(`<div class="card warn" style="padding:24px 28px"><div class="small" style="color:var(--warn)">Langkah 1</div><div class="h3" style="margin-top:6px">MARGIN CALL</div><div class="body" style="font-size:22px;margin-top:6px">Tambah dana ke akaun</div></div>`,{x:1260,y:290,w:550,at:S.c(0,4.4),anim:'right'});
    S.add(`<div class="card down" style="padding:24px 28px"><div class="small" style="color:var(--down)">Langkah 2</div><div class="h3" style="margin-top:6px">FORCED LIQUIDATION</div><div class="body" style="font-size:22px;margin-top:6px">Posisi ditutup mengikut terma broker</div></div>`,{x:1260,y:480,w:550,at:S.c(1,2),anim:'right'});
    S.add(`<div class="card down" style="padding:24px 28px"><div class="small" style="color:var(--down)">Ingat</div><div class="h3" style="margin-top:6px">Rugi boleh &gt; margin</div><div class="body" style="font-size:22px;margin-top:6px">Anda bertanggungjawab atas kekurangan</div></div>`,{x:1260,y:670,w:550,at:S.c(2,.4),anim:'right'});
    S.add(`<div class="small">Perincian margin → Video 06</div>`,{x:110,y:830,at:S.c(2,2)});
  }},
  {id:'risk',label:'PENGURUSAN RISIKO',lines:[
    ['That is why risk management is essential when trading with leverage.','Sebab itulah pengurusan risiko amat penting apabila berdagang dengan leverage.'],
    ['Know the full contract value, not just the margin. Size your positions to your capital.','Ketahui nilai kontrak penuh, bukan sekadar margin. Saiz posisi mesti sepadan dengan modal anda.'],
    ['Plan your exit before you enter, and keep enough buffer in your account for price swings.','Rancang titik keluar sebelum masuk, dan simpan penampan dana yang mencukupi untuk menghadapi turun naik harga.',.8],
  ],
  dir:'Four principle cards tick in: 1 Kenal nilai kontrak · 2 Saiz posisi ikut modal · 3 Rancang exit dahulu · 4 Penampan dana. Each card has a small icon (doc, coin, shield, lock).',
  build(S){
    C.title(S,{kicker:'Prinsip asas',title:'Hormati leverage',at:.1});
    const P=[[C.icon.doc,'Kenali nilai kontrak','Bukan sekadar margin',S.c(1,.2)],[C.icon.coin,'Saiz posisi ikut modal','Bukan ikut keyakinan',S.c(1,3)],[C.icon.shield,'Rancang exit dahulu','Sebelum masuk posisi',S.c(2,.2)],[C.icon.lock,'Penampan dana','Untuk turun naik harga',S.c(2,3)]];
    P.forEach((p,i)=>S.add(`<div class="card"><div style="position:absolute;left:32px;top:34px">${p[0](64)}</div><div style="position:absolute;left:32px;top:130px;font:800 32px/1.2 var(--sans);width:340px">${p[1]}</div><div class="small" style="position:absolute;left:32px;top:230px">${p[2]}</div><div style="position:absolute;right:28px;top:30px;font:700 22px var(--mono);color:var(--blue3)">0${i+1}</div></div>`,{x:110+i*435,y:320,w:400,h:300,at:p[3],anim:'up'}));
  }},
  ],
  takeaways:[
    ['Contract value is price times contract size: for FCPO at RM4,000, that is RM100,000.','Nilai kontrak ialah harga darab saiz kontrak: bagi FCPO pada RM4,000, iaitu RM100,000.','Nilai kontrak = harga × 25 MT'],
    ['Margin is collateral, not the price of the contract.','Margin ialah cagaran, bukan harga kontrak.','Margin = cagaran, bukan harga'],
    ['Leverage compares exposure with margin: here, 12.5 times.','Leverage membandingkan pendedahan dengan margin: di sini, 12.5 kali.','Leverage = pendedahan ÷ margin'],
    ['A small price move creates a much larger change in your margin.','Pergerakan harga yang kecil mewujudkan perubahan yang jauh lebih besar pada margin anda.','1% harga → 12.5% margin (contoh)'],
    ['Losses can trigger a margin call or forced liquidation, and can exceed your margin.','Kerugian boleh mencetuskan margin call atau likuidasi paksa, dan boleh melebihi margin anda.','Margin call · likuidasi · rugi boleh > margin'],
    ['Risk management comes first.','Pengurusan risiko mesti didahulukan.','Pengurusan risiko didahulukan'],
  ],
  endQuote:['Leverage can increase opportunity, but at the same time it accelerates losses. Understand the risks before you trade.','Leverage boleh meningkatkan peluang, tetapi pada masa yang sama mempercepatkan kerugian. Fahami risikonya sebelum berdagang.'],
  sources:[
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — Contract Specifications (25 MT)',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'Saiz kontrak'},
    {org:'Bursa Malaysia Derivatives Clearing',title:'Margin requirements / Initial margin rates (semasa)',url:'https://www.bursamalaysia.com/trade/trading_resources/derivatives/margin_requirements',note:'Kadar margin semasa'},
    {org:'Securities Commission Malaysia',title:'InvestSmart® — Leverage & derivatives risks',url:'https://www.sc.com.my/investsmart',note:'Risiko leverage'},
    {org:'CME Group Education',title:'Introduction to Futures — Margin & leverage',url:'https://www.cmegroup.com/education/courses/introduction-to-futures.html',note:'Prinsip global'},
  ],
  factcheck:[
    ['RM4,000 × 25 = RM100,000; 100,000 ÷ 8,000 = 12.5; 40 ÷ 4,000 = 1%; 40 × 25 = 1,000; 1,000 ÷ 8,000 = 12.5%','Aritmetik dalaman','OK'],
    ['RM8,000 margin dilabel HIPOTETIKAL, bukan kadar semasa','Polisi','OK'],
    ['Margin call / likuidasi paksa — "mengikut terma broker"','Prinsip / broker','OK'],
    ['Kerugian boleh melebihi margin; klien bertanggungjawab atas defisit','Prinsip global / perjanjian broker','OK'],
    ['Kadar margin awal FCPO semasa — TIDAK dinyatakan dalam video','BMDC','N/A'],
  ],
  assets:['Grid 25 blok "1 MT"','Diagram tuas (lever) RM8,000 vs RM100,000','Bar ekuiti, garisan paras diperlukan, kad amaran margin call'],
});
