// node check.js v02 [nodur] -> prints errors + scene timing, samples frames for runtime errors
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const [vid, nd] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?v=' + vid + (nd ? '&nodur=1' : ''));
  const tot = await p.evaluate(() => window.TOTAL);
  for (let t = 0; t < tot; t += 0.7) { await p.evaluate(t => window.frame(t), t); if (errs.length) { console.log('ERR at', t.toFixed(1), errs[0]); break; } }
  console.log(vid, 'total', tot && tot.toFixed(1), 'errors', errs.length);
  console.log((await p.evaluate(() => V.scenes.map(s => s.idx + ':' + s.label + ' ' + s.T0.toFixed(0)))).join(' | '));
  await b.close();
})();
