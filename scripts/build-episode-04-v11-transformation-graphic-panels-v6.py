#!/usr/bin/env python3
"""Adult graphic-novel panel transition proof for Episode 04."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont


ROOT = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
SOURCE_ROOT = Path("/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/assets/episodes/ep-04/pixel")
DELIVERY = ROOT / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
OUTPUT = DELIVERY / "episode-04-v11-transformation-graphic-panels-v6-pilot.mp4"
CONTACT = DELIVERY / "episode-04-v11-transformation-graphic-panels-v6-pilot-contact-sheet.jpg"
SWITCH = DELIVERY / "episode-04-v11-transformation-graphic-panels-v6-switch-contact-sheet.jpg"
MANIFEST = DELIVERY / "episode-04-v11-transformation-graphic-panels-v6-pilot-manifest.json"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
FPS = 30
FRAMES = 186
FONT = Path("/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/design-explorations/episode-01-trading-card-pack-20260728/prototype/public/fonts/Jost-ExtraBold.ttf")
SOURCES = [
    ("corporate", "ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png", "fd75dfdd13e3fb82cf5d7851e60a8bc788f9e177e59d673eac6f5c0c90fe990e"),
    ("reveal", "ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png", "b6a92dfa1ac46db9e14ff31d1218fe8fc93488df16caf37c835b63dc25174d7d"),
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def ease(value: float) -> float:
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


def panels(base: Image.Image, progress: float, show_title: bool = False) -> Image.Image:
    """Close faceted ink-edged panels over the frame; no alpha or character blending."""
    progress = ease(progress)
    width, height = base.size
    image = base.copy()
    draw = ImageDraw.Draw(image)
    reach = int((width * 0.62 + 220) * progress)
    left_edge = -220 + reach
    right_edge = width + 220 - reach

    # Shadow planes are offset first, giving the colour planes dimensional depth.
    draw.polygon([(-260, -80), (left_edge + 70, -80), (left_edge - 170, height + 80), (-260, height + 80)], fill="#080b1d")
    draw.polygon([(width + 260, -80), (right_edge - 70, -80), (right_edge + 170, height + 80), (width + 260, height + 80)], fill="#080b1d")
    draw.polygon([(-260, -80), (left_edge, -80), (left_edge - 240, height + 80), (-260, height + 80)], fill="#a91562", outline="#120d27", width=12)
    draw.polygon([(width + 260, -80), (right_edge, -80), (right_edge + 240, height + 80), (width + 260, height + 80)], fill="#007c83", outline="#120d27", width=12)

    # Narrow secondary facets echo the locked geometric stage and printed panel grammar.
    accent = int(reach * 0.78)
    draw.polygon([(-180, height + 50), (-180 + accent, height + 50), (-360 + accent, -50), (-180, -50)], fill="#e92b87", outline="#120d27", width=8)
    draw.polygon([(width + 180, height + 50), (width + 180 - accent, height + 50), (width + 360 - accent, -50), (width + 180, -50)], fill="#00a8a8", outline="#120d27", width=8)

    if progress > 0.72 and not show_title:
        gold = (progress - 0.72) / 0.28
        half = int(width * 0.52 * gold)
        draw.polygon([(width // 2 - half, height // 2 - 22), (width // 2 + half, height // 2 - 22), (width // 2 + half - 70, height // 2 + 22), (width // 2 - half + 70, height // 2 + 22)], fill="#f1c44e", outline="#120d27", width=7)
    if show_title:
        kicker = ImageFont.truetype(str(FONT), 86)
        title = ImageFont.truetype(str(FONT), 224)
        # Inked caption tab + oversized dimensional title, adapted from the locked lettering refs.
        draw.polygon([(585, 310), (1335, 310), (1285, 430), (635, 430)], fill="#120d27", outline="#f1c44e", width=7)
        draw.text((width // 2, 370), "NOW ENTERING", font=kicker, anchor="mm", fill="#fffdf7")
        draw.text((width // 2 + 28, 615 + 28), "SUNNYVAiLE", font=title, anchor="mm", fill="#e92b87", stroke_width=18, stroke_fill="#120d27")
        draw.text((width // 2 + 11, 615 + 11), "SUNNYVAiLE", font=title, anchor="mm", fill="#00a8a8", stroke_width=14, stroke_fill="#120d27")
        draw.text((width // 2, 615), "SUNNYVAiLE", font=title, anchor="mm", fill="#f1c44e", stroke_width=10, stroke_fill="#120d27")
        draw.polygon([(390, 775), (1530, 775), (1460, 808), (460, 808)], fill="#f1c44e", outline="#120d27", width=6)
    return image


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    plates = []
    records = []
    for label, filename, expected in SOURCES:
        path = SOURCE_ROOT / filename
        observed = sha256(path)
        if observed != expected:
            raise SystemExit(f"SOURCE DRIFT {filename}: {observed}")
        plates.append(Image.open(path).convert("RGB"))
        records.append({"label": label, "path": str(path), "sha256": observed})
    corporate, reveal = plates

    with tempfile.TemporaryDirectory(prefix="ep04-panels-v6-") as temp_name:
        temp = Path(temp_name)
        for index in range(FRAMES):
            if index < 18:
                frame = corporate
            elif index < 60:
                frame = panels(corporate, (index - 18) / 41)
            elif index < 86:
                frame = panels(corporate, 1.0, show_title=True)
            elif index < 112:
                frame = panels(reveal, 1.0, show_title=True)
            elif index < 154:
                frame = panels(reveal, 1.0 - (index - 112) / 41)
            else:
                frame = reveal
            frame.save(temp / f"frame-{index:04d}.png")

        subprocess.run([
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-framerate", str(FPS),
            "-i", str(temp / "frame-%04d.png"), "-frames:v", str(FRAMES), "-an", "-c:v", "libx264",
            "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
        ], check=True)
    decoded, seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded != FRAMES or abs(seconds - FRAMES / FPS) > 1 / FPS:
        raise SystemExit(f"CLOCK FAIL {decoded=} {seconds=}")
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "fps=6,scale=480:270,tile=8x4", "-frames:v", "1", str(CONTACT)], check=True)
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "select='between(n,54,124)',scale=384:216,tile=9x8", "-vsync", "0", "-frames:v", "1", str(SWITCH)], check=True)
    record = {
        "status": "BUILT_LOCALLY_INTERNAL_STYLE_PILOT_NOT_RELEASE_AUTHORITY",
        "userCorrection": "Pop-art adult graphic novel, not cartoon.",
        "supersedesApproach": "Pastel cloud transition and white-flash concealment are rejected as cartoon drift.",
        "mechanism": "Hard-edged, ink-contoured magenta and teal panel planes close over the corporate endpoint; the deterministic NOW ENTERING SUNNYVAiLE title explains the threshold; a concealed hard cut swaps the endpoint under full coverage; and the panels retract to reveal the approved yellow-plaid endpoint.",
        "sources": records,
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT), "frames": decoded, "seconds": seconds},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "switchContactSheet": {"path": str(SWITCH), "sha256": sha256(SWITCH)},
        "textPlan": {"copy": ["NOW ENTERING", "SUNNYVAiLE"], "source": "deterministic editable Jost ExtraBold layer", "fontPath": str(FONT), "fontSha256": sha256(FONT)},
        "constraints": ["adult graphic-novel panel grammar", "clean ink", "hard-edged shadows", "vibrant 90s colour", "no cloud", "no flash", "no halftone", "no generated lettering", "no face generation", "silent style pilot only"],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
