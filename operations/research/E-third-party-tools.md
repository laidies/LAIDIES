# QUESTION E — Third-party tools missing from the stack

*Researched 2026-07-22. Extends `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/research/agent-operations-playbook.md` (2026-07-21). Every claim carries a source URL and a date, and one of four labels: `[FACT]` verified against a primary source · `[LOCAL]` measured in this repo today · `[INFERENCE]` reasoning built on facts · `[OPINION]` judgement · `[NOT VERIFIED]` could not confirm.*

---

## The short version

The honest headline: **most of the gap is not a missing product.** For asset management, monitoring and audio, the answer is a script plus a manifest, and the playbook already argued that correctly. Three genuinely new third-party things are worth adding, and they are all cheap.

But research turned up **five measured facts about this repo** that change the ranking, and one of them is a live defect. Those are first, because a tool recommendation that ignores them is decoration.

---

## Part 0 — Five things measured in the repo today

These were not in the playbook. They are all `[LOCAL]`, measured 2026-07-22, and each one changes what "the right tool" means.

### 0.1 ⚠ The domain is not actually going through Cloudflare

`laidies.ai` uses Cloudflare nameservers (`kim.ns.cloudflare.com`, `melnicoff.ns.cloudflare.com`) but its A records resolve straight to GitHub Pages IPs — `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`. A request to `https://laidies.ai/` returns `server: GitHub.com` with **no `cf-ray` header**. That is DNS-only mode ("grey cloud"), not proxied.

**Consequence, tested:** `https://laidies.ai/@ali` returns **404**. The Transform Rule documented at `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/cloudflare-pretty-url-rule.md` — the whole `/@handle` → Closet feature — **is not running.** Transform Rules only execute on proxied traffic.

It also means: no edge caching, no Cloudflare Web Analytics, no WAF, no edge redirects, and every byte of a 3.9 GB asset tree is served by GitHub Pages directly.

**Fix: one toggle in the Cloudflare dashboard** (set the `laidies.ai` A records to Proxied). Cost £0. This is the single highest value-per-minute item in this entire report and it is not a tool purchase. `[LOCAL, measured 2026-07-22]`

⚠ Caveat before flipping it: Cloudflare in front of GitHub Pages needs SSL/TLS mode **Full**, not Flexible, or you get a redirect loop. `[OPINION, standard practice — test on `wearelaidies.ai` first, which is the secondary zone.]`

### 0.2 The repository is 4.3 GB. GitHub's published hard limit is 1 GB.

GitHub's API reports `laidies/LAIDIES` at **4,524,962 KB ≈ 4.3 GB**, public. Locally, tracked files total **5.3 GB** — `assets/` 3.9 GB, `approved-assets/` 682 MB — and the shared `.git` directory is **17 GB**.

GitHub's own documentation: *"Published GitHub Pages sites may be no larger than 1 GB"* and *"GitHub Pages source repositories have a recommended limit of 1 GB"*, with a *"soft bandwidth limit of 100 GB per month."*
(https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits, fetched 2026-07-22) `[FACT]`

The site currently serves, so the 1 GB ceiling is evidently not hard-enforced today. But this is a platform limit being exceeded 4×, with no warning system, on infrastructure with no contract. **This is the actual asset-management problem** — not tagging, not search. `[LOCAL + FACT]`

### 0.3 curation.json governs 12.5% of the image library

| Measured | Count |
|---|---|
| Entries in `operations/ops/curation.json` | **374** (208 `correct`, 89 `redo`, 77 `unused`) |
| Files in `approved-assets/` | **433** |
| Image files tracked in git | **2,988** |
| Image references across HTML | **9,848** (1,608 unique local paths) |

So **2,614 of 2,988 tracked images have no verdict record at all** — 87.5%. The playbook's D8a ("invert the denylist into a generation-aware allowlist") is the right idea, but at 12.5% coverage a strict allowlist would block nearly every legitimate edit on day one. **The allowlist has to be scoped to a directory, not the whole tree.** That is a correction to the playbook, detailed in §1. `[LOCAL]`

### 0.4 There are broken image references on the live site right now

Resolving every local image `src`/`href` in every non-superseded HTML file against disk: **62 references to 36 unique files that do not exist.** Mostly Episode 3 comic frames (`ep03-scene-01-cold-open-desk-comic.png`, `ep03-scene-04-regina-burn-book-comic.png`, and ~10 more of that series).

⚠ Some may be false positives where a path is assembled in JavaScript rather than written literally. The number to trust is "roughly 2% of unique asset refs are dead, and nothing is checking." `[LOCAL, measured — re-run before acting]`

### 0.5 The "no dashboard" delivery mechanism already exists and works

`/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/.github/workflows/ai-model-freshness.yml` runs on a weekly cron and **opens a GitHub Issue**. That is a scheduled agent-driven check whose output arrives as an email, with nothing to log into.

