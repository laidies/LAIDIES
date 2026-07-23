from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
SRC = HERE / "episode-01-production-cues-v4-motion-review.json"
OUT = HERE / "episode-01-production-cues-v5-full-visual.json"

V1 = "/assets/video/episode-01-full-scene-replacements-v1/"
V2 = "/assets/video/episode-01-full-scene-replacements-v2/"

def image_for(t):
    if t < 75: return V2 + "ep01-steve-visionary-meeting-v2-corporate.png"
    if t < 116: return "/assets/video/delivery-20260714-opening-v6/shots/opening-02-heroine-bright-yellow-natural-hands-v13.png"
    if t < 160: return V2 + "ep01-heroine-footnotes-drafts-v1-corporate.png"
    if t < 192: return V1 + "ep01-miranda-office-full-scene-v1.png"
    if t < 246: return "/assets/building-interiors/library-reading-room.jpg"
    if t < 292: return V2 + "ep01-senior-women-ai-leadership-v1.png"
    if t < 328: return V1 + "ep01-buffy-library-full-scene-v1.png"
    if t < 365: return V1 + "ep01-regina-cafeteria-full-scene-v2.png"
    if t < 435: return V1 + "ep01-dolly-stage-full-scene-v1.png"
    if t < 525: return V2 + "ep01-heroine-blend-snap-email-v1.png"
    if t < 603: return V2 + "ep01-senior-women-ai-leadership-v1.png"
    if t < 663: return V2 + "ep01-cocktail-party-bronze-aige-v2-y2k.png"
    if t < 720: return V2 + "ep01-ai-new-hire-onboarding-v1.png"
    if t < 792: return V2 + "ep01-language-prediction-new-hire-v1.png"
    if t < 826: return V2 + "ep01-context-closet-limit-v1.png"
    if t < 951: return V2 + "ep01-hallucination-burn-book-v1.png"
    if t < 1025: return V2 + "ep01-heroine-blend-snap-email-v1.png"
    if t < 1117: return "/assets/sunnyvaile-town-map-v9-canon.png"
    if t < 1150: return "/assets/sunnyvaile-buildings/y2k-v3/10-delta-lai-nu-sorority-house.webp"
    return "/assets/episodes/issue-02/ep02-david-rose.png"

def main():
    data=json.loads(SRC.read_text())
    section_counts={}
    for cue in data["cues"]:
        t=float(cue["t"])
        # Rebuild every cue. The prior motion map carried stale corporate-world
        # inserts (including the rejected pink-heart screen) back into the story
        # after the Heroine had already entered SUNNYVAiLE.
        if True:
            src=image_for(t)
            if t < 75:
                pool=[V2+"ep01-steve-visionary-meeting-v2-corporate.png",V2+"ep01-heroine-footnotes-drafts-v1-corporate.png"]
            elif 75 <= t < 190:
                pool=[V2+"ep01-heroine-footnotes-drafts-v1-corporate.png",V1+"ep01-miranda-office-full-scene-v1.png",V2+"ep01-steve-visionary-meeting-v2-corporate.png"]
            elif 246 <= t < 435:
                pool=[V1+"ep01-buffy-library-full-scene-v1.png",V1+"ep01-regina-cafeteria-full-scene-v2.png",V1+"ep01-dolly-stage-full-scene-v1.png","/assets/building-interiors/library-reading-room.jpg"]
            elif 435 <= t < 603:
                pool=[V2+"ep01-heroine-blend-snap-email-v1.png","/assets/building-interiors/library-reading-room.jpg",V1+"ep01-dolly-stage-full-scene-v1.png"]
            elif 603 <= t < 720:
                pool=[V2+"ep01-cocktail-party-bronze-aige-v2-y2k.png",V2+"ep01-heroine-blend-snap-email-v1.png"]
            elif 720 <= t < 951:
                pool=[V2+"ep01-context-closet-limit-v1.png",V1+"ep01-regina-cafeteria-full-scene-v2.png",V2+"ep01-cocktail-party-bronze-aige-v2-y2k.png"]
            elif 951 <= t < 1025:
                pool=[V2+"ep01-heroine-blend-snap-email-v1.png",V2+"ep01-cocktail-party-bronze-aige-v2-y2k.png"]
            elif 1025 <= t < 1150:
                pool=[
                    "/assets/sunnyvaile-town-map-v9-canon.png",
                    "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/14-sunnyvaile-high-v3.png",
                    "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/16-ksvl-community-raidio-v3.png",
                    "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/09-maikeover-on-maine-v3.png",
                    "/assets/rerolls-20260714/town-buildings-light-pixel-v1/sunnyvaile-buildings/y2k-v3/light-pixel/10-delta-lai-nu-sorority-house-v3.png",
                ]
            else: pool=[src]
            key=int(t//100); n=section_counts.get(key,0); section_counts[key]=n+1; src=pool[n%len(pool)]
            cue.clear(); cue.update(t=t,type="full",src=src,motion=True)
    data["note"]="Episode 1 full-visual rebuild: every narration cue uses relevant scene art; no plain typography cards."
    OUT.write_text(json.dumps(data,indent=2)+"\n")
    print(OUT)

if __name__ == "__main__": main()
