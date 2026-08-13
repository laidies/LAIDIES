# NewsStand v26 exact deployed-pixel maker inspection

**Inspected:** 2026-08-13 12:00 PDT
**Maker verdict:** `READY_FOR_ROLE_DISTINCT_DEPLOYED_PIXEL_REVIEW`
**Scope:** protected private direction review only; not production admission or publication

## Exact identity

- GitHub Actions run: `31732984877`
- Controller commit: `1656abafcbd9144964d9a68282a72a451d4a1b4b`
- Candidate commit: `7862ae1a4ec07964b27d1c9456c0a5bd17b7e831`
- Complete Daily package: `operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v5.json`
- Package SHA-256: `19db95ab57fd4fdf96aab24010d8efca8deb534fee80ebd30d93a1869a972532`
- Cloudflare deployment: `e063c8b8-b2ed-4da9-abc4-06f248992cd3`
- Artifact identity: `6fe7179b28c3b8099ce89f88cdbeaee2f84c5b08ea3dd3988bb77b9125e0b088`
- Preview receipt SHA-256: `2546f477e96a7476897147cedc9e150f10623c4b3555adfa0bbddccd42d699d4`
- Temporary Access service token: revoked before artifact upload

`node scripts/check-newsstand-exact-preview.mjs` passes the copied deployed
receipt. The deployed page, three content records and three self-hosted font
files returned HTTP 200 and byte-matched the artifact manifest. Each viewport
recorded one loaded Anton face, upright and italic Jost, with `document.fonts`
ready. Those facts prove transport and font loading; the findings below come
from opening all nine deployed PNGs at original resolution.

## Artifact-first visual findings

| State | 1440 | 390 | 320 | Maker finding |
|---|---|---|---|---|
| Continuous page | `0484fa9e9a8a406ea5a9a32f77814d90238a4434e1f4fb45623f105fa88798a6` | `f9ce3ff98fe0c36f30267859355b5d182d12a0edb677f57e608e978e4bb235cd` | `9662baf04a70ce2c8c4fc01b6733d99952d10fb2492ce6c497948018012b592d` | Daily, Catch Me Up and archive/search remain distinct. No repeated newspaper, runaway blank field, overlap, missing footer or missing action was found. |
| Daily newspaper | `b7e6acdcf7ad6704c53143350e0a85dff6a696ad3feb98f7dd0f1be138aae1db` | `1aaf633cd2b7e64dfa15a6acbd05a2d6e67082b371feb9edbcb5cbea8b22532b` | `909ebcd3d12b7edd96bce07c74c62af8636f7deaccbbae2a12489b91ba81d92a` | The lead remains dominant. All four desks remain a compact right rail on desktop and an explicitly labelled horizontal swipe row on mobile. The Career desk remains visually distinct from Paige's AI tip. |
| Full article | `c4b2e7fcc1d06f2170189c4bc792753540dee9b0940e48ff89fe899505a878cd` | `a7dade78981697b665d95228eb2a0fc1c8cdc0b77d5cdc3746e84a5263483229` | `1befe7974cd20f4f59701969e09165abd665576500118cffbac866fc63cadfff` | The six-section explanation remains ordered and readable. Headings, evidence limits, work/home examples, action and sources are present without clipping or false column recomposition. |

Observed at all three widths:

- the rejected deployed-v25 generic-font defect is not reproduced: the Daily
  masthead, lead headline, four service headlines and article section heads use
  the intended condensed newspaper display treatment;
- no horizontal page overflow, text collision, clipped story copy, broken image
  or missing desk was found;
- mobile preserves the deliberate partial-next-card treatment and the visible
  `Swipe for all four` instruction instead of stacking four long cards;
- the private-review banner overlaps the top edge of element-cropped newspaper
  and article captures. Complete-page captures show the actual page hierarchy.
  The banner is access-review chrome and is absent from the production source;
- the 320-pixel page is dense but retains every navigation choice, primary
  action, article section and archive/search control;
- the Career desk remains the compact rail's density ceiling. A successor issue
  must not make it longer.

## Maker boundary

No visible known or objective defect remains in these exact deployed pixels.
This maker inspection does not admit the package, approve its editorial choices,
authorize production promotion or establish public truth. A role-distinct judge
must inspect the same nine SHA-bound images before Ali sees the direction.
