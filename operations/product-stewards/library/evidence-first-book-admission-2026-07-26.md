# LIBRAiRY first-book editorial admission evidence

**Review date:** 2026-07-26  
**Reviewer:** Library editorial admission lane / Codex  
**Trigger:** P0 admitted-book → reader → Puffy → Closet vertical under
D-2026-07-26-054 through D-2026-07-26-056  
**Verdict:** **HOLD — ZERO BOOKS ADMITTED; BUILD REMAINS REQUIRED**  
**Manifest:** `content/library-books/admission-manifest.json`  
**Evidence ceiling:** source/content/currentness and bounded local expert
evidence only; no owner, newcomer, native accessibility, correction-service,
integrated reader, release or public proof

## Outcome

All 15 shelf records and every plausible existing Library source/render were
screened. **How to Check AI’s Work / Verification Rulebook** is the strongest
candidate and the only book placed in the admission manifest. It remains
`hold`. The manifest intentionally contains:

- zero `available` records;
- no admissible `source_path`;
- the exact current candidate hash;
- every material claim ID and external source;
- a named review/version; and
- `correction_state: blocked-no-triage-ledger`.

This does not narrow the intended Library promise or move the book to a later
release. It is a temporary safety hold while the current-release build
obligation remains open.

## Standards and evidence inspected

- `operations/CODEX-WORKING-AGREEMENT.md`
- `operations/ACTIVE-WORK.md`
- `operations/engine/LEDGER.md`
- `operations/product-stewards/CHAMPION-CONTRACT.md`
- `operations/product-stewards/ORCHESTRATOR.md`
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- `operations/CONTENT-PUBLISHING-STANDARD.md`
- `operations/product-stewards/BUILD-COMPLETION-POLICY.md`
- Library `EXPERIENCE-BRIEF.md`, `FUNCTIONALITY-MAP.md`,
  `OPERATING-SPEC.md`, `state.json`, `backlog.md` and P0 vertical build packet
- `operations/library-content-quality-audit-2026-07-24.md`
- ECO-01 source packet, build packet, repair evidence and independent reviews
- prevention rules for rendered-book overclaim, book-family ownership,
  current capability, artifact admission and immutable authority, including
  BTB-076, BTB-084, BTB-087, BTB-114 and BTB-117

The required owner-entry preflight passed:

```text
node scripts/check-product-stewards.mjs --owner-entry library-101
PRODUCT STEWARD SYSTEM PASS
owner_entry_product=library-101:PASS
```

## Candidate inventory and rejection screen

Hashes below identify the exact bytes inspected on 2026-07-26. A rendered file
or earlier score was not treated as approval.

| Shelf book | Exact inspected source/render | Editorial verdict | Narrow reason it cannot be first admission |
| --- | --- | --- | --- |
| Vocab 101 | `vocab-101.md` `e55b70e8…`; rendered `c8d044b3…` | HOLD | Existing worktree bytes are under an unresolved Vocab → Concepts ownership/representative-journey decision. Scaling and newcomer proof are absent. |
| Concepts 101 | rendered `c9c9875b…`; nearest extracted source `handbook-ch1.md` `91abab24…` | HOLD | Representative prototype only; canonical source/reconciliation and ownership decision remain open. |
| Briefing 101 | rendered `47ac2a10…`; `handbook-ch2.md` `17b20009…` | HOLD | Overlapping extracted chapters, real-task procedure proof and full reader scorecard remain open. |
| Setup 101 | rendered `ebebd5e6…`; `handbook-ch3.md` `e550e25c…` | HOLD | Product/account setup claims need dated official-source separation and demonstrated setup/return proof. |
| Accounts 101 | rendered `832ea39b…`; `handbook-ch5.md` `d430faea…` | HOLD | Contains the unsafe universal slogan “when the tool is free, the product is you” and categorical account/privacy claims. |
| Who’s Who in AI | `whos-who.md` `a171c214…`; rendered `1373dcf1…` | HOLD | Broad changing provider/company comparisons lack a complete current decision job and claim packet. |
| Straight Answers About AI | `straight-answers.md` `1978867b…`; rendered `a1e796c4…` | HOLD | Perishable jobs/environment/privacy/economy claims require complete trigger-driven re-verification and actual question-to-answer study. |
| How to Check AI’s Work | canonical `ac3ec15f…`; claims `f391a635…`; evals `16824680…`; rendered `56488c21…` | **STRONGEST — HOLD** | Local expert floors pass, but mandatory newcomer/native/owner/correction/admissible-path gates do not. |
| ChatGPT | `tool-chatgpt.md` `4c7e6baa…`; no admitted rendered body | PREVIEW/HOLD | Current product capabilities, limits, plans and privacy require release-date official recheck; no complete admission packet/render binding. |
| Claude | no complete current Library source/render | PREVIEW | Future Episode 5 inventory only. |
| Gemini | no complete current Library source/render | PREVIEW | Future Episode 5 inventory only. |
| Copilot | no complete current Library source/render | PREVIEW | Future Episode 5 inventory only. |
| Perplexity | no complete current Library source/render | PREVIEW | Future Episode 5 inventory only. |
| What Not to Paste | no complete source/render | PREVIEW | Future Episode 7 inventory only; no book body or evidence packet. |
| Prompt Cookbook | no complete source/render | PREVIEW | Future inventory only; no book body or evidence packet. |

