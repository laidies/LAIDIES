# LAiDIES Email Signup / Buttondown Audit

Status: audit complete for the visible signup surfaces checked in the 2026-06-18 site sweep. Nothing staged, committed, or pushed.

## What Was Checked

Signup locations found in the live-facing pages reviewed:

- `index.html` homepage mini signup form
- `index.html` homepage main signup form
- `episodes.html` mini signup form
- `clubhouse-pass.html` newsletter opt-in connected to the Clubhouse Pass flow

No real test subscriber was submitted during this pass because Ali has not explicitly approved using a controlled test email.

## Buttondown Endpoint

The homepage and episodes forms submit to:

```text
https://buttondown.com/api/emails/embed-subscribe/laidies
```

The forms use `method="post"` and submit into hidden iframe targets, which is the safer hosted/embed-style approach and does not expose a Buttondown API key in frontend code.

## Fixes Made

- Added visible hosted Buttondown fallback links on the homepage signup areas so a visitor still has a working path if the embedded iframe submit is blocked, quiet, or confusing.
- Added a hosted Buttondown fallback link on the Episodes page mini signup.
- Changed the homepage mini signup success copy from a fake guaranteed success message to honest copy:
  - New copy: `Request sent to Buttondown. Check your inbox to confirm.`
- Confirmed no Buttondown API key is present in the frontend.

## Current Form Findings

Homepage mini signup:

- File: `index.html`
- Endpoint: Buttondown embed subscribe endpoint for `laidies`
- Method: `POST`
- Target: hidden iframe
- Fallback link: `https://buttondown.com/laidies`
- Status: connected, with improved fallback and more honest status copy

Homepage main signup:

- File: `index.html`
- Endpoint: Buttondown embed subscribe endpoint for `laidies`
- Method: `POST`
- Target: hidden iframe
- Fallback link: `https://buttondown.com/laidies`
- Status: connected, with hosted fallback

Episodes mini signup:

- File: `episodes.html`
- Endpoint: Buttondown embed subscribe endpoint for `laidies`
- Method: `POST`
- Target: hidden iframe
- Fallback link: `https://buttondown.com/laidies`
- Status: connected, with hosted fallback

Clubhouse Pass newsletter opt-in:

- Files: `clubhouse-pass.html`, `script.js`
- Behavior: newsletter opt-in checkbox can submit a hidden form to the same Buttondown embed endpoint as part of the pass flow
- Status: appears connected, but should receive one controlled live test before declaring the pass opt-in fully verified

## What Could Not Be Fully Verified Without Approval

- Whether Buttondown receives a subscriber and whether the account requires double opt-in/confirmation.
- Whether a subscriber appears immediately in Buttondown or remains pending until the inbox confirmation is clicked.
- Whether Buttondown returns an iframe-only success/failure state that can be read reliably by the page.

## Recommended Ali Test

Use one controlled email address and test:

1. Homepage mini signup.
2. Homepage main signup.
3. Episodes mini signup.
4. Clubhouse Pass opt-in.

Then check Buttondown for subscriber status and inbox confirmation behavior. If Buttondown requires confirmation, the site copy should continue to say “check your inbox” rather than “you’re in.”

## Remaining Flags

- The embedded iframe approach is safe, but it does not provide strong frontend error handling. The hosted Buttondown fallback now gives users a reliable escape hatch.
- If LAiDIES later needs first-party success/error handling, that should be built with a backend/serverless endpoint so no Buttondown API key is exposed in the browser.
