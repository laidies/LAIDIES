# Episode 04 existing cover reuse — independent verdict

**Verdict:** `ACCEPT — EXACT EXISTING COVER FOR THE THREE DIGITAL COVER JOBS`  
**Confidence:** `CERTAIN` for title/canon, existing visual identity and 16:9
Screening Room suitability; `LIKELY` for arbitrary operating-system Media
Session presentation because the repository test observes metadata wiring, not
every device's crop policy.  
**Date:** 2026-08-03  
**Judge scope:** exact-byte admission judgment and integration contract only.
No source, asset, registry, runtime manifest, builder, shared operations,
Control Room, deployment or publication file was changed.

## Decision

Accept this already-existing Episode 04 cover instead of inventing a new VHS
derivative:

| Field | Exact identity |
|---|---|
| Path | `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png` |
| SHA-256 | `63fdfefdd8db6ab9f42b04b60b2178ca2f38f2a67fad43a170f98ff176180f45` |
| Bytes | `3421504` |
| Raster | `1920 × 1080`, PNG, RGB, no alpha |
| Current production use | Episode 04 issue cover through `issues/issue-04.html` and `content/issue-feature-v2.css` |
| Current public-asset status | `UNREGISTERED_DEFAULT_DENY`; no active-registry row and no runtime-family row |

The accepted jobs are deliberately digital and 16:9:

1. Screening Room held `cover-only-audio` static picture;
2. Episode 04 `screening-room-derived-editions.json` cover source, replacing
   every narration-specific visual occurrence while that edition remains
   explicitly held; and
3. Media Session artwork for the same cover-only audio programme.

This verdict supersedes only the *proposed need to make a new Episode 04 VHS
cover for those three jobs*. It does not reverse the prior rejection of
`assets/sunnyvaile-interiors/episode-vhs-boxes/ep-04.webp` SHA-256
`5b875512b0a080a3ed7fcbf810767b566636f1bf704176ed72c1125295cc0eb8`.
That byte remains held historical evidence and must acquire zero public-package
edges after integration.

It also does **not** admit the 16:9 title card as the physical Chick Flicks
tape/shelf object. The exact image has no VHS silhouette, spine, alpha or
portrait geometry and therefore cannot replace `CF-TAPE-04` in that separate
job. If the shelf still requires a physical tape, its live state must remain
held or receive a separately ruled object treatment; the three digital jobs do
not justify new art.

## Why this is the right reuse

Ali's latest direct instruction is exact: reuse the existing episode cover and
do not reinvent it. That instruction is consistent with the repository's
strongest product evidence:

- `operations/product-stewards/blend-snap/VISUAL-ASSET-INVENTORY.md` binds the
  same path as `ep04-title`, calls it the canonical `1920×1080` title card,
  returns `KEEP`, and records that Ali selected exact episode title art;
- `design-qa.md` names the same path as the Episode 04 issue-cover source;
- `issues/issue-04.html` and `content/issue-feature-v2.css` already use the
  exact byte for the actual Episode 04 issue; and
- the 2026-07-21 production delivery identifies it as one of the four
  deliberately produced 1920×1080 episode title cards. The delivery's old
  warning against wiring title cards into VHS boxes does not conflict with
  this verdict: this judgment does not turn it into a VHS box.

The prior independent VHS verdict said an existing title card could not be
treated as automatic cover authority. It was correct on the evidence then in
front of it. Ali's later exact reuse instruction supplies the missing owner
direction for this already-produced cover and removes the reason to commission
a new digital cover. The title card still needed this checksum-bound judgment
before registry or runtime integration; existence alone did not admit it.

## Canon, copy and visual-identity judgment

**PASS.** Direct inspection of the exact bytes shows the complete visible copy
`The Founding Mothers` and `Episode Four`. That agrees with:

- `content/episodes/episode-04.canon.md` SHA-256
  `5c6aa72aaeaa17041ba0c5755b42965c4d6a1da2fb424dd26e5cf261ff2a`;
- `content/episodes/episode-04-cues.json` SHA-256
  `8cd20dc34aeada067262fdde797308e370749194a560cc9d8878d092cc60baf6`;
- `content/episode-index.json` SHA-256
  `f66bd71b2270365864bef27594e61c6472a363bb18f60939327aa93a5c3f0321`;
  and
- `content/episodes/issue-04.json` SHA-256
  `8f111c1b7c52293c7b3220995770ff79f2d909a1db0c0a464efe5960da54e054`.

