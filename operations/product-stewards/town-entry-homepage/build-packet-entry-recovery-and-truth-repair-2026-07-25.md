# Town Entry + Visitor's Centre recovery and truth repair

**Status:** SPECIFIED — approved local repair scope; no deployment or reopening authority.

## Outcome

- **Product:** Town Entry/Homepage and Welcome Wagon Visitor's Centre.
- **User problem:** The dated clean-entry artifact loses accessible control or truthful orientation when directory/current-episode/share/account dependencies fail.
- **Intended user outcome:** A visitor can close and recover focus from a building reveal, retain a named route when shared directory data is unavailable, see an evergreen rather than falsely current episode fallback, and receive action-true postcard/member/newsletter language.
- **Evidence and research:** Dated clean-entry evidence in both product dossiers; operating specifications; BTB-069 and BTB-096.
- **Scope:** `homepage.js`, the minimum static homepage fallback markup if required, and `visitors-centre.html`; deterministic regression coverage and a newly bound local artifact.
- **Explicit non-goals:** Homepage redesign, primary hierarchy or visual ruling, receiving-product completion, account/reward implementation, newsletter delivery, postcard lifecycle, analytics installation, deploy, social publication, or broad reopening.

## Proposed direction

- **Decision:** Repair the four observed contract failures without changing the room-first visual direction.
- **Why it fits LAiDIES:** The Centre remains playful and useful while never trapping keyboard users or claiming an outcome the site cannot observe.
- **External tools/plugins/services proposed:** None.
- **Approval or installation required:** None for local implementation and tests. Ali retains visual/reopening authority; service owners retain account, newsletter and postcard lifecycle authority.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Restore focus to the initiating directory/map control and close reveal with Escape | Frontend + accessibility | Centre spec/evidence | `visitors-centre.html` | Existing reveal controls | READY TO BUILD |
| Render a visible named Centre/home fallback when `SV_BUILDINGS` is absent/empty | Frontend + UX | Centre spec/evidence | `visitors-centre.html` | Shared directory contract | READY TO BUILD |
| Make episode-index failure explicit and evergreen; check `response.ok` | Frontend + accuracy | Town Entry spec/evidence | `homepage.js`; minimum homepage fallback markup if required | Episode index | READY TO BUILD |
| Replace “Sent,” member unlock and delivery wording with observable handoff/device-local language | Product copy + trust | Public-promise registry | `visitors-centre.html` | Post Office/MAiKEOVER contracts | READY TO BUILD |
| Add deterministic regression checks and run exact local browser matrix | QA + independent accessibility judge | Exact candidate | Existing/new test scripts and dated evidence | Clean artifact | READY TO BUILD |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Anonymous visitor retains one understandable named next action through dependency failure. | UX/product judge | PENDING |
| Accuracy, safety and trust | UI claims only selection, handoff, local save or share-sheet opening that the page observes. | Accuracy/trust judge | PENDING |
| Positive LAiDIES brand contribution | Repair preserves room-first Visitor's Centre grammar; no generic error dashboard or visual redesign. | Brand judge; Ali only if visual direction changes | PENDING |
| UX and accessibility | Keyboard open/Back/Escape, initiating-control focus return, live announcement, no-JS/failure, reduced motion, zoom/reflow, desktop and 390×844 pass. | Independent accessibility judge | PENDING |
| Frontend/backend/data integrity | Success and failed episode-index/directory loads behave deterministically with no console error or stale-current claim. | Platform/runtime judge | PENDING |
| Visual/media quality when applicable | No new visual/media asset; existing layout remains legible in new fallback states. | Visual QA | PENDING |

## Integration and release

- **Affected products/champions:** Town Entry, Visitor's Centre, Episode Experience, Post Office, MAiKEOVER/Resident Card, Platform Reliability.
- **Canon, identity, reward or analytics dependencies:** No shared contract changes. Copy must preserve current device-local/unverified lifecycle limits.
- **Exact candidate:** To be created after implementation from one named commit or clean artifact.
- **Release authority:** None.
- **Rollback:** Revert only the scoped page/runtime changes; preserve the dated failure evidence.
- **Public verification:** Repeat the same bounded entry/centre journey after a separately authorized deployment.

## Measurement and learning

- **Baseline:** Static route arrival passes; recovery, focus and outcome honesty fail or remain untested.
- **Success/failure signals:** All four observed defects close and the full rendered matrix passes without overstating receiving-product completion.
- **Review date:** Before Town Entry/Visitor's Centre can be admitted to a reopening candidate.
- **Decision after measurement:** Advance only this bounded journey to `VERIFIED LOCALLY`; public and downstream states remain separate.
- **Dossier/state/backlog updates:** Attach exact test evidence to both dossiers and reconcile the portfolio public-promise registry.
