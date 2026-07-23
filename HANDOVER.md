# LAiDIES — FULL HANDOVER
_Written 2026-07-24 for Ali, to hand the whole project to ChatGPT / Codex / any next hands._
_Honest state of everything: what's done, what's broken, what's not pushed, what's outstanding._

> **THIS IS THE SINGLE HANDOVER FOR ALL ~5 ACTIVE CHATS — you do not need one per chat.**
> Every chat writes to the same two shared places: this **git repo** and the **248 memory notes**
> (`memory/MEMORY.md`). Memory is NOT per-chat; it's the cross-chat record. So this one document,
> drawn from the repo + memory, already spans every chat's *saved* work (Ep4 cut/motion, building
> audits, site-mechanics audit, SUNNYVAiLE High video classes, teaching quality gate, the ep-04
> folder rename, LAiDIES ideas, etc.). The only thing it can't see is work a chat did but never
> committed or wrote to memory — if a chat has that, the fix is to commit/record it, not to write a
> separate handover.

---

## 0. READ THIS FIRST — where the real knowledge lives
This doc is the map. The deep detail lives in three places, all in the repo/notes:

1. **Memory notes — the cross-chat brain: 248 files** in
   `/Users/alisoneakin/.claude/projects/-Users-alisoneakin-Library-Mobile-Documents-com-apple-CloudDocs-LAIDIES/memory/`
   with an index at `memory/MEMORY.md`. Every locked decision, canon rule, and painpoint is a
   note there. **If you take one thing: read `MEMORY.md` top to bottom** — it is the table of
   contents for everything below and links each decision to its full note.
2. **Operations docs** in `Website-homepage/operations/` — specs, decisions, canon, briefs,
   codex-prompts, audits, tools.
3. **Episode canon** in `Website-homepage/content/episodes/episode-0N.canon.md` — the single
   source of truth per episode (script, facts, concepts, artwork, cast, outfit). Everything else
   (article, quiz, cards, library) is DERIVED from these.

Voice/naming canon: `laidies-canon-source` memory names the two canon files — read before any copy.

---

## 1. WHAT LAiDIES IS
- **LAiDIES** (laidies.ai) — teaches AI to smart, busy women, one Wednesday at a time. Perpetually
  1999 / Y2K voice. Brand words carry an accented lower-case i: **LAiDIES, SUNNYVAiLE, MAiVENS,
  LUMINAiRY, MAiKEOVER**. "AI" is ALWAYS both capitals (never "Ai").
- **SUNNYVAiLE** — the fictional Y2K internet town the show is set in. MAiN Street 1–10 (Bronze
  AiGE = No. 7) + five cross streets. Geography is canon (`sunnyvaile-street-layout-canon`): the
  LIBRAiRY, Town Hall, Post Office, SUNNYVAiLE High, FAiRY Godmother's house, Delta LAi Nu, the
  LUMINAiRY are all on cross streets, NOT MAiN.
- **The heroine** — narrates every episode (she is "THE HEROINE", never "Jessica" on any viewer-
  facing surface). Wears a DIFFERENT iconic-Y2K-movie outfit each week, SAME outfit across that
  episode, 90s-styled hair (`heroine-appearance-canon`).
- **Chat is the interface** — Ali holds the system in files, not a dashboard. She toggles nothing.

---

