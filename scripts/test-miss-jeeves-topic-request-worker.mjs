#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import worker from '../_worker.js';

class MemoryD1 {
  constructor() { this.requests=[]; this.payloads=[]; this.statuses=[]; this.aggregates=new Map(); this.rateWindows=new Map(); }
  prepare(sql) {
    const db=this;
    return { sql, values:[], bind(...values){this.values=values;return this;}, async first(){
      if(sql.includes('WHERE idempotency_key')) return structuredClone(db.requests.find(row=>row.idempotency_key===this.values[0])||null);
      if(sql.includes('WHERE e.receipt_id')) {
        const request=db.requests.find(row=>row.receipt_id===this.values[0]);
        if(!request)return null;
        const status=db.statuses.filter(row=>row.request_id===request.request_id).sort((a,b)=>b.created_at.localeCompare(a.created_at))[0];
        return {...structuredClone(request),state:status.state,updated_at:status.created_at};
      }
      if(sql.includes('SELECT request_count FROM miss_jeeves_topic_request_rate_windows')) return {request_count:db.rateWindows.get(this.values[0])||0};
      throw new Error(`unhandled first: ${sql}`);
    }, async run(){
      if(sql.startsWith('INSERT INTO miss_jeeves_topic_request_rate_windows')) { db.rateWindows.set(this.values[0],(db.rateWindows.get(this.values[0])||0)+1); return {success:true}; }
      if(sql.startsWith('DELETE FROM miss_jeeves_topic_request_rate_windows')) { for(const key of db.rateWindows.keys())if(key<this.values[0])db.rateWindows.delete(key); return {success:true}; }
      throw new Error(`unhandled run: ${sql}`);
    }};
  }
  async batch(statements) {
    const [event,payload,status,aggregate,purge]=statements.map(item=>item.values);
    if(this.requests.some(row=>row.idempotency_key===event[2]))throw new Error('duplicate');
    this.requests.push({request_id:event[0],receipt_id:event[1],idempotency_key:event[2],request_digest:event[3],topic_id:event[4],placement:event[5],created_at:event[6]});
    this.payloads.push({request_id:payload[0],question:payload[1],expires_at:payload[2]});
    this.statuses.push({status_event_id:status[0],request_id:status[1],state:'submitted',created_at:status[2]});
    const prior=this.aggregates.get(aggregate[0]);
    this.aggregates.set(aggregate[0],{request_digest:aggregate[0],topic_id:aggregate[1],request_count:(prior?.request_count||0)+1,last_seen_at:aggregate[2],latest_request_id:aggregate[3]});
    this.payloads=this.payloads.filter(row=>row.expires_at>=purge[0]);
    return statements.map(()=>({success:true}));
  }
}

const index=JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname,'..','content/site/miss-jeeves-index.json'),'utf8'));
const db=new MemoryD1();
const signals=[];
const env={
  MISS_JEEVES_DB:db,
  MISS_JEEVES_DIGEST_KEY:'test-only-key-32-characters-minimum-0001',
  MISS_JEEVES_SIGNALS:{writeDataPoint(point){signals.push(point);}},
  MISS_JEEVES_TOPIC_LIMITER:{async limit(){return {success:true};}},
  ASSETS:{async fetch(request){
    const pathname=new URL(request.url).pathname;
    if(pathname==='/content/site/miss-jeeves-index.json')return Response.json(index);
    if(pathname==='/content/newsstand-daily-issues.json')return Response.json({issues:[]});
    if(pathname==='/content/blend-snap-weekly-packs.json')return Response.json({manifestId:'blend-snap-weekly-packs',packs:[]});
    return new Response('STATIC');
  }}
};
const endpoint='https://laidies.ai/api/miss-jeeves/topic-request';
const body={question:'Please add a guide to choosing an AI for spreadsheet analysis.',topic_id:'tools-model-selection',placement:'library',consent:true};
async function submit(value=body,key='topic-request-fixture-1',activeEnv=env){return worker.fetch(new Request(endpoint,{method:'POST',headers:{'content-type':'application/json','idempotency-key':key},body:JSON.stringify(value)}),activeEnv);}

