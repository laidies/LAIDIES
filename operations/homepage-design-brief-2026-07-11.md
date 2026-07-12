# Homepage redesign — design brief (compiled 2026-07-11, session with Claude)

> Status: direction doc for the Figma design pass. Ali has NOT approved a design yet.
> This records what was tried, what she rejected and why, and the standing rules for the next attempt.
> Read alongside `operations/SITE-MASTER-BRIEF.md` and `operations/voice/laidies-canon-index.md`.

## 1. The assignment (Ali's words, paraphrased from session)
Redesign the homepage so it reflects the uniqueness of the SUNNYVAiLE concept — "an intentional design
that enhances the concept" — to win as many new AND returning users as possible, using all parts of the
site regularly. Best-practice UX underneath; the world on top. Not tacky. Nothing slapped on without reason.

## 2. What Ali REJECTED today (do not re-propose)
- **Pink/beige box grid.** Rounded cream cards with thin borders on pastel bands, repeated as the only
  module. "A lot of pink and beige boxes and basic layout." Recolouring this structure does not fix it.
- **"Editorial / magazine / TV-Guide listing" as a design material.** "I don't want editorial — magazine
  layout is not reflective of the town."
- **The hero line** "A weekly 90s TV show that teaches you AI — made for women with full calendars, high
  standards, and no patience for beige tech explanations." — thrown out explicitly.
- **Raw dark video masthead** on the cream page ("sticks out like a sore thumb, big black box").
- **The old serif SVG wordmark in the homepage header** — doesn't match the site (rest of town uses the
  Jost `.brand` logotype via the global header).
- **90s touches bolted onto generic cards** (a VT323 chip here, a scanline there) — reads as costume.
- **Incremental patching as a process.** Design must be iterated visually (Figma), then applied once.

