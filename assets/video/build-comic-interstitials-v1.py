from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import textwrap
import json

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = HERE / "comic-interstitials-v1"
BG = OUT / "laidies-comic-page-bg-v1.png"
AVENIR = "/System/Library/Fonts/Avenir Next Condensed.ttc"
COMIC_READABLE = "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf"
JOST = HERE / "delivery-20260714-opening-v6/fonts/Jost.ttf"

CREAM = (255, 245, 218)
PLUM = (66, 18, 59)
PINK = (244, 73, 143)
TEAL = (19, 164, 174)
GOLD = (246, 178, 43)

PANELS = [
    (58, 45, 1030, 575, CREAM, PINK),
    (1070, 55, 1835, 535, PLUM, CREAM),
    (65, 650, 960, 1010, PLUM, CREAM),
    (1040, 635, 1835, 1010, CREAM, PINK),
]


def font(path, size, index=0):
    return ImageFont.truetype(str(path), size, index=index)


def fit(draw, text, box, max_size=112, min_size=44):
    x1, y1, x2, y2 = box
    for size in range(max_size, min_size - 1, -2):
        f = font(AVENIR, size, index=9)
        words = text.split()
        lines, line = [], ""
        for word in words:
            trial = f"{line} {word}".strip()
            if line and draw.textbbox((0, 0), trial, font=f, stroke_width=3)[2] > x2-x1:
                lines.append(line)
                line = word
            else:
                line = trial
        if line:
            lines.append(line)
        b = draw.multiline_textbbox((0, 0), "\n".join(lines), font=f, spacing=4, stroke_width=3)
        if b[2] <= x2-x1 and b[3] <= y2-y1:
            return f, lines
    return font(AVENIR, min_size, index=9), textwrap.wrap(text, 18)


def draw_item(draw, panel_index, text):
    x1, y1, x2, y2, bg, fg = PANELS[panel_index]
    f, lines = fit(draw, text, (x1+45, y1+35, x2-35, y2-35))
    body = "\n".join(lines)
    b = draw.multiline_textbbox((0, 0), body, font=f, align="center", spacing=4, stroke_width=5)
    x = (x1+x2-(b[2]-b[0]))/2
    y = (y1+y2-(b[3]-b[1]))/2-b[1]
    shadow = TEAL if fg == CREAM else GOLD
    draw.multiline_text((x+10, y+11), body, font=f, fill=shadow, stroke_width=7, stroke_fill=PLUM, align="center", spacing=4)
    draw.multiline_text((x, y), body, font=f, fill=fg, stroke_width=5, stroke_fill=PLUM, align="center", spacing=4)


def staged(prefix, items):
    for n in range(1, len(items)+1):
        im = Image.open(BG).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
        draw = ImageDraw.Draw(im)
        for i, item in enumerate(items[:n]):
            draw_item(draw, i, item)
        im.save(OUT / f"{prefix}-{n}.png", optimize=True)


def quote(name, top, main, bottom=""):
    im = Image.open(BG).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(im)
    draw.rounded_rectangle((155, 160, 1765, 920), radius=55, fill=CREAM, outline=PINK, width=16)
    # All editorial overlay copy uses the established outlined comic treatment.
    # Preserve intentional brand casing such as LAiDIES.
    draw.text((966, 251), top, font=font(AVENIR, 52, index=9), anchor="mm",
              fill=CREAM, stroke_width=6, stroke_fill=PLUM)
    draw.text((960, 245), top, font=font(AVENIR, 52, index=9), anchor="mm",
              fill=PINK, stroke_width=3, stroke_fill=PLUM)
    f, lines = fit(draw, main.upper(), (245, 330, 1675, 750), 150, 58)
    body="\n".join(lines)
    draw.multiline_text((970, 545), body, font=f, anchor="mm", align="center", fill=CREAM, stroke_width=12, stroke_fill=PLUM, spacing=0)
    draw.multiline_text((960, 535), body, font=f, anchor="mm", align="center", fill=PINK, stroke_width=6, stroke_fill=PLUM, spacing=0)
    if bottom:
        draw.text((964, 829), bottom, font=font(AVENIR, 42, index=9), anchor="mm",
                  fill=CREAM, stroke_width=4, stroke_fill=PLUM)
        draw.text((960, 825), bottom, font=font(AVENIR, 42, index=9), anchor="mm",
                  fill=TEAL, stroke_width=2, stroke_fill=PLUM)
    im.save(OUT / f"{name}.png", optimize=True)


