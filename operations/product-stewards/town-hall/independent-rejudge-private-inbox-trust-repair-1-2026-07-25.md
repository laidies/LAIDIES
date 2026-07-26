# Town Hall private-inbox trust — Repair 1 independent rejudge

**Date:** 2026-07-25  
**Role:** Independent Repair 1 judge; the judge authored the original 73/100
failure but did not make this repair  
**Verdict:** **BOUNDED LOCAL PASS — 87/100 — RELEASE HOLD PRESERVED**  
**Candidate status:** Repair 1 clears every product-side P0 from the original
review in source and a fresh exact artifact. It does not open, deploy or prove
the real private inbox. Server abuse controls, idempotency, staff operations,
public-origin verification and owner visual approval remain non-transferable
release gates.

## Score

| Dimension | Original | Repair 1 | Floor | Judgment |
| --- | ---: | ---: | ---: | --- |
| Product quality | 18/20 | **18/20** | 17/20 | **PASS** — the three-station room and bounded comment-card journey remain coherent; the unreleased form now states its real status. |
| Accuracy, safety and trust | 12/20 | **18/20** | 17/20 | **PASS** — synthetic acceptance and ambiguous-outcome defects are closed; the page does not claim a server or staff lifecycle that does not exist. |
| Positive LAiDIES brand contribution | 17/20 | **17/20** | 17/20 | **PASS** — civic personality survives without false reading, review or reply claims; final room art remains Ali's decision. |
| UX and accessibility | 14/20 | **17/20** | 17/20 | **PASS** — keyboard/mobile/live status, reduced motion and repaired control contrast pass the bounded browser evidence; Safari, VoiceOver, zoom and physical-device work remain held. |
| Technical reliability | 12/20 | **17/20** | 17/20 | **PASS** — source and exact-artifact suites pass, hostile-host fixture activation fails closed and payload/error/receipt boundaries are deterministic; no real backend is credited. |
| **Total** | **73/100** | **87/100** | — | **BOUNDED LOCAL PASS; NOT RELEASED OR LAUNCH-READY** |

The three non-compensable championship floors—quality, accuracy/safety/trust
and positive LAiDIES brand contribution—each reach at least 17/20. The score
applies only to the release-held local product, not to a functioning civic
inbox.

## Original P0 dispositions

### P0-1 — Shipped global adapter could manufacture acceptance

**CLOSED for Repair 1.**

- `window.LAIDIES_TOWN_HALL_FEEDBACK_ADAPTER` and `__testOnly` are absent from
  the controller.
- The remaining fixture requires all three conditions:
  `localhost|127.0.0.1`, the exact
  `town-hall-private-inbox-repair-1` page marker and an injected adapter with
  the matching fixture ID.
- The standard positive fixtures pass on `127.0.0.1`, proving the exact local
  admission path.
- A separate hostile-host probe supplied the exact marker and matching adapter
  while rendering the exact candidate as `town-hall.production.test`. The
  submit control initially read `INBOX NOT OPEN YET`, the injected adapter
  received **0** calls, the controller exposed the release-preflight message,
  no accepted receipt was created and there were **0** Supabase/jsDelivr
  submission-service requests.
- The same negative probe passed against source and the fresh exact artifact.

The hostile script's programmatic submit event re-enabled the button after
showing the release-hold error, but it still could not invoke a fixture,
production adapter or service. Normal interaction begins with the submit
control disabled. This does not defeat the functional hold, though the
controller may keep the hold label disabled after any forced submit as a later
defence-in-depth polish.

### P0-2 — Returned transport error invited a duplicate

**CLOSED for Repair 1.**

The rendered source and exact-artifact suite independently exercised:

| Outcome | Observed treatment |
| --- | --- |
| Returned status `0` / `Failed to fetch` | Unknown; content preserved; duplicate warning; immediate retry disabled |
| Thrown abort | Unknown; content preserved; duplicate warning; immediate retry disabled |
| Missing receipt | Unknown; content preserved; duplicate warning; immediate retry disabled |
| Definite `400` / Postgres shape rejection | Rejected; content preserved; corrective retry enabled |

No failed or unknown path set the device-local accepted receipt. Only the
typed `{ accepted: true }` fixture produced the bounded delivery receipt.

### P0-3 — Direct anonymous intake lacks a server and staff boundary

**NOT IMPLEMENTED; SAFELY RELEASE-HELD.**

This remains a hard external gate rather than a product-side pass-through.
`SUBMISSION_RELEASED` is `false`; the page visibly says the private inbox is
still in release preflight and is not open for submissions. A production-shaped
host cannot activate the local fixture, and a forced submit fails closed
without contacting the production adapter.

