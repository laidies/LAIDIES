# Homepage closeout — September 6

Goal: finish the agreed homepage and verify its remaining assistant journeys before owner review. This is a preview, not production approval.

The homepage HTML, runtime, artwork, fonts, controls and copy remain byte-identical to preview 9e7e828c (HTML b154c3a0abde14657e5e3bc6877328dfab5caa6577e5b5ce039a11d114a83d77). Its prior exact visual/copy reviews remain attached to those unchanged bytes; they do not review the new search behavior.

Changed: free-search relevance weights distinctive words, requires question coverage, normalizes simple plurals, and prioritizes the existing supported question routes. Unrelated bicycle repair and furniture queries now return no match. No paid call is possible on explicit search; privacy checks precede retrieval. Dictionary excerpts omit detached navigation labels.

The old index was dated August 23 while the currently served/admitted books are August 29. Working with AI 101 had 177 dead section anchors. Rebuilt the entire index with the existing builder from exact current admitted rendered books; updated the builder's common-question anchors. All 598 emitted section links now exist in their admitted parent, with matching version/hash metadata. Added --check so a stale generated index fails before release. Source books and non-book catalogue entries are preserved.

The actual homepage requests were exercised in Chrome at 1440 and 390px. The maker inspected the rendered search output. Three first-result source routes were opened in the current hosted Library, including the moved brief section. Thirteen search cases include paraphrases, off-topic negatives and the work-document safety prerequisite. Source excerpts remain excerpts, not newly generated answers. This is bounded search verification, not certification of all book prose or arbitrary question quality.

FAiRY: one preview request failed before model invocation because the preview origin is not allowed by the existing Worker CORS policy. One normal guest submission at laidies.ai returned useful project-conversation advice plus a copyable own-AI preparation prompt. Its current page source matches the preview. Full visible result and capture limits are in fairy-live-result.txt. No allowance bypass, service configuration or production deployment changed.

Original recommendation reconciliation: homepage navigation, directory breadth, dynamic latest episode, radio, layout/art/font and feature descriptions have prior scoped preview evidence and owner corrections. Free-search source trust/relevance is repaired here. Separate next-page work remains: optional Sol research's real quality/cost pilot and enforced budget, newer FAiRY entrance, shared-answer/consented handoff implementation, and Resident Card/Closet continuity. Do not describe them as delivered.

Review only actual code defects, source fidelity, visitor-result failures, stale bindings or regressions against the original goal. Do not reopen approved copy or add stylistic preferences.
