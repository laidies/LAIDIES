#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p47-p53 as a bounded review clip.

The sequence follows the frozen narration from the cocktail-party example into
the Post Office postcard, then introduces the on-site ten-minute Try-On and its
lazy-versus-specific comparison. The result is review evidence only, never an
accepted master, player binding, deployment, or release.
"""

from __future__ import annotations

import hashlib
import json
import runpy
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts/build-episode-02-soft-skills-cocktail-repair-batch-v1.py"
base = runpy.run_path(str(BASE_SCRIPT), run_name="episode_02_batch_helpers")

MASTER = ROOT / "assets/video/episode-02-full-v19-welcome-ident-v2-review.mp4"
MASTER_SHA = "80bfa02d457f3eb1f4318459b083b31be0cb9eac819180ef2a78f0c758449814"
START = 808.0
END = 904.0
DURATION = END - START
FPS = 30
FADE = 0.16

OUT_DIR = ROOT / "operations/video-qa/episode-02-postcard-tryon-repair-batch-v1"
VARIANTS = OUT_DIR / "variants"
SEGMENTS = OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p47-p53-postcard-tryon-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p47-p53-postcard-tryon-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"

SOURCES = {
    "cocktail": ROOT / "assets/episodes/ep-02/comic/ep02-cocktail-comic.png",
    "postcard": ROOT / "assets/episodes/ep-02/comic/ep02-scene-36-postcard-comic.png",
    "title": ROOT / "assets/episodes/ep-02/comic/ep02-title-card-comic-v2.png",
    "tryon": ROOT / "assets/episodes/ep-02/comic/ep02-tryon-comic.png",
    "comparison": ROOT / "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
}


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


def configure_helpers() -> None:
    helper_globals = base["sequence"].__globals__
    helper_globals.update({
        "ROOT": ROOT,
        "MASTER": MASTER,
        "START": START,
        "END": END,
        "DURATION": DURATION,
        "FPS": FPS,
        "FADE": FADE,
        "OUT_DIR": OUT_DIR,
        "VARIANTS": VARIANTS,
        "SEGMENTS": SEGMENTS,
        "OUTPUT": OUTPUT,
        "CONTACT": CONTACT,
    })


def create_variants() -> dict[str, Path]:
    reveal = base["make_reveal"]
    return {
        "cocktail_cheese": reveal(SOURCES["cocktail"], VARIANTS / "cocktail-cheese.png", [(730, 500, 1795, 945)]),
        "postcard_people": reveal(SOURCES["postcard"], VARIANTS / "postcard-people.png", [(35, 40, 1420, 1040)]),
        "postcard_note": reveal(SOURCES["postcard"], VARIANTS / "postcard-note.png", [(1390, 500, 1900, 1035)]),
        "title_name": reveal(SOURCES["title"], VARIANTS / "title-name.png", [(600, 130, 1780, 890)]),
        "tryon_header": reveal(SOURCES["tryon"], VARIANTS / "tryon-header.png", [(340, 35, 1800, 260)]),
        "tryon_task": reveal(SOURCES["tryon"], VARIANTS / "tryon-task.png", [(55, 245, 1840, 690)]),
        "tryon_answers": reveal(SOURCES["tryon"], VARIANTS / "tryon-answers.png", [(815, 290, 1800, 715)]),
        "tryon_payoff": reveal(SOURCES["tryon"], VARIANTS / "tryon-payoff.png", [(75, 685, 1810, 1030)]),
        "comparison_task": reveal(SOURCES["comparison"], VARIANTS / "comparison-task.png", [(35, 30, 1870, 690)]),
        "comparison_payoff": reveal(SOURCES["comparison"], VARIANTS / "comparison-payoff.png", [(35, 660, 1870, 1035)]),
    }


def make_contact() -> None:
    """Sample twenty frames inside this batch's 96-second boundary."""
    times = [2 + 4.7 * index for index in range(20)]
    ffmpeg = base["FFMPEG"]
    run = base["run"]
    with tempfile.TemporaryDirectory(prefix="e02-postcard-tryon-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.png"
            run([
                str(ffmpeg), "-y", "-v", "error", "-ss", str(timestamp),
                "-i", str(OUTPUT), "-frames:v", "1", str(frame),
            ])
            frames.append(Image.open(frame).convert("RGB").resize((480, 270), Image.Resampling.LANCZOS))
        contact = Image.new("RGB", (2400, 1080), (15, 8, 22))
        for index, frame in enumerate(frames):
            contact.paste(frame, ((index % 5) * 480, (index // 5) * 270))
        contact.save(CONTACT, quality=93, optimize=True)


def main() -> None:
    required = [MASTER, BASE_SCRIPT, *SOURCES.values()]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing source(s):\n- " + "\n- ".join(missing))
    if sha256(MASTER) != MASTER_SHA:
        raise SystemExit("Frozen Episode 02 master hash changed; refusing to build")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    VARIANTS.mkdir(parents=True, exist_ok=True)
    SEGMENTS.mkdir(parents=True, exist_ok=True)
    configure_helpers()
    v = create_variants()
    sequence = base["sequence"]
    parts = [
        sequence("p47-career-cheese-payoff", [v["cocktail_cheese"], SOURCES["cocktail"]], 12.7),
        sequence("p48-friend-to-post-office", [v["cocktail_cheese"], v["postcard_people"], SOURCES["postcard"]], 12.7),
        sequence("p49-postcard-better-together", [v["postcard_people"], v["postcard_note"], SOURCES["postcard"]], 15.75),
        sequence("p50-tryon-not-homework", [SOURCES["title"], v["title_name"], v["tryon_header"]], 15.75),
        sequence("p51-laidies-to-written-tryon", [v["title_name"], SOURCES["title"], v["tryon_header"], v["tryon_task"]], 12.05),
        sequence("p52-hand-task-twice", [v["tryon_header"], v["tryon_task"], v["tryon_answers"]], 12.05),
        sequence("p53-lazy-versus-specific", [v["tryon_task"], v["tryon_answers"], v["tryon_payoff"], v["comparison_task"], v["comparison_payoff"], SOURCES["comparison"]], 15.0),
    ]
    base["concatenate"](parts)
    make_contact()
    checks = base["verify"]()
    manifest = {
        "schema": "laidies.episode-02.postcard-tryon-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p47-p53", "seconds": [START, END]},
        "frozen_master": record(MASTER),
        "builder": record(Path(__file__)),
        "helper_builder": record(BASE_SCRIPT),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT),
        "contact": record(CONTACT),
        "checks": checks,
        "semantic_repairs": {
            "p47-p49": "the career-example cheese joke now hands off visibly into the Post Office and the narrated better-with-your-people postcard",
            "p50-p51": "the episode close now preserves the Episode 02 identity before introducing the on-site ten-minute Try-On",
            "p52-p53": "the real task, lazy first ask, David Rose specificity pass, side-by-side answers, and specificity payoff reveal in narration order",
            "motion": "purposeful narrated-region progression; no generic quote-card substitution or camera-only movement",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT))
    print(CONTACT.relative_to(ROOT))
    print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
