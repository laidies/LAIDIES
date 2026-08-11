# NewsStand operating specification

**Status:** SPECIFIED — canonical data/reader repair built locally; release remains
**HOLD — FIX BEFORE LAUNCH**

## Product job

The NewsStand answers “what changed, what evidence supports it, and what does it
mean?” without turning volume or virality into importance. Its four papers have
different jobs:

| Paper | Reader job | Valid quiet state |
|---|---|---|
| The Breaking | Rare, qualified interruption when waiting would materially disadvantage the reader | No qualified interruption |
| The Daily | Edited briefing of consequential changes since the last issue | Nothing consequential enough to file |
| The Weekly | Durable synthesis that connects the week’s evidence | Editorial hold, stale check, or no synthesis worth publishing |
| The Tribune | Sourced argument that separates evidence, inference and position | No argument has earned the paper |

The radar is private discovery. It does not become a fifth publication and it
does not publish directly.

## Canonical data contract

- Public schema: `content/newsstand.schema.json`, version `1.0.0`.
- Runtime data: `window.NEWSSTAND_DATA` in
  `content/newsstand-stories.js`.
- Canonical edition values are exactly `breaking`, `daily`, `weekly` and
  `tribune`. `wednesday` is rejected by the public validator and reader.
- Every publication records `status`, `publishedAt`, `updatedAt`,
  `lastCheckedAt`, `maxAgeHours`, its distinct job and a truthful note.
- Every story records canonical edition, `status`, `publishedAt`, `updatedAt`,
  `lastCheckedAt`, `sourceApproval`, explicit `correction` and `retraction`
  fields, sources and an adjacent evidence-manifest path.
- Candidate evaluation is a separate **review-routing-only** object. Candidate
  labels, scores, source types, `verifiedFullText` booleans and checks are
  declarations, never evidence or publication authority. Without a separate
  independently signed/hashed approval receipt (none exists now), a
  well-formed candidate is held for independent review; it cannot receive an
  auto-publish-like result or mutate the public dataset.

Publication proposals must declare the job they ask an independent editor to
assess: Breaking proposes a qualified interruption, Daily a multi-item edited
briefing, Weekly a durable synthesis of at least two developments, and Tribune
separate evidence, inference and position. Those declarations are structural
review inputs, not proof that the job has been met.

## State and failure contract

The reader fails closed:

| State | Trigger | Reader behaviour |
|---|---|---|
| current | Dated publication record is within its edition’s check window and has an approved visible story | Show story with published/updated/checked dates and sources |
| quiet | Publication is deliberately clear | Show the paper’s job and dated quiet result; no filler |
| stale | `lastCheckedAt` exceeds `maxAgeHours` | Do not present the desk as current; explain that the check is overdue |
| hold | Dataset, publication or story is held | Suppress story body; show editorial-hold notice |
| unavailable/load failure | Contract/data is absent or invalid, or a current record has no approved visible story | Present nothing as current and name the failure |
| no data | Valid dataset contains no stories | Name the empty record; no invented arrival |
| corrected | Approved story has a complete correction object | Keep the story with a visible dated correction notice |
| retracted | Story has a complete retraction object | Suppress its body and preserve a visible retraction notice at its old route |

No visit timestamp is evidence of publication freshness.

One canonical `accessDecision(dataset, story, context, now)` gate governs paper
selection, archive search and direct/hash routes. Dataset hold, missing data and
load failure block every route. Publication hold, unavailable, quiet and stale
block that publication’s story bodies in listings, search and preserved URLs.
A stale URL remains present only as a truthful “check overdue” notice until the
source check is renewed. Correction notices preserve an eligible corrected
story; retractions preserve only the withdrawal notice and suppress the body.

Global status is derived from actual publication states. An expired
`lastCheckedAt` produces stale; a current-timestamp publication whose record is
unavailable produces unavailable, never “overdue.” Mixed desks may remain
globally ready while the gate blocks only the stale/unavailable paper and names
that degradation.

