import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { createFeedbackHandler } from './src/feedback-http.mjs';
import { canonicalSubmissionDigest, validateAcceptedReceipt } from './src/feedback-contract.mjs';
if (!process.env.PGLITE_MODULE_PATH) throw Error('Set PGLITE_MODULE_PATH');
const { PGlite } = await import(pathToFileURL(process.env.PGLITE_MODULE_PATH).href);
const db = new PGlite('memory://');
const origin = 'https://staging.invalid';
let server;
try {
  // Exact constraints/columns of the existing feedback table; all rows synthetic.
  await db.exec(`create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    create role anon; create role authenticated; create role service_role;
    create table public.town_hall_feedback (
      id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade,
      submission_type text not null check(submission_type in ('compliment','complaint','suggestion')),
      subject text check(subject is null or char_length(subject)<=100), body text not null check(char_length(body) between 3 and 2000),
      submitter_email text, submitter_display_name text,
      status text not null default 'filed' check(status in ('filed','triaged','addressed','ignored','deb-flected')),
      admin_notes text, submitted_at timestamptz not null default now(), reviewed_at timestamptz);
    grant insert on public.town_hall_feedback to anon,authenticated;
    grant select on public.town_hall_feedback to authenticated;
    alter table public.town_hall_feedback enable row level security;
    create policy "Town Hall own insert" on public.town_hall_feedback for insert with check(auth.uid()=user_id or user_id is null);
    create policy "Town Hall own read" on public.town_hall_feedback for select using(auth.uid()=user_id);`);
  await db.exec(await readFile('supabase/migrations/20260905030000_town_hall_feedback_intake.sql', 'utf8'));
  let discardReply = true;
  let firstReceipt;
  async function store(p) {
    await db.exec('set role service_role');
    let receipt;
    try { receipt = (await db.query('select public.intake_town_hall_feedback_v1($1,$2,$3,$4::jsonb) receipt', [p.p_key,p.p_digest,p.p_actor_hash,JSON.stringify(p.p_input)])).rows[0].receipt; }
    finally { await db.exec('reset role'); }
    if (discardReply) { discardReply = false; firstReceipt = receipt; throw new Error('Synthetic connection loss after commit'); }
    return receipt;
  }
  const handler = createFeedbackHandler({ enabled: true, origin, actorSecret: 'synthetic-secret-only-'.repeat(3), verifyChallenge: async () => true, store });
  // Real loopback HTTP requests traverse body decoding, boundary and PostgreSQL.
  // The challenge callback is synthetic; no Cloudflare/Supabase service is called.
  server = createServer(async (req,res) => {
    try {
      const request = new Request(origin + req.url, { method: req.method, headers: req.headers, body: req, duplex: 'half' });
      const response = await handler(request, { remoteAddress: req.socket.remoteAddress });
      res.writeHead(response.status, Object.fromEntries(response.headers)); res.end(await response.text());
    } catch { res.writeHead(500); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const endpoint = `http://127.0.0.1:${server.address().port}/api/town-hall/feedback`;
  const key = randomUUID();
  const input = { submission_type: 'suggestion', subject: 'Quotes " & café 😀', body: 'Synthetic \\ slash\nline and 👩🏽‍💻 emoji.' };
  async function submit(body = input, requestKey = key) {
    return fetch(endpoint, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': requestKey, 'X-Turnstile-Token': 'synthetic-only' }, body: JSON.stringify(body) });
  }
  assert.equal((await submit()).status,503,'closed SQL config must override enabled HTTP');
  await db.exec('update public.town_hall_feedback_intake_config_v1 set enabled=true,retention_days=7');
  await db.exec('set role service_role');
  const validDigest = await canonicalSubmissionDigest(input);
  for (const invalid of [null, [], {...input,body:123}, {...input,body:null}, {...input,submission_type:null}, {...input,subject:'x'.repeat(101)}, {...input,subject:'bad\u0001'}, {...input,body:'bad\u0001'}, {...input,admin_notes:'private'}, {...input,body:' '.repeat(13000)}]) {
    await assert.rejects(()=>db.query('select public.intake_town_hall_feedback_v1($1,$2,$3,$4::jsonb)',[randomUUID(),validDigest,'a'.repeat(64),JSON.stringify(invalid)]),/feedback_invalid/);
  }
  for(const bad of [[null,validDigest,'a'.repeat(64)],[randomUUID(),null,'a'.repeat(64)],[randomUUID(),validDigest,null],[randomUUID(),'0'.repeat(64),'a'.repeat(64)]]) {
    await assert.rejects(()=>db.query('select public.intake_town_hall_feedback_v1($1,$2,$3,$4::jsonb)',[...bad,JSON.stringify(input)]),/feedback_invalid/);
  }
  await db.exec('reset role');
  const uncertain = await submit();
  assert.equal(uncertain.status,503);
  assert.equal((await db.query('select count(*)::int n from public.town_hall_feedback')).rows[0].n,1,'lost reply still committed');
  const retry = await submit();
  assert.equal(retry.status,200);
  const receipt = await retry.json();
  assert.deepEqual(receipt,firstReceipt);
  validateAcceptedReceipt(receipt,await canonicalSubmissionDigest(input));
  assert.equal((await db.query('select count(*)::int n from public.town_hall_feedback')).rows[0].n,1,'retry must not duplicate');
  assert.equal((await submit({...input,body:'Different synthetic content'})).status,409);
  assert.equal((await submit({...input,status:'addressed'},randomUUID())).status,400);
  // Rate rejection and valid replay at the limit exercise transaction-backed counts.
  for(let i=0;i<4;i++) assert.equal((await submit(input,randomUUID())).status,200);
  assert.equal((await submit(input,randomUUID())).status,429);
  assert.equal((await submit()).status,200);
  const privateRow=(await db.query('select * from public.town_hall_feedback limit 1')).rows[0];
  assert.equal(privateRow.user_id,null); assert.equal(privateRow.submitter_email,null); assert.equal(privateRow.submitter_display_name,null);
  // Existing permissive policies cannot bypass the migration's privilege revocation.
  await db.exec('set role anon');
  await assert.rejects(()=>db.query("insert into public.town_hall_feedback(submission_type,body) values('suggestion','bypass')"),/permission denied/);
  await db.exec('reset role');
  const staff=randomUUID();
  await db.query('insert into public.town_hall_feedback_staff_v1(user_id) values($1)',[staff]);
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[staff]);
  await db.exec('set role authenticated');
  const page1=(await db.query('select public.list_town_hall_feedback_v1(1) r')).rows[0].r;
  const page2=(await db.query('select public.list_town_hall_feedback_v1(1,$1) r',[page1[0].id])).rows[0].r;
  assert.equal(page1.length,1); assert.equal(page2.length,1); assert.notEqual(page1[0].id,page2[0].id);
  await assert.rejects(()=>db.query('select public.list_town_hall_feedback_v1(51)'),/feedback_invalid/);
  await db.exec('reset role');
  await db.exec("update public.town_hall_feedback_attempts_v1 set expires_at=now()-interval '1 second'");
  await db.exec('set role authenticated');
  assert.deepEqual((await db.query('select public.list_town_hall_feedback_v1() r')).rows[0].r,[],'expired payload hidden before cleanup');
  await assert.rejects(()=>db.query('select public.review_town_hall_feedback_v1($1,$2)',[privateRow.id,'triaged']),/feedback_expired/);
  await db.exec('reset role');
  await db.exec('set role service_role');
  await db.query('select public.expire_town_hall_feedback_v1()');
  await db.exec('reset role');
  assert.equal((await db.query('select count(*)::int n from public.town_hall_feedback')).rows[0].n,0);
  assert.deepEqual(await (await submit()).json(),firstReceipt,'tombstone replay cannot restore private text');
  assert.equal((await db.query('select count(*)::int n from public.town_hall_feedback')).rows[0].n,0);
  console.log('FEEDBACK INTEGRATION PASS real_loopback_http=true real_local_postgresql=true lost_reply_retry_rows=1 unicode_digest=matched direct_insert=denied expiry_payload_rows=0 provider_calls=0');
} finally {
  if(server) { server.closeAllConnections(); await new Promise(resolve=>server.close(resolve)); }
  await db.close();
}
