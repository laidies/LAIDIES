# Screening Room operating specification

**Status:** SPECIFIED — Cycle 6 P0 admission required; FIX BEFORE PROMOTION

## Product and format job

The Screening Room is Chick Flicks' episode playback child. It provides a
focused illustrated/narrated listen mode and routes to the full article. It
does not replace the article, class, Study Pack or quiz. It may use stills,
text cards and small approved semantic loops, but must not market those as a
motion film.

Current programme: trailer and Episodes 01–04. Episode 05 is draft and absent.
`EPISODE_FILMS` is intentionally empty. The page loads five cue sheets, five
public narration tracks and five VTT files.

## Journeys

| State | Required outcome | Current evidence |
|---|---|---|
| New visitor | Understand listen-along versus motion film, choose a title, start/pause, find captions and article. | Copy is now explicit; full comprehension study open. |
| Returning visitor | Select another programme or resume intentionally without invented account/progress state. | No persistence exists; truthful but no resume design. |
| Keyboard/mobile | Programme, play, chapter and seek controls remain operable with visible focus and no double Space activation. | Space guard repaired locally; browser/native proof open. |
| Caption failure | Narration remains operable and visible text says captions are unavailable. | Code exists; rendered failure test open. |
| Audio/cue failure | No silent “rough cut” is mistaken for the released listen-along; retry/exit remains clear. | Current fallback auto-advances estimated scenes and needs redesign/testing. |
| Completion | Offer the correct issue/next step; make no mastery/reward claim. | Article routes exist; receiving-product verification remains open. |

## Media admission

Each programme needs an immutable manifest binding:

`episode ID → as-recorded audio SHA → VTT SHA/coverage → ordered cue rows →
exact cue asset SHA → narration span → visual job → identity/style/location
references → independent verdict → owner decision`.

Admission fails if any row is missing, estimated when exact timing is claimed,
off-narration, wrong character/background/style, caption-incomplete, unsafe,
unpackaged or unapproved. Source-level replacement is insufficient; every
rendered occurrence is reviewed at the as-recorded clock.

The machine-readable authority is
`content/episodes/screening-room-admission.json` against
`screening-room-admission.schema.json`. A programme cannot become `admitted`
unless its occurrence array contains one complete, independently judged and
owner-approved record for every runtime visual occurrence. Empty evidence is
truthful only while the programme remains `hold`.

## Runtime and backend

- Frontend: `watch.html`, inline player and shared site modules.
- Data: `content/episodes/episode-*-cues.json`.
- Audio: `content/music/public/*-narration.m4a`.
- Captions: `assets/captions/episode-*.vtt`.
- Visuals: exact `cue.src` dependencies only.
- Motion films: none admitted; studio/review MP4s are denied unless a future
  title-specific manifest admits one.
- Public build transform: the current builder replaces every Episode 03–04
  source visual occurrence with the corresponding VHS cover and removes the
  Episode 04 Ada loop. This cover-only narrated fallback is a distinct derived
  programme, not source/artifact visual parity. Its transformed cue sheet and
  exact hashes must be admitted and tested as their own public manifest until
  narration-specific illustrated editions are approved.
- Derived authority:
  `content/episodes/screening-room-derived-editions.json` binds each source cue
  hash, generated cue hash, cover, removed semantics, owner and HOLD status.
  The builder fails on either hash mismatch. The visitor-facing promise says
  one static cover remains on screen.
- Backend/account/rewards: none.
- Analytics: the current `Episode watch` play event is semantically wrong for
  a listen-along and is not a completion measure. Replace only through the
  shared event/privacy contract with categorical title/format/error events;
  never transcript text, names or inferred ability.

## Accessibility and presentation

Captions remain below the illustration. Native controls need names, visible
focus, 44px targets, keyboard operation and reduced-motion support. Global
Space playback must ignore buttons, links, form fields and editable content.
Test 320/390/1280, 200% reflow, Safari/VoiceOver and caption/audio errors.
Continuous `aria-live` narration requires native screen-reader review before
approval because it may become excessively verbose.

The seek rail uses slider semantics, visible focus and Arrow/Home/End keyboard
operation. Cue, caption, audio, play-rejection and visual failures pause the
player, disable transport, state the failed component and provide one reload
retry. Public playback never falls into a silent simulated rough cut.

## Upkeep and acceptance

Run on any audio, VTT, cue, illustration, episode-status, player or public-copy
change. P0 is the title-level admission manifest and complete rendered
verification for the listen-along actually shipped. Motion production is a
separate later gate. Public verification, analytics baselines and owner visual
approval remain mandatory holds.
