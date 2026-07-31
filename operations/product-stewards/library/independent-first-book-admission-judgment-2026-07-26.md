# Independent first-book admission judgment — Verification Rulebook

**Judge:** independent Library admission judge (not the maker or Library
implementation owner)  
**Evidence cutoff:** 2026-07-26 11:10 PDT (America/Vancouver)  
**Scope:** `how-to-check` / *How to Check AI’s Work: The Verification
Rulebook*, its admission proposal, rendered artifact, local reader/Puffy/Closet
contracts and correction contract.  
**Authority used:** read-only review and local test execution. No runtime,
manifest-status, content, service, deployment, commit, push or public change.

## Overall admission verdict

**HOLD — NOT SAFE TO ADMIT LOCALLY.**

The candidate is the strongest current Library book and has useful bounded
local content and browser evidence. It is nevertheless not an admitted book:
the manifest has zero `available` records, the real reader/Puffy/Closet
vertical has no book to exercise, the correction service is only an in-memory
contract, owner/newcomer/native-accessibility gates are open, and the current
manifest cannot bind the current generated rendered artifact if promoted.

This is not a recommendation to remove, defer or relabel the intended
experience. It remains a current-release build obligation.

## Independent gate verdicts

| Gate | Verdict | What is actually evidenced | Why the admission gate remains open |
| --- | --- | --- | --- |
| Editorial/content accuracy | **HOLD** | The canonical source has 14 explicit claims; the ECO contract and C2PA 2.4 current-source check pass. Existing editorial evidence records an 18/20 local content/trust score and current primary-source review. | The named owner has not approved the exact current bytes for publication, and a claim-scoped correction lifecycle is not live. Local evidence is not publication authority. |
| Teaching and transfer quality | **HOLD** | Seven-chapter method, 18 deterministic evaluation cases and a 40-check browser matrix pass. The book distinguishes retrieval, grounding, citation, provenance and verification, and includes a transfer task. | The required representative eight-newcomer study has not occurred. An answer-key/evaluation pass does not show that new readers can explain, apply and transfer the method. |
| Visual/UX readiness | **HOLD** | The permanent owner independently observed the honest room, labels, mobile catalogue, Miss Jeeves response and empty Closet at desktop/mobile on 2026-07-26 11:06 PDT. Current Library local test passes 47 checks. | No real admitted book opens in the live Library interface (`availableButtons=0`), so the actual reader, exact-section save and Closet return journey remains unobserved. Library visual-owner review and the sitewide style decision remain open. |
| Accessibility evidence | **HOLD** | Fresh local Chrome/browser matrix passes 40 checks; existing deterministic evidence covers reflow widths, keyboard/focus, reduced motion and contrast. | Current Safari, VoiceOver/Safari operation and announcement transcript, native page zoom/OS magnification, and the integrated real-book Library modal/Puffy/Closet journey are missing. No WCAG conformance may be inferred. |
| Correction readiness | **HOLD** | `test-library-correction-service.mjs` passes 22 checks, including claim-scoped records, privacy rules, idempotency and bounded demotion projections. | The contract says `provider=none`, has no real intake/receipt/status UI, no delegated triage/SLA, no approved retention/data policy, and no integrated propagation to manifest/index/Miss Jeeves/Puffy. The manifest truthfully says `blocked-no-triage-ledger`. |
| Exact-artifact binding | **HOLD** | The renderer produces a generated HTML file with canonical-source and `laidies:content-version` metadata; the ordinary admission compiler passes with zero admissions. | The held proposal still names a different artifact hash and a different content-version convention. A read-only simulated promotion failed: `how-to-check: rendered artifact content version does not match`. This must be reconciled before any admission can compile. |

## Exact candidate identity observed

| Artifact | SHA-256 |
| --- | --- |
| `library.html` | `573a70115e5bbbfa990e204c8f7cdbc8cb14fb5cc88383e40925b6d22942750b` |
| `laidies-card.html` | `5b9ab0033862bc77351904f20bf7bbf4bf018c639dca1f1ce2c464a27875e70a` |
| `content/site/puffy-bookmarks.js` | `b2ad065f5f95906066a6d95f2798b51fd0696171c6f65822d1fc508f58e12208` |
| Canonical Rulebook JSON | `ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd` |
| Generated claims JSON | `f391a6357806e4992e091e2e07ba52d2b5ba818f728ad1cffba1b977c0e4623e` |
| Evaluation set | `168246804ce9deb2723a0cf3a8c90e19d06d936093afc6e84e0e8a106cf8bdc5` |
| Current rendered Rulebook | `9c2863b850d3c287bd7bfa4ff79e4cbe040eb15cf911e62c289e4aec0a44c237` |
| Admission proposal | `82a52e32302cdbb82aa1777127caae5cc629b5b35cf8cf1271cb30c2ff847c6f` |
| Correction contract | `0b4a68b452be2532652222f0fa76fc00708082b881b27a0c8a6ad2983313d9a4` |

