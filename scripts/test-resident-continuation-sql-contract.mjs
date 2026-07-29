import assert from "node:assert/strict";
import fs from "node:fs";

const sql = fs.readFileSync(
  new URL(
    "../supabase/migrations/20260729010000_resident_continuation_v1.sql",
    import.meta.url
  ),
  "utf8"
);

[
  "create table if not exists public.resident_continuations",
  "alter table public.resident_continuations enable row level security",
  "resident_continuation_v1_is_valid",
  "get_my_resident_continuation_v1",
  "put_my_resident_continuation_v1",
  "pg_try_advisory_xact_lock",
  "continuation-mutation-busy",
  "idempotency-conflict",
  "revision-conflict",
  "grant execute on function public.get_my_resident_continuation_v1()",
  "to authenticated"
].forEach((needle) => assert.ok(sql.includes(needle), needle));

assert.ok(
  sql.includes("revoke all on table public.resident_continuations from anon, authenticated")
);
assert.ok(sql.includes("pg_column_size(p_document) > 65536"));
assert.ok(!sql.includes("grant all"));
assert.ok(!sql.includes("to anon;"));

console.log(
  "RESIDENT CONTINUATION SQL CONTRACT PASS " +
  "private_rls=1 rpc_only=1 idempotency=1 concurrency=1 bounded_document=1"
);
