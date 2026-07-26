# Screening Room Cycle 7 — local delivery evidence

**Status:** LOCAL IMPLEMENTATION/TEST PASS — ALL TITLES, VISUALS, MOTION AND
PUBLIC RELEASE HOLD
**Deploy:** not performed
**Visual admission:** 0 occurrences

## Delivered locally

- Trailer main cues 1–30 now begin at matching semantic onsets in the
  authoritative Trailer VTT. Cue 0 remains the programme start. Cue 31 remains
  at 960.000 because the partial VTT ends at 902.760 and contains no matching
  final-card onset.
- All 27 Episode 02 main cues now begin at matching semantic onsets in the
  authoritative Episode 02 VTT, including Make It Official at 945.950 and Next
  time at 971.490.
- The caption bar explicitly tells a listener when the Trailer enters its
  untranscribed final portion: narration continues, transcript unavailable, no
  invented words.
- A closed, versioned device-local resume record remembers only programme and
  time. It validates exact shape/range/same programme, says it is not an
  account, supports Resume and Start over, throttles writes and clears near
  completion.
- The browser regression covers newcomer, returning, start-over, mobile widths,
  keyboard seeking and every fail-closed media path.
- `shot-admission-queue-cycle-7-2026-07-26.md` separates required replacement,
  owner admission and timing/identity blockers. It does not approve assets.

## Verification

| Check | Result |
|---|---|
| `node scripts/test-screening-room-contract.mjs` | PASS — five programmes present; all HOLD; motion films 0; exact hashes and clocks pass |
| `node scripts/check-episode-cues.js` | PASS — five cue sheets ordered/resolvable; four long-hold warnings retained |
| `PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" node scripts/test-screening-room-browser.mjs` | PASS — newcomer/returning/start-over; 320/390/1280; slider Arrow/End/Home; cue/caption/audio/visual/playback failures; explicit Trailer transcript gap |
| Fresh artifact `/tmp/laidies-screening-cycle7-final.bwvtNB` | PASS — 1,085 files; 959.56 MiB; 0 missing; 0 oversized; existing >750 MiB warning retained |
| Artifact contract and browser regression | PASS — same HOLD truth and journeys as source |
| Source/artifact authority identity | PASS — `watch.html`, Trailer/Episodes 01–02 cues, admission record/schema and derived manifest are byte-identical |
| Episode 03/04 artifact transform | PASS — expected cover-only hashes `5e9bcd…102de` and `8c33dd…28f980` |

## Per-title release truth

| Programme | Cycle 7 result | Remaining blocker |
|---|---|---|
| Trailer | **TIMING/PARTIAL-CAPTION REPAIR PASS; TITLE HOLD** | final 64.356 seconds uncaptioned; final-card onset unknown; 0/33 media occurrences admitted |
| Episode 01 | **PLAYER REGRESSION PASS; TITLE HOLD** | proportionally rebased clock, observed style drift, 0/55 media occurrences admitted |
| Episode 02 | **MAIN TIMING REPAIR PASS; TITLE HOLD** | recurrent style drift, long editorial holds, 0/31 media occurrences admitted |
| Episode 03 | **PLAYER/DERIVED-EDITION CONTRACT PASS; TITLE HOLD** | proportional source clock, welcome decision, 0/49 occurrences admitted; public artifact remains cover-only |
| Episode 04 | **PLAYER/DERIVED-EDITION CONTRACT PASS; TITLE HOLD** | likeness/era/setting review, excluded Ada loop, 0/58 occurrences admitted; public artifact remains cover-only |

## Claims and owner decisions

- `EPISODE_FILMS` remains empty. No motion-film claim may advance.
- Keep all five programme titles. Do not substitute Coming Soon.
- Ali must decide the shot queue; an independent judge must bind each admitted
  occurrence to exact evidence.
- Native Safari/VoiceOver, 200% reflow, reduced-motion human review, complete
  Trailer captions, Episode 01/03 clock authority and public-origin proof remain
  open.

No deploy or public-origin check was performed.
