# Miss Jeeves proper reference tool — build packet

**Status:** SPECIFIED FROM ALI LIVE WALKTHROUGH / IMPLEMENTATION PARTIAL / PUBLIC SERVICE BROKEN
**Date:** 2026-08-22
**Entry surfaces:** Homepage and `/library.html`
**Result surface:** shareable, returnable Miss Jeeves results state inside the
LIBRAiRY world; final route choice is implementation judgment after responsive
and accessibility proof.

## 2026-09-04 successor ruling

Ali directed that Miss Jeeves must give helpful answers reflecting current best
practice or guidance in addition to what LAiDIES already publishes. The
successor therefore keeps admitted LAiDIES routes visibly separate and adds a
bounded live-source answer from a maintained trusted-source domain set that
prioritizes official and primary sources.
The current answer requires clickable citations and a checked date. Request
logging and caching are disabled for that model call; an uncited response fails
closed. This supersedes the older external-source and unrestricted-web non-goal
only to this bounded extent. It does not authorize unsourced model memory,
personalized professional advice or deployment without release authority.

## User outcome

A visitor can ask an ordinary-language AI learning question without knowing the
right terminology. Miss Jeeves interprets what she means, gives a short useful
answer supported by current admitted evidence and shows the best exact ways to
continue—while explaining what each format will help her do.

## Required result structure

1. **Miss Jeeves understood:** one short restatement only when it adds clarity.
2. **Quick answer:** a few plain-language sentences generated solely from the
   retrieved current excerpts, with an explicit exact/related/no-coverage state.
3. **Understand the principle:** exact admitted LIBRAiRY section and whole-book
   option.
4. **See it explained:** related Episode and exact relevant point when indexed.
5. **See what is happening now:** exact NewsStand story/edition with date and a
   sentence explaining its relevance.
6. **Try it or reinforce it:** available Study Pack, tool, game or activity.
7. **Learn it step by step:** admitted SUNNYVAiLE High class when present.
8. **Already on our list:** a real public-safe roadmap record, with truthful
   status language and no invented date.
9. **Trusted places beyond SUNNYVAiLE:** approved official pages, guides or
   voices/profiles, each with why it is useful and its last review date.

Empty groups do not render. Related material never impersonates an exact
answer. Every destination shows its current availability before activation and
deep-links to the exact section/story/activity wherever supported.

## Current baseline and gaps

| Capability | Current evidence | Verdict |
| --- | --- | --- |
| Homepage question handoff | `content/site/homepage.js` sends the question to the Library hash | BUILT LOCALLY; public result service still broken |
| Library question UI | `library.html` input, chips, live region and inline cards | PARTIAL; no grouped full results experience |
| Short generated answer | `_worker.js` optional Workers AI path, grounded to supplied records, maximum 90 words | BUILT LOCALLY; production AI binding unknown; public endpoint broken |
| Deterministic fallback | token/alias retrieval in Worker and a second client implementation | BUILT LOCALLY; duplicate authorities must be reconciled |
| Episodes | four current index records | PARTIAL; no exact occurrence/section metadata |
| NewsStand | published Daily ingestion in Worker | PARTIAL; no full publication-family index or reader-job grouping |
| Study Packs | available pack ingestion in Worker | PARTIAL; only available components summarized at pack level |
| Library books/sections | index contains previews, but Worker Library allowlist is empty | MISSING from backend results by design |
| Tools/activities | static index contains several current/preview records | PARTIAL; no reinforcement-job or exact-learning mapping |
| High classes | no class records in current index | MISSING |
| Planned content | no governed roadmap retrieval schema | MISSING |
| External sources/voices | no trust register or external record schema | MISSING |
| Privacy-safe aggregate signal | optional `MISS_JEEVES_SIGNALS`; local leakage test passes | BUILT LOCALLY; binding/retention/public delivery unproved |
| Public API | synthetic POST returned empty HTTP 405 on 2026-08-22 | BROKEN PUBLICLY |

## Dependency-ordered implementation

### Phase 1 — governed retrieval truth

1. Replace the manually maintained flat index as authority with a deterministic
   compiler from admitted product manifests, publication stores, exact book
   section manifests, episode occurrence records, Study Packs, tools/activities,
   High classes, public-safe roadmap records and an approved external trust
   register.
2. Define one retrieval schema with stable parent/section IDs, learning job,
   exact/whole routes, summary, availability, source IDs, dates, freshness
   owner/triggers, public artifact identity and correction propagation.
3. Fail closed when any result is held, stale, unreviewed, missing its public
   route or absent from the deployed artifact.
4. Compile the seven current browser-curated answers through the same records or
   retire them. The browser may cache/render results; it may not own facts.

### Phase 2 — retrieval and interpretation proof

1. Run exact title/alias/deep-link matching first.
2. Add semantic retrieval over admitted section-level records, with metadata
   filters applied before ranking.
3. Ask at most one clarification when ambiguity changes the result set.
4. Require exact/related/none classification and a reason each returned record
   fits the question and learning job.
