/* VIDEO 08 — Advanced Order Flow
   Subtopic 3 · SMC + Order Flow — sections F (Footprint), G (Imbalance), H (Absorption), I (DOM), J (Time & Sales), M (mistakes, part). */
// Footprint columns: rows [price, bidVol, askVol]. All values hypothetical. Imbalance rule shown: diagonal, 300%.
const F1 = { label: 'BAR 1', o: 4100, c: 4104, rows: [[4105, 12, 18], [4104, 30, 44], [4103, 52, 61], [4102, 70, 88], [4101, 48, 40], [4100, 35, 22], [4099, 20, 8]] };
const F2 = { label: 'BAR 2', o: 4104, c: 4110, rows: [[4111, 5, 14], [4110, 10, 36], [4109, 14, 40], [4108, 8, 62], [4107, 12, 75], [4106, 15, 68], [4105, 20, 30], [4104, 26, 22], [4103, 18, 6]] };
const F3 = { label: 'BAR 3', o: 4110, c: 4108, rows: [[4113, 10, 25], [4112, 22, 30], [4111, 35, 28], [4110, 40, 33], [4109, 38, 20], [4108, 25, 12], [4107, 15, 6], [4106, 8, 2]] };
const AH1 = { label: 'BAR A', o: 4120, c: 4121, rows: [[4123, 40, 210], [4122, 65, 260], [4121, 80, 190], [4120, 60, 70], [4119, 30, 25], [4118, 15, 10]] };
const AH2 = { label: 'BAR B', o: 4121, c: 4114, rows: [[4122, 20, 15], [4121, 45, 30], [4120, 70, 40], [4119, 85, 35], [4118, 90, 30], [4117, 75, 22], [4116, 60, 18], [4115, 40, 10], [4114, 30, 8], [4113, 12, 4]] };
const AL1 = { label: 'BAR A', o: 4090, c: 4089, rows: [[4092, 10, 15], [4091, 25, 30], [4090, 70, 60], [4089, 190, 80], [4088, 260, 65], [4087, 210, 40]] };
const AL2 = { label: 'BAR B', o: 4089, c: 4096, rows: [[4097, 4, 12], [4096, 8, 30], [4095, 10, 40], [4094, 18, 60], [4093, 22, 75], [4092, 30, 90], [4091, 35, 85], [4090, 40, 70], [4089, 15, 45], [4088, 8, 20]] };
const P = [4104, 4103, 4102, 4101, 4100, 4099, 4098, 4097];
const BOOK = { 4104: [0, 20], 4103: [0, 18], 4102: [0, 15], 4101: [0, 8], 4100: [14, 0], 4099: [22, 0], 4098: [19, 0], 4097: [25, 0] };
const mod = ch => { const q = JSON.parse(JSON.stringify(BOOK)); for (const k in ch) q[k] = ch[k]; return q; };

