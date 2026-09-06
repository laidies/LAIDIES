// Execute the quiz-first-reward migration in isolated PostgreSQL. This proves
// SQL behavior, not a deployed Supabase migration or a browser integration.
import fs from "node:fs";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";

const spec = process.env.EPISODE_BINDER_PGLITE_MODULE;
const { PGlite } = await import(spec ? pathToFileURL(path.resolve(spec)).href : "@electric-sql/pglite");
const db = new PGlite();
const ids = {
  a: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  b: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  c: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  d: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
  e: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee"
};
const attempt = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const migration = fs.readFileSync(new URL("../supabase/migrations/20260906030000_quiz_first_reward_v1.sql", import.meta.url), "utf8");
const v1 = JSON.parse(fs.readFileSync(new URL("../operations/episode-editorial-review-2026-09-06/episode-01/quiz-2026-09-06-v1.json", import.meta.url), "utf8"));
const v2 = JSON.parse(fs.readFileSync(new URL("../operations/episode-editorial-review-2026-09-06/episode-01/quiz.json", import.meta.url), "utf8"));
const correct = Object.fromEntries(v1.questions.map(question => [question.id, question.answer]));
const six = Object.fromEntries(v1.questions.map((question, index) => [question.id, index < 6 ? question.answer : (question.answer + 1) % question.options.length]));
const zero = Object.fromEntries(v1.questions.filter(question => !question.bonus).map(question => [question.id, (question.answer + 1) % question.options.length]));

