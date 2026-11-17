/* VIDEO 12 — Multiple Confluences. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const fvgB = [[4630, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]];
  const fvgS = [[4770, 4774, 4755, 4758], [0, 4760, 4706, 4710], [0, 4732, 4692, 4698]];
  const D_bu = T.patch(gen([[0, 4640], [4, 4600], [8, 4628], [12, 4705], [20, 4800], [26, 4672], [28, 4690], [31, 4650], [33, 4680], [36, 4702], [44, 4792]], 171), 9, fvgB);
  const D_be = T.patch(gen([[0, 4760], [4, 4800], [8, 4772], [12, 4695], [20, 4600], [26, 4728], [28, 4710], [31, 4750], [33, 4720], [36, 4698], [44, 4608]], 172), 9, fvgS);
  const scenes = [];
  const box = (S, e, s, tg, i0, i1, a) => ovl.zone(S, Math.min(e, s), Math.max(e, s), i0, i1, C.bear, { alpha: .18, op: a }) + ovl.zone(S, Math.min(e, tg), Math.max(e, tg), i0, i1, C.bull, { alpha: .16, op: a }) + ovl.hl(S, e, i0, i1, '#fff', { op: a });

  scenes.push(T.title({
    no: '12', sub: 'SUBTOPIC ⑥', title: 'Multiple Confluences', tagline: 'Building a framework without overcomplication',
    objectives: ['Define confluence correctly', 'Group the ten confluence types', 'Build bullish and bearish confluence cases', 'Avoid double-counting related evidence'],
    lines: [
      ['Selamat kembali. Video 12 memulakan subtopik terakhir Level 6: Multiple Confluences.', 'Welcome back. Video 12 begins the final subtopic of Level 6: Multiple Confluences.'],
      ['Anda akan belajar maksud confluence yang sebenar, mengumpulkan sepuluh jenis confluence, dan membina kes bullish dan bearish yang lengkap.',
        'You will learn what confluence really means, group the ten types of confluence, and build complete bullish and bearish cases.'],
      ['Dan yang paling penting: cara mengelakkan double-counting, iaitu mengira bukti yang sama lebih daripada sekali.', 'And most importantly: how to avoid double-counting, which is counting the same evidence more than once.']
    ],
    illus: (t, L) => {
      const b = P(t, L[2], 1), X = 1160;
      return ['DISCOUNT', 'BELOW EQ', 'OTE', 'FVG', 'OB'].map((s, k) => {
        const y0 = 420 + k * 64, y1 = k < 3 ? 470 : 650, y = y0 + (y1 - y0) * b;
        return `<rect x="${X + 40}" y="${y}" width="240" height="44" rx="6" fill="#0a1226" stroke="${k < 3 ? C.purple : C.bull}" stroke-width="1.5" opacity="${1 - .6 * b * (k % 3 ? 1 : 0)}"/>` + txt(X + 160, y + 28, s, { anchor: 'middle', col: k < 3 ? C.purple : C.bull, fs: 16, fw: 700, op: 1 - .6 * b * (k % 3 ? 1 : 0) });
      }).join('') + txt(X + 330, 498, '→ ONE LOCATION READING', { col: C.purple, fs: 16, fw: 700, op: b }) + txt(X + 330, 678, '→ ONE DISPLACEMENT EVENT', { col: C.bull, fs: 16, fw: 700, op: b });
    }
  }));

  scenes.push(T.cards({
    label: '7.1 · WHAT IS CONFLUENCE?', kicker: 'SUBTOPIC ⑥ · 7.1', title: 'What is confluence?',
    lines: [
      ['Dalam analisis teknikal, confluence bermaksud beberapa faktor menunjuk kepada kesimpulan yang sama, di kawasan yang sama.', 'In technical analysis, confluence means several factors pointing to the same conclusion, in the same area.'],
      ['Tetapi bezakan empat situasi. Satu: satu isyarat yang terpencil. Ini bukti yang lemah.', 'But distinguish four situations. One: a single isolated signal. This is weak evidence.'],
      ['Dua: beberapa isyarat yang berkaitan, yang datang daripada sumber yang sama. Tiga: bukti bebas, yang datang daripada pemerhatian yang berbeza.',
        'Two: several related signals that come from the same source. Three: independent evidence that comes from different observations.'],
      ['Dan empat: label berulang yang menerangkan peristiwa harga yang sama. Hanya bukti bebas yang benar-benar menambah kekuatan analisis.',
        'And four: repeated labels describing the same price event. Only independent evidence genuinely adds strength to the analysis.']
    ],
    cards: [
      { x: 60, y: 220, w: 430, h: 360, at: [1, 0], col: '#3a4566', kick: '01', head: 'One isolated signal', body: 'A single FVG with nothing else. Weak on its own.' },
      { x: 515, y: 220, w: 430, h: 360, at: [2, 0], col: '#e0913a', kick: '02', head: 'Related signals', body: 'Discount + OTE from the same range. Feels like two, is closer to one.' },
      { x: 970, y: 220, w: 430, h: 360, at: [2, 4], col: '#25a198', kick: '03', head: 'Independent evidence', body: 'Location + liquidity sweep + LTF confirmation: different observations.' },
      { x: 1425, y: 220, w: 430, h: 360, at: [3, 0], col: '#e54f4d', kick: '04', head: 'Repeated labels', body: 'OB + FVG + void from one displacement candle. One event, three names.' }
    ],
    warn: { at: [3, 5], y: 620, s: '<b>Only independent evidence adds strength.</b> More labels on one event do not.' }
  }));

  const GR = [['CONTEXT', ['Market direction', 'Higher timeframe structure'], '#3b82f6'], ['LOCATION · one range', ['Dealing range', 'Premium/Discount', 'Equilibrium', 'Fibonacci OTE'], '#9b7bf0'],
    ['AREA', ['PD Arrays'], '#25a198'], ['LIQUIDITY', ['Liquidity'], '#2cc6dc'], ['BEHAVIOUR', ['Displacement', 'Lower timeframe confirmation'], '#d7b256']];
  scenes.push(T.cards({
    label: '7.2 · TYPES OF CONFLUENCE', kicker: 'SUBTOPIC ⑥ · 7.2', title: 'Ten types, five groups',
    lines: [
      ['Terdapat sepuluh jenis confluence yang kita gunakan dalam Level 6.', 'There are ten types of confluence we use in Level 6.'],
      ['Konteks: arah pasaran dan struktur higher timeframe.', 'Context: market direction and higher timeframe structure.'],
      ['Lokasi: dealing range, premium dan discount, equilibrium, dan Fibonacci OTE. Perhatikan, keempat-empat ini datang daripada range yang sama. Ia satu kumpulan bukti.',
        'Location: the dealing range, premium and discount, equilibrium, and Fibonacci OTE. Notice, all four come from the same range. They are one group of evidence.'],
      ['Kawasan: PD Arrays. Liquidity: di mana order diandaikan berada. Dan tingkah laku: displacement serta confirmation lower timeframe.',
        'Area: PD Arrays. Liquidity: where orders are assumed to rest. And behaviour: displacement and lower timeframe confirmation.']
    ],
    cards: GR.map((g, k) => ({
      x: 60 + k * 364, y: 220, w: 344, h: 440, at: [[1, 2, 3, 3, 3][k], [0, 0, 0, 2.5, 5][k]], col: g[2], kick: g[0], kc: g[2],
      html: c => g[1].map((s, j) => `<div class="a" style="left:28px;top:${70 + j * 70}px;width:290px;font-size:24px;font-weight:600;line-height:1.2">${s}</div>`).join('')
    })),
    warn: { at: [2, 6], y: 700, s: '<b>Location group:</b> range, premium/discount, equilibrium and OTE are derived from the same high and low. Treat them as one reading.' }
  }));

  scenes.push(T.chart({
    label: '7.3 · BULLISH CONFLUENCE EXAMPLE',
    lines: [
      ['Sekarang contoh bullish yang lengkap, dalam lapan langkah.', 'Now a complete bullish example, in eight steps.'],
      ['Satu: konteks higher timeframe bullish. Dua: dealing range dari 4,600 ke 4,800. Tiga: discount di bawah 4,700.', 'One: bullish higher timeframe context. Two: a dealing range from 4,600 to 4,800. Three: discount below 4,700.'],
      ['Empat: semasa pullback, harga membentuk low dalaman di 4,672. Sell-side liquidity berada di bawahnya. Harga kemudian menyapu low itu, turun ke 4,650.',
        'Four: during the pullback, price forms an internal low at 4,672. Sell-side liquidity sits below it. Price then sweeps that low, down to 4,650.'],
      ['Lima: sweep itu masuk ke fair value gap bullish, 4,645 hingga 4,668. Enam: kawasan ini juga bertindih dengan zon OTE, 4,642 hingga 4,676.',
        'Five: the sweep reaches the bullish fair value gap, 4,645 to 4,668. Six: this area also overlaps the OTE zone, 4,642 to 4,676.'],
      ['Tujuh: tunggu confirmation lower timeframe. Harga naik dan memecahkan high dalaman 4,690. Ini bullish structure shift.', 'Seven: wait for lower timeframe confirmation. Price rallies and breaks the internal high at 4,690. This is a bullish structure shift.'],
      ['Lapan: rancangan. Entry ilustrasi 4,668. Invalidation 4,638, di bawah sweep low dan gap. Target 4,800, buy-side liquidity. Risiko 30, potensi 132 mata.',
        'Eight: the plan. Illustrative entry at 4,668. Invalidation at 4,638, below the sweep low and the gap. Target 4,800, buy-side liquidity. Risk 30, potential 132 points.'],
      ['Mengapa setup ini menarik secara analitikal? Kerana lokasi, liquidity, kawasan dan tingkah laku bersetuju. Tetapi ia tidak semestinya berjaya.',
        'Why is this setup analytically interesting? Because location, liquidity, area and behaviour agree. But it does not have to succeed.']
    ],
    chart: {
      data: D_bu, pmin: 4580, pmax: 4830, step: 50, slots: 50, tag: 'BULLISH CONFLUENCE · ILLUSTRATIVE',
      n: c => 3 + 25 * P(c.t, c.at([1, 0]), 6) + 4 * P(c.t, c.at([2, 3]), 2) + 6 * P(c.t, c.at([4, 0]), 3) + 8 * P(c.t, c.at([6, 0]), 3),
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([1, 4]), { noLabel: true, i1: 48 }) + ovl.zone(S, 4642, 4676, 4, 48, C.amber, { alpha: .1, op: c.p([3, 4]) }) +
        ovl.zone(S, 4645, 4668, 9, 48, C.bull, { alpha: .18, op: c.p([3, 0]), stroke: true }) + box(S, 4668, 4638, 4800, 37, 43, c.p([5, 0])),
      ov: (S, c) => tag(S.xs(14), S.ys(4815), 'HTF: BULLISH', C.blue, { op: c.p([1, 0]), fs: 13 }) + T.rangeOv(S, 4800, 4600, 4, c.p([1, 4], .8), { i1: 48 }) +
        ovl.hl(S, 4672, 26, 33, C.cyan, { dash: '5 4', op: c.p([2, 0]) }) + tag(S.xs(24), S.ys(4672) + 22, 'SSL 4,672', C.cyan, { op: c.p([2, 0]), fs: 12 }) +
        tag(S.xs(31), S.ys(4650) + 26, 'SWEEP 4,650', C.cyan, { op: c.p([2, 5]), fs: 12 }) + tag(S.xs(48), S.ys(4668) - 14, 'FVG', C.bull, { anchor: 'end', op: c.p([3, 0]), fs: 12 }) +
        tag(S.xs(48), S.ys(4642) + 14, 'OTE 4,642–4,676', C.amber, { anchor: 'end', op: c.p([3, 4]), fs: 12 }) +
        ovl.hl(S, 4690, 28, 36, C.gold, { dash: '5 4', op: c.p([4, 0]) }) + tag(S.xs(32), S.ys(4690) - 22, 'LTF SHIFT > 4,690', C.gold, { op: c.p([4, 2]), fs: 12 })
    },
    side: {
      kicker: 'SUBTOPIC ⑥ · 7.3', title: 'Bullish confluence',
      items: [[[1, 0], '①② HTF bullish + range'], [[1, 4], '③ Discount'], [[2, 0], '④ Sell-side liquidity swept'], [[3, 0], '⑤ Bullish FVG'], [[3, 4], '⑥ OTE overlap (same range as ③)'], [[4, 0], '⑦ LTF structure shift'], [[5, 0], '⑧ Entry · invalidation · target']],
      foot: c => `<div class="mono" style="font-size:18px;color:#e8ecf4;opacity:${c.p([5, 4])}">Risk 30 : Reward 132 ≈ <span style="color:#25a198">1 : 4.4</span></div>
        <div class="warn" style="position:relative;margin-top:12px;font-size:18px;opacity:${c.p([6, 0])}"><b>Interesting, not certain.</b> It does not have to succeed.</div>`
    }
  }));

  scenes.push(T.chart({
    label: '7.4 · BEARISH CONFLUENCE EXAMPLE',
    lines: [
      ['Contoh bearish ialah cerminannya.', 'The bearish example is the mirror.'],
      ['Konteks bearish, range dari 4,800 ke 4,600, dan premium di atas 4,700. Semasa pullback, high dalaman terbentuk di 4,728, dengan buy-side liquidity di atasnya.',
        'Bearish context, a range from 4,800 to 4,600, and premium above 4,700. During the pullback, an internal high forms at 4,728, with buy-side liquidity above it.'],
      ['Harga menyapu high itu hingga 4,750, ke dalam fair value gap bearish 4,732 hingga 4,755, yang bertindih dengan OTE 4,724 hingga 4,758.',
        'Price sweeps that high up to 4,750, into the bearish fair value gap at 4,732 to 4,755, which overlaps the OTE at 4,724 to 4,758.'],
      ['Confirmation lower timeframe: harga memecahkan low dalaman 4,710. Entry ilustrasi 4,732, invalidation 4,762, target 4,600.',
        'Lower timeframe confirmation: price breaks the internal low at 4,710. Illustrative entry 4,732, invalidation 4,762, target 4,600.']
    ],
    chart: {
      data: D_be, pmin: 4570, pmax: 4820, step: 50, slots: 50, tag: 'BEARISH CONFLUENCE · ILLUSTRATIVE',
      n: c => 3 + 25 * P(c.t, c.at([1, 0]), 6) + 4 * P(c.t, c.at([2, 0]), 2) + 14 * P(c.t, c.at([3, 0]), 4),
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([1, 0]), { noLabel: true, i1: 48 }) + ovl.zone(S, 4724, 4758, 4, 48, C.amber, { alpha: .1, op: c.p([2, 3]) }) +
        ovl.zone(S, 4732, 4755, 9, 48, C.bear, { alpha: .18, op: c.p([2, 2]), stroke: true }) + box(S, 4732, 4762, 4600, 37, 43, c.p([3, 3])),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([1, 0], .8), { i1: 48 }) + ovl.hl(S, 4728, 26, 33, C.cyan, { dash: '5 4', op: c.p([1, 5]) }) +
        tag(S.xs(24), S.ys(4728) - 22, 'BSL 4,728', C.cyan, { op: c.p([1, 5]), fs: 12 }) + tag(S.xs(31), S.ys(4750) - 26, 'SWEEP 4,750', C.cyan, { op: c.p([2, 0]), fs: 12 }) +
        ovl.hl(S, 4710, 28, 36, C.gold, { dash: '5 4', op: c.p([3, 0]) }) + tag(S.xs(32), S.ys(4710) + 22, 'LTF SHIFT < 4,710', C.gold, { op: c.p([3, 1]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑥ · 7.4', title: 'Bearish confluence', items: [[[1, 0], 'Bearish context + range'], [[1, 3], 'Premium'], [[1, 5], 'Buy-side liquidity swept'], [[2, 2], 'Bearish FVG + OTE overlap'], [[3, 0], 'LTF shift + plan']],
      foot: c => `<div class="mono" style="font-size:18px;color:#e8ecf4;opacity:${c.p([3, 5])}">Risk 30 : Reward 132 ≈ <span style="color:#25a198">1 : 4.4</span></div>` }
  }));

  scenes.push(T.cards({
    label: '7.5 · CONFLUENCE WITHOUT OVERCOMPLICATION', kicker: 'SUBTOPIC ⑥ · 7.5 · CMI PRINCIPLE', title: 'Confluence without overcomplication',
    lines: [
      ['Ini prinsip utama CMI. Menambah lebih banyak indikator, zon dan label tidak semestinya memperbaiki analisis.', 'This is a key CMI principle. Adding more indicators, zones and labels does not necessarily improve the analysis.'],
      ['Carta yang terlalu penuh menyembunyikan keputusan sebenar, dan memberi rasa yakin yang palsu.', 'An over-loaded chart hides the real decision, and gives a false sense of confidence.'],
      ['Sebaliknya, utamakan enam perkara: arah pasaran yang relevan, lokasi harga yang bermakna, bukti struktur yang jelas, liquidity yang relevan, pencetus confirmation yang ditetapkan, dan titik invalidation yang logik.',
        'Instead, prioritise six things: relevant market direction, meaningful price location, clear structural evidence, relevant liquidity, a defined confirmation trigger, and a logical invalidation point.']
    ],
    cards: [
      { x: 60, y: 220, w: 760, h: 470, at: [1, 0], col: '#e54f4d', kick: 'OVERCOMPLICATED', head: 'Many labels, unclear decision', html: c => ['3 oscillators + 4 moving averages', '9 zones on one chart', 'Fibonacci on every leg', 'Five timeframes at once', 'No defined invalidation'].map((s, k) => E.chk(28, 120 + k * 60, s, c.p([1, k * .6]), false, 22)).join('') },
      { x: 860, y: 220, w: 1000, h: 470, at: [2, 0], col: '#25a198', kick: 'CMI PRIORITIES', head: 'Six things that matter', html: c => ['Relevant market direction', 'Meaningful price location', 'Clear structural evidence', 'Relevant liquidity', 'A defined confirmation trigger', 'A logical invalidation point'].map((s, k) => E.chk(28, 120 + k * 54, s, c.p([2, 3 + k * 1.3]), true, 23)).join('') }
    ]
  }));

  /* 7.6 double counting animation */
  const LBL = [['Discount', 0, C.purple], ['Below equilibrium', 0, C.purple], ['In OTE 62–79%', 0, C.purple], ['Bullish FVG', 1, C.bull], ['Bullish OB (same displacement)', 1, C.bull], ['Sell-side liquidity swept', 2, C.cyan], ['LTF structure shift', 3, C.gold]];
  const GRP = [['LOCATION', 'one range', C.purple], ['DISPLACEMENT FOOTPRINT', 'one event', C.bull], ['LIQUIDITY', 'separate observation', C.cyan], ['CONFIRMATION', 'separate observation', C.gold]];
  scenes.push({
    label: '7.6 · AVOID DOUBLE-COUNTING',
    lines: [
      ['Sekarang double-counting. Lihat senarai tujuh label ini untuk setup bullish tadi. Ia kelihatan seperti tujuh confluence.', 'Now double-counting. Look at this list of seven labels for the bullish setup. It looks like seven confluences.'],
      ['Tetapi discount, di bawah equilibrium, dan dalam OTE, ketiga-tiganya dikira daripada high dan low yang sama. Ia satu bacaan lokasi.',
        'But discount, below equilibrium, and in OTE are all calculated from the same high and low. They are one location reading.'],
      ['FVG dan order block itu terbentuk daripada displacement yang sama. Ia satu peristiwa, dengan dua nama.', 'The FVG and the order block were formed by the same displacement. They are one event, with two names.'],
      ['Liquidity sweep dan structure shift pula ialah pemerhatian yang berbeza. Jadi tujuh label menjadi empat bukti bebas.', 'The liquidity sweep and the structure shift are different observations. So seven labels become four independent pieces of evidence.'],
      ['Lima label tidak automatik bermakna lima bukti bebas. Kira kumpulan, bukan label.', 'Five labels do not automatically mean five independent pieces of evidence. Count groups, not labels.']
    ],
    draw(t, L) {
      const m = P(t, L[1], 1.2), m2 = P(t, L[2], 1.2), m3 = P(t, L[3], 1.2);
      const mv = g => g === 0 ? m : g === 1 ? m2 : m3;
      const items = LBL.map((l, k) => {
        const g = l[1], x0 = 60, y0 = 210 + k * 76, x1 = 1060, y1 = 220 + g * 150, f = mv(g);
        const first = k === [0, 3, 5, 6][g], x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f, a = P(t, .5 + k * .4, .4) * (first ? 1 : 1 - f);
        const label = first && f > .9 && g < 2 ? ['Discount · Below EQ · OTE', 'FVG + OB (one displacement)'][g] : l[0];
        return `<div class="card" style="left:${x}px;top:${y}px;width:560px;height:60px;opacity:${a};border-color:${l[2]}"><div class="a" style="left:22px;top:15px;font-size:23px;font-weight:600;color:${l[2]}">${label}</div></div>`;
      }).join('');
      const groups = GRP.map((g, k) => { const a = mv(k); return `<div class="a mono" style="left:1640px;top:${236 + k * 150}px;font-size:16px;letter-spacing:1.5px;color:${g[2]};opacity:${a}">${g[0]}</div><div class="a" style="left:1640px;top:${262 + k * 150}px;font-size:18px;color:#8a93a8;opacity:${a}">${g[1]}</div>`; }).join('');
      const cnt = t >= L[2] + 1.2 ? 4 : t >= L[1] + 1.2 ? 5 : 7;
      return `<div class="kicky" style="left:60px;top:110px">SUBTOPIC ⑥ · 7.6</div><div class="h2" style="left:60px;top:140px">Avoid double-counting</div>${items}${groups}
        <div class="a mono" style="left:60px;top:780px;font-size:26px;color:#fff">LABELS 7 → INDEPENDENT EVIDENCE <span style="color:#d7b256;font-weight:700">${cnt}</span></div>
        <div class="warn" style="left:900px;top:768px;width:960px;opacity:${P(t, L[4], .5)}"><b>Count groups, not labels.</b></div>`;
    }
  });

  scenes.push(T.summary({
    title: 'Multiple Confluences',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Confluence yang bermakna datang daripada bukti bebas, bukan label yang berulang.', 'Meaningful confluence comes from independent evidence, not repeated labels.'],
      ['Sepuluh jenis confluence boleh dikumpulkan kepada lima: konteks, lokasi, kawasan, liquidity dan tingkah laku.', 'The ten confluence types group into five: context, location, area, liquidity and behaviour.'],
      ['Utamakan enam perkara CMI, dan kira kumpulan, bukan label. Setup yang menarik masih boleh gagal.', 'Prioritise the six CMI items, and count groups, not labels. An interesting setup can still fail.']
    ],
    items: [[[1, 0], 'Independent evidence only'], [[2, 0], 'Five groups of confluence'], [[2, 3], 'Location group = one reading'], [[3, 0], 'Six CMI priorities'], [[3, 2.5], 'Count groups, not labels'], [[3, 4], 'Interesting ≠ certain']]
  }));

  scenes.push(T.quiz([
    ['Why can multiple overlapping confluences still produce a losing trade?', 'Many labels may describe the same evidence, and even truly independent evidence only improves the odds of an analysis. No combination guarantees a reaction, so risk and invalidation remain essential.',
      'mengapa banyak confluence yang bertindih masih boleh menghasilkan trade yang rugi?', 'banyak label mungkin menerangkan bukti yang sama, dan bukti bebas sekalipun hanya menambah kekuatan analisis. Tiada gabungan yang menjamin tindak balas, jadi risiko dan invalidation tetap penting.'],
    ['Discount, below equilibrium, and in OTE, all from one range. How many independent confluences?', 'One. All three are derived from the same high and low, so they form a single location reading.',
      'discount, di bawah equilibrium, dan dalam OTE, semuanya daripada satu range. Berapa confluence bebas?', 'satu. Ketiga-tiganya dikira daripada high dan low yang sama, jadi ia satu bacaan lokasi.'],
    ['Entry 4,668, invalidation 4,638, target 4,800. What is the risk-to-reward?', 'Risk 30, reward 132. 132 ÷ 30 = 4.4, so about 1 : 4.4.',
      'entry 4,668, invalidation 4,638, target 4,800. Apakah risk-to-reward?', 'risiko 30, reward 132. 132 bahagi 30 ialah 4.4, jadi lebih kurang 1 kepada 4.4.',
      'Entry 4,668, invalidation 4,638, target 4,800. What is the risk to reward?', 'Risk 30, reward 132. 132 divided by 30 is 4.4, so about 1 to 4.4.'],
    ['Name the six CMI priorities for confluence.', 'Relevant market direction, meaningful price location, clear structural evidence, relevant liquidity, a defined confirmation trigger, and a logical invalidation point.',
      'namakan enam keutamaan CMI untuk confluence.', 'arah pasaran yang relevan, lokasi harga yang bermakna, bukti struktur yang jelas, liquidity yang relevan, pencetus confirmation yang ditetapkan, dan titik invalidation yang logik.']
  ]));

  scenes.push(T.exercise({
    title: 'Count independent evidence',
    lines: [
      ['Latihan praktikal: ambil satu setup daripada carta anda dan senaraikan setiap label confluence yang anda nampak.', 'Practical exercise: take one setup from your chart and list every confluence label you can see.'],
      ['Kumpulkan label itu mengikut sumbernya: konteks, lokasi, kawasan, liquidity atau tingkah laku. Gabungkan yang datang daripada peristiwa yang sama.', 'Group the labels by source: context, location, area, liquidity or behaviour. Merge those that come from the same event.'],
      ['Kemudian tulis berapa bukti bebas yang tinggal, dan sama ada ia cukup untuk bertindak.', 'Then write how many independent pieces of evidence remain, and whether that is enough to act.']
    ],
    steps: [[[1, 0], 'List every confluence label on one setup'], [[2, 0], 'Group by source: context / location / area / liquidity / behaviour'], [[2, 4], 'Merge labels from the same event'], [[3, 0], 'Count independent evidence'], [[3, 2.5], 'Decide: enough to act, or wait?']]
  }));

  scenes.push(T.next({
    no: '13', short: 'Conflicts &amp; No-Trade', kicker: 'SUBTOPIC ⑥', title: 'Conflicting confluences &amp; no-trade conditions',
    lines: [['Dalam video seterusnya: apa yang perlu dilakukan apabila bukti bercanggah, dan bila keputusan terbaik ialah tidak trade.', 'In the next video: what to do when evidence conflicts, and when the best decision is not to trade.']],
    html: (t) => `<div class="a" style="left:0;width:1200px;text-align:center;top:180px;font-size:56px;font-weight:700;color:#e8ecf4;opacity:${P(t, .5, .6)}">No trade is a valid decision.</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy'], 'Confluence ialah konsep umum analisis teknikal. Pengelompokan dan peraturan double-counting ialah kerangka pengajaran CMI.',
    'Confluence is a general technical analysis concept. The grouping and double-counting rules are a CMI teaching framework.', 'The five groups and the double-counting rule are a CMI teaching framework, not an external standard.'));
  scenes.push(T.disclaimer('13', 'Conflicts &amp; No-Trade'));
  registerVideo({ id: 'v12', title: 'VIDEO 12 — MULTIPLE CONFLUENCES', scenes });
})();