It contains none of the rejected episode label `EVERY SLAiYER NEEDS A WATCHER`.
The object-led composition—open record book, moth, gear, punched card, pen and
slide-rule/calculating motif—supports the episode's history-of-computing
identity without depicting or inventing a real historical woman's likeness.
Its energetic comic-cover lettering and mechanical-to-computational collage
are consistent with the episode visual system's title/collage job. It does not
claim film, release, approval or availability inside the art.

This is an existing approved visual identity, not new visual production. No
real-person-reference gate is triggered because the cover contains no person.

## 16:9 static-cover and legibility judgment

**PASS.** The source is natively `1920×1080` and exactly matches the Screening
Room's `16 / 9` stage. At a `320×180` representative reduction, the full title,
`Episode Four`, moth and mechanical motifs remain recognizable and the full
title remains readable. A conservative simulation of the current scene CSS's
approximately six-percent overscan at `320×180` still retains readable `The
Founding Mothers` and `Episode Four`; the right edge becomes tight but does not
erase the programme identity.

Integration should nevertheless remove the generic held-scene overscan for
this cover-only edition and render the accepted cover at `inset: 0; width:
100%; height: 100%; object-fit: contain` (or an equivalent exact no-crop cover
class). That is a presentation correction, not a new image or derivative. The
static picture must remain static: no pan, zoom or simulated motion. The live
copy must remain:

- `Cover-only audio edition · static cover · read-along captions`; and
- `This is a held cover-only audio edition. It is not an illustrated motion
  film or a narration-specific visual sequence.`

The title card's acceptance does not admit Episode 04's film, cue imagery,
motion, narration relevance, captions, or complete episode master.

## Media Session judgment

**ACCEPT WITH A DEVICE-PRESENTATION LIMIT.** The same exact cover is suitable
as Media Session artwork because it carries the correct programme title and
the current `configureMediaSession` function separately supplies the complete
accessible metadata title `Episode 04 · The Founding Mothers`, artist
`LAiDIES`, and album `The Wednesday Tour · Season 1`.

A centred `180×180` crop retains the moth, book/mechanical motif and a large
part of the distinctive title treatment, but it clips some visible title
letters and `Episode Four`. Therefore:

- the exact 16:9 file may be supplied unchanged as artwork;
- the full programme identity must continue to come from the separate
  `MediaMetadata.title`, never from an assumption that every system shows the
  whole raster; and
- no claim is made that macOS, iOS, Android, Windows or every browser will crop
  or letterbox it identically. A real-device lock-screen/control-centre check
  remains post-integration presentation evidence, not a prerequisite for
  admitting the source byte.

Do not make a square crop or a new VHS/square derivative merely to satisfy this
job. If a future platform proves the rectangular art unusable, that is a
separate evidence-triggered derivative decision.

## Source and rights status

**Scoped source/rights PASS; no legal conclusion.** The exact file is a
LAiDIES project-produced title card recorded in
`operations/production-batch-20260721-delivery.md`, not a downloaded stock,
film/TV still, public-figure likeness or third-party logo. The accepted raster
contains no identifiable person and no visible third-party brand mark. Ali's
latest exact reuse instruction authorizes this existing project cover for the
bounded product jobs judged here.

I did not find a standalone model/tool-generation receipt or legal opinion for
the byte. This verdict therefore records `PROJECT-PRODUCED / OWNER-DIRECTED
REUSE / NO EXTERNAL SOURCE OR IDENTIFIABLE LIKENESS OBSERVED`; it does not
claim exclusive copyright, trademark clearance or general sublicensing
authority. The admission scope below must remain narrow.

## Exact admitted scope

Use this text, or a semantically identical tighter record, in the active-asset
registry:

> Exact Episode 04 `The Founding Mothers` 1920×1080 digital cover only: existing
> issue-page cover; Screening Room held cover-only-audio static picture;
> Episode 04 cover-only derived-edition cover source; and Media Session artwork
> for that same held audio programme. Static/no-crop presentation, with full
> accessible title supplied in live UI and MediaMetadata. No Chick Flicks VHS
> tape/shelf geometry, no admitted-film poster authority, no narration-specific
> cue authority, no motion, no person/likeness reference, no social, feed,
> podcast, YouTube, merchandise, template or general episode-art authority.

Suggested role: `episode.04.cover.digital`. The exact path and SHA above are
mandatory. Registry admission does not change the underlying Episode 04
format from `hold` and does not make the asset public until the builder,
deployment and public-origin gates separately pass.

## Exact integration actions

One integration owner should make the following atomic source change after
accepting this verdict:

1. Add the exact registry row above to
   `operations/assets/active-asset-registry.json`, binding this verdict's path
   and SHA as authority.
