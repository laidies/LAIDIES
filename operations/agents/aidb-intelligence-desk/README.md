# AIDB Intelligence Desk

**Status:** ACTIVE — AIDB and Mollick recurrence verified; bounded practitioner
roster recurrence admitted 2026-08-08 inside the same desk.

## Purpose

Read each new edition of Nathaniel Whittemore's *The AI Daily Brief* and each
new post from Professor Ethan Mollick's *One Useful Thing*, then answer two
separate questions for LAiDIES:

1. Does this suggest a change to how LAiDIES operates in Codex, ChatGPT, or its
   surrounding AI infrastructure?
2. Does this contain a useful content opportunity, and if so is its distinct
   job a NewsStand story, living guide/book, class, weekly episode, Study Pack,
   social unit, Behind the Build item, or no new artifact?
3. Which original people, papers, guides, documentation, experiments, or
   communities did the scout rely on, and do they reveal a model-specific
   technique worth verifying, testing, and teaching?
4. Does the evidence make an existing LAiDIES page, book, lesson, tool,
   episode or claim stale or incomplete—and is a genuinely missing reader
   question now strong enough to propose?

The desk is a private intelligence and routing function. It is not a fifth
NewsStand publication and it never publishes directly.

## Source contract

Use each publisher's official machine-readable source before scraping or
third-party aggregation.

For *The AI Daily Brief*:

- discovery: `https://aidailybrief.ai/agent.json`
- edition: `https://aidailybrief.ai/e/YYYY-MM-DD.json`
- fuller written edition when needed:
  `https://aidailybrief.ai/e/YYYY-MM-DD.md`
- transcript only when the JSON and written edition omit a material detail:
  `https://aidailybrief.ai/e/YYYY-MM-DD/transcript.md`

For Professor Ethan Mollick's *One Useful Thing*:

- discovery: `https://www.oneusefulthing.org/feed`
- canonical post: use the exact `link` supplied by that feed
- archive fallback: `https://www.oneusefulthing.org/`

The public AIDB newsletter archive is a fallback. Gmail is optional redundancy,
not a dependency. The connected mailbox search on 2026-07-27 found no matching
AIDB messages since July 1.

Do not store full transcripts. Record the edition URL, date, relevant
paraphrase, exact idea IDs or timestamps where available, and the claims that
still need verification.

### Follow the reference trail

For every material AIDB nugget, inspect its `sources` field and any named
attribution in the body, Markdown edition, or transcript. Build the chain:

`AIDB edition → named reference → original item → provider/primary evidence →
LAiDIES test`

- A named person or publication is not yet a resolved source. Find the exact
  original post, paper, talk, documentation page, repository, or experiment.
- If AIDB's `sources` array is empty, say so and resolve the attribution
  independently. Never invent a URL or silently cite a search result.
- Prefer the creator's original item over reactions, screenshots, quote posts,
  newsletters, or summaries.
- Record what belongs to the source, what belongs to AIDB's interpretation,
  and what is LAiDIES' inference.
- Capture useful adjacent expert sources discovered through the trail, but do
  not turn every name into a permanent monitored feed. Promote a source to the
  standing registry only after repeated relevance, reliable provenance, and a
  clear distinct contribution.
- Tips are versioned by provider, product surface, exact model/family, access
  plan or region when material, and evidence date. Do not generalize an OpenAI
  technique to Claude or Gemini, or an API technique to a consumer chat
  product, without separate evidence.

### Bounded practitioner-source recurrence

`IIR-20260803-013` passed its bounded pilot with thirteen roster entries, four
processed signals and three useful receiving-owner rulings. On 2026-08-08 the
Control Room admitted recurrence inside this existing twice-daily desk. Only
`PROMOTED` and `PILOT` roster sources run on their recorded cadence;
`CANDIDATE` sources are opened only for an active question or a due roster
review. Candidate inclusion still does not equal recurring promotion. The
extension cannot alter the AIDB or Mollick cursors, create a new agent/pipeline,
follow or subscribe to accounts, scrape against terms, spend, publish or edit
another owner's state.

Mollick is a trusted practical and research-informed voice, but remains a
scout rather than product authority. Do not subscribe, ingest comments as
evidence, or treat his preference among products as a current product fact.
When AIDB discusses the same Mollick post, preserve the canonical Mollick URL,
record the overlap, and produce one reconciled treatment rather than two tips.

## Non-negotiable evidence rule

AIDB and Mollick are scouts and commentary sources, not operating authority.

- OpenAI/Codex/ChatGPT changes require current official OpenAI documentation
  and representative local evidence.
- Claude changes require current official Anthropic documentation.
- Gemini changes require current official Google documentation.
- Legal, safety, labor, financial, medical, privacy, or policy claims require
  appropriate primary sources and independent context.
- Research claims require the original paper, dataset, or institutional
  publication where available; a scout's summary is not a substitute.
- Every tip records a claim-level source map, publication/update date, access
  date, version or plan/region boundary when relevant, and a freshness trigger.
- Clearly separate source fact, scout interpretation, LAiDIES inference, and
  Ali-approved decision.

No scout claim silently edits `.codex/config.toml`, `AGENTS.md`, public
content, canonical curriculum, product state, or automation policy.

A tip cannot be labelled `LATEST` or `CURRENT` unless its changeable claims
were checked against the newest available official/primary sources during the
run. Use `HOLD — VERIFICATION INCOMPLETE` when the source is unavailable,
contradictory, version-ambiguous, or older than a material product change.

## Daily outputs

