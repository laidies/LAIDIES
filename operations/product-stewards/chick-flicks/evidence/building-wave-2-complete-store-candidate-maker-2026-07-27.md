# Chick Flicks Wave 2 complete-store candidate — maker evidence

**Status:** BUILT LOCALLY — candidate-only; independent review required.

## Literal output

An isolated room-first store candidate now exists at
`operations/design-explorations/building-wave-2/chick-flicks/`:

| File | SHA-256 |
| --- | --- |
| `index.html` | `bd52de09d0a98fd355b7eb5dfc88504ec31b29b520862035a6299712cfb1d70e` |
| `chick-flicks-candidate.css` | `b5eb5a9cd21b7397c56bf622fcc1d177dae025d6c5c13f56b5ec595d4611971e` |
| `chick-flicks-candidate.js` | `6a5f1b6ca9d2f712f18a138b4aa4799f32604010bb0d0fa220d13f5510632283` |
| `test-candidate.mjs` | `57ea03bd93765f918cc66410cd9551afcc6d9e71aab5a866ead452b036c6aa70` |
| candidate README | `9356cb0e911cba5043248e30b25ef7db51a19d5d561e2ea04937de0d7a76f3b8` |

The candidate makes the rental store itself the interface: Becky/current truth,
the live New Releases VHS wall, aisle filtering, selected-tape rental-card
object, device-only favourite/last-rental boundaries, house rules, Screening
Room entrance and exact issue/receiving-building handoffs.

It preserves the current public text and the current index contract: Episodes
01–04 publishable/rentable only when their safe issue route validates; Episode
05 remains `draft`/forthcoming. It makes no payment, account, completion,
ownership, debt, due-date, cross-device, or motion-film claim.

## Art provenance

The candidate uses the supplied text-safe room environment:
`operations/design-explorations/building-wave-2/chick-flicks/assets/chick-flicks-store-text-safe-candidate-v1.png`,
SHA-256 `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3`.
Functional signage is live HTML. The rental-card asset and working VHS covers
are existing workspace sources named in the candidate README; no art was
generated or overwritten in this lane.

## Checks performed

- `node --check chick-flicks-candidate.js` — PASS.
- `node test-candidate.mjs` — PASS: room, wall, eight aisles, published/draft
  state, missing/malformed index fixture, denied storage fixture, broken-cover
  fallback, mobile rule and reduced-motion rule.
- Local Chrome screenshot inspection at 1440×900, 390×844 and 320×844 — room,
  live tape objects and mobile two-column tape wall render without a generic
  catalogue shell. The 390 check exposed a current-truth text clipping risk;
  candidate CSS was corrected with narrow-layout wrapping before this record.

## Deterministic failure fixtures

`?fixture=missing-index`, `?fixture=malformed-index`, and
`?fixture=storage-denied` are intentionally supported. A broken cover uses a
labelled client-side fallback; invalid/missing index records never create a
rentable tape.

## Remaining gates

Independent Chick Flicks product/experience, Brand, accessibility/native
assistive technology and technical browser reviews remain. Screening Room
admission, episode-media approval, public-origin verification and integration
are explicitly out of scope. No production `chick-flicks.html`, `watch.html`,
shared file, episode media, deployment or public route was changed.

## Learning scan

The first Chrome screenshot captured the loading state because the script had a
syntax error, not a network defect. Prevention: run `node --check` before any
visual/render evidence and do not treat a screenshot of a pending controller
as an interactive result.
