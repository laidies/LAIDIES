# HANDOVER — post-homepage-ship (2026-07-12, end of night)

Read FIRST, alongside (in this order):
1. operations/voice/laidies-canon-index.md — names/architecture (wins on names)
2. operations/voice/laidies-writing-lock.md — voice standard (read before ANY writing)
3. operations/homepage-design-brief-2026-07-11.md — includes PALETTE LOCK — FINAL
4. operations/session-context-2026-07-12-homepage-comp-final.md — full build/ship log

## STATE: the redesigned homepage is LIVE on laidies.ai (verified by fetch)
- Shipped via: Ali commit 65eb3c9 → merge 8d86b4c (Hot Goss bot had pushed to main) →
  GitHub Pages build #283 → SECOND Cloudflare purge. LESSON: purge AFTER the Pages build
  finishes (first purge raced the build and re-cached the old page).
- Task #27 closed. Live homepage = live head/scripts + inlined comp CSS + comp body +
  /content/site/homepage.js (v=20260712-1).

## PALETTE LOCK — FINAL (six accents; full detail in the design brief)
pink #e982ab · coral #ec7a78 · tangerine #f4a636 · teal #57b6c0 · sky #8bbde9 ·
periwinkle #b3abe7. YELLOW RETIRED ("pulls it childish"). Also retired: rose #9b3f5f,
old teal #3aa8a4, old coral #e8875f, lilac #9a86c0, #7fd6d0, #ffd9e8, all gold tints.
Non-accent text = cream #fffdfb on dark / dark plum #3a1838 on light — NOTHING else.
All six accent fills take dark plum text. #cabbe8 = pale-lavender TEXT accent on dark only,
never a fill. No yellow-family anything. No two adjacent sections share a gradient.
Ai accent colour = BIG BOLD HEADINGS + logo ONLY (body Ai inherits) — enforced by
content/site/ai-accent-autowrap.js (rewritten tonight; themeable per page via --ai-accent;
injects .ai-run inline wrapper — do not undo, it fixes flex-gap word splitting).

## CANON CONFIRMED TONIGHT
Ep 04 = "The Founding Mothers" (issues/issue-04.html). "It Was Women All Along" is the
SONG (The Priors, ksvl id ep-04). "Every SLAiYER Needs a Watcher" = a REPLACED old episode;
now valid only as: KSVL B-side, DJ-booth bonus track, SLAiYER Handbook Ch.1, SUNNYVAiLE
High concepts block. Never label it an episode.

## PRIORITY PLAN (agreed with Ali, in order)
1. CRITICAL-PATH QA on live (IN PROGRESS): every homepage CTA must not dead-end.
   DONE SO FAR: all 24 internal pages linked from the homepage exist as files.
   STILL TO DO: functional pass — does MAiKEOVER's Residence Card maker actually work
   (main CTA "Join the town" lands there; it was "in the works")? Sign-in flow?
   /this-week.html + /episodes.html content current? Route stop pages check in correctly
   (incl. NEW ksvl stop on /radio.html)? Map popup destinations sane? Mini player docks?
2. Quick-rail retirement on remaining 50 pages (homepage already done). Full site map =
   global header Menu panel (full town directory) — Ali accepts this as the replacement.
3. Background ramp system BEFORE any page restyles: deep/mid/pale ramp per accent; every
   section background = 2-colour gradient from ramps + cream; swatch review per section
   (use the widget flow that worked tonight); then one sweep + ramp table into the
   palette lock. (Why-box already rebuilt: 150deg #5f5494 → #8d82c6 → #b3abe7.)
4. Restyle pages in JOURNEY order: visitors-centre → chick-flicks → this-week/episodes →
   newsstand → blend-snap → maikeover + Closet + member card (Ali: card "probably terrible",
   real work not just paint) → rest of town.
5. Then: #33 resume wiring (member_issue_progress via script.js memberAuthClient →
   window.svShowResume — hook already live in homepage.js) · art pile (#28 trading cards,
   #29 textbook illustrations, #30 image audit incl. frame-1-closed reshoot) · check-town
   noise (#25 canon files ×3, #20 merit_badge) so the gate goes green without --no-verify.

## OPEN TASKS (board): #14 site-index · #17 save-a-book · #18 background picker ·
#20 merit_badge · #22 Supabase gifts/notes schema (NEEDS ALI APPROVAL) · #25 canon backfill ·
#28–#32 (above) · #33 resume · #34 weekly rotation checklist (episode-index.json + ksvl
catalogue + WEEKLY_SONG const in content/site/homepage.js — anthem chip auto-hides if stale).

## PROCESS RULES (standing — do not relearn these the hard way)
- Ali deploys: Claude NEVER pushes. Sandbox also can't commit (iCloud .git perms) — give
  Ali exact Terminal commands. check-town hook blocks commits: 4 known pre-existing issues
  → --no-verify is the conscious bypass until #25/#20 done.
- NEVER git checkout/restore/clean (iCloud reverts binaries; recover via git show).
- Codex = images ONLY. Supabase schema changes need explicit approval.
- Bump cache-busters on EVERY live data/CSS/JS change. Purge AFTER Pages build completes.
- Full file paths always. No MD files for design review — she reviews on the rendered page.
- No copy invented mid-redline: draft against the writing lock, offer options; her verbatim
  copy wins. Never crop baked-in art (postcards keep printed frames — ruled OK tonight;
  photos = frameless, rounded, shadow). Deficit framing about women is banned.
- Girl Talk: restyled card set (back/truth/dare) is LIVE; Codex brief closed. Retired
  images: businesswomen fortune-teller-open-v1 ("cheap and tacky"), old damaged Ada
  (canonical file overwritten with approved version 45401f06…), girl-talk-board.webp.
- Swatch-widget rounds BEFORE applying palette changes ("show me options before we keep
  making changes") — this flow worked very well tonight; repeat it for the ramp round.
- Save/refresh this handover + session context before any compaction.
