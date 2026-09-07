# Existing prose-quality package recovery

## Current LCWO-002 source reconciliation — September 6

**SOURCE IDENTITY RESOLVED / INTERNAL RECOVERY / DRAFTING STILL HOLD.**
The older seven-path work order points to missing and superseded records.
Its historical investigation is preserved in PR122/Git history. It cannot
supply the current manuscript or an immediate-build instruction.

The newer immutable source is the twenty-chapter Amazon Quick bundle accepted
by Ali on August 16. Original import and acceptance decision:
`5a4b520847709f709215718fc5706b748795549d`. It also survives in release branch
commit `9dd8da6d4c67dfbb8192ebefe8c96ca0be0f56f6`. Root recovered only the
three original Git blobs into current source control, with identical hashes.
Source acceptance is not finished-book admission, fresh validation of every
volatile claim, or public release.

Base directory: `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/source/`.

| File | SHA-256 |
| --- | --- |
| `front-matter.md` | `288a736ed80cedab1e45f4d96cea60ec11edaf226d19226476b890178a051c37` |
| `full-book.md` | `721522ed4ff94760c7e5d62beef64a6299286efc1d7a7b90e6262a4ca4091eb9` |
| `quick-production-playbook.md` | `43596af4f16bf97c0c1df70e16dbdcb8195542dbd717158dea7edb1e45455074` |

**Exact placement:** `full-book.md`, Chapter 2, section 2.5, “Variations Within
the Family: Size, Openness, and Thinking,” lines 437–455. Extend the existing
open-weight/closed subsection; do not create a competing concept home. The
accepted source does not separately define all four labels requested by
LCWO-002. Learning/accuracy's current definitions, boundaries, evidence and
freshness contract are now durable at
`LCWO-002-ACCESS-LABELS-SOURCE-PACKET.md`. That packet is internal research
input only; it does not supply or admit reader-facing prose.

Archived task `01a0113b-571d-7680-b9ae-e8de07b8f030`, “Restart AI Fundamentals
visuals,” provides a later visual-work route, not new manuscript admission.
Ali approved a Chapter 1 visual method; `1f95f92c` and `5cc4193` preserve
subsequent visual work. Those assets, generated readers, unfinished Chapter 14
outputs and dirty worktrees were not copied, edited or discarded.

**Existing extension mechanism identified:** the Library pilot already uses
`rewind-amendments.json`, schema `laidies-library-rewind-amendments.v1`, bound
to the immutable manuscript SHA. Its `clarifications` entries carry an ID,
chapter, mode, exact insertion anchor and added copy. The existing
`build-book.mjs` requires exactly one anchor match before applying each entry.
No existing Chapter 2 clarification supplies the missing open/source-available
distinctions. This establishes a reusable mechanism, not an admitted addition
or a recovered current builder. The overlay and builder remain in the Library
worktree; do not import its 110 entries wholesale to satisfy this one order.

**Next operation:** assign one real Library producer principal and task/lane for
LCWO-002. The product ID `library-101` and its BUILD role identify accountable
product ownership; they do not identify a person/agent, active task, writable
lane or accepted assignment. The current execution adapter is
`DISABLED_UNBOUND`, its automation ID, lane ID and target task ID are null, and
`execution-metadata.json` contains zero records. The current task inventory has
no explicit LCWO-002 Library producer. “Add Working with AI 101,” “Plan AI
companies textbook” and the archived “Restart AI Fundamentals visuals” tasks
have different scopes and are not implied receivers.

**PREFLIGHT INPUTS PREPARED / ASSIGNMENT MISSING / DRAFTING HOLD.** The smallest
resolution begins with Control Room identifying a real Library-owner acceptance
principal and task ID; that edge is also currently missing. That named owner
then issues one bounded assignment receipt naming: the producer principal and
task ID; an isolated worktree and branch starting from current integrated commit
`268614ffd10daca96b1664937f7659e38e51d164` or a verified descendant; LCWO-002
as its only content scope; the contract output path; start/expiry or completion
trigger; and these exact inputs:

Evidence time: `2026-09-06T22:18:50-07:00`.

