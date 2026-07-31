# Control Room handoff — Weekly Episodes missing independent reviews

**Handoff ID:** `WE-MEDIA-MISSING-INDEPENDENT-REVIEWS-2026-07-26`  
**From:** Episode Media Quality independent judge  
**To:** Control Room + Weekly Episodes — Engine & Production Director  
**Evidence time:** `2026-07-26T17:37:11-07:00`  
**Status:** **REPORT READY — ALL EPISODE 01–04 + TRAILER MOTION CANDIDATES HOLD**

This is a judge-only handoff. It does not modify or admit any video, image,
caption, player, site, route, manifest, QC, config, builder, deployment,
publication or public-media byte. It does not authorize integration, release,
deployment, publication, an Ali decision, a commit or a push.

## Bound title verdicts

Existing verdicts were read and bound, not rerun or edited:

| Title | Exact candidate | Verdict | Durable report |
|---|---|---|---|
| Episode 01 v24 | MP4 `272d370ee741d777bc355ea869e63bf4541e0765d3be7bcca286ad79c4c7a53e` | **HOLD** | `emq-e01-v24-independent-judge-2026-07-26.md`, SHA `577f8bebc9299066b836a1c3b7d12b7cf1f3903e7d9b914b5b07a03a7cd8817e` |
| Episode 02 v19 file/visual | MP4 `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` | **HOLD** pending player/audible gate | `emq-e02-v19-full-av-judge-2026-07-26.md`, SHA `4fbe002c5a2e0a75d3897d63acdf247d4ae0bbf136256aa461b733521e946c7c` |
| Episode 03 v10 | MP4 `c5dcee69c40e50d834dcc8f471eae9d621f531b37653de9eaef7bf5e362fd239` | **HOLD** | `emq-e03-v10-independent-judge-2026-07-26.md`, SHA `c89550ffe370baf470119a7a5b423f2c489adef978968a21baf480d2cc335e7b` |
| Episode 04 v9 | MP4 `d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4` | **HOLD** | `emq-e04-v9-independent-judge-2026-07-26.md`, SHA `950acfe8705480ba22990dff718a5a008ed00c0241d79a67d5700064df023756` |

New missing reviews completed in this turn:

| Title/gate | Frozen tuple | Verdict | New output |
|---|---|---|---|
| Episode 02 v19 actual-player witness | MP4 `e4b03586…676c3`; VTT `7666e2d6…778f`; witness HTML `7c6f1509…2630b` | **HOLD** | Markdown SHA `a559b86ed9edf94f6ce197220150ef6a61a69d9c958732acd044403aeb0da35f`; JSON SHA `29607ca30a7d740e2ee4955e59ff37a1eb87518976c615a97a567d94122edb31` |
| Trailer v3 | MP4 `4bdd3de0…3ef`; QC `c3ead36e…5ac`; map `2969d68a…d3e7`; config `48b761ee…98f`; VTT `5bc151d7…b8d`; SRT `67bd3c86…a66` | **HOLD** | Markdown SHA `a73a71f5c923973da7982e72d8dc5e00cdb18206e97f80699abc9cf1a49b4eeb`; JSON SHA `473275bcb3366a537dfc74d0a3c920ea0a5da22294e3a7f8a0158f91c9c280f4` |

## Literal new outputs

- `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-independent-verdict-2026-07-26.md`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-independent-verdict-2026-07-26.json`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-trailer-v3-independent-judge-2026-07-26.md`
- `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-trailer-v3-independent-judge-2026-07-26.json`
- two E02 player screenshots, seven Trailer 58-beat midpoint sheets, four
  Trailer motion strips and four targeted Trailer clock frames/grids, all
  checksum-bound inside the two verdicts.

## New findings that hold the candidates

### Episode 02 v19

The supplied player surface is not acceptable:

1. it initially says “Captions on” while the browser track remains disabled
   and the rail remains “Captions loading…”;
2. after the track is toggled into loading, the rail visibly prints raw
   WebVTT voice markup such as `<v The Announcer>` and `<v The Heroine>`;
3. native Space pause passed, but keyboard seek, reduced-motion emulation and
   the final tail were not fully witnessed; and
4. no independent person heard all `16:27.47` at normal speed.

### Trailer v3

The MP4 does not match its frozen 58-beat map:

1. B05/B13/B39/B54 normalized clips omit their declared final-frame freezes;
2. later cuts drift progressively early by about `2.02`, `3.82`, `5.05` and
   `7.09 s`;
3. picture ends at `16:00.00`, while audio continues to `16:07.10` and
   captions continue to `16:05.14`;
4. maker QC says the freeze gate passed, but decoded clip durations and the
   assembled stream disprove that claim; and
5. the durable sources conflict on whether the later multicolour
   “trailer-only” heroine outfit applies only to B05/B14 or to all heroine
   appearances; several other beats still use yellow plaid.

B08/B14/B55/B57 corrections themselves pass their bounded delivery-size
checks. They do not compensate for the clock, tail or unresolved authority
failures.

## Remaining owner work and exact next actions

### Episode 02

**Owner:** Audio & Caption Owner + Release QA under Weekly Episodes.

1. Build a successor non-public witness surface; do not mutate the frozen
   HTML.
2. Activate the exact unchanged VTT on first render when UI says captions are
   on.
3. render sanitized cue content without raw WebVTT tags;
4. prove keyboard play/pause/seek, mobile/reflow, reduced motion,
   media/caption failure and tail behavior; and
5. obtain a named external human witness for the complete unchanged MP4/VTT at
   unmuted `1×`.

Return the unchanged MP4/VTT hashes, successor witness hash, witness role/time
and literal observations to Episode Media Quality.

### Trailer

**Owner:** Trailer v3 Video Editor / builder owner under Weekly Episodes.

1. Weekly Episodes Director first reconciles the heroine-outfit authority. If
   durable sources remain irreducibly contradictory, Ali retains that
   identity/taste decision; this handoff does not request or authorize it.
2. Make each motion clip physically contain its declared freeze and exact
   target frame count.
3. Rebuild a successor tuple without overwriting this frozen one.
4. QC must decode-count each clip, assert all 57 actual cut onsets, and compare
   video/audio/caption end times.
5. Return successor MP4/map/QC/config/VTT/SRT hashes for a fresh independent
   delivery-size 58-beat review plus full human normal-speed AV/player witness.

## Acceptance and release authority

- **Craft acceptance:** Episode Media Quality, independent of each maker.
- **Editorial/identity reconciliation:** Weekly Episodes Director; Ali only if
  an irreducible taste/identity conflict remains.
- **Integration and release sequencing:** Weekly Episodes Director + Control
  Room through the existing product contracts.
- **Player/discovery/public admission:** the named downstream Chick Flicks,
  Screening Room, Platform and Release owners after EMQ acceptance.
- **Public release:** retains its applicable owner approval and exact
  deployment/public verification gates.

No candidate is accepted by this handoff. `EPISODE_FILMS` and every public
availability claim must remain unchanged.

## Learning scan

Two qualifying prevention rules were found:

1. captions must be tested from the initial advertised state and their
   rendered text must be inspected for exposed cue markup; and
2. motion-tail QC must decode-count the actual clip, compare every assembled
   cut onset to the map, and assert video/audio/caption end alignment.

The task’s collision boundary prohibited editing
`operations/painpoints-log.md`. Control Room should reconcile these two rules
into the canonical ledger before the next similar build. Possible public
angles: “The captions loaded—and printed the code” and “The freeze passed in
the report—and vanished from the video.”
