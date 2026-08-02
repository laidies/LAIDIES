#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p19-p26 as a bounded review clip.

The sequence follows the exact specificity/delegation narration: Spice Girls,
David Rose, fold in the cheese, the vague email request, and briefing AI like a
smart new hire. It preserves the frozen v19 narration from 04:43.600 through
07:10.000. The result is review evidence only, never an accepted master,
player binding, deployment, or release.
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
START = 283.6
END = 430.0
DURATION = END - START
FPS = 30
FADE = 0.16

OUT_DIR = ROOT / "operations/video-qa/episode-02-specificity-delegation-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p19-p26-specificity-delegation-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p19-p26-specificity-delegation-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "spice_card": ROOT / "assets/video/comic-interstitials-v1/ep02-cue-19.png",
    "spice": ROOT / "assets/episodes/ep-02/comic/ep02-scene-17-spice-girls-comic.png",
    "spice_scene": ROOT / "assets/video/comic-interstitials-v1/ep02-cue-20.png",
    "david": ROOT / "assets/episodes/ep-02/comic/ep02-scene-19-david-rose-intro-comic.png",
    "cheese": ROOT / "assets/episodes/ep-02/comic/ep02-scene-20-fold-in-the-cheese-comic.png",
    "your_ai": ROOT / "assets/episodes/ep-02/comic/ep02-scene-21-thats-your-ai-comic.png",
    "new_hire": ROOT / "assets/episodes/ep-02/comic/ep02-scene-22-brief-new-hire-comic.png",
    "questions": ROOT / "assets/episodes/ep-02/comic/ep02-concept-brief-questions-comic.png",
    "delegation": ROOT / "assets/video/comic-interstitials-v1/ep02-cue-26.png",
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
        "spice_words": make_reveal(SOURCES["spice"], VARIANTS / "spice-words.png", [(0, 0, 820, 1080)]),
        "david_person": make_reveal(SOURCES["david"], VARIANTS / "david-person.png", [(0, 0, 1040, 1080)]),
        "david_title": make_reveal(SOURCES["david"], VARIANTS / "david-title.png", [(990, 0, 1920, 740)]),
        "cheese_instruction": make_reveal(SOURCES["cheese"], VARIANTS / "cheese-instruction.png", [(0, 0, 1920, 400)]),
        "your_ai_left": make_reveal(SOURCES["your_ai"], VARIANTS / "your-ai-left.png", [(0, 0, 980, 920)]),
        "your_ai_right": make_reveal(SOURCES["your_ai"], VARIANTS / "your-ai-right.png", [(950, 0, 1920, 920)]),
        "questions_top": make_reveal(SOURCES["questions"], VARIANTS / "questions-top.png", [(260, 40, 1560, 560)]),
        "questions_all": make_reveal(SOURCES["questions"], VARIANTS / "questions-all.png", [(250, 30, 1580, 1030)]),
    }


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="e02-specificity-delegation-") as td:
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
    times = [2, 8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 97, 104, 111, 118, 125, 132, 139, 144]
    with tempfile.TemporaryDirectory(prefix="e02-specificity-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2880, 1080), (15, 8, 22))
        for index, frame in enumerate(frames):
            contact.paste(frame, ((index % 6) * 480, (index // 6) * 270))
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
        sequence("p19-specificity", [SOURCES["spice_card"], v["spice_words"], SOURCES["spice"]], [5.423333, 5.423333, 5.423334], 15.95),
        sequence("p20-spice-to-david", [SOURCES["spice"], SOURCES["spice_scene"], v["david_person"]], [5.423333, 5.423333, 5.423334], 15.95),
        sequence("p21-david-rose", [v["david_person"], v["david_title"], SOURCES["david"]], [6.856667, 6.856667, 6.856666], 20.25),
        sequence("p22-fold-cheese", [SOURCES["david"], SOURCES["cheese"], v["your_ai_left"]], [6.856667, 6.856667, 6.856666], 20.25),
        sequence("p23-vague-email", [v["your_ai_left"], v["your_ai_right"], SOURCES["your_ai"]], [6.89, 6.89, 6.89], 20.35),
        sequence("p24-google-to-brief", [v["cheese_instruction"], SOURCES["your_ai"], SOURCES["new_hire"]], [6.89, 6.89, 6.89], 20.35),
        sequence("p25-new-hire-questions", [SOURCES["new_hire"], v["questions_top"], v["questions_all"]], [5.656667, 5.656667, 5.656666], 16.65),
        sequence("p26-delegation", [v["questions_top"], SOURCES["questions"], SOURCES["delegation"]], [5.656667, 5.656667, 5.656666], 16.65),
    ]
    concatenate(parts)
    make_contact()
    checks = verify()
    manifest = {
        "schema": "laidies.episode-02.specificity-delegation-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p19-p26", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "builder": record(Path(__file__)),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "semantic_repairs": {
            "p19-p20": "specificity lesson now progresses from the lyric cue into the Spice Girls example and David Rose setup",
            "p21-p24": "David Rose and fold-in-the-cheese visuals now track the spoken comparison instead of arriving early or remaining generic",
            "p25-p26": "new-hire briefing questions reveal with the narration and resolve on the delegation principle",
            "motion": "purposeful narrated state progression; no generic camera-only movement",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
