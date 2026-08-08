# Owner handoff — Codex CLI 0.147.0 compatibility test

**Status:** READY FOR OWNER RULING — internal test only

**Source:** OpenAI official ChatGPT & Codex changelog, 2026-08-07

**Receiving owner:** Control Room / platform-reliability

**AIDB authority:** INTAKE ONLY — RECEIVING OWNER DECIDES

## What changed

OpenAI documents Codex CLI 0.147.0 with portable Agent Plugins and catalog search, persistent conversation sections, imported Cursor/Claude synchronization, opt-in MCP 2026-07-28 support, `--approve-for-me`, and security/terminal fixes.

The local CLI invoked during this cycle reports `codex-cli 0.146.0-alpha.9.2`. The changelog does not establish that the desktop app or LAiDIES configuration has changed.

## Smallest safe test

Freeze the current version and representative outcomes, then use an isolated non-iCloud task branch to test only:

1. whether plugin/catalog discovery respects workspace scope and creates no duplicate capability route;
2. whether imported Cursor/Claude session synchronization deduplicates rather than mutating current task history; and
3. whether opt-in MCP 2026-07-28 support changes discovery, pagination or server-start behavior for an existing lawful local integration.

Require an explicit before/after result and rollback. Do not use production credentials or private user data.

## Hard boundaries

- Do not enable `--approve-for-me`.
- Do not upgrade the ambient CLI, edit shared config, install a plugin, connect an account, publish, deploy or spend during intake.
- Do not infer desktop-app behavior from a CLI changelog.
- Do not teach or announce these capabilities publicly without a current-version test and a distinct reader job.

## Owner ruling requested

Return `ACCEPT`, `MERGE`, `PARK` or `DECLINE` for the bounded isolated compatibility test. If accepted, bind the exact test runtime/version, current baseline, test fixtures, permission boundary and rollback before execution.

## Evidence

- Official changelog: https://learn.chatgpt.com/docs/changelog, lines for 2026-08-07 / Codex CLI 0.147.0; checked 2026-08-08.
- Local read-only check: `codex --version` → `codex-cli 0.146.0-alpha.9.2` on 2026-08-08.
