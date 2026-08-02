#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p35-p38 as a bounded review clip.

The sequence follows the exact narration from Britney-level specificity through
iteration, calling KSVL/requesting the CD, visiting the LIBRAiRY, and finding
the Harvard/BCG evidence. It preserves the frozen v19 narration from 10:00.000
through 11:14.000. The result is review evidence only, never an accepted
master, player binding, deployment, or release.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4"
MASTER_SHA = "80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814"
START = 600.0
END = 674.0
DURATION = END - START
FPS = 30
FADE = 0.16

OUT_DIR = ROOT / "operations/video-qa/episode-02-radio-library-proof-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p35-p38-radio-library-proof-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p35-p38-radio-library-proof-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "britney": ROOT / "assets/episodes/ep-02/comic/ep02-emph-britney-comic.png",
    "radio": ROOT / "assets/episodes/ep-02/comic/ep02-scene-30-request-the-song-comic.png",
    "library": ROOT / "assets/episodes/ep-02/comic/ep02-scene-31-libraiy-comic.png",
    "study": ROOT / "assets/episodes/ep-02/comic/ep02-concept-bcg-study-comic.png",
}


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


def make_reveal(source: Path, output: Path, regions: list[tuple[int, int, int, int]]) -> Path:
    """Dim the full artwork and restore only the current narrated region."""
    original = Image.open(source).convert("RGB")
    dark = Image.new("RGB", original.size, (8, 6, 14))
    image = Image.blend(original, dark, 0.50)
    for region in regions:
        image.paste(original.crop(region), (region[0], region[1]))
    image.save(output, optimize=True)
    return output


def sequence(name: str, images: list[Path], durations: list[float], target: float) -> Path:
    if len(images) != len(durations):
        raise ValueError(f"{name}: image/duration count mismatch")
    actual = sum(durations) - FADE * (len(images) - 1)
    if abs(actual - target) > 0.0001:
        raise ValueError(f"{name}: {actual:.3f}s != {target:.3f}s")
    inputs: list[str] = []
    filters: list[str] = []
    for index, (image, duration) in enumerate(zip(images, durations)):
        inputs += ["-loop", "1", "-t", f"{duration:.3f}", "-i", str(image)]
        filters.append(f"[{index}:v]fps={FPS},format=yuv420p,setsar=1[v{index}]")
    current = "v0"
    elapsed = durations[0]
    for index in range(1, len(images)):
        output_label = f"x{index}"
        offset = elapsed - FADE * index
        filters.append(
            f"[{current}][v{index}]xfade=transition=fade:duration={FADE:.2f}:offset={offset:.3f}[{output_label}]"
        )
        current = output_label
        elapsed += durations[index]
    output = SEGMENTS / f"{name}.mp4"
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", *inputs,
        "-filter_complex", ";".join(filters), "-map", f"[{current}]", "-an",
        "-t", f"{target:.3f}", "-c:v", "libx264", "-crf", "0",
        "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), str(output),
    ])
    return output


