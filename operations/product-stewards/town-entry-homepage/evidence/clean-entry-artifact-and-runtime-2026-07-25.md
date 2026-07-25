# Clean-entry candidate and runtime evidence — 2026-07-25

**Status:** REPORT READY — bounded exact-artifact/static transport evidence only. This is not a release, deployment, public verification, or a claim that the full browser journey passed.

## Trigger and boundary

Executed the `build-packet-clean-entry-journey-2026-07-25.md` test-first packet. Site source was read-only. The working tree is materially dirty, so it cannot truthfully bind a release candidate. No source, deployment, form, account, analytics, service, or git mutation was made.

## Exact candidate

- Candidate: `operations/launch/eod-2026-07-25/local-public-artifact/`
- Candidate report: `build-report.json`, generated `2026-07-25T20:02:13.134Z`; 1,097 files; no reported missing/oversized files.
- Candidate identity: SHA-256 of the sorted, 1,098-line file-hash manifest = `f304735e284015569fa5388e9cf52959af2bfaff48b4cac726948187cc56989a`.
- Focus-file SHA-256: `index.html` `72bf54e5e6d0db80dc9be892f5b11911d5503f4508ea3501e81136a2e30adaf1`; `visitors-centre.html` `633b02d9f8f09d63677c86817bd50294016c26fc34bc56f7e35cba77e6cb2052`; `content/site/sunnyvaile-directory.js` `354f2ecc3e4a2103ecc831ae6ef5ce2cfc021d463261e3fdb9dcd969fe6f50fd`.
- Evidence limit: the artifact itself reports `source: local working tree`; it is a dated immutable-on-disk snapshot for this test, not a commit/deployment binding.

## Tests and results

| Gate | Result | Evidence / limit |
|---|---|---|
| Candidate files and JavaScript syntax | PASS | `node --check` passed for `homepage.js`, `sunnyvaile-directory.js`, global-header/nav/tour/trailer/player/accent scripts. Homepage, Centre, Start Here, Library, hero and map assets exist. |
| Local HTTP transport | PASS | A local static server returned HTTP 200 for `/`, `/visitors-centre.html`, `/content/site/sunnyvaile-directory.js`, `/library.html`, and `/content/episode-index.json`. |
| Anonymous named route chain, static trace | PASS (static only) | Homepage has labelled Centre links (including “Start at the Visitors Centre”); Centre code consumes shared `SV_BUILDINGS`; selecting `library` sets `#vc-card-enter` to `/library.html`; the Library route returned 200. This proves intended wiring/arrival target, not rendered click behavior or Library completion. |
| Start Here ordinary fallback | PASS (static only) | `start-here.html` has meta/JS redirect plus visible `/visitors-centre.html` link. Browser redirect/fallback was not rendered. |
| 390×844 and desktop first-use comprehension | NOT TESTED | No browser surface was available (`agent.browsers.list()` returned no browsers); source/CSS cannot substitute for a rendered viewport or a clean-user answer. |
| Keyboard, focus return, Escape | FAIL (static finding); browser confirmation NOT TESTED | Centre selection/reveal implementation has no `keydown` listener, no `focus()` call, and `closeCard()` does not restore focus. The required Escape/return-focus contract is therefore absent in this candidate. Homepage map Escape code exists, but that does not cover Centre reveal. |
| Reduced motion | PARTIAL (static only) | Homepage and Centre contain `prefers-reduced-motion` rules. Actual computed motion/reduced-motion behavior was not rendered. |
| Episode-index failure recovery | FAIL (static finding); runtime injection NOT TESTED | `homepage.js` catches fetch failure and leaves static Ep 04 / “This week” markup. A failed or stale index therefore retains a current-labelled cue rather than a visibly evergreen/previously-labelled fallback, contrary to the entry spec. It also does not check `response.ok` before JSON parsing. |

## Truth and admission notes

- Arrival at `/library.html` is the sole bounded entry success recorded here. It is explicitly **not** book reading, answer quality, account, newsletter, media, reward, or downstream completion (BTB-069).
- Public-promise registry row 17 still classifies clean first/returning/mobile/keyboard/public-entry journeys as **NOT TESTED** and reopening as **HOLD**. This evidence does not change that registry.
- The homepage’s `New in town?` hero action routes to `#method`, not directly to the Visitor’s Centre. A deep labelled Centre link exists, but the first-primary hierarchy remains an owner decision and needs real comprehension testing.

## Required next action

Create a small owner-scoped repair packet for Centre Escape/focus return, named fallback under shared-directory failure, and homepage current-data failure labeling. Then repeat the full clean anonymous desktop + 390×844 browser suite against a newly bound exact artifact.

## Learning scan

No new qualifying painpoint was appended: the observed controls restate already-specified open gates (VC-03 and the Town Entry clean-entry packet) and apply BTB-069's existing arrival-versus-completion rule. The prevention rule reinforced by this evidence is: do not count source presence, HTTP 200, or a route handoff as a rendered accessible journey or downstream completion.
