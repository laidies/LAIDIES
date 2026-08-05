# FAiRY Godmother existing-art avatar derivative — independent verdict

**Verdict:** `ACCEPT FOR NARROW INTEGRATION — EXACT DERIVATIVE ONLY`

**Confidence:** certain on byte lineage, geometry and small-scale inspection; likely on the upstream original-art rights chain, which is represented by the maker receipt but cannot be independently proven from the supplied records alone.

**Date:** 2026-08-03

## Exact scope

This verdict judges only `assets/town-characters/avatars/fairy-godmother-avatar-v1.png` as the public Resident Card avatar for **The FAiRY Godmother**. It admits neither the source scene itself nor a general character portrait, Trading Card front, Homepage, Town Hall grid, episode, social, motion or derivative use. It makes no registry, manifest, data, consumer, deployment, publication or public-origin change.

| Item | Verified result |
| --- | --- |
| Candidate | `assets/town-characters/avatars/fairy-godmother-avatar-v1.png` |
| Candidate SHA-256 | `172c284665ea5279fc037730e947b9266dfdc288a4d150856d5cb06659597c18` |
| Candidate raster | PNG, 1024 × 1024, RGB, no alpha |
| Sole source | `operations/design-explorations/sitewide-style-championship-20260726/cycle-8b/fairy-first-artwork-ink-faceted/artwork/fairy-prompt-help-intent-ink-faceted-v1.png` |
| Source SHA-256 | `0703bf75e263ee661363ad26f8117887102a1f2d16a2aca23ce80868793b3988` |
| Transform reproduced | crop source at x=576, y=0 to 768 × 768; resample to 1024 × 1024 |
| Reproduced output SHA-256 | `172c284665ea5279fc037730e947b9266dfdc288a4d150856d5cb06659597c18` — byte-identical to candidate |

## Independent judgment

| Criterion | Result | Finding |
| --- | --- | --- |
| Reuse-first | **PASS** | This is the smallest viable correction: a deterministic crop/resample of an already existing LAiDIES artwork. No new illustration, generative fill, identity substitution or third-party material was added. |
| Canonical FAiRY identity | **PASS** | The crop foregrounds the established adult Black FAiRY with dark curly updo, star tiara, warm direct expression and silver wand described by the owner authority. It is visibly not the rejected silver-haired tarot identity (`d9cb840d…8281`). |
| Brand and card-family fit | **PASS** | Saturated cyan, fuchsia, navy and coral; decisive inked outlines; print-texture detail; and a grown-up 1990s graphic-novel register support the LAiDIES character world without copying Resident Card chrome or introducing tarot, saint-card, wings, hearts, gold filigree, text or a speech bubble. |
| Resident Card job | **PASS** | The person—not a room—is immediate. The retained night-window, pencil cup and writing surface are subordinate context for a practical wishmaker rather than competing scene content. |
| 240 × 240 | **PASS** | Face, tiara, warm expression and wand are immediately identifiable; no important feature is cut off. |
| 96 × 96 | **PASS** | Face remains the first read; dark curls, star tiara and the high-contrast silver wand retain useful separation. |
| 64 × 64 | **PASS** | It remains a recognisable character avatar, rather than collapsing into the former desk/CRT scene. The wand is still a clear vertical cue and is not an unexplained clipped line. |
| Crop integrity | **PASS** | The prescribed face-first crop is internally coherent: the window occupies a narrow supporting strip, while the subject fills the central and lower-right field. No accidental partial CRT, chair, or document fragments remain. |
| Accessibility | **HOLD FOR IMPLEMENTATION** | The candidate can support meaningful alt. The current data contract still has no `avatarAlt`; integration must add the exact FAiRY field `"avatarAlt": "The FAiRY Godmother with her silver wand"` and make the named-character consumer use it instead of generic `Resident Card portrait`. |
| Provenance / no added external material | **PASS WITH RECORDED LIMIT** | The maker receipt binds the candidate and sole source hashes and the exact deterministic transform, and states no third-party material was added. The supplied records do not independently expose the account-level original ImageGen rights chain; record the existing maker receipt alongside the registry admission rather than overstating that limitation as new proof. |

## Inspection receipts

The exact candidate was inspected at original resolution and as deterministic downscales. These are temporary review files only, not production assets.

| View | SHA-256 | Result |
| --- | --- | --- |
| 240 × 240 | `92596e689904b6189fa26e1fa16b18f1ed8f5fe5b782133725f60c2affb36088` | PASS |
| 96 × 96 | `f1f5a8aeafd4734ab8ff5f333931dbadec91a4755e703eb631e54b097fa7b248` | PASS |
| 64 × 64 | `a106176a1893caa14599250a4f3ee33c640d00dc3262bde4b6b71902062b8c4e` | PASS |

## Required exact integration after this verdict

One integration owner may now, and only in this narrow order:

1. Change only `characters.fairy-godmother.avatar` in `content/data/character-cards.json` to `/assets/town-characters/avatars/fairy-godmother-avatar-v1.png` and add `"avatarAlt": "The FAiRY Godmother with her silver wand"` to that character record.
2. Change the named-character consumer to honor its explicit `avatarAlt`; do not retain the unexplained generic `Resident Card portrait` fallback for this row.
3. Add exactly SHA `172c284665ea5279fc037730e947b9266dfdc288a4d150856d5cb06659597c18` to the active-asset registry with scope limited to the FAiRY Resident Card/data consumer at 240/96/64px; retain the maker receipt and this verdict as authority.
4. Reconcile the runtime manifest, regenerate the public-asset inventory, and require builder/parity plus affected Resident Card accessibility/rendering checks.

The former `assets/laidy-fairy-godmother-portrait-v3.png` request must be removed from the runtime source closure only after the above replacement is correctly wired. That rejected byte receives no new authority. Deployment, publication and public-origin verification remain separate.

## Calibration and limits

The inspection standard can fail: the unchanged 1536 × 1024 source was independently rejected for this avatar job because its centred square 96px and 64px views made the person too small and left scene fragments. This tested derivative instead replaces that geometry with the reproducible face-first square and passes the same sizes. This review did not inspect a live browser, change any repository file other than this verdict, or claim public release.
