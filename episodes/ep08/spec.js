/* CMI SMC Level 9 — VIDEO 08: Scalping vs Intraday vs Swing (Master prompt §6) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep08', video: 'VIDEO 08', title: 'Scalping vs Intraday vs Swing',
    scenes: [
      L.title({
        kicker: 'VIDEO 08 · LEVEL 9 · COMPARISON LESSON', title: 'Scalping vs Intraday<br>vs Swing', sub: 'Three styles · three SOPs · one decision',
        cues: ['Selamat datang ke Video 8. Kita telah membina tiga SOP: scalping, intraday dan swing.',
          'Dalam video ini, kita bandingkan ketiga-tiganya secara terus.',
          'Kita lihat perbezaan dalam persediaan, tempoh pegangan, stop-loss, sasaran, saiz posisi, pemantauan, kos, risiko overnight dan tuntutan psikologi.',
          'Kemudian kita bincangkan cara memilih gaya yang sesuai dengan masa, modal dan keadaan anda.'],
        obj: [{ t: 'Compare the three CMI frameworks side by side', k: 1 }, { t: 'See how one RM risk budget sizes differently', k: 2 }, { t: 'Understand practical & psychological differences', k: 2, d: 3 }, { t: 'Choose a style that fits you', k: 3 }]
      }),
      L.table({
        label: '§6 · FRAMEWORK COMPARISON', kicker: 'COMPARISON', title: 'Suggested CMI teaching frameworks',
        cues: ['Inilah jadual perbandingan rangka kerja CMI.',
          'Objektif utama: scalping mensasarkan pergerakan pendek, intraday pergerakan dalam hari, dan swing pergerakan pasaran yang lebih besar.',
          'Tempoh pegangan: pendek, dalam hari dagangan, atau merentasi beberapa sesi dan hari.',
          'Konteks timeframe tinggi: 1H dan 30M untuk scalping, Daily dan 4H untuk intraday, Weekly dan Daily untuk swing.',
          'Timeframe setup: 15M, 1H atau 30M, dan 4H atau 1H. Timeframe entry: 5M, 15M atau 5M, dan 1H hingga 15M.',
          'Pertimbangan utama: pelaksanaan dan kos, struktur sesi, serta konteks HTF dan risiko overnight.',
          'Ini rangka pengajaran yang dicadangkan oleh CMI, bukan standard industri sejagat.'],
        cols: ['Criteria', 'Scalping', 'Intraday', 'Swing trading'], colw: ['22%', '24%', '24%', '30%'], colColor: [null, '#e8b44c', '#22d3ee', '#8b7cf6'], fs: 23,
        rows: [['Main objective', 'Short price movements', 'Intraday movements', 'Larger market swings'], ['Holding period', 'Short', 'Within trading day', 'Multiple sessions / days'], ['Higher context', '1H / 30M', 'Daily / 4H', 'Weekly / Daily'], ['Setup timeframe', '15M', '1H / 30M', '4H / 1H'], ['Entry timeframe', '5M', '15M / 5M', '1H / 30M / 15M'], ['Main consideration', 'Execution & costs', 'Session structure', 'HTF context & overnight risk']],
        rowK: [1, 2, 3, [4, 0], [4, 3], 5], tag: { t: 'SUGGESTED CMI TEACHING FRAMEWORKS · NOT UNIVERSAL INDUSTRY STANDARDS', k: 6, y: 640 }
      }),
      L.schem({
        label: '§6 · ONE MARKET, THREE LENSES', kicker: 'COMPARISON', title: 'The same FCPO move through three lenses',
        cues: ['Bayangkan satu pergerakan harga FCPO yang sama.',
          'Pedagang swing melihat keseluruhan pergerakan: dari POI Daily ke liquidity utama, merentasi beberapa hari.',
          'Pedagang intraday mengambil satu bahagian, dalam satu hari dagangan.',
          'Pedagang scalping mengambil satu pergerakan kecil di dalamnya, dalam beberapa minit.',
          'Ketiga-tiganya boleh betul. Tetapi setiap satu memerlukan stop, sasaran dan saiz posisi yang berbeza.'],
        h: 500, panels: [{
          k: 0, d: .3, title: 'FCPO · ILLUSTRATIVE', dur: 3, pts: [[0, .12], [.08, .3], [.14, .22], [.24, .45], [.3, .38], [.38, .56], [.44, .5], [.52, .66], [.6, .58], [.7, .78], [.78, .7], [.9, .9], [1, .86]],
          zones: [{ x1: 0, x2: 1, y1: .05, y2: .95, c: C.poi, label: 'SWING · DAYS', k: 1, dash: true }, { x1: .28, x2: .62, y1: .32, y2: .7, c: C.liq, label: 'INTRADAY · ONE DAY', k: 2, dash: true }, { x1: .36, x2: .46, y1: .46, y2: .6, c: C.amber, label: 'SCALP', k: 3 }]
        }], side: { k: 4, kicker: 'SAME MOVE', title: 'Different plans', items: [{ t: 'Stop distance', c: C.amber, k: 4, d: .5 }, { t: 'Target', c: C.bull, k: 4, d: 1.5 }, { t: 'Position size', c: C.liq, k: 4, d: 2.5 }] }
      }),
      L.table({
        label: '§6 · NINE PRACTICAL DIFFERENCES', kicker: 'COMPARISON', title: 'Practical differences',
        cues: ['Sekarang sembilan perbezaan praktikal.',
          'Persediaan: scalping memerlukan persediaan sesi, intraday persediaan harian dengan dua senario, dan swing analisis Weekly serta Daily.',
          'Tempoh pegangan berbeza, dan jarak stop-loss berbeza: ketat, sederhana, dan lebar.',
          'Sasaran: liquidity sesi untuk scalping, PDH atau PDL untuk intraday, dan liquidity utama untuk swing.',
          'Dengan bajet risiko ringgit yang sama, saiz posisi swing biasanya paling kecil, kerana stop paling lebar.',
          'Pemantauan: scalping memerlukan perhatian berterusan, swing lebih jarang tetapi terdedah semalaman.',
          'Kos adalah paling ketara untuk scalping. Risiko overnight hanya wujud untuk swing.',
          'Tuntutan psikologi juga berbeza: kelajuan keputusan dalam scalping, disiplin sesi dalam intraday, dan kesabaran menghadapi retracement dalam swing.'],
        cols: ['Dimension', 'Scalping', 'Intraday', 'Swing'], colw: ['24%', '25%', '25%', '26%'], colColor: [null, '#e8b44c', '#22d3ee', '#8b7cf6'], fs: 21,
        rows: [['Preparation', 'Session prep', 'Daily plan + 2 scenarios', 'Weekly & Daily map'], ['Holding period', 'Minutes', 'Same day', 'Days'], ['Stop distance', 'Tight', 'Moderate', 'Wide'], ['Target', 'Session liquidity', 'PDH / PDL · intraday liquidity', 'Major HTF liquidity'],
        ['Size (same RM risk)', 'Largest', 'Medium', 'Smallest'], ['Monitoring', 'Continuous', 'Through the session', 'Periodic'], ['Execution costs', 'Most significant', 'Moderate', 'Smallest share of reward'], ['Overnight exposure', 'None', 'None (by rule)', 'Yes · gaps & events'], ['Psychological demand', 'Fast decisions', 'Session discipline', 'Patience with retracements']],
        rowK: [1, [2, 0], [2, 2.5], 3, 4, 5, [6, 0], [6, 2.5], 7]
      }),
      L.calc({
        label: '§6 · SAME RM RISK, DIFFERENT SIZE', kicker: 'COMPARISON', title: 'One RM500 budget, three styles', ptitle: 'HYPOTHETICAL · RISK BUDGET RM500 · 1 pt = RM25 / contract · GROSS', lh: 66, fs: 28,
        cues: ['Lihat kesan perbezaan stop-loss terhadap saiz posisi, dengan bajet risiko yang sama, iaitu 500 ringgit.',
          { t: 'Scalping, stop 10 mata: RM250 setiap kontrak. 500 bahagi 250, iaitu dua kontrak.', say: 'Scalping, stop 10 mata: 250 ringgit setiap kontrak. 500 bahagi 250, iaitu dua kontrak.' },
          { t: 'Intraday, stop 18 mata: RM450 setiap kontrak. 500 bahagi 450 ialah 1.11, dibundarkan ke bawah menjadi satu kontrak.', say: 'Intraday, stop 18 mata: 450 ringgit setiap kontrak. 500 bahagi 450 ialah 1.11, dibundarkan ke bawah menjadi satu kontrak.' },
          { t: 'Swing, stop 80 mata: RM2,000 setiap kontrak. Hasilnya sifar kontrak. Dengan bajet ini, tiada dagangan swing.', say: 'Swing, stop 80 mata: 2,000 ringgit setiap kontrak. Hasilnya sifar kontrak. Dengan bajet ini, tiada dagangan swing.' },
          'Pemilihan gaya mesti sepadan dengan modal anda, bukan sebaliknya.'],
        lines: [{ t: 'Scalping  10 pts → RM250 → 500 ÷ 250 = <span style="color:#26a69a">2 contracts</span>', k: 1 }, { t: 'Intraday  18 pts → RM450 → 500 ÷ 450 = 1.11 → <span class="em">1 contract</span>', k: 2 }, { t: 'Swing     80 pts → RM2,000 → 0.25 → <span style="color:#ef5350">0 · no trade</span>', k: 3 }],
        note: { t: 'Style choice must fit your capital — never the other way round.', k: 4 }
      }),
      L.cards({
        label: '§6 · CHOOSING A STYLE', kicker: 'COMPARISON', title: 'Which style fits you?', cols: 3, h: 210,
        cues: ['Bagaimana memilih gaya yang sesuai?',
          'Pertama, masa skrin. Scalping memerlukan perhatian penuh semasa sesi. Swing lebih sesuai jika anda tidak dapat memantau carta sepanjang hari.',
          'Kedua, modal. Stop yang lebar memerlukan bajet risiko yang lebih besar untuk satu kontrak.',
          'Ketiga, toleransi terhadap risiko overnight dan gap.',
          'Keempat, perangai dan kos. Adakah anda selesa membuat keputusan pantas, dan adakah kos dagangan anda rendah?',
          'Dan akhir sekali, bukti ujian. Pilih gaya yang SOP-nya telah diuji dan menunjukkan hasil yang konsisten dalam rekod anda sendiri.'],
        cards: [{ n: 'TIME', t: 'Screen time', b: 'Continuous attention vs periodic checks.', c: C.amber, k: 1 }, { n: 'CAPITAL', t: 'Capital & risk budget', b: 'Wide stops need a larger RM budget.', c: C.liq, k: 2 }, { n: 'OVERNIGHT', t: 'Overnight tolerance', b: 'Gaps and events.', c: C.bear, k: 3 },
        { n: 'TEMPERAMENT', t: 'Decision speed', b: 'Fast execution vs patience.', c: C.poi, k: 4 }, { n: 'COSTS', t: 'Cost sensitivity', b: 'Your actual brokerage & slippage.', c: C.amber, k: 4, d: 3 }, { n: 'EVIDENCE', t: 'Testing evidence', b: 'Your own journal and forward tests.', c: C.green, k: 5 }]
      }),
      L.statement({
        label: '§6 · KEY MESSAGE', kicker: 'KEY MESSAGE', text: 'No style is inherently<br>more profitable.', fs: 72,
        cues: ['Mesej utama video ini: tiada gaya trading yang secara semula jadi lebih menguntungkan.', 'Yang menentukan hasil ialah kualiti SOP, konsistensi pelaksanaan, kawalan risiko dan kos, merentasi sampel dagangan yang besar.', 'Jangan campurkan SOP. Pilih satu gaya, kuasai, dan nilai dengan jurnal.'],
        subs: [{ t: 'Results come from SOP quality, consistent execution, risk & cost control — over a large sample.', k: 1 }, { t: 'Do not mix SOPs. Choose one style, master it, journal it.', k: 2 }]
      }),
      L.kc({
        qs: [{ q: 'Main difference between scalping, intraday and swing?', a: 'Holding period & timeframe framework → different stops, targets, size, costs and overnight risk.', qs: 'Soalan satu: apakah beza utama antara scalping, intraday dan swing trading?', as: 'Jawapan: tempoh pegangan dan rangka timeframe, yang membawa kepada stop, sasaran, saiz posisi, kos dan risiko overnight yang berbeza.' },
        { q: 'Why should each style have a different SOP?', a: 'Applying one style\'s stops/targets to another puts stops in noise or makes risk too large.', qs: 'Soalan dua: kenapa setiap gaya perlu SOP yang berbeza?', as: 'Jawapan: menggunakan stop dan sasaran satu gaya pada gaya lain sama ada meletakkan stop di dalam hingar, atau menjadikan risiko terlalu besar.' },
        { q: 'RM500 budget, swing stop 80 pts — how many contracts?', a: '80 × 25 = RM2,000 → 0.25 → 0 contracts · no trade.', qs: 'Soalan tiga: bajet 500 ringgit dan stop swing 80 mata. Berapa kontrak?', as: 'Jawapan: 80 darab 25 ialah 2,000 ringgit. 500 bahagi 2,000 ialah 0.25, jadi sifar kontrak dan tiada dagangan.' }]
      }),
      L.summary({
        title: 'Video 08 — what to remember', points: [
          { t: 'Suggested CMI frameworks — not universal standards', s: 'Rangka kerja ini cadangan CMI, bukan standard sejagat.' },
          { t: 'Nine differences: prep · holding · stop · target · size · monitoring · costs · overnight · psychology', s: 'Sembilan perbezaan: persediaan, tempoh, stop, sasaran, saiz, pemantauan, kos, overnight dan psikologi.' },
          { t: 'Same RM budget → very different position sizes', s: 'Bajet ringgit yang sama menghasilkan saiz posisi yang sangat berbeza.' },
          { t: 'No style is inherently more profitable · do not mix SOPs', s: 'Tiada gaya yang secara semula jadi lebih menguntungkan. Jangan campurkan SOP.' }]
      }),
      L.upnext({ video: 'VIDEO 09', title: 'Entry Confirmation · Complete Methodology', items: ['Liquidity → MSS / CHoCH → Displacement → FVG → Entry planning', 'Four entry models and their trade-offs', 'False confirmation · the CMI checklist'], say: 'Dalam Video 9, kita masuk ke subtopik keempat: Entry Confirmation, iaitu metodologi lengkap, empat model entry, pengesahan palsu dan senarai semak CMI.' }),
      L.refs({ items: [L.REF.murphy, L.REF.harris, L.REF.kd, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 9.', next: 'Seterusnya: Video 09 — Entry Confirmation' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
