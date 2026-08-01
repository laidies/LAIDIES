#!/usr/bin/env python3
"""Build exact-audio Episode 04 Hedy and ENIAC review sequences.

The v9 review master lets one Hedy desk composition and one ENIAC room loop
carry long stretches of narration whose meaning changes several times.  This
builder uses existing approved/held-for-review LAiDIES art only and gives each
meaning-bearing narration beat visible evidence.  It does not create a
successor master or confer editorial, likeness, historical, or release
approval.
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
FPS = 30


SEQUENCES = [
    {
        "slug": "p22-p23-hedy-review-v1",
        "start": 346.566667,
        "end": 437.300000,
        "frames": [272, 297, 479, 397, 112, 283, 470, 412],
        "segments": [
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04-hedy-c-end-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "Hedy Lamarr sits at a film-studio worktable while illuminated set pieces and crew remain visible behind her.",
                "narration": "You already know her face: the billed movie star and bombshell.",
                "editorial_purpose": "Open on both the public film-star identity and the private worktable rather than an anonymous time-jump card.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04-hedy-comic-v2-timnit-style-lock-1920.png",
                "source_type": "still",
                "visible_description": "Hedy draws a glowing signal path across a frequency diagram between film takes.",
                "narration": "Between takes she was inventing.",
                "editorial_purpose": "Make the narration's switch from public image to active invention immediately visible.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "Hedy studies the frequency-hopping diagram at the studio desk with a closed technical folder beside it.",
                "narration": "Being underestimated; the war; radio-controlled torpedoes whose easy-to-find signal could be jammed.",
                "editorial_purpose": "Hold a closer technical composition while the problem and her underestimated position are explained.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-cue22-local-motion-v1.mp4",
                "source_type": "full_motion_retime",
                "source_frames": 150,
                "motion_delta_floor": 0.1,
                "visible_description": "The encoded signal path moves across the frequency chart while the studio practicals remain restrained.",
                "narration": "The signal hops from frequency to frequency and the receiver follows in step.",
                "editorial_purpose": "Use the existing motion only for the process it actually depicts instead of treating it as generic Hedy coverage.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-emph-jam-comic-v1-exact-text-1920.png",
                "source_type": "still",
                "visible_description": "Comic emphasis card reading ‘You cannot jam a signal you cannot find.’",
                "narration": "You cannot jam a signal you cannot find.",
                "editorial_purpose": "Land the exact line in a short, legible beat.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04-hedy-b-mid-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "The technical folder sits closed beside Hedy and her frequency chart on the studio desk.",
                "narration": "Hedy and George Antheil presented the idea; the Navy called it too bulky and shelved it.",
                "editorial_purpose": "Return to the visibly shelved technical work after the exact quote, not as a consecutive duplicate.",
            },
            {
                "source": "assets/mavens/y2k-stained-glass-v3-finished/hedy-lamarr-y2k-stained-glass.png",
                "source_type": "still",
                "visible_description": "A memorial portrait surrounds Hedy with frequency-hopping diagrams, transmitter frequencies, film and wireless lineage symbols.",
                "narration": "Frequency hopping sits in the family tree of Wi-Fi, Bluetooth and the wireless world; recognition came late and without payment.",
                "editorial_purpose": "Shift from the shelved wartime idea to the long technical and cultural legacy the narration names.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04-hedy-c-end-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "Hedy remains alone at the film-set worktable while the star-marked studio continues behind her.",
                "narration": "The most beautiful woman in the world—and nobody heard a single word she said.",
                "editorial_purpose": "Return deliberately to the film-star frame for the final contrast between how she was seen and what was ignored.",
            },
        ],
        "required_gate": [
            "independent normal-speed narration-picture review",
            "independent Hedy likeness and historical-detail review",
            "independent exact-text artifact review",
            "independent judgment that the compressed signal motion remains natural",
            "independent p21/p22 and p23/p24 transition review",
        ],
    },
    {
        "slug": "p25-p27-eniac-review-v1",
        "start": 442.300000,
        "end": 545.566667,
        "frames": [452, 452, 278, 585, 128, 579, 277, 197, 150],
        "segments": [
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-a-start-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "A wide view shows six women working across the room-sized ENIAC cabinets.",
                "narration": "In 1945 the Army switches on the thirty-ton ENIAC in Philadelphia to calculate artillery tables.",
                "editorial_purpose": "Establish the machine's physical scale and the six women in the room from the start.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png",
                "source_type": "still",
                "visible_description": "A closer view shows women tracing and connecting ENIAC cables and switches by hand.",
                "narration": "A machine this new has no instructions; somebody must teach it physically, and the Army gives that work to six women.",
                "editorial_purpose": "Move from scale to hands-on programming as soon as the narration does.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-c-end-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "The six programmers work together at ENIAC while a record of the public credit gap appears within the composition.",
                "narration": "Jean, Betty, Kay, Marlyn, Ruth and Frances.",
                "editorial_purpose": "Give the spoken names a group frame before the detailed programming explanation begins.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-comic-v4-strong-face-shadows-six-women-1920.png",
                "source_type": "still",
                "visible_description": "Women physically rewire ENIAC cable by cable and switch by switch.",
                "narration": "With no manual or programming language, they program the machine by hand and work out how to make it follow a plan.",
                "editorial_purpose": "Return after the names to the exact physical action the longer technical explanation describes.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-emph-first-programmers-comic-v1-exact-text-1920.png",
                "source_type": "still",
                "visible_description": "Comic emphasis card reading ‘The First Programmers.’",
                "narration": "They are, quite literally, the first programmers.",
                "editorial_purpose": "Reserve the exact title card for the exact claim.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-cue26-credit-reveal-event-v1.mp4",
                "source_type": "full_motion_retime",
                "source_frames": 150,
                "next_cut_delta_floor": 2.5,
                "visible_description": "The public-credit composition reveals named men while the women who programmed ENIAC remain unnamed beside the machine.",
                "narration": "At the press showing the men in the photographs are named; the six women standing at the machine are not.",
                "editorial_purpose": "Use the existing credit-reveal event only across the credit-erasure narration it depicts, then match-cut into the fuller rediscovery evidence page.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-comicpage-eniac-models-comic-v1-exact-text-1920.png",
                "source_type": "still",
                "visible_description": "A comic evidence page contrasts the women programming ENIAC, the credited men, and the rediscovered six names under the line ‘It took forty years to learn who they were.’",
                "narration": "People assumed the women were models; it took about forty years to learn who they actually were.",
                "editorial_purpose": "Make both the false assumption and later rediscovery visible in one exact evidence page.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-a-start-comic-v1-locked-1920.png",
                "source_type": "still",
                "visible_description": "The room-sized ENIAC and its programmers fill the frame again before the historical jump.",
                "narration": "That reckoning comes later; for now machines are about to leap ahead and bring a new headache.",
                "editorial_purpose": "Return to the machine, after the rediscovery page, to motivate the next technical era rather than inventing a new historical claim.",
            },
            {
                "source": "assets/episodes/ep-04/pixel/ep04-timejump-04-philadelphia-1952-comic-event-v1.mp4",
                "source_type": "full_motion_retime",
                "source_frames": 45,
                "visible_description": "The exact comic time-jump announces ‘Philadelphia, 1952’ over the computer room.",
                "narration": "Nineteen fifty-two.",
                "editorial_purpose": "Place the truthful time-jump exactly on the spoken date and hand off into the next language sequence.",
            },
        ],
        "required_gate": [
            "independent normal-speed narration-picture review",
            "independent six-programmer likeness, names and historical-detail review",
            "independent exact-text artifact review",
            "independent judgment that credit-reveal and time-jump retimes remain natural",
            "independent p24/p25 and p27/p28 transition review",
        ],
    },
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def build_sequence(sequence: dict) -> None:
    target_frames = round((sequence["end"] - sequence["start"]) * FPS)
    if sum(sequence["frames"]) != target_frames:
        raise RuntimeError(f"{sequence['slug']} frame allocation drift")

    output = OUT / f"{sequence['slug']}.mp4"
    contact = OUT / f"{sequence['slug']}-contact-sheet.jpg"
    timeline = OUT / f"{sequence['slug']}-timeline-contact-sheet.jpg"
    receipt_path = OUT / f"{sequence['slug']}-build.json"
    command = [str(FFMPEG), "-y", "-i", str(MASTER)]
    filters: list[str] = []
    labels: list[str] = []

    for index, (segment, frames) in enumerate(zip(sequence["segments"], sequence["frames"]), start=1):
        source = ROOT / segment["source"]
        if not source.exists():
            raise FileNotFoundError(source)
        if segment["source_type"] == "still":
            command.extend(["-loop", "1", "-framerate", str(FPS), "-i", str(source)])
            timing = f"trim=end_frame={frames},setpts=N/({FPS}*TB)"
        else:
            command.extend(["-i", str(source)])
            factor = frames / int(segment["source_frames"])
            timing = (
                f"setpts={factor:.12f}*PTS,fps={FPS},"
                f"tpad=stop_mode=clone:stop_duration=1,"
                f"trim=end_frame={frames},setpts=N/({FPS}*TB)"
            )
        label = f"v{index}"
        labels.append(label)
        filters.append(
            f"[{index}:v]scale=1920:1080:force_original_aspect_ratio=increase,"
            f"crop=1920:1080,{timing},format=yuv420p[{label}]"
        )

    filters.append(
        "".join(f"[{label}]" for label in labels)
        + f"concat=n={len(labels)}:v=1:a=0,trim=end_frame={target_frames},setpts=N/({FPS}*TB)[video]"
    )
    filters.append(
        f"[0:a]atrim=start={sequence['start']:.6f}:end={sequence['end']:.6f},"
        f"asetpts=PTS-STARTPTS,aresample=48000,"
        f"apad=whole_len={target_frames * 1600},"
        f"atrim=end_sample={target_frames * 1600}[audio]"
    )
    command.extend([
        "-filter_complex", ";".join(filters), "-map", "[video]", "-map", "[audio]",
        "-c:v", "libx264", "-r", str(FPS), "-fps_mode", "cfr", "-preset", "medium",
        "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
        "-ac", "1", "-ar", "48000", "-frames:v", str(target_frames),
        "-movflags", "+faststart", str(output),
    ])
    run(command)

    running = 0
    midpoints = []
    for frames in sequence["frames"]:
        midpoints.append((running + frames / 2) / FPS)
        running += frames
    contact_command = [str(FFMPEG), "-y"]
    for timestamp in midpoints:
        contact_command.extend(["-ss", f"{timestamp:.3f}", "-i", str(output)])
    columns = min(5, len(midpoints))
    rows = (len(midpoints) + columns - 1) // columns
    cell_w, cell_h = 384, 216
    layout = "|".join(
        f"{(index % columns) * cell_w}_{(index // columns) * cell_h}"
        for index in range(len(midpoints))
    )
    contact_command.extend([
        "-filter_complex",
        ";".join(
            [f"[{index}:v]scale={cell_w}:{cell_h}[v{index}]" for index in range(len(midpoints))]
            + ["".join(f"[v{index}]" for index in range(len(midpoints))) + f"xstack=inputs={len(midpoints)}:layout={layout}[out]"]
        ),
        "-map", "[out]", "-frames:v", "1", "-update", "1", "-q:v", "2", str(contact),
    ])
    run(contact_command)
    run([
        str(FFMPEG), "-y", "-i", str(output),
        "-vf", "fps=1/8,scale=480:270,tile=4x4:padding=0:margin=0",
        "-frames:v", "1", "-update", "1", "-q:v", "2", str(timeline),
    ])

    receipt = {
        "status": "LOCAL_REVIEW_SEQUENCE_ONLY_INDEPENDENT_REVIEW_REQUIRED",
        "authority": "NO_EDITORIAL_ACCEPTANCE_SUCCESSOR_MASTER_OR_RELEASE_AUTHORITY",
        "parent_master": str(MASTER.relative_to(ROOT)),
        "parent_master_sha256": sha256(MASTER),
        "audio_seconds": [sequence["start"], sequence["end"]],
        "duration_seconds": round(target_frames / FPS, 6),
        "render_frames": target_frames,
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "contact_sheet": str(contact.relative_to(ROOT)),
        "contact_sheet_sha256": sha256(contact),
        "timeline_contact_sheet": str(timeline.relative_to(ROOT)),
        "timeline_contact_sheet_sha256": sha256(timeline),
        "segments": [
            {
                **segment,
                "render_frames": frames,
                "render_duration": round(frames / FPS, 6),
                "source_sha256": sha256(ROOT / segment["source"]),
                "motion_claim": (
                    "ADMITTED_SOURCE_MOTION_FULL_ARC_RETIMED_TO_NARRATED_EVENT"
                    if segment["source_type"] == "full_motion_retime"
                    else "DELIBERATE_STILL_HARD_CUT_NO_FALSE_ANIMATION_CLAIM"
                ),
            }
            for segment, frames in zip(sequence["segments"], sequence["frames"])
        ],
        "required_gate": sequence["required_gate"],
        "new_likeness_generation": "NONE_EXISTING_ASSETS_ONLY",
    }
    receipt_path.write_text(json.dumps(receipt, indent=2) + "\n")


def main() -> None:
    expected_master = "d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4"
    actual_master = sha256(MASTER)
    if actual_master != expected_master:
        raise RuntimeError(f"Parent master drift: {actual_master}")
    OUT.mkdir(parents=True, exist_ok=True)
    for sequence in SEQUENCES:
        build_sequence(sequence)


if __name__ == "__main__":
    main()
