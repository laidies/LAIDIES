# Town Hall Launch Deep Dive

**Date:** 2026-07-25
**Status:** REPORT READY — source/schema inspection complete; fresh rendered and live-service proof unavailable
**Launch verdict:** **PARTIAL SUBMISSION UNVERIFIED. Fix accountability, abuse and privacy-operating gates before promoting feedback as read or as Civic Records.**

## Executive verdict

Town Hall has a strong LAiDIES-native premise: a civic room is the interface, with a clear choice to see Mayor Deb, meet the Regulars or leave a note. The source preserves useful product substance—Deb's archive and audio/print material, character routes, a local Town Regular handoff, one-open-at-a-time panels and hash links. The feedback form also has meaningful client validation, schema constraints and RLS-enabled anonymous/signed-in insertion.

The present trust gap is operational, not cosmetic. The page copy says the comment pile “actually gets read,” while this run can evidence only source logic that reports a successful service insert and stores a browser-local filed flag. No live insert, staff access, triage owner, abuse protection, retention process, notification path or public correction/accountability loop was verified. The form must therefore remain an **unverified submission path**, not evidence of a reader, response or civic record.

## Evidence and limitations

### Inspected

- `town-hall.html`, `content/town-hall-v2.css`, `content/site/town-hall-v2.js` and the Town Hall building brief.
- Supabase baseline schema and RLS policy for `public.town_hall_feedback`, plus browser configuration wiring.
- Product-steward contract/registry, shared event dictionary, Tour Guide privacy guidance and Town Hall's 2026-07-24 QA capture inventory.

### Limitations

- No browser connection was available: no fresh desktop/mobile rendering, keyboard/screen-reader, real hash navigation or form interaction was run.
- No live Supabase submission, auth session, database inspection, staff role, notification, moderation or retention test was authorised/performed.
- Existing Town Hall QA images are useful prior local evidence but do not recertify the current candidate or public origin.

## Product intent and brand fit

The building brief defines Town Hall as Civic Square's relationship surface: “see the mayor, meet the locals, leave a comment.” Its most important visual rule is a room that behaves like a room: three obvious labelled stations, honest state on arrival and in-place reveals—no invisible hotspots or generic card-grid substitute.

The implemented source uses the civic-chamber image as the full hero, moves the three hub buttons into overlay station zones, shows a real Regular count, and uses one-open-at-a-time panels with hash aliases for Deb, Regulars and feedback. This is directionally aligned with the room-as-interface promise. However, the design brief treats the current softer civic-chamber asset as an interim fallback and asks for a crisp, straight-on operable lobby plus placard treatment. That visual target is **OWNER REVIEW REQUIRED**, not achieved/verified by this report.

Source-level accessibility positives include native buttons, `aria-expanded`, hidden inactive panels, a labelled radio group, required fields, a character counter and explicit status text. Required fresh checks: overlay focus order and visibility, interaction-zone semantics, skip/scroll behaviour, radio-chip focus visibility, live error/success announcement, mobile reflow/tap sizes, image contrast, zoom and reduced-motion behaviour.

## Journey assessment

| Journey | Evidence | Status | Risk / next proof |
| --- | --- | --- | --- |
| New visitor chooses a station | Hero has three labelled controls; JS moves the existing hubs into the station host. | **PARTIAL** | Fresh visual/mobile/keyboard comprehension test unavailable. |
| Deb and Regulars exploration | Existing panels, direct links, print/audio material and `#hub-deb` / `#regulars` routes remain in source. | **PARTIAL** | Test exact links, audio, focus/scroll and mobile layout. |
| Returning Town Regular | Picker writes `laidies_town_regular`; source describes Closet handoff. | **DEVICE LOCAL** | Do not imply account sync or cross-device identity. |
| Anonymous comment | Required type/body, 3–2,000 body length and insert policy allowing null user ID are in source/schema. | **SUBMISSION UNVERIFIED** | Controlled live acceptance/RLS/error test required. |
| Signed-in comment | Client adds `user_id` and `submitter_email` from session; insert policy permits own ID and own-read policy exists. | **SUBMISSION UNVERIFIED** | Verify claimed identity cannot be forged, email necessity/access and exact RLS behaviour. |
| Service failure | Missing client/config gives an inbox-offline message; insert failure gives retry copy. | **SOURCE IMPLEMENTED, UNVERIFIED** | Simulate CDN/config/network/RLS failures; test focus and retry state. |
| “Last card” return state | Success sets `laidies_town_hall_feedback_filed`; station label changes. | **DEVICE LOCAL** | It proves neither a durable record nor human reading. |
| Triage / civic records / correction | Schema has status, `admin_notes` and `reviewed_at`. | **NOT BUILT OR NOT EVIDENCED** | Assign staff process, access and accountable disposition/reporting model. |

