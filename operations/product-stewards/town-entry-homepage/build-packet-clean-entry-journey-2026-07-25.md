# Town Entry + Visitor's Centre — smallest clean-journey build/test packet

**Status:** SPECIFIED — test-first packet; no product-code, deployment, publication, analytics installation, or service mutation is authorized by this record.

## Outcome

- **Product:** Town Entry/Homepage and Welcome Wagon Visitor's Centre.
- **User problem:** Current source and limited route mechanics do not prove a clean visitor understands the front door, can select an intentional destination, or recovers honestly when shared/current data fails. Broad promotion would overstate receiving-product readiness.
- **Intended user outcome:** An anonymous visitor can complete one bounded orientation journey: homepage → Visitor's Centre → named directory → live reveal → intentionally labelled destination route, while a tester can distinguish arrival from downstream completion.
- **Evidence and research:** Both operating specs, the public-promise registry dated 2026-07-25, `index.html`, `start-here.html`, `visitors-centre.html`, `homepage.js`, shared directory/tour scripts, BTB-050 and BTB-069.
- **Scope:** Evidence records and approved test fixtures only under `operations/product-stewards/town-entry-homepage/` and `operations/product-stewards/visitors-centre/`. The candidate source pages are read-only for this packet.
- **Explicit non-goals:** No homepage redesign, live-news implementation, visual-ruling substitution, social/reopening, destination/product changes, email submit, share/send, account, reward, data collection, or public deployment.

## Proposed direction

- **Decision:** Test one clean, low-claim journey before expanding or changing entry UI. Use named directory selection rather than a map-memory task; select a destination only to verify route disclosure/arrival, never to certify its own product completion.
- **Why it fits LAiDIES:** It protects the front door's practical purpose and the Visitor's Centre's room-first grammar while keeping a visitor from becoming QA evidence for a broken town-wide promise.
- **External tools/plugins/services proposed:** None. Browser/device capability may be used only as a local/public observation tool under the existing release boundary.
- **Approval or installation required:** Ali's visual ruling is not required to run the test, but is required before a visual change. Any Buttondown, analytics, share, account, or production mutation needs its owner protocol/approval.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Freeze exact candidate and receiving-route admission list | Platform + Town Entry | Exact artifact, public-promise registry | Dated evidence record | Release binding | NOT YET EXECUTED |
| Run anonymous clean first-use script at desktop + 390×844 | UX/accessibility judge | Homepage and Centre specs | Dated evidence record | Browser/device | NOT YET EXECUTED |
| Run returning local-state display and blocked-current-data recovery | Frontend/runtime judge | Episode index, homepage fallback | Dated evidence record | Controlled test harness | NOT YET EXECUTED |
| Run Centre directory/reveal/Back/Escape/map parity and degraded states | Accessibility/runtime judge | Shared directory/map/tour | Dated evidence record | Exact artifact | NOT YET EXECUTED |
| Independently judge copy/brand/promoted-route truth | Product + brand judge | Registry/specs/observations | Dated verdict | Receiving owners | NOT YET EXECUTED |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Clean visitor answers: what is LAiDIES, what can I do now, why choose this route, what happens next? Then completes homepage → Centre → named directory → reveal → route arrival. | Product/UX judge | PENDING |
| Accuracy, safety and trust | Confirm entry treats destination arrival as only entry completion; no test outcome is described as email, media, account, reward or downstream success. | Accuracy/trust judge | PENDING |
| Positive LAiDIES brand contribution | Compare current room-first candidate with its own non-negotiables; reject numbered pins, long card roll, forced tour and generic-funnel drift. | Brand judge + Ali visual ruling owner | PENDING |
| UX and accessibility | Keyboard/focus/Escape/visible focus/aria-live/zoom/reflow/reduced-motion/touch/no-JS and at least 390×844 plus desktop. | Accessibility judge | PENDING |
| Frontend/data integrity | Exact artifact: `/`, `/start-here.html`, `/visitors-centre.html`, shared directory, episode-index success/failure; selected route destination returns intentional content or is excluded. | Platform/runtime judge | PENDING |
| Visual/media quality when applicable | Map/hero/trailer/audio are optional and legible; failing media leaves orientation usable. | Visual/media judge | PENDING |

## Integration and release

- **Affected products/champions:** Town Entry, Visitor's Centre, Platform Reliability, Library/selected destination owner, NewsStand/Episode Media for current labels, Post Office for newsletter/postcard boundaries.
- **Canon/identity/reward/analytics dependencies:** Public-promise registry; no identity/reward event is in scope. Analytics events are proposals only and cannot be installed/used without Platform/Privacy approval.
- **Exact candidate:** One named artifact/deployment binding supplied by Platform. Do not test a dirty workspace as a release candidate.
- **Release authority:** None. This packet creates evidence only.
- **Rollback:** No implementation change. If a selected route fails its admission check, record it and remove/relabel only through the owning product's later approved build packet.
- **Public verification:** Not requested by this packet. A later bounded public-origin repeat may establish only the named entry/centre journey, not town-wide reopening.

## Measurement and learning

- **Baseline:** Entry and Centre have source/limited mechanic evidence; clean comprehension, complete a11y/recovery and entry analytics are unverified.
- **Success/failure signals:** Success requires all six gates plus truthful receiving-route labels. Failure is confusion, map-only dependence, blocked route, stale-current claim, hidden focus, false completion language, or one unavailable destination promoted as ready.
- **Review date:** Before any broad homepage campaign, live-news composition, or reopening decision.
- **Decision after measurement:** If gates pass, record **VERIFIED LOCALLY** only for this bounded journey and preserve all receiver limits. If they fail, create the smallest owner-scoped repair packet; do not redesign entry wholesale.
- **Dossier/state/backlog updates:** Add dated exact evidence and owner verdicts to both product folders; update public-promise registry only through portfolio reconciliation.
