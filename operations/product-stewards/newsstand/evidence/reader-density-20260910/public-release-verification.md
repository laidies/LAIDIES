# Public release verification — ordinary Daily reader density

- Verified: 2026-09-10
- Production deployment: `cba636cb-b9a4-4f88-bd9e-7cdc53230356`
- Source commit: `8bf69129`
- Immutable origin: `https://cba636cb.laidies-sunnyvaile.pages.dev`
- Custom origin: `https://laidies.ai`
- Exact deploy input: `/private/tmp/laidies-newsstand-reader-density.cukepW`
- Exact manifest: `/private/tmp/laidies-newsstand-reader-density.cukepW.manifest.json`
- File count: 785
- Total bytes: 863424467
- Whole-artifact identity: `739c45a74c2786c712080ae21d1981e7441349f6eb475b61da40922c68ff0a61`
- Rollback predecessor: `58fdf655-c956-47c5-b314-b2353b13f9b4`
- Rollback artifact: `/private/tmp/laidies-newsstand-sep9-recovery.I0KXNR/full-artifact`
- Rollback identity: `29d23de2d6e632251b03708e8399e8581a017a741bad7f5c23c1ebb5bc9e887f`

## Exact public boundary

- `content/newsstand-design.css`: `2622c327a4068453814feba7281dd7e38c54fd25aa7ab2c1e4c57211b3b189a7` → `9f6139b1975871fdd5887e378e3f2832445a3b58e6df3d3cc888c61a93e9e7a8`
- `newsstand.html`: `76e44e9cd1c6268c815969aebac08740b7b7c398374cf4dfec1471db3594f05c` → `9f47af4e87f2ff34e4ea26c91ea16f731690b0886086363f79ed4e25182f8dc1`
- 783 other files are byte-identical to the predecessor artifact.

## Visitor evidence

Both the immutable and custom origins passed the 56-check NewsStand browser journey at 1440 desktop and 390/320 phone widths, including direct article opening, archive, Daily, Big Picture, crossword and keyboard behavior. Both origins passed the focused reader-scale check: the Astra headline is 29.44px and image 250px at 1280 × 720; the real story paragraph starts at 555.98px; there is no horizontal overflow. Both passed the automated browser 200% check with a 720px CSS viewport, device-pixel ratio 2, no pinch zoom and no overflow. The exact changed-file hashes match on both origins.

Protected custom-origin files `index.html`, `library.html`, `laidies-card.html`, `luminairy.html`, `chick-flicks.html`, `content/newsstand-stories.js`, `content/newsstand-daily-issues.json`, `content/daily-edition-columns.json` and `content/site/sv-topbar.js` match the predecessor manifest exactly. No story prose, story image, issue membership, service data, Homepage, Library, Resident, FAiRY or LUMINAiRY content changed.

Native Safari visual verification was not performed because the Mac UI was locked. This is disclosed separately from the passing automated browser 200% journey; it does not change the exact public byte or responsive-browser results.
