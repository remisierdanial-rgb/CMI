/* CMI L10 — visualisation components. Pure functions: spec -> SVG/HTML string.
   Animated nodes carry data-at (segment index within scene), data-d (delay s), data-a (anim), data-o (out segment). */
(function (G) {
  const fmt = n => Math.round(n).toLocaleString('en-US');
  const A = (at, d = 0, a = 'fade', dur, o) => at === undefined || at === null ? '' :
    ` data-at="${at}" data-d="${(+d).toFixed(3)}" data-a="${a}"${dur ? ` data-u="${dur}"` : ''}${o !== undefined ? ` data-o="${o}"` : ''}`;
  const COL = { g: '#26a69a', g2: '#3fd1b5', r: '#ef5350', r2: '#ff7b77', c: '#22c7e6', a: '#f5a524', y: '#e8b64c', p: '#a78bfa', b: '#3b82f6', m: '#8e9bb4', w: '#eef2f8', d: '#56637e' };
  const col = c => COL[c] || c || COL.y;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ---------- candle data ---------- */
  function genCandles(d) {
    const R = rng(d.seed || 7), n = d.n, way = d.way, noise = d.noise ?? 6, wick = d.wick ?? 7;
    const interp = i => { for (let k = 0; k < way.length - 1; k++) { const [i0, p0] = way[k], [i1, p1] = way[k + 1]; if (i >= i0 && i <= i1) return p0 + (p1 - p0) * (i - i0) / Math.max(1, i1 - i0); } return way[way.length - 1][1]; };
    const out = []; let prev = way[0][1];
    for (let i = 0; i < n; i++) {
      const gauss = (R() + R() + R() - 1.5) * 2;
      let c = Math.round(interp(i) + gauss * noise);
      let o = Math.round(prev + (R() - .5) * 2);
      let h = Math.max(o, c) + Math.round(R() * wick + 1), l = Math.min(o, c) - Math.round(R() * wick + 1);
      let v = (d.vbase || 1000) * (0.65 + R() * 0.7) * (1 + Math.abs(c - o) / (noise * 4 + 1) * (d.vbody ?? 0.25));
      out.push({ o, h, l, c, v });
      prev = c;
    }
    if (d.ovr) for (const k in d.ovr) { const b = out[k]; Object.assign(b, d.ovr[k]); }
    (d.vr || []).forEach(([a, b, m]) => { for (let i = a; i <= b && i < n; i++) out[i].v *= m; });
    if (d.vm) for (const k in d.vm) out[k].v *= d.vm[k];
    // re-chain opens after overrides unless explicitly set, then validate OHLC
    for (let i = 0; i < n; i++) {
      const b = out[i];
      if (i > 0 && !(d.ovr && d.ovr[i] && d.ovr[i].o !== undefined)) b.o = out[i - 1].c;
      b.h = Math.max(b.h, b.o, b.c); b.l = Math.min(b.l, b.o, b.c); b.v = Math.round(b.v);
    }
    return out;
  }

  /* ---------- volume profile (uniform distribution of each bar's volume across its range) ---------- */
  function profile(bars, i1, i2, bin, vaPct = 0.70) {
    let lo = Infinity, hi = -Infinity;
    for (let i = i1; i <= i2; i++) { lo = Math.min(lo, bars[i].l); hi = Math.max(hi, bars[i].h); }
    lo = Math.floor(lo / bin) * bin; hi = Math.ceil(hi / bin) * bin;
    const nb = Math.round((hi - lo) / bin), vol = new Array(nb).fill(0);
    for (let i = i1; i <= i2; i++) {
      const b = bars[i], span = Math.max(1, b.h - b.l);
      for (let k = 0; k < nb; k++) {
        const a = lo + k * bin, z = a + bin, ov = Math.max(0, Math.min(z, b.h) - Math.max(a, b.l));
        vol[k] += b.v * (b.h === b.l ? (b.h >= a && b.h < z ? 1 : 0) : ov / span);
      }
    }
    const tot = vol.reduce((s, x) => s + x, 0);
    let poc = 0; vol.forEach((x, k) => { if (x > vol[poc]) poc = k; });
    let up = poc, dn = poc, acc = vol[poc];
    while (acc < vaPct * tot && (up < nb - 1 || dn > 0)) {
      const a = up < nb - 1 ? vol[up + 1] : -1, b = dn > 0 ? vol[dn - 1] : -1;
      if (a >= b) { up++; acc += vol[up]; } else { dn--; acc += vol[dn]; }
    }
    return { lo, hi, bin, vol, tot, poc, pocPrice: lo + (poc + .5) * bin, vah: lo + (up + 1) * bin, val: lo + dn * bin, vaPct: acc / tot };
  }

  /* ---------- candlestick chart ---------- */
  function candleChart(s, W, H) {
    const bars = s.bars || genCandles(s.data);
    const n = bars.length, slots = s.slots || n + 3;
    const padL = (s.rows || []).length ? 70 : 22, padR = s.noAxis ? 22 : 92, top = 64;
    const volH = s.vol === false ? 0 : (s.volH || 96), rowsH = (s.rows || []).length * 34, cvdH = s.cvd ? 130 : 0;
    const bottom = 18 + volH + rowsH + cvdH + (volH ? 14 : 0);
    const pw = W - padL - padR, ph = H - top - bottom;
    let lo = Infinity, hi = -Infinity; bars.forEach(b => { lo = Math.min(lo, b.l); hi = Math.max(hi, b.h); });
    if (s.range) { lo = s.range[0]; hi = s.range[1]; } else { const pad = (hi - lo) * .1; lo -= pad; hi += pad; }
    const cw = pw / slots, X = i => padL + (i + .5) * cw, Y = p => top + (hi - p) / (hi - lo) * ph;
    const parts = [];
    // axis grid
    if (!s.noAxis) {
      const span = hi - lo, step = [10, 20, 25, 50, 100, 200, 250, 500].find(st => span / st <= 7) || 1000;
      for (let p = Math.ceil(lo / step) * step; p <= hi; p += step)
        parts.push(`<line x1="${padL}" x2="${W - padR + 8}" y1="${Y(p)}" y2="${Y(p)}" stroke="#1a2742" stroke-width="1"/><text x="${W - padR + 16}" y="${Y(p) + 5}" fill="#56637e" font-size="15" class="mono">${fmt(p)}</text>`);
    }
    // timing per candle
    const rev = s.reveal || [[0, n - 1, 2.2]];
    const tim = i => { let prev = -1; for (const [at, upto, dur, d0] of rev) { if (i <= upto) { const cnt = Math.max(1, upto - prev); return [at, (d0 || 0) + (i - prev - 1) / cnt * (dur ?? 1.5)]; } prev = upto; } return [0, 0]; };
    const bw = Math.max(2, cw * .62);
    const vmax = s.vmax || Math.max(...bars.map(b => b.v)), vTop = H - 18 - volH - rowsH - cvdH;
    bars.forEach((b, i) => {
      if (s.hide && i >= s.hide) return;
      const [at, d] = tim(i), up = b.c >= b.o, c = up ? COL.g : COL.r, x = X(i);
      const y1 = Y(Math.max(b.o, b.c)), y2 = Y(Math.min(b.o, b.c));
      parts.push(`<g${A(at, d, 'fade', .25)}><line x1="${x}" x2="${x}" y1="${Y(b.h)}" y2="${Y(b.l)}" stroke="${c}" stroke-width="1.6"/><rect x="${x - bw / 2}" y="${y1}" width="${bw}" height="${Math.max(1.5, y2 - y1)}" fill="${c}"/></g>`);
      if (volH) { const vh = b.v / vmax * (volH - 6); parts.push(`<rect x="${x - bw / 2}" y="${vTop + volH - vh}" width="${bw}" height="${vh}" fill="${c}" opacity=".55"${A(at, d, 'fade', .25)}/>`); }
    });
    if (volH) parts.push(`<text x="${padL}" y="${vTop + 12}" fill="#56637e" font-size="13" class="mono" letter-spacing="2">VOLUME</text>`);
    // extra rows (delta etc.)
    (s.rows || []).forEach((r, k) => {
      const y = vTop + volH + 8 + k * 34;
      parts.push(`<text x="12" y="${y + 21}" fill="#8e9bb4" font-size="12" class="mono" letter-spacing="1"${A(r.at, 0)}>${esc(r.label)}</text>`);
      r.vals.forEach((v, i) => { if (v === null || v === undefined) return; const [at, d] = r.at !== undefined ? [r.at, i * .05] : tim(i); const t = typeof v === 'number' ? (v > 0 ? '+' : '') + fmt(v) : v; parts.push(`<text x="${X(i)}" y="${y + 21}" text-anchor="middle" fill="${typeof v === 'number' ? (v > 0 ? COL.g2 : v < 0 ? COL.r2 : COL.m) : COL.m}" font-size="${r.fs || 13}" class="mono"${A(at, d)}>${t}</text>`); });
    });
    // CVD panel
    if (s.cvd) {
      const y0 = H - 18 - cvdH + 10, y1 = H - 22; const cv = s.cvd.vals; const mn = Math.min(...cv), mx = Math.max(...cv);
      const cy = v => y1 - (v - mn) / Math.max(1, mx - mn) * (y1 - y0 - 18);
      parts.push(`<text x="${padL}" y="${y0 + 8}" fill="#22c7e6" font-size="13" class="mono" letter-spacing="2"${A(s.cvd.at, 0)}>CVD (CUMULATIVE DELTA)</text>`);
      parts.push(`<path d="${cv.map((v, i) => (i ? 'L' : 'M') + X(i) + ' ' + cy(v)).join(' ')}" fill="none" stroke="#22c7e6" stroke-width="2.5" pathLength="1"${A(s.cvd.at, s.cvd.d || 0, 'draw', s.cvd.dur || 2)}/>`);
    }
    // annotations
    const ctx = { X, Y, W, H, padL, padR, top, ph, pw, bars, cw, vTop, volH, lo, hi, vmax };
    (s.ann || []).forEach(a => parts.push(ann(a, ctx)));
    const head = `${s.title ? `<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>` : ''}${s.tag ? `<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>` : ''}`;
    return { svg: head + parts.join(''), ctx, bars };
  }

  function lbox(x, y, text, c, anchor = 'start', fs = 14, extra = '') {
    const w = text.length * (fs * .6 + 1) + 18, h = fs + 12;
    const x0 = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x;
    return `<g${extra}><rect x="${x0}" y="${y - h / 2}" width="${w}" height="${h}" rx="3" fill="#0a1222" stroke="${c}" stroke-width="1.3"/><text x="${x0 + w / 2}" y="${y + fs * .36}" text-anchor="middle" fill="${c}" font-size="${fs}" class="mono" letter-spacing="1">${esc(text)}</text></g>`;
  }

  function ann(a, k) {
    const c = col(a.c), at = a.at, d = a.d || 0, o = a.o;
    const ex = (an = 'fade', dur) => A(at, d, an, dur, o);
    switch (a.t) {
      case 'hline': {
        const x1 = a.i1 !== undefined ? k.X(a.i1) : k.padL, x2 = a.i2 !== undefined ? k.X(a.i2) : k.W - k.padR, y = k.Y(a.p);
        const lab = a.label ? lbox(a.lx === 'l' ? x1 + 4 : x2 - 4, y - 15, a.label, c, a.lx === 'l' ? 'start' : 'end', 13) : '';
        return `<g${ex()}><line x1="${x1}" x2="${x2}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="${a.w || 2}" ${a.dash !== false ? 'stroke-dasharray="7 6"' : ''}/>${lab}</g>`;
      }
      case 'zone': {
        const x1 = a.i1 !== undefined ? k.X(a.i1) - k.cw / 2 : k.padL, x2 = a.i2 !== undefined ? k.X(a.i2) + k.cw / 2 : k.W - k.padR;
        const y1 = k.Y(Math.max(a.p1, a.p2)), y2 = k.Y(Math.min(a.p1, a.p2));
        return `<g${ex()}><rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" fill="${c}" fill-opacity="${a.op || .13}" stroke="${c}" stroke-opacity=".7" stroke-width="1.4" ${a.dash ? 'stroke-dasharray="6 5"' : ''}/>${a.label ? `<text x="${a.lx === 'r' ? x2 - 8 : x1 + 8}" y="${a.ly === 'b' ? y2 - 8 : y1 + 18}" ${a.lx === 'r' ? 'text-anchor="end"' : ''} fill="${c}" font-size="13" class="mono" letter-spacing="1.5">${esc(a.label)}</text>` : ''}</g>`;
      }
      case 'tag': {
        const b = k.bars[a.i]; const pos = a.pos || 'above';
        const p = a.p !== undefined ? a.p : (pos === 'above' ? b.h : b.l);
        const x = k.X(a.i), y = k.Y(p), off = a.off || 30, ly = pos === 'above' ? y - off : y + off;
        return `<g${ex('pop')}><circle cx="${x}" cy="${y}" r="5.5" fill="none" stroke="${c}" stroke-width="2"/><line x1="${x}" x2="${x}" y1="${pos === 'above' ? y - 6 : y + 6}" y2="${pos === 'above' ? ly + 11 : ly - 11}" stroke="${c}" stroke-width="1" opacity=".6"/>${lbox(x + (a.dx || 0), ly, a.text, c, 'middle', a.fs || 13)}</g>`;
      }
      case 'band': {
        const x1 = k.X(a.i1) - k.cw / 2, x2 = k.X(a.i2) + k.cw / 2;
        return `<g${ex()}><rect x="${x1}" y="${k.top - 8}" width="${x2 - x1}" height="${k.ph + 8}" fill="${c}" fill-opacity="${a.op || .07}"/><line x1="${x1}" x2="${x1}" y1="${k.top - 8}" y2="${k.top + k.ph}" stroke="${c}" stroke-opacity=".35" stroke-dasharray="3 5"/>${a.label ? `<text x="${(x1 + x2) / 2}" y="${k.top + 10}" text-anchor="middle" fill="${c}" font-size="14" font-weight="700" class="mono" letter-spacing="2">${esc(a.label)}</text>` : ''}</g>`;
      }
      case 'path': {
        const pts = a.pts.map(([i, p]) => [k.X(i), k.Y(p)]);
        return `<path d="${pts.map((q, j) => (j ? 'L' : 'M') + q[0] + ' ' + q[1]).join(' ')}" fill="none" stroke="${c}" stroke-width="${a.w || 2.5}" ${a.dash ? 'stroke-dasharray="7 6"' : ''} pathLength="1"${A(at, d, a.dash ? 'fade' : 'draw', a.dur || 1.2, o)}/>`;
      }
      case 'arrow': {
        const x = k.X(a.i), y = k.Y(a.p), dir = a.dir === 'down' ? 1 : -1, L = a.len || 60;
        return `<g${ex('pop')}><line x1="${x}" x2="${x}" y1="${y - dir * L}" y2="${y}" stroke="${c}" stroke-width="3"/><path d="M${x - 9} ${y + dir * -12} L${x} ${y} L${x + 9} ${y + dir * -12}" fill="none" stroke="${c}" stroke-width="3"/>${a.label ? lbox(x, y - dir * (L + 16), a.label, c, 'middle', 13) : ''}</g>`;
      }
      case 'vhl': return a.i.map((i, j) => { const b = k.bars[i], vmax = k.vmax, vh = b.v / vmax * (k.volH - 6); return `<rect x="${k.X(i) - k.cw * .45}" y="${k.vTop + k.volH - vh - 4}" width="${k.cw * .9}" height="${vh + 6}" fill="none" stroke="${col(a.c || 'a')}" stroke-width="2.2" rx="2"${A(at, d + j * .12, 'pop', .3, o)}/>`; }).join('') + (a.label ? `<text x="${k.X(a.i[a.i.length - 1]) + k.cw}" y="${k.vTop + 14}" fill="${col(a.c || 'a')}" font-size="13" class="mono" letter-spacing="1.5"${ex()}>${esc(a.label)}</text>` : '');
      case 'chl': return a.i.map((i, j) => { const b = k.bars[i]; return `<rect x="${k.X(i) - k.cw * .55}" y="${k.Y(b.h) - 6}" width="${k.cw * 1.1}" height="${k.Y(b.l) - k.Y(b.h) + 12}" fill="none" stroke="${c}" stroke-width="2" rx="3"${A(at, d + j * .1, 'pop', .3, o)}/>`; }).join('');
      case 'measure': {
        const x = k.X(a.i), y1 = k.Y(a.p1), y2 = k.Y(a.p2);
        return `<g${ex()}><line x1="${x}" x2="${x}" y1="${y1}" y2="${y2}" stroke="${c}" stroke-width="1.6"/><line x1="${x - 7}" x2="${x + 7}" y1="${y1}" y2="${y1}" stroke="${c}" stroke-width="1.6"/><line x1="${x - 7}" x2="${x + 7}" y1="${y2}" y2="${y2}" stroke="${c}" stroke-width="1.6"/>${lbox(x + 10, (y1 + y2) / 2, a.text, c, 'start', 13)}</g>`;
      }
      case 'note': {
        const x = k.padL + a.x * k.pw, y = k.top + a.y * k.ph;
        return lbox(x, y, a.text, c, a.anchor || 'middle', a.fs || 14, ex('pop'));
      }
      case 'vma': { // average of the previous n bars' volume (excluding the current bar)
        const vmax = k.vmax, pts = [];
        for (let i = a.n; i < k.bars.length; i++) { let sm = 0; for (let j = i - a.n; j < i; j++) sm += k.bars[j].v; const av = sm / a.n; pts.push([k.X(i), k.vTop + k.volH - av / vmax * (k.volH - 6)]); }
        return `<g${ex()}><path d="${pts.map((q, j) => (j ? 'L' : 'M') + q[0] + ' ' + q[1]).join(' ')}" fill="none" stroke="${c}" stroke-width="2"/>${a.label ? `<text x="${pts[pts.length - 1][0] + 8}" y="${pts[pts.length - 1][1] + 4}" fill="${c}" font-size="12" class="mono">${esc(a.label)}</text>` : ''}</g>`;
      }
      case 'vline': { const x = k.X(a.i); return `<g${ex()}><line x1="${x}" x2="${x}" y1="${k.top - 6}" y2="${k.top + k.ph}" stroke="${c}" stroke-width="1.6" stroke-dasharray="5 5"/>${a.label ? lbox(x, k.top + 6, a.label, c, 'middle', 13) : ''}</g>`; }
      case 'curtain': { // hides the future: covers bars from i to the end
        const x = k.X(a.i) - k.cw / 2; return `<g${ex()}><rect x="${x}" y="${k.top - 10}" width="${k.W - k.padR - x + 4}" height="${k.H - k.top - 8}" fill="#0b1426" opacity=".97"/><line x1="${x}" x2="${x}" y1="${k.top - 10}" y2="${k.H - 10}" stroke="${c}" stroke-width="2"/>${a.label ? `<text x="${x + 20}" y="${k.top + k.ph / 2}" fill="${c}" font-size="18" class="mono" letter-spacing="2">${esc(a.label)}</text>` : ''}</g>`;
      }
      case 'profile': {
        const pr = profile(k.bars, a.i1, a.i2, a.bin || 5);
        const anc = a.anchor, maxW = a.width || 220, xr = anc ? k.X(a.i1) - k.cw * .45 : a.side === 'left' ? k.padL + 4 : k.W - k.padR - 4, vmax = Math.max(...pr.vol), out = [];
        pr.vol.forEach((v, j) => {
          const pa = pr.lo + j * a.bin, y1 = k.Y(pa + a.bin), y2 = k.Y(pa), w = v / vmax * maxW;
          const inVA = pa >= pr.val && pa < pr.vah, isPoc = j === pr.poc;
          const fill = isPoc ? COL.y : inVA ? (a.va === false ? '#3b82f6' : '#2b7fd9') : '#2a4a78';
          const x = (anc || a.side === 'left') ? xr : xr - w;
          out.push(`<rect x="${x}" y="${y1 + .6}" width="${w}" height="${Math.max(1, y2 - y1 - 1.2)}" fill="${fill}" opacity="${(isPoc ? .9 : inVA ? .55 : .45) * (a.op || 1)}"${A(at, d + j * .015, (anc || a.side === 'left') ? 'growx' : 'growxr', .35, o)}/>`);
        });
        const L = (p, lab, cc, dl) => { const y = k.Y(p), lx1 = anc ? k.X(a.i1) - k.cw / 2 : k.padL, lx2 = a.x2 !== undefined ? k.X(a.x2) : anc ? k.X(a.i2) + k.cw / 2 : k.W - k.padR; return `<g${A(a.atLines ?? at, (a.atLines !== undefined ? 0 : d + .8) + dl, 'fade', .4, o)}><line x1="${lx1}" x2="${lx2}" y1="${y}" y2="${y}" stroke="${cc}" stroke-width="1.6" stroke-dasharray="${lab === 'POC' ? '0' : '7 6'}" opacity=".9"/>${anc ? lbox(lx2 - 4, y - 13, `${lab} ${fmt(p)}`, cc, 'end', 11) : lbox(k.W - k.padR + 4, y, `${lab} ${fmt(p)}`, cc, 'start', 12)}</g>`; };
        if (a.lines !== false) { out.push(L(pr.vah, 'VAH', COL.c, 0)); out.push(L(pr.val, 'VAL', COL.c, .15)); out.push(L(Math.round(pr.pocPrice), 'POC', COL.y, .3)); }
        return out.join('');
      }
      default: return '';
    }
  }

  /* ---------- schematic line drawing (normalised 0..100 coords) ---------- */
  function lines(s, W, H) {
    const pl = 40, pr = 40, pt = 70, pb = 40, X = x => pl + x / 100 * (W - pl - pr), Y = y => pt + (100 - y) / 100 * (H - pt - pb);
    const out = [];
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    (s.bands || []).forEach(b => { const c = col(b.c); out.push(`<g${A(b.at, b.d || 0, 'fade', .5, b.o)}><rect x="${X(b.x1)}" y="${pt - 14}" width="${X(b.x2) - X(b.x1)}" height="${H - pt - pb + 14}" fill="${c}" fill-opacity=".07"/><line x1="${X(b.x1)}" x2="${X(b.x1)}" y1="${pt - 14}" y2="${H - pb}" stroke="${c}" stroke-opacity=".35" stroke-dasharray="3 5"/><text x="${(X(b.x1) + X(b.x2)) / 2}" y="${pt + 6}" text-anchor="middle" fill="${c}" font-size="15" font-weight="700" class="mono" letter-spacing="2">${esc(b.label)}</text></g>`); });
    (s.hl || []).forEach(h => { const c = col(h.c); const y = Y(h.y), x1 = X(h.x1 ?? 0), x2 = X(h.x2 ?? 100); out.push(`<g${A(h.at, h.d || 0, 'fade', .5, h.o)}><line x1="${x1}" x2="${x2}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="1.8" stroke-dasharray="8 6"/>${h.label ? lbox(h.lx === 'l' ? x1 + 4 : x2 - 4, y - 15, h.label, c, h.lx === 'l' ? 'start' : 'end', 13) : ''}</g>`); });
    (s.zones || []).forEach(z => { const c = col(z.c); out.push(`<g${A(z.at, z.d || 0, 'fade', .5, z.o)}><rect x="${X(z.x1)}" y="${Y(z.y2)}" width="${X(z.x2) - X(z.x1)}" height="${Y(z.y1) - Y(z.y2)}" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-opacity=".6" stroke-dasharray="6 5"/>${z.label ? `<text x="${X(z.x1) + 8}" y="${Y(z.y2) + 18}" fill="${c}" font-size="13" class="mono" letter-spacing="1.5">${esc(z.label)}</text>` : ''}</g>`); });
    const series = s.series || [{ pts: s.pts, c: s.c || 'w', at: s.at ?? 0, dur: s.dur || 3 }];
    series.forEach(sr => {
      const pts = sr.pts.map(([x, y]) => [X(x), Y(y)]);
      out.push(`<path d="${pts.map((q, j) => (j ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ')}" fill="none" stroke="${col(sr.c)}" stroke-width="${sr.w || 3}" stroke-linejoin="round" ${sr.dash ? 'stroke-dasharray="8 7"' : ''} pathLength="1"${A(sr.at, sr.d || 0, sr.dash ? 'fade' : 'draw', sr.dur || 3, sr.o)}/>`);
    });
    (s.labels || []).forEach(l => {
      const c = col(l.c); const x = X(l.x), y = Y(l.y), pos = l.pos || 'above', off = l.off || 28, ly = pos === 'above' ? y - off : y + off;
      out.push(`<g${A(l.at, l.d || 0, 'pop', .35, l.o)}><circle cx="${x}" cy="${y}" r="6" fill="#0a1222" stroke="${c}" stroke-width="2.4"/>${lbox(x, ly, l.text, c, 'middle', l.fs || 14)}</g>`);
    });
    (s.texts || []).forEach(t => out.push(`<text x="${X(t.x)}" y="${Y(t.y)}" text-anchor="${t.anchor || 'middle'}" fill="${col(t.c || 'm')}" font-size="${t.fs || 16}" ${t.mono ? 'class="mono"' : ''} font-weight="${t.fw || 500}"${A(t.at, t.d || 0, 'fade', .4, t.o)}>${esc(t.text)}</text>`));
    (s.arrows || []).forEach(a => { const c = col(a.c); const x1 = X(a.x1), y1 = Y(a.y1), x2 = X(a.x2), y2 = Y(a.y2), ang = Math.atan2(y2 - y1, x2 - x1); const h = 13; out.push(`<g${A(a.at, a.d || 0, 'fade', .4, a.o)}><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2.6"/><path d="M${x2 - h * Math.cos(ang - .45)} ${y2 - h * Math.sin(ang - .45)} L${x2} ${y2} L${x2 - h * Math.cos(ang + .45)} ${y2 - h * Math.sin(ang + .45)}" fill="none" stroke="${c}" stroke-width="2.6"/>${a.label ? lbox((x1 + x2) / 2, (y1 + y2) / 2 - 18, a.label, c, 'middle', 13) : ''}</g>`); });
    return out.join('');
  }

  /* ---------- footprint (bid x ask per price, per bar) ---------- */
  function footprint(s, W, H) {
    const cols = s.cols, nC = cols.length, ratio = s.ratio || 3;
    const prices = [...new Set(cols.flatMap(c => c.rows.map(r => r[0])))].sort((a, b) => b - a);
    const top = 70, bottom = 120, left = 120, right = 30, rowH = Math.min(46, (H - top - bottom) / prices.length);
    const colW = (W - left - right) / nC, out = [];
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    prices.forEach((p, j) => out.push(`<text x="${left - 16}" y="${top + j * rowH + rowH / 2 + 6}" text-anchor="end" fill="#56637e" font-size="15" class="mono">${fmt(p)}</text>`));
    cols.forEach((c, ci) => {
      const x0 = left + ci * colW + 10, w = colW - 20; const at = c.at ?? 0, d = c.d ?? ci * .5;
      const rowsByP = {}; c.rows.forEach(r => rowsByP[r[0]] = r);
      const ps = c.rows.map(r => r[0]).sort((a, b) => b - a);
      const hiI = prices.indexOf(ps[0]), loI = prices.indexOf(ps[ps.length - 1]);
      const up = c.c >= c.o; const cc = up ? COL.g : COL.r;
      // body outline from open to close
      const yo = top + prices.indexOf(c.o) * rowH, yc = top + prices.indexOf(c.c) * rowH;
      out.push(`<g${A(at, d, 'fade', .5)}>`);
      out.push(`<rect x="${x0}" y="${top + hiI * rowH}" width="${w}" height="${(loI - hiI + 1) * rowH}" fill="#0c1529" stroke="#1f2d4a" rx="4"/>`);
      out.push(`<rect x="${x0 - 7}" y="${Math.min(yo, yc)}" width="4" height="${Math.abs(yc - yo) + rowH}" fill="${cc}"/>`);
      let maxV = 0, pocP = null; c.rows.forEach(r => { if (r[1] + r[2] > maxV) { maxV = r[1] + r[2]; pocP = r[0]; } });
      let dsum = 0, vsum = 0;
      c.rows.forEach(r => {
        const [p, bid, ask] = r; dsum += ask - bid; vsum += ask + bid; const j = prices.indexOf(p), y = top + j * rowH;
        // diagonal imbalance: ask at p vs bid at p - 1 tick (row below); bid at p vs ask at p + 1 tick (row above)
        const below = rowsByP[prices[j + 1]], above = rowsByP[prices[j - 1]];
        const askImb = below && ask >= ratio * Math.max(1, below[1]) && ask > 0 && s.imb !== false;
        const bidImb = above && bid >= ratio * Math.max(1, above[2]) && bid > 0 && s.imb !== false;
        if (p === pocP && s.poc !== false) out.push(`<rect x="${x0 + 3}" y="${y + 3}" width="${w - 6}" height="${rowH - 6}" fill="none" stroke="#e8b64c" stroke-width="1.5" rx="3"/>`);
        out.push(`<text x="${x0 + w / 2 - 14}" y="${y + rowH / 2 + 6}" text-anchor="end" fill="${bidImb ? COL.r2 : '#c9d3e3'}" font-size="17" font-weight="${bidImb ? 800 : 500}" class="mono">${bid}</text><text x="${x0 + w / 2}" y="${y + rowH / 2 + 6}" text-anchor="middle" fill="#56637e" font-size="15" class="mono">x</text><text x="${x0 + w / 2 + 14}" y="${y + rowH / 2 + 6}" fill="${askImb ? COL.g2 : '#c9d3e3'}" font-size="17" font-weight="${askImb ? 800 : 500}" class="mono">${ask}</text>`);
        if (askImb && s.showImb !== false) out.push(`<rect x="${x0 + w / 2 + 8}" y="${y + 6}" width="${w / 2 - 14}" height="${rowH - 12}" fill="${COL.g}" fill-opacity=".16" rx="3"/>`);
        if (bidImb && s.showImb !== false) out.push(`<rect x="${x0 + 6}" y="${y + 6}" width="${w / 2 - 14}" height="${rowH - 12}" fill="${COL.r}" fill-opacity=".16" rx="3"/>`);
      });
      const by = top + prices.length * rowH + 22;
      out.push(`<text x="${x0 + w / 2}" y="${by}" text-anchor="middle" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="1">${esc(c.label || 'BAR ' + (ci + 1))}</text>`);
      out.push(`<text x="${x0 + w / 2}" y="${by + 30}" text-anchor="middle" fill="${dsum > 0 ? COL.g2 : dsum < 0 ? COL.r2 : COL.m}" font-size="18" font-weight="700" class="mono">Δ ${dsum > 0 ? '+' : ''}${fmt(dsum)}</text>`);
      out.push(`<text x="${x0 + w / 2}" y="${by + 56}" text-anchor="middle" fill="#8e9bb4" font-size="15" class="mono">VOL ${fmt(vsum)}</text>`);
      out.push(`</g>`);
    });
    (s.marks || []).forEach(m => { const ci = m.col, x0 = left + ci * colW + 10, w = colW - 20, j1 = prices.indexOf(m.p1), j2 = prices.indexOf(m.p2); out.push(`<g${A(m.at, m.d || 0, 'pop', .35, m.o)}><rect x="${x0 - 4}" y="${top + Math.min(j1, j2) * rowH - 3}" width="${w + 8}" height="${(Math.abs(j2 - j1) + 1) * rowH + 6}" fill="none" stroke="${col(m.c)}" stroke-width="2.5" rx="5"/>${m.label ? lbox(x0 + w / 2, top + Math.min(j1, j2) * rowH - 18, m.label, col(m.c), 'middle', 13) : ''}</g>`); });
    return out.join('');
  }

  /* ---------- DOM ladder snapshots ---------- */
  function dom(s, W, H) {
    const out = [], top = 80, rowH = Math.min(52, (H - top - 60) / s.prices.length), cx = W / 2, colW = 240;
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    out.push(`<text x="${cx - colW - 60}" y="${top - 14}" text-anchor="middle" fill="${COL.r2}" font-size="15" class="mono" letter-spacing="2">BID QTY</text><text x="${cx}" y="${top - 14}" text-anchor="middle" fill="#8e9bb4" font-size="15" class="mono" letter-spacing="2">PRICE</text><text x="${cx + colW + 60}" y="${top - 14}" text-anchor="middle" fill="${COL.g2}" font-size="15" class="mono" letter-spacing="2">ASK QTY</text>`);
    const maxQ = Math.max(...s.snaps.flatMap(sn => Object.values(sn.q).flat()));
    s.snaps.forEach((sn, k) => {
      const nxt = s.snaps[k + 1]; const g = [];
      s.prices.forEach((p, j) => {
        const y = top + j * rowH, q = sn.q[p] || [0, 0], [b, a] = q;
        const isLast = sn.last === p;
        g.push(`<rect x="${cx - 70}" y="${y + 3}" width="140" height="${rowH - 6}" rx="4" fill="${isLast ? 'rgba(232,182,76,.18)' : '#0e1830'}" stroke="${isLast ? COL.y : '#1f2d4a'}"/><text x="${cx}" y="${y + rowH / 2 + 7}" text-anchor="middle" fill="${isLast ? COL.y : '#eef2f8'}" font-size="20" class="mono" font-weight="600">${fmt(p)}</text>`);
        if (b) { const w = b / maxQ * colW; g.push(`<rect x="${cx - 80 - w}" y="${y + 6}" width="${w}" height="${rowH - 12}" fill="${COL.r}" opacity=".35" rx="3"/><text x="${cx - 92}" y="${y + rowH / 2 + 7}" text-anchor="end" fill="${COL.r2}" font-size="19" class="mono">${b}</text>`); }
        if (a) { const w = a / maxQ * colW; g.push(`<rect x="${cx + 80}" y="${y + 6}" width="${w}" height="${rowH - 12}" fill="${COL.g}" opacity=".35" rx="3"/><text x="${cx + 92}" y="${y + rowH / 2 + 7}" fill="${COL.g2}" font-size="19" class="mono">${a}</text>`); }
      });
      (sn.marks || []).forEach(m => { const j = s.prices.indexOf(m.p), y = top + j * rowH; const x = m.side === 'bid' ? cx - 80 - colW - 10 : cx + 80; g.push(`<rect x="${m.side === 'mid' ? cx - 76 : x}" y="${y}" width="${m.side === 'mid' ? 152 : colW + 10}" height="${rowH}" fill="none" stroke="${col(m.c)}" stroke-width="2.4" rx="5"/>${m.label ? lbox(m.side === 'bid' ? x - 6 : m.side === 'mid' ? cx + 90 : x + colW + 16, y + rowH / 2, m.label, col(m.c), m.side === 'bid' ? 'end' : 'start', 13) : ''}`); });
      if (sn.caption) g.push(`<text x="${cx}" y="${H - 22}" text-anchor="middle" fill="${col(sn.cc || 'y')}" font-size="19" class="mono">${esc(sn.caption)}</text>`);
      out.push(`<g${A(sn.at, sn.d || 0, 'fadeonly', .35, nxt ? nxt.at : undefined)}${nxt ? ` data-od="${nxt.d || 0}"` : ''}>${g.join('')}</g>`);
    });
    return out.join('');
  }

  /* ---------- Time & Sales ---------- */
  function tape(s, W, H) {
    const out = [], top = 90, rowH = 44, xs = [60, 260, 460, 640];
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    ['TIME', 'PRICE', 'SIZE', 'AGGRESSOR*'].forEach((h, j) => out.push(`<text x="${xs[j]}" y="${top - 18}" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${h}</text>`));
    s.rows.forEach((r, j) => {
      const c = r.side === 'B' ? COL.g2 : r.side === 'S' ? COL.r2 : COL.m, y = top + j * rowH;
      out.push(`<g${A(r.at, r.d || 0, 'fade', .25)}><rect x="40" y="${y}" width="${W - 80}" height="${rowH - 6}" rx="4" fill="${r.big ? 'rgba(245,165,36,.10)' : '#0e1830'}" stroke="${r.big ? COL.a : '#1a2742'}"/><text x="${xs[0]}" y="${y + 26}" fill="#c9d3e3" font-size="18" class="mono">${r.time}</text><text x="${xs[1]}" y="${y + 26}" fill="#eef2f8" font-size="18" class="mono">${fmt(r.price)}</text><text x="${xs[2]}" y="${y + 26}" fill="${r.big ? COL.a : '#eef2f8'}" font-size="18" font-weight="${r.big ? 800 : 500}" class="mono">${r.size}</text><text x="${xs[3]}" y="${y + 26}" fill="${c}" font-size="18" class="mono">${r.side === 'B' ? 'BUYER (AT ASK)' : r.side === 'S' ? 'SELLER (AT BID)' : 'UNCLASSIFIED'}</text></g>`);
    });
    out.push(`<text x="40" y="${H - 22}" fill="#56637e" font-size="14" class="mono">${esc(s.foot || '* Aggressor side is inferred by the data provider (e.g. trade price vs. prevailing bid/ask).')}</text>`);
    return out.join('');
  }

  /* ---------- equity curve from R-multiples ---------- */
  function equity(s, W, H) {
    const out = [], pl = 90, pr = 40, pt = 70, pb = 60;
    let eq = [s.start || 0]; s.r.forEach(r => eq.push(eq[eq.length - 1] + r));
    const mn = Math.min(...eq), mx = Math.max(...eq), lo = mn - (mx - mn) * .12, hi = mx + (mx - mn) * .12;
    const X = i => pl + i / (eq.length - 1) * (W - pl - pr), Y = v => pt + (hi - v) / (hi - lo) * (H - pt - pb);
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    const span = hi - lo, step = [1, 2, 5, 10, 20, 25, 50, 100, 1000, 2000, 5000, 10000].find(st => span / st <= 7) || 20000;
    for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) out.push(`<line x1="${pl}" x2="${W - pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="#1a2742"/><text x="${pl - 12}" y="${Y(v) + 5}" text-anchor="end" fill="#56637e" font-size="14" class="mono">${s.unit === 'RM' ? fmt(v) : v + (s.unit || 'R')}</text>`);
    out.push(`<text x="${(W) / 2}" y="${H - 18}" text-anchor="middle" fill="#56637e" font-size="14" class="mono" letter-spacing="2">TRADE NUMBER →</text>`);
    // drawdown
    let pk = 0, best = { dd: 0, p: 0, t: 0 }; for (let i = 0; i < eq.length; i++) { if (eq[i] > eq[pk]) pk = i; if (eq[pk] - eq[i] > best.dd) best = { dd: eq[pk] - eq[i], p: pk, t: i }; }
    if (s.dd !== undefined && best.dd > 0) {
      out.push(`<g${A(s.dd, s.ddd || 0, 'fade', .6)}><rect x="${X(best.p)}" y="${Y(eq[best.p])}" width="${X(best.t) - X(best.p)}" height="${Y(eq[best.t]) - Y(eq[best.p])}" fill="${COL.r}" fill-opacity=".12" stroke="${COL.r}" stroke-opacity=".5" stroke-dasharray="5 5"/>${lbox(X(best.p), Y(eq[best.p]) - 22, 'PEAK ' + (s.unit === 'RM' ? fmt(eq[best.p]) : eq[best.p].toFixed(1) + 'R'), COL.y, 'middle', 13)}${lbox(X(best.t), Y(eq[best.t]) + 24, 'TROUGH ' + (s.unit === 'RM' ? fmt(eq[best.t]) : eq[best.t].toFixed(1) + 'R'), COL.r2, 'middle', 13)}${lbox((X(best.p) + X(best.t)) / 2, (Y(eq[best.p]) + Y(eq[best.t])) / 2, 'MAX DD ' + (s.unit === 'RM' ? fmt(best.dd) : best.dd.toFixed(1) + 'R'), COL.r2, 'middle', 14)}</g>`);
    }
    (s.series2 ? [s.series2] : []).forEach(z => { let e2 = [s.start || 0]; z.r.forEach(r => e2.push(e2[e2.length - 1] + r)); out.push(`<path d="${e2.map((v, i) => (i ? 'L' : 'M') + X(i) + ' ' + Y(v)).join(' ')}" fill="none" stroke="${col(z.c)}" stroke-width="2.5" stroke-dasharray="7 6" pathLength="1"${A(z.at, 0, 'draw', z.dur || 3)}/>${z.label ? lbox(X(e2.length - 1) - 6, Y(e2[e2.length - 1]) + 22, z.label, col(z.c), 'end', 13) : ''}`); });
    out.push(`<path d="${eq.map((v, i) => (i ? 'L' : 'M') + X(i) + ' ' + Y(v)).join(' ')}" fill="none" stroke="${col(s.c || 'c')}" stroke-width="3" pathLength="1"${A(s.at ?? 0, s.d || 0, 'draw', s.dur || 3)}/>`);
    if (s.label) out.push(`<g${A(s.at ?? 0, (s.d || 0) + (s.dur || 3), 'fade', .4)}>${lbox(X(eq.length - 1) - 6, Y(eq[eq.length - 1]) - 22, s.label, col(s.c || 'c'), 'end', 13)}</g>`);
    (s.marks || []).forEach(m => { out.push(`<g${A(m.at, m.d || 0, 'fade', .4)}><line x1="${X(m.i)}" x2="${X(m.i)}" y1="${pt}" y2="${H - pb}" stroke="${col(m.c)}" stroke-dasharray="6 6" stroke-width="1.6"/>${lbox(X(m.i), pt - 8, m.text, col(m.c), 'middle', 13)}</g>`); });
    return out.join('');
  }

  /* ---------- walk-forward / in-out-of-sample timeline ---------- */
  function wf(s, W, H) {
    const out = [], pl = 160, pr = 40, pt = 90, rowH = s.rowH || 64, X = v => pl + v / 100 * (W - pl - pr);
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    (s.axis || []).forEach(a => out.push(`<text x="${X(a[0])}" y="${pt - 22}" text-anchor="middle" fill="#56637e" font-size="14" class="mono">${esc(a[1])}</text><line x1="${X(a[0])}" x2="${X(a[0])}" y1="${pt - 12}" y2="${pt + s.rows.length * rowH}" stroke="#1a2742"/>`));
    s.rows.forEach((r, j) => {
      const y = pt + j * rowH; const g = [`<text x="${pl - 18}" y="${y + rowH / 2 + 6}" text-anchor="end" fill="#c9d3e3" font-size="17" class="mono">${esc(r.label || 'RUN ' + (j + 1))}</text>`];
      (r.segs).forEach(sg => g.push(`<rect x="${X(sg[0])}" y="${y + 10}" width="${X(sg[1]) - X(sg[0])}" height="${rowH - 20}" rx="5" fill="${col(sg[2])}" fill-opacity="${sg[4] ?? .55}" stroke="${col(sg[2])}"/>${sg[3] ? `<text x="${(X(sg[0]) + X(sg[1])) / 2}" y="${y + rowH / 2 + 6}" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" class="mono" letter-spacing="1">${esc(sg[3])}</text>` : ''}`));
      out.push(`<g${A(r.at, r.d || 0, 'growx', .6)}>${g.join('')}</g>`);
    });
    (s.legend || []).forEach((l, j) => out.push(`<g${A(l.at ?? 0, 0)}><rect x="${pl + j * 300}" y="${H - 50}" width="22" height="22" rx="4" fill="${col(l.c)}" fill-opacity=".6" stroke="${col(l.c)}"/><text x="${pl + j * 300 + 34}" y="${H - 33}" fill="#c9d3e3" font-size="17" class="mono">${esc(l.text)}</text></g>`));
    return out.join('');
  }

  /* ---------- horizontal bars ---------- */
  function hbars(s, W, H) {
    const out = [], pl = s.pl || 300, pr = 140, pt = 80, n = s.items.length, rowH = Math.min(78, (H - pt - 40) / n);
    const mx = Math.max(...s.items.map(i => Math.abs(i.v))), hasNeg = s.items.some(i => i.v < 0);
    const zero = hasNeg ? pl + (W - pl - pr) / 2 : pl, sc = (hasNeg ? (W - pl - pr) / 2 : (W - pl - pr)) / mx;
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    if (hasNeg) out.push(`<line x1="${zero}" x2="${zero}" y1="${pt - 10}" y2="${pt + n * rowH}" stroke="#56637e"/>`);
    s.items.forEach((it, j) => {
      const y = pt + j * rowH, w = Math.abs(it.v) * sc, x = it.v >= 0 ? zero : zero - w, c = col(it.c || (it.v >= 0 ? 'g' : 'r'));
      out.push(`<g${A(it.at ?? s.at ?? 0, it.d ?? j * .2, 'fade', .4)}><text x="${pl - 20}" y="${y + rowH / 2 + 7}" text-anchor="end" fill="#c9d3e3" font-size="20">${esc(it.label)}</text><rect x="${x}" y="${y + 12}" width="${w}" height="${rowH - 24}" rx="4" fill="${c}" fill-opacity=".55" stroke="${c}"/><text x="${it.v >= 0 ? x + w + 12 : x - 12}" y="${y + rowH / 2 + 7}" text-anchor="${it.v >= 0 ? 'start' : 'end'}" fill="${c}" font-size="19" font-weight="700" class="mono">${esc(it.text ?? it.v)}</text></g>`);
    });
    return out.join('');
  }

  /* ---------- dashboard tiles ---------- */
  function dash(s, W, H) {
    const out = [], cols = s.cols || 4, gap = 16, pt = 60, tw = (W - 40 - gap * (cols - 1)) / cols, th = s.th || 104;
    if (s.title) out.push(`<text x="22" y="34" fill="#8e9bb4" font-size="14" class="mono" letter-spacing="2">${esc(s.title)}</text>`);
    if (s.tag) out.push(`<text x="${W - 22}" y="34" text-anchor="end" fill="#eef2f8" font-size="14" font-weight="800" letter-spacing="1">${esc(s.tag)}</text>`);
    s.tiles.forEach((t, j) => {
      const x = 20 + (j % cols) * (tw + gap), y = pt + Math.floor(j / cols) * (th + gap);
      out.push(`<g${A(t.at ?? 0, t.d ?? j * .08, 'pop', .35)}><rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="8" fill="#0e1830" stroke="${t.hl ? col(t.hl) : '#1f2d4a'}" stroke-width="${t.hl ? 2 : 1}"/><text x="${x + 18}" y="${y + 30}" fill="#8e9bb4" font-size="13" class="mono" letter-spacing="1.6">${esc(t.k)}</text><text x="${x + 18}" y="${y + 74}" fill="${col(t.c || 'w')}" font-size="${t.fs || 32}" font-weight="800">${esc(t.v)}</text>${t.s ? `<text x="${x + tw - 16}" y="${y + 74}" text-anchor="end" fill="#56637e" font-size="13" class="mono">${esc(t.s)}</text>` : ''}</g>`);
    });
    return out.join('');
  }

  function render(spec, W, H) {
    switch (spec.type) {
      case 'candles': return candleChart(spec, W, H).svg;
      case 'lines': return lines(spec, W, H);
      case 'footprint': return footprint(spec, W, H);
      case 'dom': return dom(spec, W, H);
      case 'tape': return tape(spec, W, H);
      case 'equity': return equity(spec, W, H);
      case 'wf': return wf(spec, W, H);
      case 'hbars': return hbars(spec, W, H);
      case 'dash': return dash(spec, W, H);
      default: return '';
    }
  }
  G.CH = { render, genCandles, profile, candleChart, A, fmt, col, esc, lbox };
})(typeof window !== 'undefined' ? window : globalThis);
