// Export subtitle files: output/<v>_BM.srt (on-screen subtitles) and output/<v>_EN.srt (narration transcript)
import fs from 'fs'; import path from 'path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const v=process.argv[2];
const tl=JSON.parse(fs.readFileSync(`${root}/build/${v}/timeline.json`,'utf8'));
const ts=t=>{const ms=Math.round(t*1000);const h=Math.floor(ms/3600000),m=Math.floor(ms/60000)%60,s=Math.floor(ms/1000)%60,r=ms%1000;return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(r).padStart(3,'0')}`;};
let bm=[],en=[];
tl.scenes.forEach(sc=>sc.lines.forEach(l=>{
  l.subs.forEach(s=>bm.push([sc.t0+s.t0,sc.t0+s.t1,s.text]));
  en.push([sc.t0+l.t0,sc.t0+l.t1,l.en]);
}));
const w=(a)=>a.map((x,i)=>`${i+1}\n${ts(x[0])} --> ${ts(x[1])}\n${x[2]}\n`).join('\n');
fs.mkdirSync(`${root}/output`,{recursive:true});
fs.writeFileSync(`${root}/output/${v}_BM.srt`,w(bm));
fs.writeFileSync(`${root}/output/${v}_EN.srt`,w(en));
console.log(v,'srt',bm.length,en.length);
