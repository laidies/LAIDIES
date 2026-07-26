# Post Office service-truth P0 — maker evidence

**Status:** BUILT LOCALLY — submitted for independent rejudge.
**Date:** 2026-07-26
**External requests:** denied by fixture; zero completed.

## Delivered outcome

- Replaced PO-box/delivery certainty with four bounded counters.
- Added a real held account-status destination at `#signin`, with no email field and no magic-link request.
- Distinguished published episodes from newsletter delivery.
- Safely rendered archive data with DOM text nodes and a fail-closed malformed-data state.
- Reconciled the welcome tour and town directory to the same service boundary.
- Fixed postcard initialization so the visible deep-linked card and copied/shared URL cannot diverge.
- Converted the browser check from observational output to 32 deterministic assertions.

## Deterministic evidence

Source:

- `node scripts/test-post-office-local-contract.mjs` — PASS.
- `node scripts/test-post-office-browser-local.cjs` — PASS, 32 checks, 24 external attempts blocked, 0 external requests completed.
- `node scripts/check-inline-js.js` — PASS, 352 inline scripts across 132 pages.
- `node scripts/check-local-links.js` — PASS, 1,975 local references across 110 HTML files.
- `node scripts/check-town.js` — PASS.

Fresh exact artifact:

- Path: `/tmp/laidies-post-office-cycle5.do58ud`
- Builder: 1,086 files, 961.51 MiB; filesystem count 1,087 including manifest; `du` 1.1G.
- Public metadata validation — PASS.
- Post Office local contract — PASS.
- Post Office browser suite — PASS, 32 checks, 24 external attempts blocked, 0 external requests completed.
- Size is an advisory release concern, not a Post Office functional failure.

Exact source/artifact runtime parity:

| File | SHA-256 |
|---|---|
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `d8853f081a11a9df6fe7f7a49fddf30022dbced348fa399802d3f2be07186786` |
| `content/site/post-office.js` | `9a2c5bf28a1c0770175918e74048fa357755381c24b687883aa28668a98457b7` |
| `content/site/sv-welcome-tour.js` | `5d36298d6c41b0476a356da223ca43926cadec78ff2b43073b4c613053071511` |
| `content/site/sunnyvaile-directory.js` | `f96b8b7f3fcec181f7953a251888b09e87c6e7092b36b586b10fb4c2967b5151` |

## Visual evidence

- `evidence-2026-07-26/post-office-desktop.png`
- `evidence-2026-07-26/post-office-mobile.png`
- `evidence-2026-07-26/postcard-mobile.png`

Maker inspection found clear four-counter hierarchy, retained comic Post Office character, readable held-account disclosure and clean 320 px reflow. Owner visual and native assistive-technology acceptance remain independent judgments.

## Maker score

**91/100**

- Product usefulness and journey clarity: 18/20
- Truth, privacy and safety: 19/20
- Positive contribution and brand: 18/20
- UX, responsive and accessibility evidence: 18/20
- Technical and release evidence: 18/20

The score is capped because no provider identity, native assistive technology, owner visual review, public-origin verification or independent judge acceptance occurred.

## Holds and requested judgment

- Buttondown acceptance, confirmation, unsubscribe and delivery: **HELD**.
- Supabase magic-link request, callback, session, expiry and logout: **HELD**.
- Referral, recipient delivery/open/join and reward lifecycle: **UNAVAILABLE / HIDE**.
- Public release: **NOT AUTHORISED**.

Requested judge decision: accept or reject the bounded local P0 against the build-packet contract, with exact findings. Provider verification should proceed only with an approved disposable identity and explicit mutation/cleanup authority.
