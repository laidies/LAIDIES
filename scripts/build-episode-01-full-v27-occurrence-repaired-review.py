#!/usr/bin/env python3
"""Finish Episode 01 p26-p70 and assemble one full v27 review master.

The already-built p00-p10 and p11-p25 repairs are preserved byte-for-byte.
This script repairs the remaining narration-picture occurrences in one pass,
then assembles the complete title against the frozen v26 audio clock. Output is
local review evidence only: no acceptance, release, deploy, publication, or
player-binding authority is implied.
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
OPENING = ROOT / "operations/video-qa/episode-01-opening-repair-batch-v1/episode-01-opening-p00-p10-repaired-review-v1.mp4"
ONRAMP = ROOT / "operations/video-qa/episode-01-onramp-gap-repair-batch-v1/episode-01-p11-p25-repaired-review-v1.mp4"
OUT = ROOT / "operations/video-qa/episode-01-full-v27-occurrence-repaired-review"
VARIANTS = OUT / "variants"
SEGMENTS = OUT / "segments"
REMAINDER = OUT / "episode-01-p26-p70-repaired-review-v1.mp4"
OUTPUT = ROOT / "assets/video/episode-01-full-v27-occurrence-repaired-review.mp4"
CONTACT = OUT / "episode-01-full-v27-contact-v1.jpg"
MANIFEST = OUT / "manifest.json"

PIXEL = ROOT / "assets/episodes/ep-01/pixel/delivery-20260719-master-v1"
COMIC = ROOT / "assets/video/comic-interstitials-v1"
SCENES = ROOT / "assets/video/episode-01-full-scene-replacements-v2"
BUILDINGS = ROOT / "assets/building-interiors"

SOURCES = {
    "tool_time": COMIC / "ep01-cue-26.png",
    "bridge": COMIC / "ep01-cue-27.png",
    "fei_fei": PIXEL / "ep01-fei-fei-li-comic.png",
    # Approved Episode 01 outfit continuity: yellow top + iBook G3. The later
    # tutu/ballet look belongs to no approved Episode 01 reveal and must never
    # enter this title.
    "blend_arrival": ROOT / "assets/video/episode-01-v26-image-repair-batch-v1/ep01-blend-snap-ibook-g3-shared-p29-p30-p61-v1-1920.png",
    "email": SCENES / "ep01-heroine-blend-snap-email-v1.png",
    "i_can_start": PIXEL / "ep01-i-can-do-this-a-start-comic.png",
    "i_can_end": PIXEL / "ep01-i-can-do-this-c-end-comic.png",
    "blend_win_start": ROOT / "assets/video/episode-01-v26-image-repair-batch-v1/ep01-blend-snap-ibook-g3-shared-p29-p30-p61-v1-1920.png",
    "blend_win_end": ROOT / "assets/video/episode-01-v26-image-repair-batch-v1/ep01-blend-snap-ibook-g3-shared-p29-p30-p61-v1-1920.png",
    "senior_women": SCENES / "ep01-senior-women-ai-leadership-v1.png",
    "flip_start": PIXEL / "ep01-the-flip-14pts-a-start-comic.png",
    "flip_end": PIXEL / "ep01-the-flip-14pts-c-end-comic.png",
    "critical": COMIC / "ep01-cue-37.png",
    "cocktail_scene": SCENES / "ep01-cocktail-party-bronze-aige-v2-y2k.png",
    "cocktail_card": PIXEL / "ep01-cocktail-card-comic.png",
    "new_hire": PIXEL / "ep01-new-hire-comic-v4-style-fix.png",
    "new_hire_scene": SCENES / "ep01-ai-new-hire-onboarding-v1.png",
    "underhood": PIXEL / "ep01-under-the-hood-comic.png",
    "prediction": SCENES / "ep01-language-prediction-new-hire-v1.png",
    "cher": PIXEL / "ep01-cher-closet-comic.png",
    "context": SCENES / "ep01-context-closet-limit-v1.png",
    "burnbook": SCENES / "ep01-hallucination-burn-book-v1.png",
    "regina": PIXEL / "ep01-burn-book-regina-comic-textfix.png",
    "genai": PIXEL / "ep01-genai-card-comic.png",
    "model": PIXEL / "ep01-model-card-comic.png",
    "hallucination": PIXEL / "ep01-hallucination-card-comic.png",
    "cool_mom": PIXEL / "ep01-cool-mom-comic.png",
    "tryon": PIXEL / "ep01-try-on-comic-v5-over-shoulder-closeup.png",
    "high": BUILDINGS / "sunnyvaile-high-pop-quiz.jpg",
    "ksvl": PIXEL / "ep01-ksvl-hooks-comic.png",
    "fairy": COMIC / "fairy-godmother-current-pixel-v1.png",
    "signoff": ROOT / "assets/video/episode-01-v26-image-repair-batch-v1/ep01-blend-snap-ibook-g3-shared-p29-p30-p61-v1-1920.png",
    "delta": COMIC / "delta-lai-nu-current-pixel-v1.png",
    "rooms": PIXEL / "ep01-rooms-trailblazers-comic.png",
    "next_week": ROOT / "assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png",
}

FPS = 30
WIDTH = 1920
HEIGHT = 1080
START = 379.5
END = 1172.24
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
    return {"path": str(path.relative_to(ROOT)), "sha256": sha256(path), "size_bytes": path.stat().st_size}


def fitted(source: Path, key: str = "") -> Image.Image:
    image = Image.open(source).convert("RGB")
    if key == "genai":
        # Retain the accepted Generative AI explanation panel while excluding
        # the superseded ballerina-costume character panel at left.
        image = image.crop((image.width // 2, 0, image.width, image.height))
    return ImageOps.fit(image, (WIDTH, HEIGHT), Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def focus_variant(source: Path, output: Path, box: tuple[int, int, int, int], key: str = "") -> Path:
    original = fitted(source, key)
    image = Image.blend(original, Image.new("RGB", original.size, (10, 5, 18)), 0.44)
    x0, y0, x1, y1 = box
    image.paste(original.crop(box), (x0, y0))
    image.save(output, optimize=True)
    return output


def full_variant(source: Path, output: Path, key: str = "") -> Path:
    fitted(source, key).save(output, optimize=True)
    return output


def states() -> dict[str, list[Path]]:
    result: dict[str, list[Path]] = {}
    boxes = [(0, 0, 960, 1080), (960, 0, 1920, 1080), (300, 80, 1620, 1000)]
    for key, source in SOURCES.items():
        values = [focus_variant(source, VARIANTS / f"{key}-focus-{index:02d}.png", box, key) for index, box in enumerate(boxes, start=1)]
        values.append(full_variant(source, VARIANTS / f"{key}-full.png", key))
        result[key] = values
    return result


def equal_durations(target: float, count: int) -> list[float]:
    each = (target + FADE * (count - 1)) / count
    return [each] * count


def still_sequence(name: str, images: list[Path], target: float) -> Path:
    output = SEGMENTS / f"{name}.mp4"
    if output.exists():
        return output
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
    run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", *inputs, "-filter_complex", ";".join(chains), "-map", f"[{current}]", "-an", "-t", f"{target:.6f}", "-c:v", "libx264", "-crf", "0", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), str(output)])
    return output


def concat_video(parts: list[Path], output: Path) -> None:
    with tempfile.TemporaryDirectory(prefix="ep01-v27-concat-") as td:
        listing = Path(td) / "parts.txt"
        listing.write_text("".join(f"file '{part.as_posix()}'\n" for part in parts))
        run([str(FFMPEG), "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(output)])


def build_remainder(parts: list[Path]) -> None:
    with tempfile.TemporaryDirectory(prefix="ep01-v27-remainder-") as td:
        silent = Path(td) / "silent.mp4"
        concat_video(parts, silent)
        run([str(FFMPEG), "-y", "-v", "error", "-i", str(silent), "-ss", f"{START:.3f}", "-to", f"{END:.3f}", "-i", str(MASTER), "-map", "0:v:0", "-map", "1:a:0", "-t", f"{END - START:.3f}", "-vf", "tpad=stop_mode=clone:stop_duration=0.200", "-c:v", "libx264", "-crf", "0", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(REMAINDER)])


def assemble_full() -> None:
    with tempfile.TemporaryDirectory(prefix="ep01-v27-full-") as td:
        silent = Path(td) / "silent.mp4"
        concat_video([OPENING, ONRAMP, REMAINDER], silent)
        run([str(FFMPEG), "-y", "-v", "error", "-i", str(silent), "-i", str(MASTER), "-map", "0:v:0", "-map", "1:a:0", "-t", "1172.240", "-vf", "tpad=stop_mode=clone:stop_duration=0.200", "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(OUTPUT)])


def make_contact() -> None:
    times = [2.0 + index * ((1172.24 - 4.0) / 59) for index in range(60)]
    with tempfile.TemporaryDirectory(prefix="ep01-v27-contact-") as td:
        images = []
        for index, timestamp in enumerate(times):
            frame = Path(td) / f"{index:02d}.jpg"
            run([str(FFMPEG), "-y", "-v", "error", "-ss", f"{timestamp:.3f}", "-i", str(OUTPUT), "-frames:v", "1", "-q:v", "2", str(frame)])
            images.append(Image.open(frame).convert("RGB").resize((320, 180), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (1920, 1800), (15, 8, 22))
        for index, image in enumerate(images):
            contact.paste(image, ((index % 6) * 320, (index // 6) * 180))
        contact.save(CONTACT, quality=93, optimize=True)


def verify() -> dict[str, object]:
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    lines = subprocess.check_output([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-f", "framemd5", "-"], cwd=ROOT, text=True).splitlines()
    frames = sum(1 for line in lines if line and not line.startswith("#"))
    expected = int(1172.24 * FPS)
    if frames not in {expected, expected - 1, expected + 1}:
        raise RuntimeError(f"decoded frame count {frames} is outside expected boundary around {expected}")
    return {"full_av_decode": "PASS", "decoded_frames": frames, "expected_frame_boundary": expected, "duration_seconds": 1172.24}


def main() -> None:
    required = [MASTER, OPENING, ONRAMP, *SOURCES.values()]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing source(s):\n- " + "\n- ".join(missing))
    if sha256(MASTER) != MASTER_SHA:
        raise SystemExit("Frozen Episode 01 v26 hash changed; refusing to build")
    VARIANTS.mkdir(parents=True, exist_ok=True)
    SEGMENTS.mkdir(parents=True, exist_ok=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    s = states()
    timeline = [
        ("time-to-learn", 379.50, 394.00, [s["tool_time"][0], s["tool_time"][2], s["tool_time"][-1]]),
        ("bridge-the-canyon", 394.00, 414.45, [s["bridge"][0], s["bridge"][-1], s["fei_fei"][2]]),
        ("fei-fei-future", 414.45, 434.90, [s["fei_fei"][0], s["fei_fei"][1], s["fei_fei"][-1]]),
        ("blend-snap-arrival", 434.90, 455.70, [s["blend_arrival"][0], s["blend_arrival"][1], s["blend_arrival"][-1]]),
        ("avoided-email", 455.70, 474.35, [s["blend_arrival"][2], s["email"][0], s["email"][-1]]),
        ("tell-it-the-truth", 474.35, 493.00, [s["email"][1], s["i_can_start"][2], s["i_can_start"][-1]]),
        ("eighty-percent-right", 493.00, 509.00, [s["blend_win_start"][0], s["blend_win_end"][1], s["blend_win_end"][-1]]),
        ("four-days-eleven-minutes", 509.00, 525.00, [s["i_can_start"][0], s["i_can_end"][2], s["i_can_end"][-1]]),
        ("ability-was-not-barrier", 525.00, 545.00, [s["senior_women"][0], s["senior_women"][1], s["senior_women"][-1]]),
        ("still-learning", 545.00, 565.00, [s["senior_women"][2], s["flip_start"][0], s["flip_start"][-1]]),
        ("fourteen-points", 565.00, 584.10, [s["flip_start"][1], s["flip_end"][2], s["flip_end"][-1]]),
        ("professional-judgment", 584.10, 603.20, [s["senior_women"][0], s["critical"][2], s["critical"][-1]]),
        ("cocktail-party-arrival", 603.20, 623.03, [s["cocktail_scene"][0], s["cocktail_scene"][1], s["cocktail_scene"][-1]]),
        ("what-is-ai", 623.03, 642.87, [s["cocktail_scene"][2], s["cocktail_card"][0], s["cocktail_card"][-1]]),
        ("talented-new-hire-setup", 642.87, 662.70, [s["cocktail_card"][1], s["new_hire"][2], s["new_hire"][-1]]),
        ("talented-new-hire", 662.70, 681.35, [s["new_hire"][0], s["new_hire_scene"][2], s["new_hire_scene"][-1]]),
        ("no-lived-experience", 681.35, 700.00, [s["new_hire_scene"][0], s["new_hire_scene"][1], s["new_hire"][-1]]),
        ("day-one-talent", 700.00, 719.80, [s["new_hire_scene"][0], s["new_hire_scene"][2], s["new_hire_scene"][-1]]),
        ("onboard-it", 719.80, 739.60, [s["new_hire"][0], s["underhood"][2], s["underhood"][-1]]),
        ("prediction-machine", 739.60, 756.93, [s["prediction"][0], s["prediction"][1], s["prediction"][-1]]),
        ("prediction-grew", 756.93, 774.27, [s["prediction"][2], s["underhood"][0], s["underhood"][-1]]),
        ("two-limits", 774.27, 791.60, [s["underhood"][1], s["context"][2], s["context"][-1]]),
        ("cher-closet", 791.60, 808.80, [s["cher"][0], s["cher"][1], s["cher"][-1]]),
        ("context-limit", 808.80, 826.00, [s["context"][0], s["context"][1], s["context"][-1]]),
        ("plausible-burn-book", 826.00, 843.45, [s["burnbook"][0], s["burnbook"][2], s["burnbook"][-1]]),
        ("same-certainty", 843.45, 860.90, [s["regina"][0], s["regina"][1], s["regina"][-1]]),
        ("generative-ai", 860.90, 873.45, [s["genai"][0], s["genai"][2], s["genai"][-1]]),
        ("model-transition", 873.45, 886.00, [s["genai"][1], s["model"][2], s["model"][-1]]),
        ("model", 886.00, 904.00, [s["model"][0], s["model"][1], s["model"][-1]]),
        ("hallucination", 904.00, 920.00, [s["hallucination"][0], s["hallucination"][2], s["hallucination"][-1]]),
        ("better-not-fixed", 920.00, 936.40, [s["hallucination"][1], s["burnbook"][2], s["hallucination"][-1]]),
        ("cool-mom", 936.40, 951.70, [s["cool_mom"][0], s["cool_mom"][1], s["cool_mom"][-1]]),
        ("hold-auditions", 951.70, 967.00, [s["tryon"][0], s["tryon"][2], s["tryon"][-1]]),
        ("ten-minute-tryon", 967.00, 981.65, [s["tryon"][1], s["tryon"][2], s["tryon"][-1]]),
        ("laidies-dot-ai", 981.65, 996.30, [s["tryon"][0], s["blend_arrival"][2], s["blend_arrival"][-1]]),
        ("three-tool-audition", 996.30, 1025.00, [s["email"][0], s["tryon"][2], s["blend_win_end"][-1]]),
        ("model-strengths-to-high", 1025.00, 1045.00, [s["tryon"][0], s["tryon"][-1], s["high"][2]]),
        ("pop-quiz", 1045.00, 1065.00, [s["high"][0], s["high"][1], s["high"][-1]]),
        ("ksvl", 1065.00, 1085.00, [s["ksvl"][0], s["ksvl"][1], s["ksvl"][-1]]),
        ("fairy-and-charms", 1085.00, 1104.30, [s["fairy"][0], s["fairy"][1], s["fairy"][-1]]),
        ("remember-laidies", 1104.30, 1117.20, [s["signoff"][0], s["signoff"][2], s["signoff"][-1]]),
        ("delta-lai-nu", 1117.20, 1132.30, [s["delta"][0], s["delta"][1], s["delta"][-1]]),
        ("rooms", 1132.30, 1147.40, [s["rooms"][0], s["rooms"][1], s["rooms"][-1]]),
        ("sunnyvaile-signoff", 1147.40, 1150.00, [s["signoff"][-1], s["next_week"][2]]),
        ("episode-two-preview", 1150.00, 1172.24, [s["next_week"][0], s["next_week"][1], s["next_week"][-1]]),
    ]
    parts = [still_sequence(name, images, stop - start) for name, start, stop, images in timeline]
    build_remainder(parts)
    assemble_full()
    checks = verify()
    make_contact()
    manifest = {
        "schema": "laidies.episode-01.full-v27-occurrence-repaired-review.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "frozen_master": record(MASTER),
        "preserved_batches": {"p00-p10": record(OPENING), "p11-p25": record(ONRAMP)},
        "repaired_scope": {"occurrences": "p26-p70", "seconds": [START, END]},
        "semantic_timing": [{"id": name, "start": start, "end": stop, "source_state_count": len(images)} for name, start, stop, images in timeline],
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "builder": record(Path(__file__)),
        "remainder": record(REMAINDER),
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False, "player_binding": False},
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n")
    print(REMAINDER.relative_to(ROOT))
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
