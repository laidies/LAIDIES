# Chick Flicks rental-store successor — local design QA

Date: 2026-09-02
State: local candidate; not deployed

## Source visual truth

- Approved store interior:
  `assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-rental-store-interior-approved-v1.png`
  — 1672 × 941, SHA-256
  `a2961792a32429605f93558af1c7742906fc4333b1ae413f931ec4c0a633e405`.
- Approved four-bay shelf:
  `assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-four-bay-shelf-v1.png`
  — 1672 × 941, SHA-256
  `5a6ae951e995f84253e423cc8cd8ad5ba3cb295f75787d417124c1f3a56e9486`.
- Approved episode objects: the four exact transparent VHS cases already
  bound in `scripts/test-chick-flicks-contract.mjs`.

## Implementation evidence

- Route: `http://127.0.0.1:4174/chick-flicks.html`.
- Desktop viewport: 1280 × 900 CSS pixels, density 1.
- Phone viewport: 390 × 844 CSS pixels, density 1.
- Desktop: `04-desktop-top-1280.png`, `05-desktop-shelves-1280.png`,
  `06-desktop-counter-1280.png`.
- Phone: `01-phone-top-390.png`, `02-phone-shelves-390.png`,
  `03-phone-counter-390.png`.
- Combined source/implementation inputs:
  `12-store-source-implementation-comparison.png` and
  `13-shelf-source-implementation-comparison.png`.

The full-view comparison covers arrival hierarchy and store recognition. The
focused shelf and counter captures cover case scale, shelf contact, labels,
typography and the selected-state controls; no additional crop is needed.

## Findings and comparison history

- Earlier P1: the prior image read as an office, not a rental store. Fixed by
  replacing it with Ali's exact approved rental-store interior. The desktop
  and phone arrival captures now show walls of VHS cases, rental aisles, a CRT,
  return slot and patterned commercial carpet before any catalogue controls.
- Earlier P1: episode information became a generic repeated card grid. Fixed
  by making the approved physical shelf the catalogue and reducing the lower
  area to one selected-tape counter.
- Earlier P1: the fixed four-case composition could not grow. Fixed by using a
  repeatable four-bay shelf unit; future releases add another shelf at the same
  case size. Phone reflows each shelf into two cases per row.
- Earlier P2: display type forced ordinary headings into capital letters and
  explanatory copy had insufficient contrast. Fixed by reserving Anton for
  the Chick Flicks name/numbers, using Jost in natural case for ordinary
  headings, and explicitly setting white shelf-introduction copy.

No actionable P0, P1 or P2 remains in the captured candidate.

## Required fidelity surfaces

- Fonts and typography: canonical Chick Flicks name keeps its stylisation;
  ordinary headings and copy use natural-case Jost with readable phone wraps.
- Spacing and layout rhythm: title, store, quick routes, shelf, selected
  counter, forthcoming state and trailer form one clear browsing sequence.
- Colours and tokens: exact live Homepage/LIBRAiRY midnight, pink, coral,
  purple, cobalt, cyan, sky, mint, lime, yellow and cream remain bound.
- Image quality and asset fidelity: both approved environment assets render at
  their native 16:9 relationship; all four transparent tape cases remain
  uncropped and physically seated on the shelf.
- Copy and content: masthead filler is removed, headings use natural case,
  Episode 05 has no fabricated tape/action, and release language makes no
  unsupported weekly claim.

## Interaction and browser result

- Clicking Episode 04 set `#episode-04`, marked that tape current, showed only
  its counter record and focused `The Founding Mothers`.
- Read, Listen and Watch remain direct native links for all four releases.
- 390px and 1280px both had `scrollWidth === innerWidth`; no loaded image was
  broken; browser developer logs were empty. Episode 04's phone actions each
  measured 274 × 50 CSS pixels.
- Fail calibration replaced the approved interior path in a scratch page with
  the rejected office-like room. The direct-entry gate rejected both the
  missing approved store and the returned rejected room.

Residual gaps: native Safari/VoiceOver, 200% zoom and deployed-origin checks
were not run. Those are release gates, not evidence against this local visual
candidate.

## Final result

passed
