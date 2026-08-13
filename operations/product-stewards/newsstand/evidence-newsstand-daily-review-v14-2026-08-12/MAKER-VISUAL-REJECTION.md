# NewsStand complete Daily v14 — maker visual rejection

Status: `REJECTED_DO_NOT_PRESENT_OR_DEPLOY`

The earlier `ADMIT_PRIVATE_DIRECTION_REVIEW` verdict is invalid. A direct maker inspection of the exact rendered pixels found defects that should have stopped the candidate before independent review.

## Exact rejected package

- Package: `operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v1.json`
- SHA-256: `722fb3388fb1d11c3b99d1fafae9f6b3a05345be0d428543764603d49aa858cc`

## Exact rejected pixels

- `daily-review-default-1440.png` — SHA-256 `a8d37b83b833b58d4d79048471a06b630b2820853012e6bf17ee4947f86fa601`
- `daily-review-default-390.png` — SHA-256 `4ddebdba0f635c068483671256d07047520455e7e401052e39f8ccc23385e73a`
- `daily-review-default-320.png` — SHA-256 `2498f028eb89721014e1df65256d8d98f397c280d20dc3f4118880e9688230b0`
- `daily-review-article-1440.png` — SHA-256 `d052702006d167fc831c3a670f8c190b90c6b326b631821a930cfcd6130f4345`
- `daily-review-article-390.png` — SHA-256 `35efac344b05fe92712a3f232a453402fe11f5d8c9cf253f5e351c9b1962aa66`
- `daily-review-article-320.png` — SHA-256 `70efcc6baf2dffde84bc0ee60560c58e950468612b6b5f36e59aaa6586792517`

## Visible defects

1. The newspaper exposed production-system language to visitors: `Filed in this edition`, counts of desks that stayed quiet, a `desk-by-desk record`, and the claim that every empty space was honest.
2. Empty internal desk records became a long stack of boxes, especially on mobile. They were operational state, not useful newspaper content.
3. Repeated status labels overwhelmed the actual story and made the page read like a dashboard rather than a Daily newspaper.
4. The rendered Daily did not provide a clear within-paper route to The Weekly, The Big Picture, archive search or related topics.

## Prevention

The producer must render only admitted items, use at most one compact visitor-facing note for a brief edition, and expose clear Daily/Weekly/Big Picture/archive/topic routes. `scripts/check-newsstand-daily-visitor-copy.mjs` rejects the exact known-bad phrases and empty-desk rendering pattern before screenshots or review.

This rejection supplies no authority for a successor. A successor requires new exact pixels, maker inspection and role-distinct visual review.
