# Session context — 2026-07-12 (homepage comp: palette lock + redlines)

> Written per standing instruction: full context saved before any compaction. Companion to
> operations/homepage-design-brief-2026-07-11.md (which holds the design rules in detail).

## Where the homepage concept lives
`concepts/codex-homepage-2026-07-12/` (index.html, styles.css, app.js, local assets/).
Preview via "Preview Homepage Concept.command" in the repo root (localhost:8000).
The comp-only masthead switcher (#bgTry pill, bottom-left) cycles 10 art options and MUST be
removed before anything ships.

## PALETTE — LOCKED (Ali)
Exactly three panel gradients (page background excluded):
1. Purple → pink  `#5f4685 → #a05a92 → #e982ab` — intent panel, LUMINAiRY spotlight
2. Sunset coral → pink  `#c96652 → #db7581 → #e982ab` — KSVL spotlight, Closet, town-map caption bar
3. Teal → purple  `#2f8f8b → #5b7a99 → #75639a` — weekly, Jeeves reference, manifesto, footer

Light panels = pale tints of the same families (activities = pale purple→pink; town = pale teal→purple).
Page ground = warm cream → rose → pale teal wash (150deg, fixed attachment). Topbar = same wash, ink text.

Accents: pink `#e982ab` · teal `#3aa8a4` · sunset coral `#e8875f` · lavender `#cabbe8` (lighter lilac `#9a86c0`).
Plum = ink/small text on light surfaces only. Gold is RETIRED → one pastel yellow `#ffe08a`
everywhere (button fills, text links, eyebrows on dark, closet stars, namecheck bar, topbar hairline).
"Bad chartreuse" ruling: old antique gold #c9a227 must never sit on pink.

Per-panel accent assignments (Ali rulings):
- Masthead kicker: "> LAiDIES ONLINE" pink · dot lavender · "CONNECTED TO SUNNYVAiLE, 1999_" coral (cursor coral)
- Masthead font: ALL Jost (VT323 and Playfair retired). Title Jost 800.
- "Why is there a town?" outline: sunset coral
- Weekly eyebrow: lavender · ritual step labels: lavender · number dots: teal
- Jeeves + manifesto eyebrows: sunset coral (coral = eyebrow rule on teal→purple panels; weekly is the lavender exception Ali chose)
- Manifesto: plum headings OK, body text softened to #dcebe9 (stark white beside plum = bad)
- Footer: teal→purple gradient (plum scrapped), logo Ai in lavender
- Activity card buttons rotate teal/pink/coral/lavender (pink+coral get ink text) — not all plum
- Shape rule: every clickable = 10px rounded rectangle. No pills.

## Copy rulings
- "Take the Wednesday lap" → "Take the Wednesday tour" (lap retired). Jeeves' "Need one answer—not
  a tour?" coexists deliberately: Jeeves = skip-the-lesson lookup desk.

## Asset rulings this session
- Town map in comp: `assets/final_map/sunnyvaile-town-map-final-v5.png` (Ali's brighter regen,
  same layout). OPEN QUESTION: does v5 replace the locked map on live pages, or homepage-only?
- MAiKEOVER storefront: canonical = `assets/sunnyvaile-buildings/y2k-v3/09-maikeover-on-maine.webp`
  (what live clubhouse-pass.html shows). Root-level `assets/09-maikeover-on-maine.jpg` is a retired dupe.
- Masthead art candidates in switcher rotation: 7 street renders + pc-park.png ("Time travel rule
  no. 1"), pc-welcome.png ("Visit Beautiful"), pc-dial-up.png — all from assets/postcards/from-sunnyvaile/.
  Both pc- candidates have headline text baked in; if one wins we either regen text-free or let the
  art carry the headline. There is one postcard per building in that folder (better for district
  cards than masthead). NOT chosen yet.

## Still open (carried)
- Masthead art: pick the winner, remove switcher.
- Copy-explainer pass: one doc, every section, "what/why/how in two sentences, non-overlapping" — promised, not started.
- Library deep-dives: "The Algorithm" v2 awaits redline; then compiler/AI winter/training data; cards after.
- #25 canon backfill (episode-04 first), #14 site-index, #17 save-a-book, #18 background picker,
  #20 merit_badge, #22 Supabase schema (needs Ali approval).
- Housekeeping: retire loose businesswomen-special root files; delete redundant
  content/printables/issue-04-founding-mothers-timeline.html (perm-blocked for Claude; Ali to toss).

## Standing constraints (never relax)
Never git checkout/restore/clean (iCloud binary revert danger — recover via `git show <commit>:path > path`).
Ali deploys (push + Cloudflare purge) — Claude never pushes. Codex = images ONLY. Supabase schema
changes need Ali's explicit OK. Bump cache-busters on data/CSS/JS changes to live pages. Locked
fact-verification; honest labels; "Ai" accent rule; AI is "it"; Canadian English; no emoji chrome.