5. Start with the static governed corpus. Evaluate Vectorize only after the
   representative query suite proves lexical/static semantic retrieval is
   insufficient at the actual corpus size.

### Phase 3 — grounded answer service

1. The model receives the question and only the selected current excerpts plus
   bounded metadata.
2. It returns schema-validated answer text, interpretation and selected IDs; the
   server rechecks every ID, status, date and route.
3. Model failure falls back to deterministic grouped results without inventing
   an answer.
4. Choose the provider/model only after a blind representative evaluation of
   answer fidelity, interpretation, refusal/no-coverage behavior, latency and
   cost. The existing Cloudflare model is a baseline, not a locked choice.
5. For Cloudflare Pages, prove the production `AI` binding in the dashboard and
   runtime; repository code cannot prove it. An OpenAI API alternative would
   require a server-side secret, provider privacy/cost review and the same
   grounded structured-output gate.

### Phase 4 — results experience

1. Build one responsive, keyboard-operable, shareable results state using the
   required grouped structure above.
2. Preserve the question across retry and route changes without leaking it to
   analytics, URLs beyond the deliberate share state, or session replay.
3. Make the Homepage and Library entry points converge on the same service and
   results renderer.
4. Bind the visual architecture into the Library page-elevation candidate, then
   pass the exact design Review Door before Ali sees it.

### Phase 5 — release and learning

1. Calibrate the query suite with deliberately wrong, stale, held and
   superficially similar records.
2. Verify exact source commit, Pages artifact, Worker entrypoint, AI/search
   bindings, immutable deployment and `laidies.ai` behavior.
3. Record only controlled aggregate topic, outcome, placement, latency band and
   source IDs. Never retain raw questions or answer text in analytics.
4. Use zero-result/related-result and high-demand exact-result patterns to
   distinguish missing coverage, weak discovery and retrieval defects.
5. Offer a separate disclosed topic-request intake when coverage is absent or
   inadequate. It stores only deliberately submitted text, protects against
   private/confidential data and abuse, deduplicates similar requests and
   returns a receipt where supported. It is not raw-query logging.
6. Route a demand/coverage recommendation to the best product job—Library,
   NewsStand, Episode, High/class, reinforcement or Miss Jeeves—not a book by
   default. A human owner decides whether a roadmap item is created.

## Representative acceptance suite

The first proof must cover at least:

- exact Library section plus whole-book option;
- one question spanning Library, Episode, NewsStand and reinforcement;
- a current Daily story distinguished from a durable principle;
- a class result and a real planned-content result;
- one governed official source and one trusted voice profile;
- ambiguous question requiring one clarification;
- superficial keyword overlap rejected;
- held/stale/demoted/private records absent;
- model unavailable with useful deterministic results;
- index unavailable with question-preserving retry;
- no coverage with no invented answer/date;
- high-demand covered topic routed to discovery improvement rather than a
  duplicate content proposal;
- explicit topic request consent, redaction/moderation, deduplication and
  owner receipt while passive raw questions remain absent;
- Homepage and Library parity; and
- zero raw-question leakage.

## Current platform recommendation

Keep the first implementation on the existing Cloudflare Pages/Worker boundary
unless blind evaluation shows the answer model is inadequate. Workers AI is
already coded and avoids introducing another API secret; however, Pages requires
an AI binding configured in the Cloudflare dashboard. If section-level volume
later justifies semantic infrastructure, Cloudflare Vectorize supports metadata
filtering that can enforce type/status boundaries before nearest-neighbour
ranking. Neither a model nor a vector score can admit content.

Primary platform references checked 2026-08-22:

- Cloudflare Workers AI bindings:
  https://developers.cloudflare.com/workers-ai/configuration/bindings/
- Cloudflare Vectorize metadata filtering:
  https://developers.cloudflare.com/vectorize/reference/metadata-filtering/

## Ownership and exact write lanes

- Library product owner: this dossier, result architecture and integration.
- Learning/content data owner: governed retrieval schema/compiler and section
  records.
- NewsStand/Episodes/High/Study Pack/tool owners: exact producer manifests and
  current public-safe metadata only.
- Trust/editorial owner: external source/voice register, dates and corrections.
- Backend owner: `_worker.js`, model/search adapter and API tests.
- Frontend/UX owner: Homepage handoff and Library results surface.
- Platform/release owner: Cloudflare bindings, privacy, cost, deployment and
  public verification.
- Independent judges: information architecture, trust/accuracy, retrieval,
  accessibility, Brand/visual and release.

No lane may invent another content authority or promote a held record.

## Non-goals

- Unrestricted web search or model-memory answers.
- Personalized professional advice.
- Raw-query analytics, inferred-needs profiles or account history.
- Invented roadmap dates or social accounts.
- A generic chatbot transcript as the result experience.
- Making a book available to improve search coverage.
- Deployment or provider binding without the applicable release authority.
