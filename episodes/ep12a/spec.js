/* CMI SMC Level 9 — VIDEO 12A: Integrated FCPO Case Studies · Part A (Master prompt §7 · CS1–CS4) */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const C = { bull: '#26a69a', bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', amber: '#e8b44c', blue: '#5b8def', green: '#34d399', text: '#f1f5fb' };
  const f = p => Math.round(p).toLocaleString('en-US');
  /* journal scene computed from the same template as the case */
  function journal(cs, o, style, bias) {
    const v = L.template(o), n = o.n || 1, bull = v.dir > 0;
    let res, R, say;
    if (v.kind === 'tp') { R = v.reward / v.risk; res = `+${v.reward} pts × ${n} = +RM${f(v.reward * 25 * n)} · +${+R.toFixed(2)}R`; }
    if (v.kind === 'sl') { R = -1; res = `−${v.risk} pts × ${n} = −RM${f(v.risk * 25 * n)} · −1R`; }
    if (v.kind === 'tp2') { const g = (Math.abs(v.tp1 - v.entry) + v.reward) * (n / 2) * 25; R = g / (v.risk * 25 * n); res = `+RM${f(g)} · +${+R.toFixed(2)}R (partials)`; }
    say = R > 0 ? `Hasil kasar tambah ${+R.toFixed(2)}R.` : 'Hasil kasar tolak satu R, iaitu kerugian yang dirancang.';
    return L.calc({
      label: `${cs} · JOURNAL ENTRY`, kicker: `${cs} · TRADING JOURNAL`, title: 'Recorded exactly as it happened', ptitle: 'HYPOTHETICAL CASE · GROSS · COSTS RECORDED SEPARATELY', lh: 50, fs: 24, h: 560,
      cues: [`Rekod jurnal untuk ${cs.toLowerCase().replace('cs', 'kes ')}.`, `Gaya ${style}, bias ${bias}, entry ${f(v.entry)}, stop-loss ${f(v.sl)}, sasaran ${f(v.tp)}, ${n} kontrak, RR dirancang ${+(v.reward / v.risk).toFixed(2)} berbanding 1.`, say + ' Peraturan dipatuhi. Kos sebenar dicatat secara berasingan.'],
      lines: [{ t: `Style       ${style} · ${bull ? 'LONG' : 'SHORT'} · ${n} contract${n > 1 ? 's' : ''}`, k: 1 }, { t: `HTF bias    ${bias}`, k: 1, d: .8 }, { t: `POI         ${f(v.poi[0])}–${f(v.poi[1])} · liquidity ${f(v.swLiq)} swept`, k: 1, d: 1.6 },
      { t: `Confirm     sweep → MSS ${f(v.lh)} → displacement → FVG`, k: 1, d: 2.4 }, { t: `Plan        E ${f(v.entry)} · SL ${f(v.sl)} · TP ${f(v.tp)}${v.tp1 ? ` · TP1 ${f(v.tp1)}` : ''}`, k: 1, d: 3.2 },
      { t: `Planned RR  ${+(v.reward / v.risk).toFixed(2)} : 1 · risk RM${f(v.risk * 25 * n)}`, k: 1, d: 4 }, { t: `Result      <span style="color:${R > 0 ? '#26a69a' : '#ef5350'}">${res}</span>`, k: 2 }, { t: 'Rules       followed ✓ · screenshots before & after ✓', k: 2, d: 2 }]
    });
  }
  const CS1 = { dir: 1, E: 4446, R: 9, tail: 'tp', n: 2 }, CS2 = { dir: -1, E: 4528, R: 8, tail: 'sl', n: 2 }, CS3 = { dir: 1, E: 4640, R: 14, tail: 'tp2', tp1U: 4510, tpU: 4530, n: 2 }, CS4 = { dir: -1, E: 4812, R: 15, tail: 'tp', n: 1 };
  const EPISODE = {
    id: 'ep12a', video: 'VIDEO 12A', title: 'Integrated FCPO Case Studies · Part A',
    scenes: [
      L.title({
        kicker: 'VIDEO 12A · LEVEL 9 · INTEGRATED CASE STUDIES', title: 'FCPO Case Studies<br>Part A', sub: 'Case 1–2 Scalping · Case 3–4 Intraday',
        cues: ['Selamat datang ke Video 12A. Kita aplikasikan semua enam subtopik dalam kajian kes FCPO.',
          'Bahagian A mengandungi empat kes: scalping bullish, scalping bearish, intraday bullish dan intraday bearish.',
          'Setiap kes mengikut SOP penuh: konteks, liquidity, pengesahan, pelan, hasil dan rekod jurnal.',
          'Semua kes adalah hipotetikal. Hentikan video pada setiap titik keputusan dan buat pelan anda sendiri dahulu.'],
        obj: [{ t: 'Case 1 · scalping bullish', k: 1 }, { t: 'Case 2 · scalping bearish', k: 1, d: 1.5 }, { t: 'Case 3 · intraday bullish with partials', k: 1, d: 3 }, { t: 'Case 4 · intraday bearish', k: 1, d: 4.5 }]
      }),
      L.bullets({
        label: 'HOW TO USE THE CASES', kicker: 'METHOD', title: 'Pause · decide · then reveal',
        cues: ['Cara menggunakan kajian kes ini.', 'Pada setiap carta, bahagian kanan disembunyikan. Hentikan video dan tulis pelan anda: entry, stop-loss, sasaran dan RR.', 'Kemudian teruskan, dan bandingkan dengan pelan CMI.', 'Selepas hasil didedahkan, nilai proses, bukan hasil. Dagangan yang kalah tetapi mengikut pelan ialah dagangan yang dilaksanakan dengan baik.'],
        items: [{ t: 'Right side hidden → pause and write your plan', c: C.amber, k: 1 }, { t: 'Compare with the CMI plan', c: C.liq, k: 2 }, { t: 'Judge the process, not the outcome', c: C.green, k: 3 }]
      }),
      ...L.example(Object.assign({ label: 'CS1 · SCALPING BULLISH', kicker: 'CASE 1 · SCALPING BULLISH', entryTF: '5M', setupTF: '15M', context: ['1H / 30M · potentially bullish'], intro: 'Kes satu: scalping bullish. Konteks 1H dan 30M berpotensi bullish. Kita merancang dua kontrak.' }, CS1)),
      journal('CS1', CS1, 'Scalping', 'bullish (1H / 30M)'),
      ...L.example(Object.assign({ label: 'CS2 · SCALPING BEARISH', kicker: 'CASE 2 · SCALPING BEARISH', entryTF: '5M', setupTF: '15M', context: ['1H / 30M · potentially bearish'], intro: 'Kes dua: scalping bearish. Konteks 1H dan 30M berpotensi bearish, dan Buy-Side Liquidity berada berhampiran POI bearish.' }, CS2)),
      journal('CS2', CS2, 'Scalping', 'bearish (1H / 30M)'),
      ...L.example(Object.assign({ label: 'CS3 · INTRADAY BULLISH', kicker: 'CASE 3 · INTRADAY BULLISH', entryTF: '5M', setupTF: '1H / 30M', context: ['Daily / 4H · bullish', '15M · SSL reaction'], tpName: 'iaitu liquidity bertentangan seterusnya, 3R', intro: 'Kes tiga: intraday bullish. Daily dan 4H bullish. Kita merancang dua kontrak, dengan partial di TP1 dan peraturan tutup sebelum akhir sesi.' }, CS3)),
      journal('CS3', CS3, 'Intraday', 'bullish (Daily / 4H)'),
      ...L.example(Object.assign({ label: 'CS4 · INTRADAY BEARISH', kicker: 'CASE 4 · INTRADAY BEARISH', entryTF: '5M', setupTF: '1H / 30M', context: ['Daily / 4H · bearish', '15M · BSL reaction'], intro: 'Kes empat: intraday bearish. Daily dan 4H bearish, dan harga menarik balik ke kawasan premium.' }, CS4)),
      journal('CS4', CS4, 'Intraday', 'bearish (Daily / 4H)'),
      L.table({
        label: 'PART A · RESULTS IN R', kicker: 'REVIEW', title: 'Four cases, measured in R',
        cues: ['Ringkasan empat kes dalam unit R.', 'Kes satu, tambah 2R. Kes dua, tolak 1R.', 'Kes tiga, tambah 2R dengan partial. Kes empat, tambah 2R.', 'Empat kes ialah sampel yang terlalu kecil untuk menilai strategi. Ia hanya menunjukkan proses yang konsisten, dengan menang dan kalah yang dirancang.'],
        cols: ['Case', 'Style', 'Direction', 'Result'], colw: ['16%', '28%', '28%', '28%'], colColor: [null, null, null, '#e8b44c'],
        rows: [['CS1', 'Scalping', 'Long', '+2R'], ['CS2', 'Scalping', 'Short', '−1R (planned loss)'], ['CS3', 'Intraday', 'Long · partials', '+2R'], ['CS4', 'Intraday', 'Short', '+2R']],
        rowK: [[1, 0], [1, 1.5], [2, 0], [2, 2.5]], note: { t: 'Four trades prove nothing about a strategy — they illustrate the process.', k: 3, y: 560 }
      }),
      L.upnext({ video: 'VIDEO 12B', title: 'Integrated FCPO Case Studies · Part B', items: ['Case 5 & 6 · swing bullish and bearish', 'Case 7 · failed setup', 'Case 8 · no-trade scenario'], say: 'Dalam Video 12B, kita teruskan dengan kes swing bullish dan bearish, satu setup yang gagal, dan satu senario tidak trade.' }),
      L.refs({ items: [L.REF.bursa, L.REF.ict, L.REF.kd] }),
      L.disclaimer({ say: 'Trading futures melibatkan risiko kerugian. Jumpa dalam Video 12B.', next: 'Seterusnya: Video 12B — Integrated FCPO Case Studies · Part B' })
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
