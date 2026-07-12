const menu=document.querySelector('.menu');const mobile=document.querySelector('#mobile-nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));mobile.hidden=open});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false')}));document.querySelectorAll('.filter button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter button').forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('.activity-grid article').forEach(card=>card.hidden=filter!=='all'&&!card.dataset.tags.includes(filter))}));document.querySelectorAll('.district-tabs button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.district-tabs button').forEach(b=>b.setAttribute('aria-selected','false'));button.setAttribute('aria-selected','true');const view=document.querySelector('.district-view');view.querySelector('img').src=button.dataset.image;view.querySelector('img').alt=button.dataset.title;view.querySelector('h3').textContent=button.dataset.title;view.querySelector('p').textContent=button.dataset.copy}));document.querySelector('.reference form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#lookup');if(!input.value.trim())return;alert(`Concept search: ${input.value}\n\nIn the production experience, results would appear here without sending you on a town tour.`)});

// town map popups
(function(){
  const wrap=document.querySelector('.map-wrap');
  if(!wrap) return;
  const pop=wrap.querySelector('.map-pop');
  const h4=pop.querySelector('h4'), p=pop.querySelector('p'), a=pop.querySelector('a');
  wrap.querySelectorAll('.map-spot').forEach(b=>{
    b.addEventListener('click',e=>{
      e.stopPropagation();
      h4.textContent=b.dataset.name; p.textContent=b.dataset.desc; a.href=b.dataset.href;
      pop.hidden=false;
      const W=wrap.clientWidth,H=wrap.clientHeight;
      const bx=b.offsetLeft+b.offsetWidth/2;
      let left=bx-pop.offsetWidth/2;
      left=Math.max(10,Math.min(left,W-pop.offsetWidth-10));
      let top=b.offsetTop-pop.offsetHeight-10;
      if(top<10) top=Math.min(b.offsetTop+b.offsetHeight+10,H-pop.offsetHeight-10);
      pop.style.left=left+'px'; pop.style.top=top+'px';
    });
  });
  document.addEventListener('click',e=>{ if(!pop.hidden && !pop.contains(e.target)) pop.hidden=true; });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') pop.hidden=true; });
})();

// inline song chips — plays through a page <audio> so the persistent mini player picks it up
(function(){
  const chips=document.querySelectorAll('.play-chip');
  if(!chips.length) return;
  const audio=document.createElement('audio');
  audio.preload='none';
  document.body.appendChild(audio);
  let current=null;
  function setIcon(chip,playing){ if(chip) chip.querySelector('.pc-icon').innerHTML = playing ? '&#10074;&#10074;' : '&#9654;'; }
  chips.forEach(chip=>{
    chip.addEventListener('click',()=>{
      if(current===chip && !audio.paused){ audio.pause(); setIcon(chip,false); return; }
      setIcon(current,false);
      if(current!==chip){ audio.src=chip.dataset.audio; audio.dataset.title=chip.dataset.title||''; }
      current=chip; audio.play(); setIcon(chip,true);
    });
  });
  audio.addEventListener('pause',()=>setIcon(current,false));
  audio.addEventListener('play',()=>setIcon(current,true));
  audio.addEventListener('ended',()=>setIcon(current,false));
})();

// resume panel hook — live wiring reads member_issue_progress after sign-in and calls this
window.svShowResume=function(epTitle,href){
  const d=document.querySelector('.fc-default'),r=document.querySelector('.fc-resume');
  if(!d||!r) return;
  r.querySelector('.fc-resume-title').textContent=epTitle;
  if(href) r.querySelector('.fc-resume-link').href=href;
  d.hidden=true; r.hidden=false;
};
