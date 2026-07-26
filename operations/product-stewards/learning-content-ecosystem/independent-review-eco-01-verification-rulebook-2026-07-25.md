# ECO-01 independent acceptance review — Verification Rulebook

**Review date:** 2026-07-25  
**Reviewer:** independent ECO-01 acceptance judge; not the maker or source-packet author  
**Disposition:** **HOLD — HARD FAIL**  
**Scope:** exact local canonical source, claim ledger, evaluation set, deterministic
renderer, rendered HOLD artifact, shelf/search truth bindings, locked ECO-01
packet and all seven external material sources

This review does not approve, publish or deploy the Rulebook. The separate
eight-newcomer transfer study has not run and remains required even after the
expert defects below are repaired.

## Exact candidate reviewed

| Artifact | SHA-256 |
| --- | --- |
| Canonical source | `7c026ea1e7a1d2588dff9c4cc0b5e86cc3384398466208d0c462b3116be8291d` |
| Claim ledger | `bf5f6e9e6348d5f74d44f04aefa1be8e8bec33f8214e03d94ce19a386bfa1c72` |
| Evaluation suite | `cef42255e5e75aa5c566dd6927e0820d797efcf1c333a10a3194b3cffca77af7` |
| Rendered HOLD candidate | `a86a0347785f7f5d86ec7367580bc8ca054c07db45d2671a0767a62999c7ca76` |
| LIBRAiRY shelf | `6fd2d8ccf736113e13d50812504f9ee00000d5ea3c04e7371ed242f2688bbcbd` |
| Miss Jeeves index | `e07fe9a40a24fc6cc6c7397bcc90e7d1ce836c445c1997b26c430b23cc4a48c6` |

The rendered artifact declares and matches the canonical-source hash, visibly
states HOLD, uses `noindex,nofollow`, and the shelf and Miss Jeeves remain
truthfully unavailable/preview-only.

## Non-compensable scores

| Gate | Score | Floor | Verdict |
| --- | ---: | ---: | --- |
| Product/content quality | **13/20** | 17/20 | **FAIL** |
| Accuracy, safety and trust | **14/20** | 17/20 | **FAIL** |
| Positive LAiDIES brand contribution | **16/20** | 17/20 | **FAIL** |
| Claim/source binding | — | complete, exact and current | **FAIL** |
| Accessibility acceptance | — | all named manual/rendered states pass | **NOT PASSED** |

The content has a strong core mental model and safe boundaries. Scores fail
because the reader does not deliver the locked practice architecture, its
claim ledger is not bound to reader-visible wording, one source does not entail
its claimed method, one standard missed its own revision trigger, and the
rendered/manual accessibility gate could not be completed.

## What is strong and should be preserved

1. The seven-step mechanism — `Frame → Split → Find → Inspect → Cross-check →
   Decide → Record` — is coherent, memorable and not dependent on a film
   analogy.
2. Generation, retrieval, grounding, citation, provenance and verification
   are separated accurately. The text does not claim that grounded or cited
   output is automatically true.
3. The opening client-update example demonstrates why useful drafting can be
   preserved while unsupported approvals, forecasts and scope commitments are
   removed.
4. The four evidence verdicts preserve uncertainty instead of forcing a
   true/false answer.
5. Scope, version, region, denominator, method, freshness and independent
   origin are integrated into the method rather than relegated to a disclaimer.
6. The source-bound prompt is correctly labelled as risk reduction, tells the
   model to abstain when evidence is inadequate, and immediately requires the
   learner to open sources independently.
7. The medication case stops unsafe action and routes to the prescriber or
   appropriate professional. The book does not present itself as medical,
   legal, financial, HR or safety advice.
8. The single pop-culture mnemonic has an explicit limit. A learner can explain
   the method without knowing the reference.
9. The 18-case suite has the required 4/6/4/4 category counts and covers four
   useful transfer domains: procurement, research, workplace commitments and
   health.
10. Episode 3, Dream Phone and NewsStand handoffs state distinct jobs, and the
    held Dream Phone destination is not presented as an approved authority.

## Blocking defects and smallest repair

### P0 — The claim ledger is not bound to what the reader sees

An exact-string check found **0 of 14** `publicWording` values in the canonical
book source. The rendered page contains no `VR-C###` IDs, no per-claim source
binding and no visible link to the separate claim ledger. The source drawer
says sources support “specific claims,” but a reader or reviewer cannot tell
which source supports which nearby sentence. The correction route asks the
reader to include a claim ID that the reader cannot see.

The existing contract test verifies that rows and source IDs exist; it never
verifies that a ledger row is the exact public claim, appears in the canonical
source, or is rendered with its source binding. This allows a complete-looking
ledger to drift independently from the book.

