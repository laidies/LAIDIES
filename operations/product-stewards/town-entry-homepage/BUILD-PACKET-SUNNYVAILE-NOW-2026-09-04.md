# Product build packet — Homepage town switchboard

**Status:** LOCAL CANDIDATE — implemented and maker-tested; not deployed.

## Outcome

- Product: Town Entry / Homepage
- Complete route/subpage/subproduct scope: One stable Homepage discovery surface and signed-in episode continuation presentation.
- User problem: The rotating banner hides most benefits, while the rejected added editorial block duplicated discovery, overclaimed town-wide currency, mismatched PAiGE art to a specific story and misplaced KSVL inside NewsStand.
- Intended user outcome: Immediately after the masthead, a visitor can choose among the current NewsStand, KSVL, Miss Jeeves or games/tools; a signed-in returning Resident can also resume a released episode.
- Evidence and research: Current public Homepage and NewsStand inspected on 2026-09-04; live `newsstand-public-feed-v1` used as the editorial source; existing Resident continuation runtime retained.
- Scope: `index.html`, `content/site/homepage.js`, one focused responsive test and its local screenshots.
- Explicit non-goals: No fixed or floating duplicate navigation, no rotating carousel, no giant story treatment, no new backend, no new NewsStand publishing behaviour, no autoplay audio, no deployment.

## Proposed direction

- Decision or championship result: Replace the rotating banner with one four-door `Around SUNNYVAiLE` switchboard directly after the masthead. The NewsStand door may show one current released headline; KSVL, Miss Jeeves and games/tools remain separate destinations. Promote Continue inside this same surface only after account-backed continuation is confirmed.
- Why it fits LAiDIES: Uses destination-specific art, the existing comic palette, rounded bordered cards and real town destinations instead of a generic portal rail or duplicate editorial page.
- External tools/plugins/services proposed: None.
- Approval or installation required: Ali visual approval before any public release.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Four-door town switchboard | Homepage lane | Live Homepage, public NewsStand feed, current palette | `index.html`, `content/site/homepage.js` | NewsStand feed | LOCAL PASS |
| Account-backed episode resume | Homepage lane | Resident continuation v1 runtime | `content/site/homepage.js` | Supabase Resident session | LOCAL CONTRACT PASS |
| Responsive verification | Homepage lane | Exact local candidate | `scripts/test-homepage-sunnyvaile-now.mjs` and evidence folder | Chrome / Playwright | PASS at 1440, 390, 320 |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | One current headline only; expired feed becomes clearly labelled archive; other destinations are not presented as NewsStand content | Pending Ali review | MAKER PASS |
| Complete main-page/subpage capability and cross-building journey | NewsStand, KSVL, Miss Jeeves, games and released episode routes | Pending independent review | MAKER PASS |
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

- Baseline: Headline, radio, help and continuation benefits required separate discovery paths; the first candidate duplicated the rotating discovery banner and was rejected.
- Success/failure signals: NewsStand click-through, KSVL click-through, Miss Jeeves entry, Continue use, switchboard interaction, and section abandonment.
- Review date: 2026-09-04.
- Decision after measurement: Keep, revise or remove only after visual approval and live analytics comparison.
- Dossier/state/backlog updates: This packet records the local candidate; no production state changed.
