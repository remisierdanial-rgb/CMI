/* CMI SMC Level 9 — VIDEO 10: Stop Loss & Take Profit (Subtopic 5 · A–I) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep10', video: 'VIDEO 10', title: 'Stop Loss & Take Profit',
    scenes: [
      L.title({
        kicker: 'VIDEO 10 · LEVEL 9 · SUBTOPIC 5 · STOP LOSS & TAKE PROFIT', title: 'Stop Loss &<br>Take Profit', sub: 'Invalidation · Buffer · Liquidity targets · Management',
        cues: ['Selamat datang ke Video 10, subtopik kelima: Stop Loss dan Take Profit.',
          'Stop-loss menentukan bila tesis kita salah. Take-profit menentukan ke mana kita jangka harga mungkin pergi.',
          'Kita akan belajar stop-loss struktur, buffer dan invalidation.',
          'Kemudian sasaran berasaskan liquidity, enam kaedah take-profit, dan dua animasi pengurusan dagangan: satu menang, satu kalah.'],
        obj: [{ t: 'Place stops at structural invalidation', k: 2 }, { t: 'Size buffers and include them in sizing', k: 2, d: 2 }, { t: 'Select liquidity-based targets', k: 3 }, { t: 'Compare six take-profit methods', k: 3, d: 3 }]
      }),
      L.bullets({
        label: '5A · UNDERSTANDING STOP-LOSS', kicker: 'STOP LOSS · 5A', title: 'What a stop-loss is — and is not',
        cues: ['Apakah stop-loss? Stop-loss ialah order untuk menutup posisi apabila harga mencapai aras yang membatalkan tesis dagangan.',
          'Ia perlu kerana tanpa stop, satu kerugian boleh menjadi terlalu besar untuk akaun.',
          'Stop-loss bukan margin. Margin ialah deposit jaminan. Stop-loss menentukan kerugian yang dirancang.',
          'Jarak stop dalam mata tidak sama dengan risiko dalam ringgit. Risiko ialah jarak darab 25 ringgit darab bilangan kontrak.',
          'Stop-loss mesti mencerminkan invalidation, bukan nombor arbitrari seperti sepuluh mata untuk semua setup.',
          'Dan tiada penempatan stop yang boleh menjamin perlindungan daripada gap atau slippage.'],
        items: [{ t: 'Closes the position when the thesis is invalid', c: C.bear, k: 0, d: 2 }, { t: 'Necessary: limits a single loss', c: C.green, k: 1 }, { t: 'Stop-loss ≠ margin requirement', c: C.amber, k: 2 }, { t: 'Stop distance (pts) ≠ monetary risk (RM)', c: C.amber, k: 3 }, { t: 'Reflects invalidation — not an arbitrary number', c: C.liq, k: 4 }],
        side: { k: 5, kicker: 'LIMIT', kc: '#ef5350', title: 'No stop placement guarantees protection against gaps or slippage' }
      }),
      L.calc({
        label: '5A · STOP ORDER ≠ GUARANTEED PRICE', kicker: 'STOP LOSS · 5A', title: 'Planned stop vs actual fill', ptitle: 'HYPOTHETICAL · LONG 1 CONTRACT @ 4,500 · STOP 4,490 · GROSS', lh: 64,
        cues: ['Lihat perbezaan antara stop yang dirancang dan harga isian sebenar.',
          { t: 'Pelan: stop pada 4,490, iaitu kerugian 10 mata, atau RM250.', say: 'Pelan: stop pada 4,490, iaitu kerugian 10 mata, atau 250 ringgit.' },
          { t: 'Dalam pasaran yang pantas, order stop mungkin terisi pada 4,486. Slippage 4 mata menjadikan kerugian RM350.', say: 'Dalam pasaran yang pantas, order stop mungkin terisi pada 4,486. Slippage 4 mata menjadikan kerugian 350 ringgit.' },
          { t: 'Jika harga dibuka dengan gap pada 4,478, kerugian menjadi 22 mata, iaitu RM550.', say: 'Jika harga dibuka dengan gap pada 4,478, kerugian menjadi 22 mata, iaitu 550 ringgit.' },
          'Oleh itu, saiz posisi perlu meninggalkan ruang untuk keadaan pelaksanaan yang realistik.'],
        lines: [{ t: 'Planned   stop 4,490 → 10 pts → <span class="em">RM250</span>', k: 1 }, { t: 'Slippage  fill 4,486 → 14 pts → <span style="color:#ef5350">RM350</span>', k: 2 }, { t: 'Gap open  fill 4,478 → 22 pts → <span style="color:#ef5350">RM550</span>', k: 3 }],
        note: { t: 'A stop-loss order is not a guaranteed execution price.', k: 4 }
      }),
      L.cards({
        label: '5B · STRUCTURAL STOP-LOSS', kicker: 'STOP LOSS · 5B', title: 'Structural stop-loss approaches', cols: 3, h: 210,
        cues: ['Stop-loss struktur. Lima pendekatan.',
          'Untuk setup bullish, di bawah swing low yang relevan. Untuk setup bearish, di atas swing high yang relevan.',
          'Di luar sempadan invalidation POI yang dipilih.',
          'Di luar ekstrem liquidity sweep yang bermakna, seperti dalam semua contoh kita.',
          'Atau di luar aras struktur yang diperlukan oleh model trading anda.',
          'Penempatan stop bergantung pada setup. Jangan gunakan lokasi stop yang sama untuk setiap setup.'],
        cards: [{ n: '01', t: 'Below a relevant swing low', b: 'Bullish setups.', c: C.bull, k: 1 }, { n: '02', t: 'Above a relevant swing high', b: 'Bearish setups.', c: C.bear, k: 1, d: 2.5 }, { n: '03', t: 'Beyond the POI boundary', b: 'Zone fails = idea fails.', c: C.poi, k: 2 },
        { n: '04', t: 'Beyond the sweep extreme', b: 'Used in the CMI examples.', c: C.liq, k: 3 }, { n: '05', t: 'Beyond the model\'s structural level', b: 'As your SOP defines.', c: C.amber, k: 4 }],
        note: { t: 'Stop placement depends on the setup — never one location for every trade.', k: 5, y: 660 }
      }),
      L.calc({
        label: '5C · STOP-LOSS BUFFER', kicker: 'STOP LOSS · 5C', title: 'Buffer: enough, not arbitrary', ptitle: 'HYPOTHETICAL · LONG @ 4,500 · SWEEP LOW 4,491 · BUDGET RM500 · GROSS', lh: 62, fs: 26,
        cues: ['Buffer ialah jarak tambahan di luar aras struktur.',
          'Pedagang menggunakan buffer kerana volatiliti, saiz tick, spread, slippage dan keadaan pelaksanaan.',
          { t: 'Dengan buffer satu mata di bawah low sweep 4,491, stop pada 4,490. Risiko 10 mata, RM250, jadi dua kontrak.', say: 'Dengan buffer satu mata di bawah low sweep 4,491, stop pada 4,490. Risiko 10 mata, 250 ringgit, jadi dua kontrak.' },
          { t: 'Dengan buffer arbitrari 10 mata, stop pada 4,481. Risiko 19 mata, RM475, jadi hanya satu kontrak.', say: 'Dengan buffer arbitrari 10 mata, stop pada 4,481. Risiko 19 mata, 475 ringgit, jadi hanya satu kontrak.' },
          'Buffer yang besar tidak semestinya lebih selamat. Ia mengurangkan saiz posisi dan RR. Apa pun saiznya, buffer mesti dimasukkan dalam pengiraan saiz posisi.'],
        lines: [{ t: 'Why: volatility · tick size · spread · slippage · execution', k: 1 }, { t: 'Buffer 1 pt  → SL 4,490 → 10 pts → RM250 → <span style="color:#26a69a">2 contracts</span>', k: 2 }, { t: 'Buffer 10 pt → SL 4,481 → 19 pts → RM475 → <span class="em">1 contract</span>', k: 3 }],
        side: { k: 4, kicker: 'RULE', title: 'Buffer is part of the risk', items: [{ t: 'Larger ≠ safer', c: C.bear, k: 4 }, { t: 'Include it in position sizing', c: C.green, k: 4, d: 3 }] }
      }),
      L.schem({
        label: '5D · INVALIDATION', kicker: 'STOP LOSS · 5D', title: 'Temporary wick vs meaningful break',
        cues: ['Invalidation: apakah yang membatalkan tesis asal?',
          'Di kiri, wick sementara menembusi aras, tetapi harga ditutup semula dan diterima di atasnya. Bagi sesetengah model, ini belum membatalkan tesis.',
          'Di kanan, harga ditutup dan diterima di bawah zon. Struktur yang menyokong tesis telah dipecahkan.',
          'Invalidation timeframe tinggi dan rendah juga berbeza. Kriteria invalidation mesti ditetapkan sebelum entry.'],
        panels: [
          { k: 1, title: 'TEMPORARY WICK', pts: [[0, .6], [.15, .45], [.28, .5], [.4, .36], [.47, .14], [.54, .4], [.66, .5], [.8, .48], [1, .7]], zones: [{ x1: .2, x2: 1, y1: .25, y2: .38, c: C.poi, label: 'POI', k: 1, d: .5 }], labels: [{ i: 4, t: 'WICK', c: C.liq, pos: 'below', k: 1, d: 1.8 }], cap: 'Closes back inside → not yet invalid (model-dependent)', capk: 1, capd: 3 },
          { k: 2, title: 'ACCEPTANCE BEYOND THE ZONE', color: C.bear, pts: [[0, .6], [.15, .45], [.28, .5], [.4, .36], [.5, .18], [.58, .22], [.7, .1], [.82, .14], [1, .05]], zones: [{ x1: .2, x2: 1, y1: .25, y2: .38, c: C.poi, label: 'POI', k: 2, d: .5 }], labels: [{ i: 6, t: 'ACCEPTED BELOW', c: C.bear, pos: 'below', k: 2, d: 1.8 }], cap: 'Structure broken → thesis invalid → exit', capk: 2, capd: 3, capc: '#ef5350' }
        ]
      }),
      L.statement({
        label: '5D · NEVER WIDEN THE STOP', kicker: 'STOP LOSS · 5D', text: 'Never move a stop further away<br><span style="color:#e8b44c">to avoid taking a loss.</span>', fs: 56,
        cues: ['Satu peraturan yang tidak boleh dilanggar: jangan alihkan stop-loss lebih jauh semata-mata untuk mengelak daripada mengambil kerugian.',
          { t: 'Mengalihkan stop dari 4,490 ke 4,470 menukar risiko daripada 10 mata kepada 30 mata, iaitu tiga kali ganda, daripada RM250 kepada RM750 setiap kontrak.', say: 'Mengalihkan stop dari 4,490 ke 4,470 menukar risiko daripada 10 mata kepada 30 mata, iaitu tiga kali ganda, daripada 250 ringgit kepada 750 ringgit setiap kontrak.' },
          'Stop yang dilebarkan bukan pengurusan risiko. Ia ialah pelan baharu yang dibuat oleh emosi.'],
        subs: [{ t: '4,490 → 4,470: risk 10 → 30 pts · RM250 → RM750 per contract (3×)', k: 1 }, { t: 'A widened stop is a new plan made by emotion.', k: 2 }]
      }),
      L.bullets({
        label: '5E · UNDERSTANDING TAKE-PROFIT', kicker: 'TAKE PROFIT · 5E', title: 'Targets need a market reference',
        cues: ['Sekarang take-profit. Take-profit ialah aras di mana posisi ditutup dengan keuntungan.',
          'Sasaran mesti ditetapkan sebelum entry, supaya risk-to-reward boleh dikira dan keputusan tidak dibuat oleh emosi.',
          'Sasaran tetap menggunakan jarak tertentu, contohnya 2R. Sasaran berasaskan struktur atau liquidity menggunakan aras pasaran yang logik.',
          'Dalam SOP CMI, setiap sasaran mesti mempunyai rujukan pasaran yang boleh dijelaskan.'],
        items: [{ t: 'The planned profit exit', c: C.bull, k: 0, d: 2 }, { t: 'Defined before entry → RR can be calculated', c: C.amber, k: 1 }, { t: 'Fixed target (e.g. 2R) vs structure / liquidity target', c: C.liq, k: 2 }, { t: 'Every CMI target needs a logical market reference', c: C.green, k: 3 }]
      }),
      L.cards({
        label: '5F · LIQUIDITY-BASED TARGETS', kicker: 'TAKE PROFIT · 5F', title: 'Liquidity-based target references', cols: 4, h: 130, tfs: 23,
        cues: ['Rujukan sasaran berasaskan liquidity.',
          'Buy-Side dan Sell-Side Liquidity. Equal Highs dan Equal Lows.',
          'Previous Day High dan Low. Previous Week High dan Low.',
          'Swing high dan swing low utama.',
          'Liquidity bertentangan, dan aras struktur timeframe tinggi yang relevan.',
          'Ingat, aras liquidity ialah objektif yang berpotensi, bukan destinasi harga yang terjamin.'],
        cards: [{ t: 'BSL', c: C.liq, k: 1 }, { t: 'SSL', c: C.liq, k: 1, d: .8 }, { t: 'EQH', c: C.liq, k: 1, d: 1.8 }, { t: 'EQL', c: C.liq, k: 1, d: 2.6 }, { t: 'Previous Day High', c: C.amber, k: 2 }, { t: 'Previous Day Low', c: C.amber, k: 2, d: 1 },
        { t: 'Previous Week High', c: C.amber, k: 2, d: 2 }, { t: 'Previous Week Low', c: C.amber, k: 2, d: 3 }, { t: 'Major swing highs', c: C.poi, k: 3 }, { t: 'Major swing lows', c: C.poi, k: 3, d: 1 }, { t: 'Opposing liquidity', c: C.green, k: 4 }, { t: 'Relevant HTF structure', c: C.green, k: 4, d: 1.5 }],
        note: { t: 'Liquidity levels are potential objectives — not guaranteed destinations.', k: 5, y: 640 }
      }),
      L.schem({
        label: '5F · BULLISH & BEARISH TARGETS', kicker: 'TAKE PROFIT · 5F', title: 'Selecting targets — bullish and bearish',
        cues: ['Pemilihan sasaran untuk setup bullish dan bearish.',
          'Untuk long, sasaran pertama ialah liquidity bertentangan yang terdekat, contohnya Equal Highs. Sasaran kedua mungkin PDH.',
          'Untuk short, sasaran ialah Sell-Side Liquidity di bawah, contohnya Equal Lows, kemudian PDL.',
          'Periksa juga halangan: jika ada liquidity bertentangan yang sangat dekat dengan entry, ruang ganjaran mungkin tidak mencukupi.'],
        panels: [
          { k: 1, title: 'LONG · TARGETS ABOVE', pts: [[0, .4], [.15, .2], [.25, .3], [.35, .12], [.45, .45], [.55, .38], [.7, .62], [.85, .7], [1, .82]], lines: [{ x1: .2, x2: 1, y: .72, c: C.liq, label: 'TP1 · EQH', k: 1, d: .6 }, { x1: 0, x2: 1, y: .92, c: C.amber, label: 'TP2 · PDH', k: 1, d: 1.6 }], cap: 'Nearest opposing liquidity first', capk: 1, capd: 2.5 },
          { k: 2, title: 'SHORT · TARGETS BELOW', color: C.bear, pts: [[0, .6], [.15, .8], [.25, .7], [.35, .88], [.45, .55], [.55, .62], [.7, .38], [.85, .3], [1, .18]], lines: [{ x1: .2, x2: 1, y: .28, c: C.liq, label: 'TP1 · EQL', k: 2, d: .6 }, { x1: 0, x2: 1, y: .08, c: C.amber, label: 'TP2 · PDL', k: 2, d: 1.6 }], cap: 'SSL below, then PDL', capk: 2, capd: 2.5 }
        ], note: { t: 'Check for nearby opposing liquidity before entry — it can cap the reward.', k: 3, y: 730 }
      }),
      L.table({
        label: '5G · SIX TAKE-PROFIT METHODS', kicker: 'TAKE PROFIT · 5G', title: 'Six take-profit methods',
        cues: ['Enam kaedah take-profit.',
          'Satu, sasaran tetap: mudah diuji, tetapi tidak mengikut struktur. Dua, sasaran liquidity: mempunyai rujukan pasaran, tetapi harga mungkin berbalik sebelum sampai.',
          'Tiga, partial: mengunci sebahagian keuntungan, tetapi mengurangkan RR yang direalisasikan.',
          'Empat, trailing stop: membiarkan pergerakan besar berjalan, tetapi boleh keluar terlalu awal ketika retracement.',
          'Lima, exit berasaskan struktur: keluar apabila struktur berlawanan muncul. Enam, exit berasaskan masa: keluar selepas tempoh tertentu atau pada akhir sesi.',
          'Setiap kaedah mengubah RR yang direalisasikan, dan sesuai untuk keadaan yang berbeza.'],
        cols: ['Method', 'Advantage', 'Disadvantage', 'Effect on realised RR'], colw: ['22%', '26%', '26%', '26%'], fs: 21, colColor: [null, '#26a69a', '#ef5350', '#e8b44c'],
        rows: [['1 · Fixed TP', 'Simple · testable', 'Ignores structure', '= planned RR when hit'], ['2 · Liquidity TP', 'Logical market reference', 'May reverse just before', 'Varies with level distance'], ['3 · Partial TP', 'Locks part of profit', 'Smaller full-size gain', 'Lowers realised RR'], ['4 · Trailing stop', 'Captures extended moves', 'Exits on retracements', 'Wide distribution'], ['5 · Structure exit', 'Responds to new information', 'Subjective if not defined', 'Often below planned RR'], ['6 · Time exit', 'Limits exposure time', 'Can exit before target', 'Often small win/loss']],
        rowK: [1, [1, 4], 2, 3, 4, [4, 3.5]], note: { t: 'Suitability: fixed/liquidity → clean structure · partial/trailing → trends · time → intraday & scalping rules.', k: 5, y: 700 }
      }),
      ...L.example({
        label: '5H · MANAGEMENT · TP1 → TP2', kicker: '5H · FULL MANAGEMENT EXAMPLE', dir: 1, E: 4500, R: 10, tail: 'tp2', tp1U: 4510, tpU: 4530, n: 2, entryTF: '5M', setupTF: '15M',
        context: ['HTF · potentially bullish'], tpName: 'iaitu liquidity bertentangan seterusnya, 3R',
        intro: 'Animasi pengurusan dagangan penuh. Kita gunakan dua kontrak supaya partial boleh ditunjukkan: entry, stop awal, TP1, partial, pelarasan stop, TP2 dan exit akhir.'
      }),
      ...L.example({
        label: '5H · STOP-LOSS FIRST', kicker: '5H · LOSING EXAMPLE', dir: -1, E: 4575, R: 12, tail: 'sl', n: 1, entryTF: '5M', setupTF: '15M',
        context: ['HTF · potentially bearish'],
        intro: 'Sekarang contoh di mana harga mencapai stop-loss sebelum sasaran. Setup bearish ini kelihatan sama baiknya dengan contoh sebelum ini.',
        outcomeExtra: ['Kerugian adalah sebahagian normal trading. Tujuan pengurusan risiko ialah mengawal pendedahan, bukan menghapuskan semua kerugian.']
      }),
      L.calc({
        label: '5I · FCPO SL & TP EXAMPLE', kicker: 'FCPO APPLICATION · 5I', title: 'FCPO stop-loss & take-profit example', ptitle: 'HYPOTHETICAL · 1 CONTRACT = 25 METRIC TONNES · VERIFY WITH BURSA', lh: 58, fs: 27,
        cues: ['Contoh FCPO hipotetikal. Long entry 4,500, stop-loss struktur 4,490, dan sasaran awal 4,520.',
          'Jarak stop 10 mata. Jarak sasaran 20 mata. Gross reward-to-risk ialah 2 berbanding 1.',
          { t: 'Untuk kontrak standard FCPO 25 tan metrik, satu mata bernilai RM25 setiap kontrak. Pergerakan 10 mata yang merugikan bernilai RM250, dan pergerakan 20 mata yang menguntungkan bernilai RM500.', say: 'Untuk kontrak standard FCPO 25 tan metrik, satu mata bernilai 25 ringgit setiap kontrak. Pergerakan 10 mata yang merugikan bernilai 250 ringgit, dan pergerakan 20 mata yang menguntungkan bernilai 500 ringgit.' },
          'Ini pengiraan pergerakan harga kasar, sebelum brokerage, yuran bursa, cukai jika berkaitan, slippage dan kos lain. Hasil sebenar mungkin berbeza disebabkan pelaksanaan.'],
        lines: [{ t: 'Long entry 4,500 · SL 4,490 · TP 4,520', k: 0, d: 1 }, { t: 'Stop distance   10 pts · Target distance 20 pts', k: 1 }, { t: 'Gross RR        20 ÷ 10 = <span class="em">2 : 1</span>', k: 1, d: 3 },
        { t: '1 pt = RM1/t × 25 t = RM25 per contract', k: 2 }, { t: '−10 pts = <span style="color:#ef5350">−RM250</span> · +20 pts = <span style="color:#26a69a">+RM500</span>', k: 2, d: 4 }],
        side: { k: 3, kicker: 'GROSS FIGURES', kc: '#f59e0b', title: 'Before costs', items: [{ t: 'Brokerage · exchange fees', c: C.amber, k: 3 }, { t: 'Taxes where applicable', c: C.amber, k: 3, d: 1 }, { t: 'Slippage & execution', c: C.amber, k: 3, d: 2 }] }
      }),
      L.kc({
        qs: [{ q: 'Why base the stop on predefined invalidation?', a: 'So the stop marks where the thesis is wrong, and size can be calculated before entry.', qs: 'Soalan satu: kenapa stop-loss perlu berasaskan invalidation yang ditetapkan lebih awal?', as: 'Jawapan: supaya stop menandakan di mana tesis salah, dan saiz posisi boleh dikira sebelum entry.' },
        { q: 'How can liquidity be used for targets?', a: 'Use opposing liquidity (EQH/EQL, PDH/PDL, PWH/PWL) as potential — not guaranteed — objectives.', qs: 'Soalan dua: bagaimana liquidity digunakan untuk sasaran?', as: 'Jawapan: gunakan liquidity bertentangan, seperti Equal Highs, Equal Lows, PDH atau PDL, sebagai objektif yang berpotensi, bukan terjamin.' },
        { q: 'Is a bigger buffer automatically safer?', a: 'No — it raises RM risk per contract, lowering size and RR; include it in sizing.', qs: 'Soalan tiga: adakah buffer yang lebih besar secara automatik lebih selamat?', as: 'Jawapan: tidak. Ia menambah risiko ringgit setiap kontrak, dan mengurangkan saiz serta RR. Masukkan buffer dalam pengiraan saiz.' }]
      }),
      L.summary({
        title: 'Video 10 — what to remember', points: [
          { t: 'Stop = predefined structural invalidation · never widen it', s: 'Stop-loss ialah invalidation struktur yang ditetapkan lebih awal. Jangan sekali-kali melebarkannya.' },
          { t: 'Buffers and slippage are part of the RM risk', s: 'Buffer dan slippage ialah sebahagian daripada risiko ringgit.' },
          { t: 'Targets need a market reference — liquidity is potential, not guaranteed', s: 'Sasaran memerlukan rujukan pasaran. Liquidity ialah objektif berpotensi, bukan terjamin.' },
          { t: 'Six TP methods · each changes realised RR · losses are normal', s: 'Enam kaedah take-profit, setiap satu mengubah RR yang direalisasikan. Kerugian adalah normal.' }]
      }),
      L.exercise({
        title: 'Exercises 5 & 6 — Stop and target', steps: [
          { t: 'Exercise 5 · Structural stop', b: 'Long from FVG 4,498–4,502, sweep low 4,491. Where is invalidation? Stop with a 1-pt buffer? RM risk?', s: 'Latihan lima: long dari FVG 4,498 hingga 4,502, low sweep 4,491. Di mana invalidation, di mana stop dengan buffer satu mata, dan berapa risikonya dalam ringgit?' },
          { t: 'Exercise 6 · Liquidity target', b: 'Long from 4,500 with EQH 4,520 and PDH 4,560. Choose TP1 and TP2 and justify each.', s: 'Latihan enam: long dari 4,500, dengan Equal Highs pada 4,520 dan PDH pada 4,560. Pilih TP1 dan TP2, dan beri justifikasi.' }],
        note: 'Answers: SL 4,490 · 10 pts · RM250 · TP1 4,520 (2:1) · TP2 4,560 if partials are in the plan — docs/06 · Exercises 5–6'
      }),
      L.upnext({ video: 'VIDEO 11', title: 'Risk-to-Reward & Position Sizing', items: ['RR, win rate, break-even and expectancy', 'Trading costs · position sizing', 'Margin vs risk · strategy evaluation'], say: 'Dalam Video 11, subtopik keenam: Risk-to-Reward, win rate, expectancy, kos, saiz posisi, dan perbezaan margin dengan risiko.' }),
      L.refs({ items: [L.REF.harris, L.REF.cme, L.REF.bursa, L.REF.kd, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 11.', next: 'Seterusnya: Video 11 — Risk-to-Reward & Position Sizing' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
