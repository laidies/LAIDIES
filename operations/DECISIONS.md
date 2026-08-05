# DECISIONS — where every settled decision lives

**Read this before any material task. Search it before asking Ali anything.**

This is a **router, not a source of truth.** It tells you which file holds the
answer. When a line here disagrees with the file it points at, the file wins
and the line gets fixed.

Ali having to repeat a decision she already made is the most expensive failure
in this operation. Almost every time it happens, the decision was already
written down somewhere nobody read.

---

## 1. Authority order

Apply in this order. Higher wins.

1. **Ali's latest direct ruling** in the current session.
2. **`voice/laidies-canon-index.md`** — the Canon Index. Authoritative for
   **names, saint lanes, status labels, overloaded words and backlog**.
   ⛔ **NOT authoritative for architecture** — its §1 describes the Grimoire,
   which is retired (see §3b). Current architecture: `library-decisions.md`.
3. **`voice/laidies-writing-lock.md`** — voice, tone, banned phrasing.
   Episode 1 is the gold standard.
4. **`episode-visual-system-lock.md`** — people-rendering authority for
   episodes and trailers.
5. **`site-visual-system-lock-2026-07-23.md`** — sitewide visual direction.
   ⚠ Currently **PROVISIONAL** (style championship open) — a credible
   candidate, not a settled instruction to restyle all 17 buildings.
6. **The per-area decision docs** in section 4 below.
7. **`AGENTS.md`** — how to work. Process, not content decisions.
8. Older briefs, experiments, mood boards and prior implementations are
   **evidence only** and cannot override anything above.

---

## 2. ⚠ Three traps, verified 2026-08-03

**Trap 1 — a stranded older copy of canon exists.** `LAIDIES/Website/operations/voice/`
holds an **older** canon index and writing lock (Jul 3, 113 lines) alongside the
live ones in `Website-homepage/operations/voice/` (Jul 11, 147 lines).
**The `Website/` copies are superseded — never read or edit them.** They are kept
because other stranded content lives in that tree; do not delete it.

**Trap 2 — the Canon Index points at its own old home.** It says it lives at
`Website/operations/voice/`. That path is the stranded copy. The live path is
`Website-homepage/operations/voice/`.

**Trap 3 — the Canon Index content is stale.** Its body says "Last updated
2026-06-21." Decisions made after that — including every per-area decision doc
dated 2026-07-24 — are **not reflected in it.** Trust it for names and
architecture; check section 4 and 5 for anything newer.

---

## 3. Process and tooling decisions (settled 2026-08-03, not in the Canon Index)

