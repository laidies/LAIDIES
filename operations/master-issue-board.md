# MASTER PRIORITIZED ISSUE BOARD — SUNNYVAiLE / LAiDIES

**Built 2026-07-10. One board, worked worst-first.** This merges and supersedes tonight's two audits — `operations/live-site-quality-pass-2026-07-10.md` (page-quality) and `operations/feature-inventory-2026-07-10.md` (built-vs-missing) — plus a fresh two-lens sweep (cold new arrival + returning Wednesday resident). Every item was re-verified against the live files tonight; where an earlier audit's claim has since been fixed, it's marked RESOLVED and dropped, not repeated.

**Scope:** live pages only (`index.html` + top-level buildings + real sub-pages under `games/`, `mall/`, `community/`, `grimoire/`, `issues/`, `learn/`, `content/printables/`). Excludes `.retired/`, `.versions/`, `concepts/`, `operations/`, `_archive/`.

**Read-only review.** No site files were edited producing this board.

---

## 1. Executive summary

**Total issues on the board: 41** — **P0: 6 · P1: 17 · P2: 18.**

The site is genuinely strong where it counts — index, chick-flicks, radio, town-hall, laidies-card, the Closet reward engine, and most game pages are flagship-quality. The damage is **concentrated and systemic, not scattered**: a broken core CTA, a stale front door, and three separate "caught mid-migration" contradictions (episode titles, MAiN St addresses, where-the-101s-went) that a sharp visitor — exactly our reader — catches in the first five minutes. Fix the six P0s and the ~5 systemic sweeps and the whole town jumps a tier.

**Good news verified tonight (was flagged, now fixed — do not re-open):** the reward-sync gap has largely closed — `script.js` now emits `hidden_charm`, `sticker_girl_talk`, and `dare_penalty` (charms, Girl Talk stickers, and detention slips now reach the Closet). Only `merit_badge` remains un-produced. The four new saints (Oprah, Dolly, J.Lo, Sister Mary Clarence) are wired into `luminairy.html` copy; portraits pending is expected, not a defect.

### The 10 most important

1. **Two of five quizzes are dead** — `learn/quiz.html` reads `site-data.js` (has only issue01/02/04); Foundation and Ep03 render clickable but silently no-op. The full data already exists in the unused `quizzes.json`. Core new-user CTA fails. **[P0]**
2. **Episode canon has split-brain** — newest sources (`content/episodes/issue-04.json`, `content/episode-index.json`) now call Ep4 **"The Founding Mothers"** (a women-in-computing origin story) while the entire live site (`site-data.js` → chick-flicks, quizzes, `issues/issue-04.html`) still shows **"Every SLAiYER Needs a Watcher"** (tool-matching) — two different episodes. Ep5 canon says **"The Super Models"**; every live surface says **"Welcome to SUNNYVAiLE."** Reconcile before the next Wednesday drop. **[P0]**
3. **The designated new-visitor front door is a stale legacy page** — `start-here.html` loads legacy `styles.css` and pushes ~15 retired destinations (Hot Goss, Reference Closet, Weekly Bag…). **[P0]**
4. **`library.html` reads broken** — 6 dead `href="#"` links, hero unstyled (never loads `sunnyvaile-page.css`), promises an unbuilt feature (Ask Jeeves), and tells a 101-story that contradicts two other pages. Flagship building. **[P0]**
5. **`sunnyvaile-high.html` 101-classes route into the retired Grimoire** (8 `grimoire/` links) — directly contradicting the site's own "101s moved to the LIBRAiRY" claim. **[P0]**
6. **MAiN Street addresses contradict each other across 5+ pages** — Bronze at No.5 and No.7; MAiKEOVER and Mme CLAi-O both at No.6; "MAiN runs 1–9" vs canon 1–10. Highest "sharp visitor notices instantly" ROI on the board. **[P1]**
7. **The Mall is 90% empty** — 9 of 10 stores are the same "still brewing / shelf isn't built" template; a visitor can *do* nothing in nine shops and each says so. **[P1]**
8. **Community is a ghost town** — all 7 rooms at 0 comments, and `chat-room-digest.html` actively broadcasts "0 comments / Nothing here yet." Every child also loads legacy `../styles.css`. **[P1]**
9. **The DJ has two names** — "DJ JAIDY" (36×) vs canon "DJ SunnyV" (59×) split across community, about, town-hall, radio, laidies-card, handbook, bronze-aige, and `site-data.js`. **[P1]**
10. **Ask Jeeves is promised but unbuilt, and its catalog is 43% complete** — `site-index.json` has 24 entries for 56 live pages (radio, town-hall, luminairy, mall, post-office, bronze-aige, sorority, blend-snap, newsstand, handbook all absent), and the enforcement script the file's own `_meta` cites, `scripts/check-index.js`, does not exist. `library.html:393` sells it as working. **[P1]**

