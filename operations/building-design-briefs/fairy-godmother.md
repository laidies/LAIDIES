# FAiRY Godmother's house — Willow Lane (between MAiKEOVER and the Mall). The town's own AI advice assistant: brings advice in a Patron Saint's energy AND glows up a rough prompt into a real brief. Canon: "David Rose (or any other Patron Saint), on tap." Never claim "any prompt" or unlimited — wishes are capped on purpose. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `games/fairy-godmother.html` · Priority: **low** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Fix a stuck prompt (and get advice on the question you're not sure how to ask)

## Current state
Tier D — ALREADY BEHAVES (audit: near-full-bleed 1394, h 1,786). This is a POLISH/coherence brief, not a rebuild. What genuinely works and must survive intact: (1) the Cloudflare-Worker advice engine (WORKER_URL laidies-fairy-godmother) with 8 energies (auto + Dolly/Miranda/Elle/Cher/Sophia/David/Buffy), markdown response with PROMPT GLOW-UP + POST-GLOW-UP sections, per-section Copy buttons, the Shorter/Warmer/Firmer/More senior revision row (a second worker call that swaps the draft in place); (2) the newsletter gate (1 free wish → Buttondown signup via laidies-subscribe worker, subscriber state in localStorage, friendly 429 handling); (3) "Surprise me" random energy+starter prompt; (4) wisdom counter, 3-item history, fairy-favorite badge at 10 (writes laidiesSecretBadges); (5) the KSVL song button (game-ask-laidy.mp3), mini-player, analytics, Enter-to-submit. The coherence failures: interactive area is a 720px centre column (.game-page-wrap max-width:720); gold #ffd700 saturates the page (gradient h1, eyebrow, sparkles, badge border) and the response is a brown-parchment "medieval scroll" (#d4a574/#8b4513, Dancing Script cursive) — gold is retired and parchment is the banned fairytale kit; the energy picker is a bare <select>, not a picture you operate; emoji in UI chrome (✨ wand button, 🌟 surprise, 📜 history header); the building art is an inert 160–300px exterior strip (systemic cause #2) while the delivered parlor interior (fairy-godmother-parlor.jpg — desk, nameplate, cream phone, basket of pink envelopes, corkboard of notes) sits unused; no state on arrival (the gate ambushes you AFTER you type); h1 accents only the "i" of FAiRY instead of the "Ai" pair; and the character portrait on the page (laidy-fairy-godmother-portrait-pixel-v1.png) is flagged "redo" in operations/ops/curation.json — it must come off the page.

## THE MECHANIC (the one idea)
THE DESK IS THE CONSOLE. You sit down at the FAiRY Godmother's writing desk in her Willow Lane parlor. The physical object you operate is her desk: you write your wish on the memo pad that sits on it (the textarea IS the pad, composited into a straight-on room render exactly like the library's 3-bay case sits in its room), you pick a saint by touching one of the seven Patron Saint mini-cards propped along the back of the desk, and you wave her actual wand (the wand image is the submit button). Her answer comes back in place as a note on her stationery — not a parchment scroll — and past wishes pin themselves to the corkboard on the wall beside the desk, the same corkboard of thank-you notes that's already in her delivered interior render.

## Key elements
### Arrival state line `[NEW]`
Plain-words wish status in display type over the top of the room, computed before any interaction (per building-pages-tell-you-your-state + the 'telling IS the display type' corollary)
- **Behaviour:** On load, in big Jost display type: 'Wishes are limited, honey.' + your real position — e.g. 'You have 1 free wish' / 'You're in — wishes left today' / 'Out of wishes. Come back tomorrow.' Computed from existing localStorage keys (laidies_subscriber, laidies_free_wishes_used); if the worker-side daily cap can't be read honestly client-side, say so plainly ('Subscribers get more — the Godmother keeps count') rather than fake a number. Never says 'unlimited'.

