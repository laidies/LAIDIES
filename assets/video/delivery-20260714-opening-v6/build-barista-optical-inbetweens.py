#!/usr/bin/env python3
"""Create motion-compensated cup/arm in-betweens from ordered approved poses."""

from pathlib import Path

import cv2
import numpy as np


HERE = Path(__file__).resolve().parent
SHOTS = HERE / "shots"
ANCHORS = [
    SHOTS / "opening-09-barista-cup-down-v3.png",
    SHOTS / "opening-09-barista-cup-quarter-v6.png",
    SHOTS / "opening-09-barista-cup-true-mid-v5.png",
    SHOTS / "opening-09-barista-cup-upper-mid-v7.png",
    SHOTS / "opening-09-barista-cup-three-quarter-v6.png",
]


def flow(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    small_a = cv2.resize(a, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    small_b = cv2.resize(b, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    ga = cv2.cvtColor(small_a, cv2.COLOR_BGR2GRAY)
    gb = cv2.cvtColor(small_b, cv2.COLOR_BGR2GRAY)
    f = cv2.calcOpticalFlowFarneback(ga, gb, None, 0.5, 5, 25, 5, 7, 1.5, 0)
    f = cv2.resize(f, (a.shape[1], a.shape[0]), interpolation=cv2.INTER_LINEAR) * 2.0
    return f


def warp(image: np.ndarray, displacement: np.ndarray, amount: float) -> np.ndarray:
    h, w = image.shape[:2]
    x, y = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    return cv2.remap(
        image, x - displacement[..., 0] * amount, y - displacement[..., 1] * amount,
        cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT,
    )


def main() -> None:
    frames: list[np.ndarray] = []
    for index in range(len(ANCHORS) - 1):
        a = cv2.imread(str(ANCHORS[index]), cv2.IMREAD_COLOR)
        b = cv2.imread(str(ANCHORS[index + 1]), cv2.IMREAD_COLOR)
        if a is None or b is None:
            raise SystemExit(f"Missing anchor: {ANCHORS[index]} or {ANCHORS[index + 1]}")
        if a.shape != b.shape:
            b = cv2.resize(b, (a.shape[1], a.shape[0]), interpolation=cv2.INTER_LANCZOS4)
        forward = flow(a, b)
        backward = flow(b, a)
        if index == 0:
            frames.append(a)
        for t in (1 / 3, 2 / 3, 1.0):
            if t == 1.0:
                frame = b
            else:
                wa = warp(a, forward, t)
                wb = warp(b, backward, 1.0 - t)
                frame = cv2.addWeighted(wa, 1.0 - t, wb, t, 0)
            frames.append(frame)
    for index, frame in enumerate(frames):
        cv2.imwrite(str(SHOTS / f"opening-09-barista-motion-{index:02d}-v7.png"), frame)
    print(f"wrote {len(frames)} ordered frames")


if __name__ == "__main__":
    main()
