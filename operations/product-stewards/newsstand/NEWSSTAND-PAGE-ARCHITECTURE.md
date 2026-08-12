# NewsStand page architecture — Daily first, Weekly and Big Picture above it

**Status:** ALI CONFIRMED / SPECIFICATION ONLY / VISUAL BUILD NOT STARTED

**Decision date:** 2026-08-12
**Route:** `/newsstand.html`

## Visitor model

The NewsStand opens directly as **today's Daily newspaper**. It is not a lobby
that asks a visitor to choose among four equal papers before seeing the news.

The persistent edition choices are exactly:

1. **The Daily** — default view;
2. **The Weekly** — the preceding week's connected reporting and regular
   weekly features;
3. **The Big Picture** — a searchable collection of substantial questions and
   investigations.

Archive/Search is a separate, first-class finding utility. It is not a fourth
edition choice and it may not be buried at the bottom of the page.

### Edition switcher

Daily, Weekly and Big Picture appear together at the top of the issue as three
obvious live controls. Each may use a small folded-paper, masthead or issue
silhouette, but never an icon alone. Each control contains deterministic live
text:

- **Daily** — `Today` plus its date/current state;
- **Weekly** — `This week` plus its week-ending/current state; and
- **Big Picture** — `Go deeper` plus its current-feature/archive state.

The Daily is visibly and programmatically selected on ordinary arrival. The
other choices require one obvious action, support direct links and preserve
Back/Forward behaviour. On mobile, the three labels remain readable without
horizontal hunting; supporting job text may appear beneath the selected choice
rather than being crushed into tiny type.

**The Breaking** is not a permanent empty tab or paper. A qualified Breaking
item appears above the edition navigation, with its time, minimum background
and immediate consequence. On a clear day the strip is absent. Breaking items
remain findable in the archive.

The existing locally accepted four-paper rack may supply bounded place/Paige
evidence, but its equal-four-paper navigation is superseded and must not be
integrated as the primary NewsStand experience.

### Find a story — persistent search and topic discovery

Directly beneath the three edition choices, every edition exposes one obvious
**Find a story** control. It combines:

- a plain search field for words or phrases;
- **Browse topics**;
- **All stories**; and
- a compact way to narrow results by content type and date.

This is not a fourth paper. It is the route into all eligible previously
published NewsStand work and approved related LAiDIES explainers. Search results
must distinguish:

- **topic** — what the reader is trying to understand, such as model autonomy,
  sandbox escapes, prompting, models not following instructions, privacy or AI
  at work;
- **content type** — Daily, Weekly, Big Picture, STRAiGHT TALK, Dear Miss
  Jeeves, Paige, Promptoscope or another admitted department; and
- **time/state** — original publication date, material update date and current,
  corrected, retracted or archived status.

A visitor can therefore browse everything connected to a topic without needing
to know whether LAiDIES answered it as news, an investigation, a durable direct
answer or a Miss Jeeves problem. Result labels make that difference obvious.

Search covers the exact eligible headline, standfirst/summary, governed topic
terms, aliases, named organizations/products, source labels and admitted body
text. Common-language aliases may connect a reader's wording to the governed
topic—for example, `AI going rogue` may lead to records filed under agent
autonomy, sandbox boundaries and unsanctioned action—but aliases must never
rewrite or sensationalize the story's actual claim.

Topic labels come from one governed many-to-many topic register, not whatever
words happen to appear in an article or a free-form AI classification. One item
may belong to several topics; one topic may return several content types.
Synonyms merge into a canonical topic without splitting the archive into near
duplicates. A topic page explains the topic in one sentence, shows the most
useful current starting point, then all eligible results in a clear order.

Every published item displays clickable topic tags near its headline/summary
and again in the article metadata. It has exactly one primary topic and may
carry up to four genuinely useful secondary topics. Clicking any visible tag
opens that topic's complete eligible result set with the selected tag and
result count announced. For example, clicking **Politics** shows every eligible
item tagged Politics across the Daily, Weekly, Big Picture, STRAiGHT TALK, Dear
Miss Jeeves and admitted departments.

Visible topic tags describe subject matter. Content type, date/state and named
entities are separate metadata and filters: `Weekly` is not a topic, `OpenAI`
is not silently treated as the same kind of label as `Politics`, and decorative
Rewind Era language is not a discovery tag unless it names a real governed
subject. Editors select tags from the register during production; publication
fails when the primary tag is missing, unknown or retired. New tags require a
plain-language definition, aliases and a duplicate check before use. Tag
changes are versioned so corrections and earlier discovery behaviour remain
explainable.

Default result order is useful and understandable: exact matches first, then
strong governed topic matches, with newest within comparable matches. Visitors
may choose newest or oldest. Popularity, engagement and sponsorship never
silently determine the order. Every result shows title/question, content type,
short payoff, topic labels, publication/update date and correction/archive
state before opening.

From every article, **More on this topic** returns genuinely related work based
on governed shared topics or learning relationships. It must not use vague
keyword overlap, silently personalized reading history or invented AI answers.
Back returns the visitor to the same query, filters and result position.

No eligible result is suppressed merely because it is old. Held, unavailable
or superseded drafts never appear; a retracted public record retains its route
and clear notice rather than exposing the withdrawn body. A no-result state
preserves the query, suggests real nearby governed topics when available and
offers All stories without pretending a match exists.

