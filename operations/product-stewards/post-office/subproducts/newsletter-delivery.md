# Newsletter Delivery — subproduct contract

**Status:** SPECIFIED — Buttondown path is wired; subscription, confirmation, delivery, unsubscribe and failure receipts are NOT TESTED.

**Job:** let a visitor ask for one useful Wednesday Postcard without creating a second signup. The Resident Card flow presents `Send me the Wednesday Postcard` selected by default and lets the visitor untick it before submission; the Post Office also offers a standalone request for visitors who do not want a Card. Buttondown is the authoritative subscription/unsubscribe provider. `post-office.html` currently posts directly to its embed endpoint; `script.js` also posts from the Resident Card only while that option remains selected and saves a browser-local `newsletterSubmitted` marker. Neither local marker is a subscription receipt.

| State | Required visible wording / receipt | Must not say |
|---|---|---|
| ready | cadence, content, provider, privacy and unsubscribe path | “your box” implies an account or delivery guarantee |
| invalid | “Enter a valid email.” | provider rejected/accepted anything |
| request started | “We’re sending your signup request to Buttondown.” | subscribed, confirmed, mail is on its way |
| opaque/popup blocked | “We can’t confirm this here. Finish or check status with Buttondown.” | success inferred from popup/open form |
| provider accepted | “Buttondown accepted the request; check your inbox if confirmation is required.” | recurring delivery before confirmation/send evidence |
| duplicate/unsubscribed | provider-specific, non-disclosing recovery | account existence beyond the provided address |
| provider/network error | safe retry and direct provider route | attempt was saved or queued |
| unsubscribe | provider confirmation is authoritative | immediately unsubscribed without provider receipt |

**Privacy/idempotency:** the combined Card form must state plainly that the checked Postcard option sends the same email address to Buttondown and must expose the opt-out before submission. Email exists only in the browser request, the account provider where applicable, and Buttondown; no analytics/local durable record beyond a deliberately non-authoritative attempt category. Do not auto-resubmit based on the local marker. A retry uses the same address only after user action; dedupe/confirmation belongs to Buttondown. No charge, incentive or reward attaches to signup.

**Authoritative completion:** configured-provider proof that the address is subscribed/confirmed; a later Wednesday send/delivery needs provider delivery evidence and is a different outcome. **Analytics:** attempt and categorical provider result only; never address, message, raw response or subscriber status. **Release gate:** the controlled packet must prove valid, invalid, duplicate, confirmation-required, unsubscribe, popup/network/provider failure and accessible retry with an approved disposable test identity.
