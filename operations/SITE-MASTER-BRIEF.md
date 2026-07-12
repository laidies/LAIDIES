# LAiDIES / SUNNYVAiLE — MASTER SITE BRIEF (what it is · what's built · what's left)

> The single source-of-truth handoff for the whole project. Read this first in any new window.
> Companion docs it pulls from: `operations/feature-inventory-2026-07-10.md` (features, deep),
> `operations/episode-page-design-brief.md` (the episode page), `operations/master-issue-board.md`
> (bugs/UX), `MEMORY.md` (canon index). Last compiled 2026-07-11.

---

## 1. What this is
**LAiDIES** = an AI-fluency brand for women, taught through a weekly **90s-TV show** set in a fictional
Y2K town, **SUNNYVAiLE**. Girl power meets machine power. Every feature has a *place* in town (episodes at
the video store, news at the NewsStand, study packs at the café, reference in the LIBRAiRY) so it's memorable,
not homework. Static HTML/CSS/vanilla-JS, GitHub Pages on `main`, Cloudflare cache in front (Ali purges).
Live Supabase backend (`content/site/supabase-config.js`) powers membership/magic-link/rewards.
Primary domain **laidies.ai**. YouTube @LAiDIES, IG @laidies.ai.

## 2. Design system — VERIFIED (source: `assets/sunnyvaile-page.css` `:root`, global header)
- **Fonts:** body/UI = **Inter** · headings/display = **Playfair Display** · wordmark+nav = **Jost** ·
  retro/VHS/OSD = **VT323** (pixel) · cursive accent = Dancing Script. (NOT JetBrains Mono.)
- **Palette:** plum `#4b2148` · plum-deep `#3a1838` · plum-soft `#6b3a66` · rose `#9b3f5f` · rose-bright
  `#c25b7d` · gold `#c9a227` · cream `#fffdfb` · pearl `#f8eef2` · blush `#f9e6ee` · **teal `#3aa8a4`** ·
  **pink `#c47c85`** · **sunset `#b97c5a`**. The **teal/pink/sunset** trio is the 90s energy; plum/rose/gold/
  cream support. Muted, never neon (neon OK only as diegetic town signage). No pure black/white.
- **"Ai" rule:** every brand word (L`Ai`DIES, SUNNYV`Ai`LE, M`Ai`VENS, LUMIN`Ai`RY…) renders "Ai" in the
  accent colour via `<span class="ai">Ai</span>`. Applies everywhere, always.
- **Chrome:** canonical global header via `content/site/sv-global-header.js`; icons via `sv-gold-icons.js`
  (no emoji chrome); sticky quick-nav rail.

## 3. The town — surfaces (all built pages)
**Main Street (No.1–10):** Welcome Wagon/Visitors Centre · NewsStand (`newsstand.html`, `hot-goss.html`) ·
The Chick Flicks (`chick-flicks.html` — episodes/video store) · Blend & Snap (`blend-snap.html` — study packs)
· Mme CLAi-O (`games/madame-claio.html`) · MAiKEOVER (`maikeover.html` — make your Residence Card) · BRONZE
AiGE (`bronze-aige.html`) · Net Flicks · The Mall (`mall.html` + 10 shops in `mall/`) · KSVL (`radio.html`).
**Other streets:** Town Hall (`town-hall.html` — Mayor Deb + Town Characters) · Post Office (`post-office.html`)
· SUNNYVAiLE High (`sunnyvaile-high.html` — quiz/report card/book fair) · Delta LAi Nu / Sorority House
(`sorority-house.html` — Girl Talk) · the LUMINAiRY (`luminairy.html` — Saints/Mavens/Trailblazers, 3-wing hub)
· the LIBRAiRY (`library.html` — technical reference) · the Closet (`laidies-card.html` — personal card/@handle)
· Dream Phone, FAiRY Godmother, BWS, Arcade (games) · Screening Room (`watch.html` — VHS episode player).
Homepage `index.html` (town-spined). Games in `games/`, community rooms in `community/`, mall shops in `mall/`.

## 4. Systems & features — BUILT / PARTIAL / MISSING
(Full evidence in `operations/feature-inventory-2026-07-10.md`. Tally: **29 built · 10 partial · 9 missing**.)

**BUILT (works end-to-end):** Residence Card create+edit · magic-link membership · @handle Closet URLs ·
card "trip" ties (avatar/saint/maven/trailblazer/town-regular) · Saints "Your Luminaries" pick · Mavens
collection · Pop Quiz + Butterfly Clip Jar + sticker book · Trading cards/packs + Collection Binder · diary
secret badges · **Charm Hunt** + bracelet · **KSVL radio** (continuous playback, pop-out, song request) ·
Report Card dashboard · Wednesday Tour check-ins · Town Wallet (17 building cards) · **view other members'
public Closets** (`/@handle`) · privacy toggle · **postcards** (real share) · FAiRY Godmother (real AI) ·
Mme CLAi-O reading · Girl Talk game · Dream Phone deduction game · BWS drink pick · BRONZE coaster stamp ·
Book Fair puffy claim · community chat rooms · **Screening Room** episode player.

