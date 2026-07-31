# Independent acceptance — Visitor's Centre native Safari v1

> **SUPERSEDED / REJECTED BY ALI:** This report is preserved only as technical
> evidence. It does not admit the Visitor’s Centre experience, authorize
> integration or support promotion, deploy or public treatment. See
> `ALI-DECISION-reject-functional-base-2026-07-26.md`.

**Verdict:** **PASS — LIMITED NATIVE SAFARI ADMISSION.** The exact local route
passes the evidenced Safari viewport, zoom and invalid-projection native gate.
VoiceOver speech/cursor traversal, human comprehension, deploy and public
proof remain **HOLD** and are not implied by this verdict.

**Acceptance owner:** `visitors_centre_independent_native_safari_acceptance_20260726`.

**Independent evidence time:** 2026-07-26 12:33:00 PDT (America/Vancouver).

## Exact evidence binding

The candidate and all supplied evidence receipts matched before and after the
independent reruns.

| Input | SHA-256 |
| --- | --- |
| `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` |
| Static contract test | `756f82553c89b946d1763b4d8b5edafa7c3f4b53f6d7356ca557efcb5c030e14` |
| Live route test | `a0d2ef93603538ea6ebc23b99495b7257f3ba3cc616fb0adef659fa3b00182ad` |
| Projection artifact / payload | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` / `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361` |
| Browser runtime / canonical crosswalk | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` / `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |
| Invalid-projection fixture server | `f023a494cc8f63475fd419df52ad793129b6e1a10eb899c47d04edb8ccdb2f9a` |
| Native Safari evidence set | desktop `38e2c0…d4d1`; 390 `00f794…2a19`; 320 `897704…a93`; 200% `f24064…f4a9`; invalid projection `c8b965…c900` |
| Shared-header receipt | `d01c2c63e2fe1137fac7025e64fc8f26fc2f0c7c9c9d35b2a0a1a804b14d18cf` |
| Independent current 779-check result | `74ed811871d2761b626deaa88ee7ffb62ca76903da2db407e329b3bead5d877f` |

## Independent checks and inspection

- Recomputed all frozen route, test, projection, runtime, crosswalk,
  invalid-server and screenshot hashes.
- Inspected the Safari desktop normal capture and invalid-projection capture.
  The normal scene retains the welcome room and map. The failure scene visibly
  says current status is unavailable, retains named routes and does not present
  a destination as complete.
- Inspected the owned server: it is local-only, binds to `127.0.0.1`, serves
  the frozen route tree, returns no-store corrupt JSON only at the readiness
  projection path, and rejects traversal. I ran it and confirmed its corrupt
  response and a successful frozen-route response.
- Reran static contract: PASS. Reran Platform projection v1: PASS, 17
  destinations / current 3 / fail-closed 12 / idempotency 3. Reran live route:
  PASS, 779 checks and 0 failures.
- Reran Platform shared-header characterization. The raw shared header remains
  **HOLD** at 320px (right edge 333.94px; document width 334px), while the
  Visitor-owned containment is **PASS** (right edge 312px; document width
  320px). The route does not remove or mask that shared defect.

## Accepted native scope

The Safari evidence supports actual-size desktop, Safari responsive 390×844
and 320×568, real 200% zoom, four visitor/Card non-inference states and the
corrupt-projection fail-closed path. The independent browser matrix corroborates
the 17 generic fail-closed routes, `completionClaim=false`, no-JS, focus/Escape,
44px targets, 320/390/1440 reflow, text spacing and recovery behavior.

The machine record now says `PASS_LIMITED_NATIVE_SAFARI`; that update is bound
to this exact passing tuple. No route, shared source, deployment or publication
was changed by this acceptance.

## Holds and next trigger

- **VoiceOver:** the on/off toggle and Safari semantic tree are evidence, but
  no reproducible speech or cursor traversal capture exists. Keep this gate
  HOLD.
- **Human comprehension:** requires approved participants.
- **Public origin:** requires deploy authority and separate public verification.
- **Destination readiness:** all 17 destinations remain held until admitted
  owner receipts exist; a route is not destination completion.
- **Shared header:** retain the local 320px containment until the Shared Header
  owner passes its raw gate and the exact successor route is independently
  reaccepted.

**Next trigger:** Control Room supplies a receipt-bound successor after shared
header repair and/or owner receipts, then rerun native Safari; separately obtain
reproducible VoiceOver traversal evidence and the human/public gates.

## Learning scan

No qualifying new learning was recorded. The relevant prevention rule held:
separate a real native-browser/zoom result from unobserved screen-reader speech
and cursor claims, and record the shared-header defect rather than treating
route-local containment as a global repair.
