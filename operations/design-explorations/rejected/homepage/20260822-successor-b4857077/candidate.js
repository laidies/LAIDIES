(()=>{
  const portal=document.querySelector('.portal');
  const entrance=portal?.querySelector('video');
  const replay=document.querySelector('.replay');
  const mobileReplay=document.querySelector('.mobile-replay');
  const enter=document.querySelector('.portal-enter');
  const toggle=document.querySelector('.portal-toggle');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const open=()=>{if(!portal||!entrance||reduce)return;portal.hidden=false;entrance.currentTime=0;entrance.muted=true;entrance.play().catch(()=>{portal.hidden=true})};
  const close=()=>{if(!portal)return;portal.hidden=true;entrance?.pause();replay?.focus()};
  let entranceSeen=false;
  try{entranceSeen=sessionStorage.getItem('laidies-home-entrance-v10-seen')==='1'}catch{}
  if(reduce||entranceSeen) portal.hidden=true; else {try{sessionStorage.setItem('laidies-home-entrance-v10-seen','1')}catch{}open()}
  entrance?.addEventListener('ended',close);
  entrance?.addEventListener('error',close);
  replay?.addEventListener('click',open);
  mobileReplay?.addEventListener('click',open);
  enter?.addEventListener('click',close);
  toggle?.addEventListener('click',()=>{if(!entrance)return;if(entrance.paused){entrance.play();toggle.textContent='Pause entrance'}else{entrance.pause();toggle.textContent='Resume entrance'}});
  document.querySelector('.method-listen')?.addEventListener('click',open);
  const inlineIdent=document.querySelector('.method-ident video');
  const inlineIdentToggle=document.querySelector('.method-ident-toggle');
  if(reduce) inlineIdent?.pause(); else inlineIdent?.play().catch(()=>{});
  inlineIdentToggle?.addEventListener('click',()=>{if(!inlineIdent)return;if(inlineIdent.paused){inlineIdent.play();inlineIdentToggle.textContent='Pause dial-up sequence'}else{inlineIdent.pause();inlineIdentToggle.textContent='Resume dial-up sequence'}});

  const menu=document.querySelector('.menu');
  const mobileNav=document.querySelector('#mobile-nav');
  menu?.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));mobileNav.hidden=isOpen});
  mobileNav?.querySelectorAll('a,button').forEach(control=>control.addEventListener('click',()=>{mobileNav.hidden=true;menu?.setAttribute('aria-expanded','false')}));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.focus()}});

  fetch('/content/episode-index.json',{cache:'no-store'}).then(response=>{if(!response.ok)throw new Error('episode index unavailable');return response.json()}).then(data=>{
    const published=(data.episodes||[]).filter(episode=>episode.status==='published'&&Number.isFinite(Number(episode.number))&&typeof episode.issueUrl==='string'&&/^issues\/issue-[a-z0-9-]+\.html$/i.test(episode.issueUrl)).sort((a,b)=>Number(a.number)-Number(b.number));
    const latest=published.at(-1);if(!latest)return;
    document.querySelectorAll('[data-latest-episode-link]').forEach(link=>{link.href=`/${latest.issueUrl}`;link.setAttribute('aria-label',`Latest Episode: ${latest.title}`)})
  }).catch(()=>{});

  const formatDate=value=>new Intl.DateTimeFormat('en-CA',{month:'short',day:'numeric',year:'numeric',timeZone:'America/Vancouver'}).format(new Date(`${value}T12:00:00-07:00`));
  fetch('/content/newsstand-daily-issues.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('daily unavailable');return r.json()}).then(data=>{
    const issues=(data.issues||[]).filter(issue=>issue.status==='complete'&&issue.admission?.decision?.startsWith('ACCEPT')).sort((a,b)=>b.editionDate.localeCompare(a.editionDate));
    const issue=issues.find(item=>(item.stories||[]).some(story=>story.status==='published'))||issues[0];
    if(!issue)throw new Error('no admitted Daily');
    const story=(issue.stories||[]).find(item=>item.status==='published');
    document.querySelector('[data-daily-state]').textContent=`Latest complete Daily · ${formatDate(issue.editionDate)}`;
    if(story){document.querySelector('[data-daily-headline]').textContent=story.headline;document.querySelector('[data-daily-summary]').textContent=story.laidies_read||story.what_this_means;document.querySelector('[data-daily-link]').href=`/newsstand.html#${story.slug}`}
    else{document.querySelector('[data-daily-headline]').textContent='The latest complete edition is quiet.';document.querySelector('[data-daily-summary]').textContent='No story has been substituted. Open the NewsStand archive or check back after the next admitted edition.'}
    for(const desk of ['paige_tip','career_life','promptoscope']){const record=(issue.desks||[]).find(item=>item.type===desk);const node=document.querySelector(`[data-desk="${desk}"]`);if(!record||!node)continue;node.querySelector('h3').textContent=record.state==='ready'?record.headline:'At the copy desk';node.querySelector('span').textContent=record.state==='ready'?record.summary:record.emptyState}
  }).catch(()=>{document.querySelector('[data-daily-state]').textContent='The Daily is temporarily unavailable';document.querySelector('[data-daily-headline]').textContent='Nothing has been invented to fill the rack.';document.querySelector('[data-daily-summary]').textContent='Open the NewsStand for the last verified edition and current service state.'});
})();
