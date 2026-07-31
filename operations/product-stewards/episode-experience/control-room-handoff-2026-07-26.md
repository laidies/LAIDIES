# Weekly Episodes owner transition — Control Room handoff

**Date:** 2026-07-26  
**Sender:** Weekly Episodes — Engine & Production Director  
**Recipient:** Control Room  
**Status:** REPORT READY — REGISTRY/RUN-QUEUE CHANGE RESERVED TO CONTROL ROOM
**Owner task:** `019f9f7c-f03a-7ec1-a776-d60b57210322`

**Transition result:** VERIFIED — Control Room now registers
`episode-experience` with `parent_id: null`, the named champion and owner task.

## Material handoff — backstage episode-release v2

- **Product/system:** `episode-experience` / Weekly Episodes — Engine &
  Production
- **Exact status:** BUILT LOCALLY — PLATFORM INDEPENDENT REVIEW PENDING
- **Bounded action completed:** created and sealed the v2 chain-of-custody
  contract that future episode packages use to bind script, audio, captions,
  images, video, approvals, admission, proof and rollback.
- **Evidence time:** 2026-07-26 11:02:23 PDT
  (`2026-07-26T18:02:23Z`)
- **Candidate:** `EPX-CF13-SCHEMA-2026-07-26-v2`
- **Candidate payload SHA-256:**
  `f62c3cf67363096ea161ad91dd529eb4087e86c46ef19573843552941cbae5f1`
- **Candidate file SHA-256:**
  `b1813da7654277b8fa3dd8e8106c10ec63d16f45fdd0485af81d6744a5470fad`
- **Evidence:** `release-manifest-schema-candidate-v2-2026-07-26.json`;
  `EPISODE-RELEASE-MANIFEST-SPEC.md`;
  `schema/episode-release-envelope-v2.0.0.schema.json`;
  `fixtures/release-manifest-v2/`;
  `test-release-manifest-contract-v2.mjs`
- **Observed test:**
  `RELEASE MANIFEST V2 CONTRACT PASS valid=11 invalid=22 schema=draft2020 mutation_controls=5`
- **Observed versus unproved:** maker validation and the 40 candidate-bound
  file checks are observed; Platform and Chick Flicks acceptance, shared
  implementation and public behavior remain unproved.
- **Files/services changed:** dossier-local contract, schema, fixtures, test,
  generator, sealer, candidate receipt, state/backlog/build packet and this
  handoff. No registry, run queue, episode, media, route, player, site,
  service, deployment or public file changed.
- **Lock/dependencies:** joint shared/live lock remains held. V1 is stale and
  review-closed. Platform reviews only exact v2; Chick Flicks is not invoked
  without exact-v2 Platform PASS.
- **Acceptance owner:** Platform is the next independent technical gate;
  Chick Flicks is final admission owner after Platform PASS.
- **Next trigger:** Platform PASS/HOLD for candidate v2. After this bounded
  contract lane closes, the next visible product responsibility is an exact
  Episodes 1–4 plus trailer repair/production status lane with Episode Media
  Quality; Episode 5 Gate 1 remains separate.
- **Authority truth:** no public, deploy, spending or Ali-approval authority
  was used.

This is backstage episode-release plumbing. It is not Episode 5 writing,
Episodes 1–4/trailer repair, site work or deployment.

## Material handoff — visible Episodes 1–4 + trailer production

- **Exact status:** RUNNING — EPISODE 02 CUE-13 MAKER ACTIVE; JUDGE WAITS FOR
  CHECKSUMS
- **Bounded action completed:** inspected the real strongest local candidates,
  current narration, VTT and cue bytes plus existing source/rejection/judge
  evidence; produced one exact five-title status-to-production board.
- **Evidence time:** 2026-07-26 11:08:24 PDT
  (`2026-07-26T18:08:24Z`)