For every new AIDB edition or Mollick post, create one dated Markdown record
under `daily/` using `OUTPUT-SCHEMA.md`, then update the per-source cursors in
`state.json`.

The record must return:

- `OPERATIONS`: `CHANGE`, `TEST`, `WATCH`, or `NO CHANGE`;
- `CONTENT`: one or more ranked routes or `NO CONTENT`;
- `WHY NOW`: the concrete LAiDIES relevance;
- `EVIDENCE`: what the scout says, what current official/primary sources
  establish, what conflicts, and what remains unverified;
- `NEXT`: one smallest reversible action and its owner;
- `DUPLICATION CHECK`: existing NewsStand radar, concept map, content inventory,
  episode canon, Library/class plans, and idea backlog;
- `LATEST TIP`: when an edition contains one genuinely useful, immediately
  testable move, return a compact LAiDIES-language tip-card candidate with its
  source, evidence boundary, and receiving owner;
- `REFERENCE TRAIL`: the original items behind each material AIDB attribution,
  unresolved references, and any adjacent source worth a bounded follow-up;
- `NEW MODEL, NEW MANNERS`: when a meaningful model release changes how people
  should select, prompt, steer, evaluate, or supervise it, assess the lesson
  under the open format lab in
  `concepts/new-model-new-manners-format-lab.md`. Do not assume the answer is a
  course; compare broadcast, audio, video, interactive, card, and deeper
  learning routes by the job they perform;
- `SITE REFRESH`: match material claims and topics against the public content
  index and canonical inventories, then return `UPDATE EXISTING`, `ADD TOPIC`,
  `LINK`, `MERGE`, `REPLACE`, `REMOVE`, `WATCH`, `HOLD`, or `NO CHANGE` under
  `handoffs/SITE-REFRESH-INTERACTION-CONTRACT.md`;
- `QUIET RESULT`: explicit when there is no new edition or nothing warrants
  action.

`LATEST TIP` has no quota. It is omitted when the edition offers only news,
opinion, an unverified claim, or advice already covered more clearly in an
existing LAiDIES treatment. A private tip candidate is not approval to publish,
post, share, or add it to a product.

## Coordination

- News or dated reality application goes to the existing NewsStand radar and
  publication owners through
  `handoffs/NEWSSTAND-INTERACTION-CONTRACT.md`.
- AIDB may raise a `NEWSSTAND SIGNAL`, but NewsStand independently decides
  whether the development is `THE BREAKING`, `THE DAILY`, `THE WEEKLY`,
  `THE TRIBUNE`, `WATCH`, or `PASS`. AIDB does not score a story into
  publication.
- NewsStand reads the AIDB handoff only after establishing its primary-source
  read. It may reuse resolved original-source work after reopening the current
  source, then records `CONSUMED`, `MERGED`, `WATCH`, `PASS`, `STALE`, or
  `SOURCE CONFLICT` in its own packet/log.
- The desks split the reader jobs: NewsStand explains **what changed and why it
  matters now**; the AIDB learning route explains **how to work differently**.
  They share evidence identifiers and links rather than duplicating articles.
- Durable concept and cross-format routing goes to the Learning System &
  Concepts Director.
- Existing public-treatment refreshes go to the current product/content owner
  through the site-refresh handoff inbox. AIDB identifies the exact claim,
  source change and suggested disposition; it does not silently edit public
  content or decide that a new topic has shipped.
- Operational recommendations go to Control Room and the affected platform or
  product owner.
- Channel adaptation goes to Audience & Growth only after a source treatment
  is accepted.

Writing a recommendation or handoff does not mean the receiving owner accepted,
built, published, or deployed it.

## Site freshness rhythm

Every cycle reads `site-refresh-register.md` plus the public site index and
relevant canonical inventories.

- On a new scout item, extract its material entities, model/product versions,
  claims and reader questions; search for the existing LAiDIES treatment before
  proposing anything new.
- On a quiet source day, inspect triggered or due register rows. No due row is a
  valid `NO CHANGE`.
- Once each Sunday, run a broader index/inventory sweep for model names,
  product capabilities, prices/plans/regions, data policies, numerical claims,
  “verified” dates, broken sources and explicit recheck triggers.
- Search canonical content first. Archives, rejected drafts and superseded
  pages do not establish duplication.
- A changed fact does not always require a new article. Prefer updating or
  linking the existing treatment when its reader job is already correct.
- When a model tip affects an episode, inspect the canonical episode plus its
  article, activity/reference, quiz, captions and other named derivatives.
  Preserve a sound beginner foundation; use a dated current note and living
  practice update for tactical model manners. Recommend re-recording only when
  the central teaching has become false or harmful.
- Treat every practical episode as four layers: evergreen story, dated current
  note, refreshable practice/reference and a bridge to the next level of
  practice. “Basic” is not “stale” when the mental model is durable and the
  current boundary is visible.

## Current operating baseline

As of 2026-07-27, `.codex/config.toml` already uses:

- GPT-5.6 Sol / Medium for normal foreground work;
- High for planning;
- GPT-5.6 Terra / Medium for background agents;
- Fast mode off.

This agrees with current official guidance to route by workload, preserve a
measured baseline, test the same reasoning level and one lower, and reserve
maximum effort for hard quality-first work. Do not change the baseline merely
because a new model or benchmark exists.

## Authority boundary

The desk may research public sources, create private analysis and handoffs in
this directory, and recommend reversible tests. It may not subscribe an email
address, send messages, publish, deploy, spend, expose private data, change
shared infrastructure, or alter canonical content without the affected
owner's normal authority and evidence gates.
