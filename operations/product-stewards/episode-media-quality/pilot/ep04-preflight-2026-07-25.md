# Episode 04 representative-pipeline pilot — authority/reference preflight

**Date:** 2026-07-25
**Status:** **BLOCKED — authority and reference admission incomplete; no pilot manifest may claim PASS.**
**Scope:** read-only preflight of the conditionally recommended `03:22.00–04:20.00` (`202.00–260.00`) Episode 04 slice. This is neither a production selection nor a media approval.

## Operating ruling recorded

The Episode Product Owner operational ruling supplied for this preflight is:

> Proceed with this Episode 04 slice as a pipeline proof because Episode 02 has no admissible source. This does **not** demote, release, or otherwise resolve Episode 02.

This is a priority/sequencing ruling only. It does not lock final audio, admit any image, approve an existing clip, or clear a full Episode 04 candidate. Episode 02 remains **HOLD**: the 187.60–203.30 regular-café → new-café transition has no safe non-rejected source (`eod-2026-07-25-release-gate.md`).

## Authority outcome

| Authority | Evidence found | Preflight result |
|---|---|---|
| Meaning/facts | `content/episodes/episode-04.canon.md`, beats 3–4 and Ada guards | **PASS as canon authority only.** It supports the LUMINAiRY/MAiVENS/Ada progression and guards Ada as 1843 Note G / an algorithm intended for an unbuilt machine. |
| Performance words | `operations/audio/episode-04-elevenlabs-v3-tagged.txt`, SHA-256 `64aec71e47a9293b3a1ad4c84ba44ca0fd782f470b9dbc9558bb738ebda9a45a` | **PASS as written performance-script authority only.** The canon calls it the narration master and marks the old script stale. It is not evidence of the recorded bytes. |
| Local narration bytes | `content/music/episode-04-narration.mp3`, SHA-256 `f007a338284550fe27a8e035daf10936a6e1ca0825a40e36484013fce8383688` | **PENDING.** The file exists and existing assembly/QC records use this hash, but no Episode Product Owner + Audio & Caption Owner ruling binds it as the final approved recording, reconciles the noted re-recording, or binds an as-recorded transcript. Existence/hash is not final-audio authority. |
| Current cue placement | `content/episodes/episode-04-cues.json`, SHA-256 `8cd20dc34aeada067262fdde797308e370749194a560cc9d8878d092cc60baf6` | **PENDING.** It names the selected sources at 202.00, 220.00, 240.00, 245.30 and 250.30 but does not prove audio alignment or source approval. |
| Current captions | `operations/captions/episode-04.vtt` and `assets/captions/episode-04.vtt`, identical SHA-256 `1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4` | **FAIL for manifest binding today.** No as-recorded transcript asset or audio↔transcript↔VTT reconciliation exists. The duplicate path establishes byte identity, not derivation from the narration MP3. |

### Exact caption-clock conflict

The VTT text is semantically consistent with the intended excerpt, but it cannot be borrowed as a bound final transcript:

- Pilot clock begins at `202.00` / `03:22.000`; the first relevant VTT cue begins at `03:23.560`.
- The VTT reaches the narrative transition at `04:05.700–04:09.380` and begins the mechanical-calculator line at `04:10.620`.
- The proposed pilot ends at `260.00` / `04:20.000`, while that final VTT cue ends at `04:20.400`.

Therefore the existing VTT cannot satisfy both an exact `202.00–260.00` final clock and the pilot validator's audio/as-recorded/caption binding. The Audio & Caption Owner must either validate and retime a checksum-bound as-recorded transcript/VTT for this exact end, or make a separately recorded decision to change the pilot boundary. Do not silently truncate caption text or call the tagged script the as-recorded transcript.

## Source and reference admission by cue

`PENDING` means the asset exists or has historical selection evidence but lacks the current manifest admission and independent cue-level ruling. `FAIL` means it cannot be admitted as a pilot source/reference in its current state. No item below inherits a PASS from a filename, a legacy contact-sheet selection, a local encode, or the synthetic validator fixture.

