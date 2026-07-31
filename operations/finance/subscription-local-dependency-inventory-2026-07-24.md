# Private subscription + tool dependency inventory

**Date:** 2026-07-24  
**Status:** REPORT READY — local repository evidence only  
**Privacy:** INTERNAL; do not publish vendor/amount/founder details  
**Actions taken:** no secret values, billing accounts, subscriptions or public
endpoints were accessed; nothing was cancelled or changed.

The repository proves dependencies and intended jobs. It does **not** prove
what Ali is paying for, the active plan, currency, renewal date or current
usage. Billing must be confirmed from private account evidence, never inferred
from a tool reference.

## Locally evidenced candidates

| Vendor/tool | Apparent production job | Audit treatment |
|---|---|---|
| ChatGPT/Codex subscription | Coding, local production, image rendering | Confirm plan and whether image work is included or separately metered |
| Claude subscription | Editorial/research/production collaboration | Confirm active plan; keep separate from Anthropic API |
| OpenAI API | Public MAiKEOVER avatar generation; possible direct media work | Usage-based; urgent spend-control review |
| Anthropic API | Intended Hot Goss rewriting | Current verified job lacked the key and used raw RSS fallback; confirm whether another project uses billing |
| Replicate | Past LoRA/tests; legacy/debug avatar code; proposed animation | Dependency test before cancellation; likely seasonal |
| ElevenLabs | Episode/class narration and TTS workflow | Likely essential/seasonal; confirm plan, voices, rights and rollover |
| Suno | Episode songs, KSVL and patron-saint music | Likely seasonal; confirm commercial-use status for released tracks |
| Canva | Design and attempted motion/video work | Retain only for jobs it demonstrably performs |
| CapCut | Editable video assembly/projects | Test final assembly need before any plan change |
| Adobe Firefly / Creative Cloud | Controlled image-to-video work | Confirm included entitlement versus separate paid access |
| GitHub | Repository, Pages and Actions | Critical; confirm free versus paid plan |
| Cloudflare | DNS, Workers, Worker AI/Images; possible storage/video | Critical; inventory each paid product and Worker usage separately |
| Supabase | Auth, profiles, rewards and product state | Critical; confirm plan, limits and backups |
| Resend | Transactional authentication email | Verify actual SMTP provider/plan |
| Buttondown | Newsletter signup, double opt-in and delivery | Critical if launch signup remains |
| Hyvor Talk | Community comments/moderation/digest input | Active dependency; confirm plan and API limits |
| Plausible | Analytics/events | Confirm plan and whether API access is needed |
| Microsoft Clarity | Heatmaps/session replay | Complementary only if findings are reviewed |
| Domains/registrar | `laidies.ai` and secondary/redirect domains | Confirm annual renewals and continuing need |
| iCloud storage | Shared production workspace/media | Allocate only incremental LAiDIES share |
| Google/Gmail or Workspace | Operational identity/domain mail | Confirm whether paid Workspace exists |

## P0 local-code finding — MAiKEOVER metered-avatar exposure

The current local source establishes:

- One MAiKEOVER click creates three candidates and starts three independent
  requests (`maikeover.html:620-665`).
- Each normal request invokes an OpenAI `gpt-image-1` generation or edit
  (`worker-avatar/avatar.js:47-79`, `:220-237`).
- The Worker source contains no authentication, server-side quota or rate
  limit.
- Its CORS helper selects response headers; it does not reject an unapproved
  request origin (`worker-avatar/avatar.js:82-91`, `:169-173`).
- If `REPLICATE_API_TOKEN` is configured, unauthenticated GET debug routes
  include account lookup and a prediction-triggering path
  (`worker-avatar/avatar.js:174-203`).
- The public frontend points to
  `https://laidies-avatar.wednesday-laidies.workers.dev`
  (`maikeover.html:437`).

This is a **verified local source risk**, not yet proof that the deployed Worker
matches the local file or that abusive/accidental spend has occurred. Do not
call a paid endpoint to test it.

Smallest safe next checks:

1. compare the deployed Worker/version with the local source through read-only
   Cloudflare deployment metadata;
2. inspect recent request counts, OpenAI/Replicate usage and existing billing
   alerts without exposing secret values;
3. if the deployed route matches, remove/disable public debug paths and add
   actual server-side origin enforcement, authentication/abuse controls,
   per-user/IP quotas, a daily budget circuit breaker and alerts;
4. consider returning one candidate per click until the cost/value of three is
   proven;
5. verify the real public journey after the protected version deploys.

CORS is a browser response-sharing rule, not authentication or cost control.

The FAiRY Godmother Worker source was recovered read-only on 2026-07-25 into
`worker-fairy-godmother/`. Active production version 18 uses OpenAI
`gpt-4o`, a three-request-per-60-second IP rate limiter and the
`SUBSCRIBER_USAGE` KV namespace. The recovered cap is 10 requests per UTC day,
not the five promised in current frontend copy; usage is counted before answer
success and the browser self-asserts the subscriber email. Recent spend still
requires billing evidence, but source/model/cap identification is complete.
See `operations/research/fairy-godmother-worker-recovery-2026-07-25.md`.

## Best consolidation hypotheses

1. **Visual/motion:** Canva, CapCut, Firefly, Replicate and OpenAI/Sora overlap.
   Choose one motion generator and one assembly editor through a controlled
   quality/cost test before adding or renewing overlapping tools.
2. **Replicate:** the current normal avatar path uses OpenAI. Preserve trained
   assets, then test whether Replicate is needed outside occasional LoRA or
   animation work.
3. **Plausible + Clarity:** complementary if both produce a reviewed weekly
   scorecard; otherwise one may be collecting unused data.
4. **Buttondown + Resend:** not a no-regret duplicate—newsletter compliance and
   transactional auth email are different jobs.
5. **Supabase + Hyvor:** also not a simple duplicate. Replacing comment
   moderation/threading with Supabase would be a product rebuild.
6. **Chat subscriptions versus APIs:** ChatGPT does not include OpenAI API
   usage; Claude does not include Anthropic API usage. Track four separate
   rows.
7. **Proposed social SaaS:** Creatomate, Bannerbear, Ayrshare, Airtable and
   Zapier/Make appear in plans but are not proved production dependencies. Do
   not purchase them as if the social engine were already wired.
8. **Video hosting:** Cloudflare Stream/R2 and YouTube are architecture options,
   not confirmed current spend. Choose one delivery model before activating
   multiple paid services.

## Private evidence needed from Ali

A private 60–90-day billing export or screenshots containing vendor, date,
amount and currency can resolve most uncertainty. For each candidate record:

- exact plan, billing owner, currency, tax, cadence and renewal;
- recurring fee versus usage/credits;
- last 90 days of actual use;
- LAiDIES-only versus shared use;
- API project budget and alerts;
- the production job that breaks if removed;
- whether projects, voices, trained models, generated assets and commercial
  rights survive cancellation;
- required export/archive steps;
- annual-plan refund/sunk-cost status.

Also confirm anything not represented in the repository: stock/media/font
licenses, domain renewals, storage, social schedulers, contractors, ads and
other AI subscriptions.

No cancellation or downgrade decision is justified yet.
