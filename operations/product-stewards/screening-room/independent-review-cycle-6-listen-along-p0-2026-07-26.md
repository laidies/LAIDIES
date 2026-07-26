# Screening Room Cycle 6 — Independent Review

**Review date:** 2026-07-26  
**Reviewer role:** independent judge; no maker evidence or source modified  
**Scope:** Screening Room P0 listen-along admission, trailer and Episodes 01–04  
**Verdict:** **FAIL — HOLD**  
**Independent score:** **52/100**

This review does not accept the maker's 70/100 self-score as evidence. It independently inspected the charter, operating specification, Cycle 6 deep dive, build packet, state, backlog, all five title subproducts, runtime, cue sheets, captions, audio, public-site transformation, tests, built artifact, browser behaviour and current visual evidence.

No title is admitted. No motion-film, visual, deploy or promotion approval is granted.

## Non-compensable scorecard

The admission floor is 17/20 in every category. A high score in one category cannot compensate for a failed floor elsewhere.

| Category | Score | Floor result | Independent finding |
|---|---:|---|---|
| Product quality and audience value | 12/20 | FAIL | Five local narrated programmes are selectable, but material timing defects remain and Episodes 03–04 collapse to repeated cover images in the public artifact. |
| Accuracy, safety and trust | 11/20 | FAIL | Motion-film absence is represented honestly, but public-build derivation is unmanifested, failure states can silently become a simulated rough cut, and the generated cue note claims verification not established by evidence. |
| LAiDIES brand and continuity | 10/20 | FAIL | The room and copy are distinctive, but exact runtime evidence mixes incompatible visual systems and no occurrence-level identity, location, background or style verdict exists for an admitted title. |
| UX and accessibility | 9/20 | FAIL | Read-along captions and basic transport exist, but seeking is mouse-only, recovery actions are absent, media failures are misleading or silent, Episode 04 has no chapters, and native assistive-technology behaviour is untested. |
| Technical and data integrity | 10/20 | FAIL | Local media exists and audio/VTT files survive the build byte-for-byte, but the contract test misses major semantic failures, Episodes 03–04 are rewritten without a derived authority manifest, and the artifact exceeds the stated size warning threshold. |
| **Total** | **52/100** | **FAIL** | **All five non-compensable floors fail.** |

## Reproduced contract result

The repository contract test was run against both source and a fresh public artifact. Both runs exited non-zero.

Fresh artifact:

`/tmp/laidies-screening-judge.PcAM8O`

- 1,083 files
- 959.57 MiB logical size, approximately 1.1 GiB on disk
- zero missing referenced files
- zero single-file oversize failures
- public-artifact warning: greater than 750 MiB

Observed contract output:

```text
SCREENING ROOM CONTRACT HOLD
programmes=5
published_episodes=4
motion_films=0
HOLD trailer estimated/proportional
HOLD 01 estimated/proportional
HOLD 02 final visual holds 76.7s
HOLD 02 estimated/proportional
HOLD 03 estimated/proportional
FAIL trailer final visual cue begins 57.2s after caption master ends
```

The source-only Episode 03 proportional-timing hold disappears from the artifact because the builder replaces the source note. That is not a repair; it is loss of provenance.

## Exact defects

### SR-C6-IR-01 — Trailer caption master ends materially before the audio and visuals

**Severity:** admission-blocking

- Audio duration: 967.116 seconds.
- Final caption end: 902.760 seconds.
- Uncaptioned audio tail: 64.356 seconds.
- Four visual cues begin after captions have ended: 907.5, 938.7, 951.6 and 960.0 seconds.
- The final cue begins 57.2 seconds after the caption master ends.
- Six visual intervals exceed 45 seconds; the maximum is 89.4 seconds.

This is neither a complete read-along nor an acceptable timing proof.

### SR-C6-IR-02 — Episode 02's “Next time” image is 61.49 seconds early

**Severity:** admission-blocking

- The “Next time” visual cue begins at 910.0 seconds.
- The matching caption begins at 971.49 seconds.
- The image therefore appears 61.49 seconds before its narration, over Study Pack, quiz, KSVL and other intervening speech.
- The final visual holds 76.67 seconds to the caption master end.
- Six visual intervals exceed 45 seconds; the maximum is 60 seconds before the final hold.

This is direct narration-to-image misalignment, not merely an aesthetic preference.

### SR-C6-IR-03 — No title has occurrence-level continuity and alignment evidence

**Severity:** admission-blocking

