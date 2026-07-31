# Learning scan — NS-13 / NS-16 private dry run

**Result:** qualifying reusable success recorded locally; canonical
`operations/painpoints-log.md` was intentionally not edited because this
background lane's authorized write scope is limited to the release-pipeline
folder and NewsStand pipeline scripts.

- **Observation:** a root-only duplicate-key check does not protect nested
  receipt or claim objects; escaped-equivalent property names must collide too.
- **Diagnosis:** native JSON parsing normalizes by discarding earlier duplicate
  keys, so semantic validation cannot recover the attempted input afterward.
- **Prevention rule:** scan the complete raw JSON grammar before parsing,
  decode property names using JSON semantics, and reject any duplicate before
  schema or receipt validation.
- **Public Behind the Build angle:** “Why one hidden duplicate can change the
  receipt your validator thinks it checked.”
