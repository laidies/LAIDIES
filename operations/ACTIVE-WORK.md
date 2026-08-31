# Active work

<!-- context-authority: operations/context-authority.json -->

## Current task

- **Task ID:** LIBRARY-APPROVED-FRAMES-PHONE-RELEASE-20260831
- **Status:** PUBLICLY VERIFIED — `f2eeceba-3ce0-418e-bfd9-95087f4b9e4f`, source`d3d1e2be6db1351e1f480e430c04538a163a26b2`.
- **Authority:** Ali requested publishing the remaining exact-background correction, with no obscured text.
- **Conflict:** Independent read-only inspection confirms the 1486×1059 landscape master at full 844px phone height makes the art rail about223px wide. At320px, 16px clearance and right inset leave about65px for prose. Width-fit instead makes the entire frame only228px high, ending the rail near the top. Stretching, cropping motifs or repeating the strip would violate existing decisions. A phone adaptation or an explicit phone-only composition tradeoff is required; neither is silently authorized by choosing the exact landscape master.
- **Resolution:** Keep exact desktop masters and titles; use ImageGen to adapt the same angled paper, halftone, colours and ordered computer motifs to portrait proportions with a protected white reading area. No manuscript or interaction changes. Verify actual rendered clearance throughout all four books before the bounded Library release.
- **Release:** Exact six-path successor `/tmp/laidies-library-phone-release-20260831`,690files,identity`42746b50be18859cc17779231bc650577d92a7430dcfd6c0c91f57713dd77c2f`, preserves all684non-delta files from acbbcf86. Custom4widths and immutable3widths pass all4readers;52/52public hash comparisons match. Details, initial8-second test timeouts and bounded visual caveat in `operations/library-phone-frames-release-20260831.md`. No further deployment planned; handoff returned to release owners.

## Previous live clearance audit

- **Task ID:** LIBRARY-LIVE-TEXT-CLEARANCE-20260831
- **Status:** LIVE AUDIT VERIFIED; artwork-selection correction still unfinished.
- **Live evidence:** `https://laidies.ai/library` and all thirteen reader release paths match the colour-release hashes; four rendered manuscripts also match. All four readers pass nine-width opening/navigation/viewport checks. Added a DOM Range guard measuring every laid-out text run throughout the full manuscript against the outermost frame artwork, including text below the opening viewport; all four live books pass all nine widths. Scrolled desktop and phone pixels independently inspected in the browser show no computer/text overlap.
- **Calibration:** A deliberately translated, nonempty late paragraph produces negative artwork clearance and fails the guard. Earlier calibration attempts selected empty paragraphs and were not valid evidence; the final injection filters nonempty rendered text. A network timeout in the first remote calibration attempt was not treated as the expected failure.
- **Remaining:** Below 1200px, current production still selects the alternate compact artwork; the exact approved-background selection is not fully implemented. No public files changed or deployment occurred during this status/clearance audit. Only the test and internal records changed.

## Previous exact-frame clarification

- **Task ID:** LIBRARY-EXACT-FRAME-SELECTION-20260830
- **Status:** DECIDED; narrow-screen implementation mismatch remains.
- **Evidence:** Ali's three attached landscape artworks are RGB pixel-identical to the three deployed desktop masters. The purple v6 master shares the composition. At the actual 700px live browser, the reader still loads the separate compact v7 artwork. Exact selection recorded in `operations/library-decisions.md`; no new images, runtime changes or deployment in this clarification.

## Previous four-book colour release

- **Task ID:** LIBRARY-FOUR-BOOK-COLOURS-20260830
- **Status:** PUBLICLY VERIFIED — production `3d4bebd1-66ae-4e1e-be3c-f020080b306b`, source `318c82b663f13eab9db8fa98fbbef04b2df93989`.
- **Authority:** Ali requested publishing the restored title/layout from an isolated branch and giving the three companion books the same design in distinct colours.
- **Result:** Purple Fundamentals preserved; ImageGen turquoise Working, pink Straight Answers, blue Dictionary. Continuous full-width reader; Contents left, outlined Save/Top/Back right; no manuscript or semantic-box changes.
- **Verification:** Source and exact candidate pass four books at nine widths. Independent review of twelve final desktop/phone captures found no visible blocker.
- **Release record:** `operations/library-four-book-colours-release-20260830.md`. Overlay only thirteen Library paths onto 8ce8632d; never deploy this source checkout wholesale.
- **Live result:** Custom and immutable origins passed four-book preview/open and continuous navigation at 1280/390/320; exact byte parity across 25 changed/protected paths. Save opened the ten-sticker picker without changing account data. Deployment slot returned to recovery owner for its bounded native-menu repair; no further deployment planned here.

