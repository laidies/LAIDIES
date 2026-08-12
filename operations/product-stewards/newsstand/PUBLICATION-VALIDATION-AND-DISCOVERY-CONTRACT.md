# NewsStand publication validation and discovery contract

**Status:** ACTIVE OPERATING CONTRACT — AUTOMATIC DISPATCH; PUBLICATION REMAINS GATED
**Owner:** NewsStand champion with Control Room orchestration
**Applies to:** The Breaking, The Daily, The Weekly and The Big Question

## The promise

Ali does not have to remember to request each review, and a published story
does not become discoverable merely because its record exists.

Two separate automatic chains apply:

1. a **candidate validation chain**, triggered whenever a qualified candidate
   is created or materially changed; and
2. a **published discovery chain**, triggered only when an exact story becomes
   `published` or `corrected`, or an admitted continuing-story relationship is
   added, in the canonical public dataset.

Neither chain grants publication, deployment or correction authority.

## Candidate validation trigger

At the beginning of every NewsStand radar cycle, reconcile:

- `operations/drafts/**/candidate.json`;
- NewsStand story evidence records;
- the radar log; and
- the canonical public dataset.

A candidate triggers the chain when its file hash is not already bound to a
terminal `REJECT`, `HOLD`, `PASS` or superseding receipt. A materially changed
hash is a new candidate identity and must be reviewed again.

### Required chain

| Order | Owner | Required output | Automatic stop |
|---|---|---|---|
| 1 | NewsStand edition editor | Exact edition/template ruling and complete draft | Wrong edition, missing template fields or filler |
| 2 | AI Research & Accuracy | Dated claim map; primary-source retrieval; evidence/inference/position separation | Unresolved source, stale claim or unsupported statement |
| 3 | Relevant risk specialist | Security/privacy/health/legal/safety review when the subject requires it | Material unresolved risk or missing domain evidence |
| 4 | Learning System & Concepts | Durable-vs-dated distinction; exact Concepts/Class/Episode/Library dispositions; coverage in the machine-checked content work-order queue | Duplicated teaching, orphaned learning opportunity or recommendation without an owner/path/trigger |
| 5 | Independent semantic, Brand/editorial and accessibility judges | Valid prevention-first producer contract; exact-prose `PRODUCER_SELF_REVIEW`; role-distinct `INDEPENDENT_SEMANTIC_ADMISSION` bound to the exact source prose, manifest and rendered HTML; actual rendered article and desktop/mobile captures; voice, comprehension, mobile and accessibility floors | Missing/invalid shared records; drifted prose, manifest or render identity; glossary accumulation, decorative analogy, missing mechanism, generic action, any required floor below 17/20 or inaccessible result |
| 6 | NewsStand champion | Reconciled exact candidate packet and correction/freshness contract | Any missing or conflicting receipt |
| 7 | Release owner | Versioned artifact, rollback and public verification plan | No exact publication authority or failed release proof |

The maker cannot approve its own work. Later stages do not start after a
terminal rejection. A hold records the precise owner, missing evidence and
next trigger.

Stage 5 is additionally governed by
`operations/product-stewards/newsstand/STAGE-5-COMPREHENSION-GATE.md` and shared
decision `D-2026-08-07-099`. Before drafting or dispatch, explanatory prose
needs a valid producer contract. Before independent review, its producer must
record an exact-prose `PRODUCER_SELF_REVIEW`. Before Stage 5 can pass meaning,
a role-distinct reviewer must record an `INDEPENDENT_SEMANTIC_ADMISSION` against
the same source prose, manifest and rendered HTML. Both review stages are
validated with `scripts/check-prose-quality-admission.mjs`; the checker verifies
record and byte integrity but does not manufacture editorial authority. The
semantic record precedes and complements, rather than replaces, Stage 5's
actual-render Brand/editorial and accessibility judgment.

The chain is `ACTIVE` only while a named task is executing a named output.
Writing “review required” in a packet is not a trigger and is not progress.

Before Stage 6 reconciliation, the exact rendered artifact must also carry the
twelve gate results defined by the Learning Content Ecosystem operating spec.
This includes search ingestion, semantic cross-linking, sitewide canon
consistency, KSVL/song opportunity and source-bound Paige-tip/Promptoscope
derivative rulings. A generic editorial PASS cannot stand in for those
separate results. Any missing gate is a terminal HOLD for this candidate.

## Published discovery trigger

Control Room compares the canonical public dataset with the last durable
publication receipt. A new or corrected public story automatically triggers
all applicable discovery checks below against the exact released story hash.

### Discovery surfaces

1. **Homepage current-information column**
   - show the current Breaking item when one exists;
   - show at least one real Daily News item when an issue exists;
   - show the information itself, not a teaser-only link;
   - use an honest checked-and-quiet state when no item qualifies;
   - preserve the Homepage’s approved visual system and content hierarchy.

2. **NewsStand front desk**
   - newest eligible story appears under the correct paper;
   - publication status and checked date are visible;
   - direct hash and paper routes reach the same article;
   - held, stale or retracted bodies never leak.

