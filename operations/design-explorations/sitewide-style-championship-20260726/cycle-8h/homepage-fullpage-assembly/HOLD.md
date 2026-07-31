# Cycle 8H — closed HOLD before independent review

**Evidence time:** 2026-07-27 13:47 PDT  
**Status:** HOLD / CLOSED / DO NOT REPAIR IN PLACE  
**Public or live change:** none

## Frozen tuple

- manifest SHA-256:
  `4216999f99f8ba942ee5c7f636868bf01cfb6733129b20e74823dc4874b8762c`
- diagnostics SHA-256:
  `213a9c4c1623fdfb71c7c14a5d993b049f1eb564576134a89117236559382c0e`
- desktop incumbent:
  `97e89e35b625e11ab63af754351d001b73d6c5ce88a567a112e607bf967a53bc`
- desktop candidate:
  `a0064dd94084df9b673a60d07746b0e7ffad58233dddc1b2a10d336bc3db5a0f`
- mobile incumbent:
  `effe68c4b65f980b36500b597a1c4d35c6f0bf4b71989771e79e49fb1f9a6082`
- mobile candidate:
  `fa969541df8a8f70c935fad96aafc06556429dc7b860dea2c158ff12d7295862`

## What passed

- exact 1440×900 and 390×844 capture surfaces;
- document and body width containment at both viewports;
- zero broken or hidden images after complete lazy-load capture;
- exact visitor-facing text, ID, href and control parity with the released
  baseline;
- all 18 governed image jobs present exactly once with no missing, extra or
  mismatched source;
- held Dream Phone, NewsStand and map art absent from the candidate;
- protected hero element pixel-identical at desktop and mobile.

## Binding failure

The candidate fails the brief's contrast hard gate on multiple unambiguous
solid-colour surfaces at both viewports. Examples include:

- off-white body text on coral at approximately `2.83–2.93:1`;
- off-white body text on lilac at approximately `3.64:1`;
- off-white body text on teal at approximately `4.02:1`;
- blue collection labels on the darker blue surface at approximately
  `3.37:1`.

Required thresholds are `4.5:1` for body text and `3:1` for qualifying large
text. The full reason-coded inventory is in `evidence/DIAGNOSTICS.json`.

Per the Cycle 8H stop rule, the frozen tuple does not proceed to Town Entry,
Brand or Ali. It must not be repaired in place, integrated, propagated,
deployed or published.

## Exact next action

Control Room may issue a new isolated successor that copies these frozen
sources and changes only candidate-local foreground/background colour tokens
needed to clear the recorded solid-surface failures. That successor must
recapture all four full pages, reprove every Cycle 8H invariant and then enter
fresh Town Entry and Brand judgment.
