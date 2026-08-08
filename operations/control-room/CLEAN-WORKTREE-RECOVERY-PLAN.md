# Clean worktree recovery plan

Status: **IN PROGRESS — CLEAN INTEGRATION ACTIVE / SOURCE PRESERVED**
Owner: Control Room / repository integration
Updated: 2026-08-08 13:35 PDT

## Measured problem

The current Homepage worktree contains 219 tracked modifications and 9,575
untracked files (9,794 dirty files total) in the inventory generated
2026-08-08T19:31:46Z. `HOLD_UNKNOWN=4,299`; those files cannot move. A further
2,626 paths require exact-package review, 2,810 stay out of Git, 32 are archive
candidates still blocked on exact disposition and non-iCloud drills, and 27 tracked
generated files require explicit disposition.

The active `homepage-redesign` branch is also an integration backlog, not a
normal feature branch: at commit `93a93e27132f4a5fe8b2e584255bfe1cb1a7258c`
it was 309 commits and 5,998 changed files ahead of `origin/main`, with no open
pull request. Commits exist; bounded integration does not. Branch protection
cannot rescue work that accumulates indefinitely outside the default branch.

This is not safe to solve with `git clean`, `reset --hard`, a broad checkout,
or a mass move. Those actions can destroy uncommitted work and do not establish
which assets are current.

## Recovery sequence

1. **Freeze deletion and history rewriting.** No destructive cleanup until
   exact work is classified, backed up and committed.
2. **Commit coherent operational corrections.** Stage only named files for one
   concern at a time; never use `git add .` in the dirty worktree.
3. **Generate the work index.** Normalize current portfolio, review, repair,
   blocked and public truth into `operations/control-room/work-index.json`.
4. **Classify assets by role, not filename.** `operations/assets/active-asset-registry.json`
   is deny-by-default. `UNRESOLVED`, `RETIRED` and `REJECTED` files cannot enter
   production. A checksum-bound `ACTIVE` role is required.
5. **Create a clean integration worktree.** Start from `origin/main`, not the
   309-commit branch tip. Promote exact coherent commit packages onto bounded
   integration branches and PRs. Never open one blind 5,998-file mega-PR.
6. **Move generated bulk out of Git deliberately.** Evaluate object storage or
   Git LFS for necessary large masters and an external working/evidence store
   for generated intermediates. Keep manifests and checksums in Git. Do not
   rewrite history until a verified backup and migration plan exist.
7. **Retire stale worktrees only after read-only confirmation.** Prune only
   missing temporary worktree registrations; never delete a live worktree to
   make the list look clean.
8. **Close by proof.** A clean lane must have zero unexplained changes, pass the
   operational-integrity and product-steward checks, and identify the exact
   commit ready to push or release.

## Recovery threshold met—and clean integration started

Full encrypted snapshot `ff1c716b` passed `check --read-data`, a complete
80,739-file scratch restore, immutable-byte comparison and representative
restored-route checks. Write-stable follow-up snapshot `4a996ba9` then passed
stable source fingerprints, sampled restored-byte comparison and route checks.
The clean non-iCloud worktree `/Users/alisoneakin/LAIDIES-integration` carried
the first bounded operating-baseline package from `origin/main`; PR #26 merged
it as `13fafe62`. The pre-merge branch at `c096ea51` and a fresh post-merge
worktree at `13fafe62` both passed the exact operating suite. The remaining
cleanup hold is exact path disposition; no archive move or deletion is
authorized merely because the operating foundation passed two drills.

## Prevention

- Every build begins from a checksum-bound input manifest.
- Generated masters and evidence use per-product/per-run delivery directories.
- Only an independent objective gate can promote work into Ali's review inbox.
- Two failed repair cycles stop production and trigger root-cause correction.
- The integration owner, not a maker or judge, owns commits and promotion.
