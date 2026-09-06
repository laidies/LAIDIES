// Isolated PostgreSQL proof for the first Clip ledger vertical. It does not
// prove migration deployment, Browser UI, Book Fair fulfilment, or spending.
import fs from "node:fs";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";

const modulePath = process.env.EPISODE_BINDER_PGLITE_MODULE || "/tmp/laidies-episode-binder-sql-test/node_modules/@electric-sql/pglite/dist/index.js";
const { PGlite } = await import(pathToFileURL(path.resolve(modulePath)).href);
const db = new PGlite();
const a = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const b = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const legacy = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const attempt = "00000000-0000-4000-8000-000000000001";
const migrations = [
  "../supabase/migrations/20260906030000_quiz_first_reward_v1.sql",
  "../supabase/migrations/20260906040000_clip_earning_ledger_v1.sql"
].map(file => fs.readFileSync(new URL(file, import.meta.url), "utf8"));
const quiz = JSON.parse(fs.readFileSync(new URL("../operations/episode-editorial-review-2026-09-06/episode-01/quiz-2026-09-06-v1.json", import.meta.url), "utf8"));
const correct = Object.fromEntries(quiz.questions.map(question => [question.id, question.answer]));
const six = Object.fromEntries(quiz.questions.map((question, index) => [question.id, index < 6 ? question.answer : (question.answer + 1) % question.options.length]));

async function as(role, user = "") {
  await db.exec(`reset role; set role ${role}`);
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [user]);
}
async function submit(owner, version, id, answers) {
  return (await db.query("select public.submit_quiz_first_reward_v1($1::uuid,'01',$2,$3::uuid,$4::jsonb) as result", [owner, version, id, JSON.stringify(answers)])).rows[0].result;
}
async function grant(owner, completionId) {
  return (await db.query("select public.grant_from_completion($1::uuid,$2::uuid) as result", [owner, completionId])).rows[0].result;
}
async function wallet(owner, cursor = null, limit = 20) {
  return (await db.query("select public.wallet_snapshot($1::uuid,$2::jsonb,$3::integer) as result", [owner, cursor === null ? null : JSON.stringify(cursor), limit])).rows[0].result;
}

