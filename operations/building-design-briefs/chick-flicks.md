# The Chick Flicks — a 1999 Blockbuster-style video rental store. Every episode is a VHS box; new releases drop Wednesdays. Its keeper is Becky, the video-store clerk (canon, named in operations/town-keeper-roster.md) whose job is curation — "what's worth the watch," "be kind, rewind." — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `chick-flicks.html` · Priority: **high** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Rent a movie — pull a tape off the wall and take it home.

## Current state
Half-shipped, and the good half is buried in the longest page in town (7,075px, art 16/30, trapped in the 760px shared column). What WORKS and is genuinely diegetic: the store-wall centerpiece — `chick-flicks-new-releases-empty-middle.webp` (1672×941), the rendered rental wall with the season's REAL VHS boxes (`episode-vhs-boxes/ep-01..05.webp`, alpha-trimmed) absolutely-positioned into its empty display bay at PIL-verified percentages; you click a box and it takes you home to the issue. That single section passes the core test (the picture IS the thing you operate). Also working and must survive: the "Your favourite tape" Resident-Card tie (`laidies_favorite_episode` → Closet), the mobile fallback strip (`.cf-wall-mobile`), the rendered aisle signs, the trailer player, CTAs. Then, right after the wall, the page GIVES UP and becomes a page again for ~5,000px: "Aisle 1 · Back Stock" (18 CSS spine-tapes EP06–24), "Browse by Aisle" (six stacked horizontal-scroll genre strips 2–7, several near-empty), and a "How rental works" prose band — all in the banned 760px column, all in retired plum/rose/gold chrome. The audit's "broken image (empty src) at page-y ≈2,972" is not in the source I read; the live culprit is almost certainly the EMPTY Aisle 6 · History strip (an `.cf-aisle-strip` div with zero children rendering as a dead shelf band) — the build must confirm and kill it.

## THE MECHANIC (the one idea)
The rental wall IS the interface. You don't browse a page — you stand in the store, the clerk tells you what just came in, and you pull a VHS box off the New Releases wall to take it home. The physical object you operate is the VHS box standing in the wall's display bay (already built, already working). Everything the page currently does in 5,000px of stacked strips below — back catalog, genre aisles — folds back INTO that one wall via an aisle switcher, so there is one operating surface, not seven.

