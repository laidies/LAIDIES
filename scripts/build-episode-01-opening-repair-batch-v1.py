#!/usr/bin/env python3
"""Build the bounded Episode 01 p00-p10 narration-timed repair batch.

The builder preserves the approved Episode 01 heroine, outfit and LAiDIES
motion ident. It replaces the rejected fake town map and turns the former
static holds into purposeful, narration-bound visual-state sequences. Output
is local review evidence only: it is not acceptance, release, publication or
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
MASTER = ROOT / "assets/video/episode-01-full-v26-source-admitted-review.mp4"
MASTER_SHA = "f5985a39363eb75514766186817d0105beab9fa6695accf40e0972698e1d1351"
OUT = ROOT / "operations/video-qa/episode-01-opening-repair-batch-v1"
VARIANTS = OUT / "variants"
SEGMENTS = OUT / "segments"
OUTPUT = OUT / "episode-01-opening-p00-p10-repaired-review-v1.mp4"
CONTACT = OUT / "episode-01-opening-p00-p10-contact-v1.jpg"
MANIFEST = OUT / "manifest.json"

SOURCES = {
    "promo1": ROOT / "assets/video/comic-interstitials-v1/season-promo-1.png",
    "promo2": ROOT / "assets/video/comic-interstitials-v1/season-promo-2.png",
    "promo3": ROOT / "assets/video/comic-interstitials-v1/season-promo-3.png",
    "promo4": ROOT / "assets/video/comic-interstitials-v1/season-promo-4.png",
    "title": ROOT / "assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png",
    "office": ROOT / "assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-steve-ovation-c-end-comic-textfix.png",
    "clock": ROOT / "assets/video/comic-interstitials-v1/ep01-cue-05.png",
    "heroine": ROOT / "assets/video/delivery-20260714-opening-v6/shots/opening-02-heroine-bright-yellow-natural-hands-v13.png",
    "footnotes": ROOT / "assets/video/episode-01-full-scene-replacements-v2/ep01-heroine-footnotes-drafts-v1-corporate.png",
    "get_in": ROOT / "assets/video/comic-interstitials-v1/get-in-loser.png",
}

FPS = 30
WIDTH = 1920
HEIGHT = 1080
END = 129.5
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


def normalized(source: Path, output: Path) -> Path:
    image = Image.open(source).convert("RGB").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    image.save(output, optimize=True)
    return output


def focus_variant(source: Path, output: Path, regions: list[tuple[int, int, int, int]]) -> Path:
    original = Image.open(source).convert("RGB").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    dim = Image.new("RGB", original.size, (8, 6, 14))
    image = Image.blend(original, dim, 0.50)
    for x0, y0, x1, y1 in regions:
        image.paste(original.crop((x0, y0, x1, y1)), (x0, y0))
    image.save(output, optimize=True)
    return output


def states() -> dict[str, list[Path]]:
    result: dict[str, list[Path]] = {}

    def build(key: str, regions: list[list[tuple[int, int, int, int]]]) -> None:
        source = SOURCES[key]
        values = []
        for index, boxes in enumerate(regions, start=1):
            values.append(focus_variant(source, VARIANTS / f"{key}-focus-{index:02d}.png", boxes))
        values.append(normalized(source, VARIANTS / f"{key}-full.png"))
        result[key] = values

    build("promo1", [[(0, 0, 1000, 600)]])
    build("promo2", [[(980, 0, 1920, 600)]])
    build("promo3", [[(0, 500, 1000, 1080)]])
    build("promo4", [[(960, 470, 1920, 1080)]])
    build("title", [[(910, 70, 1900, 1000)]])
    build("clock", [[(480, 230, 1500, 890)]])
    build("office", [
        [(850, 120, 1320, 990)],
        [(0, 110, 860, 1080)],
        [(1220, 80, 1920, 1050)],
    ])
    build("heroine", [
        [(650, 20, 1450, 1080)],
        [(0, 520, 1050, 1080)],
    ])
    build("footnotes", [
        [(0, 280, 1150, 1080)],
        [(1060, 120, 1920, 900)],
        [(460, 0, 1360, 1080)],
    ])
    build("get_in", [[(350, 150, 1570, 930)]])
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


def master_segment(name: str, start: float, end: float) -> Path:
    output = SEGMENTS / f"{name}.mp4"
    run([
        str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-ss", f"{start:.3f}",
        "-to", f"{end:.3f}", "-i", str(MASTER), "-map", "0:v:0", "-an",
        "-c:v", "libx264", "-crf", "0", "-preset", "veryfast", "-pix_fmt", "yuv420p",
        "-r", str(FPS), str(output),
    ])
    return output


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="ep01-opening-") as td:
        temp = Path(td)
        listing = temp / "parts.txt"
        listing.write_text("".join(f"file '{part.as_posix()}'\n" for part in parts))
        silent = temp / "silent.mp4"
        run([str(FFMPEG), "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(silent)])
        run([
            str(FFMPEG), "-y", "-v", "error", "-i", str(silent), "-i", str(MASTER),
            "-map", "0:v:0", "-map", "1:a:0", "-t", f"{END:.3f}",
            # Segment time-base rounding can leave a few frames short after
            # concat. Pad beyond one frame, then let the exact -t boundary
            # produce the required 3,885-frame review clock.
            "-vf", "tpad=stop_mode=clone:stop_duration=0.200", "-c:v", "libx264", "-crf", "0",
            "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(OUTPUT),
        ])


def make_contact() -> None:
    times = [1.5, 5.5, 10.5, 14.5, 18.5, 23.0, 27.0, 32.0, 38.0, 47.0, 53.0, 59.0,
             66.0, 72.0, 77.0, 82.0, 88.0, 92.0, 96.0, 100.0, 103.0, 106.0, 110.0, 114.0,
             118.0, 122.0, 126.0, 129.0]
    with tempfile.TemporaryDirectory(prefix="ep01-contact-") as td:
        images = []
        for index, timestamp in enumerate(times):
            frame = Path(td) / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            images.append(Image.open(frame).convert("RGB").resize((384, 216), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (1920, 1296), (15, 8, 22))
        for index, image in enumerate(images):
            contact.paste(image, ((index % 5) * 384, (index // 5) * 216))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    lines = subprocess.check_output([
        str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-",
    ], cwd=ROOT, text=True).splitlines()
    frames = sum(1 for line in lines if line and not line.startswith("#"))
    expected = int(END * FPS)
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
        ("behind", 0.0, 4.14, [s["promo1"][0], s["promo1"][-1]]),
        ("delegate", 4.14, 9.10, [s["promo2"][0], s["promo2"][-1]]),
        ("squad", 9.10, 12.16, [s["promo3"][0], s["promo3"][-1]]),
        ("they-call", 12.16, 16.58, [s["promo4"][0], s["promo4"][-1]]),
        ("episode-tease", 16.58, 21.0, [s["promo4"][-1], s["title"][0]]),
        ("episode-title", 21.0, 25.86, [s["title"][0], s["title"][-1]]),
        ("time-to-office", 25.86, 31.06, [s["clock"][0], s["office"][0]]),
        ("printer", 31.06, 34.04, [s["office"][0], s["office"][2]]),
        ("analysis", 34.04, 45.261, [s["office"][0], s["office"][1], s["office"][-1]]),
        ("one-hour", 45.261, 50.74, [s["office"][0], s["office"][-1]]),
        ("twice-and-me", 50.74, 55.88, [s["office"][-1], s["footnotes"][0]]),
        ("footnotes", 55.88, 62.84, [s["footnotes"][0], s["footnotes"][-1]]),
        ("drafts", 62.84, 69.68, [s["footnotes"][1], s["footnotes"][-1]]),
        ("fourth-coffee", 69.68, 75.46, [s["footnotes"][2], s["footnotes"][-1]]),
        ("not-smarter", 75.46, 79.64, [s["office"][0], s["footnotes"][2]]),
        ("hard-way", 79.64, 83.74, [s["office"][0], s["footnotes"][-1]]),
        ("wonder", 83.74, 89.06, [s["footnotes"][2], s["heroine"][0]]),
        ("when-was-i", 89.06, 93.90, [s["heroine"][0], s["heroine"][-1]]),
        ("after-ident", 101.92, 103.95, [s["heroine"][1], s["heroine"][-1]]),
        ("trailer", 103.95, 107.50, [s["get_in"][0], s["get_in"][-1]]),
        ("story-starts", 107.50, 111.08, [s["get_in"][-1], s["title"][-1]]),
        ("thats-me", 111.08, 116.00, [s["heroine"][0], s["heroine"][-1]]),
        ("mistakes", 116.00, 119.341, [s["footnotes"][0], s["footnotes"][-1]]),
        ("reading-receipts", 119.341, 123.921, [s["footnotes"][1], s["footnotes"][-1]]),
        ("real-time", 123.921, 126.80, [s["heroine"][0], s["heroine"][-1]]),
        ("group-chat", 126.80, 129.50, [s["get_in"][0], s["get_in"][-1]]),
    ]
    parts: list[Path] = []
    for name, start, end, images in timeline[:18]:
        parts.append(still_sequence(name, images, end - start))
    parts.append(master_segment("approved-ladies-ident", 93.90, 101.92))
    for name, start, end, images in timeline[18:]:
        parts.append(still_sequence(name, images, end - start))
    concatenate(parts)
    checks = verify()
    make_contact()
    manifest = {
        "schema": "laidies.episode-01.opening-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "scope": {"occurrences": "p00-p10", "seconds": [0.0, END]},
        "frozen_master": record(MASTER),
        "preserved": {
            "approved_episode_01_heroine_and_yellow_plaid_outfit": record(SOURCES["heroine"]),
            "approved_laidies_ident_seconds": [93.90, 101.92],
            "narration_and_audio_source": str(MASTER.relative_to(ROOT)),
        },
        "replaced": {
            "rejected_source": "assets/sunnyvaile-town-map-v9-canon.png",
            "replacement_logic": "mistakes/reading/receipts use the approved heroine work scene; group-chat language resolves to the established Get in, loser interstitial",
        },
        "semantic_timing": [
            {"id": name, "start": start, "end": end, "source_state_count": len(images)}
            for name, start, end, images in timeline
        ],
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
