# AI Fundamentals 101 — visual restart handover

**Cutoff:** 2026-08-17 America/Vancouver
**Outcome truth:** manuscript and working reader exist; current teaching-visual
layer is rejected; nothing in this worktree is published or approved for
laidies.ai.

## Ali's binding correction

1. **No CSS- or Python-drawn teaching images.** HTML/CSS may position, size and
   caption an approved visual asset; it may not draw the diagram, illustration,
   icon scene or teaching mechanism.
2. A teaching visual must be an actual purpose-built asset from an appropriate
   illustration/diagram workflow, normally editable SVG plus reviewed PNG/WebP
   delivery derivatives.
3. Generated lettering is not trusted. Technical words, labels and arrows need
   controlled editable placement and character-for-character inspection.
4. Each visual must teach a specific concept, relationship, sequence or
   mechanism. Decorative imagery, prose in boxes and coloured tables do not
   qualify.
5. One image per chapter is not the assignment. Inspect every section and add
   visuals wherever prose alone leaves an important concept unnecessarily hard
   to picture. Several chapters will need several visuals.
6. Before designing a concept, inspect strong existing textbook/authoritative
   educational visuals online for communication inspiration. Record what they
   clarify and hide. Create an original LAiDIES asset; do not copy their
   composition, artwork or wording.
7. Do not propagate a visual method across the book until one smallest
   representative Chapter 1 asset is visibly good, instructionally useful and
   accepted by Ali.

## Exact source and working paths

Ali-supplied, accuracy-vetted manuscript:

- `/Users/alisoneakin/Downloads/AI Fundamentals 101 — Front Matter Intro.md`
- `/Users/alisoneakin/Downloads/AI Fundamentals 101 — Full Book (All 20 Chapters).md`
- `/Users/alisoneakin/Downloads/LAIDIES Book Production Playbook.md`

Isolated non-iCloud implementation worktree:

- `/Users/alisoneakin/Projects/laidies-library-ai-fundamentals-v3`
- Branch: `library/ai-fundamentals-quick-manuscript-20260816`
- Current commit: `b0b4165` (`Build nine reviewed textbook teaching diagrams`)
- That commit is pushed, but its visual-quality claim is invalidated by Ali's
  direct review. It must not be merged or published as an accepted visual build.

Reader/build files:

- `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/review.html`
- `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/build-book.mjs`
- `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/check-book.mjs`
- `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/test-book.mjs`
- `content/library-books/pilots/ai-fundamentals-101-quick-manuscript/artifact-manifest.json`

Local preview while its server is running:

- `http://127.0.0.1:8878/review.html#chapter-1`

Governing iCloud repository records:

- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/DECISIONS.md`
- `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/product-stewards/library/AI-FUNDAMENTALS-101-VISUAL-TEACHING-PLAN.md`
- Commit `d81e6012` on local `homepage-redesign`; also pushed to safety branch
  `ai-fundamentals-visual-method-20260817` because the authoritative remote
  branch was ahead. This record still incorrectly says nine visual methods
  passed and must be corrected before it is treated as current authority.
- `operations/painpoints-log.md` and
  `operations/product-stewards/idea-inbox/backlog.md` are already dirty with
  other work. Preserve them; do not sweep or overwrite them.

## What the current preview actually contains

The reader has nine HTML/CSS-drawn representative figures across Chapters 1–9.
All nine visual approvals are now invalid. The build currently renders:

- `ch01-rule-or-learned-pattern`
- `ch02-four-jobs-one-family`
- `ch03-data-choices-lifecycle`
- `ch04-text-to-tokens`
- `ch05-guess-check-adjust-loop`
- `ch06-photo-to-patches`
- `ch07-prefill-decode-stream`
- `ch08-weights-context-memory-rag`
- `ch09-context-or-weights-decision`

Chapter 1 contains exactly one rendered `<figure>`. The promised additional
visual aids for its other key concepts were never produced.

Ali directly rejected the Chapter 1 figure because it looks like a crude CSS
flowchart rather than a professionally illustrated textbook visual. Ali also
rejected the Chapter 2 agentic-AI flow because its arrows do not show a coherent
route from Search to results, comparison, Ask/Book and the return loop.

Older Chapter 1 visual source ideas/assets remain in `build-book.mjs`, but they
were previously quarantined and are not usable replacements. Do not silently
restore them.

The internal reviews that called these diagrams PASS inspected legibility and
semantic traceability but failed to judge professional textbook visual quality.
Those verdicts cannot be reused.

## Prior tool trials — do not repeat

This history was missing from the first handover and caused a successor to
repeat already-settled work. The detailed evidence is in `operations/ACTIVE-WORK.md`
and `operations/painpoints-log.md` BTB-460.

- Figma produced a colour-coded comparison table, not a visual learning aid;
  Ali rejected it and Figma added no teaching value.
- A bespoke ImageGen → Figma thermostat repair took roughly an hour, left human
  actions unclear and labels misaligned, and was rejected as unscalable.
- Napkin AI changed the reader question and omitted the causal distinction.
- FigureLabs had already been tried and did not solve the textbook-learning job;
  do not reopen it as the next route.
- Google Nano Banana produced the strongest illustration of the tested
  generators. A later source-art-plus-overlay interpretation repeated the same
  failed separation of illustration from teaching. Ali corrected the method on
  2026-08-17: produce the lettering, arrows, illustration and relationship as
  one coherent textbook composition. Generated lettering may remain when every
  visible character is correct; do not repair a failed asset with CSS, Figma,
  Slides or another editor overlay.

## Preserve, but do not overclaim

- Ali confirmed the supplied manuscript text was fully vetted for accuracy.
- The working reader contains structural improvements: 20 chapters, numbered
  sections, Part hierarchy, visible chapter goals/key terms, separated key-term
  entries and expandable review answers.
- These structural changes are useful working bytes, not final whole-book Ali
  approval. Preserve them while removing the failed visual layer.
- A complete hardware-to-output AI system map is still required at the end of
  the book. It has not been properly produced.
- Nothing from this branch has been deployed or publicly verified.

## First safe execution sequence

1. Update the durable decision/visual-plan records to state that all nine CSS
   visual approvals are invalid and to lock the no-CSS/no-Python image rule.
2. Remove or disable all nine failed CSS-drawn figures from the review build so
   Ali does not keep encountering known-bad work. Preserve the vetted manuscript
   and nonvisual reader structure.
3. Derive a section-level visual-needs inventory from the exact 20-chapter
   manuscript. For each proposed asset state the reader question, teaching job,
   form, placement, source range and why prose is insufficient.
4. For the first Chapter 1 concept only, inspect two to four strong existing
   authoritative/textbook visuals. Produce one original professional textbook
   visual learning aid. Do not repeat Figma, Napkin AI, FigureLabs or the bespoke
   ImageGen → Figma repair loop. If Google Nano Banana is used, generate the
   exact lettering, arrows, illustration and teaching relationship together as
   one coherent composition. Reject incorrect or pseudo lettering rather than
   patching it afterward; no tool or output has final approval merely because it
   exists.
5. Inspect the exact asset at its real desktop and mobile textbook size for
   clarity, typography, arrow logic, visual craft and teaching value. Reuse one
   asset only when it passes both sizes; otherwise create a separately composed
   mobile asset with the same teaching meaning. A
   role-distinct reviewer must see the actual pixels and relevant professional
   references, not only the semantic checklist.
6. Present only that one admitted Chapter 1 proof to Ali. Scale to the remaining
   Chapter 1 visual needs only after Ali accepts the method.

## Copy-paste instruction for the successor task

> Continue the AI Fundamentals 101 textbook visual restart from
> `/Users/alisoneakin/Projects/laidies-library-ai-fundamentals-v3/content/library-books/pilots/ai-fundamentals-101-quick-manuscript/HANDOFF-2026-08-17-VISUAL-RESTART.md`.
> Read that file completely, then read the live Canon Index, `DECISIONS.md`,
> working agreement, active work and engine ledger before editing. Treat every
> current HTML/CSS teaching diagram as rejected. First correct the durable
> status and remove/disable all nine failed figures without losing the vetted
> manuscript or reader UX. Then build the full section-level visual-needs
> inventory. Do not use CSS or Python to draw images. Research existing strong
> educational diagrams for inspiration, then produce one real Chapter 1
> textbook asset using an appropriate illustration/diagram tool and run actual
> desktop/mobile pixel review. Do not generate the rest of the book or publish
> anything until that representative asset is genuinely good and Ali accepts
> the visual method. Preserve all unrelated dirty work and report exactly what
> remains unbuilt.
