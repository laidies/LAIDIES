# A Y2K beauty parlor. You sit in the chair and get made over — you walk in a stranger and walk out a member of the LAiDIES, holding your Resident Card. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `maikeover.html` · Priority: **high** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Sit in the chair and get made over — become a member.

## Current state
Audit: art 0/12, 760px centre column, h 4,747, 12 form inputs. This is the strongest real DOING engine in town after the library shelf and it all WORKS: a live card preview (#moCard), a real avatar generator (photo-or-scratch → POSTs to laidies-avatar.workers.dev → returns 3 candidates you tap), era/outfit/accessory/backdrop chips that build the generation prompt, song/saint/movie/TV/carry pickers, a Save-to-Closet that writes localStorage, and a full Supabase handle-claim + magic-link sign-in flow (guest book, is_handle_taken RPC, member_profiles upsert, BEST FRIENDS necklace redemption). NONE of that is broken and none should be rebuilt. The failure is dress, not function: the gorgeous salon interior (assets/building-interiors/maikeover-salon.jpg — pink parlor, checkerboard floor, three bulb-framed oval vanity mirrors, pink vinyl styling chairs, hood dryers, a YOUR MAiKEOVER MONTAGE AWAITS marquee and a Residence Card Glow Up sign) is pinned as an inert ~216px header strip, then the whole salon becomes a 760px web form of stacked labels and dropdowns, followed by ~1,500px of editorial prose ("The distinction", "Why a beauty parlor?") and a redundant sv-cta block linking out to resident-card.html for a builder that already lives inline. Salon rendered as a DMV form.

## THE MECHANIC (the one idea)
The lit vanity mirror IS the interface. You sit at the salon vanity station: the bulb-framed mirror in front of you is your live Resident Card (the existing #moCard preview rendered INTO the mirror glass, not in a box beside it), and the vanity counter across the bottom is the tray of tools you pick up to change your look — era, outfit, accessories, backdrop, song, saint, era faves, what you're carrying. You operate the mirror by working the counter. When you hit "Make me over," the three round mirrors on the back wall fill with your three generated avatars (the montage the marquee already promises) and you tap the one that's you — it flies into the vanity mirror and your card is set. The building's verb (get made over → walk out a member) is the page's verb: the reception desk's "Residence Card Glow Up" sign is where you sign the guest book (claim your @handle + sign in) and leave a member.

## Key elements
### Full-bleed salon room as the actual workspace `[REWORK]`
The maikeover-salon.jpg interior promoted from header strip to the room the whole mechanic lives in — edge to edge, no 760 column, controls composited INTO it (mirror, counter, wall mirrors) exactly the way the LIBRAiRY bookcase stands in its room.
- **Behaviour:** Static backdrop; the operable pieces (vanity mirror glass, counter tool-tray, 3 wall mirrors, reception sign) are the interactive layers composited on top. .sv-hero element must be PRESERVED (charm-hunt.js positions 4 charms by % inside it; KSVL/tour/directory scripts also hook the page).

### State-on-arrival greeting (the salon TELLS you where you stand) `[REWORK]`
A plain-words line, in display type, that states your position before any interaction — per the state-on-arrival rule. New (no local card / no handle): 'New here? Take the chair — let's make your card.' Returning (has laidies_card_username or a server handle): 'Welcome back, @handle — the chair remembers you,' with your finished card already in the mirror and a route to the Closet.
- **Behaviour:** Computed on load from localStorage laidies_card_username + Supabase session (logic already exists in init()/renderClaimed()). No hover-to-discover, no hunting. The most important sentence is the biggest thing on the page (homepage 58px register).

### The vanity mirror = live card preview `[REWORK]`
The existing #moCard (avatar, name, @handle, era movie/TV, song, saint, carrying) moved OUT of its bordered box and rendered inside the bulb-framed oval/round mirror glass.
- **Behaviour:** KEEP renderPreview() and every field verbatim — only its container changes from a rounded rectangle to the mirror glass zone. Updates live as you pick, same as today.

### The vanity counter = tool tray (hub-and-reveal) `[REWORK]`
The 12 stacked form fields reorganised into a row of stations sitting ON the counter: Face (avatar), Wardrobe (era/outfit/accessories/backdrop), Soundtrack (song), Patron Saint, Era Faves (movie+TV), Carrying. Tap a station, its chips/select open in place; the rest stay closed. Kills the long scroll.
- **Behaviour:** Same underlying controls (chips arrays A_ERA/A_FIT/A_ACC/A_BG, the selects, name input) — regrouped and revealed on demand instead of all-open at once. All existing event wiring preserved.

### Avatar generator (photo OR build-from-scratch → make 3) `[KEEP]`
The core engine: upload-a-photo-we-keep-your-face vs describe-a-LAiDY, plus the chip-driven prompt, POSTing to the avatar Worker and returning 3 candidates.
- **Behaviour:** KEEP EXACTLY — this is the load-bearing DOING mechanic and a locked config (avatar-maker-locked-config). Do not touch the fetch/retry/slot logic.

### The 3 wall mirrors = the 3 candidates `[REWORK]`
The back-wall round mirrors (or 3 bulb-framed frames) become where #moCands renders the 3 generated avatars — the 'montage' the painted marquee already promises.
- **Behaviour:** KEEP selectCand()/generation loop; only the 3 slot containers move into mirror frames. Tap one → it lands in the vanity mirror (existing behaviour), lit ring blazes.

### Song / Saint / Movie / TV / Carrying pickers `[REWORK]`
The full curated selects (16 songs incl. patron anthems, 14 saints, ~30 movies, ~34 TV, ~20 carry items).
- **Behaviour:** KEEP all option data verbatim (it's canon) — reskin from bare <select> into counter drawers. renderPreview + lsSet wiring unchanged.

### Save my card `[REWORK]`
Writes avatar/bg/song/saint/movie/TV/name/carry to localStorage and reveals 'See it in my Closet'.
- **Behaviour:** KEEP. Reskin the gold button to a candy-fill button with dark-plum text (gold retired).

### The reception desk = guest book (claim @handle + sign in) `[KEEP]`
The whole Supabase claim flow: pick a handle, live availability check (is_handle_taken), magic-link email sign-in/sign-up, public-visibility toggle, claimed state, copy-URL, BEST FRIENDS necklace redemption. The art's 'Residence Card Glow Up' reception sign is its diegetic home.
- **Behaviour:** KEEP ALL JS verbatim — load-bearing, DB-backed, security-reviewed (RESERVED list mirrors SQL, member_profiles owner-only). Reframe it as signing the guest book at the desk, not a form block mid-page.

### Welcome-back banner → Closet `[REWORK]`
For returning members: 'the chair remembers you,' route to /laidies-card.html.
- **Behaviour:** KEEP logic; restyle off the plum→rose gradient + gold eyebrow to the candy/aubergine system.

### Editorial prose + redundant CTAs `[REWORK]`
'The distinction (because it gets asked)', 'Why a beauty parlor?', and the sv-ctas block linking to resident-card.html.
- **Behaviour:** CUT or compress to one footer line. The builder is inline, so the resident-card.html CTAs are a dead-end duplicate; the Sorority House link (the ONE real onward move) can survive as a single small exit. Removing this is most of the 4,747→~2,500px cut.

## Design direction
Full-bleed, room-integrated, hub-and-reveal — the LIBRAiRY pattern applied to a salon. Kill main{max-width:760px} with a page-scoped override only (do NOT edit the shared sunnyvaile-page.css shell; Post Office proved page-scoped overrides keep the other 13 buildings frozen). Shape, top to bottom, target ~2,500px (down from 4,747), no long scroll: (1) The room, full-bleed. On top of it the state-on-arrival line in homepage display register — h1 clamp(34px,5vw,66px)/800, section 'tell' lines ~58px. (2) THE VANITY STATION, the hero of the page and where you spend your time: the styling chair back in the foreground, the lit bulb-framed mirror carrying your live card, the counter across the bottom holding the tool-tray stations (tap to open in place). Three back-wall mirrors hold the 3 candidates. (3) THE RECEPTION DESK: sign the guest book — claim @handle + magic-link sign-in, under the 'Residence Card Glow Up' sign. (4) One small onward exit to the Sorority House; everything else editorial is gone. Palette = homepage numbers, measured, not guessed: candy accents pink #e982ab / teal #57b6c0 / coral #ec7a78 / periwinkle #b3abe7; body ink #3a1838; backgrounds are the salon art or a candy wash, never flat cream. Buttons = solid candy fill with DARK-PLUM #3a1838 text at 10px radius (the house button) — retire every gold (#f6c04a) and plum panel fill on the page. No emoji in UI chrome (the ★ literals are fine as type ornament, consistent with siblings). Jost display + the existing Playfair for card names. Mobile (@media max-width:720px): the vanity station restacks — mirror on top carrying the card, tool-tray stations as full-width tap-to-open rows below, candidates in a row; the room reflows rather than shrinking to a header. Honor the mobile spacing block convention.

## Signature detail (the 'cool S' of this building)
The bulb-framed mirror lights up as you become someone. Each pick flips another bulb on around the mirror ring; when your card is complete the whole ring blazes and a Polaroid ejects from the vanity and develops in front of you — a before/after strip, the 'before' being the empty ✦ placeholder the card started as, the 'after' your finished Resident Card — then clips to the mirror frame like the salon reference photos already painted above the mirrors. It pays off the 'YOUR MAiKEOVER MONTAGE AWAITS' marquee that's literally in the room, and it's period-honest: the Y2K parlor before/after Polaroid, the Glamour-Shots reveal, the small ritual of walking out changed. (Paulette — the Legally Blonde nail-tech patron / town keeper for MAiKEOVER per episode-style-comic-popart-direction — is the natural voice for the greeting line if a keeper is wanted; keep it to this one delight, not both.)

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `maikeover-salon-room-v1` | codex-render | decorative | exists | The room the mechanic stands in (ambient backdrop) and the masthead. |
| `maikeover-vanity-station-straighton-v1` | codex-render | **YES — this is the interface** | new | The operable vanity: the mirror glass holds the live card, the counter holds the controls. This is the thing the user works. |
| `maikeover-bulb-mirror-frame-v1` | css/svg | **YES — this is the interface** | new | Candidate mirrors + the signature bulb-lighting; makes the mirror operable rather than painted. |
| `maikeover-polaroid-frame-v1` | css/svg | decorative | new | The signature 'montage' payoff that ejects and clips to the mirror when the card is complete. |
| `maikeover-tool-tray-chips-v1` | css/svg | **YES — this is the interface** | new | The hub-and-reveal controls, diegetically on the counter. |

**`maikeover-vanity-station-straighton-v1`** — NEW. A straight-on (dead-on, no perspective) vanity station on the same pink checkerboard salon: ONE large bulb-framed mirror centered, its glass EMPTY and rendered on a transparent alpha zone so the live card DIV composites into it (same reason the library needed straight-on shelves with alpha — a 3/4 receding room can't host a composited card cleanly); a pink vinyl styling-chair back rising into the foreground bottom; a vanity counter ledge running across the bottom width to seat the tool-tray. Warm salon light, teal + pink trim, NO heavy gold (gold retired), no chandelier. RGBA, transparent mirror-glass center + transparent surround. Reference maikeover-salon.jpg for palette/props.

**`maikeover-bulb-mirror-frame-v1`** — A bulb-framed round/oval salon mirror frame with an empty transparent center and a ring of vanity bulbs that can be lit individually via CSS (each bulb an addressable element or a two-state on/off). Buildable as CSS/SVG so bulbs animate; used both for the 3 candidate mirrors and, if simpler than compositing, as the vanity mirror frame.

**`maikeover-polaroid-frame-v1`** — A blank Y2K instant-photo Polaroid frame (white border, slightly glossy) sized to hold a before/after of the card; supports a short develop animation (fade-from-blank). CSS/SVG.

**`maikeover-tool-tray-chips-v1`** — The counter tool-tray station chrome: small labelled trays/drawers (Face, Wardrobe, Backdrop, Soundtrack, Saint, Era Faves, Carrying) that open in place. Built in CSS to sit on the vanity counter ledge — NOT coloured CSS boxes slapped over art (Ali rejected that at the Post Office); they must read as objects on the counter, seated on the render's ledge.

## Reuses existing
The entire avatar/preview/claim engine is KEPT verbatim: #moCard renderPreview, the photo/scratch generator + 3-candidate loop + selectCand, all chip arrays (A_ERA/A_FIT/A_ACC/A_BG) and the curated song/saint/movie/TV/carry selects, moSave→localStorage, and the full Supabase guest-book flow (is_handle_taken, magic-link OTP, member_profiles upsert, public toggle, copy-URL, redeemBestieInvite). The existing salon interior maikeover-salon.jpg is reused as the ambient room. sv-hero, KSVL player, tour-checkin, charm-hunt, directory and nav-auth scripts stay wired. This is a FINISH + REFRAME (move working controls into the room, cut editorial, restyle to the candy/aubergine system), not a rebuild.

## Pitfalls (do not)
- Do NOT rebuild the avatar generator or the Supabase claim flow — both work and the claim flow is DB-backed + security-reviewed (RESERVED mirrors the SQL). Reskin the containers only.
- Do NOT edit the shared assets/sunnyvaile-page.css shell (main{max-width:760px}, hero clamp). Override page-scoped, like the Post Office, so the other 13 buildings don't move.
- Preserve the .sv-hero element — charm-hunt.js positions 4 charms by percentage inside it; removing it or changing its aspect throws the charm hunt off-target.
- No coloured CSS chips/boxes slapped over the art (Ali rejected this twice at the Post Office). The tool-tray stations must be seated ON the render's counter ledge and read as objects, and the composited card must sit in a real transparent mirror-glass zone (the reason a NEW straight-on vanity render is requested, not the existing 3/4 room).
- Retire gold: the current moSave and welcome-back use gold #f6c04a and a plum→rose gradient. Move to candy-fill + dark-plum-text buttons.
- State on arrival must be a REAL answer (new vs returning, read from localStorage + session), told in plain words — no hover-to-discover, no numbered hotspots.
- Address is No. 6 confirmed (canon sweep done) and the Maine '(e)' pun is DROPPED — keep it 'MAiKEOVER on MAiN', No. 6. Note preview-homepage.html still shows a stale No. 9 for this building; do not propagate it.
- Keep the ~2,500px target by cutting the editorial prose + redundant resident-card.html CTAs — those two blocks are the bulk of the excess height, not the engine.

## Open questions for Ali
- Do we want Paulette (the town keeper for MAiKEOVER) as a visible greeter/voice at the chair, or keep the room unpeopled and let the mirror do the talking? (Note: populated-shots rule wants Y2K women, storefronts empty — a keeper at the chair is a deliberate exception like Penny at the Post Office.)
- The existing salon jpg is a 3/4 receding room; confirm we render a NEW straight-on vanity station for compositing (recommended, matches the library precedent) vs. trying to composite into the angled mirrors in the current art (harder, likely reads wrong).
- Should the 3 candidate avatars live in the three EXISTING painted back-wall mirrors of the room, or in three fresh CSS bulb-mirror frames on the counter? (Placement affects which render we commission.)
- Save currently writes localStorage only; the card only becomes durable after handle-claim + sign-in. Confirm the reframed flow still lets a signed-out visitor build + save locally (it should — that path is load-bearing for conversion).

## Sequencing
Independent of the LIBRAiRY promotion and the Post Office. Blocks on one NEW render (maikeover-vanity-station-straighton-v1 with a transparent mirror-glass zone) the way the library blocked on its straight-on backdrop — commission that first; the CSS bulb-mirror/Polaroid/tool-tray chrome and the reframe of existing controls can proceed in parallel and land once the render arrives.