def splash(name, main):
    """Comic interstitial with no generic kicker text above the message."""
    im = Image.open(BG).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(im)
    draw.rounded_rectangle((155, 160, 1765, 920), radius=55, fill=CREAM, outline=PINK, width=16)
    f, lines = fit(draw, main.upper(), (245, 260, 1675, 825), 170, 62)
    body = "\n".join(lines)
    draw.multiline_text((970, 555), body, font=f, anchor="mm", align="center", fill=CREAM,
                        stroke_width=12, stroke_fill=PLUM, spacing=0)
    draw.multiline_text((960, 545), body, font=f, anchor="mm", align="center", fill=PINK,
                        stroke_width=6, stroke_fill=PLUM, spacing=0)
    im.save(OUT / f"{name}.png", optimize=True)


def readable_question(name, kicker, lines, emphasis):
    """A wide, mixed-case comic card for long narration copy."""
    im = Image.open(BG).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(im)
    draw.rounded_rectangle((155, 160, 1765, 920), radius=55, fill=CREAM, outline=PINK, width=16)
    kf = font(COMIC_READABLE, 48)
    draw.text((960, 255), kicker, font=kf, anchor="mm", fill=TEAL,
              stroke_width=3, stroke_fill=PLUM)
    bf = font(COMIC_READABLE, 68)
    body = "\n".join(lines)
    draw.multiline_text((960, 500), body, font=bf, anchor="mm", align="center",
                        fill=PLUM, spacing=22)
    ef = font(COMIC_READABLE, 100)
    draw.text((966, 735), emphasis, font=ef, anchor="mm", fill=PLUM)
    draw.text((960, 729), emphasis, font=ef, anchor="mm", fill=PINK,
              stroke_width=4, stroke_fill=PLUM)
    im.save(OUT / f"{name}.png", optimize=True)


