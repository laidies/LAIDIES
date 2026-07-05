# Codex Prompt · Residence Card Background (1 image)

Paste this prompt into Codex along with the reference images listed in the Style Benchmark section. This background will sit *behind* the member's Residence Card content (avatar, name, saint, cocktail, quote, etc.) on the LAiDIES Closet page.

---

## Style benchmark — CRITICAL, read this first

Match the register of the **ORIGINAL patron saint cards** in `assets/saints/` — **NOT** the stained-glass v2 series in `assets/saints/y2k-stained-glass-v2/`. Big distinction. The look you want:

- `assets/saints/cher-horowitz.png` — the anchor benchmark
- `assets/saints/elle-woods.png`
- `assets/saints/buffy-summers.png`
- `assets/saints/dolly-parton.png`
- `assets/saints/miranda-priestly.png`

What that register *is*:
- **Painterly digital illustration** — dreamy, warm, romance-novel-cover-meets-prayer-card. Hand-illustrated feel, soft brushwork visible, not photo-real, not vector-flat.
- **Ornate cream + gold baroque frame** at all 4 edges — filigreed corner flourishes, gilded scrollwork, small heart or floral motifs tucked into the corners. Aged-cream ground with gold detailing.
- **Sky-and-clouds painted backdrop** — soft teal-to-mint gradient in the upper half, warm rose/peach cloud swirls dissolving into cream at the bottom. Dreamy, weather-mid-afternoon warmth.
- **Scattered gold sparkle stars** — tiny 4-point sparkles peppered across the sky, various sizes, some larger with cross-glints, most small. Y2K romance-novel starlight.
- **Palette:** warm cream, aged gold, dusty teal/mint, warm rose/peach, plum accents. The same warm palette as the original saint cards. NO stained-glass jewel tones. NO neon. NO high-saturation modern digital hues.

What that register is *not*:
- ❌ NOT the stained-glass v2 look (deep jewel tones, cathedral window fragments, halos with light rays)
- ❌ NOT flat vector illustration
- ❌ NOT photorealistic sky photography
- ❌ NOT sharp geometric borders

---

## The brief

Illustrate a **single Residence Card background** in the LAiDIES original-saint-card register — but with **NO central subject**. This is a background layer; a member's avatar, name, and text will overlay on top. The center of the composition must stay open and calm so overlaid text is readable.

**Composition (this is where you need to be careful):**

- Aspect ratio: **exactly 2:1 (horizontal)** — output 1600 × 800 PNG.
- **Ornate baroque frame** — cream-and-gold filigreed border hugs all 4 edges, ~5–8% inset from the edge. Fine gilt scrollwork, small painted hearts tucked into the corners. Same style of frame you see on Cher's card and Elle's card.
- **Painted sky background** inside the frame — upper 60% of the canvas is a dreamy teal-to-mint gradient with soft warm-white and rose cloud swirls dissolving through it. Bottom 40% dissolves into warm cream / peach / pink clouds, like sunset warmth catching the underside.
- **Scattered gold sparkle stars** — small 4-point painted sparkles across the whole sky, denser in the upper third, fading toward the middle. Various sizes; a few larger sparkles with soft cross-glints for eye-catch.
- **NO central figure or subject.** The MIDDLE region of the canvas (roughly the middle 50% horizontal × middle 60% vertical) must be *quiet* — background sky and clouds only, no dominant painted elements. That's where the member's content will overlay.
- **Optional soft flourish accents** near the frame corners — a small painted rose sprig, a hint of a heart, a tiny cherub cloud — but keep them subtle and confined to the corner-adjacent areas.

**Palette (locked):**
- Cream: `#fbe9d7` / `#fef8ef`
- Aged gold: `#d4a853` / `#c9a227`
- Dusty teal / mint: `#a5c9c8` / `#c8ded9`
- Rose / peach / dusty pink: `#e8c5c8` / `#f4c9b3`
- Warm plum accent (used sparingly): `#4b2148`

Same warm range as the original saint cards' backgrounds. No stained-glass jewel tones. No neon. No high-saturation modern digital hues.

**Register rules:**
- Painterly, brushwork-visible, hand-illustrated
- Warm, dreamy, Y2K prayer-card / romance-novel-cover mood
- Aged, slightly worn cream ground under the frame filigree
- Soft, warm, inviting — this is a member's home card

## Delivery

- **File**: `residence-card-background-v1.png`
- **Save to**: `Website-homepage/assets/residence-card/`
- **Format**: PNG, 1600 × 800, RGB (no alpha needed — full painted composition)

## Once delivered

I'll wire it into `laidies-card.html` as a `background-image` on `.card-front` and `.card-back`, replacing the current linear-gradient. The card's existing 2px rose border + 18px corner radius stay put — your background sits inside them.

---

## Reference

The original patron saint cards live at `assets/saints/*.png` (7 saints, no subfolder). Use those files — especially `cher-horowitz.png` — as visual anchors for the register. **Do NOT reference the stained-glass v2 series** in `assets/saints/y2k-stained-glass-v2/` — those use a totally different (cathedral-window, jewel-tone) style that would fight the Residence Card look.
