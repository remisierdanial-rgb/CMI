#!/usr/bin/env node
// Usage: node engine/build.js ep01 [--preview] [--stills] [--from=sec --to=sec] [--fps=30]
'use strict';
const fs=require('fs'), path=require('path'), cp=require('child_process'), crypto=require('crypto');
const {validateChart}=require('./validate');
const ROOT=path.resolve(__dirname,'..');
const VOICE=process.env.CMI_VOICE||'en-US-AndrewNeural', RATE=process.env.CMI_RATE||'-4%';
const args=process.argv.slice(2); const epName=args[0];
const flag=n=>args.includes('--'+n); const opt=(n,d)=>{const a=args.find(x=>x.startsWith('--'+n+'='));return a?a.split('=')[1]:d;};
const FPS=+opt('fps',30);
const ep=require(path.join(ROOT,'episodes',epName+'.js'));
const CACHE=path.join(ROOT,'cache','tts'); fs.mkdirSync(CACHE,{recursive:true});
const OUT=path.join(ROOT,'renders'); fs.mkdirSync(OUT,{recursive:true});
const GEN=path.join(ROOT,'build',epName); fs.mkdirSync(GEN,{recursive:true});

function sh(cmd,a){return cp.execFileSync(cmd,a,{encoding:'utf8',stdio:['ignore','pipe','pipe']});}
function dur(f){return parseFloat(sh('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',f]));}

async function tts(text){
  const h=crypto.createHash('sha1').update(VOICE+RATE+text).digest('hex').slice(0,16); const f=path.join(CACHE,h+'.mp3');
  if(fs.existsSync(f)&&fs.statSync(f).size>1000) return f;
  for(let a=0;a<60;a++){
    const okp=await new Promise(res=>{const p=cp.spawn('edge-tts',['--voice',VOICE,'--rate='+RATE,'--text',text,'--write-media',f],{stdio:'ignore',env:Object.assign({},process.env,{SSL_CERT_FILE:'/root/.ccr/ca-bundle.crt'})});
      const to=setTimeout(()=>p.kill('SIGKILL'),45000); p.on('close',c=>{clearTimeout(to);res(c===0);});});
    if(okp&&fs.existsSync(f)&&fs.statSync(f).size>1000) return f; await new Promise(r=>setTimeout(r,600+Math.random()*1200));
  }
  throw new Error('TTS failed: '+text.slice(0,60));
}
async function pool(items,n,fn){const res=new Array(items.length);let k=0;await Promise.all(Array.from({length:n},async()=>{while(k<items.length){const i=k++;res[i]=await fn(items[i],i);}}));return res;}

