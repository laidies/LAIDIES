# SUNNYVAiLE LIBRAiRY operating specification

**Status:** **HOLD — ALI LIVE WALKTHROUGH RECORDED; PAGE ELEVATION REPAIR
REQUIRED; all books remain HOLD or PREVIEW**
**As of:** 2026-08-22
**Authority:** product contract for the building and its four registered
subproducts; it does not publish a held book or authorize deployment

## Identity and purpose

- **Product:** SUNNYVAiLE LIBRAiRY.
- **Type:** reference and retrieval building.
- **Audience:** a newcomer who needs plain-English AI help and a returning
  reader who wants to recover one exact useful place.
- **User job:** identify what kind of help she needs, get a bounded
  orientation, open an editorially admitted reference, and keep its exact
  useful location.
- **Distinct LAiDIES contribution:** durable conceptual/reference value in a
  real room whose shelves, librarian and Puffy saves form one retrieval loop.
- **Non-goals:** structured classes or mastery claims; timely news; a generic
  whole-site chatbot; a decorative bookshelf; account or cross-device
  persistence; treating a rendered body as editorial approval.

The Library explains durable concepts and provides reference. SUNNYVAiLE High
teaches through sequence and practice. Episodes demonstrate and narrate.
NewsStand handles timely evidence. FAiRY Godmother answers bounded personal
questions. Repetition is justified only when the format adds a different
learning job.

## Experience contract

### Ten-second promise

The visitor must understand:

1. the three shelves are physical Library collections she can browse;
2. every cover says whether it is available, held or preview;
3. only an `available` book opens;
4. Miss Jeeves can orient and route her without bypassing a hold; and
5. Puffy saves stay in this browser on this device.

### New visitor

Arrival → shelf-status explanation → browse three departments or ask Miss
Jeeves → open only an admitted book → use contents or exact-section route →
save a book/section locally → continue to the most useful next experience.

When no book is admitted, the room remains useful as an honest map of the
Library's books and an orientation desk. It must not simulate a working reader
with teaser copy or present the visitor experience as a card catalogue.

### Returning visitor

Same-device return → open My Closet → see the saved title and purpose → follow
the stored exact route → if the book is now held, see the current hold rather
than stale content → remove the save independently of opening it.

There is no signed-in difference today. Account sync, backup and cross-device
recovery are not implemented or claimed.

### Failure and accessibility

- A held/preview cover is a focusable status object, not an operable button.
- A direct hash and Miss Jeeves obey the same publication state.
- A failed fragment load shows an explicit alert and retry; shelf teaser copy
  is never substituted as the book.
- The reader starts focus on Close, traps Tab in the dialog, closes with
  Escape/backdrop/Close and returns focus to the exact opener.
- A denied local write reports that nothing was saved/removed and must not
  paint a false saved state.
- Desktop, 320/390px mobile, reduced motion, 200% reflow, keyboard and
  screen-reader paths are release gates. Headless Chrome does not substitute
  for VoiceOver/Safari or owner visual review.

## Publication and learning rules

The private, frozen catalogue and private frozen admitted-source map in
`library.html` are the current publication authority. No mutable catalogue is
exported. `openBook` resolves only an ID against that authority; a source must
match its exact admitted same-origin rendered path before reader state or
fetch. Protocol-relative, absolute, backslash, percent/encoded-origin,
control-character, query, fragment, redirect and unknown sources are rejected.
Every record requires:

- stable ID, title, summary and approved cover;
- one of `available`, `preview`, `hold`, `not-published`;
- visible status label;
- exact rendered source for `available`;
- reader promise, content owner and format job;
- claim/source/currency evidence where applicable;
- misconception and analogy-boundary review;
- useful continuation path;
- rendered accessibility evidence; and
- independent product, trust and LAiDIES-brand floors of at least 17/20.

`preview`, `hold` and `not-published` records never open, including by direct
hash, saved URL or Miss Jeeves. Status promotion requires changing the
catalogue record only after the named content evidence and independent judge
pass. The exact artifact must contain the admitted body.

LIBRAiRY 101 books build durable mental models. Ali removed the standalone
Vocab 101 book from **The 101s** catalogue on 2026-07-27 and confirmed that its
useful content was rolled into Concepts 101. Vocab was a book, never a shelf.
Concepts now contains all 16 retained terms in a quick-reference section as
well as the deeper mechanism lessons. The former Vocab source and rendered
fragment remain only as fail-closed migration evidence. Concepts still needs a
reconciled mechanism, distinction, nuance and application contract before
admission. The
Verification Rulebook remains HOLD/PREVIEW despite its local expert pass until
owner, native accessibility and newcomer-transfer gates clear.

## Subproduct contracts

- **Miss Jeeves:** direct orientation first, then only working/admitted routes.
  It does not invent a source, route to a held book, collect raw query
  analytics or present perishable claims without source/date ownership.
