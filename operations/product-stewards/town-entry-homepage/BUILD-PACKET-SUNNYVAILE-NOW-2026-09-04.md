# Product build packet — SUNNYVAiLE Now

**Status:** LOCAL CANDIDATE — implemented and maker-tested; not deployed.

## Outcome

- Product: Town Entry / Homepage
- Complete route/subpage/subproduct scope: Homepage editorial preview, quick switchboard and signed-in episode continuation presentation.
- User problem: The Homepage makes major benefits discoverable only after a long scroll, does not preview the current NewsStand, and does not surface the already-live account-backed continuation state.
- Intended user outcome: A visitor can see a useful current story, reach the NewsStand, KSVL, Miss Jeeves or games quickly, and a signed-in returning Resident can resume a released episode.
- Evidence and research: Current public Homepage and NewsStand inspected on 2026-09-04; live `newsstand-public-feed-v1` used as the editorial source; existing Resident continuation runtime retained.
- Scope: `index.html`, `content/site/homepage.js`, one focused responsive test and its local screenshots.
- Explicit non-goals: No fixed right column, no new backend, no new NewsStand publishing behaviour, no autoplay audio, no deployment.

## Proposed direction

- Decision or championship result: Add a full-width `SUNNYVAiLE Now` section after the LAiDIES Method; show a compact switchboard only away from the masthead, editorial preview and footer; promote Continue only after account-backed continuation is confirmed.
- Why it fits LAiDIES: Uses the existing comic palette, rounded bordered cards, PAiGE art and real town destinations instead of a generic portal rail.
- External tools/plugins/services proposed: None.
- Approval or installation required: Ali visual approval before any public release.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Editorial preview and switchboard | Homepage lane | Live Homepage, public NewsStand feed, current palette | `index.html`, `content/site/homepage.js` | NewsStand feed | LOCAL PASS |
| Account-backed episode resume | Homepage lane | Resident continuation v1 runtime | `content/site/homepage.js` | Supabase Resident session | LOCAL CONTRACT PASS |
| Responsive verification | Homepage lane | Exact local candidate | `scripts/test-homepage-sunnyvaile-now.mjs` and evidence folder | Chrome / Playwright | PASS at 1440, 390, 320 |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Current feed only; expired feed becomes clearly labelled archive | Pending Ali review | MAKER PASS |
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

- Baseline: Headline, radio, help and continuation benefits require separate discovery paths.
- Success/failure signals: NewsStand click-through, KSVL click-through, Miss Jeeves entry, Continue use, switchboard interaction, and section abandonment.
- Review date: 2026-09-04.
- Decision after measurement: Keep, revise or remove only after visual approval and live analytics comparison.
- Dossier/state/backlog updates: This packet records the local candidate; no production state changed.
