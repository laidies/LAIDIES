# Homepage recovery reconciliation — 2026-07-27

**Status:** `RECONCILED — PROTECTED PUBLIC BASELINE KEPT; CYCLE 7 LOCK
CONTINUES DENIED`

This is a read-only recovery judgment. It does not edit Homepage, Brand,
reference, style, route, build, deployment or public bytes.

## Known-good Homepage baseline — KEEP

- Released commit:
  `1a5ae63f32dae817aee1986349e184a6e6314ee3`
- Source `index.html` at that commit:
  `ed8ae2b0390ac734c03f6960438ee76af6580f537c746e9c8668184a56d4b1f5`
- Public Homepage GET:
  `238dff887de35233994d421b39bee0845a29b5bd09defd95dbe00d877773fb87`
- Production deployment:
  `4f52df88-f875-4b24-89cd-d7649ee1df1a`
- Rollback:
  `623e2b79-7fec-47ac-8ec9-e3fe80239ba1`

The deployed visitor-facing Homepage is the protected incumbent. It remains
the only accepted Homepage visual/product baseline.

## Current dirty-tree files

| Object | Current SHA-256 | Judgment | Reason |
|---|---|---|---|
| `index.html` | `8231d1290b15a0a867ee063e947f39b3cc22a8c54a4efa741eff60e0c75a1eb3` | `UNVERIFIED — DO NOT USE AS BASELINE OR RELEASE INPUT` | It differs from the released source by an OG-description rewrite, a skip-link/focus change, a shared-header version reference and a Postcard/form handoff rewrite. These are separable changes with separate acceptance histories; the combined dirty source is not the deployed incumbent. |
| `styles.css` | `929503a2ec69cdc970d799cc006590d7aaa48d758548f3b9a9130512c570aef0` | `UNVERIFIED — PRESERVE, DO NOT PROPAGATE` | The delta from released commit SHA `78cb9b5548020357964fc73d690f00b5b7c8d6d4a87b8b1032f4d29c9b56bd3f` is comment-only retirement language for Pearl Plum. It does not change rendering, but it was written after the recovery freeze and is not a release input. |
| `docs/brand/style-creative-direction.md` | `232cd1971961cff761e5edf4360c3c361dd3085ebec1bb3bfa052a86c2bf65d9` | `UNVERIFIED RECOVERY EDIT — PRESERVE AS ALI-DIRECTED EVIDENCE` | Its Pearl Plum rejection, saturated-colour correction and reference-authority wording agree with Ali's explicit rulings. It must not silently become a production style lock until the saved-reference bindings below are sealed and reviewed in a future bounded Brand task. |

Nothing in this table is permission to revert or delete a dirty-tree file.

## Saved reference bindings

The following reference families are `KEEP AS CONTROLLING VISUAL INPUT`, not
released site bytes:

- `operations/reference/comic-cover-collage/`
- `operations/reference/comic-book-page-style/`
- `operations/reference/comic-strip-layout/`
- `operations/reference/comic-text-emphasis/`
- `operations/reference/font-and-text-emphasis/`
- `operations/reference/comic-ident-background/`
- `operations/reference/episode-style-popart/`
- `operations/reference/style-only-refs/`

The current sorted image-path-and-checksum inventory for those folders has
aggregate SHA-256
`d922ff14a3c521589ded2e3bffed52267659728832db6c191f5783585806b2d5`.
Several images and README changes remain untracked/dirty. Therefore the images
may be inspected and named as Ali-supplied visual authority, but a future
candidate must bind the exact subset it uses by individual path and checksum.
README prose cannot substitute for side-by-side visual comparison.

## Rejected work — REJECT

- Homepage Cycles 5 and 6 remain rejected/stale evidence only.
- Rejected building-wave candidates cannot be used as Homepage style evidence.
- Pearl Plum, generic card grids, CSS-substitute artwork, copy/IA rewrites and
  any candidate derived from the current dirty `index.html` are excluded.

## Cycle 7 lock decision

The requested write lock at
`operations/design-explorations/sitewide-style-championship-20260726/cycle-7/incumbent-visual-only/`
remains **DENIED**.

This is no longer an unnamed recovery blocker. The exact unblock is:

1. Control Room assigns Homepage visual work as the foreground objective after
   the current episode/building recovery lane;
2. the maker binds the released commit/source/public tuple above, not the dirty
   `index.html`;
3. the maker names the exact individual saved-reference paths and hashes before
   generating or laying out anything; and
4. the brief freezes all incumbent copy, information architecture, routes,
   functionality and complete imagery, allowing only an isolated visual
   comparison.

Until those four conditions are simultaneously active, Brand is
`BLOCKED / IDLE`, not `ACTIVE`.