The ellipses in this inventory are display abbreviations only. The selected
candidate’s full hashes are recorded below and in the manifest.

## Selected candidate identity

The shelf ID is `how-to-check`; the canonical structured source uses
`bookId: verification-rulebook`. That mapping is explicit and must not create a
second content authority.

| Artifact | SHA-256 |
| --- | --- |
| Canonical structured source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Existing rendered HOLD candidate | `56488c210c93fa9f1e9db2ca2cffed4a4b24fb7beb906c9f2e87f4826cf9630b` |

Proposed content version:
`vr-2026-07-25-ac3ec15f`. Proposed admission version:
`proposal-2026-07-26.1`.

The rendered candidate is currently
`/grimoire/verification-rulebook.html`, not the admission compiler’s required
`/content/library-books/rendered/<book>.html` path. It also does not carry the
required `laidies:content-version` meta value. Therefore the manifest truthfully
leaves `source_path` empty.

## Claim and currentness review

All 14 claim rows were read against the exact candidate wording. Every material
external source was opened again on 2026-07-26. No contradictory change was
found:

| Claims | Primary/official evidence re-opened | Current review result |
| --- | --- | --- |
| VR-C001, VR-C005 | NIST AI 600-1, especially confabulation/fabricated-citation and source-verification controls | Support and qualification remain accurate. |
| VR-C002 | OpenAI web-search documentation | Current capability and visible/clickable citation behavior remain documented; no comparative-accuracy inference is made. |
| VR-C003 | Google Gemini API grounding documentation | Current search grounding and citation behavior remain documented; the book preserves the source-quality/entailment limit. |
| VR-C004, VR-C012 | Anthropic “Reduce hallucinations” documentation | Uncertainty/direct-quote/citation techniques and the explicit “do not eliminate” limitation remain present. |
| VR-C006, VR-C011 | Digital Inquiry Group / Civic Online Reasoning | Source identity, evidence, other-source questions and lateral-reading behavior remain supported. LAiDIES synthesis is labelled as synthesis. |
| VR-C007 | C2PA Content Credentials specification 2.4 | Tamper-evident provenance and the no-good/bad-value-judgment limit remain supported. |
| VR-C008 | W3C WCAG 2.2 | 320 CSS-pixel reflow remains a Level AA requirement; this row is an acceptance requirement, not a conformance claim. |
| VR-C009, VR-C010, VR-C013, VR-C014 | Named internal ECO-01 contract | Correctly labelled internal taxonomy, recommendation, product boundary and freshness principle. |

The source drawer uses paraphrase and qualified synthesis rather than copying
substantial source text. Provider documentation is treated as primary evidence
for provider-described capability only, not independent comparative truth.

## Content, usefulness and instructional review

The candidate provides a durable reference job distinct from Episode 3,
Dream Phone, NewsStand and High. It teaches the mechanism:

`Frame → Split → Find → Inspect → Cross-check → Decide → Record`

It separates generation, retrieval/search, grounding, citation, provenance and
verification; handles scope, date, denominator and compound claims; provides
four non-binary evidence verdicts; includes a high-stakes stop/escalate
boundary; and ends with an unseen-domain transfer task.

The exact independent local review already records these non-compensable
scores against the current hashes:

| Gate | Score | Floor | Local verdict |
| --- | ---: | ---: | --- |
| Product/content quality | 18/20 | 17/20 | PASS |
| Accuracy, safety and trust | 18/20 | 17/20 | PASS |
| Positive LAiDIES brand contribution | 17/20 | 17/20 | PASS |
| Exact claim/source binding | 19/20 | complete/direct/current | PASS |
| Local Chrome accessibility/UX | 18/20 | no material expert defect | PASS |

Those expert scores do not replace the learning-content standard’s mandatory
representative-newcomer evidence. The 18-case evaluation suite is an answer
contract, not evidence that learners can explain, apply and transfer the
method.

## Rights and brand review

Bounded rights review passes for the candidate content:

- the canonical prose, exercises, taxonomy and prompt are LAiDIES-authored;
- external evidence is paraphrased and linked, not reproduced as source text;
- no third-party image, audio, video, screenshot, logo or substantial excerpt
  is embedded in the candidate;
- provider/product/standards names are used descriptively;
- the short “she doesn’t even go here” cultural mnemonic is explicitly
  optional and its instructional limit is stated; and
