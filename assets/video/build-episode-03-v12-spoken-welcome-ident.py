#!/usr/bin/env python3
"""Build the Episode 03 ident successor at the canonical spoken welcome."""

from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets/video/episode-03-full-v10-source-reconciled-review.mp4"
IDENT = ROOT / "operations/design-explorations/laidies-motion-ident-20260725/continuous-i-episode-03-the-burn-book-problem-v1.mp4"
TEMP = ROOT / "assets/video/.episode-03-full-v12-spoken-welcome-ident.building.mp4"
OUTPUT = ROOT / "assets/video/episode-03-full-v12-spoken-welcome-ident-review.mp4"
MANIFEST = ROOT / "operations/video-qa/episode-03-full-v12-spoken-welcome-ident-manifest.json"
QC = ROOT / "operations/video-qa/episode-03-full-v12-spoken-welcome-ident-qc.json"
START = 116.180
END = 123.820
WINDOW = END - START
IDENT_DURATION = 6.48
HOLD = WINDOW - IDENT_DURATION
SOURCE_SHA = "c5dcee69c40e50d834dcc8f471eae9d621f531b37653de9eaef7bf5e362fd239"
IDENT_SHA = "748faf81d9a4c3950946a455c35b7df06a44fb267505c6839ccff0d80d66de52"


def sha(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


if sha(SOURCE) != SOURCE_SHA or sha(IDENT) != IDENT_SHA:
    raise SystemExit("Frozen source or ident checksum mismatch")

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
graph = (
    f"[0:v]trim=0:{START},setpts=PTS-STARTPTS[pre];"
    f"[1:v]scale=1920:1080:flags=lanczos,fps=30,"
    f"tpad=stop_mode=clone:stop_duration={HOLD:.3f},"
    f"trim=duration={WINDOW:.3f},setpts=PTS-STARTPTS[ident];"
    f"[0:v]trim=start={END},setpts=PTS-STARTPTS[post];"
    "[pre][ident][post]concat=n=3:v=1:a=0,format=yuv420p[v]"
)
TEMP.unlink(missing_ok=True)
subprocess.run(
    [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "warning",
        "-i", str(SOURCE), "-i", str(IDENT),
        "-filter_complex", graph, "-map", "[v]", "-map", "0:a:0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
        "-pix_fmt", "yuv420p", "-r", "30", "-video_track_timescale", "15360",
        "-c:a", "copy", "-movflags", "+faststart", str(TEMP),
    ],
    cwd=ROOT,
    check=True,
)
subprocess.run(
    [ffmpeg, "-v", "error", "-i", str(TEMP), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"],
    cwd=ROOT,
    check=True,
)
TEMP.replace(OUTPUT)
output_sha = sha(OUTPUT)
stamp = datetime.now(timezone.utc).isoformat()
manifest = {
    "schema_version": 1,
    "created_at": stamp,
    "status": "BUILT_LOCALLY_NOT_ADMITTED",
    "title": "Episode 03 — The Burn Book Problem",
    "source": str(SOURCE.relative_to(ROOT)),
    "source_sha256": SOURCE_SHA,
    "ident": str(IDENT.relative_to(ROOT)),
    "ident_sha256": IDENT_SHA,
    "output": str(OUTPUT.relative_to(ROOT)),
    "output_sha256": output_sha,
    "canonical_spoken_welcome_interval_seconds": [START, END],
    "ident_motion_seconds": IDENT_DURATION,
    "terminal_frame_hold_seconds": round(HOLD, 3),
    "audio": "Original source AAC stream copied without re-encoding or retiming.",
    "supersedes_held_candidate": "episode-03-full-v11-title-ident-inserted-review.mp4",
    "acceptance_owner": "Independent Episode Media Quality",
    "release_authority": False,
}
MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
qc = {
    "created_at": stamp,
    "status": "TECHNICAL_QC_PASS_ONLY",
    "maker_may_judge": False,
    "full_decode": "PASS",
    "output_sha256": output_sha,
    "output_size_bytes": OUTPUT.stat().st_size,
    "independent_review": "PENDING",
}
QC.write_text(json.dumps(qc, indent=2) + "\n")
print(f"EP03 V12 BUILT {OUTPUT} SHA256={output_sha}")