| Status | Decision | Source |
|---|---|---|
| LOCKED | Gates are **tiered**: Tier 1 visitor-facing gets full gates, Tier 2 internal gets none, Tier 3 mechanical just gets done. | `AGENTS.md` |
| LOCKED | **A gate that cannot fail is not a gate.** Prove any check can fail before trusting it. | `AGENTS.md` |
| LOCKED | **Integrity receipts are not reviews.** Checksum/duration/codec/geometry prove intactness, never quality. | `AGENTS.md` |
| LOCKED | A fix applied to one instance is **not done** — sweep for every other occurrence in the same task. | `AGENTS.md` |
| LOCKED | Subagents are **read/analysis lanes by default**; one writer per path; canonical files foreground-only. | `AGENTS.md` |
| LOCKED | **One painpoints entry per task**, written by the foreground thread. | `painpoints-log.md` |
| LOCKED | **A familiar topic is not enough to classify a current news claim as `STALE`.** Resolve the exact timestamped primary item and compare its artifact set and operative claims with the suspected predecessor. If identity cannot be proved, use `WATCH — SOURCE IDENTITY UNRESOLVED`; thematic similarity is only a deduplication lead. | `painpoints-log.md` BTB-396; `newsstand-editorial-radar.md` |
| LOCKED | **Canva creates the animation** (image-to-video from an approved still). CapCut's animation was rejected. | `AGENTS.md` |
| LOCKED | **CapCut assembles only** — import Canva clips, cut, sequence, export. | `AGENTS.md` |
| LOCKED | Animate **one** approved still per shot. A loop must have zero net travel. | `AGENTS.md` |
| LOCKED | **Ali touches no tools.** Codex does the work; Ali gives verdicts. | `~/.codex/AGENTS.md` |
| LOCKED | **Safe in-scope commands run without Ali approval.** Do not pause routine terminal, test, browser, inventory or local-edit work for permission. Stop only for an irreversible external action, deployment/publication/spend/account/provider mutation, private credentials, or a substantive Ali-owned decision. | Ali 2026-08-03; `AGENTS.md` autonomy and authority boundaries |
| LOCKED | **“Done” for Ali review means an exact-commit preview URL, not a local-only PASS.** Objective machine gates and applicable independent reviews must pass before an item enters her bounded review queue. Ali's approval authorizes promotion of that exact candidate through the separate release/public-verification path; feedback or rejection returns it to internal repair. | Ali 2026-08-05; `operations/launch/opening-day-whole-town-program-2026-07-31.json` |
| LOCKED | **Real historical women require a bound likeness reference.** Empty directory → stop, don't invent a face. | `scripts/check-real-person-references.mjs` |
| LOCKED | Luna/Low mechanical · Terra bounded · Sol/Medium foreground · Sol/High hard problems. Fast mode off. Start at lowest effort. | `.codex/config.toml` |
| LOCKED | The Control Room heartbeat dispatcher remains **PAUSED** until migration verification, a bounded manual dry run, overlap clearance and a separate Ali resume decision all pass. | `runtime/dispatcher-migration.json` |
| LOCKED | A LIBRAiRY book is a scannable, resumable reference—not a class in text form. Do not add lesson or practice padding merely to make a book resemble a class. | `product-stewards/LEARNING-CONTENT-STANDARD.md` |
| LOCKED | **Minimum-sufficient LIBRAiRY admission has no universal fixed-size user-study or external correction-provider prerequisite.** Require the proportional book standard, current source/artifact binding, an honest correction route, independent newcomer-comprehension review and the real reader/save/reopen journey. Add native/device/provider or larger research gates only when a specific risk or release requirement makes them decision-changing. | `AGENTS.md`; `product-stewards/LEARNING-CONTENT-STANDARD.md`; Ali 2026-08-03 anti-overengineering direction |
| LOCKED | **Reuse the existing approved or canonical asset before generating a replacement.** Before any visual generation, search the repository, inspect the actual candidate bytes and trace their current authority. A rejected consumer reference does not prove the required artwork is missing. Generate only after that inventory proves no suitable existing asset can perform the job **and Ali explicitly approves replacement art**. This applies to **every existing episode cover, title card, building image and product asset**—never regenerate or visually reinterpret one merely because a new page or component needs it. Episode 04 specifically uses `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png`; do not reinvent its cover. | Ali 2026-08-03; `product-stewards/blend-snap/VISUAL-ASSET-INVENTORY.md` |
| LOCKED | **The Daily publishes as a complete daily SUNNYVAiLE newspaper, not only when a news article qualifies.** Its sourced-news desk may truthfully report that nothing consequential qualified, while the edition continues with whatever recurring service columns are source-ready and admitted: Paige's practical tip, Promptoscope, career/work-life guidance, Mme CLAi-O reading, Song of the Day, Did You Know, town notes, a curiosity/mutual-support action and clearly labelled fictional town material. Never invent filler: an unavailable column shows its governed empty state. **The Weekly remains a synthesis of at least two developments**, but may include a clearly subordinate Tip of the Week or other weekly service column; a tip is not a substitute for the synthesis. The Homepage Daily Buzz is only a compact preview and route to the full paper. | Ali 2026-08-03; `product-stewards/newsstand/DAILY-NEWSPAPER-EXPERIENCE-BRIEF.md`; `product-stewards/newsstand/backlog.md` NS-18/NS-20 |
| LOCKED | **Catch Me Up lets a returning reader review every eligible headline since her last recorded visit without presenting all of it as current.** Lead with today's dated edition and the latest Weekly synthesis. Then show a compact chronological timeline: date, publication, headline, two or three key points and current/corrected/retracted/archive state. Details stay collapsed until the reader expands a story. Expired material remains readable only with an explicit “published then—check current guidance” treatment. The visitor may change the catch-up start date; same-browser history is a convenience, not identity or cross-device sync. An optional consented Daily Postcard may carry a compact issue preview, but subscription delivery does not replace this on-site freshness contract. | Ali 2026-08-03; NewsStand freshness/correction contract |

