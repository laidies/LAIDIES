# Town Hall Private-Inbox Trust — Repair 1 Evidence

**Date:** 2026-07-25  
**Status:** **REPAIR BUILT LOCALLY — REJUDGE REQUIRED**  
**Authority:** product-side repair against
`independent-review-private-inbox-trust-2026-07-25.md`  
**Release:** held; no deploy, publication, production service or private
submission was used

## Repair outcome

Repair 1 closes the independently reported product-side P0 defects without
claiming that the required server and staff lifecycle exists:

- removed the legacy production-global `__testOnly` adapter path;
- admitted synthetic fixtures only on localhost/127.0.0.1 with the exact Repair
  1 preflight marker and matching fixture ID;
- classified returned status-zero/transport errors, thrown aborts and
  missing/malformed receipts as outcome unknown;
- preserved unknown-outcome content, warned against duplicates and disabled
  immediate retry, while definite 4xx/shape rejection remains correctable;
- enforced the three-value type allowlist and 100-character subject limit in
  the controller after adversarial DOM mutation;
- replaced truthy local-state handling with a versioned, accepted, canonical,
  non-future receipt;
- removed smooth scrolling and transitions under reduced motion;
- repaired and measured submit and selected-chip contrast at 4.5:1 or higher;
  and
- exposed the release preflight visibly and failed closed on the public
  hostname while external acceptance evidence remains missing.

## Source verification

- `node scripts/check-town-hall-contract.mjs`
  - **PASS — 35 checks**
- `PLAYWRIGHT_CORE_PATH=… TOWN_HALL_EVIDENCE_DIR=/tmp/town-hall-repair1-source-evidence-final node scripts/test-town-hall-browser.mjs`
  - **PASS — 58 checks**
  - external service attempts: **0**
- `node scripts/check-inline-js.js`
  - **PASS — 353 scripts across 132 live pages**
- `node scripts/check-town.js`
  - **PASS**
- `node scripts/check-local-links.js`
  - **PASS — 1,967 references across 110 pages**
- `git diff --check -- <Town Hall Repair 1 governed files>`
  - **PASS**

Adversarial cases include the removed legacy global override, returned network
error, thrown abort, malformed receipt, controller-missing receipt, mutated
type, mutated 101-character subject, arbitrary/malformed/future local receipt,
reduced motion and computed control contrast. The accepted anonymous/signed-in,
storage-denied, auth failure, keyboard, hash, live-status, mobile and
content-minimisation maker cases continue to pass.

## Fresh exact public artifact

- Path: `/tmp/laidies-town-hall-repair1-final.rYvnPC/public`
- Builder result: **1,078 files / 961.42 MiB**
- Existing builder advisory: artifact exceeds 750 MiB
- Public metadata validator: **PASS**
- Town Hall contract: **PASS — 35 checks**
- Town Hall browser: **PASS — 58 checks**
- External service attempts: **0**
- The four governed runtime files are byte-identical between source and
  artifact.

| Governed file | SHA-256 |
| --- | --- |
| `town-hall.html` | `33b89f039ce7cd7a89117abdd03df7e6a7bbfe33f6a873b5b3906bfc0a64cca8` |
| `content/site/town-hall-feedback.js` | `0243d322d3d1f7cf617f8955d2353fe623b8a6e0c4f38a301418a657c11d84d4` |
| `content/site/town-hall-v2.js` | `9a71cf071d8de0a7e007b69c6e5277838fb4322d4c1644e76d4881aea3e26988` |
| `content/town-hall-v2.css` | `d4ba4b8d354bf22df72477fee2fee49d593bc00008f98612be8a7eea6512abc8` |

## Holds preserved

This evidence does **not** prove or release:

- server-side validation, rate limiting/anti-automation, idempotency, bounded
  runtime or private logging;
- isolated anonymous/signed-in/RLS and ambiguous-outcome service behavior;
- staff-only triage, notification, incident ownership, access,
  retention/deletion or correction/referral operation;
- public-origin behavior, approved privacy-safe analytics, Safari/VoiceOver,
  physical-device testing or native zoom;
- Ali's civic-accountability or room-art approval; or
- an independent Repair 1 rejudge.

The comment-card submission and Town Hall release therefore remain held.

## Learning scan

The reusable failure and prevention rules are already captured in the
authoritative independent review used for this bounded repair. The canonical
painpoints ledger was not edited because the Repair 1 brief explicitly excluded
it.
