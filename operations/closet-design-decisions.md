# Closet / Town Wallet construction — 2026-07-24

## Source diagnosis

`laidies-card.html` already contained one of the most useful systems in the
project, but presented it as an 8,000px pale profile page:

- a small cropped closet banner;
- a rounded wallet shell;
- a 17-card building grid;
- a nine-card dashboard;
- four luminary cards;
- eight weekly-tour cards plus six optional cards;
- nine separate rounded collection vessels;
- a wish balance card; and
- a leaderboard teaser card.

The problem was not a lack of functionality. The page had become a sequence of
containers with no strong sense that the resident was inside her Closet.

## Construction decision

The route is now a full resident room with distinct jobs:

1. The real Closet interior is the full-width arrival.
2. A near-black-blue Town Wallet room holds the real two-sided Resident Card,
   its edit/share actions, seventeen literal building membership cards, and
   one ruled “change it where it lives” trip guide.
3. Report Card counts are one ruled scoreboard, not nine floating cards.
4. Luminaries are one shared illuminated nameboard.
5. The Wednesday ritual is one horizontal eight-stop route rail with a
   separate optional-departures register.
6. Collections are an open closet wall. Every existing object keeps its own
   shelf, but the shelves share one architecture instead of nine rounded
   vessels.
7. FAiRY Plays Bank is a dark balance counter with the earning rules beside
   the real count.
8. Town Leaderboards is one honest open notice until residents exist.
9. Editing opens in a focused desktop side drawer / mobile full-width drawer,
   with a persistent Close control and focus return.

Literal Resident Cards and membership cards remain cards because they are the
actual objects. Generic navigation and text content no longer borrow that
shape.

## 2026-08-30 self-only recovery

Ali requested recovery of the remaining Closet functionality. The 17 building
visit cards, Report Card and four Luminary picks retain their existing local
behaviour and are restored only in the visitor's own Closet. Public-card routes
hide all three before any awaited lookup and do not first paint the local
Resident's identity. This does not create cross-device backing for those local
records or admit public handles, sharing, balances or leaderboards.

Status: VERIFIED LOCALLY; not deployed. The scoped guard rejects the prior
hidden source, and the Resident browser suite passes 155/155 checks including
self visibility at desktop/mobile sizes, 17 Visit links, public/invalid/missing
profile isolation, existing Card behaviour and intentional holds. NewsStand's
deployment hold remains active; release must overlay the exact successor and
receive fresh live verification. Native Safari/physical-device testing remains open.

## Preserved behaviour

- Resident Card front/back flip.
- Own/public Closet modes and public-route loading.
- Existing profile cache, Supabase profile, save, and share flows.
- Seventeen building visit records and direct Visit links.
- Nine live Report Card counts and their jump-to-shelf behaviour.
- Four Luminary picks and their source-building routes.
- Eight Wednesday stops, checked state, weekly reward, and six optional stops.
- Puffy board, sticker book, merit sash, best-friend necklaces, charm
  bracelet, butterfly-clip jar, trading-card binder, detention slips, and
  locked diary.
- FAiRY wish balance and leaderboard truth.
- Existing real local-storage and reward-event sources remain authoritative.

## Visual boundary

- The bright Closet interior is effective structural art but remains a
  photographic/painterly bridge rather than the locked Episode 04 character
  style.
- No new person or fake replacement object was generated.
- Existing collection objects and live reward art remain the real content.
- The empty archetype area stays honest while the planned 24 illustrated
  avatars are unfinished.
- The rejected June image and all rejected building art remain absent.

## QA result

- 1440 × 900: no page-level horizontal overflow or broken loaded images.
- 390 × 844: no page-level horizontal overflow or broken loaded images.
- Seventeen membership cards, nine Report Card counts, eight tour stops,
  Resident Card flip, dashboard jump, editor open/close/focus return, and
  direct building/tour links passed.
