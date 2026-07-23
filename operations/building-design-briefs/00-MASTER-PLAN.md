# BUILDING DESIGN PLAN — every page behaves like its building

> Generated overnight 2026-07-23. Method: the LIBRAiRY thought-process (operations/library-decisions.md)
> applied to every remaining building — what key things exist on the page, how it should be designed,
> what images we need. Grounded in operations/building-mechanic-audit-2026-07-22.md + all locked standards.
> One brief per building in this folder. NOTHING here is built yet — these are proposals for Ali.

## ⭐ SOLE MODEL: the LIBRAiRY (correction, 2026-07-23)

The **LIBRAiRY is the only reference.** It is the one page in town that actually behaves like its
building: the shelf IS the interface, the objects LOOK clickable and are separate pieces, they open
in place, it's full-bleed, and it reads like a designed magazine — not a photo with text cards under it.

⛔ **The Post Office is NOT a model — do not copy it.** Verified 2026-07-23: the live `post-office.html`
is byte-identical to `_backup-post-office-20260722-preredesign.html` — still a 760px column, the
building shrunk to a header strip, on the retired gold+plum palette, with zero operable mechanic. The
"Post Office was rebuilt" claim in older notes/audit is **false against the live file.** The Post Office
is itself a page that needs rebuilding the library way — it is not a proof of anything.

⛔ **No hotspot-hunting.** The library works because the objects are separate and obviously interactive.
Do NOT hide invisible clip-path click regions on a flat photo and make people hunt (this is banned by
`building-pages-tell-you-your-state`). Where a building's furniture is currently one flat render, the fix
is to **re-render the operable pieces as separate transparent objects** composited into the room — exactly
how the library's books sit on the shelf — never a hotspot map.

## The briefs

| pri | effort | building | brief | new imgs | operable imgs |
|---|---|---|---|---|---|
| high | M | The Blend & Snap | [blend-snap.md](blend-snap.md) | 4 | 4 |
| high | M | The Chick Flicks | [chick-flicks.md](chick-flicks.md) | 3 | 3 |
| high | M | MAiKEOVER on MAiN | [maikeover.md](maikeover.md) | 4 | 3 |
| high | M | The SUNNYVAiLE NewsStand | [newsstand.md](newsstand.md) | 5 | 3 |
| high | M | SUNNYVAiLE High | [sunnyvaile-high.md](sunnyvaile-high.md) | 3 | 3 |
| high | M | The Welcome Wagon Visitor's Centre | [visitors-centre.md](visitors-centre.md) | 3 | 1 |
| med | L | Bronze AiGE | [bronze-aige.md](bronze-aige.md) | 3 | 4 |
| med | M | The LUMINAiRY | [luminairy.md](luminairy.md) | 2 | 4 |
| med | M | The Mall | [mall.md](mall.md) | 3 | 4 |
| med | M | KSVL RAiDIO | [radio.md](radio.md) | 3 | 7 |
| med | L | The Gift Shop (POD merch) | [shop.md](shop.md) | 15 | 15 |
| med | L | Sorority House · Delta LAi Nu | [sorority-house.md](sorority-house.md) | 5 | 2 |
| med | M | Town Hall | [town-hall.md](town-hall.md) | 2 | 2 |
| low | M | FAiRY Godmother | [fairy-godmother.md](fairy-godmother.md) | 4 | 4 |
| low | M | Mme CLAi-O | [madame-claio.md](madame-claio.md) | 6 | 2 |

## The mechanic, one line each

