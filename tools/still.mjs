// Quick QA stills: node tools/still.mjs v01 t1 t2 ... -> build/v01/still_<t>.png
import { createRequire } from 'module'; const { chromium } = createRequire(import.meta.url)('playwright'); import path from 'path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const [v,...ts]=process.argv.slice(2);
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.error('PAGE ERROR',e.message)); p.on('console',m=>{if(m.type()==='error')console.error('console',m.text());});
await p.goto(`file://${root}/engine/player.html?v=${v}`); await p.waitForFunction(()=>window.__READY===true);
for(const t of ts){await p.evaluate(t=>window.seek(t),+t);await p.screenshot({path:`${root}/build/${v}/still_${t}.png`});}
await b.close();
