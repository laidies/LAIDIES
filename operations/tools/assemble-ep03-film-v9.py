#!/usr/bin/env python3
"""Build the Episode 03 v9 controlled-motion review cut.

The v8 content and cue timing remain authoritative. This pass adds:
- the existing 15 foreground-locked ambient loops;
- the existing five-second transformation event;
- restrained 1.6% camera moves on selected non-emphasis scenic/concept frames;
- 0.35-second alpha transitions between every placement.

Faces, bodies, type, and props are never regenerated or warped.
"""

from __future__ import annotations

import hashlib
import json
import math
import re
import subprocess
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CUES_FILE = ROOT / "content/episodes/episode-03-cues.json"
NARRATION = ROOT / "content/music/episode-03-narration.mp3"
COMIC = ROOT / "assets/episodes/ep-03/comic"
OUTPUT = ROOT / "assets/video/episode-03-full-v9-controlled-motion-review.mp4"
REPORT = ROOT / "operations/video-qa/episode-03-full-v9-qc.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
END = 1047.98
FADE = 0.35
TITLE = COMIC / "ep03-open-03-title-comic-v6-sky-balanced-1920.png"
TRANSFORMATION = COMIC / "ep03-cue08-canva-transformation-once-v2.mp4"
AMBIENT_CUES = {3, 4, 5, 6, 9, 11, 14, 17, 19, 21, 22, 25, 30, 38, 45}
CAMERA_CUES = {13, 23, 26, 27, 28, 34, 35, 36, 39, 40, 41, 44, 46}


