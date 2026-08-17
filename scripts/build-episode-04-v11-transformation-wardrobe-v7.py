#!/usr/bin/env python3
"""Bridge exact corporate and SUNNYVAiLE scene art with a wardrobe-door interstitial."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont


ROOT = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
ICLOUD = Path("/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage")
DELIVERY = ROOT / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
DOORS = DELIVERY / "ep04-transformation-wardrobe-doors-v7-source.png"
START = ICLOUD / "assets/episodes/ep-04/pixel/ep04-open-14-question-hangs-comic-v1-face-lock-1920.png"
END = ICLOUD / "assets/episodes/ep-04/pixel/ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png"
FONT = ICLOUD / "operations/design-explorations/episode-01-trading-card-pack-20260728/prototype/public/fonts/Jost-ExtraBold.ttf"
OUTPUT = DELIVERY / "episode-04-v11-transformation-wardrobe-threshold-v7-pilot.mp4"
MANIFEST = DELIVERY / "episode-04-v11-transformation-wardrobe-threshold-v7-pilot-manifest.json"
CONTACT = DELIVERY / "episode-04-v11-transformation-wardrobe-threshold-v7-pilot-contact-sheet.jpg"
SWITCH = DELIVERY / "episode-04-v11-transformation-wardrobe-threshold-v7-switch-contact-sheet.jpg"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
FPS = 30
FRAMES = 180
SOURCE_HASHES = {
    START: "f2e18894abccedf82642ee36850f1451610a0a2e029f094d1d4604a9f2749eb9",
    END: "9ae5f55fb882dd054452dfad00b51c2246974c44f1f4f7a98c8c25306a601cae",
    DOORS: "857f9d3162e8e988332db56514e34d7e42a773cbcb0786a063580a01d8369dd3",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def ease(value: float) -> float:
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


def title(doors: Image.Image, opacity: float) -> Image.Image:
    layer = Image.new("RGBA", doors.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    kicker = ImageFont.truetype(str(FONT), 78)
    main = ImageFont.truetype(str(FONT), 188)
    alpha = round(255 * max(0.0, min(1.0, opacity)))
    draw.polygon([(520, 280), (1400, 280), (1340, 405), (580, 405)], fill=(15, 18, 37, alpha), outline=(245, 201, 89, alpha), width=7)
    draw.text((960, 343), "NOW ENTERING", font=kicker, anchor="mm", fill=(255, 253, 247, alpha))
    draw.text((986, 630), "SUNNYVAiLE", font=main, anchor="mm", fill=(213, 91, 105, alpha), stroke_width=18, stroke_fill=(14, 14, 28, alpha))
    draw.text((971, 615), "SUNNYVAiLE", font=main, anchor="mm", fill=(245, 201, 89, alpha), stroke_width=10, stroke_fill=(14, 14, 28, alpha))
    return Image.alpha_composite(doors.convert("RGBA"), layer).convert("RGB")


def sliding(base: Image.Image, door_plate: Image.Image, progress: float) -> Image.Image:
    progress = ease(progress)
    width, height = base.size
    half = width // 2
    left = door_plate.crop((0, 0, half, height))
    right = door_plate.crop((half, 0, width, height))
    frame = base.copy()
    left_x = round(-half + half * progress)
    right_x = round(width - half * progress)
    frame.paste(left, (left_x, 0))
    frame.paste(right, (right_x, 0))
    return frame


def main() -> None:
    for path, expected in SOURCE_HASHES.items():
        observed = sha256(path)
        if observed != expected:
            raise SystemExit(f"SOURCE DRIFT {path}: {observed} != {expected}")
    start = Image.open(START).convert("RGB")
    end = Image.open(END).convert("RGB")
    doors = Image.open(DOORS).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
    if start.size != (1920, 1080) or end.size != (1920, 1080):
        raise SystemExit("EXACT SCENE GEOMETRY FAIL")

    with tempfile.TemporaryDirectory(prefix="ep04-wardrobe-v7-") as temp_name:
        temp = Path(temp_name)
        for index in range(FRAMES):
            if index < 18:
                frame = start
            elif index < 54:
                frame = sliding(start, doors, (index - 18) / 35)
            elif index < 66:
                frame = doors
            elif index < 78:
                frame = title(doors, (index - 66) / 11)
            elif index < 108:
                frame = title(doors, 1.0)
            elif index < 120:
                frame = title(doors, (119 - index) / 11)
            elif index < 156:
                frame = sliding(end, doors, 1.0 - (index - 120) / 35)
            else:
                frame = end
            frame.save(temp / f"frame-{index:04d}.png")
        subprocess.run([
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-framerate", str(FPS),
            "-i", str(temp / "frame-%04d.png"), "-frames:v", str(FRAMES), "-an", "-c:v", "libx264",
            "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
        ], check=True)
    decoded, seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded != FRAMES or abs(seconds - FRAMES / FPS) > 1 / FPS:
        raise SystemExit(f"CLOCK FAIL {decoded=} {seconds=}")
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "fps=6,scale=480:270,tile=8x5", "-frames:v", "1", str(CONTACT)], check=True)
    subprocess.run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT), "-vf", "select='between(n,12,168)',scale=320:180,tile=12x14", "-vsync", "0", "-frames:v", "1", str(SWITCH)], check=True)
    record = {
        "status": "BUILT_LOCALLY_INTERNAL_CONTINUITY_PILOT_NOT_RELEASE_AUTHORITY",
        "job": "Corporate apartment to SUNNYVAiLE/Lantern Hill threshold without modifying approved scene art",
        "mechanism": "Wardrobe doors close over the exact corporate-apartment scene, carry deterministic NOW ENTERING SUNNYVAiLE lettering, and reopen directly onto the exact Lantern Hill/LUMINAiRY approach scene where the Heroine is already in the episode outfit.",
        "sourcePolicy": "Both character-bearing scene files are decoded at native 1920x1080 and used unmasked, uncropped, unscaled and unedited.",
        "sources": [{"path": str(path), "sha256": expected} for path, expected in SOURCE_HASHES.items()],
        "font": {"path": str(FONT), "sha256": sha256(FONT)},
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT), "frames": decoded, "seconds": seconds},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "switchContactSheet": {"path": str(SWITCH), "sha256": sha256(SWITCH)},
        "constraints": ["no character regeneration", "no character masking", "no character scaling", "no replacement background", "no cloud", "no flash", "no generated text", "silent pilot only"],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
