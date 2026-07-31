# LIBRAiRY — DECISIONS ALREADY MADE (do not re-open)

> Ali decides. This file records it the moment she says it, so it is never re-litigated.
> If something here looks wrong, ASK — do not "improve" it.
> Started 2026-07-22 after I rebuilt yesterday's page from scratch and re-made three
> mistakes she had already corrected. Read this BEFORE touching any library page.

## The working build
> **CORRECTION 2026-07-24:** `_library-v3.html` is an old mixed shell, not the
> current page benchmark. It combines the obsolete Miss Jeeves masthead and
> beige/pink arrival sequence with the later whole-room shelf mechanic. Do not
> copy it to other buildings and do not keep it in sync with the canonical
> page.
>
> The surviving design source Ali identified is the straight-on daylit room
> with the three metal cases integrated into it. `library.html` now opens
> directly into that room and preserves click-book → open-in-place plus the
> working Miss Jeeves search in a compact band below. This 2026-07-24 recovery
> is a **LOCAL CANDIDATE AWAITING ALI REVIEW**, not a new approval claim.
> `_library-v3.html` now redirects to the candidate so an old preview link
> cannot masquerade as the current page; its pre-redirect Git history remains
> the historical evidence.
>
> The current candidate's compact breakpoint is <=560px and uses a horizontal
> shelf reel rather than stacking three bookcases into another long page. The
> older `max-width:760px` tall-stack note below describes the superseded shell,
> not `library.html`.

---

## 🟢 CURRENT STATE — 2026-07-22 evening (this supersedes the older sections below where they conflict)

The page now has FOUR parts, top to bottom:

1. **Historical masthead (superseded 2026-07-24).** The clean reroll
   `assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v3-lighter-carpet.png`
   — daylit, Miss Jeeves at the desk, packed metal bookcases both sides, her neck-render fixed.
   ⛔ Do NOT use `library-interior-from-credits-dechromed-v3-lighter-carpet.png` (the un-rerolled
   one) or `library-interior-purple-sign-wall-v5.png` — both had flaws Ali flagged.
   Title lives BELOW the hero (site pattern), not overlaid — the image carries its own signage.

2. **Ask Miss Jeeves.** A reference-desk search over `content/site/site-index.json` (25 entries;
   matches title/summary/topics/aliases → ranked answer cards that link out). Light-lilac card
   (`#faf6fc`), a small magnifier mark — ⛔ NOT the beige card and NOT the "J-in-a-circle" badge
   (both rejected). This is a CORE library feature; do not drop it again.

3. **Browse = an interactive bookcase standing IN a real room render. This is
   now the arrival experience in `library.html`, not a lower section hidden
   behind the historical masthead.**
   - Room background = `assets/building-interiors/delivery-20260722-library-interior-no-desk-v1/library-interior-no-desk-v1.png`
     (straight-on lilac wall + navy carpet, framed by side shelving). The shelves composite ON this
     so they read as part of the room. ⛔ This REPLACES the CSS wall+plaster+carpet approach in the
     "Wall + floor" section below — that is now superseded.
   - ⛔ Ali rejected a "catalog of cards" pivot (2026-07-22) — the shelf IS the interface, real
     bookcases with click-to-open books. Keep it.
   - Book size ladder Ali drove: 4-shelf upright (covers too small) → 3-shelf upright → 3-bay case
     v1 (uneven shelves, bottom too big) → **FINAL: 3-bay case v2 (even shelves)**
     `delivery-20260722-3bay-wall-case-v2-even-spacing/library-wall-case-3bay-v1.png` (2180×1000,
     aspect 2.18, RGBA; shelf boards at 37.3/63.5/91.1%, gaps ~28/26/28). Fills the purple wall —
     CSS `.unit{left:15.5%;right:16.6%;top:13.8%;bottom:24.4%}` inside `.libroom` (top/bottom tuned
     so the drawn metal — the PNG has ~3.4% top / 5.1% bottom transparent pad — meets the ceiling
     curve and stands feet-on-carpet); three `.bay` thirds, sign on each fascia (`.ledge`), books on
     `.brow--1/2/3` at bottom 64.1/37.4/10.1%, height 25.5%. Covers ~128px. Book covers all show
     full-colour (coming-soon dimming eased to opacity .82 so all books read the same size).
     Popups: all render ABOVE the book, and JS adds `.lift` to the hovered bay+brow so the card sits
     in front of everything. Spec: `operations/library-3bay-wall-case-render-request.md` (has the v2
     even-spacing fix note at the top).
   - ⚠ A hand-edited 3-shelf (pixel surgery on the 4-shelf) was tried and BINNED — ragged clips.
     New shelf sizes must be rendered fresh, never hacked.

   - **Mobile (`@media max-width:760px`):** the wide 3-bay case doesn't fit a phone, so the browse
     becomes **one tall bookcase you scroll** — each `.bay` restacks vertically as a full-width
     3-shelf upright (`delivery-20260722-3-shelf-upright-v1/…`, boards 38.8/65.0/91.3%), sign on top,
     ~101px covers, tap-to-open. Page carries `<meta name="viewport">` (it was missing). Hero + Ask
     Jeeves just reflow. Desktop room-case is untouched.
   - Books sit ON the boards via `.bk img{transform:translateY(3%)}` (covers have ~3% bottom pad, so
     without it they floated).

