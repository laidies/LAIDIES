#!/usr/bin/env python3
"""Repair beat 13's correct abstract-stage clip without using the banned street shot.

The existing clip's corporate-to-cloud animation is retained through 3.97s. Its
very fast final reveal is replaced by a smooth dissolve to the clip's own fully
revealed frame, which then holds through 5.00s. The protected source is read-only.
"""

from __future__ import annotations

import subprocess
from pathlib import Path

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets/episodes/ep-04/pixel/ep04-open-15p-transformation-comic-event-v1.mp4"
OUTPUT = (
    ROOT
    / "assets/episodes/ep-04/pixel/delivery-20260722-animation-v5-brief-correction"
    / SOURCE.name
)
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
WIDTH = 1920
HEIGHT = 1080
FPS = 30
FRAME_COUNT = 150
REVEAL_START = 119
REVEAL_END = 144


def read_frames() -> list[np.ndarray]:
    capture = cv2.VideoCapture(str(SOURCE))
    frames: list[np.ndarray] = []
    while len(frames) < FRAME_COUNT:
        ok, frame = capture.read()
        if not ok:
            break
        frames.append(frame)
    capture.release()
    if len(frames) < FRAME_COUNT:
        raise RuntimeError(f"Expected at least {FRAME_COUNT} frames, got {len(frames)}")
    if frames[0].shape[:2] != (HEIGHT, WIDTH):
        raise ValueError(f"Expected 1920x1080, got {frames[0].shape[1]}x{frames[0].shape[0]}")
    return frames


def main() -> None:
    if not SOURCE.is_file():
        raise FileNotFoundError(SOURCE)
    if OUTPUT.exists():
        raise FileExistsError(OUTPUT)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    frames = read_frames()
    cloud = frames[REVEAL_START]
    revealed = frames[REVEAL_END]

    command = [
        str(FFMPEG),
        "-n",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "bgr24",
        "-s",
        f"{WIDTH}x{HEIGHT}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "17",
        "-profile:v",
        "high",
        "-level:v",
        "4.1",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(FPS),
        "-movflags",
        "+faststart",
        str(OUTPUT),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for index in range(FRAME_COUNT):
            if index <= REVEAL_START:
                output_frame = frames[index]
            elif index < REVEAL_END:
                amount = (index - REVEAL_START) / (REVEAL_END - REVEAL_START)
                amount = amount * amount * (3.0 - 2.0 * amount)
                output_frame = cv2.addWeighted(cloud, 1.0 - amount, revealed, amount, 0.0)
            else:
                output_frame = revealed
            process.stdin.write(output_frame.tobytes())
        process.stdin.close()
        return_code = process.wait()
    except Exception:
        process.kill()
        process.wait()
        raise
    if return_code:
        raise RuntimeError(f"ffmpeg failed with code {return_code}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
