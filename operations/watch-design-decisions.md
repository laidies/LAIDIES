# Screening Room construction — 2026-07-24

## The VHS artwork, not the clamshell, is the Watch pre-play poster — 2026-09-04

The selected tape keeps one artwork identity from the Chick Flicks shelf through
the rental-counter modal, Listen and Watch, but the object adapts to its context.
The physical store shelf and arrival show the full portrait clamshell. Both
Listen and Watch players show the exact widescreen title-card art from which that
sleeve was made: Episodes 01–03 use their `*-title-card-comic-v2.png` sources and
Episode 04 uses Ali's selected `ep04-title-card-comic-v3-laidies-colour.png`.
Placing a portrait clamshell inside either 16:9 player is rejected.
Ali approved this rendered widescreen Watch treatment on 2026-09-04.

This is a packaging-continuity decision, not a media-source change. The admitted
poster remains source-integrity evidence, Media Session artwork and a fallback
input when no episode cover exists. Film URL, captions, playback, resume,
post-play state and Watch/Listen navigation remain unchanged.

## Listen transport and caption spacing remain readable — 2026-09-04

The labelled `Play audio` transport may not inherit the old 52px circular icon
button width. It uses content width, a 52px minimum height, a one-line label and
the current yellow/pink/mint control treatment. The announcer/caption surface
requires horizontal inner padding in both its desktop two-column and phone
one-column arrangements; labels or narration may not sit against a panel edge.
Ali directly rejected the collapsed button and edge-hugging caption treatment.

## Watch uses a bright LAiDIES shell around one dark film window — 2026-09-04

This decision supersedes the older visual-language bullets below that made the
whole auditorium near-black and white the dominant reading colour. The Watch
edition consumes the current shared LAiDIES visual system used by the Homepage,
LIBRAiRY, Chick Flicks and Listen: comic-textured pink-purple-cyan fields, dark
ink, bright yellow/mint/cyan/coral controls, heavy keylines and offset colour
edges. White or cream type is exceptional, not routine.

Only the real 16:9 film window may use a black interior. The page around it —
arrival, format switcher, programme shelf, marquee, captions, resume/recovery,
chapters and Special features — remains bright and uses dark ink. A caption bar
must stay hidden when no real cue text is active; an empty reserved box is not a
valid layout-stability treatment. This is a visual-shell decision only: the
registry-bound film/poster/captions, Watch/Listen state, resume behavior,
episode routes and in-progress truth remain unchanged.

## Return control remains distinct from illustrated fields — 2026-09-04

Ali directly rejected the low-contrast return link in the Episode 04 Listen
masthead. A Screening Room return route may not rely on dark text alone over a
busy comic background. It remains a compact secondary action, but requires a
44px minimum target, a solid current-palette surface, deep-ink type and border,
and visible hover and keyboard-focus states. It must not introduce a generic
white card or compete with the primary Listen or Watch action.

## Current episode videos may be public while improvement continues — 2026-08-28

Ali's direct ruling is that having the newest existing Episode 01–04 videos
available is better than showing no video while animation and continuity work
continues. This does not admit those videos as final-quality masters.

- `admissionStatus` remains the quality/admission truth and stays `hold` until
  its existing review requirements pass.
- `publicPlaybackStatus: available-in-progress` is the separate visitor-access
  truth for Episodes 01–04. It requires a checksum-bound HTTPS film, duration,
  poster and complete captions.
- The Watch UI must say that the current video is available and improvements
  are ongoing. It must not expose internal gate language or call the video
  final, complete, accepted or admitted.
- Chick Flicks exposes direct Read, Listen and Watch routes for every published
  episode.
- The Trailer is outside this ruling and remains unavailable until a separate
  exact decision or valid release state permits it.
- The original local masters remain immutable. A necessary web-delivery encode
  is recorded as a derivative with its own checksum and must preserve the
  source edition's full content and timing.

## Source truth

`watch.html` already had a working full-film player, cue-sheet fallback,
read-along captions, chapter controls, and Episode 01/02/04 routes. The visible
page was a narrow plum header over a gold-framed video. Its Episode 01 title
clipped outside the desktop viewport, the five programme choices were absent,
and Episode 03 and the trailer did not use their existing current local cuts.

The authoritative local picture sources remain the ones named by
`operations/video-release-board-20260723.md`. They are review sources, not
final masters:

- trailer: `episode-trailer-narration-motion-v16-wardrobe-locked-review.mp4`
- Episode 01: `episode-01-narration-motion-v20-title-card-review.mp4`
- Episode 02: `episode-02-narration-motion-v16-card-fixes.mp4`
- Episode 03: `episode-03-full-v9-controlled-motion-review.mp4`
- Episode 04: `episode-04-full-v8.mp4`

## Construction

- The route is now one Screening Room rather than a generic page containing a
  video card.
- The current film is the primary visual object.
- A single ruled programme shelf selects the trailer or Episodes 01–04 and
  marks the current tape.
- The auditorium places the current review state, film, read-along captions,
  and chapters in one continuous stage.
- One departure rail contains the real Chick Flicks, issue, and Handbook
  routes after the credits.
- No new people, room illustration, fake tape artwork, CSS illustration, or
  placeholder asset was added.

## Visual language

- near-black-blue auditorium rather than plum;
- Anton comic-display title with vivid `Ai` accent and lowercase `i`;
- white is the dominant reading colour;
- pink, cobalt, cyan, purple, and coral are controlled accents rather than the
  whole page field;
- square ruled rails and open bands replace rounded cards and pill controls;
- the existing comic-film frame provides the episode imagery.

## Release truth

The player labels every source as a **review cut**. This construction does not
claim that motion, captions, hosting, or final continuity are complete.

- The trailer and Episode 01–04 have local VTT read-along captions.
- Final external hosting remains unresolved; this local construction does not
  deploy or publish the large local MP4s.

## Responsive and functional result

- 1440 × 900 and 390 × 844 pass without page-level horizontal overflow.
- The programme shelf intentionally scrolls inside its own mobile rail.
- All five programme choices load the correct current local source.
- All five report 1920 × 1080 video metadata after load.
- Runtimes verified in-browser: trailer 16:10, Episode 01 19:42, Episode 02
  16:27, Episode 03 17:28, Episode 04 20:22.4.

Episode 04 was promoted from v7 to the existing v8 controlled-motion assembly
on 2026-07-24. Its source report verifies a full decode, 1920 × 1080 H.264/AAC,
55 placements, 25 loop placements, 18 event placements, and 12 intentional
still/title/reading-card placements. Measured motion clears the known-still
noise floor at all eleven representative rendered beats.

Episode 03 was promoted from v8 to the v9 controlled-motion review assembly on
2026-07-24. It preserves the authoritative 49-cue content and timing while
adding restrained 1.6% centred camera motion to selected scenic/concept
frames, retaining the existing ambient loops and transformation event, and
using 0.35-second alpha transitions. Full decode passed; 29/49 placements carry
controlled motion, covering 58.3% of runtime. Known-still controls remain below
the measured motion floor and two representative transitions passed visual
inspection.
- The trailer and Episode 01–04 each mount one caption track.
- Issue links update to the selected programme.
- Browser diagnostics show only Plausible's expected localhost warning.
