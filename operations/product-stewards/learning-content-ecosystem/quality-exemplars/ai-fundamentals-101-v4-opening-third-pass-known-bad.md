# Known-bad calibration: AI Fundamentals V4 opening third pass

**Authority:** independent Claude Sonnet 5 red-team HOLD, 2026-08-08
**Exact rejected prose SHA-256:** `dda7711d098692b88e7ed96071ea0e0d64775380a27ac12d0ccb8915793f1932`
**Use:** calibration only; never restore as candidate prose

## Missed defects

### Loose output term collapses a taught distinction

After teaching `recommend` as one specific behaviour, the prose used
`recommendation` as a generic stand-in for any machine output.

> A machine can produce a recommendation. A company still decides to use it,

### Suggested action and executed action blur

The worked example said a travel assistant could use tools to continue through
steps. The recap silently widened that to continuing through actions, without
naming the permission that would make an action possible.

> The travel assistant searches, compares and may continue through actions.

### Foundation does not contain its own diagnostic

The shortest system answer named predictions, content, recommendations and
decisions but did not give recognition or ranking a coherent place before both
appeared in the diagnostic.

### Scepticism dominates enthusiasm

The opening added genuine wonder but left it as one passage inside a dominant
register of mocking meetings and corporate language. Funny scepticism still
stood in for the required passionate excitement about understanding AI.

### Consequential harm flattened into a checklist

Poor representation in data appeared as one item among several without
signalling that errors affecting people can carry much higher stakes than a
weak recommendation or stale answer.

## Prevention

- A diagnostic term keeps one precise meaning throughout the section.
- Tool use, permission, suggested action and executed action stay distinct.
- The foundation explicitly locates every behaviour used in its diagnostic.
- Voice review measures the dominant emotional register, not the presence of
  one enthusiastic passage or several jokes.
- High-stakes human consequences receive visible weight and a concrete reason
  to slow down; they are not buried in a flat list.
