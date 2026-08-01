#!/usr/bin/env python3
"""Build EP04 rain and Grace-moth successor clips for viewer-level QA.

The v1 rain clips moved pixels but the rain was not reliably perceptible at
normal playback size.  The Grace v2 compositor restored the protected person
*after* drawing the moth, which erased the moth whenever its path crossed the
person mask.  This successor keeps the approved character pixels fixed while
making the environmental event visible and preserving the moth as an
intentional foreground story object.

All outputs are new versioned files.  No previously rendered asset is
overwritten.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import math
import sys
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np


HERE = Path(__file__).resolve().parent


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


local = load_module("ep04_local_motion_v1", HERE / "build-ep04-local-motion-v1.py")
events = load_module("ep04_controlled_events_v2", HERE / "build-ep04-controlled-events-v2.py")
old = events.old

ROOT = local.ROOT
PIXEL = local.PIXEL
QA = ROOT / "operations/video-qa/episode-04-perceptible-rain-and-grace-moth-v3"

RAIN_OUTPUTS = {
    4: PIXEL / "ep04-cue04-local-motion-v2-rain-visible.mp4",
    5: PIXEL / "ep04-cue05-local-motion-v3-rain-prominent.mp4",
}
GRACE_OUTPUT = PIXEL / "ep04-scene-05-grace-moth-landing-comic-event-v3.mp4"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def smoothstep(value: float) -> float:
    value = float(np.clip(value, 0.0, 1.0))
    return value * value * (3.0 - 2.0 * value)


def visible_rain_overlay(cue: int, seconds: float, window: np.ndarray) -> np.ndarray:
    """Return two-depth rain that remains legible after H.264 compression.

    Streak positions are deterministic and loop over five seconds.  The
    brighter near streaks are deliberately sparse; the softer far streaks
    create continuous weather without turning the window into white noise.
    """

    rng = np.random.default_rng(41000 + cue)
    overlay = np.zeros((local.H, local.W, 3), dtype=np.float32)
    interval = local.H + 300

    # Cue 05 is a much tighter crop with less visible glass.  Its weather must
    # be slightly denser and brighter to remain legible at delivery size.
    density = 1.55 if cue == 5 else 1.0
    strength = 1.30 if cue == 5 else 1.0
    layers = (
        (round(92 * density), 1, (92.0, 145.0, 183.0), 30, 58, 0.42 * strength),
        (round(46 * density), 2, (135.0, 194.0, 228.0), 54, 94, 0.62 * strength),
    )
    for count, width, color, minimum, maximum, opacity in layers:
        for index in range(count):
            x0 = rng.uniform(0, local.W + 220)
            y0 = rng.uniform(-150, local.H + 150)
            cycles = int(rng.integers(2, 5))
            speed = interval * cycles / local.SECONDS
            y = int((y0 + speed * seconds + 150) % interval - 150)
            x = int(x0 - 0.24 * y + 7.0 * math.sin(index + seconds * 1.7))
            length = int(rng.integers(minimum, maximum + 1))
            cv2.line(
                overlay,
                (x, y),
                (x - max(7, length // 4), y + length),
                tuple(channel * opacity for channel in color),
                width,
                cv2.LINE_AA,
            )

    # A faint travelling sheen makes the rainy glass read at normal speed
    # without changing the heroine or the illustrated room.
    yy, xx = np.mgrid[0:local.H, 0:local.W]
    centre = -280.0 + (local.W + 560.0) * seconds / local.SECONDS
    sheen = np.exp(-((xx + 0.15 * yy - centre) / 115.0) ** 2).astype(np.float32)
    overlay += sheen[..., None] * np.array([4.0, 10.0, 15.0], dtype=np.float32)
    return overlay * window[..., None]


def render_rain(job) -> dict[str, object]:
    output = RAIN_OUTPUTS[job.cue]
    if output.exists():
        raise FileExistsError(f"Refusing to overwrite rain successor: {output}")

    base = local.load_rgb(PIXEL / job.source)
    people = local.person_mask(job)
    prepared = local.prepare(job, base, people)
    window = prepared["window"]
    assert isinstance(window, np.ndarray)

    encoder = local.Encoder(output)
    minimum = np.full(base.shape, 255.0, dtype=np.float32)
    maximum = np.zeros(base.shape, dtype=np.float32)
    for index in range(local.FRAMES):
        seconds = index / local.FPS
        frame = local.screen_glow(
            base,
            job.regions["screen"],
            seconds,
            (38.0, 191.0, 220.0),
            job.cue * 0.31,
        )
        frame = np.clip(frame + visible_rain_overlay(job.cue, seconds, window), 0.0, 255.0)
        frame = local.restore_people(frame, base, people)
        minimum = np.minimum(minimum, frame)
        maximum = np.maximum(maximum, frame)
        encoder.write(frame)
    encoder.close()

    travel = (maximum - minimum).mean(axis=2)
    window_pixels = window > 0.35
    perceptible = (travel >= 14.0) & window_pixels
    return {
        "cue": job.cue,
        "output": str(output.relative_to(ROOT)),
        "sha256": sha256(output),
        "duration_seconds": local.SECONDS,
        "window_pixels_changed_14_levels_percent": round(
            float(perceptible.sum() / max(1, window_pixels.sum()) * 100.0), 4
        ),
        "disposition": "CANDIDATE_REQUIRES_NORMAL_SPEED_HUMAN_REVIEW",
    }


def existing_rain_record(job) -> dict[str, object]:
    output = RAIN_OUTPUTS[job.cue]
    return {
        "cue": job.cue,
        "output": str(output.relative_to(ROOT)),
        "sha256": sha256(output),
        "duration_seconds": local.SECONDS,
        "disposition": "EXISTING_LOCAL_CANDIDATE_REVIEW_REQUIRED",
    }


def render_grace() -> dict[str, object]:
    if GRACE_OUTPUT.exists():
        raise FileExistsError(f"Refusing to overwrite Grace successor: {GRACE_OUTPUT}")

    end = old.load_rgb(old.S["grace_end"])
    blank, sprite = events.grace_moth_sprite(end)
    people = events.people_mask(30)
    # Restore Grace before drawing the narrative object.  Drawing the moth
    # after the protected foreground prevents the mask from erasing it.
    blank_protected = events.restore(blank, end, people)
    duration = 12.62
    frame_count = round(duration * old.FPS)

    encoder = old.Encoder(GRACE_OUTPUT)
    visible_frames = 0
    for index in range(frame_count):
        seconds = index / old.FPS
        if seconds < 0.72:
            frame = blank_protected
        elif seconds < 5.20:
            u = smoothstep((seconds - 0.72) / 4.48)
            one = 1.0 - u
            start = np.array([1835.0, 250.0])
            control1 = np.array([1725.0, 330.0])
            control2 = np.array([1505.0, 760.0])
            finish = np.array([1040.0, 917.0])
            point = (
                one ** 3 * start
                + 3.0 * one ** 2 * u * control1
                + 3.0 * one * u ** 2 * control2
                + u ** 3 * finish
            )
            flutter = math.sin(2.0 * math.pi * 6.0 * u) * 7.0 * (1.0 - u)
            frame = old.overlay_sprite(
                blank_protected,
                sprite,
                (float(point[0]), float(point[1])),
                0.48 + 0.52 * u,
                -22.0 + 22.0 * u + flutter,
            )
            visible_frames += 1
        else:
            frame = end
            visible_frames += 1
        encoder.write(frame)
    encoder.close()

    return {
        "cue": 30,
        "output": str(GRACE_OUTPUT.relative_to(ROOT)),
        "sha256": sha256(GRACE_OUTPUT),
        "duration_seconds": duration,
        "visible_story_object_frames": visible_frames,
        "compositing_order": "protected_person_then_moth_foreground",
        "disposition": "CANDIDATE_REQUIRES_NORMAL_SPEED_HUMAN_REVIEW",
    }


def existing_grace_record() -> dict[str, object]:
    return {
        "cue": 30,
        "output": str(GRACE_OUTPUT.relative_to(ROOT)),
        "sha256": sha256(GRACE_OUTPUT),
        "duration_seconds": 12.62,
        "compositing_order": "protected_person_then_moth_foreground",
        "disposition": "EXISTING_LOCAL_CANDIDATE_REVIEW_REQUIRED",
    }


def main() -> None:
    QA.mkdir(parents=True, exist_ok=True)
    rain_jobs = [job for job in local.JOBS if job.cue in RAIN_OUTPUTS]
    records = [
        existing_rain_record(job) if RAIN_OUTPUTS[job.cue].exists() else render_rain(job)
        for job in rain_jobs
    ]
    records.append(existing_grace_record() if GRACE_OUTPUT.exists() else render_grace())
    manifest = {
        "schema_version": 1,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_REVIEW_REQUIRED",
        "purpose": "viewer-perceptible rain and non-disappearing Grace moth successors",
        "source_scripts": [
            "assets/video/fx/build-ep04-local-motion-v1.py",
            "assets/video/fx/build-ep04-controlled-events-v2.py",
            "assets/video/fx/build-ep04-animation-delivery.py",
        ],
        "records": records,
        "release_authority": "NONE",
    }
    path = QA / "manifest.json"
    path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
