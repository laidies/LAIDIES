#!/usr/bin/env python3
"""Build Episode 03 p44: confident-friend payoff into the weekly Try-On."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_builder", ROOT / "scripts/build-episode-03-perm-timeline-review-v1.py")
builder = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(builder)
builder.START = 864.1
builder.END = 892.0
builder.OUTPUT = builder.OUT / "p44-weekly-rule-review-v1.mp4"
builder.CONTACT = builder.OUT / "p44-weekly-rule-review-v1-contact-sheet.jpg"
builder.RECEIPT = builder.OUT / "p44-weekly-rule-review-v1-build.json"
builder.OCCURRENCES = "p44"
builder.COMMENT = "LOCAL EPISODE 03 P44 WEEKLY-RULE REVIEW SEQUENCE — NO RELEASE AUTHORITY"
builder.EDITORIAL_DECISION = "Replace the weekly-rule static hold with six narration-specific beats that finish the confident-friend analogy, distinguish guessing from intent, demand the receipt, close the episode, and introduce the ten-minute Try-On."
builder.SEGMENTS = [
    {"start": 864.1, "end": 870.67, "source": "assets/episodes/ep-03/comic/ep03-cocktail-comic.png", "visible_description": "The cocktail card keeps the confident-friend analogy visible as she confidently answers a question she may not know.", "narration": "It's your most confident friend, the one who will answer any question whether or not she actually knows."},
    {"start": 870.67, "end": 873.77, "source": "assets/video/episode-03-full-scene-replacements-v4/ep03-cocktail-party-bronze-aige-y2k-v3-inclusive-bg.png", "visible_description": "The cocktail-party scene returns to the actual social analogy instead of treating a generated guess as deliberate lying.", "narration": "The fix was never to catch her in a lie."},
    {"start": 873.77, "end": 879.29, "source": "assets/episodes/ep-03/comic/ep03-concept-receipt-comic.png", "visible_description": "The receipt card shows the support a user can open, name, date, quote or point to before repeating the claim.", "narration": "It's to ask for the receipt before you repeat her in a meeting."},
    {"start": 879.29, "end": 883.65, "source": "assets/episodes/ep-03/comic/ep03-signoff-comic.png", "visible_description": "The episode signoff card appears only for the spoken episode close and transition.", "narration": "And that's the episode. Now, your try-on."},
    {"start": 883.65, "end": 889.63, "source": "assets/episodes/ep-03/comic/ep03-tryon-rule-comic-v2-fix.png", "visible_description": "The weekly rule card introduces the ten-minute Try-On: use the draft and still check the alibi.", "narration": "Ten minutes, not homework, and everything you need lives at laidies.ai."},
    {"start": 889.63, "end": 892.0, "source": "assets/episodes/ep-03/comic/ep03-signoff-comic.png", "visible_description": "The LAiDIES signoff returns as the narration begins spelling the brand name and address.", "narration": "That's LAiDIES, spelled with an i in the middle."},
]
builder.build()
