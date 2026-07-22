# Codex Prompts — Band Album Covers, REDO v2 (illuminated, concept-forward)

**Why redo:** the v1 covers (`assets/albums/*.png`) are being replaced — they were an
incoherent grab-bag (flat-graphic / oil-painting / 3D-AI-gloss / stock still-lifes),
lifeless, and they didn't read as albums. This batch redoes **all 12** in ONE cohesive
style, with the **AI concept as the hero image** of each cover.

**NOT pixel.** Pixel art is for episode assets only. These covers are the site's
**illuminated painterly house style** — same visual universe as the LUMINAiRY saints.

**Batch:** 12 covers (10 originals upgraded + 2 new bands: The Ensembles, The Diffusions).
**Delivery:** 1:1 square, 2048×2048 PNG → `assets/album-covers-v2/<band-slug>-<album-slug>.png`.
**Never clobber** the v1 files in `assets/albums/`; a human runs the swap.
**One cover per run.** Images only — don't touch site code.

---

## STYLE ANCHOR (pass these refs on EVERY generation — never let Codex pick its own style)

- `assets/saints/y2k-stained-glass-v2/cher-horowitz-y2k-stained-glass.jpg`
- `assets/saints/y2k-stained-glass-v2/miranda-priestly-y2k-stained-glass.jpg`

Study them for: **richly-lit, jewel-toned, painterly illustration with an inner glow** —
luminous like backlit stained glass, considered, saturated but not gaudy. Every cover
must look like it belongs on the same wall as those portraits.

## SHARED VISUAL DNA (apply to all 12)

- **Concept-forward.** The band's **AI concept** (the ML term in its name) IS the image —
  a clever, legible visual metaphor. Genre flavor is the seasoning, not the subject.
- **Figures only where the band naturally has them** — a group, a duo, a soloist, or
  none. Do NOT force a single woman onto every cover. When figures appear they are
  **fictional, diverse, real adult women**, painterly and luminous like the saint refs —
  and must **never resemble** the specific celebrity the sound family points to.
- **No AI-cliché imagery** — NO glowing blue brains, circuit boards, robots, binary,
  HUD/sci-fi. Show the concept through Y2K-real objects, light, and composition.
- **Palette:** LAiDIES core through-line — plum `#4b2148`, deep plum `#3a1838`,
  rose `#9b3f5f`, gold `#c9a227` (sparingly, for glow/metal), cream `#fffdfb` — plus
  ONE genre accent per band (named below). This shared palette is what makes them a set.
- **Composition:** 1:1 square, center-safe, the concept clearly readable at a
  **300×300 thumbnail**. Bold and confident, like a real Y2K CD cover.
- **NO text on the artwork** — band name + album title are added on the site via a
  Sharpie-label CSS overlay. Render art only.

---

## 1. THE LAiDIES · *Welcome to the Grid* (LP) — house-band pop anthems
**File:** `the-laidies-welcome-to-the-grid.png` · **Accent:** chrome + gold horizon
**AI concept:** the grid = data/arrival. **Cover:** a radiant pop-diva figure (solo — she's
the house star) arriving at the crest of a luminous tiered grid-floor that recedes to a
plum + gold horizon; the grid double-reads as a power grid and a spreadsheet, glowing like
backlit glass. Halo of light around her. **No** face resemblance to any real diva.

## 2. The Overfits · *Memorized* (LP) — pop-punk / scrappy guitar
**File:** `the-overfits-memorized.png` · **Accent:** rose pink + black + one gold star
**AI concept:** overfitting = the model just *memorizes* its training data. **Cover:** three
identical Y2K punk girls (a "band") in a row — the **exact same** figure, pose, and face
copy-pasted, uncannily duplicated — because an overfit model reproduces, it doesn't
generalize. Painterly, luminous, a pink Sharpie heart glowing over one. Group of identical figures.

## 3. The Embeddings · *Deep Vectors* (LP) — R&B / mid-tempo groove
**File:** `the-embeddings-deep-vectors.png` · **Accent:** deep plum-blue + gold points
**AI concept:** embeddings = meaning mapped to points in a vector space. **Cover:** a
luxe R&B woman's portrait whose edges dissolve into a **constellation of glowing points**
suspended in deep plum space — her form becomes clustered, connected star-points (the
embedding). Luminous, deep, elegant. Solo figure dissolving into points.

## 4. The Regressions · *Please Fit This Curve* (EP) — bubblegum Y2K teen-pop
**File:** `the-regressions-please-fit-this-curve.png` · **Accent:** bubblegum pink + gel-pen brights
**AI concept:** regression = fitting a line/curve through scattered data. **Cover:** a
glowing scatter of pastel Y2K hearts and stars (the data points) with a single radiant
**best-fit curve** arcing through them like a shooting-star trail, ending in a heart. No
figure (or just a hand with a gel pen). Bright, girlish, luminous. No equations/text.

