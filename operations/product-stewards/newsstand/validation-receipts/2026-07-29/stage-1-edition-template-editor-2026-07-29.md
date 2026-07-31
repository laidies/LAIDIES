# Stage 1 receipt — NewsStand edition and template editor

**Status:** COMPLETE — private validation receipt; no publication, deployment,
canonical-data edit or later-stage approval is implied.

**Stage owner:** independent NewsStand exact edition/template editor
**Reviewed:** 2026-07-29
**Scope:** every candidate-shaped JSON envelope currently under
`operations/drafts/`, including the nine canonical `candidate.json` files and
three explicitly edition-named companion envelopes. This is a hash-bound
Stage 1 ruling only. `PASS` means the paper assignment and supplied draft meet
the Stage 1 floor; it does **not** make the story accurate, safe, rendered,
approved, public or release-ready.

## Method and governing inputs

- `PUBLICATION-VALIDATION-AND-DISCOVERY-CONTRACT.md` (Stage 1 and stop rules)
- `newsstand-editorial-radar.md` (four-paper jobs, release and reality-check
  fields, no-filler rule)
- `CONTENT-PUBLISHING-STANDARD.md` (reader promise, explanation and automatic
  rejection conditions)
- `newsstand-candidate.schema.json`, current candidate policy and each
  packet's candidate, draft, triage, claim map and integrity record
- the current radar log and relevant prevention rules, especially BTB-222,
  BTB-231 and BTB-238

The router was run as a structural cross-check only. Its
`HOLD_FOR_INDEPENDENT_REVIEW` result is not treated as editorial approval.

## Hash-bound rulings

