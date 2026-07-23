from pathlib import Path
import json
import math
import subprocess

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parent
AVCONVERT = Path("/usr/bin/avconvert")
FPS = 30
SIZE = (1920, 1080)


SCENES = {
    "01": ("cold-open-v2", ["ep04-scene-01-cold-open-v2.png", "ep04-scene-01-cold-open-v2-c-end.png"]),
    "02": ("luminairy-v2", ["ep04-scene-02a-luminairy-approach-v2-a-start.png", "ep04-scene-02a-luminairy-approach-v2-b-mid.png", "ep04-scene-02a-luminairy-approach-v2-c-end.png", "ep04-scene-02b-luminairy-nave-pixel-v1.png", "ep04-scene-02-luminairy-v2.png", "ep04-scene-02-luminairy-v2-b-mid.png", "ep04-scene-02-luminairy-v2-c-end.png"]),
    "03": ("ada", ["ep04-scene-03-ada.png", "ep04-scene-03-ada-b-mid.png", "ep04-scene-03-ada-c-end.png"]),
    "04": ("hedy", ["ep04-scene-04-hedy.png", "ep04-scene-04-hedy-c-end.png"]),
    "04b": ("eniac", ["ep04-scene-04b-eniac-a-start.png", "ep04-scene-04b-eniac.png", "ep04-scene-04b-eniac-c-end.png"]),
    "06": ("naming", ["ep04-scene-06-naming.png", "ep04-scene-06-naming-c-end.png"]),
    "07": ("ai-winter", ["ep04-scene-07-ai-winter.png", "ep04-scene-07-ai-winter-c-end.png"]),
    "08": ("karen", ["ep04-scene-08-karen.png", "ep04-scene-08-karen-b-mid.png", "ep04-scene-08-karen-c-end.png"]),
    "09": ("fei-fei", ["ep04-scene-09-fei-fei-a-start.png", "ep04-scene-09-fei-fei-b-mid.png", "ep04-scene-09-fei-fei.png"]),
    "10": ("desk-v2", ["ep04-scene-10-desk-v2.png", "ep04-scene-10-desk-v2-c-end.png"]),
    "11": ("checkers", ["ep04-scene-11-checkers.png", "ep04-scene-11-checkers-c-end.png"]),
    "12": ("lights-up-v2", ["ep04-scene-12-lights-up-v2.png", "ep04-scene-12-lights-up-v2-b-mid.png", "ep04-scene-12-lights-up-v2-c-end.png"]),
}


def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))


def smooth(v):
    v = clamp(v)
    return v * v * (3 - 2 * v)


