/* CMI SMC Level 9 — VIDEO 03: Scalping SOP · Entry & Management (Subtopic 1 · G–L) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep03', video: 'VIDEO 03', title: 'Scalping SOP · Entry & Management',
    scenes: [
      L.title({
        kicker: 'VIDEO 03 · LEVEL 9 · SUBTOPIC 1 · SCALPING SOP', title: 'Scalping SOP<br>Part 2 · Entry & Management', sub: '15-step SOP · Examples · Management · No-trade',
        cues: ['Selamat datang ke Video 3. Kita lengkapkan Scalping SOP.',
          'Dalam Video 2, kita telah menyediakan carta: konteks, liquidity dan POI.',
          'Hari ini kita bina prosedur entry lima belas langkah, dan aplikasikannya pada contoh bullish dan bearish FCPO.',
          'Kemudian kita bincangkan pengurusan dagangan, keadaan tidak trade, dan kesilapan biasa pedagang scalping.'],
        obj: [{ t: 'Apply the 15-step scalping entry SOP', k: 2 }, { t: 'Work a bullish and a bearish FCPO example', k: 2, d: 2.5 }, { t: 'Compare trade-management methods', k: 3 }, { t: 'Recognise no-trade conditions & common mistakes', k: 3, d: 2.5 }]
      }),
      L.sop({
        label: '1G · ENTRY SOP · 15 STEPS', kicker: 'SCALPING SOP · 1G', title: 'Complete scalping entry procedure', cols: 3, h: 98,
        cues: ['Inilah prosedur entry scalping CMI, lima belas langkah.',
          'Fasa konteks: satu, tetapkan konteks timeframe tinggi. Dua, kenal pasti liquidity intraday. Tiga, pilih POI yang sesuai.',
          'Fasa menunggu dan memerhati: empat, tunggu harga sampai ke lokasi. Lima, perhatikan interaksi liquidity. Enam, cari MSS atau change of character yang bermakna.',
          'Tujuh, nilai displacement. Lapan, kenal pasti execution zone yang sah, contohnya FVG.',
          'Fasa perancangan: sembilan, tetapkan harga atau syarat entry. Sepuluh, tetapkan stop-loss dan invalidation. Sebelas, kenal pasti sasaran. Dua belas, kira risk-to-reward.',
          'Langkah tiga belas paling penting: laksanakan hanya jika semua syarat yang ditetapkan dipenuhi.',
          'Empat belas, pantau dagangan mengikut peraturan pengurusan. Lima belas, rekod dagangan dalam jurnal, sama ada menang, kalah atau dilangkau.'],
        steps: [{ t: 'Establish higher-timeframe context', k: 1 }, { t: 'Identify relevant intraday liquidity', k: 1, d: 2.5, c: C.liq }, { t: 'Determine a suitable POI', k: 1, d: 4.5, c: C.poi }, { t: 'Wait for price to reach the location', k: 2 }, { t: 'Observe liquidity interaction', k: 2, d: 2.5, c: C.liq },
        { t: 'Look for a meaningful MSS / CHoCH', k: 2, d: 4.5 }, { t: 'Evaluate displacement', k: 3, c: C.blue }, { t: 'Identify a valid execution zone (FVG)', k: 3, d: 1.8, c: C.blue }, { t: 'Define entry price / condition', k: 4 }, { t: 'Define stop-loss & invalidation', k: 4, d: 2.5, c: C.bear },
        { t: 'Identify the target', k: 4, d: 4.5, c: C.bull }, { t: 'Calculate risk-to-reward', k: 4, d: 6 }, { t: 'Execute only if ALL conditions are met', k: 5, c: C.green, hl: true }, { t: 'Monitor per management rules', k: 6 }, { t: 'Record in the trading journal', k: 6, d: 3 }]
      }),
      ...L.example({
        label: '1H · BULLISH SCALP', kicker: '1H · BULLISH SCALPING EXAMPLE', dir: 1, E: 4386, R: 8, tail: 'tp', n: 1, entryTF: '5M', setupTF: '15M',
        context: ['1H / 30M · potentially bullish'],
        intro: 'Contoh scalping bullish. Konteks 1H dan 30M berpotensi bullish, jadi kita hanya mencari peluang beli di lokasi discount.'
      }),
      ...L.example({
        label: '1I · BEARISH SCALP', kicker: '1I · BEARISH SCALPING EXAMPLE', dir: -1, E: 4612, R: 10, tail: 'sl', n: 1, entryTF: '5M', setupTF: '15M',
        context: ['1H / 30M · potentially bearish'],
        intro: 'Sekarang contoh scalping bearish. Konteks 1H dan 30M berpotensi bearish, jadi kita mencari peluang jual di lokasi premium.'
      }),
      L.cards({
        label: '1J · TRADE MANAGEMENT', kicker: 'SCALPING SOP · 1J', title: 'Scalping trade management methods', cols: 4, h: 200,
        cues: ['Selepas entry, dagangan diurus mengikut peraturan yang ditetapkan sebelum entry.',
          'Fixed risk: risiko setiap dagangan ditetapkan dalam ringgit atau R, dan tidak diubah.',
          'Fixed target: keluar sepenuhnya di sasaran. Partial: tutup sebahagian di sasaran awal.',
          'Breakeven: alihkan stop-loss ke harga entry selepas harga bergerak sejauh tertentu. Trailing stop: alihkan stop mengikut struktur.',
          'Exit on invalidation: keluar jika struktur yang menyokong tesis dipecahkan. Time-based exit: keluar jika harga tidak bergerak dalam tempoh yang ditetapkan.',
          'Tiada kaedah yang sentiasa terbaik. Setiap kaedah mengubah taburan hasil dan perlu diuji.'],
        cards: [{ n: '01', t: 'Fixed risk', b: 'RM / R per trade fixed in advance.', c: C.amber, k: 1 }, { n: '02', t: 'Fixed target', b: 'Full exit at the planned target.', c: C.bull, k: 2 }, { n: '03', t: 'Partial profit', b: 'Close part at an earlier target.', c: C.bull, k: 2, d: 2.5 }, { n: '04', t: 'Breakeven', b: 'Stop to entry after a set move.', c: C.liq, k: 3 },
        { n: '05', t: 'Trailing stop', b: 'Stop follows 5M structure.', c: C.liq, k: 3, d: 3 }, { n: '06', t: 'Exit on invalidation', b: 'Supporting structure broken.', c: C.bear, k: 4 }, { n: '07', t: 'Time-based exit', b: 'No progress within the set time.', c: C.poi, k: 4, d: 3 }],
        note: { t: 'No management method is universally superior — test each one.', k: 5, y: 660 }
      }),
      L.calc({
        label: '1J · BREAKEVEN & PARTIALS', kicker: 'SCALPING SOP · 1J', title: 'How management changes the realised result', h: 500, ptitle: 'HYPOTHETICAL · ENTRY 4,500 · SL 4,490 · TP 4,520 · 2 CONTRACTS · GROSS', lh: 56, fs: 26,
        cues: ['Lihat bagaimana kaedah pengurusan mengubah hasil sebenar. Andaikan entry 4,500, stop-loss 4,490 dan sasaran 4,520, dengan dua kontrak.',
          { t: 'Pegang kedua-dua kontrak ke sasaran: 20 mata darab 2 kontrak darab RM25, iaitu RM1,000. Risiko awal RM500, jadi hasilnya 2R.', say: 'Pegang kedua-dua kontrak ke sasaran: 20 mata darab 2 kontrak darab 25 ringgit, iaitu 1,000 ringgit. Risiko awal 500 ringgit, jadi hasilnya 2R.' },
          { t: 'Partial: satu kontrak ditutup pada 4,510, dan satu lagi pada 4,520. Hasilnya RM750, iaitu 1.5R.', say: 'Partial: satu kontrak ditutup pada 4,510, dan satu lagi pada 4,520. Hasilnya 750 ringgit, iaitu 1.5R.' },
          'Breakeven: jika stop dialihkan ke 4,500 selepas harga sampai 4,510, kemudian harga kembali ke 4,500 sebelum naik ke sasaran, hasilnya kosong.',
          'Breakeven boleh mengurangkan kerugian, tetapi juga boleh mengeluarkan dagangan yang akhirnya menang. Partial mengunci keuntungan lebih awal, tetapi mengurangkan RR realised.'],
        lines: [{ t: 'Hold both to TP   20 × 2 × 25 = <span style="color:#26a69a">RM1,000</span> → <span class="em">2.0R</span>', k: 1 }, { t: 'Initial risk      10 × 2 × 25 = RM500', k: 1, d: 3 },
        { t: 'Partial  1c @4,510 +10 · 1c @4,520 +20', k: 2 }, { t: '                  30 × 25 = <span style="color:#26a69a">RM750</span> → <span class="em">1.5R</span>', k: 2, d: 3 },
        { t: 'Breakeven  stopped @4,500 → <span class="em">0R</span> (then TP hit)', k: 3, d: 3 }],
        side: { k: 4, kicker: 'TRADE-OFF', title: 'Protection vs potential', items: [{ t: 'BE reduces losses but can exit winners early', c: C.liq, k: 4 }, { t: 'Partials lower realised RR', c: C.amber, k: 4, d: 3 }, { t: 'Choose before entry · test over a sample', c: C.green, k: 4, d: 6 }] }
      }),
      L.cards({
        label: '1K · NO-TRADE CONDITIONS', kicker: 'SCALPING SOP · 1K', title: 'When not to scalp', cols: 4, h: 140, bad: true, tfs: 23,
        cues: ['Bila tidak perlu scalping? Senarai ini sama penting dengan syarat entry.',
          'Tiada struktur pasaran yang jelas. Tiada POI yang sesuai. Harga berada di tengah julat yang tidak jelas.',
          'Tiada interaksi liquidity yang bermakna. Tiada pengesahan.',
          'Spread atau slippage berlebihan. Volatiliti luar biasa, contohnya ketika peristiwa berjadual.',
          'Sasaran terlalu dekat, atau risk-to-reward lemah.',
          'Had risiko harian telah dicapai. Atau anda sendiri tidak bersedia dari segi emosi atau mental.'],
        cards: [{ t: 'No clear structure', k: 1 }, { t: 'No suitable POI', k: 1, d: 1.5 }, { t: 'Middle of an unclear range', k: 1, d: 3 }, { t: 'No liquidity interaction', k: 2 }, { t: 'No confirmation', k: 2, d: 2 }, { t: 'Excessive spread / slippage', k: 3 },
        { t: 'Unusual volatility', k: 3, d: 2.5 }, { t: 'Target too close', k: 4 }, { t: 'Poor risk-to-reward', k: 4, d: 1.5 }, { t: 'Daily risk limit reached', k: 5 }, { t: 'Not emotionally / mentally ready', k: 5, d: 2.5 }]
      }),
      L.schem({
        label: '1K · NO-TRADE EXAMPLE', kicker: 'SCALPING SOP · 1K', title: 'Middle of the range · skip',
        cues: ['Contoh keadaan tidak trade.', 'Harga bergerak naik turun di tengah julat. Tiada sweep yang jelas, tiada POI, dan sasaran di kedua-dua arah terlalu dekat.', 'Keputusan yang betul di sini ialah tidak trade, dan menunggu harga sampai ke lokasi yang dirancang.'],
        panels: [{ k: 1, title: 'FCPO · 5M · HYPOTHETICAL', color: C.text, pts: [[0, .5], [.08, .62], [.15, .44], [.23, .6], [.3, .42], [.38, .58], [.46, .45], [.54, .6], [.62, .43], [.7, .57], [.78, .46], [.86, .59], [1, .5]], lines: [{ x1: 0, x2: 1, y: .9, c: C.liq, label: 'BSL · far', k: 1, d: 1 }, { x1: 0, x2: 1, y: .1, c: C.liq, label: 'SSL · far', k: 1, d: 1.4 }, { x1: 0, x2: 1, y: .51, c: C.amber, label: 'EQUILIBRIUM', k: 1, d: 2 }] }],
        side: { k: 1, kicker: 'CHECKLIST', title: 'Decision: no trade', items: [{ t: 'No sweep', c: C.bear, k: 1, d: 2.5 }, { t: 'No POI at price', c: C.bear, k: 1, d: 3.5 }, { t: 'Targets too close', c: C.bear, k: 1, d: 4.5 }, { t: 'Wait for the planned location', c: C.green, k: 2 }] }
      }),
      L.cards({
        label: '1L · COMMON MISTAKES', kicker: 'SCALPING SOP · 1L', title: 'Ten common scalping mistakes', cols: 5, h: 200, bad: true, tfs: 23,
        cues: ['Sepuluh kesilapan scalping yang biasa.',
          'Overtrading. Masuk sebelum pengesahan. Mengejar harga.',
          'Menukar bias terlalu kerap. Mendagangkan setiap FVG.',
          'Mengabaikan kos transaksi. Menggunakan stop-loss yang terlalu ketat sehingga berada di dalam hingar.',
          'Mengalihkan stop-loss kerana emosi. Menambah saiz posisi selepas kerugian.',
          'Dan mengambil setup berkualiti rendah kerana bosan.'],
        cards: [{ t: 'Overtrading', k: 1 }, { t: 'Entering before confirmation', k: 1, d: 1 }, { t: 'Chasing price', k: 1, d: 2 }, { t: 'Changing bias too often', k: 2 }, { t: 'Trading every FVG', k: 2, d: 1.5 },
        { t: 'Ignoring costs', k: 3 }, { t: 'Stops too tight', k: 3, d: 1.5 }, { t: 'Moving the stop emotionally', k: 4 }, { t: 'Sizing up after a loss', k: 4, d: 2 }, { t: 'Trading out of boredom', k: 5 }]
      }),
      L.kc({
        qs: [{ q: 'POI vs entry confirmation?', a: 'POI = location. Confirmation = liquidity → MSS → displacement → execution zone at that location.', qs: 'Soalan satu: apakah beza antara POI dan entry confirmation?', as: 'Jawapan: POI ialah lokasi. Pengesahan ialah urutan liquidity, MSS, displacement dan execution zone yang berlaku di lokasi itu.' },
        { q: 'Why is a liquidity sweep alone insufficient?', a: 'A sweep can be followed by continuation; without MSS and displacement there is no reaction under the model.', qs: 'Soalan dua: kenapa liquidity sweep sahaja tidak mencukupi untuk entry?', as: 'Jawapan: sweep boleh diikuti oleh kesinambungan. Tanpa MSS dan displacement, tiada reaksi mengikut model.' },
        { q: 'Role of MSS in the entry process?', a: 'Shows a potential direction change on the entry timeframe after the liquidity interaction.', qs: 'Soalan tiga: apakah peranan MSS dalam proses entry?', as: 'Jawapan: ia menunjukkan potensi perubahan arah pada timeframe entry, selepas interaksi liquidity.' }]
      }),
      L.summary({
        title: 'Video 03 — what to remember', points: [
          { t: '15 steps: context → wait → confirm → plan → execute only if ALL conditions are met', s: 'Lima belas langkah: konteks, tunggu, pengesahan, perancangan, dan laksana hanya jika semua syarat dipenuhi.' },
          { t: 'Bullish and bearish setups follow the same logic, mirrored', s: 'Setup bullish dan bearish mengikut logik yang sama, secara bertentangan.' },
          { t: 'A planned loss is part of the SOP — record it', s: 'Kerugian yang dirancang ialah sebahagian daripada SOP. Rekodkannya.' },
          { t: 'Management choices change realised RR · no-trade is a decision', s: 'Pilihan pengurusan mengubah RR realised, dan tidak trade juga satu keputusan.' }]
      }),
      L.exercise({
        title: 'Exercise 1 — Build your Scalping SOP', steps: [
          { t: 'Write the SOP', b: 'Use the 15 steps. For each, write a yes/no rule (e.g. "5M body close beyond the last LH").', s: 'Tulis Scalping SOP anda menggunakan lima belas langkah. Bagi setiap langkah, tulis peraturan yang boleh dijawab ya atau tidak.' },
          { t: 'Add risk & management', b: 'Max risk per trade (RM), daily loss limit, max trades, management method, no-trade list.', s: 'Tambah risiko maksimum setiap dagangan, had kerugian harian, bilangan dagangan maksimum, kaedah pengurusan dan senarai tidak trade.' },
          { t: 'Test it', b: 'Apply it to 20 historical setups with candles hidden. Record every result.', s: 'Uji pada dua puluh setup sejarah dengan candle masa depan disembunyikan, dan rekod setiap hasil.' }],
        note: 'Worked solution & rubric: docs/06_KNOWLEDGE_CHECK_EXERCISES.md · Exercise 1'
      }),
      L.upnext({ video: 'VIDEO 04', title: 'Intraday SOP · Market Planning', items: ['Intraday vs scalping · holding period set by the plan', 'Daily / 4H bias · dealing range · Premium & Discount', 'Primary and alternative scenarios'], say: 'Dalam Video 4, kita beralih ke Intraday SOP: perancangan harian, bias Daily dan 4H, dealing range, serta senario utama dan alternatif.' }),
      L.refs({ items: [L.REF.bursa, L.REF.harris, L.REF.kd, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 4.', next: 'Seterusnya: Video 04 — Intraday SOP · Market Planning' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
