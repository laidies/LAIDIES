#!/usr/bin/env python3
"""Build a no-morph Episode 04 transformation pilot using cloud mattes."""

from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageFilter


SOURCE_ROOT = Path(
    "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/"
    "Website-homepage/assets/episodes/ep-04/pixel"
)
WORKTREE = Path("/Users/alisoneakin/Projects/laidies-episode-04-v11-pilot-20260816")
DELIVERY = WORKTREE / "assets/episodes/ep-04/pixel/delivery-v11-pilot-20260816"
OUTPUT = DELIVERY / "episode-04-v11-transformation-cloud-matte-v2-pilot.mp4"
MANIFEST = DELIVERY / "episode-04-v11-transformation-cloud-matte-v2-pilot-manifest.json"
CONTACT = DELIVERY / "episode-04-v11-transformation-cloud-matte-v2-pilot-contact-sheet.jpg"
BUILD_MATTE = DELIVERY / "episode-04-v11-transformation-cloud-build-matte-v2.png"
CLEAR_MATTE = DELIVERY / "episode-04-v11-transformation-cloud-clear-matte-v2.png"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

SOURCES = [
    ("p0-corporate", "ep04-open-15p0-transformation-stage-corporate-no-wand-v1-1920.png", "fd75dfdd13e3fb82cf5d7851e60a8bc788f9e177e59d673eac6f5c0c90fe990e"),
    ("p1-poof-build", "ep04-open-15p1-transformation-poof-build-no-wand-v1-1920.png", "007647cb8a1da240e6caf59c36b010dd12474b01638aaa6a871f1eccab860ed3"),
    ("p2-poof-cover", "ep04-open-15p2-transformation-poof-cover-no-wand-v1-1920.png", "9269f94f1ecfb0a0a4fbe2ed1d604c2046d8357a57cb25c3bf73b934fcd67f0a"),
    ("p3-poof-clear", "ep04-open-15p3-transformation-poof-clearing-no-wand-v1-1920.png", "ef0eda3cfffa7e01c3f97bc8651f2366e51a947f10cf27857755d91cd3bc37b6"),
    ("p4-reveal", "ep04-open-15p4-transformation-reveal-clueless-stage-no-wand-v1-1920.png", "b6a92dfa1ac46db9e14ff31d1218fe8fc93488df16caf37c835b63dc25174d7d"),
]
PREDECESSOR_SHA256 = "83e98a82fa7a131660f839761b0ffa16def17a8d0c01d710a463c70f4c7ce734"
FPS = 30
FRAME_COUNT = 156
SECONDS = FRAME_COUNT / FPS


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def ease(progress: float) -> float:
    progress = min(1.0, max(0.0, progress))
    return progress * progress * (3.0 - 2.0 * progress)


def cloud_layer(effect: np.ndarray, base: np.ndarray, *, clear_side: bool) -> Image.Image:
    difference = np.max(np.abs(effect.astype(np.int16) - base.astype(np.int16)), axis=2)
    alpha = np.clip((difference - 18.0) * (255.0 / 42.0), 0, 255).astype(np.uint8)
    height, width = alpha.shape
    if clear_side:
        # The p3 and p4 heroine renderings differ slightly. Protect the entire
        # person so the matte contains only the surrounding cloud/sparkle art.
        alpha[0:820, 700:1220] = 0
    else:
        # p1's cloud lives below the torso; exclude any subtle face/body render
        # differences from the extracted build matte.
        alpha[0:390, :] = 0
        alpha[390:560, 700:1220] = 0
    alpha_image = Image.fromarray(alpha, mode="L").filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    rgba = np.dstack([effect, np.asarray(alpha_image)])
    return Image.fromarray(rgba.astype(np.uint8), mode="RGBA")


def composite(base: Image.Image, overlay: Image.Image, opacity: float) -> Image.Image:
    if opacity <= 0:
        return base.copy()
    layer = overlay.copy()
    alpha = np.asarray(layer.getchannel("A"), dtype=np.float32)
    layer.putalpha(Image.fromarray(np.clip(alpha * opacity, 0, 255).astype(np.uint8), mode="L"))
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def deterministic_dissolve(first: np.ndarray, second: np.ndarray, progress: float, noise: np.ndarray) -> np.ndarray:
    # Hard pixel ownership, not alpha blending: no doubled face/body can exist.
    threshold = ease(progress)
    return np.where((noise < threshold)[..., None], second, first).astype(np.uint8)


