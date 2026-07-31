# Cycle 9 four-chapter Homepage — design QA

**State:** local review candidate; no live or production mutation
**Version:** 128
**Date:** 2026-07-30

## Controlling direction

- Preserve the exact approved full-width masthead and once-per-session Rewind
  Era arrival.
- Keep Daily Buzz as a distinct public daily-paper rail.
- Organize the Homepage into four clearly titled chapters:
  What’s happening around town; Your next stop; How LAiDIES works—and why it
  matters; Move to SUNNYVAiLE.
- Preserve the nine direct destinations and keep Join the town only in the
  resident journey.
- Use electric LAiDIES colour families, approved imagery and adult
  graphic-novel styling. No beige, solid-plum panels, editorial whitespace,
  fake maps or stacked boxes inside boxes.

## Current implementation

- The masthead remains the existing protected component.
- Its four actions point directly to the four Homepage chapters.
- Sign in remains a separate, visible account action in the global header.
- The first chapter separates:
  - the current Wednesday episode and full Tour
  - signed-in What’s New return information
  - Daily Buzz, the public daily newspaper
- The second chapter exposes nine direct image-backed routes with one shared
  card system.
- The third chapter preserves the full five-part learning method and connects
  it to women’s role in computing and AI.
- The fourth chapter explains the Resident Card, Closet, supported progress,
  collections, resident experiences, signup and Postcard-only path.

## Responsive behaviour

- Desktop: Daily Buzz is a sticky full-height right rail.
- Mobile/intermediate: Daily Buzz follows the current-town chapter immediately
  before the direct destinations.
- Masthead actions are four equal columns on desktop, two-by-two at
  intermediate widths and one column on narrow mobile.
- Destination cards are equal within each responsive grid.
- Major two-column explanations collapse to one reading column on mobile.
- No horizontal overflow was observed at the 390px mobile verification width.

## Functional checks

- `preview.js` passes `node --check`.
- The local preview returns HTTP 200.
- Global header destinations are normalized to real pages or current chapter
  anchors.
- Episode, Daily Buzz, NewsStand, class, LIBRAiRY, KSVL, activity, community,
  town, Closet, Resident Card and Postcard actions have explicit destinations.
- The Product Steward system check passes.

## Remaining gate

This is a local visual/product proposal. It is not deployed and does not
inherit public release authority. Identity/Closet persistence remains limited
to the separately recorded platform proof and must not be broadened by
Homepage copy.

**Result:** ready for Ali’s local visual review.
