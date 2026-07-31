# Independent expert re-review — Verification Rulebook bound HOLD proposal

**Judge:** independent Library content/trust reviewer (not the maker, Library implementation owner, or admission authority)  
**Evidence cutoff:** 2026-07-26 11:31 PDT (America/Vancouver)  
**Scope:** `how-to-check` / *How to Check AI’s Work: The Verification Rulebook* at its exact current **HOLD** bytes. This is a content, learning, claim-fidelity, correction-readiness, rendered-reader and artifact-binding review. It does not admit the book, alter the manifest, or approve release.

## Verdict

**PASS — LOCAL CONTENT/TRUST AND BOUND-HOLD ARTIFACT RE-REVIEW.**

The repaired proposal now binds its rendered source path, canonical content version and artifact hash correctly. The book has a coherent, accurate instructional core: it distinguishes generation, retrieval/search, grounding, citation, provenance and verification; it makes scope, freshness and stakes part of the decision; and it does not present citations, provenance or a prompt as a truth machine. The source ledger identifies 14 material claims, their scope and recheck conditions, and the rendered reader exposes that ledger without inventing an `available` state.

**HOLD — NOT ADMITTED; NOT READY TO OPEN AS A LIBRARY BOOK.**

This PASS is deliberately narrow. The current row is correctly `status: hold` and `correction_state: blocked-no-triage-ledger`, so it compiles to zero admitted books. A real correction service/receipt/triage/propagation chain, owner publication approval, newcomer transfer evidence, native accessibility evidence, the real reader → Puffy → Closet journey, release binding and public proof remain mandatory. None can borrow this local content PASS.

## Exact candidate identity

| Artifact | SHA-256 |
| --- | --- |
| Admission proposal | `dcd88326f30fe7f53850b752c2fb22c166a604f2a5f80c5d10bdbdbe6e5a699e` |
| Canonical Rulebook source | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claim ledger | `2a3f2421537b46c6cc073f1b8f617e083520b5d8de0708567a7e09e345e1cf94` |
| Evaluation suite | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Rendered Rulebook | `9c2863b850d3c287bd7bfa4ff79e4cbe040eb15cf911e62c289e4aec0a44c237` |
| Correction contract | `0b4a68b452be2532652222f0fa76fc00708082b881b27a0c8a6ad2983313d9a4` |

The proposal now declares:

```text
book_id=how-to-check
status=hold
source_path=/content/library-books/rendered/verification-rulebook.html
content_version=sha256-ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd
artifact_sha256=9c2863b850d3c287bd7bfa4ff79e4cbe040eb15cf911e62c289e4aec0a44c237
correction_state=blocked-no-triage-ledger
```

The renderer emits the same canonical-source metadata and content version. The admission compiler validates this bound-HOLD record but returns `admitted=0`. It therefore proves repair of the prior binding defect without creating a reader allow-list.

## Content, source and learning judgment

