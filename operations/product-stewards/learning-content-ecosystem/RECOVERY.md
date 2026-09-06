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

## Rejection to reusable learning — current implementation

The adapter is merged through PR109 as
`53b7d83384e71f83d679ff2bf005fbcd4af9e2b3`. Both cloud baseline jobs passed on
exact source `703afb371425d249d797e399eb96e25c858bd6e0`.
It completes the previously missing source-integrity edge, using the existing
registry. It has not admitted a new real product lesson or produced a successor.

A decisive rejection does not need a completed reader study or full factual
review merely to record the failure. Those downstream checks remain mandatory
where applicable before admission/release. The adapter accepts an explicitly
bounded, exact-prose rejection; its schema cannot pass the release review chain.
It must not be used to label a visual judgment as a prose review.

Three immutable inputs carry different responsibilities:

| Record | Required content | Who supplies it |
|---|---|---|
| Existing pending learning record | Candidate/artifact identity, incident, failure families, required producer repair, identity facts for the rejection, `PENDING_OWNER_ADMISSION` | Producer/review coordinator records the finding without admitting it |
| Bounded rejection | `laidies-content-quality-rejection.v1`; exact artifact and pending bindings; reviewer principal/role/time; REJECT; exact excerpts, failure explanations and omitted-review limits | Role-distinct reviewer inspects the actual prose |
| Owner admission | `laidies-content-quality-owner-admission.v1`; exact pending/review bindings, registry-before hash, exemplar ID/scope, owner principal/role/time and reason | Learning System & Concepts Director decides reusable applicability |

The pending record's `reviewReceipt` carries only `candidateId`,
`artifactSha256`, `reviewerPrincipalId`, `reviewedAt` and
`stage: INDEPENDENT_REJECTION`. It cannot hash the final rejection because the
rejection already hashes the pending file. The owner record binds both; the
registry then binds the owner record. A registry-after hash is returned by the
command, not embedded back into that chain. The test fixture in
`scripts/test-content-quality-learning.mjs` is the executable input example.

From the repository root, the responsible agent runs:

```sh
node scripts/admit-content-quality-learning.mjs <owner-decision.json>
node scripts/admit-content-quality-learning.mjs <owner-decision.json> --apply
```

The first command previews the exact next registry hash and repair instruction.
The second locks/rechecks the current registry and atomically adds one entry.
Neither changes pending/review bytes or any product file. Exact retries are
no-ops. Stale, duplicate, inconsistent, outside-repository, missing, malformed
or altered inputs fail without rewriting the registry. Principal names and
owner judgment are attestations: this local script does not authenticate them
or infer quality from text fields. The actual owner review remains necessary.

Both producer and prose-review consumers revalidate the admission and its bound
inputs. The existing registry-hash/all-negative contract makes older producer
packets stale; merely refreshing the hash still fails if the new lesson is
omitted or its failure remains open. For each admitted lesson,
`knownFailurePreflight.learnedRepairApplications` must bind its exemplar ID,
exact `admissionSha256`, and a `planPointer` to a nonempty field within
`draftArchitecture`, `readerContract`, `representativeProofPlan` or
`communicationDesign`. Another CLEAR declaration cannot serve as that field.
The producer command prints the validated repair alongside the named plan step;
the release checker consumes this same preflight, so missing applications hold.
This verifies an explicit maker-input binding, not understanding or a meaningful
change by itself: the maker must still demonstrate its method on a representative
successor against the original purpose. No substring matching judges creative prose.

Existing baseline CI runs the adapter and producer-propagation tests. They
exercise preview/apply/retry, altered bindings, missing lesson, unresolved
failure, changed admission evidence and preserved 17-order holds. The restored
prose checker also follows DECISIONS' proportional Library rule: no universal
three-person study; required observed outcomes still need actual evidence.

## Actual evaluator observations

A fresh Sol/Medium reviewer (`chapter_evaluator`, no inherited conversation)
read exact CQX-BAD-001 bytes under a neutral filename, SHA
`c3af0bae62222b53499ee1645428c9171b3bb2104ac445ba8c2a3032847a32dc`.
It received only the chapter's stated job/audience, without rejection history
or expected defects. REPAIR identified missing worked diagnosis and glossary
structure, overlapping the recorded failure, but not every registered defect.
Two suggested technical qualifications remain source-unverified. This was a
bounded expert evaluation, not observed learner research or full calibration.

A separate fresh Sol/Medium reviewer (`fieldtrip_evaluator`) inspected neutral
copies of the exact desktop/390px and three post renders plus review text from
Episode04 Blend & Snap V3. Foreground verified the rejection manifest
`53bce777b0bbb37965a2b47789e219aa938fb14429f6622a3ba927b3000b5e11`
and all 14 bound source/render/text files in the shared checkout. The evaluator
received the current positive purpose from the post-rejection successor brief,
not the rejection history or expected defects. It returned REPAIR for displaced
field-trip purpose, missing human story and absence of purposeful story
illustration. It credited the bounded scoring example and limited its judgment
to supplied screenshots. This overlaps Ali's actual rejection; it does not
prove a corrected product or authenticate a historical pre-detour brief.

## Remaining dependencies

No real pending learning record was found in the bounded source search; the
existing three prose negatives are already registered. Do not fabricate a new
incident or duplicate those examples merely to demonstrate the adapter. The
next genuine reusable prose rejection needs actual learning-owner disposition
and a successor that consumes it. The recovered visual rejection remains with
its surface/visual-learning owner; do not force it into the prose adapter.

The strict ratchet still requires issue/cycle counts to decrease even at the
zero-issue/first-cycle floor. That requirement is mathematically impossible for
a subsequent clean candidate. Its explicit rule is preserved pending a concrete
floor correction; tests must not fabricate improvements to clear it.

Destination-owner adoption, real producer-method change/successor observation,
applicable reader outcomes and production-controller integration remain open.
The full operating audit continues; source integration is not end-to-end learning.
