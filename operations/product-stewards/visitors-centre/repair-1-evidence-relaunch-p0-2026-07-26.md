# Visitor's Centre Repair 1 evidence — static directory and destination truth

**Date:** 2026-07-26  
**Status:** REPAIR BUILT LOCALLY — REJUDGE REQUIRED  
**Authoritative rejection:** `independent-review-relaunch-p0-2026-07-26.md`

## Repaired P0 1 — static and failed-data parity

`visitors-centre.html` now contains one visible static directory with all 17
canonical destination names, IDs and routes. It is:

- visible when JavaScript is disabled;
- revealed when `sunnyvaile-directory.js` is missing;
- the source of the current destination summary/limitation records; and
- checked against `window.SV_BUILDINGS` for exact name, ID, order and route
  parity.

The empty enhanced select is hidden when JavaScript is disabled. A shared-data
failure exposes the full directory, not a preferred subset or homepage escape.

## Repaired P0 2 — current limitation contract

The destination reveal no longer reads shared `oneLiner` or `mechanics`.
Instead, each of the 17 static route records declares:

- `held` or `limited`;
- a visitor-facing current summary; and
- the receiving product's material limitation.

Held routes say `Held from promotion` and use `Open page — check status`.
Limited routes say `Limited · check current status`. Neither action claims the
destination is ready or that navigation completed its product job.

The rendered suite replaces KSVL's shared decorative copy with hostile
sentinels and proves neither reaches the reveal. It also covers KSVL, FAiRY,
SUNNYVAiLE High, MAiKEOVER, Town Hall, Dream Phone and Post Office limitations.
A removed contract record fails held with an unavailable-details message and
the explicit rule that selection is navigation, not completion/readiness.

## Maker verification

### Source candidate

- `node scripts/test-visitors-centre-contract.mjs` — **PASS**, 17 canonical
  destinations and all static/current-limitation checks.
- `PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node
  scripts/test-visitors-centre-browser.mjs` — **PASS**, 67 assertions.
- Browser journeys: no-JS static parity, all 17 interactive routes,
  shared-directory failure, stale decorative-data denial, missing-contract
  fail-closed state, KSVL/FAiRY/High/MAiKEOVER/other limitations, map failure,
  storage failure, existing focus/Escape behavior, 390px, 320px, computed
  contrast, polite status and reduced motion.
- `node scripts/check-inline-js.js` — **PASS**, 353 scripts / 132 pages.
- `node scripts/check-local-links.js` — **PASS**, 1,969 references / 110 pages.
- `node scripts/check-town.js` — **PASS**.
- Scoped `git diff --check` — **PASS**.

### Fresh exact artifact

- Path: `/tmp/laidies-visitors-centre-repair1.OTCJfy/public`
- Builder: **1,078 files / 961.41 MiB**.
- Existing builder warning: artifact exceeds the 750 MiB advisory.
- Exact-artifact browser suite: **PASS**, the same 67 assertions.
- Public metadata validation: **PASS**.
- `visitors-centre.html` source/artifact byte parity: **PASS**.
- `content/site/sv-welcome-tour.js` source/artifact byte parity: **PASS**.

This is local artifact evidence, not deployment or public-origin proof.

## SHA-256 receipts

| File | SHA-256 |
| --- | --- |
| `visitors-centre.html` | `413da8c6237dbc17165e53921a1ef4f7c0e4a67647f62b4a4f90c839ac16d5a7` |
| `content/site/sv-welcome-tour.js` | `3a32744a4e4c0189dc417b60856c808db257f33dc37ee873a0b795eb296d7388` |
| `scripts/test-visitors-centre-contract.mjs` | `1a9c0c8c0036cb852222324d59f310e9e9604efb6f19d4320634e7edf45b4078` |
| `scripts/test-visitors-centre-browser.mjs` | `31ba1e2ec3f0aa2165048ab9ca308961306e871b72380755023f131450144eda` |
| `320px-fairy-held-status.png` | `4476c6d902c03c93e5ff6e8bf99998080b320569002953f7ddab1238338c8d4d` |
| `shared-directory-failure-all-17.png` | `1b07ba89f2d77408cdb0a84f4f3d52a6e1a791884a81d9f32f900d18c3f772a3` |

The exact artifact copies of `visitors-centre.html` and
`sv-welcome-tour.js` have the same hashes shown above.

## Visual evidence

- `evidence-repair-1-2026-07-26/shared-directory-failure-all-17.png`
- `evidence-repair-1-2026-07-26/320px-fairy-held-status.png`

The first capture shows all 17 direct routes under shared-directory failure.
The second shows FAiRY's held status, boundary copy and qualified outbound
action at 320px.

## Preserved passes and holds

The repair preserves the prior map/directory selection, route binding,
Escape/Back focus restoration, map/storage recovery, trailer/tour/postcard
truth and reduced-motion behavior.

Still held:

- independent Repair 1 rejudge;
- human clean-user comprehension;
- Ali's room-first visual/experience ruling;
- Safari, VoiceOver, native zoom and real-device share;
- approved privacy-safe analytics;
- destination-owner admission reconciliation at release time;
- deployment and public-origin verification.

No central registry/run queue/active-work/parallel-work/painpoints, Git,
external service, deployment or publication was changed.

## Learning scan

No new painpoint entry was permitted or needed. This repair operationalizes the
rejection's proposed controls: test the static/no-JS DOM separately from the
JavaScript fallback, and bind visible discovery copy to a current fail-closed
destination limitation record rather than decorative directory prose.
