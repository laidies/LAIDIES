# ECO-01 independent repair re-review — Verification Rulebook

**Review date:** 2026-07-25  
**Reviewer:** independent ECO-01 acceptance judge; not the maker or repair author  
**Disposition:** **HOLD — HARD FAIL**  
**Scope:** exact repaired canonical source, generated claim ledger, evaluation
suite, renderer, rendered HOLD artifact, repair evidence, locked ECO-01 packet
and independently checked material sources

This review does not approve, publish or deploy the Rulebook. The repair closes
most of the first review's defects, but two non-compensable expert defects
remain. The current browser/accessibility matrix and separate eight-newcomer
transfer study also remain unproved.

## Exact repaired candidate reviewed

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `be70dae96ac602653304bb031f4e6834cb0c7e6bf17b8efa157d0cb394ebc3f9` |
| Generated claim ledger | `3074c44618e7213c9fdca2e833705a045ec8e3f22e2fe02603588b7bb167dd82` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered HOLD candidate | `63bdc8a6b790dc8a8bf2f1ead37832385612683ac3591b65670091b7bfdcb2e4` |
| Renderer | `cac244a5096c78641ed88a02472293a03248598b159df0405356ac78b9032ff6` |
| Contract test | `9e666645243c8458855020d66ca86a8771ce14f3545cc65d934046b3104f590d` |
| Source-version monitor | `c2aa72144b9b34234e7f1f1bcc10d8f3349e6fc511d2b35afa8ccdf8458b28bc` |

The candidate and generated files match the repair evidence. It remains marked
HOLD and was reviewed only as a local candidate.

## Non-compensable scores

| Gate | Score | Floor | Verdict |
| --- | ---: | ---: | --- |
| Product/content quality | **16/20** | 17/20 | **FAIL** |
| Accuracy, safety and trust | **16/20** | 17/20 | **FAIL** |
| Positive LAiDIES brand contribution | **16/20** | 17/20 | **FAIL** |
| Claim/source binding | — | complete, exact and current | **FAIL** |
| Accessibility acceptance | — | all named manual/rendered states pass | **NOT PASSED** |

The repaired book now has a strong teaching architecture, current claim
language and substantially better transparency. It cannot clear the expert
floor while arbitrary-length filler is reported as passed/correct reasoning,
one technical claim's visible source link does not lead to its named supporting
sections, and the required rendered accessibility and visual-density checks
have not run.

## Prior defects now repaired

### Exact reader-to-ledger binding — repaired

All **14 of 14** exact `publicWording` strings are generated into the rendered
reader with stable claim IDs, status, source links, qualification and
ID-bearing correction routes. The plain claim ledger is also rendered in the
Source drawer. The canonical record drives both outputs, and the contract test
checks wording, IDs, source IDs, qualifications, currentness fields and the
generated-source hash.

### Locked interaction quantities and response jobs — structurally repaired

The source and rendered artifact now contain the locked practice quantities:

- Chapter 1: eight classifications;
- Chapter 2: five artifact matches;
- Chapter 3: three claim repairs;
- Chapter 4: three-source comparison, reason and evidence action;
- Chapter 5: three-row claim table, verdict and reason;
- Chapter 6: separate freshness and provenance cases with reason;
- Chapter 7: low-, material- and high-stakes actions; and
- closing transfer: an evidence plan of at least 120 characters before rubric
  reveal.

Native selects, radios, textareas, fieldsets and buttons preserve a sensible
source-level keyboard foundation. The semantic evaluation of learner reasoning
is not repaired; that is a separate blocker below.

### Evaluation taxonomy and primary-source trap — repaired

All 18 evaluation cases now separate `evidenceVerdict`, `qualification` and
`requiredAction`, and only use the four canonical verdicts. E08 correctly
separates supported arithmetic from unresolved significance. E18 separates an
`UNRESOLVED` evidence state from the stop/escalate action. E13 tests an
official, interested source whose method and applicability remain inadequate.
Required 4/6/4/4 category counts are preserved.

### C2PA currentness monitor — repaired

The canonical record, history and version monitor now use C2PA 2.4. The live
monitor reports 2.4, and the contract rejects a synthetic 2.5 upstream version.
The teaching distinction is accurate: provenance and tamper evidence are not a
truth or value score. The direct evidence URL remains incorrectly bound, as
described below.

### Lateral-reading source entailment — repaired

`VR-C006` now uses Digital Inquiry Group's **Intro to Lateral Reading** lesson.
Its published lesson description explicitly defines investigating an unknown
source by leaving the page, opening another browser tab and checking what
trusted websites say. This entails the reader's material claim. C005 and C011
are also now labelled as qualified LAiDIES syntheses rather than disguised
verbatim source propositions.

### Source-level accessibility repairs — repaired, not acceptance-tested

Anchor targets receive `scroll-margin-top`; feedback is an in-place polite,
atomic status region; the ineffective feedback-focus call is gone; native
constraint validation remains. These close the two source defects from the
first review. They do not replace the required current Chrome, Safari,
responsive, zoom, keyboard, reduced-motion, clipboard and assistive-technology
checks.

## Remaining blocking defects and smallest repair

### P0 — Arbitrary filler is still labelled passed or correct reasoning

The interaction forms use `minlength` plus native `reportValidity()` to decide
whether an explanation is complete. The script does not evaluate whether the
reason or evidence action addresses the diagnostic job.

