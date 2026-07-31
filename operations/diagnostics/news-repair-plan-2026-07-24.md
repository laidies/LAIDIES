# NewsStand + deployment repair plan

**Date:** 2026-07-24  
**Status:** REPORT READY — no workflow, page, deployment or external state was
changed  
**Input:** `operations/diagnostics/news-system-live-status-2026-07-24.md`

## Recommended reader promise

Publish only:

- **The WEDNESDAY Edition** — 2–4 source-checked stories each week.
- **The Tribune** — a sourced argument when there is one worth making.

Keep daily collection as a private **radar**, not a public TODAY edition.
“Weekly-only” describes the reader product; daily backstage intake can still
catch a major release quickly.

For a major model/product release:

1. flag it in the private daily radar;
2. consider it for that week’s WEDNESDAY Edition; and
3. update `content/site/current-models.js` in the same approved change if the
   site’s volatile model facts are affected.

This is a recommendation, not yet a locked ruling. The current uncommitted
NewsStand redesign visibly reintroduces TODAY while the public story library
contains no TODAY stories. Those conflict-sensitive HTML/CSS files were not
edited during this audit.

## Verified architecture problem

- The schedule writes `content/hot-goss-feed.json`.
- The public page loads `content/newsstand-stories.js`.
- `scripts/update-hot-goss.py` works from short RSS snippets and can fall back
  to raw copy.
- No implemented Stage 2 intake → claim map/integrity review → approval →
  canonical publish path exists.
- The cross-link helper is not called by the daily workflow.
- The repository currently relies on branch/Jekyll Pages publishing, not a
  curated custom Pages artifact.
- The tracked `origin/main` tree is approximately **5.27 GiB**:
  `assets/` 4,040.9 MiB; `approved-assets/` 684.9 MiB; `content/` 358.6 MiB;
  `operations/` 158.5 MiB; `concepts/` 127.0 MiB.
- `_config.yml` excludes some internal folders but does not prevent most
  production variants and duplicate assets from entering the build path.

GitHub’s current official custom-workflow documentation supports deploying a
prepared artifact with `actions/upload-pages-artifact@v4` and
`actions/deploy-pages@v4`. The action’s own current documentation recommends
an artifact under 1 GB and says larger deployments are not guaranteed even
though the absolute archive ceiling is higher. This supports a curated public
artifact rather than treating the whole studio repository as the website.

Sources checked 2026-07-24:

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/upload-pages-artifact

## Minimal target flow

```text
private daily radar
  → source metadata/candidates only
  → automation/news-radar branch (never direct to main)
  → weekly ranked proposal
  → full-source research + claim/source map
  → LAiDIES draft + integrity/freshness report
  → draft PR containing the exact canonical story diff
  → deterministic checks
  → Ali reviews/edits/merges
  → curated Pages artifact
  → deploy
  → public browser smoke test
```

For the first repair, keep `content/newsstand-stories.js` as the one approved
public dataset. The page already renders it and the weekly manifest already
names it. Radar and review files are staging evidence, not competing sources
of truth.

The radar should store metadata only: publisher, original headline, URL,
published time, captured time, feed and candidate ID. AI failure may never turn
raw fallback copy into publishable LAiDIES analysis.

The draft PR is the human approval gate. Automation may prepare the canonical
diff, rendered preview and integrity report; it may not merge or self-approve.

## Pages stabilization

1. Build a curated `dist/` from declared public entries and their recursively
   referenced HTML/CSS/JS/data/assets.
2. Include an explicit supplemental manifest for runtime-computed assets.
3. Deny internal/working material: `operations/`, `concepts/`,
   `approved-assets/`, archives, QA captures, rerolls, rejected art and raw
   generation directories.
4. Fail on a missing referenced asset, internal-path leak, symlink, missing
   required route or unsafe artifact size.
5. Warn at 750 MiB and fail at 950 MiB.
6. Upload only `dist/` with `actions/upload-pages-artifact@v4`.
7. Deploy with `actions/deploy-pages@v4`, `pages: write`, `id-token: write`
   and the `github-pages` environment.
8. Generate `build-info.json` with the deployed commit SHA.
9. Build/validate pull requests without deploying. Deploy only the approved
   `main` state or a deliberate manual rollback SHA.

