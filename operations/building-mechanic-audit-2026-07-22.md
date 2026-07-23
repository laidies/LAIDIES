# BUILDING MECHANIC AUDIT — 2026-07-22

**The question asked of every building:** *what do you DO here, and does the page let you
do it that way?*

Not colour. Not spacing. The test is the one the LIBRAiRY work proved: **the picture must be
the thing you operate, not an illustration of the thing.** Beautiful art beside real content
in text cards = decoration = failed.

## How this was measured (so the check is checkable)

All 17 directory buildings loaded in a 1440×900 frame off a local server and probed in the
DOM. Two numbers per page:

- **operable art** — how many of the page's interactive controls are a *picture you operate*
  (contain an `<img>` / a real background image) out of the total interactive controls in
  `<main>`. `art 0 / 15` means every single control on the page is a text button or a text card.
- **column** — rendered width of `<main>` on a 1440px screen. `760px` = the banned centre text
  column with dead side margins.
- **height** — full page scroll height at 1440px wide.

Reference points measured the same way:
- `index.html` (the bar) — column **1440px**, art **12**, hero itself operable, h 10,561
- `_library-v3.html` (the proven mechanic, **not live**) — column **1440px**, art **8 / 8 =
  100%**, h **2,504**

## The headline

**12 of 17 buildings have zero pictures you operate. 14 of 17 are locked in a 760px centre
column.** They are the same page with a different hero photo on top: full-bleed building
interior → 760px column → `<h1>` → lede → gold link-cards and prose. Post Office and Blend &
Snap are pixel-for-pixel the same shell.

The building interiors are gorgeous and completely inert. The Post Office hero has an open
brass PO box with a letter in it. The Blend & Snap hero has a corkboard pinned with POP QUIZ
WEDNESDAY. Neither is clickable. That is the failure, repeated 12 times.

---

# RANKED — furthest from behaving like its building, first

## TIER A · the building's verb is not on the page at all

### 1 · POST OFFICE — ❌ NOT actually rebuilt (corrected 2026-07-23)
The "rebuild" did not stick. Verified 2026-07-23: live `post-office.html` is **byte-identical to
`_backup-post-office-20260722-preredesign.html`** — still art 0/6, 760 column, gold+plum, building-as-
header. The clip-path rebuild (v1/v2) was rejected and reverted; Ali disliked it and confirmed the
**LIBRAiRY is the sole model** for rebuilds. Post Office stays on this list as a to-do, rebuilt the
library way (separate operable objects, not hotspots). See `operations/building-design-briefs/`.

<details><summary>original finding</summary>

**`post-office.html` · art 0/6 · column 760 · h 2,912**
**You DO: send something to someone.** You cannot send anything to anyone. The page is a
Buttondown email signup form, then a bulleted list of what you will and won't get, then a gold
link-card that ships you to `/laidies-card.html`. Gifting (one-way notes/gifts through the Post
Office) is *described in prose* and happens somewhere else. There is no counter, no window, no
address, no stamp, no box. The PO-box wall is a photograph.
</details>