def logo_letter_build():
    """Reveal exact branded LAiDIES plus comic .AI one complete glyph at a time."""
    def alpha_runs(im):
        alpha = im.getchannel("A")
        bbox = alpha.getbbox()
        runs, active = [], False
        for x in range(bbox[0], bbox[2]):
            occupied = alpha.crop((x, bbox[1], x+1, bbox[3])).getbbox() is not None
            if occupied and not active:
                start, active = x, True
            elif active and not occupied:
                runs.append((start, x)); active = False
        if active:
            runs.append((start, bbox[2]))
        # Ignore one- or two-pixel antialias/shadow slivers between glyphs.
        # Those slivers previously consumed reveal stages and stopped the
        # finished word at "LAiDIE" instead of the full LAiDIES.AI mark.
        return [(x1, x2) for x1, x2 in runs if x2 - x1 >= 8]

    logo_path = HERE / "delivery-20260714-opening-v6/shots/laidies-homepage-wordmark-exact-v20.png"
    wordmark = Image.open(logo_path).convert("RGBA")
    wordmark.thumbnail((1080, 360), Image.Resampling.LANCZOS)
    bbox = wordmark.getbbox()
    wordmark = wordmark.crop(bbox)
    word_y = (390-wordmark.height)//2

    af = font(AVENIR, 225, index=9)
    # Build the suffix as three independent glyph images. Rendering ".AI" as
    # one text run connects its comic shadows, which made all three characters
    # appear at once instead of one at a time.
    suffix_parts = []
    for ch in ".AI":
        part = Image.new("RGBA", (240, 300), (0,0,0,0))
        ld = ImageDraw.Draw(part)
        ld.text((20, 155), ch, font=af, anchor="lm", fill=PINK,
                stroke_width=8, stroke_fill=PLUM)
        ld.text((12, 147), ch, font=af, anchor="lm", fill=CREAM,
                stroke_width=4, stroke_fill=PLUM)
        suffix_parts.append(part.crop(part.getbbox()))
    suffix = Image.new("RGBA", (sum(p.width for p in suffix_parts) + 18, 390), (0,0,0,0))
    suffix_offsets = []
    sx = 0
    for part in suffix_parts:
        sy = (390-part.height)//2
        suffix.alpha_composite(part, (sx, sy))
        suffix_offsets.append((part, sx, sy))
        sx += part.width + 9

    final_logo = Image.new("RGBA", (wordmark.width + suffix.width - 8, 390), (0,0,0,0))
    final_logo.alpha_composite(wordmark, (0, word_y))
    suffix_x = wordmark.width - 8
    final_logo.alpha_composite(suffix, (suffix_x, (390-suffix.height)//2))

    glyphs = []
    for x1, x2 in alpha_runs(wordmark):
        glyphs.append((wordmark, x1, x2, 0, word_y))
    for part, px, py in suffix_offsets:
        glyphs.append((part, 0, part.width, suffix_x + px, py))

    # LAiDIES.AI has ten visible glyphs including the period. Never crop through
    # a letter: each stage composites complete alpha-isolated glyphs.
    for stage in range(1, 11):
        im = Image.open(BG).convert("RGB").resize((1920, 1080), Image.Resampling.LANCZOS)
        draw = ImageDraw.Draw(im)
        draw.rounded_rectangle((155, 160, 1765, 920), radius=55, fill=PLUM, outline=PINK, width=16)
        stage_logo = Image.new("RGBA", final_logo.size, (0,0,0,0))
        for source, x1, x2, dx, dy in glyphs[:stage]:
            pad = 2
            sx1, sx2 = max(0, x1-pad), min(source.width, x2+pad)
            piece = source.crop((sx1, 0, sx2, source.height))
            stage_logo.alpha_composite(piece, (dx+sx1, dy))
        x = (1920 - final_logo.width) // 2
        y = (1080 - final_logo.height) // 2
        im.paste(stage_logo, (x, y), stage_logo)
        im.save(OUT / f"ep04-laidies-ai-build-{stage:02d}.png", optimize=True)


def subtle_pixel(src, dst):
    im = Image.open(src).convert("RGB")
    # A restrained 1440-wide pixel grid retains faces/signage and avoids the
    # muddy low-resolution look of the earlier building renders.
    h = round(1440 * im.height / im.width)
    im = im.resize((1440, h), Image.Resampling.BILINEAR).resize((1920, 1080), Image.Resampling.NEAREST)
    im = ImageEnhance.Contrast(im).enhance(1.025)
    im.save(dst, optimize=True)


def cue_cards(cue_file, prefix):
    data = json.loads(cue_file.read_text())
    for i, c in enumerate(data["cues"]):
        if c.get("src"):
            continue
        top = c.get("chapter") or c.get("term") or c.get("type", "FROM THE EPISODE")
        main = c.get("text") or c.get("title") or c.get("term") or c.get("label") or c.get("line")
        if not main and c.get("big") is not None:
            main = f'{c.get("big", "")}{c.get("unit", "")}'
        if not main:
            main = c.get("sub") or "ONE USEFUL THING"
        bottom = c.get("attrib") or c.get("source") or c.get("sub") or ""
        quote(f"{prefix}-cue-{i:02d}", str(top), str(main), str(bottom))


def main():
    OUT.mkdir(exist_ok=True)
    staged("season-promo", [
        "STOPS FEELING BEHIND!",
        "DELEGATES TO MACHINES!",
        "BUILDS HER AI SQUAD!",
        "BECOMES THE WOMAN THEY CALL!",
    ])
    staged("teaching-method", ["LESSON!", "STUDY PACK!", "SONG!", "QUIZ!"])
    staged("express-tour", ["EPISODE!", "STUDY PACK!", "QUIZ!", "SONG!"])
    quote("butterfly-clips-as-if", "Somewhere around 1999", "BUTTERFLY CLIPS? AS IF!", "Girl power meets machine power")
    quote("smart-busy", "This show is for women who are", "SMART. BUSY. NOT INTERESTED IN A 40-HOUR COURSE.")
    quote("one-useful-thing", "Twenty-four episodes · Wednesdays", "ONE EPISODE. ONE USEFUL THING.")
    quote("mistakes-skip", "Your Heroine", "I MAKE THE MISTAKES SO YOU CAN SKIP THEM.")
    quote("ep01-title", "Episode One", "ON WEDNESDAYS WE USE AI")
    quote("get-in-loser", "Welcome to LAiDIES", "GET IN, LOSER. WE'RE LEARNING AI.")
    quote("sounding-right", "The Burn Book Problem", "SOUNDING RIGHT IS NOT THE SAME AS BEING RIGHT.")
    quote("maybe-approved", "Thursday afternoon", "MAYBE ≠ APPROVED")
    quote("draft-claim-receipt", "Before it borrows your name", "DRAFT. CLAIM. RECEIPT.")
    quote("move-one", "Prompt Like Elle", "MOVE ONE: GIVE HER THE SOURCE.")
    quote("move-two", "Prompt Like Elle", "MOVE TWO: LET HER SAY ‘I DON'T KNOW.’")
    quote("move-three", "Prompt Like Elle", "MOVE THREE: MAKE HER SHOW THE LINE.")
    quote("better-not-solved", "The tools are improving", "BETTER IS NOT SOLVED.")
    quote("worlds-work", "The town is the teaching method", "WE BUILT A WORLD BECAUSE WORLDS WORK.")
    quote("learn-from-hooks", "KSVL 99.9", "DON'T JUST LEARN FROM BOOKS. LEARN FROM HOOKS.")
    readable_question("ep04-wonder-question-1-v3", "I couldn't help but wonder…",
                      ["This thing that showed up and", "rearranged my whole workweek—"],
                      "Is it actually new?")
    readable_question("ep04-wonder-question-2-v3", "And the question underneath that one…",
                      ["The one I almost didn't", "let myself ask:"], "Who built it?")
    splash("ep04-this-week-flashback-v1", "THIS WEEK: A FLASHBACK.")
    splash("ep04-recap-behind-v1", "STOP FEELING BEHIND!")
    splash("ep04-recap-new-hire-v1", "BRIEF IT LIKE A NEW HIRE!")
    splash("ep04-recap-fact-check-v1", "FACT-CHECK IT LIKE A LAWYER!")
    splash("ep04-just-use-ai-v2", "JUST USE AI!")
    quote("ep04-which-ai-v1", "The question the advice leaves out", "WHICH AI?", "CHATGPT · CLAUDE · COPILOT · GEMINI · PERPLEXITY")
    splash("ep04-just-use-internet-v2", "JUST USE INTERNET!")
    quote("ep04-chatgpt-public-v2", "CHATGPT GOES PUBLIC", "NOVEMBER 30, 2022", "THE DAY THE PUBLIC MET CHATGPT")
    quote("ep04-so-remember-v3", "So remember, LAiDIES", "YOU WERE NEVER BEHIND ON AI. YOU WERE JUST NEVER TOLD IT WAS YOURS.",
          "COMPUTING IS TOO IMPORTANT TO BE LEFT TO MEN.")
    quote("ep04-next-time", "Next time on LAiDIES", "THE SUPER MODELS")
    logo_letter_build()

    proof = ROOT / "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof"
    sources = {
        "newsstand-current-pixel-v1.png": proof / "02-sunnyvaile-newsstand-faceon.png",
        "library-current-pixel-v1.png": proof / "civic-cluster/03-town-library-front.png",
        "blend-and-snap-current-pixel-v1.png": proof / "08-blend-and-snap-faceon.png",
        "delta-lai-nu-current-pixel-v1.png": proof / "10-delta-lai-nu-sorority-house-faceon.png",
        "fairy-godmother-current-pixel-v1.png": proof / "11-fairy-godmother-house-faceon-user-approved.png",
        "post-office-current-pixel-v1.png": proof / "13-sunnyvaile-post-office-faceon-final.png",
    }
    for name, src in sources.items():
        subtle_pixel(src, OUT / name)
    cue_cards(HERE / "episode-01-production-cues-v4-motion-review.json", "ep01")
    cue_cards(HERE / "episode-02-production-cues-v2-motion-review.json", "ep02")


if __name__ == "__main__":
    main()
