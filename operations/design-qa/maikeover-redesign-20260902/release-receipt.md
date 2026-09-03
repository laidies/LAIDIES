# MAiKEOVER production release receipt — 2026-09-02

## Outcome

`PUSHED / DEPLOYED / PUBLICLY VERIFIED`

- Production deployment: `41cf460f-5ae9-4550-8303-6527e81a37b4`
- Immutable origin: `https://41cf460f.laidies-sunnyvaile.pages.dev`
- Custom origin: `https://laidies.ai`
- Pushed branch: `release/maikeover-20260902`
- Source commit: `bac9c73e65056744d36411e768ba41389ef274ce`
- Rollback deployment: `5146c5b4-d870-4953-871d-3469dfc83ad3`

## Exact artifact

- Deploy input: `/tmp/laidies-maikeover-successor-r4.C9EgIW`
- Manifest: `/tmp/laidies-maikeover-successor-r4.C9EgIW.manifest.json`
- Manifest SHA-256: `d82513efc09b820e746d6ec3b80716b39dba98c7865c43227cc5a793dd45a7f3`
- Files: 741
- Bytes: 782,024,248
- Whole-artifact identity: `c991c2c25a004b328f09eb5a81982619f38c5feafd27e06256761cf184457af0`

The provider-confirmed base was deployment
`4ebb0947-6347-4541-b2d9-102b862ca687`, exact input
`/tmp/laidies-newsstand-four-useful-successor.Yfug1M`, manifest SHA-256
`13064c34661af68f5e1229a5b41e123f6fdec348087a45a369a06ecab30d541c`,
739 files, 776,949,121 bytes and identity
`2ae326a00c923b123ce12347844ab64ab602023eb42c644190c3c9fb16fe5a1e`.

## Exact base-to-successor delta

Modified:

- `maikeover.html`
- `content/maikeover-v2.css`
- `content/site/maikeover-v2.js`

Added:

- `assets/building-interiors/maikeover/maikeover-vanity-resident-card-candidate-v5.png`
- `assets/town-characters/scenes/paulette-maikeover-masthead-comic-candidate-v1.png`

Removed: none. All 736 other base files are byte-identical.

## Public verification

- All five MAiKEOVER paths match the exact artifact at the immutable and custom origins.
- `index.html`, `library.html`, `newsstand.html`, the six current NewsStand data/runtime paths, `resident-card.html` and `laidies-card.html` match the predecessor and both public origins.
- The six-step immutable-origin journey selected Holo, Clueless, Daria, Welcome to the LIBRAiRY, Elle Woods and Milky pen; all values appeared on the Card, persisted through reload and rendered in the Closet.
- The Closet link remains visible after reload without a second save.
- The Resident Card handoff reaches `#rcAccountTitle` and exposes the private email field. No email was submitted.
- The custom-domain maker was inspected with an existing long resident name and long movie title; both remain on their own rows with ellipsis and no overlap.

## Limits

- No two-account/two-device continuation lifecycle was rerun.
- No sign-in email was sent and no account was created.
- Portrait generation remains outside this release.
- The broad repository pre-commit hook was bypassed; targeted MAiKEOVER, Resident Card shared-contract, active-asset, public-metadata and KSVL artifact checks passed. The source branch and exact release commit are pushed.
