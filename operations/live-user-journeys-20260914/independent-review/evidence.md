# Independent semantic review evidence — Episode 04 field trip

Reviewed 2026-09-15 against the exact field-trip artifact before the producer
receipts, the current `try-on.html` implementation, and two phone captures.

## What matches the authored field trip

- The lede, exercise title and four steps in `try-on.html:1023-1033` match
  `field-trip-prose/practice-validation-root/content/episode04-field-trip-practice.md:5-19`.
- The visible MAiVENS action is exactly `/luminairy.html#mavens`; the next
  action is the specified Episode 04 quiz route. `field-trip-phone-action.png`
  shows the former action before the discovery card.
- The butterfly-clip rating is hidden for Issue 04. `field-trip-phone-save.png`
  shows the discovery card instead of a prompt-comparison rating.
- The note label, save label and successful-save wording match the artifact;
  the phone save evidence visibly says that the result is on this device.

## Blocking mismatch

`field-trip-phone-save.png` also shows **Share in Community** between **Save
discovery note** and the authored quiz next step. This button survives from the
generic Try-On form at `try-on.html:919` and remains configured for Issue 04 at
`try-on.html:1231`. The authored implementation boundary expressly says not to
add a social product. It conflicts with the bounded activity: one sentence to
one friend, saved locally, then the matching quiz.

The repair is small: hide the inherited community action for `issue=4`, leaving
the MAiVENS action, local save and Episode 04 quiz action intact.

## Scope review

The remaining final public diff is route and state repair: exact Episode 01–04
handoffs, validated requested-pack resolution, latest-episode fallback,
continuation accessibility, and removal of the obsolete `/this-week.html` 301.
The two removed Cloudflare beacon tags are confined to `blend-snap.html` and
`try-on.html`; no functional script or visitor content is removed with them.

The independent-review schema cannot produce a PASS for a micro-interface
repair without observed-human explain-back and unseen-transfer evidence. This
record therefore declares a semantic HOLD rather than fabricating a schema PASS.
