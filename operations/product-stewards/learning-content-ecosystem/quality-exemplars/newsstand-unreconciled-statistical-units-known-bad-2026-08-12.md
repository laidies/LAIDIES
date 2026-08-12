# Known-bad NewsStand number chain — correct figures without reconciled units

**Rejected artifact:** The Daily candidate `AI work logs can carry secrets you cannot see. Here’s what to share instead`, SHA-256 `89062033d142fbeb708b140da57eed588e9254be721916ff502b3041671b1fb9`.

## Exact rejected passage

> That giant number makes a dramatic graphic. It is not the number that should make your decision. Most traces did not contain a privacy leak. But 328 of the 6,708 records—4.9%—contained at least one real sensitive item, according to the paper. In genuine user sessions, the recovered material included 62 API keys, 33 passwords, 24 access tokens and 7 private keys.
>
> The number to circle is 64. Of the 704 privacy artifacts recovered from real user sessions, 64 did not appear in the visible chat history at all. Someone could remove a password from the conversation she could see and still publish a raw technical file carrying another representation of it.

## Why it fails

Every quoted number was sourced, but the prose never said that 328 counted affected session files while 704 counted separate sensitive items, or that one session could contain several items. The named credential categories totalled 126 and the article did not explain which other private-data categories contributed to 704. A non-technical reader could not audit the chain.

## Prevention rule

When one explanation uses multiple numbers, name the unit and denominator every time the unit changes. State whether counts overlap, nest or can repeat inside a larger object. A correct statistic without a connected counting model remains a failed explanation.

## Accepted successor repair

The successor explicitly says that 328 counts affected session files, 704 counts separate sensitive items inside genuine-user sessions, one file can contain several items, and the remaining categories include personal emails, names, postal addresses, IP addresses and other private details.
