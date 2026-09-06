// Development-only synthetic UI fixture. No Supabase/network calls or real users.
export function installBinderPreflight() {
  if(!import.meta.env.DEV||!['localhost','127.0.0.1'].includes(location.hostname)) throw new Error('Synthetic fixture is local development only.');
  const storageKey='laidies_test_episode_binder_v1';
  const owners=['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'];
  let owner=owners[0],dropNext=false,pauseNextRead=false,releaseRead=null,silentSwitchCountdown=0;
  const listeners=new Set();
  let rpcCount=0,rpcStatus;
  const store=()=>JSON.parse(localStorage.getItem(storageKey)||'{"binders":{},"receipts":{}}');
  const session=()=>owner?{user:{id:owner}}:null;
  const client={auth:{getSession:async()=>{if(silentSwitchCountdown&&--silentSwitchCountdown===0){owner=owners[1];label.textContent='LOCAL SYNTHETIC TEST · silently switched to account B';}return {data:{session:session()},error:null};},onAuthStateChange:callback=>{listeners.add(callback);return {data:{subscription:{unsubscribe:()=>listeners.delete(callback)}}};}},rpc:async(name,args)=>{
    rpcCount++;if(rpcStatus)rpcStatus.textContent=` Synthetic account requests: ${rpcCount}`;
    const requestOwner=owner;
    if(!requestOwner)return {error:new Error('authentication-required')};
    if(args?.p_expected_owner!==requestOwner)return {error:new Error('account-changed-reload-binder')};
    const data=store();
    if(name==='get_my_resident_episode_binder_v1') {
      const response={data:data.binders[requestOwner]?{state:'saved',binder:data.binders[requestOwner]}:{state:'empty',binder:null}};
      if(pauseNextRead){pauseNextRead=false;await new Promise(resolve=>{releaseRead=resolve;});}
      return response;
    }
    if(name!=='put_my_resident_episode_binder_v1')return {error:new Error('unsupported-synthetic-rpc')};
    const key=`${requestOwner}:${args.p_idempotency_key}`;
    const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(args))))).map(v=>v.toString(16).padStart(2,'0')).join('');
    if(data.receipts[key])return data.receipts[key].hash===hash?{data:{state:'saved',revision:data.receipts[key].revision}}:{error:new Error('idempotency-conflict')};
    if((data.binders[requestOwner]?.revision||null)!==args.p_expected_revision)return {error:new Error('revision-conflict')};
    const revision=crypto.randomUUID();
    data.binders[requestOwner]={schema_version:1,document:args.p_document,revision,updated_at:new Date().toISOString()};
    data.receipts[key]={hash,revision};localStorage.setItem(storageKey,JSON.stringify(data));
    if(dropNext){dropNext=false;return {error:new Error('synthetic-lost-confirmation')};}
    return {data:{state:'saved',revision}};
  }};
  window.__LAIDIES_MAIKEOVER_ACCOUNT_PREFLIGHT__=true;
  window.__LAIDIES_MAIKEOVER_PREFLIGHT_FIXTURE_ID__='synthetic-episode-binder';
  window.__LAIDIES_MAIKEOVER_PREFLIGHT_CLIENT__=client;
  const bar=document.createElement('aside');
  bar.setAttribute('aria-label','Synthetic test controls');
  bar.style.cssText='padding:12px;background:#fff3ab;color:#171018;border:2px solid #171018;font:16px sans-serif';
  const label=document.createElement('strong');label.textContent='LOCAL SYNTHETIC TEST · Account A · no cloud saving';bar.append(label);
  for(const [title,action] of [
    ['Create synthetic exercise',async()=>{
      const registry=await fetch('/content/episodes/episode-01.exercise-fields.json').then(r=>r.json());
      const fields=Object.fromEntries(Object.entries(registry.fields).map(([key,spec])=>[key,spec.type==='boolean'?false:spec.type==='number'?0:(spec.choices?.[0]||'')]));
      fields.task='Synthetic example: invite friends to choose Friday or Sunday; reply by Wednesday.';
      const runtime=await window.LAIDIESResidentAccountRuntime.get();const binder=window.LAIDIESResidentEpisodeBinderV1.create(runtime);
      try{await binder.saveExercise(1,{exercise_id:registry.exerciseId,exercise_version:registry.exerciseVersion,input_state:{fields},placements:[]},crypto.randomUUID(),owner);label.textContent='LOCAL SYNTHETIC TEST · example saved; refresh the binder';}finally{binder.dispose();}
    }],
    ['Use synthetic account A',()=>{owner=owners[0];label.textContent='LOCAL SYNTHETIC TEST · Account A · no cloud saving';listeners.forEach(fn=>fn('SIGNED_IN',session()));}],
    ['Use synthetic account B',()=>{owner=owners[1];label.textContent='LOCAL SYNTHETIC TEST · Account B · no cloud saving';listeners.forEach(fn=>fn('SIGNED_IN',session()));}],
    ['Expire session without event',()=>{owner=null;label.textContent='LOCAL SYNTHETIC TEST · session expired without an auth event';}],
    ['Switch silently before core session',()=>{silentSwitchCountdown=2;label.textContent='LOCAL SYNTHETIC TEST · second session check will switch to B';}],
    ['Pause next binder read',()=>{pauseNextRead=true;label.textContent='LOCAL SYNTHETIC TEST · next binder read will pause';}],
    ['Release paused read',()=>{const release=releaseRead;releaseRead=null;release?.();}],
    ['Lose next save confirmation',()=>{dropNext=true;label.textContent='LOCAL SYNTHETIC TEST · next save confirmation will be lost';}]
  ]) {if(title==='Create synthetic exercise'&&!location.pathname.startsWith('/laidies-card'))continue;const button=document.createElement('button');button.type='button';button.textContent=title;button.style.cssText='margin-left:10px;padding:8px';button.addEventListener('click',()=>Promise.resolve().then(action).catch(error=>{label.textContent='LOCAL SYNTHETIC TEST · '+error.message;}));bar.append(button);}
  rpcStatus=document.createElement('span');rpcStatus.textContent=' Synthetic account requests: 0';bar.append(rpcStatus);
  if(document.body)document.body.prepend(bar);else window.addEventListener('DOMContentLoaded',()=>document.body.prepend(bar),{once:true});
}
