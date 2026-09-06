(function(global){
  'use strict';
  const TITLES={'01':'On Wednesdays We Do AI','02':'Tell Me What You Want','03':'The Burn Book Problem','04':'The Founding Mothers'};
  const CURRENT_EXERCISE='ep01-same-task-different-drafts@2026-09-06-v1';
  function element(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
  function formatDate(value){const date=new Date(value);return Number.isFinite(date.valueOf())?date.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'Date unavailable';}
  function render(documentValue,host){
    host.replaceChildren();
    for(const number of ['01','02','03','04']){
      const episode=documentValue.episodes[number];
      const page=element('details',undefined,'episode-binder-page');
      const summary=element('summary');summary.append(element('span',`EP ${number}`,'episode-binder-tab'),element('span',TITLES[number]));page.append(summary);
      const inside=element('div',undefined,'episode-binder-pocket');
      const count=episode?Object.values(episode).reduce((n,items)=>n+Object.keys(items).length,0):0;
      if(!count)inside.append(element('p','Nothing saved for this episode yet.'));
      else {
        page.open=true;
        for(const [key,exercise] of Object.entries(episode.exercises)){
          const card=element('article',undefined,'episode-binder-item');
          const fields=exercise.input_state.fields||exercise.input_state;
          card.append(element('h4','Try-On exercise'),element('p',fields.task||'Saved exercise'),element('p',`Saved ${formatDate(exercise.updated_at)}`,'episode-binder-date'));
          const exerciseId=key.split('@')[0];
          const currentInstance=key===CURRENT_EXERCISE||key.endsWith('@2026-09-06-v1')&&/^ep01-same-task-different-drafts:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(exerciseId);
          if(number==='01'&&currentInstance){const link=element('a','Open my exercise','episode-binder-open');link.href=`/episode-01-try-on/?exercise=${encodeURIComponent(exerciseId)}&version=2026-09-06-v1`;card.append(link);}
          else card.append(element('p','This earlier exercise is kept in your binder. Its editing page is not available here yet.'));
          inside.append(card);
        }
        for(const pack of Object.values(episode.packs)){
          const card=element('article',undefined,'episode-binder-item');card.append(element('h4','Study Pack'),element('p',`Saved ${formatDate(pack.saved_at)}`,'episode-binder-date'));
          if(number==='01'&&pack.content_id==='episode-01-cheat-sheet'&&pack.content_version==='2026-09-06-v1'){const link=element('a','Open my Cheat Sheet','episode-binder-open');link.href='/blend-snap.html?packVersion=2026-09-06-v1#episode-01-cheat-sheet';card.append(link);}else card.append(element('p','This earlier saved edition is kept. Its reading page is not available here yet.'));inside.append(card);
        }
        if(Object.keys(episode.cards).length){
          const card=element('article',undefined,'episode-binder-item');card.append(element('h4','Trading cards'),element('p',`${Object.keys(episode.cards).length} saved cards`));
          const currentDeck=number==='01'&&Object.keys(episode.cards).some(key=>['generative-ai','model','hallucination','participation-gap'].some(id=>key===`${id}@2026-09-06-v1`));
          if(currentDeck){const link=element('a','Open my trading cards','episode-binder-open');link.href='/episode-01-cards/?version=2026-09-06-v1';card.append(link);}
          const older=Object.keys(episode.cards).filter(key=>!currentDeck||!['generative-ai','model','hallucination','participation-gap'].some(id=>key===`${id}@2026-09-06-v1`)).length;
          if(older)card.append(element('p',`${older} earlier cards are kept. Their reading pages are not available here yet.`));inside.append(card);
        }
        for(const [quizKey,quiz] of Object.entries(episode.quizzes))for(const attempt of quiz.attempts){const card=element('article',undefined,'episode-binder-item');card.append(element('h4','Pop Quiz'),element('p',`${attempt.score} / ${attempt.max_score}`),element('p',`Completed ${formatDate(attempt.completed_at)}`,'episode-binder-date'));if(number==='01'&&quizKey==='episode-01-quiz@2026-09-06-v1'){const link=element('a','Review this quiz attempt','episode-binder-open');link.href=`/learn/quiz.html?issue=1&version=2026-09-06-v1&attempt=${encodeURIComponent(attempt.attempt_id)}`;card.append(link);}inside.append(card);}
      }
      page.append(inside);host.append(page);
    }
  }
  async function mount(root){
    const params=new URLSearchParams(location.search);
    if(params.get('u')||params.get('member')||location.pathname.startsWith('/@')){root.hidden=true;return;}
    root.hidden=false;
    const host=root.querySelector('[data-episode-binder-pages]'),status=root.querySelector('[data-episode-binder-status]'),refresh=root.querySelector('[data-episode-binder-refresh]'),signIn=root.querySelector('[data-episode-binder-sign-in]');
    let runtime,binder,subscription,epoch=0,owner='',disposed=false;
    function clear(){epoch++;owner='';binder?.invalidate();host.replaceChildren();}
    function accountChanged(){clear();signIn.hidden=false;status.textContent='The account changed. Previous account material has been closed.';}
    function cleanup(){disposed=true;clear();refresh.removeEventListener('click',load);subscription?.unsubscribe();binder?.dispose();}
    global.addEventListener('pagehide',cleanup,{once:true});
    async function load(){
      const request=++epoch;host.replaceChildren();refresh.disabled=true;status.textContent='Opening your episode binder…';
      try{
        const session=await runtime.controller.getSession();if(disposed||request!==epoch)return;
        if(!session?.user?.id){clear();signIn.hidden=false;status.textContent='Sign in to open the episode material you saved to your account.';return;}
        owner=session.user.id;signIn.hidden=true;
        const result=await binder.load(owner);if(disposed||request!==epoch)return;
        render(result.document,host);status.textContent='Your saved episode material. Open an episode to find your work.';
      }catch(error){if(disposed||request!==epoch)return;if(String(error?.message||error).includes('account-changed-reload-binder')){accountChanged();return;}host.replaceChildren();status.textContent='Your binder could not be opened. Your saved material has not been changed. Try again.';}
      finally{if(!disposed)refresh.disabled=false;}
    }
    try{
      runtime=await global.LAIDIESResidentAccountRuntime.get();if(disposed)return;
      binder=global.LAIDIESResidentEpisodeBinderV1.create(runtime);
      subscription=runtime.client.auth.onAuthStateChange((_event,session)=>{if(owner&&owner!==session?.user?.id)accountChanged();}).data.subscription;
      refresh.addEventListener('click',load);await load();
      const alignFragment=()=>{if(!disposed&&location.hash==='#episodeBinderVessel')root.scrollIntoView({behavior:'instant',block:'start'});};
      const afterLayout=()=>global.requestAnimationFrame(()=>global.requestAnimationFrame(alignFragment));
      if(document.readyState==='complete')afterLayout();else global.addEventListener('load',afterLayout,{once:true});
    }catch(_){status.textContent='Account saving is unavailable right now. Your saved material has not been changed.';refresh.disabled=true;}
  }
  global.LAIDIESEpisodeBinderClosetV1=Object.freeze({mount,render});
  const root=document.getElementById('episodeBinderVessel');if(root){mount(root);global.addEventListener('pageshow',event=>{if(event.persisted)mount(root);});}
})(window);
