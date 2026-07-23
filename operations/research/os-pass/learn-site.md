# Learn the Live Site — verified pass (os-pass)

> Compiled 2026-07-22 by reading `index.html` end-to-end and verifying the existing
> `operations/research/_learn-site-inventory.md` against the actual files. Read-only survey.
> Every claim below is tied to a file, a line, or a shell result. Where I could not confirm, I say **NOT VERIFIED**.

The existing inventory (`_learn-site-inventory.md`) is **substantially accurate** on the shape of the
site — the buildings, the mechanics, the shipped-vs-shell picture, the reward-sync gap. What has
drifted is mostly **counts and a few surface states that moved since it was written.** Corrections are
called out with ⚠ CORRECTION below.

---

## 1. The homepage — what a visitor actually sees (verified against index.html, 820 lines)

Structure confirmed exactly as the inventory describes. Section by section, with the live wiring:

- **Chrome** — sticky 76px topbar. Logo = live Jost-800 wordmark `L A ı DIES`; the i-tittle is a
  positioned `<span class="logo-tit">` whose colour is cycled through six accents on a rAF loop
  (`index.html:802-816`, palette `#e982ab,#57b6c0,#f4a636,#b3abe7,#ec7a78,#8bbde9`). Nav
  (`:506`): Latest Episode · Start learning · Look it up · Activities · Explore SUNNYVAiLE ·
  KSVL 99.9 on-air chip → `/radio.html` · Sign in → `/post-office.html#signin` · Join the town →
  `/maikeover.html`.
- **Hero** (`:512-527`) — full-bleed `main-street-dusk.webp` + shade gradient + CRT scanline
  (`.hero-dusk::after`, `:68`). Blinking terminal kicker `> LAiDIES ONLINE · CONNECTED TO
  SUNNYVAiLE, 1999_`. H1: *"AI fluency, taught through the pop culture you never forgot."* Four
  jump pills: New in town? / The latest episode / Just running an errand? / Explore the town.
- **THE LAiDIES METHOD** `#method` (`:529-568`) — left copy + dial-up postcard + town-anthem play
  chip (`data-audio="/content/music/sunnyvaile-town-anthem.mp3"`); right = "Why LAiDIES exists" card
  with Ada Lovelace stained-glass portrait + Karen Spärck Jones quote. Five numbered steps, collapse
  behind a tap bar on phones (JS `:751-763`).
- **"What brought you to town today?"** `#today` (`:570-578`) — four entry cards: Wednesday tour /
  Miss Jeeves / FAiRY Godmother / explore. All four are real `<a href>` jumps.
- **"Your Wednesday in SUNNYVAiLE"** `#this-week` (`:580-625`) — season track (Trailer + Ep01–04,
  Ep04 = *This week*), "Read this week" → `/issues/issue-04.html`, "Listen this week" →
  `/watch.html?ep=04`, hidden `.fc-resume` state for returning residents, and the 8-stop Full Route:
  NewsStand → Chick Flicks → Blend & Snap → KSVL → SUNNYVAiLE High → Mall → BRONZE AiGE → Delta LAi
  Nu, plus the Express Route band → `/this-week.html`.
- **Activities** `#activities` (`:627-638`) — filter chips + six cards: FAiRY Godmother, Mme CLAi-O,
  Businesswomen's Special, Dream Phone, Girl Talk, NewsStand.
- **Spotlights** (`:640-643`) — KSVL 99.9 → `/radio.html`, LUMINAiRY → `/luminairy.html`.
- **Miss Jeeves reference band** `#reference` (`:645-648`) — search `<form>` with **no `action`**
  (confirmed `:647`) + Popular chips.
- **Explore SUNNYVAiLE** `#town` (`:650-711`) — interactive map `sunnyvaile-town-map-final-v5.webp`
  with **17** `.map-spot` hotspots (counted `:653-669`) + popover, six district cards, `<details>`
  town directory.
- **The Closet** `#collect` (`:714-728`) — Resident Card long-copy panel; haul = Charms · Puffies ·
  Stickers · Trading cards · **Mail (marked "Coming soon", `:725`)**.
- **Wednesday Postcard band** (`:729-740`) — Buttondown signup, posts to
  `buttondown.com/api/emails/embed-subscribe/laidies` (`:736`).
- **Footer** (`:743`) — repeated wordmark + "Girl power meets machine power."

