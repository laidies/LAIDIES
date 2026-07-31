#!/usr/bin/env python3
"""Assemble EP04 v8 with protected local motion and full-length story events.

This build reads the 58-cue authoritative JSON, replaces the failed whole-frame
AI clips with controlled assets, loops ambient effects for their full holds,
and plays story events once before holding their own final frame.

Two multi-cue sequences are deliberately kept intact:
* AI winter: 11:01.43–11:16.70 (the prior master compressed 15s into 5.6s)
* portraits finale: 16:43.68–18:02.90 (the prior master compressed 79s)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
CUES_FILE = ROOT / "content/episodes/episode-04-cues.json"
NARRATION = ROOT / "content/music/episode-04-narration.mp3"
OUTPUT = ROOT / "assets/video/episode-04-full-v8.mp4"
REPORT = ROOT / "operations/video-qa/episode-04-full-v8-qc.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

W, H, FPS = 1920, 1080, 30
END = 1222.40
STANDARD_FADE = 0.45
POST_TIMEJUMP_FADE = 0.80
TIMEJUMP_CUES = {18, 21, 24, 27, 31, 38, 41, 46}
SKIP_CUES = {36, 37, 53}
SPAN_ENDS = {
    35: 676.70,   # complete 15-second AI-winter progression plus a short settle
    52: 1082.90,  # complete 79-second portraits finale plus a short settle
}


@dataclass(frozen=True)
class Asset:
    path: Path
    mode: str  # still | loop | event
    treatment: str


@dataclass
class Placement:
    cue: int
    start: float
    stop: float
    source: str
    mode: str
    treatment: str
    fade_in: float = 0.0
    tail: float = 0.0
    source_duration: float | None = None


def pixel(name: str) -> Path:
    return ROOT / "assets/episodes/ep-04/pixel" / name


def event(name: str, treatment: str) -> Asset:
    return Asset(pixel(name), "event", treatment)


def loop(name: str, treatment: str) -> Asset:
    return Asset(pixel(name), "loop", treatment)


MOTION: dict[int, Asset] = {
    2: loop(
        "ep04-open-03-title-comic-v1-exact-text-1920-loop-v1.mp4",
        "controlled title circuitry and dust",
    ),
    3: loop(
        "ep04-open-04-desk-comic-v1-face-lock-1920-loop-v1.mp4",
        "protected screen glow",
    ),
    4: loop("ep04-cue04-local-motion-v1.mp4", "screen and rain"),
    5: loop("ep04-cue05-local-motion-v1.mp4", "screen and rain"),
    7: loop("ep04-cue07-local-motion-v1.mp4", "source-size town lights"),
    9: event("ep04-cue09-headlight-event-v1.mp4", "headlight wake"),
    10: loop(
        "ep04-open-11-mall-directory-comic-v2-vibrant-graphic-novel-1920-loop-v1.mp4",
        "directory panels and neon",
    ),
    12: loop("ep04-cue12-local-motion-v1.mp4", "CRT and modem indicators"),
    13: loop("ep04-cue13-local-motion-v1.mp4", "screen and rain"),
    14: Asset(
        pixel(
            "delivery-20260722-animation-v5-brief-correction/"
            "ep04-open-15p-transformation-comic-event-v1.mp4"
        ),
        "event",
        "locked abstract-stage transformation",
    ),
    15: loop(
        "ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920-loop-v1.mp4",
        "path lights and fireflies",
    ),
    16: loop(
        "ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920-loop-v1.mp4",
        "candles and stained glass",
    ),
    17: loop("ep04-cue17-local-motion-v1.mp4", "candles into first time-jump"),
    18: Asset(
        pixel(
            "delivery-20260722-animation-v5-rerolls/"
            "ep04-timejump-01-london-1843-comic-event-v1.mp4"
        ),
        "event",
        "London time-jump",
    ),
    19: event(
        "ep04-scene-03-ada-punched-card-toward-camera-comic-event-v1.mp4",
        "punched-card emphasis",
    ),
    20: loop(
        "ep04-scene-03-ada-b-mid-comic-v1-locked-1920-loop-v1.mp4",
        "Ada practical lights",
    ),
    21: event("ep04-timejump-02-hollywood-comic-event-v1.mp4", "Hollywood time-jump"),
    22: loop("ep04-cue22-local-motion-v1.mp4", "studio practical lights"),
    23: event(
        "ep04-scene-04-hedy-b-mid-comic-v1-locked-1920-signal-v1.mp4",
        "signal travels once",
    ),
    24: event(
        "ep04-timejump-03-philadelphia-comic-event-v1.mp4",
        "Philadelphia 1945 time-jump",
    ),
    25: loop(
        "ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920-loop-v2.mp4",
        "Ali-approved source-size random ENIAC lamps",
    ),
    26: event("ep04-cue26-credit-reveal-event-v1.mp4", "credit labels resolve"),
    27: event(
        "ep04-timejump-04-philadelphia-1952-comic-event-v1.mp4",
        "Philadelphia 1952 time-jump",
    ),
    28: loop("ep04-cue28-local-motion-v1.mp4", "office-machine indicators"),
    29: loop(
        "ep04-scene-05-grace-b-mid-comic-v1-locked-1920-loop-v2.mp4",
        "protected compiler indicators",
    ),
    30: event(
        "ep04-scene-05-grace-moth-landing-comic-event-v2.mp4",
        "moth flight over one fixed Grace frame",
    ),
    31: event(
        "ep04-timejump-05-dartmouth-1956-comic-event-v1.mp4",
        "Dartmouth time-jump",
    ),
    32: event(
        "ep04-scene-06-naming-chalk-writes-comic-event-v2.mp4",
        "chalk reveal over one fixed meeting frame",
    ),
    35: event(
        "ep04-scene-07-ai-winter-screens-darken-comic-event-v1.mp4",
        "full 15-second AI-winter progression",
    ),
    38: event(
        "ep04-timejump-06-cambridge-1972-comic-event-v1.mp4",
        "Cambridge time-jump",
    ),
    39: loop(
        "ep04-scene-08-karen-comic-v3-clean-nose-timnit-style-lock-1920-loop-v1.mp4",
        "Karen CRT and practical lights",
    ),
    40: loop("ep04-cue40-local-motion-v1.mp4", "CRT and rain"),
    41: event("ep04-timejump-07-fei-fei-comic-event-v1.mp4", "Fei-Fei time-jump"),
    43: event(
        "ep04-scene-09-fei-fei-wall-fills-comic-event-v2.mp4",
        "image wall fills behind one fixed Fei-Fei foreground",
    ),
    44: loop("ep04-cue44-local-motion-v1.mp4", "image-wall highlight"),
    45: loop(
        "ep04-open-04-desk-comic-v1-face-lock-1920-loop-v1.mp4",
        "protected present-day screen glow",
    ),
    46: event(
        "ep04-timejump-08-2018-2021-comic-event-v1.mp4",
        "2018–2021 shared time-jump",
    ),
    47: loop("ep04-cue47-local-motion-v1.mp4", "analysis displays"),
    48: loop("ep04-cue48-local-motion-v1.mp4", "model report and alert"),
    49: loop("ep04-cue49-local-motion-v1.mp4", "holographic parrot"),
    50: loop("ep04-cue48-local-motion-v1.mp4", "model report and alert reprise"),
    51: loop(
        "ep04-scene-11d-kate-comic-v2-timnit-style-lock-supply-chain-1920-loop-v1.mp4",
        "server and processor indicators",
    ),
    52: event(
        "ep04-splash-lights-up-portraits-ignite-comic-event-v1.mp4",
        "full 79-second portraits finale",
    ),
}


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


def load_cues() -> list[dict[str, object]]:
    data = json.loads(CUES_FILE.read_text(encoding="utf-8"))
    cues = data["cues"]
    if len(cues) != 58:
        raise RuntimeError(f"Expected 58 authoritative cues, found {len(cues)}")
    if abs(float(cues[-1]["t"]) - 1184.0) > 0.001:
        raise RuntimeError("Unexpected final cue timing")
    return cues


def source_from_cue(cue: dict[str, object]) -> Path:
    source = str(cue["src"])
    if not source.startswith("/"):
        raise ValueError(f"Expected root-relative cue source: {source}")
    return ROOT / source.lstrip("/")


def build_placements(cues: list[dict[str, object]]) -> list[Placement]:
    placements: list[Placement] = []
    for index, cue in enumerate(cues):
        if index in SKIP_CUES:
            continue
        start = float(cue["t"])
        if index in SPAN_ENDS:
            stop = SPAN_ENDS[index]
        else:
            next_indices = [
                candidate
                for candidate in range(index + 1, len(cues))
                if candidate not in SKIP_CUES
            ]
            stop = float(cues[next_indices[0]]["t"]) if next_indices else END
        asset = MOTION.get(index)
        if asset is None:
            source = source_from_cue(cue)
            asset = Asset(source, "still", "locked still by design")
        placements.append(
            Placement(
                cue=index,
                start=start,
                stop=stop,
                source=str(asset.path.relative_to(ROOT)),
                mode=asset.mode,
                treatment=asset.treatment,
            )
        )

    for index, placement in enumerate(placements):
        if index == 0:
            placement.fade_in = 0.0
        elif placements[index - 1].cue in TIMEJUMP_CUES:
            placement.fade_in = POST_TIMEJUMP_FADE
        else:
            placement.fade_in = STANDARD_FADE
    for index, placement in enumerate(placements):
        placement.tail = (
            placements[index + 1].fade_in
            if index + 1 < len(placements)
            else 0.0
        )
    return placements


def validate(placements: list[Placement], refuse_existing: bool = True) -> dict[str, str]:
    if not FFMPEG.is_file():
        raise FileNotFoundError(FFMPEG)
    for path in (CUES_FILE, NARRATION):
        if not path.is_file():
            raise FileNotFoundError(path)
    if refuse_existing and (OUTPUT.exists() or REPORT.exists()):
        raise FileExistsError(f"Refusing to overwrite v8: {OUTPUT} / {REPORT}")
    if abs(probe_duration(NARRATION) - END) > 0.02:
        raise RuntimeError("Narration duration does not match 20:22.40")

    hashes: dict[str, str] = {}
    for placement in placements:
        path = ROOT / placement.source
        if not path.is_file():
            raise FileNotFoundError(path)
        if placement.stop <= placement.start:
            raise RuntimeError(f"Non-positive cue span at cue {placement.cue}")
        if placement.mode == "still":
            with Image.open(path) as image:
                if image.size != (W, H):
                    raise ValueError(
                        f"{path.name}: expected {W}x{H}, got {image.size}"
                    )
        else:
            placement.source_duration = probe_duration(path)
        hashes[placement.source] = sha256(path)
    hashes[str(NARRATION.relative_to(ROOT))] = sha256(NARRATION)
    return hashes


def assemble(placements: list[Placement]) -> None:
    command = [str(FFMPEG), "-n", "-hide_banner", "-loglevel", "warning"]
    for placement in placements:
        path = ROOT / placement.source
        visible = placement.stop - placement.start + placement.tail
        if placement.mode == "still":
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
        elif placement.mode == "event":
            command += ["-i", str(path)]
        else:
            raise ValueError(f"Unknown mode: {placement.mode}")
    narration_index = len(placements)
    command += ["-i", str(NARRATION)]

    filters = [f"color=c=black:s={W}x{H}:r={FPS}:d={END:.2f}[base]"]
    for index, placement in enumerate(placements):
        visible = placement.stop - placement.start + placement.tail
        chain = (
            f"[{index}:v]setpts=PTS-STARTPTS,fps={FPS},"
            f"scale={W}:{H}:flags=lanczos,setsar=1,"
        )
        if placement.mode == "event":
            assert placement.source_duration is not None
            hold = max(0.0, visible - placement.source_duration + 0.10)
            chain += f"tpad=stop_mode=clone:stop_duration={hold:.3f},"
        chain += f"trim=duration={visible:.3f},setpts=PTS-STARTPTS,format=rgba"
        if placement.fade_in > 0.0:
            chain += (
                f",fade=t=in:st=0:d={placement.fade_in:.3f}:alpha=1"
            )
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


def verify_output() -> dict[str, object]:
    probe = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(OUTPUT)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    duration = probe_duration(OUTPUT)
    video_line = next(
        line.strip() for line in probe.stderr.splitlines() if "Video:" in line
    )
    audio_line = next(
        line.strip() for line in probe.stderr.splitlines() if "Audio:" in line
    )
    if abs(duration - END) > 0.02:
        raise RuntimeError(f"Unexpected v8 duration: {duration:.3f}")
    if "h264" not in video_line.lower() or f"{W}x{H}" not in video_line:
        raise RuntimeError(f"Unexpected video stream: {video_line}")
    if "aac" not in audio_line.lower():
        raise RuntimeError(f"Unexpected audio stream: {audio_line}")
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
        raise RuntimeError("Full v8 decode verification failed")
    return {
        "duration_seconds": duration,
        "video_stream": video_line,
        "audio_stream": audio_line,
        "full_decode": "passed",
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--validate-only",
        action="store_true",
        help="validate all sources and timings without rendering",
    )
    args = parser.parse_args()

    placements = build_placements(load_cues())
    before = validate(placements)
    print(f"validated {len(placements)} placements", flush=True)
    if args.validate_only:
        for placement in placements:
            print(
                f"{placement.cue:02d} {placement.start:8.2f}–{placement.stop:8.2f} "
                f"{placement.mode:5s} {placement.source}"
            )
        return

    assemble(placements)
    after = validate(placements, refuse_existing=False)
    if before != after:
        raise RuntimeError("A protected source changed during v8 assembly")
    probe = verify_output()
    report = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "output_size_bytes": OUTPUT.stat().st_size,
        "standard": {
            "width": W,
            "height": H,
            "fps": FPS,
            "codec": "H.264",
            "audio": "AAC",
            "captions_burned": False,
        },
        "runtime_seconds": END,
        "placement_count": len(placements),
        "skipped_cues_covered_by_multi_cue_events": sorted(SKIP_CUES),
        "multi_cue_event_ends": SPAN_ENDS,
        "placements": [asdict(placement) for placement in placements],
        "probe": probe,
        "source_sha256": before,
        "approved_sources_untouched": True,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(OUTPUT)
    print(REPORT)


if __name__ == "__main__":
    main()
