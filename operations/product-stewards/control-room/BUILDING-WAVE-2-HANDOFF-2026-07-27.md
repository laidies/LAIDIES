# Building Wave 2 handoff — 2026-07-27

**Evidence cutoff:** 2026-07-27 03:40 PDT  
**Status:** `VERIFIED LOCALLY — THREE ISOLATED COMPLETE-BUILDING CANDIDATES; INTEGRATION/PUBLIC GATES REMAIN`

## Visible result

Wave 2 now has three independently reviewed, browser-usable local building
experiences. They are candidates beside the production routes; none was
integrated, deployed or represented as public.

### SUNNYVAiLE High

Candidate:
`operations/design-explorations/building-wave-2/sunnyvaile-high/index.html`

The corridor is the interface: eight named rooms expose only their own
available work and handoffs, Room 101 is the first action, closed rooms stay out
of the keyboard path, and closing a room returns focus to its door. The
candidate includes class discovery, Pop Quiz, Report Card/yearbook, the
101 shelf, Book Fair and explicit truthful boundaries.

Independent successor ACCEPT:
`operations/product-stewards/sunnyvaile-high/independent-rejudge-building-wave-2-candidate-successor-2026-07-27.md`
SHA-256 `4c76268da5d1275a70b3cfbd0f7baa063d40ed3f843935c2de692ff489647fd5`.

Verified tuple:

- HTML `166b05d5…3a60`
- CSS `79eb6350…a7dd5`
- controller `2c0cceb0…7cd9d`
- test `f5a37705…02e7e`

The original browser HOLD exposed a real CSS defect: the authored grid display
overrode the user-agent `[hidden]` rule and leaked every room. The successor
adds the explicit hidden-state rule and a complete focus-return test. Current
tests pass at 1440/390/320.

### NewsStand

Candidate:
`operations/design-explorations/building-wave-2/newsstand/index.html`

The newsstand room now makes the five-paper desk, source/read/listen states,
archive search, radio and correction/retraction boundaries usable as one
building experience. Global desk HOLD/load failure controls every paper label;
direct missing, malformed and retracted hashes focus the reader title; artwork
failure produces a complete local room fallback; no-JavaScript leaves no
enabled dead control.

Independent successor ACCEPT:
`operations/product-stewards/newsstand/independent-wave-2-building-candidate-successor-rejudge-2026-07-27.md`
SHA-256 `2c31d788c83510b0653888686711c4539104d6f280d9ecec8925d2e4bb3a5480`.

Verified tuple:

- HTML `e620b87a…cb04e`
- CSS `ad412fdf…ec3e`
- controller `c3cafb70…23a5`
- static test `1cd2c5d6…f367`
- browser test `7235d5bb…f74f`

Independent and root reruns pass 20 static and 34 real-browser checks across
1440/390/320, keyboard, radio, search, hold/malformed/retracted/missing,
image-failure, no-JavaScript and reduced-motion fixtures.

### Chick Flicks

Candidate:
`operations/design-explorations/building-wave-2/chick-flicks/index.html`

The video store exposes four released tapes, one honest forthcoming tape, eight
aisles, a rental-card interaction, first-visit Trailer handoff, Study Pack,
quiz and Post Office handoffs, and an exact device-only last-rental return
journey. Its new text-safe store art removes stale baked signage and
pseudo-readable tape/poster lettering while keeping live title, state and
controls in HTML.

New artwork:
`operations/design-explorations/building-wave-2/chick-flicks/assets/chick-flicks-store-text-safe-candidate-v1.png`
SHA-256 `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3`;
1672×941.

The first independent review passed the full store except that its local
last-rental value was a dead write. The exact successor validates the value
against the current published index, renders an explicit on-device
continuation, and provides truthful continue/clear and failure behavior.

Maker successor evidence:
`operations/product-stewards/chick-flicks/evidence/building-wave-2-complete-store-candidate-return-successor-maker-2026-07-27.md`
SHA-256 `14622a0bfbd6dc983fa78e7494b70b7d48537ae060046ce26646cf92a418f113`.

Independent browser closure ACCEPT:
`operations/product-stewards/chick-flicks/evidence/independent-browser-closure-wave-2-complete-store-return-successor-2026-07-27.md`
SHA-256 `71d9c61c265aa19bd3dcc90df94cd280b491d32aef559cdf45547f65723aaf6b`.

Verified tuple:

- HTML `663bf315…b1db`
- CSS `102bdf2f…3626`
- controller `b9476ad7…4896`
- test `9cdee52d…87f6`

The real browser closure exercised physical take-home → return/reload →
device-only continuation → Continue/Clear, exact focus restoration, stale,
corrupt, read-denied and clear-denied fixtures, artwork loading and exact
viewport containment at 1440/390/320.

## Episode priority gate completed before this handoff

No additional card/art batch was started before the queued media gates ran.

- Episode 01 v26 fresh independent EMQ:
  `operations/product-stewards/episode-media-quality/evidence-2026-07-27/emq-e01-v26-fresh-independent-judge-2026-07-27.md`,
  SHA-256 `e6efc40e01016e31fc57f80402347f908e3a9e39f6af622a3dfdabb8906995ac`.
- Episode 03 v13 fresh independent EMQ:
  `operations/product-stewards/episode-media-quality/evidence-2026-07-27/emq-e03-v13-fresh-independent-judge-2026-07-27.md`,
  SHA-256 `2b207ed5293a632fc8dd5583bff9b2576770d60609f1f246ff9926f0e6b69c67`.

Both exact review masters pass their current full-title technical, visual,
narration-to-image, caption and representative-player gates. Each remains
release-HOLD only for an identified human full-title 1× unmuted audible watch.
Automation did not infer that witness.

## Exact remaining gates

1. Named owners compare each candidate to its production route and open one
   clean, building-specific integration lock at a time.
2. Native Safari/VoiceOver and human product/Brand review remain separate for
   the three buildings.
3. Canonical NewsStand editorial/correction writers and Chick Flicks Screening
   Room media admission remain outside these local candidates.
4. Production routes require exact successor hashes, rollback and public-origin
   verification before any completion claim.
5. Episode 01–03 human audible watches and the Trailer outfit ruling/human watch
   remain genuine owner/human gates.

## Authority truth

No production route, shared system, public episode, deployment, publication,
account/economy, provider or spend state was changed. These are bounded local
building candidates and independent evidence only.

## Learning scan

- BTB-199 records the Chick Flicks prevention rule: a local write is not a
  returning-user feature until the entire write/reload/validate/render/clear
  journey is browser-tested.
- The High and NewsStand holds reuse the existing rules that hidden interactive
  layers and failure/no-JavaScript states must be tested as complete rendered
  journeys, not inferred from markup.
