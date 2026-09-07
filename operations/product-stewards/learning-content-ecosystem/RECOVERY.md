# Existing prose-quality package recovery

September 6, 2026. PR108 merged as `9a372e701742dcc2cb9820e49bb39c3e82b5d9df`
after both Operating baseline CI jobs passed on exact source `a83b9fb0`.
Integration work under the whole-operation audit; the Learning
System & Concepts Director retains shared learning ownership and surface owners
retain their candidates and release decisions.

## Fresh-producer trial exposed an incomplete instruction package

Ali authorized the explicit four-test trial. It is frozen and recorded in
`trials/2026-09-06-producer-transfer/TRIAL.md` and `RESULT.md`. A fresh Sol/Medium
maker reached READY_TO_DRAFT with the current learning-depth instruction routes
missing from main, reading an older Standard blob instead. Foreground reproduced
the green preflight on the unchanged contract. Trial stopped before independent
review or case B; its partial draft has no quality verdict. This corrects earlier
claims of a complete instruction dependency package.

The three already-routed documents are now recovered at their original paths.
Shared source hashes at recovery: Standard `a152357f7aa9e12b8f3b1dba661df1f2829fc1016a819fd05161a20a2a9e6267`,
Admission Gate `d1d8958f9a6234840e428fd3a3b053066573daeae0d578fc8518fa5823908605`,
Orchestration Guide `2ed1db9ff0b97e1ac7bc4bd5e3a6503f71f18dc385416683597b4026c2117edf`.
Standard and Guide preserve those exact bytes. The Gate receives two factual
clarifications: ACTIVE is policy status, not proof of runtime; synthetic tests
cannot establish a reviewer's semantic detection. No public-release rule changed.
Transitive references describe applicable requirements, not proof that every
referenced service or script is installed and running.

Producer contracts now require `instructionBindings.learningStandard`,
`instructionBindings.contentAdmission` and
`instructionBindings.learningOrchestration`, each with the prescribed current
repository path and SHA-256. The existing preflight rejects missing, changed or
substituted bindings before readiness; release uses that same preflight. Use the
current receiving checkout's governed sources, never a historical blob selected
merely because it is recoverable. This checks source identity, not whether an
agent understood or followed it.

The original trial contract is preserved without new fields and now fails the
real checker. Software regression checks reject each missing/changed/substituted
instruction and a matching-hash external symlink, while retaining a valid
exact-binding case. The shared file-binding helper now checks actual filesystem
target containment for all its source/example/benchmark inputs. These are guard tests, not
another content trial. The fresh-producer/independent-review/transfer sequence
is now recorded separately in `trials/2026-09-06-producer-transfer/attempt-2/RESULT.md`: two fresh makers and blind expert reviews found the two unchanged
cases adequate without corrective coaching. This does not establish human
comprehension or permanent-owner adoption; the 17 real orders remain held.

Related legacy path-check debt remains explicitly outside this instruction
repair: `scripts/check-prose-quality-admission.mjs` loadBinding still uses lexical
containment, and `scripts/check-content-release-readiness.mjs` existingEvidence
checks existence without real-target containment. Operating integration owns
assessment/correction before claiming end-to-end path-integrity protection.
The repaired producer helper does not certify those separate consumers.

## Destination adoption — verified gap, September 6

PR108 (`9a372e701742dcc2cb9820e49bb39c3e82b5d9df`) and PR109
(`53b7d83384e71f83d679ff2bf005fbcd4af9e2b3`) are on main and the isolated
operating integration checkout. Shared `Website-homepage` HEAD `3091a1fd`
contains neither. Its producer/review files are older, its admission command,
package/admission tests and this recovery record are missing, and its registry
has the older source bindings. Its release checker has identical bytes but
imports the older local checkers. Repository distribution is therefore verified;
shared-runtime adoption is not.

The shared `package.json` `ci:build` and `exact-library-preview.yml` use that
checkout's local scripts. Do not copy the new admission script alone or overwrite
the dirty shared tree. Adoption must include the registry, schemas, six immutable
examples, supporting News evidence, all checker imports and calibration tests.
PR112 also restores the three required instruction documents, their enforced
current-source bindings, and the saved failed-trial regression. Include those
dependencies: the changed-path lists in PR108/109/112 identify that closure; their central audit
status files are not product changes to merge blindly.

Prepared receiving-owner action (not dispatched): the Learning System & Concepts
Director selects a clean receiving integration branch with the affected product
owner. Start from current main where possible; otherwise reconcile the selected
PR108, PR109 and PR112 dependency paths against destination changes. Preserve the real
work-order queue and reconcile any new registry entries rather than replacing
them with this snapshot. Add `test-content-quality-package.mjs` and
`test-content-quality-learning.mjs` to the destination's existing `ci:build`
before its producer/review/release tests, then run that full destination command.
Confirm the actual candidate invokes those same consumers. Run strict release
checking for its exact work-order ID; held orders remain held. Report receiving
commit, actual command and result, real candidate state, and owner/next trigger.
No release, schedule or new product commission follows from adoption.

Current receiving roles: learning owner task
`019f9f7f-9e4c-72d2-8882-447bcbe01691` (“LEARNING SYSTEM — Concepts & Curriculum”)
was notLoaded; this is not abandonment. NewsStand task
`01a071e7-db55-7a22-8c99-04eba5060355` (“Audit NewsStand agentic workflow”)
was active after PR109. Do not interrupt, restart or duplicate either lane.
The operating task has prepared this handoff but has not sent a new assignment.

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
