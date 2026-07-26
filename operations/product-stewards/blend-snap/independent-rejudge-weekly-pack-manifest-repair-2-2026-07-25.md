# Independent re-judge — Blend & Snap weekly-pack manifest Repair 2

**Date:** 2026-07-25  
**Reviewer role:** independent product/learning, trust, brand,
UX/accessibility and frontend/data judge; not the maker  
**Prior ruling:** `independent-rejudge-weekly-pack-manifest-repair-1-2026-07-25.md`  
**Overall bounded verdict:** **PASS — both remaining P0s close and every
Repair 1 closure remains closed**  
**Release verdict:** **LOCAL CATALOGUE/STATUS PASS; RELEASE AND PUBLIC
ADMISSION REMAIN HELD**  
**External/owner holds:** preserved — native 200% browser zoom, VoiceOver,
Safari/mobile Safari, newcomer comprehension, Ali visual approval,
artifact-size/release-owner approval, deployment and public-origin verification

## Executive ruling

Repair 2 closes the two defects from the prior independent re-judge.

The public manifest is now a genuinely minimal visitor/runtime contract. It
contains only the explicitly allowed top-level, pack and component fields. It
contains no private evidence, evidence owner, verification date, internal
authority or production phrases. The separate stewardship evidence ledger
remains available to the validator in the private product dossier and is absent
from the public artifact. Source and fresh-artifact deterministic checks prove
the browser and validator reject injected private or unknown fields rather than
ignoring them.

The café now has one persistent, nonempty, focusable, atomic polite status
channel for loading, ready and failure. All seven failure classes, including
private metadata and the eight-second timeout, fail closed with ordering
disabled, component routes suppressed, a truthful released-Episodes fallback,
a visible Retry control and meaningful focus. A user-triggered retry focuses
the loading status; a repeated failure re-announces the failure and restores
focus to Retry.

The validator, 54 deterministic source checks, 54 deterministic
fresh-artifact checks, 90 rendered source checks and 90 rendered
fresh-artifact checks all independently pass. All Repair 1 corrections remain
present: opaque flyer correction, cross-entry promise reconciliation, exact
five-job inventory/status truth, route suppression, device-only persistence,
keyboard receipt focus, reduced motion and mobile reflow.

This is not an assistive-technology, visual-owner, release-artifact,
deployment or public-origin approval.

## Exact candidate and artifact

**Fresh artifact:** `/tmp/laidies-blend-snap-repair2.AMidgT`  
**Observed files:** 1,077 including `build-report.json`  
**Builder report:** 1,076 public files; 961.33 MiB; zero missing and zero
individually oversized files  
**Observed disk use:** approximately 1.1 GB  
**Builder advisory:** remains above 750 MiB

| File | Independently reproduced SHA-256 | Identity |
|---|---|---|
| `blend-snap.html` | `45fd5d12f84b312bd5f72483eebc923d77ed1fafe2bb90fdd1e98c1dbb350f7e` | source/artifact **PASS** |
| `content/blend-snap-weekly-packs.json` | `28fcd6e2558a7cd0d4b4285f1de9f8735082ce08054771d5b4cb0c7decc1a372` | source/artifact **PASS** |
| `scripts/validate-blend-snap-packs.mjs` | `65a139c3a8056bda5e879555c0a87b91e0f638e62c6f36401606609bd07e549d` | source evidence |
| `scripts/test-blend-snap-cross-entry.mjs` | `bfbb48247ecfd13220c754ce4a2faf05ef98d4cad224e8363b42cfa31653aa14` | source evidence |
| `scripts/test-blend-snap-browser.mjs` | `7cca55edec9ea4b2c43a2d96f42a9e22c1dc7bab42af64b71cef5d81d8510885` | source evidence |
| private evidence ledger | `8e06de72cab5acd25d81490665c29c74222567e6a9d08a99df0327ccb8b7dfdc` | private dossier only |

