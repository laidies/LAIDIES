# LUMINAiRY complete profile-resource release handoff

**Status:** PUBLICLY VERIFIED

**Content commit:** `6b604fd606ece7f8a3e6af8ac0a42859778c10b2`

**Branch:** `feature/luminairy-all-profile-resources-20260902`

**Checked:** 2026-09-02, America/Vancouver

## Outcome

All 23 MAiVEN and 7 Trailblazer cards are complete to the Hannah Fry standard. There are 30 DONE profiles, zero portrait/content/source gaps, 108 verified typed destinations and 30 renewed r5 signed profile/evidence receipts. The 13 Patron Saint profile, claim and receipt objects are unchanged from the signed Hannah successor.

## Recovered production base

- Cloudflare production deployment: `64b2bb39-ab9e-40f1-9dd1-d595b14ccdb5`
- Provider source: `51aa2c124d780be4e4dfc3a9120721c1527d7e99`
- Immutable origin: `https://64b2bb39.laidies-sunnyvaile.pages.dev/`
- Retained artifact: `/private/tmp/laidies-newsstand-sep2-successor.YdnISM`
- File count: 726
- Artifact identity: `2cf8d8c87970b0474507675bfe6a5240a20ab856e35008c609cd815a2cf3dba5`
- Checked-in manifest: `operations/product-stewards/luminairy/current-production-base-manifest-2026-09-02.json`
- Manifest-file SHA-256: `57dafc8f367bad0e95b9aec2aaa0e18e5a0921f619028bf55d08eef00914da00`

Every retained local file matches its manifest. Direct immutable-origin comparison matched 713 paths and 751,721,560 bytes. The thirteen non-byte-comparable paths are expected deployment behaviour: `_worker.js` and `_redirects` are consumed rather than served, while eleven routes are normalized or handled by the worker. Current LUMINAiRY renders 13 cards at both immutable and custom origins. Do not replace this evidence with a rebuild of `51aa2c1`: its current source builder fails closed on the unrelated unregistered `assets/homepage/original-restoration-20260829/sunnyvaile-postcard.webp` dependency.

## Exact successor

- Prepared artifact: `/private/tmp/laidies-luminairy-overlay.DqYfVv`
- File count: 735
- Artifact identity: `dcda6af63c3669f72f73485116cf5db05b2d27bd20de0a5e990bae962b58cb64`
- Checked-in manifest: `operations/product-stewards/luminairy/profile-resource-release-candidate-manifest-2026-09-02.json`
- Manifest-file SHA-256: `e3568ea063977d4d72f48848a3a9fcf6c88fb05a718bdb4754ef6f9ee5427c8e`
- Unchanged base paths: 720
- Modified paths: 6
- Added paths: 9
- Deleted paths: 0

The exact changed paths are:

1. `luminairy.html`
2. `content/luminairy-profiles.json`
3. `content/luminairy-claims.json`
4. `content/luminairy-editorial-receipts.json`
5. `content/site/luminairy-claim-gate.js`
6. `content/site/luminairy-app.js`
7. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/grace-wahba-y2k-stained-glass.png`
8. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/cynthia-dwork-y2k-stained-glass.png`
9. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/daphne-koller-y2k-stained-glass.png`
10. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/barbara-liskov-y2k-stained-glass.png`
11. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/jean-sammet-y2k-stained-glass.png`
12. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/adele-goldberg-y2k-stained-glass.png`
13. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/shafi-goldwasser-y2k-stained-glass.png`
14. `assets/mavens/y2k-stained-glass-v4-dark-sapphire/lynn-conway-y2k-stained-glass.png`
15. `assets/builders/y2k-stained-glass-v5-golden/amanda-askell-y2k-stained-glass.png`

## Admission and release boundary

The exact overlay passes the complete LUMINAiRY browser matrix: 13/23/7 rendering; all 30 exact destination sets; 12 available Saint songs with Carrie's correctly deferred; signed admission with and without Web Crypto; all portraits; keyboard use; local-save success and failure; desktop, 390 and 320 widths; and no horizontal overflow. Private-dependency inspection also passes.

Independent release-scope review recomputed both artifact identities from the real bytes and passed the exact boundary: 9 additions, 6 modifications, 0 deletions and all 720 retained base paths hash-identical. The reviewer also reran the full browser matrix against the prepared artifact and confirmed that its public profile data is byte-identical to the committed source.

No Cloudflare upload or deployment was made. The production owner must coordinate a Pages slot, confirm the provider head is still `64b2bb39-ab9e-40f1-9dd1-d595b14ccdb5`, deploy the exact artifact identity above rather than rebuilding it, and verify all 15 changed paths plus the LUMINAiRY interaction journeys at both immutable and custom origins. Any provider-head change invalidates this release handoff and requires rebasing the same 15-path overlay onto the newly recovered exact artifact.

## Pre-deploy provider-head result

The authorized fresh provider check found that production had moved before this candidate could be uploaded:

- New deployment: `e9deb12e-40fb-4b12-adf7-0409b172a401`
- New immutable origin: `https://e9deb12e.laidies-sunnyvaile.pages.dev/`
- New exact source: `1d6671d639860e153c09fe57baee0183ecfca2b5`
- Source subject: `Rebase referrals on current shared runtimes`

The deployment was stopped before upload. Artifact identity `dcda6af63c3669f72f73485116cf5db05b2d27bd20de0a5e990bae962b58cb64` remains valid evidence for the tested 15-path overlay over predecessor `64b2bb39`, but it must not be deployed. Recover the exact `e9deb12e` artifact, reapply the same bounded delta, recompute identity and repeat independent scope/browser review.

## Final public release

- Deployment: `1e5db871-af97-4c65-a90e-7866ad928747`
- Immutable origin: `https://1e5db871.laidies-sunnyvaile.pages.dev/`
- Recovered base: 729 files, identity `cea473fe89a42a10a4f3603e46c372ee31d13608913cf98e6c5d61c5374400fa`
- Deployed artifact: 738 files, 776,939,904 bytes, identity `b70312c4b2837c782abf970e14119ef4afa342b33485cf15e3cc6101ffd1be88`
- Production manifest: `operations/product-stewards/luminairy/profile-resource-production-manifest-2026-09-02.json`
- Delta: 9 additions, 6 modifications, 0 deletions, 723 unchanged base paths

The fresh pre-upload provider head remained `e9deb12e`. Independent review recomputed the base and candidate identities and confirmed all referral and migration-related paths were preserved. All 15 changed paths match the deployed artifact at both origins (30/30 hash comparisons). The complete browser suite passes at custom and immutable origins: 13/23/7 roster, 108 exact destinations, all 30 portraits, signed admission with and without Web Crypto, keyboard, persistence/failure behaviour and desktop/390/320 layouts. The first immutable 320px image check was transiently incomplete immediately after deployment; the required retry passed after edge propagation.
