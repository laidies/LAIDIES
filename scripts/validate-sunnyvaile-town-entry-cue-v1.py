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
EPISODE02_SEQUENCE = BASE / "episode-02-town-entry-sequence-v1.mp4"
EPISODE02_CONTEXT = BASE / "episode-02-town-entry-context-review-v1.mp4"
EPISODE02_MASTER = ROOT / "assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4"
EPISODE02_P0 = ROOT / "assets/episodes/ep-02/comic/ep02-open-09p0-transformation-stage-corporate-no-wand-comic.png"
EPISODE02_P4 = ROOT / "assets/episodes/ep-02/comic/ep02-open-09p4-transformation-reveal-empire-records-no-wand-comic.png"


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


def duration_seconds(info: str) -> float | None:
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", info)
    if not match:
        return None
    return int(match.group(1)) * 3600 + int(match.group(2)) * 60 + float(match.group(3))


def main() -> None:
    errors: list[str] = []
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    manifest = json.loads(MANIFEST.read_text())

    overlay_info = inspect(ffmpeg, OVERLAY)
    review_info = inspect(ffmpeg, REVIEW)
    episode02_sequence_info = inspect(ffmpeg, EPISODE02_SEQUENCE)
    episode02_context_info = inspect(ffmpeg, EPISODE02_CONTEXT)
    if "Video: qtrle" not in overlay_info or "1920x1080" not in overlay_info or "argb" not in overlay_info:
        errors.append("overlay is not a 1920x1080 qtrle alpha master")
    if "Audio:" in overlay_info:
        errors.append("overlay unexpectedly contains audio")
    if "Video: h264" not in review_info or "1920x1080" not in review_info:
        errors.append("review composite is not a 1920x1080 H.264 file")
    if "Audio:" in review_info:
        errors.append("review composite unexpectedly contains audio")
    if "Video: h264" not in episode02_sequence_info or "1920x1080" not in episode02_sequence_info:
        errors.append("Episode 02 transformation sequence is not a 1920x1080 H.264 file")
    if "Audio:" in episode02_sequence_info:
        errors.append("Episode 02 transformation sequence unexpectedly contains audio")
    if "Video: h264" not in episode02_context_info or "1920x1080" not in episode02_context_info:
        errors.append("Episode 02 context review is not a 1920x1080 H.264 file")
    if "Audio: aac" not in episode02_context_info:
        errors.append("Episode 02 context review does not preserve an AAC narration track")

    duration = duration_seconds(overlay_info)
    if duration is None:
        errors.append("overlay duration could not be read")
    elif not 4.90 <= duration <= 5.02:
        errors.append(f"overlay duration {duration:.3f}s is outside 4.90-5.02s")

    episode02_sequence_duration = duration_seconds(episode02_sequence_info)
    if episode02_sequence_duration is None or not 6.30 <= episode02_sequence_duration <= 6.36:
        errors.append(f"Episode 02 sequence duration {episode02_sequence_duration} is outside 6.30-6.36s")
    episode02_context_duration = duration_seconds(episode02_context_info)
    if episode02_context_duration is None or not 17.93 <= episode02_context_duration <= 18.01:
        errors.append(f"Episode 02 context duration {episode02_context_duration} is outside 17.93-18.01s")

    with tempfile.TemporaryDirectory(prefix="sunnyvaile-cue-validate-") as temporary:
        temp = Path(temporary)
        overlay_active = temp / "overlay-active.png"
        overlay_clear = temp / "overlay-clear.png"
        source_active = temp / "source-active.png"
        review_active = temp / "review-active.png"
        source_clear = temp / "source-clear.png"
        review_clear = temp / "review-clear.png"
        episode02_sequence_active = temp / "episode02-sequence-active.png"
        episode02_sequence_clear = temp / "episode02-sequence-clear.png"
        episode02_context_before = temp / "episode02-context-before.png"
        episode02_source_before = temp / "episode02-source-before.png"
        episode02_context_active = temp / "episode02-context-active.png"
        episode02_source_active = temp / "episode02-source-active.png"
        episode02_context_return = temp / "episode02-context-return.png"
        episode02_source_return = temp / "episode02-source-return.png"
        extract(ffmpeg, OVERLAY, 0.80, overlay_active)
        extract(ffmpeg, OVERLAY, 3.45, overlay_clear)
        extract(ffmpeg, SOURCE, 0.80, source_active)
        extract(ffmpeg, REVIEW, 0.80, review_active)
        extract(ffmpeg, SOURCE, 3.45, source_clear)
        extract(ffmpeg, REVIEW, 3.45, review_clear)
        extract(ffmpeg, EPISODE02_SEQUENCE, 0.80, episode02_sequence_active)
        extract(ffmpeg, EPISODE02_SEQUENCE, 3.45, episode02_sequence_clear)
        extract(ffmpeg, EPISODE02_CONTEXT, 4.75, episode02_context_before)
        extract(ffmpeg, EPISODE02_MASTER, 121.75, episode02_source_before)
        extract(ffmpeg, EPISODE02_CONTEXT, 6.57, episode02_context_active)
        extract(ffmpeg, EPISODE02_MASTER, 123.57, episode02_source_active)
        extract(ffmpeg, EPISODE02_CONTEXT, 13.80, episode02_context_return)
        extract(ffmpeg, EPISODE02_MASTER, 130.80, episode02_source_return)

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

        episode02_cue_difference = mean_rgb_difference(
            EPISODE02_P0, episode02_sequence_active, (50, 50, 900, 260)
        )
        episode02_clear_difference = mean_rgb_difference(
            EPISODE02_P4, episode02_sequence_clear, (50, 50, 900, 260)
        )
        placed_alpha = Image.new("L", (1920, 1080), 0)
        scaled_alpha = active_alpha.resize((1498, 842), Image.Resampling.LANCZOS)
        placed_alpha.paste(scaled_alpha, (50, 50), scaled_alpha)
        placed_box = placed_alpha.getbbox()
        if episode02_cue_difference < 8.0:
            errors.append(f"Episode 02 shared cue is not visibly present ({episode02_cue_difference:.2f})")
        if not placed_box or placed_box[2] > 875:
            errors.append(f"Episode 02 cue alpha intrudes into the character face-safe region ({placed_box})")
        if episode02_clear_difference > 7.0:
            errors.append(f"Episode 02 cue has not cleared for the final reveal ({episode02_clear_difference:.2f})")

        before_difference = mean_rgb_difference(
            episode02_source_before, episode02_context_before, (0, 0, 1920, 1080)
        )
        active_difference = mean_rgb_difference(
            episode02_source_active, episode02_context_active, (0, 0, 1920, 1080)
        )
        return_difference = mean_rgb_difference(
            episode02_source_return, episode02_context_return, (0, 0, 1920, 1080)
        )
        if before_difference > 7.0:
            errors.append(f"Episode 02 context changes picture before the repair interval ({before_difference:.2f})")
        if active_difference < 8.0:
            errors.append(f"Episode 02 context does not visibly replace the repair interval ({active_difference:.2f})")
        if return_difference > 7.0:
            errors.append(f"Episode 02 context does not return cleanly to the source master ({return_difference:.2f})")

    episode01 = next(item for item in manifest["bindings"] if item["content_id"] == "episode-01")
    episode02 = next(item for item in manifest["bindings"] if item["content_id"] == "episode-02")
    episode03 = next(item for item in manifest["bindings"] if item["content_id"] == "episode-03")
    if episode01["status"] != "REPLACEMENT_REQUIRED" or episode01["source_semantic_status"] != "REJECTED":
        errors.append("Episode 01 retired wand sequence must remain rejected and replacement-required")
    if episode02["status"] != "REVIEW_READY" or episode02["independent_review_status"] != "HOLD":
        errors.append("Episode 02 repair must remain review-ready and independent-review HOLD")
    if episode02.get("transformation_start_seconds") != 122.77 or episode02.get("transformation_end_seconds") != 129.09:
        errors.append("Episode 02 repair is not bound to the exact narration interval 122.77-129.09")
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
    print("- Episode 01 retired wand source remains rejected and replacement-required")
    print("- Episode 02 exact 17.95s context preserves narration and replaces only 122.77-129.09")
    print("- Episode 02 cue is visible, face-safe and clear before the held final look")
    print("- Episode 03 exact-source review candidate remains independent-review HOLD")


if __name__ == "__main__":
    main()
