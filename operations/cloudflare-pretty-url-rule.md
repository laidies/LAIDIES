# Cloudflare Transform Rule — `/@username` → Closet

Rewrites incoming `/@handle` paths to `/laidies-card.html?u=handle` **at the edge**, before the request hits GitHub Pages. The visitor's URL bar stays `/@handle`. GitHub Pages sees a normal page request. The Closet JS reads `?u=handle` and loads that member's card.

## What Cloudflare will do

| Visitor URL | Cloudflare rewrites to | GitHub Pages serves |
|---|---|---|
| `/@ali` | `/laidies-card.html?u=ali` | Closet page, loads @ali's card |
| `/@cold_brew_9` | `/laidies-card.html?u=cold_brew_9` | Closet page, loads that card |
| `/@` | (no match — passes through) | 404 |
| `/@AB` | (no match — passes through) | 404 |
| `/laidies-card.html` | (no match — passes through) | Normal Closet page |
| `/index.html` | (no match — passes through) | Normal homepage |

Handles must be 3–24 chars, lowercase letters/numbers/underscores. Anything else falls through to a normal 404 (which is what we want — no one should be sending shitty URLs).

## How to set it up (10 minutes)

### 1. Open Cloudflare

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **`laidies.ai`** (the primary zone — wearelaidies.ai is the secondary and redirects to laidies.ai; putting the rule on the redirect zone does nothing)

### 2. Navigate to Transform Rules

Left nav → **Rules** → **Overview**
Or: **Rules** → **Transform Rules** → **Rewrite URL**

### 3. Create the rule

Click **Create rule** → **Rewrite URL**.

**Rule name:**
```
Closet pretty URL — /@handle to laidies-card
```

**When incoming requests match:**

Toggle to **Custom filter expression** (the `Edit expression` button), then paste:
```
(http.request.uri.path matches "^/@[a-z0-9_]{3,24}$")
```

**Then... Rewrite to...**

- **Path** → toggle to **Dynamic**, paste:
  ```
  "/laidies-card.html"
  ```
  (yes, wrap it in double quotes — Cloudflare's expression editor wants a string literal)

- **Query** → toggle to **Dynamic**, paste:
  ```
  concat("u=", regex_replace(http.request.uri.path, "^/@", ""))
  ```

### 4. Deploy

Click **Deploy**. Rule goes live at Cloudflare's edge in ~30 seconds.

### 5. Test

- Visit `https://<yourdomain>/@ali` → should load the Closet page with @ali's card.
- Visit `https://<yourdomain>/@nonexistent_9999` → should load Closet page with the friendly "no forwarding address" not-found state (that's already in the Closet code).
- Visit `https://<yourdomain>/@` → should 404 (rule doesn't match).

## Rollback

If anything breaks: Cloudflare dashboard → Rules → Transform Rules → **toggle the rule off**. Instant rollback, no code changes needed.

## Why URL Rewrite and not Redirect

- **Rewrite** (this rule): Cloudflare quietly asks GitHub Pages for `/laidies-card.html?u=ali` instead of `/@ali`. Browser URL stays `/@ali`. Clean.
- **Redirect** (wrong choice): Cloudflare sends the browser a 301 to `/laidies-card.html?u=ali`. Browser URL changes. Ugly.

We want Rewrite.

## Notes for future

- If we ever add nested paths like `/@ali/besties` or `/@ali/wall`, extend the regex: `^/@[a-z0-9_]{3,24}(/.*)?$`. Then rewrite path/query to route accordingly.
- If Ali picks a domain redirect strategy (e.g. `laidies.love` vs `www.laidies.love`), make sure the rule is on the zone the traffic actually lands on.
- Cloudflare Free tier includes 10 URL Rewrite rules. This is #1.