| Review area | Verdict | Independent finding |
| --- | --- | --- |
| Mental model | **PASS** | The seven-step Receipt Loop is introduced as a mnemonic for claim-to-evidence reasoning, not as a substitute for it. The book separates draft, claim, inference and recommendation, then adds stakes, scope, date, support and uncertainty. |
| Current-AI accuracy | **PASS** | It correctly treats search, grounding and citations as present capabilities and explicitly refuses the obsolete claim that they equal verification or truth. |
| Claim/source fidelity | **PASS** | All 14 claim IDs appear in both canonical source and rendered ledger. Official current references were reopened for NIST AI 600-1, OpenAI web search, Anthropic hallucination guidance, Gemini grounding, C2PA 2.4 and WCAG 2.2. The public wording stays within the ledger's stated scopes; provider claims are qualified rather than treated as comparative performance facts. |
| Teaching and transfer design | **PASS — LOCAL DESIGN ONLY** | Seven chapters, 18 evaluation fixtures and structured self-checks build from triage to source inspection to a qualified decision. Free-text answers are explicitly not scored as correct, which prevents an answer-key illusion. The transfer outcome remains unvalidated with new learners. |
| Safety and boundaries | **PASS** | The high-stakes/professional boundary is explicit. The book directs users to responsible professionals/decision owners rather than implying that this method replaces them. |
| Correction readiness | **HOLD** | Claim-scoped `mailto:` links and a deterministic local contract are useful preparation, but there is no real intake, receipt, status surface, triage owner/SLA, retention decision or consumer propagation. The honest manifest state is therefore correct. |
| Rendered-reader usability | **PASS — LOCAL BROWSER SCOPE** | The exact rendered artifact passed 40 independent Chrome/Playwright checks at 320/390/430/1440 widths, CSS 200%-zoom equivalent, keyboard operation, focus visibility, reduced motion, live feedback, nonscored prose behaviour and clipboard-failure recovery. This does not establish Safari, VoiceOver, native zoom, complete reading-flow or integrated Library-modal accessibility. |

No factual defect requiring a prose rewrite was found in the exact current candidate. The several claims that are LAiDIES syntheses or recommendations remain clearly labelled as such. The current-provider examples are separated by source, scope and next-review triggers, which is the right treatment for fast-changing capabilities.

## Reproduced evidence

```text
node scripts/check-product-stewards.mjs --owner-entry library
  PASS

node scripts/test-eco01-verification-rulebook.mjs
  PASS · chapters=7 claims=14 evals=18 status=HOLD

node scripts/check-eco01-source-versions.mjs
  PASS · C2PA 2.4

ECO01_PLAYWRIGHT_ROOT="$PWD/.ds-sync" \
ECO01_URL="http://127.0.0.1:8765/content/library-books/rendered/verification-rulebook.html" \
ECO01_BROWSER_EVIDENCE="operations/product-stewards/library/evidence-independent-rulebook-browser-2026-07-26" \
node scripts/test-eco01-browser.mjs
  PASS · 40 checks

node scripts/test-library-correction-service.mjs
  PASS · checks=22 · provider=none · admitted=0

node scripts/test-library-product.cjs
  PASS · checks=47 · external_requests_blocked=34

node scripts/validate-library-product.mjs
  PASS · books=15 · hold=8 · preview=7 · available=0

node scripts/compile-library-admission.mjs
  PASS · manifest=present · admitted=0
```

Fresh browser evidence is isolated at `operations/product-stewards/library/evidence-independent-rulebook-browser-2026-07-26/`.

## Acceptance action

The **content/trust expert re-review is complete locally**; no maker revision is needed before the next gates. Keep the Rulebook on HOLD and route the next acceptance work as follows:

1. **Platform + Library editorial:** build the real correction intake, privacy/retention decision, receipt/status/triage workflow and deterministic propagation into the manifest, index, Miss Jeeves and Puffy recheck.
2. **Accessibility judge:** run Safari + VoiceOver, native zoom/OS magnification and the exact integrated reader/Puffy/Closet journey.
3. **Learning research owner:** complete the locked eight-newcomer transfer study with actual responses and the stated criteria.
4. **Ali or delegated editorial/brand owner:** review these exact checksum-bound bytes for publication/voice/visual approval.
5. **Library/Closet/release judges:** only after 1–4, test the real four-state shelf/Miss Jeeves → reader → exact-section Puffy → Closet reopen/remove and demotion journey, then exact release and public-origin proof.

Until every later gate passes, this record is not a promotion instruction and the intended book remains **BUILDING — BUILD REMAINS REQUIRED**.

## Learning scan

No new shared prevention rule qualifies. The corrected manifest binding is a direct application of the existing exact-artifact/admission prevention rules; the important reusable result is that a bound HOLD must undergo the same byte and metadata validation as an available artifact, while still compiling to no reader permission.

