/* CMI Level 9 — shared scene library.
 * Scene factories return { label, cues, hold, build(S, C) }. Cues are Malay narration
 * (subtitle text; RM/TF abbreviations are expanded for TTS by build_audio.py).
 * L.example() builds a 4-scene FCPO trade example from the validated EP01 template,
 * mapped (scaled / mirrored) to any entry, risk and direction. Monotonic integer mapping
 * preserves OHLC validity and every structural relation (sweep, MSS, FVG, fill, TP/SL).
 */
(function () {
  const L = {};
  const fmt = p => Math.round(p).toLocaleString('en-US');
  const K = (S, it, def = 0) => S.at(it.k !== undefined ? it.k : def, it.d || 0);
  const pick = (o, k, d) => (o[k] !== undefined ? o[k] : d);

  /* ------------------------------------------------------------------ basics */
  function head(S, o) { S.heading(o.kicker || '', o.title || '', S.at(0, -.3)); }
  function note(S, o, y) { if (o.note) S.el(`<div class="body" style="color:#9aa8be">${o.note.t}</div>`, { x: 60, y: o.note.y || y, w: 1800 }, { at: K(S, o.note, o.cues.length - 1) }); }
  function sidePanel(S, o, x, y, w, h) {
    const p = S.el('', { x, y, w, h, cls: 'panel' }, { at: K(S, o, 0) - .2 });
    if (o.kicker) S.el(`<div class="kicker" style="font-size:17px;${o.kc ? 'color:' + o.kc : ''}">${o.kicker}</div>`, { x: 28, y: 28, parent: p });
    if (o.title) S.el(`<div class="h3" style="font-size:29px">${o.title}</div>`, { x: 28, y: 60, w: w - 56, parent: p });
    if (o.items) S.bullets(o.items.map(i => ({ t: i.t, c: i.c })), 28, o.title ? 140 : 76, w - 56, o.items.map(i => K(S, i)), { size: o.size || 24, parent: p, check: o.check });
    return p;
  }
  L.side = sidePanel;

  /* heading + bullet list (+ optional right panel / schematic) */
  L.bullets = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      head(S, o);
      const w = o.side || o.schem ? 1080 : 1780;
      S.bullets(o.items.map(i => ({ t: i.t, c: i.c, x: i.x })), 60, 175, w, o.items.map(i => K(S, i)), { check: o.check, size: o.size || 29 });
      if (o.side) sidePanel(S, o.side, 1190, 170, 670, o.side.h || 560);
      if (o.schem) L.drawSchem(S, C, Object.assign({ x: 1190, y: 170, w: 670, h: 520 }, o.schem));
      note(S, o, 720);
    }
  });

  L.table = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      head(S, o);
      S.table(60, 170, 1800, o.cols, o.rows, o.rowK.map(k => typeof k === 'number' ? S.at(k) : S.at(k[0], k[1])), { colw: o.colw, colColor: o.colColor, fs: o.fs || 24, at: S.at(0, .3) });
      if (o.tag) S.el(`<span class="tag" style="color:#9aa8be;border-color:#5f6e86">${o.tag.t}</span>`, { x: 60, y: o.tag.y || 640 }, { at: K(S, o.tag, o.cues.length - 1) });
      note(S, o, 700);
    }
  });

  L.cards = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      head(S, o);
      const cols = o.cols || 3, gap = 24, w = (1800 - gap * (cols - 1)) / cols, h = o.h || 230, y0 = o.y0 || 170;
      o.cards.forEach((c, i) => {
        const col = i % cols, row = Math.floor(i / cols), color = c.c || (o.bad ? C.bear : C.amber);
        const top = `<div style="display:flex;justify-content:space-between"><span class="num" style="color:${color}">${c.n || String(i + 1).padStart(2, '0')}</span>${o.bad ? '<span style="color:#ef5350;font:700 26px Inter">✕</span>' : o.good ? '<span style="color:#34d399;font:700 26px Inter">✓</span>' : ''}</div>`;
        const d = S.el(`${top}<div class="ct" style="font-size:${o.tfs || 26}px">${c.t}</div>${c.b ? `<div class="cb" style="font-size:${o.bfs || 21}px">${c.b}</div>` : ''}`, { x: 60 + col * (w + gap), y: y0 + row * (h + gap), w, h, cls: 'card', style: 'padding:22px' }, { at: K(S, c, 0) });
        d.style.borderTop = `3px solid ${color}`;
      });
      const rows = Math.ceil(o.cards.length / cols);
      note(S, o, y0 + rows * (h + gap) + 6);
    }
  });

  /* numbered SOP steps laid out in columns */
  L.sop = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      head(S, o);
      const cols = o.cols || 3, per = Math.ceil(o.steps.length / cols), gap = 22, w = (1800 - gap * (cols - 1)) / cols, h = o.h || Math.min(92, (600 - (per - 1) * 12) / per);
      o.steps.forEach((s, i) => {
        const col = Math.floor(i / per), row = i % per, c = s.c || C.amber;
        const d = S.el(`<div style="display:flex;gap:16px;align-items:center;height:100%"><span style="flex:none;width:44px;height:44px;border-radius:50%;border:2px solid ${c};color:${c};font:700 19px JBM;display:flex;align-items:center;justify-content:center">${i + 1}</span><span style="font:500 ${o.fs || 22}px/1.25 Inter;color:#e3e9f2">${s.t}</span></div>`,
          { x: 60 + col * (w + gap), y: 170 + row * (h + 12), w, h, cls: 'panel', style: 'padding:0 18px' }, { at: K(S, s), dy: 0, dx: -12 });
        if (s.hl) S.hl(d, K(S, s) + .3, null, 'rgba(232,180,76,.6)');
      });
      note(S, o, 790);
    }
  });

  /* snake flow of boxes */
  L.flow = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      head(S, o);
      const per = o.per || 4, gap = 60, bw = (1800 - gap * (per - 1)) / per, bh = o.bh || 110, y0 = o.y0 || 190, rg = o.rg || 80;
      const nodes = o.steps.map((s, i) => {
        const row = Math.floor(i / per), pos = i % per, col = row % 2 ? per - 1 - pos : pos;
        return { id: 'n' + i, x: 60 + col * (bw + gap), y: y0 + row * (bh + rg), w: bw, h: bh, t: s.t, s: s.s, c: s.c, at: K(S, s), fs: s.fs };
      });
      const edges = nodes.slice(1).map((n, i) => ({ f: 'n' + i, to: n.id, at: n.at - .3 }));
      S.flow(nodes, edges);
      note(S, o, y0 + Math.ceil(o.steps.length / per) * (bh + rg));
    }
  });

  /* calculation panel (+ optional side panel) */
  L.calc = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      if (o.statement) { S.el(`<div class="kicker">${o.kicker}</div>`, { x: 60, y: 40 }, { at: S.at(0, -.3) }); S.el(`<div class="statement" style="font-size:${o.statement.includes('<br>') ? 54 : 64}px">${o.statement}</div>`, { x: 60, y: 80, w: 1800 }, { at: S.at(0) }); }
      else head(S, o);
      const two = o.statement && o.statement.includes('<br>'), y = o.statement ? (two ? 270 : 210) : 170, w = o.side ? 1100 : 1800;
      const p = S.el('', { x: 60, y, w, h: o.h || 470, cls: 'panel' }, { at: S.at(0, .2) });
      if (o.ptitle) S.el(`<div class="ptitle">${o.ptitle}</div>`, { x: 30, y: 22, parent: p });
      o.lines.forEach((l, i) => S.el(`<div class="calc" style="font-size:${o.fs || 28}px;white-space:pre">${l.t}</div>`, { x: 34, y: (o.ptitle ? 70 : 34) + i * (o.lh || 58), parent: p }, { at: K(S, l), dy: 0, dx: -10 }));
      if (o.side) sidePanel(S, o.side, 1190, y, 670, o.h || 470);
      note(S, o, y + (o.h || 470) + 24);
    }
  });

  L.statement = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      S.el(`<div class="kicker">${o.kicker}</div>`, { x: 60, y: 150 }, { at: S.at(0, -.3) });
      S.el(`<div class="statement" style="font-size:${o.fs || 64}px">${o.text}</div>`, { x: 60, y: 200, w: 1700 }, { at: S.at(0) });
      (o.subs || []).forEach((s, i) => S.el(`<div class="body" style="font-size:30px;color:#9aa8be">${s.t}</div>`, { x: 60, y: 430 + i * 60, w: 1750 }, { at: K(S, s) }));
    }
  });

  /* schematic helper: o.k/o.d = start, sub-items may use k/d too */
  L.drawSchem = (S, C, o) => {
    const T = it => it.k !== undefined ? S.at(it.k, it.d || 0) : undefined;
    return S.schematic(o.x, o.y, o.w, o.h, {
      at: S.at(o.k || 0, o.d || 0), dur: o.dur || 2.4, color: o.color || C.bull, title: o.title, pts: o.pts, sw: o.sw,
      zones: (o.zones || []).map(z => Object.assign({}, z, { at: T(z) ?? S.at(o.k || 0, (o.d || 0) + 1) })),
      lines: (o.lines || []).map(z => Object.assign({}, z, { at: T(z) ?? S.at(o.k || 0, (o.d || 0) + 1) })),
      labels: (o.labels || []).map(z => Object.assign({}, z, T(z) !== undefined ? { at: T(z) } : {}))
    });
  };
  /* one or two schematic panels with captions */
  L.schem = o => ({
    label: o.label, cues: o.cues, hold: o.hold || 0, build(S, C) {
      head(S, o);
      const P = o.panels, n = P.length, gap = 30, w = o.side ? 1100 : (1800 - gap * (n - 1)) / n;
      P.forEach((p, i) => {
        const pw = o.side ? w : w, x = 60 + i * (w + gap);
        L.drawSchem(S, C, Object.assign({ x, y: 170, w: pw, h: o.h || 470 }, p));
        if (p.cap) S.el(`<div class="body" style="font-size:24px;color:${p.capc || '#d6deea'}">${p.cap}</div>`, { x, y: 170 + (o.h || 470) + 18, w: pw }, { at: S.at(p.capk !== undefined ? p.capk : (p.k || 0), p.capd || 1.5) });
      });
      if (o.side) sidePanel(S, o.side, 1190, 170, 670, o.h || 470);
      note(S, o, 730);
    }
  });

  /* ------------------------------------------------------------ standard ends */
  L.title = o => ({
    label: 'INTRODUCTION', hold: .5, cues: o.cues, build(S, C) {
      S.el(`<div class="kicker">${o.kicker}</div>`, { x: 118, y: 120 }, { at: S.at(0, -.2) });
      S.el(`<div class="h1" style="font-size:${o.tfs || 76}px">${o.title}</div>`, { x: 114, y: 162, w: 1080 }, { at: S.at(0) });
      S.el(`<div class="lead">${o.sub}</div>`, { x: 118, y: o.subY || 350 }, { at: S.at(0, .3) });
      S.el('<div class="rule" style="width:322px"></div>', { x: 118, y: (o.subY || 350) + 62 }, { at: S.at(0, .5), dy: 0, dx: -20 });
      S.el('<div class="ptitle">LEARNING OBJECTIVES</div>', { x: 118, y: (o.subY || 350) + 104 }, { at: S.at(o.objK || 1) });
      S.bullets(o.obj.map(x => x.t), 118, (o.subY || 350) + 142, 1000, o.obj.map(x => K(S, x)), { check: true, size: 25 });
      if (o.schem) L.drawSchem(S, C, Object.assign({ x: 1220, y: 190, w: 620, h: 420 }, o.schem));
    }
  });

  /* knowledge check: qs = [{q, a, qs, as}] (≤3 per scene) */
  L.kc = o => {
    const cues = [o.intro || 'Semakan pengetahuan. Cuba jawab sebelum jawapan dipaparkan.'];
    o.qs.forEach(q => { cues.push(q.qs); cues.push(q.as); });
    return {
      label: o.label || 'KNOWLEDGE CHECK', hold: .4, cues, build(S, C) {
        S.heading('KNOWLEDGE CHECK', o.title || 'Answer before the reveal', S.at(0, -.3));
        const step = o.qs.length > 3 ? 132 : 175;
        o.qs.forEach((q, i) => {
          const y = 170 + i * step;
          S.el(`<div style="display:flex;gap:22px;align-items:baseline"><span style="font:700 24px JBM;color:#e8b44c">Q${(o.start || 1) + i}</span><span class="h3" style="font-size:${o.qs.length > 3 ? 27 : 30}px">${q.q}</span></div>`, { x: 60, y, w: 1800 }, { at: S.at(1 + 2 * i) });
          S.el(`<div style="display:flex;gap:22px;align-items:baseline"><span style="font:700 24px JBM;color:#34d399">A${(o.start || 1) + i}</span><span class="body" style="font-size:${o.qs.length > 3 ? 24 : 26}px">${q.a}</span></div>`, { x: 60, y: y + (o.qs.length > 3 ? 46 : 54), w: 1800 }, { at: S.at(2 + 2 * i) });
        });
      }
    };
  };
  L.summary = o => ({
    label: 'SUMMARY', cues: ['Ringkasnya.'].concat(o.points.map(p => p.s)), build(S, C) {
      S.heading('KEY LEARNING POINTS', o.title, S.at(0, -.3));
      S.bullets(o.points.map(p => p.t), 60, 180, 1780, o.points.map((p, i) => S.at(i + 1)), { check: true, size: o.size || 30 });
    }
  });
  L.exercise = o => ({
    label: 'EXERCISE', cues: ['Latihan untuk video ini.'].concat(o.steps.map(s => s.s)), build(S, C) {
      S.heading('PRACTICAL ASSIGNMENT', o.title, S.at(0, -.3));
      const n = o.steps.length, gap = 30, w = (1800 - gap * (n - 1)) / n;
      o.steps.forEach((s, i) => S.el(`<div class="num">STEP ${i + 1}</div><div class="ct">${s.t}</div><div class="cb">${s.b}</div>`, { x: 60 + i * (w + gap), y: 180, w, h: o.h || 360, cls: 'card' }, { at: S.at(i + 1) }));
      if (o.note) S.el(`<div class="small">${o.note}</div>`, { x: 60, y: 180 + (o.h || 360) + 30, w: 1800 }, { at: S.at(n) });
    }
  });
  L.upnext = o => ({
    label: 'UP NEXT', hold: .8, cues: [o.say], build(S, C) {
      S.el(`<div class="kicker">UP NEXT · ${o.video}</div>`, { x: 60, y: 40 }, { at: S.at(0, -.3) });
      S.el(`<div class="h2">${o.title}</div>`, { x: 60, y: 76, w: 1800 }, { at: S.at(0, -.2) });
      S.bullets(o.items, 60, 190, 1700, o.items.map((x, i) => S.at(0, 1 + i * .9)), { size: 30 });
    }
  });
  L.refs = o => ({
    label: 'REFERENCES', hold: 2, cues: [o.say || 'Rujukan untuk video ini dipaparkan di skrin.'], build(S, C) {
      S.el('<div class="kicker">REFERENCES · RUJUKAN</div>', { x: 60, y: 40 }, { at: S.at(0, -.3) });
      S.el('<div class="h3">Primary reading for this video</div>', { x: 60, y: 74 }, { at: S.at(0, -.2) });
      o.items.forEach((r, i) => S.el(`<div style="display:flex;justify-content:space-between;align-items:center;width:100%"><span style="display:flex;gap:22px"><span class="mono" style="color:#e8b44c;font-size:20px">0${i + 1}</span><span style="font:600 23px Inter">${r[0]}</span></span><span class="small" style="font-size:18px;flex:none;margin-left:20px">${r[1]}</span></div>`, { x: 60, y: 160 + i * 82, w: 1800, h: 66, cls: 'panel', style: 'display:flex;align-items:center;padding:0 26px' }, { at: S.at(0, .4 + i * .35) }));
    }
  });
  L.disclaimer = o => ({
    label: 'DISCLAIMER', hold: 2.2, cues: [o.say || 'Trading futures melibatkan risiko kerugian.'], build(S, C) {
      S.el(`<div style="text-align:center"><div style="font-size:42px;color:#e8b44c">⚠</div><div class="kicker" style="margin-top:10px">PENAFIAN · DISCLAIMER</div>
        <div class="body" style="margin-top:22px;font-size:27px;color:#e3e9f2">Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian, termasuk melebihi jangkaan akibat gap dan slippage.</div>
        <div class="small" style="margin-top:22px;font-size:20px">Semua harga FCPO dalam video ini adalah ilustrasi hipotetikal. Semak spesifikasi kontrak terkini dengan Bursa Malaysia Derivatives.</div></div>`,
        { x: 460, y: 170, w: 1000, h: 420, cls: 'panel', style: 'border-color:#e8b44c66;display:flex;align-items:center;padding:40px 60px' }, { at: S.at(0, -.3) });
      if (o.next) S.el(`<div class="small" style="text-align:center;width:1920px">${o.next}</div>`, { x: 0, y: 640 }, { at: S.at(0, 1) });
    }
  });
  /* standard reference sets */
  L.REF = {
    bursa: ['Bursa Malaysia Derivatives — Crude Palm Oil Futures (FCPO) contract specifications', 'Contract size · tick · hours'],
    harris: ['Larry Harris — Trading and Exchanges: Market Microstructure for Practitioners (OUP, 2003)', 'Orders · execution · costs'],
    murphy: ['John J. Murphy — Technical Analysis of the Financial Markets (NYIF, 1999)', 'Trend · structure · timeframes'],
    pring: ['Martin J. Pring — Technical Analysis Explained (5th ed., McGraw-Hill, 2014)', 'Trend · market structure'],
    kd: ['Kirkpatrick & Dahlquist — Technical Analysis: The Complete Resource (3rd ed., FT Press, 2015)', 'Testing · risk · evaluation'],
    cme: ['CME Group Education — futures contract specifications, margin & order types', 'Margin vs risk · orders'],
    ict: ['ICT (Inner Circle Trader) original educational materials · CMI SMC Levels 1–8', 'SMC terminology (CMI definitions)'],
    wyckoff: ['Richard D. Wyckoff — original course materials (1931)', 'Ranges · accumulation context'],
    mpob: ['Malaysian Palm Oil Board (MPOB) — monthly data releases', 'Scheduled event context']
  };

  /* ===================================================== FCPO trade example */
  // EP01-validated template (entry 4500, SL 4490 => R = 10 template points; bullish)
  const BASE = [
    [4512, 4517, 4510, 4516], [4516, 4520, 4513, 4514], [4514, 4515, 4507, 4508], [4508, 4513, 4506, 4512],
    [4512, 4520, 4511, 4515], [4515, 4516, 4508, 4509], [4509, 4510, 4502, 4503], [4503, 4506, 4499, 4505],
    [4505, 4507, 4498, 4499], [4499, 4501, 4494, 4496], [4496, 4503, 4495, 4502], [4502, 4505, 4500, 4503],
    [4503, 4504, 4497, 4498], [4498, 4500, 4494, 4497], [4497, 4499, 4495, 4498], [4498, 4503, 4497, 4501],
    [4501, 4503, 4498, 4499], [4499, 4500, 4495, 4496], [4496, 4497, 4491, 4495], [4495, 4498, 4494, 4497],
    [4497, 4509, 4496, 4508], [4508, 4513, 4502, 4511]];
  const RETRACE = [[4511, 4512, 4505, 4506], [4506, 4508, 4503, 4504], [4504, 4505, 4499, 4502]]; // fill on idx 24
  const TAILS = {
    tp: RETRACE.concat([[4502, 4507, 4501, 4506], [4506, 4511, 4505, 4510], [4510, 4514, 4508, 4509], [4509, 4516, 4508, 4515], [4515, 4521, 4514, 4518], [4518, 4519, 4513, 4514]]),
    tp2: RETRACE.concat([[4502, 4507, 4501, 4506], [4506, 4511, 4505, 4510], [4510, 4514, 4508, 4509], [4509, 4516, 4508, 4515], [4515, 4521, 4514, 4518], [4518, 4524, 4516, 4523], [4523, 4530, 4521, 4528], [4528, 4536, 4526, 4534]]),
    sl: RETRACE.concat([[4502, 4504, 4496, 4497], [4497, 4499, 4492, 4493], [4493, 4494, 4487, 4489], [4489, 4491, 4485, 4486], [4486, 4489, 4484, 4488]]),
    nofill: [[4511, 4515, 4509, 4514], [4514, 4518, 4512, 4517], [4517, 4522, 4515, 4520], [4520, 4521, 4514, 4516], [4516, 4519, 4513, 4518]]
  };
  L.template = (o) => {
    const dir = o.dir || 1, E = o.E, R = o.R, tail = o.tail || 'tp', tpU = o.tpU || 4520, tp1U = o.tp1U;
    const U = BASE.concat(TAILS[tail]);
    const m = p => Math.round(E + dir * (p - 4500) * R / 10);
    const cand = U.map(([op, h, l, c]) => dir > 0 ? [m(op), m(h), m(l), m(c)] : [m(op), m(l), m(h), m(c)]);
    const first = (from, f) => { for (let i = from; i < U.length; i++) if (f(U[i])) return i; return -1; };
    const fillI = first(22, c => c[2] <= 4500), slI = fillI < 0 ? -1 : first(fillI, c => c[2] <= 4490);
    const tpI = first(fillI < 0 ? 22 : fillI, c => c[1] >= tpU), tp1I = tp1U ? first(fillI, c => c[1] >= tp1U) : -1;
    // template self-checks (narration relies on these)
    const chk = (c, msg) => { if (!c) throw new Error('template check failed: ' + msg + ' ' + JSON.stringify(o)); };
    chk(U.every(([op, h, l, c]) => h >= Math.max(op, c) && l <= Math.min(op, c)), 'ohlc');
    chk(U.every((c, i) => !i || c[0] === U[i - 1][3]), 'continuity');
    if (tail === 'tp' || tail === 'tp2') chk(tpI > 0 && (slI < 0 || slI > tpI), 'tp reached before sl');
    if (tail === 'sl') chk(slI > 0 && (tpI < 0 || tpI > slI), 'sl reached first');
    if (tail === 'nofill') chk(fillI < 0, 'no fill');
    chk(Math.max(...U.slice(5, tpI > 0 ? tpI : U.length).map(c => c[1])) < tpU || tpI < 0, 'no early target');
    const lo = Math.min(...U.map(c => c[2]), 4486) - 3, hi = Math.max(...U.map(c => c[1]), tpU) + 5;
    const a = m(lo), b = m(hi);
    const lv = {
      dir, E, R, m, cand, fillI, slI, tpI, tp1I, tail,
      yMin: Math.min(a, b), yMax: Math.max(a, b),
      entry: m(4500), sl: m(4490), tp: m(tpU), tp1: tp1U ? m(tp1U) : null,
      tgtLiq: m(4520), swLiq: m(4494), sweep: m(4491), lh: m(4503), c20: m(4508),
      fvg: [m(4498), m(4502)].sort((x, y) => x - y), poi: [m(4488), m(4496)].sort((x, y) => x - y)
    };
    lv.kind = tail === 'tp2' && !tp1U ? 'tp' : tail;
    lv.reward = Math.abs(lv.tp - lv.entry); lv.risk = Math.abs(lv.entry - lv.sl);
    return lv;
  };
  const niceStep = r => { const raw = r / 5, p = Math.pow(10, Math.floor(Math.log10(raw))); for (const k of [1, 2, 2.5, 5, 10]) if (k * p >= raw) return k * p; return 10 * p; };
  const rrTxt = x => (Math.round(x * 100) / 100).toString();

  /* returns 4 scenes: context, confirmation, plan, outcome */
  L.example = o => {
    const v = L.template(o), bull = v.dir > 0, n = o.n || 1, RM = x => 'RM' + fmt(x);
    const tf = o.entryTF || '5M', stf = o.setupTF || '15M', P = o.label || 'EXAMPLE';
    const W = {
      tgtName: bull ? 'Equal Highs' : 'Equal Lows', tgtLiq: bull ? 'Buy-Side Liquidity' : 'Sell-Side Liquidity', tgtAb: bull ? 'EQH · BSL' : 'EQL · SSL',
      swName: bull ? 'Equal Lows' : 'Equal Highs', swLiq: bull ? 'Sell-Side Liquidity' : 'Buy-Side Liquidity', swAb: bull ? 'EQL · SSL' : 'EQH · BSL',
      lhName: bull ? 'lower high' : 'higher low', lhAb: bull ? 'LH' : 'HL', side: bull ? 'bullish' : 'bearish', opp: bull ? 'bearish' : 'bullish',
      above: bull ? 'di atas' : 'di bawah', below: bull ? 'di bawah' : 'di atas', go: bull ? 'turun ke' : 'naik ke', act: bull ? 'beli' : 'jual'
    };
    const tpName = o.tpName || `${W.tgtName}, iaitu potensi ${W.tgtLiq} di arah bertentangan`;
    const step = o.step || niceStep(v.yMax - v.yMin);
    const ctx = o.context || [];
    const cues1 = [o.intro, `Carta ${stf} menunjukkan POI ${W.side} di sekitar ${fmt(v.poi[0])} hingga ${fmt(v.poi[1])}.`,
      `${bull ? 'Di atas' : 'Di bawah'}, dua ${bull ? 'high' : 'low'} pada ${fmt(v.tgtLiq)} membentuk ${W.tgtName}, iaitu potensi ${W.tgtLiq}.`,
      `${bull ? 'Di bawah' : 'Di atas'}, dua ${bull ? 'low' : 'high'} pada ${fmt(v.swLiq)} membentuk ${W.swName}, potensi ${W.swLiq}, yang terletak di dalam POI.`,
      `Struktur dalaman pada carta ${tf} masih ${W.opp}. ${W.lhName[0].toUpperCase() + W.lhName.slice(1)} terakhir berada pada ${fmt(v.lh)}.`,
      `Belum ada entry. Harga hanya menghampiri lokasi. POI ialah lokasi, bukan pencetus.`];
    const cues2 = [`Candle seterusnya ${W.go} ${fmt(v.sweep)}, melepasi ${W.swName}, kemudian ditutup semula ${W.above} ${fmt(v.swLiq)}.`,
      'Ini kemungkinan liquidity sweep. Tetapi sweep sahaja belum mencukupi untuk entry.',
      `Kemudian candle ${W.side} yang besar ditutup pada ${fmt(v.c20)}, menembusi ${W.lhName} ${fmt(v.lh)}. Ini potensi ${W.side} MSS, disertai displacement.`,
      `Displacement ini meninggalkan Fair Value Gap antara ${fmt(v.fvg[0])} dan ${fmt(v.fvg[1])}.`,
      'Urutan pengesahan CMI kini lengkap: liquidity, MSS, displacement dan FVG.'];
    const rr = v.reward / v.risk;
    const cues3 = ['Sebelum harga bergerak, kita tulis pelan dagangan.',
      `Entry ${W.act} bersyarat pada ${fmt(v.entry)}, di dalam FVG, hanya jika harga kembali ke zon ini.`,
      `Stop-loss pada ${fmt(v.sl)}, ${W.below} ekstrem sweep. Jika harga sampai ke paras ini, hipotesis ${W.side} dianggap tidak sah.`,
      v.tp1 ? `TP1 pada ${fmt(v.tp1)}, iaitu 1R, untuk partial. Sasaran akhir pada ${fmt(v.tp)}, ${tpName}.` : `Sasaran pada ${fmt(v.tp)}, ${tpName}.`,
      `Risiko ${v.risk} mata, potensi ganjaran ${v.reward} mata. Gross risk-to-reward ialah ${rrTxt(rr)} berbanding 1.`,
      `Dengan ${n} kontrak, risiko kasar ${RM(v.risk * 25 * n)} dan potensi ganjaran kasar ${RM(v.reward * 25 * n)}, sebelum kos dan slippage.`,
      'Bahagian kanan carta masih tersembunyi. Keputusan dibuat hanya dengan maklumat yang tersedia.'];
    if (o.planExtra) cues3.splice(6, 0, ...o.planExtra);
    let cues4;
    if (v.kind === 'tp') cues4 = ['Sekarang kita dedahkan apa yang berlaku.', `Harga kembali ke FVG. Order ${fmt(v.entry)} terisi.`, `Harga kemudian bergerak ke ${fmt(v.tp)}. Sasaran tercapai: tambah ${v.reward} mata setiap kontrak.`, 'Ini hanya satu hasil. Setup yang sama boleh sahaja berakhir di stop-loss.'];
    if (v.kind === 'sl') cues4 = ['Sekarang kita dedahkan apa yang berlaku.', `Harga kembali ke FVG. Order ${fmt(v.entry)} terisi.`, `Namun harga terus ${bull ? 'jatuh' : 'naik'} dan mencapai stop-loss ${fmt(v.sl)}. Kerugian ${v.risk} mata setiap kontrak, iaitu satu R, ${RM(v.risk * 25 * n)} kasar.`, 'Pelan diikuti dan kerugian dikawal. Ia direkod dalam jurnal, bukan dibalas dengan dagangan dendam.'];
    if (v.kind === 'tp2') { const g = (Math.abs(v.tp1 - v.entry) * (n / 2) + v.reward * (n / 2)) * 25, rk = v.risk * 25 * n; cues4 = ['Sekarang kita dedahkan apa yang berlaku.', `Harga kembali ke FVG. Order ${fmt(v.entry)} terisi.`, `TP1 ${fmt(v.tp1)} tercapai. Separuh posisi ditutup, dan stop-loss baki posisi dialihkan ke harga entry.`, `Harga meneruskan pergerakan ke ${fmt(v.tp)}. Baki posisi ditutup di sasaran akhir.`, `Hasil kasar ${RM(g)} berbanding risiko awal ${RM(rk)}, iaitu ${rrTxt(g / rk)}R. Partial mengurangkan hasil berbanding memegang semua posisi, tetapi mengunci sebahagian keuntungan lebih awal.`]; }
    if (v.kind === 'nofill') cues4 = ['Sekarang kita dedahkan apa yang berlaku.', `Harga tidak kembali ke FVG. Order ${fmt(v.entry)} tidak terisi.`, `Harga bergerak ke ${fmt(v.tp)} tanpa kita. Ini bukan kesilapan: syarat entry tidak dipenuhi, jadi tiada dagangan.`, 'Mengejar harga selepas terlepas setup akan memburukkan lokasi entry dan risk-to-reward.'];
    if (o.outcomeExtra) cues4 = cues4.concat(o.outcomeExtra);

    function chart(S, C, stage, ttl) {
      const pre = S.start - 2, A = (k, d = 0) => S.at(k, d), T = (st, k, d = 0) => stage > st ? pre : A(k, d);
      const ch = S.chart({ name: P, x: 36, y: 21, w: 1310, h: 760, candles: v.cand, yMin: v.yMin, yMax: v.yMax, step, slots: v.cand.length + 9, title: `FCPO · ${tf} · HYPOTHETICAL ILLUSTRATION`, titleR: ttl, at: stage === 1 ? A(0, -.3) : pre });
      ch.reveal(17, stage > 1 ? pre - 3 : A(0, .4), stage > 1 ? 0 : .1);
      ch.zone({ p1: v.poi[0], p2: v.poi[1], from: 0, to: 'end', c: C.poi, label: `${stf} ${W.side.toUpperCase()} POI · ${fmt(v.poi[0])}–${fmt(v.poi[1])}`, lpos: bull ? 'below' : undefined, at: T(1, 1, .3) });
      ch.hline({ p: v.tgtLiq, from: 1, c: C.liq, label: `${W.tgtAb} ${fmt(v.tgtLiq)}`, at: T(1, 2, .4), until: stage > 3 ? pre - 1 : stage === 3 ? A(3, 0) : undefined });
      ch.marker({ i: 1, p: v.tgtLiq, c: C.liq, at: T(1, 2, .2) }); ch.marker({ i: 4, p: v.tgtLiq, c: C.liq, at: T(1, 2, .5) });
      ch.hline({ p: v.swLiq, from: 9, c: C.liq, label: `${W.swAb} ${fmt(v.swLiq)}`, at: T(1, 3, .4) });
      ch.marker({ i: 9, p: v.swLiq, c: C.liq, at: T(1, 3, .2) }); ch.marker({ i: 13, p: v.swLiq, c: C.liq, at: T(1, 3, .5) });
      ch.marker({ i: 16, p: v.lh, c: C.amber, t: W.lhAb, pos: bull ? 'above' : 'below', at: T(1, 4, .3) });
      ch.hline({ p: v.lh, from: 16, to: 24, c: C.amber, at: T(1, 4, .5), w: 1.4 });
      if (stage === 1) { ch.question({ i: 18, at: A(5, .4), t: 'NEXT CANDLES · NOT VISIBLE YET' }); return ch; }
      ch.reveal(18, stage > 2 ? pre - 3 : A(0, .2), stage > 2 ? 0 : .3);
      ch.candleHL({ i1: 18, i2: 18, p1: Math.min(v.m(4489), v.m(4497)), p2: Math.max(v.m(4489), v.m(4497)), c: C.liq, t: bull ? 'SSL SWEEP' : 'BSL SWEEP', below: bull, at: T(2, 1, .1) });
      ch.reveal(20, stage > 2 ? pre - 3 : A(2, .1), stage > 2 ? 0 : .5);
      ch.label({ i: 15, p: v.lh, t: `MSS ${bull ? '↑' : '↓'} ${fmt(v.lh)}`, c: C.amber, anchor: 'end', dx: -10, dy: bull ? -26 : 26, at: T(2, 2, 2.6) });
      ch.candleHL({ i1: 20, i2: 20, p1: Math.min(v.m(4495), v.m(4515)), p2: Math.max(v.m(4495), v.m(4515)), c: bull ? C.bull : C.bear, t: 'DISPLACEMENT', below: !bull, at: T(2, 2, 3.4) });
      ch.reveal(21, stage > 2 ? pre - 3 : A(3, .1), stage > 2 ? 0 : .3);
      ch.zone({ p1: v.fvg[0], p2: v.fvg[1], from: 19, to: 'end', c: C.blue, label: `${W.side.toUpperCase()} FVG ${fmt(v.fvg[0])}–${fmt(v.fvg[1])}`, lx: 'right', lpos: bull ? undefined : 'below', at: T(2, 3, 1.4) });
      if (stage === 2) { ch.question({ i: 22, at: A(4, .3), t: 'NEXT CANDLES · NOT VISIBLE YET' }); return ch; }
      ch.hline({ p: v.entry, from: 21, c: C.text, label: `ENTRY ${fmt(v.entry)} (limit, in FVG)`, at: T(3, 1, .3), solid: true, ly: bull ? 0 : 0 });
      ch.hline({ p: v.sl, from: 18, c: C.bear, label: `SL ${fmt(v.sl)} · beyond sweep`, at: T(3, 2, .3), solid: true });
      ch.hline({ p: v.tp, from: 21, c: C.bull, label: `TP ${fmt(v.tp)}`, at: T(3, 3, .3), solid: true, ly: bull ? -22 : 22 });
      if (v.tp1) ch.hline({ p: v.tp1, from: 21, c: C.bull, label: `TP1 ${fmt(v.tp1)} · 1R`, at: T(3, 3, .3), w: 1.4 });
      ch.trade({ i: 22, entry: v.entry, sl: v.sl, tp: v.tp, tags: false, at: T(3, 4, .2), dur: .8 });
      if (stage === 3) { ch.question({ i: 22, at: A(0, .3), t: 'OUTCOME NOT VISIBLE · DECIDE NOW' }); return ch; }
      const last = v.cand.length - 1;
      if (v.fillI > 0) {
        ch.reveal(v.fillI, A(1, .1), .45); ch.marker({ i: v.fillI, p: v.entry, c: C.text, t: 'FILLED', pos: bull ? 'below' : 'above', at: A(1, 1.6) });
        ch.reveal(last, A(2, .1), .4);
        const r0 = A(2, .1) + .4;
        if (v.kind === 'sl') ch.marker({ i: v.slI, p: v.sl, c: C.bear, t: 'SL', pos: bull ? 'below' : 'above', at: r0 + (v.slI - v.fillI) * .4 });
        if (v.tp1I > 0) ch.marker({ i: v.tp1I, p: v.tp1, c: C.bull, t: 'TP1', pos: bull ? 'above' : 'below', at: r0 + (v.tp1I - v.fillI - 1) * .4 + .3 });
        if (v.tail !== 'sl') ch.marker({ i: v.tpI, p: v.tp, c: C.bull, t: 'TP', pos: bull ? 'above' : 'below', at: r0 + (v.tpI - v.fillI - 1) * .4 + .3 });
        if (v.kind === 'tp') { ch.arrow({ i1: v.fillI, p1: v.entry, i2: v.fillI + 6, p2: v.m(4487), c: C.bear, dash: true, at: A(3, .4), dur: 1 }); ch.label({ i: v.fillI + 9, p: v.m(4484), t: `ALTERNATIVE · SL −${v.risk} pts`, c: C.bear, at: A(3, 1.2) }); }
      } else { ch.reveal(last, A(1, .1), .45); ch.label({ i: 25, p: v.entry, t: 'NOT FILLED · NO TRADE', c: C.amber, at: A(1, 2.6), dy: bull ? 30 : -30 }); }
      return ch;
    }
    const sideP = (S, C, kicker, title, items) => { const p = S.el('', { x: 1368, y: 21, w: 516, h: 760, cls: 'panel' }, { at: S.at(0, -.2), dy: 10 }); S.el(`<div class="kicker" style="font-size:17px">${kicker}</div>`, { x: 30, y: 30, parent: p }); S.el(`<div class="h3" style="font-size:29px;line-height:1.2">${title}</div>`, { x: 30, y: 62, w: 456, parent: p }); S.el('<div class="rule" style="width:90px"></div>', { x: 30, y: 148, parent: p }); if (items) S.bullets(items.map(i => ({ t: i.t, c: i.c })), 30, 180, 460, items.map(i => S.at(i.k, i.d || 0)), { size: 24, parent: p }); return p; };
    const kk = o.kicker || P;
    const sc1 = { label: `${P} · CONTEXT & LIQUIDITY`, hold: .4, cues: cues1, build(S, C) { chart(S, C, 1, 'STEP 1 · CONTEXT & LIQUIDITY MAP'); sideP(S, C, kk, o.sideTitle || 'Building the setup, step by step', (ctx.length ? ctx.map(t => ({ t, c: C.green, k: 0, d: 1 })) : []).concat([{ t: `${stf} POI · ${fmt(v.poi[0])}–${fmt(v.poi[1])}`, c: C.poi, k: 1 }, { t: `${W.tgtAb} ${fmt(v.tgtLiq)} · target side`, c: C.liq, k: 2 }, { t: `${W.swAb} ${fmt(v.swLiq)} · inside POI`, c: C.liq, k: 3 }, { t: `Internal ${W.lhAb} · ${fmt(v.lh)}`, c: C.amber, k: 4 }, { t: 'No entry yet · location ≠ trigger', c: C.bear, k: 5 }])); } };
    const sc2 = { label: `${P} · CONFIRMATION`, hold: .6, cues: cues2, build(S, C) { chart(S, C, 2, 'STEP 2 · ENTRY CONFIRMATION'); sideP(S, C, 'ENTRY CONFIRMATION', 'Liquidity → MSS → Displacement → FVG', [{ t: `Sweep ${fmt(v.sweep)} · close back ${bull ? 'above' : 'below'} ${fmt(v.swLiq)}`, c: C.liq, k: 0, d: .5 }, { t: 'Sweep alone ≠ entry', c: C.bear, k: 1 }, { t: `Close ${fmt(v.c20)} ${bull ? '>' : '<'} ${W.lhAb} ${fmt(v.lh)} · ${W.side} MSS`, c: C.amber, k: 2, d: 2.6 }, { t: 'Strong-bodied candle · displacement', c: bull ? C.bull : C.bear, k: 2, d: 3.6 }, { t: `FVG ${fmt(v.fvg[0])}–${fmt(v.fvg[1])} · execution zone`, c: C.blue, k: 3 }, { t: 'Sequence complete under CMI model', c: C.green, k: 4 }]); } };
    const sc3 = {
      label: `${P} · TRADE PLAN`, hold: .6, cues: cues3, build(S, C) {
        chart(S, C, 3, 'STEP 3 · TRADE PLAN BEFORE ENTRY');
        const p = sideP(S, C, `TRADE PLAN · ${n} CONTRACT${n > 1 ? 'S' : ''}`, 'Written before the outcome');
        const L3 = [[`Entry  <span class="em">${fmt(v.entry)}</span>`, 1], [`SL     <span style="color:#ef5350">${fmt(v.sl)}</span>`, 2], [`TP     <span style="color:#26a69a">${fmt(v.tp)}</span>${v.tp1 ? ` (TP1 ${fmt(v.tp1)})` : ''}`, 3],
        [`Risk   ${v.risk} pts`, 4, 0], [`Reward ${v.reward} pts`, 4, 1.4], [`RR     ${v.reward} ÷ ${v.risk} = <span class="em">${rrTxt(rr)} : 1</span>`, 4, 2.8],
        [`Risk   ${v.risk}×25×${n} = <span style="color:#ef5350">${RM(v.risk * 25 * n)}</span>`, 5, 0], [`Reward ${v.reward}×25×${n} = <span style="color:#26a69a">${RM(v.reward * 25 * n)}</span>`, 5, 2.5]];
        L3.forEach((l, i) => S.el(`<div class="calc" style="font-size:22px;white-space:pre">${l[0]}</div>`, { x: 30, y: 180 + i * 50, parent: p }, { at: S.at(l[1], l[2] || 0), dy: 0, dx: -10 }));
        S.el('<div class="small mono" style="font-size:15px;letter-spacing:.6px;color:#f59e0b">GROSS · 1 pt = RM25 / contract · BEFORE COSTS<br>VERIFY CONTRACT SPECS WITH BURSA</div>', { x: 30, y: 650, parent: p }, { at: S.at(5, 3) });
      }
    };
    const sc4 = {
      label: `${P} · OUTCOME`, hold: .6, cues: cues4, build(S, C) {
        chart(S, C, 4, 'STEP 4 · OUTCOME (ONE OF MANY)');
        const p = sideP(S, C, `RESULT · ${n} CONTRACT${n > 1 ? 'S' : ''}`, v.kind === 'sl' ? 'A planned, controlled loss' : v.kind === 'nofill' ? 'No fill · no trade' : 'One outcome, not a promise');
        let html;
        if (v.kind === 'tp') html = `Filled  ${fmt(v.entry)}<br>Exit    ${fmt(v.tp)}<br>Result  <span style="color:#26a69a">+${v.reward} pts · +${RM(v.reward * 25 * n)}</span>`;
        if (v.kind === 'sl') html = `Filled  ${fmt(v.entry)}<br>Exit    ${fmt(v.sl)} (SL)<br>Result  <span style="color:#ef5350">−${v.risk} pts · −${RM(v.risk * 25 * n)}</span><br>        = −1R`;
        if (v.kind === 'tp2') { const g = (Math.abs(v.tp1 - v.entry) * (n / 2) + v.reward * (n / 2)) * 25; html = `${n / 2}c @ TP1 ${fmt(v.tp1)} · +${Math.abs(v.tp1 - v.entry)}<br>${n / 2}c @ TP  ${fmt(v.tp)} · +${v.reward}<br>Total   <span style="color:#26a69a">+${RM(g)}</span><br>Risk    ${RM(v.risk * 25 * n)}<br>Result  <span class="em">${rrTxt(g / (v.risk * 25 * n))}R</span>`; }
        if (v.kind === 'nofill') html = `Order   ${fmt(v.entry)} · not filled<br>Result  <span class="em">0 · no trade</span><br>Rule    do not chase`;
        S.el(`<div class="calc" style="font-size:22px">${html}</div>`, { x: 30, y: 180, parent: p }, { at: S.at(2, 2) });
        S.el(`<div class="body" style="font-size:22px">${v.kind === 'sl' ? 'Loss within plan → record it, review the process, keep size unchanged.' : v.kind === 'nofill' ? 'Missing a trade is cheaper than chasing a poor entry.' : 'Judge the SOP over a <b style="color:#e8b44c">large sample</b> of trades — never on one result.'}</div>`, { x: 30, y: 520, w: 456, parent: p }, { at: S.at(3) });
      }
    };
    return [sc1, sc2, sc3, sc4];
  };

  if (typeof module !== 'undefined') module.exports = L; else window.L = L;
})();
