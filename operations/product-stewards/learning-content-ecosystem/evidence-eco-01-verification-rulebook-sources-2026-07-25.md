# ECO-01 Verification Rulebook evidence and source manifest

**Observed/researched:** 2026-07-25
**Status:** SOURCE PACKET — evidence for a build/review cycle, not editorial approval
**Scope:** the current “How to Check AI’s Work” surfaces, Episode 3 handoff,
Dream Phone practice dependency, and current primary/official guidance needed
to specify a durable verification reference

## Evidence convention

- **OBSERVED** means directly inspected in the named repository artifact.
- **SOURCED FACT** means supported by the linked primary/official source as
  accessed on 2026-07-25.
- **INSTRUCTIONAL RECOMMENDATION** is a proposed LAiDIES teaching decision. It
  does not inherit authority from the sources.

## Current LAiDIES surfaces inspected

| Artifact | SHA-256 on 2026-07-25 | Observed role / finding |
| --- | --- | --- |
| `library.html` | `238be0ce6a20dd7b2a2662c8ef05dd483fc1dbb6c1135df9aa886bfddf7a0f13` | The clickable Reference-shelf record for `how-to-check` has no `src`; it opens two embedded placeholder-style paragraphs. The full standalone Rulebook is therefore not the shelf reader body. |
| `grimoire/verification-rulebook.html` | `66fe5e543b00b44cbdb1031751ab5df0eff69e16b5ebf82160692d682479d452` | A 357-line standalone page already exists with draft/claim/receipt sorting, three moves, a prompt, check patterns and Episode/Handbook/Chamber links. It is substantive, but it has no visible source drawer, review date, freshness contract, correction route, learning checks or independent approval record. |
| `operations/launch/eod-2026-07-25/local-public-artifact/grimoire/verification-rulebook.html` | `66fe5e543b00b44cbdb1031751ab5df0eff69e16b5ebf82160692d682479d452` | Byte-identical local release-artifact copy of the standalone page. This proves packaging, not public/editorial approval. |
| `content/episodes/episode-03.canon.md` | `25b253012d699e5ad8c3bec59f5d1c846e4b95e2214f2fc6cf4623ce15dce4c6` | Episode canon establishes the narrative verification promise and cross-product handoff. |
| `content/issues/issue-03.md` | `e28965f192c8e04b9fdbdb90ded5bf380df03abe6b32173caa17ec78f6d3fb85` | Long-form Episode 3 source teaches stakes, claim sorting, source grounding, independent checking and a work example; it contains dated claims and a Receipts Drawer that require current claim-level review. |
| `issues/issue-03.html` | `f11497eb01df5c0e1111c52f23210f854f3b40c59decdaac0e87305918f46f4d` | Current rendered Episode surface directly links to the standalone Rulebook and describes it as the place where the “whole method” lives. This makes the unapproved route a current cross-product promise, not an isolated file. |
| `operations/voice/episodes/laidies-episode-03.md` | `b5778510378f520d43d44a840298777ee0384331c7cbd166a3f30baeeb0fb847` | Narration/source script repeats the Episode 3 learning method and source claims. It is an upstream dependency, not authority for the book’s factual claims. |
| `operations/codex-prompts/ep03-authoritative-spec.md` | `4108d8cfb0cf67aac4cc3785260b36995bb2f2b2f11142f329ce98421469d763` | Episode production specification and visual/narrative constraints; not a substitute for content evidence. |
| `content/site/site-index.json` | `805ea1a0df5220267554fd9306e53314f76798b524029523a66c8bae26b06d80` | Miss Jeeves/search index labels `/grimoire/verification-rulebook.html` `live`, so search can route around the shelf’s thin embedded body into the separately unapproved candidate. |
| `content/library-books/INVENTORY.md` | `af2537e0dc7798a61ec6051de7e40165cacf9c900266e6539c006342f13b811c` | Assigns hallucination material to the Verification Rulebook/Episode 3 track, reinforcing the book’s durable ownership boundary. |
| `content/library-books/handbook-ch1.md` | `91abab24c84d8e2080551d3c8662cb501909cf85ae7b544aaadaeef70aaffd00` | Current handbook source calls itself the deep read and links the Rulebook as the quick verification move. The final ecosystem contract must narrow this overlap so the Rulebook owns the method and the Handbook does not become a second method. |
| `operations/library-content-quality-audit-2026-07-24.md` | `f0bf0fb27572d2b32a0814d987a2360965127cbda0c180c3c3fd2b3409c1565b` | Records `REJECT — PLACEHOLDER PRESENTED AS BOOK` for the shelf journey and requires either removal or binding of a complete canonical body. |
| `games/dream-phone.html` | `cffafb0659977084ad016cb8dd1662dc65253e3d285229a90bda93362c2d1e7b` | Public game source truthfully calls its sources “review leads,” not an authoritative fact-checking service. |
| `operations/product-stewards/dream-phone/deep-dive-2026-07-25.md` | `349fde2c5ed5f80f5e792b215659821d692d7aac6c90123e734008a0e40852e4` | Dream Phone’s intended unique job is evidence-action practice and transfer; its present source ledger and claim-level provenance are not launch-approved. |
| `operations/product-stewards/learning-content-ecosystem/inventory.json` | `2963fee9df7d1ad4d0355229a0f82c38ebd7f388af343a8b1775dd6be9bbf57a` | ECO-01 and ECO-05 identify the missing durable verification follow-through and cross-product overlap. |

