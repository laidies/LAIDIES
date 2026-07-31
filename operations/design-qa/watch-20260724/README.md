# Screening Room QA — 2026-07-24

## Source capture

- `source-desktop.png` — inherited narrow plum screening page before changes

## Desktop construction

- `desktop-arrival-final.png` — title, programme shelf, and auditorium entry
- `desktop-screen-final.png` — current film as the primary room object
- `desktop-departures-final.png` — chapter strip and after-credits exits
- `desktop-trailer-captioned-final.png` — trailer source and caption-ready state

## Mobile construction

- `mobile-arrival-final.png`
- `mobile-screen-final.png`
- `mobile-departures-final.png`

## Required comparisons

- `before-vs-after.png`
- `style-lock-vs-implementation.png`

The approved Episode 04 Heroine image is used only as the rendering-language
comparison. The Screening Room does not generate or invent a replacement
person; the real current video frame carries the visual experience.

## Checks

- 1440 × 900 and 390 × 844
- no page-level horizontal overflow
- five current local review sources load at 1920 × 1080
- runtimes: trailer 970s, Episode 01 1182s, Episode 02 987.47s, Episode 03
  1048s, Episode 04 1222.4s
- Episode 03 mounts
  `episode-03-full-v9-controlled-motion-review.mp4`; its full decode passed,
  29/49 placements carry controlled motion, known-still controls remain below
  the motion floor, and two representative 0.35-second alpha transitions
  passed visual inspection
- Episode 04 mounts `episode-04-full-v8.mp4`; its full decode passed and all
  eleven representative rendered beats clear the known-still motion floor
- the active programme state matches the query parameter
- trailer and Episode 01–04 mount their real VTT caption track
- trailer alignment covers all 178 script units and emits 196 ordered cues
- trailer cue timing has zero overlaps, zero non-positive durations, and ends
  at 902.76s inside the 970s video runtime
- each issue exit matches the selected programme
- only expected browser diagnostic is Plausible declining localhost analytics

## Visual conclusion

The route now reads as a Screening Room: one film stage, one programme shelf,
one integrated chapter strip, and one after-credits departure rail. It no
longer reads as a header above a generic video card.
