from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, LETTER
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads"
ASSETS = ROOT / "public" / "assets"
CANON = ASSETS / "episode-01-canon"
COMIC_BG = ASSETS / "comic-backgrounds" / "episode-01-cheat-sheet-clean-comic-v2.png"

INK = colors.HexColor("#2B1622")
PINK = colors.HexColor("#F04E9B")
YELLOW = colors.HexColor("#FFD84D")
CYAN = colors.HexColor("#63D7E8")
BLUE = colors.HexColor("#5CAEE5")
PURPLE = colors.HexColor("#8357D4")
LAVENDER = colors.HexColor("#C8B5F5")

pdfmetrics.registerFont(TTFont("Jost", str(ROOT / "public/fonts/Jost-Regular.ttf")))
pdfmetrics.registerFont(TTFont("JostSemi", str(ROOT / "public/fonts/Jost-SemiBold.ttf")))
pdfmetrics.registerFont(TTFont("JostExtra", str(ROOT / "public/fonts/Jost-ExtraBold.ttf")))


def wrap(text, font, size, width):
    words, lines, line = text.split(), [], ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def text_block(c, text, x, y, width, font="Jost", size=11, leading=None, color=INK, max_lines=None):
    leading = leading or size * 1.22
    lines = wrap(text, font, size, width)
    if max_lines and len(lines) > max_lines:
        raise ValueError(f"Text does not fit {max_lines} lines at {size}pt: {text}")
    c.setFillColor(color)
    c.setFont(font, size)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def panel(c, x, y, w, h, fill, radius=8, shadow=4, stroke=2):
    if shadow:
        c.setFillColor(INK)
        c.roundRect(x + shadow, y - shadow, w, h, radius, stroke=0, fill=1)
    c.setFillColor(fill)
    c.setStrokeColor(INK)
    c.setLineWidth(stroke)
    c.roundRect(x, y, w, h, radius, stroke=1, fill=1)


def crop_image(c, path, x, y, w, h, focus_x=0.5, focus_y=0.5, zoom=1):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = max(w / iw, h / ih) * zoom
    dw, dh = iw * scale, ih * scale
    dx = x + w / 2 - focus_x * dw
    dy = y + h / 2 - focus_y * dh
    dx = min(x, max(x + w - dw, dx))
    dy = min(y, max(y + h - dh, dy))
    c.saveState()
    clip = c.beginPath()
    clip.roundRect(x, y, w, h, 5)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(image, dx, dy, dw, dh, mask="auto")
    c.restoreState()
    c.setStrokeColor(INK)
    c.setLineWidth(2)
    c.roundRect(x, y, w, h, 5, stroke=1, fill=0)


def contain_image(c, path, x, y, w, h):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (w - dw) / 2, y + (h - dh) / 2
    c.drawImage(image, dx, dy, dw, dh, mask="auto")
    c.setStrokeColor(INK)
    c.setLineWidth(2)
    c.roundRect(dx, dy, dw, dh, 5, stroke=1, fill=0)


def label(c, text, x, y, fill=YELLOW, size=8.5, angle=0):
    w = pdfmetrics.stringWidth(text, "JostExtra", size) + 18
    h = 19
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.setFillColor(INK)
    c.rect(3, -3, w, h, stroke=0, fill=1)
    c.setFillColor(fill)
    c.setStrokeColor(INK)
    c.setLineWidth(1.5)
    c.rect(0, 0, w, h, stroke=1, fill=1)
    c.setFillColor(INK)
    c.setFont("JostExtra", size)
    c.drawString(9, 5.5, text)
    c.restoreState()


def stat(c, value, caption, x, y, width, color=INK, value_size=17, caption_size=8.6):
    c.setFillColor(color)
    c.setFont("JostExtra", value_size)
    c.drawCentredString(x + width / 2, y + 13, value)
    c.setFont("JostSemi", caption_size)
    c.drawCentredString(x + width / 2, y, caption)


