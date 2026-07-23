# Town Hall — Civic Square. Mayor Deb's office and the hall of the town's own (the Regulars). The building's job is civic: see the mayor, meet the locals who live here, and leave a comment on the pile that actually gets read. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `town-hall.html` · Priority: **med** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** See the mayor, meet the locals, leave a comment.

## Current state
Shortest building page in town (h 1,253) and already the RIGHT idea structurally — it is the only Tier-B page built as true hub-and-reveal: three buttons open panels in place, one at a time, with a working HASH_MAP for deep links. What fails the mechanic test: art 0/4, trapped in the 760 centre column, and the three hubs are generic gold-gradient SVG coins (a little house / a speech head / an envelope) sitting ABOVE a beautiful-but-inert civic-chamber render used as a ~216px header strip. The render already contains all three real objects the hubs stand for — a corkboard of heart-pushpinned notices (left), a curved reception counter with a brochure rack (centre/right), and the mayor's station behind the rail — none of them clickable. So: the verb is present, the content works, but you operate icons floating over a photo instead of operating the room. This is a finish-and-reframe, not a rebuild. Everything below the hubs already works and must be preserved: Deb's origin-story archive, two audio tracks, the 1999 + NOPE poster gallery with print downloads, the Regulars grid, the Town Regular → Closet picker, and the live Supabase comment form.

## THE MECHANIC (the one idea)
The civic lobby IS the interface — you are standing INSIDE Town Hall, and the three things you operate are three real objects in the room, not three icons hovering over a picture. Deb is seated at the mayor's counter (click her → her office opens); the heart-pushpin noticeboard hangs on the wall (click it → meet the Regulars who live here); the comment drop-box sits on the reception desk (click it → leave a card). Each object wears an always-visible brass placard that STATES its state in plain words on arrival — no hidden hotspots, no pin-hunting. Click an object and its panel opens in place below, exactly the hub-and-reveal the page already runs. Same proven pattern as the Post Office (the room is the interface, one open at a time, the building tells you the truth), just with Town Hall's own three counters.

## Key elements
### The civic-lobby stage (full-bleed room) `[REWORK]`
A straight-on daylit render of the Town Hall lobby filling the first viewport — the ROOM you stand in, not a 216px header strip. Deb seated at the mayor's counter on the left, the heart-pushpin noticeboard on the wall centre, the comment drop-box on the reception desk right. Title 'Town Hall.' and the one-line lede sit IN-SCENE, lower-left over a clear floor area (homepage pattern: text over the picture, left-aligned), never in a boxed column.
- **Behaviour:** Static stage. The three objects inside it are the controls. On hover/focus a station lifts via a brightened clip of the same render (Post-Office technique) so the real light in the room responds — never a coloured CSS chip bolted on top.

