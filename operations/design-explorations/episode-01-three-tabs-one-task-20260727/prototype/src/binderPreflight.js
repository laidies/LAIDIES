// Development-only synthetic UI fixture. No Supabase/network calls or real users.
export function installBinderPreflight() {
  if(!import.meta.env.DEV||!['localhost','127.0.0.1'].includes(location.hostname)) throw new Error('Synthetic fixture is local development only.');
  const storageKey='laidies_test_episode_binder_v1';
  const owners=['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'];
  let owner=owners[0],dropNext=false,pauseNextRead=false,releaseRead=null;
  const listeners=new Set();
  const store=()=>JSON.parse(localStorage.getItem(storageKey)||'{"binders":{},"receipts":{}}');
  const session=()=>owner?{user:{id:owner}}:null;
  const client={auth:{getSession:async()=>({data:{session:session()},error:null}),onAuthStateChange:callback=>{listeners.add(callback);return {data:{subscription:{unsubscribe:()=>listeners.delete(callback)}}};}},rpc:async(name,args)=>{
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
    ['Use synthetic account A',()=>{owner=owners[0];label.textContent='LOCAL SYNTHETIC TEST · Account A · no cloud saving';listeners.forEach(fn=>fn('SIGNED_IN',session()));}],
    ['Use synthetic account B',()=>{owner=owners[1];label.textContent='LOCAL SYNTHETIC TEST · Account B · no cloud saving';listeners.forEach(fn=>fn('SIGNED_IN',session()));}],
    ['Expire session without event',()=>{owner=null;label.textContent='LOCAL SYNTHETIC TEST · session expired without an auth event';}],
    ['Pause next binder read',()=>{pauseNextRead=true;label.textContent='LOCAL SYNTHETIC TEST · next binder read will pause';}],
    ['Release paused read',()=>{const release=releaseRead;releaseRead=null;release?.();}],
    ['Lose next save confirmation',()=>{dropNext=true;label.textContent='LOCAL SYNTHETIC TEST · next save confirmation will be lost';}]
  ]) {const button=document.createElement('button');button.type='button';button.textContent=title;button.style.cssText='margin-left:10px;padding:8px';button.addEventListener('click',action);bar.append(button);}
  document.body.prepend(bar);
}
