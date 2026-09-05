import assert from 'node:assert/strict';
import test from 'node:test';
import {applyLedgerAction} from '../src/beta-ledger-state.js';
import {beginMissJeevesAnswer,abortMissJeevesAnswer,settleMissJeevesResearch} from '../src/beta-runtime.js';
import {researchBudgetConfigured,researchMonth,researchChargeMicroUsd} from '../src/miss-jeeves-budget.js';
const config={MISS_JEEVES_RESEARCH_ENABLED:'true',MISS_JEEVES_PROVIDER_LIMIT_VERIFIED:'true',MISS_JEEVES_MONTHLY_CAP_MICRO_USD:'100000000'};
function fixture(){
 const states=new Map();const calls=[];
 const env={...config,FAIRY_BETA_LEDGER:{getByName(name){return {async fetch(_url,options){const command=JSON.parse(options.body);calls.push({name,...command});const result=applyLedgerAction(states.get(name)||null,command);states.set(name,result.state);return Response.json(result.body,{status:result.status});}};}}};
 return {env,states,calls};
}
test('monthly research configuration fails closed until provider limit is verified',()=>{
 assert.equal(researchBudgetConfigured(config,new Date('2026-09-05')),true);
 assert.equal(researchBudgetConfigured({...config,MISS_JEEVES_PROVIDER_LIMIT_VERIFIED:'false'}),false);
 assert.equal(researchBudgetConfigured({...config,MISS_JEEVES_MONTHLY_CAP_MICRO_USD:'100000001'}),false);
 assert.equal(researchBudgetConfigured(config,new Date('2026-11-21')),false);
 assert.notEqual(researchMonth(new Date('2026-09-30T23:59:59Z')),researchMonth(new Date('2026-10-01T00:00:00Z')));
});
test('simultaneous research requests cannot reserve more than100USD',async()=>{
 const {env,states}=fixture();
 const results=await Promise.all(Array.from({length:40},(_,i)=>beginMissJeevesAnswer(env,{kind:'guest',id:`guest-${i}`,limit:3},`research-${i}`)));
 assert.equal(results.filter(r=>r.ok).length,33);
 const budget=[...states.entries()].find(([name])=>name.includes(':budget:'));
 assert.match(budget[0],/^miss-jeeves:budget:\d{4}-\d{2}$/);
 assert.equal(budget[1].reservedMicroUsd,99000000);
});
test('failed provider attempt retains reservation; missing usage cannot release it',async()=>{
 const {env,states}=fixture();const actor={kind:'guest',id:'guest-unknown',limit:3};
 const reservation=await beginMissJeevesAnswer(env,actor,'research-failed');
 await abortMissJeevesAnswer(env,actor,'research-failed',false,reservation);
 await settleMissJeevesResearch(env,reservation,'research-failed',null);
 assert.equal(states.get(reservation.budgetKey).reservedMicroUsd,3000000);
});
test('settlement is idempotent; above-reservation usage stops further research',async()=>{
 const {env,states}=fixture();const actor={kind:'guest',id:'guest-settle',limit:3};
 const reservation=await beginMissJeevesAnswer(env,actor,'research-settle');
 await settleMissJeevesResearch(env,reservation,'research-settle',4000000);
 await settleMissJeevesResearch(env,reservation,'research-settle',1);
 assert.equal(states.get(reservation.budgetKey).reservedMicroUsd,4000000);
 const blocked=await beginMissJeevesAnswer(env,{kind:'guest',id:'other-guest',limit:3},'research-next');
 assert.equal(blocked.ok,false);
});
test('usage pricing includes output and both searches; incomplete usage stays unknown',()=>{
 assert.equal(researchChargeMicroUsd({model:'gpt-5.6-sol',usage:{input_tokens:1000,output_tokens:100}}),29250);
 assert.equal(researchChargeMicroUsd({model:'gpt-5.6-sol',usage:{input_tokens:1000}}),null);
});
