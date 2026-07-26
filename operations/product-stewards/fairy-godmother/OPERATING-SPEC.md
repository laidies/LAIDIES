# FAiRY Godmother operating specification

**Status:** SPECIFIED — P0 NOT IMPLEMENTED; FIX BEFORE PROMOTION

## Identity and purpose

- **Type:** AI guidance tool inside a SUNNYVAiLE building; not a game.
- **Audience:** Women seeking practical help with AI, work/career or ordinary
  life questions.
- **Job:** Leave with accurate, safe, concrete guidance or a usable artifact,
  plus enough reasoning to adapt it and recognize its limits.
- **Brand contribution:** A memorable, funny, sassy, warm Godmother with
  excellent judgment—not a generic chat wrapper.
- **Non-goals:** medical/crisis, individualized legal, tax/investment or other
  high-stakes professional advice; dangerous/abusive help; universal chatbot.

## Experience

- **Metaphor:** cottage → parlour → private correspondence/case desk.
- **New user:** understand scope and privacy → enter a real problem → receive
  one typed outcome → use/copy the result or follow the next useful path.
- **Returning user:** verified identity and allowance → reopen an authoritative
  case where permitted → use included fittings → see case/Play receipt.
- **Failure:** boundary, needs-information, needs-verified-information,
  classification-uncertain, invalid-input, rate-limit and service-error states
  are visibly distinct and never rendered or charged as success.
- **Accessibility:** keyboard, focus, live announcements, 320/390px reflow,
  zoom, reduced motion, readable long output and bounded retry must pass.

## Mechanics

- **Input:** one meaningful sentence to 8,000 characters; no silent truncation
  or files in P0.
- **Routing:** validate and segment user instructions from untrusted content →
  separately classify every clause for language, safety, domain/task and
  currentness → aggregate mixed intent fail-closed → identify load-bearing
  missing information → allow the ordinary answer model only after the
  classifier contract passes.
- **Success:** schema-valid, safe and usable typed case response.
- **Fittings:** up to three within the same case; not framed as homework or
  required “revision.”
- **Play:** reserve only when a normal case can begin; commit only on validated
  success; release/refund every non-success.
- **Concurrency:** request IDs, expected case version, idempotency and atomic
  ledger prevent duplicate/two-tab spend.

## Content and learning

- Follow `LEARNING-CONTENT-STANDARD.md`.
- Teach enough reasoning for transfer; do not return generic affirmation
  dressed in sass.
- Separate user facts, retrieved facts, assumptions, hypotheses,
  recommendations and unknowns.
- Current AI/product/policy/price/research claims require current credible
  sources and as-of treatment.
- Analogies clarify but never replace the mechanism.
- Do not teach obsolete AI/AGI contrasts; represent uncertainty and credible
  disagreement.
- Route durable concepts to LIBRAiRY, sequenced/demonstrated learning to
  High/classes or episodes, timely evidence to NewsStand, and relevant
  practice to games/tools.

## Voice and visual experience

- Personality may shape opening, observation, rhythm and transitions.
- Personality may not change facts, sources, certainty, safety, route,
  recommendation or spend.
- Copyable deliverables remain directly usable without removing a performance.
- Existing cottage/parlour world is preserved subject to independent visual,
  accessibility and owner-taste review.

## Technical contract

- **Frozen evidence:** production v18 recovery artifact; never edit.
- **Working source:** `worker-fairy-godmother/src/index.js`.
- **Target:** isolated `laidies-fairy-godmother-staging`; no production
  bindings in the default configuration.
- **Response:** typed request and response schemas with honest HTTP semantics.
- **Classifier:** separately configured meaning-aware adapter with a strict
  versioned clause contract; missing, malformed, low-confidence,
  unsupported-language or obfuscation-uncertain results stop before the answer
  model and use no Play. Deterministic word lists are not the semantic safety
  boundary.
- **Timeout:** bounded upstream abort and retryable typed failure.
- **Identity:** verified opaque server identity; no browser-asserted email.
- **Logging/analytics:** no raw prompt, draft, email, name or case text.
- **Ledger:** authoritative append-only grant/reserve/commit/refund records
  after typed-success and identity prerequisites.

## Evidence and release

- Evaluation set: all 45 versioned cases at API and rendered-page levels.
- Required independent gates: product quality, accuracy/safety/trust, LAiDIES
  brand, learning/transfer, UX/accessibility, technical/data/ledger and exact
  release verification.
- Quality, accuracy/trust and brand each require at least 17/20 with no hard
  failure.
- Production remains unchanged until a separate release packet proves the
  exact candidate, isolated staging results, rollback and public-copy truth.

## Source trail

- `docs/product/fairy-godmother-p0-product-contract.md`
- `operations/research/fairy-godmother-worker-recovery-2026-07-25.md`
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`
- `operations/engine/LEDGER.md` decisions D-045 through D-048
