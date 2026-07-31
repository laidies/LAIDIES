# EMQ Episode 01 v24 independent judge

**Task ID:** `EMQ-E01-V24-INDEPENDENT-JUDGE-2026-07-26`  
**Judge:** Episode Media Quality — independent of the v24 maker  
**Judged at:** `2026-07-26T16:28:26-07:00`  
**Verdict:** **HOLD**

The exact v24 tuple is not admitted for assembly, release, deployment or public
use. The bounded cue-3 title-card repair is technically sound and materially
better, but the frozen candidate still contains confirmed visual-system and
period-technology failures in unchanged placements. Exact public-player
playback of this film also remains unproved.

## Frozen tuple

| Artifact | Exact SHA-256 | Judge result |
|---|---|---|
| `assets/video/episode-01-full-v24-source-reconciled-review.mp4` | `272d370ee741d777bc355ea869e63bf4541e0765d3be7bcca286ad79c4c7a53e` | matched |
| `assets/video/build-episode-01-v24-source-reconciled.py` | `1f22ddafea578f7ff102cdc76c9dd2e243cb2c09445473dcd99920f17ab9bb69` | matched |
| `assets/video/episode-01-v24-source-reconciled-config.json` | `31f96a6737906a41644d89eec86c55f393b9611cb67b90ca0d08c2dc24887137` | matched |
| `operations/video-qa/episode-01-v24-71-placement-manifest.json` | `6c66edeb60ca008e095a851df4cbcf76c7fdfb3ed55426f8010a858ec73b3487` | matched |
| `operations/video-qa/episode-01-v24-maker-qc.json` | `b60d6cb0428dad09ce0eebe2638915a2be16b0528a11257c9f3633fb911431b8` | matched |

The dispatch named
`operations/video-qa/episode-01-v24-source-reconciled-qc.json`; that path does
not exist. The supplied QC hash resolves exactly to the maker-authored path
recorded in the v24 config and builder:
`operations/video-qa/episode-01-v24-maker-qc.json`. This filename mismatch
must be corrected in the handoff record; it did not change which bytes were
judged.

The judged MP4 is 1920×1080 H.264 High at 30 fps with mono 48 kHz AAC,
duration `00:19:32.23`, size `167536211` bytes, and local artifact timestamp
`2026-07-26T14:59:47-07:00`.

## Checks performed

- Recomputed the five frozen-tuple hashes above.
- Recomputed all 71 manifest source bindings: **71/71 exact hashes matched**.
- Completed a full machine decode of the MP4: **PASS**, no decode errors.
- Extracted the v23 and v24 AAC payloads with stream copy and compared exact
  bytes: both SHA-256
  `0572c2c9f1d568004155684ecf155f702af4d9b31a7eac57a12eca88d385db24`;
  byte comparison passed.
- Inspected all 71 placements in four continuity sheets, then inspected the 12
  unique people-scene sources at enlarged source scale against
  `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`
  (`c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422`).
  Repeated sources cover all 16 identity-bearing placements.
- Inspected cue 3 at `20.80`, `21.20`, `24.00`, `27.40`, `27.70`, and `28.00`
  seconds.
- Parsed the external VTT: 246 positive, monotonic, non-overlapping cues from
  `00:00:00.000` to `00:19:31.420`; its bytes exactly match the public asset
  `assets/captions/episode-01.vtt`; the final cue ends 0.81 seconds before the
  MP4.
- Inspected the Screening Room implementation for caption loading,
  keyboard-seek controls, reduced-motion CSS, retry/failure handling and
  responsive layout. These mechanisms exist in source, but the exact v24 film
  is deliberately not bound because `EPISODE_FILMS` is empty.

No trustworthy audible normal-speed / exact-player film run was available in
the judge environment. The complete visual clock, source occurrence map,
caption clock and exact audio payload were checked, but this limitation remains
a release gate rather than being reported as a successful normal-speed AV watch.

## Findings

### 1. Confirmed SUNNYVAiLE period-technology failure — automatic HOLD

Placements **29**, **30**, and **61** reuse:

`assets/video/episode-01-full-scene-replacements-v2/ep01-heroine-blend-snap-email-v1.png`

SHA-256
`64effff06cbe474833fdfe17248c89b5410aa8df6db3100d79cc284975a88103`.

Exact windows:

- placement 29: `434.90–455.70`
- placement 30: `455.70–474.35`
- placement 61: `996.30–1025.00`

