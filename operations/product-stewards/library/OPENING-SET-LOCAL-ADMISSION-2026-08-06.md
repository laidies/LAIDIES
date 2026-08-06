# Library opening set — local admission

**Evidence time:** 2026-08-06 15:40 PDT
**Status:** ADMITTED LOCALLY / NOT DEPLOYED / NOT PUBLICLY VERIFIED
**Acceptance owner:** independent instructional and unfamiliar-reader judges for content; Ali retains visual and public-release authority.

## Visible visitor outcome

The four opening covers now follow the required two-step journey: choose a cover
to see a specific preview, then choose **Open this book** to read the full book.
Back returns to the same shelf. Exact-section Miss Jeeves links open the matching
section inside Concepts 101.

| Book | Content job | Exact rendered SHA-256 |
|---|---|---|
| Concepts 101 | One connected model of the request-to-check system, taught through one recurring client-handover case, six connected sections and a 17-term quick reference. | `74f08314fb98672ce5f247eaf7db16fb6beeffa3f08f0572ed562818d92b602c` |
| Briefing 101 | A five-part procedure for turning a vague request into a usable brief and checking the result. | `4a22f431b60902d249827395c69bb11fa3aaf18a4352d18cb1c4765c0c7904d9` |
| Setup 101 | A sorting method for standing instructions, optional memory, a project/workspace or nowhere. | `44a287ff32d3e041870bd477da99e0edda55a36d04b7a1725656552e89db348b` |
| Accounts 101 | A five-check pre-paste decision rule, including one complete worked decision through stop, ask and approved-minimized routes. | `9b2bf286ea8dbb560ba3154aee41ab12848a913fd4b8708eba1dc4c35e4bd1d6` |

## Bound evidence

- Intake: `operations/product-stewards/library/LEARNING-CONTENT-INTAKE-OPENING-SET-2026-08-06.md`
- Instructional verdict: `operations/product-stewards/library/evidence-opening-set-content-2026-08-06/independent-instructional-verdict.md`
- Unfamiliar-reader verdict: `operations/product-stewards/library/evidence-opening-set-content-2026-08-06/independent-unfamiliar-reader-verdict.md`
- Admission manifest: `content/library-books/admission-manifest.json`
- Compiled Library candidate: `library.html` (`d3cba43da22423782eaf5838021d652eff5fd83678a53e6932be6bbc607fee28`)

## Verification

```text
LIBRARY ADMISSION COMPILE PASS manifest=present admitted=4 accepted_corrections=0
LIBRAiRY CONTRACT PASS · books=15 · hold=4 · preview=7 · available=4 · admitted=4 · Puffy write/read truth
LIBRAiRY CONTRACT CALIBRATION PASS
LIBRARY OPENING BOOKS PASS · preview_to_open=4 · full_reader=concepts-101,briefing-101,setup-101,accounts-101
MISS JEEVES WORKER PASS ... arbitrary_retrieval=1 ... controlled_gap_topic=1
```

Each content checker also passed its known-bad calibration before passing the
exact artifact. The old rejected Concepts 101 hash, an unauthorized manifest
row, a missing learning-admission record and a failed criterion remain rejected.

## Boundary and next trigger

This record admits the four exact full-book artifacts into the local Library
candidate only. It does not approve the still-open Library visual candidate,
authorize deployment, prove public bytes, spend money or exercise Ali's final
authority. The next content action is correction monitoring and freshness review
at the dates bound in the manifest. The next release action belongs to the
Library page/release lane after the page itself has Ali's visual approval.
