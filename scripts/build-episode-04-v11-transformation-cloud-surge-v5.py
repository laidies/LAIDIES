#!/usr/bin/env python3
"""Replace the rejected white flash with a source-preserving cloud surge."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import math
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image


ROOT = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
DELIVERY = ROOT / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
OUTPUT = DELIVERY / "episode-04-v11-transformation-cloud-surge-v5-pilot.mp4"
CONTACT = DELIVERY / "episode-04-v11-transformation-cloud-surge-v5-pilot-contact-sheet.jpg"
SWITCH = DELIVERY / "episode-04-v11-transformation-cloud-surge-v5-switch-contact-sheet.jpg"
MANIFEST = DELIVERY / "episode-04-v11-transformation-cloud-surge-v5-pilot-manifest.json"
V4_SCRIPT = ROOT / "scripts/build-episode-04-v11-transformation-flash-reveal-v4.py"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
FPS = 30
FRAMES = 156


def load_v4():
    spec = importlib.util.spec_from_file_location("ep04_v4", V4_SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader
    spec.loader.exec_module(module)
    return module


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def zoom_center(image: Image.Image, scale: float) -> Image.Image:
    width, height = image.size
    enlarged = image.resize((round(width * scale), round(height * scale)), Image.Resampling.LANCZOS)
    left = (enlarged.width - width) // 2
    top = (enlarged.height - height) // 2
    return enlarged.crop((left, top, left + width, top + height))


def cloud_clear_mask(mask: Image.Image, progress: float) -> Image.Image:
    """Lift the enlarged cloud from the shoes upward with an organic edge."""
    progress = min(1.0, max(0.0, progress))
    width, height = mask.size
    result = mask.copy()
    pixels = result.load()
    base_line = height + 80 - progress * (height + 180)
    feather = 18
    for x in range(width):
        wave = 28 * math.sin(x / 88.0) + 14 * math.sin(x / 37.0 + 1.3)
        boundary = base_line + wave
        for y in range(max(0, int(boundary - feather)), height):
            if y <= boundary:
                attenuation = int(255 * (boundary - y) / feather)
                pixels[x, y] = min(pixels[x, y], attenuation)
            else:
                pixels[x, y] = 0
    return result


def main() -> None:
    v4 = load_v4()
    images = []
    source_records = []
    for label, filename, expected in v4.SOURCES:
        path = v4.SOURCE_ROOT / filename
        observed = sha256(path)
        if observed != expected:
            raise SystemExit(f"SOURCE DRIFT {filename}")
        images.append(Image.open(path).convert("RGB"))
        source_records.append({"label": label, "path": str(path), "sha256": observed})
    corporate, cloud, reveal = images
    full_mask = v4.growth_mask(corporate.size, 1.0)

    with tempfile.TemporaryDirectory(prefix="ep04-transformation-v5-") as temp_name:
        temp = Path(temp_name)
        for index in range(FRAMES):
            if index < 18:
                frame = corporate
            elif index < 62:
                frame = Image.composite(cloud, corporate, v4.growth_mask(corporate.size, (index - 18) / 43))
            elif index < 68:
                frame = Image.composite(cloud, corporate, full_mask)
            elif index < 83:
                progress = v4.ease((index - 68) / 14)
                scale = 1.0 + 0.5 * progress
                frame = Image.composite(zoom_center(cloud, scale), corporate, zoom_center(full_mask, scale))
            elif index < 89:
                frame = zoom_center(cloud, 1.5)
            elif index < 133:
                enlarged_cloud = zoom_center(cloud, 1.5)
                enlarged_mask = zoom_center(full_mask, 1.5)
                frame = Image.composite(enlarged_cloud, reveal, cloud_clear_mask(enlarged_mask, (index - 89) / 43))
            else:
                frame = reveal
            frame.save(temp / f"frame-{index:04d}.png")

        subprocess.run([
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-framerate", str(FPS), "-i", str(temp / "frame-%04d.png"),
            "-frames:v", str(FRAMES), "-an", "-c:v", "libx264", "-preset", "slow",
            "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
        ], check=True)

    decoded, seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded != FRAMES or abs(seconds - FRAMES / FPS) > 1 / FPS:
        raise SystemExit(f"CLOCK FAIL {decoded=} {seconds=}")
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "fps=6,scale=480:270,tile=8x4", "-frames:v", "1", str(CONTACT)], check=True)
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "select='between(n,64,104)',scale=480:270,tile=7x6", "-vsync", "0", "-frames:v", "1", str(SWITCH)], check=True)

    record = {
        "status": "BUILT_LOCALLY_INTERNAL_PILOT_NOT_RELEASE_AUTHORITY",
        "supersedes": {"version": "v4", "sha256": "ed0d4fe4678983f9beb77c2a45655e26e0680a32dfb64072485bf50c2acdbf7b", "reason": "Ali rejected the visible white midpoint flash."},
        "mechanism": "The exact approved cloud plate expands toward camera until it fully obscures the figure, the endpoint swaps under that opaque source frame, and the enlarged cloud lifts from the shoes upward over the exact approved reveal.",
        "sources": source_records,
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT), "frames": decoded, "seconds": seconds},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "switchContactSheet": {"path": str(SWITCH), "sha256": sha256(SWITCH)},
        "prohibitions": ["no white or clear flash", "no generated replacement art", "no cross-dissolved people", "no paid provider", "silent pilot only"],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