| Candidate ID / exact file | SHA-256 | Edition/template ruling | Filler / required field check | Terminal Stage 1 outcome and exact next trigger |
|---|---|---|---|---|
| `news-radar-2026-07-25-claude-opus-5` — `news-radar/2026-07-25-claude-opus-5/candidate.json` | `f442c62e916608700565d63c21985f074545ef010c85da64eb9e89fc88d09c59` | **The Breaking** is correctly assigned: a live model choice with a concrete test/wait decision; `breaking-news-draft.md` supplies context, mechanism, reader action, uncertainty and watch points. | Not filler. The full packet distinguishes vendor performance claims, initial practitioner observations and the reader's own comparison. | **PASS.** Trigger Stage 2: AI Research & Accuracy produces a dated claim/source review bound to this hash. The champion must also reconcile it with the separate Opus 5 refresh envelope before any release packaging; no duplicate current Breaking record may result. |
| `news-radar-2026-07-25-gemini-flash-family` — `news-radar/2026-07-25-gemini-flash-family/candidate.json` | `f4680e7f0e89b9ed1dde3c7084ae86260d285c3b1b171e1b4e7dee4091500bb2` | The prose draft belongs to **The Breaking**, but the exact envelope fails the Breaking template: it omits `editorialJob: qualified-interrupt` and `qualifiedInterrupt`. | Not filler; release choice details are in the draft. Missing required machine template fields prevent a bound ruling. | **REJECT.** Maker must migrate the envelope to the current Breaking contract and re-run the router; the resulting new hash starts a new Stage 1 review. Do not send it downstream. |
| `news-radar-2026-07-25-ai-use-task-boundaries` — `news-radar/2026-07-25-google-atlas-ai-use/candidate.json` | `6495209a9d219565af3a89f84aaf4b815ae73152f205484a5ed9caf1ca715d81` | **The Weekly** is the right paper and the two developments are genuinely distinct, but the supplied `weekly-synthesis-outline.md` explicitly says reporting is still required; no complete Weekly reader draft exists. | Not filler. It is an incomplete synthesis template, not a publishable deep dive. | **HOLD.** Weekly editor must turn the outline into a complete Weekly draft with the stated independent labour/methods evidence and reader action box. New/changed draft plus candidate hash triggers Stage 1 again. |
| `news-radar-2026-07-25-meta-ai-connected-tasks` — `news-radar/2026-07-25-meta-ai-connected-tasks/candidate.json` | `b64ae5dce17bde0f0e171555d554b8bcb64805a5504cd7599abc36b63b9a70da` | The supplied one-development feature article cannot be **The Daily**: the exact envelope omits `editorialJob: edited-briefing` and the required two-item `briefingItems` array. | The explanation is not filler, but a single item may not be padded into a Daily issue. | **REJECT.** Maker must either merge it into a genuine multi-development Daily issue or reclassify it with a defensible edition job, then create a new candidate hash. Do not send it downstream. |
| `news-radar-2026-07-26-chatgpt-health-rollout` — `news-radar/2026-07-26-chatgpt-health-rollout/candidate.json` | `bacbfb91b8df8cc9bc902ca6d1b47dc6c4a78f8007d061680ec8ca5c8c47c099` | **The Breaking** is correctly assigned: current, sensitive connection decision; complete Breaking draft explains the four distinct controls, what it does not make ChatGPT, action and uncertainty. | Not filler; it does not substitute an analogy for health or privacy caveats. | **PASS.** Trigger Stage 2: AI Research & Accuracy claim/source review, then mandatory Stage 3 health/privacy specialist review on this exact hash. |
| `news-radar-2026-07-27-kimi-k3-open-weights` — `news-radar/2026-07-27-kimi-k3-open-weights/candidate.json` | `74327c0b5dde892b26f614f710c705a76f5a6224acfc0c6a440ef718bdb0e12d` | **The Breaking** is a sound paper choice and the draft is a useful open-weights/access explanation. | The packet carries `sensational_or_misleading_claim`, but its envelope contains neither the required `sensationalFramingNeutralized=true` nor the required `releaseDetailsComplete=true`. Current schema/policy does not provide an unambiguous supported field location for both gates. | **HOLD.** NewsStand schema/policy owner must specify and migrate one compatible machine representation for the two radar gates without weakening the closed-envelope checks; maker then binds the verified live-artifact/access details and neutralized framing to a new hash. |
| `news-radar-2026-07-28-claude-shared-chats-search` — `news-radar/2026-07-28-claude-shared-chats-search/candidate.json` | `9e2255b4be3d8474676b42386e3f77e28969735e28d4e3a6a48d01d64c6335af` | **The Breaking** is correctly assigned and `breaking-news-draft.md` supplies an immediate, specific privacy action plus the needed access/discovery/indexing distinction. | Not filler. The headline neutralizes “private chats leaked,” but the bound envelope lacks the required `sensationalFramingNeutralized=true` field. | **HOLD.** NewsStand schema/policy owner must establish the compatible, hash-bound reality-check field; maker then adds it together with the exact verification reference and re-submits the new hash. Privacy review must not begin on an ambiguous envelope. |
| `news-radar-2026-07-26-openai-hugging-face-update` — `openai-hugging-face-incident-2026-07-24/candidate.json` | `3380fc8e66bb6bbaae7b86dc8562047a487e86ab1bad7bd4fed21cd0191d1ebe` | **The Breaking** is correctly assigned: the draft gives context, mechanism, direct practical model and explicitly bounded disputed facts. | Not filler; it avoids the sentience/escape trope and identifies evidence that would revise the account. | **PASS.** Trigger Stage 2 AI Research & Accuracy, then mandatory Stage 3 cyber/legal/safety review for the disputed, ongoing incident. |
| `news-radar-2026-07-28-openai-hugging-face-weekly-synthesis` — `openai-hugging-face-incident-2026-07-24/weekly-candidate-2026-07-28.json` | `9cb00ec6b33b0151e5a7310cfb630bc14a1cee12d7682da061d8a4576210a4e5` | **The Weekly** is correctly assigned: the deep dive synthesizes affected-party accounts and labels the chronology dispute, mechanisms, reader impact and watch points. | Not filler; it is not a concatenation of alerts. | **PASS.** Trigger Stage 2 AI Research & Accuracy, then mandatory Stage 3 cyber/legal/safety review for the exact Weekly hash. |
| `news-radar-2026-07-28-ai-security-open-closed-tribune` — `openai-hugging-face-incident-2026-07-24/tribune-candidate-2026-07-28.json` | `52013cde38ceb3b22f1d2977d1b03701ead1f63ffb559655cbaa779aec0f2159` | **The Tribune** is correctly assigned: `tribune-draft.md` has a distinct sourced argument rather than a second incident recap, and its evidence/inference/position envelope is complete. | Not filler; it names the countervailing value of controlled local access rather than treating open/closed as scores. | **PASS.** Trigger Stage 2 AI Research & Accuracy, then mandatory Stage 3 cyber/legal/safety review. The later Concepts route must preserve the distinct evergreen control lesson. |
| `news-radar-2026-07-28-claude-opus-5-breaking-refresh` — `opus-5-2026-07-28/breaking-candidate.json` | `1ba730b7d16430e558a6c254f3ebb7048eae49c0f138edc61d7f105e5781da2e` | The paper assignment is plausible, but no `breaking-news-draft.md` or equivalent complete exact Breaking article is present; README/reverse-brief text is a packet brief, not a reader draft. It also duplicates the existing Opus 5 Breaking candidate above without a declared supersession link. | Incomplete template; no reader-ready draft to assess for filler. | **HOLD.** Maker/NewsStand champion must either bind this hash as the explicit superseding revision of the older Opus packet and supply the complete Breaking draft, or retire it as duplicate. A new hash or supersession receipt restarts Stage 1. |
| `news-radar-2026-07-28-claude-opus-5-daily-practical-read` — `opus-5-2026-07-28/daily-candidate.json` | `2f91e780386b0f08e383033ad60867cd7299592b172f0f80a22ad889821e7427` | **The Daily** envelope has two real briefing developments, but there is no `daily-brief-draft.md` or equivalent reader article in the packet. | Incomplete template; no complete Daily explanation to assess for filler, scanability or distinction from Breaking. | **HOLD.** Daily editor must supply the complete two-development Daily draft and champion must reconcile it with the legacy Opus packet before new-hash Stage 1 review. |

## Stage-1 dispatch boundary

Only the five `PASS` hashes above may enter Stage 2. The two `REJECT` hashes
stop here. Each `HOLD` stops here until its named maker, editor or
schema/policy owner produces the exact trigger artifact; a vague “review
required” note does not satisfy that trigger.

## Learning scan

No new ledger entry. This pass applied existing BTB-222 (prove live release
artifacts), BTB-231 (separate access, discovery, indexing and revocation) and
BTB-238 (hash change must wake a named next owner). The release/reality-check
gate versus closed-envelope-policy mismatch is recorded as a terminal HOLD,
not silently bypassed.
