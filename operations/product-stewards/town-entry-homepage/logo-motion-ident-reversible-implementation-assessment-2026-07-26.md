# Homepage / Start Here logo-motion ident assessment

**Status:** BUILT LOCALLY — ASSESSMENT ONLY / NOT INTEGRATED / NOT PUBLIC  
**Evidence time:** 2026-07-26 America/Vancouver  
**Acceptance owner:** Town Entry for page behaviour; Brand & Experience for
placement, visual treatment and motion rules  
**Authority:** Read-only asset and route assessment. No live-route, shared
token, deploy, publish or campaign mutation.

## Exact selected candidate

- Asset:
  `operations/design-explorations/laidies-motion-ident-20260725/continuous-i-alternate-rewind-ai-v6.mp4`
- SHA-256:
  `713c576b2f6468fe4df962acd2c4d48163391899f99c9a2bfc187cc795ae0ed6`
- Local metadata: H.264 MP4, 960 × 540, 16:9, 5.1667 seconds,
  3,258,002 bytes, approximately 5,037 kb/s, no audio bitrate or audio codec
  reported.
- Visual inspection used the exact matching contact sheet and still. The
  composition keeps the LAiDIES wordmark centred while edge words and comic
  rays intentionally occupy the full 16:9 frame.

Ali has selected this as a candidate for possible website use. Selection is
not a Brand placement/behaviour ruling and is not integration approval.

**Ali sequence ruling, 2026-07-26:** do not integrate the motion ident or
advance a new Homepage visual treatment until the sitewide Brand direction is
selected. The Brand championship may use this exact candidate as an
input/specimen. Until then Town Entry may preserve this reversible assessment
and continue existing nonvisual release-truth work only.

## Recommendation

### Homepage

Use the ident, if Brand admits it, as a **secondary hero media region** beside
the existing promise and three entry actions on wide screens, and after those
same actions in document order on compact screens. It must not become:

- a splash screen;
- a full-page gate;
- a background underneath essential copy;
- a replacement for the practical-AI promise or entry actions;
- a new global visual token or a signal that every destination is ready.

This is preferable to a full-bleed hero background because the selected
composition has a centred wordmark and meaningful edge art. Overlay copy would
fight the wordmark, while narrow `cover` crops would remove much of the authored
frame. A bounded media region lets the entire ident remain legible and keeps
the accepted functional hierarchy intact.

### Start Here

Do **not** animate the ident on `/start-here.html`. Start Here is a small,
single-purpose readiness doorway; additional motion would add load and
attention without helping the visitor check the Welcome Wagon status. If Brand
requires identity continuity there, use the exact approved static poster as a
small, non-LCP wordmark treatment only. The readiness status, ordinary
Visitor's Centre link and fail-closed receiver must remain unchanged.

## Playback and control contract

1. Render a static poster immediately with explicit `width`, `height` and
   `aspect-ratio`; the page promise and actions render independently.
2. When `prefers-reduced-motion: no-preference`, the media is in or near the
   viewport, and essential page work has completed, request the video and play
   it **once** with `muted` and `playsinline`.
3. Do not loop. Do not add audio. Do not unmute. A denied autoplay promise is a
   normal static-poster state, not an error.
4. Provide a visible, keyboard-operable control labelled by current action:
   `Pause logo animation` while playing and `Replay logo animation` when
   paused/ended. The control must retain visible focus and at least a 44 × 44 px
   target.
5. A visitor-initiated pause suppresses further automatic playback for that
   page session. Any stored preference is device-local presentation only and
   must not enter analytics, identity, Card, reward or cross-device claims.
6. The animation is decorative brand motion. Give the video an empty accessible
   name or hide the moving layer from assistive technology; retain one adjacent
   text LAiDIES identity, never duplicate a spoken logo on every replay.

## Reduced motion and failure

- Under `prefers-reduced-motion: reduce`, do not request or autoplay the video.
  Show the exact approved static poster.
