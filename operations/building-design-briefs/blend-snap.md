# The Blend & Snap — MAiN Street No. 4, SUNNYVAiLE's coffee shop and third place. Keeper: JoJo the barista ("same barista, same paper cup, she knows how you take it"). This building canonically OWNS the coffee/AI-memory metaphor (LOCKED, coffee-relationship-ai-memory-metaphor.md): "your usual" = specificity + built-up context. Site function: where the weekly Study Pack lives — study here, then walk to SUNNYVAiLE High for the Pop Quiz. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `blend-snap.html` · Priority: **high** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** ORDER. You walk up to the counter and order something — a drink and this week's pack — and JoJo, who knows your usual, slides it across the counter.

## Current state
Better than the audit snapshot, but still failing the standard. The audit (art 0/13, 760 column, h 3,070, pixel-identical shell to old Post Office) predates a partial fix: the page NOW has a "Today's Menu" section (.bs-menu) — a paper-menu card with dotted leaders, a Special wired live to /content/episode-index.json (current pack name + href), sides (Concept Card Pack -> /games/trading-cards.html, Pop Quiz -> /learn/quiz.html), and The Regulars (JS-rendered past packs with honest empty/error states). An in-file comment records Ali's own direction: "what happens when you enter a coffee shop — you order. So the menu is the different Study Packs." So the CONCEPT is Ali-approved; the HOUSING is wrong: a CSS card inside the banned 760px centre column, under a hero cropped to a ~300px strip, followed by a numbered "How the Wednesday lap works" text list, an "It's also just a coffee shop" paragraph, a gold-shell .sv-trip-tie card and two .sv-cta gold link-cards. Zero operable art; nothing tells you your state on arrival. Working and must KEEP: theme-song button (playLaidiesTheme, /content/music/the-laidies-down-at-the-blend-and-snap.mp3), the episode-index fetch/sort/escape JS, the menu copy/voice, tour check-in (sv-tour-checkin.js — this is a Wednesday Tour stop). Bug: meta description says "MAiN Street No. 8" (stale); canon and the visible eyebrow say No. 4. Verified: charm-hunt.js is NOT loaded on this page, so the Post Office .sv-hero charm trap does not apply here — but keep the hero element anyway for tour/header consistency. CRITICAL unused assets found on disk: assets/town-characters/scenes/jojo-scene.png (1672x941 — JoJo at the counter handing you a heart-latte; menu board, espresso machine, pastry case, mug rack all rendered) and assets/building-interiors/blend-snap-cafe-jojo-match.png (1672x941 — the SAME room empty, wide: counter, register, menu board, and a full CORKBOARD whose flyers are already rendered in-image: STUDY PACK PICKUP new every Wednesday / STUDY BUDDY WANTED will trade notes for a latte / POP QUIZ HELP SUNNYVAiLE HIGH / BRONZE AiGE post-quiz debrief / CHICK FLICKS episode rewind club / KSVL earworm study session / LUMiNAiRY field trip meet a MAiVEN / DELTA LAi NU girl talk bring receipts / LIBRAiRY citation rescue). The Wednesday lap ALREADY EXISTS as art; the page has never used either image. Also approved-assets/interiors/blend-snap-corkboard.png (angled, warm-toned, only 2 legible flyers — reference only, palette does not match).

## THE MECHANIC (the one idea)
THE COUNTER IS THE INTERFACE — you order off the room, and JoJo tells you where you stand before you touch anything. Two physical objects you operate: (1) THE MENU BOARD (the backlit COFFEE/SPECIALS/EXTRAS board already rendered behind JoJo) is the real menu — the Special IS this week's Study Pack; ordering it opens the order in place and slides a cup across the counter. (2) THE CORKBOARD (the community notice board already rendered in the room, flyers baked in) is the Wednesday lap — each pinned flyer is a real note you click to go where it points. State on arrival, in plain words, biggest type on the page (the Post Office "the telling IS the display type" rule): JoJo says "This week's pack is fresh — you haven't picked it up." / "You're all caught up — next pack Wednesday." / first visit: "First time? Order at the counter — it's on the house." Computed honestly from /content/episode-index.json (latest published) vs a localStorage stamp (laidies_bs_last_pack) set when she opens the pack. No hotspot hunting: both boards are large, legible, and their own text is the label.

## Key elements
### JoJo hero (masthead) `[NEW]`
assets/town-characters/scenes/jojo-scene.png full-bleed and UNCROPPED — the keeper-scene-as-hero pattern proven at the Post Office (Penny). Generate .webp/.jpg web copies like penny-scene got.
- **Behaviour:** Sets the room. Title sits below per site pattern (the art carries its own signage). Keep .sv-hero wrapper for header/tour consistency. Not a click target.

