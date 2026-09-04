# Chick Flicks Listen — current-site colour correction

Date: 2026-09-04
Viewport references: 1280 × 900
Candidate checks: 1280 × 900 and 390 × 844

## Visual authority inspected

- `homepage-top-1280.png` — current Homepage chrome and image-led hero.
- `homepage-learn-method-1280.png` — current Start learning section.
- `library-top-1280.png` — current LIBRAiRY masthead and environmental arrival.
- `library-help-1280.png` — current LIBRAiRY pop-art field, lettering, keylines and controls.
- `listen-before-top-1280.png` — rejected muted pastel application shell.

## Candidate inspected

- `listen-final-top-1280.png`
- `listen-candidate-player-1280.png`
- `listen-candidate-extras-1280.png`
- `listen-candidate-top-390.png`

## Visible comparison verdict

The successor now shares the reference pages' exact dark ink, saturated
pink-purple-cyan field, comic texture, image-led hero, heavy keylines and
offset cyan/pink/yellow shadows. The approved Episode 04 VHS remains the
dominant identity. Dark body copy is used throughout; cream type is limited to
the oversized masthead title, matching the current LIBRAiRY title treatment.
The Listen player is no longer black and its caption/recovery surfaces are
mint, yellow or coral rather than generic white cards.

No cropped cover, broken visible image or horizontal page overflow was found.
At 390 × 844 the primary Start Episode 04 button ends at 606px and remains in
the first viewport. The real audio control changed to `Pause audio` after
starting playback. The Watch route remains separate and retains its film-first
stage.

## Mechanical checks

- `node scripts/test-chick-flicks-format-shell.mjs` — pass.
- Known-bad missing-cover calibration — rejected.
- `node scripts/test-chick-flicks-contract.mjs` — pass, 12 checks.
- `git diff --check` — pass.

This is local verification only. No deployment or public-origin verification
was performed.

final result: passed
