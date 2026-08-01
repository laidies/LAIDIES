#!/usr/bin/env python3
"""Technical validation for the shared SUNNYVAiLE transformation cue."""

from __future__ import annotations

import json
import re
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "operations/video-qa/town-entry-transformation-cue-v1"
MANIFEST = BASE / "episode-transformation-bindings.json"
OVERLAY = BASE / "sunnyvaile-town-entry-cue-overlay-v1.mov"
REVIEW = BASE / "episode-03-town-entry-cue-review-v1.mp4"
SOURCE = ROOT / "assets/episodes/ep-03/comic/ep03-cue08-canva-transformation-once-v2.mp4"


def inspect(ffmpeg: str, file: Path) -> str:
    result = subprocess.run(
        [ffmpeg, "-hide_banner", "-i", str(file)],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return result.stderr


def extract(ffmpeg: str, file: Path, seconds: float, output: Path) -> None:
    subprocess.run(
        [
            ffmpeg,
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-ss",
            str(seconds),
            "-i",
            str(file),
            "-frames:v",
            "1",
            "-vf",
            "format=rgba",
            str(output),
        ],
        cwd=ROOT,
        check=True,
    )


def mean_rgb_difference(left: Path, right: Path, box: tuple[int, int, int, int]) -> float:
    image_left = Image.open(left).convert("RGB").crop(box)
    image_right = Image.open(right).convert("RGB").crop(box)
    difference = ImageChops.difference(image_left, image_right)
    return sum(ImageStat.Stat(difference).mean) / 3.0


def main() -> None:
    errors: list[str] = []
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    manifest = json.loads(MANIFEST.read_text())

    overlay_info = inspect(ffmpeg, OVERLAY)
    review_info = inspect(ffmpeg, REVIEW)
    if "Video: qtrle" not in overlay_info or "1920x1080" not in overlay_info or "argb" not in overlay_info:
        errors.append("overlay is not a 1920x1080 qtrle alpha master")
    if "Audio:" in overlay_info:
        errors.append("overlay unexpectedly contains audio")
    if "Video: h264" not in review_info or "1920x1080" not in review_info:
        errors.append("review composite is not a 1920x1080 H.264 file")
    if "Audio:" in review_info:
        errors.append("review composite unexpectedly contains audio")

    duration_match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", overlay_info)
    if not duration_match:
        errors.append("overlay duration could not be read")
    else:
        duration = int(duration_match.group(1)) * 3600 + int(duration_match.group(2)) * 60 + float(duration_match.group(3))
        if not 4.90 <= duration <= 5.02:
            errors.append(f"overlay duration {duration:.3f}s is outside 4.90-5.02s")

    with tempfile.TemporaryDirectory(prefix="sunnyvaile-cue-validate-") as temporary:
        temp = Path(temporary)
        overlay_active = temp / "overlay-active.png"
        overlay_clear = temp / "overlay-clear.png"
        source_active = temp / "source-active.png"
        review_active = temp / "review-active.png"
        source_clear = temp / "source-clear.png"
        review_clear = temp / "review-clear.png"
        extract(ffmpeg, OVERLAY, 0.80, overlay_active)
        extract(ffmpeg, OVERLAY, 3.45, overlay_clear)
        extract(ffmpeg, SOURCE, 0.80, source_active)
        extract(ffmpeg, REVIEW, 0.80, review_active)
        extract(ffmpeg, SOURCE, 3.45, source_clear)
        extract(ffmpeg, REVIEW, 3.45, review_clear)

        active_alpha = Image.open(overlay_active).convert("RGBA").getchannel("A")
        active_box = active_alpha.getbbox()
        if not active_box:
            errors.append("cue has no visible alpha at 0.80s")
        elif active_box[0] < 0 or active_box[1] < 0 or active_box[2] > 960 or active_box[3] > 360:
            errors.append(f"cue alpha escapes the reserved upper-left safe region: {active_box}")
        if Image.open(overlay_clear).convert("RGBA").getchannel("A").getbbox() is not None:
            errors.append("cue has not fully cleared by 3.45s")

        active_difference = mean_rgb_difference(source_active, review_active, (60, 50, 960, 360))
        clear_difference = mean_rgb_difference(source_clear, review_clear, (60, 50, 960, 360))
        if active_difference < 8.0:
            errors.append(f"cue is not visibly present in the review composite ({active_difference:.2f})")
        if clear_difference > 7.0:
            errors.append(f"review composite does not return cleanly to the source after the cue ({clear_difference:.2f})")

    episode03 = next(item for item in manifest["bindings"] if item["content_id"] == "episode-03")
    if episode03["independent_review_status"] != "HOLD" or episode03["admission_status"] != "HOLD":
        errors.append("Episode 03 candidate must remain HOLD pending independent normal-speed review")
    if manifest["status"] != "HOLD":
        errors.append("manifest must remain HOLD while Episodes 01, 02 and 04 are unresolved")

    if errors:
        print("SUNNYVAiLE TOWN-ENTRY CUE TECHNICAL VALIDATION: FAIL")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print("SUNNYVAiLE TOWN-ENTRY CUE TECHNICAL VALIDATION: PASS")
    print("- exact silent alpha master: 1920x1080, 30 fps, approximately 4.97s")
    print("- cue visible in reserved upper-left region and fully cleared by 3.45s")
    print("- Episode 03 exact-source review candidate remains independent-review HOLD")


if __name__ == "__main__":
    main()
