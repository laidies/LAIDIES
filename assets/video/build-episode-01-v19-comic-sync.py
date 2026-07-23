from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-01-production-cues-v4-motion-review.json"
OUT = HERE / "episode-01-production-cues-v6-comic-sync.json"
COMIC = "/assets/video/comic-interstitials-v1/"
OPEN = "/assets/video/delivery-20260714-opening-v6/shots/"
V2 = "/assets/video/episode-01-full-scene-replacements-v2/"


def main():
    data = json.loads(SRC.read_text())
    for i, c in enumerate(data["cues"]):
        t = float(c["t"])
        if i == 0:
            src = COMIC + "season-promo-1.png"
        elif i == 1:
            src = COMIC + "season-promo-2.png"
        elif i == 2:
            src = COMIC + "season-promo-3.png"
        elif i == 3:
            src = COMIC + "ep01-title.png"
        elif i == 9:
            src = COMIC + "get-in-loser.png"
        elif not c.get("src"):
            src = COMIC + f"ep01-cue-{i:02d}.png"
        else:
            src = c["src"]

        # Current, legible buildings and correct SUNNYVAiLE-era wardrobe/scenes.
        if i == 17:
            src = COMIC + "library-current-pixel-v1.png"
        elif i == 29:
            src = V2 + "ep01-heroine-blend-snap-email-v1.png"
        elif i == 62:
            src = "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/14-sunnyvaile-high-v3.png"
        elif i == 67:
            src = COMIC + "delta-lai-nu-current-pixel-v1.png"

        c.clear()
        c.update(t=t, type="full", src=src, motion=not src.startswith(COMIC))

    data["note"] = "Episode 1 v19: original narration-specific cue order restored; comic cards replace generic repeats; Miranda, Steve, and SUNNYVAiLE appear only on their spoken beats."
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