---

## 3b. Voice, naming and palette — routed 2026-08-03

Each row was traced to an existing canonical file. Line numbers are where the
rule is actually written.

| Status | Decision | Source |
|---|---|---|
| LOCKED | **The GRIMOIRE IS RETIRED.** Dismantled into **LIBRAiRY books** — 19,751 words extracted from `_superseded/grimoire/` into `content/library-books/`. Only `grimoire/verification-rulebook.html` survives. Do not use the eight-section Grimoire architecture; do not link any `grimoire/*.html`. Ali 2026-08-03. | `library-decisions.md:202` |
| RESOLVED | `grimoire/*.html` are **working redirects**, not dead stubs — meta-refresh + JS fallback to `/library.html`, with `canonical` and `noindex` and a readable message. Old bookmarks and external links land correctly. No action needed. ⚠ `library-decisions.md:84` still calls them "dead stubs" — that wording is stale. | verified 2026-08-03 |
| LOCKED | **AI is "it," never gendered.** | `SITE-MASTER-BRIEF.md:81` |
| LOCKED | **Banned AI writing patterns** — 17 named patterns including hype, fearmongering, generic empowerment language, vague enthusiasm, "AI can be a powerful tool," "in today's fast-paced world," overexplaining the joke, making the reader feel like she's in training. | `voice/laidies-writing-lock.md:53–74` |
| LOCKED | **False-exclusivity hooks banned** — "the move nobody makes," "the thing nobody tells you," any "nobody does this / the X nobody Y" construction. Ali 2026-07-08: classic AI slop. | `voice/laidies-writing-lock.md:73` |
| LOCKED | **Deficit framing about women banned** — "women need the confidence / need to catch up / lack the language." Women aren't missing anything; the room is. Ali 2026-07-12. | `voice/laidies-writing-lock.md:74` |
| LOCKED | **No "Learn more"** when the destination has a name. | `voice/laidies-writing-lock.md:263` |
| LOCKED | **Pop culture is never decoration.** | `voice/laidies-writing-lock.md:349` |
| LOCKED | **Never present a stale era as current** — see the banned-as-unqualified claim list. | `voice/laidies-writing-lock.md:709` |
| LOCKED | **Episode 1 is the gold standard** for voice. Ep04 is a deliberate departure — a guide chapter, not a normal episode. | `voice/laidies-canon-index.md:106` |
| LOCKED | **Rewind Era = 1990–2010** — "twenty years of pop culture, from dial-up to downloads." Marked DECIDED. | `ACTIVE-WORK.md:473` |
| LOCKED | **Retired gold `#c9a227` and plum `#4b2148` as UI colour = automatic page FAIL.** | `page-design-bar.md:37` |
| LOCKED | **Plum and pearl are NOT the primary page colours.** The primary is the vibrant 90s candy set: pink `#e982ab` · teal `#57b6c0` · coral `#ec7a78` · periwinkle `#b3abe7`, on the near-black aubergine canvas `rgb(28,15,28)`, ink-on-candy `#3a1838`. Ali 2026-08-03. **Supersedes** `voice/laidies-writing-lock.md:144` ("Plum is the primary text and outline colour"), which is stale. | `page-design-bar.md` |
| ⚠ NOT LOCKED | **Background gradients are measured but NOT approved.** 5 saturated ramps, 6 pastel, 4 scrims read off `index.html` 2026-08-03. Ali on seeing them: *"I am not sure those are the right backgrounds."* They describe the incumbent, not the decision. Use as a consistency default only; never cite as authority. | `page-design-bar.md` |
| ⚠ ONE OPEN QUESTION | **The championship decides ONE thing only: A (one adult comic/graphic-novel world) vs B (deliberate dual system) vs C (controlled hybrid).** `sitewide-style-championship-2026-07-26.md:3` — *"CURRENT DECISION RESULT `NONE`"*, 17 cycles run. **This does NOT mean the site lacks style guidance** — see §3c. It means the site-vs-episodes relationship is unsettled. | `sitewide-style-championship-2026-07-26.md` |
| LOCKED | **Backgrounds are gradient or image — never flat.** | `page-design-bar.md` |
| LOCKED | **101s are textbooks**, never called "courses." Ali 2026-08-03. | `DECISIONS.md` |
| LOCKED | **No CSS/glyph emoji in UI.** Ali 2026-08-03: *"no bad css emojis — we should make proper images in imagegen."* Icons are generated image assets, not emoji characters. | `DECISIONS.md` |
| LOCKED | **"Resident," never "member."** Ali 2026-08-03. | `DECISIONS.md` |
| ⚠ OPEN | One live gradient in `index.html` — `145deg,#4b2148,#9b3f5f 58%,#d486aa` — opens on retired plum `#4b2148`. Grandfathered, not approved. Needs a replacement ramp. | `page-design-bar.md` |

