/* VIDEO 11 — Advanced Volume Profile and SMC Integration
   Subtopic 4 · SMC + Volume Profile — sections F (Profile types), G (Acceptance & rejection), H (Integration), I (Bullish), J (Bearish), K (Mistakes). */
const D11 = { seed: 1111, n: 80, way: [[0, 4150], [6, 4160], [12, 4146], [18, 4158], [24, 4144], [30, 4156], [36, 4146], [40, 4150], [44, 4138], [47, 4122], [49, 4118], [51, 4130], [54, 4152], [57, 4146], [60, 4145], [66, 4172], [79, 4186]], noise: 4, wick: 5 };
// Prior session = bars 0–39: POC 4,155 · VAH 4,160 · VAL 4,144 · low 4,135 · high 4,170 (engine-computed, 2-pt rows)
const BULL = CH.genCandles(D11);
const M = 8300, BEAR = BULL.map(b => ({ o: M - b.o, h: M - b.l, l: M - b.h, c: M - b.c, v: b.v }));
// Mirrored prior session: POC 4,145 · VAH 4,156 · VAL 4,140 · high 4,165 · low 4,130
const ch = (title, tag, bars, ann, extra = {}) => ({ type: 'candles', title, tag, bars, slots: 82, range: [4100, 4205], volH: 60, reveal: [[0, 79, 2]], ann, ...extra });
const sess = [{ t: 'vline', i: 40, c: 'm', label: 'NEW SESSION', at: 0 }];

