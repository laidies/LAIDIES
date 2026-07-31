(() => {
  'use strict';
  const query = new URLSearchParams(location.search);
  const fixture = query.get('fixture') || 'live';
  document.body.dataset.fixture = fixture;
  const edit = ['breaking','daily','weekly','tribune'];
  const labels = {breaking:'The Breaking',daily:'The Daily',weekly:'The Weekly',tribune:'The Tribune'};
  const data = structuredClone(window.NEWSSTAND_DATA || {});
  const contract = window.NewsstandContract;
  const now = fixture === 'baseline' ? '2026-07-25T20:00:00Z' : new Date().toISOString();
  if (fixture === 'malformed') data.schemaVersion = 'broken';
  if (fixture === 'hold') data.datasetStatus = 'hold';
  if (fixture === 'retracted' && data.stories && data.stories[1]) { data.publications.tribune.lastCheckedAt = now; data.stories[1].status='retracted'; data.stories[1].retraction={retractedAt:now,reason:'Fixture only: preserved withdrawal notice.',owner:'NewsStand independent review',record:'fixture'}; }
  if (fixture === 'quiet') { Object.values(data.publications).forEach(p => {p.status='quiet';p.lastCheckedAt=now;p.note='Fixture only: no qualified issue is filed.';}); }
  if (fixture === 'stale') { Object.values(data.publications).forEach(p => {p.status='current';p.lastCheckedAt='2020-01-01T00:00:00Z';}); }
  const ds = contract ? contract.datasetState(data, now) : {state:'load-failure',publications:{}};
  const boardTitle = document.querySelector('#board-title'), boardDetail = document.querySelector('#board-detail'), boardDates=document.querySelector('#board-dates');
  const reader=document.querySelector('#reader'), readerTitle=document.querySelector('#reader-title'), readerEdition=document.querySelector('#reader-edition'), readerDate=document.querySelector('#reader-date'), readerContent=document.querySelector('#reader-content');
  let invoker=null, selected=null, audio=null;
  const fmt = value => value ? new Date(value).toLocaleDateString('en-CA',{year:'numeric',month:'short',day:'numeric'}) : 'No issue filed';
  const escape = value => { const n=document.createElement('span'); n.textContent=value ?? ''; return n.innerHTML; };
  function stateFor(edition){ return contract ? contract.effectivePublicationState(data.publications?.[edition],now) : 'unavailable'; }
  function displayStateFor(edition){
    if (ds.state === 'load-failure') return 'desk unavailable';
    if (ds.state === 'hold') return 'desk hold';
    if (ds.state === 'no-data') return 'no approved data';
    return stateFor(edition);
  }
  function renderBoard(){
    const details={ready:'A dated paper is on the rack.',clear:'A clear day at the NewsStand.',stale:'Paige’s dated source check is overdue.',unavailable:'Part of Paige’s publication record is unavailable.','load-failure':'The publication record did not load.',hold:'The whole desk is on editorial hold.','no-data':'No approved story data is filed.'};
    const headings={ready:'Paige’s desk is dated.',clear:'Quiet desk.',stale:'Desk check overdue.',unavailable:'Desk record unavailable.','load-failure':'Desk record failed.',hold:'Editorial hold.', 'no-data':'No stories filed.'};
    boardTitle.textContent=headings[ds.state] || 'Checking Paige’s desk.';
    boardDetail.textContent=details[ds.state] || 'Publication state is being checked.';
    boardDates.replaceChildren();
    edit.forEach(e=>{const displayState=displayStateFor(e),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=labels[e];dd.textContent=`${displayState} · checked ${fmt(data.publications?.[e]?.lastCheckedAt)}`;boardDates.append(dt,dd); const paper=document.querySelector(`[data-paper-state="${e}"]`);paper.textContent=displayState;paper.dataset.state=displayState;});
  }
  function decision(edition,story=null,scope='paper'){ return contract ? contract.accessDecision(data,story,{edition,scope},now) : {canExpose:false,state:'load-failure',reason:'The reader contract is unavailable.'}; }
  function available(edition){ return (data.stories||[]).filter(s=>s.edition===edition && decision(edition,s).canExpose); }
  function setPressed(edition){ document.querySelectorAll('[data-edition]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.edition===edition))); }
  function focusReaderTitle(){ requestAnimationFrame(()=>readerTitle.focus({preventScroll:true})); }
  function showNotice(title,message){readerEdition.textContent=selected?labels[selected]:'NewsStand';readerTitle.textContent=title;readerDate.textContent='';readerContent.innerHTML=`<p class="notice" tabindex="-1"><strong>${escape(message)}</strong></p>`;focusReaderTitle();}
  function showPaper(edition,origin){ invoker=origin||invoker; selected=edition; setPressed(edition); const access=decision(edition); reader.hidden=false; if(!access.canExpose){showNotice(`${labels[edition]} is not on the counter.`,access.reason); readerTitle.focus({preventScroll:true}); reader.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});return;}
    const stories=available(edition); readerEdition.textContent=labels[edition];readerTitle.textContent=stories.length?`${labels[edition]} — front page`:`${labels[edition]} is clear.`;readerDate.textContent=`Dated check: ${fmt(data.publications[edition].lastCheckedAt)}`;readerContent.innerHTML=stories.length?stories.map(s=>`<a class="story-card" href="#${encodeURIComponent(s.slug)}" data-slug="${escape(s.slug)}"><p class="eyebrow">${escape(labels[edition])} · checked ${escape(fmt(s.lastCheckedAt))}</p><h3>${escape(s.headline)}</h3><span>Open the story →</span></a>`).join(''):`<p class="notice">${escape(data.publications[edition].note||'No qualified issue is filed.')}</p>`; readerTitle.focus({preventScroll:true});reader.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); }
  function showStory(slug,origin){ const story=(data.stories||[]).find(s=>s.slug===slug); invoker=origin||invoker;reader.hidden=false;if(!story){showNotice('Story unavailable.','No story record exists at this preserved route.');return;} selected=story.edition;setPressed(selected);const access=decision(selected,story,'hash'); if(!access.canExpose){showNotice(access.state==='retracted'?'Retracted.':'Story unavailable.',access.reason);return;} readerEdition.textContent=labels[selected];readerTitle.textContent=story.headline;readerDate.textContent=`Published ${fmt(story.publishedAt)} · checked ${fmt(story.lastCheckedAt)}`;readerContent.innerHTML=`<div class="article"><h3>${escape(story.thread||'The story')}</h3><p>${story.the_story}</p><h3>The LAiDIES Read</h3><p>${story.laidies_read}</p><h3>What this means</h3><p>${story.what_this_means}</p><h3>Sources</h3><ul>${(story.sources||[]).map(s=>`<li><a href="${escape(s.url)}">${escape(s.label)}</a></li>`).join('')}</ul></div>`;focusReaderTitle(); }
  document.querySelectorAll('[data-edition]').forEach(button=>button.addEventListener('click',()=>showPaper(button.dataset.edition,button)));
  document.querySelector('#put-back').addEventListener('click',()=>{reader.hidden=true;setPressed('');const target=invoker||document.querySelector('[data-edition]');target?.focus({preventScroll:true});target?.scrollIntoView({behavior:'auto',block:'center'});selected=null;});
  document.querySelector('#reader-content').addEventListener('click',event=>{const card=event.target.closest('[data-slug]');if(card){event.preventDefault();showStory(card.dataset.slug,card);history.replaceState(null,'','#'+card.dataset.slug);}});
  document.querySelector('#search-form').addEventListener('submit',event=>{event.preventDefault();const q=document.querySelector('#search').value.trim().toLowerCase(),out=document.querySelector('#search-status');if(!q){out.textContent='Type a headline, topic, source, or tag to search the crate.';return;}const matches=(data.stories||[]).filter(s=>decision(s.edition,s,'search').canExpose && [s.headline,s.thread,s.tags?.join(' '),(s.sources||[]).map(x=>x.label).join(' ')].join(' ').toLowerCase().includes(q));out.replaceChildren();if(!matches.length){out.textContent='No eligible back issue matches that search. Held, stale, unavailable, and retracted bodies stay out of the crate.';return;}out.textContent=`${matches.length} eligible result${matches.length===1?'':'s'} found.`;matches.forEach(s=>{const b=document.createElement('button');b.className='search-result';b.type='button';b.textContent=`${labels[s.edition]} · ${s.headline}`;b.addEventListener('click',()=>showStory(s.slug,b));out.append(b);});});
  document.querySelector('#radio').addEventListener('click',function(){if(audio){audio.pause();audio=null;this.setAttribute('aria-pressed','false');this.textContent='Play “The Newsstand”';return;} audio=new Audio('/content/music/sunnyvaile-newsstand.mp3');audio.addEventListener('ended',()=>this.click(),{once:true});audio.play().then(()=>{this.setAttribute('aria-pressed','true');this.textContent='Pause “The Newsstand”';}).catch(()=>{audio=null;this.setAttribute('aria-pressed','false');this.textContent='Audio is unavailable';});});
  const roomImage=document.querySelector('.room__paige'),room=document.querySelector('.room'),roomFallback=document.querySelector('#room-fallback');
  function showRoomFallback(){roomImage.hidden=true;roomFallback.hidden=false;room.dataset.artState='failed';}
  roomImage.addEventListener('error',showRoomFallback,{once:true});
  if (fixture === 'image-failure' || (roomImage.complete && roomImage.naturalWidth === 0)) showRoomFallback();
  document.querySelectorAll('[data-js-enable]').forEach(control=>{control.disabled=false;});
  window.addEventListener('hashchange',()=>{const slug=decodeURIComponent(location.hash.slice(1));if(slug)showStory(slug,null);}); renderBoard(); if(location.hash)showStory(decodeURIComponent(location.hash.slice(1)),null);
})();
