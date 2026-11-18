// Generate a timestamped storyboard (Markdown) from an episode spec + timeline.
// usage: node tools/storyboard.js ep01
const path = require('path'), fs = require('fs');
const ep = process.argv[2], dir = path.join(__dirname, '..', 'episodes', ep);
global.L = require('../episodes/_lib.js');
const spec = require(path.join(dir, 'spec.js'));
const EN = {}; const enf = path.join(dir, 'en.txt');
if (fs.existsSync(enf)) for (const line of fs.readFileSync(enf, 'utf8').split('\n')) { const m = line.match(/^(S\d\d\.\d+)\s*\|\s*(.+)$/); if (m) EN[m[1]] = m[2].trim(); }
const tlf = path.join(dir, 'build', 'timeline.json');
const tl = fs.existsSync(tlf) ? JSON.parse(fs.readFileSync(tlf)) : null;
const ts = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
let md = `# ${spec.video} — ${spec.title}\n\n*Dijana automatik daripada \`episodes/${ep}/spec.js\` (sumber kebenaran) dan \`build/timeline.json\`. Jangan sunting fail ini secara manual.*\n\n`;
if (tl) md += `**Durasi:** ${ts(tl.total)} · **Babak:** ${spec.scenes.length} · **Cue narasi:** ${tl.scenes.reduce((a, s) => a + s.cues.length, 0)} · **Suara:** English · en-US-ChristopherNeural (TTS) · **Sari kata:** Bahasa Melayu\n\n`;
spec.scenes.forEach((s, i) => {
  const t = tl && tl.scenes[i];
  md += `## Babak ${i + 1} · ${s.label}${t ? `  \`${ts(t.start)}–${ts(t.end)}\`` : ''}\n\n| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |\n|---|---|---|\n`;
  s.cues.forEach((c, k) => { const txt = typeof c === 'string' ? c : c.t, key = `S${String(i + 1).padStart(2, '0')}.${k + 1}`, en = (typeof c === 'object' && c.en) || EN[key] || '—'; md += `| ${t ? ts(t.cues[k].start) : '—'} | ${en.replace(/\|/g, '\\|')} | ${txt.replace(/\|/g, '\\|')} |\n`; });
  md += '\n';
});
fs.writeFileSync(path.join(dir, 'STORYBOARD.md'), md); console.log('wrote', path.join(dir, 'STORYBOARD.md'));
