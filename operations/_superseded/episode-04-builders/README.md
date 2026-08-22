# Superseded Episode 04 builders

These scripts are retained as historical build evidence only. They are not
current production inputs and must not be used to create or repair an Episode
04 successor.

They were removed from active builder directories on 2026-08-21 because they
select assets prohibited by the machine-readable `BANNED-IN-CUT` block in
`operations/ep04-cut-decisions.md`:

- `build-episode-04-full-v2-motion.py` can restore the rejected Main-Street
  transformation.
- `build-episode-04-v4-clean-rebuild.py` can restore the wrong Grace office
  generation.
- `build-episode-04-modern-criticism-review-v1.py` selects the rejected
  per-woman Timnit time card; its output was assembled into held v10.

Any successor starts with a newly named, default-deny builder whose exact
inputs pass the current media-source admission boundary and the banned-cut
checker.
