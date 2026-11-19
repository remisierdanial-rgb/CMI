/* CMI Equity Series — VIDEO 04: Waktu Dagangan, Lot dan Cara Pesanan Beli/Jual
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 * Trading phases per Bursa Malaysia "Trading Sessions" page (checked Nov 2026) — re-confirm at publication.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';
  // trading-day phases (minutes from 08:00)
  const m = (h, mm) => (h - 8) * 60 + mm;
  const PH = [
    { a: m(8, 30), b: m(9, 0), c: AMB, t: 'Pra-pembukaan', k: 0 },
    { a: m(9, 0), b: m(12, 30), c: BULL, t: 'Dagangan berterusan', k: 1 },
    { a: m(12, 30), b: m(14, 0), c: '#2a3550', t: 'Rehat', k: 2 },
    { a: m(14, 0), b: m(14, 30), c: AMB, t: 'Pra-pembukaan', k: 3 },
    { a: m(14, 30), b: m(16, 45), c: BULL, t: 'Dagangan berterusan', k: 3 },
    { a: m(16, 45), b: m(16, 50), c: POI, t: 'Pra-penutupan', k: 4 },
    { a: m(16, 50), b: m(17, 0), c: BLUE, t: 'Trading at last', k: 5 }
  ];

  const EPISODE = {
    id: 'eq04', ...EQ.header(4, 'Waktu, Lot & Pesanan'),
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'When you tap the BUY button in a share trading app, what actually happens behind the trading system?', t: 'Apabila anda tekan butang BUY dalam aplikasi saham, apa sebenarnya yang berlaku di belakang sistem perdagangan?' },
          { en: 'Is your order filled straight away? At what price? And when do the shares really become yours?', t: 'Adakah pesanan anda terus dipenuhi? Pada harga berapa? Dan bilakah saham itu benar-benar menjadi milik anda?' }
        ],
        build(S, C) {
          const ph = S.el(`<div style="height:100%;display:flex;flex-direction:column;align-items:center;padding:40px 30px">
            <div class="lbl">SAHAM A · ILUSTRASI</div><div class="mono" style="font:700 54px JBM;margin-top:24px">2.50</div>
            <div style="margin-top:auto;width:100%;padding:22px;border-radius:12px;background:${BULL};text-align:center;font:800 34px Inter" class="buy">BUY</div></div>`,
            { x: 200, y: 110, w: 360, h: 600, cls: 'panel', style: 'border-radius:36px;border:2px solid rgba(148,170,210,.25)' }, { at: S.at(0, .2) });
          const btn = ph.querySelector('.buy');
          S.anim(t => { const k = t - S.at(0, 2.4); btn.style.transform = k > 0 && k < .25 ? 'scale(.94)' : 'scale(1)'; btn.style.boxShadow = k > 0 && k < 1.2 ? `0 0 0 ${10 * (1 - k / 1.2)}px rgba(38,166,154,.35)` : 'none'; });
          ['Sistem dagangan', 'Padanan?', 'Harga?', 'Penyelesaian?'].forEach((t, i) => {
            const d = S.el(`<div style="font:700 28px Inter">${t}</div>`, { x: 780 + (i % 2) * 520, y: 190 + Math.floor(i / 2) * 230, w: 460, h: 170, cls: 'card', style: 'display:flex;align-items:center;justify-content:center;text-align:center' }, { at: i === 0 ? S.at(0, 3) : S.at(1, .3 + (i - 1) * 1.1) });
            if (i) d.querySelector('div').style.color = AMB;
          });
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we look at the basic mechanics of trading shares on Bursa Malaysia.', t: 'Dalam video ini, kita lihat mekanisme asas perdagangan saham di Bursa Malaysia.' },
          { en: 'First, trading hours and the phases of a trading day.', t: 'Pertama, waktu dagangan dan fasa dalam satu hari dagangan.' },
          { en: 'Second, board lots, odd lots, and the bid and ask prices in the order book.', t: 'Kedua, board lot, odd lot, serta harga bid dan ask dalam order book.' },
          { en: 'And third, limit and market orders, how orders are matched, and settlement.', t: 'Dan ketiga, limit order dan market order, bagaimana pesanan dipadankan, dan penyelesaian.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 04 · MODUL 1 · KENALI PASARAN SAHAM', title: 'Waktu Dagangan, Lot dan Cara Pesanan Beli/Jual', size: 68,
            lead: 'Sesi dagangan · Board lot · Bid & Ask · Limit & Market order · T+2', leadY: 350,
            objectives: ['Waktu & fasa dagangan Bursa Malaysia', 'Board lot, odd lot, bid & ask', 'Jenis pesanan, padanan & penyelesaian T+2'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const b = S.el('', { x: 1240, y: 440, w: 580, h: 300, cls: 'panel' }, { at: S.at(0, 1) });
          S.el(`<div style="display:flex;align-items:center;justify-content:space-around;height:300px;padding:0 30px">
            <div style="text-align:center">${EQ.icon('target', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">PESANAN</div></div><div style="font:300 46px Inter;color:${AMB}">→</div>
            <div style="text-align:center">${EQ.icon('swap', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">PADANAN</div></div><div style="font:300 46px Inter;color:${AMB}">→</div>
            <div style="text-align:center">${EQ.icon('lock', 56)}<div class="lbl" style="margin-top:16px;color:#9aa8be">T+2</div></div></div>`, { x: 0, y: 0, w: 580, parent: b });
        }
      },
      /* 3 · WAKTU DAGANGAN */
      {
        label: 'WAKTU DAGANGAN', hold: .8,
        cues: [
          { en: "Bursa Malaysia's securities market trades from Monday to Friday, except on market holidays, in two sessions.", t: 'Pasaran sekuriti Bursa Malaysia berdagang dari Isnin hingga Jumaat, kecuali hari cuti pasaran, dalam dua sesi.' },
          { en: 'The morning session begins with a pre-opening phase at eight thirty.', t: 'Sesi pagi bermula dengan fasa pra-pembukaan pada jam 8:30 pagi.' },
          { en: 'At nine o\'clock, the market opens, and continuous trading runs until twelve thirty.', t: 'Pada jam 9:00 pagi, pasaran dibuka, dan dagangan berterusan berjalan hingga 12:30 tengah hari.' },
          { en: 'After the midday break, the afternoon pre-opening starts at two, and continuous trading resumes at two thirty.', t: 'Selepas rehat tengah hari, pra-pembukaan sesi petang bermula jam 2:00, dan dagangan berterusan disambung jam 2:30 petang.' },
          { en: 'At four forty-five, the pre-closing phase begins, and the closing price is set at four fifty.', t: 'Pada jam 4:45 petang, fasa pra-penutupan bermula, dan harga penutup ditentukan pada jam 4:50.' },
          { en: 'Finally, from four fifty to five o\'clock, there is a trading-at-last phase, where trades can only take place at the closing price.', t: 'Akhir sekali, dari 4:50 hingga 5:00 petang, terdapat fasa trading at last, di mana dagangan hanya boleh berlaku pada harga penutup.' },
          { en: 'Trading hours can be changed, so always confirm the current schedule on Bursa Malaysia\'s website.', t: 'Waktu dagangan boleh berubah, jadi sentiasa sahkan jadual terkini di laman web Bursa Malaysia.' }
        ],
        build(S, C) {
          EQ.heading(S, 'WAKTU DAGANGAN · ISNIN–JUMAAT', 'Satu hari dagangan di Bursa Malaysia', S.at(0, -.3));
          S.el(`<div class="lbl" style="color:${AMB}">SESI PAGI</div>`, { x: 120, y: 170 }, { at: S.at(1, -.2) });
          S.el(`<div class="lbl" style="color:${AMB}">SESI PETANG</div>`, { x: 1207, y: 170 }, { at: S.at(3, -.2) });
          const X0 = 120, X1 = 1800, span = m(17, 0) - m(8, 30), X = v => X0 + (v - m(8, 30)) / span * (X1 - X0);
          const sv = S.svg(0, 200, 1920, 420);
          const ticks = [[8, 30], [9, 0], [12, 30], [14, 0], [14, 30], [16, 45], [17, 0]];
          const showAt = k => [S.at(1), S.at(2), S.at(2, 2), S.at(3), S.at(4), S.at(5)][k];
          S.anim(t => {
            let o = `<line x1="${X0}" x2="${X1}" y1="60" y2="60" stroke="rgba(148,170,210,.15)" stroke-width="2"/>`;
            PH.forEach((p, i) => {
              const q = CMI.ease((t - showAt(p.k) - (i === 4 ? 1.6 : 0)) / .7); if (q <= 0) return;
              const x1 = X(p.a), x2 = x1 + (X(p.b) - x1) * q;
              o += `<rect x="${x1}" y="30" width="${Math.max(0, x2 - x1 - 2)}" height="60" rx="5" fill="${p.c}" fill-opacity="${p.k === 2 ? .7 : .85}"/>`;
            });
            ticks.forEach(([h, mm], i) => {
              const v = m(h, mm), a = t >= S.at(0, .5) ? 1 : 0;
              o += `<line x1="${X(v)}" x2="${X(v)}" y1="96" y2="108" stroke="#5f6e86" opacity="${a}"/><text x="${X(v)}" y="134" text-anchor="middle" font-family="JBM" font-size="${v === m(16, 45) ? 15 : 18}" fill="#9aa8be" opacity="${a}" dx="${v === m(16, 45) ? -14 : 0}">${h > 12 ? h - 12 : h}:${String(mm).padStart(2, '0')}</text>`;
            });
            sv.innerHTML = o;
          });
          // legend
          [['Pra-pembukaan', AMB, 'PESANAN DIKUMPUL · TIADA PADANAN', S.at(1, .5)], ['Dagangan berterusan', BULL, 'PESANAN DIPADANKAN', S.at(2, .5)], ['Rehat tengah hari', '#2a3550', '12:30–2:00', S.at(3, .2)], ['Pra-penutupan', POI, '4:45–4:50 · HARGA PENUTUP', S.at(4, .5)], ['Trading at last', BLUE, '4:50–5:00 · HARGA PENUTUP SAHAJA', S.at(5, .5)]].forEach((l, i) =>
            S.el(`<div style="display:flex;gap:12px;align-items:center"><span style="width:18px;height:18px;border-radius:4px;background:${l[1]};flex:none"></span><span style="font:600 22px Inter">${l[0]}</span></div><div class="lbl" style="font-size:13px;margin:6px 0 0 30px">${l[2]}</div>`, { x: 120 + (i % 3) * 570, y: 380 + Math.floor(i / 3) * 90 }, { at: l[3] }));
          EQ.chip(S, 'SAHKAN JADUAL TERKINI DI LAMAN BURSA MALAYSIA', 120, 600, BEAR, S.at(6));
        }
      },
      /* 4 · PRA-PEMBUKAAN */
      {
        label: 'PRA-PEMBUKAAN',
        cues: [
          { en: 'What happens during pre-opening? Buy and sell orders are entered and collected, but they are not matched yet.', t: 'Apa berlaku semasa pra-pembukaan? Pesanan beli dan jual dimasukkan dan dikumpul, tetapi belum dipadankan.' },
          { en: 'When the market opens, the system works out a single opening price based on the orders collected, and matches eligible orders at that price.', t: 'Apabila pasaran dibuka, sistem menentukan satu harga pembukaan berdasarkan pesanan yang dikumpul, dan memadankan pesanan yang layak pada harga itu.' },
          { en: 'The pre-closing works in a similar way, to set the closing price.', t: 'Pra-penutupan berfungsi dengan cara yang sama, untuk menentukan harga penutup.' },
          { en: 'So placing an order during pre-opening does not mean it is filled immediately.', t: 'Jadi, membuat pesanan semasa pra-pembukaan tidak bermaksud ia terus dipenuhi.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PRE-OPENING & PRE-CLOSING', 'Kumpul dahulu, padan kemudian', S.at(0, -.3));
          const box = S.el('', { x: 60, y: 160, w: 860, h: 460, cls: 'panel' }, { at: S.at(0) });
          S.el('<div class="lbl">PESANAN DIKUMPUL · 8:30–9:00</div>', { x: 30, y: 26, parent: box });
          const ords = [['B', 2.48, 20], ['S', 2.51, 15], ['B', 2.50, 35], ['S', 2.49, 25], ['B', 2.51, 10], ['S', 2.50, 30], ['B', 2.49, 15], ['S', 2.52, 20]];
          ords.forEach((o, i) => S.el(`<span class="chip" style="color:${o[0] === 'B' ? BULL : BEAR};border-color:${o[0] === 'B' ? BULL : BEAR}88">${o[0] === 'B' ? 'BELI' : 'JUAL'} ${o[1].toFixed(2)} · ${o[2]} lot</span>`, { x: 30 + (i % 2) * 400, y: 90 + Math.floor(i / 2) * 82, parent: box }, { at: S.at(0, .6 + i * .3), scale: .1 }));
          const r = S.el('', { x: 1000, y: 160, w: 860, h: 460, cls: 'panel' }, { at: S.at(1, -.2) });
          S.el('<div class="lbl">9:00 · HARGA PEMBUKAAN</div>', { x: 30, y: 26, parent: r });
          S.el(`<div style="text-align:center"><div class="mono" style="font:700 96px JBM;color:${AMB}">2.50</div><div style="font:400 24px Inter;color:#9aa8be;margin-top:10px">Satu harga pembukaan · contoh ilustrasi</div></div>`, { x: 0, y: 130, w: 860, parent: r }, { at: S.at(1, 1.2), scale: .2 });
          EQ.chip(S, 'PESANAN LAYAK DIPADANKAN PADA HARGA INI', 160, 360, BULL, S.at(1, 3), { parent: r });
          EQ.chip(S, 'PRA-PEMBUKAAN ≠ TERUS DIPENUHI', 60, 650, BEAR, S.at(3));
        }
      },
      /* 5 · LOT */
      {
        label: 'BOARD LOT & ODD LOT', hold: .5,
        cues: [
          { en: 'On Bursa Malaysia, shares are traded in board lots. One board lot equals one hundred units.', t: 'Di Bursa Malaysia, saham diniagakan dalam board lot. Satu board lot bersamaan seratus unit.' },
          { en: 'So buying ten lots means buying one thousand units.', t: 'Jadi, membeli sepuluh lot bermaksud membeli seribu unit.' },
          { en: 'For example, one thousand units at two ringgit fifty sen per share costs two thousand five hundred ringgit — before brokerage and other fees.', t: 'Contohnya, seribu unit pada harga RM2.50 sesaham berharga RM2,500 — sebelum brokerage dan fi lain.' },
          { en: 'An odd lot is a quantity of less than one board lot — for example, thirty-five units.', t: 'Odd lot ialah kuantiti kurang daripada satu board lot — contohnya, tiga puluh lima unit.' },
          { en: 'Odd lots are traded separately from board lots, and usually have fewer buyers and sellers.', t: 'Odd lot diniagakan secara berasingan daripada board lot, dan biasanya mempunyai lebih sedikit pembeli dan penjual.' }
        ],
        build(S, C) {
          EQ.heading(S, 'UNIT DAGANGAN', '1 board lot = 100 unit', S.at(0, -.3));
          const p = S.el('', { x: 60, y: 160, w: 1000, h: 470, cls: 'panel' }, { at: S.at(0, .2) });
          S.el('<div class="lbl">10 LOT = 1,000 UNIT</div>', { x: 30, y: 26, parent: p });
          for (let i = 0; i < 10; i++) {
            const b = S.el(`<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:2px;width:100%;height:100%">${'<span style="background:#2d4268;border-radius:1px"></span>'.repeat(100)}</div>`, { x: 30 + (i % 5) * 188, y: 80 + Math.floor(i / 5) * 190, w: 170, h: 150, parent: p }, { at: i === 0 ? S.at(0, .6) : S.at(1, .2 + i * .15), scale: .2 });
            if (i === 0) { b.style.outline = `2px solid ${AMB}`; b.style.outlineOffset = '4px'; }
            S.el(`<div class="mono" style="font-size:15px;color:${DIM};text-align:center">LOT ${i + 1}</div>`, { x: 30 + (i % 5) * 188, y: 236 + Math.floor(i / 5) * 190, w: 170, parent: p }, { at: i === 0 ? S.at(0, 1) : S.at(1, .4 + i * .15) });
          }
          const c = S.el('', { x: 1100, y: 160, w: 760, h: 250, cls: 'panel' }, { at: S.at(2, -.2) });
          S.el('<div class="lbl">KOS · CONTOH ILUSTRASI</div>', { x: 30, y: 26, parent: c });
          S.el(`<div class="calc" style="font-size:30px">1,000 unit × RM2.50<br><span class="em">= RM2,500</span></div>`, { x: 30, y: 70, parent: c }, { at: S.at(2, .6) });
          S.el(`<div class="mono" style="font-size:16px;color:#9aa8be">+ brokerage, fi & duti (berbeza ikut broker)</div>`, { x: 30, y: 200, parent: c }, { at: S.at(2, 3) });
          const o = S.el('', { x: 1100, y: 440, w: 760, h: 190, cls: 'panel' }, { at: S.at(3, -.2) });
          o.style.borderLeft = `3px solid ${POI}`;
          S.el(`<div style="display:flex;gap:18px;align-items:center"><div style="display:grid;grid-template-columns:repeat(10,10px);gap:2px">${'<span style="width:10px;height:10px;background:#8b7cf6;border-radius:1px"></span>'.repeat(35)}</div><div><div style="font:700 26px Inter">Odd lot · contoh 35 unit</div><div class="lbl" style="margin-top:6px">KURANG DARIPADA 100 UNIT</div></div></div>`, { x: 30, y: 30, parent: o });
          EQ.chip(S, 'DIDAGANGKAN BERASINGAN · KECAIRAN LEBIH RENDAH', 30, 130, POI, S.at(4, .4), { parent: o });
        }
      },
      /* 6 · ORDER BOOK: BID & ASK */
      {
        label: 'BID & ASK', hold: .6,
        cues: [
          { en: 'To trade, you place an order: a buy order to purchase shares, or a sell order to sell them.', t: 'Untuk berdagang, anda membuat pesanan: pesanan beli untuk membeli saham, atau pesanan jual untuk menjualnya.' },
          { en: 'Orders waiting to be matched are shown in the order book.', t: 'Pesanan yang menunggu padanan dipaparkan dalam order book.' },
          { en: 'The bid side shows the prices buyers are willing to pay. The best bid is the highest one.', t: 'Bahagian bid menunjukkan harga yang sanggup dibayar oleh pembeli. Bid terbaik ialah yang tertinggi.' },
          { en: 'The ask side — also called the offer — shows the prices sellers are willing to accept. The best ask is the lowest one.', t: 'Bahagian ask — juga dipanggil offer — menunjukkan harga yang sanggup diterima oleh penjual. Ask terbaik ialah yang terendah.' },
          { en: 'The gap between the best bid and the best ask is called the spread. Quantities are usually shown in lots.', t: 'Jurang antara bid terbaik dan ask terbaik dipanggil spread. Kuantiti biasanya dipaparkan dalam lot.' }
        ],
        build(S, C) {
          EQ.heading(S, 'ORDER BOOK', 'Bid = pembeli · Ask = penjual', S.at(0, -.3));
          const bk = S.el('', { x: 60, y: 160, w: 1100, h: 470, cls: 'panel' }, { at: S.at(1, -.2) });
          S.el('<div class="lbl">SAHAM A · ORDER BOOK · ILUSTRASI</div>', { x: 30, y: 24, parent: bk });
          const bids = [[2.49, 520], [2.48, 860], [2.47, 1340]], asks = [[2.50, 310], [2.51, 640], [2.52, 900]];
          S.el(`<div style="display:flex;justify-content:space-between;width:1040px"><span class="lbl" style="color:${BULL};width:500px">BID · PEMBELI &nbsp;(LOT · HARGA)</span><span class="lbl" style="color:${BEAR};width:500px;text-align:right">ASK · PENJUAL &nbsp;(HARGA · LOT)</span></div>`, { x: 30, y: 74, parent: bk }, { at: S.at(1, .4) });
          bids.forEach((b, i) => { const d = S.el(`<div style="display:flex;justify-content:space-between;padding:0 20px;align-items:center;height:100%"><span class="mono" style="font-size:26px;color:#c7d0de">${b[1].toLocaleString('en-US')}</span><span class="mono" style="font:700 30px JBM;color:${BULL}">${b[0].toFixed(2)}</span></div>`, { x: 30, y: 120 + i * 92, w: 500, h: 76, cls: 'card', style: 'padding:0', parent: bk }, { at: S.at(2, .3 + i * .3), dx: -14, dy: 0 }); if (!i) S.hl(d, S.at(2, 2.4), undefined, 'rgba(38,166,154,.7)'); });
          asks.forEach((a, i) => { const d = S.el(`<div style="display:flex;justify-content:space-between;padding:0 20px;align-items:center;height:100%"><span class="mono" style="font:700 30px JBM;color:${BEAR}">${a[0].toFixed(2)}</span><span class="mono" style="font-size:26px;color:#c7d0de">${a[1].toLocaleString('en-US')}</span></div>`, { x: 570, y: 120 + i * 92, w: 500, h: 76, cls: 'card', style: 'padding:0', parent: bk }, { at: S.at(3, .3 + i * .3), dx: 14, dy: 0 }); if (!i) S.hl(d, S.at(3, 3), undefined, 'rgba(239,83,80,.7)'); });
          EQ.chip(S, 'KUANTITI DALAM LOT · 1 LOT = 100 UNIT', 30, 410, DIM, S.at(4, 2.5), { parent: bk });
          const r = S.el('', { x: 1200, y: 160, w: 660, h: 470, cls: 'panel' }, { at: S.at(2, -.2) });
          S.el(`<div class="lbl">HARGA TERBAIK</div>
            <div style="display:flex;justify-content:space-between;margin-top:30px"><span style="font:600 26px Inter;color:${BULL}">Bid terbaik</span><span class="mono" style="font:700 30px JBM">2.49</span></div>
            <div style="font:400 20px Inter;color:#9aa8be;margin-top:6px">Harga tertinggi yang sanggup dibayar pembeli</div>
            <div style="display:flex;justify-content:space-between;margin-top:30px"><span style="font:600 26px Inter;color:${BEAR}">Ask terbaik</span><span class="mono" style="font:700 30px JBM">2.50</span></div>
            <div style="font:400 20px Inter;color:#9aa8be;margin-top:6px">Harga terendah yang sanggup diterima penjual</div>`, { x: 30, y: 26, w: 600, parent: r }, { at: S.at(2, 2.2) });
          S.el(`<div style="display:flex;justify-content:space-between;border-top:1px solid rgba(148,170,210,.12);padding-top:18px"><span style="font:700 26px Inter;color:${AMB}">Spread</span><span class="mono" style="font:700 30px JBM;color:${AMB}">0.01</span></div>`, { x: 30, y: 370, w: 600, parent: r }, { at: S.at(4, .4) });
        }
      },
      /* 7 · LIMIT vs MARKET */
      {
        label: 'LIMIT & MARKET ORDER', hold: .5,
        cues: [
          { en: 'There are two basic types of order you should know.', t: 'Terdapat dua jenis pesanan asas yang perlu anda tahu.' },
          { en: 'A limit order lets you set your price. A buy limit order is only executed at your price or lower; a sell limit order, at your price or higher.', t: 'Limit order membolehkan anda menetapkan harga. Limit order beli hanya dilaksanakan pada harga anda atau lebih rendah; limit order jual, pada harga anda atau lebih tinggi.' },
          { en: 'If no one is willing to trade at your price, the order simply waits in the queue — and may not be matched at all.', t: 'Jika tiada siapa sanggup berdagang pada harga anda, pesanan itu hanya menunggu dalam barisan — dan mungkin tidak dipadankan langsung.' },
          { en: 'A market order is executed against the best available prices in the order book.', t: 'Market order dilaksanakan berdasarkan harga terbaik yang tersedia dalam order book.' },
          { en: 'It prioritises speed, but it does not guarantee the last price you saw on screen — especially when prices move fast or there are few orders in the queue.', t: 'Ia mengutamakan kepantasan, tetapi tidak menjamin harga terakhir yang anda lihat di skrin — terutamanya apabila harga bergerak pantas atau pesanan dalam barisan sedikit.' },
          { en: 'The order types available can also differ between brokers.', t: 'Jenis pesanan yang tersedia juga boleh berbeza antara broker.' }
        ],
        build(S, C) {
          EQ.heading(S, 'JENIS PESANAN', 'Limit order berbanding market order', S.at(0, -.3));
          EQ.card(S, { x: 60, y: 160, w: 880, h: 470, icon: 'target', t: 'Limit order', s: 'ANDA TETAPKAN HARGA', top: true, fs: 30, bs: 24, at: S.at(1, -.2),
            b: `<div style="margin-top:6px">• Beli: pada harga anda <b style="color:#f1f5fb">atau lebih rendah</b><br>• Jual: pada harga anda <b style="color:#f1f5fb">atau lebih tinggi</b></div>` });
          EQ.chip(S, 'KAWAL HARGA', 90, 420, BULL, S.at(1, 4));
          EQ.chip(S, 'MUNGKIN TIDAK DIPADANKAN', 90, 480, BEAR, S.at(2, .8));
          EQ.card(S, { x: 980, y: 160, w: 880, h: 470, icon: 'swap', t: 'Market order', s: 'IKUT HARGA TERBAIK SEDIA ADA', c: BLUE, top: true, fs: 30, bs: 24, at: S.at(3, -.2),
            b: '<div style="margin-top:6px">• Dipadankan dengan harga terbaik dalam order book<br>• Mengutamakan kepantasan</div>' });
          EQ.chip(S, 'TIDAK JAMIN HARGA TERAKHIR DI SKRIN', 1010, 420, BEAR, S.at(4, 1.5));
          EQ.chip(S, 'JENIS PESANAN BERBEZA IKUT BROKER', 760, 660, '#c7d0de', S.at(5));
        }
      },
      /* 8 · PADANAN */
      {
        label: 'PADANAN PESANAN', hold: .8,
        cues: [
          { en: 'So how are orders matched? By price first, then by time.', t: 'Jadi, bagaimana pesanan dipadankan? Berdasarkan harga dahulu, kemudian masa.' },
          { en: 'Better prices are matched first. At the same price, the order that arrived earlier is matched first.', t: 'Harga yang lebih baik dipadankan dahulu. Pada harga yang sama, pesanan yang tiba lebih awal dipadankan dahulu.' },
          { en: 'Say you place a buy limit order for one hundred and fifty lots at two ringgit fifty.', t: 'Katakan anda membuat limit order beli sebanyak 150 lot pada harga RM2.50.' },
          { en: 'It matches the earliest seller at that price first — one hundred lots — and then fifty lots from the next seller in the queue.', t: 'Ia dipadankan dengan penjual terawal pada harga itu dahulu — 100 lot — kemudian 50 lot daripada penjual seterusnya dalam barisan.' },
          { en: 'A trade happens when a buyer and a seller agree on the same price. And an order can be matched in full, in part, or not at all.', t: 'Dagangan berlaku apabila pembeli dan penjual bersetuju pada harga yang sama. Dan pesanan boleh dipadankan sepenuhnya, sebahagian, atau tidak langsung.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PRICE · TIME PRIORITY', 'Harga dahulu, kemudian masa', S.at(0, -.3));
          const q = S.el('', { x: 60, y: 160, w: 1100, h: 470, cls: 'panel' }, { at: S.at(1, -.2) });
          S.el(`<div class="lbl" style="color:${BEAR}">BARISAN ASK · RM2.50 · ILUSTRASI</div>`, { x: 30, y: 24, parent: q });
          const sel = [['Penjual X', '9:01:05', 100], ['Penjual Y', '9:02:40', 210]];
          const rows = sel.map((s, i) => S.el(`<div style="display:flex;align-items:center;height:100%;padding:0 24px;gap:30px"><span style="font:700 26px Inter;width:200px">${s[0]}</span><span class="mono" style="font-size:20px;color:#9aa8be;width:200px">${s[1]}</span><span class="mono rem" style="font:700 28px JBM;color:${BEAR};margin-left:auto">${s[2]} lot</span></div>`, { x: 30, y: 80 + i * 110, w: 1040, h: 90, cls: 'card', style: 'padding:0', parent: q }, { at: S.at(1, .4 + i * .4), dx: 14, dy: 0 }));
          S.el(`<div class="mono" style="font-size:16px;color:${DIM}">↑ TIBA LEBIH AWAL = DIPADANKAN DAHULU</div>`, { x: 30, y: 310, parent: q }, { at: S.at(1, 2.6) });
          const buy = S.el(`<div style="display:flex;align-items:center;height:100%;padding:0 24px;gap:20px"><span style="font:700 26px Inter;color:${BULL}">Anda · BELI</span><span class="mono" style="font:700 28px JBM">150 lot @ 2.50</span></div>`, { x: 1200, y: 240, w: 660, h: 90, cls: 'card', style: `padding:0;border-color:${BULL}` }, { at: S.at(2, .3), dx: 30, dy: 0 });
          const fill = S.el('', { x: 1200, y: 360, w: 660, h: 270, cls: 'panel' }, { at: S.at(3, -.1) });
          S.el(`<div class="lbl">KEPUTUSAN PADANAN</div><div class="mono" style="font-size:24px;line-height:2;margin-top:12px">100 lot ← Penjual X<br>&nbsp;50 lot ← Penjual Y<br><span style="color:${BULL}">= 150 lot dipenuhi @ 2.50</span></div>`, { x: 30, y: 24, parent: fill }, { at: S.at(3, 2.4) });
          const r0 = rows[0].querySelector('.rem'), r1 = rows[1].querySelector('.rem');
          S.anim(t => {
            const a = CMI.ease((t - S.at(3, .5)) / .8), b = CMI.ease((t - S.at(3, 1.6)) / .8);
            r0.textContent = Math.round(100 * (1 - a)) + ' lot'; rows[0].style.opacity = a >= 1 ? .35 : 1;
            r1.textContent = Math.round(210 - 50 * b) + ' lot';
          });
          EQ.chip(S, 'PENUH · SEBAHAGIAN · ATAU TIDAK DIPADANKAN', 60, 660, AMB, S.at(4, 2));
        }
      },
      /* 9 · T+2 */
      {
        label: 'PENYELESAIAN T+2', hold: .8,
        cues: [
          { en: 'Once your order is matched, the trade is done — but settlement is not instant.', t: 'Setelah pesanan anda dipadankan, dagangan berlaku — tetapi penyelesaian tidak berlaku serta-merta.' },
          { en: 'Bursa Malaysia uses a T plus two settlement cycle. Settlement takes place two market days after the trade date, T.', t: 'Bursa Malaysia menggunakan kitaran penyelesaian T+2. Penyelesaian berlaku dua hari pasaran selepas tarikh dagangan, T.' },
          { en: 'On settlement, the buyer pays for the shares, and the shares are credited into the buyer\'s CDS account. The seller receives the money.', t: 'Semasa penyelesaian, pembeli membayar saham, dan saham dikreditkan ke akaun CDS pembeli. Penjual menerima wang.' },
          { en: 'For example, a trade on Monday normally settles on Wednesday — as long as both are market days.', t: 'Contohnya, dagangan pada hari Isnin biasanya diselesaikan pada hari Rabu — selagi kedua-duanya hari pasaran.' },
          { en: 'Public holidays push settlement further out. And payment deadlines are set by your broker, so always check.', t: 'Cuti umum akan melambatkan tarikh penyelesaian. Dan tarikh akhir bayaran ditetapkan oleh broker anda, jadi sentiasa semak.' }
        ],
        build(S, C) {
          EQ.heading(S, 'SETTLEMENT', 'T+2: dagangan hari ini, selesai dua hari pasaran kemudian', S.at(0, -.3));
          const days = [['T', 'ISNIN', 'Pesanan dipadankan', BULL], ['T+1', 'SELASA', 'Proses penjelasan', DIM], ['T+2', 'RABU', 'Penyelesaian', AMB]];
          days.forEach((d, i) => {
            const c = S.el(`<div style="font:800 54px JBM;color:${d[3]}">${d[0]}</div><div class="lbl" style="margin-top:6px">${d[1]} · CONTOH</div><div style="font:600 25px Inter;margin-top:20px">${d[2]}</div>`, { x: 60 + i * 610, y: 165, w: 560, h: 220, cls: 'card' }, { at: i === 0 ? S.at(1, .2) : i === 1 ? S.at(1, 2) : S.at(1, 3.4) });
            c.style.borderTop = `3px solid ${d[3]}`;
            if (i < 2) S.el(`<div style="font:700 34px Inter;color:${DIM}">→</div>`, { x: 60 + i * 610 + 567, y: 248 }, { at: S.at(1, 1.6 + i * 1.5), dy: 0 });
          });
          S.flow([
            { id: 'p', x: 60, y: 450, w: 420, h: 120, t: 'Pembeli membayar', s: 'MENGIKUT TARIKH AKHIR BROKER', at: S.at(2, .2) },
            { id: 'c', x: 560, y: 450, w: 420, h: 120, t: 'Saham → akaun CDS pembeli', c: BULL, at: S.at(2, 2.4) },
            { id: 's', x: 1060, y: 450, w: 420, h: 120, t: 'Penjual menerima wang', at: S.at(2, 4.6) }
          ], [{ f: 'p', to: 'c', at: S.at(2, 2), c: BULL }, { f: 'c', to: 's', at: S.at(2, 4.2) }]);
          EQ.chip(S, 'CUTI UMUM MELAMBATKAN PENYELESAIAN', 1530, 470, BEAR, S.at(4, .3), { w: 330 });
        }
      },
      /* 10 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'Bursa trades in a morning and an afternoon session, with pre-opening, pre-closing and trading-at-last phases.', t: 'Bursa berdagang dalam sesi pagi dan petang, dengan fasa pra-pembukaan, pra-penutupan dan trading at last.' },
          { en: 'One board lot is one hundred units. Less than that is an odd lot.', t: 'Satu board lot ialah seratus unit. Kurang daripada itu ialah odd lot.' },
          { en: 'Bid is what buyers will pay; ask is what sellers will accept. Orders are matched by price, then time.', t: 'Bid ialah harga yang sanggup dibayar pembeli; ask ialah harga yang sanggup diterima penjual. Pesanan dipadankan mengikut harga, kemudian masa.' },
          { en: 'A limit order controls price but may not fill. A market order is fast but not price-guaranteed. And settlement happens on T plus two.', t: 'Limit order mengawal harga tetapi mungkin tidak dipenuhi. Market order pantas tetapi harganya tidak dijamin. Dan penyelesaian berlaku pada T+2.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Mekanisme dagangan — apa yang perlu diingat', [
            'Dua sesi + fasa pra-pembukaan & penutupan', '1 board lot = 100 unit', 'Odd lot = kurang 100 unit',
            'Bid = pembeli · Ask = penjual', 'Padanan: harga dahulu, kemudian masa', 'Penyelesaian: T+2'
          ], [S.at(1), S.at(2), S.at(2, 2), S.at(3), S.at(3, 3), S.at(4, 4)]);
          S.el(`<div class="statement" style="font-size:38px;text-align:center">Tekan BUY = <span style="color:${AMB}">pesanan masuk barisan</span>, bukan pembelian serta-merta.</div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(4, 6) });
        }
      },
      /* 11 · SIRI */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'That completes Module One: how the stock market works.', t: 'Itu melengkapkan Modul 1: bagaimana pasaran saham berfungsi.' },
          { en: 'In Module Two, we start reading price charts — beginning with the candlestick.', t: 'Dalam Modul 2, kita mula membaca carta harga — bermula dengan candlestick.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 4, [S.at(0), S.at(1)]); }
      },
      /* 12 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'Bursa Malaysia — Trading Sessions (Equities)', tag: 'Waktu dagangan' },
            { t: 'Bursa Malaysia — Participating Organisations\' Trading Manual (order types, matching)', tag: 'Pesanan & padanan' },
            { t: 'Bursa Malaysia — Rules of Bursa Malaysia Securities (board lot, odd lot)', tag: 'Lot' },
            { t: 'Bursa Malaysia — T+2 Settlement (Rules of Bursa Malaysia Securities Clearing)', tag: 'Penyelesaian' },
            { t: 'Securities Commission Malaysia — InvestSmart®: placing orders & settlement', tag: 'Pendidikan pelabur' }
          ], S.at(0));
        }
      },
      /* 13 · PENAFIAN */
      {
        label: 'PENAFIAN', hold: 2.6,
        cues: [
          { en: 'This video is for educational purposes only. It is not investment advice, or a recommendation to buy or sell any securities.', t: 'Video ini untuk tujuan pendidikan sahaja. Ia bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.' },
          { en: 'Capital Market Institute. Understanding Markets. Building Knowledge.', t: 'Capital Market Institute. Understanding Markets. Building Knowledge.' }
        ],
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 05 — Membaca Candlestick'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
