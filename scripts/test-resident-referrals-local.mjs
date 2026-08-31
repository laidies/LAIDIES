// Local-only PGlite runner. Actual baseline/public-card/identity/necklace SQL;
// auth.users/auth.uid and API grants are explicit synthetic harness boundaries.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const repo = resolve(import.meta.dirname, '..');
const root = process.env.PGLITE_ROOT;
if (!root) throw new Error('Set PGLITE_ROOT to the isolated PGlite package directory.');
const { PGlite } = await import(`${root}/node_modules/@electric-sql/pglite/dist/index.js`);
const { pgcrypto } = await import(`${root}/node_modules/@electric-sql/pglite/dist/contrib/pgcrypto.js`);
const migration = await readFile(resolve(repo, 'supabase/migrations/20260831010000_resident_referrals_v1.sql'), 'utf8');
const assertions = await readFile(resolve(repo, 'scripts/test-resident-referrals-provider.sql'), 'utf8');
const bases = await Promise.all([
  '20260630000000_baseline_schema.sql',
  '20260722193000_fix_constraint_drift.sql',
  '20260722210000_public_cards_show_only_card_fields.sql',
  '20260722234500_bestie_necklace.sql',
  '20260726010000_resident_identity_v1.sql'
].map(file => readFile(resolve(repo, 'supabase/migrations', file), 'utf8')));

async function exercise(candidate) {
 const db = new PGlite({ extensions: { pgcrypto } });
 try {
  await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key, aud text, role text, email text, encrypted_password text, email_confirmed_at timestamptz, raw_app_meta_data jsonb, raw_user_meta_data jsonb, created_at timestamptz, updated_at timestamptz);
    create schema if not exists extensions; create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;`);
  for (const sql of bases) await db.exec(sql);
  const results = await db.exec(assertions.replace(/^\\ir .*$/m, () => candidate));
  assert.equal((await db.query("select to_regclass('public.resident_referral_invites_v1') is null as clean")).rows[0].clean, true, 'candidate schema rolled back');
  assert.equal((await db.query('select count(*)::int as n from auth.users')).rows[0].n, 0, 'synthetic users rolled back');
  return results.flatMap(result => result.rows).filter(row => row.assert_true || row.expect_error).length;
 } finally {
  await db.close();
 }
}

async function main() {
const count = await exercise(migration);
console.log(`LOCAL TESTS: ${count} assertions/expected denials passed; schema and synthetic users rolled back.`);

function withoutPolicy(name) {
 const pattern = new RegExp(`create policy ${name} on public\\.member_reward_events[\\s\\S]*?;`);
 assert.match(migration, pattern, `calibration mutation exists: ${name}`);
 return migration.replace(pattern, '');
}
const mutants = [
 ['public-read leak', withoutPolicy('resident_necklace_owner_read_v1'), 'privacy: anonymous historical necklaces hidden'],
 ['permissive insert bypass', withoutPolicy('resident_necklace_server_insert_v1'), 'expected-denial: row-level security'],
 ['permissive update bypass', withoutPolicy('resident_necklace_server_update_v1'), 'expected-denial: row-level security'],
 ['permissive delete bypass', withoutPolicy('resident_necklace_server_delete_v1'), 'forgery: direct necklace delete denied'],
 ['account cascade orphan', migration.replace(/create trigger account_delete_resident_referrals_v1[\s\S]*?;/, ''), 'cleanup: recipient deletion removes both new halves'],
 ['invite cascade orphan', migration.replace(/create trigger resident_referral_delete_awards_v1[\s\S]*?;/, ''), 'cleanup: recipient deletion removes both new halves'],
 ['expired list lies', migration.replace("case when i.state in ('issued','accepted') and i.expires_at<=now() then 'expired' else i.state end", 'i.state'), 'recipient list reports expired accepted'],
 ['orphan display', migration.replace("e.source is distinct from 'resident_referral_v1' or exists (", 'true or exists ('), 'projection: orphan v1 rows excluded'],
 ['private title snapshot', migration.replace("'id',e.id,'title','BEST FRIENDS necklace','createdAt'", "'id',e.id,'title',e.title,'createdAt'"), 'projection: exactly generic id title createdAt'],
 ['forged first claim time', migration.replace('new.created_at:=old.created_at;', 'null;'), 'timestamp: existing first claim is immutable'],
 ['raced existing Card qualifies', migration.replace("if not exists(select 1 from public.resident_cards where owner_id=v_actor and deleted_at is null and created_at > v.accepted_at)", 'if false'), 'expected-denial: new-claimed-resident-card-required']
];
for (const [label, candidate, expected] of mutants) {
 assert.notEqual(candidate, migration, `mutant must alter candidate: ${label}`);
 let failure;
 try { await exercise(candidate); } catch (error) { failure = error; }
 assert.ok(failure, `known-bad candidate accepted: ${label}`);
 assert.ok(failure.message.includes(expected), `${label}: wrong failure: ${failure.message}`);
 console.log(`CALIBRATED REJECTION: ${label} → ${expected}`);
}
console.log('Local mechanics verified only; real provider concurrency, browser behavior and policy approval remain unverified.');
}
main().catch(error => {
 console.error('LOCAL TEST FAILURE:', JSON.stringify({message:error.message,code:error.code,where:error.where}));
 process.exitCode = 1;
});
