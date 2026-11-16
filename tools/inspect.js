// node tools/inspect.js ep01 <sceneNo> [vizKey] [i1 i2 bin] -> prints bars (and profile)
const path = require('path'); require(path.resolve(__dirname, '../engine/charts.js'));
globalThis.EP = x => (globalThis.EPISODE = x); require(path.resolve(__dirname, '../episodes/' + process.argv[2] + '.js'));
const sc = EPISODE.scenes[+process.argv[3] - 1], spec = sc[process.argv[4] || 'viz'];
if (spec.bars) { spec.bars.forEach((b, i) => console.log(i, JSON.stringify(b))); process.exit(0); }
const bars = CH.genCandles(spec.data);
bars.forEach((b, i) => { let av = ''; if (i >= 20) { let sm = 0; for (let j = i - 20; j < i; j++) sm += bars[j].v; av = 'avg20=' + Math.round(sm / 20) + ' rv=' + (b.v / (sm / 20)).toFixed(2); } console.log(i, b.o, b.h, b.l, b.c, b.v, 'rng=' + (b.h - b.l), av); });
const lows = bars.map(b => b.l), highs = bars.map(b => b.h);
console.log('min low', Math.min(...lows), 'at', lows.indexOf(Math.min(...lows)), ' max high', Math.max(...highs), 'at', highs.indexOf(Math.max(...highs)));
(spec.ann || []).filter(a => a.t === 'profile').forEach(a => { const p = CH.profile(bars, a.i1, a.i2, a.bin || 5); console.log('PROFILE', a.i1, a.i2, 'POC', p.pocPrice, 'VAH', p.vah, 'VAL', p.val, 'va%', p.vaPct.toFixed(3)); p.vol.forEach((v, k) => console.log('  ', p.lo + k * p.bin, Math.round(v))); });
