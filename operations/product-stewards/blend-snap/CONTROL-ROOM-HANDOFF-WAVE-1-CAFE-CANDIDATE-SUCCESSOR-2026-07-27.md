# Control Room handoff — Blend & Snap Wave 1 café candidate successor

**Status:** `BUILT LOCALLY — BAS-FAILURE-01 repaired; independent rejudge required`  
**Evidence time:** 2026-07-27 America/Vancouver  
**Scope lock:** `operations/design-explorations/building-wave-1/blend-snap/**` only

## Literal repair

Independent judgment returned HOLD `BAS-FAILURE-01`: The Regulars archive
failure panel inherited the surrounding section’s near-white foreground while
retaining a near-white panel background.

The successor changes only the candidate failure-state presentation and its
test:

- `.inventory-failure` now declares foreground `rgb(23, 32, 51)` and
  background `rgb(255, 248, 234)` explicitly;
- failure-panel paragraph copy declares `rgb(62, 72, 89)`;
- each rendered `offline`, `stale` and `disagreement` fixture asserts the exact
  computed panel foreground/background pair; and
- desktop 1440, mobile 390 and mobile 320 offline evidence was recaptured.

The healthy café, component inventory, routes, state controller, storage
boundary, art, JoJo composition, receipt and production/shared files are
unchanged.

## Exact successor identity

| File | SHA-256 |
| --- | --- |
| `index.html` | `473652ddd7bf74a708bda05c92e237bd04731697998463f6d33dc9dd7989f4e5` |
| `candidate.css` | `bd8625f619f8d3bdfdf72bba2d11100ccb37c5998a79fe31c70ea2825a8027b6` |
| `candidate.js` | `dbe54cf38a6ce4da4692779900dba723af7dd0a2e594fbd44c498b3b51354826` |
| `test-candidate.mjs` | `9a70a17c687e697880cd7930db91bf3d775d8863219bd881c000d0a2531070f1` |
| `evidence/desktop-1440-offline.png` | `79d0a600172c36ed41ec86d8fed5ae13dd40281e31c62171911eaa9cafa48d09` |
| `evidence/mobile-390-offline-full.png` | `7b71352d296c946da7907339e50e846916fcaa7583fde43bd2f23f0d14788cff` |
| `evidence/mobile-320-offline-full.png` | `35b6bf0374ea631e99e23b0b98dc25ecab2e5765376e226d1095ee06fa6affd4` |

## Verification

```text
✓ BLEND & SNAP ISOLATED CANDIDATE: 97 checks · desktop/mobile/four visitor states/inventory/study/cards/failures/focus/storage/handoffs
```

`node --check` and scoped `git diff --check` pass. Visual inspection of the
recaptured desktop and 320px offline screens confirms the archive message is
dark and readable on the light panel with no horizontal overflow.

## Exact next action

A different reviewer should rejudge the exact successor tuple and return a
checksum-bound PASS/HOLD for `BAS-FAILURE-01` plus regression scope. No live
route, shared CSS, content manifest, media, backend, deployment or public
mutation is authorized or implied.