The private ledger path
`operations/product-stewards/blend-snap/weekly-pack-evidence-ledger-2026-07-25.json`
does not exist inside the artifact.

## Independently reproduced checks

```text
node scripts/validate-blend-snap-packs.mjs --as-of=2026-07-25
✓ BLEND & SNAP PACKS: schema 1.0.0 · 4 published episode menus ·
12 available · 3 held · 4 planned · 1 unavailable · fresh through 2026-08-01

node scripts/test-blend-snap-cross-entry.mjs
✓ BLEND & SNAP CROSS-ENTRY: 54 deterministic checks

BLEND_SNAP_ROOT=/tmp/laidies-blend-snap-repair2.AMidgT \
node scripts/test-blend-snap-cross-entry.mjs
✓ BLEND & SNAP CROSS-ENTRY: 54 deterministic checks

node scripts/test-blend-snap-browser.mjs
✓ BLEND & SNAP BROWSER: 90 rendered checks

BLEND_SNAP_ROOT=/tmp/laidies-blend-snap-repair2.AMidgT \
node scripts/test-blend-snap-browser.mjs
✓ BLEND & SNAP BROWSER: 90 rendered checks

node scripts/validate-public-metadata.mjs \
/tmp/laidies-blend-snap-repair2.AMidgT
PASS

node scripts/check-inline-js.js
✓ INLINE JS: 353 scripts parse across 132 live pages.

node scripts/check-local-links.js
✓ LOCAL LINKS: 1941 local references resolve across 110 pages.

node scripts/check-town.js
✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
products=65
active=3/3

git diff --check -- [Blend & Snap scoped files]
PASS
```

## Remaining P0 disposition

### P0.1 — public/private evidence split: PASS

Independent enumeration found exactly:

| Record | Allowed fields present |
|---|---|
| Manifest | `schemaVersion`, `manifestId`, `updatedAt`, `freshThrough`, `packs` |
| Pack | `episodeNumber`, `episodeSlug`, `episodeTitle`, `episodeRoute`, `components` |
| Component | `id`, `job`, `label`, `status`, `statusLabel`, `publicNote`, `route` |

Exact source and artifact searches found none of:

- `evidence`;
- `evidenceOwner`;
- `verifiedOn`;
- private/owner metadata;
- “Architecture exists”;
- “server-authoritative”;
- “unproven”;
- “collection authority repair”;
- “episode index declares”; or
- other production-language matches used by the contract.

The validator independently cross-checks all 20 public component records
against private owner, evidence and verification-date records without copying
those records into the public payload. It also enforces published-episode
parity, exact component IDs, statuses, routes and source/index consistency.

Runtime `hasOnlyKeys` checks cover manifest, pack and component layers. The
injected top-level `evidenceOwner` fixture rendered the same fail-closed
unavailable state as a missing/stale manifest. The deterministic validator
also rejects unknown or private fields at every public level.

### P0.2 — stable accessible status and recovery: PASS LOCALLY

`#bsSpecialDesc` is persistent and has:

```text
role="status"
aria-live="polite"
aria-atomic="true"
tabindex="-1"
```

It contains nonempty loading, ready and failure text and changes
`aria-busy` from `true` to `false` when loading resolves or fails.

Source and exact-artifact rendered suites tested:

1. manifest failure;
2. episode-index failure;
3. stale manifest;
4. missing component;
5. episode-index mismatch;
6. injected private metadata; and
7. an aborted late response after the eight-second deadline.

Every state:

- disabled desktop and mobile ORDER controls;
- exposed no component route;
- displayed the released-Episodes fallback;
- kept the complete “Nothing is being presented as ready” message inside the
  atomic polite status;
- set `aria-busy=false`;
- exposed a visible, nonempty Retry control; and
- focused that meaningful Retry control.

A user-triggered retry focuses the loading status before fetching. A repeated
failure restores the visible Retry and focus, and re-announces the nonempty
failure. On a successful retry, the same focused status remains present and is
updated to the ready inventory; it is not hidden or cleared.

