# Cycle 8J — Independent Town Entry verdict

**Verdict:** PASS — exact frozen Cycle 8J continuous-capture tuple only.  
**Evidence reviewed:** 2026-07-27 PDT.  
**Reviewer scope:** judge-only; no source, render, manifest or production mutation.

## Bound tuple

- Successor manifest: `bf5b28cd01c08851abafb89eefa9269de356f44ac6c36b30852d3f7a3415be41`
- Local capture receipt: `3e1d8d6a8695094c25154be73f2384f92be8777c79a8e8101b8c845e8a26837c`
- Desktop diagnostic: `151f2c421d6798ef7b4535062b152dd3c6f1fb8484ef859917c20fe4c52d0d0b`
- Mobile diagnostic: `ca3aa510c75e85630909274321ec9d5f84c37f2c3d40d238ef6ee3e1941998a1`

## Independent findings

| Gate | Result | Evidence |
|---|---|---|
| Cycle 8I byte binding | PASS | Baseline HTML `ed8ae2b…4b1f5`, candidate HTML `a5d10e…91aee`, candidate CSS `d8e5fc…cf39c`, and contrast gate `03d784…40f9f` are byte-identical to the frozen Cycle 8I copies. |
| Genuine continuous full pages | PASS | Native 1440 and 390 full-page comparisons visibly show hero, method, intent, weekly, activities, spotlights, reference, town, Closet, postcard band and footer once each. No repeated masthead, blank band, omitted downstream section or visible clipping. |
| Desktop/mobile geometry | PASS | Desktop is exactly `1440/1440` client/scroll width; mobile exactly `390/390`; document, body and every principal section report containment. |
| Governed artwork | PASS | Candidate has all `18/18` governed jobs, one visible complete instance each at both viewports; `0` broken and `0` hidden governed images. Held Dream Phone, NewsStand and map **art** are absent. |
| Product/function parity | PASS | Text, IDs, hrefs, controls, section order and runtime scripts are parity-true at both viewports. Focusable parity is true. |
| Masthead lock | PASS | The masthead source remains `/assets/sunnyvaile-streets/main-street-dusk.webp`; geometry matches, and crop hashes are byte-identical: desktop `a2496ace…7d05`; mobile `0765beb7…fa32`. |

The candidate has `18` image elements versus the baseline's `26`; this is the governed, deliberate duplicate-consumer removal already present in the frozen Cycle 8I candidate, not an omitted capture or hidden governed artwork. All other structural counts are equal: 32 headings, 82 links, 34 buttons, 10 sections and 2 forms.

## Render seals

- Desktop baseline: `41acd76ea43768865513139eb32ba8b385b9f69f8577fc3687a7f5de1ecbf229`
- Desktop candidate: `9812607819bfd5ba8ae026a6d73efbc24532a501b0d0597cd0d59e2bdf54bfe8`
- Mobile baseline: `bf2821f0c93efd70683dfd97f047469f80fa3b3ef21bc60c59e870ffdc0bb953`
- Mobile candidate: `f3767ed49e469641309617422ebdf44d3058e8ffd058514985002e3578245933`

## Boundary

This passes Town Entry’s capture, parity and geometry gates only. It is not a Brand material-superiority judgment, Ali decision, integration, deployment, publication or approval to mutate any other bytes.
