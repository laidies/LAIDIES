# LAiDIES — FULL HANDOVER
_Written 2026-07-24 for Ali, to hand the whole project to ChatGPT / Codex / any next hands._
_Honest state of everything: what's done, what's broken, what's not pushed, what's outstanding._

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

## 5. SITE / BUILDINGS
Source of truth for scope: `building-launch-status-2026-07-01` + `launch-punch-list-2026-07-10` +
the `full-site-audit-2026-07-14` / `experience-audit-2026-07-14` + `overnight-audit-2026-07-23`
(37 ranked gaps). **Design target = the homepage** (full-bleed art, candy accents, dark aubergine,
no centre column — measured values in `homepage-bar-measured-numbers`). One design system, one
palette (`site-coherence-rule`, `brand-palette-and-type-lock`; gold+plum RETIRED sitewide).

Key buildings / surfaces (state per memory):
- **LIBRAiRY** — working build is `library.html` (= v3, promoted 2026-07-21). ⚠ locked decisions in
  `operations/library-decisions.md` — read before touching. Books content-wired (7 books, magazine
  reader). Has 2 pre-existing dead `href="#"` in its TOC error-fallback JS (known, minor).
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
**PUSHED to `origin/homepage-redesign`:** 23 earlier commits + 3 new this session:
- `3b7f2ef` code/wiring/narration-fix/captions checkpoint
- `b5b56bc` ops docs + captions + supabase migrations + tooling
- `a970ad8` 368 in-use image assets (referenced by pages/cue-sheets)

**NOT committed (intentionally):**
- **All episode/trailer video mp4s** (too big for GitHub + not blessed). These need R2 hosting.
- **~120 reject/alternate images** (superseded renders — excluded per the curation pass;
  `operations/ops/curation.json`).

**⚠ Commits this session used `--no-verify`** to bypass the pre-commit gate (it flagged the known
library TOC dead-links). The gate is now DISABLED (see §10).

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
