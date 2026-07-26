# Visitor's Centre relaunch P0 maker evidence

**Status:** BUILT LOCALLY — maker evidence, not independent approval or release proof

## Candidate

Governed runtime files are `visitors-centre.html` and `content/site/sv-welcome-tour.js`. Tests are `scripts/test-visitors-centre-contract.mjs` and `scripts/test-visitors-centre-browser.mjs`.

Exact curated artifact: `/tmp/laidies-visitors-centre-p0.qP0tAm` — builder reported 1,078 files / 961.4 MiB and the artifact browser suite passed. `visitors-centre.html` source/artifact SHA-256: `1962811f7dcf4d80862f284ea664d027dadbde9005b982ba3150bd8fd9303707`. `content/site/sv-welcome-tour.js` source/artifact SHA-256: `3a32744a4e4c0189dc417b60856c808db257f33dc37ee873a0b795eb296d7388`.

## Repairs demonstrated

- Clean arrival names the room as the town front desk and keeps the destination CTA closed until a valid selection.
- All 17 shared destinations populate the named directory; directory and map bind the same route.
- Selection focuses the revealed “Step inside” action; Escape/Back closes it and restores the initiating directory/map control.
- Missing shared data exposes useful named routes. Missing map preserves the directory and announces the failure, including the early image-error race found during maker testing.
- Visitor Centre no longer loads the audio-only trailer player or promotes the held KSVL anthem. It links to `/watch.html?ep=trailer` as an illustrated, captioned listen-along and labels the guided tour optional.
- Welcome Tour copy no longer promises KSVL playback, durable Report Card state, Sorority access, MAiKEOVER cross-device identity/rewards or obsolete FAiRY mechanics.
- Blocked storage produces a focused, truthful tour-recovery state. Postcard share/text/email/copy states do not claim delivery.

## Commands

- `node scripts/test-visitors-centre-contract.mjs`
- `PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-visitors-centre-browser.mjs`
- `node scripts/check-inline-js.js`
- `node scripts/check-local-links.js`
- `node scripts/check-product-stewards.mjs`
- `git diff --check -- <governed files>`
- `node scripts/build-public-site.mjs /tmp/laidies-visitors-centre-p0.qP0tAm`
- `VISITORS_CENTRE_ROOT=/tmp/laidies-visitors-centre-p0.qP0tAm ... node scripts/test-visitors-centre-browser.mjs`

Results: contract PASS (17 canonical destinations); source browser PASS; exact-artifact browser PASS; inline JavaScript PASS (352 scripts / 132 pages); local links PASS (1,956 references / 110 pages); product steward system PASS (65 products); governed diff check PASS. Builder warning remains: 961.4 MiB exceeds the repository's 750 MiB advisory.

## Maker score

**91/100 candidate self-assessment.** Product quality 18/20; accuracy/trust 19/20; LAiDIES contribution 18/20; UX/accessibility 18/20; technical/reliability 18/20. The score is intentionally capped because maker review cannot replace independent judgment, human comprehension, Ali's visual ruling, native AT/Safari/zoom or public-origin evidence.

## Holds

Independent exact-candidate judgment; Ali room-first visual approval; human clean-user comprehension; Safari/VoiceOver/native zoom and real-device share; approved analytics/privacy wiring; public-origin verification; destination-owner truth at release time.
