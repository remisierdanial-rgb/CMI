/* CMI L10 — scene engine. window.seek(t) renders the frame for time t deterministically and
   returns a state key; identical keys mean identical pixels (renderer reuses the previous frame). */
(function () {
  const { A, render: viz, esc } = window.CH;
  const EP = window.EPISODE, TL = window.TIMELINE;
  const $ = s => document.querySelector(s);
  const CC = { g: 'gold', y: 'gold', gr: 'green2', r: 'red2', c: 'cyan', m: 'muted', a: 'amber', p: 'violet', w: 'text' };
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\{(g|gr|r|c|m|a|y|p|w)\}(.+?)\{\/\}/g, (_, c, t) => `<span style="color:var(--${CC[c]})">${t}</span>`);
  const mdc = md;

  /* ---------- header ---------- */
  $('#hl1').textContent = 'LEVEL 10 · PROFESSIONAL APPLICATION';
  $('#hl2').textContent = 'SMART MONEY CONCEPT';
  $('#hr1').textContent = `VIDEO ${EP.num} — ${EP.short.toUpperCase()}`;

  /* ---------- helpers ---------- */
  const item = (x, at, d) => (Array.isArray(x) ? x : [at ?? 0, x]);
  function infoPanel(inf, x, y, w, h) {
    if (!inf) return '';
    const lis = (inf.b || []).map((b, j) => { const [at, t, cls] = Array.isArray(b) ? b : [0, b]; return `<li class="${cls || ''}"${A(at, 0)}>${md(t)}</li>`; }).join('');
    const notes = (inf.notes || (inf.note ? [inf.note] : [])).map(n => `<div class="note ${n.c || ''}" style="margin-top:14px"${A(n.at ?? 0, n.d || 0)}>${n.label ? `<b>${esc(n.label)}:</b> ` : ''}${md(n.text)}</div>`).join('');
    return `<div class="panel info" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"${A(inf.at ?? 0, 0)}>
      <div class="kicker ${inf.kc || ''}">${esc(inf.k || '')}</div><div class="ih">${md(inf.h || '')}</div><ul>${lis}</ul>${notes}</div>`;
  }
  function vizPanel(spec, x, y, w, h, at) {
    return `<div class="panel" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"${A(at ?? 0, 0)}><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0">${viz(spec, w, h)}</svg></div>`;
  }
  function calcLines(calc, x, y, w) {
    return (calc || []).map((c, j) => { const [at, t, d] = c; return `<div class="calc abs" style="left:${x}px;top:${y + j * 42}px;width:${w}px"${A(at, d || 0)}>${mdc(t)}</div>`; }).join('');
  }

  /* ---------- templates ---------- */
  const T = {
    title(s) {
      const obj = (s.obj || []).map((o, j) => { const [at, t] = item(o); return `<div class="chk" style="position:relative;margin:0 0 12px;font-size:23px"${A(at, 0)}>${md(t)}</div>`; }).join('');
      return `<div class="abs" style="left:120px;top:120px;width:1000px"${A(0, 0)}>
        <div class="kicker">${esc(s.kicker)}</div>
        <div class="h1" style="margin-top:22px;font-size:62px">${md(s.h)}</div>
        <div class="sub" style="margin-top:16px">${md(s.sub || '')}</div>
        <div style="width:120px;height:3px;background:var(--gold);margin-top:26px"></div></div>
        ${obj ? `<div class="abs" style="left:120px;top:470px;width:980px"><div class="kicker" style="color:var(--muted);font-size:14px;margin-bottom:18px"${A(s.objAt ?? 1, 0)}>LEARNING OBJECTIVES</div>${obj}</div>` : ''}
        ${s.viz ? vizPanel(s.viz, 1170, 150, 640, 520, s.vizAt ?? 0) : ''}`;
    },
    roadmap(s) {
      const rows = s.rows, rh = s.rh || 88, gap = s.gap || 12, top = s.top || 190, w = s.w || 1380;
      const html = rows.map((r, j) => `<div class="rrow ${r.on ? 'on' : ''}" style="left:120px;top:${top + j * (rh + gap)}px;width:${w}px;height:${rh}px"${A(r.at ?? 0, r.d ?? j * .12)}>
        <div class="rn" style="top:${(rh - 40) / 2}px">${r.n}</div><div class="rt" style="top:${rh / 2 - 31}px;font-size:${s.fs || 25}px">${md(r.t)}</div><div class="rs" style="top:${rh / 2 + 4}px">${md(r.s || '')}</div><div class="rk" style="top:${rh / 2 - 9}px">${esc(r.k || '')}</div></div>
        ${r.on ? `<div class="here" style="left:${120 + w + 16}px;top:${top + j * (rh + gap) + rh / 2 - 19}px"${A(r.hereAt ?? r.at ?? 0, .4, 'pop')}>YOU ARE HERE</div>` : ''}`).join('');
      const side = s.side ? `<div class="card" style="left:${s.side.x || 1500}px;top:${s.side.y || 520}px;width:${s.side.w || 380}px;border-color:var(--violet)"${A(s.side.at, 0)}><div class="kicker p" style="font-size:15px">${esc(s.side.k)}</div><div class="h3" style="margin-top:14px">${md(s.side.h)}</div><div style="margin-top:18px;display:flex;flex-wrap:wrap;gap:12px">${(s.side.chips || []).map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div></div>` : '';
      return `<div class="abs" style="left:120px;top:50px"${A(0, 0)}><div class="kicker">${esc(s.kicker)}</div><div class="h2" style="margin-top:10px">${md(s.h)}</div></div>${html}${side}`;
    },
    viz(s) {
      const hasInfo = !!s.info, vw = hasInfo ? (s.vw || 1290) : 1872, vh = s.calc ? (s.vh || 640) : (s.vh || 790);
      const calcH = (s.calc || []).length;
      return vizPanel(s.viz, 24, 20, vw, vh) + (hasInfo ? infoPanel(s.info, 24 + vw + 16, 20, 1872 - vw - 16, s.ih || 790) : '') +
        calcLines(s.calc, 24, 20 + vh + 26, vw);
    },
    split(s) {
      const gap = 16, w = (1872 - gap) / 2, vh = s.calc ? (s.vh || 600) : (s.vh || 790);
      return vizPanel(s.a, 24, 20, w, vh, s.aAt ?? 0) + vizPanel(s.b, 24 + w + gap, 20, w, vh, s.bAt ?? 0) +
        (s.calc ? calcLines(s.calc, 24, 20 + vh + 30, 1872) : '');
    },
    cards(s) {
      const n = s.cards.length, cols = s.cols || Math.min(n, 4), rows = Math.ceil(n / cols), gap = 22, x0 = s.x0 || 120, W = s.w || 1680;
      const cw = (W - gap * (cols - 1)) / cols, top = s.top || 210, ch = s.ch || Math.min(320, (700 - top + 120 - gap * (rows - 1)) / rows + 60);
      const cards = s.cards.map((c, j) => `<div class="card ${c.hl ? 'hl' : ''}" style="left:${x0 + (j % cols) * (cw + gap)}px;top:${top + Math.floor(j / cols) * (ch + gap)}px;width:${cw}px;height:${ch}px;${c.bc ? `border-color:var(--${c.bc})` : ''}"${A(c.at ?? 0, c.d ?? 0)}>
        ${c.n ? `<div class="num" style="${c.nc ? `color:var(--${c.nc})` : ''}">${esc(c.n)}</div>` : ''}<div class="ct">${md(c.t)}</div><div class="cb">${md(c.b || '')}</div>${c.foot ? `<div class="mono" style="position:absolute;left:26px;bottom:20px;font-size:17px;color:var(--${c.fc || 'gold'})">${md(c.foot)}</div>` : ''}</div>`).join('');
      return `<div class="abs" style="left:${x0}px;top:50px;width:1700px"${A(0, 0)}><div class="kicker ${s.kc || ''}">${esc(s.kicker || '')}</div><div class="h2" style="margin-top:10px">${md(s.h)}</div>${s.sub ? `<div class="sub" style="margin-top:8px">${md(s.sub)}</div>` : ''}</div>${cards}
        ${s.note ? `<div class="note ${s.note.c || ''} abs" style="left:${x0}px;top:${s.note.y || 740}px;width:${W}px;font-size:21px"${A(s.note.at, 0)}>${s.note.label ? `<b>${esc(s.note.label)}:</b> ` : ''}${md(s.note.text)}</div>` : ''}`;
    },
    table(s) {
      const head = `<tr>${s.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr>`;
      const rows = s.rows.map((r, j) => { const [at, ...cells] = r; return `<tr${A(at, 0)}>${cells.map((c, k) => `<td class="${k === cells.length - 1 && s.warnLast ? 'warn' : ''}" style="${s.widths ? `width:${s.widths[k]}px` : ''}">${md(c)}</td>`).join('')}</tr>`; }).join('');
      return `<div class="abs" style="left:120px;top:40px;width:1700px"${A(0, 0)}><div class="kicker ${s.kc || ''}">${esc(s.kicker || '')}</div><div class="h2" style="margin-top:10px;font-size:${s.hs || 40}px">${md(s.h)}</div></div>
        <table class="t" style="left:110px;top:${s.top || 150}px;width:1700px;${s.fs ? `font-size:${s.fs}px` : ''}"><thead${A(0, 0)}>${head}</thead><tbody>${rows}</tbody></table>
        ${s.note ? `<div class="note ${s.note.c || ''} abs" style="left:120px;top:${s.note.y || 740}px;width:1680px;font-size:21px"${A(s.note.at, 0)}>${s.note.label ? `<b>${esc(s.note.label)}:</b> ` : ''}${md(s.note.text)}</div>` : ''}`;
    },
    flow(s) {
      const steps = s.steps, n = steps.length, cols = s.cols || 1, perCol = Math.ceil(n / cols), colW = s.cw || (cols === 1 ? 900 : (1700 - 40 * (cols - 1)) / cols);
      const top = s.top || 160, sh = s.sh || Math.min(86, (740 - top + 60) / perCol - 10);
      const html = steps.map((st, j) => { const ci = Math.floor(j / perCol), ri = j % perCol, x = (s.x0 || 120) + ci * (colW + 40), y = top + ri * (sh + 10);
        return `<div class="fstep" style="left:${x}px;top:${y}px;width:${colW}px;height:${sh}px;${st.hl ? `border-color:var(--${st.hl});box-shadow:0 0 0 1px var(--${st.hl}) inset` : ''}"${A(st.at ?? 0, st.d ?? 0)}><div style="display:flex;align-items:baseline;gap:16px"><span class="fn">${String(j + 1).padStart(2, '0')}</span><span class="ft" style="${st.c ? `color:var(--${st.c})` : ''}">${md(st.t)}</span></div>${st.s ? `<div class="fs" style="margin-left:44px">${md(st.s)}</div>` : ''}</div>`; }).join('');
      return `<div class="abs" style="left:${s.x0 || 120}px;top:44px;width:1700px"${A(0, 0)}><div class="kicker ${s.kc || ''}">${esc(s.kicker || '')}</div><div class="h2" style="margin-top:10px">${md(s.h)}</div></div>${html}
        ${s.side ? `<div class="note ${s.side.c || ''} abs" style="left:${s.side.x || 1120}px;top:${s.side.y || 200}px;width:${s.side.w || 680}px;font-size:22px"${A(s.side.at, 0)}>${s.side.label ? `<b>${esc(s.side.label)}:</b> ` : ''}${md(s.side.text)}</div>` : ''}`;
    },
    formula(s) {
      const lines = (s.lines || []).map((l, j) => { const [at, t, cls] = l; return `<div class="calc" style="text-align:${s.align || 'left'};font-size:${s.fs || 32}px;margin:0 0 20px;${cls === 'big' ? 'font-size:44px;font-weight:700' : ''}"${A(at, 0)}>${mdc(t)}</div>`; }).join('');
      return `<div class="abs" style="left:120px;top:50px;width:1700px"${A(0, 0)}><div class="kicker ${s.kc || ''}">${esc(s.kicker || '')}</div><div class="h2" style="margin-top:10px">${md(s.h)}</div></div>
        <div class="panel" style="left:110px;top:170px;width:${s.viz ? 960 : 1700}px;height:${s.ph || 560}px;padding:44px 50px"${A(0, 0)}>${lines}</div>
        ${s.viz ? vizPanel(s.viz, 1090, 170, 720, s.ph || 560, s.vizAt ?? 0) : ''}
        ${s.note ? `<div class="note ${s.note.c || ''} abs" style="left:110px;top:${(s.ph || 560) + 195}px;width:1700px;font-size:21px"${A(s.note.at, 0)}>${s.note.label ? `<b>${esc(s.note.label)}:</b> ` : ''}${md(s.note.text)}</div>` : ''}`;
    },
    history(s) {
      const bl = (s.b || []).map(b => { const [at, t] = b; return `<li${A(at, 0)}>${md(t)}</li>`; }).join('');
      return `<div class="abs" style="left:120px;top:40px;font:800 72px Inter;color:${s.yc ? 'var(--gold)' : 'var(--text)'}"${A(0, 0)}>${esc(s.year)}</div>
        <div class="abs" style="left:120px;top:150px;width:300px;height:420px;border:1px solid var(--line2);border-left:6px solid ${s.bookc || 'var(--gold)'};border-radius:6px;background:linear-gradient(160deg,#16244a,#0d1730);padding:24px"${A(0, .2)}>
          <div class="mono" style="font-size:14px;color:var(--muted)">${esc(s.bookYear || s.year)}</div><div style="font:700 26px/1.25 Inter;margin-top:16px">${md(s.book)}</div>
          <div style="position:absolute;left:24px;bottom:24px;width:220px"><div style="width:50px;height:2px;background:var(--gold);margin-bottom:10px"></div><div style="font:500 16px Inter;color:var(--soft)">${esc(s.author)}</div></div></div>
        <div class="abs info" style="left:470px;top:150px;width:1300px;padding:0"><div class="kicker" style="font-size:14px">${esc(s.kicker)}</div><div class="ih" style="font-size:36px">${md(s.h)}</div><ul>${bl}</ul>
        ${s.note ? `<div class="note ${s.note.c || ''}" style="margin-top:24px;width:1100px"${A(s.note.at, 0)}>${s.note.label ? `<b>${esc(s.note.label)}:</b> ` : ''}${md(s.note.text)}</div>` : ''}</div>`;
    },
    summary(s) {
      const half = Math.ceil(s.items.length / 2);
      const it = s.items.map((x, j) => { const [at, t, cls] = x; const col = j < half ? 0 : 1, row = j < half ? j : j - half; return `<div class="chk ${cls || ''}" style="left:${120 + col * 860}px;top:${200 + row * 70}px;width:800px"${A(at, 0)}>${md(t)}</div>`; }).join('');
      return `<div class="abs" style="left:120px;top:50px;width:1700px"${A(0, 0)}><div class="kicker">${esc(s.kicker || 'KEY LEARNING POINTS')}</div><div class="h2" style="margin-top:10px">${md(s.h)}</div></div>${it}`;
    },
    quiz(s) {
      const opts = (s.opts || []).map((o, j) => `<div class="card" style="left:120px;top:${300 + j * 92}px;width:1100px;height:78px;padding:20px 26px;${j === s.ans ? '' : ''}"${A(0, .3 + j * .15)}><span class="mono" style="color:var(--gold);font-size:22px;margin-right:18px">${'ABCD'[j]}</span><span style="font-size:23px">${md(o)}</span></div>
        ${j === s.ans ? `<div class="abs" style="left:116px;top:${296 + j * 92}px;width:1108px;height:86px;border:3px solid var(--green);border-radius:12px"${A(s.ansAt ?? 1, 0, 'pop')}></div>` : ''}`).join('');
      return `<div class="abs" style="left:120px;top:50px;width:1700px"${A(0, 0)}><div class="kicker">${esc(s.kicker || 'KNOWLEDGE CHECK')}</div><div class="h2" style="margin-top:14px;font-size:38px;width:1650px">${md(s.q)}</div></div>${opts}
        <div class="note g abs" style="left:1250px;top:300px;width:560px;font-size:21px"${A(s.ansAt ?? 1, .3)}><b>Answer${s.ans !== undefined ? ' ' + 'ABCD'[s.ans] : ''}:</b> ${md(s.expl)}</div>`;
    },
    next(s) {
      return `<div class="abs" style="left:120px;top:60px;width:1700px"${A(0, 0)}><div class="kicker">${esc(s.kicker || 'UP NEXT')}</div><div class="h2" style="margin-top:10px">${md(s.h)}</div></div>
        ${(s.chips || []).map((c, j) => `<div class="card" style="left:${120 + (j % 4) * 420}px;top:${210 + Math.floor(j / 4) * 150}px;width:400px;height:130px"${A(c[0], j * .12)}><div class="ct" style="margin-top:0">${md(c[1])}</div><div class="cb">${md(c[2] || '')}</div></div>`).join('')}
        <div class="card hl" style="left:120px;top:${s.ny || 560}px;width:700px;height:110px;padding:20px 26px"${A(s.nAt ?? 0, .4)}><div class="kicker" style="font-size:14px">${esc(s.nk || 'NEXT')}</div><div class="h3" style="margin-top:10px">${md(s.nt)}</div></div>`;
    },
    disclaimer(s) {
      return `<div class="panel" style="left:610px;top:150px;width:700px;height:${s.h || 380}px;border-color:var(--gold);padding:40px;text-align:center"${A(0, 0)}>
        <svg width="54" height="48" viewBox="0 0 54 48"><path d="M27 4 L51 44 L3 44 Z" fill="none" stroke="#e8b64c" stroke-width="3" stroke-linejoin="round"/><line x1="27" y1="18" x2="27" y2="31" stroke="#e8b64c" stroke-width="3"/><circle cx="27" cy="37" r="2" fill="#e8b64c"/></svg>
        <div class="kicker" style="margin-top:14px;font-size:15px">PENAFIAN · DISCLAIMER</div>
        <div style="font:600 27px/1.45 Inter;margin-top:18px">${md(s.text)}</div>
        <div style="font:400 18px/1.5 Inter;color:var(--muted);margin-top:22px">${md(s.small || '')}</div></div>
        <div class="abs" style="left:0;width:1920px;top:${150 + (s.h || 380) + 30}px;text-align:center;font:400 20px Inter;color:var(--dim)"${A(0, .5)}>${md(s.foot || '')}</div>`;
    },
    statement(s) {
      return `<div class="abs" style="left:120px;top:${s.top || 90}px;width:1680px"${A(0, 0)}><div class="kicker ${s.kc || ''}">${esc(s.kicker || '')}</div>
        <div class="h1" style="margin-top:16px;font-size:${s.fs || 50}px">${md(s.h)}</div>${s.h2 ? `<div class="h1 gold" style="font-size:${s.fs || 50}px;color:var(--gold)"${A(s.h2At ?? 0, .3)}>${md(s.h2)}</div>` : ''}</div>
        ${(s.boxes || []).map((b, j) => `<div class="card" style="left:${120 + j * (1680 / s.boxes.length)}px;top:${s.by || 330}px;width:${1680 / s.boxes.length - 24}px;height:${s.bh || 380}px;${b.bc ? `border-color:var(--${b.bc})` : ''}"${A(b.at, 0)}><div class="kicker ${b.kc || ''}" style="font-size:14px">${esc(b.k)}</div><div class="ct" style="font-size:27px;margin-top:14px">${md(b.t)}</div><div class="cb" style="font-size:21px">${md(b.b || '')}</div></div>`).join('')}`;
    },
  };

  /* ---------- timeline ---------- */
  const scenes = TL.scenes; // [{start,end,segs:[{s,e,ms}]}]
  let cur = -1, nodes = [];
  function build(k) {
    const sc = EP.scenes[k], tpl = T[sc.tpl];
    if (!tpl) throw new Error('unknown template ' + sc.tpl);
    $('#scene').innerHTML = tpl(sc);
    $('#hr2').textContent = `SCENE ${k + 1} · ${sc.label || ''}`;
    nodes = [...document.querySelectorAll('#scene [data-at]')].map(n => ({ n, at: +n.dataset.at, d: +n.dataset.d || 0, a: n.dataset.a || 'fade', u: +n.dataset.u || 0, o: n.dataset.o !== undefined ? +n.dataset.o : null, od: +n.dataset.od || 0 }));
    nodes.forEach(x => { if (x.a === 'grow' || x.a === 'growx' || x.a === 'growxr') { x.n.style.transformBox = 'fill-box'; x.n.style.transformOrigin = x.a === 'grow' ? '50% 100%' : x.a === 'growxr' ? '100% 50%' : '0% 50%'; } if (x.a === 'draw') { x.n.setAttribute('stroke-dasharray', '1 1'); } });
    cur = k;
  }
  const ease = p => 1 - Math.pow(1 - p, 3);
  function segT(sc, at) { if (at < sc.segs.length) return sc.segs[at].s; const L = sc.segs[sc.segs.length - 1]; return Math.min(sc.end - 0.3, L.s + 1.2 * (at - sc.segs.length + 1)); }
  window.seek = function (t) {
    let k = scenes.findIndex(s => t >= s.start && t < s.end); if (k < 0) k = t < 0 ? 0 : scenes.length - 1;
    if (k !== cur) build(k);
    const sc = scenes[k]; const key = [k];
    // scene fade in
    const fin = Math.min(1, (t - sc.start) / .35); $('#scene').style.opacity = ease(Math.max(0, fin)).toFixed(3); key.push(Math.round(fin * 30));
    const fout = sc.end - t < .25 && k < scenes.length - 1 ? (sc.end - t) / .25 : 1; if (fout < 1) { $('#scene').style.opacity = ease(fout).toFixed(3); key.push('o' + Math.round(fout * 30)); }
    for (const x of nodes) {
      const st = segT(sc, x.at) + x.d, dur = x.u || (x.a === 'draw' ? 1.2 : .5);
      let p = Math.max(0, Math.min(1, (t - st) / dur)); const e = ease(p);
      let po = 0; if (x.o !== null) { const ot = segT(sc, x.o) + x.od; po = Math.max(0, Math.min(1, (t - ot) / .35)); }
      const vis = 1 - po;
      const S = x.n.style;
      switch (x.a) {
        case 'draw': x.n.setAttribute('stroke-dashoffset', (1 - e).toFixed(4)); S.opacity = (p > 0 ? 1 : 0) * vis; break;
        case 'grow': S.transform = `scaleY(${e})`; S.opacity = (p > 0 ? 1 : 0) * vis; break;
        case 'growx': case 'growxr': S.transform = `scaleX(${e})`; S.opacity = (p > 0 ? 1 : 0) * vis; break;
        case 'pop': S.opacity = e * vis; S.transform = `scale(${.92 + .08 * e})`; S.transformBox = 'fill-box'; S.transformOrigin = '50% 50%'; break;
        case 'fadeonly': S.opacity = e * vis; break;
        default: S.opacity = e * vis; if (x.n.tagName !== 'g' && !(x.n instanceof SVGElement)) S.transform = p < 1 ? `translateY(${(1 - e) * 14}px)` : ''; else if (x.n instanceof SVGElement) S.transform = '';
      }
      if ((p > 0 && p < 1) || (po > 0 && po < 1)) key.push(Math.round(p * 40) + ':' + Math.round(po * 40));
      else key.push(p >= 1 ? (po >= 1 ? 2 : 1) : 0);
    }
    // subtitles: chunked Malay text
    let sub = ''; const si = sc.segs.findIndex(s => t >= s.s && t < s.e + .25);
    if (si >= 0) { const s = sc.segs[si]; const ch = s.chunks; let acc = s.s; const span = s.e - s.s; const tot = ch.reduce((a, c) => a + c.length, 0);
      for (const c of ch) { const dd = span * c.length / tot; if (t < acc + dd || c === ch[ch.length - 1]) { sub = c; break; } acc += dd; } }
    const box = $('#subs .box'); if (box.textContent !== sub) box.textContent = sub; key.push(sub.length + sub.slice(0, 12));
    return key.join('|');
  };
  window.DURATION = TL.duration;
  window.READY = true;
})();
