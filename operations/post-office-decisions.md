# POST OFFICE — DECISIONS (rebuild 2026-07-22)

> ⚠ **READ FIRST — the Post Office is not where mail should live.**
> Ali, 2026-07-22: *"it's going to be annoying to have to leave whatever you are looking at (like
> another profile), go to the post office to message them and see who messaged you."*
> **Mail is a LAYER, not a destination** — see memory `mail-is-a-layer-not-a-place`. Reading
> should follow you around the site (same pattern as `mini-player.js`, the KSVL player); sending
> should happen on her card, and postcards on the building they depict.
> That work is **NOT started** and is most likely owned by the member-mechanics session
> (`operations/member-promises-audit-2026-07-22.md`). **Check before building it.**
> When it is built, **lift the read/send logic out of this page — don't write a second copy.**
> The Post Office then keeps: rent a box, the full postcard rack, the whole archive, Penny.

> First building rebuilt under the "the building's function IS the page's mechanic" standard.
> Ali picked it as the one-building proof before deciding whether to re-fit the other 13.
> Original page backed up at `operations/_backup-post-office-20260722-preredesign.html`.

## The verb
**You send something to someone, and you get your mail.** Nothing else belongs here.

## 🔴 THE IMAGE — LOCKED
**`assets/town-characters/scenes/penny-scene.png`** (1672×941), web copies `.webp` / `.jpg`
generated 2026-07-22. **Penny is the postmistress** — the town keeper for this building
(`operations/town-keeper-roster.md`: *"runs the mail: gifts, postcards, you've got mail, BEST
FRIENDS. Deb's warm successor at the counter"*).

Her scene already contains the whole building as real objects: the SUNNYVAiLE POST sign, the
counter window, pigeonholes of letters, a service bell, postcards on the counter, a wrapped
parcel, a "P.O. BOXES 101–240" sign, and **a YOU'VE GOT MAiL postcard held out to you**.

⛔ **NOT** `assets/building-interiors/post-office-lobby.jpg` — Ali 2026-07-22: *"way too cottage
core. that doesn't fit the site at all."* ⛔ NOT `approved-assets/interiors/post-office-boxes.png`.

## 🔴 "YOUR BOX" = RESIDENT MAIL, NOT THE EPISODE — LOCKED
Ali, 2026-07-22: *"1. is silly because its going to go directly to their email."* Correct — the
Wednesday episode is already in her inbox, so a counter that announces it is theatre. **The box
holds mail you can only get by coming here: notes from other residents, by `@handle`.**
⛔ Do not put the episode back in the box.

Wired 2026-07-22 to the data layer that was already BUILT and unwired
([[resident-mail-handle-based]], `supabase/migrations/20260722214500_resident_mail.sql`):

| | |
|---|---|
| read | `my_resident_mail()` → id, from_handle, from_display_name, body, item_type, item_key, sent_at, read_at, redeemed_at |
| send | `send_resident_mail(to_handle, body, item_type, item_key)` → status string |
| mark read | direct `update resident_mail set read_at` — allowed by the recipient-only UPDATE policy |
| bin | direct `delete` — allowed by the recipient-only DELETE policy |

**All seven status strings are mapped, read off the live function body (not the memory note):**
`sent` · `no-such-resident` · `not-accepting` · `need-a-handle` · `self` · `empty` · `not-signed-in`.

Handles are lowercase by DB constraint (`card_username ~ '^[a-z0-9_]{3,24}$'`), and the send
field normalises as she types, so a typed capital can never produce a false "no such resident".

⛔ **No email is read or displayed anywhere on this page.** Residents connect by handle only.

**Still not built** (deliberately out of scope): gift attachment (`item_type`/`item_key` are
accepted but nothing transfers the item), and **blocking/reporting**. Ali's own note says decide
blocking before real residents arrive — treat that as the gate on opening this to the public.

## 🔴 THE LOOK — MEASURED OFF THE HOMEPAGE, NOT GUESSED
Ali, 2026-07-22: *"it looks boring. didn't the brief say it must look at least as good as the
homepage?"* It did — and v3 was a cream document at half the homepage's scale. I had never
actually opened the homepage to see what makes it good.

**The homepage numbers, read off `index.html` in the browser — use these, don't invent:**

| | index.html | what this page now does |
|---|---|---|
| hero background | `rgb(28, 15, 28)` near-black aubergine | same value |
| h1 | 74.88px / weight 800 / line-height <1 | `clamp(34px, 5vw, 66px)` / 800 |
| section headings | **57.6px** — every section | state line `clamp(30px, 4.4vw, 58px)` |
| buttons | solid candy fill, **dark plum `#3a1838` text**, **10px** radius | identical |
| backgrounds | gradient or image — **never flat** | radial candy wash, fixed |
| candy set | pink `#e982ab` · teal `#57b6c0` · coral `#ec7a78` · periwinkle `#b3abe7` | one per row |

⛔ Do not put this page back on cream. ⛔ Do not use white-on-dark pills — candy fill with dark
plum text is the house button.

**The design idea that follows from the UX rule:** the page's job is to TELL you something, so
**the telling is the display type.** "You've got mail." is 58px, not a 25px row in a slip. The
most important sentence on the page must be the biggest thing on it.

## 🔴 THE UX RULE — LOCKED
Ali, 2026-07-22: **"they should know if they have mail, what they can send. not hit random
hotspot numbers. that is an annoying ux."**

The counter **states your position on arrival**. No hover-hunting, no pins, no invisible
hotspots, no discovery game. Three rows, always visible, always legible:

| Row | Says |
|---|---|
| **Your box** | "You've got mail." / "No new mail today." / "You don't have a box here yet." |
| **You can send** | A postcard to a friend → *Pick a postcard* |
| **You can't send yet** | A parcel → *Why it's closed* |

"Do I have mail" is a **real answer**, not decoration — read from `content/episode-index.json`
(latest `status: "published"`) against `localStorage.laidies_po_last_read`, which is stamped when
she opens it. Three states, all verified.

⛔ Do not replace these plain statements with icons, hotspots, or hover reveals.

## 🔴 REJECTED ATTEMPTS — read this before "improving" anything
**v1 — coloured CSS plates on a separate box-wall image.** Ali: *"it looks terrible… that isn't
even the right image. and its just shitty css boxes slapped on a background."*
→ Coloured rectangles on a photo are decoration — the exact failure the standard exists to
prevent. Chick Flicks works because its VHS boxes are real rendered objects.

**v2 — the cottage-core lobby, with clip-path hotspots on the furniture and numbered pins.**
Ali: *"way too cottage core, that doesn't fit the site at all"* and *"this is a terrible UX and
I told you that wasn't the right image."*
→ Two separate failures. The art was off-brand, **and** invisible hotspots with numbered pins
make the visitor hunt for what's clickable instead of being told what's true.

**The pattern in my mistakes:** I kept designing a *menu to discover* when the building's job is
to *tell you something*. A post office clerk doesn't hide the counter — she says "you've got
mail." Ask what the building TELLS you, not just what it lets you touch.

⛔ Do not reintroduce `post-office-boxes.png` or `post-office-lobby.jpg` here.
⛔ Do not put CSS chips, numbered pins, or hover-to-discover hotspots on the art.

## The four counters — only what genuinely works
| Counter | Does | Real? |
|---|---|---|
| 1 · Rent a Box | Buttondown signup, unchanged endpoint | ✅ live |
| 2 · Your Box | box number + this week's delivery + Closet | ✅ reads local card |
| 3 · Postcard Rack | pick a card → hands off to `postcard.html?pc=<id>` | ✅ live |
| 4 · Parcel Window | gifting | 🔴 **shown CLOSED on purpose** |

**The parcel window is deliberately closed and says why.** Gifting needs residents to have real
addresses; cards are localStorage-only until the Supabase work. Same principle as the LIBRAiRY's
dimmed books — the building tells the truth about what exists. ⛔ Do not build a fake send UI.

## Scope discipline
- **Page-scoped CSS only.** `main{max-width:760px}` and the 300px hero clamp live in
  `assets/sunnyvaile-page.css` and were **not touched** — overridden inside this page alone, so
  no other building moved. Breaking that shared shell for all 14 pages is still Ali's open call.
- **`.sv-hero` must stay.** `charm-hunt.js` positions 4 charms by percentage inside it. Removing
  it or changing its image/aspect moves the charms off-target.
- Gold + plum retired: this page's UI uses the candy accents
  (teal `#57b6c0` · pink `#e982ab` · coral `#ec7a78` · periwinkle `#b3abe7`). No emoji in chrome.

## Also changed
`postcard.html` — added `?pc=<id>` preselect in compose mode so the rack can hand a card to the
writing desk. ⚠ The assignment must happen **inside `renderCompose()`** — it is called before a
top-level `var picked = …` would run, so both branches are set there. Getting this wrong left
nothing selected on the no-param path (caught in test, fixed).

## Measured result
| | before | v3 (current) |
|---|---|---|
| page height @1440 | 2,912px | **1,661px** |
| do you learn if you have mail? | no | **yes, on arrival, from real episode data** |
| do you learn what you can send? | no | **yes — one live row, one honestly closed** |
| things to hunt for | — | **none** |
| `<main>` width @1440 | 760px | full |
| hero | wrong art, cropped to a 300px strip | **Penny, full, uncropped** |
| console errors | — | none |
| charms | 4 placed | 3 live, inside the scene |
| mobile 375px | — | no x-overflow, 47px full-width buttons, 19px lines |

**All three box states verified in the browser:**
- no card → *"You don't have a box here yet."* + what's on the counter this week + **Rent a box**
- card, unread → *"You've got mail."* + Episode 04 · The Founding Mothers + **Open it**
- card, read → *"No new mail today."* + up to date + next delivery Wednesday

## OPEN — needs Ali
1. **The wall art is brass/gold.** Gold+plum is retired as *UI colour*; this is a painting of
   brass mailboxes, which is what mailboxes are. Kept as-is. Her call whether the art needs a
   candy-palette re-render.
2. **The box numbers in the art are garbled** — row 4 reads `401 402 404 404 405 407 407 408
   419 411`, row 1 skips 115, `517` appears twice. The plates cover the worst row. Only matters
   if the wall is ever shown larger.
3. **`post-office-boxes.png` is not in `curation.json`** — never judged. `post-office-lobby` is
   marked `correct`.
4. **`postcard.html` still offers `pc-chick-flicks` and `pc-puffy-binder`**, both marked
   `unused` in curation. Removed from the Post Office rack (11 cards, not 13); the writing desk
   still shows all 13. Not changed there without Ali.
5. **The box number is cosmetic** — derived from her handle so it's stable, but there is no
   address system behind it. Says so at the parcel window.
