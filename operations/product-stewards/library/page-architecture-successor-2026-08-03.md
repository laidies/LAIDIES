# LIBRAiRY page architecture successor

**Status:** SUPERSEDED HISTORICAL CANDIDATE — NOT ACTIVE INSTRUCTION / DO NOT PRESENT OR IMPLEMENT  
**Trigger:** Ali rejected the one-image Library concepts and their weak UX on 2026-08-03.

This packet's pagination and candy-palette directions were withdrawn. Current
authority is `operations/DECISIONS.md` plus `operations/library-decisions.md`:
all matching books stay visible; growth adds physical shelf/room capacity; page
UI does not use the retired candy, white/plum or plum-on-purple treatment.

## Decision

The Library is one cohesive building experience assembled from several live,
expandable zones. It is not one panorama, image map, masthead or fixed canvas.
Generated art supplies empty spatial scenery only. Every word, book, status,
input, result, save, reward and destination is live interface.

## Page sequence

### 1. Entry and truthful state strip

- Page identity sits above the spatial scene and never overlaps artwork.
- One sentence names the Library job: find a useful AI reference, understand
  it and save the exact place you need.
- One state strip changes only when evidence exists:
  - first-time: brief explanation of browse, ask, open and Puffy-save;
  - returning without Card: exact valid same-device saved-find count and
    resume action;
  - device-local Card: same result with optional local name, no privilege;
  - verified account: same device-local Library behavior and explicit no-sync
    truth until account-backed Library continuity is proven.
- No generic `New here?`, `Welcome back` or `Continue` control.

### 2. Miss Jeeves reference desk

- Miss Jeeves is a primary operable feature near the top of the page, not a
  hotspot, desk label or secondary drawer.
- Live form: visible question label, large text input, Ask button, answer/status
  region, source/currentness line, useful admitted destinations and explicit
  retry/zero-result behavior.
- The desk and character may be one bounded image asset. The input/results are
  live UI fitted to a measured clear area beside or within the desk zone; they
  are never baked into art.

### 3. Catalogue search and filter rail

- Live catalogue search is separate from Miss Jeeves: it finds known titles,
  topics and coverage; Miss Jeeves orients a visitor who does not know the
  right vocabulary.
- One reversible filter rail covers collection and publication status, keeps
  an obvious `All` state and updates the live aisle inventory rather than
  revealing a second hidden catalogue.
- Empty results explain how to clear/change filters or ask Miss Jeeves. Index
  load, stale data and malformed results expose an unavailable state and Retry;
  they never look like a truthful zero-result catalogue.

### 4. Expandable collection aisles

- Three repeatable aisle sections: The 101s, Tools and Reference.
- Each aisle has live mounted wayfinding, a repeatable empty-shelf backdrop and
  a data-driven list of real book objects. The art contains no book covers.
- Desktop shows no more than three large book objects per row. Each visible
  cover is at least 160 CSS px wide and each operable target is at least 44 by
  44 CSS px. Mobile uses a vertical shelf/list; it never shrinks a desktop
  room into hotspots.
- Before open, every book object shows cover, title, practical job, coverage,
  expected depth, availability/currentness and the result of opening. A live
  `What is inside?` disclosure may expand in place. Held and preview books
  explain their state and a useful alternative instead of opening.
- An admitted book opens a continuous web reader with contents rail, direct
  section links, exact opener return and whole-book/exact-section Puffy save.

### 5. Saved finds and cross-building handback

- The Closet is not inside the Library. The Library exposes only a clearly
  labelled route such as `Open saved finds in the Sorority House Closet`, with
  a truthful same-device count when valid records exist.
- Puffy is a retrieval marker on the book object and reader section. It is not
  mastery, ownership, a charm or an account reward.
- Library, High, Episodes and NewsStand continuations appear after a visitor
  understands the selected object; they return to the exact Library reference
  when that contract exists.
- A valid incoming handback opens the exact book/section anchor, restores the
  source aisle and opener context, and identifies the building the visitor
  returned from. Missing, stale, held or malformed handbacks fail to the
  current book status and a safe aisle/search route; they do not invent
  progress or history.

## Charm placement

The base Library page shows no charm. The shared reward contract is not
authoritative enough to claim one. The architecture reserves one live DOM
mount in the entry/exit band for a future, manifest-released Library charm.
If and only if the weekly charm authority passes, that mount may render a
large operable physical stand/bookplate object, confirm the exact local
collection result and offer an outgoing route to the charm bracelet in the
Sorority House Closet. The charm is never painted into a room image, attached
to a book, floated over scenery or treated as synced/owned without evidence.

