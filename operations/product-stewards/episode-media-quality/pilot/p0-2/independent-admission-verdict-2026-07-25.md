# Episode 04 P0.2 — independent source/execution admission verdict

**Date:** 2026-07-25  
**Judge:** independent historical, image, rights and reference-admission reviewer  
**Scope:** Episode 04 P0.2 source/execution packet, with the corrected P0.1
records it binds.  
**Overall verdict:** **PARTIAL ADMISSION — the three retained reference assets
may advance into a later production packet only in the narrow research roles
defined below. The P0.2 packet is not an executable production packet. Cues
18–19, every existing or future candidate, all episode media and the release
remain unapproved.**

## Independent checks performed

- Recomputed every hash in `packet-manifest.json`, including all bound P0.1
  documents, P0.2 documents, retained assets and the two prohibited inputs.
  Every recorded hash resolves to the stated local bytes.
- Recomputed every crop and contact-sheet hash in
  `coordinate-qa-manifest.json`, reopened both 1920×1080 authority frames, and
  visually compared the repaired crops with the complete portrait inventories.
- Reopened the retained 5740×7420 Ada engraving, 3796×2557 Engine-plan
  photograph and complete Project Gutenberg HTML, including `NOTE_G`, the
  page-66 diagram heading, pages 67–68 and the embedded licence.
