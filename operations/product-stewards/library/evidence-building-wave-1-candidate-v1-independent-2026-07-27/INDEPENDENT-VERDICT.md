# Independent verdict — LIBRAiRY building-wave-1 candidate v1

**Verdict:** `HOLD — responsive overflow and tab-keyboard repair required`  
**Scope:** independent review of `operations/design-explorations/building-wave-1/library/candidate-v1/` only. No maker, production, route, asset, catalogue, or deployment file was changed.

## Exact frozen inputs

| Input | SHA-256 |
|---|---|
| Maker handoff | `03e5671e3e39962a0c87051967777d228f23fe1b1e7cda8c39453c3a02dea7e4` |
| Candidate `index.html` | `c9b8e44a58575ffb26032744feb079602a0b6d7c2f4bb44fa27964411ee6e566` |
| Candidate CSS | `47a73a7ef67182c5407924b74f397ccd975e90a372ac884ad894aa7da28c24fc` |
| Candidate runtime | `52a9f7936513a01522fb970b4283c580ca5e98d742477fbbcbd3da4b5a6b131a` |
| Keep/adapt/reject register | `65c5a7159a6f3173c3bbdc858c19925de230ca0209ae1efaad99c1d8c325ab32` |

## Result

The candidate is a credible room-first Library at desktop: the dimensional stacks and Miss Jeeves desk establish the environment before the shelf controls; it avoids the rejected white/pink over-art header and card-grid catalogue; and its referenced art matches the candidate provenance register. It is truthful about its review-fixture book, browser-local Puffy, lack of account/sync, and lack of production admission.

It cannot pass as a complete candidate yet because it fails the required 390px and 320px reflow scenes.

| Code | Result | Evidence |
|---|---|---|
| `HOLD-RESPONSIVE-390` | **FAIL.** Chromium reports `innerWidth=390`, `documentElement.scrollWidth=420`, `body.scrollWidth=420`. The shelf/desk grid forces 30px horizontal overflow; the global overflow also clips the hero controls in the capture. | `render-390x844-overflow.png`, SHA `a295dea7b39f2fe77dc06607fd1898459bfe842bbf8757dc1867e29cf74acb82` |
| `HOLD-RESPONSIVE-320` | **FAIL.** Chromium reports `innerWidth=320`, `documentElement.scrollWidth=408`, `body.scrollWidth=408`. The required 320px scene has 88px horizontal overflow. | `render-320x800-overflow.png`, SHA `c4a117c7f5a7877e27f8cdb0bbaf86780ea31d53a7612b536762813309158f64` |
| `HOLD-TABLIST-KEYBOARD` | **FAIL.** The shelf controls declare `role="tablist"`/`role="tab"`, but the runtime provides click activation only. It has no arrow/Home/End roving-tab behaviour, so the semantic tab pattern is incomplete for the stated keyboard acceptance scene. | `library-candidate.js` frozen hash above; no `ArrowLeft`, `ArrowRight`, `Home`, or `End` handler exists. |

## Passing independent observations

- **1440 × 900:** no horizontal overflow and no broken `<img>` resources. The page reads as a Library room, with shelves and Miss Jeeves in one spatial progression. Screenshot: `render-1440x900.png`, SHA `d74c27be376f2428c02255c536bb9f35565f6a2fbc55eb16c6d0a1355eee22a8`.
- **Availability truth:** Vocab 101 alone opens as an explicitly labelled review fixture. Held/preview covers show an honest non-reader explanation, hide the Puffy save control, and do not expose book content.
- **Reader/Puffy:** the available fixture opens with focus on Return to shelf. Save creates the device-local Vocab 101 section-2 record; Resume reopens it; Remove clears it. A simulated `localStorage` denial reports that nothing was saved.
- **Miss Jeeves:** a non-empty question returns only the bounded fixture route; the explicit unavailable control says nothing was searched or saved and offers a retry/browse/local-Puffy route.
- **Escape/focus:** when a book is keyboard-focused before opening, Escape closes the reader and returns focus to that cover.
- **No-JS structural fallback:** with script execution disabled, the page states that Vocab 101 is a review fixture, that held/preview titles do not open, and that the production catalogue remains separately governed. No dynamically created books appear.
- **Claims and provenance:** no account, sync, reward, production-admission, or public-release promise is made. The candidate references only the Library interior, approved Miss Jeeves scene, and bright-family-v2 covers enumerated in `KEEP-ADAPT-REJECT.md`; rejected/unknown championship assets are not referenced.
- **Maker static gate:** `node candidate-v1/test-candidate.mjs` remains PASS. `git diff --check` is clean for this evidence folder.

## Exact repair and re-review boundary

The maker should make one candidate-only successor that:

1. eliminates all 390px and 320px horizontal overflow (including the shelf/desk grid's minimum-content width) without hiding, clipping, or converting the room into image hotspots; and
2. implements the declared tablist's keyboard model with visible focus and selected-tab state.

Then freeze successor hashes and rerun 1440/390/320, keyboard, no-JS, held/preview, Miss Jeeves unavailable, storage-denied, and Puffy save → resume → remove review. No production integration or deployment is authorized by this HOLD.

## Review environment

The in-app browser connection was unavailable in this review session. Rendered checks used isolated local Chrome 150 headless against a local HTTP mirror rooted at the repository so that candidate relative assets resolved exactly. No browser profile, candidate, or source file was modified.
