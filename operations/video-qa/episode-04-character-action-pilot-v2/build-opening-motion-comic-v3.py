#!/usr/bin/env python3
"""Build a narration-bound Episode 04 opening motion-comic proof.

The source artwork is never regenerated. Motion is limited to editorial
framing and detected source-native light pixels inside the existing panels.
"""

from __future__ import annotations

import argparse
import math
import subprocess
import tempfile
from pathlib import Path

import cv2
import imageio_ffmpeg
import numpy as np


FPS = 30
WIDTH = 1920
HEIGHT = 1080
DURATION = 40.2


def smoothstep(value: float) -> float:
    value = float(np.clip(value, 0.0, 1.0))
    return value * value * (3.0 - 2.0 * value)


def read_frame(capture: cv2.VideoCapture, seconds: float) -> np.ndarray:
    capture.set(cv2.CAP_PROP_POS_MSEC, seconds * 1000.0)
    ok, frame = capture.read()
    if not ok:
        raise RuntimeError(f"Could not read source frame at {seconds:.3f}s")
    if frame.shape[:2] != (HEIGHT, WIDTH):
        raise RuntimeError(f"Unexpected source geometry: {frame.shape}")
    return frame.astype(np.float32)


def crop_to_frame(image: np.ndarray, rect: tuple[float, float, float, float]) -> np.ndarray:
    x1, y1, x2, y2 = rect
    target_ratio = WIDTH / HEIGHT
    crop_width = x2 - x1
    crop_height = y2 - y1
    if crop_width / crop_height > target_ratio:
        needed = crop_width / target_ratio
        centre = (y1 + y2) / 2.0
        y1, y2 = centre - needed / 2.0, centre + needed / 2.0
    else:
        needed = crop_height * target_ratio
        centre = (x1 + x2) / 2.0
        x1, x2 = centre - needed / 2.0, centre + needed / 2.0
    x1 = max(0.0, min(x1, WIDTH - 2.0))
    y1 = max(0.0, min(y1, HEIGHT - 2.0))
    x2 = max(x1 + 2.0, min(x2, WIDTH))
    y2 = max(y1 + 2.0, min(y2, HEIGHT))
    crop = image[round(y1):round(y2), round(x1):round(x2)]
    return cv2.resize(crop, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)


def interpolate_rect(
    start: tuple[float, float, float, float],
    end: tuple[float, float, float, float],
    amount: float,
) -> tuple[float, float, float, float]:
    u = smoothstep(amount)
    return tuple(a + (b - a) * u for a, b in zip(start, end))


def detected_light_motion(
    image: np.ndarray,
    region: tuple[int, int, int, int],
    seconds: float,
    *,
    color: str,
    strength: float,
) -> np.ndarray:
    """Pulse only bright pixels already present inside a bounded source region."""
    x1, y1, x2, y2 = region
    area = image[y1:y2, x1:x2]
    b, g, r = cv2.split(area)
    if color == "cyan":
        mask = (b > 85) & (g > 70) & (b > r * 1.15)
    elif color == "gold":
        mask = (r > 105) & (g > 65) & (r > b * 1.35)
    elif color == "green":
        mask = (g > 75) & (g > r * 1.08) & (g > b * 1.02)
    else:
        raise ValueError(color)
    mask_u8 = (mask.astype(np.uint8) * 255)
    mask_u8 = cv2.GaussianBlur(mask_u8, (0, 0), 2.2)
    mask_f = mask_u8.astype(np.float32) / 255.0
    # Two incommensurate rhythms avoid a synchronized on/off look.
    pulse = 0.52 + 0.30 * math.sin(seconds * 3.1) + 0.18 * math.sin(seconds * 7.7 + 0.9)
    amount = strength * max(0.0, pulse)
    tint = np.zeros_like(area)
    if color == "cyan":
        tint[:] = (255.0, 205.0, 70.0)
    elif color == "gold":
        tint[:] = (42.0, 188.0, 255.0)
    else:
        tint[:] = (95.0, 225.0, 135.0)
    alpha = mask_f[..., None] * amount
    result = image.copy()
    result[y1:y2, x1:x2] = np.clip(area * (1.0 - alpha) + tint * alpha, 0, 255)
    return result


