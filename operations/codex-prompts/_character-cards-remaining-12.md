# CHARACTER CARDS — the remaining 12 keepers (pop-art)

Built to the **APPROVED JoJo card** (`assets/cards/characters/jojo-card-front-v1.png` /
`-back-v1.png` / `-front-foil-v2.png`). JoJo is the gold standard — match her look exactly, keeper
by keeper. This file covers the OTHER 12 keepers on the roster
(`operations/town-keeper-roster.md`).

## ⛔ SEND ONE KEEPER PER CODEX REQUEST — and one FACE per generation
Batching collapses the template. Do **not** paste multiple keepers (or all three faces) into one
request. For each keeper, run **three separate generations in order**: (1) FRONT, (2) BACK,
(3) FOIL — the foil references the finished front, so it goes last. Copy the single blockquote you
need into Codex, nothing else.

**Filename starts with `_`** so the episode-art hook (which bans halftone) does not fire — cards are
pop-art WITH halftone, a different locked style.

## LOOK at these before you render (do not work from text alone)
- APPROVED card: `assets/cards/characters/jojo-card-front-v1.png` (front),
  `jojo-card-back-v1.png` (back — info lives INSIDE the art, works great),
  `jojo-card-front-foil-v2.png` (the approved FULL-holo rare).
- Style refs: `operations/reference/trading-cards/tradingref-01.png` (person card),
  `tradingref-03.png` (word-burst + sticker templates), `tradingref-04.png` (burst frame),
  and that folder's `README.md`.

---

## SHARED STYLE — applies to every face of every card
- **Pop-art comic:** bold black outlines, **Ben-Day / dot-halftone shading**, flat vivid color.
- **Portrait 1200 × 1680**, rounded corners, **white outer border**.
- **Palette = LAiDIES CANDY** over black ink: **pink #e982ab · teal #57b6c0 · coral #ec7a78 ·
  periwinkle #b3abe7**. ⛔ NOT primary red/blue/yellow. ⛔ NOT plum/gold (retired).
- Comic **word-bursts** + sticker motifs from the refs — stars, lightning bolts, hearts, speech
  bubbles — as accents, not clutter (exactly the density on the JoJo card).
- **Lettering:** chunky italic comic banner name across the top; a small speech bubble near the
  figure. On backs, all copy rendered IN-generation inside comic panels / speech bubbles — keep it
  SHORT and the lettering LARGE (the JoJo back is the legibility bar). If a word can't render
  cleanly, make the panel bigger — never shrink or garble it.
- **"AI" is always both capitals.** Brand words keep their lowercase accented **i** even inside an
  all-caps banner: **LAiDIES · SUNNYVAiLE · LUMINAiRY · FAiRY · LAiDY · Mme CLAi-O · BRONZE AiGE ·
  MAiKEOVER · Delta LAi Nu · KSVL**.
- Complete, correctly-jointed body; correct hands. Nothing in frame postdates **1999**.
- ⛔ No baked-in foil/glitter on FRONT or BACK (those are the standard faces). The FOIL face is the
  ONE place holo is baked in.

## Face-reference rule (already resolved per keeper below)
Each section states the exact reference to use. Where it says **"pull her/him from the LIVE
<building> page render,"** that keeper has **no curation-approved portrait** — describe the figure
from the roster canon in the prompt and match the live building page; do **not** invent a new face
each render, and do **not** name any rejected `*-scene.png`. (Flagged for Ali at the bottom.)

---

# 1 — PAIGE · NewsStand

**Face ref (confirmed):** `assets/town-characters/comic/paige-comic-v1.png` — same woman.
**Role:** town reporter/journalist; runs the WEDNESDAY Edition + The Tribune; chases the local
story, asks the questions. **Teaching tie:** ask the questions · check your sources · get the real
story.

