from pathlib import Path
import math

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parent
MACHINE_SOURCE = ROOT / "ep04-scene-05-grace-motion-v6.mp4"
MACHINE_STILL = ROOT / "ep04-scene-05-grace-a-start.png"
MACHINE_WRITING = ROOT / "ep04-scene-05-grace-writing-v2.png"
MACHINE_LOOK = ROOT / "ep04-scene-05-grace-machine-look-v1.png"
NAVY_HANDOFF = ROOT / "ep04-scene-05a-grace-navy-office-v3-application-handoff.png"
NAVY_REVIEW = ROOT / "ep04-scene-05a-grace-navy-office-v3-application-review.png"
NAVY_POSES = [
    ROOT / "ep04-scene-05a-grace-navy-office-v2-a-start.png",
    ROOT / "ep04-scene-05a-grace-navy-office-v2-b-mid-1.png",
    ROOT / "ep04-scene-05a-grace-navy-office-v2-b-mid-2.png",
    ROOT / "ep04-scene-05a-grace-navy-office-v2-c-end.png",
]
OUTPUT = ROOT / "ep04-scene-05-grace-narration-sync-v10-intermediate.mp4"

FPS = 30
FRAME_COUNT = 2612
SIZE = (1920, 1080)
NAVY_START = 0.0
NAVY_END = 12.23
MOTH_START = 74.45
MOTH_END = 86.45


def clamp(value, low=0.0, high=1.0):
    return max(low, min(high, value))


def smooth(value):
    value = clamp(value)
    return value * value * (3.0 - 2.0 * value)


def move(start, end, progress):
    return start + (end - start) * smooth(progress)


def shot(seconds, start, end, start_view, end_view):
    progress = (seconds - start) / max(0.001, end - start)
    return tuple(move(a, b, progress) for a, b in zip(start_view, end_view))


def camera_at(seconds):
    # Locked camera within every shot. Coverage changes happen only as clean cuts.
    shots = [
        (0.00, 4.00, (960, 540, 1.00)),
        (4.00, 7.00, (1160, 455, 1.33)),
        (7.00, 9.00, (900, 690, 1.45)),
        (9.00, 12.23, (520, 430, 1.42)),
        (12.23, 16.73, (960, 540, 1.01)),
        (16.73, 20.53, (520, 395, 1.38)),
        (20.53, 24.73, (1050, 750, 1.50)),
        (24.73, 30.50, (1160, 465, 1.26)),
        (30.50, 40.50, (1050, 770, 1.50)),
        (40.50, 49.50, (520, 395, 1.37)),
        (49.50, 56.50, (735, 355, 1.32)),
        (56.50, 64.40, (1160, 435, 1.39)),
        (64.40, 69.50, (960, 540, 1.00)),
        (69.50, 74.45, (1040, 755, 1.43)),
        (74.45, 78.20, (960, 540, 1.00)),
        (78.20, 82.60, (1030, 700, 1.18)),
        (82.60, 87.07, (1040, 750, 1.34)),
    ]
    for start, end, view in shots:
        if seconds < end:
            return view
    return shots[-1][2]


def apply_camera(frame, center_x, center_y, scale):
    width = int(round(SIZE[0] / scale))
    height = int(round(SIZE[1] / scale))
    width -= width % 2
    height -= height % 2
    half_width, half_height = width / 2.0, height / 2.0
    center_x = clamp(center_x, half_width, SIZE[0] - half_width)
    center_y = clamp(center_y, half_height, SIZE[1] - half_height)
    crop = cv2.getRectSubPix(frame, (width, height), (center_x, center_y))
    return cv2.resize(crop, SIZE, interpolation=cv2.INTER_LINEAR)


def navy_frame(seconds, poses):
    # A visible four-pose videogame animation: down once, hold, then return.
    sequences = [
        (2.40, 3.20, [0, 1, 2, 3]),
        (6.00, 6.80, [3, 2, 1, 0]),
    ]
    for start, end, order in sequences:
        if start <= seconds < end:
            progress = (seconds - start) / (end - start)
            index = min(len(order) - 1, int(progress * len(order)))
            return poses[order[index]].copy()
    if 3.20 <= seconds < 6.00:
        return poses[-1].copy()
    return poses[0].copy()


