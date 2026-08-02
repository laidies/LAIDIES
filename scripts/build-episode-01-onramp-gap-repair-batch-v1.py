#!/usr/bin/env python3
"""Build Episode 01 p11-p25 as a narration-timed local review batch.

This builder replaces repeated or mismatched static holds with purposeful
state changes using approved Episode 01 sources. It preserves the exact v26
audio clock. The output is review evidence only and grants no release,
publication, deployment, or player-binding authority.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-01-full-v26-source-admitted-review.mp4"
MASTER_SHA = "f5985a39363eb75514766186817d0105beab9fa6695accf40e0972698e1d1351"
OUT = ROOT / "operations/video-qa/episode-01-onramp-gap-repair-batch-v1"
VARIANTS = OUT / "variants"
SEGMENTS = OUT / "segments"
OUTPUT = OUT / "episode-01-p11-p25-repaired-review-v1.mp4"
CONTACT = OUT / "episode-01-p11-p25-contact-v1.jpg"
MANIFEST = OUT / "manifest.json"

PIXEL = ROOT / "assets/episodes/ep-01/pixel/delivery-20260719-master-v1"
COMIC = ROOT / "assets/video/comic-interstitials-v1"
REPAIRS = ROOT / "assets/video/episode-01-v26-image-repair-batch-v1"

SOURCES = {
    "get_in": COMIC / "get-in-loser.png",
    "putting_off": COMIC / "ep01-cue-11.png",
    "fleece": PIXEL / "ep01-fleece-vest-onramp-comic.png",
    "groundbreaking_end": PIXEL / "ep01-groundbreaking-c-end-comic.png",
    "miranda": REPAIRS / "ep01-miranda-calendar-pressure-p14-v1-1920.png",
    "personal_cost": PIXEL / "ep01-personal-cost-comic.png",
    "library": COMIC / "library-current-pixel-v1.png",
    "stat_100_78": PIXEL / "ep01-100-vs-78-comic.png",
    "gap": COMIC / "ep01-cue-19.png",
    "encouraged": PIXEL / "ep01-encouraged-vs-corners-comic.png",
    "steve": PIXEL / "ep01-steve-ovation-c-end-comic-textfix.png",
    "pattern": PIXEL / "ep01-pattern-recognition-comic.png",
    "invisible_load": PIXEL / "ep01-invisible-load-comic.png",
    "canyon": PIXEL / "ep01-canyon-montage-comic.png",
    "physics_start": PIXEL / "ep01-physics-problem-a-start-comic.png",
    "physics_end": PIXEL / "ep01-physics-problem-c-end-comic.png",
    "dolly": REPAIRS / "ep01-dolly-physics-stage-p25-v1-1920.png",
}

FPS = 30
WIDTH = 1920
HEIGHT = 1080
START = 129.5
END = 379.5
FADE = 0.16


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


def fitted(source: Path) -> Image.Image:
    return ImageOps.fit(
        Image.open(source).convert("RGB"),
        (WIDTH, HEIGHT),
        Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )


def focus_variant(source: Path, output: Path, regions: list[tuple[int, int, int, int]]) -> Path:
    original = fitted(source)
    image = Image.blend(original, Image.new("RGB", original.size, (10, 5, 18)), 0.46)
    for x0, y0, x1, y1 in regions:
        image.paste(original.crop((x0, y0, x1, y1)), (x0, y0))
    image.save(output, optimize=True)
    return output


def full_variant(source: Path, output: Path) -> Path:
    fitted(source).save(output, optimize=True)
    return output


def states() -> dict[str, list[Path]]:
    result: dict[str, list[Path]] = {}
    regions = [
        [(0, 0, 960, 1080)],
        [(960, 0, 1920, 1080)],
        [(300, 80, 1620, 1000)],
    ]
    for key, source in SOURCES.items():
        values = [focus_variant(source, VARIANTS / f"{key}-focus-{index:02d}.png", box)
                  for index, box in enumerate(regions, start=1)]
        values.append(full_variant(source, VARIANTS / f"{key}-full.png"))
        result[key] = values
    return result


def equal_durations(target: float, count: int) -> list[float]:
    each = (target + FADE * (count - 1)) / count
    return [each] * count


def still_sequence(name: str, images: list[Path], target: float) -> Path:
    durations = equal_durations(target, len(images))
    inputs: list[str] = []
    chains: list[str] = []
    for index, (image, duration) in enumerate(zip(images, durations)):
        inputs += ["-loop", "1", "-t", f"{duration:.6f}", "-i", str(image)]
        chains.append(f"[{index}:v]fps={FPS},format=yuv420p,setsar=1[v{index}]")
    current = "v0"
    elapsed = durations[0]
    for index in range(1, len(images)):
        offset = elapsed - FADE * index
        out = f"x{index}"
        chains.append(f"[{current}][v{index}]xfade=transition=fade:duration={FADE}:offset={offset:.6f}[{out}]")
        current = out
        elapsed += durations[index]
    output = SEGMENTS / f"{name}.mp4"
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", *inputs,
        "-filter_complex", ";".join(chains), "-map", f"[{current}]", "-an",
        "-t", f"{target:.6f}", "-c:v", "libx264", "-crf", "0", "-preset", "veryfast",
        "-pix_fmt", "yuv420p", "-r", str(FPS), str(output),
    ])
    return output


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="ep01-p11-p25-") as td:
        temp = Path(td)
        listing = temp / "parts.txt"
        listing.write_text("".join(f"file '{part.as_posix()}'\n" for part in parts))
        silent = temp / "silent.mp4"
        run([str(FFMPEG), "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(silent)])
        run([
            str(FFMPEG), "-y", "-v", "error", "-i", str(silent), "-ss", f"{START:.3f}",
            "-to", f"{END:.3f}", "-i", str(MASTER), "-map", "0:v:0", "-map", "1:a:0",
            "-t", f"{END - START:.3f}", "-vf", "tpad=stop_mode=clone:stop_duration=0.200",
            "-c:v", "libx264", "-crf", "0", "-preset", "veryfast", "-pix_fmt", "yuv420p",
            "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(OUTPUT),
        ])


def make_contact() -> None:
    duration = END - START
    times = [1.5 + index * ((duration - 3.0) / 34) for index in range(35)]
    with tempfile.TemporaryDirectory(prefix="ep01-p11-p25-contact-") as td:
        images = []
        for index, timestamp in enumerate(times):
            frame = Path(td) / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}", "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            images.append(Image.open(frame).convert("RGB").resize((384, 216), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (1920, 1512), (15, 8, 22))
        for index, image in enumerate(images):
            contact.paste(image, ((index % 5) * 384, (index // 5) * 216))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    lines = subprocess.check_output([
        str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-",
    ], cwd=ROOT, text=True).splitlines()
    frames = sum(1 for line in lines if line and not line.startswith("#"))
    expected = int((END - START) * FPS)
    if frames != expected:
        raise RuntimeError(f"decoded frame count {frames} != {expected}")
    return {"full_av_decode": "PASS", "decoded_frames": frames, "expected_frames": expected}


def main() -> None:
    required = [MASTER, *SOURCES.values()]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing source(s):\n- " + "\n- ".join(missing))
    if sha256(MASTER) != MASTER_SHA:
        raise SystemExit("Frozen Episode 01 v26 hash changed; refusing to build")
    VARIANTS.mkdir(parents=True, exist_ok=True)
    SEGMENTS.mkdir(parents=True, exist_ok=True)
    s = states()
    timeline = [
        ("group-chat", 129.5, 143.0, [s["get_in"][0], s["get_in"][2], s["get_in"][-1]]),
        ("six-month-list", 143.0, 160.8, [s["putting_off"][0], s["personal_cost"][1], s["putting_off"][-1]]),
        ("terrible-onramp", 160.8, 179.5, [s["fleece"][0], s["fleece"][-1], s["groundbreaking_end"][2], s["groundbreaking_end"][-1]]),
        ("calendar-tetris", 179.5, 191.7, [s["miranda"][0], s["miranda"][1], s["miranda"][-1]]),
        ("personal-cost", 191.7, 203.9, [s["miranda"][2], s["personal_cost"][0], s["personal_cost"][-1]]),
        ("late-night-search", 203.9, 224.0, [s["personal_cost"][1], s["library"][2], s["library"][-1]]),
        ("found-the-town", 224.0, 246.5, [s["library"][0], s["library"][1], s["library"][-1]]),
        ("one-hundred-vs-78", 246.5, 267.4, [s["stat_100_78"][0], s["stat_100_78"][1], s["stat_100_78"][-1]]),
        ("same-desks-gap", 267.4, 279.85, [s["gap"][0], s["gap"][1], s["gap"][-1]]),
        ("encouraged-and-praised", 279.85, 292.3, [s["encouraged"][0], s["steve"][2], s["encouraged"][-1]]),
        ("cutting-corners", 292.3, 310.05, [s["encouraged"][1], s["pattern"][2], s["pattern"][-1]]),
        ("credibility-and-effort", 310.05, 327.8, [s["invisible_load"][0], s["invisible_load"][1], s["pattern"][-1]]),
        ("pattern-recognition", 327.8, 346.4, [s["pattern"][0], s["pattern"][1], s["canyon"][-1]]),
        ("invisible-work-physics", 346.4, 365.0, [s["invisible_load"][0], s["steve"][2], s["physics_start"][-1]]),
        ("physics-dolly", 365.0, 379.5, [s["physics_start"][0], s["dolly"][2], s["physics_end"][-1]]),
    ]
    parts = [still_sequence(name, images, stop - start) for name, start, stop, images in timeline]
    concatenate(parts)
    checks = verify()
    make_contact()
    manifest = {
        "schema": "laidies.episode-01.onramp-gap-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "scope": {"occurrences": "p11-p25", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "semantic_timing": [
            {"id": name, "start": start, "end": stop, "source_state_count": len(images)}
            for name, start, stop, images in timeline
        ],
        "replacement_logic": {
            "p12": "Repeated group-chat card replaced by list/personal-cost sequence.",
            "p16": "Empty reading room replaced by late-night pressure resolving into the LIBRAiRY.",
            "p20": "Repeated adoption-gap card replaced by encouragement/praise evidence plus Steve callback.",
            "p24": "Repeated canyon card replaced by invisible-work sequence resolving into the physics problem.",
        },
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "builder": record(Path(__file__)),
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False, "player_binding": False},
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
