# Screening Room Cycle 6 deep dive

**Date:** 2026-07-26  
**Verdict:** **FAIL / HOLD — 70/100; runtime exists, title-level media
admission does not**

## Evidence-based gap analysis

The Screening Room is a real runtime, not a mockup: `watch.html` resolves five
cue sheets, narration files and VTT masters; the cue validator finds every
referenced asset; `EPISODE_FILMS` is empty; and the article handoffs exist.
That proves connection, not quality.

The current visual evidence is below the LAiDIES bar:

- Trailer, Episodes 02 and 03 explicitly call their cue times proportional or
  estimated. Episode 01 was proportionally rebased and still lacks a complete
  occurrence-level audiovisual clearance.
- Trailer VTT ends at 15:02.760 while its final visual cue begins at 16:00.
- Episode 02's final visual begins roughly 76.7 seconds before its captioned
  narration ends.
- Independent extracted-frame review found recurrent painterly/comic style
  drift in Episodes 01–02.
- Episodes 03–04 have encouraging limited picture samples, but not complete
  identity, era, motion, audio or caption approval.
- The exact public builder rewrites Episodes 03–04: every cue visual becomes
  the same episode VHS cover and Episode 04's Ada loop is removed. This is a
  safer narrated-edition fallback than shipping unapproved art, but it is not
  source/artifact visual parity or a narration-specific illustrated edition.
- Every title verdict remains HOLD. No local motion master is public-film
  authority.

The player clearly distinguishes listen-along from motion film after the
bounded copy repair. It also avoids global Space interception on interactive
controls. Remaining player gaps include the misleading silent rough-cut audio
fallback, no recorded retry journey, unreviewed continuous `aria-live`
captions, no native browser/assistive-tech proof and an `Episode watch` event
that does not describe the public format.

## Scored rubric

| Dimension | Score | Floor | Judgment |
|---|---:|---:|---|
| Product quality/value | 15/20 | 17 | Clear comfortable format, but timing gaps and repeated-cover fallbacks do not consistently deliver the promise. |
| Accuracy/safety/trust | 14/20 | 17 | Motion-film truth is strong; caption/timing and source/artifact visual claims exceed title-level evidence. |
| LAiDIES brand contribution | 13/20 | 17 | Screening Room grammar is distinctive; Episodes 01–02 drift across styles and Episodes 03–04 lose their visual storytelling in the artifact. |
| UX/accessibility | 14/20 | 17 | Below-picture captions and keyboard structure are promising; coverage, failures and native evidence remain open. |
| Technical/data integrity | 14/20 | 17 | Runtime assets resolve and film bindings are empty, but the builder silently changes two cue programmes without a title-level derived-manifest contract. |
| **Total** | **70/100** |  | **FAIL / HOLD** |

## New and returning users

A newcomer can choose one of five programmes and sees explicit listen-along
copy, but is not told which title is the strongest approved starting
experience because none is admitted. A returning user gets no resume/history
state; that is honest, but the product has no return affordance beyond choosing
again. Neither state needs an account or reward.

## Backend, analytics and operations

The product is static and needs no backend for playback. Its operational
backend is the release process: exact manifest, artifact packaging, title
admission, rollback and monitoring. Analytics ingestion is not wired. The
current play event is insufficient and semantically mismatched.

## External capability scout

- Use `ffprobe` or MediaInfo in CI for exact audio/video duration, codec and
  stream checks; macOS `afinfo` is a local fallback.
- Use a standards-based WebVTT parser/validator rather than the player's small
  permissive parser for admission.
- Use Playwright for deterministic player/error/focus/artifact journeys and
  real Safari/VoiceOver manual evidence for final accessibility.
- Keep CapCut or another NLE as an assembly tool only after the occurrence
  manifest is locked; it is not the source of truth.
- A perceptual-hash/contact-sheet tool can triage drift, but independent human
  judgment remains required for character, history and style.

No installation, subscription or spend is authorized by this report.

## Bounded source improvement

`watch.html` now says motion-film editions are not approved rather than
“completing” review, calls the current programme illustrated listen-alongs,
and prevents the global Space shortcut from hijacking buttons/links/forms.
`scripts/test-screening-room-contract.mjs` inventories the five programmes and
surfaces the current timeline/caption holds.

## Next action

Build SR-001 for one representative title, independently judge it, then repeat
title by title. Do not attempt four simultaneous full-film rebuilds.
