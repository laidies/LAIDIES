# EMQ E02 v18 full audiovisual judge — 2026-07-26

**Handoff:** `WE-EMQ-E02-V18-FULL-AV-2026-07-26`  
**Judge:** Episode Media Quality (independent of `WE-MEDIA-E02-STILL-REPAIR-V18-2026-07-26`)  
**Completed:** 2026-07-26 PDT  
**Verdict:** **HOLD** — this is a checksum-bound local review judgment only. It is not release, deployment, site admission, animation approval, or a public-film claim.

## Frozen tuple: reproduced before review

| Item | Required SHA-256 | Independently recomputed | Result |
|---|---|---|---|
| MP4 `assets/video/episode-02-full-v18-still-only-repaired-review.mp4` | `97b32455ba6a6f0195d60646eeda3b5a2c558cef2b46cb8877a4d35e6346e1bc` | same | MATCH |
| Manifest `operations/video-qa/episode-02-full-v18-still-only-repaired-review-manifest.json` | `7e5aaee410d04bf109f9b60fa353ec972da81d7b41cd48d9bbf3fc6e981cc4c3` | same | MATCH |
| Maker QC `operations/video-qa/episode-02-full-v18-still-only-repaired-review-qc.json` | `1dc95997f32383ecc30f1cb7fc870973d38341ef21a601cd4bd7cd99d6e6d482` | same | MATCH |
| Builder `assets/video/build-episode-02-v18-still-only-repaired.py` | `3b2705ebaa4d665b0288d8f50ebb8376032a131d81c65bb5e518f93af951dc0e` | same | MATCH |
| Config `assets/video/episode-02-v18-still-only-repaired-config.json` | `4eaceebde6bbd979b506a5ad149fb537b6efbba8c9f421e95bd3a2e2b4972884` | same | MATCH |

The frozen manifest is valid JSON, binds 61 contiguous placements from `0.000` to `987.480` seconds, binds the admitted Cue 13 v01 at `187.600–203.300`, and records the five authorized changes (0/4/5/6/13). No byte mismatch was found; a changed byte would require a new judge trigger.

## Technical and clock evidence

- Delivery probe: 1920×1080, H.264 video, AAC mono audio; Finder metadata duration `987.426333 s` (16:27.426), consistent with the builder's 30-fps packet target `987.466667 s` and the rounded production clock `987.48 s` (16:27.47).
- The MP4 has video and audio streams only. There is no subtitle stream; the picture samples show no player-style burned caption overlay. Designed title/text cards are source artwork, not captions.
- The external VTT hash matches its bound value: `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`. It has 194 chronological cues, begins `00:00.000`, and ends `16:26.670`, leaving `0.756 s` after the final caption. The last narrated cue ends at that VTT endpoint; the remaining candidate tail requires player review but does not establish a caption-content omission from the file alone.
- Independent packet comparison found v18's AAC packet payload sequence identical to v17's bound clocked narration stream: 46,288 packets; SHA-256 over the concatenated demuxed AAC payloads `dcf2b7e205bf48166c2efe65785917342ccaa74c64df3e49ba24f09e8cb355e2`; initial PTS `-1024, 0, 1024` at 48 kHz. This supports the unchanged narration clock, not a public-player caption pass.
- The builder/config prohibit `zoompan`, crop, pan, rotate, scroll and camera transforms; all 61 entries declare `mode: still`. The maker QC reports no black frames and two interior-frame still controls for all 61 placements. The extracted review frames corroborate intentional still composition, with no observed crop/zoom drift at the sampled midpoints. This is construction/inspection evidence only and does not cure the visual-quality failures below.

## Complete VTT → picture matrix

`Aligned` means the displayed idea is materially related to the concurrent VTT. `Partial` means a title card, generic location, or broad callback leaves a current narrated detail unexplained; it is not a pass for the stricter shot-job contract. `Fail` means the visible image persists from a prior idea or does not explain the concurrent line. Every row remains **image/style FAIL** where noted in the next section.

