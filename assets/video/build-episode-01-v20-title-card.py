from pathlib import Path
import json
import shutil

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-01-production-cues-v4-motion-review.json"
OUT = HERE / "episode-01-production-cues-v7-title-card.json"
TITLE = HERE / "comic-interstitials-v1/ep01-title.png"
PREPARED_TITLE = HERE / ".safe-v8-native/ep01-03-ep01-title.png"
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

    data["note"] = (
        "Episode 1 v20: v19 cue timing and visuals preserved; cue 3 uses the "
        "corrected bespoke ON WEDNESDAYS WE DO AI Episode One title card."
    )
    OUT.write_text(json.dumps(data, indent=2) + "\n")

    # Preserve the bespoke title artwork exactly. The shared legacy renderer
    # normally adds a series bug to prepared frames; this cue intentionally
    # carries only the in-generation title and episode header.
    PREPARED_TITLE.parent.mkdir(exist_ok=True)
    shutil.copy2(TITLE, PREPARED_TITLE)

    print(OUT)


if __name__ == "__main__":
    main()
