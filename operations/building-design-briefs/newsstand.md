# The SUNNYVAiLE NewsStand — MAiN Street No. 2. Keeper: Paige (town reporter). Verb: buy a paper. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `newsstand.html` · Priority: **high** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Buy a paper.

## Current state
Audit: art 0/8, 760px centre column, h 2,127. The page works but it is a filtered FEED, not a rack you pull from: a masthead line, a lede, the gold+plum song bar, "All / WEDNESDAY / Tribune" filter chips + a search box, then a JS-rendered card grid (window.NEWSSTAND_STORIES → renderPreviewCard → click → renderArticle in place via #slug hash). The gorgeous Y2K kiosk (02-sunnyvaile-newsstand.webp) is an inert 216px photo strip on top. Three real strengths already work and must be kept: (1) the whole story data model + article renderer (renderArticle/renderPreviewCard) is genuinely good — reuse it as "inside the paper"; (2) hash routing + deep-link anchors that class_notes/other pages point at; (3) search over the story index. Two latent facts: the data model + CSS already define a THIRD edition — TODAY, "the wire" (.ns-today-card / .ns-today-grid / .ns-today-strip__stamp) — but the live renderer never renders it, so the wire is orphaned and half-built. And the keeper scene paige-scene.png already exists (the NewsStand's penny-scene), unused.

## THE MECHANIC (the one idea)
The rack IS the interface — you pull a paper and it opens in place. Paige's newsstand carries THREE papers, one per edition, standing as real pull-able objects on the counter: TODAY (the wire — the day's outside-world headlines), the WEDNESDAY Edition (the digest — the flagship weekly), and The Tribune (the argument — the opinion broadsheet). Pull a paper → its front page opens in place (the card grid for that edition). Click a headline → the full story opens in place (existing renderArticle). "Back to the stand" returns you to the rack. This is the exact proven LIBRAiRY move — pull-and-open-in-place — applied to papers instead of books, and it retires the filter-chips-over-a-feed framing (pulling a paper IS the filter). Per the state-on-arrival rule and the Post Office precedent: the stand TELLS you what's new the moment you arrive — Paige's board states today's date, whether this week's WEDNESDAY Edition is in (or when it drops), and how many new stories hit the wire since your last visit — computed for real (newest story date vs a localStorage last-visit stamp, like Post Office reads episode-index). No hotspot-hunting, no numbered pins.

