# EMQ-E03-V10-INDEPENDENT-JUDGE-2026-07-26

**Task:** `EMQ-E03-V10-INDEPENDENT-JUDGE-2026-07-26`  
**Judge role:** Episode Media Quality — independent of the maker  
**Judged at:** `2026-07-26T23:33:41Z` (`2026-07-26T16:33:41-07:00`)  
**Verdict:** **HOLD**

## Frozen tuple

| Role | Exact path | Recomputed SHA-256 | Result |
|---|---|---|---|
| Review MP4 | `assets/video/episode-03-full-v10-source-reconciled-review.mp4` | `c5dcee69c40e50d834dcc8f471eae9d621f531b37653de9eaef7bf5e362fd239` | MATCH |
| 49-placement manifest | `operations/video-qa/episode-03-v10-49-placement-manifest.json` | `b278d0b7975c81df7e19396b350c5732563920fd54fe1e994d675796e94b520a` | MATCH |
| Maker QC | `operations/video-qa/episode-03-full-v10-source-reconciled-qc.json` | `c6f059ddf81c539b68d5b853571203339f6b3ca207d0db84700232944e8d4d27` | MATCH BY HASH |
| Config | `assets/video/episode-03-v10-source-reconciled-config.json` | `bdf3ef4bb38abc430b0e22a0332aa38cc4c3e09557fc331e4143324dc337cd2e` | MATCH |
| Builder named by config | `operations/tools/assemble-ep03-film-v10-source-reconciled.py` | `1ff2833bc0e717e74a99d1ccce516eb5d71d2745dc35b4ab9b9a25e675413667` | RECOMPUTED |

The dispatch named `operations/video-qa/episode-03-v10-source-reconciled-qc.json`, which does not exist. The checksum-identical QC file is at the config-bound path shown above. This is a path-association defect in the handoff, not a byte mismatch.

All 49 manifest `render_source` paths exist and independently match their recorded hashes: `49/49 MATCH`, `0 MISMATCH`.

## Technical and clock evidence

- Full independent decode completed without an FFmpeg decode error.
- MP4: H.264 High, `1920×1080`, 30 fps, AAC-LC mono 44.1 kHz, runtime `1048.00s`.
- Audio level scan: mean `-20.5 dB`, peak `-1.4 dB`.
- Silence scan at `-45 dB` found one short `1.513s` interval at `877.770–879.283`; no long missing-audio region was found.
- External VTT recomputed as `211` ordered cues, no invalid durations and no overlaps. First cue begins `0.000`; last cue ends `1046.950`, leaving a `1.050s` tail to the MP4 end.
- No subtitle stream is burned or embedded; the candidate depends on the external VTT/player path.
- Maker motion evidence reports movement in all 15 ambient-loop sources, and the one-shot transformation visibly resolves once and freezes without a wand. Start/mid/full-source strips did not show character displacement. This is useful technical evidence, but it is not a substitute for the missing audible normal-speed actual-player watch.

## All 49 occurrence rulings

Each row was checked from 1920×1080 start/mid extractions against the manifest job, with full-frame inspection and closer full-resolution inspection where identity or lettering was material.

