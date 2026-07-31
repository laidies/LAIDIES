# Community index QA — 2026-07-24

## Source truth

- `source-desktop.png`

The source capture was made before implementation. It records the duplicated
room-card directories, rounded entry panel, rounded resident shelf, and fixed
return treatment.

## Desktop construction

- `desktop-arrival-final.png`
- `desktop-rooms-v1.png`
- `desktop-rooms-lower-v1.png`
- `desktop-resident-file-v1.png`
- `desktop-resident-modal-v1.png`

## Mobile construction

- `mobile-arrival-v1.png`
- `mobile-entry-actions-v1.png`
- `mobile-rooms-v1.png`
- `mobile-resident-file-v1.png`
- `mobile-resident-modal-v1.png`
- `mobile-pass-v1.png`

## Required comparisons

- `before-vs-after.png`
- `style-lock-vs-implementation.png`

The style comparison is a construction check only. The current Sorority House
interior and mixed resident-photo sources remain explicit replacement
dependencies and must not be used as future generation references.

## Functional result

- Nine community-room destinations present and directly reachable.
- Six resident-file filters present; Stock Cards reveals FAiRY Godmother,
  Mme CLAi-O, and Deb.
- Seven existing resident/town records open in place.
- The record overlay opens by keyboard or pointer, receives focus, closes by
  button/backdrop/Escape, and returns focus.
- `from=this-week&issue=4&draft=1` propagates into room destinations.
- The weekly return is an in-flow entry action.
- Desktop and 390px mobile show no page-level horizontal overflow.
- No broken loaded images were found.

