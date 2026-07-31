#!/usr/bin/env python3
"""Create a reusable human foreground mask with U-2-Net human segmentation."""

from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np
import onnxruntime as ort
from PIL import Image


DEFAULT_MODEL = Path(
    "/Users/alisoneakin/.cache/laidies-models/u2net_human_seg.onnx"
)


def predict(session: ort.InferenceSession, rgb: np.ndarray) -> np.ndarray:
    height, width = rgb.shape[:2]
    resized = cv2.resize(rgb, (320, 320), interpolation=cv2.INTER_AREA) / 255.0
    mean = np.asarray([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.asarray([0.229, 0.224, 0.225], dtype=np.float32)
    tensor = ((resized - mean) / std).transpose(2, 0, 1)[None, ...]

    output = session.run(
        [session.get_outputs()[0].name],
        {session.get_inputs()[0].name: tensor},
    )[0][0, 0]
    output = (output - output.min()) / max(1e-6, output.max() - output.min())
    mask = cv2.resize(output, (width, height), interpolation=cv2.INTER_CUBIC)
    return np.clip(mask, 0.0, 1.0)


def segment(image_path: Path, model_path: Path) -> tuple[np.ndarray, np.ndarray]:
    rgb = np.asarray(Image.open(image_path).convert("RGB"), dtype=np.float32)
    height, width = rgb.shape[:2]
    session = ort.InferenceSession(
        str(model_path), providers=["CPUExecutionProvider"]
    )

    # The full-frame pass favours the two large foreground figures. Overlapping
    # crops make the four women farther back large enough for the same model.
    mask = predict(session, rgb)
    tile_width = width // 2
    tile_starts = [0, width // 4, width // 2]
    for start in tile_starts:
        end = min(width, start + tile_width)
        tile = rgb[:, start:end]
        tile_mask = predict(session, tile)
        mask[:, start:end] = np.maximum(mask[:, start:end], tile_mask)

    mask = cv2.GaussianBlur(mask.astype(np.float32), (0, 0), 1.2)
    return rgb, np.clip(mask, 0.0, 1.0)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("image", type=Path)
    parser.add_argument("mask", type=Path)
    parser.add_argument("--preview", type=Path)
    parser.add_argument("--model", type=Path, default=DEFAULT_MODEL)
    args = parser.parse_args()

    if not args.image.is_file():
        raise FileNotFoundError(args.image)
    if not args.model.is_file():
        raise FileNotFoundError(args.model)
    if args.mask.exists():
        raise FileExistsError(f"Refusing to overwrite mask: {args.mask}")
    if args.preview and args.preview.exists():
        raise FileExistsError(f"Refusing to overwrite preview: {args.preview}")

    rgb, mask = segment(args.image, args.model)
    args.mask.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(np.round(mask * 255.0).astype(np.uint8)).save(args.mask)

    if args.preview:
        foreground = mask >= 0.45
        preview = rgb.astype(np.uint8).copy()
        preview[foreground] = (
            preview[foreground].astype(np.float32) * 0.38
            + np.asarray([20.0, 205.0, 255.0], dtype=np.float32) * 0.62
        ).astype(np.uint8)
        Image.fromarray(preview).save(args.preview, quality=94)

    print(f"mask: {args.mask}")
    if args.preview:
        print(f"preview: {args.preview}")


if __name__ == "__main__":
    main()