- **The Blend & Snap** — THE COUNTER IS THE INTERFACE — you order off the room, and JoJo tells you where you stand before you touch anything.
- **The Chick Flicks** — The rental wall IS the interface.
- **MAiKEOVER on MAiN** — The lit vanity mirror IS the interface.
- **The SUNNYVAiLE NewsStand** — The rack IS the interface — you pull a paper and it opens in place.
- **SUNNYVAiLE High** — THE CORRIDOR OF DOORS IS THE INTERFACE.
- **The Welcome Wagon Visitor's Centre** — The MAP IS THE INTERFACE — a big fold-out town map on the Welcome Wagon lobby wall that you operate directly.
- **Bronze AiGE** — THE BAR TOP IS THE INTERFACE.
- **The LUMINAiRY** — The DOORWAY is the interface — the library's "the shelf IS the interface" translated to a chapel.
- **The Mall** — The concourse IS the interface.
- **KSVL RAiDIO** — THE BOOTH IS THE TUNER.
- **The Gift Shop** — The store fixtures ARE the catalog.
- **Sorority House · Delta LAi Nu** — The doors ARE the interface.
- **Town Hall** — The civic lobby IS the interface — you are standing INSIDE Town Hall, and the three things you operate are three real objects in the room, not three icons hovering over a picture.
- **FAiRY Godmother** — THE DESK IS THE CONSOLE.
- **Mme CLAi-O** — THE SÉANCE TABLE IS THE INTERFACE — you cut the deck on Madame's velvet table.

## Shared kit (build ONCE, reuse everywhere)