- Trailer, Episodes 01–03 remain labelled estimated or proportionally rebased.
- Episode 01 alternates exact-runtime photorealistic material such as `/assets/ugh-as-if.png` with clean comic illustration such as `ep01-steve-ovation-c-end-comic.png`; the current contact evidence also shows multiple incompatible rendering systems.
- Episode 02 evidence mixes painterly/photo-like frames and flat graphic cards, while its timing is already demonstrably wrong.
- Episode 03's artifact displays one VHS cover for all 49 cue occurrences.
- Episode 04's artifact displays one VHS cover for all 58 cue occurrences.
- There is no occurrence-by-occurrence judge record covering narration meaning, named-person identity, location, background, era and style continuity for any candidate.

Inventory counts and sampled contact sheets do not satisfy the admission contract.

### SR-C6-IR-04 — The public builder performs unmanifested semantic transformations

**Severity:** admission-blocking

For the public artifact, the builder rewrites:

- Episode 03: 49 of 49 cue occurrences to one `type: "full"` VHS cover.
- Episode 04: 58 of 58 cue occurrences to one `type: "full"` VHS cover.

The transformation removes Episode 04's Ada video loop and all semantic cue types. It also replaces the source note with a generated assertion that the episode has “verified audio, read-along captions and timed lesson cards.” No source-to-derived manifest, hashes, transformation rationale, acceptance verdict or named authority supports that assertion.

Audio, VTT and runtime hashes match between source and artifact. Cue hashes do not match for Episodes 03–04, as expected from the undisclosed transformation:

| Item | Source | Artifact |
|---|---|---|
| Episode 03 cue sheet | `aa7708…d09a9` | `180f4e…0079d` |
| Episode 04 cue sheet | `8cd20d…baf6` | `56e340…982a4` |

This makes the artifact a distinct derived edition without the required authority record.

### SR-C6-IR-05 — Media failures produce misleading or unrecoverable states

**Severity:** admission-blocking

Adversarial browser checks found:

- Audio failure switches to silent demo mode, continues painting caption text and auto-advances estimated scenes while saying narration is not recorded. This can look like functioning playback even though the promised audio has failed.
- Cue-sheet failure leaves transport available and offers no retry.
- Caption failure is visible but offers no retry.
- Image failure can remove the image or leave a blank scene without an accessible error or recovery action.
- `play()` rejection is swallowed.

The operating specification already identifies silent/demo fallback as misleading. The artifact still exhibits it.

### SR-C6-IR-06 — Keyboard and assistive-media behaviour is below the admission floor

**Severity:** admission-blocking

- The seek rail is a non-focusable `div` with `tabIndex=-1`.
- It has no slider role, value semantics or keyboard seeking.
- Caption updates use a polite live region for a high-frequency stream; native screen-reader behaviour has not been tested.
- Episode 04 has no chapter data and renders zero chapter controls.
- Completion has no accessible completion announcement or focus transition.
- No native keyboard, screen-reader, reduced-motion or mobile-control evidence was supplied.

The improved global Space-key guard is a useful result, but it cannot compensate for the inaccessible seek control and missing native evidence.

### SR-C6-IR-07 — Route and tuning modes are not constrained to the public contract

**Severity:** major

- `?ep=99` produces no matching programme, an `/issues/issue-99.html` link and an Episode 99 cue failure while the header remains on the default Episode 01 label.
- Episode parsing strips non-digits rather than validating an exact public allowlist.
- `?tune=1` exposes the internal tuning HUD and its stamping, undo and JSON-copy hotkeys to public visitors.

These states are not represented in the admission evidence or protected as development-only behaviour.

### SR-C6-IR-08 — The automated contract is too shallow to establish admission

**Severity:** major

The current test proves local existence, basic cue ordering, absence of admitted motion-film entries and a limited final-hold heuristic. It does not establish:

- audio duration against VTT coverage;
- cue-to-caption semantic alignment;
- per-occurrence continuity;
- cue schema and allowed semantic types;
- source-to-artifact transformation authority;
- source/artifact hashes;
- missing-image behaviour;
- player rejection and retry states;
- exact episode allowlisting;
- keyboard seek semantics;
- native assistive-technology behaviour.

Its green subchecks must not be reported as title admission.

### SR-C6-IR-09 — Analytics label the listen-along as a video watch

**Severity:** moderate

Playback emits `Episode watch` even when no motion film exists and the visitor is using the narrated listen-along. This is incorrect product semantics and cannot serve as completion evidence.

## Title-by-title holds

