#!/usr/bin/env python3
"""Frame-accurate QC for the EP04 v2 motion master."""

from __future__ import annotations

import io
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[2]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
DEFAULT_VIDEO = ROOT / "assets/video/episode-04-full-v2.mp4"
CUES = json.loads((ROOT / "content/episodes/episode-04-cues.json").read_text())["cues"]


def extract(video: Path, at: float) -> Image.Image:
    result = subprocess.run(
        [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-ss", f"{at:.3f}",
            "-i", str(video), "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-",
        ],
        check=True,
        stdout=subprocess.PIPE,
    )
    return Image.open(io.BytesIO(result.stdout)).convert("RGB")


def expected(cue: dict) -> Image.Image:
    source = ROOT / cue["src"].split("?", 1)[0].lstrip("/")
    image = Image.open(source).convert("RGB")
    image.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (1920, 1080), "black")
    canvas.paste(image, ((1920 - image.width) // 2, (1080 - image.height) // 2))
    return canvas


def difference(a: Image.Image, b: Image.Image) -> float:
    return sum(ImageStat.Stat(ImageChops.difference(a, b)).mean) / 3


def window_travel(video: Path, start: float, seconds: float = 5.0, level: int = 16) -> int:
    """Pixels that move by `level` or more at ANY point across the window.

    Two things this has to get right, both of which an earlier version got wrong:

    1. Ambient light is LOCAL. ENIAC's lamps are ~3,500 pixels of 2,073,600, so a
       whole-frame mean stays at zero however hard they flicker. Count pixels, not
       average brightness.
    2. It has to be a WINDOW, not two samples. The loops are 5s sine breathes; two
       point-samples can land at the same phase and report a working loop as still,
       which is exactly what happened to the desk loop.

    Same instrument as operations/tools/measure-motion.py, deliberately."""
    width, height = 480, 270
    raw = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", "-ss", f"{start:.3f}",
         "-i", str(video), "-t", f"{seconds:.3f}",
         "-vf", f"fps=4,scale={width}:{height}", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
        check=True, stdout=subprocess.PIPE,
    ).stdout
    n = width * height
    frames = [np.frombuffer(raw[i * n:(i + 1) * n], dtype=np.uint8).astype(np.int16)
              for i in range(len(raw) // n)]
    if len(frames) < 2:
        return 0
    stack = np.stack(frames)
    travel = stack.max(axis=0) - stack.min(axis=0)
    # Scaled back up to full-frame pixel counts so the numbers stay comparable.
    return int((travel >= level).sum() * (1920 * 1080) / n)


def brightness(image: Image.Image, box=None) -> float:
    if box:
        image = image.crop(box)
    return sum(ImageStat.Stat(image).mean) / 3


def probe(video: Path) -> tuple[float, str]:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(video), "-frames:v", "1", "-f", "null", "-"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not match:
        raise RuntimeError("Could not read duration")
    h, m, s = match.groups()
    duration = int(h) * 3600 + int(m) * 60 + float(s)
    stream = next(line.strip() for line in result.stderr.splitlines() if "Video:" in line)
    return duration, stream


def main() -> int:
    video = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_VIDEO
    if not video.is_file():
        raise FileNotFoundError(video)
    failures: list[str] = []

    duration, stream = probe(video)
    runtime_ok = abs(duration - 1222.40) < 0.02
    format_ok = "1920x1080" in stream and "30 fps" in stream and "h264" in stream.lower()
    print(f"{'PASS' if runtime_ok else 'FAIL'} runtime={duration:.2f}s")
    print(f"{'PASS' if format_ok else 'FAIL'} stream={stream}")
    if not runtime_ok:
        failures.append("runtime")
    if not format_ok:
        failures.append("format")

    card_indices = [17, 20, 23, 26, 30, 37, 40, 45]
    for index in card_indices:
        cue = CUES[index]
        actual = extract(video, cue["t"] + 0.45)
        delta = difference(actual, expected(cue))
        ok = delta < 10
        print(f"{'PASS' if ok else 'FAIL'} card @{cue['t']:7.2f}s delta={delta:5.2f} {cue.get('label','')}")
        if not ok:
            failures.append(f"card {cue['t']}")

        before = extract(video, cue["t"] - 0.05)
        level = brightness(before)
        center_level = brightness(before, (640, 300, 1280, 780))
        bloom_ok = center_level > 58
        print(
            f"{'PASS' if bloom_ok else 'FAIL'} pre-card bloom @{cue['t']:7.2f}s "
            f"full={level:5.2f} center={center_level:5.2f}"
        )
        if not bloom_ok:
            failures.append(f"bloom {cue['t']}")

    # The actual words run 04:01.24–04:02.78 in the narration file.
    before_soft = extract(video, 241.20)
    after_soft = extract(video, 242.82)
    before_level = brightness(before_soft)
    after_level = brightness(after_soft)
    dim_ok = after_level < before_level * 0.90
    print(f"{'PASS' if dim_ok else 'FAIL'} lights-soft brightness {before_level:.2f} -> {after_level:.2f}")
    if not dim_ok:
        failures.append("lights-soft")

    # Ada's panel gains relative exposure while the heroine/hall remains down.
    portal_box = (80, 20, 930, 900)
    heroine_box = (1080, 245, 1510, 1040)
    wake_frame = extract(video, 243.55)
    portal_ratio_before = brightness(before_soft, portal_box) / brightness(before_soft, heroine_box)
    portal_ratio_after = brightness(wake_frame, portal_box) / brightness(wake_frame, heroine_box)
    wake_ok = portal_ratio_after > portal_ratio_before * 1.06
    print(
        f"{'PASS' if wake_ok else 'FAIL'} window-wake relative exposure "
        f"{portal_ratio_before:.3f} -> {portal_ratio_after:.3f}"
    )
    if not wake_ok:
        failures.append("window-wake")

    # Calibrate against holds that are KNOWN to be a plain PNG. A fixed bar cannot
    # tell motion from encoder noise -- the previous bar was 0.02, which is below the
    # noise floor, so it passed five loops of which four were effectively still.
    still_holds = [(63.0, "unease"), (1010.0, "splash dim"), (1090.0, "cocktail")]
    still_counts = [window_travel(video, at) for at, _ in still_holds]
    noise = max(still_counts)
    threshold = max(noise * 4, 800)
    print(f"     motion floor: still holds move {min(still_counts)}-{noise} px"
          f" → a loop must move more than {threshold} px")

    motion_holds = [
        (14.0, "title"), (41.0, "desk"), (140.0, "directory"),
        (202.0, "approach"), (220.0, "hall"),
        # Scene ambient loops (ep04-capcut-motion-brief.md).
        (300.0, "ada b-mid"), (442.3, "eniac"), (575.0, "grace b-mid"),
        (681.7, "karen"), (971.6, "kate"), (843.8, "desk again"),
    ]
    for start, label in motion_holds:
        moved = window_travel(video, start + 1.0)
        ok = moved > threshold
        print(f"{'PASS' if ok else 'FAIL'} motion {label:11s} "
              f"{moved:8d} px moved (floor {threshold})")
        if not ok:
            failures.append(f"motion {label}")

    critical_indices = [28, 29, 42]
    for index in critical_indices:
        cue = CUES[index]
        actual = extract(video, cue["t"] + 0.60)
        delta = difference(actual, expected(cue))
        ok = delta < 10
        print(f"{'PASS' if ok else 'FAIL'} beat @{cue['t']:7.2f}s delta={delta:5.2f} {cue.get('label','')}")
        if not ok:
            failures.append(f"beat {cue['t']}")

    # Ada plays ONCE then freezes. Cue 18 runs 250.30-300.00; the 5s clip at half speed
    # covers 250.30-260.30, and 260.30-300.00 must be her own final frame, held.
    # Two assertions, because either alone can pass while the other is broken:
    # she has to actually move during playback, and be perfectly still afterwards.
    # Compared RELATIVE to her own playback, not to a still-PNG floor. A frozen VIDEO
    # frame is re-encoded at different GOP positions, so it differs from itself by a
    # couple of levels of quantisation noise even when nothing whatsoever moves.
    playing = difference(extract(video, 252.00), extract(video, 258.00))
    frozen = difference(extract(video, 265.00), extract(video, 295.00))
    plays_ok = playing > 5.0
    freeze_ok = frozen < playing * 0.10
    print(f"{'PASS' if plays_ok else 'FAIL'} Ada plays  252s->258s delta={playing:6.3f} "
          f"(must exceed 5.0)")
    print(f"{'PASS' if freeze_ok else 'FAIL'} Ada frozen 265s->295s delta={frozen:6.3f} "
          f"(must be under 10% of playback = {playing * 0.10:.3f}) — no repeat, no drift")
    if not plays_ok:
        failures.append("Ada does not play")
    if not freeze_ok:
        failures.append("Ada still moving after its one pass")

    if failures:
        print("QC FAILURES: " + ", ".join(failures))
        return 1
    print("QC PASS: runtime, cards, blooms, opening motion, sync beats, and Ada repeat verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
