# LUMINAiRY complete-profile release candidate — 2026-09-05

## Verdict

`43 OF 43 IMPLEMENTED AND VERIFIED LOCALLY / OWNER REVIEW NOT YET OBTAINED / NOT DEPLOYED`

This candidate implements and independently verifies the visitor-facing LUMINAiRY page in the assigned owner branch. Ali has not yet received the complete exact-page/card review, so it is not owner-approved and does not claim release readiness or a public release.

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
- Mayor Deb replaces the rejected generic blue-cardigan portrait with exact SHA-256 `8ead4e383486f664df849e2cc25f13da707d3486fc490ef9bae2e3bda1ba3cc6`; the identity is bound to the curated Mayor Deb town-character scene and the clean Episode 04 comic test, while the existing Patron background is preserved.
- Samantha Jones, Carrie Bradshaw and Regina George now use reference-bound likeness corrections, and the saved raw layers for ten Patron cards were deterministically despilled and recomposited over the unchanged pink/red wing backgrounds. Independent person-by-person, full-size and card-scale review found 0 of 13 Patron identity holds and 0 of 13 pixel-finish holds.
- The deny-by-default artwork boundary finds `43` approved-family mappings and `0` LUMINAiRY mappings to temporary retired artwork.

The active portraits use one wing-specific background family, waist-up editorial-comic rendering and person-specific likeness evidence. Ada Lovelace, Lynn Conway, Mira Murati and Allie K. Miller received new reference-bound likeness repairs; Hedy Lamarr and Amanda Askell received edge cleanup. The independent visual re-review returned PASS for the four held likenesses after repair.

## Content and signed admission

- Profile data: `content/luminairy-profiles.json`, SHA-256 `2c986ea3a3dc3b0e2b7a4c3058b4edfc3f005ca0db8cd10e74b04922483eed62`.
- Exact review text: `operations/product-stewards/luminairy/complete-profile-review-text-2026-09-05.md`, SHA-256 `2b01f3c0e8f6058604ee054759ce4f523a1d0cf758eac771b1f2ef3e8f39a803`.
- Producer self-review: `operations/product-stewards/luminairy/complete-profile-producer-self-review-2026-09-05.json`.
- Independent semantic admission: `operations/product-stewards/luminairy/complete-profile-independent-semantic-admission-2026-09-05.json`.
- Signed claims: `content/luminairy-claims.json`, SHA-256 `cfa27c6ffc7833a3d0328d3433eb3f0b9048dab2295953135c0926158455ae8e`.
- Signed receipts: `content/luminairy-editorial-receipts.json`, SHA-256 `4c974f60dec3c86155406cc8e51b625cc69debf2702bc30830c174910fba31b8`.
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
- `scripts/test-luminairy-browser.cjs` against `http://127.0.0.1:4173` — all 43 cover/profile journeys, cross-wing search recovery, every one of the 108 destinations, all images, 12-song playlist, Carrie deferral, keyboard focus, audio/storage/fetch failures, signed admission with and without Web Crypto, local/account restoration into My Closet, desktop/390/320 overflow and a non-overlapping mobile return control.

The complete-page independent audit also passed the rewritten hero proposition, exact light-text contrast at desktop/390/320, removal of evidence-pipeline language and the Ada-from-Saints cross-wing recovery journey.

The objective gates were calibrated with known-bad mutations before being trusted.

## Release boundary and remaining item

- Patron correction commits on the assigned owner branch: `eb96f40276db433830d384eea522c155e7960580` and `e443a814a0533fe554bd84f86ede5c545454b139`.
- No push or Cloudflare deployment was performed.
- Public custom and immutable origins were not verified because the exact current production artifact and coordinated Pages slot are still required before release.
- Carrie Bradshaw's song remains the only intentionally deferred content item. The page is honest about that state and never requests a missing audio file.
- Third-party destinations were reviewed through 2026-09-05; future availability is outside this artifact and triggers recheck rather than silent fallback.
