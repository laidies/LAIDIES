# LAiDIES — Supabase Email Templates

## Email-code rollout — verified provider delivery 2026-09-10

MAiKEOVER now uses `signInWithOtp` followed by `verifyOtp` on the same page for both new and returning residents. Both provider templates below must include `{{ .Token }}` before that UI ships. Keep `{{ .ConfirmationURL }}` for the existing Resident desk and legacy consumers. Updating this file does not update Supabase. Verify actual new/returning emails, code acceptance, expiry/rejection, and legacy links before release. The older presentation below is retained, not a new palette approval.

Two letters from the SUNNYVAiLE Post Office. Paste into your Supabase dashboard at **Authentication → Email Templates**.

Both templates use the same subject line. The body differentiates new vs. returning member.

Legacy `script.js` consumers use these flows; MAiKEOVER uses `signInWithOtp` for both. Real new-account testing is required separately from returning-account testing:
- **First-timer** (email not in `auth.users`) → calls `signUp` → **Confirm Signup** template (Welcome)
- **Returning** (email already in `auth.users`) → falls back to `signInWithOtp` → **Magic Link** template (Welcome Back)

---

## Template 1: "Confirm Signup" — Welcome (first-time member)

**Location:** Authentication → Email Templates → **Confirm Signup**

**Subject line:**
```
You've Got Mail! (from the SUNNYVAiLE Post Office)
```

**Body (paste into the HTML editor):**
```html
<div style="font-family: Georgia, 'Playfair Display', serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #fffdfb; color: #4b2148; line-height: 1.6;">

  <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #9b3f5f; margin: 0 0 8px;">★ The SUNNYVAiLE Post Office</p>

  <h1 style="font-size: 28px; color: #4b2148; margin: 0 0 24px; font-weight: 700;">You've Got Mail.</h1>

  <p style="font-size: 17px; margin: 0 0 24px;">Your LAiDIES verification code:</p>

  <p style="font-family: monospace; font-size: 32px; font-weight: 700; letter-spacing: 0.15em; margin: 0 0 16px;">{{ .Token }}</p>
  <p style="font-size: 16px;">Enter this code on the page where you requested it. Keep it private. You can read this email on another device.</p>
  <p style="font-size: 14px;">Or use the link below to continue in this browser.</p>
  <p style="margin: 28px 0;">
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #4b2148; color: #fffdfb; padding: 16px 28px; text-decoration: none; border-radius: 999px; font-family: 'Jost', sans-serif; font-weight: 600; font-size: 15px; letter-spacing: 0.04em;">Start my SUNNYVAiLE MAiKEOVER →</a>
  </p>

  <p style="font-size: 17px; margin: 28px 0 8px;">Welcome to SUNNYVAiLE!</p>
  <p style="font-style: italic; color: #9b3f5f; margin: 0 0 32px;">— The Post Office</p>

  <hr style="border: none; border-top: 1px solid #f3e0e8; margin: 32px 0;">

  <p style="font-size: 12px; color: #9b3f5f; opacity: 0.7;">If you didn't request this note, you can safely ignore it.</p>

</div>
```

---

## Template 2: "Magic Link" — Welcome Back (returning member)

**Location:** Authentication → Email Templates → **Magic Link**

**Subject line:**
```
You've Got Mail! (from the SUNNYVAiLE Post Office)
```

**Body (paste into the HTML editor):**
```html
<div style="font-family: Georgia, 'Playfair Display', serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #fffdfb; color: #4b2148; line-height: 1.6;">

  <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #9b3f5f; margin: 0 0 8px;">★ The SUNNYVAiLE Post Office</p>

  <h1 style="font-size: 28px; color: #4b2148; margin: 0 0 24px; font-weight: 700;">You've Got Mail.</h1>

  <p style="font-size: 17px; margin: 0 0 24px;">Welcome back to SUNNYVAiLE!</p>

  <p style="font-size: 17px; margin: 0 0 12px;">Your LAiDIES verification code:</p>
  <p style="font-size: 30px; font-weight: bold; letter-spacing: 0.15em;">{{ .Token }}</p>
  <p>Enter this code on the page where you requested it. Keep it private. If you requested a sign-in link instead, use the button below.</p>

  <p style="margin: 28px 0;">
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #4b2148; color: #fffdfb; padding: 16px 28px; text-decoration: none; border-radius: 999px; font-family: 'Jost', sans-serif; font-weight: 600; font-size: 15px; letter-spacing: 0.04em;">Now Entering SUNNYVAiLE →</a>
  </p>

  <p style="font-size: 17px; margin: 28px 0 8px;">See you soon!</p>
  <p style="font-style: italic; color: #9b3f5f; margin: 0 0 32px;">— The Post Office</p>

  <hr style="border: none; border-top: 1px solid #f3e0e8; margin: 32px 0;">

  <p style="font-size: 12px; color: #9b3f5f; opacity: 0.7;">If you didn't request this note, you can safely ignore it.</p>

</div>
```

---

## How to apply in Supabase

1. **Open your dashboard:** https://swqnkxzebxdbgyrzpdne.supabase.co
2. **Left sidebar → Authentication** (lock icon)
3. **Email Templates** tab
4. For each template:
   - Update the **Subject heading** field with the subject above
   - Switch the body editor to **Source** mode (HTML view)
   - Paste the HTML body
   - **Save changes**
5. Repeat for both **Confirm Signup** and **Magic Link** templates

## Test it

After saving:
1. Sign out of any existing session
2. Visit `/maikeover#mo-account`
3. Enter an email **never used before** → should get the Welcome template
4. Enter an email **already a member** (e.g. Ali's or Sara's) → should get the Welcome Back template

## Delivery verification — 2026-09-10

Real returning-account email/code verified on laidies.ai. A fresh plus-alias in the authorized test inbox exposed the separate Confirm Signup template still missing its code. Saved the exact code-bearing template above in the dashboard, preserved its confirmation link, and independently re-read it in another dashboard tab. Delivery continued using the old template until the 21:00:25 PDT request (about ten minutes after its first fetch); that request delivered a code and successfully confirmed the new account on MAiKEOVER. This is observed propagation, not a promised hosted cache TTL. New account first save assigned No.1048 and its Closet restored that number.

Added only `_dmarc.laidies.ai TXT "v=DMARC1; p=none"`; public DNS and Gmail headers verified DMARC/SPF/DKIM pass. Test messages still went to Spam. Inbox placement and native phone email-code suggestions are not guaranteed. No SMTP credentials, sender identity, or other DNS records changed.

## Retained legacy email colors

These are retained legacy email styling, not authority for the current website palette:
- `#4b2148` — plum (text + button background)
- `#9b3f5f` — rose (eyebrow + signature accent)
- `#fffdfb` — cream (page background + button text)
- `#f3e0e8` — pearl (divider line)
