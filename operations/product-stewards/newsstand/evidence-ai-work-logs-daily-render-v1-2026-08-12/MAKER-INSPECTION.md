# The Daily — AI work logs article maker inspection

**Observed:** 2026-08-12 14:51 America/Vancouver

**Status:** VERIFIED LOCALLY — INDEPENDENT SEMANTIC + VISUAL PASS; HUMAN OBSERVATION REQUIRED

## Exact candidate

- exact prose: `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-exact-prose.md` — SHA-256 `c213f5a4bcb69d94755b215bfa2a9ded72a9a190c804d3b700247b09c67064d3`
- held story record: `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-story-record-candidate.json` — SHA-256 `59481df83c60405da7c225f2818797db92f60510f2694fdf59c1165e570e13e9`
- exact saved reader DOM: `operations/product-stewards/newsstand/evidence-ai-work-logs-daily-render-v1-2026-08-12/article-render.html` — SHA-256 `713379e65fcd2f6af484c67f6c5f9ce2775809fe3d8c7ecaa1cd482dafeb7501`
- artifact manifest: `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-manifest.json` — SHA-256 `1b693ea20bb82630380f1d1a47f64a4e2a0a289dcc7c66e1268f10109f76070e`

## Exact pixels inspected

| Viewport | Evidence | SHA-256 | Maker observation |
|---|---|---|---|
| 1440 × 1000 | `daily-work-logs-candidate-1440.png` | `0eb032e465b733a16ba00f37fbab9f5647fe6fa5689d7d011471a2d19e34bfa4` | Newspaper identity, date, headline, deck and jump box form a clear hierarchy. The repaired statistics did not create a visible hierarchy or overflow regression. |
| 390 × 844 | `daily-work-logs-candidate-390.png` | `6561fce7df780c25e99482a69bb5f95385f619c211064eef2ac3b84a98d93263` | No horizontal overflow. The full headline remains readable above the deck, with the paper identity and date visible before it. |
| 320 × 760 | `daily-work-logs-candidate-320.png` | `7a9f9f8373467ba269b5d8ffc664b52a9a92d1f266c6cc508474c384932dfe79` | No horizontal overflow. The narrowest supported view preserves every word, date and newspaper level; the five-line story headline is dense but remains legible and does not crowd out the deck's entry point. |

## Objective checks

- `node scripts/test-compile-newsstand-longform.mjs` — PASS: exact prose order preserved; Daily, Weekly and Big Question held records; two negative calibrations.
- `node scripts/test-newsstand-reader-contract.mjs` — PASS: ten state fixtures plus canonical edition, focus, ARIA and failure-state contracts.
- `NEWSSTAND_EVIDENCE_DIR=operations/product-stewards/newsstand/evidence-ai-work-logs-daily-render-v1-2026-08-12 NEWSSTAND_EVIDENCE_FILTER=daily-work-logs-candidate node scripts/test-newsstand-reader-browser.mjs` — PASS, including exact 1440/390/320 renders, full authored sections and sources, jump resolution, direct-route landing, Daily hierarchy hook, work/home transfer presence, headline viewport guard and horizontal-overflow guard.
- `node scripts/check-prose-quality-admission.mjs operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-producer-self-review.json` — `PROSE QUALITY RECEIPT INTEGRITY MATCH verdict=PASS quality_authority=NONE`.
- `git diff --check` — PASS.

The headline guard was calibrated by the first exact render: that known-bad version consumed most of a phone viewport and failed maker inspection before this repair. This receipt does not turn that calibration into an independent design verdict.

## Boundary

The exact prose has passed one role-distinct semantic judgment, recorded in `independent-semantic-judgment-v2-pass.json`; that judgment does not supply visual or human-observation authority. This is maker visual inspection, not independent visual admission, unfamiliar-human explain-back, canonical issue admission, deployment or public verification. The candidate remains held. No public state changed.
