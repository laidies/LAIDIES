# LAiDIES six-route live audit — September 19, 2026

Scope: existing homepage entrances, adult beginner journeys; current public laidies.ai in the in-app browser at 1440px and 390px. This is a sampled journey audit, not whole-site acceptance. No public comments, reactions or account changes were submitted. Local Girl Talk card was drawn without marking a reward.

## Observed results

1. **Learn — usable.** Homepage → Learn redirect → Library → AI Fundamentals preview → real book reader. Book and exact section readable on desktop/phone. Back to shelf and town worked. All book contents were not reviewed.
2. **AI question — deficient.** “Why does the AI ignore part of my prompt?” returned generic clear/specific advice plus a handover suggestion; recommendations were generation randomness section 7.3 and a handover section. The answer did not establish why those mechanisms fit the question. Featured “Which AI should I use?” returned only “There is no best AI. There's the best AI for this task, right now, for you.” The same slogan repeated as the recommendation. Exact section navigation worked. Current policy and previously built successors need reconciliation before repair.
3. **Headline — readable and dated.** Homepage hydrated to “I want today’s headline explained”; destination was the Weekly, published/checked September 19, covering September 9–16 with a separately dated September 18 update. Desktop/phone readable, no horizontal overflow at390. The related class-note continuation was clicked but its destination was not verified. Article claims were not independently fact-checked in this audit.
4. **Episode — reading/listening usable.** Homepage → current Episode04 → Listen → loaded Episode04 narrator. Actual attached audio advanced from0.14 to12.29seconds, paused=false; duration1222.46seconds. Pause worked. Quiz loaded12 Episode04 questions. Zero-answer submission had no feedback visible at the bottom; complete scoring and validation remain unverified. Several portrait/scene art holds remain visible in the episode.
5. **Radio — resume recovery fails in this browser.** Listen/Resume repeatedly produced “Another town tab is paused” at0:00. Stop and close → Listen recovered to Playing/Pause with3:38 duration. Navigation to Library returned to paused remote-owner state. Source diagnosis found a fresh remote owner heartbeat; stale localStorage is not established. Remote Resume calls play in another document’s storage event, which may lose user activation. Current Chrome reproduction remains pending; prior September15 Chrome continuation passed. No physical audibility or lock-screen test.
6. **Fun/community — real activity and correct sign-in entrance.** Girl Talk drew a private Dare with optional room guide and local mark/skip controls. No completion/reward claimed. Sorority House loaded rooms and an empty Hyvor thread; LAiDIES login and embedded provider login both point to Resident sign-in with return path. That page displayed the email-link form. Signed-in posting was not repeated today; prior September15 test-account acceptance remains historical evidence only. Community artwork holds and KSVL reward “coming later” wording remain.

## Evidence

PNG files01–17 are saved in this directory. **04-book-reader-phone.png is rejected** because it captured a transient viewport-resize frame. Use06-answer-source-phone.png for the valid phone reader. Screenshot13 only establishes the current bottom viewport after zero-answer quiz submission, not the absence of a result elsewhere. Screenshot17 captures the sign-in form but its heading is above the viewport/sticky controls. Screenshot02 shows Library masthead rather than the shelf despite its filename.

## Priorities from this sample

1. Make the question desk provide useful, condition-preserving help; reconcile current free-search/explicit-research rules and existing saved work with production.
2. Repair the reproducible radio Resume recovery path after confirming cross-document browser behavior.
3. Replace visible art holds with approved finished assets and make community rooms worth returning to; public seeding and moderation operations were not performed.
4. Complete quiz validation/scoring and linked-learning continuation acceptance; reward development is still a separate unfinished product capability.

No release or code repair is claimed by this initial audit record.