Do not begin by moving/deleting the multi-gigabyte studio tree. A curated
artifact separates public delivery from working storage without a destructive
asset migration.

## Smoke-test contract

### Before merge

- canonical story library loads in a Node sandbox;
- only approved edition values are accepted;
- story IDs/slugs are unique and dates are valid;
- required sections, sources and cross-links exist;
- unsafe HTML and placeholders fail;
- every factual draft has a matching claim/source map;
- every proposed slug opens in a headless local render;
- the public artifact contains no denied internal paths and stays below limit.

### After deploy

- `build-info.json` matches the intended SHA;
- NewsStand HTML, CSS, JS and canonical data return 200;
- the approved set of public papers—and no retired paper—renders;
- the newest expected WEDNESDAY slug/date opens;
- the proposed Tribune deep link opens;
- source links are visible/valid;
- there are no page or console errors.

A green intake job, successful commit or artifact upload is not the finish
line. The contract ends at the rendered public story.

## File-touch map

| File/path | Intended change after approval |
|---|---|
| `operations/engine/LEDGER.md` | Lock public edition contract; daily radar backstage; supersede conflicting older rulings |
| `operations/building-design-briefs/newsstand.md` | Reconcile/remove TODAY directives |
| `newsstand.html` | Reconcile visible papers; add stable smoke hooks |
| `content/newsstand.css` | Reflow approved paper rack |
| `content/newsstand-stories.js` | Remain the sole approved public dataset |
| `.github/workflows/hot-goss-daily.yml` | Retire/replace direct-to-main public-feed behaviour |
| `scripts/update-hot-goss.py` | Retire/replace snippet-to-public-copy flow |
| `content/hot-goss-feed.json` | Mark superseded; remove from publication path |
| `content/hot-goss-render.js` | Retire when no consumer remains |
| `.github/workflows/deploy-pages.yml` | New curated build/deploy workflow |
| `.github/workflows/newsstand-proposal.yml` | New weekly draft-PR flow |
| `.github/workflows/newsstand-validate.yml` | New PR checks |
| `scripts/build-public-site.mjs` | New public dependency-closure builder |
| `scripts/check-public-site.mjs` | New leak, size and link gate |
| `scripts/collect-news-radar.py` | New metadata-only daily intake |
| `scripts/build-newsstand-proposal.py` | New candidate-to-review packet/canonical diff |
| `scripts/validate-newsstand-stories.mjs` | New schema/integrity validator |
| `scripts/smoke-newsstand-public.mjs` | New public browser smoke test |
| `operations/deploy/public-site-manifest.json` | New entries and dynamic asset declarations |
| `operations/news/allowlist.json` | Source/provenance policy |
| `operations/news/radar/` | Private candidate state |
| `operations/news/reviews/` | Claim maps, integrity and approval evidence |
| `content/site/current-models.js` | Conditional update with an approved relevant story |

## Order and rough effort

1. Lock the public contract, stop direct daily writes to `main`, prevent any
   unstaffed edition promise from deploying — **2–4 hours**.
2. Build curated artifact workflow and pre-deploy checks — **1–2 days**.
3. Add SHA-based smoke test and rollback dispatch — **half a day**.
4. Refactor daily intake into a private radar — **half to one day**.
5. Build weekly proposal, integrity packet, validator and draft-PR gate —
   **1–2 days**.
6. Run one real story through producer → reader — **half to one day plus
   editorial review**.

Smallest launch repair: approximately **1.5–2.5 focused engineering days**.
The complete assisted editorial stage is approximately **3–5 days total**.
These are planning estimates, not delivery promises.

## Principal risks

- Current NewsStand HTML/CSS edits overlap the future repair.
- A generated manifest can miss runtime-built paths; require supplemental
  declarations plus a browser crawl.
- Paywalls, robots rules and copyright limit full-text capture; retain evidence
  metadata and original summaries rather than copied articles.
- Scheduled Actions can be delayed; retain manual dispatch and a named weekly
  check.
- An AI-generated claim map is not factual verification.

## Decision needed before implementation

Approve or revise:

> **Public NewsStand = WEDNESDAY + Tribune. Daily collection remains a private
> radar; TODAY is not a reader promise.**