## Key elements
### The clerk's word — state on arrival `[NEW]`
A plain-words marquee across the top of the store (the 'TELL ME' rule, Becky's counter, same job Penny does at the Post Office). States your position with no interaction, no hotspot hunting.
- **Behaviour:** On arrival it reads, in plain sentences: what's NEW this Wednesday (EP 04 · The Founding Mothers — computed live from content/episode-index.json latest published, NOT hardcoded); whether you've taken a tape home before ('You last rented EP 0X' from localStorage, else 'New in town? Start with EP 01 →'); and when the next drop lands (Wednesday). This is the first thing you see, before any clicking.

### The Rental Wall — the mechanic `[KEEP]`
The existing store-wall render with the season's real VHS boxes standing in its empty display bay. THE operable centerpiece — promote it from a buried mid-page section to the full-bleed heart of the page.
- **Behaviour:** KEEP exactly as it works: click a box → take it home (→/issues/issue-0N.html); ★NEW sticker rides the current drop; left bay holds eps 01–05, right bay fills with 06–10 as they release; coming-soon tapes sit in the wall DIMMED (never hidden — the shelf tells the truth, same as the LIBRAiRY's dimmed books). Preserve the PIL-verified compositing percentages (bay left 9.3% / top 36.5% / width 50.9% / height 31.6%; slots 17.2%) — those were measured, do not eyeball new ones.

### Aisle switcher — hub-and-reveal `[REWORK]`
A single row of aisle tabs (All · Prompting · Style & Voice · Everyday · Ethics · History · Creative) that REPLACES the entire 5,000px of stacked content: Aisle 1 back-stock spines AND the six genre strips 2–7.
- **Behaviour:** Click an aisle → the SAME rental wall re-populates in place with that aisle's tapes (released = box art you click to take home; not-yet-shot = dimmed spine/standee in the wall). One aisle shown at a time. 'All' shows the full Season 1 wall. This is the reveal surface — the wall is the one place everything opens, so the page stops being a vertical stack. Carries the truth-telling the spines/standees did (EP06–24 exist as dimmed stock) without 5,000px of scroll.

### Your video-store member card / favourite tape `[KEEP]`
The existing Resident-Card tie, reframed as the laminated 1999 video-store membership card it always was.
- **Behaviour:** KEEP the working mechanic verbatim: laidies_favorite_episode in localStorage, star toggles, note about syncing to the Closet. Do NOT remove or rebuild it. Reframe the surrounding copy from a bolt-on card to 'the tape that goes on your member card.'

### The due-date stamp (signature delight) `[NEW]`
A CSS/SVG rubber stamp + manila rental card that fires when you take a tape home.
- **Behaviour:** Taking a tape home thunks a purple 'RETURN BY FRI' rubber stamp onto a little manila rental card in the sleeve — nothing is ever actually due (the joke is the joke, which the current copy already sets up). The stamp records what you took home to localStorage, which is what feeds 'You last rented EP 0X' on your next arrival — closing the loop between the two states.

### House rules + cross-links `[REWORK]`
The 'How rental works' content, demoted from a prose band to an in-world counter sign.
- **Behaviour:** Fold the five rules into a small 'HOUSE RULES · est. 1999' card pinned by the counter (or inside the aisle switcher's overflow), NOT a full-width editorial band. KEEP the working cross-links: Study Pack next door at Blend & Snap, Wednesday Postcard via the Post Office, Pop Quiz at SUNNYVAiLE High. Keep 'Be kind. Please. Rewind.'

### CTAs + Trailer player + mobile strip `[KEEP]`
The bottom-of-page primary actions, the embedded trailer player, and the <640px tape strip.
- **Behaviour:** KEEP all three. Restyle the CTAs to homepage candy buttons (retire the gold/plum). The trailer 'first time here?' block and data-sv-trailer-player stay. `.cf-wall-mobile` stays as the sub-640px fallback since composited in-photo tapes get untappable.

## Design direction
Full-bleed, room-integrated, hub-and-reveal — the same shape that made the LIBRAiRY work, at a video store. TOP-TO-BOTTOM: (1) The store as a full-bleed room, not a 216px header strip. The rental-wall render IS the room the mechanic lives in — it already breaks its 760px cage via `.cf-storewall-wrap{width:min(1140px,96vw)}`; push it to genuine full-bleed and let it carry the page. Becky's counter/marquee (the clerk's word) sits INSIDE or directly beneath the storefront, left-aligned over the art like the homepage hero — not a boxed lede in a dead-margin column. (2) The wall with its real tapes, centered and large. (3) The aisle-switcher tab row directly under the wall — this is the whole navigation; it re-skins the wall in place. (4) A compact counter zone: member card + house-rules sign + CTAs. Target height ~2,500px (down from 7,075) — the collapse comes from folding six stacked strips into one switchable wall. KILL THE 760px COLUMN with PAGE-SCOPED overrides only (exactly how the Post Office did it — do NOT touch the shared `main{max-width:760px}` in sunnyvaile-page.css, or 13 other buildings move). COLOUR: retire the page's plum/rose/gold panel fills, `#4b2148` gradients, and `rgba(212,168,83)` gold borders — the plum comes from the ARTWORK's own warm video-store neon, not from panel chrome. Accent system = homepage candy: pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7; body ink #3a1838; cream/white only where there's no art. Big bold Jost display; the neon 'OPEN'/marquee register the current signage strip already reaches for is on-brand — keep that energy, drop the gold. No emoji in chrome (typographic ★/◆ are fine, as on Post Office). Y2K-honest storefront (Clueless/Blockbuster '99), never fairytale.

## Signature detail (the 'cool S' of this building)
The due-date rubber stamp: pull a tape and a manila rental card gets thunked with a crooked purple 'RETURN BY FRI' stamp — nothing is ever due (the joke is the joke), it records what you took home, and it feeds the clerk's greeting next visit.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `ep00.char.b1of1.becky-rental-counter.g3.r01` | codex-render | decorative | uncertain | The keeper hero that TELLS you your state (new release / what you last rented) — the Chick Flicks' Penny. Highest-value new ask; makes the clerk's word feel like a person, not a banner. |
| `chick-flicks-new-releases-empty-middle` | codex-render | **YES — this is the interface** | exists | THE operating surface. The wall you pull tapes off. Promote to full-bleed; it already carries the whole mechanic. |
| `episode-vhs-boxes-ep-01-through-05` | codex-render | **YES — this is the interface** | exists | The physical objects you operate — click a box to take it home. Eps 06+ render weekly per the shipped release procedure. |
| `chick-flicks-aisle-signs-set` | codex-render | decorative | exists | Chrome/labels for the aisle switcher tabs. Reuse; do not re-render. |
| `cf-due-date-stamp-and-rental-card` | css/svg | **YES — this is the interface** | new | The signature-detail delight fired on take-home; also the visual for the recorded 'last rented' state. |
| `cf-rented-slot-backer` | css/svg | decorative | new | Reinforces that pulling a tape is a real physical take-home, not a hover state. |

**`ep00.char.b1of1.becky-rental-counter.g3.r01`** — Becky, the video-store clerk, behind the Chick Flicks rental counter, shot STRAIGHT-ON so it composites: a Y2K video-store counter (register, tape-return slot, a 'NEW RELEASES WEDNESDAY' standee, popcorn), Becky mid-recommendation holding a tape out to you. Diverse young woman in 1999 dress. Leave the counter surface/foreground relatively clear so a state card / new-release ticket can composite onto it. Warm video-store neon (teal + pink), crisp dimensional Y2K illustration ('a realistic drawing that's clearly a drawing'), never fairytale.

**`cf-due-date-stamp-and-rental-card`** — A manila/kraft rental card with ruled lines and a purple 'RETURN BY FRI' rubber-stamp mark (crooked, heavy ink) plus a small 'BE KIND · REWIND' ticket. Hand-built.

**`cf-rented-slot-backer`** — The empty-slot backer that shows behind a pulled tape — a cardboard 'RENTED' backer card with the title, sitting in the wall's now-empty slot. Hand-built (or a simple dimmed treatment of the box).

## Reuses existing
Reuse heavily — this is finish + reframe + collapse, NOT rebuild. Keep: the store-wall render + its PIL-verified compositing geometry; ep-01..05 VHS box webps; all aisle-sign webps; the shelf-parts (crown/kick/upright/row-tile) only if still needed for the switcher texture; the `laidies_favorite_episode` favourite-tape/Closet JS (unchanged); `.cf-wall-mobile` strip; the trailer player (data-sv-trailer-player); the CTA block; charm-hunt/directory/nav/tour scripts. The weekly release procedure in memory (chick-flicks-shelf-system.md) still governs adding eps — don't break its selectors without updating it.

## Pitfalls (do not)
- Do NOT touch the shared `main{max-width:760px}` in assets/sunnyvaile-page.css — kill the column with PAGE-SCOPED overrides only, exactly as the Post Office did, or 13 other buildings shift.
- charm-hunt.js places charms by % inside `.sv-hero` (coords 31,55 / 66,73 / 23,55 land on shelves/return bin). If you replace or restructure the hero, either keep `.sv-hero` or recoordinate the charms — same trap that bit the Post Office.
- Don't remove the working favourite-tape / Resident-Card mechanic (dont-remove-working-features). Reframe it, keep the localStorage + Closet behaviour.
- Gold+plum is RETIRED sitewide — the page is currently full of `--plum`, `--rose`, `#4b2148` gradients and `rgba(212,168,83)` gold borders. Redesign to candy accents, don't recolour; the plum must come from the artwork's neon, not panel fills.
- The audit's 'broken image, empty src, ~2,972px' — hunt the LIVE page; the likely culprit is the empty Aisle 6 · History strip (a childless `.cf-aisle-strip`). It disappears once the stacked aisles collapse into the switcher, but confirm no literal empty-src <img> survives.
- Don't fake a mechanic with CSS chips on the photo (the Post Office v1 failure). Tapes work because they're real rendered objects; keep new controls as real objects (stamp, backer card), not coloured boxes slapped on the render.
- Keep the measured store-wall bay percentages — they were PIL-verified; re-eyeballing them will float the tapes off the board.
- No emoji in UI chrome; typographic ★/◆ are acceptable.

## Open questions for Ali
- Does a Becky scene render already exist (check assets/town-characters/scenes/ and the keeper roster) before commissioning a new one? Per the Penny/Post-Office lesson, the keeper's scene is often the hero — but the current `chick-flicks-store.jpg` interior may already contain enough room to serve as the marquee backdrop cropped differently.
- Is there any 'watched/rented history' store today, or only `laidies_favorite_episode`? The 'you last rented EP 0X' state needs a source — if none exists, the due-date stamp writing to localStorage is the honest way to create it; confirm Ali wants that new key.
- Lead with the wall render as the full-bleed room, OR keep `chick-flicks-store.jpg` as an establishing sliver above it? One room, not two — pick one so it doesn't read as two different stores.
- Aisle-as-filter (one wall re-populates) vs. keeping genre as a distinct browse: the brief assumes the switcher re-skins the single wall. Confirm that collapse is the intended direction before building.
- Should the aisle switcher live as tabs under the wall, or as a small in-store directory board (a Blockbuster genre-endcap sign) to stay diegetic? Leaning diegetic.

## Sequencing
Strong candidate for the second building rebuilt after the Post Office proof, precisely because the hard part is already done: the operable mechanic (real tapes in a real wall) ships and works. The work is (1) collapse ~5,000px of stacked strips into one switchable wall, (2) add the clerk's state-on-arrival marquee, (3) add the due-date-stamp loop, (4) retire gold+plum to candy, (5) full-bleed the wall with page-scoped overrides. It's the biggest single length win in town (7,075 → ~2,500). Gate on the two art questions (Becky scene exists? watched-state source?) before the build starts. Do not touch sunnyvaile-high.html or the shared shell.

