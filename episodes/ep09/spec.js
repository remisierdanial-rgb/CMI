/* CMI SMC Level 9 — VIDEO 09: Entry Confirmation · Complete Methodology (Subtopic 4 · A–G) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  // three-candle FVG demos (hypothetical, valid OHLC)
  const BULL = [[4497, 4500, 4495, 4499], [4499, 4501, 4497, 4500], [4500, 4503, 4498, 4502], [4502, 4515, 4501, 4514], [4514, 4518, 4508, 4516], [4516, 4519, 4512, 4517]];
  const BEAR = [[4513, 4515, 4510, 4511], [4511, 4513, 4509, 4510], [4510, 4512, 4507, 4508], [4508, 4509, 4495, 4496], [4496, 4502, 4492, 4494], [4494, 4498, 4491, 4493]];
  const fvgScene = {
    label: '4B · STAGE 4 · FAIR VALUE GAP', hold: .6,
    cues: ['Tahap empat: Fair Value Gap. FVG ialah corak tiga candle.',
      'FVG bullish: low candle ketiga, 4,508, berada di atas high candle pertama, 4,503. Ruang di antaranya, 4,503 hingga 4,508, tidak bertindih dengan mana-mana sumbu candle.',
      'FVG bearish ialah sebaliknya: high candle ketiga, 4,502, berada di bawah low candle pertama, 4,507.',
      'Candle tengah ialah candle displacement. FVG boleh menjadi kawasan retracement yang berpotensi untuk entry.',
      'Ia berbeza daripada price gap biasa antara sesi. FVG wujud di dalam pergerakan yang berterusan.'],
    build(S) {
      const mk = (cs, x, title, z, side, k) => {
        const ch = S.chart({ name: title, x, y: 21, w: 914, h: 640, candles: cs, yMin: 4486, yMax: 4524, step: 10, slots: 9, title: `FCPO · 5M · ${title}`, at: S.at(k, -.3) });
        ch.reveal(1, S.at(k, .2), .3); ch.reveal(4, S.at(k, 1.2), .7); ch.reveal(5, S.at(k, 3.6), .3);
        ch.marker({ i: 2, p: side > 0 ? cs[2][1] : cs[2][2], c: C.text, t: '1', pos: side > 0 ? 'below' : 'above', at: S.at(k, 1.6) });
        ch.marker({ i: 3, p: side > 0 ? cs[3][1] : cs[3][2], c: C.amber, t: '2', pos: side > 0 ? 'above' : 'below', at: S.at(k, 2.2) });
        ch.marker({ i: 4, p: side > 0 ? cs[4][2] : cs[4][1], c: C.text, t: '3', pos: side > 0 ? 'above' : 'below', dx: 18, at: S.at(k, 2.6) });
        ch.zone({ p1: z[0], p2: z[1], from: 2, to: 'end', c: C.blue, label: `${side > 0 ? 'BULLISH' : 'BEARISH'} FVG ${z[0].toLocaleString('en-US')}–${z[1].toLocaleString('en-US')}`, lx: 'right', lpos: side > 0 ? undefined : 'below', at: S.at(k, 3.2) });
      };
      mk(BULL, 36, 'BULLISH FVG', [4503, 4508], 1, 1); mk(BEAR, 970, 'BEARISH FVG', [4502, 4507], -1, 2);
      S.el('<div class="body" style="font-size:24px;color:#9aa8be">Candle 2 = displacement · gap between candle 1 and candle 3 wicks · not a session price gap</div>', { x: 36, y: 690, w: 1840 }, { at: S.at(3) });
    }
  };
  const EPISODE = {
    id: 'ep09', video: 'VIDEO 09', title: 'Entry Confirmation · Complete Methodology',
    scenes: [
      L.title({
        kicker: 'VIDEO 09 · LEVEL 9 · SUBTOPIC 4 · ENTRY CONFIRMATION', title: 'Entry Confirmation', sub: 'Liquidity → MSS → Displacement → FVG → Plan',
        cues: ['Selamat datang ke Video 9, subtopik keempat: Entry Confirmation.',
          'Subtopik ini menghubungkan lokasi dengan tindakan, iaitu bila sesuatu POI menjadi entry yang mempunyai alasan.',
          'Kita akan belajar urutan pengesahan CMI lima tahap, satu demi satu.',
          'Kemudian dua demonstrasi penuh, empat model entry, senario pengesahan palsu, dan senarai semak CMI.'],
        obj: [{ t: 'Separate a POI from an entry trigger', k: 1 }, { t: 'Apply the 5-stage CMI confirmation sequence', k: 2 }, { t: 'Compare four entry models', k: 3 }, { t: 'Recognise false confirmation & use the checklist', k: 3, d: 2.5 }],
        schem: { k: 1, pts: [[0, .7], [.15, .5], [.25, .58], [.38, .3], [.45, .12], [.55, .5], [.62, .65], [.72, .52], [.85, .75], [1, .92]], labels: [{ i: 4, t: 'LIQ', c: C.liq, pos: 'below', k: 2 }, { i: 6, t: 'MSS', c: C.amber, k: 2, d: .6 }], zones: [{ x1: .6, x2: 1, y1: .45, y2: .56, c: C.blue, label: 'FVG', k: 2, d: 1.2 }] }
      }),
      L.bullets({
        label: '4A · WHAT IS ENTRY CONFIRMATION', kicker: 'ENTRY CONFIRMATION · 4A', title: 'Location is not a trigger',
        cues: ['Apakah entry confirmation? Ia ialah sekumpulan syarat yang mesti berlaku di lokasi yang dipilih sebelum entry dibenarkan, mengikut metodologi yang ditetapkan.',
          'POI ialah lokasi. Entry trigger ialah peristiwa yang berlaku di lokasi itu.',
          'Harga menyentuh Order Block bukan pengesahan. Harga mungkin terus menembusinya.',
          'Lokasi, liquidity, struktur dan displacement mesti dinilai bersama, bukan secara berasingan.',
          'Entry agresif masuk di POI tanpa menunggu. Entry pengesahan menunggu syarat dipenuhi, biasanya dengan harga yang kurang baik tetapi lebih banyak bukti.',
          'Pengesahan mengurangkan sesetengah ketidakpastian, tetapi tidak menghapuskan risiko trading.'],
        items: [{ t: 'POI = location · trigger = event at the location', c: C.poi, k: 1 }, { t: 'Touching an OB is not confirmation', c: C.bear, k: 2 }, { t: 'Evaluate location + liquidity + structure + displacement together', c: C.liq, k: 3 }, { t: 'Aggressive entry vs confirmation-based entry', c: C.amber, k: 4 }],
        side: { k: 5, kicker: 'LIMIT', kc: '#ef5350', title: 'Confirmation reduces some uncertainty — it never removes risk' }
      }),
      L.flow({
        label: '4B · THE CORE CMI SEQUENCE', kicker: 'ENTRY CONFIRMATION · 4B', title: 'The core CMI entry confirmation sequence', per: 5, bh: 150, y0: 230,
        cues: ['Inilah urutan pengesahan teras CMI.',
          'Tahap satu: interaksi liquidity. Tahap dua: Market Structure Shift atau change of character.',
          'Tahap tiga: displacement. Tahap empat: FVG atau execution zone.',
          'Tahap lima: perancangan entry, iaitu entry, stop-loss, sasaran, risk-to-reward dan saiz posisi.',
          'Urutan ini penting. Jika satu tahap tidak berlaku, pengesahan tidak lengkap.'],
        steps: [{ t: 'Liquidity interaction', s: 'STAGE 1', c: C.liq, k: 1 }, { t: 'MSS / CHoCH', s: 'STAGE 2', c: C.amber, k: 1, d: 2 }, { t: 'Displacement', s: 'STAGE 3', c: C.green, k: 2 }, { t: 'FVG / execution zone', s: 'STAGE 4', c: C.blue, k: 2, d: 2 }, { t: 'Entry planning', s: 'STAGE 5', c: C.text, k: 3 }],
        note: { t: 'A missing stage = incomplete confirmation.', k: 4, y: 470 }
      }),
      L.cards({
        label: '4B · STAGE 1 · LIQUIDITY INTERACTION', kicker: 'STAGE 1 · LIQUIDITY', title: 'Liquidity interaction', cols: 4, h: 190,
        cues: ['Tahap satu: interaksi liquidity.',
          'Rujukan liquidity yang biasa: Buy-Side dan Sell-Side Liquidity, Equal Highs dan Equal Lows.',
          'Session high dan low, serta PDH dan PDL.',
          'Interaksi yang dicari ialah liquidity sweep: harga melepasi aras dan ditutup semula di dalam julat.',
          'Bezakan dengan breakout, di mana harga ditutup dan diterima di luar aras. Breakout menyokong kesinambungan, bukan reversal.'],
        cards: [{ n: 'BSL', t: 'Buy-Side Liquidity', c: C.liq, k: 1 }, { n: 'SSL', t: 'Sell-Side Liquidity', c: C.liq, k: 1, d: 1 }, { n: 'EQH', t: 'Equal Highs', c: C.liq, k: 1, d: 2.5 }, { n: 'EQL', t: 'Equal Lows', c: C.liq, k: 1, d: 3.5 },
        { n: 'SESSION', t: 'Session high / low', c: C.amber, k: 2 }, { n: 'PDH · PDL', t: 'Previous day high / low', c: C.amber, k: 2, d: 1.5 }, { n: 'SWEEP', t: 'Through & close back inside', c: C.green, k: 3 }, { n: 'BREAKOUT', t: 'Close & accept outside', c: C.bear, k: 4 }]
      }),
      L.schem({
        label: '4B · STAGE 2 · MARKET STRUCTURE SHIFT', kicker: 'STAGE 2 · STRUCTURE', title: 'MSS / CHoCH — bullish and bearish',
        cues: ['Tahap dua: anjakan struktur.',
          'MSS bullish: selepas sweep Sell-Side Liquidity, harga ditutup di atas lower high terakhir. Struktur dalaman berubah daripada bearish kepada bullish.',
          'MSS bearish ialah sebaliknya: selepas sweep Buy-Side Liquidity, harga ditutup di bawah higher low terakhir.',
          'Pecahan struktur mesti dinilai dalam konteks. MSS pada 5M yang melawan trend 1H yang kuat mempunyai bukti yang lebih lemah. BOS pula mengesahkan kesinambungan, bukan perubahan.'],
        panels: [
          { k: 1, title: 'BULLISH MSS', pts: [[0, .9], [.12, .6], [.22, .7], [.35, .42], [.45, .5], [.55, .25], [.6, .1], [.7, .45], [.78, .6], [.86, .5], [1, .8]], lines: [{ x1: .4, x2: .9, y: .5, c: C.amber, label: 'LH', k: 1, d: 1 }, { x1: .3, x2: 1, y: .2, c: C.liq, label: 'SSL', k: 1, d: .5 }], labels: [{ i: 6, t: 'SWEEP', c: C.liq, pos: 'below', k: 1, d: 1.5 }, { i: 8, t: 'MSS', c: C.amber, k: 1, d: 2.5 }], cap: 'Sweep SSL → close above last LH', capk: 1, capd: 3 },
          { k: 2, title: 'BEARISH MSS', color: C.bear, pts: [[0, .1], [.12, .4], [.22, .3], [.35, .58], [.45, .5], [.55, .75], [.6, .9], [.7, .55], [.78, .4], [.86, .5], [1, .2]], lines: [{ x1: .4, x2: .9, y: .5, c: C.amber, label: 'HL', k: 2, d: 1 }, { x1: .3, x2: 1, y: .8, c: C.liq, label: 'BSL', k: 2, d: .5 }], labels: [{ i: 6, t: 'SWEEP', c: C.liq, k: 2, d: 1.5 }, { i: 8, t: 'MSS', c: C.amber, pos: 'below', k: 2, d: 2.5 }], cap: 'Sweep BSL → close below last HL', capk: 2, capd: 3 }
        ], note: { t: 'Evaluate every break in context: internal vs external, with or against the HTF trend.', k: 3, y: 730 }
      }),
      L.schem({
        label: '4B · STAGE 3 · DISPLACEMENT', kicker: 'STAGE 3 · DISPLACEMENT', title: 'Displacement vs ordinary volatility',
        cues: ['Tahap tiga: displacement.',
          'Displacement ialah pengembangan harga yang berarah: badan candle yang kuat, julat yang mengembang, dan pecahan struktur yang relevan.',
          'Volatiliti biasa juga boleh menghasilkan candle besar, tetapi ia tidak memecah struktur, dan sering berbalik dengan cepat.',
          'Penting: displacement tidak membuktikan identiti peserta pasaran. Ia hanya ciri pergerakan harga yang kita gunakan dalam model.'],
        panels: [
          { k: 1, title: 'DISPLACEMENT', pts: [[0, .3], [.15, .35], [.25, .28], [.35, .33], [.42, .3], [.55, .82], [.65, .78], [.8, .85], [1, .9]], lines: [{ x1: 0, x2: 1, y: .5, c: C.amber, label: 'STRUCTURE', k: 1, d: .8 }], labels: [{ i: 5, t: 'STRONG BODY · BREAKS STRUCTURE', c: C.bull, k: 1, d: 2.2 }], cap: 'Range expansion through relevant structure', capk: 1, capd: 3 },
          { k: 2, title: 'ORDINARY VOLATILITY', color: C.text, pts: [[0, .35], [.15, .4], [.25, .3], [.35, .38], [.45, .32], [.52, .62], [.58, .34], [.7, .4], [.85, .33], [1, .38]], lines: [{ x1: 0, x2: 1, y: .72, c: C.amber, label: 'STRUCTURE', k: 2, d: .8 }], labels: [{ i: 5, t: 'SPIKE · NO BREAK', c: C.amber, k: 2, d: 1.6 }], cap: 'Large candle, no structural break, quickly reversed', capk: 2, capd: 2.5 }
        ], note: { t: 'Displacement does not establish the identity of market participants.', k: 3, y: 730 }
      }),
      fvgScene,
      L.cards({
        label: '4B · STAGE 4 · FVG RULES', kicker: 'STAGE 4 · FVG', title: 'Using FVGs correctly', cols: 2, h: 220,
        cues: ['Empat peraturan FVG.',
          'Satu: FVG ialah kawasan retracement yang berpotensi, bukan isyarat beli atau jual dengan sendirinya.',
          'Dua: tidak semua FVG boleh didagangkan. FVG mesti berada dalam urutan yang betul dan di lokasi yang betul.',
          'Tiga: FVG tidak perlu diisi. Harga boleh terus bergerak tanpa kembali, dan dalam kes itu, entry limit tidak terisi.',
          'Empat: FVG berbeza daripada price gap biasa antara sesi.'],
        cards: [{ n: '01', t: 'A potential retracement area', b: 'Not a signal on its own.', c: C.blue, k: 1 }, { n: '02', t: 'Not every FVG is tradable', b: 'Needs sequence + location + context.', c: C.amber, k: 2 }, { n: '03', t: 'An FVG does not need to fill', b: 'No retrace → no fill → no trade.', c: C.bear, k: 3 }, { n: '04', t: 'FVG ≠ session price gap', b: 'Three-candle imbalance inside continuous trading.', c: C.liq, k: 4 }]
      }),
      L.cards({
        label: '4B · STAGE 5 · ENTRY PLANNING', kicker: 'STAGE 5 · PLANNING', title: 'Entry planning — eight items', cols: 4, h: 190,
        cues: ['Tahap lima: perancangan entry. Lapan perkara mesti jelas sebelum order dihantar.',
          'Harga entry, dan syarat entry, contohnya order limit di dalam FVG.',
          'Stop-loss dan invalidation, iaitu apa yang membatalkan tesis.',
          'Sasaran, risk-to-reward, dan saiz posisi.',
          'Dan pelaksanaan order. Order limit mungkin tidak terisi. Order market dan stop boleh terisi pada harga yang berbeza akibat slippage.'],
        cards: [{ n: '01', t: 'Entry price', c: C.text, k: 1 }, { n: '02', t: 'Entry condition', c: C.text, k: 1, d: 1.5 }, { n: '03', t: 'Stop-loss', c: C.bear, k: 2 }, { n: '04', t: 'Invalidation', c: C.bear, k: 2, d: 1 },
        { n: '05', t: 'Target', c: C.bull, k: 3 }, { n: '06', t: 'Risk-to-reward', c: C.amber, k: 3, d: 1 }, { n: '07', t: 'Position size', c: C.amber, k: 3, d: 2 }, { n: '08', t: 'Order execution', b: 'Limit may not fill · market/stop can slip.', c: C.liq, k: 4 }]
      }),
      ...L.example({
        label: '4C · BULLISH CONFIRMATION', kicker: '4C · BULLISH DEMONSTRATION', dir: 1, E: 4455, R: 12, tail: 'tp', n: 1, entryTF: '5M', setupTF: '15M',
        context: ['HTF · potentially bullish'],
        intro: 'Demonstrasi pengesahan bullish lengkap. Konteks timeframe tinggi berpotensi bullish, dan harga menghampiri POI bullish yang dipilih.'
      }),
      ...L.example({
        label: '4D · BEARISH CONFIRMATION', kicker: '4D · BEARISH DEMONSTRATION', dir: -1, E: 4733, R: 10, tail: 'nofill', n: 1, entryTF: '5M', setupTF: '15M',
        context: ['HTF · potentially bearish'],
        intro: 'Demonstrasi pengesahan bearish. Konteks timeframe tinggi berpotensi bearish, dan harga menghampiri POI bearish yang dipilih.'
      }),
      L.table({
        label: '4E · ENTRY MODELS (1/2)', kicker: 'ENTRY CONFIRMATION · 4E', title: 'Four entry models — logic, advantages, risks',
        cues: ['Empat model entry. Tiada satu model yang sentiasa terbaik.',
          'Model satu: entry agresif di POI. Order diletakkan di zon tanpa menunggu pengesahan. Harga lebih baik, tetapi risiko zon ditembusi lebih tinggi.',
          'Model dua: entry pengesahan selepas MSS. Masuk selepas anjakan struktur. Bukti lebih banyak, tetapi harga entry lebih jauh dan RR lebih kecil.',
          'Model tiga: displacement dan retracement ke FVG. Ini model yang digunakan dalam contoh kita. Lokasi dan invalidation jelas, tetapi harga mungkin tidak kembali.',
          'Model empat: break and retest, hanya jika ia sebahagian daripada metodologi CMI yang ditetapkan. Ia menunggu ujian semula aras yang dipecahkan, tetapi ujian semula sering gagal atau tidak berlaku.'],
        cols: ['Model', 'Conditions & logic', 'Potential advantage', 'Main risk'], colw: ['22%', '30%', '24%', '24%'], fs: 21, colColor: [null, null, '#26a69a', '#ef5350'],
        rows: [['1 · Aggressive POI', 'Limit at the POI, no LTF confirmation', 'Best price · largest RR', 'Zone breaks · no reaction'], ['2 · Confirmation after MSS', 'Enter after the structure shift', 'More evidence', 'Later price · smaller RR'], ['3 · Displacement + FVG retrace', 'Limit in FVG after MSS + displacement', 'Clear location & invalidation', 'No retrace → no fill'], ['4 · Break-and-retest*', 'Retest of the broken level', 'Defined level', 'Retest fails or never comes']],
        rowK: [1, 2, 3, 4], tag: { t: '* ONLY IF PART OF THE ESTABLISHED CMI METHODOLOGY · PENDING CMI CONFIRMATION', k: 4, d: 3, y: 600 }
      }),
      L.table({
        label: '4E · ENTRY MODELS (2/2)', kicker: 'ENTRY CONFIRMATION · 4E', title: 'Invalidation, suitable conditions, common mistakes',
        cues: ['Bagi setiap model, invalidation, keadaan yang sesuai, dan kesilapan biasa.',
          'Model agresif sesuai apabila konteks sangat jelas, dengan invalidation di luar zon. Kesilapan biasa: menggunakannya melawan trend.',
          'Model pengesahan sesuai apabila pasaran bergerak laju. Kesilapan biasa: mengejar harga selepas pecahan.',
          'Model FVG sesuai apabila displacement bersih. Kesilapan biasa: mendagangkan setiap FVG, termasuk di lokasi yang salah.',
          'Model break and retest sesuai dalam pasaran yang trending. Kesilapan biasa: mengelirukan sweep dengan breakout.'],
        cols: ['Model', 'Invalidation', 'Suitable when', 'Common mistake'], colw: ['22%', '26%', '26%', '26%'], fs: 21,
        rows: [['1 · Aggressive POI', 'Beyond the POI', 'Very clear HTF context', 'Using it counter-trend'], ['2 · After MSS', 'Beyond the sweep extreme', 'Fast-moving markets', 'Chasing after the break'], ['3 · FVG retrace', 'Beyond the sweep / FVG origin', 'Clean displacement', 'Trading every FVG'], ['4 · Break-and-retest*', 'Back inside the broken level', 'Trending conditions', 'Confusing sweep with breakout']],
        rowK: [1, 2, 3, 4]
      }),
      L.cards({
        label: '4F · FALSE CONFIRMATION', kicker: 'ENTRY CONFIRMATION · 4F', title: 'Seven false-confirmation scenarios', cols: 4, h: 185, bad: true, tfs: 23,
        cues: ['Pengesahan palsu. Tujuh senario di mana setup kelihatan baik, tetapi tidak lengkap.',
          'Liquidity disapu, tetapi tiada MSS yang bermakna. MSS berlaku, tetapi tanpa displacement.',
          'Displacement berlaku, tetapi harga tidak memberi retracement yang dijangka. FVG terbentuk di lokasi yang tidak sesuai.',
          'Pengesahan timeframe rendah bercanggah dengan konteks timeframe tinggi. Harga memecah struktur, kemudian terus berbalik.',
          'Dan isyarat entry muncul terlalu dekat dengan liquidity bertentangan, jadi ruang ganjaran tidak mencukupi.',
          'Pedagang yang baik sanggup melangkau setup. Melangkau ialah keputusan yang sah dalam SOP.'],
        cards: [{ t: 'Sweep · no meaningful MSS', k: 1 }, { t: 'MSS · no displacement', k: 1, d: 2 }, { t: 'Displacement · no retracement', k: 2 }, { t: 'FVG in an unsuitable location', k: 2, d: 2.5 },
        { t: 'LTF conflicts with HTF context', k: 3 }, { t: 'Break then immediate reversal', k: 3, d: 2.5 }, { t: 'Too close to opposing liquidity', k: 4 }],
        note: { t: 'Skipping is a valid SOP decision.', k: 5, y: 600 }
      }),
      L.bullets({
        label: '4G · CMI CONFIRMATION CHECKLIST', kicker: 'ENTRY CONFIRMATION · 4G', title: 'CMI confirmation checklist', check: true, size: 27,
        cues: ['Senarai semak pengesahan CMI, sembilan soalan.',
          'Adakah konteks arah jelas? Adakah harga berada di POI yang dipilih? Adakah terdapat interaksi liquidity yang bermakna?',
          'Adakah anjakan struktur relevan? Adakah displacement hadir? Adakah execution zone jelas?',
          'Adakah invalidation jelas? Adakah jarak sasaran mencukupi? Adakah risiko dalam had yang ditetapkan?',
          'Senarai semak ialah alat bantu keputusan, bukan jaminan keuntungan.'],
        items: [{ t: 'Directional context clear?', k: 1 }, { t: 'Price at a selected POI?', k: 1, d: 2 }, { t: 'Meaningful liquidity interaction?', k: 1, d: 4 }, { t: 'Relevant structure shift?', k: 2 }, { t: 'Displacement present?', k: 2, d: 2 }, { t: 'Execution zone clearly defined?', k: 2, d: 3.5 }, { t: 'Invalidation clear?', k: 3 }, { t: 'Sufficient target distance?', k: 3, d: 2 }, { t: 'Risk within the predefined limit?', k: 3, d: 4 }],
        side: { k: 4, kicker: 'REMEMBER', kc: '#e8b44c', title: 'A checklist is a decision aid — not a guarantee of profitability', h: 300 }
      }),
      L.kc({
        title: 'Answer before the reveal (1/2)',
        qs: [{ q: 'POI vs entry confirmation?', a: 'POI = location; confirmation = the sequence of events at that location.', qs: 'Soalan satu: apakah beza antara POI dan entry confirmation?', as: 'Jawapan: POI ialah lokasi. Pengesahan ialah urutan peristiwa yang berlaku di lokasi itu.' },
        { q: 'Why is a sweep alone insufficient?', a: 'It can be followed by continuation — no structural evidence of a reaction yet.', qs: 'Soalan dua: kenapa sweep sahaja tidak mencukupi?', as: 'Jawapan: sweep boleh diikuti oleh kesinambungan. Belum ada bukti struktur tentang reaksi.' },
        { q: 'Role of MSS?', a: 'Shows a potential change of direction on the entry timeframe after liquidity.', qs: 'Soalan tiga: apakah peranan MSS?', as: 'Jawapan: ia menunjukkan potensi perubahan arah pada timeframe entry, selepas interaksi liquidity.' }]
      }),
      L.kc({
        title: 'Answer before the reveal (2/2)', start: 4, intro: 'Dua soalan lagi.',
        qs: [{ q: 'Why is displacement important in the CMI model?', a: 'It separates a meaningful shift from noise and often creates the execution zone (FVG).', qs: 'Soalan empat: kenapa displacement penting dalam model CMI?', as: 'Jawapan: ia membezakan anjakan yang bermakna daripada hingar, dan sering mencipta execution zone, iaitu FVG.' },
        { q: 'How does an FVG support entry planning?', a: 'A defined retracement zone for a limit entry with nearby invalidation — it need not fill.', qs: 'Soalan lima: bagaimana FVG membantu perancangan entry?', as: 'Jawapan: ia memberi zon retracement yang jelas untuk entry limit, dengan invalidation yang dekat. Tetapi ia tidak semestinya diisi.' }]
      }),
      L.summary({
        title: 'Video 09 — what to remember', points: [
          { t: 'Liquidity → MSS/CHoCH → Displacement → FVG → Entry planning', s: 'Liquidity, MSS atau change of character, displacement, FVG, kemudian perancangan entry.' },
          { t: 'A POI is a location · a sweep alone is not a trigger', s: 'POI ialah lokasi, dan sweep sahaja bukan pencetus.' },
          { t: 'Four models, each with trade-offs · no model is always best', s: 'Empat model, setiap satu ada kelebihan dan kelemahan. Tiada model yang sentiasa terbaik.' },
          { t: 'No fill, false confirmation, conflict → skip', s: 'Tidak terisi, pengesahan palsu, atau percanggahan konteks: langkau.' }]
      }),
      L.exercise({
        title: 'Exercise 4 — Identify entry confirmation', steps: [
          { t: 'Find 10 setups', b: 'On historical FCPO 5M charts, hide the right side. Mark each of the five stages.', s: 'Cari sepuluh setup pada carta sejarah FCPO 5M, sembunyikan bahagian kanan carta, dan tandakan lima tahap pengesahan.' },
          { t: 'Score with the checklist', b: 'Nine questions → trade or skip. Then reveal and record the result.', s: 'Nilai dengan senarai semak sembilan soalan: trade atau langkau. Kemudian dedahkan dan rekod hasilnya.' }],
        note: 'Worked solution (EP01 chart): docs/06_KNOWLEDGE_CHECK_EXERCISES.md · Exercise 4'
      }),
      L.upnext({ video: 'VIDEO 10', title: 'Stop Loss & Take Profit', items: ['Structural stop-loss · buffer · invalidation', 'Liquidity-based targets · six take-profit methods', 'Full trade-management animation'], say: 'Dalam Video 10, kita belajar Stop Loss dan Take Profit: stop-loss struktur, buffer, invalidation, sasaran berasaskan liquidity, dan enam kaedah take-profit.' }),
      L.refs({ items: [L.REF.ict, L.REF.harris, L.REF.murphy, L.REF.kd] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 10.', next: 'Seterusnya: Video 10 — Stop Loss & Take Profit' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
