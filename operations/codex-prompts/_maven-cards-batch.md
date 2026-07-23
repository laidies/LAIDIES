> 🔴 STYLE DECIDED 2026-07-23 (Ali): these cards are **POP-ART COMIC** like the town keepers
> (tradingref look, candy palette, halftone, name banner, full-holo foil — gold standard
> `assets/cards/characters/jojo-card-front-v1.png` + `-foil-v2.png`). The stained-glass
> framing below is SUPERSEDED — use each figure's existing stained-glass portrait as the
> LIKENESS reference only; render the CARD pop-art. Match `_character-cards-remaining-12.md`.

# MAiVENS TRADING CARDS — batch (stained-glass register). Front + Back + Rare, per Keeper.

```
┌───────────────────────────────────────────────────────────────────────────┐
│ ⚠  STYLE PENDING ALI — READ BEFORE RENDERING                                │
│                                                                             │
│ This batch is written for the LUMINOUS STAINED-GLASS register, per Claude's │
│ recommendation: the MAiVENS live in the LUMINAiRY, a reverent cathedral     │
│ space, so their cards should be venerated/celebrated glass — NOT the candy  │
│ pop-art of the town-keeper cards. Each Keeper already HAS an approved v3     │
│ stained-glass portrait; that portrait IS the likeness + style reference.    │
│                                                                             │
│ IF ALI SAYS POP-ART INSTEAD: throw out the glass direction below and swap   │
│ to the tradingref candy pop-art pattern used for the town keepers —         │
│ operations/reference/trading-cards/tradingref-01..04 + the JoJo card shape  │
│ in operations/codex-prompts/_card-test-jojo-front-back.md (bold outlines,   │
│ Ben-Day halftone, flat candy color). Keep the same roster, titles, bios and │
│ deliver-to paths; only the visual register changes.                         │
│                                                                             │
│ DO NOT RENDER ALL 12 UNTIL ALI PICKS A REGISTER. Render ONE Keeper's three  │
│ faces first as the test (suggest Grace Hopper — clean 'correct' portrait,   │
│ strong motif), let Ali judge, then batch the rest.                          │
└───────────────────────────────────────────────────────────────────────────┘
```

**Purpose:** trading cards for the 12 MAiVENS (the LUMINAiRY pantheon of real women in
AI). Three images per Keeper — **FRONT** (portrait + her "Keeper of X" title),
**BACK** (who she is + what she keeps, lettered in-gen), **RARE** (a full-holo radiant
finish of the front). 12 Keepers × 3 = **36 images total** — but see the Ada HOLD below,
so **33 renderable now, 3 held.**

**These are REAL WOMEN. The existing v3 portrait is the approved likeness — MATCH IT,
do not invent a face.** Codex drifts to a generic look-alike (right vibe, wrong face);
that does not honor her. Render the SPECIFIC woman in her existing portrait. Four of the
twelve (Ada, Grace, Hedy, Karen) are historical; the other eight are living — extra care
with likeness, no invented props, everything true to the real person.

**Filename starts with `_`** so the episode-art hook (which bans halftone and enforces the
1920×1080 comic rules) does not fire — these cards are a DIFFERENT locked style. Do not add
the episode art-requirements block; it would contradict this register.

