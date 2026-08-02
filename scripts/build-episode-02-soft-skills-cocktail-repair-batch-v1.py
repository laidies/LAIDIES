#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p39-p46 as a bounded review clip.

The sequence follows the exact narration from the Harvard/BCG differentiator
through Ethan Mollick's soft-skills observation, the practical meaning of those
skills, and the cocktail-party explanation of prompting as delegation. It
preserves the frozen v19 narration from 11:14.000 through 13:28.000. The result
is review evidence only, never an accepted master, player binding, deployment,
or release.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4"
MASTER_SHA = "80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814"
START = 674.0
END = 808.0
DURATION = END - START
FPS = 30
FADE = 0.16

OUT_DIR = ROOT / "operations/video-qa/episode-02-soft-skills-cocktail-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p39-p46-soft-skills-cocktail-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p39-p46-soft-skills-cocktail-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "study": ROOT / "assets/episodes/ep-02/comic/ep02-concept-bcg-study-comic.png",
    "quote": ROOT / "assets/episodes/ep-02/comic/ep02-quote-mollick-comic.png",
    "soft": ROOT / "assets/episodes/ep-02/comic/ep02-emph-soft-skills-win-comic.png",
    "delegation": ROOT / "assets/episodes/ep-02/comic/ep02-emph-delegation-comic.png",
    "cocktail": ROOT / "assets/episodes/ep-02/comic/ep02-cocktail-comic.png",
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


def equal_durations(count: int, target: float) -> list[float]:
    each = (target + FADE * (count - 1)) / count
    values = [round(each, 6)] * count
    values[-1] += (target + FADE * (count - 1)) - sum(values)
    return values


def sequence(name: str, images: list[Path], target: float) -> Path:
    durations = equal_durations(len(images), target)
    actual = sum(durations) - FADE * (len(images) - 1)
    if abs(actual - target) > 0.0001:
        raise ValueError(f"{name}: {actual:.3f}s != {target:.3f}s")
    inputs: list[str] = []
    filters: list[str] = []
    for index, (image, duration) in enumerate(zip(images, durations)):
        inputs += ["-loop", "1", "-t", f"{duration:.6f}", "-i", str(image)]
        filters.append(f"[{index}:v]fps={FPS},format=yuv420p,setsar=1[v{index}]")
    current = "v0"
    elapsed = durations[0]
    for index in range(1, len(images)):
        output_label = f"x{index}"
        offset = elapsed - FADE * index
        filters.append(
            f"[{current}][v{index}]xfade=transition=fade:duration={FADE:.2f}:offset={offset:.6f}[{output_label}]"
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
        "study_sample": make_reveal(SOURCES["study"], VARIANTS / "study-sample.png", [(170, 35, 1760, 300)]),
        "study_speed": make_reveal(SOURCES["study"], VARIANTS / "study-speed.png", [(60, 270, 1860, 540)]),
        "study_quality": make_reveal(SOURCES["study"], VARIANTS / "study-quality.png", [(60, 510, 1860, 780)]),
        "study_differentiator": make_reveal(SOURCES["study"], VARIANTS / "study-differentiator.png", [(55, 775, 1870, 1060)]),
        "quote_words": make_reveal(SOURCES["quote"], VARIANTS / "quote-words.png", [(245, 285, 1690, 750)]),
        "quote_credit": make_reveal(SOURCES["quote"], VARIANTS / "quote-credit.png", [(270, 715, 1040, 910)]),
        "soft_dismissed": make_reveal(SOURCES["soft"], VARIANTS / "soft-dismissed.png", [(265, 205, 1610, 500)]),
        "soft_win": make_reveal(SOURCES["soft"], VARIANTS / "soft-win.png", [(600, 320, 1715, 710)]),
        "soft_hard": make_reveal(SOURCES["soft"], VARIANTS / "soft-hard.png", [(560, 565, 1780, 940)]),
        "delegation_not_technical": make_reveal(SOURCES["delegation"], VARIANTS / "delegation-not-technical.png", [(360, 180, 1580, 605)]),
        "delegation_is_delegation": make_reveal(SOURCES["delegation"], VARIANTS / "delegation-is-delegation.png", [(340, 465, 1660, 920)]),
        "cocktail_prompt": make_reveal(SOURCES["cocktail"], VARIANTS / "cocktail-prompt.png", [(145, 45, 1010, 350)]),
        "cocktail_assistant": make_reveal(SOURCES["cocktail"], VARIANTS / "cocktail-assistant.png", [(760, 165, 1740, 515)]),
        "cocktail_brief": make_reveal(SOURCES["cocktail"], VARIANTS / "cocktail-brief.png", [(385, 410, 1010, 650)]),
        "cocktail_cheese": make_reveal(SOURCES["cocktail"], VARIANTS / "cocktail-cheese.png", [(730, 500, 1795, 945)]),
    }


