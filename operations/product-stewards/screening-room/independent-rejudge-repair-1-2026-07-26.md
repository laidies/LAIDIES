# Screening Room Cycle 6 Repair 1 — independent rejudge

**Status:** INDEPENDENT REJUDGE COMPLETE — BOUNDED LOCAL P0 REPAIR PASS;
**ALL FIVE TITLES AND RELEASE REMAIN HOLD**

**Judge boundary:** The maker did not participate in this verdict. No runtime,
maker evidence, media, deployment, promotion, credentials or public service
was changed. The old independent report and Repair 1 maker evidence were
inputs, not authority.

## Verdict

Repair 1 fixes the specific P0 contract failures found in the first Cycle 6
review: the player no longer has simulated playback; failed audio/caption/cue/
visual/play routes stop and disable transport; routing has an exact public
allowlist; the seek rail is a real keyboard slider; Episode 02's “Next time”
cue now starts exactly at its existing VTT anchor; and the 03/04 public output
is a hash-bound, explicitly held cover-only edition rather than an undisclosed
rewrite.

That is a meaningful, independently reproduced local repair. It is not title
admission, visual approval, motion-film approval or release readiness. The
admission record contains zero approved occurrences, so it correctly fails
closed. The five title holds remain.

## Independent scorecard

The 17/20 floor applies to every category; scores do not compensate for a
missing title-level admission.

| Category | Score | Floor | Ruling |
|---|---:|---|---|
| Product quality / learner value | 13/20 | FAIL | Honest listen-along routing improved, but no title has complete timing/visual occurrence evidence; 03/04 are deliberately static-cover fallbacks. |
| Accuracy, safety and trust | 15/20 | FAIL | Failure and edition truth are much stronger; trailer captions remain materially incomplete and no independently approved occurrence evidence exists. |
| LAiDIES brand / continuity | 12/20 | FAIL | No unapproved image or film was promoted, but no current visual system has been independently cleared. |
| UX / accessibility | 14/20 | FAIL | Keyboard seek and stopped/retry state exist in browser DOM; Safari/VoiceOver, real mobile, caption failure recovery and title-level comprehension remain unproved. |
| Technical / data integrity | 16/20 | FAIL | Exact allowlist, build-time source/generated hashes and zero-occurrence hold fail closed; whole-artifact size and full rendered failure matrix remain open. |
| **Total** | **70/100** | **HOLD** | Every non-compensable floor remains below 17. |

## Independently reproduced evidence

| Check | Result |
|---|---|
| Source `node scripts/test-screening-room-contract.mjs` | PASS — five programmes HOLD; 0 admitted occurrences; exact audio/caption/cue hashes; Episode 02 anchor; all explicit warnings retained. |
| `node scripts/check-episode-cues.js` | PASS structurally; warnings retain the 83.5 s Episode 02 hold and trailer 89.4/84.1/83.2 s holds. |
| `node scripts/check-inline-js.js` | PASS — 351 scripts across 132 pages. |
| Fresh build | `/tmp/laidies-screening-rejudge-r1.kViE1K`: 1,087 files, 959.59 MiB; 0 missing, 0 oversized; existing >750 MiB warning. |
| Artifact contract | PASS with the same all-title HOLDs. |
| Source/artifact authority byte identity | PASS for `watch.html`, Episode 02 cues, admission schema/record and derived-edition manifest. |
| Artifact 03/04 derivation | PASS — 49/58 cues respectively are exactly the manifest cover, `cover-only-audio`, `reviewStatus: hold`, and have their declared generated hashes. |
| Artifact local links | PASS — 1,968 local references across 110 pages. |
| Real browser DOM, `?ep=99` | PASS — `Tape not found`, unavailable state, disabled slider and retry action rendered. |

## Adversarial findings

- **Exact public routes:** static inspection and rendered `?ep=99` prove that
  only trailer/01–04 are accepted; unknown input does not construct an episode
  99 issue/cue route. Tune mode requires `localhost` or `127.0.0.1`.
- **No simulated playback:** no demo clock/mode/interval or rough-cut copy
  remains; `failPlayer()` pauses audio, disables both play controls and removes
  the slider from tab order. Its status explicitly says no simulated narration
  or scene advance runs.
- **Keyboard/DOM:** the seek rail is `role=slider`, starts focusable, exposes
  min/max/now/text and handles Arrow, Home and End. It is disabled on a player
  failure. Space does not steal activation from links, buttons or form fields.
- **Failure truth:** audio, captions, cues, visual media and play rejection
  each route to the stopped state with a reload retry. The former silent
  rough-cut path is absent. Rendered network-failure and native media-browser
  behaviour remain separate open tests.
- **Caption/cue truth:** trailer remains explicitly partial (64.356 seconds
  uncovered); the record does not call it complete. The Episode 02 cue asset
  begins at 971.49 seconds, exactly matching the “Next time on LAiDIES” anchor.
  The 83.49-second preceding hold is disclosed rather than hidden.
- **Admission and malformed input:** the schema closes programme/occurrence
  fields and requires judge/owner/timing/hash verdicts for an occurrence. The
  active record has zero occurrences and no admitted programmes; empty evidence
  cannot be mistaken for clearance. Malformed JSON or a derived source/hash
  mismatch aborts parse/build rather than being accepted. No runtime consumes
  an admission record as a substitute for media approval.
- **Derived editions:** 03/04 are distinct hash-bound public editions. Their
  source hashes, generated hashes, static cover and `hold` status are checked
  in source and exact artifact. Unsupported `verified audio`, `timed lesson
  cards` and motion-film language is absent from generated output.

## Remaining title holds

| Title | Status | Still blocking |
|---|---|---|
| Trailer | HOLD | 64.356-second caption gap, post-caption visual cues, long holds, estimated timing, zero approved occurrences. |
| Episode 01 | HOLD | Proportional timing, visual/style continuity review and zero approved occurrences. |
| Episode 02 | HOLD | Exact Next-time semantic anchor repaired, but 83.5-second hold, proportional timing, style review and zero approved occurrences. |
| Episode 03 | HOLD | Hash-bound cover-only fallback; source timing/visual admission and 49 occurrence verdicts absent. |
| Episode 04 | HOLD | Hash-bound cover-only fallback; Ada/identity/era/background review and 58 occurrence verdicts absent. |

## Packaging guidance

The Repair 1 allowlist is appropriate only for the bounded listen-along
contract: `watch.html`, Episode 02 cues, admission schema/record, derived
manifest, builder and contract test, plus exact narration/VTT/cue dependencies
and static 03/04 covers. The public artifact must continue to exclude review
exports, broad episode trees, raw/rejected/superseded media, contact sheets,
motion masters, private evidence and credentials.

Before any title or release can advance: obtain occurrence-level independent
and owner verdicts; repair trailer captions and timing; resolve each title's
visual continuity; test actual missing-audio/caption/cue/image failures in
representative browsers; pass Safari/VoiceOver/mobile/zoom; establish
privacy-approved measurement; address artifact-size risk; then rebuild and
rejudge the exact public candidate. No social or motion-film claim is licensed
by this result.
