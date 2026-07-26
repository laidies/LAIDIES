# Independent acceptance review — Welcome Wagon Visitor's Centre P0

**Reviewer:** independent judge (not the maker)  
**Review time:** 2026-07-26T05:50Z  
**Verdict:** **FAIL — not eligible for local acceptance or release.**

## Scorecard

| Dimension | Weight | Score | Gate result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 15/20 | Fail — full no-JS/shared-directory failure journey and human comprehension are not proved; the implemented fallback is not directory parity. |
| Accuracy, safety and trust | 30 | 10/20 | Fail — revealed destination copy promotes held/broken/lifecycle-dependent products without the limitations required by the public-promise registry. |
| Positive LAiDIES contribution | 20 | 16/20 | Fail — the room-first interaction is promising, but an unlabelled routing surface into known-held promises damages the welcoming, truthful product contribution. Owner visual ruling is also open. |
| UX/accessibility/reliability | 15 | 14/20 | Partial — Chromium keyboard, focus return, map/directory/storage recovery, 390px and reduced motion pass; 320px, no-JS, native zoom, Safari/VoiceOver and contrast evidence are absent. |
| Technical/artifact integrity | 5 | 18/20 | Pass locally — governed source/artifact byte parity and bounded Chrome suite pass; artifact remains above the 750 MiB advisory. |
| **Weighted total** | **100** | **69/100** | **FAIL** |

The first three dimensions are non-compensable and each must be at least 17/20. This candidate misses all three, so the total cannot override the verdict.

## P0 blockers

1. **The required named-directory fallback is not present without the shared script / JavaScript.** `visitors-centre.html` creates all 17 named choices only after `window.SV_BUILDINGS` is available. Its static `#vc-directory-fallback` has four named route links (NewsStand, Chick Flicks, LIBRAiRY, FAiRY) plus the homepage—not the required 17-destination directory. This conflicts with the charter's required accessible named fallback and the operating spec's no-JS/data recovery acceptance. The maker's “missing directory” test proves a useful partial escape route, not directory parity.

2. **The reveal exposes stale or overbroad receiving-product promises.** `openCard()` renders the shared directory's `oneLiner` and up to three `mechanics` verbatim for every destination. The visitor can therefore be shown, for example, KSVL's anthem/weekly-track claims, FAiRY “Real AI advice”/“3 wishes per visit,” MAiKEOVER “sign-up,” High classes/Book Fair, and other service-shaped claims. The 2026-07-25 public-promise registry holds or limits several of these products (including High as failed, FAiRY as fix-before-promotion, KSVL partial, MAiKEOVER account-unverified, and others). The Visitor's Centre operating spec expressly requires the surface to show or avoid each receiving-product limitation. Route correctness is navigation evidence, not truthful promotion or product readiness.

## Evidence run independently

All commands were run from the `Website-homepage` repository unless noted.

```sh
node scripts/check-product-stewards.mjs
# PASS: products=65; active=3/3

node scripts/test-visitors-centre-contract.mjs
# PASS: canonical_destinations=17

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-visitors-centre-browser.mjs
# PASS: clean, directory, map, Escape/focus, directory failure, map failure, storage failure, 390px, reduced motion

node scripts/build-public-site.mjs /tmp/laidies-visitors-centre-independent.6mCana
VISITORS_CENTRE_ROOT=/tmp/laidies-visitors-centre-independent.6mCana PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-visitors-centre-browser.mjs
# PASS on freshly built artifact

shasum -a 256 visitors-centre.html content/site/sv-welcome-tour.js /tmp/laidies-visitors-centre-independent.6mCana/visitors-centre.html /tmp/laidies-visitors-centre-independent.6mCana/content/site/sv-welcome-tour.js
# Source/artifact pairs match:
# visitors-centre.html: 1962811f7dcf4d80862f284ea664d027dadbde9005b982ba3150bd8fd9303707
# sv-welcome-tour.js: 3a32744a4e4c0189dc417b60856c808db257f33dc37ee873a0b795eb296d7388

git diff --check -- visitors-centre.html content/site/sv-welcome-tour.js scripts/test-visitors-centre-contract.mjs scripts/test-visitors-centre-browser.mjs
# PASS
```

Fresh artifact identity: `/tmp/laidies-visitors-centre-independent.6mCana`, 1,078 builder-reported files (1,079 `find` files including the root bookkeeping count), 961.4 MiB builder-reported / 1.1G `du`; the builder emitted its existing over-750 MiB advisory. This is local artifact evidence only, not a deployment or public verification.

## What did pass

- Clean arrival keeps the result hidden until a valid selection.
- Shared data supplies 17 selectable names; tested map and directory selections bind correct routes.
- Escape and Back close the reveal and restore focus to the initiating directory/map control.
- Early map-image failure announces that the directory still works; blocked tour storage gives a focused, honest recovery.
- Trailer/tour/postcard wording in the owned candidate does not claim sending, delivery, joining or reward completion; the trailer handoff is labelled as illustrated/captioned and the tour optional.
- The fresh artifact's governed runtime bytes match the reviewed source bytes.

## Remaining holds after P0 repair

- Human clean-user comprehension sessions.
- Ali's room-first visual/experience ruling.
- Independent native Safari, VoiceOver, native zoom, 320px reflow and computed contrast/status-announcement evidence.
- Approved privacy-safe analytics and public-origin exact-artifact verification.
- Current destination-owner admission must be reconciled at release time; no route selection may be presented as downstream completion.

## Learning scan

No new canonical painpoint entry was written: this review's only permitted mutation is this report. Reused prevention rules: BTB-050 (visitor understanding/design outrank checklist) and BTB-069 (navigation/click is not completion). Proposed prevention for the next repair: test the static/no-JS DOM separately from the JavaScript fallback, and bind every visible destination reveal to a current owner-status/limitation record rather than shared decorative mechanics.
