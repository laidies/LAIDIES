# EMQ E02 v19 full audiovisual judge — 2026-07-26

**Candidate:** `assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4`  
**Judge:** Episode Media Quality, independent of the maker  
**Verdict:** **HOLD** — the repaired visual candidate is materially improved and the named v18 visual holds are cleared, but this is not an acceptance because normal-speed audible playback and actual-player caption behavior could not be independently witnessed in this environment.

## Exact frozen tuple

All supplied bytes were independently recomputed before viewing and match exactly:

| Item | SHA-256 |
|---|---|
| MP4 | `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` |
| Manifest | `d1a0234cf467595ccf36efc80d34c030758fce5687d7ab7e89a94133fcb4eace` |
| Maker QC | `8f6ea66b63f0f269a5ae89fc4f8fe9faf48b975647b857415684ad1894231937` |
| Builder | `d41678a09a2ae4e4430b700b81469161179e6120e3fd4d4fa8d3c3d08fae5986` |
| Config | `3e8e886010d29417737417abbae84137fb6536bb086646d3ad65eddcc09cb8f4` |

The bound JSON records 61 contiguous still placements, `0.000–987.480 s`, with 30 fps and 0.35-second alpha transitions only. The candidate metadata identifies 1920×1080 H.264 picture and mono AAC narration; the maker QC records a complete decode, no black events, and 61 still-frame controls (maximum mean pixel difference `2.261329`, under its stated 3.0 envelope). The builder/config forbid crop, pan, zoompan, rotate, scroll and camera transforms. No sampled delivery-size frame showed a crop, zoom or camera-drift event.

The canonical external VTT hash is reproduced as `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`: 194 chronological cues, `00:00.000–16:26.670`. The MP4 has no subtitle stream and no player-style burned captions in the inspected frames; designed comic text is source artwork. The manifest binds unchanged narration `7140e8d469ab02e7b9d9d8c03b3c2c3d3c574570e0827afead778f7e05b85449` and the clocked v17 AAC payload checksum `ef3754574b72fce8fba9bfad5545efc65c6062dcbd0c72b5590de0ee9d1a014e`.

## V18 HOLD repair ruling

| Prior hold | Exact v19 occurrence | Ruling |
|---|---|---|
| Cue 07 was a stale question-bubble/café hold during the welcome/last-week bridge. | `01:26.80–01:45.00` | **PASS.** New town/welcome page visibly says “Welcome back to LAiDIES,” shows SUNNYVAiLE locations, and carries the narration into the last-week try-on. |
| Cue 15 was a generic office hold during the missing-context explanation. | `03:39.00–03:55.60` | **PASS.** New “CONTEXT” card names the current narrated elements: job, reader, meeting and goal. |
| 27 scenic/mixed-style occurrences made v18 visually discontinuous. | Maker-bound 27 occurrence set, including 01, 03, 07–11, 15, 21, 23, 25, 29, 31, 33, 35, 38, 42, 44, 46, 49, 53–58 and 60 | **VISUAL PASS AT REVIEW-SHEET SCALE.** They now share a crisp black-ink, high-colour comic grammar with the existing cards. The heroine remains recognisable through blonde waves, blue/checked visual continuity and the episode’s illustrated face treatment. No recurrence of the v18 painterly café/library/building frames was observed in those exact windows. |
| Cue 13 regular/new café comparison | `03:07.60–03:23.30` | **PASS / retained.** The previously admitted v01, SHA `1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13`, remains bound and semantically exact. |

## Complete 61-occurrence narration/VTT/picture review

All 61 windows were reviewed against the exact VTT timing and their bound image. `PASS` means the picture establishes, explains, compares, demonstrates, reinforces or deliberately bridges the concurrent narration; `BRIDGE` is a deliberate graphic reinforcement rather than a literal illustration.

| Cues | Clock | Ruling |
|---|---|---|
| 00–06 | 00:00–01:26.80 | **PASS.** Recap, new-hire premise, title, jargon failure, yesterday/today contrast and central question are correctly sequenced. |
| 07 | 01:26.80–01:45 | **PASS.** Corrected welcome/try-on bridge. |
| 08–15 | 01:45–03:55.60 | **PASS.** Ask/tool transition, Blend & Snap scene, bad/good outputs, theater-kids prompt, admitted café comparison, “usual,” then corrected missing-context explanation. |
| 16–20 | 03:55.60–05:15.50 | **BRIDGE/PASS.** The repeated “assume it forgot” and Spice Girls principle cards reinforce the current memory/specificity instruction. |
| 21–26 | 05:15.50–07:10 | **PASS.** David Rose specificity, briefing checklist, match-this example and delegation conclusion. |
| 27–30 | 07:10–08:35 | **BRIDGE/PASS.** Study-pack/example and lazy-ask cards bridge into the concrete policy failure, which is shown at Cue 29. |
| 31–35 | 08:35–10:17.30 | **PASS.** Full brief, useful answer/exemption, reading-job payoff and revision/radio continuation are materially pictured. |
| 36–41 | 10:17.30–12:04.40 | **BRIDGE/PASS.** Radio, research and evidence cards follow the narration; Cue 38’s Harvard/BCG graphic carries the stated cohort and qualified ~25%/~40% finding. |
| 42–47 | 12:04.40–13:40.70 | **PASS.** Skills-that-win, hard-plus-soft conclusion, cocktail-party explanation and prompt-as-delegation are visually reinforced. |
| 48–51 | 13:40.70–14:36.95 | **PASS.** Friend/postcard, Post Office, invitation and ask-twice/read-along sequence are aligned. |
| 52–55 | 14:36.95–15:33 | **PASS.** The try-on graphic makes the two-pass task and “specific, not smarter tool” outcome explicit, followed by Blend & Snap. |
| 56–60 | 15:33–16:27.48 | **PASS.** High/KSVL/Makeover route, closing maxim and Episode 3 teaser align with the current VTT. |

## Remaining acceptance blocker

This evidence environment permits checksum checks, manifest/VTT parsing, stream metadata inspection and delivery-size frame extraction. It does **not** expose trustworthy audible normal-speed playback or the actual player surface. I therefore cannot independently state that a listener heard all 16:27.47 at normal speed, nor that the external VTT is rendered below picture with keyboard/mobile/reduced-motion/failure behavior on the eventual player. The `0.756 s` post-VTT video tail is also not a proven player behavior from a file-only inspection.

That is an automatic acceptance limitation under the Episode Media Quality charter. It is not a finding that the narration/VTT bytes are wrong, and it does not reopen the v18 visual/style/semantic holds listed above.

## Exact next gate

**Audio & Caption Owner + Release QA:** use this exact MP4 and exact VTT hash for a witnessed normal-speed listen and actual-player caption test (caption below picture; keyboard, mobile/reflow, reduced motion and tail behavior). If that passes without changing any frozen byte, return the result to Episode Media Quality for the bounded acceptance decision. Any changed byte requires a new tuple and re-review.

**Current truth:** v19 remains a checksum-bound local review candidate. It is not an approved motion film, release candidate, deployed asset or public availability claim.

## Learning scan

No new qualifying learning was added. This rejudge confirms BTB-159’s existing rule: packet/stream, still-frame and visual-source evidence do not replace an independent, witnessed complete audiovisual/player gate.
