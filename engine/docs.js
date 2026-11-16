#!/usr/bin/env node
// Generates scripts, storyboards, assessment and validation report from the episode specs.
'use strict';
const fs=require('fs'), path=require('path');
const {validateChart}=require('./validate');
const ROOT=path.resolve(__dirname,'..'); const D=p=>path.join(ROOT,'docs',p);
['scripts','storyboards'].forEach(d=>fs.mkdirSync(D(d),{recursive:true}));
const eps=[]; for(let i=1;i<=14;i++){const n='ep'+String(i).padStart(2,'0');eps.push([n,require(path.join(ROOT,'episodes',n+'.js'))]);}
const acr=s=>String(s||'').replace(/\b[A-Z0-9](?: [A-Z0-9])+\b/g,m=>m.replace(/ /g,''));
const strip=s=>String(s||'').replace(/\*\*(.+?)\*\*/g,'$1').replace(/\[\[\w+\|(.+?)\]\]/g,'$1').replace(/\n/g,' ');
const tl=n=>{try{return JSON.parse(fs.readFileSync(path.join(ROOT,'build',n,'timeline.json'),'utf8'));}catch(e){return null;}};
const mmss=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
const cueIdx=v=>v==null?'scene start':Array.isArray(v)?`cue ${v[0]+1}`:typeof v==='number'?`cue ${v+1}`:String(v);

function describe(c){
  switch(c.type){
    case 'title': return `Title card — eyebrow “${c.eyebrow}”, title “${strip(c.title)}”, subtitle “${strip(c.subtitle)}”; learning objectives: ${c.objectives.map(o=>strip(o.text||o)).join('; ')}${c.side?'; side panel: animated mini chart':''}.`;
    case 'head': return `Heading — ${c.eyebrow}: “${strip(c.title)}”${c.right?` · tag “${c.right}”`:''}.`;
    case 'notes': return `Notes panel “${strip(c.title)}”: ${c.items.map(i=>`${strip(i.text)} (${cueIdx(i.in)})`).join(' · ')}.`;
    case 'list': return `List (${c.icon||'check'}): ${c.items.map(i=>`${strip(i.text)} (${cueIdx(i.in)})`).join(' · ')}.`;
    case 'table': return `Table [${c.cols.join(' | ')}]: ${c.rows.map(r=>r.cells.map(strip).join(' / ')+` (${cueIdx(r.in)})`).join(' ‖ ')}.`;
    case 'cards': return `Cards: ${c.cards.map(cd=>`**${cd.title}** — ${(cd.items||[]).map(i=>strip(i.text||i)).join('; ')} (${cueIdx(cd.in)})`).join(' · ')}.`;
    case 'flow': return `Process flow: ${c.steps.map(s=>`${s.n||''} ${strip(s.text)}${s.sub?` (${strip(s.sub)})`:''} [${cueIdx(s.in)}]`).join(' → ')}.`;
    case 'callout': return `Callout “${c.head||''}”: ${strip(c.text)} (${cueIdx(c.in)}).`;
    case 'text': return `Caption: ${strip(c.text)} (${cueIdx(c.in)}).`;
    case 'timeline': return `24-hour timeline (${c.rows.map(r=>`${r.label} offset +${r.offset}h`).join('; ')}); zones: ${c.zones.map(z=>`${z.name} ${z.start}–${z.end} NY`).join(', ')}.`;
    case 'disclaimer': return `Disclaimer card (BM) + “${c.next}”.`;
    case 'chart': {
      const ov=(c.overlays||[]).filter(o=>o.label||o.text).map(o=>`${o.type}: ${strip(o.label||o.text)} (${cueIdx(o.in)})`);
      const rv=(c.reveal||[]).map(([q,n])=>`${n} candles by ${cueIdx(q)}`).join(', ');
      return `Chart “${c.title||''}” · tag “${c.tag||''}” · ${c.candles.length} OHLC candles (progressive reveal: ${rv||'all'}). Annotations: ${ov.join('; ')||'—'}.`;}
  }
  return c.type;
}

