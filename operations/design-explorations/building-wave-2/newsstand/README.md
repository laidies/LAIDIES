# SUNNYVAiLE NewsStand — Wave 2 candidate

**Status:** `BUILT LOCALLY — candidate-only; independent review required`

This is an isolated room-first candidate for the NewsStand, not a replacement
for `newsstand.html`. It restores the missing four-paper object system while
preserving the exact four-publication reader contract.

## What a visitor can do

`enter Paige’s desk → inspect live dated state → pull a distinct physical paper
→ read an eligible story in place or receive an honest notice → put it back to
the invoking paper → search the back-issue crate → optionally play the stand radio`

All changing publication text, status, dates, notices, headlines and sources
are live HTML. The candidate loads the production reader contract and dataset
as read-only inputs; it does not copy or mutate editorial data.

## Asset provenance and limitations

The room backdrop is the existing candidate-only Paige/rack art:
`/assets/building-interiors/delivery-20260724-newsstand-comic-v1/newsstand-paige-rack-comic-candidate-v1.png`.
It is used only to establish the setting. The four papers are deliberately live
CSS/HTML objects rather than a painted current masthead. This avoids reusing
the legacy `TODAY` / `WEDNESDAY` pixels as current identities. Paige/rack art
remains unadmitted and needs Brand exact-use review.

## Deterministic fixtures

`?fixture=baseline` freezes the known source snapshot for the current Tribune
route. `?fixture=quiet`, `hold`, `stale`, `retracted`, and `malformed` prove
the fail-closed desk conditions. Default `live` uses the real current time;
it therefore truthfully makes old checks stale rather than pretending stored
2026-07-25 values are current.

## Boundaries

- No production HTML/CSS/JS/data/shared files are edited.
- No story, source, freshness, correction, account, reader-history, reward or
  release claim is invented.
- This is not art admission, editorial approval, integration, deployment or
  public verification.

## Independent HOLD successor

The candidate now contains the exact four repairs required by the first
independent review: global desk-state labels, direct-hash focus, failed-room-art
fallback and a disabled no-JS control boundary. The successor maker suites pass
20 static and 34 real-browser checks; fresh independent review is still
required before the candidate can be called independently accepted.

See `MAKER-EVIDENCE.md` for checks and remaining gates.
