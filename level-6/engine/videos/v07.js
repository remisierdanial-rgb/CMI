/* VIDEO 07 — Breaker Block & Mitigation Block. Illustrative FCPO-style prices only.
 * Convention taught (flagged as a convention):
 *  Bullish breaker   : low A → high B → LOWER low C (sweeps SSL below A) → break above B.
 *                      Zone = last up-close candle at B (a failed bearish order block).
 *  Bullish mitigation: low A → high B → HIGHER low C (failure swing, no sweep) → break above B.
 *  Bearish versions mirror these. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const upB = [[4702, 4720, 4698, 4716]];   // bullish-zone candle at B: body 4,702–4,716
  const dnB = [[4698, 4702, 4680, 4684]];   // bearish-zone candle at B: body 4,684–4,698
  const mk = (way, seed, row) => T.patch(gen(way, seed), 10, row);
  const D_bBr = mk([[0, 4690], [4, 4650], [10, 4720], [16, 4630], [22, 4742], [28, 4710], [36, 4792]], 121, upB);
  const D_bMi = mk([[0, 4690], [4, 4650], [10, 4720], [16, 4668], [22, 4742], [28, 4710], [36, 4792]], 122, upB);
  const D_sBr = mk([[0, 4700], [4, 4750], [10, 4680], [16, 4770], [22, 4660], [28, 4690], [36, 4610]], 123, dnB);
  const D_sMi = mk([[0, 4700], [4, 4750], [10, 4680], [16, 4732], [22, 4660], [28, 4690], [36, 4610]], 124, dnB);
  const D_flip = gen([[0, 4660], [6, 4700], [10, 4688], [14, 4702], [18, 4690], [24, 4740], [30, 4702], [36, 4760]], 125, { noise: .6 });
  const scenes = [];
  const zoneB = (S, a, i1 = 34, lbl) => ovl.zone(S, 4702, 4716, 9.6, i1, C.bull, { alpha: .2, op: a, stroke: true }) + (lbl ? tag(S.xs(i1), S.ys(4716) - 16, lbl, C.bull, { anchor: 'end', op: a, fs: 13 }) : '');
  const zoneS = (S, a, i1 = 34, lbl) => ovl.zone(S, 4684, 4698, 9.6, i1, C.bear, { alpha: .2, op: a, stroke: true }) + (lbl ? tag(S.xs(i1), S.ys(4684) + 16, lbl, C.bear, { anchor: 'end', op: a, fs: 13 }) : '');
  const abc = (S, c, pts, at) => pts.map((p, k) => dot(S.xs(p[0]), S.ys(p[1]), '#fff', c.p(at[k]), 6) + tag(S.xs(p[0]), S.ys(p[1]) + (p[2] ? -26 : 26), p[3], p[4] || C.mute, { op: c.p(at[k]), fs: 13 })).join('');

  scenes.push(T.title({
    no: '07', sub: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Breaker Block &amp; Mitigation Block', tagline: 'Failed structure and role reversal',
    objectives: ['Build a bullish and bearish breaker', 'Distinguish a breaker from a plain S/R flip', 'Identify a mitigation block', 'Separate breaker from mitigation: the sweep'],
    lines: [
      ['Selamat kembali. Dalam Video 7, kita mempelajari dua PD Array yang terbentuk daripada struktur yang gagal: Breaker Block dan Mitigation Block.',
        'Welcome back. In Video 7, we study two PD Arrays formed from failed structure: the Breaker Block and the Mitigation Block.'],
      ['Anda akan membina breaker bullish dan bearish, membezakannya daripada flip support resistance biasa,', 'You will build bullish and bearish breakers, distinguish them from an ordinary support and resistance flip,'],
      ['dan memahami satu perbezaan utama antara breaker dan mitigation block: ada atau tiada liquidity sweep.', 'and understand the one key difference between a breaker and a mitigation block: whether there is a liquidity sweep.']
    ],
    illus: (t, L) => {
      const a = P(t, L[0] + 1, 1.5), b = P(t, L[1], .6), X = 1160, y = v => 760 - (v - 4620) * 2.2;
      const pts = [[0, 4690], [60, 4650], [180, 4720], [300, 4630], [420, 4742], [520, 4710], [640, 4790]];
      const d = pts.map((p, k) => (k ? 'L' : 'M') + (X + p[0]) + ',' + y(p[1])).join(' ');
      return `<rect x="${X + 160}" y="${y(4716)}" width="500" height="${y(4702) - y(4716)}" fill="${C.bull}" opacity="${.22 * b}" stroke="${C.bull}"/>` +
        `<path d="${d}" fill="none" stroke="${C.mute}" stroke-width="2.6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - a}"/>` +
        ['A', 'B', 'C'].map((s, k) => txt(X + pts[k + 1][0], y(pts[k + 1][1]) + (k === 1 ? -14 : 30), s, { anchor: 'middle', col: '#fff', fs: 18, fw: 700, op: a })).join('') +
        txt(X + 300, y(4630) + 54, 'SWEEP', { anchor: 'middle', col: C.cyan, fs: 15, fw: 700, op: b });
    }
  }));

  scenes.push(T.chart({
    label: '6.3 · BULLISH BREAKER BLOCK',
    lines: [
      ['Breaker bullish terbentuk dalam empat langkah.', 'A bullish breaker forms in four steps.'],
      ['Satu: harga membuat low A di 4,650. Dua: harga naik ke high B di 4,720. Candle up-close terakhir di B, body 4,702 hingga 4,716, ialah order block bearish yang berpotensi.',
        'One: price makes low A at 4,650. Two: price rallies to high B at 4,720. The last up-close candle at B, body 4,702 to 4,716, is a potential bearish order block.'],
      ['Tiga: harga jatuh dan membuat lower low C di 4,630, menyapu sell-side liquidity di bawah low A.', 'Three: price falls and makes a lower low C at 4,630, sweeping the sell-side liquidity below low A.'],
      ['Empat: harga berbalik dengan displacement dan close di atas high B. Order block bearish tadi telah gagal.', 'Four: price reverses with displacement and closes above high B. The bearish order block has failed.'],
      ['Zon yang gagal ini kini ditafsir dengan peranan terbalik, sebagai breaker bullish. Apabila harga kembali ke 4,710, ia dikaji sebagai kawasan support yang berpotensi.',
        'This failed zone is now interpreted with a reversed role, as a bullish breaker. When price returns to 4,710, it is studied as a potential support area.']
    ],
    chart: {
      data: D_bBr, pmin: 4600, pmax: 4820, step: 50, slots: 40, tag: 'BULLISH BREAKER · ILLUSTRATIVE',
      n: c => 3 + 8 * P(c.t, c.at([1, 0]), 3) + 6 * P(c.t, c.at([2, 0]), 2.5) + 6 * P(c.t, c.at([3, 0]), 2.5) + 14 * P(c.t, c.at([4, 2]), 4),
      ov: (S, c) => abc(S, c, [[4, 4650, 0, 'A · 4,650'], [10, 4720, 1, 'B · 4,720'], [16, 4630, 0, 'C · 4,630 SWEEP', C.cyan]], [[1, 0], [1, 2], [2, 0]]) +
        ovl.hl(S, 4650, 4, 17, C.cyan, { dash: '5 5', op: c.p([2, 0]) }) +
        ovl.zone(S, 4702, 4716, 9.6, 10.4, C.bear, { alpha: .3, op: c.p([1, 4]) * (1 - c.p([4, 0])), stroke: true }) +
        ovl.hl(S, 4720, 10, 23, C.mute, { dash: '5 5', op: c.p([3, 0]) }) + tag(S.xs(22), S.ys(4720) - 24, 'CLOSE ABOVE B', C.bull, { op: c.p([3, 1]), fs: 13 }) +
        zoneB(S, c.p([4, 0]), 36, 'BULLISH BREAKER 4,702–4,716') + dot(S.xs(28), S.ys(4710), C.gold, c.p([4, 3]), 7)
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.3', title: 'Bullish breaker', items: [[[1, 0], 'A: low · B: high with up-close candle'], [[2, 0], 'C: lower low sweeps SSL below A'], [[3, 0], 'Close above B: the bearish OB fails'], [[4, 0], 'Failed zone → bullish breaker'], [[4, 4], 'Return: potential support']] }
  }));

  scenes.push(T.chart({
    label: '6.3 · BEARISH BREAKER BLOCK',
    lines: [
      ['Breaker bearish ialah cerminannya. Harga membuat high A di 4,750, kemudian low B di 4,680. Candle down-close terakhir di B, body 4,684 hingga 4,698, ialah order block bullish yang berpotensi.',
        'A bearish breaker is the mirror. Price makes high A at 4,750, then low B at 4,680. The last down-close candle at B, body 4,684 to 4,698, is a potential bullish order block.'],
      ['Harga kemudian membuat higher high C di 4,770, menyapu buy-side liquidity di atas A, kemudian jatuh dan close di bawah B.',
        'Price then makes a higher high C at 4,770, sweeping the buy-side liquidity above A, then falls and closes below B.'],
      ['Order block bullish itu gagal, dan zonnya kini menjadi breaker bearish. Apabila harga kembali ke 4,690, ia dikaji sebagai kawasan resistance yang berpotensi.',
        'That bullish order block failed, and its zone now becomes a bearish breaker. When price returns to 4,690, it is studied as a potential resistance area.']
    ],
    chart: {
      data: D_sBr, pmin: 4580, pmax: 4800, step: 50, slots: 40, tag: 'BEARISH BREAKER · ILLUSTRATIVE',
      n: c => 3 + 14 * P(c.t, c.at([0, 0]), 5) + 6 * P(c.t, c.at([1, 0]), 3) + 14 * P(c.t, c.at([2, 2]), 4),
      ov: (S, c) => abc(S, c, [[4, 4750, 1, 'A · 4,750'], [10, 4680, 0, 'B · 4,680'], [16, 4770, 1, 'C · 4,770 SWEEP', C.cyan]], [[0, 1], [0, 4], [1, 0]]) +
        ovl.hl(S, 4750, 4, 17, C.cyan, { dash: '5 5', op: c.p([1, 0]) }) + ovl.hl(S, 4680, 10, 23, C.mute, { dash: '5 5', op: c.p([1, 4]) }) +
        zoneS(S, c.p([2, 0]), 36, 'BEARISH BREAKER 4,684–4,698') + dot(S.xs(28), S.ys(4690), C.gold, c.p([2, 4]), 7)
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.3', title: 'Bearish breaker', items: [[[0, 0], 'A: high · B: low with down-close candle'], [[1, 0], 'C: higher high sweeps BSL above A'], [[1, 4], 'Close below B: the bullish OB fails'], [[2, 0], 'Failed zone → bearish breaker']] }
  }));

  scenes.push(T.two({
    label: '6.3 · BREAKER VS S/R FLIP',
    lines: [
      ['Bagaimana breaker berbeza daripada flip support resistance biasa?', 'How is a breaker different from an ordinary support and resistance flip?'],
      ['Dalam flip biasa, harga hanya menembusi satu aras yang pernah diuji, iaitu sekitar 4,700, kemudian kembali mengujinya dari sisi lain. Tiada order block, tiada sweep, tiada displacement yang jelas.',
        'In an ordinary flip, price simply breaks a level that was tested before, around 4,700, then retests it from the other side. No order block, no sweep, no clear displacement.'],
      ['Breaker memerlukan konteks yang lebih spesifik: order block yang gagal, liquidity sweep, dan displacement yang memecahkan struktur.',
        'A breaker requires more specific context: a failed order block, a liquidity sweep, and a displacement that breaks structure.'],
      ['Kedua-duanya boleh bertindak sebagai rujukan. Tetapi jangan labelkan setiap flip sebagai breaker.', 'Both can act as references. But do not label every flip as a breaker.']
    ],
    a: { data: D_flip, pmin: 4640, pmax: 4780, step: 25, slots: 38, reveal: [1, 0], revealDur: 5, title: 'ORDINARY FLIP · HYPOTHETICAL', tag: 'LEVEL BROKEN + RETESTED',
      ov: (S, c) => ovl.hl(S, 4702, 4, 36, C.mute, { dash: '6 5', op: c.p([1, 0]) }) + tag(S.xs(20), S.ys(4702) - 24, 'S/R LEVEL ~4,700', C.mute, { op: c.p([1, 0]), fs: 13 }) + tag(S.xs(30), S.ys(4702) + 26, 'RETEST', C.mute, { op: c.p([1, 5]), fs: 13 }) },
    b: { data: D_bBr, pmin: 4600, pmax: 4820, step: 50, slots: 38, reveal: [2, 0], revealDur: 5, title: 'BREAKER · HYPOTHETICAL', tag: 'FAILED OB + SWEEP + DISPLACEMENT', show: [2, 0],
      ov: (S, c) => zoneB(S, 1, 36) + tag(S.xs(16), S.ys(4630) + 26, 'SWEEP', C.cyan, { fs: 13 }) + tag(S.xs(30), S.ys(4716) - 18, 'BREAKER', C.bull, { fs: 13 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([3, 0])}"><b>Not every flip is a breaker.</b> A breaker needs a failed order block, a liquidity sweep and displacement that breaks structure.</div>`
  }));

  scenes.push(T.two({
    label: '6.4 · MITIGATION BLOCK',
    lines: [
      ['Sekarang Mitigation Block. Strukturnya hampir sama dengan breaker, dengan satu perbezaan penting.', 'Now the Mitigation Block. Its structure is almost the same as a breaker, with one important difference.'],
      ['Di sebelah kiri, breaker bullish: C membuat lower low di 4,630, menyapu liquidity di bawah A.', 'On the left, the bullish breaker: C makes a lower low at 4,630, sweeping liquidity below A.'],
      ['Di sebelah kanan, mitigation block bullish: C hanya mencapai 4,668, iaitu higher low. Harga gagal membuat low baharu. Ini dipanggil failure swing.',
        'On the right, the bullish mitigation block: C only reaches 4,668, a higher low. Price failed to make a new low. This is called a failure swing.'],
      ['Kemudian harga memecahkan high B. Candle up-close terakhir di B menjadi mitigation block, dan apabila harga kembali, ia dikaji sebagai kawasan minat bullish.',
        'Then price breaks high B. The last up-close candle at B becomes the mitigation block, and when price returns, it is studied as a bullish area of interest.'],
      ['Jadi perbezaannya: breaker ada liquidity sweep. Mitigation block tiada sweep, hanya failure swing.', 'So the difference: a breaker has a liquidity sweep. A mitigation block has no sweep, only a failure swing.']
    ],
    a: { data: D_bBr, pmin: 4600, pmax: 4820, step: 50, slots: 38, reveal: [1, 0], revealDur: 4, title: 'BREAKER · HYPOTHETICAL', tag: 'LOWER LOW · SWEEP',
      ov: (S, c) => abc(S, c, [[4, 4650, 0, 'A'], [10, 4720, 1, 'B'], [16, 4630, 0, 'C · LOWER LOW', C.cyan]], [[1, 0], [1, 1], [1, 2]]) + ovl.hl(S, 4650, 4, 17, C.cyan, { dash: '5 5', op: c.p([1, 2]) }) + zoneB(S, c.p([3, 2]), 36, 'BREAKER') },
    b: { data: D_bMi, pmin: 4600, pmax: 4820, step: 50, slots: 38, reveal: [2, 0], revealDur: 4, title: 'MITIGATION · HYPOTHETICAL', tag: 'HIGHER LOW · NO SWEEP', show: [2, 0],
      ov: (S, c) => abc(S, c, [[4, 4650, 0, 'A'], [10, 4720, 1, 'B'], [16, 4668, 0, 'C · HIGHER LOW', C.gold]], [[2, 0], [2, 1], [2, 2]]) + ovl.hl(S, 4650, 4, 17, C.mute, { dash: '5 5', op: c.p([2, 2]) }) +
        tag(S.xs(10), S.ys(4650) + 24, 'A NOT TAKEN', C.mute, { op: c.p([2, 4]), fs: 12 }) + zoneB(S, c.p([3, 2]), 36, 'MITIGATION BLOCK') },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([4, 0])}"><b>The key difference:</b> breaker = sweep of the prior low/high. Mitigation block = failure swing, no sweep.</div>`
  }));

  scenes.push(T.two({
    label: '6.4 · BEARISH VERSIONS',
    lines: [
      ['Versi bearish mengikut logik yang sama.', 'The bearish versions follow the same logic.'],
      ['Breaker bearish: C membuat higher high di 4,770, menyapu buy-side liquidity di atas A, sebelum harga memecahkan low B.', 'Bearish breaker: C makes a higher high at 4,770, sweeping buy-side liquidity above A, before price breaks low B.'],
      ['Mitigation block bearish: C hanya mencapai 4,732, iaitu lower high. Tiada sweep. Kemudian harga memecahkan low B.', 'Bearish mitigation block: C only reaches 4,732, a lower high. No sweep. Then price breaks low B.']
    ],
    a: { data: D_sBr, pmin: 4580, pmax: 4800, step: 50, slots: 38, reveal: [1, 0], revealDur: 4, title: 'BEARISH BREAKER · HYPOTHETICAL', tag: 'HIGHER HIGH · SWEEP',
      ov: (S, c) => abc(S, c, [[4, 4750, 1, 'A'], [10, 4680, 0, 'B'], [16, 4770, 1, 'C · HIGHER HIGH', C.cyan]], [[1, 0], [1, 1], [1, 2]]) + zoneS(S, c.p([1, 4]), 36, 'BREAKER') },
    b: { data: D_sMi, pmin: 4580, pmax: 4800, step: 50, slots: 38, reveal: [2, 0], revealDur: 4, title: 'BEARISH MITIGATION · HYPOTHETICAL', tag: 'LOWER HIGH · NO SWEEP', show: [2, 0],
      ov: (S, c) => abc(S, c, [[4, 4750, 1, 'A'], [10, 4680, 0, 'B'], [16, 4732, 1, 'C · LOWER HIGH', C.gold]], [[2, 0], [2, 1], [2, 2]]) + zoneS(S, c.p([2, 4]), 36, 'MITIGATION BLOCK') },
    h: 760
  }));

  scenes.push(T.cards({
    label: '6.4 · CONVENTIONS', kicker: 'SUBTOPIC ⑤ · 6.3–6.4', title: 'Definitions vary: the convention we use',
    lines: [
      ['Satu nota penting. Definisi breaker dan mitigation block berbeza antara pendidik ICT dan SMC.', 'An important note. Definitions of breaker and mitigation block vary between ICT and SMC educators.'],
      ['Dalam siri ini, kita menggunakan konvensyen: breaker memerlukan sweep, mitigation block ialah failure swing tanpa sweep. Kedua-duanya memerlukan close melepasi swing B.',
        'In this series, we use this convention: a breaker requires a sweep, a mitigation block is a failure swing without a sweep. Both require a close beyond swing B.'],
      ['Istilah mitigation juga digunakan secara umum untuk maksud harga kembali ke sesuatu zon. Itu berbeza daripada mitigation block sebagai jenis PD Array.',
        'The word mitigation is also used generally to mean price returning to a zone. That is different from the mitigation block as a PD Array type.']
    ],
    cards: [
      { x: 60, y: 220, w: 880, h: 330, at: [1, 0], col: '#25a198', kick: 'BREAKER', head: 'Failed OB + liquidity sweep', body: 'A → B → C beyond A (sweep) → close beyond B. Zone: the failed order block candle at B.' },
      { x: 980, y: 220, w: 880, h: 330, at: [1, 4], col: '#d7b256', kick: 'MITIGATION BLOCK', head: 'Failure swing, no sweep', body: 'A → B → C fails to reach A → close beyond B. Zone: the opposing candle at B.' }
    ],
    warn: { at: [2, 0], y: 600, s: '<b>"Mitigation" (price returning to a zone)</b> is a general term. The <b>mitigation block</b> is a specific PD Array type. Do not confuse them.' }
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ⑤ · 6.12', title: 'Common breaker &amp; mitigation mistakes', rowH: 160,
    lines: [
      ['Kesilapan biasa:', 'Common mistakes:'],
      ['Melabel setiap flip support resistance sebagai breaker. Dan tidak menyemak sama ada swing C menyapu liquidity.', 'Labelling every support and resistance flip as a breaker. And not checking whether swing C swept liquidity.'],
      ['Mengelirukan mitigation block dengan sebarang retest order block. Dan menganggap breaker tidak boleh gagal.', 'Confusing a mitigation block with any order block retest. And assuming a breaker cannot fail.']
    ],
    items: [[[1, 0], 'Every flip called a breaker', 'A breaker needs a failed OB, a sweep and displacement.'], [[1, 4], 'Not checking the sweep at C', 'The sweep separates breaker from mitigation block.'],
      [[2, 0], 'Any OB retest = mitigation block', 'A mitigation block needs the failure swing structure.'], [[2, 4], 'Assuming a breaker cannot fail', 'A close back through the zone invalidates it.']]
  }));

  scenes.push(T.summary({
    title: 'Breaker &amp; Mitigation',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Breaker terbentuk apabila order block gagal selepas liquidity sweep, dan zonnya ditafsir dengan peranan terbalik.', 'A breaker forms when an order block fails after a liquidity sweep, and its zone is read with a reversed role.'],
      ['Mitigation block mempunyai struktur yang sama tetapi tanpa sweep: ia failure swing.', 'A mitigation block has the same structure but without the sweep: it is a failure swing.'],
      ['Kedua-duanya berbeza daripada flip biasa, dan kedua-duanya boleh gagal.', 'Both differ from an ordinary flip, and both can fail.']
    ],
    items: [[[1, 0], 'Breaker = failed OB + sweep'], [[1, 3], 'Role reversal after close beyond B'], [[2, 0], 'Mitigation block = failure swing'], [[2, 2], 'No sweep of A'],
      [[3, 0], 'Not the same as an S/R flip'], [[3, 2], 'Both can fail']]
  }));

  scenes.push(T.quiz([
    ['Why should a trader distinguish a breaker from an ordinary S/R flip?', 'A breaker carries specific context: a failed order block, a liquidity sweep and displacement. An ordinary flip has none of these, so treating them the same overstates the evidence.',
      'mengapa trader perlu membezakan breaker daripada flip S/R biasa?', 'breaker membawa konteks khusus: order block yang gagal, liquidity sweep dan displacement. Flip biasa tiada semua ini, jadi menyamakannya membesar-besarkan bukti.'],
    ['A → B → C, where C is a higher low, then price closes above B. Breaker or mitigation block?', 'Mitigation block. C did not sweep the low at A; it was a failure swing.',
      'A, B, C, di mana C ialah higher low, kemudian harga close di atas B. Breaker atau mitigation block?', 'mitigation block. C tidak menyapu low A; ia failure swing.',
      'A, then B, then C, where C is a higher low, then price closes above B. Breaker or mitigation block?', 'Mitigation block. C did not sweep the low at A; it was a failure swing.'],
    ['Which candle forms a bullish breaker zone?', 'The last up-close candle at swing high B: the bearish order block that later failed.',
      'candle manakah yang membentuk zon breaker bullish?', 'candle up-close terakhir di swing high B, iaitu order block bearish yang kemudiannya gagal.'],
    ['Is "mitigation" the same as a "mitigation block"?', 'No. Mitigation generally means price returning to a zone. A mitigation block is a specific PD Array type built from a failure swing.',
      'adakah "mitigation" sama dengan "mitigation block"?', 'tidak. Mitigation secara umum bermaksud harga kembali ke sesuatu zon. Mitigation block ialah jenis PD Array khusus daripada failure swing.']
  ]));

  scenes.push(T.exercise({
    title: 'Classify failed structures',
    lines: [
      ['Latihan praktikal: cari lima struktur A, B, C pada carta anda di mana harga akhirnya close melepasi B.', 'Practical exercise: find five A, B, C structures on your chart where price eventually closed beyond B.'],
      ['Untuk setiap satu, semak sama ada C menyapu A. Klasifikasikan sebagai breaker atau mitigation block, dan tandakan zonnya.', 'For each, check whether C swept A. Classify it as a breaker or a mitigation block, and mark its zone.'],
      ['Kemudian catat apa yang berlaku apabila harga kembali ke zon itu.', 'Then record what happened when price returned to that zone.']
    ],
    steps: [[[1, 0], 'Find five A → B → C structures with a close beyond B'], [[1, 2.5], 'Did C sweep A? Yes → breaker · No → mitigation block'], [[1, 5], 'Mark the zone: the opposing candle at B'], [[2, 0], 'Record the outcome on return']]
  }));

  scenes.push(T.next({
    no: '08', short: 'Rejection Block', kicker: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Rejection Block — identification and interpretation',
    lines: [['Dalam video seterusnya: Rejection Block, dan mengapa tidak setiap wick panjang ialah rejection block.', 'In the next video: the Rejection Block, and why not every long wick is a rejection block.']],
    html: (t) => `<svg class="a" style="left:520px;top:60px" width="200" height="330"><line x1="100" x2="100" y1="20" y2="300" stroke="${C.bear}" stroke-width="4" opacity="${P(t, .5, .6)}"/><rect x="70" y="200" width="60" height="70" fill="${C.bear}" opacity="${P(t, .5, .6)}"/>
      <rect x="40" y="20" width="120" height="180" fill="${C.bear}" opacity="${.15 * P(t, 1.4, .6)}" stroke="${C.bear}" stroke-dasharray="5 4"/></svg>`
  }));
  scenes.push(T.refs(['ict', 'murphy', 'emb'], 'Breaker dan mitigation block ialah istilah ICT. Flip support resistance ialah konsep analisis carta konvensional.',
    'Breaker and mitigation block are ICT terms. The support and resistance flip is a conventional chart analysis concept.', 'Breaker and mitigation block definitions vary between educators. The convention used here (sweep vs failure swing) is stated on screen.'));
  scenes.push(T.disclaimer('08', 'Rejection Block'));
  registerVideo({ id: 'v07', title: 'VIDEO 07 — BREAKER &amp; MITIGATION BLOCK', scenes });
})();
