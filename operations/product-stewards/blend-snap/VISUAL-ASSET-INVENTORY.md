# Blend & Snap visual asset inventory

**Status:** ASSET-DISCOVERY RECOVERY — STUDY PACK STOREFRONT BINDING COMPLETE;
FULL BUILDING TREE REVIEW OPEN  
**Product:** Blend & Snap  
**As of:** 2026-07-28  
**Owner:** Blend & Snap champion  
**Trigger:** Study Pack storefront used non-canonical episode imagery

## Discovery evidence

- Owned route in this bounded cycle: the local Study Pack storefront and its
  four episode-detail states.
- Source files scanned: Study Pack `App.jsx`, `styles.css`, prototype assets,
  canonical episode routes/cue files and canonical episode title-card folders.
- Data/content registers scanned: Episode 01–04 route bindings and Study Pack
  operating specification.
- Desktop/mobile evidence: required after the 2026-07-28 repair.
- CSS backgrounds/pseudo-elements checked: the storefront tint overlay was
  identified as obscuring the supplied title art and removed.
- Missing/broken/unreachable images: none in the bounded storefront source
  binding; full parent-building and subproduct tree scan remains open.

## Asset disposition register

| Asset ID | Exact file/source | Route · state · placement | Family | Governing references | Current finding | Disposition | Reason | Output | Exact-use verdict |
|---|---|---|---|---|---|---|---|---|---|
| `ep01-title` | `assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png` | Storefront and Episode 01 pack hero | Episode title art | Episode 01 public route | Canonical 1920×1080 title card | KEEP | Exact requested episode identity | `prototype/public/assets/episodes/episode-01.png` | Exact source copy |
| `ep02-title` | `assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png` | Storefront and Episode 02 pack hero | Episode title art | Episode 02 public route | Canonical 1920×1080 title card | KEEP | Exact requested episode identity | `prototype/public/assets/episodes/episode-02.png` | Exact source copy |
| `ep03-title` | `assets/episodes/ep-03/comic/ep03-title-card-comic-v2.png` | Storefront and Episode 03 pack hero | Episode title art | Episode 03 public route | Canonical 1920×1080 title card | KEEP | Exact requested episode identity | `prototype/public/assets/episodes/episode-03.png` | Exact source copy |
| `ep04-title` | `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png` | Latest selector and Episode 04 pack hero | Episode title art | Episode 04 public route | Canonical 1920×1080 title card | KEEP | Exact current-week identity | `prototype/public/assets/episodes/episode-04.png` | Exact source copy |
| `storefront-old-episode-art` | Previous four prototype episode images | Storefront selectors and pack heroes | Alternate episode imagery | None stronger than canonical title art | Did not match current title cards | REPLACE | Ali requested exact episode title artwork | Four bindings above | Removed from active rendering |

## Complete-page verification

- Exact candidate: Study Pack storefront local prototype, 2026-07-28 repair.
- Desktop render: blocked when the in-app preview tab became unavailable after
  the code repair; earlier screenshot is superseded evidence only.
- Mobile render: blocked for the same reason.
- Meaningful state renders: storefront plus Episode 04 detail still required.
- Broken/missing image result: source copies and build paths pass; rendered
  browser result still required.
- Stale/superseded/rejected asset result: active render now binds only the four
  exact title-card copies.
- Independent page-level verdict: pending.

## Ali decision boundary

None for this bounded repair. Ali already selected the exact episode title art,
latest label and smaller-card direction.

## Freshness and next trigger

- Re-run when the current episode changes, an episode title card is replaced,
  or the Study Pack moves from prototype to the public Blend & Snap route.
- Next action: complete desktop/mobile browser evidence, then continue the full
  Blend & Snap owned-tree visual inventory as a separate parent-building cycle.
