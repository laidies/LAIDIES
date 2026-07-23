# A three-winged devotional hall you walk into. You cross the nave and push open one of three great stained-glass doors; that wing floods open in place around you. Then you honor individuals — hear a SAiNT's anthem, meet a MAiVEN, light a Luminary to your Coven. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `luminairy.html` · Priority: **med** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Enter a wing.

## Current state
Best-behaved page in the audit (art 3/6, h2195) and the ONLY building that already does the library mechanic: three wing-door photographs, each opens its wing IN PLACE via the wing-door/wing-panel toggle JS. But it is trapped in the banned 760px centre column, the whole page is built on RETIRED gold+plum chrome (every --gold/--plum border, the foundress-case gradients, eyebrows, buttons), the gorgeous nave hero is an inert ~216px header strip, and it never tells you your state on arrival. Three full wing-INTERIOR renders (luminairy-{saints,maivens,trailblazers}-wing.png, 1536×864) are already delivered and sit completely UNUSED. This is a layout + coherence reframe, not a rebuild — almost every mechanic below already works and must be kept.

## THE MECHANIC (the one idea)
The DOORWAY is the interface — the library's "the shelf IS the interface" translated to a chapel. You arrive standing IN the full-bleed nave; three great stained-glass doors stand across it (SAiNTS / MAiVENS / TRAiLBLAZERS). You push a door — the operable picture is the door itself, not an illustration of one — and its wing swings open in place, its cards standing INSIDE that wing's own interior render (the three unused -wing.png rooms) so the wing reads as a room you walked into, not a text panel. The physical object you operate: the three doors. One open at a time; the nave never scrolls away underneath.

## Key elements
### Full-bleed nave arrival `[REWORK]`
The nave interior edge-to-edge (kills the 760 column), with the LUMINAiRY wordmark, the pledge inscription ('We pledge Allegiance to the united SAiNTS of SUNNYVAiLE') and a one-line lede set left over the left of the picture — homepage hero pattern, NOT a boxed column on a flat field.
- **Behaviour:** Static hero-room. The pledge is the shrine's carved inscription, kept verbatim.

### State-on-arrival plate = the votive candle rack `[NEW]`
A lit-candle shelf that TELLS you your position in plain words the moment you land: your picked Saint / Maven / Trailblazer (or 'no Luminaries lit yet — pick one below'), and 'MAiVENS met: X / 8'. Reads localStorage keys laidies_saint/laidies_maven/laidies_builder + laidies_mavens_collected that the page ALREADY writes.
- **Behaviour:** No hotspot hunting — state is stated. A lit candle per chosen Luminary; empty holders when none. Lighting a candle happens live when you tap a coven-pick below.

