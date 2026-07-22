# THE CLOSET — room + every item in it
*Delta LAi Nu · the member's Closet. Written 2026-07-21.*

**13 prompts: 1 room, 12 objects.** Every object is placed into the room by the website, so they must
all belong to the same room, the same light and the same camera.

---
# ⚠ HOW TO RUN THIS FILE

**ONE PROMPT AT A TIME.** Never batch these. Batched prompts collapse into a template and the objects
come back in different styles, angles and light — which would make the whole closet unusable.

**Generate the ROOM FIRST (prompt 0) and get it approved.** Every object prompt then references the
approved room so the light matches. Do not start objects before the room is signed off.

**Never pick your own reference from the repo.** Every allowed reference is named below.

---
# SHARED SPEC — re-read before EVERY run

**Style reference — the one file, for all 13:**
`assets/closet/closet-interior-hero-v2-90s-vibrant.png`
Take from it: **richly rendered, vibrant, warm 1990s dressing-room realism** — saturated pinks,
teals, purples and cream; soft warm key light; glossy plastics, chrome, patent leather, glitter.
Take the RENDERING and the PALETTE. Never the composition.

⛔ **NOT comic, NOT pop-art, NOT pixel.** Pixel art is episodes-only. This is the town/interior
register — the same finish as the existing closet render.

**Every OBJECT (prompts 1–12) must be:**
- **On a fully TRANSPARENT background (PNG with alpha).** No backdrop, no floor, no drop shadow
  baked in — the website composites these into the room and adds its own shadow.
- **Lit from the upper LEFT, warm key light**, matching the room. Soft fill on the right.
- Shot at a **slight three-quarter angle from just above** — as if you are standing in the closet
  looking at the shelf. Never flat-on, never top-down, never a dramatic hero angle.
- **Square canvas, 2048×2048**, object centred with a little breathing room.
- Rendered at a quality that survives being seen at 400px AND zoomed to full size — this is a
  collection the member is proud of. Ali: *"the items should look really high quality."*
- **No text, no labels, no logos** unless a prompt explicitly asks for it.

**Each object needs TWO versions** unless stated otherwise:
- `-full.png` — the object holding a healthy collection
- `-empty.png` — the same object, same position and lighting, **empty and waiting**
The empty state is what a new member sees, so it must look inviting rather than broken.

---
---
# PROMPT 0 — THE ROOM  ·  generate and approve this BEFORE any detail view

A 1990s walk-in dressing room at the Delta LAi Nu sorority house — **the member's Closet.**

Reference for palette, finish and fittings ONLY:
`assets/closet/closet-interior-hero-v2-90s-vibrant.png`
⚠ **That reference is a generic dressing room. It contains NONE of the things that actually belong in
this closet.** Take its light, its palette and its cabinetry from it — then put OUR objects in it.

**This room must contain the member's actual collection, each object large enough to RECOGNISE at a
glance.** A viewer should be able to point at the sash, the jar and the bracelet without hovering.
That means fewer, bigger objects — not a cluttered maximalist shelf. Leave breathing space around
each one.

### What must be in the room, and where

| Position | Object |
|---|---|
| **Right hanging rail, front and centre, hanging full-length** | **The MERIT SASH** — deep plum satin, gold edging, covered in embroidered merit badges. It hangs alone so it reads instantly. This is the hero object of the room. |
| **Left hanging rail** | A handful of 1990s clothes on pink velvet hangers — butterfly-print slip dress, denim jacket, faux-fur shrug. Plus a small handbag hooked on the rail end. |
| **Centre shelf, eye level** | **The BUTTERFLY CLIP JAR** — a clear glass jar of translucent pink/purple/teal butterfly clips. Large, catching the light. |
| **Centre shelf, beside the jar** | **The CHARM BRACELET** on a small velvet jewellery pad — gold, hung with charms. |
| **Shelf above** | **A ROW OF HARDBACK BOOKS** upright between chrome bookends — jewel-tone cloth bindings, gold foil rules, **blank spines**. |
| **Shelf below** | **THE TRADING CARD BINDER** standing upright, pink, slightly open showing clear card pockets. Beside it **THE STICKER BOOK**, lying flat and open, puffy stickers visible. |
| **Teal drawer, pulled half open** | **THE RESIDENT CARD WALLET** — pink patent bifold, open, a blank card in its window. Beside it **THE LOCKED DIARY**, quilted lilac with a small gold padlock. |
| **Propped on the lower shelf** | **FOUR POLAROID FRAMES** in a small standing cluster — blank cream photo panels. |
| **Clipped at the vanity edge** | **A SMALL STACK OF DETENTION SLIPS** in a bulldog clip — pale pink carbon paper, ruled, no readable text. |
| Right edge | The lit vanity — bulb-framed mirror, mostly clear surface. |
| Left | Window with soft daylight and wisteria; pink window seat. |

