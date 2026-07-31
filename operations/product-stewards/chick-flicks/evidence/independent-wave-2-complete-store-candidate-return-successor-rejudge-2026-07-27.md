# Chick Flicks Wave 2 return-continuation successor — independent re-review

**Verdict:** **HOLD — browser-execution portion of the independent gate is unavailable in this judge environment.**

This is a bounded, judge-only record. It changes no candidate, artwork, production
route, shared file, media, deployment or public state.

## Frozen input reproduced

| Input | SHA-256 | Result |
| --- | --- | --- |
| Maker evidence | `14622a0bfbd6dc983fa78e7494b70b7d48537ae060046ce26646cf92a418f113` | supplied input read |
| Candidate HTML | `663bf315ae841e121076969fe4c7942b17b9541116e5042a348cb3fadbe0b1db` | match |
| Candidate CSS | `102bdf2fc17873ca17787225ff5758f3477641f0ca5815c0efee87e5650f3626` | match |
| Candidate controller | `b9476ad73286ce14cfdc1a14d8dea33698c3f8e9a89d20b0e1d0acd9b6514896` | match |
| Deterministic test | `9cdee52d8370acae16eefeab6182a8377387ec91d758530db8d2e0de260087f6` | match |
| README | `d4c474d354a0ce7f381e37b737d31f2d98e305e63a3c00571a54681063af9650` | match |
| Text-safe store artwork | `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3` | match; `1672 × 941` |

## Checks independently rerun

- `node --check chick-flicks-candidate.js` — PASS.
- `node test-candidate.mjs` — PASS: room, wall, eight aisles, valid/stale/corrupt/denied/clear-denied last-rental contracts, browser-reload-clear contract, image fallback, mobile and reduced-motion assertions.
- `node scripts/check-product-stewards.mjs --owner-entry chick-flicks` — PASS.
- `jq empty operations/product-stewards/chick-flicks/state.json` — PASS.
- Scoped `git diff --check` — PASS.
- Source review confirms that `validatedLastRental()` only accepts exactly two digits matching a current `published` episode with a safe `issues/issue-01.html`–`issue-04.html` URL. `paintReturnVisit()` renders an explicit device-only continuation; its Continue action selects that tape rather than claiming history, ownership, progress, completion or account state. `clearLastRental()` removes only the local key, hides the panel and restores focus to Latest; a denied clear leaves the panel, failure copy and clear-control focus intact.
- Static responsive/accessibility review confirms an explicit `[hidden]` override for the continuation panel, mobile single-column rules, `min-width:0`/wrapping safeguards, native buttons and links, visible focus styling, and reduced-motion overrides.

## Why this is still HOLD

The browser-control runtime available to this independent judge returned **“No browser is available.”** There is also no locally installed Playwright/Chrome runtime available to substitute. Therefore I could not independently execute the required real-browser proof for:

1. a physical storage write → reload → validated current published episode → visible return panel → keyboard Continue/Clear cycle;
2. stale, corrupt, read-denied and clear-denied rendering at 390px and 320px;
3. real keyboard/focus behavior, overflow and image-fallback rendering at 1440px, 390px and 320px; and
4. computed reduced-motion behavior.

The maker's claimed Chromium evidence is useful input but cannot replace this independent execution. Static logic and deterministic checks do close the original **dead-write** defect at code level; they do not prove its rendered browser journey in this environment.

## Exact unblock

Run this unchanged frozen tuple in an independent environment with an actual browser, then append a new checksum-bound PASS/HOLD re-review that covers the four items above. No maker repair is indicated by this review, and no integration/public action is authorized by it.

## Preserved limits

Native Safari/VoiceOver, Brand/owner and Screening Room admission, episode-media admission and public-origin proof remain separate gates. This review neither promotes the isolated candidate nor validates the production `chick-flicks.html` or `watch.html` routes.
