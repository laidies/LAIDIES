# Codex Brief — Episode 04 Concept Card Pack · "The Founding Mothers" (5 cards)

> **SCOPE — IMAGES ONLY.** Generate PNG card images to the paths named below. Do **not** edit any
> repo file, JSON, HTML, or run git. Wiring into `card-packs.json` (title + takeaway + try-it text)
> is done by Claude after delivery. Your entire job is the 5 card images.

> **Read `concept-cards-episode-scene-batch.md` first** — same register, same banned list, same
> output spec. This brief extends that deck with the Episode 04 pack. Everything in its
> "photographic, art-directed Y2K editorial" section applies, with ONE twist below.

## The Episode 04 twist: period scenes, same photoshoot

Episode 04 is a flashback episode — the history of AI told through the women who built it, from
1843 to 2012. So each card is staged **in its own era**, not in Y2K. Everything else about the
register holds: photographic/photoreal, cinematic, eye-level or 3/4 tabletop, shallow depth of
field, warm moody lamp-glow lighting, dense with REAL period artifacts, **hand-lettered signage
carrying the mnemonic (≤4 words per label)**. It should feel like one photographer time-travelled
with the same lenses and taste. NO people's faces (props, hands at most, never a recognizable
face — the women themselves live in the LUMINAiRY portraits, not on concept cards).

**Still banned:** halos, tarot/baroque gold frames, garlands, devotional skies, illustration/vector
rendering, overhead flat-lays, floating objects, glitter borders.

## Output spec (identical to the main deck)

- PNG · 4:5 portrait · 1024 × 1280 · full-bleed photographic scene, thin cream keyline OK.
- Deliver to `assets/cards/concept/` with the EXACT filenames below.
- Render one card per prompt.

---

## THE 5 CARDS

### 1 · `ep04-algorithm.png` — The Algorithm (Ada, 1843)
A candlelit 1840s London writing desk, shot 3/4, shallow focus. Hero upper-center: an open
leather notebook with a handwritten step-by-step table of instructions (neat rows, numbered
steps — Ada's Note G energy), a quill resting on it. Supporting: brass gears and a fragment of a
mechanical calculating engine at the edge of frame, ink pot, sealing wax, a small hand-lettered
place card propped against the inkwell reading **"NUMBERS ARE ONLY THE BEGINNING."** Warm candle
glow on dark wood. The mnemonic: instructions written down precisely = the first algorithm.

### 2 · `ep04-the-signal.png` — The Signal (Hedy, 1942)
A 1940s Hollywood dressing-room vanity, shot eye-level, bulb-lit mirror glowing warm. Hero
upper-center: a hand-drawn frequency-hopping diagram on studio letterhead — a zigzag line leaping
between numbered channels — next to a strip of player-piano roll (the Antheil detail). Supporting:
a lipstick, a film-call sheet, a small radio set with its dial glowing. A hand-lettered note tucked
into the mirror frame reads **"CAN'T JAM WHAT HOPS."** The mnemonic: the signal that keeps moving
can't be caught.

### 3 · `ep04-the-compiler.png` — The Compiler (Grace, 1952)
A 1950s Navy office desk beside a room-sized computer cabinet with blinking panel lights, 3/4
tabletop angle. Hero upper-center: an open logbook. On its left page, a punched-card stack and a
line of raw machine code; on the right, plain handwriting: "SORT THE LIST." Between them, a
rubber date-stamp bridging the two pages. Taped into the logbook corner: a small moth under
yellowed tape with the handwritten caption **"FIRST ACTUAL BUG."** Desk nameplate reads
**"WHY SPEAK MACHINE?"** The mnemonic: the translator between our words and its code.

### 4 · `ep04-ai-winter.png` — The AI Winter (1956 → the freeze)
A shuttered 1970s university lab office, cold blue-grey light through frosted glass, one desk
lamp still on (the work didn't stop). Hero upper-center: a typed conference proposal titled
"ARTIFICIAL INTELLIGENCE — SUMMER PROJECT" gathering dust, with a red-stamped memo across it:
**"FUNDING FROZEN."** Supporting: an out-of-order mainframe under a dust sheet, a wall calendar
years out of date, one mug still steaming beside an open notebook in the lamplight. The
mnemonic: the promises froze; the quiet work continued.

### 5 · `ep04-training-data.png` — Training Data (Fei-Fei, 2012)
A 2000s Stanford grad-office desk at night, warm monitor glow, 3/4 angle. Hero upper-center:
towering stacks of printed photographs, each with a handwritten label tag ("CAT", "BRIDGE",
"CUPCAKE", "TAXI") — millions-of-examples energy. Supporting: a CRT-era monitor showing a grid of
thumbnails, sticky notes, a coffee-ringed printout. A hand-lettered sign leaning on the stack
reads **"SHOW IT THE WORLD."** The mnemonic: the brain was never the problem — it needed examples.

---

## After delivery (Claude's job, not Codex's)

Wire the 5 cards into `content/site/card-packs.json` as the `issue04` pack (title, one-line
takeaway, try-it prompt from the episode's Study Pack), and reconcile the issue-04.html footer
line that currently promises "Algorithm · Compiler · AI Winter" (3) with the shipped 5-card pack.
