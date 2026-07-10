# Codex brief — The 101 Shelf (LIBRAiRY textbook covers + shelf kit)

> **⚠️ SCOPE: IMAGES ONLY.** Codex generates the image files listed under *Output* and nothing else. **No file edits, no HTML, no CSS, no git, no JSON.** Wiring the assets into `library.html` is done by hand afterward. If a prompt seems to ask for anything but a picture, stop — that's a mistake in the brief.

## What this makes & why

`library.html` has a new section, **"The 101 shelf"** — seven numbered reference *textbooks* (not courses) that moved to the LIBRAiRY from SUNNYVAiLE High. Right now each one is a plain card with an emoji. Ali wants them to **look like real textbooks sitting on a real library shelf.**

Two asset types:

1. **7 textbook covers** — one per 101. A matched *series* (same frame, same imprint, same gold "101" treatment; only the subject color + subject motif + title change), so the seven read as one publisher's shelf. 3/4 view (cover + a sliver of spine) on a transparent background, identical scale + lighting, so they line up like books standing on a shelf.
2. **1 shelf kit** — a warm oak library shelf with a brass "101" nameplate, transparent above the shelf surface, that the seven covers stand on. (Same idea as the existing `chick-flicks-shelf-kit.png` — an empty shelf the HTML lays cards onto.)

*Wiring note for later (NOT for Codex):* the covers replace the emoji glyphs; the shelf kit sits behind the row. Final call between "covers on a CSS shelf" vs "one wide shelf backdrop" is Ali's — these assets support either.

## Reference images (use these exact paths — do not let the model pick its own)

- **Book-cover register / Y2K-honest bookcraft:** `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`
- **Library wood, warmth, shelving atmosphere:** `assets/building-interiors/library-reading-room.jpg`
- **Shelf-kit construction precedent (for the shelf only):** `assets/sunnyvaile-interiors/chick-flicks-shelf-kit.png`

## Shared art direction (applies to every prompt below)

