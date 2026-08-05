# CONCEPT CARDS — pop-art redo, by episode

The existing concept cards are the **RETIRED photographic style** (`trading-card-specificity`,
`trading-card-receipts`, etc. — all curation "unused"). ⛔ Do NOT reference any of those. This file
redoes all **20 concepts** in the APPROVED pop-art card look — the same system as the JoJo character
card (`assets/cards/characters/jojo-card-front-v1.png` / `-back-v1.png` / `-front-foil-v2.png`).

Cards are grouped **by episode** (the per-episode 5-pack structure). Copy is taken **verbatim** from
`games/trading-cards.html` (`allCards`): `title`, `front` (hook phrase), `back` (explanation). Do NOT
invent or reword copy.

## ⛔ SEND ONE CARD PER CODEX REQUEST — and one FACE per generation
Batching collapses the template. For each concept, run **three separate generations in order**:
(1) FRONT, (2) BACK, (3) FOIL (the foil references the finished front). Copy the single blockquote
you need, nothing else.

**Filename starts with `_`** so the episode-art hook (which bans halftone) does not fire — cards are
pop-art WITH halftone, a different locked style.

## LOOK at these before you render
- APPROVED card: `assets/cards/characters/jojo-card-front-v1.png`, `jojo-card-back-v1.png`
  (in-gen text works — copy that legibility), `jojo-card-front-foil-v2.png` (full-holo rare).
- Style refs: `operations/reference/trading-cards/tradingref-01.png`, `tradingref-03.png`
  (word-burst + sticker templates), `tradingref-04.png` (burst frame), + that folder's `README.md`.

---

## HOW TO ADD A NEW EPISODE'S 5-PACK (repeatable recipe)
When a new episode ships, its concept cards follow this exact pattern:
1. **Pull the copy from the source, verbatim.** Open `games/trading-cards.html` → `allCards`, filter
   to the new `episode` number. For each card you have `title`, `front` (hook), `back` (explanation),
   `rarity`. Never rewrite these — the game and the card must match.
2. **One card = three renders**, each its own Codex request: FRONT (concept scene + TITLE banner +
   the `front` hook as a caption), BACK (the `back` text rendered in-gen in a comic panel), FOIL
   (full holo of the finished front).
