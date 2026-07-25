# Town Hall Steward Backlog

**Status:** BUILDING — ranked recommendations; none authorises a product-code, data-policy or public change.

## FIX BEFORE LAUNCH

1. **Prove and bound the complete feedback lifecycle.** Run an authorised, controlled anonymous and signed-in submission test against the exact candidate; record acceptance, RLS behaviour, failure/retry, staff visibility and deletion/retention handling without retaining test content in the dossier. Make copy distinguish *filed*, *received*, *reviewed* and *resolved*.
2. **Name the civic-accountability owner and path.** Define who triages `filed → triaged → addressed/ignored/deb-flected`, what `reviewed_at` means, a response/escalation standard, correction/referral handling and an authorised public aggregate/reporting route. Do not promise “actually gets read” until this is operating and evidenced.
3. **Establish abuse, privacy and incident controls.** Decide and test rate limiting/anti-automation, duplicate handling, malicious-content review, urgent/safety escalation, access roles, retention/deletion and staff notification. The inspected schema/RLS validates shape and ownership, not these operating controls.
4. **Close privacy gaps in signed-in intake.** Confirm whether collecting `submitter_email` is necessary, who may access it, how it is retained/deleted and whether the public warning accurately covers it. Keep all private bodies, emails and names out of analytics, logs and champion evidence.
5. **Accessibility and resilient-form pass.** Test keyboard/radio focus visibility, error/live announcement, loading/disabled state, focus after success/failure, mobile tap targets, zoom/reflow and JavaScript/CDN/config/service failure recovery on the exact candidate.

## HIDE/LABEL FOR LAUNCH

1. **Limit the comment promise to verified truth.** Until the staff loop is demonstrated, describe the form as an inbox that confirms acceptance by the service—not that Deb, an intern or a human has read it.
2. **Label local state honestly.** “Your last card is on the pile” is a browser-local successful-filed marker, not an account record, cross-device history or response status.
3. **Do not market Civic Records as a public, searchable or accountable record system** until visibility, consent, moderation, correction and retention policies are approved and tested.
4. **Seek owner visual review before calling the room redesign finished.** The implementation has visible labelled stations and existing QA captures, while the brief's requested straight-on crisp interface render/placard treatment remains unverified in this dossier.

## POST-LAUNCH EXPERIMENT

1. After the intake is safe and accountable, test whether one restrained return cue—an optional aggregate “Town Hall update” or a clearly scoped status notification—improves trust. Never use private-submission content or a coercive response loop.
2. Compare three label treatments for the three room stations with a keyboard/mobile audit: direct civic verbs, canon-forward labels, and a concise hybrid. Success is comprehension and safe completion, not raw clicks.
3. Create a privacy-safe aggregate event set: `town_hall_station_opened`, `town_hall_feedback_started`, `town_hall_feedback_accepted`, `town_hall_feedback_failed` and controlled failure class. Exclude body, subject, email, identity and raw recordings; set a baseline before interpreting results.
4. Consider an authorised, aggregate corrections ledger only after the staff process works. It should publish categories/outcomes and sources, never raw notes or identifying context.

## DECLINE

- **No revenue mechanism now.** Charging for civic voice, staff attention, response priority or access to records would undermine the Town Hall's trust job. Reconsider only after free intake, privacy, response ownership and accountability are demonstrably healthy; any future optional physical/print civic artifact must not gate feedback, correction or public-interest information.

## Upkeep cadence

- Per change/incident: intake policy, copy, schema/RLS and route review.
- Monthly once operating: safe aggregate volume/failure/abuse review, randomly sampled authorised triage audit and broken-route check.
- Quarterly: retention/access-policy review, visual/mobile/accessibility regression and civic-promise review with Ali.
