/* VIDEO 15 — Advanced Performance Evaluation
   Subtopic 6 — sections F (Overfitting), H (Sample size), I (Costs & execution), J (IS/OOS), K (Walk-forward), L (Regimes), N (Journal), O (Common mistakes).
   Monte Carlo: Python random.seed(15); 8 samples × 20 trades; P(win)=0.40, win=+2R, loss=−1R (true E = +0.20R).
   Results: +0.35, −0.10, +0.35, +0.05, +0.35, +0.35, +0.35, −0.10. CI uses the Video 14 sample: mean 0.225R, SD 1.550R. */
const MC = [0.35, -0.10, 0.35, 0.05, 0.35, 0.35, 0.35, -0.10];
const R14 = [2.1, -1, -1, 1.8, -1, 2.4, -1, -1, -1, 2.0, -1, 1.6, -1, 2.2, -1, -1, 2.5, -1, 1.9, -1];

EP({
  num: '15', short: 'Advanced Evaluation', title: 'Advanced Performance Evaluation',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 15 · SUBTOPIC 6 · BACKTESTING & PERFORMANCE',
      h: 'Advanced Performance Evaluation', sub: 'Sample size · Overfitting · Out-of-sample · Walk-forward · Costs · Regimes · Journal',
      obj: [[1, 'Explain why small samples mislead, using variance and confidence intervals'], [2, 'Recognise overfitting and use in-sample / out-of-sample and walk-forward tests'], [3, 'Include realistic costs and execution assumptions'], [4, 'Evaluate by regime and separate strategy quality from execution quality']],
      viz: { type: 'wf', title: 'WALK-FORWARD · ILLUSTRATIVE', rowH: 70, rows: [0, 1, 2, 3].map(k => ({ at: 0, d: k * .4, label: 'RUN ' + (k + 1), segs: [[k * 15, k * 15 + 45, 'b', 'TRAIN'], [k * 15 + 45, k * 15 + 60, 'g', 'TEST']] })) },
      say: [
        ['Welcome to Video Fifteen. In Video Fourteen, we calculated metrics. Now we ask a harder question: are those results real?', 'Selamat datang ke Video 15. Dalam Video 14, kita mengira metrik. Sekarang kita bertanya soalan yang lebih sukar: adakah keputusan itu sebenar?'],
        ['A result can be produced by luck, by overfitting the rules to past data, or by ignoring costs.', 'Sesuatu keputusan boleh dihasilkan oleh nasib, oleh overfitting peraturan kepada data lepas, atau dengan mengabaikan kos.'],
        ['We cover sample size, overfitting, out-of-sample and walk-forward testing, costs and execution, market regimes, and the trading journal.', 'Kita merangkumi saiz sampel, overfitting, ujian out-of-sample dan walk-forward, kos dan pelaksanaan, regim pasaran, dan jurnal dagangan.'],
        ['As always, every number is simulated or hypothetical, and clearly labelled.', 'Seperti biasa, setiap nombor adalah simulasi atau hipotetikal, dan dilabel dengan jelas.'],
      ],
    },
    {
      tpl: 'viz', label: 'Variance',
      viz: { type: 'hbars', title: 'MONTE CARLO · SAME RULES · 8 SAMPLES OF 20 TRADES', tag: 'TRUE E = +0.20R', pl: 230, items: MC.map((v, i) => ({ label: 'Sample ' + (i + 1), v, text: (v > 0 ? '+' : '') + v.toFixed(2) + 'R', at: 1, d: i * .2 })) },
      info: { k: '15.1 · SAMPLE SIZE', h: 'Same strategy, different luck', b: [[1, 'A simulated strategy with **true** expectancy +0.20R (40% × 2R − 60% × 1R)', 'y'], [2, 'Eight samples of 20 trades each', 'c'], [3, 'Results range from **−0.10R to +0.35R**', 'a'], [4, 'Two samples look like a **losing** strategy; five look **better** than reality', 'r']], note: { at: 5, label: 'Variance', text: 'Small samples are dominated by variance. A good or bad 20-trade result says little about the true edge.' } },
      say: [
        ['Why do small samples mislead? Because of variance.', 'Mengapa sampel kecil mengelirukan? Kerana varians.'],
        ['Here is a simulated strategy whose true expectancy is exactly plus zero point two R: forty percent winners of two R, sixty percent losers of one R.', 'Ini ialah strategi simulasi dengan expectancy sebenar tepat tambah 0.2R: 40 peratus menang 2R, 60 peratus rugi 1R.'],
        ['We draw eight random samples of twenty trades each, using the same rules.', 'Kita mengambil lapan sampel rawak, setiap satu 20 trade, menggunakan peraturan yang sama.'],
        ['The measured expectancy ranges from minus zero point one R to plus zero point three five R.', 'Expectancy yang diukur berjulat dari tolak 0.1R hingga tambah 0.35R.'],
        ['Two samples look like a losing strategy, and five look better than reality. Nothing changed except luck.', 'Dua sampel kelihatan seperti strategi yang rugi, dan lima kelihatan lebih baik daripada realiti. Tiada yang berubah kecuali nasib.'],
        ['Small samples are dominated by variance. A good or bad twenty-trade result says little about the true edge.', 'Sampel kecil didominasi oleh varians. Keputusan 20 trade yang baik atau buruk tidak banyak memberitahu tentang kelebihan sebenar.'],
      ],
    },
    {
      tpl: 'formula', label: 'Confidence interval', kicker: '15.1 · CONFIDENCE INTERVALS', h: 'How uncertain is the measured expectancy?', fs: 27,
      lines: [
        [1, 'Standard error SE = SD ÷ √n   (Video 14 sample: SD = 1.550R)'],
        [2, 'n = 20:  SE = 1.550 ÷ √20 = 0.347  →  95% CI ≈ 0.225 ± 1.96 × 0.347'],
        [2, '         = {r}−0.45R to +0.90R{/}  (includes zero)'],
        [3, 'n = 200 (same mean and SD): SE = 0.110 → {gr}+0.01R to +0.44R{/}'],
        [4, '{a}Approximation: assumes independent trades and a stable strategy{/}'],
      ],
      note: { at: 5, c: 'r', label: 'No magic number', text: 'There is **no universal** number of trades that guarantees validity. The required sample depends on the strategy\'s variability, its frequency, and the market conditions it covers.' },
      say: [
        ['A confidence interval shows how uncertain a measured expectancy is.', 'Selang keyakinan menunjukkan betapa tidak pastinya expectancy yang diukur.'],
        ['The standard error is the standard deviation divided by the square root of the number of trades. Our Video Fourteen sample had a standard deviation of one point five five R.', 'Ralat piawai ialah sisihan piawai dibahagi punca kuasa dua bilangan trade. Sampel Video 14 kita mempunyai sisihan piawai 1.55R.'],
        ['With twenty trades, the standard error is about zero point three five. An approximate ninety-five percent interval runs from minus zero point four five R to plus zero point nine R. It includes zero, so we cannot rule out that the edge is zero.', 'Dengan 20 trade, ralat piawai ialah kira-kira 0.35. Selang 95 peratus anggaran adalah dari tolak 0.45R hingga tambah 0.9R. Ia merangkumi sifar, jadi kita tidak dapat menolak kemungkinan kelebihan itu sifar.'],
        ['With two hundred trades and the same mean and spread, the interval narrows to about plus zero point zero one R to plus zero point four four R.', 'Dengan 200 trade dan purata serta sebaran yang sama, selang itu menyempit kepada kira-kira tambah 0.01R hingga tambah 0.44R.'],
        ['This is an approximation that assumes independent trades and a stable strategy.', 'Ini ialah anggaran yang mengandaikan trade yang bebas dan strategi yang stabil.'],
        ['There is no universal number of trades that guarantees validity. It depends on variability, frequency, and the market conditions covered.', 'Tiada bilangan trade universal yang menjamin kesahan. Ia bergantung pada kebolehubahan, kekerapan, dan keadaan pasaran yang diliputi.'],
      ],
    },
    {
      tpl: 'cards', label: 'Overfitting', kicker: '15.2 · OVERFITTING', h: 'Fitting the noise instead of the signal', cols: 4, top: 180, ch: 270,
      cards: [
        { n: '01', nc: 'red2', t: 'Excessive optimisation', b: 'Testing hundreds of parameter combinations and keeping the best.', at: 1 },
        { n: '02', nc: 'red2', t: 'Curve fitting', b: 'Adding filters until every past loser disappears.', at: 2 },
        { n: '03', nc: 'red2', t: 'Repeated modification', b: 'Changing rules after each test until results look good.', at: 3 },
        { n: '04', nc: 'red2', t: 'Small samples', b: 'Few trades make random patterns look like edges.', at: 4 },
      ],
      note: { at: 5, y: 520, label: 'Why it fails', text: 'An overfitted strategy describes the **past noise** precisely. Future noise is different, so a spectacular backtest may fail in future market conditions.' },
      say: [
        ['Overfitting means fitting rules to the noise in past data instead of a real, repeatable effect.', 'Overfitting bermaksud menyesuaikan peraturan dengan hingar dalam data lepas dan bukannya kesan sebenar yang boleh berulang.'],
        ['It comes from excessive parameter optimisation: testing hundreds of combinations and keeping the best.', 'Ia datang daripada pengoptimuman parameter yang berlebihan: menguji ratusan kombinasi dan menyimpan yang terbaik.'],
        ['From curve fitting: adding filters until every past loser disappears.', 'Daripada curve fitting: menambah penapis sehingga setiap trade rugi yang lepas hilang.'],
        ['From repeated modification: changing the rules after each test until the results look good.', 'Daripada pengubahsuaian berulang: menukar peraturan selepas setiap ujian sehingga keputusan kelihatan baik.'],
        ['And from small samples, where random patterns look like edges.', 'Dan daripada sampel kecil, di mana corak rawak kelihatan seperti kelebihan.'],
        ['An overfitted strategy describes past noise precisely. Future noise is different, so a spectacular backtest may fail in future markets.', 'Strategi yang overfit menggambarkan hingar lepas dengan tepat. Hingar masa depan berbeza, jadi backtest yang hebat mungkin gagal dalam pasaran masa depan.'],
      ],
    },
    {
      tpl: 'split', label: 'Peak vs plateau',
      a: { type: 'hbars', title: 'PARAMETER SWEEP A · HYPOTHETICAL', tag: 'ISOLATED PEAK', pl: 200, items: [['1.5×', -0.05], ['1.75×', 0.02], ['2.0×', -0.08], ['2.25×', 0.61], ['2.5×', -0.04], ['2.75×', 0.03], ['3.0×', -0.06]].map(([l, v], i) => ({ label: 'Vol ≥ ' + l, v, text: (v > 0 ? '+' : '') + v.toFixed(2) + 'R', at: 0, d: i * .1, c: l === '2.25×' ? 'a' : undefined })) },
      b: { type: 'hbars', title: 'PARAMETER SWEEP B · HYPOTHETICAL', tag: 'STABLE PLATEAU', pl: 200, items: [['1.5×', 0.12], ['1.75×', 0.16], ['2.0×', 0.19], ['2.25×', 0.21], ['2.5×', 0.18], ['2.75×', 0.15], ['3.0×', 0.11]].map(([l, v], i) => ({ label: 'Vol ≥ ' + l, v, text: '+' + v.toFixed(2) + 'R', at: 2, d: i * .1 })) },
      calc: [[1, 'A: one "magic" setting, neighbours fail → {r}likely overfitted{/}'], [3, 'B: nearby settings all similar → {gr}more robust{/} (still needs out-of-sample testing)']],
      say: [
        ['How can we spot overfitting? Look at how results change when a parameter changes. Here, the parameter is a volume threshold.', 'Bagaimana kita mengesan overfitting? Lihat bagaimana keputusan berubah apabila parameter berubah. Di sini, parameternya ialah ambang volume.'],
        ['In sweep A, one setting, two point two five times, shows a spectacular result, but its neighbours all fail. This is a classic sign of overfitting.', 'Dalam sweep A, satu tetapan, 2.25 kali, menunjukkan keputusan yang hebat, tetapi jirannya semua gagal. Ini ialah tanda klasik overfitting.'],
        ['In sweep B, results change gradually. Nearby settings perform similarly: a stable plateau.', 'Dalam sweep B, keputusan berubah secara beransur-ansur. Tetapan berdekatan berprestasi serupa: dataran yang stabil.'],
        ['B is more robust, but it still needs out-of-sample testing before it is trusted.', 'B lebih teguh, tetapi ia masih memerlukan ujian out-of-sample sebelum dipercayai.'],
      ],
    },
    {
      tpl: 'viz', label: 'In-sample / out-of-sample',
      viz: { type: 'wf', title: 'DATA SEPARATION · ILLUSTRATIVE', tag: 'IN-SAMPLE vs OUT-OF-SAMPLE', rowH: 90, axis: [[0, 'START'], [70, 'SPLIT'], [100, 'END']], rows: [{ at: 1, label: 'DATA', segs: [[0, 70, 'b', 'IN-SAMPLE · DEVELOP & TRAIN'], [70, 100, 'g', 'OUT-OF-SAMPLE · TEST ONCE']] }], legend: [{ c: 'b', text: 'Training / development', at: 1 }, { c: 'g', text: 'Independent evaluation', at: 2 }] },
      info: { k: '15.3 · IN-SAMPLE & OUT-OF-SAMPLE', h: 'Keep the test data untouched', b: [[1, '**In-sample:** data used to develop and tune the rules', 'c'], [2, '**Out-of-sample:** data held back, never looked at during development', 'g'], [3, 'Run the final rules on out-of-sample data **once**', 'y'], [4, 'Compare: does performance degrade sharply?', 'a']], note: { at: 5, c: 'r', label: 'Contamination', text: 'If you change the rules after seeing out-of-sample results and test again, that data has become in-sample. It is no longer an independent test.' } },
      say: [
        ['The first defence against overfitting is data separation.', 'Pertahanan pertama terhadap overfitting ialah pemisahan data.'],
        ['In-sample data is used to develop and tune the rules. This is the training data.', 'Data in-sample digunakan untuk membangunkan dan melaraskan peraturan. Ini ialah data latihan.'],
        ['Out-of-sample data is held back, and never examined during development.', 'Data out-of-sample disimpan, dan tidak pernah diteliti semasa pembangunan.'],
        ['When development is finished, the final rules are run on the out-of-sample data once.', 'Apabila pembangunan selesai, peraturan akhir dijalankan pada data out-of-sample sekali sahaja.'],
        ['Then compare. If performance degrades sharply, the in-sample result was probably overfitted.', 'Kemudian bandingkan. Jika prestasi merosot dengan ketara, keputusan in-sample mungkin telah overfit.'],
        ['And if you change the rules after seeing out-of-sample results and test again, that data has become in-sample. It is no longer independent.', 'Dan jika anda menukar peraturan selepas melihat keputusan out-of-sample dan menguji semula, data itu telah menjadi in-sample. Ia tidak lagi bebas.'],
      ],
    },
    {
      tpl: 'viz', label: 'Walk-forward',
      viz: { type: 'wf', title: 'WALK-FORWARD ANALYSIS · ILLUSTRATIVE', tag: 'ROLLING WINDOWS', rowH: 76, axis: [[0, 'Y1'], [25, 'Y2'], [50, 'Y3'], [75, 'Y4'], [100, 'Y5']], rows: [0, 1, 2, 3, 4].map(k => ({ at: 1 + Math.min(k, 3) * 0, d: k * .5, label: 'WINDOW ' + (k + 1), segs: [[k * 10, k * 10 + 50, 'b', 'TRAIN'], [k * 10 + 50, k * 10 + 60, 'g', 'TEST']] })), legend: [{ c: 'b', text: 'Training window', at: 1 }, { c: 'g', text: 'Testing window', at: 1 }] },
      info: { k: '15.4 · WALK-FORWARD', h: 'Train, test, roll forward', b: [[1, 'Optimise on a **training window**, then test on the next unseen **testing window**', 'c'], [2, 'Roll both windows forward and repeat', 'c'], [3, 'Join all test windows → an out-of-sample record', 'g'], [4, '**Parameter stability:** do chosen settings jump around between windows?', 'y'], [5, 'Reveals behaviour across **regime changes**', 'a']], note: { at: 6, c: 'r', label: 'Limitations', text: 'Results depend on window lengths; needs long data; more computation; still historical and still vulnerable if the whole process is repeated many times.' } },
      say: [
        ['Walk-forward analysis extends this idea over time.', 'Analisis walk-forward memanjangkan idea ini merentasi masa.'],
        ['Rules are optimised on a training window, then tested on the next, unseen testing window.', 'Peraturan dioptimumkan pada tetingkap latihan, kemudian diuji pada tetingkap ujian seterusnya yang belum dilihat.'],
        ['Both windows then roll forward, and the process repeats.', 'Kedua-dua tetingkap kemudian bergerak ke hadapan, dan proses itu berulang.'],
        ['Joining all the test windows produces a continuous out-of-sample record.', 'Menggabungkan semua tetingkap ujian menghasilkan rekod out-of-sample yang berterusan.'],
        ['It also tests parameter stability: if the best setting jumps around between windows, the edge may not be stable.', 'Ia juga menguji kestabilan parameter: jika tetapan terbaik berubah-ubah antara tetingkap, kelebihan itu mungkin tidak stabil.'],
        ['And it reveals how the strategy behaves across market regime changes.', 'Dan ia mendedahkan bagaimana strategi berkelakuan merentasi perubahan regim pasaran.'],
        ['Its limitations: results depend on window lengths, it needs long data, and it is still historical. Repeating the whole process many times can overfit it too.', 'Hadnya: keputusan bergantung pada panjang tetingkap, ia memerlukan data yang panjang, dan ia masih sejarah. Mengulangi keseluruhan proses berkali-kali juga boleh menyebabkan overfit.'],
      ],
    },
    {
      tpl: 'cards', label: 'Robustness & research', kicker: '15.5 · ROBUSTNESS & RESEARCH', h: 'Robustness tests — and what research warns', cols: 3, top: 180, ch: 300,
      cards: [
        { n: 'ROBUSTNESS', t: 'Stress the result', b: 'Shift parameters ±; test other contract months and periods; add higher costs; reshuffle trade order (Monte Carlo); remove the best few trades.', at: 1 },
        { n: 'BAILEY ET AL.', nc: 'violet', t: 'Backtest overfitting', b: 'Bailey, Borwein, López de Prado & Zhu show that the more configurations are tried, the more likely the best backtest is a false discovery.', at: 2 },
        { n: 'HARVEY & LIU', nc: 'violet', t: 'Multiple testing', b: 'Harvey & Liu argue backtested results should be "haircut" to account for the number of strategies tested.', at: 3 },
      ],
      note: { at: 4, y: 540, label: 'Practice', text: 'Record **how many** variations you tested. A result chosen from 200 trials needs far stronger evidence than a single pre-planned test.' },
      say: [
        ['Beyond out-of-sample tests, stress the result with robustness tests: shift the parameters, test other contract months and periods, add higher costs, reshuffle the trade order with Monte Carlo, and remove the best few trades.', 'Selain ujian out-of-sample, uji ketahanan keputusan dengan ujian robustness: alihkan parameter, uji bulan kontrak dan tempoh lain, tambah kos yang lebih tinggi, susun semula urutan trade dengan Monte Carlo, dan buang beberapa trade terbaik.'],
        ['Academic research supports this caution. Bailey, Borwein, López de Prado and Zhu show that the more configurations are tried, the more likely the best backtest is a false discovery.', 'Penyelidikan akademik menyokong sikap berhati-hati ini. Bailey, Borwein, López de Prado dan Zhu menunjukkan bahawa semakin banyak konfigurasi dicuba, semakin besar kemungkinan backtest terbaik ialah penemuan palsu.'],
        ['Harvey and Liu argue that backtested results should be haircut, to account for the number of strategies tested.', 'Harvey dan Liu berhujah bahawa keputusan backtest perlu dipotong, untuk mengambil kira bilangan strategi yang diuji.'],
        ['So record how many variations you tested. A result chosen from two hundred trials needs far stronger evidence than a single pre-planned test.', 'Jadi rekodkan berapa banyak variasi yang anda uji. Keputusan yang dipilih daripada 200 percubaan memerlukan bukti yang jauh lebih kukuh berbanding satu ujian yang dirancang awal.'],
      ],
    },
    {
      tpl: 'table', label: 'Trading costs', kicker: '15.6 · TRADING COSTS & EXECUTION REALISM', h: 'Every cost reduces the edge', cols: ['Cost', 'What it is', 'How to include it'], widths: [380, 660, 620], hs: 36, top: 140,
      rows: [
        [1, 'Brokerage', 'Broker commission per contract', 'From your broker\'s current schedule'],
        [1, 'Exchange & clearing fees', 'Charged per contract by the exchange and clearing house', 'From current official fee schedules'],
        [2, 'Taxes & other charges', 'Any applicable taxes and levies', 'As shown on contract notes'],
        [2, 'Bid-ask spread', 'Crossing the spread to enter or exit', '≥ 1 tick per market order'],
        [3, 'Slippage & delay', 'Fill worse than intended, especially on stops', 'Ticks per stop/market exit'],
        [3, 'Rollover & market impact', 'Extra trades at rolls; large orders moving price', 'Count roll trades; size vs depth'],
      ],
      note: { at: 4, c: 'r', label: 'Verify and date', text: 'Fees change. Use your broker\'s and the exchange\'s **current** schedules and state the **date and source** in your backtest report. No fee figures in this video are verified rates.' },
      say: [
        ['Next, costs. Every cost reduces the edge, and ignoring them inflates historical performance.', 'Seterusnya, kos. Setiap kos mengurangkan kelebihan, dan mengabaikannya membesarkan prestasi sejarah.'],
        ['Include brokerage, exchange and clearing fees, using current official and broker schedules.', 'Masukkan brokeraj, yuran bursa dan penjelasan, menggunakan jadual rasmi dan broker yang terkini.'],
        ['Include any applicable taxes and charges, as shown on your contract notes, and the bid-ask spread: at least one tick when using market orders.', 'Masukkan sebarang cukai dan caj yang berkenaan, seperti yang ditunjukkan dalam nota kontrak anda, dan bid-ask spread: sekurang-kurangnya satu tick apabila menggunakan market order.'],
        ['Include slippage and execution delay, especially on stop exits, and extra trades at rollover, plus market impact for larger size.', 'Masukkan slippage dan kelewatan pelaksanaan, terutamanya pada exit stop, dan trade tambahan semasa rollover, serta kesan pasaran bagi saiz yang lebih besar.'],
        ['Fees change. Use current schedules, and state the date and source. No fee figure in this video is a verified rate.', 'Yuran berubah. Gunakan jadual terkini, dan nyatakan tarikh dan sumbernya. Tiada angka yuran dalam video ini ialah kadar yang disahkan.'],
      ],
    },
    {
      tpl: 'formula', label: 'Cost impact', kicker: '15.6 · COST IMPACT · ILLUSTRATIVE ASSUMPTION', h: 'The Video 14 sample after an assumed RM50 per trade', fs: 27,
      lines: [
        [1, 'Assumed all-in cost = {a}RM50 per round-trip trade{/} (= 0.1R) — {m}illustrative, not a verified rate{/}'],
        [2, 'Expectancy: 0.225R − 0.100R = {g}+0.125R{/}  (RM112.50 → RM62.50)'],
        [3, 'Net result: RM2,250 − 20 × RM50 = {g}RM1,250{/}'],
        [4, 'Profit factor: (8,250 − 400) ÷ (6,000 + 600) = {g}1.19{/}  (was 1.375)'],
        [5, '{r}Costs removed 44% of the net result{/}', 'big'],
      ],
      say: [
        ['Let us see the effect, using an illustrative assumption of fifty ringgit per round-trip trade, all-in. That is zero point one R. It is not a verified rate.', 'Mari kita lihat kesannya, menggunakan andaian ilustrasi RM50 setiap trade pergi-balik, semua termasuk. Itu ialah 0.1R. Ia bukan kadar yang disahkan.'],
        ['Expectancy falls from zero point two two five R to zero point one two five R per trade.', 'Expectancy jatuh dari 0.225R kepada 0.125R setiap trade.'],
        ['The net result falls from two thousand two hundred and fifty ringgit to one thousand two hundred and fifty.', 'Keputusan bersih jatuh dari RM2,250 kepada RM1,250.'],
        ['Profit factor falls from one point three seven five to about one point one nine, because costs reduce every winner and enlarge every loser.', 'Profit factor jatuh dari 1.375 kepada kira-kira 1.19, kerana kos mengurangkan setiap trade menang dan membesarkan setiap trade rugi.'],
        ['Costs removed forty-four percent of the net result. That is why costs must always be included.', 'Kos menghapuskan 44 peratus daripada keputusan bersih. Itulah sebabnya kos mesti sentiasa dimasukkan.'],
      ],
    },
    {
      tpl: 'cards', label: 'Execution realism', kicker: '15.6 · EXECUTION REALISM', h: 'Realistic fill assumptions', cols: 2, top: 180, ch: 250,
      cards: [
        { n: 'LIMIT ORDERS', t: 'Touched is not filled', b: 'Your order waits in a queue. Conservative rule: count a limit fill only if price trades **through** it by at least one tick.', at: 1 },
        { n: 'STOPS', nc: 'red2', t: 'Stops can slip', b: 'In fast markets, a stop becomes a market order and may fill several ticks worse. Model slippage on stops.', at: 2 },
        { n: 'GAPS & LIMITS', nc: 'amber', t: 'Opening gaps, price limits', b: 'Overnight gaps and exchange daily price limits can prevent exits at the stop price.', at: 3 },
        { n: 'DELAY', nc: 'cyan', t: 'Decision to order', b: 'Rules evaluated on a bar close are executed on the next available price, not the close itself.', at: 4 },
      ],
      say: [
        ['Execution realism matters as much as costs.', 'Realisme pelaksanaan sama penting dengan kos.'],
        ['A limit order that is touched is not necessarily filled, because it waits in a queue. A conservative rule counts a fill only if price trades through it by at least one tick.', 'Limit order yang disentuh tidak semestinya diisi, kerana ia menunggu dalam barisan. Peraturan konservatif hanya mengira isian jika harga didagangkan melepasinya sekurang-kurangnya satu tick.'],
        ['Stops can slip. In fast markets, a stop becomes a market order and may fill several ticks worse.', 'Stop boleh tergelincir. Dalam pasaran pantas, stop menjadi market order dan mungkin diisi beberapa tick lebih teruk.'],
        ['Overnight gaps and exchange daily price limits can prevent exits at the stop price.', 'Jurang semalaman dan had harga harian bursa boleh menghalang exit pada harga stop.'],
        ['And a rule evaluated on a bar close is executed at the next available price, not at the close itself.', 'Dan peraturan yang dinilai pada penutupan bar dilaksanakan pada harga seterusnya yang tersedia, bukan pada penutupan itu sendiri.'],
      ],
    },
    {
      tpl: 'viz', label: 'Market regimes',
      viz: { type: 'hbars', title: 'EXPECTANCY BY REGIME · HYPOTHETICAL', tag: 'AFTER COSTS', pl: 330, items: [['Trending', 0.42], ['Range-bound', -0.12], ['High volatility', 0.28], ['Low volatility', 0.03], ['News-driven', -0.22], ['Active month', 0.18], ['Deferred month', -0.15]].map(([l, v], i) => ({ label: l, v, text: (v > 0 ? '+' : '') + v.toFixed(2) + 'R', at: 1, d: i * .15 })) },
      info: { k: '15.7 · MARKET REGIMES', h: 'One average hides many markets', b: [[1, 'The same rules may behave very differently by regime', 'c'], [2, 'This hypothetical strategy earns in trends, loses in ranges and around news', 'a'], [3, 'Deferred FCPO months: thinner liquidity, worse fills', ''], [4, 'Define regimes **objectively** (e.g. ATR percentile, ADX, calendar of scheduled releases)', 'y']], note: { at: 5, c: 'r', label: 'Never assume', text: 'A strategy that works in one regime will not necessarily work in every regime. Report results by regime, and decide in advance whether to filter.' } },
      say: [
        ['A single average can hide very different behaviour across market regimes.', 'Satu purata boleh menyembunyikan tingkah laku yang sangat berbeza merentasi regim pasaran.'],
        ['In this hypothetical breakdown, the same rules earn in trending markets but lose in range-bound markets and around news.', 'Dalam pecahan hipotetikal ini, peraturan yang sama memberi untung dalam pasaran trending tetapi rugi dalam pasaran range dan sekitar berita.'],
        ['Results also differ between the active F C P O month and deferred months, where liquidity is thinner and fills are worse.', 'Keputusan juga berbeza antara bulan FCPO aktif dan bulan tertunda, di mana kecairan lebih tipis dan isian lebih teruk.'],
        ['Regimes must be defined objectively, for example with volatility percentiles or a calendar of scheduled releases, not by eye after the fact.', 'Regim mesti ditakrifkan secara objektif, contohnya dengan persentil volatiliti atau kalendar keluaran berjadual, bukan dengan mata selepas kejadian.'],
        ['A strategy that works in one regime will not necessarily work in every regime. Report results by regime, and decide in advance whether to filter.', 'Strategi yang berjaya dalam satu regim tidak semestinya berjaya dalam setiap regim. Laporkan keputusan mengikut regim, dan tentukan lebih awal sama ada untuk menapis.'],
      ],
    },
    {
      tpl: 'table', label: 'Trading journal', kicker: '15.8 · TRADING JOURNAL', h: 'What to record for every trade', cols: ['Plan', 'Execution', 'Outcome', 'Review'], widths: [415, 415, 415, 415], hs: 38,
      rows: [
        [1, 'Date · contract', 'Entry price & time', 'Gross P&L', 'Rule adherence (Y/N)'],
        [1, 'Trading style · regime', 'Stop-loss price', 'Costs', 'Execution quality'],
        [2, 'Strategy name · setup type', 'Target price', 'Net P&L', 'Screenshots (before/after)'],
        [2, 'Planned RR', 'Position size', 'Realised RR', 'Lessons learned'],
      ],
      note: { at: 3, label: 'Purpose', text: 'A journal turns live trading into data — the same data a backtest produces — so the two can be compared honestly.' },
      say: [
        ['The trading journal records every trade in four groups.', 'Jurnal dagangan merekodkan setiap trade dalam empat kumpulan.'],
        ['The plan: date, contract, trading style, market regime, strategy name, setup type, and planned RR. The execution: entry, stop-loss, target and position size.', 'Pelan: tarikh, kontrak, gaya dagangan, regim pasaran, nama strategi, jenis setup, dan RR yang dirancang. Pelaksanaan: entry, stop-loss, sasaran dan saiz posisi.'],
        ['The outcome: gross P and L, costs, net P and L and realised RR. And the review: rule adherence, execution quality, screenshots and lessons learned.', 'Keputusan: P&L kasar, kos, P&L bersih dan RR yang direalisasikan. Dan semakan: pematuhan peraturan, kualiti pelaksanaan, tangkapan skrin dan pengajaran.'],
        ['A journal turns live trading into the same kind of data a backtest produces, so the two can be compared honestly.', 'Jurnal menukar dagangan sebenar menjadi data yang sama jenis dengan yang dihasilkan oleh backtest, supaya kedua-duanya boleh dibandingkan dengan jujur.'],
      ],
    },
    {
      tpl: 'cards', label: 'Strategy vs execution', kicker: '15.8 · SEPARATE TWO QUALITIES', h: 'Strategy quality versus execution quality', cols: 2, top: 180, ch: 220,
      cards: [
        { n: 'RULES FOLLOWED · LOSS', nc: 'cyan', t: 'Good execution, normal loss', b: 'Part of the strategy\'s expected distribution. No change needed.', at: 1 },
        { n: 'RULES BROKEN · WIN', nc: 'amber', t: 'Poor execution, lucky win', b: 'Dangerous: rewards bad habits. Count as an execution error.', at: 2 },
        { n: 'RULES FOLLOWED · POOR STATS', nc: 'red2', t: 'Strategy problem', b: 'If adherence is high and results still lag the backtest, review the strategy.', at: 3 },
        { n: 'RULES BROKEN · POOR STATS', nc: 'red2', t: 'Execution problem', b: 'Fix discipline first; the strategy has not really been tested.', at: 4 },
      ],
      say: [
        ['A journal lets you separate strategy quality from execution quality.', 'Jurnal membolehkan anda memisahkan kualiti strategi daripada kualiti pelaksanaan.'],
        ['A loss with the rules followed is good execution and a normal loss. It is part of the strategy\'s expected distribution.', 'Kerugian dengan peraturan dipatuhi ialah pelaksanaan yang baik dan kerugian biasa. Ia sebahagian daripada taburan jangkaan strategi itu.'],
        ['A win with the rules broken is dangerous, because it rewards bad habits. Count it as an execution error.', 'Kemenangan dengan peraturan dilanggar adalah berbahaya, kerana ia memberi ganjaran kepada tabiat buruk. Kirakannya sebagai kesilapan pelaksanaan.'],
        ['If adherence is high and results still lag the backtest, review the strategy.', 'Jika pematuhan tinggi dan keputusan masih ketinggalan berbanding backtest, semak semula strategi.'],
        ['If rules are often broken, fix discipline first. The strategy has not really been tested.', 'Jika peraturan sering dilanggar, betulkan disiplin dahulu. Strategi itu belum benar-benar diuji.'],
      ],
    },
    {
      tpl: 'cards', label: 'Common mistakes', kicker: '15.9 · COMMON BACKTESTING MISTAKES', h: 'Eleven mistakes to avoid', cols: 4, top: 160, ch: 160,
      cards: [
        { n: '01', nc: 'red2', t: 'Using future information', at: 1 }, { n: '02', nc: 'red2', t: 'Overfitting', at: 1 }, { n: '03', nc: 'red2', t: 'Ignoring trading costs', at: 1 }, { n: '04', nc: 'red2', t: 'Ignoring slippage', at: 2 },
        { n: '05', nc: 'red2', t: 'Unrealistic fills', at: 2 }, { n: '06', nc: 'red2', t: 'Testing too few trades', at: 2 }, { n: '07', nc: 'red2', t: 'Changing rules mid-test', at: 3 }, { n: '08', nc: 'red2', t: 'Cherry-picking winners', at: 3 },
        { n: '09', nc: 'red2', t: 'Ignoring losing trades', at: 3 }, { n: '10', nc: 'red2', t: 'Wrong continuous data', at: 4 }, { n: '11', nc: 'red2', t: 'Hypothetical = guaranteed', at: 4 },
      ],
      say: [
        ['Eleven common backtesting mistakes.', 'Sebelas kesilapan backtesting yang biasa.'],
        ['Using future information, overfitting, and ignoring trading costs.', 'Menggunakan maklumat masa depan, overfitting, dan mengabaikan kos dagangan.'],
        ['Ignoring slippage, assuming unrealistic fills, and testing too few trades.', 'Mengabaikan slippage, mengandaikan isian yang tidak realistik, dan menguji terlalu sedikit trade.'],
        ['Changing rules during the test, cherry-picking winning examples, and ignoring losing trades.', 'Menukar peraturan semasa ujian, memilih contoh yang menang sahaja, dan mengabaikan trade yang rugi.'],
        ['Using inappropriate continuous futures data, and treating hypothetical results as guaranteed future performance.', 'Menggunakan data futures berterusan yang tidak sesuai, dan menganggap keputusan hipotetikal sebagai prestasi masa depan yang dijamin.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercise 17', kicker: 'EXERCISE 17', h: 'Identify the backtesting errors', cols: 2, top: 180, ch: 420,
      cards: [
        { n: 'SCENARIO', t: 'A student\'s report', b: '"I tested 35 trades on a back-adjusted continuous FCPO chart, scrolling the whole history to find setups. I tried 60 volume thresholds and kept the best (PF 3.4). Limit orders were filled whenever price touched them. Results are before fees. I skipped two trades on news days because they looked messy."', at: 1 },
        { n: 'ERRORS', nc: 'red2', t: 'Seven problems', b: '1 Small sample · 2 Hindsight (whole chart visible) · 3 Overfitting (60 trials, best kept) · 4 Touch = fill · 5 No costs · 6 Cherry-picking (skipped trades) · 7 Back-adjusted levels used without noting they differ from traded prices.', at: 3 },
      ],
      say: [
        ['Exercise Seventeen: identify the backtesting errors in this student report. Pause and list them.', 'Latihan 17: kenal pasti kesilapan backtesting dalam laporan pelajar ini. Hentikan seketika dan senaraikannya.', { p: 2 }],
        ['There are at least seven problems.', 'Terdapat sekurang-kurangnya tujuh masalah.'],
        ['A small sample. Hindsight, because the whole chart was visible. Overfitting, by keeping the best of sixty thresholds. Touch counted as a fill. No costs. Cherry-picking, by skipping trades. And back-adjusted prices used without noting they differ from real traded prices.', 'Sampel kecil. Hindsight, kerana keseluruhan chart kelihatan. Overfitting, dengan menyimpan yang terbaik daripada enam puluh ambang. Sentuhan dikira sebagai isian. Tiada kos. Memilih-milih, dengan melangkau trade. Dan harga yang dilaraskan ke belakang digunakan tanpa menyatakan ia berbeza daripada harga dagangan sebenar.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Why does a positive backtest not guarantee future profitability?',
      opts: ['Because backtests are always wrong', 'Because of variance, possible overfitting, cost and fill assumptions, and changing market regimes', 'Because future markets are random', 'It does guarantee it if the profit factor is above 2'], ans: 1, ansAt: 1,
      expl: 'A backtest describes history under assumptions. Evidence improves with out-of-sample, walk-forward, costs and forward testing — but never becomes a guarantee.',
      say: [
        ['Knowledge check. Why does a positive backtest not guarantee future profitability?', 'Semakan pengetahuan. Mengapa backtest yang positif tidak menjamin keuntungan masa depan?', { p: 1.5 }],
        ['The answer is B: variance, possible overfitting, cost and fill assumptions, and changing market regimes. A backtest describes history under assumptions.', 'Jawapannya ialah B: varians, kemungkinan overfitting, andaian kos dan isian, dan regim pasaran yang berubah. Backtest menggambarkan sejarah di bawah andaian.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is overfitting — and why must transaction costs be included?',
      opts: ['Using too little data; costs are optional', 'Fitting rules to past noise; costs reduce every result and can turn a small edge negative', 'Trading too large; costs only matter for scalpers', 'Using a high timeframe; costs are already in prices'], ans: 1, ansAt: 1,
      expl: 'In our example, an assumed 0.1R cost removed 44% of the net result and cut PF from 1.375 to 1.19.',
      say: [
        ['Second question. What is overfitting, and why must transaction costs be included?', 'Soalan kedua. Apakah overfitting, dan mengapa kos transaksi mesti dimasukkan?', { p: 1.5 }],
        ['The answer is B. Overfitting fits rules to past noise. Costs reduce every result, and can turn a small edge negative.', 'Jawapannya ialah B. Overfitting menyesuaikan peraturan dengan hingar lepas. Kos mengurangkan setiap keputusan, dan boleh menukar kelebihan kecil menjadi negatif.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Advanced evaluation — what to remember',
      items: [[0, 'Small samples are dominated by variance'], [1, 'Confidence intervals show uncertainty; no magic n'], [2, 'Overfitting: isolated peaks, many trials'], [3, 'Test once on untouched out-of-sample data'], [4, 'Walk-forward: train, test, roll'], [5, 'Include costs, slippage and realistic fills', 'w'], [6, 'Report by regime; journal every trade', 'w'], [7, 'Separate strategy quality from execution quality', 'w']],
      say: [
        ['To summarise. Small samples are dominated by variance.', 'Sebagai rumusan. Sampel kecil didominasi oleh varians.'],
        ['Confidence intervals show uncertainty, and there is no magic sample size.', 'Selang keyakinan menunjukkan ketidakpastian, dan tiada saiz sampel ajaib.'],
        ['Overfitting shows up as isolated peaks and many trials.', 'Overfitting kelihatan sebagai puncak terpencil dan banyak percubaan.'],
        ['Test once on untouched out-of-sample data.', 'Uji sekali pada data out-of-sample yang tidak disentuh.'],
        ['Walk-forward analysis trains, tests and rolls forward.', 'Analisis walk-forward melatih, menguji dan bergerak ke hadapan.'],
        ['Include costs, slippage and realistic fills.', 'Masukkan kos, slippage dan isian yang realistik.'],
        ['Report by regime, and journal every trade.', 'Laporkan mengikut regim, dan rekodkan setiap trade dalam jurnal.'],
        ['And separate strategy quality from execution quality.', 'Dan pisahkan kualiti strategi daripada kualiti pelaksanaan.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · LEVEL 10 MASTERCLASS', h: 'Everything, end to end',
      chips: [[0, 'Integrated framework', 'Six methods, one workflow'], [0, 'FCPO walkthrough', 'From context to decision'], [0, 'Dashboard & assessment', 'Final knowledge check']],
      nk: 'NEXT · VIDEO 16', nt: 'CMI Professional Application Masterclass', nAt: 1, ny: 420,
      say: [
        ['In the final video, the masterclass, we bring the whole programme together: the integrated framework, a complete F C P O walkthrough, a backtest and dashboard, and the final assessment.', 'Dalam video terakhir, masterclass, kita menghimpunkan keseluruhan program: kerangka bersepadu, panduan FCPO yang lengkap, backtest dan dashboard, dan penilaian akhir.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua keputusan, kos dan statistik dalam video ini ialah simulasi/hipotetikal. Rujukan: Bailey, Borwein, López de Prado & Zhu; Harvey & Liu (2015), "Backtesting".', foot: 'Seterusnya: Video 16 — CMI Professional Application Masterclass',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
