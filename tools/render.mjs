// Render frames with Playwright (parallel workers) -> x264 segments -> concat + narration.
// Usage: node tools/render.mjs v01 [--workers 4] [--fps 30] [--from s --to s] [--out file]
import { createRequire } from 'module'; const { chromium } = createRequire(import.meta.url)('playwright');
import { spawn, execFileSync } from 'child_process';
import fs from 'fs'; import path from 'path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const args=process.argv.slice(2); const v=args[0];
const opt=(k,d)=>{const i=args.indexOf('--'+k);return i>=0?args[i+1]:d;};
const W=+opt('workers',4), FPS=+opt('fps',30);
const tl=JSON.parse(fs.readFileSync(`${root}/build/${v}/timeline.json`,'utf8'));
const T0=+opt('from',0), T1=+opt('to',tl.total);
const N=Math.round((T1-T0)*FPS);
const dir=`${root}/build/${v}/seg`; fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch();
const started=Date.now(); let done=0;
async function worker(k){
  const a=Math.floor(N*k/W), b=Math.floor(N*(k+1)/W);
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  page.on('pageerror',e=>console.error('PAGE ERROR',e.message));
  await page.goto(`file://${root}/engine/player.html?v=${v}`);
  await page.waitForFunction(()=>window.__READY===true,null,{timeout:60000});
  const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-',
    '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-tune','animation','-r',String(FPS),`${dir}/s${String(k).padStart(2,'0')}.mp4`],{stdio:['pipe','inherit','inherit']});
  for(let f=a;f<b;f++){
    await page.evaluate(t=>window.seek(t),T0+f/FPS);
    const buf=await page.screenshot({type:'jpeg',quality:94});
    if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
    done++;
    if(done%300===0){const el=(Date.now()-started)/1000;console.log(`${v} ${done}/${N} frames  ${(done/el).toFixed(1)} fps  eta ${((N-done)/(done/el)/60).toFixed(1)} min`);}
  }
  ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await page.close();
}
await Promise.all([...Array(W).keys()].map(worker));
await browser.close();
const list=fs.readdirSync(dir).filter(f=>f.endsWith('.mp4')).sort().map(f=>`file '${dir}/${f}'`).join('\n');
fs.writeFileSync(`${dir}/list.txt`,list);
const out=opt('out',`${root}/output/${v}.mp4`);
fs.mkdirSync(path.dirname(out),{recursive:true});
const audio=`${root}/build/${v}/narration.m4a`;
const a=['-v','error','-y','-f','concat','-safe','0','-i',`${dir}/list.txt`];
if(fs.existsSync(audio)&&T0===0)a.push('-i',audio,'-map','0:v','-map','1:a','-c:a','copy','-shortest');
a.push('-c:v','copy','-movflags','+faststart',out);
execFileSync('ffmpeg',a);
console.log('wrote',out,((Date.now()-started)/60000).toFixed(1),'min');
