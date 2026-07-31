# LIBRAiRY building-experience championship — Cycle 1

**Status:** SUPERSEDED BY OWNER FEEDBACK — no production change, no visual direction approved.

## Trigger and recovered intent

Ali identified a category error: source/contract checks had been reported beside
building work as if they proved a finished experience. The Library is the closest
prior benchmark, not a release approval. The locked visual direction remains the
straight-on, daylit reading room with the integrated three-bay shelf; it is not
permission to reuse the superseded `_library-v3.html` shell or to turn the room
into a generic card catalogue.

Evidence read: `CHARTER.md`, `OPERATING-SPEC.md`, `operations/library-decisions.md`,
`operations/library-content-quality-audit-2026-07-24.md`, the Cycle 5 rejudge,
`operations/design-qa/library-arrival-v7-20260724/`,
`operations/design-qa/library-experience-reset-20260724/`,
`operations/design-qa/library-reader-20260724/`, current `library.html`, and
the 2026-07-24 Library handover. The rejudge's 88/100 is a bounded contract
result: it is not a building-design judgment or publication approval.

## Current incumbent — observed product

The incumbent has the right core grammar: a real room, a visible three-bay
object shelf, cover-as-control interaction, a full-screen in-place reader and
a compact Miss Jeeves desk. It safely freezes the publication map in source,
fails the reader honestly, protects focus, and describes Puffies as local.

It nevertheless has an experience contradiction: the room visually invites
reading, while the current operating contract says all books are HOLD/PREVIEW.
At desktop the room/shelf is strong but the explanation, multi-step route and
reader can feel like separate surfaces. At small widths the mobile catalogue
is more usable than scaled miniature spines, but becomes an ordinary list
rather than a spatial continuation. Miss Jeeves is useful only when it can
answer and route to an admitted, exact destination; it must not make a held
catalogue look like an available learning library.

## Research synthesis (patterns, not imitation)

The relevant best-in-class pattern is a *spatial index with an explicit
information hierarchy*: physical browsing gives recognition and memory;
search/direct answer provides recovery when the visitor cannot name a shelf;
the reader gives a calm, complete reading environment. Good library,
museum-object and editorial-reader systems keep orientation persistent,
separate availability from attraction, and offer a clear escape/return point.
The LAiDIES translation is not a borrowed visual language: daylit SUNNYVAiLE
room, three different reference jobs, exact status and content evidence.

## Competition — blind red-team score (/20)

| Direction | Product | Accuracy/trust | Brand | UX/accessibility | Technical | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| A. Incumbent: room + separate route strip + modal reader | 16 | 18 | 18 | 16 | 18 | HOLD — 16 product/UX floors miss |
| B. **Shelf-to-desk continuum**: room is arrival; selected shelf opens a right-side reading-desk panel before a full reader | 19 | 19 | 19 | 18 | 18 | WINNER CANDIDATE |
| C. **Research-table atlas**: large illustrated tabletop index with drawers for jobs and book stacks | 18 | 18 | 17 | 18 | 17 | credible challenger; risks losing the locked shelf-as-catalogue promise |

Blind red-team findings: A’s room is attractive but cognitive hand-off is too
abrupt; C is less like a library and risks decorative novelty; B keeps the
locked room/shelves while making selection, availability, direct answer and
reader one visible progression. All three satisfy the 17/20 accuracy/trust and
brand floor only when held books remain visibly unavailable. B is the only
direction meeting every required 17/20 floor.

## Recommended owner-review candidate (not integrated)

This recommendation was superseded when Ali rejected the incumbent room's
header treatment, white/pink balance, spotlights, capacity and UX as a final
foundation. The current competition is recorded under
`operations/design-explorations/library-redesign-20260726/` and derives from
the reconciled `EXPERIENCE-BRIEF.md`.

The former recommendation was:

1. Arrival line: “Choose a shelf, or ask Miss Jeeves where to start.”
2. Shelf selection opens an in-room desk panel with the selected department’s
   purpose, status legend and available/held distinction — no fake opening.
3. An admitted cover opens the existing full reader; held covers explain the
   exact hold and offer a useful alternative rather than a teaser.
4. Miss Jeeves appears as the same desk’s question path and returns a direct
   bounded answer plus only working/admitted links.
5. Mobile keeps one selected shelf/card at a time, preserving the room header,
   selected-department context and reader return location.

## Holds and dependencies

- Editorial admission remains separate and blocks a claim that the library is
  fully readable. No design may conceal that.
- Need owner visual comparison at desktop, 390px and 320px; Safari/VoiceOver,
  keyboard, 200% reflow and reduced-motion tests remain gates.
- Need an event contract before interpreting Plausible/Clarity data: shelf
  select, held-book intent, Jeeves direct answer, exact-reader open, reader
  failure/retry, Puffy save/reopen/remove.
- Do not add a backend for room selection. Existing frozen source map and
  device-local saves remain the applicable contracts.