@dataclass
class Placement:
    cue: int
    start: float
    stop: float
    source: str
    mode: str
    treatment: str
    fade_in: float
    tail: float
    source_duration: float | None = None


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def duration(path: Path) -> float:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        capture_output=True,
        text=True,
        check=False,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration: {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def load_placements() -> list[Placement]:
    cues = json.loads(CUES_FILE.read_text(encoding="utf-8"))["cues"]
    if len(cues) != 49:
        raise RuntimeError(f"Expected 49 cues, found {len(cues)}")
    placements: list[Placement] = []
    for index, cue in enumerate(cues):
        start = float(cue["t"])
        stop = float(cues[index + 1]["t"]) if index + 1 < len(cues) else END
        if index == 2:
            source = TITLE
            mode = "still"
            treatment = "locked title hold"
        elif index == 8:
            source = TRANSFORMATION
            mode = "event"
            treatment = "approved transformation plays once, then holds"
        elif index in AMBIENT_CUES:
            source = COMIC / f"ep03-cue{index:02d}-canva-ambient-loop-v1.mp4"
            mode = "loop"
            treatment = "foreground-locked local ambient loop"
        else:
            source = ROOT / str(cue["src"]).lstrip("/")
            if index in CAMERA_CUES:
                mode = "camera"
                treatment = "restrained centred 1.6% camera move"
            else:
                mode = "still"
                treatment = "intentional readable hold"
        placements.append(
            Placement(
                cue=index,
                start=start,
                stop=stop,
                source=str(source.relative_to(ROOT)),
                mode=mode,
                treatment=treatment,
                fade_in=0.0 if index == 0 else FADE,
                tail=0.0,
            )
        )
    for index, placement in enumerate(placements[:-1]):
        placement.tail = placements[index + 1].fade_in
    return placements


def validate(placements: list[Placement]) -> dict[str, str]:
    if OUTPUT.exists() or REPORT.exists():
        raise FileExistsError(f"Refusing to overwrite v9: {OUTPUT} / {REPORT}")
    for path in (FFMPEG, CUES_FILE, NARRATION, TITLE, TRANSFORMATION):
        if not path.is_file():
            raise FileNotFoundError(path)
    if abs(duration(NARRATION) - END) > 0.03:
        raise RuntimeError("Narration duration does not match Episode 03 runtime")
    hashes: dict[str, str] = {}
    for placement in placements:
        path = ROOT / placement.source
        if not path.is_file():
            raise FileNotFoundError(path)
        if placement.stop <= placement.start:
            raise RuntimeError(f"Non-positive cue span at {placement.cue}")
        if placement.mode in {"loop", "event"}:
            placement.source_duration = duration(path)
        hashes[placement.source] = sha256(path)
    hashes[str(NARRATION.relative_to(ROOT))] = sha256(NARRATION)
    return hashes


def assemble(placements: list[Placement]) -> None:
    command = [str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning"]
    for placement in placements:
        path = ROOT / placement.source
        visible = placement.stop - placement.start + placement.tail
        if placement.mode in {"still", "camera"}:
            command += [
                "-loop",
                "1",
                "-framerate",
                str(FPS),
                "-t",
                f"{visible + 0.10:.3f}",
                "-i",
                str(path),
            ]
        elif placement.mode == "loop":
            command += ["-stream_loop", "-1", "-i", str(path)]
        else:
            command += ["-i", str(path)]
    narration_index = len(placements)
    command += ["-i", str(NARRATION)]

    filters = [f"color=c=black:s={W}x{H}:r={FPS}:d={END:.2f}[base]"]
    for index, placement in enumerate(placements):
        visible = placement.stop - placement.start + placement.tail
        frame_count = max(math.ceil(visible * FPS), 1)
        if placement.mode == "camera":
            step = 0.016 / frame_count
            chain = (
                f"[{index}:v]scale={W}:{H}:flags=lanczos,setsar=1,"
                f"zoompan=z='min(zoom+{step:.10f},1.016)':"
                "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
                f"d={frame_count}:s={W}x{H}:fps={FPS},"
            )
        else:
            chain = (
                f"[{index}:v]setpts=PTS-STARTPTS,fps={FPS},"
                f"scale={W}:{H}:flags=lanczos,setsar=1,"
            )
        if placement.mode == "event":
            assert placement.source_duration is not None
            hold = max(visible - placement.source_duration + 0.10, 0.0)
            chain += f"tpad=stop_mode=clone:stop_duration={hold:.3f},"
        chain += f"trim=duration={visible:.3f},setpts=PTS-STARTPTS,format=rgba"
        if placement.fade_in:
            chain += f",fade=t=in:st=0:d={placement.fade_in:.3f}:alpha=1"
        chain += f",setpts=PTS-STARTPTS+{placement.start:.3f}/TB[v{index}]"
        filters.append(chain)

    previous = "base"
    for index, placement in enumerate(placements):
        end = placement.stop + placement.tail
        output = f"mix{index}"
        filters.append(
            f"[{previous}][v{index}]overlay=eof_action=pass:repeatlast=0:"
            f"shortest=0:enable='between(t,{placement.start:.3f},{end:.3f})'"
            f"[{output}]"
        )
        previous = output
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


def verify() -> dict[str, object]:
    if abs(duration(OUTPUT) - END) > 0.03:
        raise RuntimeError("Unexpected Episode 03 v9 duration")
    decode = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(OUTPUT),
            "-f",
            "null",
            "-",
        ],
        check=False,
    )
    if decode.returncode:
        raise RuntimeError("Full Episode 03 v9 decode failed")
    return {"duration_seconds": duration(OUTPUT), "full_decode": "passed"}


def main() -> None:
    placements = load_placements()
    hashes = validate(placements)
    moving = [p for p in placements if p.mode != "still"]
    moving_seconds = sum(p.stop - p.start for p in moving)
    print(
        f"validated {len(placements)} placements; "
        f"{len(moving)} motion placements / {moving_seconds:.2f}s",
        flush=True,
    )
    assemble(placements)
    report = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "output_size_bytes": OUTPUT.stat().st_size,
        "runtime_seconds": END,
        "placement_count": len(placements),
        "motion_placement_count": len(moving),
        "motion_seconds": moving_seconds,
        "motion_percent": moving_seconds / END * 100,
        "standard": {
            "width": W,
            "height": H,
            "fps": FPS,
            "codec": "H.264",
            "audio": "AAC",
            "captions_burned": False,
        },
        "placements": [asdict(placement) for placement in placements],
        "probe": verify(),
        "source_sha256": hashes,
        "approved_sources_untouched": True,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(OUTPUT)
    print(REPORT)


if __name__ == "__main__":
    main()
