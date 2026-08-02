#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p11-p18 as a bounded review clip.

The sequence replaces generic or mistimed cards with the existing Episode 02
context, theatre, café, new-chat and Spice Girls artwork. It preserves the
frozen v19 narration from 02:31.000 through 04:43.600. The result is review
evidence only: it is not an accepted master, player binding or release.
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
START = 151.0
END = 283.6
DURATION = END - START
FPS = 30
FADE = 0.16

OUT_DIR = ROOT / "operations/video-qa/episode-02-context-cafe-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p11-p18-context-cafe-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p11-p18-context-cafe-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "context": ROOT / "assets/episodes/ep-02/comic/ep02-concept-context-comic.png",
    "prompt_card": ROOT / "assets/video/comic-interstitials-v1/ep02-cue-12.png",
    "theatre": ROOT / "assets/episodes/ep-02/comic/ep02-scene-12-prompt-theater-kids-comic.png",
    "regular_cafe": ROOT / "assets/episodes/ep-02/comic/ep02-scene-13-regular-cafe-comic.png",
    "new_cafe": ROOT / "assets/episodes/ep-02/comic/ep02-scene-14-new-cafe-comic.png",
    "cafe_01": ROOT / "assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v01-1920.png",
    "cafe_02": ROOT / "assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v02-1920.png",
    "cafe_03": ROOT / "assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v03-1920.png",
    "assume_card": ROOT / "assets/video/comic-interstitials-v1/ep02-cue-16.png",
    "new_chat": ROOT / "assets/episodes/ep-02/comic/ep02-scene-16-stranger-again-comic.png",
    "forgot_card": ROOT / "assets/video/comic-interstitials-v1/ep02-cue-18.png",
    "spice": ROOT / "assets/episodes/ep-02/comic/ep02-scene-17-spice-girls-comic.png",
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
    variants = {
        "context_title": make_reveal(SOURCES["context"], VARIANTS / "context-title.png", [(0, 0, 1920, 600)]),
        "context_copy": make_reveal(SOURCES["context"], VARIANTS / "context-copy.png", [(160, 500, 1780, 1060)]),
        "new_chat_person": make_reveal(SOURCES["new_chat"], VARIANTS / "new-chat-person.png", [(0, 0, 900, 1080)]),
        "new_chat_screen": make_reveal(SOURCES["new_chat"], VARIANTS / "new-chat-screen.png", [(850, 0, 1920, 1080)]),
        "spice_words": make_reveal(SOURCES["spice"], VARIANTS / "spice-words.png", [(0, 0, 780, 1080)]),
    }
    return variants


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="e02-context-cafe-") as td:
        td_path = Path(td)
        listing = td_path / "parts.txt"
        listing.write_text("".join(f"file '{path.as_posix()}'\n" for path in parts))
        silent = td_path / "silent.mp4"
        run([str(FFMPEG), "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(silent)])
        run([
            str(FFMPEG), "-y", "-v", "error", "-i", str(silent), "-ss", f"{START:.3f}", "-i", str(MASTER),
            "-map", "0:v:0", "-map", "1:a:0", "-t", f"{DURATION:.3f}",
            "-vf", "tpad=stop_mode=clone:stop_duration=0.034", "-c:v", "libx264", "-crf", "0",
            "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(OUTPUT),
        ])


def make_contact() -> None:
    times = [2, 8, 16, 21, 29, 36, 43, 51, 59, 67, 75, 83, 91, 99, 107, 115, 123, 130]
    with tempfile.TemporaryDirectory(prefix="e02-context-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2880, 810), (15, 8, 22))
        for index, frame in enumerate(frames):
            contact.paste(frame, ((index % 6) * 480, (index // 6) * 270))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    result = subprocess.run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"], cwd=ROOT)
    if result.returncode:
        raise RuntimeError("full audio/video decode failed")
    frame_lines = subprocess.check_output([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-"], cwd=ROOT, text=True).splitlines()
    frames = sum(1 for line in frame_lines if line and not line.startswith("#"))
    expected = int(DURATION * FPS)
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
        sequence("p11-context", [v["context_title"], v["context_copy"], SOURCES["context"]], [6.34, 6.34, 6.34], 18.7),
        sequence("p12-prompt-origin", [SOURCES["prompt_card"], SOURCES["theatre"], SOURCES["regular_cafe"]], [6.10, 6.10, 6.02], 17.9),
        sequence("p13-cafe-transition", [SOURCES["regular_cafe"], SOURCES["cafe_01"], SOURCES["cafe_02"], SOURCES["cafe_03"]], [4.05, 4.05, 4.05, 4.03], 15.7),
        sequence("p14-new-cafe", [SOURCES["regular_cafe"], SOURCES["new_cafe"], SOURCES["cafe_03"]], [5.34, 5.34, 5.34], 15.7),
        sequence("p15-context", [v["context_title"], v["context_copy"], SOURCES["context"]], [5.64, 5.64, 5.64], 16.6),
        sequence("p16-spell-it-out", [SOURCES["assume_card"], v["new_chat_screen"], SOURCES["new_chat"]], [5.64, 5.64, 5.64], 16.6),
        sequence("p17-new-chat", [SOURCES["new_cafe"], v["new_chat_person"], v["new_chat_screen"]], [5.34, 5.34, 5.34], 15.7),
        sequence("p18-spice-setup", [SOURCES["forgot_card"], v["spice_words"], SOURCES["spice"]], [5.34, 5.34, 5.34], 15.7),
    ]
    concatenate(parts)
    make_contact()
    checks = verify()
    manifest = {
        "schema": "laidies.episode-02.context-cafe-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p11-p18", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "builder": record(Path(__file__)),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "semantic_repairs": {
            "p12": "theatre origin now hands off to the coffee-order analogy",
            "p14": "generic card replaced by familiar-versus-new café consequence",
            "p17": "repeated title card replaced by stranger/new-chat visual",
            "p18": "Spice Girls visual begins when narration reaches the setup",
            "motion": "purposeful narrated shot progression; no camera-only motion claim",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
