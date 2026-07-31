# Mall shops construction QA — 2026-07-24

Viewport checks:

- desktop: 1440 × 900;
- mobile: 390 × 844.

Pages checked:

- `/mall/as-seen-on-tv.html`
- `/mall/books-and-records.html`
- `/mall/food-court.html`
- `/mall/gizmos-and-gadgets.html`
- `/mall/hanger-management.html`
- `/mall/last-summer.html`
- `/mall/maiybe.html`
- `/mall/mall-kiosk.html`
- `/mall/rollin-with-my-homies.html`
- `/mall/pieces-of-flair.html`

Results:

- all ten pages activate the new construction;
- all ten interior images load;
- live rooms use the 1672 × 941 WebP derivatives; the original PNG sources
  remain beside them for art review;
- no broken images;
- no page-level horizontal overflow at either viewport;
- mobile rooms retain deliberate native horizontal scrolling at 820px rather
  than shrinking the fixture labels below usable size;
- all three departments in every shop return a non-empty intentional subset;
- As Seen on TV's every-channel mode returns the full 66-item source;
- search updates the ruled register;
- selected items update in place;
- per-shop save/remove actions update their named carry surface;
- the Mall Kiosk spinner selects a real item from the current department;
- Pieces of Flair next/previous controls, three fixtures and 20-source avatar
  reel work; carrying an item updates the original Resident Card state;
- the overlapping generic “You are here” chip is suppressed on these spatial
  pages while the global navigation remains available;
- browser diagnostics have no page errors; Plausible emits only its expected
  localhost warning.

Visual comparison:

- `source-vs-implementation-arrival.png` compares the actual current storefront
  source with the implemented arrival.
- `style-lock-vs-room-implementation.png` compares the approved Episode 04
  Heroine rendering lock with the installed TV-room candidate.
- The arrival preserves the storefront as a place rather than treating it as a
  decorative card.
- The interior is bright, dimensional and readable, but its ink/halftone
  intensity is not identical to the approved Heroine lock. It remains a
  candidate and is not approved by this QA.

Representative screenshots:

- `as-seen-on-tv-desktop-arrival.png`
- `as-seen-on-tv-desktop-room.png`
- `as-seen-on-tv-desktop-interaction.png`
- `last-summer-mobile-arrival.png`
- `last-summer-mobile-room.png`
- `mall-kiosk-desktop-spin.png`
- `pieces-of-flair-desktop-arrival.png`
- `pieces-of-flair-desktop-counter.png`
- `pieces-of-flair-mobile-arrival.png`
- `pieces-of-flair-mobile-counter.png`