**PARTIAL (shell there, one link inert):** merit-badge sash (never produced) · detention slips (not synced) ·
Girl Talk stickers on Closet (not synced) · Town Leaderboards (teaser) · charm public-sync · cocktail/song/
study-pack card-ties (no pickers) · BEST FRIENDS necklace unlock (Phase 2) · Cocktail Fortune (stub).
**Root cause of most PARTIALs:** the reward sync (`script.js` `member_reward_events`) emits only
`quiz_score/quiz_sticker/trading_card/secret_badge/community_room_post`; the Closet also *reads*
`merit_badge/dare_penalty/sticker_girl_talk/hidden_charm` — 4 types consumed but never produced. Fixing that
one sync gap lights up merit badges, detention, Girl Talk stickers, and public charms.

**MISSING (never ran):** send gifts (Post Office resident→resident) · send-a-note/DM · **puffy-sticker
bookmarks + Puffy Board** · save-a-whole-book to Closet · change card/Closet background · ratings on others'
closets · favourite-episode card tie · currently-reading card field · **Ask Jeeves** (LIBRAiRY character).

## 5. Content — episodes
- **Episodes 1–4 written + Ep1-4 recorded** (Ep3 & Ep4 audio done, need the written companion finalized).
  Ep4 = **"The Founding Mothers"**; Ep5 = **"The Super Models"**.
- **The big open design task:** the **episode written page** is being redesigned — it must read as a **VHS
  tape/90s-TV episode from the Chick Flicks**, NOT editorial. Full spec: `operations/episode-page-design-brief.md`.
- **Canon source of truth:** one per-ep `content/episodes/episode-0N.canon.md` + `cues.json` feeds ~13
  surfaces; scene titles come from the `cues.json` `kicker`s. **Only Ep2 has full canon — Ep1/3/4 need theirs.**
- Draft re-skins of Ep1/Ep3 onto the (now-superseded) magazine template exist: `issues/issue-0N-reskin.html`
  (full prose + saint/maven cast strips — reuse the *content*, not the layout).

## 6. Canon & rules (the locked decisions — see MEMORY.md for all)
SUNNYVAiLE = setting (Buffy/Sunnydale), LAiDIES = brand · "Resident ★" not Member · Closet = personal card
page (`/@handle`) · episodes never "chapters" · KSVL 99.9 FM, motto "Don't just learn from books. Learn from
hooks." · High mascot = CENTAURS · saints=pink chapel / mavens=teal chapel / trailblazers=amber+poppies /
trading-cards=clouds / Regina=red · fact-verification LOCKED (every stat traced to a real source) ·
plain-teaching (voice garnishes, never carries) · AI is "it," never gendered · voice = 90s-girlhood/chick-flick
in-group, dodge influencer AND tech-bro cringe · perpetually-1999 (no "future" talk).

## 7. OUTSTANDING — the backlog (what's still to do)
**P0 / blocking**
- **Episode written-page redesign** (VHS/Chick-Flicks) + build it for Ep 1–4 → `episode-page-design-brief.md`.
- **Episode canon reconcile** — create `canon.md`+`cues.json` for Ep1/3/4; confirm Ep4=Founding Mothers,
  Ep5=Super Models; kill the stale SLAiYER script + fix stale "next time" teasers (#318).
- **Ali's own Residence Card** migrate to new format, then E2E test MAiKEOVER→Closet (#226, #229).

**Features to finish (from §4)**
- Fix the **reward-sync gap** → merit badges / detention / Girl Talk stickers / public charms (#312).
- Build the **MISSING** set as prioritized: gifts + DM (Post Office), puffy bookmarks + Puffy Board (#273),
  save-a-book, background picker, ratings, Ask Jeeves (#315 searchable Mall/site-index feeds it), favourite-
  episode + currently-reading card ties.
- Wire the 3 **card-tie pickers** (cocktail/song/study-pack) + BEST FRIENDS necklace unlock; **Closet
  trip-tie pickers — 5 decisions owed by Ali** (#307).

**Content / build**
- **Issue-05 launch** wiring + episode index (#107) · NewsStand daily/weekly/opinion structure (#108) ·
  per-episode try-on content (#299) · Town Hall Deb visual timeline (#232) · standardize weekly-tour hub (#155).
- **KSVL:** "Burn this CD →" paid download (#83) · Deb saint-song lyric edits (#84, in progress).

**Design/art**
- Site-wide: pages too long / wasted side margins (#214) · restyle sub-standard cards to the system (#304).
- Codex: re-roll saint+maven portraits "saintly chapel" (#316) · MAiYBE+Hanger object batches (#314) ·
  postcards v3 + Residence Card backdrops (#284) · repurpose v2 luminous saints → card art (#317) · QA new
  Codex street/interior/map deliveries (#289) · portrait cache-busters + coordinated deploy (#312).
- Mall → searchable reference index (#315, supersedes the "trim to 3 stores" plan).

**Known bugs / UX (see `operations/master-issue-board.md`)** — dead links, DJ JAiDY remnants in
`site-data.js`+mp3 filenames, dead quiz cards, `library.html` missing stylesheet, try-on `--wine` undefined,
MAiN St address canon, site-index.json/Ask Jeeves incomplete.

## 8. How to work here (operating rules)
Git root = `Website-homepage/`; deploy = `git push origin HEAD:main`. **iCloud silently reverts binaries on
git checkout/restore/clean — NEVER run those; recover via `git show <commit>:path > path`; commit+push
immediately to lock.** Codex = images ONLY (see `AGENTS.md`). Verify facts against real files (this session
got fonts+teal wrong by trusting stale memory). Run `operations/check-episode.sh N` before calling an episode
ready. Preview plays audio out loud — clear KSVL state.
