import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createFeedbackClient, FeedbackClientError } from './src/feedback-client.mjs';

const input={submission_type:'suggestion',body:'Synthetic client note.'};
const memory=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k),dump:()=>[...m.values()].join('')};};
const receipt=digest=>({contract_version:'town_hall_feedback_receipt.v1',receipt_id:randomUUID(),status:'accepted',accepted_at:new Date().toISOString(),input_sha256:digest});
const response=value=>new Response(JSON.stringify(value),{status:200,headers:{'Content-Type':'application/json'}});
const expect=async(fn,code)=>assert.rejects(fn,e=>e instanceof FeedbackClientError&&e.message===code);

let calls=[]; const store=memory(); let fail=true;
const client=createFeedbackClient({endpoint:'https://staging.invalid/api/town-hall/feedback',storage:store,getChallengeToken:async()=> 'synthetic',fetcher:async(_url,options)=>{calls.push(options);if(fail){fail=false;throw Error('lost reply');} return response(receipt(JSON.parse(options.body).body==='Synthetic client note.' ? JSON.parse(store.getItem('laidies.feedback.pending.v1')).digest : '0'.repeat(64)));}});
await expect(()=>client.submit(input),'uncertain');
const saved=JSON.parse(store.getItem('laidies.feedback.pending.v1')); assert.equal(store.dump().includes(input.body),false,'no raw draft stored'); assert.equal(calls[0].credentials,'omit'); assert.equal(calls[0].headers['Idempotency-Key'],saved.key);
const reloaded=createFeedbackClient({endpoint:'https://staging.invalid/api/town-hall/feedback',storage:store,getChallengeToken:async()=> 'synthetic',fetcher:async(_url,o)=>{calls.push(o);return response(receipt(saved.digest));}});
await reloaded.submit(input); assert.equal(calls[1].headers['Idempotency-Key'],saved.key,'reload reuses key'); assert.equal(store.getItem('laidies.feedback.pending.v1'),null);
const changed=memory();changed.setItem('laidies.feedback.pending.v1',JSON.stringify({key:randomUUID(),digest:'a'.repeat(64)}));await expect(()=>createFeedbackClient({endpoint:'x',storage:changed,getChallengeToken:async()=>'',fetcher:async()=>{throw Error()}}).submit(input),'pending_different_message');
const blocked={getItem(){throw Error()},setItem(){throw Error()},removeItem(){throw Error()}};await expect(()=>createFeedbackClient({endpoint:'x',storage:blocked,getChallengeToken:async()=>'',fetcher:async()=>{throw Error()}}).submit(input),'retry_storage_unavailable');
for(const bad of [{}, {...receipt('a'.repeat(64)),body:'echo'}, {...receipt('a'.repeat(64)),input_sha256:'0'.repeat(64)}, 'x'.repeat(2000)]) await expect(()=>createFeedbackClient({endpoint:'x',storage:memory(),getChallengeToken:async()=> 'x',fetcher:async()=>response(bad)}).submit(input),'uncertain');
let release;const busy=createFeedbackClient({endpoint:'x',storage:memory(),getChallengeToken:()=>new Promise(r=>release=r),fetcher:async()=>response(receipt('a'.repeat(64)))});const pending=busy.submit(input);await new Promise(r=>setTimeout(r,0));await expect(()=>busy.submit(input),'busy');release('x');await expect(()=>pending,'uncertain');
await expect(()=>createFeedbackClient({endpoint:'x',storage:memory(),getChallengeToken:()=>new Promise(()=>{}),timeoutMs:10}).submit(input),'uncertain');
console.log('FEEDBACK CLIENT PASS challenge_deadline=bounded retry_reload_same_key=1 pending_digest_guard=1 blocked_storage_sends=0 no_raw_draft=1 no_credentials=1 malformed_receipts_rejected=4 busy_rejected=1');
