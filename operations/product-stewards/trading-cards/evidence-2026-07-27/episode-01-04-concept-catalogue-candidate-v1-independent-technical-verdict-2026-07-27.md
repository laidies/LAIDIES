# Episode 01–04 Concept Catalogue Candidate v1 — Independent Technical Verdict

**Verdict:** HOLD — contract shape only; all source, image, receipt, cardinality and deterministic-build checks otherwise pass.

**Judge scope:** Read-only independent verification of
`operations/product-stewards/trading-cards/episode-01-04-concept-catalogue-candidate-v1.json`.
No catalogue, builder, manifest, image, live card data, pack, reward or public-route bytes were changed.

## Frozen inputs

| Input | SHA-256 |
|---|---|
| Candidate catalogue | `65c0d13fcd7cb258edbea377cec8cc8abf5614902e9d4dd245f23508790fd085` |
| Candidate builder | `ebeac3f13aeab0d8797f8337036d5b4dab70efd66888270d5158d0fdc4a6466a` |
| Canonical `CARD-MATRIX.md` | `233ed575aabfa9afca874b2fd8d4cd88e14d7debae623a134ed7454fe1b74071` |

The candidate's matrix hash is exactly `233ed575aabfa9afca874b2fd8d4cd88e14d7debae623a134ed7454fe1b74071`.

## Passing checks

- Independently parsed the four matrix sections and compared every exact card key, title, hook, back heading, back copy, source locator, alt-front seed and pack key: **20/20 exact; no mismatch**.
- Candidate has **20 unique immutable keys**, exactly five each for `s01:e01`, `s01:e02`, `s01:e03` and `s01:e04`.
- Recomputed all 20 front-image hashes against both candidate and episode manifest values: **20/20 exact**.
- Recomputed all bound independent-review receipt hashes:
  - E01 front review: `160a35cd432877ab29d08857bb7b8dcc61a1f6d6bd57e1443c83f62a7b07a037`
  - E01 Human Judgment successor: `2803c3277e5554b8c30047e464cbcc4aee479619be7f28ad47b61f3da4751712`
  - E02 front review: `392e2323f2de47d132b876efb52a60bceadc01234c83cb1c0f26cfc443514556`
  - E03 front review: `cf758943324ea2a7cec2a198f5363155cb17c0ef1137fef6ae038da908bf5efc`
  - E04 front review: `4dd7d12c7af3935df222ab5350219cba8aec10853b1c19a479237188b54ba39c`
  - E04 AI Winter successor: `cf5ac95a36f8fa3340791a70aaa2a73b4a43fbcc8dff3b7d40d93a5c2489ded7`
- Rebuilt in an isolated copy. Result is byte-identical to the frozen candidate at the catalogue SHA above.
- Negative probes fail closed: a stale manifest front hash fails with `image hash mismatch`; a removed front image fails with `ENOENT`.
- Candidate boundary is truthful: every record is `release_state: candidate`; catalogue status is `candidate_unadmitted`; no pack is admitted/openable/owned/rewarded/public. `image_back_or_rendered_copy` is `null`, so no generated-back-image claim is made. `identity_ref` and `alt_back` are deliberately `null`.
- `node scripts/check-product-stewards.mjs --owner-entry trading-cards` and scoped `git diff --check` pass.

## Exact hold and repair

`operations/product-stewards/trading-cards/OPERATING-SPEC.md` requires singular
`visual_review_receipt` and `editorial_review_receipt` on every catalogue
record. The candidate instead supplies only plural `visual_review_receipts` and
`editorial_review_receipts` arrays.

**Failing path:** `operations/product-stewards/trading-cards/episode-01-04-concept-catalogue-candidate-v1.json` — all 20 `cards[]` records lack both required singular fields.