### Worker advice engine + gate + revisions + copy controls `[KEEP]`
The entire JS mechanic: runWand(), callWorker(), showResponse(), extract/inject GLOW-UP sections, revision row, newsletter gate flow, badge, history state, Surprise me
- **Behaviour:** UNCHANGED logic. Only the containers it renders into are restyled. Do not touch WORKER_URL, SUBSCRIBE_URL, the localStorage contract, or the markdown section parsing (the worker's output headers are load-bearing).

### The desk console (room-integrated) `[REWORK]`
A straight-on parlor render with the writing desk across the lower third; the textarea composited onto the memo pad on the desk surface via % insets inside a .fgroom wrapper (library .libroom/.unit pattern)
- **Behaviour:** You type your wish directly 'on the pad'. Focus glow is a candy-pink ring. The existing AI-anonymize disclosure sits under the pad as a small printed line on the desk blotter. On mobile (max-width:760px) the room restacks: state line, saint cards as a horizontal scroll row, pad full-width — same graceful degrade the library shipped.

### Saint energy picker `[REWORK]`
The <select> replaced by seven small framed Patron Saint cards propped along the back of the desk (real card art from assets/saints/: dolly-parton, miranda-priestly, elle-woods, cher-horowitz, david-rose, buffy-summers; Sophia is the gap — see open questions), plus an 'auto' tile ('Let her pick')
- **Behaviour:** Click a card → it lifts/glows selected and sets the hidden energy value (same ENERGY_KEY_MAP). Arrow-key + focus states for a11y. The select element stays in the DOM (visually hidden) so existing JS and the Surprise-me path keep working unmodified.

### The wand (submit) `[REWORK]`
'Wave the Wand' button rebuilt around real wand art (assets/fairy-wand-comic-*.png — pick one, e.g. elegant-v1) instead of the ✨ emoji; 'Surprise me' becomes a plain candy button, 🌟 and 📜 emoji removed (no-emoji-ui-icons)
- **Behaviour:** Click = runWand() as today; loading state swaps label to 'The FAiRY Godmother is reading…' with a gentle wand-wiggle on the image, not an emoji.

### Response = her stationery, in place `[REWORK]`
The parchment scroll-card redesigned as 1990s girly stationery: pearl/blush note card, candy top-stripe, Playfair headline 'A note from the FAiRY Godmother', saint-energy tag as a small candy pill — zero #ffd700, zero brown parchment, no Dancing Script masthead
- **Behaviour:** Reveals in place below the desk exactly as now (same #adviceScroll ids). GLOW-UP copy buttons, callouts, revision row and the mirror-check disclosure all restyle to the stationery palette (ink #3a1838 on pearl, candy accents). Newsletter gate renders as the same stationery register.

### Corkboard history `[REWORK]`
The 3-item Past Wisdom history rendered as handwritten-register memo notes pinned to a cork panel beside/above the desk (echoing the corkboard in her delivered interior render), CSS/SVG cork + pins
- **Behaviour:** Each answered wish pins a note (question one-liner + 2-line excerpt, slight rotation, pin dot). Same adviceHistory array and 3-item cap. Badge at 10 wishes reveals as a special puffy-sticker note on the board instead of the gold dashed box.

### Masthead + title `[REWORK]`
The approved exterior 11-fairy-godmother-house-v6.jpg (curation: 'correct'; it is THE site art-style benchmark) stays as the walk-up masthead; title below it per site pattern
- **Behaviour:** Decorative arrival beat only — the operable room is the parlor below. Fix the h1 to accent the full 'Ai' pair (FAiRY = F + accent-Ai + RY), not just the 'i'. Keep the KSVL song button beside the title. REMOVE the redo-flagged pixel portrait (its floating circle + sparkle field goes; the character now lives in the new hero portrait, see images).

### Night-sky page shell + glitter `[REWORK]`
The dark aubergine gradient body and floating glitter field
- **Behaviour:** Keep the dark register (it matches the homepage's #1c0f1c bar) but retint: kill every #ffd700 glitter/sparkle hex, recolour particles to candy pink/periwinkle/pearl. Page height target stays ≤ ~2,200px (currently 1,786 — do not grow past 2,500).

## Design direction
Shape, top to bottom (target ≤ ~2,200px at 1440): (1) sv-header; (2) full-bleed masthead — the approved house-v6 exterior, slightly taller than today's strip (clamp ~220–360px), title block below it: eyebrow 'Willow Lane · SUNNYVAiLE', h1 'FAiRY GODMOTHER' at homepage scale (~64–75px Jost 800, Ai pair accented in pink #e982ab, no gold gradient), the one-line premise ('The sad dress walks in. The dress walks out.') and the song button; (3) THE ROOM — full-width .fgroom section: the new straight-on parlor/desk render edge to edge, arrival state line in display type across the room's upper wall, seven saint mini-cards propped on the desk shelf, the memo-pad textarea composited on the desk surface, wand + surprise buttons on the desk edge; (4) the stationery response + corkboard side-by-side beneath the desk (response left ~2/3, corkboard right ~1/3; corkboard stacks below on mobile); (5) minimal footer link back to SUNNYVAiLE. Kill .game-page-wrap's 720px cap for the room and response band — content runs full-bleed with the controls INSIDE the picture; only reading text (the response body) keeps a comfortable measure inside its stationery card. Colour: dark aubergine shell, pearl #fffdfb surfaces, ink #3a1838 text, candy accents pink #e982ab / periwinkle #b3abe7 / teal #57b6c0 (buttons = solid candy fill, DARK plum text, 10px radius per the measured homepage numbers — not the current white-on-plum pills). Type: Jost display + UI, Playfair for the note headline only. Zero #ffd700, zero parchment browns, no Dancing Script mastheads, no emoji in chrome. Hub-and-reveal is already satisfied — one console, answer opens in place, no long scroll.

## Signature detail (the 'cool S' of this building)
The corkboard of thank-you notes. Her delivered interior render already shows a corkboard crammed with pinned letters — make it live: every wish you get answered pins a slightly-crooked handwritten memo note (pushpin dot, 1–2° rotation, occasionally a puffy heart sticker) onto a real cork panel beside the desk, and the 10-wish merit badge arrives as a gold-star-free, puffy-sticker 'FAiRY GODMOTHER'S FAVORITE' note pinned dead centre. It's the 90s girlhood object — the corkboard over your desk with notes from people you love — and it makes the page's memory visible in the room instead of in a text list.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `fairy-godmother-desk-room-straight-on-v1` | codex-render | **YES — this is the interface** | new | The room the mechanic lives in — textarea, saint cards and buttons composite into this render (library .libroom pattern) |
| `fairy-godmother-portrait-comic-v2` | codex-render | decorative | new | Replaces the redo-flagged pixel portrait as her presence beside the title; also becomes the og:image |
| `existing-house-exterior-v6` | codex-render | decorative | exists | Masthead walk-up image, kept as-is |
| `saint-mini-cards` | css/svg | **YES — this is the interface** | exists | The energy picker — the picture you click to choose the saint |
| `saint-sophia-card` | codex-render | **YES — this is the interface** | uncertain | Completes the 7-card picker; until it exists, Sophia renders as a dimmed type-only tile that still works (shelf tells the truth) |
| `wand-button-art` | css/svg | **YES — this is the interface** | exists | The submit control's icon — de-emoji the chrome with art that already exists |
| `stationery-note-chrome` | css/svg | decorative | new | Response card, gate card, and corkboard history styling — replaces parchment scroll + gold dashed badge box |

**`fairy-godmother-desk-room-straight-on-v1`** — Straight-on (zero perspective, flat elevation — it composites) interior of the FAiRY Godmother's Willow Lane parlor: her cream 1990s writing desk running across the lower third against a blush plaster wall; ON the desk, dead-centre, a large BLANK oversized memo pad (the textarea target — leave it truly blank, no baked placeholder text); brass desk nameplate reading exactly 'FAiRY GODMOTHER' (text rendered IN-generation, matching the existing parlor render's nameplate); cream corded push-button telephone right; wicker basket of pink envelopes left; a low shelf rail along the desk back where seven small framed cards can composite; on the wall right of centre, a framed cork corkboard left mostly EMPTY (CSS notes pin over it); warm dusk lamplight matching assets/building-interiors/fairy-godmother-parlor.jpg's register; NO people, NO gilded scrollwork, NO baked-in books/clutter where controls land; crisp clean high-fidelity dimensional illustration per the house-v6 benchmark ('a realistic drawing, clearly a drawing'), ~2000×1100

**`fairy-godmother-portrait-comic-v2`** — New FAiRY Godmother character portrait — likeness EXACTLY from the approved credits plate assets/video/sunnyvaile-credits-v1-plates/opening-05-fairy-godmother-rerender-lit-v2.png (silver-gold curls, small tiara, wire glasses, pink robe, holo wand); waist-up, warm and direct, current-generation crisp dimensional style (NOT pixel — the pixel portrait is curation-flagged 'redo'); transparent or parlor-toned background, suitable at ~280px in the title block

**`saint-sophia-card`** — A 'Sophia Says' saint card in the locked saint-card register (assets/saints template) — ONLY if Ali confirms Sophia stays in the energy roster (no card exists; saint roster rethink is in flux)

**`stationery-note-chrome`** — Hand-built CSS: pearl note card with candy top-stripe, pin-dot pushpins, cork texture panel (repeating SVG noise, warm tan — NOT gold), memo-note cards with subtle rotation for the corkboard history

## Reuses existing
Almost everything: the entire worker JS mechanic verbatim (advice, glow-ups, revisions, gate, badge, history, surprise); house-v6 exterior (approved, benchmark); the delivered parlor render fairy-godmother-parlor.jpg as the art-direction reference for the new straight-on desk render (its nameplate, phone, envelope basket and corkboard are the object vocabulary); all 6 existing saint cards; the fairy-wand-comic art (currently unused); the KSVL song button + mini-player; Plausible/Clarity; the dark night-sky shell concept. The only truly NEW builds are two renders (desk room, portrait) and CSS chrome.

## Pitfalls (do not)
- DO NOT REBUILD THE ENGINE. The audit rates this page Tier D-working; the worker contract (PROMPT GLOW-UP / POST-GLOW-UP markdown headers, revision payload shape, gate statuses created/already/invalid/rate_limited) is load-bearing — restyle containers only.
- Curation-blocked assets (the hook enforces this): fairy-godmother-scene.png, laidy-fairy-godmother-portrait-v3.png, laidy-fairy-godmother-portrait-pixel-v1.png are ALL flagged 'redo' — the pixel portrait must come OFF the page, and none may be used as refs except the approved credits plate for likeness.
- Gold+plum is retired and this page is soaked in #ffd700 — but it's a REDESIGN not a recolour: the parchment scroll and gold badge box get redesigned as stationery/corkboard, not hex-swapped.
- Never claim 'unlimited' or 'any prompt' in the new state-line copy (fairy-godmother-capabilities canon); wishes are capped deliberately for cost.
- Wish-cap numbers conflict: canon memory says 3/visit, the live gate copy says 1 free + 5/day for subscribers, and the actual cap is enforced worker-side. Verify against the DEPLOYED worker before writing any number into the state line — never guess (verify-in-the-app rule).
- Sign text renders IN-generation (nameplate 'FAiRY GODMOTHER' in the desk render); never post-apply text onto renders; request the memo pad genuinely blank because the textarea sits on it.
- Straight-on or it won't composite — the existing parlor render is a 3/4 angled view; controls on a perspective room read as two different rooms (library lesson). New render must be a flat elevation.
- No emoji in UI chrome (✨🌟📜 all go); content-level collectibles are fine.
- Ai-accent: fix h1 to accent the 'Ai' pair; standalone 'AI' in the disclosure copy stays plain caps, unaccented.
- Keep the select element in the DOM (hidden) so Surprise-me and ENERGY_KEY_MAP keep working; don't fork the state into the card picker.
- Mobile: the desk composite must restack (library mobile pattern) — % -inset composites break on narrow viewports if untested; verify at 375px with measured values.
- Don't remove working features: song button, Enter-to-submit, weekly-return-link back-nav, badge write to laidiesSecretBadges, mini-player persistence all survive.
- Height discipline: page is 1,786 now — the room section must not balloon it past ~2,500.

## Open questions for Ali
- Which wish numbers are true TODAY on the deployed worker (3/visit canon vs 1-free + 5/day gate copy), and can the worker expose a cheap 'wishes remaining' read so the arrival state line is honest rather than inferred from localStorage?
- Sophia: does 'Sophia Says' stay in the energy roster (needs a new saint card) or does the in-flux saint roster rethink replace her? Until decided, ship her as a dimmed type-tile.
- Is fairy-godmother-parlor.jpg itself Ali-approved? It's absent from curation.json (382 keys, no verdict). Its dusk-and-string-lights register also brushes the de-fairytale ban — confirm the FG house keeps its sanctioned 'enchanted cottage' exemption for the NEW desk render's lighting.
- Should the FAiRY Godmother appear IN the desk render (keeper-at-her-post, like Miss Jeeves in the library hero) or stay out of frame so the seat is yours? Brief assumes empty (you sit at the desk), portrait beside the title instead — Ali's call.
- Footer: master-issue-board #34 flags the three game pages as footer-less — intentional immersive choice or add the site footer while we're in here?

## Sequencing
Sequence AFTER the Tier A/B rebuilds (Blend & Snap, Visitors Centre, Bronze AiGE, etc.) — this page already does its verb; it's 16th of 17 in the ranked audit. Natural moment: fold it into the site-wide gold-retirement sweep, since this is one of the heaviest #ffd700 pages left. Within the build itself: (1) commission the two renders first (desk room is the only blocker — everything else is CSS + existing art), (2) do the emoji/gold/Ai-accent/portrait-removal fixes immediately (no art dependency, pure coherence wins), (3) composite the room + card picker when the render lands, (4) verify the wish-cap numbers against the deployed worker before writing the state line, (5) Ali rates — do not self-certify.

