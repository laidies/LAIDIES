# Resident Card construction — 2026-07-24

> **CURRENT ACCOUNT BOUNDARY — 2026-08-23.** This update supersedes the
> preserved-behaviour statements below where they imply a publicly verified
> account lifecycle. Resident Card owns the sole private sign-in-link request
> desk. A request proves neither message delivery nor account creation.
> Account-backed Card claiming, restoration and cross-device continuation
> remain held until their complete public lifecycle is verified. MAiKEOVER and
> the Closet continue to use the device-local Card without escalating it into
> account, public-profile, reward or ownership truth. The shared header,
> NewsStand and other ordinary town pages must not automatically mount or run
> account-backed continuation while that lifecycle remains held.

## Decision

Resident Card is the MAiKEOVER intake experience, not a generic account form.
The page now moves through one salon arrival, one Post Office intake sheet, and
one optional consultation. Existing authentication and profile code remains in
place.

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
