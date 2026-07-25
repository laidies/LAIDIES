# LIBRAiRY Launch Deep Dive

**Date:** 2026-07-25
**Status:** REPORT READY — source and existing-QA inspection complete; fresh rendered-flow evidence blocked
**Launch verdict:** **HIDE OR LABEL unresolved books; do not describe the LIBRAiRY as a fully editorially approved reference product.**

## Executive verdict

The LIBRAiRY has the right product shape and unusually good underlying mechanics: it is a real room whose covers act as controls; it explains the catalogue grammar; Miss Jeeves can give a direct answer before routing; the in-place reader supports full-book and exact-section routes; and the Puffy journey has a previously verified local save → Closet → exact-section reopen → remove loop.

It is not launch-complete as a trustworthy reference product. The shelf’s content readiness is mixed: the current content-quality audit places Vocab and Concepts under architecture review, Briefing under editorial review, Setup under currency review, Accounts under factual-integrity hold, Who’s Who under thin/current-claims hold, Straight Answers under re-verification, and How to Check AI’s Work as a rejected placeholder experience. An attractive cover that opens a reader still promises a usable book.

The product also lacks a claim-specific editorial correction route and a learning loop. Plausible/Clarity may be embedded on related surfaces, but no LIBRAiRY event contract, API evidence packet, baseline, experiment record, or search-zero-result review exists.

## Evidence and limits

### Inspected

- Current `library.html`, `site-index.json`, rendered book fragments, and `puffy-bookmarks.js`.
- Existing library decisions, book inventory/consolidation plan, content-quality audit, Vocab editorial review, whole-site reopening QA matrix, and active-work record.
- Existing source evidence of My Closet’s device-local handling and the general Town Hall feedback path.

### Evidence limitation

The required browser connection returned **“No browser is available.”** No fresh screenshots, keyboard traversal, rendered layout inspection, mobile interaction, screen-reader announcement, or public-origin run is claimed here. Prior local QA is reported as prior evidence, not re-certified by this audit.

## Recovered product intent

The locked experience is an immediate entry into a daylit, real LIBRAiRY room—not a masthead then a catalogue of cards. The shelf is the primary navigation. A visitor should understand the three departments, select an available book, use a readable in-place book with contents, ask Miss Jeeves for a direct answer when she lacks vocabulary, and keep a precise useful place with a Puffy.

This product earns its educational claim only when the book itself is accurate, current where necessary, distinct in purpose, readable, and linked to a real next action. It cannot borrow trust from the room art, the reference-desk voice, or a passing load check.

## Journey assessment

| Journey | Current source / prior-QA evidence | Verdict | Main gap |
| --- | --- | --- | --- |
| New visitor arrival | Hero states that covers are buttons; route section explains shelves, available previews and Miss Jeeves. | **PARTIAL** | Current visual/comprehension proof unavailable; owner visual ruling remains open in existing QA. |
| Choose a book | Available books are buttons; preview books have a `soon` label rather than opening. | **PARTIAL** | Availability truth is stronger than before, but editorial availability is not reconciled with documented book holds. |
| Read and navigate | Reader loads fragments, makes contents from headings, supports a hash for book/section, Escape, backdrop close and return focus. | **VERIFIED LOCALLY FROM PRIOR QA** | No current interaction/accessibility retest; fetch failure falls back to thin embedded copy, which can conceal an unavailable full body. |
| Ask Miss Jeeves | Four high-value intents return direct answers plus deep links; other queries use client-side token/alias ranking over `site-index.json`. | **PARTIAL** | No quality/freshness suite, no visible source/date on direct answers, no audited zero-result queue, and links can point into held content. |
| Save/retrieve | Whole books and sections get stable Puffy IDs/URLs; local board reopens the stored hash; previous QA records a Vocab/Hallucination round trip and remove. | **VERIFIED LOCALLY FROM PRIOR QA** | `localStorage` only; no sync/backup/recovery or fresh browser proof. |
| Returning visitor | Local pouch and saved list reload on the same device; copy points to My Closet. | **PARTIAL** | Browser/device clearing, changed headings and cross-device expectation have not been re-tested. |
| Editorial correction | General Town Hall feedback exists. | **NOT BUILT** | No book/section/claim-specific intake, correction status, source evidence workflow, or reader-facing correction history. |

## Product quality findings

### Strong foundations

1. **The room is doing product work.** The arrival image, integrated departmental shelves and cover-as-control pattern make discovery feel like a library rather than content inventory.
2. **The route grammar is unusually explicit.** The page explains 101s, Tools and Reference; available versus episode-gated material; whole-book versus section reading; and the role of Miss Jeeves.
3. **The reader has meaningful retrieval mechanics.** The URL hash format supports a book and named section; the code restores focus on close and provides Escape/backdrop dismissal.
4. **Puffy is a useful retrieval reward, not a fake progress bar.** The product stores a book/section title, summary, URL, sticker and timestamp locally, and My Closet renders a deep link. The code does not promise account sync.

