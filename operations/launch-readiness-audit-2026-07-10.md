# Launch-readiness audit — 2026-07-10

**Bottom line: no launch-blocking defects found.** An independent, tool-verified sweep (not eyeballing) of the live site — every internal `href`/`src`, CSS `url()`, JS-referenced asset, redirect target, form endpoint, and placeholder marker — came back essentially clean. This corroborates and updates the prior overnight pass (`operations/launch-readiness-2026-07-08-overnight.md`); the 3 broken links it found are confirmed fixed, and nothing new has regressed since.

The only thing standing between the site and launch is **operational, not a site defect**: deploy the branch. Everything below is polish.

**What was machine-verified (all live pages, excluding `concepts/`, `.retired/`, `.versions/`, `node_modules/`):**
- Broken internal links (`href`/`src`): **0**
- Missing referenced assets (img/audio/css/js via HTML, CSS `url()`, and JS string paths): **0** (all apparent misses were base-path or template-literal false positives, individually confirmed present)
- Broken redirect targets (meta-refresh + `location.replace`): **0**
- Placeholder/lorem/TODO leaking into live copy: **0** (all hits are `<input placeholder>` attrs or intentional "coming soon" episode standees)
- `example.com` / `test@` / `>undefined<` in live HTML: **0**
- Global header present on all 17 building/game pages: **yes**
- Forms wired to real endpoints: **yes**

---

## P0 — launch-blocking

**None found.** No broken links, no missing images on live pages, no dead CTAs, no empty/stub pages reachable through the site's navigation. The single remaining gate is the deploy itself (owner action — merge/publish the `homepage-redesign` branch per the 07-08 note), plus confirming the Episode publish states below are intentional:

- **Episode data sanity (verify, not a defect):** `content/site/site-data.js` marks 4 issues `published` (Ep 01–04) and 1 `draft` (Ep 05 "Welcome to SUNNYVAiLE"). Ep 05 renders as intentional "Coming soon" standees on `chick-flicks.html`. Narration audio for Ep 01–04 all exist (`content/music/episode-0[1-4]-narration.mp3`, recorded 07-08/07-09), so the 07-08 doc's "record Ep 3" task is **done**. Just confirm Ep 04 being live/published is intended before flipping the switch.

---

## P1 — should-fix before launch

- **`luminairy.html` — MAiVENS wing portraits are placeholders.** 11 maven portraits render as initial-letter placeholders with a "portrait coming" note (e.g. lines ~963–1033). The wing is otherwise complete and interactive (names, "Keeper of X", "✦ Meet her"). Graceful, but it's visible unfinished art on a live building page. Known art-queue item (Codex briefs exist under `operations/`). Also on this page: "Deep-dive per-saint pages coming soon" (line 54) — copy admits a not-yet-built feature.
- **Stale "Weekly Bag / Wednesday Bag" CTA labels** in `issues/issue-01.html` and `issues/issue-03.html`. The links redirect to the homepage and work (not broken), but the label is stale; issue-02 already uses the newer try-on / Blend & Snap pattern. Flagged in the 07-08 doc as an unresolved quick win. (`this-week.html` also carries the phrase but is itself a graceful "the Bag has retired" redirect — fine.)
- **Header/footer uniformity pass still outstanding** — called out repeatedly in `CURRENT-PRIORITIES.md` ("Footers currently differ across the site and some headers still vary"). Concretely: the 3 game pages `games/madame-claio.html`, `games/fairy-godmother.html`, `games/dream-phone.html` have the global header but **no site footer** (every other main page has one). Decide if that's intentional (immersive game pages) or fill them in.

## P2 — post-launch / nice-to-have

- **`concepts/` prototype pages still reference the retired `hot-goss.html` / `net-flicks.html`** (e.g. `concepts/sunnyvaile-prototype/net-flicks.html`, `concepts/concept-a/index.html`). They are not linked from the live site, but should be excluded from deploy or `noindex`'d so crawlers don't surface them. `sitemap.xml` does **not** list them (good) but does list legacy `clubhouse.html`.
- **SLAiYER Handbook TOC still uses pre-LIBRAiRY "Grimoire" branding** — `grimoire/slaiyer-handbook.html` says "the Grimoire". Folds into the planned Handbook→101 consolidation (`operations/library-101-consolidation-plan.md`).
- **NewsStand editorial depth** — `newsstand.html` is a complete, styled page, but per `CURRENT-PRIORITIES.md` the feed data (`content/hot-goss-feed.json`) currently only carries headline/body/source; the richer "why care / how big a deal / LAiDIES translation" layer needs source-of-truth fields before it can publish real explanations without fabrication. Content-thin, not broken.
- **Orphan JS/aliases (harmless):** `content/hot-goss-render.js` (+ its `content/hot-goss-feed.json`) is loaded by no live HTML page; `content/site/sv-global-header.js` and `brand-polish.js` still carry `net-flicks`/`hot-goss` entries in icon/classification maps (cosmetic dead branches). `games/dream-phone-game.js:90` references `../hot-goss.html` in a data blurb — confirm that entry isn't reachable in the Dream Phone game flow (the page it points to no longer exists); low risk but worth a glance.
- **Direct-URL legacy pages** (`about.html`, `learn.html`, `start-here.html`, `clubhouse.html`, `community.html`, `episodes.html`, `receipts.html`, `reference-closet.html`) are not linked from the live nav. Most are proper redirect stubs to their SUNNYVAiLE homes (verified — all redirect targets resolve). `start-here.html` (~13KB) and `clubhouse.html` (~5KB) are still full standalone pages (no redirect) but were modified within the last 2 days, so they're maintained, not abandoned — decide whether to redirect or retire them.

## Notes / couldn't fully verify

- **Site map is stale in spots but the site is ahead of it.** `operations/sunnyvaile-site-map-status.md` (snapshot 2026-06-30) still lists `hot-goss.html` and `net-flicks.html` as current filenames and the Chick Flicks / NewsStand renames as "in flight." In reality the renames landed: `newsstand.html` and `chick-flicks.html` exist, no live page links the old names, and `sanctuary.html` is a clean redirect stub to `luminairy.html`. Use the site map as a rough map only.
- **Audio was not played** (audio-bleed rule) — existence and wiring of `.mp3` files verified on disk only, not by listening. All KSVL tracks referenced in `content/site/ksvl-player.js` resolve under `content/music/` (0 missing); `trailer-narration.mp3` exists and is wired to `chick-flicks.html` + `visitors-centre.html`.
- **`watch.html` (Screening Room)** has a built-in graceful fallback ("Rough cut — narration not recorded yet") for missing narration, so even a missing episode track degrades rather than dead-ends. Did not exhaustively trace which episode each play control points to.
- **Not exhaustively verified:** per-stop Mall content depth (~290 planned reference cards is a known future build, not a defect), and every one of the 150 HTML files was not opened top-to-bottom — the audit was link/asset/redirect/form/placeholder-driven across all live pages plus spot-reads of the highest-traffic ones.
