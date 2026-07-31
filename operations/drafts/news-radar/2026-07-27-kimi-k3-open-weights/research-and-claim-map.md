# Kimi K3 open-weights release — source hierarchy and claim map

**Cutoff:** 2026-07-27 16:15 PDT  
**Status:** PRIVATE — evidence packet  
**Shared evidence identity:** `K3-OPEN-2026-07-27`

## Source hierarchy

| Evidence ID | Source | Role | Full text checked | Interested party |
|---|---|---|---|---|
| K3-01 | [Moonshot K3 model card and live weights](https://huggingface.co/moonshotai/Kimi-K3) | Primary release artifact | Yes | Yes |
| K3-02 | [Moonshot K3 API quickstart](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart) and [platform model list](https://platform.kimi.ai/) | Primary access, price and limit contract | Yes | Yes |
| K3-03 | [Kimi K3 License](https://huggingface.co/moonshotai/Kimi-K3/blob/main/LICENSE) | Primary legal terms | Yes | Yes |
| K3-04 | [NIST / UK AISI preliminary cyber assessment](https://www.nist.gov/news-events/news/2026/07/uk-aisi-caisi-preliminary-assessment-kimi-k3s-cyber-capabilities) | Government capability and safeguard evidence | Yes | No |
| K3-05 | [Associated Press release reporting](https://apnews.com/article/kimi-k3-china-ai-model-us-4c66a2e0f557ce79d3cc2d769c9a6226) | Independent access and infrastructure context | Yes | No |
| K3-06 | [Nature: scale may limit uptake](https://www.nature.com/articles/d41586-026-02281-2) | Independent context | No — paywalled beyond opening | No |
| K3-07 | [AIDB: Is K3 Really Fable Class?](https://aidailybrief.beehiiv.com/p/is-k3-really-fable-class) | Secondary analysis consulted after the primary read | Yes | No |
| K3-08 | [AIDB: The Fight Over Which AI Models You Can Use](https://aidailybrief.beehiiv.com/p/the-fight-over-which-ai-models-you-can-use) | Secondary policy analysis consulted after the primary read | Yes | No |

K3-06 is context only and does not carry a load-bearing claim because its full
text was unavailable.

## Claim map

| Claim | Evidence | What it establishes | What it does not establish |
|---|---|---|---|
| The full K3 weights are now released. | K3-01, K3-03 | Live model files, deployment instructions and the governing license are public. | That an ordinary laptop can run the model well. |
| K3 is a 2.8T-parameter MoE model with 104B active parameters and a 1M context window. | K3-01 | Published architecture and context specification. | Real task quality, throughput or cost. |
| The hosted API costs $0.30 cache-hit, $3 input and $15 output per million tokens. | K3-02 | Current first-party list price. | Cost-to-completion, which also depends on reasoning length and task success. |
| K3 can be deployed or modified under a permissive-but-conditional license. | K3-03 | Broad rights plus material commercial service and attribution conditions. | That every commercial use is unrestricted or that it is OSI open source. |
| K3 is below the latest U.S. frontier models on the tested cyber tasks, above GLM-5.2, and did not refuse offensive assistance in the evaluation. | K3-04 | Results of a selective, preliminary government test set and its safeguard configuration. | Overall intelligence, all cyber capability, or performance after independent deployment of the released weights. |
| Real uptake is constrained by serving capacity and compute demand. | K3-05; K3-01 architecture | Reported subscription pressure and the model's published scale support a practical infrastructure constraint. | A verified universal hardware requirement or stable market price for self-hosting. |
| K3 equals or beats every closed frontier model. | K3-01 vendor benchmarks; K3-04; K3-07 | K3 is competitive on several measured tasks. | Universal parity: harnesses, fallbacks, safeguards and tasks differ, and independent real-use evidence is still incomplete. |

## Evidence versus inference

**Evidence:** the weights, license, API, architecture and government
preliminary results are public.  
**Inference:** the most consequential change is control and optionality for
well-resourced developers, not a new local-AI option for every reader.  
**LAiDIES position:** treat K3 as a serious open-weight release and a test
candidate, while resisting both “nothing changed” and “frontier AI is now free
on your laptop” framing.

