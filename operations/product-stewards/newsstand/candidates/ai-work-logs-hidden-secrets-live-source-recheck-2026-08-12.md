# Live source recheck — AI work logs can carry secrets

**Checked:** 2026-08-12 America/Vancouver

**Candidate:** `NEWSSTAND-DAILY-AI-WORK-LOGS-20260812`

**Disposition:** SOURCE CLAIMS CONFIRMED / EDITORIAL AND RELEASE GATES STILL OPEN

This recheck reopened the current public primary paper and each provider's current official documentation. It did not rely on the earlier local source-map assertions.

## Primary research

Current arXiv record: <https://arxiv.org/abs/2608.09867>

Exact HTML version reviewed: <https://arxiv.org/html/2608.09867v1>

- The current record still identifies version 1 as submitted August 10, 2026; no successor version or withdrawal is shown.
- Section 4.1 still reports 6,708 publicly available agent trajectories, 315,320 reconstructed reasoning traces, 1,028 decoded blocks with at least one flagged privacy leakage, and 328 trajectories (4.9%) with at least one real sensitive item.
- The genuine-session breakdown still reports 62 API keys, 33 passwords, 24 access tokens and 7 private keys.
- The paper still reports 64 of 704 genuine-session artifacts absent from the visible chat history. It presents two possible explanations rather than proving one universal cause: information introduced from model memory, or information remaining after visible text was scrubbed.
- The current reproducibility statement says the described attacks no longer reproduce after provider mitigations. The article's patched-status wording remains necessary.

## Current provider mechanics

- Anthropic, <https://platform.claude.com/docs/en/build-with-claude/thinking>: a thinking block carries a signature containing an encrypted copy of full reasoning for continuity; displayed thinking is a summary, and no display setting returns raw chain of thought.
- Google, <https://ai.google.dev/gemini-api/docs/thinking>: thought signatures are encrypted representations used for reasoning continuity; in stateless mode the received thought blocks must be resent unchanged.
- OpenAI, <https://developers.openai.com/api/docs/guides/reasoning>: stateless response reasoning items include encrypted content that can be passed to later calls.

These documents corroborate the article's ordinary-language two-object mechanism. They do not independently verify the exploit, its historical scope or its mitigation; those claims remain attributed to the paper.

## Publishable boundary

The source set supports a Daily explainer for people who publish, replay or manage raw technical AI session records. It does not support a headline claiming that ordinary private consumer chats are newly public, that every raw log leaks a secret, that the demonstrated attack is still working, or that asking a model to show its work is a security scan.

**Next recheck trigger:** a new paper version or withdrawal; an affected provider statement; independent reproduction; or a material change to provider reasoning/signature handling.