## Growth contract

- New book: add one data record; shelf layout extends through another physical
  bay or room/shelf unit without redrawing art, pagination or smaller covers.
- New collection: instantiate another aisle section from the same template.
- New feature such as quizzes, classes or audio: add a bounded room/desk zone
  with its own preview/result contract; do not convert it into a generic card
  stack or cram it into the arrival art.
- New saved state: update the one truthful state strip; do not create another
  landing screen.
- New searchable inventory: extend the same catalogue data source; Miss Jeeves,
  search, filters, aisles and direct routes consume the same admission state.
- Book covers appear once at runtime. They are never duplicated in background
  art and again in the catalogue.

## Art budget and visual rules

1. One bright, daylit, empty Library arrival/aisle environment.
2. One repeatable empty shelf/bay asset sized for live book covers.
3. One Miss Jeeves desk/portrait asset with measured clear space for live UI.

No decorative plants or props in this successor proof. Later decoration must
have a named spatial, narrative or wayfinding job; otherwise it fails as
filler. Use the current electric 1990s page system, the protected incumbent's
best daylight/character continuity and the admitted current covers.
Avoid dark/dingy purple-gold luxury styling, detached labels, CSS outlines,
individual book spotlights and title-over-art treatments.

## Accessibility and failure contract

- DOM and keyboard order follows entry → Miss Jeeves → search/filter → aisles
  → saved/cross-building handback, independent of background-art geometry.
- Every aisle heading and result region has semantic structure; all live
  status/error changes are announced without stealing focus.
- The reader has an accessible name, starts focus deliberately, traps focus
  only while modal, closes by Close/Escape/backdrop where appropriate and
  returns to the exact book opener and shelf position.
- At 200% zoom and 320/390px, inventory reflows as live vertical objects; no
  target or explanation is hidden inside a cropped room image.
- Reduced motion removes decorative transitions without hiding state.
- Failed Puffy writes or removals keep the prior truth and say nothing was
  saved/removed. Corrupt or denied same-device state never paints a saved or
  resume success.
- Keyboard, Safari/VoiceOver, native zoom and screen-reader journeys remain
  release gates after the internal visual direction passes.

## Provenance and decision status

| Architecture rule | Authority |
| --- | --- |
| Building experience may use multiple rooms/zones and must stay intuitive, expandable and feature-complete | `ALI CONFIRMED` / `LOCKED LEDGER` |
| Page identity outside art; books explain job/coverage/depth/status before open; Miss Jeeves is core; Closet is an outgoing handoff | `ALI CONFIRMED` |
| Four canonical visitor states and no account-backed Library continuity claim | `ALI CONFIRMED` / `CURRENT IMPLEMENTATION OBSERVED` |
| Search/filter consume the same catalogue/admission truth | `CURRENT IMPLEMENTATION OBSERVED` plus `INFERENCE` for this placement |
| Exactly three top-level collection aisles | `CURRENT IMPLEMENTATION OBSERVED`; not irreversible visual canon |
| 160 CSS px cover and 44 CSS px target floors | `INTERNAL IA PROPOSAL`; must be independently measured and may increase |
| Conditional charm mount, hidden in the base state | `INFERENCE` constrained by current shared reward HOLD |
| No plants/props in the successor proof | `ALI FEEDBACK` for this correction; not a permanent townwide ban |
| Three-asset art budget | `INTERNAL MINIMUM-SUFFICIENT-WORK PROPOSAL`; may change only if a visitor job requires it |

## Internal proof before any visual reaches Ali

- Exact desktop 1440, mobile 390 and mobile 320 renders.
- First-time, returning-without-Card, device-local Card and verified-account
  states plus failure/recovery.
- Add at least one book and one new feature zone without changing the page
  architecture.
- Product/UX judge measures object sizes and pre-open comprehension.
- Brand judge inspects the real renders against the protected incumbent and
  LAiDIES palette.
- Information-architecture judge proves every core feature has a home and no
  cross-building product is misplaced.
- Red team and Claude Opus 5 independently inspect the exact candidate.
- `node scripts/check-design-review-admission.mjs` passes the exact queue item.

Until all of the above pass, there is no Library visual for Ali to review.
