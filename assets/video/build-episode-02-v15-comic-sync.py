from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-02-production-cues-v2-motion-review.json"
OUT = HERE / "episode-02-production-cues-v4-comic-sync.json"
COMIC = "/assets/video/comic-interstitials-v1/"
NEW = "/assets/video/episode-02-full-scene-replacements-v3/"

REPLACE = {
    "/assets/episodes/issue-02/ep02-wall-of-text.png": NEW + "ep02-lazy-ask-wall-of-text-blend-snap-v1.png",
    "/assets/episodes/issue-02/ep02-good-summary.png": NEW + "ep02-useful-answer-blend-snap-v1.png",
    "/assets/episodes/issue-02/ep02-the-brief.png": NEW + "ep02-who-what-tone-length-blend-snap-v1.png",
}


def main():
    data = json.loads(SRC.read_text())
    for i, c in enumerate(data["cues"]):
        t = float(c["t"])
        src = c.get("src")
        if not src:
            src = COMIC + f"ep02-cue-{i:02d}.png"
        src = REPLACE.get(src, src)
        if i == 49:
            src = COMIC + "post-office-current-pixel-v1.png"
        elif i == 55:
            src = COMIC + "blend-and-snap-current-pixel-v1.png"
        c.clear()
        c.update(t=t, type="full", src=src, motion=not src.startswith(COMIC))
    data["note"] = "Episode 2 v15: narration-specific imagery restored; exact comic cards replace repeated filler; current Post Office and Blend & Snap assets."
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