| Cue / clock | Bound picture | VTT/picture semantic ruling |
|---|---|---|
| 00 · 00:00–00:10 | previously strip | Aligned — Episode 1 recap. |
| 01 · 00:10–00:20 | AI-new-hire office | Aligned — recap/new-hire idea. |
| 02 · 00:20–00:31.40 | Episode 2 title | Partial — title over the vague-ask/delegation setup. |
| 03 · 00:31.40–00:38 | cold-open office | Partial — title/cold-open bridge, then paragraph line arrives. |
| 04 · 00:38–00:58.50 | cold-open desk comic | Aligned — empty jargon output and staring contest. |
| 05 · 00:58.50–01:18.10 | yesterday/today comic | Aligned — contrasting prior success and current failure. |
| 06 · 01:18.10–01:26.80 | thinking close-up comic | Aligned — why AI sometimes appears to read her mind. |
| 07 · 01:26.80–01:45 | yellow-jacket café/question bubble | **Fail** — old “why does AI…” bubble remains while the narration has moved to the LAiDIES welcome and last-week try-on. |
| 08 · 01:45–01:59.10 | AI-new-hire office | Partial — tool/ask transition, but it does not explain the current “your half of the conversation” detail. |
| 09 · 01:59.10–02:15 | Blend & Snap interior | Aligned — narrator goes to the café. |
| 10 · 02:15–02:31 | lazy ask / wall of text | Aligned — side-by-side bad output. |
| 11 · 02:31–02:49.70 | useful answer / cards | Aligned — missing detail and what a prompt is. |
| 12 · 02:49.70–03:07.60 | theater-kids card | Aligned — prompt/theater-kids origin and coffee-order lead-in. |
| 13 · 03:07.60–03:23.30 | accepted regular→new café v01 | Aligned — regular-café versus unknown-context analogy. |
| 14 · 03:23.30–03:39 | “the usual” card | Aligned — blank look/plain drip consequence. |
| 15 · 03:39–03:55.60 | generic cold-open office | **Fail** — “job, reader, meeting/calendar” context is spoken but not shown; the repeated office is a generic mood hold. |
| 16 · 03:55.60–04:12.20 | prompting card | Partial — slogan covers the transition, not the remember/stranger explanation. |
| 17 · 04:12.20–04:27.90 | assume-it-forgot card | Partial — correct maxim, no visual of the current-chat/remember distinction. |
| 18 · 04:27.90–04:43.60 | assume-it-forgot card | Partial — the Spice Girls setup is unillustrated. |
| 19 · 04:43.60–04:59.55 | Spice Girls principle card | Aligned — lyric/specifics point. |
| 20 · 04:59.55–05:15.50 | Spice Girls/David title art | Aligned — AI needs precise requests; David Rose introduction. |
| 21 · 05:15.50–05:35.75 | David Rose still | Aligned — David Rose exception/specificity. |
| 22 · 05:35.75–05:56 | specifics card | Partial — “fold in the cheese” example is only named, not explained visually. |
| 23 · 05:56–06:16.35 | who/what/tone/length café | Aligned — explicit cooking/briefing instructions. |
| 24 · 06:16.35–06:36.70 | prompting-is-delegation card | Partial — moves through confession/search-versus-briefing without visual demonstration. |
| 25 · 06:36.70–06:53.35 | who/what/tone/length café | Aligned — briefing questions. |
| 26 · 06:53.35–07:10 | delegation card | Aligned — prompting is delegation. |
| 27 · 07:10–07:31.50 | card/study-pack wording | Partial — example/match-this mechanism is narrated but not demonstrated. |
| 28 · 07:31.50–07:53 | who/what/tone/length card | Partial — twelve-page policy setup and useful comparison are unshown. |
| 29 · 07:53–08:14 | lazy ask / wall of text | Aligned — vague policy ask and unusable wall. |
| 30 · 08:14–08:35 | lazy-ask card | Partial — detailed failure and Ross analogy reduce to a label. |
| 31 · 08:35–08:55 | who/what/tone/length café | Aligned — narrated senior-manager brief. |
| 32 · 08:55–09:15 | useful-answer card | Partial — successful subject/bullets/exemption are not shown. |
| 33 · 09:15–09:37.50 | useful-answer café | Aligned — contractor-exemption result. |
| 34 · 09:37.50–10:00 | useful-answer card | Partial — reading-job/exemption payoff reduces to title text. |
| 35 · 10:00–10:17.30 | KSVL exterior | Partial — confidence/revision is narrated; only a broad radio callback is shown. |
| 36 · 10:17.30–10:34.60 | radio-request card | Partial — record-store/radio analogy is title-only. |
| 37 · 10:34.60–10:51.90 | proof card | Partial — LIBRAiRY research transition is unshown. |
| 38 · 10:51.90–11:14 | LIBRAiRY interior | Partial — research setting fits, but the 700-consultant/faster/quality evidence has no visible evidence binding. |
| 39 · 11:14–11:35.70 | statistics card | Partial — figures are presented, but the concurrent winner/briefing mechanism is not shown. |
| 40 · 11:35.70–11:57.40 | statistics card | Partial — Mollick attribution/quote is title-only. |
| 41 · 11:57.40–12:04.40 | soft-skills card | Partial — message fits but the “woman ahead of guy” contrast is unshown. |
| 42 · 12:04.40–12:21.20 | senior-women meeting | Partial — broadly supports the claim; no direct reader/judgment action is shown. |
| 43 · 12:21.20–12:38 | skills-that-win card | Aligned — current conclusion. |
| 44 · 12:38–12:54.80 | AI-new-hire office | Partial — broad new-hire callback, no actual hard+soft-skill demonstration. |
| 45 · 12:54.80–13:11.60 | cocktail-party card | Aligned — cocktail-party explanation introduction. |
| 46 · 13:11.60–13:28 | cocktail-party group | Aligned — prompt-as-delegation explanation at a party. |
| 47 · 13:28–13:40.70 | delegation quote card | Partial — fold-the-cheese qualifier is unshown. |
| 48 · 13:40.70–13:53.40 | delegation quote card | Partial — friend/postcard transition is unshown. |
| 49 · 13:53.40–14:09.15 | Post Office exterior | Aligned — postcard/bring-your-people line. |
| 50 · 14:09.15–14:24.90 | better-with-your-people card | Partial — try-on/site instruction is unshown. |
| 51 · 14:24.90–14:36.95 | ask-twice card | Aligned — read/listen and before/after instruction. |
| 52 · 14:36.95–14:49 | ask-twice card | Partial — lazy way is named but not shown until Cue 53. |
| 53 · 14:49–15:04 | lazy ask / wall of text | Aligned — first lazy pass. |
| 54 · 15:04–15:22 | useful answer / cards | Aligned — specific second pass and platform prompts. |
| 55 · 15:22–15:33 | Blend & Snap exterior | Aligned — study-pack location. |
| 56 · 15:33–15:44 | SUNNYVAiLE High exterior | Aligned — pop quiz/high-school location. |
| 57 · 15:44–15:53 | KSVL exterior | Partial — KSVL fits first line; Makeover/residence-card line begins before its image arrives. |
| 58 · 15:53–16:01.30 | Makeover on Main exterior | Aligned — residence-card instruction. |
| 59 · 16:01.30–16:12.20 | closing quote card | Partial — final line begins next-episode setup before the closing quote card clears. |
| 60 · 16:12.20–16:27.48 | Burn Book / computer still | Aligned — Episode 3 teaser and consequence. |

