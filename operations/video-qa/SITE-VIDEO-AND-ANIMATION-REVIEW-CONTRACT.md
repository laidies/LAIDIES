# LAiDIES site video and animation review contract

**Status:** ACTIVE — fail closed
**Effective:** 2026-07-31
**Owner:** Episode Media Quality, with the owner of the publishing surface
**Machine registry:** `operations/video-qa/site-video-review-registry-2026-07-31.json`
**Occurrence schema:** `operations/video-qa/site-video-occurrence.schema.json`
**Checker:** `node scripts/check-site-video-review.mjs`
**Sitewide inventory builder:** `node scripts/build-sitewide-motion-inventory.mjs`
**Sitewide inventory freshness check:** `node scripts/build-sitewide-motion-inventory.mjs --check`

## The rule

Every moving image that can appear on a LAiDIES visitor surface must be admitted
here before release. This is not limited to episodes. It covers:

- the Trailer and every episode;
- class lessons, demonstrations, labs and course walkthroughs;
- explainers, practical-tool demonstrations and onboarding films;
- music videos, visualizers and song-player motion;
- Homepage, building-page and campaign films;
- promos, teasers and social embeds shown on the site;
- logo idents, GIFs, WebM clips, Lottie/Rive motion and CSS-driven instructional animation;
- ambient loops and silent animation used inside any of those experiences.

The deterministic sitewide inventory must be rebuilt whenever visitor routes,
page dependencies, media bindings, CSS keyframes or JavaScript motion change.
Literal video bindings, runtime-created video players, CSS keyframes, Web
Animations API calls, animation-frame loops and timed media swaps all remain
`HOLD` until classified. A motion file sitting in storage is not live merely
because it exists; a visitor page or runtime binding is the evidence that puts
it inside the release gate.

The review unit is **each occurrence on the final timeline or interface**, not
merely each source file. Reusing one clip five times creates five review
occurrences because its meaning, timing and neighbours can be different each
time.

## What the reviewer must record for every occurrence

1. Content id, content type, route/surface and placement id.
2. Exact parent master path, version and SHA-256. Narrated work also binds the
   transcript/caption path and SHA-256.
3. Start time, end time and duration, or the exact interface state/trigger for
   non-linear motion.
4. The exact narration excerpt spoken during the occurrence. For silent media,
   record the lesson, interface action or visitor purpose the motion is meant
   to support.
5. Exact source asset path and SHA-256, plus its honest source type:
   `still`, `camera_move_on_still`, `ambient_loop`, `semantic_animation`,
   `demonstration`, `live_action`, or `decorative_motion`.
6. **Visual description:** describe what is actually visible and what actually
   moves after watching it at normal speed. Never infer this from a filename,
   prompt, storyboard or motion score.
7. Intended visual/motion job and observed visual/motion result.
8. One relevance disposition:
   - `PASS` — the occurrence clearly supports, explains or demonstrates the
     current words or purpose;
   - `CLOSE_ENOUGH` — a deliberate, non-conflicting bridge and the best useful
     choice available; this requires an independent written rationale;
   - `RETIME` — the asset is right but appears over the wrong words or for the
     wrong duration;
   - `REPLACE` — the asset is irrelevant, misleading, contradictory, factually
     wrong, visually broken or violates identity/style continuity;
   - `ADD_OR_REPAIR_ANIMATION` — promised or necessary motion is missing,
     imperceptible, repetitive, broken or semantically wrong.
9. Separate PASS/FAIL/HOLD verdicts for continuity and identity, unintended
   occlusion/disappearance/flicker, and motion semantics.
10. Exact repair action: corrected times for `RETIME`, or an asset/animation
    brief detailed enough to build for `REPLACE` or
    `ADD_OR_REPAIR_ANIMATION`.
11. Reviewer identity, review time and confirmation that the occurrence was
    watched in the final player at normal speed, with sound when sound exists.

## Non-negotiable interpretation rules

- A zoom, pan, crop change or sequence of differently zoomed stills is not
  animation.
- Pixel movement, SSIM, motion heatmaps, decoded frames and file duration can
  prove that a file moves or plays. They cannot prove that the motion is good,
  visible, intentional or relevant to the words.
- Environmental motion such as rain, traffic, steam or a moving screen must be
  visibly present at normal playback speed when the scene or brief calls for
  it. A still frame of rain does not pass a rain-animation requirement.
- A prop, person or creature disappearing behind the wrong layer, flickering,
  clipping through a body, changing identity or breaking anatomy is a FAIL,
  even when the rest of the shot is attractive.
- Decorative motion cannot pass an instructional or narrative motion gate.
- Silent class demonstrations and interface animations are judged against the
  action or learning purpose they must clarify. They do not escape review
  because there is no narration.
- Ambient loops must be intentional, perceptible and continuous at the loop
  seam. Repetition that distracts from or contradicts the lesson is a FAIL.
- `CLOSE_ENOUGH` is not a convenience pass. It must be non-misleading, useful
  and independently justified.
- Every occurrence must be resolved before a master or interactive motion
  experience can be admitted. Sampling cannot produce a whole-title PASS.
- A new master, changed timing, replaced source asset, revised narration or
  changed player crop invalidates every affected occurrence row and every
  derivative publication until rechecked.
- Recurring episode opening/closing visuals remain dependency-held until exact
  character, building/location and visual-system checksum allowlists are final.
  Existing or high-numbered credit renders have no release priority. The
  binding requirements live in
  `operations/product-stewards/episode-media-quality/EPISODE-OPENING-AND-CLOSING-CREDITS-CONTRACT-2026-07-31.md`.

## Required programme/surface gates

The occurrence audit sits inside—not in place of—the full release gate:

1. exact checksum-bound master and source lineage;
2. decode, duration and audio clock;
3. complete captions/transcript when speech exists;
4. factual and content accuracy;
5. complete narration-or-purpose relevance audit;
6. complete continuity, identity, occlusion and motion-semantics audit;
7. identified human full normal-speed watch/use-through;
8. real desktop and mobile player/interface proof, including crop and controls;
9. accessibility and reduced-motion behaviour where applicable;
10. exact public identity, discovery and correction propagation.

No local export, successful upload, playable file, sampled judge, source-file
count or visually pleasing still can substitute for another gate.

## Release and correction behaviour

- Registry status is `HOLD` or `FAIL` until every required field and verdict is
  resolved. Unknown remains unknown.
- Visitor-facing code may bind only an exact registry item with
  `admission_status: PASS`.
- Dynamic surfaces such as the Screening Room and class player must fail
  closed when an unadmitted media path is supplied.
- When a released video or animation changes, the new hash must replace the old
  identity everywhere it appears: website players, downloads, feeds, podcast
  and YouTube packages, covers/metadata and related discovery surfaces.
- The old identity remains in the durable release history but must not be
  described as current after a corrected successor is publicly verified.