- **Full-bleed room stage (.libroom pattern)** — The page-body pattern that kills cause #2 (interior-as-header): a straight-on room render is the page, full-bleed, with operable furniture composited into it via %-positioned layers. Requires the render spec discipline the library proved: straight-on perspective, RGBA alpha where furniture composites, measured geometry recorded in an operations decisions file so it is never re-derived. Consumers: Visitors Centre map wall, MAiKEOVER vanity, FAiRY Godmother desk, LUMINAiRY nave, Gift Shop floor, Town Hall stage, Sorority entry hall. _(reuse from: _library-v3.html (.libroom + .unit/.bay geometry; spec pattern in operations/library-3bay-wall-case-render-request.md))_
- **Separated operable objects (NOT hotspots)** — the library's actual mechanic: the thing you click is its OWN transparent PNG, laid over the room so it visibly reads as a pull-able/openable object (a book on a shelf), with a hover/lift state — never an invisible clip-path region hunted on a flat photo. Where a building's furniture is currently one flat render, the deliverable is to RE-RENDER those pieces as separate objects, not to map hotspots onto the photo. Consumers: NewsStand papers, Chick Flicks tapes, Bronze bottles/taps, Sorority doors, LUMINAiRY doors, KSVL console. _(reuse from: _library-v3.html — the books/shelf units are separate RGBA layers with a `.lift` hover; THIS supersedes the earlier clip-path-hotspot idea, which is hotspot-hunting and banned)_
- **In-room reveal panel (hub-and-reveal)** — One open at a time, opens in place directly below/inside the room, click-again-to-close, HASH_MAP so old deep-link anchors auto-open, scroll-margin-top, content renders inside hidden panels so embedded JS keeps working. This is what keeps every rebuilt page near the 2,504px benchmark instead of 5,000+. Consumers: literally every building. _(reuse from: _library-v3.html — clicking a book opens the reader in place; same open-one-at-a-time pattern, hub-and-reveal-rule)_
- **State-on-arrival banner + honest-state store** — The keeper/board greeting that TELLS you your position in plain words before any interaction, computed for REAL: content/episode-index.json latest-published vs a namespaced localStorage stamp (one key per building). Ship as one tiny shared helper (readLatest(), sinceLastVisit(key), stamp(key)) plus a per-building voice layer, with the mandated honest fallback ('shown closed, with the reason') when no source exists. Consumers: NewsStand (Paige's board), Blend & Snap (JoJo's 'the usual?'), Chick Flicks (Becky), Sorority (June), Mall Directory, KSVL ON AIR light, High chalkboard, Town Hall placards. _(reuse from: the building-pages-tell-you-your-state rule + the library stating its shelf on arrival — build one tiny shared helper; no Post Office dependency)_
- **In-place reader / detail spread** — The designed magazine-spread reader (per-item --accent from the object's art, candy top-stripe masthead, drop-cap lede, styled callouts — 'can't look like boring shitty css blocks of text') generalised to: NewsStand article, Gift Shop till card, Chick Flicks tape detail, Mme CLAi-O reading, Sorority room panel, LUMINAiRY wing card. _(reuse from: _library-v3.html book reader (§6 of library-decisions))_
- **Diegetic chrome kit (css/svg primitives)** — ONE hand-built library of period paper/metal/board primitives that dedupes ~20 per-building css/svg asks into 5 primitives with per-building skins: (1) RUBBER STAMP (smudge, 2-3° cant) → HOT OFF THE PRESS, due-date RETURN BY FRI, coaster stamp; (2) STICKER/LABEL (serrated price-gun sticker, taped index card, brass placard) → Gift Shop prices, Town Hall placards, CLAi-O chyron; (3) PINNED NOTE + CORKBOARD (pushpin, 1-2° rotation, occasional puffy heart) → FG thank-you notes, Sorority entry board, Blend & Snap corkboard, Town Hall noticeboard; (4) WRITEABLE BOARD (chalk with eraser smudge / dry-erase marker) → High chalkboard, Bronze menu, Sorority door notes; (5) LIGHT-UP/GLOW utility for hotspot feedback. All in the measured candy palette (#e982ab/#57b6c0/#ec7a78/#b3abe7, ink #3a1838), Jost/VT323, zero emoji, zero gold+plum. _(reuse from: library doodle SVGs (assets/building-interiors/library-shelf/doodles/) as the hand-drawn-quality benchmark)_
- **Full-bleed page shell (page-scoped)** — The override that breaks main{max-width:760px} per page WITHOUT touching the shared assets/sunnyvaile-page.css shell (Ali has not yet ruled on breaking it for all 14), keeping .sv-hero intact because charm-hunt.js places charms by % inside it. The library is ALREADY full-bleed — package its page shell as the copy-paste base so 14 pages don't each re-solve it, and so a later global break is a find-replace. _(reuse from: _library-v3.html — it kills the 760 column page-scoped; no Post Office dependency)_
- **Mobile restack pattern** — Wide operable furniture cannot fit a phone: the library restacks its 3-bay case into one scrollable upright. That is the primary sanctioned mobile answer (restack the furniture); an honest full-width button list is the fallback only when furniture can't restack. Plus the viewport meta check — every room-stage building declares one in its brief. _(reuse from: _library-v3.html @media(max-width:760px) — the 3-bay case → one scrollable upright)_
- **Ask/search desk card** — The reference-desk search card (light-lilac #faf6fc, small magnifier, ranked answer cards) reused for the Mall Directory search (store names + curated alias list, Burn Book for misses) and any future in-building lookup — do not reinvent the search UI per building. _(reuse from: _library-v3.html Ask Miss Jeeves over content/site/site-index.json)_
- **Welcome Card / building pop** — The map-spot → in-place Welcome Card reveal (name, address, one-liner, 2-3 mechanics, 'Go there →') that already ships on the homepage; the Visitors Centre promotes it to a whole page, and the Mall Directory + Town Hall noticeboard reuse the same card anatomy. _(reuse from: index.html .map-spot/.map-pop + sunnyvaile-directory.js)_

## Recommended build sequence

1. **SHARED KIT (phase 0 — extract from the LIBRAiRY)** — Cause #1 of the audit is 'one template, seventeen buildings' — fixing pages one at a time reproduces it. Before any building: extract the room stage, the separated-operable-object pattern, the open-in-place reader/panel, the full-bleed page shell, the mobile restack, and the 5-primitive diegetic chrome kit **from `_library-v3.html`** (the one page Ali built and approved) into shared includes. Days, not weeks — every piece already exists there; the work is extraction + the chrome primitives. **No Post Office dependency** — the PO is itself an unbuilt rebuild (below), not a proof.
2. **Visitors Centre (Welcome Wagon)** — First of the three justified picks: it is the first building a stranger meets (No.1 MAiN, highest first-impression traffic), it is Tier A #5 with art 0/22 over a 5,823px essay, AND it is the shortest path of the high-priority set — the operable map (final-v5) and the .map-spot/.map-pop mechanic already exist and are already coordinate-matched on the homepage. Mostly composition + relocation of the Founder's Note, one new lobby render. It also builds the Welcome Card component the Mall and Town Hall reuse, and every later rebuild gets discovered through it.
3. **Blend & Snap** — Second justified pick: the audit's Tier A #2 — 'identical shell to Post Office', art 0/13 — and the brief itself flags it as the audit's next Tier-A building. It is the second proof of the keeper-tells-you-your-state pattern (JoJo = Penny; jojo-scene already exists), it exercises the honest-state helper against episode-index.json exactly as the Post Office did, and its new art ask is small (menu board, corkboard, cup — three straight-on renders). Shipping it validates that the kit generalises beyond the building it was extracted from.
4. **NewsStand** — Third justified pick: high priority with ZERO new codex renders — the three papers are css/svg mastheads and paige-scene exists — so it stress-tests the chrome kit (stamp primitive, paper texture) and the state banner at essentially no art risk, and can run in parallel with Blend & Snap's render lead time. It also rescues the orphaned TODAY wire. Fastest full building in the queue.
5. **Chick Flicks** — High priority; the longest page in town (7,075px) with the mechanic already half-built — the wall and VHS boxes exist and work. This is consolidation (fold aisles into the one wall, reveal panels, due-date stamp) plus one broken image fix. Becky render is the only optional new art; bridge without her if needed.
6. **MAiKEOVER** — High priority (member-conversion moment) but gated on the new straight-on vanity render — commission that render during phases 2-4 so the build starts when art lands. The card-builder logic already works; this is re-clothing it, plus the signed-out local-save path must not break (load-bearing for conversion).
7. **The Mall** — The town hub — highest internal routing traffic. Both hero renders exist; the work is welding storefronts into the corridor, the Directory (reuses Ask-desk + Welcome Card), and the fountain signature. Follows the Visitors Centre so the Directory/search components are already built.
8. **LUMINAiRY** — Best-behaved page still in the 760 column; the three doors already open in place and the three wing interiors exist unused. Mostly wiring + the votive rack (chrome kit). Cheap win between the bigger renders.
9. **KSVL RAiDIO** — The booth render exists and the page already does its job (Tier C/D border); clip-path hotspots + FM dial (chrome kit) complete it. Audio-static and bottom-bar questions need Ali's rulings first (see decisions).
10. **Town Hall** — Shortest page in town and structurally already hub-and-reveal — but its new operable stage render is a real ask. Interim clip-path route exists on the civic-chamber render if Ali wants it sooner; note that render brushes the cottage-core register.
11. **Sorority House** — The door mechanic is proven (LUMINAiRY pattern) but this needs the wing-doors + entry-hall renders, the June portrait decision, and the inline-vs-route ruling for Hyvor rooms. Membership gating also intersects the sign-in enforcement debt — sequence after the mechanics are settled.
12. **Bronze AiGE** — Effort L with a keeper who has no established look — Cosmo must be designed before his hero render, which is the page's strongest version. Ship the bridge (existing interior + clip-path) only if hotspot targets verify as usable; otherwise wait for Cosmo. Fortune-teller embed reuses bws-fortune-teller frames (the -v1 PNGs are curation-REJECTED).
13. **Gift Shop** — Monetization is the stated priority BUT the 07-16 ruling keeps merch dormant pre-audience, the building has no address, no name decision, no keeper, and the largest new-render bill in the program (~14 renders). Resolution: commission its renders EARLY (longest lead) but build LAST of the meds, shipping with the honest 'register opens soon' state — or hold to Ali's checkout timing.
14. **Mme CLAi-O** — Low priority and already Tier D (behaves). Clip-path chrome + 4 gap cards + the chyron line. The ornate-register exemption question should be settled before any reroll spend.
15. **FAiRY Godmother** — Low priority, already near-full-bleed and short. Needs the desk render + worker 'wishes remaining' endpoint for an honest state line; the corkboard signature is pure chrome kit. Do last.
16. **SUNNYVAiLE High (handoff, not a build)** — ⛔ Owned by the classes window — the buildings work must not edit it. Deliver the brief + the shared kit to that window; their open question (reframe before or after the first Basics tapes) sets their own timing. The corridor render and chalkboard band reuse kit components, so going later costs them nothing.

**＋ Post Office (rebuild, not a proof).** Folds in beside **Blend & Snap** (item 3) — the two share the *identical* old shell, so rebuild them together on the library pattern: the PO-box wall becomes separate, obviously-pull-able boxes/counters composited into a full-bleed lobby (not a hotspot map), state-on-arrival ("you've got mail" / next Wednesday) in plain words, gold+plum retired. Its verb — *send something to someone* — also intersects the "mail is a layer, not a place" direction and the gifting/postcard mechanics; confirm scope before building. A brief for it should be written to match the other 15.

## Decisions for Ali

- [ ] THE SHELL: break the shared sv-hero + main{max-width:760px} shell for all 14 buildings at once, or keep doing page-scoped overrides per building (the Post Office method)? This was left as your open call in the audit; the shared kit makes the global break cheap, but it moves every page at once.
- [x] ~~POST OFFICE VERDICT~~ — RESOLVED 2026-07-23. You didn't like it, and you were right: the live Post Office is the OLD template (not the rebuild the notes claimed). It is no longer a gate or a proof. The program is now based only on the LIBRAiRY, which you built and approved. The Post Office simply joins the rebuild queue.
- [ ] KEEPER POLICY (one ruling instead of six): the populated-shots rule says storefronts empty, but the Penny lesson says a keeper's scene is probably the hero. Which buildings get a rendered keeper-at-post — Cosmo (needs his look designed first), June (portrait owed), Becky, Paulette at the chair, DJ SunnyV in the booth, FG at her desk — and name the two unnamed keepers (Welcome Wagon greeter, Gift Shop girl). You name natives.
- [ ] GIFT SHOP BUNDLE: (a) where it lives — Mall Unit 11 is the strongest candidate but currently hides the Burn Book easter egg; (b) plain name vs a SUNNYVAiLE-register name; (c) given the 07-16 dormant-merch ruling, build now with an honest 'register opens soon' till, or hold the whole build until you are ready to paste checkout URLs? Its ~14 renders are the longest art lead in the program either way — approve commissioning early regardless.
- [ ] ADDRESS + NAMING COLLISIONS: Mall says MAiN No. 9 but MAiKEOVER canon also claims No. 9; Mme CLAi-O is No. 5 in the directory but No. 6 in the keeper roster (stale); Mall Unit 01 is PIECES OF FLAiR on the live page but claires.html still exists — confirm the locked names/numbers so renders don't bake in the wrong signage.
- [ ] AUDIO POLICY: KSVL owns site sound, and audio-bleed has bitten before. Three briefs want tiny one-shot sfx (Town Hall bell ding, KSVL dial static; Mall fountain is already spec'd silent). One ruling: no non-KSVL audio anywhere, or allow explicit-gesture one-shots routed to never fight the live stream?
- [ ] ORNATE-REGISTER EXEMPTIONS: Mme CLAi-O's velvet/gold reading room and the FAiRY Godmother's enchanted-cottage lighting both brush the de-fairytale ban but are arguably diegetic for those two buildings. Confirm they are the two sanctioned exemptions, or schedule rerolls before their pages rebuild on that art.
- [ ] STATE SOURCES + NEW KEYS: several honest state banners need data that doesn't exist yet — Chick Flicks rental history, Blend & Snap pack pickup, Sorority per-room activity (Hyvor last-comment API?), FG 'wishes remaining' from the worker. Approve creating the new namespaced localStorage keys where no backend exists, and confirm which state lines must instead say 'can't tell yet' honestly.
- [ ] SIGNATURE SCOPE CAPS: confirm the v1-minimal recommendations so delights don't balloon — Mall fountain is visual-only (no fortune line), Bronze bar fortune-teller is 'one pinch, one drink' (full game stays at its own page), Blend & Snap 'the usual' ships v1 or fast-follows, High's quiz stays an honest link-out (that one is the classes window's call, you arbitrate timing).
- [ ] PALETTE EDGES + SITEWIDE CHROME: KSVL's hot-pink #ff6ec7 glow vs the measured candy pink #e982ab; and the persistent bottom bar is still plum-with-gold sitewide — restyling it touches every page at once. Whose call and when, since new full-bleed pages will make the old bar read even more wrong?
- [ ] SEQUENCE SIGN-OFF: the recommended order is Visitors Centre → Blend & Snap → NewsStand after the shared-kit extraction. (The library promotion already happened — `library.html` IS the v3 build as of 2026-07-23.) Confirm or reorder — 'which building rebuilds next' was explicitly reserved for you.

## Risks

- REBUILDING THE 'ONE DUMB TEMPLATE' IN NICER CLOTHES: a shared kit is exactly how the 760px shell happened. Mitigation: the kit ships primitives (reveal panel, state helper, chrome), never a page layout; every building's operable object must be different and derived from ITS verb, and each page gets measured against the audit's three numbers (operable-art ratio, main width, height ≈2,500px benchmark) in the browser before it's called done.
- ART PIPELINE IS THE CRITICAL PATH AND HAS FAILED BEFORE: ~30 new codex renders, many straight-on composite furniture pieces — the exact class that shipped without alpha channels, with uneven shelves, and needed multiple rerolls on the library. Every furniture render needs a written spec (straight-on, RGBA, measured board geometry) and a qc-frames pass first; the four-failure-classes and reference-curation rules apply. Budget rerolls into the schedule.
- THE MODEL IS RATIFIED — KEEP IT THAT WAY: the program is now based only on the LIBRAiRY, which Ali built and approved (promoted live 2026-07-23). The earlier plan leaned partly on the Post Office, which turned out to be the old template, not a rebuild — that reference has been removed. Risk going forward: drift back toward un-approved patterns. Mitigation: every rebuild is measured against the library in-browser (operable-art ratio, full width, ~2,500px) before it's called done, and Ali rates the FIRST library-based rebuild (Visitors Centre) before the rest fan out.
- OWNERSHIP BOUNDARY VIOLATIONS: SUNNYVAiLE High is owned by the classes window (hook-relevant), Dream Phone is mid-redesign, and library surfaces have a banned-asset hook. The Mall's Unit 11 decision also collides with the Gift Shop brief. Route those briefs to their owners; never edit from the buildings work.
- FAKE STATE SHIPPING AS DECORATION: the state-on-arrival rule requires REAL computed state; several briefs currently have no data source (rental history, room activity, wishes remaining). The failure mode is a banner that always says the same thing — worse than no banner. Each state line needs a named source or an explicit honest fallback before build.
- SIGNATURE CREEP: 15 buildings × one delight each is the budget; several briefs already flag stretch versions (fountain fortunes, full fortune-teller game, live wire feeds, votive-per-MAiVEN). Hold the one-delight-per-building line or the program doubles.
- AUDIO BLEED: three proposed sfx vs the persistent KSVL player that already bled on other pages. Default silent until Ali's audio ruling; any approved one-shot must be explicit-gesture, muted-by-default, and tested against the live stream.
- CURATION DRIFT: briefs reference assets that are curation-rejected (businesswomen-special fortune-teller PNGs), never-curated (fairy-godmother-parlor.jpg), or in the condemned cottage-core register (town-hall civic-chamber, post-office-lobby precedent). Check curation.json and the no-old-artwork lock before compositing anything; a rejected asset in a hero repeats the Post Office v1 failure.
- LENGTH REGRESSION VIA REVEAL PANELS: hub-and-reveal reorganizes, never deletes — but stuffing every legacy section into panels can silently rebuild a 5,000px page one panel at a time. Measure open-panel heights too, and relocate content that belongs in another building (Founder's Note → Town Hall) instead of hiding it.
- LOCALSTORAGE KEY SPRAWL: five buildings are about to mint keys (bs_last_pack, cf rental, usual drink, sorority visits, coven candles). Without one naming convention and a registry in the shared helper, keys will collide, get orphaned, and make honest state untruthful.
- GOLD+PLUM RE-ENTRY THROUGH SHARED CHROME: the persistent bottom bar, Closet, and player still run the retired palette; new full-bleed candy pages sitting above old-gold chrome will read as two sites. That restyle is a separate, deliberately-scheduled decision — don't let individual building builds 'fix' it ad hoc.
- KEEPER-BLOCKED PAGES SHIPPING KEEPER-LESS AND NEVER REVISITED: Bronze, Sorority, Visitors Centre, and Gift Shop all have bridge plans that omit their keeper. Bridges are fine; each needs a tracked follow-up (and Cosmo/greeter naming) or the town quietly loses its people.

