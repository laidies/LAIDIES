# LAiDIES / SUNNYVAiLE — Site Inventory (read-only survey)

> Compiled 2026-07-22 by reading the repo. Read-only pass — no site files were edited.
> **One side effect to disclose:** running `operations/ops/check_site.py` (task item 6) regenerated
> `operations/ops/state.json`, which is that script's own output file by design.

---

## 1. The homepage (`index.html`) — what a visitor actually sees

819 lines; ~86 KB; ~2,200 words of visible copy; 26 images; 79 links; ~5 KB inline JS.
Every asset it references exists on disk (0 broken paths).

**Chrome.** Sticky 76px topbar. The logo is a *live* Jost-800 wordmark — `L A ı DIES` — where the
dot on the `i` is a positioned `<span>` that cycles six accent colours on a rAF loop (pink, teal,
tangerine, periwinkle, coral, sky). Nav: Latest Episode · Start learning · Look it up · Activities ·
Explore SUNNYVAiLE · a pulsing "KSVL 99.9" on-air chip · Sign in · a pink "Join the town" button.

**The scroll, section by section:**

1. **Hero — a dusk title card.** Full-bleed `main-street-dusk.webp` under a left-to-right shade
   gradient plus a CRT scanline overlay. A blinking terminal kicker reads
   `> LAiDIES ONLINE · CONNECTED TO SUNNYVAiLE, 1999_`. H1: *"AI fluency, taught through the pop
   culture you never forgot."* / *"Made to click. Built to stick."* Then the lede, then the
   name-check that does the whole positioning job in one line:
   > "The '90s gave us Sunnydale, Bayside and Capeside. Silicon Valley has Sunnyvale. **You have SUNNYVAiLE.**"
   Four coloured jump pills sit at the bottom of the hero: *New in town? · The latest episode ·
   Just running an errand? · Explore the town.*