Sources this batch was built from (READ them, don't work from this description alone):
- **Likeness + style ref:** each Keeper's portrait in
  `assets/mavens/y2k-stained-glass-v3-finished/` (paths in the table). ⛔ LOOK at each one.
- **Luminous style lock:** memory `card-art-luminous-revered` — the direction below is a
  faithful restatement; if in doubt, that memory wins.
- **Roster + titles + bios:** memory `mavens-roster-canon`.
- **Card economy / finish rule:** memory `card-front-codex-back-code` +
  `trading-card-economy-locked` — FRONT and BACK are both Codex renders with in-gen text;
  the RARE finish is a SEPARATE full-holo render (no CSS). Gold-standard card craft bar =
  `assets/cards/characters/jojo-card-*.png`.

---

## ⛔ ADA LOVELACE — HELD, DO NOT RENDER YET

Ada is the **First Keeper** (hero of the wing) and belongs in this deck, BUT her v3
portrait basename `ada-lovelace-y2k-stained-glass` is marked **redo** in
`operations/ops/curation.json`. It cannot be used as a likeness reference (the
block-rejected-assets hook enforces this, and it would be wrong to build on a portrait Ali
flagged for a change). **Do not generate Ada's three cards until Ali supplies a corrected
Ada portrait or confirms which file to use.** Her slot, title and bio are kept below so the
deck is complete the moment she is unblocked:
- **Ada Lovelace · Keeper of the First Algorithm** (1815–1852). Back copy: *"She wrote the
  first algorithm meant for a machine — a century before the machine existed. Every Keeper
  in this wing descends from her."* Give her the First-Keeper hero treatment (gold "THE
  FIRST KEEPER" eyebrow above the title banner).

---

## THE STAINED-GLASS REGISTER (applies to every FRONT, BACK and RARE below)

Restated from `card-art-luminous-revered` — obey exactly:

- **Feeling first — REVERED AND CELEBRATED.** Venerated, radiant, warm, *lit up in
  celebration of her*, like the most beautiful window in a sunlit cathedral. ⛔ Never cold,
  never drab, never a Victorian funeral/memorial card.
- **Genuinely LIT.** Backlit-by-full-sun glow — cathedral window at noon. A warm gold
  **halo/nimbus** behind her head marks her as a Keeper (real person, not a saint — a clean
  radiant nimbus / geometric aperture, not a churchy round saint-halo).
- **Saturated jewel tones** — ruby, cobalt, emerald, amber, amethyst, anchored by brand
  plum/rose. High chroma. **Bold crisp black lead lines** between the glass pieces. ⛔ NOT
  muddy, NOT antique/sepia, NOT neon, NOT pastel.
- **DE-CLUTTERED.** NO ornate/baroque frame, NO heart-gems, NO gold laurels, NO
  roses/flowers, NO scrolls. Just the radiant figure + her one motif in a clean glowing
  glass panel.
- **NOT pop-art.** ⛔ No Ben-Day/halftone dots, no flat comic primaries — that is the OTHER
  (town-keeper) register. This is leaded jewel-glass.
- **Portrait 1200 × 1680**, rounded corners, thin clean white outer border (match the crop
  and border of the JoJo card craft, `assets/cards/characters/jojo-card-*.png`).
- **"AI" is always both capitals**; the accented i belongs to brand words only (LAiDIES,
  SUNNYVAiLE, MAiVENS, LUMINAiRY).
- **Likeness is the whole point** — it must be UNMISTAKABLY her, matching her v3 portrait
  face/hair. Every added detail (her motif, era, dress) TRUE to the real person; no invented
  props. Wrong-but-fancy is worse than plain-but-accurate.
- Lettering (title, name, bio) rendered cleanly **in-generation** — no blank plate for text
  added later, no pasted text box. If a word can't be lettered cleanly, make its panel
  bigger; never shrink or garble it.

**One image per send** (gpt-image renders one at a time). Deliver each to
`assets/cards/mavens/<slug>-card-{front,back,rare}-v1.png`.

---

## THE ROSTER (11 renderable now + Ada held)

| # | Keeper | Title | slug | v3 likeness ref (in `assets/mavens/y2k-stained-glass-v3-finished/`) | curation |
|---|--------|-------|------|--------------------------------------------------------------------|----------|
| — | Ada Lovelace | Keeper of the First Algorithm | `ada-lovelace` | ⛔ HELD — basename marked **redo**, see HOLD note above | redo |
| 1 | Grace Hopper | Keeper of the Compiler | `grace-hopper` | `grace-hopper-y2k-stained-glass.png` | correct |
| 2 | Hedy Lamarr | Keeper of the Airwaves | `hedy-lamarr` | `hedy-lamarr-y2k-stained-glass.png` | correct |
| 3 | Karen Spärck Jones | Keeper of the Index | `karen-sparck-jones` | `karen-sparck-jones-y2k-stained-glass.png` | correct |
| 4 | Hannah Fry | Keeper of the Probabilities | `hannah-fry` | `hannah-fry-y2k-stained-glass.png` | correct |
| 5 | Fei-Fei Li | Keeper of the Field | `fei-fei-li` | `fei-fei-li-y2k-stained-glass.png` | correct |
| 6 | Timnit Gebru | Keeper of the Room | `timnit-gebru` | `timnit-gebru-y2k-stained-glass.png` | correct |
| 7 | Rachel Thomas | Keeper of the Door | `rachel-thomas` | `rachel-thomas-y2k-stained-glass.png` | correct |
| 8 | Joy Buolamwini | Keeper of the Mirror | `joy-buolamwini` | `joy-buolamwini-y2k-stained-glass.png` | correct |
| 9 | Kate Crawford | Keeper of the Map | `kate-crawford` | `kate-crawford-y2k-stained-glass.png` | correct |
| 10 | Meredith Whittaker | Keeper of the Signal | `meredith-whittaker` | `meredith-whittaker-y2k-stained-glass.png` | correct |
| 11 | Emily Bender | Keeper of the Language | `emily-bender` | `emily-bender-y2k-stained-glass.png` | correct |

**Per-Keeper content** (motif = her one glass symbol; back copy = who she is + what she
keeps, all factual — attribute the real work, invent nothing):

- **Grace Hopper — Keeper of the Compiler** · motif: a length of punched tape / early code
  becoming readable words. Back: *"US Navy officer and computer scientist. Built the first
  compiler in 1952 — so people could program in words, not just numbers. The idea under every
  programming language since."*
- **Hedy Lamarr — Keeper of the Airwaves** · motif: a piano-roll of hopping frequencies /
  radio waves. Back: *"Hollywood star and inventor. Co-invented frequency-hopping in 1942 —
  the principle beneath Wi-Fi, Bluetooth and GPS."*
- **Karen Spärck Jones — Keeper of the Index** · motif: weighted words / an open index of
  glowing terms. Back: *"British computer scientist. Invented TF-IDF in 1972 — the weighting
  that lets a machine tell which words matter. The backbone of search and retrieval."*
- **Hannah Fry — Keeper of the Probabilities** · motif: a bell curve / dice-and-equations in
  glass. Back: *"Mathematician and broadcaster ('Hello World'). Reads the probabilities under
  the algorithm and shows what the numbers actually mean."*
- **Fei-Fei Li — Keeper of the Field** · motif: a lattice of labelled images / a sunlit field
  of data. Back: *"Stanford professor. Created ImageNet, the dataset that set off modern
  computer vision. Called the 'Godmother of AI'."*
- **Timnit Gebru — Keeper of the Room** · motif: a doorway/room with an empty chair drawn in.
  Back: *"AI-ethics researcher, founder of DAIR, co-author of 'Stochastic Parrots'. Asks who's
  in the room, who's left out, and who pays the cost."*
- **Rachel Thomas — Keeper of the Door** · motif: an open door with light spilling through.
  Back: *"Co-founder of fast.ai. Teaches deep learning to people without PhDs — opens the door
  to the outsiders."*
- **Joy Buolamwini — Keeper of the Mirror** · motif: a mirror / a face-detection frame. Back:
  *"MIT researcher, founder of the Algorithmic Justice League. Her 'Gender Shades' study
  exposed how facial recognition fails women and darker skin."*
- **Kate Crawford — Keeper of the Map** · motif: a map tracing mines, water, cables, power.
  Back: *"Researcher and author of 'Atlas of AI'. Maps the real cost of AI — the minerals,
  water, labour and power behind it."*
- **Meredith Whittaker — Keeper of the Signal** · motif: a shielded signal / privacy lock.
  Back: *"President of the Signal Foundation and organizer of the Google Walkout. Fights for
  privacy against surveillance."*
- **Emily Bender — Keeper of the Language** · motif: strung tokens / letters in a row that
  don't quite cohere. Back: *"University of Washington linguist, co-author of 'Stochastic
  Parrots'. Reminds us a language model orders words — it does not understand them."*

---

## FRONT TEMPLATE → `assets/cards/mavens/<slug>-card-front-v1.png`

Fill `{NAME}`, `{TITLE}`, `{MOTIF}` and `{REF PATH}` from the roster above.

> Luminous **leaded stained-glass trading card**, portrait 1200 × 1680, rounded corners,
> thin clean white border. **Match the face, hair and likeness of `{REF PATH}` exactly —
> this is the same real woman, {NAME}; do not drift to a generic look-alike.** Keep that
> portrait's stained-glass style but make it RADIANT and CELEBRATED: backlit as if by full
> noon sun through cathedral glass, a warm **gold nimbus** glowing behind her head,
> saturated jewel tones (ruby, cobalt, emerald, amber, amethyst, brand plum/rose), bold
> crisp black lead lines. De-cluttered — no ornate frame, no laurels, no roses, no scrolls;
> just her radiant figure and her motif in a clean glowing glass panel.
>
> Her one motif woven into the glass around her: **{MOTIF}**. Nothing invented; the motif is
> true to her real work.
>
> Lettering rendered cleanly IN the glass:
> - a **title banner** across the lower third reads **{NAME}**, and beneath it, smaller,
>   **{TITLE}**.
> - keep the type elegant and legible — leaded-glass capitals, not comic lettering.
>
> ⛔ No halftone/Ben-Day dots, no flat pop-art primaries (that is the other register). ⛔ Not
> muddy, antique, neon or pastel. ⛔ No pasted text box. "AI" always both capitals.

*(For Ada only, once unblocked: add a small **"THE FIRST KEEPER"** eyebrow above the title
banner and a slightly grander gold nimbus.)*

---

## BACK TEMPLATE → `assets/cards/mavens/<slug>-card-back-v1.png`

The info lives INSIDE the glass, not in a pasted box — same panel language as the front so the
two faces read as one card.

> Luminous **leaded stained-glass card back**, portrait 1200 × 1680, rounded corners, thin
> white border. SAME glass system as the front ({NAME}'s card): backlit jewel tones, gold
> glow, bold black lead lines, de-cluttered. No portrait needed — this is her emblem side.
>
> Center the card on her **motif — {MOTIF}** — rendered large as a glowing glass emblem.
>
> Lettering, all rendered cleanly in-generation inside leaded-glass panels:
> - **Top banner:** **{NAME}** — beneath it, smaller, **{TITLE}**.
> - **A glass panel** holds her story in clean legible type: **"{BACK COPY}"**.
> - Keep the copy SHORT and the lettering large — this is the legibility test. If a word
>   can't be lettered cleanly, make the panel bigger; do not shrink or garble it. Every word
>   correct (check names of works: ImageNet, TF-IDF, "Gender Shades", "Atlas of AI",
>   "Stochastic Parrots", "Hello World", fast.ai, DAIR).
>
> ⛔ No halftone, no pop-art, no plain text box, no photographic realism. "AI" always both
> capitals.

---

## RARE (FOIL) TEMPLATE → `assets/cards/mavens/<slug>-card-rare-v1.png`

A SEPARATE full-holo render of the FRONT — the celebration turned all the way up. NOT a CSS
overlay; render the radiance into the glass itself (this mirrors the approved
`jojo-card-front-foil` bar — a distinct render, not a filter on the front).

> The SAME front card for **{NAME}** ({REF PATH} likeness, {TITLE}, motif {MOTIF}), rendered
> as the **RARE / holographic** version: the window is blazing at full noon sun. Add
> holographic rainbow light-shafts refracting through the glass, prismatic sparkle on the
> lead lines, a brighter gold nimbus, and radiant beams spilling past the frame — the most
> beautiful window in the cathedral, lit in full celebration of her. Keep her likeness,
> pose, title banner and border identical to the front; only the light and holo-refraction
> intensify. ⛔ No halftone. ⛔ Do not restyle or re-pose her; same woman, same card, more
> radiance.

---

## QC before Ali sees anything (run `operations/tools/qc-frames.py`, then eyes)
- 1200 × 1680, thin white border, rounded corners; all three files present per Keeper?
- **Likeness:** unmistakably HER, matching the v3 portrait — not a generic look-alike?
- Luminous jewel-glass with gold nimbus and bold lead lines — RADIANT, not drab/antique?
- ⛔ No halftone, no pop-art primaries, no ornate frame / laurels / roses / scrolls?
- Every word legible and correctly spelled on FRONT and BACK (work titles especially)?
- "AI" both capitals; brand words keep the accented i?
- RARE reads as the same card with holo radiance, not a re-posed or re-cast figure?
- Ada NOT rendered (still held on the redo portrait)?