3. **Same locked look every time:** pop-art comic, bold black outlines, Ben-Day halftone, flat
   **LAiDIES candy** color (pink #e982ab · teal #57b6c0 · coral #ec7a78 · periwinkle #b3abe7) over
   black ink, 1200 × 1680, rounded corners, white border, comic bursts + sticker motifs. "AI" both
   capitals; brand words keep the accented **i**. Nothing postdates 1999.
4. **Scene = illustrate the concept**, no real-person likenesses, no faces required (a stylized
   pop-art woman/hand is fine). Pick a sticker motif that fits the idea (see each card below for the
   model).
5. **Deliver to** `assets/cards/concept-popart/<id>-card-{front,back,front-foil}-v1.png` using the
   card's `id` as the slug.
6. **QC** with `operations/tools/qc-frames.py` then eyes (checklist at the bottom). A 5-pack = 5
   concepts × 3 faces = 15 renders.

---

## SHARED STYLE — every face of every concept card
- **Pop-art comic:** bold black outlines, **Ben-Day / dot-halftone**, flat vivid color.
- **1200 × 1680**, rounded corners, **white outer border**.
- **Palette = LAiDIES CANDY** over black ink: **pink #e982ab · teal #57b6c0 · coral #ec7a78 ·
  periwinkle #b3abe7**. ⛔ NOT primary red/blue/yellow. ⛔ NOT plum/gold.
- **FRONT** = a pop-art SCENE illustrating the concept, with the **concept TITLE in the chunky
  comic banner** across the top and the card's **`front` hook line in a comic caption bar / burst**.
- **BACK** = the card's full **`back` text rendered IN-generation**, inside a bold-bordered comic
  panel (same system as `jojo-card-back-v1.png`), TITLE banner on top. **Verbatim.** Keep lettering
  LARGE and legible; the backs here run longer than the character cards, so **let the panel fill most
  of the card and trim the burst clutter** so every word fits cleanly. If a word can't render, make
  the panel bigger — ⛔ do NOT reword (rewording needs Ali).
- Sticker motifs (stars, hearts, lightning, dots) as accents, matched to the concept.
- ⛔ No baked foil on FRONT/BACK. FOIL face = the ONE holo face.
- ⛔ No real-person likenesses (the Burn Book / Elle nods stay generic pop-art). Nothing post-1999.

## SHARED FOIL RECIPE (applied per card below)
> The FULL-HOLOGRAPHIC rare edition of the finished FRONT. Keep the scene, the TITLE banner, the
> caption and the candy palette EXACTLY — do not redraw. Change ONLY the finish: the ENTIRE surface
> gets a prismatic holographic shimmer (rainbow light across the whole image, NOT one or two
> streaks); Ben-Day dots catch the rainbow and sparkle; burst panels go iridescent; fine glints
> across art, banner and stars — like a premium 1990s holo card. Keep EVERY word legible; pull
> shimmer off any lettering it washes out. Printed holo foil, not a flat CSS gradient.

---

# EPISODE 1 — 5-pack+ (7 cards)

## 1.1 — HALLUCINATION  *(common)*
Deliver → `assets/cards/concept-popart/hallucination-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `assets/cards/characters/jojo-card-front-v1.png`: bold black outlines, Ben-Day halftone, flat
> **LAiDIES candy** color (pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black
> ink, comic-burst frame. SCENE: a chunky 1999 desktop computer monitor beaming out a confident
> answer, a big cosmic **spiral/swirl** bursting off the screen with exclamation marks and fake-fact
> sparkles — the machine is sure of itself and completely wrong. Comic **banner** across the top:
> **HALLUCINATION**. A caption burst reads **"When AI says something confidently wrong and does not
> blush."** Star + swirl stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system as
> `jojo-card-back-v1.png`, text IN-generation, no text box. Top banner **HALLUCINATION**. One
> bold-bordered comic panel, verbatim, large legible lettering: **"A hallucination is when AI
> generates information that sounds authoritative but is completely made up—fake sources, invented
> stats, confident nonsense. Always verify claims that matter."** Small sticker: a spiral + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `hallucination-card-front-v1.png` — full prismatic
> holo across the whole surface (not streaks), Ben-Day dots sparkling, iridescent bursts; keep the
> **HALLUCINATION** banner and caption legible.

## 1.2 — FINE-TUNING  *(rare)*
Deliver → `assets/cards/concept-popart/fine-tuning-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a friendly
> pop-art robot in a **graduation cap** at a "SPECIALIZATION BOOTCAMP" chalkboard, a **target/bullseye**
> getting sharper — same brain, sharper focus. Comic **banner**: **FINE-TUNING**. Caption burst:
> **"Teaching AI new tricks after graduation."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **FINE-TUNING**. One bold-bordered panel, verbatim, large legible: **"Fine-tuning is
> additional training on specific examples after the model's main education is done. It is like
> sending a generalist to a specialization bootcamp—same brain, sharper focus."** Sticker: a target +
> a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `fine-tuning-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **FINE-TUNING** banner + caption legible.

## 1.3 — AGENT  *(rare)*
Deliver → `assets/cards/concept-popart/agent-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a busy pop-art
> robot that DOES things — juggling a ringing phone, a sent envelope and a calendar, motion lines all
> around — not just a talking head. Comic **banner**: **AGENT**. Caption burst: **"AI that can
> actually do things, not just talk."** Lightning + star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **AGENT**. One bold panel, verbatim, large legible: **"An AI agent can take actions—browse
> the web, run code, send emails—not just generate text. Think of the difference between someone who
> gives advice and someone who also books the appointment."** Sticker: an envelope + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `agent-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **AGENT** banner + caption legible.

## 1.4 — SYSTEM PROMPT  *(common)*
Deliver → `assets/cards/concept-popart/system-prompt-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> theater **stage with a curtain** pulled aside to reveal a **backstage instruction card / clipboard**
> of hidden rules, a spotlight beam. Comic **banner**: **SYSTEM PROMPT**. Caption burst: **"The secret
> backstage instructions AI follows."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **SYSTEM PROMPT**. One bold panel, verbatim, large legible: **"A system prompt is a
> hidden instruction set that defines AI's personality, rules, and behavior before you even type.
> It's why ChatGPT acts different from Claude—different backstage notes, same stage."** Sticker: a
> clipboard + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `system-prompt-card-front-v1.png` — full prismatic
> holo, Ben-Day dots sparkling, iridescent bursts; keep **SYSTEM PROMPT** banner + caption legible.

## 1.5 — GUARDRAILS  *(common)*
Deliver → `assets/cards/concept-popart/guardrails-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> **velvet-rope club entrance** (and/or a bowling lane with bumpers) keeping an AI "ball" in its lane
> — the safety bumpers. Comic **banner**: **GUARDRAILS**. Caption burst: **"The safety bumpers that
> keep AI in its lane."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **GUARDRAILS**. One bold panel, verbatim, large legible: **"Guardrails are rules and
> filters that prevent AI from generating harmful, biased, or off-limits content. Think of them as
> the velvet ropes at a club—they define where AI can and cannot go."** Sticker: a velvet rope + a
> star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `guardrails-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **GUARDRAILS** banner + caption legible.

## 1.6 — MULTIMODAL  *(common)*
Deliver → `assets/cards/concept-popart/multimodal-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a central
> glowing pop-art AI orb with an **eye**, a **soundwave**, and a **text bubble** all flowing into it
> — it can see, hear and read. Comic **banner**: **MULTIMODAL**. Caption burst: **"AI that can see,
> hear, and read—not just text."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **MULTIMODAL**. One bold panel, verbatim, large legible: **"Multimodal AI can process
> multiple types of input—text, images, audio, video. It's the difference between texting someone and
> FaceTiming them. More input types means richer understanding."** Sticker: an eye + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `multimodal-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **MULTIMODAL** banner + caption legible.

## 1.7 — INFERENCE  *(common)*
Deliver → `assets/cards/concept-popart/inference-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> finger hitting a glowing **SEND**, a big **lightning bolt** firing, and an answer bubble popping out
> — the moment the model produces an answer. Comic **banner**: **INFERENCE**. Caption burst: **"The
> moment AI actually produces an answer."** Lightning + star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **INFERENCE**. One bold panel, verbatim, large legible: **"Inference is when a trained
> AI model processes your input and generates output. Training is learning; inference is performing.
> Every time you hit send on a prompt, you're triggering inference."** Sticker: a lightning bolt + a
> star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `inference-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **INFERENCE** banner + caption legible.

---

# EPISODE 2 — 5-pack+ (8 cards)

## 2.1 — PROMPT ENGINEERING  *(common)*
Deliver → `assets/cards/concept-popart/prompt-engineering-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> woman handing a crisp, clearly-written **brief on a clipboard** to a literal little **intern-robot**
> — a great instruction glowing. Comic **banner**: **PROMPT ENGINEERING**. Caption burst: **"The art
> of asking so well that AI actually delivers."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation,
> LARGE lettering, panel fills most of the card (long copy). Top banner **PROMPT ENGINEERING**. One
> bold panel, verbatim: **"Prompt engineering is writing clear, specific instructions so AI gives you
> useful output instead of generic fluff. Think of it as delegating to a very literal intern—the
> better your brief, the better the result."** Sticker: a pencil + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `prompt-engineering-card-front-v1.png` — full
> prismatic holo, Ben-Day dots sparkling, iridescent bursts; keep **PROMPT ENGINEERING** banner +
> caption legible.

## 2.2 — TOKEN  *(common)*
Deliver → `assets/cards/concept-popart/token-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> conveyor slicing a long word into chunky **puzzle-piece tiles** ("un · be · liev · able") — the
> word-chunks AI reads. Comic **banner**: **TOKEN**. Caption burst: **"The tiny word-chunk AI
> actually reads."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **TOKEN**. One bold panel, verbatim, large legible: **"AI does not read words like you
> do. It breaks text into tokens—fragments of words, sometimes whole words, sometimes pieces.
> \"Unbelievable\" might be three tokens. This matters because every AI has a token limit."** Sticker:
> a puzzle tile + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `token-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **TOKEN** banner + caption legible.

## 2.3 — CONTEXT WINDOW  *(common)*
Deliver → `assets/cards/concept-popart/context-window-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art AI
> "head" holding a scroll of text inside a **window frame**; the text spills past the edge and the
> earliest words fade out — a meeting that ran too long. Comic **banner**: **CONTEXT WINDOW**. Caption
> burst: **"How much AI can hold in its head at once."** Star stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **CONTEXT WINDOW**. One bold panel, verbatim, large legible: **"The context window is
> the maximum amount of text (measured in tokens) an AI can consider in one conversation. Go past it
> and the AI starts forgetting the beginning—like a meeting that ran too long."** Sticker: a window +
> a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `context-window-card-front-v1.png` — full prismatic
> holo, Ben-Day dots sparkling, iridescent bursts; keep **CONTEXT WINDOW** banner + caption legible.

## 2.4 — TEMPERATURE  *(common)*
Deliver → `assets/cards/concept-popart/temperature-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a big pop-art
> **creativity DIAL / thermostat gauge** sweeping from cool **teal "SAFE"** to hot **coral "SPICY"**,
> needle mid-swing. Comic **banner**: **TEMPERATURE**. Caption burst: **"The creativity dial—low is
> safe, high is spicy."** Star + spark stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **TEMPERATURE**. One bold panel, verbatim, large legible: **"Temperature controls how
> creative or random AI's responses are. Low temperature (0) gives predictable, safe answers. High
> temperature (1+) gets more adventurous and surprising—sometimes too surprising."** Sticker: a dial +
> a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `temperature-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **TEMPERATURE** banner + caption legible.

## 2.5 — RAG  *(rare)*
Deliver → `assets/cards/concept-popart/rag-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> robot flipping open a **reference book / file** and checking its notes BEFORE speaking — "look it up
> first." Comic **banner**: **RAG**. Caption burst: **"Retrieval-Augmented Generation. Fancy name for
> “look it up first.”"** Star + book stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **RAG**. One bold panel, verbatim, large legible: **"RAG is a technique where AI
> searches a knowledge base before answering, so it can cite real documents instead of guessing. It's
> like giving AI permission to check its notes before speaking."** Sticker: an open book + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `rag-card-front-v1.png` — full prismatic holo, Ben-Day
> dots sparkling, iridescent bursts; keep **RAG** banner + caption legible.

## 2.6 — EMBEDDING  *(rare)*
Deliver → `assets/cards/concept-popart/embedding-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> **candy star-map**: words turning into number-coordinates as glowing points, "HAPPY" and "JOYFUL"
> sitting as neighbors, a magnet pulling similar meanings together. Comic **banner**: **EMBEDDING**.
> Caption burst: **"Turning words into math so AI can measure meaning."** Star stickers. Nothing
> postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation,
> LARGE lettering, panel fills most of the card (long copy). Top banner **EMBEDDING**. One bold panel,
> verbatim: **"An embedding converts text into a list of numbers that captures its meaning. Similar
> ideas end up close together in number-space. It's how AI knows \"happy\" and \"joyful\" are
> neighbors even though the letters are different."** Sticker: a magnet + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `embedding-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **EMBEDDING** banner + caption legible.

## 2.7 — CHAIN OF THOUGHT — RETIRED; DO NOT GENERATE
The former card incorrectly claimed that asking for visible steps forces a model to reason. No current
trading-card consumer uses this concept and no replacement card is authorized. Preserve Episode 02's
separate prompting correction route; do not regenerate the former front, back or foil assets.

## 2.8 — FEW-SHOT LEARNING  *(common)*
Deliver → `assets/cards/concept-popart/few-shot-learning-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: three pop-art
> **example cards pinned up** with a bold arrow pointing to the real output — "show it a few examples
> and it catches on" (a salon "photo of the hairstyle" gag works). Comic **banner**: **FEW-SHOT
> LEARNING**. Caption burst: **"Give AI a few examples and watch it catch on."** Star stickers.
> Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **FEW-SHOT LEARNING**. One bold panel, verbatim, large legible: **"Few-shot learning
> means showing AI 2–3 examples of what you want before asking for the real output. It's like showing
> someone a photo of the hairstyle instead of just saying \"make it cute.\""** Sticker: three little
> cards + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `few-shot-learning-card-front-v1.png` — full prismatic
> holo, Ben-Day dots sparkling, iridescent bursts; keep **FEW-SHOT LEARNING** banner + caption
> legible.

---

# EPISODE 3 — 5-pack (5 cards)

## 3.1 — RECEIPTS CHECK  *(common)*
Deliver → `assets/cards/concept-popart/receipts-check-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art hand
> holding up a long curling **paper receipt / till roll** to the light, the line-items reading
> "SOURCE · DATE · QUOTE · NUMBER" — check it before you trust it. Comic **banner**: **RECEIPTS
> CHECK**. Caption burst: **"Open the source before the answer borrows your name."** Star stickers.
> Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation,
> LARGE lettering, panel fills most of the card (long copy). Top banner **RECEIPTS CHECK**. One bold
> panel, verbatim: **"A receipt is the thing that can actually support a claim: source, date, quote,
> number, policy, person, meeting note, or domain rule. Confidence is not a receipt. Same answer
> thrice is still not a solid alibi."** Sticker: a receipt + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `receipts-check-card-front-v1.png` — full prismatic
> holo, Ben-Day dots sparkling, iridescent bursts; keep **RECEIPTS CHECK** banner + caption legible.

## 3.2 — BURN BOOK SOURCING  *(rare)*
Deliver → `assets/cards/concept-popart/burn-book-sourcing-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a generic
> pop-art pink **gossip notebook** flung open, one tiny clue ballooning through a big arrow into an
> ENORMOUS conclusion — one data point promoted to a whole verdict. **⛔ No real-person likeness** — a
> generic candy-pop notebook, lipstick-kiss sticker only. Comic **banner**: **BURN BOOK SOURCING**.
> Caption burst: **"One clue, no context, enormous conclusion."** Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation,
> LARGE lettering, panel fills most of the card (long copy). Top banner **BURN BOOK SOURCING**. One
> bold panel, verbatim: **"Bad sourcing is when one data point gets promoted into a whole character
> verdict. The Burn Book problem is not just false claims; it is confident claims with trash evidence
> and social authority."** Sticker: a lipstick kiss + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `burn-book-sourcing-card-front-v1.png` — full
> prismatic holo, Ben-Day dots sparkling, iridescent bursts; keep **BURN BOOK SOURCING** banner +
> caption legible.

## 3.3 — CHUTNEY DETAIL  *(holo)*
Deliver → `assets/cards/concept-popart/chutney-detail-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> **magnifying glass** zooming on ONE small mismatched detail while the rest of a too-smooth story
> visibly cracks around it — the tiny thing that collapses the whole alibi. Comic **banner**: **CHUTNEY
> DETAIL**. Caption burst: **"The ordinary detail that makes the whole story collapse."** Star
> stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **CHUTNEY DETAIL**. One bold panel, verbatim, large legible: **"A Chutney detail is the
> tiny timeline, source, policy, quote, or domain-rule mismatch that exposes a confident answer. It is
> the fresh perm in the shower alibi."** Sticker: a magnifying glass + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `chutney-detail-card-front-v1.png` — full prismatic
> holo, Ben-Day dots sparkling, iridescent bursts; keep **CHUTNEY DETAIL** banner + caption legible.
> (This one is a "holo" rarity in the data — the foil edition is its signature look.)

## 3.4 — GROUNDING  *(common)*
Deliver → `assets/cards/concept-popart/grounding-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> **document pinned into the conversation with a big pushpin / anchor** — bringing the real source
> into the room. Comic **banner**: **GROUNDING**. Caption burst: **"Bring the source into the room."**
> Star + pushpin stickers. Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **GROUNDING**. One bold panel, verbatim, large legible: **"Grounding means giving AI
> access to the material it should use: a document, approved source, search/grounding tool, database,
> or transcript. It lowers the odds of nonsense; it does not eliminate the need to check."** Sticker:
> a pushpin + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `grounding-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **GROUNDING** banner + caption legible.

## 3.5 — ELLE PROMPT  *(common)*
Deliver → `assets/cards/concept-popart/elle-prompt-card-{front,back,front-foil}-v1.png`
### FRONT
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **candy** color (pink #e982ab,
> teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, burst frame. SCENE: a pop-art
> paragraph put **"on the witness stand"** and cross-examined, its claims / assumptions / receipts
> sorted into a labeled **receipt tray** — a courtroom/legal nod. **⛔ No real-person likeness** (an
> Elle Woods nod in vibe only — a generic pink-suited pop-art figure or just the stand + tray). Comic
> **banner**: **ELLE PROMPT**. Caption burst: **"Put the paragraph on the stand before you use it."**
> Nothing postdates 1999.
### BACK
> Pop-art comic **card back**, 1200 × 1680, white border — SAME candy system, text IN-generation.
> Top banner **ELLE PROMPT**. One bold panel, verbatim, large legible: **"The Elle Prompt asks AI to
> separate draft language, claims, assumptions, fragile details, and receipts. It turns one smooth
> paragraph into a receipt tray you can verify."** Sticker: a briefcase + a star.
### FOIL
> Apply the SHARED FOIL RECIPE to the finished `elle-prompt-card-front-v1.png` — full prismatic holo,
> Ben-Day dots sparkling, iridescent bursts; keep **ELLE PROMPT** banner + caption legible.

---

## QC before Ali sees any card (run `operations/tools/qc-frames.py`, then eyes)
- 1200 × 1680, white border, rounded corners; all three files present per concept (front / back /
  front-foil), named by the card's `id`?
- Halftone + bold outline + flat CANDY color (pink/teal/coral/periwinkle) — NOT primary
  red/blue/yellow, NOT plum/gold, NOT the retired photographic concept cards?
- **Back copy is VERBATIM from `allCards` and every word is legible** (this is the risk — the backs
  run longer than the character cards). "AI" both capitals; brand terms spelled right.
- Scene reads as the concept; no real-person likeness (Burn Book / Elle stay generic); nothing
  post-1999?
- FOIL: full prismatic holo across the whole surface (like `jojo-card-front-foil-v2.png`), NOT
  streaks; scene + all lettering still clean.

## ⚠ FLAG FOR ALI — long backs may hit the in-gen legibility limit
The character-card backs that Codex nailed were ~30 words. Several concept backs are longer (~34–37):
**Prompt Engineering, Embedding, RAG, Receipts Check, Burn Book Sourcing, Chain of Thought,
Multimodal, Guardrails, System Prompt.** The prompts tell Codex to enlarge the panel rather than
reword — but if these garble at render, the fallback is **code-rendered back text** (the same
front-in-gen / back-in-code split JoJo's test was checking), not a rewrite. Confirm the approach if a
back comes back unreadable.
