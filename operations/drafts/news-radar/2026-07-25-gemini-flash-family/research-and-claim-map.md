# Gemini Flash family — research and claim map

**Status:** PRIVATE

## Release identity and access

- Company/provider: Google.
- Product/model family: Gemini Flash.
- Public labels and API IDs: Gemini 3.6 Flash / `gemini-3.6-flash`; Gemini 3.5
  Flash-Lite / `gemini-3.5-flash-lite`; Gemini 3.5 Flash Cyber via CodeMender.
- Release date: July 21, 2026.
- Access now: 3.6 Flash and 3.5 Flash-Lite are GA in the Gemini API through
  Google AI Studio and Android Studio, Gemini Enterprise Agent Platform and
  the Gemini app. 3.6 is also in Antigravity and Gemini Enterprise; Flash-Lite
  is rolling into Google Search.
- Region/plan boundary: Google's launch says “for everyone” in the Gemini app
  but does not give a complete country-by-country or plan-limit matrix.
- Cyber boundary: 3.5 Flash Cyber is not public. Google says a limited pilot
  for governments and trusted partners via CodeMender is coming soon.

## Confirmed

| Claim | Evidence | Confidence |
|---|---|---|
| 3.6 Flash costs $1.50 per million input tokens and $7.50 per million output tokens; 3.5 Flash cost $9 per million output tokens. | Google launch and developer guide; Roboflow | High |
| 3.5 Flash-Lite costs $0.30 per million input and $2.50 per million output tokens. | Google launch and developer guide | High |
| Both GA models support a one-million-token input window and 64,000 output tokens. | Google developer guide | High |
| 3.6 Flash is now the default model for Google's Antigravity managed agent. | Google developer guide | High |
| Migration is not only a model-name swap: deprecated sampling parameters are ignored, prefilled model turns are unsupported and thinking controls change. | Google developer guide | High |
| Google's claim that 3.6 uses 17% fewer output tokens than 3.5 Flash is based on the Artificial Analysis Index; other benchmark gains remain task-specific. | Google launch | High for the stated test, not universal |
| Roboflow found comparable or better results on most tested image/video tasks at lower cost, but a serious regression in object detection and malformed JSON. | Roboflow independent evaluation | High for its bounded tests |

## What the evidence shows

The general-purpose Flash model became cheaper per output token and, in some
tested tasks, cheaper to finish because it uses fewer tokens and tool loops.
The Lite model creates a separate low-cost lane for high-volume extraction,
classification and subagent work. Existing Gemini API users must test their
payloads and defaults rather than blindly changing a model ID.

## What it does not show

- It does not show that 3.6 Flash is better on every task or that every user
  should switch immediately.
- Google's benchmark and customer claims do not predict a reader's files.
- A lower token price does not guarantee a lower total bill if output length,
  retries, tools or thinking settings change.
- “For everyone” does not document every plan limit, geography or rollout lag.
- Flash Cyber's vendor-run internal evaluations do not make it a public model
  or independently establish its broader offensive/defensive impact.

## Reader decision

- **Test 3.6 Flash:** if you already pay for 3.5 Flash, use agentic coding,
  knowledge work, documents, images or video.
- **Test Flash-Lite:** for repetitive, high-volume extraction, routing,
  translation or subagent tasks where cost and throughput dominate.
- **Wait:** if object detection, strict JSON reliability or stable legacy API
  payloads matter; run a regression suite first.
- **Ignore for now:** Flash Cyber unless you are in Google's named pilot
  audience. It is a capability signal, not a selectable reader product.

## Real-use tests still needed

1. Compare the same reader tasks across 3.5 Flash, 3.6 Flash and Flash-Lite.
2. Record outcome quality, elapsed time, token count, tool calls and retries.
3. Test strict structured output and object detection.
4. Test long-document retrieval from the start, middle and end.
5. Confirm app labels, plan limits, regions and whether the selected model
   actually answered.
6. Run API migration fixtures for deprecated parameters, prefilled turns and
   function calls.

## Source hierarchy

1. [Google launch](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/)
   — primary interested-party release identity, access, prices and claims.
2. [Google developer guide](https://ai.google.dev/gemini-api/docs/latest-model)
   — primary product specifications, defaults and migration requirements.
3. [Google DeepMind Cyber detail](https://deepmind.google/blog/introducing-gemini-3-5-flash-cyber/)
   — primary interested-party details for the restricted model.
4. [Roboflow evaluation](https://blog.roboflow.com/gemini-3-6-flash-for-vision/)
   — independent bounded real-task testing and regression evidence.

## Publication-day rechecks

Reopen Google's launch, developer guide, pricing page and model cards. Verify
prices, model IDs, GA status, Antigravity default, app/plan/region access and
any new independent task results.
