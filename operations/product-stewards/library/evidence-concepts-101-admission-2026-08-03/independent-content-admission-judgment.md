# Concepts 101 — independent content-admission judgment

**Judged:** 2026-08-03T14:03:32-07:00 (America/Vancouver)
**Reviewer:** Independent content/admission judge
**Verdict:** **HOLD — full content admission remains open.**
**Bounded positive finding:** **PASS — the exact candidate is a substantial, durable LAiDIES reference and passes the scoped content-quality review below.**

This is a content judgment, not owner admission, release approval, deployment, publication or public-origin verification. It does not alter the candidate, manifest, Library reader or release state.

## Exact identity

| Item | SHA-256 | Result |
| --- | --- | --- |
| Candidate: `content/library-books/rendered/concepts-101.html` | `bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b` | matched manifest |
| Claim ledger: `content/library-books/concepts-101.claims.json` | `d8b5abefa36ce3921f206d9f4311828f01e38a54d6dd5fa2fc2999ae442fe44a` | matched manifest |
| Library admission proposal | `54ccaae93ee05f8cc9b27b3cbb31810ae3fef660b3caf4fa25b46251631c3010` | `hold`; zero books admitted |
| Corrected learning standard | `d139158454b816eaef07cb10e61b0c63683274037e2c57c4ea026768dd60a856` | exact input |
| Final candidate manifest | `ab263923315216ce461bfd8d27a1e22e49dd19176d58c61501f55666d40f8254` | exact input and verdict binding |
| Reader | `3c324608fab51a5b0a02ddd8153e2b0c5c65617af21da6499b775ee8e9f4d572` | matched manifest |
| Reader test | `62f77f23e8c67844490d87f35fb3f1cfd4f3db80fff9f9e8e1375780002bd065` | 65 checks pass |

The only delta from the previously independently judged teaching body is the leading content-version metadata. Removing that one metadata line reproduces the previously judged body SHA-256 `c4acc59294a000a6505552dc7389115136b15077686ce37a229ed78b562da498`. Therefore the prior source/teaching review is valid for the unchanged body; it is not asserted as a new independent live-source verification. The final tuple changes the held reader/search handling and captures, not the teaching bytes.

## Findings against the book/reference standard

| Requirement | Finding | Evidence |
| --- | --- | --- |
| Reader question, plain answer and mechanism | **PASS.** The entry point names the reader problem, promises the moving parts rather than tool tips, then starts with model/LLM and the provider/model/product/tools map. | Candidate lines 3–23 |
| Scannability and depth appropriate to a book | **PASS in the exact local reader.** Six descriptive top-level routes, section anchors, an on-demand mobile section finder and a quick reference let a reader enter at one answer or read through; this is not a duplicated class sequence. | Candidate lines 5–53, 65–179, 184–395, 399 onward; final bound rendered captures |
| Distinctions, failure points and consequence | **PASS.** It separates training/context, context/memory, retrieval/verification, generative/reasoning/agentic/AGI, and repeatedly explains the decision consequence and appropriate check. | Candidate lines 13–49, 75–103, 118–173, 190–242, 264–304, 325–379 |
| Concrete visibility and anti-slop | **PASS.** The reader gets controlled contrasts (for example context vs memory), observable checking questions, and a concrete agentic goal/tools/permissions/actions example. The book supplies mechanism, boundary, failure diagnosis and useful action rather than generic tips or padded headings. | Candidate lines 142–147, 161–173, 204–242, 266–304 |
| Hannah Fry explanation lens | **PASS for a reference, not a class.** The entry establishes a human reason to look up the topic, makes hidden processes tangible, moves between familiar and technical framing, retains uncertainty, and leaves better questions. It does not require a narrated prediction/practice/feedback arc. | Candidate lines 3, 31–53, 79–103, 126–135, 376–379 |
| LAiDIES voice | **PASS.** Specific, adult and candid rather than generic or corporate; humour is doing explanatory work, not replacing it. | Candidate lines 3, 81–99, 216–238, 277–323 |
| Rewind Era / analogy integrity | **PASS.** The fashion-house map identifies provider/model/app and says the software is not literally a fashion business. Cher’s closet and rehearsal studio map mechanism to authority/permissions and sandbox controls, then state their limits. Other lighter familiar bridges are followed by factual qualifications rather than being used as proof. | Candidate lines 9, 79–91, 262–304, 313–323 |
| Evidence, currentness and correction | **SCOPED PASS; full release evidence remains HOLD.** Six repaired material-claim clusters bind eight direct primary/authoritative sources, limitations and triggers; currentness-sensitive clusters require before-release recheck. The validator rejects hash, source, limitation, propagation and known-stale-phrase drift. This is strong exact repair evidence, but it is not a claim that every statement has been freshly reverified at release time. | Claims ledger; `scripts/check-concepts-101-claims.mjs`; candidate lines 55–60, 105–108, 175–179, 244–247, 389–393 |
| Continuation | **PASS / no forced filler.** The book is self-contained and its useful next steps are source-led where a reader needs competing definitions or current documentation. The standard now makes broader continuation conditional on genuine value, so absence of a class-style route is not a defect. | Candidate lines 381–387; learning standard “Continuation, when one genuinely helps” |

## Checks reproduced

- `node scripts/check-product-stewards.mjs --owner-entry library` — **PASS**.
- `node scripts/check-concepts-101-claims.mjs` — **PASS**: 6 claims, 8 sources, 3 currentness records, 4 quick-reference propagations, exact candidate SHA; intentionally reports `status=HOLD`.
- `node scripts/check-library-vocab-concepts-consolidation.mjs` — **PASS**: 17 retained terms; retired Vocab is not listed as a separate book.
- `node scripts/test-library-product.cjs` — **PASS**: 65 checks; 43 external requests blocked. The exact fixture verifies contents/reader rendering, unique heading IDs, no Puffy controls in receipts, duplicate-title exact section save/reopen, mobile/desktop fit, and held Concepts search metadata that is preview-only and cannot become an operable result.

## Why the full verdict stays HOLD

1. The bound publication proposal explicitly says `hold` and `admitted_books: 0`; local fixture success cannot promote that state.
2. Native Safari, VoiceOver and 200% zoom evidence is absent from the supplied packet.
3. There is no independent unfamiliar-reader evidence that a newcomer can locate, understand and use the book as intended in the real Library.
4. No Library owner admission, exact release identity, deployment or public-origin journey evidence exists.

## Freshness and correction

**Reviewed through:** 2026-08-03.
**Next trigger:** immediately before release; any source/product/model, memory/context, cutoff, AGI-definition, or OpenAI/Hugging Face incident update; or reader-confusion/correction evidence.
**Correction owner:** Library editorial / Concepts 101 owner, with independent accuracy and destination-experience re-judgment after a material change.
