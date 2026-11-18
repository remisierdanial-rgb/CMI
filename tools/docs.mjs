// Generate production documents from the video definitions + timelines.
// Usage: node tools/docs.mjs   -> docs/VIDEO_XX.md for every video with a timeline
import fs from 'fs'; import path from 'path';
import { load } from './prep.mjs';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const mmss=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
const strip=s=>String(s).replace(/<[^>]+>/g,'');
const vids=fs.readdirSync(`${root}/videos`).filter(f=>/^v\d\d\.js$/.test(f)).map(f=>f.slice(0,3)).sort();
const index=[];
for(const v of vids){
  const {def,scenes}=load(v);
  const tlp=`${root}/build/${v}/timeline.json`;
  const tl=fs.existsSync(tlp)?JSON.parse(fs.readFileSync(tlp,'utf8')):null;
  const L=[];
  L.push(`# VIDEO ${def.num} — ${def.title}`,'');
  L.push(`| | |`,`|---|---|`);
  L.push(`| Modul | ${def.moduleLabel} |`,`| Tujuan | ${def.purpose} |`,`| Tajuk (tepat) | **${def.title}** |`,`| Subtajuk skrin | ${def.tagline} |`);
  L.push(`| Durasi | ${tl?mmss(tl.total)+' ('+tl.total.toFixed(1)+' s)':'—'} |`,`| Format | 1920×1080 · 30 fps · H.264 · AAC 48 kHz · 16:9 |`);
  L.push(`| Narasi | English (VO) · sari kata Bahasa Malaysia dibakar ke dalam video + fail SRT |`,'');
  L.push(`## Objektif pembelajaran`,'',...def.objectives.map(o=>`- ${o}`),'');
  L.push(`## Ringkasan storyboard`,'',`| # | Babak | Mula | Durasi |`,`|---|---|---|---|`);
  scenes.forEach((s,i)=>{const t=tl?tl.scenes[i]:null;L.push(`| ${s.sceneNo||'—'} | ${s.label||'BRAND STING'} | ${t?mmss(t.t0):''} | ${t?t.dur.toFixed(1)+' s':''} |`);});
  L.push('');
  L.push(`## Skrip penuh & arahan grafik (babak demi babak)`,'');
  scenes.forEach((s,i)=>{
    const t=tl?tl.scenes[i]:null;
    L.push(`### ${s.sceneNo?('Babak '+s.sceneNo+' — '):''}${s.label||'Brand sting'} ${t?`(${mmss(t.t0)}–${mmss(t.t1)}, ${t.dur.toFixed(1)} s)`:''}`,'');
    if(s.dir)L.push(`**Arahan motion graphics:** ${s.dir}`,'');
    if(s.lines.length){
      L.push(`| Masa | Narasi (VO, English) | Sari kata BM (di skrin) |`,`|---|---|---|`);
      s.lines.forEach((l,j)=>L.push(`| ${t?mmss(t.t0+t.lines[j].t0):''} | ${l.en.replace(/\|/g,'/')} | ${l.bm.replace(/\|/g,'/')} |`));
      L.push('');
    } else L.push('_Tiada narasi (logo & muzik/senyap)._','');
  });
  L.push(`## Teks skrin & istilah penting`,'',def.takeaways.map(t=>`- ${t[2]}`).join('\n'),'');
  L.push(`**Mesej akhir (dipaparkan di skrin):** “${def.endQuote[1]}”`,'');
  L.push(`## Keperluan aset visual`,'',...(def.assets||[]).map(a=>`- ${a}`),`- Fon: Inter (teks), JetBrains Mono (angka/label) · Ikon: vektor garisan (dalam enjin)`,'');
  L.push(`## Rujukan`,'',`| # | Organisasi | Dokumen / halaman | URL | Tarikh akses | Status |`,`|---|---|---|---|---|---|`);
  def.sources.forEach((s,i)=>L.push(`| ${i+1} | ${s.org} | ${s.title} | ${s.url} | — | ⚠️ Perlu disemak manual (laman disekat dari persekitaran produksi, 18 Nov 2026) |`));
  L.push('');
  L.push(`## Senarai semak fakta`,'',`| Kenyataan | Sumber | Status |`,`|---|---|---|`);
  def.factcheck.forEach(f=>L.push(`| ${f[0]} | ${f[1]} | ${/OK/.test(f[2])?'✅ ':'⚠️ '}${f[2]} |`));
  L.push('',`> Semua angka harga, margin dan contoh dalam video ini ialah **ilustrasi hipotetikal** dan dilabel sedemikian di skrin.`,'');
  const file=`VIDEO_${def.num}.md`;
  fs.writeFileSync(`${root}/docs/${file}`,L.join('\n'));
  index.push([def.num,def.title,def.purpose,tl?mmss(tl.total):'—',file]);
}
fs.writeFileSync(`${root}/docs/index.json`,JSON.stringify(index,null,1));
console.log('docs',index.length);
