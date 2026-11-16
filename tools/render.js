// Render an episode: node tools/render.js ep01 [--workers 3] [--stills 5,60,120] [--out name]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2), name = args[0];
const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
const W = 1920, H = 1080, FPS = 30, workers = +(opt('workers') || 3);
const bdir = path.join(ROOT, 'build', name);
const tl = JSON.parse(fs.readFileSync(path.join(bdir, 'timeline.json')));
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../engine/style.css"></head><body>
<div id="stage"><div id="grid"></div><div id="hdr"><div id="badge">L10</div><div id="hl1"></div><div id="hl2"></div><div id="hr1"></div><div id="hr2"></div></div>
<div id="scene"></div><div id="subs"><div class="box"></div></div></div>
<script>window.EP=x=>(window.EPISODE=x);window.TIMELINE=${JSON.stringify(tl)};</script>
<script src="../../engine/charts.js"></script><script src="../../episodes/${name}.js"></script><script src="../../engine/engine.js"></script></body></html>`;
fs.writeFileSync(path.join(bdir, 'index.html'), html);
const url = 'file://' + path.join(bdir, 'index.html');

async function page(browser) {
  const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url); await p.waitForFunction('window.READY === true', null, { timeout: 15000 }).catch(() => { throw new Error('page not ready: ' + errs.join('; ')); });
  await p.evaluate(() => document.fonts.ready);
  return p;
}

(async () => {
  const browser = await chromium.launch();
  const stills = opt('stills');
  if (stills) {
    const p = await page(browser); const sd = path.join(bdir, 'stills'); fs.mkdirSync(sd, { recursive: true });
    for (const s of stills.split(',')) {
      let t = +s; if (s.startsWith('s')) { const [k, frac] = s.slice(1).split(':'); const sc = tl.scenes[+k - 1]; t = sc.end - 0.35; if (frac) t = sc.start + (sc.end - sc.start) * +frac; }
      await p.evaluate(t => window.seek(t), t); await p.waitForTimeout(30);
      await p.screenshot({ path: path.join(sd, `t_${s.replace(':', '_')}.png`) });
    }
    console.log('stills ->', sd); await browser.close(); return;
  }
  const total = Math.ceil(tl.duration * FPS), per = Math.ceil(total / workers), t0 = Date.now();
  const parts = [];
  await Promise.all([...Array(workers)].map(async (_, w) => {
    const f0 = w * per, f1 = Math.min(total, f0 + per); if (f0 >= f1) return;
    const out = path.join(bdir, `part_${w}.mp4`); parts[w] = out;
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-vf', `drawbox=x=0:y=1074:w=iw:h=6:color=0x0e1628:t=fill,drawbox=x=0:y=1074:w='iw*(t+${(f0 / FPS).toFixed(4)})/${tl.duration}':h=6:color=0xe8b64c:t=fill`,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const p = await page(browser); let lastKey = null, buf = null, shots = 0;
    for (let f = f0; f < f1; f++) {
      const key = await p.evaluate(t => window.seek(t), f / FPS);
      if (key !== lastKey || !buf) { buf = await p.screenshot({ type: 'jpeg', quality: 92 }); lastKey = key; shots++; }
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (w === 0 && f % 900 === 0) console.log(`${name} w0 ${((f - f0) / (f1 - f0) * 100).toFixed(0)}%  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log(`${name} worker ${w}: ${f1 - f0} frames, ${shots} renders`);
  }));
  await browser.close();
  const list = path.join(bdir, 'parts.txt'); fs.writeFileSync(list, parts.filter(Boolean).map(p => `file '${p}'`).join('\n'));
  fs.mkdirSync(path.join(ROOT, 'output'), { recursive: true });
  const outName = opt('out') || name;
  const final = path.join(ROOT, 'output', outName + '.mp4');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-i', path.join(bdir, 'narration.wav'), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', final]);
  console.log('done', final, ((Date.now() - t0) / 1000).toFixed(0) + 's');
})().catch(e => { console.error(e); process.exit(1); });