def recap_frame(base: np.ndarray, seconds: float) -> np.ndarray:
    full = (0.0, 0.0, WIDTH, HEIGHT)
    left = (0.0, 55.0, 685.0, 1040.0)
    middle = (610.0, 30.0, 1300.0, 1050.0)
    right = (1190.0, 35.0, 1920.0, 1055.0)
    if seconds < 5.876:
        rect = interpolate_rect(full, left, seconds / 5.876)
    elif seconds < 8.9:
        rect = interpolate_rect(left, middle, (seconds - 5.876) / 3.024)
    elif seconds < 12.28:
        rect = interpolate_rect(middle, right, (seconds - 8.9) / 3.38)
    elif seconds < 13.26:
        rect = right
    else:
        rect = interpolate_rect(right, (1125.0, 20.0, 1920.0, 1060.0), (seconds - 13.26) / 5.48)
    animated = detected_light_motion(base, (0, 90, 650, 760), seconds, color="cyan", strength=0.34)
    animated = detected_light_motion(animated, (1230, 40, 1910, 1020), seconds, color="green", strength=0.25)
    return crop_to_frame(animated, rect)


def this_week_frame(base: np.ndarray, seconds: float) -> np.ndarray:
    local = seconds - 19.72
    full = (0.0, 0.0, WIDTH, HEIGHT)
    left = (0.0, 0.0, 590.0, 840.0)
    centre_left = (430.0, 0.0, 1040.0, 850.0)
    centre_right = (900.0, 0.0, 1510.0, 850.0)
    right = (1330.0, 0.0, 1920.0, 850.0)
    silhouettes = (260.0, 430.0, 1680.0, 1080.0)
    if local < 2.6:
        rect = interpolate_rect(full, left, local / 2.6)
    elif local < 5.2:
        rect = interpolate_rect(left, centre_left, (local - 2.6) / 2.6)
    elif local < 8.0:
        rect = interpolate_rect(centre_left, centre_right, (local - 5.2) / 2.8)
    elif local < 10.5:
        rect = interpolate_rect(centre_right, right, (local - 8.0) / 2.5)
    else:
        rect = interpolate_rect(right, silhouettes, (local - 10.5) / 6.32)
    animated = detected_light_motion(base, (0, 260, 1920, 1080), seconds, color="gold", strength=0.28)
    return crop_to_frame(animated, rect)


def title_frame(base: np.ndarray, seconds: float) -> np.ndarray:
    local = seconds - 37.12
    full = (0.0, 0.0, WIDTH, HEIGHT)
    close = (95.0, 40.0, 1840.0, 1025.0)
    rect = interpolate_rect(full, close, local / 3.08)
    animated = detected_light_motion(base, (0, 0, 1920, 1080), seconds, color="gold", strength=0.32)
    return crop_to_frame(animated, rect)


def crossfade(a: np.ndarray, b: np.ndarray, amount: float) -> np.ndarray:
    u = smoothstep(amount)
    return a * (1.0 - u) + b * u


def build(master: Path, output: Path) -> None:
    if not master.is_file():
        raise FileNotFoundError(master)
    output.parent.mkdir(parents=True, exist_ok=True)
    capture = cv2.VideoCapture(str(master))
    if not capture.isOpened():
        raise RuntimeError(f"Could not open {master}")
    recap = read_frame(capture, 2.0)
    this_week = read_frame(capture, 25.0)
    title = read_frame(capture, 38.0)
    capture.release()

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    with tempfile.TemporaryDirectory(prefix="ep04-opening-motion-") as temp:
        silent = Path(temp) / "silent.mp4"
        encoder = subprocess.Popen(
            [
                ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
                "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{WIDTH}x{HEIGHT}",
                "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264",
                "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p",
                "-r", str(FPS), "-movflags", "+faststart", str(silent),
            ],
            stdin=subprocess.PIPE,
        )
        assert encoder.stdin is not None
        for index in range(round(DURATION * FPS)):
            seconds = index / FPS
            if seconds < 19.72:
                frame = recap_frame(recap, seconds)
                if 19.37 <= seconds:
                    frame = crossfade(frame, this_week_frame(this_week, 19.72), (seconds - 19.37) / 0.35)
            elif seconds < 37.12:
                frame = this_week_frame(this_week, seconds)
                if 36.77 <= seconds:
                    frame = crossfade(frame, title_frame(title, 37.12), (seconds - 36.77) / 0.35)
            else:
                frame = title_frame(title, seconds)
            encoder.stdin.write(np.clip(frame, 0, 255).astype(np.uint8).tobytes())
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError("Silent video encode failed")

        subprocess.run(
            [
                ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
                "-i", str(silent), "-i", str(master), "-map", "0:v:0", "-map", "1:a:0",
                "-t", f"{DURATION:.3f}", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                "-movflags", "+faststart", str(output),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--master", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    build(args.master.resolve(), args.output.resolve())
    print(args.output.resolve())


if __name__ == "__main__":
    main()
