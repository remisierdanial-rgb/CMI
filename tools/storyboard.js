// Generate a timestamped storyboard (Markdown) from an episode spec + timeline.
// usage: node tools/storyboard.js ep01
const path = require('path'), fs = require('fs');
const ep = process.argv[2], dir = path.join(__dirname, '..', 'episodes', ep);
const spec = require(path.join(dir, 'spec.js'));
const tlf = path.join(dir, 'build', 'timeline.json');
const tl = fs.existsSync(tlf) ? JSON.parse(fs.readFileSync(tlf)) : null;
const ts = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
let md = `# ${spec.video} — ${spec.title}\n\n*Dijana automatik daripada \`episodes/${ep}/spec.js\` (sumber kebenaran) dan \`build/timeline.json\`. Jangan sunting fail ini secara manual.*\n\n`;
if (tl) md += `**Durasi:** ${ts(tl.total)} · **Babak:** ${spec.scenes.length} · **Cue narasi:** ${tl.scenes.reduce((a, s) => a + s.cues.length, 0)} · **Suara:** ms-MY-OsmanNeural (TTS)\n\n`;
spec.scenes.forEach((s, i) => {
  const t = tl && tl.scenes[i];
  md += `## Babak ${i + 1} · ${s.label}${t ? `  \`${ts(t.start)}–${ts(t.end)}\`` : ''}\n\n| Masa | Narasi (BM) |\n|---|---|\n`;
  s.cues.forEach((c, k) => { const txt = typeof c === 'string' ? c : c.t; md += `| ${t ? ts(t.cues[k].start) : '—'} | ${txt.replace(/\|/g, '\\|')} |\n`; });
  md += '\n';
});
fs.writeFileSync(path.join(dir, 'STORYBOARD.md'), md); console.log('wrote', path.join(dir, 'STORYBOARD.md'));
