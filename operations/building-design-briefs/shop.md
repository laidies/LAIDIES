# The Gift Shop (SUNNYVAiLE merch, print-on-demand) — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `shop.html` · Priority: **med** · Effort: **L**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Buy a piece of SUNNYVAiLE — pick a real product off a real fixture, take it to the till, or send it to a friend as a gift.

## Current state
Half-works — this is a FINISH + REFRAME, not a rebuild from zero. What works: a real 13-product catalog in a JS PRODUCTS array (Deb poster set, campaign poster, saint prints, episode print, sticker sheet, 4 tees, NOPE pad, tote, $6 KSVL digital mix); a clean go-live path (in-file comment to Ali: create products in Printful/Gumroad, paste each hosted-checkout URL into buyUrl — no payment code on site); Plausible 'Gift Shop click' event logging per Buy/gift tap (free demand data, already collecting); gift-shipping framing; made-to-order honesty note; Mall banner driving traffic in. What fails the standard: it is a generic e-commerce card grid in the banned 760px centre column with a radial-gradient text hero — zero operable art, no building render, no room, no keeper, no canonical address (eyebrow claims 'MAiN Street' but street canon has no slot for it; it is not one of the 17 audited buildings). 7 of 13 products have NO image at all (plum-gradient placeholder cards — exactly the 'plain grid/placeholder' failure the audit question asks about). 2 of the 6 real product images are curation-flagged 'redo' (the ep04 pixel Ada scene — also a superseded style generation — and the pop-culture saint stained-glass, where the ENTIRE pop-culture set is 'redo' while all 24 real-women TRAiLBLAZER/MAiVEN windows are 'correct'). Styling still leans on retired tokens: gold-tinted note background rgba(201,162,39,0.08), plum-gradient card fills, rose/plum buttons. Every buyUrl is '#' so all 13 buttons say 'Coming soon' — currently the dishonest version of state: 13 small lies instead of one plain truth at the till.