def main() -> None:
    DELIVERY.mkdir(parents=True, exist_ok=True)
    paths: list[Path] = []
    source_records = []
    for label, filename, expected_hash in SOURCES:
        path = SOURCE_ROOT / filename
        observed_hash = sha256(path)
        if observed_hash != expected_hash:
            raise SystemExit(f"SOURCE DRIFT {filename}: {observed_hash} != {expected_hash}")
        paths.append(path)
        source_records.append({"label": label, "path": str(path), "sha256": observed_hash})

    images = [Image.open(path).convert("RGB") for path in paths]
    arrays = [np.asarray(image) for image in images]
    build_matte = cloud_layer(arrays[1], arrays[0], clear_side=False)
    clear_matte = cloud_layer(arrays[3], arrays[4], clear_side=True)
    build_matte.save(BUILD_MATTE)
    clear_matte.save(CLEAR_MATTE)

    rng = np.random.default_rng(4042026)
    noise = rng.random(arrays[0].shape[:2], dtype=np.float32)

    with tempfile.TemporaryDirectory(prefix="ep04-transform-matte-") as temp_name:
        temp_root = Path(temp_name)
        for frame_index in range(FRAME_COUNT):
            if frame_index < 24:  # 0.00-0.80 stable corporate endpoint
                frame = images[0]
            elif frame_index < 54:  # 0.80-1.80 cloud grows over one stable corporate figure
                frame = composite(images[0], build_matte, ease((frame_index - 24) / 29))
            elif frame_index < 84:  # 1.80-2.80 opaque cloud replaces remaining corporate pixels
                frame = Image.fromarray(deterministic_dissolve(arrays[1], arrays[2], (frame_index - 54) / 29, noise))
            elif frame_index < 96:  # 2.80-3.20 full occlusion; hidden outfit/pose switch happens here
                frame = images[2]
            elif frame_index < 138:  # 3.20-4.60 cloud clears over one stable final figure
                frame = composite(images[4], clear_matte, 1.0 - ease((frame_index - 96) / 41))
            else:  # 4.60-5.20 clean reveal
                frame = images[4]
            frame.save(temp_root / f"frame-{frame_index:04d}.png")

        subprocess.run([
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
            "-framerate", str(FPS), "-i", str(temp_root / "frame-%04d.png"),
            "-frames:v", str(FRAME_COUNT), "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
        ], check=True)

    decoded_frames, decoded_seconds = imageio_ffmpeg.count_frames_and_secs(str(OUTPUT))
    if decoded_frames != FRAME_COUNT or abs(decoded_seconds - SECONDS) > (1 / FPS):
        raise SystemExit(f"CLOCK FAIL frames={decoded_frames} seconds={decoded_seconds}")
    subprocess.run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(OUTPUT),
        "-vf", "fps=6,scale=480:270,tile=8x4", "-frames:v", "1", str(CONTACT),
    ], check=True)

    record = {
        "status": "BUILT_LOCALLY_REVIEW_PILOT_NOT_RELEASE_AUTHORITY",
        "job": "Episode 04 corporate-to-SUNNYVAiLE abstract-stage transition",
        "predecessor": {
            "sha256": PREDECESSOR_SHA256,
            "verdict": "HOLD",
            "defects": ["corporate ghosting at 02.10-02.30", "doubled final figure at 03.30-03.90"],
        },
        "motionDesign": {
            "method": "Animate extracted cloud mattes over one stable corporate endpoint and one stable reveal endpoint; switch endpoints only during 0.4 seconds of full p2 occlusion.",
            "clock": {"fps": FPS, "frames": FRAME_COUNT, "seconds": SECONDS},
            "beats": [
                {"frames": "0-23", "job": "stable corporate"},
                {"frames": "24-53", "job": "cloud builds over stable corporate figure"},
                {"frames": "54-83", "job": "hard-pixel magical dissolve into full opaque cloud"},
                {"frames": "84-95", "job": "full occlusion and hidden endpoint switch"},
                {"frames": "96-137", "job": "cloud matte clears over stable final figure"},
                {"frames": "138-155", "job": "stable clean reveal"},
            ],
            "prohibitions": ["no town", "no LUMINAiRY", "no storefront", "no wand", "no FAiRY Godmother", "no alpha-blended heroine transition", "no generated replacement art"],
        },
        "sources": source_records,
        "derivedMattes": [
            {"path": str(BUILD_MATTE), "sha256": sha256(BUILD_MATTE)},
            {"path": str(CLEAR_MATTE), "sha256": sha256(CLEAR_MATTE)},
        ],
        "output": {"path": str(OUTPUT), "sha256": sha256(OUTPUT), "decodedFrames": decoded_frames, "decodedSeconds": decoded_seconds},
        "contactSheet": {"path": str(CONTACT), "sha256": sha256(CONTACT)},
        "limitations": ["Silent visual pilot only.", "Not integrated into the Episode 04 master.", "Requires role-distinct visual judgment."],
    }
    MANIFEST.write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(record, indent=2))


if __name__ == "__main__":
    main()
