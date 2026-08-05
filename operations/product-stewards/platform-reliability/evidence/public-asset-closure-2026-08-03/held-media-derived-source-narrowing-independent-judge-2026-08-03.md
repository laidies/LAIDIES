# Held-media derived source narrowing — independent judgment

**Judged:** 2026-08-03 America/Vancouver  
**Verdict:** **PASS — BOUNDED SOURCE NARROWING ONLY; WHOLE CLOSURE REMAINS HOLD**

## Exact candidate verified

| Artifact | Verified SHA-256 |
| --- | --- |
| `content/episodes/episode-trailer-cues.json` | `225e72a2b15590fce89737ccc8eead81cef153de1268b1a07a7303fc4d28341a` |
| `content/episodes/screening-room-admission.json` | `8e82784c252e6d8b6cc7a1f4712c64b01dfeb985edd28d3734053d16a97394c8` |
| `content/episodes/screening-room-derived-editions.json` | `e1e11d444e3bc4399ed95ca70f05fc909f52ce08c2d019df74695957df547343` |
| `public-asset-inventory.json` | `ecd195fee11f0f6575ee53638233b1e7247cf08b45903c361138231ac22606a5` |

## Independent findings

1. The held Trailer and Episodes 01–02 now join Episodes 03–04 in the
   checksum-bound cover-only derived-edition path. For each programme, the
   original source cue file remains present, hashes to its derived-edition
   `sourceCueSha256`, and retains its cue times and chapter metadata. The
   Trailer changes only two final-card references: the excluded
   `pc-dial-up.webp` becomes the exact Post Office runtime-family member
   `pc-dial-up.png` (`636dbd…86427`).
2. `watch.html` independently enforces the held state: an unadmitted programme
   is reduced to one `HELD_VISUAL_COVERS` static image and displayed with the
   explicit cover-only/not-an-illustrated-motion-film notice. This preserves
   the honest public held-programme behaviour; it does not expose an omitted
   illustration as a blank or silently promote it.
3. No asset authority expanded. The active-asset admission suite passes;
   builder code retains `compileActiveAssetRegistry` and `assertActiveAsset`;
   the runtime-family manifest remains `DENY`, six families/256 members and
   267 exclusions. The registry hash remains
   `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927`.
4. Deterministic inventory is now 582 reachable binaries, ACTIVE=2,
   UNREGISTERED_DEFAULT_DENY=580, 31 prohibited source references across 19
   paths and missing=0. Builder/inventory parity reproduced the exact 31-item
   set and correctly remains fail-closed.

## Checks rerun

```text
node scripts/test-screening-room-contract.mjs                                      PASS — 5 titles HOLD; 0 motion films
node scripts/test-active-asset-admission.mjs                                       PASS
node .../test-public-asset-source-narrowing.mjs                                    PARTIAL PASS — 582 / 31 / 19 / missing=0
node .../check-builder-inventory-parity.mjs                                        PASS — exact_set=true; fail_closed=true
node scripts/check-opening-day-program.mjs                                         PASS specification — media 0/5 ready; launch HOLD
```

## Boundary

This accepts only the narrowed public dependency graph for already-held
programmes. It does not admit any byte, release a title, clear a human
sound-on/occurrence review, change the asset registry or runtime-family
authority, deploy, publish, or clear the remaining 31 prohibited references
and 580 default-denied bytes. The curated public-asset closure, opening-day
media gate, and whole-town release remain **HOLD**.