| Cue | Window | Picture / semantic ruling | Motion ruling |
|---:|---:|---|---|
| 0 | 0.00–18.70 | PASS — recap strip, Heroine continuity and title lettering readable | PASS static |
| 1 | 18.70–31.50 | PASS — teaser supports the coming verification premise | PASS static |
| 2 | 31.50–35.10 | PASS — Episode Three / Burn Book title lands clearly | PASS static |
| 3 | 35.10–57.00 | PASS — Heroine, office and monitor front are physically coherent | TECHNICAL PASS ambient |
| 4 | 57.00–78.00 | PASS — rear-facing monitor surface is solid dark; no false rear display | TECHNICAL PASS ambient |
| 5 | 78.00–91.10 | PASS — displayed July-rollout sentence is on the user-facing screen | TECHNICAL PASS ambient |
| 6 | 91.10–108.40 | PASS — reflective office/rain beat supports the qualified-May/July narration | TECHNICAL PASS ambient |
| 7 | 108.40–135.00 | **FAIL — GENUINE SEMANTIC DEFECT.** `WELCOME BACK` appears at 108.40 while the narration is still finishing the “quietly, completely wrong” thought; “Welcome back to LAiDIES” does not begin until 116.180. This is not Ali taste. | PASS static treatment; wrong onset |
| 8 | 135.00–151.90 | PASS — corporate base changes once to the Elle-week look, no wand, then freezes | PASS one-shot |
| 9 | 151.90–178.00 | PASS — NewsStand/Paige checking scene supports source verification; prior Ali-positive source retained | TECHNICAL PASS ambient |
| 10 | 178.00–199.00 | PASS — “Says who / based on what” emphasis matches narration | PASS static |
| 11 | 199.00–222.00 | PASS — Regina/Burn Book source analogy and location are correct | TECHNICAL PASS ambient |
| 12 | 222.00–244.00 | PASS — same-handwriting/social-authority emphasis is correctly paired | PASS static |
| 13 | 244.00–261.70 | PASS — hallucination definition supports the spoken explanation | PASS static |
| 14 | 261.70–284.00 | PASS — Bethany example and comparison evidence are correctly paired | TECHNICAL PASS ambient |
| 15 | 284.00–303.90 | PASS — Claire/headband clue emphasis is semantically aligned | PASS static |
| 16 | 303.90–328.00 | PASS — churn-butter claim-vs-draft card supports the question | PASS static |
| 17 | 328.00–350.00 | PASS — wrong-room ensemble and “doesn’t go here” job are coherent | TECHNICAL PASS ambient |
| 18 | 350.00–367.00 | PASS — “cited with confidence” mismatch emphasis is correct | PASS static |
| 19 | 367.00–384.00 | PASS — wrong-ID/wrong-room visual continues the same setting | TECHNICAL PASS ambient |
| 20 | 384.00–391.80 | PASS — fake-citation emphasis supports promoted-conversation claim | PASS static |
| 21 | 391.80–420.00 | PASS — Elle courtroom/file identity, location and timeline job are clear | TECHNICAL PASS ambient |
| 22 | 420.00–444.00 | PASS — Chutney is on the stand, not Regina; text is about verification | TECHNICAL PASS ambient |
| 23 | 444.00–460.70 | PASS — verification checklist supports the survivable-detail method | PASS static |
| 24 | 460.70–482.00 | PASS — Chutney/Elle comparison is correctly attributed | PASS static |
| 25 | 482.00–496.20 | PASS — computerized closet makes the real-world test legible | TECHNICAL PASS ambient |
| 26 | 496.20–515.00 | PASS — DRAFT card is correctly defined | PASS static |
| 27 | 515.00–533.00 | PASS — CLAIM card is correctly defined | PASS static |
| 28 | 533.00–550.00 | PASS — RECEIPT card is correctly defined | PASS static |
| 29 | 550.00–565.00 | PASS — outfit/file analogy is correctly paired | PASS static |
| 30 | 565.00–577.00 | **FAIL — GENUINE LETTERING DEFECT.** Prominent law-volume spines contain malformed text such as `FEBTRAL REPO...`, `UNITD UTIS SUPREME REPORTS`, and other pseudo-lettering; the held sheet also contains generated filler. This violates the locked “every word legible and correct” rule in a scene whose job is careful source checking. | TECHNICAL PASS ambient; source image fails |
| 31 | 577.00–582.40 | PASS — judgment-stays-yours emphasis matches narration | PASS static |
| 32 | 582.40–606.00 | PASS — Regina/Burn Book “are you sure?” pairing is correct, not Chutney | PASS static |
| 33 | 606.00–623.70 | PASS — Regina/Burn Book peer-review analogy remains correctly paired | PASS static |
| 34 | 623.70–650.00 | PASS — Nature fact card makes model-evaluation limits legible | PASS static |
| 35 | 650.00–673.00 | PASS — Stanford AI Index card supports sycophancy/false-belief claim | PASS static |
| 36 | 673.00–691.00 | PASS — KPMG card supports report/citation failure example | PASS static |
| 37 | 691.00–700.10 | PASS — “sources attached” versus “sources checked” distinction is exact | PASS static |
| 38 | 700.10–711.20 | PASS — Heroine/library/source labels support Prompt Like Elle | TECHNICAL PASS ambient |
| 39 | 711.20–736.10 | PASS — Move One asks for the exact source | PASS static |
| 40 | 736.10–754.80 | PASS — Move Two permits “I don’t know” and checks the source | PASS static |
| 41 | 754.80–779.70 | PASS — Move Three asks for the exact supporting line | PASS static |
| 42 | 779.70–813.40 | PASS — full Prompt Like Elle method page is correctly assembled | PASS static |
| 43 | 813.40–864.10 | PASS — cocktail/receipt analogy is semantically aligned | PASS static |
| 44 | 864.10–892.00 | PASS — repaired try-on card reads “I can…” / “I still…” with no doubled-I bars | PASS static |
| 45 | 892.00–930.00 | PASS — Heroine, Y2K clamshell and receipt-check scene remain coherent | TECHNICAL PASS ambient |
| 46 | 930.00–960.90 | PASS — no-invented-receipts rule supports the try-on assignment | PASS static |
| 47 | 960.90–1023.50 | PASS — sign-off reinforces verification without changing the lesson | PASS static |
| 48 | 1023.50–1047.98 | PASS — next-week card correctly points to Episode Four | PASS static |