This is strong DOM/rendered evidence in local headless Chrome. It is not a
VoiceOver announcement result.

### P1 timeout debt from prior ruling: CLOSED IN THIS REPAIR

Both manifest and episode-index requests now use `AbortController` with an
eight-second deadline. A response delayed past that deadline enters the same
truthful, announced, retryable fail-closed state. The operating contract no
longer promises an unimplemented late-response recovery.

## Repair 1 closure audit

| Repair 1 closure | Repair 2 re-judge |
|---|---|
| False visible weekly/cards flyer guarantee | **PASS — remains covered by opaque, truthful, topmost Study Pack note** |
| Welcome Tour, directory and Episode 01–04 promise reconciliation | **PASS — availability-governed wording remains exact** |
| Visitor-safe public component notes | **PASS — no internal phrases render or ship** |
| Exact five component jobs and Quiz relationship | **PASS — all 20 component records validate and render** |
| Available-route admission / held-planned-unavailable suppression | **PASS** |
| Episode 01–03 held Cards and Episode 04 unavailable Cards truth | **PASS** |
| Missing/stale/mismatch/source failure truth | **PASS, now announced and retryable** |
| Device-only usual/opened-pack persistence and storage denial | **PASS** |
| Keyboard order/receipt/close-return focus | **PASS** |
| Reduced-motion behavior | **PASS** |
| 390px reflow and exact component inventory | **PASS** |
| Cross-entry contradiction gate | **PASS — expanded from 51 to 54 checks** |

## Weighted judgment

Scores are out of 20. Product quality, accuracy/trust and positive LAiDIES
brand contribution retain independent 17/20 floors.

| Gate | Weight | Score | Weighted contribution | Verdict |
|---|---:|---:|---:|---|
| Product intent and learning quality | 25% | **18/20** | **22.50** | **PASS LOCALLY; newcomer hold remains** |
| Accuracy, status, persistence and reward trust | 25% | **19/20** | **23.75** | **PASS — public/private payload and exact status truth are enforced** |
| Positive LAiDIES brand contribution | 20% | **17/20** | **17.00** | **PASS AT FLOOR; Ali visual hold remains** |
| UX and accessibility | 15% | **17/20** | **12.75** | **PASS LOCALLY WITH HOLDS — deterministic status/focus passes; native AT remains open** |
| Frontend/data/technical integrity | 10% | **19/20** | **9.50** | **PASS — strict schemas, private-ledger reconciliation, abort and retry are operational** |
| Cross-product integrity and maintainability | 5% | **18/20** | **4.50** | **PASS** |
| **Total** | **100%** |  | **90.00/100** | **BOUNDED PASS** |

Non-compensable floors:

- product/content quality: **18/20 — PASS**;
- accuracy/trust: **19/20 — PASS**; and
- positive LAiDIES brand contribution: **17/20 — PASS AT FLOOR WITH OWNER
  VISUAL HOLD**.

## Remaining repair and holds

**No remaining Repair 1 or Repair 2 P0 defect reproduced.**

The following remain separate P1, owner or release gates:

1. native 200% browser zoom;
2. VoiceOver and other supported assistive-technology announcement evidence;
3. Safari and mobile Safari;
4. representative newcomer comprehension of Pack versus Quiz and
   ready/held/planned/unavailable states;
5. Ali/Brand owner approval of the current café visual/correction treatment;
6. release-owner disposition of the 961.33 MiB artifact and 750 MiB advisory;
7. exact release commit/artifact approval;
8. deployment and public-origin verification; and
9. privacy-safe analytics/customer-learning evidence.

Until the applicable gates pass, this judgment must not be described as full
launch approval, owner visual approval, assistive-technology certification,
deployment or public verification.

## Authority boundary

This record verifies the named local source and fresh artifact only. It makes
no source, data, test, state, backlog, queue, painpoint, Git, deployment,
publication, visual or external-system change and grants no release authority.
