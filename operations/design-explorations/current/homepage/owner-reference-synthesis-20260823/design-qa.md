# Homepage corrected-11 design QA

## Bound visual truth

- Owner reference: `operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-01-primary-editorial.png`, SHA-256 `46789f447c25356038d996b4dd9dcf9f5559d8556cc6ae41ea8ec5e820a0c02d`.
- Candidate: `operations/design-explorations/current/homepage/owner-reference-synthesis-20260823/index.html`, SHA-256 `3b350d56af7d948cbb2e89343af901f7698d2f7215a1857b1c18636e453cf832`.
- Routed brief: `operations/product-stewards/town-entry-homepage/EXPERIENCE-BRIEF.md`, SHA-256 `b4cf93e4a2f6edfebd08f84b9d50ad24748317f91dc6040a2bb391be2d3586ef`.
- State: owner-review direction only. It is not production integration, deployment or public verification.

## Exact browser evidence

Primary viewports:

- `evidence/desktop-1440.png` — 1440 × 900, SHA-256 `f50b1b797d05631acf5c66ac78bcad89d0a119d842e16f2dce0571b6f62ec0b0`.
- `evidence/intermediate-900.png` — 900 × 900, SHA-256 `45f0972edcad13df330a6246df6b6b2883e6fa8a64b5f4530fc5fed338cbdf30`.
- `evidence/owner-877x915.png` — 877 × 915, SHA-256 `ec9ea9ee1dbefb5345191c313de0a99cb16463b2674195a76651c09ae41aef08`.
- `evidence/mobile-390.png` — 390 × 844, SHA-256 `458bef088657dbe1905ddd753e3801a3176acd723a037e1c3d830345b693a4d5`.
- `evidence/first-session-ident-1440.png` — 1440 × 900, SHA-256 `85dd8dd98fc53216124615553f0725d5f8bbad4eef21ec40c70a51d2f7e27432`.

Focused desktop surfaces:

- `evidence/desktop-method-1440.png` — SHA-256 `eac0b30c8c98fb012db0d742cdf1f0a23a13bfac038828350a2fedd328512cd3`.
- `evidence/desktop-intents-1440.png` — SHA-256 `85a283c8cc680591486b722d7f27b74fc017b7c0e352503f7ba44bc0959325dd`.
- `evidence/desktop-weekly-loop-1440.png` — SHA-256 `d719b31afd020ce85371e9fb1e3bc828f95c29e851aa893dab69696caf36fe14`.
- `evidence/desktop-activities-1440.png` — SHA-256 `4c7fca4bf61ad26023d894b7edc56f76e903a71feecadd0f59b1297c37b63492`.
- `evidence/desktop-women-1440.png` — SHA-256 `f2dd9db03545a7a1557850105fa94ae3d798a3d5ce45a9331c96c2be9468a23f`.
- `evidence/desktop-directory-1440.png` — SHA-256 `4cbbd3b26087e95f0ac9f7f805e86a1117d1edff6c26ab6ed9fa8010b52be715`.
- `evidence/desktop-directory-open-1440.png` — SHA-256 `8ff913e02b1ae219b33a6c1d74edd121012d446dbd164d41e33efda1cb09469e`.
- `evidence/desktop-continuations-1440.png` — SHA-256 `c784fbe3d8566155c77d97248920626b59d6047e232fc54067243f072e1bda51`.
- `evidence/desktop-resident-open-1440.png` — SHA-256 `4e88ca7e41ebc5f013ae9a39f6dd4b379effd8e44e0c25f24da72ddee8c980a2`.

Focused mobile surfaces:

- `evidence/mobile-method-390.png` — SHA-256 `fc9c0e81d8f77ef5b6ff5eb33a6c262032ac3844e9ce1cfcb93432ae30c5ad3b`.
- `evidence/mobile-intents-390.png` — SHA-256 `6ca453be10232facdd9fe2aa3f1f3557b0f151da551b6b04d094e70d38d005fd`.
- `evidence/mobile-weekly-loop-390.png` — SHA-256 `6db7dc108fcd1b921306116cea1ada00997a46aa2d032c8b4ee00aeede6de6bc`.
- `evidence/mobile-activities-390.png` — SHA-256 `79f567f5fb3fd47c81084d8a6c6e005609b1b525581b2be423543e0dc6429c78`.
- `evidence/mobile-directory-390.png` — SHA-256 `fb65d8e66e8d65fde55f2c44e0f7941526430af84dc81c5ca1edbef8c26afad8`.
- `evidence/mobile-continuations-390.png` — SHA-256 `91599ed3875fe65f1ccc1f9a67b912d65c8e36717ff9b402e7feaa9a5a9cd611`.

