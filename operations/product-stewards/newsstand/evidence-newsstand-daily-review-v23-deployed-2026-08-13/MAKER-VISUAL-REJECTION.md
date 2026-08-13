# NewsStand complete Daily v23 deployed-preview maker rejection

Status: `REJECTED_DO_NOT_PRESENT_OR_DEPLOY`

The earlier private visual admission and maker inspection are invalid. They
judged cropped local issue/article elements. The first exact protected
deployment exposed the complete visitor page after the public build transform,
including navigation that those reviews did not inspect.

## Exact rejected package and deployment

- Source commit: `d25730541b07e3c4b0639536291f0a6afd60e2d9`
- Package: `operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v2.json`
- Package SHA-256: `331fce79e55cdeaf86597342aac9ffb0ab8ff383b37e423e8814fdfdd07f4ae0`
- Protected deployment: `6ecdfbd1-95aa-4590-8245-763c939f6e01`
- GitHub Actions run: `31700571827`
- Exact review URL: `https://6ecdfbd1.laidies-sunnyvaile-preview.pages.dev/newsstand?daily=2026-08-12`
- Temporary Access service token: revoked after capture

## Exact deployed pixels inspected

| State | Dimensions | SHA-256 |
|---|---:|---|
| Desktop complete page | 1440 × 5585 | `747e9f5bb58ddf58d3fa0b1cd5f696f3a77161ccf423787d955e4d45120e9158` |
| Desktop Daily newspaper | 1318 × 2031 | `f02e6026a216057a26f66f5b8f402d056e7d48938c5ef2f9e9a44fa202d4554c` |
| Desktop article | 1040 × 3981 | `425065b4ce62570a28d18ee347d469316198dfffa007549470a552b9b74285cf` |
| 390 complete page | 390 × 7242 | `5c3c685d96bce43689534f42972e4d39610b00ac3608929c6e9efbf0b2854403` |
| 390 Daily newspaper | 374 × 3443 | `a724b7d177fd59fee24421095d051f880455a93b2c5759687d4cc4cbf277f55e` |
| 390 article | 374 × 4501 | `42e1cf2d71ef9323ada10dd4a36981744e0123c296e632aef4127014a80da2ea` |
| 320 complete page | 320 × 8934 | `e7239d1e1311459d157f1f2f30d821fbecf42d200973a431ddee897c845141f5` |
| 320 Daily newspaper | 304 × 3887 | `1c6b1e9a3a7408960d5e895e3ce0b85d3d39578bb3309a99026afb25c270f88e` |
| 320 article | 304 × 5312 | `49b1bbf60996aa008ddeba35e40f10058ee66315ac4132fa22b707a2e8c452bc` |

## Visible blocking defects

1. The route opened with a NewsStand building header and three-paper rack, then
   repeated Daily/Weekly/Big Picture/Archive navigation inside the Daily. The
   newspaper was not the page-level arrival despite the locked Daily-first rule.
2. The exact 390 and 320 complete pages were 7,242 and 8,934 pixels tall. The
   service desks became a vertical app-card stack rather than the newspaper side
   column Ali described.
3. The 390 and 320 lead headlines dominated the narrow page and delayed the
   answer, interpretation and useful action.
4. The long article used large alternating pastel section rectangles. It read
   as stacked content boxes rather than one edited newspaper article.
5. The public build injected the shared `SUNNYVAiLE home` rail. On mobile its
   fixed pill covered the lead headline and later article copy while scrolling.
6. The complete page lacked a strong continuous newspaper composition even
   though cropped issue elements had passed the earlier role-distinct review.

## Invalidated evidence

- `operations/product-stewards/newsstand/evidence-ai-work-logs-daily-render-v21-2026-08-13/MAKER-INSPECTION.md`
  SHA-256 `bc94a5af5286c8c44a08479d02087ab3ee6e3a79fe107a81eb21448a2f0f8f91`
- `operations/product-stewards/newsstand/evidence-ai-work-logs-daily-render-v21-2026-08-13/independent-visual-review.md`
  SHA-256 `4f3c448f66054d58c73403c5109fe35fafdbf624cf35d180f88549445984e345`

Those files remain immutable failure evidence. They grant no continuing visual,
package, deployment or public authority.

## Prevention bound to the successor

- The Daily newspaper itself must be the one visible arrival while a paper is
  open; the fallback rack may appear only after the reader closes.
- The exact complete page, Daily element and article must be rendered at
  1440/390/320. Cropped element screenshots cannot admit a complete experience.
- The local representative browser test must include the same shared context
  navigation injected by the public build and reject any overlap with the
  newspaper or article.
- The exact four-desk Daily must use a real desktop side column and a bounded
  mobile newspaper rail rather than a vertical box stack.
- The known candidate is calibrated to fail duplicate-navigation, narrow-label,
  mobile-height and public-control-overlap guards before new pixels are reviewed.

This rejection supplies no authority for a successor. A successor requires new
exact pixels, maker inspection, role-distinct visual review and Ali's judgment
of the complete issue.
