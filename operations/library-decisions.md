# The LIBRAiRY — active instruction packet

**Status:** CURRENT PAGE ROUTER
**Owner:** Library product steward
**Effective date:** 2026-08-22
**Supersedes:** older Library visual/public-framing instructions where they conflict

This compact packet contains only current page-wide overrides, routing, active assets and prohibited regressions. Do not load historical design packets unless a routed current packet names one.

## Current page-wide decisions

- Preserve the bright, bold pop-art energy, the established semantic teaching-box colours, physical entering-the-building idea and selected-book preview.
- Use the vibrant production tokens already established in `library.html`: midnight `#070f2b`, ink `#11183b`, pink `#f254a9`, purple `#7137d6`, cyan `#15bce0`, cobalt `#2457e6`, sky `#78c7ff`, coral `#ff7366`, orange `#ff9b3d`, lime `#b7e42b`, mint `#7de2c2` and cream `#fffdfb`. Use saturated gradients, halftone/pop-art texture, ink keylines, hard offset shadows and layered editorial framing. Yellow is not an active Library colour; do not recolour everything blue or purple.
- Use Ali's 2026-08-23 wide masthead crop reference: the full curved desk and all of Miss Jeeves, both public computers, staircase/shelves and a useful band of geometric carpet remain visible. Preserve the image's natural aspect ratio at every viewport; `object-fit: cover` and fixed-height crops are prohibited because they cut off Miss Jeeves's head. Its painted walls use the light blue-cyan from the Ask Miss Jeeves palette (`#65d1e3` target), not pink, neon blue or dark teal. Do not add a black inset/frame. Preserve the established Library title treatment exactly; do not add a later masthead-specific title-colour override. Keep title and navigation as deterministic live UI.
- The top orientation panel is compact, not a second hero. At compact-desktop/tablet widths it keeps title and orientation copy side by side with reduced padding and gap; it stacks only at phone widths. Do not carry desktop title size, 50px-plus gaps or large empty padding into the stacked layout.
- Public choices are **Ask Miss Jeeves** and **Browse all books**. The visible browse heading is exactly **Browse all books**—not “Browse all four books,” “Browse the books,” “Browse the shelves” or “Catalogue.”
- Reference Desk and Browse must have different composition, weight and direction.
- Launch with four large individual book-cover images directly beneath **Browse all books**, where the three collection boxes previously sat. Do not place them inside a bookshelf, shelf case, library-wall mockup or book wallpaper; the bookshelf approach was explicitly rejected as visually bad. Do not show 101s/Tools/Reference as separate choices until inventory growth makes them useful. Keep collection type only as searchable metadata and a Miss Jeeves result label. The four covers remain prominent and identifiable rather than shrinking to thumbnails.
- All four launch books remain visible together. Search titles and topics gets a generous unclipped writing area at desktop and mobile sizes; results appear only after a search/topic choice.
- One cover opens one adjacent preview with job, contents, depth, currentness and truthful availability. Back restores the initiating control and position. **Open this book** appears only when admitted.
- Mount the canonical visible shared header. A loaded script, hidden return or hover-only control is not navigation.
- Prompting is one beginner entry point within the broader work of providing and managing task, audience, sources, constraints, examples, tools, history and maintained context. Do not teach magic words.
- The four opening books may ship with a selected set of accepted visuals; rejected or failed visuals stay out and may be added only through a later admitted update.
- Opening-day book admission requires exact-source and rendered-artifact binding, current claim/source review, artifact-first instructional and usability review, correction readiness, responsive/accessibility journeys, Ali approval, release and public-origin verification. A paid or formal unfamiliar-reader study is not an opening-day requirement (Ali, 2026-08-23). Internal simulated-reader or browser audits must identify themselves truthfully and may never be labelled observed-human evidence.
- Miss Jeeves gives a short current evidence-bound answer and grouped exact learning routes; she states no coverage honestly. Suggested questions must resolve. Browser-hardcoded answers are not a second authority.
- Miss Jeeves displays a compact row of genuinely common example questions. “How do I write a better prompt?” and other prompt-first shortcuts are rejected. Every visible example must be tested against a governed exact route; selecting it submits the question through the same backend as typed input. Examples never carry browser-hardcoded answers or a client-side fallback index.
- Topic demand separates “we have it but people cannot find it” from “we need coverage.” Passive records use controlled IDs only; explicit requests alone may store disclosed visitor text. Popularity never creates a promise or publication.
- The public Miss Jeeves answer path uses the governed catalogue first, then Cloudflare Workers AI only to interpret and summarize those supplied records. The production model is `@cf/meta/llama-3.1-8b-instruct-fp8-fast` in structured-JSON mode; any provider, format or capacity failure falls back to deterministic retrieval instead of breaking the answer or inventing from model memory.
- A visitor may explicitly consent to submit an uncovered topic. That separate path issues a public receipt and status reference, stores the elected wording in the encrypted D1 payload vault for 30 days, retains only an HMAC-keyed duplicate digest and controlled topic/placement metadata outside the vault, and supports editorial `reviewing`, `planned`, `answered` or `declined` states. It never creates a public promise or publication automatically.
- Passive Miss Jeeves outcome/result-open collection remains off until the production Analytics Engine binding can be deployed and verified. The endpoint returns `measurement_off` truthfully; raw questions are never a passive signal.
- Puffy saves preserve whole-book versus exact-section scope. The first save attempt owns the Resident Card explanation; My Closet remains in the Sorority House.
- Mobile explanation precedes what it explains; controls, covers and text remain readable without horizontal overflow. Desktop and mobile require real browser inspection.

