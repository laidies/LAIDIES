# Known-bad calibration: AI Fundamentals V4 opening second pass

**Authority:** independent Claude Sonnet 5 red-team HOLD, 2026-08-08
**Exact rejected prose SHA-256:** `6c014f771f554fd9d580cf6018466a10b1693b43314fb570a71ef1e9d5bde972`
**Use:** calibration only; never restore as candidate prose

## Missed defects

### Example-count mismatch

The prose announced four ordinary examples and supplied five. A count error in
the passage teaching careful distinctions damages trust in the distinction.

> Consider four ordinary examples:

### Diagnostic vocabulary drift

The streaming example first predicted a choice, then ranked options, while the
diagnostic separately offered predict, rank and recommend without explaining
their relationship. The closing then introduced drafts in place of generates.
The reader could not tell whether these were deliberate distinctions or loose
synonyms.

> A streaming service receives information about viewing and predicts what you
> might choose next.

> The recommender ranks options.

> Does it recognise, predict, rank, recommend, generate or act?

> You can ask whether the proposed system drafts, predicts, recommends or acts.

### Recap adds an unshown capability

The travel-assistant example showed search, comparison and tool use. Its recap
also said it generated content without having demonstrated that step.

> The travel assistant may generate content *and* continue through actions.

## Prevention

- Counted examples must match the actual list.
- Before drafting, map each diagnostic verb to an exact worked example.
- The recap and transfer use the same terms as the worked examples; a synonym
  requires an explicit relationship, not silent substitution.
- A recap cannot add a capability the example did not show.
