const styles = new URL('./episode-review-design.css', import.meta.url).href;
if (!document.querySelector('link[data-episode-design]')) { const link=document.createElement('link');link.rel='stylesheet';link.href=styles;link.dataset.episodeDesign='';document.head.append(link); }
function mount(){
 if(document.querySelector('.ep-package-header'))return;
 document.body.classList.add('episode-review');
 const route=location.pathname;
 const active=route.includes('/issues/')?'read':route.includes('try-on')?'tryon':route.includes('cards/')?'cards':route.includes('/learn/')?'quiz':route.includes('laidies-card')?'binder':'pack';
 document.body.dataset.episodeSurface=active;
 const header=document.createElement('header');header.className='ep-package-header';
 const links=[['read','Read','/issues/issue-01.html'],['pack','Study pack','/blend-snap.html#episode-01-pack'],['tryon','Try-On','/episode-01-try-on/index.html'],['cards','Trading cards','/episode-01-cards/index.html'],['quiz','Pop Quiz','/learn/quiz.html?issue=1&version=2026-09-06-v3']];
 header.innerHTML=`<div class="ep-package-top"><a class="ep-wordmark" href="https://laidies.ai/" aria-label="LAiDIES home">L<span>Ai</span>DIES</a><span class="ep-issue-label">SEASON ONE <b>/</b> EPISODE 01</span><a class="ep-binder-link" href="/laidies-card.html#episodeBinderVessel">My Episode Binder ↗</a></div><nav class="ep-package-tabs" aria-label="Episode 1 materials">${links.map(([id,label,url])=>`<a href="${url}"${active===id?' aria-current="page"':''}>${label}</a>`).join('')}</nav>`;
 document.body.prepend(header);
 if(document.querySelector('script[src="/__episode-fixture.js"]')){
 const note=document.createElement('div');note.className='ep-preview-note';note.textContent='WORKING REVIEW COPY · Saves in this preview stay in this browser.';header.prepend(note);
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
