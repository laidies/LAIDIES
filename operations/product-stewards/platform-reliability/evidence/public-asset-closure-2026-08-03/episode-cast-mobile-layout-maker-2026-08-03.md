# Episode cast mobile layout — maker receipt

**Status:** `VERIFIED LOCALLY — INDEPENDENT JUDGMENT REQUIRED`

## Scope

This is the smallest shared-CSS repair for the exact mobile clipping found by
the cast-held-portrait judge. At `<=640px`, an issue cast changes from a
horizontally scrolling flex strip into a two-column grid. It preserves the
already-completed held-portrait source narrowing and does not alter issue
HTML, cast names, roles, LUMINAiRY links, images, registry, inventory,
manifest, deployment, publication, or release state.

Desktop remains the existing deliberate horizontal gallery. The mobile grid is
only for the 390px and 320px visitor surfaces where a horizontal strip hid
most of the cast offscreen.

## Exact candidate

| Artifact | SHA-256 |
| --- | --- |
| `content/issue-feature-v2.css` | `19db868252ac50578160d59475a5fe6fc7d66954c6e0e44ec77b6d653aedd398` |
| `scripts/test-issue-cast-mobile-layout.mjs` | `1b8c1e220d287eb3d76b329e7d7a345a0fe3a30a80e9b9b3072d2c565017184b` |
| `issues/issue-01.html` (unchanged held-source candidate) | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` |
| `issues/issue-02.html` (unchanged held-source candidate) | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` |
| `issues/issue-03.html` (unchanged held-source candidate) | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` |
| `issues/issue-04.html` (unchanged held-source candidate) | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` |

## Exact change

Inside the existing `@media (max-width: 640px)` block, `.issue-feature
.cast-grid` now has `display:grid`, `grid-template-columns:repeat(2,
minmax(0,1fr))`, `gap:20px 14px`, `overflow:visible`, no bottom scroller
padding, and `scroll-snap-type:none`. `.issue-feature .cast-card` now has
`flex:none` and zero right padding at that breakpoint.

This overrides the feature stylesheet's higher-specificity desktop gallery
selector; the former generic mobile grid declarations in individual issue
files could not do that.

## Local verification

- `PLAYWRIGHT_CORE_PATH=… node scripts/test-issue-cast-mobile-layout.mjs` —
  PASS for Issues 01–04 at 1440, 390 and 320px. At 390/320 every cast card
  had a nonzero box fully inside the viewport; all routes had no document
  horizontal overflow. At 1440 the existing cast gallery remained rendered
  with no document overflow.
- The same test calibrates against an injected legacy mobile flex-strip rule:
  all four routes reproduce fewer fully visible cards than total cards at
  390px. The test therefore rejects the defect it is meant to prevent.
- `PLAYWRIGHT_CORE_PATH=… node scripts/test-issue-04-inline-ada-card.mjs` —
  PASS at 1440, 390 and 320px; Ada remains a semantic inline held card and a
  visible held cast card, with no Ada image request or page overflow.
- `node scripts/test-screening-room-contract.mjs` — PASS; it truthfully keeps
  the pre-existing title/media HOLDs.
- `node scripts/test-active-asset-admission.mjs` — PASS.
- `git diff --check -- content/issue-feature-v2.css scripts/test-issue-cast-mobile-layout.mjs` — PASS.

## Remaining limitations

This receipt does not resolve the judge's separate full-file scope concern:
the issue HTML candidates contain pre-existing unrelated work. The requested
independent judgment must bind this CSS-only successor to the held-portrait
candidate hashes above rather than treat all prior issue-file changes as a
single atomic cast fix. Public-asset closure, media/title delivery,
deployment, release, and public verification remain held.
