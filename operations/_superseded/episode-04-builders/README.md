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
- `assemble-episode-04-v10-successor.py` consumes that contaminated derived
  p46–p49 sequence and can reassemble it into a full-title v10 candidate.
- `validate-episode-04-modern-criticism-review-v1.py` can give a technical PASS
  to the contaminated derived sequence without checking its rejected source.
- `validate-episode-04-v10-successor.py` can give a technical PASS to the
  resulting contaminated full-title candidate without tracing that dependency.

Any successor starts with a newly named, default-deny builder whose exact
inputs pass the current media-source admission boundary and the banned-cut
checker.
