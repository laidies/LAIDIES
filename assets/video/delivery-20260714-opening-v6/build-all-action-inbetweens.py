#!/usr/bin/env python3
"""Build dense, ordered motion-compensated frames for every physical action."""

from pathlib import Path

import cv2
import numpy as np


HERE = Path(__file__).resolve().parent
SHOTS = HERE / "shots"
SEQUENCES = {
    "heroine": [
        SHOTS / "opening-02-heroine-bright-yellow-natural-hands-v13.png",
        SHOTS / "opening-02-heroine-camera-smile-v14.png",
    ],
    "dj": [
        SHOTS / "opening-05-dj-sunnyv-no-face-artifact-v2.png",
        SHOTS / "opening-05-dj-headphone-mic-action-v3.png",
    ],
    "mayor": [
        SHOTS / "opening-06-mayor-deb-clean-paper-v16.png",
        SHOTS / "opening-06-mayor-deb-stamp-contact-v16.png",
        SHOTS / "opening-06-mayor-deb-stamp-release-v16.png",
    ],
    "fairy": [
        SHOTS / "opening-08-fairy-letter-raised-v2.png",
        SHOTS / "opening-08-fairy-godmother-house-continuity.png",
    ],
    "jeeves": [
        SHOTS / "opening-10-miss-jeeves-approved-wide.png",
        SHOTS / "opening-10-miss-jeeves-files-card-v2.png",
    ],
    "crew": [
        SHOTS / "opening-11-crew-conversation-v16.png",
        SHOTS / "opening-11-crew-turn-halfway-v16.png",
        SHOTS / "opening-11-crew-camera-smiles-v16.png",
    ],
}


def flow(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    sa = cv2.resize(a, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    sb = cv2.resize(b, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    ga = cv2.cvtColor(sa, cv2.COLOR_BGR2GRAY)
    gb = cv2.cvtColor(sb, cv2.COLOR_BGR2GRAY)
    result = cv2.calcOpticalFlowFarneback(ga, gb, None, 0.5, 5, 25, 5, 7, 1.5, 0)
    return cv2.resize(result, (a.shape[1], a.shape[0]), interpolation=cv2.INTER_LINEAR) * 2.0


def warp(image: np.ndarray, displacement: np.ndarray, amount: float) -> np.ndarray:
    h, w = image.shape[:2]
    x, y = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    return cv2.remap(image, x - displacement[..., 0] * amount,
                     y - displacement[..., 1] * amount, cv2.INTER_CUBIC,
                     borderMode=cv2.BORDER_REFLECT)


def build(name: str, paths: list[Path]) -> None:
    output: list[np.ndarray] = []
    for index, (pa, pb) in enumerate(zip(paths, paths[1:])):
        a, b = cv2.imread(str(pa)), cv2.imread(str(pb))
        if a is None or b is None:
            raise SystemExit(f"Missing action anchor: {pa} or {pb}")
        if a.shape != b.shape:
            b = cv2.resize(b, (a.shape[1], a.shape[0]), interpolation=cv2.INTER_LANCZOS4)
        forward, backward = flow(a, b), flow(b, a)
        if index == 0:
            output.append(a)
        for t in (1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1.0):
            if t == 1.0:
                frame = b
            else:
                frame = cv2.addWeighted(warp(a, forward, t), 1.0 - t,
                                        warp(b, backward, 1.0 - t), t, 0)
            output.append(frame)
    for index, frame in enumerate(output):
        cv2.imwrite(str(SHOTS / f"opening-{name}-motion-{index:02d}-v15.png"), frame)
    print(f"{name}: {len(output)} ordered frames")


if __name__ == "__main__":
    for sequence_name, anchors in SEQUENCES.items():
        build(sequence_name, anchors)