- **LIBRAiRY 101:** scrollable references, not paginated classes. One topic
  home, accurate mental model, misconception handling, evidence/date
  sensitivity and exact continuation.
- **Grimoire/SLAiYER:** the old paginated AI handbook is retired and redirects
  to the Library. `_superseded/grimoire` is preserved as source evidence. The
  current `/handbook.html` is a different product: the SUNNYVAiLE town
  resident handbook.
- **Puffy saves:** stored input is untrusted. Board records canonicalize to the
  exact supported fields: bounded unique ID/title/summary/purpose, known
  approved sticker, known same-origin Puffy-capable LAiDIES route and exact
  valid ISO UTC timestamp. Duplicate IDs keep the newest valid record.
  Invalid/extra/null/executable legacy rows are removed with visible recovery
  while valid siblings survive. Board and pouch writes validate before the
  read-verified round trip. My Closet exposes separate valid reopen and remove
  controls.

## Visual, voice and media

- Structure decision open: the three-bay incumbent is not a locked visual
  authority. Shelves/books remain part of the interface, but the replacement
  must remove the over-art header, reject the white/pink treatment and
  individual spotlights, use the newer bright family and scale to substantially
  more books. See `EXPERIENCE-BRIEF.md`.
- Covers use the approved `bright-family-v2` family. `_originals`, wooden
  shelf kits and superseded systems remain preserved but are not public
  runtime authority.
- Miss Jeeves is warm, concise and practical. She answers before routing and
  says when the deeper source is held.
- The product may be playful; status, sources, dates, privacy and failure copy
  remain plain.
- Owner review is still required for current room art/crop, cover hierarchy
  and the town-handbook trailer image’s style mismatch.

## Technical and operational contract

- **Routes:** `/library.html`, rendered book fragments,
  `/laidies-card.html#puffyPouch`, retired Grimoire redirects and
  `/handbook.html`.
- **Frontend:** inline catalogue/reader/Miss Jeeves plus
  `content/site/puffy-bookmarks.js`.
- **Search data:** `content/site/site-index.json`; freshness and publication
  status must be reconciled before a result can be promoted.
- **Persistence:** `localStorage` keys `laidies_puffies_board` and
  `laidies_puffy_sticker_pouch`; device-local only.
- **Backend:** none for books, search, saves or corrections. No account sync.
- **Privacy:** never send raw Miss Jeeves queries, Puffy purpose labels,
  reading text or saved titles to analytics.
- **Performance:** preserve lazy images, bounded bright-family runtime assets,
  no superseded/original runtime trees, and exact-artifact dependency checks.
- **Rollback:** restore the last independently accepted catalogue/status
  candidate; never roll back by making held content operable.

## Analytics and maintenance

Allowed aggregate events use controlled IDs only:

- arrival route;
- catalogue status viewed;
- admitted book opened;
- section viewed;
- reader load outcome;
- Miss Jeeves outcome category (`orientation`, `catalogue`, `zero-result`);
- admitted destination opened; and
- Puffy save/reopen/remove outcome.

Do not send raw queries or purpose labels. Plausible custom properties may be
used only after confirming the plan/cost and PII-safe event contract. Review
search-zero categories weekly, content freshness monthly and product scope
quarterly. A book’s recheck date or source change is a product trigger.

## Revenue boundaries

Revenue follows trust and usefulness:

- free core Library as discovery and return value;
- paid downloadable/print reference packs only when the source book is
  admitted and kept current;
- team/workplace reference bundles or workshops with versioned evidence;
- clearly disclosed affiliate links in tool guides only after independent
  usefulness and conflict review; and
- department underwriting that never buys editorial status, ranking or a
  factual conclusion.

No paywall may hide corrections or make a held book look approved.

## Acceptance status

Cycle 5 Repair 1 locally proves catalogue hold truth, private immutable
publication/source admission, zero hostile publication requests, Miss Jeeves
hold enforcement, deterministic keyboard mechanics, strict device-local
record recovery/save/reopen/remove, denied-storage truth, My Closet markup and
exact-artifact parity. It does not admit any production book. The first
independent Cycle 5 review remains a 72/100 FAIL; Repair 1 requires rejudge.

Still required: independent Repair 1 rejudge; claim-by-claim/content-family
approval; owner visual approval; Safari/VoiceOver/native zoom/physical-device
evidence; eight-newcomer study; correction workflow; privacy-safe analytics
baseline; and public-origin/release provenance.

## Source trail

- `CHARTER.md`, `launch-deep-dive-2026-07-25.md`
- `operations/library-decisions.md`
- `operations/library-content-quality-audit-2026-07-24.md`
- `operations/library-101-consolidation-plan.md`
- `operations/slaiyer-handbook-currency-audit.md`
- `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`
- ECO-01 evidence and final local print-contrast independent review
- prevention rules BTB-080, BTB-081, BTB-083, BTB-084, BTB-086 and BTB-087
- current source, deterministic tests and fresh exact artifact recorded in
  the Cycle 5 evidence packet
