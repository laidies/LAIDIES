# Dream Phone product-status and trust-repair maker packet

**Status:** SUPERSEDED BY BOUNDED REPAIR 2 — SEE `evidence-product-status-trust-repair-2-2026-07-25.md`
**Launch status:** PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL
**Release authority:** NONE

## Outcome

- **Product:** Dream Phone Booth
- **Problem:** a public experiment had bypassed its recorded product gate,
  mixed three product models, overstated static advice, implied rewards and
  asked players to distrust weak evidence while its own deck relied on weak
  evidence.
- **Bounded outcome:** make the existing experiment honest and fail-closed
  without choosing the major product model.
- **Non-goals:** no product-model decision, redesign, new visual, account,
  reward backend, analytics pull, deployment, promotion, social post, Git or
  external mutation.

## Direction preserved

The owner choice remains unresolved. This packet does not approve Hotline Desk,
Just Call, the fact game or the parked patron-saint model as Dream Phone's final
form. It only:

- labels current entry points experimental/scripted;
- bounds Just Call as playful prewritten reflection;
- states session-only history/discovery truth;
- stops the parked patron-saint engine from executing on the booth;
- admits only claim-level, official-source rounds into the beta deck; and
- fails closed when the evidence ledger is missing or malformed.

## Work completed

| Work item | Output | Maker result |
|---|---|---|
| Steward contract reconciliation | `CHARTER.md`, `OPERATING-SPEC.md`, `state.json`, `backlog.md` | BUILT LOCALLY |
| Status/advice/persistence repair | booth, Fun Pack, welcome tour, town directory, content registry | BUILT LOCALLY |
| Parked-engine isolation | booth no longer loads `dream-phone-game.js`; navigation-only shell behavior retained locally | BUILT LOCALLY |
| Claim admission and correction control | `games/data/dream-phone-claim-ledger.json`, claim evidence record | BUILT LOCALLY |
| Fail-closed beta deck | runtime loads ledger; one round admitted; twelve held after independent chronology correction | REPAIRED LOCALLY |
| Deterministic tests | `scripts/test-dream-phone-contract.mjs` | PASS |
| Browser journeys | `scripts/test-dream-phone-browser.mjs`, four screenshots | PASS IN HEADLESS CHROME |

## Evidence decision

Only one source round is now admitted:

1. Sky Dancers recall scale, bounded to the CPSC's 8.9 million units, 170
   strike reports and 150 reported injuries.
The Mortal Kombat/ESRB round returned to `HOLD` after independent review caught
that the candidate collapsed two elapsed-time intervals. The corrected record
says a trade association formed four months after the first hearing and ESRB
was officially formed five months after that.

Twelve rounds remain `HOLD`. They are preserved in source and recorded in the
ledger with reasons. They are not playable.

## Independent gates

| Gate | Exact evidence | Required independent owner | Maker state |
|---|---|---|---|
| Product/content quality | coherent current-experiment boundaries; representative transfer test still required | Product + Learning judge | READY TO JUDGE |
| Accuracy, safety and trust | claim ledger, official sources, runtime parity and bad-ledger fail-closed test | Editorial/Accuracy + Safety judge | READY TO JUDGE |
| Positive LAiDIES brand | current screenshots and copy; no new visual approval inferred | Brand judge | READY TO JUDGE |
| UX/accessibility | new/returning, keyboard/focus, reduced motion, width/zoom approximation, storage and evidence failures | UX + Accessibility judge | READY TO JUDGE |
| Frontend/data integrity | contract, inline-JS, links, town and browser tests | Platform judge | READY TO JUDGE |
| Release truth | no deploy/public verification; hide or label remains | Release judge | NOT A RELEASE CANDIDATE |

No score is self-awarded. Quality, accuracy/trust and brand remain
non-compensable and require 17/20 to advance.

## Commands and maker results

```text
node scripts/test-dream-phone-contract.mjs
DREAM PHONE CONTRACT PASS
admitted_rounds=sky-dancers
held_rounds=12

PLAYWRIGHT_CORE_PATH=/tmp/laidies-high-pw.8bUJ9V/node_modules/playwright-core \
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
node scripts/test-dream-phone-browser.mjs
DREAM PHONE BROWSER PASS
journeys=new,returning,keyboard-focus,reduced-motion,zoom-mobile-desktop,storage-failure,bad-evidence

node scripts/check-inline-js.js
✓ INLINE JS: 353 scripts parse across 132 live pages.

node scripts/check-local-links.js
✓ LOCAL LINKS: 1940 local references resolve across 110 pages.

node scripts/check-town.js
✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
products=65
active=3/3
```

## Known limitations and holds

- Owner product-model choice is unresolved.
- Current experiment remains not launch-approved.
- Twelve deck rounds remain held; Mortal Kombat requires fresh independent
  clause-level admission after the corrected chronology.
- Browser evidence is local headless Google Chrome, not public/candidate
  verification or full browser/assistive-technology coverage.
- The 200% check is a 200%-text/640px approximation, not a complete WCAG audit.
- Screenshots were inspected, but visual/brand approval is independent. The
  existing desktop composition has a large gap between orientation and the
  sticky instrument; this packet does not redesign it.
- No representative unfamiliar-player transfer test exists.
- No analytics/VOC evidence was pulled.
- No account/cross-device reward, history or mastery system is proved.

## Next action

Independent judges review this exact local candidate. Regardless of that
bounded verdict, Ali still decides the major Dream Phone model before any
flagship promotion or larger build.
