# Shared NewsStand long-form reader — local build receipt

Observed 2026-08-12 04:51 America/Vancouver.

## Outcome

**BUILT + VERIFIED LOCALLY / STORY INTEGRATION AND PUBLIC RELEASE HOLD.**

The production NewsStand schema and reader can now present The Weekly and The
Big Question through one layout without sharing or inferring their meaning.
Each future story record must supply its exact accessible name, unique section
IDs and labels, jump targets, work/home landmarks and myth/evidence/conclusion
roles. The renderer supplies navigation, a 68ch reading measure and distinct
myth treatment.

## Exact local tuple

- `content/newsstand.schema.json` — `0453ab057913efa047db3f727dd7a7dafdbc56eb45633e02238c36045257b31e`
- `content/newsstand-reader-contract.js` — `33bf5f3621b0d3be2137dd09c381fc2ecef8c33b29539a208ae644a313c147f8`
- `newsstand.html` — `d9e3dfe07c077ae6f4e49b1d93e317af3f2bc5860f24921913667fcc2e8f7dc5`
- `content/newsstand.css` — `5deba9534bf7fe2d49788e4d534203fb86135421f3273d3b14d35695304d9846`
- `scripts/validate-newsstand-stories.mjs` — `f2fd6876b5f0d0e7a6a60ac4a6ee6ae6145312a0b3ee818dbb2ed3a36e04d307`
- `scripts/test-newsstand-reader-contract.mjs` — `d11c072af0378de4417fa8f614efeb58b4ceb1f567c9733e71d715358e36acae`
- `scripts/test-newsstand-reader-browser.mjs` — `3f30ad11be0cbdde8a1c7982caefebb243059ef83c9192f219dde8ace90d05b7`

## Checks and calibration

- `node scripts/test-newsstand-reader-contract.mjs` — PASS, ten state fixtures.
- Deliberate invented jump target — rejected with `longform jump target is missing`.
- Deliberate empty paragraph block — rejected with `longform block is invalid`.
- `node scripts/validate-newsstand-stories.mjs` — PASS for the unchanged canonical data.
- `node scripts/test-newsstand-reader-browser.mjs` — PASS, 230 rendered checks,
  including long-form desktop, 390px and 320px label, jump-target, myth-role,
  work/home, reading-measure and horizontal-overflow checks.
- `git diff --check` — PASS.

## Boundary

No long-form candidate was added to `content/newsstand-stories.js`. No observed
human review, semantic story admission, release integration, deploy or public
verification occurred. The existing public NewsStand is unchanged.
