# Public freshness pattern — Checked, Updated and Why

**Status:** OWNER DIRECTION RECEIVED — IMPLEMENTATION HANDOFF  
**Scope:** Living LIBRAiRY books and other indexed LAiDIES entries with
changeable facts, product guidance, research, policy or external sources  
**AIDB status:** Handoff only; implementation and public verification remain
with the affected content/site owners.

## Reader promise

Every living treatment should answer three questions without making the reader
inspect a source ledger:

1. When did LAiDIES last check this?
2. Did the answer actually change?
3. If it changed, why?

## Five public states

| State | Meaning | Public example |
|---|---|---|
| `CHECKED` | Sources were re-opened; reader-facing meaning still holds | **Checked July 27, 2026 · This answer still holds.** |
| `UPDATED` | Evidence, product behavior or reader guidance materially changed | **Updated July 27, 2026 · New evidence changed what we say about early-career hiring.** |
| `CORRECTED` | A previous statement was wrong, misleading or too broad | **Corrected July 27, 2026 · We had applied an API limit to the consumer app.** |
| `REVIEW DUE` | A date/event trigger fired and currentness is not re-established | **Review due · A new model generation has shipped. Use this comparison cautiously.** |
| `RETIRED` | The treatment no longer represents the current product/evidence | **Retired July 27, 2026 · Replaced by the current Model Wardrobe.** |

`NEW` may be used at initial publication, but it does not replace the content
version or future freshness states.

## Dates that do different jobs

- `firstPublishedOn`: first public admission.
- `lastCheckedOn`: last completed evidence review, whether or not copy changed.
- `lastUpdatedOn`: last material change to reader-facing meaning.
- `nextReviewOn`: calendar review, when applicable.
- `nextReviewTrigger`: event trigger such as a model generation, provider
  policy change, new dataset, correction or broken source.

An automation opening a file does not change any date. A spelling, CSS,
accessibility or layout repair may have its own site revision, but does not
become a factual `UPDATED` stamp unless reader-facing meaning changed.

## Public placement

### Book/entry masthead

Show one compact line below the title/deck:

> **Updated July 27, 2026** · New evidence changed the early-career hiring
> answer. **Why this changed ▾**

For a completed no-change review:

> **Checked July 27, 2026** · Sources re-opened; the answer still holds.

### “Why this changed” disclosure

An accessible `<details>` disclosure shows:

- the one- or two-sentence change summary;
- what evidence or product event triggered it;
- what did not change;
- source links or source drawer;
- next review date/trigger.

### Compound books

For a book such as **Straight Answers About AI**, show:

- one book-level freshness line for the collection; and
- a local `Checked/Updated` line on each independently perishable question.

Do not restamp all fifteen answers because one jobs answer changed.

### Change history

At the end of the entry, show the three most recent semantic changes. Keep the
complete machine-readable history even when the public list is abbreviated.

Example:

- **July 27, 2026 — Updated:** Added new evidence on expertise and hiring;
  conclusion remains qualified.
- **June 18, 2026 — Checked:** Provider and research sources re-opened; no
  reader-facing change.
- **May 4, 2026 — Corrected:** Separated projected job creation from measured
  employment changes.

## Canonical metadata

Each living entry or independently perishable section needs:

```json
{
  "contentId": "ref-straight-answers",
  "sectionId": "jobs-will-ai-replace-me",
  "contentVersion": "sha256-…",
  "freshnessState": "UPDATED",
  "firstPublishedOn": "2026-06-01",
  "lastCheckedOn": "2026-07-27",
  "lastUpdatedOn": "2026-07-27",
  "updateReasonCode": "NEW_EVIDENCE",
  "updateSummary": "New evidence sharpened the role of expertise and recovery.",
  "whatDidNotChange": "The answer remains conditional by task and field.",
  "sourceIds": ["…"],
  "nextReviewOn": null,
  "nextReviewTrigger": "New labor dataset or material methodology correction",
  "owner": "LIBRAiRY",
  "history": []
}
```

Allowed reason codes:

- `NEW_EVIDENCE`
- `PRODUCT_CHANGE`
- `POLICY_OR_TERMS_CHANGE`
- `CORRECTION`
- `SCOPE_CLARIFICATION`
- `SOURCE_REPLACED`
- `READER_CONFUSION`
- `RETIRED_OR_MERGED`

## State-change authority

1. AIDB or another freshness scout identifies the trigger and prepares the
   evidence handoff.
2. The content owner verifies the source and accepts/rejects the semantic
   change.
3. The renderer derives the visible stamp from canonical metadata.
4. Tests confirm the displayed date, state and explanation match the accepted
   record.
5. Public status requires deployment and verification at the live URL.

The AIDB run date is never the public update date by implication.

## Reuse what already exists

- Straight Answers already has per-question `Verified / recheck when` lines.
- `content/site/current-models.js` already exposes a visible `lastVerified`
  stamp from one volatile-model source.
- The Verification Rulebook already carries published, content-version,
  last-reviewed, next-review and “what can change” metadata.
- The Library correction contract already distinguishes correction state,
  resolution, versions and supersession.

The implementation should converge these patterns rather than add a fourth
unrelated timestamp system.

## Acceptance checks

- `CHECKED` and `UPDATED` cannot be confused visually or in accessible text.
- Every `UPDATED`/`CORRECTED` record has a non-empty reason and history entry.
- `lastUpdatedOn <= lastCheckedOn`.
- A triggered/due item cannot render as current without an accepted recheck.
- One section update does not restamp unrelated sections.
- Formatting-only changes do not bump semantic dates.
- The visible metadata and source record agree.
- Mobile readers can open and close “Why this changed” without losing their
  reading position.