## Cue 7 classification

**GENUINE DEFECT**, not an Ali taste decision.

The image itself is serviceable and the Heroine is recognisable. The defect is its clock job: the explicit `WELCOME BACK` card is exposed `7.780s` before the spoken welcome begins. The smallest repair is to hold cue 6’s reflective office/rain image through `116.180`, then hard-cut to the existing cue 7 card for `116.180–135.000`, preserving the narration and total runtime. No new art is required for this repair.

## Player, caption, mobile, keyboard, reduced-motion and failure readiness

This gate does not pass:

1. `watch.html` currently has `var EPISODE_FILMS = {};`. The v10 MP4 is not mounted in the film branch, so there is no actual Episode 03 v10 player occurrence to test. The public truth remains the cover-only audio edition.
2. The external Episode 03 VTT is structurally sound, complete to within `1.050s` of the MP4 tail, and mapped in `EPISODE_CAPTIONS`; however, the v10 film/VTT combination has not run in the actual player.
3. The film branch has a keyboard defect: the document-level Space handler calls `togglePlay()` on the page’s audio element (`tape`), not the dynamically created `<video>`. When the video has focus, Space is intercepted instead of reliably controlling the film.
4. The dynamically created film `<video>` has no film-specific `error` listener or cover-only fallback. A failed film URL can leave the mounted branch without the established failure behavior.
5. Mobile-friendly `playsInline`, native controls, 16:9 containment and CSS reduced-motion rules exist structurally, but no v10 mobile occurrence was available to test. The reduced-motion CSS suppresses still-scene CSS motion; it does not establish a tested v10-film alternative.
6. The available environment supported full decode, timing, loudness, silence, frame/crop and VTT analysis, but not an independently audible, human normal-speed playback of the 17:28 programme. That required gate remains unproved and cannot be inferred from decode.

## Smallest repair and retest

1. **Cue 7:** retain existing art; change only the occurrence boundary so the Welcome Back card begins at `116.180`.
2. **Cue 30:** repair only the malformed visible law-volume/document lettering in the still basis, preserving the admitted Heroine, pose, wardrobe, room, props and composition; rebuild its background-only loop from that repaired still.
3. Produce a new versioned MP4/manifest/QC/config tuple. Do not overwrite v10.
4. Bind the candidate only in a non-public review player and repair the film branch’s Space-key target and film-load failure fallback.
5. Independently repeat all 49 occurrence checks plus a full audible normal-speed actual-player watch with VTT on desktop and mobile, keyboard-only controls, reduced-motion, and forced media/VTT failure tests.

No site, release, deploy or public action is admitted by this verdict.

