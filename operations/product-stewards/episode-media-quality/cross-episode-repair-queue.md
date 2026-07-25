# Cross-episode repair queue

## P0 — FIX BEFORE LAUNCH

1. **Run one SHA-bound full viewing gate for Trailer + Episodes 1–4.** Owner: Release QA. Dependency: a stable local player/browser. Required output: normal-speed/full-size watch log, actual timestamp, screenshot, picture/narration/caption decision at every cue boundary. This audit did load E01 in Chrome and observed 00:20.31, but the exposed scrubber rejected `set_value` and Computer Use then lost the window (`noWindowsAvailable`); this does not substitute for the gate.
2. **Enforce per-shot reference binding.** Owner: Image Quality Judge. Trailer B01–B58; E01 71; E02 61; E03 49; E04 55. Require identity reference, master-style reference, setting reference, actual final frame and replacement decision. Wrong character, invented background, anatomy/costume/text drift or off-lock style = replace the entire shot.
3. **Repair observed E01/E02 style-system failures before any motion work.** Owner: Image Production Director. E01 00:31.9–01:15.2 and E02 repeatedly at 00:00–03:45/12:55–15:10 visibly pair painterly scenic art with crisp comic cards. Replace the affected scenic sources; transitions/camera moves cannot repair an off-canon source frame.
4. **Replace camera-drift-as-motion.** Owner: Animation Director. E01 (24/71) and E02 (31/61) count restrained camera moves as motion; that is insufficient where the spoken beat calls for an event. Use source-safe, narration-motivated object/character action; keep intentionally graphic cards static.
5. **Make semantic alignment a release gate.** Owner: Video Editor. Existing matrices now contain actual-frame extraction coverage, but trailer’s legacy cue sheet still does not map the 58-beat candidate. Regenerate from final audio + final assembled source manifest, then get independent human pass/fail.
6. **Rebuild motion evidence for E04 and trailer.** Owner: Motion Quality Judge. Store known-still control, thresholds and actual sample results; current JSONs do not expose sufficient values. A vector/metric pass cannot clear fake motion.
7. **Caption/audio playback review.** Owner: Audio & Caption Owner. VTT presence is not player proof; compare as-recorded audio, VTT and visible below-picture caption bar on desktop/mobile.

## HIDE/LABEL FOR LAUNCH

- Keep all five full motion candidates out of `EPISODE_FILMS`; public `watch.html` honestly presents listen-alongs and says motion films remain under continuity review. Owner: Release QA.
- Do not claim trailer/episodes “screen now” as motion products. Owner: Episode Product Owner.

## POST-LAUNCH EXPERIMENT

- None until the P0 evidence gate passes. Do not use launch traffic as a continuity test.

## DECLINE

- Decline further filename/version promotion, thumbnail/contact-sheet approval, and self-approval by the maker. They are directly incompatible with the charter and BTB prevention rules.
