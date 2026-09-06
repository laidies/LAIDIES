import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../content/site/clip-bank.js',import.meta.url),'utf8');
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));

function fixture({owner='a1111111-1111-4111-8111-111111111111', snapshots={}, dependency=true}={}) {
  const listeners=new Map(), writes=[];
  const stored=new Map([
    ['laidiesQuizProgress',JSON.stringify({forged:{bestScore:99999,attempts:99}})],
    ['laidies_bookfair_redeemed',JSON.stringify({forged:{cost:99999}})]
  ]);
  const localStorage={getItem:key=>stored.get(key)??null,setItem:(key,value)=>{writes.push([key,value]);stored.set(key,value);}};
  let authListener;
  let activeOwner=owner;
  const document={
    addEventListener(type,fn){(listeners.get(type)||listeners.set(type,[]).get(type)).push(fn);},
    dispatchEvent(event){for(const fn of listeners.get(event.type)||[]) fn(event); return true;}
  };
  const windowListeners=new Map();
  const runtime={
    controller:{getSession:async()=>activeOwner?{user:{id:activeOwner}}:null},
    client:{auth:{onAuthStateChange(fn){authListener=fn;return {data:{subscription:{unsubscribe(){}}}};}}}
  };
  const wallet={
    disposed:false,
    invalidate(){},
    dispose(){this.disposed=true;},
    async snapshot(id){
      const response=typeof snapshots[id]==='function'?snapshots[id]():snapshots[id];
      return await response;
    }
  };
  class CustomEvent {constructor(type,options={}){this.type=type;this.detail=options.detail;}}
  const context={window:null,document,CustomEvent,localStorage,Promise,setTimeout,clearTimeout,console};
  context.window=context;
  context.addEventListener=(type,fn)=>{(windowListeners.get(type)||windowListeners.set(type,[]).get(type)).push(fn);};
  context.fireWindow=(type,event={})=>{for(const fn of windowListeners.get(type)||[])fn(event);};
  if(dependency){
    context.LAIDIESResidentAccountRuntime={get:async()=>runtime};
    context.LAIDIESCreateClipWalletClientV1=()=>wallet;
  }
  vm.runInNewContext(source,context,{filename:'clip-bank.js'});
  return {context,stored,writes,runtime,wallet,get owner(){return activeOwner;},set owner(value){activeOwner=value;},auth(session){authListener?.('TOKEN_CHANGED',session);}};
}
function snapshot(available,extras={}) {return {available,pending:0,lifetime_earned:available,lifetime_spent:0,lifetime_refunded:0,lifetime_adjusted:0,history:[],next_cursor:null,legacy_review_required:false,...extras};}

{
  const f=fixture({snapshots:{'a1111111-1111-4111-8111-111111111111':snapshot(6)}});
  const original=[...f.stored.entries()];
  await f.context.LaidiesClips.ready();
  assert.equal(f.context.LaidiesClips.available(),6,'forged browser score cannot determine account balance');
  assert.deepEqual([...f.stored.entries()],original,'legacy local bytes are left untouched');
  assert.deepEqual(f.writes,[],'account adapter performs no local writes');
  assert.equal(f.context.LaidiesClips.redeem('bf-poster',25).reason,'unavailable');
  assert.deepEqual(f.writes,[],'redeem cannot create a local entitlement');
}
{
  const a='a1111111-1111-4111-8111-111111111111';
  const f=fixture({owner:a,snapshots:{[a]:snapshot(6)}});
  await f.context.LaidiesClips.ready();
  f.owner=''; f.auth(null);
  assert.equal(f.context.LaidiesClips.available(),null,'lost authentication clears the number immediately');
  assert.equal(f.context.LaidiesClips.status(),'signin');
}
{
  const a='a1111111-1111-4111-8111-111111111111', b='b2222222-2222-4222-8222-222222222222';
  let resolveB;
  const bPending=new Promise(resolve=>{resolveB=resolve;});
  const f=fixture({owner:a,snapshots:{[a]:snapshot(6),[b]:()=>bPending}});
  await f.context.LaidiesClips.ready();
  f.owner=b; f.auth({user:{id:b}});
  assert.equal(f.context.LaidiesClips.available(),null,'account B never sees account A while B loads');
  resolveB(snapshot(2)); await tick(); await tick();
  assert.equal(f.context.LaidiesClips.available(),2);
}
{
  const a='a1111111-1111-4111-8111-111111111111', b='b2222222-2222-4222-8222-222222222222';
  const f=fixture({owner:a,snapshots:{[a]:snapshot(6)}});
  await f.context.LaidiesClips.ready();
  let ownerCalls=0, releaseFinalOwner;
  f.runtime.controller.getSession=()=>{
    ownerCalls+=1;
    if(ownerCalls===2) return new Promise(resolve=>{releaseFinalOwner=resolve;});
    return Promise.resolve(f.owner?{user:{id:f.owner}}:null);
  };
  const staleRefresh=f.context.LaidiesClips.refresh();
  await tick();
  f.owner=b; f.auth({user:{id:b}});
  releaseFinalOwner({user:{id:a}});
  await staleRefresh; await tick();
  assert.notEqual(f.context.LaidiesClips.available(),6,'a final owner lookup that spans an account change cannot republish account A');
  f.context.LaidiesClips.dispose();
  assert.equal(f.wallet.disposed,true,'disposing the bank also disposes its wallet client');
}
{
  const a='a1111111-1111-4111-8111-111111111111';
  const f=fixture({owner:a,snapshots:{[a]:snapshot(6,{legacy_review_required:true})}});
  await f.context.LaidiesClips.ready();
  assert.equal(f.context.LaidiesClips.available(),null,'unreconciled legacy awards are not shown as a wallet amount');
  assert.equal(f.context.LaidiesClips.status(),'reconciliation');
}
{
  const f=fixture({dependency:false});
  await f.context.LaidiesClips.ready();
  assert.equal(f.context.LaidiesClips.available(),null,'missing account reader is unknown, never zero');
  assert.equal(f.context.LaidiesClips.status(),'unavailable');
}
console.log('Clip bank account adapter: account projection, auth clearing, account-switch isolation, unavailable dependency, and no local writes pass.');
