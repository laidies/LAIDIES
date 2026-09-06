(function(global){
  'use strict';
  const TITLES={'01':'On Wednesdays We Do AI','02':'Tell Me What You Want','03':'The Burn Book Problem','04':'The Founding Mothers'};
  const CURRENT_EXERCISE='ep01-same-task-different-drafts@2026-09-06-v1';
  function element(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
  function formatDate(value){const date=new Date(value);return Number.isFinite(date.valueOf())?date.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'Date unavailable';}
  function removalControl(card,descriptor,onRemove){
    if(!onRemove)return;
    const controls=element('div',undefined,'episode-binder-remove');
    const open=element('button',`Remove ${descriptor.label}`);open.type='button';
    const prompt=element('div');prompt.hidden=true;
    const warning=element('p',`Remove this saved ${descriptor.label} from your binder? This cannot be undone.`);
    const cancel=element('button','Keep it');cancel.type='button';
    const confirm=element('button','Remove from binder');confirm.type='button';
    let mutationKey;
    open.addEventListener('click',()=>{open.hidden=true;prompt.hidden=false;cancel.focus();});
    cancel.addEventListener('click',()=>{prompt.hidden=true;open.hidden=false;open.focus();});
    confirm.addEventListener('click',async()=>{
      mutationKey ||= crypto.randomUUID();
      const result=await onRemove(descriptor,mutationKey);
      if(result==='retry'){confirm.textContent='Retry removal';cancel.textContent='Close this notice';warning.textContent='Removal could not be confirmed. Retry this same removal, or refresh your binder to check what is saved.';}
      if(result==='conflict'){confirm.disabled=true;warning.textContent='Your binder changed elsewhere. Refresh it and check this item before removing it.';}
    });
    prompt.append(warning,cancel,confirm);controls.append(open,prompt);card.append(controls);
  }
  function itemCount(episode){
    if(!episode)return 0;
    return Object.keys(episode.packs).length+Object.keys(episode.exercises).length+Object.keys(episode.cards).length+Object.values(episode.quizzes).reduce((n,quiz)=>n+quiz.attempts.length,0);
  }
  function render(documentValue,host,onRemove){
    host.replaceChildren();
    for(const number of ['01','02','03','04']){
      const episode=documentValue.episodes[number];
      const page=element('details',undefined,'episode-binder-page');
      const summary=element('summary');summary.append(element('span',`EP ${number}`,'episode-binder-tab'),element('span',TITLES[number]));page.append(summary);
      const inside=element('div',undefined,'episode-binder-pocket');
      const count=itemCount(episode);
      summary.lastChild.append(element('small',`${count} saved ${count===1?'item':'items'}`,'episode-binder-page-count'));
      if(!count)inside.append(element('p','Nothing saved for this episode yet.'));
      else {
        page.open=true;
        for(const [key,exercise] of Object.entries(episode.exercises)){
          const card=element('article',undefined,'episode-binder-item');
          const fields=exercise.input_state.fields||exercise.input_state;
          card.append(element('h4','Try-On exercise'),element('p',fields.task||'Saved exercise'),element('p',`Saved ${formatDate(exercise.updated_at)}`,'episode-binder-date'));
          const exerciseId=key.slice(0,-exercise.exercise_version.length-1);
          const currentInstance=key===CURRENT_EXERCISE||key.endsWith('@2026-09-06-v1')&&/^ep01-same-task-different-drafts:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(exerciseId);
          if(number==='01'&&currentInstance){const link=element('a','Open my exercise','episode-binder-open');link.href=`/episode-01-try-on/?exercise=${encodeURIComponent(exerciseId)}&version=2026-09-06-v1`;card.append(link);}
          else card.append(element('p','This earlier exercise is kept in your binder. Its editing page is not available here yet.'));
          removalControl(card,{method:'removeExercise',args:[Number(number),exerciseId,exercise.exercise_version],label:'exercise'},onRemove);
          inside.append(card);
        }
        for(const pack of Object.values(episode.packs)){
          const card=element('article',undefined,'episode-binder-item');card.append(element('h4','Study Pack'),element('p',`Saved ${formatDate(pack.saved_at)}`,'episode-binder-date'));
          if(number==='01'&&pack.content_id==='episode-01-cheat-sheet'&&pack.content_version==='2026-09-06-v1'){const link=element('a','Open my Cheat Sheet','episode-binder-open');link.href='/blend-snap.html?packVersion=2026-09-06-v1#episode-01-cheat-sheet';card.append(link);}else card.append(element('p','This earlier saved edition is kept. Its reading page is not available here yet.'));removalControl(card,{method:'removePack',args:[Number(number),pack.content_id,pack.content_version],label:'Cheat Sheet'},onRemove);inside.append(card);
        }
        if(Object.keys(episode.cards).length){
          const card=element('article',undefined,'episode-binder-item');card.append(element('h4','Trading cards'),element('p',`${Object.keys(episode.cards).length} saved cards`));
          const currentDeck=number==='01'&&Object.keys(episode.cards).some(key=>['generative-ai','model','hallucination','participation-gap'].some(id=>key===`${id}@2026-09-06-v1`));
          if(currentDeck){const link=element('a','Open my trading cards','episode-binder-open');link.href='/episode-01-cards/?version=2026-09-06-v1';card.append(link);}
          const older=Object.keys(episode.cards).filter(key=>!currentDeck||!['generative-ai','model','hallucination','participation-gap'].some(id=>key===`${id}@2026-09-06-v1`)).length;
          if(older)card.append(element('p',`${older} earlier cards are kept. Their reading pages are not available here yet.`));
          for(const [key,savedCard] of Object.entries(episode.cards)){
            const cardId=key.slice(0,-savedCard.card_version.length-1);
            const titles={'generative-ai':'Generative AI card',model:'Model card',hallucination:'Hallucination card','participation-gap':'Participation Gap card'};
            removalControl(card,{method:'removeCard',args:[Number(number),cardId,savedCard.card_version],label:titles[cardId]||'saved card'},onRemove);
          }
          inside.append(card);
        }
        for(const [quizKey,quiz] of Object.entries(episode.quizzes))for(const attempt of quiz.attempts){const card=element('article',undefined,'episode-binder-item');card.append(element('h4','Pop Quiz'),element('p',`${attempt.score} / ${attempt.max_score}`),element('p',`Completed ${formatDate(attempt.completed_at)}`,'episode-binder-date'));if(number==='01'&&['episode-01-quiz@2026-09-06-v1','episode-01-quiz@2026-09-06-v2'].includes(quizKey)){const link=element('a','Review this quiz attempt','episode-binder-open');link.href=`/learn/quiz.html?issue=1&version=${encodeURIComponent(quiz.quiz_version)}&attempt=${encodeURIComponent(attempt.attempt_id)}`;card.append(link);}removalControl(card,{method:'removeQuizAttempt',args:[Number(number),quizKey.slice(0,-quiz.quiz_version.length-1),quiz.quiz_version,attempt.attempt_id],label:'quiz attempt'},onRemove);inside.append(card);}
      }
      page.append(inside);host.append(page);
    }
  }
  async function mount(root){
    const params=new URLSearchParams(location.search);
    if(params.get('u')||params.get('member')||location.pathname.startsWith('/@')){root.hidden=true;return;}
    root.hidden=false;
    const host=root.querySelector('[data-episode-binder-pages]'),status=root.querySelector('[data-episode-binder-status]'),refresh=root.querySelector('[data-episode-binder-refresh]'),signIn=root.querySelector('[data-episode-binder-sign-in]'),countNode=root.querySelector('[data-episode-binder-count]');
    function resetCount(){if(countNode)countNode.textContent='—';}
    let runtime,binder,subscription,epoch=0,owner='',disposed=false,removing=false;
    function clear(){epoch++;owner='';binder?.invalidate();host.replaceChildren();resetCount();}
    function accountChanged(){clear();signIn.hidden=false;status.textContent='The account changed. Previous account material has been closed.';}
    function cleanup(){disposed=true;clear();refresh.removeEventListener('click',load);subscription?.unsubscribe();binder?.dispose();}
    global.addEventListener('pagehide',cleanup,{once:true});
    function show(documentValue){
      const token={epoch,owner};
      if(countNode)countNode.textContent=Object.values(documentValue.episodes).reduce((n,episode)=>n+itemCount(episode),0);
      render(documentValue,host,(descriptor,key)=>removeSaved(descriptor,key,token));
    }
    async function removeSaved(descriptor,key,token){
      if(disposed||removing||token.epoch!==epoch||token.owner!==owner)return 'closed';
      removing=true;root.querySelectorAll('button').forEach(button=>{button.disabled=true;});
      status.textContent=`Removing your saved ${descriptor.label}…`;
      try{
        const result=await binder[descriptor.method](...descriptor.args,key,token.owner);
        if(disposed||token.epoch!==epoch||token.owner!==owner)return 'closed';
        if(result.state==='conflict'){status.textContent='Your binder changed elsewhere. Refresh it before removing this item.';return 'conflict';}
        show(result.document);status.textContent=`Removed the saved ${descriptor.label} from your Episode Binder.`;return 'removed';
      }catch(error){
        if(disposed||token.epoch!==epoch||token.owner!==owner)return 'closed';
        if(String(error?.message||error).includes('account-changed-reload-binder')){accountChanged();return 'closed';}
        status.textContent='Removal could not be confirmed. Retry the same removal or refresh your binder to check.';return 'retry';
      }finally{removing=false;if(!disposed)root.querySelectorAll('button').forEach(button=>{button.disabled=false;});}
    }
    async function load(){
      if(removing)return;
      const request=++epoch;host.replaceChildren();resetCount();refresh.disabled=true;status.textContent='Opening your episode binder…';
      try{
        const session=await runtime.controller.getSession();if(disposed||request!==epoch)return;
        if(!session?.user?.id){clear();signIn.hidden=false;status.textContent='Sign in to open the episode material you saved to your account.';return;}
        owner=session.user.id;signIn.hidden=true;
        const result=await binder.load(owner);if(disposed||request!==epoch)return;
        show(result.document);status.textContent='Your saved episode material. Open an episode to find your work.';
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
