# WEBPAGES — what else is needed
*Determined overnight 2026-07-21. Measured, not guessed. Closet excluded — being handled separately.*

---
## 1 · YOUR 2026-07-10 LAUNCH LIST — status

| # | Item | Status |
|---|---|---|
| 5 | Mall labelled "No. 4 Main" | ✅ **FIXED** — now reads `MAiN Street · No. 9` |
| 6 | Girl Talk hero cut off + Clubhouse copy | ✅ **Clubhouse copy gone** (0 mentions). Hero crop needs your eye. |
| 7 | Welcome Tour popups block the text | ⚠ **UNVERIFIED.** Tour code is on 5 pages; I could not reproduce the overlap without rendering, and screenshots are broken in this session. **Needs you to look.** |
| 2 | Full inventory of "still in development" | ✅ **DELIVERED — section 2 below.** This was asked for on 10 July and never produced. |
| 1 | Every page right experience + images | in progress — section 3 |
| 3 | Homepage = all the new stuff | homepage is the visual bar; no action |
| 4 | Sweep bad-looking cards | section 4 |

---
## 2 · THE "STILL IN DEVELOPMENT" INVENTORY (item 2, finally answered)

A first pass counted 97 markers. **That was wrong** — most were `placeholder=` attributes on form
inputs, which is ordinary HTML. Filtering comments, CSS and input attributes leaves the real number:

### **26 user-facing markers across 6 live pages**

| Page | What it says | Verdict |
|---|---|---|
| `chick-flicks.html` | 20 × "Coming soon" on episodes 05, 07–23 | ✅ **CORRECT — leave alone.** Those episodes genuinely come later. This is a season shelf, not a gap. |
| `shop.html` | "Coming soon" on Buy buttons | ✅ **Correct until you connect Printful/Gumroad.** Prices are placeholders by design; no payment code on the site. **Yours, not mine.** |
| `bookfair.html` | `data-soon` items | ✅ Correct — drops are scheduled every ~6 weeks |
| `index.html` | "Mail — Notes and gifts through the Post Office. Coming soon." | ✅ **HONEST.** I suspected this was stale because gifting is *decided*, but the Post Office is a newsletter signup today — gifting is genuinely not built. Verified, not assumed. |
| `library.html` | "The Prompt Cookbook — coming soon" | ⚠ **REAL GAP** — a book on the shelf that doesn't exist yet. Content job. |
| `luminairy.html` | "Deep-dive per-saint pages coming soon" | ⚠ **REAL GAP** — the biggest unbuilt promise on the site. |

**So: only two genuine unbuilt promises** — per-saint pages and the Prompt Cookbook. Everything else
labelled "coming soon" is telling the truth about a scheduled future thing, which is fine.

---
## 3 · PER-PAGE WORK, ranked by impact

**1 · The Closet** — being handled. Walk-in, seven furniture zones, season calendar. Room render first.

**2 · Ship the LIBRAiRY v3 aisle.** `_library-v3.html` has generated shelf art and a working chapter
reader. `library.html` is still the old CSS-box page. **The work is done and unshipped.**
⚠ Blocked on you — you rated the earlier shelves 5/10 and they were the sticking point.

**3 · The `redo` art backlog on live pages** — 15 stained-glass MAiVENS on `luminairy.html`,
4 pixel town-character portraits on `town-hall.html`. Generation jobs; prompts not yet written.
Full list in `operations/prelaunch-nonapproved-art.md`.

**4 · NewsStand** — 1 hero image + 10 boxes. The same shape as the Closet's problem, at a tenth the
size. The Closet's furniture-zone technique transfers directly once it exists.

**5 · The zombie `grimoire/` pages** — 22 `redo` references across handbook chapters the LIBRAiRY
ruling already replaced. **Redirecting them deletes the debt instead of redoing the art** — cheapest
win on this list, but removing live pages is your call.

**6 · Per-saint deep-dive pages** (from §2) — the largest unbuilt promise. Scope it before building.

### Structurally fine, no work needed
`mall.html` · `bronze-aige.html` · `blend-snap.html` · `post-office.html` · `maikeover.html` ·
`radio.html` · `town-hall.html` · `sunnyvaile-high.html` · `visitors-centre.html` ·
`sorority-house.html` — all have place-art and working mechanics.
`this-week.html` is a deliberate redirect stub, not a broken page.

---
## 4 · WHAT I CANNOT DETERMINE FOR YOU

Counting finds pages built as boxes. **It cannot tell whether a page FEELS like its building** —
that is the `page-experience-standard` judgement and it needs your eye. Two specific things I could
not check without rendering:
- the Welcome Tour overlap (your item 7)
- the Girl Talk hero crop (your item 6)

Both are 30 seconds for you and impossible for me tonight.