### Observed integration conclusion

The problem is more precise than “the Rulebook source is missing.” A
substantial standalone page exists, while the LIBRAiRY shelf opens different,
thin embedded copy. Meanwhile the search index marks the standalone route
`live`, and Episode 3 directly promises it as the complete method. That is a
source-of-truth and publication-binding failure. The standalone page is a
candidate input, not a pre-approved book.

## Current primary/official research

| Source | Source class | Relevant sourced fact | Use in packet | Freshness trigger |
| --- | --- | --- | --- | --- |
| [NIST AI RMF: Generative AI Profile, NIST.AI.600-1](https://doi.org/10.6028/NIST.AI.600-1) | U.S. government standard/profile; primary official | Confabulation can include false content and fabricated citations. NIST calls for reviewing and verifying sources/citations and for ongoing measurement/monitoring. | Supports the distinction between a citation being present and a claim being verified; supports an ongoing review/correction loop. | Recheck on NIST profile revision; otherwise annually. |
| [OpenAI API web-search documentation](https://developers.openai.com/api/docs/guides/tools-web-search) | Provider documentation; primary for current OpenAI capability/implementation | Web search can provide current sourced answers; citations shown to end users must be visible and clickable. | Current example that search and citation are product capabilities, not hypothetical future abilities. Does **not** establish that cited answers are automatically true. | Recheck before any provider-specific wording and quarterly while named in the book. |
| [Anthropic: Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) | Provider documentation; primary for current Claude guidance | Anthropic recommends allowing uncertainty, grounding in direct quotations, verifying claims with citations and retracting unsupported claims; it explicitly says these techniques do not eliminate hallucinations and critical information still needs validation. | Supports the candidate prompt pattern and, crucially, the limit that prompting reduces risk rather than proving truth. | Recheck before any provider-specific wording and quarterly while named in the book. |
| [Google Gemini API: Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search) | Provider documentation; primary for current Gemini capability/implementation | Search grounding connects generation to current web material and returns citation annotations. | Current example of retrieval/grounding and citations as distinct system operations. Does **not** certify source quality or entailment. | Recheck before any provider-specific wording and quarterly while named in the book. |
| [Stanford/Inquiry Group Civic Online Reasoning](https://cor.inquirygroup.org/about/) | University research-based curriculum; authoritative educational source | Its practical evaluation frame asks who is behind information, what the evidence is and what other sources say; its lateral-reading materials prioritize leaving the page to investigate a source. | Supports source identity, evidence inspection and independent corroboration as learner actions beyond reading a citation label. | Annual link/content review. |
| [C2PA Content Credentials technical specification 2.2](https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html) | Open technical standard; primary specification | Provenance records assertions about an asset’s origin/changes and can be tamper-evident. The specification explicitly avoids judging whether provenance data is “good” or “bad.” | Supports the book’s required distinction: provenance can establish an origin/change trail without proving the depicted or asserted claim is true. | Recheck on C2PA specification version change; otherwise annually. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | W3C Recommendation; primary web standard | Relevant AA requirements include reflow at 320 CSS px, visible keyboard focus, meaningful sequence/relationships, descriptive headings/labels, non-text contrast and minimum target sizing. | Defines the rendered reader/interaction accessibility acceptance floor. | Recheck on W3C Recommendation/errata change. |

## Research limits

- Provider documentation establishes what a provider says its current feature
  does. It does not independently establish comparative accuracy or fitness for
  a user’s specific claim.
- Search, retrieval and grounding can improve access to relevant/current
  material; a retrieved source can still be weak, stale, inapplicable or
  misrepresented.
- A citation is a pointer. Verification additionally requires source identity,
  scope, date, support and, when stakes warrant, independent corroboration.
- Provenance can make an origin/edit trail inspectable or tamper-evident. It
  is not a truth score.
- The current Episode 3 empirical/news examples were inventoried but not
  re-certified in this bounded packet. No such example may enter the durable
  book without its own claim-level evidence row and freshness ruling.
