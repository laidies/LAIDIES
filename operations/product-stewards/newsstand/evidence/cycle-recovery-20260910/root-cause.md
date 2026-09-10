# September 9–10 NewsStand incomplete cycles

## Verified cause
The scheduled task started but failed to retain its publication objective. This was not an inactive schedule. September 10's trigger arrived at 14:01:05.873Z (07:01 Vancouver), with the matching automation heartbeat output. It researched AIDB, then after compaction at 14:30:34.625Z resumed a historical Astra layout request at 14:30:47.644Z. No new user request arrived between the trigger and that switch. The replacement history's last ordinary user request was the September 4 “well fix it obviously” message (create_time1788557805). The turn ended15:23:28Z reporting only an Astra presentation deployment. September9's morning turn likewise left the dated update incomplete while completing the Astra repair. September9 evening explicitly reported research recovered but no publication.

Primary evidence: actual task JSONL at /Users/alisoneakin/.codex/sessions/2026/08/23/rollout-2026-08-23T10-05-03-01a02f95-3838-7af0-a4c7-2f51253a133d.jsonl; scheduled turn01a08b9f-4448-77c1-a2d0-b7af92d49b88 and timestamped compaction/assistant messages above. No speculation about model-internal reasoning is claimed. The independent audit initially misclassified Sep10 as a missed trigger; direct trigger/timestamp evidence contradicted that and the reviewer corrected its finding before this verdict.

Additional contributors: research inventory and admission were treated as stopping points; the assembled recovery queue did not capture unassembled KEEP leads; current status comments remained READY_FOR_RELEASE after public delivery. AIDB's index was stale even while a complete dated edition/transcript existed; the Sep10 source lane recovered it by direct dated probing. Genuine evidence holds are retained and are not a reason to publish unverified news.

## Correction and verification
- Added a read-only live Daily/Weekly delivery check. It distinguishes service-only delivery from news and grants no editorial/release approval.
- Added a small CURRENT-CYCLE.md checkpoint and entry/re-entry/closure instructions so compaction has a durable current objective.
- Updated the existing ACTIVE heartbeat, same target, preserving 07:00/20:00 phases and adding10:00/13:00/16:00 recovery checks. No second scheduler. Idle completed recovery checks must not repeat full research/review.
- Removed stale story-specific instructions from the scheduled prompt; current runbook remains full authority. Exact before/after and readback in automation-change.json.
- Calibrated tests reject absent Daily, stale/invalid/future Weekly, duplicate/impossible dates and future recovery scope. Vancouver07:00 boundaries and service-only zero-news reporting pass. Independent Terra/Medium review identified two date flaws, repaired and regression-tested; scoped re-review passed. No claim of hard app stop enforcement.
- Live check reproduces the actual debt: September9 service-only issue4services/0news is public; September10 Daily missing; expectedSeptember9Weekly stillSeptember6. Editorial recovery is a separate active lane, not complete as of this record.

Limitations: these are tested detection/continuation controls and verified schedule configuration. No subsequent unattended full cycle has yet been observed. Local scheduled work still needs the computer and app available, but this incident's trigger did fire. Official documentation: https://learn.chatgpt.com/docs/automations.

## Recovery routing correction
Three explicit recovery followups to the old task at 19:17, 19:19 and 19:20 UTC were delivered as `send_message_to_thread` tool outputs, but each returned the stale completed Astra result in roughly 2–3 seconds. This shows the followups were present, not that new instructions were executed. The single existing heartbeat was therefore moved to active recovery task `01a071e7-db55-7a22-8c99-04eba5060355`; target, ACTIVE status and 7/10/13/16/20 schedule were read back from automation.toml. No duplicate scheduler was created. The next actual unattended completion remains unobserved.
