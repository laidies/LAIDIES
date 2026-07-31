# News system live-status audit — 2026-07-24

**Status:** VERIFIED DIAGNOSIS  
**Scope:** scheduled headline intake, WEDNESDAY Edition / Tribune system,
GitHub `main`, GitHub Pages and the public NewsStand  
**No production action taken:** no workflow was rerun, no content was
published and no branch was merged during this audit.

## Executive truth

The better weekly NewsStand system is **not live as a complete weekly
automation**.

Three different things had been collapsed into “the news system”:

1. **Daily headline intake — RUNNING, but only as raw repository output.**
   The `Update Hot Goss Daily` GitHub Action runs every day and commits
   `content/hot-goss-feed.json` to `main`.
2. **WEDNESDAY Edition / Tribune — BUILT AS A MANUAL STAGE 1 AND PARTLY
   DEPLOYED.** The public NewsStand reads `content/newsstand-stories.js`, which
   contains two WEDNESDAY stories and one Tribune story, all dated 2026-06-28.
3. **Assisted weekly publishing — SPECIFIED, NOT BUILT.** The planned Stage 2
   flow—full-text fetch, draft, integrity pass, Ali approval, publish—has no
   scheduler/orchestrator or approve-to-publish implementation.

The daily producer and the public NewsStand use different source files. A
successful daily commit therefore does not update the news a visitor sees.

## Verified evidence

### 1. The daily scheduler really runs

- Workflow: `.github/workflows/hot-goss-daily.yml`
- Schedule: `0 12 * * *`
- GitHub run:
  `https://github.com/laidies/LAIDIES/actions/runs/30096017037`
- Run 43 completed successfully on 2026-07-24.
- It found 12 RSS candidates, wrote four `weeklyStories` and three
  `dailyHeadlines`, committed them and pushed commit `83da89b` to `main`.
- This is why remote `main` can advance while work continues on
  `homepage-redesign`.

### 2. The “rewrite in LAiDIES voice” step is not operating

Run 43 logged:

> `No ANTHROPIC_API_KEY — using raw headlines`

The job still exits successfully because the script deliberately falls back
to RSS headline/snippet passthrough. It is therefore inaccurate to describe
the current job as “fetches and rewrites AI news.”

### 3. The daily output has no live consumer

Repository-wide search of `origin/main` found no live HTML page that loads
`content/hot-goss-feed.json` or `content/hot-goss-render.js`.

- The only direct homepage consumer is in a retired backup.
- `/hot-goss.html` returns 404 publicly.
- The public `/newsstand.html` loads
  `/content/newsstand-stories.js`, not the daily feed.
- A clean headless-Chrome render confirmed that visitors see exactly two
  WEDNESDAY cards and one Tribune card, all dated June 28, 2026.
- `operations/launch-readiness-audit-2026-07-10.md` had already identified
  the feed and renderer as orphaned, but the agent registry still called the
  job live.

### 4. The better weekly system is a manual content library

`content/newsstand-stories.js` says:

> `Stage 2 automation will push into the same array. Human approve-to-publish
> gate stays with Ali.`

Its only three story objects are dated 2026-06-28. The richer structure exists:

- The Story / Argument
- The LAiDIES Read
- What This Means For You
- The Cocktail Party Explanation
- Class Notes
- named sources, tags and archive fields

But there is no implemented weekly intake, source verification, draft,
integrity-report, approval or publish pipeline around that structure.

### 5. TODAY currently contradicts the latest editorial decision

The 2026-07-23 Tribune handover records that the daily TODAY edition was
retired deliberately because a firehose was not the desired reader
experience. It recommends folding important changes into the WEDNESDAY
Edition.

The current local redesign of `newsstand.html` has since added a visible TODAY
paper again, but still reads only `newsstand-stories.js`, which has no TODAY
stories. If deployed as-is, TODAY would be a polished empty promise.

This needs one explicit ruling before further NewsStand implementation:

- **recommended:** weekly WEDNESDAY Edition + as-warranted Tribune publicly;
  repurpose daily intake as the radar/staging queue; or
- deliberately restore TODAY and build a truthful, sourced daily consumer.

### 6. Today’s newest repository output is not deployed

- Daily run 43 successfully pushed `83da89b`.
- GitHub Pages run 398 for that commit failed:
  `https://github.com/laidies/LAIDIES/actions/runs/30096197019`
- Jekyll build succeeded; artifact upload failed with:
  `System.IO.IOException: No space left on device`.
- The public site is still serving successful deployment `e714cc8` from
  2026-07-23.
- The public JSON therefore reports `lastUpdated: 2026-07-23`, even though
  `main` contains the 2026-07-24 file.

The current `main` tree is approximately 5.27 GiB. One runner failure can be
transient, but a Pages source this large makes deploys slow and brittle and
should be treated as an infrastructure risk.

## Why `main` is sometimes ahead

The scheduler checks out `main`, changes one feed file, commits and pushes
directly to `main`. It does not merge that commit into the
`homepage-redesign` worktree.

The resulting flow is:

```text
daily scheduler → hot-goss-feed.json → commit on main → Pages build
                                               └── homepage-redesign does not auto-merge
```

That explains the branch movement. It does **not** prove the NewsStand changed,
because the NewsStand reads another file.

## Recommended repair order

1. **Stabilize the public deployment path.** Stop sending the entire
   multi-gigabyte working/archive tree through GitHub Pages; publish a curated
   site artifact or move non-site production assets out of the Pages source.
2. **Lock weekly-only versus TODAY.** Current evidence favours public
   WEDNESDAY + Tribune, with the daily job acting as radar rather than an
   auto-publisher.
3. **Connect one producer to one public source of truth.** The approved weekly
   publisher must write the exact dataset the NewsStand renders.
4. **Build Stage 2 with the human gate intact.** Allowlisted full-text intake →
   candidate ranking → source/claim map → LAiDIES draft → freshness/capture
   report → Ali approval → publish.
5. **Add end-to-end proof.** A run is only successful when the expected dated
   edition appears on the public NewsStand with working sources and the public
   smoke test passes.

## Honest status label

> **News system: PARTIAL.** Daily RSS intake runs and pushes raw output to
> `main`; that output is not consumed by a live page. The richer WEDNESDAY /
> Tribune NewsStand exists as a manual Stage 1 with three June 28 stories.
> Stage 2 weekly automation is not built. The latest Pages deployment also
> failed, leaving the public site one feed revision behind.
