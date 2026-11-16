// Usage:
//   node render.js <videoId> video [workers]        -> output/<videoId>.mp4 + .bm.srt + .en.srt
//   node render.js <videoId> stills t1,t2,...       -> output/stills/<videoId>_<t>.png
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const path = require('path'), fs = require('fs');
const FPS = 30;
const [, , vid = 'v01', mode = 'video', arg = '4'] = process.argv;
const OUT = path.resolve(__dirname, '..', 'output');
const url = 'file://' + path.resolve(__dirname, 'index.html') + '?v=' + vid;

async function open(browser) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  return page;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const p0 = await open(browser);
  const total = await p0.evaluate(() => window.TOTAL);
  console.log(`${vid}: ${total.toFixed(1)} s`);

  if (mode === 'stills') {
    fs.mkdirSync(path.join(OUT, 'stills'), { recursive: true });
    for (const t of arg.split(',').map(Number)) {
      await p0.evaluate(t => window.frame(t), t);
      await p0.screenshot({ path: path.join(OUT, 'stills', `${vid}_${String(t).padStart(6, '0')}.png`) });
    }
    await browser.close(); return;
  }

  fs.writeFileSync(path.join(OUT, `${vid}.bm.srt`), await p0.evaluate(() => window.srt('bm')));
  fs.writeFileSync(path.join(OUT, `${vid}.en.srt`), await p0.evaluate(() => window.srt('en')));
  const N = Math.ceil(total * FPS), W = parseInt(arg, 10);
  const tmp = path.join(OUT, `.parts_${vid}`); fs.mkdirSync(tmp, { recursive: true });
  const per = Math.ceil(N / W);
  await Promise.all([...Array(W).keys()].map(async w => {
    const page = w === 0 ? p0 : await open(browser);
    const f0 = w * per, f1 = Math.min(N, f0 + per);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', path.join(tmp, `p${w}.mp4`)], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise(r => ff.on('close', r));
    for (let f = f0; f < f1; f++) {
      await page.evaluate(t => window.frame(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (w === 0 && (f - f0) % 300 === 0) console.log(`  worker0 ${f - f0}/${f1 - f0}`);
    }
    ff.stdin.end(); await done;
  }));
  await browser.close();
  fs.writeFileSync(path.join(tmp, 'list.txt'), [...Array(W).keys()].map(w => `file 'p${w}.mp4'`).join('\n'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'),
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-shortest', '-c:v', 'copy', '-c:a', 'aac', '-movflags', '+faststart',
    path.join(OUT, `${vid}.mp4`)]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('done ->', path.join(OUT, `${vid}.mp4`));
})();