## 3. What survived / landed (keep)
- **Three entry modes** (from Ali's Codex blueprint): Learn through the story · Do something useful now ·
  Explore SUNNYVAiLE. This IA answered "too many explainer sections / no clear next step."
- **"This Wednesday" as a prominent returning-user layer,** not the whole proposition.
- **Storefront art in the tour** (y2k-v3-rendered-signs) — "the images help."
- **A 5-second explanation before any town jargon;** explain saved-progress before the word "Closet."
- **LUMINAiRY wing-entrance doors** (three interior images as clickable wing entrances) — built, kept.

## 4. Standing design rules for the Figma pass
- **Palette comes from the art, not the current tokens.** The town art is golden hour: warm cream light,
  deep teal, amber/gold, sunset; dark plum is shadow/ink, NOT wallpaper. The pink/purple ambience is the
  core complaint. (Site tokens in `assets/sunnyvaile-page.css` remain the code source of truth for other
  pages until Ali locks a new homepage palette.)
- **Two materials only: windows and objects.** Windows = full-bleed golden-hour photography of places.
  Objects/screens = things from the world (CRT TV, VHS boxes, tickets, signage). No "paper/editorial"
  material. Nothing is a generic card.
- **Colour must mean something** (place, lane, or reward) or it doesn't appear. Gold = earned only.
- **Type does real work.** Playfair at true display scale for title-card moments; Jost caps as signage;
  VT323 ONLY inside diegetic objects (tape labels, OSDs, counters) — never on headings.
- **Every component maps to a real object from the world** (tape, ticket, marquee, application form) —
  texture must BE something, mirroring the writing lock's "references must teach."
- **Best-practice UX underneath:** 5-second comprehension, one primary action per view, honest labels
  ("Still in the works"), mobile-first stacking, reduced-motion safe.

## 5. Facts verified today (don't re-derive, don't guess)
- Signup canon: **Wednesday Postcard = Post Office. Residence Card = MAiKEOVER. Welcome Wagon = Start
  Here/About only** — the old signup band's "★ Welcome Wagon" kicker was mislabelled.
- **Ep4 = "The Founding Mothers"** (episode-index.json); homepage fallback card was stale ("Every SLAiYER
  Needs a Watcher") — fixed in index.html; full site-wide title sweep is still open (issue board #2/P0).
- **LAiDY is RETIRED** (Ali, 2026-07-11): the character is just the FAiRY Godmother. Renamed across 12+
  live files; "every LAiDY" member-singular usage intentionally kept. Canon index updated. OPEN: the KSVL
  track titled "Ask LAiDY" (`game-ask-laidy.mp3`) — Ali to decide (retitle / re-record / leave as b-side).
- **Repo is a git worktree** of `../Website` (branch `homepage-redesign`); git commands need the parent
  repo mounted.
- Homepage rolled back to committed state (46ea80e content) + canon fixes only. Other files keep today's
  changes: luminairy.html doors, LAiDY→FAiRY Godmother rename, web-optimized art in
  `assets/sunnyvaile-buildings/web/` and `assets/sunnyvaile-interiors/*-wing-door.jpg`.

## 6. Hero copy — open, Ali to lock
Candidate (not approved): "Welcome to SUNNYVAiLE. A fictional Y2K town with one job: teaching you AI so it
actually sticks. This week's episode is at the video store, the study notes are at the café, the pop quiz is
at the high school, and the song on the radio won't let you forget the lesson. New tape every Wednesday."
Shorter alt: "A little Y2K town with one job: teaching you AI so it sticks. Every lesson has an address.
New tape every Wednesday."

## 7. Next step
Ali connects the Figma connector → build the homepage design in Figma from this brief with real assets
(storefronts, interiors, town overview, wing doors, saints stained glass) → iterate on frames with Ali →
only then implement in index.html, once, to the approved design.

## Session addendum — 2026-07-12 (Codex v2 + Claude completion pass, Ali redlines)
- **BANNED IMAGE:** the pink cocktail flat-lay (disco balls, lip gloss, martini glasses on pink). Do not use anywhere. Reason: generic; we have ample real BRONZE AiGE + Businesswomen's Special fortune-teller art — use the real objects.
- Postcard art (pc-*.png) is for postcard contexts only — NOT as section/card illustration (caught on Businesswomen's card; swapped to the actual fortune-teller art).
- No stacked full-bleed image sections: one cinematic panel at a time, contained on the quiet field, whitespace between (Rule 3 enforcement).
- Masthead direction LOCKED: dusk MAiN Street full-bleed · Playfair title card, white with TEAL italic accent (pink accents rejected in masthead) · VT323 terminal kicker "> LAiDIES ONLINE · CONNECTED TO SUNNYVAiLE, 1999_" · Ali-approved lede ("LAiDIES helps women understand and use AI…") · gold-bar line = the Sunnydale/Bayside/Capeside name-check, set in Jost · mission line "Women shouldn't just use AI…" REMOVED for now (wording not right yet).
- Intent grid = 4 cards only (Wednesday lap / Look something up / Fix a prompt / Explore the town), 2×2, scene images ~210px tall, faces kept in frame. No KSVL or generic-activity card there (repetition).
- "Take the Wednesday lap" = the ritual's canonical homepage name (from Blend & Snap).
- Activities heading: "Take some free time" (ritual step 5 language). Dream Phone card honest: "Glow-up in the works", disabled button.
- Town section: map (locked jpg) → 6 district cards incl. Willow Lane → collapsed errand-grouped text directory (Start & learn / Use, listen & take five / Connect, collect & explore).
- Spotlights: KSVL + LUMINAiRY as contained rounded panels, copy anchored alternating sides.
- Manifesto section (teal, ink text): "Learning AI is personal. Shaping it is collective."
- Closet section: purple kept (Ali likes), copy = "Everything you learn has somewhere to live." + real CTAs (maikeover.html / laidies-card.html).
- Express Route bar is a rounded link to /this-week.html.
- Working copy of record: concepts/codex-homepage-2026-07-12/ (self-contained, relative assets).
- **ASSET SOURCING RULE (hard, after two retired-image mistakes):** never pick imagery by filename from assets/. The CANONICAL image for any feature is whatever the LIVE page for that feature currently displays (grep its src). The loose `businesswomen-special-*` files in assets root are RETIRED; the live game uses `assets/bws-fortune-teller/` frames. Retired-looking duplicates should eventually move to `.retired/`.
- **Dark-panel colour rule:** never flat plum twice in a row. Each dark section gets a gradient from plum into ONE accent — teal (Wednesday panel), rose (KSVL), sunset (LUMINAiRY) — ideally flowing toward its artwork. Variety within the family, not new colours.
- Spotlight panels: fixed 400px height, split layout (solid gradient copy side + shaped image column). Never let tall art dictate panel height; never overlay copy on a portrait crop.
- **Jacaranda field (Ali, 2026-07-12):** the page ground is the closet purple (jacaranda gradient), replacing cream/beige. Light sections (activities, town, intent) float as rounded cream panels on it; topbar tinted purple to match. Closet section needs a NEW ground (Ali to pick — interim plum-rose gradient). Purple appears top and bottom so the palette reads intentional, not incidental.
- Intent cards = horizontal media cards: tall image column (~44%) left, text right — never wide letterbox strips over portrait art (repeated crop failures).
- "Why is there a town?" toggle = ghost pill (teal outline), not underlined bare text.

### PALETTE LOCK (Ali, 2026-07-12 late session)
Too many colours in play — locked to exactly three panel gradients (page background excluded):

1. **Purple → pink** `#5f4685 → #a05a92 → #e982ab` — intent panel, LUMINAiRY spotlight
2. **Sunset coral → pink** `#c96652 → #db7581 → #e982ab` — KSVL spotlight, Closet, town-map caption bar
3. **Teal → purple** `#2f8f8b → #5b7a99 → #75639a` — weekly panel, Jeeves reference, manifesto

Light panels use pale tints of the same families: activities = pale purple→pink; town = pale teal→purple.

**Accents:** pink `#e982ab`, teal `#3aa8a4`, sunset coral `#e8875f`, lighter lilac/purple `#9a86c0`.
Dark plum and gold SPARINGLY (chrome/footer; gold CTAs and small links only).

**Masthead kicker:** "> LAiDIES ONLINE" = pink · dot = lilac `#9a86c0` · "CONNECTED TO SUNNYVAiLE, 1999_" = sunset coral (cursor too). Font is Jost (VT323 retired); masthead title is Jost 800 (Playfair retired).

**Shape rule:** every clickable is a 10px rounded rectangle — no pills.

## Palette lock revision (Ali, 2026-07-12 late)
- G1 (purple gradient) re-stopped to pick up lavender, everywhere it appears:
  `#5f4685 → #8a6cae → #cabbe8` (was `#5f4685 → #a05a92 → #e982ab`, too rose/plum).
  Applies to: Why-LAiDIES box, LUMINAiRY spotlight, any future G1 surface.
- Intent panel ("What brought you to town today?") moved from G1 to G2 (coral→pink,
  `#c96652 → #db7581 → #e982ab`) so two same-gradient surfaces never sit adjacent
  (it sat directly below the G1 why-box). Adjacency rule: no neighbouring sections
  share a gradient.

## Accent lock (Ali, 2026-07-12 late)
Text accents (eyebrows, tags, strongs, accent links, the Ai) may ONLY be:
- pink #e982ab · teal #3aa8a4 · coral #e8875f · lilac #9a86c0 (fills) / lavender #cabbe8 (text on dark) · pastel yellow #ffe08a
Rules:
- NO yellow (or gold-tints) on purple backgrounds — coral is the accent on purple. (Stated three times; do not violate again.)
- Rose #9b3f5f is RETIRED as a text/accent colour (kept as a var for legacy fills only).
- Pale pink #ffd9e8 is banned ("too light and is not an accent colour").
- Gold-tint cites (#f3d9a8) retired → yellow on warm gradients, cream on purple.
- Off-palette light teal #7fd6d0 retired → teal/yellow/pink from the set depending on background.

## PALETTE LOCK — FINAL (Ali, 2026-07-12, supersedes all earlier accent notes)
Six accents, chosen via swatch comparison. NOTHING else may be used as an accent:
- pink        #e982ab
- coral       #ec7a78  (pinker than old #e8875f — old value retired)
- tangerine   #f4a636  (replaces yellow everywhere; YELLOW IS RETIRED — "pulls it childish")
- teal        #57b6c0  (softer/bluer than old #3aa8a4 — old value retired)
- sky         #8bbde9  (bluer than first-pass #8ccbd3 — too close to teal in the hero)
- periwinkle  #b3abe7  (replaces lilac #9a86c0 — old value retired)
Non-accent text: cream #fffdfb on dark, dark plum #3a1838 on light. No other text colours.
All six fills are light enough that text ON them is always dark plum #3a1838.
Pale lavender #cabbe8 remains ONLY as light text accent on dark backgrounds (hero tagline,
weekly eyebrow) — never as a fill.
Canonical rotation order where rotations exist: pink → teal → coral → periwinkle → tangerine → sky.
Rules that stand: no two adjacent sections share a gradient; accents on purple = coral/pink
(never anything pale); rose #9b3f5f, gold/#ffe08a family, #7fd6d0, #ffd9e8 all retired.
