#!/usr/bin/env python3
"""Build a bounded Blend & Snap practical-light settle proof.

The canonical still remains the source of every output pixel. The only changed
pixels are existing light-source neighbourhoods; no object, lettering, person,
vehicle, particle or weather layer is introduced.
"""

import hashlib
import json
import math
import shutil
import subprocess
import tempfile
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parent
WEBSITE = ROOT.parents[2]
SOURCE = WEBSITE / "assets/codex-map-refs-20260705/building-heroes/08-blend-and-snap.png"
FRAMES = ROOT / "controlled-frames"
OUTPUT = ROOT / "shared-outro-blend-snap-light-settle-proof-v1.mp4"
FFMPEG = Path(
    "/Users/alisoneakin/Library/Python/3.9/lib/python/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FPS = 30
DURATION_SECONDS = 4.9
TOTAL_FRAMES = round(FPS * DURATION_SECONDS)

# Existing under-awning bulbs and interior pendant bulbs in the 1664 x 936
# canonical still. These positions are source-bound, not invented elements.
SMALL_LIGHTS = [
    (335, 371), (406, 371), (477, 371), (548, 371), (619, 371),
    (690, 371), (762, 371), (835, 371), (907, 371), (979, 371),
    (1051, 371), (1124, 371), (1197, 371), (1269, 371), (1340, 371),
]
PENDANT_LIGHTS = [(517, 448), (632, 416), (1080, 445), (1219, 447)]
STATE_LEVELS = [0.42, 0.70, 1.0]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def ease(value: float) -> float:
    return (1 - math.cos(math.pi * value)) / 2


def make_mask(height: int, width: int) -> np.ndarray:
    mask = np.zeros((height, width), dtype=np.uint8)
    for center in SMALL_LIGHTS:
        cv2.circle(mask, center, 15, 255, -1, lineType=cv2.LINE_AA)
    for center in PENDANT_LIGHTS:
        cv2.circle(mask, center, 34, 255, -1, lineType=cv2.LINE_AA)
    return cv2.GaussianBlur(mask, (0, 0), sigmaX=5.0, sigmaY=5.0)


def light_state(source: np.ndarray, mask: np.ndarray, level: float) -> np.ndarray:
    alpha = (mask.astype(np.float32) / 255.0) * (1.0 - level)
    result = source.copy()
    active = mask > 0
    source_float = source.astype(np.float32)
    adjusted = source_float * (1.0 - alpha[:, :, None])
    result[active] = np.clip(adjusted[active], 0, 255).astype(np.uint8)
    return result


def main() -> None:
    source = cv2.imread(str(SOURCE), cv2.IMREAD_COLOR)
    if source is None:
        raise SystemExit(f"Could not read canonical still: {SOURCE}")
    height, width = source.shape[:2]
    if (width, height) != (1664, 936):
        raise SystemExit(f"Unexpected source geometry: {width}x{height}")
    if not FFMPEG.is_file():
        raise SystemExit(f"Missing ffmpeg binary: {FFMPEG}")

    FRAMES.mkdir(parents=True, exist_ok=True)
    mask = make_mask(height, width)
    states = [light_state(source, mask, level) for level in STATE_LEVELS]
    state_paths = []
    for index, state in enumerate(states, start=1):
        path = FRAMES / f"light-state-{index:02d}.png"
        if not cv2.imwrite(str(path), state):
            raise SystemExit(f"Could not write {path}")
        state_paths.append(path)

    changed = np.any(states[0] != source, axis=2)
    changed_pixels = int(changed.sum())
    outside = int(np.logical_and(changed, mask == 0).sum())
    render_dir = Path(tempfile.mkdtemp(prefix="blend-snap-light-settle-"))
    decoded = []
    try:
        for number in range(TOTAL_FRAMES):
            seconds = number / FPS
            if seconds < 0.8:
                amount = ease(seconds / 0.8)
                frame = cv2.addWeighted(states[0], 1 - amount, states[1], amount, 0)
            elif seconds < 1.8:
                amount = ease((seconds - 0.8) / 1.0)
                frame = cv2.addWeighted(states[1], 1 - amount, states[2], amount, 0)
            else:
                frame = source.copy()
            phase = number / (TOTAL_FRAMES - 1)
            zoom = 1.0 + 0.02 * ease(phase)
            focus_x = width * 0.5
            focus_y = height * 0.28
            transform = np.array(
                [
                    [zoom, 0, focus_x * (1 - zoom)],
                    [0, zoom, focus_y * (1 - zoom)],
                ],
                dtype=np.float64,
            )
            frame = cv2.warpAffine(
                frame,
                transform,
                (width, height),
                flags=cv2.INTER_LANCZOS4,
                borderMode=cv2.BORDER_REPLICATE,
            )
            decoded.append(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY).astype(np.float32))
            if not cv2.imwrite(str(render_dir / f"frame-{number + 1:04d}.png"), frame):
                raise SystemExit("Could not write render frame")

        steps = np.array([
            np.abs(decoded[index] - decoded[index - 1]).mean()
            for index in range(1, len(decoded))
        ])
        accelerations = np.abs(np.diff(steps))
        subprocess.run(
            [
                str(FFMPEG), "-y", "-framerate", str(FPS),
                "-i", str(render_dir / "frame-%04d.png"),
                "-c:v", "libx264", "-preset", "slow", "-crf", "17",
                "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    finally:
        shutil.rmtree(render_dir, ignore_errors=True)

    report = {
        "source": str(SOURCE.relative_to(WEBSITE)),
        "source_sha256": sha256(SOURCE),
        "output": str(OUTPUT.relative_to(WEBSITE)),
        "output_sha256": sha256(OUTPUT),
        "geometry": f"{width}x{height}",
        "fps": FPS,
        "frames": TOTAL_FRAMES,
        "duration_seconds": TOTAL_FRAMES / FPS,
        "motion_class": "one-shot practical-light settle plus smooth 2 percent sign-directed camera push",
        "controlled_state_levels": STATE_LEVELS,
        "controlled_frames": [
            {"path": str(path.relative_to(WEBSITE)), "sha256": sha256(path)}
            for path in state_paths
        ],
        "changed_pixels": changed_pixels,
        "changed_percent": round(changed_pixels * 100 / (width * height), 4),
        "changed_pixels_outside_light_mask": outside,
        "raw_step_median": round(float(np.median(steps)), 4),
        "raw_step_p90": round(float(np.percentile(steps, 90)), 4),
        "raw_step_max": round(float(steps.max()), 4),
        "raw_acceleration_p90": round(float(np.percentile(accelerations, 90)), 4),
        "raw_acceleration_max": round(float(accelerations.max()), 4),
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
