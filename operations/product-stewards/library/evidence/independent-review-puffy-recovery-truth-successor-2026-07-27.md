# LIBRAiRY Puffy recovery-truth successor — independent verdict

**Verdict:** `ACCEPT — BOUNDED DEVICE-LOCAL RECOVERY TRUTH`  
**Reviewed:** 2026-07-27  
**Scope:** `content/site/puffy-bookmarks.js` recovery semantics and its product regression only. No account, sync, ownership, reward, deployment, or public-origin claim is made.

## Exact reviewed bytes

| Input | SHA-256 |
| --- | --- |
| `content/site/puffy-bookmarks.js` | `45ba92f04f8970ca800c13d638199317a894b3a86a6ae7b8d6982ea9f6842cab` |
| `scripts/test-library-product.cjs` | `75949d62be6904b62b1e878e739a778b21f4deb2ba4e79627bf9bb22854c12a5` |

## Independent result

```text
LIBRAiRY CONTRACT PASS · books=15 · hold=8 · preview=7 · available=0 · Puffy write/read truth
LIBRAiRY PRODUCT PASS
checks=52
external_requests_blocked=37
```

The shared runtime now makes “removed” conditional on a successful
`localStorage` write **and exact read-back match**. It tracks storage cleanup
as complete only when that round trip succeeds. This holds for both the board
and the Puffy pouch recovery paths.

### Recovery cases reproduced

- With a mixed corrupt board, unsafe/executable records were quarantined,
  only the two valid siblings rendered, the newest valid duplicate won, and
  the rewritten board was canonical schema v2 with exact identity fields.
  The notice truthfully says damaged records were removed only after the
  verified cleanup write.
- With the same corrupt input but a denied cleanup write, the two valid
  siblings remained usable for the visit while all unsafe records were ignored
  from rendering.
- In that denial path, `data-puffy-recovery-storage=incomplete`; the notice
  says records were **ignored** and that the browser did not let the Library
  remove them. It does not say “We removed.”
- The original denied-cleanup storage value remained 14 records long and still
  contained `bad-javascript`, proving no false removal was claimed or written.
- General storage denial remains consistent: the visible failure says “Nothing
  was saved or removed,” and the UI does not paint a false saved Puffy state.

## Regression review

The recovery change is accompanied by explicit board/pouch canonicalization,
versioned identity, legacy migration, hostile URL rejection, duplicate
convergence, board rendering, pouch rendering, reader save, My Closet reopen,
cross-tab update/remove, storage-denial, and external-request-blocked tests.
All 52 passed. `git diff --check` passed for the runtime and test files.

No regression was observed in valid board/pouch continuity: a valid sibling
still supplies a safe My Closet link and remove control; it remains
device-local retrieval rather than a reward, account, or ownership record.

## Limits and next action

This ACCEPT is limited to local Chromium/device-state behaviour. Native
Safari/private-mode, account sync, cross-device merge/revoke/delete,
authoritative book admission, complete reader/Puffy/Closet public journey,
analytics, and release/public-origin proof remain separate gates.

**Exact next action:** retain this recovery contract for all shared Puffy
consumers; any persistence migration or account-backed save work must use a
new versioned contract and independent migration/denial/revoke review.

## Learning scan

The repair directly implements the reusable rule that a cleanup message may
say “removed” only after a round-trip-verified write. No further learning-ledger
entry is needed for this independent rejudge.
