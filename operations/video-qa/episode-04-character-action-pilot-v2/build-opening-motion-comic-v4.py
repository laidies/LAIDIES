#!/usr/bin/env python3
"""Build the locked-composition successor to the rejected v3 opening proof."""

from __future__ import annotations

import argparse
import importlib.util
import math
import sys
from pathlib import Path

import cv2
import numpy as np


HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location(
    "opening_motion_v3", HERE / "build-opening-motion-comic-v3.py"
)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Could not load the v3 builder")
base = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = base
SPEC.loader.exec_module(base)


def source_pixel_pulse(
    image: np.ndarray,
    region: tuple[int, int, int, int],
    seconds: float,
    *,
    kind: str,
    phase: float,
    strength: float,
) -> np.ndarray:
    """Brighten only source pixels that already belong to a light or mark."""
    x1, y1, x2, y2 = region
    area = image[y1:y2, x1:x2]
    b, g, r = cv2.split(area)
    if kind == "cyan":
        selected = (b > 80) & (g > 65) & (b > r * 1.12)
        tint = np.array([255.0, 215.0, 90.0], dtype=np.float32)
    elif kind == "green":
        selected = (g > 68) & (g > r * 1.05) & (g > b * 0.95)
        tint = np.array([90.0, 230.0, 135.0], dtype=np.float32)
    elif kind == "red":
        selected = (r > 78) & (r > g * 1.12) & (r > b * 1.08)
        tint = np.array([70.0, 95.0, 230.0], dtype=np.float32)
    elif kind == "gold":
        selected = (r > 100) & (g > 58) & (r > b * 1.25)
        tint = np.array([35.0, 205.0, 255.0], dtype=np.float32)
    else:
        raise ValueError(kind)
    mask = cv2.GaussianBlur(selected.astype(np.float32), (0, 0), 1.8)
    pulse = 0.5 + 0.5 * math.sin(seconds * 3.4 + phase)
    alpha = mask[..., None] * strength * base.smoothstep(pulse)
    result = image.copy()
    result[y1:y2, x1:x2] = np.clip(area * (1.0 - alpha) + tint * alpha, 0, 255)
    return result


def travelling_gold_trace(image: np.ndarray, seconds: float) -> np.ndarray:
    area = image[430:1080, 0:1920]
    b, g, r = cv2.split(area)
    selected = (r > 100) & (g > 58) & (r > b * 1.28)
    _yy, xx = np.mgrid[0:area.shape[0], 0:area.shape[1]]
    centre = ((seconds - 19.72) * 255.0) % 2300.0 - 190.0
    band = np.exp(-((xx - centre) / 115.0) ** 2).astype(np.float32)
    alpha = cv2.GaussianBlur(selected.astype(np.float32), (0, 0), 1.4) * band * 0.68
    tint = np.empty_like(area)
    tint[:] = (35.0, 215.0, 255.0)
    result = image.copy()
    result[430:1080, 0:1920] = np.clip(
        area * (1.0 - alpha[..., None]) + tint * alpha[..., None], 0, 255
    )
    return result


def panel_focus(
    image: np.ndarray,
    regions: list[tuple[int, int, int, int]],
    weights: list[float],
) -> np.ndarray:
    """Keep the complete page visible while clearly activating one panel."""
    result = image.copy()
    for (x1, y1, x2, y2), weight in zip(regions, weights):
        amount = 0.78 + 0.25 * float(np.clip(weight, 0.0, 1.0))
        result[y1:y2, x1:x2] = np.clip(result[y1:y2, x1:x2] * amount, 0, 255)
    return result


def moving_focus(seconds: float, centres: list[float], width: float = 1.15) -> list[float]:
    raw = [math.exp(-((seconds - centre) / width) ** 2) for centre in centres]
    largest = max(raw)
    return [value / largest for value in raw]


def recap_locked(base_image: np.ndarray, seconds: float) -> np.ndarray:
    regions = [(0, 0, 650, 1080), (650, 0, 1230, 1080), (1230, 0, 1920, 1080)]
    if seconds < 12.4:
        weights = moving_focus(seconds, [2.9, 7.3, 10.7], 1.55)
    else:
        weights = [0.0, 0.0, 1.0]
    frame = panel_focus(base_image, regions, weights)
    if seconds < 6.2:
        frame = source_pixel_pulse(frame, (20, 100, 650, 780), seconds, kind="cyan", phase=0.0, strength=0.52)
    elif seconds < 12.4:
        frame = source_pixel_pulse(frame, (650, 300, 1230, 1000), seconds, kind="red", phase=0.8, strength=0.44)
    else:
        frame = source_pixel_pulse(frame, (1220, 40, 1910, 1020), seconds, kind="green", phase=1.4, strength=0.50)
        frame = source_pixel_pulse(frame, (1220, 40, 1910, 1020), seconds, kind="red", phase=0.2, strength=0.25)
    return frame


def this_week_locked(base_image: np.ndarray, seconds: float) -> np.ndarray:
    local = seconds - 19.72
    upper = [(0, 0, 430, 760), (430, 0, 950, 760), (950, 0, 1430, 760), (1430, 0, 1920, 760)]
    weights = moving_focus(local, [1.7, 4.4, 7.2, 9.6], 1.35)
    frame = panel_focus(base_image, upper, weights)
    frame = travelling_gold_trace(frame, seconds)
    frame = source_pixel_pulse(frame, (430, 80, 1030, 690), seconds, kind="gold", phase=0.1, strength=0.42)
    frame = source_pixel_pulse(frame, (930, 70, 1500, 680), seconds, kind="gold", phase=2.0, strength=0.30)
    return frame


base.recap_frame = recap_locked
base.this_week_frame = this_week_locked


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--master", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    base.build(args.master.resolve(), args.output.resolve())
    print(args.output.resolve())


if __name__ == "__main__":
    main()
