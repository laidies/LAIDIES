# LAiDIES publication pipelines

**Status:** ACTIVE INTERNAL PRODUCTION ROUTER
**Machine authority:** `PUBLICATION-PIPELINES.json`
**Owner:** Learning System & Concepts with each named destination owner

## One intake, distinct outputs

Every exact source item is inspected, traced to the strongest available
evidence and routed to the narrowest reader job. The routing result is one of:

- `CREATE` — a genuinely new item for an earned format;
- `UPDATE_EXISTING` — new evidence changes an existing item;
- `LINK` — an existing answer or article already owns the job;
- `WATCH` — potentially material, but its promotion trigger has not fired;
- `QUIET` — the monitor ran and nothing qualified; or
- `NO_FIT` — the source has no useful job in that format.

One signal may contribute to several formats. For example, a current event may
qualify for The Breaking or The Daily while also becoming one piece of evidence
inside a broader Big Question. This is deliberate reuse, not duplication. Each
contribution records the shared signal, its relationship (`PRIMARY_OUTPUT`,
`CONTRIBUTING_EVIDENCE`, `UPDATE_EXISTING` or `RELATED_READING`), its distinct
job, work order and source versions. Each output still has its own producer
contract, payload, review, correction state and release identity.

## What publishes where

| Format | Cadence | Canonical store | Site destination |
| --- | --- | --- | --- |
| The Breaking | Event-driven; only when qualified | `content/newsstand-stories.js` | The Breaking paper at `/newsstand.html` |
| The Daily | Every day, including an honest quiet-news desk | `content/newsstand-daily-issues.json` plus governed component stores | The Daily newspaper at `/newsstand.html` |
| The Weekly | Weekly when at least two developments earn a synthesis | `content/newsstand-stories.js` | The Weekly newspaper at `/newsstand.html` |
| The Big Question | Normally one or two per month, never quota-filled | `content/newsstand-stories.js`; machine edition remains `tribune` for compatibility | The Big Question paper at `/newsstand.html` |
| Straight Answers About AI | Triggered updates plus quarterly full evidence review | `content/library-books/straight-answers.md` | The living reference book in the LIBRAiRY |
| Dear Miss Jeeves | One admitted column per week; bank intake is continuous | `content/dear-miss-jeeves-bank.json` | A recurring column inside The Daily; later KSVL adaptation reuses the same answer identity |
| Paige's Practical AI Tip | Up to one per Daily edition | `content/daily-learning-derivatives.json` | The Daily service desk |
| Career/Work-Life Tip | Up to one per Daily edition | `content/daily-learning-derivatives.json` | The Daily service desk |
| Promptoscope | Up to one per Daily edition | `content/daily-learning-derivatives.json` | The Daily service desk |

The complete exact field templates live in `PUBLICATION-PIPELINES.json` and are
machine-checked. Daily and Weekly are multi-element newspapers, not single
cards: Daily assembles reporting and independent service columns; Weekly must
connect at least two distinct developments and may carry a subordinate weekly
service item only after the synthesis exists.

## Dear Miss Jeeves bank

The initial bank is editorially pre-generated from common recurring problems.
Only an admitted item can be scheduled, and at most one can publish in a week.
Future visitor questions enter a separate private intake only after consent,
privacy, moderation, deletion and editorial-triage contracts exist. A visitor
question never receives an automatic public answer.

The written column and later radio treatment consume the same stable bank item,
canonical answer, evidence, freshness and correction state. Radio is an
adaptation, not a second factual archive.

## Agent execution rule

Before creating or advancing a NewsStand work order, the agent must name the
applicable `publicationFormatIds` from the machine registry. It then follows
that format's selection rule, store, site destination and exact template. A
missing store or site consumer becomes `WAITING_ON_PREREQUISITE` with an owner
and return trigger; the source lead may not disappear into a generic hold.

Run:

```sh
node scripts/check-publication-pipelines.mjs
node scripts/test-publication-pipelines.mjs
node scripts/check-dear-miss-jeeves-bank.mjs
node scripts/test-dear-miss-jeeves-bank.mjs
```

These checks prove contract completeness and fail-closed routing. They do not
prove that any prose is good, sourced, admitted, released or publicly visible.