## Key elements
### The three papers (the rack) `[REWORK]`
Three real, legible pull-able paper objects standing in the counter zone — TODAY / the WEDNESDAY Edition / The Tribune — each with its own masthead (brand-Ai spelled), a front-page thumbnail, a 25c price corner, and a fresh-count ('3 new this week').
- **Behaviour:** State on arrival: all three visible and labelled, no hunting. Click a paper → it 'lifts off the rack' and its front page (that edition's story cards) opens in place. This replaces the All/WEDNESDAY/Tribune filter chips — the paper you pull IS the filter.

### The wire (TODAY) `[REWORK]`
The orphaned third edition — a thin daily of outside-world headlines with publisher passthrough links. Data model + .ns-today-* CSS already exist; the live renderer never shows it.
- **Behaviour:** Finish it: TODAY becomes the leftmost paper. Pull it → the wire headlines render (renderTodayCard over the existing .ns-today-grid), each linking out to its source. The stand's 'what's new' count reads primarily off the wire.

### Front page → full story, in place `[KEEP]`
The existing renderPreviewCard grid (front page of a paper) and renderArticle (the full piece, with The Story / The LAiDIES Read / What This Means / Cocktail Party / Class Notes / Sources).
- **Behaviour:** Unchanged mechanics: card → article opens in place via #slug; 'Back to the stand' returns to the rack. Deep links and class_notes anchors keep working.

### Paige's board (state on arrival) `[NEW]`
The framed motto sign already painted into paige-scene.png ('ASK QUESTIONS / CHECK SOURCES / GET THE REAL STORY') doubled as the live state surface — or a candy chalkboard styled to belong in the stand.
- **Behaviour:** On arrival, in big display type (Post Office pattern — the telling IS the type): today's date; 'The WEDNESDAY Edition is in' or 'Next edition drops Wednesday'; 'N new on the wire since you last stopped by' (real, from localStorage last-visit vs newest story date).

### Back Issues (search, reframed) `[KEEP]`
The existing search over the story index, rehoused as the newsstand's back-issue crate (the milk-crate/bundled-stack read from the scene).
- **Behaviour:** Type to find any past story across all three papers; results open in place. Kept because archive search is genuinely useful — reframed as a crate, not deleted.

### The NewsStand song button `[REWORK]`
'The Newsstand' by The Embeddings play/pause (window.playLaidiesTheme), currently in a retired gold #c9a24b on plum→rose gradient bar.
- **Behaviour:** Keep the play/pause behaviour; restyle onto candy (dark-plum #3a1838 text on a candy fill, 10px radius) so it stops violating the gold+plum retirement. Reads as 'the stand's radio playing'.

### Paige, the keeper `[NEW]`
assets/town-characters/scenes/paige-scene.png — the straight-on room: Paige at the counter, awning canopy, mag rack, newspaper stack, honor-boxes, motto board.
- **Behaviour:** Becomes the full-bleed room/hero (as Post Office promoted penny-scene to hero). The rack of papers and the state board live inside this room so the picture is what you operate, not a header.

## Design direction
Follow the shipped Post Office pattern exactly. LOCK paige-scene.png as the room (its penny-scene equivalent) and make it the full-bleed hero — kill the 760px centre column with a page-scoped override of main.ns-page/.ns-wrap (do NOT touch shared sunnyvaile-page.css; leave the other 13 buildings untouched). Top-to-bottom shape, ~2,300–2,500px, hub-and-reveal, no long scroll: (1) Paige's stand, full-bleed, edge to edge — the striped awning, the counter, the mag rack behind her carry the whole room; (2) sitting IN that counter, Paige's board states your position on arrival in homepage-scale display type (h1 ~clamp(34,5vw,66)/800, state line ~clamp(30,4.4vw,58); near-black aubergine ground rgb(28,15,28) where there's no art, never flat cream); (3) the three papers stand on the counter as the rack — real paper objects, not css chips — pull one and its front page reveals in place below/over the rack, one open at a time, click a headline for the full story, 'Back to the stand' to close; (4) Back Issues crate (search) + the restyled stand-radio button tuck at the counter edge. Palette: candy only — pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7, tangerine #f4a636 — one accent per paper (e.g. TODAY teal / WEDNESDAY pink / Tribune periwinkle) so the three read as three distinct mastheads; body ink #3a1838; buttons solid candy fill + dark-plum text + 10px radius (never white-on-dark pills). No emoji in chrome, no gold, no plum panel fills (plum only ever comes from artwork). Brand-Ai accent on every SUNNYVAiLE/brand word. Mobile: papers restack to a single pull-able column, awning/board reflow, one authoritative @media block; add the meta viewport if missing.

## Signature detail (the 'cool S' of this building)
A red rubber HOT OFF THE PRESS · [date] ink stamp — smudgy, hand-canted, struck across the fresh edition's masthead corner — that appears ONLY when there is genuinely a new WEDNESDAY Edition (or new wire stories) since your last visit. It is the NewsStand's 'cool-S in the margins': period-true (every real vendor stamps the fresh stack), hand-made, and honest — it doubles as the state-on-arrival tell, so the delight and the truth are the same object. Supporting period texture: each paper wears a 25c price corner (decorative, never a pay-gate — respect the no-friction rule), and Paige's red grease-pencil underlines the day's date on the wire the way a newsstand vendor marks the day's stack.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `paige-scene` | codex-render | decorative | exists | The full-bleed hero/room — the picture you operate, exactly as penny-scene.png serves the Post Office. |
| `newsstand-paper-today-v1` | css/svg | **YES — this is the interface** | new | The wire paper you pull; opens the (currently orphaned) TODAY grid in place. |
| `newsstand-paper-wednesday-v1` | css/svg | **YES — this is the interface** | new | The flagship digest paper you pull; opens the WEDNESDAY card grid in place. |
| `newsstand-paper-tribune-v1` | css/svg | **YES — this is the interface** | new | The opinion paper you pull; opens the Tribune threads in place. |
| `newsstand-hot-off-press-stamp-v1` | css/svg | decorative | new | The signature detail + the fresh-edition state tell; shown only when there is genuinely new content since last visit. |
| `newsstand-paper-texture-v1` | css/svg | decorative | uncertain | Keeps the papers pictorial (avoids the rejected 'css boxes slapped on a background'). |

**`newsstand-paper-today-v1`** — NEW — the operable TODAY paper as a real paper object: newsprint texture, teal masthead 'TODAY' with brand-Ai treatment on SUNNYVAiLE, a thin front-page of stacked wire headlines, 25c corner. Built so it looks like folded newsprint standing in the rack, not a flat colour chip.

**`newsstand-paper-wednesday-v1`** — NEW — the WEDNESDAY Edition paper: glossier cover-stock texture, pink masthead 'The WEDNESDAY Edition' (brand-Ai), a front-page thumbnail of the week's lead story, 25c corner, room for the HOT OFF THE PRESS stamp on the corner.

**`newsstand-paper-tribune-v1`** — NEW — The Tribune paper: broadsheet/opinion texture, periwinkle masthead 'The Tribune' (brand-Ai), an argument-column front page, 25c corner.

**`newsstand-hot-off-press-stamp-v1`** — NEW — a smudgy red rubber ink stamp reading 'HOT OFF THE PRESS ·' with a slot for the live date, hand-canted, imperfect ink coverage. SVG so the date is live text.

**`newsstand-paper-texture-v1`** — UNCERTAIN — a reusable newsprint / cover-stock paper texture (subtle fibre, fold shadow) to back the three paper objects so they read as real paper, not css rectangles. Check assets for an existing paper/newsprint texture before commissioning.

## Reuses existing
MAJORITY of the build already exists — this is finish + reframe, not rebuild. Keep and reuse: content/newsstand-stories.js (the story data); renderArticle() and renderPreviewCard() (become the "front page" and "inside the paper" views, unchanged); the #slug hash routing + deep-link anchors (class_notes and other pages rely on them); the search index/matchesQuery; the "The Newsstand" by The Embeddings song button (restyle only); content/newsstand.css including the orphaned .ns-today-* wire classes (finish them, don't rewrite); assets/town-characters/scenes/paige-scene.png (the room — mirrors Post Office locking penny-scene.png); the exterior kiosk render for the directory tile.

## Pitfalls (do not)
- Do NOT delete the working features: search, the article/preview renderers, #slug hash routing + deep-link anchors (class_notes and other pages point at them), or the song button. This is finish + reframe.
- The exterior kiosk render's mastheads spell 'Sunnyvale' (no brand-Ai) and read NEWSSTAND / SUNNYVALE SUN / DAILY GOSSIP — the wrong, non-canon titles. Never use the exterior (or the placeholder honor-boxes) as the operable rack; the three papers must be new objects with correct brand-Ai and the real edition names (TODAY / The WEDNESDAY Edition / The Tribune).
- paige-scene.png's own painted mastheads/mag covers are decorative placeholders — the operable papers composite as clean new objects; do not try to make the painted rack clickable (that is the invisible-hotspot failure Ali rejected on the Post Office).
- Papers must be real paper OBJECTS (texture + masthead), not flat candy rectangles — Ali rejected 'shitty css boxes slapped on a background'. Equally, no clip-path hotspots or numbered pins on the art.
- Retire gold+plum here: the current .ns-theme song bar (plum #4b2148→rose #9b3f5f with gold #c9a24b button) and any gold article badge must move to candy fills + dark-plum text.
- Page-scoped CSS only — override the 760px column inside this page; do not edit shared assets/sunnyvaile-page.css (it drives 13 other buildings).
- If .sv-hero is kept for charm-hunt.js continuity, keep its image/aspect stable (charm positions are percentage-based). Grep shows no newsstand charms today, but confirm before removing sv-hero.
- Voice: the arrival headline / EXTRA-EXTRA energy must use a REAL current headline — no hype, no fake exclusivity (no-hype + no-false-exclusivity rules).
- Add the meta viewport tag if absent and keep mobile spacing in one authoritative @media block.

## Open questions for Ali
- Hero choice: promote paige-scene.png to the full-bleed hero (recommended — matches Post Office promoting penny-scene) and demote the exterior kiosk to the directory tile? Or keep the exterior as the establishing strip?
- The wire (TODAY): should it stay a hand-curated passthrough list (current data), or later pull live external headlines? Finishing the orphaned static wire is in scope; a live feed is a follow-up.
- Papers as css/svg mastheads on a paper texture (recommended for crisp brand-Ai + candy + legibility at rack scale), or small Codex front-page renders? css/svg is lower-risk and honors the 'no post-applied text' lesson.
- Should the 25c price be purely decorative (recommended — respects no-friction/state-on-arrival), or an optional 'drop a quarter' microinteraction to take the paper?
- Confirm Paige is the settled keeper voice for the arrival board (roster: Paige, town reporter) before writing her lines.

## Sequencing
Lowest-risk path, mirroring the shipped Post Office. No blocking art dependency — the room (paige-scene.png) and all story content already exist, so the build can start immediately: (1) lock paige-scene.png as the full-bleed room + kill the 760 column page-scoped; (2) build the three css/svg paper objects and wire pull-to-open over the existing renderers; (3) finish the orphaned TODAY wire (renderTodayCard into the existing .ns-today-* CSS); (4) add the real state logic (localStorage last-visit vs newest date) + Paige's board + the HOT OFF THE PRESS stamp; (5) restyle the song bar off gold+plum. Back up the current page first (operations/_backup-newsstand-*.html) as was done for the Post Office.

