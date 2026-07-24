# Episode 02 v17 controlled-motion review

Current review master:
`assets/video/episode-02-full-v17-controlled-motion-review.mp4`

- Runtime: 987.48 seconds
- Placements: 61
- Controlled-motion placements: 31
- Controlled-motion runtime: 488.73 seconds / 49.49%
- Motion treatment: restrained 1.6% centred push
- Scene transitions: 0.35-second alpha blends
- Full decode: passed
- Motion measurement: 8 of 8 sampled motion placements passed
- Visual keyframe sheet: passed
- Visual transition-contact sheet: passed

The legacy `check-hard-cuts.py` tool is intentionally scoped to a single
event clip. A full multi-shot episode contains authored scene transitions, so
running that validator against the master reports those intentional edits as
"cuts." Its result at 20.17 seconds is therefore inapplicable, not an Episode
02 failure. The master was instead verified by full decode, measured motion,
and direct transition-frame inspection.
