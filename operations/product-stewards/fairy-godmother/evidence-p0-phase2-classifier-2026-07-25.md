# FAiRY Godmother P0 phase-2 meaning-aware classifier candidate

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT REVIEW REQUIRED  
**Scope:** FG-05 boundary/domain/task classification, FG-06 currentness
classification, untrusted-content isolation and the immediate no-charge success
containment. Production, bindings, credentials and deployment were not changed.

## Trigger

Three independent local reviews found that the deterministic phrase and
concept-family router could both:

- miss ordinary high-risk or volatile meanings and send them to the answer
  model;
- commit temporary verified allowance after those false negatives; and
- block legitimate safety education, workplace drafting, transformation and
  general financial-literacy work.

The third verdict concluded that the defect was architectural. Adding more
synonyms would not make a phrase matcher a semantic safety/currentness
classifier.

Evidence:

- `independent-review-p0-phase2-2026-07-25.md`
- `independent-review-p0-phase2-repair-2026-07-25.md`
- `independent-review-p0-phase2-repair-2-2026-07-25.md`
- BTB-089 and BTB-098 in `operations/painpoints-log.md`

## What changed

### 1. A separate classifier owns the pre-generation decision

`worker-fairy-godmother/src/index.js` no longer derives safety, scope or
currentness from product-owned phrase lists.

The Worker now requires either:

- an injected `REQUEST_CLASSIFIER` adapter with `classify(envelope)` or
  `fetch(...)`; or
- an explicitly configured OpenAI-compatible classifier using the separate
  `CLASSIFIER_API_KEY` and `CLASSIFIER_MODEL` environment values.

The ordinary answer model is not a fallback classifier. If the classifier is
missing, unavailable, malformed or uncertain, the Worker returns typed
`classification_uncertain`, calls no answer model and commits no allowance.

No classifier binding, model or secret was added to Wrangler or any environment
in this cycle.

### 2. The input becomes clauses and untrusted content before classification

The deterministic preprocessing layer has a deliberately narrow job:

- NFKC, punctuation, whitespace and zero-width normalization;
- a secondary common-confusable representation;
- obfuscation, confusable and non-Latin signals;
- clause segmentation; and
- separation of quoted material from user instructions.

It does not decide whether words are medical, unsafe, legal or current. The
classifier receives the original and normalized forms, signals and every
clause.

### 3. The classifier contract is strict and versioned

Every result must use schema `1.0.0` and include:

- language code, support status and confidence;
- overall confidence;
- every supplied clause ID exactly once;
- the preprocessor-owned role (`user_instruction` or `quoted_content`);
- decision, domain, task, risk and confidence;
- boundary when applicable;
- a currentness requirement and ontology category; and
- reason codes.

Unknown enum values, missing/duplicate clauses, role drift, inconsistent
boundary/currentness fields or malformed JSON invalidate the whole result.

The allowed decisions are:

`allow | boundary | verify_current | clarify | uncertain |
transform_untrusted`

### 4. Mixed intent is aggregated fail-closed

Classification happens per clause before exceptions or transformations are
applied.

- A boundary clause wins over a safe drafting or education clause.
- A current-fact clause wins over a stable drafting wrapper.
- Unsupported language and any uncertain actionable clause return
  `classification_uncertain`.
- Obfuscation/confusable signals raise the confidence floor from `0.90` to
  `0.98`.
- A high-confidence crisis boundary can still win when the language is not
  otherwise supported.
- Quoted content can only be `transform_untrusted` or `uncertain`; it cannot be
  promoted into a user instruction by the classifier.

This closes the earlier whole-request exception in which “draft an email”
could waive a separate acute-health question.

### 5. Currentness is a product ontology, not a brand list

The classifier must identify the load-bearing volatile relationship, using:

- product price or plan;
- product capability or access;
- regional availability;
- product-model assignment;
- officeholder;
- law or legislation;
- wage, rate or benefit;
- schedule or deadline;
- release status;
- research or evidence;
- forecast or market state; or
- another volatile fact.

