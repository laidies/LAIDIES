from pathlib import Path
import json

HERE=Path(__file__).resolve().parent
SRC=HERE/"episode-trailer-production-cues-v4-motion-review.json"
OUT=HERE/"episode-trailer-production-cues-v5-full-visual.json"

def image_for(t):
    if t < 100.9: return "/assets/video/delivery-20260714-opening-v6/shots/opening-02-heroine-camera-smile-v14.png"
    if t < 421.2: return "/assets/video/delivery-20260714-opening-v6/shots/opening-01-establishing.png"
    if t < 475.4: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/07-the-chick-flicks-v3.png"
    if t < 518.7: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/08-blend-and-snap-v3.png"
    if t < 559.1: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/14-sunnyvaile-high-v3.png"
    if t < 659.6: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/09-maikeover-on-maine-v3.png"
    if t < 685.3: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/05-bronze-aige-v3.png"
    if t < 729.15: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/10-delta-lai-nu-sorority-house-v3.png"
    if t < 820.1: return "/assets/video/delivery-20260714-opening-v6/shots/opening-05-dj-headphone-mic-action-v3.png"
    if t < 938.2: return "/assets/video/delivery-20260714-opening-v6/shots/opening-07-luminairy.png"
    if t < 951.3: return "/assets/video/delivery-20260714-opening-v6/shots/opening-02-heroine-camera-smile-v14.png"
    return "/assets/video/episode-01-full-scene-replacements-v2/ep01-steve-visionary-meeting-v2-corporate.png"

def main():
    data=json.loads(SRC.read_text())
    for cue in data["cues"]:
        if not cue.get("src"):
            t=float(cue["t"]); cue.clear(); cue.update(t=t,type="full",src=image_for(t),motion=True)
        # Keep the KSVL introduction visually active without leaving the DJ on
        # screen for a full minute. Alternate the station exterior and studio
        # at existing narration-safe cue boundaries.
        t=float(cue["t"])
        if 742.3 <= t < 820.1:
            cue["type"]="full"
            cue["src"]=(
                "/assets/video/delivery-20260714-opening-v6/shots/opening-04-ksvl-tower.png"
                if int((t-742.3)//13) % 2 == 0
                else "/assets/video/delivery-20260714-opening-v6/shots/opening-05-dj-headphone-mic-action-v3.png"
            )
            cue["motion"]=True
    data["note"]="Trailer full-visual rebuild: no typography-only cards; each stop and named character remains on screen during its narration."
    OUT.write_text(json.dumps(data,indent=2)+"\n")
    print(OUT)

if __name__=="__main__": main()
