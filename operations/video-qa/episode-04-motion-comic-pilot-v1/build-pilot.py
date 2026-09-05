#!/usr/bin/env python3
"""Build one narration-bound Episode 04 motion-comic pilot.

The source composition remains fixed. Only painted screen/indicator-light pixels
change, so a video model cannot redraw the room or introduce style drift.
"""

from __future__ import annotations

import hashlib
import json
import math
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
SOURCE = ROOT / "assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-a-start-comic-v1-locked-1920.png"
MASTER = ROOT / "assets/video/episode-04-full-v10-repaired-review.mp4"
SILENT = HERE / "ep04-ai-winter-motion-comic-pilot-v1-silent.mp4"
OUTPUT = HERE / "ep04-ai-winter-motion-comic-pilot-v1.mp4"
RECEIPT = HERE / "build-receipt.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

FPS = 30
DURATION = 15.27
FRAME_COUNT = round(FPS * DURATION)
W, H = 1920, 1080
SOURCE_START = 661.43


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def build_masks(base: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    yy, xx = np.mgrid[0:H, 0:W]

    # The one surviving CRT near the centre of the exact source frame.
    crt_box = (xx >= 875) & (xx <= 946) & (yy >= 438) & (yy <= 505)
    crt_colour = (base[..., 2] > 72) & (base[..., 2] > base[..., 0] * 1.18)
    crt = (crt_box & crt_colour).astype(np.float32)

    # Existing amber machine indicators only; no invented particles or overlays.
    indicators = (
        (base[..., 0] > 56)
        & (base[..., 0] > base[..., 1] * 1.20)
        & (base[..., 1] > base[..., 2] * 1.14)
        & (yy > 210)
        & (yy < 790)
    ).astype(np.float32)

    crt_blur = np.asarray(
        Image.fromarray((crt * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(18)),
        dtype=np.float32,
    ) / 255.0
    return crt[..., None], indicators[..., None], crt_blur[..., None]


def render_frame(
    base: np.ndarray,
    crt: np.ndarray,
    indicators: np.ndarray,
    spill: np.ndarray,
    frame_number: int,
) -> np.ndarray:
    t = frame_number / FPS

    # Establish the room, then let the CRT struggle in three irregular pulses.
    if t < 4.6:
        crt_level = 0.90 + 0.08 * math.sin(t * 2.3)
    elif t < 7.4:
        flicker = 0.52 + 0.48 * math.sin(t * 21.0) * math.sin(t * 7.1)
        crt_level = max(0.06, flicker) * (1.0 - 0.72 * smoothstep((t - 4.6) / 2.8))
    else:
        crt_level = 0.0

    # The funding drains across the actual indicator lights, bank by bank.
    indicator_level = 1.0 - smoothstep((t - 5.1) / 3.0)

    frame = base.copy()
    dark = np.array([5.0, 8.0, 12.0], dtype=np.float32)
    frame = frame * (1.0 - crt * (1.0 - crt_level)) + dark * crt * (1.0 - crt_level)
    frame = frame * (1.0 - indicators * (1.0 - indicator_level) * 0.94)

    # Dim only the CRT's existing painted spill as the monitor dies.
    frame = frame * (1.0 - spill * (1.0 - crt_level) * 0.34)
    return np.clip(frame, 0, 255).astype(np.uint8)


def verify_scope(base: np.ndarray, frames: list[np.ndarray], allowed: np.ndarray) -> dict:
    changed = np.zeros((H, W), dtype=bool)
    for frame in frames:
        changed |= np.max(np.abs(frame.astype(np.int16) - base.astype(np.int16)), axis=2) > 2
    outside = changed & ~allowed
    return {
        "changedPixels": int(changed.sum()),
        "changedPixelsOutsideAllowedRegion": int(outside.sum()),
        "pass": int(outside.sum()) == 0,
    }


def calibrated_scope_check(base: np.ndarray, allowed: np.ndarray) -> dict:
    bad = base.copy()
    bad[40:120, 40:120] = np.clip(bad[40:120, 40:120] + 40, 0, 255)
    result = verify_scope(base, [bad], allowed)
    if result["pass"]:
        raise RuntimeError("Scope checker calibration failed: known-bad frame was accepted")
    return {"knownBadRejected": True, "outsidePixelsDetected": result["changedPixelsOutsideAllowedRegion"]}


def encode(frames: list[np.ndarray]) -> None:
    cmd = [
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s:v", f"{W}x{H}",
        "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264",
        "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(SILENT),
    ]
    process = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    assert process.stdin is not None
    for frame in frames:
        process.stdin.write(np.ascontiguousarray(frame).tobytes())
    process.stdin.close()
    if process.wait() != 0:
        raise RuntimeError("Silent video encode failed")

    mux = [
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(SILENT), "-ss", f"{SOURCE_START:.2f}", "-t", f"{DURATION:.2f}",
        "-i", str(MASTER), "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
        str(OUTPUT),
    ]
    subprocess.run(mux, check=True)


def main() -> None:
    with Image.open(SOURCE) as image:
        if image.size != (W, H):
            raise ValueError(f"Expected {W}x{H}, got {image.size}")
        base = np.asarray(image.convert("RGB"), dtype=np.float32)

    crt, indicators, spill = build_masks(base)
    allowed = ((crt[..., 0] > 0) | (indicators[..., 0] > 0) | (spill[..., 0] > 0.002))
    calibration = calibrated_scope_check(base.astype(np.uint8), allowed)
    frames = [render_frame(base, crt, indicators, spill, index) for index in range(FRAME_COUNT)]
    scope = verify_scope(base.astype(np.uint8), frames, allowed)
    if not scope["pass"]:
        raise RuntimeError(f"Motion escaped allowed regions: {scope}")

    encode(frames)
    receipt = {
        "schema": "laidies.episode-motion-comic-pilot-receipt.v1",
        "status": "INTERNAL_REVIEW_REQUIRED",
        "scene": "Episode 04 scene 07 — AI winter",
        "narrationWindowSeconds": [SOURCE_START, round(SOURCE_START + DURATION, 2)],
        "motionClass": "one-shot irreversible failure then hold; never loop",
        "source": {"path": str(SOURCE.relative_to(ROOT)), "sha256": sha256(SOURCE)},
        "parentAudio": {"path": str(MASTER.relative_to(ROOT)), "sha256": sha256(MASTER)},
        "output": {
            "path": str(OUTPUT.relative_to(ROOT)),
            "sha256": sha256(OUTPUT),
            "geometry": "1920x1080",
            "fps": FPS,
            "durationSeconds": DURATION,
        },
        "motion": "The surviving CRT flickers and dies; existing amber indicator lights drain; all composition and geometry remain fixed.",
        "scopeCheckCalibration": calibration,
        "scopeCheck": scope,
        "releaseAuthority": False,
    }
    RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt, indent=2))


if __name__ == "__main__":
    main()
