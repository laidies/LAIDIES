# NewsStand reader-scale correction — 2026-09-07

## Defect reproduced

The live GPT-6 Astra article at `https://laidies.ai/newsstand#openai-gpt-6-astra-launch-2026-09-04` rendered as an oversized full-screen poster rather than a compact newspaper article. At a 1200px desktop viewport the computed values were:

- paper: 900px
- headline: 43.2px
- hero image: 560px
- body copy: 18.6px with 32.364px line height

The cause was a later, more-specific block in `content/newsstand-design.css` overriding the earlier reader cap. The defect affected the shared Daily, Weekly and Big Picture reader rather than only the Astra article.

## Bounded correction

- paper maximum: 820px
- headline maximum: 40px desktop and 32px at 720px or narrower
- hero-image maximum: 480px
- body copy: 16–17px with 1.62 line height
- story content measure: 680px

No article prose, story data, image asset, front-page layout or reader-routing JavaScript changed.

## Verification before release

- `node --check scripts/test-newsstand-reader-browser.mjs` — PASS
- `node scripts/test-newsstand-reader-browser.mjs --calibrate-reader-scale` — PASS; deliberately restored 1120px paper, 76px headline, 780px image and 21px copy was rejected
- `node scripts/test-newsstand-reader-browser.mjs --reader-scale-only` — PASS; current Daily and Big Picture on desktop, current Daily at 390px and 320px
- `node scripts/test-newsstand-reader-browser.mjs --zoom-200` — PASS in the existing 200% browser harness
- Direct browser inspection of the Astra article:
  - 1200px: 820px paper, 36px headline, 480px image, 16px body, no horizontal overflow
  - 390px: 390px paper, 30.42px headline, 354px image, 16px body, no horizontal overflow
  - 320px: 320px paper, 28px headline, 284px image, 16px body, no horizontal overflow

The broader reader suite still stops on an unrelated incumbent service-desk assertion: it expects all admitted current desks while the current page renders seven (`valid:false`, `ready:7`, `missing:[]`). This correction does not change service selection or content and does not claim that unrelated assertion passed.

## Public verification

Production deployment: `6b27e20a-a435-490b-8820-2051b7f37a84`

Immutable origin: `https://6b27e20a.laidies-sunnyvaile.pages.dev`

Deploy input: `/private/tmp/laidies-newsstand-reader-scale-20260907.LpmE9C`

Manifest: `/private/tmp/laidies-newsstand-reader-scale-20260907.LpmE9C.manifest.json`

Whole-artifact identity: `b52c20ce14af639aad7fb69eecb9ef6366d3243d8de62f7965c452bc92efa44f` (780 files; 853,112,785 bytes)

The provider head was rechecked immediately before deployment and remained `199e9833-40ec-449e-814d-916696310397`. The release-scope checker found exactly two modified public files: `content/newsstand-design.css` and `newsstand.html`. No files were added or removed.

Both the immutable origin and `https://laidies.ai` returned the candidate-manifest hashes for the two changed files and protected NewsStand stories/issues plus Homepage, LIBRAiRY and LUMINAiRY pages.

Observed on the live custom-domain Astra story:

- desktop 1200px: 820px paper, 36px headline, 480px image, 16px body, Back visible, no horizontal overflow
- phone 390px: 390px paper, 30.42px headline, 354px image, 16px body, Back visible, no horizontal overflow
- narrow phone 320px: 320px paper, 28px headline, 284px image, 16px body, Back visible, no horizontal overflow

The existing automated 200% browser harness passed before release. A fresh genuine native Safari 200% check of the deployed page was attempted but not completed because the Mac locked; it is not claimed as publicly verified.
