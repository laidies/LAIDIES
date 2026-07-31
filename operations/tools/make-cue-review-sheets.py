#!/usr/bin/env python3
"""Render every film placement into labelled owner-review contact sheets.

The technical QA sheets sample a film. These sheets show every cue/placement
so a human continuity pass can find only the frames that genuinely need art or
timing repair. Each thumbnail is taken safely inside the placement, away from
its transition.
"""

from __future__ import annotations

import argparse
import io
import json
import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FONT_REGULAR = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
FONT_BOLD = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
THUMB_W, THUMB_H = 400, 225
LABEL_H = 70
COLS, ROWS = 4, 5
PER_PAGE = COLS * ROWS


def resolve(value: Path) -> Path:
    return value if value.is_absolute() else ROOT / value


def font(path: Path, size: int) -> ImageFont.ImageFont:
    if path.is_file():
        return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def frame(video: Path, at: float) -> Image.Image:
    raw = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{max(at, 0):.3f}",
            "-i",
            str(video),
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


def review_time(placement: dict[str, object]) -> float:
    start = float(placement["start"])
    stop = float(placement["stop"])
    span = stop - start
    # Keep a meaningful distance from both the incoming and outgoing blend.
    inset = min(max(span * 0.25, 0.75), 2.0)
    return min(start + inset, start + span / 2)


def source_label(placement: dict[str, object]) -> str:
    source = Path(str(placement.get("source", ""))).stem
    return source if len(source) <= 46 else f"{source[:43]}..."


def tile(video: Path, placement: dict[str, object]) -> Image.Image:
    at = review_time(placement)
    image = frame(video, at)
    out = Image.new("RGB", (THUMB_W, THUMB_H + LABEL_H), "#07102c")
    out.paste(image, (0, 0))
    draw = ImageDraw.Draw(out)
    cue = placement.get("cue", "?")
    mode = str(placement.get("mode", ""))
    draw.text(
        (10, THUMB_H + 7),
        f"CUE {cue} · {timestamp(at)} · {mode.upper()}",
        fill="#ff72bb" if mode != "still" else "#65e7ee",
        font=font(FONT_BOLD, 17),
    )
    draw.text(
        (10, THUMB_H + 34),
        source_label(placement),
        fill="#fffdf7",
        font=font(FONT_REGULAR, 15),
    )
    return out


def save_page(
    tiles: list[Image.Image],
    out: Path,
    title: str,
    page: int,
    total_pages: int,
) -> None:
    if out.exists():
        raise FileExistsError(f"Refusing to overwrite: {out}")
    header_h = 58
    sheet = Image.new(
        "RGB",
        (COLS * THUMB_W, header_h + ROWS * (THUMB_H + LABEL_H)),
        "#07102c",
    )
    draw = ImageDraw.Draw(sheet)
    draw.text(
        (14, 13),
        f"{title} · OWNER CONTINUITY SHEET {page}/{total_pages}",
        fill="#fffdf7",
        font=font(FONT_BOLD, 24),
    )
    for index, item in enumerate(tiles):
        x = (index % COLS) * THUMB_W
        y = header_h + (index // COLS) * (THUMB_H + LABEL_H)
        sheet.paste(item, (x, y))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, "PNG", optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--video", required=True, type=Path)
    parser.add_argument("--report", required=True, type=Path)
    parser.add_argument("--out-dir", required=True, type=Path)
    parser.add_argument("--prefix", required=True)
    parser.add_argument("--title", required=True)
    args = parser.parse_args()

    video = resolve(args.video)
    report = resolve(args.report)
    out_dir = resolve(args.out_dir)
    if not video.is_file():
        raise FileNotFoundError(video)
    if not report.is_file():
        raise FileNotFoundError(report)
    placements = json.loads(report.read_text(encoding="utf-8")).get("placements", [])
    if not placements:
        raise RuntimeError("QA report has no placements")
    pages = math.ceil(len(placements) / PER_PAGE)
    outputs: list[str] = []
    for page in range(pages):
        chunk = placements[page * PER_PAGE : (page + 1) * PER_PAGE]
        rendered = [tile(video, placement) for placement in chunk]
        output = out_dir / f"{args.prefix}-owner-review-{page + 1:02d}.png"
        save_page(rendered, output, args.title, page + 1, pages)
        outputs.append(str(output))
    print(
        json.dumps(
            {
                "video": str(video.relative_to(ROOT)),
                "report": str(report.relative_to(ROOT)),
                "placement_count": len(placements),
                "page_count": pages,
                "outputs": outputs,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
