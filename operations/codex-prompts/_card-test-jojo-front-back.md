# TEST CARD — JoJo, front + back (pop-art). ONE card, to judge the style.

**Purpose:** prove the trading-card look on a single card before committing to 13 keepers or the
per-episode decks. Render BOTH faces. Ali judges these two images, nothing else rides on it yet.

**Why JoJo first:** she already has a comic-treatment portrait, so she's the fairest first test of
whether Codex can hit the tradingref look cleanly.

**Filename starts with `_`** so the episode art hook (which bans halftone) doesn't fire — cards are
pop-art WITH halftone, a different locked style. Style is confirmed by Ali against these refs:
`operations/reference/trading-cards/tradingref-01.png` (person card) ·
`tradingref-03.png` (word-burst + sticker templates) · `tradingref-04.png` (burst frame).
⛔ LOOK at those files — do not work from this description alone.

---

## SHARED STYLE (both faces)
- **Pop-art comic:** bold black outlines, **Ben-Day / dot-halftone shading**, flat vivid color.
- **Portrait 1200 × 1680**, rounded corners, **white outer border**.
- Comic **word-bursts** and sticker motifs from the refs — stars, lightning bolts, hearts,
  speech bubbles — used as accents, not clutter.
- **Palette:** the punchy pop-art primaries of the refs — red, blue, yellow — over black ink and
  cream. (⚠ Ali has NOT chosen primary-vs-candy yet. Render this test in the reference's own
  PRIMARY palette so she judges the truest version; recolor later if she wants candy.)
- "AI" is always both capitals; brand words keep the accented i.
- ⛔ No plum/gold, no halos, no celestial roses. ⛔ No baked-in foil/glitter (finishes are CSS later).

---

## FRONT — `assets/cards/characters/jojo-card-front-v1.png`

> Pop-art comic **trading card**, portrait 1200 × 1680, rounded corners, white border. Match the
> style of `operations/reference/trading-cards/tradingref-01.png` — bold black outlines, Ben-Day
> halftone shading, flat vivid primary color — inside a comic-burst background like `tradingref-04.png`.
>
> SUBJECT: **JoJo**, the barista at the Blend & Snap café, SUNNYVAiLE, 1999. Match her face, hair
> and outfit to `assets/town-characters/comic/jojo-comic-v1.png` — same woman. She is mid-action:
> sliding a paper coffee cup across the counter with a knowing smile, because she already knows how
> you take it. Espresso machine, chalk menu board, stacked paper cups behind her.
> Her face fills the top ~40% and reads at thumbnail size. Complete, correctly-jointed body; correct
> hands. Nothing in frame postdates 1999.
>
> Comic **banner across the top** in chunky italic lettering reads **JOJO**. A small comic
> speech-bubble near her reads **"THE USUAL?"**. White comic stars as accents.

---

## BACK — `assets/cards/characters/jojo-card-back-v1.png`

The test that matters: **can the info live inside the art instead of a pasted text box.** Render
the copy IN-generation, set inside comic panels / a speech bubble — same pop-art system as the
front, so front and back read as one card.

> Pop-art comic **card back**, portrait 1200 × 1680, rounded corners, white border. SAME visual
> system as the front (`tradingref-01` + `tradingref-04`): bold outlines, Ben-Day halftone, flat
> primary color, burst background. NO photographic realism, NO plain text box.
>
> Layout, all lettering rendered cleanly in-generation:
> - **Top banner:** **JOJO** — and beneath it, smaller, **BARISTA · BLEND & SNAP**.
> - **A bold-bordered comic panel** (like the lettered panels in `tradingref-03`) holding this copy,
>   in clean comic lettering:
>   **"She knows your order before you say it. That's not magic — it's memory. Tell it once, get your
>   usual every time."**
> - **A speech bubble** in a corner reads **"SAME AS ALWAYS?"**
> - Sticker accents from the ref set (coffee-cup star, a little heart, halftone dots).
> - Keep the copy SHORT and the lettering large — this is the legibility test. If a word can't be
>   rendered cleanly, make the panel bigger; do not shrink or garble it.

---

## WHAT ALI IS JUDGING
1. Does the front look like a real pop-art trading card (tradingref), not clip-art and not the old style?
2. Is it recognisably JoJo from her comic reference?
3. **On the back: does the in-gen text read clean, and does it look like part of the card — NOT a
   pasted-on text box?** (If yes → backs are Codex renders. If the text garbles → backs go to code.)
4. Primary palette right, or should the deck go candy (pink/teal/coral/periwinkle)?

## QC before Ali sees it (run `operations/tools/qc-frames.py`, then eyes)
- 1200 × 1680, white border, rounded corners, both files present?
- Halftone + bold outline + flat color (NOT painterly, NOT plum/gold)?
- Every word legible and correctly spelled on BOTH faces?
- JoJo matches her comic reference; complete body, correct hands; nothing post-1999?
- No baked-in foil/glitter?
