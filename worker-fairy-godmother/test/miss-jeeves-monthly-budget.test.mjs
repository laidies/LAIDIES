import assert from 'node:assert/strict';
import test from 'node:test';
import {applyLedgerAction} from '../src/beta-ledger-state.js';
import {beginMissJeevesAnswer,abortMissJeevesAnswer,settleMissJeevesResearch,commitMissJeevesAnswer} from '../src/beta-runtime.js';
import {researchBudgetConfigured,researchMonth,researchChargeMicroUsd} from '../src/miss-jeeves-budget.js';
import {researchFairUseConfigured,researchPace} from '../src/miss-jeeves-fair-use.js';
// Example policy for tests only. No $20 production/person policy is selected.
const config={MISS_JEEVES_RESEARCH_ENABLED:'true',MISS_JEEVES_PROVIDER_LIMIT_VERIFIED:'true',MISS_JEEVES_MONTHLY_CAP_MICRO_USD:'100000000',MISS_JEEVES_ACTOR_MONTHLY_CAP_MICRO_USD:'20000000'};
const guest=id=>({kind:'guest',id});
function fixture(initialTime='2026-09-30T12:00:00Z'){
 let now=new Date(initialTime);const states=new Map();const calls=[];
 const env={...config,FAIRY_BETA_LEDGER:{getByName(name){return {async fetch(_url,options){const command=JSON.parse(options.body);calls.push({name,...command});const result=applyLedgerAction(states.get(name)||null,command,now.valueOf());states.set(name,result.state);return Response.json(result.body,{status:result.status});}};}}};
 return {env,states,calls,now:()=>now,setTime:value=>{now=new Date(value);},begin:(actor,id)=>beginMissJeevesAnswer(env,actor,id,now)};
}
async function finish(f,actor,id,cost=30000){
 const reservation=await f.begin(actor,id);assert.equal(reservation.ok,true,JSON.stringify(reservation));
 await settleMissJeevesResearch(f.env,reservation,id,cost);
 assert.equal((await commitMissJeevesAnswer(f.env,actor,id,'a'.repeat(64),reservation)).ok,true);
 return reservation;
}
test('research configuration requires provider protection and an explicit bounded actor share',async()=>{
 const now=new Date('2026-09-05');
 assert.equal(researchBudgetConfigured(config,now),true);
 assert.equal(researchBudgetConfigured({...config,MISS_JEEVES_PROVIDER_LIMIT_VERIFIED:'false'},now),false);
 assert.equal(researchBudgetConfigured({...config,MISS_JEEVES_MONTHLY_CAP_MICRO_USD:'100000001'},now),false);
 assert.equal(researchBudgetConfigured(config,new Date('2026-11-21')),false);
 for(const share of [undefined,'0','2999999','50000001','NaN'])assert.equal(researchFairUseConfigured({...config,MISS_JEEVES_ACTOR_MONTHLY_CAP_MICRO_USD:share}),false);
 const f=fixture();delete f.env.MISS_JEEVES_ACTOR_MONTHLY_CAP_MICRO_USD;
 assert.equal((await f.begin(guest('guest-config'),'research-config')).kind,'configuration');
 assert.equal(f.calls.length,0);
});
test('simultaneous research requests cannot reserve more than100USD',async()=>{
 const f=fixture();
 const results=await Promise.all(Array.from({length:40},(_,i)=>f.begin(guest(`guest-${i}`),`research-${i}`)));
 assert.equal(results.filter(r=>r.ok).length,33);
 assert.equal(f.states.get('miss-jeeves:budget:2026-09').reservedMicroUsd,99000000);
 assert.equal(f.states.size,1,'shared money and actor checks use one monthly ledger');
});
test('quiet-day guests and residents can complete more than the old3/5 count',async()=>{
 const f=fixture();
 for(const actor of [guest('quiet-guest'),{kind:'resident',id:'quiet-resident'}]){
  for(let i=0;i<12;i++)await finish(f,actor,`research-${actor.id}-${i}`);
 }
 assert.equal(f.states.get('miss-jeeves:budget:2026-09').reservedMicroUsd,720000);
});
test('one person cannot use the whole pool; another actor still has capacity',async()=>{
 const f=fixture();const actor=guest('repeat-guest');
 for(let i=0;i<6;i++)await finish(f,actor,`research-heavy-${i}`,3000000);
 const blocked=await f.begin(actor,'research-heavy-next');
 assert.equal(blocked.kind,'actor_share');
 assert.equal(blocked.retryAt,'2026-10-01T00:00:00.000Z');
 assert.equal((await f.begin(guest('other-guest'),'research-other-guest')).ok,true);
});
test('pacing protects later days and unused capacity carries forward',async()=>{
 const f=fixture('2026-09-01T12:00:00Z');
 await finish(f,guest('day-one-guest'),'research-first-day',3000000);
 assert.equal((await f.begin(guest('next-guest'),'research-day-one-next')).kind,'pace');
 f.setTime('2026-09-02T12:00:00Z');
 assert.equal((await f.begin(guest('next-guest'),'research-day-two')).ok,true);
 assert.equal(researchPace(Date.parse('2026-09-30')).cap,100000000);
 assert.equal(researchPace(Date.parse('2028-02-29')).cap,100000000);
 assert.equal(researchPace(Date.parse('2026-08-31')).cap,100000000);
});
test('one in-flight research per actor and replay never authorizes another provider attempt',async()=>{
 const f=fixture();const actor=guest('parallel-guest');
 const first=await f.begin(actor,'research-parallel-1');
 assert.equal(first.ok,true);
 assert.equal((await f.begin(actor,'research-parallel-2')).kind,'in_progress');
 assert.equal((await f.begin(actor,'research-parallel-1')).kind,'duplicate');
 await abortMissJeevesAnswer(f.env,actor,'research-parallel-1',true,first);
 assert.equal((await f.begin(actor,'research-parallel-1')).kind,'duplicate');
 assert.equal((await f.begin(actor,'research-parallel-2')).ok,true);
});
test('failed provider attempts retain both reservations; missing usage cannot release money',async()=>{
 const f=fixture();const actor=guest('guest-unknown');
 const reservation=await f.begin(actor,'research-failed');
 await abortMissJeevesAnswer(f.env,actor,'research-failed',false,reservation);
 await settleMissJeevesResearch(f.env,reservation,'research-failed',null);
 const state=f.states.get(reservation.budgetKey);
 assert.equal(state.reservedMicroUsd,3000000);
 assert.equal(state.researchActors['guest:guest-unknown'].reservedMicroUsd,3000000);
 assert.equal((await f.begin(actor,'research-after-failure')).ok,true);
});
test('expired pending slot never refunds unknown cost or releases a newer request slot',async()=>{
 const f=fixture();const actor=guest('timeout-guest');
 const old=await f.begin(actor,'research-timeout-old');
 f.setTime('2026-09-30T12:03:00Z');
 const next=await f.begin(actor,'research-timeout-new');assert.equal(next.ok,true);
 await abortMissJeevesAnswer(f.env,actor,'research-timeout-old',false,old);
 const state=f.states.get(old.budgetKey);
 assert.equal(state.reservedMicroUsd,6000000);
 assert.equal(state.researchActors['guest:timeout-guest'].pending.requestId,'research-timeout-new');
});
test('settlement is idempotent; above-reservation usage freezes further research',async()=>{
 const f=fixture();const actor=guest('guest-settle');
 const reservation=await f.begin(actor,'research-settle');
 await settleMissJeevesResearch(f.env,reservation,'research-settle',4000000);
 await settleMissJeevesResearch(f.env,reservation,'research-settle',1);
 assert.equal(f.states.get(reservation.budgetKey).reservedMicroUsd,4000000);
 assert.equal((await f.begin(guest('other-guest'),'research-next')).kind,'cap');
 assert.equal((await abortMissJeevesAnswer(f.env,actor,'research-settle',true,reservation)).ok,false);
});
test('late settlement remains in its original month and new month starts separately',async()=>{
 const f=fixture('2026-09-30T23:59:59Z');const actor=guest('month-guest');
 const reservation=await f.begin(actor,'research-september');
 f.setTime('2026-10-01T00:00:01Z');
 await settleMissJeevesResearch(f.env,reservation,'research-september',25000);
 await abortMissJeevesAnswer(f.env,actor,'research-september',false,reservation);
 const next=await f.begin(actor,'research-october');
 assert.equal(f.states.get(reservation.budgetKey).reservedMicroUsd,25000);
 assert.equal(f.states.get(next.budgetKey).reservedMicroUsd,3000000);
 assert.notEqual(reservation.budgetKey,next.budgetKey);
 assert.notEqual(researchMonth(new Date('2026-09-30')),researchMonth(new Date('2026-10-01')));
});
test('pre-provider rejection refunds once; known clarification costs remain charged',async()=>{
 const f=fixture();const actor=guest('refund-guest');
 const first=await f.begin(actor,'research-no-provider');
 await abortMissJeevesAnswer(f.env,actor,'research-no-provider',true,first);
 await abortMissJeevesAnswer(f.env,actor,'research-no-provider',true,first);
 assert.equal(f.states.get(first.budgetKey).reservedMicroUsd,0);
 const clarify=await f.begin(actor,'research-clarification');
 await settleMissJeevesResearch(f.env,clarify,'research-clarification',20000);
 await abortMissJeevesAnswer(f.env,actor,'research-clarification',false,clarify);
 assert.equal(f.states.get(first.budgetKey).reservedMicroUsd,20000);
});
test('usage pricing includes output and both searches; incomplete usage stays unknown',()=>{
 assert.equal(researchChargeMicroUsd({model:'gpt-5.6-sol',usage:{input_tokens:1000,output_tokens:100}}),29250);
 assert.equal(researchChargeMicroUsd({model:'gpt-5.6-sol',usage:{input_tokens:1000}}),null);
});
