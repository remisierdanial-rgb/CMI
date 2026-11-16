// Render an episode to MP4: Playwright captures each frame -> ffmpeg (H.264 + AAC)
// usage: node tools/render.mjs ep01 [--fps 30] [--from 0 --to 60] [--stills 10,95,200 --out dir]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright')); }
import { spawn } from 'child_process';
import path from 'path'; import fs from 'fs'; import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), ep = args[0], opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
const fps = +(opt('fps') || 30);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
await page.goto('file://' + path.join(ROOT, 'engine/player.html') + `?ep=${ep}&capture=1`);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
const total = await page.evaluate(() => window.__total);
const B = path.join(ROOT, 'episodes', ep, 'build');
if (opt('stills')) {
  const out = opt('out') || path.join(B, 'stills'); fs.mkdirSync(out, { recursive: true });
  for (const s of opt('stills').split(',')) { await page.evaluate(t => window.__render(t), +s); await page.screenshot({ path: path.join(out, `t${String(s).padStart(5, '0')}.png`) }); }
  await browser.close(); process.exit(0);
}
const t0 = +(opt('from') || 0), t1 = Math.min(+(opt('to') || total), total), N = Math.ceil((t1 - t0) * fps);
const outFile = opt('outfile') || path.join(B, `${ep.toUpperCase()}.mp4`);
const wav = path.join(B, 'narration.wav');
const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  ...(fs.existsSync(wav) ? ['-ss', String(t0), '-t', String(t1 - t0), '-i', wav] : []),
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps),
  ...(fs.existsSync(wav) ? ['-c:a', 'aac', '-b:a', '160k', '-ar', '44100', '-ac', '2', '-shortest'] : []), '-movflags', '+faststart', outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
const start = Date.now();
for (let f = 0; f < N; f++) {
  await page.evaluate(t => window.__render(t), t0 + f / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 300 === 0) { const el = (Date.now() - start) / 1000; console.log(`frame ${f}/${N}  ${(f / Math.max(el, .01)).toFixed(1)} fps`); }
}
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close();
console.log('wrote', outFile, ((Date.now() - start) / 1000).toFixed(0) + 's');
