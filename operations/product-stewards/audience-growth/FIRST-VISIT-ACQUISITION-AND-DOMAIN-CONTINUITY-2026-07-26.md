# First-visit acquisition message and domain continuity

**Status:** `SPECIFIED — BRAND/ALI EXACT-LANGUAGE HOLD`  
**Evidence time:** `2026-07-26T13:16:58-07:00`  
**Owner task:** `019f9f7f-9fad-7d73-84fa-ba6f37e6ade1`  
**Trigger:** Ali confirmed that LAiDIES is a new concept and that the canonical
domain changed from `wearelaidies.com` to `laidies.ai`.

Nothing in this packet authorizes a profile edit, post edit/removal,
publication, scheduling, deployment or account mutation.

## 1. Recommended message system

These are exact candidates for Brand and Ali. They derive from Ali's trigger
and the current Homepage promise; they are not approved public copy.

### Category

> LAiDIES is a story-led AI learning world for women.

### First visit

> LAiDIES is a story-led AI learning world for women. Episodes explain one
> useful AI idea at a time; SUNNYVAiLE helps you practise it. No account
> required. A Resident Card is optional.

### Social bio

126 characters, excluding the profile link:

> Story-led AI learning for women. Episodes explain; SUNNYVAiLE helps you
> practise. No account required. Resident Card optional.

### Short tagline

81 characters:

> Story-led AI learning for women. Episodes explain; SUNNYVAiLE helps you
> practise.

### First-visit CTA

> Start with one episode.

The CTA destination remains a Town Entry decision:

- **Recommended general-profile destination:** `https://laidies.ai/` because
  the current Homepage states the category, contains the no-account/optional
  town boundary and offers multiple honest first actions.
- **Episode-specific destination:** the exact owner-admitted Issue route named
  by the campaign object.
- **Hold as a general profile destination:** `/start-here.html`; its current
  public behavior continues to the Visitor's Centre and adds two redirects
  after the old-domain redirect. It is an orientation/trailer handoff, not yet
  the concise category landing described in this packet.

Any approved profile link should use a channel-specific UTM only after
Platform/Privacy admits the exact definitions. The root must work without the
query.

## 2. Homepage consistency check

The message system narrows rather than replaces current Homepage truth:

- metadata: “Practical AI fluency for women, taught through stories, useful
  tools and the fictional learning town of SUNNYVAiLE”;
- hero: LAiDIES helps women understand and use AI through stories and
  practical experiences;
- first-visitor module: “The town is optional, and no account or Resident Card
  is required”;
- method: episodes provide the sequential story and analogy; practical
  activities make the lesson click; and
- joining: visitors may explore without signing up while a Resident Card
  remains an optional, separately bounded town experience.

This packet deliberately does not repeat account restoration, membership,
community, reward, newsletter or current-episode promises.

## 3. Public redirect proof

Observed with fresh HTTP requests from Vancouver at the evidence time:

| Input | First response | Final result | Continuity |
|---|---:|---|---|
| `http://wearelaidies.com/` | `301` → `https://laidies.ai/` | `200`, one redirect | PASS |
| `https://wearelaidies.com/` | `301` → `https://laidies.ai/` | `200`, one redirect | PASS |
| `http://www.wearelaidies.com/` | `301` → `https://laidies.ai/` | `200`, one redirect | PASS |
| `https://www.wearelaidies.com/` | `301` → `https://laidies.ai/` | `200`, one redirect | PASS |
| old Issue 01–03 `.html` paths | `301` to the same `laidies.ai` path | `200` after canonical extension removal | PASS; path preserved |
| old Issue 03 with query | `301` to same path/query | `200` after two redirects | PASS; query preserved |
| old `/start-here.html` with query | `301` to same `laidies.ai` path/query | `200` at `/visitors-centre` after three redirects | PASS redirect; funnel-specific review required |

Search-engine fetches can still show cached old-domain titles and old page
copy. That is stale index evidence, not current origin behavior. Platform owns
the redirect configuration, monitoring, cache/search migration and durable
public receipt.

## 4. External profile and post audit

### Instagram `@laidies.ai`

**Current profile header:** PASS for domain continuity.

- Handle: `laidies.ai`.
- Bio at inspection: “AI fluency, taught through the pop culture you never
  forgot. Made to click. Built to stick.”
- Profile link resolves through Instagram to
  `http://laidies.ai/?utm_source=ig&utm_medium=social&utm_content=link_in_bio`.
- The bio/link already use the new domain, but do not yet state the complete
  episodes → practice → optional Card first-visit model.

All 20 published grid/reel links loaded in the authenticated profile audit.
Four visible assets require an Ali-owned correction/removal/leave-historical
decision:

