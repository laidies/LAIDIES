# KSVL booth retirement — 2026-09-08

Ali requests removal of the pictured outdated cottagecore studio and prevention of reuse.

## Exact scope

- Rejected JPG: `assets/building-interiors/ksvl-booth.jpg`, SHA256 `7dc6778f73c6391f286f2aa63cbd6dc9067af764c1015d0a892ee0ecb3bd3155`.
- Rejected original/export: `approved-assets/building-interiors/ksvl-booth.png`, SHA256 `177804f2807513855e546c15c3f4869d29f96a281605308d5f38430d7b2d232d`.
- Homepage and fun-connect use the separately retained KSVL sticker collage. Radio removes the illustration and reflows its existing four controls and tuner. No new artwork or copy claims.
- Original files remain historical evidence. Registry denies both paths and both exact hashes, including renamed identical copies. This cannot detect a materially recompressed or altered image; the image-family prohibition also governs selection.
- The old building-wave-3 selector and tests requiring the booth are corrected. Frozen, unjudged trailer beat maps are historical records only; they do not authorize selection.

## Verification

`node scripts/test-active-asset-admission.mjs`: passed. The new stale-ACTIVE/retired-path fixture failed against the old implementation before the repair.

`node scripts/test-ksvl-retirement.mjs <artifact>`: passed; real JPG and PNG bytes under a renamed filename both fail the actual artifact command; a retired HTML reference without a local file fails too. All public files in the candidate are scanned.

Browser checks: homepage, radio and fun-connect at 1440,390,320; no retired image or request, no page overflow; radio four controls visible and Mix CDs opens. Maker viewed actual desktop and phone screenshots. Independent Terra/Medium reviewer inspected those images first and the exact candidate diff, found no new clipping, blank image slot or hidden control, and admitted the narrow retirement change for review. No broad radio redesign or full service/audio test claimed.

The full historical registry check improves from six incumbent failures to four unchanged non-KSVL discrepancies: retired Jeeves reference and favicon/jelly-sandal/mini-backpack hash mismatches. These are recorded existing discrepancies, not a full-asset PASS. No unrelated asset was replaced to make that checker green.

## Release preservation

Receiving production: `292f29fc-db1d-404c-afd4-56f464ebaf0b`, source `d128042fd83b711377413798ff27b50838d5e0d2`.
Production candidate: `/private/tmp/laidies-ksvl-retirement-20260908`. Only four modified static files (index, fun-connect, radio, dependency-report) and removal of the rejected JPEG. Worker, redirect rules and NewsStand bytes preserved. The five receiving-artifact placeholder identities must be retained from the provider manifest via the existing preservation map, never blindly uploaded as replacements.

User preview: `63ca535f-e3a8-4126-a83a-f2b0b8cb0aea`. Captured original HTML equals `2c29f56be57a97881034388730a8222bece4ba54:index.html` exactly, SHA256 `54aa163703d6b2cfca50881b570c2f8e275eb46b86f3bea084fd62789ea94b25`. Its current design is preserved using its provider file identities; only the four correction files change and the retired JPEG disappears. Radio HTML was identical between preview and receiving production. Shared worker uses the receiving production artifact unchanged. No Resident copy or SSO implementation is included.

Publication and live verification: pending; append exact successor IDs and provider delta after completion.
