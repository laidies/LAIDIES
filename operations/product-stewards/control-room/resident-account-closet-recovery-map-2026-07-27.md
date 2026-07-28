# Resident account, Card and Closet recovery map

**Evidence cutoff:** 2026-07-27 America/Vancouver  
**Recovery source:** verified release commit
`d6de6c0e43f1083fa2246d57215cdfcb6d774634`  
**Isolated branch:** `resident-account-vertical-20260727`  
**Dirty working tree:** evidence source only; never used as a wholesale build input

## Worktree control boundary

The original working tree currently contains **1,917 changed paths**:

- 198 modified tracked files;
- 1,719 untracked files;
- 12,723 tracked insertions and 1,599 tracked deletions;
- 1,126 paths under `operations/` (1,014 untracked);
- 664 paths under `assets/` (659 untracked);
- 39 paths under `scripts/`;
- 22 paths under `content/`; and
- 27 modified public HTML routes plus `styles.css`.

That tree is therefore not a safe source for a release or a broad “finish what
was started” merge. It is an evidence warehouse containing useful work,
rejected experiments, rendered outputs, operational records and unrelated
changes with no reliable shared admission boundary.

The control rule for this recovery is:

1. start from a publicly verified release commit;
2. identify a single product outcome;
3. locate prior work by exact path and checksum;
4. prove whether it was shipped, merely built, rejected or never integrated;
5. copy only admitted files into an isolated branch;
6. run the real product journey and relevant negative tests; and
7. checkpoint the isolated branch before any release work.

This prevents both failure modes Ali identified: rebuilding useful work from
scratch and treating the entire dirty tree as if it were one coherent product.

## Executive result

The account-backed Resident Card was substantially designed and locally tested,
but it was never integrated or released. The public product currently has a
working device-local Card and same-browser Closet. It does not have a usable
sign-in, account-backed Card store or cross-device restore.

The strongest prior work is recoverable:

- one private Card schema/RPC migration;
- one shared browser identity adapter;
- one static adapter/migration contract test; and
- one deterministic two-account/three-device service simulation.

All four files were untracked in the dirty working tree. No Git commit or
release contained them, no released page loaded the adapter, and the live
Supabase project did not contain the new `resident_cards` table or identity RPC.
They have now been recovered checksum-for-checksum into the isolated branch.

The isolated implementation also now contains:

- a shared account runtime using the recovered identity adapter;
- the Resident Card email-link/session/claim/restore/sign-out UI;
- a Closet bridge that restores only a verified account-backed Card;
- MAiKEOVER and Post Office handoffs to the canonical Resident Card account
  desk; and
- expanded static and browser contract coverage.

Current verified local results are 34/34 Resident Card contract checks,
MAiKEOVER contract PASS, identity adapter/migration contract PASS,
two-account/three-device deterministic service simulation PASS, and the
Resident Card browser journey PASS. These are local implementation results,
not proof that the missing live migration exists.

## Exact classification

