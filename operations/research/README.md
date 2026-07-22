# Agent-operations research — the living system

**Why this exists:** LAiDIES is run by AI agents. Best practice for running agents changes
fast, and the model landscape changes faster. A one-off research doc would be wrong within
weeks. This is built to stay current instead.

## The files

| File | What it is |
|---|---|
| `agent-operations-playbook.md` | The living report — orchestration, context engineering, guardrails, evals, model-per-task, website design/maintenance, and ranked recommendations against LAiDIES' real failure modes. |
| `agent-research-sources.json` | Every source with exact URL + date + `checked_utc`. Machine-readable so the refresh job can re-verify it. |
| `research-changelog.md` | Append-only. What actually changed each week. Read this rather than re-reading the whole playbook. |

## The refresh loop

A **durable scheduled task** re-checks this every **Monday morning**:
`~/.claude/scheduled-tasks/laidies-agent-research-refresh/SKILL.md`

Each run it: re-fetches a rotating subset of sources (prioritising model/pricing/capability
topics and the least-recently-checked), searches for material published since the last check,
**re-verifies the model-selection table against the `claude-api` skill** (the fastest-expiring
section), updates the playbook incrementally, and appends to the changelog.

Monday is deliberate — findings land before the Wednesday episode deadline.

- It survives sessions (stored on disk, unlike session-only cron).
- It runs while the app is open; if closed when due, it runs on next launch.
- "No material change" is a valid, expected result and gets one line.

## Rules it inherits
- Never assert an unverified fact — **NOT VERIFIED** beats plausible.
- Never teach stale AI facts (see memory `teaching-currency-rule`).
- Solo-founder scale — enterprise-team advice is out of scope.
- Documented fact, practitioner opinion and inference are labelled separately.

## Feeding the site
This research also feeds the public **Tips & Tricks / tool guides** — but per
`bts-tips-teach-the-skill`, public tips teach the META-SKILL (how to use AI to write and
iterate a prompt), never one-off magic strings. Model facts published to the site must route
through `content/site/current-models.js` (see `ai-model-currency-freshness-system`), not be
hardcoded into prose.
