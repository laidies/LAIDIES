# Visitor functionality reconciliation

**Status:** REPORT READY — PRIOR GAP PLAN SUPERSEDED  
**Evidence date:** 2026-07-30  
**Trigger:** Ali correctly recalled that identity and cross-device persistence
had already been extensively tested and released.

## Correction

Ali was correct.

The earlier gap analysis inspected the checked-out `homepage-redesign`
worktree and its stale product/dashboard records without first reconciling all
release branches. The relevant work lives on:

- branch `resident-continuation-20260729`;
- public release record commit
  `8f813c4b8f5acc653aa67a8b4652291b4e88c414`;
- deployed source
  `28f483e25c021e37e0acd2687abcae26a6d66927`.

That release is recorded as **DEPLOYED / PUBLICLY VERIFIED**.

## What was already built and publicly verified

### Identity and account-backed continuation

- Supabase Auth account sessions.
- Private account-backed Resident Card.
- Allowlisted cross-device continuation for:
  - episode position and completion;
  - Welcome/Wednesday tour completion;
  - charms;
  - Trading Card collection and metadata;
  - Puffy board and pouch;
  - ritual/express completion flags.
- First-sign-in merge from supported local state.
- Same-browser account-switch isolation.
- Account-aware Homepage continuation and Closet presentation.

### Real security and continuity proof

- anonymous get/put denied;
- direct authenticated table access denied;
- authenticated RPC get/put passed;
- idempotent retry preserved one revision;
- reused idempotency key with different input conflicted;
- stale revision conflicted;
- external resume URL was rejected;
- Account A write restored in a second independent browser;
- Account B remained isolated;
- an Account A update became visible to the other Account A session.

The real browser journey restored:

- the private Resident Card;
- Episode 02 at `123.4` seconds;
- `/watch.html?ep=02` as the continuation destination;
- the account-backed Closet at 390px without horizontal overflow;
- Resident B’s `/library.html` continuation after an account switch, while
  clearing Resident A’s supported local episode cache.

### Resident communications and Trading Card gifting

The combined July 29 release preserved the previously public Resident
Communications v1 release:

- private direct Resident Chat;
- private group Resident Chat;
- sitewide unread navigation;
- message read/report behavior;
- resident blocking;
- server-authoritative Trading Card binder and pack integration;
- atomic duplicate-only Trading Card gifting.

These are not missing products and must not be rebuilt from scratch.

## Exact release evidence

| Evidence | Value |
| --- | --- |
| Source branch | `resident-continuation-20260729` |
| Deployed source | `28f483e25c021e37e0acd2687abcae26a6d66927` |
| Release-record commit | `8f813c4b8f5acc653aa67a8b4652291b4e88c414` |
| Artifact identity | `87f7781feac664e3d63b2277f153e080e617e5905f5d6c99494fe4f309fcc435` |
| Cloudflare deployment | `9f161385-7486-4207-9afe-8512ea453973` |
| Immutable origin | `https://9f161385.laidies-sunnyvaile.pages.dev` |
| Rollback target | `9bd1513e-cb01-4a46-89e9-fda49b375503` |
| Supabase continuation migration | `20260729010000_resident_continuation_v1` |
| Communications migrations | `20260727213000`, `20260727214500` |

On 2026-07-30 the currently public shared clients still matched the deployed
source bytes exactly:

- `content/site/resident-continuation-v1.js`;
- `content/site/resident-chat-v1.js`;
- `content/site/sv-nav-auth.js`.

## The real gap

The real gap is **release-branch/worktree reconciliation and visitor-facing
integration**, not missing identity plumbing.

The active Cycle 9 Homepage candidate is being edited from the older
`homepage-redesign` lineage. Its local files and the checked-out Control Room
dashboard still describe account restoration, chat, mail and gifting as held
or coming soon. The public static Homepage copy also retains stale phrases
such as:

- `Account status`;
- account restoration still completing release checks;
- Card/Closet treated as device-local;
- mail and gifts `Coming soon`;
- `Check held account status`.

Those statements are now false relative to the deployed services.

## Correct execution plan

### P0 — Reconcile the released resident foundation into the Homepage lane

1. Treat `resident-continuation-20260729` and deployed source `28f483e...` as
   the governing functional baseline.
2. Produce a path-level diff between that release and the current Cycle 9
   Homepage/source dependencies.
3. Port or merge the exact released shared clients and required page hooks
   without overwriting the ongoing visual candidate.
4. Update stale Control Room and product-state records to the July 29 public
   truth.
5. Remove every false hold/device-local/coming-soon statement for capabilities
   included in the release.
6. Preserve the actual privacy boundary: prompts, drafts, discussions, Girl
   Talk choices and other private free-form activity content are not stored in
   the continuation document.

### P0 — Retest integration, not rebuild the backend

Run the existing released tests against the reconciled candidate:

- identity/account contract;
- cross-device vertical;
- live two-browser Resident Card/continuation journey;
- continuation SQL contract;
- Resident Communications static and live transaction suites;
- Homepage account-aware navigation;
- 390px and desktop Closet/Chat/Post Office journeys.

The purpose is to catch integration regressions introduced by the Homepage
branch, not to prove from scratch that the released service exists.

### P1 — Complete remaining genuine gaps

These remain real:

1. Resident Card + Wednesday Postcard one-signup/default-opt-in provider
   transaction and unsubscribe/retry proof.
2. “What’s new since your last visit,” using the already-proven account
   continuation foundation.
3. Daily Buzz production feed from exact publicly released NewsStand/current
   content.
4. At least one complete publicly admitted class and the useful
   starting-point/commitment pathways.
5. Native Safari, VoiceOver and zoom verification.
6. Real email magic-link delivery/recovery UX.
7. Public Resident Card sharing, which remains a separate unavailable
   contract.
8. Privacy-safe aggregate analytics and scheduled customer-evidence pulls.

## Prevention rule

Before classifying a feature as missing, inspect:

1. the checked-out worktree;
2. all branches containing recent release commits;
3. the latest release receipt;
4. the public critical-file bytes; and
5. current product-state records.

When those disagree, the disagreement is the incident. A stale worktree or
dashboard may not demote a newer publicly verified release into “not built.”

