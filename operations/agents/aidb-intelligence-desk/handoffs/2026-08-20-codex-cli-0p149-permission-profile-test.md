# Owner handoff supplement — Codex CLI 0.149.0 permission-profile regression test

**Issued:** 2026-08-20 America/Vancouver

**Receiving owner:** `platform-reliability`

**Existing work identity:** `WRK-20260808-codex-cli-0p147-compatibility`

**Disposition requested:** **MERGE / REPLACE TEST TARGET — OWNER RULING REQUIRED**

`AIDB STATUS: HANDOFF ONLY — OWNER ACCEPTANCE REQUIRED`

## What changed

OpenAI's official ChatGPT & Codex changelog added Codex CLI `0.149.0` on
2026-08-20. The release says resumed and forked threads now restore their
active permission profile instead of silently falling back to current
defaults. It also adds an agents dashboard, queueing, working-directory
commands and diagnostics, and fixes duplicate sub-agent activity.

The current LAiDIES runtime reports `codex-cli 0.148.0-alpha.9`. Release notes
therefore do not prove the fix is present or correct in this environment.

Primary evidence:
https://learn.chatgpt.com/docs/changelog#github-release-374028976

## Why this belongs to the existing compatibility work

The open `0.147.0` compatibility ruling already owns Codex-version adoption and
permission-boundary regression testing. Opening a second compatibility lane
would duplicate its job. The smallest correction is to replace the proposed
test target with `0.149.0` or a later explicitly approved successor.

## Bounded test requested

After the platform owner authorizes an isolated update or representative test
runtime, verify that a thread created under a non-default permission profile:

1. records the intended active profile;
2. resumes with the same profile;
3. forks with the same profile; and
4. does not silently inherit a broader current default.

Record the exact runtime version, profile before and after each lifecycle
operation, and the fail-closed result. The release's dashboard, queueing and
diagnostic features do not earn separate pilots unless the owner identifies a
current LAiDIES failure they solve.

## Acceptance boundary

This handoff does not authorize upgrading the ambient runtime, editing shared
configuration, broadening permissions, enabling automatic approval, installing
plugins, connecting accounts, publishing, deploying or spending. Until the
bounded test passes, the release is **VERIFIED AS RELEASE / NOT VERIFIED IN THE
CURRENT LAiDIES RUNTIME**.
