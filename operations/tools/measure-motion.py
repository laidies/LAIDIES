#!/usr/bin/env python3
"""Measure how much a clip ACTUALLY moves, against a known-still control.

The bug this exists to prevent: a motion check whose bar sits below the encoder's
own noise floor passes anything, including a still image saved as a video.

So the unit here is relative. It reports peak-to-peak pixel swing, and it always
measures a frame that is KNOWN to be a static hold in the same encode, so every
number can be read as a multiple of "definitely not moving".

Usage:
  measure-motion.py clips                  # the loop assets on disk
  measure-motion.py clips path/to/*.mp4    # explicitly supplied loop assets
  measure-motion.py render                 # sample points inside the v2 master
  measure-motion.py render --video path/to/master.mp4
  measure-motion.py render --json out.json
"""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[2]
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
CLIPS = ROOT / "assets/episodes/ep-04/clips"
VIDEO = ROOT / "assets/video/episode-04-full-v2.mp4"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

# Full-ish resolution matters: ambient light is local, and downsampling averages a
# flickering lamp into its dark surroundings until it disappears.
SAMPLE_W, SAMPLE_H, SAMPLE_FPS = 640, 360, 4
MOVED_LEVEL = 16  # a pixel counts as moving if it travels this many levels

# Beats that are a plain PNG hold in the cut. Whatever these measure IS the noise
# floor for this encode; nothing below it can be called motion.
# Sampled MID-hold — starting at the cue time catches the dissolve into it, which
# reads as motion and inflates the floor to uselessness.
STILL_CONTROLS = {
    "cocktail (cue 54)": 1090.0,
    "around town (cue 55)": 1135.0,
    "sign-off (cue 56)": 1165.0,
}

# Loop assets, keyed to the cue they play under.
LOOP_ASSETS = {
    "title (cue 1)": PIXEL / "ep04-open-03-title-comic-v1-exact-text-1920-loop-v1.mp4",
    "desk (cue 2, 44)": PIXEL / "ep04-open-04-desk-comic-v1-face-lock-1920-loop-v1.mp4",
    "directory (cue 9)": PIXEL / "ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920-loop-v1.mp4",
    "approach (cue 14)": PIXEL / "ep04-open-16-luminairy-approach-comic-v1-1920-loop-v1.mp4",
    "hall (cue 15)": PIXEL / "ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920-loop-v1.mp4",
    "ada (cue 18)": CLIPS / "ep04-scene-03-ada-loop-v1.mp4",
    # Scene ambient loops, from ep04-capcut-motion-brief.md.
    "ada b-mid (cue 19)": PIXEL / "ep04-scene-03-ada-b-mid-comic-v1-locked-1920-loop-v1.mp4",
    "eniac (cue 24)": PIXEL / "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920-loop-v1.mp4",
    "grace b-mid (cue 28)": PIXEL / "ep04-scene-05-grace-b-mid-comic-v1-locked-1920-loop-v1.mp4",
    "karen (cue 38)": PIXEL / "ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920-loop-v1.mp4",
    "kate (cue 50)": PIXEL / "ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920-loop-v1.mp4",
}

RENDER_POINTS = {
    "title (cue 2)": 38.0,
    "desk (cue 3)": 43.0,
    "directory (cue 10)": 142.0,
    "approach (cue 15)": 204.0,
    "hall (cue 16)": 222.0,
    "desk again (cue 45)": 846.0,
    "ada b-mid (cue 20)": 302.0,
    "eniac (cue 25)": 445.0,
    "grace b-mid (cue 29)": 578.0,
    "karen (cue 39)": 684.0,
    "kate (cue 51)": 974.0,
}


