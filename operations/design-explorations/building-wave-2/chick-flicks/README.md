# Chick Flicks — Wave 2 local complete-store candidate

**Status:** BUILT LOCALLY — independent product, visual, accessibility and technical review required.

This is an isolated candidate only. It does not alter `/chick-flicks.html`, `watch.html`, episode media, shared code, deployment or public state.

## What is in the candidate

- A coherent 1999 rental store where the physical New Releases wall and VHS boxes are the primary interface.
- Becky/current truth, latest released tape, honest Episode 01–04 published / Episode 05 draft handling, aisle filtering, selected-tape member/rental card, device-only favourite, validated later-visit last-rental continuation and clear/start-over, house rules, Screening Room, issue and receiving-building handoffs.
- Deterministic `?fixture=missing-index`, `?fixture=malformed-index`, `?fixture=storage-denied`, `?fixture=last-rental-valid`, `?fixture=last-rental-stale`, `?fixture=last-rental-corrupt`, `?fixture=clear-denied`, and `?fixture=browser-reload-clear` states. The final fixture performs a real same-origin storage write, reload, keyboard-focus clear action and deterministic PASS/FAIL result on `body[data-browser-reload-clear]`. Broken cover images fall back to a non-baked, labelled placeholder.

## Existing-art provenance

- Candidate store background: `assets/chick-flicks-store-text-safe-candidate-v1.png` — SHA `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3`; it removes stale/fake baked sign text and deliberately leaves the signboard for live interface text.
- Earlier room source: `assets/building-interiors/delivery-20260724-chick-flicks-v1/chick-flicks-new-releases-wall-comic-candidate-v1.png` — SHA `fbdc5f0babdd648597c189f551fbb167fff9580f724ac93ace318b38fce3bb5b`.
- Rental card: `assets/building-interiors/delivery-20260724-chick-flicks-v1/chick-flicks-rental-card-comic-candidate-v1.png` — SHA `46beb98eb8ae59a09c3ddfc1657a57e610c0f75caa481a8a940b4c400ab78b24`.
- Operable tape objects: `assets/sunnyvaile-interiors/episode-vhs-boxes/ep-01.webp` through `ep-05.webp`. Existing covers are carried as working objects only, not newly approved art.

## Local test

Run `node test-candidate.mjs` from this folder. Browser review must additionally cover 1440, 390, 320, keyboard/focus, reduced motion and each fixture state.

## Boundaries / remaining gates

Media remains title-admission controlled. This candidate never implies a motion-film edition, account, payment, ownership, debt, completion, cross-device sync or public availability beyond the validated episode index. Owner/Brand, Accessibility, Technical and Chick Flicks/Screening Room receiving reviews are still required before any integration.
