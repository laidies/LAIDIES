# EMQ Trailer v3 independent judge

**Task:** `EMQ-TRAILER-V3-INDEPENDENT-JUDGE-2026-07-26`  
**Judged at:** `2026-07-26T17:37:11-07:00`  
**Judge:** Episode Media Quality, independent of the maker  
**Verdict:** **HOLD**

The exact Trailer v3 tuple is not accepted. Its supplied hashes match, all 58
mapped source and normalized-clip hashes match their current bytes, and the
high-risk B08/B14/B55/B57 corrections are visibly present. However, the MP4
does not obey its own 58-beat clock.

The four motion clips end before their map-declared freeze tails. Their missing
tails shift every later cut progressively early. The picture stream ends at
`16:00.00` while the exact audio continues to `16:07.10` and the exact captions
continue through `16:05.14`. This directly contradicts the maker QC claim that
the final-frame freeze gate passed and makes the exact map/caption clock,
normal-speed audiovisual alignment and ending behavior fail closed.

## Exact frozen tuple

| Artifact | Frozen SHA-256 | Independent result |
|---|---|---|
| MP4 `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v3-map-caption-reconciled-review-1920.mp4` | `4bdd3de0729fbabc865edd3b5f435e0c93ff98d113acff4fd926aedb55c123ef` | exact match |
| Maker QC | `c3ead36e1f82d5874411bd45212362937734aca8816e7f8b2db39b11de86d5ac` | exact match; contains a disproved freeze-pass claim |
| 58-beat map | `2969d68a4c82edb2a32a9d22ae90c8b0ee5478eee0111e970fb82515b1a0d3e7` | exact match; does not describe actual MP4 cuts after motion beats |
| Config | `48b761ee725a3a512d4be9ab3b57e946ecf855c8206aaad8580a014f2a5bd98f` | exact match |
| VTT | `5bc151d7d0aa611f42aed427b61dcc9c55c5320b368d31a9285a64ab31255b8d` | exact match |
| SRT | `67bd3c86be47e5eecdda74478da491269af83b8521ad2c48af6866c67780aa66` | exact match |

Additional tuple checks:

- full decode: **PASS**;
- 58/58 source hashes: **PASS**;
- 58/58 normalized-clip hashes: **PASS**;
- Episode 01–04 source-path boundary: **PASS**, no map source path enters
  `assets/episodes/ep-01/` through `ep-04/`;
- captions: 207 VTT and 207 SRT cues, last spoken/sung cue ends `965.14 s`;
- audio stream: maker-bound exact stream copy remains supported;
- public/site/player/readiness: **not changed and not proved**.

## Decisive map/MP4 clock failure

The maker config/map requires each motion beat to play once, freeze on its own
last frame, and occupy the complete target window. The actual normalized clips
omit the declared freeze duration:

| Motion beat | Map target duration | QC-declared freeze | Actual normalized duration | Consequence |
|---|---:|---:|---:|---|
| B05 | `17.267 s` | `2.000 s` | `15.23 s` | B06 cuts at `58.50`, not mapped `60.52`; cumulative drift about `-2.02 s` |
| B13 | `11.933 s` | `1.790 s` | `10.13 s` | B14 cuts at `191.40`, not mapped `195.22`; cumulative drift about `-3.82 s` |
| B39 | `8.067 s` | `1.210 s` | `6.83 s` | B40 cuts at `572.667`, not mapped `577.72`; cumulative drift about `-5.05 s` |
| B54 | `28.067 s` | `2.000 s` | `26.03 s` | B55 cuts at `837.767`, not mapped `844.86`; cumulative drift about `-7.09 s` |

Examples independently inspected at delivery size:

- B32 “DO THE TRY-ON” is already present at `478 s`, although the map says B32
  begins at `482.20 s`;
- B33 is present by `486 s`, although mapped to `489.58 s`;
- B36 Dream Phone is present around `534 s` and has already cut to B37 Fairy
  Godmother by `538 s`, although the map assigns B36 to `537.98–542.02 s`;
- the video stream contains `28,803` frames and ends at `960.00 s`; audio
  continues to about `967.10 s`, leaving about `7.10 s` with no corresponding
  video frames and about `5.14 s` of still-captioned spoken/sung material after
  picture ends.

