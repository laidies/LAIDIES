# Phone-frame production — 2026-08-31

Status: verified local candidate; deployment/public verification pending.

## Authority and invariants

Ali explicitly authorized phone-sized adaptations after the exact landscape geometry conflict was explained. Built-in ImageGen edit mode, not CLI. Destination: four existing book readers below1200px. No generated text or new motifs. Preserve desktop masters, all title pixels, manuscripts, controls, semantic boxes, continuous scrolling. One seamless raster per edition; no tiled strips, pasted bursts, mouth, cropped computer, obscure text, blue gutters or page-turn controls. The four approved desktop frames are the colour/style authority. The first purple pilot was rejected internally because its computer occupied about25% of the canvas; the targeted refinement narrowed the rail before recolouring.

## Outputs

All paths below are relative to `/Users/alisoneakin/Projects/laidies-library-four-book-colours-20260830/`:

- `assets/library-reader/fundamentals-phone-imagegen-v2.png`
- `assets/library-reader/working-phone-imagegen-v2.png`
- `assets/library-reader/answers-phone-imagegen-v2.png`
- `assets/library-reader/dictionary-phone-imagegen-v2.png`

ImageGen returned948×1660 purple/turquoise and948×1659 pink/blue. Below the upper wedges all rail/motif pixels fit within a conservative149px boundary. Render height100%, intrinsic width, left/top anchored; never cover-crop vertically. Reading inset9dvh+16px(phone) or+24px(tablet). Exact desktop masters and titles remain untouched.

## Exact prompt set

### Purple adaptation

Use case: precise-object-edit. Edit target: attached approved purple library textbook background. Create its faithful PORTRAIT phone counterpart, 1024x1792. This is a responsive adaptation of this exact design, not a redesign. Preserve the same lavender/purple/navy/cyan/pink palette, print halftone textures, diagonal upper-left paper edge and layered triangular wedges, partial cyan/navy comic burst near upper-left, delicate lavender halftone at extreme upper-right. Keep one continuous lavender halftone rail all the way down the LEFT edge. Preserve the same motifs in their same order: pixel cursor, tilted floppy, small pink star, cyan microchip, small white star, retro CRT computer with keyboard near the bottom-left. Scale motifs proportionally smaller to fit a narrow rail, don't distort them. All left artwork including the computer and its shadow must stay inside the LEFT 16% of the canvas; from x=18% to right edge below the top 8% is uninterrupted warm white for live book text. Upper-left wedge may extend farther only within top 6%. Keep the angled paper/halftone integration organic like the original, no pasted rectangles or visible tile joins. Main white page is at least 82% width. No text, title, letters, buttons, boxes, watermarks, extra motifs, mouth, people or right-bottom burst. Full-height portrait background, not a phone mockup, no device frame. Preserve exact drawn object appearance and warm-white centre from the source.

### Purple targeted correction

Edit the attached portrait background ONLY: reduce the width of the entire decorative left border and every motif by about 40%, scaling the objects proportionally (not squashing). Keep their vertical order and overall vertical distribution. The computer currently extends about one quarter of the image width; it MUST end before 15% of image width. Every left decorative pixel below the upper wedges must end before 17%. This is for a narrow phone reading column. Preserve the diagonal paper, top wedges, upper-right halftone, exact colours, textures and object drawings; keep computer near bottom. Extend the white paper into the space vacated by shrinking the motifs. No new objects, text, cropping or seams. Same portrait aspect ratio.

### working

Use case: precise-object-edit. Image 1 is the EDIT TARGET: the new portrait phone book frame. Image 2 is COLOUR REFERENCE ONLY: the approved turquoise/cyan desktop frame. Change ONLY the lavender/purple BORDER COLOURS in image 1 to the matching turquoise/cyan shades from image 2. Match its saturated areas, lighter shades and halftone palette. Preserve image 1's portrait dimensions and exact narrow left rail geometry, all motif sizes/positions/order, white paper shape, upper-left triangular wedges, top-right halftone, navy outlines and cyan screens. Keep every motif within the existing narrow rail, DO NOT enlarge the computer or move objects. Keep the warm-white main page unchanged. No new objects/text/buttons/boxes/people, no cropping, no seams. This must be precisely the same portrait composition, only its border palette changes.

