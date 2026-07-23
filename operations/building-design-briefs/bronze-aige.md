# The town bar. Keeper: COSMO the bartender — first male keeper, gay POC, "reads the room, knows your usual" (operations/town-keeper-roster.md). Happy hour from 4 (the Businesswomen's Special drink-picker); live show after 8 (band of the week). No Cosmo scene has been rendered yet, so the keeper is currently invisible on his own page. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `bronze-aige.html` · Priority: **med** · Effort: **L**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Order a drink and call a happy hour — walk up to the bar, let the fortune teller deal your drink, steal the conversation menu, and stamp a coaster for the week you showed up.

## Current state
The mechanic genuinely WORKS but is dressed as a worksheet: art 0/15, a 760px centre column, 5,581px tall (3rd-longest page in town), laid out as "Step 1 / Step 2 / Step 3" headings down a scroll. The interior render (bronze-aige-interior.jpg — which already contains the bar, the fortune teller sitting ON the bar, the jukebox, and the red-curtained stage) is inert as a ~216px header strip and never referred to again. The building's signature object, the fortune teller, isn't on the page at all: it's a gold link-card that ships you OUT to games/businesswomens-special.html. Working tools trapped in the column that MUST be kept: the Invite (date/time pickers → live-updating copyable invite + .ics download), Tonight's Specials conversation menu (its "Wednesday Special" auto-pulls the latest published episode's communityPrompt), the coaster stamp (localStorage, one ISO-week per stamp, a visible stack), the framed cocktail-party episode answers, the Main Character Spritz house cocktail (real Ryan C / CHAR No.5 credit), the Band-of-the-Week box with the live showtime clock (glows 8pm–2am, counts down otherwise) + play-the-song button, and the KSVL / Sorority House / Resident Card ties. Two defects to fix in passing: the coaster art reads "MAiN ST · No. 5" (canon is No. 7), and every card is bordered in retired gold on a plum-and-gold register that must be redesigned, not recoloured.

## THE MECHANIC (the one idea)
THE BAR TOP IS THE INTERFACE. You arrive standing at Cosmo's bar and operate the real objects sitting on it — the LIBRAiRY "the shelf is the interface" / Post Office "the room is the interface" pattern. The one physical object you pull is the paper FORTUNE TELLER on the bar: pinch it open and it deals your drink IN PLACE (the working cootie-catcher, embedded — never a link out again). Around it, every other tool becomes a thing on or behind the bar you click and it opens in place: the chalk MENU BOARD (Tonight's Specials), the COASTER you press to stamp, the INVITE PAD / bar tab you fill to call a happy hour, the FRAMED ANSWERS on the back wall (the cocktail-party episode explanations), and the STAGE/JUKEBOX (live show + band of the week). No object is a step in a sequence; each is a station in one room. Cosmo greets you with your STATE the moment you arrive (state-on-arrival), the way Penny says "you've got mail."

## Key elements
### Cosmo's greeting / the bar states your position on arrival `[NEW]`
A single plain-language line from the bartender at the top of the room, computed — not decorative. Reads the clock and localStorage and tells you where you stand: e.g. "Happy hour's on — the Special's pouring" (after 4) / "Doors at 8, soundcheck's open" (before the live window) / "Lights are down, the Embeddings are on" (8pm–2am) / "Week 30 — that's your 6th coaster" / "Your usual's the Main Character Spritz." This replaces the "How it works" 1/2/3 list entirely.
- **Behaviour:** Renders from the existing showtime clock (isLive 8pm–2am), the coaster localStorage (laidies_bronze_coasters count), and the Resident Card cocktail-of-week if present. No hover, no hunting — state first, then the objects.

