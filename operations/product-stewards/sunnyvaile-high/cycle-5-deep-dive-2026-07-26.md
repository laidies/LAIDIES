# SUNNYVAiLE High Cycle 5 deep dive

**Status:** REPORT READY; bounded P0 candidate VERIFIED LOCALLY; product remains
**FIX BEFORE PROMOTION**.

## Current Repair 2 admission gate

Repair 2 responds to the 83/100 independent FAIL without changing any current
class, source or quiz record. In addition to strict UTC calendar validity and
individual currentness, every source interval must now contain the complete
class admission interval:

```text
source.checkedOn <= class.reviewedOn
class.recheckOn <= source.recheckOn
```

The gate checks every bound source, so one violating source fails the complete
class closed. Equality at either boundary remains valid; a one-day gap does
not. Source and fresh-artifact browser matrices now deny 29 malformed, stale,
temporally uncontained, duplicate, ambiguous or misbound admissions and admit
two exact inclusive-boundary fixtures. Current truth remains 4 subjects / 37
rows / 0 live / 0 video / 0 admitted classes / 0 runtime quizzes. Repair 2 is
maker-verified only and awaits a new independent rejudge. All existing
learning, media, accessibility, reward, analytics, artifact, deployment and
public-origin holds remain.

## Product and experience job

High is LAiDIES' applied-learning building: see a mechanism demonstrated,
practise judgment, inspect feedback, retry and choose a useful next step. It
must complement the Library's durable reference, Episodes' narrated sequence,
NewsStand's current evidence and tools/games' immediate utility.

New learners need a plain starting point, prerequisites, an honest preview
status and one next action. Returning learners need current classes, local
attempt history scoped truthfully, review of errors and a meaningful next
practice—not decorative grades or manufactured mastery.

## Inventory and gap analysis

| Area | Current truth | Highest gap / decision |
|---|---|---|
| Building and corridors | Routes and recovery are locally tested. | Public/Safari/VoiceOver and owner visual approval remain held. |
| Classes / Study Hall | 4 subjects, 37 rows, 0 live videos, 0 verified dates. | A row could formerly self-promote with `live` + video. Cycle 5 adds a separate fail-closed learning ledger; 0 records are admitted. |
| Representative teaching | “What You're Looking At” taught obsolete absolutes about text-only models, no search and empty new chats. | Repaired into an app/model/tools/context mental model using current official product sources; still held for independent review and production. |
| Pop Quiz | Existing runtime quizzes explain answers and store attempts locally. | Existing item-bank validity is not globally approved. Repair 1 keeps five selected-response practice items held and removes the canned explain-back item; real explain-back remains a human-rubric/unfamiliar-learner gate. |
| Report Card / Yearbook | Repair 4 independently passed local truth and long-name reflow. | Preserve that PASS; do not reopen it. Account/cross-device authority remains unproven. |
| Book Fair | “Stocking soon” protects unproven fulfilment. | Visit-only local grants, swallowed writes and divergent local stores remain the next P0. Keep unavailable. |
| Backend / persistence | Quiz attempts are browser/device local. | No account learning ledger, mastery credential, reward spend/refund or fulfilment exists. Do not claim one. |
| Analytics | Aggregate quiz event exists without raw score. | No approved learning study, explanation-view/retry baseline, consent-reviewed Clarity contract or qualitative feedback loop. |

## Learning and media standard

Every class must build the mechanism before analogy; distinguish adjacent
concepts; name uncertainty and misleading claims; use current official
evidence; demonstrate something a paragraph cannot; test application,
explain-back and misconception resistance; and route onward without duplicate
teaching.

Narration owns the conceptual sequence. Images must show the exact object or
state named at that moment. Animation is reserved for time, flow, causality or
comparison. Real interface captures must be path-checked and date-stamped.
Captions follow final narration verbatim; meaningful visual states cannot rely
on colour. Decorative characters, mismatched backgrounds or generic mood
frames cannot replace teaching. Video, poster, transcript, captions, audio,
timing and visual style all require separate media/brand approval.

## Weekly operating system

1. Map the weekly episode's learning objective against Library, High,
   NewsStand, FAiRY and games; record the distinct job of each.
2. Recheck volatile class sources and real interface paths before scripting or
   filming; 30 days is the maximum for this representative product packet.
3. Run accuracy, instructional-design and assessment review before media.
4. Produce narration, shot/cue map, visual assets, animation and captions with
   exact narration-to-image timing; then run an independent media QC.
5. Admit only after the learning ledger has current review/recheck dates and
   the register has the final video/filmed/verified evidence.
6. Review aggregate failures, retries, explanation use and voluntary feedback;
   never infer capability from a playful score.
7. Retire or hold stale items. A missed review never silently rolls forward.

## Sustainable revenue, after trust

Keep core AI literacy accessible. Later candidates are optional live workshops
or office hours, accessible printable workbooks, employer/community licences
and fulfilled school-world merchandise. Each needs value, rights, cost,
accessibility, refunds and no-paywall review. Quiz scarcity, grades or rewards
must not pressure payment.

## External capability recommendations

- Pin local `playwright-core` and `axe-core` for regression signals; retain
  manual keyboard, Safari/VoiceOver and unfamiliar-learner review.
- Prototype H5P only for one formative interaction if code-native assessment
  becomes costly; assess accessibility, theming, export and lock-in first.
- Use a caption/transcript tool only inside the approved media workflow; human
  timing, terminology and narration-to-image review remain mandatory.
- Do not install, subscribe, upload learner data or alter production from this
  recommendation.

## Product-champion score

| Gate | Self-score |
|---|---:|
| Product quality and user value | 18/20 |
| Accuracy, safety and trust | 19/20 |
| LAiDIES brand contribution | 18/20 |
| UX and accessibility | 17/20 |
| Technical and data integrity | 18/20 |
| Learning and assessment quality | 17/20 |
| Weekly sustainability | 17/20 |

These are maker scores, not approval. Independent learning/media review and
the named external gates remain non-compensable holds.
