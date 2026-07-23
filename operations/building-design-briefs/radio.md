# KSVL RAiDIO — the town's broadcast station. Music all day: DJ SunnyV at the mic, the ten SUNNYVAiLE bands, saint themes, the anthem on the hour, jingles/weather/fake commercials in the Live rotation. Motto (locked): "Don't just learn from books. Learn from hooks." Frequency locked at 99.9 FM (never 104.7). — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `radio.html` · Priority: **med** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** tune in

## Current state
Tier C, best of the broken pages (audit: art 0/7, column 760, h 1,818). The verb genuinely works: Tune In Live sits ON the hero, KSVL_startLive() runs a real Live rotation (jingles, ads, weather), and the stream persists site-wide via content/site/ksvl-player.js (one player everywhere + pop-out — a hard rule). Hub-and-reveal already shipped here ("The Counters": Mix CDs / The Bands / Sticker Counter / Call In a Request, one open at a time, HASH_MAP deep links). The panels hold real, working mechanics: 6 Sharpie-labeled Mix CD cases (art exists, rendered by the player), 10 band albums with real cover art + 3D flip-to-tracklist + play, 20 real sticker PNGs with a pick-3-free + earn API (localStorage), and a Supabase-backed song-request form with a sign-in hold. What fails the standard: the hero art (assets/building-interiors/ksvl-booth.jpg, 1500x844 — a gorgeous STRAIGHT-ON studio room) is cropped to a ~216px strip and never referred to again; the four counters are text cards with retired gold-gradient SVG coins; the Live band, request form, band pills and sticker badge are all gold+plum (retired); everything sits in the banned 760px centre column; and the page never tells you your state (am I tuned in? what's playing? how many stickers do I have?) — the persistent bar does, but the page itself doesn't. This is a FINISH + REFRAME, not a rebuild: every mechanic and almost every image already exists.

## THE MECHANIC (the one idea)
THE BOOTH IS THE TUNER. The physical object you operate is DJ SunnyV's mixing console — the full ksvl-booth.jpg room, uncropped and full-bleed, becomes the page. The ON AIR sign in the art lights up (brightened clip-path copy of the same image, Post Office technique) only when you are actually tuned in — real state, not decoration. You press the board to tune in (the existing KSVL_startLive, now anchored to the console itself via an FM dial). The studio furniture around the console IS the counter row: the CD stacks on the right shelves open the Mix CD rack, the album wall opens The Bands, the heart-topped mics open the request line, the sticker sheet on the desk opens the Sticker Counter — each opens its existing panel in place directly below the room. Exactly the library's "the shelf IS the interface," in radio: the room you walked into is the thing you operate.

## Key elements
### Full-bleed booth hero (the room) `[REWORK]`
assets/building-interiors/ksvl-booth.jpg shown WHOLE (1500x844, straight-on console, ON AIR sign, record walls, mics, dusk window) — currently cropped to a strip by the shared sv-hero shell. Keep the .sv-hero wrapper element (charm-hunt places charms by % inside it) but page-scope its height to show the full room, ~810px at 1440.
- **Behaviour:** On arrival it IS the station. The ON AIR sign region lights (brightened clip-path copy of the same photo) when the player state is live/playing; dark when not. No hover-hunting: every operable furniture zone carries a small always-visible plain-word label tab.

### State line — the page tells you where you stand `[NEW]`
Big Jost display type set INTO the art (over the dusk window band, the natural marquee): tuned in → "ON AIR · 'Told You So' — The Predicts"; not tuned in → "SUNNYVAiLE is broadcasting. You're not tuned in." Real data from the one player (add a tiny additive getter, e.g. window.KSVL_nowPlaying(), to ksvl-player.js — never a second player).
- **Behaviour:** Updates live while you listen; states in plain words on arrival per the building-pages-tell-you-your-state rule. Sticker state is also told, inside its counter: "You have 4 of 20."

### Tune In Live on the hero + FM dial `[REWORK]`
The existing hero Tune In button (KEEP — the audit's one pass) re-seated as part of the console: a CSS/SVG FM dial strip with the needle parked at 99.9, plus the pressable TUNE IN control. Keep the window.KSVL_startLive() wiring and the header link-interceptor behaviour untouched.
- **Behaviour:** Press → live rotation starts, ON AIR lights, persistent bar appears (unchanged). The dial is also the signature gag — see signature_detail.

### The four counters = furniture hotspots (replaces the text-card hub row) `[REWORK]`
Clip-path polygon hotspots over real furniture in the render, each with a visible label tab: CD spindle stacks → Mix CDs · album-cover wall → The Bands · heart-topped mics → Call In a Request · sticker sheet on the desk corner → Sticker Counter (needs one small composited cutout, see images). Light-up = brightened copy of the same photograph clipped to the shape — NEVER coloured CSS chips on the art (Post Office v1/v2 rejection).
- **Behaviour:** Click a zone → its existing panel opens in place below the room; click again to close; one open at a time. KEEP the existing hub JS, aria-expanded handling and HASH_MAP (#hub-mixcds, legacy #ksvl-* anchors still auto-open). Mobile: hotspots collapse to a 4-button labeled list under the hero (Post Office fallback pattern).

### Mix CDs panel `[KEEP]`
KEEP working feature: the rack rendered by ksvl-player.js into #ksvl-mix-cds — 6 Sharpie-labeled mini CD cases (art exists: assets/brand/ksvl-cd-mini-*.png) + All Songs. Free = stream; "Burn this CD" paid download is locked future canon (ksvl-mix-cd-monetization) — do not fake it.
- **Behaviour:** Click a case → that mix plays through the one player. Restyle panel chrome off gold+plum to candy accents; the CD art itself is already operable art.

### The Bands panel (the record wall) `[KEEP]`
KEEP working feature: 10 album cards with real cover art (assets/albums/*.png), 3D flip to tracklist, play-album and play-track buttons calling KSVL_startAlbum. The glyph-labeled buttons are the approved KSVL player design — keep glyphs, recolour the gold coins to candy.
- **Behaviour:** Tap cover → flips to tracklist; ▶ plays whole album; track rows play that track. Unchanged logic, restyled shell (kill gold format-pill and gold track-icon coin).

### Sticker Counter panel `[KEEP]`
KEEP working feature: 20 real vinyl sticker PNGs (assets/stickers/ksvl/), pick-3-free with confirm, earned/locked states in localStorage, and the global window.KSVL_stickers earn API other pages call. Includes ksvl-sticker-banner.jpg as the panel's counter image.
- **Behaviour:** State first: "You have N of 20 — pick up to 3 free" / "the rest unlock as you listen." Selection, confirm, and earn behaviour unchanged; restyle the gold ✓ badge and legend to candy.

### Call In a Request panel (the request line) `[KEEP]`
KEEP working feature: style/topic/lyrics form inserting to Supabase ksvl_song_requests, with the sign-in-hold (saves to device, prompts sign-in). Currently a gold-on-plum gradient card — full restyle. Dress the panel with DJ SunnyV herself (assets/town-characters/scenes/dj-sunnyv-scene.png — the keeper taking your call).
- **Behaviour:** Fill it in → sent to DJ SunnyV; signed-out → request held on this device with honest copy (existing logic). Fix the stale sign-in link label (it points to /resident-card.html but says "MAiKEOVER").

### Persistent now-playing bar + pop-out `[KEEP]`
Site-wide chrome from ksvl-player.js (bottom bar, ⧉ RealPlayer-style pop-out, gesture-resume, single-player rule). THE thing the audit says to keep.
- **Behaviour:** Untouched by this build. Its gold top-border is site-wide chrome — flag for Ali, do not restyle unilaterally from this page.

### Resident Card trip tie (song pick) `[KEEP]`
KEEP: the customization-is-a-trip block — your Resident Card song is chosen here at KSVL.
- **Behaviour:** Stays at page bottom, restyled to candy/ink; link to /laidies-card.html unchanged.

### The redundant third Tune In banner (.ksvl-live-band) `[REWORK]`
A gold+plum "NEW TODAY / Tune in to KSVL Live" card duplicating the hero button AND the eyebrow button — three CTAs for one verb.
- **Behaviour:** Fold its copy (jingles, weather, commercials from every building) into the hero state area as the not-tuned-in subline. This reorganizes, not deletes — the action and the copy both survive, once.

## Design direction
Top to bottom (~2,100px target, comfortably under the 2,500 bar; page is 1,818 today so this must not grow): (1) global header; (2) FULL-BLEED booth room, edge to edge, ~810px tall — kill the 760px column with page-scoped CSS only (⛔ do not touch the shared main{max-width:760px} in sunnyvaile-page.css; whether to break that shell for all 14 buildings is Ali's open call). The room is dusk/neon, which sits naturally on the homepage's dark register: page field near-black aubergine #1c0f1c (the measured homepage hero value), NOT cream — the render's dark edges dissolve into it. Title + state line set INSIDE the art over the window band, Jost 800, state at display scale (~58px; \"the telling IS the display type\"), RAiDIO with the accented Ai span; (3) the FM dial/tune-in strip along the console's bottom edge; (4) the four labeled furniture hotspots living in the render itself — no separate card row on desktop; (5) the single open panel, in place, on a dark panel field with candy accents — pink #e982ab, teal #57b6c0, coral #ec7a78, periwinkle #b3abe7, tangerine #f4a636, sky #8bbde9 — buttons are solid candy fill with DARK plum text at 10px radius (homepage-measured; not pills, not white text, ⛔ zero gold #c9a227 and no plum panel fills); (6) Resident Card trip tie; (7) footer. Type: Jost display throughout per the homepage bar (drop the Playfair italics this page leans on). No emoji in chrome (the player's approved glyph buttons ▶/⧉ stay). Mobile (@media max-width:760px): hero shows a crop of the console, hotspots become a 4-button labeled list, one authoritative spacing block at the end of the page's style per the mobile-spacing rule; viewport meta already present.

## Signature detail (the 'cool S' of this building)
The dial only gets one station. The FM tuner strip (hand-built CSS/SVG: back-lit scale, 88–92–96–99.9–104–108 in Jost numerals, a red needle parked dead on 99.9) is draggable — but nudge it anywhere else and you get a half-second of soft radio static while the needle springs back to 99.9, with a one-line caption: \"SUNNYVAiLE only gets one station.\" Period-authentic (every 90s girl knew the exact resistance of a tuner wheel), honest (it never pretends other stations exist), and it doubles as the tune-in control — landing the needle on 99.9 is what calls KSVL_startLive(). Static clip must be a tiny one-shot on explicit gesture only, routed so it can never fight the live stream (audio-bleed caution).

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `ksvl-booth-room` | codex-render | **YES — this is the interface** | exists | THE room / the operable hero. Hotspot zones: right-shelf CD stacks (Mix CDs), album-cover wall (Bands), boom mics (Request), ON AIR sign (live-state light-up), console (tune in). |
| `ksvl-sticker-sheet-desk-cutout` | codex-render | **YES — this is the interface** | new | Operable anchor for the Sticker Counter hotspot. |
| `fm-dial-tuner` | css/svg | **YES — this is the interface** | new | The tune-in control + signature detail. Chrome, so hand-built — no render, no emoji. |
| `hotspot-lightups` | css/svg | **YES — this is the interface** | new | Hover/active feedback and the live-state light without CSS chips on the photo. |
| `album-covers-set` | codex-render | **YES — this is the interface** | exists | Operable record wall in the Bands panel (flip + play). |
| `ksvl-cd-mini-cases` | codex-render | **YES — this is the interface** | exists | Operable Mix CD rack. |
| `ksvl-sticker-set` | codex-render | **YES — this is the interface** | exists | Operable sticker grid (pick 3 / earn). |
| `ksvl-sticker-banner` | codex-render | decorative | exists | Sticker Counter panel header image (decoration inside the panel, not the operable control). |
| `dj-sunnyv-scene` | codex-render | decorative | exists | Dress the Call In a Request panel — DJ SunnyV is who you're pitching. Portrait aspect suits an in-panel figure, not the hero (the landscape booth is the hero). |

**`ksvl-sticker-sheet-desk-cutout`** — NEW — small RGBA cutout, straight-on, transparent surround (library lesson: fresh render, never pixel-surgery; verify alpha channel before wiring): a fanned pile of KSVL vinyl stickers on a wood desk corner matching ksvl-booth.jpg's desk tone/light, top sticker reading "KSVL 99.9" rendered IN-generation. Composites onto the empty front-left desk area to give the Sticker Counter a real furniture anchor — the one counter with no object in the existing render.

**`fm-dial-tuner`** — Hand-built CSS/SVG tuner strip: backlit scale 88–108 with 99.9 marked, red needle, Jost numerals, candy-accent glow on dark; drag/snap behaviour in JS.

**`hotspot-lightups`** — Brightened clip-path copies of ksvl-booth.jpg per furniture zone (the Post Office light-up technique — the real light in the room lifts). Includes the lit ON AIR state. Pure CSS filter + clip-path over the same file; no new art.

## Reuses existing
Nearly everything. This is FINISH + REFRAME: the hero art already on the page contains the whole operable room (it is merely cropped); the persistent player, Live rotation, Mix CD rack, band flip-wall, sticker economy with earn API, Supabase request form, hub-and-reveal JS with hash deep-links, and the trip tie all work today and are kept. The only genuinely new pieces are one small RGBA sticker-pile cutout, the CSS/SVG dial, a now-playing getter added to ksvl-player.js, and the restyle off gold+plum/760px. The page can ship with ZERO new Codex renders (Sticker Counter falls back to a labeled tab on the desk zone until the cutout lands).

## Pitfalls (do not)
- ONE PLAYER, EVER. Never add a second audio player or a parallel state key — extend content/site/ksvl-player.js (?v bump site-wide when touched, all ~59 pages + the header's internal loader ?v). The 2026-07-12 homepage regression is the cautionary tale.
- Do not break saveState semantics: ctx whitelist, no removeItem-on-idle, popup heartbeat. Any new context must be added to BOTH saveState and hydrateFromStorage.
- Keep the global names the site depends on: KSVL_startLive, KSVL_startAlbum, KSVL_playTrack, KSVL_tracksForArtist, KSVL_stickers (other pages call the earn API), and the HASH_MAP anchors (#ksvl-stickers etc. are deep-linked from puffy bookmarks/tours).
- Keep .sv-hero as the hero wrapper element — charm-hunt.js places charms by % inside it (Post Office trap). Restyle it, don't replace it.
- Page-scoped CSS only. Do NOT edit the shared main{max-width:760px} in assets/sunnyvaile-page.css — breaking the shell for all 14 buildings is Ali's open call.
- No coloured CSS chips/boxes laid over the render (Ali: 'shitty css boxes slapped on a background'). Light-ups are brightened clips of the same image; the sticker anchor is a real rendered cutout with verified alpha.
- No hidden-hotspot hunting: every furniture zone gets an always-visible plain-word label, and the page states your position (on air / not tuned in / sticker count) in words on arrival.
- Never fake a mechanic: no functional-looking REC/tape button (recording isn't real), no 'Burn this CD' checkout (paid tier not built — if shown at all, it tells the truth like the Post Office parcel window and the library's dimmed books).
- Gold #c9a227 + plum panel fills are retired — this page is one of their last strongholds (live band card, request form, hub icons, sticker badge, band pills). Redesign, don't recolour in place.
- 99.9 FM only — never 104.7 (stale pre-canon). RAiDIO/Ai spans per the ai-letters rule; standalone tech 'AI' stays plain caps.
- Don't remove working features while consolidating the three Tune In CTAs — the copy and the action move into the hero, they don't vanish. Hub panels reorganize, never delete.
- Album art generations: assets/albums/ is live; assets/album-covers-v2/ holds newer variants — never mix generations, confirm the current set with Ali before any swap.
- Static sfx on the dial: one-shot, gesture-only, must never overlap/fight the live stream (audio-bleed history in previews).
- Verify in the browser at 1440 and 375 (measure column width, page height, hotspot alignment) — do not self-certify; Ali rates.

## Open questions for Ali
- Sticker Counter anchor: commission the desk-corner sticker-pile cutout, or ship v1 with a labeled tab on the desk zone and add the cutout later?
- OK to fold the '.ksvl-live-band' banner and the eyebrow duplicate into the single hero tune-in (three CTAs → one)? The copy survives in the hero state area.
- The persistent bottom bar is still plum-with-gold-trim site-wide chrome — restyling it touches every page; separate decision, whose call/when?
- Should DJ SunnyV appear in the hero room itself (a future re-render placing her at the board, Penny-style) or stay in the request panel? Current booth render is empty, which matches the storefronts-empty rule; keeper scenes argue the other way — Ali's call.
- Dial static sfx: yes/no? Works fully silent (needle snap + caption) if she'd rather no extra audio.
- The hero button's current hot-pink #ff6ec7 glow is off-palette (closest candy is pink #e982ab) — keep the neon register or snap to the measured palette?

## Sequencing
Natural second-or-third proof of the building-mechanic standard: the audit ranks KSVL last-broken (its verb already works), and — unlike Post Office/Library — it needs no blocking art, so it can build immediately as the cheapest full demonstration of hotspots-on-existing-art. Suggested order: (1) ship v1 with existing renders only (hotspots, dial, state line, de-gold restyle, page-scoped full-bleed); (2) commission the sticker-pile cutout in parallel and composite when delivered; (3) hold the album-cover-v2 swap and any bottom-bar restyle for Ali's separate decisions. Wait for Ali's verdict on the Post Office pattern before mass-producing this pattern further, but this page is safe to build as its own proof since it reuses shipped mechanics.

