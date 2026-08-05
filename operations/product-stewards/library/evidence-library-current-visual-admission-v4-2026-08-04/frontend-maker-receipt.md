# Library visual/frontend maker receipt v4

Candidate: `library.html` SHA-256 `2a30520ebb6fbffc21069e72b726f8691380c740ed8b6b30ab11dc071f4c6a43`.

Shared dependency repair: `content/site/puffy-bookmarks.js` SHA-256 `c66f73109e4c74fd84129d512afc5ddd970f6f4fe6c339bf3ef2e630f6757efe`.

The shared Puffy picker now behaves as a modal dialog on every consuming page: it declares `aria-modal`, traps forward and reverse Tab, prevents the underlying reader from consuming Escape, closes and restores focus to its invoking Save control, and keeps its heading, all ten image-backed sticker choices and Closet action inside the 320px dialog. The repair is in the shared module, not a Library-only patch.

Claude Opus 5 held the predecessor at `6cea43d563659696ecc4058e71eba5fde937083f9f3c9b6a6b0cdb61394b3a90`. This successor removes that review's six concrete visual/frontend defects: an expanded 101s department now renders as another real three-bay metal shelf unit using the existing 101s fascia, recurring section headings meet the desktop scale bar, the Town Library and shelf-guide fields no longer create centred dead bands, every shelf has an explicit labelled pager state, the trailing 72px strip is gone, and the Closet action now says `My Closet in the Sorority House`.

`node scripts/test-library-product.cjs` passes 101 checks, including a rendered 101s-extension fixture with two shelf units, four departments, a legible book and no horizontal overflow. Its deliberate `LIBRARY_PUFFY_FOCUS_CALIBRATION=broken-dialog` input fails on the missing modal contract, proving the shared picker gate can reject the defect. The shelf pager labels now use midnight text on the bright shelf gradient, the exact-section witness waits for its saved heading to settle, and the Tools page-2 witness is bound explicitly. Exact screenshots, the growth witness and route-dependency hashes are bound in `capture-manifest.json`.

No artwork was generated or replaced. This local maker receipt does not prove native Safari/VoiceOver, provider/account sync, deployment, public origin, correction-service delivery, additional admitted books, or whole-town launch.
