/* VIDEO 07 — Order Flow: Market Microstructure
   Subtopic 3 · SMC + Order Flow — sections A (Introduction), B (Bid, Ask, Spread), C (Execution), D (Delta), E (CVD). */
const run = (p0, seq) => { let p = p0; return seq.map(([d, v, uw = 3, lw = 3]) => { const o = p, c = p + d; p = c; return { o, c, h: Math.max(o, c) + uw, l: Math.min(o, c) - lw, v }; }); };
const P = [4104, 4103, 4102, 4101, 4100, 4099, 4098, 4097];
const BOOK = { 4104: [0, 20], 4103: [0, 18], 4102: [0, 15], 4101: [0, 8], 4100: [14, 0], 4099: [22, 0], 4098: [19, 0], 4097: [25, 0] };
const mod = (ch) => { const q = JSON.parse(JSON.stringify(BOOK)); for (const k in ch) q[k] = ch[k]; return q; };
// Delta-by-bar example (ask vol, bid vol per bar) — hypothetical
const DB = run(4060, [[6, 1500], [8, 1700], [-3, 1200], [9, 1800], [7, 1600], [-2, 1300], [5, 2000], [-6, 2400, 4, 3], [-4, 1500], [7, 1400], [8, 1600], [4, 1500]]);
const DELTA = [300, 420, -150, 380, 260, -90, 400, 350, -260, 210, 330, 120];
const cum = a => a.reduce((o, x) => (o.push((o.length ? o[o.length - 1] : 0) + x), o), []);
// CVD divergence example: price higher high, CVD lower high
const DV = run(4000, [[8, 1300], [10, 1500], [9, 1400], [-5, 900], [-4, 800], [7, 1100], [8, 1200], [6, 1000], [-6, 900], [-5, 1000], [6, 1000], [9, 1100], [7, 1000], [5, 900], [-8, 1200], [-7, 1100]]);
const DVD = [500, 600, 520, -300, -250, 300, 280, 200, -350, -400, 150, 120, 60, -60, -420, -380];