def create_variants() -> dict[str, Path]:
    return {
        "britney_words": make_reveal(SOURCES["britney"], VARIANTS / "britney-words.png", [(90, 60, 1220, 990)]),
        "britney_mic": make_reveal(SOURCES["britney"], VARIANTS / "britney-mic.png", [(1110, 100, 1880, 1030)]),
        "radio_phone": make_reveal(SOURCES["radio"], VARIANTS / "radio-phone.png", [(300, 20, 1130, 1020)]),
        "radio_cd": make_reveal(SOURCES["radio"], VARIANTS / "radio-cd.png", [(940, 280, 1430, 750)]),
        "radio_dial": make_reveal(SOURCES["radio"], VARIANTS / "radio-dial.png", [(1180, 500, 1920, 1080)]),
        "library_sign": make_reveal(SOURCES["library"], VARIANTS / "library-sign.png", [(200, 0, 930, 420)]),
        "library_search": make_reveal(SOURCES["library"], VARIANTS / "library-search.png", [(520, 180, 1750, 1080)]),
        "study_sample": make_reveal(SOURCES["study"], VARIANTS / "study-sample.png", [(160, 40, 1770, 310)]),
        "study_speed": make_reveal(SOURCES["study"], VARIANTS / "study-speed.png", [(80, 280, 1840, 550)]),
        "study_quality": make_reveal(SOURCES["study"], VARIANTS / "study-quality.png", [(80, 520, 1840, 790)]),
    }


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="e02-radio-library-") as td:
        td_path = Path(td)
        listing = td_path / "parts.txt"
        listing.write_text("".join(f"file '{path.as_posix()}'\n" for path in parts))
        silent = td_path / "silent.mp4"
        run([str(FFMPEG), "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(silent)])
        run([
            str(FFMPEG), "-y", "-v", "error", "-i", str(silent), "-ss", f"{START:.3f}", "-i", str(MASTER),
            "-map", "0:v:0", "-map", "1:a:0", "-t", f"{DURATION:.3f}",
            "-vf", "tpad=stop_mode=clone:stop_duration=0.067", "-c:v", "libx264", "-crf", "0",
            "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(OUTPUT),
        ])


def make_contact() -> None:
    times = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67, 72]
    with tempfile.TemporaryDirectory(prefix="e02-radio-library-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2400, 810), (15, 8, 22))
        for index, frame in enumerate(frames):
            contact.paste(frame, ((index % 5) * 480, (index // 5) * 270))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    result = subprocess.run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"], cwd=ROOT)
    if result.returncode:
        raise RuntimeError("full audio/video decode failed")
    frame_lines = subprocess.check_output([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-"], cwd=ROOT, text=True).splitlines()
    frames = sum(1 for line in frame_lines if line and not line.startswith("#"))
    expected = round(DURATION * FPS)
    if frames != expected:
        raise RuntimeError(f"decoded frames {frames} != {expected}")
    return {"full_av_decode": "PASS", "decoded_frames": frames, "expected_frames": expected}


def main() -> None:
    required = [MASTER, *SOURCES.values()]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing source(s):\n- " + "\n- ".join(missing))
    if sha256(MASTER) != MASTER_SHA:
        raise SystemExit("Frozen Episode 02 master hash changed; refusing to build")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    VARIANTS.mkdir(parents=True, exist_ok=True)
    SEGMENTS.mkdir(parents=True, exist_ok=True)
    v = create_variants()
    parts = [
        sequence("p35-britney-and-iterate", [v["britney_words"], v["britney_mic"], SOURCES["britney"]], [5.873333, 5.873333, 5.873334], 17.3),
        sequence("p36-request-the-song", [v["radio_phone"], v["radio_cd"], SOURCES["radio"]], [5.873333, 5.873333, 5.873334], 17.3),
        sequence("p37-not-the-dial-to-library", [v["radio_cd"], v["radio_dial"], v["library_sign"]], [5.873333, 5.873333, 5.873334], 17.3),
        sequence("p38-library-and-proof", [v["library_search"], v["study_sample"], v["study_speed"], v["study_quality"]], [5.645, 5.645, 5.645, 5.645], 22.1),
    ]
    concatenate(parts)
    make_contact()
    checks = verify()
    manifest = {
        "schema": "laidies.episode-02.radio-library-proof-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p35-p38", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "builder": record(Path(__file__)),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "semantic_repairs": {
            "p35": "Britney-level specificity now resolves into the narrated instruction to iterate instead of restarting",
            "p36-p37": "the new-hire revision, KSVL song request, CD purchase, and not-spinning-the-dial analogy now share the exact beat",
            "p38": "the LIBRAiRY research beat now reveals the Harvard/BCG sample, speed result, and quality result in narration order",
            "motion": "purposeful narrated state progression; no generic camera-only movement",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
