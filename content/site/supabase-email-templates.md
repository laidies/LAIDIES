# LAiDIES — Supabase Email Templates

Two letters from the SUNNYVAiLE Post Office. Paste into your Supabase dashboard at **Authentication → Email Templates**.

Both templates use the same subject line. The body differentiates new vs. returning member.

The JS in `script.js` automatically picks which template fires:
- **First-timer** (email not in `auth.users`) → calls `signUp` → **Confirm Signup** template (Welcome)
- **Returning** (email already in `auth.users`) → falls back to `signInWithOtp` → **Magic Link** template (Welcome Back)

---

## Template 1: "Confirm Signup" — Welcome (first-time member)

**Location:** Authentication → Email Templates → **Confirm Signup**

**Subject line:**
```
You've Got Mail from the SUNNYVAiLE Post Office
```

**Body (paste into the HTML editor):**
```html
<div style="font-family: Georgia, 'Playfair Display', serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #fffdfb; color: #4b2148; line-height: 1.6;">

  <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #9b3f5f; margin: 0 0 8px;">★ The SUNNYVAiLE Post Office</p>

  <h1 style="font-size: 28px; color: #4b2148; margin: 0 0 24px; font-weight: 700;">You've Got Mail.</h1>

  <p style="font-size: 17px; margin: 0 0 24px;">Your new home in SUNNYVAiLE is just a click away.</p>

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
You've Got Mail from the SUNNYVAiLE Post Office
```

**Body (paste into the HTML editor):**
```html
<div style="font-family: Georgia, 'Playfair Display', serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #fffdfb; color: #4b2148; line-height: 1.6;">

  <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.18em; color: #9b3f5f; margin: 0 0 8px;">★ The SUNNYVAiLE Post Office</p>

  <h1 style="font-size: 28px; color: #4b2148; margin: 0 0 24px; font-weight: 700;">You've Got Mail.</h1>

  <p style="font-size: 17px; margin: 0 0 24px;">Welcome back to SUNNYVAiLE!</p>

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
2. Visit `/clubhouse-pass.html`
3. Enter an email **never used before** → should get the Welcome template
4. Enter an email **already a member** (e.g. Ali's or Sara's) → should get the Welcome Back template

## Brand colors used

These match the LAiDIES brand-Ai palette so the emails feel like SUNNYVAiLE:
- `#4b2148` — plum (text + button background)
- `#9b3f5f` — rose (eyebrow + signature accent)
- `#fffdfb` — cream (page background + button text)
- `#f3e0e8` — pearl (divider line)