### 2 · BLEND & SNAP — `blend-snap.html` · art 0/13 · column 760 · h 3,070
**You DO: order something.** There is nothing to order. One gold link-card ("Grab this week's
pack →"), one link-card to Trading Cards, then a JS-rendered text list of past packs, then
"How the Wednesday lap works from here" as a numbered list. No menu, no counter, no cup, no
corkboard you can pull a note off. Identical shell to Post Office.

### 3 · LIBRAiRY — `library.html` · art 3/19 · column 760 · h **5,891**
**You DO: look something up.** The live page is still the old text-card grid — and 3 of its 5
"shelves" (`potions-shelf`, `power-map`, `chamber-of-receipts`) are ~1KB redirect stubs, so
clicking a shelf bounces you out of the building.
⚠ **The fix already exists and is not shipped.** `_library-v3.html` measures 1440px full-bleed,
8/8 operable art, 2,504px tall. Per `operations/library-decisions.md` it is blocked on two art
deliverables (straight-on daylit room backdrop; shelf units re-exported with alpha). This is the
worst live page but the *shortest* path — it is a promotion, not a redesign.

### 4 · SUNNYVAiLE High — `sunnyvaile-high.html` · art 0/14 · column 760 · h 2,043
**You DO: sit a class and take the quiz.** The quiz is a link out to `/learn/quiz.html`. The
seven cards under "Season 1 · 101 classes" are text links that all go to the LIBRAiRY — i.e.
the building's own verb happens in a different building. The locker hallway, the scantron desk,
the trophy case — all photographs. The class template is already LOCKED in the handover (1999
classroom → hit play on the TV on the AV cart → goes full screen) and is not built anywhere.

🔒 **Owned by the SUNNYVAiLE High classes window, not this one.** Ali ruled 2026-07-22 that
"class" now means the video lessons only, so that hub is being re-labelled as the 101 *textbook
shelf* from that window. That ruling confirms the finding above rather than fixing it: correct
labelling makes it explicit that no class is sittable here yet. ⛔ Do not edit
`sunnyvaile-high.html` from the buildings work without checking with that window first.

### 5 · VISITORS CENTRE — `visitors-centre.html` · art 0/22 · column 760 · h **5,823**
**You DO: get oriented, take a map, start the tour.** Second-longest building page in town and
it is almost entirely an essay — "Why a fictional town?", the town described in a paragraph,
then the founder's note. The map/directory widget is buried mid-page. This is the first
building on MAiN Street and the first thing a stranger meets.

## TIER B · the verb exists, but as a form or a list instead of the building

### 6 · BRONZE AiGE — `bronze-aige.html` · art 0/15 · column 760 · h **5,581**
**You DO: order a drink and call a happy hour.** It genuinely works — date/time pickers, a copy-
able invite, an .ics download, a coaster stamp. But it is presented as "Step 1 / Step 2 / Step 3"
headings down a 760px column over 5,581px. No bar, no jukebox, no fortune-teller you pull, no
coaster you physically stamp. Third-longest building page.

### 7 · SORORITY HOUSE — `sorority-house.html` · art 0/18 · column 760 · h 4,753
**You DO: go into a room and talk.** Eleven rooms across four wings, presented as a grid of text
cards, each linking out to a separate page. A house with named rooms and not one door drawn.

### 8 · MAiKEOVER — `maikeover.html` · art 0/12 · column 760 · h 4,747 · 12 inputs
**You DO: sit in the chair and get made over.** This has the strongest real *doing* mechanic in
town after the library shelf — live card preview, avatar generation, era/outfit/accessory chips.
It is not missing a mechanic; it is wearing the wrong clothes. A salon rendered as a web form in
a 760px column.

### 9 · TOWN HALL — `town-hall.html` · art 0/4 · column 760 · h **1,253** (shortest)
**You DO: see the mayor, meet the locals, leave a comment.** Three hub buttons with SVG icons
that open panels in place — structurally the right idea, but the hubs are generic gold icons,
not Deb's door / the noticeboard / the comment box.

### 10 · NewsStand — `newsstand.html` · art 0/8 · column 760 · h 2,127
**You DO: buy a paper.** A JS-rendered story list with filter chips and a search box. It works,
but it is a filtered feed, not a rack of papers you pull. The kiosk with the mastheads is a
photograph above it.

### 11 · MALL — `mall.html` · art 11/24 · column 760 · h 3,556
**You DO: walk the corridor and go into stores.** Best of Tier B — the Mall Directory board is
properly diegetic and the 11 storefronts are photographs you click. But it is a vertical stack
of cards in a 760px column, not a corridor you walk.

## TIER C · the picture is partly the interface

### 12 · LUMINAiRY — `luminairy.html` · art 3/6 · column 760 · h 2,195
Three wing-door photographs; you click a door and the wing opens **in place**. That is exactly
the proven pattern, just at a scale of three. Best-behaved page still trapped in the 760px column.

### 13 · CHiCK FLiCKS — `chick-flicks.html` · art 16/30 · column 760 · h **7,075 (longest in town)**
The rental wall is real: VHS boxes standing in the bay of the store-wall photograph, click one to
take it home. Then the page gives up and becomes a page again — an aisle strip, "Browse by Aisle"
cards, and "How rental works" prose, for 7,075px. **Also: one broken image** (empty `src`) at
page-y ≈ 2,972. Half-shipped, and the half that shipped is buried in the longest page in town.

### 14 · KSVL RAiDIO — `radio.html` · art 0/7 · column 760 · h 1,818
**You DO: tune in.** The Tune In Live button sits *on* the hero and the stream persists site-wide
— the building's function genuinely is the mechanic. The counters below are text hubs rather than
a dial or a console, and art measures 0, but this page does its job.

## TIER D · these behave

### 15 · Mme CLAi-O — `games/madame-claio.html` · full-bleed 1440 · h 1,629
Crystal ball → step in → a reading card comes back. Short, full-bleed, in-world.

### 16 · FAiRY Godmother — `games/fairy-godmother.html` · column 1394 · h 1,786
A console you bring a stuck prompt to and get it fixed. Near-full-bleed, short, does the verb.

### 17 · Dream Phone — `games/dream-phone.html` · art 25/57 · full-bleed 1440 · h 4,443
Two doors, then a phone you dial. ⚠ The game itself is mid-redesign (direction TBD per
`dream-phone-game-redesign`) — do not touch the game until that lands.

---

# The three systemic causes

1. **One template, seventeen buildings.** A shared shell (`sv-hero` + 760px `<main>`) is doing
   the work on 14 of 17 pages. Every building inherits the same body regardless of what happens
   inside it. Fixing pages one at a time will keep reproducing this.
2. **The building interior is a header, not a room.** Every page puts its best asset in a
   ~216px-tall full-bleed strip at the top, then never refers to it again.
3. **The gold link-card is the default answer to everything.** Study Pack, PO box, Trading
   Cards, Report Card — all the same blush-and-gold rounded rectangle. It is also gold+plum,
   which is retired.

# Length offenders (⛔ no long scrolling)

| Page | height |
|---|---|
| Chick Flicks | 7,075 |
| LIBRAiRY (live) | 5,891 |
| Visitors Centre | 5,823 |
| BRONZE AiGE | 5,581 |
| Sorority House | 4,753 |
| MAiKEOVER | 4,747 |
| Dream Phone | 4,443 |

For scale: `_library-v3.html`, the pattern that works, is **2,504**.

# Ownership boundaries (2026-07-22)

- `sunnyvaile-high.html` — the **SUNNYVAiLE High classes window** owns it. Don't edit from here.
- `operations/research/tool-machinery-scope.md` and `operations/research/tool-machinery/` —
  owned and **already completed** by that window (5 vendor-sourced files + `_BRIEF.md`, every
  claim with a source URL and checked date). Do not re-research; ask that window to extend it.
- Dream Phone game — mid-redesign, direction TBD. Don't touch the game.

# Not decided here

Which building to rebuild first, and whether the Post Office or the live LIBRAiRY promotion
goes first. Ali's call.