def make_page_line(text, destination, y, color):
    plane_height, plane_width = 220, 420
    alpha = np.zeros((plane_height, plane_width), np.uint8)
    cv2.putText(
        alpha,
        text,
        (20, y),
        cv2.FONT_HERSHEY_PLAIN,
        1.45,
        255,
        2,
        cv2.LINE_8,
    )
    source = np.float32(
        [(0, 0), (plane_width - 1, 0), (plane_width - 1, plane_height - 1), (0, plane_height - 1)]
    )
    matrix = cv2.getPerspectiveTransform(source, np.float32(destination))
    warped = cv2.warpPerspective(alpha, matrix, SIZE, flags=cv2.INTER_LINEAR)
    ys, xs = np.where(warped > 1)
    x0, x1 = max(0, xs.min() - 3), min(SIZE[0], xs.max() + 4)
    y0, y1 = max(0, ys.min() - 3), min(SIZE[1], ys.max() + 4)
    local_alpha = warped[y0:y1, x0:x1].astype(np.float32) / 255.0
    patch = np.empty((y1 - y0, x1 - x0, 3), np.float32)
    patch[:] = color
    return x0, y0, patch, local_alpha


def make_page_overlays():
    left = [(825, 820), (1105, 812), (1100, 962), (790, 930)]
    right = [(1135, 815), (1410, 835), (1470, 950), (1120, 945)]
    ink = (27.0, 43.0, 66.0)
    definitions = [
        (31.30, "FLOW-MATIC", left, 48),
        (33.80, "INPUT SALES DATA", left, 88),
        (36.30, "COMPARE PRICE", left, 128),
        (38.30, "OUTPUT TOTAL", left, 168),
        (41.00, "101101 001011", right, 50),
        (43.00, "001110 110100", right, 92),
        (45.00, "110001 010011", right, 134),
    ]
    return [(start, *make_page_line(text, destination, y, ink)) for start, text, destination, y in definitions]


def add_page_translation(frame, seconds, overlays):
    fade_out = 1.0 - smooth((seconds - 69.5) / 2.0)
    if fade_out <= 0.0:
        return
    for start, x0, y0, patch, alpha in overlays:
        reveal = smooth((seconds - start) / 0.7) * fade_out
        if reveal <= 0.0:
            continue
        y1, x1 = y0 + patch.shape[0], x0 + patch.shape[1]
        a = alpha[:, :, None] * reveal
        background = frame[y0:y1, x0:x1].astype(np.float32)
        frame[y0:y1, x0:x1] = np.clip(background * (1.0 - a) + patch * a, 0, 255).astype(np.uint8)


