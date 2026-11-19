/* CMI Equity Series — VIDEO 08: Volume: Kenapa Ia Penting?
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 * All prices & volumes ILLUSTRATIVE. Volume = supporting information, never an automatic bullish/bearish signal.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';
  const mk = (wp, seed, ws, noise = .006, wick = .012) => EQ.swingify(EQ.ohlc(EQ.path(wp, seed, noise), ws, wick), wp);
  const vols = (n, seed, base, amp) => { const R = EQ.rng(seed); return Array.from({ length: n }, () => Math.round((base + (R() - .5) * 2 * amp) / 1000) * 1000); };

  // main chart: trend + volume
  const MW = [[0, 2.10], [6, 2.26], [9, 2.19], [15, 2.38], [18, 2.31], [24, 2.48], [27, 2.42], [31, 2.55]];
  const MC = mk(MW, 91, 21); const MV = vols(32, 92, 600000, 200000);
  // four price–volume combinations (8 candles each)
  const up = EQ.ohlc(EQ.path([[0, 2.20], [7, 2.42]], 93, .008), 22, .01), dn = EQ.ohlc(EQ.path([[0, 2.42], [7, 2.20]], 94, .008), 23, .01);
  const rise = [300, 380, 450, 520, 610, 700, 790, 880].map(v => v * 1000), fall = [880, 790, 700, 610, 520, 450, 380, 300].map(v => v * 1000);
  // breakout with volume spike
  const BW = [[0, 2.33], [4, 2.48], [8, 2.33], [12, 2.48], [15, 2.38], [18, 2.47], [20, 2.60], [23, 2.55], [26, 2.66]];
  const BC = mk(BW, 95, 24); BC[19] = [2.47, 2.56, 2.46, 2.55]; BC[20] = [2.55, 2.61, 2.54, 2.60];
  const BV = vols(27, 96, 500000, 120000); BV[19] = 1500000; BV[20] = 1180000;
  // decline with expanding volume, high-volume reversal candle
  const RW = [[0, 2.62], [10, 2.36], [13, 2.30], [14, 2.31], [22, 2.46]];
  const RC = mk(RW, 97, 25); RC[13] = [2.31, 2.33, 2.20, 2.32];
  const RVv = vols(23, 98, 450000, 100000); [9, 10, 11, 12].forEach((i, k) => RVv[i] = 700000 + k * 180000); RVv[13] = 1650000; RVv[14] = 1050000;
  // volume MA / RVOL example
  const AV = vols(26, 99, 500000, 90000); AV[24] = 1500000;

  const EPISODE = {
    id: 'eq08', ...EQ.header(8, 'Volume'),
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'If price shows where the market is moving, what can we learn from the volume behind that move?', t: 'Jika harga menunjukkan ke mana pasaran bergerak, apakah yang boleh kita pelajari daripada volume di sebalik pergerakan tersebut?' },
          { en: 'Two moves can look the same on price — but have very different activity underneath.', t: 'Dua pergerakan boleh kelihatan sama pada harga — tetapi aktiviti di bawahnya sangat berbeza.' }
        ],
        build(S, C) {
          const ch = S.chart({ name: 'eq08-hook', x: 160, y: 120, w: 1600, h: 560, candles: MC, yMin: 2.02, yMax: 2.64, step: .1, dp: 2, slots: 35, vol: MV, title: 'SAHAM A · HARIAN · ILUSTRASI', at: S.at(0, -.2) });
          ch.reveal(31, S.at(0, .3), .1);
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this final video, we look at volume, and why it matters.', t: 'Dalam video terakhir ini, kita lihat volume, dan kenapa ia penting.' },
          { en: 'First, what volume is, and how it differs from value and frequency.', t: 'Pertama, apa itu volume, dan bezanya dengan value dan frequency.' },
          { en: 'Second, the relationship between price and volume, including breakouts and reversals.', t: 'Kedua, hubungan antara harga dan volume, termasuk ketika breakout dan reversal.' },
          { en: 'And third, two simple tools: the volume moving average, and relative volume.', t: 'Dan ketiga, dua alat mudah: volume moving average, dan relative volume.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 08 · MODUL 2 · ASAS MEMBACA CARTA', title: 'Volume: Kenapa Ia Penting?', size: 84,
            lead: 'Volume · Value · Frequency · Harga & volume · Volume MA · RVOL', leadY: 290,
            objectives: ['Maksud volume, value & frequency', 'Hubungan harga & volume', 'Volume MA & relative volume'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const p = S.el('', { x: 1240, y: 400, w: 580, h: 300, cls: 'panel' }, { at: S.at(0, 1) });
          const hs = [60, 90, 70, 120, 100, 180, 140, 230, 160, 110];
          hs.forEach((h, i) => S.el('', { x: 40 + i * 52, y: 260 - h, w: 36, h, parent: p, style: `background:${i === 7 ? AMB : '#2d4268'};border-radius:3px` }, { at: S.at(0, 1.2 + i * .1), dy: 0, scale: .3 }));
        }
      },
      /* 3 · APA ITU VOLUME */
      {
        label: 'VOLUME · VALUE · FREQUENCY', hold: .8,
        cues: [
          { en: 'Volume is the number of shares traded during a period — for example, in one day.', t: 'Volume ialah bilangan saham yang diniagakan dalam satu tempoh — contohnya, dalam satu hari.' },
          { en: 'Imagine three trades in a day: five hundred units, one thousand units, and one thousand five hundred units.', t: 'Bayangkan tiga dagangan dalam sehari: lima ratus unit, seribu unit, dan seribu lima ratus unit.' },
          { en: 'Volume is the total units traded: three thousand units.', t: 'Volume ialah jumlah unit yang diniagakan: tiga ribu unit.' },
          { en: 'Value is the total ringgit amount traded — units multiplied by price — here, three thousand and forty ringgit.', t: 'Value ialah jumlah ringgit yang diniagakan — unit didarab harga — di sini, RM3,040.' },
          { en: 'And frequency is the number of transactions — three trades.', t: 'Dan frequency ialah bilangan transaksi — tiga dagangan.' },
          { en: 'Remember: every trade has a buyer and a seller. Three thousand units traded does not mean three thousand investors.', t: 'Ingat: setiap dagangan mempunyai pembeli dan penjual. Tiga ribu unit diniagakan tidak bermaksud tiga ribu pelabur.' }
        ],
        build(S, C) {
          EQ.heading(S, 'TIGA UKURAN AKTIVITI', 'Volume, value dan frequency', S.at(0, -.3));
          S.table(60, 160, 1000, ['Dagangan', 'Unit', 'Harga (RM)', 'Nilai (RM)'], [
            ['#1', '500', '1.00', '500'], ['#2', '1,000', '1.01', '1,010'], ['#3', '1,500', '1.02', '1,530']
          ], [S.at(1, .3), S.at(1, 1.6), S.at(1, 3)], { colw: ['22%', '26%', '26%', '26%'], fs: 26 });
          S.el(`<div class="mono" style="font-size:16px;color:${DIM}">CONTOH ILUSTRASI · SATU HARI DAGANGAN</div>`, { x: 60, y: 440 }, { at: S.at(1, 3.4) });
          [['VOLUME', '3,000 unit', 'Jumlah unit diniagakan', BULL, S.at(2)], ['VALUE', 'RM3,040', 'Unit × harga', AMB, S.at(3, .4)], ['FREQUENCY', '3', 'Bilangan transaksi', BLUE, S.at(4)]].forEach((r, i) => {
            const d = S.el(`<div class="lbl" style="color:${r[3]}">${r[0]}</div><div class="mono" style="font:700 40px JBM;margin-top:8px">${r[1]}</div><div style="font:400 20px Inter;color:#9aa8be;margin-top:6px">${r[2]}</div>`, { x: 1100, y: 160 + i * 150, w: 760, h: 130, cls: 'card', style: 'padding:18px 26px' }, { at: r[4] });
            d.style.borderLeft = `3px solid ${r[3]}`;
          });
          EQ.chip(S, 'SETIAP DAGANGAN = 1 PEMBELI + 1 PENJUAL · VOLUME ≠ BILANGAN PELABUR', 60, 640, BEAR, S.at(5, .3));
        }
      },
      /* 4 · KENAPA PENTING */
      {
        label: 'KENAPA PENTING', hold: .6,
        cues: [
          { en: 'So why does volume matter?', t: 'Jadi, kenapa volume penting?' },
          { en: 'Price tells us where the market moved. Volume tells us how much trading activity was behind that move.', t: 'Harga memberitahu ke mana pasaran bergerak. Volume memberitahu berapa banyak aktiviti dagangan di sebalik pergerakan itu.' },
          { en: 'On a chart, volume is usually shown as bars below the price, one for each candle.', t: 'Pada carta, volume biasanya dipaparkan sebagai bar di bawah harga, satu bagi setiap candle.' },
          { en: 'Volume is supporting information. It helps us judge how much participation a move has — it is not a signal on its own.', t: 'Volume ialah maklumat sokongan. Ia membantu kita menilai tahap penyertaan dalam sesuatu pergerakan — ia bukan isyarat dengan sendirinya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'HARGA + VOLUME', 'Harga = arah · volume = aktiviti', S.at(0, -.3));
          const ch = S.chart({ name: 'eq08-why', x: 60, y: 160, w: 1800, h: 500, candles: MC, yMin: 2.02, yMax: 2.64, step: .1, dp: 2, slots: 35, vol: MV, title: 'SAHAM A · HARIAN · ILUSTRASI', titleR: ' ', at: S.at(0) });
          ch.reveal(31, S.at(0, .2), .04);
          ch.setTitleR(`<span style="color:${AMB}">HARGA (ATAS) · VOLUME (BAWAH)</span>`, S.at(2, .3));
          EQ.chip(S, 'MAKLUMAT SOKONGAN · BUKAN ISYARAT', 60, 680, AMB, S.at(3, .6));
        }
      },
      /* 5 · EMPAT KOMBINASI */
      {
        label: 'HUBUNGAN HARGA & VOLUME', hold: .8,
        cues: [
          { en: 'Let us look at four common combinations of price and volume.', t: 'Mari lihat empat kombinasi harga dan volume yang biasa.' },
          { en: 'Price rising with increasing volume: the move has growing participation behind it.', t: 'Harga naik dengan volume meningkat: pergerakan itu disokong penyertaan yang semakin bertambah.' },
          { en: 'Price rising with decreasing volume: the rise continues, but with fewer shares changing hands. Momentum may be fading — but this is not automatically bearish.', t: 'Harga naik dengan volume menurun: kenaikan berterusan, tetapi dengan lebih sedikit saham bertukar tangan. Momentum mungkin semakin lemah — tetapi ini tidak semestinya bearish.' },
          { en: 'Price falling with increasing volume: selling activity is becoming more active.', t: 'Harga turun dengan volume meningkat: aktiviti jualan menjadi lebih aktif.' },
          { en: 'Price falling with decreasing volume: the decline is happening with less participation, which may be a quieter pullback.', t: 'Harga turun dengan volume menurun: penurunan berlaku dengan penyertaan yang kurang, yang mungkin pullback yang lebih tenang.' },
          { en: 'These are clues to interpret in context — not fixed rules.', t: 'Ini ialah petunjuk untuk ditafsir mengikut konteks — bukan peraturan tetap.' }
        ],
        build(S, C) {
          EQ.heading(S, 'EMPAT KOMBINASI', 'Harga & volume bersama', S.at(0, -.3));
          const Q = [
            [up, rise, 'HARGA ↑ · VOLUME ↑', 'Penyertaan bertambah', BULL, S.at(1, -.2)],
            [up, fall, 'HARGA ↑ · VOLUME ↓', 'Momentum mungkin lemah', AMB, S.at(2, -.2)],
            [dn, rise, 'HARGA ↓ · VOLUME ↑', 'Jualan lebih aktif', BEAR, S.at(3, -.2)],
            [dn, fall, 'HARGA ↓ · VOLUME ↓', 'Pullback lebih tenang?', BLUE, S.at(4, -.2)]
          ];
          Q.forEach((q, i) => {
            const x = 60 + i * 455;
            const ch = S.chart({ name: 'eq08-q' + i, x, y: 160, w: 425, h: 400, candles: q[0], yMin: 2.14, yMax: 2.48, step: .1, dp: 2, slots: 9, vol: q[1], vmax: 1000000, volFrac: .34, title: q[2], at: q[5] });
            ch.reveal(7, q[5] + .3, .12);
            const d = S.el(`<div style="font:700 22px Inter;color:${q[4]}">${q[3]}</div>`, { x, y: 580, w: 425, h: 64, cls: 'card', style: 'display:flex;align-items:center;padding:0 20px' }, { at: q[5] + 1.4 });
            d.style.borderLeft = `3px solid ${q[4]}`;
          });
          EQ.chip(S, 'PETUNJUK MENGIKUT KONTEKS · BUKAN PERATURAN TETAP', 60, 670, '#c7d0de', S.at(5, .2));
        }
      },
      /* 6 · BREAKOUT */
      {
        label: 'VOLUME KETIKA BREAKOUT', hold: .8,
        cues: [
          { en: 'Volume is often watched during breakouts.', t: 'Volume sering diperhatikan ketika breakout.' },
          { en: 'Here, price breaks above resistance, and volume rises well above its recent levels.', t: 'Di sini, harga menembusi resistance, dan volume meningkat jauh melebihi paras terkininya.' },
          { en: 'Higher volume on a breakout shows that more shares changed hands at the new prices — the break had more participation.', t: 'Volume lebih tinggi ketika breakout menunjukkan lebih banyak saham bertukar tangan pada harga baharu — penembusan itu mempunyai lebih penyertaan.' },
          { en: 'A breakout on unusually low volume deserves more caution. But high volume still does not guarantee that the breakout will hold.', t: 'Breakout dengan volume yang luar biasa rendah perlu lebih berhati-hati. Tetapi volume tinggi tetap tidak menjamin breakout itu akan bertahan.' }
        ],
        build(S, C) {
          EQ.heading(S, 'BREAKOUT', 'Volume ketika breakout', S.at(0, -.3));
          const at = S.at(1, 1);
          const ch = S.chart({ name: 'eq08-bo', x: 60, y: 160, w: 1800, h: 500, candles: BC, yMin: 2.24, yMax: 2.72, step: .1, dp: 2, slots: 30, vol: BV, vmax: 1700000, volFrac: .3, volHL: (i, t) => (i === 19 || i === 20) && t >= at ? AMB : null, title: 'ILUSTRASI', at: S.at(0) });
          ch.zone({ p1: 2.46, p2: 2.50, from: 1, to: 'end', c: BEAR, label: 'RESISTANCE', at: S.at(0, .4) });
          ch.reveal(18, S.at(0, .2), .05); ch.reveal(26, S.at(1, .2), .3);
          ch.candleHL({ i1: 19, i2: 20, p1: 2.45, p2: 2.62, c: AMB, t: 'BREAKOUT', at: S.at(1, 1.4) });
          ch.setTitleR(`<span style="color:${AMB}">VOLUME ≈ 3× PURATA TERKINI</span>`, S.at(2, .3));
          EQ.chip(S, 'VOLUME TINGGI ≠ JAMINAN BREAKOUT BERTAHAN', 60, 680, BEAR, S.at(3, 2.5));
        }
      },
      /* 7 · REVERSAL */
      {
        label: 'VOLUME KETIKA REVERSAL', hold: .8,
        cues: [
          { en: 'Volume can also offer clues near a possible reversal.', t: 'Volume juga boleh memberi petunjuk berhampiran kemungkinan reversal.' },
          { en: 'Here, a decline accelerates, and volume expands.', t: 'Di sini, penurunan semakin laju, dan volume mengembang.' },
          { en: 'Then a candle with a long lower wick forms on very high volume — many shares changed hands as price was pushed down and then recovered.', t: 'Kemudian, satu candle dengan wick bawah yang panjang terbentuk pada volume yang sangat tinggi — banyak saham bertukar tangan ketika harga ditolak turun kemudian pulih.' },
          { en: 'In this illustration, price then turns up. But very high volume can also appear in the middle of a decline that keeps going. Context and confirmation still matter.', t: 'Dalam ilustrasi ini, harga kemudian berpatah naik. Tetapi volume yang sangat tinggi juga boleh muncul di tengah-tengah penurunan yang berterusan. Konteks dan pengesahan tetap penting.' }
        ],
        build(S, C) {
          EQ.heading(S, 'REVERSAL', 'Volume ketika harga berpatah', S.at(0, -.3));
          const at = S.at(2, .6);
          const ch = S.chart({ name: 'eq08-rv', x: 60, y: 160, w: 1800, h: 500, candles: RC, yMin: 2.14, yMax: 2.70, step: .1, dp: 2, slots: 26, vol: RVv, vmax: 1800000, volFrac: .3, volHL: (i, t) => i === 13 && t >= at ? AMB : (i >= 9 && i <= 12 && t >= S.at(1, 1) ? BEAR : null), title: 'ILUSTRASI', at: S.at(0) });
          ch.reveal(8, S.at(0, .2), .06); ch.reveal(12, S.at(1, .3), .3); ch.reveal(13, S.at(2, .3), .1);
          ch.candleHL({ i1: 13, i2: 13, p1: 2.19, p2: 2.34, c: AMB, t: 'WICK PANJANG + VOLUME SANGAT TINGGI', below: true, at: S.at(2, 1) });
          ch.reveal(22, S.at(3, .3), .25);
          EQ.chip(S, 'VOLUME TINGGI JUGA BOLEH BERLAKU DALAM PENURUNAN BERTERUSAN', 60, 680, BEAR, S.at(3, 4));
        }
      },
      /* 8 · VOLUME MA & RVOL */
      {
        label: 'VOLUME MA & RVOL', hold: .8,
        cues: [
          { en: 'How do we know whether volume is high or low? We compare it with its own average.', t: 'Bagaimana kita tahu sama ada volume tinggi atau rendah? Kita bandingkan dengan puratanya sendiri.' },
          { en: 'A volume moving average shows the average volume over a number of recent periods — for example, the last twenty days.', t: 'Volume moving average menunjukkan purata volume bagi beberapa tempoh terkini — contohnya, dua puluh hari lepas.' },
          { en: 'Relative volume, or RVOL, compares current volume with that average.', t: 'Relative volume, atau RVOL, membandingkan volume semasa dengan purata tersebut.' },
          { en: 'For example, if today\'s volume is one point five million units and the average is five hundred thousand, RVOL is three — three times the usual activity.', t: 'Contohnya, jika volume hari ini 1.5 juta unit dan puratanya 500 ribu, RVOL ialah 3 — tiga kali ganda aktiviti biasa.' },
          { en: 'An RVOL above one means busier than usual; below one, quieter than usual.', t: 'RVOL melebihi 1 bermaksud lebih aktif daripada biasa; kurang daripada 1, lebih perlahan daripada biasa.' }
        ],
        build(S, C) {
          EQ.heading(S, 'BANDINGKAN DENGAN PURATA', 'Volume moving average & relative volume', S.at(0, -.3));
          const at = S.at(3, .4);
          const cs = EQ.ohlc(EQ.path([[0, 2.30], [10, 2.36], [18, 2.33], [23, 2.38], [24, 2.47], [25, 2.49]], 100, .008), 26, .012);
          const ch = S.chart({ name: 'eq08-ma', x: 60, y: 160, w: 1100, h: 500, candles: cs, yMin: 2.22, yMax: 2.56, step: .1, dp: 2, slots: 28, vol: AV, vmax: 1700000, volFrac: .45, volMA: 20, volMAat: S.at(1, .6), volHL: (i, t) => i === 24 && t >= at ? AMB : null, title: 'ILUSTRASI · VOLUME MA 20', at: S.at(0) });
          ch.reveal(25, S.at(0, .2), .08);
          const p = S.el('', { x: 1200, y: 160, w: 660, h: 500, cls: 'panel' }, { at: S.at(2, -.2) });
          S.el('<div class="lbl">RELATIVE VOLUME · CONTOH</div>', { x: 30, y: 26, parent: p });
          S.el(`<div class="calc" style="font-size:28px;line-height:1.9">Volume hari ini<br>&nbsp;&nbsp;1,500,000<br>÷ Purata 20 hari sebelumnya<br>&nbsp;&nbsp;500,000<br><span class="em">= RVOL 3.0</span></div>`, { x: 30, y: 70, parent: p }, { at: S.at(3, .4) });
          EQ.chip(S, 'RVOL > 1: LEBIH AKTIF · RVOL < 1: LEBIH PERLAHAN', 30, 430, AMB, S.at(4, .3), { parent: p, fs: 15 });
        }
      },
      /* 9 · SALAH FAHAM */
      {
        label: 'SALAH FAHAM', hold: .6,
        cues: [
          { en: 'Finally, a few common misunderstandings about volume.', t: 'Akhir sekali, beberapa salah faham biasa tentang volume.' },
          { en: 'High volume does not automatically mean bullish. Low volume does not automatically mean bearish.', t: 'Volume tinggi tidak semestinya bermaksud bullish. Volume rendah tidak semestinya bermaksud bearish.' },
          { en: 'Volume is not the number of investors. And it is not automatic proof that buyers or sellers are in control.', t: 'Volume bukan bilangan pelabur. Dan ia bukan bukti automatik bahawa pembeli atau penjual sedang menguasai pasaran.' },
          { en: 'Because every trade has both a buyer and a seller, volume measures activity — and price shows who was more aggressive.', t: 'Oleh kerana setiap dagangan mempunyai pembeli dan penjual, volume mengukur aktiviti — dan harga menunjukkan pihak mana yang lebih agresif.' }
        ],
        build(S, C) {
          EQ.heading(S, 'ELAKKAN SALAH FAHAM', 'Apa yang volume bukan', S.at(0, -.3));
          [['Volume tinggi = bullish', S.at(1, .2)], ['Volume rendah = bearish', S.at(1, 2.6)], ['Volume = bilangan pelabur', S.at(2, .2)], ['Volume = bukti siapa menguasai pasaran', S.at(2, 3)]].forEach((r, i) => {
            const d = S.el(`<div style="display:flex;gap:16px;align-items:center;height:100%"><span style="font:700 34px Inter;color:${BEAR}">✕</span><span style="font:600 27px Inter">${r[0]}</span></div>`, { x: 60 + (i % 2) * 910, y: 170 + Math.floor(i / 2) * 140, w: 880, h: 110, cls: 'card', style: 'padding:0 30px' }, { at: r[1] });
            d.style.borderLeft = `3px solid ${BEAR}`;
          });
          const ok = S.el(`<div style="display:flex;gap:16px;align-items:center;height:100%"><span style="font:700 34px Inter;color:${BULL}">✓</span><span style="font:600 27px Inter">Setiap dagangan = pembeli + penjual · volume mengukur <span style="color:${AMB}">aktiviti</span></span></div>`, { x: 60, y: 470, w: 1790, h: 110, cls: 'card', style: 'padding:0 30px' }, { at: S.at(3) });
          ok.style.borderLeft = `3px solid ${BULL}`;
        }
      },
      /* 10 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'Volume is the number of shares traded. Value is the ringgit amount, and frequency is the number of trades.', t: 'Volume ialah bilangan saham yang diniagakan. Value ialah jumlah ringgit, dan frequency ialah bilangan dagangan.' },
          { en: 'Reading price and volume together shows how much participation is behind a move.', t: 'Membaca harga dan volume bersama menunjukkan tahap penyertaan di sebalik sesuatu pergerakan.' },
          { en: 'Compare volume with its own average, using a volume moving average or relative volume.', t: 'Bandingkan volume dengan puratanya sendiri, menggunakan volume moving average atau relative volume.' },
          { en: 'And volume is supporting information — never an automatic buy or sell signal.', t: 'Dan volume ialah maklumat sokongan — bukan isyarat beli atau jual automatik.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Volume — apa yang perlu diingat', [
            'Volume = unit diniagakan', 'Value = RM · Frequency = bilangan dagangan', 'Baca harga & volume bersama',
            'Bandingkan dengan purata (MA · RVOL)', 'Volume ≠ bilangan pelabur', 'Bukan isyarat automatik'
          ], [S.at(1), S.at(1, 2.5), S.at(2), S.at(3), S.at(4), S.at(4, 1.8)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Harga menunjukkan arah — <span style="color:${AMB}">volume menunjukkan aktiviti.</span></div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(4, 3) });
        }
      },
      /* 11 · SIRI */
      {
        label: 'PENUTUP', hold: .6,
        cues: [
          { en: 'That completes this eight-part introduction to the stock and equity market.', t: 'Itu melengkapkan pengenalan lapan bahagian tentang pasaran saham dan ekuiti.' },
          { en: 'You now have the foundation. The next step is to go deeper — into fundamental and technical analysis.', t: 'Kini anda mempunyai asasnya. Langkah seterusnya ialah mendalami — analisis fundamental dan analisis teknikal.' }
        ],
        build(S, C) {
          EQ.seriesScene(S, C, 8, [S.at(0), S.at(1)]);
          EQ.chip(S, 'SETERUSNYA: ANALISIS FUNDAMENTAL & TEKNIKAL', 1010, 590, BLUE, S.at(1, 2));
        }
      },
      /* 12 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'Bursa Malaysia — market statistics: volume, value & number of trades', tag: 'Volume · value' },
            { t: 'CMT Association — CMT Program curriculum: volume analysis', tag: 'Analisis volume' },
            { t: 'John J. Murphy — Technical Analysis of the Financial Markets (Ch. 7: Volume)', tag: 'Harga & volume' },
            { t: 'Buff Dormeier — Investing with Volume Analysis', tag: 'Volume MA · RVOL' },
            { t: 'Bursa Malaysia — Bursa Academy: introduction to technical analysis', tag: 'Pendidikan pelabur' }
          ], S.at(0));
        }
      },
      /* 13 · PENAFIAN */
      {
        label: 'PENAFIAN', hold: 3,
        cues: [
          { en: 'This video is for educational purposes only. It is not investment advice, or a recommendation to buy or sell any securities.', t: 'Video ini untuk tujuan pendidikan sahaja. Ia bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.' },
          { en: 'Capital Market Institute. Understanding Markets. Building Knowledge.', t: 'Capital Market Institute. Understanding Markets. Building Knowledge.' }
        ],
        build(S, C) { EQ.disclaimerScene(S, C, 'Modul seterusnya — Analisis Fundamental & Analisis Teknikal'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