def sample(path: Path, start: float | None = None, seconds: float = 5.0) -> list[np.ndarray]:
    cmd = [str(FFMPEG), "-hide_banner", "-loglevel", "error"]
    if start is not None:
        cmd += ["-ss", f"{start:.3f}"]
    cmd += ["-i", str(path), "-t", f"{seconds:.3f}",
            "-vf", f"fps={SAMPLE_FPS},scale={SAMPLE_W}:{SAMPLE_H}",
            "-f", "rawvideo", "-pix_fmt", "gray", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    n = SAMPLE_W * SAMPLE_H
    return [np.frombuffer(raw[i * n:(i + 1) * n], dtype=np.uint8).astype(float)
            for i in range(len(raw) // n)]


def swing(frames: list[np.ndarray]) -> tuple[float, float]:
    """(peak travel, share of the frame that genuinely moved).

    A whole-frame mean cannot see ambient light. ENIAC's indicator lamps are a few
    thousand pixels of two million, so however hard they flicker the average stays
    at zero — which is exactly how a working loop got reported as a still frame.
    Counting the pixels that moved is the instrument that matches the effect.
    """
    if len(frames) < 2:
        return 0.0, 0.0
    stack = np.stack(frames)
    travel = stack.max(axis=0) - stack.min(axis=0)
    return float(travel.max()), float((travel >= MOVED_LEVEL).mean() * 100.0)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["clips", "render"])
    parser.add_argument("paths", nargs="*", type=Path)
    parser.add_argument("--json", type=Path)
    parser.add_argument("--seconds", type=float, default=5.0)
    parser.add_argument(
        "--video",
        type=Path,
        default=VIDEO,
        help="Master to inspect in render mode (default: episode-04-full-v2.mp4)",
    )
    args = parser.parse_args()
    video = args.video

    floors = {}
    if not args.paths:
        for label, at in STILL_CONTROLS.items():
            if video.exists():
                floors[label] = swing(sample(video, at, args.seconds))
    peak_floor = max((p for p, _ in floors.values()), default=8.0)
    share_floor = max((s for _, s in floors.values()), default=0.02)

    if args.paths:
        print("NOISE FLOOR (explicit assets; conservative encoder baseline):")
    else:
        print(f"NOISE FLOOR (known-still holds in {video.name}):")
        for label, (peak, share) in floors.items():
            print(f"  {label:26s} peak {peak:6.1f}   moved {share:6.3f}%")
    print(f"  → floors: peak {peak_floor:.1f} · moved {share_floor:.3f}%")
    print("  Nothing at or under these is motion, whatever the clip is called.\n")

    results = {}
    if args.mode == "clips":
        print("LOOP ASSETS ON DISK")
        if args.paths:
            targets = {path.name: (path, None) for path in args.paths}
        else:
            targets = {k: (v, None) for k, v in LOOP_ASSETS.items()}
    else:
        if args.paths:
            parser.error("explicit paths are supported with mode 'clips'")
        if not video.is_file():
            parser.error(f"video does not exist: {video}")
        print(f"INSIDE {video.name}")
        targets = {k: (video, t) for k, t in RENDER_POINTS.items()}

    print(f"  {'beat':26s} {'peak':>6s}   {'moved':>8s}   verdict")
    for label, (path, at) in targets.items():
        if not path.exists():
            print(f"  {label:26s} MISSING: {path.name}")
            results[label] = None
            continue
        peak, share = swing(sample(path, at, args.seconds))
        # Both must clear the floor: something has to move, and enough of the frame
        # has to move that a viewer can see it.
        verdict = ("moving" if peak > peak_floor * 2 and share > max(share_floor * 4, 0.05)
                   else "STILL")
        print(f"  {label:26s} {peak:6.1f}   {share:7.3f}%   {verdict}")
        results[label] = {"peak": peak, "moved_percent": share, "verdict": verdict}

    if args.json:
        args.json.write_text(json.dumps(
            {"peak_floor": peak_floor, "share_floor": share_floor, "results": results}, indent=2))
        print(f"\nwrote {args.json}")


if __name__ == "__main__":
    main()