| Cue / job / proposed source | Source state | Identity reference | Style reference | Location/era reference | Exact blocker |
|---|---|---|---|---|---|
| `202.00–220.00` establish LUMINAiRY — `ep04-open-16-luminairy-approach-comic-v6-correct-sign-1920.png` SHA `9ae5f55fb882dd054452dfad00b51c2246974c44f1f4f7a98c8c25306a601cae` | **PENDING.** Exists. The older Ali manifest selected v3, not this v6; the segment record expressly says no independent image ruling exists. | If the Heroine is visible: the locked Heroine identity/style authority exists at `ep04-heroine-face-lock-approved-ali.png`, SHA `c9653ce7fa6160494e7b40440ef7d47aa9d53fcdc31037bf280c4a3177756422`; **PENDING cue admission**. | Same locked master is the people-style authority; environmental category library is locked, but **PENDING cue admission**. | Candidate LUMINAiRY building refs exist (`assets/sunnyvaile-buildings/y2k-v3/15-the-luminairy.webp`, SHA `a35eb4d36a69d7452637f34b7ec18d767123109d68075bebbb8b4a728ddb5f72`; `assets/building-interiors/luminairy-nave.jpg`, SHA `0d7a4681ad379c7fc8fb3fd791d5711a2f6938214e8750743778afba73266533`), but neither is recorded as this cue's approved location reference. | Image Production Director must nominate one precise building/location ref and Image Quality Judge must independently assess source frame, correct `LUMINAiRY` spelling, identity, setting, style and narration relevance. |
| `220.00–240.00` explain MAiVENS — `ep04-open-17-maivens-hall-comic-v3-canonical-cathedral-interior-1920.png` SHA `007ff8202a7518f129096167730b30895dd9eae95b7faddffabf7c2331737f5a` | **PENDING.** Exists and appears in the 2026-07-19 Ali-approved finals, but there is no current per-person identity/location reference bundle or independent image verdict. | **FAIL/PENDING:** no admitted identity list identifies every MAiVEN portrait actually shown. The canon's MAiVEN portrait library is a candidate source, not a cue-level identity admission. | Master people style authority exists; **PENDING cue admission**. | **PENDING:** a LUMINAiRY/MAiVEN-wing reference must be selected and SHA-bound. `assets/sunnyvaile-interiors/luminairy-maivens-wing.png` exists, but no record admits it for this cue. | Do not use the word “canonical” in the filename as approval. Name every depicted historic person or confirm the image contains no identifiable person; bind one location reference; judge at face-crop and full-frame scale. |
| `240.00–245.30` deliberate still / lights soften — `ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png` SHA `1fe2f9dfb33f35b6fc23d0159455778169dea38e56cec96b5b1db4677782ac6c` | **PENDING.** Exists and has a legacy Ali final-selection entry; it has no independent pilot cue verdict. | Heroine lock above is an eligible authority, **PENDING cue admission**. Ada/MAiVEN imagery has no admitted person-specific bundle. | Master people style authority exists; **PENDING cue admission**. | **PENDING:** bind the specific MAiVENS-hall / stained-glass setting reference; a generic category reference is insufficient. | Independent image judge must verify the Heroine against face lock, all visible historical portraits, cathedral/wing setting, and the still's reading-time purpose. |
| `245.30–250.30` semantic London-1843 transition — `ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png` SHA `c2bf2e70f7b1cf88a9e731342cc4affa4ccf904229707fa2a04151f980deb34c` | **PENDING.** Exists and has a legacy Ali final-selection entry. It is a still, not the required admitted semantic event. | **PENDING/contract gap:** the current validator requires an approved identity reference for every cue, including graphic transitions, but no approved person/graphic exemption is defined. Do not insert a fake identity just to pass the schema. | The visual-system lock authorizes comic-cover collage/panel grammar as a category reference; exact transition style input remains **PENDING**. | **FAIL/PENDING:** no SHA-bound historical London-1843 / Ada-era location reference is admitted. The canon establishes 1843 and Note G; it does not itself establish that a particular imagined London scene is historically correct. | Animation Director must declare a real semantic event (for example, a page/stained-glass transition whose state change lands on London/1843), and the contract owner must supply an approved transition-reference rule or a legitimate no-person exemption. A pan is expressly inadmissible. |
| `250.30–260.00` reinforce Ada/mechanical calculator — `ep04-scene-03-ada-loop-v1.mp4` SHA `343e37c02c4873ae71c7fed8e21bb6d4c52b7ccc0bfb05770a223b84ee36b3b4` | **FAIL as an admitted source; PENDING only as a candidate input.** The selection record and Episode 04 release gate leave its motion evidence, historical-person identity and era review open. | Candidate Ada portrait files exist (`assets/mavens/y2k-stained-glass-v2/ada-lovelace-y2k-stained-glass.png`, SHA `94a3515876659d95d79ac48b0ae738db85c4d86cbd49f3c39099e43fa3ab1e88`), but they are not an approved pilot identity reference. | Master people style authority exists; **PENDING cue admission**. | **FAIL/PENDING:** no admitted reference proves the correct period, dress, room/object, or an appropriate representation of Babbage's unbuilt Analytical Engine. | Image Production Director + historical/Story Editor must bind an Ada identity/period/object reference set; Motion Quality Judge must inspect a true-still control and a declared semantic event. If the clip cannot pass, use a newly admitted intentional still rather than camera drift. |

