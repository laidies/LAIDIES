# Visual candidate admission protocol

**Status:** ACTIVE HARD GATE

The purpose of this protocol is to make the visual rules enforceable rather
than optional memory.

## State machine

`maker → _rough → independent review → _admitted or _rejected → Ali`

- Makers save generated candidates only under `_rough/`.
- Makers cannot score, rank, recommend, admit or present their own output.
- Reviewers inspect the actual full-resolution artifact, not the prompt or
  concept description.
- Only `_admitted/` artifacts with a passing `ADMISSION.json` may be presented
  as owner-review choices, recommendations or finalists.
- `_rough/` and `_rejected/` work may be retained as internal evidence but
  cannot be offered to Ali as a choice.

## Required independent inspection

The reviewer records:

- maker and reviewer identities;
- governing experience brief and approved visual references;
- the one competition variable allowed to change;
- invariants that were held;
- every visible word, logo, symbol, icon, cover, character, object and control;
- whether real LAiDIES assets/components replace generated substitutes;
- same-viewport reference/candidate comparison evidence;
- product legibility, LAiDIES brand, UX/accessibility and feasibility scores;
- exact rejection reasons or admission evidence; and
- whether the candidate is ready for owner review.

The reviewer must not be the maker. A score cannot compensate for an invented
logo, mystery control, wrong character, fake product asset or wrong visual
genre.

## Mechanical check

Run:

```sh
node scripts/check-visual-admission.mjs path/to/ADMISSION.json
```

The product-steward system checker also validates every discovered
`ADMISSION.json`. An admitted manifest fails when maker and reviewer match,
required references/comparison evidence are missing, a visible audit is false,
quality floors are below 17/20, or its artifact is not under `_admitted/`.

This checker does not decide taste. It prevents work that has not received the
required independent evidence from being labelled ready for Ali.
