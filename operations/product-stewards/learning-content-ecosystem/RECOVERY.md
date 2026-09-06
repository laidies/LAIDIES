# Existing prose-quality package recovery

September 6, 2026. PR108 merged as `9a372e701742dcc2cb9820e49bb39c3e82b5d9df`
after both Operating baseline CI jobs passed on exact source `a83b9fb0`.
Integration work under the whole-operation audit; the Learning
System & Concepts Director retains shared learning ownership and surface owners
retain their candidates and release decisions.

## What is recovered

The existing producer, exact-prose review and release-readiness scripts, their
three tests, three record schemas, communication benchmark, exemplar registry,
six exact examples, News example evidence and the real 17 held work orders were
recovered from the preservation-sensitive `Website-homepage` checkout. They were
absent from `origin/main` at `f29dfb57`. Candidate/product files were not imported.

The registry's Episode 1 and Straight Answers paths had drifted or were absent.
Their exact registered bytes were found in commit
`a5615a66ee2a513f69de7dda656161b38185f5d8`. They now live in `quality-exemplars/`
with original path/commit provenance. Their hashes, authority, permitted uses,
strengths and limitations are unchanged. This is preservation of an existing
calibration, not new approval of historic factual claims. The current Episode 1
source and current book remain untouched. The new registry hash deliberately
invalidates older contracts; producers must read and bind the current registry.

One executable defect is repaired: when a selected positive example declares
supporting evidence, both producer and review checks validate that evidence's
path and hash. Altered evidence and incomplete bindings fail even after a maker
refreshes the registry hash. The same repair applies to every positive example,
not only the News example that exposed it.

## How to verify this boundary

Run from the repository root:

```sh
node scripts/test-content-quality-package.mjs
node scripts/test-content-producer-contract.mjs
node scripts/test-prose-quality-admission.mjs
node scripts/test-content-release-readiness.mjs
node scripts/check-content-release-readiness.mjs --require-ready 1
```

The first four commands must succeed. The last must currently fail with
`required release-ready minimum=1; actual=0`: all 17 real orders are held.
For a real release, use `--require-id <exact-work-order-id>`; an unqualified
inventory command succeeding does not mean anything is release-ready.
The first four are included in existing Operating baseline CI, without a new
schedule or service.

These tests verify bytes, record bindings, stale-record rejection and selected
failure cases. Synthetic review declarations do not demonstrate an independent
reviewer detecting weak teaching. No current content is admitted or published.

## Remaining end-to-end work

The pending reusable-learning schema currently ends at `PENDING_OWNER_ADMISSION`.
The review check requires that pending state. No executable owner-admission
transition into the existing registry has yet been recovered. An admitted
learning must invalidate stale producer contracts and be consumed before a real
successor; a marker saying that feedback was captured does not close that edge.
Preserve pending records because existing reviews bind their exact bytes.

The strict ratchet also requires both issue and cycle counts to decrease against
the preceding comparable. That becomes impossible at the zero-issue/first-cycle
floor. This recovery preserves the existing rule; a justified floor correction
and separate first-pass standard remain to be resolved, not silently bypassed.

Real uncoached known-bad evaluation, producer repair, successor observation,
destination-owner adoption and release-controller integration remain open.
Do not import unrelated product queues or claim these steps are complete because
the restored integrity tests pass.


## Actual evaluator observation and next admission trial

A fresh Sol/Medium reviewer (`chapter_evaluator`, no inherited conversation)
read the exact CQX-BAD-001 chapter bytes under a neutral temporary filename,
SHA `c3af0bae62222b53499ee1645428c9171b3bb2104ac445ba8c2a3032847a32dc`.
It received only the chapter's stated job and audience, without rejection
history or expected defect names. It returned REPAIR: the promise to tell a
reader what to fix had no worked diagnosis, and the extract remained partly a
sequence of glossary cards. Those findings overlap the recorded failure. It
also flagged two possible technical qualifications, not yet source-verified.
It did not identify every registered failure. This is a bounded expert-review
observation, not complete reviewer calibration, learner research or admission.

The Episode04 Blend & Snap rejected manifest `53bce777...` and all 14 listed
artifacts are recoverable in the shared checkout with matching hashes. Its
review text is `61257b07...`; desktop/mobile and post/story renders are present.
The V3 source brief already embodies the rejected pension-file detour. The
post-rejection `successor-brief.md` supplies the current governed purpose;
never call it the original pre-detour brief. A new neutral trial can assess
those exact renders against the current positive purpose, without exposing
`ALI-REJECTION.md` or the expected defects to its reviewer. Keep the rejection
record for foreground reconciliation. No successor candidate currently exists.

Next implementation boundary: complete the existing pending-record-to-registry
admission edge on `ops/learning-admission-transition-20260906`. Preserve pending
bytes (reviews bind them); bind the exact rejecting review, owner judgment,
artifact and registry revision; update the existing registry once; prevent
stale/duplicate/conflicting admissions; demonstrate that the next producer must
consume the new learning. No new registry, automatic rewrite, public release,
or fabricated semantic verdict. Current Learning and Blend & Snap owners retain
product authority. Recover the actual trial inputs before claiming real learning.
