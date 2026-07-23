# The Sorority House · Delta LAi Nu chapter, Wisteria Lane — the members-only clubhouse where the chat rooms, Girl Talk, the Burn Book, Dear LAiDIES and the Closet all live. Keeper: June, the "Cool House Mom." — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `sorority-house.html` · Priority: **med** · Effort: **L**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Go into a room and talk.

## Current state
art 0/18 · column 760 · h 4,753 (Tier B, audit #7). Eleven rooms across four "wings" presented as a stacked grid of text cards (`.stop`), each linking OUT to a separate `community/*.html` page — a house with named rooms and not one door drawn. Above the grid: a "card is the key" door strip (resident vs visitor gating — REAL, reads the card), a Girl Talk feature hero, a Closet hero, a dashed house-rules box, and footer CTAs to MAiKEOVER. It half-works: the rooms are already live Hyvor Talk threads (website-id 15519, per-room page-ids), Girl Talk exists, the Closet exists, gating works. This is finish + reframe, NOT rebuild from zero.

## THE MECHANIC (the one idea)
The doors ARE the interface. You arrive inside Delta LAi Nu and June (the house mom) tells you where you stand — home, or on the porch. In front of you are the house's doors, each a decorated Y2K dorm-room door with a nameplate and a dry-erase note. You click a door and step into that room: its live thread opens IN PLACE, inside the house — you never bounce out to a separate page. The physical object you operate is a door you walk through, exactly as the LIBRAiRY's shelf is a book you pull. This is the LUMINAiRY pattern the audit already praised ("click a door, the wing opens in place"), scaled to the four wings — proven, not invented.

## Key elements
### Arrival state — June greets you `[REWORK]`
Hero interior: June the Cool House Mom in the entry hall + one big homepage-scale line stating your position in plain words.
- **Behaviour:** On load reads the card/auth: RESIDENT → 'Welcome home, @handle', doors unlocked; VISITOR → 'You're on the porch — residents post past this door', doors visible but posting locked + CTA to MAiKEOVER. Keep the existing card-check, restyle it.

### The four wing-doors `[NEW]`
Four decorated dorm doors composited on the hall wall — Living Room / Kitchen / Rec Room / Your Room — the operable art, each with a nameplate + dry-erase note.
- **Behaviour:** Big and labeled; click a door → opens in place to that wing's three rooms; one open at a time. LUMINAiRY pattern at scale four.

### The eleven rooms `[REWORK]`
Existing live Hyvor threads (website-id 15519, per-room page-ids) grouped in four wings.
- **Behaviour:** Click a room inside an open wing → its thread opens IN PLACE in a house panel; community/*.html stays as fallback. Keep grouping + copy.

### Girl Talk marquee `[KEEP]`
Truth-or-Dare deck on the coffee table, canon-anchored here.
- **Behaviour:** Draw → Truth/Dare; dares post to the rooms, earn a sticker. Keep prominence; restyle off gold/plum; drop the 🂠 emoji; don't touch game internals.

### Your Corner (Closet + Dare Reports) `[KEEP]`
Wing IV 'your room' — Closet is the locker at Delta LAi Nu.
- **Behaviour:** Opens like other wings; Closet → laidies-card.html, Dare Reports → Girl Talk. Keep both.

### June's house rules `[REWORK]`
The five one-liners recast in June's voice.
- **Behaviour:** Fold the dashed box into a framed rules sign on the wall; keep copy verbatim.

### Dry-erase notes + entry corkboard `[NEW]`
Per-door note plates + a whole-house 'what's happening tonight' board.
- **Behaviour:** Real state where a real signal exists, honest 'peek inside' where it doesn't; CSS/SVG live text. Signature detail + state display.

### Footer routing + technical keeps `[KEEP]`
'No card? → MAiKEOVER' CTA + scaffolding.
- **Behaviour:** Keep routing (one row). MUST keep .sv-hero (charm placement) and every defer script.

## Design direction
Full-bleed, kill the 760 column with PAGE-SCOPED overrides only (the Post Office model — override `main{max-width:760px}` inside this page so no other building moves; breaking the shared shell for all 14 is still Ali's open call). Room-integrated: the doors composite ONTO an interior backdrop render exactly as the library bookcases composite onto the no-desk room — the doors are drawn objects, their nameplate/note text is crisp CSS overlaid on each door's board (like the library sign on the fascia), NOT coloured CSS chips slapped on a photo. Homepage numbers, measured not guessed: dark aubergine option for the state band `rgb(28,15,28)`, state line clamp(30px,4.4vw,58px)/800, candy buttons = solid fill + dark-plum `#3a1838` text + 10px radius (never white-on-dark pills), section backgrounds gradient/image never flat, candy accents pink #e982ab / teal #57b6c0 / coral #ec7a78 / periwinkle #b3abe7, Playfair display + Inter body per SV tokens, Jost for wordmark/eyebrows. Hub-and-reveal so it collapses from 4,753px toward the ~2,500px the library proves. SHAPE top to bottom: (1) masthead = KEEP the exterior render (`10-delta-lai-nu-house-rethink-v1.jpg`), 'you've arrived on Wisteria Lane', carries the charms; title below per site pattern; (2) June + arrival-state band, full-width, the biggest sentence on the page; (3) THE HOUSE — interior hall backdrop + four composited wing-doors + entry corkboard, the operable core, rooms open in place; (4) Girl Talk deck as a featured object in the hall; (5) June's rules sign folded onto the wall; (6) one footer CTA row to MAiKEOVER.

## Signature detail (the 'cool S' of this building)
The Y2K dorm-room door — cut-paper letters spelling the room name, butterfly clips on the frame, holographic stickers, a feather boa on the knob, and a little DRY-ERASE BOARD scrawled with 'what's new inside' in marker; plus the entry-hall corkboard in June's handwriting: 'who's home · what's happening tonight.' The LIBRAiRY's cool-S-in-the-margins for THIS building — period-true, lived-in, and it does the state-telling job instead of a UI badge.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `ep00.building.b1of1.sorority-house-entry-hall.g1.r01.png` | codex-render | decorative | new | The operable backdrop the four wing-doors stand in — the library no-desk-room equivalent. |
| `ep00.char.b1of1.june-house-mom-entry-hall.g1.r01.png` | codex-render | decorative | uncertain | The hero interior + the voice that TELLS you your arrival state (resident/visitor), the Delta LAi Nu answer to Penny at the Post Office. |
| `ep00.building.b1of1.sorority-house-wing-doors.g1.r01.png` | codex-render | **YES — this is the interface** | new | THE thing you click — the operable doors of the house. |
| `sorority-entry-corkboard` | css/svg | decorative | new | The signature detail + honest state display, without a UI badge. |
| `girl-talk-card-deck` | css/svg | **YES — this is the interface** | uncertain | Make the Girl Talk marquee a real object in the room rather than a gradient block. |

**`ep00.building.b1of1.sorority-house-entry-hall.g1.r01.png`** — Straight-on, warm-daylit, EMPTY interior of the Delta LAi Nu common room / entry hall, matching the exterior render's teal-trim + cream + warm-glow palette (staircase, glass, wisteria at the windows). A flat back wall with room for four doors composited across it, a coffee table front-center for the Girl Talk card deck, and a small entry corkboard/whiteboard. Y2K sorority décor — pastel pink-and-white, ΔΛΝ glitter banner, butterfly clips — but establishing-interior EMPTY (no people), so composited doors read as part of the room. This is the room the mechanic lives in.

**`ep00.char.b1of1.june-house-mom-entry-hall.g1.r01.png`** — June, the Cool House Mom (Mrs. George / Amy Poehler 'cool mom' homage, ORIGINAL character, Y2K-era dress, town-character portrait register), greeting you at the foot of the Delta LAi Nu staircase — welcoming, warm, mid-gesture as if 'come in, honey.' Single figure, in-world, matching the saint/town-character illustration style.

**`ep00.building.b1of1.sorority-house-wing-doors.g1.r01.png`** — A set of FOUR distinct Y2K decorated dorm-room doors as transparent-alpha PNGs (one sheet or four files), drawn dead straight-on to composite on the hall wall. Each visibly themed to its wing — Living Room (common), Kitchen (advice), Rec Room (creative), Your Room upstairs (yours) — with a blank nameplate zone and a blank dry-erase-board zone left clear for crisp CSS text (mirror the library sign-on-fascia approach). Décor: cut-paper letters, butterfly clips, holo stickers, feather boa on the knob.

**`sorority-entry-corkboard`** — The entry-hall whiteboard/corkboard 'who's home · what's happening tonight' plus the per-door dry-erase note plates — buildable as CSS/SVG chrome with live text, marker-handwriting feel, butterfly-clip pins.

**`girl-talk-card-deck`** — A Truth-or-Dare card deck object on the coffee table for the marquee. Reuse existing Girl Talk card faces from games/girl-talk if suitable; only commission if none composite cleanly.

## Reuses existing
KEEP and reuse: the exterior masthead render `assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/10-delta-lai-nu-house-rethink-v1.jpg`; all 11 live Hyvor Talk room threads in `community/*.html` (website-id 15519, per-room page-ids — instantiate them in place); the Girl Talk game (`games/girl-talk.html`) + its card art; the Closet (`laidies-card.html`); the four-wing grouping + every room's name/description; the house-rules copy (recast in June's voice); June's canon (town-keeper-roster: Cool House Mom, 'we are NOT mean in this house'); the resident/visitor card-gating logic (sv-nav-auth + localStorage card); `.sv-hero` + charm-hunt placement; every existing defer script.

## Pitfalls (do not)
- Post Office rule: state must be REAL, not decorative. Do NOT invent per-room 'new' counts on the dry-erase notes if no real Hyvor activity signal exists — show an honest 'peek inside' instead. Faking counts is the exact failure the standard bans.
- Do NOT slap coloured CSS chips/rectangles on the render (Post Office v1: 'shitty css boxes slapped on a background'). Doors are RENDERED objects; only crisp text sits on their nameplate/board zones.
- No hotspot hunting (Post Office v2 fail): doors must be big, labeled, obviously the interface; state is shown on arrival, not hover-to-discover.
- Keep `.sv-hero` — charm-hunt.js positions charms by % inside it; removing/reaspecting it moves charms off-target. Keep all defer scripts.
- Do NOT touch community/*.html threads or the Girl Talk game internals — only reframe how you enter them from this page.
- Watch reveal depth: wing-door → rooms → thread can feel like a menu maze. It must feel like walking in, not three clicks of nav. Consider showing the wing's rooms immediately on door-open and the thread on room-click, one open at a time.
- No gold/plum in UI chrome and no emoji (the current Girl Talk button uses 🂠). Warm tones inside the ART are fine.
- Preserve the resident/visitor gate — visitors see doors, can't post; that IS the 'card is the key' promise.

## Open questions for Ali
- Is a real per-room activity signal available (Hyvor Talk API: last-comment timestamp per page-id) so the dry-erase notes can show true 'new since your last visit' vs localStorage, the way the Post Office reads episode-index? If not, doors show honest 'open / peek inside' only.
- Does June have a rendered portrait/scene yet, or must one be commissioned? (keeper roster lists her as named but a portrait is 'owed'.) If none, the arrival state can ship with type-only until her render lands — like the library shipped its shell before the backdrop.
- Confirm rooms should open INLINE in the house (Hyvor embed in a panel) vs. continue routing to community/*.html. Recommend inline to keep you in the building.
- Two-level hub (wing → rooms) or flatten so all rooms are visible at once? Four wing-doors is cleaner and reads as a real house; confirm.
- Interior lighting: match the exterior's sunset-warm glow, or push brighter daylit for door-label legibility?

## Sequencing
Like the LIBRAiRY, the mechanic is blocked on two art deliverables: the empty interior-hall backdrop and the transparent-alpha wing-door set (June's hero is a third, softer, dependency). The reveal logic, page-scoped 760-kill, inline-thread wiring, and restyle can all be built against placeholder door frames first, then swapped when the renders land — so this can start immediately and finish on art. Do NOT edit sunnyvaile-high.html or the Girl Talk game from this work. This is a reframe of a half-working page, not a rebuild — every room, Girl Talk, the Closet, and the card gate already exist.

