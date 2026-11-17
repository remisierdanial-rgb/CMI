/* VIDEO 03 — Equilibrium. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const D_def = gen([[0, 4650], [4, 4600], [18, 4800], [27, 4700], [33, 4745], [40, 4690], [46, 4730]], 81);
  const D_st = gen([[0, 4640], [3, 4600], [15, 4800], [20, 4730], [23, 4762], [28, 4700], [32, 4655], [35, 4690], [38, 4712], [41, 4692], [44, 4708], [47, 4698]], 82, { noise: .55 });
  const D_bu = gen([[0, 4650], [4, 4600], [18, 4800], [27, 4665], [36, 4770]], 83);
  const D_be = gen([[0, 4750], [4, 4800], [18, 4600], [27, 4735], [36, 4630]], 84);
  const D_fail = gen([[0, 4640], [4, 4600], [18, 4800], [26, 4705], [28, 4712], [38, 4610], [44, 4630]], 85);
  const scenes = [];

  scenes.push(T.title({
    no: '03', sub: 'SUBTOPIC ②', title: 'Equilibrium', tagline: 'Understanding the 50% midpoint',
    objectives: ['Define equilibrium and calculate it', 'Read price relative to the midpoint', 'Use equilibrium as a reference point', 'Recognise its limitations'],
    lines: [
      ['Selamat kembali. Dalam Video 3, kita mempelajari Equilibrium, titik tengah bagi dealing range.',
        'Welcome back. In Video 3, we study Equilibrium, the midpoint of the dealing range.'],
      ['Anda akan belajar mengira equilibrium, membaca kedudukan harga relatif kepadanya,',
        'You will learn to calculate equilibrium, read the position of price relative to it,'],
      ['menggunakannya sebagai titik rujukan, dan memahami apa yang tidak boleh dilakukan oleh equilibrium.',
        'use it as a reference point, and understand what equilibrium cannot do.']
    ],
    illus: (t, L) => {
      const X0 = 1130, X1 = 1810, YT = 430, YB = 740, YM = 585, a = P(t, L[0] + 1.5, 1), b = P(t, L[1], .8);
      return `<line x1="${X0}" x2="${X1}" y1="${YT}" y2="${YT}" stroke="${C.mute}" stroke-width="1.5" opacity="${a}"/>` +
        `<line x1="${X0}" x2="${X1}" y1="${YB}" y2="${YB}" stroke="${C.mute}" stroke-width="1.5" opacity="${a}"/>` +
        `<line x1="${X0}" x2="${X0 + (X1 - X0) * b}" y1="${YM}" y2="${YM}" stroke="${C.amber}" stroke-width="2.6" stroke-dasharray="9 7"/>` +
        txt(X0 + 20, YT - 12, 'HIGH 4,800', { col: C.mute, op: a, fs: 16 }) + txt(X0 + 20, YB + 28, 'LOW 4,600', { col: C.mute, op: a, fs: 16 }) +
        txt(X1 - 14, YM - 14, 'EQUILIBRIUM 4,700 · 50%', { anchor: 'end', col: C.amber, op: b, fs: 17, fw: 700, ls: 2 });
    }
  }));

  /* 3.1 definition + formula */
  scenes.push(T.chart({
    label: '3.1 · DEFINITION',
    lines: [
      ['Equilibrium ialah titik tengah 50% bagi dealing range yang dipilih.', 'Equilibrium is the 50 percent midpoint of the selected dealing range.'],
      ['Formulanya mudah: range high tambah range low, bahagi dua.', 'The formula is simple: range high plus range low, divided by two.'],
      ['Dengan range high 4,800 dan range low 4,600: 4,800 tambah 4,600 ialah 9,400. Bahagi dua, 4,700.',
        'With a range high of 4,800 and a range low of 4,600: 4,800 plus 4,600 is 9,400. Divided by two, 4,700.'],
      ['Kita tandakan 4,700 dengan garisan mendatar. Ini equilibrium bagi range ini.', 'We mark 4,700 with a horizontal line. This is the equilibrium of this range.'],
      ['Cara lain: low tambah separuh jarak range. 4,600 tambah 100, juga 4,700. Kedua-dua kaedah mesti memberi jawapan yang sama.',
        'Another way: the low plus half the range. 4,600 plus 100, also 4,700. Both methods must give the same answer.'],
      ['Ingat, equilibrium tidak wujud tanpa range. Jika range berubah, equilibrium juga berubah.',
        'Remember, equilibrium does not exist without a range. If the range changes, equilibrium changes too.']
    ],
    chart: {
      data: D_def, pmin: 4560, pmax: 4840, step: 50, slots: 48, reveal: [0, .3], revealDur: 5, tag: 'EQUILIBRIUM = 50%',
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([0, 3], 1), { noEq: true }) +
        ovl.hl(S, 4700, 4, null, C.amber, { prog: c.p([3, 0], 1), dash: '8 6', w: 2.4 }) +
        tag(S.xs(10), S.ys(4700) - 22, 'EQUILIBRIUM 4,700', C.amber, { op: c.p([3, 0]), fs: 15 }) +
        txt(S.xs(30), S.ys(4750) + 6, '100 PTS', { col: C.mute, op: c.p([4, 0]), fs: 15, anchor: 'middle' }) +
        txt(S.xs(30), S.ys(4650) + 6, '100 PTS', { col: C.mute, op: c.p([4, 0]), fs: 15, anchor: 'middle' }) +
        `<line x1="${S.xs(33)}" x2="${S.xs(33)}" y1="${S.ys(4800)}" y2="${S.ys(4600)}" stroke="${C.mute}" stroke-width="1.4" opacity="${c.p([4, 0])}"/>`
    },
    side: {
      kicker: 'SUBTOPIC ② · 3.1', title: 'Equilibrium',
      items: [[[0, 0], 'The 50% midpoint of the selected range'], [[5, 0], 'No range → no equilibrium'], [[5, 2.5], 'New range → new equilibrium']],
      foot: c => `<div class="mono" style="margin-top:6px">
        <div style="font-size:15px;color:#8a93a8;letter-spacing:2px;opacity:${c.p([1, 0])}">FORMULA</div>
        <div style="font-size:20px;margin-top:10px;color:#fff;opacity:${c.p([1, 0])}">EQ = (High + Low) ÷ 2</div>
        <div style="font-size:20px;margin-top:12px;color:#e8ecf4;opacity:${c.p([2, 0])}">(4,800 + 4,600) ÷ 2</div>
        <div style="font-size:20px;margin-top:6px;color:#e8ecf4;opacity:${c.p([2, 2.5])}">= 9,400 ÷ 2 = <span style="color:#f0a03a">4,700</span></div>
        <div style="font-size:15px;color:#8a93a8;letter-spacing:2px;margin-top:22px;opacity:${c.p([4, 0])}">CHECK</div>
        <div style="font-size:20px;margin-top:10px;color:#e8ecf4;opacity:${c.p([4, 0])}">4,600 + 200 ÷ 2 = <span style="color:#f0a03a">4,700</span></div></div>`
    }
  }));

  /* 3.2 four states */
  scenes.push(T.chart({
    label: '3.2 · PRICE AND THE 50% MIDPOINT', full: true,
    lines: [
      ['Sekarang lihat bagaimana harga berinteraksi dengan equilibrium dalam contoh ilustrasi ini.', 'Now let us see how price interacts with equilibrium in this illustrative example.'],
      ['Pertama, harga di atas equilibrium. Selepas high 4,800, harga kekal di separuh atas, sekitar 4,730 hingga 4,760.',
        'First, price above equilibrium. After the 4,800 high, price holds in the upper half, around 4,730 to 4,760.'],
      ['Kedua, harga kembali ke equilibrium, menyentuh 4,700.', 'Second, price returns to equilibrium, touching 4,700.'],
      ['Ketiga, harga di bawah equilibrium, turun ke 4,655 di separuh bawah.', 'Third, price below equilibrium, dropping to 4,655 in the lower half.'],
      ['Dan keempat, harga berkonsolidasi di sekitar equilibrium, bergerak di antara 4,692 dan 4,712.',
        'And fourth, price consolidates around equilibrium, moving between 4,692 and 4,712.'],
      ['Empat keadaan ini hanya menerangkan lokasi. Tiada satu pun daripadanya, dengan sendirinya, memberitahu arah seterusnya.',
        'These four states only describe location. None of them, on its own, tells us the next direction.']
    ],
    chart: {
      data: D_st, pmin: 4560, pmax: 4840, step: 50, slots: 48,
      n: c => 3 + 13 * P(c.t, c.at([0, .3]), 3) + 9 * P(c.t, c.at([1, 0]), 3) + 5 * P(c.t, c.at([2, 0]), 2) + 5 * P(c.t, c.at([3, 0]), 2) + 13 * P(c.t, c.at([4, 0]), 3),
      tag: 'FOUR STATES',
      under: (S, c) => T.pdZones(S, 4800, 4600, 3, c.p([0, 1]), { noLabel: true }) + ovl.zone(S, 4690, 4714, 36.5, 47.5, C.gold, { alpha: .1, op: c.p([4, 1]), stroke: true, dash: '5 4' }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 3, c.p([0, 1], 1)) +
        tag(S.xs(21), S.ys(4790), '① ABOVE EQ', C.gold, { op: c.p([1, 1]) }) + tag(S.xs(28), S.ys(4700) + 34, '② RETURN TO EQ', C.gold, { op: c.p([2, 0]) }) +
        tag(S.xs(32), S.ys(4655) + 32, '③ BELOW EQ', C.gold, { op: c.p([3, 0]) }) + tag(S.xs(42), S.ys(4714) - 30, '④ CONSOLIDATION AROUND EQ', C.gold, { op: c.p([4, 1]) })
    },
    extra: c => `<div class="warn" style="left:360px;top:790px;width:1200px;opacity:${c.p([5, 0])}"><b>Location only:</b> none of these states, on its own, determines the next direction.</div>`
  }));

  /* 3.3 reference point + range position */
  scenes.push(T.cards({
    label: '3.3 · A REFERENCE POINT', kicker: 'SUBTOPIC ② · 3.3', title: 'Equilibrium as a reference point',
    lines: [
      ['Equilibrium membahagikan range kepada dua bahagian: bahagian atas dan bahagian bawah.', 'Equilibrium divides the range into two portions: an upper portion and a lower portion.'],
      ['Untuk mengukur kedudukan harga dengan tepat, kira peratus kedudukan: harga tolak low, bahagi jarak range.',
        'To measure the position of price precisely, calculate range position: price minus low, divided by the range.'],
      ['Contoh: harga 4,665. 4,665 tolak 4,600 ialah 65. 65 bahagi 200 ialah 0.325, iaitu 32.5 peratus. Di bawah 50 peratus, jadi separuh bawah.',
        'Example: price at 4,665. 4,665 minus 4,600 is 65. 65 divided by 200 is 0.325, or 32.5 percent. Below 50 percent, so the lower half.'],
      ['Contoh kedua: harga 4,735. 135 bahagi 200 ialah 67.5 peratus. Di atas 50 peratus, jadi separuh atas.',
        'Second example: price at 4,735. 135 divided by 200 is 67.5 percent. Above 50 percent, so the upper half.'],
      ['Nombor ini menerangkan di mana harga berada, bukan ke mana harga akan pergi.', 'This number describes where price is, not where price will go.']
    ],
    cards: [
      { x: 60, y: 220, w: 880, h: 500, at: [0, .5], kick: 'THE SPLIT', head: 'Upper portion · midpoint · lower portion',
        html: c => `<svg class="a" style="left:28px;top:118px" width="820" height="370"><g transform="translate(0,22)">
          <rect x="0" y="0" width="560" height="160" fill="${C.purple}" opacity=".16"/><rect x="0" y="160" width="560" height="160" fill="${C.purple}" opacity=".06"/>
          <line x1="0" x2="560" y1="0" y2="0" stroke="${C.mute}" stroke-width="1.5"/><line x1="0" x2="560" y1="320" y2="320" stroke="${C.mute}" stroke-width="1.5"/>
          <line x1="0" x2="560" y1="160" y2="160" stroke="${C.amber}" stroke-width="2.4" stroke-dasharray="8 6"/>
          ${txt(580, 6, '4,800 · 100%', { col: C.mute, fs: 16 })}${txt(580, 166, '4,700 · 50%', { col: C.amber, fs: 16 })}${txt(580, 326, '4,600 · 0%', { col: C.mute, fs: 16 })}
          ${txt(280, 86, 'UPPER PORTION', { anchor: 'middle', col: C.purple, fs: 17, fw: 700 })}${txt(280, 246, 'LOWER PORTION', { anchor: 'middle', col: C.purple, fs: 17, fw: 700 })}
          <circle cx="200" cy="${320 - .325 * 320}" r="7" fill="${C.gold}" opacity="${c.p([2, 0])}"/>${txt(214, 320 - .325 * 320 + 6, '4,665 · 32.5%', { col: C.gold, fs: 15, op: c.p([2, 0]) })}
          <circle cx="380" cy="${320 - .675 * 320}" r="7" fill="${C.gold}" opacity="${c.p([3, 0])}"/>${txt(394, 320 - .675 * 320 + 6, '4,735 · 67.5%', { col: C.gold, fs: 15, op: c.p([3, 0]) })}</g></svg>` },
      { x: 980, y: 220, w: 880, h: 500, at: [1, 0], kick: 'RANGE POSITION', head: 'Position = (Price − Low) ÷ (High − Low)',
        html: c => `<div class="a mono" style="left:28px;top:140px;font-size:22px;line-height:1.7;color:#e8ecf4;opacity:${c.p([2, 0])}">(4,665 − 4,600) ÷ 200<br>= 65 ÷ 200 = <span style="color:#f0a03a">0.325 → 32.5%</span><br><span style="color:#9b7bf0">below 50% → lower half</span></div>
          <div class="a mono" style="left:28px;top:300px;font-size:22px;line-height:1.7;color:#e8ecf4;opacity:${c.p([3, 0])}">(4,735 − 4,600) ÷ 200<br>= 135 ÷ 200 = <span style="color:#f0a03a">0.675 → 67.5%</span><br><span style="color:#9b7bf0">above 50% → upper half</span></div>` }
    ],
    warn: { at: [4, 0], y: 750, s: '<b>Describes, does not predict:</b> range position tells us where price is, not where it will go.' }
  }));

  /* 3.4 bullish / bearish interpretation */
  scenes.push(T.two({
    label: '3.4 · BULLISH & BEARISH INTERPRETATION',
    lines: [
      ['Bagaimana equilibrium membantu membingkai retracement? Lihat kedua-dua sisi.', 'How does equilibrium help frame a retracement? Look at both sides.'],
      ['Dalam range bullish, retracement ke bawah equilibrium, contohnya ke 4,665, membawa harga ke separuh bawah pergerakan bullish itu.',
        'In a bullish range, a retracement below equilibrium, for example to 4,665, takes price into the lower half of that bullish move.'],
      ['Dalam range bearish, retracement ke atas equilibrium, contohnya ke 4,735, membawa harga ke separuh atas pergerakan bearish itu.',
        'In a bearish range, a retracement above equilibrium, for example to 4,735, takes price into the upper half of that bearish move.'],
      ['Ini membingkai retracement. Tetapi equilibrium sendiri tidak menentukan arah pasaran. Arah datang daripada struktur.',
        'This frames the retracement. But equilibrium does not determine market direction by itself. Direction comes from structure.']
    ],
    a: { data: D_bu, pmin: 4560, pmax: 4840, step: 50, slots: 38, reveal: [0, .3], title: 'FCPO · 1H · HYPOTHETICAL', tag: 'BULLISH RANGE',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([1, 0]), { noLabel: true }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([0, 2], 1), { hl: 'HIGH ', ll: 'LOW ' }) + dot(S.xs(27), S.ys(4665), C.gold, c.p([1, 2]), 7) +
        tag(S.xs(27), S.ys(4665) + 30, 'RETRACE 4,665 · LOWER HALF', C.gold, { op: c.p([1, 2]), fs: 14 }) },
    b: { data: D_be, pmin: 4560, pmax: 4840, step: 50, slots: 38, reveal: [0, .3], title: 'FCPO · 1H · HYPOTHETICAL', tag: 'BEARISH RANGE',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([2, 0]), { noLabel: true }),
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, c.p([0, 2], 1), { hl: 'HIGH ', ll: 'LOW ' }) + dot(S.xs(27), S.ys(4735), C.gold, c.p([2, 2]), 7) +
        tag(S.xs(27), S.ys(4735) - 30, 'RETRACE 4,735 · UPPER HALF', C.gold, { op: c.p([2, 2]), fs: 14 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([3, 0])}"><b>Frames, does not decide:</b> equilibrium frames the retracement. Direction comes from market structure.</div>`
  }));

  /* 3.5 not guaranteed support */
  scenes.push(T.chart({
    label: '3.5 · NOT GUARANTEED SUPPORT',
    lines: [
      ['Sekarang contoh yang penting. Dalam range bullish ini, harga kembali ke equilibrium di 4,700.', 'Now an important example. In this bullish range, price returns to equilibrium at 4,700.'],
      ['Ramai trader menganggap 4,700 akan menjadi support. Harga melantun sedikit ke 4,712,', 'Many traders assume 4,700 will act as support. Price bounces slightly to 4,712,'],
      ['kemudian terus jatuh menembusi equilibrium hingga ke 4,610, berhampiran range low.', 'then continues lower straight through equilibrium, down to 4,610, near the range low.'],
      ['Equilibrium ialah titik rujukan matematik. Ia bukan support atau resistance yang dijamin.', 'Equilibrium is a mathematical reference point. It is not guaranteed support or resistance.']
    ],
    chart: {
      data: D_fail, pmin: 4560, pmax: 4840, step: 50, slots: 46,
      n: c => 3 + 25 * P(c.t, c.at([0, .3]), 5) + 16 * P(c.t, c.at([2, 0]), 4), tag: 'EQ IS A REFERENCE, NOT A WALL',
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1) + tag(S.xs(28), S.ys(4712) - 30, 'BOUNCE 4,712', C.mute, { op: c.p([1, 1]), fs: 14 }) +
        tag(S.xs(38), S.ys(4610) + 30, 'THROUGH EQ → 4,610', C.bear, { op: c.p([2, 2]), fs: 14 })
    },
    side: { kicker: 'SUBTOPIC ② · 3.5', title: 'Not guaranteed support', items: [[[1, 0], 'Assumption: EQ will hold', 'r'], [[2, 0], 'Outcome: price passes through', 'r'], [[3, 0], 'EQ = mathematical reference only']] }
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ② · 3.5', title: 'Common equilibrium mistakes', rowH: 190,
    lines: [
      ['Kesilapan biasa dengan equilibrium:', 'Common mistakes with equilibrium:'],
      ['Menganggap equilibrium sebagai support atau resistance yang pasti. Dan menganggap setiap pergerakan di bawah 50 peratus mesti berbalik.',
        'Treating equilibrium as guaranteed support or resistance. And assuming every move below 50 percent must reverse.'],
      ['Begitu juga, menganggap setiap pergerakan di atas 50 peratus mesti berbalik. Dan menggunakan equilibrium tanpa mentakrifkan dealing range dahulu.',
        'Likewise, assuming every move above 50 percent must reverse. And using equilibrium without defining the dealing range first.']
    ],
    items: [
      [[1, 0], 'EQ as guaranteed support/resistance', 'It is a calculated midpoint, not a level price must respect.'],
      [[1, 4], 'Below 50% must reverse up', 'Bearish structure can carry price to the range low and beyond.'],
      [[2, 0], 'Above 50% must reverse down', 'Strong bullish structure can hold price in the upper half.'],
      [[2, 4], 'EQ without a defined range', 'A midpoint of an arbitrary range is an arbitrary level.']
    ]
  }));

  scenes.push(T.cards({
    label: 'APPLICATION', kicker: 'SUBTOPIC ② · APPLICATION', title: 'Practical use and relationships',
    lines: [
      ['Secara praktikal, equilibrium digunakan untuk satu tujuan utama: membahagikan range kepada separuh atas dan separuh bawah.',
        'In practice, equilibrium serves one main purpose: dividing the range into an upper half and a lower half.'],
      ['Pembahagian inilah yang menjadi premium dan discount dalam video seterusnya.', 'This division becomes premium and discount in the next video.'],
      ['Ia juga sama dengan aras 0.5 pada Fibonacci, yang akan kita gunakan dalam topik OTE.', 'It is also the same as the 0.5 level on Fibonacci, which we will use in the OTE topic.']
    ],
    cards: [
      { x: 60, y: 220, w: 560, h: 300, at: [0, 0], kick: 'PURPOSE', head: 'Split the range into halves', body: 'One calculated level that separates the upper and lower portions of the selected range.' },
      { x: 680, y: 220, w: 560, h: 300, at: [1, 0], kick: 'NEXT · VIDEO 04', head: 'Premium &amp; Discount', body: 'Above equilibrium is premium. Below equilibrium is discount.' },
      { x: 1300, y: 220, w: 560, h: 300, at: [2, 0], kick: 'VIDEO 05', head: 'Fibonacci 0.5', body: 'The 0.5 retracement of a leg equals the equilibrium of the same range.' }
    ]
  }));

  scenes.push(T.summary({
    title: 'Equilibrium',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Equilibrium ialah titik tengah 50 peratus: range high tambah range low, bahagi dua.', 'Equilibrium is the 50 percent midpoint: range high plus range low, divided by two.'],
      ['Ia membahagikan range kepada separuh atas dan separuh bawah, dan membantu membingkai retracement.', 'It divides the range into an upper and a lower half, and helps frame a retracement.'],
      ['Ia bukan support atau resistance yang dijamin, dan tidak menentukan arah dengan sendirinya.', 'It is not guaranteed support or resistance, and it does not determine direction on its own.']
    ],
    items: [[[1, 0], 'EQ = (High + Low) ÷ 2'], [[1, 2.5], 'Defined only by a selected range'], [[2, 0], 'Splits upper and lower halves'], [[2, 3], 'Frames the retracement'],
      [[3, 0], 'Not guaranteed support/resistance'], [[3, 2.5], 'Does not decide direction']]
  }));

  scenes.push(T.quiz([
    ['How is equilibrium calculated? Calculate it for a range of 4,520 to 4,880.', '(Range High + Range Low) ÷ 2. (4,880 + 4,520) ÷ 2 = 9,400 ÷ 2 = 4,700.',
      'bagaimana equilibrium dikira? Kira untuk range 4,520 hingga 4,880.', 'range high tambah range low, bahagi dua. 4,880 tambah 4,520 ialah 9,400, bahagi dua, 4,700.',
      'How is equilibrium calculated? Calculate it for a range of 4,520 to 4,880.', 'Range high plus range low, divided by two. 4,880 plus 4,520 is 9,400. Divided by two, 4,700.'],
    ['Range 4,600–4,800. Price is at 4,640. What is its range position?', '(4,640 − 4,600) ÷ 200 = 40 ÷ 200 = 0.20 → 20%. Below 50%, so the lower half.',
      'range 4,600 hingga 4,800. Harga di 4,640. Apakah peratus kedudukannya?', '4,640 tolak 4,600 ialah 40. 40 bahagi 200 ialah 0.2, iaitu 20 peratus. Di bawah 50 peratus, jadi separuh bawah.',
      'The range is 4,600 to 4,800. Price is at 4,640. What is its range position?', '4,640 minus 4,600 is 40. 40 divided by 200 is 0.2, or 20 percent. Below 50 percent, so the lower half.'],
    ['Why is equilibrium not guaranteed support?', 'It is a calculated midpoint of a selected range. Price can pass straight through it when structure and order flow favour continuation.',
      'mengapa equilibrium bukan support yang dijamin?', 'ia hanya titik tengah yang dikira daripada range yang dipilih. Harga boleh menembusinya terus apabila struktur menyokong kesinambungan.'],
    ['Can equilibrium alone tell you the market direction?', 'No. It describes location within a range. Direction comes from market structure and higher timeframe context.',
      'bolehkah equilibrium sahaja memberitahu arah pasaran?', 'tidak. Ia menerangkan lokasi dalam range. Arah datang daripada struktur pasaran dan konteks higher timeframe.']
  ]));

  scenes.push(T.exercise({
    title: 'Calculate and mark equilibrium',
    lines: [
      ['Latihan praktikal: gunakan dealing range yang anda tandakan dalam latihan Video 2.', 'Practical exercise: use the dealing range you marked in the Video 2 exercise.'],
      ['Kira equilibrium dengan dua kaedah, tandakan garisannya, dan kira peratus kedudukan harga semasa.', 'Calculate equilibrium with both methods, mark the line, and calculate the range position of current price.'],
      ['Kemudian perhatikan lima interaksi harga dengan equilibrium, dan catat sama ada harga bertindak balas atau menembusinya.', 'Then observe five price interactions with equilibrium, and record whether price reacted or passed through.']
    ],
    steps: [[[1, 0], 'Calculate EQ: (High + Low) ÷ 2, and check with Low + Range ÷ 2'], [[1, 3], 'Mark the equilibrium line on your chart'], [[1, 5], 'Calculate the range position of current price'],
      [[2, 0], 'Record five interactions with EQ: reaction or pass-through?'], [[2, 4], 'Note how often EQ held. What does that tell you?']]
  }));

  scenes.push(T.next({
    no: '04', short: 'Premium & Discount', kicker: 'SUBTOPIC ③', title: 'Premium &amp; Discount — understanding price location',
    lines: [['Dalam video seterusnya: Premium dan Discount, dan mengapa ia ialah konteks lokasi, bukan isyarat automatik.',
      'In the next video: Premium and Discount, and why they are location context, not automatic signals.']],
    html: (t) => `<svg class="a" style="left:100px;top:60px" width="1000" height="320"><rect x="0" y="0" width="1000" height="160" fill="${C.purple}" opacity="${.18 * P(t, .5, .6)}"/>
      <rect x="0" y="160" width="1000" height="160" fill="${C.purple}" opacity="${.07 * P(t, .5, .6)}"/><line x1="0" x2="1000" y1="160" y2="160" stroke="${C.amber}" stroke-width="2.4" stroke-dasharray="9 7"/>
      ${txt(500, 90, 'PREMIUM', { anchor: 'middle', col: C.purple, fs: 30, fw: 700, ls: 4, op: P(t, 1, .6) })}${txt(500, 250, 'DISCOUNT', { anchor: 'middle', col: C.purple, fs: 30, fw: 700, ls: 4, op: P(t, 1.6, .6) })}</svg>`
  }));
  scenes.push(T.refs(['ict', 'murphy'], 'Pengiraan titik tengah ialah aritmetik asas. Istilah equilibrium dalam konteks ini ialah penggunaan ICT.',
    'The midpoint calculation is basic arithmetic. The term equilibrium in this context is ICT usage.', 'The 50% midpoint is arithmetic; "equilibrium" as a premium/discount divider is ICT terminology.'));
  scenes.push(T.disclaimer('04', 'Premium &amp; Discount'));

  registerVideo({ id: 'v03', title: 'VIDEO 03 — EQUILIBRIUM', scenes });
})();