## Route by task

- Page purpose/boundaries: `operations/product-stewards/library/CHARTER.md` and `operations/product-stewards/library/EXPERIENCE-BRIEF.md`.
- Journeys/dependencies: `operations/product-stewards/library/FUNCTIONALITY-MAP.md`.
- Page visual implementation: `operations/product-stewards/library/BUILD-PACKET-LIBRARY-PAGE-ELEVATION-2026-08-22.md`.
- Book reading/teaching behavior: `operations/product-stewards/library/BOOK-EXPERIENCE-CONTRACT-2026-08-22.md`, plus the exact book source and admission records routed by `operations/DECISIONS.md`.
- Miss Jeeves: `operations/product-stewards/library/subproducts/miss-jeeves.md` and its current build packet.
- Cross-product or later decisions: `operations/DECISIONS.md`.

## Current implementation assets

- Masthead: `assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-wide-jeeves-blue-walls-v3.png`
- Large individual covers: `assets/library-101/bright-family-v2/textbook-ai-fundamentals-101.png`; `assets/library-101/bright-family-v2/textbook-working-with-ai-101.png`; `assets/library-101/bright-family-v2/book-straight-answers-about-ai.png`; `assets/library-101/bright-family-v2/book-ai-dictionary.png`
- Shelf wall, floor and case assets are not active inputs for the four-book browse presentation.

## Release boundary

Ali authorized the owner-corrected page and Miss Jeeves backend for production on 2026-08-23. Current production is source `e2b6f1a172893ff28609d474b3fec846f2d99ca6`, artifact `3e0578d2fc592e7aa63e34858aeae744f181806dd9aa1196b355c07150bd5b4c` and deployment `136bbe5a-e974-4225-80f2-70da06b9541a`; the immutable deployment and `laidies.ai` passed exact-byte and live-service verification on 2026-08-24 UTC. Any visual successor still requires Ali's direct exact-candidate approval. Book admission remains separate. A local page, integrity receipt, checker pass or HTTP 200 is not publication.

## Prohibited active inputs

Rejected page identities `615a80f7…dab` and `7d4d01f4…c7c9` remain excluded; `db924c0d…bd6e` is a protected baseline, not approval.
Rejected exploration identities retained by hash only: `46185b93…7f3d`, `db5e59cd…6972`, `ccb390bd…b536`, `dda48deb…8fb72`, `057714da…9bb`, `621549b4…5632`, `57b889a9…8d45`. Their bytes are available in Git history, not the active tree.

```banned
101-shelf-kit.png
tools-shelf-kit.png
reference-shelf-kit.png
library-shelf-unit-5-shelf-upright
library-aisle-backdrop-v1.png
bk-status
shelf-pages
library-handback
arrival-prop
library-interior-purple-sign-wall-v6-metal-stacks.png
library-interior-purple-sign-wall-v5.png
library-interior-purple-sign-wall-v7-clean-metal-stacks.png
library-wall-case-2bay-clean-v1.png
commit:75dc0f97
```
