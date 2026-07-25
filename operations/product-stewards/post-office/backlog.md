# SUNNYVAiLE Post Office backlog

**Status:** BUILDING — recommendations only; none is a live delivery, implementation or public approval.

## FIX BEFORE LAUNCH

1. **PO-001 — Test the Newsletter delivery contract with an authorised test identity.**
   - Owner: Newsletter Delivery + Privacy/Platform guild.
   - Test: valid/invalid/duplicate email, consent disclosure, opaque response, confirmation/double-opt-in if configured, unsubscribe and network failure/retry.
   - Pass: every visible success word maps to a service-observable outcome; an unobservable iframe remains “attempted.”

2. **PO-002 — Test the Magic-link handoff end to end.**
   - Owner: Magic-link Sign-in / Resident Card.
   - Test: request, received/clicked link, redirect, expired/used link, no-email/network fallback, session restoration and logout.
   - Pass: Post Office never calls a link request a completed membership or Card.

3. **PO-003 — Preserve the postcard truth boundary in every entry point.**
   - Owner: Postcards/Referral + Release QA.
   - Local evidence: `evidence-local-service-boundaries-2026-07-25.md` passed source binding, legacy query sanitisation, desktop/mobile picker and forced native-share/clipboard recovery. The generated link now carries only `?pc=<id>`; note/handle remain in user-controlled message text.
   - Pass: the exact public candidate states only compose/share/copy or share-sheet closure; no mailed/opened/joined/rewarded or mutual-necklace claim survives without authoritative evidence.

4. **PO-004 — Verify public privacy surfaces.**
   - Owner: Safety/Privacy + Postcards/Referral.
   - Local evidence: no current generator puts note/handle in a URL or custom Plausible call; legacy query fields are scrubbed before analytics scripts initialise. Provider-side analytics masking/CDN retention and public-origin behaviour remain unverified.
   - Pass: notes, sender identity and invite tokens are not needlessly exposed in query strings, analytics or error messages; invalid/private recipient routes disclose nothing sensitive.

## HIDE/LABEL FOR LAUNCH

5. **PO-005 — Keep referral rewards, background unlocks and delivery tracking unavailable.**
   - Evidence: the EOD closure removed their claims after no durable lifecycle proof; background selection is not ownership.

6. **PO-006 — Explain third-party dependencies without false certainty.**
   - Newsletter is Buttondown; sign-in is Supabase; native share is device/browser controlled. Clear fallback and privacy text must stay visible.

## POST-LAUNCH EXPERIMENT

7. **PO-007 — Championship: one low-pressure primary counter action.**
   - After PO-001/002: compare a weekly-newsletter-first counter with a postcard-first counter, using clarity, consent, useful return and unsubscribe guardrails—not raw form completion.

8. **PO-008 — Ethical connection lifecycle.**
   - Only after durable service state: opaque invite token, consented invite relationship, authoritative accepted/joined event, capped/idempotent reward, no contact upload, no public leaderboard and recipient autonomy. Reward useful shared learning, not shares/clicks.

9. **PO-009 — Revenue research after delivery trust.**
   - Later optional stationery/digital keepsakes may test demand only after actual delivery/ownership/refund proof. The newsletter, core learning and normal sharing stay free; do not sell referral access, addresses, data or currency-like rewards.

## DECLINE

10. **PO-010 — Decline using native-share closure or page visits as a send/open/engagement metric.**
    - It creates fake attribution, privacy risk and incentive gaming.

## Next trigger

The local service-boundary suite is complete (`evidence-local-service-boundaries-2026-07-25.md`). With an approved disposable test identity and the authority named in `build-packet-controlled-service-suite-2026-07-25.md`, run the controlled Newsletter/Magic-link/Postcard suite against an exact candidate/public release, then reconcile only verified outcomes into AW-003. Without that authority, retain the current **FIX BEFORE LAUNCH** and **HIDE/LABEL** boundaries; no idle rerun is warranted.
