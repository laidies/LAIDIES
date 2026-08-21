# AIDB and Allie K. Miller learnings for specialist agents

**Date reviewed:** 2026-08-20 America/Vancouver

**Status:** INTERNAL RESEARCH / SOURCE INTELLIGENCE, NOT PRODUCT AUTHORITY

**Prompt:** Ali listened today and asked what the published AIDB episode, its attached links, and Allie K. Miller's resources teach us about rebuilding LAiDIES agent work.

## Publication identity

The published AIDB page is `https://aidailybrief.beehiiv.com/p/the-ai-backlash-is-getting-stupider-but-also-smarter`. Its page label says August 20, 2026, while its embedded episode metadata says August 19. The live AIDB machine feed also exposes August 19 as the newest edition key. This is a metadata mismatch, not evidence that Ali remembered the wrong episode.

## Source audit

All attached links were attempted. A source that could not be inspected was retained as `HOLD`; the AIDB paraphrase did not substitute for its evidence.

- Links 5–29: OpenRouter's ranking page was the only inspected primary source. It measures tokens routed through OpenRouter and explicitly does not prove quality, preference, request count, spend, or whole-market adoption. WSJ and Business Insider supplied inspectable secondary reporting. Three paywalled/title-only items, five blocked secondary pages, and fourteen uninspectable social posts remain HOLD.
- Links 30–51: first-party political statements and clips were usable only for what their speakers said; clip context and underlying poll claims remain bounded or HOLD. OpenAI's published cyber-capability controls were the primary system-design source: scale controls to risk, isolate workloads/networks, continuously test, escalate alerts, and pause when a critical alert cannot be resolved. Provider release timing remains a dated provider claim and must be rechecked.

## Allie K. Miller resources inspected

- `https://www.alliekmiller.com/agent-protocol`: document the human process, compliance requirements, quality thresholds, escalation conditions, and continuous improvement plan.
- `https://www.alliekmiller.com/ai-context-vault`: useful context is an explicit document about values, business, and goals, not an accumulated conversational dump.
- `https://www.alliekmiller.com/behind-the-agentic-ai-experiment`: staged filtering, memory, ranking, evaluation, deduplication, and human review are separate jobs in a pipeline.

## Incorporated system decisions

1. Use narrow specialists for repeatable domain workflows; do not create a general agent with every LAiDIES instruction.
2. Build a fresh, bounded task packet from current routed sources on every run. Historical material is searched only for a named question.
3. Bind inputs by role, exact path, SHA-256, evidence scope, source type, retrieval date, and recheck trigger where facts can change.
4. Treat `no detected problem` as insufficient. The chain is automated guard, specialist inspection, owner escalation, then HOLD if unresolved.
5. Separate producer, independent judge, and release verifier. A maker cannot promote its own technical receipt into editorial or visual acceptance.
6. Evaluate the specialist on representative LAiDIES tasks; popularity or token-routing rankings cannot choose the model.
7. Move known rejects out of production search space, deny their original paths at build time, and repair the selector/checker before another candidate is made.

## First implementation

The first bounded specialist is the LAiDIES episode video producer:

- `.codex/agents/episode_video_producer.toml`
- `.agents/skills/produce-laidies-episode-video/SKILL.md`
- `operations/specialist-agents/episode-video-producer.json`
- `scripts/check-specialist-agent-packets.mjs`

This is a project-scoped configuration and reusable skill, not a new autonomous authority. It owns production mechanics for one named episode assignment, consumes current media authority, denies rejected/quarantined/unbound inputs, and cannot self-approve visual or editorial quality.

## What was not adopted

- No external template was copied into canon.
- No inaccessible linked claim was treated as verified.
- No full-repository memory vault or automatic ingestion of old folders was created.
- No specialist for another domain was created before the episode-video pattern is used and evaluated.
