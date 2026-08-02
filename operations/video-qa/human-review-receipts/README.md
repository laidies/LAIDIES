# Opening-day human review receipts

This directory stores the exact JSON bytes downloaded from Ali's review inbox.
A receipt records only the human film-and-cover review gate. It cannot release,
deploy, publish or bind a public player.

Validate without changing state:

```sh
node scripts/record-opening-day-human-review-receipt.mjs /absolute/path/to/receipt.json
```

After validation succeeds, record the decision and update the owner queue:

```sh
node scripts/record-opening-day-human-review-receipt.mjs /absolute/path/to/receipt.json --apply
```

The intake is checksum-bound and idempotent. A PASS moves the exact item to
`Reviewed`; a HOLD requires a timecoded film finding and moves the item to
`Still being built`; a partial decision remains in `Review now`. A successor
master must use a new review ID and exact checksum.
