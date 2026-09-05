# NewsStand masthead theme — September 5

Status: VERIFIED PUBLICLY — production `93364e9a`, source
`ab3e26c44740a2a41a049197efd4644971cd3f9e`, pushed before release.

Ali requested “Play the NewsStand theme” in the masthead, opening the existing
player in the page, and the same experience for related songs across LAiDIES.
The bounded change adds this button and a reusable `data-ksvl-track` connection
to KSVL. It removes the unused direct-Audio NewsStand handler. No song, player
engine, story, service record or other page is changed by the release.

## Exact existing foundation and candidate

The provider confirmed production `46172581-4f74-44fe-b3fa-869a1e78c69a`.
Its exact artifact is `/tmp/laidies-blend-release-fgz2nn8l/public`, with manifest
identity `99acd9b777c52677e50d80b953a2a4b2dc8347d242f5f8cd215a2f51d4e7c3d8`.
Actual public HTML, design CSS and KSVL matched this artifact byte-for-byte.
They were newer than the recurring worktree: this change retains the published
palette, town-strip rotation, reader scale and shared-player continuity.
The source diff includes that reconciliation; the public delta is only three paths.

Candidate artifact:
`/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/laidies-newsstand-theme-euych0dk/public`.
The adjacent manifest contains 747 files / 786,993,939 bytes, identity
`84e246a2bbcf7274eaeb1551e9addf40dc1270597e7b366e841d5cde2c9cc9a8`.
Exactly two existing files change, one is added, and all 744 other predecessor
files are preserved. Scope guard passes; an injected Homepage change is rejected.

| Public path | SHA-256 |
|---|---|
| newsstand.html | 7de65a388d2aa537079535c35ea910f54b3dbb261dabce3f14fe5afdfd6a348c |
| content/newsstand-design.css | ffc8a915895b61a4a412591eede75b7c6b3ac5a59839f81aabd6922ce2d24331 |
| content/site/ksvl-theme-buttons.js | e3cbb6841f2614d36c2a7ba08de14aed366038cfe951de2338567072e05901fe |
| content/site/ksvl-player.js (unchanged) | 5bdde0c41273bda10a188f64e4fcb4a4be63cad173961ddb6a5d56cd88600aa7 |

## Verification and independent review

- Focused real-browser/native-audio suite passes at 1280, 390 and 320px:
  no fresh-visit autoplay; correct admitted `the-newsstand` track, “The NewsStand”
  by The Embeddings; duration 181.759979s; advancing playback; one in-page player;
  no new window/navigation; repeated selection without overlapping audio;
  keyboard entry, pause/resume and Stop returning focus; 44px targets and no
  horizontal overflow. Held song, unavailable player and broken-media/retry cases pass.
- The exact prior no-button page fails the calibration with
  `Masthead must expose the theme button: 0 !== 1`.
- Existing newspaper browser suite: 53 checks pass, including Daily, Big Picture,
  archive, crossword and keyboard. Existing native 200% zoom suite: 9 checks pass.
- Maker inspected desktop/phone renders. Independent Terra/Low reviewer
  `/root/source_selector_review` inspected exact artifact/code/renders and reran
  the focused positive and predecessor calibration cases: ACCEPT, no material
  blocker or visible regression. The quoted hashes bind that review.
- An initial maker test exposed asynchronous deck creation before focus; the
  adapter now observes the actual deck, respects Retry focus and does not pull
  the reader back after they moved elsewhere. Native broken-media `paused`
  alone was not a valid sound-output test; the failure check now verifies the
  actual native error, zero ready state/time and the honest player error state.

## Boundaries

No full human listen or musical-quality re-review: the exact existing admitted
recording is reused. Existing cross-tab/player ownership remains unchanged;
the focused tests do not re-certify every cross-tab or pop-out lifecycle.
This does not migrate every other page's related-song control.

The broad context-authority check remains red on pre-existing oversized startup
records (`DECISIONS` >140 lines, `ACTIVE-WORK` >80), absent current-task shape
and sparse-excluded instruction/archive/config/route dependencies. The legacy
release-scope suite also lacks `operations/release-control/newsstand-production-scope.json`;
the actual scope checker was instead calibrated against this exact candidate.
Neither is represented as a green repository check. The documented conscious
hook bypass is limited to the owned commit after the above functional checks.

No whole-site rebuild, public prose rewrite, new recording, catalogue admission,
new player engine, public operational disclosure, or iCloud write is included.

## Public result

- Cloudflare production deployment: `93364e9a-54c3-4b6c-8bc6-b18de9fef2d6`.
- Immutable: https://93364e9a.laidies-sunnyvaile.pages.dev/newsstand
- Custom: https://laidies.ai/newsstand
- Actual native-audio/browser suite passes at both origins at 1280/390/320:
  correct song, advancing playback, pause/resume, one player, no new window,
  keyboard entry/Stop return and no overflow. Failure injection stayed local.
- All 18 changed/protected byte checks match the exact artifact across both
  origins. `public-parity.json`, `artifact-manifest.json` and `scope-receipt.json`
  preserve the exact result, complete artifact identity and public boundary.
- Provider head was rechecked after release. Its downloaded configuration
  matches the preceding release apart from its generated timestamp. Wrangler's
  warning about top-level services not being inherited by `env.production`
  is unchanged configuration; this update did not remove a provider binding.
- The existing 53-reader/9-native-zoom suites passed on the exact local artifact;
  public verification reran the complete focused song journey, not those broad
  suites. No all-site functional or musical-quality certification is implied.

The NewsStand entry is complete. Migration of other pages to the same related-song
control remains separate work under the shared rule. The broader sourcing,
Weekly, service replenishment and story-history gaps remain open in ACTIVE-WORK.
