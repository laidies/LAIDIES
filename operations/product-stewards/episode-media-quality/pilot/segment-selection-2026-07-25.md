# Representative episode-media pilot — segment selection

**Status:** SPECIFIED — recommended selection only; **not selected for production, approved, rendered, or release-ready**.

## Recommendation

Subject to the Episode Product Owner (EPO) locking the currently rendered
Episode 04 narration as the final audio authority, use **Episode 04,
00:03:22.00–00:04:20.00** (cue clock 202.00–260.00): **“The LUMINAiRY / the
MAiVENS / London, 1843.”** It is the smallest candidate that can exercise the
whole representative-pipeline contract without pretending an unsafe source is
approved.

The slice establishes the LUMINAiRY, explains the episode's central corrective
idea (AI's origin story has women builders), introduces the MAiVENS, makes a
deliberate still hold, then changes both place and era into Ada Lovelace's
1843 beat. Its semantic motion event is the **London, 1843 time-jump**, not a
camera pan or compression movement. The required deliberate still is the
MAiVENS hall/Grace-looking-up beat before that jump.

This is a **build-packet selection**, not a clearance of `episode-04-full-v8.mp4`
or of any existing intermediate/loop. The public Screening Room must remain the
current illustrated/narrated listen-along with below-picture captions;
`watch.html` has `EPISODE_FILMS = {}`.

## Exact authority and proposed cue map

| Window | Final-clock spoken idea / visual job | Proposed source (exists) | Motion mode | Authority and limitation |
|---|---|---|---|---|
| 202.00–220.00 | “I went up the hill, to the LUMINAiRY…” — establish location and invite the question | `assets/episodes/ep-04/pixel/ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png` (`9ae5…601cae`) | intentional still | Episode 04 canon narrative beat 3; visual is present, but no independent image ruling is recorded. |
| 220.00–240.00 | quieter wing; women who built the thing — explain/complicate the mental model | `assets/episodes/ep-04/pixel/ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png` (`007f…1737f5a`) | intentional still | Canon narrative beats 3–4; location/MAiVEN identity references still require manifest admission and judge review. |
| 240.00–245.30 | “The lights go soft… Stay with me — we're going back.” — transition | `assets/episodes/ep-04/pixel/ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png` (`1fe2…782ac6c`) | intentional still | Provides the named heroine/identity shot; acceptance must verify the face lock and setting, not infer it from the filename. |
| 245.30–250.30 | “It starts in the eighteen-forties.” — make the era transition explicit | `assets/episodes/ep-04/pixel/ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png` (`c2bf…deb34c`) and a newly assembled semantic event from the approved final source(s) | **semantic event:** comic time-jump/page transition into London, 1843 | The existing time-jump image is available; whether any existing clip is admissible remains unjudged. Do not substitute a pan. |
| 250.30–260.00 | young woman / mechanical calculator — reinforce the historic entry and set up Ada's explanation | `assets/episodes/ep-04/clips/ep04-scene-03-ada-loop-v1.mp4` (`343e…ee36b3b4`) only as a **candidate input** | semantic event must be observed and judged; otherwise use an intentional still | The clip exists but is not approved; the Episode 04 verdict says current motion evidence is unreadable and historical identity/era review is open. |

### Source-of-truth order

1. Meaning and facts: `content/episodes/episode-04.canon.md`, especially its
   narrative beats 3–4 and its Ada fact guards. It is the canon authority.
2. Performance words: `operations/audio/episode-04-elevenlabs-v3-tagged.txt`.
   The canon names it as the narration master and expressly marks
   `operations/audio/episode-04-script.md` stale.
3. Current local audio/captions to bind only after EPO confirmation:
   `content/music/episode-04-narration.mp3` SHA-256
   `f007a338284550fe27a8e035daf10936a6e1ca0825a40e36484013fce8383688`, and
   `operations/captions/episode-04.vtt` SHA-256
   `1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4`.
   Their presence is **not** proof that the transcript is as-recorded or that
   captions are synced.
4. Clock/source placement: `content/episodes/episode-04-cues.json` cues
   15–19 (202.00, 220.00, 240.00, 245.30, 250.30). The actual segment must be
   retimed from the checksum-bound final audio, not from this selection table.

## Anonymous candidate comparison

The names below were concealed while scoring. Scores are /20; the first three
criteria have a **17/20 floor**. A candidate that misses a floor is rejected,
even if its total is attractive.

| Candidate | Window / identity | Product quality | Accuracy & trust | LAiDIES brand | Production feasibility | Diagnostic value | Result |
|---|---|---:|---:|---:|---:|---:|---|
| A | Episode 02, 03:07.60–03:39.00: regular café → brand-new café | 15 | 12 | 16 | 5 | 19 | **Reject** — it is the incumbent priority repair but Cue 13 is confirmed painterly; both exact comic alternatives are globally rejected and no safe source spans the concept transition. |
| B | Episode 03, 02:31.90–04:04.16: NewsStand → “Says who?” → Burn Book | 18 | 18 | 18 | 15 | 17 | Viable fallback, but 92.26 seconds is materially larger. Existing candidate cues also need final rendered-frame/source admission and semantic-motion review. |
| C | Episode 04, 03:22.00–04:20.00: LUMINAiRY → MAiVENS → London, 1843 | 18 | 17 | 19 | 16 | 19 | **Recommended** — 58 seconds; contains a location, heroine/identity, concept explanation, explicit transition, intentional still, and a meaningful motion-test case. It passes floors only as a proposed build after the blocking rulings below. |

## Red-team findings

### Candidate A — incumbent Episode 02 café transition

- It is admirably small and directly attacks the known release blocker, but is
  not an honest pilot input: the EOD release gate says both semantically exact
  comic café alternatives are rejected, and there is no safe non-rejected
  source for 187.60–203.30.
- Forcing a substitute would repeat the documented failure of a style-correct
  image illustrating the wrong minute. It cannot pass accuracy/trust or brand
  floors, so it is not a permissible “smallest” selection.

### Candidate B — Episode 03 NewsStand/Burn Book

- It has strong final-script/canon provenance and broad sampled picture-only
  coherence, but it is nearly twice the recommended duration before it has
  both location and explanation.
- Its existing review master has no complete audio/caption/identity/location
  watch. Any existing camera movement is not a semantic event. It is a sound
  fallback if the Episode 04 final-audio ruling fails, not the smallest pilot.

### Candidate C — recommended Episode 04 LUMINAiRY/Ada entry

- The strength is diagnostic coverage in 58 seconds: environmental continuity,
  heroine face lock, historical-person/era risk, a deliberate rest, a
  cross-time concept change, a graphic transition, captions and the real
  player branch.
- The risk is equally useful: Episode 04's release verdict leaves the
  historical-person identity/era audit, motion controls, full watch and
  caption/audio proof open. The pilot must prove those gates; it must not
  inherit approval from an existing v8 master or a filename containing
  “locked.”

## Blocking inputs and owner rulings

| Missing input / decision | Owner | Required ruling or artifact before build |
|---|---|---|
| Is `content/music/episode-04-narration.mp3` the final, approved recording for this excerpt, and does it match the v3 tagged script? | Episode Product Owner + Audio & Caption Owner | SHA-bound final audio, as-recorded transcript, recording-revision reconciliation, and exact 202.00–260.00 transcript. The canon note about a re-recording cannot be treated as settled. |
| Does the VTT derive from that exact final audio? | Audio & Caption Owner | Caption/audio/transcript hash binding and timing check; retain `player-below-picture`, never burned captions. |
| Which identity/style/location reference files are approved for each proposed cue? | Image Production Director + Image Quality Judge | Manifest IDs and SHA-256s for heroine face lock, Ada identity/period reference, master style and LUMINAiRY location; independent PASS per source. |
| Is the existing Ada loop admissible, or must it be rebuilt? | Animation Director + Motion Quality Judge | A semantic-event plan plus true-still control, measurements and human verdict. No camera drift or noise can pass it. |
| Is the 58-second selection the current highest-priority representative repair rather than the unresolved Episode 02 café repair? | Episode Product Owner | Explicit prioritization ruling, recorded before build; do not silently demote Episode 02. |
| Is Ali's visual standard met after the independent cue-level review? | Ali | Checksum-bound visual ruling for the actual pilot render, not its components. |
| Does the actual local Screening Room journey pass desktop/mobile, keyboard, reduced motion and failure fallback? | Release QA | Captures/log against the exact local player; public status remains unchanged unless later release gates pass. |

## Next build-packet step

The EPO should first make the two selection rulings: (1) final-audio authority
for Episode 04 and (2) permission to use this representative slice ahead of
the blocked Episode 02 repair. Then create the real pilot manifest from
`pilot/manifest-template.json` with the five cue windows above, admitted
reference hashes, explicit `intentional-still` versus `semantic-event` modes,
and no PASS placeholders. Run the validator only after all required evidence
exists; its passing fixture is synthetic and cannot be borrowed as approval.

No release, player mapping, deployment, public claim, or media edit is
authorized by this selection record.

## Learning scan

No new production learning is claimed: this is a read-only selection record.
The applied prevention rules are BTB-032 (motion must clear a noise-calibrated
semantic bar), BTB-035 (captions below picture), BTB-039 (local/review evidence
is not public availability), BTB-094 (judge rendered continuity rather than
source intent alone), and BTB-095 (a correct-looking source must match the
spoken minute).
