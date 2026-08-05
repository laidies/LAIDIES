# Final independent verdict — episode cast source narrowing + responsive layout

**Verdict:** `PASS — BOUNDED SOURCE NARROWING AND MOBILE CAST LAYOUT ACCEPTED`

**Judged:** 2026-08-03 America/Vancouver  
**Scope:** the exact ten episode-cast portrait substitutions plus the exact shared mobile cast-layout repair only.

## Exact proof tuple

| Artifact | SHA-256 |
| --- | --- |
| tuple maker receipt | `0d6078eb1d9d985fe434ef9bb0bdcc9ee6eb303286fe84c5cfc5cca210010824` |
| tuple verifier | `f6a7166a17616b31b063ecd3a6c5be9c1aba11f19869776505d484aec76440eb` |
| `issues/issue-01.html` | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` |
| `issues/issue-02.html` | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` |
| `issues/issue-03.html` | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` |
| `issues/issue-04.html` | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` |
| `content/issue-feature-v2.css` | `19db868252ac50578160d59475a5fe6fc7d66954c6e0e44ec77b6d653aedd398` |
| mobile layout test | `1b8c1e220d287eb3d76b329e7d7a345a0fe3a30a80e9b9b3072d2c565017184b` |
| Issue 04 Ada test | `6257516aebc79e2d6d40d5bb4adb6cacadbc968a6c5fa20690acc929046aab3e` |
| canonical public inventory | `c36837b59266b6debfebc38ed62e86f11dac58ba592ef1d40974c5bdd4391221` |
| active-asset registry | `4070e24fa79e18ed6f809596c7d00c7a10e7b56efbd9813e1a7c048fdd6ee143` |
| runtime family manifest | `0eec69f1053eb74c924eed55e10af996bce307420140dd2878eb04a65f7574a7` |

The tuple verifier binds repository `HEAD` `f8623631b7908c955078ef36b543b2fb470d9a59` only as the source of the exact former cast `<img>…<b>NAME</b>` fragments. Each asset/name pair occurs exactly once in its issue cast. Starting from each bound current file, it restores only those fragments to construct the immediate predecessor, then reapplies the replacements and requires exact current-file equality.

The reconstructed predecessor hashes are:

| Route | Reconstructed predecessor | Current | Substitutions |
| --- | --- | --- | ---: |
| Issue 01 | `036f84226f3aeab51a26a50d46cc8f98f970fa673f00bbfe81f907c399470eb0` | `c1029cf02c82a3c709267cafa42a43df21ab24bb397f6fb761123c0fc8c3b05c` | 3 |
| Issue 02 | `5c07adfbfbeedd8c5f5e53a31754e84bc2f66eb2d9bf2698e78050d30a8880d7` | `5dac57301a477175dfa8c03c795748e97b7ce1009c53cfa9fe9b5a6eb4f0ec9e` | 3 |
| Issue 03 | `52faffe19ee7692dc793c0b6d5f0c42d8c77cde963a35563dce02f99c294e751` | `e81df09bb3dad88596cf2c3c6a3af24cfe7f2842449f30e49fc19f0311644b6a` | 3 |
| Issue 04 | `dc840a71035294b63f2c93cf6489e3e9b05abbb82b1d148e93aead24e8a649f5` | `7a72db0cfa9c184b2da2a36267fa45ccf5d19f6fa7cabc2d780ba7ea532c3d74` | 1 |

For every substitution, the verifier compares each preceding byte chunk in order and the final trailing chunk. Therefore navigation, hero/read, scene and other unrelated issue-page bytes are demonstrably identical on both sides of this bounded transaction rather than being silently included as changes. The proof establishes an exact synthetic predecessor, not a claim about when those carried-forward unrelated bytes historically entered the worktree.

## Independent calibration and verification

- `verify-episode-cast-source-narrowing-tuple.mjs` — PASS. Ten substitutions only; current hashes match; all other byte chunks are identical.
- Tuple calibration — PASS. Adding an unrelated attribute to the Issue 01 `<title>` makes the bounded comparison fail with `bytes before each intended replacement differ`.
- The ten removed cast assets are Cher x2, David x1, Dolly x1, Elle x2, Miranda x1, Regina x2 and Ada x1. Current target counts are `[0,0,0,0]`; held-state counts are `[3,3,3,1]`.
- Existing visible names, teaching roles and `/luminairy.html` destinations remain outside the replaced fragments and are byte-identical. Each current replacement is the labelled `Portrait held` treatment with `aria-hidden="true"`, leaving name and role in the link's accessible label.
- `test-issue-cast-mobile-layout.mjs` — PASS in real headless Chrome on Issues 01–04 at 1440, 390 and 320px. Every cast card is fully inside the viewport and document horizontal overflow is absent.
- Mobile calibration — PASS. Injecting the former higher-specificity mobile flex strip reproduces clipped cards on all four routes at 390px and is rejected.
- `test-issue-04-inline-ada-card.mjs` — PASS at 1440, 390 and 320px; Ada remains semantic/held, with no Ada image request and no overflow.
- Screening Room contract — PASS with the existing title/media HOLDS explicitly retained.
- Active-asset admission — PASS.
- Source-narrowing partial and builder/inventory parity gates — PASS: exact prohibited set, missing=0, fail-closed=true.
- `git diff --check` over the bound sources, CSS, validators and tuple evidence — PASS.

## Scope limits

This PASS accepts only the ten cast image-to-held substitutions and the responsive shared-CSS successor. It does not approve unrelated issue-page changes, the visual quality of remaining episode imagery, Screening Room titles/media, public-asset closure, deployment, release, publication, or public-origin delivery.

Current public-asset state remains held: 581 reachable binaries, ACTIVE=21, UNREGISTERED_DEFAULT_DENY=560, 21 prohibited source references, missing=0. The source-narrowing gate is a partial/fail-closed PASS, not whole-site release evidence.

No issue source, CSS, validator, asset, registry, manifest, shared status, deployment, publication or release file was changed by this judge. This receipt is the only write.
