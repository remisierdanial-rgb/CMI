/* VIDEO 14 — Backtesting Performance Metrics
   Subtopic 6 · Backtesting & Performance Evaluation — section G (Performance metrics 1–8).
   One SIMULATED sample of 20 trades is used throughout so every number is consistent:
   R = [2.1,-1,-1,1.8,-1,2.4,-1,-1,-1,2.0,-1,1.6,-1,2.2,-1,-1,2.5,-1,1.9,-1]; 1R = RM500 (20 ticks × RM25), before costs.
   Wins 8 · WR 40% · avg win 2.0625R · avg loss 1R · GP 16.5R · GL 12R · PF 1.375 · net 4.5R · E = +0.225R · max DD 3.0R (trade 6 → 9) · SD 1.550R. */
const R = [2.1, -1, -1, 1.8, -1, 2.4, -1, -1, -1, 2.0, -1, 1.6, -1, 2.2, -1, -1, 2.5, -1, 1.9, -1];
const SIM = 'SIMULATED · 20 TRADES · 1R = RM500';

EP({
  num: '14', short: 'Performance Metrics', title: 'Backtesting Performance Metrics',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 14 · SUBTOPIC 6 · BACKTESTING & PERFORMANCE',
      h: 'Backtesting Performance Metrics', sub: 'Win rate · Average win and loss · RR · Profit factor · Expectancy · Drawdown · Sharpe',
      obj: [[1, 'Calculate win rate, average win, average loss and realised RR'], [2, 'Calculate and interpret profit factor and expectancy'], [3, 'Measure maximum drawdown from an equity curve'], [4, 'State the assumptions behind a Sharpe ratio']],
      viz: { type: 'equity', title: 'EQUITY · ' + SIM, r: R, dur: 3, unit: 'R' },
      say: [
        ['Welcome to Video Fourteen. A backtest produces a list of trades. Performance metrics turn that list into evidence.', 'Selamat datang ke Video 14. Backtest menghasilkan senarai trade. Metrik prestasi menukar senarai itu menjadi bukti.'],
        ['We will calculate eight metrics: win rate, average win, average loss, risk-to-reward, profit factor, expectancy, maximum drawdown and the Sharpe ratio.', 'Kita akan mengira lapan metrik: win rate, purata menang, purata rugi, risk-to-reward, profit factor, expectancy, maximum drawdown dan Sharpe ratio.'],
        ['To keep every number consistent, we use one simulated sample of twenty trades, where one R equals five hundred ringgit, before costs.', 'Untuk memastikan setiap nombor konsisten, kita menggunakan satu sampel simulasi 20 trade, di mana satu R bersamaan RM500, sebelum kos.'],
        ['This is a teaching sample. It is not C M I performance, and twenty trades is far too few to judge a real strategy, as we will discuss in Video Fifteen.', 'Ini ialah sampel pengajaran. Ia bukan prestasi CMI, dan 20 trade terlalu sedikit untuk menilai strategi sebenar, seperti yang akan kita bincangkan dalam Video 15.'],
      ],
    },
    {
      tpl: 'viz', label: 'The sample',
      viz: { type: 'hbars', title: 'TRADE RESULTS IN R · ' + SIM, tag: 'BEFORE COSTS', pl: 120, items: R.map((v, i) => ({ label: 'T' + (i + 1), v, text: (v > 0 ? '+' : '') + v.toFixed(1) + 'R', at: 0, d: i * .08 })) },
      info: { k: '14.1 · THE SAMPLE', h: 'Twenty simulated trades', b: [[1, '8 winners, 12 losers', 'g'], [2, 'Every loser = −1R (stop hit, no slippage assumed yet)', ''], [3, 'Winners between +1.6R and +2.5R', 'g'], [4, '1R = 20 ticks × RM25 = **RM500**', 'y']], note: { at: 5, label: 'R-multiples', text: 'Measuring results in R (multiples of initial risk) lets us compare trades with different stop sizes.' } },
      say: [
        ['Here are the twenty simulated trades, measured in R, or multiples of the initial risk.', 'Ini ialah 20 trade simulasi, diukur dalam R, atau gandaan risiko awal.'],
        ['There are eight winners and twelve losers.', 'Terdapat lapan trade menang dan dua belas trade rugi.'],
        ['Every loser is exactly minus one R: the stop was hit, and for now we assume no slippage.', 'Setiap trade rugi tepat tolak 1R: stop dicetuskan, dan buat masa ini kita andaikan tiada slippage.'],
        ['Winners range from plus one point six to plus two point five R.', 'Trade menang berjulat dari tambah 1.6 hingga tambah 2.5R.'],
        ['One R is twenty ticks times twenty-five ringgit: five hundred ringgit per contract.', 'Satu R ialah 20 tick darab RM25: RM500 setiap kontrak.'],
        ['Measuring in R lets us compare trades with different stop sizes on a common scale.', 'Mengukur dalam R membolehkan kita membandingkan trade dengan saiz stop berbeza pada skala yang sama.'],
      ],
    },
    {
      tpl: 'formula', label: 'Win rate', kicker: 'METRIC 1 · WIN RATE', h: 'Win Rate = Winning trades ÷ Total trades × 100%',
      lines: [[1, 'Win rate = 8 ÷ 20 × 100% = {g}40%{/}', 'big'], [2, 'Loss rate = 12 ÷ 20 = 60%'], [3, '{gr}Strength:{/} simple; shows how often the rules are right'], [4, '{r}Limitation:{/} says nothing about how much is won or lost']],
      note: { at: 5, c: 'r', label: 'Warning', text: 'A high win rate does **not** guarantee a profitable strategy. A 40% win rate is not "bad" if winners are large enough.' },
      say: [
        ['Metric one: win rate. Win rate equals winning trades divided by total trades, times one hundred percent.', 'Metrik satu: win rate. Win rate bersamaan trade menang dibahagi jumlah trade, darab 100 peratus.'],
        ['Eight divided by twenty is forty percent.', 'Lapan bahagi dua puluh ialah 40 peratus.'],
        ['So the loss rate is sixty percent.', 'Jadi loss rate ialah 60 peratus.'],
        ['Its strength is simplicity: it shows how often the rules are right.', 'Kekuatannya ialah kesederhanaan: ia menunjukkan berapa kerap peraturan itu betul.'],
        ['Its limitation is serious: it says nothing about how much is won or lost.', 'Hadnya serius: ia tidak memberitahu berapa banyak dimenangi atau dirugikan.'],
        ['A high win rate does not guarantee profitability. And forty percent is not bad if the winners are large enough.', 'Win rate yang tinggi tidak menjamin keuntungan. Dan 40 peratus bukan buruk jika trade menang cukup besar.'],
      ],
    },
    {
      tpl: 'table', label: 'Win-rate trap', kicker: 'METRIC 1 · THE WIN-RATE TRAP', h: 'Higher win rate, lower profitability', cols: ['', 'Strategy A', 'Strategy B'], widths: [460, 600, 600], hs: 38,
      rows: [
        [1, 'Win rate', '{gr}70%{/}', '35%'],
        [2, 'Average win', '0.5R', '2.5R'],
        [2, 'Average loss', '1.5R', '1.0R'],
        [3, 'Expectancy', '0.70 × 0.5 − 0.30 × 1.5 = {r}−0.10R{/}', '0.35 × 2.5 − 0.65 × 1.0 = {gr}+0.225R{/}'],
      ],
      note: { at: 4, label: 'Lesson', text: 'Strategy A wins more often but **loses money** on average. Win rate must always be read with average win and average loss.' },
      say: [
        ['Here is the win-rate trap. Compare two hypothetical strategies.', 'Inilah perangkap win rate. Bandingkan dua strategi hipotetikal.'],
        ['Strategy A wins seventy percent of the time. Strategy B wins only thirty-five percent.', 'Strategi A menang 70 peratus daripada masa. Strategi B menang hanya 35 peratus.'],
        ['But A\'s average win is half an R, and its average loss is one and a half R. B wins two and a half R and loses one R.', 'Tetapi purata menang A ialah setengah R, dan purata ruginya satu setengah R. B menang 2.5R dan rugi 1R.'],
        ['A\'s expectancy is minus zero point one R per trade. B\'s is plus zero point two two five R.', 'Expectancy A ialah tolak 0.1R setiap trade. Expectancy B ialah tambah 0.225R.'],
        ['Strategy A wins more often, but loses money on average. Win rate must always be read with average win and average loss.', 'Strategi A lebih kerap menang, tetapi rugi secara purata. Win rate mesti sentiasa dibaca bersama purata menang dan purata rugi.'],
      ],
    },
    {
      tpl: 'formula', label: 'Average win and loss', kicker: 'METRICS 2–3 · AVERAGE WIN AND LOSS', h: 'How big are the wins and losses?', fs: 28,
      lines: [
        [1, 'Average Win  = Total profit from winners ÷ Number of winners'],
        [2, '             = 16.5R ÷ 8 = {gr}2.06R{/}  (RM1,031.25)'],
        [3, 'Average Loss = |Total loss from losers| ÷ Number of losers'],
        [4, '             = 12R ÷ 12 = {r}1.00R{/}  (RM500)'],
      ],
      note: { at: 5, label: 'Note', text: 'Average loss uses the **absolute** value of losses, so both averages are positive numbers.' },
      say: [
        ['Metrics two and three: average win and average loss.', 'Metrik dua dan tiga: purata menang dan purata rugi.'],
        ['Average win equals the total profit from winning trades, divided by the number of winning trades.', 'Purata menang bersamaan jumlah keuntungan daripada trade menang, dibahagi bilangan trade menang.'],
        ['Sixteen point five R divided by eight is about two point zero six R, or one thousand and thirty-one ringgit and twenty-five sen.', '16.5R bahagi lapan ialah kira-kira 2.06R, atau RM1,031.25.'],
        ['Average loss equals the absolute total loss from losing trades, divided by the number of losing trades.', 'Purata rugi bersamaan nilai mutlak jumlah kerugian daripada trade rugi, dibahagi bilangan trade rugi.'],
        ['Twelve R divided by twelve is one R, or five hundred ringgit.', '12R bahagi dua belas ialah 1R, atau RM500.'],
        ['Average loss uses the absolute value, so both averages are positive.', 'Purata rugi menggunakan nilai mutlak, jadi kedua-dua purata adalah positif.'],
      ],
    },
    {
      tpl: 'formula', label: 'Risk-to-reward', kicker: 'METRIC 4 · RISK-TO-REWARD', h: 'Planned RR versus realised RR', fs: 28,
      lines: [
        [1, 'Planned RR  = planned target distance ÷ planned stop distance = {c}2.5R{/}'],
        [2, 'Realised RR = Average win ÷ Average loss = 2.06 ÷ 1.00 = {g}2.06{/}', 'big'],
        [3, 'Gap: {a}targets not always reached{/} · partial or early exits · slippage'],
        [4, '{r}A high RR does not guarantee positive expectancy{/} — it also depends on win rate'],
      ],
      say: [
        ['Metric four: risk-to-reward. Distinguish planned from realised.', 'Metrik empat: risk-to-reward. Bezakan antara yang dirancang dan yang direalisasikan.'],
        ['Suppose the rules planned a target of two and a half R on every trade.', 'Andaikan peraturan merancang sasaran 2.5R pada setiap trade.'],
        ['Realised RR is the average win divided by the average loss: two point zero six.', 'RR yang direalisasikan ialah purata menang dibahagi purata rugi: 2.06.'],
        ['The gap comes from targets not always being reached, partial or early exits, and slippage.', 'Jurang itu datang daripada sasaran yang tidak selalu dicapai, exit separa atau awal, dan slippage.'],
        ['And a high RR does not guarantee positive expectancy. It also depends on how often you win.', 'Dan RR yang tinggi tidak menjamin expectancy positif. Ia juga bergantung pada berapa kerap anda menang.'],
      ],
    },
    {
      tpl: 'formula', label: 'Profit factor', kicker: 'METRIC 5 · PROFIT FACTOR', h: 'Profit Factor = Gross profit ÷ Gross loss',
      lines: [
        [1, 'PF = 16.5R ÷ 12R = RM8,250 ÷ RM6,000 = {g}1.375{/}', 'big'],
        [2, '{gr}PF > 1{/}: gross profit exceeds gross loss'],
        [2, '{m}PF = 1{/}: break-even before costs'],
        [2, '{r}PF < 1{/}: losing strategy'],
        [3, 'Must be read with {a}drawdown, sample size and trading costs{/}'],
      ],
      note: { at: 4, c: 'r', label: 'Limitation', text: 'A high profit factor does **not** guarantee low drawdown, and a PF from 20 trades is fragile — one extra loss changes it noticeably. PF is also very sensitive to costs.' },
      say: [
        ['Metric five: profit factor. Profit factor equals gross profit divided by gross loss.', 'Metrik lima: profit factor. Profit factor bersamaan keuntungan kasar dibahagi kerugian kasar.'],
        ['Sixteen point five R divided by twelve R, or eight thousand two hundred and fifty ringgit divided by six thousand, gives one point three seven five.', '16.5R bahagi 12R, atau RM8,250 bahagi RM6,000, memberikan 1.375.'],
        ['Above one, gross profit exceeds gross loss. Equal to one is break-even before costs. Below one is a losing strategy.', 'Melebihi 1, keuntungan kasar melebihi kerugian kasar. Sama dengan 1 ialah pulang modal sebelum kos. Di bawah 1 ialah strategi yang rugi.'],
        ['But profit factor must be read alongside drawdown, sample size and trading costs.', 'Tetapi profit factor mesti dibaca bersama drawdown, saiz sampel dan kos dagangan.'],
        ['A high profit factor does not guarantee low drawdown, and a profit factor from twenty trades is fragile: one extra loss changes it noticeably.', 'Profit factor yang tinggi tidak menjamin drawdown yang rendah, dan profit factor daripada 20 trade adalah rapuh: satu kerugian tambahan mengubahnya dengan ketara.'],
      ],
    },
    {
      tpl: 'formula', label: 'Expectancy', kicker: 'METRIC 6 · EXPECTANCY', h: 'Expectancy = (Win rate × Avg win) − (Loss rate × Avg loss)', fs: 29,
      lines: [
        [1, 'Example: win rate 40% · average win 2R · loss rate 60% · average loss 1R'],
        [2, '(0.40 × 2R) − (0.60 × 1R)'],
        [3, '= 0.80R − 0.60R'],
        [4, '= {g}+0.20R per trade{/} before costs', 'big'],
      ],
      note: { at: 5, label: 'Meaning', text: 'On average, each trade added 0.2 of the amount risked — **historically, before costs, under these assumptions**. It does not predict the next trade, and costs can remove it.' },
      say: [
        ['Metric six: expectancy, the average result per trade.', 'Metrik enam: expectancy, keputusan purata setiap trade.'],
        ['Take the standard example: a forty percent win rate, an average win of two R, a sixty percent loss rate, and an average loss of one R.', 'Ambil contoh standard: win rate 40 peratus, purata menang 2R, loss rate 60 peratus, dan purata rugi 1R.'],
        ['Expectancy is zero point four times two R, minus zero point six times one R.', 'Expectancy ialah 0.4 darab 2R, tolak 0.6 darab 1R.'],
        ['That is zero point eight R minus zero point six R.', 'Itu ialah 0.8R tolak 0.6R.'],
        ['Equals plus zero point two R per trade, before costs.', 'Bersamaan tambah 0.2R setiap trade, sebelum kos.'],
        ['On average, each trade added two tenths of the amount risked, historically, before costs, under these assumptions. It does not predict the next trade, and costs can remove it.', 'Secara purata, setiap trade menambah dua persepuluh daripada jumlah yang dirisikokan, secara sejarah, sebelum kos, di bawah andaian ini. Ia tidak meramal trade seterusnya, dan kos boleh menghapuskannya.'],
      ],
    },
    {
      tpl: 'formula', label: 'Sample expectancy', kicker: 'METRIC 6 · OUR SAMPLE', h: 'Expectancy of the 20 simulated trades', fs: 29,
      lines: [
        [1, '(0.40 × 2.0625R) − (0.60 × 1.00R)'],
        [2, '= 0.825R − 0.600R = {g}+0.225R{/} per trade', 'big'],
        [3, 'Check: net 4.5R ÷ 20 trades = 0.225R ✓'],
        [4, 'In ringgit: 0.225 × RM500 = {g}RM112.50{/} per trade, {a}before costs{/}'],
      ],
      note: { at: 5, c: 'r', label: 'Preview', text: 'If round-trip costs and slippage total about 0.1R per trade, expectancy falls to roughly +0.125R. Costs are covered in Video 15.' },
      say: [
        ['Now our sample. Zero point four times two point zero six two five R, minus zero point six times one R.', 'Sekarang sampel kita. 0.4 darab 2.0625R, tolak 0.6 darab 1R.'],
        ['Zero point eight two five minus zero point six equals plus zero point two two five R per trade.', '0.825 tolak 0.6 bersamaan tambah 0.225R setiap trade.'],
        ['Check it another way: net result four point five R divided by twenty trades is zero point two two five R. The two methods agree.', 'Semak dengan cara lain: keputusan bersih 4.5R bahagi 20 trade ialah 0.225R. Kedua-dua kaedah sepadan.'],
        ['In ringgit, that is one hundred and twelve ringgit fifty per trade, before costs.', 'Dalam ringgit, itu ialah RM112.50 setiap trade, sebelum kos.'],
        ['If costs and slippage total about zero point one R per trade, expectancy falls to roughly zero point one two five R. We cover costs in Video Fifteen.', 'Jika kos dan slippage berjumlah kira-kira 0.1R setiap trade, expectancy jatuh kepada lebih kurang 0.125R. Kita membincangkan kos dalam Video 15.'],
      ],
    },
    {
      tpl: 'viz', label: 'Maximum drawdown',
      viz: { type: 'equity', title: 'EQUITY CURVE · ' + SIM, tag: 'MAXIMUM DRAWDOWN', r: R, dur: 3, unit: 'R', dd: 2, marks: [{ i: 14, text: 'NEW HIGH · RECOVERED', c: 'g', at: 4 }] },
      info: { k: 'METRIC 7 · DRAWDOWN', h: 'Peak to trough', b: [[1, 'Equity curve: cumulative result after each trade', 'c'], [2, '**Peak** +3.3R (trade 6) → **trough** +0.3R (trade 9)', 'y'], [3, '**Max drawdown** = 3.3 − 0.3 = **3.0R** = RM1,500', 'r'], [4, '**Recovery:** a new equity high at trade 14', 'g'], [5, 'On a RM50,000 account: 1,500 ÷ 51,650 = **2.9%**', 'a']], note: { at: 6, label: 'Note', text: 'Max drawdown is the largest historical peak-to-trough fall. Future drawdowns can be **larger** — especially with more trades.' } },
      say: [
        ['Metric seven: maximum drawdown. This is the equity curve: the cumulative result after each trade.', 'Metrik tujuh: maximum drawdown. Ini ialah keluk ekuiti: keputusan kumulatif selepas setiap trade.'],
        ['Equity peaks at plus three point three R after trade six, then falls to a trough of plus zero point three R after trade nine.', 'Ekuiti memuncak pada tambah 3.3R selepas trade enam, kemudian jatuh ke titik terendah tambah 0.3R selepas trade sembilan.'],
        ['Maximum drawdown is the largest peak-to-trough fall: three point three minus zero point three, which is three R, or one thousand five hundred ringgit.', 'Maximum drawdown ialah kejatuhan terbesar dari puncak ke titik terendah: 3.3 tolak 0.3, iaitu 3R, atau RM1,500.'],
        ['Recovery happens when equity makes a new high, here at trade fourteen.', 'Pemulihan berlaku apabila ekuiti membuat paras tertinggi baharu, di sini pada trade empat belas.'],
        ['As a percentage, on a fifty thousand ringgit account the peak was fifty-one thousand six hundred and fifty. One thousand five hundred divided by that is about two point nine percent.', 'Sebagai peratusan, pada akaun RM50,000 puncaknya ialah RM51,650. 1,500 dibahagi dengan itu ialah kira-kira 2.9 peratus.'],
        ['Maximum drawdown is historical. Future drawdowns can be larger, especially over more trades.', 'Maximum drawdown adalah sejarah. Drawdown masa depan boleh lebih besar, terutamanya merentasi lebih banyak trade.'],
      ],
    },
    {
      tpl: 'formula', label: 'Sharpe ratio', kicker: 'METRIC 8 · SHARPE RATIO', h: 'Return relative to variability', fs: 26,
      lines: [
        [1, 'Sharpe = (mean return − risk-free return) ÷ standard deviation of returns'],
        [2, 'State: {c}data frequency{/} (daily? monthly? per trade?) · {c}risk-free rate{/} · annualised or not'],
        [3, 'Our sample, {a}per trade, risk-free = 0, not annualised{/}:'],
        [3, 'mean 0.225R ÷ sample SD 1.550R = {g}0.145 per trade{/}'],
        [4, '{r}Do not annualise per-trade figures without periodic returns and stated assumptions{/}'],
      ],
      note: { at: 5, c: 'r', label: 'Limitation', text: 'Sharpe treats upside and downside variability alike and assumes roughly normal returns. Trading returns are often skewed (many small losses, few large wins), so Sharpe can mislead.' },
      say: [
        ['Metric eight: the Sharpe ratio, which measures return relative to variability.', 'Metrik lapan: Sharpe ratio, yang mengukur pulangan berbanding kebolehubahan.'],
        ['Sharpe equals mean return minus the risk-free return, divided by the standard deviation of returns.', 'Sharpe bersamaan pulangan purata tolak pulangan bebas risiko, dibahagi sisihan piawai pulangan.'],
        ['A Sharpe ratio is meaningless without stating its data frequency, the risk-free rate, and whether it is annualised.', 'Sharpe ratio tidak bermakna tanpa menyatakan kekerapan data, kadar bebas risiko, dan sama ada ia disetahunkan.'],
        ['For our sample, per trade, with a risk-free rate of zero and not annualised: the mean of zero point two two five R divided by a sample standard deviation of one point five five R gives about zero point one four five per trade.', 'Bagi sampel kita, setiap trade, dengan kadar bebas risiko sifar dan tidak disetahunkan: purata 0.225R dibahagi sisihan piawai sampel 1.55R memberikan kira-kira 0.145 setiap trade.'],
        ['Do not annualise per-trade figures without periodic returns and clearly stated assumptions.', 'Jangan setahunkan angka setiap trade tanpa pulangan berkala dan andaian yang dinyatakan dengan jelas.'],
        ['Sharpe treats upside and downside variability alike, and assumes roughly normal returns. Trading returns are often skewed, so Sharpe can mislead.', 'Sharpe melayan kebolehubahan naik dan turun dengan sama, dan mengandaikan pulangan yang lebih kurang normal. Pulangan dagangan selalunya pencong, jadi Sharpe boleh mengelirukan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Metrics together',
      viz: { type: 'dash', title: 'SUMMARY · ' + SIM, tag: 'BEFORE COSTS', cols: 4, th: 120, tiles: [
        { k: 'TOTAL TRADES', v: '20', at: 0 }, { k: 'WIN RATE', v: '40%', at: 0 }, { k: 'AVERAGE WIN', v: '2.06R', c: 'g2', at: 0 }, { k: 'AVERAGE LOSS', v: '1.00R', c: 'r2', at: 0 },
        { k: 'REALISED RR', v: '2.06', at: 1 }, { k: 'PROFIT FACTOR', v: '1.375', c: 'y', at: 1 }, { k: 'EXPECTANCY', v: '+0.225R', c: 'y', s: 'RM112.50', at: 1 }, { k: 'NET RESULT', v: '+4.5R', s: 'RM2,250', at: 1 },
        { k: 'MAX DRAWDOWN', v: '3.0R', c: 'r2', s: 'RM1,500', at: 2 }, { k: 'MAX LOSING STREAK', v: '3', c: 'r2', at: 2 }, { k: 'MAX WINNING STREAK', v: '1', at: 2 }, { k: 'MEAN/SD (PER TRADE)', v: '0.145', s: 'rf = 0', at: 2 } ] },
      info: { k: '14.2 · READ THEM TOGETHER', h: 'No single metric is enough', b: [[1, 'Win rate alone hides trade size', ''], [2, 'Expectancy alone hides the path', 'y'], [3, 'Drawdown and streaks show what you must survive', 'r'], [4, 'All are **before costs** and from only 20 trades', 'a']] },
      say: [
        ['Here are all the metrics together. No single metric is enough.', 'Ini ialah semua metrik bersama-sama. Tiada satu metrik pun yang mencukupi.'],
        ['Win rate alone hides the size of trades. Expectancy alone hides the path the equity took.', 'Win rate sahaja menyembunyikan saiz trade. Expectancy sahaja menyembunyikan laluan yang diambil oleh ekuiti.'],
        ['Drawdown and losing streaks show what you must be able to survive, psychologically and financially.', 'Drawdown dan siri kerugian menunjukkan apa yang mesti anda mampu harungi, dari segi psikologi dan kewangan.'],
        ['And remember: all of these are before costs, and from only twenty simulated trades.', 'Dan ingat: kesemua ini adalah sebelum kos, dan daripada hanya 20 trade simulasi.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercise 16', kicker: 'EXERCISE 16', h: 'Calculate performance metrics', cols: 2, top: 180, ch: 420,
      cards: [
        { n: 'DATA', t: 'Ten trades (RM, before costs)', b: '+1,000 · −500 · −500 · +1,500 · −500 · −500 · +750 · −500 · +1,250 · −500. Calculate win rate, average win, average loss, profit factor, expectancy, net result and maximum drawdown.', at: 1 },
        { n: 'ANSWERS', nc: 'green2', t: 'Worked solution', b: 'Win rate 4/10 = 40% · Avg win 4,500/4 = RM1,125 · Avg loss 3,000/6 = RM500 · PF 4,500/3,000 = 1.5 · Expectancy 0.4×1,125 − 0.6×500 = RM150 · Net RM1,500 (= 150 × 10 ✓) · Max DD RM1,000 (1,000 → 0, and 1,500 → 500).', at: 2 },
      ],
      say: [
        ['Exercise Sixteen: calculate the performance metrics for ten trades.', 'Latihan 16: kira metrik prestasi bagi sepuluh trade.'],
        ['The answers: win rate forty percent. Average win one thousand one hundred and twenty-five ringgit. Average loss five hundred. Profit factor one point five. Expectancy one hundred and fifty ringgit per trade. Net result one thousand five hundred, which equals one hundred and fifty times ten. Maximum drawdown one thousand ringgit.', 'Jawapannya: win rate 40 peratus. Purata menang RM1,125. Purata rugi RM500. Profit factor 1.5. Expectancy RM150 setiap trade. Keputusan bersih RM1,500, bersamaan 150 darab sepuluh. Maximum drawdown RM1,000.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Win rate 35%, average win 2.5R, average loss 1R. What is the expectancy before costs?',
      opts: ['+0.875R', '+0.225R', '−0.225R', '+1.5R'], ans: 1, ansAt: 1,
      expl: '(0.35 × 2.5) − (0.65 × 1.0) = 0.875 − 0.650 = +0.225R per trade, before costs.',
      say: [
        ['Knowledge check. Win rate thirty-five percent, average win two and a half R, average loss one R. What is the expectancy before costs?', 'Semakan pengetahuan. Win rate 35 peratus, purata menang 2.5R, purata rugi 1R. Apakah expectancy sebelum kos?', { p: 1.5 }],
        ['The answer is B. Zero point three five times two point five, minus zero point six five times one, equals plus zero point two two five R.', 'Jawapannya ialah B. 0.35 darab 2.5, tolak 0.65 darab 1, bersamaan tambah 0.225R.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is Maximum Drawdown?',
      opts: ['The largest single losing trade', 'The largest peak-to-trough decline in the equity curve', 'The average loss per trade', 'The total of all losing trades'], ans: 1, ansAt: 1,
      expl: 'It measures the worst historical fall from an equity high before a new high. Future drawdowns can exceed it.',
      say: [
        ['Second question. What is maximum drawdown?', 'Soalan kedua. Apakah maximum drawdown?', { p: 1.5 }],
        ['The answer is B: the largest peak-to-trough decline in the equity curve.', 'Jawapannya ialah B: kejatuhan terbesar dari puncak ke titik terendah dalam keluk ekuiti.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Performance metrics — what to remember',
      items: [[0, 'Win rate = wins ÷ total — never read alone'], [1, 'Average win / loss: size matters'], [2, 'Planned RR ≠ realised RR'], [3, 'Profit factor = gross profit ÷ gross loss'], [4, 'Expectancy = WR × avg win − LR × avg loss'], [5, 'Max drawdown = largest peak-to-trough fall'], [6, 'Sharpe needs stated frequency and assumptions', 'w'], [7, 'All metrics here are before costs, n = 20', 'w']],
      say: [
        ['To summarise. Win rate is wins divided by total trades, and is never read alone.', 'Sebagai rumusan. Win rate ialah trade menang dibahagi jumlah trade, dan tidak pernah dibaca bersendirian.'],
        ['Average win and loss show that size matters.', 'Purata menang dan rugi menunjukkan saiz itu penting.'],
        ['Planned RR is not realised RR.', 'RR yang dirancang bukan RR yang direalisasikan.'],
        ['Profit factor is gross profit divided by gross loss.', 'Profit factor ialah keuntungan kasar dibahagi kerugian kasar.'],
        ['Expectancy is win rate times average win, minus loss rate times average loss.', 'Expectancy ialah win rate darab purata menang, tolak loss rate darab purata rugi.'],
        ['Maximum drawdown is the largest peak-to-trough fall.', 'Maximum drawdown ialah kejatuhan terbesar dari puncak ke titik terendah.'],
        ['Sharpe needs a stated frequency and assumptions.', 'Sharpe memerlukan kekerapan dan andaian yang dinyatakan.'],
        ['And every metric here is before costs, from just twenty trades.', 'Dan setiap metrik di sini adalah sebelum kos, daripada hanya 20 trade.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 6', h: 'Is the result real — or luck, bias and missing costs?',
      chips: [[0, 'Sample size', 'Variance and confidence'], [0, 'Overfitting', 'In- and out-of-sample, walk-forward'], [0, 'Costs & regimes', 'Execution realism · journal']],
      nk: 'NEXT · VIDEO 15', nt: 'Advanced Performance Evaluation', nAt: 1, ny: 420,
      say: [
        ['In Video Fifteen, we ask whether a result is real: sample size, overfitting, out-of-sample and walk-forward testing, trading costs, market regimes, and the trading journal.', 'Dalam Video 15, kita bertanya sama ada sesuatu keputusan itu sebenar: saiz sampel, overfitting, ujian out-of-sample dan walk-forward, kos dagangan, regim pasaran, dan jurnal dagangan.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua keputusan dagangan dalam video ini ialah data simulasi untuk pengajaran — bukan prestasi CMI dan bukan keputusan yang diaudit.', foot: 'Seterusnya: Video 15 — Advanced Performance Evaluation',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
