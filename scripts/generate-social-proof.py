from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "social" / "generated" / "issue-01-brand-proof"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1350

INK = "#100805"
MUTED = "#65515d"
PAPER = "#fff8fc"
MIST = "#fce4f2"
TEAL = "#247b83"
PLUM = "#3a0928"
GOLD = "#c9a84c"
HOT = "#ff2d9b"
WHITE = "#ffffff"


def font(size, bold=False, serif=False):
    candidates = []
    if serif:
        candidates = [
            "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf",
            "C:/Windows/Fonts/timesbd.ttf" if bold else "C:/Windows/Fonts/times.ttf",
        ]
    else:
        candidates = [
            "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
            "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def text_size(draw, text, fnt):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        trial = f"{line} {word}".strip()
        if text_size(draw, trial, fnt)[0] <= max_width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_multiline(draw, xy, text, fnt, fill, max_width, line_gap=10):
    x, y = xy
    for paragraph in text.split("\n"):
        lines = wrap(draw, paragraph, fnt, max_width) if paragraph else [""]
        for line in lines:
            draw.text((x, y), line, font=fnt, fill=fill)
            y += text_size(draw, line or "Ag", fnt)[1] + line_gap
        y += line_gap
    return y


def rounded_rect_shadow(base, xy, radius=8, fill=WHITE, outline=INK, width=3, shadow_offset=(8, 8)):
    draw = ImageDraw.Draw(base)
    x1, y1, x2, y2 = xy
    sx, sy = shadow_offset
    draw.rounded_rectangle((x1 + sx, y1 + sy, x2 + sx, y2 + sy), radius=radius, fill=INK)
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_doodles(draw, area):
    x1, y1, x2, y2 = area
    motifs = ["♡", "☆", "✦", "☎", "✧", "♡", "☆", "✦"]
    f = font(34, bold=True)
    x = x1 + 28
    y = y1 + 22
    i = 0
    while y < y2:
        draw.text((x, y), motifs[i % len(motifs)], font=f, fill=(255, 45, 155, 110))
        x += 120
        if x > x2 - 50:
            x = x1 + 52
            y += 72
        i += 1


def paste_cover_image(base):
    art_path = ROOT / "assets" / "ugh-as-if.png"
    art = Image.open(art_path).convert("RGB")
    crop_w = int(art.width * 0.58)
    crop_h = int(art.height * 0.88)
    crop = art.crop((int(art.width * 0.33), int(art.height * 0.04), int(art.width * 0.33) + crop_w, int(art.height * 0.04) + crop_h))
    crop.thumbnail((430, 520), Image.Resampling.LANCZOS)
    frame = Image.new("RGB", (crop.width + 28, crop.height + 28), WHITE)
    mask = Image.new("L", frame.size, 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle((0, 0, frame.width, frame.height), radius=8, fill=255)
    frame.paste(crop, (14, 14))
    shadow = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle((0, 0, frame.width, frame.height), radius=8, fill=(16, 8, 5, 255))
    base.paste(shadow.convert("RGB"), (620, 425))
    base.paste(frame, (606, 411), mask)


def draw_wordmark(draw, x, y, scale=1.0, light=False):
    script = font(int(48 * scale), bold=True, serif=True)
    sans = font(int(42 * scale), bold=True)
    color = HOT if light else PLUM
    draw.text((x, y), "l", font=script, fill=color)
    lx = x + text_size(draw, "l", script)[0] - int(2 * scale)
    draw.text((lx, y + int(4 * scale)), "AI", font=sans, fill=WHITE if light else HOT)
    aix = lx + text_size(draw, "AI", sans)[0] - int(2 * scale)
    draw.text((aix, y), "dies", font=script, fill=color)


def make_cover():
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    draw.rectangle((0, 0, W, 210), fill=INK)
    draw_doodles(draw, (0, 0, W, 210))
    draw_wordmark(draw, 62, 55, scale=1.25, light=True)
    draw.text((64, 142), "GIRL POWER MEETS MACHINE POWER", font=font(22, bold=True), fill=(255, 255, 255))

    draw.rectangle((0, 210, W, H), fill=PAPER)
    draw.ellipse((-160, 260, 420, 840), fill=MIST)
    draw.ellipse((780, 245, 1180, 660), fill="#e9f7f8")

    rounded_rect_shadow(img, (64, 300, 970, 1202), fill="#fffdf8", width=4)
    draw.rectangle((64, 300, 970, 372), fill=INK)
    draw.text((96, 323), "ISSUE 01 / ON WEDNESDAYS WE USE AI", font=font(24, bold=True), fill=HOT)

    paste_cover_image(img)

    eyebrow = "START HERE"
    draw.text((104, 430), eyebrow, font=font(26, bold=True), fill=TEAL)

    headline = "5 tiny ways to try AI this week without taking a course."
    y = draw_multiline(draw, (104, 482), headline, font(78, bold=True, serif=True), PLUM, 545, line_gap=5)

    draw.rounded_rectangle((104, y + 20, 472, y + 82), radius=8, fill=HOT, outline=INK, width=3)
    draw.text((126, y + 37), "small sips. big moves.", font=font(25, bold=True), fill=WHITE)

    draw.line((104, 1124, 885, 1124), fill=INK, width=3)
    draw.text((104, 1152), "Save this for the friend learning AI between meetings.", font=font(30, bold=True), fill=INK)
    draw.text((104, 1200), "@we.are.laidies", font=font(24, bold=True), fill=HOT)

    img.save(OUT / "issue-01-carousel-proof-slide-1.png")


if __name__ == "__main__":
    make_cover()
    print(OUT / "issue-01-carousel-proof-slide-1.png")
