# Exact public-artifact successor — current NewsStand release candidate

**Result:** PUBLIC ARTIFACT BUILT LOCALLY / PRODUCTION CONTROLLER HOLD

**Last public-byte commit:** `0475cd368f8952552551275d3eaccd2d7564917b`

**Artifact identity SHA-256:** `1e8181d667039e2fcf5531d554a5f1e326944892492c26a76b073b4c1a21359d`

**Artifact:** 540 curated public files; 535,245,201 bytes

**NewsStand artifact:** `newsstand.html`; 60,313 bytes; SHA-256 `5af8beb902d4c04de853e156b72c80160eceeaa89145484b0c0c27abd3edb4d7`

## Runtime closure added after the preliminary build

- `content/site/resident-card-contract-v1.js`: `ae988d885c0bebfbc3e4eee8943f0027b16bef1e575281e20ecd5f2163b35aac`
- `content/site/identity-client-v1.js`: `5e454bccd7638dbe1f480c5303d94135baffb0ba26c96e9d7221b1d35fb7757c`
- `content/site/resident-account-runtime-v1.js`: `f7b3ec70a7c7b845d50c6dbd932122aa01123b906078ec0471a1b80a298d3308`
- `content/site/resident-continuation-v1.js`: `3fe583089410810384aa8a1da28041955091ae7f036bb71204f1c06c9f03c6cc`

The bootstrap now keeps literal deployable dependency paths beside the cache-versioned runtime URLs, so the unchanged curator includes and verifies the complete chain. The exact NewsStand page/CSS/reader tuple did not change after independent acceptance. The targeted reader and browser suites still pass: 10 deterministic state fixtures and 211 rendered/behavior checks.

`npm run ci` remains held only by the four overdue global work-resolution records named in the preliminary build receipt. No controller bypass, fabricated timestamp, fabricated redispatch or deployment occurred.

This receipt proves local curated-artifact and runtime dependency closure. It does not prove the global operational state, spoken VoiceOver announcements, an August 11 NewsStand owner editorial disposition, deployment or public behavior.
