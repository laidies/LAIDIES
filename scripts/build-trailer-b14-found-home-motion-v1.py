#!/usr/bin/env python3
"""Build the isolated Trailer B14 "found her way home" review sequence.

The sequence uses only the approved Trailer multicolour heroine sources:

1. Delta LAi Nu exterior for "I live here";
2. the existing walking motion for "I found this place"; and
3. the Delta exterior again for "Most residents do."

It carries the exact B14 audio excerpt from the frozen Trailer v5 master so the
picture/narration relationship can be judged at the real clock.  The output is
local review evidence only and grants no acceptance or release authority.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

BASE = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v5-welcome-ident-review-1920.mp4"
HOME = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/trailer-b14-delta-lai-nu-heroine-blue-eyes-trailer-outfit-comic-v3-1920.png"
WALK = ROOT / "assets/episodes/trailer/comic/delivery/heroine-blue-eyes-trailer-outfit-final/trailer-b05-reporting-back-comic-v1-1920-motion.mp4"

OUT_DIR = ROOT / "operations/video-qa/trailer-b14-found-home-motion-v1"
OUTPUT = OUT_DIR / "trailer-b14-found-home-multicolour-review-v1.mp4"
CONTACT = OUT_DIR / "trailer-b14-found-home-multicolour-review-v1-contact.jpg"
MANIFEST = OUT_DIR / "manifest.json"

START = 195.233333
END = 205.166667
DURATION = END - START
FPS = 30


def run(args: list[str]) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    return {
        "path": str(path.relative_to(ROOT)),
        "sha256": sha256(path),
        "size_bytes": path.stat().st_size,
    }


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def build() -> None:
    # The stills get restrained 2% opposing pans, while the centre section
    # uses the already-authored walking motion. The semantic scene change—not
    # a zoom effect—is what carries the narration.
    filters = (
        "[0:v]scale=1960:1103,crop=1920:1080:x='20*t/2.7':y=11.5,"
        "fps=30,setsar=1,settb=AVTB,trim=duration=2.7,setpts=PTS-STARTPTS[home_a];"
        "[1:v]scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,fps=30,"
        "trim=start=1.0:duration=4.3,setsar=1,settb=AVTB,setpts=PTS-STARTPTS[walk];"
        "[2:v]scale=1960:1103,crop=1920:1080:x='20-20*t/2.933334':y=11.5,"
        "fps=30,setsar=1,settb=AVTB,trim=duration=2.933334,setpts=PTS-STARTPTS[home_b];"
        "[home_a][walk][home_b]concat=n=3:v=1:a=0[v]"
    )
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error",
        "-framerate", str(FPS), "-loop", "1", "-i", str(HOME),
        "-i", str(WALK),
        "-framerate", str(FPS), "-loop", "1", "-i", str(HOME),
        "-ss", f"{START:.6f}", "-t", f"{DURATION:.6f}", "-i", str(BASE),
        "-filter_complex", filters,
        "-map", "[v]", "-map", "3:a:0",
        "-t", f"{DURATION:.6f}", "-c:v", "libx264", "-crf", "18",
        "-preset", "medium", "-pix_fmt", "yuv420p", "-r", str(FPS),
        "-fps_mode", "cfr", "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart", str(OUTPUT),
    ])


def make_contact() -> None:
    timestamps = [0.35, 2.2, 3.2, 5.0, 6.8, 7.8, 9.45]
    frames: list[Image.Image] = []
    frame_dir = OUT_DIR / "frames"
    frame_dir.mkdir(parents=True, exist_ok=True)
    for index, timestamp in enumerate(timestamps):
        path = frame_dir / f"{index + 1:02d}-{timestamp:05.2f}.jpg"
        run([
            str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}",
            "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(path),
        ])
        frames.append(Image.open(path).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))

    sheet = Image.new("RGB", (1920, 620), (25, 12, 35))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 24)
    except OSError:
        font = ImageFont.load_default()
    for index, frame in enumerate(frames):
        row = 0 if index < 4 else 1
        column = index if row == 0 else index - 4
        x = column * 480
        y = row * 310
        sheet.paste(frame, (x, y))
        draw.text((x + 12, y + 278), f"{timestamps[index]:.2f}s", fill=(255, 245, 210), font=font)
    sheet.save(CONTACT, quality=94, optimize=True)


def main() -> None:
    missing = [path for path in (BASE, HOME, WALK) if not path.exists()]
    if missing:
        raise SystemExit("Missing source(s): " + ", ".join(str(path) for path in missing))
    build()
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    duration = probe_duration(OUTPUT)
    if abs(duration - DURATION) > 0.05:
        raise RuntimeError(f"Unexpected duration: {duration}")
    make_contact()
    manifest = {
        "schema": "laidies.trailer.b14-found-home-motion.v1",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT LOCALLY / HOLD",
        "authority": {"accepted": False, "release": False, "deploy": False, "publication": False},
        "clock": {"start_seconds": START, "end_seconds": END, "duration_seconds": duration},
        "narration_job": [
            {"picture": "Delta LAi Nu exterior", "supports": "I live here — actually live here."},
            {"picture": "approved multicolour heroine walking through SUNNYVAiLE", "supports": "I found this place at eleven p.m. on a Tuesday, looking for something else."},
            {"picture": "return to Delta LAi Nu exterior", "supports": "Most residents do."},
        ],
        "sources": {"base_audio": record(BASE), "home": record(HOME), "walk_motion": record(WALK)},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "full_av_decode": "PASS",
        "remaining_gate": "Independent visual-semantic review, then inclusion in the final Trailer successor after outfit authority is resolved.",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"output": record(OUTPUT), "manifest": record(MANIFEST), "contact": record(CONTACT)}, indent=2))


if __name__ == "__main__":
    main()