def concatenate(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="e02-soft-skills-cocktail-") as td:
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
    times = [2 + 6.7 * index for index in range(20)]
    with tempfile.TemporaryDirectory(prefix="e02-soft-skills-cocktail-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2400, 1080), (15, 8, 22))
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
    with tempfile.TemporaryDirectory(prefix="e02-soft-skills-audio-") as td:
        td_path = Path(td)
        source_pcm = td_path / "source.f32"
        output_pcm = td_path / "output.f32"
        run([
            str(FFMPEG), "-y", "-v", "error", "-ss", f"{START:.3f}", "-t", f"{DURATION:.3f}",
            "-i", str(MASTER), "-map", "0:a:0", "-ac", "1", "-ar", "48000", "-f", "f32le", str(source_pcm),
        ])
        run([
            str(FFMPEG), "-y", "-v", "error", "-i", str(OUTPUT), "-map", "0:a:0", "-ac", "1", "-ar", "48000",
            "-f", "f32le", str(output_pcm),
        ])
        source_audio = np.fromfile(source_pcm, dtype=np.float32)
        output_audio = np.fromfile(output_pcm, dtype=np.float32)
        shared = min(len(source_audio), len(output_audio))
        correlation = float(np.corrcoef(source_audio[:shared], output_audio[:shared])[0, 1])
        tail_samples = len(output_audio) - len(source_audio)
        if correlation < 0.9999:
            raise RuntimeError(f"audio correlation {correlation:.8f} is below 0.9999")
        if abs(tail_samples) >= 1600:
            raise RuntimeError(f"audio tail {tail_samples} samples exceeds one 30fps frame")
    return {
        "full_av_decode": "PASS",
        "decoded_frames": frames,
        "expected_frames": expected,
        "frozen_audio_correlation": correlation,
        "audio_tail_samples_at_48khz": tail_samples,
        "audio_tail_rule": "PASS_SUB_FRAME_BTB_311",
    }


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
        sequence("p39-study-differentiator", [v["study_speed"], v["study_quality"], v["study_differentiator"], SOURCES["study"]], 21.7),
        sequence("p40-mollick-soft-skills", [v["quote_words"], v["quote_credit"], SOURCES["quote"], v["soft_dismissed"]], 21.7),
        sequence("p41-three-word-prompt", [v["delegation_not_technical"], v["delegation_is_delegation"]], 7.0),
        sequence("p42-what-those-skills-are", [v["soft_dismissed"], v["soft_win"], v["soft_hard"]], 16.8),
        sequence("p43-soft-is-real-work", [v["soft_win"], v["soft_hard"], SOURCES["soft"]], 16.8),
        sequence("p44-on-top-of-hard-skills", [v["soft_dismissed"], v["soft_win"], v["soft_hard"], SOURCES["soft"]], 16.8),
        sequence("p45-cocktail-party-question", [v["cocktail_prompt"], v["cocktail_assistant"], SOURCES["cocktail"]], 16.8),
        sequence("p46-prompt-is-delegation", [v["delegation_not_technical"], v["delegation_is_delegation"], v["cocktail_brief"], v["cocktail_cheese"], SOURCES["cocktail"]], 16.4),
    ]
    concatenate(parts)
    make_contact()
    checks = verify()
    manifest = {
        "schema": "laidies.episode-02.soft-skills-cocktail-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p39-p46", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "builder": record(Path(__file__)),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "semantic_repairs": {
            "p39": "the Harvard/BCG results now resolve into the narrated non-technical differentiator: briefing, context, and judgment",
            "p40-p44": "Mollick's observation and the explanation of the formerly dismissed soft skills reveal in the narration's exact conceptual order",
            "p45-p46": "the cocktail-party question now becomes the delegation explanation, assistant brief, and failure-to-specify payoff",
            "motion": "purposeful narrated text-region progression; no generic camera-only movement",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