Loaded scripts confirmed (`:483-486, 744-748`): `sv-gold-icons`, `sv-global-header`, `sv-nav-auth`,
`sv-welcome-tour`, `sv-tour-checkin`, `charm-hunt`, `ai-accent-autowrap`, `ksvl-player`, `homepage.js`.
Analytics: Plausible (`:488`) + Microsoft Clarity (`:494-500`).

### ⚠ Confirmed homepage defect — activity buttons still inert
5 of the 6 Activities buttons have **no `onclick` and no wrapping `<a>`**. Only the NewsStand card
navigates (`:636`, `onclick="location.href='/newsstand.html'"`). FAiRY Godmother, Mme CLAi-O,
Businesswomen's Special, Dream Phone, Girl Talk buttons are dead. The inventory's claim holds.

---

## 2. Buildings / mechanics — the shipped-vs-shell picture (verified)

Every building in the inventory's table exists on disk. The map (`:653-669`) and town directory
(`:685-707`) enumerate them. No broken links found in the nav/map/directory hrefs.

### SHIPPED — real content, works
`index.html` · `issues/issue-01…04.html` + `issue-trailer.html` · `chick-flicks.html` ·
`luminairy.html` · `sunnyvaile-high.html` · `radio.html` · `laidies-card.html` (Closet, largest app) ·
`maikeover.html` · `town-hall.html` · `bronze-aige.html` · `community.html` + `community/` (Supabase) ·
`games/fairy-godmother.html` (live Cloudflare Worker) · the other games · `mall.html` + shops ·
`newsstand.html` (renders from `hot-goss-feed.json`, `lastUpdated: 2026-07-16` — confirmed) ·
`sorority-house.html` · `post-office.html` · `visitors-centre.html`, `blend-snap.html`, `try-on.html`.

### SHELL / STUB / PARTIAL (with corrections)
- **24 redirect stubs** (0-sec meta-refresh; `grep` result = 24). ⚠ CORRECTION: inventory says 26.
- **grimoire/ — 13 zombie pages still exist** (confirmed `ls grimoire/*.html` = 13). Content was
  moved to `_superseded/grimoire/` + `content/library-books/`; these are dead weight.
- **`learn/glossary.html` broken redirect chain** — confirmed `url=/grimoire/potions-shelf.html`
  (`learn/glossary.html`), which itself hops to `library.html`. A double hop through a zombie.
- **The LIBRAiRY** — `library.html` (old text-card layout, 35KB) is what the homepage + map link to
  (`:655, :693`). The real build is **`_library-v3.html`** (21.7KB, updated 2026-07-22 22:44,
  underscore-prefixed = unshipped). Per `operations/library-decisions.md` this v3 is the working
  reference; the live-linked `library.html` is superseded but still what visitors hit.
- **`watch.html` (Screening Room)** — ⚠ CORRECTION: inventory says only `episode-04-full-v1.mp4` is
  wired. Actual: the wired cut is **`episode-04-full-v5.mp4`** (`grep` on watch.html). The episode
  video iterated v1→v5. Eps 01–03 still have no shipped cut.
- **Episode 05** — `episode-index.json` status `"draft"` (confirmed). Ep06 canon = 6.4KB skeleton
  (confirmed 6448 bytes). Eps 07+ are teasers.
- **Reward-sync gap — CONFIRMED and still open.** The Closet (`laidies-card.html`) reads reward types
  `merit_badge, dare_penalty, sticker_girl_talk, hidden_charm, secret_badge, quiz_sticker,
  trading_card` (grep confirmed). `script.js` only produces quiz-derived rewards (the `addReward`
  calls are all `(score, maxScore, bonus)` quiz paths — grep found no non-quiz emitters). So merit
  sash, detention/dare penalties, Girl Talk stickers and hidden charms are **read but never produced**
  — they render dead. This remains the single highest-leverage bug (fix once, four mechanics light up).

### ⚠ CORRECTION — `shop.html` is NO LONGER a bare shell
Inventory §3 says "163 words … zero products … no payment path." Actual now: **1,622 words**, real
`<article>` product listings with **prices present** ($28, $20, $24, $42, $22, $8, $34…). So the Gift
Shop grew into a real catalogue since the inventory was written. **Payment path still NOT VERIFIED** —
no Stripe/Gumroad/Printful checkout hook detected in the earlier grep; prices are displayed but a live
buy flow is unconfirmed. Treat as: catalogue shipped, checkout unverified.

