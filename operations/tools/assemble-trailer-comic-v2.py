#!/usr/bin/env python3
"""Build the LAiDIES all-comic trailer review v2 from the existing 58-beat film.

The existing sequence, clip timing, and narration remain authoritative. This
script replaces only five rejected/off-brand beats, keeps every replacement at
the exact source-clip duration, concatenates the same 58-beat sequence, and
muxes the untouched audio from the existing all-comic film.

It never overwrites existing exports.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
COMIC = ROOT / "assets/episodes/trailer/comic"
SOURCE_MANIFEST = COMIC / "trailer-sequence.ffconcat"
SOURCE_FILM = (
    COMIC
    / "delivery/canonical-named-map/laidies-trailer-comic-v1-1920.mp4"
)
OUTPUT = (
    COMIC
    / "delivery/canonical-named-map/"
    "laidies-trailer-comic-v2-repaired-review-1920.mp4"
)
REVIEW_MANIFEST = COMIC / "trailer-sequence-v2-repaired-review.ffconcat"
REPORT = ROOT / "operations/video-qa/trailer-comic-v2-repaired-review-qc.json"

FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

REPLACEMENTS = {
    "trailer-b19-on-wednesdays-we-do-ai-comic-v1-1920-clip.mp4": {
        "still": ROOT
        / "assets/episodes/ep-01/pixel/delivery-20260719-master-v1/"
        "ep01-title-comic.png",
        "clip": COMIC
        / "trailer-b19-on-wednesdays-we-do-ai-title-approved-v2-1920-clip.mp4",
        "motion": True,
        "reason": "Removes the rejected four-women-in-pink frame and reuses the real Episode 01 comic title.",
    },
    "trailer-b42-delta-lai-nu-rooms-comic-v1-1920-clip.mp4": {
        "still": COMIC
        / "trailer-b42-delta-lai-nu-hall-empty-comic-candidate-v2-1920.png",
        "clip": COMIC
        / "trailer-b42-delta-lai-nu-hall-empty-comic-v2-1920-clip.mp4",
        "motion": True,
        "reason": "Removes the explicitly rejected host and obsolete foreground sign.",
    },
    "trailer-b55-brand-card-ladies-ai-comic-v1-1920-clip.mp4": {
        "still": COMIC
        / "trailer-b55-brand-card-approved-wordmark-candidate-v3-1920.png",
        "clip": COMIC
        / "trailer-b55-brand-card-approved-wordmark-v3-1920-clip.mp4",
        "motion": True,
        "reason": "Replaces the obsolete Ladies.AI wordmark with the approved LAiDIES wordmark.",
    },
    "trailer-b57-next-week-teaser-comic-v1-1920-clip.mp4": {
        "still": COMIC
        / "trailer-b57-next-week-teaser-do-ai-candidate-v2-1920.png",
        "clip": COMIC
        / "trailer-b57-next-week-teaser-do-ai-v2-1920-clip.mp4",
        "motion": False,
        "reason": "Corrects the episode title from USE AI to DO Ai.",
    },
    "trailer-b58-end-card-dial-up-comic-v1-1920-clip.mp4": {
        "still": COMIC
        / "trailer-b58-end-card-dial-up-no-obsolete-wordmark-candidate-v2-1920.png",
        "clip": COMIC
        / "trailer-b58-end-card-dial-up-no-obsolete-wordmark-v2-1920-clip.mp4",
        "motion": True,
        "reason": "Removes the obsolete Ladies.AI end-card wordmark.",
    },
}


def run(args: list[str], *, capture: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    )


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def duration(path: Path) -> float:
    probe = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path), "-f", "null", "-"],
        cwd=ROOT,
        check=False,
        text=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    match = re.search(r"Duration:\s+(\d+):(\d+):(\d+(?:\.\d+)?)", probe.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def render_clip(still: Path, clip: Path, seconds: float, motion: bool) -> None:
    if clip.exists():
        raise FileExistsError(f"Refusing to overwrite replacement clip: {clip}")
    frames = round(seconds * 30)
    if motion:
        increment = 0.012 / max(frames - 1, 1)
        video_filter = (
            "scale=3840:2160:force_original_aspect_ratio=increase:"
            "flags=lanczos,crop=3840:2160,setsar=1,"
            f"zoompan=z='min(zoom+{increment:.10f},1.012000)':"
            "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"d={frames}:s=1920x1080:fps=30,"
            f"trim=duration={seconds:.6f},format=yuv420p"
        )
    else:
        video_filter = (
            "scale=1920:1080:force_original_aspect_ratio=increase:"
            "flags=lanczos,crop=1920:1080,setsar=1,fps=30,"
            f"trim=duration={seconds:.6f},format=yuv420p"
        )
    run(
        [
            str(FFMPEG),
            "-n",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-loop",
            "1",
            "-framerate",
            "30",
            "-i",
            str(still),
            "-vf",
            video_filter,
            "-frames:v",
            str(frames),
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-profile:v",
            "high",
            "-level:v",
            "4.1",
            "-pix_fmt",
            "yuv420p",
            "-r",
            "30",
            "-video_track_timescale",
            "15360",
            "-movflags",
            "+faststart",
            str(clip),
        ]
    )


def parse_manifest() -> list[str]:
    lines = SOURCE_MANIFEST.read_text(encoding="utf-8").splitlines()
    clips: list[str] = []
    for line in lines:
        match = re.fullmatch(r"file '([^']+)'", line.strip())
        if match:
            clips.append(match.group(1))
    if len(clips) != 58:
        raise RuntimeError(f"Expected 58 trailer clips, found {len(clips)}")
    return clips


def main() -> int:
    if not FFMPEG.exists():
        raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
    for required in [SOURCE_MANIFEST, SOURCE_FILM]:
        if not required.exists():
            raise FileNotFoundError(required)
    if OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite review film: {OUTPUT}")
    if REVIEW_MANIFEST.exists():
        raise FileExistsError(f"Refusing to overwrite manifest: {REVIEW_MANIFEST}")
    if REPORT.exists():
        raise FileExistsError(f"Refusing to overwrite report: {REPORT}")

    source_clips = parse_manifest()
    replacement_report = []
    for original_name, item in REPLACEMENTS.items():
        original_clip = COMIC / original_name
        still = item["still"]
        replacement_clip = item["clip"]
        for required in [original_clip, still]:
            if not required.exists():
                raise FileNotFoundError(required)
        original_duration = duration(original_clip)
        render_clip(
            still=still,
            clip=replacement_clip,
            seconds=original_duration,
            motion=bool(item["motion"]),
        )
        new_duration = duration(replacement_clip)
        if abs(new_duration - original_duration) > 0.04:
            raise RuntimeError(
                f"Duration mismatch for {original_name}: "
                f"{original_duration:.3f}s vs {new_duration:.3f}s"
            )
        replacement_report.append(
            {
                "beat": original_name.split("-")[1],
                "original_clip": str(original_clip.relative_to(ROOT)),
                "replacement_still": str(still.relative_to(ROOT)),
                "replacement_clip": str(replacement_clip.relative_to(ROOT)),
                "duration_seconds": original_duration,
                "motion": bool(item["motion"]),
                "reason": item["reason"],
                "still_sha256": sha256(still),
                "clip_sha256": sha256(replacement_clip),
            }
        )

    manifest_lines = ["ffconcat version 1.0"]
    for clip_name in source_clips:
        clip_path = Path(clip_name)
        if clip_name in REPLACEMENTS:
            clip_path = REPLACEMENTS[clip_name]["clip"]
        elif not clip_path.is_absolute():
            clip_path = COMIC / clip_path
        manifest_lines.append(f"file '{clip_path.as_posix()}'")
    REVIEW_MANIFEST.write_text("\n".join(manifest_lines) + "\n", encoding="utf-8")

    run(
        [
            str(FFMPEG),
            "-n",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(REVIEW_MANIFEST),
            "-i",
            str(SOURCE_FILM),
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "copy",
            "-c:a",
            "copy",
            "-shortest",
            "-movflags",
            "+faststart",
            str(OUTPUT),
        ]
    )

    # Full decode is a required gate for review promotion.
    run(
        [
            str(FFMPEG),
            "-v",
            "error",
            "-i",
            str(OUTPUT),
            "-map",
            "0:v:0",
            "-map",
            "0:a:0",
            "-f",
            "null",
            "-",
        ]
    )

    report = {
        "label": "LAiDIES all-comic trailer v2 repaired review",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source_film": str(SOURCE_FILM.relative_to(ROOT)),
        "source_film_sha256": sha256(SOURCE_FILM),
        "source_manifest": str(SOURCE_MANIFEST.relative_to(ROOT)),
        "review_manifest": str(REVIEW_MANIFEST.relative_to(ROOT)),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "duration_seconds": duration(OUTPUT),
        "full_decode_passed": True,
        "sequence_clip_count": len(source_clips),
        "replacement_count": len(replacement_report),
        "replacements": replacement_report,
        "publication_status": "review_only_not_mapped_to_site",
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise
