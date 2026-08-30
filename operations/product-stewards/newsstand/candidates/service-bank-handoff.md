# Service bank — 30 August 2026

Status: BUILT LOCALLY; scoped checks below passed. Not admitted or deployed.

## Content

22 complete draft entries in `service-bank.json`, not canonical public records:
three Paige tips, three Corner Office scripts, three Fundamentals concepts,
three Dear Miss Jeeves letters, three exact Mme readings, five site facts,
one dated Big Picture announcement and one crossword entry. This supplies eight
initial selections plus fourteen reserves, unevenly distributed: there is no
reserve crossword or second verified current announcement.

The first Corner Office is credit-taking, with specific meeting/private-followup
scripts. Dorie Clark supplies the professional-visibility perspective; Amy Gallo
supplies directly relevant credit-taking guidance. We do not attribute our
original scripts to either author. Concepts link to actual Fundamentals headings.
Existing Big Picture, Front PAiGE, news stories, public columns and issue data
were not edited.

## Checks actually performed

- Producer-contract integrity checker: pass; this is not prose admission.
- Independent advisory content/source read-through: corrected evergreen news
  classification and imprecise book links. Final bank SHA-256
  `51bf80198b67fac2cdbca98ee6068ddfe67c72affb509ce234b200c521ac4436`.
- Private preparer tests: deterministic selection, used-item avoidance, denied
  candidate readiness, expired/repeated/impossible dates, content/source hashes,
  dated What's New retirement and no canonical writes all pass.
- August 30 inventory: required 8, proposed 8, ready 0, candidates 8, gaps 0.
  September 7: proposed 7 and one retired-announcement gap. No invented news.
- Reader unit test: full paragraphs, question before answer, exact Mme reading,
  source-link deduplication, escaping and candidate/expired/orphan rejection pass.
- Existing Daily composer, promoter and workflow tests pass. Their intentionally
  invalid scheduled-trigger/promotion fixtures fail as expected.
- Existing canonical column check: 20 records, 4 public records across history;
  the draft bank did not alter those totals.
- Private loopback browser fixture: all eight cards rendered. Dear Miss Jeeves
  and Corner Office opened full text with one click; Return restored card focus.
  Direct `?column=` advice link worked. At 390 and 320 CSS pixels there was no
  document overflow; narrow reader used 17px body and 28px title. Desktop rendered
  hierarchy inspected. Browser emulation screenshots scaled inconsistently, so
  no claim of completed native-device visual QA is made.
- Crossword card opened the puzzle directly. X received aria-invalid/incorrect
  feedback; T received correct feedback; T survived refresh. Grid/answers/storage
  key preserved. Native assistive-technology review NOT performed.
- Public Fundamentals token link reached the exact visible section. Live Big
  Picture opened with Sign in/Join the town still offered, without a login prompt.
  Other candidate destination journeys still need per-item review before use.

## Outstanding publication requirements

Mandatory producer self-review and exact independent semantic admission are not
complete. No observed-human comprehension evidence was fabricated or supplied.
The current policy requires such evidence for the PRACTICE/EXPLANATION content
classes. All reviewEvidence fields remain null and all candidates ineligible.
The renderer alone does not fill the live paper. The bank must pass those reviews,
then use the existing dated-column, issue, projection and exact-release sequence.
No automation, provider, public dataset, Big Picture copy or release was changed.

## Release coordination

Resident lane's final verified handoff reports Pages
`cdac28a7-05aa-45e7-9574-0be93534f48d`, source `c3845c86`, as its successor.
Exact base: `/tmp/laidies-resident-portraits-successor.sUUusY`;
manifest: `/tmp/laidies-resident-portraits-successor.sUUusY.manifest.json`;
673 files / 640110978 bytes; identity
`cdf13233f16fdc3512fc6273dd861ba8a6c4655d898154733fb509fb1470edb6`.
Its NewsStand bytes were reported unchanged. Deployment hold lifted, but this
bank is not thereby admitted. Verify current provider head before any release;
overlay only owned admitted paths on that exact current base and preserve the
Resident, Library, Shop and Handbook changes. Do not build from this source tree
as a whole-site substitute for the combined artifact.

The broad commit hook previously failed on 45 unrelated missing Episode 3 comic
assets. Scoped checks were run rather than repairing unrelated files. Any local
commit bypass of that hook is not a release-gate pass.
