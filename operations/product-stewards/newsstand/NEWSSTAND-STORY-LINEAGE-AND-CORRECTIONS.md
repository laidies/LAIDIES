# NewsStand continuing-story, correction and retraction contract

**Status:** ALI CONFIRMED / SPECIFICATION ONLY / IMPLEMENTATION REQUIRED

**Decision date:** 2026-08-12

## Core rule

LAiDIES does not silently rewrite yesterday's article when material new
information arrives. A reader must be able to see what LAiDIES reported then,
what became known later, whether the conclusion changed and why.

Material new information therefore becomes a **new dated article** in the
edition earned by its urgency and reader job. `Follow-up` is a relationship,
not a fifth publication type: the new item may be Breaking, Daily, Weekly or a
new contribution to Big Picture.

The new article begins in plain language:

> On [original publication date], LAiDIES reported [the relevant earlier
> finding/understanding]. On [new date], [new evidence/information] became
> available. This [does not change / changes / overturns / materially expands]
> the earlier conclusion because [reason].

It then explains:

1. what was known and reported earlier;
2. exactly what is new and where it came from;
3. whether the earlier facts, interpretation and reader action still hold;
4. what changed, did not change or remains unknown;
5. why the difference matters; and
6. what the reader should understand, check or do now, when an action is
   genuinely useful.

## Materiality rule

A new follow-up article is required when the new information:

- changes, overturns, materially narrows or strengthens a published conclusion;
- resolves a material unknown or dispute named in the earlier article;
- adds a consequential actor, mechanism, affected group or real-world impact;
- changes the practical advice, safety boundary, product availability, legal
  position or other reader decision;
- withdraws, corrects or substantially qualifies evidence central to the old
  story; or
- is itself receiving meaningful coverage such that silence would make the
  NewsStand look stale or leave a reader unable to reconcile what she is now
  hearing with what LAiDIES previously published.

A typo, punctuation repair, broken link, formatting fix or source-label cleanup
does not create a new article when meaning is unchanged. It may be repaired in
place with an internal edit record. Quiet in-place editing may never change a
claim, conclusion, uncertainty boundary or reader action.

## Bidirectional story chain

Every material follow-up has a new immutable story ID, slug, publication date,
source/claim review and independent release identity. It binds the exact earlier
story ID(s) and one relationship:

- `CONFIRMS` — meaningful new evidence supports the earlier conclusion;
- `CHANGES` — part of the earlier understanding or action changes;
- `OVERTURNS` — the central conclusion no longer holds;
- `EXPANDS` — the earlier conclusion remains but the mechanism, scope or impact
  materially grows;
- `RESOLVES_UNKNOWN` — new evidence answers a material question left open; or
- `SOURCE_WITHDRAWN` — a central study/source was withdrawn or invalidated.

The old article receives a prominent **Newer reporting** banner at its top and
in search/archive results:

> New information was published on [date]. Read what changed and what did not.

The new article receives an **Earlier reporting** link. Neither article relies
on a one-way inline link remembered by an editor; the canonical relationship
record produces both directions and the topic/archive timeline.

When several pieces form a chain, each article shows a compact **Story so far**
timeline with dates, headlines, relationship labels and current state. Search
returns each eligible article as its own dated result while identifying the
latest item and allowing the reader to open the complete chain. It does not
collapse history into the latest body or bury the newest information inside an
old URL.

## Correction versus new information

### Correction

A correction means LAiDIES' published article contained an error or material
ambiguity based on the evidence available at publication time. The old article
keeps its URL and receives a dated correction notice beside the affected claim:

- what LAiDIES said;
- what was wrong or unclear;
- the corrected wording/fact;
- whether the conclusion or reader action changed; and
- the correction source and owner.

If the correction is material enough that a reasonable reader may have acted,
formed a substantially wrong view or now encounter conflicting coverage, it
also becomes a new dated article. That article links back to the corrected
original. A small error that does not change meaning can remain an in-place
dated correction without manufacturing a second news item.

### Later evidence

When the old article accurately represented what was known then, later evidence
does **not** retroactively make it an error. The old body remains as the dated
record and receives the Newer reporting banner. The new article explains the
change. It may be marked `superseded by` for current-guidance purposes, but not
`corrected` merely because time moved on.

### Source/study withdrawal

A withdrawn or retracted study is a new development. LAiDIES publishes a new
article when the study materially supported earlier coverage, adds a clear
warning/link to the old article and re-evaluates every dependent claim and
learning product. The LAiDIES article is not automatically retracted if it
accurately described the study and its limitations at the time.

## The narrow retraction rule

Retraction applies to the **LAiDIES article itself**, not merely to one of its
sources. It is reserved for cases where the article body cannot responsibly
remain available as an ordinary historical article, including:

- the central article was fabricated, fundamentally unsupported or attached to
  the wrong person/event;
- the main claim collapses and the article cannot be made accurate through a
  bounded correction plus visible follow-up;
- it exposes private, unlawfully obtained, dangerous or otherwise prohibited
  material that must no longer be reproduced; or
- source/approval provenance is irrecoverably invalid and continued display
  would falsely represent the article as reviewed reporting.

A retracted URL is never deleted or silently redirected. It becomes a public
tombstone showing the headline, original and retraction dates, plain-language
reason, accountable owner, linked new/correction article where applicable and
the preserved source/correction record. The unreliable body is suppressed.
Because a material retraction is itself news about LAiDIES' prior reporting, a
new dated public explanation is normally required.

Retraction is not used for ordinary new evidence, changing product details,
superseded guidance, a later disagreement or a source study's withdrawal when
the original LAiDIES article remains an accurate dated account.

## Required product behaviour

- Daily/Weekly/Big Picture fronts may surface the new follow-up according to its
  earned edition; no separate Updates tab is created.
- Homepage current-information and Catch Me Up treat the follow-up as a new
  dated publication.
- Topic pages and Find a story show both old and new items, the relationship and
  latest-current marker.
- Direct old links display Newer reporting before the old headline/body.
- Direct new links display Earlier reporting and Story so far.
- Search, feeds, related links and STRAiGHT TALK/Library consumers receive the
  same relationship and current-guidance truth.
- A material change triggers dependent claim/concept/content rechecks; it does
  not silently rewrite evergreen learning.
- Held or unapproved follow-ups do not place an unsupported public banner on an
  old article. The link appears only with an admitted exact successor.
- Every relationship is idempotent, versioned and checked for missing,
  circular, self or contradictory links.

## Current implementation gap

The current public schema supports one mutable story record with optional
`correction` and `retraction` objects. The reader can show a correction or a
retraction tombstone, but it has no canonical predecessor/successor relationship,
material-change classification, Story so far timeline or bidirectional
propagation. The existing three-stage correction/retraction fixture proves
body suppression and rollback mechanics only; it does not prove this continuing
story experience.

No article, canonical data, live route or deployment is changed by this
contract.
