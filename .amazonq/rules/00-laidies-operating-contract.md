# LAiDIES operating contract for Amazon Q

Before answering or changing this repository, read
`operations/amazon-q/README-FIRST.md` and
`operations/runtime/STANDING-CARD.md`.

## Authority and truth

- Read `operations/voice/laidies-canon-index.md` first for current names,
  retired names and status vocabulary. Never read the older copy under
  `../Website/operations/voice/`.
- Read `operations/DECISIONS.md` next. It routes current product and process
  authority and overrides older plans. Search it rather than guessing.
- Read `operations/ACTIVE-WORK.md` and the affected product's current dossier
  before proposing work. Treat old packets, screenshots, prototypes and files
  on disk as evidence, not authority.
- Planned, specified, local, rendered, reviewed, admitted, committed, pushed,
  deployed and verified publicly are different states. Never promote one into
  another. A route returning HTTP 200 proves reachability, not readiness.
- If current sources conflict, name the conflict and stop only the affected
  action. Do not resolve it from an older summary.
- Dream Phone currently has a known conflict: Ali's newer direct ruling in
  `operations/dream-phone-design-decisions.md` overrides the stale parked-game
  wording in the product `state.json`, `OPERATING-SPEC.md`, experience brief
  and contract test. Do not erase the conflict or infer build authority from
  the newer direction.

Use scoped retrieval instead of loading large authority files:

```bash
node scripts/query-laidies-context.mjs --source decisions --query "term"
node scripts/query-laidies-context.mjs --source lessons --query "term"
node scripts/query-laidies-context.mjs --source canon --query "term"
node scripts/query-laidies-context.mjs --source product --product <id> --query "term"
```

## How to help

- Lead with the visitor or reader outcome. LAiDIES is a cohesive learning town
  for smart, busy, nontechnical-but-not-naive women from the Rewind Era. It is
  not a dashboard, generic course catalogue, content mill or SaaS funnel.
- Practical value leads. SUNNYVAiLE and nostalgia make learning memorable;
  they may never obscure the task. Generic white cards, pastel-candy UI,
  corporate-help-centre layouts and decoration pasted onto ordinary modules
  are rejected directions.
- Keep launch recovery at one active building plus one distinct content item.
  Do not create another operating system, parallel status source, owner
  bureaucracy or speculative feature.
- Reuse approved assets and existing product mechanics before generating
  replacements. Search current rejection and painpoint records before making a
  candidate.
- A successful build, checksum or validator is integrity evidence, never a
  quality review. Tier 1 work requires the real artifact, role-distinct
  judgment and the managed Review Door before Ali sees it.
- If the same defect recurs, stop making successors. Repair the producer,
  checker or enforced fixture, then prove it rejects the known-bad artifact.
- Ali owns taste, mission, public identity, consequential product choices,
  spending, deployment and publication. Do not use Ali as the first reader,
  visual inspector, broken-interaction tester or status reconciler.

## Safety and repository handling

- Preserve the dirty worktree. Never discard, reset, clean, stash or overwrite
  uncommitted work. One writer owns an exact path at a time.
- GitHub is authoritative versioned source. The iCloud worktree is not the
  public site and is not the only recovery copy.
- Do not deploy, publish, push to a protected branch, buy, subscribe, change a
  provider/account, access private data or broaden AWS/Cloudflare permissions
  unless the task explicitly grants that authority.
- Never expose credentials, account IDs, tokens, private financial records or
  user content in chat, logs or commits.
- Report what you verified, what remains assumed, what failed and what you did
  not do. `UNKNOWN` is not zero.
