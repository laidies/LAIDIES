# Known-bad calibration: AI Fundamentals V4 opening fourth pass

**Authority:** independent Claude Sonnet 5 red-team HOLD, 2026-08-08
**Exact rejected prose SHA-256:** `32c0868bc4ac4b669b606e37f02a4f007d4865183f452e02cdc92008541dce61`
**Use:** calibration only; never restore as candidate prose

## Missed defects

### Downstream action placed inside the task diagnostic

The foundation correctly separated system task, output and permitted downstream
action. The first question then put `act` beside recognise, predict, rank,
recommend and generate, while the third question separately asked what happens
after the output. This could make a reader believe permission and execution had
already been covered.

> Does it recognise, predict, rank, recommend, generate or act?

### Harm framed as wonder

A fraud system's double failure appeared directly beneath a statement that
some AI results are astonishing. The emotional frame contradicted the later
high-stakes scrutiny rule.

> Some results are not merely useful. They are astonishing.

> The moment a fraud alert blocks your actual purchase but waves through
> something that is very much not yours.

### Narrow analogy mapping outweighed by domain differences

The dot-com comparison mapped one narrow property: a fashionable technology
label does not describe a whole implementation. Ali rejected comparisons
between AI and the dot-com boom or collapse because the periods, technologies,
adoption paths, infrastructure, capital structures and consequences are
materially different. The direct `uses AI` versus `uses software` explanation
already did the teaching job without implying a historical equivalence.

## Prevention

- Keep system task, output, permission and downstream action in their correct
  questions throughout the practical framework.
- Do not place harmful failures inside an emotional frame of wonder.
- Do not compare AI, an AI bubble or a possible AI correction/collapse to the
  dot-com boom or collapse. Use direct mechanism and current evidence.
