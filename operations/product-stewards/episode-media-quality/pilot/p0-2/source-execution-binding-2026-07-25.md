# Episode 04 P0.2 — source/execution binding record

**Status:** **READY FOR INDEPENDENT P0.2 REVIEW, NOT READY FOR PRODUCTION.**
All states below are deliberately narrow. This packet does not reverse the
P0.1 verdict or approve any cue, image, clip, animation, episode or release.

## Corrected P0.1 integrity model

P0.1's old remote body hashes were withdrawn because their bytes were not
retained and repeated fetches of dynamic HTML produced different hashes. The
corrected P0.1 manifest now records a claim as: official canonical URL,
publisher, stable object ID where the publisher provides one, exact supported
proposition, and access time. A SHA-256 is used only for retained lawful bytes
or local source files.

The complete P0.2 packet register is `packet-manifest.json`, SHA-256
`f0bd50bbf0e2d5397ace2eed9f4d02adfe385b62ab22334833a99241e93cee85`.
It includes both prohibited inputs and all subordinate document/asset hashes.
This binding record sits outside that manifest to avoid a self-hash paradox.

| Record | SHA-256 | Result |
|---|---|---|
| Corrected P0.1 source manifest | `270bd16601738dcf11715f4ba35f27f4ba7118d7183ffd94431f6df88b63f349` | Contains the remote integrity correction, both prohibited Cue 18/19 inputs, and corrected P0.1 document bindings. |
| Corrected Cue 16–17 inventory | `50714500e8b69ef078838f234793d0a4d0c069a8d662b85ce4f7f298360510a1` | Keeps unique Cue 16 item 9; removes Cue 16 item 10 and Cue 17 items 5–6 as duplicate subjects. No identity is admitted. |
| P0.2 source asset register | `1e893ffd58b5d9f19ba7d7ff1b4e9648da11bc5634259ffac7610a2a5f966a83` | Rights, attribution, era limits and use scopes for retained sources. |
| P0.2 coordinate QA manifest | `1e1a5850488709973adfbcc8f6733b73a4e2428af7ee7baec0cbeefc9a7df373` | Binds the original frames, one unique repaired crop, the three duplicate-row removals and the regenerated contact sheet. |
| P0.2 duplicate-coordinate repair | `f7bc2db8abc8a16f4be20de0253c48fe34bac56fdf7ef578205a2a5d056a0186` | Records why the three rows were removed instead of inventing replacement subjects. |
| P0.2 Cue 18/19 execution fields | **Recompute at independent review** | This document is the checklist; it remains incomplete by design because audio, owner selection and any candidate are missing. |

## Retained reference bytes

| Asset | SHA-256 | Rights/use state | Binding outcome |
|---|---|---|---|
| Ada engraving, 1838/c.1841 | `328ad98469b7cc25fcccca6c625d28625f4bb10befd424a1a3356c1422cd44c8` | Public-domain record; required attribution preserved | **PENDING** likeness/history/image judgment |
| Babbage plan photo, 1840 | `d830bdfcbdbf0b2998b450b1caacd3973a47c3ea0219d4290a43b7679793d9a5` | CC BY 4.0; attribution, licence link and changes notice required | **PENDING** history/image/cue judgment |
| 1843 Menabrea/Lovelace text (Note G anchor) | `c7927f7454c9f2ae6bdc624b42b925dc5f9d6a87f844c6dcf71abbc7163d8fe7` | Project Gutenberg licence; retained for primary-text/reference verification only | **PENDING** primary-text/typography/cue judgment |

The retained bytes make the references inspectable. They do not turn the
assets into an approved likeness, a documented 1843 scene, a typographic
facsimile, a valid source frame, or a licence to use NPG L274.

## Coordinate-QA result

The contact sheet at
`coordinate-qa/coordinate-qa-contact-sheet.png` SHA-256
`0403588a31412e6c79c7aa0b2be24a834dc3e0aa2fe986377b34e5d0e9a4351a`
is derived only to prove Cue 16 item 9's unique repaired crop location. Cue 16
item 10 and Cue 17 items 5–6 were removed because they duplicated existing
subjects. The sheet is labelled location-only and deliberately declines
identity. Its original 1920×1080 frames remain failed as sources until
independent review.

## Cue 18/19 execution result

The detailed field sheet supplies precise copy and limits but reports all
production dependencies. In particular, no final narration/audio/VTT clock is
available, and the selected 58-second pilot range conflicts with the current
caption boundaries. The Cue 18 graphic end plate does not exist. The Cue 19
intentional still does not exist. Neither may be made from this record without
passing the next independent gate.

## Independent review must fail closed on any of these

- a dynamic-page hash reappearing without retained lawful bytes;
- a missing source file/checksum, incomplete attribution or licence mismatch;
- any use of NPG L274 without written permission;
- a coordinate crop being treated as a likeness proof;
- a plan being presented as a completed/operating Analytical Engine;
- unauthorised 1843 wardrobe/room/manuscript claims;
- Cue 18's rejected still or Cue 19's rejected loop entering a candidate;
- fabricated audio, transcript, cue timing or owner ruling.

## Learning scan

**Qualifying prevention rule:** a remote HTML checksum is not durable
provenance when the exact lawful bytes are not retained. For dynamic pages,
record the official URL, publisher, stable object/catalogue ID when available,
the exact supported proposition and access time; otherwise retain lawful bytes
and their checksum. Never present an orphan hash as independently reproducible
evidence.

**Possible Behind the Build angle:** “Why we stopped treating a hash as a
source: provenance needs something a future reviewer can actually reopen.”
The canonical painpoints ledger is deliberately not edited in this bounded
P0.2 lane because it is shared dirty work outside the assigned file scope; the
portfolio owner should reconcile this rule into that ledger with the other
P0.2 review outcome.

**Next action:** independent P0.2 admission judgment, then (only if it passes)
an owner-approved production packet with final audio/VTT and Cue 15 exterior
master. No maker route opens before that result.