### FRONT → `assets/cards/characters/paige-card-front-v1.png`
> Pop-art comic **trading card**, portrait 1200 × 1680, rounded corners, white border — SAME system
> as the approved `assets/cards/characters/jojo-card-front-v1.png`: bold black outlines, Ben-Day
> halftone, flat vivid **LAiDIES candy** color (pink #e982ab, teal #57b6c0, coral #ec7a78,
> periwinkle #b3abe7) over black ink, inside a comic-burst frame.
>
> SUBJECT: **Paige**, the town reporter at the **NewsStand**, SUNNYVAiLE, 1999. Match her face,
> hair and outfit to `assets/town-characters/comic/paige-comic-v1.png` — same woman. She is
> mid-action: leaning over the newsstand counter holding up a fresh folded newspaper, pen tucked
> behind her ear, notepad in hand, caught mid-question. Racks of magazines and stacked papers
> behind her. Her face fills the top ~40% and reads at thumbnail size.
>
> Comic **banner across the top** in chunky italic lettering reads **PAIGE**. A small speech bubble
> near her reads **"SAYS WHO?"**. White comic stars as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/paige-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system as the front and the approved `jojo-card-back-v1.png`. Info rendered IN-generation, no
> pasted text box. All lettering clean and large:
> - **Top banner:** **PAIGE** — beneath it, smaller, **REPORTER · NEWSSTAND**.
> - **Bold-bordered comic panel** holds: **"Every story needs a source. Ask the question, check who
>   said it, and get the real thing — not the rumor."**
> - **Speech bubble** in a corner: **"GET IT IN WRITING."**
> - Sticker accents: a little newspaper/star, a halftone-dot burst.

### FOIL → `assets/cards/characters/paige-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished `assets/cards/characters/paige-card-front-v1.png`.
> Keep Paige, her pose, the **PAIGE** banner, the **"SAYS WHO?"** bubble and the candy palette
> EXACTLY — do not redraw her. Change ONLY the finish: the ENTIRE surface gets a prismatic
> holographic shimmer (rainbow light refracting across the whole image, NOT one or two streaks); the
> Ben-Day dots catch the rainbow and sparkle; the burst panels go iridescent; fine glints across
> art, banner and stars — like a premium 1990s holo card. Keep EVERY word legible; pull shimmer off
> any lettering it washes out. Must read as printed holo foil, not a flat CSS gradient.

---

# 2 — PENNY · Post Office

**Face ref (curation-correct 2026-07-22):** `assets/town-characters/scenes/penny-scene.png` — match
her face/hair/outfit (likeness ref; render in pop-art). **Role:** postmistress; runs the mail — gifts, postcards, "you've got mail," BEST
FRIENDS; Deb's warm successor at the counter. **Teaching tie:** connection — sending kindness and
collectibles across town. **Name:** classic 90s "Penny," warm and friendly.

### FRONT → `assets/cards/characters/penny-card-front-v1.png`
> Pop-art comic **trading card**, portrait 1200 × 1680, rounded corners, white border — SAME system
> as `assets/cards/characters/jojo-card-front-v1.png`: bold black outlines, Ben-Day halftone, flat
> **LAiDIES candy** color (pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black
> ink, comic-burst frame.
>
> SUBJECT: **Penny**, the warm postmistress at the **Post Office** on Civic Square, SUNNYVAiLE,
> 1999. She has no approved portrait yet — render her from canon and match the live Post Office
> page: a friendly, welcoming postmistress at the service counter. She is mid-action: sliding a
> string-tied brown-paper parcel and a postcard across the counter with a big warm smile, the little
> red "you've got mail" flag up beside her. Pigeonhole mail slots and a stamp rack behind her. Face
> fills the top ~40%, reads at thumbnail size.
>
> Comic **banner across the top** reads **PENNY**. A small speech bubble reads **"YOU'VE GOT MAIL!"**.
> Heart + star stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/penny-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system as the front and `jojo-card-back-v1.png`. Info rendered IN-generation, no text box:
> - **Top banner:** **PENNY** — beneath it, smaller, **POSTMISTRESS · POST OFFICE**.
> - **Bold-bordered comic panel:** **"Send a little something across town — a gift, a postcard, a
>   hello. Connection travels one delivery at a time."**
> - **Speech bubble:** **"BEST FRIENDS?"**
> - Sticker accents: a heart-sealed envelope, a postage-stamp star, halftone dots.

### FOIL → `assets/cards/characters/penny-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished `assets/cards/characters/penny-card-front-v1.png`.
> Keep Penny, her pose, the **PENNY** banner, the **"YOU'VE GOT MAIL!"** bubble and the candy
> palette EXACTLY. Change ONLY the finish: whole-surface prismatic holo shimmer (not streaks),
> Ben-Day dots catching rainbow, iridescent burst panels, fine glints everywhere — premium 1990s
> holo card. Keep EVERY word legible; pull shimmer off lettering it washes out. Printed holo foil,
> not a flat gradient.

---

# 3 — BECKY · Chick Flicks

**Face ref (curation-correct 2026-07-22):** `assets/town-characters/scenes/becky-scene.png` — match
her face/hair/outfit (likeness ref; render in pop-art). **Role:** video-store clerk; recommends the tape, "be kind, rewind." **Teaching tie:**
curation / recommendations — what's worth the watch.

### FRONT → `assets/cards/characters/becky-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Becky**, the video-store clerk at **Chick Flicks**, SUNNYVAiLE, 1999. No approved
> portrait yet — render her from canon and match the live Chick Flicks page: a friendly clerk in a
> 90s video rental store. She is mid-action: holding up one VHS tape over the counter like it's THE
> pick, wall of rental tapes and a "BE KIND, REWIND" shelf-tag behind her. Face fills top ~40%,
> reads at thumbnail.
>
> Comic **banner across the top** reads **BECKY**. A small speech bubble reads **"TRUST ME ON THIS
> ONE."**. Star stickers as accents. Nothing postdates 1999 (VHS-era store).

### BACK → `assets/cards/characters/becky-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **BECKY** — beneath it, smaller, **CLERK · CHICK FLICKS**.
> - **Bold-bordered comic panel:** **"A thousand tapes on the shelf and she hands you the right
>   one. A good pick beats every pick."**
> - **Speech bubble:** **"BE KIND, REWIND."**
> - Sticker accents: a little VHS tape, a star, halftone dots.

### FOIL → `assets/cards/characters/becky-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished `assets/cards/characters/becky-card-front-v1.png`.
> Keep Becky, her pose, the **BECKY** banner, the **"TRUST ME ON THIS ONE."** bubble and the candy
> palette EXACTLY. Change ONLY the finish: whole-surface prismatic holo (not streaks), Ben-Day dots
> catching rainbow, iridescent bursts, fine glints — premium 90s holo. Keep EVERY word legible.
> Printed holo foil, not a flat gradient.

---

# 4 — JUNE · Delta LAi Nu

**Face ref (curation-correct 2026-07-22):** `assets/town-characters/scenes/june-scene.png` — match
her face/hair/outfit (likeness ref; render in pop-art).
**⛔ JUNE IS AN ORIGINAL NATIVE — NOT a real actress and NOT literally Regina's mom.** Render the
Amy-Poehler "Cool Mom" *energy* (warm, chaotic-fun, a little too eager to be liked), never a
likeness. **Role:** the "Cool House Mom" of the sorority house. **Teaching tie:** digital
citizenship — be kind in shared/online spaces; she's chill about everything except unkindness.

### FRONT → `assets/cards/characters/june-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **June**, the "Cool House Mom" of **Delta LAi Nu**, SUNNYVAiLE, 1999. ORIGINAL character
> — do NOT base her on any real actress or on a film character; render the warm, fun, slightly-extra
> "cool mom" *energy* only. Render her from canon and match the live Delta LAi Nu house page. She is
> mid-action: in the sorority living room offering a tray of snacks with a big warm grin, cordless
> phone in the other hand, cozy house behind her. Face fills top ~40%, reads at thumbnail.
>
> Comic **banner across the top** reads **JUNE**. A small speech bubble reads **"WE ARE NOT MEAN IN
> THIS HOUSE."**. Heart stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/june-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **JUNE** — beneath it, smaller, **HOUSE MOM · Delta LAi Nu**.
> - **Bold-bordered comic panel:** **"Do whatever you want, honey — but we are NOT mean in this
>   house. Shared spaces run on kindness. That's the one rule."**
> - **Speech bubble:** **"I'M A COOL MOM."**
> - Sticker accents: a heart, a little snack tray, halftone dots.

### FOIL → `assets/cards/characters/june-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished `assets/cards/characters/june-card-front-v1.png`.
> Keep June, her pose, the **JUNE** banner, the **"WE ARE NOT MEAN IN THIS HOUSE."** bubble and the
> candy palette EXACTLY (still an original character, no likeness). Change ONLY the finish:
> whole-surface prismatic holo (not streaks), Ben-Day dots catching rainbow, iridescent bursts, fine
> glints — premium 90s holo. Keep EVERY word legible. Printed holo foil, not a flat gradient.

---

# 5 — COSMO · BRONZE AiGE

**Face ref (curation-correct 2026-07-22):** `assets/town-characters/scenes/cosmo-scene.png` — match
his face/hair/outfit (likeness ref; render in pop-art). **⛔ NEVER reference
`sam-scene.png` — "Sam" is a dead name; the keeper is Cosmo.**
**⛔ Cosmo is the FIRST MALE keeper: a gay man, POC (Black/Latino).** **Role:** the bartender at
BRONZE AiGE, No.7 MAiN; serves the Main Character Spritz. **Teaching tie:** the confidant — reads
the room, knows your usual (personalization + emotional read).

### FRONT → `assets/cards/characters/cosmo-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Cosmo**, the bartender at **BRONZE AiGE**, No.7 MAiN, SUNNYVAiLE, 1999 — a confident,
> warm **Black/Latino man**, the town's first male keeper. No approved portrait yet — render him
> from canon and match the live BRONZE AiGE page. He is mid-action: sliding a pink "Main Character
> Spritz" cocktail across the bar with a knowing look, back-bar bottles and warm club light behind
> him. Face fills top ~40%, reads at thumbnail. Correct hands.
>
> Comic **banner across the top** reads **COSMO**. A small speech bubble reads **"I KNOW JUST THE
> THING."**. Star stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/cosmo-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **COSMO** — beneath it, smaller, **BARTENDER · BRONZE AiGE**.
> - **Bold-bordered comic panel:** **"A good bartender reads the room before you order. Tell it who
>   you are and what you need — the right pour finds you."**
> - **Speech bubble:** **"ON THE HOUSE."**
> - Sticker accents: a cocktail glass, a star, halftone dots.

### FOIL → `assets/cards/characters/cosmo-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished `assets/cards/characters/cosmo-card-front-v1.png`.
> Keep Cosmo, his pose, the **COSMO** banner, the **"I KNOW JUST THE THING."** bubble and the candy
> palette EXACTLY. Change ONLY the finish: whole-surface prismatic holo (not streaks), Ben-Day dots
> catching rainbow, iridescent bursts, fine glints — premium 90s holo. Keep EVERY word legible.
> Printed holo foil, not a flat gradient.

---

# 6 — MATRON LUMEN · LUMINAiRY

**Face ref (curation-correct 2026-07-22):** `assets/town-characters/scenes/matron-lumen-scene.png` —
match her face/hair/outfit (likeness ref; render in pop-art). **⛔ NO HALO, no wings, not
clergy** — her title only *sounds* church-like; she is a warm lantern-keeper, not a saint.
**Role:** the lantern-keeper on Lantern Hill; tends the candles, guides you wing to wing (SAiNTS ·
MAiVENS · TRAiLBLAZERS). **Teaching tie:** keeper of the flame — the AI era was built by real women;
learn from who lit the way.

### FRONT → `assets/cards/characters/matron-lumen-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Matron Lumen**, the lantern-keeper of the **LUMINAiRY** on Lantern Hill, SUNNYVAiLE,
> 1999. **NO halo, no wings, not a nun** — a warm, dignified keeper. No approved portrait yet —
> render her from canon and match the live LUMINAiRY page. She is mid-action: holding up a glowing
> lantern to light a rack of candles, three arched wing-doors softly lit behind her (SAiNTS ·
> MAiVENS · TRAiLBLAZERS). Warm candle-glow in candy tones. Face fills top ~40%, reads at thumbnail.
>
> Comic **banner across the top** reads **MATRON LUMEN**. A small speech bubble reads **"IT WAS
> WOMEN ALL ALONG."**. Star stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/matron-lumen-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box. **No halo.**
> - **Top banner:** **MATRON LUMEN** — beneath it, smaller, **LANTERN-KEEPER · LUMINAiRY**.
> - **Bold-bordered comic panel:** **"The AI era was lit by real women — the saints, the mavens, the
>   trailblazers. She keeps the flame. Learn from who lit the way."**
> - **Speech bubble:** **"FOLLOW THE LIGHT."**
> - Sticker accents: a lantern, a star, halftone dots.

### FOIL → `assets/cards/characters/matron-lumen-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/matron-lumen-card-front-v1.png`. Keep Matron Lumen (NO halo), her pose,
> the **MATRON LUMEN** banner, the **"IT WAS WOMEN ALL ALONG."** bubble and the candy palette
> EXACTLY. Change ONLY the finish: whole-surface prismatic holo (not streaks), Ben-Day dots catching
> rainbow, iridescent bursts, fine glints — premium 90s holo. The lantern-glow reads as holo
> sparkle, NOT as a halo. Keep EVERY word legible. Printed holo foil, not a flat gradient.

---

# 7 — PAULETTE · MAiKEOVER

**Face ref (confirmed):** `assets/town-characters/comic/paulette-comic-v1.png` — same woman.
**⛔ Evoke Jennifer-Coolidge / Paulette-Bonafonté *energy*, NOT a photo-exact likeness** — she is a
resident cameo, not a saint, not a native. Match her comic ref first. **Role:** the beautician;
helps you find your look + build your Resident Card. **Teaching tie:** make it yours /
personalization + the "bend & snap" glow-up confidence.

### FRONT → `assets/cards/characters/paulette-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Paulette**, the beautician at **MAiKEOVER on MAiN**, SUNNYVAiLE, 1999. Match her face,
> hair and outfit to `assets/town-characters/comic/paulette-comic-v1.png` — same woman (Coolidge
> *energy*, not a likeness). She is mid-action: at the styling chair holding up a hand mirror toward
> "you" with a bright, encouraging grin, salon station of brushes and product behind her. Face fills
> top ~40%, reads at thumbnail.
>
> Comic **banner across the top** reads **PAULETTE**. A small speech bubble reads **"LET'S MAKE IT
> YOURS."**. Heart + star stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/paulette-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **PAULETTE** — beneath it, smaller, **BEAUTICIAN · MAiKEOVER**.
> - **Bold-bordered comic panel:** **"The look isn't one-size — it's yours. Say what you like, tweak
>   till it fits. That's personalization."**
> - **Speech bubble:** **"BEND AND SNAP!"**
> - Sticker accents: a hand mirror, a heart, halftone dots.

### FOIL → `assets/cards/characters/paulette-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/paulette-card-front-v1.png`. Keep Paulette, her pose, the **PAULETTE**
> banner, the **"LET'S MAKE IT YOURS."** bubble and the candy palette EXACTLY (Coolidge energy, not
> a likeness). Change ONLY the finish: whole-surface prismatic holo (not streaks), Ben-Day dots
> catching rainbow, iridescent bursts, fine glints — premium 90s holo. Keep EVERY word legible.
> Printed holo foil, not a flat gradient.

---

# 8 — MISS JEEVES · LIBRAiRY

**Face ref (NEW, from the opening credits — 2026-07-22):** `queue/refs/miss-jeeves-reference-from-credits.png`
— match HER face/hair/features from this (it's a likeness ref; render her in pop-art). The old
`jeeves-scene`/`jeeves-desk` are superseded — do NOT use them. **⛔ POC.** **Role:**
reference-desk librarian. **Teaching tie:** look it up — the technical reference desk (don't guess,
find the real source).

### FRONT → `assets/cards/characters/miss-jeeves-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Miss Jeeves**, the reference-desk librarian at the **LIBRAiRY**, SUNNYVAiLE, 1999 — a
> warm, sharp **POC** librarian. No approved portrait yet — render her from canon and match the live
> LIBRAiRY page. She is mid-action: at the reference desk, open book in one hand, the other pointing
> toward the metal stacks with a helpful look; card catalog and shelves behind her. Face fills top
> ~40%, reads at thumbnail.
>
> Comic **banner across the top** reads **MISS JEEVES**. A small speech bubble reads **"LET'S LOOK
> IT UP."**. Star stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/miss-jeeves-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **MISS JEEVES** — beneath it, smaller, **LIBRARIAN · LIBRAiRY**.
> - **Bold-bordered comic panel:** **"Don't guess — look it up. She'll point you to the exact shelf.
>   When you need the real reference, ask at the desk."**
> - **Speech bubble:** **"IT'S IN THE STACKS."**
> - Sticker accents: an open book, a star, halftone dots.

### FOIL → `assets/cards/characters/miss-jeeves-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/miss-jeeves-card-front-v1.png`. Keep Miss Jeeves, her pose, the **MISS
> JEEVES** banner, the **"LET'S LOOK IT UP."** bubble and the candy palette EXACTLY. Change ONLY the
> finish: whole-surface prismatic holo (not streaks), Ben-Day dots catching rainbow, iridescent
> bursts, fine glints — premium 90s holo. Keep EVERY word legible. Printed holo foil, not a flat
> gradient.

---

# 9 — MAYOR DEB · Town Hall

**Face ref (confirmed):** `assets/town-characters/scenes/mayor-deb-scene.png` (curation "correct") —
same woman. **Role:** the corporate-cryptid Mayor of SUNNYVAiLE since 1999 ("Loop Me Out," the
"Deb-flection"). Keep her canon; do not invent a teaching claim she doesn't have.

### FRONT → `assets/cards/characters/mayor-deb-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Mayor Deb**, the corporate-power Mayor at **Town Hall**, SUNNYVAiLE, 1999. Match her
> face, hair and look to `assets/town-characters/scenes/mayor-deb-scene.png` — same woman. She is
> mid-action: leaning across the mayor's desk in a bold power-blazer, one hand up in a "let's circle
> back" gesture, a **MAYOR** nameplate and civic seal behind her. Face fills top ~40%, reads at
> thumbnail.
>
> Comic **banner across the top** reads **MAYOR DEB**. A small speech bubble reads **"LOOP ME
> OUT."**. Star stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/mayor-deb-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **MAYOR DEB** — beneath it, smaller, **MAYOR · TOWN HALL**.
> - **Bold-bordered comic panel:** **"Mayor of SUNNYVAiLE since 1999. Runs the town on synergy,
>   circle-backs, and the famous Deb-flection."**
> - **Speech bubble:** **"LET'S TAKE THIS OFFLINE."**
> - Sticker accents: a civic star, a tiny gavel, halftone dots.

### FOIL → `assets/cards/characters/mayor-deb-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/mayor-deb-card-front-v1.png`. Keep Mayor Deb, her pose, the **MAYOR DEB**
> banner, the **"LOOP ME OUT."** bubble and the candy palette EXACTLY. Change ONLY the finish:
> whole-surface prismatic holo (not streaks), Ben-Day dots catching rainbow, iridescent bursts, fine
> glints — premium 90s holo. Keep EVERY word legible. Printed holo foil, not a flat gradient.

---

# 10 — Mme CLAi-O · No.6 MAiN

**Face ref (NEW, from the opening credits — 2026-07-22):** `assets/video/.safe-v8-native/eptrailer-39-opening-03-mme-claio-clean-face.png`
— blonde updo with a pearl bow, purple cat-eye glasses, purple robe, at her crystal-ball table.
Match HER face/hair/features (likeness ref; render in pop-art). The old madame-claio-* portraits are
superseded — do NOT use them. (old fallback removed:) do NOT name a rejected
file. **Keep the brand spelling Mme CLAi-O exactly.** **Role:** the psychic at No.6 MAiN; "you
already know." **Teaching tie:** the psychic — the answer was already yours; it just needed asking
out loud.

### FRONT → `assets/cards/characters/mme-claio-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **Mme CLAi-O**, the psychic of **No.6 MAiN**, SUNNYVAiLE, 1999. No approved portrait yet
> — render her from canon and match the live Mme CLAi-O's shop page: a glamorous fortune-teller in
> her reading room. She is mid-action: both hands hovering over a glowing crystal ball, a knowing
> half-smile, tarot cards fanned and velvet drapes behind her. Face fills top ~40%, reads at
> thumbnail.
>
> Comic **banner across the top** reads **Mme CLAi-O** (keep the accented **i**). A small speech
> bubble reads **"YOU ALREADY KNOW."**. Star + sparkle stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/mme-claio-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **Mme CLAi-O** (accented **i**) — beneath it, smaller, **THE PSYCHIC · No.6 MAiN**.
> - **Bold-bordered comic panel:** **"She gazes into the glass and tells you what you already knew.
>   The answer was yours — it just needed asking out loud."**
> - **Speech bubble:** **"I SEE IT ALL."**
> - Sticker accents: a crystal ball, a sparkle-star, halftone dots.

### FOIL → `assets/cards/characters/mme-claio-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/mme-claio-card-front-v1.png`. Keep Mme CLAi-O, her pose, the **Mme
> CLAi-O** banner, the **"YOU ALREADY KNOW."** bubble and the candy palette EXACTLY. Change ONLY the
> finish: whole-surface prismatic holo (not streaks), Ben-Day dots catching rainbow, iridescent
> bursts, fine glints — premium 90s holo; the crystal ball reads as extra-sparkly holo. Keep EVERY
> word legible. Printed holo foil, not a flat gradient.

---

# 11 — DJ SUNNYV · KSVL 99.9 FM

**Face ref (confirmed):** `assets/town-characters/scenes/dj-sunnyv-scene.png` (curation "correct") —
same person. **⛔ She DJs, she never sings** — render her on the decks/headphones, never singing
into a mic. **Role:** the DJ at KSVL, 99.9 FM; plays the town's bands. **Teaching tie:** the KSVL
motto — "learn from the hooks."

### FRONT → `assets/cards/characters/dj-sunnyv-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **DJ SunnyV**, the DJ at **KSVL 99.9 FM**, SUNNYVAiLE, 1999. Match her face, hair and
> look to `assets/town-characters/scenes/dj-sunnyv-scene.png` — same person. She is mid-action: at
> the radio decks in big headphones, one hand on a spinning record, glowing **ON AIR** light and a
> "99.9 FM" board behind her. (She is DJing, NOT singing.) Face fills top ~40%, reads at thumbnail.
>
> Comic **banner across the top** reads **DJ SUNNYV**. A small speech bubble reads **"99.9 — ALL
> DAY."**. Star + lightning-bolt stickers as accents. Nothing postdates 1999.

### BACK → `assets/cards/characters/dj-sunnyv-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **DJ SUNNYV** — beneath it, smaller, **DJ · KSVL 99.9 FM**.
> - **Bold-bordered comic panel:** **"She spins the town's bands all day and never sings a note. The
>   lesson's in the hook — catch it and it sticks."**
> - **Speech bubble:** **"LEARN FROM THE HOOKS."**
> - Sticker accents: a vinyl record, a lightning bolt, halftone dots.

### FOIL → `assets/cards/characters/dj-sunnyv-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/dj-sunnyv-card-front-v1.png`. Keep DJ SunnyV, her pose (DJing, not
> singing), the **DJ SUNNYV** banner, the **"99.9 — ALL DAY."** bubble and the candy palette
> EXACTLY. Change ONLY the finish: whole-surface prismatic holo (not streaks), Ben-Day dots catching
> rainbow, iridescent bursts, fine glints — premium 90s holo; the spinning record reads as
> holo-sparkle. Keep EVERY word legible. Printed holo foil, not a flat gradient.

---

# 12 — FAiRY GODMOTHER · Ask LAiDY · Willow Ln

**Face ref (NEW, from the opening credits — 2026-07-22):** `assets/video/delivery-20260714-opening-v6/shots/opening-08-fairy-godmother-clean-lit-group-face-v3.png`
— a woman of color, grey curly updo with gold stars, purple robe over a mauve dress, star necklace,
wand. Match HER face/hair/features (likeness ref; render in pop-art). The old fairy-godmother-scene /
portraits are superseded — do NOT use them. (old fallback removed:) do NOT name a
rejected file. **⛔ POC.** **Keep brand spellings FAiRY and LAiDY with the lowercase accented i.**
**Role:** grants wishes / glows up your prompts (Ask LAiDY). **Teaching tie:** say what you really
want and she makes it shine — three wishes a visit.

### FRONT → `assets/cards/characters/fairy-godmother-card-front-v1.png`
> Pop-art comic **trading card**, 1200 × 1680, rounded corners, white border — SAME system as
> `jojo-card-front-v1.png`: bold outlines, Ben-Day halftone, flat **LAiDIES candy** color (pink
> #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7) over black ink, comic-burst frame.
>
> SUBJECT: **FAiRY Godmother** (Ask LAiDY), in her cottage on Willow Ln, SUNNYVAiLE, 1999 — a warm
> **POC** fairy godmother. No approved portrait yet — render her from canon and match the live FAiRY
> Godmother's house page. She is mid-action: waving a sparkling wand, a trail of stars turning a
> plain slip of paper into a glowing one, cozy cottage behind her. Face fills top ~40%, reads at
> thumbnail.
>
> Comic **banner across the top** reads **FAiRY GODMOTHER** (keep the accented **i** in FAiRY). A
> small speech bubble reads **"LET'S GLOW IT UP."**. Star + sparkle stickers as accents. Nothing
> postdates 1999.

### BACK → `assets/cards/characters/fairy-godmother-card-back-v1.png`
> Pop-art comic **card back**, 1200 × 1680, rounded corners, white border — SAME candy pop-art
> system, IN-generation copy, no text box:
> - **Top banner:** **FAiRY GODMOTHER** (accented **i**) — beneath it, smaller, **ASK LAiDY · WILLOW
>   LN** (keep the accented **i** in LAiDY).
> - **Bold-bordered comic panel:** **"Bring her a wish — or a rough prompt — and she glows it up.
>   Say what you really want; she makes it shine. Three wishes a visit."**
> - **Speech bubble:** **"MAKE A WISH."**
> - Sticker accents: a sparkling wand, a star, halftone dots.

### FOIL → `assets/cards/characters/fairy-godmother-card-front-foil-v1.png`
> The FULL-HOLOGRAPHIC rare edition of the finished
> `assets/cards/characters/fairy-godmother-card-front-v1.png`. Keep the FAiRY Godmother, her pose,
> the **FAiRY GODMOTHER** banner, the **"LET'S GLOW IT UP."** bubble and the candy palette EXACTLY.
> Change ONLY the finish: whole-surface prismatic holo (not streaks), Ben-Day dots catching rainbow,
> iridescent bursts, fine glints — premium 90s holo; the wand-sparkle reads as holo shimmer. Keep
> EVERY word legible. Printed holo foil, not a flat gradient.

---

## QC before Ali sees any card (run `operations/tools/qc-frames.py`, then eyes)
- 1200 × 1680, white border, rounded corners; all three files present per keeper (front / back /
  front-foil)?
- Halftone + bold outline + flat CANDY color (pink/teal/coral/periwinkle) — NOT primary
  red/blue/yellow, NOT plum/gold, NOT painterly?
- Every word legible and correctly spelled on BOTH faces; brand words keep the accented **i**; "AI"
  both capitals?
- Keeper matches her/his stated reference; complete body; correct hands; nothing post-1999?
- ⛔ special notes held: June = original, not an actress/not Regina's mom; Paulette = Coolidge energy
  not a likeness; Cosmo = Black/Latino gay man, first male keeper, never "Sam"; Matron Lumen = NO
  halo; Mme CLAi-O / FAiRY / DJ SunnyV / LUMINAiRY brand spellings intact.
- FOIL: full prismatic holo across the whole surface (like `jojo-card-front-foil-v2.png`), NOT two
  streaks; figure and all lettering still clean.

## ⚠ FLAG FOR ALI — keepers WITHOUT a curation-approved face reference
These 8 have no confirmed portrait, so each prompt says "pull from the LIVE building page render."
Confirm the intended face before rendering, or point me at an approved reference:
- **Rejected refs (must not be used):** Miss Jeeves (jeeves-scene/desk = rejected), Mme CLAi-O
  (portraits/scene = rejected/unused), FAiRY Godmother (scene/portraits = rejected/unused).
- **Unreviewed scene files exist but NOT curation-approved:** Penny, Becky, June, Cosmo, Matron
  Lumen (`assets/town-characters/scenes/<name>-scene.png` exist but aren't marked "correct" — review
  and approve, or I keep them on the live-page-render fallback).
Confirmed refs, no action needed: Paige, Paulette (comic assets), Mayor Deb, DJ SunnyV (curation
"correct" scenes).
