# EMQ Episode 01 v26 — independent complete-title judge

**Task:** `EMQ-E01-V26-FULL-TITLE-INDEPENDENT-JUDGE-2026-07-27`  
**Scope:** frozen local review tuple only. This judge did not modify the maker, MP4, captions, player, route, release state, deployment, or public media.  
**Verdict:** **HOLD — two remaining release witnesses only.**

## Exact tuple

| Input | SHA-256 | Independent result |
| --- | --- | --- |
| Review master `assets/video/episode-01-full-v26-source-admitted-review.mp4` | `f5985a39363eb75514766186817d0105beab9fa6695accf40e0972698e1d1351` | matched; 627,122,305 bytes; 35,167 decoded video frames |
| Assembly manifest `operations/video-qa/episode-01-v26-source-admitted/manifest.json` | `3abc64a0e964f655d0eebe3ee02f4d7f43d8d07b06d2c384136f11407156b2be` | matched |
| Maker QC `operations/video-qa/episode-01-v26-source-admitted/maker-qc.json` | `ca4fe84243aff1bc03abedcc1da6b46a4e025f04d0cffba0316b1b9ce5c105f3` | matched |
| Config `assets/video/episode-01-v26-source-admitted-config.json` | `902e4daab021f2d1ab6e5ed3503c383a7962d28dc6a61d50fd03be5a4ee8c83f` | matched |
| Builder `assets/video/build-episode-01-v26-source-admitted.py` | `46747e2cd7aaba6d92f60327edbb3ffb2809a57df35ac69008a8b58732b3266f` | matched |
| External captions `operations/captions/episode-01.vtt` | `191938a9879883d9439c4ff35c319c40c54fec09855c4c72ba66bd7cdcbd9539` | matched public asset byte-for-byte |

The structured verdict is [emq-e01-v26-source-admitted-full-title-independent-judge-2026-07-27.json](emq-e01-v26-source-admitted-full-title-independent-judge-2026-07-27.json), SHA-256 `c64ceb2bc84deb63e65f61cfa4c12796425609618d927a22c6140676e23e8f1d`.

## What passes

- **[PASS_HASH_BINDING_ALL_SUPPLIED_INPUTS]** All dispatched bytes recompute to the exact hashes above.
- **[PASS_FULL_AUDIO_VIDEO_DECODE]** Independent complete audio/video decode completes without an error.
- **[PASS_SOURCE_ADMISSION_13_OF_13]** All 13 replacement windows resolve to the admitted source hashes at placements `14, 25, 29, 30, 34, 38, 43, 45, 48, 50, 57, 61, 70`.
- **[PASS_STILL_OCCURRENCE_BINDING]** The manifest's two interior decoded-frame checks per window agree with the named admitted still, with no camera motion or crop. The 24 inherited pre/post/welcome control frames and the protected v25 welcome-ident interior control remain exact.
- **[PASS_AUDIO_CLOCK_PRESERVATION]** Independent stream-copy extraction confirms the v26 AAC payload equals protected v25 exactly: SHA-256 `0572c2c9f1d568004155684ecf155f702af4d9b31a7eac57a12eca88d385db24`, 27,438,977 bytes.
- **[PASS_WELCOME_IDENT]** The title-specific Episode 01 `Welcome back to LAiDIES` sequence remains intact over its protected 93.900–101.920 second interval.
- **[PASS_CAPTION_STRUCTURE]** The external VTT is unchanged from `assets/captions/episode-01.vtt`; 246 cues are positive, monotonic, and non-overlapping from 00:00:00.000 through 00:19:31.420. It remains external—not muxed or burned.
- **[PASS_VISUAL_CONTINUITY_SAMPLE]** A timeline-spanning visual sample plus every repaired interval finds the admitted 1999 orange handled iBook in the former modern-laptop windows, preserved Episode 01 ident, coherent adult comic/graphic-novel character treatment, and no observed black frame, stretch, crop, or boundary flash.

The v24 causes of full-title rejection are not carried forward: every one of its named off-register/period-technology placements is now replaced by an independently accepted source. The prior baked-card system concern is not re-opened by any new v26 bytes; it remains outside this 13-source repair scope.

## Why complete-title admission is still held

1. **[HOLD_REPRESENTATIVE_PLAYER_UNBOUND]** `watch.html` still declares `EPISODE_FILMS = {}`. This exact checksum has no isolated representative-player harness. Therefore normal-speed UI audio, external caption rendering/sanitization, keyboard/focus, reduced-motion, mobile, retry/failure, and no-JS behavior have not been witnessed for v26.
2. **[HOLD_HUMAN_FULL_1X_UNMUTED_AUDIBLE_WITNESS_MISSING]** No named human has completed a full-title 1× unmuted audible watch of this exact master. Decode and AAC-payload parity prove mechanical integrity, not listening accuracy or experience.

## Exact next action

Create the smallest isolated, non-public representative-player harness bound only to this unchanged v26 MP4 and unchanged VTT. Independently run its browser/player matrix, then obtain an identified human full-title 1× unmuted audible witness. No media rebuild, route change, public binding, deployment, or release claim is authorized by this report.

## Learning scan

No new painpoint entry is required. This preserves the standing rule: exact source admission and clock-preserving assembly do not substitute for checksum-bound player behavior or a named full audible watch.
