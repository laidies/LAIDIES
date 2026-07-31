# EMQ Episode 04 v9 independent judge

**Task ID:** `EMQ-E04-V9-INDEPENDENT-JUDGE-2026-07-26`  
**Judge:** Episode Media Quality — independent of the v9 maker  
**Judged at:** `2026-07-26T16:33:36-07:00`  
**Verdict:** **HOLD**

The exact v9 tuple is not admitted for assembly, release, deployment or public
use. The bounded cue 15–19 repair is materially safer than the replaced
material, but the very next retained placement restores the misleading
Analytical Engine depiction. The film also contains two confirmed narration
history errors, an identity-attribution failure, synthetic pseudo-archival
imagery without provenance, pervasive people-style drift, and no occurrence-
level authority or semantic-motion contract for any of its 55 placements.
Exact-player and trustworthy audible normal-speed proof remain unavailable.

## Frozen tuple

| Artifact | Exact SHA-256 | Judge result |
|---|---|---|
| `assets/video/episode-04-full-v9-reference-reconciled-review.mp4` | `d59e450841cc9209d5efa6e9b2c049a78078b1fae64df315ebb4a7924c8e5ee4` | matched |
| `assets/video/build-episode-04-full-v9-reference-reconciled-review.py` | `9438e09194963ec13d514870cb8630552d36c404d8198022d06679085eccf3c9` | matched |
| `operations/video-qa/episode-04-v9-reference-reconciled-config.json` | `26a159a7ac4b1553e7f9502ebad6a12aaed518336f48cdf201324fb57da36495` | matched |
| `operations/video-qa/episode-04-v9-placement-reference-manifest.json` | `138d7df2e63ff75d9d0cc7de1f2598110c6e8df5cc8a281bbadd1e6ae03e1975` | matched |
| `operations/video-qa/episode-04-full-v9-reference-reconciled-review-maker-qc.json` | `9496b3f004e36e7c1e18eed1c5010a1dda02c92c090e8f939ffea999480fd53e` | matched |
| `operations/video-qa/episode-04-v9-reference-reconciled-review/episode-04-v9-reference-reconciled-contact-sheet.jpg` | `0ddeda7a6825029d780dfa7cf6ef57b9417207104034e2483738106b7e0342bf` | matched |

The dispatch named
`operations/video-qa/episode-04-v9-reference-reconciled-qc.json`; that path
does not exist. Its supplied hash resolves exactly to the config-bound maker QC
path listed above. This is a handoff-path defect, not a byte-selection
ambiguity.

The judged MP4 is 1920×1080 H.264 at 30 fps with mono 48 kHz AAC, duration
`00:20:22.40`, size `260484984` bytes, and local artifact timestamp
`2026-07-26T14:51:18-07:00`.

## Checks performed

- Recomputed every frozen-tuple and contact-sheet hash.
- Confirmed the maker's full machine decode pass and inspected all 55 exact
  placements at midpoint in seven full-frame continuity sheets.
- Inspected upper-frame crops for every retained placement from 20 through 52,
  where identity, location and source-provenance concerns concentrate.
- Compared people rendering with the locked master
  `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`
  (`c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422`).
- Parsed the placement manifest for reference authority, spoken picture jobs
  and motion contracts.
- Verified the maker's exact AAC packet-identity result between v8 and v9.
- Parsed both exact copies of the external VTT. They match at SHA-256
  `1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4`:
  236 positive, monotonic, non-overlapping cues ending at `1221.240`, 1.16
  seconds before the film.
- Sampled motion with the canonical measurement tool across title, directory,
  repaired plates, Ada, ENIAC, Grace Hopper, Karen Spärck Jones and Kate
  Crawford occurrences.
- Inspected Screening Room source and current admission state for external
  captions, mobile layout, keyboard controls, reduced motion and failure
  handling.