### The fortune teller on the bar (THE operable object) `[REWORK]`
The Businesswomen's Special cootie-catcher, brought ONTO the bar top as the thing you pull. Currently a gold link-card that leaves the building.
- **Behaviour:** Click it → it pinches open (the working frame-1..5 flipbook) and deals your drink in a card that opens in place on the bar, drink saved toward the Resident Card. Reuses the existing frames + window.cocktailMenus / cocktailFortuneFlaps. Keep a quiet "play the full table version →" deep link to games/businesswomens-special.html; the drink-pick itself now happens IN the bar.

### The chalk Menu Board — Tonight's Specials (conversation menu) `[REWORK]`
The conversation menu (The One That Worked / The Disaster / The Hot Take / The Wednesday Special) as the bar's chalkboard behind the counter, not a bordered card.
- **Behaviour:** Click the board → it opens the four specials in place. KEEP the JS that makes The Wednesday Special follow the latest published episode's communityPrompt (fetch episode-index.json → issue-NN.json). Do not break the fetch.

### The coaster you stamp + your stack `[KEEP]`
A real cardboard beer-mat coaster on the bar with the BRONZE AiGE mark. The kept weekly-attendance mechanic.
- **Behaviour:** KEEP exactly as built: press "we went" → one stamp per ISO week, honor-system, the stack persists in localStorage and renders as a row of mini-coasters. Fix the mark to read No. 7 (canon), not No. 5. Stamped weeks leave overlapping wet-glass RING STAINS on the bar top (signature detail) so the stack reads as marks on the wood.

### The Invite pad / bar tab (call a happy hour) `[KEEP]`
The working invite builder — the town's actual happy-hour-calling tool.
- **Behaviour:** KEEP all logic: pickers seed next-Friday-4pm, live-rebuild the copyable invite text, Copy button + .ics download. Re-skin as an order pad you write on rather than a gold-bordered blush box. Opens in place from a "call one" object on the bar.

### The framed answers behind the bar (cocktail-party explanations) `[REWORK]`
The per-episode "okay but what IS it, actually?" answers, canonically framed behind the counter in the copy already.
- **Behaviour:** Click the frames on the back wall → the episode answers open in place as a small stack you flip, newest first. Keep all existing answer copy (Ep 01–04). Reveal, don't scroll.

### The stage / jukebox (live show + band of the week) `[REWORK]`
The live-music half of the building: Band of the Week, the showtime clock, the play-the-song button, the live-band photo.
- **Behaviour:** KEEP the showtime clock (glow + copy swap in the 8pm–2am window, countdown otherwise) and window.playLaidiesTheme audio button. Open from the stage/curtain object; bronze-aige-live-band.jpg becomes the reveal image, not a mid-page figure. Keep the KSVL hand-off line.

### House cocktail + Resident Card tie `[KEEP]`
The Main Character Spritz (real Ryan C / CHAR No.5 credit) and the "cocktail of the week rides home on your Resident Card" trip-tie.
- **Behaviour:** KEEP both with the real bartender credit intact (ryan-c-real-cocktail-credit). Fold the Spritz into the fortune-teller reveal or a small "house pour" note behind the bar rather than a separate gold aside. Keep the Resident Card link (customization-is-a-trip).

## Design direction
Full-bleed, one room, no 760px column, no long scroll — target ~2,500px like the working library build, done with PAGE-SCOPED CSS overrides only (do NOT touch the shared main{max-width:760px} in sunnyvaile-page.css; Post Office proved the page-scoped route so nothing else in town moves). Shape top to bottom: (1) the BAR fills the viewport as the hero-room — the new Cosmo bar-scene render (primary) or the existing bronze-aige-interior.jpg (bridge), edge to edge, Cosmo's state-line set left over the room, not in a boxed column; (2) the operable objects live ON that room as clip-path hotspots over the real furniture (Post Office pattern: the light-up is a brightened copy of the same image clipped to the object's shape so the room's real neon lifts — NEVER coloured CSS chips bolted onto the photo, which Ali calls "shitty css boxes slapped on a background"); (3) each object opens its panel in place, one at a time, hub-and-reveal. Palette = homepage target, gold RETIRED: field is the warm night-bar art itself (the endorsed adult night-bar register, not the banned hot-pink flat-lay), text is ink #3a1838 on light panels, accents are the candy set (pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) — NO gold borders, NO plum-and-gold card chrome. Type: Playfair Display headings, Inter body, VT323 only for a retro bar-signage/marquee accent. Section rhythm = uppercase eyebrow labels, no gold or emoji icons in chrome (emoji fine inside playful content like the drink flaps). Mobile (max-width 760px): the room reflows to a stacked "bar list" — Cosmo's state line, the fortune teller as a full-width tappable object, then the other stations as a short button list that opens in place; add the viewport meta if the rebuild drops it, and measure the rendered values at 375px before claiming mobile works.

