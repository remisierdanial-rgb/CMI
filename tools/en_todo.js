// Lists the Malay cues of an episode that still need an English narration line in episodes/<ep>/en.txt
// Key format: S<scene 2-digit>.<cue 1-based>   usage: node tools/en_todo.js ep02 [--all]
const path = require('path'), fs = require('fs');
global.L = require('../episodes/_lib.js');
const ep = process.argv[2], dir = path.join(__dirname, '../episodes', ep);
const spec = require(path.join(dir, 'spec.js'));
const have = {}; const f = path.join(dir, 'en.txt');
if (fs.existsSync(f)) for (const line of fs.readFileSync(f, 'utf8').split('\n')) { const m = line.match(/^(S\d\d\.\d+)\s*\|\s*(.+)$/); if (m) have[m[1]] = m[2]; }
let miss = 0, total = 0;
spec.scenes.forEach((s, i) => s.cues.forEach((c, k) => {
  total++; const key = `S${String(i + 1).padStart(2, '0')}.${k + 1}`, t = typeof c === 'string' ? c : c.t, auto = typeof c === 'object' && c.en;
  if (!auto && !have[key]) { miss++; console.log(`${key} | ${t}`); } else if (process.argv.includes('--all')) console.log(`${key} = ${auto || have[key]}`);
}));
console.error(`${ep}: ${total} cues · ${miss} missing English`);