2. Change only Episode 04 in `watch.html`:
   `HELD_VISUAL_COVERS['04']` becomes
   `/assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png`. Preserve the
   existing exact Media Session title/artist/album and ensure the MIME resolves
   to `image/png`.
3. Give the cover-only scene an exact no-crop static presentation. Do not alter
   normal cue-image presentation and do not animate this image.
4. Change only Episode 04's `cover` in
   `content/episodes/screening-room-derived-editions.json` to the same URL;
   regenerate and bind the new `artifactCueSha256`. Preserve
   `kind: cover-only-audio`, the removed semantics, and
   `HOLD — derived fallback only; not visual or title admission`.
5. Remove the rejected VHS path from the builder's explicit runtime seed only
   after the checked-in and transformed source graph has zero public-package
   references to it. Add the accepted title-card path to the checksum-bound
   runtime-family member set for the Screening Room/Media Session dynamic job
   if the builder cannot prove that runtime edge from the issue-page static
   reference alone. Do not add a second copy or new raster.
6. Update `scripts/test-screening-room-browser.mjs` so Episode 04 Media Session
   artwork must end in `/ep04-title-card-comic-v2.png`, must use the exact
   canonical metadata title, and must remain the only cover-only visual.
   Update `scripts/test-screening-room-contract.mjs` to bind the new URL and
   regenerated derived hash.
7. Regenerate the public-asset inventory, prove the accepted title-card SHA is
   `ACTIVE`, prove the rejected VHS SHA/path has zero public-package edges, run
   builder/inventory exact-set parity, and keep the default-DENY builder
   calibrated with a deliberate unregistered-path failure.
8. Run the Screening Room contract and browser suites at desktop and 320px,
   including the static cover, exact title, no crop/animation, captions below
   the image, failure state and Media Session metadata. Then perform the
   bounded real-device Media Session presentation check.

These are integration requirements, not changes performed by this judge.

## Fail calibration

The visual gate was calibrated against the rejected incumbent, not merely
applied to the accepted image:

| Deliberately bad input | Required gate | Observed failure |
|---|---|---|
| `assets/sunnyvaile-interiors/episode-vhs-boxes/ep-04.webp` SHA `5b8755…c0eb8` | Canonical title/copy | Shows `EVERY SLAiYER NEEDS A WATCHER`, the retired Episode 04 label; fails. |
| Same rejected byte, `554×720` | 16:9 static-cover job | Portrait VHS-object raster does not fill the 16:9 stage without large pillarbox or destructive crop; fails the digital-cover job. |
| Centred `180×180` simulation of the accepted title card | Full visual title in arbitrary system crop | Clips title letters and `Episode Four`; confirms why separate MediaMetadata title and a device-presentation limit are mandatory. |

The calibration can fail, and it did fail on the known-bad incumbent. The
accepted byte passes the actual 16:9 job; the square result is accepted only
as supplementary artwork with exact accessible metadata, not as a self-
sufficient title card.

## Checks and limits

- `node scripts/check-product-stewards.mjs --owner-entry` passed for
  `episode-experience`, `chick-flicks`, `screening-room`, and
  `episode-media-quality`. These are dossier-structure checks, not visual or
  release approval.
- `node scripts/test-screening-room-contract.mjs` passed the unchanged current
  source and truthfully reported all five titles held; Episode 04 still lacks
  55 occurrence verdicts. This baseline does not test the unintegrated cover
  change.
- Current bound source identities inspected for this verdict include:
  `watch.html` `46e346…f61c`; derived editions `e1e11d…7343`; builder
  `31d4ea…477`; active registry `6468fa…6889`; runtime-family manifest
  `c672ec…1c56`; current public-asset inventory `165402…0ef` (582 binaries,
  22 ACTIVE, 560 default-DENY, seven prohibited references, zero missing).
- The current inventory lists the accepted title card as
  `UNREGISTERED_DEFAULT_DENY`, reached from `issues/issue-04.html`; therefore
  this verdict is `ACCEPT FOR INTEGRATION`, not a claim that integration,
  build, deployment or public delivery already happened.
- No source, asset, registry, manifest, builder, shared-ops, Control Room,
  deployment, publication or public route was changed. No sound-on Episode 04
  review, film admission, legal review or public-origin verification was
  performed.

**Final independent verdict:** `ACCEPT — REUSE THE EXACT EXISTING 16:9 EPISODE
04 COVER FOR STATIC COVER, DERIVED COVER-ONLY EDITION AND MEDIA SESSION; DO NOT
CREATE A VHS DERIVATIVE`.
