# Resident continuation reconciliation packet — 2026-07-30

**Status: REPORT READY — NO INTEGRATION APPLIED.**

**Authoritative source:** `resident-continuation-20260729` at
`28f483e25c021e37e0acd2687abcae26a6d66927` (the normalization commit); public
release record `8f813c4`. The source is **not** an ancestor of the current
`homepage-redesign` HEAD (`080926f`). The current committed branch omits every
core resident continuation file and the four post-baseline migrations below.

This is a non-destructive packet. Every mutating command is explicitly scoped
to a new disposable integration worktree. Do not run it from the active
Homepage worktree, and do not run a database migration, deploy, create a user,
or request email as part of this queue.

## Provenance and source commits

| Source commit | Contribution | Inclusion rule |
|---|---|---|
| `de745533c720e7b7a80b364e7832e9d8215e43ef` | account client/runtime, Closet bridge, private Card migration and account tests | restore final release bytes, not the whole commit |
| `6cb42b71b20768de0dc68a2ff46e30ffd5ed4410` | final account-client/migration corrections plus live-test evidence | take final code bytes; do **not** run its live test or reuse its evidence as current proof |
| `1dce196373e9616c99d76b3f8b62c571fee90c1a` | server-authoritative duplicate gifts and resident chat | restore final code/migrations/tests |
| `5eac0b0af75f00d9ae023c33e193d1ff51662b71` | allowlisted continuation merge and bootstrap | restore final code/migration/tests; manually reconcile page injection |
| `22e77073e728f773aa785346c296c7172509563d` + `28f483e25c021e37e0acd2687abcae26a6d66927` | merged/final normalized bytes | use `28f483e…` as the sole restoration source |

Do not cherry-pick the complete source commits: they mix release evidence,
every-page injections and unrelated release controls with the retained system.

## Exact retention manifest

All SHA-256 values are the final authoritative source bytes.

| Concern | Files | Release SHA-256 |
|---|---|---|
| Account / server-authoritative Card | `content/site/identity-client-v1.js` | `5e454bccd7638dbe1f480c5303d94135baffb0ba26c96e9d7221b1d35fb7757c` |
|  | `content/site/resident-account-runtime-v1.js` | `a4bfc062b11a62214f170d7382b55bf2adc68bf14880cff1d6e277362c73f39a` |
|  | `content/site/resident-account-page-v1.js` | `1419ed49a88550f1f6c17fa5e84f1ce93e49bf58f87074fd99166dccf5b53b2d` |
| Closet account-backed restore | `content/site/closet-account-bridge-v1.js` | `3d38f8b21c96550ead05d50c6953023b6b60cda8e533dfdb1beca10fd1cff1d3` |
| Allowlisted continuation | `content/site/resident-continuation-v1.js` | `ae61188d2b835e5097b7c28aa0a9e93ce2aa9cbbdc6ee0c659b6e068515510a7` |
|  | `content/site/resident-continuation-bootstrap-v1.js` | `8b01963c593b8073eb3546104840cdb58e55a72e985fdca51de9000c6e8b6671` |
| Duplicate-only gifts | `content/site/resident-card-gifting-v1.js` | `449a19db738f4b5bfe958e658690dc9c08d27ebf95c5eb729cf3955c5ca655cd` |
| Resident chat | `content/site/resident-chat-v1.js` | `244eac7cf9dd680ea9b403b0a67662fa73afafaecce2911c736f1a530b4a929d` |
|  | `content/site/resident-chat-v1.css` | `ee7fa3eaef8c17d1fb962abefe6926363dca7895cffb43b5c4a88f4e0760aeaf` |
| Private Card schema | `supabase/migrations/20260726010000_resident_identity_v1.sql` | `9d6155b851b09ce39b6e30b649c947b954a58ef55664ce57ece75d981e160f0e` |
| Gifts schema | `supabase/migrations/20260727213000_authoritative_trading_card_gifts.sql` | `d15fe5bf467d1894fab80f068857aaa70befc8d71d78c9e41419ad6c2fb12063` |
| Chat schema | `supabase/migrations/20260727214500_resident_chat_v1.sql` | `b31ef522968c37416f06964e4c1b15c5adae91d33d85f41c19de0df25aec5b3e` |
| Continuation schema | `supabase/migrations/20260729010000_resident_continuation_v1.sql` | `a343b53c94cd828d5d63eb993fd18e6f259101371bf2bc6ec59f5e65f535fd1c` |

Retain the paired rollback SQL as source records only:
`supabase/rollbacks/20260726010000_resident_identity_v1_rollback.sql` and
`supabase/rollbacks/20260729010000_resident_continuation_v1_rollback.sql`.
They are not approval to roll back any remote database.

## Ordered isolated queue

```bash
RELEASE=28f483e25c021e37e0acd2687abcae26a6d66927
BASE=$(git rev-parse HEAD)
WORKTREE=$(mktemp -d /tmp/laidies-resident-reconcile-XXXXXX)
git worktree add --detach "$WORKTREE" "$BASE"
cd "$WORKTREE"
git switch -c reconcile/resident-continuation-20260729
```