| Title | Independent status | Blocking reason |
|---|---|---|
| Trailer | **FAIL / HOLD** | 64.356-second caption gap, four post-caption cues, very long holds, estimated timing and no full occurrence verdict. |
| Episode 01 | **HOLD** | Proportionally rebased timing, exact-runtime style discontinuity, and no complete occurrence-level judge/owner watch. |
| Episode 02 | **FAIL / HOLD** | “Next time” visual 61.49 seconds early, 76.67-second final hold, estimated timing and unresolved painterly/style evidence. |
| Episode 03 | **FAIL / HOLD** | Estimated source timing; artifact rewrites 49/49 occurrences to one cover without a derived-edition manifest or semantic proof. |
| Episode 04 | **FAIL / HOLD** | Artifact rewrites 58/58 occurrences to one cover, removes semantic cue types and the Ada loop, provides no chapters, and lacks complete identity/era/alignment evidence. |

The existing SHA-bound motion-film holds also remain in force. Sampled frames, file presence and contact sheets are not substitutes for normal-speed owner and independent watches.

## Required repair packet

The next packet must include all of the following before another admission review.

1. **Common player repair**
   - Replace the seek rail with a keyboard-operable control carrying correct slider semantics.
   - Provide explicit loading, failure, retry and recovery states for cue, caption, audio and image failures.
   - Remove the silent pseudo-playback fallback from the public promise, or identify it unambiguously as a separate simulation that cannot be mistaken for working narration.
   - Handle rejected playback visibly.
   - Restrict episode selection to an exact allowlist and make unknown routes a coherent not-found state.
   - remove or development-gate public tuning mode.
   - Correct analytics to distinguish listen-along starts, progress and verified completion from motion-film watches.

2. **Source-to-artifact authority**
   - Add a machine-readable derived-edition manifest for every builder rewrite.
   - Record source and artifact hashes, transformation rules, removed cue semantics, named owner, review status and date.
   - Preserve source hold notes; generated files must not replace an unresolved source hold with unsupported “verified” language.
   - Make the runtime's edition identity and promise visible and truthful.

3. **Exact timing repair**
   - Repair the trailer caption master through the actual audio end and retime its final visual sequence.
   - Retime Episode 02 so each semantic visual begins with the matching narration; specifically correct the 61.49-second early “Next time” cue and the 76.67-second final hold.
   - Replace estimated/proportional status with measured timing derived from the exact admitted audio/VTT pair.
   - Add automated thresholds for caption coverage, cue gaps and semantic cue anchors.

4. **Representative-title occurrence manifest**
   - Select one candidate only after the common player defects are repaired.
   - Enumerate every visual occurrence, not just unique filenames.
   - For each occurrence record exact start/end, caption/narration meaning, source asset hash, named-person identity, location, background, era, style family and continuity verdict.
   - Attach a complete normal-speed owner watch and a separate independent watch against the exact artifact hash.
   - Any exception requires an explicit rationale and approval; sampled contact sheets are insufficient.

5. **Episodes 03–04 edition decision**
   - Either restore semantically timed approved visuals, or explicitly define and review a cover-only audio edition whose promise says the cover remains static.
   - Do not describe repeated cover images as timed lesson cards.
   - Restore meaningful Episode 04 navigation or explicitly document and approve why the edition has no chapters.

6. **Native behaviour evidence**
   - Supply keyboard-only, screen-reader, reduced-motion, mobile and media-failure test results against the exact built artifact.
   - Include accessible completion behaviour and recovery after a failed request.

7. **Stronger contract test**
   - Make the automated gate inspect real audio/VTT duration, cue schemas, semantic anchors, exact route allowlists, derived manifests, hashes, browser failure states and keyboard semantics.
   - Keep title admission distinct from programme presence and file existence.

## Packaging guidance

This judge lane adds exactly one file:

`operations/product-stewards/screening-room/independent-review-cycle-6-listen-along-p0-2026-07-26.md`

Package that report separately from the maker packet. Do not edit, replace or restage the maker's score, deep dive, build packet, state, backlog or title subproducts as if they were independent evidence. Do not package `/tmp/laidies-screening-judge.PcAM8O`; it is a disposable reproduction artifact.

The next review submission should package:

- the repaired source;
- the exact generated artifact or immutable artifact hash;
- the derived-edition manifest;
- contract and native-browser test output;
- the representative title's occurrence manifest;
- owner-watch evidence;
- a new, separate independent-review report.

Until that packet passes all five non-compensable floors, the correct public status is **HOLD**.