- If video fetch, decode, autoplay or playback fails, keep the poster and hide
  any unusable Pause control. No page status announcement is needed unless the
  user explicitly pressed Replay.
- If Replay fails after an explicit action, keep the poster, change the control
  to `Try logo animation again`, and return focus to it.
- No loading spinner, countdown or modal is permitted. Motion failure cannot
  change current-content, destination readiness, navigation or Card state.

## Responsive and crop contract

- Preserve the complete 16:9 composition with `object-fit: contain`; do not use
  `cover` at 320 or 390 px.
- Keep the wordmark and edge vocabulary visible at 320, 390 and 1440 px. If
  Brand wants a full-bleed narrow-screen treatment, it must supply and approve
  a separate authored mobile crop; CSS cropping this master is not acceptable.
- Reserve the frame before load to prevent layout shift.
- At 200% zoom/reflow, keep the media after the promise/actions in document
  order, never beside them at a width that shrinks text or controls.
- The static poster must remain intelligible when the video never loads.

## Performance and no-content-delay rule

The selected 3.26 MB / 5.17 s source is suitable for visual assessment but is
too expensive to add unconditionally to the first-door critical path.

- Do not preload the MP4. Use `preload="none"` and a lightweight poster.
- Do not make the video the Homepage LCP candidate.
- Do not wait for video metadata, decode, autoplay or a JavaScript observer
  before showing the promise, three entry actions, visitor state, current
  content or readiness status.
- Start optional loading only after essential DOM/content readiness and when
  the media is near the viewport. Data-saver or constrained-network states stay
  on the poster.
- Before integration, create checksum-bound delivery derivatives from this
  approved master rather than overwriting it. Proposed budgets for Brand and
  Performance admission: poster ≤100 KB; mobile video ≤1.0 MB; desktop video
  ≤1.8 MB; preserve 16:9, colour and the complete sequence.
- Re-measure mobile/desktop transferred bytes, LCP, CLS, INP/TBT proxy and
  decode/play failure on the exact route artifact. A local MP4 hash alone is
  not performance evidence.

## Reversible implementation shape

If Brand supplies exact rules, implement one isolated `<figure>` component in
the Homepage hero only:

- a poster `<picture>`;
- a nonessential `<video muted playsinline preload="none">`;
- one Pause/Replay button;
- a tiny route-local controller that can be removed without changing hero
  copy, actions, readiness/current receivers, shared tokens or destination
  prose.

No global CSS custom property, shared-header script, directory contract or
Start Here receiver should depend on the component. Rollback is removal of the
figure/controller and restoration of the frozen hero layout; current content
and navigation remain operational throughout.

## Required admission evidence

1. **Brand & Experience:** exact Homepage placement, scale, background,
   poster frame, once/loop ruling, control appearance and whether Start Here
   gets any static identity treatment.
2. **Town Entry maker:** isolated reversible prototype at 1440/390/320,
   reduced-motion, autoplay-denied, fetch/decode failure, keyboard,
   200%-reflow and no-JS/poster states.
3. **Independent UX/accessibility judge:** hierarchy preserved; Pause/Replay,
   focus, reduced motion, reading order and static fallback accepted.
4. **Performance judge:** exact derivative hashes and transfer/decode/LCP/CLS
   evidence; no essential content or readiness delay.
5. **Town Entry acceptance owner:** checksum-bound route verdict after Brand
   and independent receipts. Any asset, poster, derivative, route or behaviour
   hash change requires reseal.

## Current gate and exact next trigger

**HOLD FOR SITEWIDE BRAND DIRECTION, THEN BRAND RULES — BUILD REMAINS
REQUIRED.** No Ali decision is requested by Town Entry at this assessment
stage. The first exact trigger is selection of the sitewide Brand direction.
The second is a Brand & Experience handoff naming the approved placement and
behaviour tuple for SHA `713c576b...0ed6`. Only after both may Town Entry build
the isolated, reversible Homepage-only component and dispatch independent
acceptance. Do not integrate, deploy, publish or describe the ident as the
public logo before those gates.
