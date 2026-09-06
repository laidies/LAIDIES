/* Deterministic timeline. No media autoplay, storage collection, or network APIs. */
(()=>{'use strict';
const root=document.querySelector('[data-ai-arrival]');if(!root)return;
const word=root.querySelector('.ai-arrival__word'),ai=root.querySelector('.ai-arrival__ai');
const wings=[...root.querySelectorAll('.ai-arrival__wing')],dot=root.querySelector('.ai-arrival__dot'),symbol=root.querySelector('.ai-arrival__symbol'),nextSymbol=root.querySelector('.ai-arrival__symbol-next');
const dial=root.querySelector('.ai-arrival__dial'),meter=root.querySelector('.ai-arrival__meter span'),state=root.querySelector('.ai-arrival__dial-state');
const caption=root.querySelector('.ai-arrival__caption'),tracking=root.querySelector('.ai-arrival__tracking'),art=root.querySelector('.ai-arrival__art');
const pause=root.querySelector('[data-arrival-pause]'),skip=root.querySelector('[data-arrival-skip]'),replay=document.querySelector('[data-arrival-replay]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),duration=6200,key='laidies_home_ident_seen';
let raf=0,elapsed=0,previous=0,playing=false,full=1,focus=1,offset=0;
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
const between=(t,a,b)=>ease((t-a)/(b-a));
function measure(){root.style.setProperty('--arrival-top',Math.max(0,root.getBoundingClientRect().top)+'px');const old=word.style.transform;word.style.transform='none';const w=word.offsetWidth;full=Math.min(1,root.clientWidth*.86/w);focus=root.clientWidth*.48/ai.offsetWidth;focus=Math.min(focus,root.clientHeight*.50/word.offsetHeight);offset=w/2-(ai.offsetLeft+ai.offsetWidth/2);word.style.transform=old;}
function draw(ms){const t=ms/1000;const zoom=between(t,1.72,2.42)*(1-between(t,4.70,5.35));const scale=full+(focus-full)*zoom;
word.style.transform=`translate(-50%,-50%) translateX(${offset*scale*zoom}px) scale(${scale})`;
word.style.opacity=String(between(t,1.06,1.32));
wings.forEach((w,i)=>{w.style.opacity=String(1-between(t,1.95,2.40)*(1-between(t,4.70,5.22)));w.style.transform=`translateX(${(i?-1:1)*-20*zoom}px)`;});
art.style.transform=`scale(${1.04+.09*zoom})`;art.style.opacity=String(.30-.14*zoom);
dial.style.opacity=String(1-between(t,.93,1.11));meter.style.transform=`scaleX(${between(t,.05,.86)})`;state.textContent=t<.36?'CONNECTING…':t<.72?'FINDING SUNNYVAiLE…':'CONNECTION ESTABLISHED';
caption.style.opacity=String(between(t,5.24,5.5));
let icon=-1,local=0;if(t>=2.42&&t<4.70){icon=Math.min(5,Math.floor((t-2.42)/.38));local=((t-2.42)-icon*.38)/.38;}
if(icon>=0){const enter=icon===0?between(local,0,.20):1,mix=between(local,.78,1);symbol.style.backgroundPosition=`${icon*20}% 50%`;symbol.style.opacity=String(enter*(1-mix));symbol.style.transform=`translateX(-50%) scale(${1-.07*mix}) rotate(${-5*mix}deg)`;nextSymbol.style.backgroundPosition=`${Math.min(5,icon+1)*20}% 50%`;nextSymbol.style.opacity=String(icon<5?mix:0);nextSymbol.style.transform=`translateX(-50%) scale(${.93+.07*mix}) rotate(${5*(1-mix)}deg)`;dot.style.opacity=String(icon===0?1-enter:icon===5?mix:0);}else{symbol.style.opacity='0';nextSymbol.style.opacity='0';dot.style.opacity='1';}
let sweep=0,travel=0;if(t>=.98&&t<1.22){sweep=Math.sin((t-.98)/.24*Math.PI)*.64;travel=(t-.98)/.24;}if(t>=5.87&&t<=6.2){sweep=Math.sin((t-5.87)/.33*Math.PI)*.65;travel=(t-5.87)/.33;}tracking.style.opacity=String(sweep);tracking.style.transform=`translateY(${(travel-.5)*root.clientHeight*1.8}px)`;
root.style.opacity=String(1-between(t,5.98,6.2));root.dataset.beat=t<1.1?'dial':t<1.72?'word':t<2.42?'approach':t<4.7?'icons':t<5.35?'return':'settle';root.dataset.elapsed=String(Math.round(ms));
}
function seen(){try{return sessionStorage.getItem(key)==='1';}catch{return false;}}
function finish(){playing=false;cancelAnimationFrame(raf);root.hidden=true;if(replay)replay.hidden=reduced.matches;try{sessionStorage.setItem(key,'1');}catch{}if(root.contains(document.activeElement)&&replay&&!reduced.matches)replay.focus({preventScroll:true});}
function tick(now){if(!playing)return;elapsed+=now-previous;previous=now;draw(Math.min(duration,elapsed));if(elapsed>=duration)finish();else raf=requestAnimationFrame(tick);}
async function start(){cancelAnimationFrame(raf);if(reduced.matches){finish();return;}root.hidden=false;root.style.opacity='1';if(replay)replay.hidden=true;playing=false;elapsed=0;measure();draw(0);await Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,1500))]);if(root.hidden)return;measure();playing=true;pause.textContent='Pause arrival';previous=performance.now();raf=requestAnimationFrame(tick);}
pause.addEventListener('click',()=>{playing=!playing;if(playing){previous=performance.now();raf=requestAnimationFrame(tick);}else cancelAnimationFrame(raf);pause.textContent=playing?'Pause arrival':'Resume arrival';});skip.addEventListener('click',finish);replay?.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});start().then(()=>{if(!root.hidden)pause.focus({preventScroll:true});});});
new ResizeObserver(()=>{if(!root.hidden){measure();draw(elapsed);}}).observe(root);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){playing=false;cancelAnimationFrame(raf);pause.textContent='Resume arrival';}});reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
if(reduced.matches||seen())finish();else start();
})();
