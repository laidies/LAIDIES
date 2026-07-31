# Screening Room construction — 2026-07-24

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