Town Hall must not be promoted as an operating inbox until an authorised
candidate proves server-side validation, abuse controls, idempotency or an
equivalent ambiguity strategy, bounded runtime, safe logging, isolated
anonymous/signed-in/RLS behavior and the staff lifecycle.

## Additional original findings

All four are closed in the bounded candidate:

1. **Mutated values:** an altered radio value and a 101-character subject are
   rejected by the controller before the fixture receives a submission.
2. **Local receipt:** arbitrary text, malformed JSON, a future receipt and an
   invalid shape do not show an accepted cue. Only a version-1 `accepted`
   receipt with a canonical, non-future ISO timestamp does.
3. **Reduced motion:** rendered chip and submit transitions compute to `0s`;
   runtime station scrolling selects `auto`, not smooth behavior.
4. **Contrast:** the browser suite computes both submit text and the selected
   chip at or above **4.5:1**.

## Independent source evidence

- `node scripts/check-town-hall-contract.mjs`
  - **PASS — 35 checks**
- `PLAYWRIGHT_CORE_PATH=… TOWN_HALL_EVIDENCE_DIR=/tmp/town-hall-r1-independent-source-evidence node scripts/test-town-hall-browser.mjs`
  - **PASS — 58 checks**
  - submission-service attempts: **0**
- hostile production-shaped-host fixture rejection:
  - **PASS**
  - hostname: `town-hall.production.test`
  - exact local marker and matching adapter deliberately present
  - adapter submissions: **0**
  - accepted receipt: **none**
  - Supabase/jsDelivr submission-service requests: **0**
- `node scripts/check-inline-js.js`
  - **PASS — 353 scripts across 132 live pages**
- `node scripts/check-town.js`
  - **PASS**
- `node scripts/check-local-links.js`
  - **PASS — 1,967 references across 110 pages**
- `git diff --check -- <Town Hall governed runtime and test files>`
  - **PASS**

All browser fixtures denied external network. The hostile-host probe observed
three existing shared page-level third-party request initiations (Google Fonts,
Plausible and Clarity) and intercepted them before network completion; none
was a feedback submission request and no private payload existed. This rejudge
does not credit or approve those shared dependencies or analytics.

## Fresh exact artifact

- Path: `/tmp/laidies-town-hall-r1-rejudge.iM7tGr/public`
- Builder: **1,078 files / 961.42 MiB**
- Existing builder advisory: artifact exceeds 750 MiB
- Public metadata validator: **PASS**
- Town Hall contract: **PASS — 35 checks**
- Town Hall browser: **PASS — 58 checks**
- Submission-service attempts: **0**
- Production-shaped-host fixture rejection: **PASS**
- Governed runtime files: byte-identical between source and artifact

| Governed runtime file | SHA-256 |
| --- | --- |
| `town-hall.html` | `33b89f039ce7cd7a89117abdd03df7e6a7bbfe33f6a873b5b3906bfc0a64cca8` |
| `content/site/town-hall-feedback.js` | `0243d322d3d1f7cf617f8955d2353fe623b8a6e0c4f38a301418a657c11d84d4` |
| `content/site/town-hall-v2.js` | `9a71cf071d8de0a7e007b69c6e5277838fb4322d4c1644e76d4881aea3e26988` |
| `content/town-hall-v2.css` | `d4ba4b8d354bf22df72477fee2fee49d593bc00008f98612be8a7eea6512abc8` |

## Release and external holds

Repair 1 does **not** prove, authorise or release:

- server-side allowlist/length validation;
- anti-automation, anonymous/signed-in rate limiting or abuse response;
- idempotency or a durable safe-retry mechanism;
- bounded request/runtime behavior and controlled private logging;
- isolated staging anonymous/signed-in/RLS and ambiguous-outcome behavior;
- staff-only access, triage, notification, incident ownership,
  retention/deletion, correction/referral or disposition semantics;
- public-origin operation or approved privacy-safe analytics;
- Safari, VoiceOver, native zoom or physical-device behavior;
- Ali's civic-accountability model or final room-art approval; or
- deployment, publication or public verification.

The public comment-card submission must remain disabled and excluded from
launch promotion until those gates are independently accepted. The Mayor and
Noticeboard stations may be judged on their separate contracts; this verdict
does not release them by implication.

## Scope and learning scan

This judge created only this rejudge report. It did not edit implementation,
state, backlog, central ledgers or product governance; did not deploy, publish,
commit or push; and did not perform any real feedback, identity, credential,
Supabase, analytics or staff-system mutation.

No new canonical learning entry was warranted. The original review's
prevention rules—test seams require non-self-asserted isolation, ambiguous
writes require unknown-outcome UX, and local flags must be typed
receipts—were applied directly and remain reusable.
