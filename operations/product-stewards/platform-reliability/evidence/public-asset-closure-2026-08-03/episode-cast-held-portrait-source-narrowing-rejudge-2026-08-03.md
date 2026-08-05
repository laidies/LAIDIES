# Independent re-judge — episode cast narrowing + mobile layout successor

**Verdict:** `HOLD — MOBILE CSS REPAIR PASS; SOURCE-NARROWING BOUNDED TUPLE STILL MISSING`

**Judged:** 2026-08-03 America/Vancouver  
**Boundary:** independent read/test review. No issue source, CSS, tests, asset registry, manifest, deployment, publication, or release change was made.

## Exact successor binding

| Artifact | SHA-256 | Result |
| --- | --- | --- |
| `content/issue-feature-v2.css` | `19db868252ac50578160d59475a5fe6fc7d66954c6e0e44ec77b6d653aedd398` | exact current; CSS-only mobile repair |
| CSS predecessor at `HEAD` | `130ef89fbda7c4d2aa734594ad3073f862951b37dea0b50cd72570c25c315815` | exact predecessor |
| `scripts/test-issue-cast-mobile-layout.mjs` | `1b8c1e220d287eb3d76b329e7d7a345a0fe3a30a80e9b9b3072d2c565017184b` | exact current |
| mobile-layout maker receipt | `f41f7acbee4edeebf604b534d4bc34861af7386e75f1862a0aa5a973dbcb5e13` | exact current |
| `issues/issue-01.html` | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` | unchanged from prior HOLD |
| `issues/issue-02.html` | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` | unchanged from prior HOLD |
| `issues/issue-03.html` | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` | unchanged from prior HOLD |
| `issues/issue-04.html` | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` | unchanged from prior HOLD |
| source-narrowing maker receipt | `3f55a9d5b857a96faa5ce3c4e27ccc21e27ef2b3eb14d13d8458267713aace6a` | still lacks immediate predecessor page hashes |
| runtime family manifest | `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` | exact current |
| canonical public inventory | `c36837b59266b6debfebc38ed62e86f11dac58ba592ef1d40974c5bdd4391221` | exact current at final check |

## Mobile CSS repair — PASS

The CSS diff is bounded and unambiguous: one `<=640px` cast-layout override changes the shared higher-specificity cast gallery from a non-wrapping flex strip to a two-column grid and removes horizontal-scroll/card-flex behavior. No issue HTML changed between the prior HOLD and this successor.

Independent command results:

- `scripts/test-issue-cast-mobile-layout.mjs` — PASS on Issues 01–04 at 1440, 390 and 320; every card has a nonzero box fully inside the viewport; no document horizontal overflow.
- The same test injects the former higher-specificity mobile flex rule. All four 390px routes then reproduce fewer fully visible cards than total cards. The gate therefore rejects the exact prior defect and is calibrated.
- `scripts/test-issue-04-inline-ada-card.mjs` — PASS at 1440, 390 and 320; semantic inline Ada state and held cast state remain; no Ada image request; no page overflow.
- `scripts/test-screening-room-contract.mjs` — PASS with its existing title/media HOLDS intact.
- `scripts/test-active-asset-admission.mjs` — PASS.
- Source-narrowing and builder/inventory parity tests — PASS/PARTIAL PASS, `binary=581`, `prohibited_references=21`, exact set, missing=0, fail-closed=true.
- `git diff --check` over the exact CSS, tests and issue candidates — PASS.

The in-app browser connection was unavailable during this re-judge. Responsive rendering was independently exercised in real headless Chrome by the exact current validator rather than inferred from CSS text.

## Portrait narrowing — effect remains verified

- Target cast portrait counts are `HEAD=[3,3,3,1]`, current=`[0,0,0,0]`: exactly 10 target cast references are absent.
- Current held-card counts are `[3,3,3,1]`.
- Visible names, teaching-role text, `/luminairy.html` links and `Portrait held` states remain covered by the prior independent DOM review and unchanged exact issue hashes.

## Why the combined verdict remains HOLD

The new evidence fixes the prior responsive failure, but it does not fix the prior source-boundary failure. The source maker receipt contains only the four post-narrowing issue hashes. It does not bind the immediate pre-narrowing versions of those same pages. Comparison with `HEAD` still includes unrelated episode navigation, hero/read, scene and visual-route work, so that diff cannot prove the 10 cast substitutions were the only page changes in the source-narrowing transaction.

This re-judge therefore accepts only the exact CSS repair and preserves the combined source-narrowing HOLD. It does not reject the substitutions themselves, which continue to produce the intended closure reduction.

## Smallest remedy

The source maker must reissue one artifact-bound receipt containing, for each Issue 01–04 file:

1. the exact immediate pre-narrowing SHA-256;
2. the existing post-narrowing SHA-256;
3. one exact patch proving the delta is limited to the 10 image-to-held substitutions plus their directly required `.cast-portrait-held` CSS; and
4. the authoritative receipt/hash for any earlier unrelated issue-page work already present in those predecessor bytes.

If the original predecessor bytes no longer exist, reconstruct them deterministically from the current files in a temporary evidence directory by reversing only the 10 substitutions, bind those bytes and the reverse/forward patch, and request another independent judgment. No source rewrite is required unless that reconstruction exposes a mismatch.

## Remaining scope limits

- Current public-asset closure remains held: 581 binaries, ACTIVE=21, UNREGISTERED_DEFAULT_DENY=560, prohibited source references=21, missing=0. These counts changed concurrently after the first judgment; they do not imply publication or release.
- Screening Room title/media evidence remains held.
- Registry admission, deployment, release and public-origin verification are outside this judgment and are not implied.
