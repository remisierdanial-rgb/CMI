// Generate English narration per line (Edge neural TTS) and record durations.
// usage: node tts_build.js v01 [voice]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path'), fs = require('fs'), crypto = require('crypto');
const vid = process.argv[2] || 'v01', voice = process.argv[3] || 'en-US-AndrewNeural';
const CACHE = path.resolve(__dirname, '..', 'output', '.audio_cache');
(async () => {
  fs.mkdirSync(CACHE, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.resolve(__dirname, 'index.html') + '?v=' + vid + '&nodur=1');
  const lines = await p.evaluate(() => V.scenes.flatMap(s => s.lines.map(l => l.say || l.en)));
  await b.close();
  const files = lines.map(t => path.join(CACHE, crypto.createHash('sha1').update(voice + '|' + t).digest('hex').slice(0, 16) + '.mp3'));
  const jobs = lines.map((t, k) => ({ text: t, voice, out: files[k] })).filter(j => !fs.existsSync(j.out) || fs.statSync(j.out).size < 1000);
  if (jobs.length) {
    const jf = path.join(CACHE, vid + '_jobs.json'); fs.writeFileSync(jf, JSON.stringify(jobs));
    execFileSync('python3', [path.join(__dirname, 'tts.py'), jf], { stdio: 'inherit' });
  }
  const dur = files.map(f => {
    const s = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
    if (!(s > 0.3)) throw new Error('bad audio ' + f); return +s.toFixed(3);
  });
  fs.writeFileSync(path.join(__dirname, 'videos', vid + '.dur.js'), `window.DUR=${JSON.stringify({ voice, files: files.map(f => path.relative(__dirname, f)), dur })};\n`);
  console.log(`${vid}: ${lines.length} lines, ${jobs.length} synthesized, speech ${dur.reduce((a, b) => a + b, 0).toFixed(1)} s`);
})();
