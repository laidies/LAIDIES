#!/usr/bin/env python3
"""Rebuild three EP04 story events while keeping every character static.

Grace's moth is animated over one fixed Grace frame; the Dartmouth lettering is
revealed on one fixed meeting frame; and Fei-Fei's image wall fills behind one
fixed Fei-Fei foreground. This replaces earlier camera moves and frame swaps.
"""

from __future__ import annotations

import importlib.util
import json
import math
import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw


HERE = Path(__file__).resolve().parent
OLD_SCRIPT = HERE / "build-ep04-animation-delivery.py"
spec = importlib.util.spec_from_file_location("ep04_delivery_v1", OLD_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {OLD_SCRIPT}")
old = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = old
spec.loader.exec_module(old)

ROOT = old.ROOT
PIXEL = old.PIXEL
MASKS = ROOT / "operations/video-qa/episode-04-local-motion-masks-v1"
QA = ROOT / "operations/video-qa/episode-04-controlled-events-v2"

GRACE_OUT = PIXEL / "ep04-scene-05-grace-moth-landing-comic-event-v2.mp4"
NAMING_OUT = PIXEL / "ep04-scene-06-naming-chalk-writes-comic-event-v2.mp4"
FEI_OUT = PIXEL / "ep04-scene-09-fei-fei-wall-fills-comic-event-v2.mp4"


def smoothstep(value: float) -> float:
    value = float(np.clip(value, 0.0, 1.0))
    return value * value * (3.0 - 2.0 * value)


def people_mask(cue: int) -> np.ndarray:
    path = MASKS / f"cue-{cue:02d}-people-mask.png"
    if not path.is_file():
        raise FileNotFoundError(path)
    raw = np.asarray(Image.open(path).convert("L"), dtype=np.float32) / 255.0
    mask = np.clip((raw - 0.20) / 0.20, 0.0, 1.0)
    mask = mask * mask * (3.0 - 2.0 * mask)
    mask = cv2.dilate(
        np.round(mask * 255.0).astype(np.uint8),
        np.ones((5, 5), dtype=np.uint8),
        iterations=1,
    ).astype(np.float32) / 255.0
    return cv2.GaussianBlur(mask, (0, 0), 1.1)


def restore(frame: np.ndarray, base: np.ndarray, people: np.ndarray) -> np.ndarray:
    return np.clip(
        frame.astype(np.float32) * (1.0 - people[..., None])
        + base.astype(np.float32) * people[..., None],
        0.0,
        255.0,
    ).astype(np.uint8)


def prepare_output(path: Path) -> old.Encoder:
    if path.exists():
        raise FileExistsError(f"Refusing to overwrite controlled event: {path}")
    return old.Encoder(path)


def heatmap(
    base: np.ndarray,
    minimum: np.ndarray,
    maximum: np.ndarray,
    name: str,
) -> dict[str, float | str]:
    travel = (
        maximum.astype(np.float32) - minimum.astype(np.float32)
    ).mean(axis=2)
    red = np.clip(travel * 7.0, 0.0, 255.0).astype(np.uint8)
    preview = base.copy()
    preview[..., 0] = np.clip(
        preview[..., 0].astype(np.int16) + red.astype(np.int16), 0, 255
    ).astype(np.uint8)
    preview[..., 1] = np.clip(
        preview[..., 1].astype(np.int16) - red.astype(np.int16) // 2, 0, 255
    ).astype(np.uint8)
    preview[..., 2] = np.clip(
        preview[..., 2].astype(np.int16) - red.astype(np.int16) // 2, 0, 255
    ).astype(np.uint8)
    QA.mkdir(parents=True, exist_ok=True)
    output = QA / f"{name}-heatmap.jpg"
    Image.fromarray(preview).save(output, quality=93)
    return {
        "heatmap": str(output.relative_to(ROOT)),
        "peak_travel": round(float(travel.max()), 3),
        "moved_percent_16_levels": round(float((travel >= 16.0).mean() * 100.0), 4),
    }


def encode_frames(
    output: Path,
    base: np.ndarray,
    frame_count: int,
    renderer,
    heatmap_name: str,
) -> dict[str, float | str]:
    encoder = prepare_output(output)
    minimum = np.full(base.shape, 255, dtype=np.uint8)
    maximum = np.zeros(base.shape, dtype=np.uint8)
    for index in range(frame_count):
        frame = renderer(index / old.FPS)
        minimum = np.minimum(minimum, frame)
        maximum = np.maximum(maximum, frame)
        encoder.write(frame)
    encoder.close()
    result = heatmap(base, minimum, maximum, heatmap_name)
    result["output"] = str(output.relative_to(ROOT))
    return result


def grace_moth_sprite(end: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    _, sprite = old.moth_assets(end)
    alpha = np.zeros((old.H, old.W), dtype=np.uint8)
    x1, y1 = 928, 832
    alpha[y1:y1 + sprite.shape[0], x1:x1 + sprite.shape[1]] = sprite[..., 3]
    expanded = cv2.dilate(alpha, np.ones((13, 13), dtype=np.uint8), iterations=1)
    blank = cv2.inpaint(end, expanded, 11, cv2.INPAINT_TELEA)
    return blank, sprite


def render_grace() -> dict[str, float | str]:
    end = old.load_rgb(old.S["grace_end"])
    blank, sprite = grace_moth_sprite(end)
    people = people_mask(30)
    duration = 12.62

    def frame_at(seconds: float) -> np.ndarray:
        if seconds < 0.75:
            frame = blank
        elif seconds < 5.35:
            u = smoothstep((seconds - 0.75) / 4.60)
            one = 1.0 - u
            start = np.array([1850.0, 255.0])
            control1 = np.array([1640.0, 245.0])
            control2 = np.array([1220.0, 650.0])
            finish = np.array([1040.0, 917.0])
            point = (
                one ** 3 * start
                + 3.0 * one ** 2 * u * control1
                + 3.0 * one * u ** 2 * control2
                + u ** 3 * finish
            )
            flutter = math.sin(2.0 * math.pi * 6.0 * u) * 8.0 * (1.0 - u)
            frame = old.overlay_sprite(
                blank,
                sprite,
                (float(point[0]), float(point[1])),
                0.46 + 0.54 * u,
                -24.0 + 24.0 * u + flutter,
            )
        else:
            frame = end
        return restore(frame, end, people)

    return encode_frames(
        GRACE_OUT,
        end,
        round(duration * old.FPS),
        frame_at,
        "grace-moth-v2",
    )


def chalk_from_one_frame(
    frame: np.ndarray,
) -> tuple[np.ndarray, np.ndarray, tuple[int, int, int, int]]:
    box = (900, 30, 1550, 355)
    x1, y1, x2, y2 = box
    roi = frame[y1:y2, x1:x2]
    hsv = cv2.cvtColor(roi, cv2.COLOR_RGB2HSV)
    selected = (
        (hsv[..., 2] > 132)
        & (hsv[..., 1] < 150)
    ).astype(np.uint8) * 255
    selected = cv2.morphologyEx(
        selected, cv2.MORPH_CLOSE, np.ones((3, 3), dtype=np.uint8)
    )
    selected = cv2.dilate(
        selected, np.ones((3, 3), dtype=np.uint8), iterations=1
    )
    mask = np.zeros((old.H, old.W), dtype=np.uint8)
    mask[y1:y2, x1:x2] = selected
    blank = cv2.inpaint(frame, mask, 7, cv2.INPAINT_TELEA)
    soft = cv2.GaussianBlur(mask, (0, 0), 0.9).astype(np.float32) / 255.0
    return blank, soft, box


def render_naming() -> dict[str, float | str]:
    base = old.load_rgb(old.S["naming_start"])
    blank, chalk, box = chalk_from_one_frame(base)
    x1, _y1, x2, _y2 = box
    yy, xx = np.mgrid[0:old.H, 0:old.W]

    def frame_at(seconds: float) -> np.ndarray:
        if seconds < 0.35:
            reveal = np.zeros((old.H, old.W), dtype=np.float32)
        else:
            progress = smoothstep((seconds - 0.35) / 3.45)
            sweep = np.clip(
                (progress - (xx - x1) / max(1, x2 - x1) + 0.055) / 0.055,
                0.0,
                1.0,
            )
            first_line = (yy < 180).astype(np.float32)
            second_line = np.clip((progress - 0.43) / 0.57, 0.0, 1.0)
            line_enable = np.where(yy < 180, first_line, second_line)
            reveal = chalk * sweep * line_enable
        return np.clip(
            blank.astype(np.float32) * (1.0 - reveal[..., None])
            + base.astype(np.float32) * reveal[..., None],
            0.0,
            255.0,
        ).astype(np.uint8)

    return encode_frames(
        NAMING_OUT,
        base,
        round(5.4 * old.FPS),
        frame_at,
        "dartmouth-chalk-v2",
    )


def render_fei() -> dict[str, float | str]:
    end = old.load_rgb(old.S["fei_end"])
    people = people_mask(43)
    wall = old.fei_wall_mask()
    wall *= 1.0 - people
    dark = np.clip(
        end.astype(np.float32) * 0.12
        + np.array([13.0, 21.0, 27.0], dtype=np.float32),
        0.0,
        255.0,
    )
    empty = np.clip(
        end.astype(np.float32) * (1.0 - wall[..., None])
        + dark * wall[..., None],
        0.0,
        255.0,
    ).astype(np.uint8)
    yy, xx = np.mgrid[0:old.H, 0:old.W]
    distance = np.sqrt(
        ((xx - 1220.0) / 1510.0) ** 2
        + ((yy - 320.0) / 1040.0) ** 2
    )
    maximum = max(1e-6, float(distance[wall > 0.1].max()))
    distance = np.clip(distance / maximum, 0.0, 1.0)

    def frame_at(seconds: float) -> np.ndarray:
        if seconds < 1.20:
            reveal = np.zeros((old.H, old.W), dtype=np.float32)
        else:
            u = smoothstep((seconds - 1.20) / 7.40)
            reveal = np.clip((u - distance + 0.07) / 0.07, 0.0, 1.0) * wall
        frame = np.clip(
            empty.astype(np.float32) * (1.0 - reveal[..., None])
            + end.astype(np.float32) * reveal[..., None],
            0.0,
            255.0,
        ).astype(np.uint8)
        return restore(frame, end, people)

    return encode_frames(
        FEI_OUT,
        end,
        round(23.0 * old.FPS),
        frame_at,
        "feifei-wall-v2",
    )


def verify(path: Path) -> None:
    result = subprocess.run(
        [
            str(old.FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(path),
            "-f",
            "null",
            "-",
        ],
        check=False,
    )
    if result.returncode:
        raise RuntimeError(f"Decode verification failed: {path}")


def build_sheet(records: list[dict[str, float | str]]) -> Path:
    tile_w, tile_h = 640, 360
    sheet = Image.new("RGB", (tile_w * 3, tile_h + 42), (14, 9, 19))
    draw = ImageDraw.Draw(sheet)
    for index, record in enumerate(records):
        image = Image.open(ROOT / str(record["heatmap"])).convert("RGB").resize(
            (tile_w, tile_h), Image.Resampling.LANCZOS
        )
        sheet.paste(image, (index * tile_w, 42))
        draw.text(
            (index * tile_w + 8, 13),
            f"{Path(str(record['output'])).stem} · red = motion",
            fill=(255, 255, 255),
        )
    output = QA / "controlled-events-v2-heatmaps.jpg"
    sheet.save(output, quality=93)
    return output


def main() -> None:
    QA.mkdir(parents=True, exist_ok=True)
    manifest = QA / "manifest.json"
    if manifest.exists():
        raise FileExistsError(f"Refusing to overwrite manifest: {manifest}")
    records = []
    for label, renderer, output in (
        ("Grace moth", render_grace, GRACE_OUT),
        ("Dartmouth chalk", render_naming, NAMING_OUT),
        ("Fei-Fei wall", render_fei, FEI_OUT),
    ):
        print(f"rendering {label}", flush=True)
        record = renderer()
        verify(output)
        records.append(record)
        print(record, flush=True)
    sheet = build_sheet(records)
    manifest.write_text(
        json.dumps(
            {
                "policy": {
                    "camera_motion": False,
                    "character_motion": False,
                    "whole_frame_generation": False,
                    "approved_originals_overwritten": False,
                },
                "records": records,
                "contact_sheet": str(sheet.relative_to(ROOT)),
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(sheet)
    print(manifest)


if __name__ == "__main__":
    main()
