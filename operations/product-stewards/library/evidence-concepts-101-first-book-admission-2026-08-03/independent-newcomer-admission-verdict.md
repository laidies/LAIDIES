# Concepts 101 first-book independent newcomer admission verdict

Judged: 2026-08-03 America/Vancouver
Role: independent newcomer / product-learning / interaction judge
Successor verdict: **PASS — exact isolated candidate accepted for bounded production integration**

The repaired successor clears the only defect that caused the predecessor HOLD. This accepts the exact local newcomer, reader, teaching and device-local Puffy behavior below. It is not production integration, Ali's taste/depth approval, deployment, publication or public-origin verification.

## Exact accepted successor tuple

| Artifact | SHA-256 |
| --- | --- |
| `maker-receipt.md` | `9513aa09e98307d6ef276025839510d465d6f9d3d1e17356f38e36fa5a7c976f` |
| `candidate-root/library.html` | `921cb126e40c5fb4111391978d203018d515286f0c1dc35ba00d30bca57854c6` |
| candidate admission manifest | `0b921f85af7c5e90188423d3f7ac4ea2b07a7d2d6d3fda316fb3eea7ccb6026b` |
| rendered Concepts 101 content | `bb25fae48b640f53112bd9191391e66dbbf5bf4a8603d6c5bd55a8cf85508f4b` |
| current-source recheck | `71f914c9bdbdd2a4b239ada885c2e99d17ad73df0d6c84035516793801c4056f` |
| preserved browser/adversarial suite | `3232e6ad4a9244dfeb8dc31d39973b3acfc8c35b4b67f13080fd2a689296b40f` |
| repaired TOC activation suite | `22c2830ee4850756d82401881c02b7cc81f8f7ea4e773cf4e395b46212b3259c` |
| production `library.html` predecessor/current byte | `7f0a4ca7b27fbc0ffde7b00773cf80dfeec443a1a8a9acbb97541b1e3f7bcb38` |

Content version: `concepts-101-2026-08-03.1`.

Historical rejected predecessor `candidate-root/library.html`: `f498ee4a932617a9ff872a6658395ae1e651b183339ea5c9134ad026e6fb084c`. The historical handoff and integrity manifest remain rejection evidence for that predecessor and do not bind this successor.

## Independent repair judgment

The successor removes the closure-breaking inline contents handlers. `setBookToc()` now binds both desktop and mobile copies through `bindBookTocListeners()`. A valid activation:

- resolves only a destination inside the live reader;
- updates both contents copies with `aria-current="location"`;
- moves focus to the destination heading;
- closes the mobile section finder; and
- scrolls the heading into the reading viewport with reduced-motion support.

The repaired activation suite was independently inspected and rerun against the exact successor:

```text
CONCEPTS 101 TOC ACTIVATION PASS
checks=50
widths=1440,390,320 activations=mouse,keyboard sections=6
```

It activated all six destinations by pointer and Enter at each required width: 36 real activations. Every activation required scroll movement, a visible destination, focus on the exact heading, matching desktop/mobile current-location state, mobile-finder closure where applicable and zero page errors.

The gate was independently calibrated with `CONCEPTS_TOC_CALIBRATION=remove-listeners`. The server mutated only its in-memory response; no artifact changed. The run exited `1` and all 36 activation assertions failed: focus and current-location state were absent, and the mobile finder remained open at 390 and 320. Native fragment scrolling alone could not produce a false PASS.

## Preserved independent findings

The Concepts body, manifest, current-source recheck, whole-book identity attributes, visitor states and preserved adversarial test bytes are unchanged from the predecessor judgment. Minimum-sufficient rejudgment therefore reused those still-bound findings and reran their real downstream suites rather than repeating settled content work.

| Requirement | Finding |
| --- | --- |
| Before-open understanding | **PASS.** Cover preview states subject, plain-English depth, shelf and ready-now availability before opening. |
| Book/content distinction from classes | **PASS.** The 5,287-word, six-section continuous reference builds a reusable mental model; it is not a class sequence or page-flip imitation. |
| Teaching quality | **PASS.** It moves from human reason to concrete mechanism, consequence and better question. LAiDIES/Rewind analogies are followed by a limit or factual restatement. |
| Currentness | **PASS for the exact content on 2026-08-03.** The unchanged independent official-source check supports its context/training, product-memory, model-cutoff and qualified sandbox-incident claims. |
| Continuous reader and contents | **PASS.** The reader is book-like and continuous; every section route now works by pointer and keyboard at 1440, 390 and 320. |
| Whole-book and exact-section saves | **PASS within the device-local candidate.** Distinct book/section records retain exact book, section and content-version identity; all 10 configured active stickers are available; readback, Closet reopen/remove and held recheck pass. |
| Visitor-state truth | **PASS.** First-time, returning without Card, device-local Card and verified-account-local-Puffy states pass; account wording explicitly does not promise sync, ownership, reward or backup. |
| Failure states | **PASS.** Storage denial, corrupt pouch/board, held-on-reopen, wrong artifact/version/section/sticker and false-sync calibrations remain covered. |
| Responsive/reflow/accessibility | **PASS within tested scope.** 1440, 390, 320 and 200% content reflow remain without horizontal overflow; reader focus/Escape, exact destination focus/current state and mobile closure pass. |
| Production isolation | **PASS.** Production `library.html` still hashes to `7f0a4ca7b27fbc0ffde7b00773cf80dfeec443a1a8a9acbb97541b1e3f7bcb38`. This rejudgment changed no production source or manifest. |

Independent reruns against the exact successor:

```text
CONCEPTS 101 FIRST-BOOK ADMISSION PASS
checks=48
external_requests_blocked=29

LIBRAiRY PRODUCT PASS
checks=68
external_requests_blocked=44
```

Both JavaScript test files also pass `node --check`.

## Exact integration cutline

An integration owner may now apply only the accepted compiler admission record plus the three whole-book Puffy identity attributes represented by the exact successor. The owner must then rerun the full Library/Closet and public-build gates against the resulting production bytes. Any other source, content, layout, state or manifest change requires a new bound judgment.

## Gates this verdict does not clear

- Ali's taste and depth decision.
- Native Safari, VoiceOver or native-browser zoom evidence if the Library or Release owner specifically requires it.
- A visitor-visible correction route if still required by the current Library admission contract; admission metadata alone is not a visible report-problem path.
- Production integration, release admission, deployment, publication and cold public-origin verification.

No production file, candidate, test, manifest, registry, shared state, provider, credential or public surface was changed by this independent rejudgment.
