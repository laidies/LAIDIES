# LIBRAiRY P0 vertical build packet — admitted book to Puffy/Closet

**Status:** BUILDING — BUILD REMAINS REQUIRED  
**As of:** 2026-07-26  
**Decision controls:** D-2026-07-26-053 through D-2026-07-26-056  
**Integration slot:** first device-local dependency-unlocking vertical  
**Live-service authority:** none granted; this packet does not deploy or admit
content by itself

## Outcome

One owner-approved book must complete this real journey:

`approved source → admission manifest → shelf/Miss Jeeves → real reader →
exact-section Puffy save → authoritative local read-back → Closet reopen →
Library rechecks admission → remove → authoritative local read-back`

The journey is tested separately as a first-time visitor, a returning visitor
without a Resident Card, a device-local Card holder and a verified
account-backed resident. The fourth state uses the same local Puffy authority
until the Platform identity/sync contract passes; login or Card presence must
not manufacture sync.

## Architecture and authority

### 1. Admit exactly one real book

- **Library/editorial owns:** source selection, source/claim review,
  currentness, rights, usefulness, brand and correction authority.
- **Release owns:** immutable artifact binding and admission compilation.
- **Files:** add
  `content/library-books/admission-manifest.json`; retain rendered sources
  under `content/library-books/rendered/`; compile the public allow-list into
  `library.html` or a generated private module.
- **Required manifest fields:** `book_id`, `status`, `source_path`,
  `content_version`, `admission_version`, source/claim references,
  `reviewed_at`, `review_owner`, `correction_state`, and artifact hash.
- **Rule:** a file, index row, cover or preview never admits itself. Only
  `status=available` plus the exact approved path/version may open.
- **Completion event:** immutable admission record and candidate artifact
  agree, followed by a successful same-origin render of that exact version.

### 2. Reader and Miss Jeeves

- **Library owns:** full reader, contents navigation, deep links, focus
  restoration, retry and truthful held/corrected states.
- **Miss Jeeves owns:** curated answer review and index result usefulness.
- **Files:** `library.html`, `content/site/site-index.json` and its builder.
- Replace the current silent index-fetch failure with explicit
  unavailable/retry UI.
- Filter every index/curated result through current admission and correction
  state before it becomes operable.
- **Completion event:** useful visible answer/result whose destination opens
  the currently admitted artifact, or an accessible zero/error state.

### 3. Puffy save, reopen and remove

- **Platform owns:** versioned local record contract, validation,
  idempotency, conflict/failure semantics and later account migration.
- **Library owns:** exact section identity and producer feedback.
- **Closet owns:** consumer rendering, reopen/remove and four-state copy.
- **Files:** `content/site/puffy-bookmarks.js`, `library.html`,
  `laidies-card.html`, and their deterministic/browser tests.
- Add stable `book_id`, `section_id`, `content_version`, schema version and
  cross-tab storage-event handling without weakening current field, route,
  sticker, size or read-back validation.
- A save succeeds only after exact serialized read-back. Reopen must recheck
  current admission. Remove succeeds only after absence is read back.
- Puffy remains retrieval state—not a reward, entitlement, owned book or
  account credential.

### 4. Corrections

- **Platform owns:** versioned correction record/service contract.
- **Library/editorial owns:** triage, corrected source, demotion and resolution.
- Required record: `correction_id`, `book_id`, `section_id`, `claim_id`,
  `source_id`, reporter-safe payload, receipt, state, owner, created/updated
  timestamps, resolution, `content_version` and `superseded_by`.
- **Flow:** submit → receipt → triage → correct or demote → admission manifest
  → reader → Miss Jeeves/index → Puffy reopen.
- Raw reading activity, query text, Resident Card identifiers and private
  purpose labels must not enter analytics or public evidence.

## Four visitor scopes and transitions

