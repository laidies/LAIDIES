# Town Hall Private Inbox Trust — Maker Evidence

**Date:** 2026-07-25  
**Result:** VERIFIED LOCALLY; RELEASE HOLDS REMAIN

## Source candidate results

- Town Hall contract: `PASS`, 20 checks.
- Rendered browser: `PASS`, 33 checks.
- Synthetic rendered external service attempts: `0`.
- Local links: `PASS`, 1,956 references / 110 pages.
- Inline JavaScript parse: `PASS`, 352 scripts / 132 pages.
- Town consistency: `PASS`.
- Product steward validator: `PASS`, 65 products.
- Scoped `git diff --check`: `PASS`.

The first browser attempt failed because the test clicked the visually hidden
radio input and the visible chip intercepted it. The suite was corrected to
activate the real keyboard path (`focus` + Space), then passed. This was a test
interaction defect, not a product or external-service failure.

## Rendered fixture coverage

- Mayor hash route and synchronized `aria-expanded`.
- Keyboard station activation and one-panel-at-a-time behavior.
- Town Regular device-local disclosure.
- Anonymous minimal payload and bounded accepted receipt.
- Signed-in verified user ID with no session-email collection.
- Progress and success live announcements.
- Accepted-only local timestamp and station refresh.
- Blocked localStorage after acceptance.
- Auth failure, rejected insert and unknown delivery outcome.
- Preserved body/subject and restored submit controls on failure.
- Duplicate warning on unknown outcome.
- Desktop/mobile rendering and mobile overflow/target width.
- External network denied; no Supabase/jsDelivr attempt.

Synthetic fixtures contain no private feedback or real identity.

## Exact artifact

- Builder result: 1,078 files, 961.4 MiB.
- Temporary artifact:
  `/tmp/laidies-town-hall-artifact.nzbcso/public`
- Metadata validation: `PASS`.
- Exact-artifact rendered browser: `PASS`, 33 checks, 0 external service
  attempts.
- `town-hall.html` and `content/site/town-hall-feedback.js` are byte-identical
  between source and artifact.
- Artifact warning: over the builder's 750 MiB warning threshold. This existing
  total-size concern is not claimed fixed by Town Hall.

## Selected SHA-256 receipts

| File | SHA-256 |
| --- | --- |
| `town-hall.html` | `d61d9eaba5793df2c32708425381b446f856a2fbe057f2a4e2e0d0c7012abe4d` |
| `content/site/town-hall-feedback.js` | `468b4a148d7219284cde1e9bf4c510078043bc636c6d08bdbc6ddbe3aefb6787` |
| `content/site/town-hall-v2.js` | `53e622c0fd085f050fded31c2e85aa410ac5e5cbcd41c4e049c6cbbfa9709e` |
| `content/town-hall-v2.css` | `f17c1e6d9110daa69d219deb3e01fdf97e11283c7a5b7f566a5fda3aaa11fd74` |
| desktop synthetic capture | `bd6425340bc82d0449942e47b874b97658a855847a3c5f9dddf67593ae14ffc6` |
| mobile synthetic capture | `7c1c6851f132529c2455faa0e6c055a5f809262edaee7a7511a3acb57aa7efe7` |

## Captures

- `evidence-2026-07-25/town-hall-desktop-feedback-synthetic.png`
- `evidence-2026-07-25/town-hall-mobile-feedback-synthetic.png`

They verify the local candidate's rendered mechanics and visual coherence only.
They are not user research, public-origin evidence or Ali's final visual
approval.

## Holds

- Independent maker/judge review.
- Live anonymous/signed-in/RLS proof.
- Server-side validation, anti-automation, idempotency/safe ambiguity and
  controlled logs.
- Staff triage/access/retention/incident operation.
- Public accountability/civic-record decision.
- Ali visual approval.
- Integration, deployment and public verification.