## 5. The Bots · *Dial-Up the Dance Floor* (EP) — Eurodance / Y2K club
**File:** `the-bots-dial-up-the-dance-floor.png` · **Accent:** hot pink + acid green + chrome
**AI concept:** bots = automation / synchronized machines. **Cover:** a translucent Y2K
clear-plastic corded phone (receiver off the hook) at the center of a glowing mirror-ball
club; behind it a **row of identical silhouette dancers moving in perfect sync** (the
"bots"), laser lines through neon fog. The call is coming from inside the club. Synced-group silhouettes.

## 6. Latent Space · *Between Layers* (EP) — cold synth-pop / icy electronic
**File:** `latent-space-between-layers.png` · **Accent:** icy silver-blue + one warm gold glow
**AI concept:** latent space = the hidden space between a network's layers. **Cover:** a
lone elegant figure suspended **between translucent frosted-glass planes** floating in a
dark plum void, a single warm gold light glowing from behind the layers, casting her soft
silhouette onto each pane. Minimal, cold, luminous. Solo silhouette between layers.

## 7. The Predicts · *Told You So* (EP) — Spice-Girls fortune-teller dance-pop
**File:** `the-predicts-told-you-so.png` · **Accent:** rose-purple iridescent + velvet plum + gold
**AI concept:** prediction. **Cover:** a femme-mystic's hands over a glowing crystal ball
whose iridescent swirl forms a **subtle pointing hand / "I told you so"** instead of smoke;
holographic Y2K tarot fanned around the base, faces obscured. Knowing, cheeky, luminous.
Hands + ball (no full fortune-teller face).

## 8. The Recalls · *Down at the Blend & Snap* (7") — mid-2000s pop-R&B
**File:** `the-recalls-down-at-the-blend-and-snap.png` · **Accent:** bubblegum pink + rose-gold + warm salon light
**AI concept:** recall = retrieving a stored memory. **Cover:** a warm Y2K salon vanity
mirror in which the **reflection shows a slightly-earlier moment** than the scene (a memory
being recalled) — or a strip of salon Polaroids being pulled from a mirror frame. Cheeky
Blend & Snap salon world, luminous and warm. Optional woman at the mirror; no Legally Blonde iconography.

## 9. Chain of Thought · *David Says* (7") — nervy new-wave, Talking Heads energy
**File:** `chain-of-thought-david-says.png` · **Accent:** cream + wine-red + gold
**AI concept:** chain-of-thought = reasoning one linked step at a time. **Cover:** a
**chain of small glowing linked vignettes** stepping across a cream field — each link a
tiny considered step (a fabric swatch, a raised-brow line, a check) resolving to a precise
final "aha" (a wine-glass silhouette). Nervy, dry, art-school, luminous. No figure (fussy precision); symbols only, no text.

## 10. Grand Ol' Query · *Common Sense* (7") — country-pop, Dolly *9 to 5* era
**File:** `grand-ol-query-common-sense.png` · **Accent:** honey-gold + denim blue + turquoise sky
**AI concept:** a query = asking a plain question. **Cover:** a big warm **question mark
formed from a country-porch string of fairy lights** (or hand-embroidered on a denim
jacket draped over a banister), golden-hour glow — a query rendered as homespun wisdom.
**Warm daytime golden-hour light** (the one warm-day exception). No figure; no cowboy hat; no Dolly likeness.

## 11. The Ensembles · *Wisdom of the Crowd* (LP) — big brassy Broadway/cabaret showstopper *(NEW BAND)*
**File:** `the-ensembles-wisdom-of-the-crowd.png` · **Accent:** gold spotlights + plum + brass shimmer
**AI concept:** ensemble methods = many models combined into one better result. **Cover:**
a Broadway **kick-line of many silhouetted showgirls that overlap and merge into ONE
radiant diva-form** at center — many-as-one — under warm gold spotlights against plum.
Theatrical, luminous, brassy. A GROUP merging to one (not a lone woman). No single-celebrity resemblance.

## 12. The Diffusions · *Denoise the Dance Floor* (7") — 1970s feel-good disco *(NEW BAND)*
**File:** `the-diffusions-denoise-the-dance-floor.png` · **Accent:** warm sunset + neon pink + gold mirror-ball
**AI concept:** diffusion models turn pure noise into an image by **denoising**. **Cover:**
the image literally **denoises top-to-bottom** — the top is grainy TV-static/noise that
resolves band-by-band into a vivid disco scene at the bottom: a mirror-ball and a figure
mid-spin emerging out of the static. Warm sunset + hot-pink neon + gold sparkle, luminous.
Figure resolving out of noise.

---

## Delivery checklist (per cover)
- [ ] 2048×2048 PNG, 1:1 square, saved to `assets/album-covers-v2/<filename>.png`
- [ ] Illuminated painterly (stained-glass-saint style) — NOT pixel, NOT 3D-gloss, NOT flat clip-art, NOT stock photo
- [ ] The AI concept reads clearly as the subject
- [ ] LAiDIES palette through-line + the one named genre accent
- [ ] No text on the art · no AI-cliché (brains/circuits/robots) · no recognizable real celebrity
- [ ] Reads at 300×300 thumbnail
