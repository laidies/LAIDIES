# Grand re-opening · bounded QA packet

**Date:** 2026-07-24
**Scope:** Review-only production/QA lane. No commit, push, deployment,
publication or announcement action was taken in this lane.

## Release recommendation

**HOLD the public announcement pending owner approval and production smoke
tests.**

The repaired trailer and Episode 01/02 review masters are mechanically sound,
and the Library/Visitor Centre candidates pass responsive browser checks.
The KSVL packaging blocker found in this pass has now been repaired in the
current local release candidate: all 83 computed audio dependencies are present
and source-identical, and a real Tune In interaction played through the station
opener, DJ introduction and first song. The repaired candidate still needs a
commit-derived edge deployment. The FAiRY Godmother also cannot be tested end
to end from the Pages preview because its Worker correctly allows the
production origin but not the preview origin.

## Render manifest

| Deliverable | Mechanical evidence | Readiness |
|---|---|---|
| All-comic trailer v2 repaired review | 58 clips; 5 named replacements; 967.15 seconds; current file SHA-256 matches QC manifest; full decode recorded as passed | **REVIEW READY** — not mapped to site; Ali full-watch decision remains |
| Episode 01 v21 controlled-motion review | 71 placements; 1172.24 seconds; current file SHA-256 matches QC manifest | **OWNER REVIEW** — mixed-style continuity remains an editorial gate |
| Episode 02 v17 controlled-motion review | Current file SHA-256 matches QC manifest | **REVIEW READY** — owner watch remains |

No active `ffmpeg` render process was found at the close of this QA pass.

Files:

- `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v2-repaired-review-1920.mp4`
- `assets/video/episode-01-full-v21-controlled-motion-review.mp4`
- `assets/video/episode-02-full-v17-controlled-motion-review.mp4`
- `operations/video-qa/trailer-comic-v2-repaired-review-qc.json`
- `operations/video-qa/episode-01-full-v21-qc.json`
- `operations/video-qa/episode-02-full-v17-qc.json`

## Library and Visitor Centre

Checked at **390 × 844** and **1440 × 900**:

- No horizontal overflow.
- No broken image elements.
- Library search/results and the Visitor Centre directory are present.
- Mobile Visitor Centre correctly uses the directory selector instead of the
  tiny scene hotspots.
- Desktop hotspots are visually small (about 15 × 11 px in the inspected
  layout), but the named directory provides the reliable alternative.

Open review items:

- Ali must still rule on both rooms as designs; a mechanical pass is not design
  approval.
- Library lacks a `<main>` landmark. This is non-blocking accessibility debt,
  not a launch-day visual failure.

## Visitor-promise interaction checks

### Passed

- **Dream Phone:** keypad `101` connected to Mentor and rendered an answer.
  “Share a secret” rendered the caller-specific remix. No mobile overflow.
- **KSVL interface:** the 99.9 tuner and Tune In control are operable and the
  persistent player opens responsively.
- **Screening Room:** Episode 01/02 public narration loads; the newly wired VTT
  caption bar is visible on the public audio path at mobile width.
- **NewsStand:** WEDNESDAY and Tribune current editions render; the retired
  TODAY paper is absent; current story/source panels open.

### Blockers and required follow-up

1. **KSVL curated-build blocker — REPAIRED LOCALLY**

   The source player contains 83 audio dependencies assembled from path
   constants and filenames. All 83 exist in source; 47 are absent from the
   curated artifact. The first missing file is the station-ID opener. Its
   preview request receives the HTML fallback (`200 text/html`) rather than
   audio, producing `NotSupportedError`.

   Completed locally:

   - the builder resolves reviewed path-constant plus filename expressions;
   - the validator requires all 83 queue dependencies and matching source
     hashes;
   - the exact 1,052-file artifact contains the complete 141.99-MiB KSVL
     catalogue;
   - Tune In requested and played the station opener, DJ introduction and first
     song without an audio error.

   The exact artifact was subsequently rebuilt from pushed commit `24b4a22`,
   deployed to the launch-QA edge and retested successfully. The only remaining
   KSVL step is the same production-domain smoke test after the authorized
   switch.

2. **FAiRY Godmother production-smoke gate**

   A real preview wand request reaches the graceful “signal flickered” state
   because the Worker does not allow the Pages preview origin. CORS preflight
   confirms that `https://laidies.ai` is allowed. This is expected preview
   isolation, not evidence that production is broken.

   Required after the production domain switch and before announcement:

   - submit one non-sensitive test prompt;
   - confirm both the prompt glow-up and usable draft render;
   - confirm the request does not create an unexpected signup or metering
     failure.

## Verified preview

- Branch preview:
  `https://launch-qa-20260724.laidies-sunnyvaile.pages.dev`
- Current immutable version:
  `https://0a515dbb.laidies-sunnyvaile.pages.dev`

The preview is suitable for Ali’s Library/Visitor Centre and repaired-trailer
review. It is **not** yet suitable as evidence for the public claim that the
radio experience works end to end.
