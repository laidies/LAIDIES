# MAiKEOVER Card surface design QA — 2026-09-03

## Comparison target

- Source visual truth: `source-card-rejected.png`, Ali's 2026-09-03 screenshot,
  plus the direct corrections: remove the background lines, reduce the `Ai`,
  remove boring white text, strengthen the LAiDIES colour and make `No.` real.
- Implementation artwork:
  `../../../assets/building-interiors/maikeover/maikeover-vanity-resident-card-candidate-v6.png`
  at 1672 × 941 RGB.
- Desktop implementation: `implementation-room-desktop.png`, 1440 × 630
  viewport crop; focused Card evidence: `implementation-card-desktop.png`.
- Mobile implementation: `implementation-room-mobile.png`, 390 × 219 viewport
  crop from a 390 × 844 browser viewport.
- Combined evidence: `comparison.png`.
- State: device-local new Card; account-issued number was tested separately with
  the synthetic value `4821`.

## Findings

- No P0/P1/P2 findings remain.
- Typography: the full `Ai` pair is yellow but exactly the same computed size as
  the surrounding header letters. Header, number, name, handle, labels and
  values use deep ink instead of white or muted wine.
- Spacing and layout: the physical Card, portrait recess and HTML text zones
  retain the v5 geometry, so the Card stays centred in the straight-on mirror.
- Colour: the Card is one vivid periwinkle/lavender body with one saturated
  raspberry header and deep-ink type. It does not reintroduce the rejected
  teal–magenta room palette, orange, cherry red, cream or dusty mauve.
- Image quality: all ruled lines and the diagonal ribbon wedges were removed
  from the raster Card itself. The mirror, bulbs, salon furniture and counter
  remain intact; no CSS panel was placed over the physical object.
- Copy/function: device-only state reads `No. NEW`; a positive server-issued
  `resident_number` replaces it after account connection. The browser does not
  mint an official number.

## Comparison history

1. Rejected baseline: pale pink/white body, repeated ruled lines, white header,
   oversized yellow `Ai`, permanent dashes in the number field.
2. Successor v6: line-free saturated physical surface, deep-ink copy, equal-size
   `Ai`, truthful new/account-issued number states. Desktop and 390-pixel mobile
   have no horizontal overflow.

## Follow-up polish

- P3: the entire vanity becomes a thumbnail on a 390-pixel screen, so its small
  Card copy is not intended as the primary readable form there; the semantic
  controls below remain the readable input surface. A separate mobile zoom
  interaction would be a future product choice, not part of this correction.

## Final result

final result: passed

## Functional continuation check — 2026-09-04

- In an isolated real browser session, changed the Card background, Era movie,
  Era TV, soundtrack, Patron Saint, carrying and name. Every choice appeared on
  the MAiKEOVER Card before saving.
- Saved once and opened the Closet. The Closet Card rendered the same selected
  background and all six saved values.
- Returned to MAiKEOVER. The saved controls and live Card restored without a
  second save.
- Changed `Carrying` from `Caboodles case` to `Mall receipt`, saved again and
  reopened the Closet. The existing Card rendered `Mall receipt`, proving a
  later save replaces the same object.
- The journey exposed one mismatch: the device-local Closet rendered
  `No. 0000` while MAiKEOVER correctly rendered `No. NEW`. The Closet now uses
  the same positive-server-number-or-NEW rule and a focused lifecycle guard
  rejects any return of the fake zero number.
- Account-backed cross-device restoration was not rerun because this local
  browser session did not use a real authenticated backend account.
