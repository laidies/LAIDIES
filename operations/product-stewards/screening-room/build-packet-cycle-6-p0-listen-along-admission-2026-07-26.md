# Screening Room Cycle 6 P0 build packet

**Status:** SPECIFIED — build one representative title; independent acceptance
required

## Outcome

One title delivers an excellent illustrated listen-along: exact as-recorded
audio; complete synchronized captions; every visual occurrence aligned to the
spoken idea; continuous character/background/style; honest failures; exact
artifact evidence. It remains a listen-along unless separately approved as a
motion film.

## Work and owners

1. Episode Product Owner freezes narration/transcript and learning objective.
2. Audio/Caption Owner binds audio SHA, duration, VTT coverage and sync.
3. Image Director binds every occurrence to narration span plus identity,
   style and location references; replaces failed shots.
4. Motion Editor assembles only admitted assets; no unapproved camera drift.
5. Frontend/Accessibility implements retry/error/caption controls.
6. Release QA builds the exact allowlisted artifact.
7. Independent Image, Motion, Accuracy/Learning, Accessibility and Release
   judges review the actual rendered clock.
8. Ali decides final visual/media approval.

## Acceptance evidence

- complete occurrence manifest with no missing/estimated rows;
- normal-speed/full-size watch log;
- cue start, midpoint and transition screenshots bound to audio/VTT clock;
- zero wrong character, costume, setting, era, lettering or style;
- captions cover the entire spoken track and pass sampled word sync;
- audio/caption/cue/image failure and retry journeys;
- keyboard, 320/390/1280, 200%, reduced-motion, Safari/VoiceOver;
- source/artifact SHA parity and public-origin proof after authority;
- newcomer comprehension and one unfamiliar-learner transfer check.

## Packaging allowlist

- `watch.html`
- `issues/issue-trailer.html`, `issues/issue-01.html`–`issue-04.html`
- `content/episodes/episode-trailer-cues.json`,
  `episode-01-cues.json`–`episode-04-cues.json`
- `content/music/public/trailer-narration.m4a`,
  `episode-01-narration.m4a`–`episode-04-narration.m4a`
- `assets/captions/episode-trailer.vtt`,
  `episode-01.vtt`–`episode-04.vtt`
- only exact assets referenced by admitted public cue rows
- for the current Episodes 03–04 narrated fallback only:
  `assets/sunnyvaile-interiors/episode-vhs-boxes/ep-03.webp` and
  `ep-04.webp`; the derived cue JSON must be separately hashed and labelled
  rather than represented as source parity
- statically referenced shared runtime modules/assets required by `watch.html`

Explicitly deny broad `assets/episodes/**` studio/review exports, contact
sheets, superseded candidates, rejected images, raw audio and motion masters.
The source Episode 04 Ada loop is not in the current public narrated-edition
allowlist because the builder removes that binding.

## Rollback and holds

Rollback the title manifest/player copy, not unrelated episode canon. Keep the
current illustrated-listen-along fallback or hide the title if it cannot pass.
No deploy, motion-film claim, visual approval, analytics event or reward is
authorized by this packet.