And because the repo is **public**, GitHub Actions minutes are *"free and unlimited"* for it (https://docs.github.com/en/billing/managing-billing-for-your-products/about-billing-for-github-actions, fetched 2026-07-22) `[FACT]`.

**So the monitoring "tool gap" is mostly already solved** — the pattern is proven, free, and unlimited. Everything in §5 is "add another job to this workflow," not "buy a monitoring product." `[LOCAL + FACT]`

⚠ One privacy note: the repo is public, so GitHub Issues used for approvals or QC would be **publicly readable**, including any unreleased episode content. That rules Issues out as the approval channel (§3).

---

## Where the playbook was followed, and where not

**Followed:**
- C2 site-integrity tooling — lychee confirmed still healthy (below), recommended, extended with a "what to actually run weekly" schedule.
- C3 asset governance — its core conclusion (manifest + hook, not a DAM product) is **confirmed by independent search**. §1 gives the evidence that no product exists at this scale.
- C4 regression safety — Playwright on 8–12 template pages, unchanged. Lost Pixel still archived. No new candidate found worth switching to.
- D2b/D2d reference-conditioning over prompting, seeds secondary — confirmed and now backed by exact documented reference-image ceilings (§2, Open Q1/Q2 resolved).
- Anti-pattern 11 ("prompting harder instead of writing the script") — this report reaches the same conclusion in four of six categories.

**Departed from:**
- **D8a, the generation-aware allowlist, cannot be applied tree-wide.** At 12.5% manifest coverage it would fail closed on 2,614 legitimate files. Scope it to `assets/episodes/` only. (§1)
- **D2a, retrain the LoRA on Replicate, is no longer the cheapest structural fix.** Two vendors now publish reference-image ceilings high enough (FLUX.2: 8–10 refs; Gemini 3 Pro Image: 5 character refs) that a *no-training* reference-lock is worth testing first, at ~$0.13/image and zero setup. Training remains the fallback, not the opener. (§2)
- **The playbook did not cost the "one still, animated" rule end to end.** Doing so (§2.4) shows the binding constraint is Ali's review time, not generation cost — which is why §3 outranks most of §2.
- **The playbook treats hosting as a given.** It is not: §0.1 and §0.2 are unaddressed platform risks.

---

## 1. Asset management / DAM

### The question, honestly

Is there a tool that (a) tracks ~3,000 images with generation/verdict metadata, (b) is readable and writable by an agent without a GUI, and (c) does not become a second job?

**No. There isn't.** Here is the evidence rather than the assertion.

| Candidate | Status verified 2026-07-22 | Why it fails here |
|---|---|---|
| **Eagle** (eagle.cool) | $29.95 one-time, 2 devices (https://www.capterra.com/p/184384/Eagle/) `[FACT, secondary]`. Has a **local HTTP API on port 41595**, JSON, add/list items + folders + tags — but *"the Eagle API server will start up when Eagle App is opened"* (https://api.eagle.cool/, fetched 2026-07-22) `[FACT]` | The API only exists while a **desktop GUI app is running**. An unattended agent pipeline or a GitHub Action cannot reach it. It is a human's library browser with a scripting hatch, not an automation substrate. |
| **ResourceSpace** | Repo alive (pushed 2026-07-22) but **54 GitHub stars** `[FACT, GitHub API]` | PHP + MySQL install to maintain, for a library one person curates. |
| **Pimcore / AtroDAM / AtroCore** | Active, enterprise-oriented (https://pimcore.com, https://www.atrocore.com) | Full PIM/CMS platforms. Installing one to hold 3,000 PNGs is the definition of a maintenance trap. |
| **Immich** | Very healthy — 108k stars, pushed 2026-07-22 `[FACT, GitHub API]` | It is a **photo host** (a self-hosted Google Photos), organised around dates and faces, not around `{generation, verdict, supersedes}`. Wrong data model. |
| **Adobe/Bynder/Brandfolder-class SaaS** | — | Per-seat enterprise pricing for a one-person operation. Not evaluated further. |

**Conclusion `[INFERENCE, well-supported]`: the playbook was right. Write the manifest.** Every DAM on the market solves *"a marketing team of 30 cannot find the logo."* This operation's failure is *"an agent picked a file from a superseded generation."* No product models generation lineage, because no product's customers ask for it.

### What to build instead — and the correction to D8a

Extend `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/operations/ops/curation.json` from `slug → verdict` to `slug → {generation, verdict, supersedes, approved_date, episode}`, exactly as the playbook says.

**But scope the enforcing hook to `assets/episodes/**` only.** That is where the generation-mixing rule bites (`no-old-artwork-consistency-lock`, `never-mix-style-generations`), and it is the directory where a fail-closed default is affordable. Applying it to `assets/` wholesale means 2,614 unknown files become blocks on day one, the hook gets disabled inside a week, and the mechanism dies the way rules-in-prose die.

- **What it replaces:** nothing — it upgrades `block-rejected-assets.py` from denylist to allowlist.
- **Cost:** £0.
- **Maintenance:** the manifest is written by the same script that generates each batch, so it maintains itself. Backfill is one pass over `assets/episodes/`, not 2,988 files.
- **Agent fit:** perfect. JSON in git, read by a `PreToolUse` hook.
- **Ali's effort:** zero, ongoing.

### The thing nobody has costed: 4.3 GB in a 1 GB-limit repo

`[INFERENCE built on §0.2 FACT]` The real asset-management job is not tagging. It is that **finished renders, working intermediates and rerolls all live in the same tree, and the tree is committed**. `assets/rerolls-20260714/` is 211 MB of rerolls in the published website.

Two options, both free:

1. **Cheap and reversible:** extend `.gitignore` the way it already handles video (`*.mp4` with a `!assets/video/episode-*-full-v*.mp4` negation — a genuinely good pattern already in the file) to cover reroll/intermediate directories. Reduces the *future* repo; does not shrink history.
2. **Proper:** move the non-published archive (rerolls, contact sheets, superseded generations) out of the Pages repo entirely — to **Cloudflare R2**, which is already reachable via the existing `wrangler.toml` setup, and whose free tier is 10 GB storage with **zero egress fees**. `[NOT VERIFIED — R2 free-tier figures not re-checked against Cloudflare's pricing page in this pass; confirm before relying on the numbers.]`

⚠ Do **not** use `git filter-repo`/BFG to rewrite the 17 GB history. Memory `uncommitted-work-incident` records a prior data-loss scare here; history rewriting on a repo with worktrees is exactly the operation that produces another one. `[OPINION, strongly held]`

**Verdict on §1: no tool. ~40 lines of Python for the manifest, one `.gitignore` edit, and one hosting decision.**

---

## 2. Image / video consistency

This is the biggest quality failure (18 prompts → ~2 usable). The playbook covered *models*. This section covers *workflow machinery*, and resolves six of its ten media Open Questions with primary sources.

### 2.1 Open Questions resolved

**Open Q1 — reference-image ceilings for the Gemini image models. RESOLVED.**
Google's own docs now publish exact per-model counts (https://ai.google.dev/gemini-api/docs/image-generation, fetched 2026-07-22) `[FACT]`:

| Model ID | Object refs | Character refs | Style refs | Output |
|---|---|---|---|---|
| `gemini-3.1-flash-lite-image` | up to **14** | none | none | 0.5K, 1K |
| `gemini-3.1-flash-image` | up to **10** | up to **4** | up to **3** | 0.5K–4K |
| `gemini-3-pro-image` | up to **6** | up to **5** | none | 0.5K–4K |

Note the model IDs have dropped their `-preview` suffixes since the playbook was written, and a new Lite tier exists. The playbook's provisional table (10/4/3 and 6/5) turns out to have been **correct**; it is now confirmed. Also note the trap: `gemini-3-pro-image` — the highest-quality model, with the most character-reference slots — supports **zero style references**. For a locked comic style *plus* a locked heroine, `gemini-3.1-flash-image` (4 character + 3 style) is the only Gemini model that can hold both at once. `[FACT + INFERENCE]`

Pricing (https://ai.google.dev/gemini-api/docs/pricing, fetched 2026-07-22) `[FACT]`, no free tier for any of them:
`gemini-3-pro-image` $0.134/image (1K–2K), $0.24 (4K) · `gemini-3.1-flash-image` $0.045 (0.5K) / $0.067 (1K) / $0.101 (2K) / $0.151 (4K) · `gemini-3.1-flash-lite-image` $0.0336 (1K).

**Open Q2 — max reference images for FLUX.1 Kontext, and gpt-image. RESOLVED.**
- **FLUX.1 Kontext: 1.** BFL's docs describe it as *"Text-to-image generation with single-image editing capabilities"* — one reference (https://docs.bfl.ai/, fetched 2026-07-22) `[FACT]`. The playbook's hope that Kontext was the multi-scene character-preserver was misplaced; it edits one image at a time.
- **FLUX.2 is the successor and takes many.** Docs index: *"reference up to 10 images simultaneously"*; BFL's own launch material says *"up to 8 reference images (9 MP total input) via API, with up to 10... in the Playground."* `[FACT, with an 8-vs-10 discrepancy between BFL's docs index and blog — assume 8 for API work.]` BFL calls FLUX.2 *"our recommended model family for all use cases."*
- **gpt-image edits: no documented maximum.** The endpoint takes `image[]=@` repeated; OpenAI's example uses 4 inputs and states no ceiling (https://developers.openai.com/api/docs/guides/image-generation, fetched 2026-07-22) `[FACT — absence of a stated limit, not a stated absence of limit]`.

**Open Q3 — gpt-image-2 specifications. RESOLVED.** Now a documented product, not a community post. Model IDs: `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`. Max edge ≤ 3840px, edges multiples of 16, aspect ratio ≤ 3:1, 655,360–8,294,400 total pixels. `gpt-image-2` pricing per image at 1024×1024: **low $0.006 · medium $0.053 · high $0.211** `[FACT]`.

**Open Q9 — official minimum LoRA dataset size. PARTIALLY RESOLVED.** Replicate and fal.ai still publish none. But **Scenario does**, and it is a vendor, not a forum: *"a small, well-curated dataset of 5 to 15 images is often more effective than a larger one"*; datasets of 20+ *"often lead to overfitting"*; for 5–8 images cover *"at least 3 distinct poses or angles"*; images at *"1024 x 1024 pixels or higher"*; training *"30 minutes to 2 hours"* (https://help.scenario.com/en/articles/train-a-consistent-character-model/, fetched 2026-07-22) `[FACT]`. Style models: 10–30 images.

**This directly contradicts the assumption behind the failed 2026-07-17 LoRA.** The community norm the playbook cited was 15–30 images; the only vendor that publishes guidance says 20+ *overfits* for a character. Combined with memory `episode-style-lock-trained` (trained on off-canon frames), the failure has two causes, not one: wrong images **and** probably too many of them. A retrain should use **5–15 hand-picked, on-canon, varied-pose frames**, cropped to face/upper-body per the existing QC rule about excluding bad hands. `[FACT + INFERENCE]`

**Open Q10 — seed determinism with image inputs. RESOLVED, negatively.** OpenAI's image-generation guide documents **no seed parameter and no reproducibility guarantee** for any `gpt-image-*` model `[FACT]`. Google's image docs publish no seed guarantee either. The playbook's D2d ("seeds are secondary") is now firmer than it was: for the hosted models actually in use here, **seeds are not merely secondary, they are unavailable**. Pin identity with references or a trained model, or not at all.

**Still open:** Q4 (Runway Gen-4), Q5 (Kling frame conditioning), Q6 (Sora 2 durations), Q7 (Midjourney `--cref`/`--sref` — docs still bot-blocked), Q8 (Ideogram style-ref limit of 3).

### 2.2 The workflow tools — what's real

**ComfyUI** — `Comfy-Org/ComfyUI`, GPL-3.0, **121,853 stars, pushed 2026-07-22** `[FACT, GitHub API]`. Extremely alive. A workflow is a JSON file, it exposes a REST + WebSocket API on port 8188 with `--listen`, and the seed on a KSampler node is a fixed integer, so a given graph is genuinely reproducible.

**And it is still the wrong tool here.** `[OPINION, argued]` ComfyUI's determinism applies to *open-weight models you host* — SDXL, FLUX dev, SD 3.5. It gives you nothing over `gpt-image-1`, which is the locked config for the avatar maker (memory `avatar-maker-locked-config`) and has no seed at all. To benefit, this operation would have to move to self-hosted open weights, which means a GPU box or a rented one, a Python environment with the CUDA/Torch version-drift problem, custom-node breakage on update, and a second machine to keep alive — for a person with no CS background whose stated constraint is that she will not maintain systems. The cost is not the software. It is that ComfyUI turns image generation into infrastructure. **Do not adopt.**

**Scenario** (https://www.scenario.com/pricing, fetched 2026-07-22) `[FACT]` — Free $0 (50 daily credits, **no custom training**) · Starter $15 · **Pro $45/mo (5,000 credits, custom model training)** · Max $75 · Enterprise. API-first, documented at docs.scenario.com. Base models for character training: Flux 2 (Dev / Klein 9B / Klein 4B), Z-Image, Qwen Image 2512.

`[OPINION]` Scenario is the closest thing on the market to "character/style locking as a managed product," and its documentation is the best-written primary source found on the subject. But it is **$540/year to replace a $2 Replicate training run**, and the retrain is a dataset problem, not a platform problem. Its real value is the free documentation, which is why it is cited above and not recommended below.

**fal.ai** — `flux-lora-portrait-trainer` bills *"$0.0024 cents per step. A minimum of 1000 steps will be billed"* (https://fal.ai/models/fal-ai/flux-lora-portrait-trainer, fetched 2026-07-22) `[FACT — note the page's own units are ambiguous ("$0.0024 cents"); at $0.0024/step a 1000-step run is $2.40, consistent with the playbook's ≈$2–2.40.]` Equivalent to Replicate. No reason to switch providers; the Replicate account and the Cloudflare-UA workaround are already working (memory `weekly-production-machine`).

### 2.3 What to actually change

`[INFERENCE, this is the recommendation]` **Try the no-training reference-lock before retraining anything.**

The 2026-07-17 LoRA failed. Retraining costs ~$2 plus a morning of curation plus the risk of failing the same way. Meanwhile two vendors now document reference-image ceilings that did not exist when the pixel-art direction was set:

- `gemini-3.1-flash-image`: **4 character refs + 3 style refs, simultaneously**, at $0.067/image (1K).
- FLUX.2 via Replicate/fal: **8 refs via API**.

The locked reference material already exists on disk — `assets/episodes/ep-04/pixel/ep04-heroine-sheet-v2.png`, `ep04-heroine-y2k-wardrobe-sheet-v2.png`, plus the v10 keeper frames. **Feed 4 heroine sheets + 3 style plates on every call and measure the hit rate against the same beats that produced 2-of-18.** That is a one-afternoon experiment, costs under $5, requires no training set, and if it works it removes LoRA maintenance from the pipeline permanently.

If it does not work, *then* retrain — on **5–15** frames, not 20+, per Scenario's documented guidance.

- **What it replaces:** the LoRA retrain (D2a), or de-risks it.
- **Cost:** <$5 to test; ~$0.07–0.13 per production image thereafter.
- **Maintenance:** none — it is a parameter on an API call.
- **Agent fit:** the reference list becomes a constant in `build-art-batch.py`, which already blocks frames lacking a continuity anchor.
- **Ali's effort:** picking the 7 reference images once.

### 2.4 The arithmetic nobody has done

An episode needs on the order of 20–60 frames (memory `narration-timing-map-system`: *"21 holds ≥25s"*, and 30s holds → 15 frames, 14s → 59). At `gemini-3.1-flash-image` 1K pricing, 60 frames is **$4.02**. At a 2-of-18 hit rate, generating 9× the frames you need costs **$36 an episode**.

`[INFERENCE]` **Generation cost is not the constraint. Ali's eyes are.** At 2-of-18, shipping 40 frames means she looks at ~360 images a week. No model choice fixes that; only a higher hit rate or a cheaper review loop does. This is why §3 outranks most of §2 in the ranking.

---

## 3. Approval flows — the highest-leverage new tool

The constraint from memory `chat-is-the-one-place`: no dashboards to toggle. The exception the brief allows: **phone-based approve/reject on a batch**. That exception is real, and there is a genuinely good, free way to build it.

### 3.1 ntfy — verified, and it does what's needed

**ntfy** (https://ntfy.sh, https://docs.ntfy.sh/publish/, both fetched 2026-07-22):

- Open source, dual Apache-2.0 / GPLv2. **32,128 stars, latest release v2.26.3 on 2026-07-20**, pushed 2026-07-21 `[FACT, GitHub API]`. Emphatically alive.
- **Action buttons**: *"up to three user actions"* per notification, types `view`, `broadcast`, `http`, `copy` `[FACT]`.
- The `http` action fires a real HTTP request with a method, headers and body:
  `"Actions: http, <label>, <url>, method=<method>, headers.<header>=<value>, body=<body>"` `[FACT, verbatim from docs]`
- **Attachments**: external URLs via `X-Attach`, up to **15 MB** `[FACT]`. So a push can carry a contact sheet image.
- **Click action**: `X-Click` opens a URL when the notification is tapped `[FACT]`.
- Self-hosting free; hosted tiers Supporter $6/mo (2,500 msgs/day) · Pro $12 · Business $25. A free tier exists but its exact limits are not published `[NOT VERIFIED]`.

**iOS specifically** — the make-or-break question, since Ali is on Apple:
- The docs table lists `http` actions as Android/web/desktop, which reads like iOS is excluded. **It is not.** GitHub issue #1728 (opened 2026-05-07, still open) documents that the iOS app's `ActionExecutor` *"fires the request via `URLSession.shared.dataTask`"* and server logs confirm delivery. **The HTTP action works on iOS.** `[FACT]`
- The one real wart: iOS ignores the `clear: true` flag, so *"the notification stays on the lock screen with no visual feedback after the tap"* `[FACT]`. Tapping Approve works; it just doesn't look like it worked. Design around it — have the endpoint send a confirming push back.
- Documented iOS limitation: no foreground service, so delivery relies on Firebase + background tasks, and *"iOS 'intelligently' decides when to run background tasks"* (https://github.com/binwiederhier/ntfy-ios/blob/main/docs/TECHNICAL_LIMITATIONS.md) `[FACT]`. For a batch that waits for her anyway, this is a non-issue.
- Self-hosting + iOS is the awkward combination: it requires Firebase config or relaying through ntfy.sh. **Use the hosted ntfy.sh.** `[FACT]`

### 3.2 The shape to build

For **one decision** (ship / don't ship the master file): a single push, two buttons, done from the lock screen.

For **a batch of 18 images**, three buttons is not enough. The right shape uses ntfy only as the doorbell:

1. The pipeline writes a **static contact-sheet page** — one HTML file, thumbnails, tap-to-toggle keep/kill, one Submit button. The repo already generates contact sheets (`qc-frames.py`) and already builds a batch document (`build-art-batch.py`).
2. Submit POSTs the verdicts to **Supabase**, which is already in the stack and already called from `resident-card.html`, `town-hall.html`, `laidies-card.html`, `radio.html`, `maikeover.html` `[LOCAL]`.
3. One ntfy push with `X-Click` set to that page. She taps the notification, taps through the sheet, taps Submit.
4. The agent polls the Supabase table and proceeds. Rejected frames go back for regeneration automatically.

**Why Supabase and not something new:** it is already there, and — critically — *"Free projects are paused after 1 week of inactivity"* (https://supabase.com/pricing, fetched 2026-07-22) `[FACT]`. Because live site pages already query it, the project stays warm. A brand-new Supabase project created just for approvals would keep going to sleep. `[INFERENCE]`

**Cost:** £0 (ntfy free tier or $6/mo to reserve a topic name; Supabase free tier: 500 MB database, 1 GB storage, 5 GB egress, 2 active projects `[FACT]`).
**Maintenance:** one static page template + one table. No new service to run.
**Agent fit:** excellent — the pipeline writes the page, sends the push, polls the table. Fully unattended between "batch ready" and "verdicts in."
**Ali's effort:** install one app once; thereafter, taps on a lock-screen notification. **No dashboard, no daily check-in, nothing to remember.**

⚠ One security note: on ntfy's free tier, **topics are not reserved and function as passwords**. Use a long random topic name (`laidies-approve-7f3a91c2e8`), or pay $6/mo to reserve it. `[FACT, from ntfy.sh]`

### 3.3 The plain options, evaluated honestly

| Option | Verdict |
|---|---|
| **Shared iCloud Photo Album** | She could heart/comment on her phone with zero new apps. But **no agent can read it back** without Apple-account automation. Dead on the "readable by the pipeline" requirement. `[OPINION]` |
| **Email a contact sheet** | Works for delivery, zero new apps. But the reply is prose an agent has to parse. Fine as a *fallback channel* for the ntfy push; not the mechanism. |
| **iMessage** | Same problem, worse — no clean programmatic read. |
| **GitHub Issues + reactions** | Free, she already gets the emails, and the freshness workflow proves the pattern. ⛔ But **the repo is public** `[LOCAL]` — unreleased episode art and drafts would be world-readable. Rules it out. |
| **A static page + Supabase, delivered by any channel** | This is the recommendation. The delivery channel is swappable; the page and the table are the durable part. |
| **Frame.io** | Free plan exists; Pro $15/user/mo, Team $25 (https://www.capterra.com/p/148214/Frame-io/, 2026) `[FACT, secondary]`. Built for video review with timecoded comments — genuinely good at that. But it is **a dashboard she must open**, its API is a separate integration, and it solves a team-coordination problem she does not have. **Ignore.** |
| **Filestage / Ziflow / ReviewStudio** | Same category, same objection. **Ignore.** |

---

## 4. Scheduling / publishing

### 4.1 What is genuinely automatable in 2026

**Instagram — automatable, with real friction.** Meta's Content Publishing API (https://developers.facebook.com/docs/instagram-platform/content-publishing, fetched 2026-07-22) `[FACT]`:
- Requires a **Professional account connected to a Page**, a Meta developer app, and the `instagram_business_content_publish` permission (or `instagram_content_publish` via Facebook Login).
- Two-step flow: `POST /<IG_ID>/media` to create a container, then `POST /<IG_ID>/media_publish`.
- Supported: single images (**JPEG only**), Reels (`media_type=REELS`), Stories, carousels (up to 10 mixed items).
- **Rate limit: "Instagram accounts are limited to 100 API-published posts within a 24-hour moving period."**
- **No native scheduling.** Containers *"not published within 24 hours expire."* Scheduling means *you* hold the queue and call `media_publish` at the right minute — which is a cron job, i.e. a GitHub Action.

**YouTube — automatable, with one gate that must be cleared once.** (https://developers.google.com/youtube/v3/docs/videos/insert and .../determine_quota_cost, fetched 2026-07-22) `[FACT]`:
- `videos.insert` costs 1 unit from a **dedicated Video Uploads bucket with a default limit of 100 calls/day**. Plenty.
- ⚠ **The gate:** *"All videos uploaded via the `videos.insert` endpoint from unverified API projects created after 28 July 2020 will be restricted to private viewing mode."* Lifting it requires *"an audit to verify compliance with the Terms of Service."*
- `[INFERENCE]` For one video a week, the audit is not worth it. **Upload YouTube manually.** The API can still handle metadata, thumbnails and playlists on an already-uploaded video without tripping the restriction.

**Newsletter — automatable and cheap.** Buttondown (already referenced across `operations/`): **free up to 100 subscribers**, add-ons $9–$79/mo (https://buttondown.com/pricing, fetched 2026-07-22) `[FACT]`. It has a documented API. Below 100 subscribers, £0.

### 4.2 The minimum viable stack

`[INFERENCE, this is the recommendation]` **Do not buy a social scheduler. Add ~80 lines to the existing GitHub Actions workflow.**

The repo is public, so Actions minutes are free and unlimited `[FACT]`. `ai-model-freshness.yml` already demonstrates cron + secrets + API calls. The publishing job is:

- Wednesday cron → read the episode manifest → build the IG container → publish → open a GitHub Issue on failure.
- YouTube stays manual; the workflow posts a reminder Issue with the file path and the metadata to paste.
- Buttondown send via API, gated on the same approval record from §3.

**Explicitly ignore Ayrshare**, despite it being the tool named in `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/social/laidies-social-engine.md`. Verified pricing (https://www.ayrshare.com/pricing/, fetched 2026-07-22) `[FACT]`: **Premium $149/mo for one social profile**, Launch $299 (10 profiles), Business $599 (30). That is **$1,788/year to avoid writing two API calls** for a two-account operation. Ayrshare's pricing is built for SaaS products managing hundreds of client profiles; it is the wrong customer shape entirely. `[FACT + OPINION]`

The same document names **Creatomate** and **Bannerbear** for template→MP4 and carousel rendering `[LOCAL]`. Not evaluated in depth here `[NOT VERIFIED]`, but flagging the pattern: memory `weekly-production-machine` already records the correct insight that comic lettering is **typography, not an AI render** — *"highly controllable, reliably high-quality."* If that is true, HTML + CSS + a Playwright screenshot (Playwright is already in the stack, `shot.js` already exists in `operations/tools/`) renders carousels and text cards for £0. **Test that before paying a rendering SaaS.** `[INFERENCE]`

---

## 5. Monitoring

The framing is wrong in a useful way. **Uptime is not the risk.** GitHub Pages plus Cloudflare DNS does not go down in ways a $0 monitor would meaningfully catch, and §0.4 shows the site is already serving broken assets while being perfectly "up."

What is actually unmonitored, in order of real harm:

| Gap | Evidence | Fix | Cost |
|---|---|---|---|
| **Dead asset references** | 62 refs / 36 unique files missing, live now `[LOCAL]` | The resolver script from §0.4 as a weekly Action job; opens an Issue listing them | £0 |
| **Broken links** | Nothing checks | **lychee** — Apache-2.0, 3,777 stars, latest `lychee-v0.24.2` (2026-05-01), pushed 2026-07-20 `[FACT, GitHub API]`. Rust static binary, has an official GitHub Action | £0 |
| **HTML validity** | Nothing checks | **vnu** (validator/validator) — MIT, release tagged **2026-07-22** `[FACT, GitHub API]`. Runs fully offline | £0 |
| **Repo/site size crossing GitHub's limit** | 4.3 GB vs a 1 GB published limit `[LOCAL + FACT]` | `du` + a threshold in the same Action | £0 |
| **The weekly workflow silently stopping** | Real: a cron that stops firing produces silence, which looks identical to success | **healthchecks.io** — BSD-3, 10,174 stars, **v4.3 released 2026-07-14** `[FACT, GitHub API]`. Dead-man's-switch: the job pings a URL; no ping → it emails you | £0 self-host or free hosted tier |

**Uptime, if wanted anyway: Upptime.** MIT, 17,098 stars, pushed 2026-07-22 `[FACT, GitHub API]`. Runs entirely on GitHub Actions, opens a GitHub Issue on downtime, free. ⚠ Its last tagged release is **v2.0.0 from 2020-10-13** `[FACT]` — the template repo is developed continuously rather than tagged, so "no recent release" is not abandonment here, but it is worth knowing. `[OPINION]` Low priority: it monitors the risk that isn't the risk.

### 5.1 Feeding analytics back into "what should the next episode be"

⚠ **A blocker the plan does not account for.** Plausible's docs are explicit: *"Business — Stats API is a Business plan feature"*, with *"a rate limit of 600 requests per hour by default"*, current endpoint `/api/v2/query` (https://plausible.io/docs/stats-api, fetched 2026-07-22) `[FACT]`.

So the "Advisor" module in memory `weekly-production-machine` — the thing that reads Plausible and suggests what to change — **cannot read anything unless Ali is on the Business plan.** Plausible's public pricing starts around $9/mo with Business higher `[FACT, secondary — https://plausible.io/#pricing not fetched in this pass; NOT VERIFIED for the exact Business figure]`.

`[INFERENCE]` Check the current plan before building the Advisor. If it is not Business, the choice is: upgrade, or export CSVs manually (defeats the purpose). This is a small bill, but it is a hard prerequisite that nothing in the existing plan names.

**Cloudflare Web Analytics is not a substitute** — its dashboard states stats are *"based on a 10% sample of page load events"*, it retains 30 days, and it has no custom goals (https://plausible.io/vs-cloudflare-web-analytics) `[FACT, but note the source is Plausible's own comparison page — a competitor. Treat the sampling claim as needing independent confirmation.]` It also requires the domain to be **proxied**, which per §0.1 it currently is not.

**Verdict on §5: one new GitHub Actions workflow with four jobs, plus healthchecks.io. Total cost £0. The only money is the Plausible plan, and only if the Advisor gets built.**

---

## 6. Audio

The existing chain — ElevenLabs narration + Suno songs + `transcribe.py`/`align.py` — is in better shape than any other part of the pipeline.

### 6.1 Forced alignment: already solved, leave it

`transcribe.py` (read at `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/operations/tools/transcribe.py`) uses **faster-whisper** `small.en`, int8, CPU, `word_timestamps=True`, no torch. `align.py` then maps the *true script* onto those timings via `difflib`, so caption text comes from the script and Whisper only supplies the clock — a genuinely well-designed separation.

Measured result, from memory `narration-timing-map-system`: **98.5% coverage, 0 out-of-order units, and the derived timing put the first line at 0:40.96 against a hand-set cue at 0:41.00 — 40 ms apart.**

**Should whisperX replace faster-whisper?** whisperX is healthy (BSD-2, 23,192 stars, v3.8.6 on 2026-05-25, pushed 2026-07-13 `[FACT, GitHub API]`) and adds wav2vec2 forced alignment, tightening word timing from roughly ±100–500 ms to ~±30–50 ms `[FACT, secondary — https://modal.com/blog/choosing-whisper-variants]`.

`[OPINION] **No.** The measured error is already 40 ms. whisperX pulls in **torch**, which `transcribe.py` deliberately avoids — that is a multi-gigabyte dependency and a recurring version-drift maintenance surface on a Mac, bought for an improvement below the existing measurement noise. Revisit only if read-along captions visibly drift.

⚠ Worth knowing: **faster-whisper's own pace has slowed** — last push 2025-11-19, last release v1.2.1 on 2025-10-31, though 24,454 stars and not archived `[FACT, GitHub API]`. Not a reason to move today. It is a reason to pin the version and not be surprised later.

### 6.2 The real gap: nothing normalises loudness

`[INFERENCE]` The chain assembles ElevenLabs narration + Suno songs + bumpers + SFX into one timeline. **Those sources have no common loudness reference.** Suno masters loud; TTS output sits wherever the vendor puts it. The predictable symptom is a music bed that buries the narrator, or an outro song that startles — which reads to a listener as "amateur," and memory `weekly-production-machine` already notes *"Audio ≈ half the perceived quality."*

**The fix is ffmpeg, which is already in the stack.** Two-pass `loudnorm` implements EBU R128.

Targets, from primary sources:
- **Spotify normalizes to "-14 dB LUFS"** and advises mastering *"below -1dB TP (True Peak) max"*; if louder than -14 LUFS, keep *"True Peak below -2dB"* (https://support.spotify.com/us/artists/article/loudness-normalization/, fetched 2026-07-22) `[FACT]`.
- YouTube ≈ -14 LUFS, podcasts ≈ -16 to -18 LUFS `[NOT VERIFIED — consistent across practitioner sources but no primary platform document was fetched. Do not quote a specific number as gospel.]`

`[OPINION]` **Target -16 LUFS integrated, -1 dBTP** for the episode master: safe for podcast delivery and only lightly turned down by YouTube/Spotify, which never turn *up*.

**ffmpeg-normalize** (slhck) wraps the two-pass dance in one command — NOASSERTION license, 1,518 stars, **v1.41.1 released 2026-07-10** `[FACT, GitHub API]`. `pip install ffmpeg-normalize`, then `ffmpeg-normalize input.wav -nt ebu -t -16 -tp -1 -o out.wav`.

- **What it adds:** a consistent perceived volume across narration, songs and bumpers, every episode, automatically.
- **Cost:** £0.
- **Maintenance:** a pip package and one line in the assembly script.
- **Agent fit:** perfect — a deterministic post-step, exactly the class of work the playbook's A3 says should be a script and not a model.
- **Ali's effort:** zero.

⚠ `ffmpeg` is **not currently installed** on this machine (`which ffmpeg` → not found) `[LOCAL]`. The pipeline reaches it via `imageio-ffmpeg`'s bundled binary (memory `weekly-production-machine`). A proper `ffmpeg` install is a prerequisite for any audio work.

### 6.3 Silence trimming — real, and cheap

**auto-editor** — Unlicense, 4,594 stars, **v31.3.2 released 2026-07-18**, pushed 2026-07-22 `[FACT, GitHub API]`. Very actively maintained. Cuts silence automatically from audio or video.

`[OPINION]` Useful but **secondary** — ElevenLabs output does not have the dead air that plagues human recordings. Its better use is on the *assembled* timeline, catching gaps introduced at the joins. Adopt after loudness, not before.

### 6.4 Mastering as a service — ignore

**Auphonic**: *"free for 2 hours of processed audio per month"* — which covers a ~20-minute episode comfortably. But **the free tier has no API access**; API is paid-only (https://auphonic.com/pricing, fetched 2026-07-22) `[FACT]`.

`[INFERENCE]` So the free tier means Ali uploading a file by hand every week — a manual step in a pipeline whose entire purpose is removing manual steps — and the paid tier buys, for a single voice from a TTS engine, loudness normalisation that ffmpeg does for free. Auphonic's leveller and noise reduction earn their keep on multi-mic human recordings. This is not that. **Ignore.**

---

## Ranked by impact per unit of ALI's effort

Effort is *hers*, not an engineer's. Items she never touches rank above items that are technically smaller but need her.

| # | Do this | Her effort | Cost | Why here |
|---|---|---|---|---|
| **1** | **Turn on the Cloudflare proxy for `laidies.ai`** (set SSL/TLS to Full first) | ~5 min, once | £0 | A shipped feature (`/@handle`) is 404ing. Also unlocks edge caching and takes bandwidth off GitHub Pages. §0.1 |
| **2** | **Phone approve/reject: static contact sheet → Supabase, doorbell via ntfy** | install one app; thereafter taps | £0–$6/mo | Turns her review from "sit down at a screen" into "tap a notification." At 2-of-18, review time — not generation — is the bottleneck. §3 |
| **3** | **One weekly GitHub Actions health job**: dead asset refs + lychee + vnu + repo size, opening an Issue | reads an email | £0 | 36 dead images live now. Free unlimited minutes on a public repo. Reuses a delivery pattern that already works. §5 |
| **4** | **Two-pass `loudnorm` in the assembly script, −16 LUFS / −1 dBTP** | none | £0 | Audio is ~half of perceived quality and nothing currently normalises it. §6.2 |
| **5** | **Test the no-training reference-lock** (4 heroine + 3 style refs on `gemini-3.1-flash-image`) | pick 7 images once | <$5 | Could raise the 2-of-18 hit rate without a LoRA to maintain. Newly possible — the ceilings are now documented. §2.3 |
| **6** | **Generation-aware allowlist, scoped to `assets/episodes/`** | none | £0 | Playbook D8a, corrected for 12.5% manifest coverage. §1 |
| **7** | **healthchecks.io ping on the weekly workflow** | none | £0 | A cron that stops firing is indistinguishable from success. §5 |
| **8** | **Instagram publishing via the Graph API in the existing workflow** | approve the post | £0 | Documented, 100 posts/24h, no scheduler purchase needed. §4 |
| **9** | **Decide the archive split** — rerolls/intermediates out of the Pages repo | one decision | £0 | 4.3 GB against a 1 GB published limit. §0.2 |
| **10** | **Confirm the Plausible plan before building the Advisor** | check one page | ? | Stats API is Business-plan-only; the Advisor is blocked without it. §5.1 |
| **11** | **auto-editor on the assembled timeline** | none | £0 | Real but small. §6.3 |
| **12** | **Retrain the LoRA on 5–15 curated frames** — only if #5 fails | curate 5–15 frames | ~$2 | Now with a vendor-documented dataset size, not a forum guess. §2.1 |

---

## Ignore, and why

1. **Ayrshare** — $149/mo for **one** social profile `[FACT]`. $1,788/year to avoid two Graph API calls for a two-account operation. Named in the existing social-engine doc; it should be struck from it.
2. **ComfyUI** — 121k stars and genuinely excellent `[FACT]`, and completely wrong here. Its reproducibility only applies to open-weight models you host yourself. Adopting it means adopting GPU infrastructure, CUDA/Torch drift and custom-node breakage, for a person whose binding constraint is that she will not maintain systems.
3. **Auphonic** — free tier has **no API** `[FACT]`, so it inserts a weekly manual upload into a pipeline built to remove manual steps; the paid tier buys what ffmpeg does for free on single-voice TTS.
4. **Any DAM product** (Eagle, ResourceSpace, Pimcore, AtroDAM, Immich, Bynder-class SaaS) — Eagle's API needs its GUI running to exist `[FACT]`; the rest are enterprise platforms or photo hosts with the wrong data model. None models `{generation, verdict, supersedes}`. Write the manifest.
5. **Frame.io / Filestage / Ziflow** — dashboards, for a team-review problem she does not have. Frame.io is good at timecoded video comments; that is not the failure mode here.
6. **whisperX** — better on paper (~±30–50 ms vs ±100–500 ms) `[FACT, secondary]`, but the current measured error is **40 ms**. Buying an improvement smaller than your measurement noise, at the price of a torch dependency, is a bad trade.
7. **Scenario ($45/mo)** — the best documentation found on character-model training, and worth reading for free. But $540/year to replace a $2 training run whose failure was a dataset problem.
8. **Uptime monitoring as a priority** — Upptime is free and fine if wanted `[FACT]`, but static hosting on GitHub Pages does not fail the way uptime monitors catch. The site is "up" *right now* while serving 36 broken images. Monitor content integrity instead.
9. **Cloudflare Web Analytics as a Plausible replacement** — 10% sampling and 30-day retention `[FACT, from a competitor's page — verify independently]`, no custom goals, and it needs the proxy on. Plausible is already installed across 106 pages; don't churn it.
10. **Lost Pixel** — still archived (2026-04-22), still in listicles. Unchanged from the playbook.
11. **`git filter-repo` / BFG on the 17 GB history** — the tempting fix for §0.2, and the one most likely to cause a repeat of the incident recorded in memory `uncommitted-work-incident`. Change what goes in from here; leave history alone.

---

## Playbook Open Questions resolved

| # | Question | Status |
|---|---|---|
| **1** | Gemini image-model reference ceilings | ✅ **Resolved** — Flash-Lite 14 object / 0 char / 0 style · Flash 10 / 4 / 3 · Pro 6 / 5 / 0. Primary: ai.google.dev, 2026-07-22 |
| **2** | Max references for FLUX Kontext & gpt-image | ✅ **Resolved** — Kontext = **1**; FLUX.2 = 8 via API (10 in Playground); gpt-image edits accept multiple with **no documented ceiling** |
| **3** | gpt-image-2 specifications | ✅ **Resolved** — documented model IDs, size constraints, and per-image pricing. developers.openai.com, 2026-07-22 |
| **9** | Official minimum LoRA dataset size | ✅ **Mostly resolved** — Scenario publishes **5–15 images** for a character (20+ overfits), 10–30 for a style. Replicate/fal still publish none. **This contradicts the 15–30 community norm the failed retrain was based on.** |
| **10** | Seed determinism with image inputs | ✅ **Resolved, negatively** — OpenAI's image guide documents **no seed and no reproducibility guarantee**; Google publishes none either. For the hosted models in use, seeds are not available at all |
| **21** | Production scheduling for AI content | ⚪ **Still unresolved** — no vendor or peer-reviewed source exists. Searching again produced the same generic content-calendar marketing. The playbook's honesty about D1c stands |

**Newly opened by this research:**

- **Is `wearelaidies.ai` proxied while `laidies.ai` is not?** `curl` to `wearelaidies.ai` returned nothing in this pass. `[NOT VERIFIED]`
- **What Plausible plan is Ali on?** Determines whether the Advisor is buildable at all. `[NOT VERIFIED]`
- **Cloudflare R2 free-tier figures** — quoted from memory, not re-fetched. `[NOT VERIFIED]`
- **ntfy.sh free-tier message limits** — a free tier exists; exact caps not published. `[NOT VERIFIED]`
- **Creatomate / Bannerbear** — named in the social-engine doc, not evaluated. Likely replaceable by HTML + CSS + the Playwright screenshot tooling already in `operations/tools/`. `[NOT VERIFIED]`
- **FLUX.2 reference count: 8 or 10?** BFL's docs index says "up to 10 images simultaneously"; its API material says 8 via API, 10 in Playground. Assume 8. `[FACT, with an internal discrepancy]`

---

## Would any of this have caught the Ep5 master file?

Honestly: **only #2.** No tool in this report reads prose and judges whether an explanation is any good — and §C6 of the playbook is right that none exists.

What #2 does is change *when* Ali's judgement gets applied. The Ep5 failure was not that the standard was missing; the brief establishes it was over-specified and unenforced. It was that her verdict arrived at a 1,400-word finished script — after everything downstream had been built on it. A phone-tappable approve/reject on a **one-page substance outline** — the fix memory `ep5-usefulness-critique-2026-07-10` prescribed and nobody built — costs her thirty seconds and kills a bad episode before a single frame is generated.

That is a scheduling change wearing a tool's clothes. It is still the most valuable thing here.

---

## Sources

All fetched or verified 2026-07-22 unless noted.

**Primary documentation**
- Gemini image generation — https://ai.google.dev/gemini-api/docs/image-generation
- Gemini pricing — https://ai.google.dev/gemini-api/docs/pricing
- OpenAI image generation — https://developers.openai.com/api/docs/guides/image-generation
- BFL docs — https://docs.bfl.ai/
- Scenario character training — https://help.scenario.com/en/articles/train-a-consistent-character-model/
- Scenario pricing — https://www.scenario.com/pricing
- fal.ai flux-lora-portrait-trainer — https://fal.ai/models/fal-ai/flux-lora-portrait-trainer
- ntfy publishing — https://docs.ntfy.sh/publish/ · ntfy.sh — https://ntfy.sh/
- ntfy-ios limitations — https://github.com/binwiederhier/ntfy-ios/blob/main/docs/TECHNICAL_LIMITATIONS.md
- ntfy issue #1728 (iOS http actions, opened 2026-05-07) — https://github.com/binwiederhier/ntfy/issues/1728
- Instagram content publishing — https://developers.facebook.com/docs/instagram-platform/content-publishing
- YouTube videos.insert — https://developers.google.com/youtube/v3/docs/videos/insert
- YouTube quota costs — https://developers.google.com/youtube/v3/determine_quota_cost
- GitHub Pages limits — https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Actions billing — https://docs.github.com/en/billing/managing-billing-for-your-products/about-billing-for-github-actions
- Supabase pricing — https://supabase.com/pricing
- Plausible Stats API — https://plausible.io/docs/stats-api
- Buttondown pricing — https://buttondown.com/pricing
- Auphonic pricing — https://auphonic.com/pricing
- Ayrshare pricing — https://www.ayrshare.com/pricing/
- Spotify loudness normalization — https://support.spotify.com/us/artists/article/loudness-normalization/
- Eagle API — https://api.eagle.cool/

**Maintenance status** — all via the GitHub REST API, 2026-07-22:
`Comfy-Org/ComfyUI` (121,853★, pushed 07-22, GPL-3.0) · `binwiederhier/ntfy` (32,128★, v2.26.3 2026-07-20) · `m-bain/whisperX` (23,192★, v3.8.6 2026-05-25) · `SYSTRAN/faster-whisper` (24,454★, v1.2.1 2025-10-31, pushed 2025-11-19) · `upptime/upptime` (17,098★, pushed 07-22, last tag v2.0.0 2020-10-13) · `healthchecks/healthchecks` (10,174★, v4.3 2026-07-14) · `immich-app/immich` (108,476★, pushed 07-22) · `WyattBlue/auto-editor` (4,594★, v31.3.2 2026-07-18) · `lycheeverse/lychee` (3,777★, lychee-v0.24.2 2026-05-01) · `validator/validator` (1,960★, release tagged 2026-07-22) · `slhck/ffmpeg-normalize` (1,518★, v1.41.1 2026-07-10) · `resourcespace/resourcespace` (54★)

**Secondary** (labelled as such in the body): Capterra (Eagle, Frame.io pricing) · modal.com/blog/choosing-whisper-variants (whisperX alignment accuracy) · plausible.io/vs-cloudflare-web-analytics (competitor comparison)

**Local measurement** — this repo, 2026-07-22: `dig`/`curl` against laidies.ai · GitHub API on `laidies/LAIDIES` · `git ls-files` sizing · `curation.json` verdict counts · asset-reference resolver script
