# Episode cast held-portrait source narrowing — maker receipt

**Status:** `VERIFIED LOCALLY — INDEPENDENT JUDGMENT / PUBLIC-ASSET INVENTORY INTEGRATION PENDING`

## Scope

The four issue-page cast strips no longer request the prohibited saint/Ada portrait files. Each affected card keeps its existing LUMINAiRY destination, visible name, teaching role and accessible text, and now renders the existing honest `Portrait held` treatment rather than a broken or empty image frame.

This is a source-narrowing repair only. It does not admit portraits, change LUMINAiRY profiles or claims, alter episode scene art/hero metadata/VHS covers, update the registry or runtime manifest, deploy, publish or release anything.

## Exact affected occurrences

The initial task said “11,” but the current sources contained **10** target cast-image occurrences: Cher x2, David x1, Dolly x1, Elle x2, Miranda x1, Regina x2 and Ada x1. Ada’s separate inline identity-card image had already been removed by the independently accepted bounded repair and is not counted again here.

| Route | Removed cast-image occurrences | Replacement |
| --- | ---: | --- |
| `issues/issue-01.html` | Cher, Dolly, Regina (3) | three labelled held cards |
| `issues/issue-02.html` | David, Miranda, Elle (3) | three labelled held cards |
| `issues/issue-03.html` | Elle, Cher, Regina (3) | three labelled held cards |
| `issues/issue-04.html` | Ada (1) | one labelled held card |

**Target prohibited count:** before `10`; after `0`.

The held visual uses the existing LUMINAiRY `.portrait-held` palette/wording: `Portrait held`, white text and the `#5f4685 → #775596 → #c96652` held gradient. It is `aria-hidden` because each card’s live name and role remain its accessible label.

## Exact candidates

| Artifact | SHA-256 |
| --- | --- |
| `issues/issue-01.html` | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` |
| `issues/issue-02.html` | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` |
| `issues/issue-03.html` | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` |
| `issues/issue-04.html` | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` |
| `scripts/test-issue-04-inline-ada-card.mjs` | `6257516aebc79e2d6d40d5bb4adb6cacadbc968a6c5fa20690acc929046aab3e` |
| deterministic regenerated inventory (temporary evidence output) | `c49a2f76c9713d2da56795b76c4bedfcc96200f3d2b1bc0778af8fd2f2a00f38` |

## Local evidence

- `node scripts/test-issue-04-inline-ada-card.mjs` — PASS at 1440, 390 and 320 pixels: semantic inline Ada marker remains; no inline or cast Ada asset; one held cast treatment; name/role/LUMINAiRY route retained; no overflow.
- Calibrated exact target detector — PASS: current route counts `[0,0,0,0]`; a deliberately injected prohibited Cher path reports `1`.
- Rendered cast check — PASS at 1440, 390 and 320 pixels for all four routes: 10 held cards; no target prohibited image request; names, roles and `/luminairy.html` destinations retained.
- `node scripts/test-screening-room-contract.mjs` — PASS with its existing truthful title holds.
- `node scripts/test-active-asset-admission.mjs` — PASS.
- `node …/check-builder-inventory-parity.mjs` — PASS: `prohibited_references=21`, `exact_set=true`, `missing=0`, `fail_closed=true`.
- `git diff --check -- issues/issue-01.html issues/issue-02.html issues/issue-03.html issues/issue-04.html scripts/test-issue-04-inline-ada-card.mjs` — PASS.

The exact source-narrowing guard is correctly **HOLD/FAIL** until its canonical generated inventory is refreshed: its committed inventory still has 31 prohibited references, while the deterministic current traversal has 21. It fails only the byte-equality comparison, proving the candidate has narrowed the closure rather than that the builder became permissive. Updating the shared generated inventory is intentionally outside this maker’s write scope.

## Residual holds

- The whole public-asset closure remains held: current traversal finds 582 reachable binaries, ACTIVE=2, UNREGISTERED_DEFAULT_DENY=580, 21 remaining prohibited source references and no missing dependencies.
- Existing unrelated issue-page mobile overflow was observed on Issue 01 at 390px; it is outside this cast-only source narrowing, was not introduced by the equivalent-width held replacement, and remains a separate issue-page layout repair.
- Independent maker/judge review, active-asset admission, deployment, release and public verification remain open.