## Shared visual and interaction system

The Daily and Weekly are two issues in one coherent LAiDIES newspaper family.
They share masthead craft, typography, dates, sources, correction treatment,
archive behaviour and responsive reading rules, while using different issue
hierarchies for their different jobs.

They must look and behave like colourful newspapers from the LAiDIES/Rewind
Era world—not a white dashboard, a card grid or a collection of generic boxes.
Side features use newspaper departments, columns, strips, clippings and
editorial furniture. The metaphor may never create tiny type, unclear click
targets or a confusing mobile reading order.

The Big Picture is a feature/index experience rather than another daily
newspaper. It may use a magazine, dossier or Sunday-feature grammar within the
same NewsStand world, but search and question discovery must remain obvious.

## The Daily — default NewsStand front page

### Primary reading column

1. dated Daily masthead and current/quiet/corrected state;
2. qualified Breaking strip above the masthead when one exists;
3. lead Daily story in either Headline Reality Check or Plain-Language
   Explainer mode;
4. additional consequential Daily stories or an honest quiet-news state;
5. related Big Picture, Weekly, STRAiGHT TALK, Dear Miss Jeeves, Library or
   Class links only when they provide a real continuation; and
6. visible sources, checked date and correction state.

### Daily departments

These are visible as newspaper departments beside or below the lead at
desktop, and enter one clear reading sequence on mobile:

- **Paige's Practical AI Tip** — one practical AI-at-work action;
- **Promptoscope** — one funny, practical AI interaction outside work;
- **Mme CLAi-O's Reading of the Day** — reflective and non-predictive;
- **Career/Work-Life** — career guidance first, with an AI connection only
  when it improves the advice;
- **Song of the Day** — only with a working admitted listen route;
- **Did You Know?** — one verified useful fact;
- **Town note / curiosity and mutual-support action** — governed, concrete and
  clearly distinguished from reporting; and
- **clearly labelled fictional SUNNYVAiLE material**, when admitted.

A department's existence does not authorize filler. Every department has an
owner, cadence, canonical store, freshness rule and honest unavailable/quiet
state. The issue may rotate lower-frequency departments rather than present an
empty wall of boxes.

## The Weekly — connected issue, not seven Dailies stapled together

The Weekly page contains:

1. week-ending masthead and one earned front-page thesis;
2. the lead synthesis connecting at least two distinct developments;
3. additional Weekly stories where separately earned;
4. **The Week in Brief** — a compact dated index of the preceding Daily stories
   with one-line current-state summaries and links, not copied article bodies;
5. evidence chronology: what changed, conflicted or remained unknown;
6. practical implications and what to watch next;
7. **Tip of the Week** — one substantial useful action, not a recycled Daily
   card;
8. **Dear Miss Jeeves** — at most one admitted answer from the governed bank;
9. **STRAiGHT TALK spotlight** — a current question and direct route into the
   living Library reference; the Weekly does not contain or own STRAiGHT TALK;
   and
10. sources, corrections, related Big Picture work and archive access.

The Week in Brief helps a reader catch up. It does not substitute for the
Weekly's synthesis or imply that every Daily headline was equally important.

## The Big Picture — question and investigation library

The Big Picture page provides:

- a clear explanation of its job;
- the current featured question or investigation;
- search within Big Picture across question, theme, organization, consequence
  and source, while the shared Find a story control can search across all
  content types;
- browsable themes and a chronological index of eligible Big Picture work;
- for each item: question, short payoff, published/updated date, current,
  corrected, retracted or archive state, and the full feature route;
- related Daily/Weekly evidence and durable STRAiGHT TALK/Library learning;
  and
- direct article reading that separates evidence, inference, counterargument,
  conclusion and what could change it.

The index must not become a generic card wall. It should feel like opening the
NewsStand's feature archive while remaining searchable and accessible.

## Desktop and mobile order

Desktop may use a newspaper spread with a dominant lead and visible side
departments. Mobile uses this order:

`Breaking if qualified → three-choice edition switcher → Find a story →
masthead/date/state → lead → other news → daily/weekly departments →
sources/corrections → complete archive access`

No department may precede the issue identity or make sponsored, fictional or
reflective material look like sourced reporting.

## Build dependency order

1. Bind exact Daily and Weekly section/store/cadence contracts.
2. Produce and admit one realistic complete Daily content packet.
3. Prove the Daily information architecture at desktop and mobile before full
   visual production.
4. Produce and admit one realistic complete Weekly content packet, including
   Week in Brief, Tip of the Week, Dear Miss Jeeves and STRAiGHT TALK spotlight.
5. Derive the Weekly sibling layout from the accepted shared newspaper system.
6. Bind the governed topic/alias register, visible-tag rules, search-result
   contract and cross-content-type index before relying on automatic related
   links; reject missing, unknown, retired or excessive tags before publication.
7. Build the Big Picture search/index around admitted feature records.
8. Integrate the intake router, canonical stores, issue assembly, archive,
   correction and release path.
9. Run one manual Daily and Weekly through exact public verification before
   enabling recurring publication automation.

No visual, implementation, publication or deployment is authorized by this
architecture record alone.
