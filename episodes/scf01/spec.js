/* Islamic Finance Explainer — Shariah Status of FCPO & Selected Global Futures (CGSI SCF Account)
 * Layout matched to the reference video (header · kicker/title · panels · bottom subtitles · progress bar).
 * Cues: t = Malay subtitle (on screen), en = English narration (spoken, TTS).
 * Sources (see REFERENCES scene): SC Malaysia SAC resolutions · CGSI SCF page · CGSI FAQ · CGSI SCF T&C · Mufti Selangor.
 */
(function () {
  const L = typeof window !== 'undefined' ? window.L : require('../_lib.js');
  const P = { navy: '#071A33', blue: '#247BFF', blueL: '#5a9cff', white: '#FFFFFF', silver: '#D8DEE8', em: '#168A69', emL: '#35c296', sub: '#9aa8be', dim: '#5f6e86', long: '#26a69a', short: '#ef5350', warn: '#d8a24a' };
  const cue = (t, en) => ({ t, en });

  /* ---------- line icons (48×48, stroke) ---------- */
  const PATHS = {
    palm: '<path d="M24 44V22"/><path d="M24 22c-3-6-10-8-17-6 6 1 10 4 12 8"/><path d="M24 22c3-6 10-8 17-6-6 1-10 4-12 8"/><path d="M24 22c-6-3-9-9-8-15 3 4 6 9 8 15z"/><path d="M24 22c6-3 9-9 8-15-3 4-6 9-8 15z"/><path d="M18 44h12"/>',
    drop: '<path d="M24 6S12 20 12 29a12 12 0 0 0 24 0C36 20 24 6 24 6z"/><path d="M18 30a6 6 0 0 0 6 6"/>',
    flame: '<path d="M24 5c2 8 11 12 11 22a11 11 0 0 1-22 0c0-5 3-9 6-11 0 4 2 7 4 7-1-6 0-12 1-18z"/>',
    wheat: '<path d="M24 44V12"/><path d="M24 18c-5-1-7-5-7-9 4 1 7 4 7 9zM24 18c5-1 7-5 7-9-4 1-7 4-7 9z"/><path d="M24 27c-5-1-7-5-7-9 4 1 7 4 7 9zM24 27c5-1 7-5 7-9-4 1-7 4-7 9z"/><path d="M24 36c-5-1-7-5-7-9 4 1 7 4 7 9zM24 36c5-1 7-5 7-9-4 1-7 4-7 9z"/>',
    bean: '<path d="M10 34c-3-6 2-10 7-14s8-12 15-11 9 7 6 13-9 8-14 12-11 6-14 0z"/><circle cx="17" cy="30" r="3"/><circle cx="25" cy="23" r="3"/><circle cx="32" cy="16" r="3"/>',
    corn: '<ellipse cx="24" cy="20" rx="7" ry="15"/><path d="M17 20h14M18 13h12M18 27h12M24 5v30"/><path d="M17 26c-6 4-8 10-7 17 4-5 9-8 14-8M31 26c6 4 8 10 7 17-4-5-9-8-14-8"/>',
    leaf: '<path d="M10 38C8 20 20 8 40 8c0 20-12 32-30 30z"/><path d="M10 38L28 20"/><path d="M36 30s-4 5-4 8a4 4 0 0 0 8 0c0-3-4-8-4-8z"/>',
    doc: '<path d="M12 5h17l9 9v29H12z"/><path d="M29 5v9h9"/><path d="M18 22h14M18 29h14M18 36h9"/>',
    shield: '<path d="M24 5l15 6v11c0 10-6.5 17.5-15 21-8.5-3.5-15-11-15-21V11z"/><path d="M17 24l5 5 9-10"/>',
    scale: '<path d="M24 6v36M14 42h20M10 12h28"/><path d="M10 12l-6 14a6 6 0 0 0 12 0zM38 12l-6 14a6 6 0 0 0 12 0z"/>',
    factory: '<path d="M5 42V22l10 6v-6l10 6v-6l10 6V8h7v34z"/><path d="M12 35h4M21 35h4M30 35h4"/>',
    tank: '<ellipse cx="24" cy="12" rx="14" ry="5"/><path d="M10 12v24c0 3 6 5 14 5s14-2 14-5V12"/><path d="M10 24c0 3 6 5 14 5s14-2 14-5"/>',
    ship: '<path d="M6 30h36l-5 10H11z"/><path d="M12 30V20h20v10M18 20v-7h8v7"/><path d="M4 44c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2"/>',
    grid: '<rect x="7" y="7" width="34" height="34" rx="3"/><path d="M7 17h34M7 27h34M19 7v34"/>',
    chart: '<path d="M6 42h36M6 42V6"/><path d="M10 34l9-10 7 6 12-15"/><path d="M33 15h5v5"/>',
    bank: '<path d="M6 18L24 7l18 11z"/><path d="M10 22v14M18 22v14M30 22v14M38 22v14M6 40h36"/>',
    globe: '<circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c6 6 6 28 0 34M24 7c-6 6-6 28 0 34"/>',
    user: '<circle cx="24" cy="15" r="7"/><path d="M10 42c0-9 6-14 14-14s14 5 14 14"/>',
    search: '<circle cx="21" cy="21" r="12"/><path d="M30 30l11 11"/>',
    truck: '<path d="M4 12h24v20H4zM28 20h9l6 7v5H28z"/><circle cx="12" cy="36" r="4"/><circle cx="35" cy="36" r="4"/>',
    q: '<circle cx="24" cy="24" r="18"/><path d="M18 19a6 6 0 1 1 8 5.6c-1.4.6-2 1.6-2 3V30"/><path d="M24 35v1"/>'
  };
  const ic = (n, c = P.blue, s = 44, sw = 2.4) => `<svg class="ico" width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${PATHS[n]}</svg>`;
  const src = (S, txt, at, y = 742, x = 60) => S.el(`<div class="src"><b>SOURCE</b>${txt}</div>`, { x, y }, { at });
  const chip = (txt, c, fill) => `<span class="tag" style="color:${c};border-color:${c}88;${fill ? 'background:' + fill : ''}">${txt}</span>`;

  /* ---------- chapter card ---------- */
  const CH = ['Introduction', 'The Shariah Ruling on FCPO', 'Why Commodity Futures Can Qualify', 'Long and Short in Futures', 'Selected Foreign Futures', 'Who Provides the Shariah Assessment?', 'Conclusion & Disclosure'];
  const chapter = (n, ms, c) => ({
    label: `CHAPTER ${n} · ${CH[n - 1].toUpperCase()}`, hold: .3, cues: [c], build(S, C) {
      S.el(`<div style="font:700 150px/1 JBM;color:${P.blue};opacity:.9">0${n}</div>`, { x: 112, y: 120 }, { at: S.at(0, -.4), dx: -24, dy: 0 });
      S.el(`<div class="kicker">CHAPTER 0${n} · BAB ${n}</div>`, { x: 118, y: 300 }, { at: S.at(0, -.3) });
      S.el(`<div class="h1" style="font-size:72px">${CH[n - 1]}</div>`, { x: 114, y: 340, w: 1600 }, { at: S.at(0, -.2) });
      S.el(`<div class="lead">${ms}</div>`, { x: 118, y: 438, w: 1600 }, { at: S.at(0) });
      S.el('<div class="rule" style="width:322px"></div>', { x: 118, y: 506 }, { at: S.at(0, .2), dy: 0, dx: -20 });
      CH.forEach((t, i) => {
        const on = i + 1 === n, done = i + 1 < n;
        S.el(`<div style="height:4px;border-radius:2px;background:${on ? P.blue : done ? '#2a4a7a' : '#1b2740'}"></div><div class="mono" style="margin-top:12px;font-size:14px;letter-spacing:1px;color:${on ? P.silver : P.dim}">0${i + 1}</div><div style="margin-top:4px;font:500 16px/1.25 Inter;color:${on ? P.white : P.dim}">${t}</div>`,
          { x: 118 + i * 245, y: 600, w: 225 }, { at: S.at(0, .1 + i * .06), dy: 6 });
      });
    }
  });

  const EPISODE = {
    id: 'scf01', video: 'ISLAMIC FINANCE EXPLAINER', title: 'Shariah Status of FCPO & Global Futures',
    badge: 'SF', hl1: 'SHARIAH-COMPLIANT FUTURES', hl2: 'CAPITAL MARKET INSTITUTE · ISLAMIC FINANCE SERIES',
    theme: {
      css: { amber: P.blue, green: P.emL, badgefg: '#ffffff', bg0: P.navy, panel: '#0c2241', panel2: '#0f2849', line: 'rgba(170,195,235,.12)',
        stagebg: 'radial-gradient(1200px 700px at 45% 40%,#0d2a50 0%,#0a2040 50%,#071A33 100%)' },
      C: { amber: P.blue, green: P.emL }
    },
    scenes: [
      /* ============ CHAPTER 1 · INTRODUCTION ============ */
      {
        label: 'OPENING · THE QUESTION', cues: [
          cue('Apabila kita bercakap tentang futures trading, antara persoalan yang sering timbul ialah: adakah ia dibenarkan dalam Islam?', 'When we talk about futures trading, one question comes up again and again: is futures trading permitted in Islam?'),
          cue('Ada yang beranggapan bahawa semua kontrak yang dibeli dan dijual tanpa pemilikan fizikal adalah tidak patuh Syariah.', 'Some assume that buying and selling any contract without physical ownership is automatically not Shariah-compliant.'),
          cue('Namun, dalam pasaran modal Islam, sesuatu produk tidak dinilai sekadar berdasarkan posisi BUY atau SELL.', 'But in the Islamic capital market, a product is not judged simply by whether we take a buy or a sell position.'),
          cue('Sebaliknya, ia bergantung kepada struktur kontrak, jenis komoditi, mekanisme transaksi dan keputusan badan Syariah yang berautoriti.', 'Instead, it depends on the contract structure, the type of commodity, the transaction mechanism, and the decision of an authoritative Shariah body.')],
        build(S, C) {
          S.el('<div class="kicker">ISLAMIC CAPITAL MARKET · THE QUESTION</div>', { x: 60, y: 40 }, { at: S.at(0, -.4) });
          S.el(`<div class="h1" style="font-size:66px">Is futures trading<br>Shariah-compliant?</div>`, { x: 56, y: 84, w: 1050 }, { at: S.at(0, -.2) });
          // commodity board (illustrative, no prices)
          const board = S.el('', { x: 1170, y: 40, w: 690, h: 330, cls: 'panel' }, { at: S.at(0, .2) });
          S.el('<div class="ptitle">COMMODITY FUTURES · ILLUSTRATIVE</div>', { x: 24, y: 20, parent: board });
          const rows = [['FCPO', 'Crude Palm Oil', 'palm', P.emL], ['WTI', 'Light Sweet Crude Oil', 'drop', P.blueL], ['ZL', 'Soybean Oil', 'bean', P.silver], ['TSR20', 'SICOM Rubber', 'leaf', P.emL]];
          rows.forEach((r, i) => {
            const y = 66 + i * 64;
            const row = S.el(`<div style="display:flex;align-items:center;gap:16px">${ic(r[2], r[3], 34)}<div><div style="font:700 21px JBM;color:#fff">${r[0]}</div><div style="font:400 16px Inter;color:${P.sub}">${r[1]}</div></div></div>`, { x: 24, y, w: 330, parent: board }, { at: S.at(0, .5 + i * .25), dx: -10, dy: 0 });
            const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('width', 290); s.setAttribute('height', 48); s.style.cssText = 'position:absolute;left:370px;top:' + (y + 4) + 'px'; board.appendChild(s);
            let pts = ''; for (let k = 0; k <= 40; k++) { const v = 24 + 12 * Math.sin(k * .35 + i * 1.7) + 6 * Math.sin(k * .9 + i) - k * .15 * (i % 2 ? -1 : 1); pts += `${k * 7},${v.toFixed(1)} `; }
            s.innerHTML = `<polyline points="${pts}" fill="none" stroke="${r[3]}" stroke-width="2.2" stroke-linejoin="round"/>`;
            const pl = s.firstChild, at = S.at(0, .7 + i * .25);
            S.anim(t => { const len = 330; pl.style.strokeDasharray = len; pl.style.strokeDashoffset = len * (1 - CMI.ease((t - at) / 1.6)); });
          });
          // common assumption
          const a = S.el(`<div style="display:flex;gap:22px;align-items:center"><span style="flex:none;width:52px;height:52px;border-radius:50%;border:2px solid ${P.short};color:${P.short};font:700 28px Inter;display:flex;align-items:center;justify-content:center">✕</span><div><div class="ptitle" style="color:${P.short}">COMMON ASSUMPTION</div><div style="font:500 27px/1.35 Inter;color:#e3e9f2;margin-top:6px">“Any contract bought or sold without physical ownership is automatically non-compliant.”</div></div></div>`,
            { x: 60, y: 260, w: 1050, h: 150, cls: 'panel', style: 'padding:0 30px;display:flex;align-items:center' }, { at: S.at(1) });
          S.el(chip('NOT JUDGED BY BUY / SELL ALONE', P.silver), { x: 60, y: 446 }, { at: S.at(2) });
          S.el('<div class="kicker" style="color:#9aa8be">WHAT A SHARIAH ASSESSMENT LOOKS AT</div>', { x: 60, y: 506 }, { at: S.at(3, -.2) });
          [['doc', 'Contract structure'], ['palm', 'Type of commodity'], ['grid', 'Transaction mechanism'], ['shield', 'Authoritative Shariah body']].forEach((f, i) => {
            const c = i === 3 ? P.emL : P.blue;
            const d = S.el(`<div style="display:flex;gap:18px;align-items:center;height:100%">${ic(f[0], c, 46)}<div style="font:700 25px/1.25 Inter">${f[1]}</div></div>`, { x: 60 + i * 456, y: 548, w: 432, h: 120, cls: 'card', style: 'padding:0 24px' }, { at: S.at(3, .2 + i * .9) });
            d.style.borderTop = `3px solid ${c}`;
          });
        }
      },
      {
        label: 'TITLE', hold: .6, cues: [
          cue('Mari kita fahami bagaimana FCPO dan beberapa foreign futures tertentu dinilai dari perspektif Syariah.', "Let's understand how FCPO and certain selected foreign futures are assessed from a Shariah perspective."),
          cue('Kita lihat keputusan MPS SC tentang FCPO, dan pertimbangan Syariah di sebalik kontrak niaga hadapan komoditi.', "We'll look at the Shariah Advisory Council ruling on FCPO, and the Shariah considerations behind commodity futures contracts."),
          cue('Kemudian, senarai foreign futures terpilih dalam akaun Shariah-Compliant Futures CGS International.', 'Then, the selected foreign futures in the CGS International Shariah-Compliant Futures account.'),
          cue('Dan akhir sekali, siapa yang membuat penilaian Syariah bagi setiap kumpulan kontrak.', 'And finally, who provides the Shariah assessment for each group of contracts.')],
        build(S, C) {
          S.el('<div class="kicker">ISLAMIC FINANCE EXPLAINER · CHAPTER 01</div>', { x: 118, y: 70 }, { at: S.at(0, -.3) });
          S.el('<div class="h1" style="font-size:74px">Understanding<br>Shariah-Compliant Futures</div>', { x: 114, y: 112, w: 1100 }, { at: S.at(0, -.2) });
          S.el('<div class="lead">FCPO &amp; Selected Global Commodity Futures</div>', { x: 118, y: 290 }, { at: S.at(0, .2) });
          S.el('<div class="rule" style="width:322px"></div>', { x: 118, y: 352 }, { at: S.at(0, .4), dy: 0, dx: -20 });
          S.el('<div class="ptitle">LEARNING OBJECTIVES</div>', { x: 118, y: 392 }, { at: S.at(1, -.3) });
          S.bullets(['The SAC SC ruling on FCPO (1997)', 'Shariah considerations in commodity futures', 'Selected foreign futures in the CGSI SCF Account', 'Who provides the Shariah assessment'], 118, 432, 980, [S.at(1), S.at(1, 2.2), S.at(2), S.at(3)], { check: true, size: 26 });
          // preview of the two governance tracks
          const mk = (y, k, top, chips, auth, c, icon) => {
            const d = S.el(`<div class="ptitle" style="color:${c}">${top}</div><div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">${chips.map(x => chip(x, P.silver)).join('')}</div>
              <div style="margin-top:22px;display:flex;gap:16px;align-items:center;border-top:1px solid rgba(170,195,235,.12);padding-top:18px">${ic(icon, c, 40)}<div><div class="mono" style="font-size:14px;letter-spacing:1.4px;color:${P.dim}">SHARIAH BASIS</div><div style="font:700 23px/1.3 Inter;color:#fff">${auth}</div></div></div>`,
              { x: 1230, y, w: 630, h: 250, cls: 'panel', style: 'padding:24px 28px' }, { at: k });
            d.style.borderLeft = `4px solid ${c}`;
          };
          mk(110, S.at(1, .8), 'BURSA MALAYSIA DERIVATIVES', ['FCPO', 'FPKO', 'FEPO'], 'SAC of the Securities Commission Malaysia — resolutions', P.blue, 'bank');
          mk(390, S.at(2, .4), 'SELECTED FOREIGN FUTURES · 13', ['NYMEX', 'CBOT', 'SGX'], 'CGSI’s appointed Shariah Advisor — concurrence', P.emL, 'shield');
        }
      },

      /* ============ CHAPTER 2 · FCPO RULING ============ */
      chapter(2, 'Keputusan Syariah tentang FCPO', cue('Bab dua: keputusan Syariah tentang FCPO.', 'Chapter two: the Shariah ruling on FCPO.')),
      {
        label: '26 NOV 1997 · SAC SC RULING', cues: [
          cue('Di Malaysia, antara keputusan penting dalam perkembangan pasaran modal Islam ialah keputusan MPS Suruhanjaya Sekuriti pada 26 November 1997.', 'In Malaysia, one of the key decisions in the development of the Islamic capital market was made by the Shariah Advisory Council of the Securities Commission on the 26th of November, 1997.'),
          cue('Dalam mesyuarat ke-11, MPS memutuskan bahawa kontrak Crude Palm Oil Futures, atau FCPO, adalah diharuskan kerana selaras dengan prinsip Syariah.', 'At its 11th meeting, the Council resolved that the Crude Palm Oil Futures contract, or FCPO, is permissible, as it is in accordance with Shariah principles.'),
          cue('Keputusan ini menjadi rujukan penting kepada peserta pasaran yang ingin memahami kedudukan FCPO dalam pasaran modal Islam.', 'This ruling is an important reference for market participants who want to understand the position of FCPO in the Islamic capital market.'),
          cue('CGS International turut merujuk resolusi MPS SC bagi kontrak Bursa Malaysia Derivatives yang lain, iaitu FPKO dan FEPO.', 'CGS International also refers to Shariah Advisory Council resolutions for two other Bursa Malaysia Derivatives contracts: FPKO and FEPO.')],
        build(S, C) {
          S.heading('CHAPTER 02 · SHARIAH ADVISORY COUNCIL (SAC) · SECURITIES COMMISSION MALAYSIA', 'The Shariah ruling on FCPO', S.at(0, -.3));
          // timeline
          const tl = S.svg(60, 170, 1800, 120);
          const at0 = S.at(0, .2), atN = S.at(0, 1.4);
          S.anim(t => {
            const p = CMI.ease((t - at0) / 1.4), x2 = 40 + 1720 * p, n = CMI.ease((t - atN) / .5);
            tl.innerHTML = `<line x1="40" x2="${x2}" y1="60" y2="60" stroke="#2a4a7a" stroke-width="3"/>` +
              `<g opacity="${n}"><circle cx="420" cy="60" r="${14 + 6 * (1 - n)}" fill="${P.navy}" stroke="${P.blue}" stroke-width="4"/><circle cx="420" cy="60" r="6" fill="${P.blue}"/>` +
              `<text x="420" y="24" text-anchor="middle" font-family="JBM" font-weight="700" font-size="22" fill="${P.blue}">26 NOVEMBER 1997</text>` +
              `<text x="420" y="108" text-anchor="middle" font-family="JBM" font-size="16" fill="${P.sub}">SAC SC · FCPO RULING</text></g>` +
              `<g opacity="${CMI.ease((t - S.at(2)) / .5)}"><circle cx="1640" cy="60" r="10" fill="${P.navy}" stroke="${P.silver}" stroke-width="3"/><text x="1640" y="24" text-anchor="middle" font-family="JBM" font-weight="700" font-size="20" fill="${P.silver}">TODAY</text><text x="1640" y="108" text-anchor="middle" font-family="JBM" font-size="16" fill="${P.sub}">REFERENCE FOR MARKET PARTICIPANTS</text></g>`;
          });
          // ruling card
          const card = S.el(`<div style="display:flex;justify-content:space-between;align-items:center"><span class="ptitle" style="color:${P.blue}">RESOLUTION · 11TH SAC MEETING · 26 NOV 1997</span>${chip('PERMISSIBLE · HARUS', P.emL, 'rgba(22,138,105,.14)')}</div>
            <div class="quote" style="margin-top:22px">“…the futures contract on crude palm oil is <span style="color:${P.emL};font-weight:700">permissible</span> as it is in accordance with Shariah principles.”</div>
            <div class="mono" style="margin-top:22px;font-size:16px;color:${P.dim};letter-spacing:1px">CONTRACT · CRUDE PALM OIL FUTURES (FCPO) · BURSA MALAYSIA DERIVATIVES</div>`,
            { x: 60, y: 320, w: 1150, h: 300, cls: 'panel', style: 'padding:30px 36px' }, { at: S.at(1, -.2) });
          card.style.borderLeft = `4px solid ${P.blue}`;
          // other Bursa contracts
          const side = S.el(`<div class="ptitle">OTHER BURSA CONTRACTS · PER CGSI</div>`, { x: 1250, y: 320, w: 610, h: 300, cls: 'panel', style: 'padding:26px 28px' }, { at: S.at(3, -.2) });
          [['FCPO', 'Crude Palm Oil Futures'], ['FPKO', 'Crude Palm Kernel Oil Futures'], ['FEPO', 'East Malaysia Crude Palm Oil Futures']].forEach((r, i) =>
            S.el(`<div style="display:flex;gap:18px;align-items:center"><span style="font:700 22px JBM;color:${i ? P.white : P.blue};width:80px">${r[0]}</span><span style="font:400 21px Inter;color:#d6deea">${r[1]}</span></div>`, { x: 28, y: 76 + i * 62, parent: side }, { at: S.at(3, .3 + i * .5), dy: 0, dx: -10 }));
          S.el(`<div class="small" style="font-size:17px">Based on SAC SC resolutions — refer to the SC document for each contract.</div>`, { x: 28, y: 238, w: 560, parent: side }, { at: S.at(3, 1.8) });
          src(S, 'Securities Commission Malaysia — Resolutions of the Shariah Advisory Council · CGS International — Shariah-Compliant Futures', S.at(1, .5), 660);
        }
      },
      {
        label: 'FCPO · A REAL UNDERLYING COMMODITY', cues: [
          cue('FCPO mewakili minyak sawit mentah, iaitu komoditi pertanian sebenar dengan pasaran fizikal yang mantap.', 'FCPO represents crude palm oil: a real agricultural commodity with a well-established physical market.'),
          cue('Dari ladang, buah tandan segar dituai dan diproses di kilang menjadi minyak sawit mentah.', 'From the plantation, fresh fruit bunches are harvested and processed at the mill into crude palm oil.'),
          cue('Minyak ini disimpan di tangki dan boleh dihantar melalui kemudahan penghantaran yang ditetapkan oleh bursa.', 'The oil is stored in tanks, and can be delivered through delivery facilities specified by the exchange.'),
          cue('Kontrak FCPO pula mempunyai spesifikasi yang seragam: saiz kontrak, gred, bulan kontrak dan terma penyelesaian.', 'The FCPO contract itself has standardised specifications: contract size, grade, contract month and settlement terms.')],
        build(S, C) {
          S.heading('CHAPTER 02 · UNDERLYING COMMODITY', 'FCPO: crude palm oil, a real physical market', S.at(0, -.3));
          const steps = [['palm', 'Plantation', 'OIL PALM ESTATES', 1, 0], ['user', 'Harvest', 'FRESH FRUIT BUNCHES', 1, 1.2], ['factory', 'Mill processing', 'CRUDE PALM OIL', 1, 2.6], ['tank', 'Storage tanks', 'BULK STORAGE', 2, 0], ['ship', 'Delivery facility', 'EXCHANGE-SPECIFIED', 2, 1.6]];
          const nodes = steps.map((s, i) => ({ id: 'n' + i, x: 60 + i * 366, y: 170, w: 306, h: 170, t: `<div style="margin-bottom:10px">${ic(s[0], i < 3 ? P.emL : P.blue, 50)}</div>${s[1]}`, s: s[2], at: S.at(s[3], s[4]) }));
          nodes[0].at = S.at(0, .3);
          S.flow(nodes, nodes.slice(1).map((n, i) => ({ f: 'n' + i, to: n.id, at: n.at - .3 })));
          S.table(60, 380, 1180, ['FCPO contract', 'Specification'], [
            ['Underlying', 'Crude palm oil (CPO)'], ['Contract size', '25 metric tonnes'], ['Price quote', 'Ringgit per metric tonne'], ['Contract month', 'Exchange-listed delivery months'], ['Settlement', 'Physical delivery · exchange rules']],
            [S.at(3, .2), S.at(3, 1), S.at(3, 1.8), S.at(3, 2.8), S.at(3, 3.8)], { colw: ['34%', '66%'], fs: 22, at: S.at(3, -.2) });
          S.el(`<div>${chip('STANDARDISED · EXCHANGE-TRADED', P.blue)}</div><div class="small" style="margin-top:18px">Quantity, grade and delivery terms are the same for every participant.</div><div class="small" style="margin-top:18px;font-size:17px;color:${P.dim}">Verify the latest contract specifications with Bursa Malaysia Derivatives.</div>`,
            { x: 1290, y: 390, w: 570 }, { at: S.at(3, 1) });
        }
      },

      /* ============ CHAPTER 3 · WHY COMMODITY FUTURES CAN QUALIFY ============ */
      chapter(3, 'Mengapa futures komoditi boleh layak dari perspektif Syariah', cue('Bab tiga: mengapa kontrak niaga hadapan komoditi boleh layak dari perspektif Syariah.', 'Chapter three: why commodity futures can qualify under Shariah.')),
      {
        label: 'FIVE SHARIAH CONSIDERATIONS', cues: [
          cue('Apakah pertimbangan Syariah di sebalik kontrak niaga hadapan komoditi? Mari lihat lima aspek utama.', "So what are the Shariah considerations behind a commodity futures contract? Let's look at five key aspects."),
          cue('Pertama, aset pendasar: kontrak berkaitan dengan komoditi yang boleh dikenal pasti dan mempunyai pasaran fizikal.', 'First, the underlying commodity: the contract relates to an identifiable commodity with an established physical market.'),
          cue('Kedua, spesifikasi kontrak: kuantiti, gred, bulan, harga, lokasi penghantaran dan terma penyelesaian ditetapkan dengan jelas.', 'Second, contract specifications: quantity, grade, contract month, traded price, delivery location and settlement terms are clearly defined.'),
          cue('Ketiga, kemungkinan penghantaran fizikal, melalui prosedur penghantaran atau penyelesaian yang ditadbir oleh peraturan bursa.', 'Third, the possibility of physical delivery, through delivery or settlement procedures governed by the exchange rules.'),
          cue('Ini tidak bermaksud setiap posisi mesti berakhir dengan penghantaran fizikal.', 'This does not mean every position must end in actual physical delivery.'),
          cue('Keempat, pengurusan risiko: futures membantu pengeluar, pedagang dan pengguna komersial mengurus risiko turun naik harga.', 'Fourth, risk management: futures help producers, traders and commercial users manage the risk of price fluctuations.'),
          cue('Kelima, tadbir urus Syariah: struktur produk dinilai oleh Majlis Penasihat Syariah atau penasihat Syariah yang berkelayakan.', 'Fifth, Shariah governance: the product structure is assessed by the Shariah Advisory Council, or a qualified Shariah adviser.'),
          cue('Ini bukan senarai semak undang-undang yang lengkap. Tiada satu ciri pun, secara sendirian, menjadikan produk patuh Syariah secara automatik.', 'These five aspects are not an exhaustive legal checklist. No single feature, on its own, automatically makes a product Shariah-compliant.')],
        build(S, C) {
          S.heading('CHAPTER 03 · SHARIAH CONSIDERATIONS', 'Five aspects in assessing commodity futures', S.at(0, -.3));
          const M = [['palm', 'Underlying commodity', 'Identifiable commodity with an established physical market.', 1],
            ['grid', 'Contract specifications', 'Quantity · grade · month · price · delivery location · settlement terms.', 2],
            ['truck', 'Physical delivery possibility', 'Delivery / settlement procedures governed by exchange rules.', 3],
            ['chart', 'Risk management', 'Managing price-fluctuation risk for producers, traders & commercial users.', 5],
            ['shield', 'Shariah governance', 'Product structure assessed by the SAC or a qualified Shariah adviser.', 6]];
          const w = 344;
          M.forEach((m, i) => {
            const c = i === 4 ? P.emL : P.blue;
            const d = S.el(`<div style="display:flex;justify-content:space-between;align-items:flex-start">${ic(m[0], c, 54)}<span class="num" style="color:${c}">0${i + 1}</span></div><div class="ct" style="font-size:25px;margin-top:22px">${m[1]}</div><div class="cb" style="font-size:20px">${m[2]}</div>`,
              { x: 60 + i * (w + 20), y: 170, w, h: 340, cls: 'card' }, { at: S.at(m[3]) });
            d.style.borderTop = `3px solid ${c}`;
            S.hl(d, S.at(m[3], .1), m[3] === 6 ? S.at(7, -.2) : S.at(m[3] + (m[3] === 3 ? 2 : 1), -.2), 'rgba(36,123,255,.55)');
          });
          S.el(chip('NOT EVERY POSITION ENDS IN PHYSICAL DELIVERY', P.silver), { x: 60 + 2 * (w + 20), y: 530 }, { at: S.at(4) });
          const n = S.el(`<div style="display:flex;gap:22px;align-items:center"><span style="font:700 34px Inter;color:${P.warn}">!</span><div style="font:500 25px/1.4 Inter;color:#e3e9f2">Not an exhaustive legal checklist — <span style="color:${P.silver};font-weight:700">no single feature, on its own, makes a product Shariah-compliant.</span></div></div>`,
            { x: 60, y: 600, w: 1800, h: 110, cls: 'panel', style: 'padding:0 32px;display:flex;align-items:center' }, { at: S.at(7) });
          n.style.borderColor = 'rgba(216,162,74,.45)';
        }
      },
      {
        label: 'RISK MANAGEMENT · PRODUCER EXAMPLE', cues: [
          cue('Contoh: pengeluar sawit menjangka akan menjual hasilnya tiga bulan lagi, tetapi bimbang harga akan jatuh.', 'For example, a palm oil producer expects to sell its output in three months, but is worried that prices may fall.'),
          cue('Pengeluar boleh menjual kontrak FCPO hari ini untuk mengurus risiko harga tersebut.', 'The producer can sell FCPO contracts today to manage that price risk.'),
          cue('Jika harga jatuh, jualan fizikal mendapat harga lebih rendah, tetapi posisi futures boleh membantu mengimbanginya.', 'If prices fall, the physical sale fetches a lower price, but the futures position can help offset it.'),
          cue('Inilah fungsi asal pasaran niaga hadapan: mengurus risiko turun naik harga dalam rantaian komoditi sebenar.', 'This is the original function of futures markets: managing price risk within the real commodity supply chain.')],
        build(S, C) {
          S.heading('CHAPTER 03 · RISK MANAGEMENT', 'A producer managing price risk', S.at(0, -.3));
          const pr = S.el(`<div style="display:flex;gap:20px;align-items:center">${ic('palm', P.emL, 60)}<div><div style="font:700 28px Inter">Palm oil producer</div><div class="mono" style="font-size:15px;color:${P.sub};letter-spacing:1px;margin-top:4px">SELLS CPO IN 3 MONTHS</div></div></div>
            <div style="margin-top:26px">${chip('▼ RISK: PRICE FALLS', P.short)}</div>`, { x: 60, y: 180, w: 520, h: 230, cls: 'panel', style: 'padding:32px' }, { at: S.at(0) });
          const ax = S.svg(60, 450, 520, 90);
          S.anim(t => { const p = CMI.ease((t - S.at(0, 1)) / 1); ax.innerHTML = `<line x1="10" x2="${10 + 480 * p}" y1="30" y2="30" stroke="#2a4a7a" stroke-width="3"/><circle cx="10" cy="30" r="7" fill="${P.blue}" opacity="${p}"/><circle cx="490" cy="30" r="7" fill="${P.silver}" opacity="${p > .95 ? 1 : 0}"/><text x="10" y="70" font-family="JBM" font-size="16" fill="${P.sub}" opacity="${p}">TODAY · SELL FCPO</text><text x="490" y="70" text-anchor="end" font-family="JBM" font-size="16" fill="${P.sub}" opacity="${p > .95 ? 1 : 0}">+3 MONTHS · SELL CPO</text>`; });
          S.el(chip('TODAY · SELL FCPO FUTURES', P.blue, 'rgba(36,123,255,.12)'), { x: 60, y: 560 }, { at: S.at(1) });
          const panel = S.el(`<div class="ptitle">IF PRICES FALL · ILLUSTRATIVE CONCEPT</div>`, { x: 640, y: 180, w: 1220, h: 430, cls: 'panel', style: 'padding:28px 34px' }, { at: S.at(2, -.3) });
          const bar = (y, lab, c, w, txt, at) => {
            S.el(`<div style="font:600 22px Inter;color:#e3e9f2">${lab}</div>`, { x: 34, y, parent: panel }, { at });
            const b = S.el(`<div style="height:30px;border-radius:6px;background:${c}"></div>`, { x: 300, y: y - 2, w: 1, parent: panel }, { at });
            S.anim(t => { b.style.width = (w * CMI.ease((t - at) / 1.1)) + 'px'; });
            S.el(`<div class="mono" style="font-size:16px;color:${c}">${txt}</div>`, { x: 300, y: y + 40, parent: panel }, { at: at + .8 });
          };
          bar(90, 'Physical sale', P.short, 560, '▼ LOWER SELLING PRICE', S.at(2, .2));
          bar(200, 'Futures position', P.long, 470, '▲ CAN HELP OFFSET', S.at(2, 1.6));
          S.el(chip('PRICE RISK MANAGED · OUTCOME MORE STABLE', P.emL, 'rgba(22,138,105,.12)'), { x: 34, y: 320, parent: panel }, { at: S.at(3) });
          S.el(`<div class="small" style="font-size:17px;color:${P.dim}">Concept only · no actual prices · hedging outcomes depend on basis, costs and timing.</div>`, { x: 640, y: 640, w: 1220 }, { at: S.at(3, .6) });
        }
      },

      /* ============ CHAPTER 4 · LONG & SHORT ============ */
      chapter(4, 'Posisi LONG dan SHORT dalam niaga hadapan', cue('Bab empat: posisi LONG dan SHORT dalam niaga hadapan.', 'Chapter four: long and short positions in futures.')),
      {
        label: 'LONG & SHORT · FCPO ILLUSTRATION', cues: [
          cue('Setiap kontrak niaga hadapan mempunyai dua sisi: LONG dan SHORT.', 'Every futures contract has two sides: long and short.'),
          cue('Posisi LONG bermula dengan BUY. Ia secara amnya mendapat manfaat apabila harga naik, dan ditutup dengan SELL yang mengimbangi.', 'A long position starts with a buy. It generally benefits when the price rises, and it is closed with an offsetting sell.'),
          cue('Contoh: beli pada RM4,000, tutup pada RM4,050. Perbezaan harga: tambah RM50 bagi setiap unit harga.', 'For example: buy at 4,000 ringgit and close at 4,050 ringgit. The price difference is plus 50 ringgit per price unit.'),
          cue('Posisi SHORT bermula dengan SELL. Ia secara amnya mendapat manfaat apabila harga turun, dan ditutup dengan BUY yang mengimbangi.', 'A short position starts with a sell. It generally benefits when the price falls, and it is closed with an offsetting buy.'),
          cue('Contoh: jual pada RM4,000, tutup pada RM3,950. Perbezaan harga juga tambah RM50 bagi setiap unit harga.', 'For example: sell at 4,000 ringgit and close at 3,950 ringgit. The price difference is also plus 50 ringgit per price unit.'),
          cue('Ini ilustrasi ringkas, sebelum kos transaksi dan pengganda kontrak.', 'These are simplified illustrations, before transaction costs and contract multipliers.'),
          cue('Keupayaan mengambil posisi LONG dan SHORT bukan satu-satunya penentu status Syariah sesuatu produk.', 'The ability to go long or short is not the sole determinant of a product’s Shariah status.'),
          cue('Penilaian perlu melihat keseluruhan struktur kontrak dan kelulusan Syariah yang berkaitan.', 'The assessment must look at the whole contract structure and the relevant Shariah approval.')],
        build(S, C) {
          S.heading('CHAPTER 04 · TWO SIDES OF A FUTURES CONTRACT', 'LONG and SHORT — simplified FCPO illustration', S.at(0, -.3));
          const side = (x, long, k, kc) => {
            const c = long ? P.long : P.short;
            const p = S.el(`<div style="display:flex;justify-content:space-between;align-items:center"><span style="font:800 30px Inter;color:${c}">${long ? '▲ LONG' : '▼ SHORT'}</span>${chip(long ? 'OPEN WITH BUY' : 'OPEN WITH SELL', c)}</div>
              <div class="small" style="margin-top:10px;font-size:20px">${long ? 'Generally benefits when the price rises · closed by an offsetting SELL' : 'Generally benefits when the price falls · closed by an offsetting BUY'}</div>`,
              { x, y: 170, w: 880, h: 450, cls: 'panel', style: 'padding:26px 30px' }, { at: S.at(k, -.2) });
            p.style.borderTop = `3px solid ${c}`;
            L.drawSchem(S, C, { x: x + 30, y: 270, w: 470, h: 250, k: kc, d: .1, color: c, panel: false, dur: 1.8, sw: 3,
              pts: long ? [[0, .2], [.18, .32], [.32, .25], [.5, .5], [.66, .45], [.85, .72], [1, .8]] : [[0, .8], [.18, .68], [.32, .75], [.5, .5], [.66, .55], [.85, .28], [1, .2]],
              labels: [{ i: 0, t: long ? 'BUY 4,000' : 'SELL 4,000', c: P.white, pos: long ? 'below' : 'above', dx: 40 }, { i: 6, t: long ? 'CLOSE 4,050' : 'CLOSE 3,950', c, pos: long ? 'above' : 'below', dx: -40, k: kc, d: 1.9 }] });
            S.el(`<div class="calc" style="font-size:24px;line-height:1.9"><div><span style="color:${P.sub}">${long ? 'Buy' : 'Sell'}</span> RM4,000</div><div><span style="color:${P.sub}">Close</span> RM${long ? '4,050' : '3,950'}</div><div style="border-top:1px solid rgba(170,195,235,.15);margin-top:6px;padding-top:6px;color:${P.emL};font-weight:700">+RM50</div><div style="font-size:16px;color:${P.sub};line-height:1.3">per price unit</div></div>`,
              { x: x + 560, y: 300, w: 290 }, { at: S.at(kc, 1.6) });
          };
          side(60, true, 1, 2); side(980, false, 3, 4);
          S.el(`<div class="mono" style="font-size:17px;color:${P.sub};letter-spacing:1px">SIMPLIFIED ILLUSTRATION · BEFORE TRANSACTION COSTS AND CONTRACT MULTIPLIER</div>`, { x: 60, y: 645, w: 1800 }, { at: S.at(5) });
          const n = S.el(`<div style="display:flex;gap:20px;align-items:center">${ic('scale', P.emL, 46)}<div style="font:500 25px/1.35 Inter">LONG / SHORT ability is <b>not</b> the sole determinant — assess the <span style="color:${P.emL};font-weight:700">whole contract structure and Shariah approval.</span></div></div>`,
            { x: 60, y: 170, w: 1800, h: 470, cls: 'panel', style: 'padding:0 60px;display:flex;align-items:center;background:rgba(7,26,51,.94)' }, { at: S.at(6) });
          n.style.borderColor = P.em;
        }
      },

      /* ============ CHAPTER 5 · SELECTED FOREIGN FUTURES ============ */
      chapter(5, 'Foreign futures terpilih yang diiktiraf oleh CGSI', cue('Bab lima: foreign futures terpilih dalam akaun Shariah-Compliant Futures CGS International.', 'Chapter five: the selected foreign futures in the CGS International Shariah-Compliant Futures account.')),
      {
        label: 'BASIS FOR SELECTED FOREIGN FUTURES', cues: [
          cue('Ini antara bahagian yang paling penting.', 'This is one of the most important sections.'),
          cue('Menurut CGS International, penasihat Syariah mereka bersetuju bahawa produk asing tertentu mempunyai spesifikasi yang serupa,', 'According to CGS International, its Shariah Advisor has concurred that certain foreign products have similar specifications,'),
          cue('termasuk kemungkinan penghantaran fizikal, dan komoditi yang diiktiraf sebagai patuh Syariah.', 'including the possibility of physical delivery, and commodities recognised as Shariah-compliant.'),
          cue('Kontrak terpilih ini boleh didagangkan melalui akaun Shariah-Compliant Futures, atau akaun SCF, CGS International.', 'These selected contracts may be traded through the CGS International Shariah-Compliant Futures account, or SCF account.')],
        build(S, C) {
          S.heading('CHAPTER 05 · SELECTED FOREIGN FUTURES', 'Why selected foreign contracts are included', S.at(0, -.3));
          const q = S.el(`<div class="ptitle" style="color:${P.emL}">CGS INTERNATIONAL · SHARIAH-COMPLIANT FUTURES</div>
            <div class="quote" style="margin-top:20px;font-size:28px">CGSI’s <b>Shariah Advisor has concurred</b> that certain foreign products have <b>similar specifications</b>, including:</div>`,
            { x: 60, y: 170, w: 1000, h: 490, cls: 'panel', style: 'padding:30px 36px' }, { at: S.at(1, -.2) });
          q.style.borderLeft = `4px solid ${P.em}`;
          [['truck', 'Possibility of physical delivery'], ['leaf', 'Commodities recognised as Shariah-compliant']].forEach((r, i) =>
            S.el(`<div style="display:flex;gap:18px;align-items:center">${ic(r[0], P.emL, 44)}<span style="font:700 25px Inter">${r[1]}</span></div>`, { x: 36, y: 210 + i * 76, parent: q }, { at: S.at(2, i * 1.2), dx: -12, dy: 0 }));
          S.el(`<div style="border-top:1px solid rgba(170,195,235,.12);padding-top:22px;font:500 23px/1.4 Inter;color:#d6deea">→ May be traded through the <span style="color:${P.blue};font-weight:700">CGSI Shariah-Compliant Futures (SCF) Account</span></div>`, { x: 36, y: 370, w: 930, parent: q }, { at: S.at(3) });
          // exchange hub (schematic, not geographic)
          const hub = S.el('', { x: 1100, y: 170, w: 760, h: 490, cls: 'panel' }, { at: S.at(0, .2) });
          S.el('<div class="ptitle">SPECIFIED EXCHANGES · SCHEMATIC</div>', { x: 24, y: 20, parent: hub });
          const g = S.svg(0, 0, 760, 490); hub.appendChild(g.parentNode); g.parentNode.style.cssText = 'position:absolute;left:0;top:0';
          const N = [['NYMEX', 'ENERGY', 140, 140, S.at(0, .8)], ['CBOT', 'GRAINS & OILSEEDS', 620, 140, S.at(0, 1.2)], ['SGX', 'RUBBER', 140, 400, S.at(0, 1.6)], ['BURSA', 'FCPO · FPKO · FEPO', 620, 400, S.at(0, 2)]];
          S.anim(t => {
            let o = '';
            for (let k = 0; k < 9; k++) o += `<line x1="0" x2="760" y1="${60 + k * 50}" y2="${60 + k * 50}" stroke="rgba(170,195,235,.04)"/>`;
            for (let k = 0; k < 15; k++) o += `<line y1="50" y2="490" x1="${k * 54}" x2="${k * 54}" stroke="rgba(170,195,235,.04)"/>`;
            const hp = CMI.ease((t - S.at(3, -.2)) / .6);
            N.forEach(n => { const p = CMI.ease((t - n[4]) / .5); if (p <= 0) return; const lp = CMI.ease((t - S.at(3)) / .7);
              if (lp > 0) o += `<line x1="380" y1="270" x2="${380 + (n[2] - 380) * lp}" y2="${270 + (n[3] - 270) * lp}" stroke="${n[0] === 'BURSA' ? P.blue : P.em}" stroke-width="2.4" stroke-dasharray="6 6"/>`;
              o += `<g opacity="${p}"><circle cx="${n[2]}" cy="${n[3]}" r="44" fill="${P.navy}" stroke="${n[0] === 'BURSA' ? P.blue : P.emL}" stroke-width="2.4"/><text x="${n[2]}" y="${n[3] + 7}" text-anchor="middle" font-family="JBM" font-weight="700" font-size="19" fill="#fff">${n[0]}</text><text x="${n[2]}" y="${n[3] + (n[3] < 270 ? -58 : 70)}" text-anchor="middle" font-family="JBM" font-size="14" fill="${P.sub}">${n[1]}</text></g>`; });
            if (hp > 0) o += `<g opacity="${hp}"><rect x="290" y="236" width="180" height="68" rx="10" fill="#0f2849" stroke="${P.blue}" stroke-width="2"/><text x="380" y="266" text-anchor="middle" font-family="JBM" font-weight="700" font-size="18" fill="${P.blue}">CGSI SCF</text><text x="380" y="289" text-anchor="middle" font-family="JBM" font-size="14" fill="${P.sub}">ACCOUNT</text></g>`;
            g.innerHTML = o;
          });
          src(S, 'CGS International — Shariah-Compliant Futures webpage', S.at(1, .5), 690);
        }
      },
      {
        label: 'THE OFFICIAL LIST · 13 FOREIGN CONTRACTS', hold: 1.2, cues: [
          cue('Inilah senarai foreign futures terpilih yang diterbitkan oleh CGS International bagi akaun SCF.', 'Here is the list of selected foreign futures published by CGS International for the SCF account.'),
          cue('Di NYMEX, dua kontrak tenaga: WTI Light Sweet Crude Oil dan Natural Gas.', 'On NYMEX, two energy contracts: WTI Light Sweet Crude Oil, and Natural Gas.'),
          cue('Di CBOT, sepuluh kontrak bijirin dan biji minyak: Soybeans, Mini Soybean, Soybean Oil dan Soybean Meal,', 'On CBOT, ten grain and oilseed contracts: Soybeans, Mini Soybeans, Soybean Oil and Soybean Meal,'),
          cue('Corn dan Mini Corn, Wheat, KC HRW Wheat (Mini), Chicago SRW Wheat (Mini), dan Oats.', 'Corn and Mini Corn, Wheat, Mini KC Hard Red Winter Wheat, Mini Chicago Soft Red Winter Wheat, and Oats.'),
          cue('Di SGX, satu kontrak: SICOM TSR20 Rubber.', 'And on SGX, one contract: SICOM TSR 20 Rubber.'),
          cue('Jumlahnya tiga belas kontrak asing, sebagai tambahan kepada FCPO, FPKO dan FEPO di Bursa Malaysia.', 'That is thirteen foreign contracts, in addition to FCPO, FPKO and FEPO on Bursa Malaysia.')],
        build(S, C) {
          S.el('<div class="kicker">CHAPTER 05 · OFFICIAL PRODUCT LIST</div>', { x: 60, y: 40 }, { at: S.at(0, -.3) });
          S.el('<div class="h2" style="font-size:36px">Selected Foreign Futures Contracts – CGSI Shariah-Compliant Futures Account</div>', { x: 60, y: 74, w: 1800 }, { at: S.at(0, -.2) });
          const col = (x, w, ex, cat, icon, items, ks, cols = 1) => {
            const p = S.el(`<div style="display:flex;justify-content:space-between;align-items:center"><div style="display:flex;gap:14px;align-items:center">${ic(icon, P.emL, 40)}<div><div style="font:800 26px JBM;color:#fff">${ex}</div><div class="mono" style="font-size:14px;letter-spacing:1.2px;color:${P.sub}">${cat}</div></div></div><span style="font:700 40px JBM;color:${P.emL}">${items.length}</span></div>`,
              { x, y: 150, w, h: 520, cls: 'panel', style: 'padding:22px 26px' }, { at: ks[0] - .4 });
            p.style.borderTop = `3px solid ${P.em}`;
            const per = Math.ceil(items.length / cols), cw = (w - 52) / cols;
            items.forEach((it, i) => {
              const c = Math.floor(i / per), r = i % per;
              S.el(`<div style="display:flex;gap:14px;align-items:baseline"><span class="mono" style="font-size:15px;color:${P.dim}">${String(i + 1).padStart(2, '0')}</span><span style="font:600 23px/1.25 Inter;color:#e8eef7">${it}</span></div>`,
                { x: 26 + c * cw, y: 104 + r * 74, w: cw - 10, parent: p }, { at: ks[i] !== undefined ? ks[i] : ks[ks.length - 1], dx: -10, dy: 0 });
            });
          };
          col(60, 420, 'NYMEX', 'ENERGY FUTURES', 'flame', ['WTI Light Sweet Crude Oil', 'Natural Gas'], [S.at(1, .3), S.at(1, 2.4)]);
          const cb = ['Soybeans', 'Mini Soybean', 'Soybean Oil', 'Soybean Meal', 'Corn', 'Mini Corn', 'Wheat', 'KC HRW Wheat (Mini)', 'Chicago SRW Wheat (Mini)', 'Oats'];
          col(500, 900, 'CBOT', 'GRAINS & OILSEED FUTURES', 'wheat', cb, [S.at(2, .6), S.at(2, 1.6), S.at(2, 2.6), S.at(2, 3.6), S.at(3, 0), S.at(3, .8), S.at(3, 1.6), S.at(3, 2.4), S.at(3, 3.6), S.at(3, 5)], 2);
          col(1420, 440, 'SGX', 'COMMODITY FUTURES', 'leaf', ['SICOM TSR20 Rubber'], [S.at(4, .4)]);
          const tot = S.el(`<div style="display:flex;gap:26px;align-items:center;height:100%"><span class="mono" style="font-size:16px;letter-spacing:1.4px;color:${P.sub}">NYMEX 2 · CBOT 10 · SGX 1</span><span style="font:800 30px Inter;color:${P.emL}">= 13 foreign contracts</span><span style="font:500 21px Inter;color:${P.sub}">+ Bursa Malaysia: <b style="color:#fff">FCPO · FPKO · FEPO</b></span></div>`,
            { x: 60, y: 690, w: 1800, h: 64, cls: 'panel', style: 'padding:0 26px' }, { at: S.at(5) });
          tot.style.borderColor = P.em;
        }
      },
      {
        label: 'SCF LIST ≠ ALL GLOBAL FUTURES', cues: [
          cue('Perhatian: tidak semua produk yang didagangkan di NYMEX, CBOT atau SGX adalah patuh Syariah.', 'Please note: not every product traded on NYMEX, CBOT or SGX is Shariah-compliant.'),
          cue('CGS International juga menawarkan Global Futures konvensional, seperti emas, Nasdaq dan indeks saham.', 'CGS International also offers conventional global futures, such as gold, Nasdaq and stock index futures.'),
          cue('Kewujudan produk dalam platform Global Futures tidak bermaksud ia termasuk dalam senarai Shariah-Compliant Futures.', 'A product being available on the Global Futures platform does not mean it is on the Shariah-Compliant Futures list.'),
          cue('Hanya kontrak yang disenaraikan secara rasmi di halaman SCF CGS International termasuk dalam akaun ini, dan senarai boleh berubah.', 'Only contracts officially listed on the CGS International SCF page are covered by this account, and the list can change.')],
        build(S, C) {
          S.heading('CHAPTER 05 · IMPORTANT DISTINCTION', 'Same exchange ≠ Shariah-compliant', S.at(0, -.3));
          const outer = S.el(`<div class="ptitle">GLOBAL FUTURES · CONVENTIONAL OFFERING</div><div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">${['Gold', 'Nasdaq', 'Stock index futures', '…and other contracts'].map(x => chip(x, P.dim)).join('')}</div>`,
            { x: 60, y: 170, w: 1100, h: 520, cls: 'panel', style: 'padding:26px 30px;border-style:dashed;border-width:2px' }, { at: S.at(1, -.2) });
          const inner = S.el(`<div style="display:flex;gap:16px;align-items:center">${ic('shield', P.emL, 44)}<div><div class="ptitle" style="color:${P.emL}">SHARIAH-COMPLIANT FUTURES LIST</div><div style="font:700 26px Inter;margin-top:4px">Only the officially listed contracts</div></div></div>
            <div class="mono" style="margin-top:20px;font-size:17px;color:${P.sub};line-height:1.8">NYMEX 2 · CBOT 10 · SGX 1<br>+ FCPO · FPKO · FEPO</div>`,
            { x: 400, y: 330, w: 640, h: 260, cls: 'panel', style: 'padding:28px 30px;background:rgba(22,138,105,.10)' }, { at: S.at(3, -.2), scale: .05 });
          inner.style.borderColor = P.em;
          const rules = [['✕', 'Listed on NYMEX, CBOT or SGX → not automatically Shariah-compliant', P.short, 0], ['✕', 'Available on the Global Futures platform → not automatically on the SCF list', P.short, 2], ['✓', 'Check the latest official SCF list — it can change', P.emL, 3]];
          rules.forEach((r, i) => S.el(`<div style="display:flex;gap:16px"><span style="font:700 28px Inter;color:${r[2]};flex:none;width:28px">${r[0]}</span><span style="font:500 23px/1.35 Inter;color:#e3e9f2">${r[1]}</span></div>`,
            { x: 1200, y: 190 + i * 150, w: 660, h: 130, cls: 'panel', style: 'padding:22px 24px' }, { at: S.at(r[3], .2) }));
        }
      },

      /* ============ CHAPTER 6 · WHO PROVIDES THE SHARIAH ASSESSMENT ============ */
      chapter(6, 'Siapa yang membuat penilaian Syariah?', cue('Bab enam: siapa yang membuat penilaian Syariah?', 'Chapter six: who provides the Shariah assessment?')),
      {
        label: 'TWO GOVERNANCE ARRANGEMENTS', cues: [
          cue('Terdapat dua susunan tadbir urus Syariah yang berbeza.', 'There are two different Shariah governance arrangements.'),
          cue('Bahagian A: bagi FCPO, FPKO dan FEPO, CGS International merujuk kepada resolusi Majlis Penasihat Syariah Suruhanjaya Sekuriti.', 'Part A: for FCPO, FPKO and FEPO, CGS International refers to the resolutions of the Shariah Advisory Council of the Securities Commission.'),
          cue('Bahagian B: bagi foreign futures terpilih, penasihat Syariah CGS International telah memberikan persetujuan,', 'Part B: for the selected foreign futures, the CGS International Shariah Advisor has given its concurrence,'),
          cue('berdasarkan spesifikasi produk dan pertimbangan Syariah yang berkaitan.', 'based on the relevant product specifications and Shariah considerations.'),
          cue('Menurut FAQ rasmi CGSI, syarikat melantik penasihat Syariah bebas yang diluluskan oleh Suruhanjaya Sekuriti.', 'According to the official CGSI FAQ, the company appoints an independent Shariah Advisor approved by the Securities Commission.'),
          cue('Penasihat ini menyemak struktur produk, dokumentasi, borang permohonan dan pelaksanaan keseluruhan produk patuh Syariah.', 'The advisor reviews product structures, documentation, application forms, and the overall implementation of Shariah-compliant products and services.'),
          cue('Penting: resolusi MPS SC dan persetujuan penasihat Syariah CGSI ialah dua asas yang berbeza, bukan satu sijil yang sama.', 'Important: SAC resolutions, and the concurrence of CGSI’s Shariah Advisor, are two different bases. They are not one and the same certification.')],
        build(S, C) {
          S.heading('CHAPTER 06 · SHARIAH GOVERNANCE', 'Two different Shariah governance arrangements', S.at(0, -.3));
          const part = (x, c, tag, title, chips, icon, who, basis, k) => {
            const p = S.el(`<div class="ptitle" style="color:${c}">${tag}</div><div style="font:700 28px Inter;margin-top:8px">${title}</div><div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">${chips.map(z => chip(z, P.silver)).join('')}</div>`,
              { x, y: 165, w: 880, h: 330, cls: 'panel', style: 'padding:24px 30px' }, { at: S.at(k, -.2) });
            p.style.borderTop = `3px solid ${c}`;
            S.el(`<div style="display:flex;gap:18px;align-items:center;border-top:1px solid rgba(170,195,235,.12);padding-top:18px">${ic(icon, c, 50)}<div><div class="mono" style="font-size:14px;letter-spacing:1.4px;color:${P.dim}">SHARIAH ASSESSMENT BY</div><div style="font:700 24px/1.3 Inter;color:#fff">${who}</div><div class="mono" style="font-size:15px;color:${c};margin-top:6px;letter-spacing:.8px">${basis}</div></div></div>`,
              { x: 30, y: 176, w: 820, parent: p }, { at: S.at(k, 1.2) });
            return p;
          };
          part(60, P.blue, 'PART A · BURSA MALAYSIA CONTRACTS', 'Bursa Malaysia Derivatives', ['FCPO', 'FPKO', 'FEPO'], 'bank', 'Shariah Advisory Council (SAC), Securities Commission Malaysia', 'BASIS · SAC RESOLUTIONS', 1);
          part(980, P.emL, 'PART B · SELECTED FOREIGN FUTURES', '13 contracts · NYMEX · CBOT · SGX', ['NYMEX 2', 'CBOT 10', 'SGX 1'], 'shield', 'CGSI’s appointed independent Shariah Advisor', 'BASIS · ASSESSMENT & CONCURRENCE', 2);
          const faq = S.el(`<div class="ptitle">PER CGSI FAQ · THE APPOINTED SHARIAH ADVISOR</div><div style="font:500 22px Inter;margin-top:10px;color:#e3e9f2">Independent · approved by the Securities Commission Malaysia · reviews:</div>`,
            { x: 980, y: 515, w: 880, h: 200, cls: 'panel', style: 'padding:20px 30px' }, { at: S.at(4, -.2) });
          const row = S.el('', { x: 30, y: 116, w: 830, parent: faq, style: 'display:flex;gap:12px;flex-wrap:wrap' });
          ['Product structures', 'Documentation', 'Application forms', 'Implementation'].forEach((z, i) => { const sp = document.createElement('span'); sp.innerHTML = chip(z, P.emL, 'rgba(22,138,105,.10)'); sp.firstChild.style.letterSpacing = '.4px'; sp.firstChild.style.fontSize = '16px'; row.appendChild(sp); S.show(sp, { at: S.at(5, i * .8), dy: 8 }); });
          const d = S.el(`<div class="ptitle" style="color:${P.warn}">IMPORTANT DISTINCTION</div>
            <div style="font:500 20px/1.45 Inter;color:#e3e9f2;margin-top:10px"><b style="color:#fff">SAC SC resolutions ≠ CGSI Shariah Advisor’s concurrence.</b> Two bases — not one shared certificate. No SAC ruling per foreign contract is cited by CGSI; not a Bursa Malaysia certification.</div>`,
            { x: 60, y: 515, w: 880, h: 200, cls: 'panel', style: 'padding:20px 30px' }, { at: S.at(6, -.2) });
          d.style.borderColor = 'rgba(216,162,74,.5)';
          src(S, 'CGS International — Shariah-Compliant Futures · CGSI Shariah Governance FAQ', S.at(1, .5), 735);
        }
      },
      {
        label: 'VERIFY AT CONTRACT & ACCOUNT LEVEL', cues: [
          cue('Terma dan syarat CGSI menyatakan bahawa akaun Shariah-Compliant Futures adalah terhad kepada kontrak tertentu sahaja,', 'CGSI’s terms and conditions state that a Shariah-Compliant Futures account is restricted to specific contracts,'),
          cue('iaitu kontrak yang diluluskan sebagai patuh Syariah oleh MPS SC dan/atau penasihat Syariah yang diberi kuasa.', 'namely those approved as Shariah-compliant by the SAC of the Securities Commission, and or, the broker’s authorised Shariah Advisor.'),
          cue('Penilaian Syariah juga perlu melihat struktur kontrak, dokumentasi, kaedah pelaksanaan dan mekanisme penyelesaian.', 'A Shariah assessment must also consider the contract structure, documentation, execution method, and settlement mechanism.'),
          cue('Penilaian Syariah CGSI terpakai kepada akaun dan produk CGSI. Ia tidak terpakai secara automatik kepada broker lain.', 'CGSI’s Shariah assessment applies to CGSI’s own account and products. It does not automatically apply to products offered by other brokers.'),
          cue('Oleh itu, sahkan status Syariah pada peringkat kontrak dan peringkat akaun, menggunakan dokumen rasmi terkini.', 'So verify the Shariah status at both the contract level and the account level, using the latest official documents.')],
        build(S, C) {
          S.heading('CHAPTER 06 · ACCOUNT-LEVEL GOVERNANCE', 'Verify at the contract and account level', S.at(0, -.3));
          const tc = S.el(`<div style="display:flex;gap:16px;align-items:center">${ic('doc', P.blue, 44)}<span class="ptitle" style="color:${P.blue}">CGSI · SCF ACCOUNT TERMS &amp; CONDITIONS</span></div>
            <div class="quote" style="margin-top:20px;font-size:26px">A Shariah-Compliant Futures Account is <b>restricted</b> to futures contracts approved as Shariah-compliant by the <span style="color:${P.blue}">SAC of the SC</span> and/or the broker’s <span style="color:${P.emL}">authorised Shariah Advisor</span>.</div>`,
            { x: 60, y: 170, w: 1060, h: 280, cls: 'panel', style: 'padding:28px 34px' }, { at: S.at(0, -.2) });
          tc.style.borderLeft = `4px solid ${P.blue}`;
          S.el(`<div class="ptitle">ASSESSMENT CONSIDERS</div>`, { x: 1160, y: 178 }, { at: S.at(2, -.2) });
          ['Contract structure', 'Documentation', 'Execution method', 'Settlement mechanism'].forEach((z, i) => S.el(`<div style="display:flex;gap:14px;align-items:center"><span style="width:10px;height:10px;border-radius:50%;background:${P.emL}"></span><span style="font:600 24px Inter">${z}</span></div>`, { x: 1160, y: 222 + i * 54, w: 700 }, { at: S.at(2, .3 + i * .6), dx: -12, dy: 0 }));
          const steps = [['search', 'Contract', 'Is it on the latest official SCF list?'], ['user', 'Account', 'Is it held in a Shariah-Compliant Futures account?'], ['doc', 'Source', 'Latest official documents & Shariah authority']];
          steps.forEach((s, i) => {
            const d = S.el(`<div style="display:flex;gap:16px;align-items:center">${ic(s[0], P.emL, 44)}<div><div class="num" style="color:${P.emL}">CHECK ${i + 1}</div><div style="font:700 25px Inter">${s[1]}</div></div></div><div class="cb" style="font-size:20px;margin-top:12px">${s[2]}</div>`,
              { x: 60 + i * 470, y: 490, w: 440, h: 200, cls: 'card', style: 'padding:22px 26px' }, { at: S.at(4, i * 1.2) });
            d.style.borderTop = `3px solid ${P.em}`;
          });
          const b = S.el(`<div style="font:700 22px/1.35 Inter;color:#fff">CGSI’s assessment ≠ other brokers</div><div class="cb" style="font-size:19px">Applies to CGSI’s own SCF account and products — not automatically to products offered elsewhere.</div>`,
            { x: 1470, y: 490, w: 390, h: 200, cls: 'card', style: 'padding:22px 24px' }, { at: S.at(3) });
          b.style.borderTop = `3px solid ${P.warn}`;
          src(S, 'CGSI SCF Terms &amp; Conditions · Jabatan Mufti Negeri Selangor (supplementary)', S.at(0, .5), 735);
        }
      },

      /* ============ CHAPTER 7 · CONCLUSION ============ */
      chapter(7, 'Kesimpulan dan penzahiran bertanggungjawab', cue('Bab tujuh: kesimpulan.', 'Chapter seven: conclusion.')),
      {
        label: 'CONCLUSION', cues: [
          cue('Kesimpulannya, FCPO mempunyai asas pengiktirafan Syariah melalui keputusan MPS Suruhanjaya Sekuriti Malaysia pada tahun 1997.', 'In conclusion, FCPO’s Shariah recognition is based on the 1997 resolution of the Shariah Advisory Council of the Securities Commission Malaysia.'),
          cue('Beberapa kontrak foreign futures turut ditawarkan dalam akaun SCF CGS International,', 'In addition, several foreign futures contracts are also offered in the CGS International SCF account,'),
          cue('berdasarkan penilaian dan persetujuan penasihat Syariah mereka.', 'based on the assessment and concurrence of its Shariah Advisor.'),
          cue('Namun, status patuh Syariah adalah khusus kepada kontrak dan struktur yang telah dinilai.', 'However, Shariah-compliant status is specific to the contracts and structures that have been assessed.'),
          cue('Ia tidak bermaksud semua produk futures di seluruh dunia secara automatik adalah patuh Syariah.', 'It does not mean that every futures product in the world is automatically Shariah-compliant.'),
          cue('Sebagai peserta pasaran, kita bertanggungjawab memahami produk yang didagangkan,', 'As market participants, we are responsible for understanding the products we trade,'),
          cue('dan merujuk kepada dokumen rasmi serta penasihat Syariah yang berautoriti.', 'and for referring to official documents and authoritative Shariah advisers.'),
          cue('Ilmu, pemahaman dan pematuhan kepada prinsip Syariah perlu berjalan seiring.', 'Knowledge, understanding, and adherence to Shariah principles must go hand in hand.')],
        build(S, C) {
          S.heading('KEY LEARNING POINTS', 'What to remember', S.at(0, -.3));
          S.bullets([{ t: 'FCPO — SAC SC resolution · 11th meeting · 26 November 1997' }, { t: '13 selected foreign futures — CGSI Shariah Advisor’s concurrence (SCF Account)' }, { t: 'Shariah status is specific to the contracts and structures assessed' }, { t: 'Not every futures product worldwide is automatically Shariah-compliant', x: 1 }, { t: 'Understand the product · refer to official documents & authoritative Shariah advisers' }],
            60, 175, 1800, [S.at(0, .3), S.at(1, .3), S.at(3), S.at(4), S.at(5, .5)], { check: true, size: 29 });
          S.el(`<div style="font:800 40px/1.25 Inter;color:#fff">Knowledge, understanding <span style="color:${P.blue}">&amp;</span> <span style="color:${P.emL}">Shariah compliance</span> go hand in hand.</div>`, { x: 60, y: 600, w: 1800 }, { at: S.at(7) });
        }
      },
      {
        label: 'CLOSING', hold: 1.6, cues: [cue('Fahami kontrak. Fahami prinsip Syariah.', 'Understand the contract. Understand the Shariah principles.')],
        build(S, C) {
          S.el(`<div style="text-align:center;width:1920px"><div class="kicker" style="letter-spacing:6px">ISLAMIC FINANCE EXPLAINER</div>
            <div class="h1" style="font-size:96px;margin-top:22px">SHARIAH-COMPLIANT FUTURES</div>
            <div style="font:700 34px JBM;color:${P.blue};margin-top:26px;letter-spacing:4px">FCPO <span style="color:${P.dim}">|</span> NYMEX <span style="color:${P.dim}">|</span> CBOT <span style="color:${P.dim}">|</span> SGX</div>
            <div style="width:200px;height:3px;background:${P.em};margin:40px auto 0"></div>
            <div style="font:500 38px Inter;color:${P.silver};margin-top:36px">“Understand the Contract. Understand the Shariah Principles.”</div></div>`, { x: 0, y: 150 }, { at: S.at(0, -.5), scale: .03 });
        }
      },
      {
        label: 'REFERENCES', hold: 4, cues: [cue('Rujukan rasmi dipaparkan di skrin. Sila rujuk sumber asal untuk status terkini.', 'The official references are shown on screen. Please refer to the original sources for the latest status.')],
        build(S, C) {
          S.el('<div class="kicker">REFERENCES · RUJUKAN</div>', { x: 60, y: 30 }, { at: S.at(0, -.4) });
          S.el('<div class="h3">Official sources</div>', { x: 60, y: 62 }, { at: S.at(0, -.3) });
          const R = [['Securities Commission Malaysia — Resolutions of the Shariah Advisory Council', 'https://www.sc.com.my/'],
            ['Securities Commission Malaysia — Crude Palm Oil Futures & Crude Palm Kernel Oil Futures resolutions', 'https://www.sc.com.my/api/documentms/download.ashx?id=5f0c31dc-daa9-43c1-80ac-e7ecf70c8e44'],
            ['CGS International — Shariah-Compliant Futures', 'https://www.cgsi.com.my/our-offerings/products/shariah-compliant-futures'],
            ['CGS International — Shariah Governance FAQ', 'https://www.cgsi.com.my/help/faq-category-1?lang=EN'],
            ['CGS International — Shariah-Compliant Futures Terms and Conditions', 'https://www.cgsi.com.my/uploads/CGSI_Futures_Msia_Sdn_Bhd_Terms_and_Conditions_Conventional_and_Shariah_v2_1_0224_6b6ccb66d7.pdf'],
            ['Jabatan Mufti Negeri Selangor — Crude Oil Futures Shariah Explanation (supplementary)', 'https://emusykil.muftiselangor.gov.my/index.php/site/jawapan?id=8545']];
          R.forEach((r, i) => S.el(`<div style="display:flex;gap:22px;align-items:center"><span class="mono" style="color:${P.blue};font-size:20px">0${i + 1}</span><div><div style="font:600 22px Inter">${r[0]}</div><div class="mono" style="font-size:14.5px;color:${P.sub};margin-top:6px;letter-spacing:.2px">${r[1]}</div></div></div>`,
            { x: 60, y: 130 + i * 102, w: 1800, h: 88, cls: 'panel', style: 'display:flex;align-items:center;padding:0 26px' }, { at: S.at(0, .2 + i * .35) }));
        }
      },
      {
        label: 'DISCLAIMER', hold: 3, cues: [cue('Video ini untuk tujuan pendidikan dan maklumat sahaja. Status Syariah tertakluk kepada pihak berautoriti Syariah dan dokumen rasmi terkini.', 'This video is for educational and informational purposes only. Shariah status is subject to the relevant Shariah authorities and the latest official documents.')],
        build(S, C) {
          const d = S.el(`<div style="text-align:center"><div style="font-size:40px;color:${P.warn}">⚠</div><div class="kicker" style="margin-top:8px">DISCLAIMER · PENAFIAN</div>
            <div class="body" style="margin-top:20px;font-size:25px;color:#e3e9f2">This video is produced for educational and informational purposes only. Shariah status is subject to the applicable resolutions, product specifications, account arrangements and approval of the relevant Shariah authorities or appointed Shariah advisors. Refer to official documents for the latest status.</div>
            <div class="small" style="margin-top:20px;font-size:19px">Bukan nasihat pelaburan, bukan promosi akaun atau perkhidmatan broker, dan bukan fatwa. Semak status terkini dengan dokumen rasmi.</div></div>`,
            { x: 360, y: 120, w: 1200, h: 520, cls: 'panel', style: 'display:flex;align-items:center;padding:40px 64px' }, { at: S.at(0, -.4) });
          d.style.borderColor = 'rgba(216,162,74,.45)';
        }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
