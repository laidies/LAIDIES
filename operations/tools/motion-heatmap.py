#!/usr/bin/env python3
"""Show WHERE each motion loop moves, painted in red over the picture.

The standing rule is background motion only — lights, glass, rain, screens.
⛔ Never a face, a body, a hand, an expression.

No measurement can enforce that on its own. A loop that lights up a pair of
spectacles measures exactly like a loop that lights up a lamp; both are small,
bright and blinking. The only check that works is looking, so this makes looking
cheap: one command, one contact sheet, red on top of the artwork.

This caught the first pass of the scene loops, which flickered Grace's and
Karen's glasses and Ada's nose. The numbers all passed.

Usage:  python3 Website-homepage/operations/tools/motion-heatmap.py [--out PATH]
"""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

TILE_W, TILE_H = 760, 428
BOOST = 8  # red is travel x this, so a faint flicker is still visible on the sheet


def loops() -> dict[str, Path]:
    """Every loop the cut actually substitutes in, read from the build script."""
    import importlib.util

    spec = importlib.util.spec_from_file_location(
        "build_v2", ROOT / "assets/video/build-episode-04-full-v2-motion.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    found = {}
    for still, clip in module.LOOP_SUBSTITUTIONS.items():
        found[Path(still).stem.replace("ep04-", "")] = ROOT / "assets/episodes/ep-04/pixel" / clip
    for name in module.PLAY_ONCE_THEN_FREEZE:
        found[Path(name).stem.replace("ep04-", "")] = ROOT / "assets/episodes/ep-04/clips" / name
    return found


def frames(path: Path) -> list[np.ndarray]:
    raw = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
         "-vf", f"scale={TILE_W}:{TILE_H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True, check=True,
    ).stdout
    n = TILE_W * TILE_H * 3
    return [np.frombuffer(raw[i * n:(i + 1) * n], dtype=np.uint8)
            .reshape(TILE_H, TILE_W, 3).astype(float)
            for i in range(len(raw) // n)]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path,
                        default=ROOT / "operations/review-packets/ep04-motion-heatmap.png")
    args = parser.parse_args()

    tiles = []
    for label, path in sorted(loops().items()):
        if not path.exists():
            print(f"MISSING {label}: {path.name}")
            continue
        seq = frames(path)
        if len(seq) < 2:
            print(f"SKIP {label}: only {len(seq)} frame(s)")
            continue
        stack = np.stack(seq)
        travel = (stack.max(axis=0) - stack.min(axis=0)).mean(axis=2)
        heat = np.clip(travel * BOOST, 0, 255).astype(np.uint8)
        painted = seq[0].astype(np.uint8).copy()
        painted[..., 0] = np.clip(painted[..., 0].astype(int) + heat, 0, 255)
        painted[..., 1] = np.clip(painted[..., 1].astype(int) - heat // 2, 0, 255)
        painted[..., 2] = np.clip(painted[..., 2].astype(int) - heat // 2, 0, 255)
        tiles.append((label, Image.fromarray(painted), float(travel.max())))
        print(f"  {label:58s} max travel {travel.max():5.1f}")

    if not tiles:
        raise SystemExit("no loops found")

    sheet = Image.new("RGB", (TILE_W, (TILE_H + 22) * len(tiles)), (18, 10, 22))
    draw = ImageDraw.Draw(sheet)
    for i, (label, image, peak) in enumerate(tiles):
        y = i * (TILE_H + 22)
        draw.text((6, y + 6), f"{label}   — red = what moved (max {peak:.0f})",
                  fill=(255, 255, 255))
        sheet.paste(image, (0, y + 22))
    args.out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.out)
    print(f"\nwrote {args.out}")
    print("LOOK AT IT. Red on a face, hand or body is a fail, whatever the numbers say.")


if __name__ == "__main__":
    main()
