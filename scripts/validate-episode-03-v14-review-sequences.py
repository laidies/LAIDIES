#!/usr/bin/env python3
"""Validate the deterministic Episode 03 v14 repair review packet."""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import cv2
import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
PACKET = ROOT / "operations/video-qa/episode-03-v14-repair-production-packet-2026-08-01"
MANIFEST = PACKET / "repair-production-manifest.json"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def fail(message: str) -> None:
    raise SystemExit(f"FAIL: {message}")


def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for authority in (data["parent_master"], data["captions"]):
        path = ROOT / authority["path"]
        if not path.exists() or sha256(path) != authority["sha256"]:
            fail(f"authority mismatch: {path}")

    for output in data["outputs"]:
        video = ROOT / output["path"]
        contact = ROOT / output["contact_sheet"]
        segments_contact = ROOT / output["all_segments_contact_sheet"]
        for path, expected in (
            (video, output["sha256"]),
            (contact, output["contact_sheet_sha256"]),
            (segments_contact, output["all_segments_contact_sheet_sha256"]),
        ):
            if not path.exists() or sha256(path) != expected:
                fail(f"output mismatch: {path}")

        segments = output["segments"]
        for left, right in zip(segments, segments[1:]):
            if abs(left["end"] - right["start"]) > 0.001:
                fail(f"segment gap in {output['id']}: {left['end']} -> {right['start']}")
        segment_duration = sum(segment["duration"] for segment in segments)
        if abs(segment_duration - output["duration_seconds"]) > 0.001:
            fail(f"segment duration mismatch in {output['id']}")

        capture = cv2.VideoCapture(str(video))
        width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = capture.get(cv2.CAP_PROP_FPS)
        frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
        capture.release()
        if (width, height) != (1920, 1080):
            fail(f"wrong dimensions for {video}: {width}x{height}")
        if not 29.9 <= fps <= 30.1:
            fail(f"wrong frame rate for {video}: {fps}")
        picture_duration = frames / fps
        max_picture_tail_shortfall = (2 / 30) + 0.01
        if picture_duration > output["duration_seconds"] + (1 / 30 + 0.01):
            fail(
                f"picture overruns audio boundary for {video}: "
                f"measured {picture_duration:.3f}, "
                f"expected {output['duration_seconds']:.3f}"
            )
        if output["duration_seconds"] - picture_duration > max_picture_tail_shortfall:
            fail(
                f"picture tail shortfall exceeds two-frame policy for {video}: "
                f"measured {picture_duration:.3f}, "
                f"expected {output['duration_seconds']:.3f}"
            )

        reader = imageio_ffmpeg.read_frames(str(video), pix_fmt="rgb24")
        metadata = next(reader)
        reader.close()
        container_duration = float(metadata["duration"])
        if abs(container_duration - output["duration_seconds"]) > 0.01:
            fail(
                f"container/audio duration mismatch for {video}: "
                f"measured {container_duration:.3f}, "
                f"expected {output['duration_seconds']:.3f}"
            )
        decode = subprocess.run(
            [FFMPEG, "-v", "error", "-i", str(video), "-f", "null", "-"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            text=True,
        )
        if decode.returncode or decode.stderr.strip():
            fail(f"decode failure for {video}: {decode.stderr.strip()}")

        print(
            f"PASS {output['id']}: {width}x{height}, {fps:.3f} fps, "
            f"picture {picture_duration:.3f}s / container {container_duration:.3f}s, "
            "audiovisual decode clean"
        )

    print("PASS: Episode 03 v14 repair review packet is internally consistent")


if __name__ == "__main__":
    main()
