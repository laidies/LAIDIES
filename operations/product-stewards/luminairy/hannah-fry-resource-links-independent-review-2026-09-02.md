# Hannah Fry profile resource links — independent review

**Reviewed:** 2026-09-02, America/Vancouver
**Verdict:** PASS for six destinations; REJECT `hannahfry.co.uk`
**Exact admitted profile SHA-256:** `1638a86a2329121796d159ad169c95a7c030934d2049e190b2a59a837a0c0287`

The reviewer began with the live destinations rather than the candidate's own
verification notes. HTTP success was not treated as identity proof; each route
also required title, presenter, host or account evidence tying it to Hannah Fry
or the named official programme.

| Job | Destination | Result |
|---|---|---|
| Read | [University of Cambridge profile](https://www.damtp.cam.ac.uk/person/hf418) | Existing authoritative profile retained. |
| Watch | [BBC iPlayer — AI Confidential with Hannah Fry](https://www.bbc.co.uk/iplayer/episode/m002q76d/ai-confidential-with-hannah-fry-series-1-1-the-boy-who-tried-to-kill-the-queen) | PASS. Official BBC programme and presenter identity; playback may be limited to Great Britain. |
| Listen | [The Rest Is Science](https://therestis.com/science) | PASS. Official programme site names Hannah Fry as co-host and offers listening/watch routes. |
| Listen | [Google DeepMind: The Podcast](https://deepmind.google/the-podcast/) | PASS. Official programme page identifies Hannah Fry as presenter and links to audio/video destinations. |
| Watch | [Hannah Fry on YouTube](https://www.youtube.com/@fryrsquared) | PASS. Channel title and description identify Hannah Fry. |
| Follow | [Hannah Fry on Instagram](https://www.instagram.com/fryrsquared/) | PASS. Public profile title identifies Hannah Fry; interaction may require login. |
| Follow | [Hannah Fry on X](https://x.com/FryRsquared) | PASS. Public profile title identifies Hannah Fry; interaction may require login. |

`https://hannahfry.co.uk/` returned HTTP 200 but no useful title, descriptive
copy or reader destination. It is excluded as a content-free lander. One
review client observed the bare response directly; a second observed a client
script pointing to `/lander`. Neither path produced a useful reader destination,
so the evidence supports the neutral wording “returns a content-free lander.”

## Exact rendered-successor review

An independent reviewer inspected the exact admitted profile and local rendered
page at 1440 × 1100 and 390 × 844. The profile hash matched the claim and receipt,
all seven action-labelled controls were visible and operable, and the card and
document had no horizontal overflow. The longest label wrapped without clipping.

The reviewer also replaced Hannah's receipt key ID with an untrusted value in a
temporary candidate. The page failed closed with zero cards and its unavailable
message visible, proving that a key named only by editable receipt data cannot
self-admit. The exact successor then passed the complete claim validator and
browser suite. Verdict: **PASS**.

The reviews do not authorize deployment. They support the exact profile bytes
named above and require re-review if any destination, label or freshness date
changes.