## Previous original-title recovery

- **Task ID:** LIBRARY-ORIGINAL-TITLE-RECOVERY-20260830
- **Status:** VERIFIED LOCALLY — not deployed
- **Result:** Recovered exact title pixels from the approved generated reference rather than repeating the rejected rotated-font approximation. The source is copied unchanged to the public asset folder and only its title region is displayed proportionally; no rejected background/Preface imagery is reintroduced. Accessible title remains, manuscript/art/control changes are zero.
- **Evidence:** Conversation at 2026-08-26T23:11:33 described the prior raster title; the later frame rebuild at 5ce9a39e recreated it as live fonts. This establishes the recovery mechanism, not approval of that rejected whole-page predecessor. Current source SHA and viewport coordinates are in `operations/library-decisions.md`.
- **Verification:** Four books at nine widths pass. Original-title loaded-image and title/control-bound guards replace the invalidated font-ratio proxy. Maker plus independent title-only pixel review of `/tmp/library-original-title.uWPqhl/current.png`, `320.png`, `1710.png` confirms original lettering/stroke, no distortion, clipping, stray captured UI or control overlap.
- **Next action:** Ali reviews restored local title. No deployment/public verification. Never redeploy this older whole-site worktree over the current combined production artifact.

## Rejected title approximation — not visual authority

- **Task ID:** LIBRARY-TITLE-PROPORTIONS-20260830
- **Status:** VERIFIED LOCALLY — not deployed
- **Result:** Corrected the flattened AI Fundamentals title: restored the angled AI/Fundamentals typography, increased compact title scale and restored prominent purple 101. Retained existing live text and raster brush; no new art, manuscript changes or control changes. Recent button commits did not alter title rules; the compact title's earlier 42px cap and reduced number size were present beforehand.
- **Verification:** Four-book nine-width reader suite passes with title/controls intersection and proportional-number guards. Deliberately shrinking 101 makes the suite fail (`titleScale:false` at 820px). Maker and independent review of 700/320/1710px captures at `/tmp/library-title-restore.KWDEQU/` found no visible blocker and a hierarchy closer to the approved reference; this is not an exact raster replica or owner approval.
- **Next action:** Ali reviews refreshed local title. No deployment or live verification; existing production-base boundaries remain.

## Previous header actions

- **Task ID:** LIBRARY-RIGHT-HEADER-ACTIONS-20260830
- **Status:** VERIFIED LOCALLY — not deployed
- **Goal and result:** Ali requested Save and Top on the right, then approved thin rounded outlines. Contents remains separate at the left of the action row; Save, Top and Back are grouped together on the right at desktop and compact widths. Save is a 44px square; Save and Top have 1px purple borders, 8px rounded corners and no shadow. Artwork, manuscripts and interactions are unchanged.
- **Verification:** Four-book nine-width browser suite passes. Injecting the old left-side action arrangement fails the new grouping guard. Maker and independent screenshot review at 660/320/1710px found no clipping, title collision or art regression. Captures: `/tmp/library-right-actions.iRSwo3/`. The stylesheet has an explicit new cache token so the preview loads the correction.
- **Next action:** Inspect refreshed local preview. No deployment or public-origin verification performed; production artifact reconciliation remains mandatory before any future release.
- **Outline verification:** All four books still pass the nine-width reader suite. Actual browser computed styles confirm 1px borders, 8px radius and no shadow. Maker plus independent review of `/tmp/library-outlined-actions.fjdBiO/320.png` and `1710.png` found no clipping or visual blocker. Preview stylesheet cache token: `outlined-actions-v9`.

## Previous compact artwork correction

