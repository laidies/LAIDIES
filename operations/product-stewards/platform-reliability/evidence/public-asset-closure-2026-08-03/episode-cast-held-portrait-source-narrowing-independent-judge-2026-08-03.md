# Independent judge — episode cast held-portrait source narrowing

**Verdict:** `HOLD — NARROWING EFFECT VERIFIED; EXACT CANDIDATE NOT ADMISSIBLE AS A BOUNDED RESPONSIVE PAGE CHANGE`

**Judged:** 2026-08-03 America/Vancouver  
**Judge boundary:** independent read/test/browser review only. No issue source, asset, registry, manifest, deployment, or release change was made.

## Exact candidate binding

| Artifact | SHA-256 | Match to maker |
| --- | --- | --- |
| `issues/issue-01.html` | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` | yes |
| `issues/issue-02.html` | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` | yes |
| `issues/issue-03.html` | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` | yes |
| `issues/issue-04.html` | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` | yes |
| `scripts/test-issue-04-inline-ada-card.mjs` | `6257516aebc79e2d6d40d5bb4adb6cacadbc968a6c5fa20690acc929046aab3e` | yes |
| maker receipt | `3f55a9d5b857a96faa5ce3c4e27ccc21e27ef2b3eb14d13d8458267713aace6a` | bound |
| canonical public inventory | `c812be84600edd562d699de1abb5000faf6574fa89370bd22b77b898270db0f7` | current |
| runtime family manifest | `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` | current |

## What independently passed

- Exact cast-target detector: `HEAD` contains `[3,3,3,1]` target cast portrait occurrences by issue; current sources contain `[0,0,0,0]`. That is exactly **10** removed cast occurrences. The detector was calibrated in memory by injecting one prohibited Cher cast path, which returned `1`.
- The current cast markup retains all 10 visible names, the existing teaching-role text, and `/luminairy.html` destinations. Each replacement is visible `Portrait held` text in a `span.cast-portrait-held[aria-hidden="true"]`, while the surrounding link exposes name + role as its accessible label.
- `node scripts/test-issue-04-inline-ada-card.mjs` passed at 1440, 390, and 320: semantic Ada marker remains; no inline or cast Ada asset; one held cast treatment; no page-level overflow.
- `node scripts/test-screening-room-contract.mjs` passed its contract, while truthfully retaining its existing title/media HOLDS.
- `node scripts/test-active-asset-admission.mjs` passed.
- `node test-public-asset-source-narrowing.mjs` passed its partial/fail-closed contract: 581 binaries, 6 families, 255 members, 267 exclusions, 21 prohibited references, 12 source paths, no missing dependencies.
- `node check-builder-inventory-parity.mjs` passed: `prohibited_references=21`, exact set, missing=0, fail-closed=true.
- `git diff --check` over the four issue files and Ada test passed.

## Independent live rendering result

The locally served exact pages were inspected at 1440, 390 and 320 pixels.

- At 1440, every affected held card is rendered at 223 × 335px, with no horizontal overflow.
- At 390, the first cast card renders but every route lays the cast cards out in one horizontal row: only 1 card is fully visible (`issue-01`: 1/4; `02`: 1/3; `03`: 1/3; `04`: 1/8). Subsequent cards begin at x=246, 472, etc. beyond the 390px viewport.
- At 320, the same defect remains: only 1 card is fully visible (`issue-01`: 1/4; `02`: 1/3; `03`: 1/3; `04`: 1/8); the second begins at x=206 and is clipped.

This is not caused by the held replacement’s 2:3 geometry: the route’s shared cast layout resolves as a non-wrapping flex row. The files’ broad diffs show unrelated edits to episode navigation, hero/read surfaces, scene text, and in Issue 03 held scene media; therefore the judge cannot certify that these exact full-file candidates are a bounded cast-only change.

## Why this is HOLD, not PASS or REJECT

The claimed closure reduction is accurate and remains useful: the 10 forbidden cast image references are gone without breaking the card labels or LUMINAiRY routes. However, two required acceptance conditions are not proven:

1. **Responsive visitor delivery fails** for the affected card area at both required mobile widths; the cast cards are clipped off-screen.
2. **Bounded scope fails** for the exact candidate bytes: the current files include unrelated content/visual-route changes beyond cast source narrowing. This verdict cannot bless them as though they were only the 10 substitutions.

The smallest unblock is a separately owned issue-page mobile cast-layout repair (wrapping/grid/scroll treatment selected deliberately) and an atomic, source-narrowing-only candidate or explicit integration receipt that binds the other issue changes to their own approvals. Re-request this judge against those exact successor bytes.

## Remaining holds

- Whole public-asset closure remains `HOLD`: 581 reachable binary assets, ACTIVE=2, UNREGISTERED_DEFAULT_DENY=579, prohibited source references=21, missing=0.
- Screening Room remains held by the existing media/title evidence gaps; its passing contract test is not release approval.
- Active-asset admission, deployment, release, and public-origin verification are not implied by this local judgment.
