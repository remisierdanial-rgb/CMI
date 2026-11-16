/* VIDEO 09 — SMC + Order Flow Integration
   Subtopic 3 · SMC + Order Flow — sections K (Integration framework), L (Case studies), M (Common mistakes). */
const B = (o, h, l, c, v) => ({ o, h, l, c, v });
const runDown = (p, n, d, v) => Array.from({ length: n }, (_, i) => { const o = p + d * i, c = o + d; return B(o, Math.max(o, c) + 3, Math.min(o, c) - 3, c, v); });
// Bullish 5M sequence (hypothetical)
const BULL = [...runDown(4130, 8, -7, 900),
  B(4074, 4078, 4066, 4071, 1000), B(4071, 4077, 4069, 4075, 800), B(4075, 4076, 4066, 4069, 950), B(4069, 4074, 4067, 4072, 800),
  B(4072, 4073, 4060, 4064, 2400), B(4064, 4067, 4059, 4065, 2600), B(4065, 4074, 4063, 4073, 1800), B(4073, 4080, 4071, 4079, 1500),
  B(4079, 4081, 4074, 4077, 900), B(4077, 4086, 4076, 4085, 1100), B(4085, 4096, 4084, 4093, 1300), B(4093, 4104, 4091, 4102, 1250), B(4102, 4112, 4100, 4110, 1200), B(4110, 4119, 4108, 4117, 1150), B(4117, 4126, 4115, 4123, 1100)];
const BULL_D = [-80, -60, -90, -40, -70, -50, -60, -30, -120, 90, -110, 60, -610, -520, 420, 380, -40, 150, 210, 160, 140, 120, 90];
const M = 8140, mir = b => B(M - b.o, M - b.l, M - b.h, M - b.c, b.v);
const BEAR = BULL.map(mir), BEAR_D = BULL_D.map(x => -x);
const cum = a => a.reduce((o, x) => (o.push((o.length ? o[o.length - 1] : 0) + x), o), []);
// footprint generator: exact total volume V and Delta D; volume peaks at poc; skew tilts ask share with price
function fp(bar, D, poc, skew, label) {
  const ps = []; for (let p = bar.h; p >= bar.l; p--) ps.push(p);
  const w = ps.map(p => 1 / (1 + 0.35 * Math.abs(p - poc))), sw = w.reduce((a, b) => a + b, 0), mid = (bar.h + bar.l) / 2;
  const rows = ps.map((p, k) => { const vol = Math.round(bar.v * w[k] / sw); const sh = Math.min(.92, Math.max(.08, .5 + D / (2 * bar.v) + skew * (p - mid) / Math.max(1, bar.h - bar.l))); const ask = Math.round(vol * sh); return [p, vol - ask, ask]; });
  const r = rows.find(x => x[0] === poc); let V = rows.reduce((a, x) => a + x[1] + x[2], 0), d = rows.reduce((a, x) => a + x[2] - x[1], 0);
  const dv = bar.v - V, dd = D - d; // fix totals on the POC row: ask+bid += dv, ask-bid += dd
  r[2] += (dv + dd) / 2; r[1] += (dv - dd) / 2; r[1] = Math.round(r[1]); r[2] = Math.round(r[2]);
  return { label, o: bar.o, c: bar.c, rows };
}
const mirFp = f => ({ label: f.label, o: M - f.o, c: M - f.c, rows: f.rows.map(([p, b, a]) => [M - p, a, b]).sort((x, y) => y[0] - x[0]) });
const FB = [fp(BULL[12], -610, 4066, .35, 'SWEEP BAR'), fp(BULL[13], -520, 4062, .4, 'NEXT BAR'), fp(BULL[14], 420, 4068, .1, 'REVERSAL BAR')];
const FS = FB.map(mirFp);

