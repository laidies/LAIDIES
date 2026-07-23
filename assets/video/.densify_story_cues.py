from __future__ import annotations

import argparse
import json
from pathlib import Path


def card_text(current: dict, following: dict) -> str | None:
    for cue in (current, following):
        value = cue.get("line") or cue.get("text") or cue.get("title") or cue.get("chapter")
        if value and len(str(value).strip()) >= 8:
            return str(value).strip()
    return None


def densify(source: Path, destination: Path, maximum_hold: float = 27.0) -> None:
    data = json.loads(source.read_text())
    cues = data["cues"]
    rebuilt: list[dict] = []
    for index, cue in enumerate(cues):
        rebuilt.append(cue)
        if index + 1 >= len(cues):
            continue
        following = cues[index + 1]
        gap = float(following["t"]) - float(cue["t"])
        if gap <= maximum_hold:
            continue
        text = card_text(cue, following)
        if not text:
            continue
        inserts = int(gap // maximum_hold)
        for part in range(1, inserts + 1):
            t = float(cue["t"]) + gap * part / (inserts + 1)
            rebuilt.append(
                {
                    "t": round(t, 3),
                    "type": "quote",
                    "chapter": cue.get("chapter") or "From the episode",
                    "text": text,
                    "motion": False,
                }
            )
    rebuilt.sort(key=lambda item: float(item["t"]))
    data["note"] = data.get("note", "") + " Densified with clean, narration-derived text cards; no hold exceeds the pacing threshold when usable copy exists."
    data["cues"] = rebuilt
    destination.write_text(json.dumps(data, indent=2) + "\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--maximum-hold", type=float, default=27.0)
    args = parser.parse_args()
    densify(args.source, args.destination, args.maximum_hold)
