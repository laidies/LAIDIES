#!/usr/bin/env python3
"""Build the bounded Episode 1 writing-motion proof on a fixed canvas."""

import json
import math
import shutil
import subprocess
import tempfile
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
OUTPUT = ROOT / "ep01-corporate-footnotes-writing-loop-v1.mp4"
FFMPEG = Path(
    "/Users/alisoneakin/Library/Python/3.9/lib/python/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FPS = 30
FRAMES_PER_TRANSITION = 30
STATE_NUMBERS = [1, 2, 3, 2, 1]
TOTAL_FRAMES = (len(STATE_NUMBERS) - 1) * FRAMES_PER_TRANSITION + 1


def ease_in_out(value: float) -> float:
    return (1 - math.cos(math.pi * value)) / 2


def build_frame(states, number: int):
    if number == TOTAL_FRAMES - 1:
        blended = states[0].copy()
    else:
        segment = number // FRAMES_PER_TRANSITION
        step = number % FRAMES_PER_TRANSITION
        amount = ease_in_out(step / FRAMES_PER_TRANSITION)
        blended = cv2.addWeighted(
            states[segment], 1 - amount, states[segment + 1], amount, 0
        )

    height, width = blended.shape[:2]
    phase = number / (TOTAL_FRAMES - 1)
    zoom = 1 + 0.025 * ((1 - math.cos(2 * math.pi * phase)) / 2)
    focus_x = width * 0.46
    focus_y = height * 0.58
    transform = np.array(
        [
            [zoom, 0, focus_x * (1 - zoom)],
            [0, zoom, focus_y * (1 - zoom)],
        ],
        dtype=np.float64,
    )
    return cv2.warpAffine(
        blended,
        transform,
        (width, height),
        flags=cv2.INTER_LANCZOS4,
        borderMode=cv2.BORDER_REPLICATE,
    )


def main():
    states = [cv2.imread(str(FRAMES / f"frame-{number:02d}.png")) for number in STATE_NUMBERS]
    if any(frame is None for frame in states):
        raise SystemExit("Missing one or more controlled source frames")
    if any(frame.shape != states[0].shape for frame in states[1:]):
        raise SystemExit("Controlled source frames do not share identical geometry")

    render_dir = Path(tempfile.mkdtemp(prefix="ep01-writing-loop-"))
    decoded = []
    try:
        for number in range(TOTAL_FRAMES):
            frame = build_frame(states, number)
            decoded.append(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY).astype(np.float32))
            target = render_dir / f"frame-{number + 1:04d}.png"
            if not cv2.imwrite(str(target), frame):
                raise SystemExit(f"Could not write {target}")

        steps = np.array(
            [np.abs(decoded[index] - decoded[index - 1]).mean() for index in range(1, len(decoded))]
        )
        accelerations = np.abs(np.diff(steps))
        seam = float(np.abs(decoded[-1] - decoded[0]).mean())

        subprocess.run(
            [
                str(FFMPEG),
                "-y",
                "-framerate", str(FPS),
                "-i", str(render_dir / "frame-%04d.png"),
                "-vf", "crop=trunc(iw/2)*2:trunc(ih/2)*2",
                "-c:v", "libx264",
                "-preset", "slow",
                "-crf", "17",
                "-pix_fmt", "yuv420p",
                "-movflags", "+faststart",
                str(OUTPUT),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    finally:
        shutil.rmtree(render_dir, ignore_errors=True)

    print(json.dumps({
        "output": str(OUTPUT),
        "fps": FPS,
        "frames": TOTAL_FRAMES,
        "duration_seconds": TOTAL_FRAMES / FPS,
        "source_sequence": STATE_NUMBERS,
        "easing": "cosine ease-in-out",
        "camera_move": "2.5% fixed-canvas fractional push toward Heroine/report, then exact return",
        "raw_step_median": round(float(np.median(steps)), 3),
        "raw_step_p90": round(float(np.percentile(steps, 90)), 3),
        "raw_step_max": round(float(steps.max()), 3),
        "raw_acceleration_p90": round(float(np.percentile(accelerations, 90)), 3),
        "raw_acceleration_max": round(float(accelerations.max()), 3),
        "raw_seam": round(seam, 3),
    }))


if __name__ == "__main__":
    main()