def make_indicator_mask(frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = ((hsv[:, :, 1] > 75) & (hsv[:, :, 2] > 115)).astype(np.float32)
    mask[:, 1050:] = 0.0
    return cv2.GaussianBlur(mask, (0, 0), 1.0)


def add_compiler_sweep(frame, seconds, indicator_mask):
    if seconds < 40.5 or seconds > 56.5:
        return
    progress = smooth((seconds - 40.5) / 16.0)
    center = 110.0 + 900.0 * progress
    x = np.arange(SIZE[0], dtype=np.float32)[None, :]
    band = np.exp(-((x - center) / 115.0) ** 2) * indicator_mask
    frame[:] = np.clip(frame.astype(np.float32) * (1.0 + band[:, :, None] * 0.45), 0, 255).astype(np.uint8)


def add_lamp_breath(frame, seconds, navy=False):
    pulse = 0.012 * math.sin(seconds * math.tau * 0.19)
    pulse += 0.006 * math.sin(seconds * math.tau * 0.37 + 1.1)
    mask = np.zeros(frame.shape[:2], np.float32)
    if navy:
        cv2.ellipse(mask, (1660, 670), (245, 180), -18, 0, 360, 1.0, -1)
    else:
        cv2.ellipse(mask, (1575, 625), (210, 135), -18, 0, 360, 1.0, -1)
    mask = cv2.GaussianBlur(mask, (0, 0), 45.0)[:, :, None]
    warm = frame.astype(np.float32)
    warm[:, :, 2] *= 1.0 + pulse
    warm[:, :, 1] *= 1.0 + pulse * 0.55
    frame[:] = np.clip(frame.astype(np.float32) * (1.0 - mask) + warm * mask, 0, 255).astype(np.uint8)


def find_indicator_components(frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    candidate = ((hsv[:, :, 1] > 70) & (hsv[:, :, 2] > 145)).astype(np.uint8)
    # Exact cabinet rectangles only: exclude Grace, book, lamp, cables and ceiling.
    region = np.zeros_like(candidate)
    region[20:720, 0:250] = 1
    region[25:720, 270:545] = 1
    region[150:720, 810:1075] = 1
    region[790:1080, 0:420] = 1
    candidate *= region
    count, labels, stats, centroids = cv2.connectedComponentsWithStats(candidate, 8)
    components = []
    for index in range(1, count):
        x, y, width, height, area = stats[index]
        if not (2 <= area <= 150 and width <= 24 and height <= 24):
            continue
        ys, xs = np.where(labels == index)
        components.append((ys, xs, 0.18 + (index % 9) * 0.035, (index % 13) * 0.47))
    return components


def add_panel_blinks(frame, seconds, source, components):
    # A restrained subset of real bulbs blinks; every other pixel stays fixed.
    for ys, xs, frequency, phase in components[::6]:
        wave = 0.5 + 0.5 * math.sin(seconds * math.tau * frequency + phase)
        pulse = 1.18 if wave > 0.72 else 0.30
        frame[ys, xs] = np.clip(source[ys, xs].astype(np.float32) * pulse, 0, 255).astype(np.uint8)


def animate_grace_reading(frame, seconds):
    # Her left hand traces the page twice while the compiler text appears.
    intervals = [(14.0, 22.5, 38.0), (29.0, 40.0, 52.0), (65.0, 72.5, 30.0)]
    amount = 0.0
    distance = 0.0
    for start, end, pixels in intervals:
        if start <= seconds < end:
            phase = smooth((seconds - start) / (end - start))
            amount = math.sin(phase * math.pi)
            distance = pixels
            break
    if amount <= 0.001:
        return
    x0, y0, x1, y1 = 900, 675, 1195, 930
    roi = frame[y0:y1, x0:x1]
    height, width = roi.shape[:2]
    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    weight = np.exp(-(((xx - 125.0) / 82.0) ** 2 + ((yy - 112.0) / 72.0) ** 2) / 2.0)
    map_x = xx - distance * amount * weight
    map_y = yy + 3.0 * math.sin(amount * math.pi) * weight
    frame[y0:y1, x0:x1] = cv2.remap(
        roi,
        map_x,
        map_y,
        interpolation=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_REFLECT,
    )
    # A visible fountain pen makes the action read as writing, not hand drift.
    shift = int(round(distance * amount * 0.72))
    hand = (1035 + shift, 790)
    tip = (1090 + shift, 838)
    cv2.line(frame, hand, tip, (28, 38, 50), 5, cv2.LINE_AA)
    cv2.circle(frame, tip, 3, (40, 58, 72), -1, cv2.LINE_AA)


def add_reel_hub_motion(frame, seconds):
    # Only a small hub marker rotates; the tape circles themselves never deform.
    centers = [(650, 260), (790, 270), (650, 455), (805, 470)]
    angle = seconds * math.tau * 0.055
    for index, (cx, cy) in enumerate(centers):
        local = angle + index * 0.65
        x1 = int(round(cx + math.cos(local) * 8))
        y1 = int(round(cy + math.sin(local) * 8))
        x2 = int(round(cx + math.cos(local) * 18))
        y2 = int(round(cy + math.sin(local) * 18))
        cv2.line(frame, (x1, y1), (x2, y2), (122, 128, 116), 3, cv2.LINE_AA)


def flashback_cut(frame, seconds):
    # A very short dip, not a long dissolve, keeps the return from the 1940s
    # flashback intentional without turning the faces into a morph.
    distance = abs(seconds - NAVY_END)
    if distance >= 0.10:
        return
    brightness = smooth(distance / 0.10)
    frame[:] = np.clip(frame.astype(np.float32) * brightness, 0, 255).astype(np.uint8)


def read_ambient_frames(capture):
    frames = []
    capture.set(cv2.CAP_PROP_POS_FRAMES, 0)
    for index in range(28):
        ok, frame = capture.read()
        if not ok:
            raise RuntimeError(f"Could not read ambient machine frame {index}")
        frames.append(frame)
    return frames


def ambient_frame(frames, output_index):
    period = len(frames) * 2 - 2
    index = output_index % period
    if index >= len(frames):
        index = period - index
    return frames[index].copy()


def main():
    handoff = cv2.imread(str(NAVY_HANDOFF), cv2.IMREAD_COLOR)
    review = cv2.imread(str(NAVY_REVIEW), cv2.IMREAD_COLOR)
    rejection = cv2.imread(str(NAVY_POSES[0]), cv2.IMREAD_COLOR)
    machine = cv2.imread(str(MACHINE_STILL), cv2.IMREAD_COLOR)
    writing = cv2.imread(str(MACHINE_WRITING), cv2.IMREAD_COLOR)
    looking = cv2.imread(str(MACHINE_LOOK), cv2.IMREAD_COLOR)
    stills = [handoff, review, rejection, machine, writing, looking]
    if any(frame is None or frame.shape[:2] != (1080, 1920) for frame in stills):
        raise RuntimeError("One or more Grace story frames are missing or not 1920x1080")
    components = {
        "machine": find_indicator_components(machine),
        "writing": find_indicator_components(writing),
        "looking": find_indicator_components(looking),
    }
    if any(len(value) < 12 for value in components.values()):
        raise RuntimeError("Could not detect enough existing computer indicator bulbs")

    source = cv2.VideoCapture(str(MACHINE_SOURCE))
    if not source.isOpened():
        raise RuntimeError("Could not open Grace machine-room source")
    writer = cv2.VideoWriter(str(OUTPUT), cv2.VideoWriter_fourcc(*"mp4v"), FPS, SIZE)
    if not writer.isOpened():
        source.release()
        raise RuntimeError("Could not open narration-synced output")

    moth_started = False
    last_moth = None
    try:
        for output_index in range(FRAME_COUNT):
            seconds = output_index / FPS

            if seconds < 4.00:
                frame = handoff.copy()
                frame = apply_camera(frame, *shot(seconds, 0.00, 4.00, (930, 540, 1.035), (990, 540, 1.035)))
            elif seconds < 8.00:
                frame = review.copy()
                frame = apply_camera(frame, *shot(seconds, 4.00, 8.00, (990, 540, 1.035), (940, 540, 1.035)))
            elif seconds < 12.23:
                frame = rejection.copy()
                frame = apply_camera(frame, *shot(seconds, 8.00, 12.23, (940, 540, 1.035), (990, 540, 1.035)))
            elif seconds < 24.73:
                frame = machine.copy()
                add_panel_blinks(frame, seconds, machine, components["machine"])
                frame = apply_camera(frame, *shot(seconds, 12.23, 24.73, (930, 540, 1.035), (990, 540, 1.035)))
            elif seconds < 40.50:
                frame = writing.copy()
                add_panel_blinks(frame, seconds, writing, components["writing"])
                frame = apply_camera(frame, *shot(seconds, 24.73, 40.50, (930, 540, 1.045), (990, 540, 1.045)))
            elif seconds < 47.50:
                frame = writing.copy()
                frame = apply_camera(frame, *shot(seconds, 40.50, 47.50, (1040, 715, 1.42), (1100, 715, 1.42)))
            elif seconds < 54.50:
                frame = writing.copy()
                add_panel_blinks(frame, seconds, writing, components["writing"])
                frame = apply_camera(frame, *shot(seconds, 47.50, 54.50, (1100, 715, 1.42), (720, 405, 1.42)))
            elif seconds < 60.50:
                frame = writing.copy()
                add_panel_blinks(frame, seconds, writing, components["writing"])
                frame = apply_camera(frame, *shot(seconds, 54.50, 60.50, (720, 405, 1.42), (750, 405, 1.42)))
            elif seconds < MOTH_START:
                frame = looking.copy()
                add_panel_blinks(frame, seconds, looking, components["looking"])
                frame = apply_camera(frame, *shot(seconds, 60.50, MOTH_START, (990, 540, 1.04), (930, 540, 1.04)))
            elif MOTH_START <= seconds < MOTH_END:
                if not moth_started:
                    source.set(cv2.CAP_PROP_POS_FRAMES, 0)
                    moth_started = True
                ok, frame = source.read()
                if not ok:
                    frame = last_moth.copy()
                last_moth = frame.copy()
            elif seconds >= MOTH_END and last_moth is not None:
                frame = last_moth.copy()
            else:
                frame = machine.copy()
                add_panel_blinks(frame, seconds, machine, indicator_components)
            writer.write(frame)
    finally:
        writer.release()
        source.release()


if __name__ == "__main__":
    main()
