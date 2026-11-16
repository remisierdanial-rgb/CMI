/* CMI SMC Level 9 — VIDEO 05: Intraday SOP · Execution & Management (Subtopic 2 · F–K) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const EPISODE = {
    id: 'ep05', video: 'VIDEO 05', title: 'Intraday SOP · Execution & Management',
    scenes: [
      L.title({
        kicker: 'VIDEO 05 · LEVEL 9 · SUBTOPIC 2 · INTRADAY SOP', title: 'Intraday SOP<br>Part 2 · Execution', sub: '15-step SOP · Case studies · Management · No-trade',
        cues: ['Selamat datang ke Video 5. Kita lengkapkan Intraday SOP.',
          'Dalam Video 4, kita membina pelan harian: bias, dealing range, dan dua senario.',
          'Hari ini kita laksanakan pelan itu melalui prosedur lima belas langkah, dan dua kajian kes FCPO.',
          'Kita juga akan melihat pengurusan posisi intraday, termasuk partial, peraturan akhir sesi, dan had kerugian harian.'],
        obj: [{ t: 'Apply the 15-step intraday execution SOP', k: 2 }, { t: 'Bullish case with partial exits', k: 2, d: 2.5 }, { t: 'Bearish case with a session-end rule', k: 3 }, { t: 'No-trade conditions & common mistakes', k: 3, d: 3 }]
      }),
      L.sop({
        label: '2F · INTRADAY EXECUTION SOP', kicker: 'INTRADAY SOP · 2F', title: 'Intraday execution SOP · 15 steps', cols: 3, h: 98,
        cues: ['Prosedur pelaksanaan intraday, lima belas langkah.',
          'Satu, lengkapkan analisis Daily dan 4H. Dua, tetapkan hipotesis arah intraday. Tiga, tandakan sasaran liquidity.',
          'Empat, kenal pasti struktur 1H atau 30M. Lima, pilih POI yang relevan. Enam, tunggu harga menghampiri kawasan itu.',
          'Tujuh, perhatikan interaksi liquidity pada 15M. Lapan, tunggu pengesahan yang bermakna. Sembilan, gunakan 5M untuk menilai entry.',
          'Sepuluh, tetapkan stop-loss dan sasaran. Sebelas, kira risk-to-reward. Dua belas, laksanakan mengikut trading plan.',
          'Tiga belas, pantau posisi. Empat belas, tutup atau urus posisi mengikut peraturan sesi yang telah ditetapkan. Lima belas, rekod hasilnya.'],
        steps: [{ t: 'Complete Daily & 4H analysis', k: 1 }, { t: 'Identify intraday directional hypothesis', k: 1, d: 2 }, { t: 'Mark liquidity targets', k: 1, d: 4.5, c: C.liq }, { t: 'Identify 1H / 30M structure', k: 2 }, { t: 'Select relevant POIs', k: 2, d: 2.5, c: C.poi },
        { t: 'Wait for price to approach', k: 2, d: 4.5 }, { t: 'Observe liquidity interaction on 15M', k: 3, c: C.liq }, { t: 'Wait for meaningful confirmation', k: 3, d: 2.5 }, { t: 'Use 5M for entry evaluation', k: 3, d: 4.5, c: C.blue }, { t: 'Define stop-loss & target', k: 4, c: C.bear },
        { t: 'Calculate risk-to-reward', k: 4, d: 2.5 }, { t: 'Execute per the trading plan', k: 4, d: 4.5, c: C.green }, { t: 'Monitor the position', k: 5 }, { t: 'Close / manage per session rules', k: 5, d: 2, c: C.amber, hl: true }, { t: 'Record the result', k: 5, d: 5 }]
      }),
      ...L.example({
        label: '2G · BULLISH INTRADAY', kicker: '2G · BULLISH INTRADAY CASE', dir: 1, E: 4512, R: 18, tail: 'tp2', tp1U: 4510, tpU: 4526.67, n: 2, entryTF: '5M', setupTF: '1H / 30M',
        context: ['Daily / 4H · bullish · in discount', '15M · watching SSL reaction'],
        tpName: 'iaitu Previous Day High, potensi liquidity external',
        intro: 'Kajian kes intraday bullish. Daily dan 4H bullish, dan harga berada di bahagian discount dealing range. Kita merancang dua kontrak.'
      }),
      L.cards({
        label: '2I · INTRADAY TRADE MANAGEMENT', kicker: 'INTRADAY SOP · 2I', title: 'Intraday trade management', cols: 3, h: 165,
        cues: ['Pengurusan dagangan intraday mengandungi beberapa peraturan yang mesti ditetapkan sebelum entry.',
          'Risiko awal ditetapkan dalam ringgit. Partial exit dan pelarasan stop-loss mengikut peraturan, seperti dalam kajian kes tadi.',
          'Trailing stop boleh mengikut struktur 15M. Sasaran boleh dilanjutkan hanya jika peraturan membenarkannya, bukan kerana harapan.',
          'Peraturan akhir sesi: posisi ditutup pada masa yang ditetapkan walaupun sasaran belum dicapai.',
          'Volatiliti luar jangka, contohnya ketika peristiwa berjadual, boleh menjadi alasan untuk keluar lebih awal.',
          'Had kerugian harian maksimum, dan bilangan cubaan maksimum, menghentikan dagangan selepas beberapa kerugian berturut-turut.'],
        cards: [{ n: '01', t: 'Initial risk', b: 'Fixed RM before entry.', c: C.amber, k: 1 }, { n: '02', t: 'Partial exits', b: 'e.g. 50% at 1R.', c: C.bull, k: 1, d: 2 }, { n: '03', t: 'Stop-loss adjustment', b: 'Only per written rule.', c: C.liq, k: 1, d: 4 },
        { n: '04', t: 'Trailing stop', b: 'Behind 15M structure.', c: C.liq, k: 2 }, { n: '05', t: 'Target extension', b: 'Only if the plan allows.', c: C.bull, k: 2, d: 3 }, { n: '06', t: 'Session-end exit', b: 'Close at the set time.', c: C.amber, k: 3 },
        { n: '07', t: 'Unexpected volatility', b: 'Pre-defined early-exit rule.', c: C.bear, k: 4 }, { n: '08', t: 'Max daily loss', b: 'Stop trading for the day.', c: C.bear, k: 5 }, { n: '09', t: 'Max planned attempts', b: 'e.g. 2 attempts per scenario.', c: C.bear, k: 5, d: 2.5 }]
      }),
      ...L.example({
        label: '2H · BEARISH INTRADAY', kicker: '2H · BEARISH INTRADAY CASE', dir: -1, E: 4688, R: 16, tail: 'tp', n: 1, entryTF: '5M', setupTF: '1H / 30M',
        context: ['Daily / 4H · bearish · in premium', '15M · watching BSL reaction'],
        intro: 'Kajian kes intraday bearish. Daily dan 4H bearish, dan harga menarik balik ke bahagian premium. Kita mencari peluang jual.',
        outcomeExtra: ['Jika sasaran belum dicapai pada masa tutup yang ditetapkan, posisi ditutup mengikut peraturan sesi, walaupun stop-loss atau sasaran belum disentuh.']
      }),
      L.cards({
        label: '2J · NO-TRADE CONDITIONS', kicker: 'INTRADAY SOP · 2J', title: 'Intraday no-trade conditions', cols: 4, h: 170, bad: true,
        cues: ['Bila tidak perlu membuat dagangan intraday?',
          'Konteks arah tidak jelas. Harga berada di antara aras penting tanpa setup.',
          'Tiada POI yang sah. Tiada pengesahan entry.',
          'Potensi ganjaran tidak mencukupi. Keadaan pelaksanaan lemah.',
          'Had risiko telah dicapai. Atau masa terlalu hampir dengan akhir sesi, tanpa pelan yang sesuai.'],
        cards: [{ t: 'Unclear directional context', k: 1 }, { t: 'Between key levels · no setup', k: 1, d: 2 }, { t: 'No valid POI', k: 2 }, { t: 'No entry confirmation', k: 2, d: 1.5 },
        { t: 'Insufficient reward potential', k: 3 }, { t: 'Poor execution conditions', k: 3, d: 2 }, { t: 'Risk limit reached', k: 4 }, { t: 'Too close to session end', k: 4, d: 1.5 }]
      }),
      L.cards({
        label: '2K · COMMON MISTAKES', kicker: 'INTRADAY SOP · 2K', title: 'Eight common intraday mistakes', cols: 4, h: 170, bad: true,
        cues: ['Lapan kesilapan intraday yang biasa.',
          'Menganggap setup intraday sebagai isyarat scalping. Mengabaikan konteks Daily.',
          'Memegang posisi melebihi tempoh yang dirancang. Masuk terlalu lewat.',
          'Analisis yang terlalu rumit. Mengubah trading plan semasa dagangan berjalan.',
          'Mengabaikan peristiwa berjadual dan volatiliti. Dan gagal menutup posisi mengikut peraturan tempoh pegangan.'],
        cards: [{ t: 'Treating intraday setups as scalps', k: 1 }, { t: 'Ignoring Daily context', k: 1, d: 2 }, { t: 'Holding beyond the horizon', k: 2 }, { t: 'Entering too late', k: 2, d: 2 },
        { t: 'Overcomplicating analysis', k: 3 }, { t: 'Changing the plan mid-trade', k: 3, d: 2 }, { t: 'Ignoring scheduled events', k: 4 }, { t: 'Not closing per holding rules', k: 4, d: 2.5 }]
      }),
      L.kc({
        qs: [{ q: 'Partials: 1 contract at TP1 (+18), 1 at TP2 (+48), risk RM900 — realised R?', a: '(18 + 48) × 25 = RM1,650 ÷ RM900 = 1.83R (vs 2.67R holding both).', qs: 'Soalan satu: satu kontrak keluar di TP1 dengan tambah 18 mata, satu lagi di TP2 dengan tambah 48 mata, dan risiko awal 900 ringgit. Berapakah R yang direalisasikan?', as: 'Jawapan: 66 mata darab 25 ringgit, iaitu 1,650 ringgit, bahagi 900. Hasilnya 1.83R, berbanding 2.67R jika kedua-dua kontrak dipegang.' },
        { q: 'Target not hit at the close-out time — what happens?', a: 'Close per the session rule. The plan decides, not hope.', qs: 'Soalan dua: sasaran belum dicapai pada masa tutup yang ditetapkan. Apa tindakannya?', as: 'Jawapan: tutup posisi mengikut peraturan sesi. Pelan yang membuat keputusan, bukan harapan.' },
        { q: 'Why record losing trades?', a: 'Without them, win rate, expectancy and drawdown are biased and execution errors stay hidden.', qs: 'Soalan tiga: kenapa dagangan yang rugi perlu direkod?', as: 'Jawapan: tanpanya, win rate, expectancy dan drawdown menjadi berat sebelah, dan kesilapan pelaksanaan tidak dapat dikesan.' }]
      }),
      L.summary({
        title: 'Video 05 — what to remember', points: [
          { t: '15 steps: Daily/4H → 1H/30M → 15M reaction → 5M entry → session rules', s: 'Lima belas langkah: Daily dan 4H, kemudian 1H atau 30M, reaksi 15M, entry 5M, dan peraturan sesi.' },
          { t: 'Partials and BE change realised R — decide them before entry', s: 'Partial dan breakeven mengubah R yang direalisasikan. Tetapkan sebelum entry.' },
          { t: 'Session-end exit, daily loss limit and max attempts protect the account', s: 'Exit akhir sesi, had kerugian harian dan bilangan cubaan maksimum melindungi akaun.' },
          { t: 'Intraday ≠ scalping: respect the Daily context and the holding period', s: 'Intraday bukan scalping. Hormati konteks Daily dan tempoh pegangan.' }]
      }),
      L.exercise({
        title: 'Exercise 2 — Build your Intraday SOP', steps: [
          { t: 'Write the 15 steps', b: 'Each as a yes/no rule, using your Part A plan (bias, scenarios, POIs).', s: 'Tulis lima belas langkah sebagai peraturan ya atau tidak, menggunakan pelan Bahagian A anda.' },
          { t: 'Management & limits', b: 'Partial rule, stop adjustment, close-out time, max daily loss, max attempts.', s: 'Tambah peraturan partial, pelarasan stop, masa tutup posisi, had kerugian harian dan bilangan cubaan maksimum.' },
          { t: 'Forward-test', b: 'Paper-trade 10 sessions. Journal every trade and every skipped setup.', s: 'Uji ke hadapan selama sepuluh sesi secara demo, dan rekod setiap dagangan serta setiap setup yang dilangkau.' }]
      }),
      L.upnext({ video: 'VIDEO 06', title: 'Swing Trading SOP · Higher-Timeframe Planning', items: ['Swing vs intraday vs scalping · overnight & event risk', 'Monthly / Weekly / Daily context · major liquidity', 'HTF POI selection · fresh vs tested zones'], say: 'Dalam Video 6, kita mula Swing Trading SOP: perancangan timeframe tinggi, risiko overnight, liquidity utama dan pemilihan POI timeframe tinggi.' }),
      L.refs({ items: [L.REF.bursa, L.REF.harris, L.REF.kd, L.REF.ict] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 6.', next: 'Seterusnya: Video 06 — Swing Trading SOP · Higher-Timeframe Planning' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