| Public object | Observed residue | Proposed disposition |
|---|---|---|
| `https://www.instagram.com/laidies.ai/p/DZp_757pq7b/` | baked-in `wearelaidies.com` | `OWNER REVIEW REQUIRED` |
| `https://www.instagram.com/laidies.ai/p/DZ_8qOLvDkX/` | baked-in `wearelaidies.com` | `OWNER REVIEW REQUIRED` |
| `https://www.instagram.com/laidies.ai/p/DZtcpflv3xR/` | baked-in `wearelaidies.com` | `OWNER REVIEW REQUIRED` |
| `https://www.instagram.com/laidies.ai/p/DZpw4AhgFH2/` | baked-in malformed `wearelaies.cm/games/d-boo` | `CORRECTION/REMOVAL REVIEW REQUIRED` |

The permanent redirect prevents a dead click for the correctly spelled old
domain, but it cannot correct baked-in text, a malformed URL or a changed
product promise.

### LinkedIn company page

**Current profile header:** PASS for domain continuity.

- Public page: `https://www.linkedin.com/company/wearelaidies/`.
- Current website field: `www.laidies.ai`.
- Current tagline: “AI fluency, taught through the pop culture you never
  forgot. Made to click. Built to stick.”
- Current About text explains stories, tools and SUNNYVAiLE, but is longer than
  the proposed acquisition lead and includes broader claims that require their
  own current product evidence.

Observed published residue includes:

- `https://www.linkedin.com/feed/update/urn:li:activity:7473188478030204928/`
  with old-domain text/link preview and a broad launch-era capability list;
- the Episode 02/launch post at
  `https://www.linkedin.com/posts/alison-eakin_laidies-girl-power-meets-machine-power-activity-7470732770315689984-ldYi`
  with the former domain and launch-era account/community/tool promises;
- other visible company updates linking `wearelaidies.com`, including the
  prior 90s/Y2K positioning post; and
- a published Grimoire post comment/link using
  `https://wearelaidies.com/grimoire.html?open=1`.

These objects remain historical public evidence. Redirect success does not
re-admit their wider claims. Do not bulk delete or edit: Ali chooses
`KEEP AS HISTORY`, `CORRECT`, or `REMOVE` per exact object after Brand/product
review.

## 5. Repository inventory

An exact-string scan found `wearelaidies.com` in 37 non-binary files:

| Family | Files | Current treatment |
|---|---:|---|
| social working banks/kits | 5 | stale source; never copy into a new campaign without rewrite/revalidation |
| Buttondown/email drafts and templates | 4 | Post Office-owned migration; not current send authority |
| legacy setup/brief/handoff/tmp records | 5 | historical evidence; label as superseded rather than silently rewriting history |
| transition CORS/runtime allow-lists | 3 | Platform/security decision; keep only while redirect-origin compatibility is intentionally supported |
| operations/review/history | 20 | evidence or historical record; do not rewrite unless the owning contract says it is active configuration |

Highest-risk active-looking files:

- `email/buttondown/issue-01.md` through `issue-03.md`;
- `email/buttondown/transactional-email-templates.md`;
- `social/episodes/issue-01-linkedin.md` through
  `issue-03-linkedin.md`;
- `social/episodes/issue-03-instagram-kit.md`;
- `social/instagram/content-bank/debs-tomorrow-problem.md`;
- `worker/subscribe.js`; and
- `worker-fairy-godmother/src/index.js`.

The social/email files are stale publication sources. The Worker entries are
not automatically defects: accepting the former origin during an intentional
redirect transition can be a compatibility safeguard. Platform/Security owns
their retirement criteria.

## 6. Campaign landing continuity gate

Every acquisition object must bind:

`channel object → exact approved message → exact canonical laidies.ai URL →
old-domain fallback behavior → final landing promise → one useful action →
optional account/Card boundary → UTM preservation → mobile/desktop/failure
proof → measurement definition`.

Admission fails if:

- the object uses the old domain as the canonical destination;
- the redirect changes the intended path or strips an admitted query;
- a general bio lands on an episode/tool page without explaining LAiDIES;
- `/start-here` is represented as the category landing while it still routes
  directly to the Visitor's Centre;
- the landing implies an account or Resident Card is required;
- the campaign treats optional Card/community/reward behavior as first-visit
  value; or
- cached search/social preview copy is treated as current origin truth.

## 7. Exact decisions and owner handoffs

### Brand and Ali

Approve, revise or reject the four exact copy candidates in section 1.
Separately rule each public residue object as `KEEP AS HISTORY`, `CORRECT` or
`REMOVE`. Approval of copy does not authorize an external profile/post change.

### Town Entry

Confirm the canonical general-acquisition destination and first-visit
sequence. Recommended sequence:

`approved category message → laidies.ai root → one episode or one useful route
→ optional SUNNYVAiLE practice → optional Resident Card`.

### Platform

Bind the observed redirect matrix to a durable owner receipt; add monitoring
for apex/`www`, HTTP/HTTPS, path, query and unknown-path behavior; define when
legacy origins leave Worker allow-lists; and provide the search/cache migration
owner and rollback.

### Audience & Growth

After all three decisions, update only exact approved bios/profile links,
prepare corrections/removals for Ali's explicit action, and require this gate
for every new acquisition campaign. Publication and account mutation remain
separate.
