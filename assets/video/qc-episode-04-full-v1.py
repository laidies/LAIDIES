#!/usr/bin/env python3
"""Frame-accurate QC for the cue-locked Episode 04 full video."""

from __future__ import annotations

import io
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[2]
FFMPEG = (
    Path.home()
    / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
DEFAULT_VIDEO = ROOT / "assets/video/.episode-04-full-v1-capcut-source.mp4"
CUES = json.loads(
    (ROOT / "content/episodes/episode-04-cues.json").read_text(encoding="utf-8")
)["cues"]


def extract(video: Path, at: float) -> Image.Image:
    command = [
        str(FFMPEG),
        "-hide_banner",
        "-loglevel",
        "error",
        "-ss",
        f"{at:.3f}",
        "-i",
        str(video),
        "-frames:v",
        "1",
        "-f",
        "image2pipe",
        "-vcodec",
        "png",
        "-",
    ]
    result = subprocess.run(command, check=True, stdout=subprocess.PIPE)
    return Image.open(io.BytesIO(result.stdout)).convert("RGB")


def expected(cue: dict) -> Image.Image:
    source = ROOT / cue["src"].split("?", 1)[0].lstrip("/")
    image = Image.open(source).convert("RGB")
    image.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (1920, 1080), "black")
    canvas.paste(image, ((1920 - image.width) // 2, (1080 - image.height) // 2))
    return canvas


def mean_difference(a: Image.Image, b: Image.Image) -> float:
    return sum(ImageStat.Stat(ImageChops.difference(a, b)).mean) / 3


def main() -> int:
    video = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_VIDEO
    if not video.is_file():
        raise FileNotFoundError(video)

    failures: list[str] = []
    checkpoints = [18, 21, 24, 27, 31, 34, 37, 42]
    for index in checkpoints:
        cue = CUES[index]
        actual = extract(video, cue["t"] + 0.12)
        difference = mean_difference(actual, expected(cue))
        status = "PASS" if difference < 8 else "FAIL"
        print(f"{status} card @{cue['t']:7.2f}s difference={difference:5.2f} {cue.get('label','')}")
        if status == "FAIL":
            failures.append(f"card {cue['t']}")

    narrative_checkpoints = [29, 30, 39]
    for index in narrative_checkpoints:
        cue = CUES[index]
        actual = extract(video, cue["t"] + 0.60)
        difference = mean_difference(actual, expected(cue))
        status = "PASS" if difference < 8 else "FAIL"
        print(f"{status} beat @{cue['t']:7.2f}s difference={difference:5.2f} {cue.get('label','')}")
        if status == "FAIL":
            failures.append(f"beat {cue['t']}")

    ada_a = extract(video, 251.30)
    ada_b = extract(video, 261.30)
    loop_difference = mean_difference(ada_a, ada_b)
    loop_status = "PASS" if loop_difference < 5 else "FAIL"
    print(f"{loop_status} Ada 0.5x 10s repeat difference={loop_difference:5.2f}")
    if loop_status == "FAIL":
        failures.append("Ada repeat")

    for index in checkpoints:
        cue = CUES[index]
        before = extract(video, cue["t"] - 0.05)
        brightness = sum(ImageStat.Stat(before).mean) / 3
        status = "PASS" if brightness < 45 else "FAIL"
        print(f"{status} pre-card dip @{cue['t']:7.2f}s brightness={brightness:5.2f}")
        if status == "FAIL":
            failures.append(f"dip {cue['t']}")

    if failures:
        print("QC FAILURES: " + ", ".join(failures))
        return 1
    print("QC PASS: checkpoints, era cards, Ada repeat, and pre-card dips verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
