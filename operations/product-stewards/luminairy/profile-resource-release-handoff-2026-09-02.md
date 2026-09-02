# LUMINAiRY complete profile-resource release handoff

**Status:** RELEASE CANDIDATE READY / NOT DEPLOYED

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

No Cloudflare upload or deployment was made. The production owner must coordinate a Pages slot, confirm the provider head is still `64b2bb39-ab9e-40f1-9dd1-d595b14ccdb5`, deploy the exact artifact identity above rather than rebuilding it, and verify all 15 changed paths plus the LUMINAiRY interaction journeys at both immutable and custom origins. Any provider-head change invalidates this release handoff and requires rebasing the same 15-path overlay onto the newly recovered exact artifact.
