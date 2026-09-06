// Execute the actual migration in isolated PostgreSQL (PGlite), with synthetic
// auth identities. This does not prove live Supabase deployment or concurrency.
// EPISODE_BINDER_PGLITE_MODULE may name an installed PGlite module file.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
const spec = process.env.EPISODE_BINDER_PGLITE_MODULE;
const { PGlite } = await import(spec ? pathToFileURL(path.resolve(spec)).href : '@electric-sql/pglite');
const db = new PGlite();
const a='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', b='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
try {
  await db.exec(`create schema auth; create role anon; create role authenticated;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    grant usage on schema auth to authenticated, anon;
    insert into auth.users values ('${a}'),('${b}');`);
  await db.exec(fs.readFileSync(new URL('../supabase/migrations/20260906020000_resident_episode_binder_v1.sql',import.meta.url),'utf8'));
  const empty={version:1,episodes:{}};
  const pack={content_id:'ep01',content_version:'v1',saved_at:'2026-09-06T12:00:00.123Z',placements:[]};
  const entry={packs:{'ep01@v1':pack},exercises:{},cards:{},quizzes:{}};
  const valid={version:1,episodes:{'01':entry}};
  const fieldSchema=JSON.parse(fs.readFileSync(new URL('../content/episodes/episode-01.exercise-fields.json',import.meta.url),'utf8'));
  const fields=Object.fromEntries(Object.entries(fieldSchema.fields).map(([key,rule])=>[key,rule.choices?rule.choices[0]:rule.type==='text'?`${key}: synthetic note`:rule.type==='boolean'?true:3]));
  const exercise={exercise_version:fieldSchema.exerciseVersion,input_state:{fields},placements:[],updated_at:'2026-09-06T12:00:00.123Z'};
  const exerciseDoc={version:1,episodes:{'01':{...entry,exercises:{[`${fieldSchema.exerciseId}@${fieldSchema.exerciseVersion}`]:exercise}}}};
  const validate=async doc => (await db.query('select public.resident_episode_binder_v1_is_valid($1::jsonb) as valid',[JSON.stringify(doc)])).rows[0].valid;
  assert.equal(await validate(valid),true,'normal pack accepted');
  assert.equal(await validate(exerciseDoc),true,'all 57 exact prototype fields accepted by SQL');
  for(const patch of [{bad:null},{bad:[]},{bad:{}},{constructor:'bad'},{bad:'x'.repeat(16385)}]) {
    const bad=structuredClone(exerciseDoc);
    Object.assign(Object.values(bad.episodes['01'].exercises)[0].input_state.fields,patch);
    assert.equal(await validate(bad),false,'invalid scalar field rejected by SQL');
  }
  let errors=[];
  for(const [name,doc] of [
    ['extra key',{...empty,private_messages:[]}],
    ['unsupported episode',{version:1,episodes:{'05':entry}}],
    ['null content id',{version:1,episodes:{'01':{...entry,packs:{'ep01@v1':{...pack,content_id:null}}}}}],
    ['invalid timestamp',{version:1,episodes:{'01':{...entry,packs:{'ep01@v1':{...pack,saved_at:'2026-99-99T99:99:99Z'}}}}}],
    ['null timestamp',{version:1,episodes:{'01':{...entry,packs:{'ep01@v1':{...pack,saved_at:null}}}}}],
    ['null placements',{version:1,episodes:{'01':{...entry,packs:{'ep01@v1':{...pack,placements:null}}}}}]
  ]) { if(await validate(doc)!==false) errors.push('accepted invalid '+name); }
  await db.exec('set role anon');
  await assert.rejects(()=>db.query('select public.get_my_resident_episode_binder_v1()'),/permission denied/);
  await db.exec('reset role; set role authenticated');
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[a]);
  await assert.rejects(()=>db.query('select * from public.resident_episode_binders'),/permission denied/);
  const put=async(doc,key,rev=null)=>(await db.query('select public.put_my_resident_episode_binder_v1($1::jsonb,$2::uuid,$3::uuid) as result',[JSON.stringify(doc),key,rev])).rows[0].result;
  const key='11111111-1111-4111-8111-111111111111';
  const saved=await put(valid,key);
  assert.equal(saved.state,'saved');
  assert.deepEqual(await put(valid,key),saved,'retry same request returns original response');
  await assert.rejects(()=>put(empty,key),/idempotency-conflict/);
  await assert.rejects(()=>put(empty,'22222222-2222-4222-8222-222222222222'),/revision-conflict/);
  await put(empty,'33333333-3333-4333-8333-333333333333',saved.revision);
  await db.exec('reset role');
  const retained=(await db.query('select document from public.resident_episode_binders where owner_id=$1',[a])).rows[0].document;
  assert.deepEqual(retained,empty,'owner deletion removes saved contents');
  const receipts=(await db.query('select to_jsonb(m) as receipt from public.resident_episode_binder_mutations m')).rows;
  for(const {receipt} of receipts) {
    assert.deepEqual(Object.keys(receipt).sort(),['owner_id','idempotency_key','request_sha256','expected_revision','result_revision','created_at'].sort(),'receipts contain no private documents');
    assert.match(receipt.request_sha256,/^[a-f0-9]{64}$/);
  }
  await db.exec('set role authenticated');
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[b]);
  const other=(await db.query('select public.get_my_resident_episode_binder_v1() as result')).rows[0].result;
  assert.equal(other.state,'empty','account B cannot read A binder');
  if(errors.length) throw new Error(errors.join('; '));
  // Use the actual browser client against actual PostgreSQL. Named RPC calls
  // and JSONB key order must not be simulated away by an in-memory document.
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[a]);
  const browser={crypto:webcrypto};
  vm.runInNewContext(fs.readFileSync(new URL('../content/site/resident-episode-binder-v1.js',import.meta.url),'utf8'),{window:browser});
  let dropNextPut=false;
  const runtime={controller:{getSession:async()=>({user:{id:a}})},client:{
    rpc:async(name,args)=>{
      try {
        let result;
        if(name==='get_my_resident_episode_binder_v1') result=(await db.query('select public.get_my_resident_episode_binder_v1() as result')).rows[0].result;
        else {
          assert.equal(name,'put_my_resident_episode_binder_v1');
          const entries=Object.entries(args);
          for(const [key] of entries) assert.match(key,/^[a-z_]+$/);
          const named=entries.map(([key],i)=>`${key} := $${i+1}::${typeof entries[i][1]==='object'&&entries[i][1]!==null?'jsonb':'uuid'}`);
          result=(await db.query(`select public.put_my_resident_episode_binder_v1(${named.join(',')}) as result`,entries.map(([,v])=>typeof v==='object'&&v!==null?JSON.stringify(v):v))).rows[0].result;
          if(dropNextPut) {dropNextPut=false;return {error:new Error('network-drop-after-write')};}
        }
        return {data:result,error:null};
      } catch(error) {return {data:null,error};}
    }
  }};
  const client=browser.LAIDIESResidentEpisodeBinderV1.create(runtime);
  const packKey='44444444-4444-4444-8444-444444444444';
  assert.equal((await client.savePack(1,pack,packKey)).state,'saved','real named RPC and JSONB round-trip');
  const quiz={quiz_id:'ep01',quiz_version:'v1',score:1,max_score:2,answers:{'ep01-question-z':1,'ep01-question-a':0}};
  const retryKey='55555555-5555-4555-8555-555555555555';
  dropNextPut=true;
  await assert.rejects(()=>client.saveQuizResult(1,quiz,retryKey),/network-drop-after-write/);
  assert.equal((await client.saveQuizResult(1,quiz,retryKey)).state,'saved');
  const restored=await client.load();
  assert.equal(restored.document.episodes['01'].quizzes['ep01@v1'].attempts.length,1,'lost confirmation retry keeps one attempt');
  await client.saveExercise(1,{exercise_id:fieldSchema.exerciseId,...exercise},'66666666-6666-4666-8666-666666666666');
  const full=(await client.load()).document.episodes['01'].exercises[`${fieldSchema.exerciseId}@${fieldSchema.exerciseVersion}`];
  assert.deepEqual(JSON.parse(JSON.stringify(full.input_state)),exercise.input_state,'all 57 fields survive browser client and actual SQL round trip');
  client.dispose();
  console.log('Episode binder SQL: migration executes; owner/role isolation, retries, stale revision and invalid data checks pass in isolated PostgreSQL. Live Supabase remains unverified.');
} catch(error) {
  console.error('Episode binder SQL FAIL:',error.message);
  process.exitCode=1;
} finally { await db.close(); }
