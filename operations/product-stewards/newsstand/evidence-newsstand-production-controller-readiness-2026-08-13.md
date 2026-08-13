# NewsStand production-controller readiness

**Checked:** 2026-08-13 12:12 PDT
**Status:** `CONTROLLER READY / CONTENT PROMOTION AND ALI APPROVAL STILL REQUIRED`
**Public mutation:** none

## Controller identity

- Controller prerequisite PR: `#80`
- Main controller commit: `1c1aba400c4a3832c46acce82900669fe25ea0f7`
- Repository variable `PRODUCTION_CONTROLLER_SHA` was read back as that exact
  commit after the merge.
- Prepared release-source successor: `198cf59edaa1a509fcc217c0dc65ffe5f12eab77`
- `git diff --name-status` between the main controller and the prepared source
  is empty across every path protected by the production workflow.

The controller continues to target Cloudflare Pages project
`laidies-sunnyvaile`, production branch `homepage-redesign`, and the custom
domain `https://laidies.ai/`. It requires Ali's exact artifact-identity
confirmation and refuses push-triggered or implicit release.

## Exact font scope

The production scope now permits only these new public files:

- `assets/fonts/newsstand/anton-latin.woff2`
- `assets/fonts/newsstand/jost-italic-latin.woff2`
- `assets/fonts/newsstand/jost-normal-latin.woff2`

All three are also exact public-verification paths. The calibrated scope check
still rejects every removal, any other addition, an unrelated modification and
a candidate that changes only generated build metadata.

## Tests

- `npm run test:production-release-controller` — PASS
- `node scripts/test-newsstand-release-scope.mjs` — PASS
- `node scripts/test-newsstand-exact-preview.mjs` — PASS, 44 calibrated unsafe
  preview states rejected

## Pre-promotion build truth

A clean public build of source `198cf59edaa1a509fcc217c0dc65ffe5f12eab77`
completed at 562 manifest files / 435,731,472 bytes with temporary identity
`e72b9e111de005fc72411f6b99e90be14c49c60a28a7473657eb5807df0ee17a`.
The three font hashes match the protected preview:

- Anton: `d0fa07ff63dd60cbc0e2f58e29c802dca2a5ae0276c999f59c6111ab7bbaec3b`
- Jost upright: `7726a5cd6f3c0e876c028ea2a643d45f7aad4b0f164b70966c669f4a4668f4b9`
- Jost italic: `0cadc07f42c10553256ae8fd50fe5eb8b09afe79443f68f50a977fdfc8d25ea8`

This is deliberately **not** the release artifact. The candidate Daily story is
still present only in the private candidate/package records and is absent from
canonical `content/newsstand-stories.js` and
`content/newsstand-daily-issues.json`. The protected preview composed those
private records for review; the normal public builder correctly did not. Ali's
approval and the remaining human/device gates must precede a checksum-bound
canonical promotion, after which the final public artifact identity must be
rebuilt and approved.

The temporary 415 MiB preflight artifact was deleted after these checks. No
production workflow was dispatched and no public byte changed.
