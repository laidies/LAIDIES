# Independent review — Miss Jeeves free search

**Verdict: PASS for the exact microcopy only. Functional and answer-quality release gates remain open.**

## Why the prose passes

- The old direct-answer promise is removed. “Relevant explanations” and “may answer part of your question” accurately describe a source lookup without pretending that a match settles the visitor's question.
- “What is a context window?” is an adult, useful example and does not add a technical explanation to the interface.
- The loading and continuation copy use ordinary words, keep the visitor's question central and point to the full LAiDIES source.
- No registered known-bad pattern appears: no glossary pile-up, decorative reference, policy-memo voice, technical explainer voice, generic homework or visible production scaffolding.

## Concrete interface, security and functional findings

1. **Repaired during review — source identity was stale when review began.** The backend candidate initially searched an index whose admitted-book hashes did not match the current four live Library artifacts. The rebuilt 611-entry index now matches the four book admissions embedded in `library.html`; the separate live-book evidence records matching origin hashes. This establishes index/source identity, not excerpt quality or deployment.
2. **Repaired for this lookup; source-book correction remains open.** The first candidate surfaced the admitted Chapter 15.3 excerpt containing the unsupported “prompt matters, but it's maybe 10% … other 90%” claim. The worker now excludes that exact record through `HELD_SEARCH_RECORDS` for every query until the source is corrected. “What is a context window?” is also a designed exact lookup that returns only the maintained Dictionary entry. The source book itself is unchanged, and this guard is not a broad claim that every searchable excerpt has received a new factual review.
3. **Repaired during review — regression checks initially failed.** `scripts/test-miss-jeeves-worker.mjs` first had an invalid retired-route fixture, and `operations/live-user-journeys-20260919/backend-regression.mjs` first resolved `_worker.js` from the wrong directory. The backend lane repaired both. The legacy suite and the new regression now pass, including default and explicit free search, zero Workers AI or FAIRY calls, sparse coverage, private-input rejection and stale-index rejection.
4. **Repaired during review — health described grounded AI.** The candidate worker's `/api/miss-jeeves/health` response initially reported `grounded_ai` as `configured` or `fallback`, although the initial search path never uses AI. It now reports `grounded_ai: "disabled"` and `initial_lookup: "site-search"`.

## Verified in this lane

- The exact review text, producer contract, producer review, manifest, September 5 Library decision excerpt, current positive exemplar and all three registered negative exemplars were read.
- The Library candidate differs from the bound base in the four reviewed copy strings plus the free-search rendering/request changes; the semantic receipt binds only the copy artifact.
- A direct backend execution for “What is a context window?”, “Can I upload a work document?” and a no-match query returned `search_results` / `site-search`; a deliberately throwing `env.AI` trap recorded zero AI calls.
- The rebuilt index contains 611 entries and has no book-row mismatch against the four admissions embedded in `library.html`. The recorded live-origin hashes match those four admissions.
- `node scripts/test-miss-jeeves-worker.mjs`, the bounded backend regression with its fixture and the same regression against `content/site/miss-jeeves-index.json` all pass after the two test repairs.
- Direct runtime checks confirm “What is a context window?” returns only `book-section-ai-dictionary-term-context-window`; “Context Engineering” and a percentages-specific query never return the held Chapter 15.3 record. A throwing Workers AI and FAIRY trap records zero calls.

## Release disposition

**PASS — the bounded free-search lookup repair can release.** The identified unsupported excerpt is fail-closed at retrieval, the featured context-window question returns one exact maintained definition, the current tests pass and no AI or paid-research path is activated. The Chapter 15.3 source correction remains an open content task; this decision does not admit all Library excerpt quality or the unfinished research service.

## Final homepage example refinement

- The three old homepage links all produced zero results under the stricter free search. They are replaced with “What is a context window?”, “Can I upload a work document?” and “How do I check an AI answer?”.
- Each visible label exactly matches its encoded `q` value and preserves `from=homepage`; the form, headings, six town entrances and previously admitted service promise remain unchanged.
- Direct current-worker checks return one intended admitted Library section for each question. The labels make no factual claim of their own and do not expand Miss Jeeves beyond the current free-search service.
- The unchanged Nvidia placeholder may still produce an honest no-match result if a visitor types that wording; it is not an automatic or promoted continuation link. Broader question answering remains unfinished and is still identified as beta on the page.

## Bounded pixel review

- `19-search-result-phone.png` is rejected: the source title and excerpt collapse into a narrow right-hand column, making the main result difficult to read.
- `20-search-result-phone-fixed.png` repairs the card shell. The visitor's full question, partial-coverage sentence, source label and first result heading are readable at phone width.
- `21-search-result-phone-full.png` shows the complete result card with balanced side margins, readable line length and no horizontal overflow. The full excerpt remains inside the card and the following Library section begins cleanly below it.
- `22-search-result-desktop-fixed.png` passes the bounded desktop comparison. The question, honest partial-coverage message and one source card form a clear reading order; the excerpt is fully readable and does not overflow its container.
- The source title and excerpt in the phone and desktop candidates match `18-corrected-section-desktop.png` for Working with AI 101 section 2.4. The result UI says “From LAiDIES” and shows no active, paid or automatic research promise.
- Compared with the older `05-question-answer-phone.png` and `07-tool-choice-answer-desktop.png`, the candidate removes the generated-answer framing (“Miss Jeeves says” / “clearest answer”) and presents the material as attributed search results while preserving the page's existing visual language.
- The frontend escapes returned text and constrains returned destinations to same-origin admitted books or same-origin relative URLs. No concrete exploitable security defect was found in the bounded free-search change.

## Not done

- No browser, visual, keyboard, phone, deployment or live-URL verification.
- No admission of the refreshed index, the returned excerpts as a set, the optional paid-research path or overall Miss Jeeves answer quality.
- No root source, backend, test, registry, decision or release file was edited by this lane.
