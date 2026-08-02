#!/usr/bin/env python3
"""Build the bounded Trailer B39 transformation proof.

This deliberately rebuilds the complete B39 picture window from five exact
states.  It does not overlay corrections on the rejected yellow-plaid master,
so that outfit cannot flash through.  The original Trailer audio clock is
preserved for review.  Output is local evidence only: no full-title, release,
deploy, publication, or public-player authority.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

BASE = ROOT / "assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v8-multicolour-review-1920.mp4"
SOURCE_DIR = ROOT / "assets/episodes/trailer/comic"
CANDIDATE_DIR = ROOT / "operations/video-qa/trailer-multicolour-outfit-candidates-v1"
OUT_DIR = ROOT / "operations/video-qa/trailer-b39-multicolour-proof-2026-08-02"
OUTPUT = OUT_DIR / "trailer-b39-multicolour-proof-v1.mp4"
MANIFEST = OUT_DIR / "manifest.json"
CAPTIONS = OUT_DIR / "captions.vtt"
POSTER = OUT_DIR / "poster.png"

START_SECONDS = 569.666667
DURATION_SECONDS = 8.066667
FPS = 30

SOURCES = [
    SOURCE_DIR / "trailer-b39-maikeover-glow-up-comic-v1-1920-p0-corporate.png",
    SOURCE_DIR / "trailer-b39-maikeover-glow-up-comic-v1-1920-p1-poof-builds.png",
    SOURCE_DIR / "trailer-b39-maikeover-glow-up-comic-v1-1920-p2-poof-covers-body.png",
    CANDIDATE_DIR / "trailer-b39-p3-multicolour-candidate-v1.png",
    CANDIDATE_DIR / "trailer-b39-p4-multicolour-candidate-v1.png",
]


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


def stream_hash(path: Path, selector: str) -> str:
    result = subprocess.check_output(
        [str(FFMPEG), "-v", "error", "-i", str(path), "-map", selector,
         "-c", "copy", "-f", "hash", "-hash", "sha256", "-"],
        cwd=ROOT,
        text=True,
    )
    return result.strip().split("=", 1)[1]


def main() -> None:
    missing = [str(path.relative_to(ROOT)) for path in [BASE, CAPTIONS, *SOURCES] if not path.exists()]
    if missing:
        raise SystemExit("Missing exact source(s):\n- " + "\n- ".join(missing))

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # The corporate frame is the full-window base. Four later states overlap
    # by 0.25 seconds and alpha-dissolve over it; unlike the rejected builder,
    # no frame from the old B39 motion can appear beneath these states.
    durations = [DURATION_SECONDS, 1.80, 1.80, 2.00, 1.966667]
    starts = [0.00, 1.25, 2.80, 4.35, 6.10]
    filters: list[str] = []
    for index, duration in enumerate(durations):
        alpha = "format=yuv420p" if index == 0 else (
            f"format=rgba,fade=t=in:st=0:d=0.25:alpha=1" +
            (f",fade=t=out:st={duration - 0.25:.6f}:d=0.25:alpha=1" if index < 4 else "")
        )
        # A restrained 2% push keeps the stage alive while the smoke and
        # wardrobe state changes carry the meaningful transformation motion.
        filters.append(
            f"[{index}:v]scale=1960:1103,crop=1920:1080:"
            f"x='20+4*sin(t*1.4+{index})':y='11+3*cos(t*1.2+{index})',"
            f"fps={FPS},trim=duration={duration:.6f},settb=AVTB,setpts=PTS-STARTPTS,"
            f"{alpha},setsar=1"
            f"[s{index}]"
        )

    current = "s0"
    for index in range(1, 5):
        output = f"o{index}"
        start = starts[index]
        end = start + durations[index]
        filters.append(
            f"[s{index}]setpts=PTS-STARTPTS+{start:.6f}/TB[p{index}]"
        )
        filters.append(
            f"[{current}][p{index}]overlay=0:0:eof_action=pass:shortest=0:"
            f"enable='between(t,{start:.6f},{end:.6f})'[{output}]"
        )
        current = output

    font = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    filters.append(
        f"[{current}]drawtext=fontfile='{font}':"
        "text='SUNNYVAiLE  ·  REWIND ERA GLOW-UP':"
        "fontcolor=white:fontsize=34:borderw=2:bordercolor=#351234:"
        "box=1:boxcolor=#351234CC:boxborderw=14:"
        "x=70:y=58:"
        "enable='between(t,0.20,1.70)+between(t,4.20,7.70)',"
        "fade=t=in:st=0:d=0.12,fade=t=out:st=7.78:d=0.20,"
        "format=yuv420p[vout]"
    )

    command = [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error"]
    for source in SOURCES:
        command += ["-framerate", str(FPS), "-loop", "1", "-i", str(source)]
    command += [
        "-ss", f"{START_SECONDS:.6f}", "-t", f"{DURATION_SECONDS:.6f}", "-i", str(BASE),
        "-filter_complex", ";".join(filters),
        "-map", "[vout]", "-map", "5:a:0",
        "-t", f"{DURATION_SECONDS:.6f}",
        "-c:v", "libx264", "-crf", "17", "-preset", "medium",
        "-pix_fmt", "yuv420p", "-r", str(FPS), "-fps_mode", "cfr",
        "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", str(OUTPUT),
    ]
    run(command)
    run([str(FFMPEG), "-v", "error", "-i", str(OUTPUT), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])
    run([
        str(FFMPEG), "-y", "-v", "error", "-ss", "0.10", "-i", str(OUTPUT),
        "-frames:v", "1", str(POSTER),
    ])

    manifest = {
        "schema": "laidies.trailer.b39-transformation-proof.v1",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT LOCALLY / HOLD",
        "authority": {
            "full_title": False,
            "release": False,
            "deploy": False,
            "publication": False,
            "public_player_binding": False,
        },
        "clock": {"source_start_seconds": START_SECONDS, "duration_seconds": DURATION_SECONDS, "fps": FPS},
        "base_audio_source": record(BASE),
        "captions": record(CAPTIONS),
        "source_states": [record(path) for path in SOURCES],
        "output": record(OUTPUT),
        "poster": record(POSTER),
        "output_audio_payload_sha256": stream_hash(OUTPUT, "0:a:0"),
        "purpose": "Prove the complete no-wand corporate-to-multicolour Trailer transformation without a yellow-plaid flash.",
        "motion": {
            "meaningful_event": "poof builds, covers the heroine, clears to the approved multicolour Trailer wardrobe",
            "camera_only": False,
            "transition_seconds": 0.25,
        },
        "on_screen_context": "SUNNYVAiLE · REWIND ERA GLOW-UP",
        "known_exclusions": [
            "yellow-plaid Episode 04 wardrobe",
            "wand",
            "FAiRY Godmother",
            "town-street reveal",
            "public captions over picture",
        ],
        "remaining_gate": "Independent human sound-on normal-speed review of this exact eight-second proof before any full-title assembly.",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"output": record(OUTPUT), "manifest": record(MANIFEST)}, indent=2))


if __name__ == "__main__":
    main()