## THE MECHANIC (the one idea)
The store fixtures ARE the catalog. The page is the inside of a 1999 gift shop, and you shop it the way you shopped one: a POSTER FLIP-BIN you flip through (art prints — Deb's posters, the stained-glass windows, episode art — standing in a browser bin, click to flip to the next sheet, click the sheet to open it at the till), a TEE WALL (the 4 slogan tees pinned flat on a chrome gridwall behind the counter, click one to see it big), a WIRE SPINNER RACK (puffy sticker sheet, NOPE pad, small goods in its pockets), and THE COUNTER with the beige 90s register, which is where buying happens and where the page tells you your state in plain words on arrival: 'The register opens soon — everything on the floor is printed to order once the till is connected' (or, once live: 'The register is open · ships in 5–9 days · or straight to her door as a gift'). Clicking any product opens its detail IN PLACE — big art, crooked price-gun sticker, blurb, candy Buy button (the hosted-checkout link), 'Send it as a gift', and 'Hold it behind the counter' (saves to the Closet). This is the LIBRAiRY pattern transposed: shelf→fixtures, book→product, reader-spread→till card. No hotspot hunting: every fixture is visibly a browsable thing, and the counter states the truth first.

## Key elements
### The counter / till (state on arrival) `[REWORK]`
The glass counter with a beige 90s register — the page's state-teller and the home of the buy action.
- **Behaviour:** On arrival, big display type (~58px, homepage register) states the truth ONCE: 'The register opens soon' while buyUrls are '#', switching automatically to 'The register is open · printed to order · 5–9 days · or ship it to her door' when real checkout URLs exist. Product Buy buttons deep-link to hosted Printful/Gumroad checkout (KEEP the buyUrl paste-in architecture and the go-live comment to Ali verbatim). No fake checkout ever — same honesty rule as the Post Office's closed parcel window.

### Poster flip-bin `[NEW]`
A record-store-style poster browser bin standing on the shop floor, holding the art prints as real sheets: Deb's NOPE trilogy, the 1999 campaign poster, the stained-glass window prints, the episode scene print, the Full Pantheon set.
- **Behaviour:** Click the bin to flip to the next poster (a satisfying flip transition, current sheet forward); click the visible sheet and its till card opens in place below with price-gun sticker, blurb, Buy / gift / hold. The bin honestly shows only products whose art is curation-'correct' — flagged art stays out until redone.

### Tee wall `[NEW]`
Chrome slatwall/gridwall panel behind the counter with the 4 slogan tees displayed flat, the way every mall shop hung them.
- **Behaviour:** Click a tee → till card opens in place with the big mockup, colourways line, price-gun sticker, Buy/gift/hold. Requires 4 NEW tee renders with slogans rendered IN-generation. Until a mockup exists the tee hangs as a dimmed blank on the wall with its name on a swing tag — the wall tells the truth about what exists (LIBRAiRY dimmed-book rule), never a gradient placeholder card.

### Wire spinner rack `[NEW]`
A wire spinner rack by the counter holding small goods: the puffy sticker sheet, the NOPE pad, the SUNNYVAiLE tote (folded in a pocket), the KSVL mix CD in a jewel case.
- **Behaviour:** Click a pocket → till card in place. The sticker sheet product image is COMPOSITED from the existing curation-'correct' charm PNGs (w1-butterfly-clip etc.) laid onto a die-cut sheet backing via CSS/SVG — no new render needed for it.

### PRODUCTS array + go-live plumbing + analytics `[KEEP]`
The existing JS catalog (names, prices, blurbs, giftable flags, buyUrl slots), the in-file Printful/Gumroad instructions to Ali, and the Plausible 'Gift Shop click' event per Buy/gift tap.
- **Behaviour:** KEEP all three intact — the fixtures render FROM the same PRODUCTS array (add a 'fixture' field: bin | wall | rack). Analytics events keep firing from the new till cards so the demand signal continues uninterrupted.

### Gift framing `[REWORK]`
The 'send it as a gift' proposition (currently a beige gift-strip banner).
- **Behaviour:** Kill the banner; the gifting line lives at the counter in the state copy ('...or straight to her door') and every till card keeps its 'Send it as a gift' secondary action (hosted checkout handles the gift address — this is real, not a fake send UI). Ties to the locked one-way gifting mechanic.

### Hold it behind the counter `[NEW]`
The 90s shop ritual of asking the clerk to hold something for you — mapped to the existing Closet/puffy-bookmark save system (window.svPuffyScan pattern from the LIBRAiRY).
- **Behaviour:** Every till card has 'Hold it behind the counter' → saves the product to the Closet. Gives the dormant-checkout period a real action: you can't buy yet, but you can put it on hold — and that's an honest wishlist signal for Ali on top of Plausible.

### Made-to-order note + exit CTAs `[REWORK]`
The POD honesty note (5–9 days, nothing warehoused) and the Browse-the-Mall / Open-your-Closet links.
- **Behaviour:** KEEP both; note folds into the counter state copy (lose the gold-tinted box), CTAs restyle as two candy buttons — solid candy fill, dark plum text, 10px radius, per the measured homepage numbers.

### Flagged-art swaps `[REWORK]`
The two curation-'redo' product images currently live on the page (the pixel episode scene — also a superseded style generation — and the pop-culture saint window used on two cards).
- **Behaviour:** Swap now, independent of the rebuild: episode print card uses a curation-'correct' comic-generation (g3) frame; the saint-print cards use the curation-'correct' TRAiLBLAZER/MAiVEN windows (Grace Hopper, Hedy Lamarr, ENIAC Six — all 24 marked correct) as the shown art, with the pop-culture saints returning when their redo lands. The 'choose your saint at checkout' product itself stays.

## Design direction
Full-bleed, room-integrated, hub-and-reveal, target ≤ ~2,600px (the LIBRAiRY proof is 2,504). Page-scoped CSS overrides only — do NOT touch the shared sunnyvaile-page.css shell (Post Office precedent). Top to bottom: (1) HERO — the new gift-shop interior render full-bleed edge to edge; the image carries its own in-render signage; page title 'The Gift Shop' sits BELOW the hero per site pattern, Playfair display, eyebrow address line pending Ali's ruling. (2) THE COUNTER STATE LINE — the one big plain-words truth ('The register opens soon…' / 'The register is open…') at homepage scale (~57–75px display type, ink #3a1838), not a 15px line in a card. (3) THE SHOP FLOOR — the room backdrop (straight-on flat wall + SUNNYVAiLE navy carpet, daylit, same recipe as the LIBRAiRY room) with the three fixtures composited as RGBA furniture standing feet-on-carpet: tee wall left, poster flip-bin centre, spinner rack right, counter far right. Product art lays onto measured fixture geometry exactly like books on shelf boards (measure board/pocket percentages once, record them in an operations decisions file). Click product → till card opens IN PLACE below the fixture — designed like a till receipt/product tag, not 'boring CSS blocks': big art, crooked price-gun sticker, Jost blurb, candy Buy button. One card open at a time (hub-and-reveal). (4) FOOT — two candy CTAs (Mall, Closet) and the footer. Palette: candy accents pink #e982ab / teal #57b6c0 / coral #ec7a78 / periwinkle #b3abe7, ink #3a1838 for text, NO gold anywhere (kill the rgba(201,162,39,…) note tint), no plum panel fills, no emoji in chrome. Mobile (@media max-width:760px): fixtures restack vertically full-width — tee wall, then bin (as a swipeable poster stack), then rack — tap to open, exactly the LIBRAiRY mobile restack; keep the viewport meta. Room art register: 'crisp realistic drawing that's clearly a drawing', Y2K-honest — chrome fixtures, backlit acrylic, vinyl price signage; NO fairytale kit, NO party-clutter flat-lay, storefront empty of people.

## Signature detail (the 'cool S' of this building)
Orange price-gun stickers. Every price on the page — on the poster sheets in the bin, the tee swing tags, the spinner-rack pockets, the till cards — is a slightly-crooked 90s price-gun label (CSS/SVG chrome: off-white sticker, serrated edge, condensed numerals, 2–3° random rotation per instance), the way every real gift-shop item wore one. On sale/bestseller items the label doubles up — a second sticker slapped over the first, old price showing at the corner. It is the shop's cool-S: nobody who shopped in 1999 has to be told what it is, and it carries the entire 'real store, real objects' claim in one detail. (Runner-up, use on the counter only: a handwritten 'NO REFUNDS ON GLITTER' card taped to the register.)

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `gift-shop-interior-room-v1` | codex-render | decorative | new | The room the mechanic lives in — hero + shop-floor backdrop. |
| `gift-shop-poster-flip-bin-v1` | codex-render | **YES — this is the interface** | new | THE central operable fixture — users flip and click it to browse art prints. |
| `gift-shop-tee-wall-unit-v1` | codex-render | **YES — this is the interface** | new | Operable fixture — hosts the four clickable tees. |
| `gift-shop-spinner-rack-v1` | codex-render | **YES — this is the interface** | new | Operable fixture — hosts sticker sheet, NOPE pad, tote, mix CD. |
| `gift-shop-counter-till-v1` | codex-render | **YES — this is the interface** | new | The state-teller and buy-anchor of the page. |
| `gift-shop-tee-wednesdays-ai-v1` | codex-render | **YES — this is the interface** | new | Clickable product on the tee wall. |
| `gift-shop-tee-survived-y2k-v1` | codex-render | **YES — this is the interface** | new | Clickable product on the tee wall. |
| `gift-shop-tee-dont-ship-the-beige-v1` | codex-render | **YES — this is the interface** | new | Clickable product on the tee wall. |
| `gift-shop-tee-loop-me-out-v1` | codex-render | **YES — this is the interface** | new | Clickable product on the tee wall. |
| `gift-shop-nope-pad-v1` | codex-render | **YES — this is the interface** | new | Clickable product in the spinner rack. |
| `gift-shop-tote-v1` | codex-render | **YES — this is the interface** | new | Clickable product in the spinner rack. |
| `gift-shop-ksvl-mix-jewel-case-v1` | codex-render | **YES — this is the interface** | new | Clickable product in the spinner rack (the $6 digital download). |
| `gift-shop-sticker-sheet-composite` | css/svg | **YES — this is the interface** | new | Clickable product in the spinner rack — zero new renders needed. |
| `price-gun-sticker-chrome` | css/svg | decorative | new | Signature detail; price display on every product and till card. |
| `deb-poster-web-set` | codex-render | **YES — this is the interface** | exists | The poster flip-bin's real sheets. |
| `trailblazer-maiven-stained-glass-set` | codex-render | **YES — this is the interface** | exists | Interim saint-print product art that passes curation. |
| `episode-print-g3-frame` | codex-render | **YES — this is the interface** | uncertain | Episode print product art in the current locked style generation. |

**`gift-shop-interior-room-v1`** — Straight-on, daylit SUNNYVAiLE gift-shop interior BACKDROP: flat back wall (lilac-to-blush homepage-gradient register), SUNNYVAiLE navy geometric carpet along the bottom, in-render 'THE GIFT SHOP' sign high on the wall (text in-generation, chunky Y2K acrylic/channel letters). NO fixtures, NO shelving, NO products drawn in (they composite on top), NO people, NO light fixtures, NOT evening. Crisp realistic-drawing-that's-clearly-a-drawing register, matching the LIBRAiRY room backdrop recipe exactly.

**`gift-shop-poster-flip-bin-v1`** — A record-store poster browser bin, straight-on, EMPTY, exported RGBA with transparent surround: wood-and-chrome A-frame bin at counter height, wide enough to show one full poster sheet face-on with sheet-edges visible behind it, shrink-wrap glare hinted on the front rail. No posters drawn in — the page lays real poster art into the measured window. 90s mall-store register, not antique.

**`gift-shop-tee-wall-unit-v1`** — A chrome slatwall/gridwall merch panel, straight-on, EMPTY, RGBA transparent surround: 2×2 grid of display arms/clip positions where flat tees hang, small blank swing-tag hooks. Measured so four 4:5 tee mockups sit cleanly in the four positions. Beige/warm-cream wall-mount frame, chrome arms — 1999 mall shop, no wood panelling.

**`gift-shop-spinner-rack-v1`** — A wire spinner rack, straight-on, EMPTY pockets, RGBA: classic 90s chrome wire carousel with 4–6 visible front pockets sized for sticker sheets/memo pads, on a weighted base standing on the carpet. No products drawn in.

**`gift-shop-counter-till-v1`** — A glass display counter with a beige 1990s cash register on top, straight-on, RGBA: register with green LCD segment display, counter glass empty (state text renders as HTML beside it, never baked in), a roll of receipt tape. Optionally a taped hand-written 'NO REFUNDS ON GLITTER' card rendered in-generation on the register side.

**`gift-shop-tee-wednesdays-ai-v1`** — Product mockup, flat-lay single tee on clean neutral surface (NOT party-clutter), 4:5: soft vintage-wash cream tee printed 'On Wednesdays we do AI' — slogan text rendered IN-generation, plain capital AI (technology, not brand-Ai), dark plum ink print.

**`gift-shop-tee-survived-y2k-v1`** — Same mockup spec: plum tee, cream print, slogan IN-generation: 'I survived Y2K. I'll survive this too.'

**`gift-shop-tee-dont-ship-the-beige-v1`** — Same mockup spec: cream tee, the slogan 'Don't ship the beige' set on a printed beige paint-chip graphic, text IN-generation.

**`gift-shop-tee-loop-me-out-v1`** — Same mockup spec: cream or plum tee, 'Loop me out' styled like a reply-all email header line, text IN-generation (matches Deb's locked song canon).

**`gift-shop-nope-pad-v1`** — Product mockup 4:5: tear-off memo pad on a clean surface, header 'From the desk of DEB' with a big NOPE stamp on the top sheet, a few torn sheets beside it — all text IN-generation.

**`gift-shop-tote-v1`** — Product mockup 4:5: natural canvas tote flat on clean surface, 'SUNNYVAiLE' wordmark printed in plum with the Ai treatment, text IN-generation.

**`gift-shop-ksvl-mix-jewel-case-v1`** — Product mockup 4:5: a burned-CD jewel case, hand-marker 'SAINTS ON 99.9 · KSVL' on the disc, insert card in KSVL branding — text IN-generation. Y2K mixtape-ritual energy, one object, clean surface.

**`gift-shop-sticker-sheet-composite`** — Die-cut puffy sticker sheet product image COMPOSITED in CSS/SVG from the existing curation-'correct' charm PNGs (butterfly clip and the w1/w2 charm set in assets/charms/) arranged on a glossy sheet backing with die-cut outlines.

**`price-gun-sticker-chrome`** — The signature price-gun label as a reusable SVG/CSS component: off-white sticker, serrated edge, condensed numerals, per-instance 2–3° rotation; doubled-sticker variant for bestsellers.

**`episode-print-g3-frame`** — UNCERTAIN — a curation-'correct' comic-generation (g3) episode frame to replace the flagged pixel scene on the Episode Scene Art Print card; candidates exist in assets/episodes/ep-04/ but the specific frame needs picking against curation.json verdicts.

## Reuses existing
Finish + reframe, not rebuild: KEEP the PRODUCTS JS catalog (names/prices/blurbs/giftable/buyUrl) as the single data source and render the fixtures from it; KEEP the Printful/Gumroad paste-in go-live comment addressed to Ali verbatim; KEEP the Plausible 'Gift Shop click' analytics (demand data already collecting); KEEP the gift-shipping proposition and per-product gift action; KEEP the made-to-order honesty copy; KEEP the Mall banner inbound link and the Mall/Closet exit CTAs; REUSE curation-'correct' art already on disk (Deb poster set, campaign poster, charm PNGs for the sticker-sheet composite, 24 TRAiLBLAZER/MAiVEN stained-glass windows); REUSE the proven LIBRAiRY pipeline wholesale (room backdrop recipe, RGBA fixture compositing, measured board/pocket geometry recorded in an operations decisions file, dimmed-item honesty, in-place reveal, mobile restack, svPuffyScan Closet saves).

## Pitfalls (do not)
- Curation hook will BLOCK any edit referencing the two flagged images (the pixel Ada scene, the pop-culture saint windows) — swap to 'correct' assets first; do not fight the hook.
- The entire pop-culture saint stained-glass set is curation-'redo' — do not build the 'choose your saint' product page around art Ali has flagged; use the 'correct' real-women windows interim.
- CSS chips slapped on a photo read as stickers (Post Office v1/v2 rejection) — products must be real rendered art laid onto measured RGBA fixture geometry; fixtures must be re-rendered fresh if sizes are wrong, never pixel-hacked (binned library lesson).
- No fake commerce: while buyUrl='#', the TILL states it plainly once; never render a fake checkout or fake 'added to cart' — same honesty rule as the closed parcel window and dimmed library books.
- Tee/pad/tote/CD slogans MUST be rendered in-generation — every post-applied text pass has looked terrible (locked codex-text-in-render rule).
- Brand spelling on merch copy: 'On Wednesdays we do AI' = plain capital AI (technology), never 'Ai'; SUNNYVAiLE tote wordmark DOES take the Ai treatment.
- Gold+plum retired: kill the gold-tinted shop-note background and rose/plum buttons; candy fill + dark plum text at 10px radius, measured homepage numbers — and don't recolour the old grid, redesign it.
- Page-scoped CSS only — do not modify the shared sunnyvaile-page.css 760px shell (breaking it site-wide is Ali's open call; Post Office precedent).
- Don't remove working features: PRODUCTS array, Plausible events, buyUrl plumbing, gift framing, Mall banner all survive the rebuild.
- Per the monetization ruling, merch is the CHERRY not the cake — the shop sits dormant-by-design pre-audience; don't let this rebuild jump the queue ahead of Tier-A audit buildings or pressure Ali to wire checkout early.
- No party-clutter flat-lays or hot-pink fields in product mockups; interior stays people-free; no emoji in UI chrome (content-level product art is fine).
- If the shop gets a Mall address, Unit 11 'NOW LEASING' currently doors to the Burn Book easter egg — relocate that link, don't delete it.

## Open questions for Ali
- WHERE does the Gift Shop live? It has no slot in the locked MAiN Street 1–10 canon. Strongest candidate: The Mall's vacant Unit 11 (a 'NOW LEASING' render already exists — the shop moving in is a nice town-story beat), but that door currently hides the Burn Book easter egg. Ali's call; the eyebrow address and any exterior render wait on it.
- Does the Gift Shop get a KEEPER? Every building gets one (Penny/JoJo/Becky pattern — classic 90s first name). A shop girl would give the page its hero-scene option (keeper-scene-as-hero, per the Penny lesson). Ali names natives.
- Does 'The Gift Shop' keep its plain name, or get a SUNNYVAiLE-register name? (It's the only unpunned commercial name in town.)
- Saint prints: sell with the 'correct' real-women windows now and add pop-culture saints when their redo lands, or hold the whole saint product until then?
- Episode print: is the product pixel art (a superseded style generation) or the current comic g3 style? Which specific frame is approved to SELL, as opposed to display?
- Checkout timing: per the 07-16 ruling merch stays dormant pre-audience — does Ali want the rebuilt shop to launch with the till honestly 'opening soon', or wait to ship the rebuild until she's ready to paste checkout URLs?
- Do postcards belong in this shop at all, or exclusively at the Post Office rack (postcard.html) to keep each building's verb clean?

## Sequencing
Do in four decoupled passes so value lands early: (1) NOW, small: swap the two curation-flagged product images to 'correct' assets and de-gold the styling — keeps the live page legal against the hook and the retired palette (S effort, no design risk). (2) Commission the Codex batch (room + 4 fixtures + 8 product mockups) — one prompt per asset, slogans in-generation; this can run any time and blocks nothing else. (3) Build the shop floor: measure fixture geometry, composite, wire till cards from the PRODUCTS array, mobile restack — the LIBRAiRY pipeline reused; record all measured geometry in operations/gift-shop-decisions.md. (4) Ali's calls close it out: address/keeper/name rulings, then checkout URLs pasted whenever SHE decides merch flips on. Do not schedule this ahead of the Tier-A audit buildings — it is not in the 17-building queue, and merch is deliberately dormant pre-audience; treat it as the ready-to-go monetization surface, not the next rebuild.