The direct Playwright captures replaced the earlier broken stitched full-page evidence. The current continuous renders are `evidence/corrected-fullpage-desktop-1440.png`, SHA-256 `5310271238314378c9dbfcb97dc4ba54d258712785637bafa3404643e1870ed5`, and `evidence/corrected-fullpage-mobile-390.png`, SHA-256 `6f70475147ee2cbe7c69354adc40742512ea28d41a90a27e25046a7a8e69c0f7`.

## Owner corrections resolved in this candidate

- Section introductions now use one full-width hierarchy. The rejected equal split with an empty upper-right area and tiny detached explanation is absent.
- The Method is image-led and uses the approved explanation rather than a five-image label collage or an image-free text box.
- The five intent jobs are Learn, Understand the Headlines, Watch the Episodes, Tools and Games, and Connect. Learn uses one coherent LIBRAiRY image; Watch uses The Chick Flicks; Tools and Games is the whole current collection, not Dream Phone alone.
- The Wednesday section explains the trailer, latest published episode, eight-stop loop, browser-local route check-ins and complete Free Time scope. Signed-out visitors always receive the latest episode; account-backed resume remains held. All eight stop cards use equal outer geometry. The episode image is stacked above its copy at desktop and mobile.
- The Businesswomen's Special and Girl Talk uses no longer show the owner-rejected old substitute images.
- The women-and-AI purpose, why AI fluency matters now, and both actions are restored.
- The map is the primary visual, the 17-card directory has a visible count and scroll cue, and a selected card lights its matching map marker before opening the address, purpose, contents and `Visit building` action.
- Resident Card benefits are restored behind `Learn everything a Resident Card gets you`, followed by `Get my Resident Card` and `Open my Closet`. The Wednesday Postcard is a compact separate strip. KSVL is a separate listening feature.
- The header has one coherent link treatment and direct destinations. The masthead retains Sign in, KSVL, the compact replay control, accent colours and blinking connected cursor.

## Browser checks

At 1440 × 900, 900 × 900, 877 × 915 and 390 × 844:

- horizontal overflow: `0`;
- broken images, console errors and page errors: `0`;
- directory entries: `17` in canonical `01`–`17` order;
- activity cards: `6`;
- weekly stops: `8` with equal card geometry;
- mobile header retains the direct LIBRAiRY link.

Interaction checks:

- Arrival trace: dial-up; connected; first static line; full 4.67-second canonical ident; second static line; masthead expansion; arrival removal. The ident does not flash back to the dial-up state.
- The arrival has Pause/Resume and Skip controls; reduced motion bypasses it.
- Selecting Visitor's Centre activates map marker `1`, opens `01 · No. 1 MAiN`, and exposes `/visitors-centre.html` as the visit link.
- Opening the Resident Card disclosure reveals the full six-benefit list plus `Get my Resident Card` and `Open my Closet`.

## Not proved by this direction

- This is not Ali's approval, production integration, deployment or public verification.
- Account-backed `what changed since your last visit`, account-backed episode progress and cross-device state remain held.
- The Homepage current-news module remains held until the NewsStand build supplies a truthful producer and freshness contract.

## Independent pixel review

- Verdict: `ADMIT` for owner review.
- Reviewer: `homepage_asset_match`, role `visual_experience`.
- Candidate SHA-256: `3b350d56af7d948cbb2e89343af901f7698d2f7215a1857b1c18636e453cf832`.
- Verdict evidence: `evidence/independent-corrected-8-verdict.json`, SHA-256 `3f31af20286e015650e2aa03f1061329a2ed0cc932d6ede7cfd227e2709e1578`.
- Visible regressions: `0`. Locked-decision violations: `0`. Review issues: `0`.

final result: passed the exact owner-review admission gate; not owner-approved, integrated into production or deployed
