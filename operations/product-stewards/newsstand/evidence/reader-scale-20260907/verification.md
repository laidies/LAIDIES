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

Pending deployment. Record the exact provider deployment, immutable origin, custom-origin checks and public hashes here after release.
