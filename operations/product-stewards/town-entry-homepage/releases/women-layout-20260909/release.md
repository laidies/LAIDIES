# Women feature responsive layout correction

Status: VERIFIED PUBLICLY on 2026-09-09. Production `0e2980b4-dd10-475d-af0e-df93c645ae39`, source commit `cdef4a99`; receiving production `069f58a8-4871-4f4e-9797-5544a29ed972`. Preview `d8f70d5c-64d3-42ea-9e6c-897dbf63bd81` was verified before production.

Live: https://laidies.ai/#why-laidies-title
Immutable: https://0e2980b4.laidies-sunnyvaile.pages.dev/#why-laidies-title

## Exact change

Restore the accepted footer: two existing CTA pills span both columns. Stack the feature at 1050px and below; use two columns above. Retain image and quote together, full source pixels, pink labels, font family, complete wording and link destinations. Reuse the 1380px maximum feature width and 1.2rem wide text from the earlier approved preview. Phone buttons stack at 700px and below. No fixed content heights, clipped copy or cropped image were introduced.

The committed index.html beside this record is the exact production source. Root index.html contains additional pending homepage work and must not be promoted wholesale.

## Verification and review

- Exact content comparison retains all feature words, image/link/alt attributes. Changes are scoped CSS and moving the unchanged CTA wrapper beneath both columns.
- Incumbent fails the direct-footer and intermediate-width stacking requirements; this calibrates the checks against the actual reported defect.
- Local real-browser matrix: 390, 768, 960, 1050, 1051, 1100, 1440 and 1920px. No horizontal overflow; original image aspect ratio, both pink labels, contained controls and full-width footer retained. Both sides of the breakpoint were inspected.
- Independent read-only Terra / Medium reviewer `/root/release_preservation_review` inspected the exact source diff and final desktop, intermediate and phone renders. ACCEPT: no visible regression; image and quote retained together, correct reading order, no cropping, no detached button column. Remaining small height differences are natural content variation.
- Custom and immutable origins each passed actual browser checks at 390, 960 and 1440px: exact candidate HTML, decoded image, correct grid and direct footer, both labels pink #f254a9, Jost retained, no horizontal overflow. Live 960 and 1440 viewport images were visually inspected.
- Provider canonical head equals the new production. All 780 static file keys retained; only /index.html changed; 779 other provider identities preserved. The unchanged receiving worker source and redirects were used for deployment.
- Evidence: production-provider.json, receiving.json, custom-checks.json, immutable-checks.json, pilot-checks.json and custom-*.png. Browser checks validate this section and exact source preservation; they are not a whole-site product audit or authenticated Resident lifecycle.

## Maker correction and boundaries

An internal row-paired pilot was rejected before independent review because it separated image/quote and introduced a wide gap beneath the introduction. The final solution reuses the settled footer/type treatment and changes the stacking threshold. Tall-element stitched captures could include the fixed header; actual viewport captures were used to judge the phone and intermediate layout.

No copy, image asset, account behavior, radio behavior or other route was redesigned or published here. The broader homepage preview remains separate. The next programme priority is the recovered Resident Card explanation and feature reconciliation: operations/product-stewards/town-entry-homepage/resident-card-explanation-recovered-20260712.md. Ten changeable Puffy designs mark saved places across the site; ten designs is not ten saved places. Do not invent substitute benefits or call intended but unimplemented behavior live.

Exact index SHA-256: `fa1fb919904e324bbbf98a379d91b123c6ce93b4488aebbb2d37cdd42b79379f`.