1. Restore the four migrations and two rollback records **without applying
   them**. Review filename/order and every checksum before any local runtime.

```bash
git restore --source="$RELEASE" -- \
  supabase/migrations/20260726010000_resident_identity_v1.sql \
  supabase/migrations/20260727213000_authoritative_trading_card_gifts.sql \
  supabase/migrations/20260727214500_resident_chat_v1.sql \
  supabase/migrations/20260729010000_resident_continuation_v1.sql \
  supabase/rollbacks/20260726010000_resident_identity_v1_rollback.sql \
  supabase/rollbacks/20260729010000_resident_continuation_v1_rollback.sql
```

2. Restore the nine runtime modules and these static contract tests:

```bash
git restore --source="$RELEASE" -- content/site/{closet-account-bridge-v1,identity-client-v1,resident-account-page-v1,resident-account-runtime-v1,resident-card-gifting-v1,resident-chat-v1,resident-continuation-bootstrap-v1,resident-continuation-v1}.js \
  content/site/resident-chat-v1.css
git restore --source="$RELEASE" -- \
  scripts/check-maikeover-contract.mjs \
  scripts/test-identity-account-contract.mjs \
  scripts/test-identity-cross-device-vertical.mjs \
  scripts/test-resident-card-contract.mjs \
  scripts/test-resident-card-browser.mjs \
  scripts/test-resident-communications-v1.mjs \
  scripts/test-resident-continuation-contract.mjs \
  scripts/test-resident-continuation-sql-contract.mjs \
  scripts/test-resident-continuation-ui.mjs
```

3. Do **not** restore all source pages. Reconcile these integration adapters
   first: `content/site/sv-global-header.js`, `content/site/sv-nav-auth.js`,
   `content/site/site-index.json`, `content/site/sunnyvaile-directory.js`,
   `content/site/sv-back-nav.js`, `content/site/sv-welcome-tour.js`.
   Preserve current Homepage design work; import only the release's continuation
   bootstrap and signed-in resident navigation behavior.

4. Manually three-way reconcile only the owning entry surfaces:
   `maikeover.html`, `laidies-card.html`, `resident-card.html`,
   `post-office.html`, `games/trading-cards.html`, and `resident-chat.html`.
   Add the release script tags/forms only after checking existing order,
   consent/state language and no duplicate runtime injection. Chat/Gifting must
   not be implied by the Resident Card itself.

5. Treat all 10 community pages and the remaining route injections from `5eac…`
   as a separate receiving-owner batch. They overlap active work and must not
   hitchhike with identity preservation.

## Conflict finding

The disposable merge probe (`HEAD` + release) returned exit 0 with no textual
conflicts, but would stage over 100 files. That is not acceptance. Semantic
reconciliation is mandatory because the current branch differs from the
release in 22 direct page/adapter/test paths, including every owning surface,
global header/nav, directory/navigation utilities and Resident tests. The
active worktree also has uncommitted changes in those owning pages and adapters.

The release static suite passed identity, cross-device model, continuation,
continuation SQL and communications contracts. Its `test-resident-card-contract`
ended at **32/34**, failing only “separate activity persistence is explicit”
and “identity and cross-product limits are explicit.” Do not label the
reconciliation verified until those two assertions are repaired/reconciled and
the complete current candidate suite passes.

## Verification queue

Run these only in the disposable integration worktree after steps 1–4:

```bash
node scripts/test-identity-account-contract.mjs
node scripts/test-identity-cross-device-vertical.mjs
node scripts/test-resident-continuation-contract.mjs
node scripts/test-resident-continuation-sql-contract.mjs
node scripts/test-resident-communications-v1.mjs
node scripts/test-resident-card-contract.mjs
node scripts/check-maikeover-contract.mjs
```

Then run the existing browser tests with isolated evidence destinations and
their local Playwright dependency. No test in this packet authorizes a real
Auth, email, database, public-origin, or deployment check.

## Rollback / disposal

Before committing the isolated candidate, revert only this queue with:

```bash
git restore --source="$BASE" -- content/site scripts supabase/migrations supabase/rollbacks \
  maikeover.html laidies-card.html resident-card.html post-office.html \
  games/trading-cards.html resident-chat.html
git status --short
```

If the worktree contains only this packet's changes, discard it completely:

```bash
cd -
git worktree remove "$WORKTREE"
rm -rf "$WORKTREE"
```

No active-worktree reset, checkout, migration application, provider action or
public change is part of this packet.

## Learning scan

**Reusable prevention rule:** a conflict-free merge of divergent release lines
is not evidence that a feature survived. Require a path manifest, explicit
ownership boundaries and static journey tests before restoring shared identity
systems. **Behind the Build angle:** “Git can merge two histories cleanly while
the customer journey is still missing.”
