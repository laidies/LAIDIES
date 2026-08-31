import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const credentials=JSON.parse(fs.readFileSync(process.env.RESIDENT_TEST_CREDENTIALS_FILE,'utf8'));
assert.match(credentials.email,/^ksvl-test-\d+@example\.com$/,'disposable account only');
assert.equal(process.env.KSVL_TEST_REQUESTS,'1','explicit controlled request test required');
const prior=Number(process.env.KSVL_TEST_PRIOR_REQUESTS);assert.ok(Number.isInteger(prior)&&prior>=0&&prior<5);
const config=fs.readFileSync('content/site/supabase-config.js','utf8');
const url=config.match(/url:\s*"([^"]+)/)[1],key=config.match(/anonKey:\s*"([^"]+)/)[1];
async function request(route,body,token){const r=await fetch(url+route,{method:body?'POST':'GET',signal:AbortSignal.timeout(15000),headers:{apikey:key,'content-type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();return {ok:r.ok,status:r.status,data};}
const auth=await request('/auth/v1/token?grant_type=password',credentials);assert.equal(auth.status,200,'controlled sign in');
const token=auth.data.access_token,owner=auth.data.user.id;console.log('Controlled request account',owner);
const rpc=(name,body={},session=token)=>request('/rest/v1/rpc/'+name,body,session);
for(const session of [null,token]){
 const direct=await request('/rest/v1/ksvl_song_requests?select=admin_notes&user_id=eq.'+owner,null,session);
 assert.ok([401,403].includes(direct.status),'direct staff-column read must be denied');
}
const anonymous=await rpc('list_my_ksvl_song_requests_v1',{},null);assert.ok([401,403].includes(anonymous.status),'anonymous RPC');
const params=Array.from({length:7},(_,i)=>({p_song_style:'coffeehouse-acoustic',p_topic:'Synthetic concurrent request '+i,p_lyric_ideas:null,p_idempotency_key:crypto.randomUUID()}));
const accepted=new Map();
async function submit(p){const r=await rpc('submit_my_ksvl_song_request_v1',p);if(r.ok){assert.equal(r.data.state,'received');accepted.set(p.p_idempotency_key,{p,receipt:r.data.receipt_id});}else assert.ok(['55P03','PT429'].includes(r.data.code),'unexpected submit code '+r.data.code);return r;}
// Concurrent starts followed by same-key retries of busy operations. The server
// must serialize acceptance, preserve the keys and never exceed the daily cap.
await Promise.all(params.map(submit));
for(const p of params)await submit(p);
assert.equal(accepted.size,5-prior,'parallel submissions exceeded or undershot the remaining cap');
const sample=[...accepted.values()][0];
const replay=await rpc('submit_my_ksvl_song_request_v1',sample.p);assert.equal(replay.data.receipt_id,sample.receipt);assert.equal(replay.data.replayed,true);
const conflict=await rpc('submit_my_ksvl_song_request_v1',{...sample.p,p_topic:'Synthetic changed idea'});assert.equal(conflict.data.code,'23505');
const list=await rpc('list_my_ksvl_song_requests_v1');assert.equal(list.data.length,accepted.size);
for(const row of list.data){assert.deepEqual(Object.keys(row).sort(),['receipt_id','status','status_updated_at','submitted_at']);await rpc('delete_my_ksvl_song_request_v1',{p_receipt_id:row.receipt_id});}
const repeated=await rpc('submit_my_ksvl_song_request_v1',sample.p);assert.equal(repeated.data.state,'deleted','deleted replay recreated request');
const again=await rpc('delete_my_ksvl_song_request_v1',{p_receipt_id:sample.receipt});assert.equal(again.data.state,'deleted');
const afterDelete=await rpc('submit_my_ksvl_song_request_v1',{...params[0],p_idempotency_key:crypto.randomUUID()});assert.equal(afterDelete.data.code,'PT429','deletion reset rate cap');
assert.deepEqual((await rpc('list_my_ksvl_song_requests_v1')).data,[]);
console.log('REAL REQUEST PROVIDER PASS direct/anonymous denial, concurrent cap, same-key replay/conflict, private list, delete/no resurrection/no cap reset');