- the mechanism works without knowing the film reference.

This is an editorial rights/use review, not a legal opinion. Owner voice/taste
approval remains missing, so brand admission does not pass despite the bounded
17/20 independent local score.

## Accessibility and reader review

Fresh deterministic/local evidence is strong but bounded:

- semantic landmarks, ordered headings, native form controls and descriptive
  tables/regions exist;
- the isolated Chrome matrix covers 320/390/430/1440 widths, CSS 200%-zoom
  equivalent, keyboard states, reduced motion, focus, live feedback, clipboard
  failure, screen/print contrast and exact colors;
- the most recent independent matrix reports 40/40 checks; and
- the print warning is 21:1, screen warning 13.21:1, nested copy 15.86:1 and
  nested link 7.62:1.

Missing mandatory release evidence:

- current Safari behavior;
- VoiceOver/Safari announcement and operation transcript;
- native page zoom / operating-system magnification;
- owner/headed reading review; and
- the integrated Library modal, exact-section and Puffy/Closet journey using
  this real body.

No WCAG conformance claim is made.

## Correction state

The candidate exposes claim-scoped `mailto:` links and warns against emailing
private source material. That is a useful intake affordance, but it does not
provide the P0 correction contract:

`submit → receipt → triage → correct/demote → manifest → reader → Miss Jeeves/index → Puffy reopen`

There is no authoritative correction ID, receipt, state transition, triage
owner ledger, retention contract, resolution record or propagation proof.
Accordingly the manifest records
`correction_state: blocked-no-triage-ledger`, not `clear`.

## Admission blockers and narrowest build

No prose rewrite is required by this review before the next evidence gates.
The narrowest honest completion path is:

1. **Render/bind one canonical artifact.** Generate the exact approved body at
   `/content/library-books/rendered/verification-rulebook.html`, add the exact
   `laidies:content-version` meta value, preserve the canonical-source hash and
   prove deterministic byte identity. Do not hand-edit a second authority.
2. **Run the locked eight-newcomer study.** At least 7/8 must independently
   explain the citation/grounding/provenance limit, split a compound claim,
   choose diagnostic evidence, find scope/freshness problems, produce a
   qualified verdict, state the analogy limit and transfer the method. Record
   actual responses/results; do not infer them from the answer key.
3. **Complete native/owner evidence.** Run current Safari, VoiceOver/Safari,
   native zoom/OS magnification and headed owner review against the exact
   candidate.
4. **Build the correction ledger/service.** Provide claim-scoped receipt,
   triage, resolution/demotion and every-consumer propagation. Only an accepted
   state may set `correction_state` to `clear`.
5. **Promote only the manifest row.** After gates 1–4 and owner content approval,
   change `status` to `available`, set the exact rendered `source_path`, update
   content/admission versions and hash, and compile the private allow-list.
6. **Run the real vertical.** Independently verify shelf/Miss Jeeves → reader →
   exact-section Puffy save → authoritative read-back → Closet reopen/remove
   in all four visitor scopes, then exact artifact and separate public-origin
   proof.

Until all six steps pass, `how-to-check` remains **HOLD — BUILD REMAINS
REQUIRED**. No other current book is closer to truthful admission.

## Fresh verification

```text
manifest JSON parse + compileAdmissionManifest
  PASS — admitted=0; candidate=how-to-check; status=hold

node scripts/test-eco01-verification-rulebook.mjs
  ECO-01 CONTRACT PASS
  chapters=7 claims=14 evals=18 status=HOLD
  source_sha256=ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd

node scripts/check-eco01-source-versions.mjs
  ECO-01 SOURCE VERSION PASS: C2PA 2.4

fresh isolated node server + local Chrome
ECO01_PLAYWRIGHT_ROOT="$PWD/.ds-sync" node scripts/test-eco01-browser.mjs
  ECO-01 BROWSER MATRIX PASS: 40 checks

node scripts/check-product-stewards.mjs --owner-entry library-101
  PRODUCT STEWARD SYSTEM PASS
  owner_entry_product=library-101:PASS

git diff --check -- <the two admission-lane files>
  PASS
```

The broader synthetic admitted-reader suite was also run and does **not**
currently pass:

```text
node scripts/test-library-product.cjs
  LIBRAiRY PRODUCT FAIL
  exact-section deep link opens the currently admitted version
```

The observed state had the expected `Deep Link Section` attached and visible
inside `#rtxt`, but the reader dialog still reported `aria-hidden="true"`.
That platform/integration defect is outside this lane’s permitted files and is
an additional blocker; it is not repaired or hidden by this editorial packet.

The fresh manifest and evidence hashes after this verification are recorded in
the task handoff. No new pain-point record is asserted from this bounded lane:
the core admission/artifact-authority risks are already captured by BTB-114 and
BTB-117, while the synthetic deep-link failure needs a platform root-cause
review before it qualifies as a new reusable learning.
