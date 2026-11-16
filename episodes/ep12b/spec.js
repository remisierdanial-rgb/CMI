/* CMI SMC Level 9 — VIDEO 12B: Integrated FCPO Case Studies · Part B (Master prompt §7 · CS5–CS8) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep12b', video: 'VIDEO 12B', title: 'Integrated FCPO Case Studies · Part B',
    scenes: [
      L.title({
        kicker: 'VIDEO 12B · LEVEL 9 · INTEGRATED CASE STUDIES', title: 'FCPO Case Studies<br>Part B', sub: 'Swing · Failed setup · No-trade',
        cues: ['Selamat datang ke Video 12B, bahagian kedua kajian kes FCPO.',
          'Kes lima dan enam ialah swing trading, dengan stop yang lebar dan saiz posisi yang kecil.',
          'Kes tujuh ialah setup yang gagal, dan kes lapan ialah senario di mana keputusan terbaik ialah tidak trade.',
          'Dua kes terakhir sama penting dengan kes yang menang.'],
        obj: [{ t: 'Case 5 · swing bullish with sizing', k: 1 }, { t: 'Case 6 · swing bearish', k: 1, d: 2 }, { t: 'Case 7 · a failed setup, recorded per plan', k: 2 }, { t: 'Case 8 · a valid no-trade decision', k: 2, d: 2.5 }]
      }),
      L.calc({
        label: 'CS5 · SIZING FIRST', kicker: 'CASE 5 · SWING BULLISH', title: 'Size before the setup', ptitle: 'HYPOTHETICAL · ACCOUNT RM100,000 · RISK 2% · 1 pt = RM25 / contract', lh: 60, fs: 27,
        cues: ['Kes lima: swing bullish. Dalam swing trading, saiz posisi dikira sebelum menilai setup.',
          { t: 'Akaun hipotetikal RM100,000, dengan risiko dua peratus, iaitu RM2,000.', say: 'Akaun hipotetikal 100,000 ringgit, dengan risiko dua peratus, iaitu 2,000 ringgit.' },
          { t: 'Stop struktur 70 mata darab RM25 ialah RM1,750 setiap kontrak. 2,000 bahagi 1,750 ialah 1.14, dibundarkan ke bawah menjadi satu kontrak.', say: 'Stop struktur 70 mata darab 25 ringgit ialah 1,750 ringgit setiap kontrak. 2,000 bahagi 1,750 ialah 1.14, dibundarkan ke bawah menjadi satu kontrak.' }],
        lines: [{ t: 'Risk budget  100,000 × 2% = RM2,000', k: 1 }, { t: 'Per contract 70 pts × 25 = RM1,750', k: 2 }, { t: 'Size         2,000 ÷ 1,750 = 1.14 → <span class="em">1 contract</span>', k: 2, d: 3 }]
      }),
      ...L.example({ label: 'CS5 · SWING BULLISH', kicker: 'CASE 5 · SWING BULLISH', dir: 1, E: 4060, R: 70, tail: 'tp2', tpU: 4530, n: 1, entryTF: '1H', setupTF: 'Daily / 4H', context: ['Weekly · bullish', 'Daily · discount pullback'], tpName: 'iaitu liquidity bertentangan utama, 3R', intro: 'Weekly bullish, dan Daily menarik balik ke kawasan discount. Sell-Side Liquidity berada di bawah low yang penting.' }),
      ...L.example({ label: 'CS6 · SWING BEARISH', kicker: 'CASE 6 · SWING BEARISH', dir: -1, E: 5120, R: 75, tail: 'tp', n: 1, entryTF: '1H', setupTF: 'Daily / 4H', context: ['Weekly · bearish', 'Daily · premium retracement'], intro: 'Kes enam: swing bearish. Weekly bearish, dan Daily menarik balik ke kawasan premium. Buy-Side Liquidity berada di atas high yang penting.', planExtra: ['Risiko 75 mata, iaitu 1,875 ringgit untuk satu kontrak, berada dalam bajet 2,000 ringgit. Pegangan semalaman telah dinilai untuk risiko event.'] }),
      ...L.example({ label: 'CS7 · FAILED SETUP', kicker: 'CASE 7 · FAILED SETUP', dir: 1, E: 4350, R: 10, tail: 'sl', n: 1, entryTF: '5M', setupTF: '15M', context: ['1H / 30M · potentially bullish'], intro: 'Kes tujuh: setup yang gagal. Semuanya kelihatan sah: POI yang baik, konteks bullish, dan liquidity di bawah.', outcomeExtra: ['Adakah strategi dilaksanakan dengan salah? Tidak. Setiap syarat dipenuhi, saiz betul, dan stop tidak dialihkan. Ini hasil normal sebuah strategi, bukan kesilapan pelaksanaan.'] }),
      L.cards({
        label: 'CS7 · FAILED SETUP vs POOR EXECUTION', kicker: 'CASE 7 · REVIEW', title: 'Failed setup ≠ poor execution', cols: 2, h: 300,
        cues: ['Bezakan setup yang gagal dengan pelaksanaan yang lemah.', 'Setup gagal: semua peraturan diikuti, tetapi pasaran tidak bergerak seperti dijangka. Ini sebahagian normal daripada mana-mana strategi.', 'Pelaksanaan lemah: peraturan dilanggar. Entry awal, stop dialihkan, saiz salah, atau dagangan tanpa pengesahan.', 'Jurnal membolehkan anda membezakan kedua-duanya. Tanpa jurnal, semua kerugian kelihatan sama.'],
        cards: [{ n: 'FAILED SETUP', t: 'Rules followed · market disagreed', b: 'Normal outcome of a strategy. Record it and keep the sample growing.', c: C.amber, k: 1 }, { n: 'POOR EXECUTION', t: 'Rules broken', b: 'Early entry · moved stop · wrong size · no confirmation. Fix the process.', c: C.bear, k: 2 }],
        note: { t: 'Only a journal separates the two.', k: 3, y: 520 }
      }),
      L.schem({
        label: 'CS8 · NO-TRADE SCENARIO', kicker: 'CASE 8 · NO-TRADE', title: 'Everything says wait',
        cues: ['Kes lapan: senario tidak trade.',
          'Konteks bercanggah: 1H bullish, tetapi Daily bearish dan harga berada di kawasan premium.',
          'Harga tidak berinteraksi dengan liquidity yang bermakna, dan lokasi entry berada di tengah julat.',
          'Tiada anjakan struktur dengan displacement. Dan sasaran terdekat hanya beberapa mata, jadi RR tidak mencukupi.',
          'Keputusan: tiada dagangan. Tidak masuk juga satu keputusan trading yang sah, dan ia direkod dalam jurnal.'],
        panels: [{ k: 1, title: 'FCPO · 15M · HYPOTHETICAL', color: C.text, dur: 2.8, pts: [[0, .3], [.1, .55], [.18, .45], [.28, .62], [.36, .5], [.45, .66], [.54, .52], [.62, .64], [.7, .55], [.8, .63], [.9, .56], [1, .6]], zones: [{ x1: 0, x2: 1, y1: .5, y2: .95, c: C.bear, label: 'DAILY PREMIUM', k: 1, d: 1 }], lines: [{ x1: 0, x2: 1, y: .7, c: C.liq, label: 'BSL · only a few pts away', k: 3, d: 1 }] }],
        side: { k: 1, kicker: 'CHECKLIST', title: 'Decision: no trade', items: [{ t: 'Conflicting timeframes', c: C.bear, k: 1, d: 2 }, { t: 'No liquidity interaction', c: C.bear, k: 2 }, { t: 'Poor entry location', c: C.bear, k: 2, d: 2 }, { t: 'No confirmation', c: C.bear, k: 3 }, { t: 'Insufficient RR', c: C.bear, k: 3, d: 2 }, { t: 'Not entering is a valid decision', c: C.green, k: 4 }] }
      }),
      L.kc({
        qs: [{ q: 'Why should traders record losing trades?', a: 'Metrics stay unbiased and execution errors become visible.', qs: 'Soalan satu: kenapa dagangan yang rugi mesti direkod?', as: 'Jawapan: supaya metrik tidak berat sebelah, dan kesilapan pelaksanaan dapat dilihat.' },
        { q: 'Failed setup vs poor execution?', a: 'Failed setup: rules followed, market disagreed. Poor execution: rules broken.', qs: 'Soalan dua: apakah beza antara setup yang gagal dan pelaksanaan yang lemah?', as: 'Jawapan: setup gagal bermaksud peraturan diikuti tetapi pasaran tidak setuju. Pelaksanaan lemah bermaksud peraturan dilanggar.' },
        { q: 'Is "no trade" a trading decision?', a: 'Yes — and it is journaled like any other decision.', qs: 'Soalan tiga: adakah tidak trade satu keputusan trading?', as: 'Jawapan: ya, dan ia direkod dalam jurnal seperti keputusan lain.' }]
      }),
      L.summary({
        title: 'Video 12B — what to remember', points: [
          { t: 'Swing: size first from the wide structural stop', s: 'Swing trading: kira saiz dahulu daripada stop struktur yang lebar.' },
          { t: 'A failed setup is a normal, planned outcome', s: 'Setup yang gagal ialah hasil normal yang telah dirancang.' },
          { t: 'Poor execution is a broken rule — fix the process', s: 'Pelaksanaan lemah bermaksud peraturan dilanggar. Baiki prosesnya.' },
          { t: 'No-trade is a valid decision — journal it too', s: 'Tidak trade ialah keputusan yang sah. Rekodkannya juga.' }]
      }),
      L.exercise({
        title: 'Exercise 9 — Evaluate a failed setup', steps: [
          { t: 'Take Case 7', b: 'Score strategy, execution, risk management and discipline separately.', s: 'Ambil kes tujuh. Nilai kualiti strategi, pelaksanaan, pengurusan risiko dan disiplin secara berasingan.' },
          { t: 'Your own loss', b: 'Pick a real losing trade from your journal. Was it a failed setup or poor execution? Why?', s: 'Kemudian pilih satu dagangan rugi daripada jurnal anda sendiri. Adakah ia setup yang gagal, atau pelaksanaan yang lemah? Kenapa?' }]
      }),
      L.upnext({ video: 'VIDEO 13', title: 'CMI Professional Trading SOP & Final Assessment', items: ['The integrated CMI workflow', 'Checklists · trading journal · performance review', 'Final Level 9 assessment'], say: 'Dalam Video 13, video terakhir Level 9, kita satukan semuanya: aliran kerja CMI, senarai semak, jurnal, penilaian prestasi dan penilaian akhir.' }),
      L.refs({ items: [L.REF.bursa, L.REF.kd, L.REF.harris, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 13.', next: 'Seterusnya: Video 13 — CMI Professional Trading SOP' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
