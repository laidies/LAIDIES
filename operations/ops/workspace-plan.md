# Workspace — pending build spec (the repoint + gaps)

The Workspace (`operations/ops/workspace.py`) works today: 3-state sort (correct/redo/unused),
select-many, ideas drop, live status. These are the CONFIRMED next changes, from Ali:

## 1. Repoint the gallery to the LIVE image set (root fix)
- **Problem:** gallery sources from `approved-assets/` = a stale snapshot the site references 0×.
  Live site uses `assets/` (76 pages). Snapshot is incomplete + stale + hid real art (mavens 25 live,
  saints 28, episodes 81, etc.). Verified: **375 live-referenced images.**
- **Do:** source from images actually referenced by live html/css/js (scan pattern
  `(?:approved-)?assets/…\.(png|jpg|jpeg|webp|gif)`, keep those on disk). Group by folder segment
  after `assets/`. Clean category LABELS; lump unknowns as "Other".
- **Marks must be permanent:** key `curation.json` by **basename** (not path), so a mark survives
  format/folder/name changes. Migrate existing marks: 9 of Ali's first 16 carry over by basename;
  the 7 snapshot-only ones drop (not live anyway). NEVER make her re-sort.

## 2. Fourth bucket — "To make" (missing images) — Ali: "I don't want to go hunting"
- A capture box in each set (+ global) → type the missing thing (e.g. "post office lobby") →
  saved to a **to-make list** (new file, e.g. `operations/ops/to-make.json` or a section).
- **The tool hunts, not her:** when she names one, search ALL of `assets/` by keyword and surface
  any match (it's often mis-filed, not missing). Only if truly absent does it stay on the make-list.
- **Auto-gap detection:** compare a canon list of town things (the ~17 buildings from
  sunnyvaile-directory / site-index.json + named characters) against existing images; list the ones
  with NO image so holes surface themselves. She should never have to notice a gap manually.

## The four buckets = the production board
Correct (done) · Needs updating (redo worklist) · Not in use (dead) · To make (generate → feeds Codex).

## Guardrails
- Don't run destructive tests against the live `curation.json` (it holds Ali's real verdicts).
- Only 'correct' images are reference-worthy for Codex/episodes going forward.
- See memory [[approved-assets-library]] (snapshot≠live), [[chat-is-the-one-place]].
