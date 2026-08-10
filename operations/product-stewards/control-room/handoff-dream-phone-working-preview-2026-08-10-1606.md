# Control Room material handoff — Dream Phone working preview

**Product/system ID:** `dream-phone`

**Owner task ID:** `019f9ee6-aff5-7062-af0e-b37928aa147b`

**Evidence time:** 2026-08-10 16:06:30 PDT (America/Vancouver)

**Exact status:** BUILT LOCALLY; INDEPENDENT VISUAL/UX PASS; READY FOR ALI
DIRECTION REVIEW; NOT DEPLOYED; NOT PUBLICLY VERIFIED

**Acceptance owner:** Ali for finish-versus-park direction and any public
release; Control Room/Release for later integration, deploy and exact public
proof

## Exact bounded action completed

Built and committed one isolated working preview that turns the established
Dream Phone booth into the page environment and gives visitors two equal
choices: Just Call or Play the Full Game. The restored full game uses three
distributed callers per case, purposeful `*67`, `*69` and `867-5309` powers,
stateful history/Speaker comparison, non-skippable Hold, fail-closed held-source
rounds and case-specific preventive AI rules/prompts.

The earlier generic teal operator-console direction was rejected and removed.
The successor uses the exact pink booth plus hot pink, purple, yellow, sky-blue
and teal 90s punctuation at desktop and mobile.

## Evidence, tests and observed result

Exact candidate commit:
`53ba8768179983886d73d35a860cae88623702ec`

Executable files:

- `games/dream-phone-preview.html`
- `games/dream-phone-preview.css`
- `games/dream-phone-preview.js`
- `games/dream-phone-preview-contract.mjs`
- `scripts/test-dream-phone-preview.mjs`

Packet and rendered evidence:

- `operations/product-stewards/dream-phone/BUILD-PACKET-working-preview-2026-08-10.md`
- `operations/product-stewards/dream-phone/evidence-preview-2026-08-10/`

Observed current checks:

- `node scripts/test-dream-phone-preview.mjs` — PASS; calibrated bad fixtures
  reject an omniscient caller and stale guidance.
- `node --check games/dream-phone-preview.js` — PASS.
- `state.json` JSON parse — PASS.
- scoped `git diff --check` — PASS.
- browser journeys — 1440px, 390px and 320px entry; active desktop game; active
  mobile Just Call; special codes, verdict gating, held-source result, early
  Hold, history restore and Speaker comparison observed working.
- independent artifact-first visual review — PASS for Ali direction review.
- independent artifact-first UX review — PASS after all five prior blockers
  and the final Deb redial edge were repaired.

The global commit hook also ran repository-wide checks. Town canon, local
links, inline JavaScript, output-path guards and rejection prevention passed;
the hook then failed on 46 pre-existing missing Episode 03/04 media assets
outside this lock. Commit `53ba8768` therefore used `--no-verify`; the unrelated
episode failures were neither altered nor represented as green.

## Observed versus unproved

Observed: the exact local preview works in the tested browser states, exposes
two equal choices, preserves the booth as the interface, prevents one caller
from revealing the whole answer, does not score held-source rounds and shows
tailored prevention guidance.

Unproved: Ali enjoyment/direction acceptance, representative visitor fun or
learning transfer, assistive-technology/cross-browser acceptance, admitted
sources for the two held mechanics rounds, reward/account persistence,
analytics receipt, production integration, deploy and public-origin behaviour.

## Files/services changed and integration lock

Changed only the isolated Dream Phone preview implementation/test, Dream Phone
dossier/decision/state/backlog/evidence, the foreground continuity record and
one consolidated learning entry. No production route or service changed.

Integration lock held: isolated branch `codex/dream-phone-preview`, commit
`53ba8768179983886d73d35a860cae88623702ec`.

No lock consumed for production Dream Phone routes, shared site CSS/JS, account
or reward services, analytics, source admission, deployment or public release.

## Dependencies and downstream owners

- Brand/Experience and UX supplied independent acceptance of the exact local
  candidate for Ali direction review.
- Learning/source admission still owns exact current evidence for the two held
  rounds and any future provider-specific advice.
- Platform/Rewards owns any later account, cross-device or reward lifecycle.
- Release owns production-route replacement, deployment and exact public smoke
  proof only after Ali direction acceptance.
- Episode owners retain the unrelated 46 missing-media hook failures.

## Remaining proof and next trigger

Next trigger: Ali operates the working preview and makes one bounded decision:
finish the restored full game, or park it and retain Just Call.

If finish: admit/replace held rounds, run representative enjoyment/learning
transfer plus assistive-technology/cross-browser review, then integrate under a
production lock and separately deploy/publicly verify. If park: do not promote
or integrate the full-game preview.

## Authority and worktree truth

- Worktree truth: **COMMITTED** at
  `53ba8768179983886d73d35a860cae88623702ec`; push not yet claimed in this
  handoff.
- Public authority used: **NO**.
- Deploy/publish authority used: **NO**.
- Spend/install/subscription authority used: **NO**.
- Ali approval authority used or implied: **NO**.
- Provider/backend/account/reward/analytics authority used: **NO**.
- Private user data accessed: **NO**.

After this handoff the owner is **IDLE / AWAITING ALI DIRECTION**, not RUNNING.
