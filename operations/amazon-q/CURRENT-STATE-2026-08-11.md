# LAiDIES current-state snapshot for Amazon Q

**Evidence cutoff:** 2026-08-11 12:10 PDT
**Method:** current repository commands, current Cloudflare account listing and
fresh public HTTP requests. This is a dated snapshot, not a permanent source of
truth.

## Public site

- Cloudflare Pages project: `laidies-sunnyvaile`.
- Custom domains: `laidies.ai` and `www.laidies.ai`.
- Latest listed production deployment:
  `9f161385-7486-4207-9afe-8512ea453973`.
- Deployment source commit: `28f483e25c021e37e0acd2687abcae26a6d66927`.
- Source commit date: 2026-07-29 11:17 PDT.
- Fresh public root SHA-256:
  `a40c13d14a009a4ec8a3fa3aaa91bf362efda642e12d8b47af392fba4d7e699c`.

Fresh requests returned HTTP 200 for:

- `https://laidies.ai/`
- `https://laidies.ai/library.html` → `/library`
- `https://laidies.ai/newsstand.html` → `/newsstand`
- `https://laidies.ai/games/dream-phone.html` → `/games/dream-phone`
- `https://laidies.ai/watch.html?ep=04` → `/watch?ep=04`
- `https://laidies.ai/robots.txt`
- `https://laidies.ai/sitemap.xml`

This proves reachability only. It does not admit those experiences or show that
the current local work is deployed.

## Opening gate run today

Command:

```bash
node scripts/check-opening-day-program.mjs
```

Result:

```text
OPENING DAY PROGRAM: SPECIFICATION VALID — NOT RELEASE READY
- 17/17 canonical buildings covered; 0/17 release-ready
- 0/17 buildings have exact visual-experience admission
- 9 shared-system contracts covered
- 10 catalogue floors covered
- Opening media: 0/5 release-ready; gate=HOLD
- Classes: NOT READY; strict readiness schema=missing
- Library books: NOT READY; available=0/4; strict readiness schema=present
- Site video: NOT READY; strict readiness schema=present
- LAUNCH READINESS: HOLD
```

The programme's scope is useful, but some embedded labels are stale. Apply
`operations/DECISIONS.md` before repeating them publicly.

## Local repository

- Repository root: `Website-homepage`.
- Branch: `homepage-redesign`.
- Current local HEAD at snapshot:
  `df5a79e2b60b80717bbaa8bf38c3e794184933fc`.
- `origin/homepage-redesign` at snapshot:
  `ced956af9a022f297aa79c54dd7f577f77554cc0`.
- Local branch: 9 commits ahead of `origin/homepage-redesign`.
- Relative to `origin/main`: 321 commits ahead and 26 commits behind.
- Working tree: 229 tracked modified paths and approximately 3,196 untracked
  top-level status entries.
- Tracked files: 9,582.
- Local tree size: approximately 39 GB.

This worktree must not be cleaned, reset, bulk-staged or turned into one
mega-commit. Current public deployment, remote branches, local commits,
uncommitted work and untracked evidence are different states.

## Operating-model implementation

The append-only parity check currently passes:

```text
WORK EVENT PARITY PASS active_legacy=15 projected=16
```

The whole-system audit currently fails:

```text
OPERATIONAL INTEGRITY FAIL
- one legacy work item still has invalid handwritten status RUNNING
- five work-resolution records require overdue follow-up/redispatch handling
- Library mobile shelf rows fail the 120px visible-book requirement
```

The event metrics projector reports complete coverage `false`. Nine of ten
metrics are unavailable, including public throughput, first-pass acceptance,
Ali-found defect rate and review cycles. Do not report those as zero.

The earliest recorded two-week parity review is 2026-08-22 05:23 PDT. Passing
that time condition does not automatically retire any legacy source; each
consumer must also be repaired and deliberately migrated.

## Product exceptions with newer truth

- **Dream Phone:** the original multi-caller claim game was built and repaired,
  not merely proposed. Its July 25 strict-calendar successor had one admitted
  round with a bounded local independent PASS; twelve rounds remained held.
  The three August 10 replacement concepts were rejected, but Ali's newer
  direct ruling reopens the repaired original direction for a three-round
  playable proof. This is not build, equal-door, deploy or public authority.
  Product `state.json`, `OPERATING-SPEC.md`, the experience brief and the
  contract test still contain stale parked-game assumptions; the contract test
  currently fails on that conflict. The public route predates the newer repair
  and direction and is not launch-approved.
- **Library opening set:** AI Fundamentals 101, Briefing 101, Setup 101 and
  Accounts 101. Concepts 101 and Vocab 101 are not separate opening books.
- **AI Fundamentals:** the rejected false-pass family remains held; no opening
  Library book is available.
- **Dispatcher:** paused. Stored queue/heartbeat records do not prove a live
  agent or authorize a restart.
- **Grand reopening/social announcement:** held.

## Tools verified today

### Git and GitHub

- Remote: `https://github.com/laidies/LAIDIES.git`.
- Git works locally.
- GitHub CLI (`gh`) is not installed on this machine.
- Hosted GitHub state must be queried through an available GitHub integration
  or installed/authenticated tooling before it is described as current.

### Cloudflare

- Wrangler installed: 4.105.0; update 4.120.1 was available at the snapshot.
- Wrangler is authenticated to the LAiDIES Cloudflare account.
- The token exposes broad write scopes. Amazon Q must treat Cloudflare as
  read-only unless a task explicitly grants deployment/provider mutation.
- The Pages project has no Git Provider in the current listing; deployments
  are therefore not inferred from pushes.

### AWS

- AWS CLI installed: 2.36.19.
- Current session successfully resolved the short-lived assumed role
  `laidies-codex-operator`.
- GitHub remains source control. AWS use is bounded infrastructure/recovery,
  not permission to migrate or deploy the site.
- Never print account identifiers or credentials. Use separate least-privilege
  backup authority for restic; do not use the operator role as a backup key.

### Site/runtime services

- Cloudflare Pages: public static site hosting.
- Cloudflare Workers: bounded subscribe/avatar/fairy or related service code
  exists; current public capability must be proved per service.
- Supabase: migrations and identity/continuation contracts exist; production
  claims require exact current provider/public evidence.
- Plausible: tracking is embedded, but authenticated aggregate reporting is not
  connected. Traffic and Resident Card signup counts remain unknown.
- Canva: approved animation creation surface.
- CapCut: assembly/export surface only.

## Refresh commands

Run these before giving a current status:

```bash
git status --short --branch
git log -1 --format='%H %cI %s'
node scripts/check-opening-day-program.mjs
node scripts/check-operational-integrity.mjs
node scripts/check-work-event-parity.mjs
node scripts/project-work-metrics.mjs
wrangler pages project list
wrangler pages deployment list --project-name laidies-sunnyvaile
```

For public truth, fetch the actual `https://laidies.ai` route. Do not substitute
a local file, branch, commit or pages.dev preview.