| Preflight input | Current binding |
| --- | --- |
| Accepted manuscript | `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/source/full-book.md` — SHA-256 `721522ed4ff94760c7e5d62beef64a6299286efc1d7a7b90e6262a4ca4091eb9` |
| Source packet | `operations/product-stewards/learning-content-ecosystem/LCWO-002-ACCESS-LABELS-SOURCE-PACKET.md` — SHA-256 `e5f50e7ad6a32efc6f09841fe019e09b88b69d78335478f8d283f20f0aa6e786` |
| Quality registry | `operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json` — SHA-256 `c5210803bad0311797c408b4db6a108a59302f97f6e5014c6ec0fdb5542992ef` |
| Canonical work-order queue | `operations/product-stewards/learning-content-ecosystem/content-work-orders.json` — SHA-256 `5e47e31f9e49ec1f8ac86fb8b49a8398265a54e9a9f70646ac7e89e6fcfcfe86` |
| Learning standard | `operations/product-stewards/LEARNING-CONTENT-STANDARD.md` — SHA-256 `a152357f7aa9e12b8f3b1dba661df1f2829fc1016a819fd05161a20a2a9e6267` |
| Admission gate | `operations/product-stewards/learning-content-ecosystem/CONTENT-QUALITY-ADMISSION-GATE.md` — SHA-256 `3b26d3174979dd22eafc5b0e0903fc1584cebc418e49d37d68d2a553b0661a85` |
| Orchestration guide | `operations/product-stewards/learning-content-ecosystem/LEARNING-ORCHESTRATION-GUIDE.md` — SHA-256 `2ed1db9ff0b97e1ac7bc4bd5e3a6503f71f18dc385416683597b4026c2117edf` |
| Communication benchmark | `operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md` — SHA-256 `7d61a0e17d5ad6809d1d1e6931d297b42e443a3027a97fb7c16432f3f8aecff3` |
| Producer validator | `scripts/check-content-producer-contract.mjs` — SHA-256 `239256e4f08aba1cccc8fbcb6a9eb7fd47299b3f458556f13a42ab48fff81342` |

The accepted extension mechanism is preserved read-only at Library branch
`library/ai-fundamentals-full-visuals-20260818`, commit
`5cc4193e7f4be90e460eb7e66851f1e082155c96`: `rewind-amendments.json` SHA-256
`741b3872b8b2b6bacc18f25606c5037dfba2ce1db1b294c9a1da0bca0e6d6241`
binds the accepted manuscript SHA and `build-book.mjs` SHA-256
`3461691258976b1e764165ae5a9f864268b2bb7e027d087c93857ee3d583eb7d`
requires each insertion anchor exactly once. These identities establish the
mechanism only. They are not an active producer lane and are not imported by
this checkpoint. The producer may inspect those exact files read-only while
building the preflight; the assignment receipt must name that external evidence
source. Before later drafting or rendering, the Library owner must approve a
separate bounded reconciliation from `5cc4193e` into the current-base worktree,
limited to the amendment/builder mechanism and checked against the then-current
source SHA. The full 110-entry overlay is not a preflight input to copy and may
not be imported by implication.

After assignment, that producer creates and passes the exact producer contract
before writing any clarification prose. Only then may Library own a versioned
clarification and deterministic render target, preserving the immutable source
without creating a second amendment system.
`READY_TO_DISPATCH` remains the canonical label for
producer-preflight assignment; it is not drafting authority. The work order's
old immediate-build prose and missing historical input paths are stale. The
original queue
SHA remains `5e47e31f9e49ec1f8ac86fb8b49a8398265a54e9a9f70646ac7e89e6fcfcfe86`;
no queue mutation, drafting, rendering, review, activation or publication occurs
in this source recovery. The old queue's dependency projection therefore still
returns `QUARANTINED`; fourteen preparation eligibilities are not drafting
permission. No old README build command or generated manifest was revived.
This is one representative operating-system handoff test, not evidence that the
full operating audit is complete.

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

## Destination adoption — pre-adoption finding, September 6

This section preserves the gap that triggered the receiving work. Its
`not adopted` status is superseded by the receiving result below.

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

Prepared receiving-owner action (completed by the receiving result below): the Learning System & Concepts
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

### Receiving result — September 6, 18:09 PDT

Ali authorized the bounded adoption. A clean `origin/main` receiving branch at
`/Users/alisoneakin/Projects/laidies-learning-quality-adoption-20260906` now has
corrected implementation commit `b9c1b7ff`. The content workflow runs package-integrity and
learning-admission tests before producer, exact-prose review and release tests. A
restored work-order consumer uses those same producer/reviewer checks and has eleven
calibrated queue shape/state rejections plus an invalid-contract rejection. It deliberately does not resurrect the retired standalone
product registry; owner IDs stay with the preserved queue and their product owners.

