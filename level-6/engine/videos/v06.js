/* VIDEO 06 — PD Arrays · Order Block. Illustrative FCPO-style prices only.
 * Convention taught (ICT): bullish OB = last down-close candle before a displacement
 * that breaks structure; default zone = candle body; mean threshold = 50% of body. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, ovl } = E;
  // Bullish OB: body 4,644–4,662, MT 4,653, wick 4,638–4,666. Prior swing high 4,705 → BOS.
  const bullBase = () => T.patch(gen([[0, 4690], [4, 4705], [9, 4668], [13, 4738], [18, 4762], [25, 4656], [34, 4795]], 111),
    10, [[4662, 4666, 4638, 4644], [0, 4690, 4643, 4688], [0, 4725, 4686, 4722], [0, 4742, 4718, 4738]]);
  const D_bu = bullBase();
  // Bearish OB: body 4,738–4,756, MT 4,747, wick 4,734–4,762. Prior swing low 4,695 → BOS.
  const D_be = T.patch(gen([[0, 4710], [4, 4695], [9, 4732], [13, 4663], [18, 4640], [25, 4745], [34, 4606]], 112),
    10, [[4738, 4762, 4734, 4756], [0, 4757, 4712, 4714], [0, 4716, 4676, 4679], [0, 4684, 4660, 4663]]);
  const D_weak = gen([[0, 4700], [6, 4662], [12, 4676], [16, 4668], [30, 4724]], 113, { noise: .9, floor: 3 });
  let WI = 16; for (let i = 6; i <= 17; i++) if (D_weak[i].c < D_weak[i].o) WI = i;
  const D_inv = T.patch(gen([[0, 4690], [4, 4705], [9, 4668], [13, 4738], [18, 4762], [24, 4652], [27, 4630], [34, 4596]], 114),
    10, [[4662, 4666, 4638, 4644], [0, 4690, 4643, 4688], [0, 4725, 4686, 4722], [0, 4742, 4718, 4738]]);
  const scenes = [];
  const obBull = (S, a, i1 = 30, lbl = 'BULLISH OB · BODY 4,644–4,662') => ovl.zone(S, 4644, 4662, 9.6, i1, C.bull, { alpha: .2, op: a, stroke: true }) + tag(S.xs(i1), S.ys(4662) - 16, lbl, C.bull, { anchor: 'end', op: a, fs: 13 });
  const obBear = (S, a, i1 = 30) => ovl.zone(S, 4738, 4756, 9.6, i1, C.bear, { alpha: .2, op: a, stroke: true }) + tag(S.xs(i1), S.ys(4738) + 16, 'BEARISH OB · BODY 4,738–4,756', C.bear, { anchor: 'end', op: a, fs: 13 });

  scenes.push(T.title({
    no: '06', sub: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Order Block', tagline: 'Identification and context',
    objectives: ['Understand what PD Arrays are', 'Identify bullish and bearish order blocks', 'Read the structural context', 'Recognise weak and invalid examples'],
    lines: [
      ['Selamat kembali. Video 6 memulakan subtopik kelima: PD Arrays. Kita mula dengan Order Block.', 'Welcome back. Video 6 begins the fifth subtopic: PD Arrays. We start with the Order Block.'],
      ['Anda akan memahami maksud PD Arrays, mengenal pasti order block bullish dan bearish, dan membaca konteks strukturnya.',
        'You will understand what PD Arrays are, identify bullish and bearish order blocks, and read their structural context.'],
      ['Kita juga akan melihat contoh yang lemah dan yang tidak sah, kerana tidak setiap candle lawan arah ialah order block.', 'We will also look at weak and invalid examples, because not every opposing candle is an order block.']
    ],
    illus: (t, L) => {
      const a = P(t, L[0] + 1, .6), b = P(t, L[1], .8), x = 1240, cw = 34;
      const cs = [[700, 680, 'r'], [680, 660, 'r'], [662, 690, 'r'], [690, 560, 'g'], [560, 470, 'g'], [470, 440, 'g']];
      return cs.map((c, k) => { const up = c[2] === 'g'; const y0 = Math.min(c[0], c[1]); return `<rect x="${x + k * 70}" y="${y0}" width="${cw}" height="${Math.abs(c[1] - c[0])}" fill="${up ? C.bull : C.bear}" opacity="${a}"/>`; }).join('') +
        `<rect x="${x + 140 - 10}" y="662" width="${560 - 140}" height="28" fill="${C.bull}" opacity="${.22 * b}" stroke="${C.bull}"/>` +
        txt(x + 140, 720, 'LAST DOWN-CLOSE CANDLE', { col: C.bull, fs: 15, fw: 700, op: b }) + txt(x + 230, 430, 'DISPLACEMENT', { col: C.gold, fs: 15, fw: 700, op: b });
    }
  }));

  scenes.push(T.cards({
    label: '6.1 · INTRODUCTION TO PD ARRAYS', kicker: 'SUBTOPIC ⑤ · 6.1', title: 'What are PD Arrays?',
    lines: [
      ['PD Arrays ialah istilah ICT bagi sekumpulan struktur atau aras rujukan harga yang digunakan untuk menganalisis kawasan minat yang berpotensi.',
        'PD Arrays is ICT terminology for a collection of price-reference structures or levels used to analyse potential areas of interest.'],
      ['PD bermaksud premium dan discount. Ia dinilai bersama lokasi dalam dealing range yang telah kita pelajari.', 'PD stands for premium and discount. They are assessed together with location in the dealing range we have studied.'],
      ['Lapan jenis akan kita pelajari: order block, breaker, mitigation block, rejection block, fair value gap, inverse fair value gap, liquidity void, dan old high atau low.',
        'We will study eight types: order block, breaker, mitigation block, rejection block, fair value gap, inverse fair value gap, liquidity void, and old high or low.'],
      ['Penting: ini konsep analitikal. Ia bukan bukti order institusi, dan bukan jaminan tindak balas harga.', 'Important: these are analytical concepts. They are not proof of institutional orders, and not a guarantee of a price reaction.']
    ],
    cards: [['Order Block', 'Video 06'], ['Breaker Block', 'Video 07'], ['Mitigation Block', 'Video 07'], ['Rejection Block', 'Video 08'],
      ['Fair Value Gap', 'Video 09'], ['Inverse FVG', 'Video 09'], ['Liquidity Void', 'Video 09'], ['Old High / Low', 'Video 10']].map((x, k) => ({
      x: 60 + (k % 4) * 455, y: 220 + Math.floor(k / 4) * 170, w: 435, h: 150, at: [2, k * .8], kick: x[1].toUpperCase(), head: x[0], hs: 27 })),
    warn: { at: [3, 0], y: 600, s: '<b>Analytical, not proof:</b> PD Arrays do not prove institutional orders and do not guarantee a reaction.' }
  }));

  scenes.push(T.chart({
    label: '6.2 · BULLISH ORDER BLOCK',
    lines: [
      ['Dalam konvensyen ICT yang kita gunakan, order block bullish ialah candle down-close terakhir sebelum displacement ke atas yang memecahkan struktur.',
        'In the ICT convention we use, a bullish order block is the last down-close candle before an upward displacement that breaks structure.'],
      ['Lihat formasinya. Harga turun, dan candle merah terakhir ini dibuka di 4,662 dan ditutup di 4,644.', 'Watch the formation. Price declines, and this final red candle opens at 4,662 and closes at 4,644.'],
      ['Kemudian berlaku displacement: candle bullish yang besar dan pantas, meninggalkan fair value gap, dan memecahkan swing high sebelumnya di 4,705.',
        'Then comes displacement: large, fast bullish candles that leave a fair value gap and break the previous swing high at 4,705.'],
      ['Kerana displacement dan break of structure ini, candle merah tadi ditandakan sebagai order block bullish. Zon default ialah body, 4,644 hingga 4,662.',
        'Because of this displacement and break of structure, the red candle is marked as a bullish order block. The default zone is the body, 4,644 to 4,662.'],
      ['Titik tengah body, 4,653, dipanggil mean threshold. Sesetengah pengamal menggunakan julat penuh termasuk wick, 4,638 hingga 4,666.',
        'The midpoint of the body, 4,653, is called the mean threshold. Some practitioners use the full range including wicks, 4,638 to 4,666.'],
      ['Kemudian harga retrace dan kembali ke order block. Ini dipanggil mitigation. Harga menyentuh 4,656 dan bertindak balas.',
        'Later, price retraces and returns to the order block. This is called mitigation. Price touches 4,656 and reacts.'],
      ['Jika harga close di bawah order block, iaitu di bawah 4,638, order block itu dianggap gagal dalam konvensyen ini.', 'If price closes below the order block, below 4,638, the order block is considered failed in this convention.']
    ],
    chart: {
      data: D_bu, pmin: 4600, pmax: 4820, step: 50, slots: 40, tag: 'BULLISH OB · ILLUSTRATIVE',
      n: c => 3 + 8 * P(c.t, c.at([1, 0]), 3) + 4 * P(c.t, c.at([2, 0]), 2.5) + 10 * P(c.t, c.at([3, 2]), 3) + 10 * P(c.t, c.at([5, 0]), 4),
      under: (S, c) => ovl.zone(S, 4666, 4686, 10, 12, C.gold, { alpha: .18, op: c.p([2, 2]) }),
      ov: (S, c) => ovl.hl(S, 4705, 4, 14, C.mute, { dash: '5 5', op: c.p([2, 2]) }) + tag(S.xs(4), S.ys(4705) - 22, 'SWING HIGH 4,705', C.mute, { op: c.p([2, 2]), fs: 13 }) +
        tag(S.xs(13), S.ys(4705) + 24, 'BOS', C.bull, { op: c.p([2, 4]), fs: 13 }) + tag(S.xs(11) + 18, S.ys(4676), 'FVG', C.gold, { anchor: 'start', op: c.p([2, 2]), fs: 12 }) +
        ovl.zone(S, 4644, 4662, 9.6, 10.4, '#fff', { alpha: 0, op: c.p([1, 1]) * (1 - c.p([3, 0])), stroke: true }) +
        obBull(S, c.p([3, 0]), 34) + ovl.hl(S, 4653, 9.6, 34, C.bull, { dash: '3 4', op: c.p([4, 0]) }) + tag(S.xs(34), S.ys(4653) + 18, 'MEAN THRESHOLD 4,653', C.bull, { anchor: 'end', op: c.p([4, 0]), fs: 12 }) +
        ovl.zone(S, 4638, 4666, 9.6, 34, C.bull, { alpha: 0, op: c.p([4, 3]), stroke: true, dash: '4 4' }) +
        dot(S.xs(25), S.ys(4656), C.gold, c.p([5, 2]), 7) + tag(S.xs(25), S.ys(4638) + 26, 'MITIGATION 4,656', C.gold, { op: c.p([5, 2]), fs: 13 }) +
        ovl.hl(S, 4638, 9.6, 34, C.bear, { op: c.p([6, 0]), dash: '6 4' }) + tag(S.xs(20), S.ys(4638) + 22, 'FAILS ON CLOSE < 4,638', C.bear, { op: c.p([6, 0]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.2', title: 'Bullish order block', items: [[[0, 0], 'Last down-close candle'], [[2, 0], '…before displacement that breaks structure'], [[3, 2], 'Default zone: candle body'], [[4, 0], 'Mean threshold: 50% of body'], [[5, 0], 'Mitigation: price returns to the block'], [[6, 0], 'Fails on a close beyond the block', 'r']] }
  }));

  scenes.push(T.chart({
    label: '6.2 · BEARISH ORDER BLOCK',
    lines: [
      ['Order block bearish ialah cerminannya: candle up-close terakhir sebelum displacement ke bawah yang memecahkan struktur.',
        'A bearish order block is the mirror: the last up-close candle before a downward displacement that breaks structure.'],
      ['Di sini, candle hijau terakhir dibuka di 4,738 dan ditutup di 4,756. Kemudian displacement ke bawah memecahkan swing low 4,695.',
        'Here, the final green candle opens at 4,738 and closes at 4,756. Then a downward displacement breaks the 4,695 swing low.'],
      ['Zon body ialah 4,738 hingga 4,756, dengan mean threshold di 4,747. Harga kemudian retrace ke 4,745, ke dalam order block, dan bertindak balas ke bawah.',
        'The body zone is 4,738 to 4,756, with the mean threshold at 4,747. Price later retraces to 4,745, into the order block, and reacts lower.'],
      ['Order block bearish ini gagal jika harga close di atas 4,762.', 'This bearish order block fails if price closes above 4,762.']
    ],
    chart: {
      data: D_be, pmin: 4580, pmax: 4800, step: 50, slots: 40, tag: 'BEARISH OB · ILLUSTRATIVE',
      n: c => 3 + 12 * P(c.t, c.at([0, 1]), 4) + 10 * P(c.t, c.at([1, 3]), 3) + 10 * P(c.t, c.at([2, 4]), 3),
      ov: (S, c) => ovl.hl(S, 4695, 4, 14, C.mute, { dash: '5 5', op: c.p([1, 2]) }) + tag(S.xs(4), S.ys(4695) + 22, 'SWING LOW 4,695', C.mute, { op: c.p([1, 2]), fs: 13 }) +
        tag(S.xs(13), S.ys(4695) - 24, 'BOS', C.bear, { op: c.p([1, 4]), fs: 13 }) + obBear(S, c.p([2, 0]), 34) +
        ovl.hl(S, 4747, 9.6, 34, C.bear, { dash: '3 4', op: c.p([2, 2]) }) + dot(S.xs(25), S.ys(4745), C.gold, c.p([2, 5]), 7) +
        ovl.hl(S, 4762, 9.6, 34, C.bear, { op: c.p([3, 0]), dash: '6 4' }) + tag(S.xs(20), S.ys(4762) - 22, 'FAILS ON CLOSE > 4,762', C.bear, { op: c.p([3, 0]), fs: 12 })
    },
    side: { kicker: 'SUBTOPIC ⑤ · 6.2', title: 'Bearish order block', items: [[[0, 0], 'Last up-close candle'], [[1, 2], 'Displacement breaks the swing low'], [[2, 0], 'Body 4,738–4,756 · MT 4,747'], [[2, 4], 'Mitigation and reaction'], [[3, 0], 'Fails on a close above 4,762', 'r']] }
  }));

  scenes.push(T.two({
    label: '6.2 · WEAK AND INVALID EXAMPLES',
    lines: [
      ['Sekarang dua contoh yang tidak patut dilabel sebagai order block yang kukuh.', 'Now two examples that should not be labelled as a strong order block.'],
      ['Contoh A: ada candle merah terakhir sebelum harga naik, tetapi kenaikannya perlahan, tiada displacement, dan tiada swing high yang dipecahkan.',
        'Example A: there is a last red candle before price rises, but the rise is slow, with no displacement, and no swing high is broken.'],
      ['Tanpa displacement dan break of structure, candle itu hanyalah candle merah biasa, bukan order block mengikut metodologi ini.',
        'Without displacement and a break of structure, that candle is just an ordinary red candle, not an order block under this methodology.'],
      ['Contoh B: order block yang sah pada mulanya. Tetapi apabila harga kembali, ia close di bawah 4,638 dan terus jatuh. Order block ini telah gagal.',
        'Example B: a valid order block at first. But when price returns, it closes below 4,638 and keeps falling. This order block has failed.'],
      ['Order block yang telah ditembusi dengan body close tidak lagi digunakan sebagai zon bullish yang sama.', 'An order block that has been violated by a body close is no longer used as the same bullish zone.']
    ],
    a: { data: D_weak, pmin: 4620, pmax: 4760, step: 25, slots: 32, reveal: [1, 0], revealDur: 4, title: 'EXAMPLE A · HYPOTHETICAL', tag: 'NO DISPLACEMENT · NO BOS',
      ov: (S, c) => ovl.zone(S, D_weak[WI].c - 1, D_weak[WI].o + 1, WI - .4, 30, C.mute, { alpha: .14, op: c.p([1, 3]), stroke: true, dash: '4 4' }) + tag(S.xs(WI), S.ys(D_weak[WI].c) + 26, 'LAST RED CANDLE', C.mute, { op: c.p([1, 3]), fs: 12 }) +
        tag(S.xs(18), S.ys(4740), '✗ NOT AN ORDER BLOCK', C.bear, { op: c.p([2, 0]), fs: 14 }) },
    b: { data: D_inv, pmin: 4560, pmax: 4800, step: 50, slots: 36, reveal: [3, 0], revealDur: 5, title: 'EXAMPLE B · HYPOTHETICAL', tag: 'OB VIOLATED', show: [3, 0],
      ov: (S, c) => obBull(S, 1, 33, 'OB 4,644–4,662') + ovl.hl(S, 4638, 9.6, 33, C.bear, { dash: '6 4' }) + tag(S.xs(28), S.ys(4600) + 24, '✗ CLOSED BELOW 4,638 · FAILED', C.bear, { op: c.p([3, 4]), fs: 14 }) },
    h: 640,
    extra: c => `<div class="warn" style="left:36px;top:770px;width:1848px;opacity:${c.p([4, 0])}"><b>Not every opposing candle is an order block.</b> Displacement, a break of structure, and an intact zone are required in this methodology.</div>`
  }));

  scenes.push(T.cards({
    label: '6.2 · CONTEXT AND METHODOLOGY', kicker: 'SUBTOPIC ⑤ · 6.2', title: 'Context makes an order block relevant',
    lines: [
      ['Order block yang sah secara bentuk masih perlu dinilai dalam konteks.', 'An order block that is valid in form still needs to be assessed in context.'],
      ['Lokasi: order block bullish lebih relevan di discount dealing range higher timeframe. Order block bearish lebih relevan di premium.',
        'Location: a bullish order block is more relevant in the discount of the higher timeframe dealing range. A bearish order block is more relevant in premium.'],
      ['Liquidity: jika harga menyapu liquidity sebelum displacement, ia menambah konteks. Struktur: displacement mesti memecahkan struktur yang bermakna.',
        'Liquidity: if price sweeps liquidity before the displacement, it adds context. Structure: the displacement must break meaningful structure.'],
      ['Metodologi kita: body sebagai zon default, mean threshold sebagai rujukan, dan close di luar zon sebagai kegagalan. Pengamal lain mungkin menggunakan konvensyen berbeza.',
        'Our methodology: the body as the default zone, the mean threshold as a reference, and a close beyond the zone as failure. Other practitioners may use different conventions.']
    ],
    cards: [
      { x: 60, y: 220, w: 580, h: 320, at: [1, 0], kick: 'LOCATION', head: 'Bullish OB in discount, bearish OB in premium', body: 'Relative to the higher timeframe dealing range.' },
      { x: 670, y: 220, w: 580, h: 320, at: [2, 0], kick: 'LIQUIDITY &amp; STRUCTURE', head: 'Sweep before, BOS after', body: 'A liquidity sweep before the displacement adds context. The displacement must break meaningful structure.' },
      { x: 1280, y: 220, w: 580, h: 320, at: [3, 0], col: '#d7b256', kick: 'CMI CONVENTION', head: 'Body · mean threshold · close rule', body: 'Default zone = body. Reference = 50% of body. Failure = close beyond the block. Conventions vary between educators.' }
    ]
  }));

  scenes.push(T.mistakes({
    kicker: 'SUBTOPIC ⑤ · 6.12', title: 'Common order block mistakes', rowH: 150,
    lines: [
      ['Kesilapan biasa dengan order block:', 'Common order block mistakes:'],
      ['Menandakan setiap candle lawan arah sebagai order block. Mengabaikan displacement dan break of structure.', 'Marking every opposing candle as an order block. Ignoring displacement and the break of structure.'],
      ['Mengabaikan lokasi premium dan discount. Terus menggunakan order block yang telah ditembusi.', 'Ignoring premium and discount location. Continuing to use an order block that has been violated.'],
      ['Dan menganggap order block sebagai bukti order institusi yang sebenar.', 'And treating an order block as proof of actual institutional orders.']
    ],
    items: [[[1, 0], 'Every opposing candle = OB', 'Without displacement + BOS it is just a candle.'], [[1, 3.5], 'Ignoring displacement &amp; BOS', 'These define the order block in this methodology.'],
      [[2, 0], 'Ignoring P/D location', 'A bullish OB deep in HTF premium is a weaker case.'], [[2, 3], 'Using a violated OB', 'A close beyond the block means it failed.'],
      [[3, 0], 'OB as proof of institutions', 'It is an analytical reference, not order-book evidence.']]
  }));

  scenes.push(T.summary({
    title: 'Order Block',
    lines: [
      ['Mari rumuskan.', 'Let us summarise.'],
      ['Order block bullish ialah candle down-close terakhir sebelum displacement bullish yang memecahkan struktur. Bearish ialah cerminannya.',
        'A bullish order block is the last down-close candle before a bullish displacement that breaks structure. Bearish is the mirror.'],
      ['Zon default ialah body, dengan mean threshold di 50 peratus. Close di luar zon bermakna gagal.', 'The default zone is the body, with the mean threshold at 50 percent. A close beyond the zone means failure.'],
      ['Nilai lokasi, liquidity dan struktur. Order block ialah konsep analitikal, bukan jaminan.', 'Assess location, liquidity and structure. An order block is an analytical concept, not a guarantee.']
    ],
    items: [[[1, 0], 'Last opposing candle before displacement'], [[1, 3], 'Displacement must break structure'], [[2, 0], 'Zone = body · MT = 50%'], [[2, 2.5], 'Close beyond = failed'],
      [[3, 0], 'Location · liquidity · structure'], [[3, 2.5], 'Analytical concept, not a guarantee']]
  }));

  scenes.push(T.quiz([
    ['Define a bullish order block in the convention taught here.', 'The last down-close candle before an upward displacement that breaks structure. Default zone: the candle body.',
      'takrifkan order block bullish mengikut konvensyen yang diajar di sini.', 'candle down-close terakhir sebelum displacement ke atas yang memecahkan struktur. Zon default ialah body candle itu.'],
    ['An OB body runs from 4,644 to 4,662. What is the mean threshold?', '(4,644 + 4,662) ÷ 2 = 4,653.',
      'body order block dari 4,644 hingga 4,662. Apakah mean threshold?', '4,644 tambah 4,662, bahagi dua, ialah 4,653.',
      'An order block body runs from 4,644 to 4,662. What is the mean threshold?', '4,644 plus 4,662, divided by two, is 4,653.'],
    ['Why is the last red candle before a slow grind higher not an order block?', 'There is no displacement and no break of structure, which this methodology requires.',
      'mengapa candle merah terakhir sebelum kenaikan perlahan bukan order block?', 'tiada displacement dan tiada break of structure, yang diperlukan oleh metodologi ini.'],
    ['When is a bullish order block considered failed?', 'When price closes below the block, beyond its low, in this convention.',
      'bilakah order block bullish dianggap gagal?', 'apabila harga close di bawah block itu, melepasi low-nya, dalam konvensyen ini.']
  ]));

  scenes.push(T.exercise({
    title: 'Identify order blocks with context',
    lines: [
      ['Latihan praktikal: cari tiga order block bullish dan tiga order block bearish pada carta anda.', 'Practical exercise: find three bullish and three bearish order blocks on your chart.'],
      ['Untuk setiap satu, sahkan displacement dan break of structure, tandakan body dan mean threshold, dan catat lokasinya dalam dealing range.',
        'For each, confirm the displacement and break of structure, mark the body and mean threshold, and record its location in the dealing range.'],
      ['Kemudian catat apa yang berlaku apabila harga kembali: tindak balas, atau close melepasi block.', 'Then record what happened when price returned: a reaction, or a close through the block.']
    ],
    steps: [[[1, 0], 'Find 3 bullish and 3 bearish candidates'], [[1, 2], 'Confirm displacement + break of structure'], [[1, 4], 'Mark body and mean threshold'], [[1, 6], 'Record premium/discount location'], [[2, 0], 'Record the outcome on return']]
  }));

  scenes.push(T.next({
    no: '07', short: 'Breaker &amp; Mitigation', kicker: 'SUBTOPIC ⑤ · PD ARRAYS', title: 'Breaker Block &amp; Mitigation Block',
    lines: [['Dalam video seterusnya: Breaker Block dan Mitigation Block, apa yang berlaku apabila order block gagal, dan cara membezakan keduanya.',
      'In the next video: the Breaker Block and the Mitigation Block, what happens when an order block fails, and how to tell them apart.']],
    html: (t) => `<div class="a" style="left:0;width:1200px;text-align:center;top:170px;font-size:52px;font-weight:700;opacity:${P(t, .5, .6)}">Failed structure → role reversal</div>
      <div class="a mono" style="left:0;width:1200px;text-align:center;top:260px;font-size:20px;color:#8a93a8;letter-spacing:3px;opacity:${P(t, 1.5, .6)}">WITH A SWEEP · BREAKER &nbsp;|&nbsp; WITHOUT · MITIGATION</div>`
  }));
  scenes.push(T.refs(['ict', 'murphy', 'harris'], 'Order block ialah istilah ICT. Konsep order flow dan liquidity secara umum dibincangkan dalam literatur microstructure.',
    'Order block is an ICT term. Order flow and liquidity in general are discussed in market microstructure literature.', 'Order block definitions vary between educators; the convention taught here is identified on screen. Microstructure literature does not define ICT order blocks.'));
  scenes.push(T.disclaimer('07', 'Breaker &amp; Mitigation Block'));
  registerVideo({ id: 'v06', title: 'VIDEO 06 — ORDER BLOCK', scenes });
})();
