/* VIDEO 09 — FVG, IFVG & Liquidity Void. Illustrative FCPO-style prices only.
 * FVG (3-candle): bullish gap = candle-1 high → candle-3 low; bearish gap = candle-1 low → candle-3 high.
 * IFVG: an FVG that price CLOSES through (body beyond the far edge); its role then inverts.
 * Liquidity void: a multi-candle one-directional leg with little overlap (may contain several FVGs). */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const fvgRows = [[4630, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]]; // gap 4,645–4,668
  const D_fvg = T.patch(gen([[0, 4640], [4, 4600], [8, 4628], [12, 4705], [20, 4760], [27, 4652], [36, 4740]], 141), 9, fvgRows);
  const D_ifvg = T.patch(gen([[0, 4640], [4, 4600], [8, 4628], [12, 4705], [17, 4730], [22, 4632], [25, 4606], [30, 4660], [37, 4585]], 142), 9, fvgRows);
  const D_fill = T.patch(gen([[0, 4640], [4, 4600], [8, 4628], [12, 4705], [17, 4730], [23, 4650], [32, 4745]], 143), 9, fvgRows);
  const voidRows = [[4800, 4806, 4788, 4790], [0, 4792, 4762, 4765], [0, 4768, 4735, 4738], [0, 4741, 4706, 4710], [0, 4713, 4684, 4688], [0, 4690, 4660, 4666]];
  const D_void = T.patch(gen([[0, 4770], [5, 4800], [12, 4664], [16, 4650], [24, 4736], [34, 4632]], 144), 6, voidRows);
  const scenes = [];
  const gapBull = (S, a, i1, lbl = 'BULLISH FVG 4,645–4,668', col = C.bull) => ovl.zone(S, 4645, 4668, 9, i1, col, { alpha: .18, op: a, stroke: true }) + (lbl ? tag(S.xs(i1), S.ys(4668) - 16, lbl, col, { anchor: 'end', op: a, fs: 13 }) : '');

  // 3-candle schematic (svg in a card)
  const three = (x, y, bull, a, b) => {
    // rows: [open, close, low, high] in local units 0..180 (higher = up)
    const cs = bull ? [[20, 45, 10, 55], [45, 150, 40, 158], [150, 170, 85, 178]] : [[160, 135, 125, 170], [135, 30, 22, 140], [30, 15, 5, 95]];
    const base = y + 250, u = 1.2, Y = v => base - v * u;
    let g = cs.map((c, k) => {
      const X = x + 60 + k * 110, col = c[1] >= c[0] ? C.bull : C.bear;
      return `<g opacity="${P(a, k * .5, .4)}"><line x1="${X}" x2="${X}" y1="${Y(c[3])}" y2="${Y(c[2])}" stroke="${col}" stroke-width="3"/><rect x="${X - 22}" y="${Y(Math.max(c[0], c[1]))}" width="44" height="${Math.max(3, Math.abs(c[1] - c[0]) * u)}" fill="${col}"/>` +
        `<text x="${X}" y="${base + 34}" text-anchor="middle" font-family="JetBrains Mono" font-size="15" fill="${C.mute}">${k + 1}</text></g>`;
    }).join('');
    const gHi = bull ? cs[2][2] : cs[0][2], gLo = bull ? cs[0][3] : cs[2][3], top = Y(gHi), bot = Y(gLo);
    g += `<rect x="${x + 30}" y="${top}" width="300" height="${bot - top}" fill="${bull ? C.bull : C.bear}" opacity="${.22 * b}" stroke="${bull ? C.bull : C.bear}" stroke-dasharray="5 4"/>`;
    g += `<line x1="${x + 30}" x2="${x + 330}" y1="${(top + bot) / 2}" y2="${(top + bot) / 2}" stroke="${C.amber}" stroke-dasharray="3 4" opacity="${b}"/>`;
    g += txt(x + 340, top + 5, bull ? 'CANDLE 3 LOW' : 'CANDLE 1 LOW', { col: C.mute, fs: 13, op: b }) + txt(x + 340, bot + 5, bull ? 'CANDLE 1 HIGH' : 'CANDLE 3 HIGH', { col: C.mute, fs: 13, op: b }) +
      txt(x + 340, (top + bot) / 2 + 5, 'CE 50%', { col: C.amber, fs: 13, op: b });
    return g;
  };


  scenes.push(T.title({
    no: '09', sub: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'FVG, IFVG &amp; Liquidity Void', tagline: 'Imbalance-based PD Arrays',
    objectives: ['Recap the three-candle fair value gap', 'Identify an inverse fair value gap', 'Separate an IFVG from a filled FVG', 'Distinguish a liquidity void from an FVG'],
    lines: [
      ['Selamat kembali. Dalam Video 9, kita melihat tiga PD Array berasaskan imbalance: fair value gap, inverse fair value gap, dan liquidity void.',
        'Welcome back. In Video 9, we look at three imbalance-based PD Arrays: the fair value gap, the inverse fair value gap, and the liquidity void.'],
      ['Anda sudah mempelajari fair value gap dan displacement dalam Level 5, jadi kita hanya membuat ulang kaji ringkas.', 'You already studied fair value gaps and displacement in Level 5, so we only do a brief recap.'],
      ['Fokus video ini ialah perbezaan antara ketiga-tiganya, dan cara ia dibaca dalam konteks premium dan discount.', 'The focus of this video is the difference between all three, and how they are read in premium and discount context.']
    ],
    illus: (t, L) => three(1180, 400, true, t - L[0] - 1, P(t, L[1], .8))
  }));

  scenes.push(T.cards({
    label: '6.6 · FVG RECAP', kicker: 'SUBTOPIC ⑤ · 6.6 · RECAP FROM LEVEL 5', title: 'Fair value gap: a three-candle imbalance',
    lines: [
      ['Ulang kaji: fair value gap ialah imbalance tiga candle. Candle kedua ialah candle displacement.', 'Recap: a fair value gap is a three-candle imbalance. The second candle is the displacement candle.'],
      ['Dalam FVG bullish, gap berada di antara high candle satu dan low candle tiga. Harga bergerak terlalu pantas sehingga kawasan itu hanya diniagakan dalam satu arah.',
        'In a bullish FVG, the gap lies between the high of candle one and the low of candle three. Price moved so fast that the area was traded in one direction only.'],
      ['Dalam FVG bearish, gap berada di antara low candle satu dan high candle tiga.', 'In a bearish FVG, the gap lies between the low of candle one and the high of candle three.'],
      ['Titik tengah gap dipanggil consequent encroachment. Harga kemudian mungkin retrace ke dalam gap, tetapi tidak semestinya.', 'The midpoint of the gap is called consequent encroachment. Price may later retrace into the gap, but it does not have to.']
    ],
    cards: [
      { x: 60, y: 210, w: 880, h: 500, at: [1, 0], kick: 'BULLISH FVG', head: 'Candle 1 high → candle 3 low', html: c => `<svg class="a" style="left:0;top:80px" width="880" height="420">${three(30, 20, true, c.t - c.at([1, 0]), c.p([1, 3]))}</svg>` },
      { x: 980, y: 210, w: 880, h: 500, at: [2, 0], kick: 'BEARISH FVG', kc: '#e54f4d', head: 'Candle 1 low → candle 3 high', html: c => `<svg class="a" style="left:0;top:80px" width="880" height="420">${three(30, 20, false, c.t - c.at([2, 0]), c.p([2, 2]))}</svg>` }
    ],
    warn: { at: [3, 0], y: 740, s: '<b>Consequent encroachment (CE)</b> = 50% of the gap. A retracement into the gap is possible, never guaranteed.' }
  }));

  scenes.push(T.chart({
    label: '6.6 · FVG IN CONTEXT',
    lines: [
      ['Pada carta, FVG bullish ini terbentuk semasa displacement dari 4,628, antara 4,645 dan 4,668.', 'On the chart, this bullish FVG forms during the displacement from 4,628, between 4,645 and 4,668.'],
      ['Untuk Level 6, soalan utama ialah lokasi. Dalam range 4,600 hingga 4,760, gap ini berada di discount, di bawah equilibrium 4,680.',
        'For Level 6, the key question is location. In the 4,600 to 4,760 range, this gap sits in discount, below the 4,680 equilibrium.'],
      ['Apabila harga retrace ke dalam gap, ia ialah PD Array bullish di lokasi discount. Itu konteks yang berguna, tetapi masih memerlukan confirmation.',
        'When price retraces into the gap, it is a bullish PD Array in a discount location. That is useful context, but it still needs confirmation.'],
      ['Tidak setiap FVG boleh didagangkan. FVG kecil di tengah range, atau bertentangan dengan struktur, mempunyai nilai analitikal yang rendah.',
        'Not every FVG is tradable. A small FVG mid-range, or against structure, has little analytical value.']
    ],
    chart: {
      data: D_fvg, pmin: 4580, pmax: 4790, step: 50, slots: 40, reveal: [0, 0], revealDur: 6, tag: 'FVG IN DISCOUNT',
      under: (S, c) => T.pdZones(S, 4760, 4600, 4, c.p([1, 0])),
      ov: (S, c) => gapBull(S, c.p([0, 2]), 36) + T.rangeOv(S, 4760, 4600, 4, c.p([1, 0], 1)) + dot(S.xs(27), S.ys(4652), C.gold, c.p([2, 0]), 7)
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.6', title: 'FVG in Level 6', items: [[[1, 0], 'Where is the gap in the range?'], [[2, 0], 'Bullish FVG in discount: useful context'], [[2, 4], 'Still needs confirmation'], [[3, 0], 'Not every FVG is tradable', 'r']] }
  }));

  scenes.push(T.chart({
    label: '6.7 · INVERSE FAIR VALUE GAP',
    lines: [
      ['Sekarang inverse fair value gap, atau IFVG. Kita mulakan dengan FVG bullish yang sama, 4,645 hingga 4,668.', 'Now the inverse fair value gap, or IFVG. We start with the same bullish FVG, 4,645 to 4,668.'],
      ['Kali ini, harga kembali ke gap dan tidak bertahan. Body candle close di bawah hujung bawah gap, 4,645. FVG bullish itu telah ditembusi.',
        'This time, price returns to the gap and does not hold. A candle body closes below the lower edge of the gap, 4,645. The bullish FVG has been violated.'],
      ['Selepas penembusan dengan close, peranan analitikal gap itu diterbalikkan. Ia kini dibaca sebagai IFVG bearish.', 'After a violation by close, the analytical role of the gap inverts. It is now read as a bearish IFVG.'],
      ['Apabila harga naik semula ke 4,660, ke dalam zon dari bawah, ia dikaji sebagai resistance yang berpotensi. Di sini harga ditolak dan jatuh.',
        'When price rallies back to 4,660, into the zone from below, it is studied as potential resistance. Here, price is rejected and falls.'],
      ['IFVG bearish ini gagal jika harga close semula di atas gap, iaitu di atas 4,668. IFVG bullish ialah cerminannya: FVG bearish yang ditembusi dengan close ke atas.',
        'This bearish IFVG fails if price closes back above the gap, above 4,668. A bullish IFVG is the mirror: a bearish FVG violated by a close to the upside.']
    ],
    chart: {
      data: D_ifvg, pmin: 4560, pmax: 4760, step: 50, slots: 42, tag: 'BULLISH FVG → BEARISH IFVG',
      n: c => 3 + 14 * P(c.t, c.at([0, 0]), 4) + 7 * P(c.t, c.at([1, 0]), 3) + 14 * P(c.t, c.at([3, 0]), 5),
      ov: (S, c) => {
        const inv = c.p([2, 0]);
        return gapBull(S, 1 - inv, 39) + ovl.zone(S, 4645, 4668, 9, 39, C.bear, { alpha: .2, op: inv, stroke: true }) +
          tag(S.xs(39), S.ys(4668) - 16, 'BEARISH IFVG 4,645–4,668', C.bear, { anchor: 'end', op: inv, fs: 13 }) +
          ovl.hl(S, 4645, 9, 39, C.bear, { dash: '6 4', op: c.p([1, 2]) * (1 - inv) }) + tag(S.xs(22), S.ys(4632) + 26, 'BODY CLOSE < 4,645', C.bear, { op: c.p([1, 2]), fs: 13 }) +
          dot(S.xs(30), S.ys(4660), C.gold, c.p([3, 1]), 7) + tag(S.xs(30), S.ys(4668) - 46, 'RETEST FROM BELOW', C.gold, { op: c.p([3, 1]), fs: 13 }) +
          ovl.hl(S, 4668, 9, 39, C.bull, { dash: '6 4', op: c.p([4, 0]) }) + tag(S.xs(14), S.ys(4668) - 22, 'FAILS ON CLOSE > 4,668', C.bull, { op: c.p([4, 0]), fs: 12 });
      }
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.7', title: 'Inverse FVG', items: [[[0, 0], 'Start: an original FVG'], [[1, 0], 'Violation: body closes beyond the far edge'], [[2, 0], 'Role inverts: bullish → bearish'], [[3, 0], 'Retest from the other side'], [[4, 0], 'Fails on a close back through', 'r']] }
  }));

  scenes.push(T.two({
    label: '6.7 · FILLED FVG ≠ IFVG',
    lines: [
      ['Jangan keliru antara IFVG dan FVG yang sekadar diisi.', 'Do not confuse an IFVG with an FVG that has simply been filled.'],
      ['Contoh A: harga kembali ke dalam gap, malah wick ke bawahnya, tetapi body close semula di dalam atau di atas gap. Gap itu telah diisi dan dihormati. Ia masih FVG bullish, bukan IFVG.',
        'Example A: price returns into the gap, even wicks below it, but the body closes back inside or above the gap. The gap was filled and respected. It is still a bullish FVG, not an IFVG.'],
      ['Contoh B: body candle close di bawah 4,645 dan harga kekal di bawahnya. Inilah penembusan yang menukar FVG kepada IFVG.', 'Example B: a candle body closes below 4,645 and price stays below it. This is the violation that turns the FVG into an IFVG.']
    ],
    a: { data: D_fill, pmin: 4580, pmax: 4770, step: 50, slots: 36, reveal: [1, 0], revealDur: 5, title: 'EXAMPLE A · HYPOTHETICAL', tag: 'FILLED · STILL AN FVG',
      ov: (S, c) => gapBull(S, 1, 34, 'FVG') + tag(S.xs(23), S.ys(4620), '✓ FILLED, RESPECTED', C.bull, { op: c.p([1, 5]), fs: 13 }) },
    b: { data: D_ifvg, pmin: 4560, pmax: 4760, step: 50, slots: 40, reveal: [2, 0], revealDur: 5, title: 'EXAMPLE B · HYPOTHETICAL', tag: 'CLOSED THROUGH → IFVG', show: [2, 0],
      ov: (S, c) => ovl.zone(S, 4645, 4668, 9, 38, C.bear, { alpha: .2, stroke: true }) + tag(S.xs(38), S.ys(4668) - 16, 'IFVG', C.bear, { anchor: 'end', fs: 13 }) + tag(S.xs(22), S.ys(4610), '✓ BODY CLOSE BELOW', C.bear, { op: c.p([2, 3]), fs: 13 }) },
    h: 760
  }));

  scenes.push(T.chart({
    label: '6.8 · LIQUIDITY VOID',
    lines: [
      ['Sekarang liquidity void. Lihat penurunan ini: enam candle bearish yang besar berturut-turut, dari 4,806 ke 4,660, dengan tindihan yang sangat sedikit.',
        'Now the liquidity void. Look at this decline: six large consecutive bearish candles, from 4,806 to 4,660, with very little overlap.'],
      ['Harga dihantar dengan pantas melalui seluruh kawasan ini. Hampir tiada dagangan dua hala. Ini rupa liquidity void.', 'Price was delivered quickly through this whole area. There was almost no two-way trade. This is what a liquidity void looks like.'],
      ['Di dalamnya terdapat beberapa fair value gap. Tetapi void ialah keseluruhan kawasan penghantaran yang tidak efisien, bukan satu gap tiga candle.',
        'Inside it, there are several fair value gaps. But the void is the whole area of inefficient delivery, not a single three-candle gap.'],
      ['Kemudian harga mungkin kembali ke dalam void. Di sini ia naik semula ke 4,736, sekitar pertengahan void, sebelum jatuh semula.', 'Later, price may return into the void. Here it rallies back to 4,736, around the middle of the void, before falling again.'],
      ['Penting: pergerakan yang kelihatan tidak efisien pada carta tidak membuktikan bahawa tiada liquidity sebenar di kawasan itu. Ia hanyalah bacaan visual.',
        'Important: a move that looks inefficient on the chart does not prove there was no actual resting liquidity in that area. It is only a visual reading.']
    ],
    chart: {
      data: D_void, pmin: 4600, pmax: 4830, step: 50, slots: 38, tag: 'LIQUIDITY VOID · ILLUSTRATIVE',
      n: c => 3 + 3 * P(c.t, c.at([0, 0]), 1) + 6 * P(c.t, c.at([0, 2]), 3) + 13 * P(c.t, c.at([3, 0]), 4) + 10 * P(c.t, c.at([4, 3]), 3),
      under: (S, c) => ovl.zone(S, 4666, 4790, 5.5, 12.5, C.purple, { alpha: .14, op: c.p([1, 0]), stroke: true, dash: '6 4' }),
      ov: (S, c) => tag(S.xs(9), S.ys(4806) - 24, 'LIQUIDITY VOID 4,666–4,790', C.purple, { op: c.p([1, 0]), fs: 13 }) +
        [[4768, 4788], [4741, 4762], [4713, 4735], [4690, 4706]].map((g, k) => ovl.zone(S, g[0], g[1], 6 + k + .6, 8 + k + .4, C.bear, { alpha: .28, op: c.p([2, k * .6]) })).join('') +
        tag(S.xs(14), S.ys(4740), 'SEVERAL FVGs INSIDE', C.bear, { anchor: 'start', op: c.p([2, 2]), fs: 13 }) + dot(S.xs(24), S.ys(4736), C.gold, c.p([3, 3]), 7)
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.8', title: 'Liquidity void', items: [[[0, 0], 'Large one-directional candles'], [[0, 4], 'Very little overlap'], [[2, 0], 'May contain several FVGs'], [[3, 0], 'Price may later return into it'], [[4, 0], 'Visual inefficiency ≠ no resting liquidity', 'r']] }
  }));

  scenes.push(T.cards({
    label: '6.6–6.8 · COMPARISON', kicker: 'SUBTOPIC ⑤ · 6.6–6.8', title: 'FVG vs IFVG vs liquidity void',
    lines: [
      ['Mari bandingkan ketiga-tiganya.', 'Let us compare all three.'],
      ['FVG: satu gap tiga candle, antara wick candle satu dan candle tiga.', 'FVG: a single three-candle gap, between the wicks of candle one and candle three.'],
      ['IFVG: FVG yang telah ditembusi dengan close, dan kini dibaca dalam peranan bertentangan.', 'IFVG: an FVG that has been violated by a close, and is now read in the opposite role.'],
      ['Liquidity void: kawasan penghantaran harga yang lebih besar, merangkumi beberapa candle, dan mungkin mengandungi beberapa FVG.', 'Liquidity void: a larger area of price delivery, spanning several candles, and possibly containing several FVGs.']
    ],
    cards: [
      { x: 60, y: 220, w: 580, h: 380, at: [1, 0], col: '#25a198', kick: 'FVG', head: 'Three-candle gap', body: 'Candle 1 wick → candle 3 wick. Midpoint = consequent encroachment. Respected if price closes back out.' },
      { x: 670, y: 220, w: 580, h: 380, at: [2, 0], col: '#e54f4d', kick: 'IFVG', head: 'Violated FVG, inverted role', body: 'Requires a body close beyond the far edge. A wick-through that closes back is only a filled FVG.' },
      { x: 1280, y: 220, w: 580, h: 380, at: [3, 0], col: '#9b7bf0', kick: 'LIQUIDITY VOID', head: 'Multi-candle inefficient leg', body: 'Large, fast, one-directional candles with little overlap. May hold several FVGs. A visual reading only.' }
    ]
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ⑤ · 6.12', title: 'Common imbalance mistakes', rowH: 160,
    lines: [
      ['Kesilapan biasa:', 'Common mistakes:'],
      ['Menganggap setiap FVG boleh didagangkan. Dan mengelirukan IFVG dengan FVG yang sekadar diisi.', 'Treating every FVG as tradable. And confusing an IFVG with an FVG that has simply been filled.'],
      ['Mengelirukan liquidity void dengan FVG biasa. Dan menganggap void sebagai bukti bahawa tiada order sebenar di kawasan itu.', 'Confusing a liquidity void with an ordinary FVG. And treating a void as proof that no real orders exist in that area.']
    ],
    items: [[[1, 0], 'Every FVG is tradable', 'Location, structure and confirmation still decide.'], [[1, 3], 'IFVG = filled FVG', 'An IFVG needs a body close beyond the far edge.'],
      [[2, 0], 'Void = ordinary FVG', 'A void is a multi-candle leg, not one gap.'], [[2, 3.5], 'Void proves no orders', 'It is a visual reading, not order-book evidence.']]
  }));

  scenes.push(T.summary({
    title: 'FVG, IFVG &amp; Void',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['FVG ialah gap tiga candle. IFVG ialah FVG yang ditembusi dengan close, dengan peranan terbalik.', 'An FVG is a three-candle gap. An IFVG is an FVG violated by a close, with an inverted role.'],
      ['FVG yang diisi tetapi dihormati bukan IFVG. Liquidity void ialah leg berbilang candle yang tidak efisien.', 'A filled but respected FVG is not an IFVG. A liquidity void is an inefficient multi-candle leg.'],
      ['Ketiga-tiganya dibaca bersama lokasi premium dan discount, dan tiada satu pun dijamin.', 'All three are read together with premium and discount location, and none is guaranteed.']
    ],
    items: [[[1, 0], 'FVG: three-candle gap'], [[1, 2.5], 'IFVG: closed through, role inverted'], [[2, 0], 'Filled ≠ inverted'], [[2, 2.5], 'Void: multi-candle inefficient leg'], [[3, 0], 'Read with P/D location'], [[3, 2], 'None is guaranteed']]
  }));

  scenes.push(T.quiz([
    ['What is the difference between an FVG and an IFVG?', 'An IFVG is an FVG that price has closed through, beyond its far edge. Its analytical role then inverts. An ordinary FVG has not been violated by a close.',
      'apakah perbezaan antara FVG dan IFVG?', 'IFVG ialah FVG yang telah ditembusi harga dengan close, melepasi hujung jauhnya. Peranannya kemudian diterbalikkan. FVG biasa belum ditembusi dengan close.'],
    ['Price wicks below a bullish FVG but closes back inside it. Is it now an IFVG?', 'No. The gap was filled and respected. An IFVG requires a body close beyond the far edge.',
      'harga wick di bawah FVG bullish tetapi close semula di dalamnya. Adakah ia kini IFVG?', 'tidak. Gap itu diisi dan dihormati. IFVG memerlukan body close melepasi hujung jauh gap.'],
    ['How does a liquidity void differ from an FVG?', 'A void is a larger, multi-candle area of fast one-directional delivery that may contain several FVGs. An FVG is a specific three-candle gap.',
      'bagaimana liquidity void berbeza daripada FVG?', 'void ialah kawasan berbilang candle yang lebih besar, dengan penghantaran sehala yang pantas, dan mungkin mengandungi beberapa FVG. FVG ialah gap tiga candle yang khusus.'],
    ['Bullish FVG: candle 1 high 4,645, candle 3 low 4,668. What is the consequent encroachment?', '(4,645 + 4,668) ÷ 2 = 4,656.5.',
      'FVG bullish: high candle satu 4,645, low candle tiga 4,668. Apakah consequent encroachment?', '4,645 tambah 4,668, bahagi dua, ialah 4,656.5.',
      'A bullish FVG has a candle one high of 4,645 and a candle three low of 4,668. What is the consequent encroachment?', '4,645 plus 4,668, divided by two, is 4,656.5.']
  ]));

  scenes.push(T.exercise({
    title: 'Classify imbalances',
    lines: [
      ['Latihan praktikal: tandakan lima FVG pada carta anda dan catat lokasi premium atau discount setiap satu.', 'Practical exercise: mark five FVGs on your chart and record the premium or discount location of each.'],
      ['Untuk setiap FVG yang dikunjungi semula, klasifikasikan: diisi dan dihormati, atau ditembusi dengan close menjadi IFVG.', 'For each FVG that was revisited, classify it: filled and respected, or violated by a close into an IFVG.'],
      ['Kemudian cari satu liquidity void dan kira berapa FVG yang terkandung di dalamnya.', 'Then find one liquidity void and count how many FVGs it contains.']
    ],
    steps: [[[1, 0], 'Mark five FVGs and their P/D location'], [[1, 3], 'Mark the consequent encroachment of each'], [[2, 0], 'Revisited: respected, or closed through (IFVG)?'], [[3 - 1, 4], 'Track IFVG retests from the other side'], [[2, 7], 'Find one liquidity void and count its FVGs']]
  }));

  scenes.push(T.next({
    no: '10', short: 'Old High / Low', kicker: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Old High &amp; Low — liquidity references',
    lines: [['Dalam video seterusnya: old high dan old low, equal highs dan equal lows, serta hubungannya dengan buy-side dan sell-side liquidity.',
      'In the next video: old highs and old lows, equal highs and equal lows, and their relationship with buy-side and sell-side liquidity.']],
    html: (t) => `<div class="a mono" style="left:0;width:1200px;text-align:center;top:150px;font-size:36px;color:#2cc6dc;font-weight:700;opacity:${P(t, .5, .6)}">BUY-SIDE LIQUIDITY ▲</div>
      <div class="a mono" style="left:0;width:1200px;text-align:center;top:250px;font-size:36px;color:#2cc6dc;font-weight:700;opacity:${P(t, 1.2, .6)}">SELL-SIDE LIQUIDITY ▼</div>`
  }));
  scenes.push(T.refs(['ict', 'harris'], 'FVG, IFVG dan liquidity void ialah istilah ICT. Literatur microstructure membincangkan liquidity sebenar dalam order book.',
    'FVG, IFVG and liquidity void are ICT terms. Microstructure literature discusses actual liquidity in the order book.', 'Chart-based "voids" are visual readings. Actual resting liquidity can only be observed in order-book data, which candles do not show.'));
  scenes.push(T.disclaimer('10', 'Old High &amp; Low'));
  registerVideo({ id: 'v09', title: 'VIDEO 09 — FVG, IFVG &amp; LIQUIDITY VOID', scenes });
})();
