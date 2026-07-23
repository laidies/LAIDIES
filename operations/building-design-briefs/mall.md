# The Mall — SUNNYVAiLE, MAiN Street No. 9. The town's shopping concourse and its HUB: a domed centre-court atrium with a fountain, a physical Mall Directory board, and eleven storefronts (ten themed pop-culture reference stores + one vacant "Now Leasing" unit) that route out to the individual store pages under /mall/*.html. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `mall.html` · Priority: **med** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Walk the corridor and go into a store.

## Current state
Best of Tier B, and it half-works. What already works and must be KEPT: (1) the 11 storefronts are real photographic renders you click — art 11/24, the highest operable-art count of any Tier B page; (2) the Mall Directory board is genuinely diegetic (a "YOU ARE HERE" mall map listing all ten units); (3) the "NOW LEASING · Unit 11" vacant storefront routes to the Burn Book so residents can request references and "the mall expands" — a clever, in-world empty-state; (4) a "Now Open · The Gift Shop" banner routes to /shop.html. THE FAILURE (audit): all of this is trapped in a 760px centre column as a vertical 2-column grid of separated rounded cards with 24px gutters (h 3,556). The gorgeous atrium render — a full mall court with a fountain and storefronts ringing it — is burned as a ~216px header strip and never referred to again. The corridor you're supposed to WALK is a stack of cards. Chrome is on the retired gold+plum system: the Directory board is teal with gold text (#ffd982 / #c9a227), "YOU ARE HERE" is a gold star, "Walk in →" is rose #9b3f5f. The Directory's own search ("find a store / find a reference") is stubbed — "still brewing." The global sv-you-are-here.js plum-pill/gold-star badge (condemned sitewide) is still loaded.

## THE MECHANIC (the one idea)
The concourse IS the interface. The eleven storefront windows — set shoulder-to-shoulder, floor-line to floor-line, as ONE continuous mall frontage — ARE the buttons. You walk the corridor and click a lit window to go into that store. Two facts make this the honest mechanic and not decoration: the storefront photos are ALREADY the click targets (keep that), and all eleven renders share the identical terrazzo checkerboard floor and glass-arcade skylight, so butted edge-to-edge with no gaps and no rounded corners they read as one unbroken concourse you're standing in — not a grid of cards. Unlike the LIBRAiRY (which opens books in place), the Mall's verb is literally "go INTO a store," so clicking a window navigating OUT to /mall/<store>.html is correct — this is the town hub; routing is its job. The reframe is not "make it open in place," it's: kill the 760 column, weld the storefronts into a walkable corridor, turn the atrium from a header strip into the room you arrive in, and finish the Directory so it tells you your state.

## Key elements
### Centre-court arrival (the room) `[REWORK]`
The existing the-mall-atrium.jpg promoted from a 216px header strip to a full-height, full-bleed arrival view: you have walked INTO centre court, under the dome, at the fountain. Title 'The Mall.' + eyebrow 'MAiN Street · No. 9 · SUNNYVAiLE' set INTO the image over the left third, homepage-style (not in a boxed column below it).
- **Behaviour:** State on arrival, in plain words, no interaction: you're standing in the mall court, the fountain runs, the storefronts are visible around you. The fountain is the one live object here (see signature). No hotspot hunting — the atrium is the room, not a click-maze.

### The Mall Directory (what the building TELLS you) `[REWORK]`
The diegetic directory board — the single best-praised element — restyled off gold onto the candy palette as enamel mall signage. Lists all ten stores by unit number, plus the two live状态 lines: NEW THIS SEASON (The Gift Shop, now open) and NOW LEASING (Unit 11). Keeps its 'YOU ARE HERE'.
- **Behaviour:** On arrival it states position and inventory without a click: here is where you are, here are the ten departments, here's what just opened, here's the empty unit. Its search field ('find a store — or any reference') gets FINISHED: typing 'Dunkaroos' points to the Food Court, 'Cher' surfaces Rollin' with my Homies + As Seen on TV; a no-result routes to the Burn Book ('We don't have ___ yet — put it in the Burn Book →'). Client-side filter over the store list / reference index.

