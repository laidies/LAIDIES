(async()=>{'use strict';
const root=document.querySelector('[data-original-arrival]');if(!root)return;
const video=root.querySelector('video'),dial=root.querySelector('[data-dial]'),meter=root.querySelector('[data-meter]'),state=root.querySelector('[data-state]'),tracking=root.querySelector('[data-tracking]'),pause=root.querySelector('[data-arrival-pause]'),skip=root.querySelector('[data-arrival-skip]'),replay=document.querySelector('[data-arrival-replay]'),screen=root.querySelector('[data-screen]');
const canvas=root.querySelector('canvas');let render;try{render=await window.createAiLetterRenderer(canvas,video);}catch{root.hidden=true;return;}
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),key='laidies_home_ident_seen';let raf=0,elapsed=0,previous=0,playing=false,phase='dial',phaseClock=0;
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
function measure(){root.style.setProperty('--arrival-top',Math.max(0,root.getBoundingClientRect().top)+'px');}
function finish(){playing=false;cancelAnimationFrame(raf);video.pause();root.hidden=true;replay.hidden=reduced.matches;try{sessionStorage.setItem(key,'1');}catch{}if(root.contains(document.activeElement)&&!reduced.matches)replay.focus({preventScroll:true});}
function draw(t){
 dial.style.opacity=1-ease((t-1)/.08);meter.style.transform=`scaleX(${clamp(t/.95)})`;state.textContent=t<.4?'CONNECTING…':t<.8?'NEGOTIATING CONNECTION…':'CONNECTED · SUNNYVAiLE';
 video.style.opacity=t<1.1?0:1;
 // Only original letter layers move; the background and camera stay fixed.
 const separate=ease((t-1.8)/.55)*(1-ease((t-6.32)/.55));
 canvas.style.opacity=ease((t-1.1)/.18);render(separate,t<2.35||video.ended);
 const revealing=t>=7.25,wipe=clamp((t-7.25)/.85);
 root.toggleAttribute('data-revealing',revealing);
 root.style.setProperty('--reveal',String(wipe*100));
 root.style.clipPath=revealing?`inset(${wipe*100}% 0 0 0)`:'none';
 root.style.opacity=1;
 if(revealing){tracking.style.opacity=1;tracking.style.transform='none';}
 else{const book=(t-1)/.28;tracking.style.opacity=book>=0&&book<=1?Math.sin(book*Math.PI)*.8:0;tracking.style.transform=`translateY(${(book-.5)*70}%)`;}
 root.dataset.phase=t<1.1?'dial':t<1.8?'original-name':t<2.35?'approach':t<6.32?'original-icons':t<6.87?'return':t<7.25?'original-name':'tracking';
}
function tick(now){if(!playing)return;const dt=(now-previous)/1000;previous=now;phaseClock+=dt;
 if(phase==='dial'){elapsed=phaseClock;if(phaseClock>=1.1){phase='intro';phaseClock=0;video.play().catch(finish);}}
 else if(phase==='intro'){elapsed=1.1+video.currentTime;if(video.currentTime>=.7){video.pause();video.currentTime=.7;phase='approach';phaseClock=0;}}
 else if(phase==='approach'){elapsed=1.8+phaseClock;if(phaseClock>=.55){phase='run';phaseClock=0;video.play().catch(finish);}}
 else if(phase==='run'){elapsed=1.65+video.currentTime;if(video.ended){phase='exit';phaseClock=0;}}
 else{elapsed=6.32+phaseClock;if(phaseClock>=1.78)return finish();}
 draw(elapsed);raf=requestAnimationFrame(tick);}
async function start(){cancelAnimationFrame(raf);if(reduced.matches)return finish();root.hidden=false;root.style.opacity=1;replay.hidden=true;elapsed=0;phase='dial';phaseClock=0;playing=false;video.pause();video.currentTime=0;measure();draw(0);if(video.readyState<2)await Promise.race([new Promise(r=>video.addEventListener('canplay',r,{once:true})),new Promise(r=>setTimeout(r,2000))]);if(root.hidden)return;playing=true;pause.textContent='Pause arrival';previous=performance.now();raf=requestAnimationFrame(tick);}
pause.addEventListener('click',()=>{playing=!playing;if(playing){if(phase==='intro'||phase==='run')video.play().catch(finish);previous=performance.now();raf=requestAnimationFrame(tick);}else{cancelAnimationFrame(raf);video.pause();}pause.textContent=playing?'Pause arrival':'Resume arrival';});skip.addEventListener('click',finish);replay.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});start().then(()=>{if(!root.hidden)pause.focus({preventScroll:true});});});
new ResizeObserver(()=>{if(!root.hidden)measure();}).observe(root);video.addEventListener('error',finish);document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause.click();});reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
let seen=false;try{seen=sessionStorage.getItem(key)==='1';}catch{}if(reduced.matches||seen)finish();else start();
})();
