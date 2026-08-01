#!/usr/bin/env python3
"""Deterministically validate the Episode 03 p39-p42 method sequence."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
PACKET = ROOT / "operations/video-qa/episode-03-v15-repair-production-packet-2026-08-01"
SEQUENCE = PACKET / "review-sequences/p39-p42-three-move-method-review-v1.mp4"
BUILD = PACKET / "review-sequences/p39-p42-three-move-method-review-v1-build.json"
OUTPUT = PACKET / "p39-p42-three-move-method-review-v1-validation.json"
EXPECTED_DURATION = 102.2
EXPECTED_FRAMES = 3066


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe(path: Path) -> str:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)], cwd=ROOT, text=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    return result.stderr


def run_capture(command: list[str]) -> str:
    result = subprocess.run(
        command, cwd=ROOT, check=True, text=True,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    )
    return result.stdout + result.stderr


def main() -> None:
    build = json.loads(BUILD.read_text())
    errors: list[str] = []
    if sha256(SEQUENCE) != build["sequence"]["sha256"]:
        errors.append("sequence checksum drift")
    if abs(build["window"]["duration_seconds"] - EXPECTED_DURATION) > 0.0001:
        errors.append("declared p39-p42 duration drift")
    if len(build["segments"]) != 9:
        errors.append("p39-p42 sequence must contain nine narration-specific beats")
    for prior, current in zip(build["segments"], build["segments"][1:]):
        if abs(prior["end"] - current["start"]) > 0.0001:
            errors.append("segment clock gap or overlap")

    metadata = probe(SEQUENCE)
    duration_match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", metadata)
    duration = None
    if duration_match:
        hours, minutes, seconds = duration_match.groups()
        duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    if duration is None or abs(duration - EXPECTED_DURATION) > 0.04:
        errors.append(f"unexpected duration: {duration}")
    if "1920x1080" not in metadata or "30 fps" not in metadata:
        errors.append("unexpected geometry or frame rate")
    if "Audio: aac" not in metadata:
        errors.append("review audio missing")

    decode = run_capture([str(FFMPEG), "-v", "info", "-i", str(SEQUENCE), "-f", "null", "-"])
    frame_matches = re.findall(r"frame=\s*(\d+)", decode)
    decoded_frames = int(frame_matches[-1]) if frame_matches else 0
    if decoded_frames != EXPECTED_FRAMES:
        errors.append(f"decoded frame count is {decoded_frames}, expected {EXPECTED_FRAMES}")

    black = run_capture([
        str(FFMPEG), "-v", "info", "-i", str(SEQUENCE),
        "-vf", "blackdetect=d=0.08:pix_th=0.10", "-an", "-f", "null", "-",
    ])
    black_events = re.findall(r"black_start:[^\n]+", black)
    if black_events:
        errors.append(f"black events detected: {black_events}")

    silence = run_capture([
        str(FFMPEG), "-v", "info", "-i", str(SEQUENCE),
        "-af", "silencedetect=n=-50dB:d=3.0", "-vn", "-f", "null", "-",
    ])
    silence_events = re.findall(r"silence_start:[^\n]+", silence)
    if silence_events:
        errors.append(f"unexpected three-second silence: {silence_events}")

    result = {
        "status": "PASS" if not errors else "FAIL",
        "publication_authority": False,
        "sequence": {
            "path": str(SEQUENCE.relative_to(ROOT)),
            "sha256": sha256(SEQUENCE),
            "duration_seconds": duration,
            "decoded_frames": decoded_frames,
            "geometry": "1920x1080",
            "frame_rate": 30,
        },
        "checks": {
            "build_receipt_checksum_and_clock": "PASS" if not any("checksum" in error or "clock" in error for error in errors) else "FAIL",
            "full_decode": "PASS" if decoded_frames == EXPECTED_FRAMES else "FAIL",
            "black_scan": "PASS" if not black_events else "FAIL",
            "audio_presence_and_long_silence_scan": "PASS" if "Audio: aac" in metadata and not silence_events else "FAIL",
            "narration_specific_segment_count": "PASS" if len(build["segments"]) == 9 else "FAIL",
        },
        "errors": errors,
        "next_gate": "independent normal-speed narration-picture review; this deterministic validator does not replace hearing or editorial admission",
    }
    OUTPUT.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
