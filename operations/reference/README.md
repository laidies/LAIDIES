# LAiDIES current visual references

A small working collection for two jobs: **make new artwork that matches**, or **find the correct approved original to reuse**. It is not an archive of every image.

| I need… | Open |
|---|---|
| Colours and their permitted uses | [Colours](current-colours.md) |
| The right rendering, lettering or composition style | [Art styles](current-art-styles.md) |
| More interesting 90s banners, headers or Card backgrounds | [Background inspiration — Ali’s 11 originals](reusable-backgrounds/90s-background-inspiration/README.md) |
| The correct person | [Current characters](current-characters.md) |
| The correct building, room or place | [Current buildings](current-buildings.md) |

## Before using an image

1. Choose the destination and the job: matching new artwork or reusing exact pixels.
2. Open the relevant selection and its original. Read what the reference governs: identity, rendering, room, composition or one page placement.
3. Use the exact selected file. A newer filename, an old “approved” label, a plausible folder or a current-looking picture does not overrule a later rejection.
4. If the entry has no current approved source, recover the owner’s exact approval; do not substitute an old version. A generation reference does not automatically permit direct reuse or public release.

The pictures remain in their original repository locations. The selected views are derived from the existing [reference manifest](episode-approved/manifest.json), [asset reuse registry](../assets/active-asset-registry.json) and scoped decision sources. The other folders here are the existing category-reference libraries, not an invitation to choose every file as current. Audio, old production scenes and historical variants are not part of the current views.

## For agents maintaining or using this collection

Start with the current [decisions router](../DECISIONS.md), then load only the view and sources relevant to the task. [Preserved later approvals](source-decisions.md) resolve the specific recovered Miss Jeeves, Matron Lumen and editorial-style selections; they do not settle new art decisions.

Run `node scripts/build-current-reference-index.mjs --check` from the repository root before selecting from the views. It checks selected original bytes, known revocations, bound approval sources and whether the views still match their sources. If it fails, reconcile the source first; do not simply bypass it or relabel an old asset.

After an explicit new approval or revocation, update the existing manifest/registry at its owning source and run `node scripts/build-current-reference-index.mjs --write`, then `--check`. Do not edit the derived views or create a second approval list. Public reuse still requires its exact destination/placement and release checks; this collection is not a deployment permission.

The reference package is maintained in the repository, so a fresh checkout can resolve the same files. In a sparse checkout, materialize the exact missing tracked paths from the receiving commit before declaring an approved original lost. Do not use a different worktree’s file merely because it has the same name.
