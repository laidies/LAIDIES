# NewsStand Wave 2 — independent HOLD successor maker evidence

**Status:** `BUILT LOCALLY — EXACT SUCCESSOR READY FOR FRESH INDEPENDENT REVIEW`

**Scope:** isolated candidate
`operations/design-explorations/building-wave-2/newsstand/**` plus this maker
record. No production NewsStand, story data, reader contract, shared asset,
integration, deployment or public state changed.

## Trigger and literal repair

Independent review
`independent-wave-2-building-candidate-review-2026-07-27.md` returned four
candidate-local HOLD findings:

1. desk-wide hold/malformed states retained per-paper quiet/current labels;
2. direct missing/retracted hash notices did not receive focus;
3. failed Paige/rack art left a silent dark room; and
4. no-JS exposed four enabled dead paper buttons.

The successor makes the global dataset decision authoritative for all paper
labels, puts every direct success/failure on the labelled reader title, adds
an early/late image-error fallback, and keeps all JavaScript-dependent paper,
radio and search controls disabled until the reader initializes.

## Exact successor tuple

| Path | SHA-256 |
| --- | --- |
| `index.html` | `e620b87a1d6ef1a6f403bb0247e6386e7aa444c43eab6bea5bc22364e9ccb04e` |
| `candidate.css` | `ad412fdf88439b75abebee48b0ef3931d5873b5cfef428758e12cb8a97a0ec3e` |
| `candidate.js` | `c3cafb700eb10832415c1f1f3cd99cd8731eb4d09fdb5241be522b4689c623a5` |
| `test-candidate.mjs` | `1cd2c5d6efede36bfcab3036343afc970554d096a12dfb642609ba7f970cf367` |
| `test-browser-successor.mjs` | `7235d5bbcb01b99f81f662b3ed9d31564e67e42c7239dd7b1b06f6637ecff74f` |
| forced-404 desktop evidence | `3e3947b02350259bc94dae2bf50f8853269e2b8830b878b698b7f725c6f1748d` |
| forced-404 mobile evidence | `476ba07d6f6fca9f262bf5b9ac78f5c2e1d8074ac2604748b177d12f578d49ad` |
| global-hold mobile evidence | `de08b0fb322e039906c2a309e29ff5494630e0ec48e4d57adcd21a78a0aedcc3` |
| no-JS 320 evidence | `12c1e144f7d6d97c24f37ddc53c04a118a27c81e84d020c0a63180860996c846` |

## Tests

- `NEWSSTAND WAVE 2 CANDIDATE PASS checks=20`
- `NEWSSTAND WAVE 2 SUCCESSOR BROWSER PASS checks=34
  widths=1440,390,320 keyboard=real
  fixtures=baseline,hold,malformed,retracted,missing,image-404,no-js,reduced-motion`
- JavaScript syntax PASS for candidate and browser suite.
- `git diff --check` on the candidate scope PASS.
- NewsStand product-steward owner-entry preflight PASS.

The browser suite uses actual Chrome Tab/Space input, verifies exact focus
return, forces the Paige image request to fail, disables script execution for
the 320px no-JS path and checks horizontal containment at all required widths.

## Remaining gates

- Fresh independent product/trust/interaction/responsive re-review of this
  exact tuple.
- Brand exact-use decision for the Paige/rack source image and final four-paper
  art language.
- Native assistive-technology, canonical publication writer/correction
  lifecycle, integration, release and public-origin proof remain outside this
  candidate repair.

No Ali decision is required for the repair. No editorial or public authority
is inferred.

## Learning scan

**Qualifying surprise:** a blocked image can emit `error` before a bottom-of-
document listener attaches, leaving a fallback that passes source inspection
but never appears. The first fallback composition also competed with the
persistent room title.

**Prevention rule:** image-critical building candidates must cover both the
live `error` event and the already-complete/zero-`naturalWidth` state, force the
real request to fail in browser tests, and visually inspect the resulting
desktop and mobile compositions. Fallback state must suppress competing
primary art/title layers.

**Possible Behind the Build angle:** a resilient “building as interface”
cannot treat its hero art as an infallible dependency; the room must stay
legible and useful when the illustration fails.
