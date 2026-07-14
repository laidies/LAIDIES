# SUNNYVAiLE PIXEL RESTYLE — master style guide

> **SCOPE (Codex):** this is an image job. Generate the pixel artwork per the briefs, save ONLY to
> the delivery path each brief names (`assets/pixel-restyle/...`), never overwrite an approved original.
> Use ONLY the reference images the brief names. Deliver images + notes; don't touch site code.

The whole site is converting to **ONE pixel-art language** (locked 2026-07-13). Every brief in this
restyle points back to this guide so 100+ assets come back consistent instead of 100 slightly-different
pixel styles.

---

## 1. THE TECHNIQUE (shared by everything — this is the non-negotiable part)

**High-fidelity pixel *illustration*** — NOT tiny 8-bit sprites, NOT chibi.
Reference (pass on EVERY generation): `assets/episodes/ep-04/pixel/ep04-heroine-sheet-v2.png` and
`assets/episodes/ep-04/pixel/ep04-heroine-y2k-wardrobe-sheet-v2.png` — study the faces, hair, and cloth.

- **Visible pixels + ordered dithering.** Gradients and shadows are rendered with dither texture, not
  smooth airbrush. You should be able to see the grid up close.
- **Semi-realistic adult proportions.** Real, grown women — the same believable anatomy and face
  detail as the heroine sheet. Expressive eyes, defined lashes/brows/lips, individual likeness. No
  big-head chibi, no cartoon mascots.
- **Form from shading, not hard outlines.** Edges are defined by light and shadow + a subtle darker
  edge, not thick black cartoon linework.
- **Rich, painterly-within-pixel rendering.** Detailed hair strands, fabric folds, highlights — the
  Ep4 heroine is the fidelity bar.
- **Resolution:** high-res (long edge ≥ 1920px) so pixels read crisp but the piece is detailed.
- **ONE consistent pixelation level across EVERYTHING (critical).** The library is *all over the place right
  now* — some assets chunkier, some finer. Lock the **same effective pixel grid / pixel size and dither
  density** on every asset, anchored to the heroine sheet above, so a character close-up, a building, and a
  wide town shot all read as **the same videogame**. If a new render looks more or less pixelated than the
  heroine sheet, it's wrong — redo it. When existing art doesn't match, **re-render it rather than mixing it in.**

## 2. THE COLOR MODES (same technique, different LIGHT) — each brief says which

Same pixel technique everywhere; only the LIGHT changes. **Neon belongs to NIGHT only.**

- **EPISODE mode = DARK / cinematic.** Deep plum + navy, low desaturated light, moody night "watching the
  tape." ONLY episode scene art (Ep4, done). Not for the town.

- **TOWN — DAYTIME = bright sunny 90s.** Ref (pass it): `assets/sunnyvaile-streets/civic-square-midday.png`.
  Bright blue sky + white clouds, warm California-midday sun, cream/terracotta buildings, teal-green trim,
  pink florals, palm trees. Saturated and cheerful but **naturally sunlit — NO neon.** Default for daytime
  scenes and characters.

- **TOWN — NIGHT / DUSK = warm glowing 90s sunset (BRIGHT + vibrant).** Ref (pass it):
  `assets/postcards/from-sunnyvaile/pc-dial-up.png` — the "Dial-Up to Sunnyvaile" postcard (**Ali's pick
  for the color palette** — brighter and warmer than the plum homepage dusk). Warm coral / orange /
  salmon-pink **sunset sky** melting up into lavender; vibrant **teal** + hot **pink/magenta**; **gold**
  twinkly town lights and warm window glow; **pink neon** (the KSVL heart). Saturated, luminous, cheerful
  — this is the target vibrancy. **Neon + bulb glow welcome — lean in.** For evening/dusk scenes and
  cozy-lamplit characters.

Both TOWN modes are vibrant and colorful (NOT the episode's dark). Take the *pixel technique* from the Ep4
heroine sheet; take the *light/color* from whichever TOWN reference the brief names. Many buildings will
eventually want BOTH a day and a night version.

## 3. THE PALETTE (exact — every piece is colored from here)

- plum `#4b2148` · deep plum `#3a1838` · cream `#fffdfb`
- pink `#e982ab` · coral `#ec7a78` · tangerine `#f4a636` · teal `#57b6c0` · sky `#8bbde9` · periwinkle `#b3abe7`
- rose `#9b3f5f` · gold `#c9a227` (accents/sparkle, sparingly)

Backgrounds/skies favor warm creams, soft pinks, periwinkle, sky — bright. Plum/deep-plum for depth,
outlines, and grounding. Gold only for sparkle/metal/accents.

## 4. THE WORLD (keep it on-brand)

Set ~1999, furnished with the 1990–2010 era (butterfly clips, Y2K fashion, cassette/CRT/landline tech).
Diverse, real women. No AI-cliché imagery (no glowing blue brains, no circuit-board wallpaper, no robots).

## 5. PER-CONVERSION RULE — preserve identity, restyle the surface

Each brief names a **source image** (the current art). **Keep what the character/scene IS** — the same
person, pose, props, composition, warmth — and **only change the rendering** into bright TOWN-mode pixel.
Don't reinvent the subject; re-skin it.

## 6. DELIVERY (never clobber)

- Save to `assets/pixel-restyle/<group>/<name>-pixel-v1.png` (a human runs the swap into the live paths).
- Keep the source's **aspect ratio** unless the brief says otherwise (portraits stay portrait).
- One asset per run. Report what you made + any concerns.
- Off-limits: never edit/overwrite the original (non-pixel) files; those stay until a human swaps.

See [[people-go-pixel]] (the ruling), [[episode-pixel-art-direction]] (episode mode), [[brand-palette-and-type-lock]], [[codex-reference-curation]].
