#!/usr/bin/env python3
"""Mechanically validate the Episode 04 Hedy and ENIAC review sequences."""

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
FPS = 30.0
CONFIGS = [
    ("p22-p23-hedy-review-v1", [272, 297, 479, 397, 112, 283, 470, 412]),
    ("p25-p27-eniac-review-v1", [452, 452, 278, 585, 128, 579, 277, 197, 150]),
]


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


def frame_at_index(path: Path, frame_index: int) -> np.ndarray:
    capture = cv2.VideoCapture(str(path))
    capture.set(cv2.CAP_PROP_POS_FRAMES, max(0, frame_index))
    ok, frame = capture.read()
    capture.release()
    if not ok:
        raise RuntimeError(f"Could not decode {path} at frame {frame_index}")
    return cv2.resize(frame, (320, 180), interpolation=cv2.INTER_AREA)


def validate(slug: str, segment_frames: list[int]) -> None:
    output = SEQUENCE_DIR / f"{slug}.mp4"
    build_path = SEQUENCE_DIR / f"{slug}-build.json"
    validation_path = SEQUENCE_DIR / f"{slug}-validation.json"
    build = json.loads(build_path.read_text())
    observed = inspect_video(output)
    expected_frames = sum(segment_frames)
    decode = run_ffmpeg(["-v", "error", "-i", str(output), "-f", "null", "-"])
    probe = run_ffmpeg(["-hide_banner", "-i", str(output), "-f", "null", "-"])
    black = run_ffmpeg([
        "-hide_banner", "-i", str(output), "-an",
        "-vf", "blackdetect=d=0.25:pic_th=0.98", "-f", "null", "-",
    ])

    geometry_pass = observed["width"] == 1920 and observed["height"] == 1080 and abs(float(observed["fps"]) - FPS) < 0.01
    frame_count_pass = int(observed["frames"]) == expected_frames
    duration_pass = abs(float(observed["duration_seconds"]) - (expected_frames / FPS)) <= (1 / FPS)
    audio_present = bool(re.search(r"Audio:\s*aac", probe.stderr, re.IGNORECASE))
    mono_audio = bool(re.search(r"48000 Hz, mono", probe.stderr, re.IGNORECASE))
    black_events = [line.strip() for line in black.stderr.splitlines() if "black_start:" in line]

    boundaries = []
    running = 0
    for frames in segment_frames[:-1]:
        running += frames
        boundaries.append(running)
    cut_evidence = []
    for boundary_index, cut_frame in enumerate(boundaries):
        before = frame_at_index(output, cut_frame - 2)
        after = frame_at_index(output, cut_frame + 2)
        delta = float(cv2.absdiff(before, after).mean())
        delta_floor = float(build["segments"][boundary_index].get("next_cut_delta_floor", 5.0))
        cut_evidence.append({
            "cut_frame": cut_frame,
            "cut_seconds": round(cut_frame / FPS, 6),
            "mean_abs_pixel_delta": round(delta, 6),
            "required_delta_floor": delta_floor,
            "distinct_visual_pass": delta > delta_floor,
        })

    motion_checks = []
    running = 0
    for segment, frames in zip(build["segments"], segment_frames):
        if segment["source_type"] == "full_motion_retime":
            first = frame_at_index(output, running + 3)
            last = frame_at_index(output, running + frames - 4)
            pixel_delta = float(cv2.absdiff(first, last).mean())
            delta_floor = float(segment.get("motion_delta_floor", 2.0))
            motion_checks.append({
                "source": segment["source"],
                "mean_abs_pixel_delta": round(pixel_delta, 6),
                "required_delta_floor": delta_floor,
                "encoded_motion_pass": pixel_delta > delta_floor,
            })
        running += frames

    source_hashes_match = all(
        sha256(ROOT / segment["source"]) == segment["source_sha256"]
        for segment in build["segments"]
    )
    checks = {
        "geometry_pass": geometry_pass,
        "frame_count_pass": frame_count_pass,
        "duration_pass": duration_pass,
        "decode_pass": decode.returncode == 0,
        "probe_pass": probe.returncode == 0,
        "audio_present": audio_present,
        "mono_48000_audio": mono_audio,
        "blackdetect_pass": black.returncode == 0 and not black_events,
        "hard_cuts_distinct": all(item["distinct_visual_pass"] for item in cut_evidence),
        "encoded_motion_pass": all(item["encoded_motion_pass"] for item in motion_checks),
        "source_hashes_match": source_hashes_match,
        "output_hash_matches_build": build["output_sha256"] == sha256(output),
    }
    mechanical_pass = all(checks.values())
    receipt = {
        "status": "TECHNICAL_PASS_INDEPENDENT_SEMANTIC_REVIEW_REQUIRED" if mechanical_pass else "TECHNICAL_FAIL",
        "authority": "NO_EDITORIAL_ACCEPTANCE_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "expected": {
            "width": 1920, "height": 1080, "fps": FPS,
            "frames": expected_frames, "duration_seconds": expected_frames / FPS,
            "audio_channels": "mono", "audio_sample_rate_hz": 48000,
        },
        "observed": observed,
        "checks": checks,
        "black_events": black_events,
        "hard_cut_evidence": cut_evidence,
        "motion_evidence": motion_checks,
        "semantic_boundary": "Technical pass does not admit likeness, historical accuracy, text artifacts, narration fit, taste, natural motion, transitions, or release readiness.",
        "required_next_gate": build["required_gate"],
    }
    validation_path.write_text(json.dumps(receipt, indent=2) + "\n")
    print(f"{slug}: {receipt['status']}")


def main() -> None:
    for slug, frames in CONFIGS:
        validate(slug, frames)


if __name__ == "__main__":
    main()
