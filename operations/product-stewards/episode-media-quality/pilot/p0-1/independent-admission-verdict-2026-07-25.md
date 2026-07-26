# Episode 04 P0.1 — independent evidence-admission verdict

**Date:** 2026-07-25  
**Judge:** independent historical, image and reference-admission reviewer  
**Scope:** P0.1 packet for Episode 04 Cues 15–19.  
**Overall verdict:** **PARTIAL — the packet establishes a sound factual and
rights-aware floor, but it is not yet an executable image or motion build
packet. No cue, source image, likeness, historical scene, transition, still or
motion product is approved. Trailer and Episodes 1–4 remain HOLD.**

## Independent checks performed

- Reopened every P0.1 document, `source-manifest.json`, the real-people Ada
  folder, the locked episode/site visual systems and the preceding independent
  verdict.
- Recomputed every local-evidence SHA-256 and reopened the bound full-resolution
  source frames. All five local paths, hashes and dimensions in the manifest
  match the actual files.
- Recreated all 17 coordinate crops from the stated native coordinates and
  compared them with the two exact 1920×1080 source frames.
- Independently compared Cue 15 with the nominated LUMINAiRY exterior.
- Rechecked the historical and rights assertions against current official
  pages from the [Science Museum](https://www.sciencemuseum.org.uk/objects-and-stories/women-computing),
  [Science Museum Babbage archive story](https://www.sciencemuseum.org.uk/objects-and-stories/charles-babbages-difference-engines-and-science-museum),
  [Science Museum Group 1843 catalogue record](https://collection.sciencemuseumgroup.org.uk/objects/co8652385/book-sketch-of-the-analytical-engine-invented-by-charles-babbage-esq),
  [National Portrait Gallery object record](https://www.npg.org.uk/collections/search/portrait/mw304536/Ada-Lovelace),
  [NPG portrait analysis](https://www.npg.org.uk/schools-hub/ada-lovelace-by-margaret-sarah-carpenter),
  and the [NPG rights page](https://www.npg.org.uk/collections/search/use-this-image/?mkey=mw304536).

## Gate results

| Sub-gate | Verdict | Independent finding |
|---|---|---|
| Historical factual floor | **PASS** | Official sources support the 1843 Menabrea translation plus Lovelace notes, Note G's Bernoulli-number procedure, the broader symbol/music insight, punched-card intent, and that only Analytical Engine trial pieces—not a complete operational Engine—existed. |
| Claim nuance | **PASS** | The packet correctly avoids treating “first programmer” as uncontested and uses the narrower procedure-for-an-unbuilt-machine formulation. It also separates a LAiDIES teaching metaphor from documentary fact. |
| NPG portrait metadata | **PASS** | NPG identifies Ada, Margaret Sarah Carpenter, oil on canvas, 1836, NPG L274. NPG's own analysis supports the white satin dress, red fur-lined train, tiara and high-status-not-scientific framing. None of that proves an 1843 work scene. |
| Portrait licensing boundary | **PASS, restrictive** | NPG marks the image Crown Copyright / UK Government Art Collection and states that rights-owner permission must be obtained, may involve fees and is not guaranteed. Keeping the painting out of the repository and treating it as evidence-only is correct. This PASS licenses nothing. |
| Science Museum image/object rights | **FAIL / not supplied** | The official pages support facts, but P0.1 contains no exact downloaded image/object asset, licence, permitted-use record or production checksum for an Engine trial piece, plan, Note G table or portrait. The brief correctly leaves these as future gates. |
| Remote source-manifest integrity | **PARTIAL** | URLs, titles, publishers, dates and evidence uses are coherent, but the three recorded `rawCaptureSha256` values are not independently verifiable because no raw captures are stored. Current repeat fetches returned the same byte counts yet different hashes on every request, consistent with dynamic HTML. `capturedAt` at exactly midnight is also not demonstrated as an actual retrieval time. |
| Local source-manifest integrity | **PASS for the five listed files; PARTIAL for packet closure** | All listed local hashes/dimensions pass. The manifest does not include the rejected Cue 18 still or Cue 19 loop as prohibited inputs, nor hashes of the P0.1 documents themselves, so it is not a self-contained closure manifest for the complete packet. |
| Cue 16–17 portrait count/position inventory | **PARTIAL** | The inventory correctly refuses face guessing and finds the prominent subjects. Several crops are not adequate evidence for their own descriptions: Cue 16 items 9–10 clip or combine adjacent right-wall figures; Cue 17 items 5–6 begin below the subjects' faces and mostly show architecture. These rows do not pass the claimed full-resolution coordinate-crop gate. |
| Identity admission for Cue 16–17 portraits | **FAIL** | No coordinate list can create identity provenance. Ada has no admitted likeness asset, no other portrait has a per-person licensed dossier/composition map, and the naval-uniform figure remains ambiguous. The removal/replacement threshold is correct. |
| Cue 15 no-match conclusion | **PASS as a negative ruling** | The cue source and existing site exterior have materially different façade massing, towers, rose-window/sign framing, entrance and composition. The named site asset cannot authenticate Cue 15. This PASS does not admit Cue 15; it validates the decision to replace it or establish a genuine exterior master. |
| Cue 18 historical/storyboard direction | **PARTIAL** | The gallery → editorial light/diagram field → provenance card is historically safer and qualifies conceptually as a semantic graphic event. It does not imply a working machine or documentary time travel. It still lacks an admitted Cue 17 start frame, exact final copy, font/layout assets, final audio/VTT timing, reduced-motion behaviour, implementation owner, checksums and judge evidence. It is not executable yet. |
| Cue 19 intentional-still brief | **PARTIAL** | “A method can be written for an unbuilt machine” is the correct teaching job, and the exclusions remove the old loop's false working-machine/music-note message. The brief still lacks an admitted Ada likeness, exact period/room interpretation rules in the visual itself, a rights-cleared Engine plan/trial-piece source, independently checked Note G content, composition assets and final narration binding. It is not executable yet. |
| Motion/release gate | **FAIL / out of packet** | There is no candidate, true-still control, motion measurement, normal-speed assembled review, checksum-bound final audio/transcript/VTT or player evidence. Motion and public status cannot advance from P0.1. |

## Source-manifest integrity correction required

The remote hashes must not be described as reproducible evidence in their
current form. Independent fetches observed:

- Science Museum Women in Computing: manifest `d40b3a07…6ec00a`, 106,520
  bytes; current repeated 106,520-byte responses produced different hashes,
  including `296f9b31…9ca5d2`, `a44bb2f0…50597` and
  `74f75396…a9db0`.
- Science Museum Babbage story: manifest `78e290f9…003e2`, 91,960 bytes;
  current response `c047c5a1…ad5c4`, also 91,960 bytes.
- Google Books discovery page: manifest `529170a7…b463e`, 40,251 bytes;
  repeated 40,251-byte responses produced `eb543b58…94d2`,
  `6bf71f9e…3beb` and `4f3fcf67…3361`.

This does not disprove the facts; the official page content still supports
them. Before packet closure, either preserve the exact lawful research
captures with paths/checksums and actual retrieval timestamps, or replace the
dynamic body hashes with claim-level evidence records (official URL,
access date, exact supported proposition and stable object/catalogue ID).
Do not retain a checksum that no reviewer can resolve to bytes.

## Portrait-coordinate correction required

The inventory's identity outcome remains correct, but the evidence mechanics
need repair:

1. Re-index Cue 16 right-wall items 9–10 with enough margin to include one
   complete readable figure per crop and no adjacent-face ambiguity.
2. Move Cue 17 items 5–6 upward so the complete head/body region is inside the
   declared rectangle; the current `y1=510` and `y1=550` cuts mostly below the
   claimed people.
3. Regenerate all coordinate thumbnails as a contact sheet strictly for
   coordinate QA, bind the contact sheet checksum, and retain the full source
   as authority. A crop remains location evidence only, never identity proof.

## What may advance now

These bounded outputs may advance without implying cue or media approval:

1. **Historical language guard:** the factual floor and allowed/prohibited
   claims may be copied into the eventual build packet.
2. **Cue 15 replacement route:** architecture/reference work may seek one
   approved, checksum-bound exterior master. The current cue may not be used
   as its own authority.
3. **Cue 16–17 removal map:** coordinate repair and a deterministic
   keep-as-unidentified-environment versus remove/replace disposition may be
   completed. Named likeness production remains blocked.
4. **Cue 18 specification:** the semantic graphic-event concept may advance
   to a real build packet only after its start/end sources, exact copy,
   audio/VTT clock, reduced-motion equivalent and acceptance evidence are
   bound. No render may begin from the current storyboard.
5. **Cue 19 sourcing:** rights-cleared/public-domain likeness research, an
   exact Engine plan/trial-piece asset, and independently checked Note G
   source content may proceed. The current still brief may become a build
   packet only after those assets and rights records exist.

## Exact next admission packet

The smallest safe continuation is **P0.2 — source and execution binding**, not
image generation:

- repair the coordinate and remote-capture records;
- supply one admitted Ada likeness asset with licence and era limitations;
- supply one exact, rights-cleared Engine plan/trial-piece source and one exact
  Note G evidence source with permitted-use records;
- choose or create an approved LUMINAiRY exterior master as an owner decision;
- bind Cue 18 exact editorial copy, start/end source checksums and reduced-motion
  state; and
- bind Cue 19 composition fields to final narration/transcript/VTT timing.

After a separate judge passes P0.2, a maker may receive a candidate-production
packet. Even then, each rendered image and transition requires independent
image/history/motion judgment and Ali's visual ruling before any episode or
public claim changes.

## Learning scan

This review applies BTB-028, BTB-032, BTB-094 and BTB-095. One additional
reusable control should be considered by the portfolio owner: **a remote HTML
hash is not durable provenance when the captured bytes are not retained and
the page changes per request.** Store the evidence bytes lawfully or bind the
claim to a stable official object ID and dated proposition; never present an
orphan checksum as independently verifiable proof.
