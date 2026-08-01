# SUNNYVAiLE recurring town-entry cue — build and gate receipt

**Evidence date:** 2026-08-01 America/Vancouver

**Owner:** Episode Media Quality

**Status:** BUILT / TECHNICAL PASS / INDEPENDENT REVIEW HOLD

**Public status:** NOT PUBLISHED; no visitor binding changed

## Story decision

The recurring transformation needs a visible story cue because the current
episode narration does not consistently announce that the heroine is crossing
into SUNNYVAiLE. The shared silent cue is:

1. `NOW ENTERING SUNNYVAiLE`
2. `REWIND ERA GLOW-UP: DIALING UP...`

It uses the already-established `SUNNYVAiLE OS // v99.9` dial-up/CRT language.
A short signal-lock line expands into the terminal cue; the cue then collapses
and is fully clear before the episode-specific finished look is held.

## Exact build

- Alpha cue master:
  `sunnyvaile-town-entry-cue-overlay-v1.mov`
  SHA-256 `35a4215b03972ac695f78cbaa28818ee98b5b1f5f8544115d7ed0acdcf2e5c72`
- Episode 03 exact-source review composite:
  `episode-03-town-entry-cue-review-v1.mp4`
  SHA-256 `a0bec3388e19474485561fa797904d9391f4557964b1f21854a1deb242ff7db9`
- Contact evidence:
  `episode-03-town-entry-cue-contact-v1.png`
  SHA-256 `aff7e4b9a08803eb159e9e64608a0a114577491366b02d2092ad98228cf51854`
- Episode 02 transformation-only review sequence:
  `episode-02-town-entry-sequence-v1.mp4`
  SHA-256 `16ec53563abe4f8acfc9a0068051d469231015ff041da352dcd6d4b8160935b8`
- Episode 02 bounded narration-context review:
  `episode-02-town-entry-context-review-v1.mp4`
  SHA-256 `03999262c02c06c98ab8a36412486852b115762130cd8ae1f9c0423e895364ca`
- Episode 02 context contact evidence:
  `episode-02-town-entry-context-contact-v1.png`
  SHA-256 `e2c0acd78addfeb93aab43c2071cf63b4648406e0be359b800eb26e5a7b9a77f`
- Episode 02 review builder:
  `scripts/build-episode-02-town-entry-review-v1.py`
  SHA-256 `6e58f8995db716b6144172311562c61e321b159587c11b11d464b6ef79530589`
- Builder:
  `scripts/build-sunnyvaile-town-entry-cue-v1.py`
  SHA-256 `5ae556f4923b3c7ae1b959a3229519849e514c44a48e783b8b3288d841b05d98`
- Binding manifest:
  `episode-transformation-bindings.json`
  SHA-256 `56274a5862b363c11218b5c3c84a20dae9b6f38d98352141b263b9f8b73b4153`

## Opening-day occurrence disposition

- **Episode 01:** the recovered wand/Fairy Godmother frames are explicitly
  rejected. They predate and contradict the current no-wand,
  no-Fairy-Godmother shared transformation specification. A new five-frame
  batch is required; recovered bytes do not imply current creative approval.
- **Episode 02:** the five exact no-wand frames are now assembled into a
  narration-bound review cut. The repair begins at `122.77s` on “So I did what
  I do…” and ends at `129.09s` on “…town.” The `117.00–134.95s` context keeps
  the original narration continuous, clears the cue before the final look,
  leaves the character’s face unobstructed and returns to Blend & Snap before
  “Corner table…”. Technical validation passes; independent normal-speed
  review remains HOLD.
- **Episode 03:** exact one-shot source is composed with the cue and is ready
  for independent normal-speed review. It remains HOLD.
- **Episode 04:** current p14 costume change remains rejected because it is
  shown during AI-origins/LUMINAiRY narration. A new narration-compatible
  transformation must be built before this cue can be attached.
- **Trailer B39:** explicitly excluded. It is the separate Makeover on Main
  resident-card glow-up and retains its own repair lane.

## Machine enforcement

- `node scripts/check-town-entry-transformation-cue.mjs` — PASS
- `node scripts/test-town-entry-transformation-cue.mjs` — PASS; proves the
  rejected Episode 04 source fails `MISLEADING_SOURCE` even if the cue is
  attached.
- `python3 scripts/validate-sunnyvaile-town-entry-cue-v1.py` — PASS; proves the
  silent 1920×1080 alpha master, visible safe-region cue and clean clearance.
- `node scripts/check-site-video-review.mjs` — PASS for registry integrity;
  overall admission correctly remains HOLD.

## Release boundary

This build does not change narration and does not admit any episode master.
Every use remains occurrence-specific and requires a final-player normal-speed
review with narration. No deploy, publication, feed, video-platform or public
player mutation is authorized or performed by this receipt.