### JoJo's state line `[NEW]`
One sentence in homepage-scale display type (clamp ~30-58px) on the dark aubergine ground, phrased as JoJo speaking: 'This week's pack is fresh.' / 'You're all caught up.' / 'First time in? It's on the house.'
- **Behaviour:** Real state on arrival, zero interaction needed: episode-index.json latest published vs localStorage laidies_bs_last_pack (stamped when the pack link is opened). Below it, one candy button: 'Order the pack' -> opens the counter order in place.

### The counter + menu board (THE order mechanic) `[REWORK]`
The existing .bs-menu content REHOUSED into the room: the rendered menu-board/counter art with the order lines typeset as a real 90s laminated menu ON the board frame. Keep all existing wiring: Special = this week's pack (live name/href from episode-index), sides = Concept Card Pack + Pop Quiz ('taken next door at SUNNYVAiLE High — this is where you study for it'), and the on-the-house voice lines.
- **Behaviour:** Click the Special -> an order slip opens IN PLACE (designed HTML, magazine-grade — not a nav-away) with the pack summary and 'Take it to a table' -> the issue page. Ordering slides a rendered to-go cup along the counter to you and stamps the state. The Regulars (past packs) collapse behind one menu line — 'The Regulars · every past pack' — hub-and-reveal, opening in place; never a full pre-expanded list.

### The corkboard (the Wednesday lap + town crosslinks) `[NEW]`
A straight-on corkboard render with the 8 flyers baked in-render (texts already art-directed in blend-snap-cafe-jojo-match.png). REPLACES the numbered 'How the Wednesday lap works' list and both .sv-cta gold cards.
- **Behaviour:** Each flyer is a real link: STUDY PACK PICKUP -> the counter (in-page), POP QUIZ HELP -> sunnyvaile-high.html, CHICK FLICKS rewind club -> chick-flicks.html, BRONZE AiGE debrief -> bronze-aige.html, DELTA LAi NU girl talk -> sorority-house.html (do not promise open access — rooms are gated on the Resident Card), KSVL study session -> radio.html, LUMiNAiRY field trip -> luminairy.html, LIBRAiRY citation rescue -> library page. Hover lifts the flyer slightly (library .lift pattern); flyers are legible at rest so nothing is hunted for.

### Theme song button `[KEEP]`
The existing 'Down at the Blend & Snap' play button + playLaidiesTheme audio logic.
- **Behaviour:** Unchanged. Working feature — never remove.

### Episode-index JS `[KEEP]`
The existing fetch/filter published/sort/esc() logic and its honest fallback copy ('The menu is being restocked').
- **Behaviour:** Reused as-is to drive the Special, the Regulars panel, and the state line.

### Study Pack -> Closet tie `[REWORK]`
The current .sv-trip-tie card's truth ('trading cards drop into the Study Pack shelf of your Closet; full picker coming with the member card').
- **Behaviour:** Keep the honest not-built-yet statement, restyled off the gold shell — one plain line at the counter, same truth-telling register as the Post Office's closed parcel window.

### Third-place permission line `[KEEP]`
'Just here for the coffee? That's allowed too. Third places don't ask you to be productive.' — existing copy, good voice.
- **Behaviour:** Keep as small copy near the tables/footer of the room. Not a control.

### Meta/address fix `[REWORK]`
Meta description says MAiN Street No. 8; canon + eyebrow say No. 4.
- **Behaviour:** Correct the meta description in the same commit.

