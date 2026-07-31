# Cycle 9 master logo motion placement

Status: **SUPERSEDED — DO NOT USE FOR REVIEW**

Evidence date: 2026-07-30 (America/Vancouver)

Ali rejected this embedded Method-column placement because it was wider than
the rest of its column and required a manual Play action. The card was removed.
The controlling successor is the once-per-session masthead arrival frozen at
`evidence/hero-arrival-session-v1/review-tuple/`, manifest SHA-256
`b6cafb88834966d9705e8ef45e422e5ea010f02a8eaa644590e14bd95d65a886`.

## Placement

The approved master LAiDIES logo animation now occupies the existing visual slot
inside **How LAiDIES works**. It does not replace, resize, crop, darken, or compete
with the full-width Homepage masthead, and it does not add another Homepage
section.

## Bound source

- Motion master:
  `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10.mp4`
- Motion master SHA-256:
  `05a52c003ecf0b0caad7dcdb9c056da3b77dd9ee27d9dc67ee0aa7eaf2c1ffa3`
- Static poster:
  `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10-still.png`
- Static poster SHA-256:
  `3f5cd8185cd6dbf31bd133c48b80ae8e77a4c7f4fbb709f95de883dca2cc2df8`

No trailer or episode-specific logo master was changed.

## Behaviour

- Muted by default and always; no autoplay audio.
- Starts once only when at least 55% of the card enters the viewport.
- Stops when it leaves the viewport.
- Clear Play, Pause, and Replay states remain available.
- `prefers-reduced-motion: reduce` disables automatic playback and presents the
  approved poster until the visitor explicitly presses Play.
- The video uses `object-fit: contain` in a fixed 16:9 frame, so the logo is not
  cropped.
- The `<video>` contains the approved poster and an inline poster-image fallback.

## Responsive verification

Desktop at 1440 × 900:

- full-width masthead remained 1440 px wide;
- page scroll width and client width both measured 1440 px;
- motion card measured 377.375 × 288.023 px;
- video measured 373.375 × 210.023 px, muted, `object-fit: contain`;
- once-only playback completed and changed to the Replay state.

Mobile at 390 × 844:

- full-width masthead remained 390 px wide;
- page scroll width and client width both measured 390 px;
- motion card measured 302 × 271.898 px;
- video measured 298 × 167.625 px, muted, `object-fit: contain`;
- playback began only when the card entered view and changed to Replay on finish;
- caption and control stack to the full card width.

## Evidence

- Desktop:
  `evidence/logo-motion-placement/homepage-logo-motion-desktop-1440.png`
  — SHA-256 `dad150d4dc55ceeca30467ef9c137534c162ffc41ad70a15c045e7ce03634226`
- Mobile:
  `evidence/logo-motion-placement/homepage-logo-motion-mobile-390.png`
  — SHA-256 `4ece2a9d2cc1781596333555e03bd9700e6d88ef6ef679e9dd5ffcd692481e91`

## Changed local candidate files

- `preview.js` — SHA-256
  `dff7915e0adf3986f567b52d41fe02f7f860d63bf580cb7d48d87fb747a958da`
- `candidate.css` — SHA-256
  `36ea27cc139c17632431493f935b4452d0182b753fdd5e023d572bd65cb3a853`
- `index.html` — SHA-256
  `059ac7e97e32143e4ba81de30356788271b28fe3b83269d7b4b3c10f020177bd`

No production, shared, release, deploy, or public bytes were changed.
