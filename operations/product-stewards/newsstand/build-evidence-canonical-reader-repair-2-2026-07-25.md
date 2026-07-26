# NewsStand canonical reader repair 2 — local build evidence

**Date:** 2026-07-25  
**Trigger:** independent re-review defects NS-RR-01 through NS-RR-03  
**Status:** VERIFIED LOCALLY FOR THE BOUNDED REPAIR — NEWSSTAND RELEASE HOLD  
**Authority:** local NewsStand maker source, tests, fixtures and dossier only;
no deploy, publication, external service, visual approval, Git or queue change

## Repaired

### One availability decision on every reader route

`content/newsstand-reader-contract.js` now exposes one
`accessDecision(data, story, context, now)` decision. The reader calls it from:

- paper selection;
- archive search before searching;
- every candidate search result;
- direct/hash routing before story resolution; and
- each resolved story before rendering.

Dataset hold, load failure and no-data suppress all story bodies and search
results. Per-publication hold, quiet, unavailable and stale suppress that
paper’s listings, search results and direct story body. Stale preserved routes
show a dated-check-overdue/archive warning rather than the article. Retracted
routes preserve only the retraction notice. Corrected eligible stories retain
their body with a visible correction notice.

### Correct state precedence

Global state is now calculated from the actual publication states:

- expired dated checks produce `stale`;
- a non-expired but unavailable publication produces `unavailable`;
- no current issue with fully checked quiet/held desks produces `clear`; and
- a mixed current/stale desk remains globally `ready` while the stale
  publication remains blocked and the degraded state is named.

An unavailable record can no longer produce “Paige’s check is overdue” unless a
check is actually expired.

### Durable correction/retraction and rollback evidence

The prior nonexistent fixture paths were replaced by:

- `operations/test-fixtures/newsstand-reader/evidence/correction-label-truth-2026-07-25.json`
- `operations/test-fixtures/newsstand-reader/evidence/retraction-label-truth-2026-07-25.json`
- `operations/test-fixtures/newsstand-reader/correction-retraction-rollback-drill.json`

The validator resolves both evidence records, binds them to the Tribune story
and requires the same three approved source IDs. The deterministic drill proves
the local sequence:

1. approved/published → body visible;
2. corrected → body plus dated correction notice; and
3. retracted rollback → body suppressed, preserved-route notice visible.

This is fixture-level rollback evidence. It is not a producer, deploy or public
rollback and does not satisfy that later release gate.

## Verification

| Check | Result |
|---|---|
| `node scripts/validate-newsstand-stories.mjs` | PASS — schema 1.0.0, four canonical papers, source/evidence records resolve |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — 10 state fixtures plus the 3-stage rollback drill |
| `node scripts/test-newsstand-reader-browser.mjs` | PASS — 37 rendered headless-Chrome checks |
| Browser hold paths | PASS — direct hash and archive search expose no body/result |
| Browser no-data/load-failure paths | PASS — direct hash and search fail closed |
| Browser stale/mixed paths | PASS — story body/search blocked; stale warning visible |
| Browser unavailable path | PASS — unavailable is not labelled overdue |
| Browser correction/retraction | PASS — correction body/notice; retraction notice/no body |
| Browser focus | PASS — open, empty, paper return and search return |
| Browser 390/reduced motion/200% proxy | PASS — no overflow, automatic scroll, zero transition, Chrome page-scale proxy |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — all 10 fixtures; no publication action |
| `node scripts/check-inline-js.js` | PASS — 353 scripts across 132 live pages |
| `node scripts/check-local-links.js` | PASS — 1,943 references across 110 pages |
| `node scripts/check-town.js` | PASS |
| `node scripts/check-product-stewards.mjs` | PASS — 65 products; 3/3 active |
| Scoped JSON and `git diff --check` | PASS |

## Still open

- Health remains on independent editorial/accuracy hold.
- The overall NewsStand remains **HOLD — FIX BEFORE LAUNCH**.
- A separate independent re-review must score the exact repair.
- Safari/VoiceOver or another real screen-reader session remains unverified.
- The deterministic rollback is not the controlled producer → artifact →
  deploy → public correction/rollback drill.
- The legacy Wednesday image is only truthfully labelled archive art; Ali has
  not approved a final Weekly visual decision.
- No fresh release artifact or public verification exists.
