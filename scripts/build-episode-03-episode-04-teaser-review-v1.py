#!/usr/bin/env python3
"""Build Episode 03 p48: the narration-timed Episode 04 teaser progression."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_builder", ROOT / "scripts/build-episode-03-perm-timeline-review-v1.py")
builder = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(builder)
builder.START = 1023.5
builder.END = 1048.0
builder.OUTPUT = builder.OUT / "p48-episode-04-teaser-review-v1.mp4"
builder.CONTACT = builder.OUT / "p48-episode-04-teaser-review-v1-contact-sheet.jpg"
builder.RECEIPT = builder.OUT / "p48-episode-04-teaser-review-v1-build.json"
builder.OCCURRENCES = "p48"
builder.COMMENT = "LOCAL EPISODE 03 P48 EPISODE-04-TEASER REVIEW SEQUENCE — NO RELEASE AUTHORITY"
builder.EDITORIAL_DECISION = "Replace the 24.5-second single-card hold with five narration-specific beats: Episode 03 sign-off, Episode 04 announcement, the origin question, the women-built-it reveal, and the exact Episode 04 title landing. Every Episode 04 source is already bound into the current Episode 04 repair path."
builder.SEGMENTS = [
    {
        "start": 1023.5,
        "end": 1025.87,
        "source": "assets/episodes/ep-03/comic/ep03-signoff-comic.png",
        "visible_description": "The Episode 03 SUNNYVAiLE sign-off remains on screen for the final invitation back next Wednesday.",
        "narration": "See you next Wednesday... in SUNNYVAiLE.",
    },
    {
        "start": 1025.87,
        "end": 1031.257,
        "source": "assets/episodes/ep-04/pixel/ep04-open-03-title-comic-v1-exact-text-1920.png",
        "visible_description": "The exact Episode 04 title art opens the next-time preview rather than leaving the previous episode's teaser card to carry the whole announcement.",
        "narration": "Next time on LAiDIES: three weeks in, our heroine realizes she's been using this thing every day...",
    },
    {
        "start": 1031.257,
        "end": 1037.59,
        "source": "assets/episodes/ep-04/pixel/ep04-open-07-questions-comic-v1-exact-text-1920.png",
        "visible_description": "The current Episode 04 question frame makes the missing-origin questions visible as they are spoken.",
        "narration": "...and never once asked where it came from—or what it is.",
    },
    {
        "start": 1037.59,
        "end": 1043.35,
        "source": "assets/episodes/ep-04/pixel/ep04-scene-04b-eniac-comic-v2-timnit-style-lock-six-women-1920.png",
        "visible_description": "Six women at the ENIAC supply the concrete historical reveal that women were present in computing's origin story.",
        "narration": "She goes looking for the origin story... and finds out it was women all along.",
    },
    {
        "start": 1043.35,
        "end": 1048.0,
        "source": "assets/episodes/ep-04/pixel/ep04-title-master-anchor-v1-review.png",
        "visible_description": "The current Episode 04 master title anchor lands The Founding Mothers as the final promise.",
        "narration": "Come back next week for Episode Four: The Founding Mothers.",
    },
]
builder.build()
