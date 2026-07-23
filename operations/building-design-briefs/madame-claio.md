# Mme CLAi-O's Shop — No. 5 MAiN Street (per content/site/sunnyvaile-directory.js; the keeper-roster's "No.6" is stale). The town psychic, played in the 1999 Miss Cleo late-night-hotline register: "Practical advice, late-night-commercial drama." Keeper: Mme CLAi-O herself. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `games/madame-claio.html` · Priority: **low** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Get a reading.

## Current state
Tier D — the page already BEHAVES (full-bleed 1440, h 1,629, verb on the page: step in → reading card comes back, 100-card deck, real card art, history, badge). This is a coherence/polish brief, NOT a rebuild. The gaps, verified in source + curation.json: (1) the clickable centre image is assets/pixel-restyle/characters/mme-claio-portrait-pixel-v1.png — marked REDO in Ali's curation, and it's a bordered rectangle floating on a starfield, not the room; (2) the APPROVED interior assets/building-interiors/mme-claio-reading-room.jpg (curation: "correct", 1500×844 — crystal ball, fanned tarot spread, and a stacked deck all drawn ON her velvet table) is not on the page at all; (3) content sits in a 720px centre strip (.game-page-wrap max-width:720px) — the banned centre column, just inside a full-width main; (4) the chrome runs its own retired token set: --hotline-gold #ffd700 gradients, gold-bordered tarot card, Dancing Script card names (cursive is banned), Georgia h1, gradient-text h1 — none of it the site kit; (5) emoji throughout UI chrome (📞 counter pill, 🔮/☎️ buttons, 🃏, 📜, ✨ eyebrow) — violates no-emoji-ui-icons; (6) no plain-words state on arrival — just a floating "📞 Call #0" pill. Everything mechanical works and must survive: deck data, art slug lookup + 2 aliases, claio-call-count / claio-call-history localStorage, Hotline Regular badge → laidiesSecretBadges["hotline-regular"], song button, from=this-week return link, charm-hunt on .sv-hero.

## THE MECHANIC (the one idea)
THE SÉANCE TABLE IS THE INTERFACE — you cut the deck on Madame's velvet table. The approved reading-room render becomes the room the page lives in, full-bleed: the stacked deck and fanned cards already painted on the table are the click targets (clip-path hotspots; light-up = a brightened copy of the SAME image clipped to the shape, per the Post Office proof — never CSS chips). Cut the deck → the drawn card rises from the table as the REAL delivered card render (assets/mme-claio/reading-cards/*.webp, 886×1248 luminous tarot portraits — 96 already exist) and the reading (The Sign / The Message / "Madame says do this") opens in place beside it, inside the room. The physical objects you operate: the deck and the crystal-ball table.

## Key elements
### Storefront hero (.sv-hero) `[KEEP]`
06-mme-claios-shop-LANDSCAPE-v1.jpg strip at top — curation marks it 'correct'
- **Behaviour:** Unchanged. ⛔ .sv-hero must stay — charm-hunt.js places charms by % inside it (Post Office trap).

### State on arrival `[NEW]`
Plain-words position line, per building-pages-tell-you-your-state, computed from claio-call-count + claio-call-history
- **Behaviour:** First thing over the room, big display type, left-aligned INSIDE the art per homepage layout: first visit → 'Madame is in. Your first reading is free.' Returning → 'Back again. Your last card was The Mood Ring — 2 more readings and she knows your number.' Post-badge → 'She knows your number, Hotline Regular.' No hunting, no hidden hotspots: the CUT THE DECK button sits right under the state line AND the deck in the art is clickable — two routes, same action.

### The reading room (operable art) `[NEW]`
assets/building-interiors/mme-claio-reading-room.jpg full-bleed — crystal ball, card fan, deck stack, beaded curtain all in-frame; approved 'correct'
- **Behaviour:** The room replaces the starfield + REDO-flagged pixel portrait as the page's body. Deck stack + card fan are clip-path click targets that brighten (clipped brightened copy of the same jpg). Clicking cuts the deck.