- **Board:** `episodes-01-04-trailer-production-board-2026-07-26.md`
- **Board SHA-256:**
  `99a1bb4134a592c2ebe4c19e62125434fff30f9ea169cd98f5923ae6da9f3ce8`
- **Observed result:** all five motion candidates remain HOLD. Episode 01 v23
  is the strongest repaired local output but lacks a full independent watch.
  Episode 02 has no repaired master because cue 13 has no non-rejected
  admitted café-transition source. Episode 03/04 need full occurrence/reference
  judgments. Trailer needs a 58-beat map and caption-clock reconciliation.
- **First visible maker task:** `WE-MEDIA-E02-C13-2026-07-26`, owned by the
  Weekly Episodes Image Production Director. Deliver one to three text-free
  1920×1080 regular→new café comparison candidates, contact sheet and checksum
  manifest at the board's exact path.
- **Independent judge task:** `EMQ-E02-C13-ADMISSION-2026-07-26`, owned by
  Episode Media Quality. Return checksum-bound accept/reject per candidate
  before any animation or assembly.
- **Files/services changed:** Episode Engine board/state/backlog/handoff only.
  No episode art/media, Episode Media Quality dossier, site, service,
  deployment or public state changed.
- **Locks/dependencies:** Control Room must bind non-colliding maker and judge
  execution; maker cannot judge. The source-image gate precedes the Video
  Editor. Episode 5 remains separately paused at Gate 1.
- **Remaining proof:** exact source candidates, independent image admission,
  then a clock-preserving Episode 02 review cut and complete audiovisual
  judgment.
- **Next trigger/action:** Control Room dispatches the two exact tasks above
  and returns their owner task IDs. The Weekly Engine consumes only a
  checksum-bound Image Quality Judge PASS.
- **Authority truth:** no public, deploy, spending or Ali-approval authority
  was used.

Separately, Platform passed exact release-contract v2
`EPX-CF13-SCHEMA-2026-07-26-v2`, but Chick Flicks independently rejected it
for five additional cross-record identity/format-admission false accepts.
Exact receipt:
`../chick-flicks/independent-acceptance-episode-release-schema-v2-2026-07-26.md`.
No v3 expansion begins now; reopen only if a real episode release makes the
contract blocking. That backstage contract is not episode production.

## Requested portfolio transition

Control Room may now reconcile the `episode-experience` registry row to:

- **name:** `Weekly Episodes — Engine & Production`
- **parent_id:** `null`
- **champion:** `weekly-episodes-engine-production-director`
- **owner_task_id:** `019f9f7c-f03a-7ec1-a776-d60b57210322`
- **dossier:** `episode-experience/CHARTER.md`
- **state:** `episode-experience/state.json`
- **operating spec:** `episode-experience/OPERATING-SPEC.md`
- **next trigger:** Episode 5 Gate 1 rebuild from the durable operating packet

This owner has not edited `registry.json` or `run-queue.json`.

## Why the parent changes

The Weekly Episodes owner controls editorial opportunity, season continuity,
canon, scripts, production orchestration, release evidence, correction and
measurement across the entire portfolio. Chick Flicks is an important
discovery/archive destination but cannot be its parent without implying that
the store authors the show.

## Independent non-colliding handoffs

| Product owner | Relationship | Shared integration boundary |
|---|---|---|
| Chick Flicks | Receives one immutable release transaction; returns checksum-bound accept/reject, format-specific availability and exact discovery/archive/watch/return evidence | No edit to episode premise/canon or Episode Media Quality verdict |
| Episode Media Quality | Receives approved canon, final narration clock, cue/reference manifest and candidates; returns independent admission/acceptance verdicts | No editorial invention; Director cannot waive rejection |
| Screening Room | Receives admitted playback assets/captions/fallbacks; returns player/accessibility/public-byte evidence | No media craft or editorial approval |
| Library / Classes / NewsStand / KSVL / other owners | Receive structured impact proposals; return select/update/link/defer/decline decisions | No automatic duplicate and no shared-file edit without owner lock |
| Platform / Release | Receives checksum-bound release candidate and rollback packet | Controls shared build/deploy/public-proof integration |

