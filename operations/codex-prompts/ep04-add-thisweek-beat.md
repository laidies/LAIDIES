# EP4 — add the THIS WEEK teaser beat (surgical, on the v6 assembly)

*2026-07-22. The opening holds the "previously" recap through the "on this episode" narration.
The THIS WEEK teaser frame exists and was never placed. Add it. Do NOT rebuild — one insert.*

## THE ONE CHANGE (in CapCut project 0722)
- **0:00–0:19.0** — keep the previously-recap (`ep04-open-01-previously-strip-comic-v6-regina-outfit-1920.png`). Trim it to END at 19.0s.
- **0:19.0–0:37.1** — INSERT the teaser: `assets/episodes/ep-04/pixel/ep04-open-02-thisweek-teaser-comic-v3-grace-fix-1920.png`.
  It lands when the announcer says *"And on this episode… she goes looking for the origin story — and finds out it was women all along."* Hold it (optional: a slow glow on the gold circuit lines). 0.4–0.7s crossfade in.
- **0:37.1** — the title card resolves, exactly as now. Unchanged.
- Change nothing else in the timeline. Re-export to `assets/video/episode-04-full-v7.mp4` (clean, no captions). Run `operations/tools/check-hard-cuts.py`.

## QC
1. At ~0:25 the screen shows the THIS WEEK teaser (Ada/ENIAC/Grace/Fei-Fei montage), NOT the recap desk panels.
2. Title still lands at 0:37. Runtime 20:22.40. No burned captions.