## Design direction
Full-bleed, room-integrated, hub-and-reveal, ~2,500px target (library benchmark; Post Office landed 1,661). Page-scoped CSS overrides only — do NOT touch the shared main{max-width:760px} in sunnyvaile-page.css (breaking the shell for all 14 is Ali's open call). Top to bottom: (1) global header; (2) JoJo hero, full and uncropped, edge to edge; (3) eyebrow row (No. 4 address + theme-song button, kept); (4) THE STATE BAND on near-black aubergine rgb(28,15,28) — JoJo's state line at homepage display scale (Jost 800, clamp to ~58px), candy accent words (pink #e982ab / teal #57b6c0 / coral #ec7a78 / periwinkle #b3abe7), one solid-candy button with DARK PLUM #3a1838 text at 10px radius (the house button — never white-on-dark pills); (5) THE ROOM — the counter/menu-board composite as the operable centrepiece, full width, with the order slip and Regulars opening in place directly beneath the board (library popup pattern: designed HTML cards with per-item accents, drop caps sparingly, never grey CSS blocks); (6) THE CORKBOARD — second full-width operable object; (7) one quiet line for the third-place copy + Closet truth line; (8) footer. Backgrounds never flat — the aubergine band plus the room art carry the page; any connective tissue gets a soft candy-tinted gradient, not cream. Typography per sunnyvaile-page.css tokens (Playfair display, Inter body, Jost for the big telling). Gold+plum retired: kill .sv-trip-tie and .sv-cta gold shells on sight. Brand spelling everywhere: "Ai" accent only in brand words (SUNNYVAiLE, LIBRAiRY, LUMiNAiRY); plain caps "AI" for the technology. No emoji in chrome. Mobile (max-width 760px): hero and state band reflow; the menu board restacks as a tall single-column menu (the library one-tall-bookcase pattern); corkboard flyers restack 2-up; carry the viewport meta (already present); tap targets 44px+.

## Signature detail (the 'cool S' of this building)
"THE USUAL." The page remembers your order the way JoJo does — which is the exact AI-memory metaphor this building canonically owns. First visit, the COFFEE column of the menu board is orderable (pure flavour, on the house): pick your drink — cortado, hazelnut mocha, chai latte. From then on, every arrival, a rendered to-go cup is already waiting on the counter with your drink sharpied on the sleeve, and JoJo's state line opens with "The usual?" (localStorage, no account needed — same tier as the Post Office box number). It is period-authentic (the sharpied cup name is 90s coffee-shop scripture), it makes the room feel like it knows you, and it quietly TEACHES the season's memory/context lesson: the first visit you had to spell out the order; ever after, the place knows it because you built the relationship. One line of small print can say exactly that.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `jojo-scene` | codex-render | decorative | exists | Hero/masthead — keeper scene as hero, Penny pattern. |
| `blend-snap-room-jojo-match` | codex-render | decorative | exists | The room the mechanic lives in; style anchor. |
| `blend-snap-menu-board-straight-on` | codex-render | **YES — this is the interface** | new | THE order mechanic — the picture you operate. |
| `blend-snap-corkboard-straight-on` | codex-render | **YES — this is the interface** | new | The Wednesday lap navigator — second picture you operate. |
| `blend-snap-togo-cup-transparent` | codex-render | **YES — this is the interface** | new | The 'usual' cup that waits on the counter; slides to you on order. |
| `order-slip-and-regulars-cards` | css/svg | **YES — this is the interface** | new | In-place reveal chrome for the Special and past packs. |

**`blend-snap-menu-board-straight-on`** — NEW — straight-on, dead-flat re-render of the cafe's backlit menu board in the exact jojo-match palette (magenta tile wall, teal/checkerboard Memphis trim, brass edge). Three columns baked in-render: COFFEE (latte, cappuccino, mocha, caramel latte, americano, chai latte, iced coffee), TODAY'S SPECIAL (baked header text only: 'THIS WEEK'S STUDY PACK — ASK JOJO', leaving generous clean board space beneath the header where the live HTML order lines sit), EXTRAS (espresso shot, oat milk, whipped cream...). All sign text IN-generation per codex-text-in-render; the only HTML overlay is the dynamic order lines, typeset as laminated menu lines, never CSS chips. 2:1-ish landscape, ~2000px wide, no perspective (composites straight-on like the library 3-bay case).

**`blend-snap-corkboard-straight-on`** — NEW — straight-on corkboard render, jojo-match palette (teal frame, warm cork, coloured pushpins, string lights optional), with all 8 flyers BAKED in-render at legible size, texts exactly: 'STUDY PACK PICKUP — new every Wednesday, cards included' / 'POP QUIZ HELP — SUNNYVAiLE HIGH, no judgment, just flashcards' / 'STUDY BUDDY WANTED — will trade notes for a latte' (fringe pull-tabs) / 'BRONZE AiGE post-quiz debrief' / 'CHICK FLICKS episode rewind club' / 'KSVL earworm study session' / 'LUMiNAiRY field trip — meet a MAiVEN' / 'DELTA LAi NU girl talk — bring receipts' / 'LIBRAiRY citation rescue'. Flyers spaced so each maps to a clean rectangular click region; brand-Ai spelling checked letter by letter (the existing room render garbles some — QC hard). Landscape ~1800px wide.

**`blend-snap-togo-cup-transparent`** — NEW — a single to-go paper cup with teal Blend & Snap sleeve, transparent background (RGBA — verify the alpha channel, the library shelves shipped RGB and it cost a day), straight-on, drawn so a name can be typeset on the sleeve's blank sharpie area in a handwritten web font. ~600px tall.

**`order-slip-and-regulars-cards`** — Designed HTML/CSS only — the order slip that opens in place (receipt-paper texture, dashed tear edge, per-pack candy accent) and the Regulars list panel. Library reader standard: designed spread, not grey text blocks.

## Reuses existing
This is FINISH + REFRAME, not rebuild-from-zero: the menu-is-the-interface concept is already Ali's own direction (recorded in the page comment) and its data wiring already works. Reuse: the entire episode-index.json fetch/sort/esc pipeline and its honest fallback copy; the Special/sides/Regulars menu copy and voice; the theme-song button + audio logic; sv-tour-checkin (Wednesday Tour stop) and all loaded site scripts; jojo-scene.png and blend-snap-cafe-jojo-match.png (both on disk, never used by the page); approved-assets/interiors/blend-snap-corkboard.png as composition reference only; the localStorage state pattern proven at the Post Office (laidies_po_last_read -> laidies_bs_last_pack). The trading-cards and quiz links stay pointing where canon says they live.

## Pitfalls (do not)
- Do not remove working features: theme button, episode-index wiring, tour check-in, the menu copy. Hubs reorganize sections, never delete them.
- Page-scoped CSS only — the shared main{max-width:760px} shell in sunnyvaile-page.css serves 13 other buildings; breaking it site-wide is Ali's open call, not this brief's.
- No CSS chips/coloured boxes laid over the art ('shitty css boxes slapped on a background' — rejected twice at the Post Office). Dynamic text sits on the rendered board's designed blank area as typeset menu lines, or in HTML panels BESIDE/BELOW the art, never as floating rectangles on a photo.
- No hotspot hunting, no numbered pins, no hover-to-discover — the boards' own baked text is the label, and the state line tells you your position before you touch anything.
- Never request blank sign panels from Codex; all static sign text in-generation. Only the genuinely dynamic lines (weekly pack title, past-pack names, the cup name) are HTML — and they get a designed, period-honest treatment.
- QC brand spelling in the new renders letter by letter: SUNNYVAiLE, LUMiNAiRY, DELTA LAi NU, LIBRAiRY — the existing jojo-match board garbles some words (VARELA LATTE, .Ai NU). Do not ship garbled text at operable size.
- Gold+plum retired: .sv-trip-tie and .sv-cta shells go; candy fill + dark plum #3a1838 text at 10px radius is the house button. Do not put the page on flat cream — measure index.html, don't guess.
- Do not build a fake economy: everything is on the house; no prices, no fake checkout. If the Closet card-drop picker isn't built, say so plainly (Post Office closed-window pattern).
- Corkboard's Delta LAi Nu flyer must not promise open chat — rooms are Resident Card gated (signed-in-gate memory).
- 'Ai' accent only in brand words; standalone technology is plain-caps AI. No emoji in UI chrome. The Pop Quiz is not a 'class' — 'class' is reserved for video lessons.
- State must be REAL: laidies_bs_last_pack is stamped only when she actually opens the pack; verify all three states in the browser before calling it done (the Post Office standard).
- Fix the stale 'No. 8' meta description to No. 4 in the same commit.
- sunnyvaile-high.html is owned by the classes window — link to it, never edit it from this work.

## Open questions for Ali
- Corkboard source: commission the fresh straight-on render (recommended — the room render's corkboard is only ~500px wide and its flyer text partly garbled), or crop/upscale the jojo-match region? Recommend fresh; Ali may prefer to try the crop first.
- Is 'the usual' drink-picking in scope for v1, or does Ali want the counter shipping with pack-ordering only and the usual as a fast-follow? It is the signature but it is additive.
- Does Ali want JoJo IN the operable room section (counter composite from her scene) or JoJo-as-hero + empty room below (current recommendation: her scene is the hero, the empty jojo-match room hosts the boards, so she isn't duplicated twice on one page)?
- What counts as 'picked up' for the state stamp — clicking Order (recommended: stamp on click-through to the issue page), or should the issue page itself stamp on load so arriving via Chick Flicks also counts?
- The Regulars flyer/panel: keep them as menu lines (current), or as rendered past-pack cups on a shelf (more art, more operable, more cost)? V1 recommendation: menu lines in the reveal panel.
- This is the audit's #2 Tier-A building — but which building rebuilds next after the Post Office is still Ali's call; confirm greenlight before build.

## Sequencing
Sequence: (1) Ali approves this brief + the Post Office direction it inherits; (2) commission the two Codex renders (menu board, corkboard) plus the cup — they are the only blockers, everything else exists; while they render, (3) build the state logic, rehouse the menu content, and stage the page against the existing jojo-match art so Ali can rate the layout early; (4) composite the delivered boards, verify the three arrival states + mobile 375px in the browser, fix the No. 4 meta, back up the old page to operations/ like the Post Office did, and write operations/blend-snap-decisions.md the moment Ali rules on anything. Do not self-certify — Ali rates the result.