**Smallest repair:** make the canonical content nodes reference stable claim
IDs; generate reader wording and the ledger from one source of truth; render a
visible or accessibly named claim/source link at every material claim; expose a
plain claim ledger from the Source drawer; and make the contract test fail when
the exact rendered wording, claim ID, source ID, qualification or currentness
record diverges. Correction links must carry the relevant ID automatically.

### P0 — The built interactions do not implement the locked teaching packet

The packet requires:

- Chapter 1: classify eight lines; built: one multiple-choice compound sentence.
- Chapter 2: match five artifacts; built: one provenance question.
- Chapter 3: repair three vague/compound claims; built: one multiple choice.
- Chapter 4: compare three sources and explain the diagnostic choice; built:
  select one prewritten answer.
- Chapter 5: complete a claim table and choose a verdict before reveal; built:
  one approval radio question.
- Chapter 6: one freshness and one media-provenance case; built: one freshness
  case only.
- Chapter 7: choose actions for low, material and high stakes; built: one
  high-stakes medication case.

The result mainly tests recognition of the author’s wording. It does not yet
show that a newcomer can classify, repair, map a claim to evidence, complete a
decision receipt or explain a choice. The closing transfer challenge is a
prompt plus hidden rubric, not an interaction that captures or evaluates the
learner’s reasoning.

**Smallest repair:** implement the exact practice quantities and response jobs
already specified. Preserve native controls, but require a reason/evidence
action before reveal for Chapters 4–7 and the closing transfer. Do not award
completion for selecting a keyword or opening the rubric.

### P0 — The evaluation suite changes the book’s verdict taxonomy

The book defines four evidence verdicts: `SUPPORTED`, `CONTRADICTED`,
`UNRESOLVED` and `NOT APPLICABLE`.

- `VR-E08` accepts `QUALIFIED`, which is not one of those verdicts. The narrow
  arithmetic claim “two to one is a 50% fall” can be supported while the implied
  claim of meaningful improvement remains unresolved. The current answer key
  does not require that split.
- `VR-E18` puts `STOP AND ESCALATE` in `expectedVerdict`, although that is a
  required action, not an evidence verdict.

This conflates evidence status, answer qualification and next action—the exact
distinctions the book is supposed to teach.

**Smallest repair:** give every case separate `evidenceVerdict`,
`qualification` and `requiredAction` fields. For E08, require clause splitting:
the arithmetic may be supported, while decision significance is unresolved
without volume/method. For E18, require an unresolved/unsafe evidence judgment
plus a separate stop-and-escalate action. Add a regression that rejects verdicts
outside the canonical four.

### P0 — A currentness trigger fired but the ledger did not react

`SRC-C2PA-2-2` and `VR-C007` cite C2PA Technical Specification 2.2 and say to
review on specification revision. The same official site now identifies
**C2PA Specifications 2.4** as current. Version 2.4 still supports the important
teaching distinction: provenance/claims can be tamper-evident, while C2PA does
not make “good/bad” value judgments. The teaching is not disproved, but the
candidate failed its own freshness rule.

**Smallest repair:** rebind the claim to current C2PA 2.4 sections 1.2, 1.3 and
2.3, record the 2.2→2.4 review in correction/history, and add a source-version
monitor that fails when the official specification index exposes a newer
version than the ledger.

### P1 — The designated COR page does not entail the lateral-reading definition

The reviewed COR About page supports the three questions “Who’s behind the
information?”, “What’s the evidence?” and “What do other sources say?” It does
not use the term “lateral reading” or state “leaving the original page.”
Therefore `VR-C006` is not `SUPPORTED` by its named passage as written.
`VR-C005` and `VR-C011` are reasonable LAiDIES syntheses, but their current
support locations are descriptions rather than exact passages.

**Smallest repair:** bind `VR-C006` to a current DIG research/lesson source that
explicitly defines lateral reading, or relabel the wording as a qualified
LAiDIES synthesis and remove the unsupported attribution. Add exact heading,
passage/page and version information for every material or synthesized claim.

### P1 — The suite misses a key false-confidence trap

The book correctly says source identity and method matter, but the practice
repeatedly makes the current official provider page the correct answer. No
scored case gives the learner an official or primary source whose method,
incentive, omission or applicability is inadequate. That leaves the locked
misconception “primary source means automatically trustworthy” insufficiently
tested.

**Smallest repair:** add or replace one application/misconception case with a
primary-source limitation scenario while preserving the required 18-case
category counts. A passing answer must inspect method, incentive and
applicability rather than reject or accept the source solely by label.

### P1 — Rendered accessibility acceptance remains unproved

The source contains good foundations: semantic landmarks and headings, native
radio groups and buttons, textual table headers, visible focus CSS, live
feedback, reduced-motion handling, a Clipboard fallback and a horizontally
contained data-table region.

