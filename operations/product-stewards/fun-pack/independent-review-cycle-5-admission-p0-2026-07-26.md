# THE EXTRA CREDIT / Fun Pack — Independent Cycle 5 Admission Review

**Date:** 2026-07-26  
**Scope:** Cycle 5 admitted-child P0 candidate  
**Decision:** **FAIL — REPAIR REQUIRED**

## Executive verdict

The candidate is substantially more honest than the previous generic shelf. Its canonical registry accurately mirrors the four current child-owner HOLD verdicts, exposes four distinct published episode contexts, admits zero activities, provides episode and Bag exits, and never turns selection into completion, learning or reward.

It nevertheless fails the non-compensable trust floor. The shelf-owned registry is also treated as the authority for the child owner’s disposition, episode relationship and verified return. A forged but internally consistent version of that one mutable file can change Dream Phone from HOLD to ADMITTED and render it as an open activity. The maker suite calls this a synthetic positive mechanism test; from the independent authority boundary, it proves that the shelf can overrule the real child-owner verdict.

The runtime route validator also admits traversal-normalized same-origin paths, arbitrary local child routes and non-canonical query/hash variants. External origins and double-encoded returns are rejected, but “same origin” is not equivalent to “authorized exact route.”

The product floor also does not pass yet. A truthful shelf with zero admitted extras is a useful safety state, but it is not yet a useful Extra Credit product experience. Its only current product job is explaining that nothing qualifies.

## Score and non-compensable floors

| Dimension | Score | Independent judgment |
|---|---:|---|
| Product usefulness and content quality | 13/20 | **Floor failed:** truthful, but zero admitted user value |
| Accuracy, safety, privacy and trust | 9/20 | **Floor failed:** shelf can self-assert child authority |
| Positive LAiDIES brand contribution | 17/20 | Floor passed: restraint and copy are materially positive |
| UX, accessibility and reliability | 16/20 | Clear states/reflow; Retry loses focus |
| Technical and data integrity | 11/20 | Authority coupling and permissive route/schema contract |
| **Total** | **66/100** | **FAIL** |

Required non-compensable floors:

- Product quality: 13/20 — **fail**
- Trust/accuracy: 9/20 — **fail**
- LAiDIES brand contribution: 17/20 — pass

No aggregate score can compensate for either failed floor.

## Canonical truth reconciliation

The exact source registry correctly matches the current owner records:

| Child | Registry verdict | Owner source | Parity |
|---|---|---|---|
| Mme CLAi-O | `BOUNDED LOCAL PASS — RELEASE HOLDS REMAIN` | `mme-claio/state.json` `status` | Exact |
| FAiRY Godmother | `FIX BEFORE PROMOTION` | `fairy-godmother/state.json` `launchStatus` | Exact |
| Dream Phone | `PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL` | `dream-phone/state.json` `launchStatus` | Exact |
| Girl Talk | `BOUNDED LOCAL PASS — HONOUR SYSTEM ONLY; RELEASE HOLDS REMAIN` | `girl-talk/state.json` `status` | Exact |

The source validator also confirms:

- four exact published episode contexts;
- Episode 04 as the sole current context;
- Episodes 01–03 as archives;
- four unique canonical child IDs;
- every canonical child on HOLD;
- zero admitted activities.

This proves the checked source snapshot is accurate. It does not make the fetched shelf file independent authority.

## P0-1 — the shelf can overrule child-owner verdicts

The renderer accepts a child when the fetched shelf registry says all of the following:

- `admission: ADMITTED`;
- `ownerDisposition: ADMITTED`;
- `episodeRelationship: VERIFIED <episode>`;
- `returnContract.status: VERIFIED`;
- an activity contains matching fields and return parameters.

All of those assertions come from the same shelf-owned JSON response. The runtime does not compare `ownerVerdict` with any child-owner record, and does not receive an independently issued child admission artifact.

Independent attack result, identical in source and fresh artifact:

```text
forgedAuthority = accepted
```

The forged record changed Dream Phone’s disposition/admission and relationship, added a locally coherent return contract and activity, and passed `registryIsValid`. The supplied maker browser suite then proves that this class of fully bound synthetic record renders exactly once.

Therefore the statement `shelfCannotOverrideChildVerdict: true` is policy text, not an enforced authority boundary.

### Required repair

The shelf must consume, not manufacture, child authority. Use a generated, independently owned admission record or ticket derived from each child steward’s accepted state. The shelf presentation registry may reference that record but must not be able to create or change:

- owner disposition;
- owner verdict;
- episode relationship approval;
- return-contract verification;
- child route authority.

Add a hostile fixture that changes every shelf-owned approval field coherently and prove it still cannot render a child whose independent owner record is HOLD.

## P0-2 — same-origin route validation is not exact authorization

`safeRoute` checks a raw prefix, then parses the URL and checks same origin plus absence of `..` in the already-normalized pathname. This permits paths whose raw value satisfies the prefix while URL normalization changes the destination.

Independent source and artifact results:

| Attack | Runtime result |
|---|---|
| External child route | Rejected |
| Double-encoded return | Rejected |
| Arbitrary local child route `/games/admin.html` with internally changed child route | **Accepted** |
| Local traversal image `/assets/../privacy.html` | **Accepted** |
| Encoded traversal image `/assets/%2e%2e/privacy.html` | **Accepted** |
| Episode route with query text | **Accepted** |
| Bag return with fragment | **Accepted** |
| Extra activity query such as `reward=1000` | **Accepted** |

No attacker-origin network request was observed. The defect is authorization and canonicality: the shelf can point at unintended local resources or preserve invented query semantics.

### Required repair

