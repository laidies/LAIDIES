// LAiDIES content-correctness Review Gate
// Adversarial gate battery that BLOCKS on any FAIL — the thing a broken-link audit can't do.
// Run with:  Workflow({ scriptPath: ".../operations/workflows/review-content.mjs",
//                        args: { file: "<abs path to script/page>", type: "episode" } })
// It does NOT auto-run; invoke it explicitly.

export const meta = {
  name: 'review-content',
  description: 'LAiDIES content-correctness gate battery — facts, substance, canon, design/UX, cold-reader. Blocks on any FAIL.',
  phases: [
    { title: 'Gates', detail: 'Five independent gate agents review the content in parallel' },
    { title: 'Synthesize', detail: 'Consolidate verdicts into one PASS/FAIL report' },
  ],
}

const REPO = '/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage'

const target = args && args.file
if (!target) throw new Error('Pass args: { file: "<abs path to content file>", type: "episode" | "page" }')
const kind = (args && args.type) || 'episode'

const GATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['gate', 'verdict', 'issues'],
  properties: {
    gate: { type: 'string' },
    verdict: { enum: ['PASS', 'FAIL'] },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'where', 'problem', 'fix'],
        properties: {
          severity: { enum: ['blocker', 'major', 'minor'] },
          where: { type: 'string' },
          problem: { type: 'string' },
          fix: { type: 'string' },
        },
      },
    },
    learnsInOneSentence: { type: 'string' },
    sourcesChecked: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
}

const COMMON = `You are reviewing a LAiDIES ${kind}. Read the file at:\n${target}\n` +
  `Be adversarial and specific — cite the exact line/phrase. Default to FAIL when unsure; "looks fine" is not a review.\n` +
  `Return ONLY the structured verdict.`

const GATES = [
  {
    key: 'fact-check',
    prompt: `${COMMON}\n\nGATE: FACT-CHECK. For EVERY factual/teaching claim, verify against a REAL, CURRENT web source — the AI landscape changes monthly, so DO NOT trust memory; use web search. Cross-check the verified fact base at ${REPO}/operations/reference/ai-landscape-factsheet.md. Any claim you cannot source is a BLOCKER. Hunt overgeneralizations (e.g. "only a handful build their own", "Copilot is just GPT", "Gemini is the Google-apps one") — these are known failure modes. verdict=FAIL if any blocker.`,
  },
  {
    key: 'substance',
    prompt: `${COMMON}\n\nGATE: SUBSTANCE. A smart, busy woman ALREADY knows there are different AI companies. In learnsInOneSentence, name exactly what she LEARNS here that she didn't know. If you can't, or it's a shallow skim, verdict=FAIL. Reward a genuine mental model + a concrete worked example; reject assertion-without-explanation.`,
  },
  {
    key: 'canon',
    prompt: `${COMMON}\n\nGATE: CANON/CONSISTENCY. Also read ${REPO}/operations/voice/laidies-writing-lock.md. Check: AI/a model/an app is always "it" NEVER "her"; no self-hyping tells ("the part everybody fumbles" etc.); no "the whole/entire [x]"; street numbers + names correct; saint roles correct for the episode; MUST-MATCH strings present verbatim; 1999 voice, no banned phrases. Blocker on any violation.`,
  },
  {
    key: 'design-ux',
    prompt: `${COMMON}\n\nGATE: DESIGN/UX. For a page: hub-and-reveal (no endless scroll), accessibility, brand palette/type, no dead-end CTAs, one clear next action. For a script: judge structure and flow — does it move, or sag? If Plausible data exists at ${REPO}/operations/reference/plausible-latest.json, weight known drop-off pages. Blocker on dead ends / broken flow.`,
  },
  {
    key: 'cold-reader',
    prompt: `${COMMON}\n\nGATE: COLD-READER. Read it as a first-time external reader — smart, but new to AI. Does it make sense start to finish? Is it genuinely useful, and funny where it tries to be? Note every spot you get confused or bored. Confusion or "so what?" on the CORE teaching = FAIL.`,
  },
]

phase('Gates')
const results = await parallel(GATES.map(g => () =>
  agent(g.prompt, { label: `gate:${g.key}`, phase: 'Gates', schema: GATE_SCHEMA })
    .then(r => r || { gate: g.key, verdict: 'FAIL', issues: [{ severity: 'blocker', where: '-', problem: 'gate agent returned nothing', fix: 're-run this gate' }] })
))

phase('Synthesize')
const failed = results.filter(r => r.verdict !== 'PASS')
const blockers = results.flatMap(r => (r.issues || []).filter(i => i.severity === 'blocker').map(i => ({ gate: r.gate, ...i })))
const overall = failed.length === 0 ? 'PASS' : 'FAIL'
log(`Review of ${target}`)
log(`Overall: ${overall} — ${results.length - failed.length}/${results.length} gates passed · ${blockers.length} blockers`)
const learns = (results.find(r => r.gate && r.gate.includes('substance')) || {}).learnsInOneSentence
if (learns) log(`What she learns: ${learns}`)

return {
  overall,
  file: target,
  gates: results.map(r => ({ gate: r.gate, verdict: r.verdict, issues: (r.issues || []).length })),
  learnsInOneSentence: learns || null,
  blockers,
  fullVerdicts: results,
}
