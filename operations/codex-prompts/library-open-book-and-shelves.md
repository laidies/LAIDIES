# LIBRAiRY — the open book + fuller shelves

**Why this exists.** The LIBRAiRY is being rebuilt so the **shelf is the interface**: you pull a
book off the shelf and it opens *in place*. No page-flipping, no portal → shelf → chapter → back
(that was the Grimoire's failure). One page for the whole library.

That makes the **open book** the load-bearing asset — every book on every shelf opens into it,
so it must be a clean, reusable surface that real text sits on top of.

Deliver to: `Website-homepage/assets/library-101/`

---

## HARD REQUIREMENTS

**1 · Colour target is the HOMEPAGE.** Warm cream/paper grounds, candy accents —
pink `#e982ab` · teal `#57b6c0` · coral `#ec7a78` · periwinkle `#b3abe7` · ink `#3a1838`.
⛔ **No antique gold. No plum panels.** That pairing is retired site-wide.

**2 · Y2K-honest, not fairytale.** This is a 1999 civic library — warm wood, brass reading
lamps, card catalogue, rain at the window. ⛔ No spellbooks, no runes, no magic, no baroque
gilt. The "Grimoire" era is over; nothing should read as a book of spells.

**3 · "AI" is spelled with BOTH letters capital** wherever the acronym is rendered — never
"Ai". The accented `i` belongs to brand words only (LAiDIES, SUNNYVAiLE, LIBRAiRY, MAiVENS).

**4 · Text is rendered IN-generation** for signage and spine labels. Do not leave blank plates.

**5 · One asset per prompt run.** Batching these collapses them into the same template.

---

## 1 · THE OPEN BOOK — `library-open-book-spread.png` · 2400 × 1600

**The most important asset in this batch.** A large hardback lying open, seen straight-on from
slightly above, filling the frame. Two facing pages.

- **Both pages must be BLANK, clean, evenly lit paper** — warm cream, subtle fibre texture, a
  faint centre gutter shadow and natural page curve. Real text is laid over this in HTML, so
  anything printed on the pages fights the content.
- Generous, even margins. No printed rules, no lines, no marginalia, no illustrations on the
  page surface.
- The book's **cover edges and spine** are visible around the paper — cloth binding, in one of
  the candy accents (pink or teal), with a warm neutral board edge.
- A **ribbon marker** in a contrasting accent falling across the gutter. One small brass-free
  detail only.
- Background: softly out of focus so the book is unmistakably the subject. Suggest a wooden
  reading table, nothing legible.
- ⛔ No hands, no people, no reading glasses, no coffee cup, no scattered props.

Also deliver **`library-open-book-spread-dark.png`** — the same book on a darker table for
use over a dimmed shelf.

---

## 2 · THE 101 BOOKCASE, FULLER — `101-shelf-kit-v2.png` · 2400 × 1600

Replaces `101-shelf-kit.png`. Same head-on bookcase framing, but built to hold **more books
per shelf** — the current one leaves two-thirds of each shelf bare once the books are placed.

- **Three shelves, wide enough for 6–8 upright books each.** Books are composited in HTML, so
  the shelves themselves must be **EMPTY** — just wood, with a believable back panel.
- Warm oak, visible grain, a brass shelf-edge label plate on each shelf, **left blank**
  (labels are HTML).
- A small brass reading lamp at the top left, lit. Rain on a window at the right edge.
- Cream/paper wall behind, in the homepage register — not dark, not plum.
- ⛔ No books drawn on the shelves. ⛔ No "101" text — the plaque is set in HTML now.

---

## 3 · BOOK COVERS — one prompt each, 900 × 1200, transparent PNG

Upright hardback, spine to the left, seen slightly from the front-right so both the **cover and
the spine** read. Cloth binding in the named accent, title set in a clean 1999 textbook style,
small LIBRAiRY colophon at the foot of the spine. Match the existing `book-*.png` set in scale
and lighting so old and new sit on the same shelf.

| File | Title on cover | Cloth | The book is about |
|---|---|---|---|
| `book-vocab-101.png` | **Vocab 101** | teal | Every AI word in plain English |
| `book-briefing-101.png` | **Briefing 101** | pink | How to ask so it comes back useful |
| `book-setup-101.png` | **Setup 101** | periwinkle | Set up once so every tool knows how you work |
| `book-accounts-101.png` | **Accounts 101** | coral | What's safe to paste and what never is |

⚠ These four replace the existing `textbook-*-101.png` files, which are in the retired palette.

---

## QC — every asset
- Exact pixel dimensions as stated. Wrong dimensions are auto-rejected.
- No gold. No plum fills. No fairytale/occult motifs.
- "AI" in both capitals wherever it appears.
- The open-book pages are genuinely BLANK and evenly lit — hold a white rectangle over each
  page and confirm text would be readable on it.
