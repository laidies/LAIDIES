# The Daily — AI work logs article maker inspection

**Observed:** 2026-08-12 14:00 America/Vancouver

**Status:** VERIFIED LOCALLY — INDEPENDENT SEMANTIC + VISUAL + HUMAN OBSERVATION REQUIRED

## Exact candidate

- exact prose: `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-exact-prose.md` — SHA-256 `89062033d142fbeb708b140da57eed588e9254be721916ff502b3041671b1fb9`
- held story record: `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-story-record-candidate.json` — SHA-256 `98855856153196dfc6a2ddf519fede1695dc356c766075527b67e07c12de3536`
- exact saved reader DOM: `operations/product-stewards/newsstand/evidence-ai-work-logs-daily-render-v1-2026-08-12/article-render.html` — SHA-256 `f46b12549e9b9ccd729b38268b2862ad5c34dc31826b97d4aa6191b5b9ce13d1`
- artifact manifest: `operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-manifest.json` — SHA-256 `32d113d6286e6a8d7ce7c9e13a1643e75f6c26eff60d2365298b14c96bfb5cb3`

## Exact pixels inspected

| Viewport | Evidence | SHA-256 | Maker observation |
|---|---|---|---|
| 1440 × 1000 | `daily-work-logs-candidate-1440.png` | `1d3aeb47b8e00f17207d3351d28a378bd47ced364650137b9b2acf8e076eda2a` | Newspaper identity, date, headline, deck and jump box form a clear hierarchy. The first render's headline dominated the page; the Daily-specific size repair reduced it without altering other publication types. |
| 390 × 844 | `daily-work-logs-candidate-390.png` | `08d4708eaa3bbb7c77bf1be52cbfea71732eded9f44105ab817e343e32b8db70` | No horizontal overflow. Headline occupies less than 48% of the viewport and remains readable as a headline rather than a full-screen poster. |
| 320 × 760 | `daily-work-logs-candidate-320.png` | `6d216fcc98cd3a395c43e602ec0bb2e167b9bcbb893f1d08e628ff896602cb48` | No horizontal overflow. The narrowest supported view preserves words, order, date and newspaper hierarchy without clipping. |

## Objective checks

- `node scripts/test-compile-newsstand-longform.mjs` — PASS: exact prose order preserved; Daily, Weekly and Big Question held records; two negative calibrations.
- `node scripts/test-newsstand-reader-contract.mjs` — PASS: ten state fixtures plus canonical edition, focus, ARIA and failure-state contracts.
- `NEWSSTAND_EVIDENCE_DIR=operations/product-stewards/newsstand/evidence-ai-work-logs-daily-render-v1-2026-08-12 NEWSSTAND_EVIDENCE_FILTER=daily-work-logs-candidate node scripts/test-newsstand-reader-browser.mjs` — PASS, including exact 1440/390/320 renders, full authored sections and sources, jump resolution, direct-route landing, Daily hierarchy hook, work/home transfer presence, headline viewport guard and horizontal-overflow guard.
- `node scripts/check-prose-quality-admission.mjs operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-2026-08-12-producer-self-review.json` — `PROSE QUALITY RECEIPT INTEGRITY MATCH verdict=PASS quality_authority=NONE`.
- `git diff --check` — PASS.

The headline guard was calibrated by the first exact render: that known-bad version consumed most of a phone viewport and failed maker inspection before this repair. This receipt does not turn that calibration into an independent design verdict.

## Boundary

This is maker inspection, not role-distinct semantic review, unfamiliar-human explain-back, visual admission, canonical issue admission, deployment or public verification. The candidate remains held. No public state changed.