### The 5 biggest opportunities to ELEVATE (not just fix)

1. **Make the returning-Wednesday homecoming a first-class moment.** The front door already has "What's new / this week / come back" framing, but the ritual end-to-end is half-migrated (dead quizzes, stale "Weekly Bag" links on issue-01/03) and nothing reflects *her* progress on arrival. A single "Welcome back — here's this week" resume strip (new episode + quiz + Wednesday Anthem + card pack, ticked against what she's done) turns a browse into a ritual.
2. **Actually build Ask Jeeves + finish the `site-index.json` catalog.** It's the connective tissue that makes the whole town searchable — and it's the one thing that rescues the 9 unfinished mall stores and every deep page from being dead ends. The LIBRAiRY already promises it; deliver it and complete the index (add the ~32 missing pages, restore `check-index.js` as a gate).
3. **Seed the social layer so the town feels inhabited.** 7 empty rooms + a "0 comments" digest is the single loudest "nobody's here" signal. Seed 2–3 starter posts per room and one mix, hide the live 0-count board until it's real, and wire the "check out other residents' Closets" loop (viewing is already BUILT) — social proof is the cheapest credibility on the site.
4. **Close the reward loop's last mile.** Produce the one remaining un-emitted type (`merit_badge`) and turn on the "Where You Rank" leaderboard teaser so the Closet Report Card becomes a reason to return, not a display case. The engine is built; it just needs a payoff.
5. **Run one brand-coherence sweep.** The ~13 grimoire/LIBRAiRY pages (legacy shell, no town nav), the emoji-as-chrome drift, and the address / DJ-name / episode-title contradictions are all the *same* class of mid-migration damage. One pass — shared `sunnyvaile-page.css` + global header + `svGoldIcon` + one address table + one DJ name + one episode canon — lifts the site from "impressive but patchy" to "coherent world."

---

## 2. Findings board (most-severe first)

| # | Page/file | Issue (one line) | Category | Severity | Concrete fix |
|---|---|---|---|---|---|
| 1 | `learn/quiz.html` (:962 foundation, :977 issue03, :1056 loads site-data.js) | Foundation + Ep03 quizzes render but silently no-op; `site-data.js` only defines issue01/02/04 | broken | **P0** | Repoint quiz.html at `content/site/quizzes.json` (already has all 5), or hide the 2 cards until data exists |
| 2 | `content/episodes/issue-04.json` + `content/episode-index.json` vs `content/site/site-data.js:181` / `chick-flicks.html` / `issues/issue-04.html` | Ep4 is two different episodes: canon "The Founding Mothers" vs live "Every SLAiYER Needs a Watcher" | content | **P0** | Decide which Ep4 is real; propagate one title+body to all surfaces before next drop |
| 3 | `content/episodes/episode-05.canon.md` ("The Super Models") vs `site-data.js:232` + chick-flicks ("Welcome to SUNNYVAiLE") | Ep5 title mismatch canon↔live | content | **P0** | Pick one Ep5 title; the canon.md's own "downstream rename cascade TODO" is still open |
| 4 | `start-here.html` | Designated new-visitor door: legacy `styles.css`, pushes ~15 retired destinations | UX / content | **P0** | Redirect → `visitors-centre.html`, or rewrite to the current town model |
| 5 | `library.html` (6× `href="#"`; no `sunnyvaile-page.css`; :393) | Dead links, unstyled oversized hero, promises unbuilt Ask Jeeves, self-contradicting 101 copy | broken | **P0** | Point stubs at `/sunnyvaile-high.html` `/mall.html` `/luminairy.html`; add shared CSS; soften Jeeves to "coming soon"; rewrite 101 block |
| 6 | `sunnyvaile-high.html` (8× `grimoire/`) | 101-class links + CENTAURS route into retired Grimoire, contradicting "101s moved to LIBRAiRY" | broken / content | **P0** | Re-point class links to the LIBRAiRY; drop witchy Grimoire naming |
| 7 | `blend-snap.html` (:meta No.8 / eyebrow No.4), `bronze-aige.html` (coaster No.5 / eyebrow No.7), `handbook.html` (MAiKEOVER & Mme CLAi-O both No.6; "runs 1–9"), `clubhouse.html` | MAiN St addresses contradict across 5+ pages; canon = 1–10, Bronze No.7, MAiKEOVER No.6, Mme CLAi-O No.5, Blend&Snap No.8 | content | **P1** | Publish one canon address table; sweep every page to it |
| 8 | `library.html` ↔ `sunnyvaile-high.html` ↔ `handbook.html` | 3 different "where did the 101s go" stories (courses at High / classes into Grimoire / textbooks in LIBRAiRY) | content | **P1** | Pick one destination (LIBRAiRY); make all three agree; kill banned word "courses" |
| 9 | `mall/*.html` (9 of 10) | maiybe, as-seen-on-tv, rollin, books-and-records, gizmos, hanger-management, food-court, last-summer, mall-kiosk = "still brewing / shelf isn't built" | UX / content | **P1** | Build one flagship store's shelf as the pattern, or reframe the 9 as browsable lists and drop the "still brewing" banners |
| 10 | `community/*.html` (7 rooms) + `content/community/chat-room-digest.json` | All rooms 0 comments; `chat-room-digest.html` broadcasts "0 comments / Nothing here yet"; children load legacy `../styles.css` | content / UX | **P1** | Seed 2–3 posts/room; hide live 0-count board until seeded; migrate children to `sunnyvaile-page.css` |
| 11 | site-wide (`site-data.js` + community, about, visitors-centre, town-hall, laidies-card, radio, handbook, bronze-aige) | DJ name split: "DJ JAIDY" 36× vs canon "DJ SunnyV" 59× | content / voice-brand | **P1** | Confirm canon = DJ SunnyV; global find/replace JAIDY→SunnyV (verify any real-credit exception first) |
| 12 | `content/site/site-index.json` (24 entries / 56 live pages) + missing `scripts/check-index.js` | Ask Jeeves / site-search catalog 43% complete; every flagship building absent; enforcement gate gone | UX / content | **P1** | Add the ~32 missing pages; restore `check-index.js` as a pre-launch gate per the file's own `_meta` rule |
| 13 | `library.html:393` | Sells Ask Jeeves as a live feature ("Ask her in plain words — she'll find every place…") but it's unbuilt | voice-brand (accuracy) / UX | **P1** | Reword to an honest "coming soon," or build it (see Opportunity 2). Overclaim violates the Accuracy Rule |
| 14 | `try-on.html` (7× `var(--wine)`; body Inter; no `sunnyvaile-page.css`) | `--wine` undefined on this page (only in unloaded `styles.css`) → labels render wrong color; off-brand Inter + neon-magenta badges | visual / broken | **P1** | Adopt shared stylesheet + Jost; define or remove `--wine` |
| 15 | `blend-snap.html` | `☕` emoji as UI chrome (violates no-emoji lock); archive script targets `.stop-name` that doesn't exist → pack title never updates | visual / broken | **P1** | Swap emoji → `svGoldIcon`; fix the JS selector |
| 16 | `grimoire/*` family (~13 pages: grimoire.html, slaiyer-handbook + ch.1–5, chatgpt, lore-closet, potions-shelf, power-map, chamber-of-receipts) | All load legacy `styles.css`+`grimoire.css`+fantasy fonts, use `.gr-topbar` not global header → no town nav, off Y2K baseline; still "Grimoire/SLAiYER" branding | visual / UX | **P1** | Batch-migrate to `sunnyvaile-page.css` + Jost/Playfair + `sv-global-header.js`; retire Grimoire/SLAiYER naming per the 101 plan |
| 17 | `grimoire/power-map.html` | Thin stub — 7 cards under a "the cast list" dek; omits Copilot, Perplexity, NotebookLM, Codex/Claude Code and every person its own chapters name | content / visual | **P1** | Rebuild on shared shell + expand to real roster, or drop the "cast list" promise |
| 18 | `script.js` reward sync (:2505–2753) | `merit_badge` is consumed by the Closet (`COLLECTION_MAP`) but never emitted → sash always empty; 867 Club logic "parked" | UX (feature) | **P1** | Emit `merit_badge` from wherever badges are earned; unpark 867 Club, or hide the empty sash |
| 19 | `laidies-card.html:1045` "Send a note →" (public Closet) | Button rendered in public mode has no click handler — a visible dead control on someone else's Closet | broken / UX | **P1** | Wire it (gifting/DM is the founder's #1 missing feature) or hide the button until built |
| 20 | site-wide emoji chrome (blend-snap ☕, sorority 🂠/👛, post-office 💌, laidies-card 🪪/🦋/🔐/📼, chamber-of-receipts, most game pages) | Emoji used as UI icons against the locked no-emoji standard | visual / voice-brand | **P1** | One sweep to `window.svGoldIcon` |
| 21 | `games/dream-phone.html` | "Play the Game" mode ships an "Out of service / still being wired" banner; only "Just Call" works | UX | **P1** | Finish the deduction mode or hide that door until ready |
| 22 | `issues/issue-01.html` | Tail still runs retired "What's In The Bag / Wednesday Bag" ritual (`this-week.html?...&bag=open`) + orphaned empty "Club Pack Try-On" divider | content / UX | **P1** | Swap to the issue-02/04 rooms+rail pattern; drop `bag=open` |
| 23 | `issues/issue-03.html` | Heaviest stale-Bag footprint (side-rail card, "Go to the Weekly Bag" pill, many `bag=open`); fully dependent on runtime JS fetch | content / UX | **P1** | Same fix as issue-01 |
| 24 | `luminairy.html` (:731 placeholder; :1196/:1250 "brewing") | 12 letter-placeholder portrait cards in the wider-lineage wing on a flagship; stale "Portraits brewing" line for TRAiLBLAZERS whose 6 portraits already ship | visual | **P2** | Collapse placeholders behind a reveal; drop the stale line (portraits-rendering itself is expected, not a defect) |
| 25 | `printable.html` | Off-brand Inter body; dead legacy `.site-header/.nav/.hamburger` CSS (no matching markup); fallback copy still says "the current week's Bag" | visual / content | **P2** | Align to Jost/sv-header; drop dead CSS; retire "Bag" wording |
| 26 | `clubhouse.html` | Landable full page (not redirect); lists wrong addresses (Mme CLAi-O No.6→5, Bronze No.5→7) | content / UX | **P2** | Redirect to its SUNNYVAiLE home, or correct/drop the numbers |
| 27 | `games/fun-pack.html` | Stale hub: lists only Ep01–03; labels Dream Phone "Parked" / Girl Talk "Beta" though both are live | content | **P2** | Refresh statuses; add Ep04 |
| 28 | `mall/rollin-with-my-homies.html` | "Miranda Priestly" and "Miranda from Devil Wears Prada" duplicated; Cindy Crawford listed solo AND inside "The Supermodels"; hero's "Miranda Bailey" gag missing from list | content | **P2** | Dedupe; add Bailey |
| 29 | `mall/last-summer.html` | Hub calls it "I Know What You Did Last Summer" but page h1 is "Last (x30) Summer"; the "(x30)" gag is opaque | content | **P2** | Reconcile the name; clarify or cut the joke |
| 30 | `community/comment-card.html` | Episode dropdown lists only Ep1–2; site is well past | content | **P2** | Refresh episode options |
| 31 | `community/mix-cd-exchange.html` | Best static thread but comments empty; says "DJ JAIDY" (folds into #11) | content | **P2** | Seed a mix; fix DJ name |
| 32 | `content/printables/issue-01-on-wednesdays-we-do-ai.html` | Byte-for-byte identical to `issue-01-open-the-tab.html` (title/h1 say "Open the Tab") → the promised worksheet is effectively missing | content | **P2** | Give it its own content, or delete/redirect the dupe |
| 33 | `grimoire/chamber-of-receipts.html` | Emoji chrome (💼🌍🔒💰🎓🔍) on top of the family off-style shell (#16) | visual | **P2** | Swap to `svGoldIcon` (folds into #16/#20) |
| 34 | `games/madame-claio.html`, `games/fairy-godmother.html`, `games/dream-phone.html` | Have global header but no site footer (every other main page has one) | UX / visual | **P2** | Decide intentional (immersive) or add footer for uniformity |
| 35 | `games/cocktail-fortune.html` | Static stub — no localStorage/handlers/mechanic; reads as unfinished next to the fully-wired Mme CLAi-O reading | UX | **P2** | Redirect to Mme CLAi-O, or build the mechanic |
| 36 | `laidies-card.html` Closet | "Town Leaderboards / Where You Rank" is a placeholder teaser ("boards go up when the town fills in") — no live ranking | UX (feature) | **P2** | Compute a simple ranking once data exists (Opportunity 4), or drop the teaser |
| 37 | Founder's-4 missing features | Puffy-sticker bookmarks (metadata on handbook, no reader/board), save-a-book-to-Closet, change-background, ratings — all unbuilt | UX (feature) | **P2** | Roadmap; don't imply they work anywhere in copy until built (Accuracy Rule) |
| 38 | `handbook.html` | Address collisions + "runs 1–9" (see #7); still carries some pre-LIBRAiRY framing | content | **P2** | Fix addresses; reconcile with the LIBRAiRY 101 story |
| 39 | `grimoire/slaiyer-handbook-chapter-1.html:286` | "Imagine a friend who watched every episode… She remembers all of it… That's not on her" — borderline personifying the model via analogy | voice-brand | **P2** | Sanity-check against the AI-pronoun rule; keep "friend" explicit or recast so the model itself is never "she" |
| 40 | `concepts/` prototypes + `sitemap.xml` | `sitemap.xml` still lists legacy `clubhouse.html`; `concepts/*` reference retired hot-goss/net-flicks | broken (SEO) | **P2** | Prune sitemap; `noindex`/exclude `concepts/` from deploy |
| 41 | Orphan assets | `content/hot-goss-render.js` + `hot-goss-feed.json` loaded by no live page; `sv-global-header.js`/`brand-polish.js` carry dead net-flicks/hot-goss icon entries; `dream-phone-game.js:90` points at deleted `../hot-goss.html` | broken (dead code) | **P2** | Remove dead branches; confirm the Dream Phone data blurb isn't reachable |

---

## Notes on method / confidence

- **Verified live tonight (not parroted):** dead quizzes (quiz.html data source), episode split-brain (3 canon layers read directly), reward-sync emit list in `script.js`, DJ-name counts, `site-index.json` entry count + missing `check-index.js`, library dead-link/CSS counts, sunnyvaile-high grimoire links, mall "still brewing" count, try-on `--wine`.
- **Trusted from tonight's same-day audits (spot-checked, not re-opened line by line):** the individual mall/community/printables content bugs (#28–32), footer uniformity (#34), orphan assets (#40–41).
- **Not flagged (intentional in-progress, per brief):** Ep5 parked as "Coming soon" standees, maven/trailblazer portraits still rendering, Mall stores honestly marked coming — flagged only where they read as *broken* (dead controls, contradictions), not merely unfinished.
- **Audio not played** (audio-bleed rule) — KSVL/narration wiring verified on disk only.
