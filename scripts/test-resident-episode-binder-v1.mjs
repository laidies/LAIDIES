import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { randomUUID } from "node:crypto";

const root=new URL("../",import.meta.url);
const sql=fs.readFileSync(new URL("supabase/migrations/20260906020000_resident_episode_binder_v1.sql",root),"utf8");
const source=fs.readFileSync(new URL("content/site/resident-episode-binder-v1.js",root),"utf8");
for(const s of ["request_sha256","result_revision","interval '30 days'","pg_column_size(d)>2097152","pg_catalog.sha256","array['packs','exercises','cards','quizzes']"])assert.match(sql,new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
assert.doesNotMatch(sql,/request jsonb|response jsonb/);
assert.doesNotMatch(source,/localStorage|setInterval|\.slice\(-/);

let uuid=()=>randomUUID();
let window={crypto:{randomUUID:uuid}};
vm.runInNewContext(source,{window,Date,JSON,Object,Array,String,Number,RegExp,TypeError,RangeError,Error,Promise,Set});

let owner="a",doc=null,rev=null,no=0,drop=false,conflict=false,failBeforePut=false,authChange,rpcCalls=0;
const receipts=new Map();
const client={
  async rpc(name,args){
    rpcCalls++;
    if(name==="get_my_resident_episode_binder_v1")return {data:doc?{binder:{document:structuredClone(doc),revision:rev}}:{binder:null},error:null};
    if(failBeforePut)return {error:{message:"network-unavailable-before-write"}};
    let req=JSON.stringify({d:args.p_document,e:args.p_expected_revision}),old=receipts.get(args.p_idempotency_key);
    if(old){if(old.req!==req)return {error:{message:"idempotency-conflict"}};return {data:old.out,error:null};}
    if(conflict){conflict=false;return {error:{message:"revision-conflict"}};}
    if(args.p_expected_revision!==rev)return {error:{message:"revision-conflict"}};
    doc=structuredClone(args.p_document);rev=`r${++no}`;
    let out={state:"saved",revision:rev};receipts.set(args.p_idempotency_key,{req,out});
    if(drop){drop=false;return {error:{message:"network-drop"}};}
    return {data:out,error:null};
  },
  auth:{onAuthStateChange(fn){authChange=fn;return {data:{subscription:{unsubscribe(){}}}};}}
};
const binder=window.LAIDIESResidentEpisodeBinderV1.create({client,controller:{getSession:async()=>({user:{id:owner}})}});
const state={task:"t",responses:{chatgpt:"g",claude:"c",gemini:"m"},ratings:{clarity:9},comparison_notes:"n",chosen_result:"c",final_edit:"f",current_step:"done"};
const p=[{sticker_id:"puffy",x:.5,y:.5,scale:1,rotation:0,z:1}];
const qid="00000000-0000-4000-8000-000000000099";

const mutationCalls=[
  key=>binder.saveDocument(window.LAIDIESResidentEpisodeBinderV1.emptyDocument(),key),
  key=>binder.savePack("01",{content_id:"pack",content_version:"v1",placements:p},key),
  key=>binder.saveExercise("01",{exercise_id:"try",exercise_version:"v1",input_state:state,placements:p},key),
  key=>binder.saveCards("01",[{card_id:"card",card_version:"v1",placements:p}],key),
  key=>binder.saveQuizResult("01",{quiz_id:"quiz",quiz_version:"v1",score:1,max_score:2,answers:{question:1},attempt_id:qid},key),
  key=>binder.removePack("01","pack","v1",key),
  key=>binder.removeExercise("01","try","v1",key),
  key=>binder.removeCard("01","card","v1",key),
  key=>binder.removeQuizAttempt("01","quiz","v1",qid,key)
];
for(const invoke of mutationCalls){
  for(const badKey of [undefined,"not-a-uuid"]){
    const before=rpcCalls;
    await assert.rejects(async()=>invoke(badKey),/valid stable UUID mutation key/);
    assert.equal(rpcCalls,before,"missing or invalid mutation key must cause zero RPCs");
  }
}

await binder.savePack("01",{content_id:"pack",content_version:"v1",placements:p},uuid());
await binder.savePack("01",{content_id:"pack",content_version:"v2",placements:p},uuid());
await binder.saveExercise("01",{exercise_id:"try",exercise_version:"v1",input_state:state,placements:p},uuid());
await binder.saveExercise("01",{exercise_id:"try",exercise_version:"v2",input_state:state,placements:p},uuid());
await binder.saveCards("01",[{card_id:"card",card_version:"v1",placements:p}],uuid());
await binder.saveQuizResult("01",{quiz_id:"quiz",quiz_version:"v1",score:10,max_score:10,answers:{question:2},attempt_id:qid},uuid());
let saved=await binder.load();
assert.equal(Object.keys(saved.document.episodes["01"].packs).length,2);
assert.equal(saved.document.episodes["01"].cards["card@v1"].placements[0].sticker_id,"puffy");
assert.equal(saved.document.episodes["01"].quizzes["quiz@v1"].attempts[0].attempt_id,qid);

await binder.removePack("01","pack","v1",uuid());
saved=await binder.load();
assert.equal(saved.document.episodes["01"].packs["pack@v1"],undefined);

let retry=uuid(),sameAttempt="00000000-0000-4000-8000-000000000098",sameTime="2026-09-06T12:00:00.123Z";
drop=true;
await assert.rejects(()=>binder.saveQuizResult("01",{quiz_id:"quiz",quiz_version:"v1",score:9,max_score:10,answers:{question:1},attempt_id:sameAttempt,completed_at:sameTime},retry),e=>e&&e.message==="network-drop");
await binder.saveQuizResult("01",{quiz_id:"quiz",quiz_version:"v1",score:0,max_score:10,answers:{question:0},attempt_id:qid},retry);
saved=await binder.load();
assert.equal(saved.document.episodes["01"].quizzes["quiz@v1"].attempts.filter(x=>x.attempt_id===sameAttempt).length,1,"lost-response retry retains the original request and creates one attempt");
assert.equal(saved.document.episodes["01"].quizzes["quiz@v1"].attempts.find(x=>x.attempt_id===sameAttempt).score,9,"retry ignores changed caller data and preserves the original snapshot");

conflict=true;
let c=await binder.savePack("02",{content_id:"p",content_version:"v1",placements:[]},uuid());
assert.equal(c.state,"conflict");

binder.invalidate();
failBeforePut=true;
const pendingKeys=[];
for(let i=0;i<32;i++){
  const key=uuid();pendingKeys.push(key);
  await assert.rejects(()=>binder.savePack("03",{content_id:`pending${i}`,content_version:"v1",placements:[]},key),error=>error&&error.message==="network-unavailable-before-write");
}
let before=rpcCalls;
await assert.rejects(()=>binder.savePack("03",{content_id:"pending32",content_version:"v1",placements:[]},uuid()),/32 Episode Binder saves waiting for confirmation/);
assert.equal(rpcCalls,before,"the pending-memory bound fails before a binder RPC");
failBeforePut=false;
await binder.savePack("03",{content_id:"changed",content_version:"v1",placements:[]},pendingKeys[0]);
saved=await binder.load();
assert.ok(saved.document.episodes["03"].packs["pending0@v1"],"the oldest pending snapshot is retained instead of silently evicted");
assert.equal(saved.document.episodes["03"].packs["changed@v1"],undefined,"retry uses the exact original pending request");

owner="b";authChange("SIGNED_IN",{user:{id:owner}});
await binder.savePack("03",{content_id:"account-b",content_version:"v1",placements:[]},pendingKeys[1]);
saved=await binder.load();
assert.ok(saved.document.episodes["03"].packs["account-b@v1"],"account switch clears the former account's pending snapshots");
assert.equal(saved.document.episodes["03"].packs["pending1@v1"],undefined);

let large=window.LAIDIESResidentEpisodeBinderV1.emptyDocument();
for(let e=1;e<=4;e++){
  let x={packs:{},exercises:{},cards:{},quizzes:{}};
  for(let n=0;n<16;n++)x.exercises[`try${n}@v${n}`]={exercise_version:`v${n}`,input_state:{...state,task:"x".repeat(16000),responses:{chatgpt:"x".repeat(4000),claude:"x".repeat(4000),gemini:"x".repeat(4000)}},placements:[],updated_at:"2026-09-06T12:00:00Z"};
  large.episodes[`0${e}`]=x;
}
assert.ok(window.LAIDIESResidentEpisodeBinderV1.validateDocument(large),"four episodes and 16 saved exercise versions fit the 2 MiB quota");
large.episodes["01"].exercises["try0@v0"].input_state.task=null;
assert.equal(window.LAIDIESResidentEpisodeBinderV1.validateDocument(large),null,"calibration: null required text fails");
console.log("RESIDENT EPISODE BINDER V1 PASS receipts=private quota=2MiB keys=required-zero-rpc pending=32-no-eviction account-switch=cleared retry=exact-one-attempt conflict=1 null-calibration=1");
