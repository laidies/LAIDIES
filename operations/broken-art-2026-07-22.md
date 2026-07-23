# Broken art found 2026-07-22

All verified with Playwright against the running preview — network 404s, not guesses.

## 🔴 The Closet has NO vessel art — `assets/vessels/` does not exist
Five images 404 on `laidies-card.html`, all with `?v=20260716`:

- `assets/vessels/puffy-board-pixel.png`
- `assets/vessels/sticker-book-pixel.png`
- `assets/vessels/merit-sash-pixel.png`
- `assets/vessels/charm-bracelet-pixel.png`
- `assets/vessels/butterfly-clip-pixel.png`

The whole directory is absent. This is the page where everything a member collects is
displayed, so every container on it is currently a broken image.

⚠ Note the `-pixel` suffix — these were named during the pixel-art era, which was reversed
2026-07-16 (pixel is EPISODES ONLY). So even once redrawn they should not be pixel art.

## SUNNYVAiLE High — two 404s, one is only a rename
| Referenced | Reality |
|---|---|
| `assets/puffies/puffy-icecream-pink.png` | real file is **`puffy-ice-cream-cone-pink.png`** — fix the reference |
| `assets/puffies/puffy-bookmark-summer.png` | does not exist anywhere — needs drawing or removing |

## ✅ Fixed 2026-07-22 — the puffy bookmark icon
The save button rendered the butterfly-clip rating token, which Ali had already marked
**"redo — I don't know what this is"** in `operations/ops/curation.json`. She didn't recognise
it because a butterfly clip is the **currency**, not a bookmark — two mechanics wearing one icon.

Now: `puffies/puffy-star-teal.png` unplaced (ghosted, dashed ring) →
`puffies/puffy-star-pink.png` placed (full colour, tilted, no ring).

Empty-board copy also corrected — it read *"Mark any section in the Handbook with a butterfly
clip"*, pointing at the retired Handbook. Now points at the LIBRAiRY.

## ✅ Fixed 2026-07-22 — puffy bookmarks were never wired to the LIBRAiRY
`puffy-bookmarks.js` was live on 8 pages but **not `library.html`** — the building full of
books was the one place nothing could be saved.

Added `window.svPuffyScan()`, a guarded public rescan, because the new library opens books
**in place** so their sections arrive after load. The guard prevents double-injecting the
stylesheet or duplicate buttons; verified by opening two books in sequence (button count held
at 4, no doubling). Both save levels confirmed working — the whole BOOK and a SECTION inside it.

## Still open
- Redraw the five Closet vessels (non-pixel).
- Decide whether `puffy-bookmark-summer.png` gets drawn or the reference removed.
- Regression check confirmed **no page was broken** by the shared-script change:
  `handbook.html` still renders 32 buttons with zero console errors.

---

## Street / town-canon pass, 2026-07-22 (Claude, from Ali's "the library is not beside blend and snap")

Checked every WIRED Ep4 frame that shows a street or a town building. Canon source:
memory `sunnyvaile-street-layout-canon`. Ali's verdict needed on each.

| where | frame | finding |
|---|---|---|
| **cue 13** · 3:05 · 17s · **PLAYING** | `open-15f-transformation-main-street-clueless-v7` | 🔴 Sign reads **"MAKEOVER on MAIN"** — missing BOTH Ai accents; canon is **"MAiKEOVER on MAiN"**. Also **Mme CLAi-O's (No.5) is absent** from the row; the other nine are in correct order. |
| **cue 54** · 18:48 · 28s · **PLAYING** | `around-town-comic-v1` | 🔴 Classroom banner reads **"GO SUNNYS!"** — mascot is locked as the **CENTAURS** ("GO CENTAURS!"). 🔴 Panel label reads **"SUNNYVAiLE HiGH"** — site uses "SUNNYVAiLE High" (182×) / "HIGH" (19×), never "HiGH". ⚠ KSVL screen says "SUNNYVAiLE'S WEEKLY ANTHEM" — the Wednesday Anthem is the ONE fixed track; the *episode* song is the weekly one. |
| **cue 6** · 1:42 · 8s · **PLAYING** | `open-08-sunnyvaile-welcome-comic-v5` | ✅ Geography complete and correct — all ten of MAiN in order, Mme CLAi-O's present, "MAiKEOVER on MAiN" and "BRONZE AiGE" accented correctly. ⚠ Style register looks softer / less black-ink than the comic frames — possible generation mix, Ali's eye needed. ❔ Sign reads "KSVL COMMUNITY RAiDIO" — is "RAiDIO" intended brand styling? |
| not wired | `around-town-b-comic-v1` | ⛔ **BANNED** — LIBRAiRY on MAiN beside Blend & Snap (it is on Civic Square, off MAiN); Chick Flicks/Blend & Snap reversed; painterly despite `comic-v1` in the name. |

**Cause fix applied:** `art-requirements.md` now carries **rule 5b · SUNNYVAiLE GEOGRAPHY IS
CANON**, with the full MAiN 1-10 order and the off-MAiN buildings listed inline, so every
prompt built from that single source carries the layout. The LIBRAiRY-on-MAiN error had
already happened twice before (`main-street-golden`, `main-street-dusk`, re-rolled 2026-07-06).
