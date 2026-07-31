# Blend & Snap Wave 1 maker evidence

**Evidence time:** 2026-07-27 America/Vancouver  
**Status:** `BUILT LOCALLY — not integrated, approved, deployed or public`

## Literal output

The candidate turns the documented café objects into the actual interaction sequence:

- arrival is JoJo’s counter and live Special, not a card grid;
- live menu and native ORDER control lead to a focus-managed in-place receipt;
- ticket rail shows five distinct component jobs with route controls only for available surfaces;
- planned Study Sheet and unavailable Cards have no link, keyboard target, ownership or reward language;
- optional usual and last receipt use isolated prototype-only browser keys;
- four visitor states keep the same current capability and make account neutrality explicit;
- loading, stale, offline and disagreement states turn the Special around, remove current actions and focus Retry;
- a separate noticeboard and back rail preserve optional exploration after pickup;
- `noscript` retains a bounded useful escape route without pretending it can validate live availability.

## Local verification

Command:

```sh
node operations/design-explorations/building-wave-1/blend-snap/test-candidate.mjs
node --check operations/design-explorations/building-wave-1/blend-snap/candidate.js
git diff --check -- operations/design-explorations/building-wave-1/blend-snap
```

Result:

```text
✓ BLEND & SNAP ISOLATED CANDIDATE: 97 checks · desktop/mobile/four visitor states/inventory/study/cards/failures/focus/storage/handoffs
```

The browser suite captures 1440px healthy/receipt/offline screens and 390px healthy plus 390/320px offline screens. It verifies zero horizontal overflow at 390px and 320px failure states, receipt focus and restoration, keyboard targets removed on failure, reduced-motion state, isolated persistence keys, exact available routes, and no-JS source fallback bounds.

## Evidence files

| File | SHA-256 |
| --- | --- |
| `evidence/desktop-1440-full.png` | `eed359b02ca69280a1597a55cc85844e6fcde4f2bc63fdfd7fe68cfd06877051` |
| `evidence/desktop-1440-receipt.png` | `b21851b39d978c0e6b9bfc3525ecfc354df976b1d8232f73c5549323fa20586a` |
| `evidence/desktop-1440-offline.png` | `79d0a600172c36ed41ec86d8fed5ae13dd40281e31c62171911eaa9cafa48d09` |
| `evidence/mobile-390-full.png` | `42cdeed1d23081f7e760c42adc60e36fd5db728eeca08ba8baac667801e41690` |
| `evidence/mobile-390-offline-full.png` | `7b71352d296c946da7907339e50e846916fcaa7583fde43bd2f23f0d14788cff` |
| `evidence/mobile-320-offline-full.png` | `35b6bf0374ea631e99e23b0b98dc25ecab2e5765376e226d1095ee06fa6affd4` |

Screenshot hashes are regenerated if the test is rerun; review must bind the candidate source hashes and newly captured evidence together.

## Limits and exact next action

This result does not establish final JoJo authority, final visual direction, current live manifest parity, downstream completion, Study Sheet content, cards ownership, account continuity, native VoiceOver/Safari, public release or deployment.

**Next action:** a different reviewer should judge the exact candidate at desktop, 390px and 320px against the experience brief: café comprehension in ten seconds; distinct component jobs; honest unavailable states; order/receipt/failure path; art/JoJo continuity; keyboard/reduced-motion/no-JS boundary; and source-hash-bound PASS/HOLD.