- Rechecked the two Commons records and their fixed record IDs, the
  [Creative Commons Attribution 4.0 terms](https://creativecommons.org/licenses/by/4.0/),
  the [Project Gutenberg catalogue record](https://www.gutenberg.org/ebooks/75107)
  and the [Project Gutenberg licence](https://www.gutenberg.org/policy/license.html).
- Rechecked every Cue 18/19 field against the retained assets, failed source
  admissions, prohibited inputs and unresolved clock dependencies.

## Integrity and provenance ruling

| Sub-gate | Verdict | Independent finding |
|---|---|---|
| P0.2 packet-manifest hashes | **PASS** | Every P0.1 document, P0.2 subordinate document, retained byte and prohibited input matches its recorded SHA-256. The packet-manifest file itself hashes to `b9a9e3762bda221692b5eff63999425ff0788cbee071f928a386c8d19e0bee43`, as stated in the external binding record. |
| External binding-record model | **PASS, bounded** | Keeping `source-execution-binding-2026-07-25.md` outside the manifest avoids a self-hash cycle and is explicitly disclosed. The manifest therefore closes its subordinate packet, not the external judgment or future production packet. |
| Corrected P0.1 remote provenance | **PASS** | The former orphan hashes are removed. The corrected records bind official URL, publisher, stable object ID where available, exact supported proposition and a real access timestamp; hashes are reserved for retained bytes. This repairs the P0.1 integrity defect. |
| Prohibited-input binding | **PASS** | Cue 18's rejected transition still and Cue 19's rejected loop are both checksum-bound as prohibited inputs. Neither may enter a candidate, derivative, reference composite or fallback path. |
| Retained-byte integrity | **PASS** | The Ada engraving, Engine-plan photograph and Project Gutenberg HTML match the register hashes, dimensions/content anchors and actual local files. |

## Reference-asset admission

| Asset | Verdict | Permitted packet role | Non-negotiable limits |
|---|---|---|---|
| Ada engraving, 1838/c.1841 | **ADMIT AS LIKENESS RESEARCH ONLY** | May enter a production packet as a checksum-bound period likeness reference for an explicitly interpretive Ada figure. The supplied Chalon/Mote attribution and public-domain statement are adequate for this role. | It is not documentary proof of Ada's exact 1843 clothing, room, pose, companions or activity; it does not identify any existing MAiVENS portrait; it may not be used to manufacture a claimed historical scene. NPG L274 remains prohibited. |
| Babbage Analytical Engine plan photograph | **ADMIT AS PLAN/PROPOSED-MACHINE RESEARCH ONLY** | May enter a production packet as a checksum-bound reference for a plan-like representation of the proposed Analytical Engine. The Arnold Reinhold attribution, CC BY 4.0 link and required changes notice are correctly recorded. | Any reproduced or adapted use must carry appropriate credit, licence link and change indication. The plan must not be presented as a completed or operating Engine, or as evidence of Ada's room or activity. |
| Menabrea/Lovelace 1843 text, Project Gutenberg #75107 | **ADMIT AS PRIMARY-TEXT VERIFICATION ONLY** | May enter a production packet to verify the 1843 publication context, Note G and its Bernoulli-number procedure. The retained HTML contains the stated anchor, diagram heading and licence. | This is not blanket approval for a screen facsimile, adapted typesetting, invented handwriting, equations or quotation. Project Gutenberg identifies the work as public domain in the USA but directs users outside the USA to check local law; its trademark/licence rules also apply when its name remains associated with redistributed content. Any direct visual reproduction still needs a separate rights and typography ruling. |

These admissions are references, not generated-art approval. None authorises a
composition, costume, room, manuscript, graphic card, character sheet, image,
animation or clip.

## Historical and teaching relevance

| Sub-gate | Verdict | Independent finding |
|---|---|---|
| Ada relevance | **PASS, limited** | The engraving is a contemporaneous-period likeness source, but its own record dates the underlying portrait to 1838 and the bordered version to about 1841. The packet states that limitation correctly. |
| Engine relevance | **PASS, limited** | The retained image is a photograph of an 1840 plan. It supports “proposed/unbuilt Engine” visual language, not a complete working machine. |
| Note G relevance | **PASS, limited** | The retained primary text contains Note G and the diagram for computing Bernoulli numbers by the Engine. It supports the teaching proposition that a procedure was written for the proposed machine; it does not prove that the machine executed it. |
| Claim nuance | **PASS** | The packet avoids an unqualified “first programmer” claim, invented execution, invented quotation and the false implication of a documented 1843 workroom. |

## Coordinate-QA ruling

**Mechanical crop integrity passes; unique-subject inventory closure fails.**
The four derivatives and contact sheet are correctly generated from the
checksum-bound source frames, and the contact sheet correctly refuses identity.
However, the repaired rows do not all represent newly isolated subjects:

- Cue 16 item 10 (`x1680–1870,y130–630`) substantially duplicates item 11
  (`x1710–1885,y155–625`): both describe the same dominant arms-crossed woman.
- Cue 17 item 5 (`x1490–1595,y340–640`) substantially duplicates item 3
  (`x1430–1560,y375–665`): both describe the same arms-crossed woman.
- Cue 17 item 6 (`x1595–1700,y330–670`) substantially duplicates item 4
  (`x1580–1675,y450–690`): both describe the same blue-clad figure.

Therefore the contact sheet proves crop location and complete heads/torsos, but
the inventory still inflates its unique-person count. De-duplicate those rows
and re-index any genuinely omitted far-right figures before describing the
portrait inventory as repaired. This defect never changes the core identity
ruling: **no crop, figure or failed source frame is an admitted person or
production source.**

## Cue 18/19 execution ruling

| Cue | Verdict | Finding |
|---|---|---|
| Cue 18 semantic bridge | **SPECIFICATION MAY ADVANCE; EXECUTION FAILS** | The gallery-to-editorial-evidence-field teaching event, historical exclusions and static reduced-motion equivalent are coherent. The exact card copy and source marker may proceed to copy/typography/legal review. The admitted start plate does not exist, the proposed start source remains failed, the end card is unmade, and the final audio/transcript/VTT clock is absent. No maker route is open. |
| Cue 19 intentional still | **REFERENCE BINDINGS MAY ADVANCE; EXECUTION FAILS** | The teaching job—“a method can be written for an unbuilt machine”—and the intentional-still rule are sound. The three references above may be bound into a later production brief. No exact composition, approved Ada interpretation, room/dress/manuscript treatment, checked on-screen Note G content or candidate still exists. No generation or render is authorised. |

The Cue 18 source marker is acceptable only as a reference citation; it must
not imply that Project Gutenberg was the 1843 publisher. If Project Gutenberg
text or branding is actually displayed or redistributed, the applicable
licence/trademark treatment must be resolved in the candidate packet.

## Explicit blocks that remain

1. **Final audio, as-recorded transcript, VTT and authoritative cue clock:
   BLOCKED.** The current narration file is only a candidate; the current VTT
   does not bind the proposed 245.30–260.00 split. No timing may be inferred,
   trimmed, stretched or fabricated.
2. **Ali's LUMINAiRY exterior-master choice for Cue 15: BLOCKED.** P0.2 cannot
   select it and this verdict does not substitute for Ali's visual ruling.
3. **Cue 16–17 source/identity admission: BLOCKED.** The frames remain failed,
   and the coordinate inventory still requires de-duplication.
4. **Cue 18 start/end sources and candidate: BLOCKED.**
5. **Cue 19 composition and candidate: BLOCKED.**
6. **Motion, assembled playback, episode approval and public release:
   BLOCKED.** No trailer or Episode 1–4 motion-film approval follows from this
   source ruling.

## What may advance now

Only these bounded components may be carried into the next production packet:

1. the corrected P0.1 claim-level provenance model and prohibited-input hashes;
2. the Ada engraving as limited likeness research;
3. the Engine plan as limited proposed/unbuilt-machine research with full
   CC BY 4.0 attribution handling;
4. the Project Gutenberg file as limited primary-text verification;
5. Cue 18's semantic-event specification for further copy, typography,
   accessibility and source binding; and
6. Cue 19's teaching job, intentional-still mode and historical exclusions.

The next packet must bind the final audio/transcript/VTT clock, an independently
admitted Cue 18 start and end plate, an exact Cue 19 composition with
rights/attribution treatment, the corrected unique-subject inventory, candidate
checksums and the applicable history/image/accessibility/motion acceptance
evidence. Until then, this is a **reference admission**, not a build approval.

## Learning scan

This review applies the existing rule that retained lawful bytes may be hashed
while dynamic source claims require reopenable official records and precise
propositions. One additional prevention rule should be reconciled by the
portfolio owner into the canonical painpoints ledger: **a crop repair must be
tested for subject uniqueness against the complete inventory, not merely for
pixel bounds and complete anatomy; overlapping rectangles can make a contact
sheet look repaired while silently counting the same person twice.**
