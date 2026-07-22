# GETTING THE OTHER PAGES TO A REASONABLE STATE
*Written overnight 2026-07-21 while Codex generates. Ali's brief: the Closet as the worked example.*

---
## THE STANDARD, stated from Ali's own example

> *"the closet in delta lai nu — it should look like a closet that has all the items in it that your
> haul goes in: e.g. wallet for your cards; sash; clothes/accessories from the mall; jar of butterfly
> clips; shelf for books and other things you save from the library; stickers; charm bracelets, etc"*

Three things are being asked for at once, and only the third is usually missing:

1. **The page looks like the place.** (mostly true already)
2. **The page CONTAINS your stuff** — the actual haul, not links to it. (true on the Closet)
3. **The stuff is IN the space, not listed beneath a picture of the space.** ← **this is the gap**

That third point is the same failure as the LIBRAiRY: the art existed, the books were CSS boxes
underneath it. It reads as a filing cabinet with themed labels.

---
## FINDING: the Closet has everything except placement

`laidies-card.html` · 131KB · **1 hero image + ~100 CSS "vessel" boxes.**

Every mechanic is already built and working — Resident Card, Report Card, Your Luminaries, Wednesday
Tour, Puffy Board, Sticker Book, Merit Sash, Charm Bracelet, Butterfly Clip Jar, Trading Card Binder,
Detention Slips, Locked Diary, FAiRY Plays Bank, Leaderboards. **Nothing needs building.**

And the closet art is genuinely good and already live:
`assets/closet/closet-interior-hero-v2-90s-vibrant.png` — a 1990s dressing room with **real zones**:
two hanging rails · open shelving (CDs, jewellery trays, cosmetics, a CRT, polaroids) · teal drawers ·
pull-out trays (sunglasses, scrunchies, jewellery, cassettes, pens) · a lit vanity · shoe shelves ·
a window seat.

**So the work is placement, not creation.** Map each collection onto the zone it belongs in and make
that zone the control — exactly the pattern that fixed the LIBRAiRY shelves.

### Proposed zone map (each hotspot opens that collection)
| Zone in the art | Holds | Earned at |
|---|---|---|
| Teal drawers, centre | **Resident Card** (the bifold wallet) | MAiKEOVER |
| Left hanging rail | **Clothes / accessories** | the Mall (Pieces of FLAiR) |
| Right hanging rail | **Merit Sash** hung on the rail end | earned across town |
| Jewellery tray, centre shelf | **Charm Bracelet** | charm hunt |
| Pull-out tray, front | **Butterfly Clip Jar** | Pop Quiz scores |
| Shelf beside the CRT | **Books saved from the LIBRAiRY** | LIBRAiRY |
| Inside of the door / mirror frame | **Puffy stickers + Sticker Book** | placed around the site |
| CD/cassette shelf | **Trading Card Binder** | packs |
| Polaroids on the shelf | **Your Luminaries** (4 picks) | the pantheons |
| Lit vanity | link back to **MAiKEOVER** | — |

**Report Card, Wednesday Tour, Leaderboards, FAiRY Plays** are dashboards, not objects — they stay as
panels *below* the closet. Don't force them into the furniture.

**Build note:** percentage-positioned hotspots over the image (`position:absolute` on a
`aspect-ratio`-locked container), same technique as the LIBRAiRY shelves. Empty collections show a
faint outline in their zone — "nothing here yet" is a visible invitation, which is the point of a
collection page. Keep the existing panels underneath as the accessible fallback and for small screens;
the closet becomes the way in, not the only way.

---
## EVERY OTHER PAGE — measured, not guessed

16 building pages are linked from the homepage. Counting images and boxes (with the `?v=`
cache-buster bug fixed — it produced two wrong answers today):

| Page | content imgs | place-art | boxes | state |
|---|---|---|---|---|
| `laidies-card.html` (Closet) | 5 | 1 | **100** | ⛔ the case above |
| `newsstand.html` | 1 | 1 | 10 | ⚠ one hero, then boxes — same shape as the Closet, smaller |
| `chick-flicks.html` | 18 | 18 | 14 | ok — art-led |
| `mall.html` | 12 | 12 | 0 | ok — art-led |
| `luminairy.html` | 49 | 4 | 8 | ok — but 15 stained-glass portraits are marked `redo` |
| `sunnyvaile-high.html` | 5 | 4 | 5 | ok |
| `town-hall.html` | 14 | 2 | 3 | ok — 4 pixel portraits marked `redo` |
| `library.html` | 21 | 1 | 0 | ⚠ **the v3 aisle redesign is NOT live** — still the old page |
| `radio.html` · `bronze-aige.html` · `blend-snap.html` · `post-office.html` · `sorority-house.html` · `visitors-centre.html` · `maikeover.html` | 1–13 | 1–2 | 0–4 | ok structurally |
| `this-week.html` | 0 | 0 | 0 | fine — deliberate redirect stub, not a broken page |

⚠ **What counting CANNOT tell you:** whether a page *feels* like its building. That's the
`page-experience-standard` judgement and it needs Ali's eye, not a script. The table above finds
pages built as boxes; it cannot find pages that are merely dull.

---
## RANKED WORK — highest impact first

**1 · Closet placement** (½ day). The zone map above. Biggest single gain: it is the page a member
returns to, everything already works, and it currently reads as a spreadsheet of their own stuff.

**2 · Ship the LIBRAiRY v3 aisle.** `_library-v3.html` exists with the generated shelf art and the
real chapter reader; `library.html` is still the old CSS-box version. The work is done and unshipped.
⚠ Needs Ali's approval first — she rated the earlier attempt 5/10 and the shelves were the sticking point.

**3 · NewsStand** — same one-hero-plus-boxes shape as the Closet, at 1/10th the size. The Closet's
zone-hotspot technique transfers directly once built.

**4 · The `redo` art backlog on live pages** — 15 stained-glass MAiVENS on `luminairy.html`,
4 pixel town-character portraits on `town-hall.html`. Already logged in
`operations/prelaunch-nonapproved-art.md`. These are generation jobs, not layout jobs.

**5 · The zombie `grimoire/` pages** — 22 `redo` references across handbook chapters that the
LIBRAiRY ruling already replaced. Redirecting them deletes that debt instead of redoing the art.
Cheapest win on the whole list.

---
## WHAT I AM NOT DOING WITHOUT YOU
- Not shipping the LIBRAiRY v3 over the live page — you rejected the earlier shelves.
- Not deleting or redirecting `grimoire/*` — removing live pages is your call.
- Not restyling any page that merely *looks* dull; that judgement is yours, and I'd be guessing.
