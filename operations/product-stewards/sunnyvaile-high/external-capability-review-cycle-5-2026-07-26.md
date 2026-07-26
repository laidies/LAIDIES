# External capability review — High Cycle 5

**Status:** recommendation only; no install, spend, account, upload or vendor
commitment.

| Candidate | Useful for | Smallest proof | Guardrail / decision |
|---|---|---|---|
| Pinned Playwright + axe-core | Stable multi-route regression and an extra accessibility signal. | Local synthetic High fixture in CI. | Recommend Platform review; never treat axe as Safari/VoiceOver or comprehension proof. |
| H5P | Rich formative interaction without rebuilding every pattern. | One exportable, keyboard-tested misconception sort using fake data. | Evaluate only; require LAiDIES styling, WCAG behavior, ownership/export and low lock-in. |
| Caption/transcript tooling | Draft transcript, captions and timing alignment. | One approved narration clip compared word-for-word and cue-for-cue. | Human review owns terminology, timing, speaker, sound cues and narration/image match; no auto-publish. |
| Lightweight content-link monitor | Weekly official-source/recheck alerts. | Check ledger URLs and overdue dates with deterministic local output. | Good future build; no learner data or external monitoring account required. |

Code-native pages remain the default. Adopt a tool only when the prototype
beats the existing path on learning value, accessibility, maintainability,
privacy and total cost.
