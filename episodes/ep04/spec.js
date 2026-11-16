/* CMI SMC Level 9 — VIDEO 04: Intraday SOP · Market Planning (Subtopic 2 · A–E) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep04', video: 'VIDEO 04', title: 'Intraday SOP · Market Planning',
    scenes: [
      L.title({
        kicker: 'VIDEO 04 · LEVEL 9 · SUBTOPIC 2 · INTRADAY SOP', title: 'Intraday SOP<br>Part 1 · Market Planning', sub: 'Daily context · Bias · Dealing range · Scenarios',
        cues: ['Selamat datang ke Video 4. Kita mula subtopik kedua: Intraday SOP.',
          'Intraday trading memerlukan perancangan harian yang lebih menyeluruh berbanding scalping.',
          'Kita akan definisikan intraday, bina rangka timeframe, dan senarai persediaan sembilan langkah.',
          'Kemudian kita bina bias harian, dealing range, Premium dan Discount, serta senario utama dan alternatif.',
          'Akhir sekali, kita bezakan antara setup yang berpotensi dengan entry yang boleh dilaksanakan.'],
        obj: [{ t: 'Define intraday trading vs scalping', k: 2 }, { t: 'Prepare a day with Daily / 4H analysis', k: 2, d: 2.5 }, { t: 'Build an intraday bias with invalidation', k: 3 }, { t: 'Separate a potential setup from an actionable entry', k: 4 }],
        schem: { k: 1, pts: [[0, .2], [.15, .45], [.25, .35], [.45, .7], [.55, .55], [.7, .85], [.8, .7], [1, .95]], lines: [{ x1: 0, x2: 1, y: .62, c: C.amber, label: '50% · EQ', k: 3 }] }
      }),
      L.bullets({
        label: '2A · WHAT IS INTRADAY', kicker: 'INTRADAY SOP · 2A', title: 'What is intraday trading?',
        cues: ['Apakah intraday trading? Posisi dibuka dan ditutup dalam hari dagangan yang sama.',
          'Berbanding scalping, intraday mengikuti struktur 1H dan 30M, jadi stop-loss struktur biasanya lebih lebar dan sasaran lebih jauh.',
          'Intraday bergantung pada tingkah laku sesi: high dan low sesi, PDH dan PDL, serta julat harian.',
          'Persediaan harian sangat penting, kerana pelan dibuat sebelum sesi, bukan semasa harga sedang bergerak.',
          'Pedagang mesti menetapkan sama ada semua posisi akan ditutup sebelum akhir hari atau sebelum akhir sesi.',
          'Ingat, tempoh pegangan ditentukan oleh trading plan, bukan oleh timeframe carta. Posisi intraday yang dipegang semalaman sudah menjadi dagangan swing, dengan risiko yang berbeza.'],
        items: [{ t: 'Open & close within the same trading day', c: C.amber, k: 0, d: 1 }, { t: 'Follows 1H / 30M structure → wider structural stops than scalping', c: C.liq, k: 1 }, { t: 'Session-based behaviour: session H/L · PDH / PDL', c: C.blue, k: 2 }, { t: 'Daily preparation before the session', c: C.green, k: 3 }, { t: 'Rule: close before end of ___ (day / session)', c: C.bear, k: 4 }],
        side: { k: 5, kicker: 'KEY RULE', kc: '#e8b44c', title: 'Holding period is set by the plan — not by the chart timeframe', items: [{ t: 'Held overnight = swing exposure', c: C.bear, k: 5, d: 3 }] }
      }),
      L.table({
        label: '2B · TIMEFRAME FRAMEWORK', kicker: 'INTRADAY SOP · 2B', title: 'Intraday timeframe framework',
        cues: ['Rangka timeframe intraday CMI untuk FCPO.',
          'Daily dan 4H memberi konteks arah: struktur besar, liquidity utama dan dealing range.',
          'Carta 1H dan 30M digunakan untuk struktur pasaran dan setup.',
          'Carta 15M digunakan untuk lokasi, iaitu liquidity dan POI yang lebih tepat, serta reaksi harga.',
          'Carta 5M digunakan untuk pengesahan entry.',
          'Sekali lagi, ini cadangan rangka kerja, bukan peraturan wajib.'],
        cols: ['Function', 'Suggested TF', 'Purpose'], colw: ['30%', '22%', '48%'], colColor: [null, '#22d3ee', null],
        rows: [['Directional context', 'Daily / 4H', 'Bias · major liquidity · dealing range'], ['Market structure & setup', '1H / 30M', 'Structure · POI · scenario'], ['Liquidity & POI', '15M', 'Precise location · liquidity reaction'], ['Entry confirmation', '5M', 'MSS · displacement · FVG']],
        rowK: [1, 2, 3, 4], tag: { t: 'SUGGESTED CMI FRAMEWORK · NOT A MANDATORY RULE', k: 5, y: 560 }
      }),
      L.sop({
        label: '2C · INTRADAY PREPARATION', kicker: 'INTRADAY SOP · 2C', title: 'Intraday preparation · 9 steps', cols: 2, h: 100,
        cues: ['Persediaan intraday, sembilan langkah.',
          'Satu, semak carta Daily dan 4H. Dua, kenal pasti struktur pasaran yang lebih besar.',
          'Tiga, tandakan liquidity utama. Empat, tandakan PDH dan PDL.',
          'Lima, tandakan POI yang relevan. Enam, bina senario bullish, bearish atau neutral.',
          'Tujuh, kenal pasti peristiwa pasaran yang penting hari ini. Lapan, tetapkan risiko maksimum untuk hari ini.',
          'Sembilan, sediakan satu senario utama dan satu senario alternatif.'],
        steps: [{ t: 'Review Daily & 4H charts', k: 1 }, { t: 'Identify broader market structure', k: 1, d: 2 }, { t: 'Mark major liquidity levels', k: 2, c: C.liq }, { t: 'Identify PDH & PDL', k: 2, d: 2, c: C.liq }, { t: 'Mark relevant POIs', k: 3, c: C.poi },
        { t: 'Establish bullish / bearish / neutral scenarios', k: 3, d: 2 }, { t: 'Identify important market events', k: 4 }, { t: 'Define maximum risk for the day', k: 4, d: 2.5, c: C.bear }, { t: 'Prepare primary & alternative scenario', k: 5, hl: true }]
      }),
      L.schem({
        label: '2C · PRIMARY & ALTERNATIVE SCENARIO', kicker: 'INTRADAY SOP · 2C', title: 'Two scenarios, written before the open',
        cues: ['Contoh dua senario yang ditulis sebelum sesi.',
          'Senario A, iaitu senario utama: Daily bullish. Jika harga menyapu Sell-Side Liquidity di bawah PDL dan menunjukkan pengesahan, kita cari peluang beli ke arah PDH.',
          'Senario B, iaitu alternatif: jika 1H ditutup di bawah higher low utama, bias bullish dibatalkan. Tiada peluang beli; kita menunggu atau menilai semula.',
          'Dengan dua senario, keputusan semasa sesi menjadi pemilihan antara pelan yang telah ditulis, bukan reaksi spontan.'],
        panels: [
          { k: 1, title: 'SCENARIO A · PRIMARY', pts: [[0, .6], [.15, .4], [.25, .5], [.38, .25], [.44, .12], [.55, .45], [.65, .38], [.8, .7], [1, .9]], lines: [{ x1: .3, x2: 1, y: .2, c: C.liq, label: 'PDL · SSL', k: 1, d: .8 }, { x1: 0, x2: 1, y: .92, c: C.liq, label: 'PDH · BSL', k: 1, d: 1.3 }], labels: [{ i: 4, t: 'SWEEP', c: C.liq, pos: 'below', k: 1, d: 2 }], cap: 'Sweep below PDL + confirmation → look for longs to PDH', capk: 1, capd: 3 },
          { k: 2, title: 'SCENARIO B · ALTERNATIVE', color: C.bear, pts: [[0, .7], [.15, .5], [.25, .6], [.38, .4], [.5, .45], [.62, .25], [.72, .3], [.85, .12], [1, .08]], lines: [{ x1: .3, x2: 1, y: .38, c: C.amber, label: '1H HL · invalidation', k: 2, d: .8 }], cap: '1H close below major HL → bullish bias invalid · no longs', capk: 2, capd: 3, capc: '#ef5350' }
        ]
      }),
      L.cards({
        label: '2D · DIRECTIONAL BIAS', kicker: 'INTRADAY SOP · 2D', title: 'Intraday directional bias', cols: 3, h: 230,
        cues: ['Seterusnya, bias arah intraday.',
          'Bias bullish: struktur Daily dan 4H naik, dan harga berada di discount atau berhampiran POI bullish.',
          'Bias bearish ialah sebaliknya. Bias neutral bermaksud konteks tidak jelas, dan saiz atau kekerapan dagangan dikurangkan, atau tiada dagangan langsung.',
          'Penjajaran antara timeframe tinggi dan intraday meningkatkan kejelasan, tetapi tidak menjamin hasil.',
          'Draw on Liquidity ialah sasaran liquidity yang dijangka menarik harga, contohnya PDH, iaitu satu hipotesis dan bukan kepastian.',
          'Setiap bias mesti ada syarat pembatalan, contohnya penutupan 1H di bawah higher low utama.'],
        cards: [{ n: 'BULLISH', t: 'Bullish bias', b: 'Daily / 4H up · price in discount or at a bullish POI.', c: C.bull, k: 1 }, { n: 'BEARISH', t: 'Bearish bias', b: 'Daily / 4H down · price in premium or at a bearish POI.', c: C.bear, k: 2 }, { n: 'NEUTRAL', t: 'Neutral bias', b: 'Unclear context → reduce activity or stand aside.', c: C.text, k: 2, d: 3 },
        { n: 'ALIGN', t: 'HTF ↔ intraday alignment', b: 'Adds clarity · no guarantee.', c: C.liq, k: 3 }, { n: 'DOL', t: 'Draw on Liquidity', b: 'Likely liquidity objective — a hypothesis.', c: C.liq, k: 4 }, { n: 'INVALID', t: 'Bias invalidation', b: 'e.g. 1H close below the major HL.', c: C.amber, k: 5 }]
      }),
      L.schem({
        label: '2D · DEALING RANGE · PREMIUM & DISCOUNT', kicker: 'INTRADAY SOP · 2D', title: 'Daily dealing range · Premium & Discount',
        cues: ['Dealing range harian dibina dari swing low ke swing high yang dipilih.',
          'Garisan lima puluh peratus ialah equilibrium. Kawasan di atasnya ialah premium, dan di bawahnya discount.',
          'Dalam bias bullish, kita lebih berminat membeli di kawasan discount, berhampiran POI dan Sell-Side Liquidity.',
          'Draw on Liquidity dalam contoh ini ialah Buy-Side Liquidity di atas range high, iaitu potensi sasaran yang bertentangan.'],
        panels: [{
          k: 0, d: .3, title: 'FCPO · 1H · HYPOTHETICAL', dur: 2.6, pts: [[0, .08], [.15, .45], [.25, .35], [.42, .92], [.55, .6], [.65, .7], [.75, .3], [.85, .4], [1, .62]],
          zones: [{ x1: .42, x2: 1, y1: .5, y2: .92, c: C.bear, label: 'PREMIUM', k: 1, d: .5 }, { x1: .42, x2: 1, y1: .08, y2: .5, c: C.bull, label: 'DISCOUNT', k: 1, d: 1.2 }],
          lines: [{ x1: 0, x2: 1, y: .5, c: C.amber, label: '50% · EQUILIBRIUM', k: 1 }, { x1: .42, x2: 1, y: .97, c: C.liq, label: 'BSL · DRAW ON LIQUIDITY', k: 3 }],
          labels: [{ i: 6, t: 'BUY ZONE?', c: C.bull, pos: 'below', k: 2, d: 1 }]
        }],
        side: { k: 2, kicker: 'BULLISH BIAS', title: 'Buy in discount, target liquidity', items: [{ t: 'Range: swing low → swing high', c: C.text, k: 2, d: .5 }, { t: 'Prefer longs below 50%', c: C.bull, k: 2, d: 2 }, { t: 'DOL: BSL above the range high', c: C.liq, k: 3 }] }
      }),
      L.schem({
        label: '2D · WHEN BIAS CHANGES', kicker: 'INTRADAY SOP · 2D', title: 'Change bias on information — not on noise',
        cues: ['Bilakah bias intraday patut berubah?',
          'Di kiri, beberapa candle 5M bergerak melawan bias, tetapi struktur 1H kekal. Ini hingar, dan bias tidak perlu ditukar.',
          'Di kanan, 1H ditutup di bawah higher low utama, iaitu syarat pembatalan yang telah ditulis. Ini maklumat baharu yang bermakna.',
          'Bias boleh berubah apabila maklumat harga yang bermakna muncul, tetapi bukan kerana setiap pergerakan kecil pada timeframe rendah.'],
        panels: [
          { k: 1, title: '5M NOISE · BIAS UNCHANGED', pts: [[0, .3], [.15, .55], [.25, .45], [.35, .62], [.42, .5], [.5, .44], [.58, .5], [.66, .42], [.75, .6], [.88, .72], [1, .85]], lines: [{ x1: 0, x2: 1, y: .3, c: C.amber, label: '1H HL', k: 1, d: .8 }], cap: 'Counter-moves above the 1H HL · keep the plan', capk: 1, capd: 2.5 },
          { k: 2, title: 'INVALIDATION HIT · BIAS CHANGES', color: C.bear, pts: [[0, .7], [.15, .55], [.25, .62], [.38, .42], [.48, .48], [.6, .2], [.7, .26], [.85, .1], [1, .06]], lines: [{ x1: 0, x2: 1, y: .35, c: C.amber, label: '1H HL', k: 2, d: .8 }], labels: [{ i: 5, t: '1H CLOSE BELOW', c: C.bear, pos: 'below', k: 2, d: 2 }], cap: 'Pre-written invalidation met · stand aside / re-plan', capk: 2, capd: 3, capc: '#ef5350' }
        ]
      }),
      L.flow({
        label: '2E · SETUP IDENTIFICATION', kicker: 'INTRADAY SOP · 2E', title: 'Combining the components', per: 4, bh: 120,
        cues: ['Setup intraday menggabungkan beberapa komponen.',
          'Konteks timeframe tinggi, kemudian struktur pasaran 1H atau 30M.',
          'Liquidity, dan POI yang dipilih.',
          'Premium atau Discount, displacement dan FVG.',
          'Gabungan ini membentuk hipotesis. Ia belum lagi entry.'],
        steps: [{ t: 'HTF context', s: 'DAILY · 4H', c: C.blue, k: 1 }, { t: 'Market structure', s: '1H · 30M', c: C.amber, k: 1, d: 2 }, { t: 'Liquidity', s: 'BSL · SSL · PDH · PDL', c: C.liq, k: 2 }, { t: 'POI', s: 'OB · FVG · BB · S&D', c: C.poi, k: 2, d: 1.5 },
        { t: 'Premium / Discount', s: 'DEALING RANGE', c: C.amber, k: 3 }, { t: 'Displacement', s: 'STRUCTURE BREAK', c: C.green, k: 3, d: 1.2 }, { t: 'FVG', s: 'EXECUTION ZONE', c: C.blue, k: 3, d: 2.4 }, { t: 'Trading hypothesis', s: 'NOT YET AN ENTRY', c: C.bear, k: 4 }]
      }),
      L.table({
        label: '2E · POTENTIAL SETUP vs ACTIONABLE ENTRY', kicker: 'INTRADAY SOP · 2E', title: 'Potential setup vs actionable entry',
        cues: ['Apakah beza antara setup yang berpotensi dengan entry yang boleh dilaksanakan?',
          'Kedua-duanya memerlukan konteks dan lokasi yang betul.',
          'Tetapi entry yang boleh dilaksanakan juga memerlukan interaksi liquidity, MSS dan displacement pada timeframe yang dipilih.',
          'Ia juga memerlukan execution zone yang jelas, invalidation yang jelas, dan risk-to-reward yang telah dikira.',
          'Jika satu syarat belum dipenuhi, setup kekal sebagai pemerhatian, bukan dagangan.'],
        cols: ['Criterion', 'Potential setup', 'Actionable entry'], colw: ['40%', '30%', '30%'], colColor: [null, '#9aa8be', '#34d399'],
        rows: [['HTF context & bias', '✓', '✓'], ['Price at selected POI', '✓', '✓'], ['Liquidity interaction', '—', '✓'], ['MSS + displacement', '—', '✓'], ['Clear execution zone', '—', '✓'], ['Invalidation + RR calculated', '—', '✓']],
        rowK: [[1, 0], [1, 1.5], [2, 0], [2, 2.5], [3, 0], [3, 2.5]], note: { t: 'One condition missing → keep watching. It is not a trade yet.', k: 4, y: 660 }
      }),
      L.kc({
        qs: [{ q: 'Why should each trading style have its own SOP?', a: 'Invalidation, targets, relative costs, monitoring and position size differ between styles.', qs: 'Soalan satu: kenapa setiap gaya trading perlu mempunyai SOP sendiri?', as: 'Jawapan: invalidation, sasaran, kos relatif, pemantauan dan saiz posisi berbeza bagi setiap gaya.' },
        { q: 'What decides the intraday holding period?', a: 'The trading plan (close-out rule) — not the chart timeframe.', qs: 'Soalan dua: apakah yang menentukan tempoh pegangan intraday?', as: 'Jawapan: trading plan, iaitu peraturan tutup posisi, dan bukan timeframe carta.' },
        { q: 'When should an intraday bias change?', a: 'When the pre-written invalidation is met or meaningful new information appears — not on every 5M move.', qs: 'Soalan tiga: bilakah bias intraday patut berubah?', as: 'Jawapan: apabila syarat pembatalan yang ditulis dipenuhi, atau maklumat baharu yang bermakna muncul, bukan pada setiap pergerakan 5M.' }]
      }),
      L.summary({
        title: 'Video 04 — what to remember', points: [
          { t: 'Intraday = same-day exposure · close-out rule written in the plan', s: 'Intraday bermaksud pendedahan dalam hari yang sama, dengan peraturan tutup posisi yang ditulis dalam pelan.' },
          { t: 'Daily/4H context · 1H/30M setup · 15M location · 5M entry', s: 'Konteks Daily dan 4H, setup 1H dan 30M, lokasi 15M, dan entry 5M.' },
          { t: 'Bias + dealing range + DOL + invalidation · primary & alternative scenario', s: 'Bias, dealing range, Draw on Liquidity dan syarat pembatalan, bersama senario utama dan alternatif.' },
          { t: 'A potential setup is not an actionable entry', s: 'Setup yang berpotensi belum lagi entry yang boleh dilaksanakan.' }]
      }),
      L.exercise({
        title: 'Exercise 2 · Part A — Intraday plan', steps: [
          { t: 'Daily / 4H analysis', b: 'Mark structure, major liquidity, PDH/PDL, dealing range & 50%, and 2 POIs.', s: 'Analisis carta Daily dan 4H: tandakan struktur, liquidity utama, PDH dan PDL, dealing range dan garisan 50 peratus, serta dua POI.' },
          { t: 'Write two scenarios', b: 'Primary & alternative, each with trigger, target, invalidation, and the close-out time.', s: 'Tulis senario utama dan alternatif, setiap satu dengan pencetus, sasaran, syarat pembatalan dan masa tutup posisi.' }]
      }),
      L.upnext({ video: 'VIDEO 05', title: 'Intraday SOP · Execution & Management', items: ['15-step intraday execution SOP', 'Bullish case with partials · bearish case', 'Session-end exits · no-trade conditions · mistakes'], say: 'Dalam Video 5, kita laksanakan Intraday SOP: lima belas langkah, kajian kes bullish dan bearish, pengurusan posisi, dan keadaan tidak trade.' }),
      L.refs({ items: [L.REF.bursa, L.REF.murphy, L.REF.pring, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 5.', next: 'Seterusnya: Video 05 — Intraday SOP · Execution & Management' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
