/* VIDEO 04 — Premium & Discount. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  // explicit three-candle FVG patch: rows of [o,h,l,c]; open of first is previous close
  const patch = (d, i, rows) => { rows.forEach((r, k) => { const o = k === 0 ? d[i - 1].c : rows[k - 1][3]; d[i + k] = { o, h: Math.max(r[1], o, r[3]), l: Math.min(r[2], o, r[3]), c: r[3] }; }); if (d[i + rows.length]) d[i + rows.length].o = rows[rows.length - 1][3]; return d; };
  const BULL = [[0, 4640], [4, 4600], [8, 4625], [12, 4705], [20, 4800], [28, 4650]];
  const BEAR = [[0, 4760], [4, 4800], [8, 4775], [12, 4695], [20, 4600], [28, 4750]];
  const bullF = d => patch(d, 9, [[0, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]]); // FVG 4,645–4,668
  const bearF = d => patch(d, 9, [[0, 4774, 4755, 4758], [0, 4760, 4706, 4710], [0, 4732, 4692, 4698]]); // FVG 4,732–4,755
  const D_bu = bullF(gen([...BULL, [38, 4760]], 91));
  const D_be = bearF(gen([...BEAR, [38, 4640]], 92));
  const D_dA = bullF(gen([...BULL, [31, 4672], [42, 4570]], 93)), D_dB = bullF(gen([...BULL, [42, 4790]], 94));
  const D_pA = bearF(gen([...BEAR, [31, 4728], [42, 4830]], 95)), D_pB = bearF(gen([...BEAR, [42, 4610]], 96));
  const D_tr = gen([[0, 4640], [4, 4600], [16, 4800], [20, 4772], [30, 4880], [34, 4852], [44, 4960]], 97);
  const D_def = gen([[0, 4650], [4, 4600], [18, 4800], [26, 4745], [32, 4775], [40, 4655], [46, 4700]], 98);
  const scenes = [];
  const bullFvg = (S, a, i1 = 30) => ovl.zone(S, 4645, 4668, 9, i1, C.bull, { alpha: .16, op: a, stroke: true }) + tag(S.xs(13), S.ys(4668) - 16, 'BULLISH FVG 4,645–4,668', C.bull, { anchor: 'start', op: a, fs: 13 });
  const bearFvg = (S, a, i1 = 30) => ovl.zone(S, 4732, 4755, 9, i1, C.bear, { alpha: .16, op: a, stroke: true }) + tag(S.xs(13), S.ys(4732) + 16, 'BEARISH FVG 4,732–4,755', C.bear, { anchor: 'start', op: a, fs: 13 });

  scenes.push(T.title({
    no: '04', sub: 'SUBTOPIC ③', title: 'Premium &amp; Discount', tagline: 'Understanding price location',
    objectives: ['Define premium and discount', 'Apply them in bullish and bearish context', 'Understand why they are contextual', 'Avoid treating location as a signal'],
    lines: [
      ['Selamat kembali. Dalam Video 4, kita mempelajari Premium dan Discount.', 'Welcome back. In Video 4, we study Premium and Discount.'],
      ['Anda akan belajar mentakrifkan kedua-duanya, menggunakannya dalam konteks bullish dan bearish,',
        'You will learn to define both, apply them in bullish and bearish context,'],
      ['dan memahami bahagian paling penting: premium dan discount ialah konteks, bukan isyarat automatik.',
        'and understand the most important part: premium and discount are context, not automatic signals.']
    ],
    illus: (t, L) => {
      const X0 = 1130, X1 = 1810, YT = 430, YB = 740, YM = 585, a = P(t, L[0] + 1, .8), b = P(t, L[1], .8);
      return `<rect x="${X0}" y="${YT}" width="${X1 - X0}" height="${YM - YT}" fill="${C.purple}" opacity="${.18 * a}"/><rect x="${X0}" y="${YM}" width="${X1 - X0}" height="${YB - YM}" fill="${C.purple}" opacity="${.07 * a}"/>` +
        `<line x1="${X0}" x2="${X1}" y1="${YM}" y2="${YM}" stroke="${C.amber}" stroke-width="2.4" stroke-dasharray="9 7" opacity="${a}"/>` +
        txt((X0 + X1) / 2, (YT + YM) / 2 + 8, 'PREMIUM', { anchor: 'middle', col: C.purple, fs: 26, fw: 700, ls: 4, op: b }) +
        txt((X0 + X1) / 2, (YM + YB) / 2 + 8, 'DISCOUNT', { anchor: 'middle', col: C.purple, fs: 26, fw: 700, ls: 4, op: b }) +
        txt(X1 - 12, YM - 10, 'EQ 50%', { anchor: 'end', col: C.amber, fs: 15, fw: 700, op: a });
    }
  }));

  scenes.push(T.chart({
    label: '4.1–4.3 · DEFINITIONS',
    lines: [
      ['Premium ialah separuh atas dealing range yang dipilih, di atas equilibrium 50 peratus.', 'Premium is the upper half of a selected dealing range, above the 50 percent equilibrium.'],
      ['Discount ialah separuh bawah dealing range yang dipilih, di bawah equilibrium 50 peratus.', 'Discount is the lower half of a selected dealing range, below the 50 percent equilibrium.'],
      ['Dalam range 4,600 hingga 4,800: premium ialah 4,700 hingga 4,800, dan discount ialah 4,600 hingga 4,700.',
        'In the 4,600 to 4,800 range: premium is 4,700 to 4,800, and discount is 4,600 to 4,700.'],
      ['Dalam siri ini, ungu digunakan untuk zon premium dan discount, dan amber untuk equilibrium. Warna ini kekal dalam setiap video.',
        'In this series, purple marks the premium and discount zones, and amber marks equilibrium. These colours stay consistent in every video.'],
      ['Perhatikan bahawa definisi ini sepenuhnya relatif. Tanpa range, perkataan premium dan discount tidak bermakna.',
        'Notice that these definitions are entirely relative. Without a range, the words premium and discount have no meaning.']
    ],
    chart: {
      data: D_def, pmin: 4560, pmax: 4840, step: 50, slots: 48, reveal: [0, 0], revealDur: 5, tag: 'LOCATION WITHIN THE RANGE',
      under: (S, c) => ovl.zone(S, 4700, 4800, 4, null, C.purple, { alpha: .18, op: c.p([0, 1]) }) + ovl.zone(S, 4600, 4700, 4, null, C.purple, { alpha: .07, op: c.p([1, 1]) }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([0, 0], 1)) +
        txt(S.xs(30), S.ys(4790) + 6, 'PREMIUM · 4,700–4,800', { col: C.purple, fs: 18, fw: 700, ls: 2, op: c.p([2, 0]), anchor: 'middle' }) +
        txt(S.xs(30), S.ys(4615) + 6, 'DISCOUNT · 4,600–4,700', { col: C.purple, fs: 18, fw: 700, ls: 2, op: c.p([2, 2]), anchor: 'middle' })
    },
    side: {
      kicker: 'SUBTOPIC ③ · 4.1–4.3', title: 'Premium &amp; Discount',
      items: [[[0, 0], 'Premium: upper half, above EQ'], [[1, 0], 'Discount: lower half, below EQ'], [[3, 0], 'Purple = P/D zones · Amber = EQ'], [[4, 0], 'Entirely relative to the selected range']]
    }
  }));

  const bullLines = [
    ['Sekarang konteks bullish, dalam tujuh langkah.', 'Now the bullish context, in seven steps.'],
    ['Satu: wujudkan dealing range bullish yang relevan, dari low 4,600 ke high 4,800. Dua: tandakan equilibrium di 4,700.',
      'One: establish a relevant bullish dealing range, from the 4,600 low to the 4,800 high. Two: mark equilibrium at 4,700.'],
    ['Tiga: kenal pasti kawasan discount, di bawah 4,700.', 'Three: identify the discount area, below 4,700.'],
    ['Empat: perhatikan retracement. Harga turun dari 4,800 dan memasuki discount.', 'Four: observe the retracement. Price falls from 4,800 and enters discount.'],
    ['Lima: kenal pasti PD Array bullish yang relevan. Semasa rally, displacement meninggalkan fair value gap bullish antara 4,645 dan 4,668.',
      'Five: identify a relevant bullish PD Array. During the rally, displacement left a bullish fair value gap between 4,645 and 4,668.'],
    ['Enam: nilai konteks liquidity, contohnya sama ada range low 4,600 masih utuh. Dan tunggu confirmation pada lower timeframe.',
      'Six: evaluate liquidity context, for example whether the 4,600 range low remains intact. And wait for lower timeframe confirmation.'],
    ['Tujuh: fahami perbezaannya. Setakat ini, ini hanyalah setup berpotensi. Ia menjadi trade hanya selepas confirmation, dengan invalidation dan target yang jelas.',
      'Seven: understand the difference. So far, this is only a potential setup. It becomes a trade only after confirmation, with a clear invalidation and target.']
  ];
  scenes.push(T.chart({
    label: '4.4 · BULLISH CONTEXT', lines: bullLines,
    chart: {
      data: D_bu, pmin: 4560, pmax: 4840, step: 50, slots: 40, tag: 'BULLISH · ILLUSTRATIVE',
      n: c => 3 + 18 * P(c.t, c.at([0, .3]), 4) + 8 * P(c.t, c.at([3, 0]), 3) + 10 * P(c.t, c.at([6, 3]), 3),
      under: (S, c) => ovl.zone(S, 4600, 4700, 4, null, C.purple, { alpha: .1, op: c.p([2, 0]) }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([1, 0], 1)) + txt(S.xs(34), S.ys(4615) + 6, 'DISCOUNT', { col: C.purple, fs: 17, fw: 700, ls: 2, op: c.p([2, 0]), anchor: 'middle' }) +
        bullFvg(S, c.p([4, 1])) + tag(S.xs(28), S.ys(4650) + 30, 'RETRACE INTO DISCOUNT', C.gold, { op: c.p([3, 2]), fs: 13 }) +
        ovl.hl(S, 4600, 4, null, C.cyan, { dash: '6 5', op: c.p([5, 0]), w: 2 }) + tag(S.xs(16), S.ys(4600) + 24, 'SSL BELOW 4,600 · INTACT', C.cyan, { op: c.p([5, 0]), fs: 13 }) +
        tag(S.xs(31), S.ys(4690) - 6, 'LTF CONFIRMATION?', C.gold, { op: c.p([5, 4]) * (1 - c.p([6, 3])), fs: 13 })
    },
    side: {
      kicker: 'SUBTOPIC ③ · 4.4', title: 'Bullish context',
      items: [[[1, 0], '①② Range + equilibrium'], [[2, 0], '③ Discount below 4,700'], [[3, 0], '④ Retracement into discount'], [[4, 0], '⑤ Relevant bullish PD Array'], [[5, 0], '⑥ Liquidity + LTF confirmation']],
      foot: c => `<div class="warn" style="position:relative;margin-top:10px;font-size:19px;opacity:${c.p([6, 0])}"><b>⑦ Potential setup ≠ trade.</b> Execution needs confirmation, invalidation and a target.</div>`
    }
  }));

  scenes.push(T.chart({
    label: '4.5 · BEARISH CONTEXT',
    lines: [
      ['Konteks bearish ialah cerminannya.', 'The bearish context is the mirror image.'],
      ['Wujudkan range bearish dari high 4,800 ke low 4,600, dan tandakan equilibrium di 4,700.', 'Establish a bearish range from the 4,800 high to the 4,600 low, and mark equilibrium at 4,700.'],
      ['Kenal pasti kawasan premium, di atas 4,700. Kemudian perhatikan retracement ke atas, memasuki premium.',
        'Identify the premium area, above 4,700. Then observe the upward retracement into premium.'],
      ['PD Array bearish yang relevan di sini ialah fair value gap bearish antara 4,732 dan 4,755, yang ditinggalkan oleh displacement ke bawah.',
        'The relevant bearish PD Array here is the bearish fair value gap between 4,732 and 4,755, left by the downward displacement.'],
      ['Kemudian nilai liquidity, buy-side di atas high 4,800, dan tunggu confirmation lower timeframe sebelum mempertimbangkan sebarang trade.',
        'Then evaluate liquidity, buy-side above the 4,800 high, and wait for lower timeframe confirmation before considering any trade.']
    ],
    chart: {
      data: D_be, pmin: 4560, pmax: 4840, step: 50, slots: 40, tag: 'BEARISH · ILLUSTRATIVE',
      n: c => 3 + 18 * P(c.t, c.at([0, .3]), 4) + 8 * P(c.t, c.at([2, 2]), 3) + 10 * P(c.t, c.at([4, 3]), 3),
      under: (S, c) => ovl.zone(S, 4700, 4800, 4, null, C.purple, { alpha: .16, op: c.p([2, 0]) }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([1, 0], 1)) + txt(S.xs(34), S.ys(4785) + 6, 'PREMIUM', { col: C.purple, fs: 17, fw: 700, ls: 2, op: c.p([2, 0]), anchor: 'middle' }) +
        bearFvg(S, c.p([3, 0])) + ovl.hl(S, 4800, 4, null, C.cyan, { dash: '6 5', op: c.p([4, 0]), w: 2 }) + tag(S.xs(16), S.ys(4800) - 24, 'BSL ABOVE 4,800', C.cyan, { op: c.p([4, 0]), fs: 13 })
    },
    side: {
      kicker: 'SUBTOPIC ③ · 4.5', title: 'Bearish context',
      items: [[[1, 0], 'Bearish range + equilibrium'], [[2, 0], 'Premium above 4,700'], [[2, 3], 'Retracement into premium'], [[3, 0], 'Relevant bearish PD Array'], [[4, 0], 'Liquidity + LTF confirmation']]
    }
  }));

  /* 4.6 contextual: discount A vs B */
  scenes.push(T.two({
    label: '4.6 · DISCOUNT: TWO OUTCOMES',
    lines: [
      ['Ini bahagian yang paling penting dalam video ini. Discount tidak bermakna beli secara automatik.', 'This is the most important part of this video. Discount does not automatically mean buy.'],
      ['Contoh A: harga memasuki discount, melantun lemah ke 4,672, kemudian terus jatuh menembusi fair value gap dan range low 4,600.',
        'Example A: price enters discount, bounces weakly to 4,672, then continues lower through the fair value gap and the 4,600 range low.'],
      ['Tiada tindak balas yang disahkan, dan struktur bertukar bearish. Sesiapa yang membeli hanya kerana "discount" akan rugi.',
        'There was no confirmed reaction, and structure turned bearish. Anyone who bought only because of discount would have lost.'],
      ['Contoh B: struktur yang sama. Harga memasuki discount, bertindak balas di fair value gap bullish, dan lower timeframe mengesahkan bullish shift.',
        'Example B: the same structure. Price enters discount, reacts at the bullish fair value gap, and the lower timeframe confirms a bullish shift.'],
      ['Lokasi yang sama. Hasil yang berbeza. Perbezaannya ialah tindak balas dan confirmation, bukan lokasi itu sendiri.',
        'Same location. Different outcomes. The difference is the reaction and confirmation, not the location itself.']
    ],
    a: { data: D_dA, pmin: 4540, pmax: 4840, step: 50, slots: 44, reveal: [1, 0], revealDur: 6, title: 'EXAMPLE A · HYPOTHETICAL', tag: 'DISCOUNT · NO REACTION',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, 1, { noLabel: true, i1: 43 }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1, { hl: 'HIGH ', ll: 'LOW ' }) + bullFvg(S, 1, 43).replace(/BULLISH FVG 4,645–4,668/, 'FVG') + tag(S.xs(38), S.ys(4570) + 28, '✗ BROKE THROUGH', C.bear, { op: c.p([2, 0]), fs: 14 }) },
    b: { data: D_dB, pmin: 4540, pmax: 4840, step: 50, slots: 44, reveal: [3, 0], revealDur: 6, title: 'EXAMPLE B · HYPOTHETICAL', tag: 'DISCOUNT · REACTION + CONFIRMATION', show: [3, 0],
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, 1, { noLabel: true, i1: 43 }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1, { hl: 'HIGH ', ll: 'LOW ' }) + bullFvg(S, 1, 43).replace(/BULLISH FVG 4,645–4,668/, 'FVG') + tag(S.xs(31), S.ys(4650) + 30, '✓ REACTION + LTF SHIFT', C.bull, { op: c.p([3, 4]), fs: 14 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([4, 0])}"><b>Same location, different outcome:</b> reaction and confirmation make the difference, not discount itself.</div>`
  }));

  scenes.push(T.two({
    label: '4.6 · PREMIUM: TWO OUTCOMES',
    lines: [
      ['Perkara yang sama berlaku untuk premium. Premium tidak bermakna jual secara automatik.', 'The same applies to premium. Premium does not automatically mean sell.'],
      ['Contoh A: harga memasuki premium, berhenti seketika, kemudian terus naik menembusi fair value gap bearish dan range high 4,800.',
        'Example A: price enters premium, pauses, then continues higher through the bearish fair value gap and the 4,800 range high.'],
      ['Contoh B: harga memasuki premium, ditolak di fair value gap bearish, dan lower timeframe mengesahkan bearish shift sebelum harga jatuh.',
        'Example B: price enters premium, is rejected at the bearish fair value gap, and the lower timeframe confirms a bearish shift before price falls.']
    ],
    a: { data: D_pA, pmin: 4560, pmax: 4860, step: 50, slots: 44, reveal: [1, 0], revealDur: 6, title: 'EXAMPLE A · HYPOTHETICAL', tag: 'PREMIUM · NO REJECTION',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, 1, { noLabel: true, i1: 43 }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1, { hl: 'HIGH ', ll: 'LOW ' }) + bearFvg(S, 1, 43).replace(/BEARISH FVG 4,732–4,755/, 'FVG') + tag(S.xs(38), S.ys(4830) - 28, '✗ BROKE THROUGH', C.bear, { op: c.p([1, 4]), fs: 14 }) },
    b: { data: D_pB, pmin: 4560, pmax: 4860, step: 50, slots: 44, reveal: [2, 0], revealDur: 6, title: 'EXAMPLE B · HYPOTHETICAL', tag: 'PREMIUM · REJECTION + CONFIRMATION', show: [2, 0],
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, 1, { noLabel: true, i1: 43 }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1, { hl: 'HIGH ', ll: 'LOW ' }) + bearFvg(S, 1, 43).replace(/BEARISH FVG 4,732–4,755/, 'FVG') + tag(S.xs(31), S.ys(4750) - 30, '✓ REJECTION + LTF SHIFT', C.bull, { op: c.p([2, 4]), fs: 14 }) },
    h: 640
  }));

  scenes.push(T.chart({
    label: '4.6 · PREMIUM DURING A STRONG TREND',
    lines: [
      ['Satu lagi perkara penting: harga boleh kekal di premium sepanjang trend bullish yang kuat.', 'One more important point: price can remain in premium throughout a strong bullish trend.'],
      ['Dalam range 4,600 hingga 4,800, harga tidak pernah kembali ke discount. Ia menembusi high dan terus naik ke 4,960.',
        'In the 4,600 to 4,800 range, price never returns to discount. It breaks the high and keeps rising to 4,960.'],
      ['Trader yang menunggu discount dalam range lama akan terlepas keseluruhan pergerakan. Trader yang menjual premium akan melawan trend.',
        'A trader waiting for discount in the old range misses the whole move. A trader selling premium fights the trend.'],
      ['Begitu juga, harga boleh kekal di discount sepanjang trend bearish yang kuat. Dan timeframe berbeza boleh memberi bacaan premium dan discount yang berbeza.',
        'Likewise, price can remain in discount throughout a strong bearish trend. And different timeframes can give different premium and discount readings.']
    ],
    chart: {
      data: D_tr, pmin: 4560, pmax: 5000, step: 50, slots: 46, reveal: [1, 0], revealDur: 7, tag: 'STRONG TREND',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([0, 1]), { i1: 18, noLabel: true }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([0, 1]), { i1: 18 }) + tag(S.xs(30), S.ys(4880) - 30, 'NEVER RETURNED TO DISCOUNT', C.gold, { op: c.p([1, 4]), fs: 14 })
    },
    side: { kicker: 'SUBTOPIC ③ · 4.6', title: 'Context decides', items: [[[0, 0], 'Price can stay in premium in a strong uptrend'], [[3, 0], '…and in discount in a strong downtrend'], [[3, 4], 'Different timeframes → different readings'], [[2, 0], 'Premium ≠ sell · Discount ≠ buy', 'r']] }
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ③ · 4.7', title: 'Common premium &amp; discount mistakes', rowH: 140,
    lines: [
      ['Kesilapan biasa:', 'Common mistakes:'],
      ['Membeli setiap aras discount. Menjual setiap aras premium. Dan mengabaikan struktur pasaran.', 'Buying every discount level. Selling every premium level. And ignoring market structure.'],
      ['Menggunakan dealing range yang tidak relevan. Mengabaikan liquidity. Dan yang paling biasa: mengelirukan lokasi dengan confirmation.',
        'Using an irrelevant dealing range. Ignoring liquidity. And the most common: confusing location with confirmation.']
    ],
    items: [
      [[1, 0], 'Buying every discount level', 'Discount is location, not a trigger.'], [[1, 2], 'Selling every premium level', 'Premium can persist in strong uptrends.'],
      [[1, 4], 'Ignoring market structure', 'Structure sets direction; P/D only sets location.'], [[2, 0], 'Irrelevant dealing range', 'Wrong range → wrong premium/discount reading.'],
      [[2, 2.5], 'Ignoring liquidity', 'Where stops rest affects how price behaves at a zone.'], [[2, 5], 'Location confused with confirmation', 'A good location still needs a confirmed reaction.']
    ]
  }));

  scenes.push(T.summary({
    title: 'Premium &amp; Discount',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Premium ialah separuh atas range, di atas equilibrium. Discount ialah separuh bawah, di bawah equilibrium.', 'Premium is the upper half of the range, above equilibrium. Discount is the lower half, below equilibrium.'],
      ['Dalam konteks bullish, kita mencari peluang di discount. Dalam konteks bearish, di premium. Tetapi hanya dengan confirmation.',
        'In bullish context, we look for opportunity in discount. In bearish context, in premium. But only with confirmation.'],
      ['Premium dan discount ialah konteks lokasi, bukan isyarat. Range dan timeframe menentukan bacaannya.', 'Premium and discount are location context, not signals. The range and timeframe determine the reading.']
    ],
    items: [[[1, 0], 'Premium: above EQ'], [[1, 2.5], 'Discount: below EQ'], [[2, 0], 'Bullish context → look in discount'], [[2, 2.5], 'Bearish context → look in premium'],
      [[3, 0], 'Location ≠ signal'], [[3, 2.5], 'Range &amp; timeframe determine the reading']]
  }));

  scenes.push(T.quiz([
    ['Why is discount not automatically a buy signal?', 'Discount only describes location relative to a selected range. Structure may still be bearish, and price can continue lower without a confirmed reaction.',
      'mengapa discount bukan isyarat beli automatik?', 'discount hanya menerangkan lokasi relatif kepada range yang dipilih. Struktur mungkin masih bearish, dan harga boleh terus jatuh tanpa tindak balas yang disahkan.'],
    ['Range 4,600–4,800. Price is at 4,760. Premium or discount?', 'Premium. 4,760 is above the 4,700 equilibrium.',
      'range 4,600 hingga 4,800. Harga di 4,760. Premium atau discount?', 'premium. 4,760 berada di atas equilibrium 4,700.',
      'The range is 4,600 to 4,800. Price is at 4,760. Premium or discount?', 'Premium. 4,760 is above the 4,700 equilibrium.'],
    ['How can price stay in premium for a long time?', 'In a strong bullish trend, price can break the range high without returning to discount. The old range becomes less relevant.',
      'bagaimana harga boleh kekal di premium untuk masa yang lama?', 'dalam trend bullish yang kuat, harga boleh menembusi range high tanpa kembali ke discount. Range lama menjadi kurang relevan.'],
    ['What separated Example A from Example B?', 'Not location: both entered discount. B showed a reaction at a relevant PD Array and lower timeframe confirmation. A did not.',
      'apakah yang membezakan Contoh A dan Contoh B?', 'bukan lokasi, kerana kedua-duanya memasuki discount. B menunjukkan tindak balas di PD Array yang relevan dan confirmation lower timeframe. A tidak.']
  ]));

  scenes.push(T.exercise({
    title: 'Shade premium and discount',
    lines: [
      ['Latihan praktikal: gunakan range dan equilibrium daripada latihan sebelumnya.', 'Practical exercise: use the range and equilibrium from the previous exercises.'],
      ['Lorekkan premium dan discount, dan catat di mana harga semasa berada pada dua timeframe.', 'Shade premium and discount, and record where current price sits on two timeframes.'],
      ['Kemudian cari tiga contoh sejarah di mana harga memasuki discount, dan catat sama ada ia bertindak balas atau terus bergerak.', 'Then find three historical examples where price entered discount, and record whether it reacted or continued.']
    ],
    steps: [[[1, 0], 'Shade premium (above EQ) and discount (below EQ)'], [[1, 3], 'Record current location on two timeframes'], [[2, 0], 'Find three past entries into discount'],
      [[2, 3], 'For each: reaction, or continuation?'], [[2, 6], 'What was present when it reacted? PD Array? confirmation?']]
  }));

  scenes.push(T.next({
    no: '05', short: 'Fibonacci OTE', kicker: 'SUBTOPIC ④', title: 'Fibonacci OTE — retracement and correct anchoring',
    lines: [['Dalam video seterusnya: Fibonacci Optimal Trade Entry, zon 62 hingga 79 peratus, dan cara anchor Fibonacci dengan betul.',
      'In the next video: Fibonacci Optimal Trade Entry, the 62 to 79 percent zone, and how to anchor Fibonacci correctly.']],
    html: (t) => `<div class="a mono" style="left:0;width:1200px;text-align:center;top:160px;font-size:58px;color:#f0a03a;font-weight:700;opacity:${P(t, .5, .6)}">0.62 · 0.705 · 0.79</div>
      <div class="a mono" style="left:0;width:1200px;text-align:center;top:260px;font-size:24px;color:#8a93a8;letter-spacing:3px;opacity:${P(t, 1.5, .6)}">OPTIMAL TRADE ENTRY</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy'], 'Premium dan discount ialah istilah ICT. Konsep support, resistance dan trend daripada analisis teknikal konvensional.',
    'Premium and discount are ICT terms. Support, resistance and trend concepts come from conventional technical analysis.', 'Premium/discount relative to equilibrium is ICT terminology; trend persistence is a conventional technical analysis observation.'));
  scenes.push(T.disclaimer('05', 'Fibonacci OTE'));
  registerVideo({ id: 'v04', title: 'VIDEO 04 — PREMIUM &amp; DISCOUNT', scenes });
})();
