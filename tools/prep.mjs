// Usage: node tools/prep.mjs lines v01   -> build/v01/lines.json
//        node tools/prep.mjs timeline v01 -> build/v01/timeline.{json,js} (needs durations.json)
import fs from 'fs'; import vm from 'vm'; import path from 'path';
const [mode,v]=process.argv.slice(2);
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
export function load(v){
  const ctx={console}; ctx.globalThis=ctx; ctx.window=ctx; ctx.VIDEO=d=>{ctx.__VIDEO=d;};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(`${root}/engine/standard.js`,'utf8'),ctx);
  vm.runInContext(fs.readFileSync(`${root}/videos/${v}.js`,'utf8'),ctx);
  const def=ctx.__VIDEO; const scenes=ctx.assembleScenes(def);
  return {ctx,def,scenes};
}
if(mode){
  const {ctx,def,scenes}=load(v);
  const dir=`${root}/build/${v}`; fs.mkdirSync(dir,{recursive:true});
  if(mode==='lines'){
    fs.writeFileSync(`${dir}/lines.json`,JSON.stringify(scenes.map(s=>s.lines.map(l=>({en:l.en,bm:l.bm}))),null,1));
    console.log(v,'scenes',scenes.length,'lines',scenes.reduce((a,s)=>a+s.lines.length,0));
  } else if(mode==='timeline'){
    const dur=JSON.parse(fs.readFileSync(`${dir}/durations.json`,'utf8'));
    const tl=ctx.buildTimeline(scenes,dur);
    fs.writeFileSync(`${dir}/timeline.json`,JSON.stringify(tl,null,1));
    fs.writeFileSync(`${dir}/timeline.js`,'window.TIMELINE='+JSON.stringify(tl)+';');
    console.log(v,'total',tl.total.toFixed(1)+'s');
  }
}