The source depicts the Heroine inside Blend & Snap using a slim, flat,
rectangular modern laptop. SUNNYVAiLE is locked to 1999. A laptop in town must
be a chunky, coloured, curved iBook G3 clamshell with a visible handle; modern
slim laptops are explicitly prohibited. This is the previously unresolved
historical concern now proved in the exact v24 occurrence map.

**Smallest repair:** replace this one source with one admitted 1920×1080
Blend & Snap still that keeps the approved Heroine identity and yellow episode
outfit, preserves the café job, and uses the locked clamshell iBook. Applying
that single admitted source at placements 29, 30 and 61 fixes all three current
occurrences without changing their clock or audio.

### 2. Master people-style failure persists across unchanged scenic sources

The enlarged people-source comparison does not place the unchanged scenic set
beside the locked master. The master requires variable-width black ink,
directional hair strokes, crisp anatomy and multiple faceted hard-edged shadow
planes, with no soft digital-paint blending, photorealism or generic cinematic
comic treatment.

Confirmed off-register placements include **14, 25, 29, 30, 34, 38, 43, 45,
48, 50, 57, 61 and 70**. They use soft/painterly, pixel-painted or
photoreal/cinematic construction instead of the locked adult graphic-novel
people register. Placements 29/30/61 also carry the tech failure above.

This produces the same “two shows spliced together” problem already recorded
for the earlier master: cream comic emphasis cards alternate with materially
different scenic rendering. Camera motion is disabled, correctly, but stillness
does not make off-register art admissible.

**Smallest repair:** do not rerender the whole film blindly. Admit replacements
source-by-source, beginning with the one-source/three-occurrence Blend & Snap
repair, then replace only the exact off-register scenic sources above. Each new
source requires full-frame plus identity-crop Episode Media Quality admission
before any new assembly.

### 3. Cue-3 repair passes its bounded image and transition check

The new title source
`assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png`,
SHA-256
`ec54e84816676054b4d651cf0d51bd4e2742a97bab9659c558cc872bc0c06957`,
is a legible Episode 01 comic-cover composition with period CRT hardware and
exact readable episode wording. The incoming and outgoing 0.35-second dissolves
are continuous; no black frame, scale jump, aspect error or audio discontinuity
was found.

**Ruling:** cue 3 itself is eligible to carry forward unchanged into the next
repair cut. This local pass does not admit the complete v24 film.

### 4. Baked-card treatment remains a candidate-wide visual risk

Forty-five placements use the same rounded cream text-panel treatment. The
copy sampled in the full continuity review is readable and the external VTT is
not burned over the picture, but the repeated generic box treatment does not
demonstrate the varied comic lettering, bursts, hierarchy and deterministic
caption separation required by the visual lock. This is especially visible
when the cards alternate with the scenic style failures above.

**Smallest repair:** preserve exact copy and the admitted external VTT clock.
Review the repeated card system as its own checksum-bound image set against
`operations/reference/font-and-text-emphasis/` and
`operations/reference/comic-text-emphasis/`; do not solve it by burning VTT
captions into the MP4.

### 5. External VTT structure passes; exact film-player readiness does not

The VTT bytes, monotonic timing and near-full duration coverage pass the static
check. The player source contains keyboard play/seek, reduced-motion,
caption-load failure, media-load failure and retry mechanisms.

The exact v24 film is not mounted in that player, so no mobile, keyboard,
reduced-motion, caption rendering, seek/resume or failure-recovery journey has
been executed against this checksum. Public truth correctly remains the
illustrated listen-along.

**Smallest repair/test after image admission:** mount the next exact checksum in
a non-public review harness with the existing external VTT, then record one
desktop keyboard run, one mobile run, one reduced-motion run, and deliberate
media/VTT failure recovery. Do not change `EPISODE_FILMS` or publish from this
judge task.

## Verdict and route

**HOLD.**

The next maker is Episode 01 Image Production, not Video Assembly. Produce the
single Blend & Snap/Y2K-laptop replacement first and route its exact path and
SHA-256 to independent Episode Media Quality image admission. Continue
source-by-source admission for the remaining confirmed off-register scenic
sources. Only after those image gates pass may a clock-preserving still-only
repair cut return for another independent full-film and exact-player review.

No maker bytes, site, release, schema, deploy or public file was changed by this
judge.

## Learning scan

No new painpoint entry is required. The failures are direct recurrences of
existing prevention rules: `BTB-094` (assembled episodes become two visual
shows when per-shot reference admission is not blocking) and `BTB-095`
(repair the exact source occurrence, not an asset name or unrelated reuse).

