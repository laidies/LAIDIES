# LAiDIES release state

**Updated:** 2026-07-26 23:38 PDT
**Release owner:** current whole-site release and product-champion orchestrator
**Rule:** `LOCAL`, `COMMITTED`, `PUSHED`, `DEPLOYED`, and `PUBLICLY VERIFIED`
are different states. A change may use only the highest state for which evidence
is recorded here.

## Current truth

| Layer | State | Evidence |
|---|---|---|
| Production site | `DEPLOYED / PUBLICLY VERIFIED` | Cloudflare Pages production deployment `60c3b069-39d2-4174-bc8f-3e99760374b3`, release-source commit `d6de6c0e43f1083fa2246d57215cdfcb6d774634`, immutable URL `https://60c3b069.laidies-sunnyvaile.pages.dev`; `https://laidies.ai/watch?ep=04` returned the exact tested Screening Room artifact bytes on 2026-07-26. |
| Current branch candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | `release/episode-04-motion-2026-07-26` and its origin contain release-source `d6de6c0e43f1083fa2246d57215cdfcb6d774634`. The deployment adds only the exact Episode 04 film binding, truthful screening copy, and its contract update over the prior controlled public baseline. |
| Difference from production | `NONE FOR DEPLOYED CANDIDATE` | Production is attached to release-source commit `d6de6c0`. Unrelated dirty studio, editorial, media and operations work remains local and is not part of the public artifact. |
| Current working tree | `LOCAL / MIXED / NOT DEPLOYED` | Unrelated studio, editorial, media, design and operations work remains intentionally dirty and excluded from the bounded candidate commits. Use `git status` for the current count; do not infer deployment from the working tree. |
| 2026-07-26 announcement candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | Clean-worktree artifact `/tmp/laidies-clean-artifact-20260726b.uK3zYP`: 1,085 files, 959.56 MiB, 0 missing, 0 oversized; inline JS 349/132, local links 1,915/110, KSVL 29/29, FAiRY page contract, and Screening Room source/artifact browser matrices pass. Exact critical-file hashes match the immutable deployment and custom domain. The internal 750 MiB advisory remains a performance warning, not a Cloudflare file-count or per-file limit failure. |
| EOD release candidate | `PUSHED / DEPLOYED / PUBLICLY VERIFIED` | Release-source commit `0c6db9d2d45f865abfac7b1f5fe2ee7655827565`; curated artifact `/tmp/laidies-eod-final.NeFVs6`; 1,069 files; 1,005,029,435 bytes; identity SHA-256 `6276ae94c0c04074769be127f7b21f1f0f4032a4cfb066909cd4f0d14f02d7d5`. |
| Trailer and Episodes 1–4 motion films | `E04 DEPLOYED / PUBLICLY VERIFIED · OTHERS HOLD` | Episode 04 exact master SHA-256 `9e8eea3b019eea64cbd8eed9ac30ce1c9441428b0acd000c06ca11ea658b3d70` is public at `https://films.laidies.ai/episodes/episode-04-full-v8-welcome-founding-mothers-ident-v3-9e8eea3b019e.mp4`; exact VTT SHA-256 `1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4`. Independent release-integration verdict SHA-256 `94bb26b91b1f88e6a71aef808607af95c5c9e6ee502ed0bef24bdde224c5465f`. Trailer/E01/E02/E03 remain HOLD. |

## What this means

- Work from the last several days is mixed: some is committed and pushed, one
  production deployment is live, and a large amount is local only.
- The scoped EOD product, integration, accessibility and terminology work in
  release-source commit `0c6db9d` is live and publicly verified; excluded local
  studio work is not deployed. Episode 04's exact accepted motion master is now
  public; the Trailer and Episodes 01–03 remain on `HOLD`.
- The newer product-champion work is committed, pushed, deployed and publicly
  verified through release-source `d6de6c0`.
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
| Source branch | exact branch | `release/episode-04-motion-2026-07-26` |
| Source commit | full SHA | `d6de6c0e43f1083fa2246d57215cdfcb6d774634` |
| Working-tree disclosure | clean, or explicit dirty-state manifest | the release source is committed; unrelated studio work remains intentionally unstaged and is excluded from the artifact |
| Curated artifact path | exact local path | `/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/laidies-public-site` |
| Artifact file count and bytes | builder report | 1,085 files; 959.57 MiB |
| Artifact manifest digest | SHA-256 of sorted per-file SHA-256 manifest | critical release files were verified individually against both public origins; full artifact manifest digest was not separately recorded |
| Automated checks | command + result | Screening Room contract PASS with `motion_films=1`; product-steward system PASS; exact R2 first/last 1 MiB range parity PASS; immutable preview browser loaded the exact 20:22.4 film and VTT with no overflow; production watch/VTT/Homepage byte parity PASS |
| Media gate | RELEASE/HOLD per trailer/E01/E02/E03/E04 | Trailer HOLD · E01 HOLD · E02 HOLD · E03 HOLD · E04 RELEASE/PUBLICLY VERIFIED |
| Cloudflare deployment ID | exact deployment UUID | `60c3b069-39d2-4174-bc8f-3e99760374b3` |
| Immutable deployment URL | `*.pages.dev` URL | `https://60c3b069.laidies-sunnyvaile.pages.dev` |
| Custom-domain verification | HTTP/content/journey evidence | `https://laidies.ai/watch?ep=04` returned the exact built `watch.html` SHA-256 `60c65ee15cd9264b24d6d0b8d37c4e41e271c4fceb407071e893205dc503982e`; public VTT matched source SHA-256 `1bc6b59e…f19d4`; `films.laidies.ai` returned byte-identical beginning/end ranges with `206`, `Accept-Ranges`, immutable caching and total length `284902235`; Homepage bytes remained exact to the tested artifact |
| Rollback target | prior deployment ID | `4f52df88-f875-4b24-89cd-d7649ee1df1a` |

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
