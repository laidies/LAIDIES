# Codex Prompt · KSVL Sticker Sheet Batch (18 stickers)

Paste this prompt into Codex. All 18 stickers described inline; no reference photos required, but see the Reference Register section for visual grounding.

---

## Style benchmark — CRITICAL, read this first

These are **radio-station bumper stickers** — the physical vinyl decals you used to get free from a radio-station promotional booth at a county fair, a live remote broadcast, or a summer-jam concert. You'd peel them off the backing and slap them on your car window, your notebook, your Trapper Keeper, your locker door.

**Real-world benchmark register** (call these to mind — don't reproduce trademarks):
- KIIS FM · KROQ · KEARTH 101 · Live 105 · Z100 · WKRP-style call-letter identity stickers
- Warped Tour band stickers · early-2000s tour swag
- Summer-jam concert promo stickers ("Summer Slam '99")
- Kids' notebook stickers you traded in the cafeteria

What that means visually:
- **Glossy vinyl finish** — reads as a printed decal, not a paper sticker, not enamel, not holographic Lisa Frank. Slight shine + slight shadow to sell the physical peel-and-stick feel.
- **Bold, chunky, all-caps type** — big call letters, radio-friendly typography, high impact at small sizes. Jost / Impact / condensed sans / stencil vibes.
- **Simple palettes** — most stickers use just **2–3 flat colors** (station colors + a highlight). No gradient-heavy digital painting. This is *screen-printed vinyl*, not oil-on-canvas.
- **Confident graphic design** — think 1998–2004 station-branding kit: strong wordmark, tight tagline, prominent frequency, one or two supporting elements. Nothing precious.
- **Distressed / slightly worn edges optional** — if it fits the sticker, a hint of "peeled off a bumper and re-stuck" adds character. Don't over-do it.

What it is NOT:
- ❌ NOT Lisa Frank / Sanrio holographic teen-craft-store stickers
- ❌ NOT enamel-pin / painted-charm register (that's the [charm bracelet batch](./charm-illustrations-batch.md) — different animal)
- ❌ NOT modern minimalist / Etsy planner stickers
- ❌ NOT stained-glass / painterly / romance-novel-cover treatment (that's the saint cards)
- ❌ NOT dimensional 3D-rendered logos

## Shapes

Mixed shapes — the sheet should read like a real accumulated collection, not a matched set:
- **Rounded rectangles** (default for call-letter station stickers) — the standard bumper-sticker shape
- **Ovals** (Live-105-style) — for mid-90s station identity
- **Circles** (for "certified" seal-style stickers)
- **Die-cut hearts / stars** (for fan-club and event stickers only)

I'll specify the shape per sticker below.

## Technical specs

- Aspect ratio and canvas: **flexible per shape** — most rounded rectangles at ~3:2 landscape (900 × 600 px), ovals ~5:3, circles/stars ~1:1 square. Bake in ~40px of transparent padding around each sticker so the drop-shadow doesn't get clipped.
- **Format**: PNG with transparent alpha channel. **Every sticker must have a small dark drop-shadow** underneath so it reads as "resting on a page" — this is the tell that says *physical sticker* vs. flat logo.
- **Delivery path**: `Website-homepage/assets/stickers/ksvl/{slug}.png`
- **Filenames**: exact slugs given in the tables below, lowercase kebab-case.

---

## The 18 stickers

### Section A · Station Badges (4)

The core KSVL identity kit — same station, different callouts.

| # | Slug | Shape | Design brief |
|---|---|---|---|
| 1 | `ksvl-community-raidio.png` | Rounded rectangle | **The core station logo sticker.** Bold "KSVL" in massive all-caps stencil-style call-letter type filling most of the sticker. Small subtitle underneath: "99.9 · COMMUNITY R<span style="color:#9b3f5f">Ai</span>DIO · SUNNYV<span style="color:#9b3f5f">Ai</span>LE." Palette: warm plum (#4b2148) background, cream (#fbe9d7) call letters, single rose accent stripe. Reads as *the* station's ID. |
| 2 | `ksvl-charter-listener.png` | Oval, Live-105-style horizontal | "★ CHARTER LISTENER ★" bold across the top. Center: "KSVL · SINCE EP 01." Small tagline curving along bottom: "The originals." Palette: cream ground, plum type, gold detail stripe. Reads as exclusive early-adopter flex. |
| 3 | `ksvl-all-wednesdays.png` | Circle, ~500×500 | "★ ALL WEDNESDAYS ★" wrapping the top curve. Center: bold vertical "WEDNESDAY" wordmark (Bodoni Moda or heavy serif). Bottom curve: "KSVL 99.9." Palette: rose (#9b3f5f) ground, cream call-outs. Reads as a certified-listener seal. |
| 4 | `ksvl-dj-sunnyv-fanclub.png` | Die-cut heart | "DJ SUNNYV FAN CLUB" in tight all-caps stacked over a small painted sunburst. Bottom: "★ KSVL ★." Palette: Sun-In yellow ground, hot pink (#ff6ec7) type, cream heart border. Y2K teen-magazine fan-club vibe with restraint. |

### Section B · Mix + Genre Badges (4)

Event / achievement stickers — what a listener earned by tuning in.

| # | Slug | Shape | Design brief |
|---|---|---|---|
| 5 | `ksvl-saints-mix-certified.png` | Rounded rectangle | "★ SAINTS MIX CERTIFIED ★" in ledger-style condensed type. Center: small painted halo over "8 SONGS · 1 SITTING." Bottom line: "KSVL · SUNNYV<span style="color:#9b3f5f">Ai</span>LE." Palette: warm cream + aged gold + plum. Reads like a music-club membership card. |
| 6 | `ksvl-bronze-aige-regular.png` | Oval | "★ BRONZE <span style="color:#9b3f5f">Ai</span>GE REGULAR ★" across the top. Center: silhouette of a stage microphone with rose neon glow. Bottom: "LIVE MUSIC · MAIN STREET NO. 5." Palette: deep twilight purple, cream type, single hot-pink accent for the neon glow. Live-venue promo vibe. |
| 7 | `ksvl-mix-cd-alchemist.png` | Rounded rectangle | Center: painted CD-R with rainbow foil reflection sheen. Above: "★ MIX CD ALCHEMIST ★." Below: "KSVL · BURN YOUR OWN." Palette: silver base with rainbow gradient reflection on the CD only (the sticker itself is flat 2-color). |
| 8 | `ksvl-encore.png` | Die-cut star | Bold "ENCORE" wordmark filling the star. Small "×3" corner mark. Bottom point: "KSVL." Palette: rose ground, cream type, gold outline. Simple, punchy, star-shaped. |

### Section C · Band Collector Stickers (10)

One per fictional SUNNYV<span style="color:#9b3f5f">Ai</span>LE band from the locked bands roster. Each reads like a promotional tour sticker you'd grab at the merch table — bold wordmark + subtitle + tour year or slogan. Match the band's sound family in the palette/type treatment.

| # | Slug | Shape | Band + sound family | Design brief |
|---|---|---|---|---|
| 9 | `band-the-laidies.png` | Die-cut heart | **THE L<span style="color:#9b3f5f">Ai</span>DIES** · girl-group anthemic Y2K pop | Bold "THE L<span style="color:#9b3f5f">Ai</span>DIES" wordmark in the canonical L<span style="color:#9b3f5f">Ai</span>DIES lockup. Subtitle: "SUNNYV<span style="color:#9b3f5f">Ai</span>LE'S OWN." Palette: rose + gold + cream. |
| 10 | `band-the-regressions.png` | Rounded rectangle | **The Regressions** · scrappy punk / power-pop | "THE REGRESSIONS" in fat blocky all-caps. Small tagline: "y = mx + b · A WORLD TOUR." Palette: black + hot pink. Late-90s Warped-Tour band-sticker feel. |
| 11 | `band-the-recalls.png` | Oval | **The Recalls** · dream-pop / shoegaze | "THE RECALLS" in flowy serif italic. Subtitle: "REMEMBER US? · KSVL 99.9." Palette: dusty violet + cream. Slightly faded / worn look. |
| 12 | `band-the-overfits.png` | Rounded rectangle | **The Overfits** · emo / mid-2000s post-hardcore | "THE OVERFITS" in angular sharp condensed type. Subtitle: "TRAINED TOO WELL · TOUR '04." Palette: black + rose + white. Emo-tour aesthetic. |
| 13 | `band-the-embeddings.png` | Rounded rectangle | **The Embeddings** · cyberpunk-adjacent electronic | "THE EMBEDDINGS" in monospace all-caps. Subtitle: "VECTOR · SPACE · TOUR." Palette: navy + neon green + white. Y2K cyberpunk vibe. |
| 14 | `band-latent-space.png` | Circle | **Latent Space** · shoegaze / ambient dream-pop | "LATENT SPACE" in soft rounded serif, arced along the top curve. Subtitle at bottom: "SLOW MUSIC · SUNNYV<span style="color:#9b3f5f">Ai</span>LE." Palette: deep space navy + rose + soft gold. Small painted crescent moon in the center. |
| 15 | `band-the-bots.png` | Die-cut star | **The Bots** · Y2K electro-pop / new wave | "THE BOTS" in blocky robot-style stencil. Subtitle: "BEEP · BOOP · KSVL." Palette: chrome silver + Y2K blue + white. Reads like a novelty '99 sticker. |
| 16 | `band-chain-of-thought.png` | Rounded rectangle | **Chain of Thought** · indie folk / storytelling songwriter | "CHAIN OF THOUGHT" in serif italic with a small painted chain-link graphic between the words. Subtitle: "WORLD TOUR · ONE LONG THINK." Palette: warm plum + cream. |
| 17 | `band-grand-ol-query.png` | Oval | **Grand Ol' Query** · classic country / bluegrass | "GRAND OL' QUERY" in Western show-poster serif with slight distress. Subtitle curving along the bottom: "★ LIVE FROM SUNNYV<span style="color:#9b3f5f">Ai</span>LE ★." Palette: warm cream + faded red + gold. Grand Ol' Opry style. |
| 18 | `band-the-predicts.png` | Rounded rectangle | **The Predicts** · Y2K teen-pop | "THE PREDICTS" in bubbly rounded sans. Subtitle: "WE TOLD YOU · WORLD TOUR." Palette: bubblegum pink + cream + a touch of Sun-In yellow. Small painted crystal-ball graphic in one corner. Fortune-teller-meets-teen-pop. |

---

## Style rules for consistency across all 18

- **Same physical vinyl register.** Glossy, printed, decal-feel. Small dark drop-shadow under every sticker. If a sticker looks like a *logo* rather than a *physical sticker*, redraw it.
- **Every sticker mentions KSVL somewhere** — call letters, frequency (99.9), or full station name. Even the band stickers say "KSVL 99.9" small on the bottom (you got the sticker at the KSVL merch table).
- **Type is bold and readable at small size.** Test each design mentally at ~120px wide — the primary wordmark should still land.
- **Palettes stay 2–3 flat colors per sticker.** No gradients (except the specific mix-CD reflection). No holographic sheen (this is not that batch).
- **Die-cut shapes** (hearts, stars) should have a slightly-thicker white/cream outer border, matching the way peel-and-stick shapes are trimmed.
- **Transparent PNG backgrounds.** Checkerboard visible around each sticker; no white or plum rectangle baked in.
- **All the L<span style="color:#9b3f5f">Ai</span>DIES / SUNNYV<span style="color:#9b3f5f">Ai</span>LE brand words** must show the "Ai" letters in a distinct accent color from the rest of the word (rose accent) — this is a locked site canon rule for LAiDIES-brand words.

## Delivery

Save all 18 PNGs to `Website-homepage/assets/stickers/ksvl/` with the exact filenames in the tables above. Verify each has:
- Transparent alpha channel
- Small drop-shadow baked in
- Palette limited to 2–3 flat colors (excluding drop-shadow tone)

## Once delivered

I'll build:
1. A **KSVL sticker rack section** on the radio.html page — displays all 18 stickers as a sheet, greyed-out for un-earned, full-color for earned
2. A **sticker-earn mechanic** wired to KSVL player state (first listen, all-saints listen, band listens, etc.)
3. A **sticker slot in the Closet** — earned stickers show up on the Closet sticker book alongside existing Dare / Charm stickers

---

## Note on iteration

This is the first batch — 18 stickers to establish the register. Once Codex delivers, we'll review and add more or refine specific ones (Ali may want to swap shape / palette / wording on a few after seeing them printed).
