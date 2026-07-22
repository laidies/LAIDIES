# THE CLOSET — how it could actually work
*Thinking, not prompts. 2026-07-21. For Ali to react to before anything is generated.*

## Where it sits
**Delta LAi Nu** has four destinations: **chat rooms · Girl Talk · the Closet · the leaderboard.**
The Closet is your private room in a house whose other rooms are social. That contrast is the point —
everywhere else in the house you are talking to people; in here you are looking at your own things.

---
## Why the last three attempts failed

| Attempt | Why it broke |
|---|---|
| Wide room + objects composited in | A charm bracelet at 3% of a wide shot is a smudge. Twelve objects generated separately never share a perspective or a light source. |
| Wide room, empty "stage" | Sterile. A member's closet must never open bare. |
| Re-using the existing render | It is a generic dressing room — no sash, no jar, no bracelet. I was putting labels on things that were not in the picture. |

**The single lesson: at room scale you can only read FURNITURE. You cannot read objects.**

---
## THE DESIGN — navigate by furniture, reveal in close-up

Two levels. This is the hub-and-reveal rule already locked for this site.

### Level 1 · The room
A wide render of your corner. You are not meant to pick out individual charms here. You see **six
pieces of furniture**, each large, each obviously clickable, each holding one collection.

### Level 2 · The reveal
Click a piece of furniture and it opens into a close-up **where that container fills the panel** and
your items are shown LARGE. The sash hangs full height with every badge legible. The jar fills the frame.

This inverts what failed: objects are never small, because they are never shown at room scale.

---
## The six pieces of furniture

| Furniture | Holds | The reveal shows |
|---|---|---|
| **The hanging rail** | Merit Sash · mall clothes | Sash full height, badges in their slots |
| **The shelf** | LIBRAiRY books · trading card binder | Real titles on the spines; binder pages |
| **The dresser top** | Butterfly Clip Jar · Charm Bracelet on a tray | Jar filled to your level; bracelet with your charms |
| **The drawer** | Resident Card wallet · Locked Diary | Your card printed into the wallet window |
| **The corkboard** | Puffy stickers · Luminaries polaroids | Your stickers and your four picks |
| **The wall calendar** | **the weekly dashboard** | see below |

---
## The dashboard as a 1999 wall calendar

You asked for "where they are at, how much they collected per week." A stat panel is the obvious
answer and the wrong one — it belongs in a spreadsheet, not a bedroom.

**A wall calendar is the same data, native to the room.** Every episode drops on a Wednesday, so the
calendar already carries the site's rhythm:

- One square per week; the **Wednesday** square is that episode.
- Each square fills with what you earned that week — a clip, a badge, a sticker, a card.
- A run of filled squares reads as a streak without ever using the word.
- **Gaps are visible and forgiving** — an empty square is an invitation, and it is exactly where the
  **Tardy Award** welcome-back belongs.
- Hover a square: *"Episode 4 · 2 clips, 1 charm, quiz 8/10."*

It also scales: twelve months is a whole season, and it becomes a keepsake rather than a readout.

---
## The technical unlock: design the EMPTY SLOTS into the art

This is what makes it robust instead of fragile — **and the pattern is already working in this codebase.**

`laidies-card.html` composites 33 charm SVGs onto a bracelet base image, with each charm's own gold
ring interlocking with the bracelet's hanging rings at a fixed attach-line (~62% container height).
It works today. Generalise it:

- The sash renders with **12 blank embroidered badge outlines** in a regular column.
- The bracelet renders with **12 empty links** at fixed spacing.
- The binder renders with **9 empty card pockets**.
- The calendar renders with **52 empty squares**.

The site then fills `slot[i]` with `token[i]`. Consequences:
- Compositing becomes trivial — one container, one perspective, known coordinates.
- The **empty state looks designed, not broken.** Twelve waiting badge outlines say "collect these,"
  which is the strongest thing a collection page can say to a new member.
- Progress is legible at a glance, because the empties are visible.

⚠ Note: the current bracelet base (`charm-bracelet-base.png`) is marked **redo** in curation, so it is due for
regeneration regardless — good moment to rebuild it with proper regular slots.

---
## What art this actually needs

Not thirteen. **Seven renders**, each doing real work:
1. The room — wide, six pieces of furniture, calendar on the wall
2. Rail close-up — sash with 12 blank badge slots
3. Shelf close-up — blank book spines + binder with 9 empty pockets
4. Dresser close-up — jar with graduated fill levels + bracelet with 12 empty links
5. Drawer close-up — wallet with blank card window + diary
6. Corkboard close-up — empty cork + pins
7. Calendar close-up — 52 blank squares

Charm tokens already exist (33 SVGs). Clip, badge and sticker tokens are small and simple.