try {
  await db.exec(`
    create schema auth;
    create role anon;
    create role authenticated;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$;
    grant usage on schema auth, public to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
    create table public.member_reward_events (
      id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
      dedupe_key text not null, reward_type text not null, issue_key text, title text not null, source text,
      metadata jsonb not null default '{}'::jsonb, earned_at timestamptz not null default now(), created_at timestamptz not null default now(),
      unique (user_id, dedupe_key)
    );
    alter table public.member_reward_events enable row level security;
    create policy "Members can read their rewards" on public.member_reward_events for select using (auth.uid() = user_id);
    create policy "Members can create their rewards" on public.member_reward_events for insert with check (auth.uid() = user_id);
    create policy "Members can update their rewards" on public.member_reward_events for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
    grant select, insert, update, delete on public.member_reward_events to authenticated;
    insert into auth.users values ('${a}'),('${b}'),('${legacy}');
  `);
  await db.exec(migrations[0]);
  // This looks like the newer browser record but predates ledger provenance.
  const legacyReward = (await db.query(
    "insert into public.member_reward_events(user_id,dedupe_key,reward_type,issue_key,title,metadata) values ($1,'quiz-score:issue-01','quiz_score','issue-01','Old record',$2::jsonb) returning id",
    [legacy, JSON.stringify({ original_score: 6, max_score: 10, clips: 6, quiz_version: quiz.version, attempt_id: attempt })]
  )).rows[0].id;
  await db.exec(migrations[1]);

  await as("anon");
  await assert.rejects(() => wallet(a), /permission denied/, "anon cannot read a wallet");
  await assert.rejects(() => grant(a, legacyReward), /permission denied/, "anon cannot grant clips");

  await as("authenticated", a);
  const first = await submit(a, quiz.version, attempt, six);
  assert.equal(first.score, 6, "existing quiz RPC computes the first score");
  assert.equal(first.clips, 6);
  const rewardId = (await db.query("select id from public.member_reward_events where user_id=$1 and dedupe_key='quiz-score:issue-01'", [a])).rows[0].id;
  const projection = await wallet(a);
  assert.equal(projection.available, 6, "quiz insert atomically creates a six-clip ledger grant before response use");
  assert.equal(projection.pending, 0);
  assert.equal(projection.lifetime_earned, 6);
  assert.equal(projection.lifetime_spent, 0);
  assert.equal(projection.lifetime_refunded, 0);
  assert.equal(projection.lifetime_adjusted, 0);
  assert.equal(projection.legacy_review_required, false);
  assert.equal(projection.history.length, 1);
  assert.deepEqual(Object.keys(projection.history[0]).sort(), ["currency_or_asset", "event_id", "event_type", "occurred_at", "reason", "source_completion_id", "units"], "history exposes the agreed wallet fields only");
  assert.equal(projection.history[0].units, 6);
  assert.equal(projection.history[0].currency_or_asset, "butterfly_clips");
  assert.equal((await grant(a, rewardId)).state, "existing", "grant replay cannot duplicate the award");
  assert.equal((await submit(a, "2026-09-06-v2", "00000000-0000-4000-8000-000000000002", correct)).clips, 6, "perfect retake preserves the original score reward");
  assert.equal((await wallet(a)).available, 6, "retake leaves account balance unchanged");
  await assert.rejects(() => grant(b, rewardId), /account-changed-reload-binder/, "caller cannot grant another account's completion");
  await assert.rejects(() => wallet(b), /account-changed-reload-binder/, "caller cannot read another account's wallet");
  await assert.rejects(() => db.query("select public.grant_from_completion($1::uuid,$2::uuid,99)", [a, rewardId]), /does not exist/, "the grant RPC accepts no browser amount");
  await assert.rejects(() => db.query("insert into private.economic_events(resident_id,program,event_type,units,currency_or_asset,source_completion_id,idempotency_key,reason,actor_authority) values ($1,'x','GRANT',99,'butterfly_clips','forged','forged','forged','browser')", [a]), /permission denied/, "client cannot forge ledger credit");
  await assert.rejects(() => db.query("update private.economic_events set units=99"), /permission denied/, "client cannot update the ledger");
  await assert.rejects(() => db.query("delete from private.economic_events"), /permission denied/, "client cannot delete the ledger");

  await as("authenticated", legacy);
  const legacyWallet = await wallet(legacy);
  assert.equal(legacyWallet.available, 0, "old server-looking metadata creates no balance");
  assert.equal(legacyWallet.legacy_review_required, true, "unproven prior record is held for reconciliation");
  assert.deepEqual(await grant(legacy, legacyReward), { state: "legacy-review-required" }, "old record is untouched and cannot backfill itself");
  await db.exec("reset role");
  assert.equal((await db.query("select count(*)::int as count from private.economic_events where resident_id=$1", [legacy])).rows[0].count, 0, "legacy review does not append money");

  // Equal timestamps require a compound cursor: no entry may vanish at a page boundary.
  await db.query(`insert into private.economic_events
    (resident_id,program,event_type,units,currency_or_asset,source_completion_id,idempotency_key,reason,actor_authority,occurred_at)
    values ($1,'fixture','GRANT',1,'butterfly_clips','fixture-a','fixture-a','fixture','test','2026-09-06T12:00:00Z'),
           ($1,'fixture','GRANT',1,'butterfly_clips','fixture-b','fixture-b','fixture','test','2026-09-06T12:00:00Z')`, [b]);
  await as("authenticated", b);
  const pageOne = await wallet(b, null, 1);
  assert.equal(pageOne.history.length, 1);
  assert.ok(pageOne.next_cursor, "first equal-time page has a compound continuation cursor");
  const pageTwo = await wallet(b, pageOne.next_cursor, 1);
  assert.equal(pageTwo.history.length, 1);
  assert.notEqual(pageTwo.history[0].event_id, pageOne.history[0].event_id, "compound cursor retains the other equal-time event");
  assert.equal(pageTwo.next_cursor, null);
  await assert.rejects(() => wallet(b, { occurred_at: null, event_id: null }, 1), /invalid-wallet-cursor/, "null cursor fields cannot silently restart history");

  await db.exec("reset role");
  await assert.rejects(() => db.query("delete from private.economic_events where resident_id=$1", [a]), /economic-events-append-only/, "ordinary owner maintenance cannot erase history");
  await db.query("delete from auth.users where id=$1", [a]);
  assert.equal((await db.query("select count(*)::int as count from private.economic_events where resident_id=$1", [a])).rows[0].count, 0, "authorized account deletion clears its private financial history");
  assert.equal((await db.query("select count(*)::int as count from private.economic_events where resident_id=$1", [b])).rows[0].count, 2, "account deletion leaves other residents intact");

  console.log("Clip earning ledger SQL: atomic first-quiz grant, replay, account/role isolation, direct-write denial, legacy reconciliation hold, and compound-cursor wallet projection pass in isolated PostgreSQL. Live Supabase, client integration, spending and fulfilment remain unverified.");
} catch (error) {
  console.error("Clip earning ledger SQL FAIL:", error.stack || error.message);
  process.exitCode = 1;
} finally {
  await db.close();
}