## 3c. Visual direction — what IS settled

Ali, 2026-08-03: *"I feel like there should be style guidance on the site — I've
given lots of information on this."* She's right. There are **38 style/design
docs and 12 curated reference sets.** Nobody should ever say "there's no visual
guidance" or ask her to re-specify the style. Read these first.

**Never present a visual proposal without naming the exact reference images it
used, shown beside the finished desktop and mobile result.** A proposal with no
reference binding — or one that contradicts visible reference evidence while
claiming prose compliance — **automatically fails**
(`site-visual-system-lock-2026-07-23.md`).

### The authority order for visuals

Defined in `site-visual-system-lock-2026-07-23.md`. Summarised:
Ali's latest ruling → curated reference sets in `operations/reference/` (with
each set's `README.md`) → the visual system locks → the current homepage as
*composition* baseline only (its shades and duplicated images are **not**
palette authority) → everything older is evidence, never authority.

### Settled and enforceable

| Status | What | Where |
|---|---|---|
| LOCKED | **Episode people-rendering.** The master style image governs how every person is drawn. | `episode-visual-system-lock.md` |
| LOCKED | **The five recurring episode-visual failures** (Ali 2026-08-03): glamour-cartoon drift · invented non-canon people/places · no subtle animation (rain, glow, drift) · motion that doesn't match the narration · visible loop seams. A still is not an animation; a directional clip is not a loop. | `episode-visual-system-lock.md:§0` |
| LOCKED | **Loop seams and static clips are machine-checked.** `check-loop-continuity.py` — calibrated, self-tests against a true loop and a drifting one. | `operations/tools/check-loop-continuity.py` |
| LOCKED | **Every episode visual brief is gated before render.** `check-episode-brief.py` requires `REFERENCES:` (paths that exist), `CHARACTERS:` (all in canon — 77 names harvested from roster + canon index), and `MOTION:` (what actually moves). A new character must be written `Name (NEW — needs Ali)`. Catching this in the brief costs nothing; catching it after render costs a render, a QC pass and Ali's review time. | `operations/tools/check-episode-brief.py` |
| LOCKED | **The page design bar** — canvas `rgb(28,15,28)`, h1 74.88px/800, section heads 57.6px, Jost, candy fills with dark plum text at 10px radius, backgrounds never flat, retired gold/plum = automatic FAIL. **Hook-enforced** via `.claude/hooks/enforce-page-design.py`. | `page-design-bar.md` |
| LOCKED | **The whole-page rule** — design the complete composition as one authored system. Do not improve a page by accumulating unrelated cards, images, effects or one-off reactions. | `site-visual-system-lock-2026-07-23.md` |
| LOCKED | **The provisional sitewide style lock governs shared propagation, not isolated building candidates.** A building may reuse admitted owner assets and advance through the checksum-bound D-2026-08-03-096 role-distinct gate; its admission does not select or propagate a global visual language. Shared tokens and all-17 style migration remain held for the sitewide ruling. | `operations/engine/LEDGER.md` D-2026-08-03-092/093/095/096; `operations/product-stewards/run-queue.json` |
| LOCKED | **No building is release-ready without its visual experience.** Source safety, route/function checks, screenshots, checksums and asset availability are non-compensable technical evidence; they cannot promote a building. Release readiness requires the exact current page SHA, admitted environment/object artwork, independent design/UX review and real 1440/390/320 captures. | `scripts/check-opening-day-program.mjs`; Ali 2026-08-04 |
| LOCKED | **A zero-item or held-only result can never be labelled release PASS.** Structural/integrity checks may exit successfully while work is BUILDING, but their output must say SPECIFICATION or INTEGRITY and the separate strict release mode must fail nonzero when candidates, active delivery lanes, admitted content, required Daily records, public files, buildings, media, classes or visual evidence are absent. | `scripts/check-opening-day-program.mjs`; `scripts/check-delivery-liveness.mjs`; `scripts/check-content-release-readiness.mjs`; Ali 2026-08-04 |
| LOCKED | **News availability follows release, not the visitor's calendar.** Once an independently admitted edition is released, it is readable in every time zone immediately. Its literal editorial date remains stable everywhere; browser location/time zone never hides, advances or renames the issue. Catch Me Up stores the visit as an exact instant and bounds its date picker to the newest released material, without geolocation or an account. | `content/site/newsstand-catchup-v1.js`; `newsstand.html`; Ali 2026-08-05 |
| LOCKED | **The opening-day LIBRAiRY set is Concepts 101, Briefing 101, Setup 101 and Accounts 101.** Vocab 101 is retired as a standalone catalogue object because its useful terminology is consolidated into Concepts 101; launch gates must fail if Vocab is restored or if any of the four current books lacks an exact checksum-bound admission row. | `operations/launch/opening-day-whole-town-program-2026-07-31.json`; `content/library-books/admission-manifest.json`; `scripts/check-opening-day-program.mjs`; Vocab-to-Concepts consolidation 2026-07-27 |
| LOCKED | **Owner-entry gates are scoped; portfolio gates stay global.** `--owner-entry <product>` may block on system integrity and that product's owned follow-ups, but an overdue follow-up owned by another product is reported as attention, not used to stop unrelated work. `--strict-owner-entry` and the unscoped portfolio check continue to fail on every global error. | `scripts/check-product-stewards.mjs`; `scripts/test-product-steward-owner-entry-scope.mjs`; 2026-08-04 Opus architecture audit reconciliation |
| LOCKED | **Resident Card owns the only private-account email intake.** MAiKEOVER remains local-first and links to that desk; it must not ship a second email form. The deployed/private account core may restore only the Card and admitted continuation fields (including Puffy Board/pouch). Public Card visibility never exposes collections or browser-only activity. Select current authority by release ancestry; do not regress to the superseded 2026-07-27 closed-intake state. | `operations/product-stewards/resident-card/CURRENT-IDENTITY-CONTINUATION-AUTHORITY-2026-08-02.md`; `scripts/check-maikeover-contract.mjs`; reconciliation 2026-08-04 |
| LOCKED | **Device-local keepsakes never become account rewards implicitly.** Any local collectible with `scope='device-local'` must be excluded before `member_reward_events` construction. Mme CLAi-O's Hotline Regular remains a browser/device keepsake; a future durable reward requires a new product decision and full lifecycle contract. | `operations/product-stewards/mme-claio/EXPERIENCE-BRIEF.md`; `script.js#getLocalRewardEvents`; `scripts/test-mme-claio-contract.mjs` |
| LOCKED | **12 curated reference sets** are mandatory visual evidence, not optional inspiration: comic-cover-collage · comic-book-page-style · comic-strip-layout · comic-text-emphasis · comic-storytelling · comic-ident-background · episode-style-popart · style-only-refs · font-and-text-emphasis · heroine-wardrobe · trading-cards · real-people. | `operations/reference/` |
| LOCKED | **Art requirements** for generated imagery. | `art-requirements.md` |
| LOCKED | **Shared-world feel** — adult dimensional comic/graphic-novel rendering, bright daytime SUNNYVAiLE, clear 1990s/Y2K specificity, polished enough for a senior professional to share, playful without childish. | `site-visual-system-lock-2026-07-23.md` |
| LOCKED | 23 **per-area design decision docs** — see §4. Check the area's doc before touching it. | `operations/*-design-decisions*.md` |
| ⚠ | Typography, statuses, accessibility labels and functional controls stay **deterministic HTML/CSS** — never baked into a generated image. | `sitewide-style-championship-2026-07-26.md:97` |