### Cut the deck (the verb) `[REWORK]`
Rework of #fortuneButton + its 1.5s 'calling' transition
- **Behaviour:** Candy-pink solid button, dark plum text, 10px radius (homepage-measured button spec), label 'CUT THE DECK' (repeat visits: 'PULL ANOTHER'). Keep the 1.5s suspense beat but restyle: crystal-ball glow pulse in the render brightens instead of emoji stars. Keep nextIndex no-repeat logic.

### The reading (card + text) `[REWORK]`
The existing 100-entry deck (card/read/message/move) + showCardArt slug lookup with the 2 aliases
- **Behaviour:** Opens IN PLACE at the table: drawn card render stands left (~300px, slight rotation, drop shadow onto the velvet), reading text right — 'The Sign' (italic read), 'The Message', 'Madame says do this' (the move, as the emphasized block). Jost labels, Playfair/serif for the card name — ⛔ no Dancing Script, no gold-gradient border; the card art carries its own ornament. Graceful onerror hide stays for the 4 art-less cards.

### Recent readings `[REWORK]`
callHistory (last 3 shown / 10 stored) — currently text cards
- **Behaviour:** Becomes three small REAL card thumbnails lying face-up at the table's edge (actual card renders, ~90px, card name + one-line sign on hover/below). Same localStorage key.

### Hotline Regular badge + progress `[KEEP]`
5-call merit badge writing laidiesSecretBadges['hotline-regular'] (merit-sash wired)
- **Behaviour:** Progress stated in the arrival line in plain words (not a separate progress-bar widget); badge reveal keeps its copy ('…more times than Cher changed outfits…') restyled to kit. ⛔ keys and threshold unchanged.

### Song button `[KEEP]`
'Play the Madame CLAi-O song' → window.playLaidiesTheme, /content/music/game-mme-claio.mp3
- **Behaviour:** Keep exactly; restyle the pill to kit colours (currently rose-on-transparent is close; drop the ♪ text glyph if it reads as chrome).

### Resident Card cross-note `[KEEP]`
'Your reading of the week — this is where you get it' box (customization-is-a-trip canon)
- **Behaviour:** Keep the copy; restyle from dashed-border box to a kit panel; keep the .ai accent span on CLAi-O.

### 1-900 fine-print chyron `[NEW]`
The signature detail (below)
- **Behaviour:** Static footer line under the room; the 'first reading free' phrase doubles as honest pricing (everything here IS free).

### Return-to-bag deep link + analytics + KSVL/mini-player stack `[KEEP]`
from=this-week param rewriting of the back link; Plausible; Clarity; ksvl-player; laidies-bg dark layer
- **Behaviour:** Untouched.

## Design direction
Top to bottom (~2,000–2,300px at 1440, vs 1,629 today — the room adds height, the strip layout gives it back; hard ceiling ~2,500 per the no-long-scroll rule): (1) sv-header + storefront hero strip, unchanged. (2) Title band on dark aubergine #1c0f1c (the homepage-measured hero value — this is a night building, the dark register is earned here): eyebrow 'MAiN STREET · No. 5 — PSYCHIC READINGS' in Jost 800 letterspaced candy periwinkle; h1 'Mme CLAi-O' big Jost 800 (~64–75px, homepage scale) with the 'Ai' accent span — kill the Georgia gradient-text h1 and the ✨ eyebrow. Song button beside/below. (3) THE ROOM, full-bleed edge to edge: mme-claio-reading-room.jpg as the body of the page, state line + CUT THE DECK button composited over the room's left third (text INSIDE the picture, left-aligned, per homepage-is-the-design-target), deck/fan hotspots live in the art. The reading opens in place in/below the table zone — card render + text panel on a translucent deep-plum-from-the-artwork scrim so the room stays visible behind. Hub-and-reveal: nothing else renders until you cut. (4) Below the room, one compact strip on dark: recent-reading card thumbnails left, Resident Card note right. (5) Chyron fine print. Kill .game-page-wrap's 720px cap — content bands run full-width with padded interiors. Palette: candy accents (pink #e982ab, teal #57b6c0, periwinkle #b3abe7) as type/button colour on the dark field; plum tones come from the ARTWORK only, never panel fills; ⛔ zero #ffd700 gold chrome, zero Dancing Script, zero emoji glyphs in chrome. Type: Jost display/UI, Playfair only for the drawn card's name. Mobile (existing @media): the wide room won't fit — swap to a centre crop of the table/deck (CSS object-fit crop of the same jpg, no new asset), state text stacked above it, tap the deck or the button; card + reading stack vertically. Page-scoped CSS only — never touch the shared shell.

