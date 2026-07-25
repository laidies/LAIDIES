# Town Hall Product Steward Charter

**Status:** BUILDING — manual launch deep dive complete; no persistent runner is wired
**Product owner:** Town Hall product steward
**Subchampion:** Town Feedback & Civic Records subchampion
**Portfolio owner:** Codex portfolio orchestrator
**Founder decision owner:** Ali

## Product promise

Town Hall is SUNNYVAiLE's civic relationship surface: a visitor can see Mayor Deb, meet the town's Regulars, and file a comment, complaint or suggestion through a clearly bounded inbox. It makes the town feel answerable without claiming that a submission has been read, acted on or made public when that has not been proved.

It is not a decorative lobby, an unmoderated public message board, or a false promise that an anonymous browser flag is a civic record or a staff response.

## Owned scope

- `town-hall.html`: room arrival, three stations, Mayor Deb archive, Regulars, Town Regular picker and feedback entry.
- The room-interface contract: labelled, discoverable stations; in-place panels; hash routes; mobile reflow; charm-hunt wrapper preservation.
- `town_hall_feedback`: anonymous and signed-in intake, privacy boundary, accepted-submission state, failure handling and the internal disposition contract.
- Town Feedback & Civic Records subchampion: feedback triage, correction/referral boundaries, retention/access rules, aggregate public accountability only where authorised, and `/community/comment-card.html` coordination.

## Out of scope

- Moderation decisions, public publication of feedback, staff access, retention changes, or data-policy changes without authorised operational ownership.
- The shared identity platform beyond truthfully labelling `laidies_town_regular` and the submitted-card browser flag as local state.
- Public deployment, canon changes, or approval of creative production.

## Definition of a healthy journey

1. A new visitor understands the room and the three labelled choices without hotspot hunting: see Deb, meet the locals, or leave a note.
2. A visitor can open exactly one panel, use direct hash routes, and recover a sensible mobile and keyboard path.
3. The Mayor and Regulars material preserves its real routes, audio/print links and the local Town Regular-to-Closet handoff without overclaiming account sync.
4. A writer sees the sensitive-information warning, chooses a type, receives an honest accepted-versus-failed result, and is never told a local flag proves a human read the note.
5. Anonymous and signed-in submissions obey least-privilege access, minimised collection, defined retention and a documented abuse/triage path.
6. Feedback that becomes a correction or civic record has an owner, status, source boundary and an authorised way to report what changed without exposing private submissions.

## Quality and decision rules

- The building brief's direction is a civic room used as the interface: visible stations and real state on arrival, never invisible hotspots or generic card-grid controls.
- Current source uses the fallback civic-chamber artwork and labelled overlay controls. The brief's requested straight-on crisp operable-lobby render and brass-placard treatment remain a design decision, not an achieved visual approval.
- `laidies_town_hall_feedback_filed` means the browser recorded a successful insert attempt; it cannot mean read, triaged, resolved, or durable across devices.
- Feedback copy, email addresses, names and raw session recordings must never enter analytics or champion evidence. Use controlled metadata only.
- Fixed status language applies: source inspection, a local test, deployment and public verification are distinct states.

## Current dependencies

| Dependency | Why it matters | Current truth |
| --- | --- | --- |
| Supabase `town_hall_feedback` | Intake, RLS and disposition data | Schema and policies are inspectable; this run did not perform a live insert or staff-workflow test. |
| Supabase client/config + CDN import | Browser can initialise the form | Client has offline/error copy; live service availability was not tested. |
| `town-hall-v2.js` + localStorage | Station labels and return state | Browser-local filed flag and Regular count; no cross-device/read-state proof. |
| Closet / Your Luminaries | Town Regular retrieval | Local handoff only; shared identity owner coordinates any account claim. |
| Plausible, Clarity, event dictionary | Learning and tour acknowledgement | Scripts/event exist; product analytics pull, baseline and privacy-safe dashboard are NOT WIRED. |

## Steward triggers

- Any Town Hall copy, room asset, hub/hash, Town Regular, Supabase schema/policy, client or auth change.
- A failed submission, privacy complaint, abusive-content report, duplicate/spam pattern, incorrect civic claim or staff-triage incident.
- A feedback item that needs a correction/public response, or an approved retention/access-policy change.
- New analytics evidence once a privacy-safe event contract and aggregate pull are operating.
- Monthly intake-health review and quarterly civic-promise/visual review once scheduling is wired.

## Escalations

- **FIX BEFORE LAUNCH:** false claim that feedback was read or acted on; broken/unauthorised insert or exposure; no accountable path for abuse/security incidents; inaccessible core feedback control; or private feedback emitted to analytics.
- **HIDE/LABEL FOR LAUNCH:** civic-records, staff-review, response-time or cross-device claims without verified operations; visual treatment lacking current owner review; any unverified feedback route.
- **Ali decision:** the public accountability model, retention/response policy, final room-art direction and any ethical revenue model.