2. **THE LAiDIES METHOD (`#method`).** Left: the pitch ("Your brain kept the references. We put them
   to work"), a dial-up postcard, and a play chip for the town anthem. Right: a purple "Why LAiDIES
   exists" card with the Ada Lovelace stained-glass portrait and the Karen Spärck Jones pull-quote
   ("Computing is too important to be left to men"). Below: five numbered steps — Follow the plot ·
   Unlock the idea · Make it click · Make it stick · Join the town. On phones the steps collapse
   behind a tap-to-expand bar.

3. **"What brought you to town today?" (`#today`).** Four entry cards for people who don't want the
   whole story: take the Wednesday tour / look something up (Miss Jeeves) / fix a prompt (FAiRY
   Godmother) / explore the town.

4. **"Your Wednesday in SUNNYVAiLE" (`#this-week`).** Teal→purple panel. Left = a season-track card
   showing Trailer + Eps 01–04 with Ep 04 marked *This week* and a mini play button for its anthem;
   two buttons, "Read this week" (`/issues/issue-04.html`) and "Listen this week"
   (`/watch.html?ep=04`); plus a hidden `.fc-resume` state that JS swaps in for returning residents.
   Right = **The Full Route**, the 8-stop Wednesday tour: NewsStand → Chick Flicks → Blend & Snap →
   KSVL → SUNNYVAiLE High → Mall → BRONZE AiGE → Delta LAi Nu. Under it, an Express Route band.

5. **Activities (`#activities`).** Filter chips (Work help / Help me decide / Make me laugh / Under
   5 min) over six cards: FAiRY Godmother, Mme CLAi-O, Businesswomen's Special, Dream Phone, Girl
   Talk, NewsStand. **Note:** five of the six buttons have no `onclick` and no wrapping `<a>` — only
   the NewsStand card navigates. The filter chips are wired via `homepage.js`.

6. **Spotlights.** Two split panels: KSVL 99.9 (DJ SunnyV) and the LUMINAiRY (Lantern Hill).

7. **Miss Jeeves reference band (`#reference`).** A search form for the LIBRAiRY plus "Popular"
   chips. The form has no `action`; it is handled (or not) by `homepage.js`.

8. **Explore SUNNYVAiLE (`#town`).** An **interactive town map** — `sunnyvaile-town-map-final-v5.webp`
   with 17 percentage-positioned `.map-spot` hotspot buttons and a popover. Then six district cards
   (MAiN Street, Civic Square, Schoolhouse Road, Wisteria Lane, Willow Lane, Lantern Hill), then a
   `<details>` full town directory in three columns.

9. **The Closet (`#collect`).** Long-copy panel with a floated puffy-binder photo explaining the
   Resident Card and the haul: Charms · Puffies · Stickers · Trading cards · Mail *(marked "Coming soon")*.

10. **Wednesday Postcard band.** Buttondown email signup, posting to `buttondown.com/api/emails/embed-subscribe/laidies`.

11. **Footer.** Repeated wordmark + "Girl power meets machine power."

**Loaded scripts:** `sv-gold-icons.js`, `sv-global-header.js`, `sv-nav-auth.js`, `sv-welcome-tour.js`,
`sv-tour-checkin.js`, `charm-hunt.js`, `ai-accent-autowrap.js`, `ksvl-player.js`, `homepage.js`.
**Analytics:** Plausible + Microsoft Clarity (heatmaps/session recordings) on every page.

**The experience in one line:** it reads as a town you arrive in at dusk, not a course you enroll in.
Guided path (the Wednesday tour) and free wander (the map) are offered side by side, and the "just
running an errand" door is deliberately equal in weight to the "learn the whole season" door.

---

## 2. Page count and structure

| Bucket | Count |
|---|---|
| **All `.html` in tree** (excl. `node_modules`) | **217** |
| `check_site.py`'s own "real pages" scan | 134 |
| **Real live-facing pages** (excl. `operations/`, `concepts/`, `_superseded/`, `.retired/`, `tmp/`, `_*`, `*.pre-*`, `preview-*`, `-magazine`, `-reskin`) | **97** |
| — of those, **redirect stubs** (0-second meta-refresh) | **26** |
| — **real content pages** | **71** |

Live-facing pages by directory: root 39 · `mall/` 11 · `community/` 10 · `games/` 10 ·
`grimoire/` 12 (all redirects) · `issues/` 5 · `content/printables/` 5 · `learn/` 3 · 2 stragglers.

**Top-level directories:** `assets/` (227 entries — all art/audio/video), `approved-assets/` (curated
399), `content/` (episodes, music, site JS/JSON, printables, library-books, glossary, playlists),
`operations/` (121 entries — the whole production/ops layer, not shipped), `issues/` (episode
articles), `games/`, `mall/`, `community/`, `grimoire/` (now all redirects), `learn/`, `concepts/`
(design comps), `design-system/`, `docs/`, `social/`, `email/`, `scripts/`, `queue/`, `worker/` +
`worker-avatar/` (Cloudflare Workers), `_superseded/`, `.retired/`, `.versions/`.

### The buildings of SUNNYVAiLE

Six streets. Every feature has an address.

| Building | File | What it's for |
|---|---|---|
| Visitors Centre / Welcome Wagon | `visitors-centre.html` | Orientation + the trailer |
| NewsStand | `newsstand.html` | AI news translated, new every Wednesday |
| The Chick Flicks | `chick-flicks.html` | Video-rental store = the episode library |
| Blend & Snap | `blend-snap.html` | Coffee shop = the Study Pack (cheat sheet + cards) |
| Try-On fitting room | `try-on.html` | The 5-minute apply-it-to-real-work exercise |
| Screening Room | `watch.html` | VHS episode player (audio/video) |
| SUNNYVAiLE High | `sunnyvaile-high.html` | Pop Quiz, Report Card, Yearbook, Book Fair |
| The LIBRAiRY | `library.html` | Technical reference; Miss Jeeves' desk; books |
| The LUMINAiRY | `luminairy.html` | Lantern Hill: Patron Saints, MAiVENS, TRAiLBLAZERS |
| Town Hall | `town-hall.html` | Mayor Deb, notices, feedback, town characters |
| Post Office | `post-office.html` | Wednesday Postcard signup, magic-link sign-in, on-site mail |
| MAiKEOVER on MAiN | `maikeover.html` | Make your Resident Card |
| The Closet | `laidies-card.html` | Your personal card page / `@handle` / haul |
| Delta LAi Nu (Sorority House) | `sorority-house.html` + `community/` | Residents-only rooms, Girl Talk, your locker |
| BRONZE AiGE | `bronze-aige.html` | Happy-hour tools, cocktail wall, Businesswomen's Special |
| The Mall | `mall.html` + `mall/` (11) | The 90s/Y2K reference catalogue |
| KSVL 99.9 | `radio.html` (+ `ksvl-popup.html`) | Community radio: anthems, episode songs, saint songs |
| FAiRY Godmother | `games/fairy-godmother.html` | Willow Lane: prompt help + advice (real AI) |
| Mme CLAi-O | `games/madame-claio.html` | Y2K-object tarot |
| Dream Phone | `games/dream-phone.html` + `-game.html` | Advice line / corroboration fact-check game |
| Girl Talk | `games/girl-talk.html` | Truth-or-dare, Resident Card required |
| Trading Cards | `games/trading-cards.html` | Concept + Character decks, packs, binder |
| The Gift Shop | `shop.html` | Print-on-demand merch |
| Book Fair | `bookfair.html` | Scholastic-style drop at the High |
| Post-a-postcard | `postcard.html` | Postcard from SUNNYVAiLE / BEST FRIENDS necklace |

---

## 3. SHIPPED vs SHELL

Method: read the HTML; count real body copy vs. inline JS; check every referenced asset exists on
disk; look for coming-soon markers and empty containers. **Asset check result: 0 missing assets
across 91 pages scanned — there are no broken image paths anywhere on the live-facing site.**

### SHIPPED — real content, works

| Surface | Evidence |
|---|---|
| `index.html` | 2,207 words, 26 imgs, 17 map hotspots, 9 site scripts, all assets present |
| `issues/issue-01…04.html` | 2,438 / 2,882 / 2,841 / 3,204 words — full written episodes |
| `issues/issue-trailer.html` | 2,206 words |
| `chick-flicks.html` | 28 imgs, VHS shelves, Eps 01–04 rentable |
| `luminairy.html` | 112 KB, 1,767 words, 49 imgs, 40 KB inline JS (MAVEN_BIOS etc.) |
| `sunnyvaile-high.html` | 58 KB, 23 KB JS; `quizzes.json` holds `foundation` + `issue01–04` |
| `radio.html` | 57 KB, 23 KB JS; 38 real MP3s in `content/music/` incl. 4 episode narrations |
| `laidies-card.html` (Closet) | 131 KB, 53 KB JS — the biggest app on the site |
| `maikeover.html` | 66 KB, 30 KB JS — Resident Card maker, email + @handle capture |
| `town-hall.html` | 1,243 words, 10 imgs, 10 KB JS (feedback form) |
| `bronze-aige.html` | 1,145 words, 13 KB JS — happy-hour tools |
| `community.html` + `community/` (9 real rooms) | 48 KB, 11 KB JS, Supabase-backed threads |
| `games/fairy-godmother.html` | 32 KB JS, calls a **live** Cloudflare Worker (`laidies-fairy-godmother.wednesday-laidies.workers.dev`) |
| `games/madame-claio.html` · `dream-phone.html` · `girl-talk.html` · `trading-cards.html` · `businesswomens-special.html` · `fun-pack.html` · `dj-booth.html` | 19–38 KB inline JS each; real game logic |
| `mall.html` + 10 mall shops | 12 imgs, 24 links; each shop is a real page |
| `newsstand.html` | 99 visible words but 13 KB JS rendering from `hot-goss-feed.json` (`lastUpdated: 2026-07-16`) + `newsstand-stories.js` |
| `sorority-house.html` | 689 words — 11 rooms / 4 wings hub, gated on Resident Card |
| `post-office.html` | Real Buttondown signup + magic-link sign-in copy |
| `handbook.html` | 2,961 words |
| `visitors-centre.html`, `blend-snap.html`, `try-on.html`, `printable.html`, `bookfair.html`, `postcard.html`, `resident-card.html`, `learn/quiz.html`, `learn/class.html` | Real copy + real wiring |
| Backends | Supabase live (`content/site/supabase-config.js`), 2 Cloudflare Workers (`subscribe`, `fairy-godmother`), avatar worker |

### SHELL / STUB / PARTIAL

| Surface | State | Evidence |
|---|---|---|
| **26 redirect stubs** | shell by design | 0-sec meta-refresh: `about`, `episodes`, `learn`, `this-week`, `start-here`, `sanctuary`, `receipts`, `reference-closet`, `clubhouse`, `clubhouse-pass`, `grimoire`, `games/cocktail-fortune`, `mall/claires`, `community/laidy-spotlight`, + all 12 `grimoire/*` |
| **`grimoire/` (13 pages)** | **zombies** | `check_site.py` explicitly flags these: "13 zombie pages still exist." Content was moved to `_superseded/grimoire/` and extracted into `content/library-books/` |
| **`learn/glossary.html`** | **broken redirect chain** | → `/grimoire/potions-shelf.html` → `/library.html`. A double hop through a zombie. `episode-index.json` still points episodes' "Review the glossary" links here |
| **The LIBRAiRY (`library.html`)** | **superseded, blocked** | Per `operations/library-decisions.md`: the real build is `_library-v3.html` (unshipped, underscore-prefixed). Two hard blockers: (a) the shelf-unit PNGs have **no alpha channel** (colour type 2/RGB — the black surround is baked in), (b) the required straight-on room backdrop **does not exist yet**. 9 of 16 books have real text; *Who's Who in AI* is only 185 words; *Concepts 101* has no source |
| **`shop.html`** | **shell** | 163 words. Explains gifting and print-on-demand — but has **zero products listed and no payment path** |
| **`watch.html` (Screening Room)** | **partial** | Only `episode-04-full-v1.mp4` + `episode-04.vtt` are wired. Eps 01–03 have dozens of `-review` MP4 renders in `assets/video/` but no shipped cut |
| **Episode 05** | **draft only** | `episode-index.json`: `status: "draft"`, `issueUrl: null`, `issuePageStatus: "not-built"`. Chick Flicks shows a "Coming soon" VHS box; Eps 07–09 are "coming later this season" teasers |
| **Homepage activity buttons** | **inert** | 5 of 6 buttons in `#activities` have no href/onclick (only NewsStand navigates) |
| **17 pages on the old broken layout** | partial | `check_site.py` CHECK 3: thin inline CSS + relies on `sunnyvaile-page.css`. Includes `blend-snap`, `bronze-aige`, `handbook`, `maikeover`, and 7 mall shops |
| **50 pages missing the standard header** | partial | Mostly `_*` prototypes and `_superseded/`, but genuinely includes all 5 `content/printables/` pages, `ksvl-popup.html`, `games/dream-phone-game.html` |
| **Reward-sync gap** (per SITE-MASTER-BRIEF §4) | partial | `script.js` emits only `quiz_score / quiz_sticker / trading_card / secret_badge / community_room_post`; the Closet *reads* 4 more types (`merit_badge`, `dare_penalty`, `sticker_girl_talk`, `hidden_charm`) that are **never produced** — this one gap is why merit sash, detention slips, Girl Talk stickers and public charms all look dead |
| **Missing features** (never built) | missing | Post Office resident→resident gifts, DMs, puffy-sticker bookmarks + Puffy Board, save-a-book to Closet, background picker, closet ratings, favourite-episode card tie, **Ask Jeeves** |

**Deploy state (from `check_site.py`):** branch `homepage-redesign`, **397 commits ahead of main**,
**698 uncommitted files**. GitHub Pages serves `main`, whose last commit is 2026-06-28. So a very
large amount of the above "shipped" work is **not live**.

---

## 4. `content/episodes/` — episode state

Six canon files + five machine-copy JSONs + six cue files.

| Ep | Title | canon.md | cues.json | Article | Narration script | Audio MP3 | Video | Song | Quiz | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| Trailer | — | — | ✅ `episode-trailer-cues.json` | ✅ `issues/issue-trailer.html` (2,206w) | ✅ | — | ✅ 10 renders | — | — | live |
| 01 | On Wednesdays We Do AI | ✅ 23.5 KB | ✅ | ✅ 2,882w | ✅ v3-tagged | ✅ `episode-01-narration.mp3` | 16 review renders, no ship cut | ✅ | ✅ `issue01` | published |
| 02 | Tell Me What You Want | ✅ 18.8 KB | ✅ | ✅ 2,438w | ✅ | ✅ | 12 renders | ✅ | ✅ `issue02` | published |
| 03 | The Burn Book Problem | ✅ 30.7 KB | ✅ | ✅ 2,841w | ✅ | ✅ | 12 renders | ✅ | ✅ `issue03` | published |
| 04 | The Founding Mothers | ✅ 35.7 KB (largest) | ✅ + 6 `.pre-*` backups | ✅ 3,204w | ✅ | ✅ | ✅ **`episode-04-full-v1.mp4` — the only shipped cut** | ✅ "It Was Women All Along" (lyrics ⏳ not transcribed) | ✅ `issue04` | **current** |
| 05 | The Super Models | ✅ 27.3 KB (v3 draft) | ❌ | ❌ `issueUrl: null` | ⚠️ v1 exists, needs re-cut to v2 | ❌ | ❌ | ❌ TBD | ❌ (draft only) | **draft** |
| 06 | Groundbreaking | ✅ 6.4 KB (skeleton) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | outline |

`content/issues/issue-04.md` is flagged in canon as **STALE** — the old "SLAiYER Handbook" draft, not
this episode. `operations/audio/episode-04-script.md` is likewise marked stale.

### How the teaching is actually written — Ep 04, quoted

The canon file is a **structured schema**, not prose: `meta / lesson / narrative / concepts[] /
facts[] / comparison / cocktail_party / quotables[] / discussion_prompt / try_on / quiz[] / track /
references[] / cast[] / heroine_outfit / artwork[]`, then a propagation checklist and a MUST-MATCH block.

The lesson, stated once, plainly:

> **One-liner:** You were never behind on AI — you were just never told it was yours.

Teaching is delivered through **narrative beats with the concept bolted to a person and a year**:

> **Ada Lovelace · 1843 · The Idea** *(→ concept: Algorithm).* Before the lightbulb, a young woman
> stares at a giant mechanical calculator everyone else saw as arithmetic — and sees that if a
> machine can follow precise-enough instructions, *numbers are only the beginning*… She writes the
> instructions down: **the first algorithm.**

> **Grace Hopper · 1952 · The Language** *(→ concept: Compiler).* … She found "a computer can't
> understand words" a failure of imagination: *why should a person have to think like a machine?*
> So she built a **compiler** — write in near-plain English, it converts to code. Every app sits on
> that idea.

Every concept carries a canon **anchor** so the definition and the story can never separate:

> **Training data** — the examples a model learns from; the more it sees, the more it can do.
> **Anchor (canon):** Fei-Fei Li's insight was that the bottleneck was never the machine's "brain" —
> no one had shown it enough of the world.

Every fact carries a scope note, a **guard**, a source, and a verification date:

> **Claim:** Ada Lovelace published the first algorithm intended for a machine (1843). … **⚠ Guard:**
> say "published the first algorithm / first to grasp general-purpose computing," **NOT** flat
> "first programmer" (contested); the engine was never built. **Source:** Britannica; Wikipedia
> (Note G); CACM. · **Verified** 2026-07-09.

> **Claim (WITH CAVEAT — preserve verbatim):** ~100M users in about two months… **Ledger rule:** say
> **"by one widely-cited estimate,"** never as OpenAI fact.

The takeaway is packaged as a thing you can say out loud:

> **"So… is this whole AI thing brand new, or what?"**
> It's almost two hundred years old and about three years old at the same time. The science has been
> building for centuries; your access to it is brand new.

Discipline markers are everywhere: `⏳ PENDING — the anthem exists as audio but its lyrics aren't
transcribed anywhere in the repo. **Do not invent them.**` and a cast table where *"A name with no
reference folder is BLOCKED from generation."*

### Ep 05, quoted

Ep 05 teaches **one distinction** and refuses to teach anything adjacent:

> **One-liner:** The company makes the model; the app is just where you shop it — so stop looking for
> the best one and learn which store you're in.

The analogy is a fashion house:

> every AI company is a **house** (OpenAI, Anthropic, Google, Microsoft), and a **model** — the thing
> with a version number — is the house's **supermodel**: a specific brain, trained and numbered by
> that house, sent down its runway.

…and the file argues with its own earlier draft in writing, so the correction can't be lost:

> **CORRECTION (2026-07-09, Ali).** Do NOT write "a supermodel didn't belong to one designer" … That
> is **backwards.** Each house **builds its own** models… State the contrast out loud: *in the 90s a
> house booked her; an AI house builds her.*

Scope is locked hard against creep:

> **⚠️ Scope — LOCKED (Ali, 2026-07-09).** **Ep5 is the DIRECTORY OF STORES**, not the inside of a
> boutique. … The **lines on the rail inside one store** — couture vs. resort — are a **later
> episode**. … Do not teach the tiers here.

There's even a deliberate accuracy trade recorded rather than hidden:

> **⚠️ Accuracy note (don't re-litigate).** Strictly, *resort/cruise* is a **pre-collection season**,
> not a price tier, and the correct term … is a **diffusion line**. **We use "resort" on purpose:**
> the audience recognises it… If a fashion-literate listener ever calls it — that's the answer.

And a currency rule that makes the teaching age-proof:

> **Currency rule: name houses + stores, NOT model version numbers** (they rot); the live flagship
> names sit in the auto-updating callout (`content/site/current-models.js`).

---

## 5. Every surface that consumes episode data

**Data stores (the sources):**
- `/content/episode-index.json` — the master season list (5 episodes, status/slug/hero/lesson/siteLinks/websiteModules)
- `/content/episodes/episode-01.canon.md` … `episode-06.canon.md`
- `/content/episodes/episode-01-cues.json` · `-02-` · `-03-` · `-04-` · `episode-trailer-cues.json` (+6 `episode-04-cues.pre-*` backups)
- `/content/episodes/issue-01.json` … `issue-05.json` + `issue-template.json`
- `/content/issues/issue-01.md` … `issue-05.md`
- `/content/site/quizzes.json` (`foundation`, `issue01`–`issue04`)
- `/content/site/card-packs.json`
- `/content/site/site-index.json` (master catalog / Ask Jeeves backbone)
- `/content/site/content-registry.json`, `/content/site/high-classes.json`
- `/content/site/quiz-issue03-bonuses-DRAFT.json`, `/content/site/quiz-issue04-founding-mothers-DRAFT.json`
- `/content/hot-goss-feed.json`, `/content/newsstand-stories.js`
- `/content/site/current-models.js` (model-freshness single source)

**Live pages / scripts that read them:**
- `/index.html` (season track + tour, via homepage.js)
- `/content/site/homepage.js`
- `/content/site/sv-tour-checkin.js`
- `/content/episode-page.js` (+ `/content/episode-page.css`)
- `/chick-flicks.html`
- `/blend-snap.html`
- `/bronze-aige.html`
- `/sunnyvaile-high.html`
- `/laidies-card.html`
- `/watch.html`
- `/script.js` (site-wide bundle; also legacy `/script-YVR28-OSVCJIT60.js`)
- `/issues/issue-01.html` … `/issues/issue-04.html`
- `/content/printables/issue-03-elle-woods-receipts-pass.html`

**Build / ops tooling that reads them:**
- `/scripts/build-episode-assets.js`
- `/scripts/check-town.js`
- `/scripts/run-weekly-production.js`
- `/operations/check-episode.sh`
- `/operations/ops/accept-new-art.py`
- `/operations/weekly-command-center.html` (+ `/operations/weekly-command-center-files/*`)
- `/assets/video/build-episode-04-full-v1.py`, `build-episode-04-full-v2-motion.py`, `qc-episode-04-full-v1.py`, `qc-episode-04-full-v2-motion.py`, `.build_episode_cue_video*.py`

**Non-live but data-coupled:** `_watch-v2.html`, `_cut-review.html`, `issues/*-magazine.html`,
`issues/*-reskin.html`, `concepts/concept-{a,a-v2,b,c}/index.html`, `.retired/index-magazine-backup-*.html`.

Ep 04's canon file names ~18 downstream surfaces in its own propagation checklist; **8 are marked
🔧 needs-sync**, notably: concept cards **not wired** (no `issue04` key in `card-packs.json`),
BRONZE AiGE cocktail wall, MAiKEOVER quote picker, Delta LAi Nu thread seed, glossary defs.

---

## 6. `operations/ops/check_site.py` — exactly what it checks

A ~90-line "state-of-the-site truth engine." Run from repo root; writes `operations/ops/state.json`
and prints a summary. It enumerates live-facing pages by globbing `**/*.html` and excluding
`concepts/`, `operations/`, `node_modules/`, `.versions/` plus any path containing `/_`, `preview-`,
`-magazine`, `-reskin`, `render-`, `delivery-`, `logo-preview`. Four checks:

1. **`header`** — does every page include `sv-global-header.js`? Reports pages missing it, filtering
   out known "zombies" (`grimoire.html` / `grimoire/*`) and known stubs (`sanctuary.html`).
   *Current: 50 real pages missing it.*
2. **`zombies`** — do any `grimoire.html` / `grimoire/*` pages still exist? (Grimoire was supposed to
   become the LIBRAiRY.) *Current: 13 zombie pages still exist.*
3. **`broken_layout`** — heuristic: a page with **< 3,000 chars of inline `<style>`** that also
   references `sunnyvaile-page.css` is presumed to be on the old broken layout.
   *Current: 17 pages.*
4. **`deploy`** — shells out to git for current branch, `rev-list --count main..HEAD`,
   `git status --short` line count, and main's last commit. Carries the note that GitHub Pages serves
   `main` and the local ref may be stale. *Current: branch `homepage-redesign`, 397 ahead, 698 uncommitted.*

**What it does NOT check:** broken links, missing image/audio files, content correctness, facts,
accessibility, or canon. (I ran a separate asset-existence sweep for this survey: 0 missing.)

---

## 7. `operations/laidies-operating-model.md` — summary

**v1, 2026-07-10.** Diagnoses the root cause: no enforced source of truth and no content-correctness
gate, so work got written from memory, reviewed by vibes, audited only for broken links — and **Ali
became the QA of last resort.**

**The one law:** *everything is produced FROM a verified source of truth → GATED by adversarial,
source-checking review → only then ships.*

Three sub-rules: **source-of-truth or silence** (untraceable claims are flagged "not verified," never
guessed) · **facts first, prose second** (the sourced fact-sheet is the *input* to writing) ·
**gated, not trusted** (every rule becomes a step that blocks).

Five layers:
1. **Town Records** — canon (writing-lock, street layout, saint roster, season bible), fact base
   (per-episode fact-sheets), site registry (`site-index.json`), launch punch-list, analytics snapshot.
2. **The Operator** — one persistent orchestrator holding roadmap + state, dispatching agents,
   enforcing gates, batching decisions for Ali with receipts, writing decisions back to Records.
3. **Production agents** — Fact Researcher, Episode Writer, Image Briefer, Page/UX Builder,
   **Content-Sync** (cascades canon changes across ~13 surfaces — "drift across surfaces is the #1
   bug source"), Song/Quiz/Cards.
4. **The Gate battery** (PASS/FAIL, line-cited, blocking) — Fact-check · Substance ("name what a
   smart woman *learns* she didn't know") · Canon/consistency · Design/UX · Cold-reader.
5. **Watchdogs** — Freshness (models change monthly), Auditor v2, Pipeline Filler (2–3 weeks buffer),
   Analytics Interpreter.

Weekly rails: `Facts → Draft → Gates → ALI approves → Produce → Cascade → Ship-check → Deploy → Analytics`.
**Ali plugs in at 3 touchpoints, not 300:** set the angle · approve at the substance gate with
receipts · final sign-off.

**Build status:** ✅ fact base live · 🟡 review gate written, not run · ⬜ registry + Operator cadence ·
⬜ watchdogs.

---

## 8. `operations/SITE-MASTER-BRIEF.md` — summary

Compiled 2026-07-11; the "read this first in any new window" handoff.

- **What it is:** an AI-fluency brand for women taught through a weekly 90s-TV show set in a Y2K town.
  "Girl power meets machine power." Every feature has a *place* in town so it's memorable, not
  homework. Static HTML/CSS/vanilla JS on GitHub Pages (`main`), Cloudflare cache in front, live
  Supabase for membership/magic-link/rewards. Domain **laidies.ai**.
- **Design system (verified against `assets/sunnyvaile-page.css`):** Inter body · Playfair Display
  headings · Jost wordmark/nav · VT323 retro · Dancing Script accent. Palette plum/plum-deep/rose/
  gold/cream + the teal-pink-sunset trio. **"Ai" rule:** every brand word renders "Ai" in the accent
  colour via `<span class="ai">Ai</span>`, everywhere, always. No emoji chrome.
- **Feature tally: 29 built · 10 partial · 9 missing.** The partials mostly trace to **one** cause:
  the reward sync emits 5 event types but the Closet reads 9 — fixing that gap lights up merit
  badges, detention slips, Girl Talk stickers and public charms at once.
- **Content:** Eps 1–4 written and recorded; Ep4 = The Founding Mothers, Ep5 = The Super Models. Big
  open design task = the **episode written page redesign** (must read as a VHS tape from the Chick
  Flicks, not editorial).
- **Canon locks:** SUNNYVAiLE = setting / LAiDIES = brand · "Resident" not Member · Closet = `/@handle`
  page · episodes never "chapters" · KSVL 99.9, "Don't just learn from books. Learn from hooks." ·
  mascot CENTAURS · fact-verification LOCKED · AI is "it," never gendered · perpetually 1999.
- **P0 backlog:** episode page redesign for Eps 1–4 · episode canon reconcile (canon+cues for Ep1/3/4,
  kill the stale SLAiYER script) · Ali's own Residence Card migration + E2E test.
- **Operating rules:** git root = `Website-homepage/`, deploy = `git push origin HEAD:main`.
  ⛔ **iCloud silently reverts binaries on `git checkout/restore/clean` — NEVER run those**; recover
  via `git show <commit>:path > path` and commit immediately. Codex = images ONLY. Run
  `operations/check-episode.sh N` before calling an episode ready. Preview plays audio out loud.

> ⚠️ Note: SITE-MASTER-BRIEF §5 says *"Only Ep2 has full canon — Ep1/3/4 need theirs."* That is now
> **stale** — Eps 01, 03 and 04 all have full `canon.md` + `cues.json` on disk today, Ep04's being the
> largest in the repo.

---

## 9. Notable inconsistencies found

1. **Redirect chain through a zombie:** `learn/glossary.html` → `grimoire/potions-shelf.html` →
   `library.html`. `episode-index.json` still routes every episode's "Review the glossary" link into it.
2. **Homepage activity cards are mostly inert** — 5 of 6 buttons have no navigation.
3. **`card-packs.json` has no `issue04` key** — Ep 4's five delivered concept cards are unwired, and
   the canon notes a footer that "promised 3."
4. **DJ JAiDY remnants:** `episode-index.json` still credits `"artist": "DJ JAIDY"` and names
   *"The LIBRAiRY"* as Ep 4's weekly song, while `episode-04.canon.md` and the homepage both name
   *"It Was Women All Along."* Canon and the index disagree.
5. **Ep 4 heroine-outfit violation logged in canon:** *"In the 2026-07-22 batch she appeared in four
   different outfits, four of them corporate — all of those frames need redoing."*
6. **`operations/reference/real-people/` is empty**, which the canon says is what produced the generic
   ENIAC women and the unverifiable Joy frame — and the cast table says a name with no reference
   folder is BLOCKED from generation.
7. **697 uncommitted files on a branch 397 commits ahead of the deployed `main`.**
