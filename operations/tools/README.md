# operations/tools

Built 2026-07-22. These exist because the same mistakes kept recurring and were
being caught by Ali rather than by a check.

| Tool | What it does |
|---|---|
| `transcribe.py` | narration audio → word-level timings (faster-whisper, CPU) |
| `align.py` | aligns the TRUE script to those timings → `.vtt` + `.srt` + timing map. Whisper supplies only the clock; caption text comes from the script |
| `check-cues.py` | every cue with its real hold length + the line spoken at that second |
| `beat-brief.py` | splits over-long holds into beats, each with the words spoken over it |
| `build-art-batch.py` | **the art batch generator.** Reads cue sheet + timing map + `episode-0N.canon.md`. Emits continuity anchors (nearest frame in the SAME scene), likeness from her already-approved frames, the episode outfit, and existing-asset candidates from EVERY episode folder |
| `qc-frames.py` | machine QC — dimensions, duplicates, near-identical neighbours, retired palette, saturation, exposure. Then the checklist that needs eyes |
| `preview-server.js` | static server **with HTTP Range**, so video can be scrubbed. Python's `http.server` cannot |
| `shot.js` | Playwright screenshot helper |

Rules these encode: `operations/art-requirements.md` is the single source for
art rules — never retype them into a prompt.

⚠ A working copy also lives at `LAIDIES/operations/tools/` (outside this repo,
with `node_modules` and the venv). These scripts resolve their root either way.
Consolidate when convenient.