async function as(role, user = "") {
  await db.exec(`reset role; set role ${role}`);
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [user]);
}
async function status(owner, episode = "01") {
  return (await db.query("select public.get_my_quiz_first_reward_v1($1::uuid,$2) as result", [owner, episode])).rows[0].result;
}
async function submit(owner, version, id, answers) {
  return (await db.query(
    "select public.submit_quiz_first_reward_v1($1::uuid,$2,$3,$4::uuid,$5::jsonb) as result",
    [owner, "01", version, id, JSON.stringify(answers)]
  )).rows[0].result;
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
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null references auth.users(id) on delete cascade,
      dedupe_key text not null,
      reward_type text not null,
      issue_key text,
      title text not null,
      source text,
      metadata jsonb not null default '{}'::jsonb,
      earned_at timestamptz not null default now(),
      created_at timestamptz not null default now(),
      unique (user_id, dedupe_key)
    );
    alter table public.member_reward_events enable row level security;
    create policy "Members can read their rewards" on public.member_reward_events for select using (auth.uid() = user_id);
    create policy "Members can create their rewards" on public.member_reward_events for insert with check (auth.uid() = user_id);
    create policy "Members can update their rewards" on public.member_reward_events for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
    grant select, insert, update, delete on public.member_reward_events to authenticated;
    insert into auth.users values ${Object.values(ids).map(id => `('${id}')`).join(",")};
  `);
  await db.exec(migration);

  const seeded = (await db.query("select quiz_version, question_id, answer_index, option_count, is_bonus from private.quiz_reward_answer_definitions_v1 order by quiz_version, question_id")).rows;
  const expectedSeeds = [v1, v2].flatMap(quiz => quiz.questions.map(question => ({
    quiz_version: quiz.version, question_id: question.id, answer_index: question.answer,
    option_count: question.options.length, is_bonus: question.bonus
  }))).sort((left, right) => `${left.quiz_version}:${left.question_id}`.localeCompare(`${right.quiz_version}:${right.question_id}`));
  assert.deepEqual(seeded, expectedSeeds, "private seeds exactly match both candidate quiz versions");
  await as("anon");
  await assert.rejects(() => status(ids.a), /permission denied/, "anon cannot check reward eligibility");
  await assert.rejects(() => submit(ids.a, v1.version, attempt(1), correct), /permission denied/, "anon cannot claim a reward");

  await as("authenticated", ids.a);
  await assert.rejects(() => db.query("select * from private.quiz_reward_answer_definitions_v1"), /permission denied/, "clients cannot read the private answer key");
  await assert.rejects(() => db.query("insert into private.quiz_reward_answer_definitions_v1 values ('forged','01','forged',0,2,false)"), /permission denied/, "clients cannot alter the private answer key");
  assert.deepEqual(await status(ids.a), { state: "unclaimed", episode: "01" }, "first status is owner-bound and unclaimed");
  const first = await submit(ids.a, v1.version, attempt(1), six);
  assert.equal(first.state, "claimed");
  assert.equal(first.score, 6, "server computes the six correct scored answers");
  assert.equal(first.max_score, 10);
  assert.equal(first.clips, 6, "bonus answers do not affect clips");
  assert.equal(first.quiz_version, v1.version);
  const repeat = await submit(ids.a, v2.version, attempt(2), correct);
  assert.deepEqual(repeat, { ...first, state: "existing" }, "v2 practice cannot top up a v1 first award");
  assert.deepEqual(await status(ids.a), first, "status returns the original award");
  const aEvent = (await db.query("select metadata from public.member_reward_events where user_id=$1 and dedupe_key='quiz-score:issue-01'", [ids.a])).rows[0].metadata;
  assert.deepEqual(Object.keys(aEvent).sort(), ["attempt_id", "clips", "max_score", "original_score", "quiz_version"], "public reward event stores no selected answers");

  await as("authenticated", ids.b);
  const bFirst = await submit(ids.b, v2.version, attempt(3), correct);
  assert.equal(bFirst.score, 10, "a distinct account has its own first reward");
  assert.equal(bFirst.clips, 10);
  await assert.rejects(() => submit(ids.a, v1.version, attempt(4), correct), /account-changed-reload-binder/, "caller cannot target another account");

  await as("authenticated", ids.c);
  const cZero = await submit(ids.c, v1.version, attempt(5), zero);
  assert.equal(cZero.score, 0);
  assert.equal(cZero.clips, 1, "zero score earns the minimum first-completion clip");
  const cRetry = await submit(ids.c, v1.version, attempt(6), correct);
  assert.equal(cRetry.state, "existing");
  assert.equal(cRetry.clips, 1, "zero result consumes eligibility before feedback/retry");

  await as("authenticated", ids.d);
  const missing = { ...correct }; delete missing["ep01-context"];
  const extra = { ...correct, invented: 0 };
  const outOfRange = { ...correct, "ep01-context": 4 };
  for (const [answers, error] of [[missing, /missing-scored-question/], [extra, /unknown-quiz-question/], [outOfRange, /invalid-selected-option/]]) {
    await assert.rejects(() => submit(ids.d, v1.version, attempt(7), answers), error, "malformed answers are rejected");
    assert.equal((await status(ids.d)).state, "unclaimed", "rejected answer payload does not consume eligibility");
  }

  await db.exec("reset role");
  await db.query(
    "insert into public.member_reward_events(user_id,dedupe_key,reward_type,issue_key,title,source,metadata) values ($1,'quiz-score:issue-01','quiz_score','issue-01','Legacy score','Magazine Quiz',$2::jsonb)",
    [ids.e, JSON.stringify({ bestScore: 7, maxScore: 10, attempts: 4 })]
  );
  await as("authenticated", ids.e);
  const legacy = await status(ids.e);
  assert.equal(legacy.state, "claimed");
  assert.equal(legacy.score, 7);
  assert.equal(legacy.clips, 7);
  assert.equal((await submit(ids.e, v2.version, attempt(8), correct)).state, "existing", "preexisting score consumes the claim");
  const legacyRow = (await db.query("select metadata from public.member_reward_events where user_id=$1 and dedupe_key='quiz-score:issue-01'", [ids.e])).rows[0].metadata;
  assert.deepEqual(legacyRow, { bestScore: 7, maxScore: 10, attempts: 4 }, "legacy award is never rewritten");

  await db.exec("reset role");
  await db.query(
    "insert into public.member_reward_events(user_id,dedupe_key,reward_type,issue_key,title,metadata) values ($1,'quiz-score:issue01','quiz_score','issue01','Legacy key',$2::jsonb)",
    [ids.d, JSON.stringify({ bestScore: 4, maxScore: 10 })]
  );
  await as("authenticated", ids.d);
  assert.equal((await status(ids.d)).score, 4, "legacy issue01 dedupe key also consumes a first reward");
  await db.exec("reset role");
  await db.query(
    "insert into public.member_reward_events(user_id,dedupe_key,reward_type,issue_key,title) values ($1,'quiz-score:issue-01','hidden_charm','issue-02','Collision')",
    [ids.d]
  );
  await as("authenticated", ids.d);
  await assert.rejects(() => status(ids.d), /quiz-reward-dedupe-conflict/, "a different reward cannot occupy the episode's stable dedupe key");

  await as("authenticated", ids.a);
  await assert.rejects(() => db.query(
    "insert into public.member_reward_events(user_id,dedupe_key,reward_type,title) values ($1,'quiz-score:forged','quiz_score','Forged')", [ids.a]
  ), /row-level security/, "client cannot forge a quiz score");
  const blockedUpdate = await db.query(
    "update public.member_reward_events set metadata='{}'::jsonb where user_id=$1 and dedupe_key='quiz-score:issue-01' returning metadata", [ids.a]
  );
  assert.equal(blockedUpdate.rows.length, 0, "client cannot alter a protected quiz reward");
  await db.exec("reset role");
  await db.exec('create policy "Test permissive reward delete" on public.member_reward_events for delete using (auth.uid() = user_id)');
  await as("authenticated", ids.a);
  const blockedDelete = await db.query(
    "delete from public.member_reward_events where user_id=$1 and dedupe_key='quiz-score:issue-01' returning id", [ids.a]
  );
  assert.equal(blockedDelete.rows.length, 0, "restrictive policy blocks protected delete even with a permissive delete policy");
  await db.query(
    "insert into public.member_reward_events(user_id,dedupe_key,reward_type,title) values ($1,'hidden:ok','hidden_charm','Unrelated')", [ids.a]
  );
  await db.query("update public.member_reward_events set title='Still unrelated' where user_id=$1 and dedupe_key='hidden:ok'", [ids.a]);
  await assert.rejects(() => db.query("update public.member_reward_events set reward_type='quiz_score' where user_id=$1 and dedupe_key='hidden:ok'", [ids.a]), /row-level security/, "unprotected row cannot be converted into a quiz award");
  const changedType = await db.query("update public.member_reward_events set reward_type='hidden_charm' where user_id=$1 and dedupe_key='quiz-score:issue-01' returning id", [ids.a]);
  assert.equal(changedType.rows.length, 0, "protected award cannot be retyped then deleted");
  await assert.rejects(() => status(ids.a, null), /unsupported-quiz-episode/);


  console.log("Quiz first reward SQL: v1/v2 server scoring, one-time clips, owner/role isolation, malformed rejection, legacy preservation, and restrictive client-write guards pass in isolated PostgreSQL. Live Supabase remains unverified.");
} catch (error) {
  console.error("Quiz first reward SQL FAIL:", error.stack || error.message);
  process.exitCode = 1;
} finally {
  await db.close();
}
