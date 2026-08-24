(()=>{
  const header=document.querySelector('.topbar');
  const menu=document.querySelector('.menu');
  menu?.addEventListener('click',()=>{const open=header.dataset.open==='true';header.dataset.open=String(!open);menu.setAttribute('aria-expanded',String(!open));});
  const portal=document.querySelector('.portal');
  const video=portal?.querySelector('video');
  const toggle=portal?.querySelector('.portal-toggle');
  const skip=portal?.querySelector('.portal-skip');
  const params=new URLSearchParams(location.search);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen=(()=>{try{return sessionStorage.getItem('laidies-home-ident-v10')==='seen';}catch{return true;}})();
  const forced=params.get('show-ident')==='1';
  const bypass=params.get('skip-ident')==='1';
  const close=()=>{if(!portal)return;portal.hidden=true;video?.pause();try{sessionStorage.setItem('laidies-home-ident-v10','seen');}catch{}document.querySelector('.hero-actions a')?.focus();};
  if(portal && video && !bypass && !reduced && (forced||!seen)){
    portal.hidden=false;
    video.muted=true;
    video.play().catch(close);
    video.addEventListener('ended',close,{once:true});
    video.addEventListener('error',close,{once:true});
    skip?.addEventListener('click',close);
    toggle?.addEventListener('click',()=>{if(video.paused){video.play();toggle.textContent='Pause ident';}else{video.pause();toggle.textContent='Resume ident';}});
  }else if(portal){portal.hidden=true;}
})();
