# Dream Phone claim evidence and correction ledger

**Status:** LOCAL REPAIR CANDIDATE — ONE ROUND ADMITTED; TWELVE HELD
**Checked:** 2026-07-25
**Deck version:** `2026-07-25-r2`

## Admission rule

A round is playable only when every clause adjudicated by its reveal:

1. maps to a claim in `games/data/dream-phone-claim-ledger.json`;
2. is marked `ADMITTED`;
3. is supported by a primary or official source that actually states the
   bounded claim;
4. has a checked date, next review date and correction status; and
5. matches the runtime wording and source link.

Missing, malformed, expired or unadmitted evidence fails closed. A discovery
source, secondary summary or precise-sounding number is not admission.

## Admitted claims

### Sky Dancers

The U.S. Consumer Product Safety Commission's recall record says the June 27,
2000 recall covered about 8.9 million units and that Galoob had received 170
reports of the dolls striking people, resulting in 150 reported injuries.

- Authority: U.S. Consumer Product Safety Commission
- Source:
  https://www.cpsc.gov/Recalls/2000/cpsc-galoob-toys-inc-announce-recall-of-sky-dancers-flying-dolls
- Checked: 2026-07-25
- Next review: 2027-01-25
- Correction state: no published correction found in the checked record
- Deliberate exclusion: the old “primetime TV exposé” clause is not supported
  by this source and has been removed from the admitted round.

## Corrected and held

### 1993 video-game hearings and ESRB formation — HOLD

The earlier candidate collapsed two elapsed-time intervals and is not admitted.
ESRB Part 8 says Sega and Nintendo were summoned to a first congressional
hearing in December 1993; the industry formed a trade association four months
after that hearing and officially formed the ESRB five months after that.
ESRB's official timeline independently records the 1994 founding.

- Authority: Entertainment Software Rating Board
- Sources:
  https://www.esrb.org/about/prologue-and-part-1-doom-to-the-power-of-ten/
  and
  https://www.esrb.org/about/part-8-twenty-five-years-later/
- Corroborating official timeline: https://www.esrb.org/history/
- Checked: 2026-07-25
- Status: `HOLD` pending fresh independent clause-level accuracy admission
- Correction state: `CORRECTION_REVIEW_REQUIRED`
- Correction date: 2026-07-25
- Superseded wording: “ESRB was officially formed five months after the first
  hearing” / “one month later”
- Corrected wording: trade association four months after the first hearing;
  ESRB officially formed five months after that
- Qualification: this is an official institutional history with eyewitness
  material, not an independent congressional transcript. The round therefore
  does not claim Mortal Kombat alone “caused” ESRB or that the system was
  created merely to “dodge” regulation.

## Held claims

The remaining twelve source rounds stay in source as `HOLD`, do not enter the
playable deck, and are not silently deleted. Their reasons are recorded in the
JSON ledger. Common defects are:

- a secondary source is used as sole authority;
- a compound reveal has only one link;
- medical, numerical or technical wording overstates the source;
- a memorable anecdote is treated as a typical rate; or
- the wording is unbounded (“tons,” “everyone,” “every fact”).

## Freshness and correction procedure

- Dream Phone champion reviews admitted sources by `reviewBy` and after any
  correction, source disappearance or credible challenge.
- A round changes to `HOLD` before investigation when its evidence becomes
  unavailable, malformed, contradictory or stale.
- Corrections record the old wording, corrected wording, evidence, date,
  affected deck version and whether a public correction is required.
- The playable page names its deck version, checked date and correction state;
  it does not claim a feedback path that is not actually wired.
- Deterministic contract tests enforce source/admission/runtime parity.
- Dates use strict UTC `YYYY-MM-DD` calendar semantics. Impossible dates do not
  normalize into another month; ledger/source check dates and correction dates
  cannot be future-dated; review deadlines must be valid and unexpired. Valid
  Gregorian leap days remain admissible regardless of browser timezone.