assert.equal((await submit(body,'missing-db',{ASSETS:env.ASSETS})).status,503,'missing database binding must fail closed');
assert.equal((await submit({...body,consent:false},'missing-consent')).status,400,'explicit consent is required');
assert.equal((await submit({...body,question:'Email me at private@example.com'},'private-email')).status,400,'PII fixture must be rejected');
assert.equal(db.requests.length,0,'rejected text must not write');

const acceptedResponse=await submit();
assert.equal(acceptedResponse.status,201);
const accepted=await acceptedResponse.json();
assert.equal(accepted.status,'accepted');
assert.match(accepted.receipt_id,/^mjs_/);
assert.equal(JSON.stringify(accepted).includes(body.question),false,'public receipt must not echo free text');
assert.equal(db.requests.length,1);
assert.equal(db.payloads[0].question,body.question,'approved text belongs only in expiring payload vault');
assert.equal(db.aggregates.size,1,'one canonical aggregate must exist');

const replay=await (await submit()).json();
assert.equal(replay.receipt_id,accepted.receipt_id,'same key and body must replay the receipt');
assert.equal(db.requests.length,1,'replay must not duplicate the event');
assert.equal((await submit({...body,question:'A changed question'})).status,409,'same key with a changed body must conflict');

const statusResponse=await worker.fetch(new Request(`https://laidies.ai${accepted.status_reference}`),env);
assert.equal(statusResponse.status,200);
const status=await statusResponse.json();
assert.equal(status.state,'submitted');
assert.equal(JSON.stringify(status).includes(body.question),false);

const limitedEnv={...env,MISS_JEEVES_TOPIC_LIMITER:{async limit(){return {success:false};}}};
assert.equal((await submit(body,'rate-limit-fixture',limitedEnv)).status,429,'rate limiter must reject abusive volume');
const fallbackEnv={...env};
delete fallbackEnv.MISS_JEEVES_TOPIC_LIMITER;
assert.equal((await submit({...body,question:'Please cover a safe fallback topic.'},'global-rate-fixture',fallbackEnv)).status,201,'identity-free global budget must protect Pages when the Worker rate binding is unavailable');

const open=await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves/result-open',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({result_id:'book-section-working-with-ai-101-chapter-7',topic_id:'tools-model-selection',placement:'library'})}),env);
assert.equal(open.status,202);
assert.equal(signals.at(-1).blobs[0],'miss_jeeves_result_open');
assert.equal(JSON.stringify(signals).includes(body.question),false,'aggregate measurement must never contain request text');
const measurementOffEnv={...env};
delete measurementOffEnv.MISS_JEEVES_SIGNALS;
const measurementOff=await (await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves/result-open',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({result_id:'book-section-working-with-ai-101-chapter-7',topic_id:'tools-model-selection',placement:'library'})}),measurementOffEnv)).json();
assert.equal(measurementOff.status,'measurement_off','unbound measurement must report off rather than pretend an event was recorded');

const health=await (await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves/health'),env)).json();
assert.equal(health.status,'ok');
assert.equal(health.topic_requests,'healthy');

const migration=fs.readFileSync(path.resolve(import.meta.dirname,'..','migrations/library-corrections/0002_miss_jeeves_topic_requests.sql'),'utf8');
assert.match(migration,/payload_vault/);
assert.match(migration,/expires_at/);
assert.match(migration,/request_aggregates/);
assert.match(migration,/append-only/);
const abuseMigration=fs.readFileSync(path.resolve(import.meta.dirname,'..','migrations/library-corrections/0003_miss_jeeves_abuse_budget.sql'),'utf8');
assert.match(abuseMigration,/request_rate_windows/);

console.log('MISS JEEVES TOPIC REQUEST PASS consent=1 pii_rejection_calibrated=1 receipt_safe=1 replay=1 conflict=1 dedupe_aggregate=1 status=1 rate_limit=1 identity_free_global_budget=1 result_open_signal=1 raw_text_leak=0 health=1');