## Data, privacy, abuse and failure analysis

`town_hall_feedback` constrains type to compliment/complaint/suggestion, subject to 100 characters and body to 3–2,000. It stores optional `user_id`, `submitter_email`, `submitter_display_name`, a disposition status (`filed`, `triaged`, `addressed`, `ignored`, `deb-flected`), `admin_notes`, `submitted_at` and `reviewed_at`. RLS is enabled. Its inspected policies allow insert when the row's user ID matches `auth.uid()` or is null, and allow a user to select only rows with their own ID.

These are valuable boundaries, but they are not an operations program. The client uses an anonymous publishable key and directly inserts from the browser; the review found no evidence in the inspected scope of anti-automation/rate limits, CAPTCHA, duplicate control, moderation queue, staff notifications, incident escalation, retention/deletion schedule, admin role policy or a public correction path. Absence from inspected source is not proof none exist in deployed infrastructure; it is a gate for evidence before promotion.

The form already warns writers not to include private/sensitive information. Signed-in flow nevertheless sends session email. Before launch promotion, minimise that collection or document necessity, authorised access and retention. The shared event guidance explicitly forbids feedback copy, email addresses and other private content in events; this must apply to Plausible, Clarity, console/error logging, staff handoffs and champion evidence.

## Analytics and learning

Plausible and Clarity tags are present, and `laidies:town-hall-feedback-filed` exists to thank a visitor without carrying the feedback content. None of that constitutes a product-learning loop: the registry says Plausible/Clarity pulls and notifications are **NOT WIRED**.

After privacy/abuse gates pass, instrument controlled metadata only: station ID opened; feedback start; accepted insert; failure class; and authorised aggregate disposition counts. Establish baseline, guardrails and a review owner. More submissions are not evidence of trust, usefulness or staff accountability; pair aggregate signals with an authorised qualitative review that never exports raw private notes.

## Launch disposition

### FIX BEFORE LAUNCH

1. Verify the exact live anonymous/signed-in submission path, RLS, service failure and staff access in a controlled test.
2. Put a named, documented triage/retention/incident process behind the comment promise, including abuse/automation mitigation and a safe escalation route.
3. Correct or narrow copy that equates an accepted insert with a human reading, response or civic record.
4. Confirm signed-in email collection, access and deletion handling; remove it if it lacks a necessary, approved purpose.

### HIDE/LABEL FOR LAUNCH

- Keep “last card on the pile” explicitly browser-local and post-success only.
- Do not present Civic Records as public, searchable, reviewed or accountable until the relevant operations are live and verified.
- Label visual/design completion as pending owner review and current browser evidence.

### POST-LAUNCH EXPERIMENT

Once the foundation is safe, test a restrained, aggregate town-update pattern versus no return cue; measure comprehension and trust with privacy-safe aggregates and authorised feedback review. Separately compare clear civic labels against canon-first labels for the three stations, only after accessibility evidence exists.

### DECLINE: revenue before trust

Town Hall should not monetise submissions, priority attention, staff response or civic information. Its first job is credible voice and responsible stewardship. Revisit only after the free, safe, accountable lifecycle has working evidence and Ali approves a non-gating optional artifact.

## Steward handoff and upkeep

The Town Hall champion owns the building promise and dispatches the Town Feedback & Civic Records subchampion when intake, schema, policy, incident or accountability work changes. The next run is triggered by authorisation for a controlled end-to-end test and an Ali decision on the civic-records/response model. Until then, status remains **REPORT READY** for this dossier and **PARTIAL SUBMISSION UNVERIFIED** for launch.
