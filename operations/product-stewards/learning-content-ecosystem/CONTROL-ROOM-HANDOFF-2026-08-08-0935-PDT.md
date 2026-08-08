# Control Room handoff — Hannah Fry communication benchmark

**Status:** COMMITTED LOCALLY / CALIBRATED — SURFACE REBIND REQUIRED
**Evidence time:** 2026-08-08T10:14:50-07:00
**Owner task:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

## Action

Converted the previously documented Hannah Fry communication guidance into a
versioned, technique-not-voice production and review dependency. Material
learning producers now bind a proportional destination-specific communication
design before drafting. Exact-prose producer and independent review require a
`communicationBenchmark` outcome and reject name-dropping, curiosity without
payoff, familiar examples with no technical return, pastiche and entertainment
before understanding.

## Evidence and tests

- `operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md`
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/product-stewards/learning-content-ecosystem/CONTENT-QUALITY-ADMISSION-GATE.md`
- `operations/product-stewards/learning-content-ecosystem/content-producer-contract.schema.json`
- `operations/product-stewards/learning-content-ecosystem/prose-quality-review.schema.json`
- `scripts/check-content-producer-contract.mjs`
- `scripts/check-prose-quality-admission.mjs`
- `scripts/test-content-producer-contract.mjs`
- `scripts/test-prose-quality-admission.mjs`
- `scripts/test-content-release-readiness.mjs`
- `npm run test:content-prose-quality` — PASS: producer valid 1/reject 9;
  semantic valid 2/hold 1/reject 18; release readiness PASS.
- Clean detached-checkout verification of the exact path-scoped commit — PASS
  for the V3 producer contract and complete prose-quality suite. Unrelated
  worktree changes were not staged.
- `node scripts/check-content-producer-contract.mjs operations/product-stewards/library/AI-FUNDAMENTALS-101-V2-PRODUCER-CONTRACT.json`
  — expected FAIL: stale Learning-standard binding and missing current
  communication design.

## Locks and dependencies

No run-queue lane or integration lock was used. No Library, Classes, Episode or
NewsStand prose/artifact was edited. The existing AI Fundamentals 101 v2
producer contract is no longer draft-authorized; Library must rebind the
current Learning standard and the full communication design before more prose
is produced. Other destination owners rebind on their next new or materially
revised candidate.

## Acceptance and next trigger

Acceptance owner is the Learning System & Concepts Director for the shared
benchmark/checkers, followed by each destination owner and its role-distinct
semantic reviewer for the exact candidate. Next trigger: a surface owner
submits a current producer contract; AI Fundamentals 101 v2 must clear the new
dependency before its draft route resumes.

## Authority truth

Ali's ruling changed internal learning-system truth and the bounded dependency
closure is preserved in Git. It was not pushed or deployed. No public content,
route, publication, spend or public-release authority was used.
