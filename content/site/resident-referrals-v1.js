(function installResidentReferrals(global) {
  'use strict';
  var PENDING = 'laidies_pending_referral_v1';
  var ISSUE = 'laidies_referral_issue_retry_v1';
  var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  var TOKEN = /^[0-9a-f]{32,128}$/i;
  function bounded(promise) {
    var timer;
    return Promise.race([promise,new Promise(function(_,reject){timer=global.setTimeout(function(){reject(new Error('service-unconfirmed'));},15000);})]).finally(function(){global.clearTimeout(timer);});
  }
  function read(storage, key) { try {return JSON.parse(storage.getItem(key) || 'null');} catch (_) {return null;} }
  function write(storage, key, value) {
    var text = JSON.stringify(value);
    storage.setItem(key, text);
    if (storage.getItem(key) !== text) throw new Error('retry-storage-unavailable');
  }
  function capture(storage, location, history) {
    var match = /^#invite=([0-9a-f]{32,128})$/i.exec(location.hash || '');
    if (!location.hash) return;
    // The token never reaches analytics or a following page's referrer.
    history.replaceState(null, '', location.pathname + location.search);
    if (match) write(storage, PENDING, {token:match[1], owner:null});
  }
  function create(runtime, storage, randomUUID) {
    var owner = null, generation = 0;
    async function session() {return bounded(runtime.controller.getSession());}
    async function syncOwner() {
      var current = await session(), next = current ? current.user.id : null;
      if (owner !== next) {
        generation++;
        if (owner) {storage.removeItem(PENDING);storage.removeItem(ISSUE);}
        owner = next;
      }
      var pending = read(storage, PENDING);
      if (pending && pending.owner && pending.owner !== next) storage.removeItem(PENDING);
      else if (pending && next && !pending.owner) {pending.owner = next;write(storage,PENDING,pending);}
      return current;
    }
    function binding(current) {
      if (!current) throw new Error('sign-in-required');
      return {id:current.user.id,version:generation};
    }
    async function actionOwner() {
      var previous=owner,current=await syncOwner();
      if(previous && (!current || current.user.id!==previous))throw new Error('account-changed');
      return current;
    }
    async function call(name, args, expected) {
      var before = await syncOwner(), version = generation;
      if (!before) throw new Error('sign-in-required');
      if (expected && (expected.id !== before.user.id || expected.version !== version)) throw new Error('account-changed');
      var request = runtime.client.rpc(name,args || {});
      if (typeof request.setHeader !== 'function') throw new Error('owner-binding-unavailable');
      var result = await bounded(request.setHeader('Authorization','Bearer '+before.access_token));
      var after = await syncOwner();
      if (version !== generation || !after || after.user.id !== before.user.id) throw new Error('account-changed');
      if (result.error) throw new Error(result.error.code === 'PT429' ? 'rate-limit' : 'service-unconfirmed');
      if (!result.data) throw new Error('service-unconfirmed');
      return result.data;
    }
    async function issue(key) {
      var current = await actionOwner();
      var expected = binding(current);
      var pending = read(storage,ISSUE);
      if (!key) {
        if (!pending || pending.owner !== owner) {
          pending = {owner:owner,key:randomUUID()};write(storage,ISSUE,pending);
        }
        key = pending.key;
      }
      if (!UUID.test(key)) throw new Error('invalid-retry-key');
      var data = await call('issue_resident_referral_v1',{p_idempotency_key:key},expected);
      if (!UUID.test(data.inviteId) || ['issued','accepted','qualified','revoked','withdrawn','expired'].indexOf(data.state)<0 || (data.state==='issued' && !TOKEN.test(data.token))) throw new Error('service-unconfirmed');
      var saved=read(storage,ISSUE);
      if(saved && saved.owner===expected.id && saved.key===key)storage.removeItem(ISSUE);
      return data;
    }
    async function list() {
      var rows = await call('list_my_resident_referrals_v1',{});
      if (!Array.isArray(rows) || rows.some(function(row){return !UUID.test(row.inviteId) || ['sender','recipient'].indexOf(row.role)<0 || ['issued','accepted','qualified','revoked','withdrawn','expired'].indexOf(row.state)<0;})) throw new Error('service-unconfirmed');
      return rows;
    }
    async function inspect() {
      var expected = binding(await syncOwner());
      var pending = read(storage,PENDING);
      if (!pending || !TOKEN.test(pending.token)) return null;
      return call('inspect_resident_referral_invite_v1',{p_token:pending.token},expected);
    }
    async function accept() {
      var expected = binding(await actionOwner());
      var pending = read(storage,PENDING);
      if (!pending || !TOKEN.test(pending.token)) throw new Error('invite-unavailable');
      if (!pending.acceptKey) {pending.acceptKey=randomUUID();write(storage,PENDING,pending);}
      var data = await call('accept_resident_referral_invite_v1',{p_token:pending.token,p_idempotency_key:pending.acceptKey},expected);
      if (['accepted','qualified','withdrawn','revoked','expired'].indexOf(data.state)<0 || !UUID.test(data.inviteId)) throw new Error('service-unconfirmed');
      storage.removeItem(PENDING);
      return data;
    }
    async function act(action, inviteId) {
      if (!UUID.test(inviteId)) throw new Error('invalid-invite');
      var current = await actionOwner();
      var expected = binding(current);
      var keyName='laidies_referral_action_'+action+'_'+inviteId;
      var pending=read(storage,keyName);
      if (!pending || pending.owner!==owner) {pending={owner:owner,key:randomUUID()};write(storage,keyName,pending);}
      var names={qualify:'qualify_my_resident_referral_v1',revoke:'revoke_my_resident_referral_v1',withdraw:'withdraw_my_resident_referral_v1'};
      if (!names[action]) throw new Error('invalid-action');
      var args={p_idempotency_key:pending.key};
      if(action!=='qualify') args.p_invite_id=inviteId;
      var data=await call(names[action],args,expected);
      var states={qualify:['qualified','withdrawn','expired'],revoke:['revoked'],withdraw:['withdrawn']}[action];
      if(states.indexOf(data.state)<0 || data.inviteId!==inviteId) throw new Error('service-unconfirmed');
      storage.removeItem(keyName);
      return data;
    }
    return Object.freeze({syncOwner:syncOwner,issue:issue,list:list,inspect:inspect,accept:accept,act:act});
  }
  global.LAIDIESResidentReferralsV1=Object.freeze({create:create,capture:capture});
  var captureFailed=false;
  try {capture(global.sessionStorage,global.location,global.history);} catch (_) {captureFailed=true;}
  async function init() {
    var doc=global.document, panel=doc.getElementById('referralPanel');
    if(!panel) return;
    var status=doc.getElementById('referralStatus'), list=doc.getElementById('referralList');
    var invite=doc.getElementById('referralLink'), share=doc.getElementById('referralShare');
    var createButton=doc.getElementById('referralCreate'), acceptButton=doc.getElementById('referralAccept');
    var refreshButton=doc.getElementById('referralRefresh'), controller, busy=false, signedIn=false, refreshAfterBusy=false;
    function say(text) {status.textContent=text;status.focus();}
    function clearPrivate() {list.replaceChildren();invite.value='';share.hidden=true;acceptButton.hidden=true;}
    function button(label, handler) {
      var b=doc.createElement('button');b.type='button';b.textContent=label;
      b.addEventListener('click',handler);return b;
    }
    function failure(error) {
      if(error.message==='account-changed') {clearPrivate();say('The signed-in account changed. Private invitation details were cleared.');}
      else if(error.message==='sign-in-required') say('Sign in with your Resident Card, then return here. Opening an invitation does not accept it.');
      else if(error.message==='rate-limit') say('The invitation limit has been reached. Your existing invitations are still available below.');
      else if(error.message==='retry-storage-unavailable') say('This browser could not keep a safe retry key. No new invitation was requested.');
      else say('The service could not confirm that action. Refresh your receipts before retrying; a retry uses the same saved key.');
    }
    async function run(fn) {
      if(busy) return;busy=true;
      Array.from(panel.querySelectorAll('button')).forEach(function(b){b.disabled=true;});
      try {await fn();} catch(error) {failure(error);}
      finally {busy=false;Array.from(panel.querySelectorAll('button')).forEach(function(b){b.disabled=!signedIn;});if(refreshAfterBusy){refreshAfterBusy=false;global.setTimeout(function(){run(refreshAccount);},0);}}
    }
    async function refreshAccount() {
      var current=await controller.syncOwner();signedIn=!!current;
      if(current)await refresh();else say('Sign in with your Resident Card, then return here. Opening an invitation does not accept it.');
    }
    async function refreshIncoming() {
      acceptButton.hidden=true;
      var incoming=await controller.inspect();
      if(incoming && incoming.state==='issued' && incoming.action==='accept') {acceptButton.hidden=false;say('An invitation is ready. Accept only if you want to join through the person who shared this link. You can also join without accepting it.');}
      else if(incoming && incoming.reason==='already-resident') say('You already have a Resident Card. This invitation is for someone making her first account Card; it has not been accepted.');
      else if(incoming) say('This invitation is '+incoming.state+'. No acceptance or necklace was created by opening it.');
      else say('Your private invitation receipts are ready. No points, stamps or background unlocks are awarded by this service.');
    }
    async function showLink(key) {
      var receipt=await controller.issue(key);
      if(receipt.state!=='issued') {invite.value='';share.hidden=true;say('This invitation is '+receipt.state+'. No usable link was returned.');await refresh();return;}
      invite.value=global.location.origin+'/resident-referrals.html#invite='+receipt.token;
      share.hidden=false;
      await refresh();
      say('Invitation ready. Share this private link with one friend. Creating or copying it does not mean it was sent or accepted.');
    }
    async function action(type,id) {
      var receipt=await controller.act(type,id);
      await refresh();
      say(receipt.state==='qualified' ? 'Confirmed: you both received the matching BEST FRIENDS necklace. Open your Closet to see it.' : receipt.state==='revoked' ? 'Invitation revoked. It can no longer be accepted.' : receipt.state==='withdrawn' ? 'Invitation relationship withdrawn. Any recognition from this invitation has been removed; older collectibles are unchanged.' : 'This invitation has expired. No necklace was awarded.');
      return receipt;
    }
    async function refresh() {
      var rows=await controller.list();list.replaceChildren();
      if(!rows.length) list.textContent='No invitation receipts for this account.';
      rows.forEach(function(row){
        var item=doc.createElement('li'), label=doc.createElement('p');
        label.textContent=(row.role==='sender'?'Your invitation':'Invitation you accepted')+' · '+row.state+' · '+row.inviteId;
        item.appendChild(label);
        if(row.role==='sender' && row.state==='issued') {
          item.appendChild(button('Show private link',function(){run(function(){return showLink(row.issueIdempotencyKey);});}));
          item.appendChild(button('Revoke invitation',function(){run(function(){return action('revoke',row.inviteId);});}));
        }
        if(row.role==='recipient' && row.state==='accepted') item.appendChild(button('I made my Card — check the necklace',function(){run(function(){return action('qualify',row.inviteId);});}));
        if(row.state==='qualified' || (row.state==='accepted' && row.role==='recipient')) item.appendChild(button('Withdraw this relationship',function(){run(function(){return action('withdraw',row.inviteId);});}));
        list.appendChild(item);
      });
      await refreshIncoming();
    }
    createButton.addEventListener('click',function(){run(function(){return showLink();});});
    refreshButton.addEventListener('click',function(){run(refresh);});
    acceptButton.addEventListener('click',function(){run(async function(){var receipt=await controller.accept();acceptButton.hidden=true;await refresh();say(receipt.state==='accepted'?'Invitation accepted. Make and save your Resident Card with your account, then return here to check your matching necklace.':'The invitation is '+receipt.state+'. Your receipts show its current state.');});});
    doc.getElementById('referralCopy').addEventListener('click',function(){
      if(!invite.value) return;
      if(!global.navigator.clipboard) {invite.focus();invite.select();say('Copy the selected private link.');return;}
      global.navigator.clipboard.writeText(invite.value).then(function(){say('Private link copied. Delivery and acceptance are not confirmed.');}).catch(function(){invite.focus();invite.select();say('Automatic copying was unavailable. Copy the selected link.');});
    });
    try {
      var runtime=await bounded(global.LAIDIESResidentAccountRuntime.get());
      controller=create(runtime,global.sessionStorage,function(){return global.crypto.randomUUID();});
      var session=await controller.syncOwner(), previous=session?session.user.id:null;
      signedIn=!!session;
      runtime.client.auth.onAuthStateChange(function(event,next){
        var id=next?next.user.id:null;
        signedIn=!!id;
        if(id!==previous) {previous=id;clearPrivate();global.setTimeout(function(){if(busy)refreshAfterBusy=true;else run(refreshAccount);},0);}
      });
      if(!session) {createButton.disabled=true;refreshButton.disabled=true;say(captureFailed?'The invitation could not be kept safely in this tab. Sign in, then reopen the original invitation link.':'Sign in with your Resident Card, then return here. Opening an invitation does not accept it.');return;}
      createButton.disabled=false;refreshButton.disabled=false;
      await run(refresh);
    } catch(error) {failure(error);if(!controller){createButton.disabled=true;refreshButton.disabled=true;}}
  }
  if(global.document.readyState==='loading')global.document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window);