### The corridor (the walk) `[REWORK]`
The eleven storefront renders welded into one continuous, full-bleed concourse — windows butted edge-to-edge, shared floor and ceiling line, NO rounded cards, NO 24px gutters, NO 760 column. Each store keeps a slim base plate: unit no. + one-line description + 'Walk in →'.
- **Behaviour:** You walk it. Desktop signature interaction: a horizontal 'walk' (drag / arrow keys / edge affordances) with a subtle skylight parallax, so moving down the concourse feels like walking past shopfronts. Click any window → go into that store (/mall/<store>.html). The 'lit-window sheen' and gentle scale on hover (already built) stay as the 'walk past the glass' shimmer; prefers-reduced-motion already kills them. Mobile: the corridor wraps to full-width storefronts stacked as you scroll (still edge-to-edge frontage, no cards). Horizontal walk must never be the ONLY way in — every window is also a plain reachable link.

### Unit 11 · NOW LEASING `[KEEP]`
The vacant-storefront render at the end of the corridor, papered with a NOW LEASING sign.
- **Behaviour:** Sits as the last frontage in the walk; clicking it routes to the Burn Book to nominate a missing reference — 'the mall expands.' Keep exactly; it's the in-world empty-state. Fold the redundant bottom 'Put it in the Burn Book' CTA into this so the mechanic lives in one place.

### The Gift Shop banner `[REWORK]`
'Now Open · The Gift Shop' promo routing to /shop.html (POD merch — the monetization priority).
- **Behaviour:** Keep as a live callout, but surface it as the Directory's 'NEW THIS SEASON' line and/or a marquee storefront in the corridor rather than the current plum/rose gradient bar. Restyle off plum onto candy.

### Site chrome `[KEEP]`
sv-header, KSVL player, tour check-in, ai-accent autowrap, directory JS.
- **Behaviour:** Keep. EXCEPTION: drop the sv-you-are-here.js global plum-pill/gold-star badge (retired sitewide) — the Directory's own 'YOU ARE HERE' covers it in-world.

