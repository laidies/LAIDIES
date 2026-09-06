(function (global) {
  "use strict";
  var EPS=["01","02","03","04"], ID=/^[A-Za-z0-9._:@-]{1,120}$/, UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, MAX=2097152, TEXT=16384, MAX_PENDING=32;
  function clone(x){return x==null?x:JSON.parse(JSON.stringify(x));}
  function obj(x){return !!x&&typeof x==="object"&&!Array.isArray(x);}
  function keys(x,a){return obj(x)&&Object.keys(x).length===a.length&&a.every(function(k){return Object.prototype.hasOwnProperty.call(x,k);});}
  function id(x){return typeof x==="string"&&ID.test(x);}
  function time(x){return typeof x==="string"&&x.length>=20&&x.length<=40;}
  function now(){return new Date().toISOString();}
  function empty(){return {version:1,episodes:{}};}
  function ep(){return {packs:{},exercises:{},cards:{},quizzes:{}};}
  function fail(ok,msg){if(!ok)throw new TypeError(msg);}
  function k(id0,v){fail(id(id0)&&id(v),"A canonical ID and version are required.");return id0+"@"+v;}
  function size(x){try{return JSON.stringify(x).length;}catch(_){return Infinity;}}
  function placements(x){return Array.isArray(x)&&x.length<=30&&!x.some(function(p){return !keys(p,["sticker_id","x","y","scale","rotation","z"])||!id(p.sticker_id)||![p.x,p.y,p.scale,p.rotation,p.z].every(Number.isFinite)||p.x<0||p.x>1||p.y<0||p.y>1||p.scale<.25||p.scale>4||p.rotation<-360||p.rotation>360||!Number.isInteger(p.z)||p.z<0||p.z>99;});}
  function fieldState(x){
    if(!keys(x,["fields"])||!obj(x.fields)||Object.keys(x.fields).length>64)return false;
    return !Object.keys(x.fields).some(function(name){
      var value=x.fields[name],type=typeof value;
      if(name==="__proto__"||name==="constructor"||name==="prototype"||!id(name))return true;
      if(type==="string")return value.length>TEXT;
      if(type==="boolean")return false;
      if(type==="number")return !Number.isFinite(value)||value < -1000000||value > 1000000;
      return true;
    });
  }
  function state(x){
    if(fieldState(x))return true;
    if(!keys(x,["task","responses","ratings","comparison_notes","chosen_result","final_edit","current_step"])||!keys(x.responses,["chatgpt","claude","gemini"])||!obj(x.ratings)||Object.keys(x.ratings).length>12)return false;
    var a=[x.task,x.responses.chatgpt,x.responses.claude,x.responses.gemini,x.comparison_notes,x.chosen_result,x.final_edit];
    return a.every(function(t){return typeof t==="string"&&t.length<=TEXT;})&&typeof x.current_step==="string"&&x.current_step.length<=120&&!Object.keys(x.ratings).some(function(n){return !/^[A-Za-z0-9._:-]{1,80}$/.test(n)||!Number.isFinite(x.ratings[n])||x.ratings[n]<0||x.ratings[n]>10;});
  }
  function valid(d){
    if(!keys(d,["version","episodes"])||d.version!==1||!obj(d.episodes)||Object.keys(d.episodes).length>4)return null;
    var out=empty(),es=Object.keys(d.episodes);
    for(var n=0;n<es.length;n++){
      var ekey=es[n],e=d.episodes[ekey];
      if(EPS.indexOf(ekey)<0||!keys(e,["packs","exercises","cards","quizzes"])||![e.packs,e.exercises,e.cards,e.quizzes].every(obj)||Object.keys(e.packs).length>16||Object.keys(e.exercises).length>16||Object.keys(e.cards).length>24||Object.keys(e.quizzes).length>8)return null;
      var r=ep(),list=Object.keys(e.packs),i,kk,v;
      for(i=0;i<list.length;i++){kk=list[i];v=e.packs[kk];if(!id(kk)||!keys(v,["content_id","content_version","saved_at","placements"])||!id(v.content_id)||!id(v.content_version)||!time(v.saved_at)||!placements(v.placements))return null;r.packs[kk]=clone(v);}
      list=Object.keys(e.exercises);for(i=0;i<list.length;i++){kk=list[i];v=e.exercises[kk];if(!id(kk)||!keys(v,["exercise_version","input_state","placements","updated_at"])||!id(v.exercise_version)||!time(v.updated_at)||!state(v.input_state)||!placements(v.placements))return null;r.exercises[kk]=clone(v);}
      list=Object.keys(e.cards);for(i=0;i<list.length;i++){kk=list[i];v=e.cards[kk];if(!id(kk)||!keys(v,["card_version","saved_at","placements"])||!id(v.card_version)||!time(v.saved_at)||!placements(v.placements))return null;r.cards[kk]=clone(v);}
      list=Object.keys(e.quizzes);for(i=0;i<list.length;i++){
        kk=list[i];v=e.quizzes[kk];if(!id(kk)||!keys(v,["quiz_version","attempts"])||!id(v.quiz_version)||!Array.isArray(v.attempts)||v.attempts.length>25)return null;
        for(var z=0;z<v.attempts.length;z++){var a=v.attempts[z];if(!keys(a,["attempt_id","completed_at","score","max_score","answers"])||!UUID.test(a.attempt_id)||!time(a.completed_at)||!Number.isFinite(a.score)||!Number.isFinite(a.max_score)||a.score<0||a.max_score<=0||a.score>a.max_score||a.max_score>1000||!obj(a.answers)||Object.keys(a.answers).length>20||Object.keys(a.answers).some(function(q){return !id(q)||!Number.isInteger(a.answers[q])||a.answers[q]<0||a.answers[q]>20;}))return null;}
        r.quizzes[kk]=clone(v);
      }
      out.episodes[ekey]=r;
    }
    return size(out)<=MAX?out:null;
  }
  function same(a,b){function ordered(x){if(Array.isArray(x))return x.map(ordered);if(obj(x)){var r={};Object.keys(x).sort().forEach(function(k){r[k]=ordered(x[k]);});return r;}return x;}return JSON.stringify(ordered(a))===JSON.stringify(ordered(b));}
  function create(runtime,options){
    fail(runtime&&runtime.client&&runtime.controller,"The Resident account runtime is required.");options=options||{};
    var cache=null,revision=null,owner="",gen=0,sub=null,pending=Object.create(null);
    function clear(next){next=next||"";if(next!==owner){cache=null;revision=null;gen++;pending=Object.create(null);}owner=next;}
    if(runtime.client.auth&&typeof runtime.client.auth.onAuthStateChange==="function"){var event=runtime.client.auth.onAuthStateChange(function(_,s){clear(s&&s.user&&String(s.user.id));});sub=event&&event.data&&event.data.subscription;}
    function mutationKey(value){fail(typeof value==="string"&&UUID.test(value),"A valid stable UUID mutation key is required.");return value;}
    function generatedUuid(){var value=options.uuid?options.uuid():global.crypto&&global.crypto.randomUUID&&global.crypto.randomUUID();fail(typeof value==="string"&&UUID.test(value),"A valid UUID is required.");return value;}
    function reserve(key){if(!pending[key]&&Object.keys(pending).length>=MAX_PENDING)throw new RangeError("This account already has 32 Episode Binder saves waiting for confirmation. Retry or reload those saves before starting another.");}
    async function session(){var s=await runtime.controller.getSession();if(!s||!s.user||!s.user.id)throw new Error("authentication-required");clear(String(s.user.id));return {owner:owner,gen:gen};}
    function current(t){if(t.owner!==owner||t.gen!==gen)throw new Error("account-changed-reload-binder");}
    async function load(boundToken){var observed=await session(),t=boundToken||observed;if(boundToken)current(boundToken);var x=await runtime.client.rpc("get_my_resident_episode_binder_v1",{p_expected_owner:t.owner});if(x.error)throw x.error;current(t);var b=x.data&&x.data.binder;if(!b){cache=empty();revision=null;return {state:"empty",document:clone(cache),revision:null};}cache=valid(b.document);if(!cache||!b.revision)throw new Error("invalid-resident-episode-binder-v1");revision=b.revision;return {state:"saved",document:clone(cache),revision:revision};}
    async function saveDocument(d,keyValue,expectedValue,boundToken){
      var key=mutationKey(keyValue),observed=await session(),t=boundToken||observed;if(boundToken)current(boundToken);reserve(key);var saved=pending[key];
      if(!cache&&!saved)await load(t);current(t);
      if(!saved){var checked=valid(d),expected=expectedValue===undefined?revision:expectedValue;if(!checked)throw new TypeError(size(d)>MAX?"This save is too large for your Episode Binder. Shorten a pasted response or remove a saved version, then try again.":"This Episode Binder save has an unsupported field or value.");pending[key]={document:clone(checked),expected:expected};saved=pending[key];}
      current(t);
      var x=await runtime.client.rpc("put_my_resident_episode_binder_v1",{p_expected_owner:t.owner,p_document:saved.document,p_idempotency_key:key,p_expected_revision:saved.expected});
      if(x.error){if(String(x.error.message||"").indexOf("revision-conflict")>=0)return {state:"conflict",action:"reload-and-review",idempotencyKey:key};throw x.error;}
      current(t);var check=await runtime.client.rpc("get_my_resident_episode_binder_v1",{p_expected_owner:t.owner});if(check.error)throw check.error;current(t);var b=check.data&&check.data.binder,remote=b&&valid(b.document);
      if(!b||b.revision!==x.data.revision||!remote||!same(remote,saved.document))throw new Error("episode-binder-remote-read-after-write-failed");
      cache=remote;revision=b.revision;delete pending[key];return {state:"saved",document:clone(cache),revision:revision,idempotencyKey:key};
    }
    async function mutate(number,fn,keyValue){var key=mutationKey(keyValue),t=await session();reserve(key);if(pending[key])return saveDocument(null,key,undefined,t);await load(t);current(t);var ekey=String(number).padStart(2,"0");fail(EPS.indexOf(ekey)>=0,"Episode must be 01 through 04.");var d=clone(cache),e=d.episodes[ekey]||ep();d.episodes[ekey]=fn(e)||e;current(t);return saveDocument(d,key,undefined,t);}
    return Object.freeze({
      load:load,saveDocument:saveDocument,
      savePack:function(n,p,keyValue){var key=mutationKey(keyValue);fail(p&&id(p.content_id)&&id(p.content_version)&&placements(p.placements||[]),"A pack ID, version, and valid Puffy placements are required.");return mutate(n,function(e){var q=k(p.content_id,p.content_version);if(Object.keys(e.packs).length>=16&&!e.packs[q])throw new RangeError("This Episode Binder has reached its 16 saved pack-version limit for this episode. Delete a saved pack version before adding another.");e.packs[q]={content_id:p.content_id,content_version:p.content_version,saved_at:p.saved_at||now(),placements:clone(p.placements||[])};return e;},key);},
      saveExercise:function(n,x,keyValue){var key=mutationKey(keyValue);fail(x&&id(x.exercise_id)&&id(x.exercise_version)&&state(x.input_state)&&placements(x.placements),"An exercise ID, version, typed input state, and valid Puffy placements are required.");return mutate(n,function(e){var q=k(x.exercise_id,x.exercise_version);if(Object.keys(e.exercises).length>=16&&!e.exercises[q])throw new RangeError("This Episode Binder has reached its 16 saved exercise-version limit for this episode. Delete a saved exercise version before adding another.");e.exercises[q]={exercise_version:x.exercise_version,input_state:clone(x.input_state),placements:clone(x.placements),updated_at:x.updated_at||now()};return e;},key);},
      saveCards:function(n,cards,keyValue){var key=mutationKey(keyValue);fail(Array.isArray(cards),"Cards must be an array.");return mutate(n,function(e){cards.forEach(function(c){fail(c&&id(c.card_id)&&id(c.card_version)&&placements(c.placements||[]),"A card ID, version, and valid Puffy placements are required.");var q=k(c.card_id,c.card_version);if(Object.keys(e.cards).length>=24&&!e.cards[q])throw new RangeError("This Episode Binder has reached its 24 saved-card limit for this episode. Delete a saved card before adding another.");e.cards[q]={card_version:c.card_version,saved_at:c.saved_at||now(),placements:clone(c.placements||[])};});return e;},key);},
      saveQuizResult:function(n,x,keyValue){var key=mutationKey(keyValue);fail(x&&id(x.quiz_id)&&id(x.quiz_version)&&obj(x.answers),"A quiz ID, version, and selected answers keyed by question ID are required.");var attemptId=x.attempt_id||generatedUuid(),completed=x.completed_at||now();return mutate(n,function(e){var q=k(x.quiz_id,x.quiz_version),quiz=e.quizzes[q]||{quiz_version:x.quiz_version,attempts:[]};if(quiz.attempts.length>=25)throw new RangeError("This Episode Binder has reached its 25 saved-attempt limit for this quiz version. Delete an attempt before adding another.");quiz.attempts.push({attempt_id:attemptId,completed_at:completed,score:Number(x.score),max_score:Number(x.max_score),answers:clone(x.answers)});e.quizzes[q]=quiz;return e;},key);},
      removePack:function(n,i,v,keyValue){var key=mutationKey(keyValue);return mutate(n,function(e){delete e.packs[k(i,v)];return e;},key);},
      removeExercise:function(n,i,v,keyValue){var key=mutationKey(keyValue);return mutate(n,function(e){delete e.exercises[k(i,v)];return e;},key);},
      removeCard:function(n,i,v,keyValue){var key=mutationKey(keyValue);return mutate(n,function(e){delete e.cards[k(i,v)];return e;},key);},
      removeQuizAttempt:function(n,i,v,a,keyValue){var key=mutationKey(keyValue);return mutate(n,function(e){var q=e.quizzes[k(i,v)];if(q){q.attempts=q.attempts.filter(function(z){return z.attempt_id!==a;});if(!q.attempts.length)delete e.quizzes[k(i,v)];}return e;},key);},
      invalidate:function(){clear("");},dispose:function(){if(sub&&typeof sub.unsubscribe==="function")sub.unsubscribe();sub=null;},validateDocument:valid,emptyDocument:empty
    });
  }
  global.LAIDIESResidentEpisodeBinderV1=Object.freeze({create:create,emptyDocument:empty,validateDocument:valid});
})(window);
