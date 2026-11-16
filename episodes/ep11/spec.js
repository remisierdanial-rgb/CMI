/* CMI SMC Level 9 — VIDEO 11: Risk-to-Reward & Position Sizing (Subtopic 6 · A–J) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const rrScene = {
    label: '6A · UNDERSTANDING RISK-TO-REWARD',
    cues: ['Apakah risk-to-reward? Ia membandingkan potensi ganjaran dengan potensi risiko bagi satu dagangan.',
      'Dalam nisbah 1 berbanding 1, potensi ganjaran sama dengan risiko.',
      'Dalam 1 berbanding 2, ganjaran dua kali ganda risiko. 1 berbanding 3, tiga kali ganda. 1 berbanding 4, empat kali ganda.',
      'Risiko diukur dari entry ke stop-loss. Ganjaran diukur dari entry ke sasaran.',
      'RR mesti dinilai sebelum entry, kerana selepas entry, emosi mula mempengaruhi keputusan.'],
    build(S) {
      S.heading('RISK-TO-REWARD · 6A', 'Risk vs potential reward', S.at(0, -.3));
      const u = 70, base = 600;
      [1, 2, 3, 4].forEach((r, i) => {
        const x = 140 + i * 300, at = S.at(i === 0 ? 1 : 2, i === 0 ? 0 : (i - 1) * 1.6);
        S.el(`<div style="width:120px;height:${u}px;background:#ef5350;opacity:.85;border-radius:4px"></div>`, { x, y: base }, { at, dy: 0 });
        S.el(`<div style="width:120px;height:${u * r}px;background:#26a69a;opacity:.85;border-radius:4px"></div>`, { x, y: base - u * r - 6 }, { at: at + .3, dy: 20 });
        S.el(`<div class="mono" style="font:700 30px JBM;color:#e8b44c;width:120px;text-align:center">1 : ${r}</div>`, { x, y: base + u + 16 }, { at });
      });
      S.el('<div class="small mono" style="font-size:17px">RED = RISK (entry → stop) · GREEN = REWARD (entry → target)</div>', { x: 140, y: 760 }, { at: S.at(3) });
      const p = L.side(S, { k: 3, kicker: 'MEASURE', title: 'Before entry', items: [{ t: 'Risk = |entry − stop|', c: C.bear, k: 3, d: .5 }, { t: 'Reward = |target − entry|', c: C.bull, k: 3, d: 2 }, { t: 'Assess RR before entering', c: C.amber, k: 4 }] }, 1330, 170, 530, 420);
    }
  };
  const seqScene = {
    label: '6D · TEN-TRADE SEQUENCE',
    cues: ['Expectancy ialah purata jangka panjang, tetapi setiap urutan dagangan berbeza.',
      'Dalam urutan hipotetikal sepuluh dagangan ini, terdapat empat kemenangan dua R, dan enam kerugian satu R.',
      'Perhatikan tiga kerugian berturut-turut di awal. Pedagang yang berhenti di sini akan menyimpulkan strategi gagal.',
      'Selepas sepuluh dagangan, jumlahnya tambah dua R, iaitu purata 0.2R setiap dagangan, sebelum kos.',
      'Sepuluh dagangan masih sampel yang sangat kecil. Penilaian memerlukan sampel yang jauh lebih besar.'],
    build(S) {
      S.heading('EXPECTANCY · 6D', 'Hypothetical sequence: 4 × +2R, 6 × −1R', S.at(0, -.3));
      const seq = [-1, -1, -1, 2, -1, 2, -1, 2, -1, 2]; let cum = 0;
      seq.forEach((r, i) => {
        cum += r; const at = S.at(1, .3 + i * .45);
        S.el(`<div class="mono" style="font:700 20px JBM;color:#5f6e86">#${i + 1}</div><div style="font:800 34px Inter;color:${r > 0 ? '#26a69a' : '#ef5350'};margin-top:8px">${r > 0 ? '+2R' : '−1R'}</div><div class="mono" style="font:500 19px JBM;color:#9aa8be;margin-top:10px">Σ ${cum > 0 ? '+' : ''}${cum}R</div>`, { x: 60 + i * 180, y: 200, w: 160, h: 170, cls: 'card', style: 'padding:20px;text-align:center' }, { at });
      });
      const hl = S.el('', { x: 52, y: 192, w: 536, h: 186, style: 'border:2px dashed #ef5350;border-radius:14px' }, { at: S.at(2) });
      S.el('<div class="calc" style="font-size:30px">Total = 4 × 2R − 6 × 1R = <span class="em">+2R</span> → +0.2R / trade (before costs)</div>', { x: 60, y: 440, w: 1800 }, { at: S.at(3) });
      S.el('<div class="body" style="color:#9aa8be">Ten trades is a tiny sample. Losing streaks are normal even with positive expectancy.</div>', { x: 60, y: 520, w: 1800 }, { at: S.at(4) });
    }
  };
  const EPISODE = {
    id: 'ep11', video: 'VIDEO 11', title: 'Risk-to-Reward & Position Sizing',
    scenes: [
      L.title({
        kicker: 'VIDEO 11 · LEVEL 9 · SUBTOPIC 6 · RISK-TO-REWARD', title: 'Risk-to-Reward<br>& Position Sizing', sub: 'RR · Win rate · Expectancy · Costs · Margin ≠ risk',
        cues: ['Selamat datang ke Video 11, subtopik keenam: Risk-to-Reward.',
          'RR sering disalah faham sebagai jaminan keuntungan. Video ini menunjukkan kenapa ia hanya satu bahagian daripada gambaran.',
          'Kita akan kira RR, win rate break-even dan expectancy, dan lihat kesan kos dagangan.',
          'Kemudian kita kira saiz posisi FCPO, dan jelaskan dengan tegas kenapa margin bukan risiko.'],
        obj: [{ t: 'Calculate RR, break-even win rate & expectancy', k: 2 }, { t: 'Include trading costs', k: 2, d: 3 }, { t: 'Size FCPO positions from RM risk', k: 3 }, { t: 'Separate margin from risk · evaluate a strategy', k: 3, d: 3 }]
      }),
      rrScene,
      L.calc({
        label: '6B · RR CALCULATION', kicker: 'RISK-TO-REWARD · 6B', title: 'Risk-to-reward calculation', ptitle: 'HYPOTHETICAL FCPO EXAMPLE', lh: 60, fs: 29,
        cues: ['Formula risk-to-reward: potensi ganjaran bahagi potensi risiko.',
          'Contoh: entry 4,500, stop-loss 4,490, take-profit 4,520.',
          'Risiko 10 mata. Potensi ganjaran 20 mata. RR sama dengan 20 bahagi 10, iaitu 2.',
          'Maka gross reward-to-risk ialah 2 berbanding 1.',
          'Setup 2 berbanding 1 bermaksud potensi ganjaran kasar dua kali ganda risiko kasar yang dirancang. Ia tidak bermakna pedagang akan memperoleh dua kali ganda pada setiap dagangan.'],
        lines: [{ t: 'RR = Potential reward ÷ Potential risk', k: 0, d: 1 }, { t: 'Entry 4,500 · SL 4,490 · TP 4,520', k: 1 }, { t: 'Risk   = 4,500 − 4,490 = 10 pts', k: 2 }, { t: 'Reward = 4,520 − 4,500 = 20 pts', k: 2, d: 2 }, { t: 'RR     = 20 ÷ 10 = <span class="em">2  →  2 : 1 (gross)</span>', k: 3 }],
        note: { t: '2:1 is the planned gross potential — not what every trade earns.', k: 4 }
      }),
      L.table({
        label: '6C · BREAK-EVEN WIN RATE', kicker: 'RISK-TO-REWARD · 6C', title: 'Break-even win rate = Risk ÷ (Risk + Reward)',
        cues: ['Hubungan antara win rate dan RR. Win rate break-even ialah win rate minimum supaya hasil purata sifar.',
          'Formula ringkas, sebelum kos: risiko bahagi risiko campur ganjaran.',
          'Untuk 1 berbanding 1, lima puluh peratus. 1 berbanding 2, 33.33 peratus.',
          '1 berbanding 3, dua puluh lima peratus. 1 berbanding 4, dua puluh peratus.',
          'Ini angka teori yang dipermudahkan, sebelum kos, slippage dan kesan pelaksanaan lain.'],
        cols: ['Gross RR', 'Calculation', 'Approx. break-even win rate'], colw: ['26%', '40%', '34%'], colColor: [null, null, '#e8b44c'], fs: 26,
        rows: [['1 : 1', '1 ÷ (1 + 1)', '50%'], ['1 : 2', '1 ÷ (1 + 2)', '33.33%'], ['1 : 3', '1 ÷ (1 + 3)', '25%'], ['1 : 4', '1 ÷ (1 + 4)', '20%']],
        rowK: [[2, 0], [2, 2.5], [3, 0], [3, 2.5]], tag: { t: 'SIMPLIFIED THEORETICAL FIGURES · BEFORE COSTS, SLIPPAGE & EXECUTION EFFECTS', k: 4, y: 520 }
      }),
      L.bullets({
        label: '6C · WIN RATE & RR TOGETHER', kicker: 'RISK-TO-REWARD · 6C', title: 'Win rate and RR must be read together',
        cues: ['Win rate dan RR mesti dibaca bersama.',
          'Purata kemenangan dan purata kerugian sebenar menentukan hasil, bukan RR yang dirancang sahaja.',
          'Secara umumnya, sasaran yang lebih jauh kurang kerap dicapai. Menaikkan RR boleh menurunkan win rate.',
          'Win rate yang tinggi dengan RR yang kecil juga boleh rugi, jika kerugian purata lebih besar daripada kemenangan purata.',
          'Hanya data dagangan anda sendiri, dengan sampel yang mencukupi, boleh menunjukkan kombinasi yang sebenar.'],
        items: [{ t: 'Average win & average loss decide results — not planned RR alone', c: C.amber, k: 1 }, { t: 'Further targets are generally hit less often', c: C.liq, k: 2 }, { t: 'High win rate + small RR can still lose', c: C.bear, k: 3 }, { t: 'Only your own sufficient sample shows the real mix', c: C.green, k: 4 }]
      }),
      L.calc({
        label: '6D · EXPECTANCY', kicker: 'RISK-TO-REWARD · 6D', title: 'Expectancy', ptitle: 'HYPOTHETICAL ASSUMPTIONS', lh: 62, fs: 29,
        cues: ['Expectancy ialah purata hasil bagi setiap dagangan.',
          'Formula: win rate darab purata kemenangan, tolak loss rate darab purata kerugian.',
          'Andaikan win rate empat puluh peratus, purata kemenangan dua R, loss rate enam puluh peratus, dan purata kerugian satu R.',
          '0.40 darab 2R ialah 0.80R. 0.60 darab 1R ialah 0.60R. Expectancy ialah tambah 0.20R setiap dagangan, sebelum kos.',
          'Expectancy positif dalam data sejarah tidak menjamin keuntungan pada masa hadapan.'],
        lines: [{ t: 'E = (WR × AvgWin) − (LR × AvgLoss)', k: 1 }, { t: 'WR 40% · AvgWin 2R · LR 60% · AvgLoss 1R', k: 2 }, { t: '(0.40 × 2R) − (0.60 × 1R)', k: 3 }, { t: '= 0.80R − 0.60R = <span class="em">+0.20R per trade</span> (before costs)', k: 3, d: 3 }],
        note: { t: 'Positive historical expectancy does not guarantee future profitability.', k: 4 }
      }),
      seqScene,
      L.cards({
        label: '6E · TRADING COSTS', kicker: 'RISK-TO-REWARD · 6E', title: 'What real performance pays', cols: 4, h: 170,
        cues: ['Prestasi sebenar membayar kos yang tidak kelihatan dalam RR kasar.',
          'Brokerage, yuran bursa, dan yuran clearing.',
          'Cukai atau caj yang berkaitan.',
          'Slippage, bid-ask spread, dan kualiti pelaksanaan.',
          'Angka yuran berubah dan berbeza mengikut broker. Video ini tidak menggunakan sebarang angka yuran. Gunakan kos sebenar anda yang terkini.'],
        cards: [{ n: '01', t: 'Brokerage', c: C.amber, k: 1 }, { n: '02', t: 'Exchange fees', c: C.amber, k: 1, d: 1 }, { n: '03', t: 'Clearing fees', c: C.amber, k: 1, d: 2 }, { n: '04', t: 'Applicable taxes / charges', c: C.amber, k: 2 },
        { n: '05', t: 'Slippage', c: C.bear, k: 3 }, { n: '06', t: 'Bid-ask spread', c: C.bear, k: 3, d: 1 }, { n: '07', t: 'Execution quality', c: C.bear, k: 3, d: 2 }],
        note: { t: 'No fee figures are used here — use your current, verified costs.', k: 4, y: 600 }
      }),
      L.calc({
        label: '6E · COSTS CHANGE THE RR', kicker: 'RISK-TO-REWARD · 6E', title: 'A 2:1 setup after costs', ptitle: 'HYPOTHETICAL ASSUMPTION · COSTS + SLIPPAGE ≈ 2 pts PER CONTRACT (NOT A FEE QUOTE)', lh: 60, fs: 27,
        cues: ['Lihat kesan kos pada setup 2 berbanding 1. Andaikan, secara hipotetikal, jumlah kos dan slippage setara dua mata setiap kontrak.',
          { t: 'Risiko bersih menjadi 12 mata, iaitu RM300. Ganjaran bersih menjadi 18 mata, iaitu RM450.', say: 'Risiko bersih menjadi 12 mata, iaitu 300 ringgit. Ganjaran bersih menjadi 18 mata, iaitu 450 ringgit.' },
          'RR bersih turun daripada 2 kepada 1.5. Win rate break-even naik daripada 33 peratus kepada 40 peratus.',
          'RR yang menarik dari segi teori boleh menjadi kurang menarik selepas kos, terutamanya untuk sasaran yang kecil.'],
        lines: [{ t: 'Gross   risk 10 pts · reward 20 pts · RR 2.0 · BE 33.3%', k: 0, d: 2 }, { t: 'Net     risk 12 pts = <span style="color:#ef5350">RM300</span> · reward 18 pts = <span style="color:#26a69a">RM450</span>', k: 1 }, { t: 'Net RR  450 ÷ 300 = <span class="em">1.5</span>', k: 2 }, { t: 'Net BE  300 ÷ (300 + 450) = <span class="em">40%</span>', k: 2, d: 3 }]
      }),
      L.calc({
        label: '6F · POSITION SIZING', kicker: 'RISK-TO-REWARD · 6F', title: 'Position size = Max RM risk ÷ RM risk per contract', ptitle: 'HYPOTHETICAL · BUDGET RM500 · STOP 10 pts · RM25 / pt / contract', lh: 60, fs: 27,
        cues: ['Saiz posisi menghubungkan ekuiti akaun, risiko maksimum, jarak stop, nilai setiap mata, dan kos.',
          'Formula: risiko maksimum dalam ringgit, bahagi risiko ringgit setiap kontrak. Hasilnya dibundarkan ke bawah kepada bilangan kontrak penuh.',
          { t: 'Bajet RM500. Stop 10 mata darab RM25, iaitu RM250 setiap kontrak. 500 bahagi 250, iaitu dua kontrak.', say: 'Bajet 500 ringgit. Stop 10 mata darab 25 ringgit, iaitu 250 ringgit setiap kontrak. 500 bahagi 250, iaitu dua kontrak.' },
          { t: 'Tetapi jika risiko maksimum termasuk kos dan slippage, contohnya RM300 setiap kontrak, 500 bahagi 300 ialah 1.67, dibundarkan ke bawah menjadi satu kontrak.', say: 'Tetapi jika risiko maksimum termasuk kos dan slippage, contohnya 300 ringgit setiap kontrak, 500 bahagi 300 ialah 1.67, dibundarkan ke bawah menjadi satu kontrak.' },
          'Jangan sekali-kali bundarkan ke atas. Bundar ke atas bermakna risiko melebihi had yang anda tetapkan.'],
        lines: [{ t: 'Contracts = floor( Budget ÷ RM risk per contract )', k: 1 }, { t: 'Gross   10 × 25 = RM250 → 500 ÷ 250 = <span style="color:#26a69a">2 contracts</span>', k: 2 }, { t: 'w/ cost 12 × 25 = RM300 → 500 ÷ 300 = 1.67 → <span class="em">1 contract</span>', k: 3 }],
        note: { t: 'Always round down. Rounding up exceeds your own risk limit.', k: 4 }
      }),
      L.cards({
        label: '6G · MARGIN TERMS', kicker: 'MARGIN vs RISK · 6G', title: 'Seven terms traders confuse', cols: 4, h: 190,
        cues: ['Bahagian yang sangat penting: margin berbanding risiko. Mula-mula, tujuh istilah.',
          'Initial margin ialah deposit untuk membuka posisi. Maintenance margin ialah paras minimum ekuiti untuk mengekalkannya.',
          'Kemudahan margin intraday ialah margin yang dikurangkan oleh broker bagi posisi yang ditutup dalam hari yang sama.',
          'Ekuiti tersedia ialah baki yang boleh digunakan. Notional ialah harga darab saiz kontrak.',
          'Risiko stop-loss dan kerugian maksimum di bawah stop yang dirancang ialah jarak stop darab nilai setiap mata darab bilangan kontrak.'],
        cards: [{ n: 'IM', t: 'Initial margin', b: 'Deposit to open.', c: C.amber, k: 1 }, { n: 'MM', t: 'Maintenance margin', b: 'Minimum equity to hold.', c: C.amber, k: 1, d: 3 }, { n: 'IDM', t: 'Intraday margin facility', b: 'Reduced margin, same-day positions.', c: C.amber, k: 2 }, { n: 'EQ', t: 'Available equity', c: C.liq, k: 3 },
        { n: 'NOTIONAL', t: 'Contract notional', b: '4,500 × 25 t = RM112,500', c: C.liq, k: 3, d: 2 }, { n: 'SL RISK', t: 'Stop-loss risk', b: 'pts × RM25 × contracts', c: C.bear, k: 4 }, { n: 'MAX LOSS', t: 'Max loss under the plan', b: 'Plus gap / slippage risk.', c: C.bear, k: 4, d: 3 }]
      }),
      L.calc({
        label: '6G · MARGIN IS NOT RISK', kicker: 'MARGIN vs RISK · 6G', statement: 'Margin is not the same as<br>maximum trading risk.', h: 420, lh: 62, fs: 28,
        cues: ['Ingat ayat ini: margin tidak sama dengan risiko dagangan maksimum.',
          { t: 'Sama ada anda menggunakan margin penuh, separuh, atau suku margin, satu kontrak tetap satu kontrak. Notionalnya kekal RM112,500 pada harga 4,500.', say: 'Sama ada anda menggunakan margin penuh, separuh, atau suku margin, satu kontrak tetap satu kontrak. Notionalnya kekal 112,500 ringgit pada harga 4,500.' },
          { t: 'Pergerakan 10 mata yang merugikan tetap bernilai RM250 setiap kontrak, tanpa mengira margin.', say: 'Pergerakan 10 mata yang merugikan tetap bernilai 250 ringgit setiap kontrak, tanpa mengira margin.' },
          'Kemudahan margin yang lebih rendah tidak mengurangkan pendedahan pasaran. Ia hanya mengurangkan modal yang dikunci, dan boleh menggalakkan saiz posisi yang berlebihan.',
          'Pedagang yang menggunakan suku atau separuh margin mesti mengira risiko berdasarkan pergerakan harga keseluruhan kontrak. Margin yang lebih rendah tidak menjadikan dagangan lebih selamat.'],
        lines: [{ t: 'Full / ½ / ¼ margin → still 1 contract · notional RM112,500', k: 1 }, { t: '10-pt adverse move = 10 × RM25 = <span style="color:#ef5350">RM250</span> in every case', k: 2 }, { t: 'Lower margin → less capital locked, <span style="color:#ef5350">same exposure</span>', k: 3 }, { t: 'Risk = stop pts × RM25 × contracts · never from margin', k: 4 }],
        note: { t: 'Margin levels are set by the exchange clearing house and brokers — no margin figure is implied here.', k: 4, d: 4 }
      }),
      L.bullets({
        label: '6H · RR BY TRADING STYLE', kicker: 'RISK-TO-REWARD · 6H', title: 'No universal minimum RR',
        cues: ['RR mengikut gaya trading.',
          'Scalping, intraday dan swing mungkin menghasilkan profil RR yang berbeza, kerana jarak stop dan sasaran berbeza.',
          'CMI tidak menetapkan RR minimum sejagat. Memaksa semua setup mencapai 1 berbanding 3 boleh menghasilkan sasaran yang tidak realistik.',
          'RR dipengaruhi oleh volatiliti, jarak stop, jarak sasaran, struktur pasaran, liquidity, kos dagangan, win rate dan prestasi strategi.'],
        items: [{ t: 'Different styles → different typical RR profiles', c: C.amber, k: 1 }, { t: 'No universal minimum RR — forcing 1:3 creates unrealistic targets', c: C.bear, k: 2 }],
        side: { k: 3, kicker: 'RR DEPENDS ON', title: 'Eight factors', items: [{ t: 'Volatility · stop distance', c: C.liq, k: 3, d: .5 }, { t: 'Target distance · structure', c: C.liq, k: 3, d: 1.5 }, { t: 'Liquidity · trading costs', c: C.liq, k: 3, d: 2.5 }, { t: 'Win rate · strategy performance', c: C.liq, k: 3, d: 3.5 }] }
      }),
      L.cards({
        label: '6I · STRATEGY EVALUATION', kicker: 'RISK-TO-REWARD · 6I', title: 'Evaluate more than RR', cols: 4, h: 140, tfs: 23,
        cues: ['Untuk menilai strategi, RR sahaja tidak mencukupi.',
          'Win rate, purata kemenangan, purata kerugian, dan expectancy.',
          'Profit factor, iaitu jumlah untung kasar bahagi jumlah rugi kasar. Maximum drawdown, iaitu penurunan terbesar dari puncak.',
          'Bilangan dagangan, kerugian berturut-turut, slippage dan kos dagangan.',
          'Dan konsistensi merentasi keadaan pasaran yang berbeza.'],
        cards: [{ t: 'Win rate', c: C.amber, k: 1 }, { t: 'Average win', c: C.amber, k: 1, d: .8 }, { t: 'Average loss', c: C.amber, k: 1, d: 1.6 }, { t: 'Expectancy', c: C.amber, k: 1, d: 2.4 }, { t: 'Profit factor', c: C.liq, k: 2 }, { t: 'Maximum drawdown', c: C.bear, k: 2, d: 3 },
        { t: 'Number of trades', c: C.liq, k: 3 }, { t: 'Consecutive losses', c: C.bear, k: 3, d: 1 }, { t: 'Slippage', c: C.bear, k: 3, d: 2 }, { t: 'Transaction costs', c: C.bear, k: 3, d: 3 }, { t: 'Consistency across conditions', c: C.green, k: 4 }]
      }),
      L.calc({
        label: '6I · HIGH RR, POOR STRATEGY', kicker: 'RISK-TO-REWARD · 6I', title: 'A 1:4 strategy can still lose', ptitle: 'HYPOTHETICAL · BEFORE COSTS', lh: 60, fs: 28,
        cues: ['Contoh: strategi dengan RR 1 berbanding 4. Win rate break-evennya dua puluh peratus.',
          'Andaikan dalam ujian, win rate sebenar hanya lapan belas peratus.',
          'Expectancy: 0.18 darab 4R, tolak 0.82 darab 1R. Hasilnya tolak 0.10R setiap dagangan.',
          'RR yang tinggi tidak menjamin keuntungan, jika win rate terlalu rendah atau kos pelaksanaan terlalu tinggi.'],
        lines: [{ t: 'RR 1 : 4 → break-even win rate 20%', k: 0, d: 2 }, { t: 'Tested win rate 18%', k: 1 }, { t: '(0.18 × 4R) − (0.82 × 1R) = 0.72R − 0.82R', k: 2 }, { t: '= <span style="color:#ef5350">−0.10R per trade</span>', k: 2, d: 4 }],
        note: { t: 'High RR + low win rate (or high costs) = a losing strategy.', k: 3 }
      }),
      L.cards({
        label: '6J · COMMON RR MISTAKES', kicker: 'RISK-TO-REWARD · 6J', title: 'Eight common RR mistakes', cols: 4, h: 170, bad: true,
        cues: ['Lapan kesilapan RR yang biasa.',
          'Memaksa setiap setup mencapai 1 berbanding 3. Mengabaikan liquidity bertentangan yang dekat.',
          'Menggunakan sasaran yang tidak realistik. Mengabaikan jarak stop-loss.',
          'Mengira RR tanpa kos. Mengelirukan RR yang dirancang dengan RR yang direalisasikan.',
          'Menambah saiz posisi kerana sasaran jauh. Dan menganggap RR yang tinggi menjamin keuntungan.'],
        cards: [{ t: 'Forcing every setup to 1:3', k: 1 }, { t: 'Ignoring nearby opposing liquidity', k: 1, d: 2 }, { t: 'Unrealistic targets', k: 2 }, { t: 'Ignoring stop distance', k: 2, d: 1.5 },
        { t: 'RR without costs', k: 3 }, { t: 'Planned RR = realised RR?', k: 3, d: 1.5 }, { t: 'Sizing up for a far target', k: 4 }, { t: 'High RR = guaranteed profit', k: 4, d: 2 }]
      }),
      L.kc({
        title: 'Answer before the reveal (1/2)',
        qs: [{ q: 'How is RR calculated?', a: 'Reward ÷ Risk → 4,500 / 4,490 / 4,520 = 20 ÷ 10 = 2:1.', qs: 'Soalan satu: bagaimana RR dikira?', as: 'Jawapan: ganjaran bahagi risiko. Untuk 4,500, 4,490 dan 4,520, iaitu 20 bahagi 10, atau 2 berbanding 1.' },
        { q: 'RR and win rate — the relationship?', a: 'Higher RR lowers the break-even win rate, but further targets are generally hit less often.', qs: 'Soalan dua: apakah hubungan antara RR dan win rate?', as: 'Jawapan: RR yang lebih tinggi menurunkan win rate break-even, tetapi sasaran yang lebih jauh secara umumnya kurang kerap dicapai.' },
        { q: 'What is expectancy?', a: '(WR × AvgWin) − (LR × AvgLoss) → e.g. +0.20R before costs.', qs: 'Soalan tiga: apakah expectancy?', as: 'Jawapan: win rate darab purata kemenangan, tolak loss rate darab purata kerugian. Contohnya tambah 0.20R sebelum kos.' }]
      }),
      L.kc({
        title: 'Answer before the reveal (2/2)', start: 4, intro: 'Tiga soalan lagi.',
        qs: [{ q: 'Stop distance increases — what happens to size?', a: 'Size falls in inverse proportion · round down · 0 = no trade.', qs: 'Soalan empat: jika jarak stop bertambah, apa berlaku kepada saiz posisi?', as: 'Jawapan: saiz berkurang secara songsang. Bundarkan ke bawah, dan sifar bermakna tiada dagangan.' },
        { q: 'Why is margin not maximum trading risk?', a: 'Margin is a deposit; ¼ margin still moves RM25 per point per contract.', qs: 'Soalan lima: kenapa margin bukan risiko maksimum?', as: 'Jawapan: margin ialah deposit. Dengan suku margin pun, setiap mata tetap 25 ringgit setiap kontrak.' },
        { q: 'Why include trading costs in evaluation?', a: 'They cut reward and add risk on every trade: 2.0 → 1.5 RR, 33% → 40% BE.', qs: 'Soalan enam: kenapa kos dagangan mesti dimasukkan dalam penilaian strategi?', as: 'Jawapan: kos mengurangkan ganjaran dan menambah risiko pada setiap dagangan. RR 2.0 menjadi 1.5, dan win rate break-even naik dari 33 kepada 40 peratus.' }]
      }),
      L.summary({
        title: 'Video 11 — what to remember', points: [
          { t: 'RR = reward ÷ risk · assessed before entry · planned ≠ realised', s: 'RR ialah ganjaran bahagi risiko, dinilai sebelum entry. RR yang dirancang tidak sama dengan yang direalisasikan.' },
          { t: 'Break-even win rate & expectancy — always after costs', s: 'Win rate break-even dan expectancy mesti dinilai selepas kos.' },
          { t: 'Size from RM risk per contract · round down', s: 'Saiz posisi dikira dari risiko ringgit setiap kontrak, dan dibundarkan ke bawah.' },
          { t: 'Margin is not risk · high RR guarantees nothing', s: 'Margin bukan risiko, dan RR yang tinggi tidak menjamin apa-apa.' }]
      }),
      L.exercise({
        title: 'Exercises 7 & 8 — RR and position size', steps: [
          { t: 'Exercise 7 · RR', b: 'Short: entry 4,620 · SL 4,632 · TP 4,584. Risk, reward, RR and break-even win rate?', s: 'Latihan tujuh: short pada 4,620, stop 4,632, sasaran 4,584. Kira risiko, ganjaran, RR dan win rate break-even.' },
          { t: 'Exercise 8 · Size', b: 'Account RM40,000 · risk 1% · SL 14 pts + 2 pts cost. Contracts? What if SL = 20 pts?', s: 'Latihan lapan: akaun 40,000 ringgit, risiko satu peratus, stop 14 mata ditambah kos setara 2 mata. Berapa kontrak? Bagaimana jika stop 20 mata?' }],
        note: 'Answers: 12 / 36 pts · 3:1 · 25% — RM400 ÷ RM400 = 1 contract · SL 20 → 22 × 25 = RM550 → 0 contracts (docs/06)'
      }),
      L.upnext({ video: 'VIDEO 12A', title: 'Integrated FCPO Case Studies · Part A', items: ['Case 1 & 2 · scalping bullish and bearish', 'Case 3 & 4 · intraday bullish and bearish', 'Full SOP applied from context to journal'], say: 'Dalam Video 12A, kita aplikasikan semua yang dipelajari dalam empat kajian kes FCPO: scalping dan intraday, bullish dan bearish.' }),
      L.refs({ items: [L.REF.kd, L.REF.harris, L.REF.cme, L.REF.bursa] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 12A.', next: 'Seterusnya: Video 12A — Integrated FCPO Case Studies' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
