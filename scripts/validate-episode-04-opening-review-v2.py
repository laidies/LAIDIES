#!/usr/bin/env python3
"""Validate the Episode 04 p03-p06 opening review sequence.

This validator proves only mechanical properties: decode, geometry, duration,
audio presence, absence of black frames and measurable frame-to-frame change.
It deliberately cannot issue the required narration-picture or aesthetic
verdict; those remain independent normal-speed review gates.
"""

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
PACKET = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01"
SEQUENCE_DIR = PACKET / "review-sequences"
OUTPUT = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2.mp4"
BUILD_RECEIPT = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2-build.json"
VALIDATION = SEQUENCE_DIR / "p03-p06-opening-narration-review-v2-validation.json"

EXPECTED = {
    "width": 1920,
    "height": 1080,
    "fps": 30.0,
    "frames": 1816,
    "duration_seconds": 60.54,
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run_ffmpeg(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [str(FFMPEG), *args],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
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


def motion_stats(path: Path, start: float = 0.0, end: float | None = None) -> dict[str, float | int]:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"OpenCV could not open {path}")
    fps = float(capture.get(cv2.CAP_PROP_FPS))
    capture.set(cv2.CAP_PROP_POS_MSEC, start * 1000)
    previous: np.ndarray | None = None
    deltas: list[float] = []
    frames_read = 0
    while True:
        position = capture.get(cv2.CAP_PROP_POS_MSEC) / 1000
        if end is not None and position >= end:
            break
        ok, frame = capture.read()
        if not ok:
            break
        frame = cv2.resize(frame, (320, 180), interpolation=cv2.INTER_AREA)
        grey = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        if previous is not None:
            deltas.append(float(cv2.absdiff(previous, grey).mean()))
        previous = grey
        frames_read += 1
    capture.release()
    array = np.asarray(deltas, dtype=np.float64)
    return {
        "frames_read": frames_read,
        "fps": fps,
        "mean_abs_luma_delta": round(float(array.mean()), 6) if array.size else 0.0,
        "median_abs_luma_delta": round(float(np.median(array)), 6) if array.size else 0.0,
        "fraction_deltas_above_0_1": round(float((array > 0.1).mean()), 6) if array.size else 0.0,
    }


def main() -> None:
    build = json.loads(BUILD_RECEIPT.read_text())
    observed = inspect_video(OUTPUT)
    decode = run_ffmpeg(["-v", "error", "-i", str(OUTPUT), "-f", "null", "-"])
    probe = run_ffmpeg(["-hide_banner", "-i", str(OUTPUT), "-f", "null", "-"])
    black = run_ffmpeg(
        [
            "-hide_banner",
            "-i",
            str(OUTPUT),
            "-an",
            "-vf",
            "blackdetect=d=0.25:pic_th=0.98",
            "-f",
            "null",
            "-",
        ]
    )

    geometry_pass = (
        observed["width"] == EXPECTED["width"]
        and observed["height"] == EXPECTED["height"]
        and abs(float(observed["fps"]) - EXPECTED["fps"]) < 0.01
    )
    frame_count_pass = abs(int(observed["frames"]) - EXPECTED["frames"]) <= 1
    duration_pass = abs(float(observed["duration_seconds"]) - EXPECTED["duration_seconds"]) <= (1 / 30)
    audio_present = bool(re.search(r"Audio:\s*aac", probe.stderr, re.IGNORECASE))
    black_events = [line.strip() for line in black.stderr.splitlines() if "black_start:" in line]

    segment_stats = []
    cursor = 0.0
    for segment in build["segments"]:
        duration = float(segment["duration"])
        segment_stats.append(
            {
                "source": segment["source"],
                "kind": segment["kind"],
                "output_window_seconds": [round(cursor, 3), round(cursor + duration, 3)],
                "motion": motion_stats(OUTPUT, cursor, cursor + duration),
                "interpretation": (
                    "measurable pixel change only; independent review must judge perceptibility and meaning"
                    if segment["kind"] == "video"
                    else "deliberately still editorial beat with subtle camera drift; not claimed as animation"
                ),
            }
        )
        cursor += duration

    mechanical_pass = all(
        [
            geometry_pass,
            frame_count_pass,
            duration_pass,
            decode.returncode == 0,
            probe.returncode == 0,
            audio_present,
            black.returncode == 0,
            not black_events,
            build["output_sha256"] == sha256(OUTPUT),
        ]
    )

    receipt = {
        "status": (
            "TECHNICAL_PASS_INDEPENDENT_SEMANTIC_REVIEW_REQUIRED"
            if mechanical_pass
            else "TECHNICAL_FAIL"
        ),
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
            "black_frame_events": black_events,
            "build_receipt_hash_matches": build["output_sha256"] == sha256(OUTPUT),
        },
        "segment_motion_evidence": segment_stats,
        "explicit_limits": [
            "pixel change does not prove useful animation",
            "source filenames and maker intent do not prove narration-picture fit",
            "the wide realization beat is intentionally a still composition and is not represented as animated",
            "an independent reviewer must watch exact audio at normal speed and record PASS, CLOSE_ENOUGH, RETIME, REPLACE or ADD_OR_REPAIR_ANIMATION",
            "a successor master still requires complete occurrence re-audit and an audible responsive-player watch",
        ],
    }
    VALIDATION.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt, indent=2))
    if not mechanical_pass:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
