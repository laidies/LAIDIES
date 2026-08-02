# LAiDIES operating-model diagnostic

Evidence date: 2026-08-02

Status: **MATERIAL FAILURES FOUND — CORRECTION IN PROGRESS**

## What is working

- The workspace has a real 67-product registry, 17 building/function groups,
  30 guild roles, explicit champion contracts and a fixed truth vocabulary.
- Media receipts bind exact files and checksums. Ali's Trailer review proved
  that human evidence can identify identity, wardrobe, canon, caption,
  animation and ending defects precisely.
- The repaired owner-queue rule removes all five objectively unresolved
  opening films from Ali's inbox. Its negative test proves that re-inserting
  one is rejected.
- `scripts/check-product-stewards.mjs` passes ordinary consistency checks and
  reports owner-entry gaps rather than hiding them.

## What failed

1. **The runtime was largely documentary.** `run-queue.json` and the building
   execution board described 2026-07-26 tasks as live on 2026-08-02. No
   repository reconciler proved their tasks were still running.
2. **Champion readiness is incomplete.** Only 30 of 67 product entries meet the
   owner-entry requirements. The check reports 12 missing visual inventories,
   25 missing dossiers and five missing state records.
3. **Role execution was not provable portfolio-wide.** Maker, judge, champion
   and release-owner separation is specified, but most products lack one
   machine-readable role-and-artifact receipt. Media is the useful exception.
4. **The Control Room was too narrow.** It showed a manually assembled media
   queue, not the complete portfolio, and allowed objective failures to be
   described as ready for Ali.
5. **Asset authority was unsafe.** Current, historical, rejected and retired
   files were searchable together; even `approved-assets` contains documented
   retired logos. Filenames and increasing version numbers became false
   authority.
6. **The repository is beyond a healthy working size.** The shared Git object
   store is approximately 9.8 GB and the worktree contains thousands of
   untracked generated files. This increases noise, latency, substitution and
   integration risk.
7. **Evaluation happened too late.** Full films were assembled before early
   identity, motion and narration-picture pilots passed. Human review became
   debugging rather than final judgment.

## Current official guidance incorporated

- OpenAI recommends concise, practical `AGENTS.md` guidance, with reusable
  procedures in skills and project-specific instructions close to the work.
  ([Codex best practices](https://learn.chatgpt.com/guides/best-practices.md),
  [AGENTS.md guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md))
- OpenAI recommends subagents for bounded independent work and warns that
  parallel write-heavy work adds conflict and coordination cost. Custom agent
  profiles belong under `.codex/agents/` with explicit scopes and handbacks.
  ([Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents.md))
- OpenAI says to evaluate early and often, use scoped production-like fixtures,
  calibrate automated graders to human judgment and evaluate multi-agent
  handoffs—not only final output. Multi-agent complexity should be justified
  by evaluations. ([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))
- Codex hooks are appropriate for deterministic lifecycle enforcement, but
  Stop hooks can create continuation loops. They must not judge subjective
  completeness. ([Codex hooks manual](https://developers.openai.com/codex/codex-manual.md#hooks))
- GitHub recommends keeping on-disk Git data at or below about 10 GB, using Git
  LFS for necessary large binaries and storing generated files outside Git.
  ([Repository limits](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits),
  [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage))

## Corrections required

1. Generate one portfolio work index and owner inbox from canonical state; do
   not maintain competing handwritten dashboards.
2. Require a dispatch receipt with actual task identity, heartbeat, write
   scope, product owner and acceptance owner. Automatically expire unverified
   `RUNNING` records.
3. Require owner-entry readiness before dispatch. Missing dossiers, state and
   visual inventories are build requirements, not status `UNKNOWN`.
4. Preserve the full 67-product champion and guild responsibility graph, while
   using a small set of reusable execution modes: accountable owner, bounded
   maker, read-only evidence support, independent judge and release verifier.
5. Add portable defect fixtures under `operations/evals/` from real failures:
   retired wordmark, wrong heroine/outfit, false map, irrelevant characters,
   caption placement/casing, static slideshow, light-box overlay and missing
   animation. Each needs deterministic checks plus a calibrated human rubric
   where perception is genuinely required.
6. Keep hooks deterministic and bounded. Subjective completeness remains in
   artifact review contracts.
7. Keep code, text, compact evidence and release manifests in Git. Evaluate
   Git LFS for collaboratively versioned masters and object storage for
   generated video/image sequences. Do not rewrite history without a verified
   backup and migration plan.
8. Enforce pilot-before-batch and a two-cycle stop-loss. A failed pilot fixes
   the brief, inputs or tool chain before another expensive full build.

## Success test

The operating model is functioning only when a newly captured task can be
traced through owner, admitted inputs, maker artifact, independent verdict,
integration, Ali decision if genuinely needed, release identity and public
verification—and when the Control Room shows that truth without a person
manually reconciling several ledgers.
