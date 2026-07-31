# EMQ E02 v19 player-witness independent verdict

**Task:** `EMQ-E02-V19-PLAYER-WITNESS-INDEPENDENT-VERDICT-2026-07-26`  
**Judged at:** `2026-07-26T17:37:11-07:00`  
**Judge:** Episode Media Quality, independent of the maker  
**Verdict:** **HOLD**

The exact supplied tuple is not accepted. The MP4, VTT and witness-surface
bytes match the frozen hashes, and a real HTML5 player run proved unmuted
normal-speed playback with non-zero audio telemetry. It also proved two
external-caption defects on the supplied witness surface: captions do not load
on the initial advertised “Captions on” state, and after the track is activated
the visible read-along rail exposes raw WebVTT voice markup such as
`<v The Announcer>` and `<v The Heroine>`.

No full human audible listen of all `16:27.47` was completed. Automation and
audio RMS are not a substitute for a person hearing and judging every spoken
word at normal speed.

## Exact frozen tuple

| Artifact | Frozen SHA-256 | Independent result |
|---|---|---|
| `assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4` | `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` | exact match |
| `assets/captions/episode-02.vtt` | `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f` | exact match |
| `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness.html` | `7c6f1509b8d204d6316e5b0614d97b7db2dac904065119f7aea8d3618132630b` | exact match |

This verdict binds the unchanged tuple above. It does not reopen the v19
file/visual findings already ruled in
`emq-e02-v19-full-av-judge-2026-07-26.md`.

## Actual-player evidence

The supplied witness HTML was served unchanged from a local HTTP origin and
opened in the Codex in-app Chromium browser.

| Gate | Evidence | Ruling |
|---|---|---|
| Initial player readiness | MP4 reached `readyState=4`, duration `987.466667`, playback rate `1`, unmuted, volume `1`. | **PASS** |
| Normal-speed audible sample | The supplied “Play at normal speed” control produced advancing playback at `1×`, `muted=false`, `volume=1`, with `peakAudioRms=0.23388` in the first sample. | **TECHNICAL SAMPLE PASS / NOT A FULL HUMAN LISTEN** |
| Initial external-VTT state | The visible button was pressed and labelled “Captions on”, but the text track remained `disabled`, no VTT request occurred, and the rail stayed “Captions loading…” until the control was toggled off and on. | **FAIL** |
| Active external-VTT rendering | After activation, the track loaded from the exact VTT and cues advanced. The custom rail uses `cue.text`, so raw voice markup was visibly printed, including `<v The Announcer>` and `<v The Heroine>`. | **FAIL** |
| Desktop layout | Player, rail, controls, status and tuple binding were visible without detected horizontal overflow. | **PASS within tested viewport** |
| Mobile/reflow | At `320×700`, document width and scroll width were both `320`; the main/video/rail were `288 px` wide, and both buttons exceeded `44 px` height. | **PASS** |
| Keyboard | Native-video `Space` paused playback at the current clock. `ArrowRight` and `End` did not change the clock in this harness. The custom play control has no pause behavior. | **PARTIAL / HOLD** |
| Reduced motion | Source CSS removes animation and transition under `prefers-reduced-motion`; the page itself adds no decorative animation. The browser run did not provide a trustworthy reduced-motion emulation toggle. | **SOURCE-ONLY EVIDENCE / UNWITNESSED** |
| Caption failure | With `?failCaptions=1`, once the track was activated, the rail visibly reported “Read-along captions failed to load” and status reported `playbackAvailable=true`. | **PASS after activation; initial-loading defect remains** |
| Tail | The file-only record says VTT ends about `0.797 s` before picture. No trustworthy full run through the tail was completed. | **UNWITNESSED** |
| Complete audible content | No person independently heard the complete narration at normal speed in this judge turn. | **AUTOMATIC HOLD** |

## Bound visual evidence

- `emq-e02-v19-player-witness-desktop-2026-07-26.png`  
  SHA-256 `a9f5c5dba6ef47c503939311d9b965eb058a91992d0f896ca41a5f2a9d058b74`
- `emq-e02-v19-player-witness-mobile-320-2026-07-26.png`  
  SHA-256 `d5776ce9480598ba4217d7aad7cb7333d3c49937f35fa7e18065244f46cfe998`

The mobile capture visibly records the raw `<v The Heroine>` markup while
playback is advancing at normal speed.

## Exact unblock and authority truth

**Repair owner:** Audio & Caption Owner + Release QA, under the Weekly Episodes
Director.

**Exact next action:** produce a successor non-public witness surface that:

1. loads and activates the exact unchanged VTT on first render when the control
   says “Captions on”;
2. renders cue text without exposing WebVTT tags, preferably from sanitized
   cue HTML rather than raw `cue.text`;
3. provides keyboard play/pause and seek behavior;
4. visibly proves mobile/reflow, reduced-motion, caption/media failure and the
   final tail; and
5. is used by an external human witness to hear all `16:27.47` at `1×`,
   unmuted, while confirming picture/caption/narration continuity.

Return the unchanged MP4/VTT hashes, the new witness-surface hash, the human
witness identity/role and timestamp, and literal pass/fail observations to
Episode Media Quality.

**Acceptance owner:** Episode Media Quality, independent of the maker, after
the complete successor evidence returns. Control Room and the Weekly Episodes
Director retain integration/release sequencing. No Ali decision, site
integration, deployment, publication or public-media mutation is authorized
or implied.

## Learning scan

**Qualifying learning found:** a control can visibly claim captions are on
while the browser track is still disabled, and a loaded VTT can still fail the
reader because raw cue markup is exposed. The prevention rule is to assert the
initial track mode, first network/load event and rendered text content—not only
the presence of a `<track>` node or later cue activity.

The collision boundary permits only new independent evidence and one Control
Room handoff, so the canonical `operations/painpoints-log.md` was not edited.
Control Room should record this rule after reconciling the handoff. Possible
Behind the Build angle: “The captions loaded—and still printed the code.”
