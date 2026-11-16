// Lists every FCPO trade example in the series with its mapped, self-checked levels (used for the series audit).
const path = require('path'), fs = require('fs');
const L = require('../episodes/_lib.js'); global.L = L;
const rows = []; const orig = L.example;
L.example = o => { const v = L.template(o); const n = o.n || 1;
  let res = v.kind === 'tp' ? `+${(v.reward / v.risk).toFixed(2)}R` : v.kind === 'sl' ? '−1R' : v.kind === 'nofill' ? 'no fill · no trade' : `+${(((Math.abs(v.tp1 - v.entry) + v.reward) * n / 2) / (v.risk * n)).toFixed(2)}R (partials)`;
  rows.push([cur, o.label, v.dir > 0 ? 'Long' : 'Short', o.entryTF || '5M', v.entry, v.sl, (v.tp1 ? v.tp1 + ' / ' : '') + v.tp, v.risk, (v.reward / v.risk).toFixed(2), n, `RM${(v.risk * 25 * n).toLocaleString('en-US')}`, res]);
  return orig(o); };
let cur;
for (const d of fs.readdirSync(path.join(__dirname, '../episodes')).filter(d => /^ep\d/.test(d)).sort()) { cur = d.toUpperCase(); delete require.cache[require.resolve(`../episodes/${d}/spec.js`)]; require(`../episodes/${d}/spec.js`); }
console.log('| EP | Example | Dir | TF | Entry | SL | TP | Risk pts | Planned RR | Contracts | Gross risk | Outcome |\n|---|---|---|---|---|---|---|---|---|---|---|---|');
rows.forEach(r => console.log('| ' + r.map(x => typeof x === 'number' ? x.toLocaleString('en-US') : x).join(' | ') + ' |'));
