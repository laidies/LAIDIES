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