## Rejected/superseded controls

- `operations/ep04-cut-decisions.md` bans `ep04-open-16-luminairy-approach-comic-v5-capital-I`; it must not enter the source or reference bundle. The rejected LUMINAiRY sign-composite directory is also prohibited.
- `.superseded-loops-20260722/` contains superseded LUMINAiRY/MAiVENS loops. Do not substitute either for a motion gate.
- `comic-barsetter` and `comic-v2-graphic-novel` are superseded passes, not style references. The locked visual system also excludes old ensemble/current-cast candidates and retired wordmarks.
- Existing local Episode 04 v8, intermediate clips, source-level selection records, observed-frame sampling, and synthetic pilot fixtures are **not** pilot approvals. The release gate keeps Episode 04 on HOLD pending normal-speed owner watch, historical identity/era review, audio/caption proof, and readable motion controls.

## Manifest prefill recommendation — deliberately non-passing

Create no real manifest until the Audio & Caption Owner delivers the binding artifacts. When the specialist starts the record, prefill these fields as follows and retain **PENDING** or **FAIL** until the named evidence exists:

```text
pilotId: ep04-luminairy-maivens-london-1843
candidate: PENDING (no new exact 58.00-second render/checksum)
narration:
  asset: content/music/episode-04-narration.mp3
  sha256: f007a338284550fe27a8e035daf10936a6e1ca0825a40e36484013fce8383688
  finalAuthority: PENDING
  asRecordedTranscript: FAIL (missing)
captions:
  asset: operations/captions/episode-04.vtt
  sha256: 1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4
  derivesFromNarrationHash: PENDING
  exactPilotBoundary: FAIL (03:23.560 start; 04:20.400 end)
  presentation: PENDING (must be verified player-below-picture)
cues:
  202.00–220.00 source 9ae5...601cae: PENDING
  220.00–240.00 source 007f...1737f5a: PENDING
  240.00–245.30 source 1fe2...782ac6c: PENDING
  245.30–250.30 source c2bf...deb34c: PENDING; semantic-event plan FAIL
  250.30–260.00 source 343e...ee36b3b4: FAIL as source admission; PENDING candidate review
referenceAssetIds / referenceHashes: FAIL for every cue until actual identity/style/location bundles are admitted
all cue verdicts: PENDING
rejectedAssetCheck: PENDING
automated results (hashes, timing, technical, decode, captions, still control): PENDING
Ali visual ruling: PENDING
```

The real schema permits only `approved`, `rejected`, or `superseded` asset status; therefore this prefill is an operational worksheet, not a validator-ready JSON file. Do not label a real asset `approved` merely to make the schema validate. The closed gate must remain failing until the appropriate owner produces evidence.

## Exact blockers and next executable specialist work

1. **Episode Product Owner + Audio & Caption Owner:** issue a checksum-bound ruling that either declares MP3 `f007…3688` final or names its replacement; create an as-recorded transcript from that exact audio; reconcile the tagged performance script; generate/verify a VTT bound to both hashes; resolve the 202.00/203.560 start and 260.00/260.400 end boundary.
2. **Story/Continuity Editor + Image Production Director:** make a five-cue reference-admission sheet naming every depicted person, one exact style authority and one precise setting/era/object reference per cue, all with SHA-256. For Ada, include the historical identity, 1843 period, and Analytical Engine representation; do not infer a London setting from the transition label alone.
3. **Independent Image Quality Judge:** review each exact source frame against that bundle. The legacy Ali selections are useful provenance but do not replace independent cue-level PASS.
4. **Animation Director + Motion Quality Judge:** write the 245.30–250.30 semantic-transition plan, decide whether the Ada loop is admissible, and record true-still controls plus human semantic verdict. Retain the MAiVENS hold as an intentional still only if its reason and timing pass.
5. **Video Editor, then Release QA:** only after steps 1–4, render a new checksum-bound 58-second candidate, run the deterministic manifest gate, and test the local Screening Room player/captions/fallback/reduced-motion journey. No full-episode change, `EPISODE_FILMS` change, deployment, or public claim follows from this pilot.

## Learning scan

No new reusable production failure is claimed from this read-only preflight. Applied prevention rules: BTB-032 (semantic motion must clear a true-still/noise control), BTB-035 (captions below picture), BTB-039 (local evidence is not public availability), BTB-043 (performance script is not an as-recorded transcript), BTB-094 (reference admission must block assembly), and BTB-095 (a correct-looking source must match its spoken minute).
