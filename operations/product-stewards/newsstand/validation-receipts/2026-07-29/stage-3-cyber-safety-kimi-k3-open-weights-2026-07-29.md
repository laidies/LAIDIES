# Stage 3 — cyber and safety review: Kimi K3 open weights

**Date:** 2026-07-29  
**Reviewer:** Independent cyber/safety specialist  
**Stage:** 3 of 7 — relevant-risk review  
**Outcome:** **PASS**  
**Scope:** Private candidate packet only. This is neither publication authority
nor a claim that the article has been rendered or publicly verified.

## Exact artifact binding

| Artifact | SHA-256 |
|---|---|
| `candidate.json` | `f61f99a72c12078d909177e056c295c5f7f9e71ed3062a88814a846062c33efd` |
| `breaking-news-draft.md` | `bbba5bac4c75a6f6cc13236657201996d85fc4186762408b8d3769db4c43315a` |
| `research-and-claim-map.md` | `ba72f750bd5031b164ab4dd9a9e9a46c35eb0d5eade8d52f63ffe5129f4d56eb` |
| `impacts-and-how-to-think.md` | `5b1d7ea7210e593e2e05a04e88b45cf8f73bf9e78d1d0c314d7b4bf3c220a743` |
| `integrity-report.md` | `1b05b603eb6386df7e1ee39536bf22314c889e106e795273bd956ccc8758910a` |

The candidate and Breaking draft hashes match the Stage 2 AI Research &
Accuracy PASS receipt. A change to either hash voids this result and restarts
the validation chain at Stage 1.

## Sources reopened for this review

1. Moonshot's live [Kimi K3 model card and files](https://huggingface.co/moonshotai/Kimi-K3): it currently identifies K3 as open-weight, lists a 2.8T MoE / 104B-active specification, the Kimi K3 License, and deployment paths. This is a vendor release artifact, not independent evidence of safety or practical cost.
2. Moonshot's [Kimi K3 API guide](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart): it currently says reasoning is always enabled, documents the `low`, `high` and default `max` effort choices, and warns integrators to retain the complete returned assistant message for multi-turn/tool calls.
3. The [Kimi K3 License](https://huggingface.co/moonshotai/Kimi-K3/blob/main/LICENSE): it grants broad rights to use, copy, modify and deploy, subject to its stated conditions. This establishes release terms, not a safety assurance.
4. The joint [UK AISI / CAISI preliminary cyber assessment](https://www.nist.gov/news-events/news/2026/07/uk-aisi-caisi-preliminary-assessment-kimi-k3s-cyber-capabilities): it says K3 was below the most recent frontier cyber-capable models in the specified preliminary tests, above GLM-5.2 in the same tests, and that its safeguards did not prevent attempts at offensive cyber work in that evaluation. The agency explicitly limits the results to a small, selective preliminary benchmark set and notes that the closed-weight comparison models had system safeguards disabled.

## Risk and harm ruling

| Review question | Ruling |
|---|---|
| Does the story confuse open weights with a safety approval, harmlessness, or laptop accessibility? | **No.** It separates downloadable weights from the hardware, serving, security and governance work required to operate them. |
| Does it overstate the government result as proof of a cyber weapon, universal model capability, or post-release behaviour? | **No.** It calls the evaluation preliminary and selective, names the comparison boundary, and expressly rejects both “harmless” and “runaway cyber superweapon” conclusions. |
| Does it disclose operational exploit material or provide a harmful how-to path? | **No.** It reports only the high-level existence and bounded meaning of the assessment; it contains no targets, vulnerabilities, code, procedure, or bypass guidance. |
| Does the reader advice create an unsafe deployment implication? | **No.** The draft directs organizations to evaluate license, hardware, security and governance before self-hosting, and makes independent safety testing a remaining uncertainty. |
| Is the model's hosted API being equated with a self-hosted deployment? | **No.** The article distinguishes the hosted product from weight deployment and treats control as an option with added responsibilities. |

The risk-sensitive portion is proportionate because the release changes access and deployment control. Omitting the government assessment entirely would leave a misleading impression that “open” answers the safety question; expanding it into technical examples would create an avoidable harm/detail problem. The present treatment stays on the reader decision: a capable organization must supply the safeguards and operational controls that a hosted service may otherwise centralize.

## Required retained boundaries

- Keep the words **preliminary**, **selective**, and the distinction between
  model capability and real-world harm when the NIST/UK AISI finding is
  rendered.
- Keep “security and governance work” attached to the self-hosting advice;
  do not recast the release as a privacy, sovereignty, compliance or safety
  guarantee.
- Do not add exploit examples, offensive-task prompts, specific attack paths,
  or claims that the assessment establishes post-release safety.
- Publication-day review must recheck the live repository, API/access terms,
  license and the cited government page. A material change to any reader
  decision restarts the relevant earlier stage.

## Terminal result and next trigger

**PASS — Stage 3 cyber/safety.** No unresolved cyber/safety issue requires a
candidate change on the exact hashes above. The next automatic owner is
**Stage 4 — Learning System & Concepts**, which must issue a hash-bound
durable-vs-dated and learning-destination disposition before Brand/render
judgment begins.

## Learning scan

No new reusable failure was found. This review applies the existing Kimi
source-lifecycle rule in `BTB-222`: release availability must be grounded in
the live artifact rather than stale future-tense documentation. It also
reinforces the existing NewsStand rule that a cyber evaluation is bounded
evidence, not an invitation to repeat operational detail.
