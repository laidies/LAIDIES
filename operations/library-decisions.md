# The LIBRAiRY — active instruction packet

**Status:** CURRENT PAGE ROUTER
**Owner:** Library product steward
**Effective date:** 2026-08-22
**Supersedes:** older Library visual/public-framing instructions where they conflict

This compact packet contains only current page-wide overrides, routing, active assets and prohibited regressions. Do not load historical design packets unless a routed current packet names one.

## Current page-wide decisions

- Preserve the bright, bold pop-art energy, the established semantic teaching-box colours, physical entering-the-building idea and selected-book preview.
- Use the vibrant production tokens already established in `library.html`: midnight `#070f2b`, ink `#11183b`, pink `#f254a9`, purple `#7137d6`, cyan `#15bce0`, cobalt `#2457e6`, sky `#78c7ff`, coral `#ff7366`, orange `#ff9b3d`, lime `#b7e42b`, mint `#7de2c2` and cream `#fffdfb`. Use saturated gradients, halftone/pop-art texture, ink keylines, hard offset shadows and layered editorial framing. Yellow is not an active Library colour; do not recolour everything blue or purple.
- Preserve the approved top Library masthead composition and its established backgrounds. Do not crop further into the Library image, replace its backgrounds, add a black inset/frame inside it or otherwise redesign that locked top. Any future size or spacing adjustment must leave those approved pixels/composition intact and requires Ali's direct approval on the exact candidate. Keep title and navigation as deterministic live UI.
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
- Miss Jeeves does not display canned example-question chips. In particular, “how do I write a better prompt?” and other prompt-first shortcuts are rejected. The input invites the visitor to ask her own ordinary-language question; every answer and route comes through the governed service, never a browser-hardcoded answer table or client-side fallback index.
- Topic demand separates “we have it but people cannot find it” from “we need coverage.” Passive records use controlled IDs only; explicit requests alone may store disclosed visitor text. Popularity never creates a promise or publication.
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

- Masthead: `assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png`
- Large individual covers: `assets/library-101/bright-family-v2/textbook-ai-fundamentals-101.png`; `assets/library-101/bright-family-v2/textbook-working-with-ai-101.png`; `assets/library-101/bright-family-v2/book-straight-answers-about-ai.png`; `assets/library-101/bright-family-v2/book-ai-dictionary.png`
- Shelf wall, floor and case assets are not active inputs for the four-book browse presentation.

## Release boundary

Ali reviews and directly approves the exact visible page candidate after maker function/accessibility/responsive checks. An internal maker or independent `ADMIT` verdict cannot substitute for Ali's visual approval and cannot authorize deployment. Book admission remains separate. A local page, integrity receipt, checker pass or HTTP 200 is not publication; release requires Ali's exact-candidate approval, exact build, deployment and custom-domain verification.

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
