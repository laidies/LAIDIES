# Chick Flicks Wave 2 complete-store candidate — independent review

**Verdict:** **HOLD — one device-return contract repair required.**

**Scope:** isolated candidate only. This review does not alter or approve
`/chick-flicks.html`, `watch.html`, episode media, shared code, deployment or
public state.

## Frozen input

| Input | SHA-256 |
| --- | --- |
| Maker evidence | `48b190f1040fa1454f638108398064df401535f0ac47d5b80b9d75cb7c33b1c1` |
| Candidate HTML | `bd52de09d0a98fd355b7eb5dfc88504ec31b29b520862035a6299712cfb1d70e` |
| Candidate CSS | `b5eb5a9cd21b7397c56bf622fcc1d177dae025d6c5c13f56b5ec595d4611971e` |
| Candidate controller | `6a5f1b6ca9d2f712f18a138b4aa4799f32604010bb0d0fa220d13f5510632283` |
| Candidate deterministic test | `57ea03bd93765f918cc66410cd9551afcc6d9e71aab5a866ead452b036c6aa70` |
| Text-safe store art | `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3` |

## Passed independently

- `node test-candidate.mjs` reran **PASS**.
- Headless Chromium rendered the exact local candidate at **1440×900,
  390×844 and 320×844**: five tapes rendered; four rentable and one clear
  forthcoming tape; no horizontal overflow at any tested width.
- First-tape keyboard activation focused the rental card and exposed the exact
  issue handoff. A released selection offers favourite and handoff; Episode 05
  says it is forthcoming and exposes neither action nor a fake due date.
- All eight aisle controls were exercised. `all`, prompting, style, everyday,
  ethics and history filter the wall as expected. A valid synthetic unmapped
  draft row remains visible under **Unfiled**, rather than disappearing.
- Missing and malformed index fixtures close the wall, name the problem and
  expose Retry. Denied storage names the inability to save a device-only
  favourite. A deliberately aborted cover request becomes a labelled `EP 01`
  fallback rather than a broken image. Reduced-motion computed transition is
  `0.00001s` and scroll behavior is `auto`.
- Screening Room, trailer issue, Study Pack, quiz and Post Office links are
  explicit local handoffs. The candidate makes no account, payment, ownership,
  debt, completion, cross-device or motion-film claim.
- Full-size inspection of the new store art found a coherent store interior,
  no stale or pseudo-readable sign text, no broken anatomy, and deliberately
  empty signboard space. The operable title, availability, tape state and
  controls are live HTML overlays rather than baked into the art.

## HOLD: last-rental return is a dead write

The exact controller writes `laidies_cf_last_rental` when a visitor takes a
released tape home, but it never reads that key after initialization. A browser
test pre-seeded a valid `04` record and reloaded the exact candidate: current
truth remained the generic latest-release message, device status mentioned only
the favourite, and the rendered page contained no last-rental/continue record.

This fails the recovered Chick Flicks contract: a returning visitor with a
valid device-local last-rental record must be able to continue that exact valid
programme or choose another tape without an account or cross-device claim.
The candidate correctly stores a value, but there is no visible return journey.

### Exact successor requirement

In the candidate only, read and validate the local last-rental value during
initialization. For only a valid, still-released `01`–`04` tape with its safe
issue destination, show an explicit **on this device** continuation at Becky
or the rental card; it must open that exact issue and provide Start over/clear.
Missing, corrupt, stale, held or denied values must fall back to normal store
truth without inference. Re-run the same responsive, keyboard, storage-denied
and malformed-index cases, then return a checksum-bound successor for a fresh
independent review.

## Limits preserved

Native Safari/VoiceOver and public-origin evidence are not supplied by this
isolated candidate and remain separate gates. This verdict does not decide
media admission or validate any title as a motion film.

## Learning

Persisting a device-local record is not a return experience. The independent
scene must seed and reload every advertised local record, then require a
visible continuation or truthful degradation before accepting the journey.
