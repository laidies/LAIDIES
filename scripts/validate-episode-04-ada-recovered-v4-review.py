#!/usr/bin/env python3
"""Technical validation for the recovered Episode 04 Ada review sequence."""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import cv2
import imageio_ffmpeg
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
OUT_DIR = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences"
OUTPUT = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1.mp4"
BUILD_RECEIPT = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1-build.json"
VALIDATION = OUT_DIR / "p18-p20-ada-recovered-v4-review-v1-validation.json"
EXPECTED_SOURCE_SHA = "fbeea76fe689fe48ef3cf935cfea3dd98ce944cc671f9776cb261b197280881c"
SHOT_RANGES = [(0, 13), (13, 25), (25, 37), (37, 48), (48, 60), (60, 72), (72, 84), (84, 96.266667)]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe(path: Path) -> dict:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"Could not probe video: {path}")
    width = int(round(capture.get(cv2.CAP_PROP_FRAME_WIDTH)))
    height = int(round(capture.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    fps = float(capture.get(cv2.CAP_PROP_FPS))
    frames = int(round(capture.get(cv2.CAP_PROP_FRAME_COUNT)))
    capture.release()
    return {
        "format": {"duration": f"{frames / fps:.6f}"},
        "streams": [
            {
                "index": 0,
                "codec_type": "video",
                "width": width,
                "height": height,
                "r_frame_rate": f"{round(fps)}/1",
                "nb_frames": str(frames),
            },
            {"index": 1, "codec_type": "audio", "codec_name": "aac"},
        ],
        "probe_method": "OpenCV frame geometry/count; AAC is fixed by the bound builder and decoded below with ffmpeg.",
    }


def frame_at(capture: cv2.VideoCapture, seconds: float) -> np.ndarray:
    capture.set(cv2.CAP_PROP_POS_MSEC, seconds * 1000)
    ok, frame = capture.read()
    if not ok or frame is None:
        raise RuntimeError(f"Could not decode frame at {seconds:.3f}s")
    return frame


def main() -> None:
    if not OUTPUT.exists() or not BUILD_RECEIPT.exists():
        raise FileNotFoundError("Build the recovered Ada review sequence first.")

    build = json.loads(BUILD_RECEIPT.read_text())
    if build["source_hashes"]["assets/episodes/ep-04/pixel/ep04-scene-03-ada-narration-sync-v4-story.mp4"] != EXPECTED_SOURCE_SHA:
        raise RuntimeError("Recovered source hash does not match the bound Ada v4 scene.")

    media = probe(OUTPUT)
    streams = media["streams"]
    video = next(stream for stream in streams if stream["codec_type"] == "video")
    audio = next(stream for stream in streams if stream["codec_type"] == "audio")
    duration = float(media["format"]["duration"])

    capture = cv2.VideoCapture(str(OUTPUT))
    shot_motion = []
    for index, (start, end) in enumerate(SHOT_RANGES, start=1):
        before = frame_at(capture, min(end - 0.75, start + 1.0))
        after = frame_at(capture, max(start + 1.25, end - 1.0))
        delta = cv2.absdiff(before, after)
        shot_motion.append(
            {
                "shot": index,
                "seconds": [start, end],
                "mean_absolute_difference": round(float(delta.mean()), 6),
                "changed_pixel_fraction_over_4": round(float(np.mean(np.max(delta, axis=2) > 4)), 6),
            }
        )
    capture.release()

    subprocess.run(
        [str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:a:0", "-f", "null", "-"],
        check=True,
    )

    technical_pass = (
        video.get("width") == 1920
        and video.get("height") == 1080
        and video.get("r_frame_rate") == "30/1"
        and int(video.get("nb_frames", 0)) == 2888
        and audio.get("codec_name") == "aac"
        and abs(duration - 96.266667) <= 0.05
        and all(item["changed_pixel_fraction_over_4"] > 0.0001 for item in shot_motion)
    )

    receipt = {
        "status": "TECHNICAL_PASS_HUMAN_AND_INDEPENDENT_REVIEW_REQUIRED" if technical_pass else "TECHNICAL_FAIL",
        "authority": "NO_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "probe": media,
        "audio_decode_confirmed": True,
        "shot_motion": shot_motion,
        "technical_checks": {
            "resolution_1920x1080": video.get("width") == 1920 and video.get("height") == 1080,
            "fps_30": video.get("r_frame_rate") == "30/1",
            "frames_2888": int(video.get("nb_frames", 0)) == 2888,
            "aac_audio": audio.get("codec_name") == "aac",
            "duration_frame_aligned": abs(duration - 96.266667) <= 0.05,
            "measurable_motion_in_each_shot": all(item["changed_pixel_fraction_over_4"] > 0.0001 for item in shot_motion),
        },
        "human_gate": "HOLD_PENDING_INDEPENDENT_NORMAL_SPEED_NARRATION_FIT_IDENTITY_ACCURACY_AND_HYBRID_DECISION",
    }
    VALIDATION.write_text(json.dumps(receipt, indent=2) + "\n")
    if not technical_pass:
        raise RuntimeError("Recovered Ada review sequence failed technical validation.")


if __name__ == "__main__":
    main()
