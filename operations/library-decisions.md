# LIBRAiRY — DECISIONS ALREADY MADE (do not re-open)

> Ali decides. This file records it the moment she says it, so it is never re-litigated.
> If something here looks wrong, ASK — do not "improve" it.
> Started 2026-07-22 after I rebuilt yesterday's page from scratch and re-made three
> mistakes she had already corrected. Read this BEFORE touching any library page.

## The working build
**`_library-v3.html`** (built 2026-07-21) is the reference. Not `library.html` (the old
text-card layout), and not my `_library-shelf-v2/v3.html` — those are wrong, see below.

## Shelf furniture — LOCKED
- The unit is **`delivery-20260721-size-variants-v5/library-shelf-unit-2-row-full-width-v1.png`**
  (1920×1080), used **three times, stacked** — one per section.
- Beige/warm-cream painted **METAL** 1990s institutional shelving. ⛔ Not wood. The old
  `assets/library-101/*-shelf-kit.png` wood bookcases are SUPERSEDED.
- Shelves must be **EVENLY SPACED**. The 5-shelf upright variant has an uneven bottom gap —
  Ali rejected it for that. ⛔ Do not use it.
- Spec of record: `operations/codex-prompts/library-shelf-unit.md`.

## 🔴 Books must NEVER sit in front of the centre upright
Ali sent a reference image making this explicit. The unit has slotted uprights down **both
sides AND the centre**. Books are therefore laid out as **TWO BAYS** — a left group and a
right group — with a clear gap where the centre bar runs.
⛔ `justify-content:center` on a full-width shelf row puts books straight over the bar. I did
this on 2026-07-22. Do not repeat it.

## 🔴 The background — what it must NOT be
- ⛔ **NOT black.** Ali on the 2026-07-21 mock: *"it can't be a black background that looks
  terrible."*
- ⛔ **NOT cream, and no flat pale page colour.** Said more than once. Do not propose it again.
- ⛔ **NOT the aisle backdrop** (`library-aisle-backdrop-v1.png`) — it is a receding corridor
  with its own shelves in perspective. The units are drawn dead straight-on; flat furniture on
  a perspective room reads as two different rooms.
- ⛔ **NOT evening / night / dusk / sunset.** The library is **DAYLIT**.
- ⛔ **NO light fixtures** — no pendants, chandeliers, lanterns, visible strip lights.
- ⛔ **NO shelving or books drawn into the backdrop** — they collide with the composited units.

✅ **What it must be:** the page reads as being INSIDE the LIBRAiRY, with the shelf units
standing in that room as real furniture. That needs a **straight-on flat wall** backdrop with
the SUNNYVAiLE geometric carpet along the bottom — which **does not exist yet**.

🔴 **Second blocker: the shelf units have NO alpha channel** (verified — PNG colour type 2,
RGB). The near-black surround is baked into the image, which is the actual reason the page is
black. It cannot be fixed in CSS. The units must be re-exported as RGBA with a transparent
surround AND a transparent back panel between shelves.

Both are specced in `operations/codex-prompts/library-room-backdrop-and-transparent-shelves.md`.

## The three sections — LOCKED
`101s` · `TOOLS` · `REFERENCE`, in that order, each with its own sign from
`delivery-20260721-signs-v1/`. Signs sit on the unit's blank fascia rail.
⛔ Do not collapse the three into one bookcase. I did this on 2026-07-22; it is wrong.

## Hero
Miss Jeeves at the reference desk, full-bleed across the top.

## UX — LOCKED
- **The shelf IS the interface.** Click a book, it opens **in place**. ⛔ No page-flipping —
  that was the Grimoire's failure and is explicitly rejected.
- Books that are not written yet stay **on the shelf, dimmed** — the shelf tells the truth
  about what exists rather than hiding gaps.
- **Puffy bookmarks**: every book AND every section inside it is savable to the Closet.
  Wired 2026-07-22 via `window.svPuffyScan()`.

## Content mapping — recovered 2026-07-22
19,751 words were extracted from `_superseded/grimoire/` into `content/library-books/`.
9 of 16 books now have real text. See `content/library-books/INVENTORY.md` and
`operations/research/` for the deep-research briefs.

⚠ **Who's Who in AI is only 185 words** — too thin to be a book as-is.
⚠ **Concepts 101 has no source** — must be cut from `handbook-ch1.md` (6,071 words).

## My wrong prototypes — do not use, delete after review
- `_library-shelf-v2.html` — wood bookcase, one case not three, centred books.
- `_library-shelf-v3.html` — metal but the WRONG unit (4-shelf upright), books centred over
  the centre bar, dark background.

---

## BANNED (machine-readable — the hook reads THIS block)
Any Bash/Edit/Write touching a library surface is BLOCKED if it contains one of these.
Add a line here and it is enforced immediately; delete a line to un-enforce.

```banned
101-shelf-kit.png
tools-shelf-kit.png
reference-shelf-kit.png
library-shelf-unit-5-shelf-upright
```

Reasons, in order: the first three are the **wood** bookcases, superseded by the metal units.
The fourth has **unevenly spaced** shelves — Ali rejected it for that.
