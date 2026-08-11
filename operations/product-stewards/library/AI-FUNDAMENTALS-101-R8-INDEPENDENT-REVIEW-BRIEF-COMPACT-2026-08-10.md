Work read-only. Review two complete teaching artifacts for women with no technical background. Do not inspect AGENTS.md, maker receipts, production methods or other files.

First read only `content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r7.md`. Decide REJECT or PASS and list material defects in acronym order, what counts as AI, actual-system examples, referent clarity and continuous section order.

Then read `operations/product-stewards/learning-content-ecosystem/quality-exemplars/ai-fundamentals-r7-whole-chapter-known-bad.md`. Report which registered R7 defects you found unaided and which you missed.

Then read only `content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r8.md`. Decide REJECT or PASS. Reject for any confusing transition, undefined term, misleading example, false relationship, generic textbook voice or failure to build one usable mental model.

For R8, state why each major section follows the prior section. Explain back without copying definitions: expert systems versus ordinary automation; AI versus machine learning versus deep learning; predictive versus generative; multimodal; agentic; embodied; specialised versus general-purpose; artificial general intelligence; artificial superintelligence.

Apply R8 to this unseen case: an assistant reads a photographed equipment fault and spoken description, drafts a report, checks an approved maintenance system and stops before submitting a repair order. State justified labels and four important unknowns.

Return strict JSON only:
{"r7":{"verdict":"REJECT|PASS","issues":["..."],"foundUnaided":["..."],"missed":["..."]},"r8":{"verdict":"REJECT|PASS","materialIssues":["..."],"minorIssues":["..."],"sectionChain":"...","explainBack":"...","unseenTransfer":"...","voice":"PASS|FAIL with reason","continuousReaderValue":"PASS|FAIL"}}
