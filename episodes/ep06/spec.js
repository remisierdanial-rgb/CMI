/* CMI SMC Level 9 — VIDEO 06: Swing Trading SOP · Higher-Timeframe Planning (Subtopic 3 · A–E) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep06', video: 'VIDEO 06', title: 'Swing Trading SOP · Higher-Timeframe Planning',
    scenes: [
      L.title({
        kicker: 'VIDEO 06 · LEVEL 9 · SUBTOPIC 3 · SWING TRADING SOP', title: 'Swing Trading SOP<br>Part 1 · HTF Planning', sub: 'Weekly & Daily context · Major liquidity · HTF POI',
        cues: ['Selamat datang ke Video 6. Kita mula subtopik ketiga: Swing Trading SOP.',
          'Swing trading memegang posisi merentasi beberapa sesi atau hari, jadi pendekatan risiko dan pengurusannya berbeza daripada intraday.',
          'Kita akan definisikan swing trading, termasuk risiko overnight dan event, serta pertimbangan margin.',
          'Kemudian kita bina rangka timeframe, persediaan sepuluh langkah, dan struktur pasaran timeframe tinggi.',
          'Akhir sekali, kita pilih POI swing, dan bezakan zon fresh dengan zon yang telah diuji.'],
        obj: [{ t: 'Define swing trading & its specific risks', k: 2 }, { t: 'Build the Monthly → 15M framework', k: 3 }, { t: 'Read HTF structure & the major dealing range', k: 3, d: 3 }, { t: 'Select and grade HTF POIs', k: 4 }],
        schem: { k: 1, pts: [[0, .1], [.2, .5], [.3, .38], [.5, .78], [.6, .62], [.8, .95], [.9, .82], [1, .9]], zones: [{ x1: .55, x2: 1, y1: .56, y2: .66, c: C.poi, label: 'DAILY POI', k: 4 }] }
      }),
      L.bullets({
        label: '3A · WHAT IS SWING TRADING', kicker: 'SWING SOP · 3A', title: 'What is swing trading?',
        cues: ['Apakah swing trading? Swing trading cuba menangkap pergerakan harga yang lebih besar, dengan memegang posisi merentasi beberapa sesi atau hari.',
          'Struktur pasaran timeframe tinggi menjadi asas: Weekly dan Daily menentukan arah dan lokasi.',
          'Invalidation struktur lebih lebar, jadi stop-loss dalam mata juga lebih besar, dan saiz posisi mesti lebih kecil.',
          'Posisi yang dipegang semalaman terdedah kepada risiko overnight dan event: harga boleh dibuka dengan gap melepasi stop-loss.',
          'Pedagang juga mesti mempertimbangkan keperluan margin sepanjang tempoh pegangan, dan kos pembiayaan jika berkaitan.',
          'Oleh itu, swing trading memerlukan pendekatan risiko dan pengurusan posisi yang berbeza daripada intraday.'],
        items: [{ t: 'Captures larger moves · holds across sessions / days', c: C.amber, k: 0, d: 1 }, { t: 'Built on Weekly & Daily structure', c: C.blue, k: 1 }, { t: 'Wider structural invalidation → smaller size', c: C.liq, k: 2 }, { t: 'Overnight & event risk · gaps through stops', c: C.bear, k: 3 }, { t: 'Margin over the holding period · financing where relevant', c: C.amber, k: 4 }],
        side: { k: 5, kicker: 'DIFFERENT SOP', title: 'Not an intraday trade held longer', items: [{ t: 'Different risk', c: C.bear, k: 5, d: 1 }, { t: 'Different management', c: C.green, k: 5, d: 2.5 }] }
      }),
      L.schem({
        label: '3A · OVERNIGHT & EVENT RISK', kicker: 'SWING SOP · 3A', title: 'A stop-loss does not guarantee the exit price',
        cues: ['Lihat risiko overnight dalam bentuk visual.',
          'Posisi beli ditutup pada akhir hari dengan stop-loss di bawah. Semalaman, berita atau peristiwa berlaku.',
          'Keesokan harinya, harga dibuka dengan gap jauh di bawah stop-loss. Order stop dilaksanakan pada harga pasaran pertama yang tersedia, bukan pada harga stop.',
          'Kerugian sebenar menjadi lebih besar daripada yang dirancang. Inilah sebabnya risiko event mesti dinilai sebelum memegang posisi semalaman.'],
        panels: [{ k: 1, title: 'FCPO · 1H · HYPOTHETICAL', dur: 2.6, pts: [[0, .55], [.1, .62], [.2, .58], [.3, .7], [.4, .64], [.48, .68], [.52, .2], [.62, .24], [.75, .16], [1, .22]], lines: [{ x1: 0, x2: 1, y: .45, c: C.bear, label: 'STOP-LOSS', k: 1, d: .5 }, { x1: .48, x2: .52, y: .99, c: C.amber, label: 'OVERNIGHT GAP', k: 2 }], labels: [{ i: 5, t: 'CLOSE', c: C.text, k: 1, d: 2 }, { i: 6, t: 'GAP OPEN · FILL BELOW STOP', c: C.bear, pos: 'below', k: 2, d: 1.5 }] }],
        side: { k: 3, kicker: 'RISK', kc: '#ef5350', title: 'Gap / slippage risk', items: [{ t: 'Planned loss = stop distance', c: C.amber, k: 3, d: .5 }, { t: 'Actual loss can be larger', c: C.bear, k: 3, d: 2 }, { t: 'Assess events before holding overnight', c: C.green, k: 3, d: 4 }] }
      }),
      L.table({
        label: '3B · TIMEFRAME FRAMEWORK', kicker: 'SWING SOP · 3B', title: 'Swing trading timeframe framework',
        cues: ['Rangka timeframe swing trading CMI.',
          'Monthly dan Weekly memberi konteks pasaran utama: trend besar dan aras utama.',
          'Daily menentukan bias arah.',
          'Carta 4H dan 1H digunakan untuk setup dan POI.',
          'Carta 1H, 30M atau 15M digunakan untuk pengesahan entry.',
          'Pilihan timeframe bergantung pada tempoh pegangan, volatiliti dan metodologi anda.'],
        cols: ['Function', 'Suggested TF', 'Purpose'], colw: ['30%', '26%', '44%'], colColor: [null, '#8b7cf6', null],
        rows: [['Major market context', 'Monthly / Weekly', 'Major trend · key levels'], ['Directional bias', 'Daily', 'Bias & invalidation'], ['Setup & POI', '4H / 1H', 'POI · structure'], ['Entry confirmation', '1H / 30M / 15M', 'MSS · displacement · FVG']],
        rowK: [1, 2, 3, 4], tag: { t: 'SUGGESTED CMI FRAMEWORK · DEPENDS ON HOLDING PERIOD, VOLATILITY & METHOD', k: 5, y: 560 }
      }),
      L.sop({
        label: '3C · SWING PREPARATION', kicker: 'SWING SOP · 3C', title: 'Swing trading preparation · 10 steps', cols: 2, h: 92,
        cues: ['Persediaan swing trading, sepuluh langkah.',
          'Satu, semak konteks Monthly dan Weekly. Dua, kenal pasti swing high dan swing low utama.',
          'Tiga, tetapkan hipotesis arah Daily. Empat, petakan Buy-Side dan Sell-Side Liquidity utama.',
          'Lima, tandakan previous week high dan low, serta previous month high dan low jika relevan. Enam, kenal pasti POI timeframe tinggi.',
          'Tujuh, nilai Premium dan Discount. Lapan, kenal pasti liquidity bertentangan yang utama sebagai sasaran.',
          'Sembilan, rancang tempoh pegangan yang mungkin. Sepuluh, tetapkan pendedahan risiko sebelum entry.'],
        steps: [{ t: 'Review Monthly & Weekly context', k: 1 }, { t: 'Identify major swing highs & lows', k: 1, d: 2 }, { t: 'Determine the Daily directional hypothesis', k: 2 }, { t: 'Map major BSL & SSL', k: 2, d: 2.5, c: C.liq }, { t: 'Mark PWH, PWL, PMH, PML', k: 3, c: C.liq },
        { t: 'Identify significant HTF POIs', k: 3, d: 4, c: C.poi }, { t: 'Evaluate Premium & Discount', k: 4 }, { t: 'Identify major opposing liquidity', k: 4, d: 2, c: C.liq }, { t: 'Plan the possible holding period', k: 5 }, { t: 'Define risk exposure before entry', k: 5, d: 2.5, c: C.bear, hl: true }]
      }),
      L.cards({
        label: '3D · HTF MARKET STRUCTURE', kicker: 'SWING SOP · 3D', title: 'Higher-timeframe market structure', cols: 4, h: 200,
        cues: ['Struktur pasaran timeframe tinggi.',
          'Major higher high dan higher low, atau major lower high dan lower low, menentukan trend swing.',
          'BOS pada Weekly dan Daily mengesahkan kesinambungan. CHoCH dan MSS menunjukkan potensi perubahan.',
          'Struktur external ialah swing utama. Struktur internal ialah pullback di dalamnya.',
          'Major dealing range dibina dari swing utama, dan memberi Premium dan Discount untuk swing trading.'],
        cards: [{ n: 'HH · HL', t: 'Major bullish swings', c: C.bull, k: 1 }, { n: 'LH · LL', t: 'Major bearish swings', c: C.bear, k: 1, d: 2 }, { n: 'W / D BOS', t: 'Weekly / Daily BOS', b: 'Continuation.', c: C.amber, k: 2 }, { n: 'CHoCH · MSS', t: 'Potential change', b: 'Against the HTF trend.', c: C.amber, k: 2, d: 2.5 },
        { n: 'EXT', t: 'External structure', b: 'Major swings.', c: C.liq, k: 3 }, { n: 'INT', t: 'Internal structure', b: 'Pullbacks inside.', c: C.liq, k: 3, d: 2 }, { n: 'RANGE', t: 'Major dealing range', b: 'Premium · Discount.', c: C.poi, k: 4 }]
      }),
      L.schem({
        label: '3D · PULLBACK INSIDE THE HTF TREND', kicker: 'SWING SOP · 3D', title: 'LTF pullback inside a HTF trend',
        cues: ['Satu konsep penting dalam swing trading: pullback timeframe rendah boleh berlaku di dalam trend timeframe tinggi.',
          'Di kiri, carta Weekly menunjukkan struktur bullish, dengan higher high dan higher low.',
          'Di kanan, kita zum ke Daily. Daily kelihatan bearish, tetapi ia hanyalah pullback ke kawasan discount dalam trend Weekly.',
          'Pullback ini boleh membawa harga ke POI Daily, iaitu lokasi yang berpotensi untuk peluang beli swing.'],
        panels: [
          { k: 1, title: 'WEEKLY · BULLISH', pts: [[0, .05], [.2, .45], [.3, .3], [.55, .8], [.68, .6], [.82, .92], [1, .7]], labels: [{ i: 3, t: 'HH', c: C.text }, { i: 4, t: 'HL', c: C.text, pos: 'below' }, { i: 5, t: 'HH', c: C.text }], zones: [{ x1: .8, x2: 1, y1: .55, y2: .95, c: C.amber, label: 'ZOOM', k: 2, dash: true }], cap: 'Weekly structure: HH · HL', capk: 1 },
          { k: 2, title: 'DAILY · PULLBACK', color: C.bear, pts: [[0, .95], [.15, .7], [.25, .78], [.42, .48], [.52, .56], [.7, .25], [.8, .3], [.9, .18], [1, .35]], zones: [{ x1: .6, x2: 1, y1: .1, y2: .24, c: C.poi, label: 'DAILY POI · DISCOUNT', k: 3 }], cap: 'Daily "bearish" = pullback into Weekly discount', capk: 2, capd: 2.5 }
        ]
      }),
      L.schem({
        label: '3D · CONTINUATION vs REVERSAL', kicker: 'SWING SOP · 3D', title: 'Trend continuation vs potential reversal',
        cues: ['Bagaimana membezakan kesinambungan trend dengan potensi reversal?',
          'Kesinambungan: pullback berhenti di atas higher low utama, dan Daily membuat BOS ke arah trend Weekly.',
          'Potensi reversal: harga menyapu high utama, kemudian memecah higher low utama dengan displacement, iaitu MSS pada Daily.',
          'Reversal timeframe tinggi memerlukan bukti yang lebih kuat. Jangan anggap setiap retracement Daily sebagai reversal yang disahkan.'],
        panels: [
          { k: 1, title: 'CONTINUATION', pts: [[0, .1], [.2, .55], [.32, .38], [.5, .75], [.62, .52], [.82, .95], [1, .85]], lines: [{ x1: .3, x2: 1, y: .4, c: C.amber, label: 'MAJOR HL', k: 1, d: .8 }], labels: [{ i: 5, t: 'BOS', c: C.bull, k: 1, d: 2 }], cap: 'Pullback holds above HL → BOS with the trend', capk: 1, capd: 2.5 },
          { k: 2, title: 'POTENTIAL REVERSAL', color: C.bear, pts: [[0, .1], [.2, .55], [.32, .38], [.5, .78], [.56, .9], [.66, .5], [.74, .25], [.82, .35], [1, .08]], lines: [{ x1: .3, x2: 1, y: .38, c: C.amber, label: 'MAJOR HL', k: 2, d: .8 }, { x1: .4, x2: 1, y: .8, c: C.liq, label: 'BSL', k: 2, d: 1.2 }], labels: [{ i: 4, t: 'SWEEP', c: C.liq, k: 2, d: 1.8 }, { i: 6, t: 'MSS', c: C.bear, pos: 'below', k: 2, d: 2.6 }], cap: 'Sweep of the high + HL broken with displacement', capk: 2, capd: 3 }
        ], note: { t: 'A Daily retracement is not a confirmed reversal.', k: 3, y: 720 }
      }),
      L.cards({
        label: '3E · SWING POI SELECTION', kicker: 'SWING SOP · 3E', title: 'Swing POI assessment', cols: 5, h: 185,
        cues: ['Pemilihan POI untuk swing trading.',
          'Order Block Weekly dan Daily, FVG Daily dan 4H, Breaker Block dan Mitigation Block.',
          'Rejection Block, zon Supply dan Demand, dan kedudukan Premium atau Discount.',
          'Setiap POI dinilai bersama objektif liquidity dan kualiti displacement yang menciptanya.',
          'Satu lagi faktor: adakah zon itu fresh, atau telah diuji beberapa kali?'],
        cards: [{ n: 'W/D OB', t: 'Order Blocks', c: C.poi, k: 1 }, { n: 'D/4H FVG', t: 'Fair Value Gaps', c: C.blue, k: 1, d: 1.5 }, { n: 'BB', t: 'Breaker Blocks', c: C.poi, k: 1, d: 3 }, { n: 'MB', t: 'Mitigation Blocks', c: C.poi, k: 1, d: 4 }, { n: 'RB', t: 'Rejection Blocks', c: C.poi, k: 2 },
        { n: 'S&D', t: 'Supply & Demand', c: C.poi, k: 2, d: 1.5 }, { n: 'P / D', t: 'Premium / Discount', c: C.amber, k: 2, d: 3 }, { n: 'LIQ', t: 'Liquidity objective', c: C.liq, k: 3 }, { n: 'DISP', t: 'Displacement quality', c: C.green, k: 3, d: 2 }, { n: 'FRESH', t: 'Fresh vs tested', c: C.amber, k: 4 }]
      }),
      L.schem({
        label: '3E · FRESH vs TESTED · HTF ≠ MORE RELIABLE', kicker: 'SWING SOP · 3E', title: 'Fresh vs tested zones',
        cues: ['Zon fresh ialah zon yang belum diuji semula sejak ia terbentuk. Zon tested telah disentuh beberapa kali.',
          'Sesetengah pedagang menganggap setiap ujian mengurangkan kepentingan zon. Ini tafsiran metodologi, bukan peraturan pasti.',
          'Satu lagi salah faham: POI timeframe tinggi tidak secara automatik lebih boleh dipercayai.',
          'Kepentingannya bergantung pada konteks, liquidity di sekelilingnya, dan tingkah laku harga selepas harga sampai ke zon itu.'],
        panels: [
          { k: 0, d: .3, title: 'FRESH ZONE', pts: [[0, .25], [.12, .1], [.25, .7], [.45, .85], [.6, .6], [.72, .3], [.8, .2], [1, .55]], zones: [{ x1: .1, x2: 1, y1: .05, y2: .2, c: C.poi, label: 'FIRST RETURN', k: 0, d: 1 }], cap: 'First return to the zone', capk: 0, capd: 2 },
          { k: 1, title: 'TESTED ZONE', color: C.bear, pts: [[0, .25], [.1, .1], [.2, .5], [.3, .18], [.4, .45], [.5, .2], [.6, .4], [.7, .15], [.8, .1], [1, .02]], zones: [{ x1: .08, x2: 1, y1: .08, y2: .22, c: C.poi, label: 'TESTED 3×', k: 1, d: 1 }], cap: 'Repeated tests · eventually broken', capk: 1, capd: 2, capc: '#ef5350' }
        ], note: { t: 'HTF POIs are not automatically more reliable — context and subsequent price behaviour decide.', k: 2, y: 720 }
      }),
      L.kc({
        qs: [{ q: 'Why is HTF context essential for swing trading?', a: 'Swing positions follow Weekly/Daily structure; LTF moves are often pullbacks inside it.', qs: 'Soalan satu: kenapa konteks timeframe tinggi penting dalam swing trading?', as: 'Jawapan: posisi swing mengikut struktur Weekly dan Daily. Pergerakan timeframe rendah selalunya hanya pullback di dalamnya.' },
        { q: 'Does a stop-loss guarantee the exit price overnight?', a: 'No — a gap can fill the stop at a worse price.', qs: 'Soalan dua: adakah stop-loss menjamin harga keluar ketika posisi dipegang semalaman?', as: 'Jawapan: tidak. Gap boleh menyebabkan stop dilaksanakan pada harga yang lebih teruk.' },
        { q: 'Is a Weekly OB automatically stronger than a 4H OB?', a: 'No — relevance depends on context, liquidity and price behaviour at the zone.', qs: 'Soalan tiga: adakah Order Block Weekly secara automatik lebih kuat daripada Order Block 4H?', as: 'Jawapan: tidak. Kepentingannya bergantung pada konteks, liquidity dan tingkah laku harga di zon itu.' }]
      }),
      L.summary({
        title: 'Video 06 — what to remember', points: [
          { t: 'Swing = multi-session holds · wider invalidation · overnight & event risk', s: 'Swing ialah pegangan merentasi sesi, dengan invalidation lebih lebar, serta risiko overnight dan event.' },
          { t: 'Monthly/Weekly context → Daily bias → 4H/1H POI → 1H/30M/15M entry', s: 'Konteks Monthly dan Weekly, bias Daily, POI 4H dan 1H, entry 1H, 30M atau 15M.' },
          { t: 'A Daily pullback can sit inside a Weekly trend — not every retracement reverses', s: 'Pullback Daily boleh berada di dalam trend Weekly. Bukan setiap retracement ialah reversal.' },
          { t: 'Grade POIs by context, liquidity, displacement and freshness', s: 'Nilai POI berdasarkan konteks, liquidity, displacement dan sama ada ia fresh.' }]
      }),
      L.exercise({
        title: 'Exercise 3 · Part A — Swing map', steps: [
          { t: 'Weekly & Daily map', b: 'Mark major swings, BOS/CHoCH, PWH/PWL, PMH/PML, BSL/SSL and the major dealing range.', s: 'Petakan Weekly dan Daily: swing utama, BOS atau CHoCH, previous week dan month high dan low, liquidity utama, dan dealing range.' },
          { t: 'Grade two POIs', b: 'For each: TF, type, Premium/Discount, liquidity objective, displacement, fresh/tested.', s: 'Nilai dua POI: timeframe, jenis, Premium atau Discount, objektif liquidity, displacement, dan sama ada fresh atau tested.' }]
      }),
      L.upnext({ video: 'VIDEO 07', title: 'Swing Trading SOP · Execution & Management', items: ['12-step swing entry SOP', 'Position sizing with wide stops', 'Bullish & bearish swing cases · position management'], say: 'Dalam Video 7, kita laksanakan Swing SOP: dua belas langkah, saiz posisi dengan stop yang lebar, kajian kes bullish dan bearish, dan pengurusan posisi.' }),
      L.refs({ items: [L.REF.bursa, L.REF.murphy, L.REF.pring, L.REF.wyckoff, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 7.', next: 'Seterusnya: Video 07 — Swing Trading SOP · Execution & Management' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
