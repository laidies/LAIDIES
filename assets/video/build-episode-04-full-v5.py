#!/usr/bin/env python3
"""Assemble the 57-beat EP04 v5 animation brief as a clean 1080p master.

Motion clips play once. When a placement is longer than its clip, the decoded
clip's own final frame is cloned for the remainder. The four replacement event
clips are read from their delivery folder so the rejected originals remain
untouched. No captions are burned into the picture.
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
BRIEF = ROOT / "operations/codex-prompts/ep04-animation-and-assembly.md"
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
REROLLS = PIXEL / "delivery-20260722-animation-v5-rerolls"
BRIEF_CORRECTIONS = PIXEL / "delivery-20260722-animation-v5-brief-correction"
NARRATION = ROOT / "content/music/episode-04-narration.mp3"
OUTPUT = ROOT / "assets/video/episode-04-full-v5.mp4"
REPORT = ROOT / "assets/video/episode-04-full-v5-qc.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

FPS = 30
END = 1222.40
CROSSFADE = 0.45


@dataclass(frozen=True)
class Placement:
    number: int
    start: float
    listed_hold: float
    source: Path
    action: str
    reroll: bool


def parse_time(value: str) -> float:
    parts = [float(part) for part in value.split(":")]
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    if len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    raise ValueError(value)


def load_placements() -> list[Placement]:
    placements: list[Placement] = []
    for line in BRIEF.read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\|\s*\d+\s*\|", line):
            continue
        fields = [field.strip() for field in line.strip().strip("|").split("|")]
        if len(fields) != 5:
            continue
        number_text, timestamp, hold_text, source_field, action = fields
        source_matches = re.findall(r"`([^`]+\.(?:png|mp4))`", source_field)
        action_matches = re.findall(r"`([^`]+\.mp4)`", action)
        if not source_matches:
            raise RuntimeError(f"Could not parse source from row: {line}")
        reroll = "**REGENERATE**" in action
        if "GENERATE 5s Seedance" in action or reroll or "USE existing clip" in action:
            if not action_matches:
                raise RuntimeError(f"Could not parse motion target from row: {line}")
            filename = Path(action_matches[-1]).name
            source = (REROLLS / filename) if reroll else (PIXEL / filename)
        else:
            source = ROOT / source_matches[-1]
        number = int(number_text)
        if number == 13:
            corrected = BRIEF_CORRECTIONS / source.name
            if not corrected.is_file():
                raise FileNotFoundError(
                    f"Beat 13 requires the corrected abstract-stage clip: {corrected}"
                )
            source = corrected
        placements.append(
            Placement(
                number=number,
                start=parse_time(timestamp),
                listed_hold=float(hold_text.removesuffix("s")),
                source=source,
                action=action,
                reroll=reroll,
            )
        )
    if len(placements) != 57:
        raise RuntimeError(f"Expected 57 placements, found {len(placements)}")
    if placements[0].number != 0 or placements[0].start != 0.0:
        raise RuntimeError("Unexpected first placement")
    if placements[-1].number != 56 or placements[-1].start != 1184.0:
        raise RuntimeError("Unexpected final placement")
    if placements[1].start != 37.1:
        raise RuntimeError("Title is not snapped to 0:37.10")
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


def validate_sources(placements: list[Placement], refuse_existing: bool = True) -> dict[str, str]:
    if not FFMPEG.is_file():
        raise FileNotFoundError(FFMPEG)
    for path in (BRIEF, NARRATION):
        if not path.is_file():
            raise FileNotFoundError(path)
    if refuse_existing and (OUTPUT.exists() or REPORT.exists()):
        raise FileExistsError(f"Refusing to overwrite v5: {OUTPUT} / {REPORT}")
    hashes: dict[str, str] = {}
    for placement in placements:
        path = placement.source
        if not path.is_file():
            raise FileNotFoundError(path)
        if path.suffix.lower() == ".png":
            with Image.open(path) as image:
                if image.size != (1920, 1080):
                    raise ValueError(f"{path.name}: expected 1920x1080, got {image.size}")
        hashes[str(path.relative_to(ROOT))] = sha256(path)
    hashes[str(NARRATION.relative_to(ROOT))] = sha256(NARRATION)
    if abs(probe_duration(NARRATION) - END) > 0.02:
        raise RuntimeError("Narration duration does not match 20:22.40")
    return hashes


def build(placements: list[Placement]) -> list[dict[str, object]]:
    command = [str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning"]
    spans: list[float] = []
    source_durations: list[float | None] = []

    for index, placement in enumerate(placements):
        stop = placements[index + 1].start if index + 1 < len(placements) else END
        span = stop - placement.start
        if span <= 0:
            raise RuntimeError(f"Non-positive span at beat {placement.number}")
        spans.append(span)
        is_still = placement.source.suffix.lower() == ".png"
        next_is_still = (
            index + 1 < len(placements)
            and placements[index + 1].source.suffix.lower() == ".png"
        )
        input_duration = span + (CROSSFADE if is_still and next_is_still else 0.0)
        if is_still:
            command += [
                "-loop",
                "1",
                "-framerate",
                str(FPS),
                "-t",
                f"{input_duration:.3f}",
                "-i",
                str(placement.source),
            ]
            source_durations.append(None)
        else:
            command += ["-i", str(placement.source)]
            source_durations.append(probe_duration(placement.source))

    narration_index = len(placements)
    command += ["-i", str(NARRATION)]

    filters = [f"color=c=black:s=1920x1080:r={FPS}:d={END:.2f}[base]"]
    playback: list[dict[str, object]] = []
    for index, placement in enumerate(placements):
        is_still = placement.source.suffix.lower() == ".png"
        span = spans[index]
        previous_is_still = index > 0 and placements[index - 1].source.suffix.lower() == ".png"
        next_is_still = (
            index + 1 < len(placements)
            and placements[index + 1].source.suffix.lower() == ".png"
        )
        visible_duration = span + (CROSSFADE if is_still and next_is_still else 0.0)

        if is_still:
            chain = (
                f"[{index}:v]fps={FPS},trim=duration={visible_duration:.3f},"
                "setpts=PTS-STARTPTS,"
            )
            mode = "still"
            speed = 1.0
            hold = 0.0
        else:
            source_duration = source_durations[index]
            assert source_duration is not None
            if source_duration > span + (1.0 / FPS):
                speed = span / source_duration
                chain = f"[{index}:v]setpts={speed:.9f}*(PTS-STARTPTS),fps={FPS},"
                hold = 0.0
                mode = "play-once fitted to locked slot"
            else:
                speed = 1.0
                hold = max(0.0, span - source_duration)
                chain = f"[{index}:v]setpts=PTS-STARTPTS,fps={FPS},"
                mode = "play-once then own-final-frame hold" if hold > 1.0 / FPS else "play-once"
            chain += (
                f"tpad=stop_mode=clone:stop_duration={max(hold + 0.10, 0.10):.3f},"
                f"trim=duration={span:.3f},setpts=PTS-STARTPTS,"
            )

        chain += "scale=1920:1080:flags=lanczos,setsar=1,format=rgba"
        if is_still and previous_is_still:
            chain += f",fade=t=in:st=0:d={CROSSFADE:.3f}:alpha=1"
        chain += f",setpts=PTS-STARTPTS+{placement.start:.3f}/TB[v{index}]"
        filters.append(chain)
        playback.append(
            {
                "placement": placement.number,
                "start_seconds": placement.start,
                "timeline_span_seconds": round(span, 3),
                "source": str(placement.source.relative_to(ROOT)),
                "mode": mode,
                "speed_factor": round(speed, 9),
                "own_final_frame_hold_seconds": round(hold, 3),
                "crossfade_in_seconds": CROSSFADE if is_still and previous_is_still else 0.0,
                "reroll_delivery_copy": placement.reroll,
            }
        )

    previous = "base"
    for index, placement in enumerate(placements):
        end = placement.start + spans[index]
        if placement.source.suffix.lower() == ".png" and index + 1 < len(placements):
            if placements[index + 1].source.suffix.lower() == ".png":
                end += CROSSFADE
        out = f"mix{index}"
        filters.append(
            f"[{previous}][v{index}]overlay=eof_action=repeat:repeatlast=1:shortest=0:"
            f"enable='between(t,{placement.start:.3f},{end:.3f})'[{out}]"
        )
        previous = out
    filters.append(f"[{previous}]format=yuv420p[outv]")

    command += [
        "-filter_complex",
        ";".join(filters),
        "-map",
        "[outv]",
        "-map",
        f"{narration_index}:a:0",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "18",
        "-profile:v",
        "high",
        "-level:v",
        "4.1",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(FPS),
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-ar",
        "48000",
        "-movflags",
        "+faststart",
        "-t",
        f"{END:.2f}",
        str(OUTPUT),
    ]
    subprocess.run(command, check=True)
    return playback


def probe_output() -> dict[str, object]:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(OUTPUT)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    duration_match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not duration_match:
        raise RuntimeError("Could not probe v5 output")
    hours, minutes, seconds = duration_match.groups()
    duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    video_line = next(line.strip() for line in result.stderr.splitlines() if "Video:" in line)
    audio_line = next(line.strip() for line in result.stderr.splitlines() if "Audio:" in line)
    if abs(duration - END) > 0.02:
        raise RuntimeError(f"Unexpected v5 duration: {duration:.3f}")
    if "h264" not in video_line.lower() or "1920x1080" not in video_line or "30 fps" not in video_line:
        raise RuntimeError(f"Unexpected video stream: {video_line}")
    if "aac" not in audio_line.lower():
        raise RuntimeError(f"Unexpected audio stream: {audio_line}")
    return {
        "duration_seconds": duration,
        "video_stream": video_line,
        "audio_stream": audio_line,
    }


def main() -> None:
    placements = load_placements()
    before = validate_sources(placements)
    playback = build(placements)
    after = validate_sources(placements, refuse_existing=False)
    if before != after:
        raise RuntimeError("A protected source changed during v5 assembly")
    probe = probe_output()
    report = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "brief": str(BRIEF.relative_to(ROOT)),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "output_size_bytes": OUTPUT.stat().st_size,
        "standard": {
            "width": 1920,
            "height": 1080,
            "fps": FPS,
            "codec": "H.264",
            "audio": "AAC",
        },
        "runtime_seconds": END,
        "captions_burned": False,
        "title_start_seconds": placements[1].start,
        "placement_count": len(placements),
        "placements": playback,
        "probe": probe,
        "source_sha256": before,
        "approved_sources_untouched": True,
    }
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(OUTPUT)
    print(REPORT)


if __name__ == "__main__":
    main()
