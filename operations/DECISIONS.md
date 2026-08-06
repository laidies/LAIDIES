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
because other stranded content lives in that tree; do not delete it. They are
outside the active instruction packet and must not be loaded for routine work.

**Trap 2 — the Canon Index points at its own old home.** It says it lives at
`Website/operations/voice/`. That path is the stranded copy. The live path is
`Website-homepage/operations/voice/`.

**Trap 3 — the Canon Index content is stale.** Its body says "Last updated
2026-06-21." Decisions made after that — including every per-area decision doc
dated 2026-07-24 — are **not reflected in it.** Trust it for names, saint lanes
and status vocabulary only. Product architecture comes from the current
per-area decision source; check sections 4 and 5 for anything newer.

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
| LOCKED | **An exact-product preview may not be blocked by an unrelated portfolio-status hold.** Artifact/build integrity and the scoped product gates control whether exact bytes may enter a protected preview; overdue work, human decisions and other portfolio-state defects remain visible in full operational CI but cannot veto an otherwise valid preview for another product. | `package.json` scripts `ci:build` and `ci`; `.github/workflows/exact-library-preview.yml`; independent preview-contract verdict 2026-08-05 |
| LOCKED | **Real historical women require a bound likeness reference.** Empty directory → stop, don't invent a face. | `scripts/check-real-person-references.mjs` |
| LOCKED | Luna/Low mechanical · Terra bounded · Sol/Medium foreground · Sol/High hard problems. Fast mode off. Start at lowest effort. | `.codex/config.toml` |
| LOCKED | The Control Room heartbeat dispatcher remains **PAUSED** until migration verification, a bounded manual dry run, overlap clearance and a separate Ali resume decision all pass. | `runtime/dispatcher-migration.json` |
| LOCKED | A LIBRAiRY book is a scannable, resumable reference—not a class in text form. Do not add lesson or practice padding merely to make a book resemble a class. | `product-stewards/LEARNING-CONTENT-STANDARD.md` |
| LOCKED | **Minimum-sufficient LIBRAiRY admission has no universal fixed-size user-study or external correction-provider prerequisite.** Require the proportional book standard, current source/artifact binding, an honest correction route, independent newcomer-comprehension review and the real reader/save/reopen journey. Add native/device/provider or larger research gates only when a specific risk or release requirement makes them decision-changing. | `AGENTS.md`; `product-stewards/LEARNING-CONTENT-STANDARD.md`; Ali 2026-08-03 anti-overengineering direction |
| LOCKED | **Reuse the existing approved or canonical asset before generating a replacement.** Before any visual generation, search the repository, inspect the actual candidate bytes and trace their current authority. A rejected consumer reference does not prove the required artwork is missing. Generate only after that inventory proves no suitable existing asset can perform the job **and Ali explicitly approves replacement art**. This applies to **every existing episode cover, title card, building image and product asset**—never regenerate or visually reinterpret one merely because a new page or component needs it. Episode 04 specifically uses `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png`; do not reinvent its cover. | Ali 2026-08-03; `product-stewards/blend-snap/VISUAL-ASSET-INVENTORY.md` |
| LOCKED | **Every new image must belong to its page.** It either looks native to that building's approved masthead world—same environment, palette, lighting, dimensionality, era and character system—or is unmistakably a LAiDIES editorial/product artifact designed for that exact page job. A generic attractive image, a mismatched art family or decoration without a product purpose fails before review. | Ali 2026-08-05; `scripts/check-design-review-admission.mjs` |
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
| LOCKED | **Episode 01's written edition uses the dark full-width reading template, not the split-screen feature cover.** Keep the standing-ovation hero, centred live title, dark article field, 840px editorial shell and 720px reading measure. Read / Listen / Watch remains a separate persistent control. | `operations/episode-issue-page-design-decisions-20260724.md#episode-01-supersession--2026-08-05`; Ali 2026-08-05 |
| LOCKED | **Rewind Era = 1990–2010** — "twenty years of pop culture, from dial-up to downloads." Marked DECIDED. | `ACTIVE-WORK.md:473` |
| LOCKED | **Retired gold `#c9a227` and plum `#4b2148` as UI colour = automatic page FAIL.** | `page-design-bar.md:37` |
| LOCKED | **The soft candy palette is retired for page UI.** Do not use white-and-plum, plum-on-purple or pastel candy bands as a page theme. Current non-image UI uses the richer electric 1990s system—near-black navy ink with hot pink, electric teal, saturated purple/periwinkle and coral as controlled accents—while each building's admitted masthead/environment supplies its dominant colour, light and material language. Ali 2026-08-05. | `page-design-bar.md`; exact admitted building art |
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
| LOCKED | **The page design bar** — image-led or electric 1990s major surfaces, no white/plum or pastel-candy page theme, strong display hierarchy, Jost UI/body, backgrounds never flat, and retired gold/plum remain automatic failures. Building pages must derive their dominant surfaces from their admitted environment rather than applying one generic site palette. Library objective regressions are enforced by the registered post-edit preflight and `scripts/check-library-known-failures.mjs`; qualitative craft still requires real visual comparison and independent judgment. | `page-design-bar.md`; `.codex/hooks.json` |
| LOCKED | **The whole-page rule** — design the complete composition as one authored system. Do not improve a page by accumulating unrelated cards, images, effects or one-off reactions. | `site-visual-system-lock-2026-07-23.md` |
| LOCKED | **LAiDIES is a cohesive, useful learning town for professional women from the Rewind Era, with a non-compensable quality bar across visual/Brand craft, usefulness, function, UX, intuitiveness and accuracy.** Every building must preserve the LAiDIES magic and world-building while remaining easy to understand and use. Boring, flat, generic, incohesive or AI-slop work fails. Teaching must be current and correct; stale claims, weak or misleading analogies/examples, decorative references that do not teach, and explanations that increase confusion fail before review. No strength in one dimension can compensate for failure in another. | Ali 2026-08-05; `site-visual-system-lock-2026-07-23.md`; `operations/product-stewards/LEARNING-CONTENT-STANDARD.md`; `voice/laidies-writing-lock.md` |
| LOCKED | **The provisional sitewide style lock governs shared propagation, not isolated building candidates.** A building may reuse admitted owner assets and advance through the checksum-bound D-2026-08-03-096 role-distinct gate; its admission does not select or propagate a global visual language. Shared tokens and all-17 style migration remain held for the sitewide ruling. | `operations/engine/LEDGER.md` D-2026-08-03-092/093/095/096; `operations/product-stewards/run-queue.json` |
| LOCKED | **No building is release-ready without its visual experience.** Source safety, route/function checks, screenshots, checksums and asset availability are non-compensable technical evidence; they cannot promote a building. Release readiness requires the exact current page SHA, admitted environment/object artwork, independent design/UX review and real 1440/390/320 captures. | `scripts/check-opening-day-program.mjs`; Ali 2026-08-04 |
| LOCKED | **A false internal PASS must change the evaluator, not only the candidate, and quality must ratchet upward.** If Ali or a verified visitor outcome rejects an admitted artifact, every bound verdict is invalidated. The responsible agent skill/checker must learn the exact missed failure, add a calibrated fail-closed guard and forward-test the reviewer blind on the quarantined artifact. Before full Tier 1 production, makers search decisions/rejections/painpoints, encode every applicable prior failure and pass the smallest representative proof of the highest-risk mechanism. Before independent review, the maker inspects the real continuous desktop/mobile artifact against the incumbent; any known, objective or visible maker-found defect remains internal repair and is not dispatched. Repeated known defects and objective defects first discovered at review both target zero; review issue counts and cycles must trend down until first-pass acceptance is normal. Visual reviewers compare same-viewport incumbent/candidate renders before maker receipts, list visible regressions and locked-decision violations first, and may not score around either. | `scripts/check-design-review-admission.mjs`; `$laidies-product-champion`; Library false-PASS incident 2026-08-05; Ali 2026-08-05 |
| LOCKED | **A Library book cannot become available from nonempty evidence pointers or mechanical reader checks.** Its manifest must bind exact learning intake, architecture evidence, independent instructional verdict and unfamiliar-reader verdict; every objective book criterion must PASS. A direct Ali rejection automatically demotes the exact artifact, invalidates derivative/template use and overrides prior reviews. Concepts 101 SHA `bb25fae4…08f4b` is the calibrated rejected artifact; Briefing 101, Setup 101 and Accounts 101 remain HOLD until revalidated. | `scripts/compile-library-admission.mjs`; `content/library-books/rejected-artifacts.json`; Ali 2026-08-05 |
| LOCKED | **Library page correction uses one maker browser check, then Ali judges the exact visible candidate.** The maker check covers only objective visitor breakage that can genuinely fail: required journeys, keyboard/focus, responsive reflow at 1440/390/320, readable/operable controls, truthful error states and applicable calibrated regression guards. Do not commission multi-role, dossier or repeated procedural page-review cycles. This shortcut does not relax book-content accuracy/admission, privacy/security, accessibility defects found by the maker check, or exact public-deployment verification after Ali approval. | Ali 2026-08-05; `operations/library-decisions.md` |
| LOCKED | **Library successor SHA `7d4d01f4…c7c9` is rejected and must not be repaired or reused.** Its oversized mostly empty shelf rooms, awkward/floating books and pasted-on title labels fail. Active baseline is restored checkpoint `db924c0d…bd6e`, which is not an approved page. Preserve only the accepted masthead and physical-shelf concept while developing a coherent readable-book solution. | Ali 2026-08-05; `operations/library-decisions.md` |
| LOCKED | **A zero-item or held-only result can never be labelled release PASS.** Structural/integrity checks may exit successfully while work is BUILDING, but their output must say SPECIFICATION or INTEGRITY and the separate strict release mode must fail nonzero when candidates, active delivery lanes, admitted content, required Daily records, public files, buildings, media, classes or visual evidence are absent. | `scripts/check-opening-day-program.mjs`; `scripts/check-delivery-liveness.mjs`; `scripts/check-content-release-readiness.mjs`; Ali 2026-08-04 |
| LOCKED | **News availability follows release, not the visitor's calendar.** Once an independently admitted edition is released, it is readable in every time zone immediately. Its literal editorial date remains stable everywhere; browser location/time zone never hides, advances or renames the issue. Catch Me Up stores the visit as an exact instant and bounds its date picker to the newest released material, without geolocation or an account. | `content/site/newsstand-catchup-v1.js`; `newsstand.html`; Ali 2026-08-05 |
| LOCKED | **The opening-day LIBRAiRY set is Concepts 101, Briefing 101, Setup 101 and Accounts 101.** Vocab 101 is retired as a standalone catalogue object because its useful terminology is consolidated into Concepts 101; launch gates must fail if Vocab is restored or if any of the four current books lacks an exact checksum-bound admission row. | `operations/launch/opening-day-whole-town-program-2026-07-31.json`; `content/library-books/admission-manifest.json`; `scripts/check-opening-day-program.mjs`; Vocab-to-Concepts consolidation 2026-07-27 |
| LOCKED | **Miss Jeeves is one question-led town guide with Homepage and LIBRAiRY placements, not catalogue search and not two products.** She answers in plain English from current admitted LAiDIES material, then recommends exact books/sections, episodes, classes, NewsStand articles or other useful destinations with honest availability. The Library placement prioritizes books/sections; Homepage may route anywhere. Privacy-safe aggregate topic, coverage outcome, placement and recommended-source IDs inform content gaps, source ordering and site layout, but never make an automatic editorial/product decision and never store raw question text in analytics. | `operations/library-decisions.md`; `operations/product-stewards/library/FUNCTIONALITY-MAP.md`; `operations/product-stewards/library/MISS-JEEVES-MEASUREMENT-CONTRACT.md`; Ali 2026-08-05 |
| LOCKED | **LIBRAiRY collection shelves must read as parts of the same physical room, not repeated catalogue modules.** Each collection uses the masthead's lavender-purple wall family and the same navy Rewind-era geometric carpet, with varied staging so the page feels like moving through Library sections. Books remain large, physically seated on the metal shelves, all visible without pagination, and catalogue growth adds room/shelf capacity without shrinking existing covers. | Ali 2026-08-05 Library successor direction |
| LOCKED | **Library candidate `615a80f7…dab` is rejected and may never enter preview, deployment or publication.** Its covers are too small to identify, and the blue recolour repeats the same rejected, boring shelf composition instead of producing a materially different Library experience. Mechanical/product checks on those bytes cannot override Ali's visual ruling. Preserve the four admitted opening-book content artifacts independently of the rejected page shell. | `operations/library-decisions.md`; Ali 2026-08-05 exact rejection |
| SUPERSEDED | **D-093's adjacent full-preview shelf treatment is retired.** It correctly rejected tiny blind covers, but incorrectly required the whole preview to be displayed beside every shelf book. The current direct shelf ruling below governs. | `operations/library-decisions.md`; Ali 2026-08-05 correction |
| LOCKED | **The LIBRAiRY book path is the proper physical shelf plus one click to preview, then an explicit choice.** The shelf shows materially large, readable covers seated on the admitted metal case image; it does not display the full preview inline. Clicking a cover opens that book's pre-open preview with job, contents, depth, currentness and availability. From there, the visitor can return to the exact shelf trigger or open the book when admitted; held books keep Open unavailable and state the hold truth. | Ali 2026-08-05 corrected ruling |
| LOCKED | **LIBRAiRY findability stays progressive, not duplicated.** Use one title/topic search plus one visible browse-by-topic route; do not repeat the same topic control as both a select and a link row. A selected cover's pre-open preview appears immediately after that physical collection and before the next shelf, on desktop and mobile. | Ali Library review feedback; 2026-08-05 independent benchmark repair |
| LOCKED | **LIBRAiRY catalogue controls are one quiet, square-cornered reading surface inside the pop-art frame.** Do not place working copy directly on the busy comic image, mix rounded and square controls, or show default instructions, held-book warnings or a total-book count. A contained result appears only after search/topic input. | `operations/library-decisions.md`; Ali 2026-08-06 |
| LOCKED | **Each LIBRAiRY collection is a distinct wall-mounted room section.** Crop the approved room image into the central wall, use a different locked-palette wall colour for 101s, Tools and Reference, and composite the metal case in front of the books so signs, uprights and rails cannot be cut through by covers. | `operations/library-decisions.md`; Ali 2026-08-06 |
| LOCKED | **The LIBRAiRY masthead is a lived-in working reference desk.** Preserve a readable “DON'T FEED THE PRINTER” environmental sign above the computers and visible librarian equipment such as a scanner and practical desk tools; integrate them into the room without blocking the title or Miss Jeeves. | `operations/library-decisions.md`; Ali 2026-08-06 |
| LOCKED | **LIBRAiRY shelf density and floor contact are literal.** Four-book collections use a compact two-bay case; six-book collections may use three bays. Visible cover pixels touch their rail, and the visible case bottom meets the floor/base line despite transparent image padding. | `operations/library-decisions.md`; Ali 2026-08-06 |
| LOCKED | **Miss Jeeves sample questions must be specific, bounded and have deterministic, catalogue-grounded routes.** Do not suggest “Which AI do I use?” or “How does AI work?”; tool-choice suggestions must model Episode 04's job-first method, and every chip resolves to an exact answer/source route the current system can provide. | `operations/library-decisions.md`; Ali 2026-08-06 |
| LOCKED | **Until the site and its reusable page patterns are established, Ali and the foreground Codex task design and build visitor-facing pages together, one page at a time.** A page starts with an explicit shared agreement on purpose, hierarchy, visuals, functions, content, responsive behaviour and relationships to the rest of the town. Background agents may inventory, research, test or independently critique an exact candidate, but may not originate, reinterpret or autonomously implement a visitor-facing page. After Ali approves an established page pattern, agents may propagate only that locked pattern and must return any new product/design judgment to the foreground instead of inventing it. | Ali 2026-08-05 |
| LOCKED | **Page work reuses the settled backend and content standards; it does not redesign them by default.** After Ali and the foreground lock a page's purpose and design, Codex connects the existing verified systems, populates admitted content/features and identifies any remaining delivery gap. A written specification, local prototype or historical proof is never represented as a working public backend; each claimed function must be exercised in the real target environment. | Ali 2026-08-05; `operations/CODEX-WORKING-AGREEMENT.md` |
| LOCKED | **A completed page moves through one bounded delivery loop: co-design with Ali, foreground build, exact local verification, Ali approval of the exact candidate, path-scoped commit, deployment and public-origin verification.** Do not leave an approved page indefinitely as uncommitted or local-only work. In a dirty shared tree, stage and commit only the exact page-owned paths; never sweep unrelated changes into the page commit. Release claims bind the resulting commit and deployed bytes. | Ali 2026-08-05; `operations/release-control/RELEASE-STATE.md` |
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
