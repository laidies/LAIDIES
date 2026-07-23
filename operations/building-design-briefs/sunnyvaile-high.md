# SUNNYVAiLE High — Schoolhouse Road. The school: video classes on the AV cart, the Wednesday Pop Quiz, the Registrar (Report Card), the Yearbook (superlatives), the gym (Scholastic Book Fair every 4 weeks), and the pointer to the 101 textbook shelf that lives in the LIBRAiRY. ⛔ OWNED BY THE SUNNYVAiLE HIGH CLASSES WINDOW — this brief is for that window to consider; the buildings work must not edit this file. — design brief

> ⭐ **SOLE MODEL = the LIBRAiRY** (the page we just built and approved). ⛔ Ignore any suggestion below to use clip-path "hotspots" on a flat photo, or to copy the **Post Office** — the live Post Office is the OLD template, not a proof. Operable objects must be **separate, obviously-clickable renders composited into the room and opened in place**, exactly like the library's books on the shelf. _(Correction 2026-07-23, after Ali: base it on the library only.)_


> Page: `sunnyvaile-high.html` · Priority: **high** · Effort: **M**
> Generated 2026-07-23 from the library thought-process (see operations/library-decisions.md).

**The verb:** Sit a class and take the quiz.

## Current state
Audit: art 0/14, main column 760px, h 2,043. IMPORTANT NUANCE the audit number hides: this page already half-works. It is ALREADY hub-and-reveal (six .sh-hub buttons → panels open in place, one at a time, HASH_MAP deep-links) and already under the ~2,500px length target. What fails is that every control is a text button with a retired-gold SVG icon; the four gorgeous interiors (locker hallway hero, classroom, scantron desk, book-fair gym) are inert photographs; the quiz is a gold link-card out to /learn/quiz.html; and the seven "101" cards are text links that all leave for the LIBRAiRY (correct per Ali's 2026-07-22 ruling — "class" = video lessons only; the 101s ARE the textbook shelf — but the panel still wears "Season 1 · classes" clothing). Real working machinery that must survive: Report Card (derived from laidiesQuizProgress + episode-index.json, GPA, standing, print), Yearbook superlatives (computed from the same record), Book Fair (28-day cycle, entry/daily/rare puffy claims in localStorage, hero image swaps to the gym during fair weeks), and The Classes grid rendered from content/site/high-classes.json (4 subjects, 37 classes, per-class question lines) feeding the LOCKED /learn/class.html wrapper (1999 classroom → chalk name on the board → hit play on the CRT on the AV cart → full screen). The wrapper is built and verified; do not rebuild it. This brief is FINISH + REFRAME, not rebuild-from-zero.

## THE MECHANIC (the one idea)
THE CORRIDOR OF DOORS IS THE INTERFACE. The physical object you operate is a straight-on locker-lined hallway render with six labelled doors — ROOM 101 (Pop Quiz), the A/V CLASSROOM (The Classes), the REGISTRAR (Report Card), the YEARBOOK OFFICE (Superlatives), the GYM double doors (Book Fair), and ROOM 201 with a taped hand-lettered "NEXT YEAR" sign (Next Season). Click a door, the room opens in place directly below the corridor — exactly the library's "shelf IS the interface" pattern, and exactly what a school building does: you walk the hallway and go into a room. The six existing hub panels are the rooms; they already exist and already open in place. The A/V door hands off to the locked /learn/class.html wrapper (that IS sitting the class — the wrapper is the classroom, not a failure of this page). Every door carries its painted name IN the render plus a plain-words caption beneath, so nothing is a hidden hotspot.

## Key elements
### Homeroom chalkboard — the state band `[NEW]`
A green-black chalkboard band (CSS/SVG, chalk-texture type at homepage display scale ~57-75px) directly under the hero, replacing the lede paragraph as the page's opening statement.
- **Behaviour:** States your position on arrival in plain chalk words, computed from data that already exists on this page: 'Wednesday's Pop Quiz — not yet sat' (or 'A+, banked') from laidiesQuizProgress; 'Your standing: Honor Roll · GPA 3.40' from the Report Card math; '1 of 37 classes filmed' from high-classes.json statuses; 'Book Fair: opens in 5 days' from the fair-window function. Each chalk line is a link that opens the matching door. No interaction needed to know where you stand — building-pages-tell-you-your-state, with the telling AS the display type.

### The corridor of doors (replaces the six .sh-hub text buttons) `[REWORK]`
Full-bleed straight-on hallway render with six labelled doors composited as the click targets — the operable art.
- **Behaviour:** Click a door → its room panel opens in place below, one at a time, click again to close. Reuses the existing open/closeAll JS and HASH_MAP verbatim (#report-card, #book-fair, #superlatives etc. keep working). The open door gets a visible state (door ajar / lit transom / dark strip). Each door has a small plain-words caption plate under the render ('Take this week's quiz →', 'Pull your record →'). Mobile: doors restack as a vertical column of full-width door fronts, same tap-to-open.

### Room 101 — the Pop Quiz door `[REWORK]`
The building's primary verb; currently a gold link-card straight out to /learn/quiz.html.
- **Behaviour:** Stays the featured action (hub-and-reveal rule: never bury the page's main action). Opening the door reveals the scantron-desk art (sunnyvaile-high-pop-quiz.jpg, finally used AS the room, not a figure) with the week's quiz state in plain words and one candy button into the quiz. Whether the quiz itself should ever run in place behind this door is an open question for the High window — do not decide it here.

### The A/V Classroom door — The Classes `[KEEP]`
The existing hub-av panel: subjects + 37 classes rendered from content/site/high-classes.json, each linking to /learn/class.html?c=<slug>.
- **Behaviour:** KEEP the JSON-driven grid and the per-class question lines. Reframe the panel as the classroom: the register reads like a class schedule taped by the door (Period N · name · filmed/not-filmed truth-telling stays). Clicking a class goes to the LOCKED wrapper — that handoff is correct and must not be duplicated on this page.

### The Registrar door — Report Card `[KEEP]`
The existing derived transcript: grades, GPA, standing, butterfly clips, print button. The strongest working feature on the page.
- **Behaviour:** KEEP all logic and the print stylesheet untouched. Re-skin only: the card currently runs retired gold+plum (gold A+ chip, plum→rose gradient summary bar, gold GPA numeral) — redesign to ink #3a1838 + candy accents per gold-plum-retired-sitewide. Do NOT touch the grade math, localStorage reads, or the episode-index/quizzes.json fetch.

### The Yearbook Office door — Class Superlatives `[KEEP]`
Existing computed superlative + slate of chips.
- **Behaviour:** KEEP the pickSuperlative logic and slate. Re-skin the gold-foil frame/earned-chip treatment off the retired palette.

### The Gym doors — Scholastic Book Fair `[KEEP]`
Existing fair scheduler + puffy claim machine (entry/daily/rare, localStorage keys laidies_puffies_earned + laidies_bookfair_claims) + Clip Exchange link to /bookfair.html.
- **Behaviour:** KEEP every claim rule and key name exactly. During fair weeks the gym doors in the corridor dress up (banner/balloons overlay or render variant) and the hero keeps its existing swap to the book-fair gym image. Off-weeks the doors read closed with the countdown in plain words.

### The 101 textbook shelf pointer `[REWORK]`
Currently a full hub panel of seven text cards all linking to /library.html#the-101-shelf — a whole room for what is now, per Ali's ruling, another building's shelf.
- **Behaviour:** For the High window to consider: demote from a door to a diegetic pointer — e.g. a 'TEXTBOOKS: SEE THE TOWN LIBRAiRY' notice on the corridor wall or inside the A/V classroom panel, one link, honest about where the verb lives. Do not delete the seven-title list without the High window's say-so (dont-remove-working-features); it can live one click deep.

### Room 201 door — Next Season `[REWORK]`
Existing near-empty hub-next panel (two sentences).
- **Behaviour:** Becomes a closed door with a taped hand-lettered paper sign ('ROOM 201 · OPENS NEXT YEAR') — the sign IS the content; the panel can be dropped or kept one line. Truth-telling like the wrapper's PLEASE STAND BY test card.

### Hero + fair swap `[KEEP]`
Full-bleed hallway hero with JS that swaps to the book-fair gym during fair weeks.
- **Behaviour:** KEEP the swap logic (same schedule constants as the fair panel). If the new corridor render becomes the hero itself, the swap must be re-pointed, not lost.

### Bottom CTAs `[KEEP]`
Study Pack at Blend & Snap + LIBRAiRY links.
- **Behaviour:** KEEP as the exit row, restyled as solid candy buttons with dark plum text, 10px radius, per homepage-bar-measured-numbers.

## Design direction
Top to bottom (target ≤ ~2,500px like _library-v3, from today's 2,043 — length is NOT this page's problem, width and inertness are): (1) Full-bleed hero, title below it per site pattern; keep the fair-week swap. (2) The homeroom chalkboard state band — dark green-black board (sits naturally beside the homepage's dark #1c0f1c register), big chalk display type stating quiz/standing/classes/fair in plain words; this replaces the current lede + 'three places teach you AI' paragraph (that orientation copy can compress to one line on the board's chalk tray). (3) THE CORRIDOR: full-bleed straight-on hallway render with the six labelled doors as the only navigation — no 760px main (kill it with page-scoped overrides exactly as the Post Office did, so nothing else on the site moves), no text-button hub row, no gold SVG icons (headers need no icons — eyebrow label + clean heading per the superseded-icons ruling). Doors composited/mapped on the render the way the library's bookcase sits in its room — straight-on art, CSS percentage regions, visible painted signage rendered IN the image. (4) The opened room panel directly beneath the corridor, full-width, re-skinned: ink #3a1838 headings, cream/gradient panel grounds (never flat cream at small scale — the homepage is dark, big, loud), candy accents pink #e982ab / teal #57b6c0 / coral #ec7a78 / periwinkle #b3abe7, Jost display + Inter body per sunnyvaile-page.css tokens. All gold+plum in the Report Card, Yearbook, Book Fair banner and hub icons is redesigned away, not recoloured. (5) Candy CTA row. Mobile: one @media block; corridor restacks as full-width door fronts; chalkboard type scales down but stays the opener. Art register: 1999 institutional Y2K-honest — checkerboard floor, painted metal lockers, pennants, laminate — crisp dimensional 'realistic drawing that's clearly a drawing' per the visual benchmark; no fairytale kit, no people in the establishing corridor.

## Signature detail (the 'cool S' of this building)
The half-erased chalkboard. The homeroom board that states your position is never clean: last Wednesday's date sits behind today's in a proper eraser smudge, one corner keeps a chalk doodle (a hangman game one guess from over, or the cool-S's schoolroom cousin), and the chalk tray holds a stub and a clapped-out eraser. When your state changes — quiz banked, standing up — the old line visibly smudges out and the new one is written over it. It is the school equivalent of the LIBRAiRY's margin-doodled cool S: proof a real 1999 classroom lives here and the board gets used every Wednesday.

## Images needed

| id | type | operable | status | purpose |
|---|---|---|---|---|
| `sunnyvaile-high-corridor-doors-v1` | codex-render | **YES — this is the interface** | new | The operable corridor — the page's interface. Each door is a click region opening its room in place. |
| `sunnyvaile-high-corridor-doors-fair-v1` | codex-render | **YES — this is the interface** | uncertain | The corridor tells the truth during fair weeks, matching the existing hero swap. |
| `high-homeroom-chalkboard-band` | css/svg | decorative | new | State-on-arrival band; also carries the signature half-erased detail. Text must be live (quiz state, GPA, filmed count, fair countdown). |
| `sunnyvaile-high-pop-quiz (existing)` | codex-render | decorative | exists | Becomes the inside of Room 101 — the art of the opened quiz panel, framing the quiz state + candy button, instead of today's decorative <figure>. |
| `sunnyvaile-high-classroom (existing)` | codex-render | **YES — this is the interface** | exists | Stays the wrapper's stage; on this page it can preview inside the A/V panel. Do not re-render — the wrapper's hotspot coordinates are measured against this exact file. |
| `sunnyvaile-high-book-fair (existing)` | codex-render | decorative | exists | The inside of the gym doors during fair weeks; keeps its hero-swap role. |
| `sunnyvaile-high-hallway (existing)` | codex-render | decorative | exists | Remains the hero establishing shot if the new corridor render serves as the body interface; retire only if the corridor render proves strong enough to be both. |

**`sunnyvaile-high-corridor-doors-v1`** — NEW Codex render, the centrepiece. Straight-on (zero perspective recession — flat elevation like the library no-desk room, it must composite) interior hallway of SUNNYVAiLE High: plum and teal painted-metal lockers left and right, checkerboard floor, GO CENTAURS! pennant, and SIX doors face-on across the wall with signage rendered IN the generation (never post-applied): 'ROOM 101' with a paper POP QUIZ WEDNESDAY notice taped up · 'A/V CLASSROOM' · 'REGISTRAR' · 'YEARBOOK' · double gym doors with 'GYM' over the frame · 'ROOM 201' with a taped hand-lettered NEXT YEAR sign. Doors evenly spaced for CSS region mapping. 1999 institutional Y2K-honest; crisp dimensional illustration per the visual benchmark; no people; no fairytale kit. Wide format ~2180×1000-ish like the library wall case.

**`sunnyvaile-high-corridor-doors-fair-v1`** — Variant of the corridor render (or an overlay layer with alpha) where the gym double doors are dressed for the Scholastic Book Fair — SCHOLASTIC BOOK FAIR paper banner over the frame, heart balloons, doors propped open showing a sliver of book tables. Everything else identical so the swap is seamless.

**`high-homeroom-chalkboard-band`** — Hand-built chrome: green-black chalkboard field with wood/aluminium tray, chalk-texture display type (SVG texture/filter over live text — the words are DATA, so they cannot be baked into a render), eraser-smudge layer, one chalk doodle SVG, chalk stub + eraser in the tray. Both light/dark safe.

## Reuses existing
Nearly everything below the skin: the six-panel hub-and-reveal JS + HASH_MAP deep links; the Report Card derivation (laidiesQuizProgress + legacy key merge, episode-index.json + quizzes.json fetch, GPA/standing/clips math, print); the Yearbook superlative computation and slate; the whole Book Fair machine (fair-window math, entry/daily/rare claims, localStorage keys, Clip Exchange link); the Classes grid rendered from content/site/high-classes.json; the LOCKED /learn/class.html wrapper and its measured classroom art; the hero fair-swap; all four delivered interior JPGs; the Post Office's page-scoped-override technique for killing the 760px main without touching the shared shell.

## Pitfalls (do not)
- OWNERSHIP: this page belongs to the SUNNYVAiLE High classes window. This brief proposes nothing directly — everything here is for that window to consider. The buildings work must not edit sunnyvaile-high.html.
- Do not rebuild or duplicate the class player — /learn/class.html is SHIPPED and LOCKED (1999 classroom → chalk board → play the CRT → full screen). The A/V door hands off to it; sitting the class happening on a second page is correct, not a failure.
- Do not 're-home' the 101s — Ali ruled they are the textbook shelf in the LIBRAiRY. The corridor points there honestly; making the 101 verb happen at the High would reverse a locked ruling.
- Working features that must survive byte-for-byte: localStorage keys laidiesQuizProgress / laidiesQuizBestScores / laidies_puffies_earned / laidies_bookfair_claims; the Report Card print stylesheet; HASH_MAP anchors (#report-card, #book-fair, #superlatives are linked from other pages); the hero fair-swap schedule constants (shared with the fair panel — keep them from drifting apart).
- Gold+plum is retired and this page is soaked in it (gold SVG hub icons, gold A+ chips, plum→rose gradient bars, gold yearbook frames, plum fair banner). Redesign, not recolour — and per the superseded icon ruling, section headers get NO icons at all, not new candy icons.
- State-on-arrival bans hotspot hunting: every door needs its painted in-render sign PLUS a plain-words caption, and the chalkboard states everything before any click. A beautiful unlabelled corridor would fail the same test the inert hero fails today.
- Render the corridor STRAIGHT-ON. The existing hallway JPG is perspective; the library proved flat click-regions on a perspective room read as two different rooms.
- Door/sign text renders IN the generation (codex-text-in-render); never blank doors with CSS labels on top, and never post-applied text passes.
- Chalkboard text is live data — it can never be baked into a render; build it as CSS/SVG chalk type or the state will lie.
- The page is 2,043px — already under target. Do not use the redesign as an excuse to add length; the corridor replaces the hub row roughly 1:1.
- No emoji in UI chrome (Book Fair collectible emoji fallbacks are content, not chrome — they may stay).
- Brand spelling: SUNNYVAiLE with accent-coloured Ai; standalone technology 'AI' stays plain caps.

## Open questions for Ali
- Should the Pop Quiz ever run IN PLACE behind the Room 101 door (porting /learn/quiz.html's engine into the panel), or does the door stay an honest departure to the quiz page? The audit flags the link-out; the counter-argument is the quiz is its own surface used by other buildings. Ali's call, via the High window.
- Does the new corridor render become the hero itself (one image doing both jobs, shortest page), or does the perspective hallway stay as establishing hero with the corridor below (library pattern: hero + room)?
- Fair-week corridor dressing: full second render, an alpha overlay layer on the gym doors, or skip it and let the hero swap carry the fair signal alone?
- What happens to the seven-title 101 list — one wall-notice link to the LIBRAiRY shelf, or keep the titles one click deep behind a smaller pointer?
- Does 'Next Season' merit a door at all, or is the taped ROOM 201 sign in the render (non-clickable, truth-telling) enough?
- The chalkboard shows GPA/standing to signed-out visitors as 'Enrollment pending' today — is that the right cold-visitor voice, or should the board sell the quiz harder to a stranger?
- Sequencing vs the classes window's own roadmap: they own filming the 37 classes (only 1 scripted, 0 filmed) — do they want the page reframe before or after the first Basics tapes exist?

## Sequencing
Hand this brief to the SUNNYVAiLE High classes window — it decides if/when to act. Suggested order if adopted: (1) commission sunnyvaile-high-corridor-doors-v1 first (art lead time dominates; the library's backdrop was the blocker there too); (2) meanwhile build the chalkboard state band + de-gold the panels — pure code, no art dependency, page-scoped overrides only; (3) composite the corridor and retire the hub buttons last, after the render passes the straight-on/compositing check. Site-wide, this slots after Ali's verdict on the Post Office proof and the _library-v3 promotion, since both set precedents (override technique, room-composite pattern) this page reuses.