⛔ **Do NOT fill the shelves with generic dressing-room clutter** — no rows of handbags, no CD racks,
no cosmetics arrays, no shoe walls. Every object on the shelves should be one of OURS. The generic
version is exactly what we are replacing.

⛔ **No text, no labels, no titles anywhere** — book spines blank, photo panels blank, card pockets
blank, slips unreadable. The website prints real content into those.

Warm key light from the upper left. Straight-on wide view, everything readable.

**Out:** `assets/closet/closet-room-v4-with-items.png` · **2560×1440**

---
---
# THE 12 DETAIL VIEWS
*Each is the LARGE hero image for that collection's own panel — opened by clicking its zone in the
room. They are NOT composited into the room; the room already contains its own copy of each object.
That means these do not have to match the room's perspective — they only have to look superb big.*

## 1 — THE RESIDENT CARD WALLET  ·  zone: teal drawers
A 1990s **bifold wallet**, soft pink patent leather with a gold heart clasp, lying open at a slight
angle. Inside, a clear plastic card window holding a **blank ID-style card** — no printed text or
face; the site prints the member's card into it. A few empty card slots behind it.
`-full`: several cards tucked in the slots, one just visible in the window.
`-empty`: the same wallet open, slots bare, window clear.
**Out:** `closet-item-wallet-{full,empty}.png`

## 2 — THE MERIT SASH  ·  zone: end of the right rail
A **sash on a padded hanger**, hanging vertically, deep plum satin with gold edging.
`-full`: covered in embroidered merit badges — small round and shield-shaped patches, richly stitched,
varied colours, no readable text.
`-empty`: the same sash, gold edging, **no badges** — pristine and waiting.
**Out:** `closet-item-sash-{full,empty}.png`

## 3 — THE BUTTERFLY CLIP JAR  ·  zone: front pull-out tray
A **clear glass apothecary-style jar with a lid**, filled with 1990s **butterfly hair clips** in
translucent pink, purple, teal and glitter. Light catching the glass and the plastic wings.
`-full`: jar brimming, a few clips scattered at its base.
`-empty`: the same jar, lid on, **completely empty**, still catching the light.
**Out:** `closet-item-clipjar-{full,empty}.png`

## 4 — THE CHARM BRACELET  ·  zone: jewellery tray, centre shelf
A **gold charm bracelet coiled on a small velvet jewellery pad**, clasp visible.
`-full`: hung with a dozen detailed charms — a heart, a star, a tiny phone, a lipstick, a butterfly,
a little book — each crisply modelled and catching light.
`-empty`: the same bracelet, coiled, **bare links, no charms.**
**Out:** `closet-item-charmbracelet-{full,empty}.png`

## 5 — SAVED BOOKS  ·  zone: shelf beside the CRT
A **row of 6–8 hardback books standing upright**, held by a chrome bookend, spines facing the viewer.
Rich jewel-tone cloth bindings with gold foil rules. **Spines blank — no titles**; the site prints
titles over them.
`-full`: a full row, one book pulled slightly proud.
`-empty`: the bookend alone on bare shelf, **no books.**
**Out:** `closet-item-books-{full,empty}.png`

