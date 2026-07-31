# Stage 1 superseding receipt — policy v2026-07-29.1 migration

**Status:** COMPLETE — private, hash-bound Stage 1 rulings only. No candidate
draft, public data, deployment, publication or downstream review was changed
or started.

**Independent stage owner:** NewsStand exact edition/template editor  
**Reviewed:** 2026-07-29  
**Policy verified:** `operations/newsstand-autopublish-policy.json` version
`2026-07-29.1`, SHA-256
`04f9d8c0f7e78b31084c0ca562e6c7e8e492f17d711a0a470a743772e12d8d8b`.
`node scripts/test-newsstand-autopublish-policy.mjs` passed, including the
conditional-release and conditional-reality-check fixtures. Every exact file
below was also run through the router at this policy version.

## Supersession

This receipt supersedes **only the previous Stage 1 hash rulings** for the
seven listed identities: Opus `f442c62e…`, Gemini `f4680e7f…` and
`f0b06e9a…`, Meta `b64ae5dc…`, Health `bacbfb91…`, Kimi `74327c0b…`,
Claude Share `9e2255b4…`, and EU Omnibus `694762be…`. It does not alter
other candidates or their receipts.

## Hash-bound rulings

| Candidate / current file | Current SHA-256 | Conditional gates verified | Exact edition/template and filler ruling | Terminal Stage 1 result and exact next trigger |
|---|---|---|---|---|
| `news-radar-2026-07-25-claude-opus-5` — `2026-07-25-claude-opus-5/candidate.json` | `d4cb729c7b2a3c22686988f30900b273219ad790d8b0c1434bee08f46ef6dfbd` | `model-release` → `releaseDetailsComplete: true` | **The Breaking** remains the correct, non-filler model-choice interruption; its complete draft supplies mechanism, test/wait guidance and uncertainty. | **PASS.** If dispatched, Stage 2 must produce a dated AI Research & Accuracy claim/source review bound to this hash. |
| `news-radar-2026-07-25-gemini-flash-family` — `2026-07-25-gemini-flash-family/candidate.json` | `b0c100051e5b6557afe81c45a3935a89d9f2c219030a42e97699d19b41a4533b` | `model-release` → `releaseDetailsComplete: true` | **The Breaking** envelope now has the required qualified interruption and complete release gate. The draft is a non-filler cost/default/API-migration explanation with a bounded independent-result caveat. | **PASS.** If dispatched, Stage 2 must produce a dated AI Research & Accuracy claim/source review bound to this hash. |
| `news-radar-2026-07-25-meta-ai-connected-tasks` — `2026-07-25-meta-ai-connected-tasks/candidate.json` | `173b2409da8f6fe4e389c764089d25bd46d50105df79cce1040c2b2ade1cd50f` | `feature-release` → `releaseDetailsComplete: true` | Its feature explanation is not filler, but it remains a single-item article in a **Daily** envelope with no `edited-briefing` job or two distinct `briefingItems`. | **REJECT.** Daily editor must merge it into a genuine multi-development Daily issue or reclassify it; a new hash restarts Stage 1. Router confirms `edition_contract_failed:daily_requires_multi_item_briefing`. |
| `news-radar-2026-07-26-chatgpt-health-rollout` — `2026-07-26-chatgpt-health-rollout/candidate.json` | `5627470d47963d9be3767a7526135f246feecd294870f12db1e811a344454dd8` | `feature-release` → `releaseDetailsComplete: true` | **The Breaking** is correctly assigned and the four-controls explanation is non-filler, bounded and proportionate to the sensitive connection decision. | **PASS.** If dispatched, Stage 2 AI Research & Accuracy must be followed by mandatory Stage 3 health/privacy review on this exact hash. |
| `news-radar-2026-07-27-kimi-k3-open-weights` — `2026-07-27-kimi-k3-open-weights/candidate.json` | `f61f99a72c12078d909177e056c295c5f7f9e71ed3062a88814a846062c33efd` | `model-release` → `releaseDetailsComplete: true`; `sensational_or_misleading_claim` → `sensationalFramingNeutralized: true` | **The Breaking** remains a non-filler access/control explanation, not an “open means laptop-local” announcement rewrite. | **PASS.** If dispatched, Stage 2 AI Research & Accuracy must be followed by mandatory Stage 3 cyber/safety review. |
| `news-radar-2026-07-28-claude-shared-chats-search` — `2026-07-28-claude-shared-chats-search/candidate.json` | `08bae21aac55b2dbae2dad87597b5f295942849732434404810c46d540c093a7` | `sensational_or_misleading_claim` → `sensationalFramingNeutralized: true` | **The Breaking** is correct and non-filler: it makes the access/discovery/indexing/revocation distinction and gives a specific reader check without repeating the misleading framing as the story. | **PASS.** If dispatched, Stage 2 AI Research & Accuracy must be followed by mandatory Stage 3 privacy review. |
| `news-radar-2026-07-29-eu-ai-omnibus` — `2026-07-29-eu-ai-omnibus/candidate.json` | `6e6627d7d0072c3dbb9e0c71b02a4ad323bfb2d1da8c1434462459c407364946` | `sensational_or_misleading_claim` → `sensationalFramingNeutralized: true` | **The Breaking** is correct and non-filler: it corrects the all-or-nothing legal-calendar reading, explains the mechanism and declines individual legal advice. The unverified controlling legislative text is an accuracy/legal-review issue, not a missing Stage 1 template field. | **PASS.** If dispatched, Stage 2 AI Research & Accuracy must reopen the controlling text and then mandatory Stage 3 legal/regulatory review must approve every reader-action claim. |

## Boundary and learning scan

Six hashes now meet the independent edition/template floor. Their **PASS**
status is not an overall approval and does not start later stages from this
receipt. Meta stops at its terminal `REJECT`. The repaired policy now makes the
two previous conditional gates enforceable without adding forbidden check keys;
the test suite proves both missing-gate rejection and present-gate review
routing. No new painpoint entry is required.
