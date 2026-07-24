#!/usr/bin/env python3
"""Create visual keyframe and transition-proof sheets for a review film."""

from __future__ import annotations

import argparse
import io
import math
import re
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FONT = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
THUMB_W, THUMB_H = 480, 270
LABEL_H = 34


def resolve(value: Path) -> Path:
    return value if value.is_absolute() else ROOT / value


def duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        capture_output=True,
        text=True,
        check=False,
    )
    match = re.search(r"Duration:\s+(\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not probe duration: {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def frame(path: Path, at: float) -> Image.Image:
    raw = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{max(at, 0):.3f}",
            "-i",
            str(path),
            "-frames:v",
            "1",
            "-vf",
            f"scale={THUMB_W}:{THUMB_H}:force_original_aspect_ratio=increase,"
            f"crop={THUMB_W}:{THUMB_H}",
            "-f",
            "image2pipe",
            "-vcodec",
            "png",
            "-",
        ],
        capture_output=True,
        check=True,
    ).stdout
    return Image.open(io.BytesIO(raw)).convert("RGB")


def timestamp(value: float) -> str:
    minutes = int(value // 60)
    seconds = value - minutes * 60
    return f"{minutes:02d}:{seconds:05.2f}"


def font(size: int) -> ImageFont.ImageFont:
    if FONT.exists():
        return ImageFont.truetype(str(FONT), size)
    return ImageFont.load_default()


def labelled(image: Image.Image, text: str) -> Image.Image:
    tile = Image.new("RGB", (THUMB_W, THUMB_H + LABEL_H), "#07102c")
    tile.paste(image, (0, 0))
    draw = ImageDraw.Draw(tile)
    draw.text((12, THUMB_H + 6), text, fill="#fffdf7", font=font(18))
    return tile


def save_grid(tiles: list[Image.Image], columns: int, out: Path) -> None:
    if out.exists():
        raise FileExistsError(f"Refusing to overwrite: {out}")
    rows = math.ceil(len(tiles) / columns)
    sheet = Image.new(
        "RGB",
        (columns * THUMB_W, rows * (THUMB_H + LABEL_H)),
        "#07102c",
    )
    for index, tile in enumerate(tiles):
        x = (index % columns) * THUMB_W
        y = (index // columns) * (THUMB_H + LABEL_H)
        sheet.paste(tile, (x, y))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, "PNG", optimize=True)


def parse_times(value: str) -> list[float]:
    return [float(item.strip()) for item in value.split(",") if item.strip()]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--video", required=True, type=Path)
    parser.add_argument("--keyframes-out", required=True, type=Path)
    parser.add_argument("--transitions-out", required=True, type=Path)
    parser.add_argument(
        "--times",
        help="Comma-separated keyframe seconds; defaults to twelve even samples",
    )
    parser.add_argument(
        "--boundaries",
        required=True,
        help="Comma-separated transition boundaries in seconds",
    )
    args = parser.parse_args()

    video = resolve(args.video)
    keyframes_out = resolve(args.keyframes_out)
    transitions_out = resolve(args.transitions_out)
    if not video.is_file():
        raise FileNotFoundError(video)
    runtime = duration(video)
    times = (
        parse_times(args.times)
        if args.times
        else [(index + 0.5) * runtime / 12 for index in range(12)]
    )
    boundaries = parse_times(args.boundaries)
    if not boundaries:
        raise RuntimeError("At least one transition boundary is required")

    keyframe_tiles = [
        labelled(frame(video, at), timestamp(at)) for at in times
    ]
    save_grid(keyframe_tiles, 4, keyframes_out)

    offsets = [-0.30, -0.15, 0.0, 0.15, 0.30]
    transition_tiles = []
    for boundary in boundaries:
        for offset in offsets:
            at = boundary + offset
            transition_tiles.append(
                labelled(
                    frame(video, at),
                    f"{timestamp(boundary)} {offset:+.2f}s",
                )
            )
    save_grid(transition_tiles, len(offsets), transitions_out)
    print(keyframes_out)
    print(transitions_out)


if __name__ == "__main__":
    main()
