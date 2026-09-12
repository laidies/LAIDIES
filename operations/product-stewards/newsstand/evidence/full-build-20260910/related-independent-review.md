# NewsStand explicit related-story renderer independent review

**Verdict: PASS — scoped related-story selection and rendering delta.**

No release-blocking defect was found in the exact bytes below. This verdict covers the new use of explicit `relatedStoryIds`, `predecessorStoryIds` and `successorStoryIds` in **See similar stories**, plus removal of the raw `relationshipType` sentence. It does not admit an issue, review story prose, approve deployment or declare the full NewsStand build complete.

## Defects first

None found in the requested delta.

The screenshots also show the existing lineage-accountability label **Related report (currently withheld)**. That label is separate from **See similar stories**. A direct click-through check confirmed that the held predecessor's headline and article body are not rendered; the reader closes back to the paper. The generic lineage link was not introduced by this delta. Its destination provides no separate explanatory notice, which is a retained usability limitation rather than a content-exposure defect in the reviewed change.

## Independent inspection

Reviewer principal: `/root/weekly_recovery`

Review route: GPT-5.6 Sol, High

Artifact-first review time: 2026-09-10T22:45:28-0700

Repository HEAD observed during review: `2567f4a697b57f68e096b715de1de448859d308e`

Exact two-file byte-set SHA-256: `4e3550b295d3a1842b2a6aa23ce1a32cadac6f88bf107b964c4e254a01598ea3`

Exact tracked working-diff SHA-256: `24dafcc262a2c1d39a214d9fdbb8d543852613190e60c2976224ea72a316f183`

| Path | SHA-256 |
| --- | --- |
| `newsstand.html` | `b5593cc7a0af38ff14fb2a17ed9e64f698771064107e8a39b4ce4fd5c5adb4cc` |
| `scripts/test-newsstand-similar-stories.mjs` | `53008a3eb9f8df570849a3411589b7efc4e677ef266223cb18f5e63411ad5e6e` |
| `/private/tmp/newsstand-completion-20260910/similar-preview.mjs` | `dd0e696718411368e1f3390282afe07085d55b928b02fc0d3784fa8587d4d964` |

## Findings

1. **Explicit relationships feed the existing admission filter.** The selector gathers unique string IDs from the three explicit relationship fields, excludes the current story, adds any governed legacy editorial group matches and then resolves IDs against the story bank. Resolved stories still have to be published or corrected, have a publication time no later than the reader clock and pass `contract.accessDecision(...).canExpose`. The three-story cap remains in place.

2. **Held, future, blocked, missing, malformed, duplicate and self references are suppressed.** The exact test exercises all of those cases. It also confirms that broad tags do not manufacture related stories. Its known-bad calibration removes the admission filter and is rejected by the held-story assertion.

3. **The current Senate article shows only its eligible predecessor.** The live data names a held earlier Daily and a published August 26 Weekly as predecessors. At 1280, 390 and 320 pixels, **See similar stories** contains one card for the admitted Weekly. The held Daily is absent. Clicking the visible card opens `#weekly-accountable-systems-2026-08-24`.

4. **The raw relationship enum is gone.** The previous reader-facing sentence derived mechanically from values such as `follow-up` has been removed. The useful earlier/newer lineage sentences and correction-history renderer remain present.

5. **Publication controls are unchanged.** The source diff changes only explicit candidate collection inside `similarStories` and removes the raw enum sentence from `renderStoryLineage`. It does not modify the story-bank admission contract, issue selection, story-body access decision, correction history or held/future publication rules.

6. **The rendered treatment remains usable at all supplied widths.** The heading, single story card, date and arrow remain inside the paper at 1280, 390 and 320 pixels. The 320-pixel card wraps cleanly, no horizontal overflow was observed and the link completed the expected hash navigation.

## Exact inspected renders

| Render | SHA-256 |
| --- | --- |
| `/private/tmp/newsstand-completion-20260910/similar-1280.png` | `a1a6acc0b9e7813a182cad80c8727e755b96df4b8c0389c32b9ead9e6ca3b7b5` |
| `/private/tmp/newsstand-completion-20260910/similar-390.png` | `0fb2cf1349f2eed6ae71ca15ac984107471a95481b896a2f2ae55a637bd9a323` |
| `/private/tmp/newsstand-completion-20260910/similar-320.png` | `6085db8fb405a9c54fa6b2fbec96aac33ccf57bbf92d0eeb59f758f415aa1e41` |

I reran the supplied browser capture against the exact local candidate bytes. It reported `similarFollow: true` and `heldExcluded: true` at all three widths and reproduced the hashes above.

## Executed checks

```text
PASS related selection, exclusions, no filler, max3, no duplicates, both article templates
SIMILAR STORIES PASS explicit relationships retained; held/future/blocked/missing/self/duplicate excluded; no broad-tag inference
```

The test is meaningful because its deliberately spoiled selector fails the held-story assertion. The browser capture independently checks the actual Senate relationship, visible card count, link destination and document overflow.

## Reviewed limitations

- These are private local renders, not a public-origin verification.
- The review covers the supplied Senate article relationship and the synthetic exclusion fixtures. It does not assert that every existing story has an editorial relationship assigned.
- The generic held-lineage link closes the reader without showing a separate notice. It reveals no held headline or body and predates the reviewed delta.
- This review does not cover the rest of the current root-owned working tree.
