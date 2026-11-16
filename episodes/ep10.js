/* VIDEO 10 — Volume Profile Foundations
   Subtopic 4 · SMC + Volume Profile — sections A (Introduction), B (POC), C (Value Area), D (HVN), E (LVN). */
const VPD = { seed: 1010, n: 72, way: [[0, 4096], [5, 4104], [10, 4094], [15, 4102], [18, 4106], [21, 4134], [24, 4148], [30, 4142], [36, 4156], [42, 4146], [48, 4154], [54, 4144], [60, 4152], [66, 4146], [71, 4150]], noise: 4, wick: 5, vr: [[18, 21, 0.6]] };
// Profile (computed by the engine, 2-point bins, 70%): POC 4,149 · VAH 4,164 · VAL 4,134 · total 75,761
const base = (title, tag, ann, extra = {}) => ({ type: 'candles', title, tag, data: VPD, slots: 96, range: [4070, 4180], volH: 70, reveal: [[0, 71, 2]], ann, ...extra });

EP({
  num: '10', short: 'Volume Profile Foundations', title: 'Volume Profile Foundations',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 10 · SUBTOPIC 4 · SMC + VOLUME PROFILE',
      h: 'Volume Profile Foundations', sub: 'Volume across price · POC · Value Area · HVN · LVN',
      obj: [[1, 'Explain how Volume Profile differs from ordinary volume bars'], [2, 'Define POC, VAH, VAL and the 70% value-area convention'], [3, 'Identify HVNs and LVNs — and what they are not'], [4, 'Distinguish Volume Profile, Market Profile and TPO']],
      viz: { ...base('VOLUME PROFILE · HYPOTHETICAL', '', [{ t: 'profile', i1: 0, i2: 71, bin: 2, side: 'right', width: 230, at: 0, d: 1.5, lines: false }], { volH: 0, vol: false, noAxis: true, slots: 110 }) },
      say: [
        ['Welcome to Video Ten. Subtopic Four is S M C plus Volume Profile.', 'Selamat datang ke Video 10. Subtopik 4 ialah SMC + Volume Profile.'],
        ['So far, volume has been shown over time, as a bar under each candle. Volume Profile shows volume over price.', 'Setakat ini, volume ditunjukkan mengikut masa, sebagai bar di bawah setiap candle. Volume Profile menunjukkan volume mengikut harga.'],
        ['In this video: how a profile is built, the point of control, the value area, and high- and low-volume nodes.', 'Dalam video ini: bagaimana profile dibina, point of control, value area, serta high dan low volume node.'],
        ['As before, we learn each concept on its own terms, and we will not confuse it with S M C concepts that look similar.', 'Seperti sebelum ini, kita mempelajari setiap konsep mengikut asasnya sendiri, dan kita tidak akan mengelirukannya dengan konsep SMC yang kelihatan serupa.'],
      ],
    },
    {
      tpl: 'split', label: 'Volume over price',
      a: base('ORDINARY VOLUME · BY TIME', 'VOLUME UNDER EACH BAR', [], { volH: 130, slots: 74 }),
      b: base('VOLUME PROFILE · BY PRICE', 'HORIZONTAL HISTOGRAM', [{ t: 'profile', i1: 0, i2: 71, bin: 2, side: 'right', width: 220, at: 1, lines: false }], { vol: false, volH: 0, slots: 110 }),
      calc: [[2, 'Same 72 bars · same 75,761 contracts · {g}different question{/}'], [3, 'Time view: {m}when{/} was it traded? · Price view: {c}where{/} was it traded?']],
      say: [
        ['On the left, ordinary volume: one bar per time period, under each candle.', 'Di sebelah kiri, volume biasa: satu bar bagi setiap tempoh masa, di bawah setiap candle.'],
        ['On the right, the same data as a Volume Profile: a horizontal histogram showing how much traded at each price.', 'Di sebelah kanan, data yang sama sebagai Volume Profile: histogram mendatar yang menunjukkan berapa banyak didagangkan pada setiap harga.'],
        ['Same seventy-two bars, same total volume. A different question.', 'Tujuh puluh dua bar yang sama, jumlah volume yang sama. Soalan yang berbeza.'],
        ['Ordinary volume asks when it was traded. Volume Profile asks where it was traded.', 'Volume biasa bertanya bila ia didagangkan. Volume Profile bertanya di mana ia didagangkan.'],
      ],
    },
    {
      tpl: 'cards', label: 'How a profile is built', kicker: '10.1 · HOW IT IS BUILT', h: 'Building a profile', cols: 3, top: 190, ch: 300,
      cards: [
        { n: '01', t: 'Choose a range', b: 'A session, a fixed set of bars, the visible chart, or many sessions combined.', at: 1 },
        { n: '02', t: 'Assign volume to prices', b: 'With tick data: each trade at its actual price. With bar data: an approximation, e.g. spread evenly across each bar\'s range.', at: 2 },
        { n: '03', t: 'Group into rows', b: 'Prices are grouped into rows ("bins"). Row size changes the shape. This video uses 2-point rows.', at: 3 },
      ],
      note: { at: 4, y: 540, label: 'What high traded volume represents', text: 'A price with high traded volume is a price where **much two-way trade occurred** — often described as participation or acceptance. It does not say who traded or why.' },
      say: [
        ['How is a profile built? Three steps.', 'Bagaimana profile dibina? Tiga langkah.'],
        ['First, choose a range: a session, a fixed set of bars, the visible chart, or many sessions combined.', 'Pertama, pilih julat: satu sesi, set bar yang tetap, chart yang kelihatan, atau gabungan banyak sesi.'],
        ['Second, assign volume to prices. With tick data, each trade is placed at its actual price. With bar data, it is an approximation; this illustration spreads each bar\'s volume evenly across its range.', 'Kedua, tetapkan volume kepada harga. Dengan data tick, setiap dagangan diletakkan pada harga sebenarnya. Dengan data bar, ia ialah anggaran; ilustrasi ini menyebarkan volume setiap bar secara sekata merentasi julatnya.'],
        ['Third, group prices into rows, or bins. Row size changes the shape. This video uses two-point rows.', 'Ketiga, kumpulkan harga ke dalam baris, atau bin. Saiz baris mengubah bentuknya. Video ini menggunakan baris dua mata.'],
        ['A price with high traded volume is where much two-way trade occurred, often described as participation or acceptance. It does not say who traded, or why.', 'Harga dengan volume dagangan yang tinggi ialah tempat banyak dagangan dua hala berlaku, sering digambarkan sebagai penyertaan atau acceptance. Ia tidak memberitahu siapa yang berdagang, atau mengapa.'],
      ],
    },
    {
      tpl: 'table', label: 'Profile vs Market Profile', kicker: '10.2 · NOT THE SAME TOOL', h: 'Volume Profile, Market Profile, TPO and volume histogram', cols: ['Tool', 'Measures', 'Built from'], widths: [420, 640, 600], hs: 36,
      rows: [
        [1, 'Volume Profile', 'Traded volume at each price', 'Trade (or bar) volume'],
        [2, 'Market Profile', 'Time spent at each price, organised by session', 'Time Price Opportunities (TPOs)'],
        [2, 'TPO', 'One letter/block per time period that traded at a price', 'Price touches per period — not volume'],
        [3, 'Ordinary volume histogram', 'Volume per time period', 'Bar volume on the time axis'],
      ],
      note: { at: 4, label: 'Why it matters', text: 'A TPO-based value area and a volume-based value area can differ for the same session. Always state which tool you are using.' },
      say: [
        ['Several tools look similar, but measure different things.', 'Beberapa alat kelihatan serupa, tetapi mengukur perkara yang berbeza.'],
        ['Volume Profile measures traded volume at each price.', 'Volume Profile mengukur volume yang didagangkan pada setiap harga.'],
        ['Market Profile measures time spent at each price, organised by session, using Time Price Opportunities, or T P Os. A T P O is one block for each time period that traded at a price. It counts time, not volume.', 'Market Profile mengukur masa yang dihabiskan pada setiap harga, disusun mengikut sesi, menggunakan Time Price Opportunities, atau TPO. TPO ialah satu blok bagi setiap tempoh masa yang didagangkan pada sesuatu harga. Ia mengira masa, bukan volume.'],
        ['An ordinary volume histogram is volume per time period, on the time axis.', 'Histogram volume biasa ialah volume bagi setiap tempoh masa, pada paksi masa.'],
        ['A T P O-based value area and a volume-based value area can differ for the same session. Always state which tool you are using.', 'Value area berasaskan TPO dan value area berasaskan volume boleh berbeza bagi sesi yang sama. Sentiasa nyatakan alat yang anda gunakan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Point of Control',
      viz: base('FCPO · 30M · HYPOTHETICAL', 'POINT OF CONTROL', [{ t: 'profile', i1: 0, i2: 71, bin: 2, side: 'right', width: 230, at: 0, lines: false }, { t: 'hline', p: 4149, c: 'y', label: 'POC 4,149', at: 1, dash: false }]),
      info: { k: '10.3 · POC', h: 'Point of Control', b: [[1, 'The price row with the **highest traded volume** in the selected profile', 'y'], [2, 'Here: the 4,148–4,150 row → POC ≈ **4,149**', 'y'], [3, 'Often described as the price of greatest participation in that range', 'c'], [4, 'Change the range → the POC can change', 'a']], note: { at: 5, c: 'r', label: 'Not guaranteed', text: 'POC is a **reference**, not guaranteed support or resistance. Price may react there, trade straight through, or ignore it.' } },
      say: [
        ['The point of control, or P O C, is the price row with the highest traded volume in the selected profile.', 'Point of control, atau POC, ialah baris harga dengan volume dagangan tertinggi dalam profile yang dipilih.'],
        ['Here, the four thousand one hundred and forty-eight to fifty row holds the most volume, so the P O C is about four thousand one hundred and forty-nine.', 'Di sini, baris 4,148 hingga 4,150 memegang volume paling banyak, jadi POC ialah kira-kira 4,149.'],
        ['It is often described as the price of greatest participation within that range.', 'Ia sering digambarkan sebagai harga dengan penyertaan terbesar dalam julat tersebut.'],
        ['Change the range, and the P O C can change.', 'Ubah julat, dan POC boleh berubah.'],
        ['And P O C is a reference, not guaranteed support or resistance. Price may react there, trade straight through it, or ignore it.', 'Dan POC ialah rujukan, bukan support atau resistance yang dijamin. Harga mungkin bertindak balas di situ, melepasinya terus, atau mengabaikannya.'],
      ],
    },
    {
      tpl: 'viz', label: 'Types of POC',
      viz: { type: 'lines', title: 'POC ACROSS FIVE SESSIONS · HYPOTHETICAL', tag: 'POC MIGRATION', series: [{ pts: [[0, 25], [20, 25], [20, 38], [40, 38], [40, 55], [60, 55], [60, 52], [80, 52], [80, 72], [100, 72]], c: 'y', at: 4, dur: 2.5 }], texts: [{ x: 10, y: 19, text: 'S1 · 4,102', c: 'y', mono: true, at: 4 }, { x: 30, y: 32, text: 'S2 · 4,118', c: 'y', mono: true, at: 4, d: .5 }, { x: 50, y: 49, text: 'S3 · 4,141', c: 'y', mono: true, at: 4, d: 1 }, { x: 70, y: 46, text: 'S4 · 4,137', c: 'y', mono: true, at: 4, d: 1.5 }, { x: 90, y: 66, text: 'S5 · 4,163', c: 'y', mono: true, at: 4, d: 2 }, { x: 50, y: 92, text: 'Rising POCs: trade is accepted at progressively higher prices', c: 'g', at: 5 }] },
      info: { k: '10.3 · TYPES OF POC', h: 'Developing, session, composite', b: [[1, '**Developing POC:** updates bar by bar as the session trades', 'y'], [2, '**Session POC:** final POC of one completed session', 'y'], [3, '**Composite POC:** POC of many sessions combined', 'c'], [4, '**POC migration:** how session POCs move over time', 'g']], note: { at: 6, label: 'Caution', text: 'A developing POC can jump as new volume arrives. Using a final POC for decisions made earlier in the session is look-ahead bias.' } },
      say: [
        ['There are several kinds of P O C.', 'Terdapat beberapa jenis POC.'],
        ['A developing P O C updates bar by bar as the session trades.', 'Developing POC dikemas kini bar demi bar ketika sesi berdagang.'],
        ['A session P O C is the final P O C of one completed session.', 'Session POC ialah POC akhir bagi satu sesi yang telah selesai.'],
        ['A composite P O C is the P O C of many sessions combined.', 'Composite POC ialah POC bagi gabungan banyak sesi.'],
        ['And P O C migration describes how session P O Cs move over time. In this hypothetical example, they step from four thousand one hundred and two up to four thousand one hundred and sixty-three.', 'Dan POC migration menggambarkan bagaimana POC sesi bergerak dari semasa ke semasa. Dalam contoh hipotetikal ini, ia meningkat dari 4,102 hingga 4,163.'],
        ['Rising P O Cs suggest that trade is being accepted at progressively higher prices.', 'POC yang meningkat menunjukkan dagangan diterima pada harga yang semakin tinggi.'],
        ['One caution: a developing P O C can jump. Using a final P O C for decisions made earlier in the session is look-ahead bias.', 'Satu peringatan: developing POC boleh melompat. Menggunakan POC akhir untuk keputusan yang dibuat lebih awal dalam sesi ialah look-ahead bias.'],
      ],
    },
    {
      tpl: 'formula', label: 'Value Area', kicker: '10.4 · VALUE AREA', h: 'The value area: where about 70% of volume traded', fs: 26,
      lines: [
        [1, 'Total profile volume          = {g}75,761{/} contracts'],
        [2, '70% target                    = 0.70 × 75,761 = {g}53,033{/}'],
        [3, 'Start at the POC row; add the larger adjacent row, repeat'],
        [4, 'Stop when ≥ 70% is included   → {c}70.6%{/}'],
        [5, 'VAH = {c}4,164{/}     VAL = {c}4,134{/}', 'big'],
      ],
      viz: base('VALUE AREA · HYPOTHETICAL', '', [{ t: 'profile', i1: 0, i2: 71, bin: 2, side: 'right', width: 200, at: 0, atLines: 5 }], { vol: false, volH: 0, slots: 100, noAxis: false }),
      note: { at: 6, label: 'Convention', text: 'The 70% value area is a widely used **convention** (about one standard deviation in a normal distribution). It is not a law of markets.' },
      say: [
        ['The value area is the price range where about seventy percent of the profile\'s volume traded.', 'Value area ialah julat harga di mana kira-kira 70 peratus volume profile didagangkan.'],
        ['In our profile, total volume is seventy-five thousand, seven hundred and sixty-one contracts.', 'Dalam profile kita, jumlah volume ialah 75,761 kontrak.'],
        ['Seventy percent of that is fifty-three thousand and thirty-three.', 'Tujuh puluh peratus daripadanya ialah 53,033.'],
        ['One common method starts at the P O C row, then adds the larger of the adjacent rows above or below, and repeats.', 'Satu kaedah biasa bermula pada baris POC, kemudian menambah baris bersebelahan yang lebih besar sama ada di atas atau di bawah, dan mengulanginya.'],
        ['It stops once at least seventy percent is included; here, seventy point six percent.', 'Ia berhenti apabila sekurang-kurangnya 70 peratus disertakan; di sini, 70.6 peratus.'],
        ['The top of that range is the Value Area High, four thousand one hundred and sixty-four. The bottom is the Value Area Low, four thousand one hundred and thirty-four.', 'Bahagian atas julat itu ialah Value Area High, 4,164. Bahagian bawahnya ialah Value Area Low, 4,134.'],
        ['The seventy percent value area is a widely used convention, roughly one standard deviation in a normal distribution. It is not a law of markets.', 'Value area 70 peratus ialah konvensyen yang digunakan secara meluas, lebih kurang satu sisihan piawai dalam taburan normal. Ia bukan hukum pasaran.'],
      ],
    },
    {
      tpl: 'cards', label: 'Platform differences', kicker: '10.4 · CALCULATION DIFFERENCES', h: 'Why VAH and VAL differ between platforms', cols: 4, top: 180, ch: 300,
      cards: [
        { n: 'DATA', t: 'Tick vs bar data', b: 'Actual trade prices vs volume spread across bar ranges.', at: 1 },
        { n: 'ROWS', t: 'Row size', b: '1-tick vs 2-point vs auto rows change the shape.', at: 2 },
        { n: 'METHOD', t: 'Expansion rule', b: 'Compare one row or two rows at a time; volume- or TPO-based.', at: 3 },
        { n: 'RANGE', t: 'Profile period', b: 'Session template, start/end time, contract roll.', at: 4 },
      ],
      note: { at: 5, y: 540, label: 'Practice', text: 'Small differences of a few ticks are normal. State your platform and settings, and use them consistently in testing and trading.' },
      say: [
        ['Why do value areas differ between platforms? Four reasons.', 'Mengapa value area berbeza antara platform? Empat sebab.'],
        ['Data: actual tick prices versus volume spread across bar ranges.', 'Data: harga tick sebenar berbanding volume yang disebarkan merentasi julat bar.'],
        ['Row size: one-tick rows versus larger rows change the shape.', 'Saiz baris: baris satu tick berbanding baris yang lebih besar mengubah bentuknya.'],
        ['Method: some compare one row at a time, others two rows; some are volume-based, others T P O-based.', 'Kaedah: sesetengah membandingkan satu baris pada satu masa, yang lain dua baris; sesetengah berasaskan volume, yang lain berasaskan TPO.'],
        ['And range: the session template, start and end times, and contract roll.', 'Dan julat: templat sesi, masa mula dan tamat, dan roll kontrak.'],
        ['Small differences are normal. State your settings, and use them consistently.', 'Perbezaan kecil adalah normal. Nyatakan tetapan anda, dan gunakannya secara konsisten.'],
      ],
    },
    {
      tpl: 'viz', label: 'HVN',
      viz: base('FCPO · 30M · HYPOTHETICAL', 'HIGH VOLUME NODES', [{ t: 'profile', i1: 0, i2: 71, bin: 2, side: 'right', width: 230, at: 0, lines: false }, { t: 'zone', p1: 4144, p2: 4154, c: 'b', label: 'HVN 1 · 4,144–4,154', at: 1, lx: 'l', op: .16 }, { t: 'zone', p1: 4096, p2: 4104, c: 'b', label: 'HVN 2 · 4,096–4,104', at: 2, lx: 'l', op: .16 }]),
      info: { k: '10.5 · HVN', h: 'High Volume Node', b: [[1, 'A price **region** with high traded volume — a "peak" in the profile', 'c'], [2, 'Forms where price spends time trading two ways', 'c'], [3, 'May relate to acceptance and balance', 'c'], [4, 'Price may slow, rotate or consolidate around an HVN', 'y']], note: { at: 5, c: 'r', label: 'Not an Order Block', text: 'An HVN describes volume distribution. It is **not automatically** an Order Block, demand zone or supply zone.' } },
      say: [
        ['A High Volume Node, or H V N, is a price region with high traded volume: a peak in the profile.', 'High Volume Node, atau HVN, ialah kawasan harga dengan volume dagangan yang tinggi: puncak dalam profile.'],
        ['This profile has two. The upper one, around the P O C, from four thousand one hundred and forty-four to four thousand one hundred and fifty-four.', 'Profile ini mempunyai dua. Yang atas, di sekitar POC, dari 4,144 hingga 4,154.'],
        ['And a lower one, from four thousand and ninety-six to four thousand one hundred and four. Each forms where price spent time trading two ways.', 'Dan yang bawah, dari 4,096 hingga 4,104. Setiap satu terbentuk di mana harga menghabiskan masa berdagang dua hala.'],
        ['H V Ns may relate to acceptance and balance. Price often slows, rotates or consolidates around them.', 'HVN mungkin berkaitan dengan acceptance dan keseimbangan. Harga sering perlahan, berputar atau berkonsolidasi di sekitarnya.'],
        ['But an H V N describes volume distribution. It is not automatically an Order Block, a demand zone or a supply zone.', 'Tetapi HVN menggambarkan taburan volume. Ia bukan secara automatik Order Block, zon demand atau zon supply.'],
      ],
    },
    {
      tpl: 'viz', label: 'LVN',
      viz: base('FCPO · 30M · HYPOTHETICAL', 'LOW VOLUME NODE', [{ t: 'profile', i1: 0, i2: 71, bin: 2, side: 'right', width: 230, at: 0, lines: false }, { t: 'zone', p1: 4114, p2: 4126, c: 'p', label: 'LVN · 4,114–4,126', at: 1, lx: 'l', op: .16 }, { t: 'chl', i: [19, 20, 21], c: 'p', at: 2 }]),
      info: { k: '10.6 · LVN', h: 'Low Volume Node', b: [[1, 'A price region with **low traded volume** — a "valley" in the profile', 'p'], [2, 'Here price moved through quickly: few bars, little two-way trade', 'p'], [3, 'May relate to reduced historical participation', 'p'], [4, 'On a revisit, price **may** move quickly through — or may be rejected, or accepted', 'y']], note: { at: 5, c: 'r', label: 'Not an FVG', text: 'An LVN is low traded volume across price. It does **not** guarantee rapid movement, and it is **not automatically** a Fair Value Gap — an FVG is a specific three-candle price pattern.' } },
      say: [
        ['A Low Volume Node, or L V N, is a price region with low traded volume: a valley in the profile.', 'Low Volume Node, atau LVN, ialah kawasan harga dengan volume dagangan yang rendah: lembah dalam profile.'],
        ['Here, from four thousand one hundred and fourteen to four thousand one hundred and twenty-six, price moved through quickly, in only a few bars.', 'Di sini, dari 4,114 hingga 4,126, harga bergerak melaluinya dengan pantas, dalam beberapa bar sahaja.'],
        ['An L V N may relate to reduced historical participation at those prices.', 'LVN mungkin berkaitan dengan penyertaan sejarah yang berkurangan pada harga tersebut.'],
        ['On a revisit, price may move quickly through it again. But it may also be rejected, or become accepted.', 'Apabila dikunjungi semula, harga mungkin bergerak pantas melaluinya sekali lagi. Tetapi ia juga mungkin ditolak, atau menjadi diterima.'],
        ['An L V N does not guarantee rapid movement, and it is not automatically a Fair Value Gap, which is a specific three-candle price pattern.', 'LVN tidak menjamin pergerakan pantas, dan ia bukan secara automatik Fair Value Gap, yang merupakan corak harga tiga candle yang khusus.'],
      ],
    },
    {
      tpl: 'table', label: 'Profile ≠ SMC', kicker: '10.7 · TECHNICAL ACCURACY', h: 'Volume Profile levels are not SMC labels', cols: ['Profile concept', 'Not automatically…', 'Because…'], widths: [330, 440, 890], hs: 38,
      rows: [
        [1, 'POC', 'an Order Block', 'POC is the highest-volume price; an OB is defined by price action'],
        [2, 'HVN', 'demand or supply', 'HVN is two-way trade; demand/supply zones are directional price-action zones'],
        [3, 'LVN', 'a Fair Value Gap', 'LVN is low volume across price; an FVG is a three-candle gap'],
        [4, 'VAH / VAL', 'BSL / SSL', 'VA edges are volume-percentile boundaries, not stop clusters'],
      ],
      warnLast: false,
      note: { at: 5, label: 'Integration', text: 'When a profile level and an SMC level **coincide**, record both separately. Their agreement is information — not proof.' },
      say: [
        ['Technical accuracy matters here. Volume Profile levels are not S M C labels.', 'Ketepatan teknikal penting di sini. Paras Volume Profile bukan label SMC.'],
        ['A P O C is not automatically an Order Block. P O C is the highest-volume price; an Order Block is defined by price action.', 'POC bukan secara automatik Order Block. POC ialah harga dengan volume tertinggi; Order Block ditentukan oleh price action.'],
        ['An H V N is not automatically demand or supply. It reflects two-way trade.', 'HVN bukan secara automatik demand atau supply. Ia mencerminkan dagangan dua hala.'],
        ['An L V N is not automatically a Fair Value Gap.', 'LVN bukan secara automatik Fair Value Gap.'],
        ['And the value area edges are not automatically buy-side or sell-side liquidity. They are volume-percentile boundaries, not stop clusters.', 'Dan tepi value area bukan secara automatik buy-side atau sell-side liquidity. Ia sempadan persentil volume, bukan kelompok stop.'],
        ['When a profile level and an S M C level coincide, record both separately. Their agreement is information, not proof.', 'Apabila paras profile dan paras SMC bertepatan, rekodkan kedua-duanya secara berasingan. Persetujuan mereka ialah maklumat, bukan bukti.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercises 10–11', kicker: 'EXERCISES 10 & 11', h: 'Map POC, VAH and VAL · Identify HVN and LVN', cols: 2, top: 180, ch: 360,
      cards: [
        { n: 'EX 10', t: 'Map POC, VAH and VAL', b: 'A profile has rows (price: volume): 4,100: 900 · 4,102: 2,600 · 4,104: 4,100 · 4,106: 2,900 · 4,108: 1,000 · 4,110: 500. Find the POC and the 70% value area using the one-row method.', at: 1, foot: 'Total 12,000 · target 8,400 · POC 4,104 · VA 4,102–4,106 (80.0%)', fc: 'green2' },
        { n: 'EX 11', t: 'Identify HVN and LVN', b: 'On a 5-session FCPO composite profile, mark two HVNs and one LVN. For each, note whether it coincides with any SMC level — and record them as separate observations.', at: 2, foot: 'State range, row size and data source', fc: 'green2' },
      ],
      say: [
        ['Exercises Ten and Eleven.', 'Latihan 10 dan 11.'],
        ['Exercise Ten. Total volume is twelve thousand, so the seventy percent target is eight thousand four hundred. The P O C is four thousand one hundred and four. Adding the larger neighbour, four thousand one hundred and six, gives seven thousand. Then four thousand one hundred and two gives nine thousand six hundred: eighty percent. So the value area is four thousand one hundred and two to four thousand one hundred and six.', 'Latihan 10. Jumlah volume ialah 12,000, jadi sasaran 70 peratus ialah 8,400. POC ialah 4,104. Menambah jiran yang lebih besar, 4,106, memberikan 7,000. Kemudian 4,102 memberikan 9,600: 80 peratus. Jadi value area ialah 4,102 hingga 4,106.'],
        ['Exercise Eleven: on a five-session F C P O composite, mark two H V Ns and one L V N, and note any S M C levels they coincide with, as separate observations.', 'Latihan 11: pada composite FCPO lima sesi, tandakan dua HVN dan satu LVN, dan catat sebarang paras SMC yang bertepatan, sebagai pemerhatian berasingan.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Why is an HVN not automatically an Order Block?',
      opts: ['Because HVNs only appear on daily charts', 'An HVN describes where much volume traded; an OB is a price-action zone with its own definition', 'Because Order Blocks have no volume', 'They are the same — it is an Order Block'], ans: 1, ansAt: 1,
      expl: 'Different tools, different definitions. A coincidence of the two is recorded, not assumed.',
      say: [
        ['Knowledge check. Why is an H V N not automatically an Order Block?', 'Semakan pengetahuan. Mengapa HVN bukan secara automatik Order Block?', { p: 1.5 }],
        ['The answer is B. An H V N describes where much volume traded. An Order Block is a price-action zone with its own definition.', 'Jawapannya ialah B. HVN menggambarkan di mana banyak volume didagangkan. Order Block ialah zon price action dengan definisinya sendiri.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is the difference between VAH and VAL?',
      opts: ['VAH is the highest price of the day; VAL the lowest', 'VAH and VAL are the upper and lower edges of the range containing ~70% of profile volume', 'VAH is buy-side liquidity; VAL is sell-side liquidity', 'There is no difference'], ans: 1, ansAt: 1,
      expl: 'They bound the value area. They are not the session high/low, and not automatically BSL/SSL.',
      say: [
        ['Second question. What is the difference between V A H and V A L?', 'Soalan kedua. Apakah perbezaan antara VAH dan VAL?', { p: 1.5 }],
        ['The answer is B. They are the upper and lower edges of the range containing about seventy percent of the profile\'s volume. They are not the session high and low, and not automatically liquidity.', 'Jawapannya ialah B. Ia ialah tepi atas dan bawah julat yang mengandungi kira-kira 70 peratus volume profile. Ia bukan high dan low sesi, dan bukan secara automatik liquidity.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Volume Profile foundations — what to remember',
      items: [[0, 'Volume Profile = volume by price, not by time'], [1, 'Profile ≠ Market Profile ≠ TPO'], [2, 'POC = highest-volume price row in the selected range'], [3, 'Developing, session and composite POC; migration'], [4, 'Value area ≈ 70% of volume — a convention'], [5, 'HVN = peak; LVN = valley'], [6, 'Settings change the levels — state them', 'w'], [7, 'Profile levels are not SMC labels', 'w']],
      say: [
        ['To summarise. Volume Profile shows volume by price, not by time.', 'Sebagai rumusan. Volume Profile menunjukkan volume mengikut harga, bukan mengikut masa.'],
        ['It is not the same as Market Profile or T P O.', 'Ia tidak sama dengan Market Profile atau TPO.'],
        ['The P O C is the highest-volume price row in the selected range.', 'POC ialah baris harga dengan volume tertinggi dalam julat yang dipilih.'],
        ['There are developing, session and composite P O Cs, and P O C migration.', 'Terdapat developing, session dan composite POC, serta POC migration.'],
        ['The value area holds about seventy percent of volume, by convention.', 'Value area memegang kira-kira 70 peratus volume, mengikut konvensyen.'],
        ['An H V N is a peak, and an L V N is a valley.', 'HVN ialah puncak, dan LVN ialah lembah.'],
        ['Settings change the levels, so state them.', 'Tetapan mengubah paras, jadi nyatakannya.'],
        ['And profile levels are not S M C labels.', 'Dan paras profile bukan label SMC.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 4', h: 'Profile types, acceptance — and SMC',
      chips: [[0, 'Five profile types', 'Session, fixed, visible, periodic, composite'], [0, 'Acceptance & rejection', 'Auction behaviour over time'], [0, 'Profile + SMC', 'Bullish and bearish examples']],
      nk: 'NEXT · VIDEO 11', nt: 'Advanced Volume Profile and SMC Integration', nAt: 1, ny: 420,
      say: [
        ['In Video Eleven, we cover five types of volume profile, acceptance and rejection, and integrate Volume Profile with S M C in bullish and bearish examples.', 'Dalam Video 11, kita merangkumi lima jenis volume profile, acceptance dan rejection, dan mengintegrasikan Volume Profile dengan SMC dalam contoh bullish dan bearish.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga dan profile FCPO dalam video ini ialah ilustrasi hipotetikal. Rujukan: TradingView — Volume Profile: Basic Concepts; CME Group — volume and liquidity education.', foot: 'Seterusnya: Video 11 — Advanced Volume Profile and SMC Integration',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