The held manifest row currently has `status: hold`, blank `source_path`,
`correction_state: blocked-no-triage-ledger`, proposed content version
`vr-2026-07-25-ac3ec15f`, and old artifact hash
`56488c210c93fa9f1e9db2ca2cffed4a4b24fb7beb906c9f2e87f4826cf9630b`.
The exact generated rendered file instead declares content version
`sha256-ac3ec15f27898ad69c9ac142a86e51948b5d024437b89dcd11cf336ad81fdacd`
and has the current rendered hash above. This is a concrete binding defect,
not a taste judgment.

## Tests reproduced by the judge

```text
node scripts/check-product-stewards.mjs --owner-entry library
PASS

node scripts/validate-library-product.mjs
PASS · books=15 · hold=8 · preview=7 · available=0

node scripts/test-library-product.cjs
PASS · checks=47 · external_requests_blocked=34

node scripts/test-eco01-verification-rulebook.mjs
PASS · chapters=7 · claims=14 · evals=18 · status=HOLD

node scripts/check-eco01-source-versions.mjs
PASS · C2PA 2.4

ECO01_PLAYWRIGHT_ROOT="$PWD/.ds-sync" node scripts/test-eco01-browser.mjs
PASS · 40 checks

node scripts/test-library-correction-service.mjs
PASS · checks=22 · ledger_events=6 · provider=none · admitted=0

node scripts/render-eco01-verification-rulebook.mjs
PASS · generated source metadata bound to canonical source SHA

node scripts/compile-library-admission.mjs
PASS · manifest=present · admitted=0
```

The final two ordinary compiler checks do **not** prove promotion: the compiler
skips non-available rows. A read-only in-memory clone that changed only the
row to `available`, supplied the current path/hash and `correction_state:
clear` failed against the exact current rendered bytes because the proposal
content version and generated artifact metadata do not match.

## Gate ownership and what can happen now

| Gate | Can it be satisfied locally now? | Required owner/evidence |
| --- | --- | --- |
| Reconcile deterministic manifest ↔ rendered content version/hash | **Yes, but it does not admit the book.** | Library/editorial + release integration owner must update the proposal from the exact generated bytes, then independently compile/check it. |
| Owner content/voice/visual approval | **No** | Ali or a delegated editorial/brand owner must review the exact bound candidate. |
| Eight-newcomer transfer evidence | **No** | Research/learning owner with real participants and recorded results. |
| Safari/VoiceOver/native zoom proof | **No** | Native accessibility judge using the exact integrated candidate. |
| Production correction intake, retention, triage and propagation | **No** | Platform + Library editorial; data/retention authority is required before real reporter payloads are accepted. |
| Exact reader → Puffy → Closet → demotion integration | **Not until correction and binding gates pass.** | Library/Closet/Platform integration owner, then independent judge. |
| Candidate/release/public-origin evidence | **No** | Release owner after all prior gates; deployment/public verification remains separate. |

## Smallest executable next action

**Repair the proposal-to-rendered binding without changing admission status:**
have the Library/editorial and release-integration owners create an exact
candidate binding record whose content-version convention, rendered hash and
generated metadata agree, then run the compiler in a read-only candidate
fixture. Keep `status: hold` and `correction_state:
blocked-no-triage-ledger`.

This is safe, bounded work that removes one concrete defect. It does **not**
authorize a status change. In parallel, the real blocker to eventual admission
is the correction provider/data/triage decision and implementation, followed
by owner, native-accessibility and newcomer evidence.

## Admission authority conclusion

The delegated Library owner **cannot safely admit this book locally now**. No
local test, rendered file, cover, evaluation set or temporary correction
contract may convert the record to `available`. The earliest safe admission
attempt is only after the bound exact candidate, production correction chain,
owner content/visual approval, newcomer transfer result and native
accessibility evidence all pass; it then still requires the full real
Library-to-Closet vertical and separate release/public-origin proof.
