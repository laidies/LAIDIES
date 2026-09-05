# LUMINAiRY complete-profile release candidate — 2026-09-05

## Verdict

`LOCAL RELEASE CANDIDATE COMPLETE / 43 OF 43 RESOLVED / 0 CONTENT OR IMAGE HOLDS / NOT DEPLOYED`

This candidate completes the visitor-facing LUMINAiRY page in the assigned owner branch. It does not claim a public release.

Implementation commit: `49c2277d166922302935b83f96802fcb6d01a1f0` on `feature/luminairy-card-profile-20260905`.

## Coverage ledger

| Wing | Required | Complete | Image | Deep profile | Song or destination state | Holds |
|---|---:|---:|---:|---:|---:|---:|
| PATRON SAiNTS | 13 | 13 | 13 | 13 | 12 songs available; Carrie explicitly deferred | 0 |
| MAiVENS | 23 | 23 | 23 | 23 | all applicable typed destinations rendered | 0 |
| TRAiLBLAZERS | 7 | 7 | 7 | 7 | all applicable typed destinations rendered | 0 |
| **Total** | **43** | **43** | **43** | **43** | **108 Read/Watch/Listen/Follow destinations** | **0** |

Every complete profile contains a reason for inclusion, two-part contribution, distinct LAiDIES move, workplace exercise and explicit boundary. Archive covers contain only image, role and name.

## Visual release set

- PATRON SAiNTS: `assets/saints/y2k-stained-glass-v13-luminous-comic/` — bright electric-pink stained glass.
- Regina George: red-orange anti-saint variant inside the Patron family.
- MAiVENS: `assets/mavens/y2k-stained-glass-v6-luminous-comic/` — luminous sapphire stained glass.
- TRAiLBLAZERS: `assets/trailblazers/y2k-stained-glass-v1-luminous-comic/` — luminous golden-amber stained glass.
- Cher + Dionne retain the exact approved V12 pixels at SHA-256 `c675af16c8584950f897433debd0c9136d6aa8a89971f241444dfa33d7c5440e` in the current Patron path.
- The deny-by-default artwork boundary finds `43` approved-family mappings and `0` LUMINAiRY mappings to temporary retired artwork.

The active portraits use one wing-specific background family, waist-up editorial-comic rendering and person-specific likeness evidence. Ada Lovelace, Lynn Conway, Mira Murati and Allie K. Miller received new reference-bound likeness repairs; Hedy Lamarr and Amanda Askell received edge cleanup. The independent visual re-review returned PASS for the four held likenesses after repair.

## Content and signed admission

- Profile data: `content/luminairy-profiles.json`, SHA-256 `d59e809ee52599578061e3ce2a9a1aba83b20ec86d6dcc224717138f8eeb2676`.
- Exact review text: `operations/product-stewards/luminairy/complete-profile-review-text-2026-09-05.md`, SHA-256 `9197070219e6bce3022e4af5c170f66b60eefa581e5d5927d9305c25c7a3c8e7`.
- Producer self-review: `operations/product-stewards/luminairy/complete-profile-producer-self-review-2026-09-05.json`.
- Independent semantic admission: `operations/product-stewards/luminairy/complete-profile-independent-semantic-admission-2026-09-05.json`.
- Signed claims: `content/luminairy-claims.json`, SHA-256 `0e0ef661e74879b1a4aefbbd46f7018c1629112446a087f2aba91fc11d379772`.
- Signed receipts: `content/luminairy-editorial-receipts.json`, SHA-256 `63cbfeb1c5a97a9815ea820200624ec10f11382cf41fcbd8d9aa9f224773e40a`.
- Signing key ID: `luminairy-editorial-offline-r6-20260905`.

The receipts prove integrity and authenticated admission of the exact profile bytes. They do not substitute for the separately recorded prose, source, likeness or rendered-page reviews.

## Verification

Passed:

- `scripts/check-luminairy-complete-profiles.mjs` — exact 13/23/7 roster, deep sections, images, songs and typed destinations.
- `scripts/check-luminairy-artwork-boundary.mjs` — 43 active-family images, zero temporary-profile mappings, retired families remain outside active folders.
- `scripts/test-luminairy-profile-resource-admission.mjs` — current candidate passes; mutated profile text and evidence hashes fail.
- `scripts/validate-luminairy-claims.mjs` — all 43 profiles, exact assets, sources, songs and P-256 receipts pass.
- `scripts/check-content-producer-contract.mjs` — exact content contract integrity passes.
- `scripts/check-prose-quality-admission.mjs` — producer review and independent semantic admission both pass, and the ordered cross-model review chain matches.
- `scripts/test-luminairy-browser.cjs` against `http://127.0.0.1:4173` — all 43 cover/profile journeys, every one of the 108 destinations, all images, 12-song playlist, Carrie deferral, search, keyboard focus, audio/storage/fetch failures, signed admission with and without Web Crypto, local/account restoration into My Closet, desktop/390/320 overflow.

The objective gates were calibrated with known-bad mutations before being trusted.

## Release boundary and remaining item

- No push or Cloudflare deployment was performed.
- Public custom and immutable origins were not verified because the exact current production artifact and coordinated Pages slot are still required before release.
- Carrie Bradshaw's song remains the only intentionally deferred content item. The page is honest about that state and never requests a missing audio file.
- Third-party destinations were reviewed through 2026-09-05; future availability is outside this artifact and triggers recheck rather than silent fallback.
