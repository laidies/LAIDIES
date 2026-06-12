# Buttondown Transactional Email Templates

These replace Buttondown's default confirmation and welcome emails. Keep them simple: Gmail on mobile will punish overdesigned email HTML.

## Account Settings To Fix First

Use these exact settings in Buttondown:

- Newsletter/publication name: `lAIdies`
- Author/from name: `lAIdies`
- Description: `AI fluency for women with full calendars, high standards, and no patience for beige tech explanations.`
- Tint/accent color: `#ff2d9b`
- Icon: upload `assets/laidies-logo-square.png`

If Buttondown still shows "LAIDIES" in all caps, check the publication name field and any confirmation/welcome subject fields. Use `lAIdies`, not `LAIDIES` and not `laidies`.

## Confirmation Email

Buttondown path: Settings > Subscribing > Confirmation

Subject:

```text
Confirm your lAIdies subscription
```

Body:

```markdown
# Confirm your lAIdies subscription

You are one click away from the group chat for women who want AI to make work lighter, not weirder.

[Confirm my subscription]({{ confirmation_url }})

lAIdies is AI fluency for women with full calendars, high standards, and no patience for beige tech explanations.

Expect practical AI try-ons, sharp shortcuts, and the occasional 90s/Y2K reference doing legitimate business value.

If you did not sign up, ignore this email and nothing will happen.
```

## Welcome Email

Buttondown path: Settings > Subscribing > Welcome

Subject:

```text
You're in: welcome to lAIdies
```

Body:

```markdown
# You're in.

Welcome to lAIdies: where girl power meets machine power.

This is AI fluency for women with full calendars, high standards, and no patience for beige tech explanations.

Start here:

- Read Issue 1: https://wearelaidies.com/issues/issue-01.html
- Read Issue 2: https://wearelaidies.com/issues/issue-02.html
- Play around on the site: https://wearelaidies.com

What to expect each week:

- one useful AI concept in plain English
- one prompt or workflow to try
- one reason to actually open the tab
- enough personality that it does not feel like a corporate webinar in a trench coat

Remember, lAIdies:

You do not need to become an AI person. You need enough fluency to stop being handed vague future-of-work homework with no instructions.
```

## Brand Notes

Do not use the default Buttondown wording. It reads generic, exposes Buttondown too heavily, and makes the brand look unfinished.

If the "Powered by Buttondown" line remains visible, that is likely a Buttondown plan/whitelabeling limitation. It is not fixed by better copy. Upgrade or whitelabel only when the rest of the launch system is ready.
