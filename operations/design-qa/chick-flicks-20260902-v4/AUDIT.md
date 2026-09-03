# Chick Flicks trailer-on-shelf QA

Date: 2026-09-02

## Evidence

- User-rejected source: `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-bee66a08-9664-4aa7-a26d-e9203fd8b4dc.png`, 2212 × 970 px.
- Approved sleeve source: `assets/media/opening-day-covers-v1/trailer/trailer-master.jpg`, 3000 × 3000 px.
- Full comparison: `comparison-standalone-to-shelf.png`, 2752 × 810 px.
- Focused asset comparison: `comparison-trailer-art-to-case.png`, 1291 × 810 px.
- Desktop shelf, shelf expansion and trailer dialog: `implementation-desktop-*.png`, 1440 × 1100 CSS px at density 1.
- Phone shelf, shelf expansion and trailer dialog: `implementation-mobile-*.png`, 390 × 844 CSS px at density 1.
- State: trailer stored as the first clearly labelled tape; Episodes 01–03 complete shelf one; Episode 04 begins shelf two; trailer detail dialog open in interaction captures.

The rejected and implemented full views intentionally represent different catalogue structures: the source proves the detached-panel defect; the implementation proves the requested shelf integration. The focused asset sheet compares the same trailer artwork before and after physical VHS packaging.

## Findings

- No actionable P0/P1/P2 differences remain.
- Typography: `Start here · Trailer` prevents the first tape from reading as Episode 00. Existing Jost hierarchy and natural title casing remain intact. All generated cover lettering was checked character-for-character against the approved trailer master.
- Spacing/layout: four equal bays remain at desktop size; the second four-bay shelf begins with Episode 04 instead of shrinking five items into one row. Phone layout holds two cases per row, with the partial second shelf using one physical row. No horizontal overflow was measured at 390px.
- Colours/tokens: the yellow trailer shelf label adds hierarchy using the existing Homepage/LIBRAiRY palette; the purple/cobalt catalogue and pink/cyan shelf environment are unchanged.
- Image quality/assets: the new case is 1024 × 1536 RGBA, has a genuine transparent exterior, retains the exact approved trailer composition, and matches the clear-clamshell episode family. The first generated export baked its checkerboard into RGB pixels and was rejected before integration; the admitted case removes that defect.
- Copy/content: the oversized standalone `Watch the trailer` panel is absent. The shelf label, orientation sentence and `Play the trailer` action are concise and public-facing.
- Interaction/accessibility: selecting the trailer opens the same native rental dialog immediately; the dialog exposes one truthful action, has a visible Close control, and has no browser errors at desktop or phone size.

## Comparison history

1. P1 incumbent: the trailer appeared as an unrelated oversized promotional panel beneath the catalogue.
2. P2 asset attempt: the otherwise suitable clear case used a baked checkerboard instead of real transparency.
3. Fixes: moved the trailer to the first shelf bay, labelled it separately from numbered episodes, removed the detached panel, added a second repeatable shelf, and converted the case exterior to real alpha.
4. Post-fix evidence: the full comparison shows one coherent video-store catalogue; the focused sheet shows sleeve fidelity; desktop and phone captures show the shelf-growth model and the immediate trailer dialog without overflow.

Primary interactions tested: trailer-tape open, visible Close, one Play action, direct `#trailer` state, shelf growth at desktop and phone widths, no horizontal overflow, and no console errors.

final result: passed