- **Register: Y2K-honest, 1999 school textbook.** Cloth/board hardcover, embossed + gold-foil title, a little library wear — a date-due pocket vibe, a faint spine crease, an old catalog sticker. **NOT** glossy modern paperback, **NOT** fairytale/baroque, **NOT** neon. Think the reference books that sat in a real 1999 school library.
- **Palette:** brand plum `#4b2148` and rose `#9b3f5f` (never neon), unified by **warm brass/antique gold** foil on every cover (the title + the "101" numeral are gold-foil on all seven — that's the series glue). Each book gets its own muted cloth color from the list below.
- **Type:** the subject word + "101" set in a chunky, confident textbook face (a friendly slab or bold grotesque), gold-foil, cleanly legible. Keep the rendered text to the **exact short strings given** — image models lose accuracy with long text, so nothing extra on the cover.
- **Consistency is the whole job:** all seven covers must share identical proportions, camera angle (gentle 3/4), lighting (soft warm library light from upper left), frame layout, imprint bar, and gold treatment. Only color + motif + title differ. Generate them as a set.
- **Ai casing:** the only place brand "Ai" letters appear is the tiny bottom imprint **"SUNNYVAiLE HIGH"** — render the `Ai` a touch of gold if legible at that size; if too small to control, plain is fine. Titles themselves contain no "Ai."

## The series template (every cover follows this)

A standing hardcover textbook, gentle 3/4 view showing the full cover and a sliver of the spine, on a **transparent background**, soft warm library light from the upper left, subtle real-book thickness and shadow.

Cover layout, top to bottom:
- a small **subject-motif illustration** in an inset window/panel (etched/screenprinted, one or two ink colors, Y2K schoolbook style — not photographic);
- the **subject word** in big gold-foil textbook type;
- a large gold-foil **"101"** course numeral;
- a thin bottom **imprint bar** reading **SUNNYVAiLE HIGH**.
The spine repeats the subject word + "101" running vertically in gold.

---

## The seven books

| # | Cover text (exact) | Cloth color | Subject motif in the window |
|---|---|---|---|
| 1 | `CHATGPT` · `101` | sage green | an open doorway spilling light; a friendly blinking text-cursor |
| 2 | `VOCAB` · `101` | dusty cornflower blue | an open dictionary + magnifying glass, alphabet thumb-tabs |
| 3 | `CONCEPTS` · `101` | burnt terracotta | a cutaway "thinking machine": gears feeding a lightbulb |
| 4 | `BRIEFING` · `101` | deep plum `#4b2148` | a clipboard memo handed off, a manila brief with a checklist |
| 5 | `TOOLS` · `101` | graphite slate | a neat row of different tools — wrench, paintbrush, gear, magnifier |
| 6 | `SETUP` · `101` | teal | an ornate skeleton key crossed with a settings dial |
| 7 | `ACCOUNTS` · `101` | oxblood brick | a padlock resting on a ledger; a firm "do-not-cross" line |

---

## Cover prompts (paste ONE AT A TIME — text accuracy drops if batched)

**① CHATGPT 101**
> A standing Y2K-honest 1999 school textbook, hardcover in muted **sage-green cloth**, gentle 3/4 view showing cover + a sliver of spine, transparent background, soft warm library light from upper left, real-book thickness and a little library wear (faint spine crease, an old catalog sticker, a date-due pocket edge). Cover layout top-to-bottom: an inset window with a small etched two-ink illustration of **an open doorway spilling light with a friendly blinking text-cursor** (Y2K schoolbook style, not photographic); below it the word **"CHATGPT"** in big warm brass **gold-foil** textbook type; below that a large gold-foil course numeral **"101"**; a thin bottom imprint bar reading **"SUNNYVAiLE HIGH"**. Spine repeats **"CHATGPT 101"** vertically in gold. Brand feel: plum/rose/gold, never neon. Reference register: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`; library warmth: `assets/building-interiors/library-reading-room.jpg`. Only the exact text above appears — no other words.

**② VOCAB 101**
> Same SUNNYVAiLE High 101 series textbook template as ① — identical proportions, 3/4 angle, upper-left library light, transparent background, gold-foil title + "101", bottom imprint bar **"SUNNYVAiLE HIGH"**, spine repeating the title vertically. Change only: hardcover in **dusty cornflower-blue cloth**; inset window shows a small etched two-ink illustration of **an open dictionary with a magnifying glass and alphabet thumb-tabs**; title word **"VOCAB"**. References: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`, `assets/building-interiors/library-reading-room.jpg`. Only the exact text "VOCAB", "101", "SUNNYVAiLE HIGH" appears.

**③ CONCEPTS 101**
> Same series template as ①. Change only: hardcover in **burnt-terracotta cloth**; inset window shows a small etched two-ink **cutaway "thinking machine" — a few gears feeding a lightbulb (a how-it-works schematic)**; title word **"CONCEPTS"**. References: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`, `assets/building-interiors/library-reading-room.jpg`. Only the exact text "CONCEPTS", "101", "SUNNYVAiLE HIGH" appears.

**④ BRIEFING 101**
> Same series template as ①. Change only: hardcover in **deep plum cloth (#4b2148)**; inset window shows a small etched two-ink illustration of **a clipboard memo being handed off — a manila brief with a short checklist**; title word **"BRIEFING"**. References: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`, `assets/building-interiors/library-reading-room.jpg`. Only the exact text "BRIEFING", "101", "SUNNYVAiLE HIGH" appears.

**⑤ TOOLS 101**
> Same series template as ①. Change only: hardcover in **graphite-slate cloth**; inset window shows a small etched two-ink illustration of **a neat row of different tools — a wrench, a paintbrush, a gear, a magnifier (the cast, side by side)**; title word **"TOOLS"**. References: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`, `assets/building-interiors/library-reading-room.jpg`. Only the exact text "TOOLS", "101", "SUNNYVAiLE HIGH" appears.

**⑥ SETUP 101**
> Same series template as ①. Change only: hardcover in **teal cloth**; inset window shows a small etched two-ink illustration of **an ornate skeleton key crossed with a settings dial**; title word **"SETUP"**. References: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`, `assets/building-interiors/library-reading-room.jpg`. Only the exact text "SETUP", "101", "SUNNYVAiLE HIGH" appears.

**⑦ ACCOUNTS 101**
> Same series template as ①. Change only: hardcover in **oxblood-brick cloth**; inset window shows a small etched two-ink illustration of **a padlock resting on a ledger, with a firm "do-not-cross" line**; title word **"ACCOUNTS"**. References: `assets/portal/laidies-grimoire-slaiyer-handbook-v1.png`, `assets/building-interiors/library-reading-room.jpg`. Only the exact text "ACCOUNTS", "101", "SUNNYVAiLE HIGH" appears.

---

## Shelf-kit prompt

**⑧ THE 101 SHELF (empty kit)**
> A single warm **oak library shelf** viewed straight-on, Y2K-honest and a little worn — rounded front edge, a brass label-holder centered on the front rail holding a small nameplate that reads **"101"**, soft warm library light. The shelf is **empty** (books get placed by the website). Composition: a wide horizontal shelf board with its front rail and a shallow shadow beneath; **everything above the shelf surface is transparent** (transparent PNG) so covers can stand on it. No books, no clutter, no extra text besides the brass **"101"** nameplate. Match the wood tone + atmosphere of `assets/building-interiors/library-reading-room.jpg`; construction reference (an empty shelf the site fills): `assets/sunnyvaile-interiors/chick-flicks-shelf-kit.png`.

---

## Output

Save to a new folder **`assets/library-101/`**:

| File | What |
|---|---|
| `textbook-chatgpt-101.png` | cover ① |
| `textbook-vocab-101.png` | cover ② |
| `textbook-concepts-101.png` | cover ③ |
| `textbook-briefing-101.png` | cover ④ |
| `textbook-tools-101.png` | cover ⑤ |
| `textbook-setup-101.png` | cover ⑥ |
| `textbook-accounts-101.png` | cover ⑦ |
| `101-shelf-kit.png` | shelf ⑧ |

- **Covers:** portrait ~1024×1280 (book ~4:5), **transparent PNG**, identical scale + angle + lighting across all seven so they line up on a shelf.
- **Shelf kit:** wide ~2400×700, **transparent PNG** above the shelf surface.
- Spell-check the rendered text against the exact strings in the table before delivering — a cover that says "CONCEPT" or "SUNNYVALE" (single-Y) is a reject.
