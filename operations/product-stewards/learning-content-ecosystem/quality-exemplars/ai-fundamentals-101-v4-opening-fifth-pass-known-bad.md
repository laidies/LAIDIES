# Known-bad calibration: AI Fundamentals V4 opening fifth pass

**Authority:** independent Claude Sonnet 5 red-team HOLD, 2026-08-08
**Exact rejected prose SHA-256:** `3fb3ae27f882ece224e4a51f8c588f9a679c1c438a50c7a8caa4afebe612b18b`
**Use:** calibration only; never restore as candidate prose

## Missed defects

### Introductory diagnostic turned into an incomplete taxonomy

The definition named recognise, predict, rank and generate. The practical
question added recommend. The travel example searched, compared and sometimes
used tools. The list could not cover its own examples without growing into the
classification-first opening Ali had already rejected.

> Does it recognise, predict, rank, recommend or generate?

### Decision blurred output, action and governance

`Decision` appeared as a machine output while nearby prose also used `decides`
for the company's human governance choices. The reader was not told whether a
machine decision was a proposed result or an executed action.

> They produce outputs such as classifications, predictions, ranked lists,
> recommendations, new content or decisions.

### Route would reintroduce the action error

The opening correctly moved action under what happens after the output, but the
Chapter 1 route still listed `act` as a peer of recognise, predict, rank,
recommend and generate.

## Prevention

- The Introduction teaches a durable system question, not an exhaustive task
  taxonomy. Ask what result the system produces and use concrete answers.
- Do not call an output a decision unless the prose explicitly distinguishes a
  proposed decision, an authorised decision and an executed action.
- The chapter route and opening must keep action downstream of output and
  permission.
