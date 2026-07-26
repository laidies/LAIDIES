# SUNNYVAiLE High P0 learning-ledger repair 3 evidence

**Status:** VERIFIED LOCALLY — ALL FOUR NAMED 200% REFLOW LAYOUT FAMILIES
PASS; INDEPENDENT RE-REVIEW AND ALL RELEASE, CONTENT, REWARD, SAFARI/VOICEOVER,
NATIVE-ZOOM, PRIVACY, PUBLIC AND OWNER GATES REMAIN HOLD.

## Trigger and boundary

The independent review of repair 2 closed four product-truth/state defects but
found that the 200% repair covered only the Report Card. Its same 640px
viewport plus `document.documentElement.style.zoom = "2"` probe still measured:

| Route/state | Client | Scroll |
|---|---:|---:|
| High Yearbook/Superlatives | 640 | 691 |
| Classroom | 640 | 677 |
| Pop Quiz | 640 | 864 |

This cycle repairs only those remaining reflow defects. It does not approve
learning content or rewards, deploy, publish, inspect credentials, mutate an
external service, change visuals/assets or change Git state.

## Root causes and component repairs

### Yearbook

The portrait's centered flex children retained a large min-content width when
the calculated result was long. Every portrait child is now bounded by the
portrait width, and text children wrap anywhere when an otherwise unbreakable
string would overflow.

### Classroom

Two distinct contributors were reproduced:

- the mobile classroom stage used an intrinsically oversized 176–196% child;
  clipping hid it visually but its layout/scroll geometry remained wider than
  the named component; and
- the shared header used viewport breakpoints, which do not respond to the
  narrower effective content width produced by the 200% proxy.

The classroom stage now stays at 100% width/height and crops its image with
`object-fit: cover`. TV, label and chalk hotspots were remapped to the bounded
crop. The TV remains at least 44px in both dimensions in the zoom journey,
and both the TV and chalk region remain inside the room.

For the classroom and quiz only, the shared header now wraps intrinsically and
uses a named inline-size container. At a narrow effective header width it
hides secondary quick/KSVL/history items, shortens the Join label and tightens
the three primary actions. This responds to available component width instead
of relying only on viewport media queries.

### Pop Quiz

Focused quiz descendants inherited the min-content width of a long question
or answer, expanding the console, question and ritual controls together.
Console/form/question/options/control layout containers now have explicit
`min-width: 0` and bounded maximum width. Visitor-facing quiz text wraps
anywhere only when needed to preserve the available width.

No repair uses `overflow-x: hidden`, content clipping, disabled zoom or a
smaller viewport.

## Deterministic proof

`node scripts/test-sunnyvaile-high-contract.mjs`

**PASS — 11 contract groups.** The existing reflow group now asserts the
Report Card, Yearbook, bounded classroom stage, bounded quiz descendants and
effective-width shared-header contract.

`HIGH_PLAYWRIGHT_ROOT=/tmp/laidies-high-pw.8bUJ9V HIGH_URL=http://127.0.0.1:8876 node scripts/test-sunnyvaile-high-browser.mjs`

**PASS — 14 local Chrome journeys**, including:

- seeded Report Card 200% document and named-component reflow;
- extreme seeded Yearbook plus a long unbroken calculated title at 200%;
- long-title classroom at 200% with the unfilmed modal open, focus on Close,
  bounded header/room/stage/modal/slide/grid, visible 44px TV target, Escape
  close and focus return;
- focused Pop Quiz at 200% with a long unbroken question and answer, bounded
  header/hero/container/console/question/ritual controls and an enabled Next
  control;
- High, classroom and quiz ordinary reflow at 320px, 390px and 1280px with
  reduced motion; and
- Report Card print media with the record visible and interactive chrome
  suppressed.

The prior unknown/empty/503, local-result truth, explanation/retry,
blocked-storage/reload and keyboard-dialog journeys also remain green.

Supporting checks:

- `node scripts/check-inline-js.js`: **PASS**, 353 scripts / 132 pages.
- `node scripts/check-local-links.js`: **PASS**, 1,941 references / 110 pages.
- `node scripts/check-town.js`: **PASS**.
- `node scripts/check-product-stewards.mjs`: **PASS**, 65 products and 3/3
  active bounded lanes.
- scoped `git diff --check`: **PASS**.

The browser dependency remains isolated in a temporary `/tmp` package root.
No repository dependency was changed.

## Fresh exact local public artifact

`node scripts/build-public-site.mjs /tmp/laidies-high-repair3.TdPBBi`

- **PASS:** 1,071 files / 958.64 MiB.
- Existing 750 MiB warning remains; no deployment-size or owner exception is
  granted here.
- Public metadata validation passed.
- All 14 browser journeys passed against the fresh artifact.
- Source and fresh-artifact SHA-256 matched:

| File | SHA-256 |
|---|---|
| `sunnyvaile-high.html` | `ee9612a36c160ef63834c623bd0717e303ebe81050c42d946d30be4da0aa0085` |
| `learn/class.html` | `550e2527a6278e584bbe1e63d887a4e279359ef889fbc9247e560d9a30710401` |
| `learn/quiz.html` | `bac1536f9c0b9141dc17630f8f8b6272e335be4cd72222c9cdd38874d79b5c79` |
| `content/site/sunnyvaile-high-v2.css` | `bbe51398156f9ab726de911da214323f253b553a38cc5120f10410d4f2ad2aca` |
| `content/site/class-v2.css` | `69c6d62468651bda8fa8b5fa1e5281d14c97d969d8ea77b961ff163505dd2cfc` |
| `content/site/quiz-v2.css` | `dbefc2ab0827d0dad141aee9037d27342d6c3e7923de716902ddb213abdd95ab` |
| `content/site/sv-global-header.js` | `be37edd50bf1491db2976cc8f6106952315fc0c03e03f7f6ee141436120b7e72` |
| `script.js` | `ed9b81c441b7e40b29da3f959b8b5fd345df80a3a2ffdca7786d777e1dc12b4d` |

Test-source hashes:

| File | SHA-256 |
|---|---|
| `scripts/test-sunnyvaile-high-contract.mjs` | `13aff842baa9236e5a533964f329bb1308786898e32b9615980eb5ab36be97f3` |
| `scripts/test-sunnyvaile-high-browser.mjs` | `c298dcf1c9e5425f3f89eaa68dff7f11b40015d018ad58997acc0700045be1e5` |

This is exact local artifact evidence, not deployment or public-origin proof.

## Independent re-review request

The next judge should reproduce the exact 640px/200% probe separately on:

1. Report Card;
2. strongest seeded Yearbook/Superlatives, including long result text;
3. classroom, including the header, room/stage, long title and open modal; and
4. focused quiz, including the header, long question/answer and ritual
   controls.

For each, test document and named-component `scrollWidth <= clientWidth`.
Then preserve the ordinary 320/390/1280, reduced-motion, focus/keyboard and
print checks. Maker evidence does not judge itself.

## Gates deliberately still open

- native browser zoom, Safari and VoiceOver;
- representative class and quiz accuracy/instructional approval;
- authoritative account/reward duplicate/failure/two-device behavior;
- Clarity/privacy and approved learning analytics;
- Book Fair stock/spend/refund/fulfilment;
- artifact-size owner treatment;
- exact deployment identity and public-origin verification; and
- owner approval for learning content, visuals and promotion.

## Learning scan

- **Observed failure:** viewport breakpoints do not necessarily react when zoom
  narrows a component's effective layout width.
- **Prevention rule:** shared components use intrinsic wrapping/container
  queries for effective-width behavior, then accessibility tests probe every
  distinct layout family rather than one route.
- **Observed failure:** clipping an oversized decorative stage can hide pixels
  without fixing its scroll geometry.
- **Prevention rule:** decorative crops remain intrinsically bounded; use
  `object-fit` and remapped hotspots rather than oversized layout children.
- The canonical painpoints ledger remains parent-owned and was not edited in
  this bounded lane.