EP({
  num: '07', short: 'Order Flow Microstructure', title: 'Order Flow: Market Microstructure',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 07 · SUBTOPIC 3 · SMC + ORDER FLOW',
      h: 'Order Flow: Market Microstructure', sub: 'Order book · Market and limit orders · Aggressive and passive execution · Delta · CVD',
      obj: [[1, 'Explain bid, ask, spread and how orders become trades'], [2, 'Distinguish aggressive from passive execution'], [3, 'Calculate and interpret Delta correctly'], [4, 'Explain CVD, divergence and their data limitations']],
      viz: { type: 'dom', title: 'ORDER BOOK · HYPOTHETICAL', prices: P, snaps: [{ at: 0, q: BOOK, last: 4100 }] },
      say: [
        ['Welcome to Video Seven. Subtopic Three is S M C plus Order Flow.', 'Selamat datang ke Video 7. Subtopik 3 ialah SMC + Order Flow.'],
        ['So far, we have studied candles and bar volume. Order Flow looks one level deeper: at the transactions and orders that create each candle.', 'Setakat ini, kita telah mengkaji candle dan volume bar. Order Flow melihat satu tahap lebih dalam: pada transaksi dan order yang mencipta setiap candle.'],
        ['In this video, we cover the order book, market and limit orders, aggressive and passive execution, Delta, and cumulative volume delta.', 'Dalam video ini, kita merangkumi order book, market order dan limit order, pelaksanaan agresif dan pasif, Delta, dan cumulative volume delta.'],
        ['The key message: Order Flow data depends on how it is collected and classified. It improves detail, not certainty.', 'Mesej utama: data Order Flow bergantung pada cara ia dikumpul dan diklasifikasikan. Ia meningkatkan perincian, bukan kepastian.'],
      ],
    },
    {
      tpl: 'statement', label: 'What is Order Flow', kicker: '7.1 · INTRODUCTION', h: 'Three levels of market information', fs: 44, by: 220, bh: 420,
      boxes: [
        { k: 'PRICE ACTION', t: 'What price did', b: 'Open, high, low, close. The summary of a period. SMC works mainly here.', at: 1 },
        { k: 'VOLUME', kc: 'c', bc: 'amber', t: 'How much traded', b: 'Total contracts in the period. No side, no order detail.', at: 2 },
        { k: 'ORDER FLOW', kc: 'g', bc: 'green', t: 'How it traded', b: 'Individual trades, their price and size, the estimated aggressor side, and visible resting orders.', at: 3 },
      ],
      say: [
        ['What is Order Flow? Think of three levels of market information.', 'Apakah Order Flow? Fikirkan tiga tahap maklumat pasaran.'],
        ['Price action tells you what price did: the open, high, low and close. It is a summary of a period, and S M C works mainly at this level.', 'Price action memberitahu apa yang harga lakukan: open, high, low dan close. Ia ringkasan sesuatu tempoh, dan SMC berfungsi terutamanya pada tahap ini.'],
        ['Volume tells you how much traded, but with no side and no order detail.', 'Volume memberitahu berapa banyak yang didagangkan, tetapi tanpa pihak dan tanpa perincian order.'],
        ['Order Flow tells you how it traded: individual trades, their price and size, the estimated aggressor side, and the visible resting orders in the book.', 'Order Flow memberitahu bagaimana ia didagangkan: dagangan individu, harga dan saiznya, anggaran pihak agresor, dan order yang menunggu dalam buku pesanan.'],
        ['In futures markets, trading happens on a central exchange order book, which makes this level of analysis possible. This field is called market microstructure.', 'Dalam pasaran futures, dagangan berlaku pada buku pesanan bursa yang berpusat, yang menjadikan analisis tahap ini mungkin. Bidang ini dipanggil market microstructure.'],
      ],
    },
    {
      tpl: 'table', label: 'Order types', kicker: '7.2 · MARKET AND LIMIT ORDERS', h: 'How orders interact', cols: ['Order type', 'What it does', 'Role in the book'], widths: [380, 700, 580], hs: 38,
      rows: [
        [1, 'Limit buy', 'Buy at a stated price or lower', 'Rests on the bid side — provides liquidity'],
        [1, 'Limit sell', 'Sell at a stated price or higher', 'Rests on the ask side — provides liquidity'],
        [2, 'Market buy', 'Buy immediately at the best available ask', 'Consumes ask-side liquidity'],
        [2, 'Market sell', 'Sell immediately at the best available bid', 'Consumes bid-side liquidity'],
        [3, 'Marketable limit', 'A limit order priced to execute immediately', 'Behaves like a market order up to its limit'],
      ],
      note: { at: 4, label: 'Matching', text: 'A trade occurs when an incoming order meets a resting order. Exchanges match by their own published rules — commonly price, then time priority. Check the exchange\'s rules for FCPO.' },
      say: [
        ['Orders come in two basic types: limit orders and market orders.', 'Order terbahagi kepada dua jenis asas: limit order dan market order.'],
        ['A limit order states a price. A limit buy rests on the bid side, and a limit sell rests on the ask side. Resting limit orders provide liquidity.', 'Limit order menyatakan harga. Limit buy menunggu di pihak bid, dan limit sell menunggu di pihak ask. Limit order yang menunggu menyediakan liquidity.'],
        ['A market order executes immediately at the best available price. A market buy consumes ask-side liquidity, and a market sell consumes bid-side liquidity.', 'Market order dilaksanakan serta-merta pada harga terbaik yang tersedia. Market buy menggunakan liquidity di pihak ask, dan market sell menggunakan liquidity di pihak bid.'],
        ['A marketable limit order is a limit order priced to execute immediately. It behaves like a market order, up to its limit price.', 'Marketable limit order ialah limit order yang diletakkan pada harga yang boleh dilaksanakan serta-merta. Ia berkelakuan seperti market order, sehingga had harganya.'],
        ['A trade occurs when an incoming order meets a resting order. Exchanges match orders by their own published rules, commonly price first, then time.', 'Dagangan berlaku apabila order yang masuk bertemu dengan order yang menunggu. Bursa memadankan order mengikut peraturan yang diterbitkan sendiri, lazimnya harga dahulu, kemudian masa.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bid, ask, spread',
      viz: { type: 'dom', title: 'FCPO ORDER BOOK · HYPOTHETICAL SNAPSHOT', tag: 'DEPTH OF MARKET', prices: P, snaps: [{ at: 0, q: BOOK, last: 4100 }, { at: 2, q: BOOK, last: 4100, marks: [{ p: 4100, side: 'bid', c: 'r', label: 'BEST BID 4,100 × 14' }, { p: 4101, side: 'ask', c: 'g', label: 'BEST ASK 4,101 × 8' }] }, { at: 4, q: BOOK, last: 4100, marks: [{ p: 4100, side: 'bid', c: 'r' }, { p: 4101, side: 'ask', c: 'g' }], caption: 'SPREAD = 4,101 − 4,100 = 1 TICK (RM1/t · RM25/contract)' }] },
      info: { k: '7.2 · THE ORDER BOOK', h: 'Bid, ask and spread', b: [[1, '**Bid:** prices where buyers are waiting (shown red, as in footprint bid volume)', ''], [2, '**Best bid** 4,100 with **14** contracts; **best ask** 4,101 with **8**', 'y'], [3, '**Bid/ask quantity:** contracts resting at each price', 'c'], [4, '**Spread:** best ask − best bid = 1 tick', 'a']], note: { at: 5, label: 'Hypothetical', text: 'All quantities are illustrative. Real FCPO depth varies by contract month, session and time of day.' } },
      say: [
        ['Here is a hypothetical F C P O order book, also called Depth of Market. Prices are in the centre, bids on the left, asks on the right.', 'Ini ialah buku pesanan FCPO hipotetikal, juga dipanggil Depth of Market. Harga di tengah, bid di sebelah kiri, ask di sebelah kanan.'],
        ['The bid side shows prices where buyers are waiting. The ask side shows prices where sellers are waiting.', 'Pihak bid menunjukkan harga di mana pembeli sedang menunggu. Pihak ask menunjukkan harga di mana penjual sedang menunggu.'],
        ['The best bid is four thousand one hundred, with fourteen contracts. The best ask is four thousand one hundred and one, with eight contracts.', 'Best bid ialah 4,100, dengan 14 kontrak. Best ask ialah 4,101, dengan 8 kontrak.'],
        ['Each quantity is the number of contracts resting at that price.', 'Setiap kuantiti ialah bilangan kontrak yang menunggu pada harga itu.'],
        ['The bid-ask spread is the best ask minus the best bid: here, one tick, or twenty-five ringgit per contract.', 'Bid-ask spread ialah best ask tolak best bid: di sini, satu tick, atau RM25 setiap kontrak.'],
        ['All quantities here are illustrative. Real F C P O depth varies by contract month, session and time of day.', 'Semua kuantiti di sini adalah ilustrasi. Kedalaman FCPO sebenar berbeza mengikut bulan kontrak, sesi dan masa.'],
      ],
    },
    {
      tpl: 'viz', label: 'Market buy',
      viz: { type: 'dom', title: 'MARKET BUY 12 CONTRACTS · HYPOTHETICAL', tag: 'AGGRESSIVE BUYING', prices: P, snaps: [{ at: 0, q: BOOK, last: 4100, caption: 'INCOMING: MARKET BUY 12' }, { at: 1, q: mod({ 4101: [0, 0] }), last: 4101, marks: [{ p: 4101, side: 'ask', c: 'y', label: '8 FILLED @ 4,101' }], caption: '8 of 12 filled — 4,101 cleared' }, { at: 2, q: mod({ 4101: [0, 0], 4102: [0, 11] }), last: 4102, marks: [{ p: 4102, side: 'ask', c: 'y', label: '4 FILLED @ 4,102' }], caption: 'NEW BEST ASK 4,102 · SPREAD NOW 2 TICKS', cc: 'c' }] },
      info: { k: '7.3 · EXECUTION', h: 'A market buy lifts the offer', b: [[1, 'Market buy for 12 meets 8 resting at 4,101', 'g'], [2, 'Remaining 4 fill at the next price, 4,102', 'g'], [3, 'Average fill = (8×4,101 + 4×4,102) ÷ 12 = **4,101.33**', 'y'], [4, '12 contracts traded: **12 bought and 12 sold**', 'c']], note: { at: 5, label: 'Classification', text: 'These trades executed against the ask, so most data providers classify them as **buyer-initiated** (ask volume).' } },
      say: [
        ['Now watch what happens when an aggressive buyer sends a market order to buy twelve contracts.', 'Sekarang perhatikan apa yang berlaku apabila pembeli agresif menghantar market order untuk membeli 12 kontrak.'],
        ['The order meets the eight contracts resting at the best ask, four thousand one hundred and one. That price level is cleared.', 'Order itu bertemu dengan lapan kontrak yang menunggu di best ask, 4,101. Paras harga itu dikosongkan.'],
        ['The remaining four contracts fill at the next ask, four thousand one hundred and two. The new best ask is four thousand one hundred and two, and the spread has widened to two ticks.', 'Baki empat kontrak diisi pada ask seterusnya, 4,102. Best ask yang baharu ialah 4,102, dan spread telah melebar kepada dua tick.'],
        ['The average fill price is eight times four thousand one hundred and one, plus four times four thousand one hundred and two, divided by twelve: about four thousand one hundred and one point three three.', 'Harga purata isian ialah 8 darab 4,101, campur 4 darab 4,102, bahagi 12: kira-kira 4,101.33.'],
        ['Twelve contracts traded. Twelve were bought, and twelve were sold, by the passive sellers.', 'Dua belas kontrak didagangkan. Dua belas dibeli, dan dua belas dijual, oleh penjual pasif.'],
        ['Because these trades executed against the ask, most data providers classify them as buyer-initiated: ask volume.', 'Kerana dagangan ini dilaksanakan pada ask, kebanyakan data provider mengklasifikasikannya sebagai dimulakan oleh pembeli: ask volume.'],
      ],
    },
    {
      tpl: 'split', label: 'Market sell · limit order',
      a: { type: 'dom', title: 'MARKET SELL 10 · HYPOTHETICAL', tag: 'HITS THE BID', prices: P, snaps: [{ at: 0, q: BOOK, last: 4100 }, { at: 1, q: mod({ 4100: [4, 0] }), last: 4100, marks: [{ p: 4100, side: 'bid', c: 'r', label: '10 FILLED' }], caption: '14 → 4 resting at 4,100' }] },
      b: { type: 'dom', title: 'LIMIT BUY 15 @ 4,100 · HYPOTHETICAL', tag: 'JOINS THE BID', prices: P, snaps: [{ at: 2, q: BOOK, last: 4100 }, { at: 3, q: mod({ 4100: [29, 0] }), last: 4100, marks: [{ p: 4100, side: 'bid', c: 'c', label: '+15 RESTING' }], caption: 'NO TRADE · NO VOLUME', cc: 'c' }] },
      calc: [[4, 'Aggressive orders {a}consume{/} liquidity · passive orders {c}provide{/} liquidity']],
      say: [
        ['On the left, an aggressive seller sends a market sell for ten contracts.', 'Di sebelah kiri, penjual agresif menghantar market sell untuk 10 kontrak.'],
        ['It hits the best bid. Ten of the fourteen contracts at four thousand one hundred are filled, leaving four. These trades would usually be classified as seller-initiated: bid volume.', 'Ia mengenai best bid. Sepuluh daripada 14 kontrak pada 4,100 diisi, meninggalkan empat. Dagangan ini biasanya diklasifikasikan sebagai dimulakan oleh penjual: bid volume.'],
        ['On the right, a trader places a limit buy for fifteen contracts at four thousand one hundred.', 'Di sebelah kanan, seorang trader meletakkan limit buy untuk 15 kontrak pada 4,100.'],
        ['It simply joins the bid queue. No trade occurs, so no volume is recorded.', 'Ia hanya menyertai barisan bid. Tiada dagangan berlaku, jadi tiada volume direkodkan.'],
        ['Aggressive orders consume liquidity. Passive orders provide it.', 'Order agresif menggunakan liquidity. Order pasif menyediakannya.'],
      ],
    },
    {
      tpl: 'table', label: 'Aggressive vs passive', kicker: '7.4 · MARKET PARTICIPANTS\' EXECUTION', h: 'Aggressive and passive execution', cols: ['Term', 'Meaning', 'Example'], widths: [380, 700, 580], hs: 38,
      rows: [
        [1, 'Aggressive buying', 'Buyer crosses the spread to the ask', 'Market buy, marketable limit buy'],
        [1, 'Aggressive selling', 'Seller crosses the spread to the bid', 'Market sell, marketable limit sell'],
        [2, 'Passive liquidity', 'Resting limit orders waiting to be filled', 'Limit buy at 4,100'],
        [3, 'Liquidity provision', 'Adding resting orders to the book', 'Placing limit orders'],
        [3, 'Liquidity consumption', 'Removing resting orders by trading', 'Market orders'],
      ],
      note: { at: 4, c: 'r', label: 'Identity', text: 'Ordinary order-flow displays do **not** reveal who the participants are. "Aggressive" describes how an order executed — not whether it was an institution, a hedger or a retail trader.' },
      say: [
        ['Let us formalise the vocabulary of execution.', 'Mari kita formalkan perbendaharaan kata pelaksanaan.'],
        ['Aggressive buying means a buyer crosses the spread and executes at the ask. Aggressive selling means a seller crosses the spread and executes at the bid.', 'Aggressive buying bermaksud pembeli merentas spread dan dilaksanakan pada ask. Aggressive selling bermaksud penjual merentas spread dan dilaksanakan pada bid.'],
        ['Passive liquidity is the resting limit orders waiting to be filled.', 'Passive liquidity ialah limit order yang menunggu untuk diisi.'],
        ['Adding resting orders is liquidity provision. Removing them by trading is liquidity consumption.', 'Menambah order yang menunggu ialah penyediaan liquidity. Mengeluarkannya melalui dagangan ialah penggunaan liquidity.'],
        ['Ordinary order-flow displays do not reveal who the participants are. Aggressive describes how an order executed, not whether it came from an institution, a hedger or a retail trader.', 'Paparan order flow biasa tidak mendedahkan siapa peserta. Agresif menggambarkan bagaimana order dilaksanakan, bukan sama ada ia datang daripada institusi, hedger atau trader runcit.'],
      ],
    },
    {
      tpl: 'cards', label: 'Trade classification', kicker: '7.5 · HOW SIDES ARE ESTIMATED', h: 'Trade classification depends on method and data', cols: 4, top: 180, ch: 330,
      cards: [
        { n: 'QUOTE RULE', t: 'Compare with bid/ask', b: 'Trade at or above the ask → buyer-initiated. At or below the bid → seller-initiated.', at: 1 },
        { n: 'TICK RULE', t: 'Compare with last trade', b: 'Uptick → buyer-initiated. Downtick → seller-initiated. Used when quotes are unavailable.', at: 2 },
        { n: 'LEE–READY', t: 'Combined method', b: 'Quote rule first; tick rule for trades between the bid and ask. (Lee & Ready, 1991.)', at: 3 },
        { n: 'AGGRESSOR FLAG', nc: 'green2', t: 'Exchange-provided side', b: 'Some exchange feeds mark the aggressor directly. Availability depends on the feed and vendor.', at: 4 },
      ],
      note: { at: 5, y: 560, label: 'Consequence', text: 'Delta and CVD are **only as accurate as the classification**. Two platforms can show different Delta for the same FCPO bar.' },
      say: [
        ['But how does a platform know whether a trade was buyer- or seller-initiated? It estimates it, and the method matters.', 'Tetapi bagaimana platform tahu sama ada dagangan dimulakan oleh pembeli atau penjual? Ia menganggarkannya, dan kaedahnya penting.'],
        ['The quote rule compares the trade price with the bid and ask. At or above the ask is buyer-initiated; at or below the bid is seller-initiated.', 'Quote rule membandingkan harga dagangan dengan bid dan ask. Pada atau di atas ask dikira dimulakan pembeli; pada atau di bawah bid dikira dimulakan penjual.'],
        ['The tick rule compares the trade with the previous trade: an uptick is buyer-initiated, a downtick is seller-initiated. It is used when quotes are unavailable.', 'Tick rule membandingkan dagangan dengan dagangan sebelumnya: uptick dikira dimulakan pembeli, downtick dimulakan penjual. Ia digunakan apabila sebut harga tidak tersedia.'],
        ['The Lee and Ready method, published in nineteen ninety-one, combines them: the quote rule first, and the tick rule for trades between the bid and ask.', 'Kaedah Lee dan Ready, yang diterbitkan pada tahun 1991, menggabungkan kedua-duanya: quote rule dahulu, dan tick rule untuk dagangan antara bid dan ask.'],
        ['Some exchange feeds mark the aggressor side directly. Availability depends on the feed and the vendor.', 'Sesetengah data feed bursa menandakan pihak agresor secara langsung. Ketersediaannya bergantung pada feed dan vendor.'],
        ['The consequence: Delta and C V D are only as accurate as the classification. Two platforms can show different Delta for the same F C P O bar.', 'Akibatnya: Delta dan CVD hanya setepat klasifikasinya. Dua platform boleh menunjukkan Delta yang berbeza untuk bar FCPO yang sama.'],
      ],
    },
    {
      tpl: 'formula', label: 'Delta', kicker: '7.6 · DELTA', h: 'Delta = ask volume − bid volume',
      lines: [
        [1, 'Ask volume (buyer-initiated)  = {gr}1,200{/} contracts'],
        [1, 'Bid volume (seller-initiated) = {r}800{/} contracts'],
        [2, 'Delta = 1,200 − 800 = {g}+400{/}', 'big'],
        [3, 'Total volume = 1,200 + 800 = 2,000 contracts'],
        [4, '{m}Positive Delta → more volume classified as ask-side aggression{/}'],
        [5, '{r}Positive Delta ≠ guaranteed bullish price direction{/}'],
      ],
      note: { at: 6, label: 'Meaning', text: '+400 means that, **under this provider\'s classification method**, 400 more contracts traded at the ask than at the bid. It describes execution — not intent, identity or future direction.' },
      say: [
        ['Now Delta. Delta is ask volume minus bid volume.', 'Sekarang Delta. Delta ialah ask volume tolak bid volume.'],
        ['In this example, one thousand two hundred contracts were classified as buyer-initiated, and eight hundred as seller-initiated.', 'Dalam contoh ini, 1,200 kontrak diklasifikasikan sebagai dimulakan pembeli, dan 800 sebagai dimulakan penjual.'],
        ['Delta equals one thousand two hundred minus eight hundred: plus four hundred.', 'Delta bersamaan 1,200 tolak 800: tambah 400.'],
        ['Total volume is the sum: two thousand contracts.', 'Jumlah volume ialah hasil tambahnya: 2,000 kontrak.'],
        ['Positive Delta means more volume was classified as ask-side aggression.', 'Delta positif bermaksud lebih banyak volume diklasifikasikan sebagai agresi di pihak ask.'],
        ['It does not guarantee that price will rise.', 'Ia tidak menjamin harga akan naik.'],
        ['Plus four hundred means that, under this provider\'s classification method, four hundred more contracts traded at the ask than at the bid. It describes execution, not intent, identity or future direction.', 'Tambah 400 bermaksud, di bawah kaedah klasifikasi provider ini, 400 lebih banyak kontrak didagangkan pada ask berbanding bid. Ia menggambarkan pelaksanaan, bukan niat, identiti atau arah masa depan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Delta by candle',
      viz: { type: 'candles', title: 'FCPO · 5M · HYPOTHETICAL', tag: 'DELTA BY CANDLE', bars: DB, slots: 14, volH: 110, rows: [{ label: 'DELTA', vals: DELTA, at: 1, fs: 14 }], reveal: [[0, 11, 2]], ann: [{ t: 'chl', i: [7], c: 'a', at: 3 }, { t: 'tag', i: 7, text: 'Δ +350 · BAR CLOSED DOWN', c: 'a', at: 3, pos: 'above' }, { t: 'chl', i: [2, 5], c: 'm', at: 2 }] },
      info: { k: '7.6 · DELTA BY CANDLE', h: 'Delta and price can disagree', b: [[1, 'Each bar has its own Delta row', 'c'], [2, 'Most up-bars show positive Delta; most down-bars negative', 'g'], [3, 'Highlighted bar: **Delta +350**, yet the bar **closed down 6 points**', 'a'], [4, 'Possible reading: aggressive buying met passive selling', 'a']], note: { at: 5, c: 'r', label: 'Lesson', text: 'Positive Delta is not an automatic buy signal. Price response tells you whether the aggression achieved anything.' } },
      say: [
        ['Delta can be shown for each candle, as in this row below the chart.', 'Delta boleh ditunjukkan bagi setiap candle, seperti dalam baris di bawah chart ini.'],
        ['Most up-bars here show positive Delta, and most down-bars show negative Delta. That is common, but not guaranteed.', 'Kebanyakan bar naik di sini menunjukkan Delta positif, dan kebanyakan bar turun menunjukkan Delta negatif. Itu biasa, tetapi tidak dijamin.'],
        ['Look at the highlighted bar. Delta is plus three hundred and fifty, yet the bar closed down six points.', 'Lihat bar yang ditandakan. Delta ialah tambah 350, namun bar itu ditutup turun 6 mata.'],
        ['One possible reading is that aggressive buying met enough passive selling to stop price from rising.', 'Satu bacaan yang mungkin ialah aggressive buying bertemu dengan jualan pasif yang cukup untuk menghalang harga daripada naik.'],
        ['So positive Delta is not an automatic buy signal. Price response tells you whether the aggression achieved anything.', 'Jadi Delta positif bukan isyarat beli automatik. Tindak balas harga memberitahu sama ada agresi itu mencapai sesuatu.'],
      ],
    },
    {
      tpl: 'viz', label: 'CVD',
      viz: { type: 'candles', title: 'FCPO · 5M · HYPOTHETICAL', tag: 'CUMULATIVE VOLUME DELTA', bars: DB, slots: 14, volH: 0, vol: false, rows: [{ label: 'DELTA', vals: DELTA, at: 0, fs: 14 }, { label: 'CVD', vals: cum(DELTA), at: 1, fs: 14 }], cvd: { vals: cum(DELTA), at: 2, dur: 2.5 }, reveal: [[0, 11, 1.5]] },
      info: { k: '7.7 · CVD', h: 'Running total of Delta', b: [[1, 'CVD = previous CVD + this bar\'s Delta', 'c'], [2, 'Bars 1–3: 300 → 720 → 570', 'c'], [3, '**Rising CVD:** net ask-side aggression accumulating', 'g'], [4, '**Falling CVD:** net bid-side aggression accumulating', '']], note: { at: 5, label: 'Starting point', text: 'CVD depends on where the sum starts — session open, chart start or a fixed date. Different start points give different CVD levels; compare **shape**, not absolute values.' } },
      say: [
        ['Cumulative Volume Delta, or C V D, is the running total of Delta.', 'Cumulative Volume Delta, atau CVD, ialah jumlah berjalan Delta.'],
        ['Each bar\'s C V D equals the previous C V D plus that bar\'s Delta.', 'CVD setiap bar bersamaan CVD sebelumnya tambah Delta bar tersebut.'],
        ['For example: three hundred, then three hundred plus four hundred and twenty is seven hundred and twenty, then minus one hundred and fifty gives five hundred and seventy.', 'Contohnya: 300, kemudian 300 tambah 420 ialah 720, kemudian tolak 150 memberikan 570.'],
        ['A rising C V D means net ask-side aggression is accumulating.', 'CVD yang meningkat bermaksud agresi bersih di pihak ask sedang terkumpul.'],
        ['A falling C V D means net bid-side aggression is accumulating.', 'CVD yang menurun bermaksud agresi bersih di pihak bid sedang terkumpul.'],
        ['C V D also depends on where the sum starts: the session open, the chart start, or a fixed date. Compare its shape, not its absolute value.', 'CVD juga bergantung pada titik permulaan jumlah: pembukaan sesi, permulaan chart, atau tarikh tetap. Bandingkan bentuknya, bukan nilai mutlaknya.'],
      ],
    },
    {
      tpl: 'viz', label: 'CVD divergence',
      viz: { type: 'candles', title: 'FCPO · 5M · HYPOTHETICAL', tag: 'PRICE vs CVD DIVERGENCE', bars: DV, slots: 18, vol: false, cvd: { vals: cum(DVD), at: 1, dur: 2.5 }, reveal: [[0, 15, 2]], ann: [{ t: 'path', pts: [[7, 4042], [13, 4058]], c: 'g', at: 2 }, { t: 'tag', i: 7, text: 'HIGH 1', c: 'g', at: 2 }, { t: 'tag', i: 13, text: 'HIGHER HIGH', c: 'g', at: 2 }, { t: 'note', x: .62, y: .95, text: 'CVD: LOWER HIGH ↓', c: 'c', at: 3 }] },
      info: { k: '7.7 · DIVERGENCE', h: 'Price and CVD disagree', b: [[1, 'CVD panel below price', 'c'], [2, 'Price: higher high', 'g'], [3, 'CVD: lower high — less net ask aggression on the second push', 'c'], [4, '**Bearish reading:** buying aggression may be fading', ''], [5, '**Bullish mirror:** lower low in price, higher low in CVD', 'g']], note: { at: 6, c: 'r', label: 'Limitation', text: 'CVD divergence does not guarantee a reversal. Divergences can persist, and they depend on classification and the CVD start point.' } },
      say: [
        ['A common use of C V D is divergence. Here, the C V D line is plotted below price.', 'Satu kegunaan biasa CVD ialah divergence. Di sini, garisan CVD diplot di bawah harga.'],
        ['Price makes a higher high.', 'Harga membuat higher high.'],
        ['But C V D makes a lower high. There was less net ask-side aggression on the second push.', 'Tetapi CVD membuat lower high. Terdapat kurang agresi bersih di pihak ask pada tolakan kedua.'],
        ['The bearish reading: buying aggression may be fading.', 'Bacaan bearish: agresi belian mungkin semakin pudar.'],
        ['The bullish mirror is a lower low in price with a higher low in C V D.', 'Cerminan bullish ialah lower low pada harga dengan higher low pada CVD.'],
        ['C V D divergence does not guarantee a reversal. Divergences can persist, and they depend on classification and the start point.', 'CVD divergence tidak menjamin pembalikan. Divergence boleh berterusan, dan ia bergantung pada klasifikasi dan titik permulaan.'],
      ],
    },
    {
      tpl: 'cards', label: 'Limitations', kicker: '7.8 · DATA LIMITATIONS', h: 'Before trusting Delta or CVD, check four things', cols: 4, top: 180, ch: 300,
      cards: [
        { n: '01', t: 'Classification method', b: 'Quote rule, tick rule, Lee–Ready or exchange aggressor flag?', at: 1 },
        { n: '02', t: 'Data feed', b: 'Tick-by-tick or aggregated? Missing or delayed prints?', at: 2 },
        { n: '03', t: 'Platform settings', b: 'CVD reset point, session template, contract roll handling.', at: 3 },
        { n: '04', t: 'Historical depth', b: 'Is historical tick data stored, or only recent data?', at: 4 },
      ],
      note: { at: 5, y: 540, c: 'r', label: 'Never', text: 'Never reconstruct Delta from ordinary OHLC candles and present it as real order flow. Without tick data, Delta cannot be known.' },
      say: [
        ['Before trusting Delta or C V D, check four things.', 'Sebelum mempercayai Delta atau CVD, semak empat perkara.'],
        ['One: the classification method.', 'Satu: kaedah klasifikasi.'],
        ['Two: the data feed. Is it tick-by-tick or aggregated, and are any prints missing or delayed?', 'Dua: data feed. Adakah ia tick demi tick atau teragregat, dan adakah sebarang cetakan hilang atau tertangguh?'],
        ['Three: platform settings, such as the C V D reset point, the session template, and how contract rollover is handled.', 'Tiga: tetapan platform, seperti titik set semula CVD, templat sesi, dan cara rollover kontrak dikendalikan.'],
        ['Four: historical depth. Is historical tick data stored, or only recent data?', 'Empat: kedalaman sejarah. Adakah data tick sejarah disimpan, atau hanya data terkini?'],
        ['And never reconstruct Delta from ordinary candles and present it as real order flow. Without tick data, Delta cannot be known.', 'Dan jangan sekali-kali membina semula Delta daripada candle biasa dan membentangkannya sebagai order flow sebenar. Tanpa data tick, Delta tidak dapat diketahui.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercises 7–8', kicker: 'EXERCISES 7 & 8', h: 'Calculate Delta · Interpret CVD', cols: 2, top: 180, ch: 360,
      cards: [
        { n: 'EX 7', t: 'Calculate Delta', b: 'Bar A: ask 950, bid 1,310. Bar B: ask 1,480, bid 1,020. Bar C: ask 700, bid 690. Calculate each Delta, and the CVD after Bar C starting from zero.', at: 1, foot: 'A = −360 · B = +460 · C = +10 · CVD = +110', fc: 'green2' },
        { n: 'EX 8', t: 'Interpret CVD', b: 'Price makes a lower low while CVD makes a higher low at a bullish POI. Write one possible interpretation, one alternative, and what price must do to support your reading.', at: 2, foot: 'e.g. selling aggression may be fading · may continue · needs CHoCH', fc: 'green2' },
      ],
      say: [
        ['Exercises Seven and Eight.', 'Latihan 7 dan 8.'],
        ['Exercise Seven: calculate the Delta of three bars, and the C V D after the third bar. Bar A: minus three hundred and sixty. Bar B: plus four hundred and sixty. Bar C: plus ten. C V D: plus one hundred and ten.', 'Latihan 7: kira Delta bagi tiga bar, dan CVD selepas bar ketiga. Bar A: tolak 360. Bar B: tambah 460. Bar C: tambah 10. CVD: tambah 110.'],
        ['Exercise Eight: price makes a lower low while C V D makes a higher low at a bullish point of interest. Write a possible interpretation, an alternative, and what price must do to support your reading, such as a change of character.', 'Latihan 8: harga membuat lower low manakala CVD membuat higher low di POI bullish. Tulis interpretasi yang mungkin, alternatif, dan apa yang harga mesti lakukan untuk menyokong bacaan anda, seperti change of character.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What does positive Delta represent — and why does it not guarantee rising prices?',
      opts: ['More buyers than sellers existed', 'More volume was classified as ask-side aggression; passive sellers can still absorb it', 'Institutions bought the bar', 'Price must rise on the next bar'], ans: 1, ansAt: 1,
      expl: 'Every contract has a buyer and seller. Delta describes classified aggression under one method; price response decides the outcome.',
      say: [
        ['Knowledge check. What does positive Delta represent, and why does it not guarantee rising prices?', 'Semakan pengetahuan. Apakah yang diwakili oleh Delta positif, dan mengapa ia tidak menjamin harga naik?', { p: 1.5 }],
        ['The answer is B. More volume was classified as ask-side aggression, but passive sellers can still absorb it. Option A is wrong: every contract has a buyer and a seller.', 'Jawapannya ialah B. Lebih banyak volume diklasifikasikan sebagai agresi di pihak ask, tetapi penjual pasif masih boleh menyerapnya. Pilihan A salah: setiap kontrak mempunyai pembeli dan penjual.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is the difference between Delta and CVD?',
      opts: ['They are identical', 'Delta is per bar (or period); CVD is the running total of Delta from a start point', 'CVD measures open interest', 'Delta includes limit orders that did not trade'], ans: 1, ansAt: 1,
      expl: 'CVD accumulates Delta. Its level depends on the start point; its shape is what we read.',
      say: [
        ['Second question. What is the difference between Delta and C V D?', 'Soalan kedua. Apakah perbezaan antara Delta dan CVD?', { p: 1.5 }],
        ['The answer is B. Delta is measured per bar or period. C V D is the running total of Delta from a chosen start point.', 'Jawapannya ialah B. Delta diukur bagi setiap bar atau tempoh. CVD ialah jumlah berjalan Delta dari titik permulaan yang dipilih.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Order Flow microstructure — what to remember',
      items: [[0, 'Bid, ask, quantity and spread form the order book'], [1, 'Market orders consume; limit orders provide liquidity'], [2, 'Every trade has a buyer and a seller', 'w'], [3, '"Aggressive" describes execution, not identity'], [4, 'Side is estimated by a classification method'], [5, 'Delta = ask volume − bid volume'], [6, 'CVD = running total of Delta from a start point'], [7, 'Delta and CVD never guarantee direction', 'w']],
      say: [
        ['To summarise. Bid, ask, quantity and spread form the order book.', 'Sebagai rumusan. Bid, ask, kuantiti dan spread membentuk buku pesanan.'],
        ['Market orders consume liquidity; limit orders provide it.', 'Market order menggunakan liquidity; limit order menyediakannya.'],
        ['Every trade has both a buyer and a seller.', 'Setiap dagangan mempunyai pembeli dan penjual.'],
        ['Aggressive describes execution, not identity.', 'Agresif menggambarkan pelaksanaan, bukan identiti.'],
        ['The aggressor side is estimated by a classification method.', 'Pihak agresor dianggarkan menggunakan kaedah klasifikasi.'],
        ['Delta is ask volume minus bid volume.', 'Delta ialah ask volume tolak bid volume.'],
        ['C V D is the running total of Delta from a start point.', 'CVD ialah jumlah berjalan Delta dari titik permulaan.'],
        ['And Delta and C V D never guarantee direction.', 'Dan Delta serta CVD tidak pernah menjamin arah.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 3', h: 'Inside the candle: Footprint, DOM and the tape',
      chips: [[0, 'Footprint', 'Bid × ask at every price'], [0, 'Imbalance', 'Diagonal, ratio-based, stacked'], [0, 'Absorption · DOM · Tape', 'And their limits']],
      nk: 'NEXT · VIDEO 08', nt: 'Advanced Order Flow', nAt: 1, ny: 420,
      say: [
        ['In Video Eight, we look inside the candle: footprint charts, imbalance, absorption, Depth of Market and Time and Sales, together with their limitations.', 'Dalam Video 8, kita melihat ke dalam candle: footprint chart, imbalance, absorption, Depth of Market dan Time and Sales, bersama hadnya.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua data order book, Delta dan CVD dalam video ini ialah ilustrasi hipotetikal. Rujukan: L. Harris — Trading and Exchanges; Lee & Ready (1991), Journal of Finance.', foot: 'Seterusnya: Video 08 — Advanced Order Flow',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
