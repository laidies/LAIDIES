# Cycle 8J — Homepage continuous-capture successor

Status: ACTIVE BRIEF / ISOLATED LOCAL EVIDENCE ONLY

## Objective

Replace only the invalid Cycle 8I capture evidence. Preserve the exact frozen
Cycle 8I baseline, candidate HTML, candidate CSS and contrast result byte for
byte. Produce continuous, inspectable desktop and mobile full-page evidence
that allows independent judges to see every downstream section.

## Exact predecessor

- Cycle 8I manifest SHA-256:
  `52c41416d138d8344f7b0e28f11c84030335b991d2b10e27b5799dd7570632de`
- Town Entry HOLD SHA-256:
  `9ae0cc5d6b9de2f16f8ff3e4d0248bcc7cae3d467ce122e92dc224f19fab9b15`
- Brand HOLD SHA-256:
  `e66f5895d9502308b17c090c1771091bf3084c11e95301ca0ae40b596386a067`

## Sole write scope

`operations/design-explorations/sitewide-style-championship-20260726/cycle-8j/homepage-continuous-capture-successor/`

Copy the exact frozen Cycle 8I baseline, candidate and contrast evidence into
this path. Do not edit their bytes.

## Capture contract

Use the bundled local Chromium executable:

`/Users/alisoneakin/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`

Use a fresh browser context and page for each capture:

- desktop viewport `1440x900`;
- mobile viewport `390x844`;
- load the local candidate or baseline;
- scroll the entire document in bounded steps to trigger lazy images;
- wait for every governed image to report complete with non-zero natural size;
- return to the top;
- capture one true continuous full-page PNG;
- record viewport, document width, scroll width, full document height, image
  completeness and section bounding boxes.

Reject immediately if a capture repeats the masthead, contains blank bands,
omits downstream sections, clips content, hides a governed image, or has
horizontal overflow.

## Required invariants

- Cycle 8J baseline HTML equals Cycle 8I baseline HTML byte for byte.
- Cycle 8J candidate HTML equals Cycle 8I candidate HTML byte for byte.
- Cycle 8J candidate CSS equals Cycle 8I candidate CSS byte for byte.
- Cycle 8J contrast evidence equals Cycle 8I contrast evidence byte for byte.
- `18/18` governed image jobs are present and complete.
- held Dream Phone, NewsStand and map art remain absent.
- text, IDs, links, controls and runtime bindings remain unchanged.
- the incumbent masthead source and geometry remain unchanged.
- no live, shared, production or public file is changed.

## Acceptance

Freeze a new checksum-bound manifest and comparisons only after all capture and
invariant checks pass. Dispatch fresh judge-only Town Entry and Brand reviews.

Any HOLD closes Cycle 8J. Only both PASS verdicts may authorize a bounded Ali
visual decision package. They do not authorize integration, deployment or
publication.
