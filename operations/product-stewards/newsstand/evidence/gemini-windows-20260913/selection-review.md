# Gemini Windows selection admission

**Verdict: PASS.** I independently reviewed the completed projection at 2026-09-13T21:01:27Z.

The frozen public base selection file (`2372e8572f91bfb44f7c14d897c3906ce0ba669f120847df99dd1c4ded84a268`) differs from the current file (`0f489491e159fe053140c9c63b27e48c5f432cbf178c64088fe97fda5c8ca714`) by exactly one priority entry: `gemini-windows-20260913`, immediately before `chatgpt-pets-20260913`. Every earlier priority entry remains in its prior relative order. The comparator is unchanged: it sorts Vancouver calendar days newest first, uses the reviewed priority order within a day, then uses publication time and story ID as stable fallbacks.

The current published Gemini record is source-approved and points to `/assets/newsstand/gemini-windows-shortcut-20260913.png`. The file exists, is 1672x941, and has SHA-256 `1abf1fa4c4fffbcadf581217e86d56c236c1c03153217540aad49c6823450692`. For the September 13 Vancouver day, the actual ordering is Gemini then Pets.

`newsstand.html` pins `newsstand-selection.js?v=0f489491e159fe05` and `newsstand-stories.js?v=0800063ad653aa8a`; each is the exact first 16 hexadecimal characters of its current bound SHA-256.

Verification passed:

- `node scripts/test-newsstand-selection.mjs` — current ordering, preserved archive/stale ordering, and known-bad archive-reorder calibration.
- `node scripts/build-newsstand-derivatives.mjs --check` — current=5, archive=77, bound to the current stories SHA.
- `node scripts/test-newsstand-reader-browser.mjs` — 68 checks across desktop, mobile, archive, Daily, Big Picture, crossword, and keyboard journeys.

No public, canonical, or projection files were edited in this review. The projection owner reported publisher CHECK and idempotence as passed; I did not rerun those owner checks.
