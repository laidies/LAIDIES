from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
SRC=ROOT/'assets/episodes/issue-03'
OUT=Path(__file__).resolve().parent/'.ep03-story-crops'
OUT.mkdir(exist_ok=True)

names=[
 'section-burn-book-problem-v3.png','section-wrong-room-v1.png',
 'section-chutney-thrice-v2.png','section-trust-layers-v4.png',
 'section-dont-pull-a-cher-v1.png','section-read-the-file-v2.png',
 'section-show-your-work-v2.png','section-try-on-receipts-pass-v2.png'
]

for name in names:
 im=Image.open(SRC/name).convert('RGB'); w,h=im.size
 # Dedicated wide details, not arbitrary moving crops: left establishes the
 # claim/source; right lands on the receipt/check/result.
 crop_w=min(w,round(h*16/9))
 for label,x in [('claim',0),('receipt',w-crop_w)]:
  box=(max(0,x),0,max(0,x)+crop_w,h)
  detail=im.crop(box).resize((1920,1080),Image.Resampling.LANCZOS)
  detail.save(OUT/f'{Path(name).stem}-{label}.png',optimize=True)
 print(name)