- **Task ID:** LIBRARY-COMPACT-PURPLE-ART-20260830
- **Status:** VERIFIED LOCALLY — not deployed
- **Owner:** Codex foreground; Ali owns visual acceptance and public release.
- **Goal:** Restore the purple halftone/computer border in Ali's actual 700px preview without reintroducing gutters or text overlap.
- **Result:** A new ImageGen compact raster preserves the existing motif vocabulary below 1200px. It is anchored left; the live reading column clears its actual pixels. At the smallest phone width the preface badge sits above the title so words are not split. Old negative chapter margins no longer leak past compact viewport edges. Desktop artwork and all manuscripts are unchanged.
- **Verification:** `scripts/test-library-opening-books.cjs` passed four previews and all four books at 1280/1710/1920/2560/821/820/700/390/320px (36 journeys). Checks cover full-window geometry, compact source/position, art clearance, control visibility, continuous scrolling and Contents/Top navigation. Deliberately restoring the old blank compact frame reports failure at all compact widths. Earlier gutter/overlap calibrations remain in the test.
- **Visual review:** The preceding visual verdict missed the actual 700px pane and is invalid for compact-art visibility. Current maker captures are `/tmp/library-compact-art-review-20260830/700-top.png`, `700-scroll.png` and `320-top.png`. Independent reader-layout reviewer inspected those pixels and the compact/desktop rasters: no visible blocker, purple rail persists through scroll, computer clears text, no new motifs, 320px heading uses whole words, controls remain horizontal and visible. This is bounded local review, not owner acceptance or release admission. Compact raster SHA-256: `a0037b5509604c4f400485dc03e12601734715877826ad826c9223643613a8e9`; CSS SHA-256: `8e35f445ed786faa7610bc7f3cc5c989b0ea38b9def0792d65da67f67cec5362`.
- **Next action:** Ali can inspect the restored local preview. No deployment, live verification or manuscript change. Prior deployment identities below are historical, not verified-current bases for a new release.

## Previous four-book release

- **Task ID:** LIBRARY-FOUR-BOOK-CLAUDE-REVISION-INTEGRATION-20260829
- **Status:** DEPLOYED / PUBLICLY VERIFIED
- **Owner:** Codex foreground; Ali owns public release and final editorial taste
- **Updated:** 2026-08-29 America/Vancouver
- **Goal:** Integrate Ali's four Claude-revised opening-book manuscripts without losing approved prose, source qualifications, canonical term ownership, stable reader anchors or the accepted continuous-reader design.
- **Acceptance:** AI Fundamentals and Working with AI retain a complete, source-bound causal teaching sequence; every changed consequential claim is verified or explicitly held; Working with AI's reordered chapters have correct internal references; Straight Answers retains its 15 admitted questions with current source/freshness dispositions; the Dictionary is regenerated from owner-book definitions with valid exact routes; all four render, navigate, save and reopen without overflow at desktop and 390/320 mobile widths; the exact committed build is deployed and verified at public laidies.ai URLs.
- **Current step:** The four supplied Claude revisions are preserved intact, then merged through the maintained book sources rather than wholesale replacement. AI Fundamentals and Working with AI passed independent exact-artifact teaching review; Straight Answers passed with exactly 15 admitted questions; the Dictionary regenerated 179 exact owner definitions and routes. The exact combined artifact was rebased onto the current Homepage and NewsStand production bytes, retained the verified Visitor's Centre repair, and was deployed as Cloudflare Pages deployment `8f369f4c-5408-41d8-b5a9-d83eb0438d02`. All four books open at the ordinary `laidies.ai/library` route with the approved ImageGen continuous reader, grouped navigation, zero page-turn wrappers, no load failure and no horizontal overflow at 1280 and 390px; the pre-deploy artifact also passed at 320px. Twenty critical Homepage, NewsStand, Visitor's Centre, Library, source, render and reader-asset paths matched at both public origins. Miss Jeeves health reports catalogue and topic requests healthy, grounded AI configured, and aggregate measurement available. A subsequent two-month AIDB recheck screened all 51 editions from 2026-06-30 through 2026-08-28 and read the 20 most relevant long features; it found no missing durable mechanism or primary-evidence change that justified invalidating the admitted book artifacts. Successive coordinated releases preserved the books. Current production `dcc3627e-7b8d-4b1a-9dbb-062facc4e176` preserves `library.html`, `visitors-centre.html` and all four rendered books across predecessor, candidate, immutable and custom origins.
- **Next action:** No Library release action remains. The AIDB research disposition is `NO_PUBLIC_DELTA`; current production is `dcc3627e-7b8d-4b1a-9dbb-062facc4e176`. Any future release must start from this exact artifact or a verified later production head.

### Preserved predecessor

The prior `LIBRARY-BOOK-READER-POP-ZINE-REDESIGN-20260824` task remains locally committed at `fe976404` and is the visual/interaction baseline for this content integration. Its accepted continuous scrolling, non-overlay Contents view, Puffy save controls and repaired section-heading geometry are locked against regression.

## Previous current task