### Launch blockers / material defects

1. **Editorial availability is not truthfully surfaced.** Existing audit evidence means several click-open books must not be treated as publication-ready. The product needs a canonical availability manifest that distinguishes `available`, `preview`, `editorial hold`, and `not published`.
2. **Fallback reader behaviour can hide a broken/full-body failure.** When fragment fetch fails, the reader inserts a short embedded fallback. That is better than a raw 404, but it can turn a broken book into a plausible teaser without an explicit failure state.
3. **Miss Jeeves contains perishable claims without its own evidence state.** Direct answers are hand-authored in `library.html`; at least the jobs answer makes a current-evidence claim. It has no displayed source/date/recheck trigger and no test preventing a deep link to a held book.
4. **No correction mechanism meets the publication standard.** Town Hall is general feedback, not an editorial correction path tied to a claim or exact reader location.
5. **No learning instrumentation exists.** There is no accepted definition of a successful search, reader comprehension, save/reopen, correction, returning-reader journey, or a privacy-safe aggregate data pull.

## Accessibility and responsive assessment

Source-level positives include semantic headings, labelled input, `aria-live` search results, dialog semantics, explicit close control, Escape handling, and restored trigger focus. The mobile catalogue is separately rendered rather than relying on an impossible wide shelf.

These are not an accessibility pass. This audit could not inspect focus containment in the modal, keyboard access to generated shelf/preview controls, announcement timing after dynamic fetch, contrast against the room image, zoom/reflow, touch target size, visible focus, screen-reader reading order, or actual mobile cropping. The reader’s fixed full-viewport overlay and dynamically injected Puffy picker are priority areas for current manual testing.

## Logic, data and persistence assessment

- **Reader/data:** fragments are fetched client-side and sanitised only by removing selected top-level elements before injecting `innerHTML`. Editorial source and release controls must ensure fragments are trusted. A reader error needs an explicit state rather than a content-looking fallback.
- **Search:** Miss Jeeves has four curated intent matches, then a simple client-side lexical search over title/summary/topics/aliases. It has no typo tolerance, synonym governance, result analytics, or freshness tie to book status.
- **Persistence:** Puffy use is deliberately device-local (`laidies_puffy_sticker_pouch` and local saved entries). The pouch’s ten-item limit and optional purpose labels are sound, but data clearing, unavailable sticker assets and stale saved heading URLs require regression coverage.
- **Editorial correction:** no data model connects a reader’s observed claim to its source, correction status, revision, or public note.

## Analytics contract to add

Do not collect search text, reader body text, Puffy purpose labels, or any private notes. Aggregate only:

- `library_arrival_view` and primary route selected;
- `library_book_opened` with book ID and availability status;
- `library_reader_section_viewed` with book/section ID;
- `library_reader_load_failed` with book ID and failure class;
- `miss_jeeves_query_outcome` with a controlled intent/result category only (`curated_answer`, `catalogue_result`, `zero_result`)—never raw query;
- `miss_jeeves_result_opened` with destination ID;
- `puffy_saved`, `puffy_reopened`, and `puffy_removed` with book/section ID; and
- `library_correction_started` / `submitted` with book/section ID and no claim content.

Before acting on any number, record a baseline, observation window, sample caveat, and paired qualitative evidence. A click from Miss Jeeves to a book is not proof she received a useful answer.

## Best-in-class next improvement

Do not add more covers. First make the existing shelf **trustworthy and recoverable**: a canonical book-status manifest controls cover availability, reader opening, Miss Jeeves destinations, and the correction route. That one shared source of truth would prevent the worst launch failure—an elegant library routing a newcomer into known-incomplete or stale material.

After that, run a bounded championship on retrieval quality: (1) improve the curated Miss Jeeves intent set, (2) improve the governed catalogue index, and (3) test a source-aware answer card. Judge anonymous candidates on direct usefulness, truthful uncertainty, destination relevance, accessibility, maintenance, and zero-result recovery—not click-through alone.

## Required launch disposition

- **FIX BEFORE LAUNCH:** availability manifest; withdraw/repair How to Check placeholder; claim-specific correction intake; prevent Miss Jeeves from routing to held content.
- **HIDE/LABEL FOR LAUNCH:** every book under documented editorial/factual/currency hold; any visual state not current-render verified.
- **POST-LAUNCH EXPERIMENT:** governed Miss Jeeves retrieval improvement only after baseline events and editorial status exist.