3. **Back issues**
   - the story appears in the latest-five view for its edition when applicable;
   - “See all” exposes the complete eligible index;
   - the persistent Find a story control sits directly beneath the three
     edition choices and is never buried as footer-only navigation;
   - archive search finds exact words/phrases across headline, summary,
     admitted body, organization/product, source label, governed topic and
     controlled aliases;
   - visitors can filter by governed topic, content type and date, and can sort
     comparable results newest or oldest;
   - topic browsing works across Daily, Weekly, Big Picture, STRAiGHT TALK,
     Dear Miss Jeeves and admitted service departments while labelling each
     result's actual content type;
   - one governed many-to-many topic/alias register prevents split synonyms,
     sensational relabelling and free-form AI categorization;
   - every published item has exactly one stable primary browse topic and one
     to four governed specific tags, displayed as live links in result and
     article metadata;
   - clicking a tag opens the complete eligible cross-content result set for
     that canonical topic and announces the topic and result count;
   - a missing primary browse topic, unknown/retired specific tag, more than
     four specific tags or a disguised entity/content type fails publication,
     and a new term requires a definition, aliases and a duplicate check;
   - result ordering uses exact match, governed relationship strength and date,
     never undisclosed popularity, engagement or sponsorship; and
   - article return restores the exact query, filters and reachable result
     position.

4. **Continuing-story lineage**
   - every material follow-up exists as its own dated eligible story and release
     identity;
   - old and new stories bind exact IDs plus one allowed material-change
     relationship;
   - old article/result shows Newer reporting and the new article/result shows
     Earlier reporting;
   - Story so far shows the complete eligible chain in date order and identifies
     the current/latest item without hiding earlier articles;
   - article, edition, Homepage, Catch Me Up, topic, search, feed and related
     learning surfaces agree on the relationship;
   - missing, circular, self, contradictory or one-way relationships fail
     publication; and
   - a held successor creates no public link or implication.

5. **Related learning**
   - `class_notes` names the exact Concepts, LIBRAiRY, class, episode or tool
     continuation and its learning payoff;
   - the Learning System intake records link/update/create/decline for every
     material durable idea;
   - relevant durable content links back to the dated NewsStand application
     only when that reciprocal link improves understanding.
   - semantic matching must inspect all governed surfaces rather than relying
     only on manually remembered neighbours; every chosen and rejected link
     records its learning relationship.

6. **Open-web discovery**
   - the NewsStand route remains in the sitemap with correct canonical and
     `og:url`;
   - the story has a stable address and useful title/description for sharing;
   - a machine-readable latest-publications feed is rebuilt from approved
     public records only;
   - corrected and retracted records update the feed without exposing held
     copy.

7. **Daily learning derivatives**
   - the exact story receives a Paige daily-tip and Promptoscope fit ruling;
   - admitted derivatives cite the canonical item internally, preserve claim
     limits and carry an expiry/recheck date;
   - no derivative store, renderer or source-bound record means `BUILD REQUIRED`,
     never an invented homepage string.

8. **Returning-reader signals**
   - device-local “new since your last visit” compares the last successfully
     viewed publication timestamp with eligible public records;
   - it stores no raw search text, article body, account or sensitive reading
     history;
   - signed-in cross-device following/saving is a later account feature and
     must not be implied by device-local state.

9. **Optional distribution**
   - Audience & Growth receives a derivative scan only after exact public
     verification;
   - social, email, Resident Card inbox or push notification requires its own
     approved channel, accessible derivative and publication authority;
   - no candidate or held story enters those channels.

## Reader journeys that must pass

- first visit → understand the three editions → see the Daily and find the
  newest story;
- returning visit → see what is new since the last successful visit;
- direct story address → readable story → exact sources → related learning;
- edition → latest five → complete index;
- topic/search → cross-content-type result → article → More on this topic or
  return to the exact prior query/filters/position;
- visible article tag → complete eligible same-topic results across content
  types → return to the article or continue within the topic;
- corrected story → visible correction adjacent to the article;
- material new evidence → new dated article → bidirectional old/new links →
  complete Story so far timeline across article/search/topic/Catch Me Up;
- withdrawn central study → new dated article and old-story warning → dependent
  claim/learning recheck, not automatic LAiDIES-article retraction;
- held/stale/retracted story → no body exposure through paper, search, direct
  address, Homepage, feed or derivative.

Desktop, 390 px, keyboard, focus restoration, reduced motion and native
screen-reader semantics remain required. Public verification must check the
released artifact, not a local fixture.

## Current implementation truth

- The NewsStand currently has edition selection, direct hash stories, basic
  exact-text archive search, raw-tag topic buttons, source links,
  correction/retraction controls and fail-closed reader tests.
- It does not yet have the confirmed governed topic/alias register,
  visible-clickable-tag contract, publication guard, cross-content-type search
  index, filters, result-ranking contract or complete topic journey.
- It does not yet have canonical predecessor/successor relationship data,
  material-change classifications, bidirectional propagation or Story so far.
- The twice-daily News Radar and daily Control Room automations exist.
- The candidate evaluator is review-routing only and cannot publish.
- The Homepage Daily column is still an isolated design candidate, not a
  released discovery surface.
- A complete public machine-readable LAiDIES NewsStand feed and an accepted
  “new since your last visit” journey are not yet released.

Therefore current publication discovery is **PARTIAL**. The automatic
dispatch contract is active; full public discovery is not complete until the
Homepage, feed and returning-reader gates are built, independently accepted,
released and publicly verified.