## 4. Per-area decision docs — check before touching that area

| Area | File |
|---|---|
| Publishing standard | `CONTENT-PUBLISHING-STANDARD.md` |
| Episode canonical source | `episode-canonical-source-spec.md` |
| Episode issue pages | `episode-issue-page-design-decisions-20260724.md` |
| Ep04 cuts | `ep04-cut-decisions.md` |
| LIBRAiRY | `library-decisions.md` |
| SUNNYVAiLE High | `sunnyvaile-high-design-decisions-20260724.md` |
| Classroom | `classroom-design-decisions-20260724.md` |
| Pop quiz | `pop-quiz-design-decisions-20260724.md` |
| Handbook | `handbook-design-decisions.md` |
| Closet | `closet-design-decisions.md` |
| Resident Card | `resident-card-design-decisions.md` |
| Post Office | `post-office-decisions.md` |
| Book Fair | `bookfair-design-decisions-20260724.md` |
| Gift Shop | `gift-shop-decisions.md` |
| Mall shop | `mall-shop-design-decisions.md` |
| Try-on | `try-on-design-decisions.md` |
| Watch | `watch-design-decisions.md` |
| Printables | `printable-design-decisions.md` |
| Postcards | `postcard-design-decisions.md` |
| Community index / room | `community-index-design-decisions.md` · `community-room-design-decisions.md` |
| Trading card economy | `trading-card-economy-locked.md` |
| Image naming | `image-naming-standard.md` |
| Cloudflare URLs | `cloudflare-pretty-url-rule.md` |

