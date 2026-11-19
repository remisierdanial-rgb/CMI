/* CMI Equity Series — VIDEO 03: Akaun CDS dan Akaun Dagangan
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 * Platform screens are a GENERIC illustration (no real UI, logo or feature claims) — see fact-check V03.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';

  const EPISODE = {
    id: 'eq03', ...EQ.header(3, 'CDS & Akaun Dagangan'),
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'You already know what a share is. But how exactly does someone start buying shares on Bursa Malaysia?', t: 'Anda sudah tahu apa itu saham. Tetapi bagaimana sebenarnya seseorang boleh mula membeli saham di Bursa Malaysia?' },
          { en: 'There are a few pieces that need to be in place first.', t: 'Ada beberapa perkara yang perlu disediakan terlebih dahulu.' }
        ],
        build(S, C) {
          const N = S.flow([
            { id: 'u', x: 160, y: 300, w: 300, h: 160, t: 'Pelabur', s: 'MAHU MEMBELI SAHAM', at: S.at(0, .2) },
            { id: 'q', x: 810, y: 300, w: 300, h: 160, t: '?', c: AMB, at: S.at(0, 1.6), fs: 64 },
            { id: 'b', x: 1460, y: 300, w: 300, h: 160, t: 'Bursa Malaysia', s: 'PASARAN SAHAM', c: AMB, at: S.at(0, .9) }
          ], [{ f: 'u', to: 'q', at: S.at(0, 2.2), c: DIM }, { f: 'q', to: 'b', at: S.at(0, 2.8), c: DIM }]);
          ['AKAUN CDS', 'AKAUN DAGANGAN', 'BROKER', 'PLATFORM'].forEach((t, i) => EQ.chip(S, t, 640 + (i % 2) * 340, 520 + Math.floor(i / 2) * 56, AMB, S.at(1, .2 + i * .4)));
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we look at the two accounts every share investor in Malaysia needs, and the role of the stockbroker.', t: 'Dalam video ini, kita lihat dua akaun yang diperlukan setiap pelabur saham di Malaysia, dan peranan broker saham.' },
          { en: 'First, the CDS account, and how it differs from the trading account.', t: 'Pertama, akaun CDS, dan bezanya dengan akaun dagangan.' },
          { en: 'Second, direct and nominee CDS accounts.', t: 'Kedua, akaun CDS direct dan nominee.' },
          { en: 'And third, how an account is opened, and how an order travels from your screen to the market.', t: 'Dan ketiga, bagaimana akaun dibuka, dan bagaimana pesanan bergerak dari skrin anda ke pasaran.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 03 · MODUL 1 · KENALI PASARAN SAHAM', title: 'Akaun CDS dan Akaun Dagangan', size: 80,
            lead: 'CDS · Trading account · Direct & Nominee · Broker · Platform', leadY: 290,
            objectives: ['Fungsi akaun CDS & akaun dagangan', 'Direct CDS berbanding Nominee CDS', 'Pembukaan akaun & aliran pesanan'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const b = S.el('', { x: 1240, y: 400, w: 580, h: 300, cls: 'panel' }, { at: S.at(0, 1) });
          S.el(`<div style="display:flex;align-items:center;justify-content:space-around;height:300px;padding:0 30px">
            <div style="text-align:center">${EQ.icon('lock', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">AKAUN CDS</div></div>
            <div style="font:300 40px Inter;color:${AMB}">+</div>
            <div style="text-align:center">${EQ.icon('swap', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">AKAUN DAGANGAN</div></div></div>`, { x: 0, y: 0, w: 580, parent: b });
        }
      },
      /* 3 · DUA AKAUN */
      {
        label: 'DUA AKAUN',
        cues: [
          { en: 'To buy and sell shares in Malaysia, an investor generally needs two accounts.', t: 'Untuk membeli dan menjual saham di Malaysia, pelabur secara amnya memerlukan dua akaun.' },
          { en: 'A CDS account, which records the shares you own.', t: 'Akaun CDS, yang merekodkan saham yang anda miliki.' },
          { en: 'And a trading account, which you use to place buy and sell orders.', t: 'Dan akaun dagangan, yang anda gunakan untuk membuat pesanan beli dan jual.' },
          { en: 'They work together, but they are not the same thing.', t: 'Kedua-duanya bekerjasama, tetapi ia bukan perkara yang sama.' }
        ],
        build(S, C) {
          EQ.heading(S, 'ASAS', 'Dua akaun, dua fungsi', S.at(0, -.3));
          EQ.card(S, { x: 60, y: 170, w: 860, h: 330, icon: 'lock', is: 44, t: 'Akaun CDS', s: 'CENTRAL DEPOSITORY SYSTEM', fs: 34, bs: 27, b: 'Merekodkan <b style="color:#f1f5fb">saham yang anda miliki</b> secara elektronik.', top: true, at: S.at(1) });
          EQ.card(S, { x: 1000, y: 170, w: 860, h: 330, icon: 'swap', is: 44, t: 'Akaun dagangan', s: 'TRADING ACCOUNT', fs: 34, bs: 27, b: 'Digunakan untuk <b style="color:#f1f5fb">menghantar pesanan beli & jual</b>.', c: BLUE, top: true, at: S.at(2) });
          EQ.chip(S, 'AKAUN CDS ≠ AKAUN DAGANGAN', 760, 560, BEAR, S.at(3));
        }
      },
      /* 4 · CDS */
      {
        label: 'AKAUN CDS', hold: .4,
        cues: [
          { en: 'CDS stands for Central Depository System. A CDS account records your shareholdings in electronic form.', t: 'CDS bermaksud Central Depository System. Akaun CDS merekodkan pegangan saham anda dalam bentuk elektronik.' },
          { en: 'The system is operated by Bursa Malaysia Depository, the central depository for securities listed on Bursa Malaysia.', t: 'Sistem ini dikendalikan oleh Bursa Malaysia Depository, depositori pusat bagi sekuriti yang tersenarai di Bursa Malaysia.' },
          { en: 'Think of it as a secure record of what you own. It records shares — not your cash.', t: 'Anggap ia sebagai rekod selamat tentang apa yang anda miliki. Ia merekodkan saham — bukan wang tunai anda.' },
          { en: 'You do not open a CDS account directly with Bursa. It is opened through a broker acting as an Authorised Depository Agent.', t: 'Anda tidak membuka akaun CDS terus dengan Bursa. Ia dibuka melalui broker yang bertindak sebagai Authorised Depository Agent.' }
        ],
        build(S, C) {
          EQ.heading(S, 'CENTRAL DEPOSITORY SYSTEM', 'Akaun CDS: rekod pemilikan saham anda', S.at(0, -.3));
          const p = S.el('', { x: 60, y: 160, w: 860, h: 480, cls: 'panel' }, { at: S.at(0, .2) });
          S.el('<div class="lbl">PENYATA PEGANGAN · ILUSTRASI</div>', { x: 30, y: 26, parent: p });
          [['SAHAM A', '2,000 unit'], ['SAHAM B', '500 unit'], ['SAHAM C', '1,200 unit']].forEach((r, i) => S.el(`<div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(148,170,210,.08);padding:16px 4px"><span style="font:600 26px Inter">${r[0]}</span><span class="mono" style="font:700 26px JBM;color:${AMB}">${r[1]}</span></div>`, { x: 30, y: 80 + i * 76, w: 800, parent: p }, { at: S.at(0, 1 + i * .5), dx: -12, dy: 0 }));
          EQ.chip(S, 'TIADA BAKI TUNAI DI SINI', 30, 340, BEAR, S.at(2, 1.8), { parent: p });
          S.el(`<div class="mono" style="font-size:16px;color:${DIM}">Nama saham & kuantiti ialah contoh ilustrasi</div>`, { x: 30, y: 420, parent: p }, { at: S.at(0, 2.5) });
          S.flow([
            { id: 'bd', x: 1000, y: 170, w: 860, h: 120, t: 'Bursa Malaysia Depository', s: 'MENGENDALIKAN CDS', c: AMB, at: S.at(1, .2) },
            { id: 'ada', x: 1000, y: 360, w: 860, h: 120, t: 'Broker · Authorised Depository Agent', s: 'TEMPAT AKAUN CDS DIBUKA', at: S.at(3, .2) },
            { id: 'inv', x: 1240, y: 540, w: 380, h: 100, t: 'Pelabur', at: S.at(3, 1.2) }
          ], [{ f: 'bd', to: 'ada', at: S.at(3, .8), c: AMB }, { f: 'ada', to: 'inv', at: S.at(3, 1.6) }]);
        }
      },
      /* 5 · TRADING ACCOUNT */
      {
        label: 'AKAUN DAGANGAN', hold: .4,
        cues: [
          { en: 'A trading account is opened with a stockbroking firm — a participating organisation of Bursa Malaysia.', t: 'Akaun dagangan dibuka dengan firma broker saham — participating organisation Bursa Malaysia.' },
          { en: 'This is the account you use to send buy and sell orders to the market.', t: 'Inilah akaun yang anda gunakan untuk menghantar pesanan beli dan jual ke pasaran.' },
          { en: 'There are different types. In a cash account, you trade within your deposit or an approved trading limit.', t: 'Terdapat beberapa jenis. Dalam akaun tunai, anda berdagang dalam lingkungan deposit atau had dagangan yang diluluskan.' },
          { en: 'In a margin account, the broker lends you money to buy shares. This can magnify losses, and is generally not recommended for beginners.', t: 'Dalam akaun margin, broker meminjamkan wang untuk membeli saham. Ini boleh membesarkan kerugian, dan secara amnya tidak disarankan untuk pemula.' }
        ],
        build(S, C) {
          EQ.heading(S, 'TRADING ACCOUNT', 'Akaun dagangan: saluran pesanan anda', S.at(0, -.3));
          EQ.card(S, { x: 60, y: 165, w: 1800, h: 140, icon: 'bank', t: 'Dibuka dengan firma broker saham', s: 'PARTICIPATING ORGANISATION BURSA MALAYSIA', c: BLUE, at: S.at(0, .2) });
          EQ.chip(S, 'BELI · JUAL → PASARAN', 1500, 215, BLUE, S.at(1, .3));
          EQ.card(S, { x: 60, y: 345, w: 880, h: 260, icon: 'coins', t: 'Akaun tunai', s: 'CASH ACCOUNT', top: true, b: 'Berdagang dalam lingkungan deposit atau had dagangan yang diluluskan broker.', at: S.at(2) });
          EQ.card(S, { x: 980, y: 345, w: 880, h: 260, icon: 'alert', t: 'Akaun margin', s: 'PINJAMAN DARIPADA BROKER', c: BEAR, top: true, b: 'Boleh membesarkan kerugian. Secara amnya tidak disarankan untuk pemula.', at: S.at(3) });
        }
      },
      /* 6 · PERBEZAAN */
      {
        label: 'CDS VS DAGANGAN', hold: .6,
        cues: [
          { en: 'Here is the difference in one table.', t: 'Inilah perbezaannya dalam satu jadual.' },
          { en: 'The CDS account answers: what shares do I own? The trading account answers: how do I buy or sell?', t: 'Akaun CDS menjawab: saham apa yang saya miliki? Akaun dagangan menjawab: bagaimana saya membeli atau menjual?' },
          { en: 'A simple analogy: the CDS account is like a safe-deposit record, and the trading account is like the counter where transactions happen.', t: 'Analogi mudah: akaun CDS seperti rekod peti simpanan, dan akaun dagangan seperti kaunter tempat urus niaga berlaku.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERBANDINGAN', 'Akaun CDS berbanding akaun dagangan', S.at(0, -.3));
          const tb = S.table(60, 165, 1800, ['', 'Akaun CDS', 'Akaun dagangan'], [
            ['Fungsi', 'Merekod pemilikan saham', 'Menghantar pesanan beli & jual'],
            ['Dikendalikan', 'Bursa Malaysia Depository (melalui ADA)', 'Firma broker saham'],
            ['Soalan dijawab', 'Saham apa yang saya miliki?', 'Bagaimana saya beli atau jual?'],
            ['Analogi', 'Rekod peti simpanan', 'Kaunter urus niaga']
          ], [S.at(0, .6), S.at(0, 1.4), S.at(1), S.at(2)], { colw: ['20%', '40%', '40%'], fs: 25 });
          tb.querySelectorAll('th')[1].style.color = AMB; tb.querySelectorAll('th')[2].style.color = BLUE;
        }
      },
      /* 7 · DIRECT vs NOMINEE */
      {
        label: 'DIRECT VS NOMINEE', hold: .5,
        cues: [
          { en: 'There are two common types of CDS account: direct and nominee.', t: 'Terdapat dua jenis akaun CDS yang biasa: direct dan nominee.' },
          { en: "In a direct CDS account, the shares are recorded in your own name. You appear in the company's record of depositors, and receive company notices directly.", t: 'Dalam akaun CDS direct, saham direkodkan atas nama anda sendiri. Anda tersenarai dalam rekod pendeposit syarikat, dan menerima notis syarikat secara terus.' },
          { en: 'In a nominee CDS account, the shares are held in the name of a nominee company, usually linked to the broker, on your behalf. You remain the beneficial owner.', t: 'Dalam akaun CDS nominee, saham dipegang atas nama syarikat nominee, biasanya berkaitan dengan broker, bagi pihak anda. Anda kekal sebagai pemilik benefisial.' },
          { en: 'With a nominee account, matters such as corporate actions and voting are usually handled through the nominee.', t: 'Bagi akaun nominee, urusan seperti tindakan korporat dan pengundian biasanya dikendalikan melalui nominee.' },
          { en: "Each type has its own features and conditions — so check the details with your broker before choosing.", t: 'Setiap jenis mempunyai ciri dan syarat tersendiri — jadi semak butirannya dengan broker sebelum memilih.' }
        ],
        build(S, C) {
          EQ.heading(S, 'JENIS AKAUN CDS', 'Direct CDS berbanding Nominee CDS', S.at(0, -.3));
          const mk = (x, icon, t, s, c, rows, at) => {
            const p = EQ.card(S, { x, y: 160, w: 880, h: 450, icon, t, s, c, top: true, fs: 30, at });
            rows.forEach((r, i) => S.el(`<div style="display:flex;gap:20px;border-top:1px solid rgba(148,170,210,.08);padding-top:14px"><span class="lbl" style="width:220px;flex:none;padding-top:5px">${r[0]}</span><span style="font:400 25px/1.35 Inter;color:#e3e9f2">${r[1]}</span></div>`, { x: 26, y: 110 + i * 105, w: 820, parent: p }, { at: r[2], dy: 0, dx: -10 }));
          };
          mk(60, 'user', 'Direct CDS', 'ATAS NAMA ANDA SENDIRI', AMB, [['NAMA PEMEGANG', 'Anda sendiri', S.at(1, .4)], ['REKOD SYARIKAT', 'Nama anda dalam rekod pendeposit', S.at(1, 2.6)], ['NOTIS SYARIKAT', 'Diterima secara terus', S.at(1, 5)]], S.at(1, -.2));
          mk(980, 'users', 'Nominee CDS', 'DIPEGANG OLEH SYARIKAT NOMINEE', BLUE, [['NAMA PEMEGANG', 'Syarikat nominee, bagi pihak anda', S.at(2, .6)], ['PEMILIK BENEFISIAL', 'Tetap anda', S.at(2, 4)], ['TINDAKAN KORPORAT', 'Biasanya melalui nominee', S.at(3, .3)]], S.at(2, -.2));
          EQ.chip(S, 'SEMAK CIRI & SYARAT DENGAN BROKER', 740, 650, '#c7d0de', S.at(4, .3));
        }
      },
      /* 8 · PERANAN BROKER */
      {
        label: 'PERANAN BROKER',
        cues: [
          { en: 'The stockbroker is your gateway to the market.', t: 'Broker saham ialah pintu masuk anda ke pasaran.' },
          { en: 'Brokers are licensed by the Securities Commission and are participating organisations of Bursa Malaysia.', t: 'Broker dilesenkan oleh Suruhanjaya Sekuriti dan merupakan participating organisation Bursa Malaysia.' },
          { en: 'They open your trading and CDS accounts, provide the trading platform, send your orders to Bursa, and handle the settlement of your trades.', t: 'Mereka membuka akaun dagangan dan akaun CDS anda, menyediakan platform dagangan, menghantar pesanan anda ke Bursa, dan menguruskan penyelesaian dagangan anda.' },
          { en: 'Brokers charge fees for their services, such as brokerage. Fees differ between brokers, so compare before you start.', t: 'Broker mengenakan fi bagi perkhidmatan mereka, seperti brokerage. Fi berbeza antara broker, jadi bandingkan sebelum mula.' }
        ],
        build(S, C) {
          EQ.heading(S, 'BROKER SAHAM', 'Pintu masuk anda ke pasaran', S.at(0, -.3));
          const lic = S.el(`<div style="display:flex;gap:16px;align-items:center;height:100%">${EQ.icon('shield', 34, BLUE)}<span style="font:600 25px Inter">Dilesenkan oleh SC</span><span style="color:${DIM};font:400 26px Inter;margin:0 10px">·</span>${EQ.icon('bank', 34, AMB)}<span style="font:600 25px Inter">Participating organisation Bursa Malaysia</span></div>`, { x: 60, y: 160, w: 1800, h: 90, cls: 'panel', style: 'padding:0 30px' }, { at: S.at(1) });
          [['file', 'Buka akaun', 'DAGANGAN & CDS', S.at(2, .3)], ['chart', 'Sediakan platform', 'APLIKASI / WEB', S.at(2, 2)], ['swap', 'Hantar pesanan', 'KE SISTEM BURSA', S.at(2, 3.6)], ['coins', 'Urus penyelesaian', 'BAYARAN & SAHAM', S.at(2, 5.2)]].forEach((r, i) =>
            EQ.card(S, { x: 60 + i * 455, y: 290, w: 425, h: 170, icon: r[0], t: r[1], s: r[2], top: true, at: r[3] }));
          EQ.card(S, { x: 60, y: 500, w: 1800, h: 120, icon: 'coins', t: 'Fi broker berbeza-beza', s: 'BROKERAGE & CAJ LAIN · BANDINGKAN SEBELUM MULA', c: '#c7d0de', at: S.at(3) });
        }
      },
      /* 9 · PROSES BUKA AKAUN */
      {
        label: 'BUKA AKAUN', hold: .5,
        cues: [
          { en: 'Opening an account usually follows a few basic steps.', t: 'Pembukaan akaun biasanya melalui beberapa langkah asas.' },
          { en: 'First, choose a licensed broker.', t: 'Pertama, pilih broker berlesen.' },
          { en: 'Second, complete the application and identity verification. Many brokers now offer this online, with electronic know-your-customer checks.', t: 'Kedua, lengkapkan permohonan dan pengesahan identiti. Kini banyak broker menawarkannya secara dalam talian, dengan semakan eKYC.' },
          { en: 'Third, the broker opens your trading account and your CDS account.', t: 'Ketiga, broker membuka akaun dagangan dan akaun CDS anda.' },
          { en: 'Finally, fund your account or obtain your trading limit — and you are ready to place orders.', t: 'Akhir sekali, masukkan dana atau dapatkan had dagangan — dan anda sedia untuk membuat pesanan.' },
          { en: 'The exact steps and documents depend on the broker.', t: 'Langkah dan dokumen sebenar bergantung pada broker.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PROSES ASAS', 'Langkah membuka akaun saham', S.at(0, -.3));
          const steps = [['bank', 'Pilih broker berlesen', S.at(1)], ['user', 'Permohonan & eKYC', S.at(2)], ['lock', 'Akaun dagangan + CDS dibuka', S.at(3)], ['coins', 'Dana / had dagangan', S.at(4)], ['swap', 'Sedia membuat pesanan', S.at(4, 2.4)]];
          steps.forEach((s, i) => {
            const d = S.el(`<div style="font:700 22px JBM;color:${AMB}">${String(i + 1).padStart(2, '0')}</div><div style="margin-top:18px">${EQ.icon(s[0], 46)}</div><div style="font:700 25px/1.25 Inter;margin-top:16px">${s[1]}</div>`, { x: 60 + i * 364, y: 200, w: 330, h: 260, cls: 'card' }, { at: s[2] });
            if (i < 4) S.el(`<div style="font:700 34px Inter;color:${DIM}">→</div>`, { x: 60 + i * 364 + 336, y: 300 }, { at: steps[i + 1][2] - .2, dy: 0 });
          });
          EQ.chip(S, 'LANGKAH & DOKUMEN BERGANTUNG PADA BROKER', 60, 520, '#c7d0de', S.at(5));
        }
      },
      /* 10 · PLATFORM: PHILLIP CAPITAL / POEMS MY */
      {
        label: 'PLATFORM DAGANGAN', hold: .8,
        cues: [
          { en: 'To access the stock market, investors usually use the services of a broker and a trading platform.', t: 'Untuk mengakses pasaran saham, pelabur biasanya menggunakan perkhidmatan broker dan platform dagangan.' },
          { en: 'For example, Phillip Capital Sdn Bhd provides access to the equity market through platforms such as POEMS MY.', t: 'Sebagai contoh, Phillip Capital Sdn Bhd menyediakan akses kepada pasaran ekuiti melalui platform seperti POEMS MY.' },
          { en: 'Trading platforms generally include a watchlist to follow selected stocks,', t: 'Platform dagangan secara amnya mempunyai watchlist untuk memantau saham pilihan,' },
          { en: 'stock information, a price chart,', t: 'maklumat saham, carta harga,' },
          { en: 'and an order screen to place buy and sell orders.', t: 'dan skrin pesanan untuk membuat pesanan beli dan jual.' },
          { en: "The screen shown here is a generic illustration. Always refer to the broker's official platform and user guides.", t: 'Paparan di sini ialah ilustrasi generik. Sentiasa rujuk platform rasmi dan panduan pengguna broker.' }
        ],
        build(S, C) {
          EQ.heading(S, 'CONTOH AKSES PASARAN', 'Broker & platform dagangan', S.at(0, -.3));
          S.el(`<div style="display:flex;gap:14px;align-items:center">${EQ.icon('bank', 30)}<span style="font:700 26px Inter">Phillip Capital Sdn Bhd</span><span style="color:${DIM};font-size:26px">→</span><span style="font:700 26px Inter;color:${AMB}">POEMS MY</span><span class="lbl" style="margin-left:14px">CONTOH BROKER & PLATFORM</span></div>`, { x: 60, y: 150 }, { at: S.at(1, .5) });
          const W = S.el('', { x: 60, y: 210, w: 1800, h: 440, cls: 'panel', style: 'overflow:hidden' }, { at: S.at(2, -.4) });
          S.el(`<span class="chip" style="color:${BEAR};border-color:${BEAR}aa">ILUSTRASI GENERIK · BUKAN PAPARAN SEBENAR PLATFORM</span>`, { r: 20, y: 14, parent: W }, { at: S.at(2, -.2) });
          // watchlist
          const wl = S.el('<div class="lbl" style="margin-bottom:10px">WATCHLIST</div>' + [['SAHAM A', '2.50', '+0.03', BULL], ['SAHAM B', '1.12', '−0.02', BEAR], ['SAHAM C', '4.08', '+0.05', BULL], ['SAHAM D', '0.86', '0.00', DIM]].map(r => `<div style="display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid rgba(148,170,210,.07)"><span style="font:600 21px Inter">${r[0]}</span><span class="mono" style="font-size:19px">${r[1]} <span style="color:${r[3]}">${r[2]}</span></span></div>`).join(''),
            { x: 24, y: 60, w: 380, h: 360, cls: 'card', parent: W, style: 'padding:18px' }, { at: S.at(2, .3) });
          S.hl(wl.children[1], S.at(3, -.3), undefined);
          // info
          const inf = S.el(`<div class="lbl">MAKLUMAT SAHAM</div><div style="font:800 30px Inter;margin-top:14px">SAHAM A</div><div class="mono" style="font-size:18px;color:#9aa8be;margin-top:12px;line-height:1.9">Harga terakhir 2.50<br>Tinggi / Rendah 2.53 / 2.46<br>Volume 1,240 lot</div>`,
            { x: 424, y: 60, w: 380, h: 360, cls: 'card', parent: W, style: 'padding:18px' }, { at: S.at(3, .1) });
          // chart
          const ch = S.chart({ name: 'eq03-platform', x: 884, y: 270, w: 560, h: 360, candles: EQ.ohlc(EQ.path([[0, 2.40], [8, 2.47], [12, 2.44], [19, 2.50]], 11, .01), 5, .012), yMin: 2.36, yMax: 2.56, step: .05, dp: 2, slots: 22, title: 'CARTA HARGA', at: S.at(3, 1.2) });
          ch.reveal(19, S.at(3, 1.5), .06);
          // order ticket
          const ot = S.el(`<div class="lbl">SKRIN PESANAN</div>
            <div style="display:flex;gap:10px;margin-top:16px"><span style="flex:1;text-align:center;padding:10px;border-radius:6px;background:${BULL};font:700 20px Inter">BELI</span><span style="flex:1;text-align:center;padding:10px;border-radius:6px;border:1.5px solid ${BEAR};color:${BEAR};font:700 20px Inter">JUAL</span></div>
            <div class="mono" style="font-size:18px;color:#c7d0de;margin-top:18px;line-height:2.1">Harga &nbsp;&nbsp;&nbsp;&nbsp;2.50<br>Kuantiti &nbsp;10 lot<br>Jenis &nbsp;&nbsp;&nbsp;&nbsp;Limit</div>`,
            { x: 1404, y: 60, w: 372, h: 360, cls: 'card', parent: W, style: 'padding:18px' }, { at: S.at(4, .1) });
          S.el(`<div class="mono" style="font-size:15px;color:${DIM}">Semua nama & angka ialah ilustrasi · rujuk platform & panduan rasmi broker</div>`, { x: 60, y: 668 }, { at: S.at(5) });
        }
      },
      /* 11 · ALIRAN PESANAN */
      {
        label: 'ALIRAN PESANAN', hold: .6,
        cues: [
          { en: "So what happens when you place an order? Let's follow its journey.", t: 'Jadi, apa berlaku apabila anda membuat pesanan? Mari ikuti perjalanannya.' },
          { en: 'You enter the order on the platform. The broker checks it against your account, such as your trading limit.', t: 'Anda memasukkan pesanan di platform. Broker menyemaknya berdasarkan akaun anda, seperti had dagangan.' },
          { en: "The order is then sent to Bursa Malaysia's trading system, where it waits to be matched with an opposite order.", t: 'Pesanan kemudian dihantar ke sistem dagangan Bursa Malaysia, di mana ia menunggu untuk dipadankan dengan pesanan bertentangan.' },
          { en: 'Once matched and settled, the shares are credited into your CDS account.', t: 'Setelah dipadankan dan diselesaikan, saham dikreditkan ke dalam akaun CDS anda.' },
          { en: 'How matching and settlement work is what we cover in the next video.', t: 'Bagaimana padanan dan penyelesaian berfungsi akan kita bincangkan dalam video seterusnya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERJALANAN PESANAN', 'Dari skrin anda ke pasaran', S.at(0, -.3));
          S.flow([
            { id: 'a', x: 60, y: 260, w: 300, h: 150, t: 'Pelabur', s: 'MASUKKAN PESANAN', at: S.at(1, -.1) },
            { id: 'b', x: 430, y: 260, w: 320, h: 150, t: 'Platform & broker', s: 'SEMAKAN AKAUN / HAD', c: BLUE, at: S.at(1, 1.6) },
            { id: 'c', x: 820, y: 260, w: 330, h: 150, t: 'Sistem dagangan Bursa', s: 'MENUNGGU PADANAN', c: AMB, at: S.at(2, .3) },
            { id: 'd', x: 1220, y: 260, w: 280, h: 150, t: 'Dipadankan & diselesaikan', at: S.at(3, .2), fs: 22 },
            { id: 'e', x: 1570, y: 260, w: 290, h: 150, t: 'Akaun CDS', s: 'SAHAM DIKREDITKAN', c: BULL, at: S.at(3, 1.4) }
          ], [{ f: 'a', to: 'b', at: S.at(1, 1.2) }, { f: 'b', to: 'c', at: S.at(2, .1) }, { f: 'c', to: 'd', at: S.at(3, 0) }, { f: 'd', to: 'e', at: S.at(3, 1.2), c: BULL }]);
          EQ.chip(S, 'PADANAN & PENYELESAIAN → VIDEO 04', 820, 470, AMB, S.at(4));
        }
      },
      /* 12 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'A CDS account records the shares you own. A trading account is used to place orders.', t: 'Akaun CDS merekodkan saham yang anda miliki. Akaun dagangan digunakan untuk membuat pesanan.' },
          { en: 'A direct CDS account is in your own name. A nominee account is held by a nominee on your behalf.', t: 'Akaun CDS direct atas nama anda sendiri. Akaun nominee dipegang oleh nominee bagi pihak anda.' },
          { en: 'Brokers are your gateway to the market — they open accounts, provide platforms and send your orders to Bursa.', t: 'Broker ialah pintu masuk anda ke pasaran — mereka membuka akaun, menyediakan platform dan menghantar pesanan anda ke Bursa.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Akaun saham — apa yang perlu diingat', [
            'CDS = rekod pemilikan saham', 'Akaun dagangan = saluran pesanan', 'Direct = atas nama sendiri',
            'Nominee = dipegang bagi pihak anda', 'Broker = pintu masuk ke pasaran', 'Margin = risiko lebih tinggi'
          ], [S.at(1), S.at(1, 2), S.at(2), S.at(2, 2.4), S.at(3), S.at(3, 2.5)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Akaun CDS <span style="color:${AMB}">menyimpan rekod</span> · akaun dagangan <span style="color:${BLUE}">menghantar pesanan</span></div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(3, 1.5) });
        }
      },
      /* 13 · SIRI */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'Your accounts are ready. But when can you trade, and how do you place an order correctly?', t: 'Akaun anda sudah sedia. Tetapi bila anda boleh berdagang, dan bagaimana membuat pesanan dengan betul?' },
          { en: 'Next: trading hours, lots, and how buy and sell orders work.', t: 'Seterusnya: waktu dagangan, lot, dan cara pesanan beli dan jual berfungsi.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 3, [S.at(0), S.at(1)]); }
      },
      /* 14 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'Bursa Malaysia Depository — Central Depository System (CDS) & Authorised Depository Agents', tag: 'Akaun CDS' },
            { t: 'Bursa Malaysia — Participating Organisations (stockbroking firms)', tag: 'Broker' },
            { t: 'Securities Commission Malaysia — licensed intermediaries; InvestSmart®: opening a share trading account', tag: 'Perlesenan' },
            { t: 'Securities Industry (Central Depositories) Act 1991 — direct & nominee accounts', tag: 'Direct / nominee' },
            { t: 'Phillip Capital Sdn Bhd — POEMS MY (official website & user guides)', tag: 'Contoh platform' }
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
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 04 — Waktu Dagangan, Lot dan Cara Pesanan Beli/Jual'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
