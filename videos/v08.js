/* VIDEO 08 — Sesi Dagangan FCPO */
VIDEO({
  num:'08', badge:'M2', moduleLabel:'MODUL 2 · KONTRAK FCPO', short:'SESI DAGANGAN',
  title:'Sesi Dagangan FCPO',
  tagline:'Morning · Afternoon · After-hours (T+1) · Pasaran global',
  purpose:'Fahami operasi pasaran',
  objectives:['Waktu dagangan FCPO: pagi, petang & T+1','Maksud T+1 & hari operasi','Mengapa sesi dagangan penting','Hubungan FCPO dengan pasaran global'],
  intro:[
    ['In this video, we walk through the FCPO trading day, and how markets around the world can influence it.','Dalam video ini, kita lalui hari dagangan FCPO, dan bagaimana pasaran di seluruh dunia boleh mempengaruhinya.',1.4],
  ],
  titleArt(S){
    const c=C.card(S,{x:1240,y:520,w:580,h:300,at:.8});
    S.add(`<div>${C.icon.clock(110)}</div>`,{parent:c,x:60,y:90,at:1,anim:'pop'});
    S.add(`<div>${C.icon.globe(110)}</div>`,{parent:c,x:360,y:90,at:1.4,anim:'pop'});
  },
  hook:{
    lines:[
      ['Why can FCPO prices at night be influenced by markets outside Malaysia?','Kenapa pergerakan harga FCPO pada waktu malam boleh dipengaruhi oleh pasaran luar negara?',.4],
      ['Because while Malaysia trades its night session, other major commodity markets are also open.','Kerana ketika Malaysia berdagang dalam sesi malam, pasaran komoditi utama lain juga sedang dibuka.',.6],
    ],
    dir:'Night-time globe: Malaysia pin glows blue; thin arcs travel from China and the US toward Malaysia with small market labels (DCE · CBOT). A clock in the corner reads 21:00 MYT.',
    build(S){
      const sv=C.svg(S);
      const g=svgEl('circle',{cx:960,cy:500,r:300,fill:'rgba(232,176,79,.06)',stroke:'#2C3D60','stroke-width':2});sv.appendChild(g);S.tween(.2,.8,p=>g.style.opacity=p,'out');
      for(let i=1;i<4;i++){const e=svgEl('ellipse',{cx:960,cy:500,rx:300,ry:300*i/4,fill:'none',stroke:'rgba(148,163,184,.12)'});sv.appendChild(e);const e2=svgEl('ellipse',{cx:960,cy:500,rx:300*i/4,ry:300,fill:'none',stroke:'rgba(148,163,184,.12)'});sv.appendChild(e2);S.tween(.4,.8,p=>{e.style.opacity=p;e2.style.opacity=p;},'out');}
      const my={x:1010,y:560};
      const pin=svgEl('circle',{cx:my.x,cy:my.y,r:12,fill:'#E8B04F'});pin.style.filter='drop-shadow(0 0 10px #E8B04F)';sv.appendChild(pin);S.tween(.8,.4,p=>pin.style.opacity=p,'out');
      S.add(`<div class="chip blue" style="font-size:20px">Malaysia · FCPO</div>`,{x:1040,y:570,at:.9,anim:'pop'});
      [[1060,430,'DCE · China'],[700,380,'CBOT · AS']].forEach((m,i)=>{C.arrow(S,sv,{x1:m[0],y1:m[1],x2:my.x,y2:my.y,at:1.6+i*.6,d:1,curve:80,color:'#F0C36B',w:2});
        S.add(`<div class="chip" style="font-size:18px">${m[2]}</div>`,{x:m[0]-(i?200:-10),y:m[1]-60,at:1.6+i*.6,anim:'pop'});});
      S.add(`<div class="fbox" style="font-size:40px">21:00 <span class="dim" style="font-size:24px">MYT</span></div>`,{x:1500,y:180,at:S.c(1,.3),anim:'pop'});
    }
  },
  scenes:[
  {id:'hours',label:'WAKTU DAGANGAN',lines:[
    ['FCPO trades in three sessions, all in Malaysian time.','FCPO didagangkan dalam tiga sesi, semuanya mengikut waktu Malaysia.'],
    ['The morning session runs from 10:30 am to 12:30 pm. The afternoon session runs from 2:30 pm to 6:00 pm.','Sesi pagi bermula 10:30 pagi hingga 12:30 tengah hari. Sesi petang bermula 2:30 petang hingga 6:00 petang.'],
    ['Then there is an after-hours session, known as T plus one, from 9:00 pm to 11:00 pm.','Kemudian ada sesi selepas waktu, dikenali sebagai T+1, dari 9:00 malam hingga 11:00 malam.',.8],
  ],
  dir:'Animated 24-hour clock dial (00–24). Three blue arcs draw in order: Morning 10:30–12:30, Afternoon 14:30–18:00, After-hours T+1 21:00–23:00. A legend panel lists each session with exact times. Footnote: "Waktu Malaysia (MYT) · sahkan dengan Bursa".',
  build(S){
    C.title(S,{kicker:'FCPO · waktu Malaysia',title:'Tiga sesi dagangan',at:.1});
    const cx=560,cy=560,R=250;
    const sv=C.svg(S);
    const ring=svgEl('circle',{cx,cy,r:R,fill:'rgba(16,27,50,.9)',stroke:'#2C3D60','stroke-width':26});sv.appendChild(ring);S.tween(S.c(0,.2),.6,p=>ring.style.opacity=p,'out');
    for(let h=0;h<24;h++){const a=(h/24)*Math.PI*2-Math.PI/2;const t=svgEl('line',{x1:cx+Math.cos(a)*(R-30),y1:cy+Math.sin(a)*(R-30),x2:cx+Math.cos(a)*(R-(h%6?40:52)),y2:cy+Math.sin(a)*(R-(h%6?40:52)),stroke:'#64748B','stroke-width':h%6?1.5:3});sv.appendChild(t);S.tween(S.c(0,.4),.4,p=>t.style.opacity=p,'out');
      if(h%3===0){const tx=svgEl('text',{x:cx+Math.cos(a)*(R-80),y:cy+Math.sin(a)*(R-80)+7,'text-anchor':'middle',class:'ax'});tx.textContent=String(h).padStart(2,'0');sv.appendChild(tx);S.tween(S.c(0,.5),.4,p=>tx.style.opacity=p,'out');}}
    const arc=(h0,h1,col)=>{const a0=h0/24*Math.PI*2-Math.PI/2,a1=h1/24*Math.PI*2-Math.PI/2;const p=svgEl('path',{d:`M${cx+Math.cos(a0)*R},${cy+Math.sin(a0)*R} A${R},${R} 0 0 1 ${cx+Math.cos(a1)*R},${cy+Math.sin(a1)*R}`,stroke:col,'stroke-width':26,fill:'none','stroke-linecap':'butt'});sv.appendChild(p);return p;};
    const S1=[[10.5,12.5,'#E8B04F',S.c(1,.3),'Morning','10:30 – 12:30'],[14.5,18,'#E8B04F',S.c(1,3.6),'Afternoon','14:30 – 18:00'],[21,23,'#22C3A6',S.c(2,1),'After-hours (T+1)','21:00 – 23:00']];
    S1.forEach((s,i)=>{const p=arc(s[0],s[1],s[2]);S.draw(p,s[3],.9);
      S.add(`<div class="card" style="padding:24px 30px;display:flex;justify-content:space-between;align-items:center"><div><div class="small">${['Sesi pagi','Sesi petang','Sesi selepas waktu'][i]}</div><div class="h3" style="margin-top:4px">${s[4]}</div></div><div style="font:700 38px var(--mono);color:${s[2]}">${s[5]}</div></div>`,{x:960,y:300+i*150,w:850,at:s[3],anim:'right'});});
    S.add(`<div class="small">Waktu Malaysia (MYT) · sahkan jadual terkini dengan Bursa Malaysia</div>`,{x:960,y:780,at:S.c(2,3)});
  }},
  {id:'days',label:'HARI OPERASI',lines:[
    ['The morning and afternoon sessions run on Bursa trading days, Monday to Friday.','Sesi pagi dan petang berjalan pada hari dagangan Bursa, Isnin hingga Jumaat.'],
    ['The after-hours session runs Monday to Thursday night. There is no T plus one session on Friday night.','Sesi selepas waktu berjalan pada malam Isnin hingga Khamis. Tiada sesi T+1 pada malam Jumaat.'],
    ['Public holidays and special schedules apply, so always check the Bursa trading calendar and your broker\'s notices.','Cuti umum dan jadual khas terpakai, jadi sentiasa semak kalendar dagangan Bursa dan notis broker anda.',.8],
  ],
  dir:'Weekly grid MON–SUN × (Pagi / Petang / T+1). Cells fill blue for day sessions Mon–Fri, teal for T+1 Mon–Thu; Friday T+1 cell crossed out; weekend greyed. Line 3: a calendar icon with "Cuti umum & jadual khas → kalendar Bursa".',
  build(S){
    C.title(S,{kicker:'Hari operasi',title:'Jadual mingguan (ringkas)',at:.1});
    const D=['ISN','SEL','RAB','KHA','JUM','SAB','AHD'],Rw=['Pagi','Petang','T+1'];
    D.forEach((d,i)=>S.add(`<div class="small" style="width:180px;text-align:center;font-size:22px">${d}</div>`,{x:400+i*200,y:300,at:S.c(0,.2)}));
    Rw.forEach((r,j)=>{S.add(`<div class="h3" style="font-size:28px">${r}</div>`,{x:120,y:370+j*130,at:S.c(0,.3)});
      D.forEach((d,i)=>{let on=i<5&&j<2,t1=j===2&&i<4,fri=j===2&&i===4,we=i>4;
        const at=j<2?S.c(0,.6)+i*.15+j*.2:S.c(1,.4)+i*.2;
        S.add(`<div style="border-radius:10px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font:700 30px var(--sans);background:${on?'rgba(232,176,79,.55)':t1?'rgba(34,195,166,.5)':'rgba(16,27,50,.6)'};color:${we?'var(--slate)':'#fff'}">${fri?'<span class="down">✕</span>':we?'—':''}</div>`,{x:400+i*200,y:350+j*130,w:180,h:100,at,anim:'pop',d:.4});});});
    S.add(`<div class="tag warn" style="font-size:22px;display:inline-flex;gap:12px;align-items:center">${C.icon.cal(28,'#F5A524')} Cuti umum & jadual khas → kalendar Bursa & notis broker</div>`,{x:400,y:760,at:S.c(2,.4),anim:'pop'});
  }},
  {id:'t1',label:'APA ITU T+1',lines:[
    ['So what does T plus one mean? T stands for the trade date.','Jadi, apa maksud T+1? T bermaksud tarikh dagangan.'],
    ['Trades done in the after-hours session are treated as trades of the next trading day. A trade at 10 pm on Tuesday is recorded as a Wednesday trade.','Dagangan yang dibuat dalam sesi selepas waktu dianggap sebagai dagangan hari dagangan berikutnya. Dagangan pada 10 malam Selasa direkodkan sebagai dagangan hari Rabu.'],
    ['This matters for clearing, margin and your daily statements.','Ini penting untuk clearing, margin dan penyata harian anda.',.8],
  ],
  dir:'Two day columns: SELASA (T) and RABU (T+1). A trade token at "Selasa 22:00" in the T+1 band slides across into the RABU column and lands with label "Direkod: Rabu". Line 3: three chips under RABU — Clearing · Margin · Penyata.',
  build(S){
    C.title(S,{kicker:'T+1',title:'Dagangan malam = dagangan hari berikutnya',at:.1});
    const A=C.card(S,{x:110,y:280,w:800,h:540,at:S.c(0,.3)}), B=C.card(S,{x:1010,y:280,w:800,h:540,at:S.c(0,.6),cls:'hl'});
    S.add(`<div class="small">T · tarikh dagangan</div><div class="h2" style="margin-top:6px">Selasa</div>`,{parent:A,x:34,y:28,at:S.c(0,.5)});
    S.add(`<div class="small blue">T+1 · hari berikutnya</div><div class="h2" style="margin-top:6px">Rabu</div>`,{parent:B,x:34,y:28,at:S.c(0,.8)});
    S.add(`<div style="height:90px;border-radius:10px;background:rgba(34,195,166,.18);border:1px dashed rgba(34,195,166,.6)"></div>`,{parent:A,x:34,y:330,w:730,at:S.c(1,.4),anim:'fade'});
    S.add(`<div class="small up" style="color:var(--up)">Sesi T+1 · 21:00 – 23:00</div>`,{parent:A,x:50,y:300,at:S.c(1,.4)});
    const tok=S.add(`<div class="chip up" style="font-size:24px">Dagangan · Selasa 22:00</div>`,{x:300,y:630,at:S.c(1,1.4),anim:'pop'});
    S.tween(S.c(1,4.6),1.4,p=>{tok.style.left=(300+900*p)+'px';tok.style.top=(630-120*Math.sin(Math.PI*p))+'px';});
    S.add(`<div class="tag blue" style="font-size:22px">Direkod: Rabu</div>`,{parent:B,x:34,y:440,at:S.c(1,6.2),anim:'pop'});
    ['Clearing','Margin','Penyata'].forEach((t,i)=>S.add(`<div class="tag" style="font-size:20px">${t}</div>`,{parent:B,x:34+i*190,y:180,at:S.c(2,.4+i*.6),anim:'pop'}));
  }},
  {id:'why',label:'MENGAPA SESI PENTING',lines:[
    ['Why do sessions matter? Because trading activity and volatility can differ from one session to another.','Mengapa sesi penting? Kerana aktiviti dagangan dan volatiliti boleh berbeza antara satu sesi dengan sesi lain.'],
    ['Between sessions, during the lunch break and overnight, news can still arrive. When trading resumes, prices may open at a different level, creating a gap.','Di antara sesi, ketika rehat tengah hari dan waktu malam, berita masih boleh muncul. Apabila dagangan disambung, harga mungkin dibuka pada paras berbeza, mewujudkan gap.'],
    ['Knowing the sessions helps you plan your orders and manage risk.','Mengetahui sesi dagangan membantu anda merancang pesanan dan mengurus risiko.',.8],
  ],
  dir:'Hypothetical intraday price strip across the three sessions with shaded breaks between them. At a break, a news icon pops and the next session opens with a visible gap (dotted connector + "GAP" chip). Line 3: chips "Rancang pesanan · Urus risiko".',
  build(S){
    C.title(S,{kicker:'Mengapa penting',title:'Rehat antara sesi boleh mewujudkan gap',at:.1});
    const card=C.card(S,{x:110,y:270,w:1700,h:520,at:S.c(0,.1)});
    const sv=C.svg(S,{parent:card,w:1700,h:520});
    const seg=[[60,500,'Pagi'],[640,1160,'Petang'],[1300,1640,'T+1']];
    [[500,640],[1160,1300]].forEach((b,i)=>{const r=svgEl('rect',{x:b[0],y:60,width:b[1]-b[0],height:400,fill:'rgba(100,116,139,.12)'});sv.appendChild(r);S.tween(S.c(0,1),.5,p=>r.style.opacity=p,'out');
      S.add(`<div class="small" style="width:${b[1]-b[0]}px;text-align:center">Rehat</div>`,{parent:card,x:b[0],y:470,at:S.c(0,1)});});
    seg.forEach(s=>S.add(`<div class="small" style="width:${s[1]-s[0]}px;text-align:center">${s[2]}</div>`,{parent:card,x:s[0],y:470,at:S.c(0,.6)}));
    const r=C.rng(5);const mk=(x0,x1,y0,y1)=>{let d=`M${x0},${y0}`;const n=24;for(let i=1;i<=n;i++){d+=` L${x0+(x1-x0)*i/n},${y0+(y1-y0)*i/n+(r()-.5)*30}`;}return d;};
    const p1=svgEl('path',{d:mk(60,500,300,260),stroke:'#F0C36B','stroke-width':4,fill:'none'});sv.appendChild(p1);S.draw(p1,S.c(0,1.6),1.4,'lin');
    const p2=svgEl('path',{d:mk(640,1160,170,200),stroke:'#F0C36B','stroke-width':4,fill:'none'});sv.appendChild(p2);S.draw(p2,S.c(1,3.6),1.4,'lin');
    const p3=svgEl('path',{d:mk(1300,1640,200,150),stroke:'#F0C36B','stroke-width':4,fill:'none'});sv.appendChild(p3);S.draw(p3,S.c(1,6),1,'lin');
    const gap=svgEl('line',{x1:500,y1:260,x2:640,y2:170,stroke:'#F5A524','stroke-width':3,'stroke-dasharray':'6 8'});sv.appendChild(gap);S.tween(S.c(1,3.4),.5,p=>gap.style.opacity=p,'out');
    S.add(`<div>${C.icon.doc(48,'#F5A524')}</div>`,{parent:card,x:546,y:90,at:S.c(1,1.8),anim:'pop'});
    S.add(`<div class="chip warn" style="font-size:22px">GAP</div>`,{parent:card,x:530,y:300,at:S.c(1,3.6),anim:'pop'});
    S.add(`<div class="tag blue" style="font-size:22px">Rancang pesanan · urus risiko</div>`,{x:110,y:810,at:S.c(2,.4),anim:'pop'});
  }},
  {id:'global',label:'PASARAN GLOBAL',lines:[
    ['FCPO does not trade in isolation. Several global markets are closely watched by palm oil traders.','FCPO tidak didagangkan secara terasing. Beberapa pasaran global diperhatikan rapat oleh trader minyak sawit.'],
    ['In China, the Dalian Commodity Exchange trades soybean oil and palm olein futures. China is a major buyer of vegetable oils.','Di China, Dalian Commodity Exchange mendagangkan futures minyak soya dan palm olein. China ialah pembeli utama minyak sayuran.'],
    ['In the United States, the Chicago Board of Trade trades soybean oil and soybeans. Soybean oil competes with palm oil as a vegetable oil.','Di Amerika Syarikat, Chicago Board of Trade mendagangkan minyak soya dan kacang soya. Minyak soya bersaing dengan minyak sawit sebagai minyak sayuran.'],
    ['Crude oil matters too, because palm oil is also used to make biodiesel. And the ringgit matters, because FCPO is priced in ringgit while palm oil is traded internationally.','Minyak mentah juga penting, kerana minyak sawit turut digunakan untuk menghasilkan biodiesel. Ringgit juga penting, kerana FCPO berharga dalam ringgit sedangkan minyak sawit diperdagangkan di peringkat antarabangsa.',.8],
  ],
  dir:'Five market "screens" in a ring around a central FCPO node: BMD · FCPO (centre), DCE · Soybean oil & Palm olein, CBOT · Soybean oil & Soybean, Crude oil · Biodiesel link, Currency · USD/MYR. Each screen lights with its line and a connector draws to the centre with a one-word relationship label (Permintaan · Pengganti · Tenaga · Mata wang).',
  build(S){
    C.title(S,{kicker:'Hubungan global',title:'Pasaran yang diperhatikan trader FCPO',at:.1,w:1700});
    const sv=C.svg(S);
    const cx=960,cy=560;
    C.node(S,{x:cx-170,y:cy-90,w:340,h:180,title:'FCPO',sub:'BMD · Malaysia',icon:C.icon.palm(48),at:S.c(0,.4),cls:'hl'});
    const M=[[260,300,'DCE · China','Soybean oil · Palm olein','Permintaan',1],[1300,300,'CBOT · AS','Soybean oil · Soybean','Pengganti',2],[260,690,'Crude oil','Brent · WTI','Tenaga / biodiesel',3],[1300,690,'Mata wang','USD / MYR','Ringgit',3]];
    M.forEach((m,i)=>{const at=S.c(m[5],i===3?5:.4);
      S.add(`<div class="card" style="padding:22px 26px"><div style="display:flex;gap:14px;align-items:center">${(i===3?C.icon.coin:i===2?C.icon.drum:C.icon.screen)(40)}<div class="h3" style="font-size:28px">${m[2]}</div></div><div class="small" style="margin-top:8px">${m[3]}</div></div>`,{x:m[0],y:m[1]-60,w:360,at,anim:'scale'});
      const x2=m[0]<cx?cx-170:cx+170;const x1=m[0]<cx?m[0]+360:m[0];
      C.arrow(S,sv,{x1,y1:m[1],x2,y2:cy+(m[1]<cy?-40:40),at:at+.4,d:.6,color:'#2C3D60',head:false,w:3});
      S.add(`<div class="tag blue" style="font-size:16px">${m[4]}</div>`,{x:(x1+x2)/2-70,y:(m[1]+cy)/2-40,at:at+.8,anim:'pop'});
    });
  }},
  {id:'sentiment',label:'SENTIMEN MERENTAS SESI',lines:[
    ['Here is how it can play out. FCPO\'s afternoon session closes at 6 pm, but other markets keep moving.','Begini ia boleh berlaku. Sesi petang FCPO ditutup pada 6 petang, tetapi pasaran lain terus bergerak.'],
    ['News and price moves overseas can shape sentiment in the T plus one session, and when FCPO reopens the next morning.','Berita dan pergerakan harga di luar negara boleh membentuk sentimen dalam sesi T+1, dan apabila FCPO dibuka semula keesokan pagi.'],
    ['But these markets do not always move in the same direction. Local factors, such as production and export data, weather and the ringgit, can push FCPO the other way.','Namun pasaran ini tidak semestinya bergerak dalam arah yang sama. Faktor tempatan, seperti data pengeluaran dan eksport, cuaca dan ringgit, boleh menolak FCPO ke arah berlawanan.',.8],
  ],
  dir:'Horizontal 24h timeline (18:00 → next 12:30). FCPO close marker at 18:00; overseas market band ("Pasaran luar negara bergerak") glows through the evening; T+1 block 21:00–23:00 and next-morning open 10:30 receive "sentimen" arrows. Line 3: a "≠ arah sama" tag plus local factor chips: Data pengeluaran & eksport · Cuaca · Ringgit.',
  build(S){
    C.title(S,{kicker:'Sentimen',title:'Dari pasaran luar ke sesi FCPO seterusnya',at:.1,w:1700});
    const sv=C.svg(S);
    const X=h=>{const hh=h<18?h+24:h;return 160+(hh-18)*(1600/18.5);};
    const base=svgEl('line',{x1:X(18),y1:600,x2:X(12.5),y2:600,stroke:'#2C3D60','stroke-width':4});sv.appendChild(base);S.draw(base,S.c(0,.2),1);
    [[18,'18:00'],[21,'21:00'],[0,'00:00'],[6,'06:00'],[10.5,'10:30']].forEach(t=>S.add(`<div class="ax" style="font:500 18px var(--mono);color:var(--slate)">${t[1]}</div>`,{x:X(t[0])-30,y:620,at:S.c(0,.4)}));
    S.add(`<div class="chip" style="font-size:20px">FCPO tutup 18:00</div>`,{x:X(18)-20,y:640+20,at:S.c(0,1),anim:'pop'});
    S.add(`<div style="height:70px;border-radius:10px;background:rgba(232,176,79,.12);border:1px dashed rgba(232,176,79,.5)"></div>`,{x:X(18.3),y:340,w:X(9.5)-X(18.3),at:S.c(0,2.4),anim:'wipe',d:1.2});
    S.add(`<div class="small blue">Pasaran luar negara terus bergerak · berita</div>`,{x:X(18.5),y:300,at:S.c(0,2.8)});
    S.add(`<div style="height:90px;border-radius:10px;background:rgba(34,195,166,.4)"></div>`,{x:X(21),y:500,w:X(23)-X(21),at:S.c(1,.4),anim:'scale'});
    S.add(`<div class="small up" style="color:var(--up)">T+1</div>`,{x:X(21),y:465,at:S.c(1,.4)});
    S.add(`<div style="height:90px;border-radius:10px;background:rgba(232,176,79,.55)"></div>`,{x:X(10.5),y:500,w:X(12.5)-X(10.5),at:S.c(1,3),anim:'scale'});
    S.add(`<div class="small blue">Pagi</div>`,{x:X(10.5),y:465,at:S.c(1,3)});
    C.arrow(S,sv,{x1:X(21.5),y1:415,x2:X(22),y2:495,at:S.c(1,1),d:.5});
    C.arrow(S,sv,{x1:X(9),y1:415,x2:X(11),y2:495,at:S.c(1,3.4),d:.5});
    S.add(`<div class="tag warn" style="font-size:22px">Tidak semestinya arah yang sama</div>`,{x:160,y:740,at:S.c(2,.6),anim:'pop'});
    ['Data pengeluaran & eksport','Cuaca','Ringgit'].forEach((t,i)=>S.add(`<div class="tag" style="font-size:20px">${t}</div>`,{x:720+i*360,y:740,at:S.c(2,3.4+i*1),anim:'pop'}));
  }},
  ],
  takeaways:[
    ['FCPO has a morning session, an afternoon session and an after-hours T plus one session.','FCPO mempunyai sesi pagi, sesi petang dan sesi selepas waktu T+1.','Pagi · Petang · T+1'],
    ['After-hours trades count as the next trading day\'s trades.','Dagangan selepas waktu dikira sebagai dagangan hari berikutnya.','T+1 = direkod hari berikutnya'],
    ['There is no T plus one session on Friday night, and holidays apply.','Tiada sesi T+1 pada malam Jumaat, dan cuti umum terpakai.','Tiada T+1 malam Jumaat · semak cuti'],
    ['Breaks between sessions can lead to price gaps.','Rehat antara sesi boleh menyebabkan gap harga.','Rehat sesi → potensi gap'],
    ['Dalian, Chicago, crude oil and the ringgit can influence sentiment.','Dalian, Chicago, minyak mentah dan ringgit boleh mempengaruhi sentimen.','DCE · CBOT · minyak mentah · MYR'],
    ['But related markets do not always move in the same direction.','Namun pasaran berkaitan tidak semestinya bergerak dalam arah yang sama.','Berkait ≠ semestinya searah'],
  ],
  endQuote:['Commodity markets are not only influenced by what happens in Malaysia. Understanding trading hours and global market links helps us see the bigger picture.','Pasaran komoditi bukan hanya dipengaruhi oleh apa yang berlaku di Malaysia. Memahami waktu dagangan dan hubungan pasaran global membantu kita melihat gambaran yang lebih luas.'],
  sources:[
    {org:'Bursa Malaysia',title:'Crude Palm Oil Futures (FCPO) — Contract Specifications (trading hours)',url:'https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures',note:'Waktu dagangan'},
    {org:'Bursa Malaysia',title:'After-hours (T+1) trading session — FAQ',url:'https://www.bursamalaysia.com/trade/trading_resources/derivatives/trading_hours',note:'T+1'},
    {org:'Bursa Malaysia',title:'Market holidays / trading calendar',url:'https://www.bursamalaysia.com/about_bursa/about_us/calendar',note:'Cuti'},
    {org:'Dalian Commodity Exchange',title:'Soybean oil & RBD palm olein futures — contract specifications',url:'http://www.dce.com.cn/DCE/',note:'Pasaran China'},
    {org:'CME Group',title:'Soybean Oil & Soybean futures (CBOT) — contract specifications',url:'https://www.cmegroup.com/markets/agriculture/oilseeds/soybean-oil.html',note:'Pasaran AS'},
  ],
  factcheck:[
    ['Sesi pagi 10:30–12:30, petang 14:30–18:00, T+1 21:00–23:00 (MYT) — dibetulkan mengikut maklum balas klien','Bursa FCPO spec','SEMAK — kritikal'],
    ['T+1 berjalan Isnin–Khamis; tiada pada malam Jumaat','Bursa T+1 FAQ','SEMAK'],
    ['Dagangan T+1 direkod sebagai dagangan hari dagangan berikutnya','Bursa T+1 FAQ','SEMAK'],
    ['Jadual sebelum cuti umum / jadual khas — tidak dinyatakan secara spesifik; dirujuk ke kalendar Bursa','Bursa','SEMAK'],
    ['DCE mendagangkan futures minyak soya & palm olein; CBOT minyak soya & kacang soya','DCE / CME','OK'],
    ['Pautan biodiesel (minyak mentah) & ringgit — dinyatakan sebagai pengaruh sentimen, bukan hubungan tetap','Prinsip pasaran','OK'],
    ['Tiada waktu dagangan DCE/CBOT dinyatakan secara spesifik (elak ralat zon waktu/DST)','Polisi','OK'],
  ],
  assets:['Jam 24 jam dengan lengkok sesi','Grid jadual mingguan','Animasi T+1 (token dagangan)','Skrin pasaran global: DCE, CBOT, minyak mentah, USD/MYR','Garis masa sentimen merentas sesi'],
});