## 6 — THE STICKER BOOK  ·  zone: centre shelf
A **1990s sticker album lying flat, open**, puffy-sticker pages showing. Glossy, chunky, well-thumbed.
`-full`: pages covered with puffy 3D stickers — hearts, stars, butterflies, rainbows — thick and glossy.
`-empty`: the same album open to **blank waxy sticker pages**, faint grid printed on them.
**Out:** `closet-item-stickerbook-{full,empty}.png`

## 7 — THE TRADING CARD BINDER  ·  zone: CD/cassette shelf
A **ring binder standing upright, slightly open**, pink with a clear plastic sleeve on the cover.
Inside, transparent 9-pocket card pages.
`-full`: pockets holding cards — cards rendered as **blank glossy rounded rectangles with a subtle
foil sheen**, no artwork (the site prints the real cards).
`-empty`: the same binder, **empty clear pockets.**
**Out:** `closet-item-cardbinder-{full,empty}.png`

## 8 — THE PUFFY BOARD  ·  zone: inside of the closet door
A **cork pin-board in a pink wooden frame**, hanging.
`-full`: puffy stickers and small polaroid-style cards pinned across it, slightly overlapping, pins
and washi tape. Photos are **blank cream rectangles** — the site prints into them.
`-empty`: bare cork, a few empty pins in one corner.
**Out:** `closet-item-puffyboard-{full,empty}.png`

## 9 — YOUR LUMINARIES  ·  zone: propped on the centre shelf
**Four polaroid-style photo frames** in a small standing arrangement — chrome and pink plastic 1990s
frames, slightly overlapping.
`-full`: each holding a **blank cream photo panel** with a soft glow, ready to be printed into.
`-empty`: the same four frames, **empty, showing the backing card.**
**Out:** `closet-item-luminaries-{full,empty}.png`

## 10 — THE LOCKED DIARY  ·  zone: teal drawers, beside the wallet
A **1990s lockable diary**, quilted lilac vinyl cover, tiny gold padlock and key, ribbon marker.
Closed and locked.
`-full`: plump with pages, ribbon trailing, key resting beside it.
`-empty`: the same diary, slim, **padlock closed, no key** — locked and not yet opened.
*(Single object — the padlock is correct HERE. It is a private diary. This is the opposite of the
Burn Book, which must never have a lock.)*
**Out:** `closet-item-diary-{full,empty}.png`

## 11 — DETENTION SLIPS  ·  zone: pinned at the vanity edge
A **short stack of 1990s carbon-copy detention slips**, pale pink and yellow duplicate paper, one
folded corner, held by a bulldog clip. **Ruled lines but NO readable text.**
`-full`: a stack of six or seven, dog-eared.
`-empty`: the bulldog clip alone, **one blank slip in it.**
**Out:** `closet-item-detention-{full,empty}.png`

## 12 — MALL HAUL  ·  zone: the left hanging rail
**A cluster of 1990s clothes and accessories on pink velvet hangers**, hanging together: a butterfly-
print slip dress, a denim jacket, a faux-fur shrug, a shell top — plus a small handbag and a pair of
sunglasses hooked over the rail. Bright, glossy, mall-bought.
`-full`: six or seven pieces, richly varied in colour and fabric.
`-empty`: **three bare pink velvet hangers**, nothing on them.
**Out:** `closet-item-mallhaul-{full,empty}.png`

---
---
# QC — every object, before delivery

1. **Transparent background**, no baked drop shadow, no floor, no backdrop.
2. **Light from the upper left**, warm — identical across all twelve. Put two finished objects side
   by side; if the light disagrees, they are wrong.
3. **Slight three-quarter angle from just above** — consistent across all twelve.
4. 2048×2048, object centred.
5. **No text, no titles, no logos, no faces** anywhere — every surface the site prints into is blank.
6. Both `-full` and `-empty` exist, identical in position, angle and lighting.
7. Rendered richly enough to hold up zoomed in. These are the things a member collects.
8. Style matches the room: vibrant 90s realism, **not comic, not pixel.**

**Sanity check at the end:** drop all twelve `-full` objects onto the approved room render at their
zones. They must look like they were photographed in that room. If any one looks pasted on, it is the
light or the angle — fix that object, not the room.