---

## 3. What changes each week (weekly surfaces)

The Wednesday cadence touches these surfaces (verified against homepage wiring + data stores):
1. **Chick Flicks** — new episode box (`chick-flicks.html`).
2. **The written episode** — `issues/issue-0N.html` (this week = issue-04).
3. **NewsStand** — `content/hot-goss-feed.json` (`lastUpdated: 2026-07-16`) + `newsstand-stories.js`.
4. **KSVL 99.9** — this week's anthem (`radio.html`, `content/music/`).
5. **SUNNYVAiLE High** — Pop Quiz keyed to the episode (`content/site/quizzes.json`).
6. **Study Pack** — Blend & Snap (Try-On + cheat sheet + cards).
7. **Homepage season track + Full Route** — the `#this-week` panel (`:580-625`), "This week" badge.
8. **Wednesday Postcard** — the emailed weekly.
9. **Trading card pack** — one per episode (but see card-packs gap below).
10. **Screening Room** — `watch.html?ep=NN` (only Ep04 has a shipped cut).

`quizzes.json` now holds `foundation, issue01, issue02, issue03, issue04` (confirmed grep) — Ep04's
quiz IS wired, so §3 of the inventory is current here.

---

## 4. Data → surface coupling, and the drift bugs still live

- **`card-packs.json` still has NO `issue04` key** — confirmed grep returns only `issue01/02/03`.
  Ep04's concept cards remain unwired. Gap persists exactly as the inventory says.
- **DJ JAIDY / Ep04 song title disagreement — CONFIRMED still present.** `episode-index.json` names
  Ep04's weekly song **"The LIBRAiRY"**, `artist "DJ JAIDY"`, `file
  content/music/dj-jaidy-week-04-the-library.mp3`. But the homepage (`:594`) plays
  `dj-jaidy-week-04-it-was-women-all-along.mp3` titled **"It Was Women All Along"**, and Ep04 canon
  names the same. Three different Ep04 song MP3s exist on disk
  (`it-was-women-all-along`, `the-library`, `open-the-grimoire`). Canon/homepage vs. index disagree —
  index is stale. (Also note: "DJ JAiDY" as artist may itself be a legacy name per the bands roster.)

---

## 5. Deploy reality — the whole redesign is still NOT LIVE

`git`: branch `homepage-redesign`, **397 commits ahead of `main`**, **802 uncommitted files**
(⚠ CORRECTION: inventory says 698). `main`'s last commit is **2026-06-28** — unchanged. GitHub Pages
serves `main`. So essentially everything documented as "shipped" above is shipped *in the working
branch only*; the public site at laidies.ai is a month-old snapshot. This is the biggest gap between
"what's live" and "what the site wants to be" — the redesign is built but undeployed.

⚠ Repo count correction: the inventory says 217 `.html` files; actual find = **237** (excluding
node_modules). The tree grew.

---

## 6. Genuinely good

- The homepage does the "town you arrive in, not a course you enroll in" job well — guided path
  (Wednesday tour) and free wander (map) offered at equal weight, plus a real "just an errand" door.
- Live backends are real: Supabase-backed community threads, a live Cloudflare Worker behind FAiRY
  Godmother, Buttondown signup.
- Episode canon files are a disciplined structured schema (facts carry guards + sources + verify
  dates) — the teaching layer is the most rigorous part of the repo.
- Zero broken image/asset paths on the live-facing pages (consistent with the inventory's sweep).

## 7. Gaps between live and intended (ranked)

1. **Nothing is deployed** — 397 commits / 802 files sit unshipped on `homepage-redesign`; `main` is
   from 2026-06-28.
2. **Reward-sync gap** — Closet reads 7 reward types, `script.js` emits only quiz ones; 4 mechanics
   render dead.
3. **5 of 6 homepage activity buttons inert** — only NewsStand navigates.
4. **LIBRAiRY split** — visitors hit the old `library.html`; the real `_library-v3.html` is unshipped.
5. **grimoire 13 zombies + glossary redirect chain through one of them.**
6. **card-packs.json missing issue04** — Ep04 cards unwired.
7. **episode-index.json Ep04 song metadata stale** (name/file disagree with canon + homepage).
8. **Gift Shop checkout unverified** — catalogue + prices now present, but no confirmed payment path.
9. **Screening Room** — only Ep04 has a shipped video cut (now v5); Eps 01–03 have none.
