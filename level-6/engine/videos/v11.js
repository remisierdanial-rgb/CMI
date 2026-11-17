/* VIDEO 11 — PD Array Comparison, Selection & Prioritisation. Illustrative FCPO-style prices only. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  const D = T.patch(T.patch(gen([[0, 4640], [4, 4600], [7, 4636], [14, 4745], [16, 4732], [20, 4800], [24, 4758], [26, 4772], [30, 4690], [34, 4650], [42, 4762]], 161), 8,
    [[4640, 4644, 4624, 4628]]), 9, [[0, 4645, 4626, 4642], [0, 4694, 4640, 4690], [0, 4708, 4668, 4702]]);
  // candidate zones: [lo, hi, i0, colour, label, removedAtLine (null = kept), reason]
  const Z = [
    [4628, 4640, 8, C.bull, 'BULLISH OB', null],
    [4645, 4668, 9, C.bull, 'BULLISH FVG', null],
    [4712, 4716, 28, C.mute, 'LTF 1M FVG', 2, 'NOT HTF-RELEVANT'],
    [4703, 4710, 13, C.mute, 'MID-RANGE WICK', 2, 'NO SWING EXTREME'],
    [4762, 4774, 24, C.bear, 'BEARISH FVG', 3, 'AGAINST DIRECTION'],
    [4738, 4750, 15, C.bull, 'BULLISH OB IN PREMIUM', 4, 'WRONG LOCATION'],
    [4688, 4698, 12, C.bull, 'BULLISH FVG · CLOSED THROUGH', 5, 'ALREADY INVALIDATED']
  ];
  const scenes = [];

  scenes.push(T.title({
    no: '11', sub: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'PD Array Selection', tagline: 'Comparison and prioritisation',
    objectives: ['Compare all eight PD Array types', 'Apply seven selection criteria', 'Filter a cluttered chart', 'Avoid counting one event twice'],
    lines: [
      ['Selamat kembali. Video 11 menutup subtopik PD Arrays dengan soalan praktikal: daripada semua zon ini, yang mana relevan?', 'Welcome back. Video 11 closes the PD Arrays subtopic with a practical question: of all these zones, which ones are relevant?'],
      ['Kita akan membandingkan lapan jenis PD Array, menggunakan tujuh kriteria pemilihan, dan menapis carta yang terlalu penuh.', 'We will compare the eight PD Array types, apply seven selection criteria, and filter an over-marked chart.'],
      ['Matlamatnya bukan mencari lebih banyak zon, tetapi memilih satu atau dua yang benar-benar bermakna.', 'The goal is not to find more zones, but to choose the one or two that truly matter.']
    ],
    illus: (t, L) => {
      const b = P(t, L[1], 1.2), X = 1140;
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<rect x="${X + 20 + (k % 3) * 40}" y="${420 + k * 34}" width="${560 - (k % 3) * 40}" height="22" fill="${k === 4 ? C.bull : C.mute}" opacity="${k === 4 ? .5 : .35 * (1 - b * .8)}"/>`).join('') +
        txt(X + 660, 420 + 4 * 34 + 17, 'SELECTED', { anchor: 'end', col: C.bull, fs: 15, fw: 700, op: b });
    }
  }));

  const ROWS = [
    ['Order Block', 'Last opposing candle before displacement + BOS', 'Candle structure'],
    ['Breaker Block', 'Failed OB after a liquidity sweep, role reversed', 'Failed structure'],
    ['Mitigation Block', 'Failure swing (no sweep), then close beyond B', 'Failed structure'],
    ['Rejection Block', 'Body-to-wick zone at a meaningful extreme', 'Wick structure'],
    ['Fair Value Gap', 'Three-candle imbalance', 'Imbalance'],
    ['Inverse FVG', 'FVG closed through, role inverted', 'Imbalance'],
    ['Liquidity Void', 'Multi-candle inefficient delivery', 'Imbalance (visual)'],
    ['Old High / Low', 'Prior extremes; liquidity references', 'Reference level']
  ];
  scenes.push(T.cards({
    label: '6.10 · COMPARING PD ARRAYS', kicker: 'SUBTOPIC ⑤ · 6.10', title: 'Comparing the PD Array types',
    lines: [
      ['Inilah lapan PD Array yang telah kita pelajari, dengan apa yang perlu dikenal pasti untuk setiap satu.', 'Here are the eight PD Arrays we have studied, with what to identify for each one.'],
      ['Perhatikan lajur terakhir. Ia tidak sama sifatnya. Ada yang berasaskan struktur candle, ada berasaskan struktur yang gagal, ada berasaskan imbalance, dan ada yang hanya aras rujukan.',
        'Notice the last column. They are not the same in nature. Some are based on candle structure, some on failed structure, some on imbalance, and some are only reference levels.'],
      ['Jadi jangan anggap semuanya mempunyai definisi, mekanisme pembentukan, atau nilai bukti yang sama.', 'So do not assume they all share the same definition, formation mechanism, or evidential weight.']
    ],
    cards: ROWS.map((r, k) => ({
      x: 60, y: 196 + k * 72, w: 1800, h: 62, at: [0, .5 + k * .5],
      html: c => `<div class="a" style="left:24px;top:16px;font-size:23px;font-weight:700;width:300px">${r[0]}</div><div class="a" style="left:340px;top:18px;font-size:20px;color:#c7cede">${r[1]}</div>
        <div class="a mono" style="right:24px;top:20px;font-size:15px;letter-spacing:1.5px;color:#d7b256;opacity:${c.p([1, 1 + k * .4])}">${r[2].toUpperCase()}</div>`
    })),
    warn: { at: [2, 0], y: 790, s: '<b>Not interchangeable:</b> different definitions, formation mechanisms and evidential status.' }
  }));

  scenes.push(T.cards({
    label: '6.11 · SELECTION CRITERIA', kicker: 'SUBTOPIC ⑤ · 6.11', title: 'Seven selection criteria',
    lines: [
      ['Untuk memilih PD Array yang relevan, nilai tujuh kriteria ini.', 'To select a relevant PD Array, assess these seven criteria.'],
      ['Satu, relevan pada higher timeframe. Dua, selari dengan arah pasaran. Tiga, berada di lokasi premium atau discount yang betul.', 'One, higher timeframe relevance. Two, alignment with market direction. Three, the correct premium or discount location.'],
      ['Empat, konteks liquidity. Lima, terbentuk daripada displacement. Enam, disokong oleh confirmation struktur.', 'Four, liquidity context. Five, formed by displacement. Six, supported by structural confirmation.'],
      ['Dan tujuh, belum invalidated atau ditembusi secara bermakna.', 'And seven, not already invalidated or meaningfully traded through.']
    ],
    cards: ['Higher timeframe relevance', 'Aligned with market direction', 'Correct premium/discount location', 'Liquidity context', 'Formed by displacement', 'Structural confirmation', 'Not already invalidated'].map((s, k) => ({
      x: 60 + (k % 2) * 910, y: 210 + Math.floor(k / 2) * 120, w: 890, h: 100, at: [[1, 1, 1, 2, 2, 2, 3][k], [0, 2, 4, 0, 2, 4, 0][k]],
      html: () => `<div class="a mono" style="left:26px;top:30px;font-size:26px;color:#d7b256;font-weight:700">${k + 1}</div><div class="a" style="left:80px;top:32px;font-size:26px;font-weight:600">${s}</div>`
    }))
  }));

  scenes.push(T.chart({
    label: '6.11 · FILTERING A CLUTTERED CHART',
    lines: [
      ['Sekarang praktik. Carta ilustrasi ini mempunyai tujuh zon calon, ditambah old high dan old low. Inilah rupa carta yang terlalu penuh.',
        'Now practice. This illustrative chart has seven candidate zones, plus an old high and an old low. This is what an over-marked chart looks like.'],
      ['Konteks: range bullish 4,600 hingga 4,800, equilibrium 4,700. Kita mencari kawasan bullish di discount.', 'Context: a bullish range from 4,600 to 4,800, equilibrium 4,700. We are looking for a bullish area in discount.'],
      ['Tapisan satu, relevan pada higher timeframe: buang FVG satu minit yang kecil, dan wick di tengah range yang bukan swing extreme.',
        'Filter one, higher timeframe relevance: remove the small one-minute FVG, and the mid-range wick that is not a swing extreme.'],
      ['Tapisan dua, arah: struktur bullish, jadi buang fair value gap bearish.', 'Filter two, direction: structure is bullish, so remove the bearish fair value gap.'],
      ['Tapisan tiga, lokasi: buang order block bullish yang berada di premium.', 'Filter three, location: remove the bullish order block that sits in premium.'],
      ['Tapisan empat, invalidation: buang FVG bullish yang telah ditembusi dengan close semasa pullback.', 'Filter four, invalidation: remove the bullish FVG that was already closed through during the pullback.'],
      ['Yang tinggal: order block bullish dan FVG bullish di discount, kedua-duanya daripada displacement yang memecahkan struktur. Sell-side liquidity di 4,600 di bawahnya, dan buy-side di atas 4,800 sebagai objektif.',
        'What remains: a bullish order block and a bullish FVG in discount, both from the displacement that broke structure. Sell-side liquidity at 4,600 below, and buy-side above 4,800 as the objective.'],
      ['Perhatikan: OB dan FVG ini datang daripada displacement yang sama. Ia satu kawasan minat, 4,628 hingga 4,668, bukan dua bukti bebas.',
        'Notice: this OB and FVG come from the same displacement. They form one area of interest, 4,628 to 4,668, not two independent pieces of evidence.']
    ],
    chart: {
      data: D, pmin: 4570, pmax: 4830, step: 50, slots: 46, reveal: [0, 0], revealDur: 3, tag: 'SEVEN ZONES → ONE AREA',
      under: (S, c) => T.pdZones(S, 4800, 4600, 4, c.p([1, 0]) * .8, { noLabel: true }) +
        Z.map(z => { const rm = z[5] == null ? 0 : c.p([z[5], 0]); const keepGlow = z[5] == null ? c.p([6, 0]) : 0;
          return ovl.zone(S, z[0], z[1], z[2] - .4, 44, z[3], { alpha: .2 + .1 * keepGlow, op: c.p([0, 2]) * (1 - .85 * rm), stroke: true }); }).join(''),
      ov: (S, c) => ovl.hl(S, 4800, 20, 44, C.cyan, { dash: '6 5', op: c.p([0, 3]) }) + ovl.hl(S, 4600, 4, 44, C.cyan, { dash: '6 5', op: c.p([0, 3]) }) +
        tag(S.xs(44), S.ys(4800) - 18, 'OLD HIGH · BSL', C.cyan, { anchor: 'end', op: c.p([0, 3]), fs: 12 }) + tag(S.xs(44), S.ys(4600) + 18, 'OLD LOW · SSL', C.cyan, { anchor: 'end', op: c.p([0, 3]), fs: 12 }) +
        Z.map((z, k) => { const rm = z[5] == null ? 0 : c.p([z[5], 0]); const y = S.ys((z[0] + z[1]) / 2);
          return tag(S.xs(44) - (k % 2) * 200, y, z[4], z[3] === C.mute ? C.mute : z[3], { anchor: 'end', op: c.p([0, 2]) * (1 - .85 * rm), fs: 11 }) +
            (z[5] != null ? tag(S.xs(44) - (k % 2) * 200 - 210, y, '✗ ' + z[6], C.bear, { anchor: 'end', op: rm * (1 - c.p([6, 0])), fs: 11 }) : ''); }).join('') +
        ovl.zone(S, 4628, 4668, 7.4, 44, C.gold, { alpha: 0, op: c.p([7, 0]), stroke: true, dash: '7 4' }) + tag(S.xs(30), S.ys(4628) + 22, 'ONE AREA OF INTEREST 4,628–4,668', C.gold, { op: c.p([7, 0]), fs: 13 })
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.11', title: 'Filter step by step', items: [[[2, 0], '① HTF relevance'], [[3, 0], '② Market direction'], [[4, 0], '③ Premium/discount location'], [[5, 0], '④ Not invalidated'], [[6, 0], '⑤ Displacement + liquidity'], [[7, 0], 'Same event → one area', 'g']] }
  }));

  scenes.push(T.cards({
    label: '6.11 · ON PRIORITY ORDERS', kicker: 'SUBTOPIC ⑤ · 6.11', title: 'Is there an official priority order?',
    lines: [
      ['Soalan biasa: adakah terdapat susunan keutamaan rasmi antara PD Arrays?', 'A common question: is there an official priority order among PD Arrays?'],
      ['Bahan ICT membincangkan susunan PD Arrays dalam bentuk matrix. Tetapi susunan khusus berbeza mengikut sumber dan konteks, dan kami belum mengesahkan satu versi rasmi.',
        'ICT material discusses arranging PD Arrays as a matrix. But the specific ordering varies by source and context, and we have not verified one official version.'],
      ['Jadi dalam siri ini, kita tidak memaparkan susunan tetap. Kita menggunakan tujuh kriteria tadi untuk menilai setiap zon dalam konteksnya.', 'So in this series, we do not present a fixed ranking. We use the seven criteria to assess each zone in its context.']
    ],
    cards: [
      { x: 60, y: 220, w: 880, h: 330, at: [1, 0], col: '#e0913a', kick: 'REQUIRES VERIFICATION', head: 'No fixed ranking presented', body: 'Orderings of a "PD array matrix" vary between sources. We do not present one as official.' },
      { x: 980, y: 220, w: 880, h: 330, at: [2, 0], col: '#25a198', kick: 'CMI APPROACH', head: 'Context-based assessment', body: 'Each zone is judged against the seven criteria: relevance, direction, location, liquidity, displacement, confirmation, validity.' }
    ]
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ⑤ · 6.12', title: 'Common PD Array mistakes', rowH: 128,
    lines: [
      ['Kesilapan biasa merentas semua PD Arrays:', 'Common mistakes across all PD Arrays:'],
      ['Menandakan setiap candle sebagai order block. Menganggap setiap FVG boleh didagangkan. Mengelirukan IFVG dengan FVG yang diisi. Menganggap setiap wick sebagai rejection block.',
        'Marking every candle as an order block. Treating every FVG as tradable. Confusing an IFVG with a filled FVG. Treating every wick as a rejection block.'],
      ['Mengelirukan liquidity void dengan FVG. Menganggap old high atau low sebagai zon reversal yang pasti. Menggunakan terlalu banyak zon yang bertindih. Dan mengabaikan relevan timeframe.',
        'Confusing a liquidity void with an FVG. Treating old highs or lows as guaranteed reversal zones. Using too many overlapping zones. And ignoring timeframe relevance.']
    ],
    items: [[[1, 0], 'Every candle = order block', 'Needs displacement + BOS.'], [[1, 2.5], 'Every FVG is tradable', 'Location and confirmation decide.'], [[1, 5], 'IFVG = filled FVG', 'IFVG needs a body close through.'],
      [[1, 7.5], 'Every wick = rejection block', 'Needs a meaningful extreme.'], [[2, 0], 'Void = FVG', 'A void spans a multi-candle leg.'], [[2, 3], 'Old H/L = guaranteed reversal', 'Often a target that gets taken.'],
      [[2, 6], 'Too many overlapping zones', 'Clutter hides the real decision.'], [[2, 8], 'Ignoring timeframe relevance', 'A 1M zone rarely matters on 1H.']]
  }));

  scenes.push(T.summary({
    title: 'PD Array Selection',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Lapan PD Arrays berbeza dari segi definisi, pembentukan, dan nilai bukti.', 'The eight PD Arrays differ in definition, formation and evidential weight.'],
      ['Pilih zon menggunakan tujuh kriteria, dan tapis carta sehingga tinggal satu atau dua kawasan.', 'Select zones with the seven criteria, and filter the chart down to one or two areas.'],
      ['Zon daripada peristiwa harga yang sama ialah satu kawasan, bukan bukti berganda. Tiada susunan keutamaan rasmi dipaparkan.', 'Zones from the same price event are one area, not multiple evidence. No official priority order is presented.']
    ],
    items: [[[1, 0], 'Eight types, different nature'], [[2, 0], 'Seven selection criteria'], [[2, 2.5], 'Filter to one or two areas'], [[3, 0], 'Same event = one area'], [[3, 3], 'No fixed official ranking'], [[3, 4], 'Context decides']]
  }));

  scenes.push(T.quiz([
    ['Name the seven PD Array selection criteria.', 'HTF relevance, market direction, premium/discount location, liquidity context, displacement, structural confirmation, and not already invalidated.',
      'namakan tujuh kriteria pemilihan PD Array.', 'relevan higher timeframe, arah pasaran, lokasi premium atau discount, konteks liquidity, displacement, confirmation struktur, dan belum invalidated.'],
    ['Bullish context. A bullish OB sits in premium of the HTF range. Keep or remove?', 'Usually remove or deprioritise: it is in the wrong location for a bullish setup within that range.',
      'konteks bullish. Order block bullish berada di premium range HTF. Kekalkan atau buang?', 'biasanya buang atau kurangkan keutamaan: ia berada di lokasi yang salah untuk setup bullish dalam range itu.',
      'In bullish context, a bullish order block sits in the premium of the higher timeframe range. Keep or remove?', 'Usually remove or deprioritise it: it is in the wrong location for a bullish setup within that range.'],
    ['An OB and an FVG were formed by the same displacement. How many confluences is that?', 'One area of interest. They describe the same price event, so they are not two independent pieces of evidence.',
      'order block dan FVG terbentuk daripada displacement yang sama. Berapa confluence itu?', 'satu kawasan minat. Kedua-duanya menerangkan peristiwa harga yang sama, jadi bukan dua bukti bebas.'],
    ['Why does this series not present an official PD array priority order?', 'Orderings vary by source and context and could not be verified as official. Zones are assessed with the criteria instead.',
      'mengapa siri ini tidak memaparkan susunan keutamaan PD Array yang rasmi?', 'susunannya berbeza mengikut sumber dan konteks, dan tidak dapat disahkan sebagai rasmi. Setiap zon dinilai menggunakan kriteria.']
  ]));

  scenes.push(T.exercise({
    title: 'Filter your own chart',
    lines: [
      ['Latihan praktikal: tandakan setiap PD Array yang anda nampak pada carta satu jam anda.', 'Practical exercise: mark every PD Array you can see on your one-hour chart.'],
      ['Kemudian gunakan tujuh kriteria satu demi satu, dan padamkan zon yang gagal. Catat sebab bagi setiap pemadaman.', 'Then apply the seven criteria one by one, and delete the zones that fail. Record the reason for each deletion.'],
      ['Akhirnya, gabungkan zon yang datang daripada peristiwa yang sama. Berapa kawasan yang tinggal?', 'Finally, merge zones that come from the same event. How many areas remain?']
    ],
    steps: [[[1, 0], 'Mark every PD Array you see'], [[1, 2.5], 'Apply the seven criteria one at a time'], [[1, 5], 'Delete failing zones and record why'], [[2, 0], 'Merge zones from the same event'], [[2, 2.5], 'Count the remaining areas']]
  }));

  scenes.push(T.next({
    no: '12', short: 'Multiple Confluences', kicker: 'SUBTOPIC ⑥', title: 'Multiple Confluences — building a framework',
    lines: [['Dalam video seterusnya, kita memulakan subtopik terakhir: Multiple Confluences, dan cara menggabungkan bukti tanpa double-counting.',
      'In the next video, we begin the final subtopic: Multiple Confluences, and how to combine evidence without double-counting.']],
    html: (t) => `<div class="a" style="left:0;width:1200px;text-align:center;top:180px;font-size:48px;font-weight:700;opacity:${P(t, .5, .6)}">Five labels ≠ five pieces of evidence</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy'], 'Pengelasan PD Arrays ialah istilah ICT. Susunan keutamaan rasmi tidak dipaparkan kerana belum disahkan.',
    'The PD Array classification is ICT terminology. An official priority order is not shown because it has not been verified.', 'Any "PD array matrix" ordering requires verification against original ICT material before being presented as official.'));
  scenes.push(T.disclaimer('12', 'Multiple Confluences'));
  registerVideo({ id: 'v11', title: 'VIDEO 11 — PD ARRAY SELECTION', scenes });
})();
