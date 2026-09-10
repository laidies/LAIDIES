# Women feature heading contrast — 2026-09-10

Status: VERIFIED PUBLICLY. Source commit 348cd54d (pushed). Production f9f53b6f-2496-485b-b4df-cbd473e82e7b. Receiving production cba636cb-b9a4-4f88-bd9e-7cdc53230356.

## Exact change

Only the main “Meet the women behind AI and get inspired to help shape the future.” heading changes from coral to the existing darkest navy token, --hp-midnight #070f2b. Wording, Jost, font size/weight, geometry, responsive layout, artwork, links and both separately approved pink subheadings are unchanged. Root index.html receives the same scoped rule for future continuation, but its broader pending content is not the deploy source. The release index.html beside this record is current production plus exactly four style lines.

## Verification

Maker viewed actual phone/desktop renders and measured seven widths: 390, 768, 960, 1050, 1051, 1440, 1920px. No horizontal overflow. Exact heading text, size, weight and geometry retained, two pink subheadings retained. Pixel luminance at fully rendered glyph interiors gives minimum contrast 3.015–5.041:1 for this large bold heading versus 1.091–1.831:1 for the rejected coral. Full background rectangles include darker pattern pixels outside glyph positions; minimum across the entire rectangle at 1051 is 2.985:1. The rejected incumbent calibrates the glyph contrast check; it fails all seven widths. These measurements do not claim whole-page accessibility.

Independent read-only Terra / Medium reviewer release_preservation_review inspected matched incumbent/candidate rendered screenshots first, then exact diff and measurements. ACCEPT: heading plainly readable at 390/960/1440, no visible regression and no changed artwork/geometry. One independent review cycle.

## Release preservation

Stage: /private/tmp/laidies-women-heading-20260910/stage. Preserve all receiving provider paths except /index.html with the established manifest-preserving deployment tool. The current NewsStand release record binds receiving production to /private/tmp/laidies-newsstand-reader-density.cukepW; its index exactly matches the browser-captured baseline. Worker and redirects copied from that exact artifact, with hashes:

- _worker.js: 397e39d596d63a54a4cb82f42c569899d28a0f6ad540a743d2575b0b0a26b4b9
- _redirects: ecbf4666c1cfbd4a9715a72a10f3d4af7a6af45b86579ffae83cb9f3314557ff

Candidate index SHA-256: `e461bb837ad273ce00c7468b83f82515da439001e535fcc7e77933444d27b9ac`.

The remaining Resident Card explanation/feature reconciliation is not part of this color correction and remains unfinished. No new copy, artwork, account behavior or other route changes are included.

## Public verification

Live: https://laidies.ai/#why-laidies-title
Immutable: https://f9f53b6f.laidies-sunnyvaile.pages.dev/#why-laidies-title

Custom and immutable origins each returned the exact admitted HTML and passed real Chrome browser checks at390/960/1440: heading #070f2b, Jost700 retained, two subheadings #f254a9, correct responsive columns/footer, decoded original image and no horizontal overflow. Custom phone and middle-width screenshots were visually inspected. Provider canonical head is f9f53b6f; all783 static keys retained, only /index.html changed,782 identities preserved, including the current NewsStand and Chick Flicks files. Current worker/redirects retained byte-for-byte from the receiving release artifact. No native Safari, whole-site audit or signed-in lifecycle test was performed for this color-only correction.