### answers

Use case: precise-object-edit. Image 1 is the EDIT TARGET: the new portrait phone book frame. Image 2 is COLOUR REFERENCE ONLY: the approved bright pink desktop frame. Change ONLY the lavender/purple BORDER COLOURS in image 1 to the matching bright pink shades from image 2. Match its saturated areas, lighter shades and halftone palette. Preserve image 1's portrait dimensions and exact narrow left rail geometry, all motif sizes/positions/order, white paper shape, upper-left triangular wedges, top-right halftone, navy outlines and cyan screens. Keep every motif within the existing narrow rail, DO NOT enlarge the computer or move objects. Keep the warm-white main page unchanged. No new objects/text/buttons/boxes/people, no cropping, no seams. This must be precisely the same portrait composition, only its border palette changes.

### dictionary

Use case: precise-object-edit. Image 1 is the EDIT TARGET: the new portrait phone book frame. Image 2 is COLOUR REFERENCE ONLY: the approved electric blue desktop frame. Change ONLY the lavender/purple BORDER COLOURS in image 1 to the matching electric blue shades from image 2. Match its saturated areas, lighter shades and halftone palette. Preserve image 1's portrait dimensions and exact narrow left rail geometry, all motif sizes/positions/order, white paper shape, upper-left triangular wedges, top-right halftone, navy outlines and cyan screens. Keep every motif within the existing narrow rail, DO NOT enlarge the computer or move objects. Keep the warm-white main page unchanged. No new objects/text/buttons/boxes/people, no cropping, no seams. This must be precisely the same portrait composition, only its border palette changes.

## Verification

Maker inspected all four raster outputs and actual320/390/700px opening/scrolled reader pixels. Source regression passes four previews plus four books at nine widths (320–2560). Full-manuscript DOM Range clearance includes all laid-out text, not only visible opening copy. Injected late-paragraph overlap produced negative clearance and FAIL; missing approved phone source is separately calibrated. Exact candidate/public verification and independent visual verdict are recorded in the release section when completed. No editorial or account-persistence claim is made.

Independent `responsive_frame_plan` inspected nine exact candidate screenshots in
`/tmp/library-phone-frames-review-20260831/`, four same-viewport incumbents and
all four approved masters/new phone assets. Accepted the bounded change: no new
overlap, text/control clipping, repeated rail or rectangular join. Complete
computer and ordered motifs remain visible, prose gains width. The existing
persistent header masks some upper decorative details, as in the incumbent;
this release does not claim every decorative pixel is visible or redesign that
header. The700px comparison was width-matched, not height-matched. Runtime tests
separately cover navigation and every laid-out manuscript text run.

## Exact candidate boundary

Base: recovery's provider-verified `acbbcf86-0e17-4b22-a167-90ea24d58c64`,
`/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/laidies-fairy-portraits.jxzaKS`,
identity `0bf9ca911e8beff9b5b61fb3d9bd05b51968d126d4a0cccc2e5e885ec87705fa`.
Candidate `/tmp/laidies-library-phone-release-20260831`; manifest suffix
`.manifest.json`, delta suffix`.delta.json`;690files/659288857bytes;
identity `42746b50be18859cc17779231bc650577d92a7430dcfd6c0c91f57713dd77c2f`.
Exactly two changed paths (`library.html`,reader CSS), four added phone frames,
684unchanged, zero removed. No desktop/title/content/shared-loader/backend change.
The overlay builder validates every base file and manifest identity before copy.
Wrong/missing phone-source calibration fails all four readers; late-text overlap
calibration fails with negative clearance (~-484px), not a network error.
