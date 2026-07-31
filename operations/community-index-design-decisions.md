# Community index construction — 2026-07-24

## Source diagnosis

The source page repeated the same nine room destinations twice: first as a
generic prompt-card grid and later as a second generic room-card grid. The
resident directory was another rounded card shelf, so the page read as three
separate catalogues rather than the Sorority House community itself.

The functional source was worth preserving:

- nine working community-room destinations;
- six resident-file filters;
- seven existing resident and town-regular records;
- the Resident Card handoff;
- member cards loaded from the existing local-storage record;
- in-place resident detail; and
- the Wednesday return parameters used by the weekly flow.

## Construction decision

The page is now designed as a visit to the Sorority House rather than a set of
boxes:

1. The existing house common room is the full-width arrival.
2. The entry explains the one useful action expected in the room.
3. The nine destinations live in one numbered, open room directory on a
   near-black-blue house wall. They are rows in one place, not nine cards.
4. Resident records form one horizontal physical file reel. The reel is
   intentionally browseable without turning every record into a new page
   section.
5. Opening a record produces one split resident file in place, with the
   portrait on the left and useful context on the right.
6. Resident access is a final open checkout, not another floating sign-up card.

This gives each major job a different spatial treatment: arrival, directory,
file reel, open record, and access desk.

## Preserved behaviour

- All nine room URLs remain directly reachable.
- `from=this-week`, `issue`, and `draft` parameters continue into every room.
- The Wednesday return now lives with the entry actions instead of floating
  over page content.
- All six filters operate on the existing tag vocabulary.
- Existing local Resident Cards still insert before town stock records.
- Resident records open by pointer, Enter, or Space.
- The record overlay moves focus to Close, exposes its `aria-hidden` state,
  closes by button, backdrop, or Escape, and returns focus to the opener.
- The Resident Card intake route is unchanged.

## Visual boundary

- The house interior is the current painterly Sorority House source and is a
  structural bridge only. It is not an approved image-generation reference.
- The rejected pink-tracksuit June image is absent.
- Existing founder photographs and town-character portraits remain because
  they are the real current record sources. Their mixed directions are an
  explicit future visual-unification dependency, not a new art lock.
- No fake CSS illustration or replacement person was created for this pass.
- The vivid interface palette and dimensional type follow the approved site
  direction; the Episode 04 Heroine face remains the only locked character
  style reference.

## QA result

- 1440 × 900: no page-level horizontal overflow or broken loaded images.
- 390 × 844: no page-level horizontal overflow or broken loaded images.
- Nine room destinations, seven source records, six filters, stock filtering,
  desktop/mobile record modal, focus return, and weekly-route propagation
  passed.

