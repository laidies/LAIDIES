# SUNNYVAiLE High external capability review

**Status:** RECOMMENDATION ONLY — no repository installation, subscription,
spend, external account or production data access authorized.

## Problem and user benefit

The High needs repeatable keyboard, focus, reflow and semantic checks across a
class modal, quiz, scorecard and recovery states. A browser-load check cannot
prove those interactions. Local deterministic automation reduces regressions
while leaving Safari/VoiceOver and unfamiliar-learner judgment to people.

## Candidate

Version-pin `playwright-core` for local multi-viewport journey automation and
`axe-core` for an additional automated accessibility signal.

- Build versus buy: open-source local tooling; no hosted vendor is needed.
- Alternative: temporary Playwright package root plus manual browser and
  VoiceOver checks, which is the current bounded approach.
- Cost: no license fee; maintenance is dependency updates and test runtime.
- Privacy/security: run against synthetic local fixtures; prohibit production
  session tokens, real learner data and screenshots containing private data.
- Accessibility limit: axe cannot replace keyboard, screen-reader, cognitive
  or learner-comprehension review.
- Lock-in/rollback: test scripts use standard browser/DOM behavior; remove the
  dev dependencies without affecting runtime.
- Smallest proof: add pinned dev-only packages on an isolated branch and rerun
  the six existing High browser journeys plus one axe scan.
- Approval: Platform maintainer approves dependency installation/version
  policy. Ali is not needed unless this changes budget, data use or product
  experience.

## Decision

**RECOMMEND FOR PLATFORM REVIEW, NOT REQUIRED FOR THE CURRENT REPAIR.** The
temporary local runner already supplied the current browser evidence.

