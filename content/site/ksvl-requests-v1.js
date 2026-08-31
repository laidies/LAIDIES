(function installKsvlRequestsV1(global) {
  "use strict";
  var DRAFT_KEY = "laidies_ksvl_request_draft_v1", PENDING_KEY = "laidies_ksvl_request_submission_v1";
  var DAY = 86400000, DRAFT_TTL = 7 * DAY, PENDING_TTL = DAY;
  var ownerGeneration = 0, knownOwner = null;
  function currentOperation(generation) { if(generation !== ownerGeneration) throw new Error('request-account-changed'); }
  var STYLES = ["y2k-pop-anthem","y2k-teen-drama-ballad","y2k-rnb-slow-jam","late-90s-alt-rock","y2k-country-pop","coffeehouse-acoustic","y2k-retro-house","saint-anthem","deb-comedy-song"];
  function byId(id) { return global.document.getElementById(id); }
  function now() { return Date.now(); }
  function uuid() { if (!global.crypto || typeof global.crypto.randomUUID !== "function") throw new Error("request-idempotency-unavailable"); return global.crypto.randomUUID(); }
  function read(key) { try { return JSON.parse(global.localStorage.getItem(key) || "null"); } catch (_) { return null; } }
  function write(key, value) { var text = JSON.stringify(value); global.localStorage.setItem(key, text); if (global.localStorage.getItem(key) !== text) throw new Error("local-request-read-after-write-failed"); }
  function remove(key) { global.localStorage.removeItem(key); if (global.localStorage.getItem(key) !== null) throw new Error("local-request-remove-failed"); }
  function tryRemove(key) { try { remove(key); return true; } catch (_) { return false; } }
  function removeMatchingPending(pending) {var saved=read(PENDING_KEY);if(saved && saved.owner_id===pending.owner_id && saved.idempotency_key===pending.idempotency_key)remove(PENDING_KEY);}
  function safeText(value, maximum, multiline) { var blocked = multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/ : /[\u0000-\u001f\u007f]/; return typeof value === "string" && value.length <= maximum && !blocked.test(value); }
  function valid(payload) { return !!payload && STYLES.indexOf(payload.song_style) >= 0 && safeText(payload.topic, 200, false) && payload.topic.trim().length >= 3 && (payload.lyric_ideas === null || safeText(payload.lyric_ideas, 1000, true)); }
  function fields() { return { style:byId("ksvl-req-style"), topic:byId("ksvl-req-topic"), lyrics:byId("ksvl-req-lyrics"), form:byId("ksvl-request-form"), status:byId("ksvl-req-status"), submit:byId("ksvl-req-submit"), save:byId("ksvl-req-save-draft"), clear:byId("ksvl-req-clear-draft"), abandon:byId("ksvl-req-abandon-pending"), list:byId("ksvl-req-list") }; }
  function setStatus(view, message) { view.status.textContent = message; view.status.focus(); }
  function collect(view) { return { song_style:view.style.value, topic:view.topic.value.trim(), lyric_ideas:view.lyrics.value.trim() || null }; }
  function updateCounts(view) {var topic=byId('ksvl-req-topic-count'),lyrics=byId('ksvl-req-lyrics-count');if(topic)topic.textContent=view.topic.value.length+' / 200';if(lyrics)lyrics.textContent=view.lyrics.value.length+' / 1000';}
  function populate(view, payload) { view.style.value=payload.song_style||""; view.topic.value=payload.topic||""; view.lyrics.value=payload.lyric_ideas||""; updateCounts(view); }
  function clearForm(view) { view.form.reset(); updateCounts(view); }
  function clearVisible(view) { clearForm(view); if (view.list) view.list.replaceChildren(); }
  function clearPrivate(view) { clearVisible(view); tryRemove(PENDING_KEY); }
  function pendingFor(ownerId) { var pending=read(PENDING_KEY); if (!pending) return null; if (pending.owner_id!==ownerId) {remove(PENDING_KEY);return null;} if (!Number.isFinite(pending.saved_at)||now()-pending.saved_at>PENDING_TTL||!valid(pending.payload)) {pending={owner_id:ownerId,idempotency_key:pending.idempotency_key,saved_at:pending.saved_at,expired:true};write(PENDING_KEY,pending);} return pending; }
  function restoreDraft(view, ownerId) { var draft=read(DRAFT_KEY); if (!draft) return false; if (!Number.isFinite(draft.saved_at) || now()-draft.saved_at>DRAFT_TTL || !valid(draft.payload) || (draft.owner_id && draft.owner_id!==ownerId)) { tryRemove(DRAFT_KEY); return false; } if(ownerId && !draft.owner_id){draft.owner_id=ownerId;write(DRAFT_KEY,draft);} populate(view,draft.payload); return true; }
  function mask(view) { [view.topic,view.lyrics,view.form].forEach(function (element) { if (element) { element.setAttribute("data-clarity-mask","true"); element.classList.add("clarity-mask"); } }); }
  async function getRuntime() { return global.LAIDIESResidentAccountRuntime.get(); }
  async function getSession(runtime) { return runtime.controller.getSession(); }
  async function sameSession(runtime, session) { var current=await getSession(runtime); if (!session || !current || current.user.id!==session.user.id) throw new Error("request-account-changed"); return current; }
  async function rpc(runtime, session, name, args) { var generation=ownerGeneration; await sameSession(runtime,session);currentOperation(generation); var request=runtime.client.rpc(name,args); if (typeof request.setHeader!=="function") throw new Error("request-owner-binding-unavailable"); var result=await request.setHeader("Authorization","Bearer "+session.access_token); await sameSession(runtime,session);currentOperation(generation); return result; }
  function receiptText(receipt) { return "Received for station review · receipt "+receipt.receipt_id+". This does not mean DJ SunnyV has heard, selected or promised to produce it."; }
  async function renderRequests(view,runtime,session) {
    var generation=ownerGeneration;
    if (!view.list) return;
    var result=await rpc(runtime,session,"list_my_ksvl_song_requests_v1",{}); if (result.error) throw result.error; await sameSession(runtime,session);currentOperation(generation);
    var rows=Array.isArray(result.data)?result.data:[]; view.list.replaceChildren(); if (!rows.length) { view.list.textContent="No active station requests."; return; }
    rows.forEach(function(row) { var item=global.document.createElement("div"), label=global.document.createElement("span"), button=global.document.createElement("button"); label.textContent=row.status+" · receipt "+row.receipt_id; button.type="button"; button.textContent="Delete request"; button.setAttribute("data-ksvl-request-delete",row.receipt_id); button.addEventListener("click",function(){ deleteRequest(view,runtime,session,row.receipt_id,button); }); item.append(label,button); view.list.appendChild(item); });
  }
  async function deleteRequest(view,runtime,session,receiptId,button) {
    var generation=ownerGeneration;
    button.disabled=true;
    try { var result=await rpc(runtime,session,"delete_my_ksvl_song_request_v1",{p_receipt_id:receiptId});currentOperation(generation); if (result.error || !result.data || (result.data.state!=="deleted" && result.data.state!=="expired")) throw result.error||new Error("delete-unconfirmed"); var deletedMessage="Request text deleted from the active station database. A non-text retry receipt remains to prevent duplicate delivery; deletion does not reset the daily limit."; setStatus(view,deletedMessage); try {await renderRequests(view,runtime,session);}catch(error){if(error.message==='request-account-changed')throw error;setStatus(view,deletedMessage+' The list could not refresh yet.');} }
    catch(error) { button.disabled=false; if (error.message!=="request-account-changed") setStatus(view,"The station could not confirm deletion. The request is still being treated as active."); }
  }
  async function saveDraft(view) { var payload=collect(view); if (!valid(payload)) throw new Error("invalid-local-draft"); write(DRAFT_KEY,{owner_id:knownOwner,saved_at:now(),payload:payload}); }
  async function submit(view) {
    var generation=ownerGeneration,runtime=await getRuntime(), session=await getSession(runtime);currentOperation(generation); if (!session) { setStatus(view,"Sign in with your Resident Card before sending. You can explicitly save a seven-day device-only draft instead."); return; }
    var payload=collect(view); if (!valid(payload)) throw new Error("invalid-request"); var pending=pendingFor(session.user.id), fingerprint=JSON.stringify(payload);
    if (pending && (pending.expired || pending.fingerprint!==fingerprint)) throw new Error("pending-reconciliation-required");
    if (!pending) { pending={owner_id:session.user.id,idempotency_key:uuid(),fingerprint:fingerprint,payload:payload,saved_at:now()}; write(PENDING_KEY,pending); }
    var result=await rpc(runtime,session,"submit_my_ksvl_song_request_v1",{p_song_style:pending.payload.song_style,p_topic:pending.payload.topic,p_lyric_ideas:pending.payload.lyric_ideas,p_idempotency_key:pending.idempotency_key});
    if (result.error) {if(['22023','PT429','42501'].indexOf(result.error.code)!==-1)removeMatchingPending(pending);throw result.error;} if (!result.data || ['received','deleted','expired'].indexOf(result.data.state)===-1 || !/^[a-f0-9-]{36}$/i.test(result.data.receipt_id)) throw new Error("invalid-request-receipt"); await sameSession(runtime,session);currentOperation(generation);
    if(result.data.state!=='received'){removeMatchingPending(pending);if(JSON.stringify(collect(view))===fingerprint)clearVisible(view);setStatus(view,'That earlier request was '+result.data.state+'. It was not submitted again.');await renderRequests(view,runtime,session);return;}
    removeMatchingPending(pending); var draft=read(DRAFT_KEY);if(draft && draft.owner_id===session.user.id && JSON.stringify(draft.payload)===fingerprint)tryRemove(DRAFT_KEY);if(JSON.stringify(collect(view))===fingerprint)clearVisible(view);setStatus(view,receiptText(result.data));
    try { await renderRequests(view,runtime,session); } catch(error) { if (error.message==="request-account-changed") return; setStatus(view,receiptText(result.data)+" Your request list could not refresh yet."); }
  }
  function bind(view) {
    var busy=false;
    view.topic.addEventListener('input',function(){updateCounts(view);});view.lyrics.addEventListener('input',function(){updateCounts(view);});
    if (view.save) view.save.addEventListener("click",function(){ view.save.disabled=true; saveDraft(view).then(function(){setStatus(view,"Draft saved only on this device for seven days. It has not been sent or reviewed.");}).catch(function(){setStatus(view,"This browser could not save the draft. Nothing was sent; copy your text before leaving.");}).finally(function(){view.save.disabled=false;}); });
    if (view.clear) view.clear.addEventListener("click",function(){ if (tryRemove(DRAFT_KEY)) {clearForm(view);setStatus(view,"Device-only draft cleared. This does not withdraw any submitted or pending request.");} else setStatus(view,"This browser could not confirm the draft was cleared."); });
    if (view.abandon) view.abandon.addEventListener("click",function(){ if(!global.confirm('The earlier request may already have arrived. Starting a different request does not withdraw it. Check your request list before continuing. Start a different request?'))return; if (tryRemove(PENDING_KEY)) setStatus(view,"Pending retry abandoned. Edit or send a new request when ready."); else setStatus(view,"This browser could not clear the pending retry."); });
    view.form.addEventListener("submit",function(event){ event.preventDefault(); if (busy) return; busy=true; view.submit.disabled=true; submit(view).catch(function(error){ if(error.code==='PT429')setStatus(view,'Five requests have already been received in the last 24 hours. Please wait before sending another.');else if(error.code==='22023'||error.message==='invalid-request')setStatus(view,'Choose a style, enter a topic of 3–200 characters and keep lyric ideas under 1,000 characters.');else if(error.message==="pending-reconciliation-required") setStatus(view,"A prior request has an unknown result. Restore its exact text to retry the same key, or explicitly abandon that retry before changing it."); else if(error.message==="request-account-changed") return; else setStatus(view,"The station could not confirm this request. If a retry key was saved, retrying the unchanged idea will reuse it."); }).finally(function(){busy=false;view.submit.disabled=false;}); });
  }
  async function bootstrap(view) { var generation=ownerGeneration,runtime=await getRuntime(), session=await getSession(runtime);currentOperation(generation); if (!session) { restoreDraft(view,null); return false; } var pending=pendingFor(session.user.id); if(pending && !pending.expired) populate(view,pending.payload); else if(pending)setStatus(view,'An earlier request still needs reconciliation. Its private text has expired on this device; check the list before explicitly starting a different request.');else restoreDraft(view,session.user.id); await renderRequests(view,runtime,session); return true; }
  function init() {
    var view=fields(); if(!view.form||!view.style||!view.topic||!view.lyrics||!view.status||!view.submit) return Promise.resolve(false);
    mask(view); bind(view); // handlers install before any provider/network work
    getRuntime().then(async function(runtime){ var initial=await getSession(runtime), owner=initial?initial.user.id:null;knownOwner=owner; runtime.client.auth.onAuthStateChange(function(event,session){var next=session?session.user.id:null;if(next!==owner){var signingIn=!owner&&!!next;owner=next;knownOwner=next;ownerGeneration++;if(!signingIn){clearPrivate(view);tryRemove(DRAFT_KEY);}else if(view.list)view.list.replaceChildren();setStatus(view,next?'Signed in. Your private request list will refresh.':'Signed out. Private request text and list cleared.');global.setTimeout(function(){bootstrap(view).catch(function(){});},0);}}); return bootstrap(view); }).catch(function(error){if(error.message!=='request-account-changed'){if(view.list)view.list.replaceChildren();var draft=read(DRAFT_KEY);if(!knownOwner && draft && !draft.owner_id && !view.topic.value && !view.lyrics.value)restoreDraft(view,null);}});
    return Promise.resolve(true);
  }
  global.LAIDIESKSVLRequestsV1=Object.freeze({init:init});
})(window);
