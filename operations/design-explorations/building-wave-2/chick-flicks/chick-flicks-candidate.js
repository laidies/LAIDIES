(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const fixtures = new URLSearchParams(location.search).get('fixture') || '';
  const LOCAL_FAV = 'laidies_favorite_episode', LOCAL_LAST = 'laidies_cf_last_rental';
  const TOPICS = {prompting:[1,2,4,5],style:[2,3],everyday:[1,4,5],ethics:[3],history:[4],creative:[]};
  const fallback = [{number:1,title:'On Wednesdays We Do AI',status:'published',issueUrl:'issues/issue-01.html'},{number:2,title:'Tell Me What You Want',status:'published',issueUrl:'issues/issue-02.html'},{number:3,title:'The Burn Book Problem',status:'published',issueUrl:'issues/issue-03.html'},{number:4,title:'The Founding Mothers',status:'published',issueUrl:'issues/issue-04.html'},{number:5,title:'The Super Models',status:'draft',issueUrl:null}];
  let all = [], aisle = 'all', selected = null;
  const safeStore = {
    blocked:false,
    get(key){try {
      if(fixtures === 'storage-denied') throw Error();
      if(key === LOCAL_LAST && fixtures === 'last-rental-valid') return '04';
      if(key === LOCAL_LAST && fixtures === 'last-rental-stale') return '05';
      if(key === LOCAL_LAST && fixtures === 'last-rental-corrupt') return '{wrong';
      if(key === LOCAL_LAST && fixtures === 'clear-denied') return '04';
      return localStorage.getItem(key);
    }catch{this.blocked=true;return null}},
    set(key,value){try {if(fixtures === 'storage-denied')throw Error();localStorage.setItem(key,value);return true}catch{this.blocked=true;return false}},
    remove(key){try{if(fixtures === 'storage-denied'||fixtures === 'clear-denied')throw Error();localStorage.removeItem(key);return true}catch{this.blocked=true;return false}}
  };
  const n = (x) => String(x).padStart(2,'0');
  const safeUrl = (value) => typeof value === 'string' && /^issues\/issue-0[1-4]\.html$/.test(value) ? value : '';
  const valid = (raw) => Array.isArray(raw?.episodes) ? raw.episodes.filter((x) => Number.isInteger(x.number) && x.number > 0 && typeof x.title === 'string' && ['published','draft'].includes(x.status)) : [];
  const released = (e) => e.status === 'published' && !!safeUrl(e.issueUrl);
  const visible = () => aisle === 'all' ? all : (aisle === 'unfiled' ? all.filter(x=>!Object.values(TOPICS).some(ids=>ids.includes(x.number))) : all.filter(x=>(TOPICS[aisle]||[]).includes(x.number)));
  function status(message, retry=false){ $('#currentTruth').textContent=message; $('#wallStatus').textContent=message; $('#retry').hidden=!retry; $('#latest').disabled=true; }
  function storageMessage(message=''){const fav=safeStore.get(LOCAL_FAV); const favourite=all.find(e=>n(e.number)===fav); $('#deviceStatus').textContent=message || (favourite ? `Favourite saved on this device: Episode ${n(favourite.number)}.` : 'No favourite tape saved on this device.');}
  function validatedLastRental(){
    const raw=safeStore.get(LOCAL_LAST);
    if(!raw)return null;
    if(!/^\d{2}$/.test(raw)){safeStore.remove(LOCAL_LAST);return null;}
    const episode=all.find(e=>n(e.number)===raw);
    if(!episode||!released(episode)){safeStore.remove(LOCAL_LAST);return null;}
    return episode;
  }
  function paintReturnVisit(){
    const episode=validatedLastRental();
    const panel=$('#returnVisit');
    panel.hidden=!episode;
    if(!episode)return;
    panel.dataset.episode=n(episode.number);
    $('#returnCopy').textContent=`Episode ${n(episode.number)} — ${episode.title} was the last tape taken home on this device. Continue it or clear this local hint and browse from the beginning.`;
    $('#continueRental').onclick=()=>{showRental(episode);$('#rental').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});};
  }
  function clearLastRental(){
    if(!safeStore.remove(LOCAL_LAST)){$('#returnCopy').textContent='This browser would not let the store clear its device-only last-rental hint. Nothing else was changed.';return false;}
    $('#returnVisit').hidden=true;
    $('#deviceStatus').textContent='Last-rental hint cleared on this device. Browse the full wall to start over.';
    $('#latest').focus();
    return true;
  }
  function showRental(e){selected=e; const okay=released(e); $('#selectedLabel').textContent=`EP ${n(e.number)} · ${okay?'RENT':'HELD'}`; $('#rentalTitle').textContent=okay ? e.title : e.status==='draft'?'This tape is still forthcoming.':'This tape is unavailable.'; $('#rentalCopy').textContent=okay?'Choose Take the tape home for its full issue. Saving a favourite or rental stays on this device.':e.status==='draft'?'That case is a shelf promise, not a finished episode. Becky will move it to New Releases when it is ready.':'Its issue destination could not be verified, so Chick Flicks will not offer a broken rental link.'; $('#due').textContent=okay?'Return by Friday · spiritually':'No due date, fee, account, or completion is created.'; $('#takeHome').hidden=!okay; $('#favourite').hidden=!okay; if(okay) $('#takeHome').href='../../../../'+safeUrl(e.issueUrl); $('#rental').focus({preventScroll:true}); storageMessage(); }
  function render(){const list=visible(); $('#wall').innerHTML=''; list.forEach(e=>{const b=document.createElement('button');const okay=released(e);b.className='tape'+(okay?'':' is-held'); b.type='button';b.innerHTML=`${e.number===Math.max(...all.filter(released).map(x=>x.number))?'<span class="tape__latest">LATEST</span>':''}<img src="../../../../assets/sunnyvaile-interiors/episode-vhs-boxes/ep-${n(e.number)}.webp" alt="" width="554" height="720"><span class="tape__tag">EP ${n(e.number)} · ${okay?'RENT':e.status==='draft'?'COMING SOON':'UNAVAILABLE'}</span>`;b.setAttribute('aria-label',okay?`Rent Episode ${n(e.number)} — ${e.title}`:`Episode ${n(e.number)} — ${e.title}, ${e.status==='draft'?'coming soon':'unavailable'}`);b.addEventListener('click',()=>showRental(e));b.querySelector('img').addEventListener('error',()=>{b.querySelector('img').alt=`Episode ${n(e.number)} cover unavailable`; b.querySelector('img').src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="554" height="720"%3E%3Crect width="100%25" height="100%25" fill="%23202c6b"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3EEP '+n(e.number)+'%3C/text%3E%3C/svg%3E';});$('#wall').append(b)});const count=list.filter(released).length; $('#wallStatus').textContent=`${aisle==='all'?'Season 1':aisle} · ${count} available · ${list.filter(e=>e.status==='draft').length} coming soon`;}
  function init(records){all=valid(records);if(!all.length){status('The tape manifest is unavailable. The wall is closed until it can be checked again.',true);return;} const latest=[...all].filter(released).at(-1); $('#currentTruth').textContent=latest?`Becky has Episode ${n(latest.number)} — ${latest.title} on the New Releases wall.`:'No released tape is available right now.';$('#latest').disabled=!latest;$('#latest').onclick=()=>{showRental(latest);$('#rental').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});};render();storageMessage();paintReturnVisit();requestAnimationFrame(()=>{document.body.dataset.viewportFit=document.documentElement.scrollWidth<=window.innerWidth?'pass':'fail';});if(fixtures==='clear-denied'){const control=$('#clearRental');control.focus();const cleared=clearLastRental();document.body.dataset.clearDenied=!cleared&&!$('#returnVisit').hidden&&/would not let the store clear/i.test($('#returnCopy').textContent)&&document.activeElement===control?'pass':'fail';}if(fixtures==='browser-reload-clear'&&sessionStorage.getItem('cf_reload_phase')==='ready'){sessionStorage.removeItem('cf_reload_phase');$('#clearRental').focus();const before=document.activeElement===($('#clearRental'));const cleared=clearLastRental();document.body.dataset.browserReloadClear=before&&cleared&&!localStorage.getItem(LOCAL_LAST)&&document.activeElement===($('#latest'))?'pass':'fail';}}
  async function load(){status('Checking the Season 1 tape manifest…'); if(fixtures==='missing-index'){status('The tape manifest is unavailable. The wall is closed until it can be checked again.',true);return;} try{const records=fixtures==='malformed-index'?{episodes:[{number:'x'}]}:await fetch('../../../../content/episode-index.json').then(r=>{if(!r.ok)throw Error();return r.json()});init(records)}catch{init({episodes:fallback});}}
  $('#aisles').addEventListener('click',(event)=>{const b=event.target.closest('button[data-aisle]');if(!b)return;aisle=b.dataset.aisle;document.querySelectorAll('[data-aisle]').forEach(x=>x.classList.toggle('is-active',x===b));render();});
  $('#retry').addEventListener('click',load);$('#clearRental').addEventListener('click',clearLastRental);$('#favourite').addEventListener('click',()=>{if(!selected||!released(selected))return;const value=n(selected.number);if(safeStore.get(LOCAL_FAV)===value){const saved=safeStore.remove(LOCAL_FAV);storageMessage(saved?'Favourite removed from this device.':'This browser would not let the store change its device-only favourite.');}else{const saved=safeStore.set(LOCAL_FAV,value);storageMessage(saved?`Favourite saved on this device: Episode ${value}.`:'This browser would not let the store save a device-only favourite.');}});$('#takeHome').addEventListener('click',()=>{if(selected&&released(selected)){const saved=safeStore.set(LOCAL_LAST,n(selected.number)); if(!saved) storageMessage('This browser would not let the store save a device-only last rental.');}});if(fixtures==='browser-reload-clear'&&!sessionStorage.getItem('cf_reload_phase')){localStorage.setItem(LOCAL_LAST,'04');sessionStorage.setItem('cf_reload_phase','ready');location.reload();}else{load();}
})();
