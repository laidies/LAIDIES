# Learning scan — Study Pack visual reconciliation

**Status:** CAPTURED FOR CONTROL ROOM / CANONICAL PAINPOINT MERGE PENDING  
**Date:** 2026-07-26  
**Scope restriction:** recorded in the owned dossier because this turn held no
shared `operations/painpoints-log.md` lock

## Qualifying findings

### Route availability concealed a broken receiver return

- **Observed:** every Try-On route is marked `available`, but its controller
  ignores `from=blend-snap` and rewrites both return links to `/`.
- **Why it matters:** a passing source link proves arrival, not the complete
  sender → result → return journey.
- **Prevention rule candidate:** component admission must bind and test the
  exact origin, receiver result and handback; route existence cannot lend PASS
  to the handoff.
- **Behind the Build angle:** “The link worked. The product loop did not.”

### Preview evidence drifted away from source shape

- **Observed:** Episode 04 has four printable preview PNGs while the current
  HTML contains two `.page` sections.
- **Why it matters:** visually convincing screenshots can survive after the
  source artifact changes and falsely imply current print coverage.
- **Prevention rule candidate:** every print screenshot/contact sheet must
  record the exact source SHA, renderer/version, page count and output SHA;
  source page count and rendered page count must match before review.
- **Behind the Build angle:** “Four screenshots, two pages, zero proof.”

### A component name concealed the wrong learning job

- **Observed:** Episode 01’s available Try-On currently teaches the vague-to-
  detailed briefing move owned by Episode 02, not Episode 01’s compare-tools,
  low-risk first-rep brief.
- **Why it matters:** component and episode labels can agree while the learning
  interaction is wrong.
- **Prevention rule candidate:** weekly release acceptance compares each
  component’s observable learner action to the checksum-bound producer brief,
  not only its route, title or issue parameter.
- **Behind the Build angle:** “The right episode number, the wrong lesson.”

