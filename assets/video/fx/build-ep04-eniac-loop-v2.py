#!/usr/bin/env python3
"""Build the approved five-second ENIAC indicator-light production loop.

This extracts the ENIAC treatment approved in the v7 narration proof into a
reusable, silent 1080p loop. Only detected source-size lamp pixels animate.
The six women are restored from the untouched source frame on every frame.
"""

from __future__ import annotations

import importlib.util
import subprocess
from pathlib import Path

import numpy as np


HERE = Path(__file__).resolve().parent
PROOF_SCRIPT = HERE / "build-ep04-timejump-eniac-proof-v7.py"

spec = importlib.util.spec_from_file_location("eniac_proof_v7", PROOF_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {PROOF_SCRIPT}")
proof = importlib.util.module_from_spec(spec)
spec.loader.exec_module(proof)

OUTPUT = (
    proof.v1.PIXEL
    / "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920-loop-v2.mp4"
)


def encode_loop() -> int:
    if OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite production loop: {OUTPUT}")
    for path in (
        proof.v1.ENIAC,
        proof.PERSON_MASK_FILE,
        proof.v1.FFMPEG,
        PROOF_SCRIPT,
    ):
        if not path.is_file():
            raise FileNotFoundError(path)

    base = proof.v1.load_rgb(proof.v1.ENIAC)
    people = proof.complete_people_mask()
    core, group_map, states, offsets, accepted = proof.lamp_layers(base, people)
    if accepted < 220:
        raise RuntimeError(f"Too few full-machine ENIAC lamps: {accepted}")

    command = [
        str(proof.v1.FFMPEG),
        "-n",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s",
        f"{proof.v1.W}x{proof.v1.H}",
        "-r",
        str(proof.v1.FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "16",
        "-profile:v",
        "high",
        "-level",
        "4.1",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(proof.v1.FPS),
        "-movflags",
        "+faststart",
        str(OUTPUT),
    ]
    encoder = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert encoder.stdin is not None
    try:
        frame_count = round(proof.LOOP_SECONDS * proof.v1.FPS)
        for frame_number in range(frame_count):
            seconds = frame_number / proof.v1.FPS
            frame = proof.machine_frame(
                base,
                people,
                core,
                group_map,
                states,
                offsets,
                seconds,
            )
            encoder.stdin.write(
                np.clip(frame, 0.0, 255.0).astype(np.uint8).tobytes()
            )
    finally:
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError("ENIAC loop encode failed")
    return accepted


def verify() -> None:
    result = subprocess.run(
        [
            str(proof.v1.FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(OUTPUT),
            "-f",
            "null",
            "-",
        ],
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError("ENIAC loop decode verification failed")


def main() -> None:
    accepted = encode_loop()
    verify()
    print(f"small full-machine ENIAC lamps: {accepted}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
