# Episode 04 P0.2 — independent coordinate-repair verdict

**Date:** 2026-07-25  
**Scope:** re-review of the coordinate de-duplication and resulting P0.2 packet
closure only.  
**Overall verdict:** **PASS — the coordinate-duplicate defect identified in the
P0.2 independent admission verdict is repaired. This pass supersedes only that
defect; it admits no person, source frame, cue, image, motion, audio or release.**

## Independent verification

| Gate | Verdict | Finding |
|---|---|---|
| Cue 16 duplicate removal | **PASS** | Former item 10 is absent from the portrait inventory and crop manifest. The inventory explicitly records that it duplicated existing item 11 and invents no replacement subject. |
| Cue 17 duplicate removal | **PASS** | Former items 5 and 6 are absent from the portrait inventory and crop manifest. The inventory explicitly records that they duplicated existing items 3 and 4 respectively and invents no replacements. |
| Deleted derivatives | **PASS** | `coordinate-qa/cue16-item10.png`, `coordinate-qa/cue17-item5.png` and `coordinate-qa/cue17-item6.png` are absent. No stale derivative is available for accidental reuse. |
| Retained coordinate | **PASS** | Cue 16 item 9 remains at native rectangle `x1550–1650,y260–610`. Its 100×350 derivative is pixel-exact to that crop of the checksum-bound 1920×1080 source frame and excludes the adjacent left face. It represents one unique readable right-wall figure. |
| Contact sheet | **PASS** | The regenerated 680×586 sheet contains only Cue 16 item 9, states the exact coordinates, and is prominently labelled coordinate QA only—not identity evidence. Its SHA-256 is `0403588a31412e6c79c7aa0b2be24a834dc3e0aa2fe986377b34e5d0e9a4351a`. |
| Coordinate-QA manifest | **PASS** | The manifest binds both original failed source frames, the one retained crop, all three duplicate-row removals, the regenerated contact sheet and the unchanged no-admission state. Its SHA-256 is `1e1a5850488709973adfbcc8f6733b73a4e2428af7ee7baec0cbeefc9a7df373`. |
| Corrected P0.1 inventory | **PASS** | The unique rows and source hashes remain intact; the removed duplicates are documented after each cue table. Its SHA-256 is `50714500e8b69ef078838f234793d0a4d0c069a8d662b85ce4f7f298360510a1`. |
| Packet closure | **PASS, bounded** | Every hash in the updated packet register resolves to its stated local file, including all P0.1 documents, all P0.2 subordinate documents, the historical independent verdict, retained reference assets, contact sheet and both prohibited inputs. The final `packet-manifest.json` SHA-256 is `f0bd50bbf0e2d5397ace2eed9f4d02adfe385b62ab22334833a99241e93cee85`, and the external source/execution binding records that exact value. |

The updated packet deliberately retains
`independent-admission-verdict-2026-07-25.md` unchanged as the historical review
input. Its old statement that de-duplication was required is resolved by
`coordinate-duplicate-repair-2026-07-25.md` and this verdict; the remainder of
that admission verdict remains authoritative.

## Unchanged admission and blocking state

The coordinate repair changes no other ruling:

1. The Ada engraving remains admitted **as likeness research only**, with its
   1838/c.1841 era limits and no documentary 1843-scene claim.
2. The Babbage plan photograph remains admitted **as proposed/unbuilt-machine
   research only**, subject to CC BY 4.0 attribution, licence link and change
   notice.
3. Project Gutenberg eBook #75107 remains admitted **as primary-text
   verification only**, not as blanket facsimile, typography or redistribution
   approval.
4. NPG L274 and both checksum-bound Cue 18/19 prohibited inputs remain
   prohibited.
5. Both Cue 16 and Cue 17 source frames remain **FAIL admission**. A coordinate
   record does not establish identity, rights, visual quality or cue fitness.
6. Cue 18 remains specification-only with no admitted start plate, no end card
   and no candidate.
7. Cue 19 remains reference-binding-only with no approved composition or
   candidate.
8. Final audio, as-recorded transcript, VTT and authoritative cue clock remain
   **BLOCKED**.
9. Ali's LUMINAiRY exterior-master choice for Cue 15 remains **BLOCKED** and
   cannot be inferred by this packet.
10. Generation, rendering, motion review, episode approval, trailer approval
    and public release remain **BLOCKED / UNAPPROVED**.

## Result

The coordinate lane is now closed accurately: one repaired unique location is
retained, three duplicate subjects are removed, and no identity is claimed.
The packet may carry this corrected coordinate record forward alongside the
previously admitted research references. It still cannot advance to media
production until the separate source, owner, audio/caption, composition and
candidate acceptance gates identified in the prior verdict are satisfied.
