#!/usr/bin/env python3
"""Verify that the Episode 3 master changes to the specified asset at every cue."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
COMIC = ROOT / "assets/episodes/ep-03/comic"
CUES = ROOT / "content/episodes/episode-03-cues.json"
MASTER = ROOT / "assets/video/episode-03-full-v8.mp4"
TITLE = COMIC / "ep03-open-03-title-comic-v6-sky-balanced-1920.png"
TRANSFORMATION = COMIC / "ep03-cue08-canva-transformation-once-v2.mp4"
AMBIENT_CUES = {3, 4, 5, 6, 9, 11, 14, 17, 19, 21, 22, 25, 30, 38, 45}
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
W, H = 160, 90


def sample(path: Path, at: float | None) -> np.ndarray:
    cmd = [str(FFMPEG), "-hide_banner", "-loglevel", "error"]
    if at is not None:
        cmd += ["-ss", f"{at:.3f}"]
    cmd += [
        "-i",
        str(path),
        "-frames:v",
        "1",
        "-vf",
        f"scale={W}:{H}:force_original_aspect_ratio=decrease,"
        f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "gray",
        "-",
    ]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    if len(raw) != W * H:
        raise RuntimeError(f"could not sample {path} at {at}")
    return np.frombuffer(raw, dtype=np.uint8).astype(float)


def expected(index: int, cue: dict) -> tuple[Path, float | None]:
    if index == 2:
        return TITLE, None
    if index == 8:
        return TRANSFORMATION, 0.30
    if index in AMBIENT_CUES:
        return COMIC / f"ep03-cue{index:02d}-canva-ambient-loop-v1.mp4", 0.30
    return ROOT / cue["src"].lstrip("/"), None


def main() -> int:
    cues = json.loads(CUES.read_text())["cues"]
    failures: list[tuple[int, float]] = []
    print(f"Checking {len(cues)} cue entries in {MASTER.name}:")
    for index, cue in enumerate(cues):
        source, source_at = expected(index, cue)
        actual = sample(MASTER, float(cue["t"]) + 0.30)
        target = sample(source, source_at)
        mad = float(np.abs(actual - target).mean())
        ok = mad < 8.0
        print(
            f"  {'PASS' if ok else 'FAIL'} cue {index:02d} "
            f"@ {float(cue['t']):7.1f}s  MAD {mad:5.2f}  {source.name}"
        )
        if not ok:
            failures.append((index, mad))
    if failures:
        print(f"\n{len(failures)} cue(s) failed source/timing verification.")
        return 1
    print("\nAll 49 cue starts match their authoritative assets.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