**Exact repair:** update the candidate builder and regenerate the candidate so each card has scalar `visual_review_receipt` and `editorial_review_receipt` values selected from its already-bound receipt set; preserve the plural arrays only if they are deliberately retained as supplemental provenance. Rerun the isolated deterministic build and this independent schema check. Do not change cards, image bytes, manifests, packs, rewards or live routes for this repair.

## Image hash inventory

| Episode | Card key | Front-image SHA-256 |
|---|---|---|
| E01 | `concept:s01:e01:generative-ai:v1` | `4975ddbe735f4f92c1efb39de95bd489889d3234a2e46386b9c13ae93cf2305b` |
| E01 | `concept:s01:e01:model:v1` | `63a578294d67695af24b2a1b78a0573ef9c01a34b694fcf0be9846da2a063a3b` |
| E01 | `concept:s01:e01:hallucination:v1` | `ee4462c557386f26ab6351ffe69e547e254f2fda2d53eb8db56ad5594eec0555` |
| E01 | `concept:s01:e01:three-tools:v1` | `b5123717d05df236c577be890795e794ffbd9fcb962b7ffb37ef80ae9b14fa71` |
| E01 | `concept:s01:e01:human-judgment:v1` | `2e23910132ddb9aeaa08424d37dbb8050a1d6f1fe1a3777d2f8585e92917a4a3` |
| E02 | `concept:s01:e02:prompt:v1` | `34ae62932777c6fb395a22ed8482b41b93114982e1024cd880b633da6686722d` |
| E02 | `concept:s01:e02:context:v1` | `f316bf71fd3ac7c369cb843fda3fe4de32bf67633599fb1d1fcf627af4ef1cda` |
| E02 | `concept:s01:e02:specificity:v1` | `cd8e0a67de2c3f24a5ab6c3ce725de932c65dc8feeacc2f75ab883c187d1b6ec` |
| E02 | `concept:s01:e02:example:v1` | `6eac9026a1437ae25c21b3ab56f30799ef5d5a9d0bf4438c56f8c2564be16dda` |
| E02 | `concept:s01:e02:revise:v1` | `2ec4fe7c2af236a4f99644e7608dbcbd6db451ba2c35988840a1cb5a0515f9d6` |
| E03 | `concept:s01:e03:draft:v1` | `df52d3d48da672e5398804d2e176d70ff4493318891ae65dc959d9cf26cfa5c6` |
| E03 | `concept:s01:e03:claim:v1` | `1871da4c643d23beabe0da6653fa5566bb2464e451748a75081cdb99fb093437` |
| E03 | `concept:s01:e03:receipt:v1` | `47da3a255373ec9900f7e7c53d8b9b4af42e85230bbec40c7955fb53189f07ab` |
| E03 | `concept:s01:e03:verification:v1` | `b107ed026b716362d8a58d73cc5514e2868ee2414fbc4e6c50211b383da41a40` |
| E03 | `concept:s01:e03:assumption:v1` | `5beee30b76b6ace92e5eceeaf4add99904965784f9d7ab9fa4a2968726338f9f` |
| E04 | `concept:s01:e04:algorithm:v1` | `c65a8bc5d32348eb6c788f75c05e61bfbfe71ba6370911c5ef898a6bb6783abd` |
| E04 | `concept:s01:e04:signal:v1` | `87ce978e661c9d82af1ac5890d5c766445262a441a466d58eaeb823792d57d5b` |
| E04 | `concept:s01:e04:compiler:v1` | `7956063ec72a0a14557b81bf0a7aef84531d2a43d93e1036fd092306991441d6` |
| E04 | `concept:s01:e04:ai-winter:v1` | `fde17eb0080003d44d1fe9d5abcdef5af8648f8a8c26671bafe581e8cf2b65cd` |
| E04 | `concept:s01:e04:training-data:v1` | `dc50d441d902e0d119893dadf569fc6642b9be02a8162b8e026abf3f2ec95b93` |

**Authority truth:** No candidate art, card/catalogue/pack data, reward, ownership, public route, release, deployment, spend or external service was changed by this judge.