## Image, identity, location and brand-continuity failures

**Candidate-wide failure — FIX BEFORE LAUNCH.** The opening/current episode source system mixes sharp, graphic comic cards with painterly/photoreal scenic and office frames. This violates the locked single people/illustration system and creates repeated within-film rendering/identity/background drift. It cannot be accepted as one coherent LAiDIES episode simply because the card frames are individually readable.

Exact affected occurrences: `00:10–00:20` Cue 01; `00:31.40–00:38.00` Cue 03; `01:26.80–01:45.00` Cue 07; `01:45–01:59.10` Cue 08; `01:59.10–02:15` Cue 09; `02:15–02:31` Cue 10; `02:31–02:49.70` Cue 11; `03:39–03:55.60` Cue 15; `05:15.50–05:35.75` Cue 21; `05:56–06:16.35` Cue 23; `06:36.70–06:53.35` Cue 25; `07:53–08:14` Cue 29; `08:35–08:55` Cue 31; `09:15–09:37.50` Cue 33; `10:00–10:17.30` Cue 35; `10:51.90–11:14` Cue 38; `12:04.40–12:21.20` Cue 42; `12:38–12:54.80` Cue 44; `13:11.60–13:28` Cue 46; `13:53.40–14:09.15` Cue 49; `14:49–15:04` Cue 53; `15:04–15:22` Cue 54; `15:22–15:33` Cue 55; `15:33–15:44` Cue 56; `15:44–15:53` Cue 57; `15:53–16:01.30` Cue 58; and `16:12.20–16:27.48` Cue 60.

