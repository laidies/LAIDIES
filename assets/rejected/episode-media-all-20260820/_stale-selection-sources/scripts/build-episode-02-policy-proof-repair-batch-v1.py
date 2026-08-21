#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p27-p34 as a bounded review clip.

The sequence follows the exact example/policy narration: briefing questions,
"match this", the vague wall-of-text result, PIVOT, the senior-manager brief,
the useful answer and the contractor-exemption payoff. It preserves the frozen
v19 narration from 07:10.000 through 10:00.000. The result is review evidence
only, never an accepted master, player binding, deployment, or release.
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
START = 430.0
END = 600.0
DURATION = END - START
FPS = 30
FADE = 0.16

OUT_DIR = ROOT / "operations/video-qa/episode-02-policy-proof-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p27-p34-policy-proof-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p27-p34-policy-proof-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "questions": ROOT / "assets/episodes/ep-02/comic/ep02-concept-brief-questions-comic.png",
    "match": ROOT / "assets/episodes/ep-02/comic/ep02-scene-25-match-this-comic.png",
    "vague": ROOT / "assets/episodes/ep-02/comic/ep02-scene-26-vague-ask-comic.png",
    "pivot": ROOT / "assets/episodes/ep-02/comic/ep02-scene-27-pivot-comic.png",
    "specific": ROOT / "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
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
        "questions": make_reveal(SOURCES["questions"], VARIANTS / "questions.png", [(250, 30, 1580, 1030)]),
        "match_screen": make_reveal(SOURCES["match"], VARIANTS / "match-screen.png", [(640, 330, 1460, 900)]),
        "match_caption": make_reveal(SOURCES["match"], VARIANTS / "match-caption.png", [(40, 850, 1270, 1070)]),
        "vague_prompt": make_reveal(SOURCES["vague"], VARIANTS / "vague-prompt.png", [(900, 220, 1600, 770)]),
        "vague_document": make_reveal(SOURCES["vague"], VARIANTS / "vague-document.png", [(0, 650, 900, 1080)]),
        "specific_first": make_reveal(SOURCES["specific"], VARIANTS / "specific-first.png", [(1080, 0, 1530, 240)]),
        "specific_brief": make_reveal(SOURCES["specific"], VARIANTS / "specific-brief.png", [(1060, 0, 1620, 500)]),
        "useful_answer": make_reveal(SOURCES["specific"], VARIANTS / "useful-answer.png", [(0, 540, 965, 945)]),
        "exemption": make_reveal(SOURCES["specific"], VARIANTS / "exemption.png", [(950, 540, 1920, 945)]),
        "payoff": make_reveal(SOURCES["specific"], VARIANTS / "payoff.png", [(0, 930, 1920, 1080)]),
    }


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="e02-policy-proof-") as td:
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
    times = [2, 8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 97, 104, 111, 118, 125, 132, 139, 146, 153, 160, 167]
    with tempfile.TemporaryDirectory(prefix="e02-policy-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2400, 1350), (15, 8, 22))
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
        sequence("p27-show-an-example", [v["questions"], v["match_screen"], SOURCES["match"]], [7.273333, 7.273333, 7.273334], 21.5),
        sequence("p28-match-this", [v["match_screen"], v["match_caption"], SOURCES["vague"]], [7.273333, 7.273333, 7.273334], 21.5),
        sequence("p29-vague-wall", [v["vague_prompt"], SOURCES["vague"], v["vague_document"]], [7.106667, 7.106667, 7.106666], 21.0),
        sequence("p30-pivot-and-rebrief", [v["vague_document"], SOURCES["pivot"], v["specific_first"]], [7.106667, 7.106667, 7.106666], 21.0),
        sequence("p31-specific-brief", [v["specific_first"], v["specific_brief"], SOURCES["specific"]], [6.773333, 6.773333, 6.773334], 20.0),
        sequence("p32-useful-answer", [v["specific_brief"], v["useful_answer"], v["exemption"]], [6.773333, 6.773333, 6.773334], 20.0),
        sequence("p33-exemption-payoff", [v["exemption"], v["payoff"], SOURCES["specific"]], [7.606667, 7.606667, 7.606666], 22.5),
        sequence("p34-reading-job", [v["vague_document"], v["exemption"], v["payoff"]], [7.606667, 7.606667, 7.606666], 22.5),
    ]
    concatenate(parts)
    make_contact()
    checks = verify()
    manifest = {
        "schema": "laidies.episode-02.policy-proof-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p27-p34", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "builder": record(Path(__file__)),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "semantic_repairs": {
            "p27-p28": "briefing questions now resolve into the exact Match this example before the policy setup",
            "p29-p30": "the vague request and wall of text now lead through the narrated PIVOT joke into the second briefing attempt",
            "p31-p34": "the senior-manager brief, useful answer, contractor exemption, and reading-job payoff reveal with their exact narration",
            "motion": "purposeful narrated state progression; no generic camera-only movement",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
