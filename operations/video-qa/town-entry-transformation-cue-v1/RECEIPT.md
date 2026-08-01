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
- Builder:
  `scripts/build-sunnyvaile-town-entry-cue-v1.py`
  SHA-256 `5ae556f4923b3c7ae1b959a3229519849e514c44a48e783b8b3288d841b05d98`
- Binding manifest:
  `episode-transformation-bindings.json`
  SHA-256 `fd60ad0f0bfce1674c1f439b8517e1088c459a2ba6dbc5a54d8bb19867b8e974`

## Opening-day occurrence disposition

- **Episode 01:** approved transformation frame set recovered; rebuild and
  independent context review required before cue attachment can pass.
- **Episode 02:** approved transformation frame set recovered; rebuild and
  independent context review required before cue attachment can pass.
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
