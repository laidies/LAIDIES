# Resident Card construction — 2026-07-24

## Decision

Resident Card is the MAiKEOVER intake experience, not a generic account form.
The page now moves through one salon arrival, one Post Office intake sheet, and
one optional consultation. Existing authentication and profile code remains in
place.

## Identity and continuation — locked 2026-09-02

- The Resident Card is how LAiDIES recognizes a resident. It is not merely a
  decorative card saved in one browser.
- The signed-in Resident Card account keeps the Card and the continuation data
  explicitly admitted by the shared identity contract available across devices,
  and it owns clear sign-in and sign-out states.
- MAiKEOVER must explain that relationship in the primary journey: make the Card
  at the vanity, then sign in through the single Resident Card account desk to
  keep the supported Card and saves across devices. It must not imply that an
  unsigned local draft is already synced.
- A device-local draft may remain as a resilient fallback, but it is secondary
  state/explanation rather than the product's defining promise.
- This decision does not authorize a second email intake inside MAiKEOVER,
  public Card sharing, unadmitted collection sync, avatar generation, or a
  broader cross-device promise than the currently admitted continuation fields.

Source: Ali direct product clarification, 2026-09-02.

## Construction grammar

- The dimensional-comic MAiKEOVER vanity establishes the room.
- The email/magic-link surface is one ruled Post Office intake sheet with one
  primary action, not a rounded membership card.
- Confirmation, pending-mail help, privacy, and status states stay on that same
  sheet.
- The four optional profile groups form one open consultation. Each group is a
  ruled accordion row and its values behave like underlined swatches rather
  than pill cards.
- Parlor and homepage exits form one open two-column route strip.

## Preserved behaviour

- Supabase configuration, magic-link sending, resend, pending-mail state,
  newsletter opt-in, sign-out, and reset wiring are unchanged.
- The original `laidiesMemberPass` and `laidiesMemberAuthPending` storage keys
  remain.
- All 31 optional profile choices and four profile groups remain.
- Existing auto-advance between consultation groups remains.
- Existing privacy, terms, MAiKEOVER, and homepage routes remain.

## QA result

Desktop and 390 × 844 mobile pass with no horizontal overflow and no broken
images. The email field, primary action, four profile groups, and 31 profile
buttons remain present. Accordion and single-choice state were exercised; the
temporary QA selection was removed with the page's own reset action.

## Art boundary

The vanity is the same installed structural candidate used by MAiKEOVER and
Try-On. It supports the mechanic but remains lighter and peachier than the
approved Episode 04 Heroine style lock.