The available browser-control runtime returned no browser, so this reviewer
could not complete desktop/mobile screenshots, keyboard-only interaction,
200% zoom, 320/390/430/1440 widths, reduced-motion emulation, focus
visibility/obscuration, clipboard failure or live-region behaviour. **VoiceOver
was not used.** No accessibility or WCAG conformance conclusion follows from
source inspection or the passing contract test.

Two source-level risks need explicit rendered checking:

- desktop anchor targets have no `scroll-margin-top` despite a sticky top bar,
  so “Jump to the Receipt Loop” and the prompt jump may obscure the destination
  heading;
- the script calls `focus()` on a feedback paragraph that has no focusability,
  so any intended programmatic focus move is ineffective (the live-region
  announcement may still work and must be tested with assistive technology).

**Smallest repair:** after the content/source repairs, rerun the exact manual
matrix in the packet in current Chrome and Safari, add `scroll-margin` if the
sticky bar obscures targets, decide whether feedback should remain announced in
place or receive `tabindex="-1"` and deliberate focus, and record results. A
separate current VoiceOver/Safari pass is mandatory.

## Source-by-source entailment and currentness result

All seven external material sources were opened independently on 2026-07-25.

| Source | Result | Independent finding |
| --- | --- | --- |
| NIST AI 600-1 | **PASS for C001; QUALIFY C005** | Pages 9 and 34 describe confidently false output/confabulated citations and require review/verification of sources and citations. The five-part “pointer + identity/relevance/scope/date/support” formulation is a LAiDIES synthesis, not verbatim NIST guidance. |
| OpenAI web-search documentation | **PASS** | Current documentation says models can search current web information and responses include URL citation annotations. Scope remains the documented API/tool, not all products or plans. |
| Anthropic “Reduce hallucinations” | **PASS** | The page recommends uncertainty, direct quotations and citations and explicitly says these techniques reduce but do not eliminate hallucinations; critical information still needs validation. |
| Google Grounding with Search | **PASS** | Current documentation describes search, processing, grounded output and inline citation annotations. It does not establish source quality or truth, and the book preserves that limit. |
| Digital Inquiry Group COR About | **PARTIAL / FAIL C006** | Supports the three source/evidence/other-source questions and research-based practice; does not define lateral reading as leaving the page. |
| C2PA 2.2 | **ENTAILMENT PASS / CURRENTNESS FAIL** | The cited version supports tamper-evident claims and the no-value-judgment limit, but current official specification is 2.4 and the ledger’s revision trigger was missed. |
| WCAG 2.2 | **PASS for requirement wording** | SC 1.4.10 requires reflow at 320 CSS pixels without loss/two-dimensional scrolling, with exceptions for content such as data tables. This verifies the requirement, not candidate conformance. |

Internal ECO-01 claims C009, C010, C013 and C014 are legitimate product rules
or instructional syntheses. Calling the packet their source does not turn them
into externally validated facts; the reader and ledger should label that class
plainly.

## Evaluation-suite verdict

**Structure:** pass. The suite has 18 unique cases with the required category
counts, reasons, diagnostic evidence actions and failure conditions.

**Substance:** repair required. E08 and E18 drift from the canonical verdict
taxonomy; no scored case tests an apparently authoritative primary source with
a method/incentive/applicability defect; and no learner administration has
occurred. The suite is a promising rubric, not evidence that the lesson
produces explanation, application or transfer.

## Verification run

```text
node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-product-stewards.mjs
  PRODUCT STEWARD SYSTEM PASS
  products=65 active=3/3

Independent exact-wording binding check
  FAIL — 0/14 claim-ledger publicWording values occur exactly in the canonical source

Independent material-source review
  7/7 external sources opened
  5 pass as scoped; COR partial/fails C006; C2PA entails but is stale versus current 2.4

Rendered/manual browser matrix
  NOT RUN — no browser was available to this review runtime

VoiceOver/Safari
  NOT RUN
```

The passing contract test is useful integrity evidence, but it currently proves
schema shape, counts, HOLD truth and generated hash binding—not instructional
contract fulfilment, semantic claim binding, source currentness or rendered
accessibility.

## Acceptance decision and next repair order

Keep the Rulebook, LIBRAiRY cover and Miss Jeeves record on **HOLD/PREVIEW**.
Do not route public or cross-product traffic to this candidate as an approved
book.

Repair in this order:

1. bind exact reader wording ↔ claim ID ↔ current source/passage;
2. update C2PA to 2.4 and repair the COR lateral-reading source/status;
3. implement the locked multi-item, explanation-producing interactions;
4. normalize evaluation verdict/qualification/action fields and add the
   primary-source limitation probe;
5. rerun an independent accuracy/instructional review against new hashes;
6. pass the complete browser/accessibility matrix and separate VoiceOver/Safari
   review;
7. only then run the separate eight-newcomer study with the locked 7/8 floors.

No expert repair or passing automated test can substitute for the eight-
newcomer explanation, application, analogy-limit and unseen-transfer evidence.
