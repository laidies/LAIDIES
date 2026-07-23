#!/usr/bin/env python3
"""Assemble the locked EP04 v3 placement brief and burn captions below the art.

All named source assets are read-only. Motion assets play once; a short asset is
padded by cloning its own final frame, never by looping or cutting to a source
still. The first London transition is the sole over-length source and is played
once at the speed needed to fit its locked five-second placement.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
BRIEF = ROOT / "operations/codex-prompts/ep04-assembly-prompt.md"
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
NARRATION = ROOT / "content/music/episode-04-narration.mp3"
CAPTIONS = ROOT / "assets/captions/episode-04.vtt"
OUTPUT = ROOT / "assets/video/episode-04-full-v3.mp4"
REPORT = ROOT / "assets/video/episode-04-full-v3-qc.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

FPS = 30
END = 1222.40
CROSSFADE = 0.45
PICTURE_W = 1600
PICTURE_H = 900
PICTURE_X = 160
PICTURE_Y = 0
BURN_CAPTIONS = True


@dataclass(frozen=True)
class Placement:
    number: int
    start: float
    listed_hold: float
    kind: str
    filename: str


ROW_RE = re.compile(
    r"^\|\s*(\d+)\s*\|\s*([0-9:.]+)\s*\|\s*([0-9.]+)s\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$"
)


def parse_time(value: str) -> float:
    fields = [float(part) for part in value.split(":")]
    if len(fields) == 2:
        return fields[0] * 60 + fields[1]
    if len(fields) == 3:
        return fields[0] * 3600 + fields[1] * 60 + fields[2]
    raise ValueError(f"Unsupported timestamp: {value}")


def load_placements() -> list[Placement]:
    placements: list[Placement] = []
    for line in BRIEF.read_text(encoding="utf-8").splitlines():
        match = ROW_RE.match(line)
        if not match:
            continue
        number, timestamp, hold, kind, filename = match.groups()
        placements.append(
            Placement(int(number), parse_time(timestamp), float(hold), kind.strip(), filename)
        )
    if len(placements) != 54:
        raise RuntimeError(f"Expected 54 placement rows, found {len(placements)}")
    if placements[0].start != 0 or placements[-1].start != 1184.0:
        raise RuntimeError("Unexpected first or final placement time")
    if placements[-1].filename != "ep04-next-week-comic-v1-1920.png":
        raise RuntimeError("Unexpected final placement asset")
    return placements


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration: {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def validate_sources(placements: list[Placement]) -> dict[str, str]:
    if not FFMPEG.is_file():
        raise FileNotFoundError(FFMPEG)
    for path in (BRIEF, NARRATION, CAPTIONS):
        if not path.is_file():
            raise FileNotFoundError(path)
    if OUTPUT.exists() or REPORT.exists():
        raise FileExistsError(f"Refusing to overwrite an existing v3 deliverable: {OUTPUT} / {REPORT}")

    checksums: dict[str, str] = {}
    for placement in placements:
        path = PIXEL / placement.filename
        if not path.is_file():
            raise FileNotFoundError(path)
        if path.suffix.lower() == ".png":
            with Image.open(path) as image:
                if image.size != (1920, 1080):
                    raise ValueError(f"{path.name}: expected 1920x1080, got {image.size}")
        checksums[str(path.relative_to(ROOT))] = sha256(path)
    checksums[str(NARRATION.relative_to(ROOT))] = sha256(NARRATION)
    checksums[str(CAPTIONS.relative_to(ROOT))] = sha256(CAPTIONS)
    if abs(probe_duration(NARRATION) - END) > 0.02:
        raise RuntimeError("Narration duration does not match 20:22.40")
    return checksums


def escape_filter_path(path: Path) -> str:
    return str(path).replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'")


def build(placements: list[Placement]) -> list[dict]:
    command = [str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning"]
    spans: list[float] = []
    source_durations: list[float | None] = []

    for index, placement in enumerate(placements):
        stop = placements[index + 1].start if index + 1 < len(placements) else END
        span = stop - placement.start
        spans.append(span)
        path = PIXEL / placement.filename
        is_still = path.suffix.lower() == ".png"
        extends_for_fade = (
            is_still
            and index + 1 < len(placements)
            and (PIXEL / placements[index + 1].filename).suffix.lower() == ".png"
        )
        input_duration = span + (CROSSFADE if extends_for_fade else 0.0)
        if is_still:
            command += [
                "-loop", "1", "-framerate", str(FPS), "-t", f"{input_duration:.3f}", "-i", str(path)
            ]
            source_durations.append(None)
        else:
            command += ["-i", str(path)]
            source_durations.append(probe_duration(path))

    narration_index = len(placements)
    command += ["-i", str(NARRATION)]

    filters = [f"color=c=black:s=1920x1080:r={FPS}:d={END:.2f}[base]"]
    playback: list[dict] = []
    for index, placement in enumerate(placements):
        path = PIXEL / placement.filename
        is_still = path.suffix.lower() == ".png"
        span = spans[index]
        extends_for_fade = (
            is_still
            and index + 1 < len(placements)
            and (PIXEL / placements[index + 1].filename).suffix.lower() == ".png"
        )
        visible_duration = span + (CROSSFADE if extends_for_fade else 0.0)

        if is_still:
            chain = f"[{index}:v]fps={FPS},trim=duration={visible_duration:.3f},setpts=PTS-STARTPTS,"
            mode = "still"
            speed = 1.0
            hold = 0.0
        else:
            assert source_durations[index] is not None
            source_duration = source_durations[index]
            if source_duration > span + (1.0 / FPS):
                speed = span / source_duration
                chain = f"[{index}:v]setpts={speed:.9f}*(PTS-STARTPTS),fps={FPS},"
                hold = 0.0
                mode = "play-once fitted to locked slot"
            else:
                speed = 1.0
                hold = max(0.0, span - source_duration)
                chain = f"[{index}:v]setpts=PTS-STARTPTS,fps={FPS},"
                mode = "play-once then final-frame hold" if hold > 1.0 / FPS else "play-once"
            # A decoded 30 fps source's final timestamp is one frame earlier than
            # its container duration. Add a small cushion before the exact trim so
            # fractional-time placements cannot expose a one-frame black gap.
            chain += f"tpad=stop_mode=clone:stop_duration={max(hold + 0.10, 0.10):.3f},trim=duration={span:.3f},setpts=PTS-STARTPTS,"

        chain += (
            f"scale={PICTURE_W}:{PICTURE_H}:force_original_aspect_ratio=decrease,"
            f"pad=1920:1080:{PICTURE_X}:{PICTURE_Y}:color=black,setsar=1,format=rgba"
        )

        fade_in = (
            is_still
            and index > 0
            and (PIXEL / placements[index - 1].filename).suffix.lower() == ".png"
        )
        if fade_in:
            chain += f",fade=t=in:st=0:d={CROSSFADE:.3f}:alpha=1"
        chain += f",setpts=PTS-STARTPTS+{placement.start:.3f}/TB[v{index}]"
        filters.append(chain)
        playback.append(
            {
                "placement": placement.number,
                "start_seconds": placement.start,
                "timeline_span_seconds": round(span, 3),
                "source": placement.filename,
                "mode": mode,
                "speed_factor": round(speed, 9),
                "final_frame_hold_seconds": round(hold, 3),
                "crossfade_in_seconds": CROSSFADE if fade_in else 0.0,
            }
        )

    previous = "base"
    for index, placement in enumerate(placements):
        end = placement.start + spans[index]
        if (
            (PIXEL / placement.filename).suffix.lower() == ".png"
            and index + 1 < len(placements)
            and (PIXEL / placements[index + 1].filename).suffix.lower() == ".png"
        ):
            end += CROSSFADE
        out = f"mix{index}"
        filters.append(
            # Fractional in-times such as 11:01.43 do not always land on the 30
            # fps grid. Repeating the secondary's last decoded frame *only while
            # its exact enable window is active* closes any sub-frame coverage
            # gap without looping motion or changing an edit point.
            f"[{previous}][v{index}]overlay=eof_action=repeat:repeatlast=1:shortest=0:"
            f"enable='between(t,{placement.start:.3f},{end:.3f})'[{out}]"
        )
        previous = out

    if BURN_CAPTIONS:
        subtitle_style = (
            # WebVTT is converted by libass at a 384x288 script resolution, so these
            # values scale about 5x at 1920x1080. Fontsize 8 yields a ~40 px caption.
            "FontName=Arial,Fontsize=8,PrimaryColour=&H00FFFFFF,"
            "BackColour=&H00000000,OutlineColour=&H00000000,"
            "BorderStyle=3,Outline=0.25,Shadow=0,Alignment=2,MarginL=30,MarginR=30,MarginV=3"
        )
        filters.append(
            f"[{previous}]subtitles=filename='{escape_filter_path(CAPTIONS)}':"
            f"original_size=1920x1080:force_style='{subtitle_style}',format=yuv420p[outv]"
        )
    else:
        filters.append(f"[{previous}]format=yuv420p[outv]")

    command += [
        "-filter_complex", ";".join(filters),
        "-map", "[outv]", "-map", f"{narration_index}:a:0",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        "-profile:v", "high", "-level:v", "4.1", "-pix_fmt", "yuv420p", "-r", str(FPS),
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-movflags", "+faststart", "-t", f"{END:.2f}", str(OUTPUT),
    ]
    subprocess.run(command, check=True)
    return playback


def output_probe() -> dict:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(OUTPUT)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    duration_match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not duration_match:
        raise RuntimeError("Could not probe the finished output")
    hours, minutes, seconds = duration_match.groups()
    duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    video_line = next(line.strip() for line in result.stderr.splitlines() if "Video:" in line)
    audio_line = next(line.strip() for line in result.stderr.splitlines() if "Audio:" in line)
    if abs(duration - END) > 0.02:
        raise RuntimeError(f"Unexpected output duration: {duration:.3f}")
    if "h264" not in video_line.lower() or "1920x1080" not in video_line or "30 fps" not in video_line:
        raise RuntimeError(f"Unexpected video stream: {video_line}")
    if "aac" not in audio_line.lower():
        raise RuntimeError(f"Unexpected audio stream: {audio_line}")
    return {"duration_seconds": duration, "video_stream": video_line, "audio_stream": audio_line}


def main() -> None:
    placements = load_placements()
    source_hashes = validate_sources(placements)
    playback = build(placements)
    if source_hashes != validate_sources_after(placements):
        raise RuntimeError("A protected source changed during assembly")
    probe = output_probe()
    report = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "brief": str(BRIEF.relative_to(ROOT)),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "output_size_bytes": OUTPUT.stat().st_size,
        "standard": {"width": 1920, "height": 1080, "fps": FPS, "codec": "H.264", "audio": "AAC"},
        "picture_region": {"x": PICTURE_X, "y": PICTURE_Y, "width": PICTURE_W, "height": PICTURE_H},
        "caption_region": ({"x": 0, "y": PICTURE_H, "width": 1920, "height": 1080 - PICTURE_H} if BURN_CAPTIONS else None),
        "caption_source": (str(CAPTIONS.relative_to(ROOT)) if BURN_CAPTIONS else None),
        "captions_burned": BURN_CAPTIONS,
        "placements": playback,
        "probe": probe,
        "source_sha256": source_hashes,
        "approved_sources_untouched": True,
    }
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(OUTPUT)
    print(REPORT)


def validate_sources_after(placements: list[Placement]) -> dict[str, str]:
    checksums: dict[str, str] = {}
    for placement in placements:
        path = PIXEL / placement.filename
        checksums[str(path.relative_to(ROOT))] = sha256(path)
    checksums[str(NARRATION.relative_to(ROOT))] = sha256(NARRATION)
    checksums[str(CAPTIONS.relative_to(ROOT))] = sha256(CAPTIONS)
    return checksums


if __name__ == "__main__":
    main()
