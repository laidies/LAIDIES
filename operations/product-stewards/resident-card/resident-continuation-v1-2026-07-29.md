# Resident continuation v1 — release evidence

**Status:** DEPLOYED / PUBLICLY VERIFIED
**Date:** 2026-07-29  
**Source branch:** `resident-continuation-20260729`  
**Release commit:** `28f483e25c021e37e0acd2687abcae26a6d66927`
**Combined ancestry:** Episode 04 release + Resident Card account vertical +
Resident Communications v1

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

## Public release proof

- Supabase migration `20260729010000_resident_continuation_v1` is live.
- Curated artifact: 1,096 files; 1,006,263,525 bytes.
- Artifact identity SHA-256:
  `87f7781feac664e3d63b2277f153e080e617e5905f5d6c99494fe4f309fcc435`.
- Cloudflare deployment:
  `9f161385-7486-4207-9afe-8512ea453973`.
- Immutable origin:
  `https://9f161385.laidies-sunnyvaile.pages.dev`.
- Rollback target:
  `9bd1513e-cb01-4a46-89e9-fda49b375503`.
- Homepage, Resident Card, Resident Chat, watch page, continuation client,
  gifting client and chat client returned HTTP 200 and matched the curated
  artifact byte-for-byte at both the immutable origin and `https://laidies.ai`.
- The public 1440px/390px UI check passed: five Homepage masthead actions,
  account route, Resident explanation and zero horizontal overflow.
- The public two-browser/two-account journey passed:
  Episode 02 restored at `123.4` seconds in a separate browser; the account
  switch cleared Resident A's local episode cache and restored Resident B's
  `/library.html` continuation.
- Both exact disposable verification residents were deleted in Supabase after
  the public test; the Auth table showed zero matching test users and both
  local credential fixtures were removed.

The release deliberately preserves Resident Communications v1. Trading Cards
remains server-authoritative, duplicate gifting remains atomic, and direct/group
Resident Chat remains public and operational. The release does not sync
prompts, drafts, messages, discussions, Girl Talk choices or other private
free-form activity content into the continuation document.
