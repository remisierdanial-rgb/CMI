/* VIDEO 04 — SMC + Wyckoff Integration
   Subtopic 1 · SMC + Wyckoff — sections E (Spring vs Liquidity Sweep), F (Mapping), G (Integration), H (Common mistakes). */
const ACC4 = { seed: 301, n: 100, way: [[0, 4300], [7, 4205], [9, 4225], [15, 4095], [16, 4070], [20, 4148], [25, 4085], [30, 4128], [36, 4090], [42, 4136], [48, 4092], [54, 4134], [60, 4088], [62, 4078], [64, 4086], [68, 4082], [74, 4172], [78, 4140], [86, 4215], [95, 4250], [99, 4244]], noise: 4, wick: 5, vbody: .15,
  ovr: { 16: { o: 4100, h: 4104, l: 4052, c: 4066 }, 20: { h: 4158 }, 63: { h: 4084, l: 4038, c: 4074 }, 68: { h: 4090, l: 4066, c: 4084 } },
  vm: { 7: 1.8, 15: 1.8, 16: 3.4, 17: 1.8, 19: 1.5, 20: 1.6, 25: .75, 63: 1.4, 68: .5, 72: 1.8, 73: 2.0, 74: 2.2, 78: .6, 77: .7 } };
const DIS4 = { seed: 307, n: 100, way: [[0, 4000], [7, 4110], [9, 4092], [15, 4215], [16, 4240], [20, 4160], [25, 4222], [30, 4180], [36, 4220], [42, 4176], [48, 4224], [54, 4180], [60, 4228], [62, 4236], [64, 4214], [68, 4222], [74, 4135], [78, 4165], [86, 4090], [95, 4045], [99, 4052]], noise: 4, wick: 5, vbody: .15,
  ovr: { 16: { o: 4212, h: 4258, l: 4208, c: 4244 }, 20: { l: 4150 }, 63: { h: 4272, l: 4228, c: 4236 }, 78: { h: 4170, l: 4146, c: 4158 } },
  vm: { 7: 1.8, 15: 1.8, 16: 3.4, 17: 1.6, 20: 1.6, 25: .75, 63: 1.7, 68: .5, 72: 1.9, 73: 2.1, 74: 2.3, 78: .55, 77: .6 } };

