/* CMI SMC Level 9 — VIDEO 02: Scalping SOP · Preparation & Market Context (Subtopic 1 · A–F) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb', pink: '#f472b6' };
  const EPISODE = {
    id: 'ep02', video: 'VIDEO 02', title: 'Scalping SOP · Preparation & Market Context',
    scenes: [
      L.title({
        kicker: 'VIDEO 02 · LEVEL 9 · SUBTOPIC 1 · SCALPING SOP', title: 'Scalping SOP<br>Part 1 · Preparation', sub: 'Timeframes · Pre-market · Structure · Liquidity · POI',
        cues: ['Selamat datang ke Video 2. Kita mula membina subtopik pertama Level 9: Scalping SOP.',
          'Dalam bahagian pertama ini, kita fokus pada persediaan, iaitu semua kerja yang dilakukan sebelum mencari entry.',
          'Kita akan definisikan scalping dan ciri-cirinya, termasuk kenapa kekerapan dagangan tidak sama dengan keuntungan.',
          'Kemudian kita bina rangka timeframe dan senarai semak pra-pasaran sepuluh langkah.',
          'Akhir sekali, kita petakan struktur pasaran, liquidity dan POI khusus untuk scalping.'],
        obj: [{ t: 'Define scalping and its characteristics', k: 2 }, { t: 'Build the scalping timeframe framework', k: 3 }, { t: 'Run a 10-step pre-market preparation', k: 3, d: 2.5 }, { t: 'Map structure, liquidity & POI for scalping', k: 4 }],
        schem: { k: 1, pts: [[0, .5], [.12, .62], [.2, .48], [.3, .66], [.4, .5], [.5, .7], [.6, .55], [.7, .42], [.78, .58], [.88, .45], [1, .72]], zones: [{ x1: .62, x2: 1, y1: .36, y2: .46, c: C.poi, label: '15M POI', k: 1, d: 1.5 }], labels: [{ i: 7, t: '5M', c: C.amber, pos: 'below', k: 2 }] }
      }),
      L.bullets({
        label: '1A · WHAT IS SCALPING', kicker: 'SCALPING SOP · 1A', title: 'What is scalping?',
        cues: ['Apakah scalping? Scalping ialah gaya trading jangka pendek dengan tempoh pegangan yang singkat, biasanya dalam lingkungan minit.',
          'Ciri pertama: tempoh pegangan pendek. Stop-loss dan sasaran juga lebih dekat berbanding gaya trading yang lain.',
          'Kedua, peluang muncul dengan kerap. Tetapi SOP yang baik tetap selektif, dan hanya mengambil setup yang memenuhi syarat.',
          'Ketiga, kelajuan analisis dan pelaksanaan penting, kerana pergerakan yang disasarkan adalah kecil.',
          'Keempat, kos transaksi memberi kesan besar. Apabila sasaran kecil, kos dan slippage mengambil bahagian yang lebih besar daripada ganjaran.',
          'Kelima, pengurusan risiko mesti ketat, dengan had risiko setiap dagangan dan had kerugian harian.',
          'Scalping bukan sekadar masuk dan keluar dengan cepat. Ia memerlukan setup, syarat entry, invalidation dan pelan exit yang ditetapkan lebih awal.'],
        items: [{ t: 'Short holding period · close stops & targets', c: C.amber, k: 1 }, { t: 'Frequent opportunities · selective execution', c: C.liq, k: 2 }, { t: 'Speed of analysis & execution', c: C.blue, k: 3 }, { t: 'Costs are large relative to the target', c: C.bear, k: 4 }, { t: 'Strict per-trade & daily risk limits', c: C.green, k: 5 }],
        side: { k: 6, kicker: 'SCALPING IS NOT', kc: '#ef5350', title: 'just fast in, fast out', items: [{ t: 'Predefined setup', c: C.green, k: 6, d: .5 }, { t: 'Entry condition', c: C.green, k: 6, d: 1.5 }, { t: 'Invalidation', c: C.green, k: 6, d: 2.5 }, { t: 'Exit plan', c: C.green, k: 6, d: 3.5 }] }
      }),
      L.calc({
        label: '1A · FREQUENCY ≠ PROFIT', kicker: 'SCALPING SOP · 1A', statement: 'More trades ≠ more edge.', ptitle: 'HYPOTHETICAL · COST + SLIPPAGE ≈ 2 pts PER TRADE (ILLUSTRATIVE ASSUMPTION)',
        cues: ['Adakah lebih banyak dagangan bermakna lebih banyak keuntungan? Tidak semestinya.',
          'Andaikan, secara hipotetikal, kos dan slippage setara dua mata bagi setiap dagangan.',
          'Pedagang yang membuat 20 dagangan sehari menanggung kos setara 40 mata, sebelum sebarang keuntungan.',
          'Pedagang yang hanya mengambil tiga setup berkualiti menanggung kos setara enam mata.',
          'Bagi sasaran 10 mata, kos dua mata ialah 20 peratus daripada ganjaran. Bagi sasaran 40 mata, ia hanya 5 peratus.',
          'Inilah sebabnya scalping sangat sensitif kepada kos. Kekerapan tidak menggantikan kelebihan strategi.'],
        lines: [{ t: 'Trader A  20 trades × 2 pts = <span style="color:#ef5350">40 pts</span> cost', k: 2 }, { t: 'Trader B   3 trades × 2 pts = <span class="em">6 pts</span> cost', k: 3 },
        { t: 'Target 10 pts → cost = <span style="color:#ef5350">20%</span> of reward', k: 4 }, { t: 'Target 40 pts → cost =  <span class="em">5%</span> of reward', k: 4, d: 2.5 }],
        side: { k: 5, kicker: 'TAKEAWAY', title: 'Select, don\'t spray', items: [{ t: 'Costs scale with the number of trades', c: C.bear, k: 5 }, { t: 'Edge comes from setup quality & rules', c: C.green, k: 5, d: 1.5 }] }
      }),
      L.table({
        label: '1B · TIMEFRAME FRAMEWORK', kicker: 'SCALPING SOP · 1B', title: 'Recommended scalping timeframe framework',
        cues: ['Seterusnya, rangka timeframe scalping CMI. Ini rangka ilustrasi untuk FCPO, bukan formula optimum.',
          'Carta 1H atau 30M memberi konteks: arah, struktur utama dan aras penting.',
          'Carta 15M digunakan untuk mengenal pasti setup dan lokasi, iaitu liquidity dan POI.',
          'Carta 5M digunakan untuk menilai pengesahan entry: MSS, displacement dan FVG.',
          'Carta 1M adalah pilihan sahaja. Ia boleh memperhalusi entry, tetapi mengandungi lebih banyak hingar dan isyarat palsu, dan memerlukan data serta ujian yang sesuai.',
          'Kombinasi timeframe yang tepat perlu diuji dan disesuaikan. Jangan anggap ia optimum untuk semua orang.'],
        cols: ['Function', 'Suggested TF', 'Purpose'], colw: ['30%', '22%', '48%'], colColor: [null, '#e8b44c', null],
        rows: [['Higher context', '1H / 30M', 'Direction · major structure · key levels'], ['Setup & location', '15M', 'Liquidity · POI selection'], ['Entry confirmation', '5M', 'MSS · displacement · FVG'], ['Fine execution', '1M (optional)', 'Only with suitable data & testing · high noise']],
        rowK: [1, 2, 3, 4], tag: { t: 'ILLUSTRATIVE CMI FCPO FRAMEWORK · NOT UNIVERSALLY OPTIMAL · TEST & ADAPT', k: 5, y: 560 }
      }),
      L.schem({
        label: '1B · HOW THE TIMEFRAMES CONNECT', kicker: 'SCALPING SOP · 1B', title: 'Direction → Location → Trigger',
        cues: ['Lihat bagaimana tiga timeframe ini bersambung.',
          'Pada 1H, struktur membuat higher high dan higher low. Konteks berpotensi bullish.',
          'Pada 15M, harga menarik balik ke POI di kawasan discount, berhampiran Sell-Side Liquidity.',
          'Pada 5M, kita menunggu sweep, MSS dan displacement sebelum mempertimbangkan entry.',
          'Setiap timeframe menjawab soalan berbeza: ke mana arah, di mana lokasi, dan bila pencetusnya.'],
        h: 440, panels: [
          { k: 1, title: '1H · CONTEXT', pts: [[0, .1], [.2, .45], [.32, .3], [.55, .75], [.68, .55], [.9, .95], [1, .8]], labels: [{ i: 1, t: 'HH', c: C.text }, { i: 2, t: 'HL', c: C.text, pos: 'below' }, { i: 3, t: 'HH', c: C.text }, { i: 4, t: 'HL', c: C.text, pos: 'below' }], cap: 'Where is direction?', capk: 1 },
          { k: 2, title: '15M · LOCATION', pts: [[0, .9], [.2, .7], [.3, .78], [.5, .45], [.6, .52], [.8, .25], [1, .3]], zones: [{ x1: .7, x2: 1, y1: .12, y2: .3, c: C.poi, label: 'POI', k: 2, d: 1 }], lines: [{ x1: .5, x2: 1, y: .2, c: C.liq, label: 'SSL', k: 2, d: 1.5 }], color: C.bear, cap: 'Where is the location?', capk: 2 },
          { k: 3, title: '5M · TRIGGER', pts: [[0, .55], [.15, .4], [.25, .5], [.38, .25], [.45, .12], [.55, .45], [.62, .62], [.72, .5], [.85, .7], [1, .85]], lines: [{ x1: .1, x2: .6, y: .52, c: C.amber, label: 'MSS', k: 3, d: 1.5 }], labels: [{ i: 4, t: 'SWEEP', c: C.liq, pos: 'below', k: 3, d: .8 }], cap: 'When is the trigger?', capk: 3 }
        ]
      }),
      L.sop({
        label: '1C · PRE-MARKET PREPARATION', kicker: 'SCALPING SOP · 1C', title: 'Pre-market preparation · 10 steps', cols: 2, h: 92,
        cues: ['Sekarang, persediaan pra-pasaran. Sepuluh langkah ini dilakukan sebelum sesi bermula, bukan semasa harga sedang bergerak.',
          'Satu, semak kalendar dagangan FCPO dan sesi dagangan semasa. Dua, ulang kaji pergerakan sesi sebelumnya.',
          'Tiga dan empat, tandakan Previous Day High dan Previous Day Low.',
          'Lima, kenal pasti aras Weekly dan Daily yang signifikan. Enam, tandakan liquidity pool yang relevan.',
          'Tujuh, tetapkan bias awal: bullish, bearish atau neutral. Lapan, kenal pasti POI pada timeframe tinggi dan sederhana.',
          'Sembilan, semak maklumat pasaran dan peristiwa berjadual, contohnya laporan bulanan MPOB.',
          'Sepuluh, tetapkan risiko maksimum yang boleh diterima untuk hari ini, dalam ringgit, sebelum membuka sebarang posisi.'],
        steps: [{ t: 'Check FCPO trading calendar & current session', k: 1 }, { t: 'Review the previous session', k: 1, d: 2.5 }, { t: 'Mark Previous Day High (PDH)', k: 2, c: C.liq }, { t: 'Mark Previous Day Low (PDL)', k: 2, d: 1, c: C.liq }, { t: 'Identify significant Weekly & Daily levels', k: 3 },
        { t: 'Identify relevant liquidity pools', k: 3, d: 2, c: C.liq }, { t: 'Preliminary bias: bullish / bearish / neutral', k: 4 }, { t: 'Identify possible HTF / MTF POIs', k: 4, d: 2.5, c: C.poi }, { t: 'Check market information & scheduled events', k: 5 }, { t: 'Define maximum acceptable risk (RM) for today', k: 6, c: C.bear, hl: true }]
      }),
      L.schem({
        label: '1C · THE PREPARED CHART', kicker: 'SCALPING SOP · 1C', title: 'A clean, prepared chart',
        cues: ['Ini rupa carta yang telah disediakan.',
          'PDH dan PDL ditanda sebagai sempadan julat semalam, dan juga sebagai potensi liquidity.',
          'Equal Lows di bawah, dan session high di atas, ditanda sebagai kumpulan liquidity.',
          'Satu POI dipilih. Bias awal ditulis bersama syarat yang membatalkannya.',
          'Carta yang baik tidak sesak. Tandakan hanya aras yang benar-benar akan digunakan dalam keputusan.'],
        h: 520, side: { k: 3, kicker: 'PREP SHEET · TODAY', title: 'Written before the open', items: [{ t: 'Bias: bullish above PDL', c: C.green, k: 3 }, { t: 'Invalidation: 30M close below PDL', c: C.bear, k: 3, d: 1.5 }, { t: 'Max risk today: RM ___', c: C.amber, k: 3, d: 3 }, { t: 'Max trades today: ___', c: C.amber, k: 3, d: 4 }] },
        panels: [{
          k: 0, d: .3, title: 'FCPO · 15M · HYPOTHETICAL', dur: 2.8, pts: [[0, .55], [.08, .78], [.16, .62], [.25, .85], [.33, .6], [.42, .4], [.5, .48], [.58, .22], [.66, .35], [.74, .22], [.84, .45], [.92, .38], [1, .5]],
          lines: [{ x1: 0, x2: 1, y: .88, c: C.amber, label: 'PDH', k: 1 }, { x1: 0, x2: 1, y: .1, c: C.amber, label: 'PDL', k: 1, d: .6 }, { x1: .55, x2: 1, y: .22, c: C.liq, label: 'EQL · SSL', k: 2 }, { x1: .2, x2: 1, y: .85, c: C.liq, label: 'SESSION HIGH · BSL', k: 2, d: .8 }],
          zones: [{ x1: .55, x2: 1, y1: .12, y2: .21, c: C.poi, label: 'POI', k: 3 }]
        }]
      }),
      L.cards({
        label: '1D · MARKET STRUCTURE', kicker: 'SCALPING SOP · 1D', title: 'Scalping market structure', cols: 4, h: 220,
        cues: ['Seterusnya, struktur pasaran untuk scalping. Istilah ini sama seperti yang digunakan dalam Level sebelumnya.',
          'Higher high dan higher low menunjukkan struktur bullish. Lower high dan lower low menunjukkan struktur bearish.',
          'BOS ialah penutupan melepasi swing searah trend. CHoCH ialah pecahan pertama berlawanan arah trend.',
          'MSS ialah anjakan struktur yang disertai displacement, biasanya selepas interaksi liquidity.',
          'Struktur external menentukan julat utama. Struktur internal ialah swing kecil di dalamnya.',
          'Displacement ialah pergerakan arah yang kuat, dengan badan candle besar dan julat mengembang. Pada scalping, ia membantu membezakan perubahan arah jangka pendek daripada hingar.'],
        cards: [{ n: 'HH · HL', t: 'Bullish structure', b: 'Higher highs and higher lows.', c: C.bull, k: 1 }, { n: 'LH · LL', t: 'Bearish structure', b: 'Lower highs and lower lows.', c: C.bear, k: 1, d: 1.5 },
        { n: 'BOS', t: 'Break of Structure', b: 'Body close beyond a swing, with the trend.', c: C.amber, k: 2 }, { n: 'CHoCH', t: 'Change of Character', b: 'First break against the trend.', c: C.amber, k: 2, d: 2 },
        { n: 'MSS', t: 'Market Structure Shift', b: 'Structure break with displacement, often after liquidity.', c: C.amber, k: 3 }, { n: 'EXT / INT', t: 'External vs internal', b: 'Major swings vs swings inside the range.', c: C.liq, k: 4 },
        { n: 'DISP', t: 'Displacement', b: 'Strong bodies · range expansion · breaks structure.', c: C.blue, k: 5 }]
      }),
      L.schem({
        label: '1D · MINOR BREAK vs CONTEXT SHIFT', kicker: 'SCALPING SOP · 1D', title: 'Minor internal break ≠ context shift',
        cues: ['Kesilapan biasa pedagang scalping ialah menganggap setiap pecahan kecil sebagai perubahan arah.',
          'Di kiri, 1H masih bullish. Pecahan internal kecil pada 5M hanyalah pullback di dalam trend.',
          'Di kanan, harga menyapu low external, kemudian memecah struktur dengan displacement. Ini anjakan yang lebih bermakna.',
          'Sebelum bertindak, tanya: adakah pecahan ini internal dan kecil, atau adakah ia mengubah konteks yang lebih besar?'],
        panels: [
          { k: 1, title: 'MINOR INTERNAL BREAK', pts: [[0, .15], [.15, .5], [.25, .38], [.35, .62], [.45, .5], [.52, .56], [.6, .42], [.72, .7], [.85, .6], [1, .9]], lines: [{ x1: .45, x2: .7, y: .5, c: C.amber, label: 'internal', k: 1, d: 1.5 }], cap: 'Pullback inside a bullish 1H trend', capk: 1 },
          { k: 2, title: 'MEANINGFUL MSS', color: C.bear, pts: [[0, .9], [.15, .6], [.25, .7], [.38, .4], [.48, .5], [.58, .18], [.62, .08], [.72, .5], [.8, .62], [.9, .52], [1, .8]], lines: [{ x1: .3, x2: 1, y: .15, c: C.liq, label: 'external SSL', k: 2 }, { x1: .45, x2: .85, y: .5, c: C.amber, label: 'MSS', k: 2, d: 1.8 }], labels: [{ i: 6, t: 'SWEEP', c: C.liq, pos: 'below', k: 2, d: 1 }], cap: 'External sweep + structure break with displacement', capk: 2 }
        ]
      }),
      L.cards({
        label: '1E · LIQUIDITY MAPPING', kicker: 'SCALPING SOP · 1E', title: 'Scalping liquidity map', cols: 4, h: 210,
        cues: ['Seterusnya, pemetaan liquidity untuk scalping.',
          'Buy-Side Liquidity berada di atas high. Sell-Side Liquidity berada di bawah low.',
          'Equal Highs dan Equal Lows ialah high atau low yang hampir sama, yang menjadi potensi kumpulan liquidity.',
          'Session high, session low, PDH dan PDL ialah rujukan harian yang kerap digunakan oleh pedagang scalping.',
          'Liquidity internal berada di dalam julat. Liquidity external berada di luar swing utama.',
          'Liquidity sweep berlaku apabila harga melepasi aras, kemudian ditutup semula di dalam julat.'],
        cards: [{ n: 'BSL', t: 'Buy-Side Liquidity', b: 'Potential orders above highs.', c: C.liq, k: 1 }, { n: 'SSL', t: 'Sell-Side Liquidity', b: 'Potential orders below lows.', c: C.liq, k: 1, d: 1.5 },
        { n: 'EQH · EQL', t: 'Equal highs / lows', b: 'Clustered swing points.', c: C.liq, k: 2 }, { n: 'SESSION', t: 'Session high / low', b: 'Current & prior session extremes.', c: C.amber, k: 3 },
        { n: 'PDH · PDL', t: 'Previous day high / low', b: 'Daily reference levels.', c: C.amber, k: 3, d: 2 }, { n: 'IRL · ERL', t: 'Internal / external', b: 'Inside the range vs beyond major swings.', c: C.poi, k: 4 },
        { n: 'SWEEP', t: 'Liquidity sweep', b: 'Trades through, closes back inside.', c: C.green, k: 5 }]
      }),
      L.schem({
        label: '1E · SWEEP vs BREAKOUT', kicker: 'SCALPING SOP · 1E', title: 'Sweep vs breakout',
        cues: ['Bezakan sweep dengan breakout.',
          'Sweep: harga melepasi Equal Lows, tetapi ditutup semula di atas. Ini kemungkinan pengambilan liquidity.',
          'Breakout: harga ditutup dan diterima di bawah aras. Struktur bearish berterusan.',
          'Tidak semua liquidity akan diambil, dan tidak semua sweep membawa reversal. Sweep hanyalah satu bahagian bukti.'],
        panels: [
          { k: 1, title: 'SWEEP · CLOSE BACK INSIDE', pts: [[0, .8], [.15, .45], [.25, .6], [.4, .35], [.5, .5], [.6, .32], [.66, .15], [.72, .42], [.85, .55], [1, .75]], lines: [{ x1: .35, x2: 1, y: .33, c: C.liq, label: 'EQL', k: 1 }], labels: [{ i: 6, t: 'SWEEP', c: C.liq, pos: 'below', k: 1, d: 1.5 }], cap: 'Possible liquidity grab · needs more evidence', capk: 1 },
          { k: 2, title: 'BREAKOUT · ACCEPTANCE BELOW', color: C.bear, pts: [[0, .8], [.15, .45], [.25, .6], [.4, .35], [.5, .5], [.6, .32], [.68, .18], [.75, .25], [.85, .1], [1, .05]], lines: [{ x1: .35, x2: 1, y: .33, c: C.liq, label: 'EQL', k: 2 }], cap: 'Closes and holds below · bearish continuation', capk: 2 }
        ], note: { t: 'Not every liquidity level is taken. Not every sweep reverses.', k: 3 }
      }),
      L.cards({
        label: '1F · POI SELECTION', kicker: 'SCALPING SOP · 1F', title: 'POI selection · CMI operational definitions', cols: 3, h: 205,
        cues: ['Seterusnya, pemilihan POI mengikut definisi operasi CMI.',
          'Order Block ialah candle bertentangan terakhir sebelum displacement yang memecah struktur.',
          'Fair Value Gap ialah ketidakseimbangan tiga candle. Breaker Block ialah Order Block yang gagal, kemudian berfungsi dari arah bertentangan selepas sweep.',
          'Mitigation Block serupa, tetapi tanpa sweep high atau low terdahulu. Rejection Block ialah kawasan wick panjang pada swing ekstrem.',
          'Supply dan Demand ialah zon asal pergerakan yang kuat.',
          'Untuk scalping, pilih paling banyak dua atau tiga POI yang selari dengan konteks. Terlalu banyak zon menjadikan setiap harga kelihatan seperti peluang.'],
        cards: [{ n: 'OB', t: 'Order Block', b: 'Last opposing candle before a structure-breaking displacement.', c: C.poi, k: 1 }, { n: 'FVG', t: 'Fair Value Gap', b: 'Three-candle imbalance between candle 1 and candle 3.', c: C.blue, k: 2 },
        { n: 'BB', t: 'Breaker Block', b: 'Failed OB that flips after a sweep.', c: C.poi, k: 2, d: 3 }, { n: 'MB', t: 'Mitigation Block', b: 'Failed OB without a prior sweep.', c: C.poi, k: 3 },
        { n: 'RB', t: 'Rejection Block', b: 'Long-wick area at a swing extreme.', c: C.poi, k: 3, d: 3 }, { n: 'S&D', t: 'Supply & Demand', b: 'Origin zones of strong moves.', c: C.poi, k: 4 }],
        note: { t: 'Scalping: select 2–3 POIs aligned with context — not every zone on the chart.', k: 5, y: 650 }
      }),
      L.schem({
        label: '1F · TOUCH ≠ CONFIRMATION', kicker: 'SCALPING SOP · 1F', title: 'Touching a POI is not confirmation',
        cues: ['Ingat, harga menyentuh POI bukan pengesahan.',
          'Dalam contoh ini, harga memasuki POI bullish, kemudian terus menembusinya tanpa sebarang reaksi.',
          'Pedagang yang membeli hanya kerana harga menyentuh zon akan terkena stop-loss.',
          'Itulah sebabnya kita memerlukan pengesahan entry, yang akan dibincangkan dalam Video 3.'],
        panels: [{ k: 1, title: 'FCPO · 15M · HYPOTHETICAL', color: C.bear, dur: 3, pts: [[0, .9], [.12, .7], [.2, .78], [.35, .5], [.45, .55], [.58, .38], [.65, .42], [.75, .2], [.85, .25], [1, .05]], zones: [{ x1: .5, x2: 1, y1: .3, y2: .42, c: C.poi, label: 'BULLISH POI', k: 0, d: .5 }], labels: [{ i: 5, t: 'TOUCH', c: C.amber, pos: 'below', k: 1, d: 1.4 }, { i: 9, t: 'STOPPED', c: C.bear, pos: 'below', k: 2 }] }],
        side: { k: 2, kicker: 'LESSON', title: 'Location needs a trigger', items: [{ t: 'POI = where to look', c: C.poi, k: 2, d: .5 }, { t: 'Confirmation = why to act', c: C.green, k: 3 }] }
      }),
      L.cards({
        label: 'COMMON PREPARATION MISTAKES', kicker: 'SCALPING SOP · MISTAKES', title: 'Four preparation mistakes', cols: 4, h: 260, bad: true,
        cues: ['Empat kesilapan persediaan yang biasa.', 'Satu: tiada had risiko harian sebelum sesi bermula.', 'Dua: terlalu banyak garisan dan zon sehingga carta tidak boleh dibaca.', 'Tiga: menukar bias pada setiap candle kecil.', 'Empat: mengabaikan jadual peristiwa yang boleh menyebabkan volatiliti luar biasa.'],
        cards: [{ t: 'No daily risk limit', b: 'Decided during the session instead of before it.', k: 1 }, { t: 'Overcrowded chart', b: 'Every level looks like a trade.', k: 2 }, { t: 'Bias flips every candle', b: 'Noise mistaken for new information.', k: 3 }, { t: 'Ignoring scheduled events', b: 'Unusual volatility & slippage.', k: 4 }]
      }),
      L.kc({
        qs: [{ q: 'Main difference: scalping vs intraday vs swing?', a: 'Holding period and timeframe framework → different stops, targets, size and overnight exposure.', qs: 'Soalan satu: apakah beza utama antara scalping, intraday dan swing trading?', as: 'Jawapan: tempoh pegangan dan rangka timeframe. Ia membawa kepada stop-loss, sasaran, saiz posisi dan pendedahan overnight yang berbeza.' },
        { q: 'Why check HTF context before scalping?', a: 'It gives direction & location, so a minor 5M break is not mistaken for a trend change.', qs: 'Soalan dua: kenapa konteks timeframe tinggi penting sebelum scalping?', as: 'Jawapan: ia memberi arah dan lokasi, supaya pecahan kecil pada 5M tidak disalah anggap sebagai perubahan trend.' },
        { q: 'Is 1M required for scalping?', a: 'No — optional, noisier, and only with suitable data and testing.', qs: 'Soalan tiga: adakah carta 1M wajib untuk scalping?', as: 'Jawapan: tidak. Ia pilihan, lebih bising, dan hanya digunakan dengan data dan ujian yang sesuai.' }]
      }),
      L.summary({
        title: 'Video 02 — what to remember', points: [
          { t: 'Scalping = short holding, selective, cost-sensitive, strictly risk-limited', s: 'Scalping ialah pegangan pendek, selektif, sensitif kepada kos, dan mempunyai had risiko yang ketat.' },
          { t: '1H/30M context · 15M location · 5M trigger · 1M optional', s: 'Konteks 1H atau 30M, lokasi 15M, pencetus 5M, dan 1M sebagai pilihan.' },
          { t: '10-step pre-market prep — including a daily RM risk limit', s: 'Sepuluh langkah persediaan pra-pasaran, termasuk had risiko harian dalam ringgit.' },
          { t: 'Map structure, liquidity & 2–3 POIs · a touch is not confirmation', s: 'Petakan struktur, liquidity, dan dua atau tiga POI. Sentuhan pada POI bukan pengesahan.' }]
      }),
      L.exercise({
        title: 'Exercise 1 · Part A — Scalping prep sheet', steps: [
          { t: 'Prepare one FCPO chart', b: 'Mark PDH, PDL, one Weekly/Daily level, EQH/EQL and session high/low on 15M.', s: 'Sediakan satu carta FCPO 15M. Tandakan PDH, PDL, satu aras Weekly atau Daily, Equal Highs atau Equal Lows, dan session high serta low.' },
          { t: 'Write the prep sheet', b: 'Bias + invalidation · 2–3 POIs · scheduled events · max RM risk today · max trades.', s: 'Kemudian tulis lembaran persediaan: bias dan syarat pembatalan, dua atau tiga POI, peristiwa berjadual, risiko maksimum hari ini dan bilangan dagangan maksimum.' }]
      }),
      L.upnext({ video: 'VIDEO 03', title: 'Scalping SOP · Entry & Management', items: ['15-step scalping entry SOP', 'Bullish & bearish FCPO examples', 'Trade management · no-trade conditions · mistakes'], say: 'Dalam Video 3, kita lengkapkan Scalping SOP: prosedur entry lima belas langkah, contoh bullish dan bearish, pengurusan dagangan, dan keadaan tidak trade.' }),
      L.refs({ items: [L.REF.bursa, L.REF.harris, L.REF.murphy, L.REF.ict, L.REF.mpob] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 3.', next: 'Seterusnya: Video 03 — Scalping SOP · Entry & Management' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