For Chapters 4–6, a learner can enter 30–40 characters of unrelated text,
select the keyed controls and receive **“Reasoning check passed.”** with
`data-result="correct"`. In the closing transfer, any 120-character string
reveals the rubric and receives `data-result="correct"`. Saying that opening
the rubric is “not a completion award” does not undo the machine-readable
correct state or the earlier explicit pass message.

This recreates the false-confidence pattern the book teaches learners to
resist. Minimum length proves only that characters exist; it does not prove
diagnostic reasoning, claim-to-source mapping or a safe action. The locked
packet expressly requires reason and diagnostic evidence action and prohibits
keyword/binary selection alone from passing.

**Smallest repair:** do not label unassessed prose `passed` or `correct`.
Separate the machine-checkable choice result from the unassessed explanation.
After reveal, require the learner to compare against a structured rubric and
record each required dimension—claim, evidence, limitation and action—as met,
revise or unsure. The feedback can truthfully say “required fields completed;
compare and revise” until an independently designed assessment can evaluate
transfer. Add a regression that submits length-valid nonsense and fails any
`passed`/`correct` assertion.

### P0 — C2PA's reader-visible source URL does not resolve to the cited sections

`SRC-C2PA-2-4.url` and the rendered evidence link both point to:

`https://spec.c2pa.org/specifications/specifications/2.4/index.html`

That page is the version index. It links onward to the Content Credentials
specification, but it does not itself contain the claim's named §§1.2, 1.3 and
2.3 or the no-value-judgment passage. Those sections are on:

`https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html`

The underlying proposition is current and supported, and the separate
`versionIndexUrl` is appropriate for monitoring. The reader-visible claim
binding is nevertheless not direct or exactly entailing, so the
non-compensable source-binding gate fails.

**Smallest repair:** set `SRC-C2PA-2-4.url` to the full 2.4 Content Credentials
specification and retain the current index under `versionIndexUrl`. Add a
contract assertion that the evidence URL—not merely the monitor URL—contains
or resolves to the recorded support locations.

### P1 — Rendered accessibility and visual experience remain unproved

The browser-control runtime available to this reviewer exposed no browser.
Therefore this review did not run or claim:

- current Chrome and Safari behaviour;
- 320/390/430/1440-width rendering or 200% zoom;
- keyboard order, focus visibility and sticky-header focus clearance;
- reduced-motion behaviour;
- clipboard success and failure paths;
- live-region announcements; or
- current VoiceOver/Safari behaviour.

Source inspection cannot establish conformance. It also cannot settle whether
fourteen detailed claim cards embedded beside the teaching, followed by the
full ledger, create excessive visual density or a compliance-document feeling
for a first-time LAiDIES learner. That concern matters to the brand gate and
must be judged from the rendered experience, not assumed away because the
binding is technically complete.

**Smallest repair:** after the two P0 changes, execute the packet's full manual
matrix in current Chrome and Safari, include current VoiceOver/Safari, and
record screenshots/results for responsive density, reading flow, focus,
announcements and failure paths. If the evidence cards interrupt learning,
preserve exact accessible binding while progressively disclosing secondary
metadata.

## Source and trust recheck

| Source/claim | Re-review result |
| --- | --- |
| NIST AI 600-1 | **PASS.** Supports confabulated citations and source/citation review. The five-part verification model is now properly identified as LAiDIES synthesis. |
| OpenAI web-search documentation | **PASS.** Supports current web search and URL citation annotations within the documented product scope. |
| Anthropic hallucination guidance | **PASS.** Supports uncertainty, quotations/citations and the limit that critical information still needs validation. |
| Google Grounding with Search | **PASS.** Supports grounded output and citation annotations without being treated as proof of source quality or truth. |
| Digital Inquiry Group lateral-reading lesson | **PASS.** Its lesson description entails leaving the unknown page and checking trusted sites in another tab. |
| C2PA 2.4 | **CONTENT PASS / BINDING FAIL.** The full specification entails provenance/tamper evidence and its limits; the candidate links the version index instead of that specification. |
| WCAG 2.2 | **REQUIREMENT PASS / CANDIDATE UNTESTED.** Supports the stated reflow requirement, not conformance of this rendered candidate. |

## Deterministic verification

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

node scripts/check-inline-js.js
  PASS — 353 scripts / 132 live pages

node scripts/check-local-links.js
  PASS — 1,943 local references / 110 pages

node scripts/check-town.js
  PASS

node scripts/check-product-stewards.mjs
  PRODUCT STEWARD SYSTEM PASS
  products=65 active=3/3
```

These checks establish deterministic structure and local integrity. They do
not test semantic quality of free-text reasoning or the required browser,
assistive-technology and newcomer outcomes.

## Acceptance sequence from here

1. Correct the C2PA evidence URL while retaining the index as the version
   monitor.
2. Remove false pass/correct states for unassessed free text and add the
   length-valid-nonsense regression.
3. Regenerate and rerun deterministic checks against new exact hashes.
4. Run independent expert re-review of the two repaired contracts.
5. Complete and preserve the full browser/accessibility/visual-density matrix.
6. Only after expert gates pass, run the separate eight-newcomer study with the
   locked 7/8 floors.

Until every step passes, the truthful state is **HOLD / FIX BEFORE LAUNCH**.

## Learning scan

Two reusable failures qualify for the canonical pain-points ledger, but this
bounded judge lane was instructed to write only this independent review:

- minimum character count can prove field completion but must never be
  reported as proof that reasoning is correct; and
- a version-monitor index and an evidence-bearing technical specification are
  different source objects and must not share one URL by convenience.

The foreground owner should reconcile those prevention rules into
`operations/painpoints-log.md` without overwriting unrelated concurrent work.
