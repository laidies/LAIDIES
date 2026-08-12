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

- `content/newsstand.schema.json` — `7a475c6b13766b66b0cf13778964e1ccf0a4d24a146ea13f7ba09bb60b93b97f`
- `content/newsstand-reader-contract.js` — `1ad87d293e1a683c1253f5f2056946aab61d882c4fbf9ebbe981ae39f6e5af7f`
- `newsstand.html` — `d9e3dfe07c077ae6f4e49b1d93e317af3f2bc5860f24921913667fcc2e8f7dc5`
- `content/newsstand.css` — `5deba9534bf7fe2d49788e4d534203fb86135421f3273d3b14d35695304d9846`
- `scripts/validate-newsstand-stories.mjs` — `ce3ec64f6f6fc7841c5acad4972d9f8bf84242dc0be8eae9f4cd12de8ac4958a`
- `scripts/test-newsstand-reader-contract.mjs` — `25251bb44085af7b333d2331b31c1512211ae02f6d4652fa4ee023dae0be571a`
- `scripts/test-newsstand-reader-browser.mjs` — `37117cf578526346b5d15cf758325aa60ef7eb37e79285a446ce6f59fe8469a5`

## Checks and calibration

- `node scripts/test-newsstand-reader-contract.mjs` — PASS, ten state fixtures.
- Deliberate invented jump target — rejected with `longform jump target is missing`.
- Deliberate empty paragraph block — rejected with `longform block is invalid`.
- A held story may state `publishedAt: null`; calibration rejects null when the
  same record claims `published`.
- `node scripts/validate-newsstand-stories.mjs` — PASS for the unchanged canonical data.
- `node scripts/test-newsstand-reader-browser.mjs` — PASS, 266 rendered checks,
  including long-form desktop, 390px and 320px label, jump-target, myth-role,
  work/home, reading-measure and horizontal-overflow checks. The exact held Big
  Question and Weekly records also render in isolated internal fixtures at all
  three widths with every section, source and jump target present.
- `git diff --check` — PASS.

## Boundary

No long-form candidate was added to `content/newsstand-stories.js`. No observed
human review, semantic story admission, release integration, deploy or public
verification occurred. The existing public NewsStand is unchanged.

## First held transformation

The Big Question source now compiles through a reusable fail-closed transformer
into `operations/product-stewards/newsstand/candidates/big-question-cross-lab-story-record-candidate.json`
at SHA-256 `d5def3046785ec77bd451dad07af31a5e77aaeb518866ed76e40b834b03da6d0`.
The record has 10 authored sections, 82 blocks, 12 reviewed sources, an honest
null publication instant and `status: hold`. Its complete prose order matches
the accepted Markdown; production-contract injection passes and direct access
remains denied. This is a candidate record, not canonical story integration.

The same compiler now produces
`operations/product-stewards/newsstand/candidates/weekly-cross-lab-story-record-candidate.json`
at SHA-256 `df6a29f16a15e88fc7736e3e3befe4d9092b010c1dd3f6242043f9db3a33e61d`.
The Weekly record has 6 sections, 43 blocks, 5 reviewed sources, exact prose
order, `publishedAt: null` and inaccessible `hold` state. Its visible and
accessible identity is The Weekly; no Big Question wrapper identity is reused.
