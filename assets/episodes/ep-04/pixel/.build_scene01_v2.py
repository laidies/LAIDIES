from pathlib import Path
import math
import subprocess

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent
START = ROOT / "ep04-scene-01-cold-open-v3-face-review.png"
THOUGHT = ROOT / "ep04-scene-01-cold-open-v3-thoughtful-review.png"
END = ROOT / "ep04-scene-01-cold-open-v3-realization-review.png"
INTERMEDIATE = ROOT / "ep04-scene-01-cold-open-v3-narration-sync-v8-story-clean-intermediate.mp4"
OUTPUT = ROOT / "ep04-scene-01-cold-open-v3-narration-sync-v8-story-clean.mp4"
FPS = 30
DURATION = 57.68
SIZE = (1920, 1080)
SCREEN_MASK = np.zeros((1080, 1920), np.float32)
cv2.fillConvexPoly(SCREEN_MASK, np.array([[310, 150], [720, 200], [735, 675], [315, 655]], np.int32), 1.0)
SCREEN_MASK = cv2.GaussianBlur(SCREEN_MASK, (0, 0), 70)[:, :, None]
SCREEN_BOX = (220, 70, 820, 740)


def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))


def smooth(v):
    v = clamp(v)
    return v * v * (3 - 2 * v)


def crop(frame, progress, a, b, scale):
    cw = int(SIZE[0] / scale) // 2 * 2
    ch = int(SIZE[1] / scale) // 2 * 2
    p = smooth(progress)
    cx = a[0] + (b[0] - a[0]) * p
    cy = a[1] + (b[1] - a[1]) * p
    cx = max(cw / 2, min(SIZE[0] - cw / 2, cx))
    cy = max(ch / 2, min(SIZE[1] - ch / 2, cy))
    roi = cv2.getRectSubPix(frame, (cw, ch), (cx, cy))
    return cv2.resize(roi, SIZE, interpolation=cv2.INTER_LINEAR)


def screen_breath(frame, seconds, strength=1.0):
    pulse = strength * (0.012 + 0.007 * math.sin(seconds * math.tau * 0.16))
    x0, y0, x1, y1 = SCREEN_BOX
    base = frame[y0:y1, x0:x1].astype(np.float32)
    cyan = base.copy()
    cyan[:, :, 0] *= 1 + pulse * 1.25
    cyan[:, :, 1] *= 1 + pulse
    mask = SCREEN_MASK[y0:y1, x0:x1]
    frame[y0:y1, x0:x1] = np.clip(base * (1 - mask) + cyan * mask, 0, 255).astype(np.uint8)


def cursor(frame, seconds):
    # Existing reply-box cursor only; no synthetic text or altered UI.
    if int(seconds * 1.35) % 2 == 0:
        return
    cv2.rectangle(frame, (514, 618), (525, 650), (35, 112, 124), -1)


RAIN_REGIONS = [(735, 0, 840, 575), (1475, 0, 1905, 255)]


def rain(frame, seconds):
    # Readable long rain streaks, but clipped to exposed glass only. These two
    # regions do not intersect the Heroine, monitor, desk, plant, or room.
    for region_index, (x0, y0, x1, y1) in enumerate(RAIN_REGIONS):
        roi = frame[y0:y1, x0:x1]
        overlay = np.zeros_like(roi)
        height, width = roi.shape[:2]
        for i in range(18 if region_index == 0 else 24):
            x = (i * 73 + region_index * 31) % width
            y = (i * 109 + int(seconds * 82) + region_index * 47) % (height + 65) - 65
            cv2.line(overlay, (x, y), (max(0, x - 8), min(height - 1, y + 48)), (125, 110, 72), 2, cv2.LINE_AA)
        frame[y0:y1, x0:x1] = cv2.addWeighted(roi, 1.0, overlay, 0.72, 0)


SHOTS = [
    # start, end, state, start center, end center, fixed scale
    (0.00, 8.00, 0, (950, 540), (985, 540), 1.025),
    (8.00, 16.00, 0, (520, 420), (550, 420), 1.42),
    (16.00, 24.00, 0, (610, 500), (645, 500), 1.32),
    (24.00, 33.00, 1, (950, 540), (985, 540), 1.025),
    (33.00, 41.00, 1, (1170, 395), (1200, 395), 1.38),
    (41.00, 49.00, 2, (950, 540), (985, 540), 1.025),
    (49.00, 57.68, 2, (1080, 430), (1115, 430), 1.24),
]


def main():
    frames = [cv2.imread(str(START)), cv2.imread(str(THOUGHT)), cv2.imread(str(END))]
    if any(f is None or f.shape[:2] != (1080, 1920) for f in frames):
        raise RuntimeError("Scene 01 sources missing or wrong size")
    writer = cv2.VideoWriter(str(INTERMEDIATE), cv2.VideoWriter_fourcc(*"mp4v"), FPS, SIZE)
    if not writer.isOpened():
        raise RuntimeError("Could not create intermediate")
    for index in range(round(DURATION * FPS)):
        t = index / FPS
        shot = next(s for s in SHOTS if t < s[1])
        start, end, state, a, b, scale = shot
        frame = frames[state].copy()
        # Keep the painted rain static. Synthetic streaks do not survive the
        # foreground/window overlap cleanly in this composition.
        screen_breath(frame, t, 1.0 if state else .65)
        # Do not draw a synthetic cursor. The final story-state artwork already
        # contains a correctly positioned white cursor inside the monitor UI.
        frame = crop(frame, (t - start) / (end - start), a, b, scale)
        writer.write(frame)
    writer.release()
    subprocess.run(["/usr/bin/avconvert", "-s", str(INTERMEDIATE), "-p", "Preset1920x1080", "-o", str(OUTPUT), "--replace"], check=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
