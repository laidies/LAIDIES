from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "episode-03-production-cues-v3-opening-rebuild.json"
OUT = HERE / "episode-03-production-cues-v5-accurate-visuals.json"

TITLE = "/assets/video/episode-03-full-scene-replacements-v3/ep03-title-illustrated-v2.png"
BASE = "/assets/video/episode-03-full-scene-replacements-v4/"

BEATS = {
    0.0: TITLE,
    21.5: "/assets/episodes/issue-02/ep02-good-summary.png",
    176.0: "/assets/video/delivery-20260714-opening-v6/shots/opening-01-establishing.png",
    200.2: "/assets/building-interiors/library-reading-room.jpg",
    230.0: "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/02-sunnyvaile-newsstand-v3.png",
    262.1: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    304.3: BASE + "ep03-wrong-country-stale-date-v1.png",
    329.0: BASE + "ep03-wrong-country-stale-date-v1.png",
    353.0: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    375.0: BASE + "ep03-elle-perm-timeline-v1.png",
    393.2: BASE + "ep03-elle-perm-timeline-v1.png",
    421.0: BASE + "ep03-chutney-three-claims-y2k-v2.png",
    444.0: BASE + "ep03-elle-perm-timeline-v1.png",
    461.8: BASE + "ep03-chutney-three-claims-y2k-v2.png",
    480.0: BASE + "ep03-elle-perm-timeline-v1.png",
    497.7: BASE + "ep03-draft-claim-receipt-v1.png",
    524.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    551.0: BASE + "ep03-draft-claim-receipt-v1.png",
    584.8: BASE + "ep03-are-you-sure-same-answer-v2.png",
    606.0: BASE + "ep03-are-you-sure-same-answer-v2.png",
    626.1: BASE + "ep03-draft-claim-receipt-v1.png",
    650.0: BASE + "ep03-draft-claim-receipt-v1.png",
    676.0: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    702.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    724.0: BASE + "ep03-draft-claim-receipt-v1.png",
    744.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    761.2: BASE + "ep03-three-moves-source-gap-line-v1.png",
    764.8: BASE + "ep03-are-you-sure-same-answer-v2.png",
    790.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    816.0: BASE + "ep03-cocktail-party-bronze-aige-y2k-v2.png",
    866.7: BASE + "ep03-draft-claim-receipt-v1.png",
    892.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    918.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    944.0: BASE + "ep03-draft-claim-receipt-v1.png",
}

REJECTED = {
    "/assets/video/episode-03-full-scene-replacements-v2/ep03-bethany-byrd-source-conflict-v1.png",
    "/assets/video/episode-03-full-scene-replacements-v2/ep03-show-your-work-v1.png",
    "/assets/video/episode-03-full-scene-replacements-v2/ep03-trust-in-layers-v1.png",
}


def main():
    data = json.loads(SOURCE.read_text())
    last_safe = TITLE
    for cue in data["cues"]:
        t = float(cue["t"])
        if t in BEATS:
            cue.clear()
            cue.update(t=t, type="full", src=BEATS[t], motion=True)
            last_safe = BEATS[t]
            continue
        src = cue.get("src")
        if not src or src in REJECTED:
            cue.clear()
            cue.update(t=t, type="full", src=last_safe, motion=False)
        else:
            last_safe = src
            cue["motion"] = True
    data["note"] = (
        "Narration-accurate Episode 3 rebuild: no purple text cards, no rejected "
        "floating-paper art, corporate imagery only before SUNNYVAiLE, and named "
        "examples aligned to their narration beats."
    )
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
