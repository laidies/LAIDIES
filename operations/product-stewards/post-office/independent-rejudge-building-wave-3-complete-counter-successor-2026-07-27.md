# Independent rejudge — Post Office Wave 3 complete-counter successor

**Reviewer:** independent Post Office product/browser judge  
**Review date:** 2026-07-27 (America/Vancouver)  
**Scope:** frozen isolated successor only. The predecessor HOLD remains preserved at `independent-review-building-wave-3-complete-counter-candidate-2026-07-27.md` (SHA `398610cd3525bcae9f35328abbc77f64cbb14300d351e311ac03dca8fddc3657`). No live, provider, production, deployment, or public mutation occurred.

## Verdict: ACCEPT — candidate experience scope

The two predecessor failures are repaired without regression. This accepts the exact isolated Post Office candidate as a **VERIFIED LOCALLY / candidate-only** Penny counter experience. It does not accept external newsletter delivery, identity/session handling, invitation or reward lifecycle, native assistive/mobile behavior, production integration, release, or public availability.

## Frozen successor tuple independently recomputed

| Artifact | Required / observed SHA-256 | Result |
| --- | --- | --- |
| Candidate HTML `operations/design-explorations/building-wave-3/post-office/index.html` | `c9fa07df657d87942984e643efcd4c5cadf0c2c9a48a756a5153bb6b82e6f90b` | PASS |
| Candidate CSS `post-office-candidate.css` | `e206ed4ab0d2289e252e20b8ae5ab0d95ce1e6afc659631325c0ae4de0efe030` | PASS |
| Candidate JS `post-office-candidate.js` | `11d6f76b8ce84b8f425c2b1d2d30a1bb7ef6e2a4d653487857c48b6e2ae22cb3` | PASS |
| Governed postcard catalogue `postcard-catalog-candidate.json` | `79d46ce24c070f2a2d48068b38b48a3f5e2ae70122ae5b67af990697ae9407a1` | PASS |
| Candidate test `test-candidate.mjs` | `74ba0a47de17d93d64127388a861837cd84a0d494b5629d55c920fde5cd32540` | PASS |

`node test-candidate.mjs` passes with 11 governed cards, four jobs, fail-closed catalogue/archive, non-authoritative newsletter, and 320/390/1440 contract.

## Rejudge results

| Reason code | Result | Evidence |
| --- | --- | --- |
| `PASS_SKIP_TARGET_FOCUS_RESTORED` | PASS | The direct skip-link journey at 390×844 produces `#counter`; the active element is `SECTION#counter` (`tabindex="-1"`), rather than `BODY`. |
| `PASS_MOBILE_PENNY_COUNTER_COMPOSITION_RESTORED` | PASS | At 390×844 the revised 48% hero position visibly keeps Penny’s face, counter identity, headline, truth copy, and counter tickets within the first arrival composition. The former Penny-less shelf crop is gone. |
| `PASS_1440_390_320_CONTENT_AND_CONTAINMENT` | PASS | At 1440×900, 390×844, and 320×800: no horizontal overflow; 11 postcard cards and four archive entries load; no loaded image failure was found. |
| `PASS_COUNTER_JOB_AND_TRUTH_REGRESSION_CHECK` | PASS | Newsletter remains an explicit Buttondown handoff only; local Card remains distinct from account; no delivery, invite, subscription, reward, or account completion is invented. |
| `PASS_GOVERNED_RACK_HANDOFF_REGRESSION_CHECK` | PASS | Selecting `main-street` yields one pressed card, focus at `#writingDesk`, and the public-ID-only handoff `/postcard.html?pc=main-street`. |
| `PASS_FAILURE_NO_JS_REDUCED_MOTION_CONTRACT_RETAINED` | PASS | The unchanged governed catalogue/archive validation, malformed/failure boundaries, no-JS rack fallback, and reduced-motion contract remain present; direct test contract passes. |
| `PASS_PENNY_COUNTER_BUILDING_EXPERIENCE` | PASS | Desktop and mobile present Penny’s counter as an operated environment with four tangible jobs, rather than a generic navigation shell. |

## Literal output and remaining work

**Literal accepted output:** an isolated Penny-owned counter with four clear actions—Wednesday-mail preparation, Resident Card handoff, postcard rack → proof desk → public card-ID writing-room handoff, and canonical published-issue drawer—across desktop and mobile.

**Still open, outside this candidate acceptance:** Buttondown confirmation/delivery/unsubscribe evidence; verified account/session lifecycle; invite/send/delivery/open/join/reward ledgers; native Safari/VoiceOver/TalkBack and native-share evidence; source-to-production integration; exact release artifact; and public-origin verification.

**Next action:** Control Room may bind this candidate into the next isolated integration/owner-visual sequence only when the named shared service and production-route locks are granted. Do not infer a release from this local candidate acceptance.

## Proactive improvement

**NO MATERIAL OPPORTUNITY.** The material responsive and focus defects found in the predecessor were repaired and independently retested. The next meaningful value is the already-named service/native/integration work, not another candidate-only polish pass.

## Authority truth

No email/provider request, account change, invitation, reward, production route mutation, deployment, publication, or spend authority was used.