def cover(frame):
    h, w = frame.shape[:2]
    scale = max(SIZE[0] / w, SIZE[1] / h)
    nw, nh = int(round(w * scale)), int(round(h * scale))
    resized = cv2.resize(frame, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    x, y = (nw - SIZE[0]) // 2, (nh - SIZE[1]) // 2
    return resized[y:y + SIZE[1], x:x + SIZE[0]].copy()


def camera(frame, progress, variant):
    # Constant scale within a shot; only a restrained, eased, single-direction drift.
    scale = (1.025, 1.08, 1.16, 1.11)[variant % 4]
    crop_w = int(SIZE[0] / scale) // 2 * 2
    crop_h = int(SIZE[1] / scale) // 2 * 2
    margin_x = (SIZE[0] - crop_w) / 2
    margin_y = (SIZE[1] - crop_h) / 2
    directions = [(-0.55, 0.55, 0.0, 0.0), (0.45, -0.45, 0.0, 0.0), (0.0, 0.0, 0.40, -0.40), (-0.32, 0.32, 0.22, -0.22)]
    sx, ex, sy, ey = directions[variant % len(directions)]
    p = smooth(progress)
    cx = SIZE[0] / 2 + margin_x * (sx + (ex - sx) * p)
    cy = SIZE[1] / 2 + margin_y * (sy + (ey - sy) * p)
    crop = cv2.getRectSubPix(frame, (crop_w, crop_h), (cx, cy))
    return cv2.resize(crop, SIZE, interpolation=cv2.INTER_LINEAR)


def indicator_components(frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    cand = ((hsv[:, :, 1] > 95) & (hsv[:, :, 2] > 165)).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(cand, 8)
    out = []
    for i in range(1, count):
        x, y, w, h, area = stats[i]
        if 2 <= area <= 90 and w <= 18 and h <= 18:
            ys, xs = np.where(labels == i)
            out.append((ys, xs, i * 0.37))
    return out


def ambient(frame, source, seconds, scene, components):
    # Only detected bright pixels in machine-heavy scenes blink; geometry is untouched.
    if scene in {"04b", "05", "07", "08"}:
        for ys, xs, phase in components[::7]:
            wave = math.sin(seconds * math.tau * 0.22 + phase)
            if wave > 0.68:
                frame[ys, xs] = np.clip(source[ys, xs].astype(np.float32) * 1.20, 0, 255).astype(np.uint8)
            elif wave < -0.78:
                frame[ys, xs] = np.clip(source[ys, xs].astype(np.float32) * 0.72, 0, 255).astype(np.uint8)
    # Very faint lighting breath prevents dead stillness without changing the art.
    if scene in {"01", "02", "03", "04", "06", "08", "10", "12"}:
        gain = 1.0 + 0.004 * math.sin(seconds * math.tau * 0.13)
        frame[:] = np.clip(frame.astype(np.float32) * gain, 0, 255).astype(np.uint8)


def build(scene, stem, names, duration):
    output = ROOT / f"ep04-scene-{scene}-{stem}-narration-sync-locked.mp4"
    if output.exists() and output.stat().st_size > 1_000_000:
        print(f"SKIP {scene} existing {output.name}", flush=True)
        return
    sources = []
    for name in names:
        image = cv2.imread(str(ROOT / name), cv2.IMREAD_COLOR)
        if image is None:
            raise RuntimeError(f"Missing source: {name}")
        sources.append(cover(image))
    components = [indicator_components(x) for x in sources]
    # Purposeful 6–11 second coverage, progressing through the story states.
    shot_count = max(len(sources), math.ceil(duration / 9.0))
    bounds = np.linspace(0, duration, shot_count + 1)
    intermediate = ROOT / f"ep04-scene-{scene}-{stem}-narration-sync-locked-intermediate.mp4"
    writer = cv2.VideoWriter(str(intermediate), cv2.VideoWriter_fourcc(*"mp4v"), FPS, SIZE)
    if not writer.isOpened():
        raise RuntimeError(f"Could not create {intermediate.name}")
    frame_count = int(round(duration * FPS))
    for index in range(frame_count):
        seconds = index / FPS
        shot_index = min(shot_count - 1, np.searchsorted(bounds, seconds, side="right") - 1)
        start, end = bounds[shot_index], bounds[shot_index + 1]
        progress = (seconds - start) / max(0.001, end - start)
        # Story states advance monotonically; the final state gets the final third.
        source_index = min(len(sources) - 1, int(shot_index * len(sources) / shot_count))
        if shot_index >= shot_count - max(1, shot_count // 3):
            source_index = len(sources) - 1
        base = sources[source_index]
        frame = base.copy()
        ambient(frame, base, seconds, scene, components[source_index])
        frame = camera(frame, progress, shot_index)
        writer.write(frame)
    writer.release()
    subprocess.run([
        str(AVCONVERT), "-s", str(intermediate), "-p", "Preset1920x1080",
        "-o", str(output), "--replace"
    ], check=True)
    print(f"DONE {scene} {duration:.2f}s {output.name}", flush=True)


def main():
    timing = json.loads((ROOT / "ep04-narration-scene-timings.json").read_text())
    durations = {item["scene"]: item["duration"] for item in timing["scenes"]}
    for scene, (stem, names) in SCENES.items():
        build(scene, stem, names, durations[scene])


if __name__ == "__main__":
    main()