EP({
  num: '09', short: 'SMC + Order Flow', title: 'SMC + Order Flow Integration',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 09 · SUBTOPIC 3 · SMC + ORDER FLOW',
      h: 'SMC + Order Flow Integration', sub: 'Ten-step framework · Bullish and bearish FCPO case studies · Common mistakes',
      obj: [[1, 'Apply a ten-step SMC + Order Flow framework'], [2, 'Evaluate Delta, footprint and price response at a POI'], [3, 'Enter only after predefined, observable confirmation'], [4, 'Avoid the eight most common Order Flow mistakes']],
      viz: { type: 'footprint', title: 'AT THE POI · HYPOTHETICAL', cols: FB.slice(1, 3), ratio: 3 },
      say: [
        ['Welcome to Video Nine. We now integrate Order Flow with S M C.', 'Selamat datang ke Video 9. Kita kini mengintegrasikan Order Flow dengan SMC.'],
        ['S M C tells us where to look: structure, liquidity and points of interest. Order Flow tells us how trading unfolds when price gets there.', 'SMC memberitahu kita di mana untuk melihat: struktur, liquidity dan POI. Order Flow memberitahu kita bagaimana dagangan berlaku apabila harga sampai ke situ.'],
        ['We will use a ten-step framework, and walk through a bullish and a bearish F C P O case study.', 'Kita akan menggunakan kerangka sepuluh langkah, dan meneliti kajian kes FCPO bullish dan bearish.'],
        ['All order flow data in this video is hypothetical. Real use requires a suitable tick-level data source.', 'Semua data order flow dalam video ini adalah hipotetikal. Penggunaan sebenar memerlukan sumber data peringkat tick yang sesuai.'],
      ],
    },
    {
      tpl: 'flow', label: 'Integration framework', kicker: '9.1 · INTEGRATION FRAMEWORK', h: 'SMC + Order Flow in ten steps', cols: 2, top: 160, sh: 112,
      steps: [
        { t: 'HTF bias', s: 'Higher-timeframe structure and direction', at: 1, c: 'gold' },
        { t: 'Liquidity mapping', s: 'Equal highs/lows, swing points, session extremes', at: 1, c: 'cyan' },
        { t: 'SMC POI selection', s: 'OB, FVG or supply/demand — by rules', at: 2, c: 'gold' },
        { t: 'Price reaches POI', s: 'Only now does order flow become relevant', at: 2 },
        { t: 'Observe Order Flow', s: 'Is suitable data available? Which settings?', at: 3, c: 'green2' },
        { t: 'Evaluate Delta & CVD', s: 'Direction and size of classified aggression', at: 3, c: 'green2' },
        { t: 'Examine footprint', s: 'Volume at price, imbalances, bar POC', at: 4, c: 'green2' },
        { t: 'Absorption or imbalance?', s: 'Aggression with or without progress', at: 4, c: 'amber' },
        { t: 'Evaluate price response', s: 'Recovery, displacement, CHoCH / MSS', at: 5, c: 'gold' },
        { t: 'Entry decision', s: 'Are the predefined conditions met — yes or no?', at: 5, hl: 'gold' },
      ],
      say: [
        ['Here is the ten-step integration framework.', 'Ini ialah kerangka integrasi sepuluh langkah.'],
        ['Start with higher-timeframe bias, and map the liquidity.', 'Mulakan dengan bias higher timeframe, dan petakan liquidity.'],
        ['Select a point of interest using your S M C rules, and wait for price to reach it. Only then does order flow become relevant.', 'Pilih POI menggunakan peraturan SMC anda, dan tunggu harga mencapainya. Hanya pada ketika itu order flow menjadi relevan.'],
        ['Observe order flow, if suitable data is available, and evaluate Delta and C V D.', 'Perhatikan order flow, jika data yang sesuai tersedia, dan nilai Delta dan CVD.'],
        ['Examine the footprint, and look for possible absorption or imbalance.', 'Teliti footprint, dan cari kemungkinan absorption atau imbalance.'],
        ['Then evaluate the price response, and decide whether your predefined entry conditions are met. The answer is yes or no, not maybe.', 'Kemudian nilai tindak balas harga, dan tentukan sama ada syarat entry yang telah ditetapkan dipenuhi. Jawapannya ya atau tidak, bukan mungkin.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bullish · context',
      viz: { type: 'candles', title: 'BULLISH CASE · FCPO · 5M · HYPOTHETICAL', tag: 'STEPS 1–4', bars: BULL.slice(0, 15), slots: 25, range: [4040, 4140], volH: 100, rows: [{ label: 'DELTA', vals: BULL_D.slice(0, 15), at: 4, fs: 12 }], reveal: [[0, 11, 2], [3, 14, 1.5]],
        ann: [{ t: 'zone', p1: 4058, p2: 4070, i1: 6, i2: 24, c: 'g', label: 'HTF BULLISH POI (15M DEMAND)', at: 1, ly: 'b', lx: 'r' }, { t: 'hline', p: 4066, i1: 7, i2: 13, c: 'c', label: 'SSL · EQUAL LOWS 4,066', at: 2, lx: 'l' }, { t: 'tag', i: 13, text: 'SWEEP · LOW 4,059', c: 'c', pos: 'below', at: 3 }] },
      info: { k: '9.2 · BULLISH CASE', h: 'Context first', b: [[1, 'HTF bias bullish; 15M demand POI at 4,058–4,070', 'g'], [2, 'Equal lows at 4,066 = sell-side liquidity', 'c'], [3, 'Price sweeps to 4,060, then 4,059', 'c'], [4, 'Delta strongly negative on these bars: aggressive selling', '']] },
      say: [
        ['Bullish case study. Steps one to four: context.', 'Kajian kes bullish. Langkah satu hingga empat: konteks.'],
        ['Higher-timeframe bias is bullish, and a fifteen-minute demand zone from four thousand and fifty-eight to four thousand and seventy is our selected point of interest.', 'Bias higher timeframe adalah bullish, dan zon demand 15 minit dari 4,058 hingga 4,070 ialah POI yang kita pilih.'],
        ['Equal lows at four thousand and sixty-six hold sell-side liquidity.', 'Equal lows pada 4,066 menyimpan sell-side liquidity.'],
        ['Price reaches the zone, and sweeps the liquidity to four thousand and sixty, and then four thousand and fifty-nine.', 'Harga mencapai zon itu, dan menyapu liquidity ke 4,060, dan kemudian 4,059.'],
        ['Delta on these two bars is strongly negative: minus six hundred and ten, and minus five hundred and twenty. Aggressive selling is observed.', 'Delta pada dua bar ini sangat negatif: tolak 610, dan tolak 520. Aggressive selling diperhatikan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bullish · footprint',
      viz: { type: 'footprint', title: 'BULLISH CASE · FOOTPRINT · HYPOTHETICAL', tag: 'STEPS 5–8', cols: [{ ...FB[0], at: 0 }, { ...FB[1], at: 1 }, { ...FB[2], at: 4 }], ratio: 3, marks: [{ col: 1, p1: 4062, p2: 4059, c: 'a', label: 'HEAVY BID · LOW 4,059', at: 2 }] },
      info: { k: '9.2 · BULLISH CASE', h: 'What the footprint shows', b: [[1, 'Next bar: Delta −520 on 2,600 contracts', ''], [2, 'Heavy bid volume near the low…', 'a'], [3, '…yet the bar makes only **1 tick** of new low and closes **up** (4,064 → 4,065)', 'a'], [4, '**Interpretation:** possible absorption of aggressive selling', 'a'], [5, 'Reversal bar: Delta +420; closes at 4,073', 'g']], note: { at: 6, label: 'Not yet an entry', text: 'Possible absorption is a reason to keep watching — not a signal by itself.' } },
      say: [
        ['Now steps five to eight, inside the bars. On the left, the sweep bar.', 'Sekarang langkah lima hingga lapan, di dalam bar. Di sebelah kiri, bar sweep.'],
        ['In the next bar, Delta is minus five hundred and twenty, on two thousand six hundred contracts.', 'Dalam bar seterusnya, Delta ialah tolak 520, pada 2,600 kontrak.'],
        ['Heavy bid volume is concentrated near the low.', 'Bid volume yang berat tertumpu berhampiran low.'],
        ['Yet the bar makes only one tick of new low, and closes up, from four thousand and sixty-four to four thousand and sixty-five.', 'Namun bar itu hanya membuat satu tick low baharu, dan ditutup naik, dari 4,064 ke 4,065.'],
        ['Interpretation: possible absorption of aggressive selling.', 'Interpretasi: kemungkinan absorption terhadap aggressive selling.'],
        ['The following bar shows Delta of plus four hundred and twenty, and closes at four thousand and seventy-three.', 'Bar berikutnya menunjukkan Delta tambah 420, dan ditutup pada 4,073.'],
        ['But possible absorption is a reason to keep watching. It is not a signal by itself.', 'Tetapi kemungkinan absorption ialah sebab untuk terus memerhati. Ia bukan isyarat dengan sendirinya.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bullish · confirmation',
      viz: { type: 'candles', title: 'BULLISH CASE · FCPO · 5M · HYPOTHETICAL', tag: 'STEPS 9–10', bars: BULL, slots: 25, range: [4040, 4140], volH: 80, rows: [{ label: 'DELTA', vals: BULL_D, at: 0, fs: 12 }], cvd: { vals: cum(BULL_D), at: 0, dur: 1 }, reveal: [[0, 14, .01], [1, 16, 1], [4, 22, 2]],
        ann: [{ t: 'hline', p: 4077, i1: 9, i2: 16, c: 'y', label: 'CHoCH 4,077', at: 1, lx: 'l' }, { t: 'hline', p: 4077, i1: 16, i2: 24, c: 'w', label: 'ENTRY 4,077', at: 2, dash: false, w: 1.5 }, { t: 'hline', p: 4057, i1: 13, i2: 24, c: 'r', label: 'STOP 4,057', at: 2 }, { t: 'hline', p: 4119, i1: 2, i2: 24, c: 'c', label: 'TARGET · BSL 4,119', at: 3 }] },
      info: { k: '9.2 · BULLISH CASE', h: 'Predefined confirmation', b: [[1, 'Close above 4,077 (prior swing high) = **CHoCH**', 'y'], [2, 'Rule: limit entry at 4,077 on retest · stop 4,057 below sweep low', 'w'], [3, 'Target: internal BSL at 4,119 · risk 20 ticks · reward 42 ticks · RR 2.1', 'c'], [4, 'CVD turns up from the low', 'c']], note: { at: 5, label: 'Risk', text: '20 ticks × RM25 = RM500 per contract, before costs. Target reached in this illustration.' } },
      say: [
        ['Steps nine and ten: price response and the entry decision.', 'Langkah sembilan dan sepuluh: tindak balas harga dan keputusan entry.'],
        ['Price closes above four thousand and seventy-seven, the prior swing high. This is a change of character, our predefined confirmation.', 'Harga ditutup di atas 4,077, swing high sebelumnya. Ini ialah change of character, pengesahan yang telah kita tetapkan.'],
        ['The rule is a limit entry at four thousand and seventy-seven on a retest, with a stop at four thousand and fifty-seven, below the sweep low.', 'Peraturannya ialah limit entry pada 4,077 semasa retest, dengan stop pada 4,057, di bawah low sweep.'],
        ['The target is internal buy-side liquidity at four thousand one hundred and nineteen. Risk is twenty ticks, reward forty-two ticks: about two point one R.', 'Sasarannya ialah buy-side liquidity dalaman pada 4,119. Risiko 20 tick, ganjaran 42 tick: kira-kira 2.1R.'],
        ['Notice C V D turning up from its low as the structure changes.', 'Perhatikan CVD mula naik dari paras rendahnya ketika struktur berubah.'],
        ['Risk is five hundred ringgit per contract, before costs. The target is reached in this illustration.', 'Risiko ialah RM500 setiap kontrak, sebelum kos. Sasaran dicapai dalam ilustrasi ini.'],
      ],
    },
    {
      tpl: 'split', label: 'Bearish case',
      a: { type: 'candles', title: 'BEARISH CASE · FCPO · 5M · HYPOTHETICAL', tag: 'CONTEXT & CONFIRMATION', bars: BEAR, slots: 25, range: [4000, 4100], volH: 70, rows: [{ label: 'DELTA', vals: BEAR_D, at: 0, fs: 10 }], reveal: [[0, 14, 2], [3, 22, 2]],
        ann: [{ t: 'zone', p1: 4070, p2: 4082, i1: 6, i2: 24, c: 'r', label: 'HTF BEARISH POI', at: 0, d: 1, lx: 'r' }, { t: 'hline', p: 4074, i1: 7, i2: 13, c: 'c', label: 'BSL 4,074', at: 1, lx: 'l' }, { t: 'hline', p: 4063, i1: 9, i2: 16, c: 'y', label: 'CHoCH 4,063', at: 3, lx: 'l' }, { t: 'hline', p: 4063, i1: 16, i2: 24, c: 'w', label: 'ENTRY', at: 4, dash: false, w: 1.5 }, { t: 'hline', p: 4083, i1: 13, i2: 24, c: 'r', label: 'STOP 4,083', at: 4 }, { t: 'hline', p: 4021, i1: 2, i2: 24, c: 'c', label: 'TARGET 4,021', at: 4 }] },
      b: { type: 'footprint', title: 'AT THE HIGH · FOOTPRINT', tag: 'POSSIBLE ABSORPTION', cols: [{ ...FS[1], at: 2 }, { ...FS[2], at: 2, d: .5 }], ratio: 3 },
      say: [
        ['The bearish case is the mirror. Price reaches a higher-timeframe bearish point of interest, with equal highs at four thousand and seventy-four.', 'Kes bearish ialah cerminannya. Harga mencapai POI bearish higher timeframe, dengan equal highs pada 4,074.'],
        ['Buy-side liquidity is swept to four thousand and eighty-one, on strongly positive Delta: aggressive buying.', 'Buy-side liquidity disapu ke 4,081, dengan Delta yang sangat positif: aggressive buying.'],
        ['The footprint shows heavy ask volume near the high, with Delta of plus five hundred and twenty, yet the bar closes one tick lower. Possible absorption of aggressive buying. The next bar shows Delta of minus four hundred and twenty.', 'Footprint menunjukkan ask volume yang berat berhampiran high, dengan Delta tambah 520, namun bar itu ditutup satu tick lebih rendah. Kemungkinan absorption terhadap aggressive buying. Bar seterusnya menunjukkan Delta tolak 420.'],
        ['Price closes below four thousand and sixty-three: a bearish change of character.', 'Harga ditutup di bawah 4,063: bearish change of character.'],
        ['Entry conditions are assessed: a limit short at four thousand and sixty-three, stop at four thousand and eighty-three, and target at four thousand and twenty-one. Again, twenty ticks of risk for forty-two of reward.', 'Syarat entry dinilai: limit short pada 4,063, stop pada 4,083, dan sasaran pada 4,021. Sekali lagi, 20 tick risiko untuk 42 tick ganjaran.'],
      ],
    },
    {
      tpl: 'cards', label: 'Predefined rules', kicker: '9.3 · TESTABLE CONFIRMATION', h: 'Write the confirmation rule before the trade', cols: 2, top: 180, ch: 380,
      cards: [
        { n: 'VAGUE', nc: 'red2', t: '"Enter when order flow looks bullish"', b: 'Cannot be tested. Will be applied differently every time. Invites hindsight.', at: 1, bc: 'red' },
        { n: 'TESTABLE (EXAMPLE)', nc: 'green2', t: 'Observable conditions', b: 'At a valid POI, after an SSL sweep: (1) one bar with Delta ≤ −400 and body ≤ 2 ticks; (2) within 3 bars, a close above the last swing high; (3) limit entry at that high; stop 2 ticks below the sweep low.', at: 2, bc: 'green' },
      ],
      note: { at: 3, y: 610, label: 'Note', text: 'The numbers above are an example for teaching, not a recommended or tested rule. Thresholds must be set from your data and validated in backtesting (Videos 13–15).' },
      say: [
        ['The most important professional habit: write the confirmation rule before the trade.', 'Tabiat profesional yang paling penting: tulis peraturan pengesahan sebelum trade.'],
        ['Enter when order flow looks bullish cannot be tested. It will be applied differently every time, and it invites hindsight.', 'Masuk apabila order flow kelihatan bullish tidak boleh diuji. Ia akan diaplikasikan secara berbeza setiap kali, dan ia mengundang hindsight.'],
        ['A testable rule uses observable conditions. For example: at a valid point of interest after a sell-side sweep, one bar with Delta below minus four hundred and a body of two ticks or less; then, within three bars, a close above the last swing high; a limit entry at that high, and a stop two ticks below the sweep low.', 'Peraturan yang boleh diuji menggunakan syarat yang boleh diperhatikan. Contohnya: di POI yang sah selepas sell-side sweep, satu bar dengan Delta di bawah tolak 400 dan badan dua tick atau kurang; kemudian, dalam tiga bar, penutupan di atas swing high terakhir; limit entry pada high tersebut, dan stop dua tick di bawah low sweep.'],
        ['These numbers are a teaching example, not a recommended or tested rule. Thresholds must be validated in backtesting, which we cover in Videos Thirteen to Fifteen.', 'Angka-angka ini ialah contoh pengajaran, bukan peraturan yang disyorkan atau telah diuji. Ambang mesti disahkan melalui backtesting, yang kita bincangkan dalam Video 13 hingga 15.'],
      ],
    },
    {
      tpl: 'cards', label: 'Common mistakes', kicker: '9.4 · COMMON ORDER FLOW MISTAKES', h: 'Eight mistakes to avoid', cols: 4, top: 170, ch: 210,
      cards: [
        { n: '01', nc: 'red2', t: 'Positive Delta = buy', b: 'Delta is not an automatic signal.', at: 1 },
        { n: '02', nc: 'red2', t: 'Negative Delta = sell', b: 'Passive buyers may absorb it.', at: 1 },
        { n: '03', nc: 'red2', t: 'Absorption = institutions', b: 'Identity is not visible.', at: 2 },
        { n: '04', nc: 'red2', t: 'DOM = executed volume', b: 'Displayed is not traded.', at: 2 },
        { n: '05', nc: 'red2', t: 'Ignoring classification', b: 'Know your provider\'s method.', at: 3 },
        { n: '06', nc: 'red2', t: 'Footprint without context', b: 'Location and structure first.', at: 3 },
        { n: '07', nc: 'red2', t: 'DOM shows all interest', b: 'Hidden and unsent orders exist.', at: 4 },
        { n: '08', nc: 'red2', t: 'Order flow from OHLC', b: 'Exact history needs tick data.', at: 4 },
      ],
      say: [
        ['Eight common Order Flow mistakes.', 'Lapan kesilapan biasa Order Flow.'],
        ['Treating positive Delta as an automatic buy signal, or negative Delta as an automatic sell signal.', 'Menganggap Delta positif sebagai isyarat beli automatik, atau Delta negatif sebagai isyarat jual automatik.'],
        ['Assuming all absorption is institutional, and confusing displayed order-book quantity with executed volume.', 'Menganggap semua absorption adalah institusi, dan mengelirukan kuantiti order book yang dipaparkan dengan volume yang dilaksanakan.'],
        ['Ignoring the provider\'s classification method, and using the footprint without understanding price context.', 'Mengabaikan kaedah klasifikasi provider, dan menggunakan footprint tanpa memahami konteks harga.'],
        ['Assuming the DOM represents all market interest, and using ordinary candles to claim exact historical order-book behaviour.', 'Menganggap DOM mewakili semua minat pasaran, dan menggunakan candle biasa untuk mendakwa tingkah laku order book sejarah yang tepat.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Price reaches a bullish POI. Delta is −520, but the bar closes up. What is the professional next step?',
      opts: ['Buy immediately — absorption is confirmed', 'Sell — negative Delta means price will fall', 'Note possible absorption, and wait for the predefined structural confirmation', 'Ignore order flow completely'], ans: 2, ansAt: 1,
      expl: 'Possible absorption is an observation-based hypothesis. Entry requires the rule you wrote in advance.',
      say: [
        ['Knowledge check. Price reaches a bullish point of interest. Delta is minus five hundred and twenty, but the bar closes up. What is the professional next step?', 'Semakan pengetahuan. Harga mencapai POI bullish. Delta ialah tolak 520, tetapi bar ditutup naik. Apakah langkah profesional seterusnya?', { p: 1.5 }],
        ['The answer is C. Note the possible absorption, and wait for the predefined structural confirmation.', 'Jawapannya ialah C. Catat kemungkinan absorption, dan tunggu pengesahan struktur yang telah ditetapkan.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'SMC + Order Flow — what to remember',
      items: [[0, 'SMC says where; Order Flow describes how it trades there'], [1, 'Follow the ten-step framework in order'], [2, 'Order flow matters only at a selected POI'], [3, 'Aggression + limited progress = possible absorption'], [4, 'Structure change is the confirmation'], [5, 'Write testable rules before the trade', 'w'], [6, 'Example thresholds must be backtested', 'w'], [7, 'Avoid the eight common mistakes', 'w']],
      say: [
        ['To summarise. S M C says where to look; Order Flow describes how trading unfolds there.', 'Sebagai rumusan. SMC memberitahu di mana untuk melihat; Order Flow menggambarkan bagaimana dagangan berlaku di situ.'],
        ['Follow the ten-step framework in order.', 'Ikuti kerangka sepuluh langkah mengikut urutan.'],
        ['Order flow matters only at a selected point of interest.', 'Order flow hanya penting di POI yang dipilih.'],
        ['Aggression with limited progress suggests possible absorption.', 'Agresi dengan kemajuan terhad menunjukkan kemungkinan absorption.'],
        ['Structure change is the confirmation.', 'Perubahan struktur ialah pengesahannya.'],
        ['Write testable rules before the trade.', 'Tulis peraturan yang boleh diuji sebelum trade.'],
        ['Example thresholds must be backtested.', 'Ambang contoh mesti diuji melalui backtest.'],
        ['And avoid the eight common mistakes.', 'Dan elakkan lapan kesilapan biasa.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 4', h: 'Where volume traded: Volume Profile',
      chips: [[0, 'POC', 'Highest-volume price'], [0, 'Value Area', 'VAH, VAL and the 70% convention'], [0, 'HVN · LVN', 'High- and low-volume nodes']],
      nk: 'NEXT · VIDEO 10', nt: 'Volume Profile Foundations', nAt: 1, ny: 420,
      say: [
        ['That completes Subtopic Three. In Video Ten, Subtopic Four begins with Volume Profile: point of control, value area, and high- and low-volume nodes.', 'Itu melengkapkan Subtopik 3. Dalam Video 10, Subtopik 4 bermula dengan Volume Profile: point of control, value area, dan high serta low volume node.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga, Delta dan footprint FCPO dalam video ini ialah ilustrasi hipotetikal. Peraturan contoh tidak diuji dan bukan cadangan.', foot: 'Seterusnya: Video 10 — Volume Profile Foundations',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
