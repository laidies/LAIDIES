# LIBRAiRY Product Steward Charter

**Status:** BUILDING — manual launch deep dive complete; no persistent runner is wired
**Product owner:** LIBRAiRY product steward
**Portfolio owner:** Codex portfolio orchestrator
**Founder decision owner:** Ali

## Product promise

The SUNNYVAiLE LIBRAiRY makes a newcomer more capable with AI: she can enter a real library room, identify the right kind of help, open a substantial and honest source, get a direct answer when she does not know where to start, and save an exact useful place for later.

The product is not a decorative bookshelf, a generic site search, a public
card catalogue, or a claim that all displayed books are current and approved.
Its physical shelves and books are the browsing experience; Miss Jeeves and
saved Puffy routes complete one reference journey. “Catalogue” is internal
publication/search language, not the visitor-facing metaphor.

## Owned scope

- `library.html`: room arrival, physical shelf browsing, availability truth, in-place reader, Miss Jeeves.
- Rendered book families under `content/library-books/`, including editorial readiness, source/currency gates and cross-book ownership.
- Book and exact-section saves via `content/site/puffy-bookmarks.js`, the personal 10-sticker pouch, and retrieval from My Closet.
- The reference/retrieval relationship with the legacy Reference Closet and the current correction/feedback route.

## Out of scope

- SUNNYVAiLE High’s structured classes, quizzes and mastery claims.
- Identity/reward-account architecture beyond accurately representing the LIBRAiRY’s device-local saves and escalating shared-platform defects.
- Public deployment, editorial publication, or changes to shared canon/brand decisions.

## Definition of a healthy journey

1. A new visitor understands in ten seconds that this is a reference library, that covers are controls, and that Miss Jeeves can route a question.
2. She can distinguish available books from previews before attempting to open one.
3. An available book opens with a stable title, usable contents, complete readable body, source/currency context where required, and a recovery state if loading fails.
4. Miss Jeeves gives a short evidence-grounded answer, then explains and groups the best exact working continuations across Library, Episodes, NewsStand, reinforcement, High classes, real planned content and vetted external sources or voices.
5. She can save a whole book or exact section using one of her ten Puffies, reopen that exact location from My Closet, and remove it.
6. A returning visitor can recover device-local saves without a false cross-device/account claim.
7. A reader who spots an error can reach a clear editorial correction route; material corrections have an owner, source record and visible resolution status.

## Quality and decision rules

- The earlier straight-on three-bay room is implementation evidence, not the
  current visual authority. Ali has rejected its over-image header, white/pink
  treatment, book spotlights, limited growth capacity and current UX as the
  final Library design. Use `EXPERIENCE-BRIEF.md`; the replacement structure
  remains an owner decision.
- A rendered fragment, a passing link check, or a loading reader is not editorial approval. Every available book needs its own content/currency evidence.
- Use the fixed LAiDIES status vocabulary. `REPORT READY`, `BUILDING`, and `VERIFIED LOCALLY` do not imply `VERIFIED PUBLICLY`.
- Save wording must remain device-local unless a tested account-backed sync proves otherwise.
- A correction intake must answer before it routes; it may not present an email address or generic Town Hall form as a sufficient substitute for a book/claim-specific correction path.

## Current dependencies

| Dependency | Why it matters | Current truth |
| --- | --- | --- |
| Rendered book fragments | Reader content and deep links | Mixed readiness; Vocab/Concepts architecture remains under ruling; several live books have explicit editorial holds. |
| Governed cross-town retrieval records | Miss Jeeves retrieval and exact deep links | Current candidate uses a 26-record flat `site-index.json` plus limited dynamic ingestion; it lacks the required section, class, roadmap, external-trust and freshness schema. Local Worker tests pass, but the public API returned empty HTTP 405 on 2026-08-22. |
| Puffy bookmark script + My Closet | Save/retrieve journey | Device-local `localStorage`; local round trip was previously verified, not account sync. |
| Town Hall feedback | General feedback | Exists, but is not a LIBRAiRY correction workflow. |
| Plausible/Clarity | Learning from behaviour | Scripts are present on related surfaces, but no LIBRAiRY event contract, aggregate pull, baseline or evidence packet is wired. |

## Steward triggers

- Any book/body/source/availability or site-index change.
- A source correction, stale claim, broken deep link or reader failure.
- A Puffy or My Closet persistence/retrieval change.
- A repeated search-zero-result, failed save/reopen, or accessibility issue once instrumentation exists.
- A new episode that changes a book’s promised availability or content currency.
- Monthly editorial-health review and quarterly product-scope review, once the operating-system scheduler exists.

## Escalations

- **FIX BEFORE LAUNCH:** a live book with known factual/editorial hold presented as reliable; broken saved-route retrieval; false persistence claim; inaccessible core reader/search control; or direct-answer link that fails.
- **HIDE/LABEL FOR LAUNCH:** a preview/placeholder that looks available, a book whose currency is unverified, or a visual route without current rendered evidence.
- **Ali decision:** book-family ownership boundaries, representative content standard, large visual direction, and any change to the truth of public availability.
