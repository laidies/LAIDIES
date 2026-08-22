# Miss Jeeves subproduct dossier

**Status:** **SPECIFIED FROM ALI LIVE WALKTHROUGH / NEW BACKEND VERIFIED
LOCALLY / PUBLIC BACKEND BROKEN**
**As of:** 2026-08-22

## Product job

Miss Jeeves is LAiDIES' proper reference and learning-direction tool. She helps
a visitor express an ordinary-language question, understands the learning job,
gives a short bounded answer from current admitted material and explains the
best ways to continue. She is not a generic chatbot, a whole-web answer engine
or the source of record.

The ideal result distinguishes what each route provides:

- **understand the durable principle:** exact LIBRAiRY book section, with an
  option to open the whole admitted book;
- **see it explained or demonstrated:** related Episode;
- **understand current reporting or the bigger picture:** exact NewsStand
  publication;
- **practise or reinforce it:** Study Pack, tool, game or activity;
- **learn it in sequence:** admitted SUNNYVAiLE High class, when available;
- **see what is planned:** truthful roadmap item with no invented release date;
  and
- **continue with trusted outside material:** current approved primary source,
  guide or trusted voice with an exact official page/profile and why LAiDIES
  recommends it.

The result starts with a short answer or orientation and then groups exact
routes by learning job. It explains what the visitor will find before she
clicks and deep-links to the exact section/story/activity whenever the
destination supports it.

## Ali-ratified visitor behavior — 2026-08-22

1. Accept a natural-language learning question from either the Homepage or the
   Library.
2. Interpret the underlying topic and learning intent, not just word overlap.
   Ask one clarification only when different interpretations would materially
   change the answer or routing.
3. Search only current governed LAiDIES records and approved external records.
4. Generate a brief plain-language answer from the retrieved evidence; never
   answer from unbound model memory.
5. Group results by what they help the visitor do, with exact source title,
   availability/currentness and a one-sentence expectation.
6. When exact coverage is absent, say so. Show related material separately and
   show a planned item only when a real roadmap record exists.
7. External recommendations come from a maintained trust register—not live
   improvisational web search—and include source/voice owner, official URL,
   last review date and reason for inclusion.
8. Preserve a shareable/returnable results state and exact deep links. A book
   section also offers the whole book.
9. Render the results as a useful LAiDIES reference surface: bold 1990s colour,
   pop-art energy, clear information hierarchy and quiet readable answer/source
   areas. Visual admission remains separate.

## Current implementation truth

- `library.html` accepts a question and the Homepage hands one to
  `/library.html#miss-jeeves?q=...`.
- Seven browser-embedded curated answers bypass the backend. They are not
  uniformly source/date bound and must be compiled into the governed retrieval
  system or retired; they cannot remain a parallel answer authority.
- The candidate `_worker.js` implements `POST /api/miss-jeeves`, loads the
  static site index plus published Daily stories and available Study Packs,
  supports optional grounded Cloudflare Workers AI synthesis and falls back to
  deterministic retrieval.
- The candidate backend rejects held/retired Library routes, has a controlled
  unavailable state and emits only bounded aggregate topic/outcome signals when
  an optional binding exists. `scripts/test-miss-jeeves-worker.mjs` passes.
- The public endpoint returned empty HTTP 405 on 2026-08-22. The newer Worker is
  therefore **not publicly installed**, regardless of its local PASS.
- `content/site/site-index.json` has 26 records and only the fields `id`,
  `title`, `url`, `type`, `section`, `status`, `summary`, `topics` and
  `aliases`. It has no exact excerpt/section graph, learner-job field, source
  evidence, freshness owner, roadmap record, class record, external source or
  trusted-voice record.
- `LIBRARY_ENTRY_ALLOWLIST` in `_worker.js` is empty. No Library book or exact
  book section can be returned by the backend today.
- The candidate AI path uses Cloudflare Workers AI model
  `@cf/google/gemma-4-26b-a4b-it`. Repository config does not prove that the
  production Pages project has an `AI` binding; Pages bindings are dashboard
  configuration and require explicit deployment/runtime evidence.
- Results currently appear as one inline answer plus an undifferentiated card
  list. They do not provide the grouped learning-path surface Ali described.

## Required governed retrieval record

Every retrievable unit—ideally an exact section, story, activity or class—must
bind at least:

- stable record and parent IDs;
- content type and learner job;
- public title, exact route/deep link and whole-object route when relevant;
- short expectation/summary and searchable topics/aliases;
- availability and admission status;
- source/evidence IDs, published/updated/reviewed dates, freshness owner and
  recheck trigger;
- depth and prerequisite where useful;
- release/public artifact identity; and
- correction/demotion propagation targets.

Roadmap records additionally require a real owner, durable planned item and
approved public status language; no model-generated date. External source and
trusted-voice records require an official URL/profile, exact subject fit,
trust rationale, owner, last reviewed date and removal/recheck trigger.

## Retrieval and answer boundary

Use hybrid retrieval: deterministic exact/alias/deep-link matching first, then
semantic retrieval across admitted records, followed by metadata filtering for
availability, content type, freshness and public release. The language model
may interpret the question and summarize only the retrieved current excerpts;
it may not choose held/private records, invent roadmap promises, browse the web
freely or add unsourced facts.

Start with the current small governed index and prove answer quality before
adding infrastructure. Evaluate Cloudflare Vectorize only when section-level
volume or measured query failures justify it; its metadata filters can enforce
status/type/date boundaries, but a vector score is not admission or truth.

## Privacy, safety and failure

- Do not send raw questions, answers, inferred needs or reading history to
  Plausible, Clarity or the aggregate signal store.
- The answer service necessarily processes the submitted question; disclose
  that plainly and define provider retention/configuration before release.
- Never request passwords, account data, confidential work or sensitive
  personal details. Provide a local clear/reset control.
- If the governed index or synthesis fails, retain the question, show a useful
  retry and allow deterministic exact matching when safe.
- A held, stale, demoted or no-longer-public destination disappears or becomes
  a truthful non-operable status across Library, Homepage and saved results.

## Acceptance

The exact build must pass a calibrated query suite covering exact, ambiguous,
related, planned, external, stale, held, demoted, typo, zero-result, provider
failure and privacy cases. Independent review judges answer usefulness,
factual/source fidelity, route relevance, distinction among learning jobs,
LAiDIES voice, keyboard/mobile/assistive behavior and visible design. Local
tests do not prove the AI binding, deployment or public endpoint.

Build authority:
`BUILD-PACKET-MISS-JEEVES-REFERENCE-TOOL-2026-08-22.md`.
