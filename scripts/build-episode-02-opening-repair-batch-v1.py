#!/usr/bin/env python3
"""Build the first bounded Episode 02 occurrence-repair batch (p00-p10).

This maker script does not touch the frozen full-title candidate.  It rebuilds
00:00-02:31 as a review clip with actual comic-state changes, preserves the
approved LAiDIES ident directly from the bound v19 successor, preserves the
approved SUNNYVAiLE entry sequence, and replaces the duplicated desk picture
with the existing narrated bad-versus-useful comparison.

The output is review evidence only.  It is not acceptance, publication, or a
player binding.
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
TOWN_CONTEXT = ROOT / "operations/video-qa/town-entry-transformation-cue-v1/episode-02-town-entry-context-review-v1.mp4"
OUT_DIR = ROOT / "operations/video-qa/episode-02-opening-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-opening-p00-p10-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-opening-p00-p10-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "p00": ROOT / "assets/episodes/ep-02/comic/ep02-open-01-previously-strip-comic.png",
    "p01": ROOT / "assets/episodes/ep-02/comic/ep02-open-02-thisweek-teaser-comic.png",
    "p02": ROOT / "assets/video/delivery-20260723-ep02-v16-cover-v3/ep02-open-03-title-comic.png",
    "p03": ROOT / "assets/episodes/ep-02/comic/ep02-open-03-title-comic.png",
    "p04": ROOT / "assets/episodes/ep-02/comic/ep02-open-04-cold-open-desk-comic.png",
    "p05": ROOT / "assets/episodes/ep-02/comic/ep02-open-05-throw-pillow-comic.png",
    "p06": ROOT / "assets/episodes/ep-02/comic/ep02-open-06-thinking-closeup-comic.png",
    "p08": ROOT / "assets/episodes/ep-02/comic/ep02-open-08-to-town-comic.png",
    "p10": ROOT / "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
}

FPS = 30
WIDTH = 1920
HEIGHT = 1080
OPENING_END = 151.0
FADE = 0.16
PLUM = (53, 17, 63)
ELECTRIC_TEAL = (24, 201, 204)
ELECTRIC_PINK = (238, 40, 162)
SUNSHINE = (255, 211, 59)


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


def make_variant(source: Path, output: Path, regions: list[tuple[int, int, int, int]], colour: tuple[int, int, int]) -> None:
    """Dim the page, then cleanly restore the exact narrated regions.

    ``colour`` remains in the bound state specification so the semantic state
    identity is explicit, but production frames intentionally avoid QA-like
    coloured rectangles around the artwork.
    """
    del colour
    original = Image.open(source).convert("RGB")
    dim = Image.new("RGB", original.size, (8, 6, 14))
    image = Image.blend(original, dim, 0.52)
    for x0, y0, x1, y1 in regions:
        image.paste(original.crop((x0, y0, x1, y1)), (x0, y0))
    image.save(output, optimize=True)


def still_sequence(name: str, images: list[Path], durations: list[float], target_duration: float) -> Path:
    """Cross-dissolve between meaningful visual states at an exact duration."""
    if len(images) != len(durations):
        raise ValueError(f"{name}: state and duration counts differ")
    expected = sum(durations) - FADE * (len(images) - 1)
    if abs(expected - target_duration) > 0.0001:
        raise ValueError(f"{name}: {expected:.3f}s != target {target_duration:.3f}s")
    inputs: list[str] = []
    chains: list[str] = []
    for index, (image, duration) in enumerate(zip(images, durations)):
        inputs += ["-loop", "1", "-t", f"{duration:.3f}", "-i", str(image)]
        chains.append(f"[{index}:v]fps={FPS},format=yuv420p,setsar=1[v{index}]")
    current = "v0"
    elapsed = durations[0]
    for index in range(1, len(images)):
        offset = elapsed - FADE * index
        out = f"x{index}"
        chains.append(
            f"[{current}][v{index}]xfade=transition=fade:duration={FADE:.2f}:offset={offset:.3f}[{out}]"
        )
        current = out
        elapsed += durations[index]
    output = SEGMENTS / f"{name}.mp4"
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", *inputs,
        "-filter_complex", ";".join(chains), "-map", f"[{current}]", "-an",
        "-t", f"{target_duration:.3f}", "-c:v", "libx264", "-crf", "0",
        "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), output.as_posix(),
    ])
    return output


def master_segment(name: str, start: float, end: float) -> Path:
    output = SEGMENTS / f"{name}.mp4"
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-ss", f"{start:.3f}",
        "-to", f"{end:.3f}", "-i", str(MASTER), "-map", "0:v:0", "-an",
        "-c:v", "libx264", "-crf", "0", "-preset", "veryfast", "-pix_fmt", "yuv420p",
        "-r", str(FPS), output.as_posix(),
    ])
    return output


def town_segment() -> Path:
    output = SEGMENTS / "p08b-p09-town-entry.mp4"
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(TOWN_CONTEXT),
        "-map", "0:v:0", "-an", "-t", "17.950", "-c:v", "libx264", "-crf", "0",
        "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), output.as_posix(),
    ])
    return output


def create_variants() -> dict[str, list[Path]]:
    variants: dict[str, list[Path]] = {}

    def build(key: str, specs: list[tuple[list[tuple[int, int, int, int]], tuple[int, int, int]]]) -> None:
        variants[key] = []
        for index, (regions, colour) in enumerate(specs, start=1):
            output = VARIANTS / f"{key}-state-{index:02d}.png"
            make_variant(SOURCES[key], output, regions, colour)
            variants[key].append(output)
        variants[key].append(SOURCES[key])

    build("p00", [
        ([(0, 0, 640, 1080)], ELECTRIC_PINK),
        ([(640, 0, 1280, 1080)], ELECTRIC_TEAL),
        ([(1280, 0, 1920, 1080)], SUNSHINE),
    ])
    build("p01", [
        ([(65, 160, 650, 910)], ELECTRIC_TEAL),
        ([(665, 160, 1260, 910)], ELECTRIC_PINK),
        ([(1275, 160, 1865, 910)], SUNSHINE),
    ])
    build("p02", [
        ([(70, 55, 1850, 320)], ELECTRIC_PINK),
        ([(400, 250, 1520, 1020)], ELECTRIC_TEAL),
    ])
    build("p04", [
        ([(895, 135, 1805, 825)], ELECTRIC_PINK),
        ([(80, 115, 905, 1000)], ELECTRIC_TEAL),
    ])
    build("p05", [
        ([(0, 0, 960, 1080)], ELECTRIC_PINK),
        ([(960, 0, 1920, 1080)], ELECTRIC_TEAL),
    ])
    build("p06", [
        ([(850, 35, 1875, 490)], SUNSHINE),
        ([(55, 80, 1040, 1040)], ELECTRIC_PINK),
    ])
    build("p08", [
        ([(0, 0, 960, 1080)], ELECTRIC_PINK),
        ([(960, 0, 1920, 1080)], ELECTRIC_TEAL),
    ])
    build("p10", [
        ([(0, 0, 1920, 540)], ELECTRIC_TEAL),
        ([(0, 540, 960, 950)], ELECTRIC_PINK),
        ([(960, 540, 1920, 950)], SUNSHINE),
        ([(20, 950, 1900, 1070)], ELECTRIC_TEAL),
    ])
    return variants


def concatenate(segments: list[Path]) -> Path:
    with tempfile.TemporaryDirectory(prefix="e02-opening-concat-") as td:
        listing = Path(td) / "segments.txt"
        listing.write_text("".join(f"file '{path.as_posix()}'\n" for path in segments))
        silent = Path(td) / "silent.mp4"
        run([
            str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0",
            "-i", str(listing), "-c", "copy", str(silent),
        ])
        run([
            str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(silent),
            "-i", str(MASTER), "-map", "0:v:0", "-map", "1:a:0", "-t", f"{OPENING_END:.3f}",
            "-vf", "tpad=stop_mode=clone:stop_duration=0.034", "-c:v", "libx264", "-crf", "0",
            "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(OUTPUT),
        ])
    return OUTPUT


def make_contact() -> None:
    times = [2.0, 6.7, 12.0, 18.0, 23.0, 33.0, 42.0, 63.0, 82.0, 93.0, 109.0, 124.0, 138.0, 144.0, 149.0]
    with tempfile.TemporaryDirectory(prefix="e02-opening-contact-") as td:
        td_path = Path(td)
        images = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}", "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            images.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2400, 810), (15, 8, 22))
        for index, image in enumerate(images):
            contact.paste(image, ((index % 5) * 480, (index // 5) * 270))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    probe = subprocess.run([
        str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-",
    ], cwd=ROOT, capture_output=True, text=True)
    if probe.returncode:
        raise RuntimeError("Full decode failed: " + probe.stderr[-2000:])
    frames = subprocess.check_output([
        str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-",
    ], cwd=ROOT, text=True).splitlines()
    frame_count = sum(1 for line in frames if line and not line.startswith("#"))
    if frame_count != int(OPENING_END * FPS):
        raise RuntimeError(f"Opening frame count {frame_count} != {int(OPENING_END * FPS)}")
    return {"full_av_decode": "PASS", "decoded_frames": frame_count, "expected_frames": int(OPENING_END * FPS)}


def main() -> None:
    required = [MASTER, TOWN_CONTEXT, *SOURCES.values()]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing source(s):\n- " + "\n- ".join(missing))
    if sha256(MASTER) != MASTER_SHA:
        raise SystemExit("Frozen Episode 02 source hash changed; refusing to build")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    VARIANTS.mkdir(parents=True, exist_ok=True)
    SEGMENTS.mkdir(parents=True, exist_ok=True)
    variants = create_variants()

    segments = [
        still_sequence("p00", variants["p00"], [2.65, 2.65, 2.65, 2.53], 10.0),
        still_sequence("p01", variants["p01"], [2.65, 2.65, 2.65, 2.53], 10.0),
        still_sequence("p02", variants["p02"], [3.90, 3.90, 3.92], 11.4),
        still_sequence("p03a-title", [SOURCES["p03"], SOURCES["p02"]], [1.75, 1.01], 2.6),
        still_sequence("p03b-desk", [variants["p04"][0], SOURCES["p04"]], [2.10, 2.06], 4.0),
        still_sequence("p04", variants["p04"], [6.95, 6.95, 6.92], 20.5),
        still_sequence("p05", variants["p05"], [6.65, 6.65, 6.62], 19.6),
        still_sequence("p06", variants["p06"], [3.00, 3.00, 3.02], 8.7),
        master_segment("p07-approved-ident-context", 86.8, 105.0),
        still_sequence("p08a", variants["p08"], [4.08, 4.08, 4.16], 12.0),
        town_segment(),
        still_sequence("p10", variants["p10"], [3.48, 3.48, 3.48, 3.48, 2.72], 16.0),
    ]
    concatenate(segments)
    checks = verify()
    make_contact()
    manifest = {
        "schema": "laidies.episode-02.opening-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "scope": {"occurrences": "p00-p10", "seconds": [0.0, OPENING_END]},
        "frozen_master": record(MASTER),
        "preserved": {
            "approved_laidies_ident_seconds": [91.34, 98.59],
            "town_entry_transformation_source": record(TOWN_CONTEXT),
            "narration_source": str(MASTER.relative_to(ROOT)),
        },
        "semantic_repairs": {
            "p03": "title clears after 2.6 seconds; desk narration receives desk picture",
            "p10": "duplicated failed desk replaced by narrated bad-versus-useful comparison",
            "motion": "sequential panel/interface/comparison state reveals; no camera-only motion claim",
        },
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "builder": record(Path(__file__)),
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
