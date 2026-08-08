# GitHub Pages automatic-deployment incident — 2026-08-08

Status: **HOLD — EXTERNAL CONFIGURATION APPROVAL REQUIRED**
Owner: Control Room / release integration
Evidence time: 2026-08-08 13:35 PDT

## What happened

Protected PR #26 merged the internal operating-model foundation to `main` as
`13fafe62b5446a37d60a7fb7620a2fedc09f5603`. GitHub then automatically started
Pages run `31276827817` because the repository was configured as legacy Pages
source `main:/` for custom domain `laidies.ai`.

That configuration makes every merge to `main` a production deployment and
publishes from the repository root. It defeats the separation between internal
integration and an authorized, curated public release.

## Containment and public truth

- Run `31276827817` was cancelled through the GitHub API and finished with
  conclusion `cancelled`.
- The separate hosted operating-baseline run `31276828217` passed on the merged
  commit.
- After cancellation, `https://laidies.ai/` returned HTTP 200 while
  `/operations/ACTIVE-WORK.md` and `/operations/COMMIT-QUEUE.md` returned HTTP
  404. No operational document is claimed public.
- Existing live visitor bytes were not approved, replaced or otherwise judged
  by this incident response.

## Prevention prepared

`scripts/check-github-pages-release-boundary.mjs` and its calibrated test reject
any Pages configuration whose `build_type` is not `workflow`. The required
`work-truth` job now reads the live repository Pages configuration and fails
closed while automatic legacy deployment remains active.

The next external action is to change GitHub Pages from legacy `main:/` to
workflow-controlled releases. That provider/publication configuration mutation
requires Ali's explicit approval. After it is changed, a separate release
package must create the curated artifact and require exact approval, deployment
identity and live-byte verification. Do not restore automatic root publication.

## Authority truth

The in-progress automatic deployment was cancelled to prevent unintended
publication. No replacement deploy, public release, spend, provider purchase or
Ali approval was performed or inferred.
