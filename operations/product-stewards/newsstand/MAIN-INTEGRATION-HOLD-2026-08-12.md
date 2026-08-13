# NewsStand current-main integration checkpoint

**Recorded:** 2026-08-12T23:36:33-07:00
**Branch:** `codex/newsstand-live-main-integration-20260812`
**Status:** `HOLD — CURRENT MAIN CANNOT BUILD THE CURATED PUBLIC SITE`

## What is preserved here

- The exact NewsStand review-package commits through the feature-lane exemplar
  fail-closed guard are rebased onto current `main` without touching the dirty
  iCloud tree.
- The minimum editorial-production, teaching-quality, source, reader, issue,
  desk and calibration dependencies missing from `main` are restored from the
  exact release branch.
- The released NewsStand story dataset is restored so the reader contract can
  load the expected schema and archive state.

## Verified in this worktree

- `node scripts/test-newsstand-feature-lanes.mjs` — PASS
- `node scripts/check-newsstand-feature-lanes.mjs` — PASS, 15 lanes and zero
  lanes eligible for autonomous production
- `node scripts/test-content-producer-contract.mjs` — PASS
- `node scripts/test-prose-quality-admission.mjs` — PASS
- `node scripts/test-newsstand-producer-proof.mjs` — PASS
- `node scripts/test-newsstand-complete-daily-review.mjs` — PASS
- `node scripts/test-newsstand-reader-contract.mjs` — PASS, 10 states
- `node scripts/test-newsstand-cloud-intake.mjs` — PASS

## Exact unresolved failures

1. `node scripts/test-newsstand-service-exemplar.mjs` fails because the Paige
   and Promptoscope candidates bind older exact Episode 2/3 page bytes. Current
   `main` has different page hashes. The candidates must be source-reconciled
   and independently re-reviewed; replacing current Episode pages to satisfy an
   old hash is prohibited.
2. `node scripts/test-newsstand-review-preview.mjs` fails before NewsStand
   assembly because current `main` contains `scripts/build-public-site.mjs` but
   omits its required Library admission manifest, active-asset registry,
   screening-room admissions and runtime-family manifest. The builder's fixed
   `sv-back-nav.js` hash also does not match current `main` bytes. Bypassing the
   curated builder would make the release gate weaker and is not an accepted
   repair.

## Resume action

Treat the full NewsStand release branch as the current coherent release source,
bring the already-verified cloud-intake commits into that branch, and continue
the exact exemplar/Daily/release cycle there. Reconcile `main` separately only
after its complete public-builder dependency set and current asset authority
can be restored without overwriting newer site bytes.

No canonical write, deployment or public claim is authorized by this
checkpoint.