- **Task ID:** LIBRARY-BOOK-READER-POP-ZINE-REDESIGN-20260824
- **Status:** READY FOR OWNER REVIEW — LOCAL ONLY
- **Owner:** Codex foreground; Ali owns taste and public-product decisions
- **Updated:** 2026-08-28 America/Vancouver
- **Goal:** Implement Ali's selected pop-zine textbook reader direction across all four opening Library books without changing admitted prose, semantic meaning or book functions.
- **Acceptance:** The white long-form reading surface, editorial hierarchy and approved Rewind/computer motif frame match the selected visual; semantic boxes retain their actual manuscript jobs; desktop and mobile Contents collapse to one compact toolbar control and open a dedicated non-overlapping index aligned with the reading column; Save uses the teal floppy Puffy and opens the visitor's ten selected stickers; all four books remain navigable, readable and overflow-free at 1280, 390 and 320px; the exact successor is visually compared to the approved target before any public release.
- **Current step:** Ali explicitly rejected the invented page-turn interaction, scattered header and small Contents dropdown covering the manuscript. The active local successor renders the complete manuscript as one continuous internal scroll with no page controls. Opening Contents now replaces the prose area with a dedicated white index view rather than overlaying it; all group and destination text is at least 16px, the button changes to `Close contents`, and a destination restores the book at the exact heading. The desktop index begins at the reading-column edge (236px at the 1487px evidence viewport) instead of floating toward the centre; mobile remains at its 48px inset with no horizontal overflow. The desktop and mobile ImageGen frames keep the entire lower and right reading surface clear. A 2026-08-28 regression repair removed the two-column grid from section headings after the heading's decorative pseudo-element consumed the text track and forced title copy into the 44px Save column. Headings now retain their natural block geometry while a 56px inset reserves the absolutely positioned floppy control; the four-book desktop/mobile sweep reports zero heading/control intersections, collapsed long headings or horizontal overflow. The persistent compact header retains the full split title, Puffy Save, Top, Back and Report issue. Current evidence is under `operations/product-stewards/library/evidence-reader-imagegen-v5-20260826/`.
- **Next action:** Ali reviews this exact continuous-reader local successor. Public release remains separate and is not authorized by the local implementation, local browser evidence or automated checks.

## Boundaries

- Source iCloud checkout remains preservation-sensitive and contains extensive
  pre-existing dirty work. This task made no source-checkout writes.
- Production repair worktree: `/Users/alisoneakin/Projects/laidies-library-heading-fix-20260828`
- Current production deployment: `dcc3627e-7b8d-4b1a-9dbb-062facc4e176`; Cloudflare source `f7905a3`; exact deploy-input `/tmp/laidies-newsstand-restore.YUDo7H`; exact manifest `/tmp/laidies-newsstand-restore.YUDo7H.manifest.json`; 670 public files; whole-artifact identity `7bb3fb56fbc911f3f3fd4b9c9208633d4820b209d887a70c3e4f6d74b9f93858`. It preserves Library, Visitor's Centre and the later Chat Digest/Trading Cards repair. The release lane reports that its immediate predecessor is `4474aa27` and the only changed path is `content/newsstand-stories.js`. Prior coordinated deployments remain verified history, not the current production base.
- Release source commit: `3a23cbacd6ae43ac713532b314dac6a7fd05d006`; production base source `daf9f3fca4ab733698b08cff01718d47346634c2`.
- Source branch: `codex/library-heading-format-fix-20260828`, based on `design/library-owner-corrected-20260823` at `9f2c356c`.
- No reset, clean, deletion of source work, unrelated provider mutation, or
  spend was performed. The first identical upload was tagged with a mistyped
  expanded commit hash and was immediately superseded; only deployment
  `849687b6-c36a-4c04-9533-ca53bab99d63`, bound to the actual commit, is the
  historical superseded release. Deployment `c3cde9a0-b530-4e9f-bfd2-7dcc3c48a6d2`, bound to the exact corrected preface commit, is the accepted release; `d0db552e-2d41-46ca-a214-da1a1f7a6961` is its clean pre-preface rollback target. The intervening `248081a9-f694-4c04-b074-7dbe1ba65c26` deployment carried the wrong third transformation and was immediately superseded.

## History

The previous 1,082-line mixed active-work record is preserved at
`operations/archive/context-reset-20260818/ACTIVE-WORK.pre-reset.md`. It is
historical evidence, not current task state.

The operation-agent blueprint task is paused at its prior exact review point;
it is not activated authority and cannot block the 24-hour recovery objective.
