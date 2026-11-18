// Generate docs/storyboards/epXX.md from the episode script + built timeline.
const fs = require('fs'), path = require('path'); require(path.resolve(__dirname, '../engine/charts.js'));
const ROOT = path.resolve(__dirname, '..'); fs.mkdirSync(path.join(ROOT, 'docs/storyboards'), { recursive: true });
const strip = s => String(s).replace(/\{(?:g|gr|r|c|m|a|y|p|w)\}|\{\/\}/g, '').replace(/\*\*/g, '');
const fmtT = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
function onscreen(s) {
  const out = []; const add = x => x && out.push(strip(x));
  add(s.kicker); add(s.h); add(s.h2); add(s.sub); add(s.q);
  (s.obj || []).forEach(o => add(Array.isArray(o) ? o[1] : o));
  if (s.info) { add(s.info.k); add(s.info.h); (s.info.b || []).forEach(b => add(Array.isArray(b) ? b[1] : b)); (s.info.notes || (s.info.note ? [s.info.note] : [])).forEach(n => add((n.label ? n.label + ': ' : '') + n.text)); }
  (s.cards || []).forEach(c => add([c.n, c.t, c.b, c.foot].filter(Boolean).join(' — ')));
  (s.boxes || []).forEach(c => add([c.k, c.t, c.b].filter(Boolean).join(' — ')));
  (s.rows || []).forEach(r => add(Array.isArray(r) ? r.slice(1).join(' | ') : [r.n, r.t, r.s].filter(Boolean).join(' — ')));
  (s.steps || []).forEach((st, i) => add(`${i + 1}. ${st.t}${st.s ? ' — ' + st.s : ''}`));
  (s.items || []).forEach(x => add(x[1])); (s.lines || []).forEach(x => add(x[1])); (s.calc || []).forEach(x => add(x[1]));
  (s.opts || []).forEach((o, i) => add('ABCD'[i] + '. ' + o)); if (s.expl) add('Answer: ' + s.expl);
  if (s.note) add((s.note.label ? s.note.label + ': ' : '') + s.note.text); if (s.side && s.side.text) add(s.side.text);
  if (s.text) add(s.text); if (s.small) add(s.small);
  return out;
}
function vizDesc(v) {
  if (!v) return null;
  const t = { candles: 'Animated candlestick chart', lines: 'Schematic line drawing', footprint: 'Footprint chart (bid × ask)', dom: 'Depth-of-Market ladder snapshots', tape: 'Time & Sales tape', equity: 'Equity curve', wf: 'Timeline (in-sample / walk-forward)', hbars: 'Horizontal bar chart', dash: 'Metric dashboard' }[v.type] || v.type;
  const anns = (v.ann || []).map(a => a.t + (a.label || a.text ? `(${strip(a.label || a.text)})` : '')).slice(0, 14).join(', ');
  return `${t}${v.title ? ' — "' + v.title + '"' : ''}${v.tag ? ' / ' + v.tag : ''}${anns ? '; annotations revealed progressively: ' + anns : ''}`;
}
for (const f of fs.readdirSync(path.join(ROOT, 'episodes')).filter(x => /^ep\d+\.js$/.test(x)).sort()) {
  const name = f.replace('.js', ''); globalThis.EP = x => (globalThis.EPISODE = x); delete require.cache[path.join(ROOT, 'episodes', f)]; require(path.join(ROOT, 'episodes', f));
  const E = globalThis.EPISODE; let tl = null; try { tl = JSON.parse(fs.readFileSync(path.join(ROOT, 'build', name, 'timeline.json'))); } catch (e) {}
  const L = [`# Video ${E.num} — ${E.title}`, '', `Storyboard generated from \`episodes/${f}\`${tl ? ` and the built timeline (duration ${fmtT(tl.duration)})` : ''}. Narration audio: English. Burned-in subtitles: Bahasa Melayu.`, '',
    '**Data type for every chart in this episode: hypothetical / simulated illustration** (no historical FCPO prices, volume, Open Interest or order flow are shown). Sources: see `docs/04_programme_deliverables.md` §12.', ''];
  E.scenes.forEach((s, k) => {
    const sc = tl && tl.scenes[k];
    L.push(`## Scene ${k + 1} — ${s.label || s.tpl}${sc ? ` (${fmtT(sc.start)}–${fmtT(sc.end)})` : ''}`, '');
    L.push(`- **Template / layout:** \`${s.tpl}\``);
    const vd = [vizDesc(s.viz), vizDesc(s.a), vizDesc(s.b)].filter(Boolean); if (vd.length) L.push(`- **Chart animation:** ${vd.join(' | ')}`);
    L.push(`- **Transition:** 0.35 s fade-in; elements appear in sync with narration segments (fade / draw / pop); 0.25 s fade-out.`);
    const os = onscreen(s); if (os.length) { L.push('- **On-screen text:**'); os.forEach(x => L.push(`  - ${x}`)); }
    L.push('', '| # | Narration (EN, voiced) | Subtitle (BM, on screen) |', '|---|---|---|');
    s.say.forEach((x, j) => L.push(`| ${j + 1} | ${x[0].replace(/\|/g, '/')} | ${x[1].replace(/\|/g, '/')} |`));
    L.push('');
  });
  fs.writeFileSync(path.join(ROOT, 'docs/storyboards', name + '.md'), L.join('\n'));
  console.log(name, E.scenes.length, 'scenes');
}