| Scope | Authority | Required proof |
|---|---|---|
| First-time | no prior Puffy record; Card/account irrelevant | admit/open/save/read-back/Closet/reopen/remove |
| Returning without Card | valid device-local Puffy record only | close/reload/return/reopen/update/remove |
| Device-local Card | separate valid local Card envelope | identical Puffy result; no login/sync claim |
| Verified account-backed resident | accepted session/RLS evidence, if present | local result remains explicit; remote sync only after the Identity packet passes |

Also test first→return, visitor→local Card, local Card→account, sign-out,
second tab, second device, local/remote conflict, correction/demotion, storage
denial, corrupt migration and deletion/revoke. A clean-browser or local-Card
PASS cannot establish account-backed residency.

## Failure, retry and idempotency

- Unknown, held, corrected or redirected sources fail closed.
- Reader/index failures preserve query/navigation context, announce the error
  and offer a non-duplicating retry.
- Puffy uses stable record identity; duplicate saves converge to the newest
  valid record. A failed write/remove never paints success.
- Another tab receives create/update/remove through the storage adapter.
- A demoted/corrected book cannot reopen from shelf, Miss Jeeves, hash or
  Closet. The saved marker may remain only as an honest unavailable record.
- Account migration, when enabled, preserves local bytes until a remote
  read-after-write succeeds and exposes an explicit keep-local/use-remote
  conflict decision.

## Accessibility, analytics and release proof

- Keyboard and native screen-reader proof covers shelf, Miss Jeeves, modal,
  contents, sticker choice, save status, Closet reopen/remove, error and retry.
- Status/error announcements use appropriate live semantics; focus returns to
  the trigger; reduced-motion and 320/390 px paths remain usable.
- Allowed aggregate events:
  `library_arrived`, `library_search_outcome`, `library_reader_outcome`,
  `puffy_save_outcome`, `puffy_reopen_outcome`, `puffy_remove_outcome`,
  `library_correction_outcome`. Payloads use controlled IDs/outcome codes only.
- Candidate proof binds source commit, manifest hash, rendered-source hash,
  built artifact hash, deployment identifier, public-origin journeys, service
  verdicts and rollback reference. Local proof is not public proof.

## Ownership and dependencies

| Work | Direct owner | Dependency/unblock |
|---|---|---|
| Select/review/admit one book | Library/editorial | Ali only if no delegated content owner can approve the first source |
| Reader and Miss Jeeves reconciliation | Library/Miss Jeeves | admitted manifest contract |
| Local Puffy schema/cross-tab/read-back | Platform | none; preserve existing valid records |
| Closet consumer/four-state UX | Closet/MAiKEOVER | versioned Puffy adapter |
| Correction service and propagation | Platform + Library/editorial | approved intake/retention/provider decision if an external service is required |
| Account-backed migration | Platform | Identity packet accepted first |
| Candidate/public proof | Release + independent reviewer | all preceding rows built |

Genuine Ali authority is required to move a promised capability later, approve
the first source if no delegated content authority exists, authorize a new
external correction provider/retention policy, or resolve an irreconcilable
content conflict. Ordinary engineering and bounded editorial work are not Ali
blockers.

## Acceptance matrix

1. Manifest/admission tests reject absent, held, wrong-path, wrong-hash,
   corrected and stale versions.
2. Reader tests cover success, exact-section deep link, redirect, 404,
   malformed source, retry, close/focus and reduced motion.
3. Miss Jeeves tests cover curated/index results, zero results, offline,
   malformed/stale index and admission/correction reconciliation.
4. Puffy/Closet tests run save, duplicate, update, reload, cross-tab, reopen,
   remove, denial, corruption, migration and demotion in all four visitor
   scopes without identity leakage.
5. Correction tests prove receipt, state transition, correction/demotion and
   every consumer update.
6. Accessibility and prohibited-analytics assertions pass.
7. Independent exact-artifact review passes before public-origin review.

No row may be closed by hiding or relabeling it. `INTENTIONAL LATER RELEASE`
requires the complete D-2026-07-26-056 record and cannot be applied to missed
current-release work.

