from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-trailer-production-cues-v4-motion-review.json"
OUT = HERE / "episode-trailer-production-cues-v6-comic-sync.json"

COMIC = "/assets/video/comic-interstitials-v1/"
OPEN = "/assets/video/delivery-20260714-opening-v6/shots/"
CURRENT = COMIC
LIGHT = "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/"


def cue(t, src, motion=True):
    return {"t": float(t), "type": "full", "src": src, "motion": motion}


def main():
    data = json.loads(SRC.read_text())
    times = [float(c["t"]) for c in data["cues"]]
    by_time = {
        0.0: OPEN + "opening-12-pc-welcome-no-flags.png",
        5.9: COMIC + "smart-busy.png",
        24.0: COMIC + "one-useful-thing.png",
        43.4: OPEN + "opening-02-heroine-bright-yellow-natural-hands-v13.png",
        55.7: OPEN + "opening-02-heroine-camera-smile-v14.png",
        68.0: COMIC + "mistakes-skip.png",
        84.45: OPEN + "opening-02-heroine-camera-smile-v14.png",
        100.9: COMIC + "season-promo-1.png",
        112.0: COMIC + "season-promo-2.png",
        124.9: COMIC + "season-promo-3.png",
        145.0: OPEN + "opening-01-establishing.png",
        164.0: COMIC + "butterfly-clips-as-if.png",
        181.0: OPEN + "opening-01-establishing.png",
        195.0: OPEN + "opening-02-heroine-bright-yellow-natural-hands-v13.png",
        216.0: CURRENT + "library-current-pixel-v1.png",
        233.0: OPEN + "opening-04-ksvl-tower.png",
        246.5: COMIC + "teaching-method-1.png",
        264.0: COMIC + "teaching-method-2.png",
        281.0: COMIC + "teaching-method-3.png",
        294.5: COMIC + "teaching-method-4.png",
        318.0: OPEN + "opening-04-ksvl-tower.png",
        341.0: CURRENT + "blend-and-snap-current-pixel-v1.png",
        363.0: OPEN + "opening-01-establishing.png",
        383.2: COMIC + "express-tour-1.png",
        402.0: COMIC + "express-tour-3.png",
        421.2: OPEN + "opening-01-establishing.png",
        424.3: CURRENT + "newsstand-current-pixel-v1.png",
        446.0: LIGHT + "07-the-chick-flicks-v3.png",
        460.7: LIGHT + "07-the-chick-flicks-v3.png",
        475.4: CURRENT + "blend-and-snap-current-pixel-v1.png",
        490.2: CURRENT + "blend-and-snap-current-pixel-v1.png",
        505.0: OPEN + "opening-09-barista-approved-identity-v2.png",
        518.7: CURRENT + "blend-and-snap-current-pixel-v1.png",
        532.4: LIGHT + "14-sunnyvaile-high-v3.png",
        545.75: LIGHT + "14-sunnyvaile-high-v3.png",
        559.1: "/assets/sunnyvaile-buildings/y2k-v3-defairytale/episode-pixel/06-mme-claios-shop-map-continuity-pixel-v1.png",
        568.0: OPEN + "opening-03-mme-claio-clean-face.png",
        579.0: LIGHT + "17-dream-phone-booth-v3.png",
        596.0: CURRENT + "fairy-godmother-current-pixel-v1.png",
        616.1: LIGHT + "09-maikeover-on-maine-v3.png",
        637.85: LIGHT + "09-maikeover-on-maine-v3.png",
        659.6: LIGHT + "05-bronze-aige-v3.png",
        672.45: LIGHT + "05-bronze-aige-v3.png",
        685.3: CURRENT + "delta-lai-nu-current-pixel-v1.png",
        700.65: CURRENT + "delta-lai-nu-current-pixel-v1.png",
        716.0: OPEN + "opening-11-crew-camera-smiles-v10.png",
        729.15: CURRENT + "delta-lai-nu-current-pixel-v1.png",
        742.3: OPEN + "opening-04-ksvl-tower.png",
        755.65: OPEN + "opening-04-ksvl-tower.png",
        769.0: OPEN + "opening-05-dj-headphone-mic-action-v3.png",
        782.0: OPEN + "opening-05-dj-headphone-mic-action-v3.png",
        795.0: COMIC + "learn-from-hooks.png",
        807.55: COMIC + "learn-from-hooks.png",
        820.1: CURRENT + "post-office-current-pixel-v1.png",
        840.0: LIGHT + "04-the-mall-v3.png",
        856.0: OPEN + "opening-06-mayor-deb-clean-face.png",
        874.0: "/assets/episodes/ep-04/pixel/ep04-scene-02a-luminairy-entrance-v5-LUMINAiRY-review.png",
        891.0: OPEN + "opening-07-luminairy.png",
        906.6: COMIC + "worlds-work.png",
        922.4: OPEN + "opening-01-establishing.png",
        938.2: OPEN + "opening-02-heroine-camera-smile-v14.png",
        951.3: "/assets/video/episode-01-full-scene-replacements-v2/ep01-steve-visionary-meeting-v2-corporate.png",
        960.0: "/assets/video/episode-01-full-scene-replacements-v2/ep01-steve-visionary-meeting-v2-corporate.png",
    }
    cues = [cue(t, by_time[t], not by_time[t].startswith(COMIC)) for t in times]
    # The announcer and tour lists accumulate on one page instead of cutting to
    # unrelated footage. Added beats land between existing narration anchors.
    cues += [
        cue(136.8, COMIC + "season-promo-4.png", False),
        cue(391.0, COMIC + "express-tour-2.png", False),
        cue(409.5, COMIC + "express-tour-4.png", False),
    ]
    cues.sort(key=lambda c: c["t"])
    data["cues"] = cues
    data["note"] = "Trailer v15: narration-locked storefront timing, approved current buildings, staged comic panels, and Episode 1 Steve teaser."
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    print(OUT)


if __name__ == "__main__":
    main()
