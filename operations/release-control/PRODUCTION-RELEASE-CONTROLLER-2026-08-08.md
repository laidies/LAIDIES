# Production release controller — 2026-08-08

Status: **BUILDING — CONTROLLER CALIBRATED; CURRENT SOURCE NOT RELEASEABLE**
Owner: Control Room / release integration
Evidence time: 2026-08-08 13:55 PDT

## Visitor outcome

Merging work to `main` does not publish it. A production release must start from
an explicit set of visitor entrypoints, include only their tracked dependency
closure, bind the exact source commit and artifact identity, receive an
Ali-bound manual approval, deploy through the production environment and prove
that the live homepage bytes equal the approved artifact while internal
operations routes remain unavailable.

## Implemented candidate

- `.github/workflows/production-release.yml` has only a manual
  `workflow_dispatch` trigger.
- `operations/release-control/public-entrypoints.json` explicitly names the
  visitor pages; it does not infer public files from the repository root.
- `scripts/build-public-site.mjs` follows tracked local dependencies and rejects
  references into internal directories.
- `scripts/create-release-manifest.mjs` creates a deterministic identity from
  every artifact path and SHA-256.
- `scripts/check-production-release-approval.mjs` binds Ali's decision to the
  exact commit, artifact identity and `https://laidies.ai/`.
- `scripts/test-production-release-controller.mjs` proves that a safe fixture
  builds, an internal reference fails and an altered approval fails.

## Current source blocker

The exact `main` source at `fab6a847cded0f7c8b9ed44887b23b36d3143ab8`
does not yet build a complete curated public artifact. The builder correctly
fails because these referenced files are missing or untracked:

- `assets/closet/closet-interior-hero-pixel.png`
- `assets/sunnyvaile-buildings/y2k-v3-defairytale/episode-pixel/scenic-town-shots/05-whole-town-golden-afternoon-overlook-pixel-v1.png`
- `assets/bookfair/bf-wallpaper.png`
- `assets/bookfair/bf-badge.png`
- `assets/bookfair/bf-bookmark.png`
- `assets/bookfair/bf-stickers.png`
- `assets/bookfair/bf-postcard.png`
- `assets/bookfair/bf-zine.png`
- `assets/bookfair/bf-holocard.png`
- `assets/bookfair/bf-poster.png`
- `assets/town-characters/y2k-portraits/dj-sunnyv-y2k-portrait.png`

These are release-source defects, not reasons to weaken the builder. The next
source-integration package must either restore the exact admitted assets or
remove the stale public references through the owning product lanes. No
production dispatch is eligible until the real source builds without either
missing or prohibited references.

## External configuration still required

After this controller is merged, set `PRODUCTION_CONTROLLER_SHA` to its exact
reviewed commit, set `PRODUCTION_APPROVER_LOGIN` to Ali's GitHub login and apply
production-environment protection. Those provider mutations require explicit
approval. They do not themselves deploy. A later exact release still requires
Ali's separate artifact-specific verdict.

## Authority truth

No workflow was dispatched. No Pages artifact was uploaded or deployed. The
existing public site was not replaced or judged. No spend, purchase,
subscription or Library visitor/content edit occurred.

## Main-branch recovery checkpoint — 14:37 PDT

The controller merge exposed a second repository-integrity defect at exact
`main` commit `ff7536ad709d83e18bd00da4e9f4120152665faf`: `package.json`
required checks and fixtures that were absent from the branch even though the
exact files remained recoverable in Git history. The recovery branch restores
only those historical operational dependencies plus six historically tracked
media files required by the Episode 2 gate and trailer dependency walk.

Verified after recovery:

- Episode 2 mechanical gate: `PASS` (5/5).
- Episode-cue missing-input calibration: `PASS`.
- queue-claim policy calibration: `PASS`.
- output-path CLI calibration: `PASS`.
- canonical-instruction dependency check: `PASS` (15 required sources).
- work-resolution-loop calibration: `PASS`.
- media-defect fixture calibration: `PASS`.

The complete `npm run ci` and curated public build remain blocked. These are
now evidence-bearing failures rather than missing-checker crashes:

1. The Daily private-pipeline fixture expects the newer canonical NewsStand
   dataset; `main` still carries its predecessor visitor dataset. NewsStand
   owns that public editorial reconciliation.
2. The NewsStand canonical migration checker reports retired fields and routes
   across episode metadata and visitor surfaces. NewsStand plus Episodes own
   those meaning-bearing migrations.
3. The rejection-prevention registry references `LESSON-13`, which the current
   protected `operations/LESSONS-ACTIVE.md` does not define. Control Room owns
   that canonical reconciliation; the Library rejection records must not be
   silently rewritten by release integration.
4. Operational integrity reports overdue/stale work records and many active
   registry assets absent from `main`. Their owning product lanes must either
   restore the exact admitted bytes or correct the registry status.
5. The public builder still rejects eight absent Book Fair assets, one
   untracked Closet hero and one absent DJ Sunnyv portrait. The recovered town
   panorama becomes eligible only after this checkpoint is committed.

No failing check was weakened or removed. No public copy, Library source,
release workflow dispatch, Pages upload, deployment or spend occurred.

## Recovery checkpoint — 15:12 PDT

Draft PR [#29](https://github.com/laidies/LAIDIES/pull/29) now includes exact
commit `2def7439a267d8b67b4a043a669a15acb5e65316`. The predecessor NewsStand
dataset and canonical migration were recovered from their committed lineage,
six stale work records were normalized to truthful non-running states and the
two undefined `LESSON-13` references were removed without weakening either
Library rejection. Full `npm run ci` passes, including the calibrated
NewsStand, rejection-prevention and work-resolution checks.

The curated public build remains **HOLD** on exactly ten files:

- `assets/bookfair/bf-wallpaper.png`
- `assets/bookfair/bf-badge.png`
- `assets/bookfair/bf-bookmark.png`
- `assets/bookfair/bf-stickers.png`
- `assets/bookfair/bf-postcard.png`
- `assets/bookfair/bf-zine.png`
- `assets/bookfair/bf-holocard.png`
- `assets/bookfair/bf-poster.png`
- `assets/closet/closet-interior-hero-pixel.png`
- `assets/town-characters/y2k-portraits/dj-sunnyv-y2k-portrait.png`

The eight Book Fair files and DJ portrait have no tracked bytes in repository
history. The Closet hero exists only in the dirty iCloud worktree and has no
current owner admission. None may be copied into the release branch as a
shortcut. Their owning product lanes must admit exact reviewed bytes or remove
the stale public reference. No workflow was dispatched, no artifact was
approved, merged, deployed or publicly verified, and no spend occurred.
