# Episode 04 Firefly motion proof — Ada

Date: 2026-07-23  
Status: QA complete; qualified production candidate pending owner visual approval  
Spend ceiling: US$0 for this first proof

## Source

`assets/episodes/ep-04/pixel/ep04-scene-03-ada-comic-v4-timnit-style-lock-black-gloves-1920.png`

Why this frame:

- It is the Ada frame currently used in the Episode 04 cut.
- It simultaneously tests face, hands/gloves, period wardrobe, detailed machinery,
  practical light, rain, and the gold musical-note effect.
- Existing `ep04-scene-03-ada-loop-v1.mp4` provides a direct comparison point.

## Locked motion brief

Bring this exact comic/pop-art illustration subtly to life while preserving the
source image. Ada remains completely still: do not change her face, eyes, hair,
body, hands, gloves, clothing, expression, pose, or proportions. Do not move the
camera and do not crop, pan, zoom, drift, or add parallax. Animate background and
environment only: gentle rain travels down the window, candle flames flicker
subtly, the Analytical Engine gears rotate slowly and mechanically, and the
existing gold musical-note thread emits a restrained soft pulse. Add no new
objects, people, text, or effects. Preserve the exact colour palette, linework,
composition, historical setting, and 16:9 frame. The result should feel like a
living editorial illustration, not full animation. Silent. Seamless loop if the
model supports it.

## Intended output

Save beside the approved source frame:

`assets/episodes/ep-04/pixel/ep04-scene-03-ada-veo31fast-background-motion-proof-v1.mp4`

Do not replace or overwrite `ep04-scene-03-ada-loop-v1.mp4`.

## Actual generation

- Service: Adobe Firefly Generate Video
- Model: Google Veo 3.1 Fast partner model
- Resolution: 720p
- Aspect ratio: 16:9
- Frame rate: 24 fps
- Duration: 8 seconds
- Audio: off
- Seed: `502004`
- Cost: free daily generation; no credits or subscription purchased
- Remaining free daily generations after this proof: 1
- Content Credentials shown by Firefly: recorded by Adobe; source model Google

### Firefly upload sequence

The working upload sequence in Firefly is:

1. Select the **First** frame control.
2. In the Firefly pop-up, select **This device**.
3. The macOS file-selection window then opens; choose the approved source frame.

`Command-Shift-G` does not open anything before **This device** is selected,
because the macOS file-selection window does not yet exist.

## Saved output

The original Firefly download remains in `Downloads`. A non-overwriting project
copy was saved to:

`assets/episodes/ep-04/pixel/ep04-scene-03-ada-veo31fast-background-motion-proof-v1.mp4`

SHA-256:
`472d91fb28250381bc9ed7ffe3aa1f1b989882941e9fad4a738fadb909e39132`

## QA result

| Test | Result | Evidence |
|---|---|---|
| Face and body stability | Qualified pass | Ada remains recognizably consistent and high quality. Veo adds a slight head/eye movement and blink, so it does not follow the “completely still” instruction literally. |
| Hands and wardrobe | Pass | Black gloves, fingers, punch card, dress, veil, silhouette, and proportions remain coherent throughout. The hands and card sway slightly without collapsing or changing finger count. |
| Background-only control | Qualified pass | Rain, candlelight, machinery, and the gold musical thread animate successfully. Ada also has restrained natural movement. |
| Composition | Pass | No meaningful camera pan, crop, zoom, or parallax drift was found. No new person, object, or text appears. |
| Art direction | Pass | The blue, black, and gold comic/editorial treatment and detailed linework remain stable. |
| Loop/edit usefulness | Pass for editing; not a seamless loop | All eight seconds are clean and usable. The first and last frames differ (`SSIM 0.844`), so use the clip in the episode timeline or finish it with a short dissolve rather than hard-looping it. |
| Export | Pass | H.264 High, 1280 × 720, 24 fps, exactly 8.00 seconds, 192 frames, approximately 6.7 Mb/s, no audio stream, full decode passed. |
| Cost | Pass | Free daily generation; no subscription, credits, or third-party permission purchase. |
| Release rights | Qualified pass | Adobe says Firefly outputs may be used in commercial projects, including beta features unless the product says otherwise. Adobe separately states that partner models are not developed by Adobe and the user is responsible for deciding whether the model is appropriate. Do not describe Veo output as Adobe commercially safe or indemnified. |

Whole-frame SSIM against the approved source averaged `0.872`; the first frame
was `0.934` and the end frame `0.869`. These figures confirm visible motion and
are not a substitute for the face, hands, and wardrobe review above.

### Comparison with the existing Ada loop

The existing `assets/episodes/ep-04/clips/ep04-scene-03-ada-loop-v1.mp4`
is 1920 × 1080 and five seconds long, but it introduces a large character and
camera shift, visibly changes Ada's face and posture, and expands the musical
notes into oversized foreground graphics. The Firefly/Veo proof is materially
more controlled and is the stronger production candidate despite its 720p
delivery resolution.

## Evidence

- `ada-veo31fast-contact-sheet-1fps.png`
- `ada-veo31fast-face-contact-2fps.png`
- `ada-veo31fast-hands-contact-2fps.png`
- `ada-existing-loop-contact-sheet-1fps.png`
- `frames/ada-veo31fast-frame-01.png` through
  `frames/ada-veo31fast-frame-09.png`
- `ada-veo31fast-ssim-vs-source.log`

Commercial-use references:

- [Adobe Firefly FAQ](https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/adobe-firefly-faq.html)
- [Adobe partner-model guidance](https://helpx.adobe.com/creative-cloud/apps/generative-ai/non-adobe-models-in-adobe-products.html)

## Decision

Do not spend the remaining free generation yet. Show this proof to the owner.
If the slight blink, head movement, and hand/card sway are acceptable, approve
Veo 3.1 Fast as the first motion candidate and test it on two additional,
deliberately different Episode 04 frames before committing to a full rollout.
If the owner requires absolute subject stillness, use a masked local
environmental-motion workflow rather than repeatedly asking a generative model
to freeze the character.
