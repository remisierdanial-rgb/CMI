/* CMI Equity Series — VIDEO 02: Bursa Malaysia: Pasaran Utama, ACE & LEAP
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';

  function market(S, o) {
    EQ.heading(S, 'SEGMEN PENYENARAIAN', o.head, S.at(0, -.3));
    const p = S.el('', { x: 60, y: 160, w: 1080, h: 480, cls: 'panel' }, { at: S.at(0, -.3) });
    p.style.borderTop = `3px solid ${o.c}`;
    S.el(`<div style="display:flex;gap:16px;align-items:center">${EQ.icon(o.icon, 40, o.c)}<div><div style="font:800 40px Inter">${o.name}</div><div class="lbl" style="margin-top:6px">${o.sub}</div></div></div>`, { x: 34, y: 30, parent: p });
    S.bullets(o.items, 34, 140, 1000, o.ats, { size: 27, color: o.c, parent: p });
    const q = S.el('', { x: 1180, y: 160, w: 680, h: 480, cls: 'panel' }, { at: S.at(0, .2) });
    S.el('<div class="lbl">PROFIL RINGKAS</div>', { x: 30, y: 28, parent: q });
    o.facts.forEach((f, i) => S.el(`<div class="lbl" style="font-size:14px">${f[0]}</div><div style="font:700 26px/1.3 Inter;margin-top:6px;color:${f[2] || '#f1f5fb'}">${f[1]}</div>`, { x: 30, y: 78 + i * 98, w: 620, parent: q }, { at: f[3], dy: 8 }));
  }

  const EPISODE = {
    id: 'eq02', ...EQ.header(2, 'Main, ACE & LEAP'),
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'Why are some companies listed on the Main Market, some on the ACE Market, and others on the LEAP Market?', t: 'Kenapa ada syarikat tersenarai di Main Market, ada di ACE Market dan ada pula di LEAP Market?' },
          { en: 'Are all shares at the same level, with the same structure?', t: 'Adakah semua saham mempunyai tahap dan struktur yang sama?' }
        ],
        build(S, C) {
          [['Main Market', BLUE, 'building'], ['ACE Market', AMB, 'up'], ['LEAP Market', POI, 'star']].forEach((m, i) => {
            const d = S.el(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%">${EQ.icon(m[2], 64, m[1], 1.5)}<div style="font:800 36px Inter;margin-top:24px">${m[0]}</div><div style="font:800 64px Inter;color:${m[1]};opacity:.5;margin-top:18px">?</div></div>`,
              { x: 150 + i * 560, y: 150, w: 500, h: 460, cls: 'panel' }, { at: S.at(0, .3 + i * .8), dy: 16 });
            d.style.borderTop = `3px solid ${m[1]}`;
          });
          EQ.chip(S, 'SATU BURSA · TIGA PASARAN', 790, 650, AMB, S.at(1, .4));
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we get to know Bursa Malaysia, and the three markets where companies can be listed.', t: 'Dalam video ini, kita mengenali Bursa Malaysia, dan tiga pasaran tempat syarikat boleh disenaraikan.' },
          { en: 'First, the role of Bursa Malaysia, and how it differs from the Securities Commission.', t: 'Pertama, peranan Bursa Malaysia, dan bezanya dengan Suruhanjaya Sekuriti.' },
          { en: 'Second, the Main Market, the ACE Market and the LEAP Market.', t: 'Kedua, Main Market, ACE Market dan LEAP Market.' },
          { en: 'And third, why companies choose a particular market, and who can invest in each one.', t: 'Dan ketiga, kenapa syarikat memilih pasaran tertentu, dan siapa yang boleh melabur dalam setiap pasaran.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 02 · MODUL 1 · KENALI PASARAN SAHAM', title: 'Bursa Malaysia: Pasaran Utama, ACE & LEAP',
            lead: 'Bursa · SC · Main Market · ACE Market · LEAP Market', leadY: 350,
            objectives: ['Peranan Bursa Malaysia berbanding SC', 'Ciri Main, ACE & LEAP Market', 'Pemilihan pasaran & siapa boleh melabur'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const b = S.el('', { x: 1240, y: 440, w: 580, h: 300, cls: 'panel' }, { at: S.at(0, 1) });
          S.el(`<div style="display:flex;align-items:flex-end;justify-content:space-around;height:300px;padding:0 40px 60px">
            ${[['MAIN', BLUE, 170], ['ACE', AMB, 120], ['LEAP', POI, 80]].map(m => `<div style="text-align:center"><div style="width:110px;height:${m[2]}px;border:1.5px solid ${m[1]};border-radius:8px;background:${m[1]}22"></div><div class="lbl" style="margin-top:14px;color:${m[1]}">${m[0]}</div></div>`).join('')}</div>`, { x: 0, y: 0, w: 580, parent: b });
        }
      },
      /* 3 · APA ITU BURSA */
      {
        label: 'BURSA MALAYSIA', hold: .4,
        cues: [
          { en: 'Bursa Malaysia is the stock exchange of Malaysia — the marketplace where listed shares are bought and sold.', t: 'Bursa Malaysia ialah bursa saham Malaysia — pasaran tempat saham tersenarai dibeli dan dijual.' },
          { en: 'It operates the trading system that matches buy and sell orders.', t: 'Ia mengendalikan sistem dagangan yang memadankan pesanan beli dan jual.' },
          { en: 'Through its subsidiaries, it also handles clearing and settlement, and keeps the central record of share ownership — the Central Depository System, or CDS.', t: 'Melalui anak syarikatnya, ia juga mengendalikan penjelasan dan penyelesaian, serta menyimpan rekod pusat pemilikan saham — Central Depository System atau CDS.' },
          { en: 'And as a frontline regulator, it sets and enforces the listing requirements that listed companies must follow.', t: 'Sebagai pengawal selia barisan hadapan, ia menetapkan dan menguatkuasakan syarat penyenaraian yang perlu dipatuhi syarikat tersenarai.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERANAN', 'Apa itu Bursa Malaysia?', S.at(0, -.3));
          const N = S.flow([
            { id: 'b', x: 760, y: 330, w: 400, h: 140, t: 'Bursa Malaysia', s: 'BURSA SAHAM MALAYSIA', c: AMB, at: S.at(0, .2), fs: 30 },
            { id: 'a', x: 120, y: 170, w: 460, h: 120, t: 'Sistem dagangan', s: 'PADANAN PESANAN BELI & JUAL', at: S.at(1) },
            { id: 'c', x: 1340, y: 170, w: 460, h: 120, t: 'Penjelasan & penyelesaian', s: 'CLEARING & SETTLEMENT', at: S.at(2, .2) },
            { id: 'd', x: 120, y: 520, w: 460, h: 120, t: 'Central Depository System', s: 'REKOD PEMILIKAN SAHAM · CDS', at: S.at(2, 2.5) },
            { id: 'e', x: 1340, y: 520, w: 460, h: 120, t: 'Syarat penyenaraian', s: 'PENGAWAL SELIA BARISAN HADAPAN', at: S.at(3) }
          ], [
            { f: 'b', to: 'a', at: S.at(1, .3), c: AMB }, { f: 'b', to: 'c', at: S.at(2, .5), c: AMB },
            { f: 'b', to: 'd', at: S.at(2, 2.8), c: AMB }, { f: 'b', to: 'e', at: S.at(3, .3), c: AMB }
          ]);
        }
      },
      /* 4 · BURSA vs SC */
      {
        label: 'BURSA VS SC',
        cues: [
          { en: 'Bursa Malaysia is often confused with the Securities Commission Malaysia, but their roles are different.', t: 'Bursa Malaysia sering dikelirukan dengan Suruhanjaya Sekuriti Malaysia, tetapi peranan mereka berbeza.' },
          { en: "The Securities Commission, or SC, is the statutory body that regulates and develops Malaysia's capital market.", t: 'Suruhanjaya Sekuriti Malaysia, atau SC, ialah badan berkanun yang mengawal selia dan membangunkan pasaran modal Malaysia.' },
          { en: 'The SC supervises the exchange itself, licenses market intermediaries such as stockbrokers, and enforces securities laws.', t: 'SC menyelia bursa itu sendiri, melesenkan perantara pasaran seperti broker saham, dan menguatkuasakan undang-undang sekuriti.' },
          { en: 'In simple terms: Bursa runs the marketplace, while the SC oversees the whole capital market — including Bursa.', t: 'Secara ringkas: Bursa mengendalikan pasaran, manakala SC mengawasi keseluruhan pasaran modal — termasuk Bursa.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERBEZAAN PENTING', 'Bursa Malaysia ≠ Suruhanjaya Sekuriti', S.at(0, -.3));
          const sc = S.el('', { x: 60, y: 160, w: 1800, h: 170, cls: 'panel' }, { at: S.at(1, -.2) });
          sc.style.borderLeft = `3px solid ${BLUE}`;
          S.el(`<div style="display:flex;gap:16px;align-items:center">${EQ.icon('shield', 40, BLUE)}<div><div style="font:800 32px Inter">Securities Commission Malaysia (SC)</div><div class="lbl" style="margin-top:6px">BADAN BERKANUN · MENGAWAL SELIA & MEMBANGUNKAN PASARAN MODAL</div></div></div>`, { x: 30, y: 26, parent: sc });
          ['MENYELIA BURSA', 'MELESENKAN BROKER', 'MENGUATKUASA UNDANG-UNDANG SEKURITI'].forEach((t, i) => EQ.chip(S, t, 92 + i * 330, 112, BLUE, S.at(2, .3 + i * .9), { parent: sc }));
          const ar = S.svg(940, 330, 40, 80);
          S.anim(t => { const q = CMI.ease((t - S.at(2, 3)) / .5); ar.innerHTML = q > 0 ? `<g opacity="${q}"><line x1="20" y1="4" x2="20" y2="62" stroke="${BLUE}" stroke-width="2.4"/><path d="M20 74 L12 60 L28 60 Z" fill="${BLUE}"/></g>` : ''; });
          S.el(`<div class="lbl" style="color:${BLUE}">MENGAWASI</div>`, { x: 990, y: 356 }, { at: S.at(2, 3.2) });
          const bm = S.el('', { x: 60, y: 420, w: 1800, h: 170, cls: 'panel' }, { at: S.at(0, .4) });
          bm.style.borderLeft = `3px solid ${AMB}`;
          S.el(`<div style="display:flex;gap:16px;align-items:center">${EQ.icon('bank', 40, AMB)}<div><div style="font:800 32px Inter">Bursa Malaysia</div><div class="lbl" style="margin-top:6px">PENGENDALI BURSA · PENGAWAL SELIA BARISAN HADAPAN</div></div></div>`, { x: 30, y: 26, parent: bm });
          ['SISTEM DAGANGAN', 'PENJELASAN & DEPOSITORI', 'SYARAT PENYENARAIAN'].forEach((t, i) => EQ.chip(S, t, 92 + i * 330, 112, AMB, S.at(0, 1 + i * .4), { parent: bm }));
          S.el(`<div class="statement" style="font-size:34px;text-align:center">Bursa <span style="color:${AMB}">mengendalikan pasaran</span> · SC <span style="color:${BLUE}">mengawasi pasaran modal</span></div>`, { x: 60, y: 630, w: 1800 }, { at: S.at(3, .3) });
        }
      },
      /* 5 · EKOSISTEM */
      {
        label: 'EKOSISTEM PASARAN', hold: .5,
        cues: [
          { en: "Let's see how everyone fits together in the market ecosystem.", t: 'Mari lihat bagaimana semua pihak berhubung dalam ekosistem pasaran.' },
          { en: 'Companies list their shares on Bursa Malaysia to raise capital.', t: 'Syarikat menyenaraikan saham mereka di Bursa Malaysia untuk mengumpul modal.' },
          { en: 'Investors do not trade directly with the exchange. They send orders through a stockbroker, which is a participating organisation of Bursa.', t: 'Pelabur tidak berdagang terus dengan bursa. Mereka menghantar pesanan melalui broker saham, iaitu participating organisation Bursa.' },
          { en: 'Bursa matches the orders, and the SC oversees the whole system to keep the market fair and orderly.', t: 'Bursa memadankan pesanan, dan SC mengawasi keseluruhan sistem supaya pasaran adil dan teratur.' }
        ],
        build(S, C) {
          EQ.heading(S, 'EKOSISTEM', 'Siapa buat apa dalam pasaran saham', S.at(0, -.3));
          const top = S.el(`<div style="display:flex;gap:14px;align-items:center;justify-content:center;height:100%">${EQ.icon('shield', 30, BLUE)}<span style="font:700 24px Inter">Securities Commission Malaysia</span><span class="lbl" style="margin-left:12px">PENGAWASAN · PERLESENAN · PENGUATKUASAAN</span></div>`, { x: 60, y: 160, w: 1800, h: 80, cls: 'panel' }, { at: S.at(3, .6) });
          top.style.borderColor = BLUE + '88';
          S.flow([
            { id: 'i', x: 60, y: 360, w: 300, h: 140, t: 'Pelabur', s: 'BELI / JUAL', at: S.at(2, .1) },
            { id: 'br', x: 500, y: 360, w: 340, h: 140, t: 'Broker saham', s: 'PARTICIPATING ORGANISATION', at: S.at(2, 1.2) },
            { id: 'bm', x: 990, y: 360, w: 340, h: 140, t: 'Bursa Malaysia', s: 'PADANAN PESANAN', c: AMB, at: S.at(1, -.2) },
            { id: 'co', x: 1500, y: 360, w: 360, h: 140, t: 'Syarikat tersenarai', s: 'MENYENARAIKAN SAHAM', at: S.at(1, .3) }
          ], [
            { f: 'co', to: 'bm', at: S.at(1, 1.2), c: AMB }, { f: 'i', to: 'br', at: S.at(2, 2.2) }, { f: 'br', to: 'bm', at: S.at(2, 3.2) }
          ]);
          EQ.chip(S, 'PELABUR ≠ BERDAGANG TERUS DENGAN BURSA', 60, 540, '#c7d0de', S.at(2, 4));
          const ov = S.svg(0, 240, 1920, 120);
          S.anim(t => { const q = CMI.ease((t - S.at(3, 1.4)) / .6); ov.innerHTML = q > 0 ? [210, 670, 1160, 1680].map(x => `<line x1="${x}" x2="${x}" y1="0" y2="${115 * q}" stroke="${BLUE}" stroke-width="1.6" stroke-dasharray="5 5"/>`).join('') : ''; });
        }
      },
      /* 6 · TIGA PASARAN */
      {
        label: 'TIGA PASARAN',
        cues: [
          { en: "Bursa Malaysia's equity market has three listing segments: the Main Market, the ACE Market and the LEAP Market.", t: 'Pasaran ekuiti Bursa Malaysia mempunyai tiga segmen penyenaraian: Main Market, ACE Market dan LEAP Market.' },
          { en: 'They are not a ranking of quality.', t: 'Ia bukan ranking kualiti.' },
          { en: 'They are designed for companies of different sizes and at different stages of growth — each with its own rules.', t: 'Ia direka untuk syarikat yang berbeza saiz dan peringkat pertumbuhan — masing-masing dengan peraturan tersendiri.' }
        ],
        build(S, C) {
          EQ.heading(S, 'SEGMEN PENYENARAIAN', 'Tiga pasaran, tiga tujuan', S.at(0, -.3));
          [['Main Market', 'PASARAN UTAMA', 'Syarikat besar & mantap', BLUE, 'building'], ['ACE Market', 'ACCESS · CERTAINTY · EFFICIENCY', 'Syarikat berpotensi tumbuh', AMB, 'up'], ['LEAP Market', 'LEADING ENTREPRENEUR ACCELERATOR PLATFORM', 'Perusahaan kecil & sederhana (PKS)', POI, 'star']].forEach((m, i) =>
            EQ.card(S, { x: 60 + i * 610, y: 165, w: 580, h: 300, icon: m[4], t: m[0], s: m[1], b: m[2], c: m[3], top: true, fs: 32, bs: 26, at: S.at(0, .5 + i * 1.1) }));
          const st = S.el(`<div class="statement" style="font-size:44px;text-align:center">Bukan ranking kualiti — <span style="color:${AMB}">peringkat & saiz syarikat yang berbeza.</span></div>`, { x: 60, y: 540, w: 1800 }, { at: S.at(1, .1) });
          S.el(`<div style="text-align:center;font:400 26px Inter;color:#9aa8be">Setiap pasaran mempunyai syarat penyenaraian tersendiri</div>`, { x: 60, y: 630, w: 1800 }, { at: S.at(2, .5) });
        }
      },
      /* 7 · MAIN MARKET */
      {
        label: 'MAIN MARKET',
        cues: [
          { en: 'The Main Market is designed for larger, more established companies.', t: 'Main Market direka untuk syarikat yang lebih besar dan lebih mantap.' },
          { en: 'Applicants generally need to meet quantitative criteria — such as a track record of profits, or a minimum market capitalisation.', t: 'Pemohon secara amnya perlu memenuhi kriteria kuantitatif — seperti rekod keuntungan, atau permodalan pasaran minimum.' },
          { en: 'A Main Market IPO requires approval from the Securities Commission, and the company is guided by a principal adviser, such as an investment bank.', t: 'IPO Main Market memerlukan kelulusan Suruhanjaya Sekuriti, dan syarikat dibimbing oleh principal adviser, seperti bank pelaburan.' },
          { en: 'Main Market shares are open to all investors, including retail investors.', t: 'Saham Main Market terbuka kepada semua pelabur, termasuk pelabur runcit.' },
          { en: 'But being on the Main Market does not make a share risk-free. Every company still needs to be understood on its own.', t: 'Tetapi berada di Main Market tidak menjadikan saham bebas risiko. Setiap syarikat tetap perlu difahami secara tersendiri.' }
        ],
        build(S, C) {
          market(S, {
            head: 'Main Market: untuk syarikat besar & mantap', name: 'Main Market', sub: 'PASARAN UTAMA', icon: 'building', c: BLUE,
            items: ['Syarikat besar & mantap', 'Kriteria kuantitatif: rekod untung atau permodalan pasaran', 'Dibimbing oleh principal adviser', 'Terbuka kepada semua pelabur'],
            ats: [S.at(0, .3), S.at(1), S.at(2), S.at(3)],
            facts: [['KELULUSAN IPO', 'Securities Commission Malaysia', null, S.at(2, .6)], ['PENASIHAT', 'Principal adviser', null, S.at(2, 2.4)], ['SIAPA BOLEH MELABUR', 'Semua pelabur', BULL, S.at(3, .3)], ['RISIKO', 'Tetap ada — bukan bebas risiko', BEAR, S.at(4, .5)]]
          });
        }
      },
      /* 8 · ACE MARKET */
      {
        label: 'ACE MARKET',
        cues: [
          { en: 'The ACE Market is a sponsor-driven market for companies with growth prospects.', t: 'ACE Market ialah pasaran berasaskan sponsor untuk syarikat yang mempunyai prospek pertumbuhan.' },
          { en: 'There is no minimum profit requirement. Instead, a sponsor assesses whether the company is suitable to list — and continues to advise it after listing.', t: 'Tiada syarat keuntungan minimum. Sebaliknya, sponsor menilai sama ada syarikat sesuai disenaraikan — dan terus menasihatinya selepas penyenaraian.' },
          { en: 'ACE Market IPOs are approved by Bursa Malaysia, while the prospectus is registered with the SC.', t: 'IPO ACE Market diluluskan oleh Bursa Malaysia, manakala prospektus didaftarkan dengan SC.' },
          { en: 'Like the Main Market, ACE Market shares are open to all investors.', t: 'Seperti Main Market, saham ACE Market terbuka kepada semua pelabur.' },
          { en: 'Growth companies can carry more uncertainty — but ACE does not automatically mean lower quality.', t: 'Syarikat pertumbuhan mungkin membawa lebih ketidakpastian — tetapi ACE tidak semestinya bermaksud kualiti lebih rendah.' }
        ],
        build(S, C) {
          market(S, {
            head: 'ACE Market: untuk syarikat berprospek pertumbuhan', name: 'ACE Market', sub: 'PASARAN BERASASKAN SPONSOR', icon: 'up', c: AMB,
            items: ['Syarikat berprospek pertumbuhan', 'Tiada syarat keuntungan minimum', 'Sponsor menilai & terus menasihati selepas penyenaraian', 'Terbuka kepada semua pelabur'],
            ats: [S.at(0, .3), S.at(1), S.at(1, 3), S.at(3)],
            facts: [['KELULUSAN IPO', 'Bursa Malaysia', null, S.at(2, .3)], ['PROSPEKTUS', 'Didaftarkan dengan SC', null, S.at(2, 2.2)], ['SIAPA BOLEH MELABUR', 'Semua pelabur', BULL, S.at(3, .3)], ['PERLU DIINGAT', 'ACE ≠ kualiti lebih rendah', AMB, S.at(4, 1.5)]]
          });
        }
      },
      /* 9 · LEAP MARKET */
      {
        label: 'LEAP MARKET', hold: .4,
        cues: [
          { en: 'LEAP stands for Leading Entrepreneur Accelerator Platform. It is a market for small and medium enterprises.', t: 'LEAP bermaksud Leading Entrepreneur Accelerator Platform. Ia pasaran untuk perusahaan kecil dan sederhana.' },
          { en: 'Companies list through an Approved Adviser, and the listing is approved by Bursa Malaysia.', t: 'Syarikat disenaraikan melalui Approved Adviser, dan penyenaraian diluluskan oleh Bursa Malaysia.' },
          { en: 'Most importantly, LEAP Market securities can only be traded by sophisticated investors.', t: 'Paling penting, sekuriti LEAP Market hanya boleh diniagakan oleh sophisticated investors.' },
          { en: "Sophisticated investors are defined by the Securities Commission. They include certain institutions, and individuals who meet set wealth or income criteria.", t: 'Sophisticated investors ditakrifkan oleh Suruhanjaya Sekuriti. Ia termasuk institusi tertentu, dan individu yang memenuhi kriteria kekayaan atau pendapatan yang ditetapkan.' },
          { en: 'So for most retail investors, LEAP Market shares are not accessible.', t: 'Jadi, bagi kebanyakan pelabur runcit, saham LEAP Market tidak boleh diakses.' }
        ],
        build(S, C) {
          market(S, {
            head: 'LEAP Market: untuk PKS · sophisticated investors sahaja', name: 'LEAP Market', sub: 'LEADING ENTREPRENEUR ACCELERATOR PLATFORM', icon: 'star', c: POI,
            items: ['Perusahaan kecil & sederhana (PKS)', 'Disenaraikan melalui Approved Adviser', 'Hanya untuk sophisticated investors', 'Kategori ditakrif oleh SC — institusi & individu yang layak'],
            ats: [S.at(0, .3), S.at(1), S.at(2), S.at(3)],
            facts: [['KELULUSAN', 'Bursa Malaysia', null, S.at(1, 1.5)], ['PENASIHAT', 'Approved Adviser', null, S.at(1, 2.6)], ['SIAPA BOLEH MELABUR', 'Sophisticated investors sahaja', BEAR, S.at(2, .6)], ['PELABUR RUNCIT BIASA', 'Tidak boleh akses', BEAR, S.at(4, .3)]]
          });
        }
      },
      /* 10 · PERBANDINGAN */
      {
        label: 'PERBANDINGAN', hold: .8,
        cues: [
          { en: "Let's compare the three markets side by side.", t: 'Mari bandingkan ketiga-tiga pasaran secara sebelah-menyebelah.' },
          { en: 'They differ in the type of company, the listing criteria, who approves the listing, and the adviser involved.', t: 'Ia berbeza dari segi jenis syarikat, kriteria penyenaraian, pihak yang meluluskan, dan penasihat yang terlibat.' },
          { en: 'And the most important difference for investors: the Main and ACE Markets are open to all investors, while LEAP is restricted to sophisticated investors.', t: 'Dan perbezaan paling penting bagi pelabur: Main dan ACE Market terbuka kepada semua pelabur, manakala LEAP terhad kepada sophisticated investors.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERBANDINGAN ASAS', 'Main · ACE · LEAP', S.at(0, -.3));
          const tb = S.table(60, 160, 1800, ['', 'Main Market', 'ACE Market', 'LEAP Market'], [
            ['Jenis syarikat', 'Besar & mantap', 'Berprospek pertumbuhan', 'PKS'],
            ['Kriteria utama', 'Rekod untung / permodalan', 'Tiada syarat untung minimum', 'Syarat lebih ringkas'],
            ['Kelulusan IPO', 'SC', 'Bursa Malaysia', 'Bursa Malaysia'],
            ['Penasihat', 'Principal adviser', 'Sponsor', 'Approved Adviser'],
            ['Siapa boleh melabur', 'Semua pelabur', 'Semua pelabur', 'Sophisticated investors sahaja']
          ], [S.at(1, .2), S.at(1, 1.2), S.at(1, 2.4), S.at(1, 3.6), S.at(2, .4)], { colw: ['22%', '26%', '26%', '26%'], fs: 24 });
          tb.querySelectorAll('th')[1].style.color = BLUE; tb.querySelectorAll('th')[2].style.color = AMB; tb.querySelectorAll('th')[3].style.color = POI;
          const last = tb.querySelectorAll('tbody tr')[4]; last.children[3].style.color = BEAR; last.children[1].style.color = BULL; last.children[2].style.color = BULL;
          S.hl(last, S.at(2, 1.5), undefined);
          EQ.chip(S, 'PERBANDINGAN STRUKTUR · BUKAN RANKING KUALITI', 60, 640, AMB, S.at(2, 3));
        }
      },
      /* 11 · KENAPA PILIH */
      {
        label: 'PEMILIHAN PASARAN',
        cues: [
          { en: 'So why does a company choose one market over another?', t: 'Jadi, kenapa syarikat memilih satu pasaran berbanding yang lain?' },
          { en: 'It depends on its size, its track record and its stage of growth.', t: 'Ia bergantung pada saiz, rekod prestasi dan peringkat pertumbuhannya.' },
          { en: 'It also depends on how much capital it needs, and which investors it wants to reach.', t: 'Ia juga bergantung pada jumlah modal yang diperlukan, dan pelabur yang ingin disasarkan.' },
          { en: "For investors, the market segment is useful context — but it is not a shortcut. Always study the company's business, financials and risks.", t: 'Bagi pelabur, segmen pasaran ialah konteks yang berguna — tetapi bukan jalan pintas. Sentiasa kaji perniagaan, kewangan dan risiko syarikat.' }
        ],
        build(S, C) {
          EQ.heading(S, 'FAKTOR PEMILIHAN', 'Kenapa syarikat memilih pasaran tertentu', S.at(0, -.3));
          [['chart', 'Saiz syarikat', S.at(1, .2)], ['file', 'Rekod prestasi', S.at(1, 1.2)], ['up', 'Peringkat pertumbuhan', S.at(1, 2.2)], ['coins', 'Keperluan modal', S.at(2, .2)], ['users', 'Sasaran pelabur', S.at(2, 1.8)]].forEach((f, i) =>
            EQ.card(S, { x: 60 + i * 364, y: 170, w: 340, h: 170, icon: f[0], t: f[1], top: true, at: f[2] }));
          const p = S.el('', { x: 60, y: 400, w: 1800, h: 200, cls: 'panel' }, { at: S.at(3, -.2) });
          p.style.borderLeft = `3px solid ${AMB}`;
          S.el(`<div style="display:flex;gap:14px;align-items:center">${EQ.icon('eye', 32)}<div style="font:700 28px Inter">Untuk pelabur: segmen pasaran = konteks, bukan jalan pintas</div></div>`, { x: 30, y: 30, parent: p });
          ['PERNIAGAAN', 'KEWANGAN', 'RISIKO'].forEach((t, i) => EQ.chip(S, 'KAJI ' + t, 30 + i * 260, 115, '#c7d0de', S.at(3, 2 + i * .5), { parent: p }));
        }
      },
      /* 12 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'Bursa Malaysia runs the marketplace. The Securities Commission oversees the capital market, including Bursa.', t: 'Bursa Malaysia mengendalikan pasaran. Suruhanjaya Sekuriti mengawasi pasaran modal, termasuk Bursa.' },
          { en: 'There are three listing markets: Main, ACE and LEAP — built for companies of different sizes and stages.', t: 'Terdapat tiga pasaran penyenaraian: Main, ACE dan LEAP — untuk syarikat yang berbeza saiz dan peringkat.' },
          { en: 'Main and ACE are open to all investors. LEAP is only for sophisticated investors.', t: 'Main dan ACE terbuka kepada semua pelabur. LEAP hanya untuk sophisticated investors.' },
          { en: 'And remember: the market segment is not a ranking of quality.', t: 'Dan ingat: segmen pasaran bukan ranking kualiti.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Bursa Malaysia — apa yang perlu diingat', [
            'Bursa = pengendali pasaran', 'SC = pengawal selia pasaran modal', 'Main · ACE · LEAP = tiga segmen',
            'Main & ACE: semua pelabur', 'LEAP: sophisticated investors sahaja', 'Segmen ≠ ranking kualiti'
          ], [S.at(1), S.at(1, 2), S.at(2), S.at(3), S.at(3, 2), S.at(4)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Satu bursa, tiga pasaran — <span style="color:${AMB}">peraturan berbeza.</span></div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(4, .8) });
        }
      },
      /* 13 · SIRI */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'Now you know where shares are listed.', t: 'Kini anda tahu di mana saham disenaraikan.' },
          { en: 'Next, we look at how an investor actually gets access: the CDS account and the trading account.', t: 'Seterusnya, kita lihat bagaimana pelabur sebenarnya mendapat akses: akaun CDS dan akaun dagangan.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 2, [S.at(0), S.at(1)]); }
      },
      /* 14 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'Bursa Malaysia — Main Market Listing Requirements', tag: 'Main Market' },
            { t: 'Bursa Malaysia — ACE Market Listing Requirements (sponsor framework)', tag: 'ACE Market' },
            { t: 'Bursa Malaysia — LEAP Market Listing Requirements (Approved Adviser)', tag: 'LEAP Market' },
            { t: 'Securities Commission Malaysia — Guidelines on Sophisticated Investors', tag: 'Kelayakan LEAP' },
            { t: 'Securities Commission Malaysia — About the SC; Capital Markets and Services Act 2007', tag: 'Peranan SC' }
          ], S.at(0));
        }
      },
      /* 15 · PENAFIAN */
      {
        label: 'PENAFIAN', hold: 2.6,
        cues: [
          { en: 'This video is for educational purposes only. It is not investment advice, or a recommendation to buy or sell any securities.', t: 'Video ini untuk tujuan pendidikan sahaja. Ia bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.' },
          { en: 'Capital Market Institute. Understanding Markets. Building Knowledge.', t: 'Capital Market Institute. Understanding Markets. Building Knowledge.' }
        ],
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 03 — Akaun CDS dan Akaun Dagangan'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
