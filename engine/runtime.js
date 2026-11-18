/* Deterministic, seekable motion-graphics runtime.
   Every visual state is a pure function of time t, so each frame can be
   captured exactly (Playwright → ffmpeg) and previewed live in a browser. */
(function(G){
'use strict';
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease={
  out:p=>1-Math.pow(1-p,3),
  inout:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,
  lin:p=>p,
  back:p=>{const c1=1.4,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2);}
};
G.EASE=ease; G.clamp=clamp;
G.VIDEO=function(def){G.__VIDEO=def;};

const SVGNS='http://www.w3.org/2000/svg';
function h(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild;}
function svgEl(tag,attrs){const e=document.createElementNS(SVGNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);return e;}
G.h=h; G.svgEl=svgEl;

/* ---------------- Scene context ---------------- */
class Scene{
  constructor(def,tl,index,root){
    this.def=def; this.tl=tl; this.index=index; this.root=root;
    this.reveals=[]; this.tweens=[]; this.steps=[];
    this.dur=tl.dur;
  }
  /* start of narration line i (scene-local seconds) */
  c(i,off=0){const L=this.tl.lines; if(i<0)return off; if(i>=L.length)return this.dur+off; return L[i].t0+off;}
  /* end of narration line i */
  e(i,off=0){const L=this.tl.lines; if(i>=L.length)return this.dur+off; return L[i].t1+off;}
  /* fraction through line i */
  m(i,f=.5){return this.c(i)+(this.e(i)-this.c(i))*f;}
  add(x,o={}){
    const el=typeof x==='string'?h(x):x;
    const parent=o.parent||this.root;
    if(o.x!=null){el.style.position='absolute';el.style.left=o.x+'px';}
    if(o.y!=null){el.style.position='absolute';el.style.top=o.y+'px';}
    if(o.w!=null)el.style.width=o.w+'px';
    if(o.h!=null)el.style.height=o.h+'px';
    if(o.style)Object.assign(el.style,o.style);
    parent.appendChild(el);
    if(o.at!==undefined&&o.at!==null)this.reveal(el,o.at,o);
    return el;
  }
  reveal(el,at,o={}){
    this.reveals.push({el,at,d:o.d||.6,anim:o.anim||'up',out:o.out,od:o.od||.45,dist:o.dist||26,origin:o.origin});
    if(o.origin)el.style.transformOrigin=o.origin;
    return el;
  }
  /* custom tween: fn(p) receives eased progress, always called (deterministic) */
  tween(at,d,fn,e='inout'){this.tweens.push({at,d,fn,e});}
  /* discrete state: fn(on) where on = t>=at */
  step(at,fn){this.steps.push({at,fn});}
  cls(el,at,c,until){this.steps.push({at,fn:on=>{},el,c,until});}
  /* draw an SVG path/line by stroke-dashoffset */
  draw(el,at,d=1,e='inout'){
    const len=el.getTotalLength?el.getTotalLength():1000;
    el.style.strokeDasharray=len+' '+len;
    this.tween(at,d,p=>{el.style.strokeDashoffset=String(len*(1-p));el.style.opacity=p>0?1:0;},e);
  }
  count(el,from,to,at,d,fmt){this.tween(at,d,p=>{el.textContent=fmt(from+(to-from)*p);},'out');}
  seek(t){
    this._t=t;
    for(const r of this.reveals){
      let p=clamp((t-r.at)/r.d), q=ease.out(p);
      let op=q, tr='';
      switch(r.anim){
        case 'up':tr=`translateY(${(1-q)*r.dist}px)`;break;
        case 'down':tr=`translateY(${-(1-q)*r.dist}px)`;break;
        case 'left':tr=`translateX(${-(1-q)*r.dist*1.4}px)`;break;
        case 'right':tr=`translateX(${(1-q)*r.dist*1.4}px)`;break;
        case 'scale':tr=`scale(${.92+.08*q})`;break;
        case 'pop':tr=`scale(${.6+.4*ease.back(p)})`;break;
        case 'fade':break;
        case 'wipe':r.el.style.clipPath=`inset(0 ${(1-q)*100}% 0 0)`;op=p>0?1:0;break;
        case 'wipev':r.el.style.clipPath=`inset(${(1-q)*100}% 0 0 0)`;op=p>0?1:0;break;
      }
      if(r.out!=null){const po=clamp((t-r.out)/r.od);op*=1-ease.inout(po);}
      r.el.style.opacity=op;
      if(r.anim!=='fade'&&r.anim!=='wipe'&&r.anim!=='wipev')r.el.style.transform=tr;
      r.el.style.visibility=op<=0.001?'hidden':'visible';
    }
    for(const w of this.tweens){w.fn(ease[w.e](clamp((t-w.at)/w.d)));}
    for(const s of this.steps){
      const on=t>=s.at&&(s.until==null||t<s.until);
      if(s.el)s.el.classList.toggle(s.c,on); else s.fn(on);
    }
  }
}
G.Scene=Scene;

/* ---------------- Player ---------------- */
const Player={
  build(){
    const def=G.__VIDEO, TL=G.TIMELINE;
    const scenes=G.assembleScenes(def);
    this.def=def; this.TL=TL; this.total=TL.total;
    const host=document.getElementById('scenes');
    this.scenes=scenes.map((sd,i)=>{
      const root=h('<div class="scene"></div>'); host.appendChild(root);
      const S=new Scene(sd,TL.scenes[i],i,root);
      S.video=def;
      sd.build(S,def);
      return S;
    });
    const H=document.getElementById('hdr');
    H.querySelector('.badge').textContent=def.badge;
    H.querySelector('.l1').textContent=def.moduleLabel;
    H.querySelector('.l2').textContent='CAPITAL MARKET INSTITUTE · FUTURES SERIES';
    H.querySelector('.r1').textContent=`VIDEO ${def.num} — ${def.short}`;
    this.H=H; this.sub=document.querySelector('#sub span'); this.prog=document.querySelector('#prog i');
    this.subs=[]; TL.scenes.forEach(sc=>sc.lines.forEach(l=>l.subs.forEach(s=>this.subs.push({t0:sc.t0+s.t0,t1:sc.t0+s.t1,text:s.text}))));
    this.lastSub=null; this.lastR2=null;
  },
  seek(t){
    const TL=this.TL, FADE=.35;
    let hdrOp=1, cur=0;
    this.scenes.forEach((S,i)=>{
      const sc=TL.scenes[i];
      const vis=t>=sc.t0&&t<sc.t1+(i===this.scenes.length-1?1:0);
      S.root.style.display=vis?'block':'none';
      if(!vis)return;
      cur=i;
      const lt=t-sc.t0;
      let op=1;
      if(i>0)op=Math.min(op,clamp(lt/FADE));
      if(i<this.scenes.length-1)op=Math.min(op,clamp((sc.dur-lt)/FADE));
      S.root.style.opacity=op;
      S.seek(lt);
      if(S.def.noHeader)hdrOp=0;
    });
    this.H.style.opacity=hdrOp;
    document.getElementById('sub').style.opacity=1;
    const S=this.scenes[cur];
    const r2=S.def.noHeader?'':`SCENE ${S.def.sceneNo} · ${S.def.label}`;
    if(r2!==this.lastR2){this.H.querySelector('.r2').textContent=r2;this.lastR2=r2;}
    let s=null; for(const x of this.subs){if(t>=x.t0&&t<x.t1){s=x;break;}}
    const txt=s?s.text:'';
    if(txt!==this.lastSub){this.sub.textContent=txt;this.sub.style.display=txt?'inline-block':'none';this.lastSub=txt;}
    this.prog.style.width=(clamp(t/this.total)*100)+'%';
  }
};
G.Player=Player;
G.seek=t=>Player.seek(t);

G.addEventListener('load',async()=>{
  await document.fonts.ready;
  Player.build();
  Player.seek(0);
  const q=new URLSearchParams(location.search);
  if(q.get('t'))Player.seek(parseFloat(q.get('t')));
  if(q.get('play')){
    const a=new Audio(`../build/${q.get('v')}/narration.m4a`);
    const start=performance.now()/1000-(parseFloat(q.get('t')||0));
    a.currentTime=parseFloat(q.get('t')||0); a.play().catch(()=>{});
    const loop=()=>{const t=performance.now()/1000-start;Player.seek(t);if(t<Player.total)requestAnimationFrame(loop);};
    requestAnimationFrame(loop);
  }
  G.__READY=true;
});
})(window);
