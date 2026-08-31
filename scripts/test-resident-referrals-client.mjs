import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('content/site/resident-referrals-v1.js','utf8');
function storage(){const values=new Map();return {getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k),values};}
const pendingKey='laidies_pending_referral_v1';
const memory=storage();
const win={setTimeout,clearTimeout,sessionStorage:memory,location:{hash:'',pathname:'/resident-referrals.html',search:''},history:{replaceState(){}},document:{readyState:'loading',addEventListener(){}}};
vm.runInNewContext(source,{window:win});
const api=win.LAIDIESResidentReferralsV1;
let scrubbed=false;
api.capture(memory,{hash:'#invite='+'a'.repeat(64),pathname:'/resident-referrals.html',search:''},{replaceState:(_,__,url)=>{scrubbed=url==='/resident-referrals.html';}});
assert.ok(scrubbed,'token removed before runtime/analytics');
assert.equal(JSON.parse(memory.getItem(pendingKey)).token,'a'.repeat(64));
const a='a0000000-0000-4000-8000-000000000001',b='b0000000-0000-4000-8000-000000000002';
const invite='c0000000-0000-4000-8000-000000000003';
let actor={user:{id:a},access_token:'synthetic-a'},calls=[],nextError=true;
let response=async(name,args)=>{
  if(name==='issue_resident_referral_v1') {if(nextError){nextError=false;return {error:{code:'network'}};}return {data:{state:'issued',inviteId:invite,token:'b'.repeat(64)}};}
  if(name==='accept_resident_referral_invite_v1')return {data:{state:'accepted',inviteId:invite}};
  if(name==='list_my_resident_referrals_v1')return {data:[]};
  throw new Error('unexpected RPC');
};
const runtime={controller:{getSession:async()=>actor},client:{rpc:(name,args)=>({setHeader:async(key,value)=>{assert.equal(key,'Authorization');assert.equal(value,'Bearer '+actor.access_token);calls.push({name,args});return response(name,args);}})}};
let seq=0;
const controller=api.create(runtime,memory,()=>`d0000000-0000-4000-8000-${String(++seq).padStart(12,'0')}`);
await assert.rejects(controller.issue(),/service-unconfirmed/);
await controller.issue();
assert.equal(calls[0].args.p_idempotency_key,calls[1].args.p_idempotency_key,'unknown issue retry reuses exact key');
assert.ok(![...memory.values.values()].some(v=>v.includes('b'.repeat(64))),'issued token not persisted');
await controller.accept();
assert.equal(memory.getItem(pendingKey),null,'accepted token removed');
memory.setItem(pendingKey,JSON.stringify({token:'a'.repeat(64),owner:a}));
actor={user:{id:b},access_token:'synthetic-b'};
await controller.syncOwner();
assert.equal(memory.getItem(pendingKey),null,'account change clears private token');
actor=null;
const prior=calls.length;
await assert.rejects(controller.issue(),/account-changed|sign-in-required/);
assert.equal(calls.length,prior,'guest makes no RPC');
actor={user:{id:a},access_token:'synthetic-a'};
response=async()=>{actor={user:{id:b},access_token:'synthetic-b'};return {data:[]};};
await assert.rejects(controller.list(),/account-changed/,'late response cannot cross accounts');
response=async()=>({data:[{inviteId:'malformed',state:'qualified',role:'recipient'}]});
await assert.rejects(controller.list(),/service-unconfirmed/,'bad receipt rejected');
// Calibration: removing actor continuity checks must cause the race assertion to fail.
const mutant=source.replace("if (version !== generation || !after || after.user.id !== before.user.id)","if (false)");
const mutantWin={...win,sessionStorage:storage()};vm.runInNewContext(mutant,{window:mutantWin});
actor={user:{id:a},access_token:'synthetic-a'};
response=async()=>{actor={user:{id:b},access_token:'synthetic-b'};return {data:[]};};
const bad=mutantWin.LAIDIESResidentReferralsV1.create(runtime,storage(),()=>invite);
let mutantCaught=false;try{await assert.rejects(bad.list(),/account-changed/);}catch(_){mutantCaught=true;}
assert.ok(mutantCaught,'calibration rejects missing account continuity guard');
// The action's actor must also survive the await BEFORE dispatch, not just afterward.
async function preDispatchRace(apiUnderTest,action) {
  const isolated=storage();isolated.setItem(pendingKey,JSON.stringify({token:'a'.repeat(64),owner:a}));
  let reads=0, dispatched=0;
  const raceRuntime={controller:{getSession:async()=>({user:{id:++reads===1?a:b},access_token:'synthetic'})},client:{rpc:()=>{dispatched++;return {setHeader:async()=>({data:{state:action==='accept'?'accepted':'issued',inviteId:invite,token:'b'.repeat(64)}})};}}};
  const c=apiUnderTest.create(raceRuntime,isolated,()=>invite);
  await assert.rejects(c[action](),/account-changed/);
  assert.equal(dispatched,0,'changed account rejected before sending private token');
}
await preDispatchRace(api,'accept');await preDispatchRace(api,'issue');
const preMutant=source.replace("if (expected && (expected.id !== before.user.id || expected.version !== version))",'if (false)');
const preWin={...win,sessionStorage:storage()};vm.runInNewContext(preMutant,{window:preWin});
await assert.rejects(preDispatchRace(preWin.LAIDIESResidentReferralsV1,'accept'),/Missing expected rejection/,'pre-dispatch calibration rejects known-bad race');
actor={user:{id:a},access_token:'synthetic-a'};
const terminalStore=storage();terminalStore.setItem(pendingKey,JSON.stringify({token:'a'.repeat(64),owner:a}));
response=async()=>({data:{state:'qualified',inviteId:invite}});
const terminal=api.create(runtime,terminalStore,()=>invite);
assert.equal((await terminal.accept()).state,'qualified','same-key terminal receipt remains truthful');
response=async()=>({data:{state:'withdrawn',inviteId:invite}});
assert.equal((await terminal.act('qualify',invite)).state,'withdrawn','withdrawn retry cannot claim necklace granted');
const slowStore=storage(),slowWin={...win,sessionStorage:slowStore,setTimeout:fn=>setTimeout(fn,0)};
vm.runInNewContext(source,{window:slowWin});
const slowRuntime={controller:{getSession:async()=>({user:{id:a},access_token:'synthetic-a'})},client:{rpc:()=>({setHeader:()=>new Promise(()=>{})})}};
await assert.rejects(slowWin.LAIDIESResidentReferralsV1.create(slowRuntime,slowStore,()=>invite).issue(),/service-unconfirmed/,'unresponsive service has bounded wait');
assert.equal(JSON.parse(slowStore.getItem('laidies_referral_issue_retry_v1')).key,invite,'timeout preserves retry identity');
console.log('PASS client token scrubbing, safe retry, guest denial, account switch/race, receipt validation; known-bad guard rejected');