Any such clause returns typed `needs_verified_information`. Because no verified
retrieval/claim-validation provider exists, it does not continue to the answer
model.

### 6. Answer success now has a structured validation boundary

For ordinary allowed routes, the answer model is instructed to return one JSON
object containing:

`read, deliverable, reasoning, assumptions, unknowns, nextMove, sources, asOf`

The Worker rejects prose, missing fields, extra fields, empty reasoning,
source-bearing stable answers and non-null `asOf` values. Temporary allowance
is committed only after that object passes validation. A verified allowance
commit is now reported as `play.outcome = spent`; guest preview remains
`not_spent`.

This is immediate containment, not the authoritative FAiRY Plays ledger and
not proof that a schema-valid answer is a high-quality answer.

Revision generation also requires an allowed classifier result. The previous
draft is sent as explicitly untrusted draft content.

## Local verification

No test called a real classifier or answer provider. Meaning-aware results
were injected into the Worker so the suite could test the contract, aggregation
and side effects independently from any provider.

```text
cd worker-fairy-godmother && npm test
PASS recovery checksum
PASS recovered bytes 55137
14/14 Worker contract tests PASS
45/45 evaluation fixture integrity PASS

cd worker-fairy-godmother && npm run dry-run
PASS — 84.29 KiB / gzip 27.11 KiB; no bindings found

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
```

The Worker tests cover:

- missing, throwing and malformed classifier outcomes;
- full clause coverage and role validation;
- configured classifier call before the separate answer call;
- mixed safe-draft plus high-risk clause precedence;
- medical, crisis, multilingual crisis, interpersonal danger, legal,
  individualized financial, fraud, account-intrusion and direct-injection
  outcomes;
- unsupported language, obfuscation confidence and confident crisis
  precedence;
- every currentness ontology family needed by the third review;
- legitimate safety education, drafting, transformation and general
  financial-literacy controls;
- untrusted quoted-content isolation;
- malformed structured answer rejection and zero allowance writes;
- verified allowance commit only after a validated answer; and
- classifier gating and draft isolation for revisions.

## What this evidence does not prove

Local injection tests prove the architecture and side effects. They do not
prove that a selected semantic classifier correctly understands held-out
language.

Before this candidate can clear phase 2:

1. an independent reviewer must select/configure the candidate classifier
   separately from the maker;
2. the review set must be held out from classifier prompt/model tuning;
3. unsafe, volatile and legitimate-use confusion matrices must include every
   prior failure plus novel euphemism, negation, code-switching, multilingual,
   obfuscation and mixed-intent cases;
4. non-allow Worker routes must show zero answer-model calls and zero allowance
   writes under verified identity;
5. classifier latency, malformed-output and outage behaviour must pass;
6. provider privacy/retention, cost and model-version pinning must be reviewed;
7. the independent product, accuracy/safety/trust and LAiDIES-brand scores must
   each reach 17/20; and
8. the full 45-case suite must later pass at API and rendered-page level.

The classifier adapter still sends the request text necessary to classify it.
No provider choice or data-processing terms are approved by this local work.

## Remaining P0 order

1. independent held-out classifier judgment;
2. verified retrieval and claim/source validation;
3. task-specific answer-quality evaluation beyond schema shape;
4. authoritative case and FAiRY Plays ledger;
5. typed frontend rendering and truthful copy;
6. isolated staging API/page, accessibility, latency and failure evidence; and
7. independent release gates.

Production remains unchanged and the product remains **FIX BEFORE PROMOTION**.

## Learning scan

This cycle applies BTB-098’s prevention rule: a fixed phrase suite cannot prove
semantic safety. The new control separates semantic classification from
product routing, tests clause-level side effects, and makes uncertainty a
first-class no-charge outcome. No new painpoint beyond BTB-098 was found.