EP({
  num: '11', short: 'Volume Profile + SMC', title: 'Advanced Volume Profile and SMC Integration',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 11 · SUBTOPIC 4 · SMC + VOLUME PROFILE',
      h: 'Advanced Volume Profile and SMC Integration', sub: 'Five profile types · Acceptance and rejection · Profile + SMC · Bullish and bearish examples',
      obj: [[1, 'Choose between session, fixed, visible, periodic and composite profiles'], [2, 'Judge acceptance and rejection over time — not from one candle'], [3, 'Combine profile references with SMC structure and liquidity'], [4, 'Avoid the eight common Volume Profile mistakes']],
      viz: ch('SESSION PROFILES · HYPOTHETICAL', '', BULL, [{ t: 'profile', i1: 0, i2: 39, bin: 2, anchor: true, width: 150, at: 0, d: 1.5, lines: false }, { t: 'profile', i1: 40, i2: 79, bin: 2, anchor: true, width: 150, at: 0, d: 2, lines: false }], { vol: false, volH: 0, noAxis: true }),
      say: [
        ['Welcome to Video Eleven. We complete Subtopic Four.', 'Selamat datang ke Video 11. Kita melengkapkan Subtopik 4.'],
        ['First, the five common types of volume profile, and why the chosen range changes every level.', 'Pertama, lima jenis volume profile yang biasa, dan mengapa julat yang dipilih mengubah setiap paras.'],
        ['Then acceptance and rejection, which must be judged over time, not from a single candle.', 'Kemudian acceptance dan rejection, yang mesti dinilai dari semasa ke semasa, bukan daripada satu candle.'],
        ['Finally, we integrate Volume Profile with S M C in bullish and bearish F C P O examples.', 'Akhirnya, kita mengintegrasikan Volume Profile dengan SMC dalam contoh FCPO bullish dan bearish.'],
      ],
    },
    {
      tpl: 'table', label: 'Five profile types', kicker: '11.1 · TYPES OF VOLUME PROFILE', h: 'Five profile types — five different ranges', cols: ['Type', 'Range selected', 'Typical use', 'Limitation'], widths: [330, 450, 470, 410], hs: 36,
      rows: [
        [1, 'Session', 'Each trading session automatically', 'Prior-session value, POC, VAH/VAL', 'Session template must match FCPO hours'],
        [2, 'Fixed Range', 'Bars chosen by the trader', 'A specific swing, range or move', 'Subjective start and end points'],
        [3, 'Visible Range', 'Whatever is on screen', 'Quick overview', 'Changes when you scroll or zoom'],
        [4, 'Periodic', 'Fixed periods: day, week, month', 'Repeated, comparable profiles', 'Period boundaries may split structure'],
        [5, 'Composite', 'Many sessions combined', 'Longer-term HVN/LVN and value', 'Old volume may matter less now'],
      ],
      note: { at: 6, label: 'Key point', text: 'Different ranges produce **different** POC, VAH, VAL, HVN and LVN. Always state the profile type and range.' },
      say: [
        ['There are five common types of volume profile. Each selects its range differently.', 'Terdapat lima jenis volume profile yang biasa. Setiap satu memilih julatnya secara berbeza.'],
        ['A session profile builds one profile for each trading session automatically. It is used for prior-session value, but the session template must match F C P O trading hours.', 'Session profile membina satu profile bagi setiap sesi dagangan secara automatik. Ia digunakan untuk value sesi sebelumnya, tetapi templat sesi mesti sepadan dengan waktu dagangan FCPO.'],
        ['A fixed range profile covers bars chosen by the trader, such as one swing or one range. Its start and end points are subjective.', 'Fixed range profile meliputi bar yang dipilih oleh trader, seperti satu swing atau satu range. Titik mula dan tamatnya adalah subjektif.'],
        ['A visible range profile covers whatever is on screen. It changes when you scroll or zoom.', 'Visible range profile meliputi apa sahaja yang ada di skrin. Ia berubah apabila anda menatal atau zum.'],
        ['A periodic profile repeats for fixed periods, such as each day, week or month. Its boundaries may split a structure.', 'Periodic profile berulang bagi tempoh tetap, seperti setiap hari, minggu atau bulan. Sempadannya mungkin memisahkan sesuatu struktur.'],
        ['A composite profile combines many sessions, showing longer-term value and nodes. But older volume may matter less now.', 'Composite profile menggabungkan banyak sesi, menunjukkan value dan node jangka panjang. Tetapi volume lama mungkin kurang penting sekarang.'],
        ['Different ranges produce different levels. Always state the profile type and range.', 'Julat yang berbeza menghasilkan paras yang berbeza. Sentiasa nyatakan jenis profile dan julatnya.'],
      ],
    },
    {
      tpl: 'split', label: 'Range changes levels',
      a: ch('SESSION PROFILES · HYPOTHETICAL', 'PRIOR SESSION', BULL, [...sess, { t: 'profile', i1: 0, i2: 39, bin: 2, anchor: true, width: 120, at: 1 }], { vol: false, volH: 0 }),
      b: ch('COMPOSITE · BOTH SESSIONS', 'VISIBLE RANGE', BULL, [{ t: 'profile', i1: 0, i2: 79, bin: 2, side: 'right', width: 150, at: 2 }], { vol: false, volH: 0 }),
      calc: [[1, 'Prior session (bars 1–40): POC {g}4,155{/} · VAH {c}4,160{/} · VAL {c}4,144{/}'], [2, 'Both sessions combined:    POC {g}4,155{/} · VAH {c}4,164{/} · VAL {c}4,138{/}']],
      say: [
        ['Here is why the range matters, using the same F C P O data.', 'Inilah sebabnya julat itu penting, menggunakan data FCPO yang sama.'],
        ['On the left, the prior-session profile: P O C four thousand one hundred and fifty-five, value area from four thousand one hundred and forty-four to four thousand one hundred and sixty.', 'Di sebelah kiri, profile sesi sebelumnya: POC 4,155, value area dari 4,144 hingga 4,160.'],
        ['On the right, a profile of both sessions combined. The P O C happens to stay at four thousand one hundred and fifty-five here, but the value area widens to four thousand one hundred and thirty-eight to four thousand one hundred and sixty-four. Neither profile is wrong. They answer different questions.', 'Di sebelah kanan, profile gabungan kedua-dua sesi. POC kebetulan kekal pada 4,155 di sini, tetapi value area melebar kepada 4,138 hingga 4,164. Tiada profile yang salah. Ia menjawab soalan yang berbeza.'],
      ],
    },
    {
      tpl: 'viz', label: 'Acceptance and rejection',
      viz: ch('FCPO · 30M · HYPOTHETICAL', 'AUCTION BEHAVIOUR', BULL, [...sess, { t: 'profile', i1: 0, i2: 39, bin: 2, anchor: true, width: 120, at: 0, x2: 79 },
        { t: 'zone', p1: 4108, p2: 4144, i1: 45, i2: 53, c: 'r', label: 'OUTSIDE VALUE · 9 BARS', at: 2, op: .08, ly: 'b' }, { t: 'tag', i: 54, text: 'RE-ENTRY', c: 'y', pos: 'below', at: 3 },
        { t: 'zone', p1: 4160, p2: 4198, i1: 64, i2: 79, c: 'g', label: 'ABOVE VAH · 16 BARS', at: 5, op: .08 }]),
      info: { k: '11.2 · ACCEPTANCE & REJECTION', h: 'An auction, judged over time', b: [[1, 'Prior value: 4,144–4,160', 'c'], [2, 'Price trades below VAL for 9 bars — but fails to hold there', ''], [3, 'Back inside value: a possible **rejection** of lower prices (failed auction)', 'y'], [4, 'Re-entry suggests possible rotation toward POC / VAH', 'y'], [5, 'Later, price holds above VAH for 16 bars, building volume: possible **acceptance** higher', 'g']], note: { at: 6, c: 'r', label: 'Not from one candle', text: 'Acceptance and rejection need **time and subsequent behaviour**. One close outside VAH is not a breakout; one wick is not rejection.' } },
      say: [
        ['Volume Profile comes from auction thinking. Price moves to find trade. Where trade is accepted, volume builds. Where it is rejected, price moves away.', 'Volume Profile datang daripada pemikiran lelong. Harga bergerak untuk mencari dagangan. Di mana dagangan diterima, volume terbina. Di mana ia ditolak, harga bergerak menjauh.'],
        ['The prior session\'s value was four thousand one hundred and forty-four to four thousand one hundred and sixty.', 'Value sesi sebelumnya ialah 4,144 hingga 4,160.'],
        ['In the new session, price trades below the Value Area Low for nine bars, but does not hold there.', 'Dalam sesi baharu, harga didagangkan di bawah Value Area Low selama sembilan bar, tetapi tidak bertahan di situ.'],
        ['Price returns inside value. This is a possible rejection of lower prices: a failed auction below value.', 'Harga kembali ke dalam value. Ini ialah kemungkinan rejection terhadap harga lebih rendah: lelongan yang gagal di bawah value.'],
        ['After re-entry, some traders watch for rotation toward the P O C, or even the Value Area High.', 'Selepas kemasukan semula, sesetengah trader memerhati putaran ke arah POC, atau malah Value Area High.'],
        ['Later, price trades above the Value Area High and holds there for sixteen bars, building volume. This is possible acceptance at higher prices.', 'Kemudian, harga didagangkan di atas Value Area High dan bertahan di situ selama 16 bar, membina volume. Ini ialah kemungkinan acceptance pada harga lebih tinggi.'],
        ['Acceptance and rejection need time and subsequent behaviour. One close outside the value area is not a breakout, and one wick is not rejection.', 'Acceptance dan rejection memerlukan masa dan tingkah laku susulan. Satu penutupan di luar value area bukan breakout, dan satu wick bukan rejection.'],
      ],
    },
    {
      tpl: 'table', label: 'Auction states', kicker: '11.2 · BALANCE AND IMBALANCE', h: 'Reading price relative to value', cols: ['Observation', 'Possible interpretation', 'Needs'], widths: [520, 620, 520], hs: 38,
      rows: [
        [1, 'Price rotating inside the value area', 'Balance — two-way trade', 'Range tactics; edges matter'],
        [2, 'Price leaves value and builds volume outside', 'Imbalance → possible acceptance', 'Several bars holding; developing POC moves'],
        [3, 'Price leaves value, then quickly returns', 'Failed breakout / possible rejection', 'Re-entry that holds'],
        [4, 'Price returns inside after acceptance outside', 'Re-entry; new balance forming', 'Fresh profile; do not assume a reversal'],
      ],
      note: { at: 5, c: 'r', label: 'Caution', text: 'Not every move beyond VAH or VAL is a breakout, and VAH/VAL are not automatic reversal levels.' },
      say: [
        ['Here is a framework for reading price relative to value.', 'Ini ialah kerangka untuk membaca harga berbanding value.'],
        ['Price rotating inside the value area suggests balance: two-way trade.', 'Harga berputar di dalam value area menunjukkan keseimbangan: dagangan dua hala.'],
        ['Price leaving value and building volume outside suggests imbalance and possible acceptance. It needs several bars holding, and a developing P O C that moves.', 'Harga meninggalkan value dan membina volume di luar menunjukkan ketidakseimbangan dan kemungkinan acceptance. Ia memerlukan beberapa bar yang bertahan, dan developing POC yang bergerak.'],
        ['Price leaving value and quickly returning suggests a failed breakout, a possible rejection.', 'Harga meninggalkan value dan cepat kembali menunjukkan failed breakout, kemungkinan rejection.'],
        ['And price returning inside after acceptance outside suggests a new balance forming. Do not assume a reversal.', 'Dan harga kembali ke dalam selepas acceptance di luar menunjukkan keseimbangan baharu sedang terbentuk. Jangan anggap pembalikan.'],
        ['Not every move beyond the value area is a breakout, and the value area edges are not automatic reversal levels.', 'Bukan setiap pergerakan melepasi value area ialah breakout, dan tepi value area bukan paras pembalikan automatik.'],
      ],
    },
    {
      tpl: 'table', label: 'Profile + SMC', kicker: '11.3 · INTEGRATING WITH SMC', h: 'Profile references alongside SMC', cols: ['Volume Profile', 'SMC reference', 'Important distinction'], widths: [330, 560, 770], hs: 36, top: 140,
      rows: [
        [1, 'POC', 'Potential reference level', 'Not automatically an OB'],
        [2, 'VAH', 'Possible upper auction reference', 'Not automatically BSL'],
        [2, 'VAL', 'Possible lower auction reference', 'Not automatically SSL'],
        [3, 'HVN', 'High-volume price region', 'Not automatically demand'],
        [3, 'LVN', 'Low-volume price region', 'Not automatically FVG'],
      ],
      warnLast: true,
      note: { at: 4, label: 'How they complement', text: 'Profile can add context to the HTF dealing range, premium/discount, liquidity pools, OBs, FVGs, BOS/CHoCH, POI ranking, and entry/target areas — while each tool keeps its own definition.' },
      say: [
        ['Now integration. The tools describe different aspects of market behaviour.', 'Sekarang integrasi. Alat-alat ini menggambarkan aspek tingkah laku pasaran yang berbeza.'],
        ['A P O C can be a potential reference level, but it is not automatically an Order Block.', 'POC boleh menjadi paras rujukan yang berpotensi, tetapi ia bukan secara automatik Order Block.'],
        ['The Value Area High and Low are possible auction references, but not automatically buy-side or sell-side liquidity.', 'Value Area High dan Low ialah rujukan lelongan yang mungkin, tetapi bukan secara automatik buy-side atau sell-side liquidity.'],
        ['H V Ns and L V Ns describe volume regions, not demand zones or fair value gaps.', 'HVN dan LVN menggambarkan kawasan volume, bukan zon demand atau fair value gap.'],
        ['Used carefully, the profile adds context to the dealing range, premium and discount, liquidity, Order Blocks, fair value gaps, structure breaks, point-of-interest ranking, and entry and target areas.', 'Jika digunakan dengan berhati-hati, profile menambah konteks kepada dealing range, premium dan discount, liquidity, Order Block, fair value gap, pemecahan struktur, penyusunan POI, serta kawasan entry dan sasaran.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bullish example',
      viz: ch('BULLISH · FCPO · 30M · HYPOTHETICAL', 'PROFILE + SMC', BULL, [...sess, { t: 'profile', i1: 0, i2: 39, bin: 2, anchor: true, width: 110, at: 0, x2: 79, op: .8 },
        { t: 'hline', p: 4135, i1: 30, i2: 50, c: 'c', label: 'SSL · SESSION LOW 4,135', at: 1, lx: 'l' }, { t: 'tag', i: 49, text: 'SWEEP · 4,110', c: 'c', pos: 'below', at: 2 },
        { t: 'tag', i: 54, text: 'BACK IN VALUE', c: 'y', pos: 'below', at: 3, off: 40 }, { t: 'hline', p: 4155, i1: 43, i2: 62, c: 'y', label: 'CHoCH > 4,155', at: 4, lx: 'l' },
        { t: 'hline', p: 4155, i1: 62, i2: 79, c: 'w', label: 'ENTRY 4,155', at: 5, dash: false, w: 1.5 }, { t: 'hline', p: 4133, i1: 58, i2: 79, c: 'r', label: 'STOP 4,133', at: 5 }, { t: 'hline', p: 4170, i1: 6, i2: 79, c: 'c', label: 'T1 · SESSION HIGH 4,170', at: 6, lx: 'l' }, { t: 'hline', p: 4190, i1: 62, i2: 79, c: 'g', label: 'T2 · HTF BSL 4,190', at: 6 }]),
      info: { k: '11.4 · BULLISH EXAMPLE', h: 'Nine steps', b: [[1, '1–2 HTF bullish; SSL at prior session low 4,135', 'c'], [2, '3–4 Prior-session profile: POC 4,155 · VA 4,144–4,160', 'y'], [3, '5–7 Sweep to 4,110 fails; price re-enters value (possible rejection)', 'y'], [4, '8 SMC: close above 4,155 swing high = CHoCH', 'g'], [5, '9 Entry 4,155 on retest (POC) · stop 4,133', 'w'], [6, 'T1 4,170 · T2 4,190 · RR to T2 ≈ 1.6', 'c']], note: { at: 7, label: 'Note', text: 'Here POC and the CHoCH level coincide at 4,155. They are recorded as **two observations**, not one "confirmed" level.' } },
      say: [
        ['A bullish Volume Profile plus S M C example, in nine steps.', 'Contoh bullish Volume Profile + SMC, dalam sembilan langkah.'],
        ['Steps one and two: higher-timeframe context is bullish, and sell-side liquidity rests below the prior session low at four thousand one hundred and thirty-five.', 'Langkah satu dan dua: konteks higher timeframe adalah bullish, dan sell-side liquidity berada di bawah low sesi sebelumnya pada 4,135.'],
        ['Steps three and four: the prior-session profile gives a P O C of four thousand one hundred and fifty-five, and a value area of four thousand one hundred and forty-four to four thousand one hundred and sixty.', 'Langkah tiga dan empat: profile sesi sebelumnya memberikan POC 4,155, dan value area 4,144 hingga 4,160.'],
        ['Steps five to seven: price sweeps the liquidity to four thousand one hundred and ten, fails to build acceptance below, and re-enters value. A possible rejection.', 'Langkah lima hingga tujuh: harga menyapu liquidity ke 4,110, gagal membina acceptance di bawah, dan kembali ke dalam value. Kemungkinan rejection.'],
        ['Step eight, S M C confirmation: price closes above the four thousand one hundred and fifty-five swing high. A change of character.', 'Langkah lapan, pengesahan SMC: harga ditutup di atas swing high 4,155. Change of character.'],
        ['Step nine: entry on the retest at four thousand one hundred and fifty-five, with a stop at four thousand one hundred and thirty-three.', 'Langkah sembilan: entry semasa retest pada 4,155, dengan stop pada 4,133.'],
        ['Target one is the session high at four thousand one hundred and seventy; target two a higher-timeframe buy-side level at four thousand one hundred and ninety. The reward to target two is about one point six R.', 'Sasaran satu ialah high sesi pada 4,170; sasaran dua ialah paras buy-side higher timeframe pada 4,190. Ganjaran ke sasaran dua kira-kira 1.6R.'],
        ['Notice that the P O C and the change-of-character level coincide at four thousand one hundred and fifty-five. We record them as two observations, not one confirmed level.', 'Perhatikan bahawa POC dan paras change of character bertepatan pada 4,155. Kita rekodkan sebagai dua pemerhatian, bukan satu paras yang disahkan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bearish example',
      viz: ch('BEARISH · FCPO · 30M · HYPOTHETICAL', 'PROFILE + SMC', BEAR, [...sess, { t: 'profile', i1: 0, i2: 39, bin: 2, anchor: true, width: 110, at: 0, x2: 79, op: .8 },
        { t: 'hline', p: 4165, i1: 30, i2: 50, c: 'c', label: 'BSL · SESSION HIGH 4,165', at: 1, lx: 'l' }, { t: 'tag', i: 49, text: 'SWEEP · 4,190', c: 'c', at: 2 },
        { t: 'tag', i: 54, text: 'BACK IN VALUE', c: 'y', at: 3, off: 40 }, { t: 'hline', p: 4145, i1: 43, i2: 62, c: 'y', label: 'CHoCH < 4,145', at: 4, lx: 'l' },
        { t: 'hline', p: 4145, i1: 62, i2: 79, c: 'w', label: 'ENTRY 4,145', at: 5, dash: false, w: 1.5 }, { t: 'hline', p: 4167, i1: 58, i2: 79, c: 'r', label: 'STOP 4,167', at: 5 }, { t: 'hline', p: 4130, i1: 6, i2: 79, c: 'c', label: 'T1 · SESSION LOW 4,130', at: 6, lx: 'l' }, { t: 'hline', p: 4110, i1: 62, i2: 79, c: 'g', label: 'T2 · HTF SSL 4,110', at: 6 }], { range: [4095, 4200] }),
      info: { k: '11.5 · BEARISH EXAMPLE', h: 'The mirror case', b: [[1, 'HTF bearish; BSL above prior session high 4,165', 'c'], [2, 'Prior-session profile: POC 4,145 · VA 4,140–4,156', 'y'], [3, 'Sweep to 4,190 fails; price re-enters value (possible rejection of higher prices)', 'y'], [4, 'SMC: close below 4,145 swing low = bearish CHoCH', ''], [5, 'Entry 4,145 on retest · stop 4,167', 'w'], [6, 'T1 4,130 · T2 4,110 · RR to T2 ≈ 1.6', 'c']] },
      say: [
        ['The bearish example mirrors it.', 'Contoh bearish mencerminkannya.'],
        ['Higher-timeframe context is bearish, and buy-side liquidity rests above the prior session high at four thousand one hundred and sixty-five.', 'Konteks higher timeframe adalah bearish, dan buy-side liquidity berada di atas high sesi sebelumnya pada 4,165.'],
        ['The prior-session profile gives a P O C of four thousand one hundred and forty-five, and value from four thousand one hundred and forty to four thousand one hundred and fifty-six.', 'Profile sesi sebelumnya memberikan POC 4,145, dan value dari 4,140 hingga 4,156.'],
        ['Price sweeps to four thousand one hundred and ninety, fails to build acceptance above, and re-enters value. A possible rejection of higher prices.', 'Harga menyapu ke 4,190, gagal membina acceptance di atas, dan kembali ke dalam value. Kemungkinan rejection terhadap harga lebih tinggi.'],
        ['Price then closes below the four thousand one hundred and forty-five swing low: a bearish change of character.', 'Harga kemudian ditutup di bawah swing low 4,145: bearish change of character.'],
        ['Entry is on the retest at four thousand one hundred and forty-five, with a stop at four thousand one hundred and sixty-seven, targeting four thousand one hundred and thirty, then four thousand one hundred and ten.', 'Entry semasa retest pada 4,145, dengan stop pada 4,167, menyasarkan 4,130, kemudian 4,110.'],
      ],
    },
    {
      tpl: 'cards', label: 'Common mistakes', kicker: '11.6 · COMMON VOLUME PROFILE MISTAKES', h: 'Eight mistakes to avoid', cols: 4, top: 170, ch: 210,
      cards: [
        { n: '01', nc: 'red2', t: 'POC = guaranteed S/R', b: 'It is a reference only.', at: 1 },
        { n: '02', nc: 'red2', t: 'HVN = Order Block', b: 'Different definitions.', at: 1 },
        { n: '03', nc: 'red2', t: 'LVN = FVG', b: 'Volume vs price gap.', at: 2 },
        { n: '04', nc: 'red2', t: 'Inconsistent ranges', b: 'State type and range.', at: 2 },
        { n: '05', nc: 'red2', t: 'Ignoring data source', b: 'Tick vs bar approximation.', at: 3 },
        { n: '06', nc: 'red2', t: 'All platforms identical', b: 'Rows and VA methods differ.', at: 3 },
        { n: '07', nc: 'red2', t: 'VAH/VAL = reversal', b: 'Not automatic reversal levels.', at: 4 },
        { n: '08', nc: 'red2', t: 'Ignoring structure', b: 'Profile needs market context.', at: 4 },
      ],
      say: [
        ['Eight common Volume Profile mistakes.', 'Lapan kesilapan biasa Volume Profile.'],
        ['Treating the P O C as guaranteed support or resistance, and treating an H V N as an Order Block.', 'Menganggap POC sebagai support atau resistance yang dijamin, dan menganggap HVN sebagai Order Block.'],
        ['Treating an L V N as a fair value gap, and using inconsistent profile ranges.', 'Menganggap LVN sebagai fair value gap, dan menggunakan julat profile yang tidak konsisten.'],
        ['Ignoring the data source, and assuming all platforms calculate profiles identically.', 'Mengabaikan sumber data, dan menganggap semua platform mengira profile dengan cara yang sama.'],
        ['Treating the value area edges as automatic reversal levels, and ignoring the broader market structure.', 'Menganggap tepi value area sebagai paras pembalikan automatik, dan mengabaikan struktur pasaran yang lebih luas.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercise 12', kicker: 'EXERCISE 12', h: 'Integrate SMC with Volume Profile', cols: 2, top: 180, ch: 360,
      cards: [
        { n: 'TASK', t: 'One FCPO session, two lenses', b: 'Build the prior-session profile (state platform, rows, session template). Mark POC, VAH, VAL. Then mark SMC structure, liquidity and your POI. Write a plan with entry, stop, target and invalidation.', at: 1 },
        { n: 'ANSWER GUIDE', nc: 'green2', t: 'What a good answer shows', b: 'Profile and SMC levels listed separately; coincidences noted, not merged; acceptance/rejection judged over several bars; a "no trade" outcome accepted if conditions are not met.', at: 2 },
      ],
      say: [
        ['Exercise Twelve: integrate S M C with Volume Profile on one F C P O session.', 'Latihan 12: integrasikan SMC dengan Volume Profile pada satu sesi FCPO.'],
        ['Build the prior-session profile, stating your platform, row size and session template. Mark the P O C and value area. Then mark S M C structure, liquidity and your point of interest, and write a full plan.', 'Bina profile sesi sebelumnya, nyatakan platform, saiz baris dan templat sesi anda. Tandakan POC dan value area. Kemudian tandakan struktur SMC, liquidity dan POI anda, dan tulis pelan yang lengkap.'],
        ['A good answer lists profile and S M C levels separately, notes coincidences without merging them, judges acceptance over several bars, and accepts a no-trade outcome if conditions are not met.', 'Jawapan yang baik menyenaraikan paras profile dan SMC secara berasingan, mencatat kebetulan tanpa menggabungkannya, menilai acceptance merentasi beberapa bar, dan menerima keputusan tidak berdagang jika syarat tidak dipenuhi.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'How can SMC and Volume Profile complement each other?',
      opts: ['By treating POC as an Order Block', 'SMC gives structure and liquidity; the profile adds where volume was accepted or rejected — each keeps its own definition', 'By replacing SMC with profile levels', 'They cannot be used together'], ans: 1, ansAt: 1,
      expl: 'Complementary information, separate definitions. Coincident levels are recorded as two observations.',
      say: [
        ['Knowledge check. How can S M C and Volume Profile complement each other?', 'Semakan pengetahuan. Bagaimana SMC dan Volume Profile boleh saling melengkapi?', { p: 1.5 }],
        ['The answer is B. S M C gives structure and liquidity; the profile adds where volume was accepted or rejected. Each keeps its own definition.', 'Jawapannya ialah B. SMC memberikan struktur dan liquidity; profile menambah di mana volume diterima atau ditolak. Setiap satu mengekalkan definisinya sendiri.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Advanced Volume Profile + SMC — what to remember',
      items: [[0, 'Five profile types: session, fixed, visible, periodic, composite'], [1, 'The range changes POC, VA, HVN and LVN'], [2, 'Acceptance and rejection need time'], [3, 'Moves beyond VAH/VAL are not automatically breakouts'], [4, 'Profile adds context to SMC — not certainty'], [5, 'Coinciding levels = two observations', 'w'], [6, 'Plan entry, stop, targets, invalidation', 'w'], [7, 'Avoid the eight common mistakes', 'w']],
      say: [
        ['To summarise. There are five profile types: session, fixed range, visible range, periodic and composite.', 'Sebagai rumusan. Terdapat lima jenis profile: session, fixed range, visible range, periodic dan composite.'],
        ['The range changes the P O C, value area and nodes.', 'Julat mengubah POC, value area dan node.'],
        ['Acceptance and rejection need time.', 'Acceptance dan rejection memerlukan masa.'],
        ['Moves beyond the value area are not automatically breakouts.', 'Pergerakan melepasi value area bukan secara automatik breakout.'],
        ['The profile adds context to S M C, not certainty.', 'Profile menambah konteks kepada SMC, bukan kepastian.'],
        ['Coinciding levels are two observations.', 'Paras yang bertepatan ialah dua pemerhatian.'],
        ['Plan entry, stop, targets and invalidation.', 'Rancang entry, stop, sasaran dan pembatalan.'],
        ['And avoid the eight common mistakes.', 'Dan elakkan lapan kesilapan biasa.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 5', h: 'Everything together — on FCPO',
      chips: [[0, 'FCPO market overview', 'Contract, sessions, months'], [0, 'Data preparation', 'Active vs continuous, rollover'], [0, 'Seven case studies', 'Including no-trade']],
      nk: 'NEXT · VIDEO 12', nt: 'FCPO Professional Case Studies', nAt: 1, ny: 420,
      say: [
        ['That completes Subtopic Four. In Video Twelve, Subtopic Five brings every method together on F C P O, in seven structured case studies, including a no-trade scenario.', 'Itu melengkapkan Subtopik 4. Dalam Video 12, Subtopik 5 menghimpunkan setiap kaedah pada FCPO, dalam tujuh kajian kes berstruktur, termasuk senario tanpa dagangan.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga dan profile FCPO dalam video ini ialah ilustrasi hipotetikal. Rujukan: TradingView — Session, Fixed Range dan Periodic Volume Profile.', foot: 'Seterusnya: Video 12 — FCPO Professional Case Studies',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