The complete transaction and return-record contract is
`EPISODE-RELEASE-MANIFEST-SPEC.md`, reconciled with
`../chick-flicks/ownership-handoff-weekly-episode-engine-2026-07-26.md`.

### Rejected v1 evidence

- **Candidate:** `EPX-CF13-SCHEMA-2026-07-26-v1`
- **Candidate receipt:**
  `release-manifest-schema-candidate-2026-07-26.json`
- **Candidate payload SHA-256:**
  `42041b48f2d6912984874762ef6efd6313f7c172fb33b4f1822b1be57b213bb7`
- **Contract:** `EPISODE-RELEASE-MANIFEST-SPEC.md` schema `1.1.0`
- **Schema:** `schema/episode-release-envelope.schema.json`
- **Fixtures:** `fixtures/release-manifest-v1.1/`
- **Test:** `test-release-manifest-contract.mjs`
- **Maker result:** `RELEASE MANIFEST CONTRACT PASS valid=7 invalid=4`
- **Status:** STALE — REJECTED BY PLATFORM AND CHICK FLICKS; REVIEW CLOSED.
- **Live/shared integration:** BLOCKED; joint Control Room lock remains held.

## Live execution truth

For the current bounded v2 handoff:

- **Control Room label:** `RUNNING — BOUNDED V2 RELEASE-CONTRACT HANDOFF`
- **task:** `019f9f7c-f03a-7ec1-a776-d60b57210322`
- **write scope:** the six files in
  `operations/product-stewards/episode-experience/` named in `state.json`
- **current action:** route exact sealed v2 to Platform and await its independent
  PASS/HOLD
- **evidence date:** 2026-07-26

After this initialization turn, Control Room should not leave the task marked
`RUNNING` solely because the dossier exists. Bind any continued `RUNNING`
claim to the task's actual current turn/heartbeat and write scope; otherwise
use `NEXT`, `BLOCKED` or `STALE` as applicable.

## Episode 5 handoff

Current truth:

- **The Super Models** title and Episode 5/6 boundary are locked.
- D-019 technically constrains the receipt; it does not replace the full
  fashion-system premise.
- Gate 1 was rejected and no current engine stage is complete.
- Exact resume: concept-fidelity matrix → replacement substance/story
  architecture → four vetoes → one Ali Gate 1 decision.
- Canon, script, art, audio, animation, fan-out, deploy and publish remain
  blocked.

Authority packet:
`episode-05-operating-packet-2026-07-26.md`.

## Control Room verification

After its registry/run-queue change:

1. run `node scripts/check-product-stewards.mjs --owner-entry episode-experience`;
2. confirm the registry resolves the dossier and state above;
3. confirm `parent_id: null`;
4. ensure Chick Flicks and Episode Media Quality remain independent
   dependencies/handoffs rather than sources of editorial authority;
5. bind or clear the live execution record according to the real task state;
6. preserve AW-003 as the one portfolio foreground objective and AW-001 as the
   Episode 5 checkpoint; and
7. dispatch no production craft before the Episode 5 Gate 1 packet passes.

## Evidence produced

- `CHARTER.md`
- `OPERATING-SPEC.md`
- `state.json`
- `backlog.md`
- `EPISODE-RELEASE-MANIFEST-SPEC.md`
- `schema/episode-release-envelope.schema.json`
- `fixtures/release-manifest-v1.1/`
- `test-release-manifest-contract.mjs`
- `build-packet-release-manifest-schema-fixtures-2026-07-26.md`
- `release-manifest-schema-candidate-2026-07-26.json`
- `episode-05-operating-packet-2026-07-26.md`
- this handoff

No canon, registry, run queue, media, site, deployment or public state was
changed by this owner.
