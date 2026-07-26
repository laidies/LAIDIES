# SUNNYVAiLE High P0 learning-ledger repair 4 evidence

**Status:** VERIFIED LOCALLY — LONG RESIDENT-NAME REPORT CARD DEFECT REPAIRED;
INDEPENDENT RE-REVIEW AND ALL EXTERNAL, CONTENT, REWARD, NATIVE-ZOOM,
SAFARI/VOICEOVER, PRIVACY, PUBLIC AND OWNER GATES REMAIN HOLD.

## Trigger and boundary

The independent review of repair 3 accepted the supplied Report Card,
Yearbook, classroom and quiz 200% journeys, but found one uncovered mutable
field. At a 640px viewport with the same 200% proxy, this harmless local name:

`HonorRollResidentWithAnExtraordinarilyLongUnbrokenNameToStressTheRecord`

expanded `#rc-card` and `#rc-meta` from a 250px client width to a 412px scroll
width. The document stayed bounded only because the descendant was clipped.

This cycle repairs only that Report Card metadata defect and its regression.
It does not deploy, publish, alter content/rewards, use external services,
change visuals/assets or change Git state.

## Repair

- `#rc-meta` is explicitly bounded to its card.
- Each metadata row is a wrapping flex child with `min-width: 0`,
  `max-width: 100%` and a flexible 180px basis.
- Metadata values, including user-controlled `#rc-name`, are bounded
  inline-blocks with emergency wrapping for otherwise unbreakable strings.
- No ancestor clipping, text truncation, ellipsis, hidden overflow or disabled
  zoom is used.

## Exact regression

At 640px plus `document.documentElement.style.zoom = "2"`, the browser suite:

1. seeds the exact harmless long name and quiz records;
2. waits until the resident value is rendered;
3. asserts `scrollWidth <= clientWidth` for the document, `#hub-record`,
   `#rc-card`, `#rc-meta`, `#rc-name`, table wrapper and summary;
4. asserts the resident bounds remain inside both `#rc-meta` and `#rc-card`;
5. asserts normal white-space and a multi-line rendered height; and
6. selects the complete text with a DOM Range and verifies no character was
   clipped or discarded.

The result remains fully visible, wraps inside the card and is selectable in
full.

## Source verification

`node scripts/test-sunnyvaile-high-contract.mjs`

**PASS — 11 contract groups.** The intrinsic reflow group now includes
Report Card metadata-row and metadata-value bounds.

`HIGH_PLAYWRIGHT_ROOT=/tmp/laidies-high-pw.8bUJ9V HIGH_URL=http://127.0.0.1:8876 node scripts/test-sunnyvaile-high-browser.mjs`

**PASS — 14 Chrome journeys**, preserving:

- long-name Report Card 200% reflow and text selection;
- long seeded Yearbook 200%;
- long-title classroom 200%, modal focus/Escape/return and 44px TV target;
- long-question interactive quiz 200%;
- High/classroom/quiz 320px, 390px and 1280px reduced-motion reflow;
- Report Card print behavior;
- valid-empty/503, local-result truth, explanation/retry and blocked-storage
  reload behavior.

Supporting checks:

- inline JavaScript: **PASS**, 353 scripts / 132 pages;
- local links: **PASS**, 1,941 references / 110 pages;
- product steward system: **PASS**, 65 products / 3 of 3 active lanes;
- `check-town`: **PASS**;
- public metadata validation: **PASS**; and
- scoped `git diff --check`: **PASS**.

The Playwright dependency remains isolated in `/tmp`; repository dependencies
were not changed.

## Fresh exact local public artifact

`node scripts/build-public-site.mjs /tmp/laidies-high-repair4.hnqh4t`

- **PASS:** 1,071 files / 958.64 MiB.
- Existing 750 MiB warning remains a release-owner hold.
- All 14 browser journeys passed against the fresh artifact.
- Source and artifact SHA-256 matched:

| File | SHA-256 |
|---|---|
| `sunnyvaile-high.html` | `f0c6735b7932520832173f5d4650d4c36dcbc0445fb86e3dcdd12287c4d24173` |
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
| `scripts/test-sunnyvaile-high-contract.mjs` | `ebc679c41bb1b673038cb5d4db5f2eaeb69b4c227cf0d61d020062191453f635` |
| `scripts/test-sunnyvaile-high-browser.mjs` | `c51a045abd48157cd74ecdb0b31a76f1d179f916eac6a6d6cda8204d2f41c34e` |

This is local exact-artifact evidence, not deployment or public proof.

## Independent re-review request

Reproduce the exact long-name state and alternate harmless names at the
640px/200% proxy. Inspect the document, record panel, card, metadata container
and resident value independently; verify the full name is readable and
selectable rather than merely hidden by the card. Then rerun the preserved
Yearbook, classroom, quiz, responsive, reduced-motion, focus and print cases.
Maker evidence does not judge itself.

## Gates deliberately still open

- native browser zoom, Safari and VoiceOver;
- representative class/quiz accuracy and instructional approval;
- authoritative reward/account duplicate, failure, refund and two-device
  behavior;
- privacy/Clarity and approved learning analytics;
- Book Fair stock/spend/refund/fulfilment;
- artifact-size owner treatment;
- exact deployment identity/public-origin verification; and
- owner approval for content, visuals and promotion.

## Learning scan

- **Observed failure:** a bounded document can still hide an overflowing
  user-controlled descendant.
- **Prevention rule:** reflow tests enumerate mutable fields and assert each
  field's component bounds plus full text accessibility, not only the page's
  scrollbar.
- The canonical painpoints ledger remains parent-owned and was not edited.
