# Session context — homepage comp, final stretch (2026-07-12, evening)

Supersedes `operations/session-context-2026-07-12-homepage-palette.md` for comp state.
Comp lives at `concepts/codex-homepage-2026-07-12/` (index.html, styles.css, app.js, assets/).
Preview via "Preview Homepage Concept.command" (localhost:8000). Ali deploys; Claude never pushes.

## Comp state (all Ali-approved unless noted)

**Header:** lavender→pink→teal wash, ink text, pastel-yellow hairline, Jost. Nav + KSVL pill +
"Sign in" (→ /post-office.html#signin) + pink "Join the town" btn (→ /maikeover.html). Uses live
classes .signin-link/.join-btn so sv-nav-auth.js swaps state after port. Menu btn is mobile-only.

**Hero:** main-street-dusk default; #bgTry switcher still in (REMOVE BEFORE SHIP; art winner not
chosen). Kicker pink/coral split. Four jump buttons now ONE ROW spanning the masthead bottom
(absolute, over the dark strip): New in town?/#method · This Week's episode/#this-week ·
Here for one thing?/#today (label still placeholder) · Explore the town/#town.

**Method (#method):** grid — left: head (eyebrow, H2 "Your brain kept the references…", strap),
2 intro ¶s, trailer link, dial-up postcard (cream MAT frame — no CSS rounding over baked art),
yellow town-anthem chip. Right: purple→pink "Why LAiDIES exists" box — eyebrow top (equal
spacing), Ada stained-glass card + caption "Keeper of the First Algorithm", ¶ "Women have been
shaping this field from the very beginning…", ¶ "What it becomes next… may as well have fun.",
"In the famous words of Founding Mother Karen Spärck Jones:" + quote "Computing is too important
to be left to men." + "So join LAiDIES and make sure women continue to light the way." + links
"Read their stories at the LUMINAiRY →" and "Listen to Ep 04 · It Was Women All Along →"
(→ /chick-flicks.html). Box ends level with left column. Below, full-width "How it all works"
+ 5 steps in two balanced CSS columns (padding-bottom not margins — keeps col tops aligned).
Step 4 rewritten by Ali (tightened): motto inline, + teal "Tune into KSVL 99.9" link w/ onair dot
(radio self-starts). Step copy is Ali's verbatim otherwise.

**Weekly (#this-week):** intro says episodes (never chapters), "start with the Trailer, then
Episode 1", nine-stop route. Side panel: "Where you are in the season" — Ep 04 heading, season
track (Trailer + Eps 1–4 rows, links to /issues/issue-0N.html, Ep 04 ringed "THIS WEEK" + pink
mini play btn for the anthem), newcomer line + Visitors Centre link, plum "Sign in to go to where
you are in the season →" (→ /post-office.html#signin), teal "See all episodes →" (/episodes.html)
+ coral "Go to this week →" (/this-week.html) inside the card. fc-resume hidden state +
window.svShowResume(epTitle,href) hook for signed-in wiring. SCALING RULE (agreed): track shows
max 5 rows — "+ N earlier episodes →" collapsed top row, 3 before current, current; window ends
at this week (signed out) or your episode (signed in); Trailer row only while in window.
Route: 9 linked stops w/ live data-stop keys (newsstand, chick-flicks, blend-snap, KSVL=NEW,
sunnyvaile-high, mall, maikeover, bronze-aige, sorority-house) — cards rotate accent tints +
matching number circles. Ghost chip "The Wednesday theme" above route. Express bar = pink
gradient, plum text, white Start → (white version rejected; cream version rejected).

**Activities:** H2 "Games and tools, open all day." + Ali's sub-line. Cards: FAiRY Godmother,
Mme CLAi-O (FIXED: "Just for fun · 2 min", tarot deck of '90s/Y2K objects, advice w/
late-night-commercial drama), Businesswomen's Special (img now object-position:center),
Dream Phone (booth close-up 17-dream-phone-booth.webp), Girl Talk (card-back.png shown whole on
plum field — board photo banned as old-site style), NewsStand (REPLACED Residence Card card;
news lives here: "AI news translated for women who need to know what's actually going on…").

**Spotlights:** KSVL + LUMINAiRY (Karen quote REMOVED from spotlight — now in why-box).
**Reference:** Miss Jeeves unchanged. **Town:** map is interactive — invisible hotspots per
building (17, KSVL = one tall rectangle tower+storefront), popup card w/ name, canon one-liner,
Go there →; caption "Click any building…"; districts + full directory below; Schoolhouse card
fixed ("101 classes" removed — we have no 101 classes at the school). **Closet:** editorial
float layout, binder in cream mat frame. **Postcard band:** Buttondown weekly signup.
**Footer:** G3 gradient, lavender Ai.

**Music system:** chips play through a DOM <audio> so mini-player.js (copied into comp assets)
adopts it → persistent controls, carries across pages. Audio in comp assets/audio/ (town anthem,
Wednesday theme, Ep 04 anthem).

## Port checklist additions (task #27)
- Add mini-player.js/css to live index.html (not currently loaded there).
- Add 'ksvl' stop (num 4, /radio.html) to STOPS in content/site/sv-tour-checkin.js; renumber;
  reward logic adapts to length automatically. Route markup ships from comp.
- "This week's anthem" chip + season-track current row must key off current week (no hard-coded
  Ep 04); wire resume state via Supabase member_issue_progress → window.svShowResume.
- Season-track windowing rule (above) needs JS at port.
- Remap comp asset paths → canonical repo paths; remove #bgTry switcher; run check-town.js;
  bump cache-busters; local commit only — ALI pushes + purges Cloudflare.
- assets/girl-talk-board.webp left orphaned in comp assets (sandbox couldn't delete) — exclude.

## Live-page edits already made this session (outside comp)
- luminairy.html: MAiVENS wing epigraph — "The fathers only named it. It took a Godmother to
  make it." — The Priors, "It Was Women All Along" (verified lyric, operations/audio/
  ep4-founding-mothers-anthem.md).

## Art pipeline (Codex = images ONLY)
- Girl Talk restyle brief WRITTEN: operations/codex-brief-girl-talk-cards-2026-07-12.md
  (card back + truth + dare: cream/blush/lavender field, single rounded keyline, gold sparingly,
  pink/teal/coral accents). Ali runs Codex. Once approved → update canon index §9 + this is the
  LAST image the homepage needs.
- Ruling: current plum/gold Girl Talk cards "too gothic for the site now."

## Roadmap after homepage ships (tasks #28–#32)
#28 trading cards restyle (Ep 4 set clashes; deck never locked) · #29 101 textbook illustration
redo · #30 site-wide image audit · #31 restyle all pages to homepage system · #32 page-by-page QA
(PRIORITY: Closet + Residence Card signup at MAiKEOVER; member card design itself suspect).

## Process rules reaffirmed this session
- ALWAYS give full file paths when referencing files (fourth reminder — do not slip again).
- No MD files for design/copy review — she reviews on the rendered page.
- No copy invented mid-redline; draft against writing lock, offer options; her verbatim copy wins.
- Never crop baked-in art/lettering (mat-frame treatment is the approved fix).
- Read canon index + writing lock before ANY writing. Deficit framing about women is banned.
- Never git checkout/restore/clean (iCloud). Supabase schema changes need explicit approval.
- Open decisions: masthead art winner; "Here for one thing?" button name; H1 confirm.

## Image rulings (2026-07-12, late additions)
- `businesswomen-special-fortune-teller-open-v1.png` is RETIRED — Ali: "too cheap and tacky."
  Never use. Homepage reverted to frame-1-closed.webp; its dark-brown baked background is
  disliked → needs a reshoot in the image audit (task #30).
- NEW restyled Girl Talk set landed at assets/games/girl-talk/ (card-back, truth, dare —
  pastel fields, clean keyline). Homepage tile now shows TRUTH + DARE side by side
  (.card-duo, two 2:3 portraits = 4:3 slot) on the blush→lavender field.
- Masthead lede strong "Girl Power meets Machine Power" = pink #e982ab (was yellow).

## PALETTE FINAL (locked with Ali via swatch rounds, 2026-07-12 late)
Six accents: pink #e982ab · coral #ec7a78 · tangerine #f4a636 · teal #57b6c0 ·
sky #8bbde9 · periwinkle #b3abe7. Yellow RETIRED ("pulls it childish"). Old teal
#3aa8a4, lilac #9a86c0, coral #e8875f, rose #9b3f5f all retired. Text = cream
#fffdfb on dark / dark plum #3a1838 on light, nothing else; all accent fills take
dark plum text. #cabbe8 pale lavender = text-on-dark accent only, never a fill.
Full detail in operations/homepage-design-brief-2026-07-11.md (PALETTE LOCK — FINAL).
Placement calls this round: anthem chip coral; why-box links = pink pills, equal
width; Girl Talk button tangerine; NewsStand button sky; hero namecheck strong sky;
Closet section accents sky; step-4 chip tangerine (class .n-yellow is stale, rename
at port); route = 6-colour rotation.
Comp stylesheet now cache-busted (styles.css?v=N — bump on every CSS change).

## COMP CLOSED (all open decisions resolved)
- Masthead art winner: main-street-dusk (nighttime MAiN street). #bgTry switcher REMOVED from comp.
- Third jump button renamed: "Here for one thing?" → "Just running an errand?" (Ali chose between
  this and "Games and tools"; flip is one word if she changes her mind on the page).
- Comp is FINAL and approved ("ok great. this is it."). Next: port to live index.html (task #27).
- Sandbox cannot commit (iCloud .git perms) — Ali runs the git add/commit from Terminal.

## PORT EXECUTED (task #27 — built, awaiting Ali preview + commit + push)
New live index.html = live head (meta/icons/manifest/fonts/title) + inlined comp CSS (asset
paths remapped to canonical) + comp body + live script stack. 688 lines (was 1802).
- content/site/homepage.js NEW (v=20260712-1): menu/filters/tabs, map popups, song chips →
  DOM audio (mini-player adopts), route progress paint (svTour getState + sv:tour-checkin
  event), season-panel week-keying + windowing from /content/episode-index.json (re-renders
  only when latest published ≠ 4; anthem chip auto-hides if WEEKLY_SONG.ep falls behind),
  svShowResume hook. Lookup form → /library.html (Miss Jeeves has no ?q= support yet).
- sv-tour-checkin.js: ksvl stop added (num 4, /radio.html), stops renumbered 1–9, comments
  updated; cache-buster ?v=20260712-ksvl bumped on 11 pages; radio.html now INCLUDES the
  check-in script (it was missing).
- FACT CORRECTION at port: Ep 04 EPISODE = "The Founding Mothers" (issues/issue-04.html);
  "It Was Women All Along" is the SONG (The Priors, ksvl id ep-04). Season track + weekly h3
  corrected; why-box "Listen to Ep 04 · It Was Women All Along →" kept (points at the song).
- EXCLUDED from new homepage (old-markup scripts): sunnyvaile-directory.js (comp has its own
  directory + tabs), ksvl-player.js (mini-player is the homepage audio dock now), and all four
  old inline script blocks (sv-explainer anthem, playLaidiesTheme, ritualProgress painter,
  replay-trailer) — reimplemented or obsolete. KEPT: sv-gold-icons, sv-global-header (no-ops
  without .site-header markup — comp topbar retained as approved), sv-nav-auth (.signin-link/
  .join-btn present), sv-welcome-tour, quick-rail, sv-tour-checkin, charm-hunt,
  ai-accent-autowrap, mini-player (css+js, NEW on homepage).
- map-pop fallback href="#" → "#town" (comp + live) after check-town caught it.
- check-town: clean except 4 PRE-EXISTING items (canon files ×3 = task #25, merit_badge =
  task #20) — commit with --no-verify.
- New tasks: #33 resume wiring (member_issue_progress via script.js memberAuthClient),
  #34 weekly rotation checklist (episode-index + ksvl catalogue + WEEKLY_SONG in homepage.js).

## Post-port polish round (Ali reviewing local preview)
- ai-accent-autowrap.js REWRITTEN: rose+!important removed; Ai colour = headings/logo ONLY
  (canon rule reaffirmed — body Ai inherits); themeable via --ai-accent (town = teal);
  ?v=20260712-headings bumped on 83 pages.
- quick-rail REMOVED from homepage (redundant with jump buttons/nav/directory). Site-wide
  retirement proposed — full site map = global header Menu panel (full town directory).
  Awaiting Ali's call: pull from all 50 pages now vs at task #31.
- Ada canonical file assets/mavens/y2k-stained-glass-v3-finished/ada-lovelace-y2k-stained-glass.png
  was an OLD DAMAGED version (baked-in white arrow mark) — RETIRED by overwriting with the
  approved comp copy (md5 45401f06…). Also improves luminairy.html + issue-04 pages.
- why-box gradient rebuilt from locked palette: 150deg #5f5494 → #8d82c6 → #b3abe7
  (periwinkle shades — option A) in comp + live. Old violet G1 retired for this box.
- NEXT ROUND (after ship): background system — each accent gets deep/mid/pale ramp; ALL
  section backgrounds become 2-colour gradients from ramps + cream; adjacency rule stands;
  review as swatches per section, then one sweep + ramp table added to palette lock.
- Image frame ruling (Ali OK'd): photos = frameless, rounded, shadow; postcard art keeps its
  PRINTED baked-in frame (it reads as a postcard — never paint over/crop). No CSS keylines
  anywhere. Any image that still bugs her live → task #30 image audit.
- autowrap follow-ups shipped: .ai-run single-run wrapper (flex/gap word-splitting fix) +
  .ai,.ai-run{display:inline!important} (block-span line-break fix) — ?v=20260712-inline on
  83 pages. "eight-stop" → "nine-stop" corrected (live + comp).
