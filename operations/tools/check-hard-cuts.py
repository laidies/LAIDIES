#!/usr/bin/env python3
"""Watch every animation clip for a HARD CUT — an abrupt jump to a different image.

Why this exists: a Seedance clip that only animates for ~5s often gets padded to its
hold length by appending a separate still. The still is NOT a frame of the clip, so it
jumps — the moth flew halfway then cut to a different picture of it in the book. This
was shipped because the clips were judged from single frames and file durations, never
watched. This script watches the motion so that can't happen again.

A clip PASSES if it is one continuous shot that settles and holds its OWN last frame:
motion (small frame-to-frame deltas) followed by a still tail (near-zero deltas), with
NO spike in between. A spike = a hard cut = FAIL.

Usage:
  check-hard-cuts.py                      # every *-comic-event-*.mp4 in the ep-04 pixel dir
  check-hard-cuts.py path/to/clip.mp4 ... # specific clips
  check-hard-cuts.py --threshold 25       # tune the cut sensitivity
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

# A frame-to-frame greyscale mean-abs-diff above this is a CUT, not motion.
# Calibrated on the ep-04 clips: real motion runs 0.02–0.6 per step; the bad
# padding cuts measured 47.7 (moth) — so anything above ~25 is unambiguous.
CUT_THRESHOLD = 25.0
SAMPLE_FPS = 6


def frame_deltas(path: Path) -> list[float]:
    raw = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
         "-vf", f"fps={SAMPLE_FPS},scale=160:90", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
        capture_output=True, check=True,
    ).stdout
    n = 160 * 90
    frames = [np.frombuffer(raw[i * n:(i + 1) * n], dtype=np.uint8).astype(float)
              for i in range(len(raw) // n)]
    return [float(np.abs(frames[i] - frames[i - 1]).mean()) for i in range(1, len(frames))]


def cut_regions(deltas: list[float], threshold: float) -> list[tuple[float, float]]:
    """Group consecutive over-threshold frames into (start_s, end_s) regions.

    One visual transition spans a couple of sample frames, so adjacent spikes are
    ONE region, not several. A gap of quiet frames between spikes = a separate region.
    """
    regions: list[tuple[float, float]] = []
    i = 0
    while i < len(deltas):
        if deltas[i] > threshold:
            start = i
            while i < len(deltas) and deltas[i] > threshold:
                i += 1
            regions.append(((start + 1) / SAMPLE_FPS, i / SAMPLE_FPS))
        else:
            i += 1
    return regions


def verdict(clip: Path, deltas: list[float], threshold: float) -> tuple[bool, str]:
    """Event clips: no cut allowed. Swirls: exactly ONE cut, and it must be the
    swirl resolving into its era card near the END of the clip."""
    regions = cut_regions(deltas, threshold)
    duration = (len(deltas) + 1) / SAMPLE_FPS
    is_swirl = "timejump" in clip.name

    if not regions:
        return True, "one continuous shot"
    if not is_swirl:
        return False, (f"HARD CUT at {regions[0][0]:.2f}s — an event clip must be one continuous "
                       "shot that holds its own last frame, never padded with a separate still")
    # swirl: allow exactly one transition region, located in the last 40% (swirl -> card)
    if len(regions) == 1 and regions[0][0] >= duration * 0.6:
        return True, f"clean swirl -> card transition at {regions[0][0]:.2f}s"
    where = ", ".join(f"{a:.2f}s" for a, _ in regions)
    return False, (f"{len(regions)} cut regions ({where}) — a swirl should resolve to its card ONCE "
                   "at the end; scattered cuts = flicker, regenerate")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("clips", nargs="*", type=Path)
    parser.add_argument("--threshold", type=float, default=CUT_THRESHOLD)
    args = parser.parse_args()

    clips = args.clips or sorted(PIXEL.glob("*-comic-event-*.mp4"))
    if not clips:
        print("no clips found")
        return 1

    print(f"Watching {len(clips)} clip(s) for hard cuts (threshold {args.threshold}):\n")
    failed = []
    for clip in clips:
        ok, detail = verdict(clip, frame_deltas(clip), args.threshold)
        if not ok:
            failed.append(clip.name)
        print(f"  {'PASS' if ok else 'FAIL'}  {clip.name[:56]:56s}  {detail}")

    print()
    if failed:
        print(f"{len(failed)} clip(s) FAILED — regenerate as one continuous shot (event) or a single "
              "clean swirl->card resolve (swirl):")
        for name in failed:
            print(f"  - {name}")
        return 1
    print("All clips clean.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
