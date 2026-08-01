#!/usr/bin/env python3
"""Build Episode 03 p00: the narration-timed opening recap progression."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_builder", ROOT / "scripts/build-episode-03-perm-timeline-review-v1.py")
builder = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(builder)
builder.START = 0.0
builder.END = 18.7
builder.OUTPUT = builder.OUT / "p00-opening-recap-review-v1.mp4"
builder.CONTACT = builder.OUT / "p00-opening-recap-review-v1-contact-sheet.jpg"
builder.RECEIPT = builder.OUT / "p00-opening-recap-review-v1-build.json"
builder.OCCURRENCES = "p00"
builder.COMMENT = "LOCAL EPISODE 03 P00 OPENING-RECAP REVIEW SEQUENCE — NO RELEASE AUTHORITY"
builder.EDITORIAL_DECISION = "Replace the 18.7-second full-strip hold with an establishing frame and three narration-specific moves through the existing approved recap panels: delegation, a proper brief, and a sendable result."
source = "assets/episodes/ep-03/comic/ep03-open-01-previously-strip-comic.png"
builder.SEGMENTS = [
    {"start": 0.0, "end": 2.4, "source": source, "visible_description": "The complete Previously on LAiDIES strip establishes that this is a recap rather than a new scene.", "narration": "Previously on LAiDIES..."},
    {"start": 2.4, "end": 7.52, "source": source, "crop": "960:540:0:190", "visible_description": "The left office panel isolates a woman delegating work at her computer.", "narration": "We learned that talking to AI isn't coding—it's delegation."},
    {"start": 7.52, "end": 13.882, "source": source, "crop": "960:540:480:190", "visible_description": "The centre panel shows her replacing a vague ask with a structured brief and visible plan.", "narration": "Paige stopped typing three vague words and started briefing it like a human."},
    {"start": 13.882, "end": 18.7, "source": source, "crop": "960:540:960:190", "visible_description": "The right panel shows her reviewing the finished work she would actually send.", "narration": "She treated it like a smart new hire, got David Rose specific, and ended up with something she'd actually send."},
]
builder.build()
