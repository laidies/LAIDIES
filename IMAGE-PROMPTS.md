# Image generation prompts — for Codex (overnight 2026-07-15 → 16)

These are the art assets I found missing/needed while building. Each has an exact **output path**, **size**, and a prompt tuned to match the existing style. Everything I built works *now* via fallbacks (emoji for charms), and auto-upgrades the moment these files land at the given paths.

---

## 1. Week 4 charm set — "The Keepsake Set" (7 charms) · PRIORITY

**Why:** I built the Week 4 charm tier tonight (`content/site/charm-hunt.js`) so the hunt scales to Ep4 — but the art doesn't exist yet, so they currently render as emoji. Drop these 7 PNGs in and they upgrade automatically.

**Shared spec (match the existing 21 charms exactly):**
- **512 × 512 px, transparent background (PNG).**
- Style reference: `assets/charms/w1-butterfly-clip.png` — a single object rendered as a **Y2K enamel-and-gold charm-bracelet charm**: glossy 3D cloisonné enamel in bubblegum-pink + lilac-purple with fine holographic glitter, polished gold outline/bezel, tiny rhinestone accents, a small **gold jump-ring at the top** (as if it hangs on a bracelet), soft drop shadow, centered, crisp, high detail. **No text.**

| Output path | Object for the prompt |
|---|---|
| `assets/charms/w4-mood-ring.png` | a chunky Y2K **mood ring** — wide gold band set with a large oval color-shifting cabochon that graduates teal → violet → pink |
| `assets/charms/w4-gel-pen.png` | a translucent **glitter gel pen** — pink barrel, purple cap, a little heart-shaped clicker on top, visible sparkly ink |
| `assets/charms/w4-disco-ball.png` | a mirrored **disco ball** — pink and silver mirror facets, tiny reflected light sparkles |
| `assets/charms/w4-evil-eye.png` | a **nazar evil-eye amulet** — concentric enamel rings of cobalt blue, white and gold, set in a pink-gold bezel |
| `assets/charms/w4-heart-locket.png` | a slightly-open **heart locket** — gold with lilac-and-pink enamel front, one tiny rhinestone |
| `assets/charms/w4-award-rosette.png` | a first-place **prize rosette ribbon** — pleated pink-and-purple satin rosette, gold center medallion, two ribbon tails |
| `assets/charms/w4-movie-ticket.png` | a classic **movie ticket stub** in pink + gold, slightly curled, perforated edge, a small gold star motif (no legible text) |

---

## 2. Mme CLAi-O storefront — needs a LANDSCAPE version · MEDIUM

