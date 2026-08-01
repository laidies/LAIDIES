#!/usr/bin/env python3
"""Build Episode 03 p32: judgment versus asking the model 'are you sure?'"""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_builder", ROOT / "scripts/build-episode-03-perm-timeline-review-v1.py")
builder = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(builder)
builder.START = 582.4
builder.END = 606.0
builder.OUTPUT = builder.OUT / "p32-judgment-review-v1.mp4"
builder.CONTACT = builder.OUT / "p32-judgment-review-v1-contact-sheet.jpg"
builder.RECEIPT = builder.OUT / "p32-judgment-review-v1-build.json"
builder.OCCURRENCES = "p32"
builder.COMMENT = "LOCAL EPISODE 03 P32 JUDGMENT REVIEW SEQUENCE — NO RELEASE AUTHORITY"
builder.EDITORIAL_DECISION = "Replace the static p32 hold with four narration-specific beats: human judgment remains with the user, asking the model whether it is sure is not verification, the joke lands, and the actual verification checklist returns."
builder.SEGMENTS = [
    {"start": 582.4, "end": 591.0, "source": "assets/episodes/ep-03/comic/ep03-emph-judgment-stayed-yours-comic.png", "visible_description": "The judgment-stayed-yours card separates delegated grunt work from the human decision and responsibility.", "narration": "That is not extra work. The grunt work got done for you; the judgment stayed yours."},
    {"start": 591.0, "end": 597.7, "source": "assets/episodes/ep-03/comic/ep03-emph-are-you-sure-regina-burnbook-comic.png", "visible_description": "A comic comparison frames asking AI 'are you sure?' as asking Regina whether the Burn Book is peer reviewed.", "narration": "Asking AI 'are you sure?' is like asking Regina George whether the Burn Book is peer reviewed."},
    {"start": 597.7, "end": 603.3, "source": "assets/episodes/ep-03/comic/ep03-emph-peer-reviewed-comic.png", "visible_description": "The peer-reviewed card lands the verdict: bold choice, limited value.", "narration": "Bold choice. Limited value."},
    {"start": 603.3, "end": 606.0, "source": "assets/episodes/ep-03/comic/ep03-concept-verification-comic.png", "visible_description": "The verification checklist replaces reassurance with the actual checks that can catch a mistake.", "narration": "Sometimes it catches the mistake and corrects itself."},
]
builder.build()