let assess=`# CMI Smart Money Concept — Level 7 Assessment & Answer Guide\n\nGenerated from the episode specifications (\`episodes/*.js\`). Every question shown in the videos appears here with the short answer shown on screen **and** a full explanation.\n\n`;
let report=`# Technical Accuracy Report — Automated Chart Validation\n\nEvery animated chart is generated from explicit OHLC data and checked by \`engine/validate.js\` before rendering. The build refuses to render if any check fails.\n\nChecks include: OHLC integrity (High ≥ max(Open, Close), Low ≤ min(Open, Close)), no price gaps between consecutive candles, positive prices, every labelled liquidity sweep actually trading through its level, every BOS/MSS having a close beyond the referenced swing, every FVG having a real gap between candle 1 and candle 3, labelled swing points being true local extremes, equal highs/lows matching within one tick, and SMT pairs showing the stated lower-low / higher-low (or higher-high / lower-high) relationship at time-aligned swings.\n\n| Episode | Charts checked | Checks passed | Checks failed |\n|---|---|---|---|\n`;
let detail='';
for(const [n,ep] of eps){
  const T=tl(n);
  // script
  let sc=`# ${ep.meta.r1}\n\n**CMI Smart Money Concept · Level 7 — Advanced ICT Concepts**  \nNarration: English voice-over (as in the reference style) · On-screen subtitles: Bahasa Melayu.\n\n`;
  let sb=`# Storyboard — ${ep.meta.r1}\n\nFormat: 1920×1080, 30 fps · Header bar (L7 badge, level, episode, scene label) · Burned-in Bahasa Melayu subtitles · Gold progress bar.\n\n`;
  ep.scenes.forEach((s,si)=>{
    const ts=T?` (${mmss(T.scenes[si].t0)}–${mmss(T.scenes[si].t1)})`:'';
    sc+=`## ${s.label}${ts}\n\n| # | English narration | Sari kata Bahasa Melayu |\n|---|---|---|\n`;
    s.cues.forEach((c,k)=>{sc+=`| ${k+1} | ${acr(c.en)||'—'} | ${c.ms} |\n`;}); sc+='\n';
    sb+=`## ${s.label}${ts}\n\n- **Layout:** ${s.layout}\n`; s.comps.forEach(c=>{sb+=`- ${describe(c)}\n`;});
    sb+=`- **Beats:** ${s.cues.map((c,k)=>`(${k+1}) ${c.en? acr(c.en).split(/(?<=[.!?])\s/)[0]:'hold'}`).join(' ')}\n\n`;
  });
  fs.writeFileSync(D(`scripts/${n}.md`),sc); fs.writeFileSync(D(`storyboards/${n}.md`),sb);
  // assessment
  const q=ep.quiz; assess+=`## ${ep.meta.r1}\n\n### Knowledge check\n\n`;
  q.questions.forEach((x,k)=>{assess+=`**Q${k+1}. ${x.q}**  \n*Answer:* ${x.a}  \n*Explanation:* ${x.why}\n\n`;});
  assess+=`### Chart-identification exercises\n\n`; q.charts.forEach((x,k)=>{assess+=`**Exercise ${k+1}.** ${x.prompt}  \n*Answer guide:* ${x.answer}\n\n`;});
  assess+=`### Practical market interpretation exercise\n\n${q.practical.task}  \n*Answer guide:* ${q.practical.guide}\n\n---\n\n`;
  // validation
  let nc=0,p=0,f=0,lines=[];
  ep.scenes.forEach((s,si)=>s.comps.forEach(c=>{const ch=[];if(c.type==='chart')ch.push(c);if(c.side&&c.side.type==='chart')ch.push(c.side);ch.forEach(x=>{nc++;const r=validateChart(x.candles,x,`Scene ${si+1} · ${x.tag||x.title}`);p+=r.ok.length;f+=r.errs.length;lines.push(...r.errs.map(e=>'- ❌ '+e),...r.ok.map(e=>'- ✅ '+e));});}));
  report+=`| ${ep.meta.r1} | ${nc} | ${p} | ${f} |\n`; detail+=`\n### ${ep.meta.r1}\n\n${lines.join('\n')}\n`;
}
assess+=`## Level 7 — Comprehensive Assessment\n\nStudents should be able to demonstrate each competency below. Suggested evidence and model answers are given.\n\n`;
const comp=[
 ['Explain Power of Three.','A conceptual price-delivery model: range near the open, counter-move, directional expansion. Popularised by ICT; not a law.'],
 ['Identify Accumulation, Manipulation and Distribution.','Range with clear boundaries; sweep beyond one boundary and return; displacement and expansion with structure.'],
 ['Distinguish PO3 from AMD and from Wyckoff.','PO3 anchors to the open of a period; AMD studies the phases of a range; Wyckoff uses phases A–E, Spring/Upthrust and volume (effort vs result). “Distribution” means expansion in PO3/AMD but a top in Wyckoff.'],
 ['Identify bullish and bearish PO3 models.','Bullish: below the open first, SSL sweep, expansion up to BSL. Bearish: the inverse.'],
 ['Explain ICT Kill Zones.','ICT-defined NY-time windows for monitoring price (CMI: Asian 20–24, London 02–05, NY AM 07–10, Lunch 12–13, NY PM 13:30–16); not exchange hours, not guarantees.'],
 ['Convert New York time to Malaysia time correctly.','MYT = NY + 13 h during EST, + 12 h during EDT (e.g. NY 02:00 = 15:00 MYT on 15 Jan 2026; 14:00 MYT on 15 Jul 2026).'],
 ['Explain the impact of daylight saving time.','US DST runs 2nd Sunday of March to 1st Sunday of November (2026: 8 Mar–1 Nov); Malaysia has no DST, so MYT equivalents shift by 1 h; US/UK change on different dates.'],
 ['Distinguish ICT Kill Zones from official exchange sessions.','FCPO: 10:30–12:30, 14:30–18:00, T+1 21:00–23:30 MYT per Bursa; clock overlap with a Kill Zone is not a definition.'],
 ['Develop bullish, bearish and neutral Daily Bias.','Use the 10-question checklist; neutral when structure conflicts, price is at EQ, no displacement or event risk.'],
 ['Identify the Draw on Liquidity.','Choose among PDH/PDL, PWH/PWL, EQH/EQL, swings by bias alignment, significance, reach and cleanliness.'],
 ['Map previous day and previous week highs and lows.','Extremes of the prior daily/weekly candle under a stated session convention.'],
 ['Explain the Judas Swing.','Initial counter-bias move early in a session from a defined open, often a sweep, confirmed later by displacement and structure.'],
 ['Distinguish Judas Swing from an ordinary liquidity sweep.','A sweep is any trade through a level; Judas additionally requires bias, timing and confirmation.'],
 ['Identify bullish and bearish SMT Divergence.','Bullish: A lower low, B higher low; bearish: A higher high, B lower high — at time-aligned swings.'],
 ['Select appropriate related instruments for SMT.','Real economic link, co-movement, overlapping hours, comparable data/specs, known driver differences.'],
 ['Explain why SMT requires synchronised data.','Comparisons must be at the same timestamps and timeframe; closed or thin markets create artefacts.'],
 ['Integrate Level 7 with previous CMI levels.','Structure (L2), liquidity (L3), institutional zones (L4), displacement/FVG (L5), premium/discount & PD arrays (L6) as context.'],
 ['Apply the concepts to FCPO analysis.','Use Bursa sessions and specs (25 t, RM1, RM25/tick); treat Judas-style readings and SMT with DCE/CBOT as tested hypotheses only.'],
 ['Identify failed or incomplete models.','No reclaim, no displacement, no structure shift, two-sided sweeps, continuation through the swept level.'],
 ['Explain the limitations of ICT concepts.','They are interpretive frameworks; labels such as manipulation do not prove intent; they must be validated on the specific market and tested.']];
comp.forEach(([c,a],k)=>{assess+=`**${k+1}. ${c}**  \n*Model answer:* ${a}\n\n`;});
fs.writeFileSync(D('assessment.md'),assess);
fs.writeFileSync(D('05_technical_accuracy_report.md'),report+'\n## Detailed check log\n'+detail);
console.log('docs generated');
