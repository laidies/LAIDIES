# ⚠ READ THIS BEFORE USING ANYTHING IN THIS FOLDER

**The folder name `pixel/` is wrong. It is a leftover. This folder holds CURRENT,
APPROVED COMIC-generation art.**

Do not skip these assets because the path says `pixel`. Do not "restore" them to a
pixel look. Do not treat them as old-generation art that must not be wired.

Written 2026-07-22. Facts below were verified against the folder on that date.

---

## Why the name is wrong

The pixel-art direction for episodes was **reversed on 2026-07-16** and superseded by
the COMIC / POP-ART direction. The art in here was produced under the comic direction.
Only the directory name was never updated.

## What is actually in here

618 entries, no subdirectories:

| type | count |
|---|---|
| `.png` | 386 |
| `.mp4` | 197 |
| `.jpg` | 49 |
| `.json` | 2 |
| `.html` | 2 |
| `.md` | 1 (+ this README) |

- **212 filenames contain `comic`.**
- **Exactly one filename contains `pixel`:** `ep04-scene-02b-luminairy-nave-pixel-v1.png`.
- The remaining files are comic-direction production material — heroine face/hair lock
  sheets, wardrobe and turnaround sheets, transformation frames, contact sheets, QC
  manifests, timing JSON.

## This folder is WIRED AND LIVE

`content/episodes/episode-04-cues.json` contains 57 `src` paths. **56 of them point
into this folder** (the 57th points at `ep-04/clips/`). All 57 resolved to real files
as of 2026-07-22.

Moving, renaming, or deleting anything in here breaks the Episode 04 cut.

## ⚠ `ep04-shot-direction.md` in this folder is STALE on style

That file instructs the reader to keep the videogame-pixel-art look of the keyframes.
**That style instruction is superseded** by the comic / pop-art direction. Its
per-scene shot and motion notes may still be useful; its styling direction is not.

## Being comic is NOT enough to make a frame usable

Several comic passes in here were superseded and are ruled OUT of the cut. This README
deliberately does not list them — that list lives in one place and would go stale here.

➡ **Read `operations/ep04-cut-decisions.md` before selecting any frame.**
Those are Ali's decisions. Do not re-open them; if one looks wrong, ask her.

## How the other episodes are organised

`ep-02/`, `ep-03/` and `ep-05/` separate their art correctly:

- `ep-02/` — `pixel/` (19 files, genuinely pixel) **and** `comic/` (64 files)
- `ep-03/` — `pixel/` (18 files, genuinely pixel) **and** `comic/` (88 files)
- `ep-05/` — `comic/` only
- `ep-01/` — `pixel/` only (26 files, 2 of them comic-named)

**Only `ep-04/` is misnamed.** `ep-02/pixel/` and `ep-03/pixel/` are correct — they
really do hold pixel art, with comic art kept separately alongside. Do not "fix" those.

## The rename is a known, deliberate DEFERRAL

Renaming this folder to `comic/` is the real fix, and it is understood and intended —
just not yet. It was deferred on 2026-07-22 because:

- ~2,070 occurrences of `ep-04/pixel` exist across ~85 files (cue sheet, `issue-04.html`,
  ~40 codex-prompt files, derived shot lists).
- The Episode 04 cut was still in flight.
- The repo had ~1,059 uncommitted changes, so the rename would not have been cleanly
  revertible.

Do it when Ep4 is finished and the tree is committed. Until then this README is the
guardrail. **Ali decides when.**
