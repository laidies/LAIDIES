# NewsStand complete Daily v25 — maker pixel inspection

**Status:** `READY_FOR_ROLE_DISTINCT_VISUAL_REVIEW`

**Inspected:** 2026-08-13 07:05 PDT

**Scope:** exact local pixels after the Career / Work-Life exemplar replacement

## Calibration and changed risk

The v24 protected preview was visually admitted but editorially rejected before
Ali review because its Career / Work-Life item began with AI advice. V25 keeps
the admitted page and article layout and replaces that one desk with the
career-first `Share the win when it helps someone` candidate.

The changed visual risk is text fit: the new headline and opening must remain
legible in the desktop desk and the 390/320 horizontal service rail without
turning the compact newspaper desk into a stacked or clipped card.

## Exact inspected pixels

| Mode | Viewport | Exact file | SHA-256 |
|---|---:|---|---|
| Complete page | 1440 | `daily-review-full-page-1440.png` | `dad9675399851accb9252b219e35c2b3a38041939fed978c645fd83165d2d66d` |
| Complete page | 390 | `daily-review-full-page-390.png` | `d3e357f47d77cad0be9c35385d855d2a4302e3ec91c904e5ec649b7cc828932f` |
| Complete page | 320 | `daily-review-full-page-320.png` | `9422797fd9131478b61c5db82cd2f5e33cd958da5f4b453c3f8be72dc9f8b0ac` |
| Daily front | 1440 | `daily-review-default-1440.png` | `52b5f1db2c26b1a2d621201771f38988d917c27aac7a3dbdf136d37fe1f87ff5` |
| Daily front | 390 | `daily-review-default-390.png` | `58df7ef48b217d04836d46b150d3c393cd4e47d6ae4ad327a67312cd048fb66d` |
| Daily front | 320 | `daily-review-default-320.png` | `e15d4b3bccb35ede6ed8679391cc1ba8a27fb96fca698d6a82a864f4606e4398` |
| Full article | 1440 | `daily-review-article-1440.png` | `1d95ee038bac9a6968b7d0c9b03fc7a9430a4e4c08c30b3f9d2cd240b566e715` |
| Full article | 390 | `daily-review-article-390.png` | `dd1130c1e0e5d6543e722029a432d1d962b71573e69682f7e1eef1117e884257` |
| Full article | 320 | `daily-review-article-320.png` | `fe4a4027368b70d9b8166d00582522b2de3ec36b736d0275651c2609f49298e4` |

## Pixel findings

- Desktop remains one Daily newspaper: the lead story occupies the main column
  and all four service desks form one related editorial rail.
- The new Career headline wraps to two lines in its desktop desk and remains
  visibly subordinate to the lead story.
- Its opening says what the non-AI career situation is before the collapsed
  desk asks the reader to open the advice and AI connection.
- At 390 and 320, the desk system remains one bounded horizontal rail with a
  visible next-card edge and `Swipe for all four`; no service-card stack or
  document-level horizontal overflow appears.
- The new copy does not change the lead, article, Catch Me Up or archive
  hierarchy. The continuous article and single earned action callout remain.
- No clipped headline, overlapping text, covered control, unreadable colour
  combination or off-brand generic card grid was found.

## Executed browser evidence

`NEWSSTAND_EVIDENCE_DIR=operations/product-stewards/newsstand/evidence-newsstand-daily-review-v25-2026-08-13 NEWSSTAND_EVIDENCE_FILTER=daily-review node scripts/test-newsstand-reader-browser.mjs`

Result: `247 rendered checks` passed across route, history, source failure,
correction/retraction, focus, reduced-motion, zoom and 1440/390/320 candidate
states. This is functional evidence, not visual-quality authority.

## Authority boundary

Maker inspection does not admit the visual, content, template, issue, deploy or
public release. The exact nine pixels require role-distinct artifact-first
visual review. V24 remains editorially rejected and cannot be revived by this
layout continuity finding.
