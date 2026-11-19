/* CMI Equity Series — VIDEO 01: Apa Itu Saham dan Kenapa Syarikat Disenaraikan
 * Source of truth: `en` = English narration (spoken, TTS) · `t` = Bahasa Melayu subtitle (on-screen).
 * All on-screen text is Bahasa Melayu (financial terms kept in English where more precise).
 * Every number is an ILLUSTRATIVE example, not market data.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', DIM = '#5f6e86', SUB = '#9aa8be';

  const EPISODE = {
    id: 'eq01', ...EQ.header(1, 'Saham & IPO'),
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK -------------------------------------------------------- */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'When you buy shares in a company, did you know that you actually own a piece of that business?', t: 'Apabila anda membeli saham sebuah syarikat, adakah anda tahu bahawa anda sebenarnya memiliki sebahagian daripada perniagaan tersebut?' },
          { en: 'Not a product. Not a receipt. A real stake in the business itself.', t: 'Bukan produk. Bukan resit. Tetapi kepentingan sebenar dalam perniagaan itu sendiri.' }
        ],
        build(S, C) {
          // growing company (left)
          const p = S.el('', { x: 150, y: 150, w: 520, h: 470, cls: 'panel' }, { at: S.at(0, -.4) });
          S.el(`<div style="display:flex;gap:14px;align-items:center">${EQ.icon('building', 34)}<div><div style="font:700 26px Inter">Syarikat yang berkembang</div><div class="lbl" style="font-size:14px;margin-top:4px">SYARIKAT ILUSTRASI</div></div></div>`, { x: 32, y: 28, parent: p });
          const sv = S.svg(0, 0, 520, 470); p.appendChild(sv.parentNode); sv.parentNode.style.left = '0px'; sv.parentNode.style.top = '0px';
          const hs = [.22, .34, .45, .62, .8];
          S.anim(t => {
            let o = `<line x1="50" x2="470" y1="420" y2="420" stroke="rgba(148,170,210,.18)"/>`;
            hs.forEach((h, i) => { const q = CMI.ease((t - S.at(0, .3 + i * .35)) / .6); const H = 260 * h * q; o += `<rect x="${70 + i * 82}" y="${420 - H}" width="54" height="${H}" rx="4" fill="${i === 4 ? AMB : '#2a3b5c'}" opacity="${q}"/>`; });
            const q = CMI.ease((t - S.at(0, 2.2)) / .8);
            if (q > 0) o += `<path d="M90 ${370} L${90 + 360 * q} ${370 - 230 * q}" stroke="${BULL}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>`;
            sv.innerHTML = o;
          });
          // dashed connector
          const ln = S.svg(690, 380, 360, 10);
          S.anim(t => { const q = CMI.ease((t - S.at(0, 2.6)) / .8); ln.innerHTML = `<line x1="0" x2="${340 * q}" y1="5" y2="5" stroke="${DIM}" stroke-width="2" stroke-dasharray="6 6"/>`; });
          // ownership pie (right)
          const pp = S.el('', { x: 1080, y: 150, w: 640, h: 470, cls: 'panel' }, { at: S.at(0, 2.4) });
          S.el(`<div class="lbl">PEMILIKAN SYARIKAT · ILUSTRASI</div>`, { x: 28, y: 24, parent: pp });
          EQ.pie(S, 1400, 430, 135, [{ v: 8, c: AMB, label: 'ANDA' }, { v: 30, c: '#243656' }, { v: 22, c: '#2d4268' }, { v: 25, c: '#1d2d4a' }, { v: 15, c: '#34507c' }], S.at(0, 3), { pop: 0, popAt: S.at(1, .2) });
          EQ.chip(S, 'SAHAM = SEBAHAGIAN PEMILIKAN', 1180, 652, AMB, S.at(1, 1.2));
        }
      },
      /* 2 · PENGENALAN -------------------------------------------------- */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we look at what a share is, why companies list on the stock exchange, and what that means for you as an investor.', t: 'Dalam video ini, kita lihat apa itu saham, kenapa syarikat disenaraikan di bursa saham, dan apa maknanya kepada anda sebagai pelabur.' },
          { en: 'First, the meaning of shares, equity and shareholders.', t: 'Pertama, maksud saham, equity dan shareholder.' },
          { en: 'Second, how a company raises capital through an IPO, and why it chooses to list.', t: 'Kedua, bagaimana syarikat memperoleh modal melalui IPO, dan kenapa ia memilih untuk disenaraikan.' },
          { en: 'And third, how investors may earn a return — and the risks that come with it.', t: 'Dan ketiga, bagaimana pelabur boleh memperoleh pulangan — serta risiko yang datang bersamanya.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 01 · MODUL 1 · KENALI PASARAN SAHAM', size: 72,
            title: 'Apa Itu Saham dan Kenapa Syarikat Disenaraikan',
            lead: 'Saham · Equity · Shareholder · IPO · Dividen · Risiko',
            objectives: ['Maksud saham, equity & shareholder', 'IPO & sebab syarikat disenaraikan', 'Pulangan pelabur & risiko asas'],
            ats: [S.at(1), S.at(2), S.at(3)], leadY: 350
          });
          const b = S.el('', { x: 1240, y: 440, w: 580, h: 300, cls: 'panel' }, { at: S.at(0, 1) });
          S.el(`<div style="display:flex;align-items:center;justify-content:space-around;height:300px;padding:0 30px">
            <div style="text-align:center">${EQ.icon('building', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">SYARIKAT</div></div>
            <div style="font:300 46px Inter;color:${AMB}">→</div>
            <div style="text-align:center">${EQ.icon('pie', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">SAHAM</div></div>
            <div style="font:300 46px Inter;color:${AMB}">→</div>
            <div style="text-align:center">${EQ.icon('user', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">PELABUR</div></div></div>`, { x: 0, y: 0, w: 580, parent: b });
        }
      },
      /* 3 · SENARIO: SYARIKAT PERLUKAN MODAL ----------------------------- */
      {
        label: 'MODAL',
        cues: [
          { en: 'Imagine a growing food company. It started with a single outlet, and demand keeps rising.', t: 'Bayangkan sebuah syarikat makanan yang sedang berkembang. Ia bermula dengan satu cawangan, dan permintaan terus meningkat.' },
          { en: 'To open more outlets and build a new central kitchen, it needs capital — more money than the owners have.', t: 'Untuk membuka lebih banyak cawangan dan membina dapur pusat baharu, ia memerlukan modal — lebih daripada apa yang pemiliknya ada.' },
          { en: 'One option is to borrow. A loan has to be repaid, usually with interest.', t: 'Satu pilihan ialah meminjam. Pinjaman perlu dibayar balik, biasanya bersama faedah.' },
          { en: 'Another option is to sell part of the ownership of the company to investors. This is where shares come in.', t: 'Satu lagi pilihan ialah menjual sebahagian pemilikan syarikat kepada pelabur. Di sinilah saham memainkan peranan.' }
        ],
        build(S, C) {
          EQ.heading(S, 'SENARIO · SYARIKAT ILUSTRASI', 'Perniagaan berkembang, modal diperlukan', S.at(0, -.3));
          const p = S.el('', { x: 60, y: 170, w: 780, h: 420, cls: 'panel' }, { at: S.at(0) });
          S.el('<div class="lbl">CAWANGAN</div>', { x: 30, y: 26, parent: p });
          [0, 1, 2, 3].forEach(i => S.el(`<div style="text-align:center">${EQ.icon('store', 64, i === 0 ? AMB : '#9aa8be', 1.5)}<div class="mono" style="font-size:15px;color:${DIM};margin-top:8px">${i === 0 ? 'KINI' : 'RANCANGAN'}</div></div>`,
            { x: 40 + i * 180, y: 80, w: 150, parent: p, style: i ? 'opacity:.9' : '' }, { at: i === 0 ? S.at(0, .4) : S.at(0, 1.6 + i * .4), scale: .15 }));
          const g = S.el(`<div class="lbl" style="margin-bottom:12px">MODAL DIPERLUKAN</div><div style="height:22px;background:#1b2740;border-radius:11px;overflow:hidden;position:relative"><div class="fill" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${AMB}"></div><div style="position:absolute;left:28%;top:-6px;bottom:-6px;border-left:2px dashed #f1f5fb"></div></div>
            <div style="display:flex;justify-content:space-between;margin-top:12px"><span class="mono" style="font-size:16px;color:#c7d0de">DANA PEMILIK</span><span class="mono" style="font-size:16px;color:${AMB}">KEPERLUAN PENGEMBANGAN</span></div>`, { x: 40, y: 270, w: 700, parent: p }, { at: S.at(1) });
          const f = g.querySelector('.fill'); S.anim(t => { f.style.width = (100 * CMI.ease((t - S.at(1, .4)) / 1.6)) + '%'; });
          EQ.card(S, { x: 900, y: 170, w: 450, h: 420, icon: 'loan', t: 'Pinjaman', s: 'HUTANG · DEBT', c: BLUE, top: true, b: '• Perlu dibayar balik<br>• Biasanya bersama faedah<br>• Pemilikan tidak berubah', at: S.at(2) });
          EQ.card(S, { x: 1390, y: 170, w: 470, h: 420, icon: 'pie', t: 'Jual pemilikan', s: 'EKUITI · EQUITY', c: AMB, top: true, b: '• Pelabur menjadi pemilik bersama<br>• Tiada jadual bayar balik<br>• Keuntungan & risiko dikongsi', at: S.at(3) });
          EQ.chip(S, 'DI SINILAH SAHAM BERPERANAN →', 1390, 620, AMB, S.at(3, 2));
        }
      },
      /* 4 · APA ITU SAHAM ----------------------------------------------- */
      {
        label: 'APA ITU SAHAM', hold: .4,
        cues: [
          { en: 'A share is a unit of ownership in a company.', t: 'Saham ialah satu unit pemilikan dalam sesebuah syarikat.' },
          { en: "The company's ownership is divided into many equal units. Each unit is one share.", t: 'Pemilikan syarikat dibahagikan kepada banyak unit yang sama. Setiap unit ialah satu saham.' },
          { en: 'For example, if a company has one million shares and you own ten thousand of them, you own one percent of the company.', t: 'Contohnya, jika syarikat mempunyai satu juta saham dan anda memiliki sepuluh ribu daripadanya, anda memiliki satu peratus syarikat itu.' },
          { en: 'The more shares you hold, the larger your portion of ownership.', t: 'Semakin banyak saham yang anda pegang, semakin besar bahagian pemilikan anda.' }
        ],
        build(S, C) {
          EQ.heading(S, 'DEFINISI · SHARE', 'Saham = satu unit pemilikan', S.at(0, -.3));
          // 10x10 grid = company split into 100 equal blocks (each = 1%)
          const gx = 120, gy = 170, cs = 54, gap = 4, cells = [];
          const box = S.el('', { x: gx - 16, y: gy - 16, w: 10 * (cs + gap) + 28, h: 10 * (cs + gap) + 28, cls: 'panel' }, { at: S.at(0) });
          for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
            const d = S.el('', { x: gx + c * (cs + gap), y: gy + r * (cs + gap), w: cs, h: cs, style: 'border-radius:4px;background:#22324f' });
            cells.push(d);
          }
          S.anim(t => {
            const split = CMI.ease((t - S.at(1, .2)) / 1.2);
            cells.forEach((d, i) => {
              const r = Math.floor(i / 10), c = i % 10, k = (r + c) / 18;
              const q = CMI.ease((t - S.at(0, .2)) / .6);
              d.style.opacity = q; d.style.borderRadius = (4 * split) + 'px';
              d.style.transform = `scale(${1 + (1 - split) * .07})`;
              d.style.background = i === 0 && t >= S.at(2, 1.2) ? AMB : (split > k ? '#2a3d60' : '#22324f');
              d.style.boxShadow = i === 0 && t >= S.at(2, 1.2) ? '0 0 0 3px rgba(232,180,76,.35)' : 'none';
            });
          });
          S.el(`<div class="lbl" style="color:${AMB}">1 BLOK = 1%</div>`, { x: gx, y: gy + 10 * (cs + gap) + 22 }, { at: S.at(2, 1.4) });
          // calculation panel
          const cp = S.el('', { x: 820, y: 170, w: 1040, h: 440, cls: 'panel' }, { at: S.at(2, -.3) });
          S.el('<div class="lbl">CONTOH ILUSTRASI</div>', { x: 36, y: 30, parent: cp });
          const row = (k, v, at, col) => S.el(`<div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid rgba(148,170,210,.08);padding-bottom:16px"><span style="font:400 26px Inter;color:#b9c4d6">${k}</span><span class="mono" style="font:700 34px JBM;color:${col || '#f1f5fb'}">${v}</span></div>`, { x: 36, y: 0, w: 968, parent: cp }, { at });
          row('Jumlah saham syarikat', '1,000,000', S.at(2, .3)).style.top = '86px';
          row('Saham milik anda', '10,000', S.at(2, 1.2)).style.top = '176px';
          row('Bahagian pemilikan', '1%', S.at(2, 2.4), AMB).style.top = '266px';
          S.el(`<div class="mono" style="font-size:19px;color:${SUB}">10,000 ÷ 1,000,000 = 0.01 = 1%</div>`, { x: 36, y: 360, parent: cp }, { at: S.at(2, 3) });
          EQ.chip(S, 'LEBIH BANYAK SAHAM → BAHAGIAN PEMILIKAN LEBIH BESAR', 820, 640, AMB, S.at(3));
        }
      },
      /* 5 · EQUITY & SHAREHOLDER ---------------------------------------- */
      {
        label: 'EQUITY & SHAREHOLDER',
        cues: [
          { en: 'Two terms you will hear often: equity and shareholder.', t: 'Dua istilah yang akan sering anda dengar: equity dan shareholder.' },
          { en: 'A shareholder is simply a person or an institution that owns shares in a company.', t: 'Shareholder, atau pemegang saham, ialah individu atau institusi yang memiliki saham dalam sesebuah syarikat.' },
          { en: "Equity means ownership interest. In accounting terms, it is what is left for the owners after liabilities are subtracted from assets.", t: 'Equity bermaksud kepentingan pemilikan. Dari sudut perakaunan, ia ialah baki untuk pemilik selepas liabiliti ditolak daripada aset.' },
          { en: 'So equity is not the same as the cash a company holds. Cash is only one type of asset.', t: 'Jadi, equity tidak sama dengan jumlah tunai yang dimiliki syarikat. Tunai hanyalah satu jenis aset.' },
          { en: "And in everyday market language, the word 'equities' simply means shares.", t: "Dan dalam bahasa pasaran harian, perkataan 'equities' bermaksud saham." }
        ],
        build(S, C) {
          EQ.heading(S, 'ISTILAH ASAS', 'Shareholder dan equity', S.at(0, -.3));
          EQ.card(S, { x: 60, y: 165, w: 720, h: 200, icon: 'users', t: 'Shareholder', s: 'PEMEGANG SAHAM', b: 'Individu atau institusi yang memiliki saham dalam sesebuah syarikat.', at: S.at(1) });
          EQ.card(S, { x: 60, y: 395, w: 720, h: 200, icon: 'pie', t: 'Equity', s: 'EKUITI · KEPENTINGAN PEMILIKAN', b: 'Baki untuk pemilik selepas liabiliti ditolak daripada aset.', at: S.at(2) });
          EQ.chip(S, "PASARAN: 'EQUITIES' = SAHAM", 60, 625, BLUE, S.at(4));
          // balance-sheet bars
          const p = S.el('', { x: 840, y: 165, w: 1020, h: 430, cls: 'panel' }, { at: S.at(2, .2) });
          S.el('<div class="lbl">KUNCI KIRA-KIRA RINGKAS · ILUSTRASI</div>', { x: 34, y: 28, parent: p });
          const sv = S.svg(0, 0, 1020, 430); p.appendChild(sv.parentNode); sv.parentNode.style.left = '0px'; sv.parentNode.style.top = '0px';
          S.anim(t => {
            const a = CMI.ease((t - S.at(2, .6)) / .7), b = CMI.ease((t - S.at(2, 1.6)) / .7), c = CMI.ease((t - S.at(2, 2.6)) / .7), d = CMI.ease((t - S.at(3, .3)) / .6);
            const X0 = 60, X1 = 960, wA = (X1 - X0) * a;
            let o = '';
            o += `<text x="${X0}" y="104" font-family="JBM" font-size="16" fill="#9aa8be" opacity="${a}">ASET</text>`;
            o += `<rect x="${X0}" y="116" width="${wA}" height="64" rx="6" fill="#2a3d60"/>`;
            if (d > 0) o += `<rect x="${X0}" y="116" width="${(X1 - X0) * .18}" height="64" rx="6" fill="${BLUE}" opacity="${d}"/><text x="${X0 + 14}" y="155" font-family="Inter" font-weight="700" font-size="20" fill="#fff" opacity="${d}">Tunai</text><text x="${X0 + (X1 - X0) * .18 + 14}" y="155" font-family="Inter" font-size="20" fill="#c7d0de" opacity="${d}">Bangunan · peralatan · inventori · lain-lain</text>`;
            const sp = (X1 - X0) * .6;
            o += `<text x="${X0}" y="244" font-family="JBM" font-size="16" fill="#9aa8be" opacity="${b}">LIABILITI</text><rect x="${X0}" y="256" width="${sp * b}" height="64" rx="6" fill="#4a2d3a"/>`;
            if (b > .9) o += `<text x="${X0 + 14}" y="295" font-family="Inter" font-size="20" fill="#f1c6c6">Hutang · pinjaman</text>`;
            o += `<text x="${X0 + sp + 8}" y="244" font-family="JBM" font-size="16" fill="${AMB}" opacity="${c}">EKUITI</text><rect x="${X0 + sp + 8}" y="256" width="${(X1 - X0 - sp - 8) * c}" height="64" rx="6" fill="${AMB}" fill-opacity=".85"/>`;
            if (c > .9) o += `<text x="${X0 + sp + 22}" y="295" font-family="Inter" font-weight="700" font-size="20" fill="#1a1405">Milik pemegang saham</text>`;
            o += `<text x="${X0}" y="380" font-family="JBM" font-weight="700" font-size="22" fill="#f1f5fb" opacity="${c}">Ekuiti = Aset − Liabiliti</text>`;
            sv.innerHTML = o;
          });
          EQ.chip(S, 'EKUITI ≠ TUNAI', 1640, 625, BEAR, S.at(3, .6));
        }
      },
      /* 6 · PEMILIK vs PELANGGAN ---------------------------------------- */
      {
        label: 'PEMILIK VS PELANGGAN',
        cues: [
          { en: 'Owning shares is very different from being a customer.', t: 'Memiliki saham sangat berbeza daripada menjadi pelanggan.' },
          { en: 'A customer pays for a product or a service, and the relationship ends with the purchase.', t: 'Pelanggan membayar untuk produk atau perkhidmatan, dan hubungan itu selesai dengan pembelian.' },
          { en: 'A shareholder owns part of the business, and shares in its progress — and also in its setbacks.', t: 'Pemegang saham memiliki sebahagian perniagaan, dan berkongsi kemajuannya — dan juga kemerosotannya.' },
          { en: 'You can be both: a customer of a company, and at the same time, one of its shareholders.', t: 'Anda boleh menjadi kedua-duanya: pelanggan syarikat, dan pada masa yang sama, salah seorang pemegang sahamnya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERBEZAAN PENTING', 'Pelanggan ≠ pemilik', S.at(0, -.3));
          const mk = (x, ic, t, s, rows, at, col) => {
            const p = EQ.card(S, { x, y: 165, w: 860, h: 440, icon: ic, t, s, c: col, at });
            rows.forEach((r, i) => S.el(`<div style="display:flex;gap:20px;border-top:1px solid rgba(148,170,210,.08);padding-top:14px"><span class="lbl" style="width:220px;flex:none;padding-top:5px">${r[0]}</span><span style="font:400 25px/1.35 Inter;color:#e3e9f2">${r[1]}</span></div>`, { x: 26, y: 110 + i * 100, w: 800, parent: p }, { at: at + .5 + .45 * i, dy: 0, dx: -10 }));
          };
          mk(60, 'cart', 'Pelanggan', 'CUSTOMER', [['APA DIBAYAR', 'Harga produk / perkhidmatan'], ['APA DIPEROLEH', 'Produk atau perkhidmatan itu'], ['SELEPAS BELI', 'Urus niaga selesai']], S.at(1, -.2), BLUE);
          mk(1000, 'pie', 'Pemegang saham', 'SHAREHOLDER', [['APA DIBAYAR', 'Harga saham'], ['APA DIPEROLEH', 'Sebahagian pemilikan syarikat'], ['SELEPAS BELI', 'Turut terkesan oleh prestasi syarikat — naik atau turun']], S.at(2, -.2), AMB);
          EQ.chip(S, 'ANDA BOLEH MENJADI KEDUA-DUANYA', 760, 640, '#c7d0de', S.at(3));
        }
      },
      /* 7 · HAK PEMEGANG SAHAM ------------------------------------------ */
      {
        label: 'HAK PEMEGANG SAHAM', hold: .4,
        cues: [
          { en: 'As an ordinary shareholder, you generally have several basic rights.', t: 'Sebagai pemegang saham biasa, anda secara amnya mempunyai beberapa hak asas.' },
          { en: 'The right to attend and vote at general meetings, such as the Annual General Meeting.', t: 'Hak untuk hadir dan mengundi dalam mesyuarat agung, seperti Mesyuarat Agung Tahunan atau AGM.' },
          { en: 'The right to receive dividends — but only when the company declares them.', t: 'Hak untuk menerima dividen — tetapi hanya apabila syarikat mengisytiharkannya.' },
          { en: 'The right to receive information, such as the annual report and company announcements.', t: 'Hak untuk menerima maklumat, seperti laporan tahunan dan pengumuman syarikat.' },
          { en: 'And if the company is wound up, a claim on whatever remains — only after creditors and other obligations have been paid first.', t: 'Dan jika syarikat dibubarkan, tuntutan ke atas baki aset — hanya selepas pemiutang dan obligasi lain dibayar terlebih dahulu.' },
          { en: "Rights can differ between classes of shares, so always check the company's own documents.", t: 'Hak boleh berbeza mengikut kelas saham, jadi sentiasa semak dokumen syarikat itu sendiri.' }
        ],
        build(S, C) {
          EQ.heading(S, 'ORDINARY SHAREHOLDER', 'Hak asas pemegang saham biasa', S.at(0, -.3));
          const R = [
            ['vote', 'Hadir & mengundi', 'MESYUARAT AGUNG · AGM', 'Mengundi resolusi, termasuk pelantikan pengarah.'],
            ['coins', 'Dividen', 'JIKA DIISYTIHARKAN', 'Diterima hanya apabila syarikat mengisytiharkannya.'],
            ['file', 'Maklumat', 'LAPORAN TAHUNAN · PENGUMUMAN', 'Akses kepada laporan kewangan dan pendedahan syarikat.'],
            ['shield', 'Tuntutan baki aset', 'JIKA SYARIKAT DIBUBARKAN', 'Selepas pemiutang & obligasi lain dibayar dahulu.']
          ];
          R.forEach((r, i) => EQ.card(S, { x: 60 + (i % 2) * 910, y: 160 + Math.floor(i / 2) * 225, w: 880, h: 200, icon: r[0], t: r[1], s: r[2], b: r[3], at: S.at(i + 1, -.1) }));
          EQ.chip(S, 'HAK BOLEH BERBEZA MENGIKUT KELAS SAHAM', 60, 640, BLUE, S.at(5));
        }
      },
      /* 8 · IPO --------------------------------------------------------- */
      {
        label: 'IPO', hold: .5,
        cues: [
          { en: 'So how do shares reach the public? Through an IPO — an Initial Public Offering.', t: 'Jadi, bagaimana saham sampai kepada orang awam? Melalui IPO — Initial Public Offering.' },
          { en: 'An IPO is when a company offers its shares to the public for the first time.', t: 'IPO ialah apabila syarikat menawarkan sahamnya kepada orang awam buat kali pertama.' },
          { en: 'Before that, the company must meet the listing requirements, obtain the necessary approvals, and issue a prospectus that explains its business and risks.', t: 'Sebelum itu, syarikat perlu memenuhi syarat penyenaraian, mendapatkan kelulusan yang diperlukan, dan menerbitkan prospektus yang menerangkan perniagaan serta risikonya.' },
          { en: 'Investors subscribe for the shares. Money raised from new shares goes to the company, to fund its plans.', t: 'Pelabur melanggan saham tersebut. Wang yang dikumpul daripada saham baharu disalurkan kepada syarikat untuk membiayai rancangannya.' },
          { en: 'After listing, the shares are traded on Bursa Malaysia, between investors. This is the secondary market.', t: 'Selepas disenaraikan, saham diniagakan di Bursa Malaysia, antara pelabur. Inilah pasaran sekunder.' },
          { en: 'In the secondary market, when you buy shares from another investor, your money goes to that seller — not to the company.', t: 'Dalam pasaran sekunder, apabila anda membeli saham daripada pelabur lain, wang anda pergi kepada penjual itu — bukan kepada syarikat.' }
        ],
        build(S, C) {
          EQ.heading(S, 'INITIAL PUBLIC OFFERING', 'IPO: menghubungkan syarikat dengan pelabur', S.at(0, -.3));
          S.el('<div class="lbl" style="color:#e8b44c">PASARAN PRIMER · IPO</div>', { x: 60, y: 150 }, { at: S.at(1) });
          S.el('<div class="lbl" style="color:#5b8def">PASARAN SEKUNDER · SELEPAS DISENARAIKAN</div>', { x: 60, y: 470 }, { at: S.at(4, -.2) });
          const N = S.flow([
            { id: 'co', x: 60, y: 185, w: 300, h: 130, t: 'Syarikat persendirian', s: 'PERLUKAN MODAL', at: S.at(1, .1) },
            { id: 'ap', x: 450, y: 185, w: 330, h: 130, t: 'Syarat, kelulusan & prospektus', s: 'SEBELUM IPO', at: S.at(2, .2), fs: 21 },
            { id: 'ipo', x: 870, y: 185, w: 280, h: 130, t: 'IPO', s: 'TAWARAN PERTAMA', c: AMB, at: S.at(1, .8) },
            { id: 'inv', x: 1250, y: 185, w: 280, h: 130, t: 'Pelabur', s: 'MELANGGAN SAHAM', at: S.at(3, .1) },
            { id: 'cap', x: 1600, y: 185, w: 260, h: 130, t: 'Modal → syarikat', s: 'SAHAM BAHARU', c: BULL, at: S.at(3, 1.5) },
            { id: 'bm', x: 60, y: 510, w: 380, h: 130, t: 'Disenaraikan di Bursa Malaysia', c: BLUE, at: S.at(4, .2), fs: 22 },
            { id: 'ia', x: 760, y: 510, w: 280, h: 130, t: 'Pelabur A', s: 'PENJUAL', at: S.at(5, .2) },
            { id: 'ib', x: 1360, y: 510, w: 280, h: 130, t: 'Pelabur B', s: 'PEMBELI', at: S.at(5, .2) }
          ], [
            { f: 'co', to: 'ap', at: S.at(2, .6) }, { f: 'ap', to: 'ipo', at: S.at(2, 1.4) }, { f: 'ipo', to: 'inv', at: S.at(3, .4) },
            { f: 'inv', to: 'cap', at: S.at(3, 1.2), c: BULL }, { f: 'bm', to: 'ia', at: S.at(5, .5), c: BLUE }
          ]);
          // secondary-market exchange: shares one way, money the other
          const sv = S.svg(1040, 540, 320, 80);
          S.anim(t => {
            const q = CMI.ease((t - S.at(5, 1.2)) / .6), m = (t - S.at(5, 1.6)) % 2.4 / 2.4;
            if (q <= 0) { sv.innerHTML = ''; return; }
            sv.innerHTML = `<g opacity="${q}"><line x1="10" x2="310" y1="22" y2="22" stroke="${AMB}" stroke-width="2" stroke-dasharray="6 6"/><text x="160" y="12" text-anchor="middle" font-family="JBM" font-size="15" fill="${AMB}">SAHAM →</text>
              <line x1="10" x2="310" y1="58" y2="58" stroke="${BULL}" stroke-width="2" stroke-dasharray="6 6"/><text x="160" y="80" text-anchor="middle" font-family="JBM" font-size="15" fill="${BULL}">← WANG</text>
              <circle cx="${10 + 300 * m}" cy="22" r="6" fill="${AMB}"/><circle cx="${310 - 300 * m}" cy="58" r="6" fill="${BULL}"/></g>`;
          });
          EQ.chip(S, 'WANG KE PENJUAL · BUKAN KE SYARIKAT', 1360, 668, BEAR, S.at(5, 2.4));
        }
      },
      /* 9 · KENAPA DISENARAIKAN ----------------------------------------- */
      {
        label: 'KENAPA DISENARAIKAN',
        cues: [
          { en: 'Why would a company choose to list on Bursa Malaysia?', t: 'Kenapa syarikat memilih untuk disenaraikan di Bursa Malaysia?' },
          { en: 'The main reason is to raise capital for growth, without taking on more debt.', t: 'Sebab utama ialah untuk mengumpul modal bagi pertumbuhan, tanpa menambah hutang.' },
          { en: "Listing can also raise the company's profile and credibility with customers, partners and lenders.", t: 'Penyenaraian juga boleh meningkatkan profil dan kredibiliti syarikat di mata pelanggan, rakan niaga dan pemberi pinjaman.' },
          { en: 'It can make future fundraising easier, and gives existing shareholders a market where their shares can be bought and sold.', t: 'Ia boleh memudahkan pengumpulan dana pada masa hadapan, dan memberi pemegang saham sedia ada pasaran untuk membeli dan menjual saham mereka.' },
          { en: 'In return, a listed company must follow the listing rules, disclose information regularly and uphold good corporate governance.', t: 'Sebagai balasan, syarikat tersenarai perlu mematuhi peraturan penyenaraian, mendedahkan maklumat secara berkala dan mengamalkan tadbir urus korporat yang baik.' }
        ],
        build(S, C) {
          EQ.heading(S, 'SEBAB PENYENARAIAN', 'Kenapa syarikat disenaraikan di Bursa Malaysia', S.at(0, -.3));
          const R = [
            ['up', 'Modal pertumbuhan', 'TANPA MENAMBAH HUTANG', S.at(1)],
            ['eye', 'Profil & kredibiliti', 'KETERLIHATAN JENAMA', S.at(2)],
            ['coins', 'Akses dana masa hadapan', 'PENGUMPULAN DANA SUSULAN', S.at(3)],
            ['swap', 'Kecairan saham', 'PASARAN UNTUK JUAL BELI', S.at(3, 2.4)]
          ];
          R.forEach((r, i) => EQ.card(S, { x: 60 + i * 455, y: 165, w: 425, h: 200, icon: r[0], t: r[1], s: r[2], top: true, at: r[3] }));
          const p = S.el('', { x: 60, y: 405, w: 1800, h: 200, cls: 'panel' }, { at: S.at(4, -.2) });
          p.style.borderLeft = `3px solid ${BLUE}`;
          S.el(`<div style="display:flex;gap:14px;align-items:center">${EQ.icon('gavel', 30, BLUE)}<div style="font:700 26px Inter">Tanggungjawab syarikat tersenarai</div></div>`, { x: 30, y: 26, parent: p });
          ['Patuhi syarat penyenaraian', 'Pendedahan maklumat berkala', 'Tadbir urus korporat yang baik'].forEach((s, i) =>
            EQ.chip(S, s.toUpperCase(), 30 + i * 470, 110, '#c7d0de', S.at(4, .6 + i * .5), { parent: p }));
        }
      },
      /* 10 · PULANGAN --------------------------------------------------- */
      {
        label: 'PULANGAN', hold: .4,
        cues: [
          { en: 'As a shareholder, there are two main ways you may earn a return.', t: 'Sebagai pemegang saham, terdapat dua cara utama anda mungkin memperoleh pulangan.' },
          { en: 'First, capital appreciation. If the share price rises above your purchase price, the value of your holding increases.', t: 'Pertama, capital appreciation. Jika harga saham naik melebihi harga belian anda, nilai pegangan anda meningkat.' },
          { en: 'But the price can also fall below what you paid. A gain is never certain.', t: 'Tetapi harga juga boleh jatuh di bawah harga belian anda. Keuntungan tidak pernah pasti.' },
          { en: 'Second, dividends: a portion of profit that the company may distribute to its shareholders.', t: 'Kedua, dividen: sebahagian keuntungan yang mungkin diagihkan oleh syarikat kepada pemegang sahamnya.' },
          { en: 'For example, a dividend of five sen per share on one thousand shares works out to fifty ringgit.', t: 'Contohnya, dividen lima sen sesaham bagi seribu unit saham bersamaan lima puluh ringgit.' },
          { en: "Dividends are decided by the company's board of directors. They are not guaranteed, and can be reduced or not paid at all.", t: 'Dividen diputuskan oleh lembaga pengarah syarikat. Ia tidak dijamin, dan boleh dikurangkan atau tidak dibayar langsung.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PULANGAN PELABUR', 'Dua sumber pulangan — kedua-duanya tidak dijamin', S.at(0, -.3));
          // capital appreciation panel
          const p = S.el('', { x: 60, y: 160, w: 900, h: 470, cls: 'panel' }, { at: S.at(1, -.2) });
          S.el(`<div style="display:flex;gap:14px;align-items:center">${EQ.icon('up', 30)}<div><div style="font:700 26px Inter">Capital appreciation</div><div class="lbl" style="font-size:14px;margin-top:4px">KENAIKAN NILAI MODAL · ILUSTRASI</div></div></div>`, { x: 28, y: 24, parent: p });
          const sv = S.svg(0, 0, 900, 470); p.appendChild(sv.parentNode); sv.parentNode.style.left = '0px'; sv.parentNode.style.top = '0px';
          const Y = v => 300 - (v - 1.0) * 600, X0 = 90, XB = 400, X1 = 760;
          const upP = [[XB, 1.0], [470, 1.04], [540, 1.02], [620, 1.10], [690, 1.08], [X1, 1.20]], dnP = [[XB, 1.0], [470, .97], [540, .99], [620, .92], [690, .94], [X1, .85]];
          const path = (pts, q) => { let d = `M${pts[0][0]},${Y(pts[0][1])}`; const n = (pts.length - 1) * q; for (let i = 1; i <= Math.floor(n); i++) d += ` L${pts[i][0]},${Y(pts[i][1])}`; const f = n - Math.floor(n), i = Math.floor(n); if (f > 0 && i + 1 < pts.length) d += ` L${pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f},${Y(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f)}`; return d; };
          S.anim(t => {
            const a = CMI.ease((t - S.at(1, .3)) / .8), u = CMI.ease((t - S.at(1, 1.6)) / 1.6), dn = CMI.ease((t - S.at(2, .2)) / 1.6);
            let o = `<line x1="${X0}" x2="${X1 + 20}" y1="${Y(1)}" y2="${Y(1)}" stroke="#5f6e86" stroke-dasharray="6 6" opacity="${a}"/><text x="${X0}" y="${Y(1) - 12}" font-family="JBM" font-size="16" fill="#9aa8be" opacity="${a}">HARGA BELIAN RM1.00</text>`;
            o += `<circle cx="${XB}" cy="${Y(1)}" r="7" fill="#f1f5fb" opacity="${a}"/>`;
            if (u > 0) o += `<path d="${path(upP, u)}" fill="none" stroke="${BULL}" stroke-width="3.2" stroke-linejoin="round"/>`;
            if (u > .98) o += `<text x="${X1 + 12}" y="${Y(1.2) + 6}" font-family="JBM" font-weight="700" font-size="20" fill="${BULL}">RM1.20</text>`;
            if (dn > 0) o += `<path d="${path(dnP, dn)}" fill="none" stroke="${BEAR}" stroke-width="3.2" stroke-dasharray="9 6" stroke-linejoin="round"/>`;
            if (dn > .98) o += `<text x="${X1 + 12}" y="${Y(.85) + 6}" font-family="JBM" font-weight="700" font-size="20" fill="${BEAR}">RM0.85</text>`;
            o += `<text x="${X0}" y="440" font-family="JBM" font-size="15" fill="#5f6e86" opacity="${a}">HARGA ILUSTRASI · BUKAN DATA SEBENAR</text>`;
            sv.innerHTML = o;
          });
          EQ.chip(S, 'NAIK: NILAI MENINGKAT', 90, 190, BULL, S.at(1, 3), { parent: p, fs: 15 });
          EQ.chip(S, 'TURUN: NILAI MENURUN', 90, 365, BEAR, S.at(2, 1.8), { parent: p, fs: 15 });
          // dividend panel
          const d = S.el('', { x: 1000, y: 160, w: 860, h: 470, cls: 'panel' }, { at: S.at(3, -.2) });
          S.el(`<div style="display:flex;gap:14px;align-items:center">${EQ.icon('coins', 30)}<div><div style="font:700 26px Inter">Dividen</div><div class="lbl" style="font-size:14px;margin-top:4px">AGIHAN KEUNTUNGAN · JIKA DIISYTIHARKAN</div></div></div>`, { x: 28, y: 24, parent: d });
          S.el(`<div class="calc" style="font-size:30px">1,000 unit × RM0.05<br><span class="em">= RM50</span></div>`, { x: 40, y: 130, parent: d }, { at: S.at(4, .3) });
          S.el(`<div class="mono" style="font-size:17px;color:${SUB}">5 sen sesaham · contoh ilustrasi</div>`, { x: 40, y: 260, parent: d }, { at: S.at(4, 1.2) });
          S.el(`<div style="display:flex;gap:12px;align-items:center">${EQ.icon('gavel', 26, BLUE)}<span style="font:400 23px Inter;color:#d6deea">Diputuskan oleh lembaga pengarah</span></div>`, { x: 40, y: 320, parent: d }, { at: S.at(5) });
          EQ.chip(S, 'TIDAK DIJAMIN · BOLEH DIKURANGKAN ATAU TIADA', 40, 385, BEAR, S.at(5, 1.6), { parent: d });
        }
      },
      /* 11 · RISIKO ----------------------------------------------------- */
      {
        label: 'RISIKO', hold: .4,
        cues: [
          { en: 'Every investment carries risk, and shares are no exception.', t: 'Setiap pelaburan mempunyai risiko, dan saham tidak terkecuali.' },
          { en: 'Share prices move every day, and can fall because of company performance, the economy or market sentiment.', t: 'Harga saham bergerak setiap hari, dan boleh jatuh disebabkan prestasi syarikat, ekonomi atau sentimen pasaran.' },
          { en: 'Dividends can be reduced or stopped.', t: 'Dividen boleh dikurangkan atau dihentikan.' },
          { en: 'If a company fails, ordinary shareholders are among the last to be paid, and can lose most or even all of their investment.', t: 'Jika syarikat gagal, pemegang saham biasa antara yang terakhir dibayar, dan boleh kehilangan sebahagian besar atau keseluruhan pelaburan.' },
          { en: 'And shares are not savings deposits. Your capital is not guaranteed.', t: 'Dan saham bukan deposit simpanan. Modal anda tidak dijamin.' }
        ],
        build(S, C) {
          EQ.heading(S, 'RISIKO ASAS', 'Potensi pulangan datang bersama risiko', S.at(0, -.3));
          const R = [
            ['down', 'Harga boleh jatuh', 'RISIKO PASARAN', 'Prestasi syarikat, ekonomi, sentimen.', S.at(1)],
            ['coins', 'Dividen tidak tetap', 'BOLEH DIKURANG / DIHENTIKAN', 'Bergantung pada keuntungan & keputusan syarikat.', S.at(2)],
            ['alert', 'Syarikat gagal', 'PEMEGANG SAHAM DIBAYAR TERAKHIR', 'Boleh kehilangan sebahagian besar atau semua pelaburan.', S.at(3)],
            ['lock', 'Modal tidak dijamin', 'SAHAM ≠ DEPOSIT SIMPANAN', 'Nilai pelaburan boleh berubah setiap hari.', S.at(4)]
          ];
          R.forEach((r, i) => EQ.card(S, { x: 60 + (i % 2) * 910, y: 160 + Math.floor(i / 2) * 225, w: 880, h: 200, icon: r[0], t: r[1], s: r[2], b: r[3], c: BEAR, at: r[4] }));
        }
      },
      /* 12 · RUMUSAN ---------------------------------------------------- */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'A share is a unit of ownership. A shareholder owns part of the business.', t: 'Saham ialah unit pemilikan. Pemegang saham memiliki sebahagian perniagaan.' },
          { en: 'Equity means ownership interest — it is not the same as cash.', t: 'Equity bermaksud kepentingan pemilikan — ia tidak sama dengan tunai.' },
          { en: 'Companies list through an IPO to raise capital, and the shares then trade on Bursa Malaysia.', t: 'Syarikat disenaraikan melalui IPO untuk mengumpul modal, dan saham kemudian diniagakan di Bursa Malaysia.' },
          { en: 'Returns may come from capital appreciation and dividends. Neither is guaranteed.', t: 'Pulangan mungkin datang daripada capital appreciation dan dividen. Kedua-duanya tidak dijamin.' },
          { en: 'In short: buying a share means owning a piece of a real business — with both its potential and its risks.', t: 'Ringkasnya: membeli saham bermaksud memiliki sebahagian perniagaan sebenar — bersama potensi dan risikonya.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Apa Itu Saham — apa yang perlu diingat', [
            'Saham = unit pemilikan dalam syarikat', 'Shareholder = pemilik sebahagian perniagaan', 'Equity = kepentingan pemilikan, bukan tunai',
            'IPO = tawaran saham pertama kepada awam', 'Pulangan: capital appreciation & dividen', 'Tiada pulangan yang dijamin'
          ], [S.at(1), S.at(1, 1.5), S.at(2), S.at(3), S.at(4), S.at(4, 1.8)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Membeli saham = memiliki <span style="color:${AMB}">sebahagian perniagaan sebenar.</span></div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(5) });
        }
      },
      /* 13 · SIRI ------------------------------------------------------- */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'This is the first of eight videos in this series.', t: 'Ini video pertama daripada lapan video dalam siri ini.' },
          { en: 'Next, we look at where these shares are listed: Bursa Malaysia, and its Main, ACE and LEAP Markets.', t: 'Seterusnya, kita lihat di mana saham ini disenaraikan: Bursa Malaysia, serta Pasaran Utama, ACE dan LEAP.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 1, [S.at(0), S.at(1)]); }
      },
      /* 14 · RUJUKAN ---------------------------------------------------- */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [
          { en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }
        ],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'Bursa Malaysia — Listing on Bursa Malaysia (IPO & benefits of listing)', tag: 'IPO · penyenaraian' },
            { t: 'Bursa Malaysia — Main Market & ACE Market Listing Requirements', tag: 'Kewajipan pendedahan' },
            { t: 'Securities Commission Malaysia — InvestSmart®: Shares / Equities basics', tag: 'Saham · risiko' },
            { t: 'Securities Commission Malaysia — Prospectus Guidelines', tag: 'Prospektus IPO' },
            { t: 'Companies Act 2016 (Malaysia) — distributions (dividends) & general meetings', tag: 'Hak pemegang saham' }
          ], S.at(0));
        }
      },
      /* 15 · PENAFIAN --------------------------------------------------- */
      {
        label: 'PENAFIAN', hold: 2.6,
        cues: [
          { en: 'This video is for educational purposes only. It is not investment advice, or a recommendation to buy or sell any securities.', t: 'Video ini untuk tujuan pendidikan sahaja. Ia bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.' },
          { en: 'Capital Market Institute. Understanding Markets. Building Knowledge.', t: 'Capital Market Institute. Understanding Markets. Building Knowledge.' }
        ],
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 02 — Bursa Malaysia: Pasaran Utama, ACE & LEAP'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