---
## ANSWERED by Ali 2026-07-21 — locked
1. **A WALK-IN CLOSET.** Not a bedroom. So the calendar and corkboard live on the **inside of the
   closet door / the side wall** — which is exactly where a 1999 girl would actually put them.
2. **A SEASON calendar, not a year.** ~12–24 squares. It fills faster, which matters most early on
   when a new member needs to feel momentum.
3. **The leaderboard stays in Delta LAi Nu, not in the Closet.** The house's four destinations remain
   chat rooms · Girl Talk · Closet · leaderboard. The Closet is private; the leaderboard is social,
   and mixing them would put other people inside your own room.

## What I am NOT doing yet
No prompts. The room depends on answers 1 and 3, and every close-up depends on the room being approved
first. Generating now would repeat tonight's mistake — building on an idea you had not confirmed.

---
# ⛔ THE ROOM CONCEPT IS DEAD — Ali, 2026-07-21 (late)

> *"its a generic image and there are already stickers and clips in the jar and badges on a sash"*

**This kills it, and it is the right call.** A static room render showing a FULL jar and a FULL sash
means the picture is permanently wrong:
- A new member opens her closet and sees **someone else's collection**.
- Her real progress is invisible — the art cannot move.
- It is decoration pretending to be a collection.

And it cannot be fixed by emptying the room: the empty "stage" version was already rejected as sterile.
**Both static extremes fail.** A room render can never be honest about state.

## What survives
The **containers**, not the room. This is the pattern already working on `laidies-card.html`:
the charm bracelet composites 33 real charm SVGs onto a base image at a fixed attach-line. One render,
honest to your state, no perspective problem.

**Generalise that and drop the room entirely:**

| Container | Base art (ONE render each) | Filled with |
|---|---|---|
| Merit Sash | sash with **12 blank badge outlines** | your earned badges |
| Butterfly Clip Jar | empty jar + **graduated fill levels** | your clip count |
| Charm Bracelet | bracelet with **12 empty links** ⚠ current base marked `redo` | your charms |
| Trading Card Binder | page with **9 empty pockets** | your cards |
| LIBRAiRY shelf | bookend + **blank spine slots** | books you saved |
| Puffy Board | empty cork + pins | stickers you placed |
| Season calendar | **~16 blank squares** | what you earned each week |

**Why this is better than the room:**
- **Honest.** Empty means empty. Filling up is visible and earned.
- **Cheap.** ~7 flat container renders, no perspective matching, no lighting continuity problem.
- **Proven.** The bracelet already does exactly this.
- **No extra click.** Your stuff is on the page, not behind a hotspot.
- The empty state becomes the invitation — 12 waiting badge outlines say "collect these."

**What the page loses:** the sense of a place. That may be worth accepting; a closet that lies about
what you own is worse than a well-designed shelf that tells the truth.

⚠ **DECIDED BY ALI TOMORROW, NOT BUILT TONIGHT.** `closet-room-v5.md` and
`closet-room-and-items-batch.md` remain on disk but should be considered SUPERSEDED unless she revives
the room idea.

---
# ✅ THE ANSWER — Ali, 2026-07-21 (late)

> *"just open what looks like closet doors in the delta lai nu page and the closet subpage has a
> closet masthead and then the items below"*

**This resolves every objection in one move.**

| Where | What |
|---|---|
| **Delta LAi Nu page** | **Closet DOORS** — a set of closed closet doors among the house's destinations. You open them, the way you'd walk into a room. That is the entrance. |
| **Closet page** | A **closet MASTHEAD** across the top, then **your items below.** |

**Why it works where the room failed:**
- A masthead is a **header, not an inventory**. It can show a beautiful closet without claiming that
  jar of clips is yours. The room concept died because a full render lied about your collection —
  a masthead makes no such claim.
- **No extra click.** Your stuff is on the page, below the masthead. No hunting for hotspots.
- **The place-feeling comes from the doors and the masthead**, not from pretending the art is your
  collection. Atmosphere and honesty stop fighting each other.
- **The items below stay the honest, state-driven containers** — sash with blank badge slots, jar
  with fill levels, bracelet with empty links. The pattern already proven by the charm bracelet.
- **Cheap:** two new renders (doors + masthead) plus the container art. No perspective matching, no
  lighting continuity, no compositing into a room.

## Art needed
1. **Closet doors** (closed, inviting, clearly openable) — for the Delta LAi Nu page.
2. **Closet masthead** — a wide banner-shaped closet interior. Atmosphere only; nothing in it is a
   claim about the member's collection.
3. **Container art per collection** — unchanged from the pattern above, with blank slots the site
   fills from real state.

**SUPERSEDES:** `closet-room-v5.md` and `closet-room-and-items-batch.md` (the room-as-container idea).
