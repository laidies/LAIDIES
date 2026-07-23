#!/usr/bin/env python3
"""Build the cue-locked Episode 04 CapCut source master.

The cue sheet is the edit. This script does not infer, reorder, or substitute shots.
It produces a deterministic flattened source for final import/export in CapCut.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CUES_PATH = ROOT / "content/episodes/episode-04-cues.json"
SHOT_LIST_PATH = ROOT / "operations/ep04-shot-list.md"
FFMPEG = (
    Path.home()
    / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
OUTPUT = ROOT / "assets/video/.episode-04-full-v1-capcut-source.mp4"

FPS = 30
END = 1222.40
DISSOLVE = 0.45
DIP = 0.30


def media_path(src: str) -> Path:
    return ROOT / src.split("?", 1)[0].lstrip("/")


def validate(cues: list[dict]) -> None:
    header = SHOT_LIST_PATH.read_text(encoding="utf-8")
    row_count = sum(1 for line in header.splitlines() if line.startswith("| ") and line[2:3].isdigit())
    if "**54 shots.**" not in header or row_count != 54 or len(cues) != 54:
        raise RuntimeError(
            f"Edit lock mismatch: header/table/cues = 54/{row_count}/{len(cues)}"
        )
    if cues[0]["t"] != 0 or cues[-1]["t"] != 1184:
        raise RuntimeError("Unexpected first or final cue time")
    for cue in cues:
        path = media_path(cue["src"])
        if not path.is_file():
            raise FileNotFoundError(path)
    if OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite existing source master: {OUTPUT}")


def prep_filter(index: int, cue: dict, duration: float, fade_out: bool) -> str:
    media = media_path(cue["src"])
    if cue["type"] == "video":
        if media.name != "ep04-scene-03-ada-loop-v1.mp4":
            raise RuntimeError(f"Unexpected video cue: {media}")
        chain = (
            f"[{index}:v]setpts=2*(PTS-STARTPTS),"
            f"fps={FPS},trim=duration={duration:.3f},setpts=PTS-STARTPTS,"
        )
    else:
        chain = f"[{index}:v]setpts=PTS-STARTPTS,"
    chain += (
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,"
        "zoompan=z=1:x=0:y=0:d=1:s=1920x1080:fps=30,"
        "setsar=1,format=yuv420p"
    )
    if fade_out:
        chain += f",fade=t=out:st={duration - DIP:.3f}:d={DIP:.3f}:color=black"
    return chain + f"[v{index}]"


def build() -> None:
    data = json.loads(CUES_PATH.read_text(encoding="utf-8"))
    cues = data["cues"]
    validate(cues)

    command = [
        str(FFMPEG),
        "-n",
        "-hide_banner",
        "-loglevel",
        "warning",
    ]
    durations: list[float] = []
    for i, cue in enumerate(cues):
        stop = cues[i + 1]["t"] if i + 1 < len(cues) else END
        hold = stop - cue["t"]
        same_regular_block = (
            i + 1 < len(cues)
            and cue["type"] != "timejump"
            and cues[i + 1]["type"] != "timejump"
        )
        durations.append(hold + (DISSOLVE if same_regular_block else 0))
        source = media_path(cue["src"])
        if cue["type"] == "video":
            command += ["-stream_loop", "-1", "-i", str(source)]
        else:
            command += [
                "-loop",
                "1",
                "-framerate",
                str(FPS),
                "-t",
                f"{durations[-1]:.3f}",
                "-i",
                str(source),
            ]

    narration_index = len(cues)
    command += ["-i", str(media_path(data["audio"]))]

    filters: list[str] = []
    for i, cue in enumerate(cues):
        next_is_timejump = i + 1 < len(cues) and cues[i + 1]["type"] == "timejump"
        filters.append(prep_filter(i, cue, durations[i], next_is_timejump))

    sections: list[str] = []
    cursor = 0
    section_index = 0
    while cursor < len(cues):
        if cues[cursor]["type"] == "timejump":
            sections.append(f"v{cursor}")
            cursor += 1
            continue

        end = cursor + 1
        while end < len(cues) and cues[end]["type"] != "timejump":
            end += 1

        previous = f"v{cursor}"
        block_start = cues[cursor]["t"]
        for i in range(cursor + 1, end):
            out = f"x{section_index}_{i}"
            offset = cues[i]["t"] - block_start
            filters.append(
                f"[{previous}][v{i}]xfade=transition=fade:duration={DISSOLVE:.3f}:"
                f"offset={offset:.3f}[{out}]"
            )
            previous = out
        sections.append(previous)
        section_index += 1
        cursor = end

    concat_inputs = "".join(f"[{label}]" for label in sections)
    filters.append(f"{concat_inputs}concat=n={len(sections)}:v=1:a=0[outv]")

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
        "veryfast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(FPS),
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-movflags",
        "+faststart",
        "-t",
        f"{END:.2f}",
        str(OUTPUT),
    ]
    subprocess.run(command, check=True)
    print(OUTPUT)


if __name__ == "__main__":
    build()
