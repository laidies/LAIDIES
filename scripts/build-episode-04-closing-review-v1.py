#!/usr/bin/env python3
"""Build the exact-audio Episode 04 p50-p51 closing review sequence.

The v9 assembly asks one lights-up clip and one cocktail card to carry more
than two minutes of distinct narration.  This review sequence uses the exact
narration clock and existing comic-generation art to give each meaning-bearing
beat its own visible evidence.  It is local review material only.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())
MASTER = ROOT / "assets/video/episode-04-full-v9-reference-reconciled-review.mp4"
OUT = ROOT / "operations/video-qa/episode-04-v10-repair-production-packet-2026-08-01/review-sequences"
OUTPUT = OUT / "p50-p51-closing-review-v1.mp4"
CONTACT = OUT / "p50-p51-closing-review-v1-contact-sheet.jpg"
TIMELINE_CONTACT = OUT / "p50-p51-closing-review-v1-timeline-contact-sheet.jpg"
BUILD_RECEIPT = OUT / "p50-p51-closing-review-v1-build.json"

# p49 already ends on this exact 30 fps boundary.  p52 begins at 1128.000,
# producing a deterministic 3,730-frame / 124.333333-second review window.
START = 1003.666667
END = 1128.000000
FPS = 30

SEGMENTS = [
    {
        "start": START,
        "end": 1011.540,
        "source": "assets/episodes/ep-04/pixel/ep04-emph-check-the-machine-comic-v3-complete-exact-text-1920.png",
        "source_type": "still",
        "visible_description": "Comic emphasis card reading ‘These are the women who check the whole machine.’",
        "narration": "Last week you learned to check the machine. These are the women who check the whole machine.",
        "editorial_purpose": "Land the exact comparison before the LUMINAiRY reveal begins.",
    },
    {
        "start": 1011.540,
        "end": 1019.060,
        "source": "assets/episodes/ep-04/pixel/ep04-splash-lights-up-portraits-ignite-comic-event-v1.mp4",
        "source_type": "full_motion_retime",
        "source_frames": 2370,
        "visible_description": "The dark MAiVENS portrait hall illuminates progressively around the heroine.",
        "narration": "And then the lights come up, and it’s just me, in the back of the LUMINAiRY, holding all of it.",
        "editorial_purpose": "Compress the admitted lights-up arc into the line that explicitly says the lights come up instead of stretching it across unrelated narration.",
    },
    {
        "start": 1019.060,
        "end": 1036.100,
        "source": "assets/episodes/ep-04/pixel/ep04-beat-17m01.84-comic-v1-1920.png",
        "source_type": "still",
        "visible_description": "The heroine stands in the dark MAiVENS hall with a glowing chatbot open on her laptop, surrounded by portraits of women.",
        "narration": "Almost two hundred years. A room full of women who fought to be believed, one confident chatbot, and what has been sitting in your browser tab.",
        "editorial_purpose": "Put the lineage, heroine and browser/chatbot evidence in one narration-specific composition.",
    },
    {
        "start": 1036.100,
        "end": 1040.560,
        "source": "assets/episodes/ep-04/pixel/ep04-emph-not-magic-comic-v1-exact-mixed-case-1920.png",
        "source_type": "still",
        "visible_description": "Comic emphasis card reading ‘Not magic. Not born last Tuesday!’",
        "narration": "Not magic. Not born last Tuesday.",
        "editorial_purpose": "Give the punch line its exact, short visual beat.",
    },
    {
        "start": 1040.560,
        "end": 1055.920,
        "source": "assets/episodes/ep-04/pixel/ep04-emph-agentic-edge-comic-v1-exact-text-1920.png",
        "source_type": "still",
        "visible_description": "Comic map card identifying agentic AI as the edge of the map.",
        "narration": "The newest chapter is agentic AI: it does not just answer; it goes and does the thing. That is the edge of the map right now.",
        "editorial_purpose": "Change the visual exactly when the narration moves from historical lineage to the current frontier.",
    },
    {
        "start": 1055.920,
        "end": 1061.293,
        "source": "assets/episodes/ep-04/pixel/ep04-cocktail-in-use-comic-v1-1920.png",
        "source_type": "still",
        "visible_description": "Three women talk over drinks in a lived-in happy-hour setting.",
        "narration": "So—the cocktail-party version, for when someone at happy hour asks whether AI is brand new.",
        "editorial_purpose": "Establish the real-life social use case before showing the concise answer.",
    },
    {
        "start": 1061.293,
        "end": 1070.660,
        "source": "assets/episodes/ep-04/pixel/ep04-cocktail-comic-v1-exact-mixed-case-1920.png",
        "source_type": "still",
        "visible_description": "Comic cocktail card reading ‘Almost 200 years old and about three years old at the same time.’",
        "narration": "It is almost two hundred years old and about three years old at the same time.",
        "editorial_purpose": "Reserve the exact-answer card for the exact answer rather than forcing it to carry the whole closing.",
    },
    {
        "start": 1070.660,
        "end": 1085.440,
        "source": "assets/episodes/ep-04/pixel/ep04-beat-17m41.45-comic-v1-1920.png",
        "source_type": "still",
        "visible_description": "Women discuss AI together at a cocktail table, connecting its long scientific lineage to present-day access.",
        "narration": "The science has been building for centuries; your access is new. Every real leap—the idea, signal, language, finding and sight—has a woman’s name on it.",
        "editorial_purpose": "Return from the one-line answer to the women and shared conversation behind it.",
    },
    {
        "start": 1085.440,
        "end": 1104.460,
        "source": "assets/episodes/ep-04/pixel/ep04-sign-off-fieldtrip-comic-v1-1920.png",
        "source_type": "still",
        "visible_description": "The heroine climbs the illuminated LUMINAiRY steps with her backpack for the episode’s field trip.",
        "narration": "Whether or not the textbook wrote it down, that is the episode. This week is a field trip; everything you need lives at laidies.ai.",
        "editorial_purpose": "Make the no-Try-On field trip and LAiDIES destination visually literal without introducing a false task.",
    },
    {
        "start": 1104.460,
        "end": END,
        "source": "assets/episodes/ep-04/pixel/ep04-beat-18m25.45-comic-v1-1920.png",
        "source_type": "still",
        "visible_description": "The heroine enters a bright MAiVENS wing filled with many more women’s portraits.",
        "narration": "The written story has every name and date to check. Only a handful of MAiVENS fit in the episode; the wing is full, and the assignment is to meet another.",
        "editorial_purpose": "End p51 inside the full wing the narration names and hand the assignment cleanly into p52.",
    },
]

# Cumulative nearest-frame boundary allocation; exactly 3,730 frames.
SEGMENT_FRAMES = [236, 226, 511, 134, 461, 161, 281, 443, 571, 706]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def build() -> None:
    expected_master = "d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4"
    actual_master = sha256(MASTER)
    if actual_master != expected_master:
        raise RuntimeError(f"Parent master drift: {actual_master}")
    if sum(SEGMENT_FRAMES) != 3730:
        raise RuntimeError(f"Frame allocation drift: {sum(SEGMENT_FRAMES)}")

    OUT.mkdir(parents=True, exist_ok=True)
    command = [str(FFMPEG), "-y", "-i", str(MASTER)]
    filters: list[str] = []
    labels: list[str] = []

    for index, segment in enumerate(SEGMENTS, start=1):
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        frames = SEGMENT_FRAMES[index - 1]
        if segment["source_type"] == "still":
            command.extend(["-loop", "1", "-framerate", str(FPS), "-i", str(source)])
            timing = f"trim=end_frame={frames},setpts=N/({FPS}*TB)"
        else:
            command.extend(["-i", str(source)])
            source_frames = int(segment["source_frames"])
            speed_factor = frames / source_frames
            timing = (
                f"setpts={speed_factor:.12f}*PTS,fps={FPS},"
                f"trim=end_frame={frames},setpts=N/({FPS}*TB)"
            )
        label = f"v{index}"
        labels.append(label)
        filters.append(
            f"[{index}:v]scale=1920:1080:force_original_aspect_ratio=increase,"
            f"crop=1920:1080,{timing},format=yuv420p[{label}]"
        )

    target_frames = sum(SEGMENT_FRAMES)
    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"concat=n={len(labels)}:v=1:a=0,trim=end_frame={target_frames},"
        f"setpts=N/({FPS}*TB)[video]"
    )
    filters.append(
        f"[0:a]atrim=start={START:.6f}:end={END:.6f},asetpts=PTS-STARTPTS[audio]"
    )
    command.extend([
        "-filter_complex", ";".join(filters),
        "-map", "[video]", "-map", "[audio]",
        "-c:v", "libx264", "-r", str(FPS), "-fps_mode", "cfr",
        "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-ac", "1", "-ar", "48000",
        "-movflags", "+faststart", "-shortest", str(OUTPUT),
    ])
    run(command)

    midpoints = [((segment["start"] + segment["end"]) / 2) - START for segment in SEGMENTS]
    contact_command = [str(FFMPEG), "-y"]
    for timestamp in midpoints:
        contact_command.extend(["-ss", f"{timestamp:.3f}", "-i", str(OUTPUT)])
    contact_command.extend([
        "-filter_complex",
        ";".join(
            [f"[{index}:v]scale=384:216[v{index}]" for index in range(10)]
            + [
                "[v0][v1][v2][v3][v4][v5][v6][v7][v8][v9]"
                "xstack=inputs=10:layout=0_0|384_0|768_0|1152_0|1536_0|"
                "0_216|384_216|768_216|1152_216|1536_216[out]"
            ]
        ),
        "-map", "[out]", "-frames:v", "1", "-update", "1", "-q:v", "2", str(CONTACT),
    ])
    run(contact_command)

    run([
        str(FFMPEG), "-y", "-i", str(OUTPUT),
        "-vf", "fps=1/8,scale=480:270,tile=4x4:padding=0:margin=0",
        "-frames:v", "1", "-update", "1", "-q:v", "2", str(TIMELINE_CONTACT),
    ])

    receipt = {
        "status": "LOCAL_REVIEW_SEQUENCE_ONLY_INDEPENDENT_REVIEW_REQUIRED",
        "authority": "NO_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "parent_master": str(MASTER.relative_to(ROOT)),
        "parent_master_sha256": actual_master,
        "audio_seconds": [START, END],
        "duration_seconds": round(target_frames / FPS, 6),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "contact_sheet": str(CONTACT.relative_to(ROOT)),
        "contact_sheet_sha256": sha256(CONTACT),
        "timeline_contact_sheet": str(TIMELINE_CONTACT.relative_to(ROOT)),
        "timeline_contact_sheet_sha256": sha256(TIMELINE_CONTACT),
        "segments": [
            {
                **segment,
                "narration_window_duration": round(segment["end"] - segment["start"], 6),
                "render_frames": SEGMENT_FRAMES[index],
                "render_duration": round(SEGMENT_FRAMES[index] / FPS, 6),
                "source_sha256": sha256(ROOT / segment["source"]),
                "motion_claim": (
                    "ADMITTED_SOURCE_MOTION_FULL_ARC_RETIMED_TO_EXACT_LIGHTS_UP_LINE"
                    if segment["source_type"] == "full_motion_retime"
                    else "DELIBERATE_STILL_HARD_CUT_NO_FALSE_ANIMATION_CLAIM"
                ),
            }
            for index, segment in enumerate(SEGMENTS)
        ],
        "editorial_boundary": "The former 124-second two-source hold is replaced by ten narration-matched beats; the existing lights-up arc is used only while the lights-up line is spoken.",
        "required_gate": [
            "independent exact-audio narration-picture review at normal speed",
            "independent likeness, text-artifact and canon review",
            "independent judgment that the retimed lights-up motion remains natural",
            "independent p49-to-p50 and p51-to-p52 transition review",
            "responsive-player crop and full-audible-watch review after assembly",
        ],
    }
    BUILD_RECEIPT.write_text(json.dumps(receipt, indent=2) + "\n")


if __name__ == "__main__":
    build()
