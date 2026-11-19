/* CMI Equity Series — VIDEO 06: Trend Naik, Turun dan Mendatar
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 * All charts are ILLUSTRATIVE (generated, valid OHLC). Trend = observation of structure, not a forecast.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';

  const UPW = [[0, 2.00], [5, 2.20], [8, 2.10], [13, 2.34], [16, 2.22], [21, 2.48], [24, 2.36], [29, 2.62]];
  const DNW = UPW.map(([i, p]) => [i, +(4.62 - p).toFixed(2)]);              // mirror → LH / LL
  const RGW = [[0, 2.32], [4, 2.49], [8, 2.31], [12, 2.48], [16, 2.32], [20, 2.50], [24, 2.31], [29, 2.42]];
  const UP = EQ.swingify(EQ.ohlc(EQ.path(UPW, 61, .006), 3, .012), UPW);
  const DN = EQ.swingify(EQ.ohlc(EQ.path(DNW, 62, .006), 4, .012), DNW);
  const RG = EQ.swingify(EQ.ohlc(EQ.path(RGW, 63, .006), 5, .012), RGW);
  // retracement then reversal
  const RVW = [[0, 2.00], [5, 2.22], [8, 2.12], [13, 2.38], [17, 2.24], [22, 2.46], [26, 2.30], [29, 2.38], [33, 2.18], [36, 2.28], [41, 2.06]];
  const RV = EQ.swingify(EQ.ohlc(EQ.path(RVW, 64, .006), 6, .012), RVW);
  // multi-timeframe
  const D1 = EQ.ohlc(EQ.path([[0, 2.00], [6, 2.25], [9, 2.15], [15, 2.42], [18, 2.33], [24, 2.55]], 71, .01), 7, .015);
  const H1 = EQ.ohlc(EQ.path([[0, 2.55], [4, 2.51], [6, 2.53], [11, 2.45], [13, 2.47], [18, 2.42]], 72, .004), 8, .008);
  const M5 = EQ.ohlc(EQ.path([[0, 2.430], [3, 2.445], [6, 2.425], [9, 2.445], [12, 2.425], [15, 2.445], [18, 2.435]], 73, .003), 9, .004);

  const hi = (cs, i) => cs[i][1], lo = (cs, i) => cs[i][2];
  function swings(ch, cs, list, atFn) {
    list.forEach(([i, k, lab, col], n) => ch.marker({ i, p: k === 'H' ? hi(cs, i) : lo(cs, i), c: col, t: lab, pos: k === 'H' ? 'above' : 'below', at: atFn(n) }));
  }

  const EPISODE = {
    id: 'eq06', ...EQ.header(6, 'Trend'), _data: { UP, DN, RG, RV, D1, H1, M5 },
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'Why do some stocks keep climbing, some keep falling, and others just move left and right?', t: 'Kenapa ada saham yang bergerak naik berterusan, ada yang jatuh dan ada pula yang hanya bergerak ke kiri dan kanan?' },
          { en: 'The answer starts with understanding trend.', t: 'Jawapannya bermula dengan memahami trend.' }
        ],
        build(S, C) {
          [[UP, 'NAIK', BULL], [DN, 'TURUN', BEAR], [RG, 'MENDATAR', AMB]].forEach((d, i) => {
            const ch = S.chart({ name: 'eq06-hook' + i, x: 60 + i * 610, y: 150, w: 580, h: 470, candles: d[0], yMin: 1.92, yMax: 2.72, step: .2, dp: 2, slots: 31, title: d[1] + ' · ILUSTRASI', at: S.at(0, -.2 + i * .3) });
            ch.reveal(29, S.at(0, .3 + i * .9), .05);
            ch.box.style.borderTop = `3px solid ${d[2]}`;
          });
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we look at the three main states of the market.', t: 'Dalam video ini, kita lihat tiga keadaan utama pasaran.' },
          { en: 'First, what a trend is, and how to read swing highs and swing lows.', t: 'Pertama, apa itu trend, dan cara membaca swing high dan swing low.' },
          { en: 'Second, uptrends, downtrends and sideways ranges — and the difference between a retracement and a reversal.', t: 'Kedua, uptrend, downtrend dan julat mendatar — serta perbezaan antara retracement dan reversal.' },
          { en: 'And third, an introduction to multiple timeframe analysis.', t: 'Dan ketiga, pengenalan kepada analisis pelbagai timeframe.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 06 · MODUL 2 · ASAS MEMBACA CARTA', title: 'Trend Naik, Turun dan Mendatar', size: 80,
            lead: 'Swing high & low · HH · HL · LH · LL · Range · Multiple timeframe', leadY: 290,
            objectives: ['Maksud trend & struktur swing', 'Uptrend, downtrend & sideways', 'Retracement vs reversal · multi-timeframe'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const sv = S.svg(1240, 420, 580, 280);
          S.anim(t => { const q = CMI.ease((t - S.at(0, 1)) / 1.6); const pts = [[0, 240], [110, 150], [170, 190], [300, 80], [360, 120], [500, 20]]; let d = ''; const L = pts.length - 1, n = q * L; for (let k = 0; k <= Math.floor(n) && k <= L; k++) d += (k ? ' L' : 'M') + pts[k].join(','); if (n < L && q > 0) { const k = Math.floor(n), f = n - k; d += ` L${pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f},${pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f}`; } sv.innerHTML = q > 0 ? `<path d="${d}" fill="none" stroke="${BULL}" stroke-width="4" stroke-linejoin="round"/>` : ''; });
        }
      },
      /* 3 · APA ITU TREND / SWING */
      {
        label: 'SWING HIGH & LOW', hold: .5,
        cues: [
          { en: 'A trend is the general direction of price over a period of time.', t: 'Trend ialah arah umum pergerakan harga dalam satu tempoh masa.' },
          { en: 'Price rarely moves in a straight line. It moves in waves, called swings.', t: 'Harga jarang bergerak dalam garis lurus. Ia bergerak dalam gelombang, dipanggil swing.' },
          { en: 'A swing high is a peak, where price turned down.', t: 'Swing high ialah puncak, di mana harga berpatah turun.' },
          { en: 'A swing low is a trough, where price turned up.', t: 'Swing low ialah lembah, di mana harga berpatah naik.' },
          { en: 'By comparing each swing with the previous one, we can read the structure of the market.', t: 'Dengan membandingkan setiap swing dengan swing sebelumnya, kita boleh membaca struktur pasaran.' }
        ],
        build(S, C) {
          EQ.heading(S, 'STRUKTUR HARGA', 'Harga bergerak dalam gelombang', S.at(0, -.3));
          const ch = S.chart({ name: 'eq06-swing', x: 60, y: 160, w: 1800, h: 480, candles: UP, yMin: 1.92, yMax: 2.72, step: .1, dp: 2, slots: 34, title: 'SAHAM A · HARIAN · ILUSTRASI', at: S.at(0) });
          ch.reveal(29, S.at(0, .4), .1);
          ch.arrow({ i1: 0, p1: 1.98, i2: 29, p2: 2.62, c: DIM, dash: true, at: S.at(0, 3.4), dur: 1.2 });
          [5, 13, 21].forEach((i, n) => ch.marker({ i, p: hi(UP, i), c: AMB, t: 'SWING HIGH', at: S.at(2, .3 + n * .5) }));
          [8, 16, 24].forEach((i, n) => ch.marker({ i, p: lo(UP, i), c: BLUE, t: 'SWING LOW', pos: 'below', at: S.at(3, .3 + n * .5) }));
        }
      },
      /* 4 · UPTREND */
      {
        label: 'UPTREND', hold: .6,
        cues: [
          { en: 'In an uptrend, price makes higher highs and higher lows.', t: 'Dalam uptrend, harga membentuk higher high dan higher low.' },
          { en: 'A higher high, or HH, is a swing high above the previous swing high.', t: 'Higher high, atau HH, ialah swing high yang lebih tinggi daripada swing high sebelumnya.' },
          { en: 'A higher low, or HL, is a swing low above the previous swing low.', t: 'Higher low, atau HL, ialah swing low yang lebih tinggi daripada swing low sebelumnya.' },
          { en: 'As long as this structure continues, the uptrend is intact. Pullbacks are a normal part of it.', t: 'Selagi struktur ini berterusan, uptrend kekal. Pullback ialah sebahagian yang normal daripadanya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'TREND NAIK', 'Uptrend: Higher High & Higher Low', S.at(0, -.3));
          const ch = S.chart({ name: 'eq06-up', x: 60, y: 160, w: 1800, h: 480, candles: UP, yMin: 1.92, yMax: 2.72, step: .1, dp: 2, slots: 34, title: 'UPTREND · ILUSTRASI', titleR: 'HH + HL', at: S.at(0) });
          ch.reveal(29, S.at(0, .3), .07);
          swings(ch, UP, [[5, 'H', 'SH', DIM], [13, 'H', 'HH', BULL], [21, 'H', 'HH', BULL]], n => S.at(1, .4 + n * .6));
          swings(ch, UP, [[8, 'L', 'SL', DIM], [16, 'L', 'HL', BULL], [24, 'L', 'HL', BULL]], n => S.at(2, .4 + n * .6));
          ch.hline({ p: hi(UP, 5), from: 5, to: 13, c: DIM, at: S.at(1, 1.6), w: 1.2 }); ch.hline({ p: hi(UP, 13), from: 13, to: 21, c: DIM, at: S.at(1, 2.2), w: 1.2 });
          ch.hline({ p: lo(UP, 8), from: 8, to: 16, c: DIM, at: S.at(2, 1.6), w: 1.2 }); ch.hline({ p: lo(UP, 16), from: 16, to: 24, c: DIM, at: S.at(2, 2.2), w: 1.2 });
        }
      },
      /* 5 · DOWNTREND */
      {
        label: 'DOWNTREND', hold: .6,
        cues: [
          { en: 'A downtrend is the opposite: price makes lower highs and lower lows.', t: 'Downtrend ialah sebaliknya: harga membentuk lower high dan lower low.' },
          { en: 'A lower high, or LH, is a swing high below the previous swing high.', t: 'Lower high, atau LH, ialah swing high yang lebih rendah daripada swing high sebelumnya.' },
          { en: 'A lower low, or LL, is a swing low below the previous swing low.', t: 'Lower low, atau LL, ialah swing low yang lebih rendah daripada swing low sebelumnya.' },
          { en: 'Short rebounds can happen inside a downtrend, without changing its structure.', t: 'Lantunan singkat boleh berlaku dalam downtrend, tanpa mengubah strukturnya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'TREND TURUN', 'Downtrend: Lower High & Lower Low', S.at(0, -.3));
          const ch = S.chart({ name: 'eq06-dn', x: 60, y: 160, w: 1800, h: 480, candles: DN, yMin: 1.92, yMax: 2.72, step: .1, dp: 2, slots: 34, title: 'DOWNTREND · ILUSTRASI', titleR: 'LH + LL', at: S.at(0) });
          ch.reveal(29, S.at(0, .3), .07);
          swings(ch, DN, [[8, 'H', 'SH', DIM], [16, 'H', 'LH', BEAR], [24, 'H', 'LH', BEAR]], n => S.at(1, .4 + n * .6));
          swings(ch, DN, [[5, 'L', 'SL', DIM], [13, 'L', 'LL', BEAR], [21, 'L', 'LL', BEAR]], n => S.at(2, .4 + n * .6));
          ch.candleHL({ i1: 14, i2: 16, p1: lo(DN, 13), p2: hi(DN, 16) + .01, c: AMB, t: 'LANTUNAN', below: true, at: S.at(3, .5) });
        }
      },
      /* 6 · SIDEWAYS */
      {
        label: 'SIDEWAYS / RANGE', hold: .6,
        cues: [
          { en: 'Sometimes there is no clear trend. Price moves sideways within a range.', t: 'Kadangkala tiada trend yang jelas. Harga bergerak mendatar dalam satu julat.' },
          { en: 'Swing highs stop around a similar upper area, and swing lows hold around a similar lower area.', t: 'Swing high berhenti di sekitar kawasan atas yang hampir sama, dan swing low bertahan di sekitar kawasan bawah yang hampir sama.' },
          { en: 'There is no consistent pattern of higher highs or lower lows — buyers and sellers are relatively balanced.', t: 'Tiada corak higher high atau lower low yang konsisten — pembeli dan penjual agak seimbang.' },
          { en: 'A range does not last forever. At some point, price may break out of it — in either direction.', t: 'Julat tidak kekal selamanya. Pada satu ketika, harga mungkin keluar daripadanya — ke mana-mana arah.' }
        ],
        build(S, C) {
          EQ.heading(S, 'MENDATAR', 'Sideways: harga dalam julat', S.at(0, -.3));
          const ch = S.chart({ name: 'eq06-rg', x: 60, y: 160, w: 1800, h: 480, candles: RG, yMin: 2.10, yMax: 2.70, step: .1, dp: 2, slots: 34, title: 'SIDEWAYS · ILUSTRASI', at: S.at(0) });
          ch.reveal(29, S.at(0, .3), .07);
          ch.zone({ p1: 2.47, p2: 2.53, from: 2, to: 'end', c: BEAR, label: 'KAWASAN ATAS JULAT', at: S.at(1, .4) });
          ch.zone({ p1: 2.27, p2: 2.33, from: 2, to: 'end', c: BULL, label: 'KAWASAN BAWAH JULAT', lpos: 'below', at: S.at(1, 2.4) });
          ch.label({ i: 31, p: 2.62, t: '↑ ?', c: AMB, at: S.at(3, 1.2) }); ch.label({ i: 31, p: 2.18, t: '↓ ?', c: AMB, at: S.at(3, 1.6) });
        }
      },
      /* 7 · RETRACEMENT vs REVERSAL */
      {
        label: 'RETRACEMENT VS REVERSAL', hold: .8,
        cues: [
          { en: 'One up day is not an uptrend, and one down day is not a downtrend. Trend is about structure.', t: 'Satu hari naik bukan uptrend, dan satu hari turun bukan downtrend. Trend ialah tentang struktur.' },
          { en: 'In this uptrend, price pulls back — a retracement — but holds above the previous higher low. The structure remains.', t: 'Dalam uptrend ini, harga menurun seketika — retracement — tetapi bertahan di atas higher low sebelumnya. Struktur kekal.' },
          { en: 'Later, price falls below the last higher low, and then fails to make a new high. It forms a lower high and a lower low.', t: 'Kemudian, harga jatuh di bawah higher low terakhir, dan gagal membuat high baharu. Ia membentuk lower high dan lower low.' },
          { en: 'That change in structure is what we call a reversal. Trends do not last forever.', t: 'Perubahan struktur itulah yang dipanggil reversal. Trend tidak kekal selamanya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PERBEZAAN PENTING', 'Retracement ≠ reversal', S.at(0, -.3));
          const ch = S.chart({ name: 'eq06-rv', x: 60, y: 160, w: 1800, h: 480, candles: RV, yMin: 1.92, yMax: 2.60, step: .1, dp: 2, slots: 45, title: 'ILUSTRASI', at: S.at(0) });
          ch.reveal(22, S.at(0, .3), .06);
          swings(ch, RV, [[8, 'L', 'HL', BULL], [13, 'H', 'HH', BULL], [17, 'L', 'HL', BULL], [22, 'H', 'HH', BULL]], n => S.at(0, 2 + n * .4));
          ch.reveal(26, S.at(1, .4), .3);
          ch.hline({ p: lo(RV, 17), from: 17, c: BULL, label: 'HL TERAKHIR', at: S.at(1, .6) });
          ch.candleHL({ i1: 23, i2: 26, p1: lo(RV, 26) - .01, p2: hi(RV, 22), c: BLUE, at: S.at(1, 2.6) });
          ch.label({ i: 24.5, p: lo(RV, 17) - .09, t: 'RETRACEMENT', c: BLUE, at: S.at(1, 2.8) });
          ch.marker({ i: 26, p: lo(RV, 26), c: BULL, t: 'HL', pos: 'below', at: S.at(1, 3.4) });
          ch.reveal(41, S.at(2, .3), .25);
          ch.marker({ i: 29, p: hi(RV, 29), c: BEAR, t: 'LH', at: S.at(2, 3) });
          ch.marker({ i: 33, p: lo(RV, 33), c: BEAR, t: 'LL', pos: 'below', at: S.at(2, 4) });
          ch.setTitleR(`<span style="color:${BEAR}">STRUKTUR BERUBAH → REVERSAL</span>`, S.at(3, .3));
        }
      },
      /* 8 · MULTIPLE TIMEFRAME */
      {
        label: 'MULTIPLE TIMEFRAME', hold: .8,
        cues: [
          { en: 'Finally, the trend you see depends on the timeframe you look at.', t: 'Akhir sekali, trend yang anda lihat bergantung pada timeframe yang dilihat.' },
          { en: 'On the daily chart, this stock is in an uptrend.', t: 'Pada carta harian, saham ini berada dalam uptrend.' },
          { en: 'On the one-hour chart, it is pulling back, in a short-term downtrend.', t: 'Pada carta 1 jam, ia sedang menurun seketika, dalam downtrend jangka pendek.' },
          { en: 'And on the five-minute chart, it is moving sideways.', t: 'Dan pada carta 5 minit, ia bergerak mendatar.' },
          { en: 'Multiple timeframe analysis means looking at higher timeframes for the bigger picture, and lower timeframes for the detail.', t: 'Analisis pelbagai timeframe bermaksud melihat timeframe lebih tinggi untuk gambaran besar, dan timeframe lebih rendah untuk perincian.' }
        ],
        build(S, C) {
          EQ.heading(S, 'MULTIPLE TIMEFRAME ANALYSIS', 'Satu saham, tiga gambaran', S.at(0, -.3));
          const P = [[D1, 'HARIAN', 'UPTREND', BULL, 1.92, 2.66, .2, 24], [H1, '1 JAM', 'PULLBACK · DOWNTREND', BEAR, 2.36, 2.60, .05, 18], [M5, '5 MINIT', 'MENDATAR', AMB, 2.38, 2.49, .02, 18]];
          P.forEach((p, i) => {
            const ch = S.chart({ name: 'eq06-mtf' + i, x: 60 + i * 610, y: 160, w: 580, h: 450, candles: p[0], yMin: p[4], yMax: p[5], step: p[6], dp: 2, slots: p[7] + 3, title: p[1] + ' · ILUSTRASI', at: S.at(i + 1, -.3) });
            ch.reveal(p[7], S.at(i + 1, .1), .05);
            EQ.chip(S, p[2], 60 + i * 610 + 24, 630, p[3], S.at(i + 1, 1.6));
          });
          S.el(`<div style="display:flex;justify-content:space-between;width:1800px"><span class="lbl" style="color:${AMB}">← GAMBARAN BESAR</span><span class="lbl" style="color:${AMB}">PERINCIAN →</span></div>`, { x: 60, y: 690 }, { at: S.at(4, .3) });
        }
      },
      /* 9 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'An uptrend makes higher highs and higher lows. A downtrend makes lower highs and lower lows.', t: 'Uptrend membentuk higher high dan higher low. Downtrend membentuk lower high dan lower low.' },
          { en: 'A sideways market moves within a range, without a clear direction.', t: 'Pasaran mendatar bergerak dalam julat, tanpa arah yang jelas.' },
          { en: 'A retracement is a pullback within the trend. A reversal is a change in structure.', t: 'Retracement ialah pullback dalam trend. Reversal ialah perubahan struktur.' },
          { en: 'And trends can differ across timeframes — and none of them last forever.', t: 'Dan trend boleh berbeza antara timeframe — dan tiada satu pun yang kekal selamanya.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Trend — apa yang perlu diingat', [
            'Uptrend = HH + HL', 'Downtrend = LH + LL', 'Sideways = julat tanpa arah jelas',
            'Retracement ≠ reversal', 'Trend berbeza ikut timeframe', 'Trend tidak kekal'
          ], [S.at(1), S.at(1, 2.5), S.at(2), S.at(3), S.at(4), S.at(4, 2)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Trend dibaca melalui <span style="color:${AMB}">struktur</span>, bukan satu candle.</div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(4, 3.5) });
        }
      },
      /* 10 · SIRI */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'Trends often pause or turn at certain price areas.', t: 'Trend sering berhenti seketika atau berpatah pada kawasan harga tertentu.' },
          { en: 'Next, we look at those areas: support and resistance.', t: 'Seterusnya, kita lihat kawasan tersebut: sokongan dan rintangan.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 6, [S.at(0), S.at(1)]); }
      },
      /* 11 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'CMT Association — CMT Program curriculum: trend, swing structure & Dow Theory', tag: 'Trend' },
            { t: 'John J. Murphy — Technical Analysis of the Financial Markets (Ch. 4: Basic Concepts of Trend)', tag: 'HH · HL · LH · LL' },
            { t: 'Edwards, Magee & Bassetti — Technical Analysis of Stock Trends', tag: 'Struktur trend' },
            { t: 'Alexander Elder — The New Trading for a Living (Triple Screen / multiple timeframes)', tag: 'Multi-timeframe' },
            { t: 'Bursa Malaysia — Bursa Academy: introduction to technical analysis', tag: 'Pendidikan pelabur' }
          ], S.at(0));
        }
      },
      /* 12 · PENAFIAN */
      {
        label: 'PENAFIAN', hold: 2.6,
        cues: [
          { en: 'This video is for educational purposes only. It is not investment advice, or a recommendation to buy or sell any securities.', t: 'Video ini untuk tujuan pendidikan sahaja. Ia bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.' },
          { en: 'Capital Market Institute. Understanding Markets. Building Knowledge.', t: 'Capital Market Institute. Understanding Markets. Building Knowledge.' }
        ],
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 07 — Sokongan dan Rintangan'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
