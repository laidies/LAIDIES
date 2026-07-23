from pathlib import Path
import json

HERE=Path(__file__).resolve().parent
SRC=HERE/"episode-02-production-cues-v2-motion-review.json"
OUT=HERE/"episode-02-production-cues-v3-sunnyvaile-visual.json"
NEW="/assets/video/episode-02-full-scene-replacements-v3/"
OLD="/assets/episodes/issue-02/"

def image_for(t):
    if t < 31.4: return "/assets/video/episode-01-full-scene-replacements-v2/ep01-ai-new-hire-onboarding-v1.png"
    if t < 86.8: return OLD+"ep02-cold-open-desk.png"
    if t < 119.1: return "/assets/video/delivery-20260714-opening-v6/shots/opening-02-heroine-bright-yellow-natural-hands-v13.png"
    if t < 169.7: return NEW+"ep02-lazy-ask-wall-of-text-blend-snap-v1.png"
    if t < 219: return "/assets/video/delivery-20260714-opening-v6/shots/opening-09-barista-approved-identity-v2.png"
    if t < 315.5: return NEW+"ep02-lazy-ask-wall-of-text-blend-snap-v1.png"
    if t < 356: return OLD+"ep02-david-rose.png"
    if t < 473: return NEW+"ep02-who-what-tone-length-blend-snap-v1.png"
    if t < 515: return NEW+"ep02-lazy-ask-wall-of-text-blend-snap-v1.png"
    if t < 600: return NEW+"ep02-useful-answer-blend-snap-v1.png"
    if t < 724.4: return "/assets/building-interiors/library-reading-room.jpg"
    if t < 774.8: return "/assets/video/episode-01-full-scene-replacements-v2/ep01-senior-women-ai-leadership-v1.png"
    if t < 833.4: return "/assets/video/episode-01-full-scene-replacements-v2/ep01-cocktail-party-bronze-aige-v2-y2k.png"
    if t < 864.9: return "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/13-sunnyvaile-post-office-v3.png"
    if t < 922: return NEW+"ep02-ask-twice-blend-snap-v1.png"
    if t < 972.2: return "/assets/sunnyvaile-town-map-v9-canon.png"
    return "/assets/video/episode-01-full-scene-replacements-v2/ep01-hallucination-burn-book-v1.png"

def main():
    data=json.loads(SRC.read_text())
    cafe_cycle=[
        NEW+"ep02-who-what-tone-length-blend-snap-v1.png",
        NEW+"ep02-lazy-ask-wall-of-text-blend-snap-v1.png",
        NEW+"ep02-useful-answer-blend-snap-v1.png",
    ]
    cafe_i=0
    for cue in data["cues"]:
        t=float(cue["t"])
        if t in {724.4, 741.2, 758.0}:
            src=("/assets/video/delivery-20260714-opening-v6/shots/opening-11-crew-approved-heroine-barista-v9.png"
                 if t != 741.2 else
                 "/assets/video/episode-01-full-scene-replacements-v2/ep01-cocktail-party-bronze-aige-v2-y2k.png")
            cue.clear(); cue.update(
                t=t,type="full",
                src=src,
                motion=True,
            )
        elif not cue.get("src") or (t>=119.1 and cue.get("src","").startswith("/assets/episodes/issue-02/")):
            src=image_for(t)
            if 219.0 <= t < 600.0:
                src=cafe_cycle[cafe_i % len(cafe_cycle)]; cafe_i += 1
            elif 617.3 <= t < 724.4:
                src=("/assets/building-interiors/library-reading-room.jpg" if cafe_i % 2 == 0 else
                     "/assets/video/delivery-20260714-opening-v6/shots/opening-11-crew-approved-heroine-barista-v9.png")
                cafe_i += 1
            elif 774.8 <= t < 833.4:
                src=("/assets/video/episode-01-full-scene-replacements-v2/ep01-cocktail-party-bronze-aige-v2-y2k.png" if cafe_i % 2 == 0 else
                     "/assets/video/delivery-20260714-opening-v6/shots/opening-11-crew-approved-heroine-barista-v9.png")
                cafe_i += 1
            elif 864.9 <= t < 922.0:
                src=(NEW+"ep02-ask-twice-blend-snap-v1.png" if cafe_i % 2 == 0 else NEW+"ep02-useful-answer-blend-snap-v1.png")
                cafe_i += 1
            cue.clear(); cue.update(t=t,type="full",src=src,motion=True)
    data["note"]="Episode 2 full visual rebuild: no typography cards; after 119.1 seconds the Heroine remains in SUNNYVAiLE wardrobe and locations."
    OUT.write_text(json.dumps(data,indent=2)+"\n")
    print(OUT)

if __name__=="__main__": main()
