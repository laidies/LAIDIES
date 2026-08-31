import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {setTimeout as delay} from 'node:timers/promises';

// Exercise the actual DOM initializer and event handlers. No browser, network,
// provider, or application source mutation is involved in these fixtures.
const source=fs.readFileSync('content/site/resident-referrals-v1.js','utf8');
const PENDING='laidies_pending_referral_v1',ISSUE='laidies_referral_issue_retry_v1';
const a={user:{id:'a0000000-0000-4000-8000-000000000001'},access_token:'synthetic-a'};
const b={user:{id:'b0000000-0000-4000-8000-000000000002'},access_token:'synthetic-b'};
const oldKey='c0000000-0000-4000-8000-000000000003';
const inviteA='e0000000-0000-4000-8000-000000000001';
const inviteB='e0000000-0000-4000-8000-000000000002';
const invitationToken='a'.repeat(64);

function element(tag,id='') {
  let text='';
  return {
    tagName:tag.toUpperCase(),id,hidden:false,disabled:false,value:'',children:[],handlers:{},attributes:{},
    get textContent(){return text+this.children.map(child=>child.textContent).join('');},
    set textContent(value){text=String(value);this.children=[];},
    replaceChildren(...children){text='';this.children=children;},
    appendChild(child){this.children.push(child);},
    addEventListener(event,fn){this.handlers[event]=fn;},
    setAttribute(key,value){this.attributes[key]=value;},
    focus(){},select(){},
    querySelectorAll(selector){
      assert.equal(selector,'button');
      const found=[];
      function visit(node){for(const child of node.children){if(child.tagName==='BUTTON')found.push(child);visit(child);}}
      visit(this);return found;
    }
  };
}
function fixture(text=source,{session=null,incoming=true}={}) {
  const ids=['referralPanel','referralStatus','referralList','referralLink','referralShare','referralCreate','referralAccept','referralRefresh','referralCopy'];
  const buttons=new Set(['referralCreate','referralAccept','referralRefresh','referralCopy']);
  const nodes=Object.fromEntries(ids.map(id=>[id,element(buttons.has(id)?'button':'div',id)]));
  nodes.referralPanel.children=ids.filter(id=>id!=='referralPanel').map(id=>nodes[id]);
  nodes.referralAccept.hidden=nodes.referralShare.hidden=true;
  nodes.referralCreate.disabled=nodes.referralRefresh.disabled=true;
  const values=new Map(),timers=new Set(),calls=[];
  const storage={getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
  let actor=session,onAuth,seq=0;
  let inspectResult={state:'issued',action:'accept'};
  let respond=async call=>{
    if(call.name==='list_my_resident_referrals_v1')return {data:[]};
    if(call.name==='inspect_resident_referral_invite_v1')return {data:inspectResult};
    throw new Error('Unexpected mutation: '+call.name);
  };
  const runtime={controller:{getSession:async()=>actor},client:{
    auth:{onAuthStateChange(fn){onAuth=fn;}},
    rpc(name,args){return {setHeader(key,authorization){
      assert.equal(key,'Authorization');const call={name,args,authorization};calls.push(call);return respond(call);
    }};}
  }};
  const location={hash:incoming?'#invite='+invitationToken:'',pathname:'/resident-referrals.html',search:'',origin:'https://laidies.ai'};
  const window={
    setTimeout(fn,ms){const timer=setTimeout(()=>{timers.delete(timer);fn();},ms);timers.add(timer);return timer;},
    clearTimeout(timer){timers.delete(timer);clearTimeout(timer);},
    sessionStorage:storage,location,history:{replaceState(){location.hash='';}},navigator:{},
    crypto:{randomUUID:()=>`d0000000-0000-4000-8000-${String(++seq).padStart(12,'0')}`},
    LAIDIESResidentAccountRuntime:{get:async()=>runtime},
    document:{readyState:'complete',getElementById:id=>nodes[id],createElement:tag=>element(tag)}
  };
  vm.runInNewContext(text,{window},{filename:'content/site/resident-referrals-v1.js'});
  return {
    nodes,calls,storage,location,
    auth(next){assert.equal(typeof onAuth,'function');actor=next;onAuth(next?'SIGNED_IN':'SIGNED_OUT',next);},
    respond(fn){respond=fn;},inspect(next){inspectResult=next;},
    click(id){const node=typeof id==='string'?nodes[id]:id;assert.equal(node.disabled,false,'click target enabled');node.handlers.click();},
    dispose(){for(const timer of timers)clearTimeout(timer);timers.clear();}
  };
}
async function until(predicate,message) {
  for(let n=0;n<150;n++){if(predicate())return;await delay(1);}
  assert.fail(message);
}
function mutationCalls(f){return f.calls.filter(call=>!['list_my_resident_referrals_v1','inspect_resident_referral_invite_v1'].includes(call.name));}

async function guestSignIn(text=source) {
  const f=fixture(text);
  try {
    await until(()=>f.nodes.referralStatus.textContent.startsWith('Sign in'),'guest state did not settle');
    assert.equal(f.location.hash,'','incoming token scrubbed');
    assert.equal(f.calls.length,0,'guest initialization sends no referral RPC');
    assert.equal(f.nodes.referralAccept.hidden,true);
    f.auth(a);
    await until(()=>!f.nodes.referralAccept.hidden&&!f.nodes.referralRefresh.disabled,'guest-signin: acceptance control remains hidden');
    assert.match(f.nodes.referralStatus.textContent,/An invitation is ready/);
    assert.equal(JSON.parse(f.storage.getItem(PENDING)).owner,a.user.id,'pending invitation belongs to the signed-in actor');
    assert.equal(mutationCalls(f).length,0,'sign-in must never auto-accept or issue');
  } finally {f.dispose();}
}
async function manualRefresh(text=source) {
  const f=fixture(text,{session:a});
  try {
    await until(()=>!f.nodes.referralAccept.hidden,'initial invitation inspection did not settle');
    const before=f.calls.filter(call=>call.name==='inspect_resident_referral_invite_v1').length;
    f.inspect({state:'expired',action:null});
    f.click('referralRefresh');
    await until(()=>f.calls.filter(call=>call.name==='inspect_resident_referral_invite_v1').length>before&&!f.nodes.referralRefresh.disabled,'manual-refresh: pending invitation was not rechecked');
    assert.equal(f.nodes.referralAccept.hidden,true,'expired invitation is no longer actionable');
    assert.match(f.nodes.referralStatus.textContent,/invitation is expired/);
    assert.equal(mutationCalls(f).length,0,'manual inspection must not mutate');
  } finally {f.dispose();}
}
async function busyAccountChange(text=source) {
  const f=fixture(text,{session:a,incoming:false});
  const row=(inviteId)=>({inviteId,role:'sender',state:'revoked'});
  let finish,hold=false;
  f.respond(async call=>{
    assert.equal(call.name,'list_my_resident_referrals_v1');
    if(hold&&call.authorization==='Bearer synthetic-a')return new Promise(resolve=>{finish=resolve;});
    return {data:[row(call.authorization==='Bearer synthetic-a'?inviteA:inviteB)]};
  });
  try {
    await until(()=>f.nodes.referralList.textContent.includes(inviteA),'initial account receipts did not settle');
    hold=true;f.click('referralRefresh');
    await until(()=>!!finish,'busy refresh request was not dispatched');
    f.auth(b);
    assert.equal(f.nodes.referralList.textContent,'','account event immediately clears private receipts');
    assert.equal(f.nodes.referralLink.value,'');
    assert.equal(f.nodes.referralAccept.hidden,true);
    await delay(1); // Let the queued auth callback observe the in-flight action.
    finish({data:[row(inviteA)]});
    await until(()=>f.nodes.referralList.textContent.includes(inviteB)&&!f.nodes.referralRefresh.disabled,'busy-account: new account refresh was dropped');
    assert.ok(!f.nodes.referralList.textContent.includes(inviteA),'late old-account receipts never remain visible');
    assert.ok(f.calls.some(call=>call.authorization==='Bearer synthetic-b'),'queued request binds new actor');
    assert.equal(mutationCalls(f).length,0,'account change must not mutate');
  } finally {if(finish)finish({data:[]});f.dispose();}
}
async function unrelatedRetry(text=source) {
  const f=fixture(text,{session:a,incoming:false});
  let unknown=true;
  f.respond(async call=>{
    if(call.name==='list_my_resident_referrals_v1')return {data:[{inviteId:inviteB,role:'sender',state:'issued',issueIdempotencyKey:oldKey}]};
    assert.equal(call.name,'issue_resident_referral_v1');
    if(unknown){unknown=false;return {error:{code:'network'}};}
    return {data:{state:'issued',inviteId:call.args.p_idempotency_key===oldKey?inviteB:inviteA,token:'b'.repeat(64)}};
  });
  try {
    await until(()=>f.nodes.referralList.textContent.includes(inviteB),'older invitation receipt did not settle');
    f.click('referralCreate');
    await until(()=>f.nodes.referralStatus.textContent.includes('could not confirm')&&!f.nodes.referralCreate.disabled,'unknown creation did not settle');
    const pending=JSON.parse(f.storage.getItem(ISSUE));assert.ok(pending);
    const show=f.nodes.referralList.querySelectorAll('button').find(node=>node.textContent==='Show private link');
    assert.ok(show);f.click(show);
    await until(()=>!f.nodes.referralShare.hidden&&!f.nodes.referralCreate.disabled,'older link did not settle');
    assert.equal(JSON.parse(f.storage.getItem(ISSUE))?.key,pending.key,'unrelated-retry: showing Y discarded unresolved X');
    f.click('referralCreate');
    await until(()=>f.calls.filter(call=>call.name==='issue_resident_referral_v1').length===3&&!f.nodes.referralCreate.disabled,'creation retry did not settle');
    assert.deepEqual(f.calls.filter(call=>call.name==='issue_resident_referral_v1').map(call=>call.args.p_idempotency_key),[pending.key,oldKey,pending.key],'unknown X, explicit Y, then retry X');
    assert.equal(f.storage.getItem(ISSUE),null,'acknowledging X clears its own retry');
  } finally {f.dispose();}
}

async function initialAccountChange(text=source) {
  const f=fixture(text,{session:a,incoming:false});
  let finish;
  const row=inviteId=>({inviteId,role:'sender',state:'revoked'});
  f.respond(async call=>{
    assert.equal(call.name,'list_my_resident_referrals_v1');
    if(call.authorization==='Bearer synthetic-a')return new Promise(resolve=>{finish=resolve;});
    return {data:[row(inviteB)]};
  });
  try {
    await until(()=>!!finish,'initial account request was not dispatched');
    f.auth(b);
    // Drain the auth event and its immediate response before releasing A. With
    // the old unqueued initialization, B renders here and is then erased by A's
    // late error. The repair instead queues B until initial work is settled.
    await delay(5);
    finish({data:[row(inviteA)]});
    await delay(5);
    await until(()=>f.nodes.referralList.textContent.includes(inviteB)&&!f.nodes.referralRefresh.disabled,'initial-account: late initialization erased current receipts');
    assert.ok(!f.nodes.referralList.textContent.includes(inviteA),'initial old-account rows cannot replace current rows');
    assert.match(f.nodes.referralStatus.textContent,/Your private invitation receipts are ready/);
    assert.equal(mutationCalls(f).length,0,'initial account switch must not mutate');
  } finally {if(finish)finish({data:[]});f.dispose();}
}

const cases=[['guest invitation → external sign-in',guestSignIn],['manual pending-invitation refresh',manualRefresh],['account switch during busy refresh',busyAccountChange],['unresolved X → old Y → retry X',unrelatedRetry],['initial A → sign-in B → late A response',initialAccountChange]];
for(const [label,test] of cases){await test();console.log('LOCAL VERIFIED:',label);}
const mutants=[
  ['missing incoming refresh',guestSignIn,'      await refreshIncoming();','',/guest-signin: acceptance control remains hidden/],
  ['manual receipt-only refresh',manualRefresh,"refreshButton.addEventListener('click',function(){run(refresh);});","refreshButton.addEventListener('click',function(){run(async function(){await controller.list();});});",/manual-refresh: pending invitation was not rechecked/],
  ['dropped busy account event',busyAccountChange,'if(busy)refreshAfterBusy=true;else run(refreshAccount);','if(!busy)run(refreshAccount);',/busy-account: new account refresh was dropped/],
  ['unconditional retry deletion',unrelatedRetry,'if(saved && saved.owner===expected.id && saved.key===key)storage.removeItem(ISSUE);','storage.removeItem(ISSUE);',/unrelated-retry: showing Y discarded unresolved X/],
  ['unqueued initial refresh',initialAccountChange,'      await run(refresh);\n    } catch(error)','      await refresh();\n    } catch(error)',/initial-account: late initialization erased current receipts/]
];
for(const [label,test,find,replacement,error] of mutants){
  assert.ok(source.includes(find),'calibration mutation exists: '+label);
  await assert.rejects(test(source.replace(find,replacement)),error,'known-bad mutant must fail: '+label);
  console.log('CALIBRATED REJECTION:',label);
}
console.log('5 actual-init journeys verified; 5 known-bad mutations rejected. No provider/browser/public verification claimed.');
