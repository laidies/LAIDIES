# Resident continuation v1 — release evidence

**Status:** BUILT LOCALLY / LIVE SUPABASE PASS / PUBLIC FRONTEND NOT YET DEPLOYED  
**Date:** 2026-07-29  
**Source branch:** `resident-continuation-20260729`  
**Base:** `6cb42b7` (`resident-account-vertical-20260727`)

## Problem corrected

The Resident Card itself could be restored through Supabase, but episode
position, tours and supported Closet collections were still stored only in one
browser. The Homepage continuation promise was therefore not operational
across devices.

## Exact implemented boundary

- Private `resident_continuations` and idempotency-receipt tables.
- Authenticated RPC-only get/put contract with RLS, optimistic revision checks,
  per-resident mutation serialization, bounded JSON validation and
  read-after-write verification.
- Anonymous state remains local.
- A first sign-in merges the supported local state into the resident account.
- A different account signing into the same browser clears only the supported
  continuation cache before restoring its own state.
- Supported now:
  - episode position/completion;
  - Welcome/Wednesday tour completion;
  - charms;
  - trading-card collection and metadata;
  - Puffy board and pouch;
  - the existing ritual/express completion flags.
- Excluded by design:
  - prompts and drafts;
  - messages and discussions;
  - Girl Talk choices;
  - other free-form/private activity content;
  - public reward ownership or balances.

## Live service proof

- anonymous get/put: denied;
- direct authenticated table access: denied;
- authenticated get/put: pass;
- idempotent retry: same revision;
- reused idempotency key with a different request: conflict;
- stale revision: conflict;
- external resume URL: rejected;
- account A session 1 write → account A session 2 read: exact match;
- account B remains isolated;
- second update is visible in the first account session.

## Real browser proof

`scripts/test-resident-account-browser-live.mjs` passed against the live
Supabase project using two independent browser contexts:

- local Card claimed to the account;
- second mobile browser restored the exact Card;
- Episode 02 position `123.4` seconds restored cross-browser;
- continuation link restored to `/watch.html?ep=02`;
- Closet rendered account-backed with no 390px horizontal overflow;
- same-browser account switch cleared Resident A's supported episode cache and
  restored Resident B's `/library.html` target.

`scripts/test-resident-continuation-ui.mjs` passed:

- five equal Homepage masthead actions, including
  `Pick up where I left off`;
- no 1440px or 390px Homepage overflow;
- Resident Card continuation explanation and account route present;
- NewsStand account link routes to the Resident desk.

## Contract tests

- `scripts/test-resident-continuation-contract.mjs`: PASS.
- `scripts/test-resident-continuation-sql-contract.mjs`: PASS.
- `scripts/test-identity-account-contract.mjs`: PASS.
- `scripts/test-identity-cross-device-vertical.mjs`: PASS.
- Resident Card owner-entry and full product-steward validators: PASS.
- changed JavaScript syntax and `git diff --check`: PASS.

## Release boundary

The Supabase migration is live. The tested frontend is still local at the time
this receipt was written. Do not claim public completion until an exact
curated artifact is deployed and the public origin passes account,
continuation, caching and rollback verification.
