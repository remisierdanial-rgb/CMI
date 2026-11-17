/* VIDEO 14 — Complete Level 6 Workflow · Integrated Case Study. Illustrative FCPO-style prices only.
 * Numbers (verified in PHASE-1-2 doc, Julat C): range 4,520–4,880, EQ 4,700, OTE 0.62 4,656.8 / 0.705 4,626.2 / 0.79 4,595.6,
 * bullish OB body 4,610–4,635, EQL/SSL ~4,600, sweep 4,592, entry 4,630, invalidation 4,575, target 4,880 → risk 55, reward 250, ≈1:4.5. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const F = T.fib;
  const base = [[0, 4600], [2, 4655], [5, 4520], [7, 4598], [11, 4730], [16, 4780], [19, 4760], [24, 4880], [29, 4740], [32, 4772], [38, 4601], [41, 4650], [45, 4603], [47, 4600]];
  const build = (tail, seed) => {
    let d = gen([...base, ...tail], seed);
    d = T.patch(d, 8, [[4635, 4640, 4606, 4610], [0, 4690, 4612, 4684], [0, 4722, 4680, 4718]]);   // OB 4,610–4,635 + displacement (FVG 4,640–4,680)
    d = T.patch(d, 38, [[null, 4622, 4601, 4614]]);
    d = T.patch(d, 45, [[null, 4624, 4603, 4615]]);
    d = T.patch(d, 47, [[4612, 4618, 4592, 4616]]);                                                    // sweep candle
    return d;
  };
  const DA = build([[50, 4664], [53, 4628], [64, 4880]], 191);
  const DB = build([[50, 4628], [52, 4612], [56, 4570], [60, 4548]], 191);
  const RNG = { hi: 4880, lo: 4520, eq: 4700 };
  const scenes = [];
  const common = { pmin: 4480, pmax: 4920, step: 50, slots: 66, title: 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION' };
  const obZ = (S, a, i1 = 64) => ovl.zone(S, 4610, 4635, 7.6, i1, C.bull, { alpha: .22, op: a, stroke: true });
  const fvZ = (S, a, i1 = 64) => ovl.zone(S, 4640, 4680, 8, i1, C.bull, { alpha: .1, op: a, stroke: true, dash: '4 4' });
  const eql = (S, a) => ovl.hl(S, 4601, 38, 64, C.cyan, { dash: '6 5', op: a, w: 2 }) + tag(S.xs(64), S.ys(4601) + 18, 'EQL ~4,600 · SSL', C.cyan, { anchor: 'end', op: a, fs: 12 });
  const bsl = (S, a) => ovl.hl(S, 4880, 24, 64, C.cyan, { dash: '6 5', op: a, w: 2 }) + tag(S.xs(64), S.ys(4880) - 18, 'OLD HIGH 4,880 · BSL', C.cyan, { anchor: 'end', op: a, fs: 12 });
  const step = (n, title, lines, chartO, side) => T.chart({ label: `STEP ${n} · ${title}`, lines, chart: Object.assign({}, common, chartO), side });

  scenes.push(T.title({
    no: '14', sub: 'INTEGRATED CASE STUDY', title: 'Complete Level 6 Workflow', tagline: 'Ten steps · two outcomes · one decision process',
    objectives: ['Apply all six subtopics in sequence', 'Plan entry, invalidation and target', 'Compare a setup that develops with one that fails', 'Review decisions, not just outcomes'],
    lines: [
      ['Selamat datang ke video terakhir Level 6: kajian kes bersepadu.', 'Welcome to the final video of Level 6: the integrated case study.'],
      ['Kita akan menggunakan keenam-enam subtopik dalam sepuluh langkah, pada satu carta FCPO ilustrasi.', 'We will apply all six subtopics in ten steps, on one illustrative FCPO chart.'],
      ['Carta ini hipotetikal. Ia bukan data sejarah dan bukan peristiwa pasaran sebenar. Dan kita akan melihat dua hasil: satu setup yang berkembang, dan satu yang gagal.',
        'This chart is hypothetical. It is not historical data and not an actual market event. And we will see two outcomes: one setup that develops, and one that fails.']
    ],
    illus: (t, L) => {
      const b = P(t, L[1], 2), X = 1150;
      return ['DIRECTION', 'RANGE', 'EQ', 'P/D', 'PD ARRAYS', 'LIQUIDITY', 'OTE', 'CONFIRM', 'PLAN', 'REVIEW'].map((s, k) =>
        `<rect x="${X + 20 + (k % 2) * 330}" y="${410 + Math.floor(k / 2) * 72}" width="310" height="56" rx="6" fill="#0a1226" stroke="${C.gold}" stroke-width="1.4" opacity="${P(b, k * .09, .1)}"/>` +
        txt(X + 40 + (k % 2) * 330, 445 + Math.floor(k / 2) * 72, `${String(k + 1).padStart(2, '0')}  ${s}`, { col: '#fff', fs: 17, fw: 600, op: P(b, k * .09, .1) })).join('');
    }
  }));

  scenes.push(step(1, 'MARKET DIRECTION', [
    ['Langkah satu: arah pasaran. Pada higher timeframe, harga membuat higher highs dan memecahkan swing high 4,655 dengan displacement.',
      'Step one: market direction. On the higher timeframe, price makes higher highs and breaks the 4,655 swing high with displacement.'],
    ['Rally berterusan hingga 4,880. Struktur bullish. Jadi kita mengkaji sisi bullish, mencari peluang membeli di lokasi yang menguntungkan.',
      'The rally continues to 4,880. Structure is bullish. So we study the bullish side, looking for a buying opportunity at a favourable location.']
  ], {
    data: DA, n: c => 3 + 22 * P(c.t, c.at([0, 0]), 6), tag: 'HTF: BULLISH',
    ov: (S, c) => ovl.hl(S, 4655, 2, 10, C.mute, { dash: '5 4', op: c.p([0, 3]) }) + tag(S.xs(2), S.ys(4655) - 22, 'SWING HIGH 4,655', C.mute, { op: c.p([0, 3]), fs: 12 }) +
      tag(S.xs(10), S.ys(4655) + 24, 'BOS', C.bull, { op: c.p([0, 5]), fs: 12 }) + tag(S.xs(24), S.ys(4880) - 24, 'HH 4,880', C.bull, { op: c.p([1, 0]), fs: 12 })
  }, { kicker: 'STEP 1', title: 'Market direction', items: [[[0, 0], 'Higher highs'], [[0, 4], 'BOS above 4,655 with displacement'], [[1, 2], 'Study the bullish side']] }));

  scenes.push(step('2–3', 'DEALING RANGE & EQUILIBRIUM', [
    ['Langkah dua: dealing range. Swing low yang bermakna ialah 4,520, permulaan displacement. Swing high yang bermakna ialah 4,880.',
      'Step two: the dealing range. The meaningful swing low is 4,520, the start of the displacement. The meaningful swing high is 4,880.'],
    ['Langkah tiga: equilibrium. 4,880 tambah 4,520 ialah 9,400. Bahagi dua, 4,700.', 'Step three: equilibrium. 4,880 plus 4,520 is 9,400. Divided by two, 4,700.']
  ], {
    data: DA, n: 25, tag: 'RANGE 4,520–4,880',
    ov: (S, c) => T.rangeOv(S, 4880, 4520, 5, c.p([0, 2], 1), { noEq: true, i1: 64 }) + ovl.hl(S, 4700, 5, 64, C.amber, { dash: '8 6', w: 2, prog: c.p([1, 0], 1) }) +
      tag(S.xs(64), S.ys(4700) - 18, 'EQ 4,700', C.amber, { anchor: 'end', op: c.p([1, 1]), fs: 13 })
  }, { kicker: 'STEPS 2–3', title: 'Range &amp; equilibrium', items: [[[0, 0], 'Low 4,520 · high 4,880'], [[0, 4], 'Range: 360 points'], [[1, 0], 'EQ = (4,880 + 4,520) ÷ 2'], [[1, 3], '= 4,700']] }));

  scenes.push(step(4, 'PREMIUM / DISCOUNT', [
    ['Langkah empat: lokasi. Harga retrace dari 4,880 dan kini berdagang sekitar 4,603, di bawah equilibrium. Ini discount.',
      'Step four: location. Price retraces from 4,880 and now trades around 4,603, below equilibrium. This is discount.'],
    ['Peratus kedudukan: 4,603 tolak 4,520 ialah 83. 83 bahagi 360 ialah kira-kira 23 peratus. Lokasi discount yang dalam.',
      'Range position: 4,603 minus 4,520 is 83. 83 divided by 360 is about 23 percent. A deep discount location.']
  ], {
    data: DA, n: c => 25 + 21 * P(c.t, c.at([0, 0]), 5), tag: 'LOCATION: DISCOUNT',
    under: (S, c) => T.pdZones(S, RNG.hi, RNG.lo, 5, 1, { i1: 64 }),
    ov: (S, c) => T.rangeOv(S, 4880, 4520, 5, 1, { i1: 64 }) + dot(S.xs(45), S.ys(4603), '#fff', c.p([1, 0]), 7) + tag(S.xs(45), S.ys(4603) + 26, '4,603 · ~23%', '#ffffff', { op: c.p([1, 0]), fs: 12 })
  }, { kicker: 'STEP 4', title: 'Premium / discount', items: [[[0, 0], 'Price below EQ → discount'], [[1, 0], '(4,603 − 4,520) ÷ 360 ≈ 23%'], [[1, 4], 'Location only, not a signal', 'r']] }));

  scenes.push(step(5, 'PD ARRAYS', [
    ['Langkah lima: PD Arrays. Sebelum displacement awal, candle down-close terakhir ialah order block bullish, body 4,610 hingga 4,635.',
      'Step five: PD Arrays. Before the early displacement, the last down-close candle is a bullish order block, body 4,610 to 4,635.'],
    ['Displacement yang sama meninggalkan fair value gap, 4,640 hingga 4,680. Kedua-duanya daripada peristiwa yang sama, jadi kita anggap sebagai satu kawasan minat.',
      'The same displacement left a fair value gap, 4,640 to 4,680. Both come from the same event, so we treat them as one area of interest.'],
    ['Perhatikan juga: walaupun harga menyentuh 4,601 dan 4,603, body candle tidak close di bawah 4,610. Order block itu masih utuh.',
      'Notice also: although price touched 4,601 and 4,603, no candle body closed below 4,610. The order block is still intact.']
  ], {
    data: DA, n: 46, tag: 'OB + FVG · ONE EVENT',
    under: (S, c) => obZ(S, c.p([0, 2])) + fvZ(S, c.p([1, 0])),
    ov: (S, c) => tag(S.xs(30), S.ys(4610) + 22, 'BULLISH OB 4,610–4,635', C.bull, { op: c.p([0, 2]), fs: 12 }) + tag(S.xs(30), S.ys(4680) - 16, 'FVG 4,640–4,680 · SAME DISPLACEMENT', C.bull, { op: c.p([1, 0]), fs: 12 }) +
      tag(S.xs(41), S.ys(4560), 'NO BODY CLOSE < 4,610 → INTACT', C.gold, { op: c.p([2, 2]), fs: 12 })
  }, { kicker: 'STEP 5', title: 'PD Arrays', items: [[[0, 0], 'Bullish OB 4,610–4,635'], [[1, 0], 'FVG from the same displacement'], [[1, 5], 'One area of interest'], [[2, 0], 'OB intact: no body close below']] }));

  scenes.push(step(6, 'LIQUIDITY', [
    ['Langkah enam: liquidity. Dua low di sekitar 4,600 membentuk relatively equal lows. Sell-side liquidity diandaikan berada di bawahnya.',
      'Step six: liquidity. Two lows around 4,600 form relatively equal lows. Sell-side liquidity is assumed to rest below them.'],
    ['Di atas, old high 4,880 menyimpan buy-side liquidity. Ini external range liquidity, objektif logik jika struktur bullish berterusan.',
      'Above, the 4,880 old high holds buy-side liquidity. This is external range liquidity, a logical objective if bullish structure continues.']
  ], {
    data: DA, n: 46, tag: 'SSL BELOW · BSL ABOVE', under: (S, c) => obZ(S, .6),
    ov: (S, c) => eql(S, c.p([0, 0])) + dot(S.xs(38), S.ys(4601), C.cyan, c.p([0, 1]), 6) + dot(S.xs(45), S.ys(4603), C.cyan, c.p([0, 1]), 6) + bsl(S, c.p([1, 0]))
  }, { kicker: 'STEP 6', title: 'Liquidity', items: [[[0, 0], 'Equal lows ~4,600 → SSL below'], [[1, 0], 'Old high 4,880 → BSL above'], [[1, 4], 'External liquidity = objective']] }));

  scenes.push(step(7, 'FIBONACCI OTE', [
    ['Langkah tujuh: OTE. Anchor Fibonacci pada leg bullish, dari low 4,520 ke high 4,880.', 'Step seven: OTE. Anchor Fibonacci on the bullish leg, from the 4,520 low to the 4,880 high.'],
    ['0.62 berada di 4,656.8. 0.705 di 4,626.2. 0.79 di 4,595.6. Order block 4,610 hingga 4,635 berada di dalam zon OTE, berhampiran 0.705.',
      '0.62 sits at 4,656.8. 0.705 at 4,626.2. 0.79 at 4,595.6. The order block, 4,610 to 4,635, sits inside the OTE zone, near 0.705.'],
    ['Ingat, OTE dan discount datang daripada range yang sama. Ia satu bacaan lokasi, bukan dua confluence.', 'Remember, OTE and discount come from the same range. They are one location reading, not two confluences.']
  ], {
    data: DA, n: 46, tag: 'OTE 4,595.6–4,656.8', under: (S, c) => obZ(S, .7),
    ov: (S, c) => T.fibOv(S, 4520, 4880, 5, 54, c.p([0, 2], .8), [0, .5, .62, .705, .79, 1], { noLabel: true }) + tag(S.xs(54) - 4, S.ys(F(4520, 4880, .705)) + 1, 'OTE', C.amber, { anchor: 'end', op: c.p([1, 0]), fs: 13 })
  }, { kicker: 'STEP 7', title: 'Fibonacci OTE', items: [[[0, 0], 'Anchor low 4,520 → high 4,880'], [[1, 0], '0.62 · 4,656.8'], [[1, 2], '0.705 · 4,626.2'], [[1, 4], '0.79 · 4,595.6'], [[2, 0], 'OTE + discount = one reading', 'r']] }));

  scenes.push(step(8, 'CONFIRMATION', [
    ['Langkah lapan: confirmation. Setakat ini, kita hanya ada lokasi dan kawasan. Kita belum ada sebab untuk masuk.', 'Step eight: confirmation. So far, we only have location and area. We do not yet have a reason to enter.'],
    ['Harga kemudian menyapu equal lows, dengan wick hingga 4,592, dan close semula di 4,616, masih di dalam body order block, di atas 4,610.', 'Price then sweeps the equal lows, with a wick down to 4,592, and closes back at 4,616, still inside the order block body, above 4,610.'],
    ['Confirmation yang kita tunggu: displacement ke atas yang memecahkan high dalaman 4,650. Di sini, harga melakukannya. Ini bullish structure shift.',
      'The confirmation we wait for: an upward displacement that breaks the internal high at 4,650. Here, price does exactly that. This is a bullish structure shift.']
  ], {
    data: DA, n: c => 46 + 2 * P(c.t, c.at([1, 0]), 1.5) + 3 * P(c.t, c.at([2, 0]), 2), tag: 'SWEEP → STRUCTURE SHIFT', under: (S, c) => obZ(S, .7),
    ov: (S, c) => eql(S, 1) + tag(S.xs(47), S.ys(4592) + 24, 'SWEEP 4,592', C.cyan, { op: c.p([1, 1]), fs: 12 }) +
      ovl.hl(S, 4650, 41, 52, C.gold, { dash: '5 4', op: c.p([2, 0]) }) + tag(S.xs(41), S.ys(4650) - 22, 'INTERNAL HIGH 4,650', C.gold, { op: c.p([2, 0]), fs: 12 }) +
      tag(S.xs(50), S.ys(4664) - 26, 'BULLISH SHIFT ✓', C.bull, { op: c.p([2, 4]), fs: 12 })
  }, { kicker: 'STEP 8', title: 'Confirmation', items: [[[0, 0], 'Location + area ≠ entry reason', 'r'], [[1, 0], 'SSL swept to 4,592'], [[1, 4], 'Close back inside OB'], [[2, 0], 'Break of 4,650 with displacement'], [[2, 5], 'Bullish structure shift']] }));

  scenes.push(step(9, 'EXECUTION PLANNING', [
    ['Langkah sembilan: rancangan execution. Entry ilustrasi di 4,630, apabila harga retrace ke order block selepas structure shift.',
      'Step nine: execution planning. An illustrative entry at 4,630, when price retraces into the order block after the structure shift.'],
    ['Invalidation di 4,575, di bawah sweep low 4,592. Jika harga sampai ke situ, idea ini salah.', 'Invalidation at 4,575, below the 4,592 sweep low. If price gets there, the idea is wrong.'],
    ['Target logik: old high 4,880, di mana buy-side liquidity berada.', 'Logical target: the 4,880 old high, where buy-side liquidity rests.'],
    ['Risiko: 4,630 tolak 4,575 ialah 55 mata. Potensi: 4,880 tolak 4,630 ialah 250 mata. Risk-to-reward kira-kira 1 kepada 4.5.',
      'Risk: 4,630 minus 4,575 is 55 points. Potential: 4,880 minus 4,630 is 250 points. Risk to reward of about 1 to 4.5.'],
    ['Dan sebab untuk tidak masuk: jika structure shift tidak berlaku, jika harga close di bawah order block, atau jika entry hanya tersedia jauh lebih tinggi sehingga risk-to-reward rosak.',
      'And reasons not to enter: if the structure shift does not occur, if price closes below the order block, or if entry is only available much higher, which ruins the risk to reward.']
  ], {
    data: DA, n: c => 51 + 3 * P(c.t, c.at([0, 0]), 2), tag: 'PLAN · ILLUSTRATIVE',
    under: (S, c) => obZ(S, .6) + ovl.zone(S, 4575, 4630, 53, 60, C.bear, { alpha: .2, op: c.p([1, 0]) }) + ovl.zone(S, 4630, 4880, 53, 60, C.bull, { alpha: .15, op: c.p([2, 0]) }),
    ov: (S, c) => ovl.hl(S, 4630, 53, 60, '#fff', { op: c.p([0, 1]) }) + tag(S.xs(60) + 6, S.ys(4630), 'ENTRY 4,630', '#ffffff', { anchor: 'start', op: c.p([0, 1]), fs: 12 }) +
      tag(S.xs(60) + 6, S.ys(4575), 'STOP 4,575', C.bear, { anchor: 'start', op: c.p([1, 0]), fs: 12 }) + tag(S.xs(60) + 6, S.ys(4880), 'TARGET 4,880', C.cyan, { anchor: 'start', op: c.p([2, 0]), fs: 12 })
  }, {
    kicker: 'STEP 9', title: 'Execution plan', items: [[[0, 0], 'Entry 4,630 on retrace into OB'], [[1, 0], 'Invalidation 4,575'], [[2, 0], 'Target 4,880 (BSL)']],
    foot: c => `<div class="mono" style="font-size:19px;color:#e8ecf4;opacity:${c.p([3, 0])}">Risk 55 : Reward 250 ≈ <span style="color:#25a198">1 : 4.5</span></div>
      <div class="warn" style="position:relative;margin-top:14px;font-size:17px;opacity:${c.p([4, 0])}"><b>Do not execute if:</b> no shift · close below OB · entry only far higher.</div>`
  }));

  scenes.push(T.two({
    label: 'OUTCOMES · A DEVELOPS · B FAILS',
    lines: [
      ['Sekarang dua hasil yang mungkin daripada analisis yang sama.', 'Now two possible outcomes from the same analysis.'],
      ['Senario A: sweep diikuti structure shift. Harga retrace ke 4,628, entry di 4,630 diisi, dan harga naik ke target 4,880. Setup berkembang seperti yang dirancang.',
        'Scenario A: the sweep is followed by a structure shift. Price retraces to 4,628, the 4,630 entry fills, and price rallies to the 4,880 target. The setup develops as planned.'],
      ['Senario B: selepas sweep, harga hanya melantun ke 4,628. Ia tidak pernah memecahkan 4,650. Tiada confirmation, jadi tiada entry.',
        'Scenario B: after the sweep, price only bounces to 4,628. It never breaks 4,650. No confirmation, so no entry.'],
      ['Kemudian harga close di bawah order block dan jatuh di bawah 4,575. Trader yang masuk lebih awal, tanpa confirmation, akan rugi 55 mata. Trader yang berdisiplin tidak masuk langsung.',
        'Then price closes below the order block and falls below 4,575. A trader who entered early, without confirmation, would lose 55 points. The disciplined trader never entered.']
    ],
    a: { data: DA, pmin: 4480, pmax: 4920, step: 50, slots: 66, reveal: [1, 0], revealDur: 6, title: 'SCENARIO A · HYPOTHETICAL', tag: 'DEVELOPS → TARGET',
      under: (S, c) => obZ(S, .7) + ovl.zone(S, 4575, 4630, 53, 64, C.bear, { alpha: .18 }) + ovl.zone(S, 4630, 4880, 53, 64, C.bull, { alpha: .12 }),
      ov: (S, c) => bsl(S, 1) + tag(S.xs(60), S.ys(4880) + 24, '✓ TARGET REACHED', C.bull, { op: c.p([1, 6]), fs: 13 }) },
    b: { data: DB, pmin: 4480, pmax: 4920, step: 50, slots: 66, reveal: [2, 0], revealDur: 6, show: [2, 0], title: 'SCENARIO B · HYPOTHETICAL', tag: 'NEVER CONFIRMS → NO ENTRY',
      under: (S, c) => obZ(S, .7),
      ov: (S, c) => ovl.hl(S, 4650, 41, 60, C.gold, { dash: '5 4' }) + tag(S.xs(41), S.ys(4650) - 22, '4,650 NEVER BROKEN', C.gold, { fs: 12 }) +
        ovl.hl(S, 4575, 40, 60, C.bear, { dash: '6 4', op: c.p([3, 0]) }) + tag(S.xs(58), S.ys(4548) + 26, '✗ BELOW 4,575 · NO ENTRY TAKEN', C.bear, { op: c.p([3, 2]), fs: 12 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([3, 6])}"><b>Same analysis, different outcomes.</b> The process decided when to act; the market decided the result.</div>`
  }));

  scenes.push(T.cards({
    label: 'STEP 10 · POST-TRADE EVALUATION', kicker: 'STEP 10', title: 'Post-trade evaluation',
    lines: [
      ['Langkah sepuluh: penilaian selepas trade. Nilai analisis tanpa mengira sama ada hasilnya untung atau rugi.', 'Step ten: post-trade evaluation. Review the analysis regardless of whether the outcome was a win or a loss.'],
      ['Untuk senario A: adakah setiap langkah diikuti? Adakah entry, invalidation dan target mengikut rancangan? Jika ya, ia keputusan yang baik, bukan hanya hasil yang baik.',
        'For scenario A: was every step followed? Did the entry, invalidation and target follow the plan? If so, it was a good decision, not just a good result.'],
      ['Untuk senario B: tiada entry kerana tiada confirmation. Itu juga keputusan yang betul, walaupun tiada keuntungan.', 'For scenario B: there was no entry because there was no confirmation. That was also a correct decision, even without a profit.'],
      ['Dan jika seseorang masuk awal dan rugi, soalannya bukan "kenapa pasaran salah", tetapi "langkah mana yang saya langkau".', 'And if someone entered early and lost, the question is not why the market was wrong, but which step did I skip.']
    ],
    cards: [
      { x: 60, y: 220, w: 580, h: 420, at: [1, 0], col: '#25a198', kick: 'SCENARIO A', kc: '#25a198', head: 'Process followed · target reached', html: c => ['Every step completed', 'Entry, stop, target per plan', 'Good decision AND good result'].map((s, k) => E.chk(28, 140 + k * 60, s, c.p([1, 2 + k]), true, 21)).join('') },
      { x: 670, y: 220, w: 580, h: 420, at: [2, 0], col: '#d7b256', kick: 'SCENARIO B', head: 'No confirmation · no entry', html: c => ['Waited for the shift', 'Shift never came', 'Good decision, no result needed'].map((s, k) => E.chk(28, 140 + k * 60, s, c.p([2, 1 + k]), true, 21)).join('') },
      { x: 1280, y: 220, w: 580, h: 420, at: [3, 0], col: '#e54f4d', kick: 'EARLY ENTRY', kc: '#e54f4d', head: 'Which step was skipped?', html: c => ['Entered before confirmation', 'Lost 55 points at 4,575', 'Fix the process, not the market'].map((s, k) => E.chk(28, 140 + k * 60, s, c.p([3, 1 + k]), k === 2 ? true : false, 21)).join('') }
    ],
    warn: { at: [3, 5], y: 680, s: '<b>Judge decisions, not outcomes.</b> A good decision can lose; a poor decision can win. The process is what you control.' }
  }));

  scenes.push(T.summary({
    title: 'Level 6',
    lines: [
      ['Mari rumuskan keseluruhan Level 6.', 'Let us summarise the whole of Level 6.'],
      ['Dealing range dan equilibrium menentukan lokasi. Premium dan discount ialah konteks, bukan isyarat. OTE ialah zon retracement, bukan entry automatik.',
        'The dealing range and equilibrium define location. Premium and discount are context, not signals. OTE is a retracement zone, not an automatic entry.'],
      ['PD Arrays mesti dipilih dengan kriteria. Confluence dikira mengikut kumpulan bukti bebas, bukan label.', 'PD Arrays must be selected with criteria. Confluence is counted by independent evidence groups, not labels.'],
      ['Location Before Execution. Higher Timeframe Before Lower Timeframe. Confluence Without Overcomplication. Dan tidak trade sentiasa merupakan pilihan yang sah.',
        'Location Before Execution. Higher Timeframe Before Lower Timeframe. Confluence Without Overcomplication. And no trade is always a valid choice.']
    ],
    items: [[[1, 0], 'Range + EQ define location'], [[1, 3], 'P/D and OTE are not signals'], [[2, 0], 'Select PD Arrays with criteria'], [[2, 3], 'Count independent evidence'],
      [[3, 0], 'Location · HTF first · no overcomplication'], [[3, 6], 'No trade is always valid']]
  }));

  scenes.push(T.quiz([
    ['Range 4,520–4,880. Calculate equilibrium and the 0.705 level.', 'EQ = (4,880 + 4,520) ÷ 2 = 4,700. 0.705 = 4,880 − 0.705 × 360 = 4,880 − 253.8 = 4,626.2.',
      'range 4,520 hingga 4,880. Kira equilibrium dan aras 0.705.', 'equilibrium 4,700. Aras 0.705 ialah 4,880 tolak 253.8, iaitu 4,626.2.',
      'The range is 4,520 to 4,880. Calculate equilibrium and the 0.705 level.', 'Equilibrium is 4,700. The 0.705 level is 4,880 minus 253.8, which is 4,626.2.'],
    ['Entry 4,630, invalidation 4,575, target 4,880. What is the risk-to-reward?', 'Risk 55, reward 250. 250 ÷ 55 ≈ 4.5, so about 1 : 4.5.',
      'entry 4,630, invalidation 4,575, target 4,880. Apakah risk-to-reward?', 'risiko 55, reward 250. 250 bahagi 55 lebih kurang 4.5, jadi kira-kira 1 kepada 4.5.',
      'Entry 4,630, invalidation 4,575, target 4,880. What is the risk to reward?', 'Risk 55, reward 250. 250 divided by 55 is about 4.5, so roughly 1 to 4.5.'],
    ['In scenario B, why was no trade taken even though location and area were favourable?', 'The confirmation, a break of 4,650 with displacement, never occurred. Location and area alone are not an entry reason.',
      'dalam senario B, mengapa tiada trade walaupun lokasi dan kawasan menguntungkan?', 'confirmation, iaitu penembusan 4,650 dengan displacement, tidak pernah berlaku. Lokasi dan kawasan sahaja bukan sebab untuk entry.'],
    ['Why should post-trade evaluation focus on decisions rather than outcomes?', 'Outcomes include randomness. A sound process can lose and a poor one can win. Only the process is under your control and can be improved.',
      'mengapa penilaian selepas trade perlu fokus pada keputusan, bukan hasil?', 'hasil mengandungi unsur rawak. Proses yang baik boleh rugi, dan proses yang lemah boleh untung. Hanya proses yang di bawah kawalan anda dan boleh diperbaiki.']
  ]));

  scenes.push(T.exercise({
    title: 'Your own Level 6 case study',
    lines: [
      ['Latihan akhir: lengkapkan kajian kes anda sendiri pada carta FCPO, menggunakan sepuluh langkah ini.', 'Final exercise: complete your own case study on an FCPO chart, using these ten steps.'],
      ['Tulis setiap langkah sebelum harga bergerak: arah, range, equilibrium, lokasi, PD Arrays, liquidity, OTE, confirmation yang ditunggu, dan rancangan.',
        'Write each step before price moves: direction, range, equilibrium, location, PD Arrays, liquidity, OTE, the confirmation you are waiting for, and the plan.'],
      ['Selepas itu, lengkapkan langkah sepuluh: nilai keputusan anda, dan kenal pasti satu perkara untuk diperbaiki.', 'Afterwards, complete step ten: evaluate your decision, and identify one thing to improve.']
    ],
    steps: [[[1, 0], 'Steps 1–4: direction, range, equilibrium, location'], [[1, 4], 'Steps 5–7: PD Arrays, liquidity, OTE'], [[1, 8], 'Step 8: write the exact confirmation you need'], [[1, 11], 'Step 9: entry, invalidation, target, R:R'], [[2, 0], 'Step 10: evaluate the decision, improve one thing']]
  }));

  scenes.push(T.refs(['ict', 'murphy', 'harris', 'emb'], 'Kajian kes ini hipotetikal sepenuhnya. Ia tidak mewakili peristiwa pasaran FCPO sebenar.',
    'This case study is entirely hypothetical. It does not represent an actual FCPO market event.', 'All prices in this case study are illustrative. No historical FCPO data was used. FCPO contract specifications should be verified with Bursa Malaysia.'));
  scenes.push(T.disclaimer(null));
  registerVideo({ id: 'v14', title: 'VIDEO 14 — INTEGRATED CASE STUDY', scenes });
})();
