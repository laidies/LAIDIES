# Episode 02 v18 → independent Episode Media Quality judge

**Handoff ID:** `WE-EMQ-E02-V18-FULL-AV-2026-07-26`
**Status:** `RUNNING — EXACT FROZEN TUPLE DISPATCHED TO INDEPENDENT JUDGE`
**Evidence time:** `2026-07-26T13:16:54-07:00`
**Maker task:** `WE-MEDIA-E02-STILL-REPAIR-V18-2026-07-26`
**Maker craft task:** `019f8f42-1672-7d03-9059-250eccbfb3ad`
**Judge task:** `/root/emq_e02_v18_judge`
**Acceptance owner:** Episode Media Quality

## Literal output

Episode 02's complete still-only, no-camera-drift v18 review cut is built
locally. The maker returned this immutable review tuple:

| Role | Exact path | SHA-256 |
|---|---|---|
| Review MP4 | `assets/video/episode-02-full-v18-still-only-repaired-review.mp4` | `97b32455ba6a6f0195d60646eeda3b5a2c558cef2b46cb8877a4d35e6346e1bc` |
| Manifest | `operations/video-qa/episode-02-full-v18-still-only-repaired-review-manifest.json` | `7e5aaee410d04bf109f9b60fa353ec972da81d7b41cd48d9bbf3fc6e981cc4c3` |
| Maker QC | `operations/video-qa/episode-02-full-v18-still-only-repaired-review-qc.json` | `1dc95997f32383ecc30f1cb7fc870973d38341ef21a601cd4bd7cd99d6e6d482` |
| Builder | `assets/video/build-episode-02-v18-still-only-repaired.py` | `3b2705ebaa4d665b0288d8f50ebb8376032a131d81c65bb5e518f93af951dc0e` |
| Config | `assets/video/episode-02-v18-still-only-repaired-config.json` | `4eaceebde6bbd979b506a5ad149fb537b6efbba8c9f421e95bd3a2e2b4972884` |

All five hashes were reproduced by Weekly Episodes before dispatch. This
proves tuple identity only; it is not audiovisual acceptance.

The bound manifest reports:

- 1920×1080 H.264 at 30 fps;
- AAC mono narration at 48 kHz;
- 61 still placements;
- production stop `987.48` seconds / expected 16:27.47 clock;
- no subtitle stream and no burned captions;
- VTT `operations/captions/episode-02.vtt` at
  `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f`;
- narration master `content/music/public/episode-02-narration.m4a` at
  `7140e8d469ab02e7b9d9d8c03b3c2c3d3c574570e0827afead778f7e05b85449`;
  and
- admitted cue 13 v01 source at
  `1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13`.

## Independent judge action

The judge must first reproduce the tuple. Against the exact MP4, at normal
speed and delivery size, judge:

1. complete narration/VTT/image semantic alignment for all occurrences;
2. character identity, background/location and illustration-style continuity;
3. wrong or invented characters, settings, props, anatomy or text;
4. absence of camera drift, crop drift, pan, zoom or motion used to disguise a
   still;
5. clock continuity, opening/ending, transition pacing and complete decode;
6. caption timing, readability and behavior using the exact external VTT; and
7. every failure tied to an exact timestamp/cue/source and narrow repair owner.

## Required judge return

Write only inside
`operations/product-stewards/episode-media-quality/evidence-2026-07-26/`:

- `emq-e02-v18-full-av-judge-2026-07-26.md`; and
- an optional checksum-bound machine receipt.

Return one exact verdict:

- `ACCEPT` — the complete frozen tuple passes every required audiovisual gate;
  or
- `HOLD` — list each exact occurrence, reason, affected source/clock and narrow
  repair owner.

The maker cannot judge, reinterpret or repair during review. A maker
verification or technical PASS does not count as judge acceptance.

## Locks and continuing truth

- No animation, further assembly, site change, release packaging, deployment,
  public-player change or public claim is authorized.
- Episode 01, Episode 03, Episode 04 and Trailer remain queued.
- Episode 05 remains at its separate Gate 1 and receives no production work.
- The selected motion ident remains queued and is not part of this v18 tuple.
- Any changed byte supersedes this handoff and requires a new judge trigger.

## Next trigger

Episode Media Quality returns its durable checksum-bound `ACCEPT` or `HOLD`.
Weekly Episodes records the verdict without self-judging. Only an exact
`ACCEPT` can make the candidate eligible for later Ali visual ruling and
release-candidate packaging; neither follows automatically.
