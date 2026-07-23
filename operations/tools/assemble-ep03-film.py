#!/usr/bin/env python3
"""Assemble the authoritative 49-cue Episode 3 film without burned captions."""

from __future__ import annotations

import json
import math
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CUES_JSON = ROOT / "content/episodes/episode-03-cues.json"
AUDIO = ROOT / "content/music/episode-03-narration.mp3"
COMIC = ROOT / "assets/episodes/ep-03/comic"
OUTPUT = ROOT / "assets/video/episode-03-full-v8.mp4"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

FPS = 30
# The narration is the authority for the film tail.  The spec's nominal final
# hold extends beyond it; the player must end with the narration.
AUDIO_END = 1047.98

TITLE = COMIC / "ep03-open-03-title-comic-v6-sky-balanced-1920.png"
TRANSFORMATION = COMIC / "ep03-cue08-canva-transformation-once-v2.mp4"
AMBIENT_CUES = {3, 4, 5, 6, 9, 11, 14, 17, 19, 21, 22, 25, 30, 38, 45}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def encode_segment(cue_index: int, source: Path, duration: float, output: Path) -> None:
    # Cue in-times are exact 30 fps boundaries.  Ceil the non-integral final
    # hold so video never ends before the narration and clips its last syllable.
    frame_count = math.ceil(duration * FPS - 1e-6)
    common = [
        "-vf",
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p",
        "-frames:v",
        str(frame_count),
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(output),
    ]

    if cue_index == 8:
        cmd = [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(TRANSFORMATION),
            "-vf",
            "scale=1920:1080:force_original_aspect_ratio=decrease,"
            "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,"
            f"tpad=stop_mode=clone:stop_duration={max(duration - 5.0, 0.0):.3f},"
            f"trim=duration={duration:.3f},format=yuv420p",
            "-frames:v",
            str(frame_count),
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(output),
        ]
    elif cue_index in AMBIENT_CUES:
        cmd = [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-stream_loop",
            "-1",
            "-i",
            str(source),
            *common,
        ]
    else:
        cmd = [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-loop",
            "1",
            "-framerate",
            str(FPS),
            "-i",
            str(source),
            *common,
        ]
    run(cmd)


def main() -> None:
    data = json.loads(CUES_JSON.read_text())
    cues = data["cues"]
    if len(cues) != 49:
        raise ValueError(f"expected 49 cues, found {len(cues)}")
    if not FFMPEG.exists():
        raise FileNotFoundError(FFMPEG)
    if not AUDIO.exists():
        raise FileNotFoundError(AUDIO)
    if not TITLE.exists():
        raise FileNotFoundError(TITLE)
    if not TRANSFORMATION.exists():
        raise FileNotFoundError(TRANSFORMATION)

    resolved: list[tuple[int, float, float, Path]] = []
    for index, cue in enumerate(cues):
        start = float(cue["t"])
        end = float(cues[index + 1]["t"]) if index + 1 < len(cues) else AUDIO_END
        duration = end - start
        if duration <= 0:
            raise ValueError(f"cue {index} has non-positive duration {duration}")

        if index == 2:
            source = TITLE
        elif index == 8:
            source = TRANSFORMATION
        elif index in AMBIENT_CUES:
            source = COMIC / f"ep03-cue{index:02d}-canva-ambient-loop-v1.mp4"
        else:
            source = ROOT / cue["src"].lstrip("/")
        if not source.exists():
            raise FileNotFoundError(f"cue {index}: {source}")
        resolved.append((index, start, duration, source))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ep03-assembly-") as temp_name:
        temp = Path(temp_name)
        segments: list[Path] = []
        for index, start, duration, source in resolved:
            segment = temp / f"cue-{index:02d}.mp4"
            print(
                f"cue {index:02d}  {start:8.1f}s  {duration:6.2f}s  {source.name}",
                flush=True,
            )
            encode_segment(index, source, duration, segment)
            segments.append(segment)

        manifest = temp / "concat.txt"
        manifest.write_text(
            "".join(f"file '{segment.as_posix()}'\n" for segment in segments)
        )
        silent = temp / "episode-03-silent.mp4"
        run(
            [
                str(FFMPEG),
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(manifest),
                "-c",
                "copy",
                str(silent),
            ]
        )
        run(
            [
                str(FFMPEG),
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-i",
                str(silent),
                "-i",
                str(AUDIO),
                "-map",
                "0:v:0",
                "-map",
                "1:a:0",
                "-c:v",
                "copy",
                "-af",
                "apad=pad_dur=0.1",
                "-c:a",
                "aac",
                "-b:a",
                "192k",
                "-t",
                f"{math.ceil(AUDIO_END * FPS) / FPS:.3f}",
                "-movflags",
                "+faststart",
                str(OUTPUT),
            ]
        )
    print(f"\nWROTE {OUTPUT.relative_to(ROOT)}", flush=True)


if __name__ == "__main__":
    main()
