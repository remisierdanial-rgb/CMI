/* VIDEO 10 — Old High / Old Low & Liquidity References. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const D_ref = gen([[0, 4700], [4, 4790], [10, 4690], [15, 4745], [20, 4650], [26, 4722], [32, 4630], [38, 4700], [44, 4680]], 151);
  const D_eq = gen([[0, 4700], [5, 4782], [10, 4700], [15, 4780], [20, 4660], [25, 4620], [29, 4690], [33, 4622], [40, 4705]], 152, { noise: .6 });
  const D_sw = T.patch(gen([[0, 4700], [5, 4782], [10, 4700], [15, 4780], [21, 4720], [24, 4770], [34, 4640]], 153), 25, [[4770, 4795, 4766, 4774], [4774, 4778, 4752, 4756]]);
  const D_br = gen([[0, 4700], [5, 4782], [10, 4700], [15, 4780], [21, 4720], [26, 4810], [29, 4796], [36, 4860]], 154);
  const D_ie = T.patch(gen([[0, 4640], [4, 4600], [8, 4626], [12, 4705], [20, 4800], [26, 4700], [29, 4722], [33, 4688], [40, 4760]], 155), 9,
    [[4630, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]]);
  const scenes = [];
  const liq = (S, p, i0, i1, a, lbl, below) => ovl.hl(S, p, i0, i1, C.cyan, { dash: '6 5', op: a, w: 2 }) + tag(S.xs(i1), S.ys(p) + (below ? 20 : -20), lbl, C.cyan, { anchor: 'end', op: a, fs: 13 });

  scenes.push(T.title({
    no: '10', sub: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Old High &amp; Old Low', tagline: 'Liquidity references',
    objectives: ['Identify previous swing and old highs/lows', 'Recognise equal highs and equal lows', 'Relate them to buy-side and sell-side liquidity', 'Separate a sweep from a break'],
    lines: [
      ['Selamat kembali. Dalam Video 10, kita mempelajari old high dan old low sebagai rujukan liquidity.', 'Welcome back. In Video 10, we study old highs and old lows as liquidity references.'],
      ['Anda akan mengenal pasti swing high dan low sebelumnya, equal highs dan equal lows, dan hubungannya dengan buy-side dan sell-side liquidity.',
        'You will identify previous swing highs and lows, equal highs and equal lows, and their relationship with buy-side and sell-side liquidity.'],
      ['Kita juga akan membezakan sweep daripada break, dan menjelaskan mengapa aras ini tidak sama sifatnya dengan order block atau fair value gap.',
        'We will also separate a sweep from a break, and explain why these levels are not the same in nature as an order block or a fair value gap.']
    ],
    illus: (t, L) => {
      const a = P(t, L[0] + 1, 1.2), b = P(t, L[1], .8), X0 = 1130, X1 = 1810;
      return `<path d="M${X0 + 20},640 L${X0 + 140},470 L${X0 + 260},600 L${X0 + 380},472 L${X0 + 500},700 L${X0 + 640},560" fill="none" stroke="${C.mute}" stroke-width="2.6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - a}"/>` +
        `<line x1="${X0 + 100}" x2="${X1}" y1="470" y2="470" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="6 5" opacity="${b}"/>` +
        txt(X1 - 10, 455, 'EQUAL HIGHS · BSL', { anchor: 'end', col: C.cyan, fs: 16, fw: 700, op: b }) +
        `<line x1="${X0 + 460}" x2="${X1}" y1="700" y2="700" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="6 5" opacity="${b}"/>` +
        txt(X1 - 10, 730, 'OLD LOW · SSL', { anchor: 'end', col: C.cyan, fs: 16, fw: 700, op: b });
    }
  }));

  scenes.push(T.chart({
    label: '6.9 · PREVIOUS AND OLD HIGHS/LOWS',
    lines: [
      ['Mulakan dengan istilah. Swing high sebelumnya ialah puncak terkini yang telah terbentuk. Swing low sebelumnya ialah lembah terkini.', 'Start with the terms. A previous swing high is the most recent formed peak. A previous swing low is the most recent trough.'],
      ['Old high ialah high yang lebih lama, yang belum dikunjungi semula oleh harga. Dalam contoh ini, 4,790 masih belum disentuh semula.', 'An old high is an older high that price has not revisited. In this example, 4,790 has not been touched again.'],
      ['Begitu juga, old low ialah low lama yang belum diambil. Di sini, 4,630 ialah low terendah yang masih utuh.', 'Likewise, an old low is an older low that has not been taken. Here, 4,630 is the lowest low still intact.'],
      ['High dan low lain di antaranya, 4,745, 4,722 dan 4,650, ialah swing dalaman. Ia juga rujukan, tetapi lebih kecil kepentingannya.', 'The other highs and lows in between, 4,745, 4,722 and 4,650, are internal swings. They are references too, but of smaller importance.'],
      ['Aras ini menandakan di mana harga pernah berbalik. Dan di situlah order tertentu biasanya diandaikan berkumpul.', 'These levels mark where price previously turned. And that is where certain orders are commonly assumed to cluster.']
    ],
    chart: {
      data: D_ref, pmin: 4600, pmax: 4820, step: 50, slots: 46, reveal: [0, 0], revealDur: 5, tag: 'REFERENCE LEVELS',
      ov: (S, c) => liq(S, 4790, 4, 45, c.p([1, 0]), 'OLD HIGH 4,790 · UNTOUCHED') + liq(S, 4630, 32, 45, c.p([2, 0]), 'OLD LOW 4,630', true) +
        [[15, 4745, 1], [26, 4722, 1], [20, 4650, 0], [10, 4690, 0]].map(m => dot(S.xs(m[0]), S.ys(m[1]), C.mute, c.p([3, 0]), 5) + tag(S.xs(m[0]), S.ys(m[1]) + (m[2] ? -24 : 24), 'INTERNAL', C.dim, { op: c.p([3, 0]), fs: 12 })).join('')
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.9', title: 'Highs and lows', items: [[[0, 0], 'Previous swing: most recent peak/trough'], [[1, 0], 'Old high: older, not yet revisited'], [[2, 0], 'Old low: older, not yet taken'], [[3, 0], 'Internal swings: smaller references']] }
  }));

  scenes.push(T.chart({
    label: '6.9 · EQUAL HIGHS AND EQUAL LOWS',
    lines: [
      ['Equal highs terbentuk apabila dua atau lebih high berada pada harga yang hampir sama. Di sini, 4,782 dan 4,780.', 'Equal highs form when two or more highs sit at almost the same price. Here, 4,782 and 4,780.'],
      ['Ia jarang tepat sama. Kita menyebutnya relatively equal highs. Di atasnya, buy-side liquidity biasanya diandaikan berkumpul.', 'They are rarely exactly equal. We call them relatively equal highs. Above them, buy-side liquidity is commonly assumed to rest.'],
      ['Equal lows ialah cerminannya. Di sini, 4,620 dan 4,622. Di bawahnya, sell-side liquidity biasanya diandaikan berkumpul.', 'Equal lows are the mirror. Here, 4,620 and 4,622. Below them, sell-side liquidity is commonly assumed to rest.'],
      ['Mengapa? Kerana ramai peserta meletakkan stop atau order breakout di sebalik aras yang jelas seperti ini. Tetapi order itu tidak kelihatan pada carta candle.',
        'Why? Because many participants place stops or breakout orders beyond obvious levels like these. But those orders are not visible on a candle chart.']
    ],
    chart: {
      data: D_eq, pmin: 4590, pmax: 4810, step: 50, slots: 44, reveal: [0, 0], revealDur: 5, tag: 'EQUAL HIGHS · EQUAL LOWS',
      ov: (S, c) => dot(S.xs(5), S.ys(4782), C.bear, c.p([0, 3]), 6) + dot(S.xs(15), S.ys(4780), C.bear, c.p([0, 3]), 6) +
        liq(S, 4782, 5, 43, c.p([1, 0]), 'EQH · BSL ABOVE 4,782') + dot(S.xs(25), S.ys(4620), C.bull, c.p([2, 0]), 6) + dot(S.xs(33), S.ys(4622), C.bull, c.p([2, 0]), 6) +
        liq(S, 4620, 25, 43, c.p([2, 1]), 'EQL · SSL BELOW 4,620', true)
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.9', title: 'Equal highs &amp; lows', items: [[[0, 0], 'Two or more highs at ~ the same price'], [[1, 0], 'BSL commonly assumed above'], [[2, 0], 'SSL commonly assumed below equal lows'], [[3, 0], 'Orders are not visible on candles', 'r']] }
  }));

  scenes.push(T.two({
    label: '6.9 · SWEEP VS BREAK',
    lines: [
      ['Apabila harga sampai ke equal highs, dua perkara boleh berlaku.', 'When price reaches equal highs, two things can happen.'],
      ['Contoh A: sweep. Harga menembusi 4,782 dengan wick hingga 4,795, tetapi close semula di bawahnya. Liquidity diambil, kemudian harga berbalik turun.',
        'Example A: a sweep. Price pierces 4,782 with a wick up to 4,795, but closes back below it. Liquidity is taken, then price reverses lower.'],
      ['Contoh B: break. Harga close di atas 4,782, bertahan di atasnya, dan terus naik. Old high diambil, dan trend bersambung.', 'Example B: a break. Price closes above 4,782, holds above it, and continues higher. The old high is taken, and the trend continues.'],
      ['Sweep sahaja tidak cukup untuk mengesahkan reversal. Kita masih memerlukan displacement dan perubahan struktur.', 'A sweep alone is not enough to confirm a reversal. We still need displacement and a change in structure.']
    ],
    a: { data: D_sw, pmin: 4620, pmax: 4820, step: 50, slots: 36, reveal: [1, 0], revealDur: 5, title: 'EXAMPLE A · HYPOTHETICAL', tag: 'SWEEP → REVERSAL',
      ov: (S, c) => liq(S, 4782, 5, 34, 1, 'EQH 4,782') + tag(S.xs(25), S.ys(4795) - 22, 'WICK 4,795 · CLOSE BELOW', C.gold, { op: c.p([1, 3]), fs: 13 }) },
    b: { data: D_br, pmin: 4660, pmax: 4880, step: 50, slots: 38, reveal: [2, 0], revealDur: 5, title: 'EXAMPLE B · HYPOTHETICAL', tag: 'BREAK → CONTINUATION', show: [2, 0],
      ov: (S, c) => liq(S, 4782, 5, 36, 1, 'EQH 4,782') + tag(S.xs(28), S.ys(4840), 'CLOSED ABOVE · HELD', C.bull, { op: c.p([2, 3]), fs: 13 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([3, 0])}"><b>A sweep is not a confirmation.</b> Price can sweep liquidity and still continue in the original direction. Wait for displacement and a structure change.</div>`
  }));

  scenes.push(T.chart({
    label: '6.9 · INTERNAL AND EXTERNAL LIQUIDITY',
    lines: [
      ['Hubungkan ini dengan dealing range. Liquidity di luar range, di atas range high dan di bawah range low, dipanggil external range liquidity.',
        'Connect this to the dealing range. Liquidity outside the range, above the range high and below the range low, is called external range liquidity.'],
      ['Rujukan di dalam range, seperti fair value gap dan swing dalaman, dipanggil internal range liquidity.', 'References inside the range, such as fair value gaps and internal swings, are called internal range liquidity.'],
      ['Dalam range bullish 4,600 hingga 4,800 ini, buy-side liquidity di atas 4,800 ialah external, dan FVG di 4,645 hingga 4,668 ialah internal.',
        'In this bullish 4,600 to 4,800 range, the buy-side liquidity above 4,800 is external, and the FVG at 4,645 to 4,668 is internal.'],
      ['Satu kerangka biasa dalam ICT: harga sering bergerak antara internal dan external liquidity. Ini rangka analisis, bukan peraturan yang pasti.',
        'A common ICT framework: price often moves between internal and external liquidity. This is an analytical frame, not a fixed rule.']
    ],
    chart: {
      data: D_ie, pmin: 4560, pmax: 4840, step: 50, slots: 44, reveal: [0, 0], revealDur: 6, tag: 'INTERNAL VS EXTERNAL',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([0, 2]), { noLabel: true }),
      ov: (S, c) => ovl.hl(S, 4800, 4, null, C.mute, { op: c.p([0, 2]), w: 1.4 }) + ovl.hl(S, 4600, 4, null, C.mute, { op: c.p([0, 2]), w: 1.4 }) + liq(S, 4800, 20, 42, c.p([0, 4]), 'EXTERNAL · BSL > 4,800') + liq(S, 4600, 4, 42, c.p([0, 5]), 'EXTERNAL · SSL < 4,600', true) +
        ovl.zone(S, 4645, 4668, 9, 42, C.bull, { alpha: .16, op: c.p([1, 0]), stroke: true }) + tag(S.xs(42), S.ys(4668) - 16, 'INTERNAL · FVG', C.bull, { anchor: 'end', op: c.p([1, 0]), fs: 13 })
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.9', title: 'Internal vs external', items: [[[0, 0], 'External: beyond range high/low'], [[1, 0], 'Internal: FVGs, internal swings'], [[3, 0], 'Price often moves between them'], [[3, 3], 'A frame, not a fixed rule', 'r']] }
  }));

  scenes.push(T.cards({
    label: '6.9 · WHAT THESE LEVELS ARE NOT', kicker: 'SUBTOPIC ⑤ · 6.9', title: 'Reference levels, not guaranteed reversals',
    lines: [
      ['Dua penjelasan penting.', 'Two important clarifications.'],
      ['Pertama, old high dan old low tidak automatik menjadi support atau resistance. Ia boleh menjadi sasaran yang diambil, bukan aras yang dihormati.',
        'First, old highs and old lows are not automatically support or resistance. They can be targets that get taken, not levels that get respected.'],
      ['Kedua, walaupun ICT menyenaraikannya dalam PD Arrays, sifatnya berbeza daripada order block atau FVG. Ia aras harga, bukan zon yang terbentuk daripada displacement.',
        'Second, although ICT lists them among the PD Arrays, their nature differs from an order block or FVG. They are price levels, not zones formed by displacement.']
    ],
    cards: [
      { x: 60, y: 220, w: 880, h: 340, at: [1, 0], col: '#e54f4d', kick: 'NOT AUTOMATIC S/R', head: 'Often a target, not a wall', body: 'Price may run through an old high or low to take liquidity, then continue or reverse. The level itself decides nothing.' },
      { x: 980, y: 220, w: 880, h: 340, at: [2, 0], col: '#2cc6dc', kick: 'DIFFERENT NATURE', head: 'A level, not a displacement zone', body: 'Order blocks and FVGs come from a specific candle structure. Old highs/lows are simply prior extremes used as liquidity references.' }
    ]
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ⑤ · 6.12', title: 'Common liquidity reference mistakes', rowH: 160,
    lines: [
      ['Kesilapan biasa:', 'Common mistakes:'],
      ['Menganggap old high atau old low sebagai zon reversal yang pasti. Dan menganggap setiap sweep sebagai isyarat reversal.', 'Treating old highs or lows as guaranteed reversal zones. And treating every sweep as a reversal signal.'],
      ['Menganggap liquidity boleh dilihat terus pada carta. Dan menyamakan aras liquidity dengan order block atau FVG.', 'Assuming liquidity can be seen directly on the chart. And equating liquidity levels with order blocks or FVGs.']
    ],
    items: [[[1, 0], 'Old high/low = guaranteed reversal', 'They are often targets that get taken.'], [[1, 3.5], 'Every sweep = reversal', 'Sweeps need displacement + structure change.'],
      [[2, 0], 'Liquidity is visible on candles', 'Resting orders are assumed, not observed.'], [[2, 3], 'Levels = OB or FVG', 'A prior extreme is not a displacement zone.']]
  }));

  scenes.push(T.summary({
    title: 'Old High &amp; Low',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Old high dan old low ialah ekstrem lama yang belum diambil. Equal highs dan equal lows menandakan kawasan liquidity yang diandaikan.', 'Old highs and lows are older extremes not yet taken. Equal highs and equal lows mark assumed liquidity areas.'],
      ['Buy-side di atas highs, sell-side di bawah lows. External di luar range, internal di dalamnya.', 'Buy-side above highs, sell-side below lows. External outside the range, internal inside it.'],
      ['Ia rujukan liquidity, bukan support atau resistance yang pasti, dan sweep perlu disahkan.', 'They are liquidity references, not guaranteed support or resistance, and a sweep needs confirmation.']
    ],
    items: [[[1, 0], 'Old high/low: untaken extremes'], [[1, 3], 'EQH/EQL: assumed liquidity'], [[2, 0], 'BSL above · SSL below'], [[2, 2], 'External vs internal liquidity'], [[3, 0], 'Not automatic S/R'], [[3, 2.5], 'Sweep ≠ confirmation']]
  }));

  scenes.push(T.quiz([
    ['Where is buy-side liquidity commonly assumed to rest?', 'Above highs, especially old highs and relatively equal highs, where stops and breakout orders are commonly placed.',
      'di manakah buy-side liquidity biasanya diandaikan berada?', 'di atas highs, terutamanya old highs dan relatively equal highs, di mana stop dan order breakout biasanya diletakkan.'],
    ['Why is a liquidity sweep not sufficient by itself to confirm a reversal?', 'Price can sweep a level and still continue in the original direction. Confirmation needs displacement and a change in structure.',
      'mengapa liquidity sweep sahaja tidak mencukupi untuk mengesahkan reversal?', 'harga boleh menyapu sesuatu aras dan masih meneruskan arah asal. Confirmation memerlukan displacement dan perubahan struktur.'],
    ['Range 4,600–4,800. Is an FVG at 4,645–4,668 internal or external liquidity?', 'Internal. It sits inside the dealing range. External liquidity lies beyond 4,800 and below 4,600.',
      'range 4,600 hingga 4,800. Adakah FVG di 4,645 hingga 4,668 internal atau external liquidity?', 'internal. Ia berada di dalam dealing range. External liquidity berada di atas 4,800 dan di bawah 4,600.',
      'The range is 4,600 to 4,800. Is an FVG at 4,645 to 4,668 internal or external liquidity?', 'Internal. It sits inside the dealing range. External liquidity lies above 4,800 and below 4,600.'],
    ['How do old highs/lows differ from order blocks?', 'They are prior price extremes used as liquidity references, not zones formed by a specific candle structure and displacement.',
      'bagaimana old high dan old low berbeza daripada order block?', 'ia ekstrem harga lama yang digunakan sebagai rujukan liquidity, bukan zon yang terbentuk daripada struktur candle khusus dan displacement.']
  ]));

  scenes.push(T.exercise({
    title: 'Map liquidity references',
    lines: [
      ['Latihan praktikal: pada carta anda, tandakan old high dan old low yang masih utuh, serta sebarang equal highs atau equal lows.', 'Practical exercise: on your chart, mark the old highs and old lows still intact, and any equal highs or equal lows.'],
      ['Labelkan setiap satu sebagai buy-side atau sell-side, internal atau external, relatif kepada dealing range anda.', 'Label each as buy-side or sell-side, internal or external, relative to your dealing range.'],
      ['Kemudian, apabila harga sampai ke aras itu, catat sama ada ia sweep atau break, dan apa yang berlaku selepasnya.', 'Then, when price reaches a level, record whether it was a sweep or a break, and what happened next.']
    ],
    steps: [[[1, 0], 'Mark intact old highs and old lows'], [[1, 2.5], 'Mark relatively equal highs and lows'], [[2, 0], 'Label BSL / SSL'], [[2, 2.5], 'Label internal / external to the range'], [[3 - 1, 5], 'On contact: sweep or break? Record what followed']]
  }));

  scenes.push(T.next({
    no: '11', short: 'PD Array Selection', kicker: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'PD Array selection and prioritisation',
    lines: [['Dalam video seterusnya: membandingkan semua PD Arrays, dan cara memilih zon yang paling relevan tanpa memenuhkan carta.', 'In the next video: comparing all PD Arrays, and how to select the most relevant zone without cluttering the chart.']],
    html: (t) => `<div class="a" style="left:0;width:1200px;text-align:center;top:180px;font-size:48px;font-weight:700;opacity:${P(t, .5, .6)}">Nine zones → one or two</div>`
  }));
  scenes.push(T.refs(['ict', 'harris', 'murphy'], 'Buy-side dan sell-side liquidity ialah istilah ICT. Literatur microstructure membincangkan stop order dan liquidity sebenar.',
    'Buy-side and sell-side liquidity are ICT terms. Microstructure literature discusses stop orders and actual liquidity.', 'Where resting orders sit is an assumption based on common behaviour; candle charts do not display the order book.'));
  scenes.push(T.disclaimer('11', 'PD Array Selection'));
  registerVideo({ id: 'v10', title: 'VIDEO 10 — OLD HIGH &amp; LOW', scenes });
})();
