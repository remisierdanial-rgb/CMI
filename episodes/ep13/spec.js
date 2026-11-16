/* CMI SMC Level 9 — VIDEO 13: CMI Professional Trading SOP & Final Assessment (Master prompt §5, §8, §12) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb', pink: '#f472b6' };
  const EPISODE = {
    id: 'ep13', video: 'VIDEO 13', title: 'CMI Professional Trading SOP',
    scenes: [
      L.title({
        kicker: 'VIDEO 13 · LEVEL 9 · INTEGRATION & FINAL ASSESSMENT', title: 'CMI Professional<br>Trading SOP', sub: 'Workflow · Checklists · Journal · Review',
        cues: ['Selamat datang ke Video 13, video terakhir Level 9.',
          'Kita satukan semua enam subtopik menjadi satu aliran kerja trading CMI yang lengkap.',
          'Kita bina senarai semak pra-pasaran dan pelaksanaan, jurnal dagangan, dan proses penilaian prestasi.',
          'Akhir sekali, penilaian akhir Level 9.'],
        obj: [{ t: 'Run the integrated CMI workflow', k: 1 }, { t: 'Use pre-market & execution checklists', k: 2 }, { t: 'Keep a complete trading journal', k: 2, d: 2 }, { t: 'Evaluate performance & complete the final assessment', k: 3 }]
      }),
      L.flow({
        label: '§5 · INTEGRATED CMI WORKFLOW', kicker: 'INTEGRATED WORKFLOW', title: 'The CMI SMC trading workflow', per: 4, bh: 120,
        cues: ['Inilah aliran kerja trading CMI yang lengkap.',
          'Konteks pasaran dan bias timeframe tinggi menetapkan arah. Pemilihan gaya trading menentukan rangka timeframe dan tempoh pegangan.',
          'Struktur dan liquidity memberi peta. POI memberi lokasi.',
          'Entry confirmation memberi pencetus: liquidity, MSS, displacement dan FVG.',
          'Trade planning menetapkan entry, stop-loss struktur, take-profit berasaskan liquidity, RR dan saiz posisi.',
          'Pelaksanaan dan pengurusan mengikut peraturan. Jurnal dan penilaian menutup gelung, dan memberi maklum balas kepada SOP.'],
        steps: [{ t: 'Market context', s: 'HTF BIAS · DIRECTION', c: C.blue, k: 1 }, { t: 'Trading style', s: 'TIMEFRAMES · HOLDING', c: C.amber, k: 1, d: 3 }, { t: 'Structure & liquidity', s: 'THE MAP', c: C.liq, k: 2 }, { t: 'POI selection', s: 'THE LOCATION', c: C.poi, k: 2, d: 2 },
        { t: 'Entry confirmation', s: 'THE TRIGGER', c: C.green, k: 3 }, { t: 'Trade planning', s: 'ENTRY · SL · TP · RR · SIZE', c: C.amber, k: 4 }, { t: 'Execution & management', s: 'FOLLOW THE RULES', c: C.text, k: 5 }, { t: 'Journal & evaluation', s: 'FEEDBACK LOOP', c: C.pink, k: 5, d: 3 }],
        note: { t: 'Style selection sets timeframes & holding period · entry, stop and target must match the chosen plan.', k: 5, d: 5 }
      }),
      L.bullets({
        label: 'PRE-MARKET CHECKLIST', kicker: 'CHECKLIST 1', title: 'Pre-market checklist', check: true, size: 27,
        cues: ['Senarai semak pra-pasaran.',
          'Kalendar dan sesi disemak. Konteks timeframe tinggi dan bias ditulis, bersama syarat pembatalan.',
          'Liquidity utama, PDH dan PDL ditanda. POI dipilih, paling banyak dua atau tiga.',
          'Peristiwa berjadual disemak. Senario utama dan alternatif ditulis.',
          'Had risiko harian, dan bilangan dagangan maksimum, ditetapkan sebelum sesi.'],
        items: [{ t: 'Calendar & session checked', k: 1 }, { t: 'HTF context & bias + invalidation written', k: 1, d: 2 }, { t: 'Major liquidity, PDH / PDL marked', k: 2 }, { t: '2–3 POIs selected', k: 2, d: 2 }, { t: 'Scheduled events checked', k: 3 }, { t: 'Primary & alternative scenario written', k: 3, d: 2 }, { t: 'Daily RM risk limit & max trades set', k: 4 }]
      }),
      L.bullets({
        label: 'EXECUTION CHECKLIST', kicker: 'CHECKLIST 2', title: 'Execution checklist — before every order', check: true, size: 27,
        cues: ['Senarai semak pelaksanaan, sebelum setiap order.',
          'Sembilan soalan pengesahan CMI dijawab ya. Pelan dagangan ditulis: entry, stop-loss, sasaran.',
          'RR dikira selepas kos. Saiz posisi dikira dan dibundarkan ke bawah.',
          'Jenis order dipilih, dan stop-loss dihantar bersama order.',
          'Tangkapan skrin sebelum entry disimpan. Dan anda masih dalam had risiko harian.'],
        items: [{ t: 'All 9 confirmation questions answered "yes"', k: 1 }, { t: 'Entry · stop · target written', k: 1, d: 3 }, { t: 'RR calculated after costs', k: 2 }, { t: 'Size calculated and rounded down', k: 2, d: 2 }, { t: 'Order type chosen · stop sent with the order', k: 3 }, { t: 'Pre-entry screenshot saved', k: 4 }, { t: 'Still inside the daily risk limit', k: 4, d: 2 }]
      }),
      L.cards({
        label: 'RISK MANAGEMENT RULES', kicker: 'CHECKLIST 3', title: 'Risk management rules', cols: 3, h: 200,
        cues: ['Peraturan pengurusan risiko yang tidak boleh dirunding.',
          'Risiko tetap setiap dagangan, dalam ringgit. Had kerugian harian. Bilangan dagangan maksimum.',
          'Jangan lebarkan stop-loss. Jangan tambah posisi yang sedang rugi.',
          'Jangan tambah saiz selepas kerugian. Saiz dikira daripada stop, bukan daripada margin.'],
        cards: [{ n: '01', t: 'Fixed RM risk per trade', c: C.amber, k: 1 }, { n: '02', t: 'Daily loss limit', c: C.amber, k: 1, d: 2 }, { n: '03', t: 'Maximum number of trades', c: C.amber, k: 1, d: 3.5 }, { n: '04', t: 'Never widen a stop', c: C.bear, k: 2 }, { n: '05', t: 'Never add to a loser', c: C.bear, k: 2, d: 2 }, { n: '06', t: 'No size-up after losses · size from the stop, not margin', c: C.bear, k: 3 }]
      }),
      L.cards({
        label: '§8 · JOURNAL FIELDS', kicker: 'TRADING JOURNAL', title: 'Required journal fields', cols: 6, h: 120, tfs: 20,
        cues: ['Jurnal dagangan CMI mengandungi dua puluh dua medan.',
          'Tarikh, pasaran dan kontrak, gaya trading, sesi, bias HTF, POI yang dipilih, dan rujukan liquidity.',
          'Pengesahan entry, harga entry, stop-loss, take-profit, saiz posisi, dan RR yang dirancang.',
          'P&L yang direalisasikan, kos dagangan, serta MFE dan MAE jika ada, iaitu pergerakan paling menguntungkan dan paling merugikan semasa dagangan terbuka.',
          'Tangkapan skrin sebelum entry dan selepas exit, kualiti pelaksanaan, pematuhan peraturan, dan pengajaran.'],
        cards: ['Date', 'Market & contract', 'Trading style', 'Session', 'HTF bias', 'Selected POI', 'Liquidity reference', 'Entry confirmation', 'Entry price', 'Stop-loss', 'Take-profit', 'Position size', 'Planned RR', 'Realised P&L', 'Trading costs', 'MFE', 'MAE', 'Screenshot · before', 'Screenshot · after', 'Execution quality', 'Rule adherence', 'Lessons learned'].map((t, i) => ({ t, c: i < 7 ? C.blue : i < 13 ? C.amber : i < 17 ? C.liq : C.green, k: i < 7 ? 1 : i < 13 ? 2 : i < 17 ? 3 : 4, d: (i % 6) * .4 }))
      }),
      L.cards({
        label: '§8 · PERFORMANCE METRICS', kicker: 'PERFORMANCE REVIEW', title: 'Performance evaluation', cols: 4, h: 140, tfs: 23,
        cues: ['Penilaian prestasi menggunakan dua belas metrik.',
          'Win rate, purata kemenangan, purata kerugian dan expectancy.',
          'Profit factor, maximum drawdown, purata RR, dan bilangan dagangan.',
          'Kerugian berturut-turut, dan kos dagangan.',
          'Prestasi mengikut gaya trading, dan mengikut keadaan pasaran. Ini menunjukkan di mana SOP berfungsi dan di mana ia lemah.'],
        cards: [{ t: 'Win rate', c: C.amber, k: 1 }, { t: 'Average win', c: C.amber, k: 1, d: .8 }, { t: 'Average loss', c: C.amber, k: 1, d: 1.6 }, { t: 'Expectancy', c: C.amber, k: 1, d: 2.4 }, { t: 'Profit factor', c: C.liq, k: 2 }, { t: 'Maximum drawdown', c: C.bear, k: 2, d: 1.2 },
        { t: 'Average RR', c: C.liq, k: 2, d: 2.4 }, { t: 'Number of trades', c: C.liq, k: 2, d: 3.4 }, { t: 'Consecutive losses', c: C.bear, k: 3 }, { t: 'Trading costs', c: C.bear, k: 3, d: 1.2 }, { t: 'By trading style', c: C.green, k: 4 }, { t: 'By market condition', c: C.green, k: 4, d: 1.5 }]
      }),
      L.cards({
        label: '§8 · FOUR QUALITIES', kicker: 'PERFORMANCE REVIEW', title: 'Separate four qualities', cols: 4, h: 260,
        cues: ['Apabila menilai, asingkan empat kualiti.',
          'Kualiti strategi: adakah peraturan itu sendiri mempunyai expectancy positif selepas kos?',
          'Kualiti pelaksanaan: adakah peraturan diikuti dengan tepat?',
          'Kualiti pengurusan risiko: adakah saiz, stop dan had harian dipatuhi?',
          'Disiplin psikologi: adakah keputusan dibuat mengikut pelan, atau oleh emosi?',
          'Satu dagangan yang menang atau kalah tidak cukup untuk menentukan sama ada strategi berkesan.'],
        cards: [{ n: '01', t: 'Strategy quality', b: 'Do the rules have positive expectancy after costs?', c: C.blue, k: 1 }, { n: '02', t: 'Execution quality', b: 'Were the rules followed exactly?', c: C.amber, k: 2 }, { n: '03', t: 'Risk management quality', b: 'Size, stops and daily limits respected?', c: C.bear, k: 3 }, { n: '04', t: 'Psychological discipline', b: 'Plan-driven or emotion-driven decisions?', c: C.green, k: 4 }],
        note: { t: 'A single winning or losing trade cannot tell you whether a strategy works.', k: 5, y: 500 }
      }),
      L.cards({
        label: '§8 · PROCESS vs OUTCOME', kicker: 'PERFORMANCE REVIEW', title: 'Process vs outcome', cols: 2, h: 230,
        cues: ['Matriks proses dan hasil.',
          'Proses baik, hasil baik: kejayaan yang wajar. Proses baik, hasil buruk: kerugian normal. Teruskan.',
          'Proses buruk, hasil baik: nasib. Ini paling berbahaya, kerana ia mengukuhkan tabiat yang salah.',
          'Proses buruk, hasil buruk: kerugian yang wajar. Baiki proses.'],
        cards: [{ n: 'GOOD PROCESS · GOOD OUTCOME', t: 'Deserved result', b: 'Keep doing it.', c: C.bull, k: 1 }, { n: 'GOOD PROCESS · BAD OUTCOME', t: 'Normal loss', b: 'Record it · keep going.', c: C.amber, k: 1, d: 3 }, { n: 'BAD PROCESS · GOOD OUTCOME', t: 'Luck — most dangerous', b: 'Reinforces wrong habits.', c: C.bear, k: 2 }, { n: 'BAD PROCESS · BAD OUTCOME', t: 'Deserved loss', b: 'Fix the process.', c: C.bear, k: 3 }]
      }),
      L.flow({
        label: '§8 · TESTING BEFORE CLAIMS', kicker: 'TESTING', title: 'Test before you trust', per: 5, bh: 140, y0: 230,
        cues: ['Sebelum membuat sebarang dakwaan tentang prestasi strategi, uji dengan peraturan yang telah ditetapkan.',
          'Mula dengan backtest: setup sejarah dengan candle masa depan disembunyikan, menggunakan peraturan yang sama.',
          'Kemudian forward test secara demo atau saiz kecil, dalam masa nyata.',
          'Semak metrik dan jurnal. Perhalusi peraturan, satu perubahan pada satu masa, dan ulang proses ujian.',
          'Kumpul sampel yang bermakna. Jangan menyimpulkan apa-apa daripada beberapa dagangan.'],
        steps: [{ t: 'Write the rules', s: 'SOP v1', c: C.amber, k: 0, d: 2 }, { t: 'Backtest', s: 'HIDE FUTURE CANDLES', c: C.blue, k: 1 }, { t: 'Forward test', s: 'DEMO · SMALL SIZE', c: C.liq, k: 2 }, { t: 'Review metrics', s: 'JOURNAL', c: C.pink, k: 3 }, { t: 'Refine', s: 'ONE CHANGE AT A TIME', c: C.green, k: 3, d: 3 }],
        note: { t: 'Collect a meaningful sample before drawing any conclusion.', k: 4, y: 470 }
      }),
      L.cards({
        label: 'FINAL LEVEL 9 ASSESSMENT', kicker: 'FINAL ASSESSMENT', title: 'Level 9 final assessment', cols: 3, h: 300,
        cues: ['Penilaian akhir Level 9 mempunyai tiga bahagian.',
          'Bahagian satu: jawab lapan belas soalan Level 9, yang terdapat dalam buku kerja.',
          'Bahagian dua: serahkan satu SOP lengkap untuk gaya pilihan anda, termasuk senarai semak dan peraturan risiko.',
          'Bahagian tiga: forward test SOP itu dan serahkan dua puluh entri jurnal, termasuk dagangan yang kalah dan setup yang dilangkau, bersama semakan empat kualiti.'],
        cards: [{ n: 'PART 1', t: '18 knowledge questions', b: 'All Level 9 subtopics. Model answers in the workbook.', c: C.amber, k: 1 }, { n: 'PART 2', t: 'One complete SOP', b: 'Your chosen style: timeframes, rules, checklists, risk limits, management.', c: C.liq, k: 2 }, { n: 'PART 3', t: '20 forward-test journal entries', b: 'Including losses and skipped setups, plus a four-quality review.', c: C.green, k: 3 }]
      }),
      L.summary({
        title: 'Level 9 — what to remember', size: 27, points: [
          { t: 'Scalping, intraday and swing need different SOPs', s: 'Scalping, intraday dan swing memerlukan SOP yang berbeza.' },
          { t: 'A POI is not an entry · confirmation does not guarantee success', s: 'POI bukan entry, dan pengesahan tidak menjamin kejayaan.' },
          { t: 'Stops from predefined invalidation · targets with a market reference', s: 'Stop-loss daripada invalidation yang ditetapkan, dan sasaran dengan rujukan pasaran.' },
          { t: 'RR before entry · size from RM risk · margin is not risk', s: 'RR dikira sebelum entry, saiz dikira daripada risiko ringgit, dan margin bukan risiko.' },
          { t: 'Evaluate over a meaningful sample — with a journal', s: 'Nilai prestasi merentasi sampel yang bermakna, menggunakan jurnal.' }]
      }),
      L.exercise({
        title: 'Exercise 10 — Complete a trading journal', steps: [
          { t: 'Journal the EP01 trade', b: 'Fill all 22 fields for the Video 01 FCPO example (entry 4,500 · SL 4,490 · TP 4,520).', s: 'Isi kesemua dua puluh dua medan jurnal untuk contoh FCPO dalam Video 1: entry 4,500, stop 4,490, sasaran 4,520.' },
          { t: 'Check yourself', b: 'MFE +21 pts · MAE −1 pt · planned RR 2.0 · gross +RM500 · rules followed.', s: 'Semak jawapan anda: MFE tambah 21 mata, MAE tolak satu mata, RR dirancang 2, dan hasil kasar tambah 500 ringgit.' }]
      }),
      L.statement({
        label: 'CLOSING', kicker: 'LEVEL 9 · CLOSING', text: 'Not just finding setups —<br><span style="color:#e8b44c">building SOPs you can test,<br>record and evaluate.</span>', fs: 58,
        cues: ['Matlamat Level 9 bukan sekadar mengenal pasti setup SMC.', 'Matlamatnya ialah membina SOP trading yang boleh diuji, direkodkan, dan dinilai prestasinya.', 'Terima kasih kerana mengikuti Level 9: SMC Trading Strategy, Capital Market Institute.']
      }),
      L.refs({ items: [L.REF.kd, L.REF.harris, L.REF.murphy, L.REF.pring, L.REF.bursa, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Untuk tujuan pendidikan sahaja.', next: 'CMI · SMC Level 9 — SMC Trading Strategy · Complete' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