| Capability / evidence | Status | Exact evidence | Recovery disposition |
|---|---|---|---|
| Device-local Resident Card envelope | SHIPPED | `content/site/resident-card-contract-v1.js` at release SHA `ae988d885c0bebfbc3e4eee8943f0027b16bef1e575281e20ecd5f2163b35aac` | KEEP as the local canonical Card format |
| MAiKEOVER local Card creation/edit/save | SHIPPED | Release `maikeover.html` SHA `1e968cede5d0bce7aa0f4a8368b1edc7e96a33a8809ac65bc498337d8be87dea`; real public same-browser save verified | KEEP; add explicit account claim after valid local save |
| Resident Card local status route | SHIPPED | Release `resident-card.html` SHA `62cbdf7607254e93fe9da876e26052b92c689ca9d57c348d42a0b47c40c1377e` | KEEP visual/local behavior; add account/session states |
| Closet local Card hydration | SHIPPED | Release `laidies-card.html` SHA `dbb076c9ae3e453dfea5134a08fc14e07a542fd48abb720fe9b852f49046dfdd`; real public same-browser restore verified | KEEP; add remote Card read-through |
| Nav auth label reader | PARTIAL / SHIPPED | `content/site/sv-nav-auth.js` release SHA `0716c4bc383d8971945fc1eae52ba46c75781901a0d0b2a8d0bee289ff7654ce` reads a Supabase session token, but the release offers no working sign-in entry | KEEP only after binding it to the shared session client |
| Legacy Supabase profile/reward/mail/block schema | LIVE, PARTIAL PRODUCT | Read-only public API probes returned HTTP 200 for `member_profiles`, `member_reward_events`, `resident_mail` and `resident_blocks` | KEEP schema; independently verify authenticated behavior before wiring promises |
| Existing inline MAiKEOVER/Closet Supabase code | PARTIAL / HELD | Current code contains magic-link/profile handlers but gates them behind `__LAIDIES_CONTROLLED_PREFLIGHT__` and an injected mock client | EXTRACT useful UI/behavior; do not revive direct profile writes wholesale |
| Private account-backed Card migration | BUILT NOT COMMITTED OR RELEASED | Dirty-tree `supabase/migrations/20260726010000_resident_identity_v1.sql`, SHA `f8f4cc3de1155ab78ad144795b170d8e5b44fb67cee65b51c1674e446cced358` | REVIEW, then adopt into isolated branch |
| Shared identity browser adapter | BUILT NOT COMMITTED OR RELEASED | Dirty-tree `content/site/identity-client-v1.js`, SHA `688a688f96a6f4209c8ba8fa863ee882935c35cb4052a03867572df823a05f34` | REVIEW, then adopt as the single account client |
| Identity static contract test | BUILT NOT COMMITTED OR RELEASED | Dirty-tree `scripts/test-identity-account-contract.mjs`, SHA `fea0806bf64f777604b54d9c702f82545e17ee6bc60276f27647b4937e1c037b` | KEEP and expand with frontend binding assertions |
| Cross-device service simulation | BUILT NOT COMMITTED OR RELEASED | Dirty-tree `scripts/test-identity-cross-device-vertical.mjs`, SHA `fca760f5d64906be552887ade27489718992054a8702f6b484d466de33a9dfbc` | KEEP as deterministic logic coverage; never call it live proof |
| Live `resident_cards` table | MISSING | Read-only REST probe returned HTTP 404 / `PGRST205` | Apply reviewed migration through authenticated project tooling |
| Live `get_my_resident_state_v1` RPC | MISSING | Read-only RPC probe returned HTTP 404 / `PGRST202` | Apply reviewed migration and verify authenticated/RLS behavior |
| Public magic-link request/callback/logout flow | MISSING | Public Resident Card/Post Office explicitly hold email intake; no released page loads the identity adapter | Build on Resident Card, then connect MAiKEOVER/Closet |
| Account Card claim and remote restore in Closet | MISSING | No released consumer calls `claim_resident_card_v1` or `get_my_resident_state_v1` | Build and test with two sessions |
| Authoritative cross-page reward/ownership ledger | PARTIAL / NOT PROVED | Legacy reward table exists, while many producers and Closet consumers still use unrelated local-storage keys | Separate second vertical after identity is real |

## Why the earlier work did not become a product

1. The four account-v1 implementation files were never added to Git.
2. The migration was never applied to Supabase.
3. The public pages were not wired to the new adapter.
4. Existing account UI was converted to a controlled-preflight/hold state.
5. The successful “cross-device” test used an in-memory service, not Supabase.
6. A later minimum-safe release deliberately shipped only local Card truth.

## Recovery rules

1. Never cherry-pick or copy the dirty pages wholesale.
2. Preserve the verified release markup, visual design and local Card behavior.
3. Import only the checksum-bound migration, adapter and tests after review.
4. Replace direct `member_profiles` mutation with the shared RPC adapter.
5. Keep local Card bytes after claim, sign-out and remote revoke.
6. Require real Supabase RLS proof with two separate accounts and two sessions.
7. Do not call local-storage reward producers “synced” until a separate
   authoritative ledger vertical proves producer, dedupe, revoke and Closet
   consumption.

## Exact implementation order

1. Adopt and PostgreSQL-review the four untracked identity-v1 files.
2. Add one account controller to `/resident-card.html`: request link, callback,
   session state, explicit local Card claim, restore and sign-out.
3. Make `/maikeover.html` hand a valid local Card to that controller rather than
   writing profile rows directly.
4. Make `/laidies-card.html` prefer the verified remote Card for an authenticated
   resident and fall back to the device-local Card when signed out.
5. Apply the migration with a pre-change schema inventory and rollback SQL.
6. Run anonymous, resident-A, resident-B, second-session, retry, stale-revision,
   logout and revoke tests.
7. Only after those pass, prepare a scoped release candidate.

## Current blocker

The existing in-app browser is not signed into the Supabase dashboard, Chrome
control is unavailable, and no Supabase management credential or CLI session is
present locally. This blocks applying and live-testing the schema, but it does
not block recovering, reviewing and integrating the existing frontend and
migration work in the isolated branch.
