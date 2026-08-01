#!/usr/bin/env python3
"""Mechanically validate the Episode 04 p50-p51 closing review sequence."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path

import cv2
import imageio_ffmpeg
import numpy as np


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
SEQUENCE_DIR = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences"
OUTPUT = SEQUENCE_DIR / "p50-p51-closing-review-v1.mp4"
BUILD_RECEIPT = SEQUENCE_DIR / "p50-p51-closing-review-v1-build.json"
VALIDATION = SEQUENCE_DIR / "p50-p51-closing-review-v1-validation.json"

EXPECTED = {
    "width": 1920,
    "height": 1080,
    "fps": 30.0,
    "frames": 3730,
    "duration_seconds": 3730 / 30,
    "audio_channels": "mono",
    "audio_sample_rate_hz": 48000,
}
FPS = EXPECTED["fps"]
SEGMENT_FRAMES = [236, 226, 511, 134, 461, 161, 281, 443, 571, 706]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run_ffmpeg(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [str(FFMPEG), *args], cwd=ROOT, text=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False,
    )


def inspect_video(path: Path) -> dict[str, float | int]:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"OpenCV could not open {path}")
    result = {
        "width": int(capture.get(cv2.CAP_PROP_FRAME_WIDTH)),
        "height": int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT)),
        "fps": float(capture.get(cv2.CAP_PROP_FPS)),
        "frames": int(capture.get(cv2.CAP_PROP_FRAME_COUNT)),
    }
    result["duration_seconds"] = result["frames"] / result["fps"]
    capture.release()
    return result


def frame_at(path: Path, seconds: float) -> np.ndarray:
    capture = cv2.VideoCapture(str(path))
    capture.set(cv2.CAP_PROP_POS_MSEC, seconds * 1000)
    ok, frame = capture.read()
    capture.release()
    if not ok:
        raise RuntimeError(f"Could not decode {path} at {seconds}")
    return cv2.resize(frame, (320, 180), interpolation=cv2.INTER_AREA)


def main() -> None:
    build = json.loads(BUILD_RECEIPT.read_text())
    observed = inspect_video(OUTPUT)
    decode = run_ffmpeg(["-v", "error", "-i", str(OUTPUT), "-f", "null", "-"])
    probe = run_ffmpeg(["-hide_banner", "-i", str(OUTPUT), "-f", "null", "-"])
    black = run_ffmpeg([
        "-hide_banner", "-i", str(OUTPUT), "-an",
        "-vf", "blackdetect=d=0.25:pic_th=0.98", "-f", "null", "-",
    ])

    geometry_pass = (
        observed["width"] == EXPECTED["width"]
        and observed["height"] == EXPECTED["height"]
        and abs(float(observed["fps"]) - EXPECTED["fps"]) < 0.01
    )
    frame_count_pass = int(observed["frames"]) == EXPECTED["frames"]
    duration_pass = abs(float(observed["duration_seconds"]) - EXPECTED["duration_seconds"]) <= (1 / 30)
    audio_present = bool(re.search(r"Audio:\s*aac", probe.stderr, re.IGNORECASE))
    mono_audio = bool(re.search(r"48000 Hz, mono", probe.stderr, re.IGNORECASE))
    black_events = [line.strip() for line in black.stderr.splitlines() if "black_start:" in line]

    boundaries = []
    running_frames = 0
    for frames in SEGMENT_FRAMES[:-1]:
        running_frames += frames
        boundaries.append(running_frames / 30)
    cut_evidence = []
    for cut in boundaries:
        before = frame_at(OUTPUT, cut - 0.067)
        after = frame_at(OUTPUT, cut + 0.067)
        delta = float(cv2.absdiff(before, after).mean())
        cut_evidence.append({
            "cut_seconds": round(cut, 6),
            "mean_abs_pixel_delta": round(delta, 6),
            "distinct_visual_pass": delta > 5.0,
        })
    hard_cuts_distinct = all(item["distinct_visual_pass"] for item in cut_evidence)

    # The lights-up occurrence must show a material encoded-frame luminance
    # change; entering the retime branch does not prove visible output motion.
    lights_start = SEGMENT_FRAMES[0] / FPS
    lights_end = (SEGMENT_FRAMES[0] + SEGMENT_FRAMES[1]) / FPS
    lights_first = frame_at(OUTPUT, lights_start + 0.10)
    lights_last = frame_at(OUTPUT, lights_end - 0.10)
    lights_luminance_delta = abs(float(lights_last.mean()) - float(lights_first.mean()))
    lights_pixel_delta = float(cv2.absdiff(lights_first, lights_last).mean())
    lights_motion_pass = lights_luminance_delta > 5.0 and lights_pixel_delta > 10.0

    source_hashes_match = all(
        sha256(ROOT / segment["source"]) == segment["source_sha256"]
        for segment in build["segments"]
    )
    mechanical_pass = all([
        geometry_pass, frame_count_pass, duration_pass,
        decode.returncode == 0, probe.returncode == 0,
        audio_present, mono_audio, black.returncode == 0, not black_events,
        hard_cuts_distinct, lights_motion_pass, source_hashes_match,
        build["output_sha256"] == sha256(OUTPUT),
    ])

    receipt = {
        "status": "TECHNICAL_PASS_INDEPENDENT_SEMANTIC_REVIEW_REQUIRED" if mechanical_pass else "TECHNICAL_FAIL",
        "authority": "NO_EDITORIAL_ACCEPTANCE_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "expected": EXPECTED,
        "observed": observed,
        "checks": {
            "geometry_pass": geometry_pass,
            "frame_count_pass": frame_count_pass,
            "duration_pass": duration_pass,
            "decode_pass": decode.returncode == 0,
            "audio_present": audio_present,
            "mono_48000_hz_audio_pass": mono_audio,
            "black_frame_events": black_events,
            "hard_cuts_distinct_pass": hard_cuts_distinct,
            "lights_up_encoded_motion_pass": lights_motion_pass,
            "lights_up_first_last_mean_luminance_delta": round(lights_luminance_delta, 6),
            "lights_up_first_last_mean_abs_pixel_delta": round(lights_pixel_delta, 6),
            "source_hashes_match": source_hashes_match,
            "build_receipt_hash_matches": build["output_sha256"] == sha256(OUTPUT),
        },
        "cut_evidence": cut_evidence,
        "explicit_limits": [
            "mechanical validation does not prove narration-picture meaning, historical accuracy, likeness or taste",
            "the lights-up check proves visible encoded change, not that the retimed motion feels natural",
            "the other nine beats are deliberate stills and are not represented as animation",
            "an independent reviewer must watch the exact audio at normal speed and record PASS, CLOSE_ENOUGH, RETIME, REPLACE or ADD_OR_REPAIR_ANIMATION",
            "p49-to-p50 and p51-to-p52 continuity must be judged in the assembled successor",
            "a successor master still requires complete occurrence re-audit and an audible responsive-player watch",
        ],
    }
    VALIDATION.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt, indent=2))
    if not mechanical_pass:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
