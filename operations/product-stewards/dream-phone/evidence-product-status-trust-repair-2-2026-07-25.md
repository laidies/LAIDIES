# Dream Phone bounded repair 2 — evidence for independent re-judge

**Status:** BUILT LOCALLY — READY FOR INDEPENDENT RE-JUDGMENT  
**Launch status:** PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL  
**Release authority:** NONE  
**External mutation:** NONE

## Repair outcome

This packet addresses only the findings in
`independent-review-product-status-trust-repair-2026-07-25.md`. It does not
select Dream Phone's major product model, approve a redesign, deploy, publish,
change rewards or claim public verification.

### Accuracy and evidence control

- Returned `mortal-kombat` to `HOLD`.
- Corrected all retained runtime and ledger chronology: ESRB Part 8 says the
  industry formed a trade association four months after the first December
  1993 hearing and officially formed ESRB five months after that.
- Bumped the beta deck to `2026-07-25-r2`.
- Split the admitted Sky Dancers record into the two exact clauses adjudicated
  by its reveal.
- Bound each admitted runtime claim and reveal row to the exact ledger claim
  ID, claim text and official source URL.
- The whole deck now fails closed for a missing/malformed ledger, stale policy
  or admitted round, correction-required state, changed URL, changed claim
  text, duplicate ID, unknown admitted ID or no admitted round.
- Playable result: one admitted round (`sky-dancers`); twelve rounds held.

Official records:

- CPSC Sky Dancers recall:
  https://www.cpsc.gov/Recalls/2000/cpsc-galoob-toys-inc-announce-recall-of-sky-dancers-flying-dolls
- ESRB Part 8:
  https://www.esrb.org/about/part-8-twenty-five-years-later/
- ESRB timeline: https://www.esrb.org/history/

### Product/status truth

- The site index now marks the claim deck `preview` and describes it as an
  experimental scripted beta deck, not an AI hallucination detector.
- Homepage card, map and directory now preserve scripted/experimental,
  no-personalized-advice, session-only and no-saved-reward boundaries.
- The unresolved owner choice remains unchanged.

### Learning and accessibility

- Each result explains each claim clause, links its source and names the
  evidence limitation.
- Continuing requires the player to identify the clause that needed checking,
  select the strongest kind of evidence and state what would change her read.
  This reflection is explicitly unsaved and unscored.
- The final score says it is the authored beta-deck result, not mastery.
- Enter, Back, verdict and final transitions have deliberate focus targets.
- The result is an atomic polite live region and receives focus after verdict.
- The next-round path focuses the new claim; the one-round admitted deck
  exercises the Next-to-final transition in the rendered test.

## Exact local verification

```text
node scripts/test-dream-phone-contract.mjs
DREAM PHONE CONTRACT PASS
admitted_rounds=sky-dancers
held_rounds=12
status=PUBLIC EXPERIMENT PRESENT, NOT LAUNCH-APPROVED / HIDE OR LABEL

PLAYWRIGHT_CORE_PATH=/tmp/laidies-high-pw.8bUJ9V/node_modules/playwright-core \
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
node scripts/test-dream-phone-browser.mjs
DREAM PHONE BROWSER PASS
journeys=new,returning,keyboard-focus,result-announcement,transfer-reflection,reduced-motion,zoom-mobile-desktop,storage-failure,adversarial-evidence

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

git diff --check -- [Dream Phone scoped files]
PASS
```

Whole-worktree `git diff --check` remains blocked only by the unrelated,
pre-existing trailing whitespace at `docs/growth/ali-idea-backlog.md:223`.
No absent `scripts/check-index.js` result is claimed; that script does not
exist in this worktree.

## Evidence artifacts

Rendered screenshots are in `evidence-2026-07-25/`. The browser suite is local
headless Google Chrome evidence, not full assistive-technology, cross-browser
or public verification.

## Re-judge boundary

The independent judge should re-evaluate the same non-compensable product,
accuracy/trust, positive-brand, UX/accessibility and integration gates against
this repair. Even a passing bounded re-judge does not resolve Ali's major
Dream Phone model choice or authorize launch promotion.
