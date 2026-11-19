/* CMI Equity Series ("Introduction to Stock & Equity Market") — shared helpers.
 * Loaded by engine/player.html after _lib.js. Only used inside scene build() functions,
 * so Node tools (cues.js, storyboard.js) never need to evaluate it.
 * Layout, theme and logo intro matched to the reference video (CMI Futures Series V01).
 */
(function () {
  const G = typeof window !== 'undefined' ? window : global;

  // line icons (24x24, stroke = currentColor)
  const I = {
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8.5 7h2M13.5 7h2M8.5 11h2M13.5 11h2M8.5 15h2M13.5 15h2M10 21v-3h4v3"/>',
    store: '<path d="M3 9l1.6-5h14.8L21 9M3 9h18M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M5 12v9h14v-9M10 21v-5h4v5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .8 3.5 2.5 3.5 5.2"/>',
    pie: '<path d="M21 12.5A9 9 0 1 1 11.5 3v9.5z"/><path d="M14.5 2.6a9 9 0 0 1 6.9 6.9h-6.9z"/>',
    coins: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    up: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    down: '<path d="M3 7l6 6 4-4 8 8M15 17h6v-6"/>',
    bank: '<path d="M3 21h18M5 21v-10M9.5 21v-10M14.5 21v-10M19 21v-10M2 10l10-6 10 6z"/>',
    file: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    vote: '<rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V4h8v7M9.8 7.3l1.6 1.6L14.4 6"/>',
    alert: '<path d="M12 3.5l9.5 17h-19z"/><path d="M12 10v5M12 17.6v.4"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    swap: '<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
    loan: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v5M17.5 9.5v5"/>',
    gavel: '<path d="M14 4l6 6M11 7l6 6M12.5 5.5l-5 5 6 6 5-5M10 13l-7 7"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    doc: '<path d="M7 3h10v18H7z"/><path d="M10 7h4M10 11h4M10 15h2"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    piggy: '<path d="M4 11c0-3.3 3.6-6 8-6 3.2 0 5.9 1.4 7.2 3.4H21v4h-1.6c-.6 1.3-1.6 2.4-3 3.1V20h-3v-2h-3v2h-3v-3.2C5.4 15.7 4 13.5 4 11z"/><path d="M10 5.2V4h4"/>'
  };
  function icon(n, size = 34, color = 'currentColor', sw = 1.8) {
    return `<span class="ico" style="color:${color}"><svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${I[n] || ''}</svg></span>`;
  }

  const SERIES = [
    'Apa Itu Saham dan Kenapa Syarikat Disenaraikan',
    'Bursa Malaysia: Pasaran Utama, ACE & LEAP',
    'Akaun CDS dan Akaun Dagangan',
    'Waktu Dagangan, Lot dan Cara Pesanan Beli/Jual',
    'Membaca Candlestick',
    'Trend Naik, Turun dan Mendatar',
    'Sokongan dan Rintangan',
    'Volume: Kenapa Ia Penting?'
  ];
  const MODULE = n => n <= 4
    ? { badge: 'M1', hl1: 'MODUL 1 · KENALI PASARAN SAHAM' }
    : { badge: 'M2', hl1: 'MODUL 2 · ASAS MEMBACA CARTA' };
  function header(n, short) {
    const m = MODULE(n);
    return {
      badge: m.badge, hl1: m.hl1, hl2: 'CAPITAL MARKET INSTITUTE · EQUITY SERIES',
      video: `VIDEO ${String(n).padStart(2, '0')}`, title: SERIES[n - 1], short,
      stageClass: 'grid', intro: { img: 'assets/cmi_logo_intro.png', dur: 3.25, fade: .45 }
    };
  }
  /* silent logo scene (matches reference: ~3.4 s white logo card, then fade to the first scene) */
  const introScene = () => ({ label: 'INTRO', hold: 1.9, cues: [], build() {} });

  /* card with icon, title, mono subtitle and optional body */
  function card(S, o) {
    const col = o.c || '#e8b44c';
    const html = `<div style="display:flex;gap:14px;align-items:center">${o.icon ? icon(o.icon, o.is || 30, col) : ''}<div><div style="font:700 ${o.fs || 26}px/1.2 Inter;color:#f1f5fb">${o.t}</div>${o.s ? `<div class="lbl" style="margin-top:5px;font-size:14px">${o.s}</div>` : ''}</div></div>${o.b ? `<div style="font:400 ${o.bs || 22}px/1.45 Inter;color:#b9c4d6;margin-top:16px">${o.b}</div>` : ''}`;
    const d = S.el(html, { x: o.x, y: o.y, w: o.w, h: o.h, cls: 'card', parent: o.parent }, o.at === undefined ? null : { at: o.at, dy: 12 });
    if (o.top) d.style.borderTop = `3px solid ${col}`;
    return d;
  }
  function chip(S, txt, x, y, col, at, o = {}) {
    return S.el(`<span class="chip" style="color:${col};border-color:${col}aa;${o.fs ? `font-size:${o.fs}px` : ''}">${txt}</span>`, { x, y, w: o.w, parent: o.parent, style: o.center ? 'text-align:center' : '' }, at === undefined ? null : { at, dy: 6 });
  }

  /* animated pie: slices [{v, c, label}] ; sweep at `at`; `pop` index pulled out at popAt */
  function pie(S, x, y, r, slices, at, o = {}) {
    const s = S.svg(x - r - 60, y - r - 60, 2 * r + 120, 2 * r + 120), cx = r + 60, cy = r + 60;
    const tot = slices.reduce((a, b) => a + b.v, 0);
    S.anim(t => {
      const p = CMI.ease((t - at) / (o.dur || 1.4)); if (p <= 0) { s.innerHTML = ''; return; }
      let a0 = -Math.PI / 2, out = '';
      slices.forEach((sl, i) => {
        const a1 = a0 + sl.v / tot * 2 * Math.PI * p;
        const pp = o.pop === i ? CMI.ease((t - o.popAt) / .5) : 0, mid = (a0 + a1) / 2, ox = Math.cos(mid) * 18 * pp, oy = Math.sin(mid) * 18 * pp;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const pth = `M${cx + ox},${cy + oy} L${cx + ox + r * Math.cos(a0)},${cy + oy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + ox + r * Math.cos(a1)},${cy + oy + r * Math.sin(a1)} Z`;
        out += `<path d="${pth}" fill="${sl.c}" stroke="#0a1328" stroke-width="3"/>`;
        if (sl.label && p > .98) {
          const lr = r + 34 + 18 * pp, lx = cx + ox + Math.cos(mid) * lr, ly = cy + oy + Math.sin(mid) * lr;
          const la = o.pop === i ? pp : CMI.ease((t - at - (o.dur || 1.4)) / .4);
          out += `<text x="${lx}" y="${ly + 7}" text-anchor="middle" font-family="JBM" font-weight="700" font-size="${sl.fs || 18}" fill="${sl.lc || sl.c}" opacity="${la}">${sl.label}</text>`;
        }
        a0 = a1;
      });
      s.innerHTML = out;
    });
    return s;
  }

  /* opening title scene (reference scene 2 layout) */
  function titleScene(S, C, o) {
    S.el(`<div class="kicker" style="letter-spacing:5px">${o.kicker}</div>`, { x: 104, y: 120 }, { at: S.at(0, -.3) });
    S.el(`<div class="h1" style="font-size:${o.size || 76}px">${o.title}</div>`, { x: 100, y: 160, w: 1700 }, { at: S.at(0) });
    const ly = o.leadY || 335;
    S.el(`<div class="lead">${o.lead}</div>`, { x: 104, y: ly }, { at: S.at(0, .4) });
    S.el('<div class="rule" style="width:320px"></div>', { x: 104, y: ly + 62 }, { at: S.at(0, .6), dy: 0, dx: -20 });
    S.el('<div class="lbl" style="font-size:18px;letter-spacing:3px">OBJEKTIF PEMBELAJARAN</div>', { x: 104, y: ly + 108 }, { at: S.at(1, -.3) });
    S.bullets(o.objectives, 104, ly + 150, 1000, o.ats, { check: true, size: 30 });
  }
  function heading(S, kicker, title, at, o = {}) {
    S.el(`<div class="kicker" style="font-size:17px;letter-spacing:3px">${kicker}</div>`, { x: o.x || 60, y: o.y || 46 }, { at });
    S.el(`<div class="h2" style="font-size:${o.fs || 38}px">${title}</div>`, { x: o.x || 60, y: (o.y || 46) + 30, w: o.w || 1600 }, { at: at + .1 });
  }
  function keyPoints(S, C, title, items, ats, cols = 2) {
    heading(S, 'PERKARA UTAMA · KEY POINTS', title, S.at(0, -.3));
    const half = Math.ceil(items.length / cols);
    for (let c = 0; c < cols; c++) S.bullets(items.slice(c * half, (c + 1) * half), 90 + c * 880, 190, 820, ats.slice(c * half, (c + 1) * half), { check: true, size: 29 });
  }
  function seriesScene(S, C, n, ats) {
    heading(S, 'SIRI EKUITI · MODUL 1 & 2', 'Lapan video · satu asas', S.at(0, -.3));
    SERIES.forEach((t, i) => {
      const cur = i + 1 === n, y = 165 + i * 66 + (i >= 4 ? 18 : 0);
      if (i === 0) S.el('<div class="lbl" style="color:#e8b44c">MODUL 1 · KENALI PASARAN SAHAM</div>', { x: 90, y: 138 }, { at: S.at(0) });
      if (i === 4) S.el('<div class="lbl" style="color:#e8b44c">MODUL 2 · ASAS MEMBACA CARTA</div>', { x: 90, y: y - 26 }, { at: S.at(0, .4) });
      const d = S.el(`<span style="font:700 18px JBM;color:${cur ? '#e8b44c' : '#5f6e86'};margin-right:22px">${String(i + 1).padStart(2, '0')}</span><span style="font:${cur ? 700 : 500} 25px Inter;color:${cur ? '#f1f5fb' : '#b9c4d6'}">${t}</span>`,
        { x: 90, y, w: 900, h: 54, cls: 'panel', style: `display:flex;align-items:center;padding:0 22px;${cur ? 'border-color:#e8b44c' : ''}` }, { at: S.at(0, .15 * i), dx: -12, dy: 0 });
      if (cur) chip(S, 'ANDA DI SINI', 1010, y + 12, '#e8b44c', S.at(0, 1.4));
      if (i + 1 === n + 1) S.hl(d, ats[1], undefined, 'rgba(91,141,239,.6)');
    });
  }
  function refsScene(S, C, refs, at) {
    heading(S, 'RUJUKAN · REFERENCES', 'Sumber rujukan video ini', S.at(0, -.3));
    refs.forEach((r, i) => S.el(`<span style="font:700 17px JBM;color:#e8b44c;margin-right:20px">${String(i + 1).padStart(2, '0')}</span><span style="font:600 22px Inter;color:#e3e9f2;flex:1">${r.t}</span><span style="font:400 16px JBM;color:#5f6e86;margin-left:20px">${r.tag}</span>`,
      { x: 90, y: 175 + i * 76, w: 1740, h: 62, cls: 'panel', style: 'display:flex;align-items:center;padding:0 24px' }, { at: at + .25 * i, dx: -12, dy: 0 }));
    S.el('<div class="small" style="font-size:20px">Fakta & peraturan boleh berubah — sentiasa semak laman rasmi Bursa Malaysia dan Securities Commission Malaysia untuk maklumat terkini.</div>', { x: 92, y: 175 + refs.length * 76 + 20, w: 1700 }, { at: at + 1 });
  }
  function disclaimerScene(S, C, next) {
    const box = S.el(`<div style="display:flex;flex-direction:column;align-items:center;text-align:center">${icon('alert', 60, '#e8b44c', 1.6)}
      <div class="kicker" style="margin-top:22px;font-size:18px">PENAFIAN · DISCLAIMER</div>
      <div style="font:700 34px/1.3 Inter;margin-top:20px">Educational Content Only.</div>
      <div style="font:400 23px/1.5 Inter;color:#c7d0de;margin-top:14px;max-width:880px">This content is intended for general educational purposes and does not constitute investment advice or a recommendation to buy or sell any securities.</div>
      <div style="font:400 21px/1.5 Inter;color:#9aa8be;margin-top:12px;max-width:880px">Kandungan pendidikan sahaja — bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.</div>
      <div class="mono" style="font-size:17px;color:#8794aa;margin-top:18px">Semua harga & angka dalam video ini ialah contoh ilustrasi, bukan data pasaran sebenar.</div></div>`,
      { x: 440, y: 70, w: 1040, cls: 'panel', style: 'padding:40px 60px;border-color:rgba(232,180,76,.55)' }, { at: S.at(0, -.3) });
    S.el(`<div style="text-align:center"><div style="font:800 30px Inter;letter-spacing:4px">CAPITAL MARKET INSTITUTE</div><div class="mono" style="font-size:18px;letter-spacing:4px;color:#5b8def;margin-top:10px">UNDERSTANDING MARKETS. BUILDING KNOWLEDGE.</div></div>`, { x: 0, y: 600, w: 1920 }, { at: S.at(1, -.2) });
    if (next) S.el(`<div style="text-align:center;font:400 24px Inter;color:#9aa8be">Seterusnya: ${next}</div>`, { x: 0, y: 706, w: 1920 }, { at: S.at(1, .6) });
  }

  G.EQ = { icon, I, SERIES, header, introScene, card, chip, pie, titleScene, heading, keyPoints, seriesScene, refsScene, disclaimerScene };
  if (typeof module !== 'undefined') module.exports = G.EQ;
})();
