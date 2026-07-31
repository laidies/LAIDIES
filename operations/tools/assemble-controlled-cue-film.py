#!/usr/bin/env python3
"""Assemble a narration-locked LAiDIES review film from an authoritative cue sheet.

This is the reusable controlled-motion path for the still-led Episode 01/02 cuts:

- cue order, timing, and source identity remain authoritative;
- text/interstitial frames marked ``motion: false`` remain intentional stills;
- scenic/concept frames marked ``motion: true`` receive one restrained centred push;
- every placement receives a short alpha transition without shortening narration;
- source pixels are scaled/cropped only; faces, bodies, props, and type are not warped
  or regenerated.

The script refuses to overwrite an existing review export or QA report.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import subprocess
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
W, H, FPS = 1920, 1080, 30


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


def resolve_from_root(value: str) -> Path:
    candidate = Path(value)
    return candidate if candidate.is_absolute() else ROOT / candidate


def load_placements(cues_file: Path, runtime: float, fade: float) -> tuple[list[Placement], Path]:
    data = json.loads(cues_file.read_text(encoding="utf-8"))
    cues = data["cues"]
    if not cues:
        raise RuntimeError("Cue sheet is empty")
    narration = ROOT / str(data["audio"]).split("?")[0].lstrip("/")
    placements: list[Placement] = []
    for index, cue in enumerate(cues):
        start = float(cue["t"])
        stop = float(cues[index + 1]["t"]) if index + 1 < len(cues) else runtime
        source = ROOT / str(cue["src"]).split("?")[0].lstrip("/")
        moving = bool(cue.get("motion", False))
        placements.append(
            Placement(
                cue=index,
                start=start,
                stop=stop,
                source=str(source.relative_to(ROOT)),
                mode="camera" if moving else "still",
                treatment=(
                    "restrained centred 1.6% camera move"
                    if moving
                    else "intentional readable hold"
                ),
                fade_in=0.0 if index == 0 else fade,
                tail=0.0,
            )
        )
    for index, placement in enumerate(placements[:-1]):
        placement.tail = placements[index + 1].fade_in
    return placements, narration


def validate(
    cues_file: Path,
    narration: Path,
    output: Path,
    report: Path,
    placements: list[Placement],
    runtime: float,
) -> dict[str, str]:
    if output.exists() or report.exists():
        raise FileExistsError(f"Refusing to overwrite: {output} / {report}")
    for path in (FFMPEG, cues_file, narration):
        if not path.is_file():
            raise FileNotFoundError(path)
    if abs(duration(narration) - runtime) > 0.03:
        raise RuntimeError("Narration duration changed after cue placement was loaded")
    hashes: dict[str, str] = {}
    previous = -1.0
    for placement in placements:
        path = ROOT / placement.source
        if not path.is_file():
            raise FileNotFoundError(path)
        if placement.start < previous or placement.stop <= placement.start:
            raise RuntimeError(f"Invalid cue span at {placement.cue}")
        previous = placement.start
        hashes[placement.source] = sha256(path)
    hashes[str(narration.relative_to(ROOT))] = sha256(narration)
    return hashes


def assemble(
    placements: list[Placement],
    narration: Path,
    output: Path,
    runtime: float,
    zoom: float,
) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    # Scaling warnings from legacy JPEG/YUV source ranges can repeat once per
    # frame and bury the useful build result. Actual encoder failures still
    # surface and stop the build through check=True.
    command = [str(FFMPEG), "-n", "-hide_banner", "-loglevel", "error"]
    for placement in placements:
        visible = placement.stop - placement.start + placement.tail
        command += [
            "-loop",
            "1",
            "-framerate",
            str(FPS),
            "-t",
            f"{visible + 0.10:.3f}",
            "-i",
            str(ROOT / placement.source),
        ]
    narration_index = len(placements)
    command += ["-i", str(narration)]

    filters = [f"color=c=black:s={W}x{H}:r={FPS}:d={runtime:.2f}[base]"]
    for index, placement in enumerate(placements):
        visible = placement.stop - placement.start + placement.tail
        frame_count = max(math.ceil(visible * FPS), 1)
        if placement.mode == "camera":
            step = zoom / frame_count
            chain = (
                f"[{index}:v]scale=3840:2160:force_original_aspect_ratio=increase:"
                "flags=lanczos,crop=3840:2160,setsar=1,"
                f"zoompan=z='min(zoom+{step:.10f},{1 + zoom:.6f})':"
                "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
                f"d={frame_count}:s={W}x{H}:fps={FPS},"
            )
        else:
            chain = (
                f"[{index}:v]setpts=PTS-STARTPTS,fps={FPS},"
                f"scale={W}:{H}:force_original_aspect_ratio=increase:"
                f"flags=lanczos,crop={W}:{H},setsar=1,"
            )
        chain += f"trim=duration={visible:.3f},setpts=PTS-STARTPTS,format=rgba"
        if placement.fade_in:
            chain += f",fade=t=in:st=0:d={placement.fade_in:.3f}:alpha=1"
        chain += f",setpts=PTS-STARTPTS+{placement.start:.3f}/TB[v{index}]"
        filters.append(chain)

    previous = "base"
    for index, placement in enumerate(placements):
        end = placement.stop + placement.tail
        output_label = f"mix{index}"
        filters.append(
            f"[{previous}][v{index}]overlay=eof_action=pass:repeatlast=0:"
            f"shortest=0:enable='between(t,{placement.start:.3f},{end:.3f})'"
            f"[{output_label}]"
        )
        previous = output_label
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
        f"{runtime:.2f}",
        str(output),
    ]
    subprocess.run(command, check=True)


def verify(output: Path, runtime: float) -> dict[str, object]:
    if abs(duration(output) - runtime) > 0.03:
        raise RuntimeError("Unexpected review-film duration")
    decode = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(output),
            "-f",
            "null",
            "-",
        ],
        check=False,
    )
    if decode.returncode:
        raise RuntimeError("Full review-film decode failed")
    return {"duration_seconds": duration(output), "full_decode": "passed"}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--label", required=True)
    parser.add_argument("--cues", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--report", required=True)
    parser.add_argument("--fade", type=float, default=0.35)
    parser.add_argument("--zoom", type=float, default=0.016)
    args = parser.parse_args()

    cues_file = resolve_from_root(args.cues)
    output = resolve_from_root(args.output)
    report = resolve_from_root(args.report)
    cue_data = json.loads(cues_file.read_text(encoding="utf-8"))
    narration = ROOT / str(cue_data["audio"]).split("?")[0].lstrip("/")
    runtime = duration(narration)
    placements, narration = load_placements(cues_file, runtime, args.fade)
    hashes = validate(cues_file, narration, output, report, placements, runtime)
    moving = [placement for placement in placements if placement.mode == "camera"]
    moving_seconds = sum(placement.stop - placement.start for placement in moving)
    print(
        f"validated {len(placements)} placements; "
        f"{len(moving)} controlled-motion placements / {moving_seconds:.2f}s",
        flush=True,
    )
    assemble(placements, narration, output, runtime, args.zoom)
    qa = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "label": args.label,
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "output_size_bytes": output.stat().st_size,
        "runtime_seconds": runtime,
        "placement_count": len(placements),
        "motion_placement_count": len(moving),
        "motion_seconds": moving_seconds,
        "motion_percent": moving_seconds / runtime * 100,
        "transition_seconds": args.fade,
        "camera_zoom_percent": args.zoom * 100,
        "standard": {
            "width": W,
            "height": H,
            "fps": FPS,
            "codec": "H.264",
            "audio": "AAC",
            "captions_burned": False,
        },
        "placements": [asdict(placement) for placement in placements],
        "probe": verify(output, runtime),
        "source_sha256": hashes,
        "approved_sources_untouched": True,
    }
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(json.dumps(qa, indent=2) + "\n", encoding="utf-8")
    print(output)
    print(report)


if __name__ == "__main__":
    main()
