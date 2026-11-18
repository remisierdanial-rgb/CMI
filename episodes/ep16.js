/* VIDEO 16 — CMI Professional Application Masterclass
   Integrated Professional Application Framework (Master Prompt §5) + FCPO walkthrough + backtest demonstration + Strategy Evaluation Dashboard (§6.M) + final assessment.
   Backtest data = the Video 14 simulated sample; after-cost figures assume RM50 (0.1R) per trade (illustrative, not a verified fee rate).
   After costs: net +2.5R (RM1,250) · PF 15.7/13.2 = 1.19 · E +0.125R · max DD 3.3R (RM1,650; trade 6 → 9) · avg win 1.96R · avg loss 1.10R.
   Hypothetical regime tags: Trend 7 trades +14.2R · Range 10 trades −8.4R · News 3 trades −3.3R. */
const ACC = { seed: 301, n: 100, way: [[0, 4300], [7, 4205], [9, 4225], [15, 4095], [16, 4070], [20, 4148], [25, 4085], [30, 4128], [36, 4090], [42, 4136], [48, 4092], [54, 4134], [60, 4088], [62, 4078], [64, 4086], [68, 4082], [74, 4172], [78, 4140], [86, 4215], [95, 4250], [99, 4244]], noise: 4, wick: 5, vbody: .15,
  ovr: { 16: { o: 4100, h: 4104, l: 4052, c: 4066 }, 20: { h: 4158 }, 63: { h: 4084, l: 4038, c: 4074 }, 68: { h: 4090, l: 4066, c: 4084 } },
  vm: { 7: 1.8, 15: 1.8, 16: 3.4, 17: 1.8, 19: 1.5, 20: 1.6, 25: .75, 63: 1.4, 68: .5, 72: 1.8, 73: 2.0, 74: 2.2, 78: .6, 77: .7 } };
const R = [2.1, -1, -1, 1.8, -1, 2.4, -1, -1, -1, 2.0, -1, 1.6, -1, 2.2, -1, -1, 2.5, -1, 1.9, -1];
const RN = R.map(r => Math.round((r - 0.1) * 10) / 10);
const q = (q, opts, ans, expl, sayQ, sayA) => ({ tpl: 'quiz', label: 'Final assessment', kicker: 'FINAL ASSESSMENT', q, opts, ans, ansAt: 1, expl, say: [[sayQ[0], sayQ[1], { p: 1.5 }], sayA] });