EP({
  num: '04', short: 'SMC + Wyckoff', title: 'SMC + Wyckoff Integration',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 04 · SUBTOPIC 1 · SMC + WYCKOFF',
      h: 'SMC + Wyckoff Integration', sub: 'Spring vs liquidity sweep · Mapping · Integrated demonstrations · Common mistakes',
      obj: [[1, 'Distinguish a Wyckoff Spring from an SMC liquidity sweep'], [2, 'Use the Wyckoff–SMC mapping table without treating it as one-to-one'], [3, 'Combine phase, range, liquidity, POI and confirmation in one plan'], [4, 'Avoid the most common Wyckoff labelling mistakes']],
      viz: { type: 'lines', title: 'SPRING OR SWEEP?', series: [{ pts: [[0, 80], [12, 30], [22, 60], [32, 34], [44, 58], [56, 32], [62, 14], [68, 40], [80, 70], [100, 88]], c: 'w', at: 0, dur: 3 }], hl: [{ y: 30, c: 'c', x1: 8, x2: 70, at: 0, d: 1.5 }], labels: [{ x: 62, y: 14, text: 'BOTH? NEITHER?', c: 'y', pos: 'below', at: 0, d: 2.5 }] },
      say: [
        ['Welcome to Video Four, where Wyckoff and S M C meet.', 'Selamat datang ke Video 4, di mana Wyckoff dan SMC bertemu.'],
        ['We begin with the most important comparison in this subtopic: the Wyckoff Spring versus the S M C liquidity sweep.', 'Kita bermula dengan perbandingan paling penting dalam subtopik ini: Wyckoff Spring berbanding SMC liquidity sweep.'],
        ['Then we build a mapping table between the two frameworks, and show why it is not a one-to-one translation.', 'Kemudian kita membina jadual pemetaan antara kedua-dua kerangka, dan menunjukkan mengapa ia bukan terjemahan satu-dengan-satu.'],
        ['Finally, we integrate both methods into bullish and bearish trade plans, and review common mistakes.', 'Akhirnya, kita mengintegrasikan kedua-dua kaedah ke dalam pelan dagangan bullish dan bearish, dan mengkaji kesilapan biasa.'],
      ],
    },
    {
      tpl: 'statement', label: 'Two definitions', kicker: '4.1 · DEFINITIONS FIRST', h: 'Two definitions from two frameworks', fs: 44, by: 220, bh: 440,
      boxes: [
        { k: 'WYCKOFF · SPRING', kc: 'p', bc: 'violet', t: 'A Phase C event inside an accumulation hypothesis', b: 'Price moves below the support of an established trading range — typically defined by an SC, AR and STs — then returns inside the range. It tests remaining supply, and is judged by the Test and the SOS that follow.', at: 1 },
        { k: 'SMC · LIQUIDITY SWEEP', kc: 'c', bc: 'cyan', t: 'Price runs through a level where stops may rest', b: 'Price trades beyond a swing low (or high), equal lows, or another obvious liquidity level, then moves back. It can occur in a range, a trend, or a pullback. No phase structure is required.', at: 3 },
      ],
      say: [
        ['Always start with definitions, because these two terms come from different frameworks.', 'Sentiasa bermula dengan definisi, kerana kedua-dua istilah ini datang daripada kerangka yang berbeza.'],
        ['A Wyckoff Spring is a Phase C event inside an accumulation hypothesis. Price moves below the support of an established trading range, usually defined by a Selling Climax, an Automatic Rally and Secondary Tests.', 'Wyckoff Spring ialah peristiwa Fasa C dalam hipotesis accumulation. Harga bergerak di bawah support trading range yang telah terbentuk, biasanya ditentukan oleh Selling Climax, Automatic Rally dan Secondary Test.'],
        ['It then returns inside the range. It tests remaining supply, and it is judged by the Test and the Sign of Strength that follow.', 'Ia kemudian kembali ke dalam range. Ia menguji baki supply, dan dinilai berdasarkan Test dan Sign of Strength yang menyusul.'],
        ['An S M C liquidity sweep is broader. Price trades beyond a swing low, equal lows or another obvious level where stop orders may rest, and then moves back.', 'SMC liquidity sweep adalah lebih luas. Harga didagangkan melepasi swing low, equal lows atau paras jelas lain di mana stop order mungkin berada, dan kemudian bergerak kembali.'],
        ['A sweep can occur in a range, in a trend or in a pullback. No phase structure is required.', 'Sweep boleh berlaku dalam range, dalam trend atau dalam pullback. Tiada struktur fasa diperlukan.'],
      ],
    },
    {
      tpl: 'table', label: 'Spring vs sweep', kicker: '4.2 · SIMILARITIES AND DIFFERENCES', h: 'Spring and liquidity sweep compared', cols: ['Question', 'Wyckoff Spring', 'SMC Liquidity Sweep'], widths: [420, 620, 620], hs: 38,
      rows: [
        [1, 'Price trades beyond a prior low?', 'Yes — below range support', 'Yes — below a swing low or equal lows'],
        [1, 'Price returns afterwards?', 'Yes — back inside the range', 'Yes — back above the swept level'],
        [2, 'Requires an established range?', 'Yes — SC, AR, ST context', 'No'],
        [2, 'Requires a prior climax?', 'Typically yes (Phase A)', 'No'],
        [3, 'What confirms it?', 'Test, SOS, LPS', 'Displacement, CHoCH / MSS, POI reaction'],
        [3, 'Volume used?', 'Yes — central to the reading', 'Optional'],
      ],
      note: { at: 4, label: 'Conclusion', text: 'A Spring may **also** be a liquidity sweep. But a sweep is only a Spring if the Wyckoff context is present.' },
      say: [
        ['Let us compare them carefully. First the similarities.', 'Mari kita bandingkan dengan teliti. Pertama, persamaannya.'],
        ['In both, price trades beyond a prior low, and in both, price returns afterwards.', 'Dalam kedua-duanya, harga didagangkan melepasi low sebelumnya, dan dalam kedua-duanya, harga kembali selepas itu.'],
        ['Now the differences. A Spring requires an established trading range, typically preceded by a climax. A sweep requires neither.', 'Sekarang perbezaannya. Spring memerlukan trading range yang telah terbentuk, lazimnya didahului oleh climax. Sweep tidak memerlukan kedua-duanya.'],
        ['A Spring is judged by the Test, Sign of Strength and Last Point of Support, using volume. A sweep is judged by displacement, a change of character or market structure shift, and the reaction at a point of interest. Volume is optional.', 'Spring dinilai melalui Test, Sign of Strength dan Last Point of Support, menggunakan volume. Sweep dinilai melalui displacement, change of character atau market structure shift, dan reaksi pada POI. Volume adalah pilihan.'],
        ['So the conclusion is: a Spring may also be a liquidity sweep. But a sweep is only a Spring if the Wyckoff context is present.', 'Jadi kesimpulannya: Spring mungkin juga merupakan liquidity sweep. Tetapi sweep hanya merupakan Spring jika konteks Wyckoff wujud.'],
      ],
    },
    {
      tpl: 'viz', label: 'Example 1 · Spring',
      viz: {
        type: 'candles', title: 'EXAMPLE 1 · FCPO · 1H · HYPOTHETICAL', tag: 'SPRING IN AN ACCUMULATION CONTEXT', volH: 100, data: ACC4, reveal: [[0, 70, 3]], hide: 71,
        ann: [
          { t: 'tag', i: 16, text: 'SC', c: 'r', pos: 'below', at: 1 }, { t: 'tag', i: 20, text: 'AR', c: 'c', at: 1 }, { t: 'tag', i: 25, text: 'ST', c: 'y', pos: 'below', at: 1 },
          { t: 'hline', p: 4052, i1: 22, i2: 70, c: 'c', label: 'RANGE SUPPORT · SSL 4,052', at: 2, lx: 'l' }, { t: 'zone', p1: 4052, p2: 4158, i1: 16, i2: 70, c: 'p', at: 2, op: .05, dash: true },
          { t: 'tag', i: 63, text: 'SPRING · ALSO A SWEEP', c: 'g', pos: 'below', at: 3 }, { t: 'tag', i: 68, text: 'TEST · LOW VOL', c: 'g', pos: 'below', at: 4, off: 40 }, { t: 'vhl', i: [16, 63, 68], c: 'a', at: 4 },
        ],
      },
      info: { k: 'EXAMPLE 1', h: 'Textbook-style Spring', b: [[1, 'Context: SC, AR and ST define a range after a decline', 'p'], [2, 'Range support at 4,052 is also an obvious sell-side liquidity level', 'c'], [3, 'Price trades to 4,038 and closes back inside: **Spring** hypothesis — and a **sweep**', 'g'], [4, 'A low-volume Test holds above 4,038', 'a']], note: { at: 5, label: 'Both labels fit', text: 'Here the Wyckoff context exists, so "Spring" is justified — and the same move also meets the SMC sweep definition.' } },
      say: [
        ['Example One: a textbook-style Spring, on a hypothetical F C P O chart.', 'Contoh 1: Spring gaya buku teks, pada chart FCPO hipotetikal.'],
        ['The context is established. After a decline, a Selling Climax, Automatic Rally and Secondary Test define a range.', 'Konteksnya telah terbentuk. Selepas penurunan, Selling Climax, Automatic Rally dan Secondary Test menentukan sebuah range.'],
        ['Range support at four thousand and fifty-two is also an obvious level where sell-side liquidity may rest.', 'Support range pada 4,052 juga merupakan paras jelas di mana sell-side liquidity mungkin berada.'],
        ['Price trades down to four thousand and thirty-eight, and closes back inside the range. This supports a Spring hypothesis, and it also meets the definition of a sweep.', 'Harga turun ke 4,038, dan ditutup semula di dalam range. Ini menyokong hipotesis Spring, dan ia juga memenuhi definisi sweep.'],
        ['Then a low-volume Test holds above the Spring low.', 'Kemudian Test dengan volume rendah bertahan di atas low Spring.'],
        ['In this case both labels fit, because the Wyckoff context exists.', 'Dalam kes ini kedua-dua label sesuai, kerana konteks Wyckoff wujud.'],
      ],
    },
    {
      tpl: 'viz', label: 'Example 2 · Sweep only',
      viz: {
        type: 'candles', title: 'EXAMPLE 2 · FCPO · 30M · HYPOTHETICAL', tag: 'SWEEP WITHOUT WYCKOFF CONTEXT', volH: 100,
        data: { seed: 404, n: 64, way: [[0, 4250], [18, 4150], [22, 4158], [26, 4134], [30, 4150], [34, 4134], [38, 4140], [40, 4128], [44, 4150], [50, 4128], [63, 4070]], noise: 4, wick: 4, ovr: { 26: { l: 4126 }, 34: { l: 4126 }, 40: { o: 4136, h: 4140, l: 4112, c: 4134 } }, vm: { 40: 1.5 } },
        reveal: [[0, 39, 2.5], [2, 46, 1.2], [4, 63, 1.5]],
        ann: [
          { t: 'path', pts: [[0, 4252], [18, 4148]], c: 'r', dash: true, at: 1 },
          { t: 'hline', p: 4126, i1: 24, i2: 50, c: 'c', label: 'EQUAL LOWS · SSL', at: 1 },
          { t: 'tag', i: 40, text: 'SWEEP', c: 'c', pos: 'below', at: 2 },
          { t: 'note', x: .45, y: .12, text: 'NO CLIMAX · NO AR/ST RANGE · NO PHASE B', c: 'a', at: 3 },
        ],
      },
      info: { k: 'EXAMPLE 2', h: 'A sweep — not a Spring', b: [[1, 'Strong downtrend; a small pause forms equal lows at 4,126', ''], [2, 'Price sweeps to 4,112 and closes back above', 'c'], [3, 'No climax, no AR/ST range, no built cause — **Wyckoff context is missing**', 'a'], [4, 'Price bounces briefly, then the downtrend continues', '']], note: { at: 5, c: 'r', label: 'Lesson', text: 'Calling this a "Spring" would borrow Wyckoff\'s credibility without its evidence. Describe it as a **liquidity sweep**, nothing more.' } },
      say: [
        ['Example Two: an S M C liquidity sweep without sufficient Wyckoff context.', 'Contoh 2: SMC liquidity sweep tanpa konteks Wyckoff yang mencukupi.'],
        ['F C P O is in a strong downtrend. A small pause forms equal lows at four thousand one hundred and twenty-six, an obvious sell-side liquidity level.', 'FCPO berada dalam downtrend yang kuat. Jeda kecil membentuk equal lows pada 4,126, paras sell-side liquidity yang jelas.'],
        ['Price sweeps to four thousand one hundred and twelve, and closes back above. This is a liquidity sweep.', 'Harga menyapu ke 4,112, dan ditutup semula di atas. Ini ialah liquidity sweep.'],
        ['But there is no climax, no automatic rally and secondary test, and no cause built over time. The Wyckoff context is missing.', 'Tetapi tiada climax, tiada automatic rally dan secondary test, dan tiada cause yang dibina dari semasa ke semasa. Konteks Wyckoff tidak wujud.'],
        ['Price bounces briefly, and then the downtrend continues.', 'Harga melantun seketika, dan kemudian downtrend berterusan.'],
        ['Calling this a Spring would borrow Wyckoff\'s credibility without its evidence. Describe it as a liquidity sweep, nothing more.', 'Memanggil ini Spring bermakna meminjam kredibiliti Wyckoff tanpa buktinya. Gambarkannya sebagai liquidity sweep, tidak lebih daripada itu.'],
      ],
    },
    {
      tpl: 'cards', label: 'Why not interchangeable', kicker: '4.3 · TWO DIRECTIONS', h: 'Why the two terms are not interchangeable', cols: 2, top: 180, ch: 340,
      cards: [
        { n: 'SWEEP ⇏ SPRING', nc: 'cyan', t: 'Not every sweep is a Spring', b: 'Sweeps happen in trends, pullbacks and tiny consolidations. A Spring needs an accumulation hypothesis supported by Phase A and B evidence.', at: 1 },
        { n: 'SPRING ⇏ "JUST A SWEEP"', nc: 'violet', t: 'Not every Spring should be relabelled', b: 'A Spring is judged by Wyckoff criteria — volume, the Test, the SOS. Relabelling it as a sweep can drop that evidence. Check each definition separately.', at: 3 },
      ],
      note: { at: 4, y: 580, label: 'The role of what follows', text: 'For **both** labels, the subsequent price behaviour matters most: a recovery that holds, displacement, and structure change. Without it, neither label is useful.' },
      say: [
        ['So the relationship works in two directions.', 'Jadi hubungan ini berfungsi dalam dua arah.'],
        ['Not every sweep is a Spring. Sweeps happen in trends, pullbacks and tiny consolidations. A Spring needs an accumulation hypothesis supported by Phase A and Phase B evidence.', 'Bukan setiap sweep ialah Spring. Sweep berlaku dalam trend, pullback dan konsolidasi kecil. Spring memerlukan hipotesis accumulation yang disokong oleh bukti Fasa A dan Fasa B.'],
        ['And not every Spring should be relabelled as an S M C sweep without checking.', 'Dan bukan setiap Spring patut dilabel semula sebagai SMC sweep tanpa semakan.'],
        ['A Spring is judged by Wyckoff criteria: volume, the Test and the Sign of Strength. Relabelling it can drop that evidence. Check each definition separately.', 'Spring dinilai mengikut kriteria Wyckoff: volume, Test dan Sign of Strength. Melabel semula boleh menghilangkan bukti tersebut. Semak setiap definisi secara berasingan.'],
        ['For both labels, what happens next matters most: a recovery that holds, displacement and structure change. Without it, neither label is useful.', 'Bagi kedua-dua label, apa yang berlaku seterusnya paling penting: pemulihan yang bertahan, displacement dan perubahan struktur. Tanpanya, kedua-dua label tidak berguna.'],
      ],
    },
    {
      tpl: 'table', label: 'Mapping table', kicker: '4.4 · WYCKOFF ↔ SMC MAPPING', h: 'Related concepts — not one-to-one equivalents', cols: ['Wyckoff concept', 'Related SMC concept', 'Important distinction'], widths: [330, 560, 760], hs: 36, top: 140,
      rows: [
        [1, 'Trading range', 'Dealing range', 'Not necessarily identical definitions'],
        [2, 'Spring', 'Liquidity sweep', 'Spring has a specific Wyckoff context'],
        [3, 'Upthrust', 'Buy-side liquidity sweep / failed breakout', 'Not automatically equivalent'],
        [4, 'SOS', 'Bullish strength / possible BOS', 'Different analytical frameworks'],
        [4, 'SOW', 'Bearish weakness / possible BOS', 'Different analytical frameworks'],
        [5, 'LPS', 'Potential bullish POI', 'Not automatically an Order Block'],
        [5, 'LPSY', 'Potential bearish POI', 'Not automatically an Order Block'],
      ],
      warnLast: true,
      say: [
        ['Now the mapping table. Read every row as related concepts, not equivalents.', 'Sekarang jadual pemetaan. Baca setiap baris sebagai konsep yang berkaitan, bukan setara.'],
        ['A Wyckoff trading range relates to an S M C dealing range, but their definitions are not necessarily identical. A Wyckoff range is defined by events such as the climax and automatic rally; a dealing range is usually defined by a swing high and swing low.', 'Trading range Wyckoff berkaitan dengan dealing range SMC, tetapi definisinya tidak semestinya sama. Range Wyckoff ditentukan oleh peristiwa seperti climax dan automatic rally; dealing range biasanya ditentukan oleh swing high dan swing low.'],
        ['A Spring relates to a liquidity sweep, but the Spring has a specific Wyckoff context, as we just saw.', 'Spring berkaitan dengan liquidity sweep, tetapi Spring mempunyai konteks Wyckoff yang khusus, seperti yang baru kita lihat.'],
        ['An Upthrust relates to a buy-side liquidity sweep or a failed breakout, but it is not automatically equivalent.', 'Upthrust berkaitan dengan buy-side liquidity sweep atau failed breakout, tetapi ia tidak secara automatik setara.'],
        ['A Sign of Strength or Sign of Weakness may coincide with a break of structure, but they come from different frameworks. An S O S is judged with spread and volume; a B O S is judged by a close beyond a swing point.', 'Sign of Strength atau Sign of Weakness mungkin bertepatan dengan break of structure, tetapi ia datang daripada kerangka berbeza. SOS dinilai dengan spread dan volume; BOS dinilai dengan penutupan melepasi swing point.'],
        ['And a Last Point of Support or Supply may be a potential point of interest, but it is not automatically an Order Block.', 'Dan Last Point of Support atau Supply mungkin merupakan POI yang berpotensi, tetapi ia bukan secara automatik Order Block.'],
      ],
    },
    {
      tpl: 'flow', label: 'Integration workflow', kicker: '4.5 · INTEGRATING WYCKOFF AND SMC', h: 'Nine steps — two frameworks, one plan', cols: 2, top: 160, sh: 112,
      steps: [
        { t: 'Wyckoff market phase', s: 'Trend, range, or unclear? Possible phase?', at: 1, c: 'violet' },
        { t: 'Trading range', s: 'Climax, AR, ST — define the boundaries', at: 1, c: 'violet' },
        { t: 'Supply & demand behaviour', s: 'Spread and volume on tests of each boundary', at: 2, c: 'violet' },
        { t: 'SMC market structure', s: 'HTF bias; internal swings; CHoCH / BOS', at: 3, c: 'gold' },
        { t: 'Liquidity mapping', s: 'Equal lows/highs, range boundaries, swing points', at: 3, c: 'cyan' },
        { t: 'POI selection', s: 'OB, FVG or LPS/LPSY area — chosen by rules', at: 4, c: 'gold' },
        { t: 'Displacement & confirmation', s: 'Recovery holds; structure shifts', at: 4, c: 'green2' },
        { t: 'Entry planning', s: 'Entry, size, target defined before the trade', at: 5 },
        { t: 'Invalidation', s: 'The price that proves the hypothesis wrong', at: 5, hl: 'red' },
      ],
      say: [
        ['Here is how to integrate both frameworks into one plan, in nine steps.', 'Ini ialah cara mengintegrasikan kedua-dua kerangka ke dalam satu pelan, dalam sembilan langkah.'],
        ['Start with Wyckoff: is the market trending, ranging, or unclear? If it is ranging, define the range from the climax, automatic rally and secondary tests.', 'Mulakan dengan Wyckoff: adakah pasaran sedang trending, ranging, atau tidak jelas? Jika ranging, tentukan range daripada climax, automatic rally dan secondary test.'],
        ['Then observe supply and demand behaviour: spread and volume when each boundary is tested.', 'Kemudian perhatikan tingkah laku supply dan demand: spread dan volume ketika setiap sempadan diuji.'],
        ['Next, S M C: confirm higher-timeframe bias and internal structure, and map the liquidity.', 'Seterusnya, SMC: sahkan bias higher timeframe dan struktur dalaman, dan petakan liquidity.'],
        ['Select a point of interest by rules, and wait for displacement and confirmation: the recovery holds and structure shifts.', 'Pilih POI berdasarkan peraturan, dan tunggu displacement serta pengesahan: pemulihan bertahan dan struktur beralih.'],
        ['Finally, plan the entry, size and target before the trade, and state the invalidation: the price that proves the hypothesis wrong.', 'Akhirnya, rancang entry, saiz dan sasaran sebelum trade, dan nyatakan titik pembatalan: harga yang membuktikan hipotesis itu salah.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bullish integration',
      viz: {
        type: 'candles', title: 'BULLISH · FCPO · 1H · HYPOTHETICAL', tag: 'WYCKOFF + SMC PLAN', volH: 90, data: ACC4, reveal: [[0, 75, 2.5], [6, 99, 2]],
        ann: [
          { t: 'zone', p1: 4052, p2: 4158, i1: 16, i2: 62, c: 'p', label: 'RANGE · POSSIBLE ACCUMULATION', at: 1, op: .06 },
          { t: 'tag', i: 63, text: 'SPRING / SSL SWEEP', c: 'g', pos: 'below', at: 2 },
          { t: 'hline', p: 4141, i1: 44, i2: 75, c: 'y', label: 'CHoCH 4,141', at: 3, lx: 'l' }, { t: 'hline', p: 4158, i1: 58, i2: 80, c: 'g', label: 'SOS / BOS 4,158', at: 3, d: .4, lx: 'l' },
          { t: 'zone', p1: 4141, p2: 4151, i1: 73, i2: 92, c: 'c', label: 'FVG 4,141–4,151', at: 4, lx: 'r', ly: 'b' },
          { t: 'hline', p: 4151, i1: 76, i2: 99, c: 'w', label: 'ENTRY 4,151', at: 5, dash: false, w: 1.6 }, { t: 'hline', p: 4119, i1: 72, i2: 99, c: 'r', label: 'STOP 4,119', at: 5 }, { t: 'hline', p: 4232, i1: 9, i2: 99, c: 'c', label: 'BSL TARGET 4,232', at: 5 },
        ],
      },
      info: { k: '4.6 · BULLISH DEMONSTRATION', h: 'From phase to plan', b: [[1, '**Wyckoff:** range after a decline — accumulation hypothesis', 'p'], [2, '**Liquidity:** range support swept; Spring hypothesis', 'g'], [3, '**SMC:** CHoCH above 4,141, then close above AR high (SOS / BOS)', 'y'], [4, '**POI:** FVG 4,141–4,151 left by displacement', 'c'], [5, '**Plan:** entry 4,151 · stop 4,119 · target 4,232 → RR ≈ 2.5', 'w']], note: { at: 6, label: 'Risk', text: 'Risk 32 ticks × RM25 = RM800 per contract; reward 81 ticks = RM2,025, before costs. Target reached in this illustration — it will not always be.' } },
      say: [
        ['Now a full bullish demonstration on hypothetical F C P O data.', 'Sekarang demonstrasi bullish yang lengkap pada data FCPO hipotetikal.'],
        ['Wyckoff first: a range forms after a decline. Our hypothesis is possible accumulation.', 'Wyckoff dahulu: range terbentuk selepas penurunan. Hipotesis kita ialah kemungkinan accumulation.'],
        ['Liquidity: range support is swept. With this context, it supports a Spring hypothesis.', 'Liquidity: support range disapu. Dengan konteks ini, ia menyokong hipotesis Spring.'],
        ['S M C structure: price breaks the internal swing high at four thousand one hundred and forty-one, a change of character, then closes above the automatic rally high. That is a Sign of Strength, and also a break of structure.', 'Struktur SMC: harga memecahkan swing high dalaman pada 4,141, iaitu change of character, kemudian ditutup di atas high automatic rally. Itu ialah Sign of Strength, dan juga break of structure.'],
        ['The displacement leaves a fair value gap between four thousand one hundred and forty-one and four thousand one hundred and fifty-one. This is our selected point of interest.', 'Displacement meninggalkan fair value gap antara 4,141 dan 4,151. Ini ialah POI yang kita pilih.'],
        ['The plan: entry at four thousand one hundred and fifty-one, stop below the displacement origin at four thousand one hundred and nineteen, and target the buy-side liquidity at four thousand two hundred and thirty-two. That is about two point five R.', 'Pelannya: entry pada 4,151, stop di bawah asal displacement pada 4,119, dan sasaran buy-side liquidity pada 4,232. Itu kira-kira 2.5R.'],
        ['Risk is thirty-two ticks, or eight hundred ringgit per contract. Reward is eighty-one ticks, or two thousand and twenty-five ringgit, before costs. The target is reached here, but it will not always be.', 'Risiko ialah 32 tick, atau RM800 setiap kontrak. Ganjaran ialah 81 tick, atau RM2,025, sebelum kos. Sasaran dicapai di sini, tetapi ia tidak akan sentiasa dicapai.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bearish integration',
      viz: {
        type: 'candles', title: 'BEARISH · FCPO · 1H · HYPOTHETICAL', tag: 'WYCKOFF + SMC PLAN', volH: 90, data: DIS4, reveal: [[0, 75, 2.5], [6, 99, 2]],
        ann: [
          { t: 'zone', p1: 4150, p2: 4258, i1: 16, i2: 62, c: 'p', label: 'RANGE · POSSIBLE DISTRIBUTION', at: 1, op: .06, ly: 'b' },
          { t: 'tag', i: 63, text: 'UTAD / BSL SWEEP', c: 'r', at: 2 },
          { t: 'hline', p: 4150, i1: 40, i2: 80, c: 'r', label: 'SOW / BOS 4,150', at: 3, lx: 'l' },
          { t: 'zone', p1: 4157, p2: 4174, i1: 72, i2: 92, c: 'c', label: 'LPSY / BEARISH POI', at: 4, lx: 'r' },
          { t: 'hline', p: 4157, i1: 76, i2: 99, c: 'w', label: 'ENTRY 4,157', at: 5, dash: false, w: 1.6 }, { t: 'hline', p: 4182, i1: 72, i2: 99, c: 'r', label: 'STOP 4,182', at: 5 }, { t: 'hline', p: 4085, i1: 9, i2: 99, c: 'c', label: 'SSL TARGET 4,085', at: 5, lx: 'l' },
        ],
      },
      info: { k: '4.7 · BEARISH DEMONSTRATION', h: 'Distribution to markdown', b: [[1, '**Wyckoff:** range after an advance — distribution hypothesis', 'p'], [2, '**Liquidity:** BSL above resistance swept; UTAD hypothesis', ''], [3, '**SMC:** close below the AR low (SOW / BOS)', ''], [4, '**POI:** the LPSY rally zone 4,157–4,174', 'c'], [5, '**Plan:** entry 4,157 · stop 4,182 · target 4,085 → RR ≈ 2.9', 'w']], note: { at: 6, c: 'r', label: 'Invalidation', text: 'If price is accepted back inside the upper range above 4,182, the bearish plan is cancelled — the structure may be re-accumulation.' } },
      say: [
        ['And the bearish demonstration.', 'Dan demonstrasi bearish.'],
        ['Wyckoff first: a range forms after an advance. Our hypothesis is possible distribution.', 'Wyckoff dahulu: range terbentuk selepas kenaikan. Hipotesis kita ialah kemungkinan distribution.'],
        ['Liquidity: buy-side liquidity above resistance is swept, and price closes back inside. With this context, it supports an U T A D hypothesis.', 'Liquidity: buy-side liquidity di atas resistance disapu, dan harga ditutup semula di dalam. Dengan konteks ini, ia menyokong hipotesis UTAD.'],
        ['S M C structure: price closes below the automatic reaction low at four thousand one hundred and fifty. That is a Sign of Weakness, and also a bearish break of structure.', 'Struktur SMC: harga ditutup di bawah low automatic reaction pada 4,150. Itu ialah Sign of Weakness, dan juga bearish break of structure.'],
        ['The weak rally that follows defines our bearish point of interest, from four thousand one hundred and fifty-seven to four thousand one hundred and seventy-four.', 'Lantunan lemah yang menyusul menentukan POI bearish kita, dari 4,157 hingga 4,174.'],
        ['The plan: entry at four thousand one hundred and fifty-seven, stop at four thousand one hundred and eighty-two, and target the sell-side liquidity below the prior swing low at four thousand and eighty-five. That is about two point nine R.', 'Pelannya: entry pada 4,157, stop pada 4,182, dan sasaran sell-side liquidity di bawah swing low sebelumnya pada 4,085. Itu kira-kira 2.9R.'],
        ['If price is accepted back above four thousand one hundred and eighty-two, the plan is cancelled. The structure may be re-accumulation instead.', 'Jika harga diterima semula di atas 4,182, pelan itu dibatalkan. Struktur itu mungkin re-accumulation.'],
      ],
    },
    {
      tpl: 'cards', label: 'Common mistakes', kicker: '4.8 · COMMON MISTAKES', h: 'Seven Wyckoff + SMC mistakes', cols: 4, top: 170, ch: 200,
      cards: [
        { n: '01', nc: 'red2', t: 'Every range = accumulation', b: 'Ranges also form in re-distribution and noise.', at: 1 },
        { n: '02', nc: 'red2', t: 'Every high-volume bar = climax', b: 'A climax needs context and follow-through.', at: 1 },
        { n: '03', nc: 'red2', t: 'Every Spring = reversal', b: 'Springs can fail and become breakdowns.', at: 2 },
        { n: '04', nc: 'red2', t: 'Every UTAD = distribution', b: 'Acceptance above resistance cancels it.', at: 2 },
        { n: '05', nc: 'red2', t: 'Mixing labels', b: 'Wyckoff events are not SMC labels.', at: 3 },
        { n: '06', nc: 'red2', t: 'Forcing a schematic', b: 'Unclear markets should be called unclear.', at: 3 },
        { n: '07', nc: 'red2', t: 'Hindsight labelling', b: 'Labelling events not identifiable at the time.', at: 4 },
      ],
      say: [
        ['Let us finish this subtopic with seven common mistakes.', 'Mari kita akhiri subtopik ini dengan tujuh kesilapan biasa.'],
        ['One: calling every trading range accumulation. Two: calling every high-volume candle a climax.', 'Satu: memanggil setiap trading range sebagai accumulation. Dua: memanggil setiap candle volume tinggi sebagai climax.'],
        ['Three: treating every Spring as a guaranteed reversal. Four: treating every U T A D as confirmed distribution.', 'Tiga: menganggap setiap Spring sebagai pembalikan yang dijamin. Empat: menganggap setiap UTAD sebagai distribution yang disahkan.'],
        ['Five: confusing Wyckoff events with S M C labels. Six: forcing a textbook schematic onto an unclear market.', 'Lima: mengelirukan peristiwa Wyckoff dengan label SMC. Enam: memaksa skematik buku teks ke atas pasaran yang tidak jelas.'],
        ['And seven: using hindsight to label events that were not identifiable at the time.', 'Dan tujuh: menggunakan hindsight untuk melabel peristiwa yang tidak dapat dikenal pasti pada masa itu.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercise 3', kicker: 'EXERCISE 3', h: 'Compare Spring and liquidity sweep', cols: 2, top: 180, ch: 330,
      cards: [
        { n: 'TASK', t: 'Find two events on FCPO', b: 'Event A: price trades below a level inside an established range. Event B: price sweeps equal lows inside a trend. For each, list the Wyckoff evidence (SC, AR, ST, volume) and the SMC evidence (liquidity level, displacement, CHoCH).', at: 1 },
        { n: 'ANSWER GUIDE', nc: 'green2', t: 'Classify honestly', b: 'Event A may qualify as both a Spring hypothesis and a sweep. Event B is a sweep only. If Phase A/B evidence is missing, the Spring label is not justified.', at: 2 },
      ],
      say: [
        ['Exercise Three. Find two events on F C P O: one where price trades below support inside an established range, and one where price sweeps equal lows inside a trend.', 'Latihan 3. Cari dua peristiwa pada FCPO: satu di mana harga didagangkan di bawah support dalam range yang telah terbentuk, dan satu di mana harga menyapu equal lows dalam trend.'],
        ['For each, list the Wyckoff evidence and the S M C evidence separately.', 'Bagi setiap satu, senaraikan bukti Wyckoff dan bukti SMC secara berasingan.'],
        ['The first may qualify as both a Spring hypothesis and a sweep. The second is a sweep only. Without Phase A and B evidence, the Spring label is not justified.', 'Yang pertama mungkin layak sebagai hipotesis Spring dan juga sweep. Yang kedua hanyalah sweep. Tanpa bukti Fasa A dan B, label Spring tidak wajar.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Why is a Wyckoff Spring not automatically an SMC liquidity sweep — and vice versa?',
      opts: ['They are the same thing with different names', 'A Spring requires a Wyckoff range context; a sweep does not. Each must meet its own definition', 'A sweep always has higher volume', 'A Spring only occurs in distribution'], ans: 1, ansAt: 1,
      expl: 'They may overlap on the same bars, but they are defined by different frameworks and confirmed by different evidence.',
      say: [
        ['Knowledge check. Why is a Wyckoff Spring not automatically an S M C liquidity sweep, and vice versa?', 'Semakan pengetahuan. Mengapa Wyckoff Spring bukan secara automatik SMC liquidity sweep, dan sebaliknya?', { p: 1.5 }],
        ['The answer is B. A Spring requires a Wyckoff range context; a sweep does not. They may overlap on the same bars, but each must meet its own definition.', 'Jawapannya ialah B. Spring memerlukan konteks range Wyckoff; sweep tidak. Ia mungkin bertindih pada bar yang sama, tetapi setiap satu mesti memenuhi definisinya sendiri.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'An LPS forms after an SOS. Is it automatically a bullish Order Block?',
      opts: ['Yes — LPS and OB are the same', 'No — it may be a potential POI, but an OB has its own SMC definition', 'Yes, if volume is high', 'No — LPS is a bearish concept'], ans: 1, ansAt: 1,
      expl: 'An LPS is a Wyckoff event. It may coincide with an OB or FVG — check the SMC definition separately.',
      say: [
        ['Second question. A Last Point of Support forms after a Sign of Strength. Is it automatically a bullish Order Block?', 'Soalan kedua. Last Point of Support terbentuk selepas Sign of Strength. Adakah ia secara automatik bullish Order Block?', { p: 1.5 }],
        ['The answer is B. It may be a potential point of interest, but an Order Block has its own S M C definition, which must be checked separately.', 'Jawapannya ialah B. Ia mungkin POI yang berpotensi, tetapi Order Block mempunyai definisi SMC tersendiri, yang mesti disemak secara berasingan.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'SMC + Wyckoff — what to remember',
      items: [[0, 'A Spring needs Wyckoff range context'], [1, 'A sweep needs only a liquidity level and a return'], [2, 'A Spring may also be a sweep — not the reverse by default'], [3, 'The mapping table shows relationships, not equivalence'], [4, 'Integrate: phase → range → liquidity → POI → confirmation'], [5, 'Plan entry, stop, target and invalidation in advance', 'w'], [6, 'Subsequent behaviour matters more than the label', 'w'], [7, 'Avoid hindsight and forced schematics', 'w']],
      say: [
        ['To summarise. A Spring needs Wyckoff range context.', 'Sebagai rumusan. Spring memerlukan konteks range Wyckoff.'],
        ['A sweep needs only a liquidity level and a return.', 'Sweep hanya memerlukan paras liquidity dan pergerakan kembali.'],
        ['A Spring may also be a sweep, but a sweep is not a Spring by default.', 'Spring mungkin juga sweep, tetapi sweep bukan Spring secara lalai.'],
        ['The mapping table shows relationships, not equivalence.', 'Jadual pemetaan menunjukkan hubungan, bukan kesetaraan.'],
        ['Integration flows from phase, to range, to liquidity, to point of interest, to confirmation.', 'Integrasi mengalir daripada fasa, kepada range, kepada liquidity, kepada POI, kepada pengesahan.'],
        ['Plan entry, stop, target and invalidation in advance.', 'Rancang entry, stop, sasaran dan titik pembatalan lebih awal.'],
        ['What happens after the event matters more than the label.', 'Apa yang berlaku selepas peristiwa itu lebih penting daripada labelnya.'],
        ['And avoid hindsight and forced schematics.', 'Dan elakkan hindsight serta skematik yang dipaksa.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 2', h: 'SMC + VPA begins with price, volume and spread',
      chips: [[0, 'Volume', 'Traded vs tick volume, relative volume'], [0, 'Spread', 'Wide and narrow range bars'], [0, 'Effort vs Result', 'Four combinations, in context']],
      nk: 'NEXT · VIDEO 05', nt: 'VPA: Price, Volume and Spread', nAt: 1, ny: 420,
      say: [
        ['That completes Subtopic One. In Video Five, Subtopic Two begins: Volume Price Analysis.', 'Itu melengkapkan Subtopik 1. Dalam Video 5, Subtopik 2 bermula: Volume Price Analysis.'],
        ['We will study volume, spread, and the four combinations of effort and result.', 'Kita akan mengkaji volume, spread, dan empat kombinasi usaha dan hasil.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga FCPO dan pelan dagangan dalam video ini ialah ilustrasi hipotetikal, bukan cadangan dagangan.', foot: 'Seterusnya: Video 05 — VPA: Price, Volume and Spread',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
