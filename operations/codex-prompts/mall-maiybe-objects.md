# Codex prompt — MAiYBE avatar-object batch (v1)

> ⚠️ **CODEX SCOPE — IMAGES ONLY.** Generate the PNGs to the exact delivery path below and nothing
> else. NEVER edit, create, move, rename, or delete any non-image file (no HTML/CSS/JS/JSON/MD). NEVER
> run any git command. NEVER choose your own reference images — use ONLY the reference paths named in
> this brief. NEVER overwrite approved originals. If something looks wrong, note it in your delivery
> notes and stop. (Full contract: `AGENTS.md` at repo root.)

**Purpose:** 17 hero object portraits, rendered as a matched set that sits beside the CLAiRE'S / PIECES
OF FLAiR avatars WITHOUT clashing. Each becomes a member's Residence Card avatar AND that item's card
face at **MAiYBE** (the Mall's drugstore hair + makeup shop). Same asset does double duty.

**Canon rule (locked 2026-07-01):** Residence Card avatars are OBJECT-ONLY. Sourced from Mall
object-stops (CLAiRE'S / PIECES OF FLAiR, **MAiYBE**, Gizmos, Hanger, Food Court, Kiosk). No human
hands, faces, or bodies — the object is the hero. See `residence-card-avatar-system.md` in memory.

**Mechanic:** Member visits MAiYBE → browses the shelf → taps "Wear this →" on a product → returns to
Residence Card with the new avatar. Every Mall trip is a potential avatar-change moment. The MAiYBE
shelf reuses the PIECES OF FLAiR shelf pattern (`mall/pieces-of-flair.html`) verbatim — only the folder
and filename prefix change (see **Naming** below).

**No overlap with CLAiRE'S.** The existing 20-object CLAiRE'S set already owns: butterfly clips,
barrettes, claw clips, scrunchies, hair tinsel, mood/class/stretch rings, charm/friendship/slap
bracelets, chokers & friendship necklaces, gel/milky/fuzzy pens, Caboodles case, butterfly stamp, temp
tattoo, and the store receipt. **This batch stays in makeup + hot tools + drugstore-beauty lane** and
must not re-render any of those. (The MAiYBE receipt is the one deliberate callback — see item 17.)

---

## Curated references — attach these, take FINISH not COMPOSITION

Per the reference-curation rule: use ONLY the files named here. Take **palette warmth, illustration
finish, lighting, sparkle language, background, and scale** from them — never copy an object's
composition or invent your own reference from the repo.

**Matched-set style anchors (the set this must join) — attach all five:**
- `assets/avatars/claires/claires-avatar-caboodles-case.png` — the beauty-kit register; nearest cousin
- `assets/avatars/claires/claires-avatar-glitter-gel-pen.png` — glitter/gel sheen handling
- `assets/avatars/claires/claires-avatar-mood-ring.png` — a small single object at correct scale
- `assets/avatars/claires/claires-avatar-velvet-scrunchie.png` — soft-material sheen + drop-shadow
- `assets/avatars/claires/claires-avatar-claires-receipt.png` — the receipt treatment (for item 17)

**Store anchor (the building this object lives in) — attach:**
- `assets/mall-storefronts/maiybe.jpg` — MAiYBE's storefront. Take its color story + drugstore-beauty
  register only. Do NOT reproduce the storefront or its signage inside the object renders.

**OFF-LIMITS — do NOT reference or draw from:**
- Anything in `assets/avatars/claires/_archive/` (superseded early rolls)
- Any "party-clutter" scattered-glam flat-lay backdrop (e.g. businesswomen-special backdrops) — banned
  register; a MAiYBE object is a single clean hero on the gradient, never a scattered vanity flat-lay
- Do NOT let the model pick its own reference from the repo. Only the paths above.

---

## Format — IDENTICAL across all 17 (must match the CLAiRE'S set exactly)

- **1:1 square**, 1024×1024 minimum output
- **Object centered, filling ~65% of the frame**
- **Background:** soft radial gradient — center `--cream` (#fffdfb) → edge `--pearl` (#f8eef2). Subtle.
  No pattern, no clutter. **Must be identical to the CLAiRE'S renders** so the sets read as one shelf.
- **Soft rendered drop-shadow** beneath the object (grounded, not floating — but no visible surface)
- **Slight sparkle/rhinestone glint** — 1–3 tiny 4-pointed twinkle stars near the object (catalog-
  sticker / Lisa Frank energy)
- **Lighting:** soft top-left, gentle. Not dramatic.
- **Illustration idiom:** hand-illustrated digital painting, saturated Y2K palette, editorial-catalog
  finish. **NOT** flat vector. **NOT** photo-realistic. **NOT** 3D-rendered.
- **Palette per-object:** honor each item's real Y2K drugstore color story (frosted blues/lilacs,
  Lip-Smacker maroons, cucumber-melon green, holographic glitter, chrome hot-tool trims).

## Naming & delivery

Save each file as: `maiybe-avatar-<slug>.png` in **`assets/avatars/maiybe/`** (new folder).
Mirrors the `claires-avatar-<slug>.png` → `assets/avatars/claires/` convention exactly, so the shelf
wires with a one-line path swap.

## The 17 objects — hero specs

Render each with the format above. Notes tell you the era-canon variant to draw.

| # | Object | Save as `assets/avatars/maiybe/…` | Render note |
|---|---|---|---|
| 1 | Roll-on lip gloss | `maiybe-avatar-roll-on-lip-gloss.png` | Clear plastic roller-ball gloss tube, cap off, wet-look pale-pink/clear gloss visible inside, high shine, angled ~20°. |
| 2 | Lip Smacker | `maiybe-avatar-lip-smacker.png` | Classic oversized twist-up Lip Smacker balm tube, glossy soda-flavor wrapper (Dr Pepper maroon or strawberry red), cap off showing the balm bullet. |
| 3 | Tube mascara | `maiybe-avatar-tube-mascara.png` | The iconic hot-pink barrel + lime-green cap drugstore mascara; wand pulled out an inch showing the spoolie with a touch of black. Most recognizable mascara silhouette. |
| 4 | Eyeshadow palette | `maiybe-avatar-eyeshadow-palette.png` | Open frosted quad — four pressed shadows in Y2K blue / lilac / silver-frost / icy-white, tiny foam doe-foot applicator across it, small mirror in the lid, shimmer catch. |
| 5 | Blush compact | `maiybe-avatar-blush-compact.png` | Round drugstore clamshell compact, open: peachy-pink pressed powder, soft round puff, small round mirror in lid. |
| 6 | Nail polish | `maiybe-avatar-nail-polish.png` | Single squared drugstore polish bottle, frosty pearl shade (baby-blue frost or silver-pearl), black brush cap, a sheen drip on the glass. |
| 7 | Lip liner | `maiybe-avatar-lip-liner.png` | Sharpened brown/mauve lip-liner pencil (the '90s brown-lip essential), wood barrel with a color band at the end, fine point, slight angle. |
| 8 | Body glitter | `maiybe-avatar-body-glitter.png` | Small open pot/tube of holographic body-glitter gel — chunky iridescent glitter suspended in clear gel, rainbow catch. Peak roller-disco Y2K. |
| 9 | Crimper | `maiybe-avatar-crimper.png` | Hair crimping iron, plates open to show the zigzag waffle ridges, coiled cord, teal/white plastic handle. Distinct waffle-plate silhouette. |
| 10 | Curling iron | `maiybe-avatar-curling-iron.png` | Barrel curling iron, spring clamp open, chrome barrel, coiled cord, plastic handle. |
| 11 | Hot rollers | `maiybe-avatar-hot-rollers.png` | A cluster of foam/velvet hot rollers (pink + purple) with butterfly clamps, one or two seated on the heat-tray posts — reads as the roller SET. |
| 12 | Round brush | `maiybe-avatar-round-brush.png` | Ceramic vented round hair brush, boar bristle, wood or plastic handle, shown at 3/4. |
| 13 | Headband | `maiybe-avatar-headband.png` | Padded satin stretch headband (or thin double-row plastic headband) in a Y2K pastel or animal print, laid in a soft arc. NOT a clip or barrette (avoid CLAiRE'S overlap). |
| 14 | Bobby-pin card | `maiybe-avatar-bobby-pin-card.png` | Retail paper card of bobby pins — a row of brown/black pins clipped to the printed card, "BOBBY PINS" header. Deadpan drugstore packaging. |
| 15 | Body spray | `maiybe-avatar-body-spray.png` | Tall frosted-plastic body-splash bottle (Cucumber Melon / Sweet Pea drugstore fragrance), pastel-green liquid, flip/spray cap, dewy condensation. |
| 16 | Press-on nails | `maiybe-avatar-press-on-nails.png` | Blister-card set of press-on nails — glossy french-tip or frosted-pink ovals in the size ladder, tiny glue tube tucked in the card. |
| 17 | MAiYBE receipt | `maiybe-avatar-maiybe-receipt.png` | Long thermal drugstore receipt curling at the ends, legible Y2K receipt type: header **MAiYBE ★ MAiN ST** (lowercase rose "Ai"), line items "GREAT LASH $4.99 / LIP SMACKER $1.99 / BODY GLITTER $6.50", subtotal + total, footer "THANK YOU — COME BACK BEAUTIFUL." Deadpan archival callback to the CLAiRE'S receipt. |

## Do NOT

- Do NOT render human hands, faces, lips, eyes, nails-on-fingers, or bodies. Objects only. (Press-on
  nails are the loose set on the card — never on a hand.)
- Do NOT re-render anything already in the CLAiRE'S set (clips, barrettes, claw clips, scrunchies, hair
  tinsel, rings, bracelets, chokers/necklaces, pens, Caboodles, stamp, temp tattoo).
- Do NOT add text labels ON objects except where the object naturally has text (mascara/balm brand
  hint, receipt line items, "BOBBY PINS" card header). Keep brand text generic/era-evocative, not a
  real trademark lockup.
- Do NOT add speech bubbles, callouts, price tags, or price stickers (except the receipt, which IS the
  receipt).
- Do NOT vary the background gradient across the 17 — identical to each other AND to the CLAiRE'S set.
- Do NOT go photo-realistic, flat-vector, or 3D. Hand-illustrated digital painting only.
- Do NOT add decorative border frames — clean object on the gradient, sparkle glints the only flourish.
- Do NOT render the object as a scattered vanity flat-lay — one hero object, centered.

## Output

- **17× renders**, all 1:1 square, 1024×1024 minimum, consistent format per spec above
- Save as `maiybe-avatar-<slug>.png` in `assets/avatars/maiybe/`
- The set must feel like the makeup page of the same 2000 Delia's / drugstore catalog as the CLAiRE'S
  set — matched palette, matched lighting, matched sparkle language.

## Silhouette test (identity signal)

Each render becomes an identity at both 512px (card hero) and 40px (leaderboard chip). At 40px, can you
tell a curling iron from a crimper, a blush compact from an eyeshadow palette, a body spray from a nail
polish? If not, dial up color/shape distinctiveness until you can.