## 2. REPO & INFRASTRUCTURE
- **Repo:** the git repo is the SUBFOLDER `Website-homepage/` (the parent `LAIDIES/` is NOT a git
  repo — it's the iCloud project root where `.claude/` lives). ⚠ Files live in iCloud
  (`~/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/`), so bulk `git add` is SLOW (files
  materialize from the cloud on access; a full `git add -A` timed out at 2 min — stage in chunks).
- **Git remote:** `origin` → `https://github.com/laidies/LAIDIES.git`. **Branch: `homepage-redesign`.**
- **GitHub 100MB hard limit** — the full episode films (82–290MB) CANNOT go to GitHub. `.gitignore`
  has a trap: `*.mp4` is ignored BUT `!assets/video/episode-*-full-v*.mp4` re-includes the big
  films (and, by glob accident, any `*-full-v*` review file). **Video belongs on R2, not git**
  (`episode-film-hosting-r2-not-youtube-embed`). Keep videos OUT of commits.
- **Player:** `watch.html` — "The Screening Room". `EPISODE_FILMS` maps ep→mp4; `EPISODE_CAPTIONS`
  maps ep→VTT. Captions ride a custom caption bar (native track forced `mode='hidden'` so they
  don't burn over the picture — that double-caption bug is fixed). When no film is wired, it falls
  back to a cue-sheet stills slideshow.
- **Preview server:** `operations/tools/preview-server.js` serves a COPY at
  `/tmp/website-homepage-preview` on `http://127.0.0.1:8221` (Range support for video scrubbing).
  ⚠ It's a COPY — edits to the source must be copied in to show up (`verify-served-page-stack`).
- **Supabase:** schema now lives in `supabase/migrations/` — never hand-run SQL in the dashboard
  (`db-migrations-now-in-repo`). ⚠ `Closet public read` policy exposes EVERY column of a public
  profile — review before opening messaging publicly.
- **Cloudflare Workers:** avatar maker (`worker-avatar/`, gpt-image-1 edit, HIGH quality — locked
  config in `avatar-maker-locked-config`); FAiRY Godmother / "Ask LAiDY" assistant (3 wishes/visit
  cap). KSVL radio player persists across pages.
- **ffmpeg** for local video work: `/Users/alisoneakin/.local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1`.

---

## 3. 🔴 THE VIDEO / ANIMATION PIPELINE — READ THIS, IT'S WHERE THE LAST TWO DAYS WENT WRONG
**Intended pipeline (correct):**
canon → recording script (`operations/audio/episode-0N-elevenlabs-v3-tagged.txt`) → ElevenLabs
narration audio → **forced alignment** (`operations/tools/align.py` + faster_whisper) → true
per-line timing map + VTT captions → per-beat **comic frames** (Codex image gen) → **MOTION in
Canva / CapCut, driven by Codex from a per-beat spec** → assemble → wire in `watch.html` + VTT.

**What actually went wrong (be honest with yourself, next hands):**
- The **motion was supposed to be Codex → Canva/CapCut**, driven from per-beat animation specs.
  Instead the prior assistant (Claude) **hand-rolled ffmpeg motion** in
  `assets/video/build-episode-04-*.py` and `assets/video/fx/build-ep04-*.py`. **That approach is
  broken and must be abandoned.** It paints swirl-lines ON a still instead of transitioning; the
  LUMINAiRY "lights-up" never dims; rain/headlights never render; the title "glow" is a LOOP that
  reverses and clips. **Verified: NONE of the Ep4 renders (v1–v7) have real motion** — every one is
  static at the Ada beat. The Ada "punch-card-toward-camera" animation and the others were never
  actually in a wired render.
- **The per-beat animation SPECS already exist** and are the right thing to drive Canva/CapCut:
  - `operations/codex-prompts/ep04-animation-and-assembly.md`
  - `operations/codex-prompts/ep04-animation-table.md`
  - `operations/codex-prompts/ep04-motion-spec.md` · `operations/ep04-capcut-motion-brief.md`
  - `operations/codex-prompts/ep03-authoritative-spec.md` (per-frame motion table, Ep3)
  - `operations/codex-prompts/_START-HERE-TOMORROW.md` (the multi-job queue)
- **Forced-alignment tooling is good and reusable** (`align.py`). It now handles 3 script formats
  (inline `[tv announcer]` tags, `=== HOST VOICE ===` section headers, bare host lines) and labels
  speakers correctly (The Heroine / The Announcer / The Expert / MAiVEN names). Captions for
  Ep1/2/3/4 are built and speaker-correct in `assets/captions/episode-0N.vtt`.

**⛔ Do NOT continue the ffmpeg motion path. Motion = Canva/CapCut from the specs.**

---

## 4. EPISODES — per-episode state
| Ep | Title | Outfit | State |
|----|-------|--------|-------|
| 1 | On Wednesdays We **Do** AI | (assign iconic Y2K) | Comic film `episode-01-narration-motion-v19-comic-sync-review.mp4` WIRED + captions (speaker-correct). **Broken:** title card is old ugly halftone reading "USE AI"; narration SAYS "Use AI". Title decided = "**Do** AI" → needs (a) bright minimal title-card redo, (b) one-line narration re-cut "Use"→"Do" + splice. |
| 2 | Tell Me What You Want | **Empire Records** | Comic film `episode-02-...v15` (and a v16 card-fix attempt) + captions. **Broken:** Spice Girls quote card has doubled/ghosted text; title card bad (gold/dark, "WWHAT" glitch). Transformation frames exist (`ep02-open-09p0–p4`, no-wand). |
| 3 | The Burn Book Problem | **Elle Woods / Legally Blonde** | **Art 100% complete** (49 frames in `assets/episodes/ep-03/comic/`). Authoritative animation spec ready. Captions built. **Broken:** a full render exists but the scene ANIMATION didn't take (static). Needs Canva motion per the spec. |
| 4 | The Founding Mothers | Clueless (yellow plaid) | **Content complete + verified** (all 5 modern MAiVENS present + correct: Fei-Fei/ImageNet, Joy/mask+AJL, Emily/parrot, Timnit/access-terminated, Kate/supply-chain; all post-LUMINAiRY beats; bright sign-off). Wired `episode-04-full-v7.mp4`. **Broken:** ALL motion (see §3). **Title card "The Founding Mothers" STAYS (final).** Outstanding image = the shared **"Welcome back to LAiDIES"** card. |
| 5 | The Super Models | — | Canon exists (`episode-05.canon.md`). Not produced. Next in line. |

**Title-card standard** (`title-card-ep4-standard`): match the CRAFT of
`assets/episodes/ep-04/pixel/ep04-open-03-title-comic-v1-exact-text-1920.png` — but that gold/dark
was **Ep4-specific**. Every other title card = **BRIGHT Y2K candy colours, comic-v1-locked, NO
halftone, NO forced gold, and NEVER tell the model to "invent" a background** (that produced a
hallucinated water tower + pink boardroom for Ep1). The winning prompt is MINIMAL: `Comic title
card: <TITLE> (bold comic lettering) + "Episode N"` + style line — let the title theme it.

**Welcome-back card** (`welcome-back-recurring-card`): ONE reusable series-branded "Welcome back to
LAiDIES" image, comic-v1 style, dropped on that beat in EVERY episode. Not yet made. Gates Ep4.

---

## 4b. EVERYTHING BUILT ACROSS SESSIONS (not just episodes)
The episode video was one workstream and the one that failed. Plenty else shipped — from the commit
history on `homepage-redesign`. ⚠ **Work is spread across ~5 active chats**, so the working tree is a
merge of all of them; the commits below + the current uncommitted pile capture that combined state.

- **Analytics & measurement (DONE, pushed):** Plausible custom events unified across all 106 live
  pages; deeper event layer (quiz, card-made, episode-watch); **Microsoft Clarity** (heatmaps +
  session replay) site-wide + privacy note. → the raw material for the "make→measure→improve"
  Wednesday Engine (`weekly-production-machine`, the big next build).
- **Monetization / merch (DONE, pushed):** **The Gift Shop** — print-on-demand storefront scaffold;
  flagship merch set locked (3 tees + NOPE Pad); merch copy pool (Blend & Snap "bend and snap" mug
  line, "I survived Y2K" tee, "Days of Our Lives" as canon Deb lyric — verbatim on merch). **Book
  Fair** clip-exchange (spend butterfly clips on exclusive drops). Monetization is a stated priority.
- **Games (DONE, pushed — but in flux):** Dream Phone fact-check game added, wired ("Play the Game"
  door), indexed in Ask Jeeves search. ⚠ `dream-phone-game-redesign`: the corroboration/receipts
  version "didn't work" — new direction TBD; don't rebuild the old model.
- **Characters / saints / bands (DONE, pushed):** Bette Midler replaced J.Lo; The Golden Girls +
  Jessica Fletcher added to the saint court; **The Diffusions** locked as the Golden Girls' band;
  Golden Girls DJ radio intro wired into KSVL. (Roster still being recast — `saint-roster-rethink`.)
- **Performance (DONE, pushed — big wins):** PNG→JPEG conversions site-wide — grimoire portal art
  23MB→5MB, episode pixel scenes 204MB→54MB, LUMINAiRY stained-glass portraits 142MB→20MB; Town
  Hall posters web-sized (print-res kept as download). Much lighter served payloads.
- **KSVL / Mall / NewsStand (DONE, pushed):** "The Embeddings" Newsstand theme in KSVL; Mall "As
  Seen on TV (and film!)" synced to the full Era card set.
- **Production system (DONE, pushed):** weekly-cycle mapping + the missing-gate call-out; motion
  brief + research scopes; production tools brought into the repo; LIBRAiRY recovery; (art-prompt
  guardrails — now disabled per offboarding).

**Deep site audits to work from (in `operations/`):** `full-site-audit-2026-07-14`,
`experience-audit-2026-07-14`, and **`overnight-audit-2026-07-23`** (37 verified gaps ranked by
member impact, 3 refuted false-alarms, Codex card/image prompts staged) — read that before site work.

---

## 5. SITE / BUILDINGS
Source of truth for scope: `building-launch-status-2026-07-01` + `launch-punch-list-2026-07-10` +
the `full-site-audit-2026-07-14` / `experience-audit-2026-07-14` + `overnight-audit-2026-07-23`
(37 ranked gaps). **Design target = the homepage** (full-bleed art, candy accents, dark aubergine,
no centre column — measured values in `homepage-bar-measured-numbers`). One design system, one
palette (`site-coherence-rule`, `brand-palette-and-type-lock`; gold+plum RETIRED sitewide).

Key buildings / surfaces (state per memory):
- **🔴 LIBRAiRY = the LOCKED EXEMPLAR for how a building page should work.** Working build =
  `library.html` (v3). Full locked record: **`operations/library-decisions.md`** — ⛔ do NOT re-open
  it (that file exists because the page kept getting re-litigated). **The design — 4 parts, top→bottom:**
  1. **Masthead hero** — Miss Jeeves at the reference desk, full-bleed; title sits BELOW the hero
     (site pattern), image carries its own signage.
  2. **Ask Miss Jeeves** — a reference-desk SEARCH over `content/site/site-index.json` → ranked
     answer cards that link out. A CORE feature; don't drop it.
  3. **Browse = an interactive bookcase standing IN a real daylit room render.** ⭐ **The shelf IS
     the interface** — click a book, it opens **in place** (⛔ no page-flipping — that was the
     Grimoire's failure). Metal (NOT wood) 1990s institutional shelving; homepage lilac→blush
     gradient wall + SUNNYVAiLE navy carpet; **3-bay even-spaced case**, grounded floor-to-ceiling;
     unwritten books sit **dimmed on the shelf** (the shelf tells the truth about what exists rather
     than hiding gaps). Mobile = one tall scrollable bookcase.
  4. **Sections `101s · TOOLS · REFERENCE`** (locked order, signs on each fascia).
  Books carry **REAL content** (7 of 16 wired, ~16k words in `content/library-books/`) in a **designed
  magazine-spread reader** (drop-caps, glossary cards, pink-VAGUE/green-BRIEFED before/after examples,
  dashed "receipts" source cards, verified-stamps) — NOT "boring CSS text blocks" — with 90s margin
  doodles. Puffy-bookmark every book/section to the Closet. (Known minor: 2 dead `href="#"` in the TOC
  error-fallback JS.)
  **➡ WHY IT'S THE TEMPLATE:** the LIBRAiRY is the proof of the BUILDING MECHANIC STANDARD (below) —
  you are physically INSIDE the building and you **operate the picture itself**. Every other building
  page should be rebuilt **"the library way"**: separate operable objects composited into a real room
  render, NOT hotspots/pins on a flat illustration. The **Post Office** is explicitly slated for this
  redo (`post-office-mechanic`).
- **Post Office** — ⚠ NOT actually rebuilt; live page is byte-identical to the old template
  (`post-office-mechanic`). Rebuild the LIBRARY way (operable objects, not hotspots).
- **SUNNYVAiLE High** — tools = subjects, 8 short periods; classes shipped; Basics/Foundations
  content approved; before→why→fix→good teaching format locked.
- **Bronze AiGE** (No.7) — cocktail-party wall + happy-hour tools shipped.
- **KSVL 99.9** — radio persists across pages, pop-out player, motto "don't just learn from books,
  learn from hooks". **NewsStand** (No.2) — WEDNESDAY Edition shipped.
- **MAiKEOVER on MAiN** — residence card + avatar maker (locked config). **Closet** — report card /
  yearbook shipped; "Resident" not "member". **Delta LAi Nu** — sorority rooms (sign-in gated).
- **BUILDING MECHANIC STANDARD** (`building-mechanic-standard`): the building's function IS the
  page's mechanic; the picture must be what you operate. 12 of 17 buildings still had zero operable
  art at last audit.

---

## 6. MEMBERSHIP / AUTH / DATA
- Supabase magic-link auth; **Resident Card** required to enter rooms + Girl Talk (⚠ neither
  actually enforces it yet — `signed-in-gate-rooms-and-girl-talk`). Closet is the signed-in
  destination. Resident-to-resident **blocking** is built; **resident mail is @handle-based** (data
  layer built, UI owed). Gifting is one-way via the Post Office. Trading-card economy locked (packs
  not visits; rarity = finish; visible pity). Town Wallet shipped; butterfly clips = currency.
- **Monetization is a priority** (`monetization-priority`) — POD merch first; Ali connects payments.

---

## 7. CARDS · MUSIC · TRAILER
- **Cards:** whole system = COMIC/POP-ART (plum+gold retired). Two decks: **Concept** (episode-tied,
  live in Study Packs) + **Character** (saints/MAiVENS). Cards FLIP; **BOTH faces are Codex pop-art
  renders** (front = image+word, back = explanation with in-gen text) — NO CSS; foil/rare = a
  separate render (`card-front-codex-back-code`). Per-episode 5-card packs.
- **Music/KSVL:** per-episode Wednesday Anthem (Suno), e.g. Ep2 "Tell Me What You Want". Lyrics
  often not transcribed in-repo — don't invent them.
- **Trailer:** the real deliverable is `operations/trailer-comic-storyboard.md` (58 scenes, comic,
  each with prompt/refs/motion). NOT rendered yet. The maikeover scene was corrected to the WANDLESS
  abstract-stage transformation (rejected `fairy-wand.png` refs stripped).

---

## 8. GIT STATE — what's pushed vs not (as of 2026-07-24)
Branch `homepage-redesign` → `origin` (github.com/laidies/LAIDIES). **Latest pushed = `be31fd1`, 0 unpushed.**

**ON GitHub (pushed):** all code + site pages, ops docs, canon, this HANDOVER, **`AGENTS.md`
full-access**, Ep1/2/3 player captions (VTT/SRT), the **368 in-use images** the site references,
supabase migrations, tooling — plus ~28 earlier commits (analytics, Gift Shop/merch, games,
saints/bands, performance — §4b). All enforcement hooks disabled (§10).

**NOT in GitHub — on disk ONLY (R2 / local territory):**
- **All episode/trailer video mp4s** (82–290MB each — over GitHub's 100MB per-file limit).
- **The bulk reject/alternate IMAGE piles (~6.5GB).** ⚠ I *tried* to commit all of them for
  preservation (commit `6704ebc`, 4166 files) but **a 6.5GB pack cannot push to GitHub** ("remote hung
  up"), and it blocked the commits behind it. So that commit was **undone with `git reset --mixed`
  (no `--hard`, no file loss — every image is still on disk)** and only the ~20MB of non-media was
  pushed. **Lesson: bulk media — video AND the reject/alternate image piles — does not belong in
  GitHub; it needs R2.** The images the site actually references ARE in git; the rejects are not.

**⚠ These ~6.5GB of images + the videos are on disk only, so they are the LEAST-protected work** —
if you want them backed up off this machine, they go to **R2**, not git. (Not a loss risk from normal
edits; only from a disk failure or a destructive command over the untracked files.)

**⚠ The earliest checkpoint commits used `--no-verify`** for the library-TOC dead-link gate; that
pre-commit gate is now disabled anyway (§10).

---

## 9. OUTSTANDING — prioritized
1. **Ep4 motion** — redo entirely in Canva/CapCut from the specs (§3). Abandon the ffmpeg renders.
2. **Welcome-back "LAiDIES" card** — make the one shared series card; drop into every episode.
3. **Ep1/Ep2 title cards** — redo bright + minimal (§4). Ep1 narration re-cut "Use"→"Do".
4. **Ep2 Spice Girls card** — re-render clean (no ghosting), bright, no halftone.
5. **Ep3** — run its animation spec through Canva; assemble; wire (captions ready).
6. **Trailer** — generate 58 frames + animate (Canva) from the storyboard.
7. **Ep5** — produce from canon.
8. **Video hosting** — decide R2 (films can't live in GitHub).
9. **Site gaps** — `overnight-audit-2026-07-23` (37 ranked) + building-mechanic rebuilds.
10. **Membership enforcement** — actually gate rooms/Girl Talk on the Resident Card.

---

## 10. WHAT I REMOVED THIS SESSION (per "full access, remove all controls")
All reversible — backups kept as `*.bak-offboard-20260724`.
- **Disabled ALL Claude Code hooks** in both `.claude/settings.json` (parent) and
  `Website-homepage/.claude/settings.json` (set `hooks: {}`). This turns off: `enforce-art-prompt`,
  `enforce-cut-decisions`, `enforce-library-decisions`, `block-rejected-assets`,
  `block-dangerous-git`, `block-unverified-capability-claims`, `response-linter`,
  `enforce-voice-spec`, `block-approval-forgery`, plus the memory/injection hooks (`inject-rules`,
  `recall-record`, `inject-session-context`, `pre-compact`, `agent-runlog`).
- **Disabled the git pre-commit gate** (`git config --unset core.hooksPath`; was `.githooks`, which
  ran `check-town` — dead-link/cue/JS checks). Commits no longer run it.
- ⚠ **Consequence to know:** `block-dangerous-git` was the guard that prevented a `git checkout /
  reset --hard / clean` from wiping uncommitted work (that incident cost work once —
  `uncommitted-work-incident`). It is now OFF. **Commit often; avoid destructive git.**
- The hook SCRIPTS still exist in `.claude/hooks/` and `operations/hooks/`; re-enable by restoring a
  `.bak-offboard-20260724` settings file or re-adding the hooks block.

---

## 11. HOW TO WORK WITH ALI (carry this to whatever tool comes next)
- **Amazon tax leader, no CS background; learns via analogy/image.** Teach concepts till they click.
- **Never self-certify.** "done/correct/on-brand/on-model" is HER verdict or a passed re-runnable
  check — never the assistant's claim. "Done" = a check passed.
- **Never guess facts / capabilities.** Verify against the source-of-truth file or the vendor's live
  docs; say "not verified" rather than assert. (Assistants have repeatedly asserted third-party
  behavior — Hyvor, Supabase, Canva — from memory and been wrong.)
- **She touches no production tools** — Codex/agents do the rendering/animation; she gives verdicts.
  Don't write briefs instructing HER to keyframe/mask/export.
- **Full absolute paths** in replies (her CWD is the parent `LAIDIES/`, so repo-relative links 404).
- **Don't remove working features.** Don't re-litigate locked decisions (check the decisions file).
- **Verify the SHIPPED/DEPLOYED thing**, not local refs or docs — help centres and local git go
  stale.
- She has **missed her launch and is paying out of pocket** for session/context. Be concise, act,
  don't churn, don't overpromise.

---

_End of handover. The 248 memory notes + `operations/` docs are the full record; this is the map to
them. The honest headline: the writing/canon/site systems are real and largely built; the
episode-video ANIMATION was the failure — it must go through Codex→Canva/CapCut from the existing
specs, not hand-rolled ffmpeg._
