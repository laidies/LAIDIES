> 🔴 STYLE DECIDED 2026-07-23 (Ali): these cards are **POP-ART COMIC** like the town keepers
> (tradingref look, candy palette, halftone, name banner, full-holo foil — gold standard
> `assets/cards/characters/jojo-card-front-v1.png` + `-foil-v2.png`). The stained-glass
> framing below is SUPERSEDED — use each figure's existing stained-glass portrait as the
> LIKENESS reference only; render the CARD pop-art. Match `_character-cards-remaining-12.md`.

# TRAiLBLAZER trading cards — batch (6 women × 3 faces = 18 images)

The **TRAiLBLAZERS** pantheon as trading cards: 6 real, living women who *ship* frontier AI
(memory `builders-roster-canon`). Each gets **three renders** — FRONT (portrait + "TRAiLBLAZER of
X"), BACK (what she ships), and a **RADIANT RARE** chase edition. 6 × 3 = **18 images total**.

**Filename starts with `_`** so the episode-art hook (which bans halftone) does not fire — these
cards are a *different* locked art system. Do not remove the underscore.

---

## ⚠ STYLE IS PENDING — Ali picks the register before we commit 18 renders

We have TWO proven card looks in the town and have NOT yet chosen which one the SAiNT / MAiVEN /
TRAiLBLAZER "honor" pantheons wear. Render **ONE test card first** (recommend Mira Murati), Ali
judges, THEN the batch. Do not render all 18 blind.

- **ROUTE A — LUMINOUS STAINED GLASS (recommended for this pantheon).** These women are *revered*,
  same shelf as the SAiNTS and MAiVENS; the honor register is radiant stained glass, not pop
  comic. Follow memory `card-art-luminous-revered` **exactly**: genuinely LIT — backlit-by-noon-sun
  glow, warm gold halo behind her head; **saturated jewel tones** (ruby / cobalt / emerald / amber
  / amethyst + brand plum/rose), high chroma, bold crisp black lead lines. **DE-CLUTTERED:** no
  ornate frame, no heart-gems, no gold laurels, no roses, no scrolls, no baroque filigree — just
  the radiant figure + her one work-motif in a clean glowing panel. Feeling = *celebrated and
  venerated*, never cold, never a funeral card. (⛔ The existing `assets/builders/y2k-stained-glass-v2/`
  portraits are the OLD **drab** v2 look Ali rejected — use them ONLY for face/likeness, NOT for
  palette or mood.)

- **ROUTE B — POP-ART CANDY (the JoJo/tradingref system).** If Ali wants the pantheons to match the
  Character deck instead: bold black outlines + Ben-Day halftone + flat candy color (pink #e982ab ·
  teal #57b6c0 · coral #ec7a78 · periwinkle #b3abe7) over black ink, comic banner + burst frame.
  Refs `operations/reference/trading-cards/tradingref-01..04`; proven on
  `assets/cards/characters/jojo-card-front-v1.png`. This route is why the file is underscore-exempt
  (halftone).

Everything below is written for **Route A (stained glass)**, the recommendation. If Ali chooses
Route B, keep the same subjects / titles / back copy and swap the visual system to the JoJo spec.

---

## LIKENESS LOCK — real living women, invent nothing (non-negotiable)

Each card is a **specific real person**. Codex drifts to a generic look-alike (right vibe, wrong
face) — render the SPECIFIC woman, matched to her existing portrait below. Every prop/motif must be
TRUE to what she actually built; **no invented props, no invented biography** — wrong-but-fancy is
worse than plain-but-accurate (memory `card-art-luminous-revered`, `never-guess-facts`). Match the
**face and identity** from these portraits (all marked `correct` in the curation guard); do NOT
copy their drab palette:

| Slug | Subject | Likeness ref (face only) |
|---|---|---|
| `mira-murati` | Mira Murati | `assets/builders/y2k-stained-glass-v2/mira-murati-y2k-stained-glass.png` |
| `daniela-amodei` | Daniela Amodei | `assets/builders/y2k-stained-glass-v2/daniela-amodei-y2k-stained-glass.png` |
| `lila-ibrahim` | Lila Ibrahim | `assets/builders/y2k-stained-glass-v2/lila-ibrahim-y2k-stained-glass.png` |
| `fidji-simo` | Fidji Simo | `assets/builders/y2k-stained-glass-v2/fidji-simo-y2k-stained-glass.png` |
| `chelsea-finn` | Chelsea Finn | `assets/builders/y2k-stained-glass-v2/chelsea-finn-y2k-stained-glass.png` |
| `amanda-askell` | Amanda Askell | `assets/builders/y2k-stained-glass-v2/amanda-askell-y2k-stained-glass.png` |

---

## SHARED CARD RULES (both faces, every card)

- **Portrait 1200 × 1680**, rounded corners, clean **white outer border** (same card geometry as the
  Character deck; ⛔ NOT the 1920×1080 episode frame).
- Luminous stained-glass register per Route A above — LIT, jewel-toned, de-cluttered, warm gold halo.
- Complete, correctly-jointed body; correct hands; head-and-shoulders or half-figure framing that
  reads at thumbnail size.
- **"AI" is ALWAYS both capitals** (AI, not Ai) where it's the acronym. The accented lowercase i
  belongs to brand words only — so the banner word **TRAiLBLAZER** keeps its accent, but "AI
  storefront" / "Claude's character" use plain caps. Render this carefully; it's a legibility trap.
- All lettering rendered **cleanly in-generation** — keep copy SHORT and letters LARGE. If a word
  can't render cleanly, make the panel bigger; do not shrink or garble it.
- ⛔ No baked-in foil/glitter on FRONT/BACK (the rare is its own render). ⛔ No roses/laurels/scrolls.
  ⛔ Nothing that misstates what she built.

---

## PER-CARD CONTENT

Title grammar is **"TRAiLBLAZER of X"** (parallel to the MAiVENS' "Keeper of X"). Back copy = *what
she ships*, drawn from `builders-roster-canon`; verify each line against a current source before
render (memory `fact-verification-rule`) — these are living women and roles change.

| Slug | Banner title | Front motif (her one true work-artifact) | BACK copy — "what she ships" (short, in-gen) |
|---|---|---|---|
| `mira-murati` | **TRAiLBLAZER of the ChatGPT era** | A glowing chat cursor / prompt line of light | "As OpenAI's CTO she shipped ChatGPT, GPT-4 and DALL·E to the world. Now she's building Thinking Machines Lab." |
| `daniela-amodei` | **TRAiLBLAZER of Anthropic** | A steady balance/compass of light (safety + ops) | "Co-founded Anthropic and runs the operation — product, safety, and the team that builds Claude." |
| `lila-ibrahim` | **TRAiLBLAZER of DeepMind's operations** | An interlocking-gears motif (research → shipped) | "As DeepMind's COO she turned a research house into a lab that actually ships." |
| `fidji-simo` | **TRAiLBLAZER of the AI storefront** | An open storefront window of light / shopfront | "Leads OpenAI's Applications — the storefront that puts the models into everyday hands." |
| `chelsea-finn` | **TRAiLBLAZER of embodied AI** | A simple robot arm reaching, learning | "Teaches machines to move and learn — robotics on the frontier, at Stanford and Physical Intelligence." |
| `amanda-askell` | **TRAiLBLAZER of Claude's character** | An open book / speech-shape of light (a mind, a voice) | "Shapes how Claude thinks and talks — the philosopher behind the model's character." |

---

## FRONT — template → `assets/cards/trailblazers/<slug>-card-front-v1.png`

> Luminous **stained-glass trading card**, portrait 1200 × 1680, rounded corners, clean white
> border. Register per memory `card-art-luminous-revered`: genuinely LIT — backlit-by-noon-sun glow,
> a warm **gold halo** behind her head, saturated jewel tones (ruby / cobalt / emerald / amber /
> amethyst + brand plum & rose), high chroma, bold crisp black lead lines. **De-cluttered** — no
> ornate frame, no laurels, no roses, no scrolls; just the radiant figure and one motif in a clean
> glowing panel. Feeling: celebrated, venerated, warm — never cold, never a memorial card.
>
> SUBJECT: **<Subject>** — match her face and identity to `<likeness ref>` (the SAME woman; ignore
> that reference's drab palette). Composed, confident, steady gaze, three-quarter or forward.
> Behind/beside her, softly, her one true work-motif: **<front motif>** — rendered as glowing glass,
> subtle, never dominating. Complete correctly-jointed body, correct hands. Nothing invented about her.
>
> **Banner across the top**, chunky clean lettering, reads **<banner title>** (keep TRAiLBLAZER's
> accented lowercase i; render "AI" as two capitals where it's the acronym). Every letter legible.

---

## BACK — template → `assets/cards/trailblazers/<slug>-card-back-v1.png`

> Luminous **stained-glass card back**, portrait 1200 × 1680, rounded corners, white border. SAME
> visual system as the front (same jewel tones, gold-halo glow, black lead lines, de-cluttered) so
> front and back read as one card. NO photographic realism, NO plain pasted text box — the copy
> lives INSIDE the glass.
>
> Layout, all lettering rendered cleanly in-generation:
> - **Top banner:** **<Subject name>** — beneath it, smaller, **<banner title>**.
> - **One clean glowing glass panel** holding this copy in large legible lettering: **"<back copy>"**
> - A small restatement of her **<front motif>** as a glass emblem in a corner.
> - Keep the copy SHORT and the lettering LARGE — legibility over density. If a word won't render
>   cleanly, enlarge the panel; never garble or misspell. "AI" stays two capitals.

---

## RADIANT RARE — template → `assets/cards/trailblazers/<slug>-card-rare-v1.png`

The chase edition. Because the base register is already luminous, "rare" pushes the LIGHT to
unmistakable — same subject, same pose, same banner, only the finish changes (mirrors the approved
JoJo foil route A: shine, not alternate art — memory `card-front-codex-back-code`).

> The **RADIANT RARE edition** of the approved front card `assets/cards/trailblazers/<slug>-card-front-v1.png`.
> Keep <Subject>, her pose, her motif, the **<banner title>** banner and the jewel palette EXACTLY —
> do NOT redraw her, her face, or the scene.
>
> Change ONLY the finish, and make it DRAMATIC — it must read as an obviously rare card at a glance,
> not the standard card with a tint:
> - The whole window BLAZES as if the sun broke through at full noon — light pours through every
>   pane, a **golden sunburst halo** radiating behind her head.
> - A **prismatic shimmer** refracts across the glass — the jewel panes catch rainbow light and
>   sparkle, like premium 1990s holographic foil stock tilted to the light.
> - Fine glints/sparkle scattered across the panel and banner.
> - It should look like a holographic chase card you'd gasp at pulling.
>
> Keep EVERY word legible through the shimmer — if the sheen washes out the banner, pull the shimmer
> off that lettering. Complete body, correct hands. ⛔ Must read as printed radiant/holographic
> stained glass, not a flat CSS gradient. ⛔ Do not change her face or invent props.

*(If Route B / pop-art is chosen instead, the rare = full prismatic holo per
`operations/codex-prompts/_card-test-jojo-foil-v2-stronger.md` — whole card iridescent, halftone
dots catching rainbow, bursts going holo.)*

---

## DELIVER — one image per send

Save to `assets/cards/trailblazers/` with these exact names (18 files):

```
mira-murati-card-front-v1.png     mira-murati-card-back-v1.png     mira-murati-card-rare-v1.png
daniela-amodei-card-front-v1.png  daniela-amodei-card-back-v1.png  daniela-amodei-card-rare-v1.png
lila-ibrahim-card-front-v1.png    lila-ibrahim-card-back-v1.png    lila-ibrahim-card-rare-v1.png
fidji-simo-card-front-v1.png      fidji-simo-card-back-v1.png      fidji-simo-card-rare-v1.png
chelsea-finn-card-front-v1.png    chelsea-finn-card-back-v1.png    chelsea-finn-card-rare-v1.png
amanda-askell-card-front-v1.png   amanda-askell-card-back-v1.png   amanda-askell-card-rare-v1.png
```

**Render Mira Murati's THREE faces first** as the style test; Ali confirms Route A vs B and the
luminous look before the remaining 15.

---

## QC before Ali sees it (run `operations/tools/qc-frames.py`, then eyes)

- 1200 × 1680, white border, rounded corners; front + back + rare all present per subject?
- LUMINOUS not drab — lit, jewel-toned, de-cluttered (NO roses/laurels/scrolls/baroque frame)?
- **Unmistakably HER** — face matches the likeness ref, not a generic look-alike?
- Every word legible and correctly spelled on BOTH faces; "AI" is two capitals; TRAiLBLAZER accent intact?
- Motif and back copy TRUE to what she actually built — nothing invented, nothing misstated?
- Complete body, correct hands; rare reads as obviously rare while keeping her face and pose unchanged?
