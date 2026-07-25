# LAiDIES release state

**Updated:** 2026-07-25 13:32 PDT
**Release owner:** current EOD whole-site release task
**Rule:** `LOCAL`, `COMMITTED`, `PUSHED`, `DEPLOYED`, and `PUBLICLY VERIFIED`
are different states. A change may use only the highest state for which evidence
is recorded here.

## Current truth

| Layer | State | Evidence |
|---|---|---|
| Production site | `DEPLOYED / PUBLICLY VERIFIED` | Cloudflare Pages production deployment `7c8410e1-7a10-4bd7-8ccc-41d00af71bf7`, release-source commit `0c6db9d2d45f865abfac7b1f5fe2ee7655827565`, immutable URL `https://7c8410e1.laidies-sunnyvaile.pages.dev`; the immutable URL and `https://laidies.ai/` returned the tested homepage bytes and passed critical-route verification on 2026-07-25 |
| Current branch | `PUSHED` | `homepage-redesign` at metadata commit `02acc8774d3bf5bb4dcae6478fe6209b76f7f7fb`; `origin/homepage-redesign` is identical |
| Difference from production | `DOCUMENTATION ONLY` | Production is attached to the exact public-source commit `0c6db9d`; `02acc87` changes only this release-state documentation. |
| Current working tree | `LOCAL / NOT COMMITTED / NOT PUSHED / NOT DEPLOYED` | 97 tracked files modified, 0 staged entries, 6,477 untracked files, approximately 770 MiB of untracked content at the reconciliation point |
| EOD release candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | Release-source commit `0c6db9d2d45f865abfac7b1f5fe2ee7655827565`; curated artifact `/tmp/laidies-eod-final.NeFVs6`; 1,069 files; 1,005,029,435 bytes; identity SHA-256 `6276ae94c0c04074769be127f7b21f1f0f4032a4cfb066909cd4f0d14f02d7d5`. |
| Trailer and Episodes 1–4 motion films | `HOLD` | Media steward verdict: Trailer HOLD; E01 HOLD; E02 HOLD; E03 HOLD; E04 HOLD. Public CTAs and Screening Room remain illustrated listen-alongs. |

## What this means

- Work from the last several days is mixed: some is committed and pushed, one
  production deployment is live, and a large amount is local only.
- None of the current EOD product, integration, accessibility, terminology, or
  media work should be described as live yet.
- The untracked studio/archive material must not be bulk-added to a release
  commit merely to make `git status` look clean.
- The release artifact, not the entire studio tree, is the deployment unit.

## EOD release record

Fill every field before declaring the relaunch ready:

| Field | Required evidence | Current value |
|---|---|---|
| Source branch | exact branch | `homepage-redesign` |
| Source commit | full SHA | `0c6db9d2d45f865abfac7b1f5fe2ee7655827565` |
| Working-tree disclosure | clean, or explicit dirty-state manifest | the release source is committed; unrelated studio work remains intentionally unstaged and is excluded from the artifact |
| Curated artifact path | exact local path | `/tmp/laidies-eod-final.NeFVs6` |
| Artifact file count and bytes | builder report | 1,069 files; 1,005,029,435 bytes |
| Artifact manifest digest | SHA-256 of sorted per-file SHA-256 manifest | `6276ae94c0c04074769be127f7b21f1f0f4032a4cfb066909cd4f0d14f02d7d5` |
| Automated checks | command + result | links, inline JS, town/rewards, cues, product claims, accessibility, metadata, KSVL, runtime dependencies and exact-artifact browser smoke PASS; trailer long-hold warnings remain for media review |
| Media gate | RELEASE/HOLD per trailer/E01/E02/E03/E04 | Trailer HOLD · E01 HOLD · E02 HOLD · E03 HOLD · E04 HOLD; listen-along only |
| Cloudflare deployment ID | exact deployment UUID | `7c8410e1-7a10-4bd7-8ccc-41d00af71bf7` |
| Immutable deployment URL | `*.pages.dev` URL | `https://7c8410e1.laidies-sunnyvaile.pages.dev` |
| Custom-domain verification | HTTP/content/journey evidence | `https://laidies.ai`: homepage SHA matches artifact; 12 critical HTTP routes/dependencies returned 200; nine critical browser routes showed no broken images, horizontal overflow, unnamed buttons or console errors |
| Rollback target | prior deployment ID | `edac8d4f-e304-4cef-8deb-b1de9cc32855` |

## Going-forward release protocol

1. One active release owner maintains this ledger. Other tasks may deliver
   bounded files and evidence but do not commit, push, or deploy.
2. Each work item carries a state: `LOCAL`, `COMMITTED`, `PUSHED`, `DEPLOYED`,
   `PUBLICLY VERIFIED`, or `HOLD`.
3. Before a release, build only the curated public artifact and generate a
   sorted hash manifest for every deployed file.
4. Record the exact source commit. If the source tree is intentionally dirty,
   record that fact and use the artifact manifest as the immutable deployment
   identity; never imply reproducibility from the commit alone.
5. Deploy the tested artifact once. Record the deployment UUID and immutable
   URL.
6. Test the immutable URL and custom domain. Only then advance the release to
   `PUBLICLY VERIFIED`.
7. Keep the immediately previous production deployment as the named rollback
   target.
8. After release, reconcile the studio tree into intentional commits by
   product/episode. Do not combine review candidates, superseded renders,
   production assets, and operational documentation in one indiscriminate
   commit.
