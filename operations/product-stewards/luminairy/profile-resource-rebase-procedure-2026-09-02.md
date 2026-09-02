# Exact LUMINAiRY profile-resource rebase procedure

**Status:** READY / waiting for exact `e9deb12e` deploy-input artifact

The recovery owner must supply three things that agree: the exact recovered artifact directory for deployment `e9deb12e-40fb-4b12-adf7-0409b172a401`, its complete release manifest, and a provider binding with `deploymentId`, `immutableOrigin`, `artifactIdentitySha256` and `exactArtifactRecovered: true`. A source checkout or rebuilt directory is not an acceptable substitute.

Run `scripts/prepare-luminairy-profile-release-overlay.mjs` with expected tested-payload identity `dcda6af63c3669f72f73485116cf5db05b2d27bd20de0a5e990bae962b58cb64`, the three recovered-base inputs, retained tested payload `/private/tmp/laidies-luminairy-overlay.DqYfVv`, its checked-in manifest, and new non-existent output paths. The command refuses a mismatched base, provider binding, payload, existing output or any change outside the approved 15 paths.

After the overlay is created:

1. Independently recompute base and candidate manifests. Require zero deletions, no delta outside the approved list and identical hashes for every retained non-approved path.
2. Run private-dependency inspection and the full LUMINAiRY browser suite against the exact candidate: 13/23/7, all 108 destinations, all 30 images, Web Crypto/no-Web-Crypto, keyboard, storage/audio failure, desktop, 390 and 320.
3. Fresh-list Cloudflare production immediately before upload. If it is not still `e9deb12e-40fb-4b12-adf7-0409b172a401`, stop and repeat recovery.
4. Deploy the exact artifact directory without rebuilding.
5. At the immutable origin and `https://laidies.ai`, hash-compare every static changed path. Verify `_worker.js` and `_redirects` through route behaviour because Cloudflare consumes them. Verify the protected route set (`about.html`, `clubhouse.html`, `episodes.html`, `games/fun-pack.html`, `grimoire/chamber-of-receipts.html`, `grimoire.html`, `grimoire/verification-rulebook.html`, `postcard.html`, `receipts.html`, `reference-closet.html`, `sanctuary.html`, `start-here.html`, `this-week.html`) by expected destination/status and custom-versus-immutable journey, not false raw-byte equality.
6. Rerun the full browser matrix on both origins and record the deployment ID, immutable URL, exact artifact identity, changed-path hashes and anything not verified.

No deploy may proceed on a moved provider head, a source-only reconstruction, a payload identity other than the tested one, a changed path outside the approved list or a failed browser/admission check.
