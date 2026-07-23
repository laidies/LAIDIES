#!/usr/bin/env python3
"""Build the current 57-cue EP04 cut with opening loops and time-jump motif.

The cue sheet remains read-only. Five still cues are substituted with their new
ambient loops inside this build only. The first London transition is a full
replacement; seven later era jumps reuse the same alpha swirl at 1.5 seconds.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CUES_PATH = ROOT / "content/episodes/episode-04-cues.json"
SHOT_LIST_PATH = ROOT / "operations/ep04-shot-list.md"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

BASE = ROOT / "assets/video/.episode-04-full-v2-motion-base.mp4"
OUTPUT = ROOT / "assets/video/episode-04-full-v2.mp4"
FIRST_TRANSITION = ROOT / "assets/episodes/ep-04/clips/ep04-timejump-first-london-v1.mp4"
SWIRL = ROOT / "assets/video/fx/timejump-swirl-v1.mov"

FPS = 30
END = 1222.40
DISSOLVE = 0.45

# Ease-in-out for xfade. ffmpeg's `P` runs 1 -> 0 across the transition, so the
# forward progress is (1-P); this is smoothstep on that. Verified empirically —
# `transition=fade` is linear, which reads as a dissolve that starts and stops.
EASE_EXPR = (
    "A*(1-((1-P)*(1-P)*(3-2*(1-P))))+B*((1-P)*(1-P)*(3-2*(1-P)))"
)

# The LUMINAiRY comes up: two frames of the SAME hall, dim (16:43.68) then
# blazing (17:20.00). A cut throws the lights on between frames; a long dissolve
# makes the hall visibly come up while she talks. Keyed on cue index ->
# (lead seconds before the cue time, dissolve duration). Lead == duration means
# the blazing frame is fully up exactly AT 17:20.
LONG_DISSOLVES = {
    52: (14.0, 14.0),
}


LOOP_SUBSTITUTIONS = {
    "ep04-open-03-title-comic-v1-exact-text-1920.png":
        "ep04-open-03-title-comic-v1-exact-text-1920-loop-v1.mp4",
    "ep04-open-04-desk-comic-v1-face-lock-1920.png":
        "ep04-open-04-desk-comic-v1-face-lock-1920-loop-v1.mp4",
    "ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920.png":
        "ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920-loop-v1.mp4",
    "ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png":
        "ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920-loop-v1.mp4",
    "ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png":
        "ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920-loop-v1.mp4",
    # The scene ambient loops from ep04-capcut-motion-brief.md. All are practical
    # lights only — panel lamps, console lamps, CRT, server LEDs, a candle. Each was
    # verified with a what-moved heatmap before being wired; the first pass lit up
    # Grace's and Karen's spectacles and was rejected.
    "ep04-scene-03-ada-b-mid-comic-v1-locked-1920.png":                       # 5:00.00
        "ep04-scene-03-ada-b-mid-comic-v1-locked-1920-loop-v1.mp4",
    "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png":   # 7:22.30
        "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920-loop-v1.mp4",
    "ep04-scene-05-grace-b-mid-comic-v1-locked-1920.png":                     # 9:35.00
        "ep04-scene-05-grace-b-mid-comic-v1-locked-1920-loop-v1.mp4",
    "ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920.png":     # 11:21.70
        "ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920-loop-v1.mp4",
    "ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920.png":   # 16:11.60
        "ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920-loop-v1.mp4",
    "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png":                      # 6:32.00
        "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920-signal-v1.mp4",
    # Transformation (3:05) — corporate -> magic cloud -> Ep4 outfit reveal, one background.
    # Replaces the RETIRED 15f Main-Street reveal with the approved 15p stage sequence.
    "ep04-open-15f-transformation-main-street-clueless-v7-full-graphic-novel-canonical-sunnyvaile-1920.png":
        "ep04-open-15-transformation-stage-sequence-v1.mp4",
}

# Directional motion PLAYS ONCE then FREEZES on its own final frame — the standing
# ruling in ep04-cut-decisions.md. Ada's notes travel toward camera, so she travels;
# looping her jumps backwards and reads as broken. Held at half speed, so the 5s clip
# covers 10s of the 49.7s hold and the rest is her own last frame.
# name of the RESOLVED source -> playback speed multiplier (2.0 = half speed).
# Keyed on what actually plays, not on the cue's still, so substituted clips work too.
PLAY_ONCE_THEN_FREEZE = {
    "ep04-scene-03-ada-loop-v1.mp4": 2.0,
    # Hedy's signal hop (6:32) — the arc is already drawn; a crest of light travels
    # along it once and leaves it lit. Directional, so it must not loop.
    "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920-signal-v1.mp4": 1.0,
    "ep04-open-15-transformation-stage-sequence-v1.mp4": 1.0,
}


def media_path(src: str) -> Path:
    return ROOT / src.split("?", 1)[0].lstrip("/")


def source_for(cue: dict) -> Path:
    original = media_path(cue["src"])
    replacement = LOOP_SUBSTITUTIONS.get(original.name)
    return original.with_name(replacement) if replacement else original


def is_motion(cue: dict) -> bool:
    return cue["type"] == "video" or media_path(cue["src"]).name in LOOP_SUBSTITUTIONS


def validate(cues: list[dict]) -> None:
    header = SHOT_LIST_PATH.read_text(encoding="utf-8")
    row_count = sum(1 for line in header.splitlines() if line.startswith("| ") and line[2:3].isdigit())
    if "**57 shots.**" not in header or row_count != 57 or len(cues) != 57:
        raise RuntimeError(f"Edit lock mismatch: header/table/cues = 57/{row_count}/{len(cues)}")
    if cues[0]["t"] != 0 or cues[-1]["t"] != 1184:
        raise RuntimeError("Unexpected first or final cue time")
    for cue in cues:
        path = source_for(cue)
        if not path.is_file():
            raise FileNotFoundError(path)
    for path in (FIRST_TRANSITION, SWIRL):
        if not path.is_file():
            raise FileNotFoundError(path)
    for path in (BASE, OUTPUT):
        if path.exists():
            raise FileExistsError(f"Refusing to overwrite existing render: {path}")

    # A long dissolve is pinned to a cue INDEX, so it silently lands on the wrong
    # pair if the cue sheet ever shifts. Name the frames it must join.
    expected = {
        52: (
            "ep04-splash-lights-up-comic-v1-start-dim-1920.png",
            "ep04-splash-lights-up-comic-v1-end-blazing-1920.png",
        ),
    }
    for index, (before, after) in expected.items():
        actual = (media_path(cues[index - 1]["src"]).name, media_path(cues[index]["src"]).name)
        if actual != (before, after):
            raise RuntimeError(
                f"Long dissolve at cue {index} expected {before} -> {after}, got {actual[0]} -> {actual[1]}"
            )
        lead, dissolve = dissolve_into(cues, index)
        if (lead, dissolve) != LONG_DISSOLVES[index]:
            raise RuntimeError(f"Cue {index} sits on a timejump boundary; it cannot dissolve")

    # A substitution whose key matches no cue does nothing and looks like it did.
    wired = {media_path(cue["src"]).name for cue in cues}
    unused = sorted(set(LOOP_SUBSTITUTIONS) - wired)
    for name in unused:
        print(f"WARNING: loop substitution never fires, no cue uses {name}")


def prep_filter(index: int, cue: dict, duration: float) -> str:
    if is_motion(cue):
        name = source_for(cue).name
        speed = PLAY_ONCE_THEN_FREEZE.get(name, 1.0)
        chain = (
            f"[{index}:v]setpts={speed:g}*(PTS-STARTPTS),fps={FPS},"
        )
        if name in PLAY_ONCE_THEN_FREEZE:
            # tpad clones the final frame for the rest of the hold. The input is fed
            # WITHOUT -stream_loop (see build_base), so there is nothing to repeat.
            chain += f"tpad=stop_mode=clone:stop_duration={duration:.3f},"
        chain += f"trim=duration={duration:.3f},setpts=PTS-STARTPTS,"
    else:
        chain = f"[{index}:v]setpts=PTS-STARTPTS,"
    chain += (
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,"
        "zoompan=z=1:x=0:y=0:d=1:s=1920x1080:fps=30,"
        "setsar=1,format=yuv420p"
    )
    return chain + f"[v{index}]"


def dissolve_into(cues: list[dict], i: int) -> tuple[float, float]:
    """(lead, duration) of the cross-dissolve INTO cue i; (0, 0) if it is a cut.

    `lead` is how far BEFORE the cue's own time the dissolve begins, so a cue
    with lead == duration is fully up exactly at its cue time.
    """
    if i <= 0 or i >= len(cues):
        return 0.0, 0.0
    if cues[i]["type"] == "timejump" or cues[i - 1]["type"] == "timejump":
        return 0.0, 0.0
    return LONG_DISSOLVES.get(i, (0.0, DISSOLVE))


def build_base(cues: list[dict], audio: Path) -> None:
    command = [str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning"]
    durations: list[float] = []
    for i, cue in enumerate(cues):
        stop = cues[i + 1]["t"] if i + 1 < len(cues) else END
        hold = stop - cue["t"]
        lead_in, _ = dissolve_into(cues, i)
        lead_out, dissolve_out = dissolve_into(cues, i + 1)
        # Each clip is stretched to feed the next xfade: it gives back whatever
        # the outgoing dissolve consumes and keeps whatever its own bought early.
        duration = hold + lead_in - lead_out + dissolve_out
        durations.append(duration)
        source = source_for(cue)
        if is_motion(cue):
            if source_for(cue).name in PLAY_ONCE_THEN_FREEZE:
                command += ["-i", str(source)]
            else:
                command += ["-stream_loop", "-1", "-i", str(source)]
        else:
            command += [
                "-loop", "1", "-framerate", str(FPS), "-t", f"{duration:.3f}", "-i", str(source)
            ]

    narration_index = len(cues)
    command += ["-i", str(audio)]

    filters = [prep_filter(i, cue, durations[i]) for i, cue in enumerate(cues)]
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
            lead, dissolve = dissolve_into(cues, i)
            offset = cues[i]["t"] - lead - block_start
            # Short cuts stay on the linear built-in; the long ones get the ease,
            # because a 14s linear dissolve has a visible start and stop.
            shape = (
                f"transition=custom:expr='{EASE_EXPR}'"
                if i in LONG_DISSOLVES
                else "transition=fade"
            )
            filters.append(
                f"[{previous}][v{i}]xfade={shape}:duration={dissolve:.3f}:"
                f"offset={offset:.3f}[{out}]"
            )
            previous = out
        sections.append(previous)
        section_index += 1
        cursor = end

    concat_inputs = "".join(f"[{label}]" for label in sections)
    filters.append(f"{concat_inputs}concat=n={len(sections)}:v=1:a=0[outv]")
    command += [
        "-filter_complex", ";".join(filters),
        "-map", "[outv]", "-map", f"{narration_index}:a:0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-r", str(FPS), "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart",
        "-t", f"{END:.2f}", str(BASE),
    ]
    subprocess.run(command, check=True)


def composite_transitions() -> None:
    later_cards = [341.55, 437.30, 540.55, 627.62, 676.70, 764.98, 895.65]
    command = [
        str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning",
        "-i", str(BASE), "-i", str(FIRST_TRANSITION), "-i", str(SWIRL),
    ]
    split_labels = "".join(f"[sw{i}]" for i in range(len(later_cards)))
    filters = [
        "[1:v]trim=start=0.45,setpts=PTS-STARTPTS+240.45/TB[first]",
        "[0:v][first]overlay=eof_action=pass:shortest=0[with_first]",
        f"[2:v]split={len(later_cards)}{split_labels}",
    ]
    previous = "with_first"
    for i, card_time in enumerate(later_cards):
        start = card_time - 1.20
        filters.append(
            f"[sw{i}]format=rgba,fade=t=out:st=1.6:d=0.4:alpha=1,"
            f"setpts=0.75*(PTS-STARTPTS)+{start:.3f}/TB[fx{i}]"
        )
        out = f"jump{i}"
        filters.append(f"[{previous}][fx{i}]overlay=eof_action=pass:shortest=0[{out}]")
        previous = out
    command += [
        "-filter_complex", ";".join(filters),
        "-map", f"[{previous}]", "-map", "0:a:0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-r", str(FPS), "-c:a", "copy", "-movflags", "+faststart",
        "-t", f"{END:.2f}", str(OUTPUT),
    ]
    subprocess.run(command, check=True)


def main() -> None:
    data = json.loads(CUES_PATH.read_text(encoding="utf-8"))
    cues = data["cues"]
    validate(cues)
    build_base(cues, media_path(data["audio"]))
    composite_transitions()
    print(OUTPUT)


if __name__ == "__main__":
    main()