## Design direction
Full-bleed, edge to edge, top to bottom — kill main{max-width:760px} entirely for this page (page-scoped override, don't touch the shared shell). Shape, three bands, ~2,500px target (down from 3,556): BAND 1 — the arrival room: the atrium render full-bleed and tall (not a strip), title + eyebrow set into the image over the left third in big bold Jost display (h1 ~75px/800 per the homepage bar), fountain live. BAND 2 — the Directory: candy-enamel signage board, legible, stating inventory + what's new + what's leasing + the finished search; this is the hub, one screen, no scrolling to reach it. BAND 3 — the corridor: one continuous full-bleed concourse of the eleven storefronts, welded edge-to-edge with matched floor/ceiling lines so it reads as a room you're walking, not a card grid; horizontal 'walk' is the signature motion on desktop, wraps to a stacked full-width frontage on mobile. Colour: retire ALL gold and plum chrome — recolour the Directory, unit numbers, 'YOU ARE HERE', and 'Walk in →' onto the homepage candy set (pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7; ink #3a1838 for text on candy). The plum register that remains comes only from the ARTWORK (the storefront renders), never from panel fills. No flat cream fields, no small type on flat backgrounds — the page should read dark/big/loud like the homepage, with the storefront photography carrying the colour. Type: Jost display throughout; keep the 'Ai' accent spans (PIECES OF FLAiR, MAiYBE, LAiDIES). No emoji in chrome. No gold CSS icons.

## Signature detail (the 'cool S' of this building)
The centre-court fountain — the universal 1999 mall ritual. In the atrium arrival image the fountain runs; click it and a penny arcs in, plinks, and the water ripples out. That's the whole delight: you tossed a coin in the mall fountain and made a wish. Silent (no audio — KSVL owns site sound), self-contained, optional, and it lives INSIDE the arrival render so it reinforces 'you're standing in centre court' instead of decorating it. It's the Mall's equivalent of the library's cool-S-in-the-margins: nobody NEEDS it, everybody who grew up at the mall will grin. (Stretch, only if it stays lightweight: the ripple surfaces a one-line fortune in the Mme CLAiO register — but the coin-and-ripple alone is enough; do not let it balloon into a game.)

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `the-mall-atrium` | codex-render | **YES — this is the interface** | exists | The room you arrive in — centre court, state-on-arrival, host of the fountain signature. |
| `mall-storefronts-set` | codex-render | **YES — this is the interface** | exists | The walkable concourse — each window is a store you go into. |
| `fountain-coin-ripple` | css/svg | **YES — this is the interface** | new | The signature delight — the mall-fountain wish. |
| `directory-enamel-signage` | css/svg | **YES — this is the interface** | new | State-on-arrival hub + search, in-world, off the retired gold system. |
| `storefront-seamless-edges` | css/svg | decorative | uncertain | Make the corridor read as one welded room rather than tiled cards. |

**`fountain-coin-ripple`** — NEW, hand-buildable — a CSS/SVG coin-toss + concentric water-ripple animation layered over the fountain region of the atrium render (coin arcs in, plinks, rings expand and fade). No new AI art needed; positioned to the fountain in the atrium image.

**`directory-enamel-signage`** — NEW, hand-buildable — the Mall Directory restyled as candy-enamel mall signage in CSS (backlit-panel look, YOU ARE HERE marker) replacing the teal+gold board. Data stays HTML (store list, what's-new, what's-leasing are dynamic/state, so not baked into a render).

**`storefront-seamless-edges`** — UNCERTAIN / optional — if butting the eleven 1000×667 renders edge-to-edge shows a visible seam where floor/ceiling lines don't perfectly meet, request a light re-export (or CSS mask/overlap) so the frontage reads as one continuous concourse. Verify in-browser first; likely solvable in CSS, so treat as a fallback, not a blocker.

## Reuses existing
Almost everything. The atrium hero, all eleven storefront renders, the Directory board, the Unit-11→Burn Book empty-state, the Gift Shop banner, the lit-window-sheen and hover-scale, and the site chrome all already exist and work. No new AI/Codex art is required to ship the core reframe — the two 'new' assets are CSS/SVG (the fountain ripple and the re-skinned Directory). This is a finish + reframe, not a rebuild from zero.

## Pitfalls (do not)
- Do NOT overlay clickable hotspots on the atrium render to make its baked-in storefronts navigable — only ~6 of 10 stores appear in it, invisible hit-regions are the exact 'hunt the hotspot' UX Ali banned, and it duplicates the corridor. The atrium is the room; the separate storefront renders are the corridor.
- Do NOT keep the 760px column or the separated rounded-card grid — that IS the diagnosed failure. Storefronts must butt edge-to-edge as continuous frontage.
- Do NOT recolour in place — swapping the gold hex on the existing teal board is a recolour; the board needs to become candy-enamel signage. Gold+plum is a redesign, not a find-replace.
- Do NOT add audio to the fountain (preview audio bleeds; KSVL owns site sound). Ripple is visual only.
- Horizontal 'walk' must have a keyboard/scroll fallback and every window must be a plain link — do not make the walk the only path in, and respect prefers-reduced-motion (already wired).
- Don't verify from source — measure the welded corridor and page height in the browser at 1440px and at 375px before calling it done (target ~2,500px, no horizontal body overflow on mobile).
- The atrium render leans slightly ornate (marble/gilt/heart-gems) vs the Y2K-honest storefronts — acceptable as the grand mall court, but flag if it reads fairytale next to the candy corridor.

## Open questions for Ali
- Address collision: the page says MAiN Street No. 9, but the customization canon also puts MAiKEOVER at 'Main St No. 9'. Keep No. 9 as shown, or reconcile? (Pre-existing; not introduced here.)
- CLAiRE'S vs PIECES OF FLAiR: Unit 01 is labelled PIECES OF FLAiR on the live page and directory (both claires.html and pieces-of-flair.html exist). Confirm PIECES OF FLAiR is the locked name and claires.html can retire/redirect.
- Directory search scope: finish it as store-name-only (fast, small), or wire it to the full reference index the inventory plan envisions (~290 cards across ten stores)? Recommend shipping store-name + a curated reference alias list first, Burn Book for misses.
- Does the coin-ripple stay a pure visual wish, or surface a one-line fortune? Recommend visual-only for v1 to avoid scope creep.

## Sequencing
High-leverage and low-risk because NO art is blocking — unlike the LIBRAiRY (waiting on a backdrop + alpha shelves) or pages needing fresh renders, every asset the Mall needs already exists. It can slot in early right after the worst-tier rebuilds (Post Office done; Library promotion; Visitors Centre) precisely because it's a finish, not a commission. It's also the town HUB that routes to the other buildings, so fixing it improves every other building's front door. Sequence: (1) kill the 760 column + weld the corridor + promote the atrium to a room; (2) retire gold/plum chrome onto candy; (3) fountain signature; (4) finish the Directory search; (5) measure at 1440/375 before shipping.