def concept(c, x, y, fill, image_path, eyebrow, title, lesson, focus_x=0.55, focus_y=0.58):
    panel(c, x, y, 269, 62, fill, radius=7, shadow=3, stroke=1.7)
    crop_image(c, image_path, x + 8, y + 9, 72, 44, focus_x=focus_x, focus_y=focus_y, zoom=1.62)
    tx = x + 90
    c.setFillColor(INK)
    c.setFont("JostExtra", 8.8)
    c.drawString(tx, y + 47, eyebrow)
    c.setFont("JostExtra", 11.7)
    c.drawString(tx, y + 31, title)
    text_block(c, lesson, tx, y + 14, 167, "JostSemi", 10.5, 11.8, max_lines=2)


def draw_letter(c):
    c.drawImage(ImageReader(str(COMIC_BG)), 0, 0, 612, 792, mask="auto")
    c.setStrokeColor(INK)
    c.setLineWidth(2)
    c.rect(15, 15, 582, 762, stroke=1, fill=0)

    # Header: preserve the complete 16:9 episode title image. Never banner-crop it.
    contain_image(c, ASSETS / "episodes/episode-01.png", 31, 636, 220, 124)
    c.setFillColor(INK)
    c.setFont("JostExtra", 11)
    c.drawString(277, 739, "EPISODE 01")
    c.setFont("JostExtra", 27)
    c.drawString(277, 706, "CHEAT SHEET")
    c.setFont("JostSemi", 11.5)
    c.drawString(277, 681, "THE STORY · THE STATS")
    c.drawString(277, 665, "THE POINT · THE TERMS")

    # The thesis is impossible to miss.
    panel(c, 31, 584, 550, 40, YELLOW, radius=6, shadow=3, stroke=1.8)
    c.setFillColor(INK)
    c.setFont("JostExtra", 9)
    c.drawString(44, 608, "THE POINT")
    c.setFont("JostExtra", 15)
    c.drawString(44, 590, "WOMEN SHOULD NOT WAIT WHILE AI IS BEING SHAPED.")

    # The episode story. The screenshot is visual context only; the lesson is typeset beside it.
    panel(c, 31, 425, 550, 145, CYAN, radius=9, shadow=4, stroke=2)
    label(c, "THE STORY", 43, 545, PINK, size=8.5, angle=-1)
    crop_image(c, CANON / "01-steve-ovation.png", 43, 442, 210, 96, focus_x=0.5, focus_y=0.62)
    c.setFillColor(INK)
    c.setFont("JostExtra", 13.5)
    c.drawString(270, 548, "STEVE GETS THE OVATION.")
    text_block(
        c,
        "Her careful version is still in drafts. He is not smarter; he started using the tool.",
        270,
        529,
        290,
        "JostSemi",
        11.3,
        13.5,
        max_lines=3,
    )
    bullets = [
        "The on-ramp was jargon and hype.",
        "AI became another invisible task.",
        "Waiting lets the participation gap grow.",
    ]
    by = 483
    for bullet in bullets:
        c.setFillColor(PINK)
        c.circle(276, by + 3, 3.2, stroke=0, fill=1)
        text_block(c, bullet, 286, by, 274, "JostSemi", 10.8, 12.5, max_lines=2)
        by -= 20
    label(c, "NOT CONFIDENCE. PHYSICS.", 43, 427, YELLOW, size=8.3, angle=-1)

    # Evidence is separated from the story so numbers cannot collide with illustration.
    panel(c, 31, 368, 194, 44, PINK, radius=7, shadow=3, stroke=1.7)
    stat(c, "25%", "LOWER ADOPTION", 42, 378, 74, value_size=16, caption_size=8.3)
    stat(c, "+14", "POINT FLIP", 126, 378, 85, value_size=16, caption_size=8.3)
    panel(c, 238, 368, 343, 44, LAVENDER, radius=7, shadow=3, stroke=1.7)
    c.setFillColor(INK)
    c.setFont("JostExtra", 9)
    c.drawString(250, 394, "WHY IT MATTERS")
    text_block(
        c,
        "Senior women who began using AI led men peers in technical functions.",
        250,
        379,
        319,
        "JostSemi",
        10.2,
        11.5,
        max_lines=2,
    )

    # Plain-English definition and the episode's memorable line.
    panel(c, 31, 309, 550, 47, BLUE, radius=7, shadow=3, stroke=1.7)
    c.setFillColor(INK)
    c.setFont("JostExtra", 9)
    c.drawString(43, 340, "AI IN PLAIN ENGLISH")
    text_block(
        c,
        "Patterns + context generate a response. It can be useful without being true—or replacing judgment.",
        43,
        323,
        380,
        "JostSemi",
        10.5,
        11.8,
        max_lines=2,
    )
    label(c, "READ EVERYTHING. LIVED NOTHING.", 436, 317, YELLOW, size=7.4, angle=1)

    # The concrete episode win.
    panel(c, 31, 232, 550, 66, PINK, radius=8, shadow=3, stroke=1.7)
    crop_image(c, CANON / "03-first-tiny-win.png", 41, 242, 105, 47, focus_x=0.61, focus_y=0.54, zoom=1.5)
    c.setFillColor(INK)
    c.setFont("JostExtra", 12.5)
    c.drawString(158, 282, "THE FIRST TINY WIN")
    text_block(
        c,
        "She says who it is for, what she needs and what she cannot say directly.",
        158,
        264,
        195,
        "JostSemi",
        10.5,
        11.8,
        max_lines=3,
    )
    stat(c, "4 DAYS", "AVOIDING IT", 356, 256, 68, YELLOW, value_size=12.5, caption_size=7.4)
    stat(c, "9 SEC", "FIRST DRAFT", 426, 256, 68, CYAN, value_size=12.5, caption_size=7.4)
    stat(c, "11 MIN", "REVIEWED + SENT", 496, 256, 74, YELLOW, value_size=12.5, caption_size=7)
    c.setFillColor(INK)
    c.setFont("JostSemi", 7.8)
    c.drawRightString(570, 238, "Episode story timing—not a benchmark.")

    # Four concepts in two readable rows. Images are memory cues, never text containers.
    concept(c, 31, 159, CYAN, CANON / "04-new-hire.png", "WHAT AI IS", "TALENTED NEW HIRE", "Fast—but you manage it.", 0.64, 0.56)
    concept(c, 312, 159, PINK, CANON / "07-carrie-generative-ai.png", "GENERATIVE AI", "CARRIE BRADSHAW", "Creates a fresh draft.", 0.64, 0.56)
    concept(c, 31, 86, BLUE, CANON / "05-cher-context.png", "MISSING CONTEXT", "CHER'S CLOSET", "Only knows what you share.", 0.55, 0.64)
    concept(c, 312, 86, PURPLE, CANON / "06-burn-book.png", "HALLUCINATION", "THE BURN BOOK", "Polished can be wrong.", 0.55, 0.64)

    # One compact, highly legible takeaway.
    panel(c, 31, 42, 550, 32, YELLOW, radius=6, shadow=3, stroke=1.7)
    c.setFillColor(INK)
    c.setFont("JostExtra", 11.2)
    c.drawCentredString(306, 61, "START SMALL · GIVE CONTEXT · KEEP YOUR JUDGMENT")
    c.setFont("JostSemi", 7)
    c.drawCentredString(306, 25, "Sources checked 28 July 2026: HBS Working Knowledge · New York Fed · BCG · Episode 01 final narration + canon")


def build(path, pagesize):
    page_w, page_h = pagesize
    c = canvas.Canvas(str(path), pagesize=pagesize)
    c.setTitle("Episode 01 - On Wednesdays We Do AI Cheat Sheet")
    c.setAuthor("LAiDIES")
    scale = min(page_w / LETTER[0], page_h / LETTER[1])
    c.saveState()
    c.translate((page_w - LETTER[0] * scale) / 2, (page_h - LETTER[1] * scale) / 2)
    c.scale(scale, scale)
    draw_letter(c)
    c.restoreState()
    c.showPage()
    c.save()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    build(OUTPUT / "episode-01-open-the-tab-cheat-sheet-letter.pdf", LETTER)
    build(OUTPUT / "episode-01-open-the-tab-cheat-sheet-a4.pdf", A4)


if __name__ == "__main__":
    main()
