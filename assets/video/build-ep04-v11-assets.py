from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path('/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage')
OUT = ROOT / 'assets/video/comic-interstitials-v1'
BG = OUT / 'laidies-comic-page-bg-v1.png'
W, H = 1920, 1080

CREAM = '#fff5d8'
PINK = '#fa5e9d'
PLUM = '#50143f'
TEAL = '#55bdd0'
GOLD = '#f7b83f'


def font(path, size, index=0):
    return ImageFont.truetype(path, size, index=index)


ROUND = '/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf'
CONDENSED = '/System/Library/Fonts/Avenir Next Condensed.ttc'


def base():
    return Image.open(BG).convert('RGB').resize((W, H), Image.Resampling.LANCZOS)


def centered(draw, xy, text, fnt, fill, stroke=0, stroke_fill=None):
    draw.text(xy, text, font=fnt, fill=fill, anchor='mm', align='center',
              stroke_width=stroke, stroke_fill=stroke_fill)


# Question one: mixed case, two deliberate lines, no redundant speaker label.
im = base()
d = ImageDraw.Draw(im)
d.rounded_rectangle((225, 170, 1695, 910), radius=54, fill=CREAM, outline=PINK, width=12)
centered(d, (W/2, 390), "I couldn't help but wonder.....", font(ITALIC, 88), PLUM)
centered(d, (W/2, 635), 'is it actually new?', font(ROUND, 146), PINK, 7, PLUM)
im.save(OUT / 'ep04-wonder-question-1-v4.png')

# Question two deliberately uses a different, punchier treatment.
im = base()
d = ImageDraw.Draw(im)
d.rounded_rectangle((270, 235, 1650, 825), radius=68, fill=PLUM, outline=PINK, width=14)
centered(d, (W/2, 530), 'WHO BUILT IT!', font(CONDENSED, 190, 9), CREAM, 5, TEAL)
im.save(OUT / 'ep04-wonder-question-2-v4.png')

# Static-background, cumulative whole-glyph reveal. Every frame retains all prior letters.
word = 'LAiDIES.AI'
logo_font = font(ROUND, 214)
probe = ImageDraw.Draw(Image.new('RGB', (1, 1)))
widths = [probe.textlength(ch, font=logo_font) for ch in word]
tracking = 7
total = sum(widths) + tracking * (len(word) - 1)
start_x = (W - total) / 2
colors = [CREAM, TEAL, PINK, CREAM, CREAM, CREAM, CREAM, PINK, CREAM, TEAL]

for count in range(1, len(word) + 1):
    im = base()
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((255, 220, 1665, 855), radius=58, fill=PLUM, outline=PINK, width=12)
    x = start_x
    for i, ch in enumerate(word):
        if i < count:
            d.text((x, 535), ch, font=logo_font, fill=colors[i], anchor='lm')
        x += widths[i] + tracking
    im.save(OUT / f'ep04-laidies-ai-build-v2-{count:02d}.png')
