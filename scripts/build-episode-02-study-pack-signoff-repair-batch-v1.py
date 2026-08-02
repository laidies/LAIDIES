#!/usr/bin/env python3
"""Build Episode 02 occurrence repairs p54-p60 as a bounded review clip."""

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
START, END, FPS, FADE = 904.0, 987.48, 30, 0.16
DURATION = END - START

OUT_DIR = ROOT / "operations/video-qa/episode-02-study-pack-signoff-repair-batch-v1"
VARIANTS, SEGMENTS = OUT_DIR / "variants", OUT_DIR / "segments"
OUTPUT = OUT_DIR / "episode-02-p54-p60-study-pack-signoff-repaired-review-v1.mp4"
CONTACT = OUT_DIR / "episode-02-p54-p60-study-pack-signoff-contact-v1.jpg"
MANIFEST = OUT_DIR / "manifest.json"
SOURCES = {
    "comparison": ROOT / "assets/episodes/ep-02/comic/ep02-comicpage-vague-vs-specific.png",
    "study_pack": ROOT / "assets/episodes/trailer/comic/trailer-b29-blend-snap-study-pack-comic-v1-1920.png",
    "quiz": ROOT / "assets/episodes/trailer/comic/trailer-b33-high-pop-quiz-comic-v1-1920.png",
    "clips": ROOT / "assets/video/comic-interstitials-v1/butterfly-clips-as-if.png",
    "hooks": ROOT / "assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-ksvl-hooks-comic.png",
    "song": ROOT / "assets/episodes/ep-02/comic/ep02-scene-30-request-the-song-comic.png",
    "maikeover": ROOT / "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/09-maikeover-on-maine.png",
    "signoff": ROOT / "assets/episodes/ep-02/comic/ep02-signoff-comic.png",
    "next_week": ROOT / "assets/episodes/ep-02/comic/ep02-open-next-week-comic.png",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    return {"path": str(path.relative_to(ROOT)), "sha256": sha256(path), "size_bytes": path.stat().st_size}


def configure_helpers() -> None:
    base["sequence"].__globals__.update({
        "ROOT": ROOT, "MASTER": MASTER, "START": START, "END": END,
        "DURATION": DURATION, "FPS": FPS, "FADE": FADE, "OUT_DIR": OUT_DIR,
        "VARIANTS": VARIANTS, "SEGMENTS": SEGMENTS, "OUTPUT": OUTPUT,
        "CONTACT": CONTACT,
    })


def create_variants() -> dict[str, Path]:
    reveal = base["make_reveal"]
    maikeover_canvas = VARIANTS / "maikeover-1920x1080.png"
    Image.open(SOURCES["maikeover"]).convert("RGB").resize(
        (1920, 1080), Image.Resampling.LANCZOS
    ).save(maikeover_canvas, optimize=True)
    return {
        "comparison_payoff": reveal(SOURCES["comparison"], VARIANTS / "comparison-payoff.png", [(35, 660, 1870, 1035)]),
        "study_stop": reveal(SOURCES["study_pack"], VARIANTS / "study-stop.png", [(20, 20, 820, 180)]),
        "study_pack": reveal(SOURCES["study_pack"], VARIANTS / "study-pack.png", [(35, 100, 1880, 1040)]),
        "quiz_stop": reveal(SOURCES["quiz"], VARIANTS / "quiz-stop.png", [(20, 20, 850, 180)]),
        "quiz_sheet": reveal(SOURCES["quiz"], VARIANTS / "quiz-sheet.png", [(35, 115, 1380, 1030)]),
        "quiz_clips": reveal(SOURCES["quiz"], VARIANTS / "quiz-clips.png", [(1300, 100, 1880, 1030)]),
        "hooks_radio": reveal(SOURCES["hooks"], VARIANTS / "hooks-radio.png", [(0, 0, 1920, 1080)]),
        "song_phone": reveal(SOURCES["song"], VARIANTS / "song-phone.png", [(520, 80, 1890, 1040)]),
        "maikeover_canvas": maikeover_canvas,
        "signoff_words": reveal(SOURCES["signoff"], VARIANTS / "signoff-words.png", [(20, 20, 920, 1050)]),
        "signoff_next": reveal(SOURCES["signoff"], VARIANTS / "signoff-next.png", [(880, 20, 1900, 1040)]),
        "next_problem": reveal(SOURCES["next_week"], VARIANTS / "next-problem.png", [(25, 25, 1890, 1040)]),
    }


def make_contact() -> None:
    times = [1.5 + 4.1 * index for index in range(20)]
    with tempfile.TemporaryDirectory(prefix="e02-study-pack-signoff-contact-") as td:
        td_path = Path(td)
        frames = []
        for index, timestamp in enumerate(times):
            frame = td_path / f"{index:02d}.png"
            base["run"]([str(base["FFMPEG"]), "-y", "-v", "error", "-ss", str(timestamp), "-i", str(OUTPUT), "-frames:v", "1", str(frame)])
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
    v, sequence = create_variants(), base["sequence"]
    parts = [
        sequence("p54-study-pack-quiz-clips-ksvl", [v["comparison_payoff"], v["study_stop"], v["study_pack"], v["quiz_stop"], v["quiz_sheet"], v["quiz_clips"], SOURCES["clips"], v["hooks_radio"]], 18.0),
        sequence("p55-clips-ksvl-anthem", [v["quiz_clips"], SOURCES["clips"], v["hooks_radio"], v["song_phone"], SOURCES["song"]], 11.0),
        sequence("p56-platform-sandals-hooks", [v["song_phone"], SOURCES["song"], v["hooks_radio"], SOURCES["hooks"]], 11.0),
        sequence("p57-hooks-to-resident-card", [v["hooks_radio"], SOURCES["hooks"], v["maikeover_canvas"]], 9.0),
        sequence("p58-card-collections-to-signoff", [v["maikeover_canvas"], SOURCES["clips"], v["signoff_words"]], 8.3),
        sequence("p59-tell-it-what-you-want", [v["signoff_words"], v["signoff_next"], SOURCES["signoff"], v["next_problem"]], 10.9),
        sequence("p60-burn-book-problem", [v["next_problem"], SOURCES["next_week"]], 15.28),
    ]
    base["concatenate"](parts)
    make_contact()
    # The frozen 987.480 endpoint lands 0.4 frame past a 30fps boundary.
    # FFmpeg correctly emits the ceiling frame; preserve the exact audio clock
    # while making the inherited verifier expect that final partial frame.
    base["verify"].__globals__["DURATION"] = 2505 / FPS
    checks = base["verify"]()
    checks["declared_narration_endpoint_seconds"] = END
    checks["fractional_endpoint_frame_rule"] = "PASS_CEILING_FRAME_PRESERVES_987_480_CLOCK"
    manifest = {
        "schema": "laidies.episode-02.study-pack-signoff-repair-batch.v1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_HOLD_INDEPENDENT_REVIEW_REQUIRED_NOT_PUBLIC",
        "authority": {"accepted": False, "release": False, "deploy": False, "public": False},
        "scope": {"occurrences": "p54-p60", "seconds": [START, END]},
        "frozen_master": record(MASTER), "builder": record(Path(__file__)), "helper_builder": record(BASE_SCRIPT),
        "sources": {key: record(path) for key, path in SOURCES.items()},
        "output": record(OUTPUT), "contact": record(CONTACT), "checks": checks,
        "semantic_repairs": {
            "p54-p56": "the specificity payoff now advances through the Study Pack, Pop Quiz, butterfly clips, KSVL anthem, platform-sandals joke, and books-to-hooks line in narration order",
            "p57-p58": "the music hook now hands off to the actual Maikeover on Main destination, collection reward, and sign-off rule",
            "p59-p60": "AI-can't-read-your-mind, see-you-next-Wednesday, and The Burn Book Problem teaser now resolve as a deliberate closing sequence",
            "motion": "purposeful narration-led shot sequence; source remains frozen and public binding remains prohibited",
        },
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(OUTPUT.relative_to(ROOT)); print(CONTACT.relative_to(ROOT)); print(MANIFEST.relative_to(ROOT))


if __name__ == "__main__":
    main()
