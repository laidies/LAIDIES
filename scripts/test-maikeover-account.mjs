import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../content/site/maikeover-account-v1.js', import.meta.url), 'utf8');
const nodes = new Map();
function node(id) {
  if (!nodes.has(id)) nodes.set(id, {hidden:true, value:'', textContent:'', handlers:{},
    addEventListener(name, fn) { this.handlers[name] = fn; }, focus(){this.focused=true;}, scrollIntoView(){}});
  return nodes.get(id);
}
let current = {session:null}, session=null, claimed=[], restored=[], requested=[], rejectSave=false, confirm=true, rejectCode=true, authChanged;
const localHandles = new Map();
const runtime = {
  getState: async()=>current,
  client:{auth:{getSession:async()=>({data:{session}}),onAuthStateChange:fn=>{authChanged=fn;}}},
  writeLocalEnvelope:doc=>restored.push(doc),
  controller:{
    requestEmailCode:async(email,path)=>requested.push([email,path]),
    verifyEmailCode:async(email,code)=>{if(rejectCode) throw Error('expired'); session={user:{id:'a'}};current={session,remote:null};},
    claimLocalCard:async(doc,key,revision,handle)=>{
      if(rejectSave) throw Error('network');
      claimed.push([doc,revision,handle]);
      return {localPreserved:true,remote:{profile:{card_username:handle}}};
    },
    signOut:async()=>{session=null;current={session:null};}
  }
};
let reloads=0, events={};
const window={LAIDIESResidentAccountRuntime:{get:async()=>runtime}, dispatchEvent(){},addEventListener:(name,fn)=>{events[name]=fn;},
  setTimeout, confirm:()=>confirm, location:{pathname:'/maikeover.html',reload(){reloads++;}},
  localStorage:{getItem:key=>localHandles.get(key)||null,setItem:(key,value)=>localHandles.set(key,String(value)),removeItem:key=>localHandles.delete(key)}};
