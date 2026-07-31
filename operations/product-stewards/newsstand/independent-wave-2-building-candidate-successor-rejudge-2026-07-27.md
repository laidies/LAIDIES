# Independent successor rejudge — NewsStand Wave 2 building candidate

**Verdict:** `ACCEPT — exact isolated Wave 2 successor candidate only`

**Status meaning:** the repaired local building candidate passes this bounded
product, trust, interaction, responsive and failure-state gate. This is not
production integration, final art admission, deployment or public proof.

**Review time:** 2026-07-27T03:25:31-0700 (America/Vancouver)

**Reviewer boundary:** judge-only. No candidate, production route, story data,
reader contract, shared asset or release state was edited.

## Exact accepted tuple

| Input | SHA-256 |
| --- | --- |
| maker successor handoff | `332abd038972a1071c2306611e14697db87b7b5cbc1591ecee222ecd2f8d6592` |
| `operations/design-explorations/building-wave-2/newsstand/index.html` | `e620b87a1d6ef1a6f403bb0247e6386e7aa444c43eab6bea5bc22364e9ccb04e` |
| `candidate.css` | `ad412fdf88439b75abebee48b0ef3931d5873b5cfef428758e12cb8a97a0ec3e` |
| `candidate.js` | `c3cafb700eb10832415c1f1f3cd99cd8731eb4d09fdb5241be522b4689c623a5` |
| static test | `1cd2c5d6efede36bfcab3036343afc970554d096a12dfb642609ba7f970cf367` |
| browser successor test | `7235d5bbcb01b99f81f662b3ed9d31564e67e42c7239dd7b1b06f6637ecff74f` |
| read-only NewsStand reader contract | `a0071c3c056563d721d374b7578c9915706b49ca7db419623f80035ae65f758a` |
| read-only story dataset | `699e59389259c94143f5eeb50e1f1d4beaa0e1235a947f52c3a561e12e4400f0` |
| Paige/rack candidate source art | `6f68b6d25bea566217551ccfbab496daa93bc6dceb90fc0af4ba9936ba85ebc5` |

## Independent execution

The candidate was served locally from the repository root. Both supplied
tests were rerun from the exact tuple:

- `NEWSSTAND WAVE 2 CANDIDATE PASS checks=20`
- `NEWSSTAND WAVE 2 SUCCESSOR BROWSER PASS checks=34 widths=1440,390,320
  keyboard=real fixtures=baseline,hold,malformed,retracted,missing,image-404,no-js,reduced-motion`

An additional independent Chromium matrix re-exercised baseline at 1440 and
390, quiet/hold at 390, stale/malformed at 320, keyboard paper opening and
focus return, eligible and empty archive searches, radio state, retracted /
malformed / unknown direct hashes, forced Paige-art 404 at 1440 and 390,
JavaScript-disabled 320 and reduced motion. No candidate-console or page errors
occurred, and none of the tested widths overflowed.

## Prior HOLD closure

### Global desk gate and visible paper labels — PASS

- Baseline remains exactly `quiet / quiet / hold / current`.
- Quiet becomes `quiet` on all four paper objects.
- Stale becomes `stale` on all four.
- Desk-wide hold now displays `desk hold` on all four while every paper opens
  the same editorial-hold notice.
- Malformed data now displays `desk unavailable` on all four while every paper
  and direct hash fails closed.

The board, rack labels and reader result no longer contradict one another.

### Direct-hash focus — PASS

Retracted, malformed and unknown direct hashes all move focus to
`#reader-title`. The retracted route shows `Retracted.` plus the preserved
withdrawal reason without exposing the body. Malformed and unknown routes show
bounded unavailable notices. Normal keyboard paper activation still focuses
the reader title; put-back restores the exact invoking Tribune paper.

### Paige/rack 404 fallback — PASS

Forcing the exact art request to return 404 at both 1440 and 390 activates the
visible fallback (`data-art-state="failed"`), hides the broken image and the
competing primary title layer, retains the dated board and paper system and
states plainly that the illustration did not load. Both fallback compositions
fit without horizontal overflow. This proves resilience only; it does not
admit the Paige/rack artwork.

### No-JS boundary — PASS

At 320 with JavaScript disabled, all four paper objects plus radio/search
controls remain disabled, paper labels read `Reader required`, no enabled dead
candidate controls remain, and the visible no-JS notice says that no paper can
be opened or presented as current until the record is evaluated. Keyboard Tab
skips the disabled controls and reaches the skip link. The layout contains.

## Complete bounded candidate result

- The environment remains the interface: Paige’s room, dated board, four
  physical live paper objects, in-place reader, archive crate and radio are a
  coherent NewsStand rather than a generic feed/dashboard.
- The exact mastheads are The Breaking, The Daily, The Weekly and The Tribune.
  Candidate functional UI contains no legacy `TODAY` or `WEDNESDAY` claim.
- Functional paper names, states, dates, headlines, sources, notices and
  controls are live DOM text, not generated-pixel text.
- The baseline exposes only the eligible Tribune story; quiet, hold, stale,
  malformed and retracted states suppress ineligible bodies. Archive search
  applies the same access gate and gives an honest no-result message.
- Real keyboard Space activation, focus entry/return, 48px controls, responsive
  1440/390/320 layouts, reduced-motion suppression and optional radio state
  passed the tested local paths.
- The interface invents no account, subscription, saved-story, reader-history
  or cross-device claim. Fixture dates prove deterministic candidate behavior,
  not current publication freshness.

## Remaining boundaries

This ACCEPT does not establish:

- Brand/final exact-use admission for the Paige/rack illustration or the final
  four-paper art language;
- representative human editorial quality for all future stories;
- canonical publication writer, correction/retraction backend, source-recheck
  operation, account/history, reward completion or analytics delivery;
- native Safari/VoiceOver, integration, release, cache or public-origin proof.

Those remain separately owned gates and cannot borrow this candidate PASS.

## Exact next action

Control Room may reconcile this exact candidate as `VERIFIED LOCALLY` for its
bounded Wave 2 building/product gate and send the unchanged tuple to the
remaining Brand exact-use/native/integration owners. Any byte change reopens
this independent review.

## Learning scan

`NO MATERIAL OPPORTUNITY` beyond the maker’s already-recorded image-error
timing prevention rule. The independent rerun reproduced the intended early
and late image-failure coverage; it did not expose a new reusable failure,
surprise or non-obvious repair.
