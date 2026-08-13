# NewsStand complete Daily v24 — maker pixel inspection

Status: `MAKER_INSPECTION_PASS_PRIVATE_SUCCESSOR`

This is the maker's inspection of the real current Daily, complete page and
article pixels. It is not Ali approval, an independent visual admission,
canonical content admission, deployment or public verification.

## Exact candidate identity

- Branch: `codex/newsstand-daily-visual-repair-20260813`
- Story: `operations/product-stewards/newsstand/candidates/ai-work-files-private-details-2026-08-12-story-record-candidate-v3.json`
- Rejected predecessor package: `operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v2.json`
- Rejected predecessor package SHA-256: `331fce79e55cdeaf86597342aac9ffb0ab8ff383b37e423e8814fdfdd07f4ae0`
- Rejected deployed-preview receipt: `operations/product-stewards/newsstand/evidence-newsstand-daily-review-v23-deployed-2026-08-13/MAKER-VISUAL-REJECTION.md`

## Exact pixels inspected

| State | Dimensions | SHA-256 | Maker observation |
|---|---:|---|---|
| 1440 Daily | 1278 × 1343 | `1c673f722fc815b75bc93fdbcd7c03f7d1d93c107a6d575c40a4cc751edcfd2e` | One newspaper front: masthead, four-part paper index, sourced lead and compact four-desk side column. No arrival rack is duplicated above it. |
| 390 Daily | 372 × 1705 | `7e262b1666845d39ce243ddfda50744640d5a333548d038fbf4bea302b8bface` | Headline, answer, interpretation and action remain readable before the bounded horizontal desk rail. The partial next desk and “Swipe for all four” instruction make the continuation explicit. |
| 320 Daily | 306 × 1819 | `e15d4b3bccb35ede6ed8679391cc1ba8a27fb96fca698d6a82a864f4606e4398` | The same hierarchy survives at the narrowest target without horizontal document overflow or clipped text. |
| 1440 article | 1040 × 3590 | `1d95ee038bac9a6968b7d0c9b03fc7a9430a4e4c08c30b3f9d2cd240b566e715` | One continuous newspaper article with left-hand section furniture, readable body measure, a distinct action object, visible sources and a direct return to the Daily. |
| 390 article | 372 × 3270 | `ddae146ff77ebe13c88f40fd5b541539379262cbf2db3eee3e7a42709ef51fde` | Section labels, paragraphs, source links and action remain contained; the pastel rectangle stack is gone. |
| 320 article | 306 × 3673 | `fe4a4027368b70d9b8166d00582522b2de3ec36b736d0275651c2609f49298e4` | Dense but legible at 320; no paragraph, heading, link or return control clips or falls below its touch target. |
| 1440 complete page | 1440 × 3512 | `a8191891325d6ac80af69ba12d18c1cccacfffe70ccaab6bf6e03b9d39be0255` | The route opens directly on the newspaper; Catch Me Up and the searchable archive follow as secondary newspaper services. The desktop context rail stays outside the paper. |
| 390 complete page | 390 × 4516 | `7ad4e4644ab28f3595e19527ef7f4933660bee34ac7fce812fb7c7b4716e8298` | The injected public return control occupies a reserved strip below the site header rather than floating over the headline or article. |
| 320 complete page | 320 × 5035 | `6422715ca29561bcd3c6c1c79dfd5fd5177b6f2b568d56068d7e3860bcf9f366` | Daily, Catch Me Up and archive stay ordered and usable with no duplicate arrival layer or overlaid fixed control. |

## Predecessor comparison

| State | Rejected v23 | Successor v24 | Change |
|---|---:|---:|---:|
| 390 complete page | 7242 px | 4516 px | −37.6% |
| 320 complete page | 8934 px | 5035 px | −43.6% |
| 390 Daily | 3443 px | 1705 px | −50.5% |
| 320 Daily | 3887 px | 1819 px | −53.2% |
| 390 article | 4501 px | 3270 px | −27.3% |
| 320 article | 5312 px | 3673 px | −30.9% |

The reductions come from removing the duplicated arrival/rack layer, changing
the four mobile service desks from a vertical stack to one labelled swipe rail,
and turning six large pastel article boxes into one continuous edited paper.
No prose, source claim or held/public state was shortened to obtain the result.

## Known-failure inspection

- `DUPLICATE_PAGE_AND_PAPER_NAVIGATION`: absent while a reader is open. The
  fallback physical rack remains available only after closing the paper.
- `MOBILE_SERVICE_CARD_STACK`: absent. Four exact desks remain present in one
  bounded horizontal rail with an explicit mobile instruction.
- `MOBILE_RUNAWAY_SCROLL`: repaired against the exact representative issue and
  full article without hiding meaning-bearing prose.
- `ARTICLE_PASTEL_BOX_STACK`: absent. Only the genuinely actionable “Before you
  share anything” section remains a callout.
- `PUBLIC_CONTEXT_CONTROL_OVERLAP`: absent in the emulated public-build state at
  390 and 320; the control is no longer fixed over reading content.
- `CROPPED_REVIEW_MISSED_COMPLETE_EXPERIENCE`: repaired by inspecting the exact
  complete page in addition to the Daily and article elements.
- No generated imagery, new character art, invented product availability or
  unapproved story prose was introduced.

## Browser evidence

Command:

`NEWSSTAND_EVIDENCE_DIR=operations/product-stewards/newsstand/evidence-newsstand-daily-review-v24-2026-08-13 NEWSSTAND_EVIDENCE_FILTER=daily-review node scripts/test-newsstand-reader-browser.mjs`

Result: `PASS` — 247 rendered checks across desktop, 390 and 320, including
Daily-first routing, archive/search continuity, narrow label containment,
mobile desk-rail geometry, representative height guards, touch targets,
horizontal overflow and the public context-return placement.

## Maker verdict

`PASS_TO_ROLE_DISTINCT_VISUAL_REVIEW`

The successor may now consume one role-distinct visual review. It must not be
shown to Ali or described as admitted until that review independently inspects
the exact files above and rejects the known deployed predecessor unaided.