vm.runInNewContext(source,{window,document:{getElementById:node},CustomEvent:class{},crypto:{randomUUID:()=> 'test-id'}});
await new Promise(setImmediate);
assert.equal(node('moAccountForm').hidden,false);
assert.equal(node('residentFounderBadge').hidden,true);
current={session:{user:{id:'3b899784-7e33-4a0e-8439-be6ed1a65ef0'}}};
await events.focus(); await new Promise(setImmediate);
assert.equal(node('residentFounderBadge').hidden,false,'verified founder badge visible');
current={session:{user:{id:'other'}}};
await events.focus(); await new Promise(setImmediate);
assert.equal(node('residentFounderBadge').hidden,true,'account switch hides badge');
current={session:null};
await events.focus(); await new Promise(setImmediate);
assert.equal(node('residentFounderBadge').hidden,true,'signed out hides badge');
node('moAccountEmail').value='test@example.com';
await node('moAccountForm').handlers.submit({preventDefault(){}});
assert.deepEqual(requested,[['test@example.com','/maikeover.html']]);
assert.equal(node('moAccountCodeForm').hidden,false);
assert.equal(node('moAccountForm').hidden,true);
events.focus();
await new Promise(setImmediate);
assert.equal(node('moAccountCodeForm').hidden,false,'return from email preserves code entry');
assert.match(node('moAccountStatus').textContent,/Check test@example.com/);
await node('moAccountResend').handlers.click();
assert.equal(requested.length,1,'resend cooldown prevents another request');
node('moAccountCode').value='123456';
await node('moAccountCodeForm').handlers.submit({preventDefault(){}});
assert.match(node('moAccountStatus').textContent,/couldn’t finish verification/);
assert.equal(node('moAccountCodeForm').hidden,false);
assert.equal(await window.LAIDIESMaikeoverAccount.beforeSave(),null);
assert.equal(claimed.length,0);
rejectCode=false;
await node('moAccountCodeForm').handlers.submit({preventDefault(){}});
assert.equal(node('moAccountCodeForm').hidden,true);
assert.equal(node('moAccountReady').hidden,false);
assert.equal(node('moEpisodeConsent').checked,false,'newsletter starts unchecked after verification');
node('moEpisodeConsent').checked=true;
await events.focus();
await new Promise(setImmediate);
assert.equal(node('moEpisodeConsent').checked,true,'ordinary refresh does not erase an explicit choice');
session={user:{id:'other',email:'other@example.com'}};current={session,remote:null};
await events.focus();
await new Promise(setImmediate);
assert.equal(node('moEpisodeConsent').checked,false,'different user cannot inherit consent');
assert.equal(node('moEpisodeEmail').value,'other@example.com','newsletter email follows verified user');
session={user:{id:'a'}};current={session,remote:null};
const first=await window.LAIDIESMaikeoverAccount.beforeSave();
assert.equal(first.userId,'a');assert.equal(first.revision,null);
await assert.rejects(
  window.LAIDIESMaikeoverAccount.save({fields:{displayName:'Test'}},first,'bad-handle'),
  /Choose a handle/
);
await window.LAIDIESMaikeoverAccount.save({fields:{displayName:'Test'}},first,'test_handle');
assert.equal(claimed.length,1);
assert.equal(claimed[0][2],'test_handle');
assert.equal(localHandles.get('laidies_card_username'),'test_handle');
current={session,remote:{card:{revision:'r1',document:{fields:{displayName:'Saved'}}},profile:{card_username:'saved_handle'}}};
confirm=false;
assert.equal(await window.LAIDIESMaikeoverAccount.beforeSave(),null);
await node('moAccountRestore').handlers.click.call(node('moAccountRestore'));
assert.equal(restored.length,0);
confirm=true;
const update=await window.LAIDIESMaikeoverAccount.beforeSave();
assert.equal(update.revision,'r1');
session={user:{id:'b'}};
await assert.rejects(window.LAIDIESMaikeoverAccount.validateSession(update),/sign-in changed/);
await assert.rejects(window.LAIDIESMaikeoverAccount.save({},update),/sign-in changed/);
assert.equal(claimed.length,1);
// Exercise the real page handler too: a changed account must stop before any
// browser write, not merely before the later remote claim.
const html = fs.readFileSync(new URL('../maikeover.html', import.meta.url), 'utf8');
const handlerStart = html.indexOf("    $('moSave').addEventListener('click', async function(){");
const handlerEnd = html.indexOf('    // ---- hydrate from existing state ----', handlerStart);
let pageHandler, writes=0, notices=[];
const saveButton={disabled:false,addEventListener:(_,fn)=>{pageHandler=fn;}};
vm.runInNewContext(html.slice(handlerStart,handlerEnd), {
  $:id=>id==='moSave'?saveButton:{style:{}},
  window:{LAIDIESMaikeoverAccount:{beforeSave:async()=>update,
    validateSession:window.LAIDIESMaikeoverAccount.validateSession},
    LAIDIESMaikeoverHandle:{value:()=> 'test_handle',valid:()=>true}},
  localStorage:{setItem(){writes++;}},
  announceCardSave:message=>notices.push(message)
});
await pageHandler();
assert.equal(writes,0);
assert.equal(saveButton.disabled,false);
assert.match(notices[0],/sign-in changed/);
session=current.session;
rejectSave=true;
await assert.rejects(window.LAIDIESMaikeoverAccount.save({},update,'test_handle'),/network/);
rejectSave=false;
await node('moAccountRestore').handlers.click.call(node('moAccountRestore'));
assert.equal(restored.length,1);assert.equal(reloads,1);
assert.equal(localHandles.get('laidies_card_username'),'saved_handle','confirmed restore refreshes the local fallback from the account');
await node('moAccountSignOut').handlers.click.call(node('moAccountSignOut'));
assert.equal(node('moAccountForm').hidden,false);
assert.equal(node('moEpisodeConsent').checked,false,'signout clears subscription intent');
assert.equal(node('moEpisodeEmail').value,'','signout clears the newsletter email');
session={user:{id:'a',email:'test@example.com'}};current={session};
events.focus();await new Promise(setImmediate);
assert.equal(node('moAccountReady').hidden,false);
session=null;current={session:null};authChanged('SIGNED_OUT');
await new Promise(resolve=>setTimeout(resolve,10));
assert.equal(node('moAccountReady').hidden,true,'background session expiry clears stale signed-in UI without focus/reload');
assert.equal(node('moAccountForm').hidden,false);
console.log('MAiKEOVER onboarding tests passed: request return route, signed-out block, first save, replacement consent, account switch, failed save, restore, sign-out. Provider delivery and real cross-device use are not simulated proof.');