The five maker changes are byte-bound as specified. Cue 13's accepted two-café comparison remains a strength at `03:07.60–03:23.30`; it is not a license to retain the rest of the unadmitted recurrent source set. The whole review cut remains visually off-register because the repair did not include a 61-occurrence image admission and did not make the continuing scenes share the accepted comic treatment.

## Required repair ownership and retest

| Issue | Exact scope | Narrow owner | Retest / definition of done |
|---|---|---|---|
| Mixed people/environment illustration system | Candidate-wide; exact occurrences listed above | Image Production Director, then independent Image Quality Judge | Bind every one of 61 rendered occurrences to approved identity, location, prop/costume and master-style references; replace only independently failed sources; rejudge full-frame and face/detail crops. |
| Picture outlives or under-explains narration | Cues 07, 15 and every `Partial` row in the matrix | Story/Continuity Editor + Video Editor | Produce an as-recorded-audio cue/job map; each displayed shot must establish/explain/compare/demonstrate/reinforce/transition the concurrent line. Independent rewatch of every cue boundary. |
| Still-only motion/transition evidence | All 61 placements | Video Editor + independent Motion Quality Judge | Preserve true-still intent or declare a narration-motivated motion event; independently decode and compare interior frames/transition boundaries against a true-still control. No camera transform may substitute for action. |
| Caption/player behavior | Exact VTT and eventual player only | Audio & Caption Owner + Release QA | Verify visual caption bar below picture, keyboard/mobile/reduced-motion and the final `0.756 s` tail on the actual player. This MP4-only review cannot prove it. |

## Evidence limits and status truth

Four delivery-size midpoint review sheets (`emq-e02-v18-cues-00-15-midpoints.png`, `...16-31...`, `...32-47...`, `...48-60...`) were derived from the checksum-matched MP4 and inspected. They make the repeated source/style and semantic-hold failures reproducible.

This environment supports deterministic stream inspection, VTT parsing, packet comparison and delivery-size frame extraction. It did **not** provide a trustworthy audible normal-speed playback/actual player surface to the independent judge: decoder/ASR full-run attempts did not yield a reliable complete result. Therefore no claim is made that a human has heard all 16:27.47 at normal speed or that external captions have been exercised in the player. That evidence limitation alone prevents ACCEPT; it does not weaken the independently observed visual HOLD failures.

**Current public truth remains:** illustrated, narrated, captioned listen-alongs only. The frozen v18 MP4 is **HOLD / local review candidate**, not an approved motion film.

## Learning scan

No new painpoint-log entry was appended: the operative failures are direct repetitions of already-binding media rules (especially BTB-032/035/039/094/095 and the v18 export control BTB-159). Prevention rule reaffirmed: a technically valid, still-only export and a few repaired sources never substitute for the full checksum-bound image/semantic/normal-speed player review.
