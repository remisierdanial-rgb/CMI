/* VIDEO 02 — Dealing Range. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const D_def = gen([[0, 4660], [4, 4600], [16, 4800], [24, 4690], [30, 4760], [37, 4640], [46, 4740]], 31);
  const D_sw = gen([[0, 4640], [4, 4600], [9, 4690], [12, 4662], [18, 4760], [21, 4738], [26, 4800], [31, 4700], [35, 4730], [40, 4655], [47, 4745]], 41, { noise: .6 });
  const D_bull = gen([[0, 4690], [3, 4720], [8, 4600], [22, 4800], [30, 4665], [40, 4745]], 52);
  const D_bear = gen([[0, 4710], [3, 4680], [8, 4800], [22, 4600], [30, 4735], [40, 4655]], 63);
  const D_nest = gen([[0, 4600], [6, 4520], [24, 4880], [32, 4640], [38, 4720], [44, 4690]], 74);
  const scenes = [];

  scenes.push(T.title({
    no: '02', sub: 'SUBTOPIC ①', title: 'Dealing Range', tagline: 'Identifying meaningful price boundaries',
    objectives: ['Define a dealing range', 'Identify meaningful swing highs and lows', 'Build bullish and bearish ranges', 'Select the appropriate range'],
    lines: [
      ['Selamat kembali. Dalam Video 2, kita mempelajari asas bagi seluruh Level 6: Dealing Range.',
        'Welcome back. In Video 2, we study the foundation of all of Level 6: the Dealing Range.'],
      ['Anda akan belajar mentakrifkan dealing range, mengenal pasti swing high dan swing low yang bermakna,',
        'You will learn to define a dealing range, identify meaningful swing highs and swing lows,'],
      ['membina range bullish dan bearish, dan memilih range yang sesuai dengan timeframe analisis anda.',
        'build bullish and bearish ranges, and select the range that fits your analytical timeframe.']
    ],
    illus: (t, L) => {
      const X0 = 1130, X1 = 1810, YT = 430, YB = 740, a = P(t, L[0] + 2, 1), b = P(t, L[1], .8);
      const pts = [[X0 + 30, YB - 60], [X0 + 110, YB], [X0 + 380, YT], [X0 + 520, YB - 120], [X0 + 640, YT + 70]];
      const d = pts.map((q, k) => (k ? 'L' : 'M') + q[0] + ',' + q[1]).join(' ');
      return `<line x1="${X0}" x2="${X0 + (X1 - X0) * b}" y1="${YT}" y2="${YT}" stroke="${C.gold}" stroke-width="2"/>` +
        `<line x1="${X0}" x2="${X0 + (X1 - X0) * b}" y1="${YB}" y2="${YB}" stroke="${C.gold}" stroke-width="2"/>` +
        `<path d="${d}" fill="none" stroke="${C.mute}" stroke-width="2.6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - a}"/>` +
        dot(pts[1][0], pts[1][1], C.bull, b, 8) + dot(pts[2][0], pts[2][1], C.bear, b, 8) +
        txt(X1 - 14, YT - 12, 'SWING HIGH', { anchor: 'end', col: C.gold, op: b, fs: 16, fw: 700, ls: 2 }) +
        txt(X1 - 14, YB + 28, 'SWING LOW', { anchor: 'end', col: C.gold, op: b, fs: 16, fw: 700, ls: 2 });
    }
  }));

  /* 2.1 definition */
  scenes.push(T.chart({
    label: '2.1 · DEFINITION',
    lines: [
      ['Dealing range ialah selang harga yang dipilih, disempadani oleh satu high dan satu low yang bermakna.',
        'A dealing range is a selected price interval, bounded by a meaningful high and a meaningful low.'],
      ['Dalam contoh ilustrasi ini, harga membentuk low di 4,600, kemudian naik ke high di 4,800.',
        'In this illustrative example, price forms a low at 4,600, then rallies to a high at 4,800.'],
      ['Dua aras ini menjadi sempadan range. Selepas itu, harga bergerak di dalam range tersebut.',
        'These two levels become the boundaries of the range. After that, price moves within it.'],
      ['Perhatikan perkataan "dipilih". Range bukan objek tetap pada carta. Ia dipilih oleh penganalisis.',
        'Notice the word selected. A range is not a fixed object on the chart. It is chosen by the analyst.'],
      ['Pilihan itu bergantung pada timeframe analisis dan struktur pasaran yang relevan.',
        'That choice depends on the analytical timeframe and the relevant market structure.'],
      ['Semua bacaan seterusnya dalam level ini, equilibrium, premium, discount dan OTE, bergantung pada range ini.',
        'Every reading later in this level, equilibrium, premium, discount and OTE, depends on this range.']
    ],
    chart: {
      data: D_def, pmin: 4560, pmax: 4840, step: 50, slots: 48, reveal: [1, 0], revealDur: 6, tag: 'DEALING RANGE',
      under: (S, c) => ovl.zone(S, 4600, 4800, 4, null, C.gold, { alpha: .05, op: c.p([2, 0]) }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([2, 0], 1), { noEq: true }) +
        dot(S.xs(4), S.ys(4600), C.bull, c.p([1, 2])) + dot(S.xs(16), S.ys(4800), C.bear, c.p([1, 3.5])) +
        tag(S.xs(4), S.ys(4600) + 30, 'SWING LOW 4,600', C.bull, { op: c.p([1, 2]) }) +
        tag(S.xs(16), S.ys(4800) - 30, 'SWING HIGH 4,800', C.bear, { op: c.p([1, 3.5]) })
    },
    side: {
      kicker: 'SUBTOPIC ① · 2.1', title: 'What is a Dealing Range?',
      items: [[[0, 1], 'A selected price interval'], [[0, 3], 'Bounded by a meaningful high and low'], [[3, 0], 'Chosen by the analyst, not fixed'],
        [[4, 0], 'Depends on timeframe &amp; structure'], [[5, 0], 'The reference for EQ, P/D and OTE']]
    }
  }));

  /* 2.2 swing points */
  const minor = [[9, 4690, 1], [12, 4662, 0], [18, 4760, 1], [21, 4738, 0], [35, 4730, 1], [31, 4700, 0]];
  scenes.push(T.chart({
    label: '2.2 · SWING HIGH & SWING LOW',
    lines: [
      ['Setiap dealing range bermula daripada swing point.', 'Every dealing range starts from swing points.'],
      ['Swing high ialah puncak dengan high yang lebih rendah di kedua-dua sisinya. Swing low ialah lembah dengan low yang lebih tinggi di kedua-dua sisinya.',
        'A swing high is a peak with lower highs on both sides. A swing low is a trough with higher lows on both sides.'],
      ['Tetapi carta ini mempunyai banyak swing. Tidak semuanya sama penting.',
        'But this chart has many swings. They are not all equally important.'],
      ['Swing kecil ini hanyalah turun naik dalam pergerakan yang lebih besar. Untuk dealing range, kita abaikan.',
        'These minor swings are just fluctuations inside a larger move. For the dealing range, we set them aside.'],
      ['Swing yang bermakna ialah titik di mana harga bergerak jauh dengan kuat, iaitu expansion, dan memecahkan struktur.',
        'A meaningful swing is a point from which price moved away strongly, an expansion, and broke structure.'],
      ['Di sini, low 4,600 dan high 4,800 membentuk struktur utama. Pergerakan di antaranya ialah expansion,',
        'Here, the 4,600 low and the 4,800 high form the main structure. The move between them is the expansion,'],
      ['dan pergerakan balik selepas high ialah retracement. Range diukur dari swing utama, bukan dari swing kecil.',
        'and the pullback after the high is the retracement. The range is measured from the major swings, not the minor ones.']
    ],
    chart: {
      data: D_sw, pmin: 4560, pmax: 4840, step: 50, slots: 48, reveal: [0, 0], revealDur: 5, tag: 'MAJOR VS MINOR SWINGS',
      ov: (S, c) => {
        const mn = c.p([3, 0]), mj = c.p([5, 0]), dm = c.t > c.at([4, 0]) ? .35 : 1;
        let g = minor.map(m => dot(S.xs(m[0]), S.ys(m[1]), C.mute, mn * dm, 5) +
          tag(S.xs(m[0]), S.ys(m[1]) + (m[2] ? -26 : 26), 'MINOR', C.dim, { op: mn * dm, fs: 12 })).join('');
        g += ovl.path(S, [[4, 4600], [26, 4800]], C.gold, mj, 2.6) + ovl.path(S, [[26, 4800], [40, 4655]], C.gold, c.p([6, 0], 1.2), 2.6, .7);
        g += dot(S.xs(4), S.ys(4600), C.bull, mj, 8) + dot(S.xs(26), S.ys(4800), C.bear, mj, 8) +
          tag(S.xs(4), S.ys(4600) + 30, 'MAJOR SWING LOW', C.bull, { op: mj }) + tag(S.xs(26), S.ys(4800) - 30, 'MAJOR SWING HIGH', C.bear, { op: mj }) +
          tag(S.xs(15), S.ys(4700) - 50, 'EXPANSION', C.gold, { op: c.p([5, 3]), fs: 14 }) + tag(S.xs(36), S.ys(4740), 'RETRACEMENT', C.gold, { op: c.p([6, 0]), fs: 14 });
        // 3-candle definition highlight
        const df = c.p([1, 0]) * (1 - c.p([2, 0]));
        g += ovl.zone(S, D_sw[25].l - 4, 4806, 24.5, 27.5, C.gold, { alpha: .08, op: df, stroke: true, dash: '5 4' });
        return g;
      }
    },
    side: {
      kicker: 'SUBTOPIC ① · 2.2', title: 'Swing points',
      items: [[[1, 0], 'Swing high: lower highs on both sides', 'r'], [[1, 3.5], 'Swing low: higher lows on both sides', 'g'], [[3, 0], 'Minor swings: noise inside a move'],
        [[4, 0], 'Major swings: expansion + break of structure'], [[6, 2], 'Measure the range from major swings']]
    }
  }));

  /* 2.3 bullish */
  const bullSteps = (c) => [c.p([1, 0]), c.p([2, 0]), c.p([3, 0]), c.p([4, 0]), c.p([5, 0])];
  scenes.push(T.chart({
    label: '2.3 · BULLISH DEALING RANGE',
    lines: [
      ['Sekarang kita bina dealing range bullish, langkah demi langkah.', 'Now we build a bullish dealing range, step by step.'],
      ['Langkah satu: kenal pasti swing low yang bermakna. Harga turun ke 4,600 dan berbalik dengan kuat.',
        'Step one: identify a meaningful swing low. Price drops to 4,600 and turns up strongly.'],
      ['Langkah dua: harga naik, memecahkan high sebelumnya di 4,720, dan membentuk swing high di 4,800.',
        'Step two: price rallies, breaks the previous high at 4,720, and establishes a swing high at 4,800.'],
      ['Langkah tiga: tandakan range dari low 4,600 hingga high 4,800. Jarak range ialah 200 mata.',
        'Step three: mark the range from the 4,600 low to the 4,800 high. The range is 200 points.'],
      ['Langkah empat: paparkan titik tengah. 4,600 tambah 4,800, bahagi dua, ialah 4,700.',
        'Step four: display the midpoint. 4,600 plus 4,800, divided by two, is 4,700.'],
      ['Langkah lima: nilai retracement di dalam range. Harga kembali ke 4,665, iaitu di separuh bawah range.',
        'Step five: evaluate the retracement within the range. Price pulls back to 4,665, in the lower half of the range.'],
      ['Range ini memberi kita rangka rujukan. Ia belum memberi isyarat entry. Itu memerlukan konteks dan confirmation lain.',
        'This range gives us a frame of reference. It does not give an entry signal. That requires further context and confirmation.']
    ],
    chart: {
      data: D_bull, pmin: 4560, pmax: 4840, step: 50, slots: 42, n: c => 3 + 38 * (c.t < c.at([5, 0]) ? .55 * P(c.t, c.at([0, .3]), 8) : .55 + .45 * P(c.t, c.at([5, 0]), 3)),
      tag: 'BULLISH RANGE · ILLUSTRATIVE',
      under: (S, c) => ovl.zone(S, 4600, 4800, 8, null, C.bull, { alpha: .05, op: c.p([3, 0]) }),
      ov: (S, c) => {
        const s = bullSteps(c);
        return dot(S.xs(8), S.ys(4600), C.bull, s[0], 8) + tag(S.xs(8), S.ys(4600) + 30, '① SWING LOW 4,600', C.bull, { op: s[0] }) +
          ovl.hl(S, 4720, 3, 17, C.mute, { dash: '5 5', op: s[1] }) + tag(S.xs(3), S.ys(4720) - 24, 'PRIOR HIGH 4,720', C.mute, { op: s[1], fs: 13 }) +
          tag(S.xs(17), S.ys(4720) + 26, 'BOS', C.bull, { op: s[1], fs: 13 }) +
          dot(S.xs(22), S.ys(4800), C.bear, s[1], 8) + tag(S.xs(22), S.ys(4800) - 30, '② SWING HIGH 4,800', C.bear, { op: s[1] }) +
          T.rangeOv(S, 4800, 4600, 8, s[2], { noEq: true }) +
          ovl.hl(S, 4700, 8, null, C.amber, { prog: s[3], dash: '8 6', w: 2 }) + tag(S.x1 - 8, S.ys(4700) - 20, '④ MIDPOINT 4,700', C.amber, { anchor: 'end', op: s[3], fs: 14 }) +
          dot(S.xs(30), S.ys(4665), C.gold, s[4], 7) + tag(S.xs(30), S.ys(4665) + 30, '⑤ RETRACEMENT 4,665', C.gold, { op: s[4], fs: 14 });
      }
    },
    side: {
      kicker: 'SUBTOPIC ① · 2.3', title: 'Bullish dealing range',
      items: [[[1, 0], '① Meaningful swing low'], [[2, 0], '② Rally + break of structure to swing high'], [[3, 0], '③ Mark the range: 200 pts'],
        [[4, 0], '④ Midpoint: (4,600 + 4,800) ÷ 2'], [[5, 0], '⑤ Evaluate the retracement']],
      foot: c => `<div class="warn" style="position:relative;margin-top:16px;font-size:19px;opacity:${c.p([6, 0])}"><b>Frame, not signal.</b> The range is a reference, not an entry trigger.</div>`
    }
  }));

  /* 2.4 bearish */
  scenes.push(T.chart({
    label: '2.4 · BEARISH DEALING RANGE',
    lines: [
      ['Dealing range bearish ialah cerminan proses yang sama.', 'A bearish dealing range mirrors the same process.'],
      ['Langkah satu: kenal pasti swing high yang bermakna. Harga naik ke 4,800 dan berbalik turun dengan kuat.',
        'Step one: identify a meaningful swing high. Price rises to 4,800 and turns down strongly.'],
      ['Langkah dua: harga jatuh, memecahkan low sebelumnya di 4,680, dan membentuk swing low di 4,600.',
        'Step two: price falls, breaks the previous low at 4,680, and establishes a swing low at 4,600.'],
      ['Langkah tiga dan empat: tandakan range dari 4,800 hingga 4,600, dengan titik tengah di 4,700.',
        'Steps three and four: mark the range from 4,800 to 4,600, with the midpoint at 4,700.'],
      ['Langkah lima: nilai retracement ke atas. Harga naik semula ke 4,735, iaitu di separuh atas range.',
        'Step five: evaluate the upward retracement. Price rallies back to 4,735, in the upper half of the range.'],
      ['Sempadannya sama, 4,600 dan 4,800. Yang berbeza ialah arah impulse yang membentuk range itu.',
        'The boundaries are the same, 4,600 and 4,800. What differs is the direction of the impulse that formed the range.']
    ],
    chart: {
      data: D_bear, pmin: 4560, pmax: 4840, step: 50, slots: 42, n: c => 3 + 38 * (c.t < c.at([4, 0]) ? .55 * P(c.t, c.at([0, .3]), 8) : .55 + .45 * P(c.t, c.at([4, 0]), 3)),
      tag: 'BEARISH RANGE · ILLUSTRATIVE',
      under: (S, c) => ovl.zone(S, 4600, 4800, 8, null, C.bear, { alpha: .05, op: c.p([3, 0]) }),
      ov: (S, c) => {
        const s = [c.p([1, 0]), c.p([2, 0]), c.p([3, 0]), c.p([4, 0])];
        return dot(S.xs(8), S.ys(4800), C.bear, s[0], 8) + tag(S.xs(8), S.ys(4800) - 30, '① SWING HIGH 4,800', C.bear, { op: s[0] }) +
          ovl.hl(S, 4680, 3, 17, C.mute, { dash: '5 5', op: s[1] }) + tag(S.xs(3), S.ys(4680) + 24, 'PRIOR LOW 4,680', C.mute, { op: s[1], fs: 13 }) +
          tag(S.xs(17), S.ys(4680) - 26, 'BOS', C.bear, { op: s[1], fs: 13 }) +
          dot(S.xs(22), S.ys(4600), C.bull, s[1], 8) + tag(S.xs(22), S.ys(4600) + 30, '② SWING LOW 4,600', C.bull, { op: s[1] }) +
          T.rangeOv(S, 4800, 4600, 8, s[2]) +
          dot(S.xs(30), S.ys(4735), C.gold, s[3], 7) + tag(S.xs(30), S.ys(4735) - 30, '⑤ RETRACEMENT 4,735', C.gold, { op: s[3], fs: 14 });
      }
    },
    side: {
      kicker: 'SUBTOPIC ① · 2.4', title: 'Bearish dealing range',
      items: [[[1, 0], '① Meaningful swing high'], [[2, 0], '② Decline + break of structure to swing low'], [[3, 0], '③④ Range 4,800 → 4,600, EQ 4,700'],
        [[4, 0], '⑤ Evaluate the upward retracement'], [[5, 0], 'Same boundaries, opposite impulse']]
    }
  }));

  /* 2.5 selecting the range */
  scenes.push(T.chart({
    label: '2.5 · SELECTING THE RANGE',
    lines: [
      ['Bagaimana memilih range yang sesuai? Mulakan dengan timeframe analisis anda.', 'How do we select the appropriate range? Start with your analytical timeframe.'],
      ['Pada higher timeframe, range ini bermula dari low 4,520 hingga high 4,880. Titik tengahnya 4,700.',
        'On the higher timeframe, this range runs from the 4,520 low to the 4,880 high. Its midpoint is 4,700.'],
      ['Di dalamnya, ada range lower timeframe yang lebih kecil: dari 4,640 hingga 4,720, dengan titik tengah 4,680.',
        'Inside it, there is a smaller lower timeframe range: from 4,640 to 4,720, with a midpoint of 4,680.'],
      ['Sekarang lihat harga semasa di 4,690. Dalam range besar, ia di bawah 4,700, jadi di separuh bawah.',
        'Now look at current price at 4,690. In the large range, it is below 4,700, so in the lower half.'],
      ['Dalam range kecil, ia di atas 4,680, jadi di separuh atas. Harga yang sama, bacaan yang berbeza.',
        'In the small range, it is above 4,680, so in the upper half. The same price, a different reading.'],
      ['Pergerakan di dalam range dipanggil internal. Pergerakan melepasi sempadan range dipanggil external.',
        'Movement inside a range is called internal. Movement beyond the range boundaries is called external.'],
      ['Sebab itu range tidak boleh dipilih sesuka hati. Range yang arbitrari menghasilkan bacaan premium dan discount yang mengelirukan.',
        'This is why a range cannot be chosen arbitrarily. An arbitrary range produces misleading premium and discount readings.']
    ],
    chart: {
      data: D_nest, pmin: 4480, pmax: 4920, step: 50, slots: 46, reveal: [0, .3], revealDur: 6, tag: 'NESTED RANGES',
      under: (S, c) => ovl.zone(S, 4520, 4880, 6, null, C.blue, { alpha: .05, op: c.p([1, 0]) }) + ovl.zone(S, 4640, 4720, 32, null, C.purple, { alpha: .14, op: c.p([2, 0]) }),
      ov: (S, c) => {
        const h = c.p([1, 0], 1), l = c.p([2, 0], 1), pr = c.p([3, 0]);
        return ovl.hl(S, 4880, 6, null, C.blue, { prog: h }) + ovl.hl(S, 4520, 6, null, C.blue, { prog: h }) + ovl.hl(S, 4700, 6, null, C.amber, { prog: h, dash: '8 6', w: 2 }) +
          tag(S.xs(9), S.ys(4880) - 20, 'HTF HIGH 4,880', C.blue, { op: h, fs: 14 }) + tag(S.xs(9), S.ys(4520) + 22, 'HTF LOW 4,520', C.blue, { op: h, fs: 14 }) +
          tag(S.xs(12), S.ys(4700) - 20, 'HTF EQ 4,700', C.amber, { op: h, fs: 14 }) +
          ovl.hl(S, 4720, 32, null, C.purple, { prog: l }) + ovl.hl(S, 4640, 32, null, C.purple, { prog: l }) + ovl.hl(S, 4680, 32, null, C.purple, { prog: l, dash: '4 5' }) +
          tag(S.x1 - 6, S.ys(4720) - 20, 'LTF 4,720', C.purple, { anchor: 'end', op: l, fs: 13 }) + tag(S.x1 - 6, S.ys(4640) + 22, 'LTF 4,640', C.purple, { anchor: 'end', op: l, fs: 13 }) +
          tag(S.x1 - 6, S.ys(4680), 'LTF EQ 4,680', C.purple, { anchor: 'end', op: l, fs: 13 }) +
          dot(S.xs(44), S.ys(4690), '#ffffff', pr, 7) + tag(S.xs(41), S.ys(4690) + 1, '4,690', '#ffffff', { anchor: 'end', op: pr, fs: 14 });
      }
    },
    side: {
      kicker: 'SUBTOPIC ① · 2.5', title: 'Selecting the range',
      items: [[[0, 1], 'Start from the analytical timeframe'], [[5, 0], 'Internal: movement inside the range'], [[5, 3], 'External: beyond the boundaries'], [[6, 0], 'Arbitrary range → misleading readings', 'r']],
      foot: c => `<div class="mono" style="margin-top:6px;opacity:${c.p([3, 0])}">
        <div style="font-size:15px;color:#8a93a8;letter-spacing:2px">PRICE 4,690 READS AS</div>
        <div style="font-size:20px;margin-top:12px;color:#e8ecf4">HTF 4,520–4,880 → <span style="color:#3b82f6">lower half</span></div>
        <div style="font-size:20px;margin-top:8px;color:#e8ecf4;opacity:${c.p([4, 0])}">LTF 4,640–4,720 → <span style="color:#9b7bf0">upper half</span></div></div>`
    }
  }));

  /* 2.6 mistakes */
  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ① · 2.6', title: 'Common dealing range mistakes', rowH: 180,
    lines: [
      ['Mari lihat kesilapan biasa semasa memilih dealing range.', 'Let us look at common mistakes when selecting a dealing range.'],
      ['Satu, menggunakan swing yang tidak signifikan. Dua, kerap menukar sempadan range supaya sesuai dengan trade yang diingini.',
        'One, using insignificant swing points. Two, frequently changing the range boundaries to fit a preferred trade.'],
      ['Tiga, mencampur timeframe yang tidak berkaitan. Empat, menganggap setiap swing sama penting.',
        'Three, mixing unrelated timeframes. Four, treating every swing high and swing low as equally important.'],
      ['Dan lima, mengabaikan konteks struktur. Range yang bermakna mesti mencerminkan struktur pasaran yang sebenar.',
        'And five, ignoring structural context. A meaningful range must reflect the actual market structure.']
    ],
    items: [
      [[1, 0], 'Insignificant swing points', 'Minor fluctuations give unstable, shifting boundaries.'],
      [[1, 3.5], 'Moving the range to fit a trade', 'Adjusting boundaries after forming a bias is confirmation bias.'],
      [[2, 0], 'Mixing unrelated timeframes', 'A 1M swing high with a daily swing low is not one coherent range.'],
      [[2, 3], 'Every swing treated as equal', 'Only swings with expansion and structural breaks define the range.'],
      [[3, 0], 'Ignoring structural context', 'The range must reflect actual structure, not a convenient drawing.']
    ]
  }));

  /* practical application + relationships */
  scenes.push(T.cards({
    label: 'PRACTICAL APPLICATION', kicker: 'SUBTOPIC ① · APPLICATION', title: 'Applying the dealing range',
    lines: [
      ['Secara praktikal, gunakan proses ini setiap kali anda memulakan analisis.', 'In practice, use this process every time you begin an analysis.'],
      ['Pilih timeframe analisis. Cari swing terbaru yang menghasilkan expansion dan break of structure. Tandakan hujung bertentangan.',
        'Choose the analytical timeframe. Find the most recent swing that produced expansion and a break of structure. Mark the opposite extreme.'],
      ['Kekalkan range itu sehingga struktur berubah, contohnya harga keluar dari range dan membentuk swing baharu yang jelas.',
        'Keep that range until structure changes, for example when price breaks out of the range and forms a clear new swing.'],
      ['Dealing range ialah input bagi topik seterusnya: equilibrium, premium dan discount, anchor Fibonacci, dan lokasi PD Arrays.',
        'The dealing range is the input for the next topics: equilibrium, premium and discount, Fibonacci anchors, and PD Array location.']
    ],
    cards: [
      { x: 60, y: 220, w: 880, h: 420, at: [1, 0], kick: 'PROCESS', head: 'Five-step routine', html: c => ['Choose the analytical timeframe', 'Find the swing with expansion + BOS', 'Mark the opposite extreme', 'Keep the range until structure changes', 'Note the higher timeframe range'].map((s, k) => E.chk(28, 120 + k * 54, s, c.p([k < 3 ? 1 : 2, k * 1.2]), true, 22)).join('') },
      { x: 980, y: 220, w: 880, h: 420, at: [3, 0], kick: 'RELATIONSHIP', head: 'The range feeds every later topic', html: c => ['Equilibrium · Video 03', 'Premium &amp; Discount · Video 04', 'Fibonacci OTE anchors · Video 05', 'PD Array location · Videos 06–11'].map((s, k) => E.chk(28, 120 + k * 60, s, c.p([3, 1 + k]), null, 22).replace('<span>', '<span style="padding-left:0">→ ')).join('') }
    ],
    warn: { at: [2, 3], y: 680, s: '<b>Update rule:</b> redefine the range when structure changes, never to fit a preferred trade.' }
  }));

  scenes.push(T.summary({
    title: 'Dealing Range',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Dealing range ialah selang harga yang dipilih antara high dan low yang bermakna, berdasarkan timeframe dan struktur.',
        'A dealing range is a selected interval between a meaningful high and low, based on timeframe and structure.'],
      ['Range bullish dibina dari swing low ke swing high. Range bearish dari swing high ke swing low.',
        'A bullish range is built from swing low to swing high. A bearish range from swing high to swing low.'],
      ['Harga yang sama boleh memberi bacaan berbeza dalam range yang berbeza. Jangan ubah range untuk menyokong trade.',
        'The same price can read differently in different ranges. Do not change the range to support a trade.']
    ],
    items: [[[1, 0], 'Selected interval: meaningful high + low'], [[1, 3], 'Depends on timeframe &amp; structure'], [[2, 0], 'Bullish: swing low → swing high'],
      [[2, 2.5], 'Bearish: swing high → swing low'], [[3, 0], 'Different range → different reading'], [[3, 3], 'Never move the range to fit a trade']]
  }));

  scenes.push(T.quiz([
    ['What defines the upper and lower boundaries of a dealing range?', 'A meaningful swing high and swing low on the analytical timeframe: swings from which price expanded and broke structure.',
      'apakah yang menentukan sempadan atas dan bawah dealing range?', 'swing high dan swing low yang bermakna pada timeframe analisis, iaitu swing yang diikuti expansion dan break of structure.'],
    ['Why should minor swings usually be ignored when selecting the range?', 'They are fluctuations inside a larger move. Using them gives unstable boundaries and misleading premium/discount readings.',
      'mengapa swing kecil biasanya diabaikan semasa memilih range?', 'ia hanya turun naik dalam pergerakan yang lebih besar. Menggunakannya memberi sempadan yang tidak stabil dan bacaan premium discount yang mengelirukan.'],
    ['Price is at 4,690. HTF range 4,520–4,880; LTF range 4,640–4,720. Where is price in each?', 'HTF: below the 4,700 midpoint, lower half. LTF: above the 4,680 midpoint, upper half. The selected range determines the reading.',
      'harga di 4,690. Range HTF 4,520 hingga 4,880; range LTF 4,640 hingga 4,720. Di mana harga dalam setiap range?', 'HTF: di bawah titik tengah 4,700, separuh bawah. LTF: di atas titik tengah 4,680, separuh atas. Range yang dipilih menentukan bacaan.',
      'Price is at 4,690. The higher timeframe range is 4,520 to 4,880, and the lower timeframe range is 4,640 to 4,720. Where is price in each?',
      'On the higher timeframe, below the 4,700 midpoint, so the lower half. On the lower timeframe, above the 4,680 midpoint, so the upper half. The selected range determines the reading.'],
    ['When is it reasonable to redefine the dealing range?', 'When market structure changes, for example price breaks beyond the range and forms a clear new swing. Never to fit a preferred trade.',
      'bilakah wajar untuk menetapkan semula dealing range?', 'apabila struktur pasaran berubah, contohnya harga keluar dari range dan membentuk swing baharu yang jelas. Bukan untuk menyesuaikan dengan trade yang diingini.']
  ]));

  scenes.push(T.exercise({
    title: 'Mark a meaningful dealing range',
    lines: [
      ['Latihan praktikal: buka carta FCPO satu jam pada platform anda.', 'Practical exercise: open a one-hour FCPO chart on your platform.'],
      ['Tandakan swing low dan swing high utama yang terbaru, dan tulis sebab setiap swing itu bermakna.', 'Mark the most recent major swing low and swing high, and write why each swing is meaningful.'],
      ['Kemudian tandakan range timeframe lebih tinggi, dan bandingkan bacaan harga semasa dalam kedua-dua range.', 'Then mark the higher timeframe range, and compare the current price reading in both ranges.']
    ],
    steps: [[[1, 0], 'Open a 1H FCPO chart and choose your analytical timeframe'], [[1, 2], 'Mark the most recent major swing low and swing high'], [[1, 4.5], 'Write why each swing is meaningful (expansion? BOS?)'],
      [[2, 0], 'Mark the higher timeframe range around it'], [[2, 3], 'Compare where current price sits in each range']],
    warn: { at: [2, 5], y: 740, s: '<b>Self-check:</b> could another analyst reproduce your range from your written reasons?' }
  }));

  scenes.push(T.next({
    no: '03', short: 'Equilibrium', kicker: 'SUBTOPIC ②', title: 'Equilibrium — the 50% midpoint',
    lines: [['Dalam video seterusnya: Equilibrium, titik tengah 50% bagi dealing range, dan peranannya sebagai titik rujukan.',
      'In the next video: Equilibrium, the 50 percent midpoint of the dealing range, and its role as a reference point.']],
    html: (t, L) => `<div class="a mono" style="left:0;width:1200px;text-align:center;top:150px;font-size:44px;color:#fff;opacity:${P(t, .5, .6)}">(4,800 + 4,600) ÷ 2</div>
      <div class="a mono" style="left:0;width:1200px;text-align:center;top:230px;font-size:64px;color:#f0a03a;font-weight:700;opacity:${P(t, 1.6, .6)}">= 4,700</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy', 'emb'], 'Rujukan analisis carta konvensional digunakan untuk konsep swing dan struktur harga.',
    'Conventional chart analysis references are used for swing and price structure concepts.', 'Swing identification follows conventional chart analysis; the term "dealing range" is SMC/ICT usage.'));
  scenes.push(T.disclaimer('03', 'Equilibrium'));

  registerVideo({ id: 'v02', title: 'VIDEO 02 — DEALING RANGE', scenes });
})();
