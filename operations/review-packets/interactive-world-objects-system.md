# Interactive World Objects System

Date: 2026-06-19

Scope: Part B audit and implementation plan for the LAiDIES interactive world object system.

No staging, commit, push, revert, delete, cleanup, prototype work, backend work, signup work, Buttondown work, Supabase work, or Part C implementation was performed.

## Core Principle

The object creates the magic. The cards/buttons create the clarity. The tool gives real utility.

Interactive objects should be visible, beautiful, and memorable, but they cannot be the only navigation. Mobile readers need obvious labeled paths, and desktop readers can get the extra delight of object interaction once the clear cards exist.

## Files Inspected

- `index.html`
- `this-week.html`
- `clubhouse.html`
- `games/dream-phone.html`
- `games/fairy-godmother.html`
- `games/madame-claio.html`
- `games/fun-pack.html`
- `games/girl-talk.html`
- `games/dj-booth.html`
- `games/trading-cards.html`
- `hot-goss.html`
- `learn.html`
- `learn/glossary.html`
- `reference-closet.html`
- `receipts.html`
- `episodes.html`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html`
- `printable.html`
- `try-on.html`
- `community.html`
- `community/*.html`
- `content/site/site-data.js`
- `content/site/quizzes.json`
- `script.js`
- `styles.css`
- relevant assets under `assets/`

## Current System State

### Homepage

The approved masthead is in place. The homepage now has several adjacent decision points:

- Masthead primary actions: `READ LATEST EPISODE`, `OPEN THIS WEEK'S BAG`.
- Current Episode card: `READ EPISODE 3`.
- Pick Your Path: `START FROM THE BEGINNING`, `READ THE SEASON`, `DO THE WEEKLY RITUAL`.
- Portal map: THE BOOK OF RECEIPTS, THE LAiDIES CLUBHOUSE, JOIN THE CLUB, HOW LAiDIES WORKS.

This is directionally right, but the hierarchy is busy. Pick Your Path repeats destinations that the masthead and current Episode already introduce.

### WEDNESDAY BAG

`this-week.html` already has the strongest system foundation:

- Object-scene Bag with hotspots.
- Labeled action cards.
- Mini drawers for Weekly Study Pack, Meet & Celebrate, and Book of Receipts.
- LocalStorage reward tracking for charms and full ritual merit badges.
- Dynamic Episode selection from `content/episode-index.json` and `content/episodes/`.
- Return params using legacy `issue` query keys, which should remain until a redirect/data migration plan exists.

Main gaps:

- THE EXTRA CREDIT is currently a direct link, not a mini hub drawer inside the Bag.
- LISTEN is its own direct action, but not grouped with weekly anthem/DJ Booth context.
- REAL WORLD maps to Book of Receipts concepts, but some labels still use old names like Hot Goss, Who's Who, and Glossary as top-level cues.
- The visual scene still uses Episode 02 proof-of-concept Bag art while the current live homepage points readers to Episode 3.

### THE LAiDIES CLUBHOUSE

`clubhouse.html` already has a clamshell object and a labeled card grid. This matches the "object plus clarity" principle.

Main gaps:

- Framing still says `Clubhouse / Clamshell Practice Room` and "toy box"; it should become `THE LAiDIES CLUBHOUSE` with AI After Hours framing.
- The clamshell hotspot layer is useful, but its zones should remain secondary to labeled cards.
- Dream Phone is correctly flagged in copy as "still getting tuned."
- Girl Talk is present as an actual feature.
- The page should avoid "Play in the Clubhouse" style framing and continue moving toward grown-up interactive tools.

### THE BOOK OF RECEIPTS

The Book is partly present but not fully built:

- Homepage portal map has the right final architecture labels.
- `hot-goss.html` is an active current-context surface.
- `learn/glossary.html`, `reference-closet.html`, `learn.html`, `receipts.html`, and `community/laidy-spotlight.html` are the current destination candidates.

Main gaps:

- `receipts.html` still has a black/neon evidence FAQ look and feels outside the current pearl/blush/plum visual direction.
- The Book should not pretend to be complete yet.
- Existing destinations need to be grouped as a preview hub before any new empty pages are created.

### Activity Quality

Mme CLAi-O and FAiRY GODMOTHER are the quality bar:

- Magical object/character visual.
- Atmosphere and subtle motion.
- Stronger sense of being in the LAiDIES world.
- Clear central action.

Dream Phone is below that bar because the interaction layout separates phone, output, caller cards, and remix controls into a scroll scavenger hunt.

Girl Talk and DJ Booth have stronger visual identity than generic CSS cards, but should be reviewed after Dream Phone because they are lower-risk.

### Dream Phone

Priority redesign candidate. It currently has:

- Phone/keypad first.
- Output panel immediately after phone.
- Secret badge after output.
- Caller grid below output.
- Remix/special cards after the full caller grid.
- Caller avatars as very small round images.

This confirms Ali's screenshot feedback.

### Ask LAiDY / FAiRY GODMOTHER

There are two implementations:

- `games/fairy-godmother.html` has a standalone LAiDY advice engine.
- `script.js` also has LAiDY advice/prompt-feedback helpers for another surface.

Both read input and selected energy, so it is not purely canned. But current prompt feedback is still a short `Prompt check` line, not the requested structured prompt-quality report.

### Episode Consistency

Episode 3 has the strongest template:

- Episode-specific masthead.
- Reader kit.
- Side rail.
- Weekly ritual CTA cluster.
- Episode-specific activity section.

Episode 1 and Episode 2 still use an older article template and should be aligned in a separate phase without rewriting article copy.

## Proposed Final Structure

### WEDNESDAY BAG

- READ: current Episode/article.
- PRACTICE: mini hub for Try-On, Cheat Sheet, Weekly Cards.
- QUIZ: current Episode quiz.
- SAVE: printable, takeaway, receipt card. This can be inside PRACTICE unless it deserves a standalone row.
- THE EXTRA CREDIT: mini hub for Mme CLAi-O, FAiRY GODMOTHER, Dream Phone, Girl Talk, sticker/charm bonus extras.
- LISTEN: DJ Booth / weekly anthem.
- REAL WORLD: Book of Receipts / current dispatch / sources.
- CONNECT: Meet & Celebrate / community / LAiDIES Card / Businesswomen's Special.

### THE LAiDIES CLUBHOUSE

- Framing: `THE LAiDIES CLUBHOUSE`, AI After Hours.
- Object: clamshell compact as cover/map.
- Cards: Dream Phone, Mme CLAi-O, FAiRY GODMOTHER, Girl Talk, DJ Booth, THE EXTRA CREDIT, LAiDIES Card/rewards.
- Mobile: stacked labeled cards first-class.
- Desktop: labeled object hotspots can remain as an enhancement.

### THE BOOK OF RECEIPTS

- SLAiYER HANDBOOK -> `learn/glossary.html` and durable explainers.
- THE COVEN -> `community/laidy-spotlight.html` or future women-in-AI hub.
- THE POWER MAP -> `learn.html#who-is-who` until a stronger hub exists.
- THE LORE CLOSET -> `reference-closet.html`.
- THE DISPATCHES -> `hot-goss.html`.
- THE EVIDENCE DRAWER -> `receipts.html`.
- ASK THE BOOK -> planned source-backed FAQ, not faked yet.

## Recommended Phase Order

### Phase 1: Documentation and Route Inventory

Status: this pass.

Files:

- `operations/review-packets/interactive-world-objects-system.md`
- `operations/review-packets/homepage-journey-audit.md`
- `operations/review-packets/dream-phone-redesign-plan.md`
- `operations/review-packets/character-card-system-audit.md`
- `operations/review-packets/ask-laidy-input-audit.md`
- `operations/review-packets/episode-consistency-audit.md`

Risk: low. Documentation only.

### Phase 2: Dream Phone Redesign and Character Mapping

Recommended first implementation phase.

Why first:

- It is the clearest user pain.
- It is mostly isolated to one route plus shared Dream Phone data in `script.js`.
- It can be QA'd at 375, 390, 430, and desktop without shipping the broader homepage/Clubhouse architecture.

Likely files:

- `games/dream-phone.html`
- `script.js`
- possibly `styles.css` only if shared tokens/utilities are needed, but prefer keeping styles local to `games/dream-phone.html` for isolation.

Risk: medium. Interaction layout and JS state need careful mobile testing.

### Phase 3: Ask LAiDY / FAiRY Prompt Feedback

Likely files:

- `games/fairy-godmother.html`
- `script.js`
- possibly `games/fun-pack.html` only if labels/routes need adjustment.

Risk: medium. Needs real test inputs and output comparison, but no backend is required.

### Phase 4: WEDNESDAY BAG Grouped Hubs and Return Paths

Likely files:

- `this-week.html`
- `script.js`
- `games/fun-pack.html`
- selected child pages with return-link labels only if needed.

Risk: high. The Bag is central and dynamic.

### Phase 5: THE LAiDIES CLUBHOUSE System

Likely files:

- `clubhouse.html`
- `styles.css`
- possibly `script.js`

Risk: medium to high. It touches shared design patterns and may be visually broad.

### Phase 6: THE BOOK OF RECEIPTS Preview Hub

Likely files:

- `learn.html`
- `hot-goss.html`
- `reference-closet.html`
- `receipts.html`
- `learn/glossary.html`
- possibly `styles.css`

Risk: high. Several pages are already mixed/dirty and one page needs visual direction repair.

### Phase 7: Episode Terminology and Episode 1/2 Template Alignment

Likely files:

- `episodes.html`
- `issues/issue-01.html`
- `issues/issue-02.html`
- `issues/issue-03.html` only as template reference or shared extraction source.
- `content/episode-index.json`
- `content/episodes/issue-01.json`
- `content/episodes/issue-02.json`
- `content/site/site-data.js`
- `learn/quiz.html`
- `printable.html`
- `try-on.html`

Risk: high. Needs link QA and must preserve article copy.

## Staging Plan

No staging is recommended yet.

If Ali approves Phase 1 docs only, stage exactly:

```bash
git add operations/review-packets/interactive-world-objects-system.md
git add operations/review-packets/homepage-journey-audit.md
git add operations/review-packets/dream-phone-redesign-plan.md
git add operations/review-packets/character-card-system-audit.md
git add operations/review-packets/ask-laidy-input-audit.md
git add operations/review-packets/episode-consistency-audit.md
```

Do not use `git add .`.

## Parked For Future Social / Production Engine

Do not touch in Part B implementation unless Ali explicitly changes scope:

- `operations/socials-engine/**`
- `operations/weekly-production-engine/**`
- `operations/briefs/**`
- `scripts/build-episode-assets.js`
- `scripts/start-socials-engine.js`
- `scripts/start-weekly-production-engine.js`
- `social/**`
- Episode 3 social launch assets and visual preview outputs.

## Parked For Future Backend / Subscriber Work

Do not touch in this pass:

- Buttondown integration beyond existing static forms.
- Supabase implementation.
- Magic Link/login.
- signup recovery.
- persistent LAiDIES Card / Clubhouse Pass storage.
- stickers, charms, badges, quiz scores, ritual completion persistence beyond honest localStorage behavior.

## QA Notes

No fresh browser screenshots were captured in this pass. Treat this as a code/structure audit and plan, not visual QA.

Required implementation QA later:

- Mobile widths: 375, 390, 430.
- Desktop: 1440.
- Dream Phone after card selection and remix interaction.
- Ask LAiDY output variance across real test prompts and energies.
- Homepage duplicate CTA review on mobile and desktop.
- No horizontal overflow.
- No console errors.

