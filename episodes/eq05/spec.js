/* CMI Equity Series — VIDEO 05: Membaca Candlestick
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 * All prices are ILLUSTRATIVE. Patterns are described as observations, never as guaranteed signals.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';

  // SVG candle: centre x, body width, prices, y-mapper
  const cdl = (x, bw, o, h, l, c, Y, op = 1, col) => {
    const k = col || (c >= o ? BULL : BEAR);
    return `<g opacity="${op}"><line x1="${x}" x2="${x}" y1="${Y(h)}" y2="${Y(l)}" stroke="${k}" stroke-width="3"/><rect x="${x - bw / 2}" y="${Math.min(Y(o), Y(c))}" width="${bw}" height="${Math.max(3, Math.abs(Y(o) - Y(c)))}" fill="${k}" rx="2"/></g>`;
  };
  const tag = (x, y, t, col, anchor = 'start') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="JBM" font-weight="700" font-size="20" fill="${col}">${t}</text>`;
  function svgPanel(S, x, y, w, h, title, at) {
    const p = S.el('', { x, y, w, h, cls: 'panel' }, { at });
    if (title) S.el(`<div class="lbl">${title}</div>`, { x: 26, y: 22, parent: p });
    const sv = S.svg(0, 0, w, h); p.appendChild(sv.parentNode); sv.parentNode.style.left = '0px'; sv.parentNode.style.top = '0px';
    return sv;
  }
  // price path inside one period (illustrative)
  const TICK = [2.40, 2.42, 2.44, 2.47, 2.45, 2.43, 2.39, 2.36, 2.38, 2.41, 2.43, 2.45];

  // 5-minute candles that aggregate into one 1-hour candle
  const M5 = EQ.ohlc(EQ.path([[0, 2.41], [3, 2.46], [6, 2.38], [11, 2.45]], 21, .008), 4, .01, 2.40);
  const H1 = [M5[0][0], Math.max(...M5.map(c => c[1])), Math.min(...M5.map(c => c[2])), M5[11][3]];

  // context charts (hammer in two different outcomes)
  const ctxA = EQ.ohlc(EQ.path([[0, 2.60], [12, 2.32]], 31, .012), 9, .012);
  ctxA.push([2.33, 2.35, 2.24, 2.34]);                                   // hammer (i=13)
  EQ.ohlc(EQ.path([[0, 2.36], [8, 2.52]], 32, .01), 6, .012, 2.34).forEach(c => ctxA.push(c));
  const ctxB = EQ.ohlc(EQ.path([[0, 2.60], [12, 2.32]], 31, .012), 9, .012);
  ctxB.push([2.33, 2.35, 2.24, 2.34]);
  EQ.ohlc(EQ.path([[0, 2.32], [8, 2.14]], 33, .01), 6, .012, 2.34).forEach(c => ctxB.push(c));

  const EPISODE = {
    id: 'eq05', ...EQ.header(5, 'Candlestick'),
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'Why do traders stare at charts made of green and red bars?', t: 'Kenapa trader melihat carta yang hanya mempunyai batang hijau dan merah?' },
          { en: 'In fact, every candle tells a story about how price moved.', t: 'Sebenarnya, setiap candle mempunyai cerita tentang pergerakan harga.' }
        ],
        build(S, C) {
          const ch = S.chart({ name: 'eq05-hook', x: 160, y: 120, w: 1600, h: 560, candles: EQ.ohlc(EQ.path([[0, 2.20], [10, 2.42], [16, 2.33], [26, 2.58], [32, 2.50], [40, 2.66]], 5, .015), 12, .02), yMin: 2.10, yMax: 2.76, step: .1, dp: 2, slots: 44, title: 'SAHAM A · HARIAN · ILUSTRASI', at: S.at(0, -.2) });
          ch.reveal(40, S.at(0, .2), .09);
          ch.candleHL({ i1: 26, i2: 26, p1: 2.40, p2: 2.66, c: AMB, t: 'SETIAP CANDLE = SATU CERITA', at: S.at(1, .4) });
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we learn how to read a candlestick chart from scratch.', t: 'Dalam video ini, kita belajar membaca carta candlestick dari asas.' },
          { en: 'First, what a candle is, and the four prices it shows: open, high, low and close.', t: 'Pertama, apa itu candle, dan empat harga yang dipaparkannya: open, high, low dan close.' },
          { en: 'Second, bullish and bearish candles, and a few common patterns.', t: 'Kedua, candle bullish dan bearish, serta beberapa pola yang biasa.' },
          { en: 'And third, why context matters, and what a timeframe is.', t: 'Dan ketiga, kenapa konteks penting, dan apa itu timeframe.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 05 · MODUL 2 · ASAS MEMBACA CARTA', title: 'Membaca Candlestick', size: 84,
            lead: 'OHLC · Body & Wick · Bullish & Bearish · Pola · Timeframe', leadY: 290,
            objectives: ['Struktur candle & maksud OHLC', 'Bullish, bearish & pola asas', 'Konteks pasaran & timeframe'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const sv = svgPanel(S, 1240, 400, 580, 300, '', S.at(0, 1));
          const Y = p => 40 + (2.6 - p) / .4 * 220;
          S.anim(t => { const q = CMI.ease((t - S.at(0, 1.4)) / .8); sv.innerHTML = cdl(190, 70, 2.32, 2.55, 2.25, 2.48, Y, q) + cdl(390, 70, 2.48, 2.52, 2.28, 2.33, Y, CMI.ease((t - S.at(0, 2)) / .8)); });
        }
      },
      /* 3 · OHLC */
      {
        label: 'OHLC', hold: .8,
        cues: [
          { en: 'A candlestick summarises price movement over one period of time — for example, one day, or one hour.', t: 'Candlestick meringkaskan pergerakan harga dalam satu tempoh masa — contohnya satu hari, atau satu jam.' },
          { en: "Let's watch price move during one period.", t: 'Mari lihat harga bergerak dalam satu tempoh.' },
          { en: 'The first price of the period is the Open. The highest price reached is the High. The lowest is the Low.', t: 'Harga pertama dalam tempoh itu ialah Open. Harga tertinggi yang dicapai ialah High. Yang terendah ialah Low.' },
          { en: 'And the last price at the end of the period is the Close.', t: 'Dan harga terakhir pada penghujung tempoh ialah Close.' },
          { en: 'Open, High, Low, Close — or OHLC. Every candle is built from these four prices.', t: 'Open, High, Low, Close — atau OHLC. Setiap candle dibina daripada empat harga ini.' }
        ],
        build(S, C) {
          EQ.heading(S, 'OPEN · HIGH · LOW · CLOSE', 'Bagaimana satu candle terbentuk', S.at(0, -.3));
          const L = svgPanel(S, 60, 160, 1100, 480, 'PERGERAKAN HARGA DALAM SATU TEMPOH · ILUSTRASI', S.at(0, .3));
          const R = svgPanel(S, 1200, 160, 660, 480, 'CANDLE YANG TERBENTUK', S.at(0, .6));
          const Y = p => 80 + (2.50 - p) / .17 * 340, X = i => 80 + i * 86;
          const t0 = S.at(1, .4), dur = 5.2;
          S.anim(t => {
            const prog = Math.max(0, Math.min(1, (t - t0) / dur)) * (TICK.length - 1);
            const n = Math.floor(prog), f = prog - n;
            let pts = TICK.slice(0, n + 1).map((p, i) => `${X(i)},${Y(p)}`);
            let cur = TICK[n]; if (n < TICK.length - 1) { cur = TICK[n] + (TICK[n + 1] - TICK[n]) * f; pts.push(`${X(n) + 86 * f},${Y(cur)}`); }
            const seen = TICK.slice(0, n + 1).concat([cur]), hi = Math.max(...seen), lo = Math.min(...seen);
            let o = `<line x1="60" x2="1060" y1="${Y(2.40)}" y2="${Y(2.40)}" stroke="#5f6e86" stroke-dasharray="5 6" opacity=".6"/>`;
            if (t >= t0) o += `<polyline points="${pts.join(' ')}" fill="none" stroke="#c7d0de" stroke-width="3" stroke-linejoin="round"/><circle cx="${pts[pts.length - 1].split(',')[0]}" cy="${Y(cur)}" r="7" fill="${AMB}"/>`;
            const lab = (k, x, p, txt, col, below) => { const a = CMI.ease((t - S.at(k[0], k[1])) / .4); return a > 0 ? `<g opacity="${a}"><circle cx="${x}" cy="${Y(p)}" r="9" fill="none" stroke="${col}" stroke-width="2.5"/>${tag(x, below ? Y(p) + 36 : Y(p) - 18, txt, col, 'middle')}</g>` : ''; };
            o += lab([2, .2], X(0), 2.40, 'OPEN 2.40', '#f1f5fb', true) + lab([2, 2.4], X(3), 2.47, 'HIGH 2.47', BULL) + lab([2, 4.2], X(7), 2.36, 'LOW 2.36', BEAR, true) + lab([3, .4], X(11), 2.45, 'CLOSE 2.45', AMB);
            L.innerHTML = o;
            // live candle
            const RY = p => 70 + (2.50 - p) / .17 * 360;
            let r = '';
            if (t >= t0) r += cdl(330, 110, 2.40, hi, lo, cur, RY);
            const rl = (k, p, txt, col) => { const a = CMI.ease((t - S.at(k[0], k[1])) / .4); return a > 0 ? `<g opacity="${a}"><line x1="400" x2="440" y1="${RY(p)}" y2="${RY(p)}" stroke="${col}" stroke-width="2"/>${tag(450, RY(p) + 7, txt, col)}</g>` : ''; };
            r += rl([2, .2], 2.40, 'O 2.40', '#f1f5fb') + rl([2, 2.4], 2.47, 'H 2.47', BULL) + rl([2, 4.2], 2.36, 'L 2.36', BEAR) + rl([3, .4], 2.45, 'C 2.45', AMB);
            R.innerHTML = r;
          });
          EQ.chip(S, 'OHLC = OPEN · HIGH · LOW · CLOSE', 60, 668, AMB, S.at(4));
        }
      },
      /* 4 · BODY & WICK */
      {
        label: 'BODY & WICK',
        cues: [
          { en: 'A candle has two parts: the body and the wicks.', t: 'Candle mempunyai dua bahagian: body dan wick.' },
          { en: 'The body is the area between the open and the close.', t: 'Body ialah kawasan antara open dan close.' },
          { en: 'The wicks — also called shadows — show the high and the low that price reached beyond the body.', t: 'Wick — juga dipanggil shadow — menunjukkan high dan low yang dicapai harga di luar body.' },
          { en: 'A long wick tells you that price travelled there during the period, but did not stay there by the close.', t: 'Wick yang panjang memberitahu bahawa harga pernah sampai ke situ dalam tempoh itu, tetapi tidak kekal di situ ketika close.' }
        ],
        build(S, C) {
          EQ.heading(S, 'STRUKTUR CANDLE', 'Body dan wick', S.at(0, -.3));
          const sv = svgPanel(S, 60, 160, 1100, 480, 'ANATOMI · ILUSTRASI', S.at(0));
          const Y = p => 60 + (2.50 - p) / .17 * 380;
          S.anim(t => {
            let o = cdl(420, 150, 2.40, 2.47, 2.36, 2.45, Y);
            const b = CMI.ease((t - S.at(1, .2)) / .5), w = CMI.ease((t - S.at(2, .2)) / .5);
            if (b > 0) o += `<g opacity="${b}"><rect x="335" y="${Y(2.45) - 8}" width="170" height="${Y(2.40) - Y(2.45) + 16}" fill="none" stroke="${AMB}" stroke-width="2" stroke-dasharray="6 5" rx="6"/><line x1="510" x2="640" y1="${(Y(2.45) + Y(2.40)) / 2}" y2="${(Y(2.45) + Y(2.40)) / 2}" stroke="${AMB}" stroke-width="2"/>${tag(650, (Y(2.45) + Y(2.40)) / 2 + 7, 'BODY · OPEN ↔ CLOSE', AMB)}</g>`;
            if (w > 0) o += `<g opacity="${w}"><line x1="440" x2="640" y1="${(Y(2.47) + Y(2.45)) / 2}" y2="${(Y(2.47) + Y(2.45)) / 2}" stroke="${BLUE}" stroke-width="2"/>${tag(650, (Y(2.47) + Y(2.45)) / 2 + 7, 'UPPER WICK · HINGGA HIGH', BLUE)}<line x1="440" x2="640" y1="${(Y(2.40) + Y(2.36)) / 2}" y2="${(Y(2.40) + Y(2.36)) / 2}" stroke="${BLUE}" stroke-width="2"/>${tag(650, (Y(2.40) + Y(2.36)) / 2 + 7, 'LOWER WICK · HINGGA LOW', BLUE)}</g>`;
            sv.innerHTML = o;
          });
          const r = svgPanel(S, 1200, 160, 660, 480, 'WICK PANJANG', S.at(3, -.2));
          const RY = p => 60 + (2.50 - p) / .2 * 360;
          S.anim(t => { const a = CMI.ease((t - S.at(3, .2)) / .6); r.innerHTML = a > 0 ? `<g opacity="${a}">${cdl(330, 100, 2.42, 2.49, 2.31, 2.44, RY)}<line x1="390" x2="470" y1="${RY(2.36)}" y2="${RY(2.36)}" stroke="${AMB}" stroke-width="2"/>${tag(480, RY(2.36) - 12, 'HARGA SAMPAI', AMB)}${tag(480, RY(2.36) + 16, 'TETAPI TIDAK KEKAL', AMB)}</g>` : ''; });
        }
      },
      /* 5 · BULLISH vs BEARISH */
      {
        label: 'BULLISH & BEARISH', hold: .4,
        cues: [
          { en: 'When the close is higher than the open, the candle is bullish. It is usually shown in green.', t: 'Apabila close lebih tinggi daripada open, candle itu bullish. Ia biasanya dipaparkan dalam warna hijau.' },
          { en: 'When the close is lower than the open, the candle is bearish, usually shown in red.', t: 'Apabila close lebih rendah daripada open, candle itu bearish, biasanya dipaparkan dalam warna merah.' },
          { en: 'For a bullish candle, the open is at the bottom of the body. For a bearish candle, it is at the top.', t: 'Bagi candle bullish, open berada di bahagian bawah body. Bagi candle bearish, ia di bahagian atas.' },
          { en: 'Colours can be changed in charting software, so always read where the open and close are — not just the colour.', t: 'Warna boleh diubah dalam perisian carta, jadi sentiasa baca kedudukan open dan close — bukan sekadar warna.' }
        ],
        build(S, C) {
          EQ.heading(S, 'ARAH CANDLE', 'Bullish berbanding bearish', S.at(0, -.3));
          const mk = (x, bull, at) => {
            const sv = svgPanel(S, x, 160, 880, 470, bull ? 'BULLISH · CLOSE > OPEN' : 'BEARISH · CLOSE < OPEN', at);
            const Y = p => 70 + (2.50 - p) / .17 * 360;
            const [o, c] = bull ? [2.38, 2.46] : [2.46, 2.38];
            S.anim(t => {
              let s = cdl(330, 130, o, 2.48, 2.35, c, Y);
              const a = CMI.ease((t - S.at(2, bull ? .3 : 2.4)) / .5);
              if (a > 0) s += `<g opacity="${a}"><line x1="400" x2="470" y1="${Y(c)}" y2="${Y(c)}" stroke="${AMB}" stroke-width="2"/>${tag(480, Y(c) + 7, 'CLOSE ' + c.toFixed(2), AMB)}<line x1="400" x2="470" y1="${Y(o)}" y2="${Y(o)}" stroke="#f1f5fb" stroke-width="2"/>${tag(480, Y(o) + 7, 'OPEN ' + o.toFixed(2), '#f1f5fb')}</g>`;
              sv.innerHTML = s;
            });
          };
          mk(60, true, S.at(0, .2)); mk(980, false, S.at(1, .2));
          EQ.chip(S, 'BACA OPEN & CLOSE · BUKAN SEKADAR WARNA', 640, 665, AMB, S.at(3, .5));
        }
      },
      /* 6 · POLA: DOJI, HAMMER, SHOOTING STAR */
      {
        label: 'DOJI · HAMMER · SHOOTING STAR', hold: .5,
        cues: [
          { en: 'Some candle shapes have names. Here are three common ones.', t: 'Sesetengah bentuk candle mempunyai nama. Berikut tiga yang biasa.' },
          { en: 'A Doji has an open and a close that are almost the same. It shows that neither buyers nor sellers took control in that period — a sign of indecision.', t: 'Doji mempunyai open dan close yang hampir sama. Ia menunjukkan pembeli mahupun penjual tidak menguasai tempoh itu — tanda ketidakpastian.' },
          { en: 'A Hammer has a small body near the top and a long lower wick, and is usually discussed after a decline. Price was pushed down, then recovered by the close.', t: 'Hammer mempunyai body kecil di bahagian atas dan wick bawah yang panjang, dan biasanya dibincangkan selepas penurunan. Harga ditolak turun, kemudian pulih ketika close.' },
          { en: 'A Shooting Star is the opposite: a small body near the bottom and a long upper wick, usually after a rise. Price was pushed up, then fell back.', t: 'Shooting Star ialah sebaliknya: body kecil di bahagian bawah dan wick atas yang panjang, biasanya selepas kenaikan. Harga ditolak naik, kemudian jatuh semula.' },
          { en: 'These names describe what happened during the period — not what must happen next.', t: 'Nama-nama ini menerangkan apa yang berlaku dalam tempoh itu — bukan apa yang pasti berlaku seterusnya.' }
        ],
        build(S, C) {
          EQ.heading(S, 'POLA SATU CANDLE', 'Doji, Hammer dan Shooting Star', S.at(0, -.3));
          const P = [
            ['Doji', 'KETIDAKPASTIAN', [2.40, 2.47, 2.33, 2.401], '#c7d0de', S.at(1, -.2), 'Open ≈ close'],
            ['Hammer', 'SELEPAS PENURUNAN', [2.43, 2.46, 2.30, 2.45], BULL, S.at(2, -.2), 'Wick bawah panjang'],
            ['Shooting Star', 'SELEPAS KENAIKAN', [2.36, 2.49, 2.33, 2.34], BEAR, S.at(3, -.2), 'Wick atas panjang']
          ];
          P.forEach((p, i) => {
            const sv = svgPanel(S, 60 + i * 610, 160, 580, 400, '', p[4]);
            S.el(`<div style="font:800 30px Inter">${p[0]}</div><div class="lbl" style="margin-top:6px">${p[1]}</div>`, { x: 60 + i * 610 + 28, y: 182 }, { at: p[4] + .1 });
            S.el(`<div class="mono" style="font-size:18px;color:${p[3]}">${p[5]}</div>`, { x: 60 + i * 610 + 28, y: 515 }, { at: p[4] + 1 });
            const Y = q => 130 + (2.50 - q) / .2 * 260;
            S.anim(t => { const a = CMI.ease((t - p[4] - .4) / .6); sv.innerHTML = a > 0 ? cdl(290, 90, ...p[2], Y, a, i === 0 ? '#c7d0de' : null) : ''; });
          });
          EQ.chip(S, 'MENERANGKAN APA YANG BERLAKU · BUKAN RAMALAN', 60, 600, AMB, S.at(4, .3));
        }
      },
      /* 7 · ENGULFING */
      {
        label: 'ENGULFING', hold: .5,
        cues: [
          { en: 'Engulfing patterns involve two candles.', t: 'Pola engulfing melibatkan dua candle.' },
          { en: 'In a Bullish Engulfing, a bearish candle is followed by a bullish candle whose body completely covers the previous body.', t: 'Dalam Bullish Engulfing, candle bearish diikuti candle bullish yang body-nya menutupi sepenuhnya body sebelumnya.' },
          { en: 'In a Bearish Engulfing, a bullish candle is followed by a bearish candle whose body completely covers it.', t: 'Dalam Bearish Engulfing, candle bullish diikuti candle bearish yang body-nya menutupinya sepenuhnya.' },
          { en: 'They show a shift in control within two periods. But an engulfing pattern does not guarantee that the trend will change.', t: 'Ia menunjukkan peralihan kawalan dalam dua tempoh. Tetapi pola engulfing tidak menjamin trend akan berubah.' }
        ],
        build(S, C) {
          EQ.heading(S, 'POLA DUA CANDLE', 'Bullish Engulfing dan Bearish Engulfing', S.at(0, -.3));
          const mk = (x, title, c1, c2, at, col) => {
            const sv = svgPanel(S, x, 160, 880, 440, title, at);
            const Y = p => 80 + (2.50 - p) / .2 * 320;
            S.anim(t => {
              const a = CMI.ease((t - at - .5) / .5), b = CMI.ease((t - at - 2) / .6);
              let s = (a > 0 ? cdl(340, 90, ...c1, Y, a) : '') + (b > 0 ? cdl(490, 110, ...c2, Y, b) : '');
              if (b > .9) { const top = Math.min(Y(c2[0]), Y(c2[3])) - 10, bot = Math.max(Y(c2[0]), Y(c2[3])) + 10; s += `<rect x="270" y="${top}" width="300" height="${bot - top}" fill="none" stroke="${col}" stroke-dasharray="6 5" rx="8"/>${tag(420, bot + 32, 'BODY 2 MENUTUP BODY 1', col, 'middle')}`; }
              sv.innerHTML = s;
            });
          };
          mk(60, 'BULLISH ENGULFING', [2.42, 2.43, 2.36, 2.38], [2.37, 2.46, 2.35, 2.45], S.at(1, -.2), BULL);
          mk(980, 'BEARISH ENGULFING', [2.38, 2.44, 2.37, 2.42], [2.43, 2.45, 2.34, 2.35], S.at(2, -.2), BEAR);
          EQ.chip(S, 'TIDAK MENJAMIN PERUBAHAN TREND', 760, 640, BEAR, S.at(3, 2));
        }
      },
      /* 8 · KONTEKS */
      {
        label: 'KONTEKS', hold: .8,
        cues: [
          { en: 'This is why context matters so much.', t: 'Inilah sebabnya konteks sangat penting.' },
          { en: 'Here is the same hammer, after the same decline, in two illustrative scenarios.', t: 'Ini ialah hammer yang sama, selepas penurunan yang sama, dalam dua senario ilustrasi.' },
          { en: 'In the first, price recovers after the hammer.', t: 'Dalam senario pertama, harga pulih selepas hammer.' },
          { en: 'In the second, price keeps falling. The pattern alone did not decide the outcome.', t: 'Dalam senario kedua, harga terus jatuh. Pola itu sahaja tidak menentukan keputusan.' },
          { en: 'Where the candle forms, the trend, and the wider market conditions all matter. No single pattern is a guaranteed signal.', t: 'Di mana candle terbentuk, trend, dan keadaan pasaran yang lebih luas semuanya penting. Tiada satu pola pun ialah isyarat yang dijamin.' }
        ],
        build(S, C) {
          EQ.heading(S, 'LOKASI · TREND · KEADAAN PASARAN', 'Pola sama, keputusan berbeza', S.at(0, -.3));
          const a = S.chart({ name: 'eq05-ctxA', x: 60, y: 160, w: 880, h: 470, candles: ctxA, yMin: 2.10, yMax: 2.66, step: .1, dp: 2, slots: 25, title: 'SENARIO A · ILUSTRASI', at: S.at(1, -.2) });
          const b = S.chart({ name: 'eq05-ctxB', x: 980, y: 160, w: 880, h: 470, candles: ctxB, yMin: 2.10, yMax: 2.66, step: .1, dp: 2, slots: 25, title: 'SENARIO B · ILUSTRASI', at: S.at(1, -.2) });
          a.reveal(13, S.at(1, .2), .08); b.reveal(13, S.at(1, .2), .08);
          a.candleHL({ i1: 13, i2: 13, p1: 2.22, p2: 2.37, c: AMB, t: 'HAMMER', below: true, at: S.at(1, 1.8) });
          b.candleHL({ i1: 13, i2: 13, p1: 2.22, p2: 2.37, c: AMB, t: 'HAMMER', at: S.at(1, 1.8) });
          a.reveal(21, S.at(2, .2), .25); b.reveal(21, S.at(3, .2), .25);
          a.label({ i: 19, p: 2.58, t: 'HARGA PULIH', c: BULL, at: S.at(2, 2.2) });
          b.label({ i: 19, p: 2.42, t: 'HARGA TERUS JATUH', c: BEAR, at: S.at(3, 2.2) });
          EQ.chip(S, 'TIADA POLA YANG MERUPAKAN ISYARAT DIJAMIN', 60, 660, BEAR, S.at(4, 1));
        }
      },
      /* 9 · TIMEFRAME */
      {
        label: 'TIMEFRAME', hold: .8,
        cues: [
          { en: 'Finally, the timeframe. A timeframe is the length of time each candle represents.', t: 'Akhir sekali, timeframe. Timeframe ialah tempoh masa yang diwakili oleh setiap candle.' },
          { en: 'On a five-minute chart, each candle covers five minutes. On a one-hour chart, one hour. On a daily chart, one trading day.', t: 'Pada carta 5 minit, setiap candle mewakili lima minit. Pada carta 1 jam, satu jam. Pada carta harian, satu hari dagangan.' },
          { en: 'Here, twelve five-minute candles cover one hour of trading.', t: 'Di sini, dua belas candle 5 minit meliputi satu jam dagangan.' },
          { en: 'Combine them, and you get a single one-hour candle: the first open, the highest high, the lowest low, and the last close.', t: 'Gabungkan semuanya, dan anda mendapat satu candle 1 jam: open pertama, high tertinggi, low terendah, dan close terakhir.' },
          { en: 'The same price movement can look very different depending on the timeframe you choose.', t: 'Pergerakan harga yang sama boleh kelihatan sangat berbeza bergantung pada timeframe yang dipilih.' }
        ],
        build(S, C) {
          EQ.heading(S, '5-MINUTE · 1-HOUR · DAILY', 'Timeframe: tempoh setiap candle', S.at(0, -.3));
          [['5M', '5 minit', S.at(1, .3)], ['1H', '1 jam', S.at(1, 2.3)], ['D', '1 hari dagangan', S.at(1, 3.8)]].forEach((f, i) =>
            S.el(`<span class="mono" style="font:700 26px JBM;color:${AMB}">${f[0]}</span><span style="font:400 24px Inter;color:#c7d0de;margin-left:14px">= ${f[1]} setiap candle</span>`, { x: 60 + i * 520, y: 150 }, { at: f[2] }));
          const ch = S.chart({ name: 'eq05-m5', x: 60, y: 210, w: 1100, h: 430, candles: M5, yMin: 2.32, yMax: 2.52, step: .05, dp: 2, slots: 13, title: 'CARTA 5 MINIT · 12 CANDLE = 1 JAM', at: S.at(2, -.3) });
          ch.reveal(11, S.at(2, .2), .2);
          ch.candleHL({ i1: 0, i2: 11, p1: H1[2] - .005, p2: H1[1] + .005, c: AMB, at: S.at(3, .2) });
          const sv = svgPanel(S, 1200, 210, 660, 430, 'CARTA 1 JAM · 1 CANDLE', S.at(3, .4));
          const Y = p => 70 + (2.52 - p) / .20 * 330;
          S.anim(t => {
            const a = CMI.ease((t - S.at(3, 1.4)) / .7); if (a <= 0) { sv.innerHTML = ''; return; }
            sv.innerHTML = cdl(260, 110, ...H1, Y, a) + `<g opacity="${CMI.ease((t - S.at(3, 2.6)) / .5)}">${tag(350, Y(H1[1]) + 7, 'H ' + H1[1].toFixed(2), BULL)}${tag(350, Y(H1[0]) + 7, 'O ' + H1[0].toFixed(2), '#f1f5fb')}${tag(350, Y(H1[3]) + 7, 'C ' + H1[3].toFixed(2), AMB)}${tag(350, Y(H1[2]) + 7, 'L ' + H1[2].toFixed(2), BEAR)}</g>`;
          });
          EQ.chip(S, 'PERGERAKAN SAMA · RUPA BERBEZA', 1200, 665, AMB, S.at(4, .3));
        }
      },
      /* 10 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'Every candle shows four prices: open, high, low and close.', t: 'Setiap candle menunjukkan empat harga: open, high, low dan close.' },
          { en: 'The body sits between the open and the close. The wicks show the high and the low.', t: 'Body terletak antara open dan close. Wick menunjukkan high dan low.' },
          { en: 'Bullish means it closed above the open; bearish means it closed below.', t: 'Bullish bermaksud ia ditutup di atas open; bearish bermaksud ditutup di bawah.' },
          { en: 'Patterns describe what happened — context decides what they might mean. And each candle represents one timeframe.', t: 'Pola menerangkan apa yang berlaku — konteks menentukan apa maksudnya. Dan setiap candle mewakili satu timeframe.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Candlestick — apa yang perlu diingat', [
            'OHLC = Open · High · Low · Close', 'Body = open ↔ close', 'Wick = high & low',
            'Bullish: close > open · Bearish: close < open', 'Pola bukan isyarat yang dijamin', 'Timeframe = tempoh setiap candle'
          ], [S.at(1), S.at(2), S.at(2, 2), S.at(3), S.at(4), S.at(4, 3)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Setiap candle bercerita — <span style="color:${AMB}">konteks menentukan maksudnya.</span></div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(4, 5) });
        }
      },
      /* 11 · SIRI */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'Candles show what happened in each period.', t: 'Candle menunjukkan apa yang berlaku dalam setiap tempoh.' },
          { en: 'Next, we step back and look at the bigger picture: uptrends, downtrends and sideways markets.', t: 'Seterusnya, kita melihat gambaran lebih besar: trend naik, trend turun dan pasaran mendatar.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 5, [S.at(0), S.at(1)]); }
      },
      /* 12 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'Steve Nison — Japanese Candlestick Charting Techniques (2nd ed.)', tag: 'Candlestick' },
            { t: 'CMT Association — CMT Program curriculum: chart construction & candlesticks', tag: 'Analisis teknikal' },
            { t: 'John J. Murphy — Technical Analysis of the Financial Markets', tag: 'Asas carta' },
            { t: 'Thomas N. Bulkowski — Encyclopedia of Candlestick Charts (pattern performance varies)', tag: 'Keberkesanan pola' },
            { t: 'Bursa Malaysia — Bursa Academy: reading stock charts', tag: 'Pendidikan pelabur' }
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
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 06 — Trend Naik, Turun dan Mendatar'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
