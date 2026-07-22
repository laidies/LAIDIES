# Episode Animation — canon-derived stills video (spec)

> **Pixel-art episodes:** use the locked production standard in
> `episode-pixel-motion-style-locked.md`. Its approved reference is the Episode 04 Grace v10
> master. The painterly SUNNYVAiLE guidance below applies only to the older town-style format.

The episode "video" is a series of stills set in SUNNYVAiLE, synced to the narration in the
Chick Flicks Screening Room player (`watch.html`, already cue-synced). Every image derives from a
**canon beat** — no invented scenes. Source of truth: `content/episodes/episode-NN.canon.md`.

## Format & cadence
- **16:9**, high-res, **y2k-v3 painterly town style** (match `assets/building-interiors/*`).
- **Populated shots = varied Y2K women** (ages / body types / skin tones); storefront/vista shots stay unpeopled.
- **There is no fixed image-count cap.** Use every approved still the story needs; do not collapse a full
  episode into a 20-image selector or imply that the user must choose the whole episode from a small render batch.
- **Animation budget means 1–2 fully animated shots per scene, not 1–2 images per scene.** The other shots
  remain stills or receive only slight, stable motion: a restrained single-direction camera drift, existing
  machine lights blinking, a cursor pulse, rain, or another source-native ambient loop.
- **Do not turn every still into a five-second animation.** Let important stills hold long enough to read,
  and use purposeful shot changes at narration beats. Reuse approved episode and town art wherever it is the
  right story image; generate only genuine coverage gaps.
- **Timing locks to the recorded audio cue sheet** (built after Ali records — the player reads a cue JSON).

## Transition standard
- Transitions carry the visual rhythm when most shots are still. Use polished editorial crossfades (normally
  0.4–0.7s), motivated straight cuts on punchlines or action changes, and occasional dip-to-black only for a
  real time/place jump.
- Favor visual match cuts: face-to-face, document-to-document, screen-to-screen, or a shared dominant shape.
  Preserve eyelines and screen direction across adjacent stills.
- Never morph one face into another. Avoid novelty wipes, spinning cards, zoom tunnels, blur drops, and any
  transition that competes with the narration.
- Start the next subtle camera move only after the crossfade settles. Do not run opposing Ken Burns moves
  through a dissolve; that reads as a lurch rather than a transition.

## Standard OPENING credits — reusable every week (no new render)
- **Reuse** the neon-sign reveal `assets/video/sunnyvaile-logo-reveal.mp4` under the town anthem
  `assets/audio/... sunnyvaile-town-anthem.mp3` ("Wednesday in SUNNYVAiLE" · THE LAiDIES).
- Overlay only the per-week **episode title card** — e.g. *"Episode Two · Tell Me What You Want."*
- Plays under the `=== ANNOUNCER VOICE ===` "Previously on ladies… This is Episode N" intro.

## Standard CLOSING credits — reusable every week
- Warm **SUNNYVAiLE dusk/night vista** (reuse `assets/sunnyvaile-town-overview.jpg`, or the optional
  end-card render below) + **"See you next Wednesday… in SUNNYVAiLE"** + a short credits card
  (host: Jessica · music: Josh / THE LAiDIES · a town of women learning AI, one Wednesday at a time),
  under the anthem. Plays under the sign-off + `=== ANNOUNCER VOICE ===` next-time.
- *(Optional new render: `credits-goodnight-sunnyvaile` — the town at night, lamps + KSVL tower lit, quieter than the opening vista.)*

---

## Ep2 shot list — beat → image
Reuse = existing asset. NEW = needs a Codex render (briefed separately).

| # | Beat (canon) | Image | Source |
|---|---|---|---|
| 1 | Open credits | neon reveal + title card | **REUSE** logo-reveal.mp4 |
| 2 | Cold open — 9:15 Tues, glaring at word-salad on screen | woman at a dim office desk, monitor full of buzzwords | **NEW** `ep02-cold-open-desk` |
| 3 | "yesterday it read my mind" (same tool, good vs bad) | same desk, two printouts — one great, one garbage | **NEW** `ep02-two-printouts` |
| 4 | "so I took it to town" | establishing town vista | **REUSE** `sunnyvaile-town-overview.jpg` |
| 5 | Corner table, oat latte, KSVL on low | café interior, laptop + latte | **REUSE** `blend-snap-cafe.jpg` |
| 6 | "prompt — the AV club swiped it from drama club" | Y2K high-school: drama kids ↔ AV club, playful | **NEW** `ep02-prompt-theater` |
| 7 | Coffee metaphor — "your usual" at the regular spot | café counter / barista knows her order | **REUSE** `blend-snap-cafe.jpg` (pan) |
| 8 | "AI is the brand-new café — blank look" | unfamiliar café counter, plain drip going cold | **NEW** `ep02-new-cafe-blank` |
| 9 | Spice Girls — "tell me what you want" | Y2K boombox/CD, platform sandals, zig-a-zig energy | **NEW** `ep02-spice-girls` |
| 10 | David Rose / "fold in the cheese" | Schitt's-Creek-styled figure, pathologically specific; kitchen gag | **NEW** `ep02-david-rose` |
| 11 | The brief — briefing a smart new hire (the card) | woman handing off a briefed task; the 6-question card | **NEW** `ep02-the-brief` |
| 12 | Demo — vague ask → wall of text | laptop screen: an overwhelming wall of text | **NEW** `ep02-wall-of-text` |
| 13 | Ross "PIVOT" | the couch-in-the-stairwell gag *(optional / skippable)* | **NEW** `ep02-pivot` *(opt)* |
| 14 | Demo — briefed ask → tight summary (contractors line) | laptop: clean subject + bullets, one line highlighted | **NEW** `ep02-good-summary` |
| 15 | LIBRAiRY reference desk (the proof) | the town's reference-desk reading room | **REUSE** `library-reading-room.jpg` |
| 16 | Mollick quote — "soft skills = the hard ones" | a quote card / the study open on the desk | **NEW** `ep02-quote-card` |
| 17 | Cocktail-party explanation | happy hour at the bar | **REUSE** `bronze-aige-interior.jpg` |
| 18 | The postcard — Post Office | the Post Office lobby + the Welcome postcard | **REUSE** `post-office-lobby.jpg` (+ `pc-welcome.png` inset) |
| 19 | Try-on / CTA montage | study pack · pop quiz · KSVL · MAiKEOVER | **REUSE** `blend-snap-cafe` · `sunnyvaile-high-pop-quiz` · `ksvl-booth` · `maikeover-salon` |
| 20 | Sign-off | warm town vista, golden hour | **REUSE** `sunnyvaile-town-overview.jpg` |
| 21 | Close credits | night vista + credits card | **REUSE** (or optional `credits-goodnight-sunnyvaile`) |

## To render for Ep2 (the gap — ~8 core + 2 optional)
Core: `ep02-cold-open-desk`, `ep02-two-printouts`, `ep02-prompt-theater`, `ep02-new-cafe-blank`,
`ep02-spice-girls`, `ep02-david-rose`, `ep02-the-brief`, `ep02-wall-of-text`, `ep02-good-summary`, `ep02-quote-card`.
Optional: `ep02-pivot`, `credits-goodnight-sunnyvaile`.

*(Full Codex briefs for each NEW shot to follow once the cadence + aspect are confirmed — one prompt per image, same reference-curation + y2k-v3 rules as the building/character batches.)*
