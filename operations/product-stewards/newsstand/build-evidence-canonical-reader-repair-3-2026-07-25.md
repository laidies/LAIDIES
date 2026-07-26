# NewsStand canonical reader repair 3 — history recovery evidence

**Date:** 2026-07-25  
**Trigger:** NS-R2-IR-01 from
`independent-review-repair-2-2026-07-25.md`  
**Status:** VERIFIED LOCALLY FOR THE BOUNDED HISTORY REPAIR — RELEASE HOLD  
**Authority:** NewsStand reader, deterministic/browser tests, product state and
backlog only; no homepage edit, queue change, Git, deploy, publication,
external service or visual approval

## Defect repaired

Browser Back previously removed a story hash but left the full article mounted,
the prior search/paper cards absent and focus on the article heading. The URL
and visible reader state therefore contradicted one another.

The reader now treats its un-hashed view as restorable state:

- paper/search type;
- selected paper;
- exact search query;
- originating story slug;
- scroll position at activation; and
- the applicable result/control fallback.

Before a result opens, that view is written to the current un-hashed history
entry. The story history entry retains the prior view for Forward/repeated
navigation. When a `hashchange` produces an empty hash:

1. a saved paper view is reconstructed and its originating result is focused;
2. a saved search view restores the exact query and eligible cards, then
   focuses the originating result;
3. a direct/blocked story with no saved view closes the reader, removes mounted
   story/notice markup and focuses the relevant publication control; and
4. a closed state remains closed.

The reader uses manual scroll restoration, restores the saved vicinity after
layout, and lets focus on the originating result provide the final accessible
orientation. Forward re-runs the canonical availability gate; it cannot revive
a held, stale, unavailable or retracted body.

## Rendered coverage

`node scripts/test-newsstand-reader-browser.mjs` now passes **73** headless
Chrome checks, including:

- paper card → keyboard Enter → story → Back → exact cards/result focus →
  Forward → story → repeated Back;
- archive query → keyboard Enter → result → keyboard Enter → story → Back →
  exact query/cards/result focus → Forward;
- direct eligible story → empty hash → reader closed/body removed;
- corrected search card/story → Back → corrected card/query/result focus;
- retracted preserved route → empty hash → reader closed/no body;
- stale and held preserved routes → empty hash or repeated Back/Forward without
  stale body;
- eligible Tribune → held Health → Back/Forward with the correct body/notice
  each time;
- explicit return, no-data/load-failure, unavailable/mixed desk, 390 px,
  reduced motion and Chrome 200% page-scale proxy.

The deterministic reader test also asserts that the source contains the history
snapshot, previous-view binding, empty-hash restoration branch and mounted-body
clear operation.

## Full verification

| Check | Result |
|---|---|
| `node scripts/validate-newsstand-stories.mjs` | PASS |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — 10 state fixtures plus rollback drill |
| `node scripts/test-newsstand-reader-browser.mjs` | PASS — 73 rendered checks |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — 10 fixtures; no publication action |
| `node scripts/check-inline-js.js` | PASS — 353 scripts across 132 live pages |
| `node scripts/check-local-links.js` | PASS — 1,943 references across 110 pages |
| `node scripts/check-town.js` | PASS — canon, titles, links, index, rewards and quizzes agree |
| `node scripts/check-product-stewards.mjs` | PASS — 65 products; 3/3 active |
| Scoped NewsStand state JSON parse and `git diff --check` | PASS |

## Three homepage strings identified, not edited

The independent review’s residual generic homepage phrases are exactly:

1. `index.html:614` — `NewsStand · stories translated by LAiDIES`;
2. `index.html:662` — map description `Big stories and tracked themes`; and
3. `index.html:686` — directory line
   `NewsStand · Big stories and tracked themes`.

Their correction is unambiguous—reuse the canonical source-checked,
current-or-honestly-quiet/four-job descriptor—but `index.html` is outside this
repair’s named NewsStand maker boundary. They were recorded for the owning
homepage lane and not changed here.

## Still open

- Health and the overall NewsStand remain **HOLD — FIX BEFORE LAUNCH**.
- Repair 3 needs independent re-review.
- The three homepage descriptors remain open in their owning product lane.
- Safari/VoiceOver or another real screen reader remains unverified.
- Ali has not approved the final Weekly visual decision.
- No hash-bound release artifact, controlled public rollback, deployment or
  public verification exists.
