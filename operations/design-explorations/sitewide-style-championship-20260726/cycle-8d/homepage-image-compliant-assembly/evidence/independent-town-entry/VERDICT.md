# Cycle 8D independent Town Entry admission verdict

**Verdict: HOLD**

**Evidence time:** 2026-07-27 11:56 PDT  
**Reviewer scope:** technical/product admission only. This verdict grants no Ali,
integration, deployment, publication, or Brand authority.

## Binding examined

- Submitted manifest SHA-256:
  `139f4c432e9e67e30b984fffd3ce5605a9a7938a8530c5f3679eb8c499176c61`
- Control Room brief hash: `fa480c6442744619bd34486ff5be028aacc98bcca4d245bcc55f60fc6714d9c2`
- Actual Town Entry image/duplication register hash:
  `9832d3ad9c6f6395a74ca42c01ce02ed7a389397982cca5cb47efc00bfa4f8d7`
- Artwork source/job register hash:
  `e6d003f7ba239bac135f366a9962dbf216881ec60083d206da4b8957b7590059`

## Independent findings

| Gate | Score | Result | Evidence |
| --- | ---: | --- | --- |
| Frozen sources, admitted artwork and render/crop/diagnostic hashes | 20/20 | PASS | Every manifest-listed local candidate source, admitted artwork, render, crop and diagnostic artifact matched its declared SHA-256. The three admitted images match their named jobs and the rejected FAiRY scene is absent. |
| Governing-source binding | 0/20 | HOLD | `binding-manifest.json` locates the Town Entry register at `../../../product-stewards/...` from the tuple directory. That resolves to `operations/design-explorations/product-stewards/...`, which does not exist. Its declared hash matches the real register only at `../../../../product-stewards/...`; the sealed manifest therefore cannot reproduce one of its required governing bindings. |
| Masthead, copy, IA, href, route and runtime parity | 19/20 | CONDITIONAL | The submitted diagnostics report all parity checks true, identical masthead desktop/mobile crops, zero errors, no overflow, and successful activity filter/map popup/mobile-menu checks. Source diff limits content changes to registered image presentation plus candidate CSS. A fresh live browser rerun was not available in this sandbox; it does not cure the failed binding gate. |
| Image/duplicate contract and product truth | 12/20 | HOLD | Candidate DOM retains the masthead source three times, Chick Flicks/Jeeves/Lantern Hill twice each, hiding the surplus nodes with `.register-nonimage { display: none !important; }`. The source/job register's automatic hold is `any second use of the masthead image`; the maker claim that all 26 images are visible/no image is hidden is contradicted by the candidate source. In addition, Dream Phone and NewsStand incumbent art remain visible with no owner-verification evidence bound into the tuple; the source/job register lists that as an automatic hold. |
| Full-page desktop/mobile visual evidence, contrast and artwork clearance | 19/20 | CONDITIONAL | Inspected submitted 1440×900 and 390×844 full-page comparisons and all named crops. The candidate retains the masthead and all three admitted artworks are readable at both sizes. Submitted descendant audits cover 299 desktop and 267 mobile descendants with zero failures; submitted obstruction and overflow checks pass. This evidence cannot compensate for the binding/duplicate admission failures. |

## Required correction before a new admission attempt

Issue a new exact Control Room brief and re-seal a new tuple that: (1) fixes the
Town Entry register path in the manifest and binds the resulting manifest hash;
(2) removes rather than CSS-hides prohibited duplicate image consumers, while
preserving only the explicitly required parity contract; and (3) supplies
owner-verification/held-treatment authority for the retained Dream Phone and
NewsStand art or removes those image uses. Re-capture and independently rerun
the diagnostics against that new sealed tuple.

## Scope truth

This is failed local evidence, not a repair instruction for this frozen tuple,
an integration decision, or a public/product release statement.

**Verdict payload SHA-256:** `079e31435d865f43227bab2d03289ba7f5293c3005d39e975ea30fb050d855b4`  
**Hash rule:** SHA-256 of this file with the `Verdict payload SHA-256` line
omitted, after its final newline.
