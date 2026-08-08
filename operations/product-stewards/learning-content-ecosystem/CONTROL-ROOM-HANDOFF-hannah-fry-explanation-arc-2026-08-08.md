# Control Room handoff — Hannah Fry explanation arc v2

**Status:** VERIFIED LOCALLY / GENERATION AND REVIEW GATES STRENGTHENED / SURFACE REBIND REQUIRED

**Evidence time:** 2026-08-08T12:21:40-07:00

**Owner task:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

## Action

Ali supplied an analysis reel describing a recurring four-part structure in
Hannah Fry's high-performing explanations and ruled that it matches LAiDIES'
intended format. Learning benchmark v2 now requires substantial explanations
to plan a shared everyday/work starting point and live question, a link-by-link
causal mechanism, an earned “oh, I get it now” click and a small useful or
funny landing. The mechanism receives the largest share; safety-critical
answers may not be withheld for suspense.

Producer validation now rejects a missing or reordered full explanation arc.
Exact-prose review requires an artifact-bound `explanationArc` outcome and
rejects hooks that crowd out the mechanism, premature clicks and inflated
endings. Proportional surfaces may answer first when that serves lookup, news,
practice or safety.

## Exact evidence and tests

- `operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md`
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/product-stewards/learning-content-ecosystem/CONTENT-QUALITY-ADMISSION-GATE.md`
- `operations/DECISIONS.md`
- `operations/codex-contract/AGENTS.template.md` and both generated `AGENTS.md` files
- `scripts/check-content-producer-contract.mjs`
- `scripts/check-prose-quality-admission.mjs`
- calibrated fixtures in `scripts/test-content-producer-contract.mjs`,
  `scripts/test-prose-quality-admission.mjs` and
  `scripts/test-content-release-readiness.mjs`
- `npm run test:content-prose-quality` — PASS: producer valid 1/reject 11;
  semantic valid 2/hold 1/reject 21; explanation-arc calibration 1; release
  readiness PASS
- `./operations/codex-contract/build-agents-md.sh --check` — PASS
- the existing AI Fundamentals V3 producer contract now fails closed on the
  v1 benchmark ID/SHA and missing substantial-explanation arc, as intended;
  unrelated changed source bindings also remain stale

## Locks, dependencies and acceptance

No surface lane or release lock was used. The benchmark byte change and v2 ID
invalidate earlier v1 producer contracts before further drafting; destination
owners must rebind rather than silently inherit this rule. Learning owns the
shared benchmark/checkers; each Library, Classes, Episode, NewsStand or other
surface owner and its role-distinct semantic reviewer accept the exact
candidate.

**Next trigger:** the next new or materially revised learning candidate binds
benchmark v2 and supplies the destination-appropriate arc record before
drafting.

**Authority truth:** no book, class, episode, article, narration or public
artifact was written or changed; no deploy, publication, subscription, spend
or Ali public-release authority was used.
