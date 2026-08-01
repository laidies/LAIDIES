#!/usr/bin/env python3
"""Build Episode 03 p46: the three-claim verification Try-On."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_builder", ROOT / "scripts/build-episode-03-perm-timeline-review-v1.py")
builder = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(builder)
builder.START = 930.0
builder.END = 960.9
builder.OUTPUT = builder.OUT / "p46-three-claim-tryon-review-v1.mp4"
builder.CONTACT = builder.OUT / "p46-three-claim-tryon-review-v1-contact-sheet.jpg"
builder.RECEIPT = builder.OUT / "p46-three-claim-tryon-review-v1-build.json"
builder.OCCURRENCES = "p46"
builder.COMMENT = "LOCAL EPISODE 03 P46 THREE-CLAIM TRY-ON REVIEW — NO RELEASE AUTHORITY"
builder.EDITORIAL_DECISION = "Replace the no-invented-receipts static hold with six narration-specific beats that introduce the ten-minute exercise, identify the three claim types, ask where the support came from, and land the Chutney/Elle checking rule."
builder.SEGMENTS = [
    {"start": 930.0, "end": 937.19, "source": "assets/episodes/ep-03/comic/ep03-scene-14-receipts-pass-comic-rebalance-v2-hair-cleanup.png", "visible_description": "The heroine begins a ten-minute receipt check with a timer, source notes and three labelled claim cards.", "narration": "Take one real answer from an AI tool and verify three claims before it borrows your name."},
    {"start": 937.19, "end": 941.29, "source": "assets/episodes/ep-03/comic/ep03-concept-claim-comic.png", "visible_description": "The claim card calls out names, dates, numbers, quotes and sources as details that need checking.", "narration": "One that leans on a name, a date, a number, or a link."},
    {"start": 941.29, "end": 946.35, "source": "assets/episodes/ep-03/comic/ep03-scene-07b-wrong-room-comic-rebalance-v1.png", "visible_description": "Four wrong-room examples show advice from the wrong country, stale pricing, a discussion mistaken for a decision and an exception mistaken for the rule.", "narration": "One that could be stale, or from the wrong country, or the wrong client."},
    {"start": 946.35, "end": 951.243, "source": "assets/episodes/ep-03/comic/ep03-concept-receipt-comic.png", "visible_description": "The receipt card asks for the thing the user can open, name, date, quote or point to.", "narration": "And one you'd be embarrassed to say out loud if someone asked, where did that come from?"},
    {"start": 951.243, "end": 957.89, "source": "assets/episodes/ep-03/comic/ep03-scene-14-receipts-pass-comic-rebalance-v2-hair-cleanup.png", "visible_description": "The heroine checks the date, quote and owner against the source while the ten-minute timer remains visible.", "narration": "You need ten minutes and enough self-respect not to let Chutney handle the timeline."},
    {"start": 957.89, "end": 960.9, "source": "assets/episodes/ep-03/comic/ep03-emph-chutney-elle-comic.png", "visible_description": "The Chutney-versus-Elle principle card turns the optional detective joke back into a clear verification rule.", "narration": "A corkboard and trench coat are optional, though honestly, that sounds kind of fun."},
]
builder.build()