function chunkSubs(text){
  const MAX=138; text=text.replace(/\b([A-Z])\.\s/g,'$1.\u00A0'); const sents=text.split(/(?<=[.!?]["”)]?)[ \t\n]+/); const parts=[];
  for(let s of sents){ s=s.trim(); if(!s)continue;
    if(s.length<=MAX){parts.push(s);continue;}
    const bits=s.split(/(?<=[,;:])\s+/); let cur='';
    for(const b of bits){ if((cur+' '+b).trim().length>MAX&&cur){parts.push(cur.trim());cur=b;} else cur=(cur+' '+b).trim(); }
    if(cur)parts.push(cur);
  }
  const out=[]; for(const p of parts){ const last=out[out.length-1]; if(last&&(last+' '+p).length<=MAX&&last.length<60) out[out.length-1]=last+' '+p; else out.push(p);} return out;
}

(async()=>{
  // 1) collect cues + TTS
  const allCues=[]; ep.scenes.forEach((s,si)=>s.cues.forEach((c,ci)=>{c.si=si;c.ci=ci;allCues.push(c);}));
  console.log(`[${epName}] scenes=${ep.scenes.length} cues=${allCues.length}`);
  await pool(allCues,+(process.env.CMI_TTS_PAR||3),async c=>{ if(c.en){c.audio=await tts(c.en);c.adur=dur(c.audio);} else c.adur=c.hold||4; });
  if(flag('tts-only')){console.log(`[${epName}] tts cached`);return;}
  // 2) timeline
  let T=0; const tl={meta:ep.meta,scenes:[]};
  ep.scenes.forEach((s,si)=>{
    const S={label:s.label,layout:s.layout,comps:s.comps,t0:T,cues:[]}; let t=T+0.7;
    s.cues.forEach((c,ci)=>{ const d=c.adur+(c.pause||0); const C={idx:allCues.indexOf(c),t0:t,t1:t+d,subs:[]};
      const ch=chunkSubs(c.ms); const tot=ch.reduce((a,b)=>a+b.length,0); let u=t;
      ch.forEach((x,k)=>{const len=c.adur*(x.length/tot); C.subs.push({t0:u,t1:k===ch.length-1?t+d:u+len,text:x}); u+=len;});
      c.t0=t; S.cues.push(C); t+=d+0.42; });
    S.t1=t+0.7; T=S.t1; tl.scenes.push(S);
  });
  tl.duration=T; console.log(`[${epName}] duration ${(T/60).toFixed(2)} min`);
  // 3) validation
  const report=[]; let nerr=0;
  ep.scenes.forEach((s,si)=>s.comps.forEach((c,k)=>{ const charts=[]; if(c.type==='chart')charts.push(c); if(c.side&&c.side.type==='chart')charts.push(c.side); (c.cards||[]).forEach(cd=>cd.svg&&cd.svg.type==='chart'&&charts.push(cd.svg));
    charts.forEach(ch=>{const r=validateChart(ch.candles||[],ch,`S${si+1}:${ch.tag||ch.title||'chart'}`);nerr+=r.errs.length;report.push(...r.errs.map(e=>'FAIL '+e),...r.ok.map(e=>'PASS '+e));});}));
  fs.writeFileSync(path.join(GEN,'validation.txt'),report.join('\n')+'\n');
  if(nerr){console.error(report.filter(x=>x.startsWith('FAIL')).join('\n'));if(!flag('force'))process.exit(2);}
  console.log(`[${epName}] validation: ${report.length-nerr} pass, ${nerr} fail`);
  // 4) subtitles + script
  const ts=x=>{const h=Math.floor(x/3600),m=Math.floor(x%3600/60),s=Math.floor(x%60),ms=Math.round((x%1)*1000);return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
  let srt='',n=1; tl.scenes.forEach(S=>S.cues.forEach(C=>C.subs.forEach(sb=>{srt+=`${n++}\n${ts(sb.t0)} --> ${ts(sb.t1)}\n${sb.text}\n\n`;})));
  fs.writeFileSync(path.join(OUT,epName+'.ms.srt'),srt);
  let srtE='';n=1; allCues.forEach(c=>{if(c.en){srtE+=`${n++}\n${ts(c.t0)} --> ${ts(c.t0+c.adur)}\n${c.en.replace(/\b[A-Z0-9](?: [A-Z0-9])+\b/g,m=>m.replace(/ /g,''))}\n\n`;}}); fs.writeFileSync(path.join(OUT,epName+'.en.srt'),srtE);
  fs.writeFileSync(path.join(GEN,'timeline.json'),JSON.stringify(tl));
  if(flag('timeline')) return;
  // 5) audio
  const SR=24000; const pcm=new Int16Array(Math.ceil((T+1)*SR));
  for(const c of allCues){ if(!c.audio)continue; const raw=cp.execFileSync('ffmpeg',['-v','error','-i',c.audio,'-f','s16le','-ac','1','-ar',String(SR),'-'],{maxBuffer:1<<28}); const a=new Int16Array(raw.buffer,raw.byteOffset,raw.length/2); pcm.set(a.subarray(0,Math.min(a.length,pcm.length-Math.round(c.t0*SR))),Math.round(c.t0*SR)); }
  const wav=path.join(GEN,'voice.wav'); const hdr=Buffer.alloc(44); const dl=pcm.length*2;
  hdr.write('RIFF',0);hdr.writeUInt32LE(36+dl,4);hdr.write('WAVE',8);hdr.write('fmt ',12);hdr.writeUInt32LE(16,16);hdr.writeUInt16LE(1,20);hdr.writeUInt16LE(1,22);hdr.writeUInt32LE(SR,24);hdr.writeUInt32LE(SR*2,28);hdr.writeUInt16LE(2,32);hdr.writeUInt16LE(16,34);hdr.write('data',36);hdr.writeUInt32LE(dl,40);
  fs.writeFileSync(wav,Buffer.concat([hdr,Buffer.from(pcm.buffer)]));
  // 6) frames
  const {chromium}=require('playwright'); const browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:1920,height:1080}});
  await page.goto('file://'+path.join(__dirname,'player.html')); await page.evaluate(ep=>window.initEP(ep),tl); await page.evaluate(()=>document.fonts.ready);
  if(flag('stills')){ // one still per cue end (QA)
    const dir=path.join(GEN,'stills'); fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir,{recursive:true});
    const only=opt('scenes',null); const sel=only?only.split(',').map(Number):null;
    for(let si=0;si<tl.scenes.length;si++){ if(sel&&!sel.includes(si+1))continue; const S=tl.scenes[si]; const pts=flag('allcues')?S.cues.map(c=>c.t1-0.05):[S.cues[S.cues.length-1].t1-0.05];
      for(let k=0;k<pts.length;k++){ await page.evaluate(t=>window.renderAt(t),pts[k]); await page.screenshot({path:path.join(dir,`s${String(si+1).padStart(2,'0')}_${k}.jpg`),type:'jpeg',quality:80}); } }
    await browser.close(); console.log('stills done'); return;
  }
  const t0=+opt('from',0), t1=+opt('to',T); const outF=path.join(OUT,epName+(flag('preview')?'.preview':'')+'.mp4');
  const ff=cp.spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-ss',String(t0),'-t',String(t1-t0),'-i',wav,
    '-c:v','libx264','-preset',flag('preview')?'veryfast':'medium','-crf','20','-pix_fmt','yuv420p','-r',String(FPS),'-c:a','aac','-b:a','128k','-ar','44100','-shortest','-movflags','+faststart',outF],{stdio:['pipe','inherit','inherit']});
  const write=b=>new Promise(r=>{if(!ff.stdin.write(b))ff.stdin.once('drain',r);else r();});
  let last=null,lastKey=null,shots=0; const nF=Math.round((t1-t0)*FPS); const st=Date.now();
  for(let f=0;f<nF;f++){ const t=t0+f/FPS; const key=await page.evaluate(t=>window.renderAt(t),t);
    if(key!==lastKey||!last){ last=await page.screenshot({type:'jpeg',quality:93}); lastKey=key; shots++; }
    await write(last);
    if(f%900===0) console.log(`[${epName}] ${(f/FPS/60).toFixed(1)}/${((t1-t0)/60).toFixed(1)} min, shots=${shots}, ${((Date.now()-st)/1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await browser.close();
  console.log(`[${epName}] wrote ${outF} (${shots} unique frames / ${nF})`);
})().catch(e=>{console.error(e);process.exit(1);});
