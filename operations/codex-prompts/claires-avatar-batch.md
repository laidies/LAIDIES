# Codex prompt — CLAiRE'S avatar batch (v1)

**Purpose:** ~20 hero object portraits, rendered as a matched set. Each becomes a member's Residence Card avatar AND that item's card face at CLAiRE'S in the Mall (same asset does double duty).

**Canon rule (locked 2026-07-01):** Residence Card avatars are OBJECT-ONLY. Sourced from Mall object-stops (CLAiRE'S, MAiYBE, Gizmos, Hanger, Food Court, Kiosk). Non-object stops (people, media, experiences) do NOT provide avatars. See [`residence-card-avatar-system.md`](../../../.claude/projects/-Users-alisoneakin-Library-Mobile-Documents-com-apple-CloudDocs-LAIDIES/memory/residence-card-avatar-system.md).

**Mechanic:** Member visits CLAiRE'S → browses the shelf → taps "Wear this →" on a product card → returns to Passport with new avatar. Every Mall trip is a potential avatar-change moment.

**Ships first:** CLAiRE'S (this batch). Next in order: Gizmos → MAiYBE → Kiosk → Hanger → Food Court.

---

## Reference visual style

- **Locked style benchmark:** Girl Talk card faces + patron saint cards. Codified in [`operations/voice/laidies-canon-index.md`](../voice/laidies-canon-index.md) §9. Match register, palette density, and hand-illustrated feel.
- Hand-illustrated (not photo-realistic), saturated Y2K palette, subtle sparkle/glow around the object, soft rendered shadow beneath. Reads as a page from a 1999 Delia's catalog with editorial-magazine finish.
- **NOT** flat vector. **NOT** photo-realistic. **NOT** 3D-rendered. Hand-painted digital illustration idiom.

## Format (identical across all 20 in the batch)

- **1:1 square**, 1024×1024 minimum output
- **Object centered, filling ~65% of the frame**
- **Background:** soft radial gradient — center: `--cream` (#fffdfb) → edge: `--pearl` (#f8eef2). Subtle. No pattern, no clutter.
- **Soft rendered drop-shadow** beneath the object (grounded, not floating in the void — but no visible surface)
- **Slight sparkle/rhinestone glint** — 1-3 tiny 4-pointed twinkle stars scattered near the object (Lisa Frank / catalog-sticker energy)
- **Lighting:** soft top-left, gentle. Not dramatic.
- **Palette per-object:** honor the item's real Y2K color story (mood ring = color-shifting, milky pen = pastel opaque, butterfly clip = clear blue plastic with rhinestones, etc.)

## Naming convention

Save each file as: `claires-avatar-{slug}.png` in `Website-homepage/assets/avatars/claires/`

## The 20 objects — hero specs

Render each with the format above. Per-object notes tell Codex which specific era-canon variant to draw.

### 1 · `butterfly-clip`
Small acrylic hair clip shaped as a butterfly. Iridescent-clear or pastel-blue plastic wings, 3 rhinestones on each wing, small metal snap-clip mechanism visible on back. Sitting at a 3/4 angle, wings open. Peak 1998-2001 CLAiRE'S mall aesthetic.

### 2 · `butterfly-stretch-ring`
Chunky stretch-band ring — elastic threaded through pastel beads, with an oversized butterfly charm on top. Bright turquoise-and-pink butterfly. Shown angled so the ring loop and butterfly are both visible.

### 3 · `mood-ring`
Silver-tone band with a large oval "mood stone" cabochon on top. Show the stone mid-color-shift: swirling from teal (calm) to indigo (loved) with a faint yellow ring at the edge. The classic "confused" state.

### 4 · `charm-bracelet`
Fine silver chain, coiled softly in a loose loop. 5-7 tiny charms dangling: heart, star, tiny keys, one enamel butterfly, one dice, one clover, tiny padlock. Real jeweler's rendering, not costume.

### 5 · `friendship-bracelet`
Hand-woven embroidery-floss bracelet. Chevron pattern in pink/purple/aqua/lime, tied off with dangling threads on both ends. Slight coil/twist to show it's real fabric. Looks like it took someone a summer at camp.

### 6 · `class-ring`
Gold-tone signet class ring with a red faceted glass "gem" (not real ruby) in the center, tiny engraved "SVHS 2002" band on the shank. Angled 3/4 to show the top and one side of the ring band.

### 7 · `choker-necklace`
Black elastic tattoo-style stretch choker (the woven-plastic Y2K style — not leather, not velvet). Small dangling silver charm at the front — a tiny heart or a Y2K "Y" pendant. Laid slightly open in an arc.

### 8 · `friendship-necklace`
The iconic Y2K **"Best Friends" rainbow-glitter split-heart pendant necklace set** — TWO chains, TWO half-pendants, side by side.

**The pendant:** each half is one side of a heart split down the middle with a jagged/zigzag rip line. Silver metal frame around the edges of each half. The face of each half is rainbow-glitter enamel in horizontal stripes — magenta, teal, orange, hot pink, purple, blue (multiple bright glitter-fill stripes). The two halves fit together in the middle so they form one complete rainbow heart with the zigzag split visible between them.

**The text:** the words **"BEST FRIENDS"** are engraved/embossed in silver bubbly late-90s block caps, laid out across BOTH halves — "BEST" spanning the upper portion of both halves, "FRIENDS" spanning the lower portion. Each word is split at the middle by the zigzag rip. Small tiny heart bullet decorations (♥) flank the word "BEST" on top. Reads as one legible pendant when together, cut clean in half when separated.

**The chains:** two thin silver cable-chain necklaces (not ball-chain — the shiny linked oval-cable style). Both chains coiled softly above the pendants, forming a shallow V that leads down to the two hanging halves. Chains identical.

**Composition:** both halves centered in the frame, fit together forming the whole heart, chains coming up and out in a V. Slight sparkle glint on the glitter enamel. One necklace is for you. One you give to a friend. **Both pieces MUST be visible in the composition** — this is what makes it a friendship necklace, not just a heart pendant.

### 9 · `velvet-scrunchie`
Chunky oversized scrunchie in deep plum velvet. Show it folded to a natural crumple, catching the light on one edge. Slight sheen on the velvet nap.

### 10 · `claw-clip`
Medium plastic hair claw clip, tortoiseshell / caramel-brown pattern. Open jaw pose showing the teeth. Peak Y2K desk-clutter accessory.

### 11 · `snap-barrette`
Two enamel snap-barrettes in an X arrangement — one baby-blue with a smiling-daisy sticker face on it, one hot-pink with a tiny holographic heart sticker. The bendable metal kind that snapped when you flicked it.

### 12 · `slap-bracelet`
Neon-pink or holographic slap bracelet in the "coiled" post-snap position. Fabric wrap over the metal spring core, edges slightly frayed from years of school-bag use.

### 13 · `temporary-tattoo`
A wet transfer-paper temporary tattoo mid-application: paper backing peeling up on one corner, dolphin/butterfly/tribal-heart design visible half on the paper, half on cream skin. A tiny water droplet on the paper.

### 14 · `butterfly-hair-tinsel`
Small clump of shiny holographic hair-tinsel strands (silver/pink/rainbow) tied at the top with a butterfly-clip. Falls straight down, catches highlights.

### 15 · `fuzzy-pen-topper`
The pen barrel of a Bic-style ballpoint, with a wildly oversized neon-pink faux-fur pom-pom topper. Fluffy, silly, mall-kiosk. Cap on the bottom, pom-pom on the pen-clip end.

### 16 · `milky-pen`
Single Uni-ball Milky-brand gel pen — pastel opaque ink type, translucent-white barrel with a colored stripe (baby-blue). Cap on. Angled at 20° like it's rolling on a desk.

### 17 · `glitter-gel-pen`
Same pen format as milky-pen but with a clear barrel filled with visible glitter-suspended magenta gel ink. The cap has a small clip. Y2K essential.

### 18 · `caboodles-case`
Open Caboodles-brand caddy in the iconic pink-and-turquoise / lavender colorway. 3D angle showing the tiered trays extended, contents partially spilling: tubes of Lip Smacker, a mood ring, glitter, a compact mirror. Pure 1997 kit-of-treasures.

### 19 · `butterfly-stamp`
Wooden-handle rubber stamp with a butterfly relief, sitting next to a small ink-pad (open, purple ink visible). One purple butterfly imprint on the paper beneath. Cottage-industry rubber-stamp kit vibe.

### 20 · `claires-receipt`
Long thermal printer receipt from CLAiRE'S Accessories store — curling slightly at the ends. Legible in Y2K receipt-thermal typeface: line item "BUTTERFLY CLIP 2/$5.00," "MOOD RING $3.99," subtotal, total, small "THANK YOU FOR SHOPPING AT CLAiRE'S" at the bottom. Slight coffee-ring stain at the top corner. Deadpan / archival humor.

---

## Do NOT

- Do NOT render any human hands, faces, or bodies holding the objects (except the temp-tattoo hint of skin — but no face/hand visible)
- Do NOT add text labels ON the objects (except where the object naturally has text — brand name on a Milky pen, receipt line items, class ring engraving)
- Do NOT add speech bubbles, callouts, price tags, or price stickers to any object (except the receipt, which IS the receipt)
- Do NOT vary the background gradient across the 20 — must be identical so they read as a matched set
- Do NOT go photo-realistic. Hand-illustrated digital painting register only.
- Do NOT add decorative border frames — the object should sit clean on the gradient with the sparkle glints as the only extra flourish

## Output

- **20x renders**, all 1:1 square, 1024×1024 minimum
- Consistent format per spec above
- Save as `claires-avatar-{slug}.png` in `Website-homepage/assets/avatars/claires/`
- The set should feel like a page from a 2000 Delia's catalog — each item hero, matched palette, matched lighting, matched sparkle language

## Voice note

These are avatars. When a member picks one, it becomes their identity on the Passport, in the Sorority House, in Girl Talk, on the leaderboards. So each render has to survive as an identity signal at both 512px (Passport hero) AND 40px (leaderboard chip). Read the silhouette test: at 40px, can you tell a mood ring from a class ring? If not, dial up the color/shape distinctiveness.