The likely mechanical cause is visible in the current build contract: the
normalized motion files are only as long as the retimed motion portion, while
the QC records the requested freeze as though it survived. This judge does not
edit or repair the builder.

## 58-beat delivery-size visual review

Every beat was inspected at its mapped midpoint in seven 1920-wide contact
sheets, with targeted delivery-size frames around the proved timing failures.
The broad sequence is visually legible and mostly consistent in its colourful
comic/town grammar. The following are bounded findings, not an acceptance:

- **B08 correction PASS:** exact `THE TRAILER / LAiDIES`, no `.ai`, and the
  prohibited pink/yellow/halftone treatment is absent.
- **B14 correction PASS:** exact `Delta LAi Nu`, blue-eyed heroine and the
  multicolour trailer outfit are visibly present; the rejected yellow-plaid
  B14 repair is absent.
- **B55 correction PASS:** exact `LAiDIES.ai` and “NEW EPISODE EVERY WEDNESDAY”
  are visible; prohibited pink/yellow/halftone treatment is absent.
- **B57 correction PASS:** exact `ON WEDNESDAYS WE USE AI`; the rejected
  `DO Ai` wording is absent.
- **B58 visual card PASS at sampled frame:** no obsolete wordmark; exact
  `DIAL UP TO SUNNYVAiLE` and `SEE YOU NEXT WEDNESDAY` are visible.
- **B23 map frame PASS at sampled frame:** the eight-stop map composition is
  visibly present.
- Identity, location and style are broadly legible across all 58 midpoint
  frames, but the timing failure means those frames are not present in the
  narration windows claimed by the frozen map.

### Unresolved heroine-outfit authority conflict

The storyboard says the trailer host defaults to the v28/yellow-plaid kit for
consistency. The later correction record and BTB-176 explicitly reject the
yellow-plaid Episode 4 outfit at B14 and bind B05/B14 to a multicolour
“trailer-only” outfit. Other heroine occurrences—including B01, B04, B07,
B15, B31, B39 and B56—still visibly use yellow plaid.

This judge does not infer whether the later trailer-outfit ruling applies only
to B05/B14 or to every heroine occurrence. The Weekly Episodes Director must
reconcile the latest explicit owner correction against the earlier storyboard
before a successor is built. If the durable sources remain irreducibly
contradictory, Ali is the taste/identity decision owner; this judge turn does
not request or authorize that decision.

## Motion and hard-cut review

- Maker hard-cut evidence for B05/B13/B39/B54 is checksum-bound and reports
  one continuous shot per clip. The eight-frame strips found no internal hard
  cut.
- B05 performs a restrained reporting-back push; B13 performs the town
  establishing movement; B39 performs a wandless corporate-to-SUNNYVAiLE
  transformation; B54 performs the LUMINAiRY illumination. Their semantic
  direction is **provisionally appropriate within the frames that exist**.
- None of the four normalized clips contains the required final freeze. The
  semantic-motion gate therefore **fails at the end-state/timing boundary**.

## Normal-speed AV, captions and player/readiness boundary

The exact audio stream, caption files, decode and frame clock were inspected.
No complete human normal-speed audiovisual watch was available in this judge
environment. Because the picture stream ends early and later visuals are
shifted against narration/captions, the tuple already fails before that human
gate.

No player, route, manifest, site, public caption, deployment or publication
byte was changed. This local MP4 remains a review candidate only. It is not an
admitted trailer, release candidate, deployed asset or public availability
claim.

## Bound evidence artifacts

The seven midpoint sheets cover B01–B58:

