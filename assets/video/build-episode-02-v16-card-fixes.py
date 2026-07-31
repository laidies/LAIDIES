from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-02-production-cues-v2-motion-review.json"
OUT = HERE / "episode-02-production-cues-v5-card-fixes.json"
COMIC = "/assets/video/comic-interstitials-v1/"
NEW = "/assets/video/episode-02-full-scene-replacements-v3/"
DELIVERY = "/assets/video/delivery-20260723-ep02-v16-cover-v3/"

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
        if i == 2:
            src = DELIVERY + "ep02-open-03-title-comic.png"
        elif i == 20:
            src = DELIVERY + "ep02-cue-20-episode-style.png"
        elif i == 49:
            src = COMIC + "post-office-current-pixel-v1.png"
        elif i == 55:
            src = COMIC + "blend-and-snap-current-pixel-v1.png"
        motion = not src.startswith(COMIC)
        if i == 20:
            motion = False
        c.clear()
        c.update(t=t, type="full", src=src, motion=motion)
    data["note"] = (
        "Episode 2 v16: v15 visual assembly unchanged except for the Episode Two "
        "title card at cue 2 and the clean Spice Girls principle cover rebuilt "
        "from the established Episode 2 comic style at cue 20."
    )
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
