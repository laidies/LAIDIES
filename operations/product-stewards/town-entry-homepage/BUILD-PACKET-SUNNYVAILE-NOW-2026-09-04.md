# Product build packet — Homepage complete discovery

**Status:** LOCAL CANDIDATE — implemented and maker-tested; not deployed.

## Outcome

- Product: Town Entry / Homepage
- Complete route/subpage/subproduct scope: One goal-led Homepage starting surface, a complete scannable feature directory and signed-in episode continuation presentation.
- User problem: The rotating banner hides most benefits. The first editorial block duplicated discovery and misplaced KSVL inside NewsStand; the second four-card switchboard reduced the number of visible choices and still did not reveal the breadth of LAiDIES.
- Intended user outcome: Immediately after the masthead, a visitor can choose one of six useful starting goals, then scan twenty-six named destinations covering learning, news, episodes, radio, tools, games, community, membership and the town.
- Miss Jeeves clarity requirement: Visitors must understand that they can ask a plain-language AI question about unexpected behaviour, a current topic, choosing a tool or model, or how to begin a task. Copy must also state the grounded boundary: she answers from current LAiDIES coverage and says honestly when an exact answer is not available.
- Evidence and research: Current public Homepage and NewsStand inspected on 2026-09-04; live `newsstand-public-feed-v1` used as the editorial source; existing Resident continuation runtime retained.
- Scope: `index.html`, `content/site/homepage.js`, one focused responsive test and its local screenshots.
- Explicit non-goals: No fixed or floating duplicate navigation, no rotating carousel, no giant story treatment, no new backend, no new NewsStand publishing behaviour, no autoplay audio, no deployment. Community chat rooms are not promoted until their live journey is separately verified.

## Proposed direction

- Decision or championship result: Move the existing six-door `What brought you to town today?` chooser directly below the masthead and make it useful: Learn, Ask Miss Jeeves, current NewsStand, Continue/latest episode, KSVL and useful/fun. Follow it with a twenty-six-link `Everything you can do in LAiDIES` directory grouped by job. Promote Continue in the episode door only after account-backed continuation is confirmed.
- Why it fits LAiDIES: Uses destination-specific art, the existing comic palette, rounded bordered cards and real town destinations instead of a generic portal rail or duplicate editorial page.
- External tools/plugins/services proposed: None.
- Approval or installation required: Ali visual approval before any public release.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Six-door goal chooser | Homepage lane | Live Homepage, public NewsStand feed, current palette | `index.html`, `content/site/homepage.js` | NewsStand feed | LOCAL PASS |
| Twenty-six-link feature directory | Homepage lane | Current public routes and Homepage journeys | `index.html` | Existing destinations | LOCAL PASS |
| Miss Jeeves capability explanation | Homepage lane | Released Miss Jeeves service contract and Homepage question handoff | `index.html`, `content/site/homepage.js` | `/api/miss-jeeves` and LIBRAiRY | LOCAL PASS |
| Account-backed episode resume | Homepage lane | Resident continuation v1 runtime | `content/site/homepage.js` | Supabase Resident session | LOCAL CONTRACT PASS |
| Responsive verification | Homepage lane | Exact local candidate | `scripts/test-homepage-sunnyvaile-now.mjs` and evidence folder | Chrome / Playwright | PASS at 1440, 390, 320 |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | One current headline only in its NewsStand door; KSVL remains separate; feature discovery is explicit rather than rotating | Pending Ali review | MAKER PASS |
| Complete main-page/subpage capability and cross-building journey | Six primary goal doors and twenty-six visible feature links spanning the current LAiDIES system | Pending independent review | MAKER PASS |
| Accuracy, safety and trust | Published-feed validation plus honest empty/archive states | Pending independent review | MAKER PASS |
| Positive LAiDIES brand contribution | Current palette, PAiGE art and existing component language | Ali | PENDING |
| UX and accessibility | Keyboard links, live status, 44px actions, no horizontal overflow | Pending independent review | MAKER PASS |
| Frontend/backend/data integrity | Account-backed state required before personalised Continue | Pending independent review | MAKER PASS |
| Visual/media quality when applicable | Exact 1440/390/320 candidate screenshots | Ali | PENDING |

## Integration and release

- Affected products/champions: Homepage, NewsStand, Resident Card continuation, KSVL, LIBRAiRY / Miss Jeeves, Fun & Connect.
- Canon, identity, reward or analytics dependencies: No reward mutation; existing account runtime only.
- Exact candidate: branch `codex/homepage-sunnyvaile-now-20260904` in `/private/tmp/laidies-homepage-now.aIoRkF`.
- Release authority: Separate explicit user approval required.
- Rollback: Remove the two public-path changes; no data migration.
- Public verification: Not performed because this is a local trial.

## Measurement and learning

- Baseline: Headline, radio, help and continuation benefits required separate discovery paths; the first candidate duplicated the rotating discovery banner and the second hid too many features. Both were rejected.
- Success/failure signals: Primary-goal choice, feature-directory use, NewsStand click-through, KSVL click-through, Miss Jeeves entry, Continue use and section abandonment.
- Review date: 2026-09-04.
- Decision after measurement: Keep, revise or remove only after visual approval and live analytics comparison.
- Dossier/state/backlog updates: This packet records the local candidate; no production state changed.
