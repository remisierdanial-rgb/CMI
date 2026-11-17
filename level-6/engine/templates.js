/* Reusable scene templates (same visual grammar as Video 01).
 * Timing helper: at(L, k, off) -> L[k] + off. Items use [lineIndex, offsetSeconds]. */
(function () {
  const { C, P, fmt, tag, txt, dot, chart, ovl, side, chk } = E;
  const at = (L, a) => Array.isArray(a) ? L[a[0]] + (a[1] || 0) : a;
  const T = {};

  /* Title scene with objectives + schematic panel */
  T.title = o => ({
    label: 'INTRODUCTION', lines: o.lines,
    draw(t, L) {
      const ob = o.objectives.map((s, k) => chk(60, 462 + k * 48, s, P(t, L[o.objAt ?? 1] + k * 1.1, .5))).join('');
      return `<div class="kickg" style="left:60px;top:150px">VIDEO ${o.no} · LEVEL 6 · ${o.sub}</div>
        <div class="h1" style="left:60px;top:180px">${o.title}</div>
        <div class="h1s" style="left:60px;top:268px">${o.tagline}</div>
        <div class="gbar" style="left:60px;top:322px;width:${230 * P(t, .3, .8)}px"></div>
        <div class="kicky" style="left:60px;top:420px;opacity:${P(t, L[o.objAt ?? 1], .5)}">LEARNING OBJECTIVES</div>${ob}
        <div class="panel" style="left:1100px;top:370px;width:740px;height:420px"></div>
        <div class="ctitle" style="left:1124px;top:388px">SCHEMATIC · NOT TO SCALE</div>
        <svg class="a" style="left:0;top:0" width="1920" height="1080">${o.illus ? o.illus(t, L) : ''}</svg>`;
    }
  });

  /* Chart (left, 1310 wide) + side panel (right) */
  T.chart = o => ({
    label: o.label, lines: o.lines, lead: o.lead,
    draw(t, L, G) {
      const c = o.chart, ctx = { t, L, at: a => at(L, a), p: (a, d = .6) => P(t, at(L, a), d) };
      const n = c.n ? (typeof c.n === 'function' ? c.n(ctx) : c.n) : 3 + (c.data.length - 3) * P(t, at(L, c.reveal || [0, .3]), c.revealDur || 5);
      const left = chart({
        x: 36, y: 100, w: o.full ? 1848 : 1310, h: 760, data: typeof c.data === 'function' ? c.data(ctx) : c.data,
        pmin: c.pmin, pmax: c.pmax, step: c.step, slots: c.slots, n, dim: c.dim && (i => c.dim(i, ctx)),
        title: c.title || 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', tagTxt: typeof c.tag === 'function' ? c.tag(ctx) : (c.tag || ''),
        under: c.under && (S => c.under(S, ctx)), ov: c.ov && (S => c.ov(S, ctx))
      });
      if (o.full) return left + (o.extra ? o.extra(ctx) : '');
      const s = o.side;
      return left + side({
        x: 1368, y: 100, w: 516, h: 760, kicker: s.kicker, title: s.title,
        items: s.items.map(it => ({ t0: at(L, it[0]), s: it[1], c: it[2] })),
        foot: s.foot ? s.foot(ctx) : ''
      }, t) + (o.extra ? o.extra(ctx) : '');
    }
  });

  /* Two charts side by side (bullish vs bearish, valid vs invalid) */
  T.two = o => ({
    label: o.label, lines: o.lines,
    draw(t, L) {
      const ctx = { t, L, at: a => at(L, a), p: (a, d = .6) => P(t, at(L, a), d) };
      const mk = (c, x) => {
        if (c.show && t < at(L, c.show)) return `<div class="panel" style="left:${x}px;top:100px;width:918px;height:${o.h || 760}px"></div>`;
        const n = 3 + (c.data.length - 3) * P(t, at(L, c.reveal || [0, .3]), c.revealDur || 4.5);
        return chart({
          x, y: 100, w: 918, h: o.h || 760, data: c.data, pmin: c.pmin, pmax: c.pmax, step: c.step, slots: c.slots, n,
          title: c.title, tagTxt: c.tag, under: c.under && (S => c.under(S, ctx)), ov: c.ov && (S => c.ov(S, ctx)),
          op: c.show ? P(t, at(L, c.show), .5) : 1
        });
      };
      return mk(o.a, 36) + mk(o.b, 966) + (o.extra ? o.extra(ctx) : '');
    }
  });

  /* Free layout: kicker + title + cards */
  T.cards = o => ({
    label: o.label, lines: o.lines,
    draw(t, L) {
      const ctx = { t, L, at: a => at(L, a), p: (a, d = .5) => P(t, at(L, a), d) };
      const cards = (o.cards || []).map(c => {
        const a = P(t, at(L, c.at), .5);
        const col = c.col || '#1b2442';
        return `<div class="card" style="left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h}px;opacity:${a};border-color:${col};transform:translateY(${(1 - a) * 10}px)">
          ${c.kick ? `<div class="a mono" style="left:28px;top:24px;font-size:16px;color:${c.kc || C.gold};letter-spacing:2px">${c.kick}</div>` : ''}
          ${c.head ? `<div class="a" style="left:28px;top:${c.kick ? 54 : 26}px;width:${c.w - 56}px;font-size:${c.hs || 28}px;font-weight:700;line-height:1.2">${c.head}</div>` : ''}
          ${c.body ? `<div class="a" style="left:28px;top:${c.by || 110}px;width:${c.w - 56}px;font-size:${c.bs || 21}px;line-height:1.38;color:#c7cede">${c.body}</div>` : ''}
          ${c.html ? c.html(ctx) : ''}</div>`;
      }).join('');
      const warn = o.warn ? `<div class="warn" style="left:60px;top:${o.warn.y || 760}px;width:1800px;opacity:${P(t, at(L, o.warn.at), .5)}">${o.warn.s}</div>` : '';
      return `<div class="kicky" style="left:60px;top:110px">${o.kicker}</div>
        <div class="h2" style="left:60px;top:140px">${o.title}</div>${cards}${warn}${o.extra ? o.extra(ctx) : ''}`;
    }
  });

  /* Mistakes list: red crosses with short explanation */
  T.mistakes = o => T.cards({
    label: o.label || 'COMMON MISTAKES', kicker: o.kicker, title: o.title || 'Common mistakes', lines: o.lines,
    cards: o.items.map((m, k) => ({
      x: 60 + (k % 2) * 910, y: 210 + Math.floor(k / 2) * (o.rowH || 150), w: 890, h: (o.rowH || 150) - 18, at: m[0], col: '#3a2030',
      html: () => `<div class="a" style="left:26px;top:26px">${E.crossSvg()}</div>
        <div class="a" style="left:66px;top:22px;width:790px;font-size:25px;font-weight:700">${m[1]}</div>
        <div class="a" style="left:66px;top:60px;width:790px;font-size:19px;line-height:1.35;color:#9aa4b8">${m[2]}</div>`
    })),
    warn: o.warn
  });

  T.summary = o => ({
    label: 'SUMMARY', lines: o.lines,
    draw(t, L) {
      return `<div class="kickg" style="left:60px;top:110px">KEY LEARNING POINTS</div>
        <div class="h2" style="left:60px;top:140px">${o.title} — what to remember</div>
        ${o.items.map((x, k) => chk(60 + (k % 2) * 900, 240 + Math.floor(k / 2) * 70, x[1], P(t, at(L, x[0]), .5), true, 27)).join('')}`;
    }
  });

  /* Knowledge check: qs = [[qEN, aEN, qBM, aBM, qSayEN?, aSayEN?]] */
  T.quiz = (qs, gap = 5) => {
    const lines = [['Sekarang, uji kefahaman anda. Hentikan video seketika dan jawab setiap soalan.', 'Now, test your understanding. Pause the video and answer each question.']];
    const nums = ['satu', 'dua', 'tiga', 'empat', 'lima'], en = ['one', 'two', 'three', 'four', 'five'];
    qs.forEach((q, k) => {
      lines.push([`Soalan ${nums[k]}: ${q[2]}`, `Question ${en[k]}: ${q[4] || q[0]}`, { gap }]);
      lines.push([`Jawapan: ${q[3]}`, `Answer: ${q[5] || q[1]}`]);
    });
    return {
      label: 'KNOWLEDGE CHECK', lines,
      draw(t, L, G) {
        let q = 0; qs.forEach((_, k) => { if (t >= L[1 + k * 2]) q = k; });
        const qi = 1 + q * 2, a = P(t, L[qi], .5), ans = P(t, L[qi + 1], .5), g0 = G[qi];
        const inGap = t >= g0 && t < g0 + gap, cd = Math.ceil(g0 + gap - t), ring = inGap ? (t - g0) / gap : 0;
        return `<div class="kicky" style="left:60px;top:110px">KNOWLEDGE CHECK · ${q + 1} / ${qs.length}</div>
        <div class="h2" style="left:60px;top:140px">Test your understanding</div>
        <div class="card" style="left:60px;top:230px;width:1800px;height:230px;opacity:${a}">
          <div class="a mono" style="left:34px;top:30px;font-size:18px;color:#d7b256;letter-spacing:2px">QUESTION ${q + 1}</div>
          <div class="a" style="left:34px;top:72px;width:1520px;font-size:36px;font-weight:700;line-height:1.25">${qs[q][0]}</div>
          <svg class="a" style="left:1660px;top:50px;opacity:${inGap ? 1 : 0}" width="120" height="120"><circle cx="60" cy="60" r="48" stroke="#1b2442" stroke-width="7" fill="none"/>
            <circle cx="60" cy="60" r="48" stroke="#d7b256" stroke-width="7" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${ring}" transform="rotate(-90 60 60)"/>
            <text x="60" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="36" fill="#fff" font-weight="600">${inGap ? cd : ''}</text></svg>
          <div class="a mono" style="left:1630px;top:180px;font-size:14px;color:#8a93a8;letter-spacing:2px;opacity:${inGap ? 1 : 0}">PAUSE &amp; ANSWER</div></div>
        <div class="card" style="left:60px;top:490px;width:1800px;height:230px;opacity:${ans};border-color:#25a198">
          <div class="a mono" style="left:34px;top:30px;font-size:18px;color:#25a198;letter-spacing:2px">ANSWER &amp; EXPLANATION</div>
          <div class="a" style="left:34px;top:70px;width:1720px;font-size:29px;line-height:1.34;color:#e8ecf4">${qs[q][1]}</div></div>`;
      }
    };
  };

  /* Practical exercise card */
  T.exercise = o => T.cards({
    label: 'PRACTICAL EXERCISE', kicker: 'PRACTICAL EXERCISE · LATIHAN', title: o.title, lines: o.lines,
    cards: o.steps.map((s, k) => ({
      x: 60, y: 210 + k * 100, w: 1800, h: 84, at: s[0],
      html: () => `<div class="a mono" style="left:26px;top:24px;font-size:22px;color:#d7b256">${String(k + 1).padStart(2, '0')}</div>
        <div class="a" style="left:86px;top:24px;font-size:26px;font-weight:600">${s[1]}</div>`
    })),
    warn: o.warn
  });

  T.next = o => ({
    label: 'NEXT · ' + o.short.toUpperCase(), lines: o.lines,
    draw(t, L) {
      return `<div class="kickg" style="left:60px;top:110px">UP NEXT · ${o.kicker}</div>
        <div class="h2" style="left:60px;top:140px">${o.title}</div>
        <div class="card" style="left:360px;top:250px;width:1200px;height:440px">${o.html ? o.html(t, L) : ''}</div>
        <div class="card" style="left:760px;top:730px;width:400px;height:66px;border-color:#d7b256;opacity:${P(t, L[0] + 1, .5)}">
          <div class="a mono" style="left:20px;top:10px;font-size:13px;color:#d7b256;letter-spacing:2px">NEXT · VIDEO ${o.no}</div>
          <div class="a" style="left:20px;top:30px;font-size:22px;font-weight:700">${o.short}</div></div>`;
    }
  });

  T.REFS = {
    ict: ['Michael J. Huddleston (ICT) — ICT educational material', 'ICT terminology · episode titles to be verified'],
    murphy: ['John J. Murphy — Technical Analysis of the Financial Markets (1999)', 'NYIF · price structure'],
    harris: ['Larry Harris — Trading and Exchanges (2003)', 'Oxford University Press · microstructure'],
    emb: ['Edwards, Magee &amp; Bassetti — Technical Analysis of Stock Trends', 'Chart analysis · edition to be verified']
  };
  T.refs = (keys, noteBM, noteEN, note) => ({
    label: 'REFERENCES',
    lines: [['Rujukan untuk video ini dipaparkan di skrin.', 'The references for this video are shown on screen.'], [noteBM, noteEN]],
    draw(t, L) {
      return `<div class="kickg" style="left:60px;top:110px">REFERENCES · RUJUKAN</div>
        <div class="h2" style="left:60px;top:140px">Primary reading for this video</div>
        ${keys.map((k, i) => { const r = T.REFS[k], a = P(t, .4 + i * .5, .5); return `<div class="row" style="left:60px;top:${230 + i * 84}px;width:1800px;height:70px;opacity:${a}">
          <div class="n">${String(i + 1).padStart(2, '0')}</div><div class="t" style="top:20px">${r[0]}</div><div class="v" style="font-size:15px">${r[1].toUpperCase()}</div></div>`; }).join('')}
        <div class="warn" style="left:60px;top:${250 + keys.length * 84}px;width:1800px;opacity:${P(t, L[1], .5)}"><b>Note:</b> ${note}</div>`;
    }
  });

  T.disclaimer = (nextNo, nextTitle) => ({
    label: 'DISCLAIMER', tail: 1.6,
    lines: [
      ['Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Semua harga FCPO dalam video ini ialah ilustrasi.',
        'For educational purposes only. Not financial advice or a guarantee of profit. All FCPO prices in this video are illustrative.'],
      nextNo ? [`Trading futures melibatkan risiko kerugian. Jumpa dalam Video ${+nextNo}.`, `Futures trading involves the risk of loss. See you in Video ${+nextNo}.`]
        : ['Trading futures melibatkan risiko kerugian. Tahniah kerana melengkapkan Level 6.', 'Futures trading involves the risk of loss. Congratulations on completing Level 6.']
    ],
    draw() {
      return `<div class="card" style="left:610px;top:300px;width:700px;height:300px;border-color:#d7b256">
          <svg class="a" style="left:330px;top:34px" width="40" height="36"><path d="M20 3 L37 33 H3 Z" fill="none" stroke="#d7b256" stroke-width="2.4" stroke-linejoin="round"/><line x1="20" y1="14" x2="20" y2="23" stroke="#d7b256" stroke-width="2.6"/><circle cx="20" cy="28" r="1.8" fill="#d7b256"/></svg>
          <div class="a mono" style="left:0;width:700px;text-align:center;top:86px;font-size:15px;color:#d7b256;letter-spacing:2.6px">PENAFIAN · DISCLAIMER</div>
          <div class="a" style="left:50px;width:600px;text-align:center;top:122px;font-size:23px;line-height:1.4;color:#e8ecf4">Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian.</div>
          <div class="a" style="left:0;width:700px;text-align:center;top:244px;font-size:16px;color:#8a93a8">Semua harga FCPO dalam video ini ialah ilustrasi pembelajaran.</div></div>
        <div class="a" style="left:0;width:1920px;text-align:center;top:630px;font-size:19px;color:#8a93a8">${nextNo ? `Seterusnya: Video ${nextNo} — ${nextTitle}` : 'Tamat Level 6 · Seterusnya: Level 7 — Advanced ICT Concepts'}</div>`;
    }
  });

  /* Common chart overlays */
  T.rangeOv = (S, hi, lo, i0, pr, o = {}) => {
    const eq = (hi + lo) / 2;
    return ovl.hl(S, hi, i0, o.i1 ?? null, o.hc || C.mute, { prog: pr, w: 1.4 }) + ovl.hl(S, lo, i0, o.i1 ?? null, o.lc || C.mute, { prog: pr, w: 1.4 }) +
      (o.noEq ? '' : ovl.hl(S, eq, i0, o.i1 ?? null, C.amber, { prog: pr, dash: '8 6', w: 2 }) +
        tag(S.x1 - 8, S.ys(eq) - 20, 'EQ ' + fmt(eq), C.amber, { anchor: 'end', op: pr, fs: 14 })) +
      tag(S.x1 - 8, S.ys(hi) - 20, (o.hl || 'RANGE HIGH ') + fmt(hi), C.mute, { anchor: 'end', op: pr, fs: 14 }) +
      tag(S.x1 - 8, S.ys(lo) + 22, (o.ll || 'RANGE LOW ') + fmt(lo), C.mute, { anchor: 'end', op: pr, fs: 14 });
  };
  T.pdZones = (S, hi, lo, i0, a, o = {}) => {
    const eq = (hi + lo) / 2;
    return ovl.zone(S, eq, hi, i0, o.i1 ?? null, C.purple, { alpha: .16, op: a }) + ovl.zone(S, lo, eq, i0, o.i1 ?? null, C.purple, { alpha: .06, op: a }) +
      (o.noLabel ? '' : txt(S.x1 - 12, S.ys((eq + hi) / 2) + 6, 'PREMIUM', { anchor: 'end', col: C.purple, fs: 17, fw: 700, ls: 2, op: a }) +
        txt(S.x1 - 12, S.ys((eq + lo) / 2) + 6, 'DISCOUNT', { anchor: 'end', col: C.purple, fs: 17, fw: 700, ls: 2, op: a }));
  };
  // Fibonacci retracement levels for a leg (convention: 0 at leg end, 1 at leg start)
  T.fib = (start, end, r) => end - r * (end - start);
  T.fibOv = (S, start, end, i0, i1, a, levels = [0, .5, .62, .705, .79, 1], o = {}) => {
    let g = ovl.zone(S, T.fib(start, end, .62), T.fib(start, end, .79), i0, i1, C.amber, { alpha: .14, op: a });
    levels.forEach(r => {
      const p = T.fib(start, end, r), main = r === .62 || r === .79 || r === .705;
      g += ovl.hl(S, p, i0, i1, C.amber, { op: a * (main ? 1 : .6), w: r === .705 ? 1.4 : 1.6, dash: r === .705 ? '4 5' : null });
      g += txt(S.xs(i1) + 8, S.ys(p) + 6, `${r === 0 ? '0' : r === 1 ? '1' : r} · ${fmt(Math.round(p * 10) / 10)}`, { col: C.amber, fs: 14, op: a, ls: 0 });
    });
    if (!o.noLabel) g += tag(S.xs(i0) - 6, S.ys(T.fib(start, end, .705)), 'OTE 62–79%', C.amber, { anchor: 'end', op: a, fs: 14 });
    return g;
  };
  T.at = at;
  window.T = T;
})();

/* Candle patch helper: rows of [o|null, h, l, c]. Explicit o also resets previous close. */
T.patch = (d, i, rows) => {
  rows.forEach((r, k) => {
    let o = r[0];
    if (o == null || o === 0) o = k === 0 ? d[i - 1].c : rows[k - 1][3];
    else if (k === 0 && d[i - 1]) { const p = d[i - 1]; p.c = o; p.h = Math.max(p.h, o, p.o); p.l = Math.min(p.l, o, p.o); }
    d[i + k] = { o, h: Math.max(r[1], o, r[3]), l: Math.min(r[2], o, r[3]), c: r[3] };
  });
  const nx = d[i + rows.length]; if (nx) { nx.o = rows[rows.length - 1][3]; nx.h = Math.max(nx.h, nx.o); nx.l = Math.min(nx.l, nx.o); }
  return d;
};