4. **Sections unchanged:** `101s` · `TOOLS` · `REFERENCE`, signs from `delivery-20260721-signs-v1/`,
   books from `assets/library-101/*`, reader opens in place. Headings use the homepage ink
   `#3a1838` — ⛔ not plum `#4b2148` ("i hate plum!").

5. **Books now carry REAL content (wired 2026-07-23).** The shelf books used to open to a 1–2
   sentence teaser; two even fetched dead `grimoire/*.html` stubs (the "Grimoire dismantled"
   redirect — Ali: "what the hell is this?"). Now 7 books load their full extracted text:
   - Each book has `src:'/content/library-books/rendered/<id>.html'` — the reader FETCHES that
     fragment (a single `<div class="gr-page">…</div>`), extracts it, and auto-builds the left TOC
     from its `<h2>`/`<h3>`. `body`/`toc` remain as an offline fallback (fetch checks `r.ok` now, so
     a missing file falls back to the teaser instead of rendering a raw "404").
   - Fragments live in `content/library-books/rendered/*.html`, rendered from `content/library-books/*.md`
     (~16,300 words). Editorial merges per `INVENTORY.md`: **Briefing** = ch2 + ch1's "Prompt";
     **Accounts** = ch5 + ch1 privacy; **Concepts** = ch1's Model/Training/Token/Hallucination/four-types
     (NOT Prompt, NOT the account angle); **Who's Who** = whos-who + ch4 Field Guide; Vocab/Setup/
     Straight-Answers are near-1:1. Every fragment scanned clean: 0 grimoire refs, 0 dead links, no h1,
     no inline style, brand spelling AI/Ai intact. Straight-Answers keeps its 15 "Verified June 2026 ·
     recheck when…" stamps (honest perishable-fact presentation).
   - ChatGPT/Claude/etc. tool cards stay `soon:'EP 5'` (un-gate is Ali's call). **How to Check** still
     runs its inline teaser — its real content is the live `grimoire/verification-rulebook.html` (the ONE
     surviving grimoire page); wiring it is a separate task.

6. **Reader is a designed magazine spread, not CSS text blocks (Ali: "can't look like boring shitty
   css blocks of text").** Per-book `--accent` set from the spine colour → gradient masthead w/ candy
   top-stripe + "THE TOWN LIBRAiRY" running head; drop-capped `.lede`; numbered `<h2>` with accent
   swash; glossary `.term` **cards**; before/after `.example` (pink VAGUE / green BRIEFED); `.callout`
   pill-label boxes; `.receipts` dashed source cards; confidence `.badge`s; `.meta` verified-stamp
   pills; themed tables + pull-quotes. ⚠ `div.term` = block card, but `span.term` (inline term tag)
   MUST stay inline (`.book .txt span.term` override) or it boxes a word mid-sentence.

7. **90s margin doodles (Ali: "people drew this S everywhere in the margins… it's a library book after
   all").** Hand-drawn SVG in `assets/building-interiors/library-shelf/doodles/`: `cool-s-tile.svg`
   (faint S tiled down the right margin — `.txt` has extra right padding so text clears it; OFF on
   mobile), `contents-doodles.svg` (cluster on the contents page via `.toc::after`), `end-doodles.svg`
   (sign-off row via `.txt::after`). ⚠ The "cool S" is an **S-curve centreline** (`M30 13 L17 8 L11 17
   L19 27 L29 37 L23 49 L10 50`) — a symmetric pinch/crossing reads as a figure-8, NOT the S. Other
   doodles (heart/star/peace/bolt) are simple stroked paths, mixed pen colours.

⚠ **The `wire-library-books` Workflow STALLED** (~50 min, 3 of 7 verify passes never returned). All 7
render outputs were recovered from `…/wf_4a46632b-ad5/journal.jsonl` via a one-off python script; the 3
unverified books were self-checked (mechanical scan + read). If re-running content: recover from the
journal, don't assume the workflow completes.

Housekeeping still open: promote `_library-v3.html` → live `library.html` (Ali's call — books are now
content-complete, so no longer blocked on that).

## Shelf furniture — LOCKED (updated 2026-07-22, Ali chose from live mockups)
- **NEW:** the room is **three narrow UPRIGHT bookcases standing side-by-side on ONE floor** —
  the transparent **`delivery-20260722-transparent-v1/size-variants-v4/library-shelf-unit-4-shelf-upright-v1.png`**
  (960×1080, RGBA, 4 evenly-spaced shelves). This REPLACES the old "full-width unit ×3 stacked"
  plan below — stacking full-width units either floated, looked like a tall stack (Ali: "stupid"),
  or collapsed into one bookcase (banned). Side-by-side uprights read as a real library corner:
  everything on one floor, each bay its own labelled section. Ali picked layout **A** from
  `_library-mockups.html`.
- Shelf board geometry (measured): books stand on boards at **32.3% · 52.9% · 73.5% · 94.9%**;
  blank fascia rail for the sign at **~7%**.
- ⚠ The old locked unit `…size-variants-v5/library-shelf-unit-2-row-full-width-v1.png` (1920×1080,
  full-width, 2-row two-bay) is **SUPERSEDED** for the room. The "two bays / never over the centre
  upright" rule below was about THAT unit — uprights are single-bay, so books simply centre.
- Beige/warm-cream painted **METAL** 1990s institutional shelving. ⛔ Not wood. The old
  `assets/library-101/*-shelf-kit.png` wood bookcases are SUPERSEDED.
- Shelves must be **EVENLY SPACED**. The 5-shelf upright is uneven — banned. The **4-shelf**
  upright IS evenly spaced (measured) and is the chosen unit.
- Spec of record: `operations/codex-prompts/library-shelf-unit.md`.

## Wall + floor — LOCKED (2026-07-22, Ali chose from live mockups)
- **Wall = the homepage "lilac → blush" gradient** `linear-gradient(160deg,#e4d9f1 0%,#f5dbe8 100%)`
  with the neutral plaster grain (`room/wall-neutral-light-v1.png`) multiplied on top for texture.
  Ali rejected: coral ("hideous"), the bright periwinkle/lavender/grape set ("all too bright"),
  flat light lilacs ("ugly"). She asked for a **homepage gradient**, not a flat fill. ⛔ Not plum
  ("i hate plum!" + plum retired sitewide). No new Codex art needed — the wall is a CSS-tinted texture.
- **Floor = the SUNNYVAiLE navy carpet**, recut CLEAN from the backdrop (`room/floor-clean-v1.png`,
  crop y900–1080) — the old `room/floor-v1.png` had a **coral baseboard edge baked in** that clashed;
  do not use it.
- Shelves must stand **grounded, floor-to-near-ceiling** on the carpet — ⛔ not floating in the
  middle of the wall (Ali: "why are they in the middle of the floor").

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
