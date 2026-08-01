#!/usr/bin/env python3
"""Build narrow Episode 04 narration-context reviews for held motion repairs.

This does not create or replace an episode master. It places the held rain and
Grace-moth candidates over their exact Episode 04 v9 picture windows while
retaining the corresponding v9 audio. The outputs exist only so normal-speed
review can judge whether the motion is visible, narratively timed, and free of
subject-layer failures before any full-master assembly is attempted.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import cv2


ROOT = Path(__file__).resolve().parents[1]
FFMPEG_CANDIDATE = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FFMPEG = FFMPEG_CANDIDATE if FFMPEG_CANDIDATE.is_file() else Path(
    shutil.which("ffmpeg") or ""
)
MASTER = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
RAIN_04 = ROOT / "assets/episodes/ep-04/pixel/ep04-cue04-local-motion-v2-rain-visible.mp4"
RAIN_05 = ROOT / "assets/episodes/ep-04/pixel/ep04-cue05-local-motion-v3-rain-prominent.mp4"
GRACE = ROOT / "assets/episodes/ep-04/pixel/ep04-scene-05-grace-moth-landing-comic-event-v3.mp4"
QA = ROOT / "operations/video-qa/episode-04-perceptible-rain-and-grace-moth-v3"
RAIN_CONTEXT = QA / "episode-04-rain-context-review.mp4"
GRACE_CONTEXT = QA / "episode-04-grace-moth-context-review.mp4"
MANIFEST = QA / "context-review-manifest.json"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def duration(path: Path) -> float:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"Could not open rendered review clip: {path}")
    fps = capture.get(cv2.CAP_PROP_FPS)
    frames = capture.get(cv2.CAP_PROP_FRAME_COUNT)
    capture.release()
    if fps <= 0 or frames <= 0:
        raise RuntimeError(f"Could not measure rendered review clip: {path}")
    return round(frames / fps, 3)


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def build_rain(output: Path) -> None:
    # Episode seconds 54-86. Cue 04 replaces 58-72 and Cue 05 replaces 72-82.
    filter_graph = (
        "[0:v]trim=start=54:end=86,setpts=PTS-STARTPTS[base];"
        "[1:v]trim=duration=14,setpts=PTS-STARTPTS+4/TB[rain04];"
        "[2:v]trim=duration=10,setpts=PTS-STARTPTS+18/TB[rain05];"
        "[base][rain04]overlay=0:0:enable='between(t,4,18)'[with04];"
        "[with04][rain05]overlay=0:0:enable='between(t,18,28)'[video];"
        "[0:a]atrim=start=54:end=86,asetpts=PTS-STARTPTS[audio]"
    )
    run(
        [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(MASTER),
            "-stream_loop", "-1", "-i", str(RAIN_04),
            "-stream_loop", "-1", "-i", str(RAIN_05),
            "-filter_complex", filter_graph,
            "-map", "[video]", "-map", "[audio]",
            "-c:v", "libx264", "-preset", "medium", "-crf", "17",
            "-pix_fmt", "yuv420p", "-r", "30",
            "-c:a", "aac", "-b:a", "192k",
            "-movflags", "+faststart", "-t", "32",
            str(output),
        ]
    )


def build_grace(output: Path) -> None:
    # Episode seconds 611-631. The repaired story event occupies 615-627.62.
    filter_graph = (
        "[0:v]trim=start=611:end=631,setpts=PTS-STARTPTS[base];"
        "[1:v]trim=duration=12.62,setpts=PTS-STARTPTS+4/TB[moth];"
        "[base][moth]overlay=0:0:enable='between(t,4,16.62)'[video];"
        "[0:a]atrim=start=611:end=631,asetpts=PTS-STARTPTS[audio]"
    )
    run(
        [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(MASTER),
            "-i", str(GRACE),
            "-filter_complex", filter_graph,
            "-map", "[video]", "-map", "[audio]",
            "-c:v", "libx264", "-preset", "medium", "-crf", "17",
            "-pix_fmt", "yuv420p", "-r", "30",
            "-c:a", "aac", "-b:a", "192k",
            "-movflags", "+faststart", "-t", "20",
            str(output),
        ]
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    if not FFMPEG.is_file():
        raise SystemExit("ffmpeg is required")
    for source in (MASTER, RAIN_04, RAIN_05, GRACE):
        if not source.is_file():
            raise SystemExit(f"Missing required source: {source}")
    QA.mkdir(parents=True, exist_ok=True)
    for output in (RAIN_CONTEXT, GRACE_CONTEXT, MANIFEST):
        if output.exists() and not args.force:
            raise SystemExit(f"Refusing to overwrite without --force: {output}")

    build_rain(RAIN_CONTEXT)
    build_grace(GRACE_CONTEXT)

    records = []
    for output, source_window, purpose in (
        (RAIN_CONTEXT, [54.0, 86.0], "cue 04/05 rain against exact narration"),
        (GRACE_CONTEXT, [611.0, 631.0], "Grace moth landing against exact narration"),
    ):
        records.append(
            {
                "output": str(output.relative_to(ROOT)),
                "sha256": sha256(output),
                "duration_seconds": duration(output),
                "episode_v9_source_window_seconds": source_window,
                "purpose": purpose,
                "disposition": "NORMAL_SPEED_REVIEW_REQUIRED",
            }
        )
    payload = {
        "schema_version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_REVIEW_REQUIRED",
        "master": {
            "path": str(MASTER.relative_to(ROOT)),
            "sha256": sha256(MASTER),
        },
        "records": records,
        "release_authority": "NONE",
    }
    MANIFEST.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))


if __name__ == "__main__":
    main()