- Validate the raw string before URL normalization.
- Reject percent encoding, backslashes, control characters, fragments and unapproved query keys.
- Use exact route patterns for episode, Bag, image and child destinations.
- Require the child route to come from independent child authority.
- Compare the complete canonical activity URL and exact parameter set; reject duplicates and extras.
- Add source and release-artifact hostile fixtures for every row above.

## Schema and relationship attacks

Correctly rejected in source and fresh artifact:

- duplicate child ID;
- duplicate episode ID/number identity;
- duplicate child activity within one episode;
- cross-episode relationship mismatch;
- external child route;
- double-encoded return.

Not rejected:

- unknown top-level authority fields;
- unknown child fields;
- unknown activity fields, including a forged reward-like field.

Those unknown fields are presently ignored by the renderer, so selection still makes no completion/learning/reward claim. They remain a strict-schema defect because silent extensions can acquire meaning later without a versioned contract.

Required repair: reject unknown keys at every registry level and version any intentional schema expansion.

## Completion, learning and reward truth

The rendered canonical experience does **not** claim:

- completion from selection or visit;
- learning or mastery;
- a reward;
- approval of any held child;
- account or persistence behavior.

The visible purpose copy explicitly denies those inferences. The canonical empty shelf has zero actionable held-child links.

This truthfulness is accepted. It does not compensate for the forged-authority path.

## Current/archive URL and history behavior

- The canonical current context defaults to Episode 04.
- `?issue=2` selects Episode 02 and uses the exact Episode 02 and Bag exits.
- Episode selection updates the durable query using `history.replaceState`, avoiding a new history entry for each toggle.
- The fixed Bag return updates to the selected episode.
- Duplicate episode identities are rejected by the current identity contract.

The runtime still retains unrelated existing query/hash state when changing episodes. Only an explicit allowlist should survive if those values affect a return path.

## Missing registry, empty usefulness and alerts

Missing or malformed registry behavior is fail-closed:

- zero activity cards;
- one programmatic `role="alert"`;
- visible explanation that no fallback child opens;
- Retry and episode-selection exits.

The alert itself is present and correctly denies a counted/opened activity. After Retry fails, however, replacement of the focused Retry button returns focus to `BODY`. Focus should move to the new alert heading/panel or a stable Retry control.

The zero-admitted state is honest and episode-specific, but it is not a finished user-value proposition. Before product acceptance, at least one independently admitted extra must demonstrate:

- a distinct episode-specific job;
- real usefulness or delight;
- a clean verified return;
- representative-user evidence;
- no displacement of the Episode or Study Pack.

## Mobile and keyboard evidence

- Source and fresh artifact remain within the viewport at 320 px.
- Episode controls are native buttons with visible focus styles and `aria-pressed`.
- The episode context is a polite atomic live region.
- Failure uses a programmatic alert.
- Existing desktop and 320 px deterministic journeys pass.

Remaining UX evidence:

- repair Retry focus loss;
- native keyboard traversal through all episode toggles and exits;
- Safari/VoiceOver, TalkBack and 200%/400% zoom;
- owner review at 320, 390 and desktop.

## Verification results

### Source

```text
FUN PACK CONTRACT PASS · episodes=4 · children=4 · admitted=0 · fail-closed
FUN PACK PRODUCT PASS checks=23 external_requests_blocked=35
INLINE JS PASS · 352 scripts / 132 pages
LOCAL LINKS PASS · 1,966 references / 110 pages
CHECK-TOWN PASS
```

### Fresh artifact

```text
Path: /tmp/laidies-fun-pack-r1-rejudge.QJV8S6
Builder: 1,081 files / 959.56 MiB
Warning: artifact exceeds 750 MiB
Public metadata validator: PASS
FUN PACK PRODUCT PASS checks=23 external_requests_blocked=35
Source/artifact page and registry byte parity: PASS
```

Fresh artifact hashes:

| File | SHA-256 |
|---|---|
| `games/fun-pack.html` | `35d152484dd20375d753a07417fb2d6ae7ea75fa262e7a7adfe1e3de56b2bb39` |
| `games/data/fun-pack-registry.json` | `fefc4409a60c116c65a1082a8d4ac9d83f58fa499e1ce7e4a5b349ab1dced177` |

The source static validator passes. It cannot run with `FUN_PACK_ROOT` set only to the public artifact because it depends on four `operations/product-stewards/*/state.json` files that are deliberately absent from the public package. That is acceptable for a source build gate, but it means the 23-check browser suite—not an independent owner-state validator—is the only artifact-local gate. The repaired design must carry a safe generated authority artifact into the package or validate that authority conclusively before packaging.

## Exact holds

1. Independent child-authority boundary; forged shelf-owned approval must not open a HOLD child.
2. Exact canonical route and query contract.
3. Strict unknown-field rejection.
4. At least one independently admitted, genuinely useful episode-specific extra.
5. Retry focus repair and native accessibility/zoom evidence.
6. Owner visual/comprehension approval.
7. Representative-user usefulness and return evidence.
8. Analytics contract and baseline.
9. 959.56 MiB artifact advisory.
10. Deploy/public-origin and release provenance.
11. Every child product’s own release holds.

No child is independently approved by this review. No deployment or public mutation is authorized.

## Learning scan

Reusable prevention rule: never let an aggregator assert the approval it is supposed to verify. Relationship consistency inside one mutable document is not independent authority. Admission tests must forge every mutually supporting field at once and prove that an external owner record still prevents rendering.

Second prevention rule: URL parsing normalizes before inspection. Validate the raw route, enforce an exact allowlist and exact query set, then parse and compare the canonical result.

The parent release owner should reconcile these rules into the canonical pain-points ledger. This independent review intentionally changed no shared operating record.