## Signature detail (the 'cool S' of this building)
The late-night TV commercial fine print. A single VT323 (the site's retro/OSD face) chyron line under the room, styled like the bottom-of-screen super on a 1999 psychic-hotline ad: 'CALL NOW · 1-900-CLAi-O · first reading free (they all are) · For entertainment purposes only.' — the exact disclaimer every Miss Cleo commercial ran, which is both the period joke AND honest about what the game is. It replaces the current '100 cards in her deck' microcopy (fold that fact in: '…100 cards in the deck · For entertainment purposes only.'). One line, quiet, perfectly 1999 — the equivalent of the LIBRAiRY's cool-S margin doodle.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `mme-claio-reading-room` | codex-render | **YES — this is the interface** | exists | The full-bleed room the page lives in; deck + fan are the operable hotspots |
| `mme-claio-reading-cards-set` | codex-render | decorative | exists | The drawn card the reading presents; history thumbnails |
| `reading-card.temporary-tattoo.b1of1.g3.r01` | codex-render | decorative | new | Fill 1 of 4 art gaps so all 100 deck cards show their card |
| `reading-card.beanie-baby-tag.b1of1.g3.r01` | codex-render | decorative | new | Fill 2 of 4 art gaps |
| `reading-card.milky-pen.b1of1.g3.r01` | codex-render | decorative | new | Fill 3 of 4 art gaps |
| `reading-card.hair-wrap-thread.b1of1.g3.r01` | codex-render | decorative | new | Fill 4 of 4 art gaps |
| `claio-room-hotspot-chrome` | css/svg | **YES — this is the interface** | new | Makes the room operable without new art |
| `mme-claio-keeper-scene-redo` | codex-render | decorative | uncertain | Future keeper portrait if Ali wants her visible in the shop; do not wait for it |

**`reading-card.temporary-tattoo.b1of1.g3.r01`** — NEW — match the existing reading-card register exactly (886×1248, rounded corners baked, luminous velvet-and-jewel close-up, like a realistic drawing that's clearly a drawing, no people, no text): a sheet of Y2K temporary tattoos (butterflies, stars, a yin-yang) half-peeled on a velvet vanity, one tattoo applied to a glass dish beside it, water droplets, warm jewel light.

**`reading-card.beanie-baby-tag.b1of1.g3.r01`** — NEW — same register: a plush Beanie Baby (generic bear, no brand mark) on plum velvet with the iconic heart-shaped swing tag pristine in a clear tag protector, magnifying glass beside it, collector-shrine lighting.

**`reading-card.milky-pen.b1of1.g3.r01`** — NEW — same register: a pastel Milky gel pen resting on black paper with a half-written glowing pastel doodle (hearts, a star — no legible words), other pastel pens blurred behind, jewel-box lighting.

**`reading-card.hair-wrap-thread.b1of1.g3.r01`** — NEW — same register: a colourful embroidery-thread hair wrap in progress around a single strand of hair, spools of bright thread and tiny beads on velvet, scissors ominously nearby, warm boardwalk-kiosk glow.

**`claio-room-hotspot-chrome`** — Hand-built page chrome: clip-path hotspot polygons over the deck/fan with brightened-copy light-up, the reading scrim panel, the VT323 chyron, candy buttons. No image files — CSS on the existing render.

**`mme-claio-keeper-scene-redo`** — UNCERTAIN / not this page's blocker — mme-claio-scene.png and both pixel portraits are curation-marked 'redo' (a guardrail hook actively blocks using them). Her portrait redo belongs to the character-art track (character-two-track-system). The page design deliberately needs NO figure — interiors stay unpopulated per the empty-storefront rule; Madame is present as voice ('Madame says do this').

## Reuses existing
Nearly everything: the approved reading-room render (currently unused — the single biggest win is promoting art that already exists, the Post Office lesson: 'the art you want is the art already there'); 96/100 reading-card renders + the slug/alias lookup JS; the full 100-entry deck data; localStorage machinery (claio-call-count, claio-call-history, laidiesSecretBadges['hotline-regular'], BADGE_THRESHOLD 5); the storefront hero; song button + playLaidiesTheme; from=this-week return-link rewriting; laidies-bg dark layer; charm-hunt/KSVL/mini-player/analytics stack. This is finish + reframe: same game, moved from a starfield form into its own room.

## Pitfalls (do not)
- ⛔ Never propose removing working features — the deck, badge, history, song, and deep-link logic all work; this brief re-houses them.
- ⛔ The current centre image (mme-claio-portrait-pixel-v1.png) and mme-claio-scene.png are curation-'redo' and a hook BLOCKS commands referencing them — don't try to keep or re-wire either; the room render replaces the portrait as the operable centre.
- ⛔ .sv-hero must survive untouched — charm-hunt.js positions charms by % inside it.
- ⛔ Do not change localStorage keys or the badge id/threshold — the merit sash and Closet read them.
- ⛔ CSS-scoped to this page only; never edit the shared shell (breaking main{max-width} site-wide is Ali's open call).
- ⛔ No CSS chips/boxes laid over the art ('shitty css boxes slapped on a background' — twice rejected at the Post Office); light-up = brightened clipped copy of the same image.
- ⛔ No hidden-hotspot hunting: the state line + visible CUT THE DECK button must exist even though the deck in the art is also clickable.
- ⛔ Kill, don't restyle, the off-kit chrome: #ffd700 gold gradients, Dancing Script, Georgia gradient h1, all emoji glyphs (📞🔮🃏📜☎️✨ and the sparkle spans) — no-emoji rule covers chrome, and gold+plum is retired (plum may only come from the artwork itself).
- Card-name slugs: keep the ART_ALIASES map (pixie-sticks, secret-diary-with-lock) and the onerror-hide fallback — 4 cards have no art until the gap renders land.
- Address is No. 5 MAiN (directory.js is canon); the keeper-roster file says No.6 — don't propagate the stale number into the eyebrow.
- The 'call/hotline' framing is the Miss Cleo joke and is baked into the badge name — keep the hotline register; don't 'fix' it into pure walk-in language.
- Height discipline: the room + reveal must land ≤ ~2,500px; the reading opens in place, not as a new stacked section.

## Open questions for Ali
- Register check for Ali: the reading-room interior is ornate mystic (velvet/gold/Victorian) — curation marks it 'correct' (newer), but the y2k-storefront memory (2026-07-15) flagged CLAi-O's surfaces as still carrying the de-fairytale violations. Is the psychic shop the ONE building where the ornate register is diegetic and stays, or does the interior get a Spencer's-Gifts-meets-Y2K reroll later? (Brief assumes: stays, since curation approved it.)
- Does the floating 'Call #N' counter pill survive at all, or does the count live only in the arrival state line? (Brief assumes: fold into the state line, drop the pill.)
- Storefront hero LANDSCAPE-v1 is curation-'correct' but the y2k memory says the y2k-v3 storefront family still shows scrollwork/heart gems Ali expected gone — art-track question, not a page blocker.
- Card name typography: Playfair for the drawn card's name, or Jost throughout? (Dancing Script is out either way.)

## Sequencing
Tier D — this page already does its verb, so it queues AFTER the Tier A/B rebuilds (Blend & Snap, live LIBRAiRY promotion, Visitors Centre). The 4 gap card renders can ride along in any Codex batch now (S, independent). The keeper-portrait redo belongs to the character-art track and must not gate this page. When built: verify in the browser (state line on arrival for all three states, deck click, badge write, mobile crop) and Ali rates — do not self-certify.

