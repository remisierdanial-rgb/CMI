/* CMI deterministic motion-graphics engine.
 * Everything visible is a pure function of time t (seconds), so frames can be
 * captured one-by-one by Playwright and encoded with ffmpeg.
 */
(function () {
  const W = 1920, H = 1080;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = x => { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
  const easeIO = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const fmt = p => Math.round(p).toLocaleString('en-US');
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const C = {
    text: '#f1f5fb', sub: '#9aa8be', dim: '#5f6e86', faint: '#33415a', amber: '#e8b44c', bull: '#26a69a',
    bear: '#ef5350', liq: '#22d3ee', poi: '#8b7cf6', blue: '#5b8def', pink: '#f472b6', green: '#34d399',
    risk: '#f59e0b', white: '#ffffff', elec: '#2f80ff'
  };

  /* ---------- timeline ---------- */
  function cueText(c) { return typeof c === 'string' ? c : c.t; }
  function estimateTimeline(ep) {
    // fallback when no TTS timeline exists: ~13.5 chars / second
    let t = 0; const scenes = [];
    for (const sc of ep.scenes) {
      const s = { start: t, cues: [] }; t += 0.7;
      for (const c of sc.cues) { const d = Math.max(1.6, cueText(c).length / 13.5); s.cues.push({ start: t, end: t + d, text: cueText(c) }); t += d + 0.35; }
      t += (sc.hold || 0) + 0.9; s.end = t; scenes.push(s);
    }
    return { scenes, total: t };
  }

  /* ---------- scene context ---------- */
  class Scene {
    constructor(root, tl, idx) { this.root = root; this.tl = tl; this.idx = idx; this.anims = []; this.start = tl.start; this.end = tl.end; }
    at(k, d = 0) { const c = this.tl.cues[Math.min(k, this.tl.cues.length - 1)]; return (k >= this.tl.cues.length ? c.end : c.start) + d; }
    cueEnd(k, d = 0) { return this.tl.cues[k].end + d; }
    anim(fn) { this.anims.push(fn); }
    el(html, pos = {}, ap = null) {
      const d = document.createElement('div'); d.className = 'abs ' + (pos.cls || '');
      const st = d.style;
      for (const k of ['left', 'top', 'width', 'height', 'right', 'bottom']) {
        const v = pos[{ left: 'x', top: 'y', width: 'w', height: 'h', right: 'r', bottom: 'b' }[k]];
        if (v !== undefined) st[k] = typeof v === 'number' ? v + 'px' : v;
      }
      if (pos.style) d.setAttribute('style', (d.getAttribute('style') || '') + ';' + pos.style);
      d.innerHTML = html; (pos.parent || this.root).appendChild(d);
      if (ap !== null) this.show(d, ap);
      return d;
    }
    show(d, ap) {
      const o = typeof ap === 'number' ? { at: ap } : ap;
      const dur = o.dur || .55, dy = o.dy === undefined ? 14 : o.dy, dx = o.dx || 0, sc = o.scale || 0;
      d.style.opacity = 0;
      this.anim(t => {
        let p = ease((t - o.at) / dur);
        if (o.until !== undefined) p *= 1 - ease((t - o.until) / .4);
        d.style.opacity = p;
        d.style.transform = `translate(${(1 - p) * dx}px,${(1 - p) * dy}px)` + (sc ? ` scale(${1 - sc + sc * p})` : '');
      });
      return d;
    }
    /* highlight an element (amber outline pulse) between times */
    hl(d, at, until, color = 'rgba(232,180,76,.55)') {
      this.anim(t => { const p = ease((t - at) / .35) * (until ? 1 - ease((t - until) / .35) : 1); d.style.boxShadow = p > 0 ? `0 0 0 ${2 * p}px ${color}` : 'none'; });
    }
    /* standard title block: kicker + h2 + amber rule */
    heading(kicker, title, at = 0, x = 60, y = 40, w = 1500) {
      this.el(`<div class="kicker">${kicker}</div>`, { x, y }, { at });
      this.el(`<div class="h2">${title}</div>`, { x, y: y + 34, w }, { at: at + .1 });
    }
    bullets(items, x, y, w, ats, opts = {}) {
      const box = this.el('', { x, y, w, parent: opts.parent });
      items.forEach((it, i) => {
        const color = (typeof it === 'object' && it.c) || opts.color || C.text;
        const txt = typeof it === 'object' ? it.t : it;
        const d = document.createElement('div');
        if (opts.check) d.className = 'ck', d.innerHTML = `<span class="${it.x ? 'cross' : 'tick'}">${it.x ? '✕' : '✓'}</span><span>${txt}</span>`;
        else d.className = 'bl', d.innerHTML = `<span class="dot" style="background:${color}"></span><span>${txt}</span>`;
        if (opts.size) d.style.fontSize = opts.size + 'px';
        box.appendChild(d); this.show(d, { at: ats[i] !== undefined ? ats[i] : ats[ats.length - 1] + .4 * i, dy: 0, dx: -14 });
      });
      return box;
    }
    table(x, y, w, cols, rows, ats, opts = {}) {
      const colw = opts.colw ? opts.colw.map(c => `<col style="width:${c}">`).join('') : '';
      const html = `<table class="t"><colgroup>${colw}</colgroup><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map((r, i) => `<tr data-i="${i}">${r.map((c, j) => `<td class="${j === 0 ? 'k' : ''}" ${opts.colColor && opts.colColor[j] ? `style="color:${opts.colColor[j]}"` : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      const d = this.el(html, { x, y, w, cls: opts.panel === false ? '' : 'panel', style: opts.panel === false ? '' : 'padding:14px 22px' }, { at: opts.at !== undefined ? opts.at : (ats[0] - .4) });
      if (opts.fs) d.querySelectorAll('td').forEach(td => td.style.fontSize = opts.fs + 'px');
      d.querySelectorAll('tbody tr').forEach((tr, i) => this.show(tr, { at: ats[i] !== undefined ? ats[i] : ats[ats.length - 1] + .5 * (i - ats.length + 1), dy: 0, dx: -10 }));
      return d;
    }
    svg(x, y, w, h) {
      const d = this.el('', { x, y, w, h });
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('width', w); s.setAttribute('height', h); s.setAttribute('viewBox', `0 0 ${w} ${h}`); s.style.overflow = 'visible';
      d.appendChild(s); return s;
    }
    /* schematic polyline (normalised 0..1 coords) drawn progressively */
    schematic(x, y, w, h, o) {
      const box = this.el('', { x, y, w, h, cls: o.panel === false ? '' : 'panel' }, { at: o.at - .3 });
      const pad = o.pad || 40, iw = w - 2 * pad, ih = h - 2 * pad - (o.title ? 30 : 0), oy = pad + (o.title ? 30 : 0);
      if (o.title) this.el(`<div class="ptitle">${o.title}</div>`, { x: 22, y: 18, parent: box });
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('width', w); s.setAttribute('height', h); s.style.position = 'absolute'; s.style.left = 0; s.style.top = 0; box.appendChild(s);
      const P = o.pts.map(p => [pad + p[0] * iw, oy + (1 - p[1]) * ih]);
      const segs = []; let L = 0; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); segs.push(l); L += l; }
      const dur = o.dur || 2.2;
      this.anim(t => {
        const p = easeIO((t - o.at) / dur); let rem = p * L, d = `M${P[0][0]},${P[0][1]}`, reach = [0];
        for (let i = 1; i < P.length; i++) {
          if (rem >= segs[i - 1]) { d += ` L${P[i][0]},${P[i][1]}`; rem -= segs[i - 1]; reach.push(i); }
          else { const f = rem / segs[i - 1]; d += ` L${P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f},${P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f}`; break; }
        }
        let out = '';
        (o.zones || []).forEach(z => { const zp = ease((t - z.at) / .5); if (zp <= 0) return; const zy1 = oy + (1 - z.y2) * ih, zy2 = oy + (1 - z.y1) * ih; out += `<rect x="${pad + z.x1 * iw}" y="${zy1}" width="${(z.x2 - z.x1) * iw * zp}" height="${zy2 - zy1}" fill="${z.c}" fill-opacity=".16" stroke="${z.c}" stroke-opacity=".7" stroke-dasharray="${z.dash ? '6 5' : ''}"/>` + (z.label ? `<text x="${pad + z.x1 * iw + 8}" y="${zy1 - 8}" font-family="JBM" font-size="15" fill="${z.c}" opacity="${zp}">${esc(z.label)}</text>` : ''); });
        (o.lines || []).forEach(l => { const lp = ease((t - l.at) / .5); if (lp <= 0) return; const ly = oy + (1 - l.y) * ih; out += `<line x1="${pad + l.x1 * iw}" x2="${pad + (l.x1 + (l.x2 - l.x1) * lp) * iw}" y1="${ly}" y2="${ly}" stroke="${l.c}" stroke-width="1.6" stroke-dasharray="7 6"/>` + (l.label ? `<text x="${pad + l.x2 * iw}" y="${ly - 8}" text-anchor="end" font-family="JBM" font-size="15" fill="${l.c}" opacity="${lp}">${esc(l.label)}</text>` : ''); });
        out += `<path d="${d}" fill="none" stroke="${o.color || C.bull}" stroke-width="${o.sw || 3}" stroke-linejoin="round" stroke-linecap="round"/>`;
        (o.labels || []).forEach(lb => {
          const ok = reach.includes(lb.i) || (lb.at !== undefined && t >= lb.at); if (!ok) return;
          const a = lb.at !== undefined ? ease((t - lb.at) / .4) : 1, [px, py] = P[lb.i], up = lb.pos !== 'below';
          out += `<g opacity="${a}"><circle cx="${px}" cy="${py}" r="6" fill="${lb.c || C.text}"/><text x="${px + (lb.dx || 0)}" y="${up ? py - 16 : py + 32}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${lb.fs || 22}" fill="${lb.c || C.text}">${esc(lb.t)}</text></g>`;
        });
        s.innerHTML = out;
      });
      return box;
    }
    flow(nodes, edges, o = {}) {
      const layer = this.svg(0, 0, W, 820); layer.parentNode.style.pointerEvents = 'none';
      const N = {};
      nodes.forEach(n => {
        N[n.id] = n;
        const d = this.el(`<div class="ft" style="color:${n.c || C.text}">${n.t}</div>${n.s ? `<div class="fs">${n.s}</div>` : ''}`, { x: n.x, y: n.y, w: n.w, h: n.h, cls: 'fbox' }, { at: n.at, dy: 10 });
        d.style.borderColor = n.c ? n.c + '88' : ''; if (n.fill) d.style.background = n.fill;
        if (n.fs) d.querySelector('.ft').style.fontSize = n.fs + 'px';
        n.el = d;
      });
      this.anim(t => {
        let out = '';
        edges.forEach(e => {
          const a = N[e.f], b = N[e.to], p = ease((t - e.at) / .45); if (p <= 0) return;
          let x1, y1, x2, y2;
          if (b.y >= a.y + a.h - 2) { x1 = a.x + a.w / 2; y1 = a.y + a.h; x2 = b.x + b.w / 2; y2 = b.y; }
          else if (b.x >= a.x + a.w - 2) { x1 = a.x + a.w; y1 = a.y + a.h / 2; x2 = b.x; y2 = b.y + b.h / 2; }
          else if (b.x + b.w <= a.x + 2) { x1 = a.x; y1 = a.y + a.h / 2; x2 = b.x + b.w; y2 = b.y + b.h / 2; }
          else { x1 = a.x + a.w / 2; y1 = a.y; x2 = b.x + b.w / 2; y2 = b.y + b.h; }
          const xe = x1 + (x2 - x1) * p, ye = y1 + (y2 - y1) * p, ang = Math.atan2(y2 - y1, x2 - x1), col = e.c || '#5f6e86';
          out += `<line x1="${x1}" y1="${y1}" x2="${xe}" y2="${ye}" stroke="${col}" stroke-width="2.2"/>`;
          if (p > .9) out += `<path d="M${x2},${y2} L${x2 - 12 * Math.cos(ang - .45)},${y2 - 12 * Math.sin(ang - .45)} L${x2 - 12 * Math.cos(ang + .45)},${y2 - 12 * Math.sin(ang + .45)} Z" fill="${col}"/>`;
        });
        layer.innerHTML = out;
      });
      return N;
    }
    chart(o) { const c = new Chart(this, o); return c; }
  }

  /* ---------- candlestick chart ---------- */
  class Chart {
    constructor(S, o) {
      this.S = S; this.o = o; this.ann = []; this.sched = []; this.cT = [];
      validateOHLC(o.candles, o.name || 'chart');
      const box = S.el('', { x: o.x, y: o.y, w: o.w, h: o.h, cls: 'panel' }, { at: o.at || 0, dy: 10 });
      this.box = box;
      if (o.title) S.el(`<div class="ptitle">${o.title}</div>`, { x: 24, y: 20, parent: box });
      if (o.titleR) this.trEl = S.el(`<div class="ptitleR">${o.titleR}</div>`, { r: 24, y: 18, parent: box });
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('width', o.w); s.setAttribute('height', o.h); s.style.position = 'absolute'; s.style.left = 0; s.style.top = 0; s.style.overflow = 'hidden'; box.appendChild(s); this.svg = s;
      this.pl = 30; this.pt = 70; this.pr = 110; this.pb = 40;
      this.pw = o.w - this.pl - this.pr; this.ph = o.h - this.pt - this.pb;
      this.slots = o.slots || o.candles.length + 6;
      this.cw = this.pw / this.slots;
      S.anim(t => this.draw(t));
    }
    X(i) { return this.pl + (i + .5) * this.cw; }
    Y(p) { return this.pt + (this.o.yMax - p) / (this.o.yMax - this.o.yMin) * this.ph; }
    reveal(upto, at, rate = .11) {   // reveal candles [prev..upto] (inclusive index)
      const prev = this.sched.length ? this.sched[this.sched.length - 1].upto + 1 : 0;
      for (let i = prev; i <= upto; i++) this.cT[i] = at + (i - prev) * rate;
      this.sched.push({ upto, at }); return at + (upto - prev + 1) * rate;
    }
    add(a) { this.ann.push(a); return a; }
    hline(a) { a.k = 'hline'; return this.add(a); }
    zone(a) { a.k = 'zone'; return this.add(a); }
    marker(a) { a.k = 'marker'; return this.add(a); }
    label(a) { a.k = 'label'; return this.add(a); }
    arrow(a) { a.k = 'arrow'; return this.add(a); }
    trade(a) { a.k = 'trade'; return this.add(a); }
    measure(a) { a.k = 'measure'; return this.add(a); }
    candleHL(a) { a.k = 'chl'; return this.add(a); }
    question(a) { a.k = 'q'; return this.add(a); }
    setTitleR(txt, at) { this.S.anim(t => { if (this.trEl && t >= at) this.trEl.innerHTML = txt; }); }
    draw(t) {
      const o = this.o, Y = p => this.Y(p), X = i => this.X(i);
      let g = '';
      // grid + axis
      const step = o.step || 10, ax = this.pl + this.pw + 8;
      g += `<line x1="${ax}" y1="${this.pt - 30}" x2="${ax}" y2="${this.pt + this.ph + 10}" stroke="rgba(148,170,210,.10)"/>`;
      for (let p = Math.ceil(o.yMin / step) * step; p <= o.yMax; p += step) {
        g += `<line x1="${this.pl}" x2="${ax}" y1="${Y(p)}" y2="${Y(p)}" stroke="rgba(148,170,210,.045)"/>`;
        g += `<text x="${ax + 14}" y="${Y(p) + 6}" font-family="JBM" font-size="16" fill="#4a5872">${fmt(p)}</text>`;
      }
      // annotations below candles
      const vis = a => { let p = ease((t - a.at) / (a.dur || .5)); if (a.until !== undefined) p *= 1 - ease((t - a.until) / .4); return p; };
      for (const a of this.ann) if (a.k === 'zone' || a.k === 'trade' || a.k === 'chl') { const p = vis(a); if (p > 0) g += this['d_' + a.k](a, p, t); }
      // candles
      o.candles.forEach((c, i) => {
        const ct = this.cT[i]; if (ct === undefined) return; const p = ease((t - ct) / .2); if (p <= 0) return;
        const [op, hi, lo, cl] = c, up = cl >= op, col = up ? C.bull : C.bear, x = X(i), bw = Math.max(4, this.cw * .62);
        const mid = (op + cl) / 2, sc = .35 + .65 * p;
        const yo = Y(mid + (op - mid) * sc), yc = Y(mid + (cl - mid) * sc), yh = Y(mid + (hi - mid) * sc), yl = Y(mid + (lo - mid) * sc);
        const dim = o.dim && o.dim(i, t) ? .28 : 1;
        g += `<g opacity="${p * dim}"><line x1="${x}" x2="${x}" y1="${yh}" y2="${yl}" stroke="${col}" stroke-width="2"/><rect x="${x - bw / 2}" y="${Math.min(yo, yc)}" width="${bw}" height="${Math.max(2, Math.abs(yc - yo))}" fill="${col}" rx="1"/></g>`;
      });
      for (const a of this.ann) if (!['zone', 'trade', 'chl'].includes(a.k)) { const p = vis(a); if (p > 0) g += this['d_' + a.k](a, p, t); }
      this.svg.innerHTML = g;
    }
    xr(v) { return v === 'end' ? this.pl + this.pw : (typeof v === 'number' ? this.X(v) : this.pl); }
    tagBox(x, y, txt, col, anchor = 'start', fill = '#0b1424', fs = 16) {
      const w = txt.length * fs * .61 + 18, h = fs + 14, bx = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x;
      return `<rect x="${bx}" y="${y - h / 2}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="${col}" stroke-width="1.3"/><text x="${bx + w / 2}" y="${y + fs * .36}" text-anchor="middle" font-family="JBM" font-weight="500" font-size="${fs}" fill="${col}">${esc(txt)}</text>`;
    }
    d_hline(a, p) {
      const x1 = this.xr(a.from === undefined ? null : a.from), x2full = this.xr(a.to === undefined ? 'end' : a.to), x2 = x1 + (x2full - x1) * p, y = this.Y(a.p);
      let s = `<line x1="${x1}" x2="${x2}" y1="${y}" y2="${y}" stroke="${a.c}" stroke-width="${a.w || 1.8}" stroke-dasharray="${a.solid ? '' : '8 6'}" opacity="${a.op || .9}"/>`;
      if (a.label) { const lx = a.side === 'left' ? x1 + 6 : x2full - 4; s += `<g opacity="${p}">${this.tagBox(lx, y + (a.ly || 0), a.label, a.c, a.side === 'left' ? 'start' : 'end')}</g>`; }
      return s;
    }
    d_zone(a, p) {
      const x1 = this.xr(a.from), x2f = this.xr(a.to === undefined ? 'end' : a.to), x2 = x1 + (x2f - x1) * p, y1 = this.Y(a.p2), y2 = this.Y(a.p1);
      let s = `<rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" fill="${a.c}" fill-opacity="${a.fo || .15}" stroke="${a.c}" stroke-opacity=".75" stroke-width="1.3" stroke-dasharray="${a.dash ? '6 5' : ''}"/>`;
      if (a.label) s += `<text x="${(a.lx === 'right' ? x2f - 8 : x1 + 8)}" y="${a.lpos === 'below' ? y2 + 22 : y1 - 9}" text-anchor="${a.lx === 'right' ? 'end' : 'start'}" font-family="JBM" font-weight="500" font-size="16" fill="${a.c}" opacity="${p}">${esc(a.label)}</text>`;
      return s;
    }
    d_marker(a, p) {
      const x = this.X(a.i), y = this.Y(a.p), up = a.pos !== 'below', col = a.c || C.text;
      let s = `<g opacity="${p}"><circle cx="${x}" cy="${y}" r="${7 + 3 * (1 - p)}" fill="none" stroke="${col}" stroke-width="2.4"/>`;
      if (a.t) s += `<text x="${x + (a.dx || 0)}" y="${up ? y - 18 : y + 34}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${a.fs || 22}" fill="${col}">${esc(a.t)}</text>`;
      if (a.price) s += `<text x="${x + (a.dx || 0)}" y="${up ? y - 44 : y + 58}" text-anchor="middle" font-family="JBM" font-size="15" fill="#8794aa">${fmt(a.p)}</text>`;
      return s + '</g>';
    }
    d_label(a, p) { return `<g opacity="${p}">${this.tagBox(this.X(a.i) + (a.dx || 0), this.Y(a.p) + (a.dy || 0), a.t, a.c || C.text, a.anchor || 'middle', a.fill, a.fs)}</g>`; }
    d_arrow(a, p) {
      const x1 = this.X(a.i1), y1 = this.Y(a.p1), x2 = this.X(a.i2), y2 = this.Y(a.p2), xe = x1 + (x2 - x1) * p, ye = y1 + (y2 - y1) * p, an = Math.atan2(y2 - y1, x2 - x1), c = a.c || C.text;
      let s = `<line x1="${x1}" y1="${y1}" x2="${xe}" y2="${ye}" stroke="${c}" stroke-width="2.4" stroke-dasharray="${a.dash ? '7 6' : ''}"/>`;
      if (p > .85) s += `<path d="M${x2},${y2} L${x2 - 14 * Math.cos(an - .45)},${y2 - 14 * Math.sin(an - .45)} L${x2 - 14 * Math.cos(an + .45)},${y2 - 14 * Math.sin(an + .45)} Z" fill="${c}"/>`;
      return s;
    }
    d_measure(a, p) {
      const x = this.X(a.i) + (a.dx || 0), y1 = this.Y(a.p1), y2 = this.Y(a.p1 + (a.p2 - a.p1) * p), c = a.c || C.text;
      return `<line x1="${x}" x2="${x}" y1="${y1}" y2="${y2}" stroke="${c}" stroke-width="2"/><line x1="${x - 9}" x2="${x + 9}" y1="${y1}" y2="${y1}" stroke="${c}" stroke-width="2"/><line x1="${x - 9}" x2="${x + 9}" y1="${y2}" y2="${y2}" stroke="${c}" stroke-width="2"/>` + (a.t ? `<g opacity="${p}">${this.tagBox(x + (a.tx || -14), (y1 + this.Y(a.p2)) / 2, a.t, c, a.anchor || 'end')}</g>` : '');
    }
    d_chl(a, p) { // highlight band around candles
      const x1 = this.X(a.i1) - this.cw * .55, x2 = this.X(a.i2) + this.cw * .55, y1 = this.Y(a.p2), y2 = this.Y(a.p1);
      return `<rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" rx="6" fill="${a.c}" fill-opacity="${.10 * p}" stroke="${a.c}" stroke-opacity="${.8 * p}" stroke-width="1.5" stroke-dasharray="5 4"/>` + (a.t ? `<text x="${a.side === 'left' ? x1 - 8 : (x1 + x2) / 2}" y="${a.side === 'left' ? (y1 + y2) / 2 + 6 : a.below ? y2 + 26 : y1 - 10}" text-anchor="${a.side === 'left' ? 'end' : 'middle'}" font-family="JBM" font-weight="700" font-size="16" fill="${a.c}" opacity="${p}">${esc(a.t)}</text>` : '');
    }
    d_trade(a, p) { // position tool: risk (SL) and reward (TP) boxes
      const x1 = this.X(a.i) - this.cw * .5, x2f = this.xr(a.to === undefined ? 'end' : a.to), x2 = x1 + (x2f - x1) * p;
      const ye = this.Y(a.entry), ys = this.Y(a.sl), yt = this.Y(a.tp), long = a.tp > a.entry;
      let s = `<rect x="${x1}" y="${Math.min(ye, yt)}" width="${x2 - x1}" height="${Math.abs(yt - ye)}" fill="${C.bull}" fill-opacity=".16"/>`;
      s += `<rect x="${x1}" y="${Math.min(ye, ys)}" width="${x2 - x1}" height="${Math.abs(ys - ye)}" fill="${C.bear}" fill-opacity=".16"/>`;
      s += `<line x1="${x1}" x2="${x2}" y1="${ye}" y2="${ye}" stroke="${C.text}" stroke-width="2"/>`;
      s += `<line x1="${x1}" x2="${x2}" y1="${yt}" y2="${yt}" stroke="${C.bull}" stroke-width="2"/>`;
      s += `<line x1="${x1}" x2="${x2}" y1="${ys}" y2="${ys}" stroke="${C.bear}" stroke-width="2"/>`;
      if (a.tp1) { const y1 = this.Y(a.tp1); s += `<line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y1}" stroke="${C.bull}" stroke-width="1.6" stroke-dasharray="6 5"/>`; }
      const lx = x2f - 6, op = clamp((p - .6) / .4);
      const d1 = Math.abs(a.tp - a.entry), d2 = Math.abs(a.entry - a.sl);
      if (a.tags === false) return s;
      s += `<g opacity="${op}">${this.tagBox(lx, yt + (long ? -18 : 18), `TP ${fmt(a.tp)} · +${d1} pts`, C.bull, 'end')}${this.tagBox(lx, ye + (a.eOff || 0), `ENTRY ${fmt(a.entry)}`, C.text, 'end')}${this.tagBox(lx, ys + (long ? 18 : -18), `SL ${fmt(a.sl)} · −${d2} pts`, C.bear, 'end')}`;
      if (a.tp1) s += this.tagBox(lx, this.Y(a.tp1), `TP1 ${fmt(a.tp1)}`, C.bull, 'end');
      return s + '</g>';
    }
    d_q(a, p) { // "?" placeholder for future area (no look-ahead)
      const x1 = this.X(a.i), x2 = this.pl + this.pw;
      return `<g opacity="${p * .9}"><rect x="${x1}" y="${this.pt - 20}" width="${x2 - x1}" height="${this.ph + 20}" fill="url(#qg)" /><line x1="${x1}" x2="${x1}" y1="${this.pt - 20}" y2="${this.pt + this.ph}" stroke="${C.amber}" stroke-dasharray="4 6" stroke-width="1.5"/><text x="${(x1 + x2) / 2}" y="${this.pt + 40}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="56" fill="${C.amber}" fill-opacity=".35">?</text><text x="${(x1 + x2) / 2}" y="${this.pt + 72}" text-anchor="middle" font-family="JBM" font-size="16" fill="${C.amber}" fill-opacity=".8">${esc(a.t || 'FUTURE · NOT VISIBLE')}</text></g><defs><linearGradient id="qg" x1="0" x2="1"><stop offset="0" stop-color="${C.amber}" stop-opacity=".07"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></linearGradient></defs>`;
    }
  }

  function validateOHLC(cs, name) {
    cs.forEach((c, i) => {
      const [o, h, l, cl] = c;
      if (!(h >= o && h >= cl && l <= o && l <= cl && h >= l)) throw new Error(`Invalid OHLC in ${name} candle ${i}: ${c}`);
    });
  }

  /* ---------- player ---------- */
  const P = {
    init(ep, tl) {
      this.ep = ep; this.tl = tl || estimateTimeline(ep); this.cur = -1; this.S = null;
      document.getElementById('badge').textContent = ep.badge || 'L9';
      document.getElementById('hl1').textContent = ep.hl1 || 'LEVEL 9 · CMI SMC';
      document.getElementById('hl2').textContent = ep.hl2 || 'SMC TRADING STRATEGY';
      document.getElementById('hr1').textContent = `${ep.video} — ${(ep.short || ep.title).toUpperCase()}`;
      if (ep.stageClass) document.getElementById('stage').classList.add(...ep.stageClass.split(' '));
      // optional full-screen logo intro (covers header) for the first ep.intro.dur seconds
      if (ep.intro) { const d = document.createElement('div'); d.id = 'intro'; d.innerHTML = `<img src="${ep.intro.img}">`; document.getElementById('stage').appendChild(d); this.introEl = d; }
    },
    render(t) {
      const tl = this.tl; let k = tl.scenes.findIndex(s => t >= s.start && t < s.end); if (k < 0) k = t < 0 ? 0 : tl.scenes.length - 1;
      if (k !== this.cur) {
        const content = document.getElementById('content'); content.innerHTML = '';
        const root = document.createElement('div'); root.className = 'scene'; content.appendChild(root);
        const S = new Scene(root, tl.scenes[k], k); const sc = this.ep.scenes[k];
        sc.build(S, C, { fmt, ease }); this.S = S; this.cur = k;
        document.getElementById('hr2').textContent = `SCENE ${k + (this.ep.intro ? 0 : 1)} · ${sc.label}`;
      }
      const S = this.S, sc = tl.scenes[k];
      S.root.style.opacity = Math.min(ease((t - sc.start) / .35), k === tl.scenes.length - 1 ? 1 : ease((sc.end - t) / .35));
      for (const f of S.anims) f(t);
      const cue = sc.cues.find(c => t >= c.start - .05 && t < c.end + .3);
      const subs = document.querySelector('#subs span'); const txt = cue ? cue.text : '';
      if (subs.textContent !== txt) subs.textContent = txt;
      if (this.introEl) { const it = this.ep.intro; this.introEl.style.opacity = 1 - ease((t - it.dur) / (it.fade || .45)); const z = 1 + .03 * clamp(t / it.dur); this.introEl.firstChild.style.transform = `scale(${z})`; }
      document.getElementById('prog').style.width = (clamp(t / tl.total) * 100) + '%';
    }
  };
  window.CMI = { P, C, fmt, ease, estimateTimeline };
})();