### Station 1 — Deb at the mayor's counter ('see the mayor') `[REWORK]`
Deb herself, seated at her curved counter (she is the building's keeper, per the town-keeper roster — her scene is the hero, present in the room). A brass placard reads: 'MAYOR'S OFFICE · Deb is in.' with a smaller line '(She always is. She cannot Deb-flect out of it.)'
- **Behaviour:** Click Deb/the counter → the existing hub-deb panel opens in place. State-on-arrival: the plate already tells you she's in before you click — honest, because canonically she can never leave.

### Station 2 — the heart-pushpin noticeboard ('meet the locals') `[REWORK]`
The corkboard of heart-shaped pushpins already canon in the render, holding curling index cards — one pinned card per Regular. Brass placard: 'THE NOTICEBOARD · The people who live here — N pinned this week.'
- **Behaviour:** Click the board → the existing hub-characters panel opens: the four Regular portrait cards (Mme CLAi-O, FAiRY Godmother, DJ SunnyV, Mayor Deb), each linking to that character's own building, plus the Town Regular picker. Count in the plate is real (roster length), not decorative.

### Station 3 — the comment drop-box on the reception desk ('leave a comment') `[REWORK]`
A slotted civic comment box sitting on the counter beside the brochure rack. Brass placard states your real state: first-timer → 'COMMENTS · Drop a card. Deb reads them (then Deb-flects).'; returning → 'COMMENTS · Your last card is on the pile.' (read from a localStorage filed-flag).
- **Behaviour:** Click the box → the existing hub-feedback panel opens the live Supabase form. Keep the compliment/complaint/suggestion chips, subject, note, char-count, and both anon + signed-in outcomes.

### Deb's office panel (content) `[KEEP]`
The 'How Deb became mayor' archive (Die Hard poster saga, Deb-flection™, the intern), the two audio tracks (Loop Me Out / Deb's Tomorrow Problem via playLaidiesTheme), the 1999 campaign poster + NOPE trilogy gallery with print-download links, and the LUMINAiRY saint tie.
- **Behaviour:** Opens in place from Station 1. Unchanged wiring; only the panel chrome is recoloured off gold+plum onto the candy palette.

### Regulars grid + Town Regular → Closet picker `[KEEP]`
Four portrait cards linking to each character's building, and the picker that writes laidies_town_regular (read by the Closet's Your Luminaries band on laidies-card.html).
- **Behaviour:** Opens in place from Station 2. localStorage read/write, is-picked/is-town-regular highlighting, and the Closet cross-link all stay exactly as built.

### Supabase comment form `[KEEP]`
town_hall_feedback insert: submission_type, subject, body, char count, plus user_id/submitter_email when signed in; graceful offline + error copy.
- **Behaviour:** Opens in place from Station 3. Do not touch the Supabase logic; on success, set the localStorage filed-flag so Station 3's plate flips to 'on the pile.'

### Hub controller + HASH_MAP + one-open-at-a-time `[KEEP]`
The existing .th-hub JS: closeAll/open, aria-expanded, scroll-into-view, and HASH_MAP so #regulars / #town-hall-feedback / #hub-deb auto-open their station.
- **Behaviour:** Reuse as-is; just rebind the three triggers from the gold-coin buttons to the three room objects. Keep every existing hash alias working.

### Visitors Centre CTA + page scripts `[KEEP]`
The 'New in town? Welcome Wagon' CTA, plus header/footer/analytics/charm-hunt/KSVL-player/ai-accent/directory scripts.
- **Behaviour:** Keep. charm-hunt.js places charms by % inside .sv-hero — that container MUST survive the reframe (same trap the Post Office hit).

## Design direction
Full-bleed civic lobby fills the first screen — kill the 760 centre column with PAGE-SCOPED overrides only (do not edit the shared main{max-width:760px} in sunnyvaile-page.css; the Post Office moved nothing else and this must not either). Keep the .sv-hero wrapper alive for charm-hunt.js. Top-to-bottom shape: (1) the room stage edge-to-edge, with 'Town Hall.' and a one-line lede set in-scene lower-left over clear floor, left-aligned — 'Deb's office. Civic Square. She's been here longer than anyone.'; (2) the three labelled objects living in that render, each with an always-visible brass placard so the page states your position before any click (state-on-arrival rule — Ali rejected numbered hotspots as annoying UX); (3) the active panel opening in place below the room, one at a time, reusing the current controller. Retire gold+plum entirely (the is-open hub gradient, the --gold borders, the plum→rose panel fills are all on the kill list) — recolour onto the homepage candy system: pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7, ink #3a1838 on cream #fffdfb. No emoji and no gold SVG coins in chrome (both retired for section chrome). Type: Jost display for the title, clean sentence-case headings, the existing Playfair accents inside panels are fine. Collapsed height stays short (it is already the shortest page at 1,253 — length is not the enemy here; inertia is), target ~1,400–1,800px with panels closed, never a long scroll. Mobile (one @media block, class selectors so it wins by source order): the wide room can't composite three stations on a phone, so it restacks into a vertical list of the three labelled objects as full-width tiles (object thumbnail + brass placard + state line), tap to open the same panels; hero and panels just reflow. Style register for the NEW render: the locked 'crisp, clean, high-fidelity, dimensional — a realistic drawing that's clearly a drawing' bar (Fairy Godmother house v6 crispness), NOT the softer painterly/photoreal register of the current interiors, and NOT cottage-core (the Post Office lobby got rejected for exactly that). Brand spelling stays accented: SUNNYVAiLE / LUMINAiRY / RAiDIO / CLAi-O.

## Signature detail (the 'cool S' of this building)
A little brass reception service bell on the mayor's counter with a curling index card taped beside it in ballpoint: 'RING FOR DEB —' and under it, smaller and slightly cramped, '(she will not come. she has looped herself out.)'. Tapping the bell plays a soft single ding — and then Deb's office opens anyway, because she cannot actually Deb-flect out of being the mayor. It's period-authentic (the Y2K civic-counter service bell), pure canon (Deb-flection™, 'the intern was supposed to handle it'), and it's the town's whole joke about her compressed into one object you can touch. Supporting texture, not competing: every notice on the board is held by a mismatched candy-coloured heart-shaped pushpin (already canon in the render).

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `ep00.splash.b1of1.town-hall-civic-lobby-operable.g3.r01` | codex-render | **YES — this is the interface** | new | The operable stage — the room that IS the interface. This is the single big new ask; it replaces the inert 216px header strip and the three gold-coin buttons. |
| `assets/building-interiors/town-hall-deb-desk.jpg` | codex-render | decorative | exists | Likeness + composition reference for Deb in the new stage; also stays as the figure image inside the opened Mayor's Office panel. |
| `assets/building-interiors/town-hall-civic-chamber.jpg` | codex-render | **YES — this is the interface** | exists | Interim fallback: if Ali wants to ship before the new straight-on stage lands, this render can carry clip-path hotspots over its existing corkboard / counter / mayor-station furniture (the Post-Office technique). Otherwise retire it from the hero once the new stage is in. Note it is in the softer painterly register that risks the cottage-core rejection. |
| `assets/pixel-restyle/characters/[mme-claio|laidy-fairy-godmother|dj-sunnyv|mayor-deb]-portrait-pixel-v1.png` | codex-render | decorative | exists | Reused as the pinned index cards on the noticeboard panel and as the Regulars grid cards — no new art. |
| `assets/printables/deb-1999-campaign-poster + deb-nope-poster (existing set)` | codex-render | decorative | exists | Reused unchanged inside the Mayor's Office panel poster gallery. |
| `th-brass-placard-and-taped-card` | css/svg | decorative | new | The always-visible state labels sitting over each of the three stations — the state-on-arrival surface. Hand-built, not a render. |

**`ep00.splash.b1of1.town-hall-civic-lobby-operable.g3.r01`** — Straight-on, daylit wide render of the SUNNYVAiLE Town Hall lobby, crisp dimensional Y2K illustration (realistic drawing that is clearly a drawing — Fairy Godmother house v6 crispness; NOT photoreal, NOT loose-painterly, NOT cottage-core). Three clearly separated stations across the room, each with a clean flat area above it for a brass placard: LEFT — Mayor Deb (match the likeness in town-hall-deb-desk.jpg: curly dark hair, glasses, jewel-tone shell-suit blouse) seated at a curved marble civic counter with a beige Y2K CRT, a little brass service bell and a taped index card beside it; CENTRE — a cork noticeboard on the wall pinned with curling index cards held by mismatched candy heart-shaped pushpins; RIGHT — a reception desk with a slotted civic comment/suggestion drop-box and a Y2K brochure rack. Cream + plum-from-artwork + teal + candy accents, SUNNYVAiLE geometric floor, a window to Civic Square. Empty of any UI/text chrome (placards and labels are added in CSS). Composition must read straight-on so CSS controls composite onto the furniture.

**`th-brass-placard-and-taped-card`** — CSS/SVG chrome: a small engraved brass placard plate and a taped-ballpoint index-card treatment, in the candy palette (no gold-gradient coin, no emoji).

## Reuses existing
Almost everything below the hubs is reused verbatim: the .th-hub one-open-at-a-time controller + HASH_MAP deep links; the full hub-deb panel (Deb archive, two audio tracks via playLaidiesTheme, 1999 + NOPE poster galleries with print downloads, LUMINAiRY tie); the hub-characters panel (Regulars grid + Town Regular → Closet picker writing laidies_town_regular); the hub-feedback Supabase town_hall_feedback form; the Visitors Centre CTA; and all header/footer/analytics/charm-hunt/KSVL-player scripts. Reused art: town-hall-deb-desk.jpg (as Deb reference + panel figure), the four -portrait-pixel-v1.png Regulars, and the Deb printables. The ONLY genuinely new asset is the one straight-on operable lobby stage; the brass placards are hand-built CSS.

## Pitfalls (do not)
- Do NOT rebuild — this is the one Tier-B page already built as correct hub-and-reveal. Rebind the three triggers to the room objects and keep the controller, the Supabase form, the Town Regular→Closet picker, and the audio. Removing any is a working-feature deletion.
- No hidden hotspots / numbered pins. Ali explicitly rejected 'hit random hotspot numbers' as annoying UX — every station wears a visible brass placard that states its state before any click.
- No 'shitty CSS boxes slapped on a background.' Controls must read as the room's real furniture; the hover light-up is a brightened clip of the same render (Post-Office method), never a coloured chip bolted on.
- Keep the .sv-hero wrapper — charm-hunt.js positions charms by % inside it; the Post Office nearly broke this.
- Page-scoped CSS only. Do not touch the shared main{max-width:760px} in sunnyvaile-page.css — breaking the shell for all 14 buildings is still Ali's open call.
- Gold + plum are retired everywhere, not just recoloured: the is-open hub gradient, --gold borders, and plum→rose panel fills must be redesigned onto the candy palette, not hex-swapped.
- Commission the new stage in the locked crisp-drawing register, not the softer painterly/photoreal look of the current interiors — that register risks the same cottage-core rejection the Post Office lobby got.
- Brand spelling: SUNNYVAiLE, LUMINAiRY, RAiDIO, CLAi-O with the accented Ai; plain 'AI' only for the technology (not present here).
- State must be REAL: the noticeboard count = actual roster length; the comment-box plate flips via a localStorage filed-flag set on successful submit. If a state can't be answered honestly, say so plainly rather than faking it.

## Open questions for Ali
- Noticeboard state: pin the four Regulars only (real, already on the page), or also surface a real 'latest town notice / State of the Town' if a data source exists? Canon says a State of the Town is posted yearly on the KSVL bulletin board — is there a feed to pull, or does the board stay Regulars-only for now? Recommend Regulars-only unless a source is confirmed (no invented feed).
- Operable technique: bake the three objects into ONE straight-on stage with brass-placard click-zones (simpler, recommended), or composite the three objects as separate alpha PNGs on a room backdrop for library-style lift (heavier)? Ali's call.
- Keep both existing interiors, or retire the 3/4 civic-chamber render once the new straight-on stage lands? Recommend retiring it from the hero but keeping deb-desk.jpg inside the Mayor's Office panel.
- Service-bell ding: ship the audio cue, or placard-only if it competes with the KSVL player audio (audio-bleed has bitten other pages)? Recommend a very short, one-shot, muted-by-default ding.

## Sequencing
High leverage for the effort: the structure, content, and JS are already correct, so this is mostly one new render + rebinding three triggers + a palette redesign — cheaper than Post Office or Library. But it is NOT a marquee proof; sequence it AFTER the Post Office verdict and the Library promotion land, since those establish whether Ali wants separate-alpha objects vs. clip-path-on-one-render, and this page should follow whichever technique she blesses rather than inventing a third.

