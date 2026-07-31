# LAiDIES motion ident — episode integration specification

**Candidate ID:** `LAIDIES-MOTION-IDENT-REWIND-AI-V6-2026-07-26`  
**Status:** `BUILT LOCALLY / ALI-SELECTED CANDIDATE / NOT YET INTEGRATED OR PUBLIC`  
**Recorded:** `2026-07-26T12:55:46-07:00`  
**Selection owner:** Ali  
**Integration owner:** Weekly Episodes — Engine & Production  
**Independent acceptance owner:** Episode Media Quality

## Selected bytes

The selected visual candidate is:

`operations/design-explorations/laidies-motion-ident-20260725/continuous-i-alternate-rewind-ai-v6.mp4`

SHA-256:
`713c576b2f6468fe4df962acd2c4d48163391899f99c9a2bfc187cc795ae0ed6`.

Observed media truth: 960×540, H.264, 60 fps, 310 frames,
5.1666666667 seconds, one video track and no audio track. The matching
animated WebP is SHA-256
`3348a654db859729259a79bb4ad45f045d1771179630c4dffa27c5e5a7798a76`.
The selected static fallback is
`continuous-i-alternate-rewind-ai-v6-still.png`, SHA-256
`bcc6f7dd919f9f2859cb0d0d39e7dd27cb48e0839641df6a020e79527a31362c`.

Ali's selection settles which candidate advances. It does not prove episode
placement, aspect-ratio derivatives, accessibility, mix, final-master quality,
deployment or public use.

## Placement recommendation

### Full episode

Use the full 5.1667-second silent ident once, **after the cold open has
delivered value or the episode promise**, immediately before the episode
title/recap boundary. It must not delay the first useful idea. Do not repeat
the full ident at the end of the same episode.

An optional 1.2-second rewind interstitial may use exact source frames
`10–81` only when the editorial transition is genuinely a rewind or recap.
Default is unused; maximum is one per episode. The ident is not generic
punctuation between ordinary beats.

The preferred outro is the 1.4-second AI-bubble/final-i tag from exact source
frames `226–309`, after the spoken continuation/CTA and before final black.
It may not displace or cover the CTA.

### Trailer

The trailer is queued and receives no ident integration now. At its later
58-beat reconciliation, test the full ident after the opening value beat or
the short outro tag—not both by default. Episode Media Quality decides
against the actual trailer clock.

### Short social

Never lead a short social unit with the full ident. Deliver the hook or useful
idea first. If the channel variant needs brand closure, use the 1.4-second
outro tag or the static fallback at the end. A logo view is not audience
value.

## Aspect ratios and delivery

| Variant | Output | Rule | Current state |
|---|---|---|---|
| Full episode open | 1920×1080, 60 fps, 5.1667 s | Full frames `0–309`; no crop | `SPECIFIED / NOT BUILT` |
| Rewind interstitial | 1920×1080, 60 fps, 1.2 s | Frames `10–81`; begin and end on the complete i | `SPECIFIED / NOT BUILT / DEFAULT UNUSED` |
| Outro tag | 1920×1080, 60 fps, 1.4 s | Frames `226–309`; AI bubble resolves to final i | `SPECIFIED / NOT BUILT` |
| Vertical | 1080×1920, 60 fps | Native layer recomposition; extend comic field; preserve the complete wordmark, transforming i and approved labels | `SPECIFIED / NOT BUILT` |
| Feed | 1080×1350, 60 fps | Native recomposition; no centre crop or stretched master | `SPECIFIED / NOT BUILT` |
| Square | 1080×1080, 60 fps | Native recomposition; no centre crop or stretched master | `SPECIFIED / NOT BUILT` |
| Reduced motion | Static per target ratio | No autoplay, fades, zooms or parallax | Source still built; derivatives not built |

The 960×540 selection file is reference/master-candidate evidence, not the
final 1080 delivery. Vertical, feed and square variants must be recomposed
from the source layers; cropping the landscape render would remove intentional
edge content and is not an admitted derivative.

## Audio

The selected MP4 is silent and the canonical candidate remains silent.
Episode edits must not invent an approved sonic logo or place the silent ident
over narration. A future audio-tag option requires a separate Audio-owner
composition, ownership/rights record, speech-safe mix and checksum, followed
by independent Episode Media Quality review. Until then, `audio = none`.

## Reduced motion and fallback

- Web/player: when reduced motion is requested, do not autoplay the MP4 or
  WebP. Show the checksum-bound static fallback.
- Reduced-motion episode export: replace the moving ident with a one-second
  static hold at the equivalent editorial placement.
- Failure: if the motion file is unavailable or fails decode, fall back to the
  static asset without reporting motion as available.
- The static asset must receive the same spelling, title-safe, contrast and
  aspect-ratio inspection as the moving variant.

## Episode Media Quality acceptance gate

For each derivative and each actual episode occurrence, the maker returns:

1. selected-source, builder/input, output and static-fallback paths, SHA-256
   and byte sizes;
2. exact source frame window, render invocation and deterministic output
   settings;
3. codec, dimensions, frame rate, duration, video/audio track count and full
   decode;
4. contact sheet plus normal-speed and frame-step inspection;
5. wordmark spelling, symbol clarity, title-safe, aspect-ratio and no-crop
   evidence;
6. flash-threshold, reduced-motion and missing-media fallback evidence;
7. proof that the ident follows value and does not cover narration, captions
   or continuation/CTA; and
8. the checksum of the complete integrated episode master.

Episode Media Quality independently returns `ACCEPT` or `REJECT` for the exact
derivative and the exact episode occurrence. Ali selection cannot lend its
status to a different aspect ratio, trim, soundtrack or integrated master.
Only an accepted checksum-bound master may proceed to release packaging and
later public proof.

## Current execution lock

Only Episode 02's still-only v18 repair maker is active. Motion-ident
derivative production and integration are queued for every title and must not
edit, interrupt or change that maker's clock or source set.

- Episode 02: `ACTIVE` only for its already-dispatched v18 repair; ident
  integration `QUEUED`.
- Episode 01: `QUEUED`.
- Episode 03: `QUEUED`.
- Episode 04: `QUEUED`.
- Trailer: `QUEUED`.

## Learning scan

This record reuses BTB-097/099: creative selection, recommended next work and
completed production state are stated separately, and Ali's selection is
bound to the exact adjacent candidate rather than inferred across branches.
