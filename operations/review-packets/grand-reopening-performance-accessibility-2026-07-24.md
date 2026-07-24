# Grand re-opening · performance and accessibility fallback QA

**Status:** VERIFIED FALLBACK PASS; full Core Web Vitals trace still open
**Candidate:** `59758f5be9539bed95f056855ad9d214f851876e`
**Immutable deployment:** `https://1cf53be9.laidies-sunnyvaile.pages.dev`
**Viewport:** 390 × 844 mobile; repaired pages also checked at 1440 × 900

## Scope and limitation

The configured Codex environment does not expose the Chrome DevTools
performance service required for a proper Lighthouse/Core Web Vitals trace.
Therefore this packet does **not** claim measured LCP, CLS or INP.

The fallback used:

- real-browser route and DOM checks;
- coarse browser navigation duration;
- direct HTTP timing and transfer-size inspection;
- semantic document/heading/landmark checks;
- broken-image, duplicate-ID and horizontal-overflow checks; and
- keyboard focus checks on the LIBRAiRY book dialog.

## Core route results

These deployed routes loaded at mobile width with no loaded broken image,
duplicate ID or horizontal overflow:

- `/`
- `/visitors-centre`
- `/library`
- `/newsstand`
- `/radio`
- `/chick-flicks`
- `/watch?ep=01`
- `/watch?ep=02`
- `/watch?ep=03`
- `/watch?ep=04`
- `/games/dream-phone`
- `/community`

Browser-controller navigation observations were approximately 780–977 ms
after a 700-ms stabilization allowance. These values are useful comparative
diagnostics, not browser paint metrics.

## HTTP and payload observations

On the test connection:

- document TTFB across the core sample was approximately 70–124 ms;
- HTML transfer sizes were approximately 18–91 KiB;
- the homepage's primary above-fold image was
  `/assets/sunnyvaile-streets/main-street-dusk.webp`;
- that hero is 260,804 bytes at 1400 × 788; and
- the current build remains 1,083 payload files / 1001.30 MiB with no missing
  or over-25-MiB file.

No performance rewrite is justified from these observations alone. A full
trace is still required before claiming the performance gate is complete.

## Objective repairs completed

### Town LIBRAiRY

- Added a complete HTML document boundary and `lang="en"`.
- Added a useful meta description and canonical URL.
- Added one `main` landmark while preserving the visual room.
- Labelled the book reader as a modal dialog using the current book title.
- Opening a book moves focus to “back to the shelf.”
- Closing returns focus to the book that opened it.
- The page retains one H1, no broken images and no overflow at mobile and
  desktop widths.

### Community

- Changed “Open the resident file” from a second H1 to the section H2.
- The page now has one visible H1 and retains its existing layout.

### Miss Jeeves search

- Clicking the visible “what's a hallucination?” suggestion now returns:
  Hallucination (glossary), Episode 2, Visitor Centre, Dream Phone, Episode 1
  and Episode 4.
- The repair normalizes the contraction while leaving the friendly visible
  wording intact.

## Still open

- A Chrome DevTools/Lighthouse trace measuring LCP, CLS, INP, render-blocking
  work and network dependency chains.
- Automated colour-contrast analysis.
- A complete keyboard-only walkthrough of every public building.
- Real-device/field performance after the custom-domain cutover.

These open checks do not erase the verified fallback findings, but they prevent
the broader performance/accessibility gate from being called complete.