## Signature detail (the 'cool S' of this building)
The wet-glass RING STAINS on the bar top. A real bar's counter is a palimpsest of overlapping pale rings left by cold glasses — and here each coaster you've stamped leaves its own faint ring burned into the wood, so your weekly-attendance stack reads diegetically as the marks you've left on the bar rather than as a UI counter. First-timers see a clean bar with one fresh coaster and a felt-tip doodle on it (a little heart / a phone number crossed out — the way every regular defaces a beer-mat); the more weeks you stamp, the more your corner of the bar shows you were here. It ties the one kept collectible mechanic to a period-true, lived-in delight — the Bronze equivalent of the LIBRAiRY's doodled "cool S in the margins."

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `ep00.bronze.b1of1.cosmo-behind-the-bar.g_paintedsv.r01` | codex-render | **YES — this is the interface** | new | The operable hero-room and, per the keeper lesson (Post Office: a keeper's scene is probably the hero), the correct hero. Currently missing entirely. |
| `bronze-aige-interior.jpg` | codex-render | **YES — this is the interface** | exists | BRIDGE hero-room that ships now: reuse as the operable room with clip-path hotspots over the fortune teller / bar / jukebox / stage (the furniture is already in frame) until the Cosmo scene lands. Verify each object is large/clear enough to be a usable hotspot; if not, the Cosmo render is required, not optional. |
| `bronze-aige-live-band.jpg` | codex-render | decorative | exists | The reveal image inside the stage/live-show panel (band of the week), instead of a mid-page figure. |
| `bws-fortune-teller/frame-1..5.webp` | codex-render | **YES — this is the interface** | exists | The embedded fortune-teller animation on the bar — reuse frames + window.cocktailMenus / cocktailFortuneFlaps so the drink-pick happens in the bar. NOTE: the older businesswomen-special-fortune-teller-v1 / -open-v1 PNGs are curation-REJECTED — use only the bws-fortune-teller/ frames. |
| `bronze-coaster-and-ring-stains` | css/svg | **YES — this is the interface** | new | The kept stamp mechanic + the signature detail, hand-buildable so no render dependency; press-to-stamp and the mini-coaster stack. |
| `bronze-menu-board-chalk` | css/svg | decorative | new | Diegetic surface for the kept episode-following conversation menu. |

**`ep00.bronze.b1of1.cosmo-behind-the-bar.g_paintedsv.r01`** — PRIMARY hero-room, straight-on so objects composite: COSMO the bartender (Black/Latino gay man, warm, mid-30s, Y2K bar dress) behind the BRONZE AiGE bar, holding out a Main Character Spritz, eye-level like Penny's post-office scene. In one frame, all operable furniture: the bar top with a paper fortune teller on it and one stamped cardboard coaster with a ring stain; a back-bar wall of bottles with a cluster of small FRAMED episode answers; a chalk 'TONIGHT'S SPECIALS' board; the jukebox at one edge; the red-curtained stage with the THE LAiDIES kick drum behind. Warm adult night-bar register (endorsed), NOT hot-pink party-clutter, NOT gold-filigree fairytale. Painted-SUNNYVAiLE style: crisp, dimensional, 'a realistic drawing that's clearly a drawing.' The picture IS the interface, so keep the bar-top objects clearly readable and un-crowded for clip-path hotspots.

**`bronze-coaster-and-ring-stains`** — The stampable BRONZE AiGE cardboard coaster (star + wordmark + 'MAiN ST · No. 7' — fix from No. 5) with a felt-tip doodle, plus the overlapping wet-glass ring-stain treatment on the bar top that grows with the coaster stack.

**`bronze-menu-board-chalk`** — The 'Tonight's Specials' chalkboard skin for the conversation-menu panel (chalk lettering on slate), replacing the gold-bordered card.

## Reuses existing
FINISH + REFRAME, not a rebuild. Keep every working tool intact: the Invite date/time→copy→.ics logic, Tonight's Specials with the episode-following Wednesday Special fetch, the coaster localStorage stamp + stack, the cocktail-party episode answers, the Main Character Spritz + Ryan C/CHAR No.5 credit, the Band-of-the-Week showtime clock + playLaidiesTheme audio, and the KSVL / Sorority House / Resident Card ties. Reuse bronze-aige-interior.jpg (already contains the bar, fortune teller, jukebox, stage) and bronze-aige-live-band.jpg as-is; reuse the bws-fortune-teller/ frames + cocktailMenus data rather than rebuilding the drink picker. The standalone games/businesswomens-special.html stays as the deep table version.

## Pitfalls (do not)
- Do NOT touch the shared main{max-width:760px} in assets/sunnyvaile-page.css — go full-bleed with page-scoped overrides only, like Post Office, so no other building moves.
- NEVER bolt coloured CSS chips onto the bar photo — Ali: 'shitty css boxes slapped on a background.' The light-up is a brightened clip-path copy of the same image (Post Office pattern).
- Don't drop or restyle-break the episode-following fetch on the Wednesday Special or the showtime clock — they are working keeper mechanics.
- Fix the coaster to 'No. 7' (canon per sunnyvaile-street-layout-canon); the current 'No. 5' is stale from before the 2026-07-04 renumber.
- Gold is retired sitewide as a REDESIGN not a recolour — remove the gold card borders/link-cards, don't just swap the hex. Plum comes from the artwork, never from panel fills.
- charm-hunt.js and sv-you-are-here.js place elements by % inside .sv-hero — keep a .sv-hero container (Post Office trap) or recheck charm coordinates.
- If the existing interior's fortune teller/objects are too small or oblique to be usable hotspots, the straight-on Cosmo render is required — flat objects composited onto an oblique room read as two rooms (library lesson).
- Keep the standalone BWS game working; the Bronze embed shares its cocktailMenus/cocktailFortuneFlaps globals — load order matters.
- State-on-arrival must be REAL (clock + localStorage + Resident Card), not a decorative greeting; if a state can't be answered honestly, say so plainly.

## Open questions for Ali
- Does Ali want the full new Cosmo bar-scene render now (strongest, introduces the first male keeper on his own page), or ship the reframe on the existing interior first and add Cosmo next? The keeper lesson argues for Cosmo as hero.
- Should the fortune teller on the bar be the FULL lane+mood game, or a lighter 'one pinch, one drink' pour that deep-links to the table version?
- Keep the Main Character Spritz as a discrete 'house pour' object behind the bar, or surface it only as the fortune teller's default result?
- Cosmo has a name and role but no established look yet — confirm his design before commissioning the hero render.

## Sequencing
Ships in two moves. Move 1 (no new art): kill the 760 column page-scoped, reframe to the bar-room on the existing bronze-aige-interior.jpg with clip-path hotspots, embed the fortune teller, convert the kept tools to hub-and-reveal panels, add Cosmo's state-line, retire the gold chrome, fix No.5→No.7. Move 2 (art): swap in the new Cosmo bar-scene hero once rendered. Do Move 1 after (or alongside) the Post Office verdict, since it reuses the exact same room-as-interface + clip-path + state-on-arrival pattern Ali is evaluating there.

