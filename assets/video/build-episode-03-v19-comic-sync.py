from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-03-production-cues-v3-opening-rebuild.json"
OUT = HERE / "episode-03-production-cues-v6-comic-sync.json"
COMIC = "/assets/video/comic-interstitials-v1/"
BASE = "/assets/video/episode-03-full-scene-replacements-v4/"

BEATS = {
    0.0: "/assets/video/episode-03-full-scene-replacements-v3/ep03-title-illustrated-v2.png",
    21.5: COMIC + "sounding-right.png",
    35.5: "/assets/video/episode-03-full-scene-replacements-v3/ep03-client-update-pending-v1.png",
    54.0: "/assets/video/episode-03-full-scene-replacements-v3/ep03-client-update-reaction-v1.png",
    72.0: COMIC + "maybe-approved.png",
    91.6: "/assets/video/episode-03-full-scene-replacements-v3/ep03-client-update-reaction-v1.png",
    109.0: "/assets/video/delivery-20260714-opening-v6/shots/opening-01-establishing.png",
    125.0: "/assets/episodes/issue-02/ep02-good-summary.png",
    140.0: COMIC + "sounding-right.png",
    153.0: COMIC + "newsstand-current-pixel-v1.png",
    176.0: COMIC + "newsstand-current-pixel-v1.png",
    200.2: "/assets/video/episode-01-full-scene-replacements-v2/ep01-hallucination-burn-book-v1.png",
    230.0: "/assets/video/episode-01-full-scene-replacements-v2/ep01-hallucination-burn-book-v1.png",
    262.1: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    283.0: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    304.3: BASE + "ep03-wrong-country-stale-date-v1.png",
    329.0: BASE + "ep03-wrong-country-stale-date-v1.png",
    353.0: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    375.0: BASE + "ep03-elle-perm-timeline-v1.png",
    393.2: BASE + "ep03-chutney-three-claims-y2k-v2.png",
    421.0: BASE + "ep03-chutney-three-claims-y2k-v2.png",
    444.0: BASE + "ep03-elle-perm-timeline-v1.png",
    461.8: COMIC + "sounding-right.png",
    480.0: BASE + "ep03-elle-perm-timeline-v1.png",
    497.7: COMIC + "draft-claim-receipt.png",
    524.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    551.0: BASE + "ep03-draft-claim-receipt-v1.png",
    584.8: BASE + "ep03-are-you-sure-same-answer-v2.png",
    606.0: BASE + "ep03-are-you-sure-same-answer-v2.png",
    626.1: COMIC + "better-not-solved.png",
    650.0: BASE + "ep03-draft-claim-receipt-v1.png",
    676.0: BASE + "ep03-bethany-one-clue-big-claim-v1.png",
    702.0: COMIC + "move-one.png",
    724.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    744.0: COMIC + "move-two.png",
    761.2: COMIC + "move-three.png",
    764.8: BASE + "ep03-are-you-sure-same-answer-v2.png",
    790.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    816.0: BASE + "ep03-cocktail-party-bronze-aige-y2k-v2.png",
    841.0: BASE + "ep03-cocktail-party-bronze-aige-y2k-v2.png",
    866.7: BASE + "ep03-draft-claim-receipt-v1.png",
    892.0: BASE + "ep03-three-moves-source-gap-line-v1.png",
    918.0: COMIC + "move-three.png",
    944.0: BASE + "ep03-draft-claim-receipt-v1.png",
}


def main():
    data = json.loads(SRC.read_text())
    for c in data["cues"]:
        t = float(c["t"])
        src = BEATS.get(t, c.get("src"))
        if not src:
            src = COMIC + "sounding-right.png"
        if t == 995.0:
            src = COMIC + "blend-and-snap-current-pixel-v1.png"
        c.clear()
        c.update(t=t, type="full", src=src, motion=not src.startswith(COMIC))
    data["note"] = "Episode 3 v19: corporate opening ends at the NewsStand arrival; Bethany and verification examples are narration-locked; comic rules break up repeated stills."
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
