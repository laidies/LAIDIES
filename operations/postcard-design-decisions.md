# Postcard writing-desk construction — 2026-07-24

## Decision

The postcard route is a working visit to Penny's Post Office counter, not a
gallery of image cards followed by a form. The page now moves through four
connected physical moments: counter arrival, postcard rack, writing desk, and
outgoing dispatch.

## Construction grammar

- Penny's dimensional-comic counter is the full-width arrival.
- All thirteen postcard fronts sit in one native horizontal rack. One selected
  postcard travels to the writing desk.
- The note and sender handle live on a ruled outgoing-mail sheet rather than
  separate rounded fields.
- The live front/back preview shares the desk with the note and remains
  directly flippable.
- Share, text, email, and copy actions live together at one near-black-blue
  outgoing-mail counter.
- The BEST FRIENDS explanation is a claim ticket on that counter, not another
  floating card.
- Receive mode reverses the same journey: the selected postcard arrives on one
  dark stage and hands the visitor to the MAiKEOVER.

## Preserved behaviour

- All thirteen original postcard IDs, labels, and files remain.
- `?pc=` starts the writing desk with the correct selected front.
- The note still updates the postcard back live.
- Resident Card handle prefill remains.
- Native share, SMS, email, and copy-link paths remain.
- Incoming `?from=`, `?pc=`, and `?note=` URLs still render the correct sender,
  front, and message.
- Invitation referrer storage and the MAiKEOVER `?from=` handoff remain.

## QA result

Compose and receive modes pass at 1440 × 900 and 390 × 844 with no page-level
horizontal overflow. Card selection, note proof, both flip controls, incoming
message rendering, and MAiKEOVER referral URL were exercised. The blank initial
preview source is corrected.

## Art boundary

The installed Penny counter is candidate art. The thirteen inherited postcard
fronts are predominantly from the darker painterly site direction and are
explicitly replaceable. The rack, writing desk, proof, receive stage, and
dispatch construction remain valid when each front is replaced.