- Checked the two disputed history claims against primary institutional
  sources: the [Computer History Museum Babbage history](https://www.computerhistory.org/babbage/history/)
  and the [Smithsonian computer-bug logbook record](https://www.si.edu/object/log-book-computer-bug%253Anmah_334663).

No trustworthy audible normal-speed human watch was available in the judge
environment. Browser control also reported no browser runtime, so an actual
mobile/keyboard/reduced-motion/failure journey could not be executed. Static
audio, VTT, clock, source and player-code checks are not represented as
substitutes for either required proof.

## Findings

### 1. Placement 20 immediately reinstates the Analytical Engine failure

Placement **20**, cue 20, `300.00–341.55`, uses
`assets/video/ep04-scene-03-ada-b-mid-comic-v1-locked-1920-loop-v1.mp4`.
Immediately after the repaired evidence-board sequence it shows an invented
Ada-like woman holding a punched card beside an apparently operating brass
machine. The narration correctly discusses an engine that was not built, but
this retained scene visually presents the opposite premise.

The Computer History Museum states that the Analytical Engine was never built.
The retained occurrence therefore undoes the bounded repair at the first cut
after it.

**Smallest repair:** preserve the eligible cue 15–19 repair and replace only
placement 20 with an admitted, clearly interpretive still/evidence card that
does not depict an operating Analytical Engine. Keep its existing clock.

### 2. Two narration claims fail historical truth

At approximately `318.52–330.26`, the VTT says Ada wrote the first algorithm
“for a machine that wouldn't be built for another century.” The Analytical
Engine was never built; this wording implies eventual construction.

At approximately `616.36–627.24`, the VTT says of Grace Hopper: “That is where
debugging comes from. She kept the logbook.” The Smithsonian record says
“bug” had been used for mechanical faults since the nineteenth century,
Hopper's team helped popularize the computer usage, and the logbook was
probably not Hopper's.

**Smallest repair:** make two clock-preserving narration punch-ins and update
the exact external VTT from the corrected as-recorded audio:

1. “She wrote an algorithm for the unbuilt Analytical Engine.”
2. “Hopper's team helped popularize ‘bug’ and ‘debug’; the logbook survives at
   the Smithsonian.”

If the punch-ins change the clock, regenerate the complete VTT rather than
hand-shifting isolated cues.

### 3. Placement 26 presents synthetic imagery as archival evidence

Placement **26**, cue 26, `500.00–540.55`, uses
`assets/video/ep04-cue26-credit-reveal-event-v1.mp4`. It contains black-and-
white synthetic pseudo-documentary panels of ENIAC men and women, visually
presented like archival photographs. The occurrence has no provenance,
interpretive label or identity authority.

**Smallest repair:** use provenance-bound archival material whose rights and
identities are recorded, or an unmistakably labelled graphic interpretation
and name card. Do not present generated imagery as documentary evidence.

### 4. Placement 47 visually misattributes Emily Bender's contribution

Placement **47**, cue 49, `946.00–954.00`, uses
`assets/video/ep04-cue49-local-motion-v1.mp4`. It shows the same Black woman
used for Timnit Gebru with a parrot while the narration says, “Bender gave the
problem a name that stuck: a stochastic parrot.” The picture binds Emily
Bender's contribution to Gebru's depicted identity and is semantically
misleading.

**Smallest repair:** use a text/parrot concept card for Bender's phrase, then
cut separately to an independently admitted Gebru identity frame when the
narration turns to Gebru.

### 5. The 55-row occurrence contract is not admission-capable

All **55/55** placements lack both `spoken_picture_job` and `motion_mode`.
The 50 retained rows have no `reference_authority_ids` and are labelled
`V8_SOURCE_HASH_BOUND_NOT_REJUDGED_IN_THIS_LANE`. The five repaired rows are
labelled `BOUND_FOR_V9_REPAIR_CANDIDATE_NOT_INDEPENDENTLY_JUDGED`.

Source hashes prove which bytes were used; they do not prove identity,
location, style, historical authority, what each image must communicate, or
whether its motion is semantically appropriate. Real people including Hedy
Lamarr, the ENIAC Six, Grace Hopper, Karen Spärck Jones, Fei-Fei Li, Joy
Buolamwini, Timnit Gebru and Kate Crawford appear without occurrence-level
identity authority. Many retained scenes also visibly drift into painterly,
photographic or generic cinematic rendering rather than the locked adult
graphic-novel ink and faceted-shadow register.

**Required repair contract:** create a new 55-row manifest that binds each
exact placement to its spoken picture job, identity/location/style/history
authority IDs and motion mode. That audit may expose further replacements; it
must happen before another full-film admission.

### 6. Motion exists, but semantic motion is unproved

Measured moving-pixel ratios include title `58.159%`, desk `9.372%`, directory
`0.164%`, placement 20 Ada `0.615%`, ENIAC `0.565%`, Grace `2.016%`, Karen
`1.089%`, and Kate `0.571%`; the known still floor measured `0.000%`. The
repaired cue 15 and 16 plates correctly measure as still, while cue 18 uses a
restrained evidence dissolve.

These measurements disprove a globally frozen encode, but the absent
occurrence jobs and motion modes prevent a semantic-motion pass. The cue 15–19
repair may carry forward provisionally; this is not whole-film admission.

### 7. External VTT structure passes; exact-player readiness does not

The VTT byte match, clock order and duration coverage pass. No captions are
burned into the MP4. Screening Room source contains external-track loading,
keyboard seeking/play, reduced-motion CSS and explicit media/VTT failure
states.

The exact v9 checksum is not mounted: `EPISODE_FILMS` is empty, Episode 04
admission remains HOLD, and public truth correctly remains cover-only
listen-along. Therefore no caption-rendering, mobile, keyboard, seek/resume,
reduced-motion or failure-recovery proof exists for this candidate.

**Required retest after content repair:** mount the next exact checksum and VTT
in a non-public local review harness, then record desktop keyboard, mobile,
reduced-motion, caption and deliberate media/VTT failure journeys. Do not
change public admission from this judge lane.

## Verdict and route

**HOLD.**

The smallest admissible repair packet is:

1. preserve the eligible cue 15–19 repair;
2. make the two narration/VTT corrections;
3. replace confirmed failing placements 20, 26 and 47 without changing the
   rest of the clock;
4. build the complete 55-row occurrence authority/job/motion manifest and
   route any additional failures it exposes to image admission;
5. return the exact new tuple for a full audible normal-speed human watch,
   independent full-frame/crop judgment, and non-public actual-player run.

No maker bytes, site, steward state, release, schema, deploy or public file was
changed by this judge.

## Learning scan

No new painpoint entry is required. This cut repeats existing prevention rules:
`BTB-094` (assembled episodes become two visual shows without per-shot
admission), `BTB-160` (a bounded repair cannot admit an unaudited retained
film), and the established rule that historical/identity authority must bind
the exact occurrence. The newly observed immediate post-repair regression is
fully covered by those rules: always inspect the first retained occurrence
after a repaired window.