Observed scoped results:

- `npm run test:content-prose-quality`: PASS; six exact exemplars, current instruction
  bindings, learned-repair propagation, semantic-review negatives and release fixtures.
- `node scripts/test-content-work-orders.mjs`: PASS; one contract-free order reaches
  producer preflight; malformed shape/state `11` and invalid contract `1` are rejected;
  real queue `17`, preflight-eligible `14`, draft-ready `0`, trigger-queued `3`.
- `node scripts/check-content-work-orders.mjs`: PASS with the same real-queue state.
- `node scripts/check-content-release-readiness.mjs --require-id LCWO-002`: expected FAIL;
  the order lacks its producer contract, both reviews, gate receipts and artifact binding.

Corrected PR114 merged as `39428d15fa08ce56d5638d0f132920155fb65179`.
PR115 then restored the existing Episode gate package on current `main` as
`357117980d7d701a64b8540f0beddfde979924fa`, and this clean receiver was
fast-forwarded to that commit before verification. The destination-wide
`npm run ci:build` now passes the recovered gate calibration and four Episode 02 checks,
then holds at the cue check on these five absent, unadmitted images:

- `assets/episodes/issue-02/ep02-cold-open-desk.png`
- `assets/episodes/issue-02/ep02-david-rose.png`
- `assets/episodes/issue-02/ep02-the-brief.png`
- `assets/episodes/issue-02/ep02-wall-of-text.png`
- `assets/episodes/issue-02/ep02-good-summary.png`

Shared copies do not establish visual admission, so none was copied. Later build stages were
not reached; current `main` also lacks `scripts/test-episode-cue-scope.mjs` and
`scripts/test-episode-04-banned-cut-assets.mjs`. This is not a full-build pass.

The actual `LCWO-001` target files are also absent from this receiving checkout, so no real
prose candidate has yet exercised the adopted chain. All 17 orders remain release-held. The
next real producer-preflight candidate is `LCWO-002`: its LIBRAiRY owner creates and passes
the current producer contract before drafting its specified concept cluster. `LCWO-001`
separately remains a recovery hold until its exact source and rendered artifact are
reconciled.

The historical v1.2 executor cannot be copied into the current queue: it would restore an
obsolete eighteenth order, stale `ACTIVE` heartbeat and absent automation binding. The
bounded successor therefore keeps the canonical 17-order v1.1 queue byte-for-byte and adds
only a versioned, checked-in execution-metadata adapter in `DISABLED_UNBOUND` state. Its
runner can prepare `SELECTION_PROPOSED` and `DISPATCH_RECEIPT_DRAFTED` records in a temporary
or future owner lane, but cannot claim acknowledgement, dispatch, performed work, drafting
or release. The calibrated test proves the queue remains unchanged and rejects invalid
state, stale/future/reversed events, canonical queue contradictions, ineligible prepared
receipts, changed queue identity, wrong ownership, forbidden live-state history, fake public
evidence and unsupported queue schemas. Both proposal and draft-receipt eligibility consume
the existing canonical queue validator without requiring the producer contract before
preflight.

Autonomous execution remains absent. This adapter rejects `ENABLED_BOUND`,
`OWNER_ACKNOWLEDGED`, `DISPATCHED` and `TERMINAL` even when caller-written paths, matching
strings or a temporary active automation file are supplied. Live integration needs a
separately implemented and reviewed source of authority for the real automation, lane,
task, owner acknowledgement, performed work and public evidence; it cannot be activated by
editing these records. The Learning dossier's
`state.json` and `backlog.md` remain absent because neither is an execution dependency and
their preserved versions contain stale status. Legacy path-integrity debt at `loadBinding`
and `existingEvidence` remains separately open.

Worktree truth at this checkpoint: PR114 is `MERGED` as `39428d15`; the clean receiver was
at current `main` `35711798` before this status correction. No product prose or surface
artifact changed. No release, deployment, publication, service, schedule, spend or
Ali/public authority was used.

Pre-adoption receiving roles: learning owner task
`019f9f7f-9e4c-72d2-8882-447bcbe01691` (“LEARNING SYSTEM — Concepts & Curriculum”)
was notLoaded; this did not mean abandonment. NewsStand task
`01a071e7-db55-7a22-8c99-04eba5060355` (“Audit NewsStand agentic workflow”)
was active after PR109. The bounded adoption did not interrupt, restart or duplicate it.

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