## Editorial and evidence contract

Every public story requires:

1. a claim-to-source map;
2. stable source IDs, URLs, publisher type and access dates;
3. a named source-approval state and evidence record;
4. primary/official evidence for factual and product claims;
5. independent or authoritative context when risk calls for it;
6. visible separation of vendor claim, sourced fact, inference and argument;
7. a correction owner and next recheck date; and
8. explicit correction/retraction fields even when null.

Every material story also requires an immediate learning-opportunity
transaction before the editorial packet can close:

1. list each durable concept, correction, class/practice opportunity,
   LIBRAiRY opportunity and related editorial argument surfaced by the story;
2. give each item exactly one disposition: `link`, `correct`, `update`,
   `extend`, `create`, `queue-with-trigger` or `decline`;
3. name the canonical concept owner, destination owner, exact dossier/evidence
   path, distinct format job and current status;
4. create the durable handoff in the same cycle—an unassigned “capture gap,”
   chat note or future idea is not a completed route; and
5. require the receiving owner to accept, decline or preserve the explicit
   trigger. NewsStand does not silently commission or publish the downstream
   item.

When a story introduces, changes, contradicts or materially qualifies a
durable definition, statistic or product statement, the same transaction
includes the stable NewsStand evidence/story IDs and either an existing
`CLM-*` ID or an explicit unmatched claim candidate. Learning System &
Concepts decides admission into its freshness signal inbox and claim register.
NewsStand retains authority over the dated story; it does not silently become
evergreen canon.

Health, medical, privacy, safety, legal and other hard-hold topics cannot become
visible solely on interested-party evidence. The current Health-in-ChatGPT
Weekly item has HHS and FTC context but remains held for independent review of
the revised copy.

Every new or materially changed candidate and every exact published/corrected
story follows
`PUBLICATION-VALIDATION-AND-DISCOVERY-CONTRACT.md`. Candidate creation
automatically dispatches the edition, accuracy, risk, learning,
brand/accessibility, champion and release gates. Publication automatically
dispatches exact public discovery verification across the Homepage,
NewsStand front desk, archive/search/topics, related learning, open-web feed
and returning-reader states. These triggers do not grant publication or
deployment authority.

## Reader and accessibility journeys

- A first-time reader can distinguish all four paper jobs before selecting one.
- Each paper reports current, quiet, held, stale or unavailable state
  programmatically and visually.
- Paper controls use `aria-pressed`; opening a desk, story or search result
  moves focus to the labelled reader heading or failure notice.
- “Put the paper back” restores focus to the invoking paper/search control, or
  the matching selector fallback.
- Search returns only approved visible/corrected stories; held stories do not
  leak through search.
- The reader honours reduced-motion preference and remains usable at 390 px and
  desktop widths.
- Legacy Wednesday cover artwork is retained only as explicitly labelled
  archive art. It is not evidence that a new Weekly visual has been approved.

## Dependencies and authority

The Building champion owns the reader and contract. Publication sub-champions
own editorial proposals. Accuracy/corrections independently approve claim maps.
Platform owns deployment, monitoring and rollback. Homepage, Visitor’s Centre
and shared directory champions inherit only the truthful four-job/current-or-
quiet handoff copy.

No candidate, local build, source review, commit or deploy is a publication
without the controlled producer → approval → canonical data → artifact →
public-render proof.

## Acceptance and release gate

Advance from release hold only when one hash-bound artifact passes:

- schema and all deterministic state fixtures;
- producer-to-reader and correction/rollback drills;
- exact source/evidence-manifest reconciliation;
- independent editorial/accuracy and product/brand scores of at least 17/20;
- desktop, 390 px, keyboard, 200% zoom, reduced-motion and screen-reader checks;
- current, quiet, stale, load-failure, hold, correction and retraction renders;
- exact artifact binding; and
- authorized public verification after deployment.

The current local repair satisfies only part of this gate.
