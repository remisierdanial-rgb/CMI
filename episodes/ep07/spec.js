/* CMI SMC Level 9 — VIDEO 07: Swing Trading SOP · Execution & Management (Subtopic 3 · F–K) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep07', video: 'VIDEO 07', title: 'Swing Trading SOP · Execution & Management',
    scenes: [
      L.title({
        kicker: 'VIDEO 07 · LEVEL 9 · SUBTOPIC 3 · SWING TRADING SOP', title: 'Swing Trading SOP<br>Part 2 · Execution', sub: '12-step SOP · Sizing · Cases · Management',
        cues: ['Selamat datang ke Video 7. Kita lengkapkan Swing Trading SOP.',
          'Hari ini kita bina prosedur entry swing dua belas langkah.',
          'Kita kira saiz posisi apabila stop-loss lebar, dan lihat kenapa kadang-kadang jawapannya ialah sifar kontrak.',
          'Kemudian kita jalankan kajian kes bullish dan bearish, dan bincangkan pengurusan posisi merentasi beberapa sesi.'],
        obj: [{ t: 'Apply the 12-step swing entry SOP', k: 1 }, { t: 'Size positions correctly with wide stops', k: 2 }, { t: 'Work bullish & bearish swing cases', k: 3 }, { t: 'Manage positions across sessions', k: 3, d: 3 }]
      }),
      L.sop({
        label: '3F · SWING ENTRY SOP', kicker: 'SWING SOP · 3F', title: 'Swing entry SOP · 12 steps', cols: 3, h: 120,
        cues: ['Prosedur entry swing, dua belas langkah.',
          'Satu, tetapkan konteks Weekly dan Daily. Dua, kenal pasti objektif liquidity utama. Tiga, pilih POI Daily atau 4H yang relevan.',
          'Empat, tunggu harga menghampiri lokasi. Lima, perhatikan reaksi harga. Enam, nilai struktur timeframe rendah.',
          'Tujuh, cari displacement yang bermakna. Lapan, kenal pasti execution area yang dipilih.',
          'Sembilan, tetapkan entry dan invalidation struktur. Sepuluh, kira saiz posisi dan risiko dalam ringgit.',
          'Sebelas, tetapkan sasaran awal. Dua belas, rancang cara posisi akan diurus merentasi beberapa sesi.'],
        steps: [{ t: 'Establish Weekly & Daily context', k: 1 }, { t: 'Identify major liquidity objectives', k: 1, d: 2, c: C.liq }, { t: 'Select a relevant Daily / 4H POI', k: 1, d: 4, c: C.poi }, { t: 'Wait for price to approach', k: 2 },
        { t: 'Observe the price reaction', k: 2, d: 2 }, { t: 'Evaluate lower-timeframe structure', k: 2, d: 3.5 }, { t: 'Look for meaningful displacement', k: 3, c: C.blue }, { t: 'Identify the execution area', k: 3, d: 2, c: C.blue },
        { t: 'Define entry & structural invalidation', k: 4, c: C.bear }, { t: 'Calculate position size & RM risk', k: 4, d: 2.5, c: C.amber, hl: true }, { t: 'Define the initial target', k: 5, c: C.bull }, { t: 'Plan multi-session management', k: 5, d: 2 }]
      }),
      L.calc({
        label: '3F · POSITION SIZING WITH WIDE STOPS', kicker: 'SWING SOP · 3F', title: 'Wide stop → fewer contracts, never more', ptitle: 'HYPOTHETICAL · ENTRY 4,200 · SL 4,120 · 1 pt = RM25 / contract · GROSS', h: 470, lh: 62, fs: 27,
        cues: ['Sebelum kajian kes, mari kira saiz posisi swing.',
          { t: 'Entry 4,200, stop-loss struktur 4,120. Jarak 80 mata, darab RM25, iaitu RM2,000 setiap kontrak.', say: 'Entry 4,200, stop-loss struktur 4,120. Jarak 80 mata, darab 25 ringgit, iaitu 2,000 ringgit setiap kontrak.' },
          { t: 'Jika bajet risiko ialah RM1,000, 1,000 bahagi 2,000 ialah setengah. Dibundarkan ke bawah, jawapannya sifar kontrak. Tiada dagangan.', say: 'Jika bajet risiko ialah 1,000 ringgit, 1,000 bahagi 2,000 ialah setengah. Dibundarkan ke bawah, jawapannya sifar kontrak. Tiada dagangan.' },
          { t: 'Jika bajet risiko ialah RM4,000, saiz posisi ialah dua kontrak.', say: 'Jika bajet risiko ialah 4,000 ringgit, saiz posisi ialah dua kontrak.' },
          'Jangan sekali-kali menambah saiz kerana stop lebar, dan jangan mengecilkan stop semata-mata supaya saiz menjadi lebih besar. Stop ditentukan oleh struktur.'],
        lines: [{ t: 'Risk / contract = 80 × 25 = <span style="color:#ef5350">RM2,000</span>', k: 1 }, { t: 'Budget RM1,000 → 1,000 ÷ 2,000 = 0.5 → <span class="em">0 contracts</span>', k: 2 }, { t: '                → <span style="color:#ef5350">NO TRADE</span>', k: 2, d: 4 },
        { t: 'Budget RM4,000 → 4,000 ÷ 2,000 = <span style="color:#26a69a">2 contracts</span>', k: 3 }],
        side: { k: 4, kicker: 'RULES', title: 'Structure sets the stop', items: [{ t: 'Round down · 0 = no trade', c: C.amber, k: 4 }, { t: 'Never size up because the stop is wide', c: C.bear, k: 4, d: 2 }, { t: 'Never tighten the stop to trade bigger', c: C.bear, k: 4, d: 4 }] }
      }),
      ...L.example({
        label: '3G · BULLISH SWING', kicker: '3G · BULLISH SWING CASE', dir: 1, E: 4200, R: 80, tail: 'tp2', tpU: 4530, n: 2, entryTF: '1H', setupTF: 'Daily / 4H',
        context: ['Weekly · bullish', 'Daily · pullback into discount', '4H · watching for confirmation'],
        tpName: 'iaitu liquidity bertentangan utama, 3R',
        intro: 'Kajian kes swing bullish. Weekly bullish, dan Daily sedang menarik balik ke kawasan discount. Sell-Side Liquidity berada di bawah low yang penting.',
        planExtra: ['Saiz dua kontrak dikira daripada bajet risiko 4,000 ringgit. Posisi ini mungkin dipegang beberapa hari, jadi risiko overnight dan event telah dinilai.']
      }),
      L.cards({
        label: '3I · SWING POSITION MANAGEMENT', kicker: 'SWING SOP · 3I', title: 'Swing position management', cols: 5, h: 190,
        cues: ['Pengurusan posisi swing.',
          'Stop-loss yang lebar memerlukan saiz posisi yang lebih kecil. Partial profit boleh diambil di sasaran liquidity yang pertama.',
          'Trailing stop boleh mengikut swing 4H atau Daily. Keputusan biasanya berdasarkan penutupan Daily, bukan wick intraday.',
          'Retracement semasa pegangan adalah normal, selagi struktur yang menyokong tesis masih utuh.',
          'Pegangan merentasi sesi bermaksud pendedahan kepada risiko overnight dan event. Dan jika tesis asal tidak lagi sah, posisi ditutup.'],
        cards: [{ n: '01', t: 'Wider stop considerations', c: C.amber, k: 1 }, { n: '02', t: 'Sizing for wider stops', c: C.amber, k: 1, d: 1.5 }, { n: '03', t: 'Partial profit-taking', c: C.bull, k: 1, d: 3 }, { n: '04', t: 'Trailing stop', c: C.liq, k: 2 }, { n: '05', t: 'Daily close vs intraday wick', c: C.liq, k: 2, d: 3 },
        { n: '06', t: 'Managing retracements', c: C.blue, k: 3 }, { n: '07', t: 'Holding across sessions', c: C.blue, k: 4 }, { n: '08', t: 'Overnight risk', c: C.bear, k: 4, d: 1.5 }, { n: '09', t: 'Event risk', c: C.bear, k: 4, d: 2.5 }, { n: '10', t: 'Exit when thesis invalid', c: C.bear, k: 4, d: 4.5 }]
      }),
      L.schem({
        label: '3I · DAILY CLOSE vs INTRADAY WICK', kicker: 'SWING SOP · 3I', title: 'Daily close vs intraday wick',
        cues: ['Satu keputusan penting dalam pengurusan swing: wick atau penutupan?',
          'Di kiri, harga menembusi aras invalidation secara intraday, tetapi ditutup semula di atasnya. Bagi pedagang yang menggunakan peraturan penutupan Daily, tesis masih sah.',
          'Di kanan, Daily ditutup dan diterima di bawah aras itu. Tesis tidak lagi sah, dan posisi ditutup.',
          'Peraturan mana yang digunakan mesti ditulis sebelum entry, dan stop-loss sebenar di pasaran masih diperlukan sebagai perlindungan maksimum.'],
        panels: [
          { k: 1, title: 'WICK BELOW · CLOSE ABOVE', pts: [[0, .6], [.15, .48], [.3, .55], [.42, .38], [.48, .15], [.55, .42], [.7, .55], [.85, .5], [1, .7]], lines: [{ x1: 0, x2: 1, y: .3, c: C.amber, label: 'INVALIDATION (DAILY CLOSE)', k: 1, d: .6 }], labels: [{ i: 4, t: 'WICK', c: C.liq, pos: 'below', k: 1, d: 1.8 }], cap: 'Close back above → thesis intact', capk: 1, capd: 3 },
          { k: 2, title: 'DAILY CLOSE BELOW', color: C.bear, pts: [[0, .6], [.15, .48], [.3, .55], [.42, .38], [.55, .2], [.62, .24], [.75, .12], [.88, .16], [1, .05]], lines: [{ x1: 0, x2: 1, y: .3, c: C.amber, label: 'INVALIDATION (DAILY CLOSE)', k: 2, d: .6 }], labels: [{ i: 4, t: 'CLOSE BELOW', c: C.bear, pos: 'below', k: 2, d: 1.8 }], cap: 'Accepted below → exit', capk: 2, capd: 3, capc: '#ef5350' }
        ], note: { t: 'Write the rule before entry. A hard stop in the market is still needed as the maximum-loss protection.', k: 3, y: 730 }
      }),
      ...L.example({
        label: '3H · BEARISH SWING', kicker: '3H · BEARISH SWING CASE', dir: -1, E: 4950, R: 60, tail: 'sl', tpU: 4530, n: 1, entryTF: '1H', setupTF: 'Daily / 4H',
        context: ['Weekly · bearish', 'Daily · retracement into premium', '4H · possible bearish shift'],
        tpName: 'iaitu liquidity bertentangan di bawah, 3R',
        intro: 'Kajian kes swing bearish. Weekly bearish, dan Daily menarik balik ke kawasan premium. Buy-Side Liquidity berada di atas high yang penting.',
        outcomeExtra: ['Dalam swing trading, kerugian satu R dalam ringgit lebih besar kerana stop lebih lebar. Itulah sebabnya saiz posisi dikira dahulu, bukan selepas entry.']
      }),
      L.cards({
        label: '3J · NO-TRADE CONDITIONS', kicker: 'SWING SOP · 3J', title: 'Swing no-trade conditions', cols: 4, h: 170, bad: true,
        cues: ['Bila tidak perlu membuat dagangan swing?',
          'Struktur timeframe tinggi tidak jelas. Harga tidak berada berhampiran POI yang relevan. Tiada sasaran liquidity yang menarik.',
          'Risk-to-reward lemah. Jarak stop menjadikan saiz posisi tidak sesuai.',
          'Risiko event tidak dinilai dengan secukupnya. Atau modal dan margin tidak mencukupi untuk pendedahan yang dirancang.'],
        cards: [{ t: 'Major HTF structure unclear', k: 1 }, { t: 'Price not near a relevant POI', k: 1, d: 2 }, { t: 'No attractive liquidity target', k: 1, d: 4 }, { t: 'Poor reward-to-risk', k: 2 },
        { t: 'Stop distance → unsuitable size', k: 2, d: 1.5 }, { t: 'Event risk not considered', k: 3 }, { t: 'Insufficient capital / margin', k: 3, d: 2.5 }]
      }),
      L.cards({
        label: '3K · COMMON MISTAKES', kicker: 'SWING SOP · 3K', title: 'Seven common swing mistakes', cols: 4, h: 170, bad: true,
        cues: ['Tujuh kesilapan swing trading yang biasa.',
          'Menggunakan jarak stop-loss scalping untuk posisi swing. Masuk tanpa analisis timeframe tinggi.',
          'Mengelirukan retracement Daily dengan reversal yang disahkan. Memegang posisi yang tesisnya sudah tidak sah.',
          'Menambah saiz posisi kerana stop lebar. Mengabaikan risiko overnight.',
          'Dan menganggap setiap Order Block timeframe tinggi sebagai titik perubahan yang terjamin.'],
        cards: [{ t: 'Scalping stops on swing positions', k: 1 }, { t: 'No higher-timeframe analysis', k: 1, d: 2.5 }, { t: 'Daily retracement = reversal?', k: 2 }, { t: 'Holding invalidated positions', k: 2, d: 2.5 },
        { t: 'Sizing up because the stop is wide', k: 3 }, { t: 'Ignoring overnight risk', k: 3, d: 2 }, { t: 'Every HTF OB = guaranteed turn', k: 4 }]
      }),
      L.kc({
        qs: [{ q: 'How does position size change when stop distance increases?', a: 'It falls in inverse proportion; round down — 0 contracts means no trade.', qs: 'Soalan satu: bagaimana saiz posisi berubah apabila jarak stop-loss bertambah?', as: 'Jawapan: ia berkurang secara songsang. Bundarkan ke bawah. Sifar kontrak bermakna tiada dagangan.' },
        { q: 'Why is margin not the same as maximum trading risk?', a: 'Margin is a deposit; risk = stop pts × RM25 × contracts (plus gaps/slippage).', qs: 'Soalan dua: kenapa margin tidak sama dengan risiko maksimum?', as: 'Jawapan: margin ialah deposit jaminan. Risiko ialah jarak stop darab 25 ringgit darab bilangan kontrak, ditambah risiko gap dan slippage.' },
        { q: 'Daily wick below invalidation, close above — exit?', a: 'Depends on the pre-written rule; with a Daily-close rule, the thesis is intact.', qs: 'Soalan tiga: wick Daily menembusi aras invalidation, tetapi ditutup di atasnya. Perlu keluar?', as: 'Jawapan: bergantung pada peraturan yang ditulis. Dengan peraturan penutupan Daily, tesis masih sah.' }]
      }),
      L.summary({
        title: 'Video 07 — what to remember', points: [
          { t: '12-step swing SOP · sizing is calculated before entry', s: 'SOP swing dua belas langkah. Saiz posisi dikira sebelum entry.' },
          { t: 'Wide stop → fewer contracts · 0 contracts = no trade', s: 'Stop lebar bermakna kontrak lebih sedikit. Sifar kontrak bermakna tiada dagangan.' },
          { t: 'Manage on Daily closes, respect overnight & event risk', s: 'Urus berdasarkan penutupan Daily, dan hormati risiko overnight serta event.' },
          { t: 'Exit when the thesis is invalid — do not hope', s: 'Keluar apabila tesis tidak lagi sah. Jangan berharap.' }]
      }),
      L.exercise({
        title: 'Exercise 3 — Build your Swing SOP', steps: [
          { t: 'Write the 12 steps', b: 'Using your Part A map. Make each step a yes/no rule.', s: 'Tulis dua belas langkah menggunakan peta Bahagian A, setiap satu sebagai peraturan ya atau tidak.' },
          { t: 'Size a sample trade', b: 'Your account, your risk %, a real structural stop. Round down. Is it 0?', s: 'Kira saiz posisi untuk satu contoh dagangan menggunakan akaun dan peratus risiko anda. Bundarkan ke bawah. Adakah jawapannya sifar?' },
          { t: 'Management rules', b: 'Partial · trailing · Daily-close rule · overnight/event rule · thesis-invalid exit.', s: 'Tulis peraturan partial, trailing, penutupan Daily, risiko overnight dan event, serta exit apabila tesis tidak sah.' }]
      }),
      L.upnext({ video: 'VIDEO 08', title: 'Scalping vs Intraday vs Swing', items: ['Side-by-side comparison of all three SOPs', 'Preparation · holding period · stops · size · costs · psychology', 'Choosing a style that fits your time and capital'], say: 'Dalam Video 8, kita bandingkan ketiga-tiga gaya trading secara terus, dan bincangkan cara memilih gaya yang sesuai dengan masa dan modal anda.' }),
      L.refs({ items: [L.REF.bursa, L.REF.harris, L.REF.cme, L.REF.murphy, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 8.', next: 'Seterusnya: Video 08 — Scalping vs Intraday vs Swing' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
