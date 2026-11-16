/* CMI SMC Level 9 — VIDEO 01: Introduction to SMC Trading Strategy
 * Source of truth for narration (cues), on-screen text and animation.
 * All chart data are HYPOTHETICAL and built to valid OHLC (engine validates).
 */
(function () {
  // FCPO 5M hypothetical candles [open, high, low, close]
  const CANDLES = [
    [4512, 4517, 4510, 4516], [4516, 4520, 4513, 4514], [4514, 4515, 4507, 4508], [4508, 4513, 4506, 4512],
    [4512, 4520, 4511, 4515], [4515, 4516, 4508, 4509], [4509, 4510, 4502, 4503], [4503, 4506, 4499, 4505],
    [4505, 4507, 4498, 4499], [4499, 4501, 4494, 4496], [4496, 4503, 4495, 4502], [4502, 4505, 4500, 4503],
    [4503, 4504, 4497, 4498], [4498, 4500, 4494, 4497], [4497, 4499, 4495, 4498], [4498, 4503, 4497, 4501],
    [4501, 4503, 4498, 4499], [4499, 4500, 4495, 4496], [4496, 4497, 4491, 4495], [4495, 4498, 4494, 4497],
    [4497, 4509, 4496, 4508], [4508, 4513, 4502, 4511], [4511, 4512, 4505, 4506], [4506, 4508, 4503, 4504],
    [4504, 4505, 4499, 4502], [4502, 4507, 4501, 4506], [4506, 4511, 4505, 4510], [4510, 4514, 4508, 4509],
    [4509, 4516, 4508, 4515], [4515, 4521, 4514, 4518], [4518, 4519, 4513, 4514]
  ];
  const TRADE = { entry: 4500, sl: 4490, tp: 4520 };

  function side(S, C, kicker, title, x = 1368, y = 21, w = 516, h = 760, at = 0) {
    const p = S.el('', { x, y, w, h, cls: 'panel' }, { at, dy: 10 });
    S.el(`<div class="kicker" style="font-size:17px">${kicker}</div>`, { x: 30, y: 30, parent: p });
    S.el(`<div class="h3" style="font-size:31px;line-height:1.2">${title}</div>`, { x: 30, y: 62, w: w - 60, parent: p });
    S.el(`<div class="rule" style="width:90px"></div>`, { x: 30, y: 148, parent: p });
    return p;
  }
  function sideItems(S, p, items, ats, y = 180, size = 25) {
    return S.bullets(items, 30, y, 460, ats, { size, parent: p });
  }

  /* shared FCPO chart, built according to stage so later scenes start where the previous ended */
  function fcpo(S, C, stage, title) {
    const pre = S.start - 2;
    const A = (k, d = 0) => S.at(k, d);
    const ch = S.chart({ name: 'ep01-fcpo-5m', x: 36, y: 21, w: 1310, h: 760, candles: CANDLES, yMin: 4478, yMax: 4528, step: 10, slots: 40, title: 'FCPO · 5M · HYPOTHETICAL ILLUSTRATION', titleR: title, at: stage === 1 ? A(0, -.3) : pre });
    const T = (st, k, d = 0) => stage > st ? pre : A(k, d);       // time an element appears
    // --- stage 1: context + liquidity map
    ch.reveal(17, stage > 1 ? pre - 3 : A(0, .4), stage > 1 ? 0 : .1);
    ch.zone({ p1: 4488, p2: 4496, from: 0, to: 'end', c: C.poi, label: '15M BULLISH POI · 4,488–4,496', lpos: 'below', at: T(1, 1, .3) });
    ch.hline({ p: 4520, from: 1, c: C.liq, label: 'EQH · BSL 4,520', at: T(1, 2, .4), until: stage > 3 ? pre - 1 : stage === 3 ? A(3, 0) : undefined });
    ch.marker({ i: 1, p: 4520, c: C.liq, at: T(1, 2, .2) }); ch.marker({ i: 4, p: 4520, c: C.liq, at: T(1, 2, .5) });
    ch.hline({ p: 4494, from: 9, c: C.liq, label: 'EQL · SSL 4,494', at: T(1, 3, .4), ly: -1 });
    ch.marker({ i: 9, p: 4494, c: C.liq, at: T(1, 3, .2) }); ch.marker({ i: 13, p: 4494, c: C.liq, at: T(1, 3, .5) });
    ch.marker({ i: 16, p: 4503, c: C.amber, t: 'LH', at: T(1, 4, .3) });
    ch.hline({ p: 4503, from: 16, to: 24, c: C.amber, at: T(1, 4, .5), w: 1.4 });
    if (stage === 1) ch.question({ i: 18, at: A(5, .4), t: 'NEXT CANDLES · NOT VISIBLE YET' });
    if (stage === 1) return ch;
    // --- stage 2: sweep, MSS, displacement, FVG
    ch.reveal(18, stage > 2 ? pre - 3 : A(0, .2), stage > 2 ? 0 : .3);
    ch.candleHL({ i1: 18, i2: 18, p1: 4489, p2: 4497, c: C.liq, t: 'SSL SWEEP', below: true, at: T(2, 1, .1) });
    ch.reveal(20, stage > 2 ? pre - 3 : A(2, .1), stage > 2 ? 0 : .5);
    ch.label({ i: 15, p: 4503, t: 'MSS ↑ 4,503', c: C.amber, anchor: 'end', dx: -10, dy: -26, at: T(2, 2, 2.6) });
    ch.candleHL({ i1: 20, i2: 20, p1: 4495, p2: 4515, c: C.bull, t: 'DISPLACEMENT', at: T(2, 2, 3.4) });
    ch.reveal(21, stage > 2 ? pre - 3 : A(3, .1), stage > 2 ? 0 : .3);
    ch.zone({ p1: 4498, p2: 4502, from: 19, to: 'end', c: C.blue, label: 'BULLISH FVG 4,498–4,502', lx: 'right', at: T(2, 3, 1.4) });
    if (stage === 2) { ch.question({ i: 22, at: A(4, .3), t: 'NEXT CANDLES · NOT VISIBLE YET' }); return ch; }
    // --- stage 3: trade plan (before the outcome)
    ch.hline({ p: TRADE.entry, from: 21, c: C.text, label: 'ENTRY 4,500 (limit, in FVG)', at: T(3, 1, .3), solid: true });
    ch.hline({ p: TRADE.sl, from: 18, c: C.bear, label: 'SL 4,490 · below sweep low', at: T(3, 2, .3), solid: true });
    ch.hline({ p: TRADE.tp, from: 21, c: C.bull, label: 'TP 4,520 · BSL', at: T(3, 3, .3), solid: true, ly: -22 });
    ch.trade({ i: 22, ...TRADE, tags: false, at: T(3, 4, .2), dur: .8 });
    if (stage === 3) { ch.question({ i: 22, at: A(0, .3), t: 'OUTCOME NOT VISIBLE · DECIDE NOW' }); return ch; }
    // --- stage 4: outcome
    ch.reveal(24, A(1, .1), .45);
    ch.marker({ i: 24, p: 4500, c: C.text, t: 'FILLED', pos: 'below', at: A(1, 1.6) });
    ch.reveal(29, A(2, .1), .4);
    ch.marker({ i: 29, p: 4520, c: C.bull, t: 'TP', at: A(2, 2.4) });
    ch.arrow({ i1: 24, p1: 4500, i2: 30, p2: 4487, c: C.bear, dash: true, at: A(3, .4), dur: 1 });
    ch.label({ i: 33, p: 4484, t: 'ALTERNATIVE · SL −10 pts', c: C.bear, at: A(3, 1.2) });
    return ch;
  }

  const EPISODE = {
    id: 'ep01', video: 'VIDEO 01', title: 'Introduction to SMC Trading Strategy',
    scenes: [
      /* 1 ------------------------------------------------------------ */
      {
        label: 'INTRODUCTION', hold: .5,
        cues: [
          'Selamat datang ke Level 9: SMC Trading Strategy.',
          'Dalam Level 1 hingga Level 8, kita telah membina asas: market structure, liquidity, POI, Fair Value Gap, serta Premium dan Discount.',
          'Level 9 menjawab satu soalan penting: bagaimana semua konsep ini disusun menjadi strategi trading dengan peraturan yang jelas?',
          'Dalam video ini, kita akan lihat empat perkara.',
          'Pertama, beza antara konsep, setup dan trading plan.',
          'Kedua, tiga gaya trading yang setiap satunya memerlukan SOP sendiri.',
          'Ketiga, aliran kerja trading CMI, daripada konteks pasaran hingga jurnal.',
          'Dan keempat, satu contoh FCPO yang dibina langkah demi langkah, tanpa melihat candle masa depan.'
        ],
        build(S, C) {
          S.el('<div class="kicker">VIDEO 01 · LEVEL 9 · SMC TRADING STRATEGY</div>', { x: 118, y: 150 }, { at: S.at(0, -.2) });
          S.el('<div class="h1">From Concept to<br>Trading Plan</div>', { x: 114, y: 196, w: 1100 }, { at: S.at(0) });
          S.el('<div class="lead">Context · Setup · Execution · Risk</div>', { x: 118, y: 390 }, { at: S.at(0, .3) });
          S.el('<div class="rule" style="width:322px"></div>', { x: 118, y: 452 }, { at: S.at(0, .5), dy: 0, dx: -20 });
          S.el('<div class="ptitle">LEARNING OBJECTIVES</div>', { x: 118, y: 500 }, { at: S.at(3) });
          S.bullets(['Concept vs setup vs trading plan', 'Three trading styles · three different SOPs', 'The CMI trading workflow', 'One FCPO example · built without hindsight'],
            118, 540, 900, [S.at(4), S.at(5), S.at(6), S.at(7)], { check: true, size: 27 });
          S.schematic(1180, 220, 620, 400, {
            at: S.at(1), dur: 3.2, color: C.bull, pts: [[0, .62], [.18, .9], [.32, .55], [.42, .7], [.55, .2], [.63, .32], [.7, .14], [.86, .62], [1, .95]],
            zones: [{ x1: .5, x2: 1, y1: .1, y2: .26, c: C.poi, label: 'POI', at: S.at(1, 1.6) }],
            lines: [{ x1: .3, x2: 1, y: .9, c: C.liq, label: 'BSL', at: S.at(1, 2.4) }],
            labels: [{ i: 6, t: 'SWEEP', c: C.liq, pos: 'below', at: S.at(2) }, { i: 7, t: 'MSS', c: C.amber, at: S.at(2, .4) }]
          });
        }
      },
      /* 2 ------------------------------------------------------------ */
      {
        label: '9.0 · CONCEPT → SETUP → SOP',
        cues: [
          'Ramai pelajar boleh mengenal pasti Order Block atau FVG pada carta. Tetapi mengenal pasti setup belum lagi satu strategi.',
          'Konsep ialah alat analisis. Contohnya liquidity sweep, atau market structure shift.',
          'Setup ialah gabungan beberapa konsep pada satu lokasi tertentu, yang membentuk hipotesis trading.',
          'Trading plan pula menetapkan peraturan: bila masuk, di mana stop-loss, apa sasaran, berapa risiko, dan bila tidak trade langsung.',
          'SOP, atau Standard Operating Procedure, ialah trading plan yang ditulis sebagai langkah berturutan, supaya boleh diulang, direkod dan dinilai.',
          'Matlamat Level 9 bukan sekadar mencari setup, tetapi membina SOP yang boleh diuji.'
        ],
        build(S, C) {
          S.heading('FOUNDATION 9.0', 'Knowing a setup is not a strategy', S.at(0, -.3));
          const cards = [
            { n: '01', t: 'Concept', b: 'An analytical tool.<br>Liquidity sweep · MSS · FVG · OB', c: C.blue, k: 1 },
            { n: '02', t: 'Setup', b: 'Concepts combined at one location → a trading hypothesis.', c: C.poi, k: 2 },
            { n: '03', t: 'Trading plan', b: 'Rules: entry · stop-loss · target · risk · no-trade conditions.', c: C.amber, k: 3 },
            { n: '04', t: 'SOP', b: 'The plan written as ordered steps — repeatable, recordable, testable.', c: C.green, k: 4 }
          ];
          cards.forEach((cd, i) => {
            const d = S.el(`<div class="num" style="color:${cd.c}">${cd.n}</div><div class="ct">${cd.t}</div><div class="cb">${cd.b}</div>`, { x: 60 + i * 455, y: 190, w: 420, h: 300, cls: 'card' }, { at: S.at(cd.k, -.1) });
            d.style.borderTop = `3px solid ${cd.c}`;
            if (i < 3) S.el(`<div style="font:700 34px Inter;color:#5f6e86">→</div>`, { x: 60 + i * 455 + 424, y: 316 }, { at: S.at(cd.k + 1, -.2), dy: 0 });
          });
          S.el('<div class="statement" style="font-size:46px">Find setups → <span style="color:#e8b44c">build a testable SOP.</span></div>', { x: 60, y: 580, w: 1800 }, { at: S.at(5) });
        }
      },
      /* 3 ------------------------------------------------------------ */
      {
        label: '9.0 · SIX SUBTOPICS',
        cues: [
          'Level 9 mengandungi enam subtopik, dan susunan asalnya dikekalkan.',
          'Satu, Scalping SOP. Dua, Intraday SOP. Tiga, Swing Trading SOP.',
          'Tiga subtopik pertama dipisahkan kerana setiap gaya mempunyai timeframe, tempoh pegangan, saiz stop-loss dan pengurusan posisi yang berbeza.',
          'Empat, Entry Confirmation. Lima, Stop Loss dan Take Profit. Enam, Risk-to-Reward.',
          'Tiga subtopik terakhir ialah komponen yang digunakan dalam setiap SOP, tetapi parameternya berubah mengikut gaya trading.'
        ],
        build(S, C) {
          S.heading('LEVEL 9 STRUCTURE', 'Six subtopics · original order', S.at(0, -.3));
          const items = [
            ['01', 'Scalping SOP', 'Short-term execution · 15M setup · 5M confirmation'],
            ['02', 'Intraday SOP', 'Daily/4H context · session planning · same-day exit'],
            ['03', 'Swing Trading SOP', 'Weekly/Daily structure · wider stops · overnight risk'],
            ['04', 'Entry Confirmation', 'Liquidity → MSS → Displacement → FVG'],
            ['05', 'Stop Loss & Take Profit', 'Structural invalidation · liquidity-based targets'],
            ['06', 'Risk-to-Reward (RR)', 'RR · expectancy · position sizing · margin ≠ risk']
          ];
          const els = items.map((it, i) => {
            const col = i % 3, row = Math.floor(i / 3), c = row === 0 ? C.amber : C.liq;
            const d = S.el(`<div class="num" style="color:${c}">${it[0]}</div><div class="ct">${it[1]}</div><div class="cb">${it[2]}</div>`, { x: 60 + col * 605, y: 180 + row * 290, w: 575, h: 255, cls: 'card' }, { at: row === 0 ? S.at(1, i * .9) : S.at(3, (i - 3) * .9) });
            return d;
          });
          S.el('<span class="tag" style="color:#e8b44c;border-color:#e8b44c88">STYLE-SPECIFIC SOPs</span>', { x: 60, y: 140 }, { at: S.at(2) });
          S.el('<span class="tag" style="color:#22d3ee;border-color:#22d3ee88">COMPONENTS USED IN EVERY SOP</span>', { x: 60, y: 432 }, { at: S.at(4) });
          [0, 1, 2].forEach(i => S.hl(els[i], S.at(2), S.at(3)));
          [3, 4, 5].forEach(i => S.hl(els[i], S.at(4), null, 'rgba(34,211,238,.5)'));
        }
      },
      /* 4 ------------------------------------------------------------ */
      {
        label: '9.0 · THREE TRADING STYLES',
        cues: [
          'Mari kita bandingkan tiga gaya ini secara ringkas.',
          'Scalping mensasarkan pergerakan harga yang pendek. Konteks daripada 1H atau 30M, setup pada 15M, dan pengesahan pada 5M.',
          'Intraday memegang posisi dalam hari dagangan yang sama. Konteks daripada Daily dan 4H, struktur dan setup pada 1H atau 30M.',
          'Swing trading memegang posisi merentasi beberapa sesi atau hari, dengan konteks Weekly dan Daily.',
          'Pertimbangan utama juga berbeza. Scalping sangat sensitif kepada kos dan pelaksanaan, intraday kepada struktur sesi, dan swing kepada konteks HTF serta risiko overnight.',
          'Ini ialah rangka kerja pengajaran CMI, bukan standard industri sejagat. Setiap kombinasi timeframe perlu diuji.',
          'Tiada satu gaya yang secara semula jadi lebih menguntungkan. Yang penting ialah SOP yang konsisten dengan gaya yang dipilih.'
        ],
        build(S, C) {
          S.heading('FOUNDATION 9.0 · COMPARISON', 'Scalping vs Intraday vs Swing', S.at(0, -.3));
          S.table(60, 170, 1800, ['Criteria', 'Scalping', 'Intraday', 'Swing trading'], [
            ['Holding period', 'Short', 'Within trading day', 'Multiple sessions / days'],
            ['Higher context', '1H / 30M', 'Daily / 4H', 'Weekly / Daily'],
            ['Setup timeframe', '15M', '1H / 30M', '4H / 1H'],
            ['Entry timeframe', '5M (1M optional)', '15M / 5M', '1H / 30M / 15M'],
            ['Main consideration', 'Execution & costs', 'Session structure', 'HTF context & overnight risk']
          ], [S.at(1, -.2), S.at(1, 2), S.at(1, 4), S.at(1, 6), S.at(4, .2)], { colw: ['22%', '24%', '24%', '30%'], colColor: [null, '#e8b44c', '#22d3ee', '#8b7cf6'], fs: 25, at: S.at(0, .3) });
          S.el('<span class="tag" style="color:#9aa8be;border-color:#5f6e86">SUGGESTED CMI TEACHING FRAMEWORK · NOT A UNIVERSAL STANDARD · TEST BEFORE USE</span>', { x: 60, y: 640 }, { at: S.at(5) });
          S.el('<div class="body">No style is inherently more profitable. <b style="color:#e8b44c">Consistency between style and SOP</b> is what matters.</div>', { x: 60, y: 700, w: 1800 }, { at: S.at(6) });
        }
      },
      /* 5 ------------------------------------------------------------ */
      {
        label: '9.0 · ONE SOP DOES NOT FIT ALL',
        cues: [
          'Kenapa satu SOP tidak boleh digunakan untuk semua gaya? Lihat stop-loss.',
          'Dalam contoh hipotetikal ini, invalidation struktur bagi setup scalping mungkin sekitar 10 mata, iaitu 250 ringgit setiap kontrak.',
          'Bagi intraday, struktur yang relevan lebih besar, contohnya 18 mata, atau 450 ringgit. Bagi swing, invalidation pada Daily atau 4H mungkin 80 mata, atau 2,000 ringgit setiap kontrak.',
          'Jika stop-loss scalping digunakan untuk posisi swing, stop itu berada di dalam pergerakan biasa harga, bukan pada invalidation sebenar.',
          'Sebaliknya, jika stop swing digunakan pada setup scalping, risiko menjadi terlalu besar berbanding sasaran yang dekat.',
          'Oleh itu, setiap gaya memerlukan SOP sendiri: timeframe, stop-loss, sasaran, saiz posisi, dan cara memantau dagangan.'
        ],
        build(S, C) {
          S.heading('FOUNDATION 9.0', 'Same market. Different invalidation.', S.at(0, -.3));
          const rows = [['Scalping', 10, C.amber, 1, 0], ['Intraday', 18, C.liq, 2, 0], ['Swing', 80, C.poi, 2, 2.6]];
          const box = S.el('', { x: 60, y: 170, w: 1180, h: 470, cls: 'panel' }, { at: S.at(0, .2) });
          S.el('<div class="ptitle">FCPO · HYPOTHETICAL STOP DISTANCE PER CONTRACT · 1 pt = RM25</div>', { x: 26, y: 22, parent: box });
          rows.forEach((r, i) => {
            const y = 90 + i * 125, wmax = 760, w = wmax * r[1] / 80;
            S.el(`<div style="font:700 30px Inter;color:${r[2]}">${r[0]}</div>`, { x: 30, y: y + 14, parent: box }, { at: S.at(r[3], r[4]) });
            const bar = S.el(`<div style="height:46px;border-radius:6px;background:${r[2]};opacity:.85"></div>`, { x: 230, y: y + 8, w: w, parent: box }, { at: S.at(r[3], r[4] + .2), dy: 0 });
            bar.style.transformOrigin = 'left';
            S.anim(t => { const p = CMI.ease((t - S.at(r[3], r[4] + .2)) / .9); bar.firstChild.style.width = (p * w) + 'px'; bar.style.width = w + 'px'; });
            S.el(`<div class="mono" style="font-size:24px;color:#dfe6f0">${r[1]} pts · RM${CMI.fmt(r[1] * 25)}</div>`, { x: 230 + w + 22, y: y + 16, parent: box }, { at: S.at(r[3], r[4] + 1) });
          });
          S.el('<div class="small mono" style="font-size:17px;letter-spacing:1px">GROSS · BEFORE COSTS & SLIPPAGE · ILLUSTRATIVE DISTANCES ONLY</div>', { x: 30, y: 420, parent: box }, { at: S.at(2, 3.5) });
          const p = S.el('', { x: 1270, y: 170, w: 590, h: 470, cls: 'panel' }, { at: S.at(3, -.2) });
          S.el('<div class="kicker" style="font-size:17px">MISMATCH</div>', { x: 28, y: 28, parent: p });
          S.bullets([{ t: 'Scalping stop on a swing trade → stop sits inside normal noise', c: C.bear }, { t: 'Swing stop on a scalp → risk too large for a nearby target', c: C.bear }, { t: 'Each style needs its own timeframes, stops, targets, size & monitoring', c: C.green }],
            28, 80, 530, [S.at(3), S.at(4), S.at(5)], { size: 25, parent: p });
        }
      },
      /* 6 ------------------------------------------------------------ */
      {
        label: '9.0 · CMI TRADING WORKFLOW', hold: .6,
        cues: [
          'Inilah aliran kerja trading CMI, yang akan menjadi tulang belakang Level 9.',
          'Bermula dengan konteks pasaran dan bias timeframe tinggi.',
          'Kemudian pilih gaya trading. Pilihan ini menentukan timeframe dan tempoh pegangan.',
          'Seterusnya, petakan market structure dan liquidity, kemudian pilih POI yang relevan.',
          'Entry confirmation mengikut urutan: liquidity, MSS atau change of character, displacement, kemudian FVG atau execution zone.',
          'Trade planning menetapkan entry, stop-loss struktur, take-profit berasaskan liquidity, risk-to-reward dan saiz posisi.',
          'Akhir sekali, pelaksanaan dan pengurusan dagangan, diikuti jurnal dan penilaian prestasi.',
          'Perhatikan bahawa jurnal bukan langkah tambahan. Tanpa rekod, SOP tidak boleh dinilai.'
        ],
        build(S, C) {
          S.heading('CMI WORKFLOW', 'From context to performance review', S.at(0, -.3));
          const bw = 400, bh = 112, xs = [60, 520, 980, 1440], y1 = 200, y2 = 470;
          const nodes = [
            { id: 'a', x: xs[0], y: y1, w: bw, h: bh, t: 'Market context', s: 'HTF BIAS', c: C.blue, at: S.at(1) },
            { id: 'b', x: xs[1], y: y1, w: bw, h: bh, t: 'Trading style', s: 'SCALP · INTRADAY · SWING', c: C.amber, at: S.at(2) },
            { id: 'c', x: xs[2], y: y1, w: bw, h: bh, t: 'Structure & liquidity', s: 'BOS · MSS · BSL · SSL', c: C.liq, at: S.at(3) },
            { id: 'd', x: xs[3], y: y1, w: bw, h: bh, t: 'POI selection', s: 'OB · FVG · BB · MB · RB', c: C.poi, at: S.at(3, 2.2) },
            { id: 'e', x: xs[3], y: y2, w: bw, h: bh, t: 'Entry confirmation', s: 'LIQ → MSS → DISP → FVG', c: C.green, at: S.at(4) },
            { id: 'f', x: xs[2], y: y2, w: bw, h: bh, t: 'Trade planning', s: 'ENTRY · SL · TP · RR · SIZE', c: C.amber, at: S.at(5) },
            { id: 'g', x: xs[1], y: y2, w: bw, h: bh, t: 'Execution & management', s: 'RULE-BASED', c: C.text, at: S.at(6) },
            { id: 'h', x: xs[0], y: y2, w: bw, h: bh, t: 'Journal & evaluation', s: 'RECORD · REVIEW · TEST', c: C.pink, at: S.at(6, 2) }
          ];
          const N = S.flow(nodes, [
            { f: 'a', to: 'b', at: S.at(2, -.3) }, { f: 'b', to: 'c', at: S.at(3, -.3) }, { f: 'c', to: 'd', at: S.at(3, 2) },
            { f: 'd', to: 'e', at: S.at(4, -.3) }, { f: 'e', to: 'f', at: S.at(5, -.3) }, { f: 'f', to: 'g', at: S.at(6, -.3) }, { f: 'g', to: 'h', at: S.at(6, 1.8) }
          ]);
          S.hl(N.h.el, S.at(7), null, 'rgba(244,114,182,.6)');
          S.el('<div class="body" style="color:#9aa8be">Style selection sets the timeframes and holding period · entry, stop and target must match the chosen plan.</div>', { x: 60, y: 660, w: 1800 }, { at: S.at(7, .5) });
        }
      },
      /* 7 ------------------------------------------------------------ */
      {
        label: '9.0 · FCPO EXAMPLE · CONTEXT & LIQUIDITY', hold: .4,
        cues: [
          'Sekarang, mari lihat satu contoh hipotetikal FCPO pada carta 5 minit. Ini ilustrasi pendidikan, bukan data sejarah sebenar.',
          'Andaikan konteks 1H dan 30M berpotensi bullish, dan carta 15M menunjukkan satu POI bullish di sekitar 4,488 hingga 4,496.',
          'Harga sedang turun. Di atas, terdapat dua high yang hampir sama pada 4,520. Ini Equal Highs, iaitu potensi Buy-Side Liquidity.',
          'Di bawah, dua low pada 4,494 membentuk Equal Lows, iaitu potensi Sell-Side Liquidity, yang terletak di dalam POI.',
          'Struktur dalaman masih bearish. Lower high terakhir berada pada 4,503.',
          'Pada titik ini, belum ada entry. Harga hanya menghampiri lokasi yang dipilih. POI bukan entry.'
        ],
        build(S, C) {
          fcpo(S, C, 1, 'STEP 1 · CONTEXT & LIQUIDITY MAP');
          const p = side(S, C, 'FOUNDATION 9.0 · EXAMPLE', 'Building the setup, step by step', 1368, 21, 516, 760, S.at(0, -.2));
          sideItems(S, p, [{ t: 'HTF 1H / 30M · potentially bullish', c: C.green }, { t: '15M POI · 4,488–4,496', c: C.poi }, { t: 'EQH 4,520 · potential BSL', c: C.liq }, { t: 'EQL 4,494 · potential SSL', c: C.liq }, { t: 'Internal LH · 4,503', c: C.amber }, { t: 'No entry yet · location ≠ trigger', c: C.bear }],
            [S.at(1), S.at(1, 1), S.at(2), S.at(3), S.at(4), S.at(5)]);
        }
      },
      /* 8 ------------------------------------------------------------ */
      {
        label: '9.0 · FCPO EXAMPLE · CONFIRMATION', hold: .6,
        cues: [
          'Candle seterusnya turun ke 4,491, melepasi Equal Lows, kemudian ditutup semula di atas 4,494.',
          'Ini kemungkinan liquidity sweep. Tetapi sweep sahaja belum mencukupi untuk entry.',
          'Kemudian muncul candle bullish yang besar, ditutup pada 4,508, menembusi lower high 4,503. Ini potensi bullish MSS, disertai displacement.',
          'Displacement ini meninggalkan Fair Value Gap antara 4,498 dan 4,502, iaitu ruang antara high candle pertama dan low candle ketiga.',
          'Sekarang barulah urutan pengesahan CMI lengkap: liquidity, MSS, displacement dan FVG.'
        ],
        build(S, C) {
          fcpo(S, C, 2, 'STEP 2 · ENTRY CONFIRMATION');
          const p = side(S, C, 'ENTRY CONFIRMATION', 'Liquidity → MSS → Displacement → FVG', 1368, 21, 516, 760, S.at(0, -.2));
          sideItems(S, p, [{ t: 'Sweep to 4,491 · close back above 4,494', c: C.liq }, { t: 'Sweep alone ≠ entry', c: C.bear }, { t: 'Close 4,508 > LH 4,503 · bullish MSS', c: C.amber }, { t: 'Strong-bodied candle · displacement', c: C.bull }, { t: 'FVG 4,498–4,502 · execution zone', c: C.blue }, { t: 'Sequence complete under CMI model', c: C.green }],
            [S.at(0, .5), S.at(1), S.at(2, 2.6), S.at(2, 3.6), S.at(3), S.at(4)]);
        }
      },
      /* 9 ------------------------------------------------------------ */
      {
        label: '9.0 · FCPO EXAMPLE · TRADE PLAN', hold: .6,
        cues: [
          'Sebelum harga bergerak, kita tulis pelan dagangan.',
          'Entry bersyarat pada 4,500, iaitu di dalam FVG, hanya jika harga kembali ke zon ini.',
          'Stop-loss pada 4,490, satu mata di bawah low sweep. Jika harga jatuh ke paras ini, hipotesis bullish dianggap tidak sah.',
          'Sasaran pada 4,520, iaitu Equal Highs, potensi Buy-Side Liquidity di arah bertentangan.',
          'Risiko 10 mata, potensi ganjaran 20 mata. Gross risk-to-reward ialah 2 berbanding 1.',
          { t: 'Bagi satu kontrak FCPO bersaiz 25 tan metrik, setiap mata bernilai RM25. Risiko kasar RM250, potensi ganjaran kasar RM500, sebelum kos dan slippage.', say: 'Bagi satu kontrak FCPO bersaiz 25 tan metrik, setiap mata bernilai 25 ringgit. Risiko kasar 250 ringgit, potensi ganjaran kasar 500 ringgit, sebelum kos dan slippage.' },
          'Perhatikan, bahagian kanan carta masih tersembunyi. Keputusan dibuat hanya dengan maklumat yang tersedia.'
        ],
        build(S, C) {
          fcpo(S, C, 3, 'STEP 3 · TRADE PLAN BEFORE ENTRY');
          const p = side(S, C, 'TRADE PLAN · 1 CONTRACT', 'Written before the outcome', 1368, 21, 516, 760, S.at(0, -.2));
          const lines = [
            [`Entry  <span class="em">4,500</span>`, S.at(1)], [`SL     <span style="color:#ef5350">4,490</span>`, S.at(2)], [`TP     <span style="color:#26a69a">4,520</span>`, S.at(3)],
            [`Risk   4,500 − 4,490 = 10 pts`, S.at(4)], [`Reward 4,520 − 4,500 = 20 pts`, S.at(4, 1.5)], [`RR     20 ÷ 10 = <span class="em">2 : 1</span>`, S.at(4, 3)],
            [`1 pt   = RM1 × 25 t = RM25`, S.at(5)], [`Risk   10 × 25 = <span style="color:#ef5350">RM250</span>`, S.at(5, 3)], [`Reward 20 × 25 = <span style="color:#26a69a">RM500</span>`, S.at(5, 5)]
          ];
          lines.forEach((l, i) => S.el(`<div class="calc" style="font-size:24px;white-space:pre">${l[0]}</div>`, { x: 30, y: 180 + i * 50, parent: p }, { at: l[1], dy: 0, dx: -10 }));
          S.el('<div class="small mono" style="font-size:16px;letter-spacing:.6px;color:#f59e0b">GROSS · BEFORE BROKERAGE, FEES & SLIPPAGE<br>VERIFY CONTRACT SPECS WITH BURSA</div>', { x: 30, y: 650, parent: p }, { at: S.at(5, 6) });
        }
      },
      /* 10 ----------------------------------------------------------- */
      {
        label: '9.0 · FCPO EXAMPLE · OUTCOME', hold: .5,
        cues: [
          'Sekarang kita dedahkan apa yang berlaku seterusnya.',
          'Harga naik dahulu, kemudian kembali ke FVG. Order entry pada 4,500 terisi.',
          'Selepas itu, harga bergerak naik dan mencapai 4,520. Sasaran tercapai.',
          'Tetapi ingat, ini hanya satu hasil. Dengan setup yang sama, harga boleh sahaja jatuh ke stop-loss.',
          'Kerugian yang mengikut pelan tidak bermakna SOP dilaksanakan dengan salah. Prestasi strategi dinilai merentasi sampel dagangan yang besar, bukan satu dagangan.'
        ],
        build(S, C) {
          fcpo(S, C, 4, 'STEP 4 · OUTCOME (ONE OF MANY)');
          const p = side(S, C, 'RESULT · 1 CONTRACT', 'One outcome, not a promise', 1368, 21, 516, 760, S.at(0, -.2));
          S.el('<div class="calc" style="font-size:24px">Filled  4,500<br>Exit    4,520<br>Result  <span style="color:#26a69a">+20 pts · +RM500</span></div>', { x: 30, y: 180, parent: p }, { at: S.at(2, 2.4) });
          S.el('<div class="calc" style="font-size:24px">Alt.    SL 4,490<br>Result  <span style="color:#ef5350">−10 pts · −RM250</span></div>', { x: 30, y: 350, parent: p }, { at: S.at(3, 1) });
          S.el('<div class="body" style="font-size:24px">Judge the SOP over a <b style="color:#e8b44c">large sample</b> of trades — never on one result.</div>', { x: 30, y: 500, w: 456, parent: p }, { at: S.at(4) });
        }
      },
      /* 11 ----------------------------------------------------------- */
      {
        label: '9.0 · MARGIN IS NOT RISK',
        cues: [
          'Satu perkara kritikal sebelum kita teruskan: margin bukan risiko.',
          { t: 'Nilai notional satu kontrak pada harga 4,500 ialah 4,500 darab 25 tan, iaitu RM112,500.', say: 'Nilai notional satu kontrak pada harga 4,500 ialah 4,500 darab 25 tan, iaitu 112,500 ringgit.' },
          { t: 'Walaupun anda menggunakan kemudahan margin intraday, sama ada separuh atau suku margin, pergerakan 10 mata tetap bernilai RM250 setiap kontrak.', say: 'Walaupun anda menggunakan kemudahan margin intraday, sama ada separuh atau suku margin, pergerakan 10 mata tetap bernilai 250 ringgit setiap kontrak.' },
          'Margin yang lebih rendah tidak mengurangkan pendedahan pasaran. Ia hanya mengurangkan modal yang dikunci, dan boleh menggalakkan saiz posisi yang berlebihan.',
          'Risiko mesti dikira daripada jarak stop-loss, nilai setiap mata dan bilangan kontrak, bukan daripada margin.'
        ],
        build(S, C) {
          S.el('<div class="kicker">RISK FOUNDATION</div>', { x: 60, y: 40 }, { at: S.at(0, -.3) });
          S.el('<div class="statement">Margin is not risk.</div>', { x: 60, y: 80 }, { at: S.at(0) });
          const p = S.el('', { x: 60, y: 210, w: 1080, h: 450, cls: 'panel' }, { at: S.at(1, -.3) });
          const L = [
            ['Notional = 4,500 × 25 t', S.at(1)], ['         = <span class="em">RM112,500</span> per contract', S.at(1, 2.6)],
            ['Full / ½ / ¼ margin → same contract', S.at(2)], ['10-pt move = 10 × RM25 = <span style="color:#ef5350">RM250</span>', S.at(2, 3)],
            ['Risk = stop pts × RM25 × contracts', S.at(4)]
          ];
          L.forEach((l, i) => S.el(`<div class="calc" style="font-size:30px;white-space:pre">${l[0]}</div>`, { x: 36, y: 40 + i * 74, parent: p }, { at: l[1], dy: 0, dx: -10 }));
          const q = S.el('', { x: 1170, y: 210, w: 690, h: 450, cls: 'panel' }, { at: S.at(3, -.3) });
          S.el('<div class="kicker" style="font-size:17px;color:#f59e0b">LOWER MARGIN</div>', { x: 30, y: 30, parent: q });
          S.bullets([{ t: 'Does NOT reduce price exposure', c: C.bear }, { t: 'Only reduces capital locked as margin', c: C.amber }, { t: 'Can encourage oversized positions', c: C.bear }, { t: 'Size from stop distance — never from margin', c: C.green }],
            30, 80, 630, [S.at(3), S.at(3, 2), S.at(3, 4), S.at(4)], { size: 26, parent: q });
          S.el('<div class="small mono" style="font-size:16px;letter-spacing:.8px">MARGIN LEVELS & FACILITIES ARE SET BY THE EXCHANGE AND YOUR BROKER · NO MARGIN FIGURE IS IMPLIED HERE</div>', { x: 60, y: 690 }, { at: S.at(4, 1) });
        }
      },
      /* 12 ----------------------------------------------------------- */
      {
        label: '9.0 · COMMON MISCONCEPTIONS',
        cues: [
          'Sebelum masuk ke SOP pertama, buang lima salah faham ini.',
          'Satu: setiap liquidity sweep pasti menghasilkan reversal. Tidak. Sweep hanya satu kemungkinan.',
          'Dua: harga menyentuh POI bermakna entry. Tidak. POI ialah lokasi, bukan pencetus.',
          'Tiga: RR 1 berbanding 3 menjamin keuntungan. Tidak. Hasil bergantung kepada win rate dan kos.',
          'Empat: margin rendah lebih selamat. Tidak. Pendedahan harga kekal sama.',
          'Lima: satu SOP sesuai untuk semua gaya. Tidak. Setiap gaya memerlukan SOP sendiri.',
          'Ingat, konsep SMC ialah rangka kerja analisis. Corak carta tidak membuktikan identiti, saiz posisi atau niat institusi.'
        ],
        build(S, C) {
          S.heading('FOUNDATION 9.0 · COMMON MISTAKES', 'Five misconceptions to drop now', S.at(0, -.3));
          const M = [['Every sweep reverses', 'A sweep is a possibility, not a signal.'], ['POI touch = entry', 'A POI is a location, not a trigger.'], ['1:3 RR guarantees profit', 'Depends on win rate, costs & execution.'], ['Lower margin = safer', 'Price exposure is unchanged.'], ['One SOP fits all styles', 'Each style needs its own SOP.']];
          M.forEach((m, i) => {
            S.el(`<div style="display:flex;justify-content:space-between"><span class="num" style="color:#ef5350">0${i + 1}</span><span style="color:#ef5350;font:700 28px Inter">✕</span></div><div class="ct" style="font-size:27px">${m[0]}</div><div class="cb">${m[1]}</div>`, { x: 60 + i * 362, y: 180, w: 340, h: 330, cls: 'card' }, { at: S.at(i + 1, -.1) });
          });
          S.el('<div class="body" style="color:#9aa8be">SMC/ICT concepts are <b style="color:#f1f5fb">analytical frameworks</b>. Chart patterns do not prove institutional identity, size or intent.</div>', { x: 60, y: 580, w: 1800 }, { at: S.at(6) });
        }
      },
      /* 13 ----------------------------------------------------------- */
      {
        label: '9.0 · KNOWLEDGE CHECK', hold: .4,
        cues: [
          'Semakan pengetahuan. Cuba jawab sebelum jawapan dipaparkan.',
          'Soalan satu: apakah beza antara setup dan trading plan?',
          'Jawapan: setup ialah hipotesis pada satu lokasi. Trading plan menetapkan peraturan entry, stop-loss, sasaran, risiko dan keadaan tidak trade.',
          'Soalan dua: entry 4,500, stop-loss 4,490, sasaran 4,520. Berapakah gross RR?',
          'Jawapan: ganjaran 20 mata bahagi risiko 10 mata, iaitu 2 berbanding 1.',
          'Soalan tiga: jika anda menggunakan suku margin, adakah risiko 10 mata menjadi lebih kecil?',
          { t: 'Jawapan: tidak. Ia kekal RM250 setiap kontrak, sebelum kos.', say: 'Jawapan: tidak. Ia kekal 250 ringgit setiap kontrak, sebelum kos.' }
        ],
        build(S, C) {
          S.heading('KNOWLEDGE CHECK', 'Answer before the reveal', S.at(0, -.3));
          const Q = [['Setup vs trading plan?', 'Setup = hypothesis at a location. Plan = rules for entry, SL, TP, risk & no-trade.', 1, 2],
          ['Entry 4,500 · SL 4,490 · TP 4,520 → gross RR?', '20 pts ÷ 10 pts = 2 : 1', 3, 4],
          ['¼ margin → is a 10-pt risk smaller?', 'No. Still RM250 per contract (gross).', 5, 6]];
          Q.forEach((q, i) => {
            const y = 180 + i * 165;
            S.el(`<div style="display:flex;gap:22px;align-items:baseline"><span class="num mono" style="font:700 24px JBM;color:#e8b44c">Q${i + 1}</span><span class="h3" style="font-size:31px">${q[0]}</span></div>`, { x: 60, y }, { at: S.at(q[2]) });
            S.el(`<div style="display:flex;gap:22px;align-items:baseline"><span style="font:700 24px JBM;color:#34d399">A${i + 1}</span><span class="body" style="font-size:27px">${q[1]}</span></div>`, { x: 60, y: y + 56, w: 1800 }, { at: S.at(q[3]) });
          });
        }
      },
      /* 14 ----------------------------------------------------------- */
      {
        label: '9.0 · SUMMARY',
        cues: [
          'Ringkasnya.',
          'Setup bukan strategi. Strategi memerlukan SOP dengan peraturan yang jelas.',
          'Scalping, intraday dan swing memerlukan SOP yang berbeza.',
          'Aliran CMI: konteks, gaya, struktur dan liquidity, POI, pengesahan, perancangan, pelaksanaan dan jurnal.',
          'Bina carta tanpa melihat masa depan, dan kira risiko daripada stop-loss, bukan daripada margin.'
        ],
        build(S, C) {
          S.heading('KEY LEARNING POINTS', 'Video 01 — what to remember', S.at(0, -.3));
          S.bullets(['A setup is not a strategy — an SOP has explicit rules', 'Scalping · Intraday · Swing need different SOPs', 'Context → Style → Structure & Liquidity → POI → Confirmation → Plan → Execute → Journal', 'Decide without hindsight · risk from the stop, not the margin'],
            60, 190, 1750, [S.at(1), S.at(2), S.at(3), S.at(4)], { check: true, size: 32 });
        }
      },
      /* 15 ----------------------------------------------------------- */
      {
        label: '9.0 · EXERCISE',
        cues: [
          'Latihan untuk video ini.',
          'Pertama, pilih satu gaya trading yang paling sesuai dengan masa, modal dan keupayaan pemantauan anda, dan tulis sebab pilihan itu.',
          'Kedua, tulis draf SOP satu halaman mengikut lapan peringkat aliran kerja CMI. Kita akan memperhalusinya dalam video seterusnya.'
        ],
        build(S, C) {
          S.heading('PRACTICAL ASSIGNMENT', 'Exercise 0 · Your first SOP draft', S.at(0, -.3));
          S.el('<div class="num">STEP 1</div><div class="ct">Choose one style</div><div class="cb">Match it to your available screen time, capital and ability to monitor positions. Write down why.</div>', { x: 60, y: 190, w: 880, h: 300, cls: 'card' }, { at: S.at(1) });
          S.el('<div class="num">STEP 2</div><div class="ct">Draft a one-page SOP</div><div class="cb">Use the eight CMI workflow stages as headings: context · style · structure & liquidity · POI · confirmation · plan · execution · journal.</div>', { x: 980, y: 190, w: 880, h: 300, cls: 'card' }, { at: S.at(2) });
        }
      },
      /* 16 ----------------------------------------------------------- */
      {
        label: 'UP NEXT',
        cues: ['Dalam Video 2, kita mula membina Scalping SOP: persediaan pra-pasaran, rangka timeframe, pemetaan liquidity dan pemilihan POI.'],
        hold: .8,
        build(S, C) {
          S.el('<div class="kicker">UP NEXT · VIDEO 02</div>', { x: 60, y: 40 }, { at: S.at(0, -.3) });
          S.el('<div class="h2">Scalping SOP · Preparation & Market Context</div>', { x: 60, y: 76, w: 1800 }, { at: S.at(0, -.2) });
          const t = [['1H / 30M', 'Context', C.blue], ['15M', 'Setup & location', C.poi], ['5M', 'Entry confirmation', C.green], ['1M', 'Optional · noisy', C.dim]];
          t.forEach((x, i) => S.el(`<div class="num" style="color:${x[2]}">${x[0]}</div><div class="ct">${x[1]}</div>`, { x: 60 + i * 455, y: 200, w: 420, h: 170, cls: 'card' }, { at: S.at(0, .6 + i * .5) }));
          S.bullets(['Pre-market preparation · PDH / PDL · session levels', 'Liquidity mapping · BSL · SSL · EQH · EQL', 'POI selection under CMI definitions'], 60, 430, 1700, [S.at(0, 3), S.at(0, 4), S.at(0, 5)], { size: 28 });
        }
      },
      /* 17 ----------------------------------------------------------- */
      {
        label: 'REFERENCES',
        cues: ['Rujukan untuk video ini dipaparkan di skrin. Sila semak spesifikasi kontrak terkini daripada Bursa Malaysia Derivatives.'],
        hold: 2,
        build(S, C) {
          S.el('<div class="kicker">REFERENCES · RUJUKAN</div>', { x: 60, y: 40 }, { at: S.at(0, -.3) });
          S.el('<div class="h3">Primary reading for this video</div>', { x: 60, y: 74 }, { at: S.at(0, -.2) });
          const R = [
            ['Bursa Malaysia Derivatives — Crude Palm Oil Futures (FCPO) contract specifications', 'Contract size · tick · hours'],
            ['Larry Harris — Trading and Exchanges: Market Microstructure for Practitioners (OUP, 2003)', 'Orders · execution · costs'],
            ['John J. Murphy — Technical Analysis of the Financial Markets (NYIF, 1999)', 'Trend · structure · multi-timeframe'],
            ['Kirkpatrick & Dahlquist — Technical Analysis: The Complete Resource (3rd ed., 2015)', 'Testing · risk · evaluation'],
            ['CME Group Education — futures contract specifications, margin & order types', 'Margin vs risk'],
            ['ICT (Inner Circle Trader) original educational materials · CMI SMC Levels 1–8', 'SMC terminology (CMI definitions)']
          ];
          R.forEach((r, i) => S.el(`<div style="display:flex;justify-content:space-between;align-items:center;width:100%"><span style="display:flex;gap:22px"><span class="mono" style="color:#e8b44c;font-size:20px">0${i + 1}</span><span style="font:600 24px Inter">${r[0]}</span></span><span class="small" style="font-size:19px">${r[1]}</span></div>`, { x: 60, y: 160 + i * 82, w: 1800, h: 66, cls: 'panel', style: 'display:flex;align-items:center;padding:0 26px' }, { at: S.at(0, .4 + i * .35) }));
        }
      },
      /* 18 ----------------------------------------------------------- */
      {
        label: 'DISCLAIMER',
        cues: ['Trading futures melibatkan risiko kerugian. Jumpa dalam Video 2.'],
        hold: 2.2,
        build(S, C) {
          S.el(`<div style="text-align:center"><div style="font-size:42px;color:#e8b44c">⚠</div><div class="kicker" style="margin-top:10px">PENAFIAN · DISCLAIMER</div>
            <div class="body" style="margin-top:22px;font-size:27px;color:#e3e9f2">Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian, termasuk melebihi jangkaan akibat gap dan slippage.</div>
            <div class="small" style="margin-top:22px;font-size:20px">Semua harga FCPO dalam video ini adalah ilustrasi hipotetikal. Semak spesifikasi kontrak terkini dengan Bursa Malaysia Derivatives.</div></div>`,
            { x: 460, y: 170, w: 1000, h: 420, cls: 'panel', style: 'border-color:#e8b44c66;display:flex;align-items:center;padding:40px 60px' }, { at: S.at(0, -.3) });
          S.el('<div class="small" style="text-align:center;width:1920px">Seterusnya: Video 02 — Scalping SOP · Preparation & Market Context</div>', { x: 0, y: 640 }, { at: S.at(0, 1) });
        }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