EP({
  num: '16', short: 'Masterclass', title: 'CMI Professional Application Masterclass',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 16 · LEVEL 10 · MASTERCLASS',
      h: 'CMI Professional Application Masterclass', sub: 'Integrated framework · FCPO walkthrough · Backtest · Dashboard · Final assessment',
      obj: [[1, 'Apply the complete CMI Professional Application Workflow'], [2, 'Turn an integrated FCPO analysis into a testable hypothesis'], [3, 'Read a full strategy evaluation dashboard, after costs'], [4, 'Accept, revise or reject a strategy based on evidence']],
      viz: { type: 'equity', title: 'BEFORE vs AFTER COSTS · SIMULATED', r: R, dur: 2.5, unit: 'R', c: 'm', series2: { r: RN, c: 'c', at: 0, dur: 3 } },
      say: [
        ['Welcome to the final video of Level Ten: the C M I Professional Application Masterclass.', 'Selamat datang ke video terakhir Level 10: CMI Professional Application Masterclass.'],
        ['Over fifteen videos, we studied each methodology on its own terms: Wyckoff, V P A, Order Flow and Volume Profile, alongside S M C. We applied them to F C P O, and learned to evaluate rules with evidence.', 'Sepanjang lima belas video, kita mengkaji setiap metodologi mengikut asasnya sendiri: Wyckoff, VPA, Order Flow dan Volume Profile, bersama SMC. Kita mengaplikasikannya kepada FCPO, dan belajar menilai peraturan dengan bukti.'],
        ['Now we put everything together, end to end: from market context to a decision about the strategy itself.', 'Sekarang kita menghimpunkan semuanya, dari awal hingga akhir: daripada konteks pasaran hingga keputusan tentang strategi itu sendiri.'],
        ['As always, all charts and results are simulated or hypothetical, and clearly labelled.', 'Seperti biasa, semua chart dan keputusan adalah simulasi atau hipotetikal, dan dilabel dengan jelas.'],
      ],
    },
    {
      tpl: 'table', label: 'What each method examines', kicker: '16.1 · DIFFERENT INFORMATION', h: 'Each method examines a different aspect of the market', cols: ['Method', 'Examines', 'Never claims'], widths: [340, 720, 600], hs: 36, top: 140,
      rows: [
        [1, 'SMC', 'Price structure, liquidity interpretations, selected POIs', 'That a POI is certain to hold'],
        [1, 'Wyckoff', 'Market phases; supply and demand behaviour in ranges', 'That a Spring is always a sweep'],
        [2, 'VPA', 'Price, volume and spread together', 'Buyer or seller identity from volume'],
        [2, 'Order Flow', 'Classified executed activity; visible order book', 'That Delta guarantees direction'],
        [3, 'Volume Profile', 'Distribution of traded volume across price', 'That POC/HVN are Order Blocks'],
        [3, 'Backtesting', 'Historical performance of defined rules, under assumptions', 'Future profitability'],
      ],
      say: [
        ['First, a reminder of what each method examines, and what it never claims.', 'Pertama, peringatan tentang apa yang dikaji oleh setiap kaedah, dan apa yang tidak pernah didakwanya.'],
        ['S M C examines price structure, liquidity interpretations and selected points of interest. Wyckoff examines market phases, and supply and demand behaviour inside ranges.', 'SMC mengkaji struktur harga, interpretasi liquidity dan POI yang dipilih. Wyckoff mengkaji fasa pasaran, dan tingkah laku supply dan demand dalam range.'],
        ['V P A examines price, volume and spread together. Order Flow examines classified executed activity and the visible order book.', 'VPA mengkaji harga, volume dan spread bersama-sama. Order Flow mengkaji aktiviti terlaksana yang diklasifikasikan dan order book yang kelihatan.'],
        ['Volume Profile describes how traded volume is distributed across price. And backtesting evaluates whether defined rules have shown historical performance under stated assumptions.', 'Volume Profile menggambarkan bagaimana volume dagangan diagihkan merentasi harga. Dan backtesting menilai sama ada peraturan yang ditetapkan telah menunjukkan prestasi sejarah di bawah andaian yang dinyatakan.'],
      ],
    },
    {
      tpl: 'flow', label: 'CMI workflow', kicker: '16.2 · CMI PROFESSIONAL APPLICATION WORKFLOW', h: 'From market context to strategy review', cols: 2, top: 160, sh: 98,
      steps: [
        { t: 'Market context', s: 'Contract month, session, volatility, news', at: 1 },
        { t: 'SMC', s: 'Market structure, liquidity and POI', at: 1, c: 'gold' },
        { t: 'Wyckoff', s: 'Market phase, accumulation and distribution', at: 2, c: 'violet' },
        { t: 'VPA', s: 'Price, volume and spread', at: 2, c: 'amber' },
        { t: 'Order Flow', s: 'Bid, ask, Delta, footprint — if data exists', at: 3, c: 'green2' },
        { t: 'Volume Profile', s: 'POC, VAH, VAL, HVN and LVN', at: 3, c: 'cyan' },
        { t: 'FCPO case study', s: 'Integrate the relevant observations', at: 4 },
        { t: 'Trading hypothesis', s: 'Observable entry and exit conditions', at: 4 },
        { t: 'Backtesting', s: 'Test the rules on historical data', at: 5 },
        { t: 'Performance evaluation', s: 'Expectancy, profit factor, drawdown, costs', at: 5 },
        { t: 'Strategy review', s: 'Accept, revise or reject — based on evidence', at: 6, hl: 'gold' },
        { t: 'Journal & repeat', s: 'Forward test; compare live with backtest', at: 6 },
      ],
      say: [
        ['Here is the complete C M I Professional Application Workflow.', 'Inilah CMI Professional Application Workflow yang lengkap.'],
        ['It begins with market context, then S M C for structure, liquidity and point of interest.', 'Ia bermula dengan konteks pasaran, kemudian SMC untuk struktur, liquidity dan POI.'],
        ['Wyckoff adds the possible market phase, and V P A adds price, volume and spread.', 'Wyckoff menambah fasa pasaran yang mungkin, dan VPA menambah harga, volume dan spread.'],
        ['Order Flow adds classified execution, where suitable data exists, and Volume Profile adds where volume traded.', 'Order Flow menambah pelaksanaan yang diklasifikasikan, jika data yang sesuai wujud, dan Volume Profile menambah di mana volume didagangkan.'],
        ['The observations are integrated in an F C P O case study, and turned into a trading hypothesis with observable entry and exit conditions.', 'Pemerhatian diintegrasikan dalam kajian kes FCPO, dan dijadikan hipotesis dagangan dengan syarat entry dan exit yang boleh diperhatikan.'],
        ['The hypothesis is backtested, and evaluated with expectancy, profit factor, drawdown and costs.', 'Hipotesis itu diuji melalui backtest, dan dinilai dengan expectancy, profit factor, drawdown dan kos.'],
        ['Finally, the strategy is accepted, revised or rejected, based on evidence, then forward tested and journalled.', 'Akhirnya, strategi itu diterima, disemak semula atau ditolak, berdasarkan bukti, kemudian diuji ke hadapan dan direkodkan dalam jurnal.'],
      ],
    },
    {
      tpl: 'statement', label: 'No forced agreement', kicker: '16.2 · IMPORTANT', h: 'The methods do not all need to agree before a trade.', h2: 'Integration adds depth — not artificial certainty.', h2At: 1, fs: 42, by: 330, bh: 360,
      boxes: [
        { k: 'AGREE', kc: 'g', bc: 'green', t: 'Record it', b: 'Note which methods agree — and whether they share the same data source (e.g. volume).', at: 2 },
        { k: 'DISAGREE', kc: 'c', bc: 'amber', t: 'Do not force it', b: 'Disagreement is information. It does not mean one method is "wrong".', at: 3 },
        { k: 'DECIDE', t: 'Follow written rules', b: 'Your tested rules — not your feelings — decide whether to trade.', at: 4 },
      ],
      say: [
        ['One principle is essential. The methods do not all need to agree before a trade can be taken.', 'Satu prinsip adalah penting. Kaedah-kaedah ini tidak semestinya perlu bersetuju sebelum sesuatu trade boleh diambil.'],
        ['Integration should improve the depth of analysis, not create artificial certainty.', 'Integrasi sepatutnya meningkatkan kedalaman analisis, bukan mencipta kepastian palsu.'],
        ['When methods agree, record it, and note whether they share the same data source.', 'Apabila kaedah bersetuju, rekodkannya, dan catat sama ada ia berkongsi sumber data yang sama.'],
        ['When they disagree, do not force agreement. Disagreement is information.', 'Apabila ia tidak bersetuju, jangan paksa persetujuan. Percanggahan ialah maklumat.'],
        ['And let your written, tested rules decide, not your feelings.', 'Dan biarkan peraturan bertulis yang telah diuji yang menentukan, bukan perasaan anda.'],
      ],
    },
    {
      tpl: 'viz', label: 'FCPO walkthrough',
      viz: { type: 'candles', title: 'FCPO · 1H · HYPOTHETICAL WALKTHROUGH', tag: 'INTEGRATED VIEW', data: ACC, volH: 80, reveal: [[0, 62, 2], [4, 99, 2]],
        ann: [{ t: 'zone', p1: 4052, p2: 4158, i1: 16, i2: 62, c: 'p', label: 'WYCKOFF · POSSIBLE ACCUMULATION', at: 1, op: .05 }, { t: 'profile', i1: 16, i2: 62, bin: 4, side: 'left', width: 130, at: 3, lines: false, op: .7 },
          { t: 'tag', i: 63, text: 'SMC · SSL SWEEP / SPRING?', c: 'c', pos: 'below', at: 2 }, { t: 'vhl', i: [16, 63, 68], c: 'a', at: 3 },
          { t: 'hline', p: 4158, i1: 58, i2: 82, c: 'g', label: 'BOS', at: 4, lx: 'l' }, { t: 'zone', p1: 4141, p2: 4151, i1: 73, i2: 90, c: 'c', label: 'POI · FVG', at: 4, lx: 'r' },
          { t: 'hline', p: 4151, i1: 76, i2: 99, c: 'w', label: 'ENTRY', at: 5, dash: false, w: 1.5 }, { t: 'hline', p: 4119, i1: 72, i2: 99, c: 'r', label: 'STOP', at: 5 }, { t: 'hline', p: 4232, i1: 9, i2: 99, c: 'c', label: 'BSL TARGET', at: 5 }] },
      info: { k: '16.3 · FCPO WALKTHROUGH', h: 'Each lens, recorded separately', b: [[1, '**Context + Wyckoff:** range after a decline — possible accumulation', 'p'], [2, '**SMC:** SSL swept at 4,038 — Spring hypothesis (both labels justified here)', 'c'], [3, '**VPA:** climax volume, low-volume Test · **Profile:** POC 4,114', 'a'], [3, '**Order Flow:** no suitable data — step recorded as not used', 'x'], [4, '**Structure:** CHoCH → BOS 4,158 · POI: FVG 4,141–4,151', 'y'], [5, '**Plan:** 4,151 / 4,119 / 4,232', 'w']] },
      say: [
        ['Now an F C P O walkthrough, applying the workflow to the Case One data from Video Twelve.', 'Sekarang panduan FCPO, mengaplikasikan aliran kerja kepada data Kes 1 daripada Video 12.'],
        ['Context and Wyckoff: a range forms after a decline. The hypothesis is possible accumulation.', 'Konteks dan Wyckoff: range terbentuk selepas penurunan. Hipotesisnya ialah kemungkinan accumulation.'],
        ['S M C: sell-side liquidity is swept at four thousand and thirty-eight. With the range context present, a Spring hypothesis is also justified.', 'SMC: sell-side liquidity disapu pada 4,038. Dengan konteks range yang wujud, hipotesis Spring juga wajar.'],
        ['V P A shows climax volume and a low-volume Test. The range profile places the P O C at four thousand one hundred and fourteen. No suitable order-flow data exists, so that step is recorded as not used.', 'VPA menunjukkan volume climax dan Test dengan volume rendah. Profile range meletakkan POC pada 4,114. Tiada data order flow yang sesuai, jadi langkah itu direkodkan sebagai tidak digunakan.'],
        ['Structure confirms with a change of character and break of structure, leaving a fair value gap as the point of interest.', 'Struktur mengesahkan dengan change of character dan break of structure, meninggalkan fair value gap sebagai POI.'],
        ['The plan is written before the outcome: entry, stop and a liquidity-based target.', 'Pelan ditulis sebelum keputusan: entry, stop dan sasaran berasaskan liquidity.'],
      ],
    },
    {
      tpl: 'formula', label: 'Hypothesis to rules', kicker: '16.4 · FROM ONE CHART TO A TESTABLE HYPOTHESIS', h: 'One chart is an example. The rule is what we test.', fs: 25,
      lines: [
        [1, 'IF  1H range of ≥ 30 bars after a decline, with a prior swing low (SSL)'],
        [2, 'AND price trades below the range low, then closes back inside within 2 bars'],
        [3, 'AND a 1H close above the last internal swing high (CHoCH), then above the range high (BOS)'],
        [4, 'THEN limit buy at the top of the first FVG left by the break'],
        [5, '     stop 2 ticks below the FVG\'s origin bar · target nearest BSL · {a}1% risk{/}'],
      ],
      note: { at: 6, label: 'Notice', text: 'Wyckoff, VPA and profile observations informed the idea — but only **observable** conditions entered the rule. Anything that cannot be defined is left out, or tested separately.' },
      say: [
        ['One chart is only an example. What we test is a rule.', 'Satu chart hanyalah contoh. Apa yang kita uji ialah peraturan.'],
        ['If a one-hour range of at least thirty bars forms after a decline, with a prior swing low holding sell-side liquidity,', 'Jika range 1 jam sekurang-kurangnya 30 bar terbentuk selepas penurunan, dengan swing low sebelumnya yang menyimpan sell-side liquidity,'],
        ['and price trades below the range low, then closes back inside within two bars,', 'dan harga didagangkan di bawah low range, kemudian ditutup semula di dalam dalam tempoh dua bar,'],
        ['and a one-hour close breaks the last internal swing high, then the range high,', 'dan penutupan 1 jam memecahkan swing high dalaman terakhir, kemudian high range,'],
        ['then place a limit buy at the top of the first fair value gap left by the break.', 'maka letakkan limit buy di bahagian atas fair value gap pertama yang ditinggalkan oleh pemecahan itu.'],
        ['The stop is two ticks below the gap\'s origin bar, the target is the nearest buy-side liquidity, and risk is one percent.', 'Stop ialah dua tick di bawah bar asal gap, sasaran ialah buy-side liquidity terdekat, dan risiko ialah satu peratus.'],
        ['Notice: Wyckoff, V P A and profile observations informed the idea, but only observable conditions entered the rule.', 'Perhatikan: pemerhatian Wyckoff, VPA dan profile memberi idea, tetapi hanya syarat yang boleh diperhatikan dimasukkan ke dalam peraturan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Backtest demonstration',
      viz: { type: 'equity', title: 'BACKTEST · SIMULATED · 20 TRADES', tag: 'BEFORE vs AFTER COSTS', r: RN, c: 'c', dur: 3, unit: 'R', dd: 3, label: 'AFTER COSTS +2.5R', series2: { r: R, c: 'm', at: 1, dur: 2.5, label: 'BEFORE COSTS +4.5R' } },
      info: { k: '16.5 · BACKTEST DEMONSTRATION', h: 'Costs change the picture', b: [[1, 'Grey: before costs — net +4.5R', 'x'], [2, 'Cyan: after an assumed 0.1R per trade — net **+2.5R**', 'c'], [3, 'Max drawdown after costs: **3.3R** (RM1,650)', 'r'], [4, 'Only 20 trades — the 95% interval for expectancy still includes zero', 'a']], note: { at: 5, c: 'r', label: 'Labelled', text: 'Simulated teaching data and an illustrative cost assumption. Not a CMI strategy result.' } },
      say: [
        ['Suppose the rule is backtested. To stay consistent, we use the twenty simulated trades from Video Fourteen.', 'Andaikan peraturan itu diuji melalui backtest. Untuk kekal konsisten, kita menggunakan 20 trade simulasi daripada Video 14.'],
        ['In grey, before costs: a net result of plus four point five R.', 'Dalam warna kelabu, sebelum kos: keputusan bersih tambah 4.5R.'],
        ['In cyan, after an assumed cost of zero point one R per trade: plus two point five R.', 'Dalam warna cyan, selepas andaian kos 0.1R setiap trade: tambah 2.5R.'],
        ['Maximum drawdown after costs is three point three R, or one thousand six hundred and fifty ringgit.', 'Maximum drawdown selepas kos ialah 3.3R, atau RM1,650.'],
        ['And with only twenty trades, the confidence interval for expectancy still includes zero.', 'Dan dengan hanya 20 trade, selang keyakinan bagi expectancy masih merangkumi sifar.'],
        ['This is simulated teaching data with an illustrative cost assumption, not a C M I strategy result.', 'Ini ialah data pengajaran simulasi dengan andaian kos ilustrasi, bukan keputusan strategi CMI.'],
      ],
    },
    {
      tpl: 'viz', label: 'Strategy dashboard',
      viz: { type: 'dash', title: 'STRATEGY EVALUATION DASHBOARD · SIMULATED · AFTER COSTS', tag: 'HYPOTHETICAL', cols: 4, th: 104, tiles: [
        { k: 'TOTAL TRADES', v: '20', at: 0 }, { k: 'WIN RATE', v: '40%', at: 0 }, { k: 'AVERAGE WIN', v: '1.96R', c: 'g2', s: 'RM981', at: 0 }, { k: 'AVERAGE LOSS', v: '1.10R', c: 'r2', s: 'RM550', at: 0 },
        { k: 'AVERAGE RR (REALISED)', v: '1.78', at: 1 }, { k: 'PROFIT FACTOR', v: '1.19', c: 'y', at: 1 }, { k: 'EXPECTANCY', v: '+0.125R', c: 'y', s: 'RM62.50', at: 1 }, { k: 'MAX DRAWDOWN', v: '3.3R', c: 'r2', s: 'RM1,650', at: 1 },
        { k: 'TOTAL COSTS', v: 'RM1,000', c: 'a', at: 2 }, { k: 'NET P&L', v: 'RM1,250', c: 'g2', s: '+2.5R', at: 2 }, { k: 'CONSECUTIVE WINS', v: '1', at: 2 }, { k: 'CONSECUTIVE LOSSES', v: '3', c: 'r2', at: 2 },
        { k: 'REGIME · TREND (7)', v: '+14.2R', c: 'g2', hl: 'g', at: 3 }, { k: 'REGIME · RANGE (10)', v: '−8.4R', c: 'r2', hl: 'r', at: 3 }, { k: 'REGIME · NEWS (3)', v: '−3.3R', c: 'r2', hl: 'r', at: 3 }, { k: 'EQUITY CURVE', v: 'see 16.5', c: 'm', fs: 24, at: 3 } ] },
      info: { k: '16.6 · DASHBOARD', h: 'Read the whole picture', b: [[1, 'Positive expectancy after costs — but small', 'y'], [2, 'Profit factor 1.19 leaves little margin for worse fills', 'a'], [3, 'Losing streak of 3 and a 3.3R drawdown in only 20 trades', 'r'], [4, '**All profit came from trending conditions**', 'g']] },
      say: [
        ['Here is the strategy evaluation dashboard, after costs, with clearly labelled hypothetical data.', 'Inilah dashboard penilaian strategi, selepas kos, dengan data hipotetikal yang dilabel dengan jelas.'],
        ['Twenty trades, a forty percent win rate, an average win of one point nine six R and an average loss of one point one R.', 'Dua puluh trade, win rate 40 peratus, purata menang 1.96R dan purata rugi 1.1R.'],
        ['Realised RR of one point seven eight, profit factor one point one nine, expectancy plus zero point one two five R, and maximum drawdown of three point three R.', 'RR yang direalisasikan 1.78, profit factor 1.19, expectancy tambah 0.125R, dan maximum drawdown 3.3R.'],
        ['Total costs of one thousand ringgit, a net result of one thousand two hundred and fifty, one consecutive win at most, and three consecutive losses.', 'Jumlah kos RM1,000, keputusan bersih RM1,250, paling banyak satu kemenangan berturut-turut, dan tiga kerugian berturut-turut.'],
        ['And by regime: plus fourteen point two R in trends, minus eight point four R in ranges, and minus three point three R around news. All the profit came from trending conditions.', 'Dan mengikut regim: tambah 14.2R dalam trend, tolak 8.4R dalam range, dan tolak 3.3R sekitar berita. Semua keuntungan datang daripada keadaan trending.'],
      ],
    },
    {
      tpl: 'cards', label: 'Strategy review', kicker: '16.7 · STRATEGY REVIEW', h: 'Accept, revise or reject?', cols: 3, top: 180, ch: 330,
      cards: [
        { n: 'ACCEPT?', nc: 'green2', t: 'Not yet', b: 'Expectancy after costs is positive but small, the sample is only 20 trades, and the interval includes zero.', at: 1 },
        { n: 'REVISE', nc: 'gold', t: 'The evidence-based choice', b: 'Hypothesis: add an objective trend-regime filter. Define it **before** testing, then test on **out-of-sample** data and forward test.', at: 2, hl: true },
        { n: 'REJECT?', nc: 'red2', t: 'If revision fails', b: 'If the filtered rule fails out-of-sample or after realistic costs, reject it — and record why.', at: 3 },
      ],
      note: { at: 4, y: 570, c: 'r', label: 'Overfitting warning', text: 'Filtering out the losing regime **in the same data** will always look better. That improvement is not evidence until it survives data it has never seen.' },
      say: [
        ['Now the strategy review. Accept, revise or reject?', 'Sekarang semakan strategi. Terima, semak semula atau tolak?'],
        ['Accept? Not yet. Expectancy after costs is positive but small, the sample is only twenty trades, and the confidence interval includes zero.', 'Terima? Belum lagi. Expectancy selepas kos adalah positif tetapi kecil, sampel hanya 20 trade, dan selang keyakinan merangkumi sifar.'],
        ['Revise is the evidence-based choice. The new hypothesis is an objective trend-regime filter, defined before testing, then tested on out-of-sample data and forward tested.', 'Semak semula ialah pilihan berasaskan bukti. Hipotesis baharu ialah penapis regim trend yang objektif, ditakrifkan sebelum ujian, kemudian diuji pada data out-of-sample dan diuji ke hadapan.'],
        ['If the filtered rule fails out-of-sample or after realistic costs, reject it, and record why.', 'Jika peraturan yang ditapis gagal secara out-of-sample atau selepas kos yang realistik, tolaknya, dan rekodkan sebabnya.'],
        ['A warning: removing the losing regime in the same data will always look better. That improvement is not evidence until it survives data it has never seen.', 'Satu amaran: membuang regim yang rugi dalam data yang sama akan sentiasa kelihatan lebih baik. Peningkatan itu bukan bukti sehingga ia bertahan pada data yang belum pernah dilihat.'],
      ],
    },
    {
      tpl: 'summary', kicker: 'LEVEL 10 · CORE PRINCIPLES', label: 'Core principles', h: 'Eight truths of Professional Application',
      items: [[0, 'Wyckoff and SMC are complementary — not identical'], [1, 'VPA interprets price, volume and spread — not intent'], [2, 'Order Flow depends on data and classification quality'], [3, 'Positive Delta does not guarantee rising prices'], [4, 'Profile levels are references — not guaranteed S/R'], [5, 'Backtests do not guarantee future performance', 'w'], [6, 'Test with realistic costs and execution', 'w'], [7, 'Evaluate beyond win rate alone', 'w']],
      say: [
        ['Level Ten can be summarised in eight truths. Wyckoff and S M C are complementary, but not identical.', 'Level 10 boleh diringkaskan dalam lapan kebenaran. Wyckoff dan SMC saling melengkapi, tetapi tidak sama.'],
        ['V P A interprets price, volume and spread, not direct institutional intent.', 'VPA mentafsir harga, volume dan spread, bukan niat institusi secara langsung.'],
        ['Order Flow depends on transaction data and classification quality.', 'Order Flow bergantung pada data transaksi dan kualiti klasifikasi.'],
        ['Positive Delta does not guarantee rising prices.', 'Delta positif tidak menjamin harga naik.'],
        ['Volume Profile levels are references, not guaranteed support or resistance.', 'Paras Volume Profile ialah rujukan, bukan support atau resistance yang dijamin.'],
        ['Backtest results do not guarantee future performance.', 'Keputusan backtest tidak menjamin prestasi masa depan.'],
        ['Strategies must be tested with realistic costs and execution assumptions.', 'Strategi mesti diuji dengan kos dan andaian pelaksanaan yang realistik.'],
        ['And performance must be evaluated beyond win rate alone.', 'Dan prestasi mesti dinilai melangkaui win rate semata-mata.'],
      ],
    },
    q('A sweep of equal lows occurs in a strong downtrend, with no prior climax or range. How should it be labelled?', ['Wyckoff Spring', 'SMC liquidity sweep — the Wyckoff context is missing', 'Selling Climax', 'Order Block'], 1, 'A Spring requires a Wyckoff range context. Without it, describe the event as a sweep only.', ['Final assessment, question one. A sweep of equal lows occurs in a strong downtrend, with no prior climax or range. How should it be labelled?', 'Penilaian akhir, soalan satu. Sapuan equal lows berlaku dalam downtrend yang kuat, tanpa climax atau range sebelumnya. Bagaimana ia patut dilabel?'], ['The answer is B: an S M C liquidity sweep. The Wyckoff context is missing, so it is not a Spring.', 'Jawapannya ialah B: SMC liquidity sweep. Konteks Wyckoff tidak wujud, jadi ia bukan Spring.']),
    q('Ask volume 900, bid volume 1,300. What is Delta — and what does it mean?', ['+400; price will rise', '−400; more volume was classified as seller-initiated under the provider\'s method', '−400; institutions are selling', '2,200; total buying'], 1, 'Delta = 900 − 1,300 = −400. It describes classified execution, not identity or future direction.', ['Question two. Ask volume nine hundred, bid volume one thousand three hundred. What is Delta, and what does it mean?', 'Soalan dua. Ask volume 900, bid volume 1,300. Apakah Delta, dan apa maksudnya?'], ['The answer is B. Delta is minus four hundred: more volume was classified as seller-initiated under the provider\'s method. It says nothing certain about identity or direction.', 'Jawapannya ialah B. Delta ialah tolak 400: lebih banyak volume diklasifikasikan sebagai dimulakan penjual di bawah kaedah provider. Ia tidak memberitahu apa-apa yang pasti tentang identiti atau arah.']),
    q('Price trades one bar above VAH and closes back inside value. What can you conclude?', ['A breakout is confirmed', 'VAH is buy-side liquidity, so reverse short', 'Nothing yet — acceptance or rejection needs time and subsequent behaviour', 'POC will be reached for certain'], 2, 'One bar outside value is neither a breakout nor proof of rejection. Watch subsequent bars and structure.', ['Question three. Price trades one bar above the Value Area High and closes back inside value. What can you conclude?', 'Soalan tiga. Harga didagangkan satu bar di atas Value Area High dan ditutup semula di dalam value. Apakah yang boleh anda simpulkan?'], ['The answer is C: nothing yet. Acceptance and rejection need time and subsequent behaviour.', 'Jawapannya ialah C: belum ada apa-apa. Acceptance dan rejection memerlukan masa dan tingkah laku susulan.']),
    q('A strategy has a 65% win rate, average win 0.6R and average loss 1.4R. Is it profitable before costs?', ['Yes — the win rate is high', 'No — expectancy = 0.65 × 0.6 − 0.35 × 1.4 = −0.10R', 'Yes — profit factor must be above 1', 'Cannot be calculated'], 1, '0.39 − 0.49 = −0.10R per trade. A high win rate does not guarantee profitability.', ['Question four. A strategy has a sixty-five percent win rate, an average win of zero point six R and an average loss of one point four R. Is it profitable before costs?', 'Soalan empat. Sebuah strategi mempunyai win rate 65 peratus, purata menang 0.6R dan purata rugi 1.4R. Adakah ia menguntungkan sebelum kos?'], ['The answer is B. Expectancy is zero point three nine minus zero point four nine: minus zero point one R. A high win rate does not guarantee profitability.', 'Jawapannya ialah B. Expectancy ialah 0.39 tolak 0.49: tolak 0.1R. Win rate yang tinggi tidak menjamin keuntungan.']),
    q('You tested 80 parameter sets and the best has PF 2.8 in-sample. What should you do next?', ['Trade it live at full size', 'Test the chosen rules once on untouched out-of-sample data, with costs, and record that 80 sets were tried', 'Add more filters until PF exceeds 3', 'Re-run on the same data to confirm'], 1, 'The best of many trials is likely inflated (overfitting / multiple testing). Independent evidence is required.', ['Question five. You tested eighty parameter sets, and the best has a profit factor of two point eight in-sample. What should you do next?', 'Soalan lima. Anda menguji 80 set parameter, dan yang terbaik mempunyai profit factor 2.8 secara in-sample. Apakah yang patut anda lakukan seterusnya?'], ['The answer is B. Test the chosen rules once on untouched out-of-sample data, with costs, and record that eighty sets were tried.', 'Jawapannya ialah B. Uji peraturan yang dipilih sekali pada data out-of-sample yang tidak disentuh, dengan kos, dan rekodkan bahawa 80 set telah dicuba.']),
    q('Which statement about an HVN is correct?', ['An HVN is always a demand zone', 'An HVN is an Order Block', 'An HVN is a price region with high traded volume, often linked to two-way trade — not automatically an OB or demand', 'Price must reverse at every HVN'], 2, 'Profile levels describe volume distribution; SMC zones are defined by price action. Record coincidences as separate observations.', ['Question six. Which statement about a High Volume Node is correct?', 'Soalan enam. Kenyataan manakah tentang High Volume Node yang betul?'], ['The answer is C. An H V N is a price region with high traded volume, often linked to two-way trade. It is not automatically an Order Block or demand.', 'Jawapannya ialah C. HVN ialah kawasan harga dengan volume dagangan yang tinggi, selalunya dikaitkan dengan dagangan dua hala. Ia bukan secara automatik Order Block atau demand.']),
    {
      tpl: 'cards', label: 'Your next steps', kicker: '16.8 · AFTER LEVEL 10', h: 'A professional practice plan', cols: 4, top: 190, ch: 300,
      cards: [
        { n: '01', t: 'Choose one setup', b: 'Write it as a complete nine-part rule set (Exercise 15).', at: 1 },
        { n: '02', t: 'Prepare FCPO data', b: 'Document contract, roll, sessions and data source.', at: 1 },
        { n: '03', t: 'Test honestly', b: 'Bar-by-bar, every signal, with costs; hold out data.', at: 2 },
        { n: '04', t: 'Forward test & journal', b: 'Small size; compare live results with the backtest.', at: 2 },
      ],
      note: { at: 3, y: 560, label: 'The goal of Level 10', text: 'Not to find a perfect signal — but to know **what each method measures, where it stops, and whether your rules have shown evidence of an edge.**' },
      say: [
        ['After Level Ten, here is a professional practice plan.', 'Selepas Level 10, inilah pelan latihan profesional.'],
        ['Choose one setup and write it as a complete nine-part rule set. Prepare and document your F C P O data.', 'Pilih satu setup dan tulis sebagai set peraturan sembilan bahagian yang lengkap. Sediakan dan dokumentasikan data FCPO anda.'],
        ['Test it honestly, bar by bar, recording every signal, with costs, and with data held out. Then forward test with small size, and journal every trade.', 'Uji dengan jujur, bar demi bar, merekod setiap isyarat, dengan kos, dan dengan data yang disimpan. Kemudian uji ke hadapan dengan saiz kecil, dan rekodkan setiap trade dalam jurnal.'],
        ['The goal of Level Ten is not to find a perfect signal. It is to know what each method measures, where it stops, and whether your rules have shown evidence of an edge.', 'Matlamat Level 10 bukan untuk mencari isyarat yang sempurna. Ia adalah untuk mengetahui apa yang diukur oleh setiap kaedah, di mana hadnya, dan sama ada peraturan anda telah menunjukkan bukti kelebihan.'],
      ],
    },
    {
      tpl: 'roadmap', label: 'Level 10 complete', kicker: 'LEVEL 10 · COMPLETE', h: 'Professional Application — six subtopics', rh: 80,
      rows: [
        { n: '01', t: 'SMC + Wyckoff', s: 'Videos 02–04', k: 'COMPLETE', at: 0 }, { n: '02', t: 'SMC + VPA', s: 'Videos 05–06', k: 'COMPLETE', at: 0 }, { n: '03', t: 'SMC + Order Flow', s: 'Videos 07–09', k: 'COMPLETE', at: 0 },
        { n: '04', t: 'SMC + Volume Profile', s: 'Videos 10–11', k: 'COMPLETE', at: 0 }, { n: '05', t: 'FCPO Case Studies', s: 'Video 12', k: 'COMPLETE', at: 0 }, { n: '06', t: 'Backtesting & Performance Evaluation', s: 'Videos 13–15 · Masterclass 16', k: 'COMPLETE', at: 0, on: true, hereAt: 1 },
      ],
      say: [
        ['That completes Level Ten: Professional Application. Six subtopics, in their original order, across sixteen videos.', 'Itu melengkapkan Level 10: Professional Application. Enam subtopik, mengikut susunan asal, merentasi enam belas video.'],
        ['Thank you for your commitment. Keep testing, keep journalling, and let evidence, not certainty, guide your trading.', 'Terima kasih atas komitmen anda. Teruskan menguji, teruskan merekod jurnal, dan biarkan bukti, bukan kepastian, membimbing dagangan anda.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua chart, keputusan backtest dan dashboard dalam siri ini ialah data hipotetikal/simulasi — bukan prestasi CMI dan bukan keputusan yang diaudit. Sahkan spesifikasi dan yuran FCPO dengan Bursa Malaysia Derivatives serta broker anda.', foot: 'Capital Market Institute · Smart Money Concept · Level 10', h: 420,
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
