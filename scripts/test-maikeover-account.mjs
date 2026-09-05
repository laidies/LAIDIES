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
let current = {session:null}, session=null, claimed=[], restored=[], requested=[], rejectSave=false, confirm=true;
const runtime = {
  getState: async()=>current,
  client:{auth:{getSession:async()=>({data:{session}})}},
  writeLocalEnvelope:doc=>restored.push(doc),
  controller:{
    requestMagicLink:async(email,path)=>requested.push([email,path]),
    claimLocalCard:async(doc,key,revision)=>{if(rejectSave) throw Error('network'); claimed.push([doc,revision]); return {localPreserved:true};},
    signOut:async()=>{session=null;current={session:null};}
  }
};
let reloads=0;
const window={LAIDIESResidentAccountRuntime:{get:async()=>runtime}, dispatchEvent(){},addEventListener(){},
  confirm:()=>confirm, location:{pathname:'/maikeover.html',reload(){reloads++;}}};
vm.runInNewContext(source,{window,document:{getElementById:node},CustomEvent:class{},crypto:{randomUUID:()=> 'test-id'}});
await new Promise(setImmediate);
assert.equal(node('moAccountForm').hidden,false);
node('moAccountEmail').value='test@example.com';
await node('moAccountForm').handlers.submit({preventDefault(){}});
assert.deepEqual(requested,[['test@example.com','/maikeover.html']]);
assert.equal(await window.LAIDIESMaikeoverAccount.beforeSave(),null);
assert.equal(claimed.length,0);
session={user:{id:'a'}};current={session,remote:null};
const first=await window.LAIDIESMaikeoverAccount.beforeSave();
assert.equal(first.userId,'a');assert.equal(first.revision,null);
await window.LAIDIESMaikeoverAccount.save({fields:{displayName:'Test'}},first);
assert.equal(claimed.length,1);
current={session,remote:{card:{revision:'r1',document:{fields:{displayName:'Saved'}}}}};
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
    validateSession:window.LAIDIESMaikeoverAccount.validateSession}},
  localStorage:{setItem(){writes++;}},
  announceCardSave:message=>notices.push(message)
});
await pageHandler();
assert.equal(writes,0);
assert.equal(saveButton.disabled,false);
assert.match(notices[0],/sign-in changed/);
session=current.session;
rejectSave=true;
await assert.rejects(window.LAIDIESMaikeoverAccount.save({},update),/network/);
rejectSave=false;
await node('moAccountRestore').handlers.click.call(node('moAccountRestore'));
assert.equal(restored.length,1);assert.equal(reloads,1);
await node('moAccountSignOut').handlers.click.call(node('moAccountSignOut'));
assert.equal(node('moAccountForm').hidden,false);
console.log('MAiKEOVER onboarding tests passed: request return route, signed-out block, first save, replacement consent, account switch, failed save, restore, sign-out. Provider delivery and real cross-device use are not simulated proof.');
