# Postcard QA — 2026-07-24

## Captures

- `source-desktop.png` — inherited thumbnail-grid source
- `postcard-source-art-sheet.png` — all inherited postcard fronts together
- `desktop-arrival-final-v2.png` — final Penny counter arrival
- `desktop-rack-v2.png` — horizontal physical postcard rack
- `desktop-desk-v2.png` — ruled writing sheet, live proof, and dispatch
- `desktop-receive-v1.png` — incoming postcard front
- `desktop-receive-back-v2.png` — incoming postcard back
- `mobile-arrival-v2.png` — mobile counter and title
- `mobile-rack.png` — mobile rack introduction
- `mobile-rack-and-desk.png` — rack-to-writing-desk transition
- `mobile-desk.png` — mobile outgoing sheet and live proof
- `mobile-dispatch.png` — mobile dispatch counter
- `mobile-receive.png` — mobile incoming postcard
- `before-vs-after.png` — direct source/build comparison
- `style-lock-vs-implementation.png` — Episode 04 Heroine style lock beside the
  current implementation

## Checks

- 1440 × 900 and 390 × 844
- no page-level horizontal overflow
- no broken loaded images
- thirteen postcard controls and one selected state
- `?pc=` changes the initial selection and live proof
- note writing updates the postcard back
- compose and receive flip interactions work
- incoming sender, note, front, and MAiKEOVER referral URL remain correct
- `Ai` keeps a lowercase `i` in branded words
- only expected browser diagnostic is Plausible declining localhost analytics

## Visual conclusion

The page construction now reads as one postal journey rather than an image
card grid plus form cards. Penny's room and every postcard front remain
replaceable visual candidates.