**Why:** The sorority + Fairy Godmother building pages now lead with your new **exterior storefront** renders as compact banners, and they look great. Mme CLAi-O should match — but the render you picked (`…/episode-pixel/06-mme-claios-shop-connected-focus-pixel-v5-1122w.png`) is **portrait (1122×1382)**. Forced into a landscape hero banner it crops to just the sign, with nowhere to tuck the 4 hidden charms (it's a charm-hunt building). I tried it and reverted — the page still shows its interior reading-room hero for now.

**Fix:** a **landscape (~16:9, e.g. 1672×941)** render of the same Mme CLAi-O storefront, so it banners like the others AND has scene detail to hide charms in.

- **Output path:** `assets/sunnyvaile-buildings/y2k-v3-defairytale/episode-pixel/06-mme-claios-shop-LANDSCAPE-v1.png` (~16:9)
- **Prompt:** *Same Mme CLAi-O's psychic-readings storefront and art style as `06-mme-claios-shop-connected-focus-pixel-v5-1122w.png` (detailed Y2K pixel-render, teal-tiled shopfront, dark sign reading "Mme CLAi-O's · PSYCHIC READINGS", purple scalloped awning, beaded-curtain glass door, crystal balls and neon PSYCHIC hand in the windows, potted pink flowers, café chair, tiled sidewalk) — but composed as a **wide 16:9 storefront establishing shot**: the whole shopfront visible with breathing room left and right, golden-dusk light, empty of people, crisp, on-brand plum/teal/pink palette.* Keep the sign text legible and correctly spelled.
- When it lands, swap it into `games/madame-claio.html` hero exactly like the Fairy Godmother swap (compact banner: `height:clamp(160px,32vh,300px); object-fit:cover; object-position:center 35%`), then re-tune the 4 charm coords with `?charmDev=1`.
- (A 468KB optimized JPEG of the current portrait render is staged at `…/episode-pixel/webjpg/06-mme-claios-shop-v5.jpg` if you'd rather ship the portrait crop instead — your call.)

---

## 3. Charm-coord recalibration (no new art — a to-do)

The Sorority House + (eventually) Mme CLAi-O heroes changed, so the hidden-charm coordinates for those two charm-buildings now sit on the new images at their old %s. The charms still work; they're just not tucked into thematic details. **Fix:** open each page with `?charmDev=1`, click the spot you want each charm, paste the x/y back into `content/site/charm-hunt.js`. Pages: `sorority-house` (3 charms: w1/w2/w3-... + new w4-heart-locket), `mme-claios-shop` (w1/w2/w3 + w4-evil-eye).

---

## 4. Episode scene stills — the 7 GAPS (wire straight into the lit pages)

The episode pages (`issues/issue-0N-v4.html`) are now wired to `assets/episodes/ep-0N/pixel/ep0N-scene-*.png` and mostly filled from Codex's `episode-0N-full-scene-replacements-vN/` sets. **Save each of these 7 to the EXACT path below and it drops straight into place** (no wiring needed). Style = same as the Ep04 pixel scenes / the codex-brief-episode-0N briefs; 16:9; reuse the season Heroine sheet.

**Ep01 — ✅ COMPLETE (11/11).** The Fei-Fei gap was filled by reusing Ep04's Fei-Fei still (`ep04-scene-09-fei-fei.png`). Optional later: a dedicated Ep01 Fei-Fei if you want it to match Ep01's illustration style rather than Ep04's pixel one.

**Ep02 (5 gaps — this episode is the thinnest, only 4 of 9 exist):**
- `…/ep-02/pixel/ep02-scene-03-new-cafe.png` — the Context analogy: Heroine at a **brand-new café across town**, barista blank when she says "the usual."
- `…/ep-02/pixel/ep02-scene-04-spice-girls.png` — a late-90s girl-group lineup mid-demand: *tell me what you want* — specifics, not a vibe.
- `…/ep-02/pixel/ep02-scene-05-fold-in-cheese.png` — Schitt's Creek kitchen: "fold in the cheese" / *"WHAT DOES THAT MEAN?!"* — the AI handed a vague ask.
- `…/ep-02/pixel/ep02-scene-07-vague-vs-specific.png` — split frame: vague prompt → grey mush; specific brief → clean usable work.
- `…/ep-02/pixel/ep02-scene-09-libraiy.png` — Heroine at the SUNNYVAiLE LIBRAiRY finding the study; the "soft" skills are the ones that win.

**Ep03 (1 gap):**
- `assets/episodes/ep-03/pixel/ep03-scene-10-lights-up.png` — closing: Heroine on Main Street holding the finished, checked page — calm, capable. (Bookends the episode.)

_(Codex currently saves episode art under `assets/video/episode-0N-full-scene-replacements-vN/` with descriptive names; if it keeps doing that, just name these 7 to match and I'll copy them over — but the paths above are the final destinations.)_

---

## 5. Trailer tour scenes — pixel building storefronts (to match the episode format)

The trailer page (`issues/issue-trailer.html`) currently uses the photographic `y2k-v3` building webps for its 8 tour stops. To put it in the **same pixel format** as the episodes, each stop needs a **pixel storefront** matching `assets/sunnyvaile-buildings/y2k-v3-defairytale/episode-pixel/06-mme-claios-shop-connected-focus-pixel-v5-1122w.png` (the one that already exists) + the episode pixel scenes. This set doubles as the site-wide "everything goes pixel" building art ([[people-go-pixel]]).

**Shared spec:** Y2K-honest **pixel-art storefront**, detailed 16-bit look, dither shading, saturated plum/teal/pink palette; **empty of people**; the shop **sign text rendered legibly in-generation** ([[codex-text-in-render]]); one building per image; landscape (~16:9 or the building's natural crop). Pass the Mme CLAi-O pixel render as a style reference on every one.

**Save to** `assets/sunnyvaile-buildings/pixel/` (I'll wire the trailer's stop images to these):
| File | Building (sign text) |
|---|---|
| `newsstand-pixel.png` | The **NewsStand** — a Main-Street news kiosk, papers + hot-goss headlines |
| `chick-flicks-pixel.png` | **The Chick Flicks** — a Blockbuster-style video rental store, tape shelves |
| `blend-snap-pixel.png` | **Blend & Snap** — a cozy Y2K coffee shop |
| `sunnyvaile-high-pixel.png` | **SUNNYVAiLE High** — a school building, "GO CENTAURS" ([[sunnyvaile-high-mascot-centaurs]]) |
| `maikeover-pixel.png` | **MAiKEOVER on Main** — a salon/makeover storefront |
| `bronze-aige-pixel.png` | **The BRONZE AiGE** — a plum-velvet music-lounge bar, marquee |
| `delta-lai-nu-pixel.png` | **Delta LAi Nu** — the sorority house on Wisteria Lane, at dusk |
| `ksvl-pixel.png` | **KSVL 99.9** — a community radio station, antenna + neon dial |

*(Mme CLAi-O already has a pixel storefront — reuse the existing v5 file.)* **For the hero / establishing shots**, the existing pixel town views already work — I can swap the trailer hero to `…/episode-pixel/scenic-town-shots/01-main-street-daytime-establishing-pixel-v1.png` or `05-whole-town-golden-afternoon-overlook-pixel-v1.png` right now, no new art needed.

---

## 6. The Closet — pixel art (hero + collection-vessel icons) · NEW 2026-07-16

**Why:** The Closet (`laidies-card.html`) is the richest page on the site structurally — but it has **zero art** (one empty avatar slot, everything else is CSS). Next to the new pixel episodes/buildings it reads flat. Ali approved the full treatment: a pixel Closet-interior hero + a little pixel object for each collection vessel. **The page is already wired** — save each file to the exact path below and it upgrades automatically (all slots self-hide until the file exists, so nothing looks broken in the meantime).

**Style reference for all of these:** the existing Y2K pixel language — `assets/sunnyvaile-buildings/y2k-v3-defairytale/episode-pixel/06-mme-claios-shop-connected-focus-pixel-v5-1122w.png` + the episode pixel scenes. Detailed 16-bit look, dither shading, saturated **plum #4b2148 / rose #9b3f5f / teal / gold #d4a853** palette, warm golden light. Pass one of those as a style ref on every generation.

### 6a. Closet-interior hero · PRIORITY
- **Output path:** `assets/closet/closet-interior-hero-pixel.png`
- **Size:** wide banner, ~1672×941 (16:9).
- **Prompt:** *A Y2K pixel-art interior of a sorority-house dressing room / walk-in closet at Delta LAi Nu — the SUNNYVAiLE girls' clubhouse. A wall of open lockers and a vanity with a lit mirror, a velvet stool, a charm bracelet and a claw clip on the counter, a corkboard of photos and puffy stickers, a rack of Y2K clothes, a jewelry box, a stack of trading cards. Warm golden afternoon light through a window, cozy and lived-in, **empty of people**. Detailed 16-bit pixel render, dither shading, plum/rose/teal/gold palette, on-brand. No text.*
- Wired to a self-hiding banner at the top of the page (`.closet-hero`).

### 6b. Collection-vessel icons (8) — 512×512, transparent PNG
Each is a **single Y2K object** rendered in the same pixel style, centered, transparent background, ~512×512, crisp, no text. Save to `assets/closet/vessels/`:

| Output path | Object |
|---|---|
| `assets/closet/vessels/puffy-board-pixel.png` | a **corkboard** studded with glossy puffy stickers |
| `assets/closet/vessels/sticker-book-pixel.png` | an open **sticker album** with a page of shiny stickers |
| `assets/closet/vessels/merit-sash-pixel.png` | a **beauty-pageant / scout merit sash** with gold badges pinned on |
| `assets/closet/vessels/charm-bracelet-pixel.png` | a **gold charm bracelet** with a few enamel charms |
| `assets/closet/vessels/butterfly-clip-pixel.png` | a **glass jar of butterfly hair clips** in candy colors |
| `assets/closet/vessels/trading-card-binder-pixel.png` | a **ring binder of trading cards** in plastic sleeves |
| `assets/closet/vessels/detention-slip-pixel.png` | a pink **detention/hall-pass slip** on a clipboard |
| `assets/closet/vessels/locked-diary-pixel.png` | a **locked diary** with a little gold heart padlock |

*(The avatar slot on the card itself is filled by the pixel-portrait system at MAiKEOVER — see [[pixel-portrait-resident-card-idea]] — not part of this set.)*

---

---

## 6. Book Fair exclusive drops (8) — the clip-exchange rewards · PRIORITY

**Why:** `bookfair.html` (the clip-spend exchange) is built and live with styled PLACEHOLDERS. Each drop auto-upgrades the moment its render lands at the exact path below — no code change. These are **fair-exclusive** (can't be found on the hunt or bought elsewhere), so they must feel special. NOT pixel art ([[people-go-pixel]] reversed — pixel is episodes only); use the brand's own languages (Y2K enamel/charm, puffy-sticker gloss, stained-glass, plum+gold). Save all to `assets/bookfair/`.

| Output path | Drop | Prompt |
|---|---|---|
| `assets/bookfair/bf-wallpaper.png` (1080×2340, phone) | Phone Wallpaper | A **phone lock-screen wallpaper**, vertical 9:19.5. A single LUMINAiRY **stained-glass saint window** (or the SUNNYVAiLE skyline at golden dusk) centered with room at top/bottom for the clock, rich plum/rose/gold, luminous, gallery-grade. No text. |
| `assets/bookfair/bf-badge.png` (512×512, transparent) | Book Fair '99 Badge | A **Y2K enamel-and-gold merit badge** matching `assets/charms/` style: a circular cloisonné badge reading "BOOK FAiR '99" around a little open book + heart, glossy enamel in plum/rose/gold with rhinestones, transparent bg. |
| `assets/bookfair/bf-bookmark.png` (600×1600, transparent) | Tassel Bookmark | A **laminated Y2K bookmark**, tall & narrow, holographic/glitter finish with a **gold tassel** at the top hole, fronted with a saint portrait or the motto "On Wednesdays we do AI," die-cut look, drop shadow, transparent bg. |
| `assets/bookfair/bf-stickers.png` (1200×1200) | Puffy Sticker Sheet | A **sheet of glossy puffy stickers** (scratch-n-sniff Book-Fair energy): butterfly clip, holo star, ice-cream, cherry, rainbow, sun — bubblegum-pink + lilac + holo glitter on a cream sheet with rounded corners. |
| `assets/bookfair/bf-postcard.png` (1500×1050, 7:5) | Office Postcard Print | A **desk-size art postcard** — a bold plum/rose typographic print of a LAiDIES motto (e.g. "girl power meets machine power") with Y2K florals, framed border, print-ready. |
| `assets/bookfair/bf-zine.png` (1200×1200) | Mini-Zine cover | The **cover of a folded mini-zine** ("the book") — a coquette Y2K half-page booklet, hand-lettered title, staple + fold lines hinted, plum/rose/gold, on a cream desk. |
| `assets/bookfair/bf-holocard.png` (1000×1400, 5:7) | Holographic Trading Card | A **rainbow-foil trading card** matching [[concept-card-deck-redesign]] (plum + gold frame): holographic prismatic sheen across the art, a "BOOK FAiR '99 · FOiL" stamp, ornate border, collectible sheen. |
| `assets/bookfair/bf-poster.png` (1400×1000, 7:5) | Pull-Down Poster | A **classroom pull-down poster** — the art on a roller screen with a ring/pull at the bottom, wall-mount bracket at top, featuring an episode hero scene or the SUNNYVAiLE town map, vintage-classroom feel, plum/teal/gold. |

_(more prompts appended below as I find art gaps)_