### The three wing doors (the operable triptych) `[KEEP]`
luminairy-saints-wing-door.jpg / -maivens- / -trailblazers- (640×800, 4:5), standing full-height across the nave as three pushable stained-glass archways.
- **Behaviour:** KEEP the exact wing-door → wing-panel toggle + hash deep-links (#saints/#mavens/#builders/#trailblazers already map). Push a door: its wing opens in place, others close. Rework the chrome from small gold-framed cards in a grid to full-height doors set into the nave.

### Wing interior as the room the cards stand in `[NEW]`
Each open wing panel gets its wing's own interior render as the composited backdrop (the currently-UNUSED luminairy-{saints,maivens,trailblazers}-wing.png), the way the library shelf stands in its room render.
- **Behaviour:** Cards sit on/in the wing render so an open wing feels like a room, not a text block. New wiring of existing art.

### PATRON SAiNTS wing `[KEEP]`
14 flippable stained-glass saint cards (front: portrait+rule; back: canon rule + anthem artist + source), ♪ Her song audio buttons, and the 'Play all 8 anthems' playlist.
- **Behaviour:** KEEP entirely — flip hydrator, playLaidiesTheme audio, playlist auto-advance all work. Reframe card chrome to candy.

### The MAiVENS wing `[KEEP]`
Holo Foundress case (First Four: Ada/Grace/Hedy/Karen, seal retired = always shown), 8 living Keepers with click-to-collect '✦ Meet her' + 0/8 progress bar, the 'wider wing' extras, the verified bio modal (sourced), the Turing in-memoriam plate, and the honesty note about who was kept out.
- **Behaviour:** KEEP all mechanics — collect writes localStorage, modal pulls MAVEN_BIOS with real source links, ?meet=<slug> deep-link opens a bio. Reframe gold chrome → teal candy; keep stained-glass portraits (devotional art is EXEMPT from the storefront de-fairytale rule).

### The TRAiLBLAZERS wing `[KEEP]`
6 builder cards (Murati, D. Amodei, Ibrahim, Simo, Finn, Askell), roster-grows copy.
- **Behaviour:** KEEP. Reframe chrome → tangerine candy.

### Coven pickers — 'One of my Luminaries' `[REWORK]`
A pick chip on every SAiNT/MAiVEN/TRAiLBLAZER card, one pick per pantheon, writing the same Closet keys the Resident Card reads.
- **Behaviour:** KEEP the toggle logic. NEW: picking a Luminary lights its candle on the nave votive rack (the signature detail) so the pick has a physical, visible consequence.

### Footer ties `[REWORK]`
Resident-Card patron-saint tie ('this is where you devote'), the 'Same person, two addresses?' Mall crosslink, and the two CTAs.
- **Behaviour:** KEEP copy + links; restyle off gold/plum onto candy + ink #3a1838.

## Design direction
Full-bleed top to bottom, no centre column ever. SHAPE: (1) full-bleed NAVE hero — nave render edge-to-edge, wordmark at homepage register (Jost 800, ~75px h1) + pledge inscription + one-line lede left-aligned over the left of the picture, candy not gold. (2) The VOTIVE RACK state plate immediately under the hero — a lit-candle shelf stating your Luminaries + MAiVENS-met in plain words (state on arrival). (3) The three DOORS as a full-width triptych standing in the nave — not a 3-up grid of framed cards in a text strip; full-height archways, each door tinted to its wing. (4) The open WING PANEL reveals in place, its cards composited into that wing's interior render, hub-and-reveal, one wing at a time, page stays short with wings closed (~2,500px target, wings closed near current 2,195). (5) Footer ties. PALETTE: retire gold+plum entirely (redesign, not recolour) → homepage candy as TYPE and accent colour, ink #3a1838 body, cream/pearl where there's no art. Map each wing to one candy accent: SAiNTS = pink #e982ab (rose glass), MAiVENS = teal #57b6c0 (blue glass), TRAiLBLAZERS = tangerine #f4a636 (amber glass) — reads straight off the existing door art. KEEP the devotional stained-glass PORTRAITS untouched (exempt). Type: Playfair Display display / Jost UI, per the SV stack. Backgrounds gradient or image, never flat. No emoji or gold-line icons in chrome — eyebrow-label + clean heading like the homepage.

## Signature detail (the 'cool S' of this building)
The votive candle rack. The LUMINAiRY is literally a place of light and the page already says 'light a candle, pledge your allegiance' — so the Coven pick becomes a candle you light. A small tiered rack of church votive candles sits in the nave as the state plate: dark until you pick a Luminary, then one warm flame per chosen Saint / Maven / Trailblazer, with her name on the holder. It IS your state-on-arrival readout ('these three are lit') AND the live payoff of the existing coven-pick chip — tap 'One of my Luminaries' and a candle catches. Period-honest 90s-girlhood shrine (votives + the pledge-of-allegiance inscription), and it makes an invisible localStorage toggle into something you can see burning.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `luminairy-nave-triptych-backdrop` | codex-render | decorative | uncertain | The full-bleed room the three operable doors stand in, so the nave stops being an inert header strip. |
| `luminairy-nave` | codex-render | decorative | exists | Fallback full-bleed arrival room if the triptych backdrop isn't rendered; the three door cards can composite over it via CSS. |
| `luminairy-saints-wing-door` | codex-render | **YES — this is the interface** | exists | Door 1 — the operable picture you push to enter the SAiNTS wing. |
| `luminairy-maivens-wing-door` | codex-render | **YES — this is the interface** | exists | Door 2 — push to enter the MAiVENS wing. |
| `luminairy-trailblazers-wing-door` | codex-render | **YES — this is the interface** | exists | Door 3 — push to enter the TRAiLBLAZERS wing. |
| `luminairy-saints-wing-interior` | codex-render | decorative | exists | Room backdrop the SAiNT cards stand in when the wing opens — currently unused, wire it. |
| `luminairy-maivens-wing-interior` | codex-render | decorative | exists | Room backdrop for the MAiVENS wing cards + Foundress case. |
| `luminairy-trailblazers-wing-interior` | codex-render | decorative | exists | Room backdrop for the TRAiLBLAZERS wing cards. |
| `votive-candle-rack` | css/svg | **YES — this is the interface** | new | The signature detail AND the state-on-arrival plate — shows your lit Luminaries and MAiVENS-met count. |

**`luminairy-nave-triptych-backdrop`** — Straight-on interior of the LUMINAiRY nave, edge-to-edge, with THREE empty stained-glass archway openings evenly across the back wall (left rose/pink glass, centre teal/blue glass, right amber glass) sized to receive the three existing door images composited in — mirroring the library 'straight-on flat backdrop + composited units' approach. Jewel-toned, rose window above, marble compass-star floor, votive-candle rack ledge along the bottom foreground. Crisp high-fidelity dimensional Y2K illustration ('a realistic drawing that's clearly a drawing'), NOT flat-cartoon, NOT loose-painterly; empty of people. Candy-tinted, no gold filigree/scrollwork.

**`votive-candle-rack`** — A tiered SUNNYVAiLE votive-candle rack: rows of small glass holders, unlit (dim) by default, warm candy-lit flame when a Luminary is chosen, name on each lit holder. Hand-built CSS/SVG so lighting is a class toggle driven by the existing coven-pick + collect state.

## Reuses existing
Almost everything. KEEP unchanged: the wing-door/wing-panel toggle + hash deep-links; the saint flip hydrator; playLaidiesTheme audio + 8-anthem playlist; MAiVEN click-to-collect + 0/8 progress; the Foundress Holo case; the verified MAVEN_BIOS modal + ?meet= deep-link; the Turing memoriam; the coven-pick chips + Closet localStorage keys (laidies_saint/maven/builder, laidies_mavens_collected); all stained-glass portrait art (saints/mavens/builders y2k-stained-glass, EXEMPT from de-fairytale). REUSE the three already-delivered but UNUSED wing-interior PNGs as wing backdrops. Net-new art is at most ONE nave-triptych backdrop (with a CSS fallback to the existing nave.jpg) plus the hand-built CSS/SVG votive rack.

## Pitfalls (do not)
- Do NOT recolour gold+plum in place — Ali: redesign, not recolour. Rebuild the chrome on candy + ink; swapping the gold hex on the existing foundress-case/eyebrow/button layouts is explicitly not the ask.
- Do NOT restyle the stained-glass PORTRAITS — devotional saint/maven/trailblazer art is exempt and locked; only the surrounding chrome moves to candy.
- Do NOT drop any working mechanic (dont-remove-working-features): flip cards, anthem playlist, meet-to-collect, foundress case, bio modal, coven picks, hash + ?meet deep-links must survive the reframe.
- Do NOT hide the interface in the artwork — state must be STATED (the votive rack in words), no numbered pins / invisible hotspots to hunt.
- Keep the pledge inscription verbatim ('We pledge Allegiance to the united SAiNTS of SUNNYVAiLE') — it's canon.
- Watch the JetBrains Mono / --gold leftovers in the Turing memoriam and foundress eyebrows — they carry both the retired palette and a non-stack font.
- Add the mobile spacing block; wings must reflow to single-column (grids already do at 640/720px) and the triptych must restack on phones like the library's mobile bookcase.
- Don't let the open wing turn back into a long editorial scroll — it's the longest content; keep hub-and-reveal, one wing at a time, cards in the room render not a 760 strip.

## Open questions for Ali
- Nave-triptych backdrop: render a fresh straight-on nave with three empty archways (cleanest composite, matches the library method), or composite the three door images over the existing luminairy-nave.jpg via CSS (zero new art)? Recommend the render; needs Ali's call on spending one Codex pass.
- Wing-accent mapping — confirm SAiNTS=pink / MAiVENS=teal / TRAiLBLAZERS=tangerine reads right against the existing door glass colours, or should TRAiLBLAZERS take coral #ec7a78 instead of tangerine?
- Votive rack: candles for coven picks only (3 max, one per pantheon), or also a smaller flame per MAiVEN met (up to 8)? The former is cleaner as a state plate; confirm.
- The Resident-Card patron picker is 'still brewing with the member card' — does the candle-lighting here become the interim picker UI, or stay a display-only tie?

## Sequencing
Lower urgency than the Tier A/B rebuilds (Post Office, Blend & Snap, live LIBRAiRY promotion) since this page already does the mechanic. But it is the cheapest high-quality win in town: the pattern is proven here, three wing-interior renders are already sitting unused, and the work is mostly killing the column + retiring gold/plum + wiring the votive rack. Good candidate to run right AFTER the LIBRAiRY promotion ships, reusing the same room-backdrop-composite and candy-palette moves.