---

## 5. Backfill queue — decided but not yet routed

Decisions Ali has made that are **not** captured in the Canon Index and have no
obvious per-area doc. Each needs its canonical source located, or confirmation
from Ali, before it can be listed as LOCKED above.

Do **not** promote a row here from memory or a chat transcript. A wrong binding
entry is more expensive than a missing one.

- Voice: banned phrasings and hype rules — extract from `voice/laidies-writing-lock.md`
  into one-line entries.
- Naming: "Resident" not "member"; 101s are textbooks, never "courses";
  AI is "it", never "her".
- Palette and type: what replaced gold+plum sitewide, and the homepage bar spec.
- Era window and setting rules.
- Which buildings are launched vs. in progress.

**Process for each:** find the canonical file → add a one-line row + pointer →
if no canonical file exists, mark it **PROPOSED** and ask Ali to confirm before
promoting to LOCKED.

---

## 6. Adding a new decision

When Ali decides something, add it **in the same task**, before doing anything
else with it. A decision that lives only in a chat transcript is a decision she
will have to make again.

Status words: **LOCKED** (settled, don't relitigate) · **ACTIVE** (in force,
may evolve) · **PROPOSED** (not decided — not binding) · **SUPERSEDED** (kept
for history; mark `SUPERSEDED →` and point at the replacement, never delete —
half of repeat questions are about things decided and then reversed).
