# LAiDIES release state

**Updated:** 2026-07-27 21:38 PDT
**Release owner:** current whole-site release and product-champion orchestrator
**Rule:** `LOCAL`, `COMMITTED`, `PUSHED`, `DEPLOYED`, and `PUBLICLY VERIFIED`
are different states. A change may use only the highest state for which evidence
is recorded here.

## Current truth

### Resident communications release — 2026-07-27

Resident Communications v1 is `DEPLOYED / PUBLICLY VERIFIED`.

| Field | Exact evidence |
|---|---|
| Source branch | `resident-communications-20260727` |
| Source commit | `cd936df76543323e3e56e4b5d9469e6d1f61d9c6` |
| Public artifact | `/tmp/laidies-resident-communications.THEPtY`; 1,093 files; 959.62 MiB |
| Cloudflare deployment | `9bd1513e-cb01-4a46-89e9-fda49b375503` |
| Immutable origin | `https://9bd1513e.laidies-sunnyvaile.pages.dev` |
| Rollback target | `60c3b069-39d2-4174-bc8f-3e99760374b3` |
| Backend | Supabase migrations `20260727213000` and `20260727214500` applied; combined duplicate-gift/direct/group/read/report transaction PASS and rolled back |
| Public verification | Seven changed files byte-identical between artifact, immutable origin and `https://laidies.ai`; public Resident Chat, Trading Cards and Post Office signed-out journeys PASS |
| Exact scope | authoritative existing binder/pack integration, duplicate-only gifting, private direct/group resident chat, unread navigation |
| Explicit exclusion | card art catalogue expansion: live catalogue remains 20 concept cards and one character card |

| Layer | State | Evidence |
|---|---|---|
| Production site | `DEPLOYED / PUBLICLY VERIFIED` | Cloudflare Pages production deployment `623e2b79-7fec-47ac-8ec9-e3fe80239ba1`, release-source commit `9ee00987fec4ee3cb3d53e4017c82bd0191a4321`, immutable URL `https://623e2b79.laidies-sunnyvaile.pages.dev`; the immutable URL and `https://laidies.ai/` returned the exact tested artifact bytes on all seven critical files on 2026-07-26. |
| Current branch candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | `homepage-redesign` and `origin/homepage-redesign` contain deployed source `9ee00987fec4ee3cb3d53e4017c82bd0191a4321`, comprising KSVL/Fun Pack correction `2491710724dc41cd4c14c9702fc815b1c17998fc`, FAiRY repair `8c4422315708f5b66726987eb6da82913af08706`, Screening Room timing/resume repair `bd4cfb23399072ec6797662e9804e7b0180a5efd`, and fail-closed Screening Room visual admission `9ee00987fec4ee3cb3d53e4017c82bd0191a4321`. |
| Difference from production | `NONE FOR DEPLOYED CANDIDATE` | Production is attached to release-source commit `9ee0098`. Unrelated dirty studio, editorial, media and operations work remains local and is not part of the public artifact. |
| Current working tree | `LOCAL / MIXED / NOT DEPLOYED` | Unrelated studio, editorial, media, design and operations work remains intentionally dirty and excluded from the bounded candidate commits. Use `git status` for the current count; do not infer deployment from the working tree. |
| 2026-07-26 announcement candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | Clean-worktree artifact `/tmp/laidies-clean-artifact-20260726b.uK3zYP`: 1,085 files, 959.56 MiB, 0 missing, 0 oversized; inline JS 349/132, local links 1,915/110, KSVL 29/29, FAiRY page contract, and Screening Room source/artifact browser matrices pass. Exact critical-file hashes match the immutable deployment and custom domain. The internal 750 MiB advisory remains a performance warning, not a Cloudflare file-count or per-file limit failure. |
| EOD release candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | Release-source commit `0c6db9d2d45f865abfac7b1f5fe2ee7655827565`; curated artifact `/tmp/laidies-eod-final.NeFVs6`; 1,069 files; 1,005,029,435 bytes; identity SHA-256 `6276ae94c0c04074769be127f7b21f1f0f4032a4cfb066909cd4f0d14f02d7d5`. |
| Trailer and Episodes 1–4 motion films | `HOLD` | Media steward verdict: Trailer HOLD; E01 HOLD; E02 HOLD; E03 HOLD; E04 HOLD. The public Screening Room offers functioning narration and read-along captions with one approved static programme cover; narration-specific visual sequences and motion films are not released. |

## What this means

- Work from the last several days is mixed: some is committed and pushed, one
  production deployment is live, and a large amount is local only.
- The scoped EOD product, integration, accessibility and terminology work in
  release-source commit `0c6db9d` is live and publicly verified; excluded local
  studio work is not deployed, and the Trailer/Episodes 1–4 motion films remain
  on `HOLD`.
- The newer product-champion work is committed, pushed, deployed and publicly
  verified through release-source `9ee0098`.
- The retired Fun Pack is removed from current navigation and orchestration;
  its legacy URL redirects to the individual activities. KSVL has 29 playable
  creator-confirmed originals. FAiRY's live v18 path returned a usable rendered
  response after the default-energy compatibility repair.
- The untracked studio/archive material must not be bulk-added to a release
  commit merely to make `git status` look clean.
- The release artifact, not the entire studio tree, is the deployment unit.

## Current production release record

Fill every field before declaring the relaunch ready:

| Field | Required evidence | Current value |
|---|---|---|
| Source branch | exact branch | `homepage-redesign` |
| Source commit | full SHA | `9ee00987fec4ee3cb3d53e4017c82bd0191a4321` |
| Working-tree disclosure | clean, or explicit dirty-state manifest | the release source is committed; unrelated studio work remains intentionally unstaged and is excluded from the artifact |
| Curated artifact path | exact local path | `/tmp/laidies-clean-artifact-20260726b.uK3zYP` |
| Artifact file count and bytes | builder report | 1,085 files; 959.56 MiB |
| Artifact manifest digest | SHA-256 of sorted per-file SHA-256 manifest | critical release files were verified individually against both public origins; full artifact manifest digest was not separately recorded |
| Automated checks | command + result | clean-worktree links 1,915/110 PASS; inline JS 349/132 PASS; KSVL catalogue 29/29 PASS; FAiRY page contract PASS; Screening Room source and artifact contract/browser matrix PASS |
| Media gate | RELEASE/HOLD per trailer/E01/E02/E03/E04 | Trailer HOLD · E01 HOLD · E02 HOLD · E03 HOLD · E04 HOLD; public cover-only narration plus captions |
| Cloudflare deployment ID | exact deployment UUID | `623e2b79-7fec-47ac-8ec9-e3fe80239ba1` |
| Immutable deployment URL | `*.pages.dev` URL | `https://623e2b79.laidies-sunnyvaile.pages.dev` |
| Custom-domain verification | HTTP/content/journey evidence | `https://laidies.ai`: seven critical routes/dependencies returned 200; seven critical deployed files byte-matched the clean artifact and immutable deployment; rendered KSVL enabled and played `Welcome to SUNNYVAiLE`; rendered Episode 03 loaded its programme cover, narration and caption UI without a missing-visual failure; retired Fun Pack returned 301 to `/#activities` |
| Rollback target | prior deployment ID | `7c8410e1-7a10-4bd7-8ccc-41d00af71bf7` |

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
