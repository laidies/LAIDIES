# Resident Card live account and cross-browser verification

**Evidence time:** 2026-07-27T18:37:26-07:00 America/Vancouver  
**Status:** **LIVE BACKEND PASS / LOCAL FRONTEND PASS / PUBLIC FRONTEND HOLD**

## Literal result

The existing Supabase project `swqnkxzebxdbgyrzpdne` now contains the
least-privilege Resident Card v1 account schema and RPC boundary from:

- `supabase/migrations/20260726010000_resident_identity_v1.sql`
- SHA-256 `9d6155b851b09ce39b6e30b649c947b954a58ef55664ce57ece75d981e160f0e`

The migration is applied to the live project. It creates the private Card and
mutation-receipt stores, enables RLS, denies direct table access to `anon` and
`authenticated`, and exposes only the authenticated security-definer RPCs.
No public Card projection, rewards, community identity, publication or
progression authority was added.

## Live service verification

`scripts/test-resident-account-live.mjs` passed against real Supabase Auth and
PostgREST using two temporary accounts and three authenticated sessions:

- anonymous state RPC denied;
- first-account claim and same-key retry passed;
- a second independent session restored the exact Card;
- the second account could not see the first account's Card;
- direct table reads were denied for both authenticated accounts;
- idempotency conflict, stale revision and invalid envelope failed closed;
- profile update passed and cross-account username collision was rejected;
- revoke, same-key revoke retry and post-revoke state passed;
- re-claim after revoke passed;
- final cleanup revoke passed.

The repeatable test script is SHA-256
`8da7d5567ddd0ef297b897394342a8f9cd79ac6e3211ae309b1affdcbf636bec`.

## Real page journey

`scripts/test-resident-account-browser-live.mjs` drove the actual candidate
pages against the live account service in separate Chromium contexts:

1. a valid local Card was opened at `/resident-card.html`;
2. the first browser signed in and kept that Card with the account;
3. a clean 390×844 browser signed into the same account;
4. the second browser restored the Card;
5. `/laidies-card.html` loaded the verified account-backed Card and labelled
   the Closet `Account-backed view`;
6. the mobile Closet had no horizontal overflow.

The browser test passed with SHA-256
`1b3cdec4c381fe6f6b4635016d3ac4a95a42a7492d8b958bd1c1a5a661a4bea5`.

## Defects found and corrected by live testing

1. Application-level revision conflicts used PostgreSQL SQLSTATE `40001`.
   Supabase treated that as a retryable serialization failure and the request
   timed out. The RPC now returns explicit `PT409`.
2. Per-account mutation serialization used a blocking advisory lock. It now
   uses a fail-fast try-lock plus a bounded client retry.
3. A revoked Card left a tombstoned row whose hidden revision made later
   re-claim impossible. Re-claim now treats a deleted row as absent and
   revives it atomically.
4. Frontend read-after-write verification compared `JSON.stringify` output.
   Supabase `jsonb` key ordering made an equivalent Card look different.
   Account and Closet comparisons now canonicalize object keys recursively.

## Cleanup and limits

The two temporary test users and their cascaded profiles, Cards and mutation
receipts were deleted. Direct verification returned:

```json
{
  "remaining_cards": 0,
  "remaining_profiles": 0,
  "remaining_receipts": 0,
  "remaining_test_users": 0
}
```

The service schema is live. The frontend changes are verified only in this
isolated branch and are **not deployed**. Public-origin Resident Card/Closet
account behavior, real email magic-link delivery, Safari/VoiceOver, account
deletion UX and public Card sharing remain separate release gates.

