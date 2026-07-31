# SUNNYVAiLE LIBRAiRY experience reset — 2026-07-24

Status: `LOCAL REVIEW READY`

## Owner feedback addressed

- The shelves are now the primary interface and the page explicitly says that
  featured book covers open in place.
- The masthead is a compact, high-contrast sign instead of light text sitting
  directly on the busy room image.
- `Ai` remains the adjacent brand accent in both names, but uses restrained
  cyan rather than the rejected white-and-pink treatment.
- Ask Miss Jeeves no longer overlaps or hides the bottom row of books.
- The oversized white Puffy panel and four-colour candy stripe are removed.
- The orientation section explains all three shelves, the book reader, Miss
  Jeeves and Puffy. Puffy is correctly presented as an optional saving shortcut,
  not the purpose of the LIBRAiRY.
- On mobile, the image interaction is replaced by the explicit scrollable book
  catalogue, and the masthead instruction changes from “click” to “browse below
  and tap.”
- The completed bright fifteen-cover family is now wired into both the visual
  shelf overlays and the mobile catalogue from
  `assets/library-101/bright-family-v2/`; the historical covers remain intact.
- Forthcoming covers now say `Lands EP 5`, `Lands EP 7`, or `Lands soon`
  instead of silently behaving like broken controls.
- The orientation sequence is now three different actions: pick a shelf, open
  a book, and read your way. Miss Jeeves is the alternate help path.

## Evidence

- `01-before.png` — captured current candidate before correction.
- `03-revised-desktop-mid.png` — revised page at the normal in-app preview
  width.
- `04-revised-1440.png` — automated 1440-wide capture. The browser’s full-page
  image encoder produced a visibly incorrect narrow rendering despite DOM
  geometry proving a 1440px page, so this file is not relied on for visual
  approval.
- `05-revised-mobile-390.png` — automated full-page mobile capture with the same
  encoder defect.
- `05b-revised-mobile-390-viewport.png` — reliable 390×844 viewport capture.
- `08-bright-covers-and-real-steps.png` — reliable 1280×720 shelf capture with
  all fifteen bright covers and seven visible release-state labels.
- `09-real-steps-guide.png` — focused guide capture showing the corrected
  visitor sequence.
- `11-bright-covers-mobile-overlay.png` — mobile proof before the large hero
  release labels were removed; retained as iteration evidence.

## Functional QA

- Vocab 101 opens from the mobile shelf and renders the `Vocab 101` reader.
- Vocab 101 also opens from the overlaid desktop cover; ChatGPT remains a
  labelled non-clickable preview.
- All fifteen bright cover overlays load; seven forthcoming titles carry
  explicit release-state labels on desktop and in the mobile catalogue.
- “Will AI take my job?” returns the direct Miss Jeeves answer “Not as one
  blanket yes or no.” with two relevant deeper-reading links.
- No loaded image is broken at 390px or 1440px.
- No horizontal page overflow at 390px or 1440px.
- `node scripts/check-inline-js.js` — PASS, 353 scripts / 132 pages.
- `node scripts/check-local-links.js` — PASS, 1,906 references / 110 pages.
- `node scripts/check-town.js` — PASS.
