/* VIDEO 05 — Fibonacci Optimal Trade Entry (OTE). Illustrative FCPO-style prices only.
 * Convention (locked for the series): 0 at the END of the impulse leg, 1 at its START.
 * Bullish: price(r) = High − r × (High − Low).  Bearish: price(r) = Low + r × (High − Low). */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const F = T.fib;
  const patch = (d, i, rows) => { rows.forEach((r, k) => { const o = k === 0 ? d[i - 1].c : rows[k - 1][3]; d[i + k] = { o, h: Math.max(r[1], o, r[3]), l: Math.min(r[2], o, r[3]), c: r[3] }; }); if (d[i + rows.length]) d[i + rows.length].o = rows[rows.length - 1][3]; return d; };
  const bullF = d => patch(d, 9, [[0, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]]);
  const bearF = d => patch(d, 9, [[0, 4774, 4755, 4758], [0, 4760, 4706, 4710], [0, 4732, 4692, 4698]]);
  const D_bu = bullF(gen([[0, 4640], [4, 4600], [8, 4625], [12, 4705], [20, 4800], [28, 4650], [31, 4672], [33, 4660], [42, 4805]], 101));
  const D_be = bearF(gen([[0, 4760], [4, 4800], [8, 4775], [12, 4695], [20, 4600], [28, 4750], [31, 4728], [33, 4740], [42, 4598]], 102));
  const D_in = gen([[0, 4640], [4, 4600], [18, 4800], [26, 4652], [34, 4740]], 103);
  const scenes = [];
  const lv = r => fmt(Math.round(F(4600, 4800, r) * 10) / 10), lvb = r => fmt(Math.round(F(4800, 4600, r) * 10) / 10);

  scenes.push(T.title({
    no: '05', sub: 'SUBTOPIC ④', title: 'Fibonacci Optimal Trade Entry', tagline: 'Retracement and correct anchoring',
    objectives: ['Understand the OTE framework', 'Know the key Fibonacci levels', 'Anchor Fibonacci correctly, both directions', 'Combine OTE with confluence carefully'],
    lines: [
      ['Selamat kembali. Dalam Video 5, kita mempelajari Fibonacci Optimal Trade Entry, atau OTE.', 'Welcome back. In Video 5, we study Fibonacci Optimal Trade Entry, or OTE.'],
      ['Anda akan memahami kerangka OTE, aras Fibonacci yang penting, dan cara anchor Fibonacci dengan betul untuk bullish dan bearish.',
        'You will understand the OTE framework, the key Fibonacci levels, and how to anchor Fibonacci correctly for bullish and bearish legs.'],
      ['Kita juga akan melihat cara menggabungkan OTE dengan confluence, tanpa mengira bukti yang sama dua kali.', 'We will also see how to combine OTE with confluence, without counting the same evidence twice.']
    ],
    illus: (t, L) => {
      const X0 = 1130, X1 = 1810, YT = 430, YB = 740, a = P(t, L[0] + 1, 1.2), b = P(t, L[1], .8);
      const y = r => YT + r * (YB - YT);
      return `<path d="M${X0 + 40},${YB} L${X0 + 330},${YT} L${X0 + 470},${y(.7)}" fill="none" stroke="${C.mute}" stroke-width="2.6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - a}"/>` +
        `<rect x="${X0}" y="${y(.62)}" width="${X1 - X0}" height="${y(.79) - y(.62)}" fill="${C.amber}" opacity="${.18 * b}"/>` +
        [0, .5, .62, .705, .79, 1].map(r => `<line x1="${X0}" x2="${X1}" y1="${y(r)}" y2="${y(r)}" stroke="${C.amber}" stroke-width="1.4" opacity="${b * (r === .62 || r === .79 ? 1 : .5)}" ${r === .705 ? 'stroke-dasharray="4 5"' : ''}/>` + txt(X1 - 10, y(r) - 6, String(r), { anchor: 'end', col: C.amber, fs: 14, op: b })).join('') +
        txt(X0 + 600, y(.705) + 6, 'OTE', { anchor: 'end', col: C.amber, fs: 18, fw: 700, op: b, ls: 3 });
    }
  }));

  /* 5.1 */
  scenes.push(T.chart({
    label: '5.1 · INTRODUCTION TO OTE',
    lines: [
      ['Optimal Trade Entry ialah istilah ICT bagi kawasan retracement yang dikenal pasti menggunakan Fibonacci pada satu price leg yang dipilih.',
        'Optimal Trade Entry is the ICT term for a retracement area identified with Fibonacci on a selected price leg.'],
      ['Ideanya: selepas impulse yang kuat, harga sering membuat retracement sebelum menyambung. OTE menandakan kawasan dalam retracement itu yang mungkin menarik untuk dikaji.',
        'The idea: after a strong impulse, price often retraces before continuing. OTE marks an area within that retracement that may be worth studying.'],
      ['Dalam contoh ini, impulse bullish bergerak dari 4,600 ke 4,800. Zon OTE berada di antara 4,642 dan 4,676.',
        'In this example, a bullish impulse runs from 4,600 to 4,800. The OTE zone sits between 4,642 and 4,676.'],
      ['Penting: OTE ialah kerangka untuk mengenal pasti kawasan retracement yang berpotensi. Ia bukan isyarat entry yang dijamin.',
        'Important: OTE is a framework for identifying a potential retracement area. It is not a guaranteed entry signal.']
    ],
    chart: {
      data: D_in, pmin: 4560, pmax: 4840, step: 50, slots: 40, reveal: [0, .3], revealDur: 6, tag: 'IMPULSE → RETRACEMENT',
      ov: (S, c) => ovl.path(S, [[4, 4600], [18, 4800]], C.gold, c.p([1, 0], 1), 2.6) + tag(S.xs(10), S.ys(4720) - 30, 'IMPULSE LEG', C.gold, { op: c.p([1, 0]), fs: 14 }) +
        T.fibOv(S, 4600, 4800, 4, 34, c.p([2, 0], .8), [0, .62, .705, .79, 1])
    },
    side: { kicker: 'SUBTOPIC ④ · 5.1', title: 'What is OTE?', items: [[[0, 0], 'ICT term for a retracement area'], [[0, 4], 'Measured on a selected price leg'], [[1, 0], 'Impulse → retracement → possible continuation'], [[3, 0], 'A framework, not an entry signal', 'r']] }
  }));

  /* 5.2 levels */
  const LV = [[.5, 'Equilibrium of the leg', 'Same as the 50% midpoint'], [.618, 'Golden ratio retracement', 'Common Fibonacci level'], [.62, 'OTE upper boundary', 'ICT rounds 0.618 to 0.62'],
    [.705, 'OTE midpoint reference', '(62 + 79) ÷ 2 = 70.5'], [.79, 'OTE lower boundary', 'Deepest level of the zone']];
  scenes.push(T.cards({
    label: '5.2 · KEY FIBONACCI LEVELS', kicker: 'SUBTOPIC ④ · 5.2', title: 'Key Fibonacci levels · bullish leg 4,600 → 4,800',
    lines: [
      ['Mari lihat aras Fibonacci yang penting, menggunakan leg bullish 4,600 ke 4,800, iaitu 200 mata.', 'Let us look at the key Fibonacci levels, using a bullish leg from 4,600 to 4,800, which is 200 points.'],
      ['0.5 ialah separuh leg, 4,700. Ini sama dengan equilibrium. 0.618 ialah nisbah Fibonacci klasik, 4,676.4.',
        '0.5 is half the leg, 4,700. This equals equilibrium. 0.618 is the classic Fibonacci ratio, 4,676.4.'],
      ['ICT membundarkan 0.618 kepada 0.62, iaitu 4,676. Ini sempadan atas zon OTE.', 'ICT rounds 0.618 to 0.62, which is 4,676. This is the upper boundary of the OTE zone.'],
      ['0.79 ialah sempadan bawah, 4,642. Dan 0.705, titik tengah antara 62 dan 79, ialah 4,659.', '0.79 is the lower boundary, 4,642. And 0.705, the midpoint between 62 and 79, is 4,659.'],
      ['Jadi zon OTE yang biasa dirujuk ialah retracement 62 hingga 79 peratus, dengan 70.5 peratus sebagai rujukan tengah.',
        'So the commonly referenced OTE zone is the 62 to 79 percent retracement, with 70.5 percent as the midpoint reference.'],
      ['Pengiraannya: harga sama dengan high tolak nisbah, darab jarak leg. Contohnya, 4,800 tolak 0.79 darab 200, ialah 4,642.',
        'The calculation: price equals the high minus the ratio times the leg. For example, 4,800 minus 0.79 times 200 is 4,642.']
    ],
    cards: LV.map((l, k) => ({
      x: 60, y: 200 + k * 98, w: 1200, h: 84, at: [[1, 1, 2, 3, 3][k], [0, 4, 0, 4, 0][k]], col: (l[0] === .62 || l[0] === .79) ? '#f0a03a' : '#1b2442',
      html: () => `<div class="a mono" style="left:26px;top:22px;font-size:28px;color:#f0a03a;font-weight:700">${l[0]}</div>
        <div class="a" style="left:150px;top:16px;font-size:24px;font-weight:700">${l[1]}</div><div class="a" style="left:150px;top:48px;font-size:17px;color:#8a93a8">${l[2]}</div>
        <div class="a mono" style="right:26px;top:22px;font-size:28px;color:#fff">${lv(l[0])}</div>`
    })).concat([{ x: 1300, y: 200, w: 560, h: 474, at: [4, 0], col: '#f0a03a', kick: 'OTE ZONE', head: '62% – 79% retracement', html: c => `
        <div class="a mono" style="left:28px;top:130px;font-size:40px;color:#f0a03a;font-weight:700">4,642 – 4,676</div>
        <div class="a" style="left:28px;top:196px;font-size:21px;color:#c7cede">Midpoint reference 70.5% = 4,659</div>
        <div class="a mono" style="left:28px;top:280px;font-size:15px;color:#8a93a8;letter-spacing:2px;opacity:${c.p([5, 0])}">CALCULATION</div>
        <div class="a mono" style="left:28px;top:310px;font-size:21px;line-height:1.6;color:#e8ecf4;opacity:${c.p([5, 0])}">price = High − r × Range<br>4,800 − 0.79 × 200<br>= 4,800 − 158 = <span style="color:#f0a03a">4,642</span></div>` }])
  }));

  /* 5.3 anchoring */
  scenes.push(T.two({
    label: '5.3 · FIBONACCI ANCHORING',
    lines: [
      ['Ini bahagian teknikal yang kritikal: anchor Fibonacci.', 'This is a critical technical section: Fibonacci anchoring.'],
      ['Untuk leg bullish, kenal pasti permulaan impulse, swing low 4,600, dan penghujungnya, swing high 4,800. Tarik Fibonacci dari low ke high.',
        'For a bullish leg, identify the start of the impulse, the 4,600 swing low, and its end, the 4,800 swing high. Draw Fibonacci from the low to the high.'],
      ['Dalam konvensyen siri ini, 0 berada di hujung impulse, iaitu high, dan 1 di permulaannya, iaitu low. Retracement diukur ke bawah dari high.',
        'In this series convention, 0 sits at the end of the impulse, the high, and 1 at its start, the low. Retracement is measured downward from the high.'],
      ['Untuk leg bearish, sebaliknya: tarik dari swing high 4,800 ke swing low 4,600. 0 berada di low, 1 di high, dan retracement diukur ke atas.',
        'For a bearish leg, the reverse: draw from the 4,800 swing high to the 4,600 swing low. 0 sits at the low, 1 at the high, and retracement is measured upward.'],
      ['Zon OTE bullish ialah 4,642 hingga 4,676. Zon OTE bearish ialah 4,724 hingga 4,758.', 'The bullish OTE zone is 4,642 to 4,676. The bearish OTE zone is 4,724 to 4,758.'],
      ['Perhatian: sesetengah platform memaparkan nilai terbalik, dengan 0 di permulaan leg. Pada paparan itu, zon yang sama dilabel 0.21 hingga 0.38.',
        'Caution: some platforms display values in the opposite orientation, with 0 at the start of the leg. In that view, the same zone is labelled 0.21 to 0.38.'],
      ['Label berubah, tetapi zon harga tetap sama. Kita kekalkan satu konvensyen sepanjang siri ini, dan jangan sekali-kali terbalikkan anchor bullish dan bearish.',
        'The labels change, but the price zone stays the same. We keep one convention throughout this series, and never reverse the bullish and bearish anchors.']
    ],
    a: { data: D_in, pmin: 4560, pmax: 4840, step: 50, slots: 37, reveal: [0, .3], revealDur: 3, title: 'BULLISH LEG · HYPOTHETICAL', tag: 'ANCHOR LOW → HIGH',
      ov: (S, c) => {
        const d = c.p([1, 2], 1.5), x0 = S.xs(4), y0 = S.ys(4600), x1 = S.xs(18), y1 = S.ys(4800);
        return `<line x1="${x0}" y1="${y0}" x2="${x0 + (x1 - x0) * d}" y2="${y0 + (y1 - y0) * d}" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>` +
          dot(x0, y0, C.bull, c.p([1, 0]), 8) + dot(x1, y1, C.bear, c.p([1, 3]), 8) +
          tag(x0, y0 + 30, 'START · 1 · 4,600', C.bull, { op: c.p([1, 0]), fs: 13 }) + tag(x1, y1 - 30, 'END · 0 · 4,800', C.bear, { op: c.p([1, 3]), fs: 13 }) +
          T.fibOv(S, 4600, 4800, 4, 29, c.p([2, 0], .8), [0, .5, .62, .705, .79, 1], { noLabel: true }) +
          tag(S.xs(29), S.ys(4642) + 20, 'OTE 4,642–4,676', C.amber, { anchor: 'end', op: c.p([4, 0]), fs: 14 });
      } },
    b: { data: gen([[0, 4760], [4, 4800], [18, 4600], [26, 4748], [29, 4700]], 104), pmin: 4560, pmax: 4840, step: 50, slots: 37, reveal: [3, 0], revealDur: 3, show: [3, 0], title: 'BEARISH LEG · HYPOTHETICAL', tag: 'ANCHOR HIGH → LOW',
      ov: (S, c) => {
        const d = c.p([3, 2], 1.5), x0 = S.xs(4), y0 = S.ys(4800), x1 = S.xs(18), y1 = S.ys(4600);
        return `<line x1="${x0}" y1="${y0}" x2="${x0 + (x1 - x0) * d}" y2="${y0 + (y1 - y0) * d}" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>` +
          dot(x0, y0, C.bear, c.p([3, 1]), 8) + dot(x1, y1, C.bull, c.p([3, 3]), 8) +
          tag(x0, y0 - 30, 'START · 1 · 4,800', C.bear, { op: c.p([3, 1]), fs: 13 }) + tag(x1, y1 + 30, 'END · 0 · 4,600', C.bull, { op: c.p([3, 3]), fs: 13 }) +
          T.fibOv(S, 4800, 4600, 4, 29, c.p([3, 4], .8), [0, .5, .62, .705, .79, 1], { noLabel: true }) +
          tag(S.xs(29), S.ys(4758) - 20, 'OTE 4,724–4,758', C.amber, { anchor: 'end', op: c.p([4, 0]), fs: 14 });
      } },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([5, 0])}"><b>Platform orientation:</b> with 0 at the leg start, the same zone reads <b>0.21–0.38</b>. Labels change; the price zone does not. Never swap bullish and bearish anchors.</div>`
  }));

  /* 5.4 bullish OTE example */
  const BS = [4665, 4590, 4800];
  scenes.push(T.chart({
    label: '5.4 · BULLISH OTE EXAMPLE',
    lines: [
      ['Sekarang contoh OTE bullish yang lengkap, dalam sembilan langkah.', 'Now a complete bullish OTE example, in nine steps.'],
      ['Satu: harga membentuk low yang bermakna di 4,600. Dua: harga membuat leg displacement bullish, meninggalkan fair value gap, hingga ke 4,800.',
        'One: price establishes a meaningful low at 4,600. Two: price makes a bullish displacement leg, leaving a fair value gap, up to 4,800.'],
      ['Tiga: kenal pasti swing low 4,600 dan swing high 4,800. Empat: tarik Fibonacci dari low ke high, mengikut konvensyen bullish.',
        'Three: identify the 4,600 swing low and the 4,800 swing high. Four: apply Fibonacci from the low to the high, using the bullish convention.'],
      ['Lima: tandakan zon 62 hingga 79 peratus, iaitu 4,642 hingga 4,676.', 'Five: highlight the 62 to 79 percent zone, 4,642 to 4,676.'],
      ['Enam: harga retrace ke dalam zon, ke sekitar 4,650. Tujuh: zon ini bertindih dengan fair value gap bullish, 4,645 hingga 4,668, iaitu PD Array yang berpotensi.',
        'Six: price retraces into the zone, to around 4,650. Seven: the zone overlaps the bullish fair value gap, 4,645 to 4,668, a potential PD Array.'],
      ['Lapan: tunggu confirmation lower timeframe. Di sini, harga membentuk bullish shift dan close di atas 4,660.', 'Eight: wait for lower timeframe confirmation. Here, price forms a bullish shift and closes back above 4,660.'],
      ['Sembilan: rancang execution. Entry ilustrasi di 4,665. Invalidation di bawah permulaan leg, 4,590. Target pertama, high 4,800 di mana buy-side liquidity berada.',
        'Nine: plan the execution. An illustrative entry at 4,665. Invalidation below the start of the leg, 4,590. First target, the 4,800 high where buy-side liquidity rests.'],
      ['Risiko 75 mata untuk potensi 135 mata, kira-kira 1 kepada 1.8. Ini satu rancangan, bukan keputusan yang dijamin.', 'Risk 75 points for a potential 135 points, about 1 to 1.8. This is a plan, not a guaranteed outcome.']
    ],
    chart: {
      data: D_bu, pmin: 4560, pmax: 4840, step: 50, slots: 52, tag: 'BULLISH OTE · ILLUSTRATIVE',
      n: c => 3 + 18 * P(c.t, c.at([1, 0]), 5) + 9 * P(c.t, c.at([4, 0]), 3) + 4 * P(c.t, c.at([5, 0]), 2) + 9 * P(c.t, c.at([7, 2]), 3),
      under: (S, c) => ovl.zone(S, 4645, 4668, 9, 36, C.bull, { alpha: .14, op: c.p([4, 4]), stroke: true }) +
        ovl.zone(S, BS[1], BS[0], 33, 39, C.bear, { alpha: .18, op: c.p([6, 0]) }) + ovl.zone(S, BS[0], BS[2], 33, 39, C.bull, { alpha: .16, op: c.p([6, 0]) }),
      ov: (S, c) => dot(S.xs(4), S.ys(4600), C.bull, c.p([1, 0]), 8) + dot(S.xs(20), S.ys(4800), C.bear, c.p([2, 0]), 8) +
        T.fibOv(S, 4600, 4800, 4, 43, c.p([3, 0], .8), [0, .5, .62, .705, .79, 1]) +
        tag(S.xs(14), S.ys(4668) - 16, 'BULLISH FVG', C.bull, { anchor: 'start', op: c.p([4, 4]), fs: 13 }) +
        tag(S.xs(31), S.ys(4705) - 4, 'LTF SHIFT ✓', C.bull, { op: c.p([5, 1]), fs: 13 }) +
        ovl.hl(S, BS[0], 33, 39, '#fff', { op: c.p([6, 0]) }) + tag(S.xs(39), S.ys(BS[0]) - 14, 'ENTRY 4,665', '#ffffff', { anchor: 'end', op: c.p([6, 0]), fs: 13 }) +
        tag(S.xs(39), S.ys(BS[1]) - 14, 'STOP 4,590', C.bear, { anchor: 'end', op: c.p([6, 3]), fs: 13 }) + tag(S.xs(39), S.ys(BS[2]) + 16, 'TARGET 4,800', C.cyan, { anchor: 'end', op: c.p([6, 6]), fs: 13 })
    },
    side: {
      kicker: 'SUBTOPIC ④ · 5.4', title: 'Bullish OTE',
      items: [[[1, 0], '①② Meaningful low + displacement'], [[2, 0], '③④ Anchor low → high'], [[3, 0], '⑤ OTE 4,642–4,676'], [[4, 0], '⑥⑦ Retrace + PD Array overlap'], [[5, 0], '⑧ LTF confirmation'], [[6, 0], '⑨ Entry · invalidation · target']],
      foot: c => `<div class="mono" style="margin-top:4px;font-size:19px;color:#e8ecf4;opacity:${c.p([7, 0])}">Risk 75 : Reward 135 ≈ <span style="color:#25a198">1 : 1.8</span></div>`
    }
  }));

  /* 5.5 bearish OTE example */
  scenes.push(T.chart({
    label: '5.5 · BEARISH OTE EXAMPLE',
    lines: [
      ['Contoh bearish mengikut proses yang sama, dalam arah bertentangan.', 'The bearish example follows the same process in the opposite direction.'],
      ['Harga membentuk high yang bermakna di 4,800, kemudian leg displacement bearish turun ke 4,600, meninggalkan fair value gap bearish.',
        'Price establishes a meaningful high at 4,800, then a bearish displacement leg falls to 4,600, leaving a bearish fair value gap.'],
      ['Tarik Fibonacci dari high 4,800 ke low 4,600. Zon OTE ialah 4,724 hingga 4,758.', 'Draw Fibonacci from the 4,800 high to the 4,600 low. The OTE zone is 4,724 to 4,758.'],
      ['Harga retrace ke atas ke sekitar 4,750, ke dalam zon yang bertindih dengan fair value gap bearish, 4,732 hingga 4,755.',
        'Price retraces up to around 4,750, into the zone that overlaps the bearish fair value gap, 4,732 to 4,755.'],
      ['Selepas bearish shift pada lower timeframe, entry ilustrasi di 4,735, invalidation di atas permulaan leg, 4,810, dan target low 4,600 di mana sell-side liquidity berada.',
        'After a lower timeframe bearish shift, an illustrative entry at 4,735, invalidation above the leg start at 4,810, and a target at the 4,600 low where sell-side liquidity rests.']
    ],
    chart: {
      data: D_be, pmin: 4560, pmax: 4840, step: 50, slots: 52, tag: 'BEARISH OTE · ILLUSTRATIVE',
      n: c => 3 + 18 * P(c.t, c.at([1, 0]), 5) + 13 * P(c.t, c.at([3, 0]), 3) + 9 * P(c.t, c.at([4, 3]), 3),
      under: (S, c) => ovl.zone(S, 4732, 4755, 9, 36, C.bear, { alpha: .14, op: c.p([3, 2]), stroke: true }) +
        ovl.zone(S, 4735, 4810, 33, 39, C.bear, { alpha: .18, op: c.p([4, 0]) }) + ovl.zone(S, 4600, 4735, 33, 39, C.bull, { alpha: .16, op: c.p([4, 0]) }),
      ov: (S, c) => T.fibOv(S, 4800, 4600, 4, 43, c.p([2, 0], .8), [0, .5, .62, .705, .79, 1]) +
        tag(S.xs(14), S.ys(4732) + 16, 'BEARISH FVG', C.bear, { anchor: 'start', op: c.p([3, 2]), fs: 13 }) +
        ovl.hl(S, 4735, 33, 39, '#fff', { op: c.p([4, 0]) }) + tag(S.xs(39), S.ys(4735) + 14, 'ENTRY 4,735', '#ffffff', { anchor: 'end', op: c.p([4, 0]), fs: 13 }) +
        tag(S.xs(39), S.ys(4810) + 14, 'STOP 4,810', C.bear, { anchor: 'end', op: c.p([4, 3]), fs: 13 }) + tag(S.xs(39), S.ys(4600) - 16, 'TARGET 4,600', C.cyan, { anchor: 'end', op: c.p([4, 6]), fs: 13 })
    },
    side: { kicker: 'SUBTOPIC ④ · 5.5', title: 'Bearish OTE', items: [[[1, 0], 'Meaningful high + bearish displacement'], [[2, 0], 'Anchor high → low'], [[2, 2], 'OTE 4,724–4,758'], [[3, 0], 'Retrace + bearish FVG overlap'], [[4, 0], 'Confirmation, then plan']],
      foot: c => `<div class="mono" style="margin-top:4px;font-size:19px;color:#e8ecf4;opacity:${c.p([4, 4])}">Risk 75 : Reward 135 ≈ <span style="color:#25a198">1 : 1.8</span></div>` }
  }));

  /* 5.6 confluence */
  scenes.push(T.cards({
    label: '5.6 · OTE WITH CONFLUENCE', kicker: 'SUBTOPIC ④ · 5.6', title: 'OTE with confluence',
    lines: [
      ['OTE sering digabungkan dengan faktor lain: lokasi premium atau discount, order block, fair value gap, liquidity, dan confirmation struktur.',
        'OTE is often combined with other factors: premium or discount location, order blocks, fair value gaps, liquidity, and structural confirmation.'],
      ['Tetapi perhatikan satu perkara. Zon OTE bullish, 62 hingga 79 peratus, sentiasa berada di bawah 50 peratus leg yang sama. Jadi ia sentiasa di discount leg itu.',
        'But notice one thing. A bullish OTE zone, 62 to 79 percent, always sits below 50 percent of the same leg. So it is always in that leg\'s discount.'],
      ['Ini bermakna OTE dan discount daripada leg yang sama bukan dua bukti bebas. Ia satu bacaan lokasi yang sama.',
        'This means OTE and discount from the same leg are not two independent pieces of evidence. They are one location reading.'],
      ['Bukti yang lebih bebas ialah PD Array yang terbentuk daripada displacement, konteks liquidity, dan confirmation struktur pada lower timeframe.',
        'More independent evidence comes from a PD Array formed by displacement, liquidity context, and lower timeframe structural confirmation.'],
      ['Tindihan boleh menguatkan hujah analitikal, tetapi ia tidak menjamin tindak balas harga.', 'Overlap may strengthen the analytical case, but it does not guarantee a price reaction.']
    ],
    cards: [
      { x: 60, y: 210, w: 880, h: 300, at: [1, 0], col: '#f0a03a', kick: 'SAME SOURCE', head: 'OTE + Discount = one location reading', body: 'Bullish OTE (62–79%) of a leg is always below that leg\'s 50%. Counting both as separate confirmations is double-counting.' },
      { x: 980, y: 210, w: 880, h: 300, at: [3, 0], col: '#25a198', kick: 'MORE INDEPENDENT', head: 'PD Array · Liquidity · LTF confirmation', body: 'These come from different observations: a displacement footprint, where stops rest, and how price actually behaves.' }
    ],
    warn: { at: [4, 0], y: 560, s: '<b>Overlap ≠ guarantee.</b> Confluence may strengthen the analytical case; it never guarantees a reaction.' }
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ④ · 5.7', title: 'Common OTE mistakes', rowH: 140,
    lines: [
      ['Kesilapan biasa dengan OTE:', 'Common OTE mistakes:'],
      ['Anchor Fibonacci yang salah. Menggunakan OTE pada price leg yang tidak relevan. Dan menganggap 70.5 peratus sebagai aras ajaib.',
        'Incorrect Fibonacci anchoring. Applying OTE to an irrelevant price leg. And treating 70.5 percent as a magical price level.'],
      ['Entry secara automatik apabila harga menyentuh zon. Mengabaikan arah pasaran. Mengabaikan liquidity dan confirmation struktur.',
        'Entering automatically when price touches the zone. Ignoring market direction. Ignoring liquidity and structural confirmation.'],
      ['Dan memilih impulse leg selepas kejadian, semata-mata supaya zon OTE kelihatan sempurna.', 'And selecting the impulse leg after the fact, just to make an OTE zone look perfect.']
    ],
    items: [
      [[1, 0], 'Incorrect anchoring', 'Swapped bullish/bearish anchors put the zone on the wrong side.'], [[1, 3], 'Irrelevant price leg', 'OTE on a minor wiggle is not a meaningful retracement.'],
      [[1, 5.5], '70.5% treated as magic', 'It is a midpoint reference, not a level price must hit.'], [[2, 0], 'Automatic entry on touch', 'A touch is location, not confirmation.'],
      [[2, 3], 'Ignoring market direction', 'Bullish OTE inside a bearish structure is a weak case.'], [[2, 5], 'Ignoring liquidity &amp; confirmation', 'Without them, the zone is only a hypothesis.'],
      [[3, 0], 'Selecting the leg in hindsight', 'Choosing the leg that "fits" after the reaction is curve-fitting.']
    ]
  }));

  scenes.push(T.summary({
    title: 'Fibonacci OTE',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['OTE ialah zon retracement 62 hingga 79 peratus pada leg yang dipilih, dengan 70.5 peratus sebagai rujukan tengah.', 'OTE is the 62 to 79 percent retracement zone of a selected leg, with 70.5 percent as the midpoint reference.'],
      ['Anchor bullish dari low ke high, bearish dari high ke low. Kekalkan satu konvensyen.', 'Anchor bullish legs from low to high, bearish legs from high to low. Keep one convention.'],
      ['OTE dan discount dari leg yang sama ialah satu bacaan. Dan OTE ialah lokasi, bukan isyarat.', 'OTE and discount from the same leg are one reading. And OTE is location, not a signal.']
    ],
    items: [[[1, 0], 'OTE: 62–79% retracement'], [[1, 3], '70.5% = midpoint reference'], [[2, 0], 'Bullish: low → high'], [[2, 2], 'Bearish: high → low'],
      [[3, 0], 'OTE + discount (same leg) = one reading'], [[3, 3], 'Location, not a signal']]
  }));

  scenes.push(T.quiz([
    ['What is the commonly referenced ICT OTE retracement range?', '62% to 79% of the selected leg, with 70.5% often used as the midpoint reference.',
      'apakah julat retracement OTE ICT yang biasa dirujuk?', '62 hingga 79 peratus daripada leg yang dipilih, dengan 70.5 peratus sering digunakan sebagai rujukan tengah.'],
    ['Bullish leg 4,520 → 4,880. Calculate the 0.62 and 0.79 levels.', 'Range 360. 0.62: 4,880 − 223.2 = 4,656.8. 0.79: 4,880 − 284.4 = 4,595.6. OTE ≈ 4,595.6 – 4,656.8.',
      'leg bullish 4,520 ke 4,880. Kira aras 0.62 dan 0.79.', 'jarak 360. 0.62: 4,880 tolak 223.2 ialah 4,656.8. 0.79: 4,880 tolak 284.4 ialah 4,595.6.',
      'A bullish leg runs from 4,520 to 4,880. Calculate the 0.62 and 0.79 levels.', 'The range is 360. For 0.62, 4,880 minus 223.2 is 4,656.8. For 0.79, 4,880 minus 284.4 is 4,595.6.'],
    ['Where do you anchor Fibonacci for a bearish leg, in this series convention?', 'From the swing high (start, 1) to the swing low (end, 0). The OTE zone is then above the low, measured upward.',
      'di mana anda anchor Fibonacci untuk leg bearish, dalam konvensyen siri ini?', 'dari swing high, iaitu permulaan dan nilai 1, ke swing low, iaitu penghujung dan nilai 0. Zon OTE kemudian diukur ke atas.'],
    ['Why are "in OTE" and "in discount" from the same leg not two confluences?', 'A bullish 62–79% retracement is always below that leg\'s 50%. Both readings come from the same range, so they are one piece of location evidence.',
      'mengapa "dalam OTE" dan "dalam discount" daripada leg yang sama bukan dua confluence?', 'retracement bullish 62 hingga 79 peratus sentiasa di bawah 50 peratus leg itu. Kedua-dua bacaan datang daripada range yang sama, jadi ia satu bukti lokasi.'],
    ['Price touches the 70.5% level. Should you enter?', 'Not automatically. A touch is location only. Look for a relevant PD Array, liquidity context, and lower timeframe confirmation first.',
      'harga menyentuh aras 70.5 peratus. Patutkah anda entry?', 'tidak secara automatik. Sentuhan hanya lokasi. Cari PD Array yang relevan, konteks liquidity, dan confirmation lower timeframe dahulu.']
  ]));

  scenes.push(T.exercise({
    title: 'Apply Fibonacci correctly',
    lines: [
      ['Latihan praktikal: pilih satu impulse leg yang bermakna pada carta anda, bullish dan bearish.', 'Practical exercise: choose one meaningful impulse leg on your chart, one bullish and one bearish.'],
      ['Tarik Fibonacci mengikut konvensyen siri ini, kira aras 0.62, 0.705 dan 0.79 secara manual, dan bandingkan dengan platform.', 'Apply Fibonacci using the series convention, calculate 0.62, 0.705 and 0.79 by hand, and compare with your platform.'],
      ['Kemudian catat sama ada zon itu bertindih dengan PD Array, dan sama ada harga memberi confirmation.', 'Then record whether the zone overlaps a PD Array, and whether price gave confirmation.']
    ],
    steps: [[[1, 0], 'Select one bullish and one bearish impulse leg'], [[1, 2], 'Anchor: bullish low → high, bearish high → low'], [[1, 4], 'Calculate 0.62 / 0.705 / 0.79 by hand and compare'],
      [[2, 0], 'Check overlap with a PD Array formed by displacement'], [[2, 3], 'Record confirmation, or the absence of it']]
  }));

  scenes.push(T.next({
    no: '06', short: 'Order Block', kicker: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Order Block — identification and context',
    lines: [['Dalam video seterusnya, kita memulakan PD Arrays dengan Order Block: cara mengenal pasti, konteks, dan contoh yang lemah.',
      'In the next video, we begin the PD Arrays with the Order Block: identification, context, and weak examples.']],
    html: (t) => `<div class="a" style="left:0;width:1200px;text-align:center;top:170px;font-size:56px;font-weight:700;opacity:${P(t, .5, .6)}">PD Arrays</div>
      <div class="a mono" style="left:0;width:1200px;text-align:center;top:260px;font-size:20px;color:#8a93a8;letter-spacing:3px;opacity:${P(t, 1.5, .6)}">OB · BREAKER · MITIGATION · REJECTION · FVG · IFVG · VOID · OLD H/L</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy'], 'OTE ialah istilah ICT. Nisbah Fibonacci dan retracement dibincangkan dalam analisis teknikal konvensional.',
    'OTE is an ICT term. Fibonacci ratios and retracements are discussed in conventional technical analysis.', 'OTE (62–79%) is ICT-specific; Fibonacci retracement in general is covered in conventional technical analysis literature.'));
  scenes.push(T.disclaimer('06', 'Order Block'));
  registerVideo({ id: 'v05', title: 'VIDEO 05 — FIBONACCI OTE', scenes });
})();
