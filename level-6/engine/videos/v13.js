/* VIDEO 13 — Conflicting Confluences & No-Trade Conditions. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const fvgB = [[4630, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]];
  const D_h = gen([[0, 4640], [4, 4600], [18, 4800], [28, 4702]], 181);
  const D_l = gen([[0, 4760], [6, 4735], [9, 4748], [15, 4718], [18, 4730], [24, 4702]], 182, { noise: .5, floor: .8, wfloor: 1.5, eps: .5 });
  const D_ds = gen([[0, 4640], [4, 4600], [16, 4800], [22, 4730], [25, 4752], [31, 4672], [34, 4690], [40, 4630], [43, 4648], [48, 4610]], 183);
  const D_nc = T.patch(gen([[0, 4640], [4, 4600], [8, 4628], [12, 4705], [20, 4800], [28, 4690], [31, 4655], [33, 4664], [35, 4650], [37, 4662], [39, 4652], [45, 4594]], 184), 9, fvgB);
  const D_sw = gen([[0, 4700], [5, 4650], [10, 4690], [15, 4652], [19, 4680], [23, 4638], [25, 4658], [33, 4596]], 185);
  const D_rr = gen([[0, 4640], [4, 4600], [18, 4800], [24, 4710], [27, 4730], [33, 4606], [38, 4672]], 186);
  const scenes = [];

  scenes.push(T.title({
    no: '13', sub: 'SUBTOPIC ⑥', title: 'Conflicting Confluences', tagline: 'And when not to trade',
    objectives: ['Recognise five common conflicts', 'Decide between trade, wait and no trade', 'Know seven no-trade conditions', 'Treat no trade as a valid decision'],
    lines: [
      ['Selamat kembali. Dalam Video 13, kita melihat apa yang berlaku apabila bukti tidak bersetuju.', 'Welcome back. In Video 13, we look at what happens when the evidence does not agree.'],
      ['Anda akan mengenal pasti lima konflik yang biasa, dan memilih antara trade, menunggu, atau tidak trade.', 'You will recognise five common conflicts, and choose between trading, waiting, or not trading.'],
      ['Kita juga akan menyenaraikan tujuh keadaan no-trade. Ingat: tidak trade ialah keputusan analitikal yang sah.', 'We will also list seven no-trade conditions. Remember: not trading is a valid analytical decision.']
    ],
    illus: (t, L) => {
      const b = P(t, L[1], 1), X = 1160;
      return ['TRADE', 'WAIT', 'NO TRADE'].map((s, k) => `<rect x="${X + 40 + k * 210}" y="560" width="190" height="80" rx="8" fill="#0a1226" stroke="${[C.bull, C.gold, C.bear][k]}" stroke-width="2" opacity="${P(t, L[1] + k * .6, .5)}"/>` +
        txt(X + 135 + k * 210, 608, s, { anchor: 'middle', col: [C.bull, C.gold, C.bear][k], fs: 20, fw: 700, op: P(t, L[1] + k * .6, .5) })).join('') +
        `<path d="M${X + 340},460 L${X + 135},555 M${X + 340},460 L${X + 345},555 M${X + 340},460 L${X + 555},555" stroke="${C.mute}" stroke-width="2" opacity="${b}"/>` +
        `<circle cx="${X + 340}" cy="450" r="16" fill="${C.gold}" opacity="${P(t, L[0] + 1, .5)}"/>`;
    }
  }));

  scenes.push(T.two({
    label: '7.7 · CONFLICT ① · HTF VS LTF',
    lines: [
      ['Konflik satu: higher timeframe bullish, tetapi lower timeframe bearish.', 'Conflict one: the higher timeframe is bullish, but the lower timeframe is bearish.'],
      ['Pada satu jam, range bullish 4,600 hingga 4,800, dan harga sedang retrace ke arah equilibrium.', 'On one hour, a bullish range from 4,600 to 4,800, and price is retracing toward equilibrium.'],
      ['Pada lima minit, harga masih membuat lower highs dan lower lows. Belum ada tanda pembalikan.', 'On five minutes, price is still making lower highs and lower lows. There is no sign of reversal yet.'],
      ['Ini bukan masa untuk membeli secara buta. Tunggu lower timeframe selari dengan higher timeframe, atau tidak trade.', 'This is not the time to buy blindly. Wait for the lower timeframe to align with the higher timeframe, or do not trade.']
    ],
    a: { data: D_h, pmin: 4560, pmax: 4840, step: 50, slots: 34, reveal: [1, 0], revealDur: 3, title: 'FCPO · 1H · HYPOTHETICAL', tag: 'HTF: BULLISH',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, 1, { noLabel: true }), ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1) },
    b: { data: D_l, pmin: 4690, pmax: 4770, step: 10, slots: 28, reveal: [2, 0], revealDur: 4, show: [2, 0], title: 'FCPO · 5M · HYPOTHETICAL', tag: 'LTF: BEARISH',
      ov: (S, c) => ovl.path(S, [[0, 4760], [6, 4735], [9, 4748], [15, 4718], [18, 4730], [24, 4702]], C.bear, c.p([2, 3], 2), 2, .8) + tag(S.xs(9), S.ys(4748) - 24, 'LH', C.bear, { op: c.p([2, 3]), fs: 13 }) + tag(S.xs(18), S.ys(4730) - 24, 'LH', C.bear, { op: c.p([2, 4]), fs: 13 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([3, 0])}"><b>Decision: WAIT.</b> Let the lower timeframe align with the higher timeframe, or stand aside.</div>`
  }));

  scenes.push(T.chart({
    label: '7.7 · CONFLICT ② · DISCOUNT, BEARISH STRUCTURE',
    lines: [
      ['Konflik dua: harga berada di discount, tetapi struktur masih bearish.', 'Conflict two: price is in discount, but structure is still bearish.'],
      ['Dalam range 4,600 hingga 4,800, harga jatuh di bawah equilibrium. Tetapi lihat strukturnya: lower highs di 4,752, 4,690 dan 4,648, serta lower lows di 4,672 dan 4,630.',
        'In the 4,600 to 4,800 range, price falls below equilibrium. But look at the structure: lower highs at 4,752, 4,690 and 4,648, and lower lows at 4,672 and 4,630.'],
      ['Discount tidak membatalkan struktur bearish. Harga terus turun ke 4,610.', 'Discount does not override bearish structure. Price keeps falling to 4,610.'],
      ['Keputusan: jangan beli hanya kerana discount. Tunggu perubahan struktur, atau nilai semula dealing range.', 'Decision: do not buy just because of discount. Wait for a change in structure, or reassess the dealing range.']
    ],
    chart: {
      data: D_ds, pmin: 4570, pmax: 4830, step: 50, slots: 50, reveal: [0, 0], revealDur: 8, tag: 'DISCOUNT ≠ BULLISH',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, 1),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1, { i1: 49 }) + [[25, 4752, 1, 'LH'], [34, 4690, 1, 'LH'], [43, 4648, 1, 'LH'], [31, 4672, 0, 'LL'], [40, 4630, 0, 'LL']].map(m => tag(S.xs(m[0]), S.ys(m[1]) + (m[2] ? -24 : 24), m[3], C.bear, { op: c.p([1, 3]), fs: 13 })).join('')
    },
    side: { kicker: 'SUBTOPIC ⑥ · 7.7', title: 'Discount, bearish structure', items: [[[1, 0], 'Location: discount'], [[1, 3], 'Structure: lower highs, lower lows', 'r'], [[2, 0], 'Location does not override structure'], [[3, 0], 'Decision: wait or reassess']] }
  }));

  scenes.push(T.chart({
    label: '7.7 · CONFLICT ③ · ZONE WITHOUT CONFIRMATION',
    lines: [
      ['Konflik tiga: OTE bertindih dengan PD Array, tetapi tiada confirmation.', 'Conflict three: the OTE overlaps a PD Array, but there is no confirmation.'],
      ['Harga memasuki fair value gap bullish, di dalam OTE, di discount. Semuanya kelihatan baik.', 'Price enters the bullish fair value gap, inside the OTE, in discount. Everything looks good.'],
      ['Tetapi harga hanya bergerak mendatar di dalam zon. Ia tidak pernah memecahkan high dalaman 4,690. Tiada structure shift.', 'But price only drifts sideways inside the zone. It never breaks the internal high at 4,690. There is no structure shift.'],
      ['Kemudian harga close di bawah gap dan jatuh ke 4,594. Trader yang menunggu confirmation tidak masuk, dan mengelak kerugian ini.', 'Then price closes below the gap and falls to 4,594. A trader waiting for confirmation never entered, and avoided this loss.']
    ],
    chart: {
      data: D_nc, pmin: 4570, pmax: 4830, step: 50, slots: 48, tag: 'NO CONFIRMATION → NO TRADE',
      n: c => 3 + 37 * P(c.t, c.at([0, 0]), 9) + 6 * P(c.t, c.at([3, 0]), 3),
      under: (S, c) => ovl.zone(S, 4642, 4676, 4, 46, C.amber, { alpha: .1 }) + ovl.zone(S, 4645, 4668, 9, 46, C.bull, { alpha: .18, stroke: true }),
      ov: (S, c) => tag(S.xs(46), S.ys(4668) - 14, 'FVG + OTE', C.bull, { anchor: 'end', fs: 12 }) + ovl.hl(S, 4690, 28, 46, C.gold, { dash: '5 4', op: c.p([2, 0]) }) +
        tag(S.xs(40), S.ys(4690) - 22, 'NEVER BROKEN 4,690', C.gold, { op: c.p([2, 2]), fs: 12 }) + tag(S.xs(43), S.ys(4594) + 24, '✗ CLOSED BELOW · AVOIDED', C.bear, { op: c.p([3, 3]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑥ · 7.7', title: 'Zone, no confirmation', items: [[[1, 0], 'FVG + OTE + discount'], [[2, 0], 'No structure shift', 'r'], [[3, 0], 'Waiting avoided the loss'], [[3, 4], 'Location ≠ confirmation']] }
  }));

  scenes.push(T.chart({
    label: '7.7 · CONFLICT ④ · SWEEP, THEN CONTINUATION',
    lines: [
      ['Konflik empat: liquidity disapu, tetapi harga meneruskan arah asal.', 'Conflict four: liquidity is swept, but price continues in the original direction.'],
      ['Equal lows sekitar 4,650 disapu hingga 4,638. Ramai menganggap ini isyarat reversal bullish.', 'Equal lows around 4,650 are swept down to 4,638. Many treat this as a bullish reversal signal.'],
      ['Tetapi harga hanya melantun lemah ke 4,658, tidak menuntut semula struktur, dan terus jatuh ke 4,596.', 'But price only bounces weakly to 4,658, does not reclaim structure, and keeps falling to 4,596.'],
      ['Sweep tanpa displacement dan structure shift bukan confirmation.', 'A sweep without displacement and a structure shift is not confirmation.']
    ],
    chart: {
      data: D_sw, pmin: 4570, pmax: 4720, step: 25, slots: 36, reveal: [0, .5], revealDur: 8, tag: 'SWEEP ≠ REVERSAL',
      ov: (S, c) => ovl.hl(S, 4651, 5, 30, C.cyan, { dash: '6 5', op: c.p([1, 0]) }) + tag(S.xs(10), S.ys(4651) + 22, 'EQL ~4,650 · SSL', C.cyan, { op: c.p([1, 0]), fs: 12 }) +
        tag(S.xs(23), S.ys(4638) + 24, 'SWEEP 4,638', C.cyan, { op: c.p([1, 3]), fs: 12 }) + tag(S.xs(31), S.ys(4596) + 22, '✗ CONTINUED LOWER', C.bear, { op: c.p([2, 4]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑥ · 7.7', title: 'Sweep, then continuation', items: [[[1, 0], 'Equal lows swept'], [[2, 0], 'Weak bounce, no reclaim', 'r'], [[3, 0], 'Sweep ≠ confirmation']] }
  }));

  scenes.push(T.chart({
    label: '7.7 · CONFLICT ⑤ · POOR RISK-TO-REWARD',
    lines: [
      ['Konflik lima: beberapa zon bertindih, tetapi risk-to-reward tidak menguntungkan.', 'Conflict five: several zones overlap, but the risk to reward is unfavourable.'],
      ['Harga turun jauh ke 4,606 sebelum berbalik, jadi invalidation yang logik berada di bawahnya, 4,598. Confirmation hanya datang di 4,668.',
        'Price dropped deep to 4,606 before turning, so the logical invalidation sits below it, at 4,598. Confirmation only came at 4,668.'],
      ['Objektif pertama yang realistik ialah high dalaman di 4,710, di mana harga pernah berbalik. Risiko 70 mata, potensi hanya 42 mata.',
        'The first realistic objective is the internal high at 4,710, where price previously turned. Risk 70 points, potential only 42 points.'],
      ['Itu kira-kira 1 kepada 0.6. Walaupun zon bertindih, trade ini tidak berbaloi. Keputusan: tidak trade.', 'That is about 1 to 0.6. Even with overlapping zones, this trade is not worth it. Decision: no trade.']
    ],
    chart: {
      data: D_rr, pmin: 4570, pmax: 4830, step: 50, slots: 46, reveal: [0, 0], revealDur: 6, tag: 'R:R ≈ 1 : 0.6',
      under: (S, c) => ovl.zone(S, 4598, 4668, 38, 44, C.bear, { alpha: .2, op: c.p([2, 0]) }) + ovl.zone(S, 4668, 4710, 38, 44, C.bull, { alpha: .18, op: c.p([2, 0]) }),
      ov: (S, c) => ovl.hl(S, 4800, 4, 45, C.mute, { w: 1.3 }) + ovl.hl(S, 4600, 4, 45, C.mute, { w: 1.3 }) + dot(S.xs(33), S.ys(4606), C.gold, c.p([1, 0]), 7) + tag(S.xs(33), S.ys(4606) + 24, 'DEEP LOW 4,606', C.gold, { op: c.p([1, 0]), fs: 12 }) +
        ovl.hl(S, 4710, 24, 44, C.mute, { dash: '5 4', op: c.p([2, 0]) }) + tag(S.xs(24), S.ys(4710) + 22, 'INTERNAL HIGH 4,710', C.mute, { op: c.p([2, 0]), fs: 12 }) +
        tag(S.xs(44), S.ys(4668), 'ENTRY 4,668', '#ffffff', { anchor: 'end', op: c.p([2, 0]), fs: 12 }) + tag(S.xs(44), S.ys(4598) - 14, 'STOP 4,598', C.bear, { anchor: 'end', op: c.p([2, 1]), fs: 12 }) +
        tag(S.xs(44), S.ys(4710) - 14, 'TARGET 4,710', C.cyan, { anchor: 'end', op: c.p([2, 2]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑥ · 7.7', title: 'Poor risk-to-reward', items: [[[1, 0], 'Logical invalidation: far below'], [[2, 0], 'Nearest objective: close above'], [[3, 0], 'Risk 70 : Reward 42 ≈ 1 : 0.6', 'r'], [[3, 3], 'Decision: no trade']] }
  }));

  scenes.push(T.cards({
    label: '7.8 · WHEN NOT TO TRADE', kicker: 'SUBTOPIC ⑥ · 7.8', title: 'Seven no-trade conditions',
    lines: [
      ['Inilah tujuh keadaan di mana keputusan terbaik biasanya ialah tidak trade.', 'Here are seven conditions in which the best decision is usually not to trade.'],
      ['Dealing range yang tidak jelas. Tiada konteks struktur yang bermakna. Tiada PD Array yang relevan.', 'An unclear dealing range. No meaningful structural context. No relevant PD Array.'],
      ['Tiada confirmation. Penempatan invalidation yang lemah. Target logik yang terlalu jauh.', 'No confirmation. Poor invalidation placement. A logical target that is excessively far away.'],
      ['Dan keadaan pasaran yang bercanggah. Dalam semua keadaan ini, tidak trade ialah keputusan analitikal yang sah.', 'And conflicting market conditions. In all these cases, not trading is a valid analytical decision.']
    ],
    cards: ['Unclear dealing range', 'No meaningful structural context', 'No relevant PD Array', 'No confirmation', 'Poor invalidation placement', 'Excessive distance to a logical target', 'Conflicting market conditions'].map((s, k) => ({
      x: 60 + (k % 2) * 910, y: 210 + Math.floor(k / 2) * 115, w: 890, h: 96, at: [[1, 1, 1, 2, 2, 2, 3][k], [0, 2, 4, 0, 1.5, 3, 0][k]], col: '#3a2030',
      html: () => `<div class="a" style="left:24px;top:34px">${E.crossSvg()}</div><div class="a" style="left:66px;top:31px;font-size:27px;font-weight:600">${s}</div>`
    })).concat([{ x: 970, y: 555, w: 890, h: 96, at: [3, 3], col: '#d7b256', html: () => `<div class="a" style="left:28px;top:30px;font-size:28px;font-weight:700;color:#d7b256">No trade is a valid decision.</div>` }])
  }));

  scenes.push(T.cards({
    label: '7.8 · TRADE, WAIT OR NO TRADE', kicker: 'SUBTOPIC ⑥ · 7.8', title: 'Three possible decisions',
    lines: [
      ['Setiap analisis berakhir dengan salah satu daripada tiga keputusan.', 'Every analysis ends with one of three decisions.'],
      ['Trade: konteks, lokasi, kawasan, liquidity dan confirmation bersetuju, dengan invalidation yang logik dan risk-to-reward yang munasabah.',
        'Trade: context, location, area, liquidity and confirmation agree, with a logical invalidation and a reasonable risk to reward.'],
      ['Tunggu: setup sedang terbentuk, tetapi satu bahagian, biasanya confirmation, belum hadir.', 'Wait: a setup is forming, but one part, usually confirmation, is not yet present.'],
      ['Tidak trade: bukti bercanggah, struktur tidak jelas, atau risiko tidak berbaloi. Ini juga keputusan profesional.', 'No trade: the evidence conflicts, structure is unclear, or the risk is not worth it. This is also a professional decision.']
    ],
    cards: [
      { x: 60, y: 220, w: 580, h: 400, at: [1, 0], col: '#25a198', kick: 'TRADE', kc: '#25a198', head: 'Evidence agrees', body: 'Independent evidence aligns, invalidation is logical, risk-to-reward is reasonable. Still not guaranteed.' },
      { x: 670, y: 220, w: 580, h: 400, at: [2, 0], col: '#d7b256', kick: 'WAIT', head: 'Setup incomplete', body: 'Most parts are present, but one, often confirmation, is missing. Define what you are waiting for.' },
      { x: 1280, y: 220, w: 580, h: 400, at: [3, 0], col: '#e54f4d', kick: 'NO TRADE', kc: '#e54f4d', head: 'Conflict or poor risk', body: 'Conflicting evidence, unclear structure, or unfavourable risk. A valid, professional outcome.' }
    ]
  }));

  scenes.push(T.summary({
    title: 'Conflicts &amp; No-Trade',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Lima konflik biasa: HTF lawan LTF, discount dengan struktur bearish, zon tanpa confirmation, sweep yang diteruskan, dan risk-to-reward yang lemah.',
        'Five common conflicts: HTF against LTF, discount with bearish structure, a zone without confirmation, a sweep that continues, and poor risk to reward.'],
      ['Bukti yang bercanggah mungkin mewajarkan menunggu atau tidak trade.', 'Conflicting evidence may justify waiting or not trading.'],
      ['Tujuh keadaan no-trade perlu dihafal. Dan tidak trade ialah keputusan yang sah.', 'Know the seven no-trade conditions. And not trading is a valid decision.']
    ],
    items: [[[1, 0], 'HTF vs LTF → wait'], [[1, 2.5], 'Discount ≠ bullish structure'], [[1, 5], 'Zone without confirmation → no trade'], [[1, 7], 'Sweep ≠ reversal'], [[1, 9], 'Poor R:R → no trade'], [[3, 0], 'No trade is valid']]
  }));

  scenes.push(T.quiz([
    ['HTF is bullish but LTF is still making lower highs. What is the reasonable decision?', 'Wait. Let the lower timeframe align, for example with a bullish structure shift, or stand aside.',
      'HTF bullish tetapi LTF masih membuat lower highs. Apakah keputusan yang munasabah?', 'tunggu. Biarkan lower timeframe selari, contohnya dengan bullish structure shift, atau tidak trade.',
      'The higher timeframe is bullish but the lower timeframe is still making lower highs. What is the reasonable decision?', 'Wait. Let the lower timeframe align, for example with a bullish structure shift, or stand aside.'],
    ['Price is in discount, but structure keeps making lower lows. Buy?', 'No. Discount does not override bearish structure. Wait for a structure change or reassess the range.',
      'harga di discount, tetapi struktur terus membuat lower lows. Beli?', 'tidak. Discount tidak membatalkan struktur bearish. Tunggu perubahan struktur atau nilai semula range.'],
    ['Entry 4,668, stop 4,598, nearest objective 4,710. Trade or not?', 'Risk 70, reward 42: about 1 : 0.6. Unfavourable. No trade, even if zones overlap.',
      'entry 4,668, stop 4,598, objektif terdekat 4,710. Trade atau tidak?', 'risiko 70, reward 42, kira-kira 1 kepada 0.6. Tidak menguntungkan. Tidak trade, walaupun zon bertindih.',
      'Entry 4,668, stop 4,598, nearest objective 4,710. Trade or not?', 'Risk 70, reward 42, about 1 to 0.6. Unfavourable. No trade, even if zones overlap.'],
    ['Name four of the seven no-trade conditions.', 'Any four of: unclear dealing range, no structural context, no relevant PD Array, no confirmation, poor invalidation, excessive distance to target, conflicting conditions.',
      'namakan empat daripada tujuh keadaan no-trade.', 'mana-mana empat: dealing range tidak jelas, tiada konteks struktur, tiada PD Array relevan, tiada confirmation, invalidation lemah, target terlalu jauh, keadaan bercanggah.']
  ]));

  scenes.push(T.exercise({
    title: 'Keep a decision journal',
    lines: [
      ['Latihan praktikal: untuk sepuluh setup yang berpotensi, tulis keputusan anda sebelum harga bergerak: trade, tunggu, atau tidak trade.', 'Practical exercise: for ten potential setups, write your decision before price moves: trade, wait, or no trade.'],
      ['Untuk setiap satu, catat konflik yang wujud, dan keadaan no-trade yang berkenaan.', 'For each, record any conflict present, and the no-trade conditions that apply.'],
      ['Selepas itu, semak hasilnya. Nilai sama ada keputusan itu betul berdasarkan maklumat yang ada pada masa itu, bukan berdasarkan hasil sahaja.', 'Afterwards, review the outcome. Judge whether the decision was right given the information at the time, not by the outcome alone.']
    ],
    steps: [[[1, 0], 'Ten setups: write trade / wait / no trade beforehand'], [[2, 0], 'Record conflicts present'], [[2, 2.5], 'Record applicable no-trade conditions'], [[3, 0], 'Review outcomes afterwards'], [[3, 4], 'Judge the decision, not just the result']]
  }));

  scenes.push(T.next({
    no: '14', short: 'Integrated Case Study', kicker: 'INTEGRATED APPLICATION', title: 'Complete Level 6 workflow — integrated case study',
    lines: [['Dalam video terakhir: kajian kes bersepadu yang menggabungkan keenam-enam subtopik, dengan satu setup yang berjaya dan satu yang gagal.', 'In the final video: an integrated case study combining all six subtopics, with one setup that develops and one that fails.']],
    html: (t) => `<div class="a mono" style="left:0;width:1200px;text-align:center;top:190px;font-size:30px;color:#d7b256;letter-spacing:2px;opacity:${P(t, .5, .6)}">DIRECTION → RANGE → EQ → P/D → PD ARRAYS → LIQUIDITY → OTE → CONFIRMATION → PLAN → REVIEW</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy'], 'Pengurusan risiko dan risk-to-reward ialah prinsip umum dagangan. Contoh dalam video ini ialah ilustrasi.',
    'Risk management and risk to reward are general trading principles. The examples in this video are illustrative.', 'Decision categories (trade / wait / no trade) are a CMI teaching framework.'));
  scenes.push(T.disclaimer('14', 'Integrated Case Study'));
  registerVideo({ id: 'v13', title: 'VIDEO 13 — CONFLICTS &amp; NO-TRADE', scenes });
})();
