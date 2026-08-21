# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** EPISODE-REJECTED-MEDIA-QUARANTINE-20260820
- **Status:** VERIFIED LOCALLY
- **Owner:** Codex foreground; Ali owns acceptance and all product decisions
- **Updated:** 2026-08-20 America/Vancouver
- **Goal:** Extend rejected-media containment across every episode and the trailer, including ignored/untracked debris in the preservation-sensitive source checkout.
- **Acceptance:** Exact current rejection authority; no accepted asset moved; every explicit rejected/superseded production byte inventoried and recoverably quarantined; stale builders/selectors isolated; all-episode reintroduction guard calibrated; source checkout migration hash-bound; exact scoped commit.
- **Current step:** The branch quarantines 21 additional media files and 26 stale selector/builder files. The source checkout moved 95 rejected/superseded media files and 74 stale sources (2,213,091,336 bytes) into a verified non-iCloud quarantine; three retired trailer inputs can no longer be rebuilt by their old scripts.
- **Next action:** Use the specialist's all-episode preflight on the next named repair. Current review candidates and Episode 05 rejection guards remain in place; independent quality, release and public gates remain separate.

## Boundaries

- Source iCloud checkout remains unchanged with 229 modified and 3,196 untracked
  paths observed at reset start.
- Recovery lane: `/Users/alisoneakin/Projects/laidies-context-reset-20260818`
- Starting commit: `cee1127f622a07ab17e5aeab7c48ca381bfad3e7`
- Branch: `codex/context-reset-20260818`
- No reset, clean, deletion of source work, deployment, publication, provider
  mutation, or spend is authorized.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.
