#!/usr/bin/env python3
"""Build Episode 03 p10: the narration-timed news-desk verification sequence."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_builder", ROOT / "scripts/build-episode-03-perm-timeline-review-v1.py")
builder = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(builder)
builder.START = 178.0
builder.END = 199.0
builder.OUTPUT = builder.OUT / "p10-news-desk-review-v1.mp4"
builder.CONTACT = builder.OUT / "p10-news-desk-review-v1-contact-sheet.jpg"
builder.RECEIPT = builder.OUT / "p10-news-desk-review-v1-build.json"
builder.OCCURRENCES = "p10"
builder.COMMENT = "LOCAL EPISODE 03 P10 NEWS-DESK REVIEW SEQUENCE — NO RELEASE AUTHORITY"
builder.EDITORIAL_DECISION = "Replace the 21-second newspaper hold with five narration-specific beats that move from the draft and real headlines to a human news-desk check, the two verification questions, the front-page claim and the byline responsibility."
builder.SEGMENTS = [
    {"start": 178.0, "end": 183.7, "source": "assets/episodes/ep-03/comic/ep03-concept-draft-comic.png", "visible_description": "The Draft card identifies the generated text as a starting point rather than finished copy.", "narration": "Standing there with the real headlines, it landed: my draft didn't need a better writer."},
    {"start": 183.7, "end": 189.669, "source": "assets/episodes/ep-03/comic/ep03-scene-03-newsstand-comic.png", "visible_description": "At the NewsStand, a press worker and the heroine inspect the paper together under a magnifying glass.", "narration": "It needed someone at the news desk, holding every confident line up to the light."},
    {"start": 189.669, "end": 192.5, "source": "assets/episodes/ep-03/comic/ep03-emph-says-who-comic.png", "visible_description": "The newspaper asks the two exact verification questions in large type: Says who? Based on what?", "narration": "Says who? Based on what?"},
    {"start": 192.5, "end": 195.94, "source": "assets/episodes/ep-03/comic/ep03-concept-claim-comic.png", "visible_description": "The Claim card identifies the front-page statement as the thing that must be supported.", "narration": "The machine had handed me a front page."},
    {"start": 195.94, "end": 199.0, "source": "assets/episodes/ep-03/comic/ep03-emph-says-who-comic.png", "visible_description": "The newspaper returns with the explicit instruction to fact-check the front page before it runs under your byline.", "narration": "My job was to fact-check it before it ran under my byline."},
]
builder.build()