EP({
  num: '08', short: 'Advanced Order Flow', title: 'Advanced Order Flow',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 08 · SUBTOPIC 3 · SMC + ORDER FLOW',
      h: 'Advanced Order Flow', sub: 'Footprint · Imbalance · Stacked imbalance · Absorption · DOM · Time & Sales · Data quality',
      obj: [[1, 'Read a footprint chart: bid × ask, volume at price, Delta'], [2, 'Identify diagonal and stacked imbalances — and their limits'], [3, 'Describe possible absorption without overstating it'], [4, 'Explain what DOM and Time & Sales can and cannot show']],
      viz: { type: 'footprint', title: 'FOOTPRINT · HYPOTHETICAL', cols: [F1, F2], ratio: 3 },
      say: [
        ['Welcome to Video Eight. We now look inside the candle.', 'Selamat datang ke Video 8. Kita kini melihat ke dalam candle.'],
        ['We will read footprint charts, find imbalances and stacked imbalances, and discuss absorption.', 'Kita akan membaca footprint chart, mencari imbalance dan stacked imbalance, dan membincangkan absorption.'],
        ['Then we study Depth of Market and Time and Sales, and what they can and cannot tell us.', 'Kemudian kita mengkaji Depth of Market dan Time and Sales, serta apa yang boleh dan tidak boleh diberitahu olehnya.'],
        ['Every number on screen in this video is hypothetical, and chosen to illustrate a definition precisely.', 'Setiap nombor di skrin dalam video ini adalah hipotetikal, dan dipilih untuk menggambarkan sesuatu definisi dengan tepat.'],
      ],
    },
    {
      tpl: 'split', label: 'Candle vs footprint',
      a: { type: 'candles', title: 'NORMAL CANDLE', tag: 'OHLC ONLY', bars: [{ o: 4100, h: 4105, l: 4099, c: 4104, v: 548 }], slots: 3, range: [4096, 4108], volH: 90, reveal: [[0, 0, .5]] },
      b: { type: 'footprint', title: 'SAME BAR · FOOTPRINT', tag: 'BID × ASK AT EVERY PRICE', cols: [F1], ratio: 3, imb: false },
      calc: [[2, 'Candle: open 4,100 · high 4,105 · low 4,099 · close 4,104 · volume 548'], [3, 'Footprint: {g}where{/} the 548 contracts traded, and on {g}which side{/}']],
      say: [
        ['On the left is a normal candle: open, high, low, close, and total volume of five hundred and forty-eight contracts.', 'Di sebelah kiri ialah candle biasa: open, high, low, close, dan jumlah volume sebanyak 548 kontrak.'],
        ['On the right is the same bar as a footprint. At every price, it shows bid volume on the left and ask volume on the right.', 'Di sebelah kanan ialah bar yang sama dalam bentuk footprint. Pada setiap harga, ia menunjukkan bid volume di kiri dan ask volume di kanan.'],
        ['The candle summarises the bar.', 'Candle meringkaskan bar itu.'],
        ['The footprint shows where those five hundred and forty-eight contracts traded, and on which side they were classified.', 'Footprint menunjukkan di mana 548 kontrak itu didagangkan, dan di pihak mana ia diklasifikasikan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Reading a footprint',
      viz: { type: 'footprint', title: 'FCPO · 5M FOOTPRINT · HYPOTHETICAL', tag: 'BID × ASK', cols: [{ ...F1, at: 0, d: 0 }, { ...F2, at: 0, d: .5 }, { ...F3, at: 0, d: 1 }], ratio: 3, imb: false, marks: [{ col: 0, p1: 4102, p2: 4102, c: 'y', label: 'BAR POC', at: 2 }] },
      info: { k: '8.1 · READING THE FOOTPRINT', h: 'Four things in every cell', b: [[1, '**Bid × ask:** volume classified as seller- vs buyer-initiated at that price', ''], [2, '**Volume at price:** bid + ask. The highest is the bar\'s POC (gold box)', 'y'], [3, '**Delta per bar:** Bar 1 +14 · Bar 2 +225 · Bar 3 −37', 'g'], [4, '**High/low-volume areas** within the bar', 'c']], note: { at: 5, label: 'Colours', text: 'In this series: bid (seller-initiated) is **red**, ask (buyer-initiated) is **green**, highest-volume price is **gold**.' } },
      say: [
        ['Here are three footprint bars. Each cell shows bid volume times ask volume.', 'Ini ialah tiga bar footprint. Setiap sel menunjukkan bid volume darab ask volume.'],
        ['Bid is volume classified as seller-initiated at that price. Ask is volume classified as buyer-initiated.', 'Bid ialah volume yang diklasifikasikan sebagai dimulakan penjual pada harga itu. Ask ialah volume yang diklasifikasikan sebagai dimulakan pembeli.'],
        ['Adding bid and ask gives the volume at each price. The price with the most volume is the bar\'s point of control, outlined in gold. In bar one, it is four thousand one hundred and two, with one hundred and fifty-eight contracts.', 'Menambah bid dan ask memberikan volume pada setiap harga. Harga dengan volume paling banyak ialah point of control bar itu, ditandakan dengan emas. Dalam bar satu, ia ialah 4,102, dengan 158 kontrak.'],
        ['Under each bar is its Delta: plus fourteen, plus two hundred and twenty-five, and minus thirty-seven.', 'Di bawah setiap bar ialah Deltanya: tambah 14, tambah 225, dan tolak 37.'],
        ['You can also see high-volume and low-volume areas inside each bar, which a candle hides.', 'Anda juga boleh melihat kawasan volume tinggi dan rendah dalam setiap bar, yang disembunyikan oleh candle.'],
        ['In this series, bid is red, ask is green, and the highest-volume price is gold.', 'Dalam siri ini, bid berwarna merah, ask berwarna hijau, dan harga dengan volume tertinggi berwarna emas.'],
      ],
    },
    {
      tpl: 'formula', label: 'Imbalance', kicker: '8.2 · ORDER FLOW IMBALANCE', h: 'Diagonal imbalance — one common method', fs: 23,
      lines: [
        [1, '{gr}Ask imbalance{/}: ask at price P  ≥ ratio × bid at P − 1 tick'],
        [2, '{r}Bid imbalance{/}: bid at price P  ≥ ratio × ask at P + 1 tick'],
        [3, 'Bar 2, 4,108: ask {gr}62{/} vs bid at 4,107 = 12'],
        [3, '62 ÷ 12 = {g}5.2{/}  ≥ 3.0  →  ask imbalance', 'big'],
        [4, 'Bar 2, 4,105: ask 30 vs bid at 4,104 = 26 → 1.2 → {m}no imbalance{/}'],
      ],
      viz: { type: 'footprint', title: 'BAR 2 · RATIO 300%', cols: [F2], ratio: 3 },
      note: { at: 5, label: 'Why diagonal?', text: 'An aggressive buyer lifts the ask, which sits one tick above the bid. So many platforms compare ask at P with bid one tick below. Others compare horizontally. **Methods differ.**' },
      say: [
        ['An order flow imbalance highlights a price where one side\'s aggression greatly exceeds the other. A common method is the diagonal comparison.', 'Order flow imbalance menandakan harga di mana agresi satu pihak jauh melebihi pihak yang lain. Kaedah biasa ialah perbandingan pepenjuru.'],
        ['An ask imbalance exists when ask volume at a price is at least a chosen ratio times the bid volume one tick below.', 'Ask imbalance wujud apabila ask volume pada sesuatu harga sekurang-kurangnya nisbah yang dipilih darab bid volume satu tick di bawah.'],
        ['A bid imbalance exists when bid volume at a price is at least the ratio times the ask volume one tick above.', 'Bid imbalance wujud apabila bid volume pada sesuatu harga sekurang-kurangnya nisbah itu darab ask volume satu tick di atas.'],
        ['In bar two, at four thousand one hundred and eight, ask volume is sixty-two, and bid volume one tick below is twelve. Sixty-two divided by twelve is about five point two, above our ratio of three. So this is an ask imbalance.', 'Dalam bar dua, pada 4,108, ask volume ialah 62, dan bid volume satu tick di bawah ialah 12. 62 bahagi 12 ialah kira-kira 5.2, melebihi nisbah kita iaitu 3. Jadi ini ialah ask imbalance.'],
        ['At four thousand one hundred and five, ask thirty against bid twenty-six gives only one point two. No imbalance.', 'Pada 4,105, ask 30 berbanding bid 26 hanya memberikan 1.2. Tiada imbalance.'],
        ['Why diagonal? An aggressive buyer lifts the ask, which sits one tick above the bid. Other platforms compare horizontally. Methods differ.', 'Mengapa pepenjuru? Pembeli agresif mengangkat ask, yang terletak satu tick di atas bid. Platform lain membandingkan secara mendatar. Kaedah berbeza.'],
      ],
    },
    {
      tpl: 'viz', label: 'Stacked imbalance',
      viz: { type: 'footprint', title: 'FCPO · 5M FOOTPRINT · HYPOTHETICAL', tag: 'STACKED IMBALANCE', cols: [{ ...F1, at: 0, d: 0 }, { ...F2, at: 0, d: .3 }, { ...F3, at: 0, d: .6 }], ratio: 3, marks: [{ col: 1, p1: 4109, p2: 4106, c: 'g', label: 'STACKED · 4 LEVELS', at: 1 }] },
      info: { k: '8.3 · STACKED IMBALANCE', h: 'Several in a row', b: [[1, 'Bar 2 shows ask imbalances at **4,106, 4,107, 4,108 and 4,109**', 'g'], [2, 'Consecutive imbalances = **stacked imbalance**', 'g'], [3, 'Possible reading: persistent aggressive buying through several prices', 'g'], [4, 'Some traders watch whether the zone holds on a later retest', 'c']], note: { at: 5, c: 'r', label: 'Limitation', text: 'How many levels count as "stacked" (2, 3, 4…) is a platform or user setting. An imbalance does not automatically indicate a profitable trade.' } },
      say: [
        ['When several imbalances occur at consecutive prices, we call it a stacked imbalance.', 'Apabila beberapa imbalance berlaku pada harga berturut-turut, kita memanggilnya stacked imbalance.'],
        ['Bar two shows ask imbalances at four thousand one hundred and six, one hundred and seven, one hundred and eight, and one hundred and nine.', 'Bar dua menunjukkan ask imbalance pada 4,106, 4,107, 4,108 dan 4,109.'],
        ['Four consecutive levels form a stacked ask imbalance.', 'Empat paras berturut-turut membentuk stacked ask imbalance.'],
        ['A possible reading is persistent aggressive buying through several prices.', 'Bacaan yang mungkin ialah aggressive buying yang berterusan melalui beberapa harga.'],
        ['Some traders then watch whether that zone holds when price returns to it later.', 'Sesetengah trader kemudian memerhati sama ada zon itu bertahan apabila harga kembali kepadanya kemudian.'],
        ['But how many levels count as stacked is a setting, and an imbalance does not automatically indicate a profitable trade.', 'Tetapi berapa banyak paras yang dikira sebagai stacked ialah satu tetapan, dan imbalance tidak secara automatik menunjukkan trade yang menguntungkan.'],
      ],
    },
    {
      tpl: 'cards', label: 'Platform differences', kicker: '8.3 · METHOD DEPENDENCE', h: 'The same bar can show different imbalances', cols: 4, top: 180, ch: 290,
      cards: [
        { n: 'RATIO', t: '150% · 300% · 400%', b: 'A higher threshold shows fewer imbalances.', at: 1 },
        { n: 'DIRECTION', t: 'Diagonal or horizontal', b: 'Different cells are compared.', at: 2 },
        { n: 'FILTER', t: 'Minimum volume', b: '5 vs 1 is 500% — but may be meaningless.', at: 3 },
        { n: 'STACK', t: 'Levels required', b: '2, 3 or more consecutive prices.', at: 4 },
      ],
      note: { at: 5, y: 520, label: 'Practice', text: 'Record your platform\'s imbalance settings in your trading plan and journal. Results from one setting are not evidence for another.' },
      say: [
        ['Because imbalance is a calculation, the same bar can show different imbalances on different platforms.', 'Kerana imbalance ialah satu pengiraan, bar yang sama boleh menunjukkan imbalance berbeza pada platform berbeza.'],
        ['The ratio threshold might be one hundred and fifty, three hundred or four hundred percent. A higher threshold shows fewer imbalances.', 'Ambang nisbah mungkin 150, 300 atau 400 peratus. Ambang yang lebih tinggi menunjukkan lebih sedikit imbalance.'],
        ['The comparison may be diagonal or horizontal.', 'Perbandingan mungkin pepenjuru atau mendatar.'],
        ['A minimum volume filter matters: five against one is five hundred percent, but may be meaningless.', 'Penapis volume minimum adalah penting: lima berbanding satu ialah 500 peratus, tetapi mungkin tidak bermakna.'],
        ['And the number of levels required for a stack varies.', 'Dan bilangan paras yang diperlukan untuk stack juga berbeza.'],
        ['Record your settings in your trading plan and journal. Results from one setting are not evidence for another.', 'Rekodkan tetapan anda dalam pelan dagangan dan jurnal. Keputusan daripada satu tetapan bukan bukti untuk tetapan lain.'],
      ],
    },
    {
      tpl: 'split', label: 'Absorption',
      a: { type: 'footprint', title: 'POSSIBLE ABSORPTION AT HIGHS · HYPOTHETICAL', tag: 'BEARISH READING', cols: [{ ...AH1, at: 0 }, { ...AH2, at: 2 }], ratio: 3, marks: [{ col: 0, p1: 4123, p2: 4121, c: 'a', label: 'Δ +475 · CLOSE +1', at: 1 }] },
      b: { type: 'footprint', title: 'POSSIBLE ABSORPTION AT LOWS · HYPOTHETICAL', tag: 'BULLISH READING', cols: [{ ...AL1, at: 3 }, { ...AL2, at: 4 }], ratio: 3, marks: [{ col: 0, p1: 4089, p2: 4087, c: 'a', label: 'Δ −475 · CLOSE −1', at: 3, d: .5 }] },
      calc: [[5, 'Absorption = {a}heavy aggression{/} + {a}limited price progress{/} → an {g}interpretation{/}, confirmed only by what follows']],
      say: [
        ['Now absorption in order flow. On the left, Bar A at the highs.', 'Sekarang absorption dalam order flow. Di sebelah kiri, Bar A di paras tinggi.'],
        ['There are heavy ask volumes and stacked ask imbalances at the top three prices. Delta is plus four hundred and seventy-five. Yet the bar closes only one tick above its open.', 'Terdapat ask volume yang berat dan stacked ask imbalance pada tiga harga teratas. Delta ialah tambah 475. Namun bar itu ditutup hanya satu tick di atas pembukaannya.'],
        ['In Bar B, price falls to four thousand one hundred and fourteen. A possible reading: aggressive buying met passive sell liquidity, and was absorbed.', 'Dalam Bar B, harga jatuh ke 4,114. Bacaan yang mungkin: aggressive buying bertemu liquidity jualan pasif, dan diserap.'],
        ['On the right is the bullish mirror at the lows: Delta of minus four hundred and seventy-five, heavy bid volume, but the bar closes only one tick lower.', 'Di sebelah kanan ialah cerminan bullish di paras rendah: Delta tolak 475, bid volume yang berat, tetapi bar itu ditutup hanya satu tick lebih rendah.'],
        ['And the next bar rises to four thousand and ninety-six. Aggressive selling may have met passive buy liquidity.', 'Dan bar seterusnya naik ke 4,096. Aggressive selling mungkin telah bertemu liquidity belian pasif.'],
        ['So absorption is heavy aggression with limited price progress. It is an interpretation, supported only by what follows.', 'Jadi absorption ialah agresi berat dengan kemajuan harga yang terhad. Ia ialah interpretasi, disokong hanya oleh apa yang menyusul.'],
      ],
    },
    {
      tpl: 'table', label: 'Absorption vs high volume', kicker: '8.4 · ABSORPTION', h: 'Absorption is not the same as ordinary high volume', cols: ['', 'Ordinary high volume', 'Possible absorption'], widths: [380, 640, 640], hs: 38,
      rows: [
        [1, 'Aggression', 'Any mix of bid and ask', 'Strongly one-sided (large |Delta|, imbalances)'],
        [2, 'Price progress', 'Normal for the effort', 'Limited — price does not advance with the aggression'],
        [3, 'Location', 'Anywhere', 'Often at a level: range edge, POI, prior high/low'],
        [4, 'What follows', 'No requirement', 'Price moves against the aggression'],
        [5, 'Who traded?', 'Unknown', 'Still unknown — not proof of institutions'],
      ],
      warnLast: true,
      say: [
        ['How is absorption different from ordinary high volume?', 'Bagaimana absorption berbeza daripada volume tinggi biasa?'],
        ['In absorption, aggression is strongly one-sided: a large Delta, often with imbalances.', 'Dalam absorption, agresi sangat berat sebelah: Delta yang besar, selalunya dengan imbalance.'],
        ['Price progress is limited. Price does not advance with the aggression.', 'Kemajuan harga terhad. Harga tidak maju seiring dengan agresi.'],
        ['It often occurs at a meaningful level, such as a range edge, a point of interest, or a prior high or low.', 'Ia selalunya berlaku pada paras yang bermakna, seperti tepi range, POI, atau high atau low sebelumnya.'],
        ['And what follows matters: price should move against the aggression.', 'Dan apa yang menyusul adalah penting: harga sepatutnya bergerak menentang agresi itu.'],
        ['But in both cases, who traded remains unknown. Absorption is not proof of institutional activity.', 'Tetapi dalam kedua-dua kes, siapa yang berdagang tetap tidak diketahui. Absorption bukan bukti aktiviti institusi.'],
      ],
    },
    {
      tpl: 'viz', label: 'DOM',
      viz: { type: 'dom', title: 'FCPO DOM · HYPOTHETICAL', tag: 'DISPLAYED LIQUIDITY CHANGES', prices: P, snaps: [{ at: 0, q: BOOK, last: 4100 }, { at: 1, q: mod({ 4097: [120, 0] }), last: 4100, marks: [{ p: 4097, side: 'bid', c: 'c', label: '120 DISPLAYED' }], caption: 'A LARGE BID APPEARS AT 4,097', cc: 'c' }, { at: 3, q: mod({ 4100: [0, 0], 4099: [6, 0], 4097: [0, 0], 4101: [0, 9], 4100: [0, 7] }), last: 4099, marks: [{ p: 4097, side: 'bid', c: 'r', label: 'CANCELLED · 0 TRADED' }], caption: 'PRICE FALLS · THE 120 IS GONE BEFORE IT TRADES', cc: 'r' }] },
      info: { k: '8.5 · DEPTH OF MARKET', h: 'Displayed is not executed', b: [[1, 'DOM shows **visible resting orders** — bid and ask depth', 'c'], [2, 'Quantities change constantly as orders are added, modified, cancelled', 'c'], [3, 'Here, 120 contracts displayed at 4,097 are cancelled before price arrives', ''], [4, 'Displayed quantity ≠ executed volume', 'a']], note: { at: 5, c: 'r', label: 'General risk', text: 'Displayed orders may be cancelled. Spoofing — placing orders without intent to execute — is prohibited on regulated exchanges, but traders cannot tell intent from the screen. This example claims no manipulation.' } },
      say: [
        ['Depth of Market, or DOM, shows visible resting orders: bid depth and ask depth.', 'Depth of Market, atau DOM, menunjukkan order yang menunggu dan kelihatan: kedalaman bid dan kedalaman ask.'],
        ['A large bid of one hundred and twenty contracts appears at four thousand and ninety-seven. Quantities like this change constantly, as orders are added, modified or cancelled.', 'Bid besar sebanyak 120 kontrak muncul pada 4,097. Kuantiti seperti ini sentiasa berubah, apabila order ditambah, diubah atau dibatalkan.'],
        ['Many traders might read this as support.', 'Ramai trader mungkin membacanya sebagai support.'],
        ['But as price falls toward it, the order is cancelled before a single contract trades.', 'Tetapi apabila harga jatuh ke arahnya, order itu dibatalkan sebelum satu kontrak pun didagangkan.'],
        ['Displayed quantity is not executed volume.', 'Kuantiti yang dipaparkan bukan volume yang dilaksanakan.'],
        ['As a general market risk, displayed orders may be cancelled. Spoofing, which is placing orders without intent to execute, is prohibited on regulated exchanges, but intent cannot be seen on screen. This example makes no claim of manipulation.', 'Sebagai risiko pasaran umum, order yang dipaparkan mungkin dibatalkan. Spoofing, iaitu meletakkan order tanpa niat untuk dilaksanakan, dilarang di bursa yang dikawal selia, tetapi niat tidak dapat dilihat di skrin. Contoh ini tidak mendakwa sebarang manipulasi.'],
      ],
    },
    {
      tpl: 'cards', label: 'DOM limitations', kicker: '8.5 · DOM LIMITATIONS', h: 'What the DOM cannot show', cols: 3, top: 180, ch: 300,
      cards: [
        { n: '01', t: 'Hidden or reserve quantity', b: 'Where an exchange supports orders with undisplayed size, the visible book understates real interest.', at: 1 },
        { n: '02', t: 'Orders not yet sent', b: 'Many participants do not rest orders in the book until they act.', at: 2 },
        { n: '03', t: 'Depth beyond the feed', b: 'Your feed may show only a limited number of price levels.', at: 3 },
      ],
      note: { at: 4, y: 540, label: 'Conclusion', text: 'The DOM is **not** a complete representation of all market interest. Use it as one observation, never as proof of support or resistance.' },
      say: [
        ['What the DOM cannot show.', 'Apa yang tidak dapat ditunjukkan oleh DOM.'],
        ['First, hidden or reserve quantity. Where an exchange supports orders with undisplayed size, the visible book understates real interest. Check the exchange rules.', 'Pertama, kuantiti tersembunyi atau rizab. Jika bursa menyokong order dengan saiz yang tidak dipaparkan, buku yang kelihatan memperkecilkan minat sebenar. Semak peraturan bursa.'],
        ['Second, orders not yet sent. Many participants do not rest orders in the book until they act.', 'Kedua, order yang belum dihantar. Ramai peserta tidak meletakkan order dalam buku sehingga mereka bertindak.'],
        ['Third, depth beyond your feed. Your feed may show only a limited number of price levels.', 'Ketiga, kedalaman di luar feed anda. Feed anda mungkin hanya menunjukkan bilangan paras harga yang terhad.'],
        ['So the DOM is not a complete representation of all market interest. Use it as one observation, never as proof.', 'Jadi DOM bukan gambaran lengkap semua minat pasaran. Gunakannya sebagai satu pemerhatian, bukan sebagai bukti.'],
      ],
    },
    {
      tpl: 'viz', label: 'Time & Sales',
      viz: {
        type: 'tape', title: 'FCPO TIME & SALES · HYPOTHETICAL', tag: 'TAPE',
        rows: [
          { at: 0, d: 0, time: '10:41:02.118', price: 4121, size: 3, side: 'B' }, { at: 0, d: .2, time: '10:41:02.540', price: 4121, size: 2, side: 'S' }, { at: 0, d: .4, time: '10:41:03.006', price: 4122, size: 5, side: 'B' },
          { at: 1, d: 0, time: '10:41:03.011', price: 4122, size: 40, side: 'B', big: true }, { at: 1, d: .2, time: '10:41:03.015', price: 4123, size: 35, side: 'B', big: true }, { at: 1, d: .4, time: '10:41:03.020', price: 4123, size: 50, side: 'B', big: true },
          { at: 2, d: 0, time: '10:41:03.300', price: 4123, size: 8, side: 'B' }, { at: 2, d: .2, time: '10:41:04.910', price: 4122, size: 6, side: 'S' }, { at: 2, d: .4, time: '10:41:05.402', price: 4121, size: 12, side: 'S' },
          { at: 3, d: 0, time: '10:41:05.500', price: 4121, size: 4, side: 'U' }, { at: 3, d: .2, time: '10:41:06.080', price: 4120, size: 15, side: 'S' }, { at: 3, d: .4, time: '10:41:06.150', price: 4119, size: 20, side: 'S' },
        ],
      },
      info: { k: '8.6 · TIME & SALES', h: 'Reading the tape', b: [[1, 'Each print: **time, price, size**, estimated aggressor', 'c'], [2, '**Speed and size:** three large buyer prints within 9 ms', 'a'], [3, 'Price stalls at 4,123; prints turn to the bid', ''], [4, 'One print is **unclassified** — side unknown', 'x'], [5, 'Possible reading: buying met supply at 4,123', 'a']], note: { at: 6, c: 'r', label: 'Limitation', text: 'Feeds may aggregate, delay or drop prints, and timestamps can differ by source. Classification is an estimate.' } },
      say: [
        ['Time and Sales, often called the tape, lists each trade: the time, price, size and estimated aggressor side.', 'Time and Sales, sering dipanggil tape, menyenaraikan setiap dagangan: masa, harga, saiz dan anggaran pihak agresor.'],
        ['Watch speed and size. Here, three large buyer-initiated prints arrive within nine milliseconds, at four thousand one hundred and twenty-two and four thousand one hundred and twenty-three.', 'Perhatikan kelajuan dan saiz. Di sini, tiga cetakan besar yang dimulakan pembeli tiba dalam masa sembilan milisaat, pada 4,122 dan 4,123.'],
        ['Then price stalls at four thousand one hundred and twenty-three, and prints turn to the bid side.', 'Kemudian harga terhenti pada 4,123, dan cetakan beralih ke pihak bid.'],
        ['Notice one print is unclassified. Its side cannot be determined from the available data.', 'Perhatikan satu cetakan tidak diklasifikasikan. Pihaknya tidak dapat ditentukan daripada data yang tersedia.'],
        ['A possible reading is that aggressive buying met supply at four thousand one hundred and twenty-three.', 'Bacaan yang mungkin ialah aggressive buying bertemu supply pada 4,123.'],
        ['Remember: feeds may aggregate, delay or drop prints, and timestamps can differ by source. Classification is an estimate.', 'Ingat: feed mungkin mengagregat, melewatkan atau menggugurkan cetakan, dan cap masa boleh berbeza mengikut sumber. Klasifikasi ialah anggaran.'],
      ],
    },
    {
      tpl: 'table', label: 'Footprint vs DOM vs tape', kicker: '8.7 · THREE TOOLS', h: 'Footprint, DOM and Time & Sales compared', cols: ['Tool', 'Shows', 'Does not show'], widths: [340, 680, 640], hs: 38,
      rows: [
        [1, 'Footprint', 'Executed volume by price and classified side, per bar', 'Resting orders; who traded'],
        [2, 'DOM', 'Visible resting limit orders now', 'Executed volume; hidden or unsent orders'],
        [3, 'Time & Sales', 'Each executed trade in sequence', 'Resting orders; intent'],
      ],
      note: { at: 4, label: 'Key distinction', text: 'Footprint and tape describe what **traded**. DOM describes what is **waiting** — and may never trade.' },
      say: [
        ['Let us compare the three tools.', 'Mari kita bandingkan tiga alat ini.'],
        ['The footprint shows executed volume by price and classified side, per bar. It does not show resting orders, or who traded.', 'Footprint menunjukkan volume yang dilaksanakan mengikut harga dan pihak yang diklasifikasikan, bagi setiap bar. Ia tidak menunjukkan order yang menunggu, atau siapa yang berdagang.'],
        ['The DOM shows visible resting limit orders right now. It does not show executed volume, or hidden and unsent orders.', 'DOM menunjukkan limit order yang menunggu dan kelihatan pada masa ini. Ia tidak menunjukkan volume yang dilaksanakan, atau order tersembunyi dan yang belum dihantar.'],
        ['Time and Sales shows each executed trade in sequence, but not resting orders or intent.', 'Time and Sales menunjukkan setiap dagangan yang dilaksanakan mengikut urutan, tetapi bukan order yang menunggu atau niat.'],
        ['The key distinction: footprint and tape describe what traded. The DOM describes what is waiting, and may never trade.', 'Perbezaan utama: footprint dan tape menggambarkan apa yang telah didagangkan. DOM menggambarkan apa yang sedang menunggu, dan mungkin tidak akan didagangkan.'],
      ],
    },
    {
      tpl: 'cards', label: 'Data quality', kicker: '8.8 · DATA QUALITY', h: 'Historical footprint accuracy depends on the underlying data', cols: 3, top: 190, ch: 300,
      cards: [
        { n: 'REQUIRES', nc: 'green2', t: 'Tick-by-tick trades', b: 'With price, size, and bid/ask at the time — or an aggressor flag.', at: 1 },
        { n: 'CANNOT', nc: 'red2', t: 'Rebuild from OHLC', b: 'Ordinary candles contain no information about side or price distribution inside the bar.', at: 2 },
        { n: 'CHECK', nc: 'amber', t: 'Vendor history', b: 'Some platforms store limited tick history; older footprints may be approximations.', at: 3 },
      ],
      note: { at: 4, y: 540, c: 'r', label: 'Rule for this course', text: 'Never present reconstructed footprint, Delta or DOM data as historical fact. If real data is unavailable, label the example **hypothetical**.' },
      say: [
        ['Finally, data quality. A historical footprint is only as accurate as its underlying data.', 'Akhir sekali, kualiti data. Footprint sejarah hanya setepat data asasnya.'],
        ['It requires tick-by-tick trades, with price, size and the bid and ask at the time, or an exchange aggressor flag.', 'Ia memerlukan dagangan tick demi tick, dengan harga, saiz dan bid serta ask pada masa itu, atau aggressor flag daripada bursa.'],
        ['It cannot be rebuilt from ordinary candles, which contain no information about side or the distribution of trades inside the bar.', 'Ia tidak boleh dibina semula daripada candle biasa, yang tidak mengandungi maklumat tentang pihak atau taburan dagangan dalam bar.'],
        ['And check your vendor\'s history. Some platforms store limited tick data, and older footprints may be approximations.', 'Dan semak sejarah vendor anda. Sesetengah platform menyimpan data tick yang terhad, dan footprint lama mungkin hanya anggaran.'],
        ['The rule for this course: never present reconstructed order flow as historical fact. If real data is unavailable, label the example hypothetical.', 'Peraturan untuk kursus ini: jangan sekali-kali membentangkan order flow yang dibina semula sebagai fakta sejarah. Jika data sebenar tidak tersedia, labelkan contoh itu sebagai hipotetikal.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercises 6 & 9', kicker: 'EXERCISES 6 & 9', h: 'Read a footprint · Identify possible absorption', cols: 2, top: 180, ch: 360,
      cards: [
        { n: 'EX 6', t: 'Read a footprint', b: 'Using Bar 3 on screen earlier (4,106–4,113): find the bar POC, total volume, Delta, and any diagonal imbalances at 300%.', at: 1, foot: 'POC 4,110 (73) · Vol 349 · Δ −37 · none', fc: 'green2' },
        { n: 'EX 9', t: 'Identify possible absorption', b: 'On your platform, find a bar with |Delta| in the top 10% of the session but a body of ≤ 2 ticks, at a range edge or POI. What happened in the next 3 bars?', at: 2, foot: 'Record: location · Delta · body · next 3 bars', fc: 'green2' },
      ],
      say: [
        ['Exercises Six and Nine.', 'Latihan 6 dan 9.'],
        ['Exercise Six: read bar three from earlier. The point of control is four thousand one hundred and ten, with seventy-three contracts. Total volume is three hundred and forty-nine. Delta is minus thirty-seven. And there are no diagonal imbalances at three hundred percent.', 'Latihan 6: baca bar tiga dari tadi. Point of control ialah 4,110, dengan 73 kontrak. Jumlah volume ialah 349. Delta ialah tolak 37. Dan tiada diagonal imbalance pada 300 peratus.'],
        ['Exercise Nine: on your platform, find a bar with very large Delta but a body of two ticks or less, at a range edge or point of interest. Record what happened in the next three bars.', 'Latihan 9: pada platform anda, cari bar dengan Delta yang sangat besar tetapi badan dua tick atau kurang, di tepi range atau POI. Rekodkan apa yang berlaku dalam tiga bar seterusnya.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is the difference between a Footprint chart and the DOM?',
      opts: ['They show the same data', 'Footprint shows executed volume by price and side; DOM shows visible resting orders that may never trade', 'DOM shows past trades; footprint shows future orders', 'Footprint shows only total volume'], ans: 1, ansAt: 1,
      expl: 'Executed (footprint, tape) vs waiting (DOM). Displayed orders can be cancelled before execution.',
      say: [
        ['Knowledge check. What is the difference between a footprint chart and the DOM?', 'Semakan pengetahuan. Apakah perbezaan antara footprint chart dan DOM?', { p: 1.5 }],
        ['The answer is B. The footprint shows executed volume by price and side. The DOM shows visible resting orders, which may never trade.', 'Jawapannya ialah B. Footprint menunjukkan volume yang dilaksanakan mengikut harga dan pihak. DOM menunjukkan order yang menunggu dan kelihatan, yang mungkin tidak akan didagangkan.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is absorption?',
      opts: ['Any bar with high volume', 'Heavy one-sided aggression with limited price progress — an interpretation confirmed by what follows', 'Proof that institutions are trading', 'A bar with positive Delta'], ans: 1, ansAt: 1,
      expl: 'Absorption describes aggression meeting passive liquidity. It does not identify participants.',
      say: [
        ['Second question. What is absorption?', 'Soalan kedua. Apakah absorption?', { p: 1.5 }],
        ['The answer is B: heavy one-sided aggression with limited price progress. It is an interpretation, confirmed only by what follows.', 'Jawapannya ialah B: agresi berat sebelah yang berat dengan kemajuan harga yang terhad. Ia ialah interpretasi, disahkan hanya oleh apa yang menyusul.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Advanced Order Flow — what to remember',
      items: [[0, 'Footprint: bid × ask, volume at price, Delta per bar'], [1, 'Imbalance is a calculation — settings differ'], [2, 'Stacked imbalance: consecutive imbalances'], [3, 'Absorption: aggression without progress — an interpretation'], [4, 'DOM shows displayed, not executed, liquidity'], [5, 'Displayed orders may be cancelled'], [6, 'Tape: time, price, size, estimated side'], [7, 'No tick data → no real footprint', 'w']],
      say: [
        ['To summarise. A footprint shows bid times ask, volume at price, and Delta per bar.', 'Sebagai rumusan. Footprint menunjukkan bid darab ask, volume pada harga, dan Delta bagi setiap bar.'],
        ['Imbalance is a calculation, and settings differ.', 'Imbalance ialah pengiraan, dan tetapannya berbeza.'],
        ['A stacked imbalance is a series of consecutive imbalances.', 'Stacked imbalance ialah siri imbalance berturut-turut.'],
        ['Absorption is aggression without progress, and it is an interpretation.', 'Absorption ialah agresi tanpa kemajuan, dan ia ialah interpretasi.'],
        ['The DOM shows displayed, not executed, liquidity.', 'DOM menunjukkan liquidity yang dipaparkan, bukan yang dilaksanakan.'],
        ['Displayed orders may be cancelled.', 'Order yang dipaparkan mungkin dibatalkan.'],
        ['The tape shows time, price, size and estimated side.', 'Tape menunjukkan masa, harga, saiz dan anggaran pihak.'],
        ['And without tick data, there is no real footprint.', 'Dan tanpa data tick, tiada footprint yang sebenar.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 3', h: 'Putting Order Flow to work with SMC',
      chips: [[0, 'Integration framework', 'Ten steps from HTF bias to entry'], [0, 'Bullish case', 'SSL interaction at a POI'], [0, 'Bearish case', 'BSL interaction at a POI'], [0, 'Common mistakes', 'Eight to avoid']],
      nk: 'NEXT · VIDEO 09', nt: 'SMC + Order Flow Integration', nAt: 1, ny: 420,
      say: [
        ['In Video Nine, we integrate Order Flow with S M C in a ten-step framework, with bullish and bearish F C P O case studies and common mistakes.', 'Dalam Video 9, kita mengintegrasikan Order Flow dengan SMC dalam kerangka sepuluh langkah, dengan kajian kes FCPO bullish dan bearish serta kesilapan biasa.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua data footprint, DOM dan Time & Sales dalam video ini ialah hipotetikal. Rujukan: L. Harris — Trading and Exchanges; dokumentasi rasmi TradingView Volume Footprint.', foot: 'Seterusnya: Video 09 — SMC + Order Flow Integration',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
