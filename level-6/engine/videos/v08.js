/* VIDEO 08 — Rejection Block. Illustrative FCPO-style prices only.
 * Convention taught (flagged): at a meaningful swing extreme with long wicks,
 *  bearish RB zone = highest candle body → wick high; bullish RB zone = wick low → lowest body.
 *  Failure = close beyond the wick extreme. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const bearW = [[4742, 4782, 4738, 4750], [4750, 4778, 4735, 4738]];     // zone 4,750–4,782
  const bullW = [[4658, 4662, 4618, 4650], [4650, 4665, 4622, 4662]];     // zone 4,618–4,650
  const D_be = T.patch(gen([[0, 4700], [5, 4770], [9, 4722], [14, 4745], [22, 4660], [30, 4760], [38, 4648]], 131), 15, bearW);
  const D_bu = T.patch(gen([[0, 4700], [5, 4630], [9, 4678], [14, 4655], [22, 4740], [30, 4640], [38, 4752]], 132), 15, bullW);
  const D_mid = T.patch(gen([[0, 4640], [4, 4600], [14, 4800], [20, 4700], [24, 4712], [34, 4640]], 133), 21, [[4706, 4744, 4702, 4712]]);
  const D_inv = T.patch(gen([[0, 4700], [5, 4770], [9, 4722], [14, 4745], [22, 4680], [30, 4800], [36, 4830]], 134), 15, bearW);
  const scenes = [];
  const rbBear = (S, a, i1 = 34, lbl = 'BEARISH RB 4,750–4,782') => ovl.zone(S, 4750, 4782, 14.6, i1, C.bear, { alpha: .18, op: a, stroke: true }) + tag(S.xs(i1), S.ys(4782) - 16, lbl, C.bear, { anchor: 'end', op: a, fs: 13 });
  const rbBull = (S, a, i1 = 34, lbl = 'BULLISH RB 4,618–4,650') => ovl.zone(S, 4618, 4650, 14.6, i1, C.bull, { alpha: .18, op: a, stroke: true }) + tag(S.xs(i1), S.ys(4618) + 16, lbl, C.bull, { anchor: 'end', op: a, fs: 13 });

  scenes.push(T.title({
    no: '08', sub: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Rejection Block', tagline: 'Identification and interpretation',
    objectives: ['Define a rejection block in this framework', 'Mark the body-to-wick zone', 'Separate it from a pin bar', 'Avoid labelling every long wick'],
    lines: [
      ['Selamat kembali. Dalam Video 8, kita mempelajari Rejection Block.', 'Welcome back. In Video 8, we study the Rejection Block.'],
      ['Anda akan belajar mentakrifkannya dalam kerangka yang kita gunakan, menandakan zon dari body ke wick,', 'You will learn to define it within the framework we use, mark the zone from body to wick,'],
      ['dan membezakannya daripada pin bar biasa, supaya tidak setiap wick panjang dilabel sebagai rejection block.', 'and separate it from an ordinary pin bar, so that not every long wick gets labelled a rejection block.']
    ],
    illus: (t, L) => {
      const a = P(t, L[0] + 1, .6), b = P(t, L[1], .8), X = 1380;
      return `<line x1="${X}" x2="${X}" y1="430" y2="700" stroke="${C.bear}" stroke-width="3" opacity="${a}"/><rect x="${X - 22}" y="600" width="44" height="60" fill="${C.bear}" opacity="${a}"/>` +
        `<line x1="${X + 90}" x2="${X + 90}" y1="450" y2="720" stroke="${C.bear}" stroke-width="3" opacity="${a}"/><rect x="${X + 68}" y="620" width="44" height="70" fill="${C.bear}" opacity="${a}"/>` +
        `<rect x="${X - 120}" y="430" width="360" height="170" fill="${C.bear}" opacity="${.15 * b}" stroke="${C.bear}" stroke-dasharray="5 4"/>` +
        txt(X + 250, 450, 'WICK HIGH', { col: C.bear, fs: 15, fw: 700, op: b }) + txt(X + 250, 606, 'HIGHEST BODY', { col: C.bear, fs: 15, fw: 700, op: b });
    }
  }));

  scenes.push(T.chart({
    label: '6.5 · BEARISH REJECTION BLOCK',
    lines: [
      ['Dalam kerangka yang kita gunakan, rejection block terbentuk di swing high atau swing low yang bermakna, di mana harga meninggalkan wick yang panjang.',
        'In the framework we use, a rejection block forms at a meaningful swing high or swing low, where price leaves long wicks.'],
      ['Lihat contoh bearish ini. Harga naik ke arah high sebelumnya di 4,770, di mana buy-side liquidity berada.', 'Look at this bearish example. Price rallies toward the previous high at 4,770, where buy-side liquidity rests.'],
      ['Dua candle menembusi 4,770 dengan wick atas yang panjang, hingga ke 4,782, tetapi body ditutup jauh lebih rendah. Harga telah ditolak.',
        'Two candles push through 4,770 with long upper wicks, up to 4,782, but their bodies close much lower. Price was rejected.'],
      ['Untuk menandakan rejection block bearish: ambil body tertinggi, iaitu 4,750, hingga wick tertinggi, 4,782. Zon ialah bahagian wick itu.',
        'To mark a bearish rejection block: take the highest body, 4,750, up to the highest wick, 4,782. The zone is that wick portion.'],
      ['Harga jatuh, kemudian kembali ke 4,760, ke dalam zon wick. Di sini, rejection block dikaji sebagai kawasan resistance yang berpotensi.',
        'Price falls, then returns to 4,760, into the wick zone. Here, the rejection block is studied as a potential resistance area.'],
      ['Rejection block bearish ini gagal jika harga close di atas wick high, 4,782.', 'This bearish rejection block fails if price closes above the wick high, 4,782.']
    ],
    chart: {
      data: D_be, pmin: 4620, pmax: 4820, step: 50, slots: 40, tag: 'BEARISH RB · ILLUSTRATIVE',
      n: c => 3 + 12 * P(c.t, c.at([1, 0]), 4) + 2 * P(c.t, c.at([2, 0]), 2) + 13 * P(c.t, c.at([3, 3]), 4) + 9 * P(c.t, c.at([5, 0]), 3),
      ov: (S, c) => ovl.hl(S, 4770, 5, 18, C.cyan, { dash: '5 5', op: c.p([1, 1]) }) + tag(S.xs(5), S.ys(4770) - 22, 'PRIOR HIGH 4,770 · BSL', C.cyan, { op: c.p([1, 1]), fs: 13 }) +
        ovl.hl(S, 4750, 14.6, 17, '#fff', { op: c.p([3, 0]) * (1 - c.p([4, 0])) }) + ovl.hl(S, 4782, 14.6, 17, '#fff', { op: c.p([3, 0]) * (1 - c.p([4, 0])) }) +
        tag(S.xs(17) + 8, S.ys(4750), 'HIGHEST BODY 4,750', '#ffffff', { anchor: 'start', op: c.p([3, 0]) * (1 - c.p([4, 0])), fs: 12 }) +
        tag(S.xs(17) + 8, S.ys(4782), 'WICK HIGH 4,782', '#ffffff', { anchor: 'start', op: c.p([3, 1]) * (1 - c.p([4, 0])), fs: 12 }) +
        rbBear(S, c.p([4, 0]), 36) + dot(S.xs(30), S.ys(4760), C.gold, c.p([4, 3]), 7) +
        ovl.hl(S, 4782, 14.6, 36, C.bear, { dash: '6 4', op: c.p([5, 0]) }) + tag(S.xs(24), S.ys(4782) - 22, 'FAILS ON CLOSE > 4,782', C.bear, { op: c.p([5, 0]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.5', title: 'Bearish rejection block', items: [[[0, 0], 'At a meaningful swing high'], [[1, 0], 'Often runs buy-side liquidity'], [[2, 0], 'Long upper wicks, bodies close lower'], [[3, 0], 'Zone: highest body → wick high'], [[4, 0], 'Return into the wick zone'], [[5, 0], 'Fails on close above the wick', 'r']] }
  }));

  scenes.push(T.chart({
    label: '6.5 · BULLISH REJECTION BLOCK',
    lines: [
      ['Rejection block bullish ialah cerminannya, di swing low yang bermakna.', 'A bullish rejection block is the mirror, at a meaningful swing low.'],
      ['Harga jatuh menembusi low sebelumnya di 4,630, menyapu sell-side liquidity, dengan wick bawah yang panjang hingga 4,618. Body ditutup jauh lebih tinggi.',
        'Price drops through the previous low at 4,630, sweeping sell-side liquidity, with long lower wicks down to 4,618. The bodies close much higher.'],
      ['Zon rejection block bullish ialah dari wick terendah, 4,618, hingga body terendah, 4,650.', 'The bullish rejection block zone runs from the lowest wick, 4,618, up to the lowest body, 4,650.'],
      ['Apabila harga kembali ke 4,640, ke dalam zon wick, ia dikaji sebagai kawasan support yang berpotensi. Ia gagal jika harga close di bawah 4,618.',
        'When price returns to 4,640, into the wick zone, it is studied as a potential support area. It fails if price closes below 4,618.']
    ],
    chart: {
      data: D_bu, pmin: 4580, pmax: 4780, step: 50, slots: 40, tag: 'BULLISH RB · ILLUSTRATIVE',
      n: c => 3 + 14 * P(c.t, c.at([1, 0]), 5) + 13 * P(c.t, c.at([2, 3]), 4) + 9 * P(c.t, c.at([3, 3]), 3),
      ov: (S, c) => ovl.hl(S, 4630, 5, 18, C.cyan, { dash: '5 5', op: c.p([1, 0]) }) + tag(S.xs(5), S.ys(4630) + 22, 'PRIOR LOW 4,630 · SSL', C.cyan, { op: c.p([1, 0]), fs: 13 }) +
        rbBull(S, c.p([2, 0]), 36) + dot(S.xs(30), S.ys(4640), C.gold, c.p([3, 0]), 7)
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.5', title: 'Bullish rejection block', items: [[[0, 0], 'At a meaningful swing low'], [[1, 0], 'Wicks sweep sell-side liquidity'], [[2, 0], 'Zone: wick low → lowest body'], [[3, 0], 'Return into the wick zone'], [[3, 4], 'Fails on close below the wick', 'r']] }
  }));

  scenes.push(T.cards({
    label: '6.5 · REJECTION BLOCK VS PIN BAR', kicker: 'SUBTOPIC ⑤ · 6.5', title: 'Rejection block vs pin bar',
    lines: [
      ['Bagaimana rejection block berbeza daripada pin bar biasa?', 'How does a rejection block differ from an ordinary pin bar?'],
      ['Pin bar ialah corak satu candle: body kecil dengan wick panjang. Ia boleh muncul di mana-mana, termasuk di tengah range.', 'A pin bar is a single-candle pattern: a small body with a long wick. It can appear anywhere, including mid-range.'],
      ['Rejection block dalam kerangka ini memerlukan konteks: ia di swing extreme yang bermakna, biasanya selepas liquidity diambil, dan di lokasi yang relevan dalam dealing range.',
        'A rejection block in this framework requires context: it sits at a meaningful swing extreme, usually after liquidity is taken, and at a relevant location in the dealing range.'],
      ['Dan ia ditandakan sebagai zon dari body ke wick, untuk digunakan apabila harga kembali. Bukan sekadar isyarat satu candle.', 'And it is marked as a zone from body to wick, to be used when price returns. Not just a one-candle signal.']
    ],
    cards: [
      { x: 60, y: 220, w: 880, h: 400, at: [1, 0], kick: 'PIN BAR', head: 'A single-candle pattern', html: c => ['Small body, long wick', 'Can appear anywhere', 'Read as an immediate signal'].map((s, k) => E.chk(28, 130 + k * 56, s, c.p([1, k]), null, 22)).join('') },
      { x: 980, y: 220, w: 880, h: 400, at: [2, 0], col: '#d7b256', kick: 'REJECTION BLOCK', head: 'A contextual zone', html: c => ['At a meaningful swing extreme', 'Usually after liquidity is taken', 'Relevant premium/discount location', 'Zone: body → wick, used on return'].map((s, k) => E.chk(28, 130 + k * 56, s, c.p([2, k * 1.4]), true, 22)).join('') }
    ]
  }));

  scenes.push(T.two({
    label: '6.5 · NOT EVERY LONG WICK',
    lines: [
      ['Dua contoh yang tidak patut dianggap rejection block yang kukuh.', 'Two examples that should not be treated as a strong rejection block.'],
      ['Contoh A: wick atas yang panjang, tetapi di tengah range, berhampiran equilibrium 4,700. Tiada swing extreme, tiada liquidity yang diambil. Ia hanya wick.',
        'Example A: a long upper wick, but mid-range, near the 4,700 equilibrium. No swing extreme, no liquidity taken. It is just a wick.'],
      ['Contoh B: rejection block bearish terbentuk dengan betul. Tetapi apabila harga kembali, ia close di atas 4,782. Zon itu telah gagal.',
        'Example B: a bearish rejection block forms correctly. But when price returns, it closes above 4,782. The zone has failed.']
    ],
    a: { data: D_mid, pmin: 4560, pmax: 4840, step: 50, slots: 38, reveal: [1, 0], revealDur: 4, title: 'EXAMPLE A · HYPOTHETICAL', tag: 'MID-RANGE WICK',
      ov: (S, c) => T.rangeOv(S, 4800, 4600, 4, 1, { hl: 'HIGH ', ll: 'LOW ' }) + tag(S.xs(21), S.ys(4744) - 26, '✗ JUST A WICK', C.bear, { op: c.p([1, 4]), fs: 13 }) },
    b: { data: D_inv, pmin: 4640, pmax: 4860, step: 50, slots: 38, reveal: [2, 0], revealDur: 4, title: 'EXAMPLE B · HYPOTHETICAL', tag: 'RB FAILED', show: [2, 0],
      ov: (S, c) => rbBear(S, 1, 32, 'RB 4,750–4,782') + tag(S.xs(30), S.ys(4830) - 10, '✗ CLOSED ABOVE 4,782', C.bear, { anchor: 'end', op: c.p([2, 4]), fs: 13 }) },
    h: 760
  }));

  scenes.push(T.cards({
    label: '6.5 · CONVENTION', kicker: 'SUBTOPIC ⑤ · 6.5', title: 'The convention used in this series',
    lines: [
      ['Definisi rejection block juga berbeza antara pendidik. Inilah konvensyen yang kita gunakan.', 'Rejection block definitions also vary between educators. This is the convention we use.'],
      ['Lokasi: swing extreme yang bermakna. Zon bearish: body tertinggi hingga wick high. Zon bullish: wick low hingga body terendah.',
        'Location: a meaningful swing extreme. Bearish zone: highest body to wick high. Bullish zone: wick low to lowest body.'],
      ['Kegagalan: close melepasi wick extreme. Sesetengah pengamal juga menggunakan titik tengah zon wick sebagai rujukan, sama seperti mean threshold.',
        'Failure: a close beyond the wick extreme. Some practitioners also use the midpoint of the wick zone as a reference, similar to a mean threshold.']
    ],
    cards: [
      { x: 60, y: 220, w: 560, h: 300, at: [1, 0], kick: 'LOCATION', head: 'Meaningful swing extreme', body: 'Premium for bearish, discount for bullish, often after a liquidity run.' },
      { x: 680, y: 220, w: 560, h: 300, at: [1, 3], kick: 'ZONE', head: 'Body → wick', body: 'Bearish: highest body to wick high. Bullish: wick low to lowest body.' },
      { x: 1300, y: 220, w: 560, h: 300, at: [2, 0], col: '#e54f4d', kick: 'FAILURE', head: 'Close beyond the wick', body: 'Some also reference the 50% of the wick zone. Conventions vary.' }
    ]
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ⑤ · 6.12', title: 'Common rejection block mistakes', rowH: 160,
    lines: [
      ['Kesilapan biasa:', 'Common mistakes:'],
      ['Menganggap setiap wick panjang sebagai rejection block. Dan menyamakannya dengan pin bar satu candle.', 'Treating every long wick as a rejection block. And equating it with a one-candle pin bar.'],
      ['Mengabaikan lokasi dalam range dan konteks liquidity. Dan terus menggunakan zon yang telah ditembusi.', 'Ignoring location in the range and liquidity context. And continuing to use a zone that has been violated.']
    ],
    items: [[[1, 0], 'Every long wick = rejection block', 'Mid-range wicks lack the required context.'], [[1, 3], 'Equating it with a pin bar', 'A rejection block is a contextual zone, not a pattern.'],
      [[2, 0], 'Ignoring location &amp; liquidity', 'Swing extreme + liquidity run + P/D location matter.'], [[2, 3.5], 'Using a violated zone', 'A close beyond the wick extreme means failure.']]
  }));

  scenes.push(T.summary({
    title: 'Rejection Block',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Rejection block terbentuk di swing extreme yang bermakna dengan wick panjang, biasanya selepas liquidity diambil.', 'A rejection block forms at a meaningful swing extreme with long wicks, usually after liquidity is taken.'],
      ['Zon ditandakan dari body ke wick, dan ia gagal pada close melepasi wick.', 'The zone is marked from body to wick, and it fails on a close beyond the wick.'],
      ['Ia bukan pin bar biasa, dan tidak setiap wick panjang ialah rejection block.', 'It is not an ordinary pin bar, and not every long wick is a rejection block.']
    ],
    items: [[[1, 0], 'Meaningful swing extreme'], [[1, 3], 'Often after a liquidity run'], [[2, 0], 'Zone: body → wick'], [[2, 2], 'Fails on close beyond wick'], [[3, 0], 'Not a pin bar'], [[3, 2], 'Not every long wick']]
  }));

  scenes.push(T.quiz([
    ['How is a bearish rejection block zone marked in this convention?', 'From the highest candle body at the swing high up to the highest wick. Here: 4,750 to 4,782.',
      'bagaimana zon rejection block bearish ditandakan dalam konvensyen ini?', 'dari body candle tertinggi di swing high hingga wick tertinggi. Di sini: 4,750 hingga 4,782.'],
    ['Why is a long wick near equilibrium usually not a rejection block?', 'It is not at a meaningful swing extreme and usually has no liquidity context. It lacks what defines the rejection block.',
      'mengapa wick panjang berhampiran equilibrium biasanya bukan rejection block?', 'ia bukan di swing extreme yang bermakna dan biasanya tiada konteks liquidity. Ia tidak mempunyai ciri yang mentakrifkan rejection block.'],
    ['How does a rejection block differ from a pin bar?', 'A pin bar is a one-candle pattern that can appear anywhere. A rejection block is a zone at a meaningful extreme, with liquidity and location context, used on return.',
      'bagaimana rejection block berbeza daripada pin bar?', 'pin bar ialah corak satu candle yang boleh muncul di mana-mana. Rejection block ialah zon di extreme yang bermakna, dengan konteks liquidity dan lokasi, digunakan apabila harga kembali.'],
    ['When is a bullish rejection block considered failed?', 'When price closes below the wick low of the zone.',
      'bilakah rejection block bullish dianggap gagal?', 'apabila harga close di bawah wick low zon itu.']
  ]));

  scenes.push(T.exercise({
    title: 'Filter long wicks',
    lines: [
      ['Latihan praktikal: tandakan sepuluh candle dengan wick panjang pada carta anda.', 'Practical exercise: mark ten candles with long wicks on your chart.'],
      ['Untuk setiap satu, semak: adakah ia di swing extreme yang bermakna? Adakah liquidity diambil? Di mana lokasinya dalam range?', 'For each, check: is it at a meaningful swing extreme? Was liquidity taken? Where is it in the range?'],
      ['Hanya yang lulus ketiga-tiga semakan ditandakan sebagai rejection block. Kemudian catat hasilnya apabila harga kembali.', 'Only those that pass all three checks are marked as rejection blocks. Then record the outcome when price returned.']
    ],
    steps: [[[1, 0], 'Mark ten long-wick candles'], [[1, 2], 'Check: meaningful swing extreme?'], [[1, 4], 'Check: liquidity taken?'], [[1, 6], 'Check: premium/discount location?'], [[2, 0], 'Mark the survivors body → wick and record outcomes']]
  }));

  scenes.push(T.next({
    no: '09', short: 'FVG, IFVG &amp; Void', kicker: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'FVG, IFVG &amp; Liquidity Void',
    lines: [['Dalam video seterusnya: ulang kaji ringkas fair value gap, kemudian inverse fair value gap dan liquidity void, serta perbezaan antara ketiga-tiganya.',
      'In the next video: a brief recap of the fair value gap, then the inverse fair value gap and the liquidity void, and the differences between all three.']],
    html: (t) => `<div class="a mono" style="left:0;width:1200px;text-align:center;top:190px;font-size:52px;color:#fff;font-weight:700;opacity:${P(t, .5, .6)}">FVG · IFVG · VOID</div>`
  }));
  scenes.push(T.refs(['ict', 'emb'], 'Rejection block ialah istilah ICT. Corak pin bar dan candle rejection dibincangkan dalam analisis carta konvensional.',
    'Rejection block is an ICT term. Pin bar and rejection candle patterns are discussed in conventional chart analysis.', 'Rejection block definitions vary between educators; the body-to-wick convention used here is stated on screen.'));
  scenes.push(T.disclaimer('09', 'FVG, IFVG &amp; Liquidity Void'));
  registerVideo({ id: 'v08', title: 'VIDEO 08 — REJECTION BLOCK', scenes });
})();
