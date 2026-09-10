# September 9–10 NewsStand incomplete cycles

## Verified cause
The scheduled task started but failed to retain its publication objective. This was not an inactive schedule. September 10's trigger arrived at 14:01:05.873Z (07:01 Vancouver), with the matching automation heartbeat output. It researched AIDB, then after compaction at 14:30:34.625Z resumed a historical Astra layout request at 14:30:47.644Z. No new user request arrived between the trigger and that switch. The replacement history's last ordinary user request was the September 4 “well fix it obviously” message (create_time1788557805). The turn ended15:23:28Z reporting only an Astra presentation deployment. September9's morning turn likewise left the dated update incomplete while completing the Astra repair. September9 evening explicitly reported research recovered but no publication.

Primary evidence: actual task JSONL at /Users/alisoneakin/.codex/sessions/2026/08/23/rollout-2026-08-23T10-05-03-01a02f95-3838-7af0-a4c7-2f51253a133d.jsonl; scheduled turn01a08b9f-4448-77c1-a2d0-b7af92d49b88 and timestamped compaction/assistant messages above. No speculation about model-internal reasoning is claimed. The independent audit initially misclassified Sep10 as a missed trigger; direct trigger/timestamp evidence contradicted that and the reviewer corrected its finding before this verdict.

Additional contributors: research inventory and admission were treated as stopping points; the assembled recovery queue did not capture unassembled KEEP leads; current status comments remained READY_FOR_RELEASE after public delivery. AIDB's index was stale even while a complete dated edition/transcript existed; the Sep10 source lane recovered it by direct dated probing. Genuine evidence holds are retained and are not a reason to publish unverified news.

## Correction and verification
- Added a read-only live Daily/Weekly delivery check. It distinguishes service-only delivery from news and grants no editorial/release approval.
- Added a small CURRENT-CYCLE.md checkpoint and entry/re-entry/closure instructions so compaction has a durable current objective.
- Updated the existing ACTIVE heartbeat, subsequently retargeted as recorded below, preserving 07:00/20:00 phases and adding10:00/13:00/16:00 recovery checks. No second scheduler. Idle completed recovery checks must not repeat full research/review.
- Removed stale story-specific instructions from the scheduled prompt; current runbook remains full authority. Exact before/after and readback in automation-change.json.
- Calibrated tests reject absent Daily, stale/invalid/future Weekly, duplicate/impossible dates and future recovery scope. Vancouver07:00 boundaries and service-only zero-news reporting pass. Independent Terra/Medium review identified two date flaws, repaired and regression-tested; scoped re-review passed. No claim of hard app stop enforcement.
- Initial live check reproduced the actual debt: September9 service-only issue4services/0news is public; September10 Daily missing; expectedSeptember9Weekly stillSeptember6. Editorial recovery is a separate active lane, not complete as of this record.

Limitations: these are tested detection/continuation controls and verified schedule configuration. No subsequent unattended full cycle has yet been observed. Local scheduled work still needs the computer and app available, but this incident's trigger did fire. Official documentation: https://learn.chatgpt.com/docs/automations.

## Recovery routing correction
Three explicit recovery followups to the old task at 19:17, 19:19 and 19:20 UTC were delivered as `send_message_to_thread` tool outputs, but each returned the stale completed Astra result in roughly 2–3 seconds. This shows the followups were present, not that new instructions were executed. The single existing heartbeat was therefore moved to active recovery task `01a071e7-db55-7a22-8c99-04eba5060355`; target, ACTIVE status and 7/10/13/16/20 schedule were read back from automation.toml. No duplicate scheduler was created. The next actual unattended completion remains unobserved.

## Weekly recovery dead end reproduced and repaired
`publish-newsstand-weekly.mjs` rejected all ordinary non-Wednesday publication and required source checks on the publication day. A missed Wednesday therefore had no Thursday recovery path: backdating would fail freshness and be dishonest. The new private recovery metadata admits only the latest missed Wednesday (1–6 days), keeps its exact coverage period and pointer edition date, and requires real current-day sources/reviews/publication timestamp. Full validator-chain and CLI tests prove an actual Thursday write in a disposable root and reject stale sources, future/old/already-delivered targets and altered coverage. Existing Sunday corrective behavior is retained.

The integration test also exposed the prose evidence checker excluding public Weekly introductions and highlights while accepting Daily fields. Those visible prose fields are now recognized; fabricated text and source-only metadata still reject. Both fixes are source94623668. No editorial or source gate was disabled.

## Weekly public recovery and detector compatibility
Weekly bcab97e6-fb62-4e59-b4a7-28be18f77fd1 is public from efb13bf2, with September2–9 coverage and actual September10 publication. All783 provider asset paths retained; exactly three NewsStand data deltas; six immutable/custom exact-byte comparisons and four desktop/phone reader journeys passed. See weekly-release.json.

The first post-Weekly delivery check returned UNVERIFIED because the admitted Weekly writer inserts a compatibility comment before the legacy alias. The detector now parses both admitted wrappers without executing source; known access-screen and executable-suffix inputs reject. The live recheck correctly reports both dated service-only issues, zero new Daily news, and a current September9 Weekly. Fresh Daily reporting remains active; dated presence is not editorial completion.

## Final recovery outcome
Production a5216fe1-6b75-44a0-9ed2-02d3cc8c341b (sourcec9c29c2e) delivers1new Daily report on September10 and retains4original-date service records. September9 remains4services/0news, without backdating. RecoveredWeekly remains current. Exactly4data changes from priorWeeklyrelease, all783providerpaths preserved,8publicdata byte matches,6realreader journeys at1280/390/320 onbothorigins andcustomkeyboarddiscovery passed. Canonical recovery queue isPUBLISHED_VERIFIED. The next unattended completecycle remains unobserved; currentcheckpoint names the exact next scheduled step.
