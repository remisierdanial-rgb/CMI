// Quick validation without TTS: node engine/check.js ep01 ep02 ...
const path=require('path');const {validateChart}=require('./validate');
let bad=0;
for(const n of process.argv.slice(2)){const ep=require(path.join(__dirname,'..','episodes',n+'.js'));let p=0,f=0;
 ep.scenes.forEach((s,si)=>s.comps.forEach(c=>{const charts=[];if(c.type==='chart')charts.push(c);if(c.side&&c.side.type==='chart')charts.push(c.side);(c.cards||[]).forEach(cd=>cd.svg&&charts.push(cd.svg));
  charts.forEach(ch=>{const r=validateChart(ch.candles||[],ch,`${n} S${si+1}:${ch.tag||ch.title}`);p+=r.ok.length;f+=r.errs.length;r.errs.forEach(e=>console.log('FAIL',e));});
  // cue index sanity
  const maxCue=s.cues.length-1; JSON.stringify(c,(k,v)=>{if(k==='in'&&(typeof v==='number'?v>maxCue:Array.isArray(v)&&v[0]>maxCue))console.log('WARN',n,'S'+(si+1),'in',JSON.stringify(v),'> cues',maxCue);return v;});
 }));
 console.log(n,'pass',p,'fail',f,'cues',ep.scenes.reduce((a,s)=>a+s.cues.length,0));bad+=f;}
process.exit(bad?1:0);
