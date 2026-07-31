#!/usr/bin/env python3
"""Build Episode 04 v9 as a narrow reference-reconciled review candidate.

The V8 55-placement topology and audio clock remain authoritative. Only the
confirmed failed Cue 15-19 picture window is replaced. The repair uses the
canonical LUMINAiRY exterior, the people-free canonical MAiVENS wing, and the
retained rights-recorded Ada / Analytical Engine / Note G evidence. The maker
may build and measure this candidate but may not judge or release it.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import shutil
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageStat


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "operations/video-qa/episode-04-v9-reference-reconciled-config.json"
V8_QC_PATH = ROOT / "operations/video-qa/episode-04-full-v8-qc.json"
REVIEW_DIR = ROOT / "operations/video-qa/episode-04-v9-reference-reconciled-review"
FONT_SERIF = ROOT / "assets/video/delivery-20260714-opening-v6/fonts/PlayfairDisplay.ttf"
FONT_SANS = ROOT / "assets/video/delivery-20260714-opening-v6/fonts/Jost.ttf"
FFMPEG_CANDIDATE = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
FFMPEG = FFMPEG_CANDIDATE if FFMPEG_CANDIDATE.is_file() else Path(
    shutil.which("ffmpeg") or ""
)
W, H, FPS = 1920, 1080, 30
END = 1222.40


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".codex-tmp")
    temporary.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")
    os.replace(temporary, path)


def rel(path: str | Path) -> Path:
    path = Path(path)
    return path if path.is_absolute() else ROOT / path


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def run(command: list[str], *, capture: bool = False) -> subprocess.CompletedProcess:
    return subprocess.run(
        command,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    )


def ffmpeg(*args: str, capture: bool = False) -> subprocess.CompletedProcess:
    return run(
        [str(FFMPEG), "-hide_banner", "-loglevel", "error", *args],
        capture=capture,
    )


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    source = image.convert("RGB")
    scale = max(size[0] / source.width, size[1] / source.height)
    resized = source.resize(
        (round(source.width * scale), round(source.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - size[0]) // 2
    top = (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def contain(image: Image.Image, size: tuple[int, int], fill: tuple[int, int, int]) -> Image.Image:
    source = image.convert("RGB")
    scale = min(size[0] / source.width, size[1] / source.height)
    resized = source.resize(
        (round(source.width * scale), round(source.height * scale)),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGB", size, fill)
    canvas.paste(
        resized,
        ((size[0] - resized.width) // 2, (size[1] - resized.height) // 2),
    )
    return canvas


def rounded_panel(
    canvas: Image.Image,
    box: tuple[int, int, int, int],
    fill: tuple[int, int, int, int],
    outline: tuple[int, int, int, int],
    radius: int = 30,
    width: int = 3,
) -> None:
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)
    canvas.alpha_composite(overlay)


def write_centered(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: int,
    face: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    width: int = W,
) -> None:
    bounds = draw.textbbox((0, 0), text, font=face)
    x = (width - (bounds[2] - bounds[0])) // 2
    draw.text((x, y), text, font=face, fill=fill)


def encode_dissolve(
    start_path: Path,
    end_path: Path,
    output: Path,
    duration: float = 5.0,
    dissolve_start: float = 1.0,
    dissolve_duration: float = 3.2,
) -> None:
    """Encode a deterministic constant-rate dissolve without FFmpeg xfade."""
    with Image.open(start_path) as image:
        start = cover(image, (W, H))
    with Image.open(end_path) as image:
        end = cover(image, (W, H))

    command = [
        str(FFMPEG),
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s:v",
        f"{W}x{H}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "16",
        "-profile:v",
        "high",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(FPS),
        "-t",
        f"{duration:.3f}",
        str(output),
    ]
    process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
    )
    assert process.stdin is not None
    frame_count = round(duration * FPS)
    for frame_index in range(frame_count):
        seconds = frame_index / FPS
        if seconds <= dissolve_start:
            amount = 0.0
        elif seconds >= dissolve_start + dissolve_duration:
            amount = 1.0
        else:
            linear = (seconds - dissolve_start) / dissolve_duration
            amount = linear * linear * (3.0 - 2.0 * linear)
        frame = Image.blend(start, end, amount)
        process.stdin.write(frame.tobytes())
    process.stdin.close()
    stderr = process.stderr.read().decode("utf-8", errors="replace") if process.stderr else ""
    return_code = process.wait()
    if return_code:
        raise RuntimeError(f"Constant-rate dissolve encode failed: {stderr}")


def prepare_reference_assets(config: dict) -> dict[str, Path]:
    folder = rel(config["derived_assets_folder"])
    folder.mkdir(parents=True, exist_ok=True)
    authorities = config["reference_authorities"]

    exterior_source = rel(authorities["luminairy_exterior"]["path"])
    wing_source = rel(authorities["maivens_wing"]["path"])
    ada_source = rel(authorities["ada_likeness"]["path"])
    engine_source = rel(authorities["analytical_engine_plan"]["path"])

    paths = {
        "cue15": folder / "ep04-v9-cue15-canonical-luminairy-exterior-1920.png",
        "cue16": folder / "ep04-v9-cue16-people-free-maivens-wing-1920.png",
        "cue17": folder / "ep04-v9-cue17-maivens-wing-lights-soft-1920.png",
        "cue18_card": folder / "ep04-v9-cue18-london-1843-evidence-card-1920.png",
        "cue18_event": folder / "ep04-v9-cue18-london-1843-editorial-bridge.mp4",
        "cue19": folder / "ep04-v9-cue19-ada-engine-note-g-evidence-board-1920.png",
        "segment": folder / "ep04-v9-cues15-19-reference-repair-segment.mp4",
        "derivation": folder / "ep04-v9-reference-derivation-manifest.json",
    }

    with Image.open(exterior_source) as image:
        cue15 = cover(image, (W, H))
    cue15.save(paths["cue15"], format="PNG", optimize=False)

    with Image.open(wing_source) as image:
        cue16 = cover(image, (W, H))
    cue16.save(paths["cue16"], format="PNG", optimize=False)

    cue17 = cue16.convert("RGBA")
    cue17.alpha_composite(Image.new("RGBA", (W, H), (5, 13, 41, 76)))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((690, 70, 1230, 610), fill=(75, 180, 255, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(95))
    cue17.alpha_composite(glow)
    cue17.convert("RGB").save(paths["cue17"], format="PNG", optimize=False)

    card = Image.new("RGBA", (W, H), (8, 17, 51, 255))
    wing_ghost = cue17.resize((W, H)).filter(ImageFilter.GaussianBlur(10))
    wing_ghost.putalpha(42)
    card.alpha_composite(wing_ghost)
    card_draw = ImageDraw.Draw(card)
    for radius, alpha in ((330, 42), (250, 50), (170, 58)):
        card_draw.ellipse(
            (W // 2 - radius, 110 - radius // 3, W // 2 + radius, 110 + radius * 5 // 3),
            outline=(86, 214, 255, alpha),
            width=3,
        )
    write_centered(
        card_draw,
        "LONDON · 1843",
        280,
        font(FONT_SERIF, 112),
        (255, 235, 182, 255),
    )
    write_centered(
        card_draw,
        "Menabrea’s translation + Lovelace’s Notes",
        450,
        font(FONT_SANS, 48),
        (226, 235, 255, 255),
    )
    write_centered(
        card_draw,
        "A procedure for Babbage’s proposed — and unbuilt — Analytical Engine",
        535,
        font(FONT_SANS, 34),
        (166, 202, 235, 255),
    )
    card_draw.line((440, 650, 1480, 650), fill=(78, 187, 228, 180), width=3)
    write_centered(
        card_draw,
        "1843 publication · Note G · evidence card, not a documentary scene",
        700,
        font(FONT_SANS, 30),
        (173, 188, 221, 255),
    )
    card.convert("RGB").save(paths["cue18_card"], format="PNG", optimize=False)

    board = Image.new("RGBA", (W, H), (8, 14, 39, 255))
    board_draw = ImageDraw.Draw(board)
    rounded_panel(board, (54, 52, 660, 1028), (244, 239, 229, 255), (224, 186, 104, 255))
    with Image.open(ada_source) as image:
        ada = contain(image, (548, 820), (244, 239, 229))
    board.alpha_composite(ada.convert("RGBA"), (84, 82))
    board_draw.text(
        (84, 920),
        "ADA LOVELACE",
        font=font(FONT_SERIF, 48),
        fill=(19, 35, 69, 255),
    )
    board_draw.text(
        (84, 978),
        "1838/c.1841 engraved likeness · public domain",
        font=font(FONT_SANS, 20),
        fill=(57, 71, 92, 255),
    )

    rounded_panel(board, (700, 52, 1866, 630), (238, 230, 207, 255), (92, 190, 221, 255))
    with Image.open(engine_source) as image:
        engine = cover(image, (1106, 430))
    engine = Image.blend(
        engine,
        Image.new("RGB", engine.size, (35, 52, 85)),
        0.10,
    )
    board.alpha_composite(engine.convert("RGBA"), (730, 82))
    board_draw.rectangle((730, 512, 1836, 600), fill=(10, 22, 52, 225))
    board_draw.text(
        (754, 526),
        "PROPOSED ANALYTICAL ENGINE · 1840 PLAN · NOT AN OPERATING MACHINE",
        font=font(FONT_SANS, 23),
        fill=(246, 229, 181, 255),
    )

    rounded_panel(board, (700, 664, 1866, 1028), (15, 33, 74, 255), (224, 186, 104, 255))
    board_draw.text(
        (748, 702),
        "NOTE G",
        font=font(FONT_SERIF, 60),
        fill=(255, 232, 177, 255),
    )
    board_draw.text(
        (748, 785),
        "A procedure for Bernoulli numbers",
        font=font(FONT_SANS, 37),
        fill=(223, 236, 255, 255),
    )
    board_draw.text(
        (748, 844),
        "written for a machine that had not yet been built.",
        font=font(FONT_SANS, 34),
        fill=(168, 207, 235, 255),
    )
    board_draw.text(
        (748, 925),
        "Menabrea/Lovelace, 1843 · Project Gutenberg #75107 reference text",
        font=font(FONT_SANS, 22),
        fill=(150, 169, 204, 255),
    )
    board_draw.text(
        (748, 964),
        "Plan photo: Arnold Reinhold / Wikimedia Commons · CC BY 4.0 · cropped + colour-treated",
        font=font(FONT_SANS, 19),
        fill=(150, 169, 204, 255),
    )
    board.convert("RGB").save(paths["cue19"], format="PNG", optimize=False)

    encode_dissolve(
        paths["cue17"],
        paths["cue18_card"],
        paths["cue18_event"],
    )

    build_repair_segment(paths, config)

    derivation = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCAL_REFERENCE_DERIVATIVES_NOT_JUDGED",
        "input_authorities": {
            key: {
                "path": item["path"],
                "sha256": item["sha256"],
                "role": item["role"],
            }
            for key, item in authorities.items()
        },
        "derived": {
            key: {
                "path": str(path.relative_to(ROOT)),
                "sha256": sha256(path),
                "bytes": path.stat().st_size,
            }
            for key, path in paths.items()
            if key != "derivation"
        },
        "prohibited_inputs_used": [],
        "maker_may_judge": False,
    }
    write_json(paths["derivation"], derivation)
    return paths


def build_repair_segment(paths: dict[str, Path], config: dict) -> None:
    segment = paths["segment"]
    duration = 98.90
    inputs: list[str] = []
    sources = [
        ("cue15", "19.00"),
        ("cue16", "20.55"),
        ("cue17", "5.85"),
        ("cue18_event", None),
        ("cue19", "50.25"),
    ]
    for key, seconds in sources:
        if seconds is not None:
            inputs.extend(
                [
                    "-loop",
                    "1",
                    "-framerate",
                    str(FPS),
                    "-t",
                    seconds,
                    "-i",
                    str(paths[key]),
                ]
            )
        else:
            inputs.extend(["-i", str(paths[key])])

    starts = [0.0, 18.45, 38.45, 43.75, 48.75]
    visible = [18.90, 20.45, 5.75, 5.80, 50.15]
    fade_in = [0.0, 0.45, 0.45, 0.45, 0.80]
    filters = [f"color=c=black:s={W}x{H}:r={FPS}:d={duration:.2f}[base]"]
    for index, (start, span, fade) in enumerate(zip(starts, visible, fade_in)):
        chain = (
            f"[{index}:v]setpts=PTS-STARTPTS,fps={FPS},"
            f"scale={W}:{H}:flags=lanczos,setsar=1,"
        )
        if index == 3:
            chain += "tpad=stop_mode=clone:stop_duration=0.90,"
        chain += f"trim=duration={span:.3f},setpts=PTS-STARTPTS,format=rgba"
        if fade:
            chain += f",fade=t=in:st=0:d={fade:.3f}:alpha=1"
        chain += f",setpts=PTS-STARTPTS+{start:.3f}/TB[v{index}]"
        filters.append(chain)
    previous = "base"
    for index, (start, span) in enumerate(zip(starts, visible)):
        output = f"mix{index}"
        filters.append(
            f"[{previous}][v{index}]overlay=eof_action=pass:repeatlast=0:"
            f"enable='between(t,{start:.3f},{start + span:.3f})'[{output}]"
        )
        previous = output
    filters.append(f"[{previous}]format=yuv420p[out]")

    ffmpeg(
        "-y",
        *inputs,
        "-filter_complex",
        ";".join(filters),
        "-map",
        "[out]",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "16",
        "-profile:v",
        "high",
        "-pix_fmt",
        "yuv420p",
        "-r",
        str(FPS),
        "-t",
        f"{duration:.2f}",
        str(segment),
    )


def verify_declared_inputs(config: dict) -> None:
    if not FFMPEG.is_file():
        raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
    for path in (FONT_SERIF, FONT_SANS, V8_QC_PATH):
        if not path.is_file():
            raise FileNotFoundError(path)

    checks = [
        config["base_master"],
        config["clock_authorities"]["cue_sheet"],
        config["clock_authorities"]["narration"],
        config["clock_authorities"]["captions"],
        *config["reference_authorities"].values(),
    ]
    for item in checks:
        path = rel(item["path"])
        if not path.is_file():
            raise FileNotFoundError(path)
        actual = sha256(path)
        if actual != item["sha256"]:
            raise RuntimeError(
                f"Hash mismatch for {path.relative_to(ROOT)}: "
                f"expected {item['sha256']}, found {actual}"
            )

    v8_qc = read_json(V8_QC_PATH)
    if v8_qc["output_sha256"] != config["base_master"]["sha256"]:
        raise RuntimeError("V8 QC and V9 config disagree on the base master hash")
    expected_cues = config["placement_topology"]["cue_indices"]
    actual_cues = [item["cue"] for item in v8_qc["placements"]]
    if v8_qc["placement_count"] != 55 or actual_cues != expected_cues:
        raise RuntimeError("V8 placement topology does not match the V9 config")


def build_master(config: dict, paths: dict[str, Path], force: bool) -> Path:
    output = rel(config["output"])
    if output.exists() and not force:
        raise FileExistsError(f"Refusing to overwrite existing V9 output: {output}")
    if output.exists():
        output.unlink()

    start = float(config["repair_window"]["overlay_start_seconds"])
    end = float(config["repair_window"]["overlay_end_seconds"])
    fade = float(config["repair_window"]["boundary_fade_seconds"])
    segment_duration = end - start

    ffmpeg(
        "-y",
        "-i",
        str(rel(config["base_master"]["path"])),
        "-i",
        str(paths["segment"]),
        "-filter_complex",
        f"[0:v]setpts=PTS-STARTPTS[base];"
        f"[1:v]setpts=PTS-STARTPTS,format=rgba,"
        f"fade=t=in:st=0:d={fade:.3f}:alpha=1,"
        f"fade=t=out:st={segment_duration - fade:.3f}:d={fade:.3f}:alpha=1,"
        f"setpts=PTS+{start:.3f}/TB[repair];"
        f"[base][repair]overlay=eof_action=pass:repeatlast=0:"
        f"enable='between(t,{start:.3f},{end:.3f})',format=yuv420p[outv]",
        "-map",
        "[outv]",
        "-map",
        "0:a:0",
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
        "copy",
        "-movflags",
        "+faststart",
        "-t",
        f"{END:.2f}",
        str(output),
    )
    return output


def probe(path: Path) -> dict:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    lines = result.stderr.splitlines()
    duration_line = next(line for line in lines if "Duration:" in line)
    video_line = next(line.strip() for line in lines if "Video:" in line)
    audio_line = next(line.strip() for line in lines if "Audio:" in line)
    import re

    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", duration_line)
    if not match:
        raise RuntimeError(f"Could not parse duration for {path}")
    hours, minutes, seconds = match.groups()
    duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    return {
        "duration_seconds": duration,
        "video_stream": video_line,
        "audio_stream": audio_line,
    }


def full_decode(path: Path) -> None:
    ffmpeg("-i", str(path), "-f", "null", "-")


def extract_audio_hash(path: Path, temporary: Path) -> str:
    ffmpeg("-y", "-i", str(path), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(temporary))
    return sha256(temporary)


def extract_frame(video: Path, seconds: float, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    ffmpeg(
        "-y",
        "-ss",
        f"{seconds:.3f}",
        "-i",
        str(video),
        "-frames:v",
        "1",
        "-vf",
        f"scale={W}:{H}:flags=lanczos",
        str(output),
    )


def psnr_between(a: Path, b: Path) -> float:
    with Image.open(a) as first, Image.open(b) as second:
        one = first.convert("RGB")
        two = second.convert("RGB")
        difference = ImageChops.difference(one, two)
        histogram = difference.histogram()
        squared = sum((value % 256) ** 2 * count for value, count in enumerate(histogram))
        mse = squared / (one.width * one.height * 3)
        return 99.0 if mse == 0 else 10 * math.log10((255 * 255) / mse)


def make_review_evidence(config: dict, output: Path) -> tuple[Path, list[dict]]:
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    base = rel(config["base_master"]["path"])
    review_times = [
        (201.20, "before-repair"),
        (202.20, "luminairy-exterior"),
        (220.20, "maivens-wing"),
        (240.20, "lights-soft"),
        (247.00, "london-card"),
        (251.20, "ada-evidence-board"),
        (270.00, "ada-evidence-board-hold"),
        (299.70, "repair-end"),
        (300.80, "after-repair"),
    ]
    frames: list[tuple[float, str, Path]] = []
    for seconds, label in review_times:
        path = REVIEW_DIR / f"{seconds:07.2f}-{label}.jpg"
        extract_frame(output, seconds, path)
        frames.append((seconds, label, path))

    thumb_w, thumb_h = 640, 360
    sheet = Image.new("RGB", (thumb_w * 3, (thumb_h + 46) * 3), (7, 12, 30))
    draw = ImageDraw.Draw(sheet)
    label_font = font(FONT_SANS, 24)
    for index, (seconds, label, path) in enumerate(frames):
        with Image.open(path) as image:
            thumb = cover(image, (thumb_w, thumb_h))
        x = (index % 3) * thumb_w
        y = (index // 3) * (thumb_h + 46)
        sheet.paste(thumb, (x, y))
        draw.rectangle((x, y + thumb_h, x + thumb_w, y + thumb_h + 46), fill=(8, 18, 44))
        draw.text(
            (x + 14, y + thumb_h + 8),
            f"{seconds:07.2f}s · {label}",
            font=label_font,
            fill=(230, 238, 255),
        )
    sheet_path = REVIEW_DIR / "episode-04-v9-reference-reconciled-contact-sheet.jpg"
    sheet.save(sheet_path, quality=94)

    outside_times = [50.0, 150.0, 201.0, 301.0, 600.0, 1000.0, 1200.0]
    comparisons: list[dict] = []
    with tempfile.TemporaryDirectory(prefix="ep04-v9-psnr-") as directory:
        temporary = Path(directory)
        for seconds in outside_times:
            a = temporary / f"v8-{seconds:.2f}.png"
            b = temporary / f"v9-{seconds:.2f}.png"
            extract_frame(base, seconds, a)
            extract_frame(output, seconds, b)
            value = psnr_between(a, b)
            comparisons.append(
                {
                    "seconds": seconds,
                    "psnr_db": round(value, 3),
                    "pass": value >= 35.0,
                }
            )
    return sheet_path, comparisons


def build_placement_manifest(config: dict, output: Path, paths: dict[str, Path]) -> Path:
    v8_qc = read_json(V8_QC_PATH)
    replacement_sources = {
        15: paths["cue15"],
        16: paths["cue16"],
        17: paths["cue17"],
        18: paths["cue18_event"],
        19: paths["cue19"],
    }
    bindings = {
        15: ["luminairy_exterior"],
        16: ["maivens_wing"],
        17: ["maivens_wing"],
        18: ["maivens_wing", "note_g_primary_text"],
        19: ["ada_likeness", "analytical_engine_plan", "note_g_primary_text"],
    }
    historical_groups = {
        20: "Ada Lovelace / 1843 / Analytical Engine",
        21: "Hedy Lamarr / Hollywood 1942",
        22: "Hedy Lamarr / Hollywood 1942",
        23: "Hedy Lamarr / frequency-hopping diagram",
        24: "ENIAC Six / Philadelphia 1945",
        25: "ENIAC Six / Philadelphia 1945",
        26: "ENIAC Six / credit sequence",
        27: "Grace Hopper / Philadelphia 1952",
        28: "Grace Hopper / 1952",
        29: "Grace Hopper / compiler",
        30: "Grace Hopper / moth event",
        31: "Dartmouth / 1956",
        32: "Dartmouth / 1956",
        33: "Dartmouth / 1956",
        34: "Dartmouth / 1956",
        35: "AI winter / 1956 onward",
        38: "Karen Spärck Jones / Cambridge 1972",
        39: "Karen Spärck Jones / Cambridge 1972",
        40: "Karen Spärck Jones / TF-IDF",
        41: "Fei-Fei Li / Stanford 2012",
        42: "Fei-Fei Li / Stanford 2012",
        43: "Fei-Fei Li / ImageNet",
        44: "Fei-Fei Li / ImageNet",
        46: "Joy Buolamwini, Timnit Gebru, Emily Bender, Kate Crawford / 2018-2021",
        47: "Joy Buolamwini",
        48: "Timnit Gebru",
        49: "Emily Bender",
        50: "Timnit Gebru",
        51: "Kate Crawford",
        52: "MAiVEN portraits finale",
    }

    rows = []
    for index, placement in enumerate(v8_qc["placements"]):
        cue = placement["cue"]
        repaired = cue in replacement_sources
        v9_path = replacement_sources.get(cue, rel(placement["source"]))
        row = {
            "placement_index": index,
            "cue": cue,
            "start_seconds": placement["start"],
            "stop_seconds": placement["stop"],
            "v8_source": placement["source"],
            "v8_source_sha256": v8_qc["source_sha256"][placement["source"]],
            "v9_source": str(v9_path.relative_to(ROOT)),
            "v9_source_sha256": sha256(v9_path),
            "action": "REPLACED_CONFIRMED_REFERENCE_FAILURE" if repaired else "RETAINED_FROM_V8",
            "reference_authority_ids": bindings.get(cue, []),
            "authority_state": (
                "BOUND_FOR_V9_REPAIR_CANDIDATE_NOT_INDEPENDENTLY_JUDGED"
                if repaired
                else "V8_SOURCE_HASH_BOUND_NOT_REJUDGED_IN_THIS_LANE"
            ),
            "maker_may_judge": False,
        }
        if cue in historical_groups and not repaired:
            row["remaining_proof"] = (
                f"Independent identity/era/setting/source and normal-speed "
                f"occurrence judgment remains required for {historical_groups[cue]}."
            )
        rows.append(row)

    manifest = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCAL_PLACEMENT_REFERENCE_RECONCILIATION_HOLD",
        "base_v8": {
            "path": config["base_master"]["path"],
            "sha256": config["base_master"]["sha256"],
            "cue_count": 58,
            "placement_count": 55,
        },
        "v9": {
            "path": str(output.relative_to(ROOT)),
            "sha256": sha256(output),
            "placement_count": len(rows),
            "runtime_seconds": END,
        },
        "count_reconciliation": config["placement_topology"],
        "clock_authorities": config["clock_authorities"],
        "reference_authorities": config["reference_authorities"],
        "prohibited_inputs": config["prohibited_inputs"],
        "confirmed_repair_cues": [15, 16, 17, 18, 19],
        "unrelated_placements_changed": 0,
        "placements": rows,
        "remaining_proof": [
            "Independent Image/History judge must rule the five repaired occurrences against the bound references.",
            "Independent full-size, normal-speed audiovisual watch with optional captions remains required.",
            "Historical-person/era/setting adjudication remains open for retained V8 placements 20-52 where named above.",
            "Ali retains the visual/creative ruling; this candidate is not release-approved.",
        ],
        "maker_may_judge": False,
        "release_state": "HOLD",
    }
    path = rel(config["placement_reference_manifest"])
    write_json(path, manifest)
    return path


def build_maker_qc(
    config: dict,
    output: Path,
    paths: dict[str, Path],
    contact_sheet: Path,
    comparisons: list[dict],
) -> Path:
    output_probe = probe(output)
    if abs(output_probe["duration_seconds"] - END) > 0.02:
        raise RuntimeError(f"Unexpected V9 runtime: {output_probe['duration_seconds']}")
    if f"{W}x{H}" not in output_probe["video_stream"] or "h264" not in output_probe[
        "video_stream"
    ].lower():
        raise RuntimeError("Unexpected V9 video stream")
    if "aac" not in output_probe["audio_stream"].lower():
        raise RuntimeError("Unexpected V9 audio stream")
    full_decode(output)

    with tempfile.TemporaryDirectory(prefix="ep04-v9-audio-") as directory:
        temporary = Path(directory)
        v8_audio = extract_audio_hash(rel(config["base_master"]["path"]), temporary / "v8.aac")
        v9_audio = extract_audio_hash(output, temporary / "v9.aac")
    if v8_audio != v9_audio:
        raise RuntimeError("V9 audio packet stream differs from V8")
    if not all(item["pass"] for item in comparisons):
        raise RuntimeError("An out-of-repair-window decoded frame fell below 35 dB PSNR")

    prohibited_paths = {item["path"] for item in config["prohibited_inputs"]}
    used_paths = {
        str(path.relative_to(ROOT))
        for key, path in paths.items()
        if key not in {"derivation"}
    }
    collision = sorted(prohibited_paths & used_paths)
    if collision:
        raise RuntimeError(f"Prohibited inputs entered the V9 repair: {collision}")

    report = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY",
        "maker_verdict": "TECHNICAL_QC_PASS_ONLY",
        "maker_may_judge_or_approve": False,
        "release_state": "HOLD",
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "output_size_bytes": output.stat().st_size,
        "probe": output_probe,
        "full_decode": "PASS",
        "placement_count": 55,
        "cue_count": 58,
        "repaired_cues": [15, 16, 17, 18, 19],
        "unrelated_placement_semantics_changed": 0,
        "clock": {
            "runtime_seconds": END,
            "base_v8_audio_packet_sha256": v8_audio,
            "v9_audio_packet_sha256": v9_audio,
            "audio_packet_stream_identical": True,
            "narration_source_sha256": config["clock_authorities"]["narration"]["sha256"],
            "caption_sha256": config["clock_authorities"]["captions"]["sha256"],
            "captions_burned": False,
            "cue_sheet_sha256": config["clock_authorities"]["cue_sheet"]["sha256"],
        },
        "reference_inputs": {
            key: {
                "path": item["path"],
                "sha256": item["sha256"],
                "role": item["role"],
            }
            for key, item in config["reference_authorities"].items()
        },
        "derived_assets": {
            key: {
                "path": str(path.relative_to(ROOT)),
                "sha256": sha256(path),
                "bytes": path.stat().st_size,
            }
            for key, path in paths.items()
        },
        "prohibited_inputs_used": [],
        "outside_repair_window_frame_psnr": comparisons,
        "outside_repair_window_psnr_floor_db": 35.0,
        "review_contact_sheet": {
            "path": str(contact_sheet.relative_to(ROOT)),
            "sha256": sha256(contact_sheet),
            "purpose": "Maker evidence only; not a visual, historical, motion, or release verdict.",
        },
        "tests": [
            "All declared input hashes matched.",
            "V8 topology reconciled to 55 placements over 58 cue indices.",
            "Only cues 15-19 were replaced.",
            "V9 output passed complete decode.",
            "V9 AAC packet stream is byte-identical to V8.",
            "Caption and cue-sheet authorities remained unchanged.",
            "All sampled frames outside the repair window passed the 35 dB PSNR floor.",
            "No prohibited Cue 18/19 input entered the repair graph.",
        ],
        "remaining_proof": [
            "Maker cannot judge the repaired LUMINAiRY/MAiVEN/Ada/London/Engine occurrences.",
            "Independent Image/History and Motion judges must review exact full-resolution frames and the Cue 18 transition.",
            "Release QA must complete a normal-speed full audiovisual watch with optional captions.",
            "Ali must provide the final visual/creative ruling.",
            "No site, deploy, release, public, or spend action occurred.",
        ],
    }
    path = rel(config["maker_qc"])
    write_json(path, report)
    return path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--force",
        action="store_true",
        help="replace only this versioned V9 output and derived V9 evidence",
    )
    parser.add_argument(
        "--prepare-only",
        action="store_true",
        help="build reference-bound repair assets without rendering the full master",
    )
    args = parser.parse_args()

    config = read_json(CONFIG_PATH)
    verify_declared_inputs(config)
    paths = prepare_reference_assets(config)
    print(paths["derivation"], flush=True)
    if args.prepare_only:
        return

    output = build_master(config, paths, args.force)
    contact_sheet, comparisons = make_review_evidence(config, output)
    placement_manifest = build_placement_manifest(config, output, paths)
    maker_qc = build_maker_qc(
        config,
        output,
        paths,
        contact_sheet,
        comparisons,
    )
    print(output)
    print(placement_manifest)
    print(maker_qc)
    print(sha256(output))


if __name__ == "__main__":
    main()
