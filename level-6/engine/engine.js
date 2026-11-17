/* CMI Level 6 motion-graphics engine.
 * Deterministic: window.frame(T) draws the full frame for time T (seconds).
 * Visual style follows the reference episode (navy / gold, Inter + JetBrains Mono). */
(function () {
  const C = {
    bg: '#030a16', panel: '#0d1630', border: '#1b2442', grid: '#16203b',
    text: '#ffffff', sub: '#c7cede', mute: '#8a93a8', dim: '#5f6a85',
    gold: '#d7b256', bull: '#25a198', bear: '#e54f4d',
    cyan: '#2cc6dc', purple: '#9b7bf0', amber: '#f0a03a', blue: '#3b82f6'
  };
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const P = (t, t0, d = 0.6) => ease((t - t0) / d);
  const fmt = n => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* Candle generator. way = [[index, price], ...]. Interior waypoints that are
   * local maxima/minima become exact, unique swing highs/lows. */
  function gen(way, seed, opt = {}) {
    const r = rng(seed), N = way[way.length - 1][0] + 1;
    const wIdx = {}; way.forEach((w, k) => wIdx[w[0]] = k);
    const kind = k => {
      if (k === 0 || k === way.length - 1) return 'end';
      const p = way[k][1];
      if (p > way[k - 1][1] && p > way[k + 1][1]) return 'peak';
      if (p < way[k - 1][1] && p < way[k + 1][1]) return 'trough';
      return 'mid';
    };
    const rangeOf = i => {
      let lo = Infinity, hi = -Infinity;
      for (let k = 0; k < way.length - 1; k++) if (i >= way[k][0] && i <= way[k + 1][0]) {
        lo = Math.min(lo, way[k][1], way[k + 1][1]); hi = Math.max(hi, way[k][1], way[k + 1][1]);
      }
      return [lo, hi];
    };
    const segStep = i => {
      for (let k = 0; k < way.length - 1; k++) if (i <= way[k + 1][0]) return Math.abs(way[k + 1][1] - way[k][1]) / Math.max(1, way[k + 1][0] - way[k][0]);
      return 1;
    };
    const closes = [];
    for (let i = 0; i < N; i++) {
      let k = 0; while (k < way.length - 2 && i > way[k + 1][0]) k++;
      const [ia, pa] = way[k], [ib, pb] = way[k + 1];
      const base = pa + (pb - pa) * (i - ia) / (ib - ia);
      const st = segStep(i);
      const amp = (opt.noise ?? 0.75) * st + (opt.floor ?? 1.5);
      let c = base + (r() - .5) * 2 * amp;
      const [lo, hi] = rangeOf(i), eps = 0.12 * st + (opt.eps ?? 1);
      if (wIdx[i] !== undefined) {
        const kd = kind(wIdx[i]), p = way[wIdx[i]][1];
        if (kd === 'peak') c = p - (0.15 + r() * .35) * st - 1;
        else if (kd === 'trough') c = p + (0.15 + r() * .35) * st + 1;
        else c = p;
      } else c = clamp(c, lo + eps, hi - eps);
      closes.push(c);
    }
    const data = [];
    for (let i = 0; i < N; i++) {
      const o = i === 0 ? way[0][1] - (way[1][1] - way[0][1]) * 0.03 : closes[i - 1];
      const c = closes[i], st = segStep(i), [lo, hi] = rangeOf(i), eps = 0.12 * st + (opt.eps ?? 1);
      const wk = (opt.wick ?? 0.45) * st + (opt.wfloor ?? 2);
      let h = Math.max(o, c) + r() * wk, l = Math.min(o, c) - r() * wk;
      h = Math.max(Math.max(o, c), Math.min(h, hi - eps));
      l = Math.min(Math.min(o, c), Math.max(l, lo + eps));
      if (wIdx[i] !== undefined) {
        const kd = kind(wIdx[i]), p = way[wIdx[i]][1];
        if (kd === 'peak') h = p; if (kd === 'trough') l = p;
      }
      data.push({ o, c, h, l });
    }
    return data;
  }

  /* ---------- SVG primitives ---------- */
  function tag(x, y, txt, col, o = {}) {
    const fs = o.fs || 16, pad = o.pad ?? 11, tw = txt.length * fs * 0.6 + pad * 2, th = fs + 14;
    const ax = o.anchor || 'middle';
    const rx = ax === 'middle' ? x - tw / 2 : ax === 'end' ? x - tw : x;
    return `<g opacity="${o.op ?? 1}"><rect x="${rx}" y="${y - th / 2}" width="${tw}" height="${th}" rx="5" fill="${o.fill || '#0a1226'}" stroke="${col}" stroke-width="1.4"/>` +
      `<text x="${rx + tw / 2}" y="${y + fs * 0.36}" text-anchor="middle" font-family="JetBrains Mono" font-size="${fs}" font-weight="600" fill="${o.tc || col}">${esc(txt)}</text></g>`;
  }
  function txt(x, y, s, o = {}) {
    return `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'start'}" font-family="${o.mono === false ? 'Inter' : 'JetBrains Mono'}" font-size="${o.fs || 16}" font-weight="${o.fw || 500}" fill="${o.col || C.mute}" opacity="${o.op ?? 1}" letter-spacing="${o.ls ?? 1}">${esc(s)}</text>`;
  }
  function dot(x, y, col, op = 1, r = 6) { return `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" stroke="#0a1226" stroke-width="2" opacity="${op}"/>`; }

  /* ---------- chart ---------- */
  function chart(o) {
    const top = o.top ?? 72, bot = o.bot ?? 34, axisW = o.axisW ?? 112;
    const px = o.x + 28, pw = o.w - 28 - axisW, py = o.y + top, ph = o.h - top - bot;
    const slots = o.slots || o.data.length, cw = pw / slots;
    const xs = i => px + cw * (i + .5), ys = p => py + (o.pmax - p) / (o.pmax - o.pmin) * ph;
    const S = { xs, ys, cw, px, pw, py, ph, x1: px + pw };
    let g = '';
    for (let p = Math.ceil(o.pmin / o.step) * o.step; p <= o.pmax + 1e-6; p += o.step) {
      const yy = ys(p);
      g += `<line x1="${px}" x2="${px + pw}" y1="${yy}" y2="${yy}" stroke="${C.grid}" stroke-width="1"/>`;
      g += txt(px + pw + 26, yy + 6, fmt(p), { fs: 17, col: '#5d6882', ls: 0.5 });
    }
    g += `<line x1="${px + pw + 10}" x2="${px + pw + 10}" y1="${py - 12}" y2="${py + ph}" stroke="#1a2442" stroke-width="1.2"/>`;
    if (o.under) g += o.under(S);
    const n = o.n ?? o.data.length;
    const bw = Math.max(3, cw * 0.58);
    for (let i = 0; i < Math.min(Math.ceil(n), o.data.length); i++) {
      const d = o.data[i], a = clamp(n - i), col = d.c >= d.o ? C.bull : C.bear;
      const yo = ys(d.o), yc = ys(d.c), dim = o.dim && o.dim(i) ? 0.28 : 1;
      g += `<g opacity="${a * dim}"><line x1="${xs(i)}" x2="${xs(i)}" y1="${ys(d.h)}" y2="${ys(d.l)}" stroke="${col}" stroke-width="1.7"/>` +
        `<rect x="${xs(i) - bw / 2}" y="${Math.min(yo, yc)}" width="${bw}" height="${Math.max(1.8, Math.abs(yo - yc))}" fill="${col}" rx="1"/></g>`;
    }
    if (o.ov) g += o.ov(S);
    const op = o.op ?? 1;
    return `<div class="panel" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;opacity:${op}"></div>` +
      `<div class="ctitle" style="left:${o.x + 24}px;top:${o.y + 22}px;opacity:${op}">${o.title || ''}</div>` +
      `<div class="ctag" style="right:${1920 - o.x - o.w + 24}px;top:${o.y + 20}px;opacity:${op}">${o.tagTxt || ''}</div>` +
      `<svg class="a" style="left:0;top:0;opacity:${op}" width="1920" height="1080">${g}</svg>`;
  }
  // overlay helpers operating on chart scales
  const ovl = {
    hl(S, p, i0, i1, col, o = {}) {
      const x0 = i0 == null ? S.px : S.xs(i0), x1 = i1 == null ? S.x1 : S.xs(i1), pr = o.prog ?? 1, y = S.ys(p);
      return `<line x1="${x0}" x2="${x0 + (x1 - x0) * pr}" y1="${y}" y2="${y}" stroke="${col}" stroke-width="${o.w || 1.8}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} opacity="${o.op ?? 1}"/>`;
    },
    zone(S, p0, p1, i0, i1, col, o = {}) {
      const x0 = i0 == null ? S.px : S.xs(i0), x1 = i1 == null ? S.x1 : S.xs(i1);
      const yt = S.ys(Math.max(p0, p1)), yb = S.ys(Math.min(p0, p1)), pr = o.prog ?? 1;
      return `<rect x="${x0}" y="${yt}" width="${Math.max(0, (x1 - x0) * pr)}" height="${yb - yt}" fill="${col}" opacity="${(o.alpha ?? .14) * (o.op ?? 1)}"/>` +
        (o.stroke ? `<rect x="${x0}" y="${yt}" width="${Math.max(0, (x1 - x0) * pr)}" height="${yb - yt}" fill="none" stroke="${col}" stroke-width="1.3" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} opacity="${(o.op ?? 1) * .9}"/>` : '');
    },
    path(S, pts, col, pr = 1, w = 2.6, op = 1) {
      const d = pts.map((q, k) => (k ? 'L' : 'M') + S.xs(q[0]).toFixed(1) + ',' + S.ys(q[1]).toFixed(1)).join(' ');
      return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - clamp(pr)}" stroke-linejoin="round" opacity="${op}"/>`;
    }
  };

  /* ---------- html helpers ---------- */
  function side(o, t) {
    const items = (o.items || []).map(it => {
      const a = P(t, it.t0, .45);
      return `<li class="${it.c || ''}" style="opacity:${a};transform:translateX(${(1 - a) * 14}px)">${it.s}</li>`;
    }).join('');
    return `<div class="panel" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;padding:34px 28px 28px 28px">` +
      `<div class="kick">${o.kicker}</div><div class="stitle">${o.title}</div><div class="uline"></div><ul class="bul">${items}</ul>${o.foot || ''}</div>`;
  }
  const checkSvg = (col = C.gold) => `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const crossSvg = (col = C.bear) => `<svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/></svg>`;
  function chk(x, y, s, a, ok = true, fs = 24) {
    return `<div class="chk" style="left:${x}px;top:${y}px;opacity:${a};font-size:${fs}px;transform:translateX(${(1 - a) * 12}px)">${ok === null ? '' : ok ? checkSvg() : crossSvg()}<span>${s}</span></div>`;
  }

  /* ---------- timeline ---------- */
  const readDur = s => Math.max(2.6, s.length / 15 + 0.8);
  function build(V) {
    let T = 0, gk = 0; const DUR = window.DUR;
    V.scenes.forEach((s, si) => {
      s.T0 = T; let t = s.lead ?? 0.8; s.L = []; s.G = [];
      s.lines = s.lines.map(l => Array.isArray(l) ? { bm: l[0], en: l[1], ...(l[2] || {}) } : l);
      s.lines.forEach((ln, k) => {
        if (DUR) { ln.audio = DUR.files[gk]; ln.ad = DUR.dur[gk]; ln.d = Math.max(ln.ad + 0.35, 2.2); }
        else ln.d = ln.d ?? readDur(ln.bm);
        gk++; s.L[k] = t; ln.t0 = t; t += ln.d;
        if (ln.gap) { s.G[k] = t; t += ln.gap; }
        t += 0.3;
      });
      s.D = t + (s.tail ?? 1.0); s.idx = si + 1; T += s.D;
    });
    V.total = T;
  }
  function srt(V, lang) {
    const ts = x => { const ms = Math.round(x * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, r = ms % 1000; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(r).padStart(3, '0')}`; };
    let k = 0, out = '';
    V.scenes.forEach(s => s.lines.forEach(ln => { k++; out += `${k}\n${ts(s.T0 + ln.t0)} --> ${ts(s.T0 + ln.t0 + ln.d)}\n${ln[lang]}\n\n`; }));
    return out;
  }

  function frame(V, T) {
    T = Math.min(T, V.total - 1e-6);
    let s = V.scenes[0]; for (const x of V.scenes) if (T >= x.T0) s = x;
    const t = T - s.T0;
    let subtitle = '';
    s.lines.forEach((ln, k) => { if (t >= ln.t0 && t < ln.t0 + ln.d + 0.3) subtitle = ln.bm; });
    const fin = P(t, 0, .45), fout = 1 - P(t, s.D - .4, .4);
    const r3 = x => Math.round(x * 1000) / 1000;
    const label = typeof s.label === 'function' ? s.label() : s.label;
    const body = s.draw(t, s.L, s.G, s);
    document.getElementById('stage').innerHTML =
      `<div class="hdr"><div class="badge">L6</div><div class="lvl">LEVEL 6 · CMI</div><div class="crs">SMART MONEY CONCEPT</div>` +
      `<div class="vt">${V.title}</div><div class="sc">SCENE ${s.idx} · ${label}</div></div>` +
      `<div class="a" style="left:0;top:0;width:1920px;height:1080px;opacity:${Math.min(fin, fout)}">${body}</div>` +
      (subtitle ? `<div class="subw"><div class="sub">${subtitle}</div></div>` : '') +
      `<div class="progbg"></div><div class="prog" style="width:${Math.round(T / V.total * 1920)}px"></div>`;
    return document.getElementById('stage').innerHTML;
  }

  window.E = { C, clamp, ease, P, fmt, esc, gen, tag, txt, dot, chart, ovl, side, chk, checkSvg, crossSvg, build, srt, frame };
  window.registerVideo = V => {
    E.build(V); window.V = V; window.TOTAL = V.total;
    window.frame = T => E.frame(V, T);
    window.srt = lang => E.srt(V, lang);
    window.audioPlan = () => V.scenes.flatMap(s => s.lines.filter(l => l.audio).map(l => ({ t: s.T0 + l.t0 + 0.1, file: l.audio })));
  };
})();
