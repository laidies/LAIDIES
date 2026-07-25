# SUNNYVAiLE High — P0 classes-route build packet

**Status:** BUILT LOCALLY — JUDGE PASS; public verification required. This is not a learning-content approval, reward, or deployment claim.

## Outcome

- Product: SUNNYVAiLE High
- User problem: The promoted Classes route previously failed because `/content/site/high-classes.json` returned 404 in the live and candidate audit. Its failure recovery also sent people to a classroom that depends on the same register.
- Intended user outcome: A locally built site serves the single canonical class register at its documented route; both High and classroom handle an unavailable register plainly and point only to routes that do not require that register.
- Evidence and research: `content/site/high-classes.json` is the existing canonical register (4 subjects, 37 rows). `scripts/build-public-site.mjs` explicitly includes that path in its runtime artifact list. The register currently has no `live` rows; this cycle must not claim that it adds filmed classes or approves the learning content. `state.json` and `launch-deep-dive-2026-07-25.md` record the prior 404 as SH-01/P0 evidence.
- Scope: `sunnyvaile-high.html`, `learn/class.html`, and records in this product-steward folder only.
- Explicit non-goals: No new class rows, scripts, videos, claims of filmed instruction, quiz/reward changes, source/currency approval, deployment, publication, or git activity.

## Proposed direction

- Decision or championship result: Keep the one existing data-backed discovery route. Make its client fetches reject non-OK responses and make their recovery copy truthful, without directing a register failure to another register-dependent route. Prove the existing build route in a freshly generated local public artifact.
- Why it fits LAiDIES: It restores a concrete, source-backed route while preserving the distinction between available text/register content and unfilmed video classes.
- External tools/plugins/services proposed: None.
- Approval or installation required: None.

## Work breakdown

| Work item | Craft owner | Inputs | Output path | Dependencies | Status |
|---|---|---|---|---|---|
| Create packet and lock scope | Maker | SH-01 evidence, current source | This packet | Product contract | COMPLETE |
| Harden High register fetch/recovery | Maker | Existing canonical JSON route | `sunnyvaile-high.html` | JSON route | COMPLETE |
| Harden classroom fetch/recovery | Maker | Existing canonical JSON route | `learn/class.html` | JSON route | COMPLETE |
| Build and route-test exact local artifact | Maker | Public-site builder and candidate files | Evidence record | Build artifact | COMPLETE |
| Independent packet review | Parent judge (read-only) | Patch and evidence | This packet / review record | Maker candidate | COMPLETE — PASS |

## Acceptance and independent review

| Gate | Exact test/evidence | Independent owner | Result |
|---|---|---|---|
| Product/content quality | Confirm no new class, video, curriculum, or availability claim was introduced; unavailable recovery does not promise a film. | Parent judge | PASS |
| Accuracy, safety and trust | Inspect the rendered register status semantics and failure copy; confirm it does not send a missing-register user to `/learn/class.html`. | Parent judge | PASS |
| Positive LAiDIES brand contribution | Confirm the repair retains a clear High → class-register route without disguising unfilmed material. | Parent judge | PASS |
| UX and accessibility | Inspect error copy and destinations for a usable non-register-dependent recovery path. | Parent judge | PASS |
| Frontend/backend/data integrity | Fresh public artifact contains `content/site/high-classes.json`; HTTP GET of High, classroom, and JSON all return 200; JSON parses; inline-JS and local-link checks pass. | Maker, then Parent judge | JUDGE PASS — VERIFIED LOCALLY / PUBLIC VERIFICATION REQUIRED |
| Visual/media quality when applicable | No visual/media asset change in scope. | Parent judge | NOT APPLICABLE |

## Integration and release

- Affected products/champions: SUNNYVAiLE High; Platform Reliability owns broader artifact/deploy verification.
- Canon, identity, reward or analytics dependencies: Canonical class register only. No identity, reward, or analytics contract is changed.
- Exact candidate: Fresh local public artifact generated from this workspace after the narrow candidate patch.
- Release authority: Not requested. No deployment/publication in this cycle.
- Rollback: Revert only the two fetch/recovery edits; no data or route migration is involved.
- Public verification: NOT REQUESTED / NOT EXECUTED. Local artifact evidence cannot establish public route health.

## Measurement and learning

- Baseline: Prior launch audit recorded a 404 for the promoted class-register route.
- Success/failure signals: Success is exact local artifact route availability plus clear error handling; failure is missing JSON, non-200 route, parse failure, check failure, or judge rejection.
- Review date: Before any deployment candidate or wider SH-02/SH-03 learning journey work.
- Decision after measurement: Retain this narrow repair only if all stated local checks and independent review pass; otherwise keep SH-01 open.
- Dossier/state/backlog updates: Update SH-01 only with exact local evidence and judge result; retain all other blockers unchanged.

## Maker evidence — 2026-07-25

- Candidate source handling: both `sunnyvaile-high.html` and `learn/class.html` now reject a non-OK class-register response before parsing JSON. The High recovery links only to `/library.html#the-101-shelf` and `/learn/quiz.html`, neither of which depends on this register.
- `node scripts/build-public-site.mjs /tmp/laidies-high-p0.YYKhU8`: **PASS**; 1,068 files / 958.47 MiB. The builder emitted its pre-existing size warning at 750 MiB; it did not fail the build.
- Artifact HTTP checks against a temporary local static server: **PASS** — `/sunnyvaile-high.html` 200 (64,300 bytes), `/learn/class.html` 200 (36,955 bytes), `/content/site/high-classes.json` 200 (40,818 bytes).
- Artifact register validation: **PASS** — JSON parsed, 4 subjects and 37 classes. Artifact SHA-256 exactly matched the source register: `a2070255737daeee50b55700d5f17ea76e4301ae3d1447f34ff361feefdf4309`.
- `node scripts/check-inline-js.js`: **PASS** — 353 inline scripts parse across 132 live pages.
- `node scripts/check-local-links.js`: **PASS** — 1,942 local references resolve across 110 pages.
- This is local artifact evidence only. It does not supersede the historical live/candidate 404, prove a deployed route, or approve the existing unfilmed learning inventory.

## Independent judge verdict — 2026-07-25

**JUDGE PASS — VERIFIED LOCALLY / PUBLIC VERIFICATION REQUIRED.** The judge confirmed that both fetches reject non-OK responses; the High no longer loops a register failure into register-dependent classroom; recovery routes are independent; no class/video/content claim was added; and the fresh artifact evidence proves the register is present, parses as 4 subjects/37 classes, hash-matches source, and passes the stated JS/link checks.

Boundary retained: this does **not** prove these edits caused the historical 404 to be fixed—the builder inclusion already existed—and SH-01 is not publicly resolved until the exact deployed artifact serves the register and class routes successfully. Existing filmed-class promises despite zero `live` rows remain a separate product-truth issue and were not approved by this review.

## Learning scan

- Reusable prevention rule: every runtime data dependency promoted by a page must be listed in the public-artifact manifest and checked by an HTTP request against a freshly built artifact; source-file existence and client-side fallback alone are insufficient.
- Possible Behind the Build angle: why an honest fallback must not send someone to a second route that depends on the same missing data.
- The canonical `operations/painpoints-log.md` was searched for related 404 guidance. It is outside this cycle's explicit write boundary, so no ledger entry was added here; the prevention rule is retained in this packet for the owning champion.