| Evidence | SHA-256 |
|---|---|
| `emq-trailer-v3-beats-01-09-midpoints.png` | `a141c5bd642a95914b8c8fcb238568ba82a38a7a5d3866446c03a3609da623ab` |
| `emq-trailer-v3-beats-10-18-midpoints.png` | `317c4a536f22d50e9e1d4c20d143d86f8170fbac00706fe97a9e987c90b7e2ba` |
| `emq-trailer-v3-beats-19-27-midpoints.png` | `08de9f9a0725d66a9009594480b15894787780fde5a46244efe432fa24d72099` |
| `emq-trailer-v3-beats-28-36-midpoints.png` | `930e3fd9615b667f47d35cbd2eb9f279e4f6b29cca5c15a7b466b765e1987438` |
| `emq-trailer-v3-beats-37-45-midpoints.png` | `e0844413a8b1c0eb8d9aef61fa64451d683d5726f0c799ca699317551e237a77` |
| `emq-trailer-v3-beats-46-54-midpoints.png` | `545b1ea5d5a0869e89d5669d7d7cc8192f72e068b6806dfc4c509cde331a2ba7` |
| `emq-trailer-v3-beats-55-58-midpoints.png` | `e1abf49d994121b195faedfabb9313a82bf5fa15c0f99d30ac3d5cde810ce779` |

Targeted clock evidence:

| Evidence | SHA-256 |
|---|---|
| `emq-trailer-v3-b31-b33-second-grid-478-493.png` | `6586d9387a1451ed062a23733501b9828a70a1dcbb24c601067f71cc9b07aa29` |
| `emq-trailer-v3-b35-b37-second-grid-534-545.png` | `6b2e683b471058a879fa4f47220bfc9cea09ac568010ed2c57cf5bf3bf2c0cc8` |
| `emq-trailer-v3-b32-midpoint-485.88.png` | `13672ec32529ef94a848430a6148540f21d483d129f182f1f595847c81a03a59` |
| `emq-trailer-v3-b36-midpoint-540.00.png` | `b513ce22af16181787ade77a4f34b5fcb5351752bf1910eae35cf3acec9ac748` |

Motion strips:

| Evidence | SHA-256 |
|---|---|
| `emq-trailer-v3-b05-motion-8-frame-strip.png` | `213fc826c815b968657807544db30a9b0f10b579fc5b134fdd90912d35ccc19c` |
| `emq-trailer-v3-b13-motion-8-frame-strip.png` | `09c63ea1a23b16f1c843cccddf200075167b4f11b1154de2a32c7d483256468b` |
| `emq-trailer-v3-b39-motion-8-frame-strip.png` | `5b29889f4f8a4def854aa53a2ffeece172ac21607f05d20bc216d607fabe2225` |
| `emq-trailer-v3-b54-motion-8-frame-strip.png` | `555caee210679d743ded8f6b748b91ce9398fa9b839f2bc4cd15590243d3f5a0` |

## Exact unblock and authority truth

**Repair owner:** Trailer v3 Video Editor / builder owner under the Weekly
Episodes Director.

**Exact next action:**

1. reconcile the heroine outfit authority before generating any replacement
   source;
2. repair motion rendering so B05/B13/B39/B54 each physically contains its
   declared final-frame freeze and exact target frame count;
3. rebuild a successor MP4 without mutating this frozen tuple;
4. make QC assert each normalized clip’s decoded frame count/duration, all 57
   assembled cut onsets, video-stream end versus audio/caption end, and the
   final B58 tail—not merely configured values;
5. return the successor MP4/map/QC/config/VTT/SRT hashes for a new independent
   58-beat delivery-size review and complete human normal-speed AV/player
   witness.

**Acceptance owner:** Episode Media Quality, independent of the maker. The
Weekly Episodes Director and Control Room retain editorial reconciliation,
integration and release sequencing. Ali retains only any irreducible
identity/taste ruling and public-release authority. No Ali decision,
integration, deployment, publication or public-media mutation is authorized
by this verdict.

## Learning scan

**Qualifying learning found:** QC recorded final-frame freeze as passed from
requested render metadata even though the normalized clips ended before the
freeze. The concat preserved those shorter clips, shifted every later semantic
cut and left audio/captions running after video ended. Prevention rule:
decode-count every normalized clip, compare every assembled cut onset with the
map, and assert video/audio/caption end alignment before maker handoff.

The collision boundary permits only new independent evidence and one Control
Room handoff, so the canonical `operations/painpoints-log.md` was not edited.
Control Room should record this rule after reconciliation. Possible Behind the
Build angle: “The freeze passed in the report—and vanished from the video.”
